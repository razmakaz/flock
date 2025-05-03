import validateBarrels from './barrelValidator';

console.log('Starting Preflight Scripts');

console.group('Starting barrel validation...');

validateBarrels();

console.log('Barrel validation completed successfully.');
console.groupEnd();

console.log('Preflight Scripts completed successfully.');
