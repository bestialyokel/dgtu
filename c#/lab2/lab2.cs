using System;
using System.Collections.Generic;
using System.Linq;


class Utensil {
    private string m_name;
    private readonly string m_material;
    public string material {
        get {
            return this.m_material;
        }
    }
    public virtual string getType() {
        return "Utensil";
    }
    public string name {
        get {
            return this.m_name;
        } 
        set {
            this.m_name = value;
        }
    }
    public Utensil(string _name, string _material) {
        this.name = _name;
        this.m_material = _material;
    }
    public void print() {
        Console.WriteLine($"I am {this.name} made of {this.material}");
    }
}

class Spoon : Utensil {
    public Spoon(string name, string material) : base(name, material) {}
    public override string getType() {
        return "Spoon";
    }
}

class Fork : Utensil {
    public Fork(string name, string material) : base(name, material) {}
    public override string getType() {
        return "Fork";
    }
}

class Electrical {
    private
        Socket source;
        uint m_voltage;
    public
        uint voltage {
            get {
                return this.m_voltage;
            }
        }
        bool isPowered {
            get {
                return this.source != null;
            }
        }
    public virtual string getType() {
            return "Electrical";
        }
    public Electrical(uint volt) {
        this.m_voltage = volt;
    }
}

class Fridge : Electrical {
    private
        readonly uint m_capacity;
    public
        uint capacity {
            get {
                return this.m_capacity;
            }
        }
    public override string getType() {
            return "Fridge";
        }
    public Fridge(uint voltage, uint capct) : base(voltage) {
        this.m_capacity = capct;
    }

}
class Iron : Electrical {
    private 
        readonly uint m_power;
    public
        uint power {
            get {
                return this.m_power;
            }
        }
    public override string getType() {
            return "Iron";
        }
    public Iron (uint voltage, uint powr) : base(voltage) {
        this.m_power = powr;
    }
}
class VCleaner : Electrical {
    private 
        readonly uint m_absorbPower;
    public
        uint absorbPower {
            get {
                return this.m_absorbPower;
            }
        }
    public override string getType() {
            return "VCleaner";
        }
    public VCleaner (uint voltage, uint absPower) : base(voltage) {
        this.m_absorbPower = absPower;
    }
}

class Socket {
    private 
        Electrical inserted;
    public
        uint voltage;
        bool isFree {
            get {
                return this.inserted == null;
            }
        }
        void printStatus() {
            if (this.isFree) Console.WriteLine("not working");  
            else Console.WriteLine($"i'am working with {this.inserted}");
        }
        void plug(Electrical device) {
            if (this.inserted == null && this.voltage == device.voltage) this.inserted = device;
        }
        void unplug() {
            this.inserted = null;
        }
    
    public Socket(uint volt) {
        this.voltage = volt;
    }

}

class Mechanical {
    private
        string m_name;
        readonly string m_function;
    public
        string function {
            get {
                return this.m_function;
            }
        }
        string name {
            get {
                return this.m_name;
            }
        }
    public Mechanical(string name, string function) {
        this.m_name = name;
        this.m_function = function;
    }

}

class lab2 {
    static void Main()  {  
       Mechanical a = new Mechanical("abc", "works");
       Console.Write(a.function);
    }
}