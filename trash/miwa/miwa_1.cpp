#include <string>
#include <iostream>
#include <vector>

using namespace std;


//абстрактный класс т.к есть чистый вирутальный метод speech 
class Animal {
    protected:
        string name = "default";
    public:
        Animal(const string &name) : name(name) {}

        //спецификатор delete
        Animal(const Animal &a) = delete;

        //спецификатор default
        Animal() = default;

        //виртуальный метод
        virtual string speech() = 0;

};

class Parrot : public Animal {
    public:
        Parrot(const string &name) : Animal(name) {}
        Parrot() : Animal() {}

        //спецификатор override, перегруженный метод, динамический полиморфимз
        string speech() override final {
            return "Parrot : " + name;
        }

        //шаблонный метод
        template<int count>
        string racistSpeech() {
            return "kill " + std::to_string(count) + " niggz";
        }

        //статический полиморфизм
        string cannibalismSpeech() {
            return "kill and eat all parrots";
        }

        //хз че за лютый каст в to_string. приведение адресса к int
        string cannibalismSpeech(const Parrot *p) {
            return "kill and eat parrot living at " + std::to_string( *((int*)(&p)) );
        }

        //параметрический полиморфизм с помощью шаблона, наверно
        template<typename T, int count = 1488>
        string racistSpeech(const T &arg) {
            return "kill " + std::to_string(count) + " niggz living at " + std::to_string((int) &arg);
        }
};



int main(void) {
    Animal *a = new Parrot("a");
    Animal *b = new Parrot("b");
    //Демонстрация позднего связывания
    cout << a->speech() << endl;

    cout << ((Parrot*) a)->racistSpeech<1488>() << endl;

    cout << ((Parrot*) a)->cannibalismSpeech() << endl;
    cout << ((Parrot*) a)->cannibalismSpeech( (Parrot*) b) << endl;;
    return 0;
}
