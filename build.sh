rm -rf dist &&
NODE_ENV=production tsc --project tsconfig.build.json &&
NODE_ENV=production tsc --project tsconfig.build.cjs.json &&
NODE_ENV=production tsc --project bin/tsconfig.json &&
find ./dist -name '*.js' -exec bash build-helper.sh {} \; &&
cp bin/package.json dist/bin/ &&
node -e 'console.log(JSON.stringify({ version: require("./package.json").version }))' > dist/package.json &&
chmod +x dist/bin/license/index.js &&
echo '{ "type": "commonjs" }' > dist/cjs/package.json &&
echo '{ "type": "module" }' > dist/esm/package.json
