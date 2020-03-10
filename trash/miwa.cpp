#include <string>
#include <iostream>
#include <vector>

using namespace std;

class Animal {
    
    /* вариант ниже для выблядков
    private:
        string name;*/
    // вот это заебись 
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
    public:
        Parrot(const string name) : Animal(name) {}
        Parrot() : Animal() {}
        virtual string speech() {
            return "ya popugai : " + Animal::getName();
        }
};

class Dog : public Animal {
    public:
        Dog(const string name) : Animal(name) {}
        Dog() : Animal() {}
        virtual string speech() {
            return "ya pes : " + Animal::getName();
        }
};


class Zoo {
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
    Zoo z;    
    void demonstrate() {
        for (auto &it : z)
            cout << (*it).speech() << endl;
    }

    void addAnimal() {
        int i;
        while ( i != 3) {
            cout << "viberi kogo dobavit" << endl
                <<  "1 - Dog" << endl
                <<  "2 - Parrot" << endl;
            cin >> i;
            if (i == 1) {
                string name;
                cout << "imya ?" << endl;
                cin.ignore();
                getline(cin, name);
                Dog *dog = name.length() == 0 ? new Dog() : new Dog(name);
                z += dog;
                return;
            } else if (i == 2) {
                string name;
                cout << "imya ?" << endl;
                cin.ignore();
                getline(cin, name);
                Parrot *parrot = name.length() == 0 ? new Parrot() : new Parrot(name);
                z += parrot;
                return;
            }
        }
    }
    public:
        void showMenu() {
            int i;
            while ( i != 3) {
                cout << "viberi che sdelat" << endl
                    <<  "1 - pokazat talanti" << endl
                    <<  "2 - dobavit animal" << endl
                    <<  "3 - quit" << endl;
                cin >> i;
                if (i == 1) demonstrate();
                else if (i == 2) addAnimal();
            }
        }

};


int main() {
    MyMenu m;
    m.showMenu();
    //Dog *m = new Dog();
    return 0;
}
