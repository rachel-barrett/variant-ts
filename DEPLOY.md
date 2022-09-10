
## publishing library locally

Use `npm link`. This only needs to be run once in the root of this directory.

Then run `npm link variant-ts` in the target directory on the same machine.

## publishing library to npm

Check you are signed in as the right user with `npm whoami`, and ensure the name and version in package.json is correct. Then run:

```
 npm publish --access public
```