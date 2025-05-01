interface APIMethods {
	get(): void;
	post(): void;
}

class API implements APIMethods {
	post({ options }) {
		// Do post stuff
	}
	get() {
		// Do get stuff
		console.log('Getting data');
	}
}

class InvoiceAPI extends API {
	post({ options }) {
		super.post(options);
		// Implement post for InvoiceAPI
		console.log('Posting invoice data');
	}
}

class TimesheetAPI extends API {
	get() {
		// Implement get for TimesheetAPI
		console.log('Getting timesheet data');
	}
}

class Floc {
	timesheets = new TimesheetAPI();
	invoices = new InvoiceAPI();
}

class FlocClient extends API {}

class FlocServer extends API {}

const floc = new Floc();

floc.timesheets.get(); // Output: Getting timesheet data
floc.invoices.get(); // Output: Posting timesheet data
