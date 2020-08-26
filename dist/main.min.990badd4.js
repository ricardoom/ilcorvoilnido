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
})({"js/main.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-cssgrid_cssgridlegacy-es6string-flexbox-fontface-hsla-setclasses !*/
!function (e, t, n) {
  function r(e, t) {
    return _typeof(e) === t;
  }

  function s() {
    var e, t, n, s, o, i, a;

    for (var l in C) {
      if (C.hasOwnProperty(l)) {
        if (e = [], t = C[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
          e.push(t.options.aliases[n].toLowerCase());
        }

        for (s = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) {
          i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = s : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = s), S.push((s ? "" : "no-") + a.join("-"));
        }
      }
    }
  }

  function o(e) {
    var t = x.className,
        n = Modernizr._config.classPrefix || "";

    if (b && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2");
    }

    Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), b ? x.className.baseVal = t : x.className = t);
  }

  function i() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : b ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
  }

  function a(e, t) {
    return !!~("" + e).indexOf(t);
  }

  function l() {
    var e = t.body;
    return e || (e = i(b ? "svg" : "body"), e.fake = !0), e;
  }

  function f(e, n, r, s) {
    var o,
        a,
        f,
        u,
        c = "modernizr",
        d = i("div"),
        p = l();
    if (parseInt(r, 10)) for (; r--;) {
      f = i("div"), f.id = s ? s[r] : c + (r + 1), d.appendChild(f);
    }
    return o = i("style"), o.type = "text/css", o.id = "s" + c, (p.fake ? p : d).appendChild(o), p.appendChild(d), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), d.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", u = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), a = n(d, e), p.fake ? (p.parentNode.removeChild(p), x.style.overflow = u, x.offsetHeight) : d.parentNode.removeChild(d), !!a;
  }

  function u(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase();
    }).replace(/^-/, "");
  }

  function c(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }

  function d(e, t, n) {
    var s;

    for (var o in e) {
      if (e[o] in t) return n === !1 ? e[o] : (s = t[e[o]], r(s, "function") ? c(s, n || t) : s);
    }

    return !1;
  }

  function p(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return "-" + t.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }

  function m(t, n, r) {
    var s;

    if ("getComputedStyle" in e) {
      s = getComputedStyle.call(e, t, n);
      var o = e.console;
      if (null !== s) r && (s = s.getPropertyValue(r));else if (o) {
        var i = o.error ? "error" : "log";
        o[i].call(o, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else s = !n && t.currentStyle && t.currentStyle[r];

    return s;
  }

  function g(t, r) {
    var s = t.length;

    if ("CSS" in e && "supports" in e.CSS) {
      for (; s--;) {
        if (e.CSS.supports(p(t[s]), r)) return !0;
      }

      return !1;
    }

    if ("CSSSupportsRule" in e) {
      for (var o = []; s--;) {
        o.push("(" + p(t[s]) + ":" + r + ")");
      }

      return o = o.join(" or "), f("@supports (" + o + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == m(e, null, "position");
      });
    }

    return n;
  }

  function y(e, t, s, o) {
    function l() {
      c && (delete k.style, delete k.modElem);
    }

    if (o = r(o, "undefined") ? !1 : o, !r(s, "undefined")) {
      var f = g(e, s);
      if (!r(f, "undefined")) return f;
    }

    for (var c, d, p, m, y, h = ["modernizr", "tspan", "samp"]; !k.style && h.length;) {
      c = !0, k.modElem = i(h.shift()), k.style = k.modElem.style;
    }

    for (p = e.length, d = 0; p > d; d++) {
      if (m = e[d], y = k.style[m], a(m, "-") && (m = u(m)), k.style[m] !== n) {
        if (o || r(s, "undefined")) return l(), "pfx" == t ? m : !0;

        try {
          k.style[m] = s;
        } catch (v) {}

        if (k.style[m] != y) return l(), "pfx" == t ? m : !0;
      }
    }

    return l(), !1;
  }

  function h(e, t, n, s, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + E.join(i + " ") + i).split(" ");
    return r(t, "string") || r(t, "undefined") ? y(a, t, s, o) : (a = (e + " " + z.join(i + " ") + i).split(" "), d(a, t, n));
  }

  function v(e, t, r) {
    return h(e, n, n, t, r);
  }

  var S = [],
      C = [],
      w = {
    _version: "3.6.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, t) {
      var n = this;
      setTimeout(function () {
        t(n[e]);
      }, 0);
    },
    addTest: function addTest(e, t, n) {
      C.push({
        name: e,
        fn: t,
        options: n
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      C.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = w, Modernizr = new Modernizr(), Modernizr.addTest("es6string", !!(String.fromCodePoint && String.raw && String.prototype.codePointAt && String.prototype.repeat && String.prototype.startsWith && String.prototype.endsWith && String.prototype.includes));
  var x = t.documentElement,
      b = "svg" === x.nodeName.toLowerCase();
  Modernizr.addTest("hsla", function () {
    var e = i("a").style;
    return e.cssText = "background-color:hsla(120,40%,100%,.5)", a(e.backgroundColor, "rgba") || a(e.backgroundColor, "hsla");
  });

  var T = w.testStyles = f,
      _ = function () {
    var e = navigator.userAgent,
        t = e.match(/w(eb)?osbrowser/gi),
        n = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9;
    return t || n;
  }();

  _ ? Modernizr.addTest("fontface", !1) : T('@font-face {font-family:"font";src:url("https://")}', function (e, n) {
    var r = t.getElementById("smodernizr"),
        s = r.sheet || r.styleSheet,
        o = s ? s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText || "" : "",
        i = /src/i.test(o) && 0 === o.indexOf(n.split(" ")[0]);
    Modernizr.addTest("fontface", i);
  });
  var P = "Moz O ms Webkit",
      E = w._config.usePrefixes ? P.split(" ") : [];
  w._cssomPrefixes = E;
  var z = w._config.usePrefixes ? P.toLowerCase().split(" ") : [];
  w._domPrefixes = z;
  var N = {
    elem: i("modernizr")
  };

  Modernizr._q.push(function () {
    delete N.elem;
  });

  var k = {
    style: N.elem.style
  };
  Modernizr._q.unshift(function () {
    delete k.style;
  }), w.testAllProps = h, w.testAllProps = v, Modernizr.addTest("cssanimations", v("animationName", "a", !0)), Modernizr.addTest("cssgridlegacy", v("grid-columns", "10px", !0)), Modernizr.addTest("cssgrid", v("grid-template-rows", "none", !0)), Modernizr.addTest("flexbox", v("flexBasis", "1px", !0)), s(), o(S), delete w.addTest, delete w.addAsyncTest;

  for (var A = 0; A < Modernizr._q.length; A++) {
    Modernizr._q[A]();
  }

  e.Modernizr = Modernizr;
}(window, document); // Avoid `console` errors in browsers that lack a console.

(function () {
  var method;

  var noop = function noop() {};

  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = window.console = window.console || {};

  while (length--) {
    method = methods[length]; // Only stub undefined methods.

    if (!console[method]) {
      console[method] = noop;
    }
  }
})(); // Place any jQuery/helper plugins in here.
//
// Il Nido Seattle
//
// Cloudinary Import:
// import { Cloudinary } from '../../node_modules/cloudinary-core';
// import { apiKey, cloudName } from '../../config';
// const key = apiKey;
// const cl = new Cloudinary({ cloud_name: cloudName, secure: true });
// const imgTag = cl.image('myPicID');
// console.log(imgTag);
// Get the base URL from the document:


var baseURL = document.location;
var baseTitle = document.querySelector('title');
var baseBody = document.querySelector('body'); // Main elements in the DOM

var main = baseBody.querySelector('main'); // const mainNav = baseBody.querySelector('nav');

var footer = baseBody.querySelector('footer');
var nidoAddress = footer.firstElementChild; // const corvoContain = document.querySelector('.ilcorvo-section');

var nidoContain = document.querySelector('.ilnido-section');
var defaultContain = document.querySelector('.default'); // const navLink = baseBody.querySelector('.restaurant-link');
// Content variable / flags

var nidoContent = nidoContain.children[1]; // const corvoContent = corvoContain.children[1];
// the content children:
// const allCorvoContentChildren = corvoContain.children;

var allNidoContentChildren = nidoContain.children; // const mainBackgroundImage = baseBody.querySelector('.main-background-image__instaFeed');

var restaurant = {
  host: baseURL.host,
  port: baseURL.port,
  origin: baseURL.origin,
  path: baseURL.pathname,
  nido: {
    title: 'Il Nido Seattle',
    href: 'http://127.0.0.1:4040/',
    devHref: 'http://localhost:4040/',
    prodHref: 'http://ilnidoseattle.com/',
    prodHrefSec: 'https://ilnidoseattle.com/',
    instaURL: 'https://www.instagram.com/p/BnkaHsWFrbl/media/?size=l',
    staticImgURL: './img/firePlaceCold.smaller.jpg',
    googleSiteVerification: 'ebn5WipMEe9IkbXBdqN7sV8925O_tFqEt0J6PxbLRIE',
    contact: {
      address: '2717 61st Ave SW, Seattle, WA 98116',
      phone: '2064666256',
      email: 'ilnidoseattle@icloud.com'
    }
  }
};

if (baseURL.href === restaurant.nido.href || baseURL.href === restaurant.nido.devHref || baseURL.href === restaurant.nido.prodHrefSec || baseURL.href === restaurant.nido.prodHref) {
  // il nido side
  if (baseURL.href === restaurant.nido.href) {
    // modify the nav urls based on environment:
    console.log('on a il nido local host');
  } else if (baseURL.href === restaurant.nido.devHref) {
    console.log('on the dev server');
  } else {
    console.log('production');
  }

  baseTitle.innerText = restaurant.nido.title;
  baseBody.setAttribute('class', 'default ilnido');
  nidoContain.children[0].href = '#';
  main.removeChild(defaultContain);
} else {
  console.log('both failed for some reason... are you on 127... or localhost?');
}
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64493" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.min.js"], null)
//# sourceMappingURL=/main.min.990badd4.js.map