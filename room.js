class Room {
    constructor(name, info, inv, npcs, walls, visited) {
        this.name = name
        this.info = info
        this.inv = inv
        this.npcs = npcs
        this.walls = walls
        this.visited = visited
    }
}

// enemies get spawned in their room initialization
let start = new Room("start", "you're at the very beginning of the game.", [], [], ["w","s","e"], false)
let library = new Room("library", "you're in a library. some bookshelves around you.", [apple], [badGuy], ["w","n","e"], false)
