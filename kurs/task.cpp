#include "./list.cpp"

#include <iostream>
#include <cstddef>

using namespace std;

#ifndef TASK
#define TASK

template< size_t SIZE, size_t EACH, bool LOG_INFO> class Task {
    private:
        List<size_t> list;
    public:
    Task() {
        if (SIZE == 0) throw "bad size";
        if (EACH == 0) throw "bad each";
        for (int i = 0; i < SIZE; i++) this->list.push_back(i);
    }
    size_t last_index() {
        
        auto begin = list.begin();
        auto end = list.end();

        while (begin != end) {
            for (int i = 0; i < EACH; i++) begin = begin++;
            list.remove(begin);
        } 
        return *begin;
    }
};

#endif