using System;
using System.Collections;
using System.Collections.Generic;



class lab5 {



    public static bool isPrime(uint n) {// Дорого ?
        uint d = 2;
        while (n % d != 0) 
            d += 1;
        return d == n;
    }

    public class Primes : IEnumerable{
        private uint amount;

        public Primes(uint amount) {
            this.amount = amount;
        }

        public IEnumerator GetEnumerator() {
            uint n = this.amount;
            if (n-- > 0) yield return 2;
            if (n-- > 1) yield return 3;
            uint num = 5;
            while(n > 0) {
                if (isPrime(num)) {
                    n--;
                    yield return num;
                }
                num += 2;
            }
        }
        IEnumerator IEnumerable.GetEnumerator() {
            return GetEnumerator();
        }
    }


    public static IEnumerable NPrimes(uint n) {
        if (n-- > 0) yield return 2;
        if (n-- > 1) yield return 3;
        
        uint num = 5;
        while(n > 0) {
            if (isPrime(num)) {
                n--;
                yield return num;
            }
            num += 2;
        }
    }
    





    public static void Main() {
        IEnumerable a = NPrimes(10);
        Primes b = new Primes(10);
        foreach (var c in b) Console.WriteLine(c);
    }


}