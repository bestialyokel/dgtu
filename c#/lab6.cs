using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Security.Permissions;
using System.Text.RegularExpressions;

public interface IFileOperation {
    bool Accept(string fileName);
    void Process(string fileName);
}

public class Txt : IFileOperation {
    Regex txt = new Regex(@"^\D.txt$");

    public bool Accept(string fileName) {
        return txt.IsMatch(fileName);
    }
    public void Process(string fileName) {
        Console.WriteLine("TXT");
    }
}

public class Exe : IFileOperation {
    Regex exe = new Regex(@"^\D.exe$");

    public bool Accept(string fileName) {
        return exe.IsMatch(fileName);
    }
    public void Process(string fileName) {
        Console.WriteLine("EXE");
    }
}

class lab6 { 
    public static void createHandle(object source, FileSystemEventArgs e)  {
        
        foreach(var a in Rules) {
            if (a.Accept(e.FullPath)) a.Process(e.FullPath);
        }
        Console.WriteLine($"File: {e.FullPath} {e.ChangeType}");
    }

    public static void Main() {
        List<IFileOperation> Rules = new List<IFileOperation>();

        a.Add(new Txt());
        a.Add(new Exe());

        using (FileSystemWatcher 
                watcher = new FileSystemWatcher()) {

            watcher.Path = "./folder";

            watcher.NotifyFilter = NotifyFilters.LastAccess
                                 | NotifyFilters.LastWrite
                                 | NotifyFilters.FileName
                                 | NotifyFilters.DirectoryName;



            watcher.Created += createHandle;


            watcher.EnableRaisingEvents = true;


            Console.WriteLine("Press 'q' to quit the sample.");
            while (Console.Read() != 'q') ;
        }
    }
}