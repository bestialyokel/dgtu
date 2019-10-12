class Node:
    def __init__(self, val):
        self.l_child = None
        self.r_child = None
        self.data = val

def binary_insert(root, node):
    if root is None:
        root = node
    else:
        if root.data > node.data:
            if root.l_child is None:
                root.l_child = node
            else:
                binary_insert(root.l_child, node)
        else:
            if root.r_child is None:
                root.r_child = node
            else:
                binary_insert(root.r_child, node)

def search_item(root, item, par = 0, comp = 0):
    global el
    if root.data != item:
        if root.l_child and root.r_child:
            if root.data > item:
                comp += 3
                el = root
                return search_item(root.l_child, item, par, comp)
            else:
                comp += 3
                el = root
                return search_item(root.r_child, item, par, comp)
        elif root.l_child:
            comp += 2
            el = root
            return search_item(root.l_child, item, par, comp)
        elif root.r_child:
            comp += 2
            el = root
            return search_item(root.r_child, item, par, comp)
    else:
        if par != 0:
            return [root, el]
        else:
            return [root, comp]

def delete_item(root, item):
    root, pred = search_item(root, item, par=1)
    if root:
        if (root.l_child == root.r_child) and (not root.l_child):
            if pred.l_child:
                if pred.l_child.data == root.data:
                    pred.l_child = None
                else:
                    pred.r_child = None
            else:
                pred.r_child = None
        elif not ((root.l_child == None) == (root.r_child == None)):
            if pred.l_child:
                if pred.l_child.data == root.data:
                    if root.l_child:
                        pred.l_child = root.l_child
                    else:
                        pred.l_child = root.r_child
                else:
                    if root.l_child:
                        pred.r_child = root.l_child
                    else:
                        pred.r_child = root.r_child
            else:
                if root.l_child:
                    pred.r_child = root.l_child
                else:
                    pred.r_child = root.r_child
        else:
            if pred.l_child:
                if pred.l_child.data == root.data:
                    save = root.l_child
                    pred.l_child = root.r_child
                    binary_insert(pred, save)
                else:
                    save = root.l_child
                    pred.r_child = root.r_child
                    binary_insert(pred, save)
    else:
        print('Noooo')

def in_order_print(root):
    if not root:
        return
    in_order_print(root.l_child)
    print(root.data)
    in_order_print(root.r_child)
###
def create_beautiful_conclusion(root, num, trees):
    if not root:
        return
    num += 1
    if not trees.get(num):
        trees[num] = [root.data]
    else:
        trees[num].append(root.data)
    create_beautiful_conclusion(root.l_child, num, trees)
    create_beautiful_conclusion(root.r_child, num, trees)

def beautiful_conclusion(root):
    a = {}
    create_beautiful_conclusion(root, 0, a)
    for i in a:
        for j in a[i]:
            print(j, end=' ')
        print()
###
def read_from_file(root):
    f = open('a.txt')
    for i in f.read().split():
        binary_insert(root, Node(int(i)))
    f.close()

r = Node(3)
'''binary_insert(r, Node(7))
binary_insert(r, Node(1))
binary_insert(r, Node(5))
binary_insert(r, Node(2))
binary_insert(r, Node(6))
binary_insert(r, Node(4))
binary_insert(r, Node(8))
binary_insert(r, Node(12))
binary_insert(r, Node(14))'''
read_from_file(r)
print("in order:")
in_order_print(r)
print()

'''delete_item(r, 5)
in_order_print(r)

delete_item(r, 8)
in_order_print(r)

delete_item(r, 7)
in_order_print(r)'''

beautiful_conclusion(r)


