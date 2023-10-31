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
        return null ? current :
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

    inOrder(current = this.root, elements = []) {
        if (current === null) return null;

        this.inOrder(current.left, elements);
        elements.push(current.data);
        this.inOrder(current.right, elements);
        return elements;
    }

    preOrder(current = this.root, elements = []) {
        if (current === null) return null;

        elements.push(current.data);
        this.preOrder(current.left, elements);
        this.preOrder(current.right, elements);
        return elements;
    }

    postOrder(current = this.root, elements = []) {
        if (current === null) return null;

        this.postOrder(current.left, elements);
        this.postOrder(current.right, elements);
        elements.push(current.data);
        return elements;
    }

    levelOrder(queue = [this.root], elements = [], callback) {
        if (queue.length === 0) {
            if (callback) callback(elements);
            return elements;
        }

        let temp = queue[0]
        queue.splice(0, 1)
        elements.push(temp.data)
        if (temp.left) queue.push(temp.left)
        if (temp.right) queue.push(temp.right)
        return this.levelOrder(queue, elements)
    }

    height(current = this.root) {
        if (current === null) return 0;
        return Math.max(this.height(current.left), this.height(current.right) + 1);
    }

    depth(current = this.root, queue = [current], depthCount = 0) {
        if (queue === null || current === null) return 0;

        if (queue.length > 0){
            let temp = queue[0];
            queue.splice(0, 1);
            if (temp.left) queue.push(temp.left);
            if (temp.right) queue.push(temp.right);
            return this.depth(current, queue, depthCount + 1);
        }
        return depthCount;
    }

    isBalanced(current = this.root) {
        if (current === null) return true;
        let leftHeight = this.height(current.left);
        let rightHeight = this.height(current.right);
        return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(current.left) && this.isBalanced(current.right);
    }

    rebalance() {
        let array = this.inOrder();
        this.root = this.buildTree(array);
        return this.root;
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
let array = [];
for (let i = 0; i < 100; i++) {
    array.push(Math.floor(Math.random() * 1000));
}
tree.root = tree.buildTree(array);

tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder());

for(let i = 0; i < 100; i++){
    tree.insert(Math.floor(Math.random() * 1000));
}
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder());
