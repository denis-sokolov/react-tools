rm -rf dist &&
NODE_ENV=production tsc --project tsconfig.build.json &&
NODE_ENV=production tsc --project bin/tsconfig.json &&
cp bin/package.json dist/bin/
