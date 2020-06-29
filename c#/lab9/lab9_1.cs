using System;
using System.Threading;



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
        Thread[] threads = new Thread[threadAmount];

        for (int i = 0; i < threadAmount; i++) {
            threads[i] = new Thread(() => {
                var x = PIMK(radius, pointsPerThread);
                sharedSum += x;
            });
            threads[i].Start();
        }
        
        foreach (var t in threads)
            t.Join();

        return sharedSum / threadAmount;

    }
    static void Main() {
        var cpus = Environment.ProcessorCount;

        Console.WriteLine("Радиус");

        uint r = UInt32.Parse(Console.ReadLine()); 

        Console.WriteLine("Точек");

        uint ppt = UInt32.Parse(Console.ReadLine()); 

        var x = MK(r, ppt, cpus);

        Console.WriteLine(x);
    }

}