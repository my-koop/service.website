@echo off
echo Compiling Typescript
tsc --module commonJS -t ES5 app.ts
echo Typescript compilation done
