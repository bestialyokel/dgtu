#include <string>
#include <iostream>
#include <vector>
#include <functional>

using namespace std;

class Animal {
    private:
        string name;
    public:
        Animal(const string name = "bezrodni zver") {
            this->name = name;
        }
        Animal(const Animal &a) : name(a.name) {}
        virtual string speech() = 0;
        void setName(string name) {
            this->name = name;
        }
        inline string getName() {
            return name;
        }
};

class Parrot : public Animal {
    private:
    public:
        Parrot(const string name) : Animal(name) {}
        virtual string speech() {
            return "ya popugai : " + Animal::getName();
        }
};

class Dog : public Animal {
    private:
    public:
        Dog(const string name) : Animal(name) {}
        virtual string speech() {
            return "ya pes : " + Animal::getName();
        }
};


class Zoo {
    private:
        vector<Animal*> *animals;
        inline void addAnimal(Animal *a) {
            animals->push_back(a);
        }
    public:
        Zoo(vector<Animal*> *a = new vector<Animal*>()) : animals(a) {}
        //деструктор забыл
	~Zoo() {
	    for (auto it = begin(); it != end(); ++it)
                delete *it;
            delete animals;
        }
        typedef vector<Animal*>::const_iterator const_iterator;
        const_iterator begin() const {
            return animals->begin();
        }
        const_iterator end() const {
            return animals->end();
        }
        friend void operator+=(Zoo &Z, Animal *a) {
            if (a == NULL) return;
            Z.addAnimal(a);
        }
};

class MyMenu {
    private:
        Zoo z;    
        void demonstrate() {
            for (auto &it : z)
                cout << (*it).speech() << endl;
        }

        void addAnimal() {
            cout << "viberi kogo dobavit" << endl
                 <<  "1 - Dog" << endl
                 <<  "2 - Parrot" << endl;
            int i = cin.get();
            switch( i ) {
                case 49: {
                    string name;
                    cout << "imya ?" << endl;
                    cin >> name;
                    z += new Dog(name);
                    break;
                }
                case 50: {
                    string name;
                    cout << "imya ?" << endl;
                    cin >> name;
                    z += new Parrot(name);
                    break;
                }
                default: {
                    cout << "?" << endl;
                    addAnimal();
                    break;
                }
            }
        }
    public:
        void showMenu() {
            cout << "viberi che sdelat" << endl
                 <<  "1 - pokazat talanti" << endl
                 <<  "2 - dobavit animal" << endl
                 <<  "3 - quit" << endl;
            int i = cin.get();
            switch( i ) {
                case 49:
                    demonstrate();
                    break;
                case 50:
                    addAnimal();
                    break;
                case 51:
                    return;
                    break;
                default:
                    cout << "?" << endl;
                    break;
            }
            showMenu();
        }
};


int main() {
    MyMenu m;
    m.showMenu();
    return 0;
}
