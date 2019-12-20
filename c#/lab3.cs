using System;
using System.Collections;
using System.Collections.Generic;


internal class Node<T> {
    public T value;
    public Node<T> next = null;
    public Node(T value) {
        this.value = value;
    }
}

internal class UniqueList<T> : IEnumerable<Node<T>> {
    Node<T> head;
    public uint length = 0;
    public IEnumerator<Node<T>> GetEnumerator() {
        Node<T> p = this.head;
        while (p != null) {
            yield return p;
            p = p.next;
        }
    }
    IEnumerator IEnumerable.GetEnumerator() {
        return GetEnumerator();
    }
    public void push(T value) {
        if (this.head == null) {
            this.head = new Node<T>(value);
            this.length = 1;
            return;
        }
        Node<T> p = this.head;
        while (p.next != null) {
            if (p.value.Equals(value)) return;
            p = p.next;
        }
        p.next = new Node<T>(value);
        this.length++;
    }
    public void delete(T value) {
        if (this.head.value.Equals(value)) {
            this.head = this.head.next;
            this.length--;
            return;
        }
        Node<T> p = this.head;
        while (p.next != null) {
            if (p.next.value.Equals(value)) {
                p.next = p.next.next;
                this.length--;
                return;
            }
            p = p.next;
        }
    }
    public void print() {
        foreach(Node<T> node in this) Console.WriteLine(node.value);
    }
    public bool has(T value) {
        foreach(Node<T> node in this) if (node.value.Equals(value)) return true;
        return false;
    }
    public void delete(UniqueList<T> list) {
        if (this.head == null) return;
        Node<T> p = this.head;
        while(p.next != null) {
            if (list.has(p.next.value)) {
                p.next = p.next.next;
                if (p == null) return;
            }
            p = p.next;
        }
    }

}

class Set<T> : IEnumerable<T> {
    UniqueList<T> collection = new UniqueList<T>();
    public uint size = 0;
    public IEnumerator<T> GetEnumerator() {
        foreach(Node<T> node in this.collection) yield return node.value;
    }
    IEnumerator IEnumerable.GetEnumerator() {
        return GetEnumerator();
    }
    public void print() {
        foreach(T value in this) Console.WriteLine(value);
    }
    public bool has(T value) {
        foreach(T val in this) if (val.Equals(value)) return true;
        return false;
    }
    public void add(T value) {
        this.collection.push(value);
        this.size = this.collection.length;
    }
    public void delete(T value) {
        this.collection.delete(value);
        this.size = this.collection.length;
    }
    public Set() {}
    public Set(T value) {
        this.add(value);
    }
    public static Set<T> operator-(Set<T> a, Set<T> b) {
        Set<T> newSet = new Set<T>();
        foreach(T value in a) if (!b.has(value)) newSet.add(value);
        return newSet;
    }
    public static Set<T> operator+(Set<T> a, Set<T> b) {
        Set<T> newSet = new Set<T>();
        foreach(T p in a) foreach(T q in b) {newSet.add(p); newSet.add(q);}
        return newSet;
    }
    public static Set<T> operator*(Set<T> a, Set<T> b) {
        Set<T> newSet = new Set<T>();
        Set<T> leastSizeSet = a.size < b.size ? a : b;
        Set<T> greatestSizeSet = a.size > b.size ? a : b;
        foreach(T p in leastSizeSet) if (greatestSizeSet.has(p)) newSet.add(p);
        return newSet;
    }
    public static bool operator==(Set<T> a, Set<T> b) {
        if (a.size != b.size) return false;
        foreach(T p in a) if (!b.has(p)) return false;
        return true;
    }
    public static bool operator!=(Set<T> a, Set<T> b) {
        return !(a==b);
    }
    /*public static Set<int> operator<<(Set<int> a, int b) {
        a.add(b);
        return a;
    }*/
    public static implicit operator Set<T>(T value) => new Set<T>(value);
}

class lab3 {
    static void Main() {
        Set<uint> s = new Set<uint>();
    }
}