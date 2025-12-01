
# Standalone JavaScript Package

This document describes how to build a standalone, runnable JavaScript file from the `dist/index.js` output of this project. The standalone file bundles all necessary dependencies and can be executed directly with Node.js.

## Prerequisites

- Node.js (version 12 or higher recommended)
- npm (Node Package Manager)

## Build and Install
Just use the script

```bash
./build.sh
./install.sh
```

## Building the Standalone Package

If you want to create the standalone JavaScript file solely, follow these steps:

1.  **Install `ncc`**: If you haven't already, install `@vercel/ncc` as a development dependency. `ncc` is a simple CLI for compiling a Node.js module into a single file, together with all its dependencies, quicker and cleaner.

    ```bash
    npm install --save-dev @vercel/ncc
    ```

2.  **Add a `bundle` script to `package.json`**: Open your `package.json` file and add the following script under the `scripts` section:

    ```json
    {
      "name": "tsp",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "bundle": "ncc build dist/index.js -o packaged --target es2015"
      },
      "devDependencies": {
        "@vercel/ncc": "^0.38.4"
        // ... other dev dependencies
      }
      // ... other package.json content
    }
    ```

    *Note: Ensure that the `"type": "module"` entry is removed from your `package.json` if it exists, to avoid issues with CommonJS vs. ES Module interpretation during bundling and execution.*

3.  **Run the `bundle` script**: Execute the newly added script using npm:

    ```bash
    npm run bundle
    ```

    This command will create a new directory named `packaged` in your project root. Inside this directory, you will find `index.js` which is the bundled file.

4.  **Rename the bundled file (Optional but Recommended)**: To ensure Node.js always interprets the bundled file as a CommonJS module, it's recommended to rename `packaged/index.js` to `packaged/index.cjs`:

    ```bash
    mv packaged/index.js packaged/index.cjs
    ```

## Running the Standalone Package

Once the standalone file is built, you can run it directly with Node.js. It accepts an input TypeScript file and an output JSON file as arguments, similar to the original `dist/index.js`.

```bash
node packaged/index.cjs <input-typescript-file> -o <output-json-file>
```

**Example:**

```bash
node packaged/index.cjs example.ts -o ast.json
```

This will parse `example.ts` and output its Abstract Syntax Tree (AST) to `ast.json`.
