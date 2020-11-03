#include <iostream>

using namespace std;

struct Node {
    public:
        int key;
        int value;
        Node* left;
        Node* right;
        Node(int key, int value) {
            this->key = key;
            this->value = value;
        }
};

struct Tree {
    private:
        Node* root;
        void insert(Node** root, int key, int value) {
            if (*root == NULL) {
                Node *newNode = new Node(key, value);
                *root = newNode;
                return;
            }

            if ((*root)->key > key) this->insert(&(*root)->left, key, value);
            else this->insert(&(*root)->right, key, value);
        }
        Node* find(Node *root, int key) {
            if (root == NULL) return NULL;

            if (root->key == key) return root;

            if (root->key > key) return this->find(root->left, key);
            else return this->find(root->right, key);

        }
        Node* remove(Node *root, int key) {
            if (root == NULL) return NULL;

            if (root->key > key) root->left = this->remove(root->left, key);
            else if (root->key < key) root->right = this->remove(root->right, key);
            else if (root->left && root->right) {
                Node *newNode = this->min(root->right);
                root->key = newNode->key;
                root->value = newNode->value;
                root->right = this->remove(root->right, root->key);
            }
            else {
                if (root->left) root = root->left;
                else root = root->right;
            }
            return root;
        }

        Node* min(Node* root) {
            if (root->left == NULL) return root;
            return this->min(root->left);
        }
        void print(Node *root) {
            if (root == NULL) return;
            print(root->left);
            cout << root->key << " " << root->value << endl;
            print(root->right);
        }
    public:
        Tree() {this->root = NULL;}
        void insert(int key, int value) {
            this->insert(&this->root, key, value);
        }
        int find(int key) {
            Node *newNode = this->find(this->root, key);
            if (newNode == NULL) return 0;
            else return newNode->value;
        }
        void remove(int key) {
            this->remove(this->root, key);
        }
        void print() {
            this->print(this->root);
        } 
};

int main() {

}