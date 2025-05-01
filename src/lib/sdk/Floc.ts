

class Floc {
    instance: Floc | null = null;

    constructor() {
        if(this.instance) return this.instance;
        this.instance = null;
    }
}

export default Floc;