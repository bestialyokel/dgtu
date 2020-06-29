using System;
using System.Threading;


public class lab9 {
    static void PIMK(double radius, ref int points, ref int count) {
        Random rand = new Random();
        while ( Interlocked.CompareExchange(ref points, 0, 0) > 0 ) {
            var x = radius * (rand.NextDouble() * 2 - 1);
            var y = radius * (rand.NextDouble() * 2 - 1);
            if (y*y + x*x <= radius*radius) 
                Interlocked.Increment(ref count);

            Interlocked.Decrement(ref points);
        }
    }

    static double MK(double radius, int points, int threadAmount) {
        int totalCount = points;
        int count = 0;
        Thread[] threads = new Thread[threadAmount];

        for (int i = 0; i < threadAmount; i++) {
            threads[i] = new Thread(() => {
                PIMK(radius, ref totalCount, ref count);
            });
            threads[i].Start();
        }
        
        foreach (var t in threads)
            t.Join();

        return 4 * count / (double) points; 

    }
    static void Main() {
        var cpus = Environment.ProcessorCount;

        Console.WriteLine("Радиус");

        uint r = UInt32.Parse(Console.ReadLine()); 

        Console.WriteLine("Точек");

        int ppt = Int32.Parse(Console.ReadLine()); 

        var x = MK(r, ppt, cpus);

        Console.WriteLine(x);
    }

}