
This project will parse arkts(typescript) file and generate the AST of the file.

## Build
You need to install `nodejs` first

```
./build.sh
```

## Installl

```
./install.sh
```

Then `tsp` command can be used to parse typescript file.

## Usage

For a typescript file `example.ts`

```typescript
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}
 
@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}
 
const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
```

```
node index.js example2.arkts -o example2.json
```

`example2.json` is like the following:

```json
{
  "kind": "SourceFile",
  "pos": {
    "line": 1,
    "column": 1
  },
  "children": [
    {
      "kind": "SyntaxList",
      "pos": {
        "line": 1,
        "column": 1
      },
      "children": [
        {
          "kind": "FunctionDeclaration",
          "pos": {
            "line": 1,
            "column": 1
          },
          "children": [
            {
              "kind": "FunctionKeyword",
              "pos": {
                "line": 1,
                "column": 1
              },
              "content": "function"
            },
            {
              "kind": "Identifier",
              "pos": {
                "line": 1,
                "column": 10
              },
              "content": "reportableClassDecorator"
              ...
```