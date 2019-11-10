class Enemy {
    constructor(hp, room, attacks) { 
        this.hp = hp // int
        this.room = room // room where they spawn
        this.attacks = attacks // list of attack objects
    }
}

let badGuy = new Enemy(10, start, [highPunch])
