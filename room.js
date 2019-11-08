class Room {
    constructor(name, info, inv, walls, visited) {
        this.name = name
        this.info = info
        this.inv = inv
        this.walls = walls
        this.visited = visited
    }
}

let start = new Room("start", "you're at the very beginning of the game, enjoy", [apple], ["w","s","e"], false)
let library = new Room("library", "you're in a library. some bookshelves around you.", [], ["w","n","e"], false)
