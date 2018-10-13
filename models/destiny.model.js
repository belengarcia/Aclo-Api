class Destiny {
    constructor(placeId, name, coordinates = [], image = '') {
        this.placeId = placeId;
        this.name = name;
        this.coordinates = coordinates;
        this.image = image;
    }
}

module.exports = Destiny;