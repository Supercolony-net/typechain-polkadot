# Typechain-Compiler

---

Utility package for compiling smart contracts, and generating TypeScript definitions & runtime code for them.

## Usage

In your project install this package:

```bash
npm i -D @727-ventures/typechain-compiler
```

Now you can use it to compile smart contracts, and generate TS definitions & runtime code for them. To use typechain-compiler you need to create a config file, and pass it to the compiler.

### Config file

We need to create a config file, that will contain all the information about the project, and the contracts that we want to compile.
Config file should be in `.json` format, and should contain the following fields:

```typescript
export interface Config {
	projectFiles: string[];
	skipLinting : boolean;
	artifactsPath : string;
	typechainGeneratedPath : string;
	isWorkspace ?: boolean;
	workspacePath ?: string;
}
```

### Compiler

To compile your project, and generate TS definitions & runtime code for it, run the following command:

```bash
npx @727-ventures/typechain-compiler --config path/to/config.json
```

Also you can provide additional arguments to the compiler:

```bash
Options:
      --version            Show version number                         [boolean]
  -c, --config             Config file path
                                  [string] [required] [default: "./config.json"]
  -r, --release            Compile with release
                                           [boolean] [required] [default: false]
      --noCompile, --nc    Compile         [boolean] [required] [default: false]
      --noTypechain, --nt  Compile typechain code
                                           [boolean] [required] [default: false]
  -h, --help               Show help                                   [boolean]
```