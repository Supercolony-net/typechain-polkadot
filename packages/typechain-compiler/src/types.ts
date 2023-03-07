export interface Config {
	projectFiles: string[];
	skipLinting : boolean;
	artifactsPath : string;
	typechainGeneratedPath : string;
	isWorkspace ?: boolean;
	workspacePath ?: string;
}

export function parseConfig(configStr: string): Config {
	const config = JSON.parse(configStr);


	if (config.projectFiles === undefined) {
		config.projectFiles = [];
	}

	if (config.skipLinting === undefined) {
		config.skipLinting = false;
	}

	if (config.artifactsPath === undefined) {
		config.artifactsPath = "./artifacts";
	}

	if (config.typechainGeneratedPath === undefined) {
		config.typechainGeneratedPath = "./typechain-generated";
	}

	return config;
}