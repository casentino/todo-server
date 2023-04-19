import { JestConfigWithTsJest } from 'ts-jest';

const jestconfig: JestConfigWithTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transformIgnorePatterns: ['node_modules/(?!lowdb)/'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
		'^.+\\.js?$': 'babel-jest',
	},
};
export default jestconfig;
