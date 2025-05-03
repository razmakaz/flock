import fs from 'fs';
import path from 'path';

export interface BarrelValidatorOptions {
	barrelPath: string; // Absolute path to the index.ts file
	fileExtension?: string; // Default: ".ts"
	verbose?: boolean; // Whether to log successful results
}

/**
 * Class to validate the exports in a barrel file (index.ts).
 * This class checks if all expected exports from the directory are present in the barrel file
 * and if there are any unexpected exports.
 * @usage ```
 *  import { BarrelValidator, BarrelValidatorOptions } from './BarrelValidator.server';
 *  const options: BarrelValidatorOptions = {
 *      barrelPath: '/path/to/your/index.ts', // Path to the barrel file
 *      fileExtension: '.ts', // Optional: specify the file extension (default is .ts)
 *      verbose: true // Optional: log successful validation
 *  };
 *  const validator = new BarrelValidator(options);
 *  try {
 *      validator.validate();
 *  } catch (error) {
 *      console.error(error.message);
 *      process.exit(1);
 *  }
 * ```
 */
export class BarrelValidator {
	private readonly modelDir: string;
	private readonly indexFile: string;
	private readonly extension: string;
	private readonly verbose: boolean;

	constructor(private options: BarrelValidatorOptions) {
		this.indexFile = path.resolve(options.barrelPath);
		this.modelDir = path.dirname(this.indexFile);
		this.extension = options.fileExtension ?? '.ts';
		this.verbose = options.verbose ?? false;
	}

	private getExpectedExports(): Set<string> {
		const files = fs
			.readdirSync(this.modelDir)
			.filter((file) => file.endsWith(this.extension) && file !== path.basename(this.indexFile))
			.map((file) => file.replace(new RegExp(`\\${this.extension}$`), ''));

		return new Set(files);
	}

	private getActualExports(): Set<string> {
		const actual = new Set<string>();

		if (!fs.existsSync(this.indexFile)) {
			throw new Error(`❌ Barrel file not found: ${this.indexFile}`);
		}

		const content = fs.readFileSync(this.indexFile, 'utf-8');
		const matches = content.match(/export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/g) || [];

		matches.forEach((match) => {
			const submatch = match.match(/['"]\.\/([^'"]+)['"]/);
			if (submatch && submatch[1] !== 'index') {
				actual.add(submatch[1].replace(new RegExp(`\\${this.extension}$`), ''));
			}
		});

		return actual;
	}

	public validate(): void {
		const expected = this.getExpectedExports();
		const actual = this.getActualExports();

		const missing = Array.from(expected).filter((e) => !actual.has(e));
		const unexpected = Array.from(actual).filter((a) => !expected.has(a));

		if (missing.length > 0) {
			console.error(`❌ Missing exports in ${this.indexFile}:`, missing);
			process.exit(1);
		}

		if (unexpected.length > 0) {
			console.error(`❌ Unexpected exports in ${this.indexFile}:`, unexpected);
			process.exit(1);
		}

		if (this.verbose) {
			console.log(`✅ Barrel is valid: ${this.indexFile}`);
		}
	}
}
