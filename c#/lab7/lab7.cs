
using System;
using System.Reflection;
using System.Collections.Generic;

class DebugPrintAttribute : Attribute {
    public string format;
    public DebugPrintAttribute(string format = "{0}") {
        this.format = format;
    }
}

class MyClass {
    [DebugPrintAttribute()]
    public int x;
    [DebugPrintAttribute("{0} {1}")]
    private int y;
    [DebugPrintAttribute("{0} {1} {2}")]
    public int abc {
        get {
            return x;
        }
    }
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

class RefLab {
    public static void DebugPrint(object obj) {
        Type t = obj.GetType();
        // private&public
        BindingFlags flags = BindingFlags.Public
                                | BindingFlags.Instance
                                | BindingFlags.NonPublic;
        // fields&properties
        List<MemberInfo> members = new List<MemberInfo>();
        members.AddRange(t.GetFields(flags));
        members.AddRange(t.GetProperties(flags));
        foreach (MemberInfo MI in members) {
            DebugPrintAttribute DPA = 
                (DebugPrintAttribute) MI.GetCustomAttribute(typeof(DebugPrintAttribute));
            if (DPA != null) 
                Console.WriteLine(DPA.format, MI.GetValue(obj), MI.Name, MI.ReflectedType);
            
        }
    }
}



static class Lab7 {

    public static object GetValue(this MemberInfo memberInfo, object forObject) {
        switch (memberInfo.MemberType) {
            case MemberTypes.Field:
                return ((FieldInfo) memberInfo).GetValue(forObject);
            case MemberTypes.Property:
                return ((PropertyInfo) memberInfo).GetValue(forObject);
            default:
                throw new NotImplementedException();
        }
    } 

    public static void Main() {
        MyClass a = new MyClass(1,2);
        RefLab.DebugPrint(a);
        //RefLab.GetValue();
    }
}