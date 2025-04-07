

class PDFClient {
    instance: PDFClient | null = null

    constructor() {
        if(this.instance) return this.instance;
        this.instance = this;
    }

    generatePDF() {

        


        // return the finished pdf here
        return;
    }
}

export default PDFClient