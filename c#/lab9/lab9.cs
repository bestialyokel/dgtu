using System;
using System.Threading;


public class lab8 {
    static void Main() {
        int cpus = Environment.ProcessorCount;
        uint points = 2048;
        double pi = 0;
        Thread[] threadPool = new Thread[cpus];

        for (int i = 0; i < threadPool.Length; i++) {
            int n = i;
            threadPool[i] = new Thread(() => {
                Console.Write(n);
            });

            //они выполняются по порядку, нет асинхронности
            threadPool[i].Start();
            threadPool[i].Join();
        }

        //Console.Write("SAS");

        
    }

    public static double MKPI (uint points) {
        uint i = 0;
        while (i < points) {
            i++;
        }
        return 0;
    }
}