using System;
using System.IO;
using System.Runtime.Serialization;
//using System.Runtime.Serialization.Formatters.Soap;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Generic;
using System.Threading.Tasks;


[Serializable]
public partial class Graph {
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
    /*
    private ref uint edge_ref(int x, int y) {
        if (x < 0 && x > matrix.Count - 1 
            || y < 0 && y > matrix.Count - 1) 
            throw new Exception($"{x}-{y} out of range");
        // swap?
        if (x > y) {
            x ^= y;
            y ^= x;
            x ^= y;
        }
        return ref matrix[x][y];
    }
    */
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
    // try-catch-finally
    public static async Task SerializeBinaryTo(Graph G, string fileName) {
        using (Stream st = new FileStream(fileName, FileMode.Create) ) {
            await Task.Run( () => new BinaryFormatter().Serialize(st, G) );
        }
    }
    // async -> The return type of an async method must be void or task type 
    /*public static Graph DeserializeFromBinary(string fileName) {
        using (Stream st = new FileStream(fileName, FileMode.Open, FileAccess.Read) ) {
            return (Graph) new BinaryFormatter().Deserialize(st);
        }
    }*/
    // я хз но это должно работть наверно
    // разобраться как получить результат / узнать исход сериализации
    public static async Task<Graph> DeserializeFromBinary(string fileName) {
        using (Stream st = new FileStream(fileName, FileMode.Open, FileAccess.Read) ) {
            return await Task<Graph>.FromResult((Graph) new BinaryFormatter().Deserialize(st));
        }
    }
    public static async Task<Graph> DeserializeFromJson(string fileName) {
        using (Stream st = new FileStream(fileName, FileMode.Open, FileAccess.Read) ) {
            return await Task<Graph>.FromResult((Graph) new BinaryFormatter().Deserialize(st));
        }
    }

    public static async Task SerializeJsonTo(Graph G, string fileName) {
        
    }
}


class Lab8 {
    public static void Main() {
        Graph G = new Graph(4);
    }
}