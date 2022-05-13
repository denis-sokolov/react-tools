# Other seeming options:
# https://www.npmjs.com/package/ts-transform-esm-import
# https://www.npmjs.com/package/to-esm
fix-es-imports 2>/dev/null $1 &&

# Until React 18
# https://github.com/facebook/react/issues/20235
# -i is required on some OSs
sed -i '.bak' 's/jsx-runtime/jsx-runtime.js/g' $1 && rm $1.bak
