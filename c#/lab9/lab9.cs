using System;
using System.Threading;
using System.Threading.Tasks;


/*
    https://habr.com/ru/post/128454/
*/

public class lab9 {
    static double PI(double radius, uint pointsPerThread, int threadAmount) {
        double sharedSum = 0;
        Thread[] threadPool = new Thread[threadAmount];
        //типа разбиение "алгоритма" на этапы, к которым должны придти ВСЕ потоки, только потом продолжение
        /* +1 участник - сама функция, Вопрос: *главный поток* учитывать при лимите на логические процессоры? */
        Barrier barrier = new Barrier(threadAmount + 1, null /* (barrier) => {} callback */);

        for (int i = 0; i < threadAmount; i++) {
            /* без tmp для всех лямбд замыкание i будет равно cpus */
            threadPool[i] = new Thread(() => {
                uint count = 0;
                Random rand = new Random();
                for (uint j = 0; j < pointsPerThread; j++) {
                    var x = radius * (rand.NextDouble() * 2  - 1);
                    var y = radius * (rand.NextDouble() * 2  - 1);
                    if (y*y + x*x <= radius*radius) {
                        count++;
                    }
                }
                sharedSum += count / (double) pointsPerThread;
                barrier.SignalAndWait();
            });

            threadPool[i].Start();
        }
        /* Ждём всех */
        barrier.SignalAndWait();
        barrier.Dispose();

        return 4 * sharedSum/threadAmount;
    }

    static void Main() {
        var cpus = Environment.ProcessorCount;
        /* 
            На большом радиусе чёт не фурычит
        */
        Console.WriteLine("Радиус");

        uint r = UInt32.Parse(Console.ReadLine()); 

        Console.WriteLine("Точек на поток");

        uint ppt = UInt32.Parse(Console.ReadLine()); 

        var x = PI(r, ppt, cpus);

        Console.WriteLine(x);


    }


}