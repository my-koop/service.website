@echo off
echo Compiling Typescript
node_modules\.bin\tsc --module commonJS --target ES5 app.ts
echo Typescript compilation done
