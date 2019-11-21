using System;

public interface IEelectric {
    int voltage {get; set;}
    int power {get; set;}
} 

public interface IElectricSource : IEelectric {
    IElectricWire wire {get; set;}
    
}

public interface IElectricAppliance : IEelectric {
}

public interface IElectricWire : IEelectric {

}



class lab4 {
    static void Main() {
    }
}