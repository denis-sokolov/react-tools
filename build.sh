rm -rf dist &&
NODE_ENV=production tsc --project tsconfig.build.json &&
NODE_ENV=production tsc --project bin/tsconfig.json &&
cp bin/package.json dist/bin/ &&
node -e 'console.log(JSON.stringify({ version: require("./package.json").version }))' > dist/package.json
