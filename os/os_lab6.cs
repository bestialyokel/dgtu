using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace OC_6_LABA
{
    using c = Console;
    class Program
    {
        static string mainpath = @"C:\Users\Nikita\Desktop\test\pack.txt";
        static List<string> catalog = new List<string>();
        static List<string> catptr = new List<string>();
        static List<files> file = new List<files>();
        static char[] path = new char[10000];
        static int size_bl = 32;

        class files
        {
            public string name;
            public string data;
            public int catalog;
            public string ptr;
            public bool check = false;
            public List<string> dataptr = new List<string>();
            public files(string n, int cat)
            {
                name = n;
                data = "null";
                ptr = "====";
                catalog = cat;
            }
        }

        static int ffb()
        {
            int t = 0, tt = 0;
            for (int i = 1024; i < path.Length; i++)
            {
                if ((i % size_bl) == 0)
                {
                    t = i;
                    tt = 1;
                }
                if (path[i] == '=') tt++;
                if (tt == size_bl) return i - size_bl + 2;
            }
            return path.Length;
        }
        static int ffbf()
        {
            int t = 0, tt = 0;
            for (int i = 2048; i < path.Length; i++)
            {
                if ((i % size_bl) == 0)
                {
                    t = i;
                    tt = 1;
                }
                if (path[i] == '=') tt++;
                if (tt == size_bl) return i - size_bl + 2;
            }
            return path.Length;
        }
        static int ffb2(int tar)
        {
            int t = 0, tt = 0;
            if (tar == 0) t = 0;
            if (tar == 1) t = 2048;
            if (tar == 1) t = 2048 + 1024;
            for (int i = 1024 + t; i < path.Length; i++)
            {
                if ((i % size_bl) == 0)
                {
                    t = i;
                    tt = 1;
                }
                if (path[i] == '=') tt++;
                if (tt == size_bl) return i - size_bl + 2;
            }
            return path.Length;
        }
        static void write()
        {
            clear();
            int temp = 0, p = 0, pp = 0;
            foreach (string name in catalog)
            {
                p = 0;
                pp = 0;
                for (int i = size_bl * temp; i < (size_bl * temp) + size_bl; i++)
                {
                    if (i < (size_bl * temp) + name.Length)
                    {
                        path[i] = name[p];
                        p++;
                    }
                    if (i % size_bl >= 28)
                    {
                        path[i] = catptr[temp][pp];
                        pp++;
                    }
                }
                temp++;
            }
            temp = 32;
            int t = 0;
            int t1 = 0;
            int t2 = 64;
            int t3 = 96;
            int l = 0;
            foreach (files name in file)
            {
               // if (name.catalog == 0 && name.check == false) l = t1;
                //if (name.catalog == 1 && name.check == false) l = t2;
               // if (name.catalog == 1 && name.check == false) l = t3;
                name.check = true;
                p = 0;
                pp = 0;
                for (int i = size_bl * temp + l; i < (size_bl * temp + l) + size_bl; i++)
                {
                    if (i < (size_bl * temp + l) + name.name.Length)
                    {
                        path[i] = name.name[p];
                        p++;
                    }
                    if (i % size_bl >= 28)
                    {
                        path[i] = name.ptr[pp];
                        pp++;
                    }
                }
                t++;
                temp++;
            }
            foreach (files f in file)
            {
                p = 0;
                for (int i = 0; i < Convert.ToInt32(f.dataptr.Count); i++)
                {
                    pp = 0;
                    if (f.dataptr[i] == "====")
                    {
                        for (int j = ffbf(); j < ffbf() + size_bl; j++)
                        {
                            if (p < f.data.Length)
                            {
                                path[j] = f.data[p];
                                p++;
                            }
                        }
                    }
                    else
                    {
                        for (int j = Convert.ToInt32(f.dataptr[i]); j < Convert.ToInt32(f.dataptr[i]) + size_bl; j++)
                        {
                            if (j % size_bl >= 28)
                            {
                                path[j] = f.dataptr[i + 1][pp];
                                pp++;
                            }
                            else
                            {
                                if (p < f.data.Length)
                                {
                                    path[j] = f.data[p];
                                    p++;
                                }
                            }
                        }
                    }
                }
            }

            string myChar = new string(path);

            File.WriteAllText(mainpath, myChar);
        }
        static void catlist()
        {
            for (int i = 0; i < catalog.Count; i++)
            {
                c.WriteLine(i + 1 + " - " + catalog[i]);
            }
        }
        static void filelist(int target)
        {
            int t = 1;
            for (int i = 0; i < file.Count; i++)
            {
                if (file[i].catalog == target)
                {
                    c.WriteLine(t + " - " + file[i].name);
                    t++;
                }
            }
        }
        static void rowptr(files f)
        {
            string temp = f.data;
            f.dataptr.Add(f.ptr);
            string t = "";
            int test = ffbf();
            path[test] = 'N';
            path[test + 1] = 'N';
            for (int i = 0; i <= f.data.Length / (size_bl - 4); i++)
            {
                if(temp.Length > size_bl - 4)
                {
                    t = "";
                    string ptr = ffbf().ToString();
                    for (int j = 0; j < ptr.Length; j++)
                    {
                        if (j < 4 - ptr.Length) t += '=';
                        else
                            t += ptr[j];
                    }
                    f.dataptr.Add(t);
                    test = ffbf();
                    path[test] = 'N';
                    path[test + 1] = 'N';
                    temp = temp.Remove(0, size_bl - 4);
                }
                else
                {
                    f.dataptr.Add("====");
                }
            }
        }
        static void del(files f)
        {
            for (int i = 0; i < f.dataptr.Count; i++)
            {
                if (f.dataptr[i] == "====")
                {
                    
                }
                else
                {
                    for (int j = Convert.ToInt32(f.dataptr[i]); j < Convert.ToInt32(f.dataptr[i]) + size_bl; j++)
                    {
                        path[j] = '=';
                    }
                }
            }

        }
        static void Main(string[] args)
        {
            int v = 0;
            string name = "";
            int targetcat = 0;
            int targetfile = 0;
            List<int> test = new List<int>();
            
            for (int i = 0; i < 10000; i++)
            {
                path[i] = '=';
            }
            while(true)
            {
                string tests = new string(path);
                c.WriteLine("1 - Создать каталог");
                c.WriteLine("2 - Переименовать каталог");
                c.WriteLine("3 - Выбрать каталог");
                c.WriteLine("4 - Удалить каталог");
                v = Convert.ToInt32(c.ReadLine());

                switch (v)
                {
                    case 1:
                        c.WriteLine("Введите имя каталога.");
                        name = c.ReadLine();
                        catalog.Add(name);
                        catptr.Add("====");
                        write();
                        break;
                    case 2:
                        catlist();
                        c.WriteLine("Выберете каталог.");
                        v = Convert.ToInt32(c.ReadLine()) - 1;
                        c.WriteLine("Введите имя каталога.");
                        name = c.ReadLine();
                        catalog[v] = name;
                        write();
                        break;
                    case 3:
                        catlist();
                        c.WriteLine("Выберете каталог.");
                        targetcat = Convert.ToInt32(c.ReadLine()) - 1;
                        while (v != 0)
                        {
                            c.WriteLine("1 - Создать новый файл");
                            c.WriteLine("2 - Открыть файл");
                            c.WriteLine("3 - Удалить файл");
                            v = Convert.ToInt32(c.ReadLine());
                            string ptr = "";
                            string temp = "";
                            switch (v)
                            {
                                case 1:
                                    c.WriteLine("Введите имя файла.");
                                    name = c.ReadLine();
                                    string tempstr = new string(path);
                                    tempstr = tempstr.Remove(0, 1024);
                                    if (tempstr.Contains(name))
                                    {
                                        c.WriteLine("Файл с таким именем уже существует");
                                    }
                                    else
                                    {
                                        ptr = ffb().ToString(); temp = "";
                                        c.WriteLine(ptr);
                                        for (int i = 0; i < ptr.Length; i++)
                                        {
                                            if (i < 4 - ptr.Length) temp += '=';
                                            else
                                                temp += ptr[i];
                                        }
                                        if (catptr[targetcat] == "====") catptr[targetcat] = temp;
                                        file.Add(new files(name, targetcat));
                                        write();
                                    }
                                    break;
                                case 2:
                                    filelist(targetcat);
                                    c.WriteLine("Выберете файл.");
                                    targetfile = Convert.ToInt32(c.ReadLine()) - 1;
                                    int pos = 0;
                                    while (v != 0)
                                    {
                                        
                                        c.WriteLine("1 - Изменение текущей позиции в файле");
                                        c.WriteLine("2 - Чтение данных из файла");
                                        c.WriteLine("3 - Запись данных в файла");
                                        c.WriteLine("0 - Выход");
                                        v = Convert.ToInt32(c.ReadLine());
                                        switch (v)
                                        {
                                            
                                            case 1:
                                                if (file[targetfile].data == "null")
                                                {
                                                    c.WriteLine("Файл пустой. Позиция 0");
                                                }
                                                else
                                                {
                                                    c.WriteLine("Введите позицию");
                                                    pos = Convert.ToInt32(c.ReadLine());
                                                }
                                                break;
                                            case 2:
                                                if (file[targetfile].data == "null")
                                                {
                                                    c.WriteLine("Файл пустой. Позиция 0");
                                                }
                                                else
                                                {
                                                    string t = "";
                                                    for (int i = pos; i < file[targetfile].data.Length; i++)
                                                    {
                                                        t += file[targetfile].data[i];
                                                    }
                                                    c.WriteLine("Данные: {0}",t);
                                                }
                                                break;
                                            case 3:
                                                if(file[targetfile].dataptr.Count != 0) del(file[targetfile]);
                                                c.WriteLine("Позиция {0}, введите данные", pos);
                                                if (pos == 0)
                                                {
                                                    file[targetfile].data = c.ReadLine();
                                                    file[targetfile].dataptr.Clear();
                                                    ptr = ffbf().ToString(); temp = "";
                                                    for (int i = 0; i < ptr.Length; i++)
                                                    {
                                                        if (i < 4 - ptr.Length) temp += '=';
                                                        else
                                                            temp += ptr[i];
                                                    }
                                                    file[targetfile].ptr = temp;
                                                    rowptr(file[targetfile]);
                                                    for (int i = 0; i < file[targetfile].dataptr.Count; i++)
                                                    {
                                                        c.WriteLine(file[targetfile].dataptr[i]);
                                                    }
                                                    write();
                                                }
                                                else
                                                {
                                                    string dat = c.ReadLine();
                                                    string str = "";
                                                    for (int i = 0; i < file[targetfile].data.Length; i++)
                                                    {
                                                        if (i != pos)
                                                        {
                                                            str += file[targetfile].data[i];
                                                        }
                                                        else
                                                        {
                                                            for(int j = 0; j < dat.Length; j++)
                                                            {
                                                                str += dat[j];
                                                            }
                                                            str += file[targetfile].data[i];
                                                        }
                                                    }
                                                    file[targetfile].data = str;
                                                    file[targetfile].dataptr.Clear();
                                                    ptr = ffbf().ToString(); temp = "";
                                                    for (int i = 0; i < ptr.Length; i++)
                                                    {
                                                        c.WriteLine(i + " +++ ");
                                                        if (i < 4 - ptr.Length) temp += '=';
                                                        else
                                                            temp += ptr[i];
                                                    }
                                                    file[targetfile].ptr = temp;
                                                    rowptr(file[targetfile]);
                                                    for (int i = 0; i < file[targetfile].dataptr.Count; i++)
                                                    {
                                                        c.WriteLine(file[targetfile].dataptr[i]);
                                                    }
                                                    write();
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    v = 1;
                                    break;
                                case 3:
                                    filelist(targetcat);
                                    c.WriteLine("Выберете файл.");
                                    targetfile = Convert.ToInt32(c.ReadLine()) - 1;
                                    c.WriteLine("Файл '{0}' удалён.",file[targetfile].name);
                                    tempstr = new string(path);
                                    tempstr = tempstr.Remove(0,500);
                                    int index = tempstr.IndexOf(file[targetfile].name) + 500;
                                    for (int i = index; i < index + size_bl; i++)
                                    {
                                        path[i] = '=';
                                    }
                                    tempstr = new string(path);
                                    catptr[targetcat] = "====";
                                    del(file[targetfile]);
                                    file[targetfile].data = "";
                                    file[targetfile].dataptr.Clear();
                                    ptr = ffbf().ToString(); temp = "";
                                    for (int i = 0; i < ptr.Length; i++)
                                    {
                                        if (i < 4 - ptr.Length) temp += '=';
                                        else
                                            temp += ptr[i];
                                    }
                                    file[targetfile].ptr = temp;
                                    for (int i = 0; i < file[targetfile].dataptr.Count; i++)
                                    {
                                        c.WriteLine(file[targetfile].dataptr[i]);
                                    }
                                    file.RemoveAt(targetfile);
                                    write();
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;
                    case 4:
                        catlist();
                        c.WriteLine("Выберете каталог.");
                        targetcat = Convert.ToInt32(c.ReadLine()) - 1;
                        if (catptr[targetcat] == "====")
                        {
                            c.WriteLine("Пустой каталог '{0}' удалён.",catalog[targetcat]);
                            catalog.RemoveAt(targetcat);
                        }
                        else
                        {
                            c.WriteLine("Каталог '{0}' не пустой. Удаление отменено.", catalog[targetcat]);
                        }
                        write();
                        break;
                    default:
                        break;
                }
            }
            
        }
        public static void clear()
        {
            for (int i = 0; i < path.Length; i++)
            {
                path[i] = '=';
            }
        }
    }
}
