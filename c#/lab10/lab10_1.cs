using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic; 

using System.Text.RegularExpressions;
using System.Linq;
using System.IO;

using System.Collections.Concurrent;

 
// предположим, что в файле хост/пользователь/объем/день недели 0-6; 0 - воскресенье
public class lab10 {
    public static ConcurrentDictionary<string, long> hosts = new ConcurrentDictionary<string, long>();
    public static ConcurrentDictionary<string, long> users = new ConcurrentDictionary<string, long>();
    public static ConcurrentDictionary<byte, long> days = new ConcurrentDictionary<byte, long>();

    public static void Perf(string path) {
        string[] files = Directory.GetFiles(path)
                        .Where(file => Regex.IsMatch(file, @".*\.txt$")).ToArray();


        Parallel.For(0, files.Length, (i, state) => {
            using(StreamReader st = new StreamReader(files[i])) {
                string buf;
                string[] split;

                byte day;
                long traffic;
                bool success;

                // предположим, что в файле хост/пользователь/объем/день недели 0-6; 0 - воскресенье
                while ((buf = st.ReadLine()) != null) {  
                    split = buf.Split('/', StringSplitOptions.RemoveEmptyEntries);

                    if (split.Length != 4)
                        continue;

                    success = Byte.TryParse(split[3], out day);
                    if (!success) 
                        continue;
                    
                    success = long.TryParse(split[2], out traffic);
                    if (!success)
                        continue;

                    hosts.AddOrUpdate(split[0], 0, (key, oldValue) => oldValue + traffic); 
                    users.AddOrUpdate(split[1], 0, (key, oldValue) => oldValue + traffic);
                    days.AddOrUpdate(day, 0, (key, oldValue) => oldValue + traffic);
                }  
            }
        });    
    }


    public static void Main() {
        string path = "./logs";

        var x = Task.Run(() => Perf(path) );
        x.Wait();

        Console.WriteLine("Hosts:");
        foreach(var pair in hosts) {
            Console.WriteLine($"{pair.Key} - {pair.Value}");
        }
        Console.WriteLine("\nUsers:");
        foreach(var pair in users) {
            Console.WriteLine($"{pair.Key} - {pair.Value}");
        }
        Console.WriteLine("\nDays:");
        foreach(var pair in days) {
            Console.WriteLine($"{pair.Key} - {pair.Value}");
        }

    }
}