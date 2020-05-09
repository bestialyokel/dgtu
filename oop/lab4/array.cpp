#include <cstdlib>
#include <iostream>

using namespace std;

class Array {
    private:
        int *arr = NULL;
    public:
        size_t length = 0;
        Array(){}
        void remove(size_t index) {
            if (this->length == 0) return;
            if (this->length == 1) {
                this->arr = NULL;
                this->length = 0;
                return;
            }
            for (int i = index; i < this->length - 1; i++) this->arr[i] = this->arr[i+1];
            this->length--;
            this->arr = (int *)realloc(this->arr, this->length * sizeof(int));
        }
        void push(int value) {
            if (this->arr == NULL) {
                this->arr = new int[1];
                this->arr[0] = value;
                this->length++;
            }
            else {
                this->length++;
                this->arr = (int *)realloc(this->arr, this->length * sizeof(int));
                this->arr[this->length - 1] = value;
            }
        }
        int& operator[](size_t index) {
            if (index < this->length) return this->arr[index];
            this->arr = (int *)realloc(this->arr, (index + 1) * sizeof(int));
            return this->arr[index];
        }
        const int& operator[](size_t index) const {
            if (index >= this->length) throw "out of range";
            return this->arr[index];
        }
};

int main() {
    Array a;
    a.push(12);
    a.push(2);
    a.push(2412);
    a.push(25);
    a.remove(2);
    cout << a[0];
    for (int i = 0; i < a.length; i++) cout << a[i] << endl;
    return 0;
}