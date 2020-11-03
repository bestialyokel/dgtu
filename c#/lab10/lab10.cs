using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic; 

using System.Text.RegularExpressions;
using System.Linq;
using System.IO;

 
// предположим, что в файле хост/пользователь/объем/день недели 0-6; 0 - воскресенье
public class lab10 {
    public static dynamic ReadLog(StreamReader st) {
        Dictionary<string, long> hosts = new Dictionary<string, long>();
        Dictionary<string, long> users = new Dictionary<string, long>();
        Dictionary<byte, long> days = new Dictionary<byte, long>();

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

            if (!hosts.ContainsKey(split[0])) {
                hosts.Add(split[0], 0);
            }
            if (!users.ContainsKey(split[1])) {
                users.Add(split[1], 0);
            }
            if (!days.ContainsKey(day)) {
                days.Add(day, 0);
            }

            hosts[split[0]] += traffic;
            users[split[1]] += traffic;
            days[day] += traffic;
        }  

        return new {
            Hosts = hosts,
            Users = users,
            DaysOfWeek = days
        };

    } 

    static async Task<dynamic> Perf(string path) {
        string[] files = Directory.GetFiles(path)
                        .Where(file => Regex.IsMatch(file, @".*\.txt$")).ToArray();

        var hosts = new Dictionary<string, long>();
        var users = new Dictionary<string, long>();
        var days = new Dictionary<byte, long>();

        var tasks = new Task<dynamic>[files.Length]; 

        for (int i = 0; i < tasks.Length; i++) {
            var index = i;
            tasks[i] = Task.Run<dynamic>(
                () => {
                    using(StreamReader st = new StreamReader(files[index])) {
                        var result = ReadLog(st);
                        return new {
                            Hosts = result.Hosts,
                            Users = result.Users,
                            DaysOfWeek = result.DaysOfWeek
                        };
                    }
                    
                }
            );
        }


        var t = await Task.WhenAll(tasks);

        foreach(var result in t) {
            foreach(var pair in result.Hosts) {
                if (!hosts.ContainsKey(pair.Key)) {
                    hosts.Add(pair.Key, 0);
                }
                hosts[pair.Key] += pair.Value;
            }
            foreach(var pair in result.Users) {
                if (!users.ContainsKey(pair.Key)) {
                    users.Add(pair.Key, 0);
                }
                users[pair.Key] += pair.Value;
            }
            
            foreach(var pair in result.DaysOfWeek) {
                if (!days.ContainsKey(pair.Key)) {
                    days.Add(pair.Key, 0);
                }
                days[pair.Key] += pair.Value;
            }  
        }

        return new {
            Hosts = hosts,
            Users = users,
            DaysOfWeek = days
        };
    }


    public static void Main() {
        string path = "./logs";

        var watch = System.Diagnostics.Stopwatch.StartNew();
        var t = Task.Run(() => Perf(path) );
        t.Wait();
        watch.Stop();
        
        var elapsedMs = watch.ElapsedMilliseconds;

        Console.WriteLine($"exec {elapsedMs}");

        Console.WriteLine("Hosts:");
        foreach(var pair in t.Result.Hosts) {
            Console.WriteLine($"{pair.Key} - {pair.Value}");
        }
        Console.WriteLine("\nUsers:");
        foreach(var pair in t.Result.Users) {
            Console.WriteLine($"{pair.Key} - {pair.Value}");
        }
        Console.WriteLine("\nDays:");
        foreach(var pair in t.Result.DaysOfWeek) {
            Console.WriteLine($"{pair.Key} - {pair.Value}");
        }
    }
}