# WorkspaceNode

**To use ES Modules:**
1. in package.json:
```
"type": "module"
```
**To setup NodeJS to use typescript:**
1. run command: `npm init -y`
2. run command: `npm install typescript --save-dev`
3. in package.json: add `"build": "tsc"`
```
"scripts": {
    "build": "tsc"
  },
```
4. Create: *tsconfig.json* . Example:
```
{
    "compilerOptions": {
        "typeRoots": ["node_modules/@types", "./types"],
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "target": "ES2020",
        "sourceMap": true,
        "outDir": "dist"
    },
    "include": [
        "src/**/*",
        "playground/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```
**To get npm run build to work automatically:**
1. run command: `npm install --save-dev tsc-watch`
2. in package.json:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --exec ts-node dist/src/index.js",
    "watch:build": "tsc-watch --onSuccess \"npm run start\"",
    "build": "tsc"
  },
```

**To start server:**
1. run command `npm start`

**To watch build:**
1. run command `npm run watch:build`
