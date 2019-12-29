using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//интерфейс источника тока 
public interface IElectricSource {
    uint Voltage();
    uint MaxPower();
}

//интерфейс электрического прибора 
public interface IElectricAppliance {
    uint Voltage();
    uint MaxPower();
    string type{get;set;}
}

//интерфейс электрического шнура  
public interface IElectricWire {
    uint Voltage();
    uint MaxPower();
    uint length{get; set;}
}



class PowerSocket : IElectricSource {
    private uint voltage;
    private uint maxpower;
    public List<string> appli = new List<string>();

    public PowerSocket(uint x = 220, uint y = 300) {
        this.voltage = x;
        this.maxpower = y;
    }

    public uint Voltage() => this.voltage;

    public uint MaxPower() => this.maxpower;

    public void show() {
        Console.WriteLine(" Список подключенных прибороб : ");

        if (appli.Count == 0) 
            Console.WriteLine(" Подключений нет ");
        else 
            for (int i = 0; i < appli.Count; i++) 
                Console.WriteLine(" Подключен : {0}  ", appli[i]);

    }
}


class Wire : IElectricWire {
    private uint voltage;
    private uint maxpower;

    public PowerSocket obj;

    public Wire(PowerSocket ps, uint x = 220, uint y = 300) {
        this.obj = ps;
        this.voltage = x;
        this.maxpower = y;
    }

    public uint Voltage() => this.voltage;
    public uint MaxPower() => this.maxpower;

    public delegate void off();
    public delegate void on();

    public event off TO_OFF;
    public event on TO_ON;

    public void ON() => TO_ON();

    public void OFF() => TO_OFF();

    public void show() {
        Console.WriteLine(" Список подключенных прибороб : ");

        if (obj.appli.Count == 0) 
            Console.WriteLine(" Подключений нет ");
        else 
            for (int i = 0; i < obj.appli.Count; i++) 
                Console.WriteLine("Подключен : {0}  ", obj.appli[i]);
    
        Console.WriteLine();
    }

}

class Netbook : IElectricAppliance {
    private uint voltage;
    private uint maxpower;
    private string name;
    private PowerSocket obj;

    public Netbook(PowerSocket obj, uint x = 220, uint y = 300, string nam = " NetBook ") {
        this.voltage = x;
        this.maxpower = y;
        this.name = nam;
        this.obj = obj;
    }
    public uint Voltage() => this.voltage;

    public uint MaxPower() => this.maxpower;

    public void on() {
        this.obj.appli.Add(this.name);
    }

    public void off() {
        this.obj.appli.Remove(this.name);
    }

    public void show() {
        Console.WriteLine(this.name);
    }

}

class Kettle : IElectricAppliance {
    private uint voltage;
    private uint maxpower;
    private string name;
    private PowerSocket obj;
    public Kettle(PowerSocket obj, uint x = 220, uint y = 300, string nam = " Kettle ") {
        this.voltage = x;
        this.maxpower = y;
        this.name = nam;
        this.obj = obj;
    }
    public uint Voltage() => this.voltage;

    public uint MaxPower() => this.maxpower;

    public void on() {
        this.obj.appli.Add(this.name);
    }

    public void off() {
        this.obj.appli.Remove(this.name);
    }

    public void show() {
        Console.WriteLine(this.name);
    }
}
class lab4 {
    static void Main(string[] args) {
        PowerSocket p = new PowerSocket();
        Wire a = new Wire(p);
        Netbook nb = new Netbook(p);
        Kettle kt = new Kettle(p);

        a.TO_ON += nb.on;
        a.TO_OFF += nb.off;

        a.TO_ON += kt.on;
        a.TO_OFF += kt.off;

        a.ON();

        a.show();

        a.OFF();
        a.show();

        Console.ReadLine();
    }
}
