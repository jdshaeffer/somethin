class Enemy {
    constructor(hp, name, info, indef, attacks) { 
        this.hp = hp // int
        this.name = name // string
        this.info = info // string
        this.indef = indef // string
        this.attacks = attacks // list of attack objects
    }
}

let badGuy = new Enemy(10, 'bad guy', 'a mean lookin dude.', 'a', [highPunch])
