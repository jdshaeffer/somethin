const printGlobals = (x, room, response, input, user) => {
    if(x === "l" || x === "look" || x === "x" || x === "examine" || x === "look around") {
        look(room, response, input)
    }
    else if(x === "i" || x === "inventory") {
        printUserInv(user)
    }
    else if(x.slice(0,5) === "take ") {
        let thing = x.slice(5)
        take(thing, room.inv, user.inv, response, input)
    }
    else if(x.slice(0,2) === "t ") {
        let thing = x.slice(2)
        take(thing, room.inv, user.inv, response, input)
    }
    else if(x === "take" || x === "t") {
        if(room.inv.length === 0) {
            response.innerHTML = "there's nothing here to take."
        }
        else {
            response.innerHTML = "specify what you want to take."
        }
        input.value = ""
    }
    else if(x.slice(0,5) === "drop ") {
        let thing = x.slice(5)
        drop(thing, room.inv, user.inv, response, input)
    }
    else if(x.slice(0,2) === "d ") {
        let thing = x.slice(2)
        drop(thing, room.inv, user.inv, response, input)
    }
    else if(x === "drop" || x === "d") {
        if(user.inv.length === 0) {
            response.innerHTML = "you don't have anything to drop."
        }
        else {
            response.innerHTML = "specify what you want to drop."
        }
        input.value = ""
    }
    else if(x === "fight") {
        if(room.npcs.length === 0) {
            response.innerHTML = "there's no one here to fight."
        }
        else {
            response.innerHTML = "specify who you want to fight."
        }
    }
    else if(x.slice(0,6) === "fight ") {
        let enemy = x.slice(6)
        fight(user, input, response, enemy, room)
    }
    else if(x === "help") {
        response.innerHTML = "n, s, e, w - move around<br>" +
            "take - take an item<br>" +
            "drop - drop an item<br>" +
            "i - check your inventory<br>" +
            "x - examine an item/room<br>" +
            "l - look at an item/room<br>"
        input.value = ""
    }
}

const look = (room, response, input) => {
    response.innerHTML = room.name
    response.appendChild(document.createElement("br"))
    response.appendChild(document.createElement("br"))
    response.append(room.info)
    if(room.npcs.length > 0) {
        response.appendChild(document.createElement("br"))
        response.appendChild(document.createElement("br"))
        for(let enemy of room.npcs) {
            response.appendChild(document.createTextNode("there is " + enemy.indef + " " + enemy.name + " here."))
            response.appendChild(document.createElement("br"))
        }
    }
    else {
        response.appendChild(document.createElement("br")) // spacing
    }
    if(room.inv.length > 0) {
        response.appendChild(document.createElement("br"))
        for(let item of room.inv) {
            response.appendChild(document.createTextNode("there is " + item.indef + " " + item.name + " here."))
            response.appendChild(document.createElement("br"))
        }
    }
    input.value = ""
}

const printUserInv = (user) => {
    if(user.inv.length === 0) {
        response.innerHTML = "you don't have anything." 
    }
    else {
        response.innerHTML = "you have:<br>"
        for(let item of user.inv) {
            response.appendChild(document.createTextNode(item.indef + " " + item.name))
            response.appendChild(document.createElement("br"))
        }
    }
    input.value = ""
}

const take = (thing, roomInv, userInv, response, input) => {
    if(roomInv.length === 0) {
        response.innerHTML = "there's nothing here to take."
    }
    else {
        if(thing === "all") { // if user decides to take everything in the room
            let allResponse = ""
            for(let item of roomInv) {
                userInv.push(item)
                allResponse += "you take the " + item.name + ".<br>"
                response.innerHTML = allResponse
            }
            roomInv.length = 0 // empty array
        }
        else {
            for(let item of roomInv) { // not very dry right now
                if(item.name === thing) {
                    userInv.push(item)
                    roomInv.splice(roomInv.indexOf(item), 1)
                    response.innerHTML = "you take the " + item.name + "."
                }
                else {
                    response.innerHTML = "that's not here."
                }
            }
        }
    }
    input.value = ""
}

const drop = (thing, roomInv, userInv, response, input) => {
    if(userInv.length === 0) {
        response.innerHTML = "you don't have anything to drop."
    }
    if(thing === "all") {
        let allResponse = ""
        for(let item of userInv) {
            roomInv.push(item)
            allResponse += "you drop the " + item.name + ".<br>"
            response.innerHTML = allResponse
        }
        userInv.length = 0 // empty array
    }
    else {
        for(let item of userInv) {
            if(item.name === thing) {
                roomInv.push(item)
                userInv.splice(userInv.indexOf(item), 1)
                response.innerHTML = "you drop the " + thing + "."
            }
            else {
                response.innerHTML = "you can't drop that"
            }
        }
    }
    input.value = ""
}

// function called when player moves to another room
const enter = (room, input, user, response) => { 
    if(!room.visited) { // if first time visiting, print full description automatically
        look(room, response, input)
        room.visited = true
    }
    else {
        response.innerHTML = room.name
        response.appendChild(document.createElement("br"))
    }
    user.room = room
    input.value = ""
}

const userTurn = (user, input, response, enemy) => {
    response.innerHTML = "+---------------+---------------+<br>"
    response.append("|  (a) attack   |  (e) examine  |")
    response.appendChild(document.createElement("br"))
    response.append("|---------------|---------------|")
    response.appendChild(document.createElement("br"))
    response.append("|  (i) item     |  (r) rest     |")
    response.appendChild(document.createElement("br"))
    response.append("+---------------+---------------+")
    return new Promise((resolve, reject) => {
        input.addEventListener("keyup", (event) => {
            let x = input.value.toLowerCase()
            if(event.key === "Enter") {
                if(x === "a") {
                    console.log('attack')
                    resolve()
                }
                else if(x === "e") {
                    console.log('examine')
                    resolve()
                }
                else if(x === "i") {
                    console.log('item')
                    resolve()
                }
                else if(x === "r") {
                    console.log('rest')
                    resolve()
                }
                else {
                    reject('bogus man')
                }
            }
        })
    })
}

// sleep via accepted answer in https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const test = () => {
    promises = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('promise resolved'))}, 2000)
        })
        console.log(promises)
}

async function fight (user, input, response, enemy, room) { // function needs to be async since we're using await inside
    fighting = false
    if(room.npcs.length === 0) {
        response.innerHTML = "there's no one here to fight."
    }
    else {
        for(let baddie of room.npcs) { 
            if(baddie.name === enemy) {
                response.innerHTML = "you approach the " + enemy + "..."
                await sleep(1000)
                test()
                await userTurn(user, input, response, enemy) // function won't move on until userTurn resolves
                console.log('here')
            }
            else {
                response.innerHTML = "they're not here."
            }
        }
    }

    // response.innerHTML = "gimme your name, quick"
    // input.value = ""
}