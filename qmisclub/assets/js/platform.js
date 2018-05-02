var gapi = window.gapi = window.gapi || {};
gapi._bs = new Date().getTime();
(function() {
    var aa = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        ba = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        ca = function(a, b, c) {
            ca = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
            return ca.apply(null, arguments)
        };
    /*
     gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
    var n = window,
        p = document,
        q = n.location,
        da = function() {},
        ea = /\[native code\]/,
        u = function(a, b, c) {
            return a[b] = a[b] || c
        },
        fa = function(a) {
            for (var b = 0; b < this.length; b++)
                if (this[b] === a) return b;
            return -1
        },
        ga = function(a) {
            a = a.sort();
            for (var b = [], c = void 0, d = 0; d < a.length; d++) {
                var e = a[d];
                e != c && b.push(e);
                c = e
            }
            return b
        },
        ha = /&/g,
        ia = /</g,
        ja = />/g,
        ka = /"/g,
        la = /'/g,
        ma = function(a) {
            return String(a).replace(ha, "&amp;").replace(ia, "&lt;").replace(ja, "&gt;").replace(ka, "&quot;").replace(la, "&#39;")
        },
        v = function() {
            var a;
            if ((a = Object.create) &&
                ea.test(a)) a = a(null);
            else {
                a = {};
                for (var b in a) a[b] = void 0
            }
            return a
        },
        x = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        z = function(a) {
            if (ea.test(Object.keys)) return Object.keys(a);
            var b = [],
                c;
            for (c in a) x(a, c) && b.push(c);
            return b
        },
        A = function(a, b) {
            a = a || {};
            for (var c in a) x(a, c) && (b[c] = a[c])
        },
        na = function(a) {
            return function() {
                n.setTimeout(a, 0)
            }
        },
        B = function(a, b) {
            if (!a) throw Error(b || "");
        },
        C = u(n, "gapi", {});
    var D = function(a, b, c) {
            var d = new RegExp("([#].*&|[#])" + b + "=([^&#]*)", "g");
            b = new RegExp("([?#].*&|[?#])" + b + "=([^&#]*)", "g");
            if (a = a && (d.exec(a) || b.exec(a))) try {
                c = decodeURIComponent(a[2])
            } catch (e) {}
            return c
        },
        oa = new RegExp(/^/.source + /([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source + /(\/\/[^\/?#]*)?/.source + /([^?#]*)?/.source + /(\?([^#]*))?/.source + /(#((#|[^#])*))?/.source + /$/.source),
        pa = /[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,
        ra = new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source + /%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
            "g"),
        sa = /%([a-f]|[0-9a-fA-F][a-f])/g,
        ta = /^(https?|ftp|file|chrome-extension):$/i,
        E = function(a) {
            a = String(a);
            a = a.replace(pa, function(a) {
                try {
                    return encodeURIComponent(a)
                } catch (f) {
                    return encodeURIComponent(a.replace(/^[^%]+$/g, "\ufffd"))
                }
            }).replace(ra, function(a) {
                return a.replace(/%/g, "%25")
            }).replace(sa, function(a) {
                return a.toUpperCase()
            });
            a = a.match(oa) || [];
            var b = v(),
                c = function(a) {
                    return a.replace(/\\/g, "%5C").replace(/\^/g, "%5E").replace(/`/g, "%60").replace(/\{/g, "%7B").replace(/\|/g, "%7C").replace(/\}/g,
                        "%7D")
                },
                d = !!(a[1] || "").match(ta);
            b.v = c((a[1] || "") + (a[2] || "") + (a[3] || (a[2] && d ? "/" : "")));
            d = function(a) {
                return c(a.replace(/\?/g, "%3F").replace(/\#/g, "%23"))
            };
            b.query = a[5] ? [d(a[5])] : [];
            b.c = a[7] ? [d(a[7])] : [];
            return b
        },
        ua = function(a) {
            return a.v + (0 < a.query.length ? "?" + a.query.join("&") : "") + (0 < a.c.length ? "#" + a.c.join("&") : "")
        },
        va = function(a, b) {
            var c = [];
            if (a)
                for (var d in a)
                    if (x(a, d) && null != a[d]) {
                        var e = b ? b(a[d]) : a[d];
                        c.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
                    }
            return c
        },
        wa = function(a, b, c, d) {
            a = E(a);
            a.query.push.apply(a.query, va(b, d));
            a.c.push.apply(a.c, va(c, d));
            return ua(a)
        },
        xa = new RegExp(/\/?\??#?/.source + "(" + /[\/?#]/i.source + "|" + /[\uD800-\uDBFF]/i.source + "|" + /%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source + "|" + /%[0-9a-f]?/i.source + ")$", "i"),
        ya = function(a, b) {
            var c = E(b);
            b = c.v;
            c.query.length && (b += "?" + c.query.join(""));
            c.c.length && (b += "#" + c.c.join(""));
            var d = "";
            2E3 < b.length && (c = b, b = b.substr(0, 2E3), b = b.replace(xa, ""), d = c.substr(b.length));
            var e = a.createElement("div");
            a = a.createElement("a");
            c = E(b);
            b = c.v;
            c.query.length && (b += "?" + c.query.join(""));
            c.c.length && (b += "#" + c.c.join(""));
            a.href = b;
            e.appendChild(a);
            e.innerHTML = e.innerHTML;
            b = String(e.firstChild.href);
            e.parentNode && e.parentNode.removeChild(e);
            c = E(b + d);
            b = c.v;
            c.query.length && (b += "?" + c.query.join(""));
            c.c.length && (b += "#" + c.c.join(""));
            return b
        },
        za = /^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;
    var H = function(a, b, c, d) {
            if (n[c + "EventListener"]) n[c + "EventListener"](a, b, !1);
            else if (n[d + "tachEvent"]) n[d + "tachEvent"]("on" + a, b)
        },
        Aa = function() {
            var a = p.readyState;
            return "complete" === a || "interactive" === a && -1 == navigator.userAgent.indexOf("MSIE")
        },
        Da = function(a) {
            var b = Ba;
            if (!Aa()) try {
                b()
            } catch (c) {}
            Ca(a)
        },
        Ca = function(a) {
            if (Aa()) a();
            else {
                var b = !1,
                    c = function() {
                        if (!b) return b = !0, a.apply(this, arguments)
                    };
                n.addEventListener ? (n.addEventListener("load", c, !1), n.addEventListener("DOMContentLoaded", c, !1)) : n.attachEvent &&
                    (n.attachEvent("onreadystatechange", function() {
                        Aa() && c.apply(this, arguments)
                    }), n.attachEvent("onload", c))
            }
        },
        Ea = function(a) {
            for (; a.firstChild;) a.removeChild(a.firstChild)
        },
        Fa = {
            button: !0,
            div: !0,
            span: !0
        };
    var I;
    I = u(n, "___jsl", v());
    u(I, "I", 0);
    u(I, "hel", 10);
    var J = function(a) {
            return I.dpo ? I.h : D(a, "jsh", I.h)
        },
        Ga = function(a) {
            var b = u(I, "sws", []);
            b.push.apply(b, a)
        },
        Ha = function(a) {
            return u(I, "watt", v())[a]
        },
        Ia = function(a) {
            var b = u(I, "PQ", []);
            I.PQ = [];
            var c = b.length;
            if (0 === c) a();
            else
                for (var d = 0, e = function() {
                        ++d === c && a()
                    }, f = 0; f < c; f++) b[f](e)
        },
        Ja = function(a) {
            return u(u(I, "H", v()), a, v())
        };
    var K = u(I, "perf", v()),
        Ka = u(K, "g", v()),
        La = u(K, "i", v());
    u(K, "r", []);
    v();
    v();
    var Ma = function(a, b, c) {
            var d = K.r;
            "function" === typeof d ? d(a, b, c) : d.push([a, b, c])
        },
        L = function(a, b, c) {
            Ka[a] = !b && Ka[a] || c || (new Date).getTime();
            Ma(a)
        },
        Oa = function(a, b, c) {
            b && 0 < b.length && (b = Na(b), c && 0 < c.length && (b += "___" + Na(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = u(La, "_p", v()), u(b, c, v())[a] = (new Date).getTime(), Ma(a, "_p", c))
        },
        Na = function(a) {
            return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/\,/g, "_")
        };
    var Pa = v(),
        M = [],
        N = function(a) {
            throw Error("Bad hint" + (a ? ": " + a : ""));
        };
    M.push(["jsl", function(a) {
        for (var b in a)
            if (x(a, b)) {
                var c = a[b];
                "object" == typeof c ? I[b] = u(I, b, []).concat(c) : u(I, b, c)
            }
        if (b = a.u) a = u(I, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1])
    }]);
    var Qa = /^(\/[a-zA-Z0-9_\-]+)+$/,
        Ra = [/\/amp\//, /\/amp$/, /^\/amp$/],
        Sa = /^[a-zA-Z0-9\-_\.,!]+$/,
        Ta = /^gapi\.loaded_[0-9]+$/,
        Ua = /^[a-zA-Z0-9,._-]+$/,
        Ya = function(a, b, c, d) {
            var e = a.split(";"),
                f = e.shift(),
                g = Pa[f],
                k = null;
            g ? k = g(e, b, c, d) : N("no hint processor for: " + f);
            k || N("failed to generate load url");
            b = k;
            c = b.match(Va);
            (d = b.match(Wa)) && 1 === d.length && Xa.test(b) && c && 1 === c.length || N("failed sanity: " + a);
            return k
        },
        ab = function(a, b, c, d) {
            a = Za(a);
            Ta.test(c) || N("invalid_callback");
            b = $a(b);
            d = d && d.length ? $a(d) : null;
            var e =
                function(a) {
                    return encodeURIComponent(a).replace(/%2C/g, ",")
                };
            return [encodeURIComponent(a.Z).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.J ? "/am=" + e(a.J) : "", a.S ? "/rs=" + e(a.S) : "", a.U ? "/t=" + e(a.U) : "", "/cb=", e(c)].join("")
        },
        Za = function(a) {
            "/" !== a.charAt(0) && N("relative path");
            for (var b = a.substring(1).split("/"), c = []; b.length;) {
                a = b.shift();
                if (!a.length || 0 == a.indexOf(".")) N("empty/relative directory");
                else if (0 < a.indexOf("=")) {
                    b.unshift(a);
                    break
                }
                c.push(a)
            }
            a = {};
            for (var d = 0, e = b.length; d < e; ++d) {
                var f = b[d].split("="),
                    g = decodeURIComponent(f[0]),
                    k = decodeURIComponent(f[1]);
                2 == f.length && g && k && (a[g] = a[g] || k)
            }
            b = "/" + c.join("/");
            Qa.test(b) || N("invalid_prefix");
            c = 0;
            for (d = Ra.length; c < d; ++c) Ra[c].test(b) && N("invalid_prefix");
            c = bb(a, "k", !0);
            d = bb(a, "am");
            e = bb(a, "rs");
            a = bb(a, "t");
            return {
                Z: b,
                version: c,
                J: d,
                S: e,
                U: a
            }
        },
        $a = function(a) {
            for (var b = [], c = 0, d = a.length; c < d; ++c) {
                var e = a[c].replace(/\./g, "_").replace(/-/g, "_");
                Ua.test(e) && b.push(e)
            }
            return b.join(",")
        },
        bb = function(a, b, c) {
            a = a[b];
            !a && c && N("missing: " + b);
            if (a) {
                if (Sa.test(a)) return a;
                N("invalid: " + b)
            }
            return null
        },
        Xa = /^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
        Wa = /\/cb=/g,
        Va = /\/\//g,
        cb = function() {
            var a = J(q.href);
            if (!a) throw Error("Bad hint");
            return a
        };
    Pa.m = function(a, b, c, d) {
        (a = a[0]) || N("missing_hint");
        return "https://apis.google.com" + ab(a, b, c, d)
    };
    var O = decodeURI("%73cript"),
        db = /^[-+_0-9\/A-Za-z]+={0,2}$/,
        eb = function(a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var e = a[d];
                e && 0 > fa.call(b, e) && c.push(e)
            }
            return c
        },
        fb = function() {
            var a = I.nonce;
            if (void 0 !== a) return a && a === String(a) && a.match(db) ? a : I.nonce = null;
            var b = u(I, "us", []);
            if (!b || !b.length) return I.nonce = null;
            for (var c = p.getElementsByTagName(O), d = 0, e = c.length; d < e; ++d) {
                var f = c[d];
                if (f.src && (a = String(f.getAttribute("nonce") || "") || null)) {
                    for (var g = 0, k = b.length; g < k && b[g] !== f.src; ++g);
                    if (g !== k && a && a === String(a) &&
                        a.match(db)) return I.nonce = a
                }
            }
            return null
        },
        hb = function(a) {
            if ("loading" != p.readyState) gb(a);
            else {
                var b = fb(),
                    c = "";
                null !== b && (c = ' nonce="' + b + '"');
                p.write("<" + O + ' src="' + encodeURI(a) + '"' + c + "></" + O + ">")
            }
        },
        gb = function(a) {
            var b = p.createElement(O);
            b.setAttribute("src", a);
            a = fb();
            null !== a && b.setAttribute("nonce", a);
            b.async = "true";
            (a = p.getElementsByTagName(O)[0]) ? a.parentNode.insertBefore(b, a): (p.head || p.body || p.documentElement).appendChild(b)
        },
        ib = function(a, b) {
            var c = b && b._c;
            if (c)
                for (var d = 0; d < M.length; d++) {
                    var e =
                        M[d][0],
                        f = M[d][1];
                    f && x(c, e) && f(c[e], a, b)
                }
        },
        kb = function(a, b, c) {
            jb(function() {
                var c;
                c = b === J(q.href) ? u(C, "_", v()) : v();
                c = u(Ja(b), "_", c);
                a(c)
            }, c)
        },
        P = function(a, b) {
            var c = b || {};
            "function" == typeof b && (c = {}, c.callback = b);
            ib(a, c);
            b = a ? a.split(":") : [];
            var d = c.h || cb(),
                e = u(I, "ah", v());
            if (e["::"] && b.length) {
                a = [];
                for (var f = null; f = b.shift();) {
                    var g = f.split("."),
                        g = e[f] || e[g[1] && "ns:" + g[0] || ""] || d,
                        k = a.length && a[a.length - 1] || null,
                        h = k;
                    k && k.hint == g || (h = {
                        hint: g,
                        M: []
                    }, a.push(h));
                    h.M.push(f)
                }
                var l = a.length;
                if (1 < l) {
                    var m =
                        c.callback;
                    m && (c.callback = function() {
                        0 == --l && m()
                    })
                }
                for (; b = a.shift();) lb(b.M, c, b.hint)
            } else lb(b || [], c, d)
        },
        lb = function(a, b, c) {
            a = ga(a) || [];
            var d = b.callback,
                e = b.config,
                f = b.timeout,
                g = b.ontimeout,
                k = b.onerror,
                h = void 0;
            "function" == typeof k && (h = k);
            var l = null,
                m = !1;
            if (f && !g || !f && g) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";
            var k = u(Ja(c), "r", []).sort(),
                r = u(Ja(c), "L", []).sort(),
                w = [].concat(k),
                t = function(a, b) {
                    if (m) return 0;
                    n.clearTimeout(l);
                    r.push.apply(r, y);
                    var d = ((C || {}).config || {}).update;
                    d ? d(e) : e && u(I, "cu", []).push(e);
                    if (b) {
                        Oa("me0", a, w);
                        try {
                            kb(b, c, h)
                        } finally {
                            Oa("me1", a, w)
                        }
                    }
                    return 1
                };
            0 < f && (l = n.setTimeout(function() {
                m = !0;
                g()
            }, f));
            var y = eb(a, r);
            if (y.length) {
                var y = eb(a, k),
                    F = u(I, "CP", []),
                    G = F.length;
                F[G] = function(a) {
                    if (!a) return 0;
                    Oa("ml1", y, w);
                    var b = function(b) {
                            F[G] = null;
                            t(y, a) && Ia(function() {
                                d && d();
                                b()
                            })
                        },
                        c = function() {
                            var a = F[G + 1];
                            a && a()
                        };
                    0 < G && F[G - 1] ? F[G] = function() {
                        b(c)
                    } : b(c)
                };
                if (y.length) {
                    var qa = "loaded_" + I.I++;
                    C[qa] = function(a) {
                        F[G](a);
                        C[qa] = null
                    };
                    a = Ya(c, y,
                        "gapi." + qa, k);
                    k.push.apply(k, y);
                    Oa("ml0", y, w);
                    b.sync || n.___gapisync ? hb(a) : gb(a)
                } else F[G](da)
            } else t(y) && d && d()
        };
    var jb = function(a, b) {
        if (I.hee && 0 < I.hel) try {
            return a()
        } catch (c) {
            b && b(c), I.hel--, P("debug_error", function() {
                try {
                    window.___jsl.hefn(c)
                } catch (d) {
                    throw c;
                }
            })
        } else try {
            return a()
        } catch (c) {
            throw b && b(c), c;
        }
    };
    C.load = function(a, b) {
        return jb(function() {
            return P(a, b)
        })
    };
    var Q = function(a) {
            var b = window.___jsl = window.___jsl || {};
            b[a] = b[a] || [];
            return b[a]
        },
        R = function(a) {
            var b = window.___jsl = window.___jsl || {};
            b.cfg = !a && b.cfg || {};
            return b.cfg
        },
        mb = function(a) {
            return "object" === typeof a && /\[native code\]/.test(a.push)
        },
        S = function(a, b) {
            if (b)
                for (var c in b) b.hasOwnProperty(c) && (a[c] && b[c] && "object" === typeof a[c] && "object" === typeof b[c] && !mb(a[c]) && !mb(b[c]) ? S(a[c], b[c]) : b[c] && "object" === typeof b[c] ? (a[c] = mb(b[c]) ? [] : {}, S(a[c], b[c])) : a[c] = b[c])
        },
        nb = function(a) {
            if (a && !/^\s+$/.test(a)) {
                for (; 0 ==
                    a.charCodeAt(a.length - 1);) a = a.substring(0, a.length - 1);
                var b;
                try {
                    b = window.JSON.parse(a)
                } catch (c) {}
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return (" + a + "\n)"))()
                } catch (c) {}
                if ("object" === typeof b) return b;
                try {
                    b = (new Function("return ({" + a + "\n})"))()
                } catch (c) {}
                return "object" === typeof b ? b : {}
            }
        },
        ob = function(a) {
            R(!0);
            var b = window.___gcfg,
                c = Q("cu");
            if (b && b !== window.___gu) {
                var d = {};
                S(d, b);
                c.push(d);
                window.___gu = b
            }
            var b = Q("cu"),
                e = document.scripts || document.getElementsByTagName("script") || [],
                d = [],
                f = [];
            f.push.apply(f, Q("us"));
            for (var g = 0; g < e.length; ++g)
                for (var k = e[g], h = 0; h < f.length; ++h) k.src && 0 == k.src.indexOf(f[h]) && d.push(k);
            0 == d.length && 0 < e.length && e[e.length - 1].src && d.push(e[e.length - 1]);
            for (e = 0; e < d.length; ++e) d[e].getAttribute("gapi_processed") || (d[e].setAttribute("gapi_processed", !0), (f = d[e]) ? (g = f.nodeType, f = 3 == g || 4 == g ? f.nodeValue : f.textContent || f.innerText || f.innerHTML || "") : f = void 0, (f = nb(f)) && b.push(f));
            a && (d = {}, S(d, a), c.push(d));
            d = Q("cd");
            a = 0;
            for (b = d.length; a < b; ++a) S(R(), d[a]);
            d = Q("ci");
            a = 0;
            for (b = d.length; a < b; ++a) S(R(), d[a]);
            a = 0;
            for (b = c.length; a < b; ++a) S(R(), c[a])
        },
        T = function(a) {
            if (!a) return R();
            a = a.split("/");
            for (var b = R(), c = 0, d = a.length; b && "object" === typeof b && c < d; ++c) b = b[a[c]];
            return c === a.length && void 0 !== b ? b : void 0
        },
        pb = function(a, b) {
            var c = a;
            if ("string" === typeof a) {
                var d = c = {};
                a = a.split("/");
                for (var e = 0, f = a.length; e < f - 1; ++e) var g = {},
                    d = d[a[e]] = g;
                d[a[e]] = b
            }
            ob(c)
        };
    var qb = function() {
        var a = window.__GOOGLEAPIS;
        a && (a.googleapis && !a["googleapis.config"] && (a["googleapis.config"] = a.googleapis), u(I, "ci", []).push(a), window.__GOOGLEAPIS = void 0)
    };
    var rb = {
            apppackagename: 1,
            callback: 1,
            clientid: 1,
            cookiepolicy: 1,
            openidrealm: -1,
            includegrantedscopes: -1,
            requestvisibleactions: 1,
            scope: 1
        },
        sb = !1,
        tb = v(),
        ub = function() {
            if (!sb) {
                for (var a = document.getElementsByTagName("meta"), b = 0; b < a.length; ++b) {
                    var c = a[b].name.toLowerCase();
                    if (0 == c.lastIndexOf("google-signin-", 0)) {
                        var c = c.substring(14),
                            d = a[b].content;
                        rb[c] && d && (tb[c] = d)
                    }
                }
                if (window.self !== window.top) {
                    var a = document.location.toString(),
                        e;
                    for (e in rb) 0 < rb[e] && (b = D(a, e, "")) && (tb[e] = b)
                }
                sb = !0
            }
            e = v();
            A(tb, e);
            return e
        },
        vb = function(a) {
            return !!(a.clientid && a.scope && a.callback)
        };
    var wb = window.console,
        xb = function(a) {
            wb && wb.log && wb.log(a)
        };
    var yb = function() {
            return !!I.oa
        },
        zb = function() {};
    var U = u(I, "rw", v()),
        Ab = function(a) {
            for (var b in U) a(U[b])
        },
        Bb = function(a, b) {
            (a = U[a]) && a.state < b && (a.state = b)
        };
    var Cb;
    var Db = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,
        Eb = /^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,21})\//,
        Fb = function(a) {
            var b = T("googleapis.config/sessionIndex");
            "string" === typeof b && 254 < b.length && (b = null);
            null == b && (b = window.__X_GOOG_AUTHUSER);
            "string" === typeof b && 254 < b.length && (b = null);
            if (null == b) {
                var c = window.google;
                c && (b = c.authuser)
            }
            "string" === typeof b && 254 < b.length && (b = null);
            null == b && (a = a || window.location.href, b = D(a, "authuser") ||
                null, null == b && (b = (b = a.match(Db)) ? b[1] : null));
            if (null == b) return null;
            b = String(b);
            254 < b.length && (b = null);
            return b
        },
        Gb = function(a) {
            var b = T("googleapis.config/sessionDelegate");
            "string" === typeof b && 21 < b.length && (b = null);
            null == b && (b = (a = (a || window.location.href).match(Eb)) ? a[1] : null);
            if (null == b) return null;
            b = String(b);
            21 < b.length && (b = null);
            return b
        };
    var Hb = function() {
        this.i = -1
    };
    var V = function() {
        this.i = 64;
        this.b = [];
        this.C = [];
        this.V = [];
        this.w = [];
        this.w[0] = 128;
        for (var a = 1; a < this.i; ++a) this.w[a] = 0;
        this.A = this.l = 0;
        this.reset()
    };
    (function() {
        function a() {}
        a.prototype = Hb.prototype;
        V.fa = Hb.prototype;
        V.prototype = new a;
        V.v = function(a, c, d) {
            for (var b = Array(arguments.length - 2), f = 2; f < arguments.length; f++) b[f - 2] = arguments[f];
            return Hb.prototype[c].apply(a, b)
        }
    })();
    V.prototype.reset = function() {
        this.b[0] = 1732584193;
        this.b[1] = 4023233417;
        this.b[2] = 2562383102;
        this.b[3] = 271733878;
        this.b[4] = 3285377520;
        this.A = this.l = 0
    };
    var Ib = function(a, b, c) {
        c || (c = 0);
        var d = a.V;
        if ("string" == typeof b)
            for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
            for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.b[0];
        c = a.b[1];
        for (var g = a.b[2], k = a.b[3], h = a.b[4], l, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = k ^ c & (g ^ k), l = 1518500249) : (f = c ^ g ^ k, l = 1859775393) : 60 > e ? (f = c & g | k & (c | g), l = 2400959708) : (f = c ^ g ^ k,
            l = 3395469782), f = (b << 5 | b >>> 27) + f + h + l + d[e] & 4294967295, h = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.b[0] = a.b[0] + b & 4294967295;
        a.b[1] = a.b[1] + c & 4294967295;
        a.b[2] = a.b[2] + g & 4294967295;
        a.b[3] = a.b[3] + k & 4294967295;
        a.b[4] = a.b[4] + h & 4294967295
    };
    V.prototype.update = function(a, b) {
        if (null != a) {
            void 0 === b && (b = a.length);
            for (var c = b - this.i, d = 0, e = this.C, f = this.l; d < b;) {
                if (0 == f)
                    for (; d <= c;) Ib(this, a, d), d += this.i;
                if ("string" == typeof a)
                    for (; d < b;) {
                        if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.i) {
                            Ib(this, e);
                            f = 0;
                            break
                        }
                    } else
                        for (; d < b;)
                            if (e[f] = a[d], ++f, ++d, f == this.i) {
                                Ib(this, e);
                                f = 0;
                                break
                            }
            }
            this.l = f;
            this.A += b
        }
    };
    V.prototype.digest = function() {
        var a = [],
            b = 8 * this.A;
        56 > this.l ? this.update(this.w, 56 - this.l) : this.update(this.w, this.i - (this.l - 56));
        for (var c = this.i - 1; 56 <= c; c--) this.C[c] = b & 255, b /= 256;
        Ib(this, this.C);
        for (c = b = 0; 5 > c; c++)
            for (var d = 24; 0 <= d; d -= 8) a[b] = this.b[c] >> d & 255, ++b;
        return a
    };
    var Jb = function() {
        this.G = new V
    };
    Jb.prototype.reset = function() {
        this.G.reset()
    };
    var Kb = n.crypto,
        Lb = !1,
        Mb = 0,
        Nb = 0,
        Ob = 1,
        Pb = 0,
        Qb = "",
        Rb = function(a) {
            a = a || n.event;
            var b = a.screenX + a.clientX << 16,
                b = b + (a.screenY + a.clientY),
                b = (new Date).getTime() % 1E6 * b;
            Ob = Ob * b % Pb;
            0 < Mb && ++Nb == Mb && H("mousemove", Rb, "remove", "de")
        },
        Sb = function(a) {
            var b = new Jb;
            a = unescape(encodeURIComponent(a));
            for (var c = [], d = 0, e = a.length; d < e; ++d) c.push(a.charCodeAt(d));
            b.G.update(c);
            b = b.G.digest();
            a = "";
            for (c = 0; c < b.length; c++) a += "0123456789ABCDEF".charAt(Math.floor(b[c] / 16)) + "0123456789ABCDEF".charAt(b[c] % 16);
            return a
        },
        Lb = !!Kb &&
        "function" == typeof Kb.getRandomValues;
    Lb || (Pb = 1E6 * (screen.width * screen.width + screen.height), Qb = Sb(p.cookie + "|" + p.location + "|" + (new Date).getTime() + "|" + Math.random()), Mb = T("random/maxObserveMousemove") || 0, 0 != Mb && H("mousemove", Rb, "add", "at"));
    var Tb = function() {
            var a = Ob,
                a = a + parseInt(Qb.substr(0, 20), 16);
            Qb = Sb(Qb);
            return a / (Pb + Math.pow(16, 20))
        },
        Ub = function() {
            var a = new n.Uint32Array(1);
            Kb.getRandomValues(a);
            return Number("0." + a[0])
        };
    var Vb = function() {
            var a = I.onl;
            if (!a) {
                a = v();
                I.onl = a;
                var b = v();
                a.e = function(a) {
                    var c = b[a];
                    c && (delete b[a], c())
                };
                a.a = function(a, d) {
                    b[a] = d
                };
                a.r = function(a) {
                    delete b[a]
                }
            }
            return a
        },
        Wb = function(a, b) {
            b = b.onload;
            return "function" === typeof b ? (Vb().a(a, b), b) : null
        },
        Xb = function(a) {
            B(/^\w+$/.test(a), "Unsupported id - " + a);
            Vb();
            return 'onload="window.___jsl.onl.e(&#34;' + a + '&#34;)"'
        },
        Yb = function(a) {
            Vb().r(a)
        };
    var Zb = {
            allowtransparency: "true",
            frameborder: "0",
            hspace: "0",
            marginheight: "0",
            marginwidth: "0",
            scrolling: "no",
            style: "",
            tabindex: "0",
            vspace: "0",
            width: "100%"
        },
        $b = {
            allowtransparency: !0,
            onload: !0
        },
        ac = 0,
        bc = function(a) {
            B(!a || za.test(a), "Illegal url for new iframe - " + a)
        },
        cc = function(a, b, c, d, e) {
            bc(c.src);
            var f, g = Wb(d, c),
                k = g ? Xb(d) : "";
            try {
                document.all && (f = a.createElement('<iframe frameborder="' + ma(String(c.frameborder)) + '" scrolling="' + ma(String(c.scrolling)) + '" ' + k + ' name="' + ma(String(c.name)) + '"/>'))
            } catch (l) {} finally {
                f ||
                    (f = a.createElement("iframe"), g && (f.onload = function() {
                        f.onload = null;
                        g.call(this)
                    }, Yb(d)))
            }
            f.setAttribute("ng-non-bindable", "");
            for (var h in c) a = c[h], "style" === h && "object" === typeof a ? A(a, f.style) : $b[h] || f.setAttribute(h, String(a));
            (h = e && e.beforeNode || null) || e && e.dontclear || Ea(b);
            b.insertBefore(f, h);
            f = h ? h.previousSibling : b.lastChild;
            c.allowtransparency && (f.allowTransparency = !0);
            return f
        };
    var dc = /^:[\w]+$/,
        ec = /:([a-zA-Z_]+):/g,
        fc = function() {
            var a = Fb() || "0",
                b = Gb(),
                c;
            c = Fb(void 0) || a;
            var d = Gb(void 0),
                e = "";
            c && (e += "u/" + encodeURIComponent(String(c)) + "/");
            d && (e += "b/" + encodeURIComponent(String(d)) + "/");
            c = e || null;
            (e = (d = !1 === T("isLoggedIn")) ? "_/im/" : "") && (c = "");
            var f = T("iframes/:socialhost:"),
                g = T("iframes/:im_socialhost:");
            return Cb = {
                socialhost: f,
                ctx_socialhost: d ? g : f,
                session_index: a,
                session_delegate: b,
                session_prefix: c,
                im_prefix: e
            }
        },
        gc = function(a, b) {
            return fc()[b] || ""
        },
        hc = function(a) {
            return function(b,
                c) {
                return a ? fc()[c] || a[c] || "" : fc()[c] || ""
            }
        };
    var ic = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        jc = function(a) {
            var b, c, d;
            b = /[\"\\\x00-\x1f\x7f-\x9f]/g;
            if (void 0 !== a) {
                switch (typeof a) {
                    case "string":
                        return b.test(a) ? '"' + a.replace(b, function(a) {
                            var b = ic[a];
                            if (b) return b;
                            b = a.charCodeAt();
                            return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
                        }) + '"' : '"' + a + '"';
                    case "number":
                        return isFinite(a) ? String(a) : "null";
                    case "boolean":
                    case "null":
                        return String(a);
                    case "object":
                        if (!a) return "null";
                        b = [];
                        if ("number" ===
                            typeof a.length && !a.propertyIsEnumerable("length")) {
                            d = a.length;
                            for (c = 0; c < d; c += 1) b.push(jc(a[c]) || "null");
                            return "[" + b.join(",") + "]"
                        }
                        for (c in a) !/___$/.test(c) && x(a, c) && "string" === typeof c && (d = jc(a[c])) && b.push(jc(c) + ":" + d);
                        return "{" + b.join(",") + "}"
                }
                return ""
            }
        },
        kc = function(a) {
            if (!a) return !1;
            if (/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) try {
                return eval("(" + a + ")")
            } catch (b) {}
            return !1
        },
        lc = !1;
    try {
        lc = !!window.JSON && '["a"]' === window.JSON.stringify(["a"]) && "a" === window.JSON.parse('["a"]')[0]
    } catch (a) {}
    var mc = function(a) {
            try {
                return window.JSON.parse(a)
            } catch (b) {
                return !1
            }
        },
        nc = lc ? window.JSON.stringify : jc,
        oc = lc ? mc : kc;
    var pc = function(a) {
            var b;
            a.match(/^https?%3A/i) && (b = decodeURIComponent(a));
            return ya(document, b ? b : a)
        },
        qc = function(a) {
            a = a || "canonical";
            for (var b = document.getElementsByTagName("link"), c = 0, d = b.length; c < d; c++) {
                var e = b[c],
                    f = e.getAttribute("rel");
                if (f && f.toLowerCase() == a && (e = e.getAttribute("href")) && (e = pc(e)) && null != e.match(/^https?:\/\/[\w\-\_\.]+/i)) return e
            }
            return window.location.href
        };
    var rc = {
            se: "0"
        },
        sc = {
            post: !0
        },
        tc = {
            style: "position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"
        },
        uc = "onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),
        vc = u(I, "WI", v()),
        wc = function(a, b, c) {
            var d, e;
            d = {};
            var f = e = a;
            "plus" == a && b.action && (e = a + "_" + b.action, f = a + "/" + b.action);
            (e = T("iframes/" + e + "/url")) || (e = ":im_socialhost:/:session_prefix::im_prefix:_/widget/render/" + f + "?usegapi=1");
            for (var g in rc) d[g] = g + "/" + (b[g] || rc[g]) + "/";
            d = ya(p, e.replace(ec,
                hc(d)));
            g = "iframes/" + a + "/params/";
            f = {};
            A(b, f);
            (e = T("lang") || T("gwidget/lang")) && (f.hl = e);
            sc[a] || (f.origin = window.location.origin || window.location.protocol + "//" + window.location.host);
            f.exp = T(g + "exp");
            if (g = T(g + "location"))
                for (e = 0; e < g.length; e++) {
                    var k = g[e];
                    f[k] = n.location[k]
                }
            switch (a) {
                case "plus":
                case "follow":
                    g = f.href;
                    e = b.action ? void 0 : "publisher";
                    g = (g = "string" == typeof g ? g : void 0) ? pc(g) : qc(e);
                    f.url = g;
                    delete f.href;
                    break;
                case "plusone":
                    g = (g = b.href) ? pc(g) : qc();
                    f.url = g;
                    g = b.db;
                    e = T();
                    null == g && e && (g = e.db,
                        null == g && (g = e.gwidget && e.gwidget.db));
                    f.db = g || void 0;
                    g = b.ecp;
                    e = T();
                    null == g && e && (g = e.ecp, null == g && (g = e.gwidget && e.gwidget.ecp));
                    f.ecp = g || void 0;
                    delete f.href;
                    break;
                case "signin":
                    f.url = qc()
            }
            I.ILI && (f.iloader = "1");
            delete f["data-onload"];
            delete f.rd;
            for (var h in rc) f[h] && delete f[h];
            f.gsrc = T("iframes/:source:");
            h = T("inline/css");
            "undefined" !== typeof h && 0 < c && h >= c && (f.ic = "1");
            h = /^#|^fr-/;
            c = {};
            for (var l in f) x(f, l) && h.test(l) && (c[l.replace(h, "")] = f[l], delete f[l]);
            l = "q" == T("iframes/" + a + "/params/si") ? f :
                c;
            h = ub();
            for (var m in h) !x(h, m) || x(f, m) || x(c, m) || (l[m] = h[m]);
            m = [].concat(uc);
            (l = T("iframes/" + a + "/methods")) && "object" === typeof l && ea.test(l.push) && (m = m.concat(l));
            for (var r in b) x(b, r) && /^on/.test(r) && ("plus" != a || "onconnect" != r) && (m.push(r), delete f[r]);
            delete f.callback;
            c._methods = m.join(",");
            return wa(d, f, c)
        },
        xc = ["style", "data-gapiscan"],
        zc = function(a) {
            for (var b = v(), c = 0 != a.nodeName.toLowerCase().indexOf("g:"), d = 0, e = a.attributes.length; d < e; d++) {
                var f = a.attributes[d],
                    g = f.name,
                    k = f.value;
                0 <= fa.call(xc,
                    g) || c && 0 != g.indexOf("data-") || "null" === k || "specified" in f && !f.specified || (c && (g = g.substr(5)), b[g.toLowerCase()] = k)
            }
            a = a.style;
            (c = yc(a && a.height)) && (b.height = String(c));
            (a = yc(a && a.width)) && (b.width = String(a));
            return b
        },
        yc = function(a) {
            var b = void 0;
            "number" === typeof a ? b = a : "string" === typeof a && (b = parseInt(a, 10));
            return b
        },
        Bc = function() {
            var a = I.drw;
            Ab(function(b) {
                if (a !== b.id && 4 != b.state && "share" != b.type) {
                    var c = b.id,
                        d = b.type,
                        e = b.url;
                    b = b.userParams;
                    var f = p.getElementById(c);
                    if (f) {
                        var g = wc(d, b, 0);
                        g ? (f = f.parentNode,
                            e.replace(/\#.*/, "").replace(/(\?|&)ic=1/, "") !== g.replace(/\#.*/, "").replace(/(\?|&)ic=1/, "") && (b.dontclear = !0, b.rd = !0, b.ri = !0, b.type = d, Ac(f, b), (d = U[f.lastChild.id]) && (d.oid = c), Bb(c, 4))) : delete U[c]
                    } else delete U[c]
                }
            })
        };
    var W, X, Y, Cc, Dc, Ec = /(?:^|\s)g-((\S)*)(?:$|\s)/,
        Fc = {
            plusone: !0,
            autocomplete: !0,
            profile: !0,
            signin: !0,
            signin2: !0
        };
    W = u(I, "SW", v());
    X = u(I, "SA", v());
    Y = u(I, "SM", v());
    Cc = u(I, "FW", []);
    Dc = null;
    var Hc = function(a, b) {
            Gc(void 0, !1, a, b)
        },
        Gc = function(a, b, c, d) {
            L("ps0", !0);
            c = ("string" === typeof c ? document.getElementById(c) : c) || p;
            var e;
            e = p.documentMode;
            if (c.querySelectorAll && (!e || 8 < e)) {
                e = d ? [d] : z(W).concat(z(X)).concat(z(Y));
                for (var f = [], g = 0; g < e.length; g++) {
                    var k = e[g];
                    f.push(".g-" + k, "g\\:" + k)
                }
                e = c.querySelectorAll(f.join(","))
            } else e = c.getElementsByTagName("*");
            c = v();
            for (f = 0; f < e.length; f++) {
                g = e[f];
                var h = g,
                    k = d,
                    l = h.nodeName.toLowerCase(),
                    m = void 0;
                h.getAttribute("data-gapiscan") ? k = null : (0 == l.indexOf("g:") ?
                    m = l.substr(2) : (h = (h = String(h.className || h.getAttribute("class"))) && Ec.exec(h)) && (m = h[1]), k = !m || !(W[m] || X[m] || Y[m]) || k && m !== k ? null : m);
                k && (Fc[k] || 0 == g.nodeName.toLowerCase().indexOf("g:") || 0 != z(zc(g)).length) && (g.setAttribute("data-gapiscan", !0), u(c, k, []).push(g))
            }
            if (b)
                for (var r in c)
                    for (b = c[r], d = 0; d < b.length; d++) b[d].setAttribute("data-onload", !0);
            for (var w in c) Cc.push(w);
            L("ps1", !0);
            if ((r = Cc.join(":")) || a) try {
                C.load(r, a)
            } catch (y) {
                xb(y);
                return
            }
            if (Ic(Dc || {}))
                for (var t in c) {
                    a = c[t];
                    w = 0;
                    for (b = a.length; w <
                        b; w++) a[w].removeAttribute("data-gapiscan");
                    Jc(t)
                } else {
                    d = [];
                    for (t in c)
                        for (a = c[t], w = 0, b = a.length; w < b; w++) e = a[w], Kc(t, e, zc(e), d, b);
                    Lc(r, d)
                }
        },
        Mc = function(a) {
            var b = u(C, a, {});
            b.go || (b.go = function(b) {
                return Hc(b, a)
            }, b.render = function(b, d) {
                d = d || {};
                d.type = a;
                return Ac(b, d)
            })
        },
        Nc = function(a) {
            W[a] = !0
        },
        Oc = function(a) {
            X[a] = !0
        },
        Pc = function(a) {
            Y[a] = !0
        };
    var Jc = function(a, b) {
            var c = Ha(a);
            b && c ? (c(b), (c = b.iframeNode) && c.setAttribute("data-gapiattached", !0)) : C.load(a, function() {
                var c = Ha(a),
                    e = b && b.iframeNode,
                    f = b && b.userParams;
                e && c ? (c(b), e.setAttribute("data-gapiattached", !0)) : (c = C[a].go, "signin2" == a ? c(e, f) : c(e && e.parentNode, f))
            })
        },
        Ic = function() {
            return !1
        },
        Lc = function() {},
        Kc = function(a, b, c, d, e, f, g) {
            switch (Qc(b, a, f)) {
                case 0:
                    a = Y[a] ? a + "_annotation" : a;
                    d = {};
                    d.iframeNode = b;
                    d.userParams = c;
                    Jc(a, d);
                    break;
                case 1:
                    var k;
                    if (b.parentNode) {
                        for (var h in c) {
                            if (f = x(c, h)) f =
                                c[h], f = !!f && "object" === typeof f && (!f.toString || f.toString === Object.prototype.toString || f.toString === Array.prototype.toString);
                            if (f) try {
                                c[h] = nc(c[h])
                            } catch (F) {
                                delete c[h]
                            }
                        }
                        f = !0;
                        c.dontclear && (f = !1);
                        delete c.dontclear;
                        zb();
                        h = wc(a, c, e);
                        e = g || {};
                        e.allowPost = 1;
                        e.attributes = tc;
                        e.dontclear = !f;
                        g = {};
                        g.userParams = c;
                        g.url = h;
                        g.type = a;
                        var l;
                        c.rd ? l = b : (l = document.createElement("div"), b.setAttribute("data-gapistub", !0), l.style.cssText = "position:absolute;width:450px;left:-10000px;", b.parentNode.insertBefore(l, b));
                        g.siteElement =
                            l;
                        l.id || (b = l, u(vc, a, 0), f = "___" + a + "_" + vc[a]++, b.id = f);
                        b = v();
                        b[">type"] = a;
                        A(c, b);
                        f = h;
                        c = l;
                        h = e || {};
                        b = h.attributes || {};
                        B(!h.allowPost || !b.onload, "onload is not supported by post iframe");
                        e = b = f;
                        dc.test(b) && (e = T("iframes/" + e.substring(1) + "/url"), B(!!e, "Unknown iframe url config for - " + b));
                        f = ya(p, e.replace(ec, gc));
                        b = c.ownerDocument || p;
                        l = 0;
                        do e = h.id || ["I", ac++, "_", (new Date).getTime()].join(""); while (b.getElementById(e) && 5 > ++l);
                        B(5 > l, "Error creating iframe id");
                        l = {};
                        var m = {};
                        b.documentMode && 9 > b.documentMode &&
                            (l.hostiemode = b.documentMode);
                        A(h.queryParams || {}, l);
                        A(h.fragmentParams || {}, m);
                        var r = h.connectWithQueryParams ? l : m,
                            w = h.pfname,
                            t = v();
                        t.id = e;
                        t.parent = b.location.protocol + "//" + b.location.host;
                        var y = D(b.location.href, "parent"),
                            w = w || "";
                        !w && y && (y = D(b.location.href, "id", ""), w = D(b.location.href, "pfname", ""), w = y ? w + "/" + y : "");
                        t.pfname = w;
                        A(t, r);
                        (t = D(f, "rpctoken") || l.rpctoken || m.rpctoken) || (t = r.rpctoken = h.rpctoken || String(Math.round(1E8 * (Lb ? Ub() : Tb()))));
                        h.rpctoken = t;
                        t = b.location.href;
                        r = v();
                        (y = D(t, "_bsh", I.bsh)) &&
                        (r._bsh = y);
                        (t = J(t)) && (r.jsh = t);
                        h.hintInFragment ? A(r, m) : A(r, l);
                        f = wa(f, l, m, h.paramsSerializer);
                        m = v();
                        A(Zb, m);
                        A(h.attributes, m);
                        m.name = m.id = e;
                        m.src = f;
                        h.eurl = f;
                        if ((h || {}).allowPost && 2E3 < f.length) {
                            l = E(f);
                            m.src = "";
                            m["data-postorigin"] = f;
                            f = cc(b, c, m, e); - 1 != navigator.userAgent.indexOf("WebKit") && (k = f.contentWindow.document, k.open(), m = k.createElement("div"), r = {}, t = e + "_inner", r.name = t, r.src = "", r.style = "display:none", cc(b, m, r, t, h));
                            m = (h = l.query[0]) ? h.split("&") : [];
                            h = [];
                            for (r = 0; r < m.length; r++) t = m[r].split("=",
                                2), h.push([decodeURIComponent(t[0]), decodeURIComponent(t[1])]);
                            l.query = [];
                            m = ua(l);
                            B(za.test(m), "Invalid URL: " + m);
                            l = b.createElement("form");
                            l.action = m;
                            l.method = "POST";
                            l.target = e;
                            l.style.display = "none";
                            for (e = 0; e < h.length; e++) m = b.createElement("input"), m.type = "hidden", m.name = h[e][0], m.value = h[e][1], l.appendChild(m);
                            c.appendChild(l);
                            l.submit();
                            l.parentNode.removeChild(l);
                            k && k.close();
                            k = f
                        } else k = cc(b, c, m, e, h);
                        g.iframeNode = k;
                        g.id = k.getAttribute("id");
                        k = g.id;
                        c = v();
                        c.id = k;
                        c.userParams = g.userParams;
                        c.url =
                            g.url;
                        c.type = g.type;
                        c.state = 1;
                        U[k] = c;
                        k = g
                    } else k = null;
                    k && ((g = k.id) && d.push(g), Jc(a, k))
            }
        },
        Qc = function(a, b, c) {
            if (a && 1 === a.nodeType && b) {
                if (c) return 1;
                if (Y[b]) {
                    if (Fa[a.nodeName.toLowerCase()]) return (a = a.innerHTML) && a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") ? 0 : 1
                } else {
                    if (X[b]) return 0;
                    if (W[b]) return 1
                }
            }
            return null
        },
        Ac = function(a, b) {
            var c = b.type;
            delete b.type;
            var d = ("string" === typeof a ? document.getElementById(a) : a) || void 0;
            if (d) {
                a = {};
                for (var e in b) x(b, e) && (a[e.toLowerCase()] = b[e]);
                a.rd = 1;
                (b = !!a.ri) && delete a.ri;
                e = [];
                Kc(c, d, a, e, 0, b, void 0);
                Lc(c, e)
            } else xb("string" === "gapi." + c + ".render: missing element " + typeof a ? a : "")
        };
    u(C, "platform", {}).go = Hc;
    var Ic = function(a) {
            for (var b = ["_c", "jsl", "h"], c = 0; c < b.length && a; c++) a = a[b[c]];
            b = J(q.href);
            return !a || 0 != a.indexOf("n;") && 0 != b.indexOf("n;") && a !== b
        },
        Lc = function(a, b) {
            Rc(a, b)
        },
        Ba = function(a) {
            Gc(a, !0)
        },
        Sc = function(a, b) {
            b = b || [];
            for (var c = 0; c < b.length; ++c) a(b[c]);
            for (a = 0; a < b.length; a++) Mc(b[a])
        };
    M.push(["platform", function(a, b, c) {
        Dc = c;
        b && Cc.push(b);
        Sc(Nc, a);
        Sc(Oc, c._c.annotation);
        Sc(Pc, c._c.bimodal);
        qb();
        ob();
        if ("explicit" != T("parsetags")) {
            Ga(a);
            vb(ub()) && !T("disableRealtimeCallback") && zb();
            var d;
            c && (a = c.callback) && (d = na(a), delete c.callback);
            Da(function() {
                Ba(d)
            })
        }
    }]);
    C._pl = !0;
    var Tc = function(a) {
        a = (a = U[a]) ? a.oid : void 0;
        if (a) {
            var b = p.getElementById(a);
            b && b.parentNode.removeChild(b);
            delete U[a];
            Tc(a)
        }
    };
    var Uc = /^\{h\:'/,
        Vc = /^!_/,
        Wc = "",
        Rc = function(a, b) {
            function c() {
                H("message", d, "remove", "de")
            }

            function d(d) {
                var f = d.data,
                    k = d.origin;
                if (Xc(f, b)) {
                    var h = e;
                    e = !1;
                    h && L("rqe");
                    Yc(a, function() {
                        h && L("rqd");
                        c();
                        for (var a = u(I, "RPMQ", []), b = 0; b < a.length; b++) a[b]({
                            data: f,
                            origin: k
                        })
                    })
                }
            }
            if (0 !== b.length) {
                Wc = D(q.href, "pfname", "");
                var e = !0;
                H("message", d, "add", "at");
                P(a, c)
            }
        },
        Xc = function(a, b) {
            a = String(a);
            if (Uc.test(a)) return !0;
            var c = !1;
            Vc.test(a) && (c = !0, a = a.substr(2));
            if (!/^\{/.test(a)) return !1;
            var d = oc(a);
            if (!d) return !1;
            a = d.f;
            if (d.s && a && -1 != fa.call(b, a)) {
                if ("_renderstart" === d.s || d.s === Wc + "/" + a + "::_renderstart")
                    if (d = d.a && d.a[c ? 0 : 1], b = p.getElementById(a), Bb(a, 2), d && b && d.width && d.height) {
                        a: {
                            c = b.parentNode;a = d || {};
                            if (yb()) {
                                var e = b.id;
                                if (e) {
                                    d = (d = U[e]) ? d.state : void 0;
                                    if (1 === d || 4 === d) break a;
                                    Tc(e)
                                }
                            }(d = c.nextSibling) && d.getAttribute && d.getAttribute("data-gapistub") && (c.parentNode.removeChild(d), c.style.cssText = "");
                            var d = a.width,
                                f = a.height,
                                g = c.style;g.textIndent = "0";g.margin = "0";g.padding = "0";g.background = "transparent";g.borderStyle =
                            "none";g.cssFloat = "none";g.styleFloat = "none";g.lineHeight = "normal";g.fontSize = "1px";g.verticalAlign = "baseline";c = c.style;c.display = "inline-block";g = b.style;g.position = "static";g.left = "0";g.top = "0";g.visibility = "visible";d && (c.width = g.width = d + "px");f && (c.height = g.height = f + "px");a.verticalAlign && (c.verticalAlign = a.verticalAlign);e && Bb(e, 3)
                        }
                        b["data-csi-wdt"] = (new Date).getTime()
                    }
                return !0
            }
            return !1
        },
        Yc = function(a, b) {
            P(a, b)
        };
    var Zc = function(a, b) {
            this.O = a;
            a = b || {};
            this.Y = Number(a.maxAge) || 0;
            this.L = a.domain;
            this.P = a.path;
            this.$ = !!a.secure
        },
        $c = /^[-+/_=.:|%&a-zA-Z0-9@]*$/,
        ad = /^[A-Z_][A-Z0-9_]{0,63}$/;
    Zc.prototype.write = function(a, b) {
        if (!ad.test(this.O)) throw "Invalid cookie name";
        if (!$c.test(a)) throw "Invalid cookie value";
        a = this.O + "=" + a;
        this.L && (a += ";domain=" + this.L);
        this.P && (a += ";path=" + this.P);
        b = "number" === typeof b ? b : this.Y;
        if (0 <= b) {
            var c = new Date;
            c.setSeconds(c.getSeconds() + b);
            a += ";expires=" + c.toUTCString()
        }
        this.$ && (a += ";secure");
        document.cookie = a;
        return !0
    };
    Zc.iterate = function(a) {
        for (var b = document.cookie.split(/;\s*/), c = 0; c < b.length; ++c) {
            var d = b[c].split("="),
                e = d.shift();
            a(e, d.join("="))
        }
    };
    var bd = function(a) {
            this.X = a
        },
        cd = {};
    bd.prototype.write = function(a) {
        cd[this.X] = a;
        return !0
    };
    bd.iterate = function(a) {
        for (var b in cd) cd.hasOwnProperty(b) && a(b, cd[b])
    };
    var dd = "https:" === window.location.protocol,
        ed = dd || "http:" === window.location.protocol ? Zc : bd,
        fd = function(a) {
            var b = a.substr(1),
                c = "",
                d = window.location.hostname;
            if ("" !== b) {
                c = parseInt(b, 10);
                if (isNaN(c)) return null;
                b = d.split(".");
                if (b.length < c - 1) return null;
                b.length == c - 1 && (d = "." + d)
            } else d = "";
            return {
                g: "S" == a.charAt(0),
                domain: d,
                j: c
            }
        },
        gd = function() {
            var a, b = null;
            ed.iterate(function(c, d) {
                0 === c.indexOf("G_AUTHUSER_") && (c = fd(c.substring(11)), !a || c.g && !a.g || c.g == a.g && c.j > a.j) && (a = c, b = d)
            });
            return {
                W: a,
                B: b
            }
        };
    var hd = function(a) {
            if (0 !== a.indexOf("GCSC")) return null;
            var b = {
                N: !1
            };
            a = a.substr(4);
            if (!a) return b;
            var c = a.charAt(0);
            a = a.substr(1);
            var d = a.lastIndexOf("_");
            if (-1 == d) return b;
            var e = fd(a.substr(d + 1));
            if (null == e) return b;
            a = a.substring(0, d);
            if ("_" !== a.charAt(0)) return b;
            d = "E" === c && e.g;
            return !d && ("U" !== c || e.g) || d && !dd ? b : {
                N: !0,
                g: d,
                ca: a.substr(1),
                domain: e.domain,
                j: e.j
            }
        },
        id = function(a) {
            if (!a) return [];
            a = a.split("=");
            return a[1] ? a[1].split("|") : []
        },
        jd = function(a) {
            a = a.split(":");
            return {
                D: a[0].split("=")[1],
                ba: id(a[1]),
                ea: id(a[2]),
                da: id(a[3])
            }
        },
        kd = function() {
            var a = gd(),
                b = a.W,
                a = a.B;
            if (null !== a) {
                var c;
                ed.iterate(function(a, d) {
                    (a = hd(a)) && a.N && a.g == b.g && a.j == b.j && (c = d)
                });
                if (c) {
                    var d = jd(c),
                        e = d && d.ba[Number(a)],
                        d = d && d.D;
                    if (e) return {
                        B: a,
                        aa: e,
                        D: d
                    }
                }
            }
            return null
        };
    var Z = function(a) {
        this.K = a
    };
    Z.prototype.o = 0;
    Z.prototype.H = 2;
    Z.prototype.K = null;
    Z.prototype.F = !1;
    Z.prototype.T = function() {
        this.F || (this.o = 0, this.F = !0, this.R())
    };
    Z.prototype.R = function() {
        this.F && (this.K() ? this.o = this.H : this.o = Math.min(2 * (this.o || this.H), 120), window.setTimeout(ca(this.R, this), 1E3 * this.o))
    };
    for (var ld = 0; 64 > ld; ++ld);
    var md = null,
        yb = function() {
            return I.oa = !0
        },
        zb = function() {
            I.oa = !0;
            var a = kd();
            (a = a && a.B) && pb("googleapis.config/sessionIndex", a);
            md || (md = u(I, "ss", new Z(nd)));
            a = md;
            a.T && a.T()
        },
        nd = function() {
            var a = kd(),
                b = a && a.aa || null,
                c = a && a.D;
            P("auth", {
                callback: function() {
                    var a = n.gapi.auth,
                        e = {
                            client_id: c,
                            session_state: b
                        };
                    a.checkSessionState(e, function(b) {
                        var c = e.session_state,
                            d = T("isLoggedIn");
                        b = T("debug/forceIm") ? !1 : c && b || !c && !b;
                        if (d = d != b) pb("isLoggedIn", b), zb(), Bc(), b || ((b = a.signOut) ? b() : (b = a.setToken) && b(null));
                        b =
                            ub();
                        var f = T("savedUserState"),
                            c = a._guss(b.cookiepolicy),
                            f = f != c && "undefined" != typeof f;
                        pb("savedUserState", c);
                        (d || f) && vb(b) && !T("disableRealtimeCallback") && a._pimf(b, !0)
                    })
                }
            });
            return !0
        };
    L("bs0", !0, window.gapi._bs);
    L("bs1", !0);
    delete window.gapi._bs;
}).call(this);
gapi.load("", {
    callback: window["gapi_onload"],
    _c: {
        "jsl": {
            "ci": {
                "deviceType": "desktop",
                "oauth-flow": {
                    "authUrl": "https://accounts.google.com/o/oauth2/auth",
                    "proxyUrl": "https://accounts.google.com/o/oauth2/postmessageRelay",
                    "disableOpt": true,
                    "idpIframeUrl": "https://accounts.google.com/o/oauth2/iframe",
                    "usegapi": false
                },
                "debug": {
                    "reportExceptionRate": 0.05,
                    "forceIm": false,
                    "rethrowException": false,
                    "host": "https://apis.google.com"
                },
                "enableMultilogin": true,
                "googleapis.config": {
                    "auth": {
                        "useFirstPartyAuthV2": true
                    }
                },
                "isPlusUser": true,
                "inline": {
                    "css": 1
                },
                "disableRealtimeCallback": false,
                "drive_share": {
                    "skipInitCommand": true
                },
                "csi": {
                    "rate": 0.01
                },
                "client": {
                    "headers": {
                        "request": ["Accept", "Accept-Language", "Authorization", "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-Language", "Content-Length", "Content-MD5", "Content-Range", "Content-Type", "Date", "GData-Version", "Host", "If-Match", "If-Modified-Since", "If-None-Match", "If-Unmodified-Since", "Origin", "OriginToken", "Pragma", "Range", "Slug", "Transfer-Encoding", "Want-Digest", "X-ClientDetails", "X-GData-Client", "X-GData-Key", "X-Goog-AuthUser", "X-Goog-PageId", "X-Goog-Encode-Response-If-Executable", "X-Goog-Correlation-Id", "X-Goog-Request-Info", "X-Goog-Experiments", "x-goog-iam-authority-selector", "x-goog-iam-authorization-token", "X-Goog-Spatula", "X-Goog-Upload-Command", "X-Goog-Upload-Content-Disposition", "X-Goog-Upload-Content-Length", "X-Goog-Upload-Content-Type", "X-Goog-Upload-File-Name", "X-Goog-Upload-Offset", "X-Goog-Upload-Protocol", "X-Goog-Visitor-Id", "X-HTTP-Method-Override", "X-JavaScript-User-Agent", "X-Pan-Versionid", "X-Proxied-User-IP", "X-Origin", "X-Referer", "X-Requested-With", "X-Upload-Content-Length", "X-Upload-Content-Type", "X-Use-HTTP-Status-Code-Override", "X-Ios-Bundle-Identifier", "X-Android-Package", "X-YouTube-VVT", "X-YouTube-Page-CL", "X-YouTube-Page-Timestamp"],
                        "response": ["Digest", "Cache-Control", "Content-Disposition", "Content-Encoding", "Content-Language", "Content-Length", "Content-MD5", "Content-Range", "Content-Type", "Date", "ETag", "Expires", "Last-Modified", "Location", "Pragma", "Range", "Server", "Transfer-Encoding", "WWW-Authenticate", "Vary", "Unzipped-Content-MD5", "X-Goog-Generation", "X-Goog-Metageneration", "X-Goog-Safety-Content-Type", "X-Goog-Safety-Encoding", "X-Google-Trace", "X-Goog-Upload-Chunk-Granularity", "X-Goog-Upload-Control-URL", "X-Goog-Upload-Size-Received", "X-Goog-Upload-Status", "X-Goog-Upload-URL", "X-Goog-Diff-Download-Range", "X-Goog-Hash", "X-Goog-Updated-Authorization", "X-Server-Object-Version", "X-Guploader-Customer", "X-Guploader-Upload-Result", "X-Guploader-Uploadid", "X-Google-Gfe-Backend-Request-Cost"]
                    },
                    "rms": "migrated",
                    "cors": false
                },
                "isLoggedIn": true,
                "signInDeprecation": {
                    "rate": 0.0
                },
                "include_granted_scopes": true,
                "llang": "en",
                "iframes": {
                    "youtube": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "ytsubscribe": {
                        "url": "https://www.youtube.com/subscribe_embed?usegapi\u003d1"
                    },
                    "plus_circle": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"
                    },
                    "plus_share": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"
                    },
                    "rbr_s": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"
                    },
                    "udc_webconsentflow": {
                        "params": {
                            "url": ""
                        },
                        "url": "https://myaccount.google.com/webconsent?usegapi\u003d1"
                    },
                    ":source:": "3p",
                    "playemm": {
                        "url": "https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "savetoandroidpay": {
                        "url": "https://androidpay.google.com/a/widget/save"
                    },
                    "blogger": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    "evwidget": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"
                    },
                    "partnersbadge": {
                        "url": "https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"
                    },
                    "surveyoptin": {
                        "url": "https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"
                    },
                    ":socialhost:": "https://apis.google.com",
                    "shortlists": {
                        "url": ""
                    },
                    "hangout": {
                        "url": "https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"
                    },
                    "plus_followers": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"
                    },
                    "post": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"
                    },
                    ":gplus_url:": "https://plus.google.com",
                    "signin": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1",
                        "methods": ["onauth"]
                    },
                    "rbr_i": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"
                    },
                    "donation": {
                        "url": "https://onetoday.google.com/home/donationWidget?usegapi\u003d1"
                    },
                    "share": {
                        "url": ":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"
                    },
                    "plusone": {
                        "params": {
                            "count": "",
                            "size": "",
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"
                    },
                    "comments": {
                        "params": {
                            "location": ["search", "hash"]
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1",
                        "methods": ["scroll", "openwindow"]
                    },
                    ":im_socialhost:": "https://plus.googleapis.com",
                    "backdrop": {
                        "url": "https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"
                    },
                    "visibility": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"
                    },
                    "autocomplete": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/autocomplete"
                    },
                    "additnow": {
                        "url": "https://apis.google.com/additnow/additnow.html?usegapi\u003d1",
                        "methods": ["launchurl"]
                    },
                    ":signuphost:": "https://plus.google.com",
                    "ratingbadge": {
                        "url": "https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"
                    },
                    "appcirclepicker": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/appcirclepicker"
                    },
                    "follow": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"
                    },
                    "community": {
                        "url": ":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"
                    },
                    "sharetoclassroom": {
                        "url": "https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"
                    },
                    "ytshare": {
                        "params": {
                            "url": ""
                        },
                        "url": ":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"
                    },
                    "plus": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"
                    },
                    "family_creation": {
                        "params": {
                            "url": ""
                        },
                        "url": "https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"
                    },
                    "commentcount": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"
                    },
                    "configurator": {
                        "url": ":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"
                    },
                    "zoomableimage": {
                        "url": "https://ssl.gstatic.com/microscope/embed/"
                    },
                    "savetowallet": {
                        "url": "https://clients5.google.com/s2w/o/savetowallet"
                    },
                    "person": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"
                    },
                    "savetodrive": {
                        "url": "https://drive.google.com/savetodrivebutton?usegapi\u003d1",
                        "methods": ["save"]
                    },
                    "page": {
                        "url": ":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"
                    },
                    "card": {
                        "url": ":socialhost:/:session_prefix:_/hovercard/card"
                    }
                }
            },
            "h": "m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.U_qcCO5vJjg.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/rs\u003dAGLTcCN09OppeEtIDWfUn7oAfYzITqTkKA",
            "u": "https://apis.google.com/js/platform.js",
            "hee": true,
            "fp": "d72dd13eb66993fae3c576a24a67e18754db9bcf",
            "dpo": false
        },
        "platform": ["additnow", "backdrop", "blogger", "comments", "commentcount", "community", "family_creation", "follow", "hangout", "page", "partnersbadge", "person", "playemm", "playreview", "plus", "plusone", "post", "savetoandroidpay", "savetodrive", "savetowallet", "shortlists", "signin2", "udc_webconsentflow", "visibility", "youtube", "ytsubscribe", "zoomableimage", "sharetoclassroom", "donation", "ratingbadge", "surveyoptin"],
        "fp": "d72dd13eb66993fae3c576a24a67e18754db9bcf",
        "annotation": ["interactivepost", "recobar", "signin2", "autocomplete", "profile"],
        "bimodal": ["signin", "share"]
    }
});
