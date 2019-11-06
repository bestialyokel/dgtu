#include <cstdlib>
#include <iostream>

using namespace std;

class Array {
    private:
        int *arr;
    public:
        size_t length;
        Array(){}
        void remove(size_t index) {

        }
        void push(int value) {
            this->length++;
            this->arr = (int *)realloc(this->arr, this->length * sizeof(int));
            this->arr[this->length - 1] = value;
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

    return 0;
}