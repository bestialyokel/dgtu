#include <iostream>
#include <string.h>

using namespace std;

class Student {
    private:
        char *name;
        char *surname;
        char *patronymic;
        uint byear;
        uint group;
    
    public:
        Student(char *name, 
                char *surname, 
                char *patronymic, 
                uint byear = 0, 
                uint group = 0) {
            cout << "->student()" << endl;

            this->name = new char[strlen(name)]; 
            strcpy(this->name, name);
            this->surname = new char[strlen(surname)]; 
            strcpy(this->surname, surname);
            this->patronymic = new char[strlen(patronymic)];
            strcpy(this->patronymic, patronymic);
            this->group = group;
            this->byear = byear;

            cout << "student()->" << endl;
        }
        Student(const Student &s) {
            cout << "->cpy()" << endl;

            this->name = new char[strlen(s.name)];
            strcpy(this->name, s.name);
            this->surname = new char[strlen(s.surname)];
            strcpy(this->surname, s.surname);
            this->patronymic = new char[strlen(s.patronymic)];
            strcpy(this->patronymic, s.patronymic);
            this->group = s.group;
            this->byear = s.byear;

            cout << "cpy()->" << endl;
        }
        ~Student() {
            delete[] this->name;
            delete[] this->surname;
            delete[] this->patronymic;
        }
        char *getName() {
            char *name = new char[strlen(this->name)];
            strcpy(name, this->name);
            return name;
        }
        char *getSurname() {
            char *surname = new char[strlen(this->surname)];
            strcpy(name, this->surname);
            return this->surname;
        }
        char *getPatronymic() {
            char *patronymic = new char[strlen(this->patronymic)];
            strcpy(patronymic, this->patronymic);
            return this->patronymic;
        }
        uint getBYear() {
            return this->byear;
        }
        uint getGroup() {
            return this->group;
        }
        void setName(char *name) {
            delete[] this->name;
            this->name = new char[strlen(name)];
            strcpy(this->name, name);
        }
        void setSurname(char *surname) {
            delete[] this->surname;
            this->surname = new char[strlen(surname)];
            strcpy(this->surname, surname);
        }
        void setPatronymic(char *patronymic) {
            delete[] this->patronymic;
            this->patronymic = new char[strlen(patronymic)];
            strcpy(this->patronymic, patronymic);
        }
        void setBYear(uint byear) {
            this->byear = byear;
        }
        void setGroup(uint group) {
            this->group = group;
        }
};


Student *test(Student &s) {// Student &&& Student s
    return &s;
}

void cc(char *m) {
        cout << strlen(m);
}

int main() {
    cout << "->main()" << endl;




    Student s("sa", "sa", "sa", 1, 1);
    test(s);



    cout << "main()->" << endl;
    return 0; 
}