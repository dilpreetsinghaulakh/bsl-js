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

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return null;

        const childPrefix = `${prefix}${isLeft ? '│   ' : '    '}`;
        const currentPrefix = `${prefix}${isLeft ? '└── ' : '┌── '}`;

        if (node.right) this.prettyPrint(node.right, childPrefix, false);
        console.log(`${currentPrefix}${node.data}`);
        if (node.left) this.prettyPrint(node.left, childPrefix, true);
    }
}

let tree = new Tree();
let array = [11, 52, 39, 44, 85, 87, 38, 29, 10];
tree.root = tree.buildTree(array);

tree.prettyPrint();
// console.log(tree.find(11));

