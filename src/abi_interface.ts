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
					primitive ? : string; // 'str' | 'bool' | 'u8' | 'u128'
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
							/*
							{
								"fields": [
									{
										"type": 29
									}
								],
								"index": 0,
								"name": "Ok"
							},
							{
								"fields": [
									{
										"type": 13
									}
								],
								"index": 1,
								"name": "Err"
							}
							*/
						}[];
					};
				};
				path ? : string[];
				params ? : {
					name : string; // 'T' | 'E'
					type : number;
				}[];
			};
		}[];
	};
}