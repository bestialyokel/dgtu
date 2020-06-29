using System;
using System.Threading;
using System.Threading.Tasks;


/*
    https://habr.com/ru/post/128454/
*/


public class lab9 {
    static double PIMK(double radius, uint points) {
        Random rand = new Random();
        uint count = 0;
        for (uint j = 0; j < points; j++) {
            var x = radius * (rand.NextDouble() * 2 - 1);
            var y = radius * (rand.NextDouble() * 2 - 1);
            if (y*y + x*x <= radius*radius) 
                count++;
        }
        return 4 * count / (double) points;
    }

    static double MK(double radius, uint pointsPerThread, int threadAmount) {
        double sharedSum = 0;
        Thread[] threadPool = new Thread[threadAmount];
        //типа разбиение "алгоритма" на этапы, к которым должны придти ВСЕ потоки, только потом продолжение
        /* +1 участник - сама функция, Вопрос: *главный поток* учитывать при лимите на логические процессоры? */
        Barrier barrier = new Barrier(threadAmount + 1, null /* (barrier) => {} callback */);

        for (int i = 0; i < threadAmount; i++) {
            /* без tmp для всех лямбд замыкание i будет равно cpus */
            threadPool[i] = new Thread(() => {
                var x = PIMK(radius, pointsPerThread);
                sharedSum += x;
                barrier.SignalAndWait();
            });
            threadPool[i].Start();
        }
        
        barrier.SignalAndWait();
        barrier.Dispose();

        return sharedSum / threadAmount;

    }
    static void Main() {
        var cpus = Environment.ProcessorCount;

        Console.WriteLine("Радиус");

        uint r = UInt32.Parse(Console.ReadLine()); 

        Console.WriteLine("Точек на поток");

        uint ppt = UInt32.Parse(Console.ReadLine()); 

        var x = MK(r, ppt, cpus);

        Console.WriteLine(x);
    }

}
