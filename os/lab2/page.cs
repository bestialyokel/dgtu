using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

namespace lab2
{
    class Program
    {
        //размер страницы = 32 байта
        public static string[] ram = new string[256+48];
        public static string[] hdd = new string[256];
        public static int sm = 0;//sm - смещение
        
        //функция, которая возращает смещение информации о странице в таблице страниц
        public static int search(int x)
        {
            int pos = 0;
            for (int i = 0; i < 16; i++)
                if (ram[i*3] == Convert.ToString(x))
                    pos = i*3;
            return pos;
        }
        public static void fifoswap(int x)//x-страница
        {
            int pos = search(x);
            string buf = "";
            for (int i=0; i < 32+3; i++)//в буффер считывается 4 символа из таблицы страниц и сама страница
            {
                if (i < 3)
                    buf += ram[0 + i] + " ";// '0', т.к уходит первая страница
                else
                    buf += ram[48 + i - 3] + " ";
            }
            for (int i = 0; i < 32+3; i++)
            {
                if (i < 3)
                {
                    if (i != 1 && i != 2)
                        ram[0 + i] = ram[pos + i];
                }
                else
                {
                    string hi = ram[2];
                    ram[48 + i - 3] = hdd[Convert.ToInt32(ram[pos+2]) + i - 3];
                }
                    
            }
            int j = 0;
            for(int i = 0; i<buf.Length; i++)
            {
                string b = "";
                while (Convert.ToString(buf[i]) != " " && i < buf.Length-1)
                {
                    b += buf[i];
                    i++;
                }
                if (j < 3)
                {
                    if (j != 1 && j!=2)
                        ram[pos + j] = b;
                }
                else
                    hdd[Convert.ToInt32(ram[pos+2]) + j - 3] = b;
                j++;
            }
        }
        
        //Запись в память значение
        public static void write(int x, string inf)// х - страница
        {
            int pos = search(x);
            if (Int32.Parse(ram[pos + 2]) == 1)
            {
                Console.WriteLine("Страница была на HDD, переносим её в RAM...");
                fifoswap(x);
                pos = search(x);
            }
            else
            {
                Console.WriteLine("Страница была в RAM");
                pos = search(x);
            }
            for (int i = 0; i < 32; i++)
            {
                ram[Convert.ToInt32(ram[pos+3]) + i] = inf;
            }
        }
        public static void writestr(string inf)
        {
            int n = sm;
            
            if (n < 8)
            {
                ram[sm*3] = Convert.ToString(n);
                ram[sm*3 + 1] = "0";
                ram[sm*3 + 2] = Convert.ToString(48 + sm*32);
                for (int i = 0; i < 32; i++)
                {
                    ram[Int32.Parse(ram[sm*3 + 2]) + i] = inf;
                }
            }
            else
            {
                ram[sm*3] = Convert.ToString(n);
                ram[sm*3 + 1] = "1";
                ram[sm*3 + 2] = Convert.ToString(sm*32-256);
                
                for (int i = 0; i < 32; i++)
                {
                    hdd[Int32.Parse(ram[sm*3 + 2]) + i] = inf;
                }
                fifoswap(n);
            }
            sm+=1;
        }
        public static void read(int x)// х - страница
        {
            int pos = search(x);
            if (Int32.Parse(ram[pos + 1]) == 1)
            {
                Console.WriteLine("Страница была на HDD, переносим её в RAM...");
                fifoswap(x);
                pos = search(x);
            }
            else
            {
                Console.WriteLine("Страница была в RAM");
                pos = search(x);
            }
            for (int i = 0; i<3; i++)
            {
                Console.Write($"{ram[pos + i]} ");
            }
            Console.WriteLine();
            for (int i = 0; i<32; i++)
            {
                Console.Write($"{ram[Convert.ToInt32(ram[pos + 2])+i]}");
            }
            Console.WriteLine();
        }
        public static void info()
        {
            Console.WriteLine("Таблица страниц:");
            for (int i = 0; i < 48; i++)
            {
                Console.Write($"{ram[i]} ");
            }
            Console.WriteLine();
            Console.WriteLine("Память:");
            Console.WriteLine("RAM:");
            for (int i = 0; i < 256; i++)
            {
                Console.Write($"{ram[48 + i]}");
            }
            Console.WriteLine();
            Console.WriteLine("HDD:");
            for (int i = 0; i < 256; i++)
            {
                Console.Write($"{hdd[i]}");
            }
            Console.WriteLine();
        }
        public static void menu()
        {
            Console.WriteLine("Меню: \r\n1)Записать в память\r\n2)Чтение участка\r\n3)Запись в участок\r\n4)Информация о памяти\r\n5)Выход");
            string v = Console.ReadLine();
            while (true)
            {
                switch (v)
                {
                    case "1":
                        Console.WriteLine("Что записать?");
                        writestr(Console.ReadLine());
                        break;
                    case "2":
                        Console.WriteLine("Введите страницу");
                        read(Int32.Parse(Console.ReadLine()));
                        break;
                    case "3":
                        Console.WriteLine("Введите страницу и записываемую информацию");
                        write(Int32.Parse(Console.ReadLine()), Console.ReadLine());
                        break;
                    case "4":
                        info();
                        break;
                    case "5":
                        Console.WriteLine("Выход из программы");
                        Console.ReadKey();
                        Process.GetCurrentProcess().Kill();
                        break;
                    default:
                        Console.WriteLine("Введите корректный пункт меню");
                        break;
                }
                v = Console.ReadLine();
            }
        }
        static void Main(string[] args)
        {
            for (int i = 0; i < 512; i++)
            {
                if (i < 256)
                    ram[48 + i] = "0";
                else
                    hdd[i - 256] = "0";
            }
            menu();
            Console.ReadKey();
        }
    }
}