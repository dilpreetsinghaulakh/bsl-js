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

        if (left > right) {
            return null;
        }

        let mid = Math.floor((left + right) / 2);
        let node = new Node(array[mid]);
        node.left = this.buildTree(array, left, mid - 1);
        node.right = this.buildTree(array, mid + 1, right);

        return node;
    }

    find(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return current;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }
}

let tree = new Tree();
let array = [11, 52, 39, 44, 85, 87, 38, 29, 10];
tree.root = tree.buildTree(array);


