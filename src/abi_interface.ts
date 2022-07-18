export default interface ABI {
	V3 : {
		spec : {
			messages : {
				label : string;
				payable : boolean;
				mutates : boolean;
				args : {
					label : string;
					type : {
						type : number;
						displayName : string[];
					};
				}[];
				returnType : null | {
					displayName : string[];
					type : number;
				};
			}[];
		};

		types: {
			id : number;
			type : {
				def : {
					primitive ? : string;
					composite ? : {
						fields : {
							typeName : string;
						}[];
					};
					array ? : {
						len : number;
						type : number;
					};
					tuple ? : number[];
					sequence ? : {
						type : number;
					};
					variant ? : {
						variants : {
						}[];
					};
				};
				path ? : string[];
				params ? : {
					name : string;
					type : number;
				}[];
			};
		}[];
	};
}