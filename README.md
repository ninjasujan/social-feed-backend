# nodejs-folder-structure

**This repository contains the nodejs folder structure for handling large
project.**

**You can clone this repository for your next nodejs project as a boilerplate
code**

**Steps to be followed in making Typescript and Nodejs project setup**

1. Install Typescript as a global dependency in your system.
2. Initialize the project with typescript tsc --init
3. Chnage the 'outDir' and 'rootDir' in tsconfig.json file and also change the
   module resolution: true.
4. Make project setup - npm init
5. Install dependencies(dev) - typescript, ts-node nodemon, @types/express,
   @types/node; express
6. configure your scripts in package.json
   - start: "node dist/app.js"
   * dev: "node src/app.ts"
   * build: "tsc -p ."
7. Next step is to run your script with command

## Added pre commit hooks
