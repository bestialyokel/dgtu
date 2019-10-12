using System;
using System.Collections.Generic;
using System.Linq;


class lab1 {
    static void printMatrix(int[,] matrix) {
        for (int i = 0; i < matrix.GetLength(0); i++) {
            for(int j = 0; j < matrix.GetLength(1); j++) {Console.Write(matrix[i,j]); Console.Write(" ");};
            Console.WriteLine();
        }
    }
    static int[,] transpon(int[,] matrix) {
        int[,] newMatrix = new int[matrix.GetLength(1), matrix.GetLength(0)];
        for (int i = 0; i < newMatrix.GetLength(0); i++)
            for(int j = 0; j < newMatrix.GetLength(1); j++) newMatrix[i,j] = matrix[j,i];
        return newMatrix;
    }
    static int[,] matrixAdd(int[,] first, int[,] second) {
        try {
            if (!(first.GetLength(0) == second.GetLength(0) && first.GetLength(1) ==  second.GetLength(1)) ) throw new Exception("diferent sizes error");
            int[,] newMatrix = new int[first.GetLength(0), first.GetLength(1)];
            for (int i = 0; i < newMatrix.GetLength(0); i++) 
                for(int j = 0; j < newMatrix.GetLength(1); j++) newMatrix[i,j] = first[i,j] + second[i,j];
            return newMatrix;
        } catch(Exception e) {
            Console.WriteLine(e.Message);
            return new int[1,1];
        } 
    }
    public static uint ReadUint() {
        try {
            uint num;
            if (UInt32.TryParse(Console.ReadLine(), out num)) return num;
            else {
                throw new Exception("Wrong uint input, please repeat");
            }
        } catch (Exception e) {
            Console.WriteLine(e.Message);
            return ReadUint();
        }
    }
    public static int ReadInt() {
        try {
            int num;
            if (Int32.TryParse(Console.ReadLine(), out num)) return num;
            else {
                throw new Exception("Wrong uint input, please repeat");
            }
        } catch (Exception e) {
            Console.WriteLine(e.Message);
            return ReadInt();
        }
    }
    public static uint[] inputMatrixSizes() {
        uint[] sizes = new uint[2];
        sizes[0] = ReadUint();
        sizes[1] = ReadUint();
        return sizes;
    }
    public static int[,] inputMatrix(uint n, uint m) {
        int[,] matrix = new int[n,m];
        for (int i = 0; i < n; i++) for(int j =0; j < m; j++) matrix[i,j] = ReadInt();
        return matrix;
    }
    static void Main()  {  
        Console.WriteLine("Введите размер первой матрицы");
        uint[] FirstSizes = inputMatrixSizes();
        Console.WriteLine("Введите размер второй матрицы");
        uint[] SecondSizes = inputMatrixSizes();
        Console.WriteLine("ввод первой матрицы");
        int[,] First = inputMatrix(FirstSizes[0], FirstSizes[1]);
        Console.WriteLine("ввод второй матрицы");
        int[,] Second = inputMatrix(SecondSizes[0], SecondSizes[1]);
        Second = transpon(Second);
        int[,] newMatrix = matrixAdd(First, Second);
        Console.WriteLine();
        Console.WriteLine("RESULT:");
        printMatrix(newMatrix);
        return;
    }
}