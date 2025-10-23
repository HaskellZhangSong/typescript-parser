import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

class TypeScriptASTParser {
  /**
   * Parse TypeScript code and return the AST
   */
  parse(sourceCode: string, fileName: string = 'input.ts'): ts.SourceFile {
    return ts.createSourceFile(
      fileName,
      sourceCode,
      ts.ScriptTarget.Latest,
      true
    );
  }

  /**
   * Print AST with detailed information
   */
  printDetailedAST(node: ts.Node, depth: number = 0): void {
    const indent = '  '.repeat(depth);
    const nodeKind = ts.SyntaxKind[node.kind];
    
    console.log(`${indent}${nodeKind} {`);
    console.log(`${indent}  kind: ${node.kind}`);
    console.log(`${indent}  start: ${node.getStart()}`);
    console.log(`${indent}  end: ${node.getEnd()}`);
    console.log(`${indent}  width: ${node.getWidth()}`);
    
    const nodeText = node.getText().trim();
    if (nodeText) {
      console.log(`${indent}  text: "${nodeText}"`);
    }
    
    // Print children
    const children = node.getChildren();
    if (children.length > 0) {
      console.log(`${indent}  children: [`);
      children.forEach(child => {
        this.printDetailedAST(child, depth + 2);
      });
      console.log(`${indent}  ]`);
    }
    
    console.log(`${indent}}`);
  }

  /**
   * Convert AST node to JSON format
   */
  astToJSON(node: ts.Node): any {
    // const sourceFile = node.getSourceFile();
    const result: any = {
      kind: ts.SyntaxKind[node.kind],
      kindNumber: node.kind,
      
      // text: node.getText().trim()
    };
    if (node.getChildCount() === 0) {
      result.content = node.getText();
    }


    // Add position information if available
    // if (sourceFile) {
    //   const startPos = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    //   const endPos = sourceFile.getLineAndCharacterOfPosition(node.getEnd());
    //   result.position = {
    //     start: { line: startPos.line + 1, column: startPos.character + 1 },
    //     end: { line: endPos.line + 1, column: endPos.character + 1 }
    //   };
    // }

    // Add children if they exist
    const children = node.getChildren();
    if (children.length > 0) {
      result.children = children.map(child => this.astToJSON(child));
    }

    return result;
  }
}
// Create parser instance
const parser = new TypeScriptASTParser();

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node index.js <input-file> -o <output-file>');
  console.log('Example: node index.js example.js -o ast.json');
  process.exit(1);
}

const inputFile = args[0];
if (!inputFile) {
  console.error('Error: Input file is required.');
  process.exit(1);
}

let outputFile = 'ast.json';

// Parse -o flag for output file
const outputIndex = args.indexOf('-o');
if (outputIndex !== -1 && outputIndex + 1 < args.length) {
  const specifiedOutput = args[outputIndex + 1];
  if (specifiedOutput) {
    outputFile = specifiedOutput;
  }
}

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file "${inputFile}" does not exist.`);
  process.exit(1);
}

try {
  // Read the input file
  const sourceCode = fs.readFileSync(inputFile, 'utf8');
  
  // Parse the AST
  const sourceFile = parser.parse(sourceCode, inputFile);
  const astJson = parser.astToJSON(sourceFile);
  
  // Write AST to output file
  fs.writeFileSync(outputFile, JSON.stringify(astJson, null, 2), 'utf8');
  
  console.log(`✅ AST successfully generated!`);
  console.log(`📁 Input: ${inputFile}`);
  console.log(`📄 Output: ${outputFile}`);
  
} catch (error) {
  console.error(`Error processing file: ${error}`);
  process.exit(1);
}