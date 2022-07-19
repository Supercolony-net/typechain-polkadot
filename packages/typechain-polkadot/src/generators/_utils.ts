import PathAPI from "path";
import FsAPI from "fs";

export function __assureDirExists(absPathToBase : string, relPathToDir : string) {
	const absPath = PathAPI.resolve( absPathToBase, `./${relPathToDir}` );
	if( !FsAPI.existsSync(absPath) ) FsAPI.mkdirSync(absPath);
}

export function __writeFileSync(absPathToBase : string, relFilePath : string, contents : string) {
	FsAPI.writeFileSync(
		PathAPI.resolve( absPathToBase, `./${relFilePath}` ),
		contents
	);
}