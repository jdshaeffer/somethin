let user = new User(10, [], start)

// global commands
let globals = ["l", "look", "x", "examine", "look around",
    "i", "inventory",
    "take ", "take", "t", "t ",
    "drop ", "drop", "d", "d ",
    "fight ", "fight",
    "help"]

// game
let input = document.getElementById("input")
let response = document.getElementById("response")

input.addEventListener("keyup", (event) => {
    let x = input.value.toLowerCase()
    if(event.key === "Enter") {

        if(user.room === start) {
            start.visited = true
            // navigation
            if(x == "n") {
                enter(library, input, user, response)
            }
            // defaults
            else if(globals.includes(x) || globals.includes(x.slice(0,5)) || globals.includes(x.slice(0,2)) || globals.includes(x.slice(0,6))) {
                printGlobals(x, user.room, response, input, user)
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
        
        else if(user.room === library) {
            // navigation
            if(x === "s") {
                enter(start, input, user, response)
            }
            // defaults
            else if(globals.includes(x) || globals.includes(x.slice(0,5)) || globals.includes(x.slice(0,2))) {
                printGlobals(x, user.room, response, input, user)
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
