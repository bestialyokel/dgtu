using System;
using System.Reflection;

class MyClass {
    int x;
    int y;
    public MyClass(int i, int j) {
        this.x = i;
        this.y = j;
    }
    public int sum() => x+y;
    public void set(double a, double b) {
        x = (int) a;
        y = (int) b;
    }
}

class ReflectionDemo {
    public static void Main() {
        Type t = typeof(MyClass);
        Console.WriteLine("methods: \n");
        foreach(MethodInfo m in t.GetMethods()) {
            Console.WriteLine($" {m.Name} -> {m.ReturnType}");
        }
    }
}