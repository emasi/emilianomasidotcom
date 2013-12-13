(function() {
    var a = false, b = /xyz/.test(function() {
        xyz
    }) ? /\b_super\b/ : /.*/;
    this.Class = function() {
    };
    Class.extend = function(c) {
        var d = this.prototype;
        a = true;
        var e = new this;
        a = false;
        for (var f in c) {
            e[f] = typeof c[f] == "function" && typeof d[f] == "function" && b.test(c[f]) ? function(a, b) {
                return function() {
                    var c = this._super;
                    this._super = d[a];
                    var e = b.apply(this, arguments);
                    this._super = c;
                    return e
                }
            }(f, c[f]) : c[f]
        }
        function g() {
            if (!a && this.init)
                this.init.apply(this, arguments)
        }
        g.prototype = e;
        g.prototype.constructor = g;
        g.extend = arguments.callee;
        return g
    }
})();
(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
        var c = function() {
            a.call(this, "css");
            this._overwriteProps.length = 0;
            this.setRatio = c.prototype.setRatio
        }, d, e, f, g, h = {}, i = c.prototype = new a("css");
        i.constructor = c;
        c.version = "1.10.3";
        c.API = 2;
        c.defaultTransformPerspective = 0;
        i = "px";
        c.suffixMap = {top: i,right: i,bottom: i,left: i,width: i,height: i,fontSize: i,padding: i,margin: i,perspective: i};
        var j = /(?:\d|\-\d|\.\d|\-\.\d)+/g, k = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, l = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, m = /[^\d\-\.]/g, n = /(?:\d|\-|\+|=|#|\.)*/g, o = /opacity *= *([^)]*)/, p = /opacity:([^;]*)/, q = /alpha\(opacity *=.+?\)/i, r = /^(rgb|hsl)/, s = /([A-Z])/g, t = /-([a-z])/gi, u = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, v = function(a, b) {
            return b.toUpperCase()
        }, w = /(?:Left|Right|Width)/i, x = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, y = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, z = /,(?=[^\)]*(?:\(|$))/gi, A = Math.PI / 180, B = 180 / Math.PI, C = {}, D = document, E = D.createElement("div"), F = D.createElement("img"), G = c._internals = {_specialProps: h}, H = navigator.userAgent, I, J, K, L, M, N, O = function() {
            var a = H.indexOf("Android"), b = D.createElement("div"), c;
            K = H.indexOf("Safari") !== -1 && H.indexOf("Chrome") === -1 && (a === -1 || Number(H.substr(a + 8, 1)) > 3);
            M = K && Number(H.substr(H.indexOf("Version/") + 8, 1)) < 6;
            L = H.indexOf("Firefox") !== -1;
            /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H);
            N = parseFloat(RegExp.$1);
            b.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
            c = b.getElementsByTagName("a")[0];
            return c ? /^0.55/.test(c.style.opacity) : false
        }(), P = function(a) {
            return o.test(typeof a === "string" ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, Q = function(a) {
            if (window.console) {
                console.log(a)
            }
        }, R = "", S = "", T = function(a, b) {
            b = b || E;
            var c = b.style, d, e;
            if (c[a] !== undefined) {
                return a
            }
            a = a.charAt(0).toUpperCase() + a.substr(1);
            d = ["O", "Moz", "ms", "Ms", "Webkit"];
            e = 5;
            while (--e > -1 && c[d[e] + a] === undefined) {
            }
            if (e >= 0) {
                S = e === 3 ? "ms" : d[e];
                R = "-" + S.toLowerCase() + "-";
                return S + a
            }
            return null
        }, U = D.defaultView ? D.defaultView.getComputedStyle : function() {
        }, V = c.getStyle = function(a, b, c, d, e) {
            var f;
            if (!O)
                if (b === "opacity") {
                    return P(a)
                }
            if (!d && a.style[b]) {
                f = a.style[b]
            } else if (c = c || U(a, null)) {
                a = c.getPropertyValue(b.replace(s, "-$1").toLowerCase());
                f = a || c.length ? a : c[b]
            } else if (a.currentStyle) {
                f = a.currentStyle[b]
            }
            return e != null && (!f || f === "none" || f === "auto" || f === "auto auto") ? e : f
        }, W = function(a, b, c, d, e) {
            if (d === "px" || !d) {
                return c
            }
            if (d === "auto" || !c) {
                return 0
            }
            var f = w.test(b), g = a, h = E.style, i = c < 0, j;
            if (i) {
                c = -c
            }
            if (d === "%" && b.indexOf("border") !== -1) {
                j = c / 100 * (f ? a.clientWidth : a.clientHeight)
            } else {
                h.cssText = "border-style:solid;border-width:0;position:absolute;line-height:0;";
                if (d === "%" || !g.appendChild) {
                    g = a.parentNode || D.body;
                    h[f ? "width" : "height"] = c + d
                } else {
                    h[f ? "borderLeftWidth" : "borderTopWidth"] = c + d
                }
                g.appendChild(E);
                j = parseFloat(E[f ? "offsetWidth" : "offsetHeight"]);
                g.removeChild(E);
                if (j === 0 && !e) {
                    j = W(a, b, c, d, true)
                }
            }
            return i ? -j : j
        }, X = function(a, b, c) {
            if (V(a, "position", c) !== "absolute") {
                return 0
            }
            var d = b === "left" ? "Left" : "Top", e = V(a, "margin" + d, c);
            return a["offset" + d] - (W(a, b, parseFloat(e), e.replace(n, "")) || 0)
        }, Y = function(a, b) {
            var c = {}, d, e;
            if (b = b || U(a, null)) {
                if (d = b.length) {
                    while (--d > -1) {
                        c[b[d].replace(t, v)] = b.getPropertyValue(b[d])
                    }
                } else {
                    for (d in b) {
                        c[d] = b[d]
                    }
                }
            } else if (b = a.currentStyle || a.style) {
                for (d in b) {
                    c[d.replace(t, v)] = b[d]
                }
            }
            if (!O) {
                c.opacity = P(a)
            }
            e = zb(a, b, false);
            c.rotation = e.rotation * B;
            c.skewX = e.skewX * B;
            c.scaleX = e.scaleX;
            c.scaleY = e.scaleY;
            c.x = e.x;
            c.y = e.y;
            if (yb) {
                c.z = e.z;
                c.rotationX = e.rotationX * B;
                c.rotationY = e.rotationY * B;
                c.scaleZ = e.scaleZ
            }
            if (c.filters) {
                delete c.filters
            }
            return c
        }, Z = function(a, b, c, d, e) {
            var f = {}, g = a.style, h, i, j;
            for (i in c) {
                if (i !== "cssText")
                    if (i !== "length")
                        if (isNaN(i))
                            if (b[i] !== (h = c[i]) || e && e[i])
                                if (i.indexOf("Origin") === -1)
                                    if (typeof h === "number" || typeof h === "string") {
                                        f[i] = h === "auto" && (i === "left" || i === "top") ? X(a, i) : (h === "" || h === "auto" || h === "none") && typeof b[i] === "string" && b[i].replace(m, "") !== "" ? 0 : h;
                                        if (g[i] !== undefined) {
                                            j = new mb(g, i, g[i], j)
                                        }
                                    }
            }
            if (d) {
                for (i in d) {
                    if (i !== "className") {
                        f[i] = d[i]
                    }
                }
            }
            return {difs: f,firstMPT: j}
        }, $ = {width: ["Left", "Right"],height: ["Top", "Bottom"]}, _ = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ab = function(a, b, c) {
            var d = parseFloat(b === "width" ? a.offsetWidth : a.offsetHeight), e = $[b], f = e.length;
            c = c || U(a, null);
            while (--f > -1) {
                d -= parseFloat(V(a, "padding" + e[f], c, true)) || 0;
                d -= parseFloat(V(a, "border" + e[f] + "Width", c, true)) || 0
            }
            return d
        }, bb = function(a, b) {
            if (a == null || a === "" || a === "auto" || a === "auto auto") {
                a = "0 0"
            }
            var c = a.split(" "), d = a.indexOf("left") !== -1 ? "0%" : a.indexOf("right") !== -1 ? "100%" : c[0], e = a.indexOf("top") !== -1 ? "0%" : a.indexOf("bottom") !== -1 ? "100%" : c[1];
            if (e == null) {
                e = "0"
            } else if (e === "center") {
                e = "50%"
            }
            if (d === "center" || isNaN(parseFloat(d)) && (d + "").indexOf("=") === -1) {
                d = "50%"
            }
            if (b) {
                b.oxp = d.indexOf("%") !== -1;
                b.oyp = e.indexOf("%") !== -1;
                b.oxr = d.charAt(1) === "=";
                b.oyr = e.charAt(1) === "=";
                b.ox = parseFloat(d.replace(m, ""));
                b.oy = parseFloat(e.replace(m, ""))
            }
            return d + " " + e + (c.length > 2 ? " " + c[2] : "")
        }, cb = function(a, b) {
            return typeof a === "string" && a.charAt(1) === "=" ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
        }, db = function(a, b) {
            return a == null ? b : typeof a === "string" && a.charAt(1) === "=" ? parseInt(a.charAt(0) + "1", 10) * Number(a.substr(2)) + b : parseFloat(a)
        }, eb = function(a, b, c, d) {
            var e = 1e-6, f, g, h, i;
            if (a == null) {
                i = b
            } else if (typeof a === "number") {
                i = a * A
            } else {
                f = Math.PI * 2;
                g = a.split("_");
                h = Number(g[0].replace(m, "")) * (a.indexOf("rad") === -1 ? A : 1) - (a.charAt(1) === "=" ? 0 : b);
                if (g.length) {
                    if (d) {
                        d[c] = b + h
                    }
                    if (a.indexOf("short") !== -1) {
                        h = h % f;
                        if (h !== h % (f / 2)) {
                            h = h < 0 ? h + f : h - f
                        }
                    }
                    if (a.indexOf("_cw") !== -1 && h < 0) {
                        h = (h + f * 9999999999) % f - (h / f | 0) * f
                    } else if (a.indexOf("ccw") !== -1 && h > 0) {
                        h = (h - f * 9999999999) % f - (h / f | 0) * f
                    }
                }
                i = b + h
            }
            if (i < e && i > -e) {
                i = 0
            }
            return i
        }, fb = {aqua: [0, 255, 255],lime: [0, 255, 0],silver: [192, 192, 192],black: [0, 0, 0],maroon: [128, 0, 0],teal: [0, 128, 128],blue: [0, 0, 255],navy: [0, 0, 128],white: [255, 255, 255],fuchsia: [255, 0, 255],olive: [128, 128, 0],yellow: [255, 255, 0],orange: [255, 165, 0],gray: [128, 128, 128],purple: [128, 0, 128],green: [0, 128, 0],red: [255, 0, 0],pink: [255, 192, 203],cyan: [0, 255, 255],transparent: [255, 255, 255, 0]}, gb = function(a, b, c) {
            a = a < 0 ? a + 1 : a > 1 ? a - 1 : a;
            return (a * 6 < 1 ? b + (c - b) * a * 6 : a < .5 ? c : a * 3 < 2 ? b + (c - b) * (2 / 3 - a) * 6 : b) * 255 + .5 | 0
        }, hb = function(a) {
            var b, c, d, e, f, g;
            if (!a || a === "") {
                return fb.black
            }
            if (typeof a === "number") {
                return [a >> 16, a >> 8 & 255, a & 255]
            }
            if (a.charAt(a.length - 1) === ",") {
                a = a.substr(0, a.length - 1)
            }
            if (fb[a]) {
                return fb[a]
            }
            if (a.charAt(0) === "#") {
                if (a.length === 4) {
                    b = a.charAt(1), c = a.charAt(2), d = a.charAt(3);
                    a = "#" + b + b + c + c + d + d
                }
                a = parseInt(a.substr(1), 16);
                return [a >> 16, a >> 8 & 255, a & 255]
            }
            if (a.substr(0, 3) === "hsl") {
                a = a.match(j);
                e = Number(a[0]) % 360 / 360;
                f = Number(a[1]) / 100;
                g = Number(a[2]) / 100;
                c = g <= .5 ? g * (f + 1) : g + f - g * f;
                b = g * 2 - c;
                if (a.length > 3) {
                    a[3] = Number(a[3])
                }
                a[0] = gb(e + 1 / 3, b, c);
                a[1] = gb(e, b, c);
                a[2] = gb(e - 1 / 3, b, c);
                return a
            }
            a = a.match(j) || fb.transparent;
            a[0] = Number(a[0]);
            a[1] = Number(a[1]);
            a[2] = Number(a[2]);
            if (a.length > 3) {
                a[3] = Number(a[3])
            }
            return a
        }, ib = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (i in fb) {
            ib += "|" + i + "\\b"
        }
        ib = new RegExp(ib + ")", "gi");
        var jb = function(a, b, c, d) {
            if (a == null) {
                return function(a) {
                    return a
                }
            }
            var e = b ? (a.match(ib) || [""])[0] : "", f = a.split(e).join("").match(l) || [], g = a.substr(0, a.indexOf(f[0])), h = a.charAt(a.length - 1) === ")" ? ")" : "", i = a.indexOf(" ") !== -1 ? " " : ",", k = f.length, m = k > 0 ? f[0].replace(j, "") : "", n;
            if (!k) {
                return function(a) {
                    return a
                }
            }
            if (b) {
                n = function(a) {
                    var b, j, o, p;
                    if (typeof a === "number") {
                        a += m
                    } else if (d && z.test(a)) {
                        p = a.replace(z, "|").split("|");
                        for (o = 0; o < p.length; o++) {
                            p[o] = n(p[o])
                        }
                        return p.join(",")
                    }
                    b = (a.match(ib) || [e])[0];
                    j = a.split(b).join("").match(l) || [];
                    o = j.length;
                    if (k > o--) {
                        while (++o < k) {
                            j[o] = c ? j[(o - 1) / 2 | 0] : f[o]
                        }
                    }
                    return g + j.join(i) + i + b + h + (a.indexOf("inset") !== -1 ? " inset" : "")
                };
                return n
            }
            n = function(a) {
                var b, e, j;
                if (typeof a === "number") {
                    a += m
                } else if (d && z.test(a)) {
                    e = a.replace(z, "|").split("|");
                    for (j = 0; j < e.length; j++) {
                        e[j] = n(e[j])
                    }
                    return e.join(",")
                }
                b = a.match(l) || [];
                j = b.length;
                if (k > j--) {
                    while (++j < k) {
                        b[j] = c ? b[(j - 1) / 2 | 0] : f[j]
                    }
                }
                return g + b.join(i) + h
            };
            return n
        }, kb = function(a) {
            a = a.split(",");
            return function(b, c, d, e, f, g, h) {
                var i = (c + "").split(" "), j;
                h = {};
                for (j = 0; j < 4; j++) {
                    h[a[j]] = i[j] = i[j] || i[(j - 1) / 2 >> 0]
                }
                return e.parse(b, h, f, g)
            }
        }, lb = G._setPluginRatio = function(a) {
            this.plugin.setRatio(a);
            var b = this.data, c = b.proxy, d = b.firstMPT, e = 1e-6, f, g, h, i;
            while (d) {
                f = c[d.v];
                if (d.r) {
                    f = f > 0 ? f + .5 | 0 : f - .5 | 0
                } else if (f < e && f > -e) {
                    f = 0
                }
                d.t[d.p] = f;
                d = d._next
            }
            if (b.autoRotate) {
                b.autoRotate.rotation = c.rotation
            }
            if (a === 1) {
                d = b.firstMPT;
                while (d) {
                    g = d.t;
                    if (!g.type) {
                        g.e = g.s + g.xs0
                    } else if (g.type === 1) {
                        i = g.xs0 + g.s + g.xs1;
                        for (h = 1; h < g.l; h++) {
                            i += g["xn" + h] + g["xs" + (h + 1)]
                        }
                        g.e = i
                    }
                    d = d._next
                }
            }
        }, mb = function(a, b, c, d, e) {
            this.t = a;
            this.p = b;
            this.v = c;
            this.r = e;
            if (d) {
                d._prev = this;
                this._next = d
            }
        }, nb = G._parseToProxy = function(a, b, c, d, e, f) {
            var g = d, h = {}, i = {}, j = c._transform, k = C, l, m, n, o, p;
            c._transform = null;
            C = b;
            d = p = c.parse(a, b, d, e);
            C = k;
            if (f) {
                c._transform = j;
                if (g) {
                    g._prev = null;
                    if (g._prev) {
                        g._prev._next = null
                    }
                }
            }
            while (d && d !== g) {
                if (d.type <= 1) {
                    m = d.p;
                    i[m] = d.s + d.c;
                    h[m] = d.s;
                    if (!f) {
                        o = new mb(d, "s", m, o, d.r);
                        d.c = 0
                    }
                    if (d.type === 1) {
                        l = d.l;
                        while (--l > 0) {
                            n = "xn" + l;
                            m = d.p + "_" + n;
                            i[m] = d.data[n];
                            h[m] = d[n];
                            if (!f) {
                                o = new mb(d, n, m, o, d.rxp[n])
                            }
                        }
                    }
                }
                d = d._next
            }
            return {proxy: h,end: i,firstMPT: o,pt: p}
        }, ob = G.CSSPropTween = function(a, b, c, e, f, h, i, j, k, l, m) {
            this.t = a;
            this.p = b;
            this.s = c;
            this.c = e;
            this.n = i || b;
            if (!(a instanceof ob)) {
                g.push(this.n)
            }
            this.r = j;
            this.type = h || 0;
            if (k) {
                this.pr = k;
                d = true
            }
            this.b = l === undefined ? c : l;
            this.e = m === undefined ? c + e : m;
            if (f) {
                this._next = f;
                f._prev = this
            }
        }, pb = c.parseComplex = function(a, b, c, d, e, f, g, h, i, l) {
            c = c || f || "";
            g = new ob(a, b, 0, 0, g, l ? 2 : 1, null, false, h, c, d);
            d += "";
            var m = c.split(", ").join(",").split(" "), n = d.split(", ").join(",").split(" "), o = m.length, p = I !== false, q, s, t, u, v, w, x, y, A, B, C, D;
            if (d.indexOf(",") !== -1 || c.indexOf(",") !== -1) {
                m = m.join(" ").replace(z, ", ").split(" ");
                n = n.join(" ").replace(z, ", ").split(" ");
                o = m.length
            }
            if (o !== n.length) {
                m = (f || "").split(" ");
                o = m.length
            }
            g.plugin = i;
            g.setRatio = l;
            for (q = 0; q < o; q++) {
                u = m[q];
                v = n[q];
                y = parseFloat(u);
                if (y || y === 0) {
                    g.appendXtra("", y, cb(v, y), v.replace(k, ""), p && v.indexOf("px") !== -1, true)
                } else if (e && (u.charAt(0) === "#" || fb[u] || r.test(u))) {
                    D = v.charAt(v.length - 1) === "," ? ")," : ")";
                    u = hb(u);
                    v = hb(v);
                    A = u.length + v.length > 6;
                    if (A && !O && v[3] === 0) {
                        g["xs" + g.l] += g.l ? " transparent" : "transparent";
                        g.e = g.e.split(n[q]).join("transparent")
                    } else {
                        if (!O) {
                            A = false
                        }
                        g.appendXtra(A ? "rgba(" : "rgb(", u[0], v[0] - u[0], ",", true, true).appendXtra("", u[1], v[1] - u[1], ",", true).appendXtra("", u[2], v[2] - u[2], A ? "," : D, true);
                        if (A) {
                            u = u.length < 4 ? 1 : u[3];
                            g.appendXtra("", u, (v.length < 4 ? 1 : v[3]) - u, D, false)
                        }
                    }
                } else {
                    w = u.match(j);
                    if (!w) {
                        g["xs" + g.l] += g.l ? " " + u : u
                    } else {
                        x = v.match(k);
                        if (!x || x.length !== w.length) {
                            return g
                        }
                        t = 0;
                        for (s = 0; s < w.length; s++) {
                            C = w[s];
                            B = u.indexOf(C, t);
                            g.appendXtra(u.substr(t, B - t), Number(C), cb(x[s], C), "", p && u.substr(B + C.length, 2) === "px", s === 0);
                            t = B + C.length
                        }
                        g["xs" + g.l] += u.substr(t)
                    }
                }
            }
            if (d.indexOf("=") !== -1)
                if (g.data) {
                    D = g.xs0 + g.data.s;
                    for (q = 1; q < g.l; q++) {
                        D += g["xs" + q] + g.data["xn" + q]
                    }
                    g.e = D + g["xs" + q]
                }
            if (!g.l) {
                g.type = -1;
                g.xs0 = g.e
            }
            return g.xfirst || g
        }, qb = 9;
        i = ob.prototype;
        i.l = i.pr = 0;
        while (--qb > 0) {
            i["xn" + qb] = 0;
            i["xs" + qb] = ""
        }
        i.xs0 = "";
        i._next = i._prev = i.xfirst = i.data = i.plugin = i.setRatio = i.rxp = null;
        i.appendXtra = function(a, b, c, d, e, f) {
            var g = this, h = g.l;
            g["xs" + h] += f && h ? " " + a : a || "";
            if (!c)
                if (h !== 0 && !g.plugin) {
                    g["xs" + h] += b + (d || "");
                    return g
                }
            g.l++;
            g.type = g.setRatio ? 2 : 1;
            g["xs" + g.l] = d || "";
            if (h > 0) {
                g.data["xn" + h] = b + c;
                g.rxp["xn" + h] = e;
                g["xn" + h] = b;
                if (!g.plugin) {
                    g.xfirst = new ob(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr);
                    g.xfirst.xs0 = 0
                }
                return g
            }
            g.data = {s: b + c};
            g.rxp = {};
            g.s = b;
            g.c = c;
            g.r = e;
            return g
        };
        var rb = function(a, b) {
            b = b || {};
            this.p = b.prefix ? T(a) || a : a;
            h[a] = h[this.p] = this;
            this.format = b.formatter || jb(b.defaultValue, b.color, b.collapsible, b.multi);
            if (b.parser) {
                this.parse = b.parser
            }
            this.clrs = b.color;
            this.multi = b.multi;
            this.keyword = b.keyword;
            this.dflt = b.defaultValue;
            this.pr = b.priority || 0
        }, sb = G._registerComplexSpecialProp = function(a, b, c) {
            if (typeof b !== "object") {
                b = {parser: c}
            }
            var d = a.split(","), e = b.defaultValue, f, g;
            c = c || [e];
            for (f = 0; f < d.length; f++) {
                b.prefix = f === 0 && b.prefix;
                b.defaultValue = c[f] || e;
                g = new rb(d[f], b)
            }
        }, tb = function(a) {
            if (!h[a]) {
                var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                sb(a, {parser: function(a, c, d, e, f, g, i) {
                        var j = (window.GreenSockGlobals || window).com.greensock.plugins[b];
                        if (!j) {
                            Q("Error: " + b + " js file not loaded.");
                            return f
                        }
                        j._cssRegister();
                        return h[d].parse(a, c, d, e, f, g, i)
                    }})
            }
        };
        i = rb.prototype;
        i.parseComplex = function(a, b, c, d, e, f) {
            var g = this.keyword, h, i, j, k, l, m;
            if (this.multi)
                if (z.test(c) || z.test(b)) {
                    i = b.replace(z, "|").split("|");
                    j = c.replace(z, "|").split("|")
                } else if (g) {
                    i = [b];
                    j = [c]
                }
            if (j) {
                k = j.length > i.length ? j.length : i.length;
                for (h = 0; h < k; h++) {
                    b = i[h] = i[h] || this.dflt;
                    c = j[h] = j[h] || this.dflt;
                    if (g) {
                        l = b.indexOf(g);
                        m = c.indexOf(g);
                        if (l !== m) {
                            c = m === -1 ? j : i;
                            c[h] += " " + g
                        }
                    }
                }
                b = i.join(", ");
                c = j.join(", ")
            }
            return pb(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        };
        i.parse = function(a, b, c, d, e, g, h) {
            return this.parseComplex(a.style, this.format(V(a, this.p, f, false, this.dflt)), this.format(b), e, g)
        };
        c.registerSpecialProp = function(a, b, c) {
            sb(a, {parser: function(a, d, e, f, g, h, i) {
                    var j = new ob(a, e, 0, 0, g, 2, e, false, c);
                    j.plugin = h;
                    j.setRatio = b(a, d, f._tween, e);
                    return j
                },priority: c})
        };
        var ub = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","), vb = T("transform"), wb = R + "transform", xb = T("transformOrigin"), yb = T("perspective") !== null, zb = function(a, b, d, e) {
            if (a._gsTransform && d && !e) {
                return a._gsTransform
            }
            var f = d ? a._gsTransform || {skewY: 0} : {skewY: 0}, g = f.scaleX < 0, h = 2e-5, i = 1e5, j = -Math.PI + 1e-4, k = Math.PI - 1e-4, l = yb ? parseFloat(V(a, xb, b, false, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0, m, n, o, p, q, r, s, t, u, v, w, y, z;
            if (vb) {
                m = V(a, wb, b, true)
            } else if (a.currentStyle) {
                m = a.currentStyle.filter.match(x);
                m = m && m.length === 4 ? [m[0].substr(4), Number(m[2].substr(4)), Number(m[1].substr(4)), m[3].substr(4), f.x || 0, f.y || 0].join(",") : ""
            }
            n = (m || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
            o = n.length;
            while (--o > -1) {
                p = Number(n[o]);
                n[o] = (q = p - (p |= 0)) ? (q * i + (q < 0 ? -.5 : .5) | 0) / i + p : p
            }
            if (n.length === 16) {
                var A = n[8], B = n[9], C = n[10], D = n[12], E = n[13], F = n[14];
                if (f.zOrigin) {
                    F = -f.zOrigin;
                    D = A * F - n[12];
                    E = B * F - n[13];
                    F = C * F + f.zOrigin - n[14]
                }
                if (!d || e || f.rotationX == null) {
                    var G = n[0], H = n[1], I = n[2], J = n[3], K = n[4], L = n[5], M = n[6], N = n[7], O = n[11], P = f.rotationX = Math.atan2(M, C), Q = P < j || P > k, R, S, T, U, W, X, Y;
                    if (P) {
                        U = Math.cos(-P);
                        W = Math.sin(-P);
                        R = K * U + A * W;
                        S = L * U + B * W;
                        T = M * U + C * W;
                        A = K * -W + A * U;
                        B = L * -W + B * U;
                        C = M * -W + C * U;
                        O = N * -W + O * U;
                        K = R;
                        L = S;
                        M = T
                    }
                    P = f.rotationY = Math.atan2(A, G);
                    if (P) {
                        X = P < j || P > k;
                        U = Math.cos(-P);
                        W = Math.sin(-P);
                        R = G * U - A * W;
                        S = H * U - B * W;
                        T = I * U - C * W;
                        B = H * W + B * U;
                        C = I * W + C * U;
                        O = J * W + O * U;
                        G = R;
                        H = S;
                        I = T
                    }
                    P = f.rotation = Math.atan2(H, L);
                    if (P) {
                        Y = P < j || P > k;
                        U = Math.cos(-P);
                        W = Math.sin(-P);
                        G = G * U + K * W;
                        S = H * U + L * W;
                        L = H * -W + L * U;
                        M = I * -W + M * U;
                        H = S
                    }
                    if (Y && Q) {
                        f.rotation = f.rotationX = 0
                    } else if (Y && X) {
                        f.rotation = f.rotationY = 0
                    } else if (X && Q) {
                        f.rotationY = f.rotationX = 0
                    }
                    f.scaleX = (Math.sqrt(G * G + H * H) * i + .5 | 0) / i;
                    f.scaleY = (Math.sqrt(L * L + B * B) * i + .5 | 0) / i;
                    f.scaleZ = (Math.sqrt(M * M + C * C) * i + .5 | 0) / i;
                    f.skewX = 0;
                    f.perspective = O ? 1 / (O < 0 ? -O : O) : 0;
                    f.x = D;
                    f.y = E;
                    f.z = F
                }
            } else if ((!yb || e || !n.length || f.x !== n[4] || f.y !== n[5] || !f.rotationX && !f.rotationY) && !(f.x !== undefined && V(a, "display", b) === "none")) {
                var Z = n.length >= 6, $ = Z ? n[0] : 1, _ = n[1] || 0, ab = n[2] || 0, bb = Z ? n[3] : 1;
                f.x = n[4] || 0;
                f.y = n[5] || 0;
                r = Math.sqrt($ * $ + _ * _);
                s = Math.sqrt(bb * bb + ab * ab);
                t = $ || _ ? Math.atan2(_, $) : f.rotation || 0;
                u = ab || bb ? Math.atan2(ab, bb) + t : f.skewX || 0;
                v = r - Math.abs(f.scaleX || 0);
                w = s - Math.abs(f.scaleY || 0);
                if (Math.abs(u) > Math.PI / 2 && Math.abs(u) < Math.PI * 1.5) {
                    if (g) {
                        r *= -1;
                        u += t <= 0 ? Math.PI : -Math.PI;
                        t += t <= 0 ? Math.PI : -Math.PI
                    } else {
                        s *= -1;
                        u += u <= 0 ? Math.PI : -Math.PI
                    }
                }
                y = (t - f.rotation) % Math.PI;
                z = (u - f.skewX) % Math.PI;
                if (f.skewX === undefined || v > h || v < -h || w > h || w < -h || y > j && y < k && y * i | 0 !== 0 || z > j && z < k && z * i | 0 !== 0) {
                    f.scaleX = r;
                    f.scaleY = s;
                    f.rotation = t;
                    f.skewX = u
                }
                if (yb) {
                    f.rotationX = f.rotationY = f.z = 0;
                    f.perspective = parseFloat(c.defaultTransformPerspective) || 0;
                    f.scaleZ = 1
                }
            }
            f.zOrigin = l;
            for (o in f) {
                if (f[o] < h)
                    if (f[o] > -h) {
                        f[o] = 0
                    }
            }
            if (d) {
                a._gsTransform = f
            }
            return f
        }, Ab = function(a) {
            var b = this.data, c = -b.rotation, d = c + b.skewX, e = 1e5, f = (Math.cos(c) * b.scaleX * e | 0) / e, g = (Math.sin(c) * b.scaleX * e | 0) / e, h = (Math.sin(d) * -b.scaleY * e | 0) / e, i = (Math.cos(d) * b.scaleY * e | 0) / e, j = this.t.style, k = this.t.currentStyle, l, m;
            if (!k) {
                return
            }
            m = g;
            g = -h;
            h = -m;
            l = k.filter;
            j.filter = "";
            var p = this.t.offsetWidth, q = this.t.offsetHeight, r = k.position !== "absolute", s = "progid:DXImageTransform.Microsoft.Matrix(M11=" + f + ", M12=" + g + ", M21=" + h + ", M22=" + i, t = b.x, u = b.y, v, w;
            if (b.ox != null) {
                v = (b.oxp ? p * b.ox * .01 : b.ox) - p / 2;
                w = (b.oyp ? q * b.oy * .01 : b.oy) - q / 2;
                t += v - (v * f + w * g);
                u += w - (v * h + w * i)
            }
            if (!r) {
                s += ", sizingMethod='auto expand')"
            } else {
                v = p / 2;
                w = q / 2;
                s += ", Dx=" + (v - (v * f + w * g) + t) + ", Dy=" + (w - (v * h + w * i) + u) + ")"
            }
            if (l.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                j.filter = l.replace(y, s)
            } else {
                j.filter = s + " " + l
            }
            if (a === 0 || a === 1)
                if (f === 1)
                    if (g === 0)
                        if (h === 0)
                            if (i === 1)
                                if (!r || s.indexOf("Dx=0, Dy=0") !== -1)
                                    if (!o.test(l) || parseFloat(RegExp.$1) === 100)
                                        if (l.indexOf("gradient(" && l.indexOf("Alpha")) === -1) {
                                            j.removeAttribute("filter")
                                        }
            if (!r) {
                var x = N < 8 ? 1 : -1, z, A, B;
                v = b.ieOffsetX || 0;
                w = b.ieOffsetY || 0;
                b.ieOffsetX = Math.round((p - ((f < 0 ? -f : f) * p + (g < 0 ? -g : g) * q)) / 2 + t);
                b.ieOffsetY = Math.round((q - ((i < 0 ? -i : i) * q + (h < 0 ? -h : h) * p)) / 2 + u);
                for (qb = 0; qb < 4; qb++) {
                    A = _[qb];
                    z = k[A];
                    m = z.indexOf("px") !== -1 ? parseFloat(z) : W(this.t, A, parseFloat(z), z.replace(n, "")) || 0;
                    if (m !== b[A]) {
                        B = qb < 2 ? -b.ieOffsetX : -b.ieOffsetY
                    } else {
                        B = qb < 2 ? v - b.ieOffsetX : w - b.ieOffsetY
                    }
                    j[A] = (b[A] = Math.round(m - B * (qb === 0 || qb === 2 ? 1 : x))) + "px"
                }
            }
        }, Bb = function(a) {
            var b = this.data, c = this.t.style, d = b.rotation, e = b.scaleX, f = b.scaleY, g = b.scaleZ, h = b.perspective, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
            if (L) {
                F = c.top ? "top" : c.bottom ? "bottom" : parseFloat(V(this.t, "top", null, false)) ? "bottom" : "top";
                B = V(this.t, F, null, false);
                G = parseFloat(B) || 0;
                H = B.substr((G + "").length) || "px";
                b._ffFix = !b._ffFix;
                c[F] = (b._ffFix ? G + .05 : G - .05) + H
            }
            if (d || b.skewX) {
                z = Math.cos(d);
                A = Math.sin(d);
                i = z;
                m = A;
                if (b.skewX) {
                    d -= b.skewX;
                    z = Math.cos(d);
                    A = Math.sin(d)
                }
                j = -A;
                n = z
            } else if (!b.rotationY && !b.rotationX && g === 1 && !h) {
                c[vb] = "translate3d(" + b.x + "px," + b.y + "px," + b.z + "px)" + (e !== 1 || f !== 1 ? " scale(" + e + "," + f + ")" : "");
                return
            } else {
                i = n = 1;
                j = m = 0
            }
            s = 1;
            k = l = o = p = q = r = t = u = v = 0;
            w = h ? -1 / h : 0;
            x = b.zOrigin;
            y = 1e5;
            d = b.rotationY;
            if (d) {
                z = Math.cos(d);
                A = Math.sin(d);
                q = s * -A;
                u = w * -A;
                k = i * A;
                o = m * A;
                s *= z;
                w *= z;
                i *= z;
                m *= z
            }
            d = b.rotationX;
            if (d) {
                z = Math.cos(d);
                A = Math.sin(d);
                B = j * z + k * A;
                C = n * z + o * A;
                D = r * z + s * A;
                E = v * z + w * A;
                k = j * -A + k * z;
                o = n * -A + o * z;
                s = r * -A + s * z;
                w = v * -A + w * z;
                j = B;
                n = C;
                r = D;
                v = E
            }
            if (g !== 1) {
                k *= g;
                o *= g;
                s *= g;
                w *= g
            }
            if (f !== 1) {
                j *= f;
                n *= f;
                r *= f;
                v *= f
            }
            if (e !== 1) {
                i *= e;
                m *= e;
                q *= e;
                u *= e
            }
            if (x) {
                t -= x;
                l = k * t;
                p = o * t;
                t = s * t + x
            }
            l = (B = (l += b.x) - (l |= 0)) ? (B * y + (B < 0 ? -.5 : .5) | 0) / y + l : l;
            p = (B = (p += b.y) - (p |= 0)) ? (B * y + (B < 0 ? -.5 : .5) | 0) / y + p : p;
            t = (B = (t += b.z) - (t |= 0)) ? (B * y + (B < 0 ? -.5 : .5) | 0) / y + t : t;
            c[vb] = "matrix3d(" + [(i * y | 0) / y, (m * y | 0) / y, (q * y | 0) / y, (u * y | 0) / y, (j * y | 0) / y, (n * y | 0) / y, (r * y | 0) / y, (v * y | 0) / y, (k * y | 0) / y, (o * y | 0) / y, (s * y | 0) / y, (w * y | 0) / y, l, p, t, h ? 1 + -t / h : 1].join(",") + ")"
        }, Cb = function(a) {
            var b = this.data, c = this.t, d = c.style, e, f, g, h, i, j, k, l, m;
            if (L) {
                e = d.top ? "top" : d.bottom ? "bottom" : parseFloat(V(c, "top", null, false)) ? "bottom" : "top";
                f = V(c, e, null, false);
                g = parseFloat(f) || 0;
                h = f.substr((g + "").length) || "px";
                b._ffFix = !b._ffFix;
                d[e] = (b._ffFix ? g + .05 : g - .05) + h
            }
            if (!b.rotation && !b.skewX) {
                d[vb] = "matrix(" + b.scaleX + ",0,0," + b.scaleY + "," + b.x + "," + b.y + ")"
            } else {
                i = b.rotation;
                j = i - b.skewX;
                k = 1e5;
                l = b.scaleX * k;
                m = b.scaleY * k;
                d[vb] = "matrix(" + (Math.cos(i) * l | 0) / k + "," + (Math.sin(i) * l | 0) / k + "," + (Math.sin(j) * -m | 0) / k + "," + (Math.cos(j) * m | 0) / k + "," + b.x + "," + b.y + ")"
            }
        };
        sb("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {parser: function(a, b, c, d, e, g, h) {
                if (d._transform) {
                    return e
                }
                var i = d._transform = zb(a, f, true, h.parseTransform), j = a.style, k = 1e-6, l = ub.length, m = h, n = {}, o, p, q, r, s, t, u;
                if (typeof m.transform === "string" && vb) {
                    q = j.cssText;
                    j[vb] = m.transform;
                    j.display = "block";
                    o = zb(a, null, false);
                    j.cssText = q
                } else if (typeof m === "object") {
                    o = {scaleX: db(m.scaleX != null ? m.scaleX : m.scale, i.scaleX),scaleY: db(m.scaleY != null ? m.scaleY : m.scale, i.scaleY),scaleZ: db(m.scaleZ != null ? m.scaleZ : m.scale, i.scaleZ),x: db(m.x, i.x),y: db(m.y, i.y),z: db(m.z, i.z),perspective: db(m.transformPerspective, i.perspective)};
                    u = m.directionalRotation;
                    if (u != null) {
                        if (typeof u === "object") {
                            for (q in u) {
                                m[q] = u[q]
                            }
                        } else {
                            m.rotation = u
                        }
                    }
                    o.rotation = eb("rotation" in m ? m.rotation : "shortRotation" in m ? m.shortRotation + "_short" : "rotationZ" in m ? m.rotationZ : i.rotation * B, i.rotation, "rotation", n);
                    if (yb) {
                        o.rotationX = eb("rotationX" in m ? m.rotationX : "shortRotationX" in m ? m.shortRotationX + "_short" : i.rotationX * B || 0, i.rotationX, "rotationX", n);
                        o.rotationY = eb("rotationY" in m ? m.rotationY : "shortRotationY" in m ? m.shortRotationY + "_short" : i.rotationY * B || 0, i.rotationY, "rotationY", n)
                    }
                    o.skewX = m.skewX == null ? i.skewX : eb(m.skewX, i.skewX);
                    o.skewY = m.skewY == null ? i.skewY : eb(m.skewY, i.skewY);
                    if (p = o.skewY - i.skewY) {
                        o.skewX += p;
                        o.rotation += p
                    }
                }
                if (m.force3D != null) {
                    i.force3D = m.force3D;
                    t = true
                }
                s = i.force3D || i.z || i.rotationX || i.rotationY || o.z || o.rotationX || o.rotationY || o.perspective;
                if (!s && m.scale != null) {
                    o.scaleZ = 1
                }
                while (--l > -1) {
                    c = ub[l];
                    r = o[c] - i[c];
                    if (r > k || r < -k || C[c] != null) {
                        t = true;
                        e = new ob(i, c, i[c], r, e);
                        if (c in n) {
                            e.e = n[c]
                        }
                        e.xs0 = 0;
                        e.plugin = g;
                        d._overwriteProps.push(e.n)
                    }
                }
                r = m.transformOrigin;
                if (r || yb && s && i.zOrigin) {
                    if (vb) {
                        t = true;
                        c = xb;
                        r = (r || V(a, c, f, false, "50% 50%")) + "";
                        e = new ob(j, c, 0, 0, e, -1, "transformOrigin");
                        e.b = j[c];
                        e.plugin = g;
                        if (yb) {
                            q = i.zOrigin;
                            r = r.split(" ");
                            i.zOrigin = (r.length > 2 && !(q !== 0 && r[2] === "0px") ? parseFloat(r[2]) : q) || 0;
                            e.xs0 = e.e = j[c] = r[0] + " " + (r[1] || "50%") + " 0px";
                            e = new ob(i, "zOrigin", 0, 0, e, -1, e.n);
                            e.b = q;
                            e.xs0 = e.e = i.zOrigin
                        } else {
                            e.xs0 = e.e = j[c] = r
                        }
                    } else {
                        bb(r + "", i)
                    }
                }
                if (t) {
                    d._transformType = s || this._transformType === 3 ? 3 : 2
                }
                return e
            },prefix: true});
        sb("boxShadow", {defaultValue: "0px 0px 0px 0px #999",prefix: true,color: true,multi: true,keyword: "inset"});
        sb("borderRadius", {defaultValue: "0px",parser: function(a, b, c, d, g, h) {
                b = this.format(b);
                var i = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], j = a.style, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
                s = parseFloat(a.offsetWidth);
                t = parseFloat(a.offsetHeight);
                k = b.split(" ");
                for (l = 0; l < i.length; l++) {
                    if (this.p.indexOf("border")) {
                        i[l] = T(i[l])
                    }
                    o = n = V(a, i[l], f, false, "0px");
                    if (o.indexOf(" ") !== -1) {
                        n = o.split(" ");
                        o = n[0];
                        n = n[1]
                    }
                    p = m = k[l];
                    q = parseFloat(o);
                    v = o.substr((q + "").length);
                    w = p.charAt(1) === "=";
                    if (w) {
                        r = parseInt(p.charAt(0) + "1", 10);
                        p = p.substr(2);
                        r *= parseFloat(p);
                        u = p.substr((r + "").length - (r < 0 ? 1 : 0)) || ""
                    } else {
                        r = parseFloat(p);
                        u = p.substr((r + "").length)
                    }
                    if (u === "") {
                        u = e[c] || v
                    }
                    if (u !== v) {
                        x = W(a, "borderLeft", q, v);
                        y = W(a, "borderTop", q, v);
                        if (u === "%") {
                            o = x / s * 100 + "%";
                            n = y / t * 100 + "%"
                        } else if (u === "em") {
                            z = W(a, "borderLeft", 1, "em");
                            o = x / z + "em";
                            n = y / z + "em"
                        } else {
                            o = x + "px";
                            n = y + "px"
                        }
                        if (w) {
                            p = parseFloat(o) + r + u;
                            m = parseFloat(n) + r + u
                        }
                    }
                    g = pb(j, i[l], o + " " + n, p + " " + m, false, "0px", g)
                }
                return g
            },prefix: true,formatter: jb("0px 0px 0px 0px", false, true)});
        sb("backgroundPosition", {defaultValue: "0 0",parser: function(a, b, c, d, e, g) {
                var h = "background-position", i = f || U(a, null), j = this.format((i ? N ? i.getPropertyValue(h + "-x") + " " + i.getPropertyValue(h + "-y") : i.getPropertyValue(h) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"), k = this.format(b), l, m, n, o, p, q;
                if (j.indexOf("%") !== -1 !== (k.indexOf("%") !== -1)) {
                    q = V(a, "backgroundImage").replace(u, "");
                    if (q && q !== "none") {
                        l = j.split(" ");
                        m = k.split(" ");
                        F.setAttribute("src", q);
                        n = 2;
                        while (--n > -1) {
                            j = l[n];
                            o = j.indexOf("%") !== -1;
                            if (o !== (m[n].indexOf("%") !== -1)) {
                                p = n === 0 ? a.offsetWidth - F.width : a.offsetHeight - F.height;
                                l[n] = o ? parseFloat(j) / 100 * p + "px" : parseFloat(j) / p * 100 + "%"
                            }
                        }
                        j = l.join(" ")
                    }
                }
                return this.parseComplex(a.style, j, k, e, g)
            },formatter: bb});
        sb("backgroundSize", {defaultValue: "0 0",formatter: bb});
        sb("perspective", {defaultValue: "0px",prefix: true});
        sb("perspectiveOrigin", {defaultValue: "50% 50%",prefix: true});
        sb("transformStyle", {prefix: true});
        sb("backfaceVisibility", {prefix: true});
        sb("margin", {parser: kb("marginTop,marginRight,marginBottom,marginLeft")});
        sb("padding", {parser: kb("paddingTop,paddingRight,paddingBottom,paddingLeft")});
        sb("clip", {defaultValue: "rect(0px,0px,0px,0px)",parser: function(a, b, c, d, e, g) {
                var h, i, j;
                if (N < 9) {
                    i = a.currentStyle;
                    j = N < 8 ? " " : ",";
                    h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")";
                    b = this.format(b).split(",").join(j)
                } else {
                    h = this.format(V(a, this.p, f, false, this.dflt));
                    b = this.format(b)
                }
                return this.parseComplex(a.style, h, b, e, g)
            }});
        sb("textShadow", {defaultValue: "0px 0px 0px #999",color: true,multi: true});
        sb("autoRound,strictUnits", {parser: function(a, b, c, d, e) {
                return e
            }});
        sb("border", {defaultValue: "0px solid #000",parser: function(a, b, c, d, e, g) {
                return this.parseComplex(a.style, this.format(V(a, "borderTopWidth", f, false, "0px") + " " + V(a, "borderTopStyle", f, false, "solid") + " " + V(a, "borderTopColor", f, false, "#000")), this.format(b), e, g)
            },color: true,formatter: function(a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(ib) || ["#000"])[0]
            }});
        sb("float,cssFloat,styleFloat", {parser: function(a, b, c, d, e, f) {
                var g = a.style, h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                return new ob(g, h, 0, 0, e, -1, c, false, 0, g[h], b)
            }});
        var Db = function(a) {
            var b = this.t, c = b.filter || V(this.data, "filter"), d = this.s + this.c * a | 0, e;
            if (d === 100) {
                if (c.indexOf("atrix(") === -1 && c.indexOf("radient(") === -1 && c.indexOf("oader(") === -1) {
                    b.removeAttribute("filter");
                    e = !V(this.data, "filter")
                } else {
                    b.filter = c.replace(q, "");
                    e = true
                }
            }
            if (!e) {
                if (this.xn1) {
                    b.filter = c = c || "alpha(opacity=" + d + ")"
                }
                if (c.indexOf("opacity") === -1) {
                    if (d !== 0 || !this.xn1) {
                        b.filter = c + " alpha(opacity=" + d + ")"
                    }
                } else {
                    b.filter = c.replace(o, "opacity=" + d)
                }
            }
        };
        sb("opacity,alpha,autoAlpha", {defaultValue: "1",parser: function(a, b, c, d, e, g) {
                var h = parseFloat(V(a, "opacity", f, false, "1")), i = a.style, j = c === "autoAlpha";
                b = parseFloat(b);
                if (j && h === 1 && V(a, "visibility", f) === "hidden" && b !== 0) {
                    h = 0
                }
                if (O) {
                    e = new ob(i, "opacity", h, b - h, e)
                } else {
                    e = new ob(i, "opacity", h * 100, (b - h) * 100, e);
                    e.xn1 = j ? 1 : 0;
                    i.zoom = 1;
                    e.type = 2;
                    e.b = "alpha(opacity=" + e.s + ")";
                    e.e = "alpha(opacity=" + (e.s + e.c) + ")";
                    e.data = a;
                    e.plugin = g;
                    e.setRatio = Db
                }
                if (j) {
                    e = new ob(i, "visibility", 0, 0, e, -1, null, false, 0, h !== 0 ? "inherit" : "hidden", b === 0 ? "hidden" : "inherit");
                    e.xs0 = "inherit";
                    d._overwriteProps.push(e.n);
                    d._overwriteProps.push(c)
                }
                return e
            }});
        var Eb = function(a, b) {
            if (b) {
                if (a.removeProperty) {
                    a.removeProperty(b.replace(s, "-$1").toLowerCase())
                } else {
                    a.removeAttribute(b)
                }
            }
        }, Fb = function(a) {
            this.t._gsClassPT = this;
            if (a === 1 || a === 0) {
                this.t.className = a === 0 ? this.b : this.e;
                var b = this.data, c = this.t.style;
                while (b) {
                    if (!b.v) {
                        Eb(c, b.p)
                    } else {
                        c[b.p] = b.v
                    }
                    b = b._next
                }
                if (a === 1 && this.t._gsClassPT === this) {
                    this.t._gsClassPT = null
                }
            } else if (this.t.className !== this.e) {
                this.t.className = this.e
            }
        };
        sb("className", {parser: function(a, b, c, e, g, h, i) {
                var j = a.className, k = a.style.cssText, l, m, n, o, p;
                g = e._classNamePT = new ob(a, c, 0, 0, g, 2);
                g.setRatio = Fb;
                g.pr = -11;
                d = true;
                g.b = j;
                m = Y(a, f);
                n = a._gsClassPT;
                if (n) {
                    o = {};
                    p = n.data;
                    while (p) {
                        o[p.p] = 1;
                        p = p._next
                    }
                    n.setRatio(1)
                }
                a._gsClassPT = g;
                g.e = b.charAt(1) !== "=" ? b : j.replace(new RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + (b.charAt(0) === "+" ? " " + b.substr(2) : "");
                if (e._tween._duration) {
                    a.className = g.e;
                    l = Z(a, m, Y(a), i, o);
                    a.className = j;
                    g.data = l.firstMPT;
                    a.style.cssText = k;
                    g = g.xfirst = e.parse(a, l.difs, g, h)
                }
                return g
            }});
        var Gb = function(a) {
            if (a === 1 || a === 0)
                if (this.data._totalTime === this.data._totalDuration) {
                    var b = this.t.style, c = h.transform.parse, d, e, f, g;
                    if (this.e === "all") {
                        b.cssText = "";
                        g = true
                    } else {
                        d = this.e.split(",");
                        f = d.length;
                        while (--f > -1) {
                            e = d[f];
                            if (h[e]) {
                                if (h[e].parse === c) {
                                    g = true
                                } else {
                                    e = e === "transformOrigin" ? xb : h[e].p
                                }
                            }
                            Eb(b, e)
                        }
                    }
                    if (g) {
                        Eb(b, vb);
                        if (this.t._gsTransform) {
                            delete this.t._gsTransform
                        }
                    }
                }
        };
        sb("clearProps", {parser: function(a, b, c, e, f) {
                f = new ob(a, c, 0, 0, f, 2);
                f.setRatio = Gb;
                f.e = b;
                f.pr = -10;
                f.data = e._tween;
                d = true;
                return f
            }});
        i = "bezier,throwProps,physicsProps,physics2D".split(",");
        qb = i.length;
        while (qb--) {
            tb(i[qb])
        }
        i = c.prototype;
        i._firstPT = null;
        i._onInitTween = function(a, b, h) {
            if (!a.nodeType) {
                return false
            }
            this._target = a;
            this._tween = h;
            this._vars = b;
            I = b.autoRound;
            d = false;
            e = b.suffixMap || c.suffixMap;
            f = U(a, "");
            g = this._overwriteProps;
            var i = a.style, j, k, l, m, n, o, q, r, s;
            if (J)
                if (i.zIndex === "") {
                    j = V(a, "zIndex", f);
                    if (j === "auto" || j === "") {
                        i.zIndex = 0
                    }
                }
            if (typeof b === "string") {
                m = i.cssText;
                j = Y(a, f);
                i.cssText = m + ";" + b;
                j = Z(a, j, Y(a)).difs;
                if (!O && p.test(b)) {
                    j.opacity = parseFloat(RegExp.$1)
                }
                b = j;
                i.cssText = m
            }
            this._firstPT = k = this.parse(a, b, null);
            if (this._transformType) {
                s = this._transformType === 3;
                if (!vb) {
                    i.zoom = 1
                } else if (K) {
                    J = true;
                    if (i.zIndex === "") {
                        q = V(a, "zIndex", f);
                        if (q === "auto" || q === "") {
                            i.zIndex = 0
                        }
                    }
                    if (M) {
                        i.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (s ? "visible" : "hidden")
                    }
                }
                l = k;
                while (l && l._next) {
                    l = l._next
                }
                r = new ob(a, "transform", 0, 0, null, 2);
                this._linkCSSP(r, null, l);
                r.setRatio = s && yb ? Bb : vb ? Cb : Ab;
                r.data = this._transform || zb(a, f, true);
                g.pop()
            }
            if (d) {
                while (k) {
                    o = k._next;
                    l = m;
                    while (l && l.pr > k.pr) {
                        l = l._next
                    }
                    if (k._prev = l ? l._prev : n) {
                        k._prev._next = k
                    } else {
                        m = k
                    }
                    if (k._next = l) {
                        l._prev = k
                    } else {
                        n = k
                    }
                    k = o
                }
                this._firstPT = m
            }
            return true
        };
        i.parse = function(a, b, c, d) {
            var g = a.style, i, j, k, l, m, o, p, q, s, t;
            for (i in b) {
                o = b[i];
                j = h[i];
                if (j) {
                    c = j.parse(a, o, i, this, c, d, b)
                } else {
                    m = V(a, i, f) + "";
                    s = typeof o === "string";
                    if (i === "color" || i === "fill" || i === "stroke" || i.indexOf("Color") !== -1 || s && r.test(o)) {
                        if (!s) {
                            o = hb(o);
                            o = (o.length > 3 ? "rgba(" : "rgb(") + o.join(",") + ")"
                        }
                        c = pb(g, i, m, o, true, "transparent", c, 0, d)
                    } else if (s && (o.indexOf(" ") !== -1 || o.indexOf(",") !== -1)) {
                        c = pb(g, i, m, o, true, null, c, 0, d)
                    } else {
                        k = parseFloat(m);
                        p = k || k === 0 ? m.substr((k + "").length) : "";
                        if (m === "" || m === "auto") {
                            if (i === "width" || i === "height") {
                                k = ab(a, i, f);
                                p = "px"
                            } else if (i === "left" || i === "top") {
                                k = X(a, i, f);
                                p = "px"
                            } else {
                                k = i !== "opacity" ? 0 : 1;
                                p = ""
                            }
                        }
                        t = s && o.charAt(1) === "=";
                        if (t) {
                            l = parseInt(o.charAt(0) + "1", 10);
                            o = o.substr(2);
                            l *= parseFloat(o);
                            q = o.replace(n, "")
                        } else {
                            l = parseFloat(o);
                            q = s ? o.substr((l + "").length) || "" : ""
                        }
                        if (q === "") {
                            q = e[i] || p
                        }
                        o = l || l === 0 ? (t ? l + k : l) + q : b[i];
                        if (p !== q)
                            if (q !== "")
                                if (l || l === 0)
                                    if (k || k === 0) {
                                        k = W(a, i, k, p);
                                        if (q === "%") {
                                            k /= W(a, i, 100, "%") / 100;
                                            if (k > 100) {
                                                k = 100
                                            }
                                            if (b.strictUnits !== true) {
                                                m = k + "%"
                                            }
                                        } else if (q === "em") {
                                            k /= W(a, i, 1, "em")
                                        } else {
                                            l = W(a, i, l, q);
                                            q = "px"
                                        }
                                        if (t)
                                            if (l || l === 0) {
                                                o = l + k + q
                                            }
                                    }
                        if (t) {
                            l += k
                        }
                        if ((k || k === 0) && (l || l === 0)) {
                            c = new ob(g, i, k, l - k, c, 0, i, I !== false && (q === "px" || i === "zIndex"), 0, m, o);
                            c.xs0 = q
                        } else if (g[i] === undefined || !o && (o + "" === "NaN" || o == null)) {
                            Q("invalid " + i + " tween value: " + b[i])
                        } else {
                            c = new ob(g, i, l || k || 0, 0, c, -1, i, false, 0, m, o);
                            c.xs0 = o === "none" && (i === "display" || i.indexOf("Style") !== -1) ? m : o
                        }
                    }
                }
                if (d)
                    if (c && !c.plugin) {
                        c.plugin = d
                    }
            }
            return c
        };
        i.setRatio = function(a) {
            var b = this._firstPT, c = 1e-6, d, e, f;
            if (a === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (b) {
                    if (b.type !== 2) {
                        b.t[b.p] = b.e
                    } else {
                        b.setRatio(a)
                    }
                    b = b._next
                }
            } else if (a || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -1e-6) {
                while (b) {
                    d = b.c * a + b.s;
                    if (b.r) {
                        d = d > 0 ? d + .5 | 0 : d - .5 | 0
                    } else if (d < c)
                        if (d > -c) {
                            d = 0
                        }
                    if (!b.type) {
                        b.t[b.p] = d + b.xs0
                    } else if (b.type === 1) {
                        f = b.l;
                        if (f === 2) {
                            b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2
                        } else if (f === 3) {
                            b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3
                        } else if (f === 4) {
                            b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3 + b.xn3 + b.xs4
                        } else if (f === 5) {
                            b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3 + b.xn3 + b.xs4 + b.xn4 + b.xs5
                        } else {
                            e = b.xs0 + d + b.xs1;
                            for (f = 1; f < b.l; f++) {
                                e += b["xn" + f] + b["xs" + (f + 1)]
                            }
                            b.t[b.p] = e
                        }
                    } else if (b.type === -1) {
                        b.t[b.p] = b.xs0
                    } else if (b.setRatio) {
                        b.setRatio(a)
                    }
                    b = b._next
                }
            } else {
                while (b) {
                    if (b.type !== 2) {
                        b.t[b.p] = b.b
                    } else {
                        b.setRatio(a)
                    }
                    b = b._next
                }
            }
        };
        i._enableTransforms = function(a) {
            this._transformType = a || this._transformType === 3 ? 3 : 2;
            this._transform = this._transform || zb(this._target, f, true)
        };
        i._linkCSSP = function(a, b, c, d) {
            if (a) {
                if (b) {
                    b._prev = a
                }
                if (a._next) {
                    a._next._prev = a._prev
                }
                if (a._prev) {
                    a._prev._next = a._next
                } else if (this._firstPT === a) {
                    this._firstPT = a._next;
                    d = true
                }
                if (c) {
                    c._next = a
                } else if (!d && this._firstPT === null) {
                    this._firstPT = a
                }
                a._next = b;
                a._prev = c
            }
            return a
        };
        i._kill = function(b) {
            var c = b, d, e, f;
            if (b.autoAlpha || b.alpha) {
                c = {};
                for (e in b) {
                    c[e] = b[e]
                }
                c.opacity = 1;
                if (c.autoAlpha) {
                    c.visibility = 1
                }
            }
            if (b.className && (d = this._classNamePT)) {
                f = d.xfirst;
                if (f && f._prev) {
                    this._linkCSSP(f._prev, d._next, f._prev._prev)
                } else if (f === this._firstPT) {
                    this._firstPT = d._next
                }
                if (d._next) {
                    this._linkCSSP(d._next, d._next._next, f._prev)
                }
                this._classNamePT = null
            }
            return a.prototype._kill.call(this, c)
        };
        var Hb = function(a, b, c) {
            var d, e, f, g;
            if (a.slice) {
                e = a.length;
                while (--e > -1) {
                    Hb(a[e], b, c)
                }
                return
            }
            d = a.childNodes;
            e = d.length;
            while (--e > -1) {
                f = d[e];
                g = f.type;
                if (f.style) {
                    b.push(Y(f));
                    if (c) {
                        c.push(f)
                    }
                }
                if ((g === 1 || g === 9 || g === 11) && f.childNodes.length) {
                    Hb(f, b, c)
                }
            }
        };
        c.cascadeTo = function(a, c, d) {
            var e = b.to(a, c, d), f = [e], g = [], h = [], i = [], j = b._internals.reservedProps, k, l, m;
            a = e._targets || e.target;
            Hb(a, g, i);
            e.render(c, true);
            Hb(a, h);
            e.render(0, true);
            e._enabled(true);
            k = i.length;
            while (--k > -1) {
                l = Z(i[k], g[k], h[k]);
                if (l.firstMPT) {
                    l = l.difs;
                    for (m in d) {
                        if (j[m]) {
                            l[m] = d[m]
                        }
                    }
                    f.push(b.to(i[k], c, l))
                }
            }
            return f
        };
        a.activate([c]);
        return c
    }, true)
});
if (window._gsDefine) {
    window._gsQueue.pop()()
}
var baseten = baseten || {};
baseten.CSSTransition = function(a, b, c) {
    if (!a)
        return;
    this.target = a;
    this.$target;
    this.duration = b;
    this.vars = c;
    this.onComplete = c.onComplete || null;
    this.onCompleteParams = c.onCompleteParams || [];
    this.boundTransitionEnd = null;
    this.applyProps = typeof c.applyProps == "undefined" ? true : c.applyProps;
    this.isActive = true;
    this.endProps = [];
    this.overwrite = typeof c.overwrite == "undefined" ? "none" : c.overwrite;
    if (a instanceof jQuery) {
        this.$target = a;
        this.target = a[0]
    } else {
        this.$target = $(a);
        this.target = a
    }
    var d = c.ease ? c.ease : "cubic-bezier(0.8,0,0.2,1)";
    var e = c.delay || 0;
    var f = [];
    var g = {};
    var h;
    var i;
    var j;
    var k = this.$target.data("basetenCSSTransitionInstance") || false;
    baseten.CSSTransition.normalizeTransform(this.$target, c.css);
    if (k && k.isActive && k.applyProps !== false && this.applyProps !== false && k.duration > 0) {
        k.onTransitionEnd(false)
    }
    for (var l in c.css) {
        h = $.inArray(l, baseten.CSSTransition.vendorProps) > -1 ? Modernizr.prefixed(l) : l;
        h = h ? h : l;
        i = baseten.CSSTransition.camelCaseToHyphen(h);
        j = c.css[l];
        if (this.target.style[h] != String(j)) {
            g[h] = j;
            f.push(i);
            this.endProps.push(i)
        }
    }
    g[baseten.CSSTransition.transitionProperty] = this.applyProps ? f.join(",") : "all";
    g[baseten.CSSTransition.transitionDuration] = b + "s";
    g[baseten.CSSTransition.transitionTimingFunction] = d;
    g[baseten.CSSTransition.transitionDelay] = e + "s";
    if (this.duration > 0) {
        this.boundTransitionEnd = this.onPropertyTransitionEnd.bind(this);
        this.$target.bind(baseten.CSSTransition.transitionEnd + ".basetenCSSTransition", this.boundTransitionEnd);
        this.$target.data("basetenCSSTransitionInstance", this)
    }
    if (this.endProps.length) {
        this.$target.css(g)
    } else {
        this.onTransitionEnd(false)
    }
};
baseten.CSSTransition.prototype.onPropertyTransitionEnd = function(a) {
    var b = $.inArray(a.originalEvent.propertyName, this.endProps);
    if (b > -1) {
        a.stopPropagation();
        this.endProps.splice(b, 1);
        if (!this.endProps.length) {
            this.onTransitionEnd()
        }
    }
};
baseten.CSSTransition.prototype.onTransitionEnd = function(a, b) {
    var c, d;
    a = typeof a == "undefined" ? true : a;
    b = typeof b == "undefined" ? true : b;
    if (this.boundTransitionEnd) {
        this.$target.unbind(baseten.CSSTransition.transitionEnd + ".basetenCSSTransition", this.boundTransitionEnd);
        this.boundTransitionEnd = null
    }
    this.endProps = [];
    if (a) {
        c = {};
        c[baseten.CSSTransition.transitionDuration] = "0s";
        c[baseten.CSSTransition.transitionDelay] = "0s";
        this.$target.css(c)
    }
    this.$target.removeData("basetenCSSTransitionInstance");
    if ($.isFunction(this.onComplete)) {
        d = this.onComplete;
        this.onComplete = null;
        if (b) {
            d.apply(window, this.onCompleteParams)
        }
    }
};
baseten.CSSTransition.to = function(a, b, c) {
    return new baseten.CSSTransition(a, b, c)
};
baseten.CSSTransition.setCSS = function(a, b) {
    if (!a)
        return;
    var c = a instanceof jQuery ? a : $(a);
    var d;
    var e = {};
    baseten.CSSTransition.normalizeTransform(c, b);
    for (var f in b) {
        d = $.inArray(f, this.vendorProps) > -1 ? Modernizr.prefixed(f) : f;
        d = d ? d : f;
        e[d] = b[f]
    }
    c.css(e)
};
baseten.CSSTransition.camelCaseToHyphen = function(a) {
    return a.replace(/([A-Z])/g, function(a, b) {
        return "-" + b.toLowerCase()
    }).replace(/^ms-/, "-ms-")
};
baseten.CSSTransition.transitionEnd = {WebkitTransition: "webkitTransitionEnd",MozTransition: "transitionend",OTransition: "oTransitionEnd",msTransition: "MSTransitionEnd",transition: "transitionend"};
baseten.CSSTransition.vendorProps = ["transition", "transitionDuration", "transform", "transformOrigin", "perspective", "filter", "boxShadow"];
baseten.CSSTransition.normalizeTransform = function(a, b) {
    if (!b.hasOwnProperty("transform") || !(b["transform"] instanceof Object))
        return;
    if (Modernizr.csstransforms || Modernizr.csstransforms3d) {
        b["transform"] = baseten.CSSTransition.getTransform(b["transform"])
    } else if (b["transform"].hasOwnProperty("translate")) {
        b["left"] = b.transform.translate.x || 0;
        b["top"] = b.transform.translate.y || 0;
        delete b["transform"]
    }
};
baseten.CSSTransition.getTransform = function(a) {
    var b = [];
    var c, d, e, f, g, h, i, j;
    for (var k in a) {
        switch (k) {
            case "translate":
                c = a[k].x || 0;
                d = a[k].y || 0;
                e = a[k].z || 0;
                b.push(Modernizr.csstransforms3d ? "translate3d(" + c + "px, " + d + "px, " + e + "px)" : "translate(" + c + "px, " + d + "px)");
                break;
            case "rotate":
                f = a[k].x || 0;
                g = a[k].y || 0;
                h = a[k].z || 0;
                if (Modernizr.csstransforms3d) {
                    b.push("rotateX(" + f + "deg)");
                    b.push("rotateY(" + g + "deg)");
                    b.push("rotateZ(" + h + "deg)")
                } else {
                    b.push("rotate(" + h + "deg)")
                }
                break;
            case "scale":
                if (a[k] instanceof Object) {
                    i = a[k].x;
                    j = a[k].y;
                    b.push("scale(" + i + ", " + j + ")")
                } else {
                    b.push("scale(" + a[k] + ")")
                }
                break
        }
    }
    return b.join(" ")
};
baseten.CSSTransition.transitionEnd = baseten.CSSTransition.transitionEnd[Modernizr.prefixed("transition")];
baseten.CSSTransition.transitionDuration = Modernizr.prefixed("transitionDuration");
baseten.CSSTransition.transitionDelay = Modernizr.prefixed("transitionDelay");
baseten.CSSTransition.transitionProperty = Modernizr.prefixed("transitionProperty");
baseten.CSSTransition.transitionTimingFunction = Modernizr.prefixed("transitionTimingFunction");
var baseten = baseten || {};
baseten.EventDispatcher = Class.extend({init: function() {
        this.listeners = {}
    },hasEventListenerKey: function(a) {
        return this.listeners.hasOwnProperty(a)
    },removeEventListenerKey: function(a) {
        delete this.listeners[a]
    },getListenerNames: function() {
        var a = [];
        var b;
        for (b in this.listeners) {
            a.push(b)
        }
        return a
    },hasEventListener: function(a, b) {
        if (!this.hasEventListenerKey(a))
            return false;
        var c = false;
        var d = this.listeners[a];
        var e = d.length;
        var f;
        while (--e > -1) {
            f = d[e];
            if (b.object == f.object && b.callback == f.callback) {
                c = true;
                break
            }
        }
        return c
    },addEventListener: function(a, b, c) {
        var d = new baseten.EventListener(b, c);
        if (this.hasEventListener(a, d)) {
            return
        }
        if (!this.hasEventListenerKey(a)) {
            this.listeners[a] = []
        }
        this.listeners[a].push(d)
    },removeEventListener: function(a, b, c) {
        if (!this.hasEventListenerKey(a))
            return;
        var d = this.listeners[a];
        var e = d.length;
        var f;
        while (--e > -1) {
            f = d[e];
            if (f.scope == c && f.callback == b) {
                d.splice(e, 1);
                break
            }
        }
        if (d.length == 0) {
            this.removeEventListenerKey(a)
        }
    },removeEventListeners: function(a) {
        var b, c;
        a = typeof a == "undefined" ? false : a;
        if (a) {
            if (!this.hasEventListenerKey(a))
                return;
            this.removeEventListenerKey(a)
        } else {
            b = this.getListenerNames();
            c = b.length;
            while (--c > -1) {
                a = b[c];
                this.removeEventListenerKey(a)
            }
        }
    },forwardEvent: function(a) {
        if (!this.hasEventListenerKey(a.name))
            return;
        this._dispatchEvent(a)
    },dispatchEvent: function(a, b) {
        if (!this.hasEventListenerKey(a))
            return;
        var c = new baseten.Event(a, b);
        c.target = this;
        this._dispatchEvent(c)
    },_dispatchEvent: function(a) {
        var b = this.listeners[a.name];
        var c = b.length;
        var d;
        a.currentTarget = this;
        var e = [];
        while (--c > -1) {
            d = b[c];
            e.push(d)
        }
        c = e.length;
        while (--c > -1) {
            d = e[c];
            d.callback.call(d.scope, a)
        }
    },destroy: function() {
        this.removeEventListeners();
        this.listeners = null
    }});
baseten.Event = function(a, b) {
    this.name = a;
    this.data = b;
    this.target = null;
    this.currentTarget = null
};
baseten.EventListener = function(a, b) {
    this.callback = a;
    this.scope = b || window
};
var baseten = baseten || {};
String.prototype.trim = String.prototype.trim || function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
};
baseten.String = {ucfirst: function(a) {
        a += "";
        var b = a.charAt(0).toUpperCase();
        return b + a.substr(1)
    },ucwords: function(a) {
        return (a + "").replace(/^([a-z])|\s+([a-z])/g, function(a) {
            return a.toUpperCase()
        })
    },camelCase: function(a) {
        a = this.ucwords(a).replace(/\s/g, "");
        return a.substring(0, 1).toLowerCase() + a.slice(1)
    },unCamelCase: function(a) {
        return a.replace(/(.)([A-Z])/g, "$1 $2").replace(/^./, function(a) {
            return a.toUpperCase()
        })
    },seoToCamelCase: function(a) {
        return this.camelCase(this.unSeoText(a))
    },seoText: function(a) {
        a = a.toLowerCase(a.trim());
        a = a.replace(/\./g, "");
        a = a.replace(/[^a-z0-9-]/g, "-");
        return a.replace(/-+/g, "-")
    },unSeoText: function(a) {
        return a.replace(/-/g, " ")
    }};
var baseten = baseten || {};
baseten.TweenWrapper = {to: function(a, b, c) {
        var d = Modernizr.csstransitions ? baseten.TweenWrapper.useCssTransition : false;
        if (d) {
            if (!c.cssEase) {
                switch (c.ease) {
                    case Linear.easeNone:
                        c.ease = "linear";
                        break;
                    case Sine.easeIn:
                        c.ease = "ease-in";
                        break;
                    case Sine.easeOut:
                        c.ease = "ease-out";
                        break;
                    case Sine.easeInOut:
                        c.ease = "ease-in-out";
                        break;
                    case Power4.easeIn:
                        c.ease = "cubic-bezier(0.895, 0.030, 0.685, 0.220)";
                        break;
                    case Power4.easeOut:
                        c.ease = "cubic-bezier(0.165, 0.840, 0.440, 1.000)";
                        break;
                    case Power4.easeInOut:
                    default:
                        c.ease = "cubic-bezier(0.770, 0.000, 0.175, 1.000)";
                        break
                }
            } else {
                c.ease = c.cssEase
            }
            baseten.CSSTransition.to(a, b, c)
        } else {
            c.ease = c.ease || Power4.easeInOut;
            if (c.css.hasOwnProperty("transform")) {
                $.extend(c.css, baseten.TweenWrapper.getTransform(c.css.transform));
                delete c.css.transform
            }
            if (c.hasOwnProperty("applyProps")) {
                delete c.applyProps
            }
            TweenLite.to(a, b, c)
        }
    },setCSS: function(a, b) {
        var c = Modernizr.csstransitions ? baseten.TweenWrapper.useCssTransition : false;
        if (c) {
            baseten.CSSTransition.setCSS(a, b)
        } else {
            if (b.hasOwnProperty("transform")) {
                $.extend(b, baseten.TweenWrapper.getTransform(b.transform));
                delete b.transform
            }
            TweenLite.set(a, b)
        }
    }};
baseten.TweenWrapper.useCssTransition = true;
baseten.TweenWrapper.getTransform = function(a) {
    var b = {};
    var c, d, e, f, g, h;
    for (var i in a) {
        switch (i) {
            case "translate":
                c = a[i].x || 0;
                d = a[i].y || 0;
                e = a[i].z || 0;
                b.x = c + "px";
                b.y = d + "px";
                if (Modernizr.csstransforms3d) {
                    b.z = e + "px"
                }
                break;
            case "rotate":
                f = a[i].x || 0;
                g = a[i].y || 0;
                h = a[i].z || 0;
                if (Modernizr.csstransforms3d) {
                    b.rotationX = f + "deg";
                    b.rotationY = g + "deg";
                    b.rotationZ = h + "deg"
                } else {
                    b.rotation = h + "deg"
                }
                break;
            case "scale":
                if (a[i] instanceof Object) {
                    b.scaleX = a[i].x;
                    b.scaleY = a[i].y;
                    if (Modernizr.csstransforms3d) {
                        b.scaleZ = a[i].z || 1
                    }
                } else {
                    if (Modernizr.csstransforms3d) {
                        b.scaleX = b.scaleY = a[i];
                        b.scaleZ = 1
                    } else {
                        b.scale = a[i]
                    }
                }
                break
        }
    }
    return b
};
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        throw "UID cannot be instantiated"
    };
    a._nextID = 0;
    a.get = function() {
        return a._nextID++
    };
    createjs.UID = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.initialize()
    }, b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener;
        a.removeEventListener = b.removeEventListener;
        a.removeAllEventListeners = b.removeAllEventListeners;
        a.hasEventListener = b.hasEventListener;
        a.dispatchEvent = b.dispatchEvent
    };
    b._listeners = null;
    b.initialize = function() {
    };
    b.addEventListener = function(a, b) {
        var c = this._listeners;
        c ? this.removeEventListener(a, b) : c = this._listeners = {};
        var d = c[a];
        d || (d = c[a] = []);
        d.push(b);
        return b
    };
    b.removeEventListener = function(a, b) {
        var c = this._listeners;
        if (c) {
            var d = c[a];
            if (d)
                for (var e = 0, f = d.length; e < f; e++)
                    if (d[e] == b) {
                        1 == f ? delete c[a] : d.splice(e, 1);
                        break
                    }
        }
    };
    b.removeAllEventListeners = function(a) {
        a ? this._listeners && delete this._listeners[a] : this._listeners = null
    };
    b.dispatchEvent = function(a, b) {
        var c = !1, d = this._listeners;
        if (a && d) {
            "string" == typeof a && (a = {type: a});
            d = d[a.type];
            if (!d)
                return c;
            a.target = b || this;
            for (var d = d.slice(), e = 0, f = d.length; e < f; e++)
                var g = d[e], c = g.handleEvent ? c || g.handleEvent(a) : c || g(a)
        }
        return !!c
    };
    b.hasEventListener = function(a) {
        var b = this._listeners;
        return !(!b || !b[a])
    };
    b.toString = function() {
        return "[EventDispatcher]"
    };
    createjs.EventDispatcher = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        throw "Ticker cannot be instantiated."
    };
    a.useRAF = !1;
    a.addEventListener = null;
    a.removeEventListener = null;
    a.removeAllEventListeners = null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    createjs.EventDispatcher.initialize(a);
    a._listeners = null;
    a._pauseable = null;
    a._paused = !1;
    a._inited = !1;
    a._startTime = 0;
    a._pausedTime = 0;
    a._ticks = 0;
    a._pausedTicks = 0;
    a._interval = 50;
    a._lastTime = 0;
    a._times = null;
    a._tickTimes = null;
    a._rafActive = !1;
    a._timeoutID = null;
    a.addListener = function(b, c) {
        null != b && (a.removeListener(b), a._pauseable[a._listeners.length] = null == c ? !0 : c, a._listeners.push(b))
    };
    a.init = function() {
        a._inited = !0;
        a._times = [];
        a._tickTimes = [];
        a._pauseable = [];
        a._listeners = [];
        a._times.push(a._lastTime = a._startTime = a._getTime());
        a.setInterval(a._interval)
    };
    a.removeListener = function(b) {
        var c = a._listeners;
        c && (b = c.indexOf(b), -1 != b && (c.splice(b, 1), a._pauseable.splice(b, 1)))
    };
    a.removeAllListeners = function() {
        a._listeners = [];
        a._pauseable = []
    };
    a.setInterval = function(b) {
        a._interval = b;
        a._inited && a._setupTick()
    };
    a.getInterval = function() {
        return a._interval
    };
    a.setFPS = function(b) {
        a.setInterval(1e3 / b)
    };
    a.getFPS = function() {
        return 1e3 / a._interval
    };
    a.getMeasuredFPS = function(b) {
        if (2 > a._times.length)
            return -1;
        null == b && (b = a.getFPS() | 0);
        b = Math.min(a._times.length - 1, b);
        return 1e3 / ((a._times[0] - a._times[b]) / b)
    };
    a.setPaused = function(b) {
        a._paused = b
    };
    a.getPaused = function() {
        return a._paused
    };
    a.getTime = function(b) {
        return a._getTime() - a._startTime - (b ? a._pausedTime : 0)
    };
    a.getTicks = function(b) {
        return a._ticks - (b ? a._pausedTicks : 0)
    };
    a._handleAF = function() {
        a._rafActive = !1;
        a._setupTick();
        a._getTime() - a._lastTime >= .97 * (a._interval - 1) && a._tick()
    };
    a._handleTimeout = function() {
        a.timeoutID = null;
        a._setupTick();
        a._tick()
    };
    a._setupTick = function() {
        if (!(a._rafActive || null != a.timeoutID)) {
            if (a.useRAF) {
                var b = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (b) {
                    b(a._handleAF);
                    a._rafActive = !0;
                    return
                }
            }
            a.timeoutID = setTimeout(a._handleTimeout, a._interval)
        }
    };
    a._tick = function() {
        var b = a._getTime();
        a._ticks++;
        var c = b - a._lastTime, d = a._paused;
        d && (a._pausedTicks++, a._pausedTime += c);
        a._lastTime = b;
        for (var e = a._pauseable, f = a._listeners.slice(), g = f ? f.length : 0, h = 0; h < g; h++) {
            var i = f[h];
            null == i || d && e[h] || (i.tick ? i.tick(c, d) : i instanceof Function && i(c, d))
        }
        a.dispatchEvent({type: "tick",paused: d,delta: c,time: b,runTime: b - a._pausedTime});
        for (a._tickTimes.unshift(a._getTime() - b); 100 < a._tickTimes.length; )
            a._tickTimes.pop();
        for (a._times.unshift(b); 100 < a._times.length; )
            a._times.pop()
    };
    var b = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
    a._getTime = function() {
        return b && b.call(performance) || (new Date).getTime()
    };
    a.init();
    createjs.Ticker = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b, c, d, e, f, g, h, i) {
        this.initialize(a, b, c, d, e, f, g, h, i)
    }, b = a.prototype;
    b.stageX = 0;
    b.stageY = 0;
    b.rawX = 0;
    b.rawY = 0;
    b.type = null;
    b.nativeEvent = null;
    b.onMouseMove = null;
    b.onMouseUp = null;
    b.target = null;
    b.pointerID = 0;
    b.primary = !1;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    b._listeners = null;
    createjs.EventDispatcher.initialize(b);
    b.initialize = function(a, b, c, d, e, f, g, h, i) {
        this.type = a;
        this.stageX = b;
        this.stageY = c;
        this.target = d;
        this.nativeEvent = e;
        this.pointerID = f;
        this.primary = g;
        this.rawX = null == h ? b : h;
        this.rawY = null == i ? c : i
    };
    b.clone = function() {
        return new a(this.type, this.stageX, this.stageY, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
    };
    b.toString = function() {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
    };
    createjs.MouseEvent = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b, c, d, e, f) {
        this.initialize(a, b, c, d, e, f)
    }, b = a.prototype;
    a.identity = null;
    a.DEG_TO_RAD = Math.PI / 180;
    b.a = 1;
    b.b = 0;
    b.c = 0;
    b.d = 1;
    b.tx = 0;
    b.ty = 0;
    b.alpha = 1;
    b.shadow = null;
    b.compositeOperation = null;
    b.initialize = function(a, b, c, d, e, f) {
        null != a && (this.a = a);
        this.b = b || 0;
        this.c = c || 0;
        null != d && (this.d = d);
        this.tx = e || 0;
        this.ty = f || 0;
        return this
    };
    b.prepend = function(a, b, c, d, e, f) {
        var g = this.tx;
        if (1 != a || 0 != b || 0 != c || 1 != d) {
            var h = this.a, i = this.c;
            this.a = h * a + this.b * c;
            this.b = h * b + this.b * d;
            this.c = i * a + this.d * c;
            this.d = i * b + this.d * d
        }
        this.tx = g * a + this.ty * c + e;
        this.ty = g * b + this.ty * d + f;
        return this
    };
    b.append = function(a, b, c, d, e, f) {
        var g = this.a, h = this.b, i = this.c, j = this.d;
        this.a = a * g + b * i;
        this.b = a * h + b * j;
        this.c = c * g + d * i;
        this.d = c * h + d * j;
        this.tx = e * g + f * i + this.tx;
        this.ty = e * h + f * j + this.ty;
        return this
    };
    b.prependMatrix = function(a) {
        this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
        this.prependProperties(a.alpha, a.shadow, a.compositeOperation);
        return this
    };
    b.appendMatrix = function(a) {
        this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
        this.appendProperties(a.alpha, a.shadow, a.compositeOperation);
        return this
    };
    b.prependTransform = function(b, c, d, e, f, g, h, i, j) {
        if (f % 360) {
            var k = f * a.DEG_TO_RAD;
            f = Math.cos(k);
            k = Math.sin(k)
        } else
            f = 1, k = 0;
        if (i || j)
            this.tx -= i, this.ty -= j;
        g || h ? (g *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.prepend(f * d, k * d, -k * e, f * e, 0, 0), this.prepend(Math.cos(h), Math.sin(h), -Math.sin(g), Math.cos(g), b, c)) : this.prepend(f * d, k * d, -k * e, f * e, b, c);
        return this
    };
    b.appendTransform = function(b, c, d, e, f, g, h, i, j) {
        if (f % 360) {
            var k = f * a.DEG_TO_RAD;
            f = Math.cos(k);
            k = Math.sin(k)
        } else
            f = 1, k = 0;
        g || h ? (g *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.append(Math.cos(h), Math.sin(h), -Math.sin(g), Math.cos(g), b, c), this.append(f * d, k * d, -k * e, f * e, 0, 0)) : this.append(f * d, k * d, -k * e, f * e, b, c);
        if (i || j)
            this.tx -= i * this.a + j * this.c, this.ty -= i * this.b + j * this.d;
        return this
    };
    b.rotate = function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        var c = this.a, d = this.c, e = this.tx;
        this.a = c * b - this.b * a;
        this.b = c * a + this.b * b;
        this.c = d * b - this.d * a;
        this.d = d * a + this.d * b;
        this.tx = e * b - this.ty * a;
        this.ty = e * a + this.ty * b;
        return this
    };
    b.skew = function(b, c) {
        b *= a.DEG_TO_RAD;
        c *= a.DEG_TO_RAD;
        this.append(Math.cos(c), Math.sin(c), -Math.sin(b), Math.cos(b), 0, 0);
        return this
    };
    b.scale = function(a, b) {
        this.a *= a;
        this.d *= b;
        this.c *= a;
        this.b *= b;
        this.tx *= a;
        this.ty *= b;
        return this
    };
    b.translate = function(a, b) {
        this.tx += a;
        this.ty += b;
        return this
    };
    b.identity = function() {
        this.alpha = this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        this.shadow = this.compositeOperation = null;
        return this
    };
    b.invert = function() {
        var a = this.a, b = this.b, c = this.c, d = this.d, e = this.tx, f = a * d - b * c;
        this.a = d / f;
        this.b = -b / f;
        this.c = -c / f;
        this.d = a / f;
        this.tx = (c * this.ty - d * e) / f;
        this.ty = -(a * this.ty - b * e) / f;
        return this
    };
    b.isIdentity = function() {
        return 0 == this.tx && 0 == this.ty && 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d
    };
    b.decompose = function(b) {
        null == b && (b = {});
        b.x = this.tx;
        b.y = this.ty;
        b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
        b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var c = Math.atan2(-this.c, this.d), d = Math.atan2(this.b, this.a);
        c == d ? (b.rotation = d / a.DEG_TO_RAD, 0 > this.a && 0 <= this.d && (b.rotation += 0 >= b.rotation ? 180 : -180), b.skewX = b.skewY = 0) : (b.skewX = c / a.DEG_TO_RAD, b.skewY = d / a.DEG_TO_RAD);
        return b
    };
    b.reinitialize = function(a, b, c, d, e, f, g, h, i) {
        this.initialize(a, b, c, d, e, f);
        this.alpha = g || 1;
        this.shadow = h;
        this.compositeOperation = i;
        return this
    };
    b.appendProperties = function(a, b, c) {
        this.alpha *= a;
        this.shadow = b || this.shadow;
        this.compositeOperation = c || this.compositeOperation;
        return this
    };
    b.prependProperties = function(a, b, c) {
        this.alpha *= a;
        this.shadow = this.shadow || b;
        this.compositeOperation = this.compositeOperation || c;
        return this
    };
    b.clone = function() {
        var b = new a(this.a, this.b, this.c, this.d, this.tx, this.ty);
        b.shadow = this.shadow;
        b.alpha = this.alpha;
        b.compositeOperation = this.compositeOperation;
        return b
    };
    b.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    };
    a.identity = new a(1, 0, 0, 1, 0, 0);
    createjs.Matrix2D = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b) {
        this.initialize(a, b)
    }, b = a.prototype;
    b.x = 0;
    b.y = 0;
    b.initialize = function(a, b) {
        this.x = null == a ? 0 : a;
        this.y = null == b ? 0 : b
    };
    b.clone = function() {
        return new a(this.x, this.y)
    };
    b.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    };
    createjs.Point = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b, c, d) {
        this.initialize(a, b, c, d)
    }, b = a.prototype;
    b.x = 0;
    b.y = 0;
    b.width = 0;
    b.height = 0;
    b.initialize = function(a, b, c, d) {
        this.x = null == a ? 0 : a;
        this.y = null == b ? 0 : b;
        this.width = null == c ? 0 : c;
        this.height = null == d ? 0 : d
    };
    b.clone = function() {
        return new a(this.x, this.y, this.width, this.height)
    };
    b.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    };
    createjs.Rectangle = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b, c, d, e, f, g) {
        this.initialize(a, b, c, d, e, f, g)
    }, b = a.prototype;
    b.target = null;
    b.overLabel = null;
    b.outLabel = null;
    b.downLabel = null;
    b.play = !1;
    b._isPressed = !1;
    b._isOver = !1;
    b.initialize = function(a, b, c, d, e, f, g) {
        a.addEventListener && (this.target = a, a.cursor = "pointer", this.overLabel = null == c ? "over" : c, this.outLabel = null == b ? "out" : b, this.downLabel = null == d ? "down" : d, this.play = e, this.setEnabled(!0), this.handleEvent({}), f && (g && (f.actionsEnabled = !1, f.gotoAndStop && f.gotoAndStop(g)), a.hitArea = f))
    };
    b.setEnabled = function(a) {
        var b = this.target;
        a ? (b.addEventListener("mouseover", this), b.addEventListener("mouseout", this), b.addEventListener("mousedown", this)) : (b.removeEventListener("mouseover", this), b.removeEventListener("mouseout", this), b.removeEventListener("mousedown", this))
    };
    b.toString = function() {
        return "[ButtonHelper]"
    };
    b.handleEvent = function(a) {
        var b = this.target, c = a.type;
        "mousedown" == c ? (a.addEventListener("mouseup", this), this._isPressed = !0, a = this.downLabel) : "mouseup" == c ? (this._isPressed = !1, a = this._isOver ? this.overLabel : this.outLabel) : "mouseover" == c ? (this._isOver = !0, a = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, a = this._isPressed ? this.overLabel : this.outLabel);
        this.play ? b.gotoAndPlay && b.gotoAndPlay(a) : b.gotoAndStop && b.gotoAndStop(a)
    };
    createjs.ButtonHelper = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b, c, d) {
        this.initialize(a, b, c, d)
    }, b = a.prototype;
    a.identity = null;
    b.color = null;
    b.offsetX = 0;
    b.offsetY = 0;
    b.blur = 0;
    b.initialize = function(a, b, c, d) {
        this.color = a;
        this.offsetX = b;
        this.offsetY = c;
        this.blur = d
    };
    b.toString = function() {
        return "[Shadow]"
    };
    b.clone = function() {
        return new a(this.color, this.offsetX, this.offsetY, this.blur)
    };
    a.identity = new a("transparent", 0, 0, 0);
    createjs.Shadow = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype;
    b.complete = !0;
    b.onComplete = null;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    b._listeners = null;
    createjs.EventDispatcher.initialize(b);
    b._animations = null;
    b._frames = null;
    b._images = null;
    b._data = null;
    b._loadCount = 0;
    b._frameHeight = 0;
    b._frameWidth = 0;
    b._numFrames = 0;
    b._regX = 0;
    b._regY = 0;
    b.initialize = function(a) {
        var b, c, d;
        if (null != a) {
            if (a.images && 0 < (c = a.images.length)) {
                d = this._images = [];
                for (b = 0; b < c; b++) {
                    var e = a.images[b];
                    if ("string" == typeof e) {
                        var f = e, e = new Image;
                        e.src = f
                    }
                    d.push(e);
                    !e.getContext && !e.complete && (this._loadCount++, this.complete = !1, function(a) {
                        e.onload = function() {
                            a._handleImageLoad()
                        }
                    }(this))
                }
            }
            if (null != a.frames)
                if (a.frames instanceof Array) {
                    this._frames = [];
                    d = a.frames;
                    b = 0;
                    for (c = d.length; b < c; b++)
                        f = d[b], this._frames.push({image: this._images[f[4] ? f[4] : 0],rect: new createjs.Rectangle(f[0], f[1], f[2], f[3]),regX: f[5] || 0,regY: f[6] || 0})
                } else
                    c = a.frames, this._frameWidth = c.width, this._frameHeight = c.height, this._regX = c.regX || 0, this._regY = c.regY || 0, this._numFrames = c.count, 0 == this._loadCount && this._calculateFrames();
            if (null != (c = a.animations)) {
                this._animations = [];
                this._data = {};
                for (var g in c) {
                    a = {name: g};
                    f = c[g];
                    if ("number" == typeof f)
                        d = a.frames = [f];
                    else if (f instanceof Array)
                        if (1 == f.length)
                            a.frames = [f[0]];
                        else {
                            a.frequency = f[3];
                            a.next = f[2];
                            d = a.frames = [];
                            for (b = f[0]; b <= f[1]; b++)
                                d.push(b)
                        }
                    else
                        a.frequency = f.frequency, a.next = f.next, b = f.frames, d = a.frames = "number" == typeof b ? [b] : b.slice(0);
                    a.next = 2 > d.length || !1 == a.next ? null : null == a.next || !0 == a.next ? g : a.next;
                    a.frequency || (a.frequency = 1);
                    this._animations.push(g);
                    this._data[g] = a
                }
            }
        }
    };
    b.getNumFrames = function(a) {
        if (null == a)
            return this._frames ? this._frames.length : this._numFrames;
        a = this._data[a];
        return null == a ? 0 : a.frames.length
    };
    b.getAnimations = function() {
        return this._animations.slice(0)
    };
    b.getAnimation = function(a) {
        return this._data[a]
    };
    b.getFrame = function(a) {
        var b;
        return this.complete && this._frames && (b = this._frames[a]) ? b : null
    };
    b.getFrameBounds = function(a) {
        return (a = this.getFrame(a)) ? new createjs.Rectangle(-a.regX, -a.regY, a.rect.width, a.rect.height) : null
    };
    b.toString = function() {
        return "[SpriteSheet]"
    };
    b.clone = function() {
        var b = new a;
        b.complete = this.complete;
        b._animations = this._animations;
        b._frames = this._frames;
        b._images = this._images;
        b._data = this._data;
        b._frameHeight = this._frameHeight;
        b._frameWidth = this._frameWidth;
        b._numFrames = this._numFrames;
        b._loadCount = this._loadCount;
        return b
    };
    b._handleImageLoad = function() {
        0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.onComplete && this.onComplete(), this.dispatchEvent("complete"))
    };
    b._calculateFrames = function() {
        if (!(this._frames || 0 == this._frameWidth)) {
            this._frames = [];
            for (var a = 0, b = this._frameWidth, c = this._frameHeight, d = 0, e = this._images; d < e.length; d++) {
                for (var f = e[d], g = (f.width + 1) / b | 0, h = (f.height + 1) / c | 0, h = 0 < this._numFrames ? Math.min(this._numFrames - a, g * h) : g * h, i = 0; i < h; i++)
                    this._frames.push({image: f,rect: new createjs.Rectangle(i % g * b, (i / g | 0) * c, b, c),regX: this._regX,regY: this._regY});
                a += h
            }
            this._numFrames = a
        }
    };
    createjs.SpriteSheet = a
})();
this.createjs = this.createjs || {};
(function() {
    function a(a, b, c) {
        this.f = a;
        this.params = b;
        this.path = null == c ? !0 : c
    }
    a.prototype.exec = function(a) {
        this.f.apply(a, this.params)
    };
    var b = function() {
        this.initialize()
    }, c = b.prototype;
    b.getRGB = function(a, b, c, d) {
        null != a && null == c && (d = b, c = a & 255, b = a >> 8 & 255, a = a >> 16 & 255);
        return null == d ? "rgb(" + a + "," + b + "," + c + ")" : "rgba(" + a + "," + b + "," + c + "," + d + ")"
    };
    b.getHSL = function(a, b, c, d) {
        return null == d ? "hsl(" + a % 360 + "," + b + "%," + c + "%)" : "hsla(" + a % 360 + "," + b + "%," + c + "%," + d + ")"
    };
    b.BASE_64 = {A: 0,B: 1,C: 2,D: 3,E: 4,F: 5,G: 6,H: 7,I: 8,J: 9,K: 10,L: 11,M: 12,N: 13,O: 14,P: 15,Q: 16,R: 17,S: 18,T: 19,U: 20,V: 21,W: 22,X: 23,Y: 24,Z: 25,a: 26,b: 27,c: 28,d: 29,e: 30,f: 31,g: 32,h: 33,i: 34,j: 35,k: 36,l: 37,m: 38,n: 39,o: 40,p: 41,q: 42,r: 43,s: 44,t: 45,u: 46,v: 47,w: 48,x: 49,y: 50,z: 51,0: 52,1: 53,2: 54,3: 55,4: 56,5: 57,6: 58,7: 59,8: 60,9: 61,"+": 62,"/": 63};
    b.STROKE_CAPS_MAP = ["butt", "round", "square"];
    b.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
    b._ctx = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).getContext("2d");
    b.beginCmd = new a(b._ctx.beginPath, [], !1);
    b.fillCmd = new a(b._ctx.fill, [], !1);
    b.strokeCmd = new a(b._ctx.stroke, [], !1);
    c._strokeInstructions = null;
    c._strokeStyleInstructions = null;
    c._ignoreScaleStroke = !1;
    c._fillInstructions = null;
    c._instructions = null;
    c._oldInstructions = null;
    c._activeInstructions = null;
    c._active = !1;
    c._dirty = !1;
    c.initialize = function() {
        this.clear();
        this._ctx = b._ctx
    };
    c.isEmpty = function() {
        return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length)
    };
    c.draw = function(a) {
        this._dirty && this._updateInstructions();
        for (var b = this._instructions, c = 0, d = b.length; c < d; c++)
            b[c].exec(a)
    };
    c.drawAsPath = function(a) {
        this._dirty && this._updateInstructions();
        for (var b, c = this._instructions, d = 0, e = c.length; d < e; d++)
            ((b = c[d]).path || 0 == d) && b.exec(a)
    };
    c.moveTo = function(b, c) {
        this._activeInstructions.push(new a(this._ctx.moveTo, [b, c]));
        return this
    };
    c.lineTo = function(b, c) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new a(this._ctx.lineTo, [b, c]));
        return this
    };
    c.arcTo = function(b, c, d, e, f) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new a(this._ctx.arcTo, [b, c, d, e, f]));
        return this
    };
    c.arc = function(b, c, d, e, f, g) {
        this._dirty = this._active = !0;
        null == g && (g = !1);
        this._activeInstructions.push(new a(this._ctx.arc, [b, c, d, e, f, g]));
        return this
    };
    c.quadraticCurveTo = function(b, c, d, e) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new a(this._ctx.quadraticCurveTo, [b, c, d, e]));
        return this
    };
    c.bezierCurveTo = function(b, c, d, e, f, g) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new a(this._ctx.bezierCurveTo, [b, c, d, e, f, g]));
        return this
    };
    c.rect = function(b, c, d, e) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new a(this._ctx.rect, [b, c, d, e]));
        return this
    };
    c.closePath = function() {
        this._active && (this._dirty = !0, this._activeInstructions.push(new a(this._ctx.closePath, [])));
        return this
    };
    c.clear = function() {
        this._instructions = [];
        this._oldInstructions = [];
        this._activeInstructions = [];
        this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null;
        this._active = this._dirty = !1;
        return this
    };
    c.beginFill = function(c) {
        this._active && this._newPath();
        this._fillInstructions = c ? [new a(this._setProp, ["fillStyle", c], !1), b.fillCmd] : null;
        return this
    };
    c.beginLinearGradientFill = function(c, d, e, f, g, h) {
        this._active && this._newPath();
        e = this._ctx.createLinearGradient(e, f, g, h);
        f = 0;
        for (g = c.length; f < g; f++)
            e.addColorStop(d[f], c[f]);
        this._fillInstructions = [new a(this._setProp, ["fillStyle", e], !1), b.fillCmd];
        return this
    };
    c.beginRadialGradientFill = function(c, d, e, f, g, h, i, j) {
        this._active && this._newPath();
        e = this._ctx.createRadialGradient(e, f, g, h, i, j);
        f = 0;
        for (g = c.length; f < g; f++)
            e.addColorStop(d[f], c[f]);
        this._fillInstructions = [new a(this._setProp, ["fillStyle", e], !1), b.fillCmd];
        return this
    };
    c.beginBitmapFill = function(c, d, e) {
        this._active && this._newPath();
        c = this._ctx.createPattern(c, d || "");
        c = new a(this._setProp, ["fillStyle", c], !1);
        this._fillInstructions = e ? [c, new a(this._ctx.save, [], !1), new a(this._ctx.transform, [e.a, e.b, e.c, e.d, e.tx, e.ty], !1), b.fillCmd, new a(this._ctx.restore, [], !1)] : [c, b.fillCmd];
        return this
    };
    c.endFill = function() {
        return this.beginFill()
    };
    c.setStrokeStyle = function(c, d, e, f, g) {
        this._active && this._newPath();
        this._strokeStyleInstructions = [new a(this._setProp, ["lineWidth", null == c ? "1" : c], !1), new a(this._setProp, ["lineCap", null == d ? "butt" : isNaN(d) ? d : b.STROKE_CAPS_MAP[d]], !1), new a(this._setProp, ["lineJoin", null == e ? "miter" : isNaN(e) ? e : b.STROKE_JOINTS_MAP[e]], !1), new a(this._setProp, ["miterLimit", null == f ? "10" : f], !1)];
        this._ignoreScaleStroke = g;
        return this
    };
    c.beginStroke = function(b) {
        this._active && this._newPath();
        this._strokeInstructions = b ? [new a(this._setProp, ["strokeStyle", b], !1)] : null;
        return this
    };
    c.beginLinearGradientStroke = function(b, c, d, e, f, g) {
        this._active && this._newPath();
        d = this._ctx.createLinearGradient(d, e, f, g);
        e = 0;
        for (f = b.length; e < f; e++)
            d.addColorStop(c[e], b[e]);
        this._strokeInstructions = [new a(this._setProp, ["strokeStyle", d], !1)];
        return this
    };
    c.beginRadialGradientStroke = function(b, c, d, e, f, g, h, i) {
        this._active && this._newPath();
        d = this._ctx.createRadialGradient(d, e, f, g, h, i);
        e = 0;
        for (f = b.length; e < f; e++)
            d.addColorStop(c[e], b[e]);
        this._strokeInstructions = [new a(this._setProp, ["strokeStyle", d], !1)];
        return this
    };
    c.beginBitmapStroke = function(b, c) {
        this._active && this._newPath();
        var d = this._ctx.createPattern(b, c || "");
        this._strokeInstructions = [new a(this._setProp, ["strokeStyle", d], !1)];
        return this
    };
    c.endStroke = function() {
        this.beginStroke();
        return this
    };
    c.curveTo = c.quadraticCurveTo;
    c.drawRect = c.rect;
    c.drawRoundRect = function(a, b, c, d, e) {
        this.drawRoundRectComplex(a, b, c, d, e, e, e, e);
        return this
    };
    c.drawRoundRectComplex = function(b, c, d, e, f, g, h, i) {
        var j = (d < e ? d : e) / 2, k = 0, l = 0, m = 0, n = 0;
        0 > f && (f *= k = -1);
        f > j && (f = j);
        0 > g && (g *= l = -1);
        g > j && (g = j);
        0 > h && (h *= m = -1);
        h > j && (h = j);
        0 > i && (i *= n = -1);
        i > j && (i = j);
        this._dirty = this._active = !0;
        var j = this._ctx.arcTo, o = this._ctx.lineTo;
        this._activeInstructions.push(new a(this._ctx.moveTo, [b + d - g, c]), new a(j, [b + d + g * l, c - g * l, b + d, c + g, g]), new a(o, [b + d, c + e - h]), new a(j, [b + d + h * m, c + e + h * m, b + d - h, c + e, h]), new a(o, [b + i, c + e]), new a(j, [b - i * n, c + e + i * n, b, c + e - i, i]), new a(o, [b, c + f]), new a(j, [b - f * k, c - f * k, b + f, c, f]), new a(this._ctx.closePath));
        return this
    };
    c.drawCircle = function(a, b, c) {
        this.arc(a, b, c, 0, 2 * Math.PI);
        return this
    };
    c.drawEllipse = function(b, c, d, e) {
        this._dirty = this._active = !0;
        var f = .5522848 * (d / 2), g = .5522848 * (e / 2), h = b + d, i = c + e;
        d = b + d / 2;
        e = c + e / 2;
        this._activeInstructions.push(new a(this._ctx.moveTo, [b, e]), new a(this._ctx.bezierCurveTo, [b, e - g, d - f, c, d, c]), new a(this._ctx.bezierCurveTo, [d + f, c, h, e - g, h, e]), new a(this._ctx.bezierCurveTo, [h, e + g, d + f, i, d, i]), new a(this._ctx.bezierCurveTo, [d - f, i, b, e + g, b, e]));
        return this
    };
    c.drawPolyStar = function(b, c, d, e, f, g) {
        this._dirty = this._active = !0;
        null == f && (f = 0);
        f = 1 - f;
        g = null == g ? 0 : g / (180 / Math.PI);
        var h = Math.PI / e;
        this._activeInstructions.push(new a(this._ctx.moveTo, [b + Math.cos(g) * d, c + Math.sin(g) * d]));
        for (var i = 0; i < e; i++)
            g += h, 1 != f && this._activeInstructions.push(new a(this._ctx.lineTo, [b + Math.cos(g) * d * f, c + Math.sin(g) * d * f])), g += h, this._activeInstructions.push(new a(this._ctx.lineTo, [b + Math.cos(g) * d, c + Math.sin(g) * d]));
        return this
    };
    c.decodePath = function(a) {
        for (var c = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], d = [2, 2, 4, 6, 0], e = 0, f = a.length, g = [], h = 0, i = 0, j = b.BASE_64; e < f; ) {
            var k = a.charAt(e), l = j[k], m = l >> 3, n = c[m];
            if (!n || l & 3)
                throw "bad path data (@" + e + "): " + k;
            k = d[m];
            m || (h = i = 0);
            g.length = 0;
            e++;
            l = (l >> 2 & 1) + 2;
            for (m = 0; m < k; m++) {
                var o = j[a.charAt(e)], p = o >> 5 ? -1 : 1, o = (o & 31) << 6 | j[a.charAt(e + 1)];
                3 == l && (o = o << 6 | j[a.charAt(e + 2)]);
                o = p * o / 10;
                m % 2 ? h = o += h : i = o += i;
                g[m] = o;
                e += l
            }
            n.apply(this, g)
        }
        return this
    };
    c.clone = function() {
        var a = new b;
        a._instructions = this._instructions.slice();
        a._activeInstructions = this._activeInstructions.slice();
        a._oldInstructions = this._oldInstructions.slice();
        this._fillInstructions && (a._fillInstructions = this._fillInstructions.slice());
        this._strokeInstructions && (a._strokeInstructions = this._strokeInstructions.slice());
        this._strokeStyleInstructions && (a._strokeStyleInstructions = this._strokeStyleInstructions.slice());
        a._active = this._active;
        a._dirty = this._dirty;
        return a
    };
    c.toString = function() {
        return "[Graphics]"
    };
    c.mt = c.moveTo;
    c.lt = c.lineTo;
    c.at = c.arcTo;
    c.bt = c.bezierCurveTo;
    c.qt = c.quadraticCurveTo;
    c.a = c.arc;
    c.r = c.rect;
    c.cp = c.closePath;
    c.c = c.clear;
    c.f = c.beginFill;
    c.lf = c.beginLinearGradientFill;
    c.rf = c.beginRadialGradientFill;
    c.bf = c.beginBitmapFill;
    c.ef = c.endFill;
    c.ss = c.setStrokeStyle;
    c.s = c.beginStroke;
    c.ls = c.beginLinearGradientStroke;
    c.rs = c.beginRadialGradientStroke;
    c.bs = c.beginBitmapStroke;
    c.es = c.endStroke;
    c.dr = c.drawRect;
    c.rr = c.drawRoundRect;
    c.rc = c.drawRoundRectComplex;
    c.dc = c.drawCircle;
    c.de = c.drawEllipse;
    c.dp = c.drawPolyStar;
    c.p = c.decodePath;
    c._updateInstructions = function() {
        this._instructions = this._oldInstructions.slice();
        this._instructions.push(b.beginCmd);
        this._instructions.push.apply(this._instructions, this._activeInstructions);
        this._fillInstructions && this._instructions.push.apply(this._instructions, this._fillInstructions);
        this._strokeInstructions && (this._strokeStyleInstructions && this._instructions.push.apply(this._instructions, this._strokeStyleInstructions), this._instructions.push.apply(this._instructions, this._strokeInstructions), this._ignoreScaleStroke ? this._instructions.push(new a(this._ctx.save, [], !1), new a(this._ctx.setTransform, [1, 0, 0, 1, 0, 0], !1), b.strokeCmd, new a(this._ctx.restore, [], !1)) : this._instructions.push(b.strokeCmd))
    };
    c._newPath = function() {
        this._dirty && this._updateInstructions();
        this._oldInstructions = this._instructions;
        this._activeInstructions = [];
        this._active = this._dirty = !1
    };
    c._setProp = function(a, b) {
        this[a] = b
    };
    createjs.Graphics = b
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.initialize()
    }, b = a.prototype;
    a.suppressCrossDomainErrors = !1;
    a._hitTestCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    a._hitTestCanvas.width = a._hitTestCanvas.height = 1;
    a._hitTestContext = a._hitTestCanvas.getContext("2d");
    a._nextCacheID = 1;
    b.alpha = 1;
    b.cacheCanvas = null;
    b.id = -1;
    b.mouseEnabled = !0;
    b.name = null;
    b.parent = null;
    b.regX = 0;
    b.regY = 0;
    b.rotation = 0;
    b.scaleX = 1;
    b.scaleY = 1;
    b.skewX = 0;
    b.skewY = 0;
    b.shadow = null;
    b.visible = !0;
    b.x = 0;
    b.y = 0;
    b.compositeOperation = null;
    b.snapToPixel = !1;
    b.onPress = null;
    b.onClick = null;
    b.onDoubleClick = null;
    b.onMouseOver = null;
    b.onMouseOut = null;
    b.onTick = null;
    b.filters = null;
    b.cacheID = 0;
    b.mask = null;
    b.hitArea = null;
    b.cursor = null;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    b._listeners = null;
    createjs.EventDispatcher.initialize(b);
    b._cacheOffsetX = 0;
    b._cacheOffsetY = 0;
    b._cacheScale = 1;
    b._cacheDataURLID = 0;
    b._cacheDataURL = null;
    b._matrix = null;
    b.initialize = function() {
        this.id = createjs.UID.get();
        this._matrix = new createjs.Matrix2D
    };
    b.isVisible = function() {
        return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY))
    };
    b.draw = function(a, b) {
        var c = this.cacheCanvas;
        if (b || !c)
            return !1;
        var d = this._cacheScale;
        a.drawImage(c, this._cacheOffsetX, this._cacheOffsetY, c.width / d, c.height / d);
        return !0
    };
    b.updateContext = function(a) {
        var b, c = this.mask;
        c && c.graphics && !c.graphics.isEmpty() && (b = c.getMatrix(c._matrix), a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty), c.graphics.drawAsPath(a), a.clip(), b.invert(), a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty));
        b = this._matrix.identity().appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
        createjs.Stage._snapToPixelEnabled && this.snapToPixel ? a.transform(b.a, b.b, b.c, b.d, b.tx + .5 | 0, b.ty + .5 | 0) : a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty);
        a.globalAlpha *= this.alpha;
        this.compositeOperation && (a.globalCompositeOperation = this.compositeOperation);
        this.shadow && this._applyShadow(a, this.shadow)
    };
    b.cache = function(a, b, c, d, e) {
        e = e || 1;
        this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
        this.cacheCanvas.width = Math.ceil(c * e);
        this.cacheCanvas.height = Math.ceil(d * e);
        this._cacheOffsetX = a;
        this._cacheOffsetY = b;
        this._cacheScale = e || 1;
        this.updateCache()
    };
    b.updateCache = function(b) {
        var c = this.cacheCanvas, d = this._cacheScale, e = this._cacheOffsetX * d, f = this._cacheOffsetY * d;
        if (!c)
            throw "cache() must be called before updateCache()";
        var g = c.getContext("2d");
        g.save();
        b || g.clearRect(0, 0, c.width + 1, c.height + 1);
        g.globalCompositeOperation = b;
        g.setTransform(d, 0, 0, d, -e, -f);
        this.draw(g, !0);
        this._applyFilters();
        g.restore();
        this.cacheID = a._nextCacheID++
    };
    b.uncache = function() {
        this._cacheDataURL = this.cacheCanvas = null;
        this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
        this._cacheScale = 1
    };
    b.getCacheDataURL = function() {
        if (!this.cacheCanvas)
            return null;
        this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL());
        return this._cacheDataURL
    };
    b.getStage = function() {
        for (var a = this; a.parent; )
            a = a.parent;
        return a instanceof createjs.Stage ? a : null
    };
    b.localToGlobal = function(a, b) {
        var c = this.getConcatenatedMatrix(this._matrix);
        if (null == c)
            return null;
        c.append(1, 0, 0, 1, a, b);
        return new createjs.Point(c.tx, c.ty)
    };
    b.globalToLocal = function(a, b) {
        var c = this.getConcatenatedMatrix(this._matrix);
        if (null == c)
            return null;
        c.invert();
        c.append(1, 0, 0, 1, a, b);
        return new createjs.Point(c.tx, c.ty)
    };
    b.localToLocal = function(a, b, c) {
        a = this.localToGlobal(a, b);
        return c.globalToLocal(a.x, a.y)
    };
    b.setTransform = function(a, b, c, d, e, f, g, h, i) {
        this.x = a || 0;
        this.y = b || 0;
        this.scaleX = null == c ? 1 : c;
        this.scaleY = null == d ? 1 : d;
        this.rotation = e || 0;
        this.skewX = f || 0;
        this.skewY = g || 0;
        this.regX = h || 0;
        this.regY = i || 0;
        return this
    };
    b.getMatrix = function(a) {
        return (a ? a.identity() : new createjs.Matrix2D).appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY).appendProperties(this.alpha, this.shadow, this.compositeOperation)
    };
    b.getConcatenatedMatrix = function(a) {
        a ? a.identity() : a = new createjs.Matrix2D;
        for (var b = this; null != b; )
            a.prependTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY).prependProperties(b.alpha, b.shadow, b.compositeOperation), b = b.parent;
        return a
    };
    b.hitTest = function(b, c) {
        var d = a._hitTestContext;
        d.setTransform(1, 0, 0, 1, -b, -c);
        this.draw(d);
        var e = this._testHit(d);
        d.setTransform(1, 0, 0, 1, 0, 0);
        d.clearRect(0, 0, 2, 2);
        return e
    };
    b.set = function(a) {
        for (var b in a)
            this[b] = a[b];
        return this
    };
    b.clone = function() {
        var b = new a;
        this.cloneProps(b);
        return b
    };
    b.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]"
    };
    b.cloneProps = function(a) {
        a.alpha = this.alpha;
        a.name = this.name;
        a.regX = this.regX;
        a.regY = this.regY;
        a.rotation = this.rotation;
        a.scaleX = this.scaleX;
        a.scaleY = this.scaleY;
        a.shadow = this.shadow;
        a.skewX = this.skewX;
        a.skewY = this.skewY;
        a.visible = this.visible;
        a.x = this.x;
        a.y = this.y;
        a.mouseEnabled = this.mouseEnabled;
        a.compositeOperation = this.compositeOperation;
        this.cacheCanvas && (a.cacheCanvas = this.cacheCanvas.cloneNode(!0), a.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0, 0, this.cacheCanvas.width, this.cacheCanvas.height), 0, 0))
    };
    b._applyShadow = function(a, b) {
        b = b || Shadow.identity;
        a.shadowColor = b.color;
        a.shadowOffsetX = b.offsetX;
        a.shadowOffsetY = b.offsetY;
        a.shadowBlur = b.blur
    };
    b._tick = function(a) {
        this.onTick && this.onTick.apply(this, a);
        var b = this._listeners;
        b && b.tick && this.dispatchEvent({type: "tick",params: a})
    };
    b._testHit = function(b) {
        try {
            var c = 1 < b.getImageData(0, 0, 1, 1).data[3]
        } catch (d) {
            if (!a.suppressCrossDomainErrors)
                throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
        }
        return c
    };
    b._applyFilters = function() {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
            for (var a = this.filters.length, b = this.cacheCanvas.getContext("2d"), c = this.cacheCanvas.width, d = this.cacheCanvas.height, e = 0; e < a; e++)
                this.filters[e].applyFilter(b, 0, 0, c, d)
    };
    b._hasMouseHandler = function(a) {
        var b = this._listeners;
        return !!(a & 1 && (this.onPress || this.onClick || this.onDoubleClick || b && (this.hasEventListener("mousedown") || this.hasEventListener("click") || this.hasEventListener("dblclick"))) || a & 2 && (this.onMouseOver || this.onMouseOut || this.cursor || b && (this.hasEventListener("mouseover") || this.hasEventListener("mouseout"))))
    };
    createjs.DisplayObject = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.initialize()
    }, b = a.prototype = new createjs.DisplayObject;
    b.children = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function() {
        this.DisplayObject_initialize();
        this.children = []
    };
    b.isVisible = function() {
        var a = this.cacheCanvas || this.children.length;
        return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && a))
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(a, b) {
        if (this.DisplayObject_draw(a, b))
            return !0;
        for (var c = this.children.slice(0), d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            f.isVisible() && (a.save(), f.updateContext(a), f.draw(a), a.restore())
        }
        return !0
    };
    b.addChild = function(a) {
        if (null == a)
            return a;
        var b = arguments.length;
        if (1 < b) {
            for (var c = 0; c < b; c++)
                this.addChild(arguments[c]);
            return arguments[b - 1]
        }
        a.parent && a.parent.removeChild(a);
        a.parent = this;
        this.children.push(a);
        return a
    };
    b.addChildAt = function(a, b) {
        var c = arguments.length, d = arguments[c - 1];
        if (0 > d || d > this.children.length)
            return arguments[c - 2];
        if (2 < c) {
            for (var e = 0; e < c - 1; e++)
                this.addChildAt(arguments[e], d + e);
            return arguments[c - 2]
        }
        a.parent && a.parent.removeChild(a);
        a.parent = this;
        this.children.splice(b, 0, a);
        return a
    };
    b.removeChild = function(a) {
        var b = arguments.length;
        if (1 < b) {
            for (var c = !0, d = 0; d < b; d++)
                c = c && this.removeChild(arguments[d]);
            return c
        }
        return this.removeChildAt(this.children.indexOf(a))
    };
    b.removeChildAt = function(a) {
        var b = arguments.length;
        if (1 < b) {
            for (var c = [], d = 0; d < b; d++)
                c[d] = arguments[d];
            c.sort(function(a, b) {
                return b - a
            });
            for (var e = !0, d = 0; d < b; d++)
                e = e && this.removeChildAt(c[d]);
            return e
        }
        if (0 > a || a > this.children.length - 1)
            return !1;
        if (b = this.children[a])
            b.parent = null;
        this.children.splice(a, 1);
        return !0
    };
    b.removeAllChildren = function() {
        for (var a = this.children; a.length; )
            a.pop().parent = null
    };
    b.getChildAt = function(a) {
        return this.children[a]
    };
    b.getChildByName = function(a) {
        for (var b = this.children, c = 0, d = b.length; c < d; c++)
            if (b[c].name == a)
                return b[c];
        return null
    };
    b.sortChildren = function(a) {
        this.children.sort(a)
    };
    b.getChildIndex = function(a) {
        return this.children.indexOf(a)
    };
    b.getNumChildren = function() {
        return this.children.length
    };
    b.swapChildrenAt = function(a, b) {
        var c = this.children, d = c[a], e = c[b];
        d && e && (c[a] = e, c[b] = d)
    };
    b.swapChildren = function(a, b) {
        for (var c = this.children, d, e, f = 0, g = c.length; f < g && !(c[f] == a && (d = f), c[f] == b && (e = f), null != d && null != e); f++)
            ;
        f != g && (c[d] = b, c[e] = a)
    };
    b.setChildIndex = function(a, b) {
        var c = this.children, d = c.length;
        if (!(a.parent != this || 0 > b || b >= d)) {
            for (var e = 0; e < d && c[e] != a; e++)
                ;
            e == d || e == b || (c.splice(e, 1), b < e && b--, c.splice(b, 0, a))
        }
    };
    b.contains = function(a) {
        for (; a; ) {
            if (a == this)
                return !0;
            a = a.parent
        }
        return !1
    };
    b.hitTest = function(a, b) {
        return null != this.getObjectUnderPoint(a, b)
    };
    b.getObjectsUnderPoint = function(a, b) {
        var c = [], d = this.localToGlobal(a, b);
        this._getObjectsUnderPoint(d.x, d.y, c);
        return c
    };
    b.getObjectUnderPoint = function(a, b) {
        var c = this.localToGlobal(a, b);
        return this._getObjectsUnderPoint(c.x, c.y)
    };
    b.clone = function(b) {
        var c = new a;
        this.cloneProps(c);
        if (b)
            for (var d = c.children = [], e = 0, f = this.children.length; e < f; e++) {
                var g = this.children[e].clone(b);
                g.parent = c;
                d.push(g)
            }
        return c
    };
    b.toString = function() {
        return "[Container (name=" + this.name + ")]"
    };
    b.DisplayObject__tick = b._tick;
    b._tick = function(a) {
        for (var b = this.children.length - 1; 0 <= b; b--) {
            var c = this.children[b];
            c._tick && c._tick(a)
        }
        this.DisplayObject__tick(a)
    };
    b._getObjectsUnderPoint = function(b, c, d, e) {
        var f = createjs.DisplayObject._hitTestContext, g = this._matrix, h = this._hasMouseHandler(e);
        if (!this.hitArea && this.cacheCanvas && h && (this.getConcatenatedMatrix(g), f.setTransform(g.a, g.b, g.c, g.d, g.tx - b, g.ty - c), f.globalAlpha = g.alpha, this.draw(f), this._testHit(f)))
            return f.setTransform(1, 0, 0, 1, 0, 0), f.clearRect(0, 0, 2, 2), this;
        for (var i = this.children.length - 1; 0 <= i; i--) {
            var j = this.children[i], k = j.hitArea;
            if (j.visible && !(!k && !j.isVisible() || e && !j.mouseEnabled)) {
                var l = e && j._hasMouseHandler(e);
                if (j instanceof a && (!k || !l))
                    if (h) {
                        if (j = j._getObjectsUnderPoint(b, c))
                            return this
                    } else {
                        if (j = j._getObjectsUnderPoint(b, c, d, e), !d && j)
                            return j
                    }
                else if (!e || h || l)
                    if (j.getConcatenatedMatrix(g), k && (g.appendTransform(k.x, k.y, k.scaleX, k.scaleY, k.rotation, k.skewX, k.skewY, k.regX, k.regY), g.alpha = k.alpha), f.globalAlpha = g.alpha, f.setTransform(g.a, g.b, g.c, g.d, g.tx - b, g.ty - c), (k || j).draw(f), this._testHit(f)) {
                        f.setTransform(1, 0, 0, 1, 0, 0);
                        f.clearRect(0, 0, 2, 2);
                        if (h)
                            return this;
                        if (d)
                            d.push(j);
                        else
                            return j
                    }
            }
        }
        return null
    };
    createjs.Container = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype = new createjs.Container;
    a._snapToPixelEnabled = !1;
    b.autoClear = !0;
    b.canvas = null;
    b.mouseX = 0;
    b.mouseY = 0;
    b.onMouseMove = null;
    b.onMouseUp = null;
    b.onMouseDown = null;
    b.snapToPixelEnabled = !1;
    b.mouseInBounds = !1;
    b.tickOnUpdate = !0;
    b.mouseMoveOutside = !1;
    b._pointerData = null;
    b._pointerCount = 0;
    b._primaryPointerID = null;
    b._mouseOverIntervalID = null;
    b.Container_initialize = b.initialize;
    b.initialize = function(a) {
        this.Container_initialize();
        this.canvas = "string" == typeof a ? document.getElementById(a) : a;
        this._pointerData = {};
        this.enableDOMEvents(!0)
    };
    b.update = function() {
        if (this.canvas) {
            this.autoClear && this.clear();
            a._snapToPixelEnabled = this.snapToPixelEnabled;
            this.tickOnUpdate && this._tick(arguments.length ? arguments : null);
            var b = this.canvas.getContext("2d");
            b.save();
            this.updateContext(b);
            this.draw(b, !1);
            b.restore()
        }
    };
    b.tick = b.update;
    b.handleEvent = function(a) {
        "tick" == a.type && this.update(a)
    };
    b.clear = function() {
        if (this.canvas) {
            var a = this.canvas.getContext("2d");
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
        }
    };
    b.toDataURL = function(a, b) {
        b || (b = "image/png");
        var c = this.canvas.getContext("2d"), d = this.canvas.width, e = this.canvas.height, f;
        if (a) {
            f = c.getImageData(0, 0, d, e);
            var g = c.globalCompositeOperation;
            c.globalCompositeOperation = "destination-over";
            c.fillStyle = a;
            c.fillRect(0, 0, d, e)
        }
        var h = this.canvas.toDataURL(b);
        a && (c.clearRect(0, 0, d + 1, e + 1), c.putImageData(f, 0, 0), c.globalCompositeOperation = g);
        return h
    };
    b.enableMouseOver = function(a) {
        this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null);
        if (null == a)
            a = 20;
        else if (0 >= a)
            return;
        var b = this;
        this._mouseOverIntervalID = setInterval(function() {
            b._testMouseOver()
        }, 1e3 / Math.min(50, a))
    };
    b.enableDOMEvents = function(a) {
        null == a && (a = !0);
        var b, c = this._eventListeners;
        if (!a && c) {
            for (b in c)
                a = c[b], a.t.removeEventListener(b, a.f);
            this._eventListeners = null
        } else if (a && !c && this.canvas) {
            a = window.addEventListener ? window : document;
            var d = this, c = this._eventListeners = {};
            c.mouseup = {t: a,f: function(a) {
                    d._handleMouseUp(a)
                }};
            c.mousemove = {t: a,f: function(a) {
                    d._handleMouseMove(a)
                }};
            c.dblclick = {t: a,f: function(a) {
                    d._handleDoubleClick(a)
                }};
            c.mousedown = {t: this.canvas,f: function(a) {
                    d._handleMouseDown(a)
                }};
            for (b in c)
                a = c[b], a.t.addEventListener(b, a.f)
        }
    };
    b.clone = function() {
        var b = new a(null);
        this.cloneProps(b);
        return b
    };
    b.toString = function() {
        return "[Stage (name=" + this.name + ")]"
    };
    b._getPointerData = function(a) {
        var b = this._pointerData[a];
        if (!b && (b = this._pointerData[a] = {x: 0,y: 0}, null == this._primaryPointerID || -1 == this._primaryPointerID))
            this._primaryPointerID = a;
        return b
    };
    b._handleMouseMove = function(a) {
        a || (a = window.event);
        this._handlePointerMove(-1, a, a.pageX, a.pageY)
    };
    b._handlePointerMove = function(a, b, c, d) {
        if (this.canvas) {
            var e = this._getPointerData(a), f = e.inBounds;
            this._updatePointerPosition(a, c, d);
            if (f || e.inBounds || this.mouseMoveOutside) {
                if (this.onMouseMove || this.hasEventListener("stagemousemove"))
                    c = new createjs.MouseEvent("stagemousemove", e.x, e.y, this, b, a, a == this._primaryPointerID, e.rawX, e.rawY), this.onMouseMove && this.onMouseMove(c), this.dispatchEvent(c);
                if ((d = e.event) && (d.onMouseMove || d.hasEventListener("mousemove")))
                    c = new createjs.MouseEvent("mousemove", e.x, e.y, d.target, b, a, a == this._primaryPointerID, e.rawX, e.rawY), d.onMouseMove && d.onMouseMove(c), d.dispatchEvent(c, d.target)
            }
        }
    };
    b._updatePointerPosition = function(a, b, c) {
        var d = this._getElementRect(this.canvas);
        b -= d.left;
        c -= d.top;
        var e = this.canvas.width, f = this.canvas.height;
        b /= (d.right - d.left) / e;
        c /= (d.bottom - d.top) / f;
        d = this._getPointerData(a);
        (d.inBounds = 0 <= b && 0 <= c && b <= e - 1 && c <= f - 1) ? (d.x = b, d.y = c) : this.mouseMoveOutside && (d.x = 0 > b ? 0 : b > e - 1 ? e - 1 : b, d.y = 0 > c ? 0 : c > f - 1 ? f - 1 : c);
        d.rawX = b;
        d.rawY = c;
        a == this._primaryPointerID && (this.mouseX = d.x, this.mouseY = d.y, this.mouseInBounds = d.inBounds)
    };
    b._getElementRect = function(a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            b = {top: a.offsetTop,left: a.offsetLeft,width: a.offsetWidth,height: a.offsetHeight}
        }
        var d = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0), e = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0), f = window.getComputedStyle ? getComputedStyle(a) : a.currentStyle;
        a = parseInt(f.paddingLeft) + parseInt(f.borderLeftWidth);
        var g = parseInt(f.paddingTop) + parseInt(f.borderTopWidth), h = parseInt(f.paddingRight) + parseInt(f.borderRightWidth), f = parseInt(f.paddingBottom) + parseInt(f.borderBottomWidth);
        return {left: b.left + d + a,right: b.right + d - h,top: b.top + e + g,bottom: b.bottom + e - f}
    };
    b._handleMouseUp = function(a) {
        this._handlePointerUp(-1, a, !1)
    };
    b._handlePointerUp = function(a, b, c) {
        var d = this._getPointerData(a), e;
        if (this.onMouseMove || this.hasEventListener("stagemouseup"))
            e = new createjs.MouseEvent("stagemouseup", d.x, d.y, this, b, a, a == this._primaryPointerID, d.rawX, d.rawY), this.onMouseUp && this.onMouseUp(e), this.dispatchEvent(e);
        var f = d.event;
        if (f && (f.onMouseUp || f.hasEventListener("mouseup")))
            e = new createjs.MouseEvent("mouseup", d.x, d.y, f.target, b, a, a == this._primaryPointerID, d.rawX, d.rawY), f.onMouseUp && f.onMouseUp(e), f.dispatchEvent(e, f.target);
        if ((f = d.target) && (f.onClick || f.hasEventListener("click")) && this._getObjectsUnderPoint(d.x, d.y, null, !0, this._mouseOverIntervalID ? 3 : 1) == f)
            e = new createjs.MouseEvent("click", d.x, d.y, f, b, a, a == this._primaryPointerID, d.rawX, d.rawY), f.onClick && f.onClick(e), f.dispatchEvent(e);
        c ? (a == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[a]) : d.event = d.target = null
    };
    b._handleMouseDown = function(a) {
        this._handlePointerDown(-1, a, !1)
    };
    b._handlePointerDown = function(a, b, c, d) {
        var e = this._getPointerData(a);
        null != d && this._updatePointerPosition(a, c, d);
        if (this.onMouseDown || this.hasEventListener("stagemousedown"))
            c = new createjs.MouseEvent("stagemousedown", e.x, e.y, this, b, a, a == this._primaryPointerID, e.rawX, e.rawY), this.onMouseDown && this.onMouseDown(c), this.dispatchEvent(c);
        if (d = this._getObjectsUnderPoint(e.x, e.y, null, this._mouseOverIntervalID ? 3 : 1))
            if (e.target = d, d.onPress || d.hasEventListener("mousedown"))
                if (c = new createjs.MouseEvent("mousedown", e.x, e.y, d, b, a, a == this._primaryPointerID, e.rawX, e.rawY), d.onPress && d.onPress(c), d.dispatchEvent(c), c.onMouseMove || c.onMouseUp || c.hasEventListener("mousemove") || c.hasEventListener("mouseup"))
                    e.event = c
    };
    b._testMouseOver = function() {
        if (-1 == this._primaryPointerID && !(this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
            var a = null;
            this.mouseInBounds && (a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY);
            var b = this._mouseOverTarget;
            if (b != a) {
                var c = this._getPointerData(-1);
                if (b && (b.onMouseOut || b.hasEventListener("mouseout"))) {
                    var d = new createjs.MouseEvent("mouseout", c.x, c.y, b, null, -1, c.rawX, c.rawY);
                    b.onMouseOut && b.onMouseOut(d);
                    b.dispatchEvent(d)
                }
                b && (this.canvas.style.cursor = "");
                if (a && (a.onMouseOver || a.hasEventListener("mouseover")))
                    d = new createjs.MouseEvent("mouseover", c.x, c.y, a, null, -1, c.rawX, c.rawY), a.onMouseOver && a.onMouseOver(d), a.dispatchEvent(d);
                a && (this.canvas.style.cursor = a.cursor || "");
                this._mouseOverTarget = a
            }
        }
    };
    b._handleDoubleClick = function(a) {
        var b = this._getPointerData(-1), c = this._getObjectsUnderPoint(b.x, b.y, null, this._mouseOverIntervalID ? 3 : 1);
        if (c && (c.onDoubleClick || c.hasEventListener("dblclick")))
            evt = new createjs.MouseEvent("dblclick", b.x, b.y, c, a, -1, !0, b.rawX, b.rawY), c.onDoubleClick && c.onDoubleClick(evt), c.dispatchEvent(evt)
    };
    createjs.Stage = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype = new createjs.DisplayObject;
    b.image = null;
    b.snapToPixel = !0;
    b.sourceRect = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(a) {
        this.DisplayObject_initialize();
        "string" == typeof a ? (this.image = new Image, this.image.src = a) : this.image = a
    };
    b.isVisible = function() {
        var a = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState);
        return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && a))
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(a, b) {
        if (this.DisplayObject_draw(a, b))
            return !0;
        var c = this.sourceRect;
        c ? a.drawImage(this.image, c.x, c.y, c.width, c.height, 0, 0, c.width, c.height) : a.drawImage(this.image, 0, 0);
        return !0
    };
    b.clone = function() {
        var b = new a(this.image);
        this.sourceRect && (b.sourceRect = this.sourceRect.clone());
        this.cloneProps(b);
        return b
    };
    b.toString = function() {
        return "[Bitmap (name=" + this.name + ")]"
    };
    createjs.Bitmap = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype = new createjs.DisplayObject;
    b.onAnimationEnd = null;
    b.currentFrame = -1;
    b.currentAnimation = null;
    b.paused = !0;
    b.spriteSheet = null;
    b.snapToPixel = !0;
    b.offset = 0;
    b.currentAnimationFrame = 0;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    b._listeners = null;
    createjs.EventDispatcher.initialize(b);
    b._advanceCount = 0;
    b._animation = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(a) {
        this.DisplayObject_initialize();
        this.spriteSheet = a
    };
    b.isVisible = function() {
        var a = this.cacheCanvas || this.spriteSheet.complete && 0 <= this.currentFrame;
        return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && a))
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(a, b) {
        if (this.DisplayObject_draw(a, b))
            return !0;
        this._normalizeFrame();
        var c = this.spriteSheet.getFrame(this.currentFrame);
        if (c) {
            var d = c.rect;
            a.drawImage(c.image, d.x, d.y, d.width, d.height, -c.regX, -c.regY, d.width, d.height);
            return !0
        }
    };
    b.play = function() {
        this.paused = !1
    };
    b.stop = function() {
        this.paused = !0
    };
    b.gotoAndPlay = function(a) {
        this.paused = !1;
        this._goto(a)
    };
    b.gotoAndStop = function(a) {
        this.paused = !0;
        this._goto(a)
    };
    b.advance = function() {
        this._animation ? this.currentAnimationFrame++ : this.currentFrame++;
        this._normalizeFrame()
    };
    b.getBounds = function() {
        return this.spriteSheet.getFrameBounds(this.currentFrame)
    };
    b.clone = function() {
        var b = new a(this.spriteSheet);
        this.cloneProps(b);
        return b
    };
    b.toString = function() {
        return "[BitmapAnimation (name=" + this.name + ")]"
    };
    b.DisplayObject__tick = b._tick;
    b._tick = function(a) {
        var b = this._animation ? this._animation.frequency : 1;
        !this.paused && 0 == (++this._advanceCount + this.offset) % b && this.advance();
        this.DisplayObject__tick(a)
    };
    b._normalizeFrame = function() {
        var a = this._animation, b = this.currentFrame, c = this.paused, d;
        if (a)
            if (d = a.frames.length, this.currentAnimationFrame >= d) {
                var e = a.next;
                this._dispatchAnimationEnd(a, b, c, e, d - 1) || (e ? this._goto(e) : (this.paused = !0, this.currentAnimationFrame = a.frames.length - 1, this.currentFrame = a.frames[this.currentAnimationFrame]))
            } else
                this.currentFrame = a.frames[this.currentAnimationFrame];
        else
            d = this.spriteSheet.getNumFrames(), b >= d && !this._dispatchAnimationEnd(a, b, c, d - 1) && (this.currentFrame = 0)
    };
    b._dispatchAnimationEnd = function(a, b, c, d, e) {
        var f = a ? a.name : null;
        this.onAnimationEnd && this.onAnimationEnd(this, f, d);
        this.dispatchEvent({type: "animationend",name: f,next: d});
        !c && this.paused && (this.currentAnimationFrame = e);
        return this.paused != c || this._animation != a || this.currentFrame != b
    };
    b.DisplayObject_cloneProps = b.cloneProps;
    b.cloneProps = function(a) {
        this.DisplayObject_cloneProps(a);
        a.onAnimationEnd = this.onAnimationEnd;
        a.currentFrame = this.currentFrame;
        a.currentAnimation = this.currentAnimation;
        a.paused = this.paused;
        a.offset = this.offset;
        a._animation = this._animation;
        a.currentAnimationFrame = this.currentAnimationFrame
    };
    b._goto = function(a) {
        if (isNaN(a)) {
            var b = this.spriteSheet.getAnimation(a);
            b && (this.currentAnimationFrame = 0, this._animation = b, this.currentAnimation = a, this._normalizeFrame())
        } else
            this.currentAnimation = this._animation = null, this.currentFrame = a
    };
    createjs.BitmapAnimation = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype = new createjs.DisplayObject;
    b.graphics = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(a) {
        this.DisplayObject_initialize();
        this.graphics = a ? a : new createjs.Graphics
    };
    b.isVisible = function() {
        var a = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
        return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && a))
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(a, b) {
        if (this.DisplayObject_draw(a, b))
            return !0;
        this.graphics.draw(a);
        return !0
    };
    b.clone = function(b) {
        b = new a(b && this.graphics ? this.graphics.clone() : this.graphics);
        this.cloneProps(b);
        return b
    };
    b.toString = function() {
        return "[Shape (name=" + this.name + ")]"
    };
    createjs.Shape = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b, c) {
        this.initialize(a, b, c)
    }, b = a.prototype = new createjs.DisplayObject;
    a._workingContext = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).getContext("2d");
    b.text = "";
    b.font = null;
    b.color = "#000";
    b.textAlign = "left";
    b.textBaseline = "top";
    b.maxWidth = null;
    b.outline = !1;
    b.lineHeight = 0;
    b.lineWidth = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(a, b, c) {
        this.DisplayObject_initialize();
        this.text = a;
        this.font = b;
        this.color = c ? c : "#000"
    };
    b.isVisible = function() {
        var a = this.cacheCanvas || null != this.text && "" !== this.text;
        return !(!this.visible || !(0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && a))
    };
    b.DisplayObject_draw = b.draw;
    b.draw = function(a, b) {
        if (this.DisplayObject_draw(a, b))
            return !0;
        this.outline ? a.strokeStyle = this.color : a.fillStyle = this.color;
        a.font = this.font;
        a.textAlign = this.textAlign || "start";
        a.textBaseline = this.textBaseline || "alphabetic";
        this._drawText(a);
        return !0
    };
    b.getMeasuredWidth = function() {
        return this._getWorkingContext().measureText(this.text).width
    };
    b.getMeasuredLineHeight = function() {
        return 1.2 * this._getWorkingContext().measureText("M").width
    };
    b.getMeasuredHeight = function() {
        return this._drawText() * (this.lineHeight || this.getMeasuredLineHeight())
    };
    b.clone = function() {
        var b = new a(this.text, this.font, this.color);
        this.cloneProps(b);
        return b
    };
    b.toString = function() {
        return "[Text (text=" + (20 < this.text.length ? this.text.substr(0, 17) + "..." : this.text) + ")]"
    };
    b.DisplayObject_cloneProps = b.cloneProps;
    b.cloneProps = function(a) {
        this.DisplayObject_cloneProps(a);
        a.textAlign = this.textAlign;
        a.textBaseline = this.textBaseline;
        a.maxWidth = this.maxWidth;
        a.outline = this.outline;
        a.lineHeight = this.lineHeight;
        a.lineWidth = this.lineWidth
    };
    b._getWorkingContext = function() {
        var b = a._workingContext;
        b.font = this.font;
        b.textAlign = this.textAlign || "start";
        b.textBaseline = this.textBaseline || "alphabetic";
        return b
    };
    b._drawText = function(a) {
        var b = !!a;
        b || (a = this._getWorkingContext());
        for (var c = String(this.text).split(/(?:\r\n|\r|\n)/), d = this.lineHeight || this.getMeasuredLineHeight(), e = 0, f = 0, g = c.length; f < g; f++) {
            var h = a.measureText(c[f]).width;
            if (null == this.lineWidth || h < this.lineWidth)
                b && this._drawTextLine(a, c[f], e * d);
            else {
                for (var h = c[f].split(/(\s)/), i = h[0], j = 1, k = h.length; j < k; j += 2)
                    a.measureText(i + h[j] + h[j + 1]).width > this.lineWidth ? (b && this._drawTextLine(a, i, e * d), e++, i = h[j + 1]) : i += h[j] + h[j + 1];
                b && this._drawTextLine(a, i, e * d)
            }
            e++
        }
        return e
    };
    b._drawTextLine = function(a, b, c) {
        this.outline ? a.strokeText(b, 0, c, this.maxWidth || 65535) : a.fillText(b, 0, c, this.maxWidth || 65535)
    };
    createjs.Text = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        throw "SpriteSheetUtils cannot be instantiated"
    };
    a._workingCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    a._workingContext = a._workingCanvas.getContext("2d");
    a.addFlippedFrames = function(b, c, d, e) {
        if (c || d || e) {
            var f = 0;
            c && a._flip(b, ++f, !0, !1);
            d && a._flip(b, ++f, !1, !0);
            e && a._flip(b, ++f, !0, !0)
        }
    };
    a.extractFrame = function(b, c) {
        isNaN(c) && (c = b.getAnimation(c).frames[0]);
        var d = b.getFrame(c);
        if (!d)
            return null;
        var e = d.rect, f = a._workingCanvas;
        f.width = e.width;
        f.height = e.height;
        a._workingContext.drawImage(d.image, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height);
        d = new Image;
        d.src = f.toDataURL("image/png");
        return d
    };
    a.mergeAlpha = function(a, b, c) {
        c || (c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
        c.width = Math.max(b.width, a.width);
        c.height = Math.max(b.height, a.height);
        var d = c.getContext("2d");
        d.save();
        d.drawImage(a, 0, 0);
        d.globalCompositeOperation = "destination-in";
        d.drawImage(b, 0, 0);
        d.restore();
        return c
    };
    a._flip = function(b, c, d, e) {
        for (var f = b._images, g = a._workingCanvas, h = a._workingContext, i = f.length / c, j = 0; j < i; j++) {
            var k = f[j];
            k.__tmp = j;
            h.setTransform(1, 0, 0, 1, 0, 0);
            h.clearRect(0, 0, g.width + 1, g.height + 1);
            g.width = k.width;
            g.height = k.height;
            h.setTransform(d ? -1 : 1, 0, 0, e ? -1 : 1, d ? k.width : 0, e ? k.height : 0);
            h.drawImage(k, 0, 0);
            var l = new Image;
            l.src = g.toDataURL("image/png");
            l.width = k.width;
            l.height = k.height;
            f.push(l)
        }
        h = b._frames;
        g = h.length / c;
        for (j = 0; j < g; j++) {
            var k = h[j], m = k.rect.clone(), l = f[k.image.__tmp + i * c], n = {image: l,rect: m,regX: k.regX,regY: k.regY};
            d && (m.x = l.width - m.x - m.width, n.regX = m.width - k.regX);
            e && (m.y = l.height - m.y - m.height, n.regY = m.height - k.regY);
            h.push(n)
        }
        d = "_" + (d ? "h" : "") + (e ? "v" : "");
        e = b._animations;
        b = b._data;
        f = e.length / c;
        for (j = 0; j < f; j++) {
            h = e[j];
            k = b[h];
            i = {name: h + d,frequency: k.frequency,next: k.next,frames: []};
            k.next && (i.next += d);
            h = k.frames;
            k = 0;
            for (l = h.length; k < l; k++)
                i.frames.push(h[k] + g * c);
            b[i.name] = i;
            e.push(i.name)
        }
    };
    createjs.SpriteSheetUtils = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.initialize()
    }, b = a.prototype;
    a.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
    a.ERR_RUNNING = "a build is already running";
    b.maxWidth = 2048;
    b.maxHeight = 2048;
    b.spriteSheet = null;
    b.scale = 1;
    b.padding = 1;
    b.timeSlice = .3;
    b.progress = -1;
    b.onComplete = null;
    b.onProgress = null;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    b._listeners = null;
    createjs.EventDispatcher.initialize(b);
    b._frames = null;
    b._animations = null;
    b._data = null;
    b._nextFrameIndex = 0;
    b._index = 0;
    b._timerID = null;
    b._scale = 1;
    b.initialize = function() {
        this._frames = [];
        this._animations = {}
    };
    b.addFrame = function(b, c, d, e, f, g) {
        if (this._data)
            throw a.ERR_RUNNING;
        c = c || b.bounds || b.nominalBounds;
        !c && b.getBounds && (c = b.getBounds());
        if (!c)
            return null;
        d = d || 1;
        return this._frames.push({source: b,sourceRect: c,scale: d,funct: e,params: f,scope: g,index: this._frames.length,height: c.height * d}) - 1
    };
    b.addAnimation = function(b, c, d, e) {
        if (this._data)
            throw a.ERR_RUNNING;
        this._animations[b] = {frames: c,next: d,frequency: e}
    };
    b.addMovieClip = function(b, c, d) {
        if (this._data)
            throw a.ERR_RUNNING;
        var e = b.frameBounds, f = c || b.bounds || b.nominalBounds;
        !f && b.getBounds && (f = b.getBounds());
        if (!f && !e)
            return null;
        c = this._frames.length;
        for (var g = b.timeline.duration, h = 0; h < g; h++)
            this.addFrame(b, e && e[h] ? e[h] : f, d, function(a) {
                var b = this.actionsEnabled;
                this.actionsEnabled = !1;
                this.gotoAndStop(a);
                this.actionsEnabled = b
            }, [h], b);
        h = b.timeline._labels;
        b = [];
        for (var i in h)
            b.push({index: h[i],label: i});
        if (b.length) {
            b.sort(function(a, b) {
                return a.index - b.index
            });
            h = 0;
            for (i = b.length; h < i; h++) {
                d = b[h].label;
                for (var e = c + (h == i - 1 ? g : b[h + 1].index), f = [], j = c + b[h].index; j < e; j++)
                    f.push(j);
                this.addAnimation(d, f, !0)
            }
        }
    };
    b.build = function() {
        if (this._data)
            throw a.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); )
            ;
        this._endBuild();
        return this.spriteSheet
    };
    b.buildAsync = function(b) {
        if (this._data)
            throw a.ERR_RUNNING;
        this.timeSlice = b;
        this._startBuild();
        var c = this;
        this._timerID = setTimeout(function() {
            c._run()
        }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
    };
    b.stopAsync = function() {
        clearTimeout(this._timerID);
        this._data = null
    };
    b.clone = function() {
        throw "SpriteSheetBuilder cannot be cloned."
    };
    b.toString = function() {
        return "[SpriteSheetBuilder]"
    };
    b._startBuild = function() {
        var b = this.padding || 0;
        this.progress = 0;
        this.spriteSheet = null;
        this._index = 0;
        this._scale = this.scale;
        var c = [];
        this._data = {images: [],frames: c,animations: this._animations};
        var d = this._frames.slice();
        d.sort(function(a, b) {
            return a.height <= b.height ? -1 : 1
        });
        if (d[d.length - 1].height + 2 * b > this.maxHeight)
            throw a.ERR_DIMENSIONS;
        for (var e = 0, f = 0, g = 0; d.length; ) {
            var h = this._fillRow(d, e, g, c, b);
            h.w > f && (f = h.w);
            e += h.h;
            if (!h.h || !d.length) {
                var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                i.width = this._getSize(f, this.maxWidth);
                i.height = this._getSize(e, this.maxHeight);
                this._data.images[g] = i;
                h.h || (f = e = 0, g++)
            }
        }
    };
    b._getSize = function(a, b) {
        for (var c = 4; Math.pow(2, ++c) < a; )
            ;
        return Math.min(b, Math.pow(2, c))
    };
    b._fillRow = function(b, c, d, e, f) {
        var g = this.maxWidth, h = this.maxHeight;
        c += f;
        for (var h = h - c, i = f, j = 0, k = b.length - 1; 0 <= k; k--) {
            var l = b[k], m = this._scale * l.scale, n = l.sourceRect, o = l.source, p = Math.floor(m * n.x - f), q = Math.floor(m * n.y - f), r = Math.ceil(m * n.height + 2 * f), n = Math.ceil(m * n.width + 2 * f);
            if (n > g)
                throw a.ERR_DIMENSIONS;
            r > h || i + n > g || (l.img = d, l.rect = new createjs.Rectangle(i, c, n, r), j = j || r, b.splice(k, 1), e[l.index] = [i, c, n, r, d, Math.round(-p + m * o.regX - f), Math.round(-q + m * o.regY - f)], i += n)
        }
        return {w: i,h: j}
    };
    b._endBuild = function() {
        this.spriteSheet = new createjs.SpriteSheet(this._data);
        this._data = null;
        this.progress = 1;
        this.onComplete && this.onComplete(this);
        this.dispatchEvent("complete")
    };
    b._run = function() {
        for (var a = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), b = (new Date).getTime() + a, c = !1; b > (new Date).getTime(); )
            if (!this._drawNext()) {
                c = !0;
                break
            }
        if (c)
            this._endBuild();
        else {
            var d = this;
            this._timerID = setTimeout(function() {
                d._run()
            }, 50 - a)
        }
        a = this.progress = this._index / this._frames.length;
        this.onProgress && this.onProgress(this, a);
        this.dispatchEvent({type: "progress",progress: a})
    };
    b._drawNext = function() {
        var a = this._frames[this._index], b = a.scale * this._scale, c = a.rect, d = a.sourceRect, e = this._data.images[a.img].getContext("2d");
        a.funct && a.funct.apply(a.scope, a.params);
        e.save();
        e.beginPath();
        e.rect(c.x, c.y, c.width, c.height);
        e.clip();
        e.translate(Math.ceil(c.x - d.x * b), Math.ceil(c.y - d.y * b));
        e.scale(b, b);
        a.source.draw(e);
        e.restore();
        return ++this._index < this._frames.length
    };
    createjs.SpriteSheetBuilder = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a) {
        this.initialize(a)
    }, b = a.prototype = new createjs.DisplayObject;
    b.htmlElement = null;
    b._oldMtx = null;
    b.DisplayObject_initialize = b.initialize;
    b.initialize = function(a) {
        "string" == typeof a && (a = document.getElementById(a));
        this.DisplayObject_initialize();
        this.mouseEnabled = !1;
        this.htmlElement = a;
        a = a.style;
        a.position = "absolute";
        a.transformOrigin = a.WebkitTransformOrigin = a.msTransformOrigin = a.MozTransformOrigin = a.OTransformOrigin = "0% 0%"
    };
    b.isVisible = function() {
        return null != this.htmlElement
    };
    b.draw = function() {
        if (null != this.htmlElement) {
            var a = this.getConcatenatedMatrix(this._matrix), b = this.htmlElement.style;
            if (this.visible)
                b.visibility = "visible";
            else
                return !0;
            var c = this._oldMtx || {};
            c.alpha != a.alpha && (b.opacity = "" + a.alpha, c.alpha = a.alpha);
            if (c.tx != a.tx || c.ty != a.ty || c.a != a.a || c.b != a.b || c.c != a.c || c.d != a.d)
                b.transform = b.WebkitTransform = b.OTransform = b.msTransform = ["matrix(" + a.a, a.b, a.c, a.d, a.tx + .5 | 0, (a.ty + .5 | 0) + ")"].join(), b.MozTransform = ["matrix(" + a.a, a.b, a.c, a.d, (a.tx + .5 | 0) + "px", (a.ty + .5 | 0) + "px)"].join(), this._oldMtx = a.clone();
            return !0
        }
    };
    b.cache = function() {
    };
    b.uncache = function() {
    };
    b.updateCache = function() {
    };
    b.hitTest = function() {
    };
    b.localToGlobal = function() {
    };
    b.globalToLocal = function() {
    };
    b.localToLocal = function() {
    };
    b.clone = function() {
        throw "DOMElement cannot be cloned."
    };
    b.toString = function() {
        return "[DOMElement (name=" + this.name + ")]"
    };
    b.DisplayObject__tick = b._tick;
    b._tick = function(a) {
        this.htmlElement.style.visibility = "hidden";
        this.DisplayObject__tick(a)
    };
    createjs.DOMElement = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.initialize()
    }, b = a.prototype;
    b.initialize = function() {
    };
    b.getBounds = function() {
        return new createjs.Rectangle(0, 0, 0, 0)
    };
    b.applyFilter = function() {
    };
    b.toString = function() {
        return "[Filter]"
    };
    b.clone = function() {
        return new a
    };
    createjs.Filter = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        throw "Touch cannot be instantiated"
    };
    a.isSupported = function() {
        return "ontouchstart" in window || window.navigator.msPointerEnabled
    };
    a.enable = function(b, c, d) {
        if (!b || !b.canvas || !a.isSupported())
            return !1;
        b.__touch = {pointers: {},multitouch: !c,preventDefault: !d,count: 0};
        "ontouchstart" in window ? a._IOS_enable(b) : window.navigator.msPointerEnabled && a._IE_enable(b);
        return !0
    };
    a.disable = function(b) {
        b && ("ontouchstart" in window ? a._IOS_disable(b) : window.navigator.msPointerEnabled && a._IE_disable(b))
    };
    a._IOS_enable = function(b) {
        var c = b.canvas, d = b.__touch.f = function(c) {
            a._IOS_handleEvent(b, c)
        };
        c.addEventListener("touchstart", d, !1);
        c.addEventListener("touchmove", d, !1);
        c.addEventListener("touchend", d, !1);
        c.addEventListener("touchcancel", d, !1)
    };
    a._IOS_disable = function(a) {
        var b = a.canvas;
        b && (a = a.__touch.f, b.removeEventListener("touchstart", a, !1), b.removeEventListener("touchmove", a, !1), b.removeEventListener("touchend", a, !1), b.removeEventListener("touchcancel", a, !1))
    };
    a._IOS_handleEvent = function(a, b) {
        if (a) {
            a.__touch.preventDefault && b.preventDefault && b.preventDefault();
            for (var c = b.changedTouches, d = b.type, e = 0, f = c.length; e < f; e++) {
                var g = c[e], h = g.identifier;
                g.target == a.canvas && ("touchstart" == d ? this._handleStart(a, h, b, g.pageX, g.pageY) : "touchmove" == d ? this._handleMove(a, h, b, g.pageX, g.pageY) : ("touchend" == d || "touchcancel" == d) && this._handleEnd(a, h, b))
            }
        }
    };
    a._IE_enable = function(b) {
        var c = b.canvas, d = b.__touch.f = function(c) {
            a._IE_handleEvent(b, c)
        };
        c.addEventListener("MSPointerDown", d, !1);
        window.addEventListener("MSPointerMove", d, !1);
        window.addEventListener("MSPointerUp", d, !1);
        window.addEventListener("MSPointerCancel", d, !1);
        b.__touch.preventDefault && (c.style.msTouchAction = "none");
        b.__touch.activeIDs = {}
    };
    a._IE_disable = function(a) {
        var b = a.__touch.f;
        window.removeEventListener("MSPointerMove", b, !1);
        window.removeEventListener("MSPointerUp", b, !1);
        window.removeEventListener("MSPointerCancel", b, !1);
        a.canvas && a.canvas.removeEventListener("MSPointerDown", b, !1)
    };
    a._IE_handleEvent = function(a, b) {
        if (a) {
            a.__touch.preventDefault && b.preventDefault && b.preventDefault();
            var c = b.type, d = b.pointerId, e = a.__touch.activeIDs;
            if ("MSPointerDown" == c)
                b.srcElement == a.canvas && (e[d] = !0, this._handleStart(a, d, b, b.pageX, b.pageY));
            else if (e[d])
                if ("MSPointerMove" == c)
                    this._handleMove(a, d, b, b.pageX, b.pageY);
                else if ("MSPointerUp" == c || "MSPointerCancel" == c)
                    delete e[d], this._handleEnd(a, d, b)
        }
    };
    a._handleStart = function(a, b, c, d, e) {
        var f = a.__touch;
        if (f.multitouch || !f.count) {
            var g = f.pointers;
            g[b] || (g[b] = !0, f.count++, a._handlePointerDown(b, c, d, e))
        }
    };
    a._handleMove = function(a, b, c, d, e) {
        a.__touch.pointers[b] && a._handlePointerMove(b, c, d, e)
    };
    a._handleEnd = function(a, b, c) {
        var d = a.__touch, e = d.pointers;
        e[b] && (d.count--, a._handlePointerUp(b, c, !0), delete e[b])
    };
    createjs.Touch = a
})();
(function() {
    var a = this.createjs = this.createjs || {}, a = a.EaselJS = a.EaselJS || {};
    a.version = "0.6.1";
    a.buildDate = "Tue, 14 May 2013 21:43:02 GMT"
})();
(function(a) {
    var b = 0;
    var c = {resizeMaxTry: 4,resizeWaitTime: 50,minimumHeight: 200,defaultHeight: 3e3,heightOffset: 0,exceptPages: "",debugMode: false,visibilitybeforeload: false,blockCrossDomain: false,externalHeightName: "bodyHeight",onMessageFunctionName: "getHeight",domainName: "*",watcher: false,watcherTime: 400};
    a.iframeHeight = function(c, d) {
        var e = this;
        a.iframeHeight.resizeTimeout = null;
        a.iframeHeight.resizeCount = 0;
        e.$el = a(c);
        e.el = c;
        e.$el.before("<div id='iframeHeight-Container' style='padding: 0; margin: 0; border: none; background-color: transparent;'></div>");
        e.$el.appendTo("#iframeHeight-Container");
        e.$container = a("#iframeHeight-Container");
        e.$el.data("iframeHeight", e);
        e.watcher = null;
        e.debug = {FirstTime: true,Init: function() {
                if (!("console" in window))
                    console = {};
                "log info warn error dir clear".replace(/\w+/g, function(a) {
                    if (!(a in console))
                        console[a] = console.log || new Function
                })
            },Log: function(a) {
                if (this.FirstTime && this.FirstTime === true) {
                    this.Init();
                    this.FirstTime = false
                }
                if (e.options.debugMode && e.options.debugMode === true && console && (a !== null || a !== ""))
                    console["log"]("Iframe Plugin : " + a)
            },GetBrowserInfo: function(a) {
                var b, c;
                var d = function(a) {
                    a = a.toLowerCase();
                    if (0)
                        a = "msie 6.0";
                    var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
                    return {browserObj: b[1] || "",version: b[2] || "0"}
                };
                b = d(navigator.userAgent);
                c = {chrome: false,safari: false,mozilla: false,msie: false,webkit: false};
                if (b.browserObj) {
                    c[b.browserObj] = true;
                    c.version = b.version
                }
                if (c.chrome)
                    c.webkit = true;
                else if (c.webkit)
                    c.safari = true;
                a = c;
                return a
            }(this.GetBrowserInfo || {})};
        var f = function() {
            try {
                var a;
                if (e.debug.GetBrowserInfo.msie && e.debug.GetBrowserInfo.version == "7.0")
                    a = e.$el.get(0).contentWindow.location.href;
                else
                    a = e.$el.get(0).contentDocument.location.href;
                e.debug.Log("This page is non-Cross Domain - " + a);
                return false
            } catch (b) {
                e.debug.Log("This page is Cross Domain");
                return true
            }
        };
        e.resetIframe = function() {
            if (e.options.visibilitybeforeload && !(e.debug.GetBrowserInfo.msie && e.debug.GetBrowserInfo.version == "7.0"))
                e.$el.css("visibility", "hidden");
            e.debug.Log("Old Height is " + e.$el.height() + "px");
            e.$el.css("height", "").removeAttr("height");
            e.debug.Log("Reset iframe");
            e.debug.Log("Height is " + e.$el.height() + "px after reset")
        };
        e.resizeFromOutside = function(a) {
            if (e.options.blockCrossDomain) {
                e.debug.Log("Blocked cross domain fix");
                return false
            }
            if (typeof a === "undefined" || typeof a.data != "number")
                return false;
            if (typeof parseInt(a.data) != "number")
                return false;
            var b = parseInt(a.data) + parseInt(e.options.heightOffset);
            e.resetIframe();
            e.setIframeHeight(b);
            return true
        };
        e.checkMessageEvent = function() {
            if (e.options.blockCrossDomain || e.debug.GetBrowserInfo.msie && e.debug.GetBrowserInfo.version == "7.0") {
                e.debug.Log("Blocked cross domain fix");
                return false
            }
            e.resetIframe();
            if (e.options.visibilitybeforeload && !(e.debug.GetBrowserInfo.msie && e.debug.GetBrowserInfo.version == "7.0"))
                e.$el.css("visibility", "visible");
            if (window.addEventListener)
                window.addEventListener("message", e.resizeFromOutside, false);
            else if (window.attachEvent)
                window.attachEvent("onmessage", e.resizeFromOutside);
            if (!e.$el.id)
                e.$el.id = "iframe-id-" + ++b;
            var a = document.getElementById(e.$el.attr("id"));
            var c = e.options.onMessageFunctionName;
            if (a.contentWindow.postMessage)
                a.contentWindow.postMessage(c, "*");
            else {
                e.debug.Log("Your browser does not support the postMessage method!");
                return false
            }
            e.debug.Log("Cross Domain Iframe started");
            return true
        };
        var g = function() {
            if (a.iframeHeight.resizeCount <= e.options.resizeMaxTry) {
                a.iframeHeight.resizeCount++;
                a.iframeHeight.resizeTimeout = setTimeout("$.iframeHeight.resizeIframe()", e.options.resizeWaitTime);
                e.debug.Log(a.iframeHeight.resizeCount + " time(s) tried")
            } else {
                clearTimeout(a.iframeHeight.resizeTimeout);
                a.iframeHeight.resizeCount = 0;
                e.debug.Log("set default height for iframe");
                e.setIframeHeight(e.options.defaultHeight + e.options.heightOffset)
            }
        };
        e.sendInfotoTop = function() {
            if (top.length > 0 && typeof JSON != "undefined") {
                var b = {};
                b[e.options.externalHeightName].value = a(document).height();
                var c = "*";
                b = JSON.stringify(b);
                top.postMessage(b, c);
                e.debug.Log("sent info to top page");
                return false
            }
            return true
        };
        e.setIframeHeight = function(a) {
            e.$el.height(a).css("height", a);
            if (e.$el.data("iframeheight") != a)
                e.$container.height(a).css("height", a);
            if (e.options.visibilitybeforeload && !(e.debug.GetBrowserInfo.msie && e.debug.GetBrowserInfo.version == "7.0"))
                e.$el.css("visibility", "visible");
            e.debug.Log("Now iframe height is " + a + "px");
            e.$el.data("iframeheight", a)
        };
        a.iframeHeight.resizeIframe = function() {
            e.resetIframe();
            if (f()) {
                e.$el.height(e.options.defaultHeight + e.options.heightOffset).css("height", e.options.defaultHeight + e.options.heightOffset);
                if (e.options.visibilitybeforeload && !(e.debug.GetBrowserInfo.msie && e.debug.GetBrowserInfo.version == "7.0"))
                    e.$el.css("visibility", "visible");
                e.checkMessageEvent()
            } else {
                if (e.$el.css("height") === e.options.minimumHeight + "px")
                    e.resetIframe();
                if (e.$el.get(0).contentWindow.document.body !== null) {
                    e.debug.Log("This page has body info");
                    var b = a(e.$el.get(0).contentWindow.document).height();
                    var c = e.$el.get(0).contentWindow.document.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1).toLowerCase();
                    e.debug.Log("page height : " + b + "px || page name : " + c);
                    if (b <= e.options.minimumHeight && e.options.exceptPages.indexOf(c) == -1)
                        g();
                    else if (b > e.options.minimumHeight && e.options.exceptPages.indexOf(c) == -1)
                        e.setIframeHeight(b + e.options.heightOffset)
                } else {
                    e.debug.Log("This page has not body info");
                    g()
                }
            }
        };
        this.$el.bind("updateIframe", function() {
            a.iframeHeight.resizeIframe();
            e.debug.Log("Updated Iframe Manually")
        });
        this.$el.bind("killWatcher", function() {
            window.clearInterval(e.watcher);
            e.debug.Log("Killed Watcher")
        });
        e.init = function() {
            e.options = a.extend({}, a.iframeHeight.defaultOptions, d);
            if (e.options.watcher == true)
                e.options.blockCrossDomain = true;
            e.debug.Log(e.options);
            if (e.$el.get(0).tagName === undefined || e.$el.get(0).tagName.toLowerCase() !== "iframe") {
                e.debug.Log("This element is not iframe!");
                return false
            }
            a.iframeHeight.resizeIframe();
            e.$el.load(function() {
                a.iframeHeight.resizeIframe()
            });
            if (e.options.watcher)
                e.watcher = setInterval(function() {
                    a.iframeHeight.resizeIframe();
                    e.debug.Log("Checked Iframe")
                }, e.options.watcherTime);
            return true
        };
        e.init()
    };
    a.iframeHeight.defaultOptions = c;
    a.fn.iframeHeight = function(b) {
        return this.each(function() {
            new a.iframeHeight(this, b)
        })
    };
    a.iframeHeightExternal = function() {
        if (arguments.length === 1)
            if (a.isPlainObject(arguments[0]))
                c = arguments[0];
        if (window.addEventListener)
            window.addEventListener("message", b, false);
        else if (window.attachEvent)
            window.attachEvent("onmessage", b);
        function b(b) {
            var d;
            if ("domain" in b)
                d = b.domain;
            if ("origin" in b)
                d = b.origin;
            if (c.domainName !== "*")
                if (d !== c.domainName) {
                    a.iframeHeight.debug.Log("It's not same domain. Blocked!");
                    return
                }
            if (b.data == c.onMessageFunctionName) {
                var e = a(document).height();
                b.source.postMessage(e, b.origin)
            }
        }
        return {update: function() {
                var b = a(document).height();
                parent.postMessage(b, c.domainName)
            }}
    }
})(jQuery);
(function(a, b) {
    var c = Math, d = b.createElement("div").style, e = function() {
        var a = "t,webkitT,MozT,msT,OT".split(","), b, c = 0, e = a.length;
        for (; c < e; c++) {
            b = a[c] + "ransform";
            if (b in d) {
                return a[c].substr(0, a[c].length - 1)
            }
        }
        return false
    }(), f = e ? "-" + e.toLowerCase() + "-" : "", g = D("transform"), h = D("transitionProperty"), i = D("transitionDuration"), j = D("transformOrigin"), k = D("transitionTimingFunction"), l = D("transitionDelay"), m = /android/gi.test(navigator.appVersion), n = /iphone|ipad/gi.test(navigator.appVersion), o = /hp-tablet/gi.test(navigator.appVersion), p = D("perspective") in d, q = "ontouchstart" in a && !o, r = e !== false, s = D("transition") in d, t = "onorientationchange" in a ? "orientationchange" : "resize", u = q ? "touchstart" : "mousedown", v = q ? "touchmove" : "mousemove", w = q ? "touchend" : "mouseup", x = q ? "touchcancel" : "mouseup", y = function() {
        if (e === false)
            return false;
        var a = {"": "transitionend",webkit: "webkitTransitionEnd",Moz: "transitionend",O: "otransitionend",ms: "MSTransitionEnd"};
        return a[e]
    }(), z = function() {
        return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(a) {
            return setTimeout(a, 1)
        }
    }(), A = function() {
        return a.cancelRequestAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || clearTimeout
    }(), B = p ? " translateZ(0)" : "", C = function(c, d) {
        var e = this, l;
        e.wrapper = typeof c == "object" ? c : b.getElementById(c);
        e.scroller = e.wrapper.children[0];
        e.scrollbarContainer = e.wrapper;
        e.options = {hScroll: true,vScroll: true,x: 0,y: 0,bounce: true,bounceLock: false,momentum: true,lockDirection: true,useTransform: true,useTransition: false,topOffset: 0,checkDOMChanges: false,handleClick: true,hScrollbar: true,vScrollbar: true,fixedScrollbar: m,hideScrollbar: n,fadeScrollbar: n && p,scrollbarClass: "",zoom: false,zoomMin: 1,zoomMax: 4,doubleTapZoom: 2,wheelAction: "scroll",snap: false,snapThreshold: 1,onRefresh: null,onBeforeScrollStart: function(a) {
                a.preventDefault()
            },onScrollStart: null,onBeforeScrollMove: null,onScrollMove: null,onBeforeScrollEnd: null,onScrollEnd: null,onTouchEnd: null,onDestroy: null,onZoomStart: null,onZoom: null,onZoomEnd: null,overflow: "visible",positionByTranslate: true,scrollbarContainer: null};
        for (l in d)
            e.options[l] = d[l];
        e.wrapper.style.overflow = e.options.overflow;
        e.x = e.options.x;
        e.y = e.options.y;
        e.options.useTransform = r && e.options.useTransform;
        e.options.hScrollbar = e.options.hScroll && e.options.hScrollbar;
        e.options.vScrollbar = e.options.vScroll && e.options.vScrollbar;
        e.options.zoom = e.options.useTransform && e.options.zoom;
        e.options.useTransition = s && e.options.useTransition;
        if (e.options.zoom && m) {
            B = ""
        }
        e.scroller.style[h] = e.options.useTransform ? f + "transform" : "top left";
        e.scroller.style[i] = "0";
        e.scroller.style[j] = "0 0";
        if (e.options.useTransition)
            e.scroller.style[k] = "cubic-bezier(0.33,0.66,0.66,1)";
        if (e.options.useTransform)
            e.scroller.style[g] = "translate(" + e.x + "px," + e.y + "px)" + B;
        else
            e.scroller.style.cssText += ";position:absolute;top:" + e.y + "px;left:" + e.x + "px";
        if (e.options.useTransition)
            e.options.fixedScrollbar = true;
        if (e.options.scrollbarContainer !== null) {
            e.scrollbarContainer = e.options.scrollbarContainer
        }
        e.refresh();
        e._bind(t, a);
        e._bind(u);
        if (!q) {
            if (e.options.wheelAction != "none") {
                e._bind("DOMMouseScroll");
                e._bind("mousewheel")
            }
        }
        if (e.options.checkDOMChanges)
            e.checkDOMTime = setInterval(function() {
                e._checkDOMChanges()
            }, 500)
    };
    C.prototype = {enabled: true,x: 0,y: 0,steps: [],scale: 1,currPageX: 0,currPageY: 0,pagesX: [],pagesY: [],aniTime: null,wheelZoomCount: 0,handleEvent: function(a) {
            var b = this;
            switch (a.type) {
                case u:
                    if (!q && a.button !== 0)
                        return;
                    b._start(a);
                    break;
                case v:
                    b._move(a);
                    break;
                case w:
                case x:
                    b._end(a);
                    break;
                case t:
                    b._resize();
                    break;
                case "DOMMouseScroll":
                case "mousewheel":
                    b._wheel(a);
                    break;
                case y:
                    b._transitionEnd(a);
                    break
            }
        },_checkDOMChanges: function() {
            if (this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)
                return;
            this.refresh()
        },_scrollbar: function(a) {
            var d = this, e;
            if (!d[a + "Scrollbar"]) {
                if (d[a + "ScrollbarWrapper"]) {
                    if (r)
                        d[a + "ScrollbarIndicator"].style[g] = "";
                    d[a + "ScrollbarWrapper"].parentNode.removeChild(d[a + "ScrollbarWrapper"]);
                    d[a + "ScrollbarWrapper"] = null;
                    d[a + "ScrollbarIndicator"] = null
                }
                return
            }
            if (!d[a + "ScrollbarWrapper"]) {
                e = b.createElement("div");
                if (d.options.scrollbarClass)
                    e.className = d.options.scrollbarClass + a.toUpperCase();
                else
                    e.style.cssText = "position:absolute;z-index:100;" + (a == "h" ? "height:7px;bottom:1px;left:2px;right:" + (d.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (d.hScrollbar ? "7" : "2") + "px;top:2px;right:1px");
                e.style.cssText += ";pointer-events:none;" + f + "transition-property:opacity;" + f + "transition-duration:" + (d.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (d.options.hideScrollbar ? "0" : "1");
                d.scrollbarContainer.appendChild(e);
                d[a + "ScrollbarWrapper"] = e;
                e = b.createElement("div");
                if (!d.options.scrollbarClass) {
                    e.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + f + "background-clip:padding-box;" + f + "box-sizing:border-box;" + (a == "h" ? "height:100%" : "width:100%") + ";" + f + "border-radius:3px;border-radius:3px"
                }
                e.style.cssText += ";pointer-events:none;" + f + "transition-property:" + f + "transform;" + f + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + f + "transition-duration:0;" + f + "transform: translate(0,0)" + B;
                if (d.options.useTransition)
                    e.style.cssText += ";" + f + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)";
                d[a + "ScrollbarWrapper"].appendChild(e);
                d[a + "ScrollbarIndicator"] = e
            }
            if (a == "h") {
                d.hScrollbarSize = d.hScrollbarWrapper.clientWidth;
                d.hScrollbarIndicatorSize = c.max(c.round(d.hScrollbarSize * d.hScrollbarSize / d.scrollerW), 8);
                d.hScrollbarIndicator.style.width = d.hScrollbarIndicatorSize + "px";
                d.hScrollbarMaxScroll = d.hScrollbarSize - d.hScrollbarIndicatorSize;
                d.hScrollbarProp = d.hScrollbarMaxScroll / d.maxScrollX
            } else {
                d.vScrollbarSize = d.vScrollbarWrapper.clientHeight;
                d.vScrollbarIndicatorSize = c.max(c.round(d.vScrollbarSize * d.vScrollbarSize / d.scrollerH), 8);
                d.vScrollbarIndicator.style.height = d.vScrollbarIndicatorSize + "px";
                d.vScrollbarMaxScroll = d.vScrollbarSize - d.vScrollbarIndicatorSize;
                d.vScrollbarProp = d.vScrollbarMaxScroll / d.maxScrollY
            }
            d._scrollbarPos(a, true)
        },_resize: function() {
            var a = this;
            setTimeout(function() {
                a.refresh()
            }, m ? 200 : 0)
        },_pos: function(a, b) {
            if (this.zoomed)
                return;
            a = this.hScroll ? a : 0;
            b = this.vScroll ? b : 0;
            if (this.options.useTransform) {
                this.scroller.style[g] = "translate(" + a + "px," + b + "px) scale(" + this.scale + ")" + B
            } else {
                a = c.round(a);
                b = c.round(b);
                this.scroller.style.left = a + "px";
                this.scroller.style.top = b + "px"
            }
            this.x = a;
            this.y = b;
            this._scrollbarPos("h");
            this._scrollbarPos("v")
        },_scrollbarPos: function(a, b) {
            var d = this, e = a == "h" ? d.x : d.y, f;
            if (!d[a + "Scrollbar"])
                return;
            e = d[a + "ScrollbarProp"] * e;
            if (e < 0) {
                if (!d.options.fixedScrollbar) {
                    f = d[a + "ScrollbarIndicatorSize"] + c.round(e * 3);
                    if (f < 8)
                        f = 8;
                    d[a + "ScrollbarIndicator"].style[a == "h" ? "width" : "height"] = f + "px"
                }
                e = 0
            } else if (e > d[a + "ScrollbarMaxScroll"]) {
                if (!d.options.fixedScrollbar) {
                    f = d[a + "ScrollbarIndicatorSize"] - c.round((e - d[a + "ScrollbarMaxScroll"]) * 3);
                    if (f < 8)
                        f = 8;
                    d[a + "ScrollbarIndicator"].style[a == "h" ? "width" : "height"] = f + "px";
                    e = d[a + "ScrollbarMaxScroll"] + (d[a + "ScrollbarIndicatorSize"] - f)
                } else {
                    e = d[a + "ScrollbarMaxScroll"]
                }
            }
            d[a + "ScrollbarWrapper"].style[l] = "0";
            d[a + "ScrollbarWrapper"].style.opacity = b && d.options.hideScrollbar ? "0" : "1";
            d[a + "ScrollbarIndicator"].style[g] = "translate(" + (a == "h" ? e + "px,0)" : "0," + e + "px)") + B
        },_start: function(b) {
            var d = this, e = q ? b.touches[0] : b, f, h, i, j, k;
            if (!d.enabled)
                return;
            if (d.options.onBeforeScrollStart)
                d.options.onBeforeScrollStart.call(d, b);
            if (d.options.useTransition || d.options.zoom)
                d._transitionTime(0);
            d.moved = false;
            d.animating = false;
            d.zoomed = false;
            d.distX = 0;
            d.distY = 0;
            d.absDistX = 0;
            d.absDistY = 0;
            d.dirX = 0;
            d.dirY = 0;
            if (d.options.zoom && q && b.touches.length > 1) {
                j = c.abs(b.touches[0].pageX - b.touches[1].pageX);
                k = c.abs(b.touches[0].pageY - b.touches[1].pageY);
                d.touchesDistStart = c.sqrt(j * j + k * k);
                d.originX = c.abs(b.touches[0].pageX + b.touches[1].pageX - d.wrapperOffsetLeft * 2) / 2 - d.x;
                d.originY = c.abs(b.touches[0].pageY + b.touches[1].pageY - d.wrapperOffsetTop * 2) / 2 - d.y;
                if (d.options.onZoomStart)
                    d.options.onZoomStart.call(d, b)
            }
            if (d.options.momentum) {
                if (d.options.useTransform) {
                    f = getComputedStyle(d.scroller, null)[g].replace(/[^0-9\-.,]/g, "").split(",");
                    h = +(f[12] || f[4]);
                    i = +(f[13] || f[5])
                } else {
                    h = +getComputedStyle(d.scroller, null).left.replace(/[^0-9-]/g, "");
                    i = +getComputedStyle(d.scroller, null).top.replace(/[^0-9-]/g, "")
                }
                if (h != d.x || i != d.y) {
                    if (d.options.useTransition)
                        d._unbind(y);
                    else
                        A(d.aniTime);
                    d.steps = [];
                    d._pos(h, i);
                    if (d.options.onScrollEnd)
                        d.options.onScrollEnd.call(d)
                }
            }
            d.absStartX = d.x;
            d.absStartY = d.y;
            d.startX = d.x;
            d.startY = d.y;
            d.pointX = e.pageX;
            d.pointY = e.pageY;
            d.startTime = b.timeStamp || Date.now();
            if (d.options.onScrollStart)
                d.options.onScrollStart.call(d, b);
            d._bind(v, a);
            d._bind(w, a);
            d._bind(x, a)
        },_move: function(a) {
            var b = this, d = q ? a.touches[0] : a, e = d.pageX - b.pointX, f = d.pageY - b.pointY, h = b.x + e, i = b.y + f, j, k, l, m = a.timeStamp || Date.now();
            if (b.options.onBeforeScrollMove)
                b.options.onBeforeScrollMove.call(b, a);
            if (b.options.zoom && q && a.touches.length > 1) {
                j = c.abs(a.touches[0].pageX - a.touches[1].pageX);
                k = c.abs(a.touches[0].pageY - a.touches[1].pageY);
                b.touchesDist = c.sqrt(j * j + k * k);
                b.zoomed = true;
                l = 1 / b.touchesDistStart * b.touchesDist * this.scale;
                if (l < b.options.zoomMin)
                    l = .5 * b.options.zoomMin * Math.pow(2, l / b.options.zoomMin);
                else if (l > b.options.zoomMax)
                    l = 2 * b.options.zoomMax * Math.pow(.5, b.options.zoomMax / l);
                b.lastScale = l / this.scale;
                h = this.originX - this.originX * b.lastScale + this.x;
                i = this.originY - this.originY * b.lastScale + this.y;
                this.scroller.style[g] = "translate(" + h + "px," + i + "px) scale(" + l + ")" + B;
                if (b.options.onZoom)
                    b.options.onZoom.call(b, a);
                return
            }
            b.pointX = d.pageX;
            b.pointY = d.pageY;
            if (h > 0 || h < b.maxScrollX) {
                h = b.options.bounce ? b.x + e / 2 : h >= 0 || b.maxScrollX >= 0 ? 0 : b.maxScrollX
            }
            if (i > b.minScrollY || i < b.maxScrollY) {
                i = b.options.bounce ? b.y + f / 2 : i >= b.minScrollY || b.maxScrollY >= 0 ? b.minScrollY : b.maxScrollY
            }
            b.distX += e;
            b.distY += f;
            b.absDistX = c.abs(b.distX);
            b.absDistY = c.abs(b.distY);
            if (b.absDistX < 6 && b.absDistY < 6) {
                return
            }
            if (b.options.lockDirection) {
                if (b.absDistX > b.absDistY + 5) {
                    i = b.y;
                    f = 0
                } else if (b.absDistY > b.absDistX + 5) {
                    h = b.x;
                    e = 0
                }
            }
            b.moved = true;
            b._pos(h, i);
            b.dirX = e > 0 ? -1 : e < 0 ? 1 : 0;
            b.dirY = f > 0 ? -1 : f < 0 ? 1 : 0;
            if (m - b.startTime > 300) {
                b.startTime = m;
                b.startX = b.x;
                b.startY = b.y
            }
            if (b.options.onScrollMove)
                b.options.onScrollMove.call(b, a)
        },_end: function(d) {
            if (q && d.touches.length !== 0)
                return;
            var e = this, f = q ? d.changedTouches[0] : d, h, j, k = {dist: 0,time: 0}, l = {dist: 0,time: 0}, m = (d.timeStamp || Date.now()) - e.startTime, n = e.x, o = e.y, p, r, s, t, u;
            e._unbind(v, a);
            e._unbind(w, a);
            e._unbind(x, a);
            if (e.options.onBeforeScrollEnd)
                e.options.onBeforeScrollEnd.call(e, d);
            if (e.zoomed) {
                u = e.scale * e.lastScale;
                u = Math.max(e.options.zoomMin, u);
                u = Math.min(e.options.zoomMax, u);
                e.lastScale = u / e.scale;
                e.scale = u;
                e.x = e.originX - e.originX * e.lastScale + e.x;
                e.y = e.originY - e.originY * e.lastScale + e.y;
                e.scroller.style[i] = "200ms";
                e.scroller.style[g] = "translate(" + e.x + "px," + e.y + "px) scale(" + e.scale + ")" + B;
                e.zoomed = false;
                e.refresh();
                if (e.options.onZoomEnd)
                    e.options.onZoomEnd.call(e, d);
                return
            }
            if (!e.moved) {
                if (q) {
                    if (e.doubleTapTimer && e.options.zoom) {
                        clearTimeout(e.doubleTapTimer);
                        e.doubleTapTimer = null;
                        if (e.options.onZoomStart)
                            e.options.onZoomStart.call(e, d);
                        e.zoom(e.pointX, e.pointY, e.scale == 1 ? e.options.doubleTapZoom : 1);
                        if (e.options.onZoomEnd) {
                            setTimeout(function() {
                                e.options.onZoomEnd.call(e, d)
                            }, 200)
                        }
                    } else if (this.options.handleClick) {
                        e.doubleTapTimer = setTimeout(function() {
                            e.doubleTapTimer = null;
                            h = f.target;
                            while (h.nodeType != 1)
                                h = h.parentNode;
                            if (h.tagName != "SELECT" && h.tagName != "INPUT" && h.tagName != "TEXTAREA") {
                                j = b.createEvent("MouseEvents");
                                j.initMouseEvent("click", true, true, d.view, 1, f.screenX, f.screenY, f.clientX, f.clientY, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, 0, null);
                                j._fake = true;
                                h.dispatchEvent(j)
                            }
                        }, e.options.zoom ? 250 : 0)
                    }
                }
                e._resetPos(400);
                if (e.options.onTouchEnd)
                    e.options.onTouchEnd.call(e, d);
                return
            }
            if (m < 300 && e.options.momentum) {
                k = n ? e._momentum(n - e.startX, m, -e.x, e.scrollerW - e.wrapperW + e.x, e.options.bounce ? e.wrapperW : 0) : k;
                l = o ? e._momentum(o - e.startY, m, -e.y, e.maxScrollY < 0 ? e.scrollerH - e.wrapperH + e.y - e.minScrollY : 0, e.options.bounce ? e.wrapperH : 0) : l;
                n = e.x + k.dist;
                o = e.y + l.dist;
                if (e.x > 0 && n > 0 || e.x < e.maxScrollX && n < e.maxScrollX)
                    k = {dist: 0,time: 0};
                if (e.y > e.minScrollY && o > e.minScrollY || e.y < e.maxScrollY && o < e.maxScrollY)
                    l = {dist: 0,time: 0}
            }
            if (k.dist || l.dist) {
                s = c.max(c.max(k.time, l.time), 10);
                if (e.options.snap) {
                    p = n - e.absStartX;
                    r = o - e.absStartY;
                    if (c.abs(p) < e.options.snapThreshold && c.abs(r) < e.options.snapThreshold) {
                        e.scrollTo(e.absStartX, e.absStartY, 200)
                    } else {
                        t = e._snap(n, o);
                        n = t.x;
                        o = t.y;
                        s = c.max(t.time, s)
                    }
                }
                e.scrollTo(c.round(n), c.round(o), s);
                if (e.options.onTouchEnd)
                    e.options.onTouchEnd.call(e, d);
                return
            }
            if (e.options.snap) {
                p = n - e.absStartX;
                r = o - e.absStartY;
                if (c.abs(p) < e.options.snapThreshold && c.abs(r) < e.options.snapThreshold)
                    e.scrollTo(e.absStartX, e.absStartY, 200);
                else {
                    t = e._snap(e.x, e.y);
                    if (t.x != e.x || t.y != e.y)
                        e.scrollTo(t.x, t.y, t.time)
                }
                if (e.options.onTouchEnd)
                    e.options.onTouchEnd.call(e, d);
                return
            }
            e._resetPos(200);
            if (e.options.onTouchEnd)
                e.options.onTouchEnd.call(e, d)
        },_resetPos: function(a) {
            var b = this, c, d;
            if (this.options.snap) {
                c = this.pagesX[this.currPageX];
                d = this.pagesY[this.currPageY]
            } else {
                c = this.x;
                d = this.y
            }
            c = c >= 0 ? 0 : c < this.maxScrollX ? this.maxScrollX : c;
            d = d >= this.minScrollY || this.maxScrollY > 0 ? this.minScrollY : d < this.maxScrollY ? this.maxScrollY : d;
            if (c == b.x && d == b.y) {
                if (b.moved) {
                    b.moved = false;
                    if (b.options.onScrollEnd)
                        b.options.onScrollEnd.call(b)
                }
                if (b.hScrollbar && b.options.hideScrollbar) {
                    if (e == "webkit")
                        b.hScrollbarWrapper.style[l] = "300ms";
                    b.hScrollbarWrapper.style.opacity = "0"
                }
                if (b.vScrollbar && b.options.hideScrollbar) {
                    if (e == "webkit")
                        b.vScrollbarWrapper.style[l] = "300ms";
                    b.vScrollbarWrapper.style.opacity = "0"
                }
                return
            }
            b.scrollTo(c, d, a || 0)
        },_wheel: function(a) {
            var b = this, c, d, e, f, g;
            if ("wheelDeltaX" in a) {
                c = a.wheelDeltaX / 12;
                d = a.wheelDeltaY / 12
            } else if ("wheelDelta" in a) {
                c = d = a.wheelDelta / 12
            } else if ("detail" in a) {
                c = d = -a.detail * 3
            } else {
                return
            }
            if (b.options.wheelAction == "zoom") {
                g = b.scale * Math.pow(2, 1 / 3 * (d ? d / Math.abs(d) : 0));
                if (g < b.options.zoomMin)
                    g = b.options.zoomMin;
                if (g > b.options.zoomMax)
                    g = b.options.zoomMax;
                if (g != b.scale) {
                    if (!b.wheelZoomCount && b.options.onZoomStart)
                        b.options.onZoomStart.call(b, a);
                    b.wheelZoomCount++;
                    b.zoom(a.pageX, a.pageY, g, 400);
                    setTimeout(function() {
                        b.wheelZoomCount--;
                        if (!b.wheelZoomCount && b.options.onZoomEnd)
                            b.options.onZoomEnd.call(b, a)
                    }, 400)
                }
                return
            }
            e = b.x + c;
            f = b.y + d;
            if (e > 0)
                e = 0;
            else if (e < b.maxScrollX)
                e = b.maxScrollX;
            if (f > b.minScrollY)
                f = b.minScrollY;
            else if (f < b.maxScrollY)
                f = b.maxScrollY;
            if (b.maxScrollY < 0) {
                b.scrollTo(e, f, 0)
            }
        },_transitionEnd: function(a) {
            var b = this;
            if (a.target != b.scroller)
                return;
            b._unbind(y);
            b._startAni()
        },_startAni: function() {
            var a = this, b = a.x, d = a.y, e = Date.now(), f, g, h;
            if (a.animating)
                return;
            if (!a.steps.length) {
                a._resetPos(400);
                return
            }
            f = a.steps.shift();
            if (f.x == b && f.y == d)
                f.time = 0;
            a.animating = true;
            a.moved = true;
            if (a.options.useTransition) {
                a._transitionTime(f.time);
                a._pos(f.x, f.y);
                a.animating = false;
                if (f.time)
                    a._bind(y);
                else
                    a._resetPos(0);
                return
            }
            h = function() {
                var i = Date.now(), j, k;
                if (i >= e + f.time) {
                    a._pos(f.x, f.y);
                    a.animating = false;
                    if (a.options.onAnimationEnd)
                        a.options.onAnimationEnd.call(a);
                    a._startAni();
                    return
                }
                i = (i - e) / f.time - 1;
                g = c.sqrt(1 - i * i);
                j = (f.x - b) * g + b;
                k = (f.y - d) * g + d;
                a._pos(j, k);
                if (a.animating)
                    a.aniTime = z(h)
            };
            h()
        },_transitionTime: function(a) {
            a += "ms";
            this.scroller.style[i] = a;
            if (this.hScrollbar)
                this.hScrollbarIndicator.style[i] = a;
            if (this.vScrollbar)
                this.vScrollbarIndicator.style[i] = a
        },_momentum: function(a, b, d, e, f) {
            var g = 6e-4, h = c.abs(a) / b, i = h * h / (2 * g), j = 0, k = 0;
            if (a > 0 && i > d) {
                k = f / (6 / (i / h * g));
                d = d + k;
                h = h * d / i;
                i = d
            } else if (a < 0 && i > e) {
                k = f / (6 / (i / h * g));
                e = e + k;
                h = h * e / i;
                i = e
            }
            i = i * (a < 0 ? -1 : 1);
            j = h / g;
            return {dist: i,time: c.round(j)}
        },_translatePos: function(a) {
            var b, c, d;
            var e = getComputedStyle(a, null)[g].replace(/[^0-9\-.,]/g, "").split(",");
            b = +(e[12] || e[4]) || 0;
            c = +(e[13] || e[5]) || 0;
            d = -(e[12] || e[4]) || 0;
            return {x: -b,y: -c,xOffset: d}
        },_offset: function(a) {
            var b = -a.offsetLeft, c = -a.offsetTop;
            while (a = a.offsetParent) {
                b -= a.offsetLeft;
                c -= a.offsetTop
            }
            if (a != this.wrapper) {
                b *= this.scale;
                c *= this.scale
            }
            return {left: b,top: c}
        },_snap: function(a, b) {
            var d = this, e, f, g, h, i, j;
            g = d.pagesX.length - 1;
            for (e = 0, f = d.pagesX.length; e < f; e++) {
                if (a >= d.pagesX[e]) {
                    g = e;
                    break
                }
            }
            if (g == d.currPageX && g > 0 && d.dirX < 0)
                g--;
            a = d.pagesX[g];
            i = c.abs(a - d.pagesX[d.currPageX]);
            i = i ? c.abs(d.x - a) / i * 500 : 0;
            d.currPageX = g;
            g = d.pagesY.length - 1;
            for (e = 0; e < g; e++) {
                if (b >= d.pagesY[e]) {
                    g = e;
                    break
                }
            }
            if (g == d.currPageY && g > 0 && d.dirY < 0)
                g--;
            b = d.pagesY[g];
            j = c.abs(b - d.pagesY[d.currPageY]);
            j = j ? c.abs(d.y - b) / j * 500 : 0;
            d.currPageY = g;
            h = c.round(c.max(i, j)) || 200;
            return {x: a,y: b,time: h}
        },_bind: function(a, b, c) {
            (b || this.scroller).addEventListener(a, this, !!c)
        },_unbind: function(a, b, c) {
            (b || this.scroller).removeEventListener(a, this, !!c)
        },destroy: function() {
            var b = this;
            b.scroller.style[g] = "";
            b.hScrollbar = false;
            b.vScrollbar = false;
            b._scrollbar("h");
            b._scrollbar("v");
            b._unbind(t, a);
            b._unbind(u);
            b._unbind(v, a);
            b._unbind(w, a);
            b._unbind(x, a);
            if (!b.options.hasTouch) {
                b._unbind("DOMMouseScroll");
                b._unbind("mousewheel")
            }
            if (b.options.useTransition)
                b._unbind(y);
            if (b.options.checkDOMChanges)
                clearInterval(b.checkDOMTime);
            if (b.options.onDestroy)
                b.options.onDestroy.call(b)
        },refresh: function() {
            var a = this, b, d, e, f, g = 0, h = 0;
            if (a.scale < a.options.zoomMin)
                a.scale = a.options.zoomMin;
            a.wrapperW = a.wrapper.clientWidth || 1;
            a.wrapperH = a.wrapper.clientHeight || 1;
            a.minScrollY = -a.options.topOffset || 0;
            a.scrollerW = c.round(a.scroller.offsetWidth * a.scale);
            a.scrollerH = c.round((a.scroller.offsetHeight + a.minScrollY) * a.scale);
            a.maxScrollX = a.wrapperW - a.scrollerW;
            a.maxScrollY = a.wrapperH - a.scrollerH + a.minScrollY;
            a.dirX = 0;
            a.dirY = 0;
            if (a.options.onRefresh)
                a.options.onRefresh.call(a);
            a.hScroll = a.options.hScroll && a.maxScrollX < 0;
            a.vScroll = a.options.vScroll && (!a.options.bounceLock && !a.hScroll || a.scrollerH > a.wrapperH);
            a.hScrollbar = a.hScroll && a.options.hScrollbar;
            a.vScrollbar = a.vScroll && a.options.vScrollbar && a.scrollerH > a.wrapperH;
            b = a._offset(a.wrapper);
            a.wrapperOffsetLeft = -b.left;
            a.wrapperOffsetTop = -b.top;
            if (typeof a.options.snap == "string") {
                a.pagesX = [];
                a.pagesY = [];
                f = a.scroller.querySelectorAll(a.options.snap);
                var j = a._translatePos(f[0]).xOffset;
                for (d = 0, e = f.length; d < e; d++) {
                    if (a.options.positionByTranslate) {
                        g = a._translatePos(f[d]);
                        g.x = g.x - j;
                        a.pagesX[d] = g.x < a.maxScrollX ? a.maxScrollX : g.x * a.scale;
                        a.pagesY[d] = g.y < a.maxScrollY ? a.maxScrollY : g.y * a.scale
                    } else {
                        g = a._offset(f[d]);
                        g.left += a.wrapperOffsetLeft;
                        g.top += a.wrapperOffsetTop;
                        a.pagesX[d] = g.left < a.maxScrollX ? a.maxScrollX : g.left * a.scale;
                        a.pagesY[d] = g.top < a.maxScrollY ? a.maxScrollY : g.top * a.scale
                    }
                }
            } else if (a.options.snap) {
                a.pagesX = [];
                while (g >= a.maxScrollX) {
                    a.pagesX[h] = g;
                    g = g - a.wrapperW;
                    h++
                }
                if (a.maxScrollX % a.wrapperW)
                    a.pagesX[a.pagesX.length] = a.maxScrollX - a.pagesX[a.pagesX.length - 1] + a.pagesX[a.pagesX.length - 1];
                g = 0;
                h = 0;
                a.pagesY = [];
                while (g >= a.maxScrollY) {
                    a.pagesY[h] = g;
                    g = g - a.wrapperH;
                    h++
                }
                if (a.maxScrollY % a.wrapperH)
                    a.pagesY[a.pagesY.length] = a.maxScrollY - a.pagesY[a.pagesY.length - 1] + a.pagesY[a.pagesY.length - 1]
            }
            a._scrollbar("h");
            a._scrollbar("v");
            if (!a.zoomed) {
                a.scroller.style[i] = "0";
                a._resetPos(400)
            }
        },scrollTo: function(a, b, c, d) {
            var e = this, f = a, g, h;
            e.stop();
            if (!f.length)
                f = [{x: a,y: b,time: c,relative: d}];
            for (g = 0, h = f.length; g < h; g++) {
                if (f[g].relative) {
                    f[g].x = e.x - f[g].x;
                    f[g].y = e.y - f[g].y
                }
                e.steps.push({x: f[g].x,y: f[g].y,time: f[g].time || 0})
            }
            e._startAni()
        },scrollToElement: function(a, b) {
            var d = this, e;
            a = a.nodeType ? a : d.scroller.querySelector(a);
            if (!a)
                return;
            e = d._offset(a);
            e.left += d.wrapperOffsetLeft;
            e.top += d.wrapperOffsetTop;
            e.left = e.left > 0 ? 0 : e.left < d.maxScrollX ? d.maxScrollX : e.left;
            e.top = e.top > d.minScrollY ? d.minScrollY : e.top < d.maxScrollY ? d.maxScrollY : e.top;
            b = b === undefined ? c.max(c.abs(e.left) * 2, c.abs(e.top) * 2) : b;
            d.scrollTo(e.left, e.top, b)
        },scrollToPage: function(a, b, c) {
            var d = this, e, f;
            c = c === undefined ? 400 : c;
            if (d.options.onScrollStart)
                d.options.onScrollStart.call(d);
            if (d.options.snap) {
                a = a == "next" ? d.currPageX + 1 : a == "prev" ? d.currPageX - 1 : a;
                b = b == "next" ? d.currPageY + 1 : b == "prev" ? d.currPageY - 1 : b;
                a = a < 0 ? 0 : a > d.pagesX.length - 1 ? d.pagesX.length - 1 : a;
                b = b < 0 ? 0 : b > d.pagesY.length - 1 ? d.pagesY.length - 1 : b;
                d.currPageX = a;
                d.currPageY = b;
                e = d.pagesX[a];
                f = d.pagesY[b]
            } else {
                e = -d.wrapperW * a;
                f = -d.wrapperH * b;
                if (e < d.maxScrollX)
                    e = d.maxScrollX;
                if (f < d.maxScrollY)
                    f = d.maxScrollY
            }
            d.scrollTo(e, f, c)
        },suspend: function() {
            var b = this;
            b.stop();
            b.enabled = false;
            b._unbind(t, a);
            b._unbind(u);
            b._unbind(v, a);
            b._unbind(w, a);
            b._unbind(x, a);
            if (!b.options.hasTouch) {
                b._unbind("DOMMouseScroll");
                b._unbind("mousewheel")
            }
        },disable: function() {
            this.stop();
            this._resetPos(0);
            this.enabled = false;
            this._unbind(v, a);
            this._unbind(w, a);
            this._unbind(x, a)
        },enable: function() {
            var b = this;
            b.enabled = true;
            b._bind(w, a);
            b._bind(x, a);
            b.refresh();
            b._bind(t, a);
            b._bind(u);
            if (!q) {
                if (b.options.wheelAction != "none") {
                    b._bind("DOMMouseScroll");
                    b._bind("mousewheel")
                }
            }
        },stop: function() {
            if (this.options.useTransition)
                this._unbind(y);
            else
                A(this.aniTime);
            this.steps = [];
            this.moved = false;
            this.animating = false
        },zoom: function(a, b, c, d) {
            var e = this, f = c / e.scale;
            if (!e.options.useTransform)
                return;
            e.zoomed = true;
            d = d === undefined ? 200 : d;
            a = a - e.wrapperOffsetLeft - e.x;
            b = b - e.wrapperOffsetTop - e.y;
            e.x = a - a * f + e.x;
            e.y = b - b * f + e.y;
            e.scale = c;
            e.refresh();
            e.x = e.x > 0 ? 0 : e.x < e.maxScrollX ? e.maxScrollX : e.x;
            e.y = e.y > e.minScrollY ? e.minScrollY : e.y < e.maxScrollY ? e.maxScrollY : e.y;
            e.scroller.style[i] = d + "ms";
            e.scroller.style[g] = "translate(" + e.x + "px," + e.y + "px) scale(" + c + ")" + B;
            e.zoomed = false
        },isReady: function() {
            return !this.moved && !this.zoomed && !this.animating
        }};
    function D(a) {
        if (e === "")
            return a;
        a = a.charAt(0).toUpperCase() + a.substr(1);
        return e + a
    }
    d = null;
    if (typeof exports !== "undefined")
        exports.iScroll = C;
    else
        a.iScroll = C
})(window, document);
var DeviceInfo;
DeviceInfo = {initCompleted: !1,isWebkit: !1,isMobilePhone: !1,isIphone: !1,isAndroid: !1,isAndroidPhone: !1,isTierTablet: !1,isTierIphone: !1,isTierRichCss: !1,isTierGenericMobile: !1,engineWebKit: "webkit",deviceIphone: "iphone",deviceIpod: "ipod",deviceIpad: "ipad",deviceMacPpc: "macintosh",deviceAndroid: "android",deviceGoogleTV: "googletv",deviceHtcFlyer: "htc_flyer",deviceNuvifone: "nuvifone",deviceSymbian: "symbian",deviceSymbos: "symbos",deviceS60: "series60",deviceS70: "series70",deviceS80: "series80",deviceS90: "series90",deviceWinPhone7: "windows phone os 7",deviceWinMob: "windows ce",deviceWindows: "windows",deviceIeMob: "iemobile",devicePpc: "ppc",enginePie: "wm5 pie",deviceBB: "blackberry",vndRIM: "vnd.rim",deviceBBStorm: "blackberry95",deviceBBBold: "blackberry97",deviceBBBoldTouch: "blackberry 99",deviceBBTour: "blackberry96",deviceBBCurve: "blackberry89",deviceBBCurveTouch: "blackberry 938",deviceBBTorch: "blackberry 98",deviceBBPlaybook: "playbook",devicePalm: "palm",deviceWebOS: "webos",deviceWebOShp: "hpwos",deviceBada: "bada",engineBlazer: "blazer",engineXiino: "xiino",deviceKindle: "kindle",engineSilk: "silk",vndwap: "vnd.wap",wml: "wml",deviceTablet: "tablet",deviceBrew: "brew",deviceDanger: "danger",deviceHiptop: "hiptop",devicePlaystation: "playstation",deviceNintendoDs: "nitro",deviceNintendo: "nintendo",deviceArchos: "archos",engineOpera: "opera",engineNetfront: "netfront",engineUpBrowser: "up.browser",deviceMidp: "midp",uplink: "up.link",engineTelecaQ: "teleca q",engineObigo: "obigo",devicePda: "pda",mini: "mini",mobile: "mobile",mobi: "mobi",maemo: "maemo",linux: "linux",mylocom2: "sony/com",manuSonyEricsson: "sonyericsson",manuericsson: "ericsson",manuSamsung1: "sec-sgh",manuSony: "sony",manuHtc: "htc",svcDocomo: "docomo",svcKddi: "kddi",svcVodafone: "vodafone",disUpdate: "update",iE: "msie",uagent: "",startDetection: function() {
        this.initCompleted = !1;
        navigator && navigator.userAgent && (this.uagent = navigator.userAgent.toLowerCase());
        this.isWebkit = this.detectWebkit();
        this.isIphone = this.detectIphone();
        this.isAndroid = this.detectAndroid();
        this.isAndroidPhone = this.detectAndroidPhone();
        this.isTierTablet = this.detectTierTablet();
        this.isMobilePhone = this.detectMobileQuick();
        this.isTierIphone = this.detectTierIphone();
        this.initCompleted = !0
    },detectSmartphone: function() {
        return this.detectIphoneOrIpod() || this.detectAndroidPhone() || this.detectS60OssBrowser() || this.detectSymbianOS() || this.detectWindowsMobile() || this.detectWindowsPhone7() || this.detectBlackBerry() || this.detectPalmWebOS() || this.detectPalmOS() || this.detectBada() ? !0 : !1
    },detectMobileQuick: function() {
        return this.initCompleted || this.isMobilePhone ? this.isMobilePhone : this.detectTierTablet() ? !1 : this.detectSmartphone() ? !0 : this.detectKindle() || this.detectAmazonSilk() ? !0 : this.uagent.search(this.mobile) > -1 ? !0 : this.uagent.search(this.deviceMidp) > -1 || this.detectBrewDevice() ? !0 : this.detectOperaMobile() || this.detectArchos() ? !0 : this.uagent.search(this.engineObigo) > -1 || this.uagent.search(this.engineNetfront) > -1 || this.uagent.search(this.engineUpBrowser) > -1 ? !0 : !1
    },detectTierTablet: function() {
        return this.initCompleted || this.isTierTablet ? this.isTierTablet : this.detectIpad() || this.detectAndroidTablet() || this.detectBlackBerryTablet() || this.detectWebOSTablet() ? !0 : !1
    },detectTierIphone: function() {
        return this.initCompleted || this.isTierIphone ? this.isTierIphone : this.detectIphoneOrIpod() || this.detectAndroidPhone() || this.detectWindowsPhone7() || this.detectBlackBerryWebKit() && this.detectBlackBerryTouch() || this.detectPalmWebOS() || this.detectBada() || this.detectGarminNuvifone() ? !0 : !1
    },detectIphone: function() {
        return this.initCompleted || this.isIphone ? this.isIphone : this.uagent.search(this.deviceIphone) > -1 ? this.detectIpad() || this.detectIpod() ? !1 : !0 : !1
    },detectIpod: function() {
        return this.uagent.search(this.deviceIpod) > -1 ? !0 : !1
    },detectIphoneOrIpod: function() {
        return this.uagent.search(this.deviceIphone) > -1 || this.uagent.search(this.deviceIpod) > -1 ? !0 : !1
    },detectIpad: function() {
        return this.uagent.search(this.deviceIpad) > -1 && this.detectWebkit() ? !0 : !1
    },detectIos: function() {
        return this.detectIphoneOrIpod() || this.detectIpad() ? !0 : !1
    },detectAndroid: function() {
        return this.initCompleted || this.isAndroid ? this.isAndroid : this.uagent.search(this.deviceAndroid) > -1 || this.detectGoogleTV() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },detectAndroidPhone: function() {
        return this.initCompleted || this.isAndroidPhone ? this.isAndroidPhone : this.detectAndroid() && this.uagent.search(this.mobile) > -1 ? !0 : this.detectOperaAndroidPhone() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },detectAndroidTablet: function() {
        return this.detectAndroid() ? this.detectOperaMobile() ? !1 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !1 : this.uagent.search(this.mobile) > -1 ? !1 : !0 : !1
    },detectGoogleTV: function() {
        return this.uagent.search(this.deviceGoogleTV) > -1 ? !0 : !1
    },detectWebkit: function() {
        return this.initCompleted || this.isWebkit ? this.isWebkit : this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },detectS60OssBrowser: function() {
        return this.detectWebkit() ? this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbian) > -1 ? !0 : !1 : !1
    },detectSymbianOS: function() {
        return this.uagent.search(this.deviceSymbian) > -1 || this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbos) > -1 && this.detectOperaMobile || this.uagent.search(this.deviceS70) > -1 || this.uagent.search(this.deviceS80) > -1 || this.uagent.search(this.deviceS90) > -1 ? !0 : !1
    },detectWindowsPhone7: function() {
        return this.uagent.search(this.deviceWinPhone7) > -1 ? !0 : !1
    },detectWindowsMobile: function() {
        return this.detectWindowsPhone7() ? !1 : this.uagent.search(this.deviceWinMob) > -1 || this.uagent.search(this.deviceIeMob) > -1 || this.uagent.search(this.enginePie) > -1 ? !0 : this.uagent.search(this.devicePpc) > -1 && !(this.uagent.search(this.deviceMacPpc) > -1) ? !0 : this.uagent.search(this.manuHtc) > -1 && this.uagent.search(this.deviceWindows) > -1 ? !0 : !1
    },detectBlackBerry: function() {
        return this.uagent.search(this.deviceBB) > -1 || this.uagent.search(this.vndRIM) > -1 ? !0 : !1
    },detectBlackBerryTablet: function() {
        return this.uagent.search(this.deviceBBPlaybook) > -1 ? !0 : !1
    },detectBlackBerryWebKit: function() {
        return this.detectBlackBerry() && this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },detectBlackBerryTouch: function() {
        return this.detectBlackBerry() && (this.uagent.search(this.deviceBBStorm) > -1 || this.uagent.search(this.deviceBBTorch) > -1 || this.uagent.search(this.deviceBBBoldTouch) > -1 || this.uagent.search(this.deviceBBCurveTouch) > -1) ? !0 : !1
    },detectPalmOS: function() {
        return this.detectPalmWebOS() ? !1 : this.uagent.search(this.devicePalm) > -1 || this.uagent.search(this.engineBlazer) > -1 || this.uagent.search(this.engineXiino) > -1 ? !0 : !1
    },detectPalmWebOS: function() {
        return this.uagent.search(this.deviceWebOS) > -1 ? !0 : !1
    },detectWebOSTablet: function() {
        return this.uagent.search(this.deviceWebOShp) > -1 && this.uagent.search(this.deviceTablet) > -1 ? !0 : !1
    },detectOperaMobile: function() {
        return this.uagent.search(this.engineOpera) > -1 && (this.uagent.search(this.mini) > -1 || this.uagent.search(this.mobi) > -1) ? !0 : !1
    },detectOperaAndroidPhone: function() {
        return this.uagent.search(this.engineOpera) > -1 && this.uagent.search(this.deviceAndroid) > -1 && this.uagent.search(this.mobi) > -1 ? !0 : !1
    },detectKindle: function() {
        return this.uagent.search(this.deviceKindle) > -1 && !this.detectAndroid() ? !0 : !1
    },detectAmazonSilk: function() {
        return this.uagent.search(this.engineSilk) > -1 ? !0 : !1
    },detectBada: function() {
        return this.uagent.search(this.deviceBada) > -1 ? !0 : !1
    },detectGarminNuvifone: function() {
        return this.uagent.search(this.deviceNuvifone) > -1 ? !0 : !1
    },detectArchos: function() {
        return this.uagent.search(this.deviceArchos) > -1 ? !0 : !1
    },detectBrewDevice: function() {
        return this.uagent.search(this.deviceBrew) > -1 ? !0 : !1
    },detectInternetExplorer: function() {
        return this.uagent.search(this.iE) > -1 ? !0 : !1
    }};
DeviceInfo.startDetection();
var ComplexDetection;
ComplexDetection = {userA: navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase(),getUserAgent: function() {
        return this.userA
    },getScreenSize: function() {
        return {width: screen.width,height: screen.height}
    },getScreenHeight: function() {
        return screen.height
    },getScreenWidth: function() {
        return screen.width
    },getBrowserSize: function() {
        return {width: $(window).width(),height: $(window).height()}
    },getBrowserHeight: function() {
        return window.innerHeight || $("body").height()
    },getBrowserWidth: function() {
        return window.innerWidth || $("body").width()
    },getDevice: function() {
        var a = this.userA.match(/ipad|iphone|android/) != null || screen.width <= 480;
        var b = a ? "mobile" : "desktop";
        b = DeviceInfo.detectTierTablet() ? "tablet" : b;
        return b
    },getOsVersion: function() {
        if (DeviceInfo.detectAndroid()) {
            return parseFloat(this.userA.slice(this.userA.indexOf("android") + 8))
        } else if (DeviceInfo.detectIphone() || DeviceInfo.detectIpad()) {
            return this.userA.substr(this.userA.indexOf("os ") + 3, 3).replace("_", ".")
        } else {
            return false
        }
    },getOs: function() {
        var a = this.userA;
        if (DeviceInfo.detectIos())
            return "iOS";
        else if (DeviceInfo.detectAndroid())
            return "android";
        else if (a.match(/blackberry/))
            return "blackberry";
        else if (a.match(/macintosh/))
            return "macOS";
        else
            return "windows"
    },getBrowser: function() {
        var a = navigator.appName, b = navigator.userAgent, c;
        var d = b.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (d && (c = b.match(/version\/([\.\d]+)/i)) != null)
            d[2] = c[1];
        d = d ? [d[1], d[2]] : [a, navigator.appVersion, "-?"];
        if (d[0] === "MSIE")
            d[0] = "internet explorer";
        if (!this.isDesktop()) {
            var e = "Chrome";
            var f = navigator.userAgent.indexOf(e);
            if (f < 0) {
                e = "CriOS";
                f = navigator.userAgent.indexOf(e)
            }
            if (f > 0) {
                d[0] = "chrome";
                var g, h;
                g = f + e.length + 1;
                h = g + 2;
                d[1] = parseInt(navigator.userAgent.substring(g, h))
            }
        }
        return {name: d[0],version: d[1]}
    },getBrowserName: function() {
        var a = this.getBrowser();
        return a.name.toLowerCase()
    },getBrowserVersion: function() {
        var a = this.getBrowser();
        return parseFloat(a.version)
    },isMobile: function() {
        return DeviceInfo.detectMobileQuick()
    },isDesktop: function() {
        return !DeviceInfo.detectMobileQuick() && !DeviceInfo.detectTierTablet()
    },isAndroid: function() {
        return DeviceInfo.detectAndroid()
    },isIos: function() {
        return DeviceInfo.detectIos()
    },isIphone: function() {
        return DeviceInfo.detectIphone()
    },isIpad: function() {
        return DeviceInfo.detectIpad()
    },isIpod: function() {
        return DeviceInfo.detectIpod()
    },isTablet: function() {
        return DeviceInfo.detectTierTablet()
    },isAndroidTablet: function() {
        return DeviceInfo.detectAndroidTablet()
    },isBlackBerryTablet: function() {
        return DeviceInfo.detectBlackBerryTablet()
    },isSymbian: function() {
        return DeviceInfo.detectSymbianOS()
    },isBlackBerry: function() {
        return DeviceInfo.detectBlackBerry()
    },isInternetExplorer: function() {
        return DeviceInfo.detectInternetExplorer()
    },isInternetExplorer6: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "6.0"
    },isInternetExplorer7: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "7.0"
    },isInternetExplorer8: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "8.0"
    },isInternetExplorer9: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "9"
    },isInternetExplorer10: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "10"
    },isWindows: function() {
        if (this.getOs() == "windows") {
            return true
        } else {
            return false
        }
    },isChrome: function() {
        if (this.getBrowserName() == "chrome") {
            return true
        } else {
            return false
        }
    },isFirefox: function() {
        if (this.getBrowserName().toLowerCase() == "firefox") {
            return true
        } else {
            return false
        }
    },isChromeBook: function() {
        var a = this.userA.search("cros");
        if (a > 0 && this.isDesktop()) {
            return true
        } else {
            return false
        }
    },isLandscape: function() {
        var a = window.innerWidth || $("body").width();
        var b = window.innerHeight || $("body").height();
        if (a > b)
            return true;
        return false
    },isPortrait: function() {
        var a = window.innerWidth || $("body").width();
        var b = window.innerHeight || $("body").height();
        if (a < b)
            return true;
        return false
    }};
if (!Function.prototype.bind) {
    Function.prototype.bind = function(a) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
        }
        var b = Array.prototype.slice.call(arguments, 1), c = this, d = function() {
        }, e = function() {
            return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        };
        d.prototype = this.prototype;
        e.prototype = new d;
        return e
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(a) {
        "use strict";
        if (this == null) {
            throw new TypeError
        }
        var b = Object(this);
        var c = b.length >>> 0;
        if (c === 0) {
            return -1
        }
        var d = 0;
        if (arguments.length > 1) {
            d = Number(arguments[1]);
            if (d != d) {
                d = 0
            } else if (d != 0 && d != Infinity && d != -Infinity) {
                d = (d > 0 || -1) * Math.floor(Math.abs(d))
            }
        }
        if (d >= c) {
            return -1
        }
        var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0);
        for (; e < c; e++) {
            if (e in b && b[e] === a) {
                return e
            }
        }
        return -1
    }
}
(function(a) {
    "use strict";
    var b, c;
    var d = {};
    var e = function() {
    };
    var f = "memory".split(",");
    var g = ("assert,count,debug,dir,dirxml,error,exception,group," + "groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd," + "time,timeEnd,trace,warn").split(",");
    while (b = f.pop())
        a[b] = a[b] || d;
    while (c = g.pop())
        a[c] = a[c] || e
})(window.console = window.console || {});
(function() {
    var a = 0;
    var b = ["ms", "moz", "webkit", "o"];
    for (var c = 0; c < b.length && !window.requestAnimationFrame; ++c) {
        window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"];
        window.cancelRequestAnimationFrame = window[b[c] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(b, c) {
            var d = (new Date).getTime();
            var e = Math.max(0, 16 - (d - a));
            var f = window.setTimeout(function() {
                b(d + e)
            }, e);
            a = d + e;
            return f
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        }
})();
if (!Date.now) {
    Date.now = function a() {
        return (new Date).getTime()
    }
}
window.performance = window.performance || {};
performance.now = function() {
    return performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
        return Date.now()
    }
}();
(function() {
    var a = this.createjs = this.createjs || {}, a = a.PreloadJS = a.PreloadJS || {};
    a.version = "0.3.1";
    a.buildDate = "Thu, 09 May 2013 22:04:32 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.initialize()
    }, b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener;
        a.removeEventListener = b.removeEventListener;
        a.removeAllEventListeners = b.removeAllEventListeners;
        a.hasEventListener = b.hasEventListener;
        a.dispatchEvent = b.dispatchEvent
    };
    b._listeners = null;
    b.initialize = function() {
    };
    b.addEventListener = function(a, b) {
        var c = this._listeners;
        c ? this.removeEventListener(a, b) : c = this._listeners = {};
        var d = c[a];
        d || (d = c[a] = []);
        d.push(b);
        return b
    };
    b.removeEventListener = function(a, b) {
        var c = this._listeners;
        if (c) {
            var d = c[a];
            if (d)
                for (var e = 0, f = d.length; e < f; e++)
                    if (d[e] == b) {
                        f == 1 ? delete c[a] : d.splice(e, 1);
                        break
                    }
        }
    };
    b.removeAllEventListeners = function(a) {
        a ? this._listeners && delete this._listeners[a] : this._listeners = null
    };
    b.dispatchEvent = function(a, b) {
        var c = false, d = this._listeners;
        if (a && d) {
            typeof a == "string" && (a = {type: a});
            d = d[a.type];
            if (!d)
                return c;
            a.target = b || this;
            for (var d = d.slice(), e = 0, f = d.length; e < f; e++)
                var g = d[e], c = g.handleEvent ? c || g.handleEvent(a) : c || g(a)
        }
        return !!c
    };
    b.hasEventListener = function(a) {
        var b = this._listeners;
        return !(!b || !b[a])
    };
    b.toString = function() {
        return "[EventDispatcher]"
    };
    createjs.EventDispatcher = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function() {
        this.init()
    };
    a.prototype = {};
    var b = a.prototype;
    a.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    b.loaded = false;
    b.canceled = false;
    b.progress = 0;
    b._item = null;
    b._basePath = null;
    b.onProgress = null;
    b.onLoadStart = null;
    b.onComplete = null;
    b.onError = null;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    b._listeners = null;
    createjs.EventDispatcher.initialize(b);
    b.getItem = function() {
        return this._item
    };
    b.init = function() {
    };
    b.load = function() {
    };
    b.close = function() {
    };
    b._sendLoadStart = function() {
        this._isCanceled() || (this.onLoadStart && this.onLoadStart({target: this}), this.dispatchEvent("loadStart"), this.dispatchEvent("loadstart"))
    };
    b._sendProgress = function(a) {
        if (!this._isCanceled()) {
            var b = null;
            if (typeof a == "number")
                this.progress = a, b = {loaded: this.progress,total: 1};
            else if (b = a, this.progress = a.loaded / a.total, isNaN(this.progress) || this.progress == Infinity)
                this.progress = 0;
            b.target = this;
            b.type = "progress";
            b.progress = this.progress;
            this.onProgress && this.onProgress(b);
            this.dispatchEvent(b)
        }
    };
    b._sendComplete = function() {
        this._isCanceled() || (this.onComplete && this.onComplete({target: this}), this.dispatchEvent("complete"))
    };
    b._sendError = function(a) {
        if (!this._isCanceled())
            a == null && (a = {}), a.target = this, a.type = "error", this.onError && this.onError(a), this.dispatchEvent(a)
    };
    b._isCanceled = function() {
        return window.createjs == null || this.canceled ? true : false
    };
    b._parseURI = function(b) {
        return !b ? null : b.match(a.FILE_PATTERN)
    };
    b._formatQueryString = function(a, b) {
        if (a == null)
            throw Error("You must specify data.");
        var c = [], d;
        for (d in a)
            c.push(d + "=" + escape(a[d]));
        b && (c = c.concat(b));
        return c.join("&")
    };
    b.buildPath = function(a, b, c) {
        if (b != null) {
            var d = this._parseURI(a);
            if (d[1] == null || d[1] == "")
                a = b + a
        }
        if (c == null)
            return a;
        b = [];
        d = a.indexOf("?");
        if (d != -1)
            var e = a.slice(d + 1), b = b.concat(e.split("&"));
        return d != -1 ? a.slice(0, d) + "?" + this._formatQueryString(c, b) : a + "?" + this._formatQueryString(c, b)
    };
    b.toString = function() {
        return "[PreloadJS AbstractLoader]"
    };
    createjs.AbstractLoader = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b) {
        this.init(a, b)
    }, b = a.prototype = new createjs.AbstractLoader;
    a.LOAD_TIMEOUT = 8e3;
    a.BINARY = "binary";
    a.CSS = "css";
    a.IMAGE = "image";
    a.JAVASCRIPT = "javascript";
    a.JSON = "json";
    a.JSONP = "jsonp";
    a.SOUND = "sound";
    a.SVG = "svg";
    a.TEXT = "text";
    a.XML = "xml";
    a.POST = "POST";
    a.GET = "GET";
    b.useXHR = true;
    b.stopOnError = false;
    b.maintainScriptOrder = true;
    b.next = null;
    b.onFileLoad = null;
    b.onFileProgress = null;
    b._typeCallbacks = null;
    b._extensionCallbacks = null;
    b._loadStartWasDispatched = false;
    b._maxConnections = 1;
    b._currentlyLoadingScript = null;
    b._currentLoads = null;
    b._loadQueue = null;
    b._loadQueueBackup = null;
    b._loadItemsById = null;
    b._loadItemsBySrc = null;
    b._loadedResults = null;
    b._loadedRawResults = null;
    b._numItems = 0;
    b._numItemsLoaded = 0;
    b._scriptOrder = null;
    b._loadedScripts = null;
    b.init = function(a, b) {
        this._numItems = this._numItemsLoaded = 0;
        this._loadStartWasDispatched = this._paused = false;
        this._currentLoads = [];
        this._loadQueue = [];
        this._loadQueueBackup = [];
        this._scriptOrder = [];
        this._loadedScripts = [];
        this._loadItemsById = {};
        this._loadItemsBySrc = {};
        this._loadedResults = {};
        this._loadedRawResults = {};
        this._typeCallbacks = {};
        this._extensionCallbacks = {};
        this._basePath = b;
        this.setUseXHR(a)
    };
    b.setUseXHR = function(a) {
        return this.useXHR = a != false && window.XMLHttpRequest != null
    };
    b.removeAll = function() {
        this.remove()
    };
    b.remove = function(a) {
        var b = null;
        a && !(a instanceof Array) ? b = [a] : a && (b = a);
        a = false;
        if (b) {
            for (; b.length; ) {
                for (var c = b.pop(), d = this.getResult(c), e = this._loadQueue.length - 1; e >= 0; e--)
                    if (f = this._loadQueue[e].getItem(), f.id == c || f.src == c) {
                        this._loadQueue.splice(e, 1)[0].cancel();
                        break
                    }
                for (e = this._loadQueueBackup.length - 1; e >= 0; e--)
                    if (f = this._loadQueueBackup[e].getItem(), f.id == c || f.src == c) {
                        this._loadQueueBackup.splice(e, 1)[0].cancel();
                        break
                    }
                if (d)
                    delete this._loadItemsById[d.id], delete this._loadItemsBySrc[d.src], this._disposeItem(d);
                else
                    for (var e = this._currentLoads.length - 1; e >= 0; e--) {
                        var f = this._currentLoads[e].getItem();
                        if (f.id == c || f.src == c) {
                            this._currentLoads.splice(e, 1)[0].cancel();
                            a = true;
                            break
                        }
                    }
            }
            a && this._loadNext()
        } else {
            this.close();
            for (c in this._loadItemsById)
                this._disposeItem(this._loadItemsById[c]);
            this.init(this.useXHR)
        }
    };
    b.reset = function() {
        this.close();
        for (var a in this._loadItemsById)
            this._disposeItem(this._loadItemsById[a]);
        a = [];
        for (i = 0, l = this._loadQueueBackup.length; i < l; i++)
            a.push(this._loadQueueBackup[i].getItem());
        this.loadManifest(a, false)
    };
    a.isBinary = function(a) {
        switch (a) {
            case createjs.LoadQueue.IMAGE:
            case createjs.LoadQueue.BINARY:
                return true;
            default:
                return false
        }
    };
    b.installPlugin = function(a) {
        if (!(a == null || a.getPreloadHandlers == null)) {
            a = a.getPreloadHandlers();
            if (a.types != null)
                for (var b = 0, c = a.types.length; b < c; b++)
                    this._typeCallbacks[a.types[b]] = a.callback;
            if (a.extensions != null)
                for (b = 0, c = a.extensions.length; b < c; b++)
                    this._extensionCallbacks[a.extensions[b]] = a.callback
        }
    };
    b.setMaxConnections = function(a) {
        this._maxConnections = a;
        !this._paused && this._loadQueue.length > 0 && this._loadNext()
    };
    b.loadFile = function(a, b, c) {
        a == null ? this._sendError({text: "PRELOAD_NO_FILE"}) : (this._addItem(a, c), b !== false ? this.setPaused(false) : this.setPaused(true))
    };
    b.loadManifest = function(a, b, c) {
        var d = null;
        if (a instanceof Array) {
            if (a.length == 0) {
                this._sendError({text: "PRELOAD_MANIFEST_EMPTY"});
                return
            }
            d = a
        } else {
            if (a == null) {
                this._sendError({text: "PRELOAD_MANIFEST_NULL"});
                return
            }
            d = [a]
        }
        for (var a = 0, e = d.length; a < e; a++)
            this._addItem(d[a], c);
        b !== false ? this.setPaused(false) : this.setPaused(true)
    };
    b.load = function() {
        this.setPaused(false)
    };
    b.getItem = function(a) {
        return this._loadItemsById[a] || this._loadItemsBySrc[a]
    };
    b.getResult = function(a, b) {
        var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
        if (c == null)
            return null;
        c = c.id;
        return b && this._loadedRawResults[c] ? this._loadedRawResults[c] : this._loadedResults[c]
    };
    b.setPaused = function(a) {
        (this._paused = a) || this._loadNext()
    };
    b.close = function() {
        for (; this._currentLoads.length; )
            this._currentLoads.pop().cancel();
        this._scriptOrder.length = 0;
        this._loadedScripts.length = 0;
        this.loadStartWasDispatched = false
    };
    b._addItem = function(a, b) {
        var c = this._createLoadItem(a);
        if (c != null) {
            var d = this._createLoader(c, b);
            d != null && (this._loadQueue.push(d), this._loadQueueBackup.push(d), this._numItems++, this._updateProgress(), this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT && d instanceof createjs.XHRLoader && (this._scriptOrder.push(c), this._loadedScripts.push(null)))
        }
    };
    b._createLoadItem = function(a) {
        var b = null;
        switch (typeof a) {
            case "string":
                b = {src: a};
                break;
            case "object":
                b = window.HTMLAudioElement && a instanceof HTMLAudioElement ? {tag: a,src: b.tag.src,type: createjs.LoadQueue.SOUND} : a
        }
        a = this._parseURI(b.src);
        if (a != null)
            b.ext = a[5];
        if (b.type == null)
            b.type = this._getTypeByExtension(b.ext);
        if (b.type == createjs.LoadQueue.JSON && b.callback != null)
            b.type = createjs.LoadQueue.JSONP;
        if (b.type == createjs.LoadQueue.JSONP && b.callback == null)
            throw Error("callback is required for loading JSONP requests.");
        if (b.tag == null)
            b.tag = this._createTag(b.type);
        if (b.id == null || b.id == "")
            b.id = b.src;
        if (a = this._typeCallbacks[b.type] || this._extensionCallbacks[b.ext]) {
            a = a(b.src, b.type, b.id, b.data);
            if (a === false)
                return null;
            else if (a !== true) {
                if (a.src != null)
                    b.src = a.src;
                if (a.id != null)
                    b.id = a.id;
                if (a.tag != null && a.tag.load instanceof Function)
                    b.tag = a.tag;
                if (a.completeHandler != null)
                    b.completeHandler = a.completeHandler
            }
            if (a.type)
                b.type = a.type;
            a = this._parseURI(b.src);
            if (a != null && a[5] != null)
                b.ext = a[5].toLowerCase()
        }
        this._loadItemsById[b.id] = b;
        return this._loadItemsBySrc[b.src] = b
    };
    b._createLoader = function(a, b) {
        var c = this.useXHR;
        switch (a.type) {
            case createjs.LoadQueue.JSON:
            case createjs.LoadQueue.XML:
            case createjs.LoadQueue.TEXT:
                c = true;
                break;
            case createjs.LoadQueue.SOUND:
            case createjs.LoadQueue.JSONP:
                c = false
        }
        if (b == null)
            b = this._basePath;
        return c ? new createjs.XHRLoader(a, b) : new createjs.TagLoader(a, b)
    };
    b._loadNext = function() {
        if (!this._paused) {
            if (!this._loadStartWasDispatched)
                this._sendLoadStart(), this._loadStartWasDispatched = true;
            if (this._numItems == this._numItemsLoaded)
                this.loaded = true, this._sendComplete(), this.next && this.next.load && this.next.load();
            for (var a = 0, b = this._loadQueue.length; a < b; a++) {
                if (this._currentLoads.length >= this._maxConnections)
                    break;
                var c = this._loadQueue[a];
                if (this.maintainScriptOrder && c instanceof createjs.TagLoader && c.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
                    if (this._currentlyLoadingScript)
                        continue;
                    this._currentlyLoadingScript = true
                }
                this._loadQueue.splice(a, 1);
                a--;
                b--;
                this._loadItem(c)
            }
        }
    };
    b._loadItem = function(a) {
        a.addEventListener("progress", createjs.proxy(this._handleProgress, this));
        a.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
        a.addEventListener("error", createjs.proxy(this._handleFileError, this));
        this._currentLoads.push(a);
        this._sendFileStart(a.getItem());
        a.load()
    };
    b._handleFileError = function(a) {
        var b = a.target;
        this._numItemsLoaded++;
        this._updateProgress();
        a = {item: b.getItem()};
        this._sendError(a);
        this.stopOnError || (this._removeLoadItem(b), this._loadNext())
    };
    b._handleFileComplete = function(a) {
        var a = a.target, b = a.getItem();
        this._loadedResults[b.id] = a.getResult();
        a instanceof createjs.XHRLoader && (this._loadedRawResults[b.id] = a.getResult(true));
        this._removeLoadItem(a);
        if (this.maintainScriptOrder && b.type == createjs.LoadQueue.JAVASCRIPT)
            if (a instanceof createjs.TagLoader)
                this._currentlyLoadingScript = false;
            else {
                this._loadedScripts[this._scriptOrder.indexOf(b)] = b;
                this._checkScriptLoadOrder(a);
                return
            }
        this._processFinishedLoad(b, a)
    };
    b._processFinishedLoad = function(a, b) {
        this._numItemsLoaded++;
        this._updateProgress();
        this._sendFileComplete(a, b);
        this._loadNext()
    };
    b._checkScriptLoadOrder = function() {
        for (var a = this._loadedScripts.length, b = 0; b < a; b++) {
            var c = this._loadedScripts[b];
            if (c === null)
                break;
            c !== true && (this._processFinishedLoad(c), this._loadedScripts[b] = true, b--, a--)
        }
    };
    b._removeLoadItem = function(a) {
        for (var b = this._currentLoads.length, c = 0; c < b; c++)
            if (this._currentLoads[c] == a) {
                this._currentLoads.splice(c, 1);
                break
            }
    };
    b._handleProgress = function(a) {
        a = a.target;
        this._sendFileProgress(a.getItem(), a.progress);
        this._updateProgress()
    };
    b._updateProgress = function() {
        var a = this._numItemsLoaded / this._numItems, b = this._numItems - this._numItemsLoaded;
        if (b > 0) {
            for (var c = 0, d = 0, e = this._currentLoads.length; d < e; d++)
                c += this._currentLoads[d].progress;
            a += c / b * (b / this._numItems)
        }
        this._sendProgress(a)
    };
    b._disposeItem = function(a) {
        delete this._loadedResults[a.id];
        delete this._loadedRawResults[a.id];
        delete this._loadItemsById[a.id];
        delete this._loadItemsBySrc[a.src]
    };
    b._createTag = function(a) {
        var b = null;
        switch (a) {
            case createjs.LoadQueue.IMAGE:
                return document.createElement("img");
            case createjs.LoadQueue.SOUND:
                return b = document.createElement("audio"), b.autoplay = false, b;
            case createjs.LoadQueue.JSONP:
            case createjs.LoadQueue.JAVASCRIPT:
                return b = document.createElement("script"), b.type = "text/javascript", b;
            case createjs.LoadQueue.CSS:
                return b = this.useXHR ? document.createElement("style") : document.createElement("link"), b.rel = "stylesheet", b.type = "text/css", b;
            case createjs.LoadQueue.SVG:
                return this.useXHR ? b = document.createElement("svg") : (b = document.createElement("object"), b.type = "image/svg+xml"), b
        }
        return null
    };
    b._getTypeByExtension = function(a) {
        switch (a.toLowerCase()) {
            case "jpeg":
            case "jpg":
            case "gif":
            case "png":
            case "webp":
            case "bmp":
                return createjs.LoadQueue.IMAGE;
            case "ogg":
            case "mp3":
            case "wav":
                return createjs.LoadQueue.SOUND;
            case "json":
                return createjs.LoadQueue.JSON;
            case "xml":
                return createjs.LoadQueue.XML;
            case "css":
                return createjs.LoadQueue.CSS;
            case "js":
                return createjs.LoadQueue.JAVASCRIPT;
            case "svg":
                return createjs.LoadQueue.SVG;
            default:
                return createjs.LoadQueue.TEXT
        }
    };
    b._sendFileProgress = function(a, b) {
        if (this._isCanceled())
            this._cleanUp();
        else {
            var c = {target: this,type: "fileprogress",progress: b,loaded: b,total: 1,item: a};
            this.onFileProgress && this.onFileProgress(c);
            this.dispatchEvent(c)
        }
    };
    b._sendFileComplete = function(a, b) {
        if (!this._isCanceled()) {
            var c = {target: this,type: "fileload",loader: b,item: a,result: this._loadedResults[a.id],rawResult: this._loadedRawResults[a.id]};
            a.completeHandler && a.completeHandler(c);
            this.onFileLoad && this.onFileLoad(c);
            this.dispatchEvent(c)
        }
    };
    b._sendFileStart = function(a) {
        this.dispatchEvent({target: this,type: "filestart",item: a})
    };
    b.toString = function() {
        return "[PreloadJS LoadQueue]"
    };
    a.proxy = function(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    };
    createjs.LoadQueue = a;
    if (!createjs.proxy)
        createjs.proxy = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 2);
            return function() {
                return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
            }
        };
    var c = function() {
    };
    c.init = function() {
        var a = navigator.userAgent;
        c.isFirefox = a.indexOf("Firefox") > -1;
        c.isOpera = window.opera != null;
        c.isChrome = a.indexOf("Chrome") > -1;
        c.isIOS = a.indexOf("iPod") > -1 || a.indexOf("iPhone") > -1 || a.indexOf("iPad") > -1
    };
    c.init();
    createjs.LoadQueue.BrowserDetect = c;
    if (!Array.prototype.indexOf)
        Array.prototype.indexOf = function(a) {
            if (this == null)
                throw new TypeError;
            var b = Object(this), c = b.length >>> 0;
            if (c === 0)
                return -1;
            var d = 0;
            arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : d != 0 && d != Infinity && d != -Infinity && (d = (d > 0 || -1) * Math.floor(Math.abs(d))));
            if (d >= c)
                return -1;
            for (d = d >= 0 ? d : Math.max(c - Math.abs(d), 0); d < c; d++)
                if (d in b && b[d] === a)
                    return d;
            return -1
        }
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b) {
        this.init(a, b)
    }, b = a.prototype = new createjs.AbstractLoader;
    b._loadTimeout = null;
    b._tagCompleteProxy = null;
    b._isAudio = false;
    b._tag = null;
    b._jsonResult = null;
    b.init = function(a, b) {
        this._item = a;
        this._basePath = b;
        this._tag = a.tag;
        this._isAudio = window.HTMLAudioElement && a.tag instanceof HTMLAudioElement;
        this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
    };
    b.getResult = function() {
        return this._item.type == createjs.LoadQueue.JSONP ? this._jsonResult : this._tag
    };
    b.cancel = function() {
        this.canceled = true;
        this._clean();
        this.getItem()
    };
    b.load = function() {
        var a = this._item, b = this._tag;
        clearTimeout(this._loadTimeout);
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
        if (this._isAudio)
            b.src = null, b.preload = "auto";
        b.onerror = createjs.proxy(this._handleError, this);
        this._isAudio ? (b.onstalled = createjs.proxy(this._handleStalled, this), b.addEventListener("canplaythrough", this._tagCompleteProxy, false)) : (b.onload = createjs.proxy(this._handleLoad, this), b.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this));
        var c = this.buildPath(a.src, this._basePath, a.values);
        switch (a.type) {
            case createjs.LoadQueue.CSS:
                b.href = c;
                break;
            case createjs.LoadQueue.SVG:
                b.data = c;
                break;
            default:
                b.src = c
        }
        if (a.type == createjs.LoadQueue.JSONP) {
            if (a.callback == null)
                throw Error("callback is required for loading JSONP requests.");
            if (window[a.callback] != null)
                throw Error('JSONP callback "' + a.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
            window[a.callback] = createjs.proxy(this._handleJSONPLoad, this)
        }
        if (a.type == createjs.LoadQueue.SVG || a.type == createjs.LoadQueue.JSONP || a.type == createjs.LoadQueue.JSON || a.type == createjs.LoadQueue.JAVASCRIPT || a.type == createjs.LoadQueue.CSS)
            this._startTagVisibility = b.style.visibility, b.style.visibility = "hidden", (document.body || document.getElementsByTagName("body")[0]).appendChild(b);
        b.load != null && b.load()
    };
    b._handleJSONPLoad = function(a) {
        this._jsonResult = a
    };
    b._handleTimeout = function() {
        this._clean();
        this._sendError({reason: "PRELOAD_TIMEOUT"})
    };
    b._handleStalled = function() {
    };
    b._handleError = function() {
        this._clean();
        this._sendError()
    };
    b._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var a = this.getItem().tag;
        (a.readyState == "loaded" || a.readyState == "complete") && this._handleLoad()
    };
    b._handleLoad = function() {
        if (!this._isCanceled()) {
            var a = this.getItem(), b = a.tag;
            if (!(this.loaded || this.isAudio && b.readyState !== 4)) {
                this.loaded = true;
                switch (a.type) {
                    case createjs.LoadQueue.SVG:
                    case createjs.LoadQueue.JSONP:
                        b.style.visibility = this._startTagVisibility, (document.body || document.getElementsByTagName("body")[0]).removeChild(b)
                }
                this._clean();
                this._sendComplete()
            }
        }
    };
    b._clean = function() {
        clearTimeout(this._loadTimeout);
        var a = this.getItem().tag;
        a.onload = null;
        a.removeEventListener && a.removeEventListener("canplaythrough", this._tagCompleteProxy, false);
        a.onstalled = null;
        a.onprogress = null;
        a.onerror = null;
        a.parentNode && a.parentNode.removeChild(a);
        a = this.getItem();
        a.type == createjs.LoadQueue.JSONP && (window[a.callback] = null)
    };
    b.toString = function() {
        return "[PreloadJS TagLoader]"
    };
    createjs.TagLoader = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = function(a, b) {
        this.init(a, b)
    }, b = a.prototype = new createjs.AbstractLoader;
    b._request = null;
    b._loadTimeout = null;
    b._xhrLevel = 1;
    b._response = null;
    b._rawResponse = null;
    b.init = function(a, b) {
        this._item = a;
        this._basePath = b;
        this._createXHR(a)
    };
    b.getResult = function(a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    };
    b.cancel = function() {
        this.canceled = true;
        this._clean();
        this._request.abort()
    };
    b.load = function() {
        if (this._request == null)
            this._handleError();
        else {
            this._request.onloadstart = createjs.proxy(this._handleLoadStart, this);
            this._request.onprogress = createjs.proxy(this._handleProgress, this);
            this._request.onabort = createjs.proxy(this._handleAbort, this);
            this._request.onerror = createjs.proxy(this._handleError, this);
            this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
            if (this._xhrLevel == 1)
                this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
            this._request.onload = createjs.proxy(this._handleLoad, this);
            this._request.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
            try {
                !this._item.values || this._item.method == createjs.LoadQueue.GET ? this._request.send() : this._item.method == createjs.LoadQueue.POST && this._request.send(this._formatQueryString(this._item.values))
            } catch (a) {
                this._sendError({source: a})
            }
        }
    };
    b.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
    };
    b.getResponseHeader = function(a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
    };
    b._handleProgress = function(a) {
        a.loaded > 0 && a.total == 0 || this._sendProgress({loaded: a.loaded,total: a.total})
    };
    b._handleLoadStart = function() {
        clearTimeout(this._loadTimeout);
        this._sendLoadStart()
    };
    b._handleAbort = function() {
        this._clean();
        this._sendError()
    };
    b._handleError = function() {
        this._clean();
        this._sendError()
    };
    b._handleReadyStateChange = function() {
        this._request.readyState == 4 && this._handleLoad()
    };
    b._handleLoad = function() {
        if (!this.loaded)
            this.loaded = true, this._checkError() ? (this._response = this._getResponse(), this._clean(), this._generateTag() && this._sendComplete()) : this._handleError()
    };
    b._handleTimeout = function() {
        this._clean();
        this._sendError({reason: "PRELOAD_TIMEOUT"})
    };
    b._checkError = function() {
        switch (parseInt(this._request.status)) {
            case 404:
            case 0:
                return false
        }
        return true
    };
    b._getResponse = function() {
        if (this._response != null)
            return this._response;
        if (this._request.response != null)
            return this._request.response;
        try {
            if (this._request.responseText != null)
                return this._request.responseText
        } catch (a) {
        }
        try {
            if (this._request.responseXML != null)
                return this._request.responseXML
        } catch (b) {
        }
        return null
    };
    b._createXHR = function(a) {
        var b = document.createElement("a");
        b.href = this.buildPath(a.src, this._basePath);
        var c = document.createElement("a");
        c.href = location.href;
        b = b.hostname != "" && (b.port != c.port || b.protocol != c.protocol || b.hostname != c.hostname);
        c = null;
        if (b && window.XDomainRequest)
            c = new XDomainRequest;
        else if (window.XMLHttpRequest)
            c = new XMLHttpRequest;
        else
            try {
                c = new ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (d) {
                try {
                    c = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (e) {
                    try {
                        c = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (f) {
                        return false
                    }
                }
            }
        a.type == createjs.LoadQueue.TEXT && c.overrideMimeType && c.overrideMimeType("text/plain; charset=x-user-defined");
        this._xhrLevel = typeof c.responseType === "string" ? 2 : 1;
        var g = null, g = a.method == createjs.LoadQueue.GET ? this.buildPath(a.src, this._basePath, a.values) : this.buildPath(a.src, this._basePath);
        c.open(a.method || createjs.LoadQueue.GET, g, true);
        b && c instanceof XMLHttpRequest && this._xhrLevel == 1 && c.setRequestHeader("Origin", location.origin);
        a.values && a.method == createjs.LoadQueue.POST && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (createjs.LoadQueue.isBinary(a.type))
            c.responseType = "arraybuffer";
        this._request = c;
        return true
    };
    b._clean = function() {
        clearTimeout(this._loadTimeout);
        var a = this._request;
        a.onloadstart = null;
        a.onprogress = null;
        a.onabort = null;
        a.onerror = null;
        a.onload = null;
        a.ontimeout = null;
        a.onloadend = null;
        a.onreadystatechange = null
    };
    b._generateTag = function() {
        var a = this._item.tag;
        switch (this._item.type) {
            case createjs.LoadQueue.IMAGE:
                return a.onload = createjs.proxy(this._handleTagReady, this), a.src = this.buildPath(this._item.src, this._basePath, this._item.values), this._rawResponse = this._response, this._response = a, false;
            case createjs.LoadQueue.JAVASCRIPT:
                a = document.createElement("script");
                this._rawResponse = a.text = this._response;
                this._response = a;
                break;
            case createjs.LoadQueue.CSS:
                document.getElementsByTagName("head")[0].appendChild(a);
                if (a.styleSheet)
                    a.styleSheet.cssText = this._response;
                else {
                    var b = document.createTextNode(this._response);
                    a.appendChild(b)
                }
                this._rawResponse = this._response;
                this._response = a;
                break;
            case createjs.LoadQueue.XML:
                this._response = b = this._parseXML(this._response, "text/xml");
                break;
            case createjs.LoadQueue.SVG:
                b = this._parseXML(this._response, "image/svg+xml");
                this._rawResponse = this._response;
                b.documentElement != null ? (a.appendChild(b.documentElement), this._response = a) : this._response = b;
                break;
            case createjs.LoadQueue.JSON:
                a = {};
                try {
                    a = JSON.parse(this._response)
                } catch (c) {
                    a = c
                }
                this._rawResponse = this._response;
                this._response = a
        }
        return true
    };
    b._parseXML = function(a, b) {
        var c = null;
        window.DOMParser ? c = (new DOMParser).parseFromString(a, b) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = false, c.loadXML(a));
        return c
    };
    b._handleTagReady = function() {
        this._sendComplete()
    };
    b.toString = function() {
        return "[PreloadJS XHRLoader]"
    };
    createjs.XHRLoader = a
})();
typeof JSON !== "object" && (JSON = {});
(function() {
    function c(a) {
        return a < 10 ? "0" + a : a
    }
    function a(a) {
        e.lastIndex = 0;
        return e.test(a) ? '"' + a.replace(e, function(a) {
            var b = o[a];
            return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function d(b, c) {
        var e, g, i, k, l = j, m, n = c[b];
        n && typeof n === "object" && typeof n.toJSON === "function" && (n = n.toJSON(b));
        typeof h === "function" && (n = h.call(c, b, n));
        switch (typeof n) {
            case "string":
                return a(n);
            case "number":
                return isFinite(n) ? String(n) : "null";
            case "boolean":
            case "null":
                return String(n);
            case "object":
                if (!n)
                    return "null";
                j += f;
                m = [];
                if (Object.prototype.toString.apply(n) === "[object Array]") {
                    k = n.length;
                    for (e = 0; e < k; e += 1)
                        m[e] = d(e, n) || "null";
                    i = m.length === 0 ? "[]" : j ? "[\n" + j + m.join(",\n" + j) + "\n" + l + "]" : "[" + m.join(",") + "]";
                    j = l;
                    return i
                }
                if (h && typeof h === "object") {
                    k = h.length;
                    for (e = 0; e < k; e += 1)
                        typeof h[e] === "string" && (g = h[e], (i = d(g, n)) && m.push(a(g) + (j ? ": " : ":") + i))
                } else
                    for (g in n)
                        Object.prototype.hasOwnProperty.call(n, g) && (i = d(g, n)) && m.push(a(g) + (j ? ": " : ":") + i);
                i = m.length === 0 ? "{}" : j ? "{\n" + j + m.join(",\n" + j) + "\n" + l + "}" : "{" + m.join(",") + "}";
                j = l;
                return i
        }
    }
    if (typeof Date.prototype.toJSON !== "function")
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        };
    var b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, j, f, o = {"\b": "\\b","  ": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, h;
    if (typeof JSON.stringify !== "function")
        JSON.stringify = function(a, b, c) {
            var e;
            f = j = "";
            if (typeof c === "number")
                for (e = 0; e < c; e += 1)
                    f += " ";
            else
                typeof c === "string" && (f = c);
            if ((h = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number"))
                throw Error("JSON.stringify");
            return d("", {"": a})
        };
    if (typeof JSON.parse !== "function")
        JSON.parse = function(a, c) {
            function d(a, b) {
                var e, f, g = a[b];
                if (g && typeof g === "object")
                    for (e in g)
                        Object.prototype.hasOwnProperty.call(g, e) && (f = d(g, e), f !== void 0 ? g[e] = f : delete g[e]);
                return c.call(a, b, g)
            }
            var e, a = String(a);
            b.lastIndex = 0;
            b.test(a) && (a = a.replace(b, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                return e = eval("(" + a + ")"), typeof c === "function" ? d({"": e}, "") : e;
            throw new SyntaxError("JSON.parse")
        }
})();
(function() {
    $("body, html").ontouchstart = function() {
    };
    angular.module("nexus", ["ngResource"]).config(["$interpolateProvider", "$locationProvider", function(a, b) {
            a.startSymbol("[[").endSymbol("]]")
        }])
})();
angular.module("nexus").controller("GoogCustomSearchCtrl", ["$rootScope", "$scope", "$resource", function(a, b, c) {
        var d, e, f, g, h;
        f = "AIzaSyDA73Jwmq0PWKRqtxo8XEhk2K3hHcLJ36k";
        h = "https://www.googleapis.com/customsearch/v1";
        d = "016001815575088125294:rwrgooxlxfc";
        e = c(h, {key: f,cx: d,alt: "json",callback: "JSON_CALLBACK"}, {search: {action: "search",method: "JSONP",isArray: false}});
        b.searchTerm = "";
        b.clearSearch = function() {
            if (b.searchTerm && !b.searchTerm.length)
                return;
            b.searchTerm = "";
            b.$emit("search:clearresults")
        };
        b.$on(Sidebar.TOGGLE_REQUEST, function(a, c) {
            if (!c) {
                b.clearSearch()
            }
        });
        b.$watch("searchBoxVal", function(b) {
            a.$broadcast(Sidebar.PLACEHOLDER_UPDATE, b)
        });
        b.$watch("searchTerm", function(a) {
            if (a && a.length > 2) {
                try {
                    e.search({q: a}, function(a) {
                        b.$emit("search:results", a)
                    })
                } catch (c) {
                    console.warn(c)
                }
            }
        })
    }]);
angular.module("nexus").controller("MainCtrl", ["$scope", "$timeout", "scrollService", function(a, b, c) {
        a.togglable = {};
        a.togglable.sideNav = false;
        a.togglable.productFeatures = false;
        a.togglable.productList = false;
        a.togglable.feat1 = false;
        a.togglable.feat2 = false;
        a.togglable.feat3 = false;
        a.togglable.feat4 = false;
        a.isMobile = false;
        a.hasTouch = Modernizr.touch;
        a.sideNavPeeking = false;
        a.sectionTitle = "";
        a.sections = {};
        a.toggleElement = function(b, c, d) {
            var e;
            if (c) {
                for (e in a.togglable) {
                    if (e === d)
                        continue;
                    if (e !== b) {
                        a.togglable[e] = false
                    }
                }
            }
            if (b && a.togglable !== undefined)
                a.togglable[b] = !a.togglable[b];
            if (b && a.togglable === undefined)
                a.togglable[b] = true
        };
        a.onHamburgerMouseOver = function() {
            if (a.hasTouch)
                return;
            a.sideNavPeeking = true
        };
        a.onSideBarMouseOver = function() {
            if (a.hasTouch)
                return;
            if (!a.sideNavPeeking) {
                a.toggleElement("sideNav", true)
            }
        };
        a.onHamburgerMouseOut = function() {
            if (a.hasTouch)
                return;
            if (!a.togglable.sideNav) {
                a.sideNavPeeking = false
            }
        };
        a.$on(SectionFocusDirective.SECTION_FOCUS, function(b, c) {
            a.sectionTitle = c;
            if (a.$$phase != "$apply" && a.$$phase != "$digest") {
                a.$apply()
            }
        });
        a.$on(SectionFocusDirective.SECTION_DIMENSIONS_CHANGE, function(b, c) {
            a.sections = c
        });
        a.$on(BreakPointDirective.BREAK_POINT_CHANGE, function(b, c, d) {
            a.isMobile = d
        });
        a.$on("search:results", function(b, c) {
            a.searchResults = c.items;
            if (!c.items) {
                var d = {title: "No results found."};
                a.searchResults = [d]
            }
        });
        a.$on("search:clearresults", function() {
            a.searchResults = []
        });
        a.$on(c.SCROLLING_TOGGLE_REQUEST, function(b, d, e) {
            if (d && !a.togglable.sideNav && !a.togglable.productFeatures) {
                c.enableScrolling(e)
            } else if (!d) {
                c.disableScrolling(e)
            }
        });
        a.$watch("togglable.sideNav", function(b, c) {
            if (b == c)
                return;
            a.sideNavPeeking = b;
            a.$broadcast(Sidebar.TOGGLE_REQUEST, b)
        });
        a.$watch("sideNavPeeking", function(b, c) {
            if (b == c)
                return;
            a.$broadcast(Sidebar.PEEK_TOGGLE_REQUEST, b)
        });
        a.$watch("togglable.productFeatures", function(b, c) {
            if (b == c)
                return;
            a.$broadcast(DropDownDirective.TOGGLE_REQUEST, "productFeatures", b)
        });
        a.$watch("togglable.productList", function(b, c) {
            if (b == c)
                return;
            a.$broadcast(DropDownDirective.TOGGLE_REQUEST, "productList", b)
        })
    }]);
"use strict";
angular.module("nexus").controller("newsletterCtrl", ["$scope", function(a) {
        a.placeholderSupport = Modernizr.input.placeholder
    }]);
var AbstractAngularDirective = Class.extend({init: function(a, b, c) {
        this.$scope = a;
        this.$element = b;
        this.attrs = c
    },exposePublicMethod: function(a, b) {
        this.$scope[a] = b.bind(this)
    }});
var DropDownDirective = AbstractAngularDirective.extend({init: function(a, b, c, d) {
        this._super(a, b, c);
        this.resizeService = d;
        this.name = c.name;
        this.$content = this.$element.children("ul");
        this.openPosition = 0;
        this.closedPosition = 0;
        this.isVisible = false;
        this.isOpen = false;
        this.$scope.$on(DropDownDirective.TOGGLE_REQUEST, this.onToggleRequest.bind(this));
        this.$scope.$on(BreakPointDirective.BREAK_POINT_CHANGE, this.onBreakPointChanged.bind(this));
        if (this.resizeService.currentBreakpoint() !== false) {
            this.onBreakPointChanged()
        }
    },onBreakPointChanged: function() {
        this.resetDimensions()
    },resetDimensions: function() {
        this.closedPosition = -this.$content.height();
        var a = this.isOpen ? this.openPosition : this.closedPosition;
        baseten.CSSTransition.setCSS(this.$content, {transform: {translate: {y: a}}});
        this.show()
    },show: function() {
        if (!this.isVisible) {
            this.isVisible = true;
            this.$content.removeClass("invisible")
        }
    },onToggleRequest: function(a, b, c) {
        if (b != this.name)
            return;
        this.isOpen = c;
        var d = c ? this.openPosition : this.closedPosition;
        var e = c ? this.onDropDownOpen.bind(this) : this.onDropDownClose.bind(this);
        baseten.CSSTransition.to(this.$content, .3, {css: {transform: {translate: {y: d}}},applyProps: false,onComplete: e})
    },onDropDownOpen: function() {
    },onDropDownClose: function() {
    }});
DropDownDirective.NAME = "DropDownDirective";
DropDownDirective.TOGGLE_REQUEST = DropDownDirective.NAME + "ToggleRequest";
angular.module("nexus").directive("bindUi", ["$window", function(a) {
        "use strict";
        var b = {};
        b.swipeThreshold = 200;
        return {link: function(c, d, e) {
                d.on("click", function(a) {
                    var b = angular.element(a.target);
                    if (!b.closest(".dropdown").length) {
                        c.$apply(function() {
                            c.togglable.productFeatures = false;
                            c.togglable.productList = false
                        })
                    }
                });
                angular.element(a).on("touchstart", function(a) {
                    b.start = a.originalEvent.targetTouches[0].clientX
                });
                angular.element(a).on("touchend", function(a) {
                    b.end = a.originalEvent.changedTouches[0].clientX;
                    if (b.end > b.start && b.end - b.start > b.swipeThreshold) {
                        c.$apply(function() {
                            c.togglable.sideNav = true
                        })
                    }
                    if (b.end < b.start && b.end - b.start < b.swipeThreshold) {
                        c.$apply(function() {
                            c.togglable.sideNav = false
                        })
                    }
                })
            }}
    }]);
angular.module("nexus").directive("zbreakPoint", ["$rootScope", "resizeService", function(a, b) {
        var c;
        return {link: function(d, e, f) {
                c = new BreakPointDirective(d, e, f, a, b)
            }}
    }]);
var BreakPointDirective = AbstractAngularDirective.extend({init: function(a, b, c, d, e) {
        this._super(a, b, c);
        this.$rootScope = d;
        this.resizeService = e;
        this.currentBreakPoint = null;
        e.addResizeFrameCallback(this.onResize.bind(this));
        this.onResize(null)
    },onResize: function(a) {
        var b = window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace(/["|']/g, "");
        if (this.currentBreakPoint != b) {
            this.currentBreakPoint = b;
            this.resizeService.currentBreakpoint(b);
            this.$rootScope.$broadcast(BreakPointDirective.BREAK_POINT_CHANGE, this.currentBreakPoint, this.resizeService.isSmallGridLayout())
        }
    }});
BreakPointDirective.NAME = "BreakPointDirective";
BreakPointDirective.BREAK_POINT_CHANGE = BreakPointDirective.NAME + "BreakPointChange";
"use strict";
angular.module("nexus").directive("carousel", ["resizeService", "scrollService", function(a, b) {
        return function(c, d, e) {
            var f = "carousel-container-", g;
            function h() {
                g = d.find(".carousel");
                g.each(function(a, b) {
                    $(b).addClass("active");
                    i(a, b)
                });
                l();
                a.addResizeFrameCallback(l)
            }
            function i(a, b) {
                var c = f + a;
                $(b).children().eq(0).addClass("selected");
                $(b).children().wrapAll('<div id="' + c + '" class="carousel-container"></div>');
                $(b).find(".carousel-container").after('<div class="carousel-pagination"></div>');
                j(a, b)
            }
            function j(a, b) {
                var c = f + a, d = $("#" + c), e = $(b).find(".carousel-pagination");
                $(b).find("#" + c).children().each(function(b, c) {
                    var f = "pagination-" + a + "-" + b;
                    if (b === 0) {
                        e.append('<div id="' + f + '" class="carousel-pagination-btn selected"></div>')
                    } else {
                        e.append('<div id="' + f + '" class="carousel-pagination-btn"></div>')
                    }
                    $("#" + f).bind("click", function(a) {
                        var b = $(this).attr("id"), c = b.substring(b.length - 1, b.length);
                        if (typeof c !== "undefined") {
                            k(d, e, c)
                        }
                    })
                })
            }
            function k(a, b, c) {
                a.children().removeClass("selected");
                a.children().eq(c).addClass("selected");
                b.children().removeClass("selected");
                b.children().eq(c).addClass("selected")
            }
            function l(a) {
                g.each(function(a, b) {
                    m($(b).find(".carousel-container"))
                })
            }
            function m(a) {
                var c = a.width(), d = 0, e = c * .5, f = 0;
                if (!n(a)) {
                    return
                }
                a.children().each(function(a, b) {
                    f = e - $(b).width() * .5;
                    $(b).css("left", f);
                    if ($(b).height() > d)
                        d = $(b).height()
                });
                a.css("height", d);
                b.refresh()
            }
            function n(a) {
                var b = true, c = [];
                a.children().each(function(a, d) {
                    if ($(d).height() === 0) {
                        b = false;
                        c.push(d)
                    }
                });
                if (!b) {
                    o(a, c)
                }
                return b
            }
            function o(a, b) {
                var c = 0, d = b.length, e = 0;
                for (c; c < d; c++) {
                    $(b[c]).load(function() {
                        e++;
                        if (e === d) {
                            m(a)
                        }
                    })
                }
            }
            h()
        }
    }]);
angular.module("nexus").directive("floodlightTag", [function() {
        return {link: function(a, b, c) {
                var d = $("body");
                b.one("click", function() {
                    var a = Math.random() + "";
                    var b = a * 1e13;
                    var e = c.floodlightTag + ";num=" + b;
                    var f = $('<iframe width="1" height="1" frameborder="0" style="display:none"></iframe>');
                    f.attr("src", e);
                    d.append(f)
                })
            }}
    }]);
angular.module("nexus").directive("focusInput", [function() {
        return {link: function(a, b, c) {
                var d = b.find("input");
                var e = b.find(".focus-input-placeholder");
                var f = e.length ? $.trim(e.text()) : "Search";
                a.searchBoxVal = f;
                a.focusInput = function(b) {
                    if (b.currentTarget.nodeName.toLowerCase() == "input")
                        return;
                    d.focus();
                    a.clearPlaceholder()
                };
                a.clearPlaceholder = function() {
                    a.searchBoxVal = ""
                };
                a.$on(Sidebar.TOGGLE_REQUEST, function(b, c) {
                    a.searchBoxVal = f
                })
            }}
    }]);
angular.module("nexus").directive("heroVideo", ["$rootScope", "$timeout", "resizeService", "scrollService", "browserDetectService", function(a, b, c, d, e) {
        return function(f, g, h) {
            if (typeof h.preroll === "undefined" || typeof h.feature === "undefined") {
                var i = {home: {videoPrerollId: "CI90Ikxj1-g",videoFeatureId: "hQ0XTJqFLIE",endFrame: "introvideo-endframe_n5.jpg"},n5: {videoPrerollId: "CI90Ikxj1-g",videoFeatureId: "hQ0XTJqFLIE",endFrame: "introvideo-endframe_n5.jpg"},n7: {videoPrerollId: "V9AzYtwktsU",videoFeatureId: "5LysTmwDan8",endFrame: "introvideo-endframe.jpg"}}[h.heroVideo]
            } else {
                var j = typeof h.showpreroll !== "undefined" ? h.showpreroll : false;
                var i = {videoPrerollId: h.preroll,videoFeatureId: h.feature};
                if (h.heroVideo === "n7") {
                    if (h.preroll === "null") {
                        i.videoPrerollId = "V9AzYtwktsU"
                    }
                    i.endFrame = "introvideo-endframe.jpg"
                } else {
                    if (h.preroll === "null") {
                        i.videoPrerollId = "CI90Ikxj1-g"
                    }
                    i.endFrame = "introvideo-endframe_n5.jpg"
                }
                if (j === false) {
                    localStorage.setItem("watched-video-id-" + i.videoPrerollId, true)
                }
            }
            var k = i.videoPrerollId, l = i.videoFeatureId, m = "home", n = "n5", o = "n7", p = "watch-text", q = "watch-again-text", r = 16 / 9, s = true;
            var t = g, u = g.find("header"), v = g.find("#build-bottom"), w = g.find("#watch-button"), x = g.find("#close-video"), y = g.find(".hero-copy"), z = g.find("#hero-image"), A = g.find("#hero-gradient"), B = g.find(".video-container"), C = g.find(".video-with-overflow"), D = C.find(".video-wrapper"), E, F, G, H, I, J, K, L;
            var M = g.find("footer").outerHeight();
            $(window).on("keydown", function(a) {
                if (a.which == 27) {
                    _()
                }
            });
            function N() {
                Q();
                if (e.isMobileOS()) {
                    R(i.endFrame);
                    eb();
                    w.hide();
                    $(window).on("orientationchange", function() {
                        eb()
                    });
                    return
                }
                E = k;
                H = 1;
                Y(p);
                if (O(k)) {
                    H = 0;
                    E = l;
                    R(i.endFrame);
                    J = true;
                    if (O(l)) {
                        Y(q);
                        if (G === o || G === n) {
                            var b = G == o ? t.find("#portable") : t.find("#introduction");
                            $(window).load(function() {
                                if (d.scrollTop() == 0)
                                    d.scrollToElement(b)
                            })
                        }
                    }
                } else {
                    R(i.endFrame)
                }
                a.$broadcast(SectionFocusDirective.CACHE_UPDATE_REQUEST);
                w.click(Z);
                x.click(_);
                window.onYouTubeIframeAPIReady = S;
                var f = document.createElement("script");
                f.src = "//www.youtube.com/iframe_api";
                var g = document.getElementsByTagName("script")[0];
                g.parentNode.insertBefore(f, g);
                if (H == 1)
                    ab(0);
                $(document).ready(eb);
                c.addResizeFrameCallback(eb)
            }
            function O(a) {
                return Modernizr.localstorage ? localStorage["watched-video-id-" + a] : false
            }
            function P(a, b) {
                localStorage["watched-video-id-" + a] = b
            }
            function Q() {
                G = h.heroVideo;
                switch (G) {
                    case m:
                        I = "images";
                        t.css({overflowY: "scroll",minHeight: "720px"});
                        A.show();
                        cb();
                        break;
                    case o:
                        I = "../images";
                        A.show();
                        break;
                    case n:
                        I = "../images";
                        A.show();
                        break;
                    default:
                        throw new Error('Please specify the page this directive is sitting on as the directive\'s attribute. ie. home-video="home" or home-video="n7"')
                }
            }
            function R(a) {
                b(function() {
                    f.videoPosterImageUrl = I + "/" + a
                })
            }
            function S() {
                F = new YT.Player("hero-video", {height: "100%",width: "100%",videoId: E,playerVars: {autoplay: H,controls: 0,modestbranding: 1,rel: 0,showinfo: 0,iv_load_policy: 3,wmode: "opaque",html5: 1},events: {onReady: T,onStateChange: U}})
            }
            function T(a) {
                if (J)
                    w.fadeIn(500)
            }
            function U(a) {
                L = a.data;
                if (a.data == YT.PlayerState.PLAYING) {
                    z.hide();
                    R(i.endFrame);
                    switch (E) {
                        case k:
                            P(k, true);
                            break;
                        case l:
                            P(l, true);
                            Y(q);
                            if (G == o || G == n)
                                V();
                            break
                    }
                }
                if (a.data == YT.PlayerState.ENDED) {
                    X();
                    bb()
                }
                eb()
            }
            function V() {
                if (!s)
                    return;
                K = D.height();
                W();
                d.addScrollFrameCallback(W)
            }
            function W() {
                var a = Math.max(0, Math.min(1, 1 - d.scrollTop() / K));
                F.setVolume(a * 100);
                if (a > 0)
                    x.show();
                else
                    x.hide()
            }
            function X() {
                if (!s)
                    return;
                d.removeScrollFrameCallback(W)
            }
            function Y(a) {
                b(function() {
                    f.watchButtonCtaText = w.find("[data-" + a + "]").text()
                });
                return w
            }
            function Z(a) {
                a.preventDefault();
                F.playVideo();
                ab()
            }
            function _(a) {
                F.stopVideo();
                bb()
            }
            function ab(a) {
                D.addClass("z5");
                if (E == l) {
                    y.fadeOut(a);
                    A.fadeOut(a);
                    x.fadeIn(a)
                }
                if (G == m && E == l) {
                    u.slideUp(a);
                    t.css("overflow-y", "hidden");
                    eb();
                    db()
                }
            }
            function bb() {
                D.removeClass("z5");
                if (E == l) {
                    x.fadeOut();
                    A.fadeIn();
                    y.fadeIn(1e3)
                }
                z.show();
                F.stopVideo();
                X();
                if (G == m && E == l) {
                    u.slideDown();
                    t.css("overflow-y", "scroll");
                    cb()
                }
                if (E === k) {
                    E = l;
                    F.cueVideoById(E);
                    w.fadeIn(1e3)
                }
            }
            function cb() {
                v.show();
                v.animate({bottom: -M})
            }
            function db(a) {
                v.animate({bottom: -v.height()}, a, function() {
                    v.hide()
                })
            }
            function eb() {
                C.show();
                var a = C.height();
                var b = $(window).height();
                var c = C.width();
                var d = c / a;
                var e = {height: null,width: null,marginTop: null,marginLeft: null};
                if (d >= r) {
                    e.width = c;
                    e.height = Math.ceil(c / r)
                } else {
                    e.width = Math.ceil(a * r);
                    e.height = a
                }
                e.top = "0";
                e.marginTop = 0;
                if (L && L == YT.PlayerState.PLAYING) {
                    e.marginLeft = -Math.ceil(e.width * .5)
                } else {
                    if (c < e.width * .3)
                        e.marginLeft = -Math.ceil(e.width - c * 1.1);
                    else if (c < e.width * .4)
                        e.marginLeft = -Math.ceil(e.width - c * .95);
                    else if (c < e.width * .75)
                        e.marginLeft = -Math.ceil(e.width - c * .7);
                    else
                        e.marginLeft = -Math.ceil(e.width - c * .5)
                }
                D.css(e);
                B.removeClass("init")
            }
            N()
        }
    }]);
angular.module("nexus").directive("interactiveDev", ["$rootScope", function(a) {
        return {link: function(b, c, d) {
                var e = window[d.interactiveClass];
                var f = new e(b, c, d, a);
                f.start()
            }}
    }]);
angular.module("nexus").directive("interactive", ["$rootScope", "$compile", "$timeout", "$location", "scrollService", "momentService", "uiService", "resizeService", function(a, b, c, d, e, f, g, h) {
        return {scope: {},link: function(c, i, j) {
                var k = [], l = $(window), m = $("body"), n = $("header"), o = i.find(".parallax-image"), p = i.find(".parallax-content"), q, r, s, t, u, v, w, x, y, z, A, B;
                var C = false, D = 1;
                function E() {
                    w = window[j.interactive];
                    x = baseten.String.seoText(baseten.String.unCamelCase(j.interactive).toLowerCase());
                    if (C)
                        c.closeDebug = K;
                    l.load(function() {
                        q = i.closest(".parallax-parent");
                        v = i.find(".explore-button");
                        u = f.getInFlowStacks().eq(q.children().index(i));
                        O();
                        A = j.interactive.toLowerCase().replace(/(interactive).*/g, "");
                        B = d.path().replace("/", "");
                        if (A == B) {
                            F(.4)
                        }
                        c.social = {momentShareUrl: d.protocol() + "://" + d.host() + ":" + d.port() + d.path() + "#" + A}
                    });
                    $(".phoneLeft").show();
                    $(".phoneRight").show()
                }
                function F(a) {
                    var b = 400;
                    var c = 0;
                    P();
                    m.css({overflow: "hidden"});
                    if (this.id == "extraFadeOut") {
                        c = b;
                        G(c)
                    }
                    setTimeout(function() {
                        H();
                        e.scrollToPosition(N(), 500, function() {
                            M(function() {
                                if (C && D < 1)
                                    r.css("opacity", D);
                                var a = Number(n.css("z-index"));
                                r.css("z-index", a + 1);
                                s.removeClass("parallax-image").addClass("interactive-image");
                                var b = l.width(), c = l.height(), d = 1;
                                var f = $.extend(g.getYObj(0), {height: c,ease: Expo.easeInOut,onComplete: I});
                                if (e.useIScroll) {
                                    TweenMax.to(r, d, $.extend({startAt: g.getYObj(r.offset().top - e.scrollTop())}, f))
                                } else {
                                    TweenMax.to(r, d, f)
                                }
                                s.css({width: o.width()});
                                TweenMax.to(s, d, $.extend(g.getElementResizeProps(3, 2, b, c, g.SIZE_COVER, g.OUTPUT_FORMAT_GSAP), {ease: Expo.easeInOut}));
                                TweenMax.to(t, d, {autoAlpha: 0})
                            })
                        }, "", a)
                    }, c)
                }
                function G(a) {
                    var b = $(".phoneLeft");
                    var c = $(".phoneRight");
                    TweenLite.to(b, 1, {css: {marginTop: -400}});
                    TweenLite.to(c, 1, {css: {marginTop: 400}})
                }
                function H() {
                    $(".phoneLeft").hide();
                    $(".phoneRight").hide()
                }
                function I() {
                    c.$apply(function() {
                        d.path("/" + A)
                    });
                    J();
                    h.addResizeFrameCallback(J);
                    q.show();
                    r.css("height", "100%");
                    if (!C)
                        $('<div class="interactive-background-cover"></div>').appendTo(m);
                    if (C)
                        r.append(b('<a href="" ng-click="closeDebug()" class="debug-close">Debug Close Button</a>')(c));
                    Q()
                }
                function J() {
                    g.setBatchCSS(s[0], g.getElementResizeProps(s.width(), s.height(), l.width(), l.height(), g.SIZE_COVER, g.OUTPUT_FORMAT_GENERIC))
                }
                function K() {
                    S();
                    if (C)
                        r.find(".debug-close").remove();
                    if (!C)
                        $(".interactive-background-cover").remove();
                    var a = 1;
                    e.scrollTop(N());
                    f.forceParallaxUpdate();
                    h.removeResizeFrameCallback(J);
                    var b = g.getElementTransformValue(s);
                    var c = $.extend(g.getXYObj(b.x, b.y), {width: s.width(),height: s.height()});
                    var d = g.getElementTransformValue(o);
                    TweenMax.to(s, a, $.extend({startAt: c}, g.getXYObj(d.x, d.y), {width: o.width(),height: o.height(),ease: Expo.easeInOut}));
                    TweenMax.to(t, a, {autoAlpha: 1});
                    r.css("height", r.height());
                    var j = g.getYObj(Number(g.getElementTransformValue(i).y));
                    if (e.useIScroll) {
                        j = g.getYObj(Number(g.getElementTransformValue(i).y - e.scrollTop()))
                    }
                    TweenMax.to(r, a, $.extend(j, {height: i.height(),ease: Expo.easeInOut,onComplete: L}))
                }
                function L() {
                    var a = $(".phoneLeft");
                    var b = $(".phoneRight");
                    a.show();
                    b.show();
                    TweenLite.to(a, .8, {css: {marginTop: 0}});
                    TweenLite.to(b, .8, {css: {marginTop: 0}});
                    c.$apply(function() {
                        d.path("/")
                    });
                    if (!e.useIScroll) {
                        m.css({overflow: ""})
                    }
                    r.remove();
                    r = s = t = null;
                    O()
                }
                function M(a) {
                    r = i.clone().addClass("clone").appendTo(m);
                    s = r.find(".parallax-image");
                    t = r.find(".parallax-content");
                    a()
                }
                function N() {
                    if (e.useIScroll) {
                        return u.offset().top + e.scrollTop() + (u.height() - l.height()) * .5
                    }
                    return u.offset().top + (u.height() - l.height()) * .5
                }
                function O() {
                    v.on("click", F);
                    if (!h.isSmallGridLayout())
                        v.fadeIn(500);
                    else
                        v.css("display", "")
                }
                function P() {
                    v.off("click", F).fadeOut(500)
                }
                function Q() {
                    if (!w) {
                        console.warn("No javascript class matching attribute name");
                        return
                    }
                    if (!y) {
                        var a = $("." + x + " .interactive-template").clone();
                        y = b(a)(c);
                        R()
                    } else {
                        R()
                    }
                }
                function R() {
                    r.append(y);
                    if (!z) {
                        z = new w(c, y, j, a, d);
                        T()
                    }
                    z.start()
                }
                function S() {
                    U();
                    z.destroy();
                    z = null;
                    r.remove(".interactive-template");
                    y = null
                }
                function T() {
                    k[AbstractInteractiveDirective.CLOSE_COMPLETE] = a.$on(AbstractInteractiveDirective.CLOSE_COMPLETE, K)
                }
                function U() {
                    if (k[AbstractInteractiveDirective.CLOSE_COMPLETE])
                        k[AbstractInteractiveDirective.CLOSE_COMPLETE]()
                }
                E()
            }}
    }]);
angular.module("nexus").directive("languageSelector", ["browserDetectService", function(a) {
        return {link: function(b, c, d) {
                var e, f, g, h, i, j;
                var k = -375;
                function l() {
                    m();
                    n();
                    u()
                }
                function m() {
                    e = c.find(".language-selector");
                    f = c.find(".footer-language");
                    g = c.find(".country");
                    h = c.find(".closeButton");
                    i = c.find(".language-selector-mobile");
                    $pointer = g.find(".langPointer")
                }
                function n() {
                    f.on("click", o.bind(this));
                    g.on("click", p.bind(this));
                    h.on("click", s.bind(this));
                    window.addEventListener("resize", function() {
                        u()
                    }, false)
                }
                function o() {
                    if (j) {
                        j = false;
                        i.hide();
                        return
                    }
                    j = true;
                    if (ComplexDetection.isMobile()) {
                        i.show()
                    } else {
                        var a = c.outerHeight();
                        e.show();
                        TweenLite.to(e, .3, {css: {marginTop: -a}});
                        r()
                    }
                }
                function p(a) {
                    var b = $(a.target).data("code").toLowerCase();
                    var c = $(a.target).attr("class").split(" ")[1];
                    if (c == "non-active")
                        return;
                    if (ComplexDetection.isMobile()) {
                        q(b)
                    }
                    console.log(b)
                }
                function q(a) {
                    $pointer.hide();
                    $("#" + a).show()
                }
                function r() {
                    var a = $(window).scrollTop();
                    $("html, body").animate({scrollTop: a + 200}, 600)
                }
                function s() {
                    j = false;
                    e.fadeOut("slow", function() {
                        e.css("margin-top", "0")
                    });
                    t()
                }
                function t() {
                    var a = $(window).scrollTop();
                    $("html, body").animate({scrollTop: a - 200}, 600)
                }
                function u() {
                    if (a.getBrowser() == "Firefox" || a.getBrowser() == "Explorer") {
                        k = -260;
                        return
                    }
                    if (a.getOS() == "Android") {
                        if (window.innerHeight > window.innerWidth) {
                            e.removeClass("tabletLandscape");
                            e.addClass("tabletAndroidPortrait")
                        } else {
                            e.addClass("tabletLandscape");
                            e.removeClass("tabletAndroidPortrait")
                        }
                        return
                    }
                    if (a.getOS() == "iPad") {
                        if (window.innerHeight > window.innerWidth) {
                            e.removeClass("tabletLandscape");
                            e.addClass("tabletPortrait")
                        } else {
                            e.addClass("tabletLandscape");
                            e.removeClass("tabletPortrait")
                        }
                        return
                    }
                    if (ComplexDetection.getBrowserWidth() > 1240) {
                        e.removeClass("tabletPortrait");
                        e.removeClass("tabletLandscape");
                        e.removeClass("tabletAndroidPortrait");
                        return
                    } else if (ComplexDetection.getBrowserWidth() > 900 && ComplexDetection.getBrowserWidth() <= 1240) {
                        e.addClass("tabletLandscape")
                    } else if (ComplexDetection.getBrowserWidth() >= 755 && ComplexDetection.getBrowserWidth() <= 900) {
                        e.removeClass("tabletLandscape");
                        e.addClass("tabletPortrait")
                    } else if (ComplexDetection.getBrowserWidth() < 755) {
                        e.removeClass("tabletPortrait");
                        e.addClass("tabletAndroidPortrait")
                    }
                }
                l()
            }}
    }]);
angular.module("nexus").directive("buynow", ["$location", "scrollService", function(a, b) {
        return {link: function(c, d, e) {
                $(window).load(function() {
                    momentHashName = a.path().replace("/", "");
                    if (momentHashName === "buy") {
                        var c = $(window).scrollTop(d.offset().top);
                        b.scrollToPosition(c, 500)
                    }
                })
            }}
    }]);
"use strict";
angular.module("nexus").directive("camera", ["$rootScope", "$compile", "scrollService", "resizeService", "browserDetectService", "uiService", function($rootScope, $compile, scrollService, resizeService, browserDetectService) {
        return {link: function(scope, $element, attrs) {
                var CLASS_INFLOW = "camera-feature-elem", ID_PARENT = "section-photography", ID_TITLE = "camera-feature-title", ID_IMAGE = "feature-image", IS_FIXED = false, SECTION_HEIGHT = 5e3;
                var $window = $(window), $containerParent, $featureTitle, $featureImage, scrollOffset = 0, featureImageFixedTop, featureImageAfterTop, featureTitleFixedTop, featureTitleAfterTop, parallaxStartOffset = 0, animationPaths, marginTop = 0, viewportOffsetTop = 0, pointTop = 0, slide = null, currentSlide = -1, divider = .2, $inFlowStacks, $inFlowStacksElem, $inFlowStacksElem0, $inFlowStacksElem1, $inFlowStacksElem2, $inFlowStacksElem3, $inFlowStacksElem4, scrollTop;
                function init() {
                    var a = $("header");
                    if (a.length > 0)
                        viewportOffsetTop = a.outerHeight();
                    scrollOffset = parseInt($element.offset().top);
                    $containerParent = $("#" + ID_PARENT);
                    $featureTitle = $("#" + ID_TITLE);
                    $featureImage = $("#" + ID_IMAGE);
                    $inFlowStacks = $element.find("." + CLASS_INFLOW);
                    $inFlowStacksElem0 = $element.find(".learn-scroll-1");
                    $inFlowStacksElem1 = $element.find(".learn-scroll-2");
                    $inFlowStacksElem2 = $element.find(".learn-scroll-3");
                    $inFlowStacksElem3 = $element.find(".learn-scroll-4");
                    $inFlowStacksElem4 = $element.find(".learn-scroll-5");
                    if (!$inFlowStacksElem4.length) {
                        divider = .25
                    }
                    $element.height(SECTION_HEIGHT);
                    initialSettings();
                    setAnimation();
                    scrollTop = scrollService.scrollTop() + viewportOffsetTop;
                    if (!IS_FIXED && scrollTop - viewportOffsetTop + $window.height() >= scrollOffset + parallaxStartOffset + $element.outerHeight()) {
                        IS_FIXED = true
                    }
                    onUpdate()
                }
                function addUpdateListeners() {
                    scrollService.addScrollFrameCallback(onUpdate);
                    resizeService.addResizeFrameCallback(init)
                }
                function scrollToSectionListener(a, b) {
                    if (b.name.trim() == scrollService.positionCache[scrollService.positionCacheLookup["Photography"]].name) {
                        if (a.name == "ScrollButtonNextSection") {
                            setTimeout(function() {
                                slide = 0;
                                currentSlide = 0;
                                next()
                            }, 250)
                        } else {
                            slide = 0;
                            currentSlide = 0;
                            next()
                        }
                    }
                }
                function scrollToPerfectFrame(a, b) {
                    scrollService.scrollToPosition(scrollOffset + getFrameOffset(a), 600)
                }
                function removeUpdateListeners() {
                    resizeService.removeResizeFrameCallback(onUpdateInit)
                }
                function onUpdate(a) {
                    scrollTop = scrollService.scrollTop() + viewportOffsetTop;
                    onUpdateCheckBoundries();
                    if (IS_FIXED) {
                        slide = Math.floor((scrollTop - (scrollOffset + parallaxStartOffset)) / ($element.outerHeight() - $window.height() - viewportOffsetTop) / divider);
                        if (slide == -1)
                            slide = 0;
                        else if (!$inFlowStacksElem4.length && slide == 4)
                            slide = 3;
                        else if (slide == 5)
                            slide = 4;
                        if (slide < currentSlide) {
                            currentSlide = slide;
                            prev()
                        } else if (slide > currentSlide) {
                            currentSlide = slide;
                            next()
                        }
                    }
                }
                function getFrameOffset(a) {
                    return ($element.outerHeight() - $window.height() - viewportOffsetTop) / 100 * a
                }
                function initialSettings() {
                    pointTop = -$inFlowStacks.find(".camera-feature-image").outerHeight();
                    if ($window.width() / $window.height() < 2)
                        parallaxStartOffset = -30;
                    else
                        parallaxStartOffset = 0;
                    parallaxStartOffset = -parseInt($element.css("margin-top"), 10);
                    marginTop = $featureTitle.outerHeight();
                    $featureImage.css("margin-top", marginTop);
                    $inFlowStacks.filter(".camera-feature-slider-wrapper,.camera-feature-logo").css("margin-top", marginTop);
                    $inFlowStacks.filter(".camera-feature-description").css("margin-top", marginTop + -pointTop + 39);
                    $inFlowStacks.find(".camera-feature-slider").not(".slide-1").css("margin-top", -pointTop);
                    featureImageFixedTop = viewportOffsetTop - parallaxStartOffset;
                    featureImageAfterTop = SECTION_HEIGHT - $window.height() + featureImageFixedTop + parallaxStartOffset;
                    featureTitleFixedTop = viewportOffsetTop - parallaxStartOffset;
                    featureTitleAfterTop = SECTION_HEIGHT - $window.height() + featureTitleFixedTop + parallaxStartOffset
                }
                function onUpdateCheckBoundries() {
                    if (!IS_FIXED && scrollTop >= scrollOffset + parallaxStartOffset && scrollTop + $window.height() <= scrollOffset + parallaxStartOffset + $element.outerHeight()) {
                        $featureImage.css("top", featureImageFixedTop);
                        $featureImage.addClass("fixed");
                        $featureTitle.css("top", featureTitleFixedTop);
                        $featureTitle.addClass("fixed");
                        $inFlowStacks.css("top", featureImageFixedTop);
                        $inFlowStacks.addClass("fixed");
                        IS_FIXED = true
                    }
                    if (!IS_FIXED && scrollTop >= scrollOffset + parallaxStartOffset && scrollTop <= scrollOffset + parallaxStartOffset + featureTitleAfterTop) {
                        $featureImage.addClass("fixed");
                        $featureImage.css("top", featureImageFixedTop);
                        $featureTitle.css("top", featureTitleFixedTop);
                        $featureTitle.addClass("fixed");
                        $inFlowStacks.addClass("fixed");
                        $inFlowStacks.css("top", featureImageFixedTop);
                        IS_FIXED = true
                    }
                    if (IS_FIXED && scrollTop - viewportOffsetTop + $window.height() >= scrollOffset + parallaxStartOffset + $element.outerHeight()) {
                        $inFlowStacks.removeClass("fixed");
                        $inFlowStacks.css("top", featureImageAfterTop);
                        $featureImage.removeClass("fixed");
                        $featureImage.css("top", featureImageAfterTop);
                        $featureTitle.removeClass("fixed");
                        $featureTitle.css("top", featureTitleAfterTop);
                        if (!slide) {
                            if (!$inFlowStacksElem4.length) {
                                slide = 3;
                                currentSlide = 3
                            } else {
                                slide = 4;
                                currentSlide = 4
                            }
                            next()
                        }
                        IS_FIXED = false
                    }
                    if (IS_FIXED && scrollTop <= scrollOffset + parallaxStartOffset) {
                        slide = -1;
                        currentSlide = -1;
                        prev();
                        $featureImage.removeClass("fixed");
                        $featureImage.removeAttr("style");
                        $featureImage.css("margin-top", marginTop);
                        $featureTitle.removeClass("fixed");
                        $featureTitle.removeAttr("style");
                        $inFlowStacks.removeClass("fixed");
                        $inFlowStacks.removeAttr("style");
                        $inFlowStacks.find(".camera-feature-slider-inner").removeAttr("style");
                        $inFlowStacks.filter(".camera-feature-slider-wrapper,.camera-feature-logo").css("margin-top", marginTop);
                        $inFlowStacks.filter(".camera-feature-description").css("margin-top", marginTop + -pointTop + 39);
                        $inFlowStacks.find(".camera-feature-slider").not(".slide-1").css("margin-top", -pointTop);
                        IS_FIXED = false
                    }
                    return IS_FIXED
                }
                function setAnimation() {
                    animationPaths = [[{top: $featureImage.outerHeight() / 3,middle: 0,bottom: -150,opacityStart: 0,opacityEnd: 1}, {top: $featureImage.outerHeight(),middle: ($featureImage.outerHeight() + -100) / 5,bottom: -100,opacityStart: 0,opacityEnd: 1}], [{top: 0,middle: pointTop,bottom: pointTop,opacityStart: 1,opacityEnd: 1}, {top: $featureImage.outerHeight() / 3,middle: 0,bottom: -150,opacityStart: 0,opacityEnd: 1}, {top: $featureImage.outerHeight(),middle: ($featureImage.outerHeight() + -100) / 5,bottom: -100,opacityStart: 0,opacityEnd: 1}], [{top: 0,middle: pointTop,bottom: pointTop,opacityStart: 1,opacityEnd: 1}, {top: $featureImage.outerHeight() / 3,middle: 0,bottom: -150,opacityStart: 0,opacityEnd: 1}, {top: $featureImage.outerHeight(),middle: ($featureImage.outerHeight() + -100) / 5,bottom: -100,opacityStart: 0,opacityEnd: 1}], [{top: 0,middle: pointTop,bottom: pointTop,opacityStart: 1,opacityEnd: 1}, {top: $featureImage.outerHeight() / 3,middle: 0,bottom: -150,opacityStart: 0,opacityEnd: 1}, {top: $featureImage.outerHeight(),middle: ($featureImage.outerHeight() + -100) / 5,bottom: -100,opacityStart: 0,opacityEnd: 1}], [{top: 0,middle: pointTop,bottom: pointTop,opacityStart: 1,opacityEnd: 1}, {top: $featureImage.outerHeight() / 3,middle: 0,bottom: -150,opacityStart: 0,opacityEnd: 1}, {top: $featureImage.outerHeight(),middle: ($featureImage.outerHeight() + -100) / 5,bottom: -100,opacityStart: 0,opacityEnd: 1}]]
                }
                function next() {
                    var path;
                    if (slide > 0) {
                        for (var prevSlide = slide - 1; prevSlide >= 0; prevSlide--) {
                            for (var i = 0; i < eval("$inFlowStacksElem" + prevSlide).length; i++) {
                                path = animationPaths[prevSlide][i];
                                TweenMax.to(eval("$inFlowStacksElem" + prevSlide)[i], 1, {top: path.bottom,opacity: path.opacityStart})
                            }
                        }
                    }
                    for (var i = 0; i < eval("$inFlowStacksElem" + slide).length; i++) {
                        path = animationPaths[slide][i];
                        TweenMax.fromTo(eval("$inFlowStacksElem" + slide)[i], 1, {top: path.top,opacity: path.opacityStart}, {top: path.middle,opacity: path.opacityEnd})
                    }
                }
                function prev() {
                    var path;
                    if (slide < 4) {
                        for (var nextSlide = slide + 1; nextSlide <= 4; nextSlide++) {
                            for (var i = 0; i < eval("$inFlowStacksElem" + nextSlide).length; i++) {
                                path = animationPaths[nextSlide][i];
                                TweenMax.to(eval("$inFlowStacksElem" + nextSlide)[i], 1, {top: path.top,opacity: path.opacityStart})
                            }
                        }
                    }
                    for (var i = 0; i < eval("$inFlowStacksElem" + slide).length; i++) {
                        path = animationPaths[slide][i];
                        TweenMax.fromTo(eval("$inFlowStacksElem" + slide)[i], 1, {top: path.bottom,opacity: path.opacityStart}, {top: path.middle,opacity: path.opacityEnd})
                    }
                }
                if (browserDetectService.isMobileOS()) {
                    $("body").addClass("no-parallax-learn-photo");
                    return
                }
                addUpdateListeners();
                init()
            }}
    }]);
"use strict";
angular.module("nexus").directive("momentStack", ["$rootScope", "scrollService", "resizeService", "browserDetectService", "uiService", function(a, b, c, d, e) {
        return {restrict: "C",link: function(d, f, g) {
                var h = f.find(".explore-button"), i = f.find(".moment-caption"), j = i.find("div"), k = i.find("em"), l, m;
                function n() {
                    c.addResizeFrameCallback(o);
                    b.addScrollFrameCallback(function() {
                    });
                    o();
                    a.$on(BreakPointDirective.BREAK_POINT_CHANGE, function(a) {
                        var b = i.width();
                        k.css("line-height", "");
                        if (e.fitText(k, b))
                            k.css("line-height", "normal");
                        j.css("line-height", "");
                        if (e.fitText(j, b))
                            j.css("line-height", "normal");
                        o()
                    });
                    i.on("ENTER_VIEWPORT", function(a) {
                        o()
                    })
                }
                function o(a) {
                    if (h.length == 0)
                        return;
                    var b = f.has(i);
                    if (b.length == 0)
                        b = i.closest(".parallax-container");
                    var c = i.offset().top - b.offset().top + i.outerHeight(), d = b.height() - c, e = i.width();
                    if (h.attr("data-align") && h.attr("data-align") == "right") {
                        h.css({left: i.offset().left + i.width() - h.outerWidth(),marginTop: c + (d - h.outerHeight()) * .5})
                    } else if (h.attr("data-align") && h.attr("data-align") == "left") {
                        h.css({left: i.offset().left,marginTop: c + (d - h.outerHeight()) * .5})
                    } else {
                        h.css({left: i.offset().left + (e - h.outerWidth()) * .5,marginTop: c + (d - h.outerHeight()) * .5})
                    }
                }
                n()
            }}
    }]);
"use strict";
angular.module("nexus").directive("parallax", ["$rootScope", "$compile", "scrollService", "resizeService", "browserDetectService", "uiService", "momentService", function(a, b, c, d, e, f, g) {
        return {link: function(h, i, j) {
                var k = "moment-stack", l = "parallax-parent", m = "parallax-container", n = "parallax-image", o = "parallax-content", p = 1600, q = false;
                var r = $(window), s = i.find("." + l), t = 0, u, v, w, x, y, z = -1;
                function A() {
                    u = g.setInFlowStacks(i.find("." + k));
                    if (q) {
                        $("body").addClass("no-parallax");
                        return
                    }
                    if (e.isMobileOS()) {
                        $("body").addClass("no-parallax");
                        return
                    }
                    g.isParallaxActive(true);
                    var c = $("header");
                    if (c.length > 0)
                        t = c.outerHeight();
                    u.each(function(a) {
                        var c = $(this), d = c.data("parallax-id"), e = 1600;
                        var f = b('<div class="' + m + " " + d + '" interactive="' + c.data("interactive-class") + '"><div class="' + n + '"></div><div class="parallax-content"></div></div>')(h);
                        f.find("." + o).append(c.children()).end().appendTo(s)
                    });
                    v = s.find("." + m);
                    w = s.find("." + n);
                    x = s.find("." + o);
                    B();
                    a.$on(g.FORCE_PARALLAX_UPDATE, D);
                    E()
                }
                function B() {
                    c.addScrollFrameCallback(D);
                    d.addResizeFrameCallback(D)
                }
                function C() {
                    c.removeScrollFrameCallback(D);
                    d.removeResizeFrameCallback(D)
                }
                function D(a) {
                    y = c.scrollTop() + t;
                    E()
                }
                function E() {
                    var a = r.height() - t;
                    u.each(function(b) {
                        var d = $(this), e = d.offset().top, f = d.height(), g = y + a, h = e + f - y;
                        if (c.useIScroll) {
                            g = a + t;
                            h = e + f
                        }
                        if (e <= g && h >= 0)
                            G(b, d);
                        else
                            F(b)
                    })
                }
                function F(a) {
                    f.setBatchCSS(v.get(a), {visibility: "hidden"});
                    if (a == z)
                        z = -1;
                    c.refresh()
                }
                function G(a, b) {
                    var e = v.eq(a), g = w.eq(a), h = x.eq(a), i = b.offset().top + (c.useIScroll ? y - t : t - y), j = b.height(), k = b.height(), l = r.height() - t, m = c.useIScroll ? .5 : (i + k) / (l + k), n = g.height(), o = -((n - k) * m), q = s > 2400 ? (s - 2400) * .5 : 0, s = r.width();
                    f.setBatchCSS(e[0], {y: i,visibility: "visible",height: j});
                    var u = {y: o,x: q};
                    if (d.windowWidth() < p)
                        u.x = (b.width() - g.width()) * .5;
                    f.setBatchCSS(g[0], u);
                    if (z != a)
                        e.find(".moment-caption").trigger("ENTER_VIEWPORT");
                    f.setBatchCSS(h[0], {top: 0});
                    z = a;
                    c.refresh()
                }
                A()
            }}
    }]);
"use strict";
angular.module("nexus").directive("retailerLayout", ["resizeService", function(a) {
        return {link: function(b, c, d) {
                var e = c.find(".retailer-search-container");
                var f = e.find("#pinpoint-search");
                var g = f.find(".map-search");
                var h = f.find(".map-results");
                var i = f.find(".pinpoint-results-list");
                var j = 0;
                var k = 0;
                var l = function() {
                    j = e.height();
                    k = g.outerHeight(true) + h.outerHeight();
                    i.height(j - k)
                };
                a.addResizeFrameCallback(l);
                l()
            }}
    }]);
angular.module("nexus").directive("retailerTray", ["resizeService", "browserDetectService", function(a, b) {
        return function(c, d, e) {
            var f = d.find("#retailer-tray"), g = d.find(".retailer-button a"), h = d.find("#retailer-tray-container"), i = d.find("#retailer-tray-close"), j = d.find(".buy-options-list"), k = d.find(".buy-option"), l = d.find(".buy-btn"), m = d.find(".product-price"), n = d.find(".product-storage"), o = d.find(".nexus-5-product-buy"), p, q, r, s;
            t();
            function t() {
                if (window.location.hash == "#testnotdotcom")
                    return;
                var b = location.hostname.split(".");
                b = b[b.length - 1];
                i.bind("click", v);
                l.bind("click", x);
                a.addResizeFrameCallback(y);
                p = a.isSmallGridLayout();
                q = k.length
            }
            function u() {
                s = true;
                if (a.isSmallGridLayout()) {
                    h.css({top: -h.outerHeight(),left: 0});
                    h.show();
                    TweenMax.to(h, .3, {top: 0});
                    var b = 0;
                    j.children().each(function(a, c) {
                        if (a < r) {
                            b += $(c).outerHeight()
                        }
                    });
                    TweenMax.to(j, .3, {marginTop: f.outerHeight() - b,marginLeft: 0})
                } else {
                    o.css({height: h.outerHeight()});
                    h.css({top: 0,left: -h.outerWidth()});
                    h.show();
                    TweenMax.to(h, .3, {left: 0});
                    var c = 0;
                    j.children().each(function(a, b) {
                        if (a < r) {
                            c += $(b).outerWidth()
                        }
                    });
                    TweenMax.to(j, .3, {marginLeft: f.outerWidth() - c,marginTop: 0});
                    TweenMax.to(k.eq(r), .3, {width: "30%"});
                    TweenMax.to(n.eq(r), .3, {marginTop: 50,marginBottom: 10})
                }
                TweenMax.to(l.eq(r), .3, {opacity: 0});
                TweenMax.to(k, .3, {css: {borderColor: "transparent"}});
                TweenMax.to(k.not(":eq(" + r + ")"), .3, {opacity: 0});
                TweenMax.to(i, .3, {autoAlpha: 1,delay: .3})
            }
            function v() {
                s = false;
                if (a.isSmallGridLayout()) {
                    TweenMax.to(h, .3, {top: -h.outerHeight(),onComplete: w});
                    TweenMax.to(j, .3, {marginTop: 0})
                } else {
                    TweenMax.to(h, .3, {left: -h.outerWidth(),onComplete: w});
                    TweenMax.to(j, .3, {marginLeft: 0});
                    TweenMax.to(k.eq(r), .3, {width: "50%"});
                    TweenMax.to(n.eq(r), .3, {marginTop: 0,marginBottom: 60})
                }
                TweenMax.to(k, .3, {opacity: 1});
                TweenMax.to(l.eq(r), .3, {opacity: 1});
                TweenMax.to(k, .3, {css: {borderColor: "#e1e4e6"}});
                TweenMax.to(i, .3, {autoAlpha: 0})
            }
            function w() {
                h.removeAttr("style");
                o.removeAttr("style");
                h.hide()
            }
            function x(a) {
                var c, d;
                a.preventDefault();
                if ($(a.target).hasClass("disabled")) {
                    return
                }
                if (s)
                    return;
                var e = $(a.target).parents().filter("li.buy-option");
                r = j.children().index(e);
                var h = $(a.target).data("ref");
                var i = "mobile-" + $(a.target).data("ref");
                g.each(function() {
                    c = $(this).data(i);
                    d = b.isMobileOS() && c ? c : $(this).data(h);
                    if (d) {
                        $(this).attr("href", d);
                        $(this).parent().show()
                    } else {
                        $(this).parent().hide()
                    }
                });
                f.find(".retailer-tray-component").hide();
                f.find(".retailer-tray-component." + $(a.target).data("ref") + "-visible").show();
                u()
            }
            function y(a) {
                s = false;
                n.removeAttr("style");
                k.removeAttr("style");
                j.removeAttr("style");
                h.hide();
                TweenMax.to(k, 0, {opacity: 1});
                TweenMax.to(l.eq(r), 0, {opacity: 1});
                TweenMax.to(k, 0, {css: {borderColor: "#e1e4e6"}});
                TweenMax.to(i, 0, {autoAlpha: 0})
            }
        }
    }]);
angular.module("nexus").directive("ngSlideDownWhen", function() {
    return function(a, b, c) {
        a.$watch(c.ngSlideDownWhen, function(a) {
            if (a) {
                b.slideDown()
            } else {
                b.slideUp()
            }
        })
    }
});
angular.module("nexus").directive("productFeatureDropdown", ["$rootScope", "scrollService", "resizeService", "browserDetectService", function(a, b, c, d) {
        var e;
        return {link: function(f, g, h) {
                e = new ProductFeatureDropDownDirective(f, g, h, a, b, c, d)
            }}
    }]);
var ProductFeatureDropDownDirective = DropDownDirective.extend({init: function(a, b, c, d, e, f, g) {
        this._super(a, b, c, f);
        this.$mobileContainer = $("#mobile-features-container");
        this.$rootScope = d;
        this.scrollService = e;
        this.menuBuildCount = c.waitVideo == "true" ? 0 : 1;
        this.isMenuBuilt = false;
        this.isMobile = null;
        this.menuTop = 0;
        this.openHeight = 0;
        this.closedHeight = 0;
        f.addResizeFrameCallback(this.onResize.bind(this));
        this.$scope.$on("ng-repeat:complete", this.onMenuBuildComplete.bind(this));
        this.$rootScope.$on(SectionFocusDirective.CACHE_UPDATE_REQUEST, this.onCacheUpdateRequest.bind(this));
        this.$rootScope.$on(SectionFocusDirective.SECTION_DIMENSIONS_CHANGE, this.onSectionDimensionsChanged.bind(this));
        this.$rootScope.$on(this.scrollService.SCROLLING_TOGGLED, this.onScrollingToggled.bind(this));
        this.exposePublicMethod("onDropDownClicked", this.onDropDownClicked);
        if (g.isMobileOS()) {
            this.onMenuBuildComplete()
        }
    },onBreakPointChanged: function(a, b, c) {
        this.isMobile = c;
        if (c) {
            this.$content.detach();
            this.$mobileContainer.append(this.$content)
        } else {
            this.$content.detach();
            this.$element.append(this.$content)
        }
        this.resetDimensions();
        this.onResize(null)
    },show: function() {
        if (!this.isVisible && this.isMenuBuilt) {
            this.isVisible = true;
            this.$element.removeClass("invisible")
        }
    },onToggleRequest: function(a, b, c) {
        if (b != this.name)
            return;
        if (c) {
            this.$mobileContainer.height(this.openHeight)
        }
        this._super(a, b, c)
    },onDropDownOpen: function(a) {
        if (!this.isMobile)
            return;
        this.$mobileContainer.height(this.openHeight);
        this.$content.css(Modernizr.prefixed("transform"), "none")
    },onDropDownClose: function(a) {
        this.$mobileContainer.height(this.closedHeight)
    },onDropDownClicked: function(a) {
        this.$scope.toggleElement("productFeatures", true);
        this.scrollService.scrollToPosition(a.position, 750);
        this.$rootScope.$broadcast(ProductFeatureDropDownDirective.NAME, a)
    },onScrollingToggled: function(a, b) {
    },onCacheUpdateRequest: function(a) {
        this.incrementBuildCount()
    },onMenuBuildComplete: function(a) {
        this.incrementBuildCount()
    },incrementBuildCount: function() {
        if (!this.isMenuBuilt) {
            if (++this.menuBuildCount == 2) {
                this.isMenuBuilt = true;
                this.resetDimensions()
            }
        }
    },onSectionDimensionsChanged: function(a, b) {
        this.resetDimensions()
    },onResize: function() {
        if (!this.isMobile)
            return;
        this.menuTop = this.$mobileContainer.position().top;
        this.openHeight = window.innerHeight - this.menuTop;
        if (this.isOpen) {
            this.$mobileContainer.height(this.openHeight)
        }
    }});
ProductFeatureDropDownDirective.NAME = "ProductFeatureDropDownDirective";
ProductFeatureDropDownDirective.LAYOUT_REQUEST = ProductFeatureDropDownDirective.NAME + "LayoutRequest";
angular.module("nexus").directive("productListDropdown", ["resizeService", function(a) {
        var b;
        return {link: function(c, d, e) {
                b = new DropDownDirective(c, d, e, a)
            }}
    }]);
angular.module("nexus").directive("repeatComplete", ["$timeout", function(a) {
        return {link: function(b, c) {
                if (b.$first == true) {
                    b.$emit("ng-repeat:start")
                }
                if (b.$last === true) {
                    a(function() {
                        b.$emit("ng-repeat:complete")
                    })
                }
            }}
    }]);
"use strict";
angular.module("nexus").directive("scrollButton", ["$rootScope", "scrollService", "resizeService", function(a, b, c) {
        return function(c, d, e) {
            var f = d.find(".next-section-button"), g = d.find("footer"), h = 750, i = 250, j, k, l, m;
            function n() {
                f.bind("click", o);
                b.addScrollFrameCallback(p);
                b.addScrollFrameCallback(p);
                $.fn.animateRotate = function(a, b, c, d) {
                    return this.each(function() {
                        var e = $(this);
                        $({deg: 0}).animate({deg: a}, {duration: b,easing: c,step: function(a) {
                                e.css({transform: "rotate(" + a + "deg)"})
                            },complete: d || $.noop})
                    })
                };
                p(null)
            }
            function o() {
                if (m)
                    return;
                var c;
                var d = b.positionCache;
                var e;
                if (l) {
                    c = 0
                } else {
                    for (var f = d.length - 1; f >= 0; f--) {
                        if (d[f].position > j + i) {
                            c = d[f].position;
                            e = d[f]
                        }
                    }
                }
                if (c == undefined)
                    c = k + g.height() + 82;
                m = true;
                $("html, body").animate({scrollTop: c}, h, function() {
                    $("html, body").unbind("DOMMouseScroll mousewheel");
                    m = false
                }).one("DOMMouseScroll mousewheel", function() {
                    $("html, body").stop();
                    m = false
                });
                a.$broadcast("ScrollButtonNextSection", e)
            }
            var p = function(a) {
                j = document.documentElement.scrollTop || document.body.scrollTop;
                k = $(document).height() - $(window).height() - g.height() - 82;
                f.css("margin-bottom", Math.max(j - k, 0));
                if (j > k) {
                    if (!l) {
                        f.animateRotate(180);
                        l = true
                    }
                } else {
                    if (l) {
                        f.animateRotate(0);
                        l = false
                    }
                }
            };
            n()
        }
    }]);
"use strict";
angular.module("nexus").directive("scrollToSection", ["scrollService", function(a) {
        return function(b, c, d) {
            var e;
            function f() {
                e = c.find(".scroll-btn");
                e.each(function(b, c) {
                    $(c).bind("click", function() {
                        var b = typeof $(this).attr("data-scroll-target") === "undefined" || $(this).attr("data-scroll-target").length === 0 ? g($(this)) : $("#" + $(this).attr("data-scroll-target"));
                        var c = $(this).attr("data-scroll-time");
                        var d = 0;
                        if (typeof c !== "undefined" && c.length > 0) {
                            d = parseInt($(this).attr("data-scroll-time"));
                            a.scrollToElement(b, d)
                        } else {
                            a.scrollToElement(b)
                        }
                    })
                })
            }
            function g(a) {
                var b = a.parents("section");
                return b.nextAll("section")
            }
            f()
        }
    }]);
angular.module("nexus").directive("sectionFocus", ["$rootScope", "resizeService", "scrollService", function(a, b, c) {
        var d;
        return {link: function(e, f, g) {
                d = new SectionFocusDirective(e, f, g, a, b, c)
            }}
    }]);
var SectionFocusDirective = AbstractAngularDirective.extend({init: function(a, b, c, d, e, f) {
        this._super(a, b, c);
        this.$sections = b.find("section[data-menu-name]");
        this.$rootScope = d;
        this.scrollService = f;
        this.currentSectionName = "";
        this.$header = $("header");
        this.headerHeight = 0;
        this.$rootScope.$on(BreakPointDirective.BREAK_POINT_CHANGE, this.onBreakPointChanged.bind(this));
        this.$rootScope.$on(SectionFocusDirective.CACHE_UPDATE_REQUEST, this.onCacheUpdateRequest.bind(this));
        e.addResizeFrameCallback(this.onResize.bind(this));
        f.addScrollFrameCallback(this.onScroll.bind(this));
        if (e.currentBreakpoint() !== false) {
            this.onBreakPointChanged(null, e.currentBreakpoint(), e.isSmallGridLayout())
        }
        $(window).load(this.onCacheUpdateRequest.bind(this))
    },onBreakPointChanged: function(a, b, c) {
        this.headerHeight = this.$header.outerHeight();
        this.isMobile = c;
        this.updateCache();
        this.onScroll(null)
    },onCacheUpdateRequest: function(a) {
        this.updateCache();
        this.onScroll(null)
    },updateCache: function() {
        var a = this.$sections.length;
        var b;
        var c;
        var d;
        var e;
        var f;
        var g;
        var h;
        this.scrollService.positionCache = [];
        this.scrollService.positionCacheLookup = {};
        for (var i = 0; i < a; ++i) {
            b = this.$sections.eq(i);
            f = b.css("display");
            if (f == "none") {
                continue
            }
            e = b.offset().top;
            e -= this.headerHeight;
            e = Math.ceil(e);
            d = b.attr("data-menu-name");
            g = this.$element.find(".section-focus-menu-names [data-menu-text='" + d + "']");
            h = d;
            if (g.length) {
                h = g.text()
            }
            this.scrollService.positionCache[i] = {name: h,position: e};
            this.scrollService.positionCacheLookup[d] = i
        }
        this.$rootScope.$broadcast(SectionFocusDirective.SECTION_DIMENSIONS_CHANGE, this.scrollService.positionCache)
    },onScroll: function(a) {
        if (this.isMobile)
            return;
        var b = document.documentElement.scrollTop || document.body.scrollTop;
        var c = this.scrollService.positionCache.length;
        var d, e;
        var f, g;
        for (var h = 0; h < c; ++h) {
            d = this.scrollService.positionCache[h];
            f = h == 0 ? 0 : d.position;
            e = h + 1 < this.scrollService.positionCache.length ? this.scrollService.positionCache[h + 1] : false;
            g = e !== false ? e.position : false;
            if (b >= f && (b < g || g === false)) {
                if (this.currentSectionName != d.name) {
                    this.currentSectionName = d.name;
                    this.$rootScope.$broadcast(SectionFocusDirective.SECTION_FOCUS, this.currentSectionName)
                }
                break
            }
        }
    },onResize: function(a) {
        this.updateCache();
        this.onScroll(null)
    }});
SectionFocusDirective.NAME = "SectionFocusDirective";
SectionFocusDirective.CACHE_UPDATE_REQUEST = SectionFocusDirective.NAME + "CacheUpdateRequest";
SectionFocusDirective.SECTION_DIMENSIONS_CHANGE = SectionFocusDirective.NAME + "SectionDimensionsChange";
SectionFocusDirective.SECTION_FOCUS = SectionFocusDirective.NAME + "SectionFocus";
angular.module("nexus").directive("sidebar", ["$rootScope", "scrollService", "resizeService", function(a, b, c) {
        var d;
        return {link: function(e, f, g) {
                d = new Sidebar(e, f, g, a, b, c)
            }}
    }]);
var Sidebar = AbstractAngularDirective.extend({init: function(a, b, c, d, e, f) {
        this._super(a, b, c);
        this.$rootScope = d;
        this.scrollService = e;
        this.$ul = this.$element.children("ul");
        this.$sizeReader = this.$ul.find(".size-reader");
        this.$tabletsLi = this.$ul.find("li.tablets");
        this.$firstLi = this.$ul.find("li:first");
        this.$header = angular.element("header");
        this.$window = angular.element(window);
        this.$window.resize(this.onResize.bind(this));
        this.$searchInput = this.$element.find(".search-container input");
        this.$html = $("html");
        this.isVisible = false;
        this.isPeeking = false;
        this.isOpen = false;
        this.isMobile = null;
        this.openWidth = 0;
        this.openHeight = 0;
        this.closedWidth = 0;
        this.closedX = 0;
        this.tabletsClosedHeight = 0;
        this.tabletsOpenHeight = 0;
        this.menuTop = 0;
        this.$scope.$on(Sidebar.PEEK_TOGGLE_REQUEST, this.onPeekToggleRequest.bind(this));
        this.$scope.$on(Sidebar.TOGGLE_REQUEST, this.onToggleRequest.bind(this));
        this.$scope.$on(BreakPointDirective.BREAK_POINT_CHANGE, this.onBreakPointChanged.bind(this));
        this.$rootScope.$on(this.scrollService.SCROLLING_TOGGLED, this.onScrollingToggled.bind(this));
        this.$rootScope.$on(Sidebar.PLACEHOLDER_UPDATE, this.onPlaceHolderUpdated.bind(this));
        if (f.currentBreakpoint() !== false) {
            this.onBreakPointChanged(null, f.currentBreakpoint(), f.isSmallGridLayout())
        }
    },onPlaceHolderUpdated: function(a, b) {
    },onBreakPointChanged: function(a, b, c) {
        this.isMobile = c;
        if (!this.isVisible) {
            this.isVisible = true;
            this.$element.removeClass("invisible")
        }
        this.onResize(null)
    },onResize: function(a) {
        var b, c, d;
        this.menuTop = this.$element.position().top;
        this.tabletsClosedHeight = this.$ul.children("li").height();
        this.tabletsOpenHeight = this.$tabletsLi.children("ul.tablets-subnav").height() + this.tabletsClosedHeight;
        this.openHeight = window.innerHeight ? window.innerHeight - this.menuTop : this.$window.height() - this.menuTop;
        if (this.isMobile) {
            this.openWidth = this.$header.width();
            this.closedWidth = this.openWidth;
            this.closedX = -this.closedWidth;
            b = this.isOpen ? 0 : this.closedX;
            c = this.openWidth
        } else {
            this.openWidth = this.$firstLi.width();
            this.closedWidth = this.$sizeReader.width();
            this.closedX = -this.closedWidth - 1;
            b = this.isPeeking ? 0 : this.closedX;
            c = this.isOpen ? this.openWidth : this.closedWidth
        }
        this.$element.height(this.openHeight);
        d = this.isOpen ? this.tabletsOpenHeight : this.tabletsClosedHeight;
        this.setSidebarPosition(b);
        this.setMenuDimensions(c, d)
    },onPeekToggleRequest: function(a, b) {
        var c = b ? 0 : this.closedX;
        this.isPeeking = b;
        this.setSidebarPosition(c, .3)
    },setSidebarPosition: function(a, b) {
        b = typeof b == "undefined" ? 0 : b;
        baseten.CSSTransition.to(this.$element, b, {css: {transform: {translate: {x: a}}},applyProps: false})
    },onToggleRequest: function(a, b) {
        var c = b ? this.openWidth : this.closedWidth;
        var d = b ? this.tabletsOpenHeight : this.tabletsClosedHeight;
        var e;
        this.isOpen = b;
        e = this.isOpen ? this.onMenuOpen.bind(this) : this.onMenuClosed.bind(this);
        this.setMenuDimensions(c, d, .3, e)
    },setMenuDimensions: function(a, b, c, d) {
        d = typeof d == "undefined" ? null : d;
        c = typeof c == "undefined" ? 0 : c;
        baseten.CSSTransition.to(this.$ul, c, {css: {width: a},applyProps: false});
        if (this.$tabletsLi.length) {
            baseten.CSSTransition.to(this.$tabletsLi, c, {css: {height: b},applyProps: false,onComplete: d})
        } else if ($.isFunction(d)) {
            d()
        }
    },onMenuOpen: function() {
        if (!this.isMobile)
            return;
        this.onScrollingToggled(null, false)
    },onMenuClosed: function() {
        this.onScrollingToggled(null, true)
    },onScrollingToggled: function(a, b) {
        if (b) {
            this.$element.css("height", "100%")
        } else {
            this.$element.css("height", this.openHeight)
        }
        this.scrollService.refresh()
    }});
Sidebar.NAME = "Sidebar";
Sidebar.PLACEHOLDER_UPDATE = Sidebar.NAME + "PlaceholderUpdate";
Sidebar.PEEK_TOGGLE_REQUEST = Sidebar.NAME + "PeekToggleRequest";
Sidebar.TOGGLE_REQUEST = Sidebar.NAME + "ToggleRequest";
angular.module("nexus").directive("slideUpWhen", ["$window", function(a) {
        return {link: function(b, c, d) {
                var e, f;
                e = c.offset().top;
                eleHeight = c.height();
                headerHeight = angular.element('header[role="top-navigation"]').height();
                f = angular.element(a).height();
                c.css({top: f + "px"});
                b.$watch(d.slideUpWhen, function(a) {
                    if (a) {
                        c.animate({top: headerHeight + 20 + "px"}, 1e3, function() {
                            c.css({top: "20px",position: "absolute"})
                        })
                    }
                })
            }}
    }]);
angular.module("nexus").directive("smoothScroll", function() {
    return {link: function(a, b, c) {
            var d, e, f;
            d = document.getElementsByTagName("a");
            for (e = 0; e < d.length; e++) {
                f = d[e];
                if (f.hash)
                    $(f).smoothScroll({offset: -50})
            }
        }}
});
angular.module("nexus").directive("techSpec", ["$rootScope", function(a) {
        return function(b, c, d) {
            var e = c.find("#tech-spec-full"), f = c.find(".tech-spec-open");
            function g() {
                e.hide(0)
            }
            function h() {
                a.$broadcast(SectionFocusDirective.CACHE_UPDATE_REQUEST)
            }
            b.showFull = function() {
                f.hide();
                e.show(h)
            };
            b.hideFull = function() {
                f.show();
                e.slideUp(1e3, h)
            };
            g()
        }
    }]);
var AbstractInteractiveDirective = AbstractAngularDirective.extend({init: function(a, b, c, d) {
        this._super(a, b, c, d);
        this.$rootScope = d;
        this.socialInteracting = {};
        this.exposePublicMethod("openStart", this.openStart);
        this.exposePublicMethod("start", this.start);
        this.exposePublicMethod("close", this.close);
        this.$content = b.find(".moment-content");
        this.$closeButton = b.find(".close-interactive");
        this.$itemMenu = b.find(".item-menu");
        if (this.$itemMenu) {
            this.$shareButton = this.$itemMenu.find(".menu-button.share");
            this.$socialWidget = b.find(".social-widget");
            this.$shareButton.on("mouseenter", this.onShareEnter.bind(this));
            this.$shareButton.on("click", this.onShareButtonClicked.bind(this));
            $(window).on("mouseenter", this.onWindowEnter.bind(this))
        }
        var e = 27;
        var f = this;
        $(window).on("keydown", function(a) {
            if (a.which == e) {
                f.close()
            }
        });
        var g = this;
        a.updateSocial = function(b) {
            if (!b) {
                return
            }
            a.social = {momentShareUrl: b};
            g.$socialWidget.find(".social-google-plus-one").remove();
            g.$socialWidget.append('<div class="social-google-plus-one">' + '<div class="g-plusone"></div>' + "</div>");
            gapi.plusone.render(g.$socialWidget.find(".social-google-plus-one")[0], {href: b,onstartinteraction: g.onSocialStartInteraction.bind(g),onendinteraction: g.onSocialEndInteraction.bind(g)})
        };
        a.updateSocial(a.social.momentShareUrl)
    },openStart: function() {
    },start: function() {
    },close: function() {
    },onCloseComplete: function() {
        this.$rootScope.$broadcast(AbstractInteractiveDirective.CLOSE_COMPLETE);
        $(window).off("mouseenter", this.onWindowEnter.bind(this))
    },destroy: function() {
    },onShareEnter: function() {
        this.openSocialWidget();
        return false
    },onShareButtonClicked: function(a) {
        a.preventDefault();
        return false
    },onWindowEnter: function(a) {
        var b = $(a.target);
        if (!b.closest(".social-widget, .share").length && !b.hasClass("social-widget")) {
            this.hoveringSocialWidget = false;
            this.closeSocialWidget()
        } else {
            this.hoveringSocialWidget = true
        }
    },openSocialWidget: function() {
        this.$socialWidget.removeClass("hidden");
        TweenMax.to(this.$socialWidget[0], .3, {opacity: 1})
    },closeSocialWidget: function() {
        if (this.socialInteracting.hover || this.socialInteracting.confirm || this.hoveringSocialWidget)
            return;
        TweenMax.to(this.$socialWidget[0], .3, {opacity: 0,onComplete: this.onSocialWidgetClosed.bind(this)})
    },onSocialWidgetClosed: function() {
        this.$socialWidget.addClass("hidden")
    },onSocialStartInteraction: function(a) {
        this.socialInteracting[a.type] = true
    },onSocialEndInteraction: function(a) {
        this.socialInteracting[a.type] = false;
        this.closeSocialWidget()
    }});
AbstractInteractiveDirective.NAME = "AbstractInteractive";
AbstractInteractiveDirective.CLOSE_COMPLETE = AbstractInteractiveDirective.NAME + "CloseComplete";
var VideoPlayer = function(a, b, c, d) {
    this.player = null;
    this.element = a;
    b = b !== undefined ? b : "Onb-oXTx8CI";
    this.loop = null;
    this.video_bar = document.createElement("div");
    this.video_bar.className = "video-bar";
    this.video_progress = document.createElement("div");
    this.video_progress.className = "video-progress";
    this.play_pause = document.createElement("div");
    this.play_pause.className = "play-pause is-not-playing";
    this.video_bar.appendChild(this.video_progress);
    this.video_bar.appendChild(this.play_pause);
    this.is_playing = true;
    this.el = null;
    if (c.selector) {
        var e = c[0]
    } else {
        var e = c
    }
    var f = this;
    this.player = new YT.Player(e, {height: "100%",width: "100%",videoId: b,playerVars: {autoplay: 1,controls: 0,modestbranding: 1,rel: 0,showinfo: 0,iv_load_policy: 3,wmode: "opaque",hd: 1},events: {onReady: function() {
                f.playerReady()
            },onStateChange: this.stateChange,onError: this.error}});
    this.init();
    var g = this;
    this.play_pause.addEventListener("click", function() {
        g.play()
    });
    this.closeOnEnd = d !== undefined ? d : true
};
VideoPlayer.prototype = {init: function() {
        var a = this;
        $(this.play_pause).removeClass("is-not-playing").addClass("is-playing");
        this.loop = setInterval(function() {
            try {
                var b = a.player.getDuration();
                var c = a.player.getCurrentTime();
                var d = Math.floor(c / b * 100);
                $(a.video_progress).css("width", d + "%");
                if (c >= b) {
                    if (a.closeOnEnd) {
                        setTimeout(function() {
                            if (a.closeCallback) {
                                a.closeCallback()
                            }
                        }, 0)
                    } else if (!a.closeOnEnd) {
                        a.is_playing = false;
                        a.play_pause.removeClass("is-playing").addClass("is-not-playing")
                    }
                }
            } catch (e) {
            }
        }, 1);
        var a = this;
        $(this.video_bar).on("click", function(b) {
            var c = b.target;
            if (c.className.search("play") === -1) {
                var d = b.pageX - $(c).offset().left;
                var e = d / $(this).width();
                var f = a.player.getDuration() * e;
                a.player.seekTo(Math.floor(f), true)
            }
        });
        this.element.append(this.video_bar)
    },play: function() {
        if (this.is_playing == true) {
            this.player.pauseVideo();
            this.is_playing = false;
            $(this.play_pause).removeClass("is-playing").addClass("is-not-playing")
        } else {
            this.player.playVideo();
            this.is_playing = true;
            $(this.play_pause).removeClass("is-not-playing").addClass("is-playing");
            this.startedPlayback = true
        }
    },addApi: function() {
        console.log("addAPI called");
        var a = document.createElement("script");
        a.src = "https://www.youtube.com/iframe_api";
        var b = document.getElementsByTagName("head")[0].getElementsByTagName("script");
        var c = b.length;
        if (c <= 0) {
            document.getElementsByTagName("head")[0].appendChild(a)
        } else {
            for (var d = 0; d < c; ++d) {
                var e = b[d];
                if (e.src.search("youtube") === -1) {
                    document.getElementsByTagName("head")[0].appendChild(a)
                }
            }
        }
    },setCloseCallback: function(a) {
        this.closeCallback = a
    },setReadyCallback: function(a) {
        this.readyCallback = a
    },destroy: function() {
        clearInterval(this.loop)
    },playerReady: function(a) {
        if ($.isFunction(this.readyCallback)) {
            this.readyCallback()
        }
    },stateChange: function(a) {
    },error: function(a) {
    }};
var VideoSeekBar = function(a, b) {
    this.player = a;
    this.loop = null;
    this.element = b;
    this.video_bar = document.createElement("div");
    this.video_bar.className = "video-bar";
    $(this.video_bar).css("margin-top", 14);
    this.video_progress = document.createElement("div");
    this.video_progress.className = "video-progress";
    this.play_pause = document.createElement("div");
    this.play_pause.className = "play-pause is-not-playing";
    this.video_bar.appendChild(this.video_progress);
    this.video_bar.appendChild(this.play_pause);
    var c = this;
    this.play_pause.addEventListener("click", function() {
        c.play()
    })
};
VideoSeekBar.prototype = {init: function() {
        var a = this;
        $(this.play_pause).removeClass("is-not-playing").addClass("is-playing");
        if ($(this.video_bar)[0].style.display == "none") {
            $(this.video_bar).fadeIn("fast")
        }
        this.loop = setInterval(function() {
            try {
                var b = a.player.getDuration();
                var c = a.player.getCurrentTime();
                var d = Math.floor(c / b * 100);
                $(a.video_progress).css("width", d + "%");
                if (c >= b) {
                    if (a.closeOnEnd) {
                        setTimeout(function() {
                            if (a.closeCallback) {
                                a.closeCallback()
                            }
                        }, 1200)
                    } else if (!a.closeOnEnd) {
                        a.is_playing = false;
                        a.play_pause.removeClass("is-playing").addClass("is-not-playing")
                    }
                }
            } catch (e) {
            }
        }, 400);
        $(this.video_bar).on("click", function(b) {
            var c = b.target;
            if (c.className.search("play") === -1) {
                var d = b.pageX - $(c).offset().left;
                var e = d / $(this).width();
                var f = a.player.getDuration() * e;
                a.player.seekTo(Math.floor(f), true)
            }
        });
        this.element.append(this.video_bar)
    },play: function() {
        if (this.is_playing == true) {
            this.player.pauseVideo();
            this.is_playing = false;
            $(this.play_pause).removeClass("is-playing").addClass("is-not-playing")
        } else {
            this.player.playVideo();
            this.is_playing = true;
            $(this.play_pause).removeClass("is-not-playing").addClass("is-playing");
            this.startedPlayback = true
        }
    },destroy: function() {
        $(this.play_pause).removeClass("is-playing").addClass("is-not-playing");
        $(this.video_bar).fadeOut("fast", function() {
            $(this.video_progress).css("width", 0)
        });
        clearInterval(this.loop)
    }};
var GalleryInteractiveDirective = AbstractInteractiveDirective.extend({init: function(a, b, c, d, e) {
        this._super(a, b, c, d);
        this.$location = e;
        this.$window = $(window);
        this.$content = b.find(".content");
        this.nav = new GalleryInteractiveNav(b.find(".gallery-nav"));
        this.inner_nav = new GalleryInteractiveInnerNav(b.find(".gallery-inner-nav"));
        this.$scroller = this.$content.find(".scroller");
        this.$closeButton = this.$element.find(".close-interactive");
        this.$closeButton.bind("click", this.onCloseButtonClicked.bind(this));
        this.$curtain = this.$element.find(".gallery-curtain");
        this.currentGalleryImage = null;
        this.aScrollItem = [];
        this.inViewItems = [];
        this.numItems = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.contentHeight = 0;
        this.itemWidth = 0;
        this.scrollerHeight = 0;
        this.scrollerWidth = 0;
        this.animating = false;
        this.raf = null;
        this.defaultSpeed = -.05;
        this.speed = 0;
        this.currentTime = 0;
        this.x = 0;
        this.loopWidth = 0;
        this.preloader = new GalleryPreloaderView(this.$element.find(".preloader"));
        this.dataModel = new GalleryDataModel;
        this.mediaMenu = new GalleryMediaMenu(this.$element.find(".item-menu"));
        this.mediaMenu.addEventListener(GalleryMediaMenu.CLOSE_COMPLETE, this.onMediaMenuClosed.bind(this));
        this.calculateDimensions();
        this.detailed_nav_mode = false;
        var f = this;
        $(document).bind("keyup", function(a) {
            if (a.which == 32) {
                if (f.animating) {
                    f.stopInfiniteScroll()
                } else {
                    f.startInfiniteScroll()
                }
            }
        });
        this.$window.off("keydown");
        this.$window.on("keydown", this.windowEscClicked.bind(this))
    },start: function() {
        this.dataModel.addEventListener(GalleryDataModel.LOAD_START, this.onLoadStart.bind(this));
        this.dataModel.addEventListener(GalleryDataModel.LOAD_PROGRESS, this.onLoadProgress.bind(this));
        this.dataModel.addEventListener(GalleryDataModel.LOAD_COMPLETE, this.onLoadComplete.bind(this));
        this.dataModel.load();
        this.nav.addEventListener(GalleryInteractiveNav.PREVIOUS_ON, this.onPreviousOn.bind(this));
        this.nav.addEventListener(GalleryInteractiveNav.PREVIOUS_OFF, this.onPreviousOff.bind(this));
        this.nav.addEventListener(GalleryInteractiveNav.NEXT_ON, this.onNextOn.bind(this));
        this.nav.addEventListener(GalleryInteractiveNav.NEXT_OFF, this.onNextOff.bind(this));
        this.nav.addEventListener(GalleryInteractiveNav.PREVIOUS_CLICKED, this.onPreviousClicked.bind(this));
        this.nav.addEventListener(GalleryInteractiveNav.NEXT_CLICKED, this.onNextClicked.bind(this));
        this.inner_nav.addEventListener(GalleryInteractiveInnerNav.PREVIOUS_ON, this.onInnerPreviousOn.bind(this));
        this.inner_nav.addEventListener(GalleryInteractiveInnerNav.PREVIOUS_OFF, this.onInnerPreviousOff.bind(this));
        this.inner_nav.addEventListener(GalleryInteractiveInnerNav.NEXT_ON, this.onInnerNextOn.bind(this));
        this.inner_nav.addEventListener(GalleryInteractiveInnerNav.NEXT_OFF, this.onInnerNextOff.bind(this));
        this.inner_nav.addEventListener(GalleryInteractiveInnerNav.PREVIOUS_CLICKED, this.onInnerPreviousClicked.bind(this));
        this.inner_nav.addEventListener(GalleryInteractiveInnerNav.NEXT_CLICKED, this.onInnerNextClicked.bind(this))
    },isAnimating: function() {
        return this.animating
    },onLoadStart: function(a) {
        this.preloader.show()
    },onLoadProgress: function(a) {
        this.preloader.setLoaded(a.data)
    },onLoadComplete: function() {
        this.dataModel.removeEventListeners();
        if (!this.aScrollItem.length) {
            this.setupScroller()
        } else {
            this.initItemPositions()
        }
        $(window).bind("resize.gallery", this.onResize.bind(this));
        this.onResize(null);
        this.preloader.hide(this.doIntro.bind(this))
    },doIntro: function() {
        var a = this.inViewItems.length;
        var b;
        var c;
        var d;
        var e;
        var f = 0;
        var g = .1;
        var h;
        var i = 0;
        while (--a > -1) {
            d = this.inViewItems[a];
            c = d.media.length;
            d.setX(i);
            i += this.itemWidth;
            for (b = 0; b < c; ++b) {
                if (a == 0 && b + 1 == c) {
                    h = this.onIntroComplete.bind(this)
                } else {
                    h = null
                }
                e = d.media[b];
                e.doThumbTransition(.5, f, h);
                f += g
            }
        }
    },onIntroComplete: function() {
        this.inViewItems = [];
        this.showCloseButton();
        this.mediaMenu.open();
        this.nav.show();
        this.startInfiniteScroll();
        this.tryOpenHashImage();
        var a = this;
        var b = setTimeout(function() {
            a.nav.$anchorNext.removeClass("on");
            a.nav.$anchorPrevious.removeClass("on")
        }, 2e3);
        $.each(this.aScrollItem, function() {
            this.ready()
        })
    },startInfiniteScroll: function() {
        this.speed = 0;
        this.animating = true;
        this.currentTime = performance.now();
        this.raf = requestAnimationFrame(this.animate.bind(this));
        this.changeInfiniteScrollSpeed(this.defaultSpeed, .5)
    },animate: function() {
        if (this.animating) {
            this.raf = requestAnimationFrame(this.animate.bind(this))
        }
        var a = performance.now();
        var b = a - this.currentTime;
        var c = this.speed * b;
        this.x += c;
        if (this.x >= 0) {
            this.x = this.x - this.loopWidth
        }
        if (this.x <= -this.loopWidth) {
            this.x = this.x + this.loopWidth
        }
        TweenMax.to(this.$scroller[0], 0, {transform: "translate(" + this.x + "px, 0)"});
        this.currentTime = a
    },stopInfiniteScroll: function(a, b) {
        if (this.raf) {
            a == typeof a == "undefined" ? 0 : a;
            if (a > 0) {
                this.speed = this.defaultSpeed;
                var c = this;
                this.changeInfiniteScrollSpeed(0, 1, function() {
                    c.onScrollStopped(b)
                })
            } else {
                this.onScrollStopped(b)
            }
        }
    },onScrollStopped: function(a) {
        this.animating = false;
        cancelAnimationFrame(this.raf);
        this.raf = null;
        this.x = Math.round(this.x);
        TweenMax.to(this.$scroller[0], 0, {transform: "translate(" + this.x + "px, 0)"});
        if ($.isFunction(a)) {
            a()
        }
    },close: function() {
        var a = this;
        this.$scope.$apply(function() {
            a.$location.search("img", null)
        });
        this.mediaMenu.close();
        this.stopInfiniteScroll(.5, this.doClose.bind(this))
    },doClose: function() {
        var a = this.aScrollItem.length;
        var b;
        var c;
        var d;
        var e;
        var f;
        var g = 0;
        var h = .1;
        var i = false;
        var j = null;
        this.hideCloseButton();
        this.inViewItems = [];
        while (--a > -1) {
            e = this.aScrollItem[a];
            if (this.isItemInView(e)) {
                i = true;
                e.setX(-this.itemWidth);
                this.inViewItems.unshift(e)
            } else if (i) {
                break
            }
        }
        c = this.inViewItems.length;
        for (a = 0; a < c; ++a) {
            e = this.inViewItems[a];
            d = e.media.length;
            for (b = 0; b < d; ++b) {
                if (a + 1 == c && b + 1 == d) {
                    j = this.onCloseComplete.bind(this)
                } else {
                    j = null
                }
                f = e.media[b];
                f.setX(-this.itemWidth);
                f.doThumbTransition(.5, g, j);
                g += h
            }
        }
    },onCloseComplete: function() {
        $(window).unbind("resize.gallery");
        this._super()
    },setupScroller: function() {
        var a = this.dataModel.items;
        var b = a.length;
        var c;
        var d;
        var e;
        var f;
        var g;
        a = shuffleArray(a);
        this.numItems = b;
        for (var h = 0; h < b; ++h) {
            c = a[h];
            g = c.images.length;
            while (--g > -1) {
                d = c.images[g];
                f = "num" + baseten.String.ucfirst(baseten.String.seoToCamelCase(d.type));
                d.group_no = h;
                d.group_index = g;
                if (!this.$scope[f]) {
                    this.$scope[f] = 0
                }
                ++this.$scope[f]
            }
            e = new GalleryItemView(c, h);
            this.addScrollItemEvents(e);
            this.aScrollItem.push(e);
            e.appendChildren(this.$scroller)
        }
        this.itemWidth = e.width;
        this.x = 0;
        this.scrollerHeight = e.height;
        this.scrollerWidth = this.itemWidth * b;
        this.loopWidth = this.scrollerWidth;
        this.initItemPositions();
        TweenMax.to(this.$scroller[0], 0, {transform: "translate(" + this.x + ", 0)",marginTop: -this.scrollerHeight >> 1,width: this.scrollerWidth});
        this.$scope.$apply()
    },setupCloneItems: function() {
        var a = Math.ceil(this.windowWidth / this.itemWidth);
        var b = this.aScrollItem.length;
        var c = b - this.numItems;
        var d;
        var e = b * this.itemWidth;
        var f;
        var g;
        var h;
        if (a > c) {
            d = a - c;
            for (var i = 0; i < d; ++i) {
                g = b + i;
                h = g % this.numItems;
                f = this.aScrollItem[h].clone(g);
                f.appendChildren(this.$scroller);
                f.setLayout(f.layout);
                f.setX(e);
                f.iterateChildren("doThumbTransition");
                this.addScrollItemEvents(f);
                this.aScrollItem.push(f);
                e += this.itemWidth
            }
            this.scrollerWidth = e;
            this.$scroller.width(this.scrollerWidth)
        }
    },addScrollItemEvents: function(a) {
        a.addEventListener(GalleryMediaView.OPEN_REQUEST, this.onGalleryItemOpenRequest.bind(this));
        a.addEventListener(GalleryMediaView.OPEN_COMPLETE, this.onGalleryItemOpenComplete.bind(this));
        a.addEventListener(GalleryMediaView.CLOSE_READY, this.onGalleryItemCloseReady.bind(this));
        a.addEventListener(GalleryMediaView.CLOSE_COMPLETE, this.onGalleryItemCloseComplete.bind(this))
    },initItemPositions: function() {
        var a = this.aScrollItem.length;
        var b;
        var c = 0;
        for (var d = 0; d < a; ++d) {
            b = this.aScrollItem[d];
            b.setX(c);
            b.setLayout(d % 2);
            if (this.isItemInView(b)) {
                b.setX(this.windowWidth);
                this.inViewItems.unshift(b)
            }
            b.iterateChildren("doThumbTransition");
            c += this.itemWidth
        }
    },isItemInView: function(a, b) {
        b = typeof b == "undefined" ? 0 : b;
        var c = a.x + this.x + b + a.width <= 0;
        var d = a.x + this.x + b >= this.windowWidth;
        return !(c || d)
    },openNewGalleryItem: function(a, b, c) {
        this.currentGalleryImage.close(true, this.$curtain);
        this.stopInfiniteScroll();
        this.detailed_nav_mode = true;
        if (this.currentGalleryImage.imageVO.type === "campaign-videos") {
            this.currentGalleryImage.killPlayer()
        }
        this.currentGalleryImage = this.aScrollItem[a].media[b];
        this.current_open_group = a;
        this.current_group_item = b;
        this.dataModel.addEventListener(GalleryDataModel.LOAD_COMPLETE, this.onLargeImageLoaded.bind(this));
        this.dataModel.addEventListener(GalleryDataModel.LOAD_PROGRESS, this.onLoadProgress.bind(this));
        this.mediaMenu.setDownloadHref(c.downloadPath);
        var d = $(c.largeImage).attr("src");
        if (typeof large_image_src === "undefined") {
            d = c.src.replace(/\/[A-z]{5}_thumbs\//, "/large/")
        }
        this.currentGalleryImage.open(this.x, true);
        var e = false, d = c.downloadPath, f = d.match("product-shots");
        if (f !== null) {
            e = true
        }
        var g = {showDownload: e};
        this.mediaMenu.reopen(g);
        this.preloader.show();
        this.dataModel.loadLargeImageForId(c.id)
    },onGalleryItemOpenRequest: function(a) {
        if (this.currentGalleryImage)
            return;
        this.nav.hide();
        this.inner_nav.show();
        this.stopInfiniteScroll();
        this.$element.addClass("open");
        this.currentGalleryImage = a.target;
        this.current_open_group = a.target.imageVO.group_no;
        this.current_group_item = a.target.imageVO.group_index;
        this.mediaMenu.setDownloadHref(this.currentGalleryImage.imageVO.downloadPath);
        this.dataModel.addEventListener(GalleryDataModel.LOAD_COMPLETE, this.onLargeImageLoaded.bind(this));
        this.dataModel.addEventListener(GalleryDataModel.LOAD_PROGRESS, this.onLoadProgress.bind(this));
        var b = false, c = this.currentGalleryImage.imageVO.downloadPath, d = c.match("product-shots");
        if (d !== null) {
            b = true
        }
        var e = {showDownload: b};
        this.mediaMenu.reopen(e);
        if (this.currentGalleryImage.imageVO.largeImage) {
            this.onLargeImageLoaded(null)
        } else {
            this.preloader.show();
            this.dataModel.loadLargeImageForId(this.currentGalleryImage.imageVO.id)
        }
    },onLargeImageLoaded: function(a) {
        this.dataModel.removeEventListeners();
        this.preloader.hide();
        var b = this;
        var c = setTimeout(function() {
            b.$curtain.fadeOut(400)
        }, 1e3);
        if (this.detailed_nav_mode === true) {
            this.currentGalleryImage.onOpenImageLoaded(true)
        } else {
            this.currentGalleryImage.onOpenImageLoaded()
        }
        this.currentGalleryImage.open(this.x)
    },onGalleryItemOpenComplete: function(a) {
        var b = this;
        this.$scope.$apply(function() {
            b.$location.search("img", a.data.imageVO.id)
        });
        this.$scope.updateSocial(this.$location.absUrl());
        this.mediaMenu.open({showDownload: true})
    },onCloseButtonClicked: function(a) {
        a.preventDefault();
        if (!this.currentGalleryImage) {
            this.close()
        } else {
            this.currentGalleryImage.onBeforeClose()
        }
    },onGalleryItemCloseReady: function(a) {
        this.mediaMenu.reopen({emitEvent: true})
    },onMediaMenuClosed: function(a) {
        if (this.currentGalleryImage) {
            this.currentGalleryImage.close()
        }
    },onGalleryItemCloseComplete: function(a) {
        this.$element.removeClass("open");
        this.currentGalleryImage = null;
        var b = this;
        this.$scope.$apply(function() {
            b.$location.search("img", null)
        });
        this.$scope.updateSocial(this.$location.absUrl());
        this.startInfiniteScroll();
        this.inner_nav.hide();
        this.detailed_nav_mode = false;
        this.nav.show()
    },showCloseButton: function() {
        this.$closeButton.removeClass("invisible");
        TweenMax.to(this.$closeButton[0], .5, {opacity: 1})
    },hideCloseButton: function() {
        TweenMax.to(this.$closeButton[0], .5, {opacity: 0,onComplete: this.onCloseButtonHidden.bind(this)})
    },onCloseButtonHidden: function() {
        this.$closeButton.addClass("invisible")
    },calculateDimensions: function() {
        this.windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        this.windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
        this.contentHeight = this.$content.outerHeight()
    },onResize: function(a) {
        var b, c, d, e, f;
        this.calculateDimensions();
        this.setupCloneItems();
        f = (this.contentHeight - this.scrollerHeight) * .5;
        e = this.aScrollItem.length;
        while (--e > -1) {
            d = this.aScrollItem[e];
            d.onResize(this.windowWidth, this.windowHeight, f)
        }
    },onPreviousClicked: function() {
        var a = this;
        this.changeInfiniteScrollSpeed(-this.defaultSpeed * 20, .2, function() {
            a.changeInfiniteScrollSpeed(a.defaultSpeed, .5)
        })
    },onNextClicked: function() {
        var a = this;
        this.changeInfiniteScrollSpeed(this.defaultSpeed * 20, .2, function() {
            a.changeInfiniteScrollSpeed(a.defaultSpeed, .5)
        })
    },onInnerPreviousClicked: function() {
        var a, b, c = this.dataModel.items.length;
        if (this.current_group_item - 1 < 0) {
            b = 2;
            if (this.current_open_group - 1 < 0) {
                a = c - 1
            } else {
                a = this.current_open_group - 1
            }
        } else {
            b = this.current_group_item - 1;
            a = this.current_open_group
        }
        var d = this.dataModel.items[a].images[b];
        if (d.type === "campaign-videos") {
            this.current_current_group_item = b;
            this.current_open_group = a;
            this.onInnerPreviousClicked()
        } else {
            this.openNewGalleryItem(a, b, d)
        }
    },onInnerNextClicked: function() {
        var a, b, c = this.dataModel.items.length;
        if (this.current_group_item + 1 > 2) {
            b = 0;
            if (this.current_open_group + 1 > c - 1) {
                a = 0
            } else {
                a = this.current_open_group + 1
            }
        } else {
            b = this.current_group_item + 1;
            a = this.current_open_group
        }
        var d = this.dataModel.items[a].images[b];
        if (d.type === "campaign-videos") {
            this.current_current_group_item = b;
            this.current_open_group = a;
            this.onInnerNextClicked()
        } else {
            this.openNewGalleryItem(a, b, d)
        }
    },onPreviousOn: function() {
        this.nav.$anchorPrevious.addClass("on")
    },onPreviousOff: function() {
        this.nav.$anchorPrevious.removeClass("on")
    },onNextOn: function() {
        this.nav.$anchorNext.addClass("on")
    },onNextOff: function() {
        this.nav.$anchorNext.removeClass("on")
    },onInnerPreviousOn: function() {
        this.inner_nav.$anchorPrevious.addClass("on")
    },onInnerPreviousOff: function() {
        this.inner_nav.$anchorPrevious.removeClass("on")
    },onInnerNextOn: function() {
        this.inner_nav.$anchorNext.addClass("on")
    },onInnerNextOff: function() {
        this.inner_nav.$anchorNext.removeClass("on")
    },changeInfiniteScrollSpeed: function(a, b, c) {
        if (!c) {
            c = null
        }
        TweenMax.to(this, b, {speed: a,ease: Power4.easeIn,onComplete: c})
    },tryOpenHashImage: function() {
        var a = 0, b = 0, c = null, d = null;
        for (var a = 0; a < this.aScrollItem.length; a++) {
            c = this.aScrollItem[a];
            for (var b = 0; b < c.media.length; b++) {
                d = c.media[b];
                if (this.$location.search().img == d.imageVO.id) {
                    d.sendOpenRequest();
                    return
                }
            }
        }
    },windowEscClicked: function(a) {
        var b = 27;
        if (a.which == b) {
            if (this.currentGalleryImage) {
                this.currentGalleryImage.onBeforeClose()
            } else {
                this.close()
            }
            a.preventDefault();
            return false
        }
    },destroy: function() {
        this.nav.destroy()
    }});
var GalleryInteractiveInnerNav = baseten.EventDispatcher.extend({init: function(a) {
        this.$element = a;
        this.$anchorsArrows = a.find(".gallery-inner-nav-arrows .arrow");
        this.$anchorPrevious = this.$anchorsArrows.filter(".previous");
        this.$anchorNext = this.$anchorsArrows.filter(".next");
        this.$anchorPreviousArea = a.find(".gallery-inner-nav-arrows .left-arrow");
        this.$anchorNextArea = a.find(".gallery-inner-nav-arrows .right-arrow");
        this.$anchorPreviousArea.on("mouseover", this.showPreviousButton.bind(this));
        this.$anchorNextArea.on("mouseover", this.showNextButton.bind(this));
        this.$anchorPreviousArea.on("mouseout", this.hidePreviousButton.bind(this));
        this.$anchorNextArea.on("mouseout", this.hideNextButton.bind(this));
        this.$anchorPrevious.on("mousedown", this.arrowPreviousClicked.bind(this));
        this.$anchorNext.on("mousedown", this.arrowNextClicked.bind(this));
        this._super()
    },showPreviousButton: function() {
        this.dispatchEvent(GalleryInteractiveInnerNav.PREVIOUS_ON);
        return false
    },hidePreviousButton: function() {
        this.dispatchEvent(GalleryInteractiveInnerNav.PREVIOUS_OFF);
        return false
    },showNextButton: function() {
        this.dispatchEvent(GalleryInteractiveInnerNav.NEXT_ON);
        return false
    },hideNextButton: function() {
        this.dispatchEvent(GalleryInteractiveInnerNav.NEXT_OFF);
        return false
    },arrowPreviousClicked: function() {
        this.dispatchEvent(GalleryInteractiveInnerNav.PREVIOUS_CLICKED);
        return false
    },arrowNextClicked: function() {
        this.dispatchEvent(GalleryInteractiveInnerNav.NEXT_CLICKED);
        return false
    },show: function() {
        this.$element.show()
    },hide: function() {
        this.$element.hide()
    },destroy: function() {
        this.hide()
    }});
GalleryInteractiveInnerNav.NAME = "GalleryInteractiveInnerNav";
GalleryInteractiveInnerNav.PREVIOUS_CLICKED = GalleryInteractiveInnerNav.NAME + "PreviousClicked";
GalleryInteractiveInnerNav.NEXT_CLICKED = GalleryInteractiveInnerNav.NAME + "NEXT_CLICKED";
GalleryInteractiveInnerNav.PREVIOUS_ON = GalleryInteractiveInnerNav.NAME + "PREVIOUS_ON";
GalleryInteractiveInnerNav.PREVIOUS_OFF = GalleryInteractiveInnerNav.NAME + "PREVIOUS_OFF";
GalleryInteractiveInnerNav.NEXT_ON = GalleryInteractiveInnerNav.NAME + "NEXT_ON";
GalleryInteractiveInnerNav.NEXT_OFF = GalleryInteractiveInnerNav.NAME + "NEXT_OFF";
var GalleryInteractiveNav = baseten.EventDispatcher.extend({init: function(a) {
        this.$element = a;
        this.$anchorsArrows = a.find(".gallery-nav-arrows .arrow");
        this.$anchorPrevious = this.$anchorsArrows.filter(".previous");
        this.$anchorNext = this.$anchorsArrows.filter(".next");
        this.$anchorPreviousArea = a.find(".gallery-nav-arrows .left-arrow");
        this.$anchorNextArea = a.find(".gallery-nav-arrows .right-arrow");
        this.$anchorPreviousArea.on("mouseover", this.showPreviousButton.bind(this));
        this.$anchorNextArea.on("mouseover", this.showNextButton.bind(this));
        this.$anchorPreviousArea.on("mouseout", this.hidePreviousButton.bind(this));
        this.$anchorNextArea.on("mouseout", this.hideNextButton.bind(this));
        this.$anchorPrevious.on("mousedown", this.arrowPreviousClicked.bind(this));
        this.$anchorNext.on("mousedown", this.arrowNextClicked.bind(this));
        this._super()
    },showPreviousButton: function() {
        this.dispatchEvent(GalleryInteractiveNav.PREVIOUS_ON);
        return false
    },hidePreviousButton: function() {
        this.dispatchEvent(GalleryInteractiveNav.PREVIOUS_OFF);
        return false
    },showNextButton: function() {
        this.dispatchEvent(GalleryInteractiveNav.NEXT_ON);
        return false
    },hideNextButton: function() {
        this.dispatchEvent(GalleryInteractiveNav.NEXT_OFF);
        return false
    },arrowPreviousClicked: function() {
        this.dispatchEvent(GalleryInteractiveNav.PREVIOUS_CLICKED);
        return false
    },arrowNextClicked: function() {
        this.dispatchEvent(GalleryInteractiveNav.NEXT_CLICKED);
        return false
    },show: function() {
        this.$element.removeClass("invisible")
    },hide: function() {
        this.$element.addClass("invisible")
    },destroy: function() {
        this.hide()
    }});
GalleryInteractiveNav.NAME = "GalleryInteractiveNav";
GalleryInteractiveNav.PREVIOUS_CLICKED = GalleryInteractiveNav.NAME + "PreviousClicked";
GalleryInteractiveNav.NEXT_CLICKED = GalleryInteractiveNav.NAME + "NEXT_CLICKED";
GalleryInteractiveNav.PREVIOUS_ON = GalleryInteractiveNav.NAME + "PREVIOUS_ON";
GalleryInteractiveNav.PREVIOUS_OFF = GalleryInteractiveNav.NAME + "PREVIOUS_OFF";
GalleryInteractiveNav.NEXT_ON = GalleryInteractiveNav.NAME + "NEXT_ON";
GalleryInteractiveNav.NEXT_OFF = GalleryInteractiveNav.NAME + "NEXT_OFF";
var GalleryItemView = baseten.EventDispatcher.extend({init: function(a, b) {
        this.itemVO = a;
        this.index = b;
        this.smallSize = 0;
        this.largeSize = 0;
        this.spacing = 0;
        this.layout = 0;
        this.x = 0;
        this.width = 0;
        this.height = 0;
        this.media = [];
        this.setupMedia();
        this._super()
    },ready: function() {
        $.each(this.media, function() {
            this.ready()
        })
    },clone: function(a) {
        var b = new GalleryItemView(this.itemVO, a);
        b.setLayout(this.layout);
        return b
    },setupMedia: function() {
        var a = this.itemVO.images.length;
        var b;
        var c;
        for (var d = 0; d < a; ++d) {
            b = this.itemVO.images[d];
            if (b.type == GalleryDataModel.CAMPAIGN_VIDEO) {
                c = new GalleryVideoView(b, d)
            } else {
                c = new GalleryMediaView(b, d)
            }
            c.addEventListener(GalleryMediaView.OPEN_REQUEST, this.forwardEvent.bind(this));
            c.addEventListener(GalleryMediaView.OPEN_COMPLETE, this.forwardEvent.bind(this));
            c.addEventListener(GalleryMediaView.CLOSE_READY, this.forwardEvent.bind(this));
            c.addEventListener(GalleryMediaView.CLOSE_COMPLETE, this.forwardEvent.bind(this));
            c.addEventListener(GalleryMediaView.ANIMATION_COMPLETE, this.forwardEvent.bind(this));
            this.media.push(c)
        }
    },appendChildren: function(a) {
        var b = this.media.length;
        var c;
        while (--b > -1) {
            c = this.media[b];
            a.append(c.$element);
            c.addedToDOM();
            if (c.size == GalleryDataModel.LARGE) {
                this.largeSize = c.width;
                this.width = c.width + c.spacing
            } else {
                this.smallSize = c.width
            }
        }
        this.spacing = c.spacing;
        this.height = this.smallSize + this.largeSize + this.spacing
    },setX: function(a) {
        var b = a;
        var c = a;
        var d;
        var e = this.media.length;
        for (var f = 0; f < e; ++f) {
            d = this.media[f];
            if (d.size == GalleryDataModel.LARGE) {
                d.setX(c)
            } else {
                d.setX(b);
                b += this.smallSize + this.spacing
            }
        }
        this.x = a
    },setLayout: function(a) {
        var b = this.media.length;
        var c;
        this.layout = a;
        while (--b > -1) {
            c = this.media[b];
            if (c.size == GalleryDataModel.LARGE) {
                if (a == 0) {
                    c.setY(0)
                } else {
                    c.setY(this.smallSize + this.spacing)
                }
            } else {
                if (a == 0) {
                    c.setY(this.largeSize + this.spacing)
                } else {
                    c.setY(0)
                }
            }
        }
    },iterateChildren: function(a, b) {
        var c = this.media.length;
        var d;
        while (--c > -1) {
            d = this.media[c];
            if ($.isFunction(d[a])) {
                d[a].apply(d, b)
            }
        }
    },onResize: function(a, b, c) {
        this.iterateChildren("onResize", [a, b, c])
    }});
GalleryItemView.NAME = "GalleryItemView";
var GalleryMediaMenu = baseten.EventDispatcher.extend({init: function(a) {
        this.$element = a;
        this.$download = this.$element.find("a.download");
        this.$download.hide();
        this.height = this.$element.outerHeight();
        this.y = this.height;
        angular.injector(["nexus"]).invoke(["uiService", function(a) {
                this.uiService = a;
                this.doTransition(0)
            }], this);
        this._super()
    },setDownloadHref: function(a) {
        this.$download.attr("href", a)
    },open: function(a) {
        a = $.extend({showDownload: false}, a);
        var b = this;
        this.$element.removeClass("invisible");
        this.$download[a.showDownload ? "show" : "hide"]();
        this.y = 0;
        setTimeout(function() {
            b.doTransition(.3)
        }, 0)
    },reopen: function(a) {
        a = $.extend({emitEvent: false}, a);
        this.close(true, a)
    },close: function(a, b) {
        this.y = this.height;
        this.cancel = true;
        var c = this;
        setTimeout(function() {
            c.doTransition(.3, function() {
                if (a && b.emitEvent || !a) {
                    c.onCloseComplete()
                }
                if (a) {
                    c.open(b)
                }
            })
        }, 0)
    },onCloseComplete: function() {
        this.dispatchEvent(GalleryMediaMenu.CLOSE_COMPLETE)
    },doTransition: function(a, b) {
        TweenMax.to(this.$element, a, $.extend(this.uiService.getYObj(this.y), {onComplete: b}))
    }});
GalleryMediaMenu.NAME = "GalleryMediaMenu";
GalleryMediaMenu.CLOSE_COMPLETE = GalleryMediaMenu.NAME + "CloseComplete";
var GalleryMediaView = baseten.EventDispatcher.extend({init: function(a, b) {
        this.imageVO = a;
        this.index = b;
        this.size = a.size;
        var c = a.size == GalleryDataModel.LARGE ? "thumb large" : "thumb";
        this.$window = $(window);
        this.$element = $('<li class="' + c + '" data-media-id="' + a.id + '">' + '<div class="closed"><a class="view"></a></div>' + '<div class="open hidden"></div>' + "</li>");
        this.$openContainer = this.$element.children("div.open");
        this.$openContainer.css("backgroundColor", a.bgColour);
        this.$closedContainer = this.$element.children("div.closed");
        this.$link = this.$closedContainer.children("a.view");
        var d = a.image;
        this.closedImageWidth = d.width;
        this.closedImageHeight = d.height;
        if (a.isRetina) {
            this.closedImageWidth = Math.round(d.width * .5);
            this.closedImageHeight = Math.round(d.height * .5)
        }
        this.$closedImg = $('<img src="' + d.src + '" />');
        this.$closedImg.css({width: this.closedImageWidth,height: this.closedImageHeight});
        this.$link.append(this.$closedImg);
        this.$openImg = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.transform = {translate: {x: 0,y: 0,z: 0},scale: {x: 1,y: 1,z: 1}};
        this.openClip = new ClipRect(0, 0, 0, 0);
        this.closedClip = new ClipRect(0, 0, 0, 0);
        this.clip = null;
        this.willTweenClip = false;
        this.imageX = 0;
        this.imageY = 0;
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.closedX = 0;
        this.closedY = 0;
        this.closedContainerWidth = 0;
        this.closedContainerHeight = 0;
        this.closedScale = 0;
        this.inverseClosedScale = 0;
        this.openX = 0;
        this.openY = 0;
        this.openXOffset = 0;
        this.openYOffset = 0;
        this.openImageWidth = 0;
        this.openImageHeight = 0;
        this.openImageAspect = 0;
        this.openScale = 0;
        this.inverseOpenScale = 0;
        this.scrollerX = 0;
        this.scrollerY = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.windowAspect = 0;
        this.isLandscape = null;
        this.scaleToWidth = null;
        angular.injector(["nexus"]).invoke(["uiService", function(a) {
                this.uiService = a
            }], this);
        this._super()
    },ready: function() {
        this.$link.bind("click", this.onViewClicked.bind(this))
    },addedToDOM: function() {
        this.width = this.$element.width();
        this.height = this.$element.height();
        this.spacing = this.$element.outerWidth() - this.width
    },setX: function(a) {
        this.x = a
    },setY: function(a) {
        this.y = a
    },onViewClicked: function() {
        this.sendOpenRequest();
        return false
    },sendOpenRequest: function() {
        this.dispatchEvent(GalleryMediaView.OPEN_REQUEST)
    },onOpenImageLoaded: function(a) {
        var b = null;
        b = this.imageVO.largeImage;
        this.openImageWidth = b.width;
        this.openImageHeight = b.height;
        this.openImageAspect = this.openImageWidth / this.openImageHeight;
        this.$openImg = $(b);
        this.$openImg.css({width: this.openImageWidth,height: this.openImageHeight});
        this.$openContainer.prepend(this.$openImg);
        this.isLandscape = this.openImageAspect > 1;
        if (this.isLandscape) {
            this.closedScale = this.closedImageHeight / this.openImageHeight;
            this.closedContainerWidth = this.closedContainerHeight = this.closedImageHeight
        } else {
            this.closedScale = this.closedImageWidth / this.openImageWidth;
            this.closedContainerHeight = this.closedContainerWidth = this.closedImageWidth
        }
        this.inverseClosedScale = 1 / this.closedScale;
        this.calculateDimensions();
        if (a && a === true) {
            this.setClipRect(this.closedClip);
            this.applyOpenValues()
        } else {
            this.setClipRect(this.closedClip);
            this.applyClosedValues()
        }
        this.applyLayout();
        this.doContentTransition(.01)
    },open: function(a) {
        var b = this;
        if (this.isOpen)
            return;
        this.scrollerX = a;
        this.$element.addClass("open");
        this.$openContainer.removeClass("hidden");
        this.$link.addClass("hidden");
        this.applyOpenValues();
        setTimeout(function() {
            b.doContentTransition(.5, b.onOpenComplete.bind(b));
            $(".menu-button.download").hide()
        }, 0)
    },changeSrc: function(a, b) {
        var a = $(this.$element.find("img"));
        this.onOpenImageLoaded(a)
    },onOpenComplete: function() {
        this.isOpen = true;
        this.dispatchEvent(GalleryMediaView.OPEN_COMPLETE, this);
        var a = $(this.imageVO.largeImage).attr("src");
        if (typeof large_image_src === "undefined") {
            a = this.imageVO.src.replace(/\/[A-z]{5}_thumbs\//, "/large/");
            download_img_src = this.imageVO.src.replace(/\/[A-z]{5}_thumbs\//, "/download/");
            download_img_src = download_img_src.replace("-2x", "")
        }
        var b = a.match("product-shots");
        $(".item-menu").show();
        $downloadButton = $(".menu-button.download");
        if (b === null) {
            $downloadButton.attr("href", "");
            $downloadButton.hide()
        } else {
            $downloadButton.attr("href", download_img_src);
            $downloadButton.show()
        }
    },onBeforeClose: function() {
        if (!this.isOpen)
            return;
        this.dispatchEvent(GalleryMediaView.CLOSE_READY)
    },close: function(a, b) {
        if (!this.isOpen)
            return;
        this.isOpen = false;
        this.applyClosedValues();
        if (a) {
            b.show();
            this.doContentTransition(0, this.onImageChanged(b))
        } else {
            this.doContentTransition(.5, this.onCloseComplete.bind(this))
        }
    },onImageChanged: function(a) {
        this.$element.removeClass("open");
        this.$link.removeClass("hidden");
        this.$openContainer.addClass("hidden")
    },onCloseComplete: function() {
        this.$element.removeClass("open");
        this.$link.removeClass("hidden");
        this.$openContainer.addClass("hidden");
        this.dispatchEvent(GalleryMediaView.CLOSE_COMPLETE)
    },setClipRect: function(a) {
        if (this.clip && this.clip.equals(a))
            return;
        this.clip = a;
        this.willTweenClip = true
    },setScale: function(a) {
        this.transform.scale.x = this.transform.scale.y = a
    },setPosition: function(a, b) {
        this.transform.translate.x = Math.round(a);
        this.transform.translate.y = Math.round(b)
    },applyOpenValues: function() {
        this.calculateOpenPosition();
        this.setClipRect(this.openClip);
        this.setScale(this.openScale);
        this.setPosition(this.openX, this.openY)
    },applyClosedValues: function() {
        this.setClipRect(this.closedClip);
        this.setScale(this.closedScale);
        this.setPosition(this.closedX, this.closedY)
    },applyLayout: function() {
        this.$openContainer.css({width: Math.round(this.containerWidth),height: Math.round(this.containerHeight)});
        this.uiService.setBatchCSS(this.$openImg[0], {x: Math.round(this.imageX),y: Math.round(this.imageY)})
    },doThumbTransition: function(a, b, c) {
        a = typeof a == "undefined" ? 0 : a;
        b = typeof b == "undefined" ? 0 : b;
        TweenMax.to(this.$element[0], a, $.extend(this.uiService.getXYObj(this.x, this.y), {delay: b,onComplete: c}))
    },doContentTransition: function(a, b) {
        if (a < 0) {
            a = 0
        }
        var c = this.uiService.getXYScaleObj(this.transform.translate.x, this.transform.translate.y, this.transform.scale.x);
        if (this.willTweenClip) {
            c = $.extend(c, {clip: this.clip.toString()});
            this.willTweenClip = false
        }
        TweenMax.to(this.$openContainer, a, $.extend(c, {onComplete: b}))
    },calculateOpenPosition: function() {
        this.openX = -this.scrollerX - this.x - this.openXOffset;
        this.openY = -this.scrollerY - this.y - this.openYOffset
    },calculateDimensions: function() {
        this.scaleToWidth = this.openImageAspect > this.windowAspect;
        if (this.scaleToWidth) {
            this.openScale = this.windowWidth / this.openImageWidth;
            this.inverseOpenScale = 1 / this.openScale;
            this.containerWidth = this.openImageWidth;
            this.containerHeight = this.windowHeight * this.inverseOpenScale
        } else {
            this.openScale = this.windowHeight / this.openImageHeight;
            this.inverseOpenScale = 1 / this.openScale;
            this.containerWidth = this.windowWidth * this.inverseOpenScale;
            this.containerHeight = this.openImageHeight
        }
        this.closedClip.top = (this.containerHeight - this.closedContainerHeight * this.inverseClosedScale) * .5;
        this.closedClip.bottom = this.containerHeight - this.closedClip.top;
        this.closedClip.left = (this.containerWidth - this.closedContainerWidth * this.inverseClosedScale) * .5;
        this.closedClip.right = this.containerWidth - this.closedClip.left;
        this.openClip.right = this.containerWidth;
        this.openClip.bottom = this.containerHeight;
        this.imageX = (this.containerWidth - this.openImageWidth) * .5;
        this.imageY = (this.containerHeight - this.openImageHeight) * .5;
        this.closedX = (this.closedContainerWidth - this.containerWidth) * .5;
        this.closedY = (this.closedContainerHeight - this.containerHeight) * .5;
        this.openXOffset = (this.containerWidth - this.containerWidth * this.openScale) * .5;
        this.openYOffset = (this.containerHeight - this.containerHeight * this.openScale) * .5
    },onResize: function(a, b, c) {
        this.windowWidth = a;
        this.windowHeight = b;
        this.windowAspect = this.windowWidth / this.windowHeight;
        this.scrollerY = c;
        if (this.openImageHeight > 0) {
            this.calculateDimensions();
            if (this.isOpen) {
                this.applyOpenValues();
                this.applyLayout();
                this.doContentTransition(0)
            }
        }
    }});
var ClipRect = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
ClipRect.prototype.toString = function() {
    return "rect(" + Math.round(this.top) + "px " + Math.round(this.right) + "px " + Math.round(this.bottom) + "px " + Math.round(this.left) + "px)"
};
ClipRect.prototype.equals = function(a) {
    return !(Math.round(this.top) != Math.round(a.top) || Math.round(this.right) != Math.round(a.right) || Math.round(this.bottom) != Math.round(a.bottom) || Math.round(this.left) != Math.round(a.left))
};
GalleryMediaView.NAME = "GalleryMediaView";
GalleryMediaView.OPEN_REQUEST = GalleryMediaView.NAME + "OpenRequest";
GalleryMediaView.OPEN_COMPLETE = GalleryMediaView.NAME + "OpenComplete";
GalleryMediaView.CLOSE_READY = GalleryMediaView.NAME + "CloseReady";
GalleryMediaView.CLOSE_COMPLETE = GalleryMediaView.NAME + "CloseComplete";
GalleryMediaView.ANIMATION_COMPLETE = GalleryMediaView.NAME + "AnimationComplete";
var GalleryPreloaderView = Class.extend({init: function(a) {
        this.$element = a;
        this.canvas = a[0];
        this.strokeWidth = 2;
        this.outerWidth = 64;
        this.canvasWidth = this.$element.outerWidth();
        this.halfCanvasWidth = this.canvasWidth * .5;
        this.radius = 29;
        this.loaderColour = "#7f7f7f";
        this.canvas.width = this.canvas.height = this.canvasWidth;
        this.stage = new createjs.Stage(this.canvas);
        this.stroke = new createjs.Shape;
        this.stroke.graphics.setStrokeStyle(this.strokeWidth).beginStroke("#fff");
        this.stroke.graphics.drawCircle(this.halfCanvasWidth, this.halfCanvasWidth, this.outerWidth * .5);
        this.stroke.cache(0, 0, this.canvasWidth, this.canvasWidth);
        this.stage.addChild(this.stroke);
        this.pie = new createjs.Shape;
        this.pie.x = this.pie.y = this.halfCanvasWidth;
        this.pie.rotation = -90;
        this.stage.addChild(this.pie);
        this.angle = 0;
        this.isHidden = true;
        this.setLoaded(0)
    },drawPie: function() {
        var a, b, c, d;
        var e = Math.PI / 180;
        this.pie.graphics.clear();
        this.pie.graphics.beginFill(this.loaderColour);
        this.pie.graphics.lineTo(this.radius, 0);
        var f = Math.floor(this.angle / 30);
        var g = this.angle - f * 30;
        var h = .268;
        var i = 0;
        while (i < f) {
            c = this.radius * Math.cos((i + 1) * 30 * e);
            d = this.radius * Math.sin((i + 1) * 30 * e);
            a = c + this.radius * h * Math.cos(((i + 1) * 30 - 90) * e);
            b = d + this.radius * h * Math.sin(((i + 1) * 30 - 90) * e);
            this.pie.graphics.curveTo(a, b, c, d);
            ++i
        }
        if (g > 0) {
            h = Math.tan(g / 2 * e);
            c = this.radius * Math.cos((i * 30 + g) * e);
            d = this.radius * Math.sin((i * 30 + g) * e);
            a = c + this.radius * h * Math.cos((i * 30 + g - 90) * e);
            b = d + this.radius * h * Math.sin((i * 30 + g - 90) * e);
            this.pie.graphics.curveTo(a, b, c, d)
        }
        this.pie.graphics.lineTo(0, 0)
    },show: function() {
        var a = this;
        if (!this.$element.hasClass("hidden"))
            return;
        this.isHidden = false;
        this.$element.removeClass("hidden");
        TweenMax.to(a.$element, .3, {opacity: 1})
    },hide: function(a) {
        if (this.$element.hasClass("hidden")) {
            if ($.isFunction(a)) {
                a()
            }
            return
        }
        this.isHidden = true;
        TweenMax.to(this.$element, .3, {opacity: 0,onComplete: this.onHidden.bind(this, a)})
    },onHidden: function(a) {
        this.$element.addClass("hidden");
        this.setLoaded(0);
        if ($.isFunction(a)) {
            a()
        }
    },setLoaded: function(a) {
        this.angle = a * 360;
        this.drawPie();
        this.stage.update()
    },destroy: function() {
        this.$element = null
    }});
var GalleryVideoView = GalleryMediaView.extend({init: function(a, b) {
        this._super(a, b);
        this.playerReady = false;
        this.$player = $("<div></div>");
        this.$videoContainer = $('<div class="gallery-video-player hidden"></div>');
        this.$videoContainer.append(this.$player);
        $($(".newGallery .content .pageScroller")[1]).prepend(this.$videoContainer);
        this.adjustVideoContainer()
    },onOpenComplete: function() {
        this.$videoContainer.removeClass("hidden");
        $(".item-menu").addClass("video-playback");
        if (!this.player) {
            this.player = new YT.Player(this.$player[0], {width: "100%",height: "100%",videoId: this.imageVO.videoId,playerVars: {autoplay: 1,controls: 0,modestbranding: 1,rel: 0,showinfo: 0,iv_load_policy: 3,html5: 1,wmode: "opaque"},events: {onReady: this.onPlayerReady.bind(this),onStateChange: this.onStateChange.bind(this)}});
            this.seekBar = new VideoSeekBar(this.player, $(".item-menu"))
        } else {
            this.player.seekTo(0);
            this.player.playVideo()
        }
        this.$player.show();
        this.seekBar.init();
        this._super()
    },onPlayerReady: function() {
        this.playerReady = true;
        this.player.playVideo();
        this.adjustVideoContainer()
    },onStateChange: function(a) {
        if (a.data === 0) {
            this.killPlayer()
        }
        if (a.data === 1) {
            this.$videoContainer.show()
        }
    },onBeforeClose: function() {
        if (!this.playerReady)
            return;
        this.$videoContainer.hide();
        this.killPlayer()
    },killPlayer: function() {
        var a = this;
        $(".item-menu").removeClass("video-playback");
        this.player.stopVideo();
        this.$player.hide();
        this.$videoContainer.addClass("hidden");
        this.seekBar.destroy();
        setTimeout(function() {
            a.dispatchEvent(GalleryMediaView.CLOSE_READY)
        }, 0)
    },adjustVideoContainer: function() {
        var a = $(window).width(), b = $(window).height(), c = a / b, d = 5;
        if (c < 1.7) {
            var e = b - d, f = e / 9 * 16, g = (f - a) / 2;
            this.$videoContainer.css({width: f,height: "100%","margin-top": 0,"margin-left": -g})
        } else if (c > 1.7) {
            var h = a, i = h / 16 * 9, g = (i - (b - d)) / 2;
            this.$videoContainer.css({height: i,width: "100%","margin-left": 0,"margin-top": -g})
        } else {
            this.$videoContainer.css({height: "100%",width: "100%","margin-left": 0,"margin-top": 0})
        }
    },onResize: function(a, b, c) {
        this._super(a, b, c);
        this.adjustVideoContainer()
    }});
var GalleryDataModel = baseten.EventDispatcher.extend({init: function() {
        this.loader = new createjs.LoadQueue(true);
        this.manifest = [{id: "Nexus5-Tiled2",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_tilted.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_tilted.jpg"}}, {id: "Nexus5_Front-Low",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_Front-Low.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_Front-Low.jpg"}}, {id: "Nexus5_topedge_Left",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_topedge_Left.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_topedge_Left.jpg"}}, {id: "outer-19",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_Front.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_Front.jpg"}}, {id: "Nexus5_topedge_Right",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_topedge_Right.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_topedge_Right.jpg"}}, {id: "Nexus5_Corner",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_Corner.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_Corner.jpg"}}, {id: "outer-21",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5_Right.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5_Right.jpg"}}, {id: "outer-22",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5-Side_Black.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5-Side_Black.jpg"}}, {id: "outer-23",src: "/nexus/images/interactives/gallery/product-shots-n5/small_thumbs/Nexus5-Side_White.jpg",type: "image",data: {size: GalleryDataModel.SMALL,type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "",largeImage: "/nexus/images/interactives/gallery/product-shots-n5/large/Nexus5-Side_White.jpg"}}, {id: "Nexus5_Black",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5_Black.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5_Black.jpg"}}, {id: "Nexus5_White",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5_White.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5_White.jpg"}}, {id: "Nexus5_Front",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5_Front.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5_Front.jpg"}}, {id: "Nexus5-Tiled",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5_tilted.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5_tilted.jpg"}}, {id: "Nexus5_Left",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5_Left.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5_Left.jpg"}}, {id: "Nexus5_Right",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5_Right.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5_Right.jpg"}}, {id: "Nexus5-Side_Black",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5-Side_Black.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5-Side_Black.jpg"}}, {id: "Nexus5-Side_White",src: "/nexus/images/interactives/gallery/product-shots-n5/large_thumbs/Nexus5-Side_White.jpg",type: "image",data: {size: "large",type: GalleryDataModel.PRODUCT_SHOT,bgColour: "#fff",download: "/nexus/images/interactives/gallery/product-shots-n5/download/Nexus5-Side_White.jpg"}}];
        this.isRetina = false;
        this.setupRetina();
        this.lifestyleThumbIndex = 0;
        this.productThumbIndex = 0;
        this.outerImages = {products: [],lifestyles: []};
        this.images = [];
        this.items = [];
        this.imageLookup = {};
        this._super()
    },setupRetina: function() {
        var a;
        var b;
        if (window.devicePixelRatio && window.devicePixelRatio >= 1.3) {
            this.isRetina = true;
            a = this.manifest.length;
            while (--a > -1) {
                b = this.manifest[a];
                b.src = b.src.replace(/(^.+)(\.(jpg|jpeg|gif|png))$/gi, "$1-2x$2")
            }
        }
    },getNextOuterImage: function(a) {
        var b = null;
        if (a === "product-shots") {
            b = this.outerImages.products[this.productThumbIndex];
            this.productThumbIndex++
        } else {
            if (this.outerImages.lifestyles.length === 0) {
                b = this.outerImages.products[this.productThumbIndex];
                this.productThumbIndex++
            } else {
                b = this.outerImages.lifestyles[this.lifestyleThumbIndex];
                this.lifestyleThumbIndex++
            }
        }
        if (this.productThumbIndex === this.outerImages.products.length) {
            this.productThumbIndex = 0
        }
        if (this.lifestyleThumbIndex === this.outerImages.lifestyles.length) {
            this.lifestyleThumbIndex = 0
        }
        return b
    },getImageById: function(a) {
        var b = this.imageLookup[a];
        return this.images[b]
    },load: function() {
        this.loader.removeAll();
        if (this.loader.finished === true) {
            var a = 0;
            while (a < this.loader.loaded_files.length) {
                this.onFileLoad(this.loader.loaded_files[a]);
                a++
            }
            this.onLoadComplete(null)
        } else if (this.items.length) {
            this.onLoadComplete(null)
        } else {
            this.loader.addEventListener("progress", this.onLoadProgress.bind(this));
            this.loader.addEventListener("fileload", this.onFileLoad.bind(this));
            this.loader.addEventListener("complete", this.onLoadComplete.bind(this));
            this.dispatchEvent(GalleryDataModel.LOAD_START);
            this.loader.loadManifest(this.manifest)
        }
    },onLoadProgress: function(a) {
        this.dispatchEvent(GalleryDataModel.LOAD_PROGRESS, a.progress)
    },onFileLoad: function(a) {
        var b = this.images.length;
        var c;
        var d;
        if (a.item.data.size && a.item.data.size == GalleryDataModel.SMALL) {
            c = new GalleryImageVO(a.result, GalleryDataModel.SMALL, a.item.data.type, a.item.id, a.item.src, a.item.data.download, a.item.data["video-id"], this.isRetina, a.item.data["bgColour"]);
            if (c.type === "lifestyle") {
                this.outerImages.lifestyles.push(c)
            } else {
                this.outerImages.products.push(c)
            }
            this.images.push(c);
            this.imageLookup[a.item.id] = b
        } else {
            d = new GalleryImageVO(a.result, GalleryDataModel.LARGE, a.item.data.type, a.item.id, a.item.src, a.item.data.download, a.item.data["video-id"], this.isRetina, a.item.data["bgColour"]);
            c = new GalleryItemVO;
            if (d.type === "product-shots") {
                var e = this.getNextOuterImage("lifestyle");
                var f = this.getNextOuterImage("lifestyle")
            } else {
                var e = this.getNextOuterImage("product-shots");
                var f = this.getNextOuterImage("product-shots")
            }
            c.push(d);
            c.push(e);
            c.push(f);
            this.items.push(c);
            this.images.push(d);
            this.imageLookup[a.item.id] = b
        }
    },onLoadComplete: function(a) {
        this.loader.removeAll();
        this.loader.removeAllEventListeners();
        this.dispatchEvent(GalleryDataModel.LOAD_COMPLETE)
    },loadLargeImageForId: function(a) {
        var b = this.getImageById(a);
        if (b.largeImage) {
            this.onLoadComplete(null);
            return
        }
        var c = b.src.replace(/\/[A-z]{5}_thumbs\//, "/large/");
        var d = {id: a,src: c,type: "image",data: {type: b.type}};
        this.loader.addEventListener("progress", this.onLoadProgress.bind(this));
        this.loader.addEventListener("fileload", this.onLargeFileLoad.bind(this));
        this.loader.addEventListener("complete", this.onLoadComplete.bind(this));
        this.loader.loadFile(d)
    },onLargeFileLoad: function(a) {
        var b = this.getImageById(a.item.id);
        b.largeImage = a.result
    }});
GalleryDataModel.NAME = "GalleryDataModel";
GalleryDataModel.LOAD_START = GalleryDataModel.NAME + "LoadStart";
GalleryDataModel.LOAD_PROGRESS = GalleryDataModel.NAME + "LoadProgress";
GalleryDataModel.LOAD_COMPLETE = GalleryDataModel.NAME + "LoadComplete";
GalleryDataModel.LARGE = "large";
GalleryDataModel.SMALL = "small";
GalleryDataModel.PRODUCT_SHOT = "product-shots";
GalleryDataModel.CAMPAIGN_VIDEO = "campaign-videos";
GalleryDataModel.ZOETROPE = "zoetropes";
var GalleryItemVO = function() {
    this.images = []
};
GalleryItemVO.prototype.push = function(a) {
    this.images.push(a)
};
var GalleryImageVO = function(a, b, c, d, e, f, g, h, i) {
    this.image = a;
    this.size = b;
    this.largeImage = null;
    this.downloadPath = f;
    this.type = c;
    this.id = d;
    this.src = e;
    this.videoId = g || null;
    this.isRetina = h;
    this.bgColour = i || "#000"
};
var PhotoInteractive;
PhotoInteractive = AbstractInteractiveDirective.extend({$firstPanel: null,$secondPanel: null,$thirdPanel: null,$fourthPanel: null,$bottomNavPanel: null,$panel: null,$close: null,$leftArrow: null,$rightArrow: null,$nav: null,$navEl: null,$lastClickedPanel: null,$copy: null,actualPanelAnimation: 0,panelAnimationTime: .6,panels: [],animationPanels: [],videos: [],menuAnimationTime: .2,finalExtendValue: "35%",startExtendValue: "25%",mouseInteractions: false,currentPanel: null,init: function(a, b, c, d) {
        this._super(a, b, c, d);
        this.defineUiElements();
        this.defineEvents();
        this.configVideos()
    },start: function() {
        this.doIntroAnimation()
    },configVideos: function() {
        this.video1 = new PhotoInteractiveVideo;
        this.video2 = new PhotoInteractiveVideo;
        this.video3 = new PhotoInteractiveVideo;
        this.video4 = new PhotoInteractiveVideo;
        this.videoConfig1 = [["video/webm", "/nexus/images/interactives/photo/AutoAwesome_Desaturation.webm"], ["video/mp4", "/nexus/images/interactives/photo/AutoAwesome_Desaturation.mp4"], ["video/ogg", "/nexus/images/interactives/photo/AutoAwesome_Desaturation.ogg"]];
        this.videoConfig2 = [["video/webm", "/nexus/images/interactives/photo/LowLight_Color_Adjustment.webm"], ["video/mp4", "/nexus/images/interactives/photo/LowLight_Color_Adjustment.mp4"], ["video/ogg", "/nexus/images/interactives/photo/LowLight_Color_Adjustment.ogg"]];
        this.videoConfig3 = [["video/mp4", "/nexus/images/interactives/photo/HDR_Hold.mp4"], ["video/webm", "/nexus/images/interactives/photo/HDR_Hold.webm"], ["video/ogg", "/nexus/images/interactives/photo/HDR_Hold.ogg"]];
        this.videoConfig4 = [["video/webm", "/nexus/images/interactives/photo/Photosphere_Color.webm"], ["video/mp4", "/nexus/images/interactives/photo/Photosphere_Color.mp4"], ["video/ogg", "/nexus/images/interactives/photo/Photosphere_Color.ogg"]];
        this.copyConfig = ["Auto Awesome makes photos come alive", "The perfect light for all your highlights", "Capture the day, the way you remember it", "Up, down and all around fun", "Your moments in ways you’ve never seen."];
        this.video1.setData(this.$firstPanel, this.videoConfig1, "firstVideo");
        this.video2.setData(this.$secondPanel, this.videoConfig2, "secondVideo");
        this.video3.setData($(".interactive-image"), this.videoConfig3, "thirdVideo");
        this.video4.setData(this.$fourthPanel, this.videoConfig4, "fourthVideo");
        $("#thirdVideo").css("margin-top", "80px");
        this.videos = [this.video1, this.video2, this.video3, this.video4]
    },defineEvents: function() {
        this.$panel.on("mouseover", this.mouseOverPanel.bind(this));
        this.$panel.on("mouseout", this.mouseOutPanel.bind(this));
        this.$panel.on("click", this.panelClickHandler.bind(this));
        this.$close.on("click", this.close.bind(this));
        this.$navEl.on("click", this.navButtonHandler.bind(this));
        this.$rightArrow.on("click", this.nextPanelHandler.bind(this));
        this.$leftArrow.on("click", this.prevPanelHandler.bind(this))
    },defineUiElements: function() {
        this.$firstPanel = this.$element.find("#firstPanel");
        this.$secondPanel = this.$element.find("#secondPanel");
        this.$thirdPanel = this.$element.find("#thirdPanel");
        this.$fourthPanel = this.$element.find("#fourthPanel");
        this.$bottomNavPanel = this.$element.find(".bottomNav");
        this.$panel = this.$element.find(".panel");
        this.$close = this.$element.find(".close-interactive");
        this.$rightArrow = this.$element.find(".next");
        this.$leftArrow = this.$element.find(".previous");
        this.$nav = this.$element.find(".nextPrevNav");
        this.$navEl = this.$element.find(".bElement");
        this.$copy = this.$element.find(".copy").find("h2");
        this.panels = [[this.$firstPanel, 0], [this.$secondPanel, "25%"], [this.$fourthPanel, 0], [this.$thirdPanel, 0]];
        this.animationPanels = [this.$firstPanel, this.$secondPanel, $(".interactive-image"), this.$fourthPanel]
    },doIntroAnimation: function() {
        this.introNextPanel()
    },introNextPanel: function() {
        if (this.actualPanelAnimation > this.panels.length - 1)
            return;
        var a = this.panels[this.actualPanelAnimation][0];
        var b = this.panels[this.actualPanelAnimation][1];
        if (this.actualPanelAnimation < 2) {
            TweenLite.to(a, this.panelAnimationTime, {css: {left: b},onComplete: this.introNextPanel.bind(this)})
        } else {
            TweenLite.to(a, this.panelAnimationTime, {css: {right: b},onComplete: this.onAnimationComplete.bind(this)})
        }
        this.actualPanelAnimation++
    },onAnimationComplete: function() {
        this.actualPanelAnimation = 0;
        this.animateBottomNav();
        this.mouseInteractions = true
    },animateBottomNav: function() {
        TweenLite.to(this.$bottomNavPanel, this.menuAnimationTime, {css: {bottom: 0}})
    },mouseOverPanel: function(a) {
        if (!this.mouseInteractions)
            return;
        var b = a.target.id;
        if (b == "firstPanel") {
            this.extendFirst(true)
        } else if (b == "secondPanel") {
            this.extendSecond(true)
        } else if (b == "thirdPanel") {
            this.extendThird(true)
        } else if (b == "fourthPanel") {
            this.extendFourth(true)
        }
        return
    },mouseOutPanel: function(a) {
        if (!this.mouseInteractions)
            return;
        var b = a.target.id;
        if (b == "firstPanel") {
            this.extendFirst(false)
        } else if (b == "secondPanel") {
            this.extendSecond(false)
        } else if (b == "thirdPanel") {
            this.extendThird(false)
        } else if (b == "fourthPanel") {
            this.extendFourth(false)
        }
        return
    },extendFirst: function(a) {
        if (a) {
            TweenLite.to(this.$firstPanel, .3, {css: {width: this.finalExtendValue}});
            this.$firstPanel.addClass("topIndex")
        } else {
            TweenLite.to(this.$firstPanel, .3, {css: {width: this.startExtendValue}})
        }
    },extendSecond: function(a) {
        if (a) {
            TweenLite.to(this.$secondPanel, .3, {css: {width: this.finalExtendValue,left: "20%"}})
        } else {
            TweenLite.to(this.$secondPanel, .3, {css: {width: this.startExtendValue,left: "25%"}})
        }
    },extendThird: function(a) {
        if (a) {
            TweenLite.to(this.$secondPanel, .3, {css: {width: "20%"}});
            TweenLite.to(this.$fourthPanel, .3, {css: {width: "20%"}})
        } else {
            TweenLite.to(this.$secondPanel, .3, {css: {width: this.startExtendValue}});
            TweenLite.to(this.$fourthPanel, .3, {css: {width: this.startExtendValue}})
        }
    },extendFourth: function(a) {
        if (a) {
            TweenLite.to(this.$fourthPanel, .3, {css: {width: this.finalExtendValue}});
            this.$fourthPanel.addClass("topIndex")
        } else {
            TweenLite.to(this.$fourthPanel, .3, {css: {width: this.startExtendValue}});
            this.$fourthPanel.removeClass("topIndex")
        }
    },panelClickHandler: function(a, b) {
        if (!this.mouseInteractions)
            return;
        this.mouseInteractions = false;
        var c = null;
        var d = null;
        var e = "-25%";
        if (b) {
            c = a;
            d = this.$element.find(c.selector)
        } else {
            c = a.target.id;
            d = this.$element.find("#" + c)
        }
        if (c.selector == ".interactive-image" || c == "thirdPanel") {
            TweenLite.to(this.$firstPanel, .6, {css: {left: e}});
            TweenLite.to(this.$secondPanel, .6, {css: {left: e}});
            TweenLite.to(this.$fourthPanel, .6, {css: {right: e},onComplete: this.playVideo.bind(this)})
        } else {
            TweenLite.to(d, .5, {css: {width: "100%",left: 0},onComplete: this.playVideo.bind(this)})
        }
        this.setCurrentPanel(c);
        this.changeCopy(this.currentPanel);
        d.addClass("topIndex");
        this.$nav.show()
    },setCurrentPanel: function(a) {
        if (a == "firstPanel") {
            this.currentPanel = 0
        } else if (a == "secondPanel") {
            this.currentPanel = 1
        } else if (a == "thirdPanel") {
            this.currentPanel = 2
        } else if (a == "fourthPanel") {
            this.currentPanel = 3
        }
    },removeTopIndex: function(a) {
        a.removeClass("topIndex")
    },nextPanelHandler: function() {
        this.pauseVideos();
        var a = this.animationPanels[this.currentPanel];
        if (this.currentPanel < this.panels.length - 1) {
            this.currentPanel++
        } else {
            this.currentPanel = 0
        }
        this.changeCopy(this.currentPanel);
        this.showPanel(this.animationPanels[this.currentPanel], "next", a)
    },prevPanelHandler: function() {
        this.pauseVideos();
        var a = this.animationPanels[this.currentPanel];
        if (this.currentPanel > 0) {
            this.currentPanel--
        } else {
            this.currentPanel = this.panels.length - 1
        }
        this.changeCopy(this.currentPanel);
        this.showPanel(this.animationPanels[this.currentPanel], "prev", a)
    },showPanel: function(a, b, c) {
        this.stopVideo();
        this.$firstPanel.removeClass("topIndex");
        this.$secondPanel.removeClass("topIndex");
        this.$fourthPanel.removeClass("topIndex");
        if (b == "next") {
            a.css({width: "100%",left: "100%"});
            TweenLite.to(a, 1, {css: {width: "100%",left: 0},onComplete: this.playVideo.bind(this)})
        } else if (b == "prev") {
            a.css({width: "100%",left: "-100%"});
            TweenLite.to(a, 1, {css: {left: 0},onComplete: this.playVideo.bind(this)})
        }
        this.$panel.removeClass("topPreviousAnimation");
        $(".interactive-image").removeClass("topPreviousAnimation").removeClass("topIndexAnimation");
        c.addClass("topPreviousAnimation");
        this.$panel.removeClass("topIndexAnimation");
        a.addClass("topIndexAnimation")
    },stopVideo: function() {
    },navButtonHandler: function(a) {
        var b = a.target.id;
        var c = null;
        var d = this.currentPanel;
        if (b == "first") {
            this.currentPanel = 0
        } else if (b == "second") {
            this.currentPanel = 1
        } else if (b == "third") {
            this.currentPanel = 2
        } else if (b == "fourth") {
            this.currentPanel = 3
        }
        c = this.animationPanels[this.currentPanel];
        if (this.$lastClickedPanel == c) {
            return
        }
        this.$lastClickedPanel = c;
        this.changeCopy(this.currentPanel);
        this.showPanelFromMenu(c, d);
        this.pauseVideos()
    },showPanelFromMenu: function(a, b) {
        if (this.mouseInteractions) {
            this.panelClickHandler(a, true)
        } else {
            var c = this.animationPanels[b];
            this.showPanel(a, "next", c)
        }
    },playVideo: function() {
        this.hideVideos();
        if (this.currentPanel >= 0) {
            this.videos[this.currentPanel].play(this.onVideoEnd.bind(this))
        }
    },onVideoEnd: function(a) {
        var b = this;
        a.stopWithFadeOut();
        setTimeout(function() {
            b.close()
        }, 1e3)
    },close: function() {
        if (!this.mouseInteractions) {
            this.closeVideo();
            this.$nav.hide()
        } else {
            this.closePanels();
            this.onCloseComplete();
            this.mouseInteractions = false
        }
    },pauseVideos: function() {
        for (var a = 0; a < this.videos.length; a++) {
            this.videos[a].stop()
        }
    },hideVideos: function() {
        for (var a = 0; a < this.videos.length; a++) {
            this.videos[a].hide()
        }
    },closeVideo: function() {
        if (this.animationPanels[this.currentPanel] == this.$firstPanel) {
            TweenLite.to(this.$firstPanel, 1, {css: {width: "25%",left: "-100%"},onComplete: this.resetPanels.bind(this)});
            this.$secondPanel.css({width: "25%",left: "-50%"});
            this.$fourthPanel.css({width: "25%",left: "auto",right: "-25%"});
            this.video1.stopWithFadeOut()
        }
        if (this.animationPanels[this.currentPanel] == this.$secondPanel) {
            TweenLite.to(this.$secondPanel, 1, {css: {width: "25%",left: "25%"},onComplete: this.resetPanels.bind(this)});
            this.$firstPanel.css({width: "25%",left: "-50%"});
            this.$fourthPanel.css({width: "25%",left: "auto",right: "-25%"});
            this.video2.stopWithFadeOut()
        }
        if (this.animationPanels[this.currentPanel] == this.$fourthPanel) {
            TweenLite.to(this.$fourthPanel, 1, {css: {width: "25%",left: "100%"},onComplete: this.resetPanels.bind(this)});
            this.$firstPanel.css({width: "25%",left: "-50%"});
            this.$secondPanel.css({width: "25%",left: "auto",right: "-25%"});
            this.video4.stopWithFadeOut()
        }
        if (this.animationPanels[this.currentPanel].selector == ".interactive-image") {
            this.$firstPanel.css({width: "25%"});
            this.$secondPanel.css({width: "25%"});
            this.$fourthPanel.css({width: "25%"});
            this.video3.stopWithFadeOut()
        }
        this.resetPanels();
        this.changeCopy(4);
        $(".interactive-image").css({width: "100%",left: "0"})
    },resetPanels: function() {
        this.$firstPanel.removeClass("topIndex").removeClass("topIndexAnimation").removeClass("topPreviousAnimation");
        this.$secondPanel.removeClass("topIndex").removeClass("topIndexAnimation").removeClass("topPreviousAnimation");
        this.$fourthPanel.removeClass("topIndex").removeClass("topIndexAnimation").removeClass("topPreviousAnimation");
        this.$fourthPanel.css({left: "auto",right: "-25%"});
        $(".interactive-image").removeClass("topIndex").removeClass("topIndexAnimation").removeClass("topPreviousAnimation");
        this.doIntroAnimation()
    },changeCopy: function(a) {
        $(".copy").find("h2").text(this.copyConfig[a]);
        this.$element.find(".bElement").removeClass("whiteText");
        if (a == 0) {
            this.$element.find(".bElement#first").addClass("whiteText")
        } else if (a == 1) {
            this.$element.find(".bElement#second").addClass("whiteText")
        } else if (a == 2) {
            this.$element.find(".bElement#third").addClass("whiteText")
        } else if (a == 3) {
            this.$element.find(".bElement#fourth").addClass("whiteText")
        }
    },closePanels: function() {
        TweenMax.to(this.$element, 1, {alpha: 0})
    },onCloseComplete: function() {
        this._super()
    },destroy: function() {
        this._super()
    }});
PhotoInteractiveVideo = baseten.EventDispatcher.extend({init: function() {
        this._super()
    },setData: function(a, b, c) {
        var d = this;
        this.$video = $('<video class="' + c + '" preload="auto"></video>');
        var e = b.length;
        for (var f = 0; f < e; f++) {
            var g = '<source src="' + b[f][1] + '" type="' + b[f][0] + '">';
            this.$video.append(g)
        }
        a.append(this.$video);
        this.$video = this.$video[0];
        $(this.$video).hide();
        this.resizeVideo();
        $(window).resize(function() {
            d.resizeVideo()
        })
    },resizeVideo: function() {
        var a = $(this.$video);
        var b = a.height();
        var c = a.width();
        var d = window.innerHeight;
        var e = window.innerWidth;
        var f = Math.max(e / b, d / c);
        var g = Math.round(b * f);
        var h = Math.round(c * f);
        a.width(g);
        a.height(h);
        var i = Math.round((e - g) / 2);
        var j = Math.round((d - h) / 2);
        a.css({left: i,top: j})
    },play: function(a) {
        var b = this;
        $(this.$video).fadeIn(500);
        this.$video.play();
        $(this.$video).off("ended");
        $(this.$video).on("ended", function() {
            a(b)
        })
    },pause: function() {
        this.$video.pause()
    },stop: function() {
        this.$video.pause();
        this.$video.currentTime = 0
    },hide: function() {
        $(this.$video).fadeOut(500)
    },stopWithFadeOut: function() {
        $(this.$video).fadeOut(1e3);
        this.$video.pause();
        this.$video.currentTime = 0
    },destroy: function() {
    }});
var SharingInteractive = AbstractInteractiveDirective.extend({init: function(a, b, c, d, e) {
        this._super(a, b, c, d, e);
        this.$closeButton.on("click", this.onCloseButtonClicked.bind(this));
        this.$video = this.$element.find("#video1");
        this.$video_container = this.$element.find(".video");
        angular.injector(["nexus"]).invoke(["resizeService", "browserDetectService", function(a, b) {
                this.resizeService = a;
                this.browserDetectService = b
            }], this);
        this.resizeService.addResizeFrameCallback(this.onResize.bind(this));
        this.player = new VideoPlayer(b, "rQ8fbvfMP-Q", this.$video[0]);
        this.player.setCloseCallback(this.close.bind(this));
        this.player.setReadyCallback(this.playerReady.bind(this))
    },start: function() {
        $(window).on("resize.otg", this.onResize.bind(this));
        this.onResize(null);
        $(".item-menu").addClass("video-playback");
        this.showVideoUI();
        this.adjustVideoContainer()
    },close: function() {
        this.$closeButton.off();
        TweenMax.to(this.$element, 1, {alpha: 0});
        this.hideVideoUI();
        this.onCloseComplete()
    },showVideoUI: function() {
        $(".video-bar").removeClass("invisible");
        $(".menu-button").removeClass("invisible")
    },hideVideoUI: function() {
        $(".video-bar").addClass("invisible");
        $(".menu-button").addClass("invisible")
    },onCloseComplete: function() {
        $(window).off("resize.otg");
        this._super()
    },onCloseButtonClicked: function(a) {
        a.preventDefault();
        this.close()
    },showCloseButton: function() {
    },hideCloseButton: function() {
        baseten.CSSTransition.to(this.$closeButton, .5, {css: {opacity: 0},ease: "linear",onComplete: this.onCloseButtonHidden.bind(this)})
    },onCloseButtonHidden: function() {
        this.$closeButton.addClass("invisible")
    },hideUI: function(a, b, c) {
    },showUI: function(a, b) {
    },onResize: function(a) {
    },playerReady: function() {
        this.$video.css("visibility", "visible");
        this.player.player.setPlaybackQuality("hd720")
    },destroy: function() {
        $(".item-menu").removeClass("video-playback");
        $(window).off("resize.otg");
        this.player.destroy();
        $("#sharing-explore-button").removeClass("explore").addClass("watch-button-text-template").css("margin-left", "-20px").html("watch again");
        this._super()
    },onResize: function() {
        this.adjustVideoContainer()
    },adjustVideoContainer: function() {
        var a = $(window).width(), b = $(window).height(), c = a / b, d = 5;
        if (c < 1.7) {
            var e = b - d, f = e / 9 * 16, g = (f - a) / 2;
            this.$video_container.css({width: f,height: "100%","margin-top": 0,"margin-left": -g})
        } else if (c > 1.7) {
            var h = a, i = h / 16 * 9, g = (i - (b - d)) / 2;
            this.$video_container.css({height: i,width: "100%","margin-left": 0,"margin-top": -g})
        } else {
            this.$video_container.css({height: "100%",width: "100%","margin-left": 0,"margin-top": 0})
        }
    }});
var TechInteractive = AbstractInteractiveDirective.extend({$overlayPhone: null,$overlayCopy: null,$close: null,init: function(a, b, c, d, e) {
        this._super(a, b, c, d, e);
        this.defineUiElements()
    },defineUiElements: function() {
        this.$overlayPhone = this.$element.find(".overlay_phone");
        this.$overlayCopy = this.$element.find(".overlay_copy");
        this.$close = this.$element.find(".closeButton");
        this.$close.on("click", this.close.bind(this))
    },start: function() {
        var a = this;
        $(this.$overlayPhone.selector).fadeIn(1500);
        setTimeout(function() {
            $(a.$overlayCopy.selector).fadeIn(2e3)
        }, 1e3)
    },moveBackground: function() {
        this.$background = this.$element.find(".interactive-image");
        this.$background = $(this.$background.selector);
        TweenLite.to(this.$background, .5, {css: {top: -70}})
    },close: function() {
        TweenMax.to(this.$element, 1, {alpha: 0});
        this.onCloseComplete()
    },onCloseComplete: function() {
        var a = this;
        $(this.$overlayPhone.selector).fadeOut(1e3);
        setTimeout(function() {
            $(a.$overlayCopy.selector).fadeOut(1e3)
        }, 500);
        this._super()
    },destroy: function() {
        this._super()
    }});
"use strict";
angular.module("nexus").service("browserDetectService", [function() {
        var a = {BROWSER_UNKNOWN: "BROWSER_UNKNOWN",BROWSER_CHROME: "Chrome",BROWSER_OMNI_WEB: "OmniWeb",BROWSER_SAFARI: "Safari",BROWSER_OPERA: "Opera",BROWSER_ICAB: "iCab",BROWSER_KONQUEROR: "Konqueror",BROWSER_FIREFOX: "Firefox",BROWSER_CAMINO: "Camino",BROWSER_NETSCAPE: "Netscape",BROWSER_EXPLORER: "Explorer",BROWSER_MOZILLA: "Mozilla",OS_UNKNOWN: "OS_UNKNOWN",OS_WINDOWS_PHONE: "Windows Phone",OS_WINDOWS: "Windows",OS_MAC: "Mac",OS_IPHONE_IPOD: "iPhone/iPod",OS_IPAD: "iPad",OS_ANDROID: "Android",OS_LINUX: "Linux",VERSION_UNKNOWN: -1,getBrowser: function() {
                return b.browser
            },getVersion: function() {
                return b.version
            },getOS: function() {
                return b.OS
            },isMobileOS: function() {
                switch (a.getOS()) {
                    case a.OS_ANDROID:
                    case a.OS_IPAD:
                    case a.OS_IPHONE_IPOD:
                    case a.OS_WINDOWS_PHONE:
                        return true;
                        break;
                    default:
                        return false
                }
            }};
        var b = {init: function() {
                this.browser = this.searchString(this.dataBrowser) || a.BROWSER_UNKNOWN;
                this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || a.VERSION_UNKNOWN;
                this.OS = this.searchString(this.dataOS) || a.OS_UNKNOWN
            },searchString: function(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b].string;
                    var d = a[b].prop;
                    this.versionSearchString = a[b].versionSearch || a[b].identity;
                    if (c) {
                        if (c.indexOf(a[b].subString) != -1)
                            return a[b].identity
                    } else if (d)
                        return a[b].identity
                }
            },searchVersion: function(a) {
                var b = a.indexOf(this.versionSearchString);
                if (b == -1)
                    return;
                return parseFloat(a.substring(b + this.versionSearchString.length + 1))
            },dataBrowser: [{string: navigator.userAgent,subString: "Chrome",identity: a.BROWSER_CHROME}, {string: navigator.userAgent,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: a.BROWSER_OMNI_WEB}, {string: navigator.vendor,subString: "Apple",identity: a.BROWSER_SAFARI,versionSearch: "Version"}, {prop: window.opera,identity: a.BROWSER_OPERA,versionSearch: "Version"}, {string: navigator.vendor,subString: "iCab",identity: a.BROWSER_ICAB}, {string: navigator.vendor,subString: "KDE",identity: a.BROWSER_KONQUEROR}, {string: navigator.userAgent,subString: "Firefox",identity: a.BROWSER_FIREFOX}, {string: navigator.vendor,subString: "Camino",identity: a.BROWSER_CAMINO}, {string: navigator.userAgent,subString: "Netscape",identity: a.BROWSER_NETSCAPE}, {string: navigator.userAgent,subString: "MSIE",identity: a.BROWSER_EXPLORER,versionSearch: "MSIE"}, {string: navigator.userAgent,subString: "Gecko",identity: a.BROWSER_MOZILLA,versionSearch: "rv"}, {string: navigator.userAgent,subString: "Mozilla",identity: a.BROWSER_NETSCAPE,versionSearch: "Mozilla"}],dataOS: [{string: navigator.userAgent,subString: "Windows Phone",identity: a.OS_WINDOWS_PHONE}, {string: navigator.platform,subString: "Win",identity: a.OS_WINDOWS}, {string: navigator.platform,subString: "Mac",identity: a.OS_MAC}, {string: navigator.userAgent,subString: "iPhone",identity: a.OS_IPHONE_IPOD}, {string: navigator.userAgent,subString: "iPad",identity: a.OS_IPAD}, {string: navigator.userAgent,subString: "Android",identity: a.OS_ANDROID}, {string: navigator.platform,subString: "Linux",identity: a.OS_LINUX}]};
        b.init();
        return a
    }]);
"use strict";
angular.module("nexus").service("deviceWidth", ["$window", function(a) {
        var b;
        angular.element(a).on("resize", function(a) {
            c()
        });
        this.get = function() {
            if (!b)
                c();
            return b
        };
        function c() {
            b = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0
        }
    }]);
"use strict";
angular.module("nexus").service("momentService", ["$rootScope", function(a) {
        var b, c = false;
        var d = {INTERACTIVE_START: "momentService.INTERACTIVE_START",INTERACTIVE_END: "momentService.INTERACTIVE_END",FORCE_PARALLAX_UPDATE: "momentService.FORCE_PARALLAX_UPDATE",interactiveStart: function(b) {
                a.$emit(d.INTERACTIVE_START, b)
            },interactiveEnd: function(b) {
                a.$emit(d.INTERACTIVE_END, b)
            },forceParallaxUpdate: function(b) {
                a.$emit(d.FORCE_PARALLAX_UPDATE)
            },getInFlowStacks: function() {
                return b
            },setInFlowStacks: function(a) {
                b = a;
                return a
            },isParallaxActive: function(a) {
                if (typeof a !== undefined)
                    c = a;
                return c
            }};
        return d
    }]);
"use strict";
angular.module("nexus").service("resizeService", [function() {
        var a = $(window), b = [], c = false, d = false, e = false, f = false;
        function g() {
            if (b.length > 0 && !c) {
                a.on("resize.resizeService", h);
                c = true
            } else if (b.length == 0 && c) {
                a.off("resize.resizeService");
                c = false
            }
        }
        function h(a) {
            if (d)
                return;
            d = true;
            window.requestAnimationFrame(function(c) {
                d = false;
                var e = b.length;
                for (var f = 0; f < e; f++)
                    b[f](a)
            })
        }
        var i = {BREAKPOINT_MOBILE: "mobile",BREAKPOINT_LARGE_MOBILE: "large-mobile",BREAKPOINT_SMALL_DESKTOP: "small-desktop",BREAKPOINT_SMALL_DESKTOP_HEADER: "small-desktop-header",BREAKPOINT_MID_DESKTOP: "mid-desktop",addResizeFrameCallback: function(a) {
                if (!i.hasResizeFrameCallback(a)) {
                    b.push(a)
                }
                g()
            },hasResizeFrameCallback: function(a) {
                return b.indexOf(a) > -1
            },removeResizeFrameCallback: function(a) {
                var c = b.length;
                for (var d = 0; d < c; d++)
                    if (b[d] == a)
                        b.splice(d, 1);
                g()
            },currentBreakpoint: function(a) {
                if (typeof a == "undefined")
                    return e;
                e = a;
                switch (a) {
                    case i.BREAKPOINT_MOBILE:
                    case i.BREAKPOINT_LARGE_MOBILE:
                        f = true;
                        break;
                    default:
                        f = false;
                        break
                }
            },isSmallGridLayout: function() {
                return f
            },windowWidth: function() {
                return a.width()
            },windowHeight: function() {
                return a.height()
            }};
        return i
    }]);
"use strict";
angular.module("nexus").service("scrollService", ["$rootScope", "$timeout", "browserDetectService", function(a, b, c) {
        var d = $(window), e = $("#wrapper"), f = $("html, body"), g = d, h = [], i = false, j = false, k = $("html"), l = $("header").outerHeight(), m = 750, n = false, o = e.data("myScroll");
        if (n) {
            $("body, #wrapper").css({height: "100%",maxHeight: "100%",overflow: "hidden"});
            if (!o) {
                o = new iScroll(e[0], {y: 0,bounce: true,momentum: false,onScrollMove: function() {
                        q()
                    },onScrollEnd: function() {
                        q()
                    }});
                $("#wrapper").data("myScroll", o);
                d.scrollTop(0);
                o.refresh()
            }
        }
        function p() {
            if (h.length > 0 && !i) {
                d.on("scroll.scrollService", q);
                i = true
            } else if (h.length == 0 && i) {
                d.off("scroll.scrollService");
                i = false
            }
        }
        function q(a) {
            if (j)
                return;
            j = true;
            window.requestAnimationFrame(function(b) {
                j = false;
                var c = h.length;
                for (var d = 0; d < c; d++)
                    h[d](a)
            })
        }
        function r(a) {
            return a.find(".n4-product-row, .n7-product-row, .n10-product-row")
        }
        var s = {useIScroll: n,isScrollEnabled: true,SCROLLING_TOGGLE_REQUEST: "ScrollEventScrollingToggleRequest",SCROLLING_TOGGLED: "ScrollEventScrollingToggled",positionCache: [],positionCacheLookup: {},hasVerticalScroll: function() {
                return document.documentElement.clientWidth < window.innerWidth
            },enableScrolling: function(c) {
                if (this.isScrollEnabled)
                    return;
                c = typeof c == "undefined" ? true : c;
                this.isScrollEnabled = true;
                k.removeClass("scrolling-disabled");
                var e = this;
                b(function() {
                    a.$broadcast(e.SCROLLING_TOGGLED, e.isScrollEnabled);
                    if (c) {
                        d.trigger("resize")
                    }
                })
            },disableScrolling: function(c) {
                if (!this.isScrollEnabled)
                    return;
                c = typeof c == "undefined" ? true : c;
                this.isScrollEnabled = false;
                k.addClass("scrolling-disabled");
                var e = this;
                b(function() {
                    a.$broadcast(e.SCROLLING_TOGGLED, e.isScrollEnabled);
                    if (c) {
                        d.trigger("resize")
                    }
                })
            },scrollTop: function(a) {
                if (typeof a !== "undefined") {
                    if (n) {
                        o.scrollTo(0, -a)
                    } else {
                        f.scrollTop(a)
                    }
                    return this
                } else
                    return n ? -o.y : g.scrollTop()
            },addScrollFrameCallback: function(a) {
                if (!s.hasScrollFrameCallback(a)) {
                    h.push(a)
                }
                p()
            },hasScrollFrameCallback: function(a) {
                return h.indexOf(a) > -1
            },removeScrollFrameCallback: function(a) {
                var b = h.length;
                for (var c = 0; c < b; c++)
                    if (h[c] == a)
                        h.splice(c, 1);
                p()
            },scrollToElement: function(a, b, c, d) {
                var e;
                if (a.length === 0)
                    return;
                e = a.attr("data-menu-name");
                if (e) {
                    this.scrollToSectionByName(e, b, c, d);
                    return
                }
                var f, g = r(a);
                f = g.length !== 0 ? g.offset().top : a.offset().top;
                f -= l;
                s.scrollToPosition(Math.round(f), b)
            },scrollToSectionByName: function(a, b, c, d) {
                var e, f;
                if (this.positionCacheLookup.hasOwnProperty(a)) {
                    e = this.positionCacheLookup[a];
                    f = this.positionCache[e];
                    this.scrollToPosition(f.position, b, c, d)
                }
            },scrollToPosition: function(a, b, c, d, e) {
                if (this.useIScroll) {
                    o.scrollTo(0, -a, b || m);
                    setTimeout(function() {
                        if (c)
                            c()
                    }, 10 + (b || m));
                    return
                }
                TweenMax.to(f, (b || m) / 1e3, {scrollTop: a,delay: typeof e == "number" ? e : 0,ease: Expo.easeInOut,onComplete: function() {
                        f.unbind("DOMMouseScroll mousewheel");
                        if (c)
                            c()
                    }})
            },refresh: function() {
                if (n) {
                    setTimeout(function() {
                        o.refresh()
                    }, 0)
                }
            }};
        return s
    }]);
"use strict";
angular.module("nexus").service("uiService", ["scrollService", function(a) {
        var b = Modernizr ? {csstransforms3d: Modernizr.csstransforms3d,csstransforms: Modernizr.csstransforms} : {csstransforms3d: false,csstransforms: false};
        var c = {OUTPUT_FORMAT_GSAP: "uiService.OUTPUT_FORMAT_GSAP",OUTPUT_FORMAT_MARGIN: "uiService.OUTPUT_FORMAT_MARGIN",OUTPUT_FORMAT_POSITIONED: "uiService.OUTPUT_FORMAT_POSITIONED",OUTPUT_FORMAT_GENERIC: "uiService.OUTPUT_FORMAT_GENERIC",SIZE_COVER: "uiService.SIZE_COVER",SIZE_CONTAIN: "uiService.SIZE_CONTAIN",TRANSFORM_SCALE_X: 0,TRANSFORM_SKEW_X: 1,TRANSFORM_SKEW_Y: 2,TRANSFORM_SCALE_Y: 3,TRANSFORM_X: 4,TRANSFORM_Y: 5,getSupportedFeatures: function() {
                return b
            },getYObj: function(a) {
                if (b.csstransforms3d)
                    return {transform: "translate3d(0," + a + "px,0)"};
                else if (b.csstransforms)
                    return {transform: "translateY(" + a + "px)"};
                else
                    return {top: a}
            },getXObj: function(a) {
                if (b.csstransforms3d)
                    return {transform: "translate3d(" + a + "px,0,0)"};
                else if (b.csstransforms)
                    return {transform: "translateX(" + a + "px)"};
                else
                    return {left: a}
            },getXYObj: function(a, c) {
                if (b.csstransforms3d)
                    return {transform: "translate3d(" + a + "px," + c + "px,0)"};
                else if (b.csstransforms)
                    return {transform: "translateX(" + a + "px) translateY(" + c + "px)"};
                else
                    return {left: a,top: c}
            },getXYScaleObj: function(a, c, d) {
                if (b.csstransforms3d)
                    return {transform: "translate3d(" + a + "px," + c + "px,0) scale(" + d + ")"};
                else if (b.csstransforms)
                    return {transform: "translateX(" + a + "px) translateY(" + c + "px) scale(" + d + ")"};
                else
                    return false
            },getElementTransformValue: function(a, c) {
                if (b.csstransforms3d || b.csstransforms) {
                    var d = this.getElementTransformMatrix(a);
                    if (d && $.isArray(d))
                        return {x: d[this.TRANSFORM_X],y: d[this.TRANSFORM_Y],scaleX: d[this.TRANSFORM_SCALE_X],scaleY: d[this.TRANSFORM_SCALE_Y],skewX: d[this.TRANSFORM_SKEW_X],skewY: d[this.TRANSFORM_SKEW_Y]};
                    else
                        return d
                } else {
                    var e = a.offset();
                    return {x: e.left,y: e.top}
                }
            },getElementTransformMatrix: function(a) {
                var b = a.css(Modernizr.prefixed("transform"));
                if (!b || b == "none")
                    return null;
                return b.match(/-?[0-9\.]+/g)
            },getElementResizeProps: function(a, b, c, d, e, f) {
                var g = a / b, h = c / d, i = {height: null,width: null};
                var j = e == this.SIZE_CONTAIN ? h < g : h > g;
                if (j) {
                    i.width = c;
                    i.height = Math.ceil(b / a * c)
                } else {
                    i.width = Math.ceil(a / b * d);
                    i.height = d
                }
                var k = Math.ceil((c - i.width) * .5), l = Math.ceil((d - i.height) * .5);
                switch (f) {
                    case this.OUTPUT_FORMAT_GSAP:
                        $.extend(i, this.getXYObj(k, l));
                        break;
                    case this.OUTPUT_FORMAT_MARGIN:
                        i.marginLeft = k;
                        i.marginTop = l;
                        break;
                    case this.OUTPUT_FORMAT_POSITIONED:
                        i.left = k;
                        i.top = l;
                        break;
                    case this.OUTPUT_FORMAT_GENERIC:
                        i.x = k;
                        i.y = l;
                        break
                }
                return i
            },setBatchCSS: function(c, d, e) {
                if (!e)
                    e = b;
                var f = [];
                var g = d.x || d.left || 0, h = d.y || d.top || 0;
                if (e.csstransforms3d) {
                    f.push("-webkit-transform:  translate3d(" + g + "px, " + h + "px, 0)", "-moz-transform:     translate3d(" + g + "px, " + h + "px, 0)", "-o-transform:       translate3d(" + g + "px, " + h + "px, 0)", "-ms-transform:    translate3d(" + g + "px, " + h + "px, 0)")
                } else if (e.csstransforms) {
                    f.push("-webkit-transform:  translateX(" + g + "px) translateY(" + h + "px)", "-moz-transform:    translateX(" + g + "px) translateY(" + h + "px)", "-o-transform:      translateX(" + g + "px) translateY(" + h + "px)", "-ms-transform:     translateX(" + g + "px) translateY(" + h + "px)")
                } else {
                    f.push("position:   absolute", "left:     " + g + "px", "top:     " + h + "px")
                }
                if (d.width)
                    f.push("width: " + d.width + "px");
                if (d.height)
                    f.push("height: " + d.height + "px");
                if (d.display)
                    f.push("display: " + d.display);
                if (d.visibility)
                    f.push("visibility: " + d.visibility);
                c.style.cssText = f.join(";");
                a.refresh()
            },fitText: function(a, b) {
                var c = $("<span></span>");
                if (a.length > 0) {
                    a.css("font-size", "");
                    c.append(a.contents());
                    a.append(c);
                    while (b < c.width()) {
                        var d = {fontSize: parseInt(c.css("font-size")) - 1 + "px"};
                        c.css(d)
                    }
                    a.append(c.contents());
                    c.remove();
                    c = null;
                    if (d) {
                        a.css(d);
                        return true
                    }
                    return false
                }
            }};
        return c
    }]);
function shuffleArray(a) {
    for (var b = a.length - 1; b > 0; b--) {
        var c = Math.floor(Math.random() * (b + 1));
        var d = a[b];
        a[b] = a[c];
        a[c] = d
    }
    return a
}
