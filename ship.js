class Ship {
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
    }

    hit() {
        if (!this.isSunk()) this.timesHit++;
        if (this.timesHit === this.length) this.sunk = true;
    }

    isSunk() {
        if (this.sunk === true) return true;
        return false;
    }
}

module.exports = Ship;