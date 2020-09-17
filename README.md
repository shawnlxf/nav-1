1. 编译

    ```
    rm -rf dist
    parcel build src/index.html --no-minify
    ```

    进入 dist/，打开 index.html 看一下

    ```
    parcel build src/index.html --no-minify --public-url ./
    ```

    ``` html
    <script src="/main.a561dad7.js"></script>
    ```

    改成

    ``` html
    <script src="/main.a561dad7.js"></script>
    ```

    help: parcel build --help

2. yarn build

```
yarn init -y
yarn build
```


