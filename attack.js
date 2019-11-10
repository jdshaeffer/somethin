class Attack {
    constructor(name, power, info, counter) {
        this.name = name // string
        this.power = power // int
        this.info = info // string
        this.counter = counter // counters are the things the user types to evade taking damage - list of strings
    }
}

highPunch = new Attack('high punch', 4, 'tries to sock you in the face - best to `duck` or `block high`', ['duck','block high'])