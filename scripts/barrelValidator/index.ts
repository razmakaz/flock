import { BarrelValidator, BarrelValidatorOptions } from './BarrelValidator.server';

const validateBarrels = () => {
	const barrelsToCheck = ['src/lib/@types/models/index.ts'];

	for (const barrel of barrelsToCheck) {
		const options: BarrelValidatorOptions = {
			barrelPath: barrel, // Path to the barrel file
			fileExtension: '.ts', // Optional: specify the file extension (default is .ts)
			verbose: true // Optional: log successful validation
		};

		const validator = new BarrelValidator(options);
		try {
			validator.validate();
		} catch (error) {
			console.error(error.message);
			process.exit(1);
		}
	}
};

export default validateBarrels;
