class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.root = null
    }

    buildTree(array, left = 0, right = array.length - 1) {
        array = array.sort((a, b) => a - b)
        if (left > right) return null

        let mid = Math.floor((left + right) / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array, left, mid - 1);
        node.right = this.buildTree(array, mid + 1, right);
        return node;
    }

    find(data, current = this.root) {
        return null ? null :
            current.data === data ? current :
                data < current.data ? this.find(data, current.left) :
                    this.find(data, current.right);
    }

    insert(data, current = this.root) {
        if (data < current.data) {
            if (current.left === null) {
                current.left = new Node(data);
            } else {
                this.insert(data, current.left);
            }
        } else if (data > current.data) {
            if (current.right === null) {
                current.right = new Node(data);
            } else {
                this.insert(data, current.right);
            }
        }
    }

    findMin(current = this.root) {
        if (current.left === null) {
            return current;
        } else {
            return this.findMin(current.left);
        }
    }

    findMax(current = this.root) {
        if (current.right === null) {
            return current;
        } else {
            return this.findMax(current.right);
        }
    }

    delete(data, current = this.root) {
        if (current === null) return null;
        if (data < current.data) {
            current.left = this.delete(data, current.left);
        } else if (data > current.data) {
            current.right = this.delete(data, current.right);
        } else {
            if (current.left === null && current.right === null) {
                return null;
            } else if (current.left === null) {
                return current.right;
            } else if (current.right === null) {
                return current.left;
            } else {
                let temp = this.findMin(current.right);
                current.data = temp.data;
                current.right = this.delete(temp.data, current.right);
            }
        }
        return current;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

let tree = new Tree();
let array = [11, 52, 39, 44, 85, 87, 38, 29, 10];
tree.root = tree.buildTree(array);

tree.prettyPrint();
console.log(tree.find(44));
tree.insert(42);
tree.delete(52);
tree.prettyPrint();

