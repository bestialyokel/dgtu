using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Diagnostics;

namespace lab3
{

    internal class Program
    {  
        //или не var
        private static new List<ManualResetEvent> events = new List<ManualResetEvent>();
        private static int counter = 0;
        static double f1(double x)
        {
            return Math.Sin(x) * Math.Cos(x * x);
        }

        static double f2(double x)
        {
            return Math.Log(x) * 10 * Math.Cos(x);
        }

        static double f3(double x)
        {
            return Math.Pow(x, x) - 10 * Math.Sin( 5 * x);
        }
        
        static double f4(double x)
        {
            return -1 * x * x  + 5;
        }
        
        static double sum = 0;
        
        static void LeftTriangle(object stat)
        {

            var args = (double[])stat;
            var left = args[0];
            var right = args[1];
            var nums = args[2];
            var tmpSum = 0d;
            double h = (right - left) / nums;
            for (var i = 0; i <= nums - 1; i++)
            {
                var x = left + i * h;
                tmpSum += f4(x);
            }

            sum += h * tmpSum;
            
            Console.WriteLine(counter);

            events[Interlocked.Increment(ref counter)].Set();

        }

        static double[] copy(double[] mass)
        {
            double[] new_mass = new double[mass.Length];
            for (int i = 0; i < mass.Length; i++)
            {
                new_mass[i] = mass[i];
            }

            return new_mass;
        }
        
        static void Threads(int numThreads)
        {
            double[] args = {0, 2.5, 100};
            ThreadPool.SetMaxThreads(numThreads, 0);
            var step = (args[1] - args[0]) / numThreads;
            args[1] = args[0] + step;
            for (int i = 0; i < numThreads; i++) {
                events.Add( new ManualResetEvent(false) );
            }

            Console.WriteLine(events.Count);

            for (int i = 0; i < numThreads; i++)
            {
                
                ThreadPool.QueueUserWorkItem(LeftTriangle, copy(args));
                args[0] = args[1];
                args[1] += step;
            }

            WaitHandle.WaitAll(events.ToArray());

            Console.WriteLine(sum);
        }
        
        static void Main(string[] args)
        {
            Threads(Environment.ProcessorCount);
        }
    }
}