export interface Method {
	name: string;
	args : {
		name : string;
		type : {
			id : number | string;
		};
	}[];
	payable ? : boolean;
	returnType ? : undefined | null | {
		id : string | number,
		tsStr : string,
	};
	mutating ? : boolean;
	methodType ? : 'query' | 'tx' | 'extrinsic' | 'constructor';
	pathToContractFile ? : string;
}

export interface Type {
	id: number | string;
	tsStr: string;
}

export interface Import {
	values: string[];
	path: string;
}