// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.website-list');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var $iconMode = $('.icon-mode');
var originHashMap = [{
  url: 'https://www.iconfont.cn/',
  text: 'iconfont'
}, {
  url: 'https://www.iconfinder.com/',
  text: 'iconfinder'
}, {
  url: 'https://material.io/design/color/the-color-system.html#tools-for-picking-colors',
  text: 'material colors'
}, {
  url: 'https://chat.mozilla.org/#/room/#mdn:mozilla.org',
  text: 'matrix(mozilla)'
}];
var hashMap = xObject || originHashMap;
var $reset = $('.reset');
$iconMode.on('click', function () {
  if ($iconMode.text() === '文字') {
    $iconMode.text("favicon");
  } else {
    $iconMode.text("文字");
  }

  applyHashMap();
}); // 防止在重置之前保存 hashMap

var store = true;

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '');
};

function setIcon($li, node) {
  if ($iconMode.text() === '文字') {
    var img = $li[0].querySelector('img');
    img.setAttribute('src', '');
    var icon = $li[0].querySelector('.icon-text');
    var text = $li[0].querySelector('.site-text');

    if (!text.innerText) {
      icon.innerText = "?";
      text.innerText = "undefined";
    } else {
      icon.innerText = text.innerText[0];
    }
  } else {
    var _icon = $li[0].querySelector('.icon-text');

    _icon.innerText = '';

    var _text = $li[0].querySelector('.site-text');

    if (!_text.innerText) {
      _text.innerText = "undefined";
    }

    var _img = $li[0].querySelector('img');

    var faviconUrl = node.url.replace('//', '//' + 'favicon.link/');

    _img.setAttribute('src', faviconUrl);
  }
}

var applyHashMap = function applyHashMap() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n                <div class=\"site\">\n                    <div class=\"site-icon\">\n                        <img src=\"\"></img>\n                        <div class=\"icon-text\"></div>\n                    </div>\n                    <div class=\"site-text\">".concat(node.text, "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon-close\" aria-hidden=\"true\">\n                            <use xlink:href=\"#icon-close\"></use>\n                        </svg>\n                    </div>\n                </div>\n        </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); // 阻止冒泡

      hashMap.splice(index, 1);
      applyHashMap();
    });
    setIcon($li, node);
  });
};

$('.reset').on('click', function () {
  var string = JSON.stringify(originHashMap);
  localStorage.setItem('x', string);
  store = false;
  location.reload();
});
$('.add-button').on('click', function () {
  var url = window.prompt('请输入网址', 'https://');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  var text = window.prompt('请输入网址名称');

  if (!text) {
    text = simplifyUrl(url);
  }

  hashMap.push({
    url: url,
    text: text
  });
  applyHashMap();
});

window.onbeforeunload = function () {
  if (!store) {
    store = !store;
    return;
  }

  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

window.onload = function () {
  applyHashMap();
};

$(document).on('keypress', function (e) {
  // const key = e.key 简写
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    // console.log(hashMap[i].text[0])
    if (!hashMap[i].text) {
      continue;
    }

    if (hashMap[i].text[0].toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.20b88ffb.js.map