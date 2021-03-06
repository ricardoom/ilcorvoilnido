"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
}(window, document);