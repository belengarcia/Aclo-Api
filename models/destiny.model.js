class Destiny {
    constructor(placeId, name, coordinates = [], images = []) {
        this.placeId = placeId;
        this.name = name;
        this.coordinates = coordinates;
        this.images = images; 
    }
}

module.exports = Destiny;