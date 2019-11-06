
class Prefix_Tree {
  constructor() {
    this.root = {}
  }
  add(string) {
    let node = this.root;
    for (let char of string) {
      if (node[char] == void 0) {
        node[char] = {}
      }
      node = node[char]
    }
  }
  find(string) {
    let node = this.root;
    for (let char of string) {
      if (node[char] == void 0) return null;
      node = node[char]
    }
    return node;
  }
  delete(str) {
    let node = this.root;
    let hNode = node;
    let length = str.length;
    let i = 0;
    for (let key in str) {
      if (Object.keys(node).length != 1) {
        hNode = node;
        i = key;
      }
      node = node[str[key]]
      if (node == void(0)) return;
    }
    delete hNode[str[i]];
  }
}