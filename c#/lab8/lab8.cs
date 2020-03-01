using System;
using System.IO;
using System.Runtime.Serialization;
//using System.Runtime.Serialization.Formatters.Soap;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;


[Serializable]
public partial class Graph {
    [XmlArray("Matrix-Line-List"), XmlArrayItem("Matrix-Line"), XmlArrayItem("Vertex-Weight")]
    List< List<uint> > matrix = new List< List<uint> >();
    public Graph(uint vertexAmount) {
        //хватит куска над верхней диагональю матрицы
        //инициализация списков и обнуление вершин...
        for(int i = 0; i < vertexAmount - 1; i++) {
            matrix.Add(new List<uint>());
            for(int j = 0; j < vertexAmount - i - 1; j++) 
                matrix[i].Add(0);
        }
    }
    public uint GetWeight(int x, int y) {
        if (x < 0 && x > matrix.Count - 1 
            || y < 0 && y > matrix.Count - 1) 
            throw new Exception($"{x}-{y} out of range");
        // swap?
        if (x > y) {
            x ^= y;
            y ^= x;
            x ^= y;
        }
        return matrix[x][y];
    }
    public void SetWeight(int x, int y, uint value) {
        if (x < 0 && x > matrix.Count - 1 
            || y < 0 && y > matrix.Count - 1) 
            throw new Exception($"{x}-{y} out of range");
        // swap?
        if (x > y) {
            x ^= y;
            y ^= x;
            x ^= y;
        }
        matrix[x][y] = value;
    }
    public void AddVertex() {
        for(int i = 0; i < matrix.Count; i++)
            matrix[i].Add(0);
        matrix.Add(new List<uint>());
    }
}


//serializations
public partial class Graph {
    /*
        await Task.Run( () => {
            SerializeBinaryTo()
        })
    */
    public static void SerializeBinaryTo(Graph G, Stream st) => new BinaryFormatter().Serialize(st, G);
    /*new BinaryFormatter().Serialize(st, G);*/ 
    
    public static Graph DeserializeFromBinary(Stream st) => (Graph) new BinaryFormatter().Deserialize(st);
}


class Lab8 {
    public static void Main() {
        Graph G = new Graph(4);
    }
}