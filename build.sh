#!/bin/bash
if ! tsc -v >/dev/null 2>&1; then
    echo "installing tsc..."
    npm install -g typescript
fi


if ! ncc -v >/dev/null 2>&1; then
    echo "installing ncc..."
    npm i -g @vercel/ncc
fi

npm install .
tsc index.ts --outDir dist --module commonjs --target es2015
npm run bundle