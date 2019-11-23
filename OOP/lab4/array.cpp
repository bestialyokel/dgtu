#include <cstdlib>
#include <iostream>

using namespace std;

class Array {
    private:
        int *arr;
    public:
        size_t length = 0;
        Array(){}
        void remove(size_t index) {
            for (int i = index; i < this->length; i++) this->arr[i] = this->arr[i+1];
            this->length--;
            this->arr = (int *)realloc(this->arr, this->length * sizeof(int));
        }
        void push(int value) {
            cout << (this->arr == NULL) << endl;
        }
        int& operator[](size_t index) {
            if (index < this->length) return this->arr[index];
            this->arr = (int *)realloc(this->arr, (index + 1)* sizeof(int));
            return this->arr[index];
        }
        const int& operator[](size_t index) const {
            return this->arr[index];
        }
};

int main() {
    Array a;
    a.push(12);
    for (int i = 0; i < a.length; i++) {
        cout << a[i] << endl;
    }
    return 0;
}