rm -rf dist
parcel build src/index.html --no-minify

进入 dist/，打开 index.html 看一下

<script src="/main.a561dad7.js"></script>

改成

parcel build src/index.html --no-minify --public-url ./

help: parcel build --help




