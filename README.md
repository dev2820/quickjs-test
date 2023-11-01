# monaco + quickjs js runtime in browser

모나코 에디터 + quickjs 자바스크립트 런타임
main function의 결과값을 표시합니다.

js런타임: https://github.com/justjake/quickjs-emscripten

## demo

https://dev2820.github.io/quickjs-test/

### fibonacci example

https://dev2820.github.io/quickjs-test/?code=ZnVuY3Rpb24gbWFpbigpIHsgCiAgICByZXR1cm4gZmlibygzKQp9Cgpjb25zdCBjYWNoZSA9IHsKICAgIDA6IDAsCiAgICAxOiAxCn0KCmZ1bmN0aW9uIGZpYm8obikgewogICAgaWYoY2FjaGVbbl0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGNhY2hlW25dCiAgICBjYWNoZVtuXSA9IGZpYm8obi0xKSArIGZpYm8obi0yKQoKICAgIHJldHVybiBjYWNoZVtuXQp9

## TODO

- rollupOption중 output.inlineDynamicImports에 대해 조사할 것
- worker의 포멧이 iife와 es 두 종류인 것에 대해 조사할 것
- console.log 구현 및 삽입
