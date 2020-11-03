class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = null;
    this.right = null
  }
}

class BinTree {
  constructor(value) {
    this.root = new Node(value);
  }
  insert(node, root = this.root) {
    if (root == null) {root = node; return;}
    if (root.value > node.value) {
      if (root.left == null ) root.left = node
      else this.insert(node, root.left)
    }
    else {
      if (root.right == null) root.right = node
      else this.insert(node, root.right)
    }
  }
  search(value, node = null, root = this.root) {
    if (root.value != value) {
      node = root
      if (root.left && root.right) {
        if (root.value > value) return this.search(value, node, root.left)
        else return this.search(value, node, root.right)
      }
    if (root.left) return this.search(value, node, root.left)
    if (root.right) return this.search(value, node, root.right)
    return [];
    }
    else return [root, node]
  }
  delete(value) {
    let [root, pred] = this.search(value)
    if (!(root && pred)) return;

    if (!(root.left || root.right)) {
      if (pred.left) {
        if (pred.left.value == root.value) pred.left = null
        else pred.right = null
      }
      else pred.right = null
    }
    else if (!(root.left ^ root.right)) {
      if (pred.left) {
        if (pred.left.value == root.value) {
          if (root.left) pred.left = root.left
          else pred.left = root.right
        }
        else {
          if (root.left) pred.right = root.left
          else pred.right = root.right
        }
      }
      else {
        if (root.left) pred.right = root.left
        else pred.right = root.right
      }
    }
    else {
      if (pred.left) {
        if (pred.left.value == root.value) pred.left = root.right
        else pred.right = root.right
        this.insert(root.left, pred)
      }
    }
  }
  print(root = this.root) {
    if (!root) return
    this.print(root.left)
    console.log(root.value)
    this.print(root.right)
  }
  spec_print() {
    function toArray(tree, level = 0, root = this.root) {
      if (!root) return
      if (!tree[level]) tree[level] = [root.value]
      else tree[level].push(root.value)
      level++
      toArray(tree, level, root.left)
      toArray(tree, level, root.right)
    }
    let tree = []
    toArray.call(this, tree)
    tree.forEach(level => {
      let levelString = ""
      level.forEach(element => {
        levelString += element + ' '
      })
      console.log(levelString);
    })
  }
}



let b = new BinTree(0);
let a = new Node(1);

b.insert(new Node(100))
b.insert(new Node(50))
b.insert(new Node(-1))

a = [];
