let user = new User([], desks)

// global commands
let globals = ["l", "look", "x", "examine", "look around",
    "i", "inventory",
    "take ", "take", "t", "t ",
    "drop ", "drop", "d", "d ",
    "help"]

// game
let input = document.getElementById("input")
input.addEventListener("keyup", (event) => {
    let response = document.getElementById("response")
    let x = input.value.toLowerCase()

    if(event.key === "Enter") {

        if(user.room === start) {
            desks.visited = true
            if(x == "n") {
                enter(library, input, user, response)
            }
            else if(globals.includes(x) || globals.includes(x.slice(0,5)) || globals.includes(x.slice(0,2))) {
                printGlobals(x, desks, response, input, user)
                input.value = ""
            }
            else if(user.room.walls.includes(x)) {
                response.innerHTML = "can't go that way"
                input.value = ""
            }
            else {
                response.innerHTML = "what?"
                input.value = ""
            }
        }
        
        else if(user.room === shelves) {
            if(x === "s") {
                enter(start, input, user, response)
            }
            else if(globals.includes(x) || globals.includes(x.slice(0,5)) || globals.includes(x.slice(0,2))) {
                printGlobals(x, shelves, response, input, user)
                input.value = ""
            }
            else if(user.room.walls.includes(x)) {
                response.innerHTML = "can't go that way"
                input.value = ""
            }
            else {
                response.innerHTML = "what?"
                input.value = ""
            }
        }
    }
})
