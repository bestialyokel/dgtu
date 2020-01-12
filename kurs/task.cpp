#include ",/list.cpp"

#ifndef TASK
#define TASK

template< size_t SIZE, size_t EACH, bool LOG_INFO> class Task {
    private:
        List<size_t> list;
    public:
    Task() {
        if (SIZE == 0) throw "bad size";
        if (LOG_INFO)
        for (int i = 0; i < SIZE; i++) list.push_back(i);
    }
    size_t last_index() {
        
        auto begin = list.begin();
        auto end = list.end();

        while (begin != end) {
            for (int i = 0; i < EACH; i++) begin = begin++;
            list.remove(begin);
        } 

    }
}

#endif