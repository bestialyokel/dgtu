using System;
using System.IO;
using System.Runtime.Serialization;
//using System.Runtime.Serialization.Formatters.Soap;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections.Generic;


[Serializable]
public class Graph {
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
    public static void SerializeTo(Graph G, string fileName) {
        Stream st = new FileStream(fileName, FileMode.Create);
        IFormatter f = new BinaryFormatter();
        f.Serialize(st, G);
        st.Close();
    }
    public static Graph DeserializeFrom(string fileName) {
        Stream st = new FileStream(fileName, FileMode.Open, FileAccess.Read);
        IFormatter f = new BinaryFormatter();
        Graph G = (Graph) f.Deserialize(st);
        st.Close();
        return G;
    }
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
    public uint GetWeight(int x, int y) {
        uint edge = edge_ref(x, y);
        return edge;
    }
    public void SetWeight(int x, int y, uint value) {
        ref uint edge = ref edge_ref(x, y);
        edge = value;
    }
    public void AddVertex() {
        for(int i = 0; i < matrix.Count; i++)
            matrix[i].Add(0);
        matrix.Add(new List<uint>());
    }
}


class Lab8 {
    public static void Main() {
        Graph G = new Graph(4);
    }
}