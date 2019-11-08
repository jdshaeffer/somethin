class Item {
    constructor(name, info, indef) {
        this.name = name
        this.info = info
        this.indef = indef // indefinite article of item
    }
}

const apple = new Item("apple", "it's an apple", "an")
