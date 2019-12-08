using System;

public interface IEelectric {
    int voltage {get; set;}
    int MAX_POWER {get; set;}
} 

public interface IEelectricTransmitter : IEelectric {
    IEelectric[] plugged {get; set;}
}

public interface IElectricSource : IEelectric, IEelectricTransmitter {

}

public interface IElectricAppliance : IEelectric {
    string name {get; set;}
    int reqPower {get; set}

}

public interface IElectricWire : IEelectric, IEelectricTransmitter {

}


public class SolarBattery : IElectricSource {

}

public class DieselGenerator : IElectricSource {
    
}

public class NuclearPowerPlant : IElectricSource {
    
}

public class Kettle : IElectricAppliance {
    
}

public class Lathe : IElectricAppliance {
    
}

public class Refrigerator : IElectricAppliance {
    
}

public class HighLine : IElectricWire {
    
}

public class StepDownTransformer : IElectricAppliance, IElectricSource {
    
}

public class ElectricPowerStrip : IElectricWire {
    
}

class lab4 {
    static void Main() {
    }
}