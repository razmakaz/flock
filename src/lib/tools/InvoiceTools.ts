class InvoiceTools {
	instance: InvoiceTools | null = null;

	constructor() {
		if (this.instance) return this.instance;
		this.instance = this;
	}


    // call taxjar api with object of all invoice line items
}

export default InvoiceTools;
