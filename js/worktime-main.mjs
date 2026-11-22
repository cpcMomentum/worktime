import { $ as e, $n as n, $r as r, $t as i, An as a, B as o, Bn as s, Br as c, Cn as l, Cr as u, D as d, Dn as f, Dr as p, Dt as m, Et as h, F as g, Fn as _, Fr as v, Gn as y, Gr as b, Gt as x, Hn as S, Hr as C, In as w, Ir as T, It as E, Jn as D, K as O, Kn as k, Kr as ee, Kt as te, L as ne, Ln as re, Lr as A, Mn as ie, Mr as ae, Mt as oe, Nn as se, Nr as ce, Nt as le, Ot as j, Pn as ue, Pr as de, Qn as M, Qr as fe, Rn as pe, Rr as N, Rt as me, Sn as he, Sr as ge, St as _e, Tn as ve, Tr as P, Ur as ye, V as be, Vn as xe, Vr as Se, Vt as Ce, Wn as we, Wr as Te, Xn as Ee, Xr as De, Xt as Oe, Yn as F, Yt as ke, Zr as Ae, _n as je, _r as Me, _t as Ne, ai as Pe, an as Fe, ar as I, br as Ie, bt as Le, cr as Re, ct as ze, d as Be, dr as Ve, dt as He, ei as Ue, en as We, er as L, f as Ge, fr as Ke, ft as qe, g as Je, gn as Ye, gr as Xe, gt as Ze, hn as Qe, hr as $e, ht as et, i as tt, ii as nt, in as R, ir as z, it as rt, jn as it, jr as at, kn as ot, kr as st, kt as ct, lr as lt, lt as ut, mr as B, mt as dt, ni as V, nn as ft, nr as H, nt as pt, oi as U, ot as mt, pn as ht, pr as gt, pt as _t, qn as vt, qr as W, ri as G, rr as yt, rt as bt, sr as xt, st as St, ti as Ct, tn as wt, tr as K, u as Tt, un as Et, ur as Dt, ut as Ot, vn as kt, vr as At, vt as jt, wn as Mt, wr as q, xn as Nt, xr as J, xt as Pt, yn as Ft, yr as It, z as Lt, zn as Rt, zr as zt, zt as Bt } from "./NcActionRouter-Ca-mCYkz.chunk.mjs";
import { _ as Vt, c as Ht, d as Ut, f as Wt, g as Gt, h as Kt, l as qt, m as Jt, n as Yt, p as Xt, s as Zt, t as Qt, u as $t, v as en } from "./NcTextField-DCMWhriQ.chunk.mjs";
import { A as tn, C as nn, D as rn, E as an, F as on, I as sn, M as cn, N as ln, O as un, P as dn, S as fn, T as pn, _ as mn, b as hn, d as gn, f as _n, g as vn, h as yn, i as bn, j as xn, k as Sn, m as Cn, n as wn, p as Tn, r as En, t as Dn, v as On, w as kn, x as An, y as jn } from "./NcAvatar-BhvDOBni.chunk.mjs";
import { t as Mn } from "./formatDistance-DJicDYcW.chunk.mjs";
import { i as Nn } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { n as Pn, r as Fn, t as In } from "./match-BVhkiPqW.chunk.mjs";
import { a as Ln, c as Rn, i as zn, l as Bn, n as Vn, o as Hn, r as Un, s as Wn, t as Gn, u as Kn } from "./normalizeDates-GspJxgT4.chunk.mjs";
// node_modules/pinia/dist/pinia.js
var qn = typeof window < "u", Jn, Yn = (e) => Jn = e, Xn = Symbol();
function Zn(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Qn = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function $n(e, { autoBom: n = !1 } = {}) {
	return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function er(e, n, r) {
	let i = new XMLHttpRequest();
	i.open("GET", e), i.responseType = "blob", i.onload = function() {
		ar(i.response, n, r);
	}, i.onerror = function() {
		console.error("could not download file");
	}, i.send();
}
function tr(e) {
	let n = new XMLHttpRequest();
	n.open("HEAD", e, !1);
	try {
		n.send();
	} catch {}
	return n.status >= 200 && n.status <= 299;
}
function nr(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let n = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(n);
	}
}
var rr = typeof navigator == "object" ? navigator : { userAgent: "" }, ir = /Macintosh/.test(rr.userAgent) && /AppleWebKit/.test(rr.userAgent) && !/Safari/.test(rr.userAgent), ar = qn ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ir ? or : "msSaveOrOpenBlob" in rr ? sr : cr : () => {};
function or(e, n = "download", r) {
	let i = document.createElement("a");
	i.download = n, i.rel = "noopener", typeof e == "string" ? (i.href = e, i.origin === location.origin ? nr(i) : tr(i.href) ? er(e, n, r) : (i.target = "_blank", nr(i))) : (i.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(i.href);
	}, 4e4), setTimeout(function() {
		nr(i);
	}, 0));
}
function sr(e, n = "download", r) {
	if (typeof e == "string") {
		if (tr(e)) er(e, n, r);
		else {
			let n = document.createElement("a");
			n.href = e, n.target = "_blank", setTimeout(function() {
				nr(n);
			});
		}
	} else navigator.msSaveOrOpenBlob($n(e, r), n);
}
function cr(e, n, r, i) {
	if (i ||= open("", "_blank"), i && (i.document.title = i.document.body.innerText = "downloading..."), typeof e == "string") return er(e, n, r);
	let a = e.type === "application/octet-stream", o = /constructor/i.test(String(Qn.HTMLElement)) || "safari" in Qn, s = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((s || a && o || ir) && typeof FileReader < "u") {
		let n = new FileReader();
		n.onloadend = function() {
			let e = n.result;
			if (typeof e != "string") throw i = null, Error("Wrong reader.result type");
			e = s ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), i ? i.location.href = e : location.assign(e), i = null;
		}, n.readAsDataURL(e);
	} else {
		let n = URL.createObjectURL(e);
		i ? i.location.assign(n) : location.href = n, i = null, setTimeout(function() {
			URL.revokeObjectURL(n);
		}, 4e4);
	}
}
var { assign: lr } = Object;
function ur() {
	let e = zt(!0), n = e.run(() => W({})), r = [], i = [], a = Te({
		install(e) {
			Yn(a), a._a = e, e.provide(Xn, a), e.config.globalProperties.$pinia = a, i.forEach((e) => r.push(e)), i = [];
		},
		use(e) {
			return this._a ? r.push(e) : i.push(e), this;
		},
		_p: r,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: n
	});
	return a;
}
var dr = () => {};
function fr(e, n, r, i = dr) {
	e.add(n);
	let a = () => {
		e.delete(n) && i();
	};
	return !r && c() && b(a), a;
}
function pr(e, ...n) {
	e.forEach((e) => {
		e(...n);
	});
}
var mr = (e) => e(), hr = Symbol(), gr = Symbol();
function _r(e, n) {
	e instanceof Map && n instanceof Map ? n.forEach((n, r) => e.set(r, n)) : e instanceof Set && n instanceof Set && n.forEach(e.add, e);
	for (let r in n) {
		if (!Object.hasOwn(n, r)) continue;
		let i = n[r], a = e[r];
		if (Zn(a) && Zn(i) && Object.hasOwn(e, r) && !C(i) && !Se(i)) {
			e[r] = _r(a, i);
			let n = Ae(e)[r];
			C(n) && ye(n) && Ct(n);
		} else e[r] = i;
	}
	return e;
}
var vr = Symbol();
function yr(e) {
	return !e || typeof e != "object" || !Object.hasOwn(e, vr);
}
var { assign: br } = Object;
function xr(e) {
	return !!(C(e) && e.effect);
}
function Sr(e, n, i, a) {
	let { state: o, actions: s, getters: c } = n, l = i.state.value[e], u;
	function d() {
		return l || 
		/* istanbul ignore if */
		(i.state.value[e] = o ? o() : {}), br(r(i.state.value[e]), s, Object.keys(c || {}).reduce((n, r) => (n[r] = Te(M(() => {
			Yn(i);
			let n = i._s.get(e);
			return c[r].call(n, n);
		})), n), {}));
	}
	return u = Cr(e, d, n, i, a, !0), u;
}
function Cr(e, n, r = {}, i, a, o) {
	let s, c = br({ actions: {} }, r), l = { deep: !0 }, u, d, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m, h = i.state.value[e];
	!o && !h && 
	/* istanbul ignore if */
	(i.state.value[e] = {});
	let g;
	function _(n) {
		let r;
		u = d = !1, typeof n == "function" ? (n(i.state.value[e]), r = {
			type: "patch function",
			storeId: e,
			events: m
		}) : (_r(i.state.value[e], n), r = {
			type: "patch object",
			payload: n,
			storeId: e,
			events: m
		});
		let a = g = Symbol();
		$e().then(() => {
			g === a && (u = !0);
		}), d = !0, pr(f, r, i.state.value[e]);
	}
	let y = o ? function() {
		let { state: e } = r, n = e ? e() : {};
		this.$patch((e) => {
			br(e, n);
		});
	} : dr;
	function b() {
		s.stop(), f.clear(), p.clear(), i._s.delete(e);
	}
	let x = (n, r = "") => {
		if (hr in n) return n[gr] = r, n;
		let a = function() {
			Yn(i);
			let r = Array.from(arguments), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
			function c(e) {
				o.add(e);
			}
			function l(e) {
				s.add(e);
			}
			pr(p, {
				args: r,
				name: a[gr],
				store: w,
				after: c,
				onError: l
			});
			let u;
			try {
				u = n.apply(this && this.$id === e ? this : w, r);
			} catch (e) {
				throw pr(s, e), e;
			}
			return u instanceof Promise ? u.then((e) => (pr(o, e), e)).catch((e) => (pr(s, e), Promise.reject(e))) : (pr(o, u), u);
		};
		return a[hr] = !0, a[gr] = r, a;
	}, S = {
		_p: i,
		$id: e,
		$onAction: fr.bind(null, p),
		$patch: _,
		$reset: y,
		$subscribe(n, r = {}) {
			if (f.has(n)) return dr;
			let a = fr(f, n, r.detached, () => o()), o = s.run(() => v(() => i.state.value[e], (i) => {
				(r.flush === "sync" ? d : u) && n({
					storeId: e,
					type: "direct",
					events: m
				}, i);
			}, br({}, l, r)));
			return a;
		},
		$dispose: b
	}, w = ee(S);
	i._s.set(e, w);
	let T = (i._a && i._a.runWithContext || mr)(() => i._e.run(() => (s = zt()).run(() => n({ action: x }))));
	for (let n in T) {
		let r = T[n];
		C(r) && !xr(r) || Se(r) ? o || (h && yr(r) && (C(r) ? r.value = h[n] : ((r instanceof Set || r instanceof Map) && r.clear(), _r(r, h[n]))), i.state.value[e][n] = r) : typeof r == "function" && (T[n] = x(r, n), c.actions[n] = r);
	}
	return br(w, T), br(Ae(w), T), Object.defineProperty(w, "$state", {
		get: () => i.state.value[e],
		set: (e) => {
			_((n) => {
				br(n, e);
			});
		}
	}), i._p.forEach((e) => {
		let n = s.run(() => e({
			store: w,
			app: i._a,
			pinia: i,
			options: c
		}));
		br(w, n);
	}), h && o && r.hydrate && r.hydrate(w.$state, h), u = !0, d = !0, w;
}
function wr(e, n, r) {
	let i, a = typeof n == "function";
	i = a ? r : n;
	function o(r, o) {
		let s = Ve();
		return r ||= s ? Ke(Xn, null) : null, r && Yn(r), r = Jn, r._s.has(e) || (a ? Cr(e, n, i, r) : Sr(e, i, r)), r._s.get(e);
	}
	return o.$id = e, o;
}
function Tr(e, n) {
	return Array.isArray(n) ? n.reduce((n, r) => (n[r] = function() {
		return e(this.$pinia)[r];
	}, n), {}) : Object.keys(n).reduce((r, i) => (r[i] = function() {
		let r = e(this.$pinia), a = n[i];
		return typeof a == "function" ? a.call(this, r) : r[a];
	}, r), {});
}
function Er(e, n) {
	return Array.isArray(n) ? n.reduce((n, r) => (n[r] = function(...n) {
		return e(this.$pinia)[r](...n);
	}, n), {}) : Object.keys(n).reduce((r, i) => (r[i] = function(...r) {
		return e(this.$pinia)[n[i]](...r);
	}, r), {});
}
// node_modules/vue-router/dist/vue-router.js
function Dr(e, n) {
	let { pathname: r, search: i, hash: a } = n, o = e.indexOf("#");
	if (o > -1) {
		let n = a.includes(e.slice(o)) ? e.slice(o).length : 1, r = a.slice(n);
		return r[0] !== "/" && (r = "/" + r), on(r, "");
	}
	return on(r, e) + i + a;
}
function Or(e, n, r, i) {
	let a = [], o = [], s = null, c = ({ state: o }) => {
		let c = Dr(e, location), l = r.value, u = n.value, d = 0;
		if (o) {
			if (r.value = c, n.value = o, s && s === l) {
				s = null;
				return;
			}
			d = u ? o.position - u.position : 0;
		} else i(c);
		a.forEach((e) => {
			e(r.value, l, {
				delta: d,
				type: "pop",
				direction: d ? d > 0 ? "forward" : "back" : ""
			});
		});
	};
	function l() {
		s = r.value;
	}
	function u(e) {
		a.push(e);
		let n = () => {
			let n = a.indexOf(e);
			n > -1 && a.splice(n, 1);
		};
		return o.push(n), n;
	}
	function d() {
		xn(r.value);
	}
	function f() {
		for (let e of o) e();
		o = [], window.removeEventListener("popstate", c), window.removeEventListener("pagehide", d);
	}
	return window.addEventListener("popstate", c), window.addEventListener("pagehide", d), {
		pauseListeners: l,
		listen: u,
		destroy: f
	};
}
function kr(e, n, r, i = !1) {
	return {
		back: e,
		current: n,
		forward: r,
		replaced: i,
		position: window.history.length
	};
}
function Ar(e) {
	let { history: n, location: r } = window, i = { value: Dr(e, r) }, a = { value: n.state };
	a.value || o(i.value, {
		back: null,
		current: i.value,
		forward: null,
		position: n.length - 1,
		replaced: !0
	}, !0);
	function o(i, o, s) {
		let c = e.indexOf("#"), l = c > -1 ? (r.host && document.querySelector("base") ? e : e.slice(c)) + i : "/." + e + i;
		try {
			n[s ? "replaceState" : "pushState"](o, "", l), a.value = o;
		} catch (e) {
			console.error(e), r[s ? "replace" : "assign"](l);
		}
	}
	function s(e, r) {
		let s = he({}, n.state, kr(a.value.back, e, a.value.forward, !0), r, { position: a.value.position });
		o(e, s, !0), fn(s.position, !0), i.value = e;
	}
	function c(e, r) {
		let s = he({}, a.value, n.state, { forward: e });
		o(s.current, s, !0), fn(s.position), xn(s.current), o(e, he({}, kr(i.value, e, null), { position: s.position + 1 }, r), !1), i.value = e;
	}
	return {
		location: i,
		state: a,
		push: c,
		replace: s
	};
}
function jr(e) {
	e = rn(e);
	let n = Ar(e), r = Or(e, n.state, n.location, n.replace);
	function i(e, n = !0) {
		n || r.pauseListeners(), history.go(e);
	}
	let a = he({
		location: "",
		base: e,
		go: i,
		createHref: Tn.bind(null, e)
	}, n, r);
	return Object.defineProperty(a, "location", {
		enumerable: !0,
		get: () => n.location.value
	}), Object.defineProperty(a, "state", {
		enumerable: !0,
		get: () => n.state.value
	}), a;
}
function Mr(e) {
	return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), jr(e);
}
var Nr = {
	type: 0,
	value: ""
}, Pr = /[a-zA-Z0-9_]/;
function Fr(e) {
	if (!e) return [[]];
	if (e === "/") return [[Nr]];
	if (!Mt(e)) throw Error(`Invalid path "${e}"`);
	function n(e) {
		throw Error(`ERR (${r})/"${u}": ${e}`);
	}
	let r = 0, i = r, a = [], o;
	function s() {
		o && a.push(o), o = [];
	}
	let c = 0, l, u = "", d = "";
	function f() {
		u &&= (r === 0 ? o.push({
			type: 0,
			value: u
		}) : r === 1 || r === 2 || r === 3 ? (o.length > 1 && (l === "*" || l === "+") && n(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), o.push({
			type: 1,
			value: u,
			regexp: d,
			repeatable: l === "*" || l === "+",
			optional: l === "*" || l === "?"
		})) : n("Invalid state to consume buffer"), "");
	}
	function p() {
		u += l;
	}
	for (; c < e.length;) switch (l = e[c++], r) {
		case 0:
			l === "\\" ? (i = r, r = 4) : l === "/" ? (u && f(), s()) : l === ":" ? (f(), r = 1) : p();
			break;
		case 4:
			p(), r = i;
			break;
		case 1:
			l === "(" ? r = 2 : Pr.test(l) ? p() : (f(), r = 0, l !== "*" && l !== "?" && l !== "+" && c--);
			break;
		case 2:
			l === ")" ? d[d.length - 1] == "\\" ? d = d.slice(0, -1) + l : r = 3 : d += l;
			break;
		case 3:
			f(), r = 0, l !== "*" && l !== "?" && l !== "+" && c--, d = "";
			break;
		default: n("Unknown state");
	}
	return r === 2 && n(`Unfinished custom RegExp for param "${u}"`), f(), s(), a;
}
var Ir = "[^/]+?", Lr = {
	sensitive: !1,
	strict: !1,
	start: !0,
	end: !0
}, Rr = /[.+*?^${}()[\]/\\|]/g;
function zr(e, n) {
	let r = he({}, Lr, n), i = [], a = r.start ? "^" : "", o = [], s = e.some((e) => e.some((e) => e.type === 1 && /\\[1-9k]/.test(e.regexp || "")));
	for (let n of e) {
		let e = n.length ? [] : [90];
		r.strict && !n.length && (a += "/");
		for (let i = 0; i < n.length; i++) {
			let c = n[i], l = 40 + (r.sensitive ? .25 : 0);
			if (c.type === 0) i || (a += "/"), a += c.value.replace(Rr, "\\$&"), l += 40;
			else if (c.type === 1) {
				let { value: e, repeatable: r, optional: u, regexp: d } = c;
				o.push({
					name: e,
					repeatable: r,
					optional: u
				});
				let f = d || Ir;
				if (f !== Ir) {
					l += 10;
					try {
						RegExp(`(${f})`);
					} catch (n) {
						throw Error(`Invalid custom RegExp for param "${e}" (${f}): ` + n.message);
					}
				}
				let p = r && f !== ".+" && f !== ".*" ? `((?:${f})(?:/(?:${f}))*)` : `(${f})`, m = n[i + 1], h = n[i + 2];
				s || d || r || !h || h.type !== 1 || h.regexp || m.type !== 0 || (p = `([^/](?:(?!${m.value.replace(Rr, "\\$&")})[^/])*)`), i || (p = u && n.length < 2 ? `(?:/${p})` : "/" + p), u && (p += "?"), a += p, l += 20, u && (l += -8), r && (l += -20), f === ".*" && (l += -50);
			}
			e.push(l);
		}
		i.push(e);
	}
	if (r.strict && r.end) {
		let e = i.length - 1;
		i[e][i[e].length - 1] += .7000000000000001;
	}
	r.strict || (a += "/?"), r.end ? a += "$" : r.strict && !a.endsWith("/") && (a += "(?:/|$)");
	let c = new RegExp(a, r.sensitive ? "" : "i");
	function l(e) {
		let n = e.match(c), r = {};
		if (!n) return null;
		for (let e = 1; e < n.length; e++) {
			let i = n[e] || "", a = o[e - 1];
			r[a.name] = i && a.repeatable ? i.split("/") : i;
		}
		return r;
	}
	function u(n) {
		let r = "", i = !1;
		for (let a of e) {
			i && r.endsWith("/") || (r += "/"), i = !1;
			for (let e of a) if (e.type === 0) r += e.value;
			else if (e.type === 1) {
				let { value: o, repeatable: s, optional: c } = e, l = o in n ? n[o] : "";
				if (ve(l) && !s) throw Error(`Provided param "${o}" is an array but it is not repeatable (* or + modifiers)`);
				let u = ve(l) ? l.join("/") : l;
				if (!u) {
					if (c) a.length < 2 && (r.endsWith("/") ? r = r.slice(0, -1) : i = !0);
					else throw Error(`Missing required param "${o}"`);
				}
				r += u;
			}
		}
		return r || "/";
	}
	return {
		re: c,
		score: i,
		keys: o,
		parse: l,
		stringify: u
	};
}
function Br(e, n) {
	let r = 0;
	for (; r < e.length && r < n.length;) {
		let i = n[r] - e[r];
		if (i) return i;
		r++;
	}
	return e.length < n.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > n.length ? n.length === 1 && n[0] === 80 ? 1 : -1 : 0;
}
function Vr(e, n) {
	let r = 0, i = e.score, a = n.score;
	for (; r < i.length && r < a.length;) {
		let e = Br(i[r], a[r]);
		if (e) return e;
		r++;
	}
	if (Math.abs(a.length - i.length) === 1) {
		if (Hr(i)) return 1;
		if (Hr(a)) return -1;
	}
	return a.length - i.length;
}
function Hr(e) {
	let n = e[e.length - 1];
	return e.length > 0 && n[n.length - 1] < 0;
}
var Ur = {
	strict: !1,
	end: !0,
	sensitive: !1
};
function Wr(e, n, r) {
	let i = zr(Fr(e.path), r), a = he(i, {
		record: e,
		parent: n,
		children: [],
		alias: []
	});
	return n && !a.record.aliasOf == !n.record.aliasOf && n.children.push(a), a;
}
function Gr(e, n) {
	let r = [], i = /* @__PURE__ */ new Map();
	n = a(Ur, n);
	function o(e) {
		return i.get(e);
	}
	function s(e, r, i) {
		let o = !i, l = qr(e);
		l.aliasOf = i && i.record;
		let u = a(n, e), f = [l];
		if ("alias" in e) {
			let n = typeof e.alias == "string" ? [e.alias] : e.alias;
			for (let e of n) f.push(qr(he({}, l, {
				components: i ? i.record.components : l.components,
				path: e,
				aliasOf: i ? i.record : l
			})));
		}
		let p, m;
		for (let n of f) {
			let { path: a } = n;
			if (r && !Mt(a)) {
				let e = r.record.path, i = e[e.length - 1] === "/" ? "" : "/";
				n.path = r.record.path + (a && i + a);
			}
			if (p = Wr(n, r, u), i ? i.alias.push(p) : (m ||= p, m !== p && m.alias.push(p), o && e.name && !Yr(p) && c(e.name)), $r(p) && d(p), l.children) {
				let e = l.children;
				for (let n = 0; n < e.length; n++) s(e[n], p, i && i.children[n]);
			}
			i ||= p;
		}
		return m ? () => {
			c(m);
		} : it;
	}
	function c(e) {
		if (kn(e)) {
			let n = i.get(e);
			n && (i.delete(e), r.splice(r.indexOf(n), 1), n.children.forEach(c), n.alias.forEach(c));
		} else {
			let n = r.indexOf(e);
			n > -1 && (r.splice(n, 1), e.record.name && i.delete(e.record.name), e.children.forEach(c), e.alias.forEach(c));
		}
	}
	function u() {
		return r;
	}
	function d(e) {
		let n = Zr(e, r);
		r.splice(n, 0, e), e.record.name && !Yr(e) && i.set(e.record.name, e);
	}
	function f(e, n) {
		let a, o = {}, s, c;
		if ("name" in e && e.name) {
			if (a = i.get(e.name), !a) throw l(1, { location: e });
			c = a.record.name, o = he(Kr(n.params, a.keys.filter((e) => !e.optional).concat(a.parent ? a.parent.keys.filter((e) => e.optional) : []).map((e) => e.name)), e.params && Kr(e.params, a.keys.map((e) => e.name))), s = a.stringify(o);
		} else if (e.path != null) s = e.path, a = r.find((e) => e.re.test(s)), a && (o = a.parse(s), c = a.record.name, a.keys.forEach((e) => {
			e.optional && !o[e.name] && delete o[e.name];
		}));
		else {
			if (a = n.name ? i.get(n.name) : r.find((e) => e.re.test(n.path)), !a) throw l(1, {
				location: e,
				currentLocation: n
			});
			c = a.record.name, o = he({}, n.params, e.params), s = a.stringify(o);
		}
		let u = [], d = a;
		for (; d;) u.unshift(d.record), d = d.parent;
		return {
			name: c,
			path: s,
			params: o,
			matched: u,
			meta: Xr(u)
		};
	}
	e.forEach((e) => s(e));
	function p() {
		r.length = 0, i.clear();
	}
	return {
		addRoute: s,
		resolve: f,
		removeRoute: c,
		clearRoutes: p,
		getRoutes: u,
		getRecordMatcher: o
	};
}
function Kr(e, n) {
	let r = {};
	for (let i of n) i in e && (r[i] = e[i]);
	return r;
}
function qr(e) {
	let n = {
		path: e.path,
		redirect: e.redirect,
		name: e.name,
		meta: e.meta || {},
		aliasOf: e.aliasOf,
		beforeEnter: e.beforeEnter,
		props: Jr(e),
		children: e.children || [],
		instances: {},
		leaveGuards: /* @__PURE__ */ new Set(),
		updateGuards: /* @__PURE__ */ new Set(),
		enterCallbacks: {},
		components: "components" in e ? e.components || null : e.component && { default: e.component }
	};
	return Object.defineProperty(n, "mods", { value: {} }), n;
}
function Jr(e) {
	let n = {}, r = e.props || !1;
	if ("component" in e) n.default = r;
	else for (let i in e.components) n[i] = typeof r == "object" ? r[i] : r;
	return n;
}
function Yr(e) {
	for (; e;) {
		if (e.record.aliasOf) return !0;
		e = e.parent;
	}
	return !1;
}
function Xr(e) {
	return e.reduce((e, n) => he(e, n.meta), {});
}
function Zr(e, n) {
	let r = 0, i = n.length;
	for (; r !== i;) {
		let a = r + i >> 1;
		Vr(e, n[a]) < 0 ? i = a : r = a + 1;
	}
	let a = Qr(e);
	return a && (i = n.lastIndexOf(a, i - 1)), i;
}
function Qr(e) {
	let n = e;
	for (; n = n.parent;) if ($r(n) && Vr(e, n) === 0) return n;
}
function $r({ record: e }) {
	return !!(e.name || e.components && Object.keys(e.components).length || e.redirect);
}
var ei = /*#__PURE__*/ xt({
	name: "RouterView",
	inheritAttrs: !1,
	props: {
		name: {
			type: String,
			default: "default"
		},
		route: Object
	},
	compatConfig: { MODE: 3 },
	setup(e, { attrs: n, slots: r }) {
		let i = Ke(ue), a = M(() => e.route || i.value), o = Ke(w, 0), s = M(() => {
			let e = V(o), { matched: n } = a.value, r;
			for (; (r = n[e]) && !r.components;) e++;
			return e;
		}), c = M(() => a.value.matched[s.value]);
		ge(w, M(() => s.value + 1)), ge(ot, c), ge(ue, a), ge(ie, Cn(a));
		let l = /* @__PURE__ */ new Set();
		ge(_, l);
		let u = W(), d = _n, { app: f } = Re().appContext;
		return v(() => [
			u.value,
			c.value,
			e.name
		], ([e, n, r], [i, a, o]) => {
			n && (n.instances[r] = e, a && a !== n && e && e === i && (n.leaveGuards.size || (n.leaveGuards = a.leaveGuards), n.updateGuards.size || (n.updateGuards = a.updateGuards))), !e || !n || a && an(n, a) && i || (n.enterCallbacks[r] || []).forEach((n) => n(e));
		}, { flush: "post" }), () => {
			let i = a.value, o = e.name, s = c.value, p = s && s.components[o];
			if (!p) return ti(r.default, {
				Component: p,
				route: i
			});
			let m = s.props[o], h = m ? m === !0 ? i.params : typeof m == "function" ? m(i) : m : null, g = (e) => {
				e.component.isUnmounted && (s.instances[o] = null);
			}, _ = (e) => $e(() => {
				for (; !e.el && e.component;) e = e.component.subTree;
				if (d === i || a.value !== i || e.el?.getRootNode() !== f._container.getRootNode()) return;
				let n = d;
				d = i;
				for (let e of l) e(i, n);
			}), v = Dt(p, he({}, h, n, {
				onVnodeUnmounted: g,
				onVnodeMounted: _,
				onVnodeUpdated: _,
				ref: u
			}));
			return ti(r.default, {
				Component: v,
				route: i
			}) || v;
		};
	}
});
function ti(e, n) {
	if (!e) return null;
	let r = e(n);
	return r.length === 1 ? r[0] : r;
}
var ni = ei;
function ri(e) {
	let n = e.matcher || Gr(e.routes, e), r = e.parseQuery || Sn, i = e.stringifyQuery || ln, a = e.history, o = sn(), s = sn(), c = sn(), u = De(_n), d = De(0), p = _n;
	nn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
	let m = Nt.bind(null, (e) => "" + e), h = Nt.bind(null, mn), g = Nt.bind(null, yn);
	function _(e, r) {
		let i, a;
		kn(e) ? (i = n.getRecordMatcher(e), a = r) : a = e;
		let o = n.addRoute(a, i);
		return d.value++, () => {
			o(), d.value++;
		};
	}
	function v(e) {
		let r = n.getRecordMatcher(e);
		r && (n.removeRoute(r), d.value++);
	}
	function y() {
		n.clearRoutes(), d.value++;
	}
	function b() {
		return n.getRoutes().map((e) => e.record);
	}
	function x(e) {
		return !!n.getRecordMatcher(e);
	}
	function S(e, o) {
		if (d.value, typeof e == "string") {
			o ||= e.startsWith("/") ? _n : u.value;
			let i = tn(r, e, o.path), s = n.resolve({ path: i.path }, o), c = a.createHref(i.fullPath);
			return he(i, s, {
				params: g(s.params),
				redirectedFrom: void 0,
				href: c
			});
		}
		o = he({}, o || (e.path != null && e.path.startsWith("/") && !("name" in e && e.name) ? _n : u.value));
		let s;
		if (e.path != null) s = he({}, e, { path: tn(r, e.path, o.path).path });
		else {
			let n = he({}, e.params);
			for (let e in n) n[e] ?? delete n[e];
			s = he({}, e, { params: h(n) }), o.params = h(o.params);
		}
		let c = n.resolve(s, o), l = e.hash || "";
		c.params = m(g(c.params));
		let f = dn(i, he({}, e, {
			hash: vn(l),
			path: c.path
		})), p = a.createHref(f);
		return he({
			fullPath: f,
			hash: l,
			query: i === ln ? un(e.query) : e.query || {}
		}, c, {
			redirectedFrom: void 0,
			href: p
		});
	}
	function C(e) {
		return typeof e == "string" ? tn(r, e, u.value.path) : he({}, e);
	}
	function w(e, n) {
		if (p !== e) return l(8, {
			from: n,
			to: e
		});
	}
	function T(e) {
		return O(e);
	}
	function E(e) {
		return T(he(C(e), { replace: !0 }));
	}
	function D(e, n) {
		let r = e.matched[e.matched.length - 1];
		if (r && r.redirect) {
			let { redirect: i } = r, a = typeof i == "function" ? i(e, n) : i;
			return typeof a == "string" && (a = a.includes("?") || a.includes("#") ? a = C(a) : { path: a }, a.params = {}), he({
				query: e.query,
				hash: e.hash,
				params: a.path == null ? e.params : {}
			}, a);
		}
	}
	function O(e, n) {
		let r = p = S(e), a = u.value, o = e.state, s = e.force, c = e.replace === !0, d = D(r, a);
		if (d) return O(he(C(d), {
			state: typeof d == "object" ? he({}, o, d.state) : o,
			force: s,
			replace: c
		}), n || r);
		let m = r;
		m.redirectedFrom = n;
		let h;
		return !s && pn(i, a, r) && (h = l(16, {
			to: m,
			from: a
		}), fe(a, a)), (h ? Promise.resolve(h) : te(m, a)).catch((e) => f(e) ? f(e, 2) ? e : M(e) : j(e, m, a)).then((e) => {
			if (e) {
				if (f(e, 2)) return O(he({ replace: c }, C(e.to), {
					state: typeof e.to == "object" ? he({}, o, e.to.state) : o,
					force: s
				}), n || m);
			} else e = re(m, a, !0, c, o);
			return ne(m, a, e), e;
		});
	}
	function k(e, n) {
		let r = w(e, n);
		return r ? Promise.reject(r) : Promise.resolve();
	}
	function ee(e) {
		let n = me.values().next().value;
		return n && typeof n.runWithContext == "function" ? n.runWithContext(e) : e();
	}
	function te(e, n) {
		let r, [i, a, c] = On(e, n);
		r = jn(i.reverse(), "beforeRouteLeave", e, n);
		for (let a of i) a.leaveGuards.forEach((i) => {
			r.push(An(i, e, n));
		});
		let l = k.bind(null, e, n);
		return r.push(l), _e(r).then(() => {
			r = [];
			for (let i of o.list()) r.push(An(i, e, n));
			return r.push(l), _e(r);
		}).then(() => {
			r = jn(a, "beforeRouteUpdate", e, n);
			for (let i of a) i.updateGuards.forEach((i) => {
				r.push(An(i, e, n));
			});
			return r.push(l), _e(r);
		}).then(() => {
			r = [];
			for (let i of c) if (i.beforeEnter) {
				if (ve(i.beforeEnter)) for (let a of i.beforeEnter) r.push(An(a, e, n));
				else r.push(An(i.beforeEnter, e, n));
			}
			return r.push(l), _e(r);
		}).then(() => (e.matched.forEach((e) => e.enterCallbacks = {}), r = jn(c, "beforeRouteEnter", e, n, ee), r.push(l), _e(r))).then(() => {
			r = [];
			for (let i of s.list()) r.push(An(i, e, n));
			return r.push(l), _e(r);
		}).catch((e) => f(e, 8) ? e : Promise.reject(e));
	}
	function ne(e, n, r) {
		c.list().forEach((i) => ee(() => i(e, n, r)));
	}
	function re(e, n, r, i, o) {
		let s = w(e, n);
		if (s) return s;
		let c = n === _n, l = nn && (c || !r) && hn(e.fullPath);
		r && (i || c ? a.replace(e.fullPath, o) : a.push(e.fullPath, o)), u.value = e, fe(e, n, l), M();
	}
	let A;
	function ae() {
		A ||= a.listen((e, n, r) => {
			if (!ge.listening) return;
			let i = S(e), o = D(i, ge.currentRoute.value);
			if (o) {
				O(he(o, {
					replace: !0,
					force: !0
				}), i).catch(it);
				return;
			}
			p = i;
			let s = u.value;
			nn && r.delta && xn(s.fullPath, r.delta), te(i, s).catch((e) => f(e, 12) ? e : f(e, 2) ? (O(he(C(e.to), { force: !0 }), i).then((e) => {
				f(e, 20) && !r.delta && r.type === "pop" && a.go(-1, !1);
			}).catch(it), Promise.reject()) : (r.delta && a.go(-r.delta, !1), j(e, i, s))).then((e) => {
				e ||= re(i, s, !1), e && (r.delta && !f(e, 8) ? a.go(-r.delta, !1) : r.type === "pop" && f(e, 20) && a.go(-1, !1)), ne(i, s, e);
			}).catch(it);
		});
	}
	let oe = sn(), ce = sn(), le;
	function j(e, n, r) {
		M(e);
		let i = ce.list();
		return i.length ? i.forEach((i) => i(e, n, r)) : console.error(e), Promise.reject(e);
	}
	function de() {
		return le && u.value !== _n ? Promise.resolve() : new Promise((e, n) => {
			oe.add([e, n]);
		});
	}
	function M(e) {
		return le || (le = !e, ae(), oe.list().forEach(([n, r]) => e ? r(e) : n()), oe.reset()), e;
	}
	function fe(n, r, i) {
		let { scrollBehavior: a } = e;
		return !nn || !a ? Promise.resolve() : $e().then(() => a(n, r, i || null)).then((e) => n === u.value && e && cn(e)).catch((e) => n === u.value && j(e, n, r));
	}
	let pe = (e) => a.go(e), N, me = /* @__PURE__ */ new Set(), ge = {
		currentRoute: u,
		listening: !0,
		addRoute: _,
		removeRoute: v,
		clearRoutes: y,
		hasRoute: x,
		getRoutes: b,
		resolve: S,
		options: e,
		push: T,
		replace: E,
		go: pe,
		back: () => pe(-1),
		forward: () => pe(1),
		beforeEach: o.add,
		beforeResolve: s.add,
		afterEach: c.add,
		onError: ce.add,
		isReady: de,
		install(e) {
			e.component("RouterLink", gn), e.component("RouterView", ni), e.config.globalProperties.$router = ge, Object.defineProperty(e.config.globalProperties, "$route", {
				enumerable: !0,
				get: () => V(u)
			}), nn && !N && u.value === _n && (N = !0, T(a.location).catch((e) => {})), e.provide(se, ge), e.provide(ie, Cn(u)), e.provide(ue, u);
			let n = e.unmount;
			me.add(e), e.unmount = function() {
				me.delete(e), me.size < 1 && (p = _n, A && A(), A = null, u.value = _n, N = !1, le = !1), n();
			};
		}
	};
	function _e(e) {
		return e.reduce((e, n) => e.then(() => ee(n)), Promise.resolve());
	}
	return ge;
}
// node_modules/@nextcloud/vue/dist/chunks/constants2.mjs
var ii = /* @__PURE__ */ Symbol.for("NcContent:setHasAppNavigation"), ai = /* @__PURE__ */ Symbol.for("NcContent:selector");
// node_modules/@nextcloud/vue/dist/chunks/NcContent.mjs
m(te);
var oi = "<!--\n  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors\n  - SPDX-License-Identifier: AGPL-3.0-or-later\n-->\n<svg width=\"395\" height=\"314\" viewBox=\"0 0 395 314\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"395\" height=\"314\" rx=\"11\" fill=\"#439DCD\"/>\n<rect x=\"13\" y=\"51\" width=\"366\" height=\"248\" rx=\"8\" fill=\"white\"/>\n<rect x=\"22\" y=\"111\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"127\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"63\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"191\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"143\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"79\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"159\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"95\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"175\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<path d=\"M288 145C277.56 147.8 265.32 149 254 149C242.68 149 230.44 147.8 220 145L218 153C225.44 155 234 156.32 242 157V209H250V185H258V209H266V157C274 156.32 282.56 155 290 153L288 145ZM254 145C258.4 145 262 141.4 262 137C262 132.6 258.4 129 254 129C249.6 129 246 132.6 246 137C246 141.4 249.6 145 254 145Z\" fill=\"#DEDEDE\"/>\n<path d=\"M43.5358 13C38.6641 13 34.535 16.2415 33.2552 20.6333C32.143 18.3038 29.7327 16.6718 26.9564 16.6718C23.1385 16.6718 20 19.7521 20 23.4993C20 27.2465 23.1385 30.3282 26.9564 30.3282C29.7327 30.3282 32.1429 28.6952 33.2552 26.3653C34.535 30.7575 38.6641 34 43.5358 34C48.3715 34 52.4796 30.8064 53.7921 26.4637C54.9249 28.7407 57.3053 30.3282 60.0421 30.3282C63.8601 30.3282 67 27.2465 67 23.4993C67 19.7521 63.8601 16.6718 60.0421 16.6718C57.3053 16.6718 54.9249 18.2583 53.7921 20.5349C52.4796 16.1926 48.3715 13 43.5358 13ZM43.5358 17.0079C47.2134 17.0079 50.1512 19.8899 50.1512 23.4993C50.1512 27.1087 47.2134 29.9921 43.5358 29.9921C39.8583 29.9921 36.9218 27.1087 36.9218 23.4993C36.9218 19.8899 39.8583 17.0079 43.5358 17.0079ZM26.9564 20.6797C28.5677 20.6797 29.8307 21.9179 29.8307 23.4993C29.8307 25.0807 28.5677 26.3203 26.9564 26.3203C25.3452 26.3203 24.0836 25.0807 24.0836 23.4993C24.0836 21.9179 25.3452 20.6797 26.9564 20.6797ZM60.0421 20.6797C61.6534 20.6797 62.9164 21.9179 62.9164 23.4993C62.9164 25.0807 61.6534 26.3203 60.0421 26.3203C58.4309 26.3203 57.1693 25.0807 57.1693 23.4993C57.1693 21.9179 58.4309 20.6797 60.0421 20.6797Z\" fill=\"white\"/>\n<rect x=\"79\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"99\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"119\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"139\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"159\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"179\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 0C5.37258 0 0 5.37259 0 12V302C0 308.627 5.37259 314 12 314H383C389.627 314 395 308.627 395 302V12C395 5.37258 389.627 0 383 0H12ZM140 44C132.268 44 126 50.268 126 58V292C126 299.732 132.268 306 140 306H372C379.732 306 386 299.732 386 292V58C386 50.268 379.732 44 372 44H140Z\" fill=\"black\" fill-opacity=\"0.35\"/>\n</svg>\n", si = "<!--\n  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors\n  - SPDX-License-Identifier: AGPL-3.0-or-later\n-->\n<svg width=\"395\" height=\"314\" viewBox=\"0 0 395 314\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"395\" height=\"314\" rx=\"11\" fill=\"#439DCD\"/>\n<rect x=\"13\" y=\"51\" width=\"366\" height=\"248\" rx=\"8\" fill=\"white\"/>\n<rect x=\"22\" y=\"111\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"127\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"63\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"191\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"143\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"79\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"159\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"95\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<rect x=\"22\" y=\"175\" width=\"92\" height=\"12\" rx=\"6\" fill=\"#DEDEDE\"/>\n<path d=\"M288 145C277.56 147.8 265.32 149 254 149C242.68 149 230.44 147.8 220 145L218 153C225.44 155 234 156.32 242 157V209H250V185H258V209H266V157C274 156.32 282.56 155 290 153L288 145ZM254 145C258.4 145 262 141.4 262 137C262 132.6 258.4 129 254 129C249.6 129 246 132.6 246 137C246 141.4 249.6 145 254 145Z\" fill=\"#DEDEDE\"/>\n<path d=\"M43.5358 13C38.6641 13 34.535 16.2415 33.2552 20.6333C32.143 18.3038 29.7327 16.6718 26.9564 16.6718C23.1385 16.6718 20 19.7521 20 23.4993C20 27.2465 23.1385 30.3282 26.9564 30.3282C29.7327 30.3282 32.1429 28.6952 33.2552 26.3653C34.535 30.7575 38.6641 34 43.5358 34C48.3715 34 52.4796 30.8064 53.7921 26.4637C54.9249 28.7407 57.3053 30.3282 60.0421 30.3282C63.8601 30.3282 67 27.2465 67 23.4993C67 19.7521 63.8601 16.6718 60.0421 16.6718C57.3053 16.6718 54.9249 18.2583 53.7921 20.5349C52.4796 16.1926 48.3715 13 43.5358 13ZM43.5358 17.0079C47.2134 17.0079 50.1512 19.8899 50.1512 23.4993C50.1512 27.1087 47.2134 29.9921 43.5358 29.9921C39.8583 29.9921 36.9218 27.1087 36.9218 23.4993C36.9218 19.8899 39.8583 17.0079 43.5358 17.0079ZM26.9564 20.6797C28.5677 20.6797 29.8307 21.9179 29.8307 23.4993C29.8307 25.0807 28.5677 26.3203 26.9564 26.3203C25.3452 26.3203 24.0836 25.0807 24.0836 23.4993C24.0836 21.9179 25.3452 20.6797 26.9564 20.6797ZM60.0421 20.6797C61.6534 20.6797 62.9164 21.9179 62.9164 23.4993C62.9164 25.0807 61.6534 26.3203 60.0421 26.3203C58.4309 26.3203 57.1693 25.0807 57.1693 23.4993C57.1693 21.9179 58.4309 20.6797 60.0421 20.6797Z\" fill=\"white\"/>\n<rect x=\"79\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"99\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"119\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"139\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"159\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<rect x=\"179\" y=\"20\" width=\"8\" height=\"8\" rx=\"4\" fill=\"white\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 0C5.37258 0 0 5.37259 0 12V302C0 308.627 5.37259 314 12 314H383C389.627 314 395 308.627 395 302V12C395 5.37258 389.627 0 383 0H12ZM112 44C119.732 44 126 50.268 126 58V292C126 299.732 119.732 306 112 306H20C12.268 306 6 299.732 6 292V58C6 50.268 12.268 44 20 44H112Z\" fill=\"black\" fill-opacity=\"0.35\"/>\n</svg>\n", ci = { class: "vue-skip-actions__container" }, li = { class: "vue-skip-actions__headline" }, ui = { class: "vue-skip-actions__buttons" }, di = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcContent",
	props: { appName: {} },
	setup(e) {
		let r = e;
		ge(ii, l), ge(ai, "#content-vue"), ge("appName", M(() => r.appName));
		let i = ht(), a = W(!1), o = W(), s = M(() => o.value === "navigation" ? si : oi);
		Xe(() => {
			let e = document.getElementById("skip-actions");
			e && (e.innerHTML = "", e.classList.add("vue-skip-actions"));
		});
		function c() {
			re("toggle-navigation", { open: !0 }), $e(() => {
				window.location.hash = "app-navigation-vue", document.getElementById("app-navigation-vue").focus();
			});
		}
		function l(e) {
			a.value = e, o.value ||= "navigation";
		}
		return (r, l) => (J(), H("div", {
			id: "content-vue",
			class: G(["content", [`app-${e.appName.toLowerCase()}`, { "content--legacy": V(Ft) }]])
		}, [(J(), L(Ee, { to: "#skip-actions" }, [n("div", ci, [
			n("div", li, U(V(j)("Keyboard navigation help")), 1),
			n("div", ui, [N(I(Ye, {
				href: "#app-navigation-vue",
				variant: "tertiary",
				onClick: D(c, ["prevent"]),
				onFocusin: l[0] ||= (e) => o.value = "navigation",
				onMouseover: l[1] ||= (e) => o.value = "navigation"
			}, {
				default: A(() => [z(U(V(j)("Skip to app navigation")), 1)]),
				_: 1
			}, 512), [[k, a.value]]), I(Ye, {
				href: "#app-content-vue",
				variant: "tertiary",
				onFocusin: l[2] ||= (e) => o.value = "content",
				onMouseover: l[3] ||= (e) => o.value = "content"
			}, {
				default: A(() => [z(U(V(j)("Skip to main content")), 1)]),
				_: 1
			})]),
			N(I(Qe, {
				class: "vue-skip-actions__image",
				svg: s.value,
				size: "auto"
			}, null, 8, ["svg"]), [[k, !V(i)]])
		])])), q(r.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-d13dcb98"]]), fi = { name: "NcAppNavigationList" }, pi = { class: "app-navigation-list" };
function mi(e, n, r, i, a, o) {
	return J(), H("ul", pi, [q(e.$slots, "default", {}, void 0, !0)]);
}
var hi = /* @__PURE__ */ je(fi, [["render", mi], ["__scopeId", "data-v-d72957ed"]]);
// node_modules/@nextcloud/vue/dist/chunks/NcAppNavigation.mjs
m(me);
var gi = { class: "app-navigation-toggle-wrapper" }, _i = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcAppNavigationToggle",
	props: {
		open: {
			type: Boolean,
			required: !0
		},
		openModifiers: {}
	},
	emits: ["update:open"],
	setup(e) {
		let n = at(e, "open"), r = M(() => n.value ? j("Close navigation") : j("Open navigation"));
		return (e, i) => (J(), H("div", gi, [I(V(Ye), {
			class: "app-navigation-toggle",
			"aria-controls": "app-navigation-vue",
			"aria-expanded": n.value ? "true" : "false",
			"aria-label": r.value,
			title: r.value,
			variant: "tertiary",
			onClick: i[0] ||= (e) => n.value = !n.value
		}, {
			icon: A(() => [I(Qe, {
				path: V(Le),
				directional: ""
			}, null, 8, ["path"])]),
			_: 1
		}, 8, [
			"aria-expanded",
			"aria-label",
			"title"
		])]));
	}
}), [["__scopeId", "data-v-e8177cc7"]]), vi = [
	"aria-hidden",
	"aria-label",
	"aria-labelledby",
	"inert"
], yi = { class: "app-navigation__search" }, bi = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcAppNavigation",
	props: {
		ariaLabel: {},
		ariaLabelledby: {}
	},
	setup(e) {
		let r = e, i, a = Ke(ii, () => de("NcAppNavigation is not mounted inside NcContent, this is probably an error."), !1), o = ce("appNavigationContainer"), s = ht(), c = W(!s.value), l = M(() => s.value && c.value);
		T(() => {
			!r.ariaLabel && !r.ariaLabelledby && de("NcAppNavigation requires either `ariaLabel` or `ariaLabelledby` to be set for accessibility.");
		}), v(s, (e) => {
			c.value = !e, re("navigation-toggled", { open: c.value });
		}), v(l, () => {
			f();
		}), It(() => {
			a(!0), pe("toggle-navigation", d), re("navigation-toggled", { open: c.value }), i = h(o.value, {
				allowOutsideClick: !0,
				clickOutsideDeactivates: () => (s.value && (i.deactivate({ returnFocus: !1 }), u(!1)), !1),
				fallbackFocus: o.value,
				trapStack: bt(),
				escapeDeactivates: !1
			}), f();
		}), Ie(() => {
			a(!1), Rt("toggle-navigation", d), i.deactivate();
		});
		function u(e) {
			if (c.value === e) {
				re("navigation-toggled", { open: c.value });
				return;
			}
			c.value = e === void 0 ? !c.value : e;
			let n = getComputedStyle(document.body), r = parseInt(n.getPropertyValue("--animation-slow")) || 200;
			setTimeout(() => {
				re("navigation-toggled", { open: c.value });
			}, 1.5 * r);
		}
		function d({ open: e }) {
			return u(e);
		}
		function f() {
			l.value ? i.activate() : i.deactivate();
		}
		function p() {
			s.value && u(!1);
		}
		return (r, i) => (J(), H("div", {
			ref: "appNavigationContainer",
			class: G(["app-navigation", {
				"app-navigation--closed": !c.value,
				"app-navigation--legacy": V(Ft)
			}])
		}, [n("nav", {
			id: "app-navigation-vue",
			"aria-hidden": c.value ? "false" : "true",
			"aria-label": e.ariaLabel || void 0,
			"aria-labelledby": e.ariaLabelledby || void 0,
			class: "app-navigation__content",
			inert: !c.value || void 0,
			onKeydown: vt(p, ["esc"])
		}, [
			n("div", yi, [q(r.$slots, "search", {}, void 0, !0)]),
			n("div", { class: G(["app-navigation__body", { "app-navigation__body--no-list": !r.$slots.list }]) }, [q(r.$slots, "default", {}, void 0, !0)], 2),
			r.$slots.list ? (J(), L(hi, {
				key: 0,
				class: "app-navigation__list"
			}, {
				default: A(() => [q(r.$slots, "list", {}, void 0, !0)]),
				_: 3
			})) : K("", !0),
			q(r.$slots, "footer", {}, void 0, !0)
		], 40, vi), I(_i, {
			open: c.value,
			"onUpdate:open": u
		}, null, 8, ["open"])], 2));
	}
}), [["__scopeId", "data-v-ec9c3f18"]]), xi = {
	name: "ChevronUpIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Si = ["aria-hidden", "aria-label"], Ci = [
	"fill",
	"width",
	"height"
], wi = { key: 0 };
function Ti(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon chevron-up-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [i.title ? (J(), H("title", wi, U(i.title), 1)) : K("", !0), r[1] ||= n("path", { d: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" }, null, -1)], 8, Ci))], 16, Si);
}
var Ei = /* @__PURE__ */ je(xi, [["render", Ti]]), Di = {
	name: "ArrowRightIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Oi = ["aria-hidden", "aria-label"], ki = [
	"fill",
	"width",
	"height"
], Ai = { key: 0 };
function ji(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon arrow-right-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [i.title ? (J(), H("title", Ai, U(i.title), 1)) : K("", !0), r[1] ||= n("path", { d: "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" }, null, -1)], 8, ki))], 16, Oi);
}
var Mi = /* @__PURE__ */ je(Di, [["render", ji]]);
// node_modules/@nextcloud/vue/dist/chunks/NcInputConfirmCancel.mjs
m(le);
var Ni = {
	name: "NcInputConfirmCancel",
	components: {
		IconArrowRight: Mi,
		IconClose: Vt,
		NcButton: Ye
	},
	props: {
		primary: {
			default: !1,
			type: Boolean
		},
		placeholder: {
			default: "",
			type: String
		},
		modelValue: {
			default: "",
			type: String
		}
	},
	emits: [
		"cancel",
		"confirm",
		"update:modelValue"
	],
	setup() {
		return { isLegacy34: Ft };
	},
	data() {
		return {
			labelConfirm: j("Confirm changes"),
			labelCancel: j("Cancel changes")
		};
	},
	computed: { valueModel: {
		get() {
			return this.modelValue;
		},
		set(e) {
			this.$emit("update:modelValue", e);
		}
	} },
	methods: {
		confirm() {
			this.$emit("confirm");
		},
		cancel() {
			this.$emit("cancel");
		},
		focusInput() {
			this.$refs.input.focus();
		}
	}
}, Pi = ["placeholder"];
function Fi(e, r, i, a, o, s) {
	let c = P("IconArrowRight"), l = P("NcButton"), u = P("IconClose");
	return J(), H("div", { class: G(["app-navigation-input-confirm", { "app-navigation-input-confirm--legacy": a.isLegacy34 }]) }, [n("form", {
		onSubmit: r[1] ||= D((...e) => s.confirm && s.confirm(...e), ["prevent"]),
		onKeydown: r[2] ||= vt(D((...e) => s.cancel && s.cancel(...e), [
			"exact",
			"stop",
			"prevent"
		]), ["esc"]),
		onClick: r[3] ||= D(() => {}, ["stop", "prevent"])
	}, [
		N(n("input", {
			ref: "input",
			"onUpdate:modelValue": r[0] ||= (e) => s.valueModel = e,
			type: "text",
			class: "app-navigation-input-confirm__input",
			placeholder: i.placeholder
		}, null, 8, Pi), [[y, s.valueModel]]),
		I(l, {
			"aria-label": o.labelConfirm,
			type: "submit",
			variant: "primary",
			onClick: D(s.confirm, ["stop", "prevent"])
		}, {
			icon: A(() => [I(c, { size: 20 })]),
			_: 1
		}, 8, ["aria-label", "onClick"]),
		I(l, {
			"aria-label": o.labelCancel,
			type: "reset",
			variant: i.primary ? "primary" : "tertiary",
			onClick: D(s.cancel, ["stop", "prevent"])
		}, {
			icon: A(() => [I(u, { size: 20 })]),
			_: 1
		}, 8, [
			"aria-label",
			"variant",
			"onClick"
		])
	], 32)], 2);
}
var Ii = /* @__PURE__ */ je(Ni, [["render", Fi], ["__scopeId", "data-v-6926a0b8"]]), Li = xt({
	name: "NcVNodes",
	props: { vnodes: {
		type: [Array, Object],
		default: null
	} },
	render() {
		return this.vnodes || this.$slots?.default?.({});
	}
}), Ri = {
	name: "PencilIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, zi = ["aria-hidden", "aria-label"], Bi = [
	"fill",
	"width",
	"height"
], Vi = { key: 0 };
function Hi(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon pencil-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [i.title ? (J(), H("title", Vi, U(i.title), 1)) : K("", !0), r[1] ||= n("path", { d: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" }, null, -1)], 8, Bi))], 16, zi);
}
var Ui = /* @__PURE__ */ je(Ri, [["render", Hi]]), Wi = {
	name: "UndoIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Gi = ["aria-hidden", "aria-label"], Ki = [
	"fill",
	"width",
	"height"
], qi = { key: 0 };
function Ji(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon undo-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [i.title ? (J(), H("title", qi, U(i.title), 1)) : K("", !0), r[1] ||= n("path", { d: "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" }, null, -1)], 8, Ki))], 16, Gi);
}
var Yi = /* @__PURE__ */ je(Wi, [["render", Ji]]);
m(Bt);
var Xi = {
	name: "NcAppNavigationIconCollapsible",
	components: {
		NcButton: Ye,
		ChevronDown: en,
		ChevronUp: Ei
	},
	props: {
		open: {
			type: Boolean,
			required: !0
		},
		active: {
			type: Boolean,
			required: !0
		}
	},
	emits: ["click"],
	setup() {
		return { isLegacy34: Ft };
	},
	computed: { labelButton() {
		return this.open ? j("Collapse menu") : j("Open menu");
	} },
	methods: { onClick(e) {
		this.$emit("click", e);
	} }
};
function Zi(e, n, r, i, a, o) {
	let s = P("ChevronUp"), c = P("ChevronDown"), l = P("NcButton");
	return J(), L(l, {
		class: G(["icon-collapse", {
			"icon-collapse--active": r.active,
			"icon-collapse--open": r.open
		}]),
		"aria-label": o.labelButton,
		variant: r.active && i.isLegacy34 ? "tertiary-on-primary" : "tertiary",
		onClick: o.onClick
	}, {
		icon: A(() => [r.open ? (J(), L(s, {
			key: 0,
			size: 20
		})) : (J(), L(c, {
			key: 1,
			size: 20
		}))]),
		_: 1
	}, 8, [
		"class",
		"aria-label",
		"variant",
		"onClick"
	]);
}
var Qi = /* @__PURE__ */ je(Xi, [["render", Zi], ["__scopeId", "data-v-cfbd3794"]]);
m(Ce, Oe);
var $i = {
	name: "NcAppNavigationItem",
	components: {
		NcActions: ne,
		NcActionButton: e,
		NcAppNavigationIconCollapsible: Qi,
		NcInputConfirmCancel: Ii,
		NcLoadingIcon: g,
		NcVNodes: Li,
		Pencil: Ui,
		Undo: Yi
	},
	props: {
		active: {
			type: Boolean,
			default: !1
		},
		name: {
			type: String,
			required: !0
		},
		title: {
			type: String,
			default: null
		},
		id: {
			type: String,
			default: () => pt(),
			validator: (e) => e.trim() !== ""
		},
		icon: {
			type: String,
			default: ""
		},
		loading: {
			type: Boolean,
			default: !1
		},
		to: {
			type: [String, Object],
			default: null
		},
		href: {
			type: String,
			default: null
		},
		allowCollapse: {
			type: Boolean,
			default: !1
		},
		editable: {
			type: Boolean,
			default: !1
		},
		editLabel: {
			type: String,
			default: ""
		},
		editPlaceholder: {
			type: String,
			default: ""
		},
		pinned: {
			type: Boolean,
			default: !1
		},
		undo: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		menuOpen: {
			type: Boolean,
			default: !1
		},
		forceMenu: {
			type: Boolean,
			default: !1
		},
		menuIcon: {
			type: String,
			default: void 0
		},
		menuPlacement: {
			type: String,
			default: "bottom"
		},
		ariaDescription: {
			type: String,
			default: null
		},
		forceDisplayActions: {
			type: Boolean,
			default: !1
		},
		inlineActions: {
			type: Number,
			default: 0
		}
	},
	emits: [
		"update:menuOpen",
		"update:open",
		"update:name",
		"click",
		"undo"
	],
	setup() {
		return {
			isMobile: ht(),
			isLegacy34: Ft
		};
	},
	data() {
		return {
			actionsBoundariesElement: void 0,
			editingValue: "",
			opened: this.open,
			editingActive: !1,
			menuOpenLocalValue: !1,
			focused: !1
		};
	},
	computed: {
		isRouterLink() {
			return this.to && !this.href;
		},
		canHaveChildren() {
			return this.$parent.$options._componentTag !== "AppNavigationItem";
		},
		editButtonAriaLabel() {
			return this.editLabel ? this.editLabel : j("Edit item");
		},
		undoButtonAriaLabel() {
			return j("Undo changes");
		}
	},
	watch: { open(e) {
		this.opened = e;
	} },
	mounted() {
		this.actionsBoundariesElement = document.querySelector("#content-vue") || void 0;
	},
	methods: {
		onMenuToggle(e) {
			this.$emit("update:menuOpen", e), this.menuOpenLocalValue = e;
		},
		toggleCollapse() {
			this.opened = !this.opened, this.$emit("update:open", this.opened);
		},
		onClick(e, n, r) {
			this.$emit("click", e), e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || r && (n?.(e), e.preventDefault(), this.isMobile && re("toggle-navigation", { open: !1 }));
		},
		handleEdit() {
			this.editingValue = this.name, this.editingActive = !0, this.onMenuToggle(!1), this.$nextTick(() => {
				this.$refs.editingInput.focusInput();
			});
		},
		cancelEditing() {
			this.editingActive = !1;
		},
		handleEditingDone() {
			this.$emit("update:name", this.editingValue), this.editingValue = "", this.editingActive = !1;
		},
		handleUndo() {
			this.$emit("undo");
		},
		handleFocus() {
			this.focused = !0;
		},
		handleBlur() {
			this.focused = !1;
		},
		handleTab(e) {
			if (this.editingActive) return;
			let n = this.$el?.querySelector(".app-navigation-entry__utils");
			if (!n) return;
			let r = n.querySelector("button");
			this.focused && r && (e.preventDefault(), r.focus(), this.focused = !1);
		},
		isExternal(e) {
			return e && e.match(/[a-z]+:\/\//i);
		}
	}
}, ea = ["id"], ta = [
	"aria-current",
	"aria-description",
	"aria-expanded",
	"href",
	"target",
	"title",
	"onClick"
], na = {
	key: 0,
	class: "editingContainer"
}, ra = {
	key: 1,
	class: "app-navigation-entry__deleted"
}, ia = { class: "app-navigation-entry__deleted-description" }, aa = {
	key: 0,
	class: "app-navigation-entry__counter-wrapper"
}, oa = {
	key: 0,
	class: "app-navigation-entry__children"
};
function sa(e, r, i, a, o, s) {
	let c = P("NcLoadingIcon"), l = P("NcInputConfirmCancel"), u = P("Pencil"), d = P("NcActionButton"), f = P("Undo"), m = P("NcActions"), h = P("NcAppNavigationIconCollapsible");
	return J(), H("li", {
		id: i.id,
		class: G([{
			"app-navigation-entry--opened": o.opened,
			"app-navigation-entry--pinned": i.pinned,
			"app-navigation-entry--collapsible": i.allowCollapse && !!e.$slots.default
		}, "app-navigation-entry-wrapper"])
	}, [(J(), L(p(s.isRouterLink ? "router-link" : "NcVNodes"), nt(lt({ ...s.isRouterLink && {
		custom: !0,
		to: i.to
	} })), {
		default: A(({ href: p, navigate: g, isActive: _ }) => [n("div", { class: G(["app-navigation-entry", {
			"app-navigation-entry--editing": o.editingActive,
			"app-navigation-entry--deleted": i.undo,
			"app-navigation-entry--legacy": a.isLegacy34,
			active: i.to && _ || i.active
		}]) }, [
			i.undo ? K("", !0) : (J(), H("a", {
				key: 0,
				class: "app-navigation-entry-link",
				"aria-current": i.active || i.to && _ ? "page" : void 0,
				"aria-description": i.ariaDescription,
				"aria-expanded": e.$slots.default ? o.opened.toString() : void 0,
				href: i.href || p || "#",
				target: s.isExternal(i.href) ? "_blank" : void 0,
				title: i.title || i.name,
				onBlur: r[1] ||= (...e) => s.handleBlur && s.handleBlur(...e),
				onClick: (e) => s.onClick(e, g, p),
				onFocus: r[2] ||= (...e) => s.handleFocus && s.handleFocus(...e),
				onKeydown: r[3] ||= vt(D((...e) => s.handleTab && s.handleTab(...e), ["exact"]), ["tab"])
			}, [
				n("div", { class: G(["app-navigation-entry-icon", { [i.icon]: i.icon }]) }, [i.loading ? (J(), L(c, { key: 0 })) : q(e.$slots, "icon", { active: i.active || i.to && _ }, void 0, !0, 1)], 2),
				n("span", { class: G(["app-navigation-entry__name", { "hidden-visually": o.editingActive }]) }, U(i.name), 3),
				o.editingActive ? (J(), H("div", na, [I(l, {
					ref: "editingInput",
					modelValue: o.editingValue,
					"onUpdate:modelValue": r[0] ||= (e) => o.editingValue = e,
					placeholder: i.editPlaceholder === "" ? i.name : i.editPlaceholder,
					primary: i.to && _ || i.active,
					onCancel: s.cancelEditing,
					onConfirm: s.handleEditingDone
				}, null, 8, [
					"modelValue",
					"placeholder",
					"primary",
					"onCancel",
					"onConfirm"
				])])) : K("", !0)
			], 40, ta)),
			i.undo ? (J(), H("div", ra, [n("div", ia, U(i.name), 1)])) : K("", !0),
			(e.$slots.actions || e.$slots.counter || i.editable || i.undo) && !o.editingActive ? (J(), H("div", {
				key: 2,
				class: G(["app-navigation-entry__utils", { "app-navigation-entry__utils--display-actions": i.forceDisplayActions || o.menuOpenLocalValue || i.menuOpen }])
			}, [e.$slots.counter ? (J(), H("div", aa, [q(e.$slots, "counter", {}, void 0, !0)])) : K("", !0), e.$slots.actions || i.editable && !o.editingActive || i.undo ? (J(), L(m, {
				key: 1,
				ref: "actions",
				class: "app-navigation-entry__actions",
				container: "#app-navigation-vue",
				boundariesElement: o.actionsBoundariesElement,
				inline: i.inlineActions,
				placement: i.menuPlacement,
				open: i.menuOpen,
				forceMenu: i.forceMenu,
				defaultIcon: i.menuIcon,
				variant: "tertiary",
				"onUpdate:open": s.onMenuToggle
			}, {
				icon: A(() => [q(e.$slots, "menu-icon", {}, void 0, !0)]),
				default: A(() => [
					i.editable && !o.editingActive ? (J(), L(d, {
						key: 0,
						"aria-label": s.editButtonAriaLabel,
						onClick: s.handleEdit
					}, {
						icon: A(() => [I(u, { size: 20 })]),
						default: A(() => [z(" " + U(i.editLabel), 1)]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : K("", !0),
					i.undo ? (J(), L(d, {
						key: 1,
						"aria-label": s.undoButtonAriaLabel,
						onClick: s.handleUndo
					}, {
						icon: A(() => [I(f, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"])) : K("", !0),
					q(e.$slots, "actions", {}, void 0, !0)
				]),
				_: 3
			}, 8, [
				"boundariesElement",
				"inline",
				"placement",
				"open",
				"forceMenu",
				"defaultIcon",
				"onUpdate:open"
			])) : K("", !0)], 2)) : K("", !0),
			i.allowCollapse && e.$slots.default ? (J(), L(h, {
				key: 3,
				active: i.to && _ || i.active,
				open: o.opened,
				onClick: D(s.toggleCollapse, ["prevent", "stop"])
			}, null, 8, [
				"active",
				"open",
				"onClick"
			])) : K("", !0),
			q(e.$slots, "extra", {}, void 0, !0)
		], 2)]),
		_: 3
	}, 16)), s.canHaveChildren && e.$slots.default ? (J(), H("ul", oa, [q(e.$slots, "default", {}, void 0, !0)])) : K("", !0)], 10, ea);
}
var ca = /* @__PURE__ */ je($i, [["render", sa], ["__scopeId", "data-v-6cae7342"]]), la = /* @__PURE__ */ Object.assign({ inheritAttrs: !1 }, {
	__name: "splitpanes",
	props: {
		horizontal: {
			type: Boolean,
			default: !1
		},
		pushOtherPanes: {
			type: Boolean,
			default: !0
		},
		maximizePanes: {
			type: Boolean,
			default: !0
		},
		rtl: {
			type: Boolean,
			default: !1
		},
		firstSplitter: {
			type: Boolean,
			default: !1
		},
		keyboardStep: {
			type: Number,
			default: 5
		}
	},
	emits: [
		"ready",
		"resize",
		"resized",
		"pane-click",
		"pane-maximize",
		"pane-add",
		"pane-remove",
		"splitter-click",
		"splitter-dblclick",
		"direction-changed"
	],
	setup(e, { emit: n }) {
		let r = n, i = e, a = st(), o = ae(), s = W([]), c = M(() => s.value.reduce((e, n) => (e[~~n.id] = n) && e, {})), l = M(() => s.value.length), u = W(null), d = W(!1), f = W({
			mouseDown: !1,
			dragging: !1,
			activeSplitter: null,
			cursorOffset: 0
		}), m = W({
			splitter: null,
			timeoutId: null
		}), h = M(() => ({
			[`splitpanes splitpanes--${i.horizontal ? "horizontal" : "vertical"}`]: !0,
			"splitpanes--dragging": f.value.dragging,
			"splitpanes--ready": d.value
		})), g = () => {
			document.addEventListener("mousemove", b, { passive: !1 }), document.addEventListener("mouseup", x), "ontouchstart" in window && (document.addEventListener("touchmove", b, { passive: !1 }), document.addEventListener("touchend", x));
		}, _ = () => {
			document.removeEventListener("mousemove", b, { passive: !1 }), document.removeEventListener("mouseup", x), "ontouchstart" in window && (document.removeEventListener("touchmove", b, { passive: !1 }), document.removeEventListener("touchend", x));
		}, y = (e, n) => {
			let r = e.target.closest(".splitpanes__splitter");
			if (r) {
				let { left: n, top: a } = r.getBoundingClientRect(), { clientX: o, clientY: s } = "ontouchstart" in window && e.touches ? e.touches[0] : e;
				f.value.cursorOffset = i.horizontal ? s - a : o - n;
			}
			g(), f.value.mouseDown = !0, f.value.activeSplitter = n, document.documentElement.style.cursor = i.horizontal ? "row-resize" : "col-resize";
		}, b = (e) => {
			f.value.mouseDown && (e.preventDefault(), f.value.dragging || (window.getSelection()?.removeAllRanges(), f.value.dragging = !0), requestAnimationFrame(() => {
				O(E(e)), _e("resize", { event: e }, !0);
			}));
		}, x = (e) => {
			f.value.dragging && (window.getSelection()?.removeAllRanges(), _e("resized", { event: e }, !0)), f.value.mouseDown = !1, f.value.activeSplitter = null, setTimeout(() => {
				f.value.dragging = !1, _(), document.documentElement.style.cursor = "";
			}, 100);
		}, S = (e, n) => {
			"ontouchstart" in window && (e.preventDefault(), m.value.splitter === n ? (clearTimeout(m.value.timeoutId), m.value.timeoutId = null, C(e, n), m.value.splitter = null) : (m.value.splitter = n, m.value.timeoutId = setTimeout(() => m.value.splitter = null, 500))), f.value.dragging || _e("splitter-click", {
				event: e,
				index: n
			}, !0);
		}, C = (e, n) => {
			if (_e("splitter-dblclick", {
				event: e,
				index: n
			}, !0), i.maximizePanes) {
				let r = 0;
				s.value = s.value.map((e, i) => (e.size = i === n ? e.max : e.min, i !== n && (r += e.min), e)), s.value[n].size -= r, _e("pane-maximize", {
					event: e,
					index: n,
					pane: s.value[n]
				}), _e("resized", {
					event: e,
					index: n
				}, !0);
			}
		}, w = (e, n) => {
			if (!i.keyboardStep) return;
			let r = i.horizontal ? e.key === "ArrowDown" : e.key === "ArrowRight", a = i.horizontal ? e.key === "ArrowUp" : e.key === "ArrowLeft";
			if (!r && !a) return;
			e.preventDefault(), f.value.activeSplitter = n;
			let o = (r ? 1 : -1) * (i.rtl && !i.horizontal ? -1 : 1), c = te(n) + s.value[n].size;
			k(Math.min(Math.max(c + o * i.keyboardStep, 0), 100)), _e("resize", { event: e }, !0), _e("resized", { event: e }, !0), f.value.activeSplitter = null;
		}, T = (e, n) => {
			let r = c.value[n];
			r && _e("pane-click", {
				event: e,
				index: r.index,
				pane: r
			});
		}, E = (e) => {
			let n = u.value.getBoundingClientRect(), { clientX: r, clientY: a } = "ontouchstart" in window && e.touches ? e.touches[0] : e;
			return {
				x: r - (i.horizontal ? 0 : f.value.cursorOffset) - n.left,
				y: a - (i.horizontal ? f.value.cursorOffset : 0) - n.top
			};
		}, D = (e) => {
			e = e[i.horizontal ? "y" : "x"];
			let n = u.value[i.horizontal ? "clientHeight" : "clientWidth"];
			return i.rtl && !i.horizontal && (e = n - e), e * 100 / n;
		}, O = (e) => {
			k(D(e));
		}, k = (e) => {
			let n = f.value.activeSplitter;
			if (n === null || n >= s.value.length - 1) return;
			let r = {
				prevPanesSize: te(n),
				nextPanesSize: ne(n),
				prevReachedMinPanes: 0,
				nextReachedMinPanes: 0
			}, a = 0 + (i.pushOtherPanes ? 0 : r.prevPanesSize), o = 100 - (i.pushOtherPanes ? 0 : r.nextPanesSize);
			e = Math.max(Math.min(e, o), a);
			let c = [n, n + 1], l = s.value[c[0]] || null, u = s.value[c[1]] || null, d = l !== null && l.max < 100 && e >= l.max + r.prevPanesSize, p = u !== null && u.max < 100 && e <= 100 - (u.max + ne(n + 1));
			if (d || p) d ? (l.size = l.max, u.size = Math.min(Math.max(100 - l.max - r.prevPanesSize - r.nextPanesSize, u.min), u.max)) : (l.size = Math.min(Math.max(100 - u.max - r.prevPanesSize - ne(n + 1), l.min), l.max), u.size = u.max);
			else {
				if (i.pushOtherPanes) {
					let n = ee(r, e);
					if (!n) return;
					({sums: r, panesToResize: c} = n), l = s.value[c[0]] || null, u = s.value[c[1]] || null;
				}
				l !== null && (l.size = Math.min(Math.max(e - r.prevPanesSize - r.prevReachedMinPanes, l.min), l.max)), u !== null && (u.size = Math.min(Math.max(100 - e - r.nextPanesSize - r.nextReachedMinPanes, u.min), u.max));
			}
		}, ee = (e, n) => {
			let r = f.value.activeSplitter, i = [r, r + 1];
			if (n < e.prevPanesSize + s.value[i[0]].min) {
				if (i[0] = re(r).index, e.prevReachedMinPanes = 0, i[0] < r && s.value.forEach((n, a) => {
					a > i[0] && a <= r && (n.size = n.min, e.prevReachedMinPanes += n.min);
				}), i[0] === void 0) return e.prevReachedMinPanes = 0, s.value[0].size = s.value[0].min, s.value.forEach((n, i) => {
					i > 0 && i <= r && (n.size = n.min, e.prevReachedMinPanes += n.min);
				}), s.value[i[1]].size = 100 - e.prevReachedMinPanes - s.value[0].min - e.prevPanesSize - e.nextPanesSize, null;
				e.prevPanesSize = te(i[0]);
			}
			return n > 100 - e.nextPanesSize - s.value[i[1]].min && (i[1] = A(r).index, e.nextReachedMinPanes = 0, i[1] > r + 1 && s.value.forEach((n, a) => {
				a > r && a < i[1] && (n.size = n.min, e.nextReachedMinPanes += n.min);
			}), e.nextPanesSize = i[1] === void 0 ? 0 : ne(i[1] - 1), i[1] === void 0) ? (e.nextReachedMinPanes = 0, s.value.forEach((n, i) => {
				i >= r + 1 && (n.size = n.min, e.nextReachedMinPanes += n.min);
			}), i[0] !== void 0 && (s.value[i[0]].size = 100 - e.prevPanesSize - ne(i[0] - 1)), null) : {
				sums: e,
				panesToResize: i
			};
		}, te = (e) => s.value.reduce((n, r, i) => n + (i < e ? r.size : 0), 0), ne = (e) => s.value.reduce((n, r, i) => n + (i > e + 1 ? r.size : 0), 0), re = (e) => [...s.value].reverse().find((n) => n.index < e && n.size > n.min) || {}, A = (e) => s.value.find((n) => n.index > e + 1 && n.size > n.min) || {}, ie = () => {
			let e = Array.from(u.value?.children || []);
			for (let n of e) {
				let e = n.classList.contains("splitpanes__pane"), r = n.classList.contains("splitpanes__splitter");
				!e && !r && (n.remove(), console.warn("Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed."));
			}
		}, oe = (e, n, r = !1) => {
			let a = e - 1, o = document.createElement("div");
			o.classList.add("splitpanes__splitter"), r || (o.onmousedown = (e) => y(e, a), typeof window < "u" && "ontouchstart" in window && (o.ontouchstart = (e) => y(e, a)), o.onclick = (e) => S(e, a + 1), i.keyboardStep && (o.setAttribute("tabindex", "0"), o.setAttribute("role", "separator"), o.setAttribute("aria-orientation", i.horizontal ? "horizontal" : "vertical"), o.onkeydown = (e) => w(e, a))), o.ondblclick = (e) => C(e, a + 1), n.parentNode.insertBefore(o, n);
		}, se = (e) => {
			e.onmousedown = null, e.onclick = null, e.ondblclick = null, e.onkeydown = null, e.remove();
		}, ce = () => {
			let e = Array.from(u.value?.children || []);
			for (let n of e) n.className.includes("splitpanes__splitter") && se(n);
			let n = 0;
			for (let r of e) r.className.includes("splitpanes__pane") && (!n && i.firstSplitter ? oe(n, r, !0) : n && oe(n, r), n++);
		}, le = ({ uid: e, ...n }) => {
			let r = c.value[e];
			for (let [e, i] of Object.entries(n)) r[e] = i;
		}, j = !1, ue = (e) => {
			let n = -1;
			Array.from(u.value?.children || []).some((r) => (r.className.includes("splitpanes__pane") && n++, r.isSameNode(e.el))), s.value.splice(n, 0, {
				...e,
				index: n
			}), s.value.forEach((e, n) => e.index = n), d.value && !j && (j = !0, $e(() => {
				ce(), fe({ addedPane: s.value[n] }), _e("pane-add", { pane: s.value[n] }), j = !1;
			}));
		}, de = (e) => {
			let n = s.value.findIndex((n) => n.id === e);
			s.value[n].el = null;
			let r = s.value.splice(n, 1)[0];
			s.value.forEach((e, n) => e.index = n), $e(() => {
				ce(), _e("pane-remove", { pane: r }), fe({ removedPane: {
					...r,
					index: n
				} });
			});
		}, fe = (e = {}) => {
			!e.addedPane && !e.removedPane ? N() : s.value.some((e) => e.givenSize !== null || e.min || e.max < 100) ? me(e) : pe(), d.value && _e("resized");
		}, pe = () => {
			let e = 100 / l.value, n = 100, r = [], i = [];
			for (let a of s.value) a.size = Math.max(Math.min(e, a.max), a.min), n -= a.size, a.size >= a.max && r.push(a.id), a.size <= a.min && i.push(a.id);
			Math.abs(n) > .1 && he(n, r, i);
		}, N = () => {
			let e = 100, n = [], r = [], i = 0;
			for (let a of s.value) e -= a.size, a.givenSize !== null && i++, a.size >= a.max && n.push(a.id), a.size <= a.min && r.push(a.id);
			let a = 100;
			if (e > .1) {
				for (let n of s.value) n.givenSize === null && (n.size = Math.max(Math.min(e / (l.value - i), n.max), n.min)), a -= n.size;
				a > .1 && he(a, n, r);
			}
		}, me = ({ addedPane: e, removedPane: n } = {}) => {
			let r = s.value.reduce((e, n) => e + (n.givenSize === null ? 0 : n.givenSize), 0), i = s.value.filter((e) => e.givenSize === null).length, a = i > 0 ? (100 - r) / i : 0, o = 0, c = [], l = [];
			for (let e of s.value) o -= e.size, e.size >= e.max && c.push(e.id), e.size <= e.min && l.push(e.id);
			if (!(Math.abs(o) < .1)) {
				o = 100;
				for (let e of s.value) e.givenSize === null && (e.size = Math.max(Math.min(a, e.max), e.min)), o -= e.size, e.size >= e.max && c.push(e.id), e.size <= e.min && l.push(e.id);
				Math.abs(o) > .1 && he(o, c, l);
			}
		}, he = (e, n, r) => {
			let i;
			i = e > 0 ? e / (l.value - n.length) : e / (l.value - r.length), s.value.forEach((a, o) => {
				if (e > 0 && !n.includes(a.id)) {
					let n = Math.max(Math.min(a.size + i, a.max), a.min), r = n - a.size;
					e -= r, a.size = n;
				} else if (!r.includes(a.id)) {
					let n = Math.max(Math.min(a.size + i, a.max), a.min), r = n - a.size;
					e -= r, a.size = n;
				}
			}), Math.abs(e) > .1 && d.value && console.warn("Splitpanes: Could not resize panes correctly due to their constraints.");
		}, _e = (e, n = void 0, a = !1) => {
			let o = n?.index ?? f.value.activeSplitter ?? null;
			r(e, {
				...n,
				...o !== null && { index: o },
				...a && o !== null && {
					prevPane: s.value[o - +!!i.firstSplitter],
					nextPane: s.value[o + +!i.firstSplitter]
				},
				panes: s.value.map((e) => ({
					min: e.min,
					max: e.max,
					size: e.size
				}))
			});
		};
		v(() => i.firstSplitter, () => ce()), v(() => i.horizontal, (e) => $e(() => {
			r("direction-changed", {
				horizontal: e,
				panes: s.value.map((e) => ({
					min: e.min,
					max: e.max,
					size: e.size
				}))
			});
		})), It(() => {
			ie(), ce(), fe(), _e("ready"), d.value = !0;
		}), Me(() => d.value = !1);
		let ve = () => {
			let { class: e, ...n } = a;
			return Dt("div", {
				ref: u,
				class: [h.value, e],
				...n
			}, o.default?.());
		};
		return ge("panes", s), ge("indexedPanes", c), ge("horizontal", M(() => i.horizontal)), ge("requestUpdate", le), ge("onPaneAdd", ue), ge("onPaneRemove", de), ge("onPaneClick", T), (e, n) => (J(), L(p(ve)));
	}
}), ua = {
	__name: "pane",
	props: {
		size: { type: [Number, String] },
		minSize: {
			type: [Number, String],
			default: 0
		},
		maxSize: {
			type: [Number, String],
			default: 100
		}
	},
	setup(e) {
		let n = e, r = Ke("requestUpdate"), i = Ke("onPaneAdd"), a = Ke("horizontal"), o = Ke("onPaneRemove"), s = Ke("onPaneClick"), c = Re()?.uid, l = Ke("indexedPanes"), u = M(() => l.value[c]), d = W(null), f = M(() => {
			let e = isNaN(n.size) || n.size === void 0 ? 0 : parseFloat(n.size);
			return Math.max(Math.min(e, m.value), p.value);
		}), p = M(() => {
			let e = parseFloat(n.minSize);
			return isNaN(e) ? 0 : e;
		}), m = M(() => {
			let e = parseFloat(n.maxSize);
			return isNaN(e) ? 100 : e;
		}), h = M(() => {
			let e = u.value?.size ?? (n.size === void 0 ? void 0 : f.value);
			return e === void 0 ? "" : `${a.value ? "height" : "width"}: ${e}%`;
		});
		return v(() => f.value, (e) => r({
			uid: c,
			size: e
		})), v(() => p.value, (e) => r({
			uid: c,
			min: e
		})), v(() => m.value, (e) => r({
			uid: c,
			max: e
		})), It(() => {
			i({
				id: c,
				el: d.value,
				min: p.value,
				max: m.value,
				givenSize: n.size === void 0 ? null : f.value,
				size: f.value
			});
		}), Me(() => o(c)), (e, n) => (J(), H("div", {
			ref_key: "paneEl",
			ref: d,
			class: "splitpanes__pane",
			onClick: n[0] ||= (n) => V(s)(n, e._.uid),
			style: Pe(h.value)
		}, [q(e.$slots, "default")], 4));
	}
};
// node_modules/@nextcloud/vue/dist/chunks/appName.mjs
function da(e) {
	let n = !1, r;
	return (...i) => (n || (n = !0, r = e(...i)), r);
}
var fa = "missing-app-name";
try {
	fa = "worktime";
} catch {
	be.error("The `@nextcloud/vue` library was used without setting / replacing the `appName`.");
}
var pa = fa;
function ma() {
	return V(Ke("appName", pa));
}
var ha = da(() => {
	let e = Ge("core", "apps", []), n = ma();
	return e.find(({ id: e }) => e === n)?.name ?? n;
});
// node_modules/@nextcloud/vue/dist/chunks/NcAppContent.mjs
m(x);
var ga = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcAppContentDetailsToggle",
	setup(e) {
		let n = ht();
		v(n, r), It(() => {
			r(n.value);
		}), Me(() => {
			n.value && r(!1);
		});
		function r(e = !0) {
			let n = document.querySelector(".app-navigation .app-navigation-toggle");
			n && (n.style.display = e ? "none" : "", e === !0 && re("toggle-navigation", { open: !1 }));
		}
		return (e, r) => (J(), L(V(Ye), {
			"aria-label": V(j)("Go back to the list"),
			class: G(["app-details-toggle", { "app-details-toggle--mobile": V(n) }]),
			title: V(j)("Go back to the list"),
			variant: "tertiary"
		}, {
			icon: A(() => [I(V(Qe), {
				directional: "",
				path: V(ze)
			}, null, 8, ["path"])]),
			_: 1
		}, 8, [
			"aria-label",
			"class",
			"title"
		]));
	}
}), [["__scopeId", "data-v-a28923a1"]]), _a = {
	key: 0,
	class: "hidden-visually"
}, va = { class: "app-content-wrapper__list" }, ya = {
	key: 1,
	class: "app-content-wrapper"
}, ba = O("nextcloud").persist().build(), xa = Be().theming?.name ?? "Nextcloud", Sa = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcAppContent",
	props: /* @__PURE__ */ gt({
		disableSwipe: {
			type: Boolean,
			default: !1
		},
		listSize: { default: 20 },
		listMinWidth: { default: 15 },
		listMaxWidth: { default: 40 },
		paneConfigKey: { default: "" },
		layout: { default: "vertical-split" },
		pageHeading: { default: () => void 0 },
		pageTitle: { default: () => void 0 }
	}, {
		showDetails: {
			type: Boolean,
			default: !0
		},
		showDetailsModifiers: {}
	}),
	emits: /* @__PURE__ */ gt(["resizeList", "update:showDetails"], ["update:showDetails"]),
	setup(e, { emit: r }) {
		let i = at(e, "showDetails"), a = r, s = ma(), c = ha(), l = ht(), u = Je(), f = d(() => e.disableSwipe ? void 0 : u.value, { onSwipeEnd(e, n) {
			Math.abs(f.lengthX.value) > 70 && (f.coordsStart.x < 150 && n === "right" ? re("toggle-navigation", { open: !0 }) : f.coordsStart.x < 450 && n === "left" && re("toggle-navigation", { open: !1 }));
		} }), p = W(), m = M(() => e.paneConfigKey === "" ? `pane-list-size-${s}` : `pane-list-size-${e.paneConfigKey}`), h = M(() => ({
			list: {
				size: e.listSize,
				min: e.listMinWidth,
				max: e.listMaxWidth
			},
			details: {
				size: 100 - e.listSize,
				min: 100 - e.listMaxWidth,
				max: 100 - e.listMinWidth
			}
		})), g = M(() => p.value ? 100 - p.value : h.value.details.size), _ = M(() => {
			let n = /* @__PURE__ */ new Set();
			if (e.pageTitle) for (let r of e.pageTitle.split(" - ")) n.add(r);
			else if (e.pageHeading) {
				for (let r of e.pageHeading.split(" - ")) n.add(r);
				n.size > 0 && n.add(c);
			} else return null;
			return n.add(xa), [...n.values()].join(" - ");
		});
		v(_, () => {
			_.value !== null && (document.title = _.value);
		}, { immediate: !0 }), v(() => e.paneConfigKey, b, { immediate: !0 }), It(b);
		function y(e) {
			let n = Math.trunc(e.panes[0].size);
			ba.setItem(m.value, JSON.stringify(n)), p.value = n, a("resizeList", { size: n }), be.debug("[NcAppContent] pane config", { listPaneSize: n });
		}
		function b() {
			let e = parseInt(ba.getItem(m.value) ?? "", 10);
			!isNaN(e) && e !== p.value && (be.debug("[NcAppContent] pane config", { listPaneSize: e }), p.value = e);
		}
		return (r, a) => (J(), H("main", {
			id: "app-content-vue",
			class: G(["app-content no-snapper", { "app-content--has-list": !!r.$slots.list }])
		}, [
			e.pageHeading ? (J(), H("h1", _a, U(e.pageHeading), 1)) : K("", !0),
			r.$slots.list ? (J(), H(F, { key: 1 }, [V(l) || e.layout === "no-split" ? (J(), H("div", {
				key: 0,
				class: G(["app-content-wrapper app-content-wrapper--no-split", {
					"app-content-wrapper--show-details": i.value,
					"app-content-wrapper--show-list": !i.value,
					"app-content-wrapper--mobile": V(l)
				}])
			}, [
				i.value ? (J(), L(ga, {
					key: 0,
					onClick: a[0] ||= D((e) => i.value = !1, ["stop", "prevent"])
				})) : K("", !0),
				N(n("div", va, [q(r.$slots, "list", {}, void 0, !0)], 512), [[k, !i.value]]),
				i.value ? q(r.$slots, "default", {}, void 0, !0, 1) : K("", !0)
			], 2)) : e.layout === "vertical-split" || e.layout === "horizontal-split" ? (J(), H("div", ya, [I(V(la), {
				horizontal: e.layout === "horizontal-split",
				class: G(["default-theme", {
					"splitpanes--horizontal": e.layout === "horizontal-split",
					"splitpanes--vertical": e.layout === "vertical-split"
				}]),
				rtl: V(o),
				onResized: y
			}, {
				default: A(() => [I(V(ua), {
					class: "splitpanes__pane-list",
					size: p.value || h.value.list.size,
					minSize: h.value.list.min,
					maxSize: h.value.list.max
				}, {
					default: A(() => [q(r.$slots, "list", {}, void 0, !0)]),
					_: 3
				}, 8, [
					"size",
					"minSize",
					"maxSize"
				]), I(V(ua), {
					class: "splitpanes__pane-details",
					size: g.value,
					minSize: h.value.details.min,
					maxSize: h.value.details.max
				}, {
					default: A(() => [q(r.$slots, "default", {}, void 0, !0)]),
					_: 3
				}, 8, [
					"size",
					"minSize",
					"maxSize"
				])]),
				_: 3
			}, 8, [
				"horizontal",
				"class",
				"rtl"
			])])) : K("", !0)], 64)) : K("", !0),
			r.$slots.list ? K("", !0) : q(r.$slots, "default", {}, void 0, !0, 2)
		], 2));
	}
}), [["__scopeId", "data-v-5de09463"]]), Y = (e, n) => {
	let r = e.__vccOpts || e;
	for (let [e, i] of n) r[e] = i;
	return r;
}, Ca = {
	name: "ClockIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, wa = ["aria-hidden", "aria-label"], Ta = [
	"fill",
	"width",
	"height"
], Ea = { key: 0 };
function Da(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon clock-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Ea, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" }, null, -1)
	], 8, Ta))], 16, wa);
}
var Oa = /*#__PURE__*/ Y(Ca, [["render", Da]]), ka = {
	name: "CalendarIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Aa = ["aria-hidden", "aria-label"], ja = [
	"fill",
	"width",
	"height"
], Ma = { key: 0 };
function Na(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Ma, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" }, null, -1)
	], 8, ja))], 16, Aa);
}
var Pa = /*#__PURE__*/ Y(ka, [["render", Na]]), Fa = {
	name: "AccountGroupIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Ia = ["aria-hidden", "aria-label"], La = [
	"fill",
	"width",
	"height"
], Ra = { key: 0 };
function za(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon account-group-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Ra, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" }, null, -1)
	], 8, La))], 16, Ia);
}
var Ba = /*#__PURE__*/ Y(Fa, [["render", za]]), Va = {
	name: "CheckDecagramIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Ha = ["aria-hidden", "aria-label"], Ua = [
	"fill",
	"width",
	"height"
], Wa = { key: 0 };
function Ga(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon check-decagram-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Wa, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" }, null, -1)
	], 8, Ua))], 16, Ha);
}
var Ka = /*#__PURE__*/ Y(Va, [["render", Ga]]), qa = {
	name: "CogIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Ja = ["aria-hidden", "aria-label"], Ya = [
	"fill",
	"width",
	"height"
], Xa = { key: 0 };
function Za(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon cog-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Xa, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" }, null, -1)
	], 8, Ya))], 16, Ja);
}
var Qa = /*#__PURE__*/ Y(qa, [["render", Za]]), $a = {
	name: "ShieldAccountIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, eo = ["aria-hidden", "aria-label"], to = [
	"fill",
	"width",
	"height"
], no = { key: 0 };
function ro(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon shield-account-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", no, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" }, null, -1)
	], 8, to))], 16, eo);
}
var io = /*#__PURE__*/ Y($a, [["render", ro]]), ao = {
	name: "AlertIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, oo = ["aria-hidden", "aria-label"], so = [
	"fill",
	"width",
	"height"
], co = { key: 0 };
function lo(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon alert-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", co, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" }, null, -1)
	], 8, so))], 16, oo);
}
var uo = /*#__PURE__*/ Y(ao, [["render", lo]]), fo = {
	name: "ShieldIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, po = ["aria-hidden", "aria-label"], mo = [
	"fill",
	"width",
	"height"
], ho = { key: 0 };
function go(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon shield-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", ho, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" }, null, -1)
	], 8, mo))], 16, po);
}
var _o = /*#__PURE__*/ Y(fo, [["render", go]]), vo = {
	name: "ChartBarIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, yo = ["aria-hidden", "aria-label"], bo = [
	"fill",
	"width",
	"height"
], xo = { key: 0 };
function So(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon chart-bar-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", xo, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" }, null, -1)
	], 8, bo))], 16, yo);
}
var Co = /*#__PURE__*/ Y(vo, [["render", So]]), wo = {
	name: "BullhornOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, To = ["aria-hidden", "aria-label"], Eo = [
	"fill",
	"width",
	"height"
], Do = { key: 0 };
function Oo(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon bullhorn-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Do, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" }, null, -1)
	], 8, Eo))], 16, To);
}
var ko = /*#__PURE__*/ Y(wo, [["render", Oo]]), Ao = {
	name: "WrenchIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, jo = ["aria-hidden", "aria-label"], Mo = [
	"fill",
	"width",
	"height"
], No = { key: 0 };
function Po(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon wrench-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", No, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z" }, null, -1)
	], 8, Mo))], 16, jo);
}
var Fo = /*#__PURE__*/ Y(Ao, [["render", Po]]), Io = {
	name: "SleepIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Lo = ["aria-hidden", "aria-label"], Ro = [
	"fill",
	"width",
	"height"
], zo = { key: 0 };
function Bo(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon sleep-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", zo, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M23,12H17V10L20.39,6H17V4H23V6L19.62,10H23V12M15,16H9V14L12.39,10H9V8H15V10L11.62,14H15V16M7,20H1V18L4.39,14H1V12H7V14L3.62,18H7V20Z" }, null, -1)
	], 8, Ro))], 16, Lo);
}
var Vo = /*#__PURE__*/ Y(Io, [["render", Bo]]), Ho = Et("/apps/worktime/api");
function Uo() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
	} catch {
		return "";
	}
}
var Wo = Uo(), X = Tt.create({
	baseURL: Ho,
	headers: {
		"Content-Type": "application/json",
		"OCS-APIREQUEST": "true",
		...Wo ? { "X-WorkTime-Timezone": Wo } : {}
	}
});
function Z(e) {
	if (e.response) {
		let n = e.response.data?.errors;
		if (n && typeof n == "object") {
			let e = [];
			for (let r in n) Array.isArray(n[r]) ? e.push(...n[r]) : typeof n[r] == "string" && e.push(n[r]);
			if (e.length > 0) throw Error(e.join(". "));
		}
		let r = e.response.data, i = r?.error || r?.message || R("worktime", "Ein Fehler ist aufgetreten"), a = Error(i);
		throw r?.code && (a.code = r.code), r?.suggested && (a.suggested = r.suggested), a;
	}
	throw e;
}
// src/services/AbsenceService.js
var Go = {
	async getByEmployee(e, n = null, r = null) {
		try {
			let i = { employeeId: e };
			return n && (i.year = n), r && (i.month = r), (await X.get("/absences", { params: i })).data;
		} catch (e) {
			Z(e);
		}
	},
	async get(e) {
		try {
			return (await X.get(`/absences/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e) {
		try {
			return (await X.post("/absences", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/absences/${e}`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e, n = null) {
		try {
			await X.delete(`/absences/${e}`, n ? { params: { reason: n } } : void 0);
		} catch (e) {
			Z(e);
		}
	},
	async approve(e) {
		try {
			return (await X.post(`/absences/${e}/approve`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async reject(e) {
		try {
			return (await X.post(`/absences/${e}/reject`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async cancel(e) {
		try {
			return (await X.post(`/absences/${e}/cancel`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async getVacationStats(e, n) {
		try {
			return (await X.get("/absences/vacation-stats", { params: {
				employeeId: e,
				year: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async previewDays(e, n, r, i) {
		try {
			return (await X.get("/absences/preview-days", { params: {
				employeeId: e,
				startDate: n,
				endDate: r,
				scope: i
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getTypes() {
		try {
			return (await X.get("/absences/types")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getPending() {
		try {
			return (await X.get("/absences/pending")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getInformational() {
		try {
			return (await X.get("/absences/informational")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getOverview(e, n) {
		try {
			return (await X.get("/absences/overview", { params: {
				year: e,
				month: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async createCompanyVacation(e) {
		try {
			return (await X.post("/absences/company-vacation", e)).data;
		} catch (e) {
			throw Z(e), e;
		}
	},
	async getCentralAbsences() {
		try {
			return (await X.get("/absences/central")).data;
		} catch (e) {
			Z(e);
		}
	},
	async deleteCompanyVacation(e, n, r = null) {
		try {
			return (await X.post("/absences/company-vacation/delete", {
				startDate: e,
				endDate: n,
				group: r || ""
			})).data;
		} catch (e) {
			throw Z(e), e;
		}
	}
}, Ko = {
	async getAll() {
		try {
			return (await X.get("/settings")).data;
		} catch (e) {
			Z(e);
		}
	},
	async get(e) {
		try {
			return (await X.get(`/settings/${e}`)).data.value;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/settings/${e}`, { value: n })).data;
		} catch (e) {
			Z(e);
		}
	},
	async updateMultiple(e) {
		try {
			return (await X.put("/settings", { settings: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async reset(e) {
		try {
			return (await X.post(`/settings/${e}/reset`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async resetAll() {
		try {
			return (await X.post("/settings/reset-all")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getPermissions() {
		try {
			return (await X.get("/settings/permissions")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getHrManagers() {
		try {
			return (await X.get("/settings/hr-managers")).data;
		} catch (e) {
			Z(e);
		}
	},
	async setHrManagers(e) {
		try {
			return (await X.put("/settings/hr-managers", { entries: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getAvailablePrincipals() {
		try {
			return (await X.get("/settings/available-principals")).data;
		} catch (e) {
			Z(e);
		}
	}
}, qo = wr("permissions", () => {
	let e = W({
		isAdmin: !1,
		isHrManager: !1,
		isSupervisor: !1,
		isEmployee: !1,
		employeeId: null,
		hasEmployees: !1,
		canManageEmployees: !1,
		canManageSettings: !1,
		canManageProjects: !1,
		canManageHolidays: !1,
		canApprove: !1,
		punchOnly: !1,
		punchOnlyLicensed: !1
	}), n = W(!1), r = W(!1), i = W(!1), a = W(!1), o = W(!1), s = W(!1), c = W(!1), l = W({
		targetEmployeeId: null,
		employeeName: null
	}), u = M(() => ({
		...e.value,
		targetEmployeeId: l.value.targetEmployeeId
	})), d = M(() => l.value.targetEmployeeId !== null), f = M(() => l.value.employeeName), p = M(() => l.value.targetEmployeeId ?? e.value.employeeId), m = M(() => e.value.isAdmin), h = M(() => e.value.isHrManager), g = M(() => e.value.isSupervisor), _ = M(() => e.value.isEmployee), v = M(() => e.value.employeeId), y = M(() => e.value.hasEmployees), b = M(() => e.value.canManageEmployees), x = M(() => e.value.canManageSettings), S = M(() => e.value.canManageProjects), C = M(() => e.value.canManageHolidays), w = M(() => e.value.canApprove), T = M(() => e.value.punchOnly), E = M(() => e.value.punchOnlyLicensed);
	function D(n) {
		e.value = {
			...e.value,
			...n
		}, r.value = !0;
	}
	async function O() {
		n.value = !0;
		try {
			D(await Ko.getPermissions());
		} catch (e) {
			console.error("Failed to fetch permissions:", e);
		} finally {
			n.value = !1;
		}
	}
	function k(e) {
		i.value = e;
	}
	function ee(e) {
		a.value = e.requireProject, o.value = e.requireDescription;
	}
	function te(e) {
		s.value = e;
	}
	function ne(e) {
		c.value = e;
	}
	function re(e) {
		l.value = {
			targetEmployeeId: e.employeeId,
			employeeName: e.employeeName
		};
	}
	function A() {
		l.value = {
			targetEmployeeId: null,
			employeeName: null
		};
	}
	return {
		permissions: e,
		loading: n,
		loaded: r,
		approvalRequired: i,
		requireProject: a,
		requireDescription: o,
		hourlySickEnabled: s,
		emergencyWorkEnabled: c,
		correction: l,
		accessProfile: u,
		isCorrectionMode: d,
		correctionEmployeeName: f,
		activeEmployeeId: p,
		isAdmin: m,
		isHrManager: h,
		isSupervisor: g,
		isEmployee: _,
		employeeId: v,
		hasEmployees: y,
		canManageEmployees: b,
		canManageSettings: x,
		canManageProjects: S,
		canManageHolidays: C,
		canApprove: w,
		punchOnly: T,
		punchOnlyLicensed: E,
		initFromInitialState: D,
		fetchPermissions: O,
		setApprovalRequired: k,
		setRequiredFields: ee,
		setHourlySickEnabled: te,
		setEmergencyWorkEnabled: ne,
		startCorrection: re,
		endCorrection: A
	};
});
// src/stores/types.ts
function Jo(e) {
	return e instanceof Error ? e.message : String(e);
}
function Yo(e, n) {
	let r = e.findIndex((e) => e.id === n.id);
	r !== -1 && e.splice(r, 1, n);
}
function Xo(e) {
	return typeof e == "object" && e ? {
		id: e.id,
		reason: e.reason ?? null
	} : {
		id: e,
		reason: null
	};
}
// src/stores/absences.ts
var Zo = wr("absences", () => {
	let e = W([]), n = W({}), r = W(null), i = W([]), a = W(!1), o = W(null);
	function s(n) {
		return e.value.find((e) => e.id === n);
	}
	function c(n) {
		Yo(e.value, n);
		let r = i.value.findIndex((e) => e.id === n.id);
		r !== -1 && (n.status === "pending" ? i.value.splice(r, 1, n) : i.value.splice(r, 1));
	}
	async function l(n = null) {
		let r = qo().activeEmployeeId;
		if (r) {
			a.value = !0, o.value = null;
			try {
				e.value = await Go.getByEmployee(r, n);
			} catch (e) {
				o.value = Jo(e);
			} finally {
				a.value = !1;
			}
		}
	}
	async function u() {
		try {
			n.value = await Go.getTypes();
		} catch (e) {
			console.error("Failed to fetch absence types:", e);
		}
	}
	async function d(e = null) {
		let n = qo().activeEmployeeId;
		if (!n) return;
		let i = e || (/* @__PURE__ */ new Date()).getFullYear();
		try {
			r.value = await Go.getVacationStats(n, i);
		} catch (e) {
			console.error("Failed to fetch vacation stats:", e);
		}
	}
	async function f() {
		try {
			i.value = await Go.getPending();
		} catch (e) {
			console.error("Failed to fetch pending absences:", e);
		}
	}
	async function p(n) {
		let r = qo().activeEmployeeId, i = await Go.create({
			...n,
			employeeId: r
		});
		return e.value.push(i), i;
	}
	async function m({ id: e, data: n }) {
		let r = await Go.update(e, n);
		return c(r), r;
	}
	async function h(n) {
		let { id: r, reason: a } = Xo(n);
		await Go.delete(r, a), e.value = e.value.filter((e) => e.id !== r), i.value = i.value.filter((e) => e.id !== r);
	}
	async function g(e) {
		let n = await Go.approve(e);
		return c(n), n;
	}
	async function _(e) {
		let n = await Go.reject(e);
		return c(n), n;
	}
	async function v(e) {
		let n = await Go.cancel(e);
		return c(n), n;
	}
	return {
		absences: e,
		absenceTypes: n,
		vacationStats: r,
		pendingAbsences: i,
		loading: a,
		error: o,
		getAbsenceById: s,
		fetchAbsences: l,
		fetchAbsenceTypes: u,
		fetchVacationStats: d,
		fetchPendingAbsences: f,
		createAbsence: p,
		updateAbsence: m,
		deleteAbsence: h,
		approveAbsence: g,
		rejectAbsence: _,
		cancelAbsence: v
	};
}), Qo = {
	async getAll() {
		try {
			return (await X.get("/employees")).data;
		} catch (e) {
			Z(e);
		}
	},
	async get(e) {
		try {
			return (await X.get(`/employees/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async getMe() {
		try {
			return (await X.get("/employees/me")).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e) {
		try {
			return (await X.post("/employees", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/employees/${e}`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e) {
		try {
			await X.delete(`/employees/${e}`);
		} catch (e) {
			Z(e);
		}
	},
	async getTeam() {
		try {
			return (await X.get("/employees/team")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getFederalStates() {
		try {
			return (await X.get("/employees/federal-states")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getAvailableUsers() {
		try {
			return (await X.get("/employees/available-users")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getDeletionImpact(e) {
		try {
			return (await X.get(`/employees/${e}/deletion-impact`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async getRestingImpact(e) {
		try {
			return (await X.get(`/employees/${e}/resting-impact`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async setResting(e, n, r = null, i = null) {
		try {
			return (await X.put(`/employees/${e}/resting`, {
				resting: n,
				reason: r,
				restingFrom: i
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async updateMyDefaults(e) {
		try {
			return (await X.put("/employees/me/defaults", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async updateMyDeputy(e) {
		try {
			return (await X.put("/employees/me/deputy", { deputyId: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getSelectableEmployees() {
		try {
			return (await X.get("/employees/selectable")).data;
		} catch (e) {
			Z(e);
		}
	}
}, $o = wr("employees", () => {
	let e = W([]), n = W(null), r = W({}), i = W([]), a = W(!1), o = W(null);
	function s(n) {
		return e.value.find((e) => e.id === n);
	}
	async function c() {
		a.value = !0, o.value = null;
		try {
			e.value = await Qo.getAll();
		} catch (e) {
			o.value = Jo(e);
		} finally {
			a.value = !1;
		}
	}
	async function l() {
		a.value = !0, o.value = null;
		try {
			n.value = await Qo.getMe();
		} catch (e) {
			o.value = Jo(e);
		} finally {
			a.value = !1;
		}
	}
	async function u() {
		try {
			r.value = await Qo.getFederalStates();
		} catch (e) {
			console.error("Failed to fetch federal states:", e);
		}
	}
	async function d() {
		try {
			i.value = await Qo.getAvailableUsers();
		} catch (e) {
			console.error("Failed to fetch available users:", e);
		}
	}
	async function f(n) {
		let r = await Qo.create(n);
		return e.value.push(r), r;
	}
	async function p({ id: r, data: i }) {
		let a = await Qo.update(r, i);
		return Yo(e.value, a), n.value?.id === a.id && (n.value = a), a;
	}
	async function m(n) {
		await Qo.delete(n), e.value = e.value.filter((e) => e.id !== n);
	}
	async function h(e) {
		let r = await Qo.updateMyDefaults(e);
		return n.value = r, r;
	}
	async function g(e) {
		let r = await Qo.updateMyDeputy(e);
		return n.value = r, r;
	}
	return {
		employees: e,
		currentEmployee: n,
		federalStates: r,
		availableUsers: i,
		loading: a,
		error: o,
		getEmployeeById: s,
		fetchEmployees: c,
		fetchCurrentEmployee: l,
		fetchFederalStates: u,
		fetchAvailableUsers: d,
		createEmployee: f,
		updateEmployee: p,
		deleteEmployee: m,
		updateMyDefaults: h,
		updateMyDeputy: g
	};
}), es = {
	tracking: () => !0,
	absences: (e) => !!(e.employeeId || e.targetEmployeeId),
	team: (e) => !!(e.employeeId || e.isAdmin || e.isHrManager),
	approvals: (e) => !!(e.canApprove || e.isAdmin || e.isHrManager),
	evaluation: (e) => !!(e.isAdmin || e.isHrManager),
	"my-settings": (e) => !!e.employeeId,
	settings: (e) => !!(e.canManageSettings || e.canManageEmployees),
	audit: (e) => !!(e.isAdmin || e.isHrManager)
};
function ts(e, n) {
	let r = es[e];
	return !r || !!r(n);
}
var ns = {
	tracking: (e) => !!(e.isEmployee || e.targetEmployeeId),
	team: (e) => !!e.hasEmployees,
	approvals: (e) => !!(e.canApprove && e.hasEmployees)
};
function rs(e, n) {
	if (!ts(e, n)) return !1;
	let r = ns[e];
	return !r || !!r(n);
}
// node_modules/vue-material-design-icons/Counter.vue
var is = {
	name: "CounterIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, as = ["aria-hidden", "aria-label"], os = [
	"fill",
	"width",
	"height"
], ss = { key: 0 };
function cs(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon counter-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", ss, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z" }, null, -1)
	], 8, os))], 16, as);
}
var ls = /*#__PURE__*/ Y(is, [["render", cs]]), us = {
	name: "EmailIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, ds = ["aria-hidden", "aria-label"], fs = [
	"fill",
	"width",
	"height"
], ps = { key: 0 };
function ms(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon email-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", ps, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" }, null, -1)
	], 8, fs))], 16, ds);
}
var hs = /*#__PURE__*/ Y(us, [["render", ms]]), gs = {
	name: "FileDocumentIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, _s = ["aria-hidden", "aria-label"], vs = [
	"fill",
	"width",
	"height"
], ys = { key: 0 };
function bs(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon file-document-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", ys, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" }, null, -1)
	], 8, vs))], 16, _s);
}
var xs = /*#__PURE__*/ Y(gs, [["render", bs]]), Ss = {
	name: "FolderIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Cs = ["aria-hidden", "aria-label"], ws = [
	"fill",
	"width",
	"height"
], Ts = { key: 0 };
function Es(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon folder-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Ts, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" }, null, -1)
	], 8, ws))], 16, Cs);
}
var Ds = /*#__PURE__*/ Y(Ss, [["render", Es]]), Os = {
	name: "MagnifyIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, ks = ["aria-hidden", "aria-label"], As = [
	"fill",
	"width",
	"height"
], js = { key: 0 };
function Ms(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon magnify-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", js, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" }, null, -1)
	], 8, As))], 16, ks);
}
var Ns = /*#__PURE__*/ Y(Os, [["render", Ms]]), Ps = {
	name: "StarIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Fs = ["aria-hidden", "aria-label"], Is = [
	"fill",
	"width",
	"height"
], Ls = { key: 0 };
function Rs(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon star-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Ls, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" }, null, -1)
	], 8, Is))], 16, Fs);
}
var zs = /*#__PURE__*/ Y(Ps, [["render", Rs]]), Bs = {
	name: "TranslateIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Vs = ["aria-hidden", "aria-label"], Hs = [
	"fill",
	"width",
	"height"
], Us = { key: 0 };
function Ws(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon translate-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Us, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" }, null, -1)
	], 8, Hs))], 16, Vs);
}
var Gs = /*#__PURE__*/ Y(Bs, [["render", Ws]]), Ks = {
	async getPending() {
		try {
			return (await X.get("/whatsnew")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getAll() {
		try {
			return (await X.get("/whatsnew/all")).data;
		} catch (e) {
			Z(e);
		}
	},
	async markSeen() {
		try {
			await X.post("/whatsnew/seen", {});
		} catch (e) {
			Z(e);
		}
	}
};
// src/utils/whatsnew.js
function qs(e) {
	return !!(e && Array.isArray(e.entries) && e.entries.length > 0);
}
function Js(e) {
	return !e || !Array.isArray(e.versions) ? [] : e.versions.filter((e) => e && typeof e.version == "string" && Array.isArray(e.entries) && e.entries.length > 0);
}
// src/components/WhatsNewDialog.vue
var Ys = "https://werkwolke.de", Xs = "whatsnew-title", Zs = {
	"account-group": Ba,
	"chart-bar": Co,
	cog: Qa,
	counter: ls,
	email: hs,
	"file-document": xs,
	folder: Ds,
	magnify: Ns,
	star: zs,
	translate: Gs
}, Qs = {
	name: "WhatsNewDialog",
	components: {
		NcModal: Kt,
		NcButton: Ye
	},
	data() {
		return {
			open: !1,
			groups: [],
			archive: !1,
			WERKPLUS_URL: Ys,
			TITLE_ID: Xs
		};
	},
	computed: { title() {
		return t("worktime", "Was ist neu in WorkTime");
	} },
	async mounted() {
		try {
			let e = await Ks.getPending();
			qs(e) && (this.groups = [{
				version: e.version,
				entries: e.entries
			}], this.archive = !1, this.open = !0);
		} catch {}
	},
	methods: {
		iconFor(e) {
			return Zs[e] || zs;
		},
		async openArchive() {
			try {
				this.groups = Js(await Ks.getAll()), this.archive = !0, this.open = !0;
			} catch {}
		},
		async dismiss() {
			if (this.open = !1, !this.archive) try {
				await Ks.markSeen();
			} catch {}
		}
	}
}, $s = { class: "whatsnew" }, ec = ["id"], tc = {
	key: 0,
	class: "whatsnew__empty"
}, nc = { class: "whatsnew__version" }, rc = { class: "whatsnew__icon" }, ic = { class: "whatsnew__body" }, ac = { class: "whatsnew__entry-title" }, oc = {
	key: 0,
	class: "whatsnew__badge"
}, sc = { class: "whatsnew__entry-text" }, cc = {
	key: 0,
	class: "whatsnew__where"
}, lc = { key: 0 }, uc = ["href"], dc = { class: "actions" };
function fc(e, r, i, a, o, s) {
	let c = P("NcButton"), l = P("NcModal");
	return o.open ? (J(), L(l, {
		key: 0,
		"label-id": o.TITLE_ID,
		onClose: s.dismiss
	}, {
		default: A(() => [n("div", $s, [
			n("h2", { id: o.TITLE_ID }, U(s.title), 9, ec),
			r[5] ||= z(),
			o.archive && o.groups.length === 0 ? (J(), H("p", tc, U(e.t("worktime", "Noch keine Neuerungen.")), 1)) : K("", !0),
			r[6] ||= z(),
			(J(!0), H(F, null, u(o.groups, (i) => (J(), H("div", {
				key: i.version,
				class: "whatsnew__group"
			}, [
				n("p", nc, U(e.t("worktime", "Version {version}", { version: i.version })), 1),
				r[4] ||= z(),
				(J(!0), H(F, null, u(i.entries, (a, c) => (J(), H("div", {
					key: i.version + "-" + c,
					class: "whatsnew__entry"
				}, [
					n("div", rc, [(J(), L(p(s.iconFor(a.icon)), { size: 22 }))]),
					r[3] ||= z(),
					n("div", ic, [
						n("h3", ac, [z(U(a.title) + " ", 1), a.plus ? (J(), H("span", oc, "WerkPlus")) : K("", !0)]),
						r[0] ||= z(),
						n("p", sc, U(a.text), 1),
						r[1] ||= z(),
						a.where ? (J(), H("p", cc, [
							z(U(e.t("worktime", "Zu finden unter")) + " ", 1),
							n("b", null, U(a.where), 1),
							a.adminOnly ? (J(), H("span", lc, U(" " + e.t("worktime", "(nur für Administratoren)")), 1)) : K("", !0)
						])) : K("", !0),
						r[2] ||= z(),
						a.plus ? (J(), H("a", {
							key: 1,
							class: "whatsnew__link",
							href: o.WERKPLUS_URL,
							target: "_blank",
							rel: "noreferrer noopener"
						}, U(e.t("worktime", "Mehr zu WerkPlus")), 9, uc)) : K("", !0)
					])
				]))), 128))
			]))), 128)),
			r[7] ||= z(),
			n("div", dc, [I(c, {
				variant: "primary",
				onClick: s.dismiss
			}, {
				default: A(() => [z(U(o.archive ? e.t("worktime", "Schließen") : e.t("worktime", "Alles klar")), 1)]),
				_: 1
			}, 8, ["onClick"])])
		])]),
		_: 1
	}, 8, ["label-id", "onClose"])) : K("", !0);
}
// src/App.vue
var pc = {
	name: "App",
	components: {
		NcContent: di,
		NcAppNavigation: bi,
		NcAppNavigationItem: ca,
		NcAppContent: Sa,
		NcButton: Ye,
		NcEmptyContent: Gt,
		WhatsNewDialog: /* @__PURE__ */ Y(Qs, [["render", fc], ["__scopeId", "data-v-16b7a3bb"]]),
		ClockIcon: Oa,
		CalendarIcon: Pa,
		AccountGroupIcon: Ba,
		CheckDecagramIcon: Ka,
		CogIcon: Qa,
		ShieldAccountIcon: io,
		AlertIcon: uo,
		ShieldIcon: _o,
		ChartBarIcon: Co,
		BullhornOutlineIcon: ko,
		WrenchIcon: Fo,
		SleepIcon: Vo
	},
	computed: {
		...Tr(qo, [
			"accessProfile",
			"isEmployee",
			"hasEmployees",
			"canManageSettings",
			"canApprove",
			"isCorrectionMode",
			"correctionEmployeeName"
		]),
		...Tr($o, ["currentEmployee"]),
		isResting() {
			return this.currentEmployee !== null && this.currentEmployee.isActive === !1;
		},
		restingReason() {
			return this.currentEmployee?.lockedReason || "";
		}
	},
	created() {
		this.initializeApp();
	},
	methods: {
		navVisible(e) {
			return rs(e, this.accessProfile);
		},
		...Er($o, ["fetchCurrentEmployee", "fetchFederalStates"]),
		...Er(Zo, ["fetchAbsenceTypes"]),
		...Er(qo, ["endCorrection"]),
		openWhatsNew(e) {
			e?.preventDefault(), this.$refs.whatsNew.openArchive();
		},
		exitCorrection() {
			this.endCorrection(), this.$router.push("/settings").catch(() => {});
		},
		async initializeApp() {
			await Promise.all([this.fetchFederalStates(), this.fetchAbsenceTypes()]), this.isEmployee && await this.fetchCurrentEmployee();
		}
	}
}, mc = {
	key: 0,
	class: "correction-banner"
}, hc = { class: "correction-banner__who" }, gc = { class: "correction-banner__text" }, _c = {
	key: 1,
	class: "resting-banner"
}, vc = { class: "resting-banner__text" }, yc = { key: 0 }, bc = {
	key: 2,
	class: "no-employee-warning"
}, xc = {
	key: 3,
	class: "no-employee-warning"
};
function Sc(e, r, i, a, o, s) {
	let c = P("ClockIcon"), l = P("NcAppNavigationItem"), u = P("CalendarIcon"), d = P("AccountGroupIcon"), f = P("CheckDecagramIcon"), p = P("ChartBarIcon"), m = P("ShieldIcon"), h = P("BullhornOutlineIcon"), g = P("CogIcon"), _ = P("ShieldAccountIcon"), v = P("NcAppNavigation"), y = P("WrenchIcon"), b = P("NcButton"), x = P("SleepIcon"), S = P("NcEmptyContent"), C = P("AlertIcon"), w = P("router-view"), T = P("NcAppContent"), E = P("WhatsNewDialog"), D = P("NcContent");
	return J(), L(D, { "app-name": "worktime" }, {
		default: A(() => [
			I(v, { "aria-label": e.t("worktime", "Hauptnavigation") }, {
				footer: A(() => [
					I(l, {
						name: e.t("worktime", "Neuerungen"),
						onClick: s.openWhatsNew
					}, {
						icon: A(() => [I(h, { size: 20 })]),
						_: 1
					}, 8, ["name", "onClick"]),
					r[1] ||= z(),
					s.navVisible("my-settings") ? (J(), L(l, {
						key: 0,
						name: e.t("worktime", "Einstellungen"),
						to: "/my-settings"
					}, {
						icon: A(() => [I(g, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[2] ||= z(),
					s.navVisible("settings") ? (J(), L(l, {
						key: 1,
						name: e.t("worktime", "Verwaltung"),
						to: "/settings"
					}, {
						icon: A(() => [I(_, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0)
				]),
				default: A(() => [
					s.navVisible("tracking") ? (J(), L(l, {
						key: 0,
						name: e.t("worktime", "Zeiterfassung"),
						to: "/tracking"
					}, {
						icon: A(() => [I(c, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[3] ||= z(),
					s.navVisible("absences") ? (J(), L(l, {
						key: 1,
						name: e.t("worktime", "Abwesenheiten"),
						to: "/absences"
					}, {
						icon: A(() => [I(u, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[4] ||= z(),
					s.navVisible("team") ? (J(), L(l, {
						key: 2,
						name: e.t("worktime", "Team"),
						to: "/team"
					}, {
						icon: A(() => [I(d, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[5] ||= z(),
					s.navVisible("approvals") ? (J(), L(l, {
						key: 3,
						name: e.t("worktime", "Genehmigungen"),
						to: "/approvals"
					}, {
						icon: A(() => [I(f, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[6] ||= z(),
					s.navVisible("evaluation") ? (J(), L(l, {
						key: 4,
						name: e.t("worktime", "Auswertung"),
						to: "/evaluation"
					}, {
						icon: A(() => [I(p, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[7] ||= z(),
					s.navVisible("audit") ? (J(), L(l, {
						key: 5,
						name: e.t("worktime", "Audit-Log"),
						to: "/audit"
					}, {
						icon: A(() => [I(m, { size: 20 })]),
						_: 1
					}, 8, ["name"])) : K("", !0),
					r[8] ||= z()
				]),
				_: 1
			}, 8, ["aria-label"]),
			r[17] ||= z(),
			I(T, null, {
				default: A(() => [
					e.isCorrectionMode ? (J(), H("div", mc, [
						n("span", hc, [
							I(y, { size: 20 }),
							r[9] ||= z(),
							n("span", gc, [z(U(e.t("worktime", "Korrektur-Modus · {name}", { name: e.correctionEmployeeName })) + " ", 1), n("small", null, U(e.t("worktime", "Änderungen werden protokolliert und dem Mitarbeiter angezeigt.")), 1)])
						]),
						r[10] ||= z(),
						I(b, {
							variant: "tertiary",
							onClick: s.exitCorrection
						}, {
							default: A(() => [z(U(e.t("worktime", "Korrektur beenden")), 1)]),
							_: 1
						}, 8, ["onClick"])
					])) : K("", !0),
					r[15] ||= z(),
					s.isResting ? (J(), H("div", _c, [
						I(x, { size: 20 }),
						r[11] ||= z(),
						n("span", vc, [z(U(e.t("worktime", "Dein Profil ist ruhend gestellt. Du kannst deine bisherigen Daten weiterhin einsehen und exportieren, aber keine neuen Zeiten oder Abwesenheiten erfassen.")) + " ", 1), s.restingReason ? (J(), H("small", yc, U(e.t("worktime", "Grund: {reason}", { reason: s.restingReason })), 1)) : K("", !0)])
					])) : K("", !0),
					r[16] ||= z(),
					!e.hasEmployees && e.canManageSettings && e.$route.path !== "/settings" ? (J(), H("div", bc, [I(S, { name: e.t("worktime", "Willkommen bei WorkTime") }, {
						icon: A(() => [I(d)]),
						description: A(() => [
							n("p", null, U(e.t("worktime", "Es sind noch keine Mitarbeiter eingerichtet. Lege unter Verwaltung Mitarbeiter an, um zu starten.")), 1),
							r[12] ||= z(),
							I(b, {
								variant: "primary",
								onClick: r[0] ||= (n) => e.$router.push("/settings")
							}, {
								default: A(() => [z(U(e.t("worktime", "Zur Verwaltung")), 1)]),
								_: 1
							})
						]),
						_: 1
					}, 8, ["name"])])) : !e.isEmployee && !e.canManageSettings && !e.canApprove ? (J(), H("div", xc, [I(S, { name: e.t("worktime", "Kein Mitarbeiterprofil") }, {
						icon: A(() => [I(C)]),
						description: A(() => [z(U(e.t("worktime", "Du hast noch kein Mitarbeiterprofil. Bitte wende dich an deinen Administrator oder HR-Manager, um freigeschaltet zu werden.")), 1)]),
						_: 1
					}, 8, ["name"])])) : (J(), L(w, { key: 4 }))
				]),
				_: 1
			}),
			r[18] ||= z(),
			I(E, { ref: "whatsNew" }, null, 512)
		]),
		_: 1
	});
}
var Cc = /*#__PURE__*/ Y(pc, [["render", Sc], ["__scopeId", "data-v-b2489870"]]);
// node_modules/date-fns/addDays.js
function wc(e, n, r) {
	let i = zn(e, r?.in);
	return isNaN(n) ? Ln(r?.in || e, NaN) : (n && i.setDate(i.getDate() + n), i);
}
// node_modules/date-fns/addMonths.js
function Tc(e, n, r) {
	let i = zn(e, r?.in);
	if (isNaN(n)) return Ln(r?.in || e, NaN);
	if (!n) return i;
	let a = i.getDate(), o = Ln(r?.in || e, i.getTime());
	return o.setMonth(i.getMonth() + n + 1, 0), a >= o.getDate() ? o : (i.setFullYear(o.getFullYear(), o.getMonth(), a), i);
}
// node_modules/date-fns/add.js
function Ec(e, n, r) {
	let { years: i = 0, months: a = 0, weeks: o = 0, days: s = 0, hours: c = 0, minutes: l = 0, seconds: u = 0 } = n, d = zn(e, r?.in), f = a || i ? Tc(d, a + i * 12) : d, p = s || o ? wc(f, s + o * 7) : f, m = (u + (l + c * 60) * 60) * 1e3;
	return Ln(r?.in || e, +p + m);
}
// node_modules/date-fns/addMilliseconds.js
function Dc(e, n, r) {
	return Ln(r?.in || e, +zn(e) + n);
}
// node_modules/date-fns/addHours.js
function Oc(e, n, r) {
	return Dc(e, n * Wn, r);
}
// node_modules/date-fns/startOfISOWeek.js
function kc(e, n) {
	return Vn(e, {
		...n,
		weekStartsOn: 1
	});
}
// node_modules/date-fns/getISOWeekYear.js
function Ac(e, n) {
	let r = zn(e, n?.in), i = r.getFullYear(), a = Ln(r, 0);
	a.setFullYear(i + 1, 0, 4), a.setHours(0, 0, 0, 0);
	let o = kc(a), s = Ln(r, 0);
	s.setFullYear(i, 0, 4), s.setHours(0, 0, 0, 0);
	let c = kc(s);
	return r.getTime() >= o.getTime() ? i + 1 : r.getTime() >= c.getTime() ? i : i - 1;
}
// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function jc(e) {
	let n = zn(e), r = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
	return r.setUTCFullYear(n.getFullYear()), +e - r;
}
// node_modules/date-fns/startOfDay.js
function Mc(e, n) {
	let r = zn(e, n?.in);
	return r.setHours(0, 0, 0, 0), r;
}
// node_modules/date-fns/differenceInCalendarDays.js
function Nc(e, n, r) {
	let [i, a] = Gn(r?.in, e, n), o = Mc(i), s = Mc(a), c = +o - jc(o), l = +s - jc(s);
	return Math.round((c - l) / Hn);
}
// node_modules/date-fns/startOfISOWeekYear.js
function Pc(e, n) {
	let r = Ac(e, n), i = Ln(n?.in || e, 0);
	return i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0), kc(i);
}
// node_modules/date-fns/addQuarters.js
function Fc(e, n, r) {
	return Tc(e, n * 3, r);
}
// node_modules/date-fns/addYears.js
function Ic(e, n, r) {
	return Tc(e, n * 12, r);
}
// node_modules/date-fns/compareAsc.js
function Lc(e, n) {
	let r = +zn(e) - zn(n);
	return r < 0 ? -1 : r > 0 ? 1 : r;
}
// node_modules/date-fns/isDate.js
function Rc(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
// node_modules/date-fns/isValid.js
function zc(e) {
	return !(!Rc(e) && typeof e != "number" || isNaN(+zn(e)));
}
// node_modules/date-fns/getQuarter.js
function Bc(e, n) {
	let r = zn(e, n?.in);
	return Math.trunc(r.getMonth() / 3) + 1;
}
// node_modules/date-fns/differenceInCalendarYears.js
function Vc(e, n, r) {
	let [i, a] = Gn(r?.in, e, n);
	return i.getFullYear() - a.getFullYear();
}
// node_modules/date-fns/differenceInYears.js
function Hc(e, n, r) {
	let [i, a] = Gn(r?.in, e, n), o = Lc(i, a), s = Math.abs(Vc(i, a));
	i.setFullYear(1584), a.setFullYear(1584);
	let c = o * (s - +(Lc(i, a) === -o));
	return c === 0 ? 0 : c;
}
// node_modules/date-fns/_lib/normalizeInterval.js
function Uc(e, n) {
	let [r, i] = Gn(e, n.start, n.end);
	return {
		start: r,
		end: i
	};
}
// node_modules/date-fns/eachDayOfInterval.js
function Wc(e, n) {
	let { start: r, end: i } = Uc(n?.in, e), a = +r > +i, o = a ? +r : +i, s = a ? i : r;
	s.setHours(0, 0, 0, 0);
	let c = n?.step ?? 1;
	if (!c) return [];
	c < 0 && (c = -c, a = !a);
	let l = [];
	for (; +s <= o;) l.push(Ln(r, s)), s.setDate(s.getDate() + c), s.setHours(0, 0, 0, 0);
	return a ? l.reverse() : l;
}
// node_modules/date-fns/startOfQuarter.js
function Gc(e, n) {
	let r = zn(e, n?.in), i = r.getMonth(), a = i - i % 3;
	return r.setMonth(a, 1), r.setHours(0, 0, 0, 0), r;
}
// node_modules/date-fns/eachQuarterOfInterval.js
function Kc(e, n) {
	let { start: r, end: i } = Uc(n?.in, e), a = +r > +i, o = a ? +Gc(r) : +Gc(i), s = Gc(a ? i : r), c = n?.step ?? 1;
	if (!c) return [];
	c < 0 && (c = -c, a = !a);
	let l = [];
	for (; +s <= o;) l.push(Ln(r, s)), s = Fc(s, c);
	return a ? l.reverse() : l;
}
// node_modules/date-fns/startOfMonth.js
function qc(e, n) {
	let r = zn(e, n?.in);
	return r.setDate(1), r.setHours(0, 0, 0, 0), r;
}
// node_modules/date-fns/endOfYear.js
function Jc(e, n) {
	let r = zn(e, n?.in), i = r.getFullYear();
	return r.setFullYear(i + 1, 0, 0), r.setHours(23, 59, 59, 999), r;
}
// node_modules/date-fns/startOfYear.js
function Yc(e, n) {
	let r = zn(e, n?.in);
	return r.setFullYear(r.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r;
}
// node_modules/date-fns/endOfWeek.js
function Xc(e, n) {
	let r = Un(), i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = zn(e, n?.in), o = a.getDay(), s = (o < i ? -7 : 0) + 6 - (o - i);
	return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
// node_modules/date-fns/endOfQuarter.js
function Zc(e, n) {
	let r = zn(e, n?.in), i = r.getMonth(), a = i - i % 3 + 3;
	return r.setMonth(a, 0), r.setHours(23, 59, 59, 999), r;
}
var Qc = {
	date: Nn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Nn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Nn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, $c = {
	code: "en-US",
	formatDistance: Mn,
	formatLong: Qc,
	formatRelative: Fn,
	localize: Pn,
	match: In,
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
// node_modules/date-fns/getDayOfYear.js
function el(e, n) {
	let r = zn(e, n?.in);
	return Nc(r, Yc(r)) + 1;
}
// node_modules/date-fns/getISOWeek.js
function tl(e, n) {
	let r = zn(e, n?.in), i = +kc(r) - Pc(r);
	return Math.round(i / Kn) + 1;
}
// node_modules/date-fns/getWeekYear.js
function nl(e, n) {
	let r = zn(e, n?.in), i = r.getFullYear(), a = Un(), o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, s = Ln(n?.in || e, 0);
	s.setFullYear(i + 1, 0, o), s.setHours(0, 0, 0, 0);
	let c = Vn(s, n), l = Ln(n?.in || e, 0);
	l.setFullYear(i, 0, o), l.setHours(0, 0, 0, 0);
	let u = Vn(l, n);
	return +r >= +c ? i + 1 : +r >= +u ? i : i - 1;
}
// node_modules/date-fns/startOfWeekYear.js
function rl(e, n) {
	let r = Un(), i = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = nl(e, n), o = Ln(n?.in || e, 0);
	return o.setFullYear(a, 0, i), o.setHours(0, 0, 0, 0), Vn(o, n);
}
// node_modules/date-fns/getWeek.js
function il(e, n) {
	let r = zn(e, n?.in), i = +Vn(r, n) - rl(r, n);
	return Math.round(i / Kn) + 1;
}
// node_modules/date-fns/_lib/addLeadingZeros.js
function al(e, n) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(n, "0");
}
// node_modules/date-fns/_lib/format/lightFormatters.js
var ol = {
	y(e, n) {
		let r = e.getFullYear(), i = r > 0 ? r : 1 - r;
		return al(n === "yy" ? i % 100 : i, n.length);
	},
	M(e, n) {
		let r = e.getMonth();
		return n === "M" ? String(r + 1) : al(r + 1, 2);
	},
	d(e, n) {
		return al(e.getDate(), n.length);
	},
	a(e, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (n) {
			case "a":
			case "aa": return r.toUpperCase();
			case "aaa": return r;
			case "aaaaa": return r[0];
			default: return r === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, n) {
		return al(e.getHours() % 12 || 12, n.length);
	},
	H(e, n) {
		return al(e.getHours(), n.length);
	},
	m(e, n) {
		return al(e.getMinutes(), n.length);
	},
	s(e, n) {
		return al(e.getSeconds(), n.length);
	},
	S(e, n) {
		let r = n.length, i = e.getMilliseconds();
		return al(Math.trunc(i * 10 ** (r - 3)), n.length);
	}
}, sl = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, cl = {
	G: function(e, n, r) {
		let i = +(e.getFullYear() > 0);
		switch (n) {
			case "G":
			case "GG":
			case "GGG": return r.era(i, { width: "abbreviated" });
			case "GGGGG": return r.era(i, { width: "narrow" });
			default: return r.era(i, { width: "wide" });
		}
	},
	y: function(e, n, r) {
		if (n === "yo") {
			let n = e.getFullYear(), i = n > 0 ? n : 1 - n;
			return r.ordinalNumber(i, { unit: "year" });
		}
		return ol.y(e, n);
	},
	Y: function(e, n, r, i) {
		let a = nl(e, i), o = a > 0 ? a : 1 - a;
		return n === "YY" ? al(o % 100, 2) : n === "Yo" ? r.ordinalNumber(o, { unit: "year" }) : al(o, n.length);
	},
	R: function(e, n) {
		return al(Ac(e), n.length);
	},
	u: function(e, n) {
		return al(e.getFullYear(), n.length);
	},
	Q: function(e, n, r) {
		let i = Math.ceil((e.getMonth() + 1) / 3);
		switch (n) {
			case "Q": return String(i);
			case "QQ": return al(i, 2);
			case "Qo": return r.ordinalNumber(i, { unit: "quarter" });
			case "QQQ": return r.quarter(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return r.quarter(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.quarter(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, n, r) {
		let i = Math.ceil((e.getMonth() + 1) / 3);
		switch (n) {
			case "q": return String(i);
			case "qq": return al(i, 2);
			case "qo": return r.ordinalNumber(i, { unit: "quarter" });
			case "qqq": return r.quarter(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return r.quarter(i, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.quarter(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, n, r) {
		let i = e.getMonth();
		switch (n) {
			case "M":
			case "MM": return ol.M(e, n);
			case "Mo": return r.ordinalNumber(i + 1, { unit: "month" });
			case "MMM": return r.month(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return r.month(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.month(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, n, r) {
		let i = e.getMonth();
		switch (n) {
			case "L": return String(i + 1);
			case "LL": return al(i + 1, 2);
			case "Lo": return r.ordinalNumber(i + 1, { unit: "month" });
			case "LLL": return r.month(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return r.month(i, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.month(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, n, r, i) {
		let a = il(e, i);
		return n === "wo" ? r.ordinalNumber(a, { unit: "week" }) : al(a, n.length);
	},
	I: function(e, n, r) {
		let i = tl(e);
		return n === "Io" ? r.ordinalNumber(i, { unit: "week" }) : al(i, n.length);
	},
	d: function(e, n, r) {
		return n === "do" ? r.ordinalNumber(e.getDate(), { unit: "date" }) : ol.d(e, n);
	},
	D: function(e, n, r) {
		let i = el(e);
		return n === "Do" ? r.ordinalNumber(i, { unit: "dayOfYear" }) : al(i, n.length);
	},
	E: function(e, n, r) {
		let i = e.getDay();
		switch (n) {
			case "E":
			case "EE":
			case "EEE": return r.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return r.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return r.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return r.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, n, r, i) {
		let a = e.getDay(), o = (a - i.weekStartsOn + 8) % 7 || 7;
		switch (n) {
			case "e": return String(o);
			case "ee": return al(o, 2);
			case "eo": return r.ordinalNumber(o, { unit: "day" });
			case "eee": return r.day(a, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return r.day(a, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return r.day(a, {
				width: "short",
				context: "formatting"
			});
			default: return r.day(a, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, n, r, i) {
		let a = e.getDay(), o = (a - i.weekStartsOn + 8) % 7 || 7;
		switch (n) {
			case "c": return String(o);
			case "cc": return al(o, n.length);
			case "co": return r.ordinalNumber(o, { unit: "day" });
			case "ccc": return r.day(a, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return r.day(a, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return r.day(a, {
				width: "short",
				context: "standalone"
			});
			default: return r.day(a, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, n, r) {
		let i = e.getDay(), a = i === 0 ? 7 : i;
		switch (n) {
			case "i": return String(a);
			case "ii": return al(a, n.length);
			case "io": return r.ordinalNumber(a, { unit: "day" });
			case "iii": return r.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return r.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return r.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return r.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, n, r) {
		let i = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (n) {
			case "a":
			case "aa": return r.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return r.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return r.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, n, r) {
		let i = e.getHours(), a;
		switch (a = i === 12 ? sl.noon : i === 0 ? sl.midnight : i / 12 >= 1 ? "pm" : "am", n) {
			case "b":
			case "bb": return r.dayPeriod(a, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return r.dayPeriod(a, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return r.dayPeriod(a, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(a, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, n, r) {
		let i = e.getHours(), a;
		switch (a = i >= 17 ? sl.evening : i >= 12 ? sl.afternoon : i >= 4 ? sl.morning : sl.night, n) {
			case "B":
			case "BB":
			case "BBB": return r.dayPeriod(a, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return r.dayPeriod(a, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(a, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, n, r) {
		if (n === "ho") {
			let n = e.getHours() % 12;
			return n === 0 && (n = 12), r.ordinalNumber(n, { unit: "hour" });
		}
		return ol.h(e, n);
	},
	H: function(e, n, r) {
		return n === "Ho" ? r.ordinalNumber(e.getHours(), { unit: "hour" }) : ol.H(e, n);
	},
	K: function(e, n, r) {
		let i = e.getHours() % 12;
		return n === "Ko" ? r.ordinalNumber(i, { unit: "hour" }) : al(i, n.length);
	},
	k: function(e, n, r) {
		let i = e.getHours();
		return i === 0 && (i = 24), n === "ko" ? r.ordinalNumber(i, { unit: "hour" }) : al(i, n.length);
	},
	m: function(e, n, r) {
		return n === "mo" ? r.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ol.m(e, n);
	},
	s: function(e, n, r) {
		return n === "so" ? r.ordinalNumber(e.getSeconds(), { unit: "second" }) : ol.s(e, n);
	},
	S: function(e, n) {
		return ol.S(e, n);
	},
	X: function(e, n, r) {
		let i = e.getTimezoneOffset();
		if (i === 0) return "Z";
		switch (n) {
			case "X": return ul(i);
			case "XXXX":
			case "XX": return dl(i);
			default: return dl(i, ":");
		}
	},
	x: function(e, n, r) {
		let i = e.getTimezoneOffset();
		switch (n) {
			case "x": return ul(i);
			case "xxxx":
			case "xx": return dl(i);
			default: return dl(i, ":");
		}
	},
	O: function(e, n, r) {
		let i = e.getTimezoneOffset();
		switch (n) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + ll(i, ":");
			default: return "GMT" + dl(i, ":");
		}
	},
	z: function(e, n, r) {
		let i = e.getTimezoneOffset();
		switch (n) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + ll(i, ":");
			default: return "GMT" + dl(i, ":");
		}
	},
	t: function(e, n, r) {
		return al(Math.trunc(e / 1e3), n.length);
	},
	T: function(e, n, r) {
		return al(+e, n.length);
	}
};
function ll(e, n = "") {
	let r = e > 0 ? "-" : "+", i = Math.abs(e), a = Math.trunc(i / 60), o = i % 60;
	return o === 0 ? r + String(a) : r + String(a) + n + al(o, 2);
}
function ul(e, n) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + al(Math.abs(e) / 60, 2) : dl(e, n);
}
function dl(e, n = "") {
	let r = e > 0 ? "-" : "+", i = Math.abs(e), a = al(Math.trunc(i / 60), 2), o = al(i % 60, 2);
	return r + a + n + o;
}
// node_modules/date-fns/_lib/format/longFormatters.js
var fl = (e, n) => {
	switch (e) {
		case "P": return n.date({ width: "short" });
		case "PP": return n.date({ width: "medium" });
		case "PPP": return n.date({ width: "long" });
		default: return n.date({ width: "full" });
	}
}, pl = (e, n) => {
	switch (e) {
		case "p": return n.time({ width: "short" });
		case "pp": return n.time({ width: "medium" });
		case "ppp": return n.time({ width: "long" });
		default: return n.time({ width: "full" });
	}
}, ml = {
	p: pl,
	P: (e, n) => {
		let r = e.match(/(P+)(p+)?/) || [], i = r[1], a = r[2];
		if (!a) return fl(e, n);
		let o;
		switch (i) {
			case "P":
				o = n.dateTime({ width: "short" });
				break;
			case "PP":
				o = n.dateTime({ width: "medium" });
				break;
			case "PPP":
				o = n.dateTime({ width: "long" });
				break;
			default: o = n.dateTime({ width: "full" });
		}
		return o.replace("{{date}}", fl(i, n)).replace("{{time}}", pl(a, n));
	}
}, hl = /^D+$/, gl = /^Y+$/, _l = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function vl(e) {
	return hl.test(e);
}
function yl(e) {
	return gl.test(e);
}
function bl(e, n, r) {
	let i = xl(e, n, r);
	if (console.warn(i), _l.includes(e)) throw RangeError(i);
}
function xl(e, n, r) {
	let i = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${n}\`) for formatting ${i} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
// node_modules/date-fns/format.js
var Sl = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Cl = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, wl = /^'([^]*?)'?$/, Tl = /''/g, El = /[a-zA-Z]/;
function Dl(e, n, r) {
	let i = Un(), a = r?.locale ?? i.locale ?? $c, o = r?.firstWeekContainsDate ?? r?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, s = r?.weekStartsOn ?? r?.locale?.options?.weekStartsOn ?? i.weekStartsOn ?? i.locale?.options?.weekStartsOn ?? 0, c = zn(e, r?.in);
	if (!zc(c)) throw RangeError("Invalid time value");
	let l = n.match(Cl).map((e) => {
		let n = e[0];
		if (n === "p" || n === "P") {
			let r = ml[n];
			return r(e, a.formatLong);
		}
		return e;
	}).join("").match(Sl).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let n = e[0];
		if (n === "'") return {
			isToken: !1,
			value: Ol(e)
		};
		if (cl[n]) return {
			isToken: !0,
			value: e
		};
		if (n.match(El)) throw RangeError("Format string contains an unescaped latin alphabet character `" + n + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	a.localize.preprocessor && (l = a.localize.preprocessor(c, l));
	let u = {
		firstWeekContainsDate: o,
		weekStartsOn: s,
		locale: a
	};
	return l.map((i) => {
		if (!i.isToken) return i.value;
		let o = i.value;
		(!r?.useAdditionalWeekYearTokens && yl(o) || !r?.useAdditionalDayOfYearTokens && vl(o)) && bl(o, n, String(e));
		let s = cl[o[0]];
		return s(c, o, a.localize, u);
	}).join("");
}
function Ol(e) {
	let n = e.match(wl);
	return n ? n[1].replace(Tl, "'") : e;
}
// node_modules/date-fns/getDay.js
function kl(e, n) {
	return zn(e, n?.in).getDay();
}
// node_modules/date-fns/getDaysInMonth.js
function Al(e, n) {
	let r = zn(e, n?.in), i = r.getFullYear(), a = r.getMonth(), o = Ln(r, 0);
	return o.setFullYear(i, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
// node_modules/date-fns/getDefaultOptions.js
function jl() {
	return Object.assign({}, Un());
}
// node_modules/date-fns/getHours.js
function Ml(e, n) {
	return zn(e, n?.in).getHours();
}
// node_modules/date-fns/getISODay.js
function Nl(e, n) {
	let r = zn(e, n?.in).getDay();
	return r === 0 ? 7 : r;
}
// node_modules/date-fns/getMinutes.js
function Pl(e, n) {
	return zn(e, n?.in).getMinutes();
}
// node_modules/date-fns/getMonth.js
function Fl(e, n) {
	return zn(e, n?.in).getMonth();
}
// node_modules/date-fns/getSeconds.js
function Il(e) {
	return zn(e).getSeconds();
}
// node_modules/date-fns/getYear.js
function Ll(e, n) {
	return zn(e, n?.in).getFullYear();
}
// node_modules/date-fns/isAfter.js
function Rl(e, n) {
	return +zn(e) > +zn(n);
}
// node_modules/date-fns/isBefore.js
function zl(e, n) {
	return +zn(e) < +zn(n);
}
// node_modules/date-fns/isEqual.js
function Bl(e, n) {
	return +zn(e) == +zn(n);
}
// node_modules/date-fns/transpose.js
function Vl(e, n) {
	let r = Hl(n) ? new n(0) : Ln(n, 0);
	return r.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()), r.setHours(e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()), r;
}
function Hl(e) {
	return typeof e == "function" && e.prototype?.constructor === e;
}
// node_modules/date-fns/parse/_lib/Setter.js
var Ul = 10, Wl = class {
	subPriority = 0;
	validate(e, n) {
		return !0;
	}
}, Gl = class extends Wl {
	constructor(e, n, r, i, a) {
		super(), this.value = e, this.validateValue = n, this.setValue = r, this.priority = i, a && (this.subPriority = a);
	}
	validate(e, n) {
		return this.validateValue(e, this.value, n);
	}
	set(e, n, r) {
		return this.setValue(e, n, this.value, r);
	}
}, Kl = class extends Wl {
	priority = Ul;
	subPriority = -1;
	constructor(e, n) {
		super(), this.context = e || ((e) => Ln(n, e));
	}
	set(e, n) {
		return n.timestampIsSet ? e : Ln(e, Vl(e, this.context));
	}
}, ql = class {
	run(e, n, r, i) {
		let a = this.parse(e, n, r, i);
		return a ? {
			setter: new Gl(a.value, this.validate, this.set, this.priority, this.subPriority),
			rest: a.rest
		} : null;
	}
	validate(e, n, r) {
		return !0;
	}
}, Jl = class extends ql {
	priority = 140;
	parse(e, n, r) {
		switch (n) {
			case "G":
			case "GG":
			case "GGG": return r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
			case "GGGGG": return r.era(e, { width: "narrow" });
			default: return r.era(e, { width: "wide" }) || r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
		}
	}
	set(e, n, r) {
		return n.era = r, e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"R",
		"u",
		"t",
		"T"
	];
}, Yl = {
	month: /^(1[0-2]|0?\d)/,
	date: /^(3[0-1]|[0-2]?\d)/,
	dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
	week: /^(5[0-3]|[0-4]?\d)/,
	hour23h: /^(2[0-3]|[0-1]?\d)/,
	hour24h: /^(2[0-4]|[0-1]?\d)/,
	hour11h: /^(1[0-1]|0?\d)/,
	hour12h: /^(1[0-2]|0?\d)/,
	minute: /^[0-5]?\d/,
	second: /^[0-5]?\d/,
	singleDigit: /^\d/,
	twoDigits: /^\d{1,2}/,
	threeDigits: /^\d{1,3}/,
	fourDigits: /^\d{1,4}/,
	anyDigitsSigned: /^-?\d+/,
	singleDigitSigned: /^-?\d/,
	twoDigitsSigned: /^-?\d{1,2}/,
	threeDigitsSigned: /^-?\d{1,3}/,
	fourDigitsSigned: /^-?\d{1,4}/
}, Xl = {
	basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
	basic: /^([+-])(\d{2})(\d{2})|Z/,
	basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
	extended: /^([+-])(\d{2}):(\d{2})|Z/,
	extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
// node_modules/date-fns/parse/_lib/utils.js
function Zl(e, n) {
	return e && {
		value: n(e.value),
		rest: e.rest
	};
}
function Ql(e, n) {
	let r = n.match(e);
	return r ? {
		value: parseInt(r[0], 10),
		rest: n.slice(r[0].length)
	} : null;
}
function $l(e, n) {
	let r = n.match(e);
	if (!r) return null;
	if (r[0] === "Z") return {
		value: 0,
		rest: n.slice(1)
	};
	let i = r[1] === "+" ? 1 : -1, a = r[2] ? parseInt(r[2], 10) : 0, o = r[3] ? parseInt(r[3], 10) : 0, s = r[5] ? parseInt(r[5], 10) : 0;
	return {
		value: i * (a * Wn + o * Rn + s * Bn),
		rest: n.slice(r[0].length)
	};
}
function eu(e) {
	return Ql(Yl.anyDigitsSigned, e);
}
function tu(e, n) {
	switch (e) {
		case 1: return Ql(Yl.singleDigit, n);
		case 2: return Ql(Yl.twoDigits, n);
		case 3: return Ql(Yl.threeDigits, n);
		case 4: return Ql(Yl.fourDigits, n);
		default: return Ql(RegExp("^\\d{1," + e + "}"), n);
	}
}
function nu(e, n) {
	switch (e) {
		case 1: return Ql(Yl.singleDigitSigned, n);
		case 2: return Ql(Yl.twoDigitsSigned, n);
		case 3: return Ql(Yl.threeDigitsSigned, n);
		case 4: return Ql(Yl.fourDigitsSigned, n);
		default: return Ql(RegExp("^-?\\d{1," + e + "}"), n);
	}
}
function ru(e) {
	switch (e) {
		case "morning": return 4;
		case "evening": return 17;
		case "pm":
		case "noon":
		case "afternoon": return 12;
		default: return 0;
	}
}
function iu(e, n) {
	let r = n > 0, i = r ? n : 1 - n, a;
	if (i <= 50) a = e || 100;
	else {
		let n = i + 50, r = Math.trunc(n / 100) * 100, o = e >= n % 100;
		a = e + r - (o ? 100 : 0);
	}
	return r ? a : 1 - a;
}
function au(e) {
	return e % 400 == 0 || e % 4 == 0 && e % 100 != 0;
}
// node_modules/date-fns/parse/_lib/parsers/YearParser.js
var ou = class extends ql {
	priority = 130;
	incompatibleTokens = [
		"Y",
		"R",
		"u",
		"w",
		"I",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
	parse(e, n, r) {
		let i = (e) => ({
			year: e,
			isTwoDigitYear: n === "yy"
		});
		switch (n) {
			case "y": return Zl(tu(4, e), i);
			case "yo": return Zl(r.ordinalNumber(e, { unit: "year" }), i);
			default: return Zl(tu(n.length, e), i);
		}
	}
	validate(e, n) {
		return n.isTwoDigitYear || n.year > 0;
	}
	set(e, n, r) {
		let i = e.getFullYear();
		if (r.isTwoDigitYear) {
			let n = iu(r.year, i);
			return e.setFullYear(n, 0, 1), e.setHours(0, 0, 0, 0), e;
		}
		let a = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
		return e.setFullYear(a, 0, 1), e.setHours(0, 0, 0, 0), e;
	}
}, su = class extends ql {
	priority = 130;
	parse(e, n, r) {
		let i = (e) => ({
			year: e,
			isTwoDigitYear: n === "YY"
		});
		switch (n) {
			case "Y": return Zl(tu(4, e), i);
			case "Yo": return Zl(r.ordinalNumber(e, { unit: "year" }), i);
			default: return Zl(tu(n.length, e), i);
		}
	}
	validate(e, n) {
		return n.isTwoDigitYear || n.year > 0;
	}
	set(e, n, r, i) {
		let a = nl(e, i);
		if (r.isTwoDigitYear) {
			let n = iu(r.year, a);
			return e.setFullYear(n, 0, i.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Vn(e, i);
		}
		let o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
		return e.setFullYear(o, 0, i.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Vn(e, i);
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"Q",
		"q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"i",
		"t",
		"T"
	];
}, cu = class extends ql {
	priority = 130;
	parse(e, n) {
		return nu(n === "R" ? 4 : n.length, e);
	}
	set(e, n, r) {
		let i = Ln(e, 0);
		return i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0), kc(i);
	}
	incompatibleTokens = [
		"G",
		"y",
		"Y",
		"u",
		"Q",
		"q",
		"M",
		"L",
		"w",
		"d",
		"D",
		"e",
		"c",
		"t",
		"T"
	];
}, lu = class extends ql {
	priority = 130;
	parse(e, n) {
		return nu(n === "u" ? 4 : n.length, e);
	}
	set(e, n, r) {
		return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"G",
		"y",
		"Y",
		"R",
		"w",
		"I",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, uu = class extends ql {
	priority = 120;
	parse(e, n, r) {
		switch (n) {
			case "Q":
			case "QQ": return tu(n.length, e);
			case "Qo": return r.ordinalNumber(e, { unit: "quarter" });
			case "QQQ": return r.quarter(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.quarter(e, {
				width: "narrow",
				context: "formatting"
			});
			case "QQQQQ": return r.quarter(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.quarter(e, {
				width: "wide",
				context: "formatting"
			}) || r.quarter(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.quarter(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 4;
	}
	set(e, n, r) {
		return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"M",
		"L",
		"w",
		"I",
		"d",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, du = class extends ql {
	priority = 120;
	parse(e, n, r) {
		switch (n) {
			case "q":
			case "qq": return tu(n.length, e);
			case "qo": return r.ordinalNumber(e, { unit: "quarter" });
			case "qqq": return r.quarter(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.quarter(e, {
				width: "narrow",
				context: "standalone"
			});
			case "qqqqq": return r.quarter(e, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.quarter(e, {
				width: "wide",
				context: "standalone"
			}) || r.quarter(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.quarter(e, {
				width: "narrow",
				context: "standalone"
			});
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 4;
	}
	set(e, n, r) {
		return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"Q",
		"M",
		"L",
		"w",
		"I",
		"d",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, fu = class extends ql {
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"L",
		"w",
		"I",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
	priority = 110;
	parse(e, n, r) {
		let i = (e) => e - 1;
		switch (n) {
			case "M": return Zl(Ql(Yl.month, e), i);
			case "MM": return Zl(tu(2, e), i);
			case "Mo": return Zl(r.ordinalNumber(e, { unit: "month" }), i);
			case "MMM": return r.month(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.month(e, {
				width: "narrow",
				context: "formatting"
			});
			case "MMMMM": return r.month(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.month(e, {
				width: "wide",
				context: "formatting"
			}) || r.month(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.month(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 11;
	}
	set(e, n, r) {
		return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
	}
}, pu = class extends ql {
	priority = 110;
	parse(e, n, r) {
		let i = (e) => e - 1;
		switch (n) {
			case "L": return Zl(Ql(Yl.month, e), i);
			case "LL": return Zl(tu(2, e), i);
			case "Lo": return Zl(r.ordinalNumber(e, { unit: "month" }), i);
			case "LLL": return r.month(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.month(e, {
				width: "narrow",
				context: "standalone"
			});
			case "LLLLL": return r.month(e, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.month(e, {
				width: "wide",
				context: "standalone"
			}) || r.month(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.month(e, {
				width: "narrow",
				context: "standalone"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 11;
	}
	set(e, n, r) {
		return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"M",
		"w",
		"I",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
};
// node_modules/date-fns/setWeek.js
function mu(e, n, r) {
	let i = zn(e, r?.in), a = il(i, r) - n;
	return i.setDate(i.getDate() - a * 7), zn(i, r?.in);
}
// node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.js
var hu = class extends ql {
	priority = 100;
	parse(e, n, r) {
		switch (n) {
			case "w": return Ql(Yl.week, e);
			case "wo": return r.ordinalNumber(e, { unit: "week" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 53;
	}
	set(e, n, r, i) {
		return Vn(mu(e, r, i), i);
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"i",
		"t",
		"T"
	];
};
// node_modules/date-fns/setISOWeek.js
function gu(e, n, r) {
	let i = zn(e, r?.in), a = tl(i, r) - n;
	return i.setDate(i.getDate() - a * 7), i;
}
// node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.js
var _u = class extends ql {
	priority = 100;
	parse(e, n, r) {
		switch (n) {
			case "I": return Ql(Yl.week, e);
			case "Io": return r.ordinalNumber(e, { unit: "week" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 53;
	}
	set(e, n, r) {
		return kc(gu(e, r));
	}
	incompatibleTokens = [
		"y",
		"Y",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"w",
		"d",
		"D",
		"e",
		"c",
		"t",
		"T"
	];
}, vu = [
	31,
	28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
], yu = [
	31,
	29,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
], bu = class extends ql {
	priority = 90;
	subPriority = 1;
	parse(e, n, r) {
		switch (n) {
			case "d": return Ql(Yl.date, e);
			case "do": return r.ordinalNumber(e, { unit: "date" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		let r = au(e.getFullYear()), i = e.getMonth();
		return r ? n >= 1 && n <= yu[i] : n >= 1 && n <= vu[i];
	}
	set(e, n, r) {
		return e.setDate(r), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"w",
		"I",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, xu = class extends ql {
	priority = 90;
	subpriority = 1;
	parse(e, n, r) {
		switch (n) {
			case "D":
			case "DD": return Ql(Yl.dayOfYear, e);
			case "Do": return r.ordinalNumber(e, { unit: "date" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return au(e.getFullYear()) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
	}
	set(e, n, r) {
		return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"M",
		"L",
		"w",
		"I",
		"d",
		"E",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
};
// node_modules/date-fns/setDay.js
function Su(e, n, r) {
	let i = Un(), a = r?.weekStartsOn ?? r?.locale?.options?.weekStartsOn ?? i.weekStartsOn ?? i.locale?.options?.weekStartsOn ?? 0, o = zn(e, r?.in), s = o.getDay(), c = (n % 7 + 7) % 7, l = 7 - a;
	return wc(o, n < 0 || n > 6 ? n - (s + l) % 7 : (c + l) % 7 - (s + l) % 7, r);
}
// node_modules/date-fns/parse/_lib/parsers/DayParser.js
var Cu = class extends ql {
	priority = 90;
	parse(e, n, r) {
		switch (n) {
			case "E":
			case "EE":
			case "EEE": return r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEE": return r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.day(e, {
				width: "wide",
				context: "formatting"
			}) || r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 6;
	}
	set(e, n, r, i) {
		return e = Su(e, r, i), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, wu = class extends ql {
	priority = 90;
	parse(e, n, r, i) {
		let a = (e) => {
			let n = Math.floor((e - 1) / 7) * 7;
			return (e + i.weekStartsOn + 6) % 7 + n;
		};
		switch (n) {
			case "e":
			case "ee": return Zl(tu(n.length, e), a);
			case "eo": return Zl(r.ordinalNumber(e, { unit: "day" }), a);
			case "eee": return r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeee": return r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.day(e, {
				width: "wide",
				context: "formatting"
			}) || r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 6;
	}
	set(e, n, r, i) {
		return e = Su(e, r, i), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"E",
		"i",
		"c",
		"t",
		"T"
	];
}, Tu = class extends ql {
	priority = 90;
	parse(e, n, r, i) {
		let a = (e) => {
			let n = Math.floor((e - 1) / 7) * 7;
			return (e + i.weekStartsOn + 6) % 7 + n;
		};
		switch (n) {
			case "c":
			case "cc": return Zl(tu(n.length, e), a);
			case "co": return Zl(r.ordinalNumber(e, { unit: "day" }), a);
			case "ccc": return r.day(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.day(e, {
				width: "short",
				context: "standalone"
			}) || r.day(e, {
				width: "narrow",
				context: "standalone"
			});
			case "ccccc": return r.day(e, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return r.day(e, {
				width: "short",
				context: "standalone"
			}) || r.day(e, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.day(e, {
				width: "wide",
				context: "standalone"
			}) || r.day(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.day(e, {
				width: "short",
				context: "standalone"
			}) || r.day(e, {
				width: "narrow",
				context: "standalone"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 6;
	}
	set(e, n, r, i) {
		return e = Su(e, r, i), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"E",
		"i",
		"e",
		"t",
		"T"
	];
};
// node_modules/date-fns/setISODay.js
function Eu(e, n, r) {
	let i = zn(e, r?.in);
	return wc(i, n - Nl(i, r), r);
}
// node_modules/date-fns/parse/_lib/parsers/ISODayParser.js
var Du = class extends ql {
	priority = 90;
	parse(e, n, r) {
		let i = (e) => e === 0 ? 7 : e;
		switch (n) {
			case "i":
			case "ii": return tu(n.length, e);
			case "io": return r.ordinalNumber(e, { unit: "day" });
			case "iii": return Zl(r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
			case "iiiii": return Zl(r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
			case "iiiiii": return Zl(r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
			default: return Zl(r.day(e, {
				width: "wide",
				context: "formatting"
			}) || r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 7;
	}
	set(e, n, r) {
		return e = Eu(e, r), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"y",
		"Y",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"w",
		"d",
		"D",
		"E",
		"e",
		"c",
		"t",
		"T"
	];
}, Ou = class extends ql {
	priority = 80;
	parse(e, n, r) {
		switch (n) {
			case "a":
			case "aa":
			case "aaa": return r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			case "aaaaa": return r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(e, {
				width: "wide",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	set(e, n, r) {
		return e.setHours(ru(r), 0, 0, 0), e;
	}
	incompatibleTokens = [
		"b",
		"B",
		"H",
		"k",
		"t",
		"T"
	];
}, ku = class extends ql {
	priority = 80;
	parse(e, n, r) {
		switch (n) {
			case "b":
			case "bb":
			case "bbb": return r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			case "bbbbb": return r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(e, {
				width: "wide",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	set(e, n, r) {
		return e.setHours(ru(r), 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"B",
		"H",
		"k",
		"t",
		"T"
	];
}, Au = class extends ql {
	priority = 80;
	parse(e, n, r) {
		switch (n) {
			case "B":
			case "BB":
			case "BBB": return r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			case "BBBBB": return r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(e, {
				width: "wide",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	set(e, n, r) {
		return e.setHours(ru(r), 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"b",
		"t",
		"T"
	];
}, ju = class extends ql {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "h": return Ql(Yl.hour12h, e);
			case "ho": return r.ordinalNumber(e, { unit: "hour" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 12;
	}
	set(e, n, r) {
		let i = e.getHours() >= 12;
		return i && r < 12 ? e.setHours(r + 12, 0, 0, 0) : !i && r === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"H",
		"K",
		"k",
		"t",
		"T"
	];
}, Mu = class extends ql {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "H": return Ql(Yl.hour23h, e);
			case "Ho": return r.ordinalNumber(e, { unit: "hour" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 23;
	}
	set(e, n, r) {
		return e.setHours(r, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"b",
		"h",
		"K",
		"k",
		"t",
		"T"
	];
}, Nu = class extends ql {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "K": return Ql(Yl.hour11h, e);
			case "Ko": return r.ordinalNumber(e, { unit: "hour" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 11;
	}
	set(e, n, r) {
		return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"h",
		"H",
		"k",
		"t",
		"T"
	];
}, Pu = class extends ql {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "k": return Ql(Yl.hour24h, e);
			case "ko": return r.ordinalNumber(e, { unit: "hour" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 24;
	}
	set(e, n, r) {
		let i = r <= 24 ? r % 24 : r;
		return e.setHours(i, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"b",
		"h",
		"H",
		"K",
		"t",
		"T"
	];
}, Fu = class extends ql {
	priority = 60;
	parse(e, n, r) {
		switch (n) {
			case "m": return Ql(Yl.minute, e);
			case "mo": return r.ordinalNumber(e, { unit: "minute" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 59;
	}
	set(e, n, r) {
		return e.setMinutes(r, 0, 0), e;
	}
	incompatibleTokens = ["t", "T"];
}, Iu = class extends ql {
	priority = 50;
	parse(e, n, r) {
		switch (n) {
			case "s": return Ql(Yl.second, e);
			case "so": return r.ordinalNumber(e, { unit: "second" });
			default: return tu(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 59;
	}
	set(e, n, r) {
		return e.setSeconds(r, 0), e;
	}
	incompatibleTokens = ["t", "T"];
}, Lu = class extends ql {
	priority = 30;
	parse(e, n) {
		return Zl(tu(n.length, e), (e) => Math.trunc(e * 10 ** (-n.length + 3)));
	}
	set(e, n, r) {
		return e.setMilliseconds(r), e;
	}
	incompatibleTokens = ["t", "T"];
}, Ru = class extends ql {
	priority = 10;
	parse(e, n) {
		switch (n) {
			case "X": return $l(Xl.basicOptionalMinutes, e);
			case "XX": return $l(Xl.basic, e);
			case "XXXX": return $l(Xl.basicOptionalSeconds, e);
			case "XXXXX": return $l(Xl.extendedOptionalSeconds, e);
			default: return $l(Xl.extended, e);
		}
	}
	set(e, n, r) {
		return n.timestampIsSet ? e : Ln(e, e.getTime() - jc(e) - r);
	}
	incompatibleTokens = [
		"t",
		"T",
		"x"
	];
}, zu = class extends ql {
	priority = 10;
	parse(e, n) {
		switch (n) {
			case "x": return $l(Xl.basicOptionalMinutes, e);
			case "xx": return $l(Xl.basic, e);
			case "xxxx": return $l(Xl.basicOptionalSeconds, e);
			case "xxxxx": return $l(Xl.extendedOptionalSeconds, e);
			default: return $l(Xl.extended, e);
		}
	}
	set(e, n, r) {
		return n.timestampIsSet ? e : Ln(e, e.getTime() - jc(e) - r);
	}
	incompatibleTokens = [
		"t",
		"T",
		"X"
	];
}, Bu = class extends ql {
	priority = 40;
	parse(e) {
		return eu(e);
	}
	set(e, n, r) {
		return [Ln(e, r * 1e3), { timestampIsSet: !0 }];
	}
	incompatibleTokens = "*";
}, Vu = class extends ql {
	priority = 20;
	parse(e) {
		return eu(e);
	}
	set(e, n, r) {
		return [Ln(e, r), { timestampIsSet: !0 }];
	}
	incompatibleTokens = "*";
}, Hu = {
	G: new Jl(),
	y: new ou(),
	Y: new su(),
	R: new cu(),
	u: new lu(),
	Q: new uu(),
	q: new du(),
	M: new fu(),
	L: new pu(),
	w: new hu(),
	I: new _u(),
	d: new bu(),
	D: new xu(),
	E: new Cu(),
	e: new wu(),
	c: new Tu(),
	i: new Du(),
	a: new Ou(),
	b: new ku(),
	B: new Au(),
	h: new ju(),
	H: new Mu(),
	K: new Nu(),
	k: new Pu(),
	m: new Fu(),
	s: new Iu(),
	S: new Lu(),
	X: new Ru(),
	x: new zu(),
	t: new Bu(),
	T: new Vu()
}, Uu = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Wu = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Gu = /^'([^]*?)'?$/, Ku = /''/g, qu = /\S/, Ju = /[a-zA-Z]/;
function Yu(e, n, r, i) {
	let a = () => Ln(i?.in || r, NaN), o = jl(), s = i?.locale ?? o.locale ?? $c, c = i?.firstWeekContainsDate ?? i?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, l = i?.weekStartsOn ?? i?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0;
	if (!n) return e ? a() : zn(r, i?.in);
	let u = {
		firstWeekContainsDate: c,
		weekStartsOn: l,
		locale: s
	}, d = [new Kl(i?.in, r)], f = n.match(Wu).map((e) => {
		let n = e[0];
		if (n in ml) {
			let r = ml[n];
			return r(e, s.formatLong);
		}
		return e;
	}).join("").match(Uu), p = [];
	for (let r of f) {
		!i?.useAdditionalWeekYearTokens && yl(r) && bl(r, n, e), !i?.useAdditionalDayOfYearTokens && vl(r) && bl(r, n, e);
		let o = r[0], c = Hu[o];
		if (c) {
			let { incompatibleTokens: n } = c;
			if (Array.isArray(n)) {
				let e = p.find((e) => n.includes(e.token) || e.token === o);
				if (e) throw RangeError(`The format string mustn't contain \`${e.fullToken}\` and \`${r}\` at the same time`);
			} else if (c.incompatibleTokens === "*" && p.length > 0) throw RangeError(`The format string mustn't contain \`${r}\` and any other token at the same time`);
			p.push({
				token: o,
				fullToken: r
			});
			let i = c.run(e, r, s.match, u);
			if (!i) return a();
			d.push(i.setter), e = i.rest;
		} else {
			if (o.match(Ju)) throw RangeError("Format string contains an unescaped latin alphabet character `" + o + "`");
			if (r === "''" ? r = "'" : o === "'" && (r = Xu(r)), e.indexOf(r) === 0) e = e.slice(r.length);
			else return a();
		}
	}
	if (e.length > 0 && qu.test(e)) return a();
	let m = d.map((e) => e.priority).sort((e, n) => n - e).filter((e, n, r) => r.indexOf(e) === n).map((e) => d.filter((n) => n.priority === e).sort((e, n) => n.subPriority - e.subPriority)).map((e) => e[0]), h = zn(r, i?.in);
	if (isNaN(+h)) return a();
	let g = {};
	for (let e of m) {
		if (!e.validate(h, u)) return a();
		let n = e.set(h, g, u);
		Array.isArray(n) ? (h = n[0], Object.assign(g, n[1])) : h = n;
	}
	return h;
}
function Xu(e) {
	return e.match(Gu)[1].replace(Ku, "'");
}
// node_modules/date-fns/isSameQuarter.js
function Zu(e, n, r) {
	let [i, a] = Gn(r?.in, e, n);
	return +Gc(i) == +Gc(a);
}
// node_modules/date-fns/subDays.js
function Qu(e, n, r) {
	return wc(e, -n, r);
}
// node_modules/date-fns/setMonth.js
function $u(e, n, r) {
	let i = zn(e, r?.in), a = i.getFullYear(), o = i.getDate(), s = Ln(r?.in || e, 0);
	s.setFullYear(a, n, 15), s.setHours(0, 0, 0, 0);
	let c = Al(s);
	return i.setMonth(n, Math.min(o, c)), i;
}
// node_modules/date-fns/set.js
function ed(e, n, r) {
	let i = zn(e, r?.in);
	return isNaN(+i) ? Ln(r?.in || e, NaN) : (n.year != null && i.setFullYear(n.year), n.month != null && (i = $u(i, n.month)), n.date != null && i.setDate(n.date), n.hours != null && i.setHours(n.hours), n.minutes != null && i.setMinutes(n.minutes), n.seconds != null && i.setSeconds(n.seconds), n.milliseconds != null && i.setMilliseconds(n.milliseconds), i);
}
// node_modules/date-fns/setHours.js
function td(e, n, r) {
	let i = zn(e, r?.in);
	return i.setHours(n), i;
}
// node_modules/date-fns/setMilliseconds.js
function nd(e, n, r) {
	let i = zn(e, r?.in);
	return i.setMilliseconds(n), i;
}
// node_modules/date-fns/setMinutes.js
function rd(e, n, r) {
	let i = zn(e, r?.in);
	return i.setMinutes(n), i;
}
// node_modules/date-fns/setSeconds.js
function id(e, n, r) {
	let i = zn(e, r?.in);
	return i.setSeconds(n), i;
}
// node_modules/date-fns/setYear.js
function ad(e, n, r) {
	let i = zn(e, r?.in);
	return isNaN(+i) ? Ln(r?.in || e, NaN) : (i.setFullYear(n), i);
}
// node_modules/date-fns/subMonths.js
function od(e, n, r) {
	return Tc(e, -n, r);
}
// node_modules/date-fns/sub.js
function sd(e, n, r) {
	let { years: i = 0, months: a = 0, weeks: o = 0, days: s = 0, hours: c = 0, minutes: l = 0, seconds: u = 0 } = n, d = Qu(od(e, a + i * 12, r), s + o * 7, r), f = (u + (l + c * 60) * 60) * 1e3;
	return Ln(r?.in || e, +d - f);
}
// node_modules/date-fns/subYears.js
function cd(e, n, r) {
	return Ic(e, -n, r);
}
// node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function ld() {
	let e = st();
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img",
		...e
	}, [
		n("path", { d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z" }),
		n("path", { d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }),
		n("path", { d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" }),
		n("path", { d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z" })
	]);
}
ld.compatConfig = { MODE: 3 };
function ud() {
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img"
	}, [n("path", { d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z" }), n("path", { d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" })]);
}
ud.compatConfig = { MODE: 3 };
function dd() {
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img"
	}, [n("path", { d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z" })]);
}
dd.compatConfig = { MODE: 3 };
function fd() {
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img"
	}, [n("path", { d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z" })]);
}
fd.compatConfig = { MODE: 3 };
function pd() {
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img"
	}, [n("path", { d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z" }), n("path", { d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z" })]);
}
pd.compatConfig = { MODE: 3 };
function md() {
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img"
	}, [n("path", { d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z" })]);
}
md.compatConfig = { MODE: 3 };
function hd() {
	return J(), H("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		fill: "currentColor",
		"aria-hidden": "true",
		class: "dp__icon",
		role: "img"
	}, [n("path", { d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z" })]);
}
hd.compatConfig = { MODE: 3 };
var gd = (e, n) => n ? new Date(e.toLocaleString("en-US", { timeZone: n })) : new Date(e), _d = (e, n, r) => yd(e, n, r) || Q(), vd = (e, n, r) => {
	let i = n.dateInTz ? gd(new Date(e), n.dateInTz) : Q(e);
	return r ? uf(i, !0) : i;
}, yd = (e, n, r) => {
	if (!e) return null;
	let i = r ? uf(Q(e), !0) : Q(e);
	return n ? n.exactMatch ? vd(e, n, r) : gd(i, n.timezone) : i;
}, bd = (e) => {
	let n = new Date(e.getFullYear(), 0, 1).getTimezoneOffset();
	return e.getTimezoneOffset() < n;
}, xd = (e, n) => {
	if (!e) return 0;
	let r = /* @__PURE__ */ new Date(), i = new Date(r.toLocaleString("en-US", { timeZone: "UTC" })), a = new Date(r.toLocaleString("en-US", { timeZone: e })), o = (bd(n ?? a) ? a : n ?? a).getTimezoneOffset() / 60;
	return (+i - a) / 36e5 - o;
}, Sd = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e))(Sd || {}), Cd = /* @__PURE__ */ ((e) => (e.top = "top", e.bottom = "bottom", e))(Cd || {}), wd = /* @__PURE__ */ ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(wd || {}), Td = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(Td || {}), Ed = [
	"timestamp",
	"date",
	"iso"
], Dd = /* @__PURE__ */ ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(Dd || {}), Od = /* @__PURE__ */ ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))(Od || {}), kd = /* @__PURE__ */ ((e) => (e.MONTH_AND_YEAR = "MM-yyyy", e.YEAR = "yyyy", e.DATE = "dd-MM-yyyy", e))(kd || {});
function Ad(e) {
	return (n) => {
		let r = new Intl.DateTimeFormat(e, {
			weekday: "short",
			timeZone: "UTC"
		}).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`));
		return e === "ar" ? r.slice(2, 5) : r.slice(0, 2);
	};
}
function jd(e) {
	return (n) => Dl(gd(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "UTC"), "EEEEEE", { locale: e });
}
var Md = (e, n, r) => {
	let i = [
		1,
		2,
		3,
		4,
		5,
		6,
		7
	], a;
	if (e !== null) try {
		a = i.map(jd(e));
	} catch {
		a = i.map(Ad(n));
	}
	else a = i.map(Ad(n));
	let o = a.slice(0, r), s = a.slice(r + 1, a.length);
	return [a[r]].concat(...s, ...o);
}, Nd = (e, n, r) => {
	let i = [];
	for (let r = +e[0]; r <= +e[1]; r++) i.push({
		value: +r,
		text: Zd(r, n)
	});
	return r ? i.reverse() : i;
}, Pd = (e, n, r) => {
	let i = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12
	].map((e) => {
		let n = e < 10 ? `0${e}` : e;
		return /* @__PURE__ */ new Date(`2017-${n}-01T00:00:00+00:00`);
	});
	if (e !== null) try {
		let n = r === "long" ? "LLLL" : "LLL";
		return i.map((r, i) => {
			let a = Dl(gd(r, "UTC"), n, { locale: e });
			return {
				text: a.charAt(0).toUpperCase() + a.substring(1),
				value: i
			};
		});
	} catch {}
	let a = new Intl.DateTimeFormat(n, {
		month: r,
		timeZone: "UTC"
	});
	return i.map((e, n) => {
		let r = a.format(e);
		return {
			text: r.charAt(0).toUpperCase() + r.substring(1),
			value: n
		};
	});
}, Fd = (e) => [
	12,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11
][e], Id = (e) => {
	let n = V(e);
	return n?.$el ? n?.$el : n;
}, Ld = (e) => ({
	type: "dot",
	...e ?? {}
}), Rd = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : !1, zd = {
	prop: (e) => `"${e}" prop must be enabled!`,
	dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
}, Bd = (e) => e, Vd = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e, Hd = (e) => e === null, Ud = (e) => {
	if (e) return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
}, Wd = (e) => {
	let n = [], r = (e) => e.filter((e) => e);
	for (let i = 0; i < e.length; i += 3) {
		let a = [
			e[i],
			e[i + 1],
			e[i + 2]
		];
		n.push(r(a));
	}
	return n;
}, Gd = (e, n, r) => {
	let i = r != null, a = n != null;
	if (!i && !a) return !1;
	let o = +r, s = +n;
	return i && a ? +e > o || +e < s : i ? +e > o : a ? +e < s : !1;
}, Kd = (e, n) => Wd(e).map((e) => e.map((e) => {
	let { active: r, disabled: i, isBetween: a, highlighted: o } = n(e);
	return {
		...e,
		active: r,
		disabled: i,
		className: {
			dp__overlay_cell_active: r,
			dp__overlay_cell: !r,
			dp__overlay_cell_disabled: i,
			dp__overlay_cell_pad: !0,
			dp__overlay_cell_active_disabled: i && r,
			dp__cell_in_between: a,
			"dp--highlighted": o
		}
	};
})), qd = (e, n, r = !1) => {
	e && n.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
}, Jd = () => "a[href], area[href], input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex='-1']), [data-datepicker-instance]";
function Yd(e, n) {
	let r = [...document.querySelectorAll(Jd())];
	r = r.filter((n) => !e.contains(n) || n.hasAttribute("data-datepicker-instance"));
	let i = r.indexOf(e);
	if (i >= 0 && (n ? i - 1 >= 0 : i + 1 <= r.length)) return r[i + (n ? -1 : 1)];
}
var Xd = (e, n) => e?.querySelector(`[data-dp-element="${n}"]`), Zd = (e, n) => new Intl.NumberFormat(n, {
	useGrouping: !1,
	style: "decimal"
}).format(e), Qd = (e, n) => Dl(e, n ?? kd.DATE), $d = (e) => Array.isArray(e), ef = (e, n, r) => n.get(Qd(e, r)), tf = (e, n) => e ? n ? n instanceof Map ? !!ef(e, n) : n(Q(e)) : !1 : !0, nf = (e, n, r = !1, i) => {
	if (e.key === Od.enter || e.key === Od.space) return r && e.preventDefault(), n();
	if (i) return i(e);
}, rf = () => "ontouchstart" in window || navigator.maxTouchPoints > 0, af = (e, n) => e ? kd.MONTH_AND_YEAR : n ? kd.YEAR : kd.DATE, of = (e) => e < 10 ? `0${e}` : e, sf = (e, n, r, i, a, o) => {
	let s = Yu(e, n.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: o });
	return zc(s) && Rc(s) ? i || a ? s : ed(s, {
		hours: +r.hours,
		minutes: +r?.minutes,
		seconds: +r?.seconds,
		milliseconds: 0
	}) : null;
}, cf = (e, n, r, i, a, o) => {
	let s = Array.isArray(r) ? r[0] : r;
	if (typeof n == "string") return sf(e, n, s, i, a, o);
	if (Array.isArray(n)) {
		let r = null;
		for (let c of n) if (r = sf(e, c, s, i, a, o), r) break;
		return r;
	}
	return typeof n == "function" ? n(e) : null;
}, Q = (e) => e ? new Date(e) : /* @__PURE__ */ new Date(), lf = (e, n, r) => {
	if (n) {
		let n = (e.getMonth() + 1).toString().padStart(2, "0"), i = e.getDate().toString().padStart(2, "0"), a = e.getHours().toString().padStart(2, "0"), o = e.getMinutes().toString().padStart(2, "0"), s = r ? e.getSeconds().toString().padStart(2, "0") : "00";
		return `${e.getFullYear()}-${n}-${i}T${a}:${o}:${s}.000Z`;
	}
	let i = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds());
	return new Date(i).toISOString();
}, uf = (e, n) => {
	let r = ed(Q(JSON.parse(JSON.stringify(e))), {
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0
	});
	return n ? qc(r) : r;
}, df = (e, n, r, i) => {
	let a = e ? Q(e) : Q();
	return (n || n === 0) && (a = td(a, +n)), (r || r === 0) && (a = rd(a, +r)), (i || i === 0) && (a = id(a, +i)), nd(a, 0);
}, ff = (e, n) => !e || !n ? !1 : zl(uf(e), uf(n)), pf = (e, n) => !e || !n ? !1 : Bl(uf(e), uf(n)), mf = (e, n) => !e || !n ? !1 : Rl(uf(e), uf(n)), hf = (e, n, r) => e?.[0] && e?.[1] ? mf(r, e[0]) && ff(r, e[1]) : e?.[0] && n ? mf(r, e[0]) && ff(r, n) || ff(r, e[0]) && mf(r, n) : !1, gf = (e) => uf(ed(new Date(e), { date: 1 })), _f = (e, n, r) => n && (r || r === 0) ? Object.fromEntries([
	"hours",
	"minutes",
	"seconds"
].map((i) => i === n ? [i, r] : [i, isNaN(+e[i]) ? void 0 : +e[i]])) : {
	hours: isNaN(+e.hours) ? void 0 : +e.hours,
	minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
	seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
}, vf = (e) => ({
	hours: Ml(e),
	minutes: Pl(e),
	seconds: Il(e)
}), yf = (e, n) => {
	if (n) {
		let r = Ll(Q(n));
		if (r > e) return 12;
		if (r === e) return Fl(Q(n));
	}
}, bf = (e, n) => {
	if (n) {
		let r = Ll(Q(n));
		return r < e ? -1 : r === e ? Fl(Q(n)) : void 0;
	}
}, xf = (e) => {
	if (e) return Ll(Q(e));
}, Sf = (e, n) => Wc({
	start: mf(e, n) ? n : e,
	end: mf(n, e) ? n : e
}), Cf = (e) => {
	let n = Tc(e, 1);
	return {
		month: Fl(n),
		year: Ll(n)
	};
}, wf = (e, n) => [Vn(e, { weekStartsOn: +n }), Xc(e, { weekStartsOn: +n })], Tf = (e, n) => {
	let r = {
		hours: Ml(Q()),
		minutes: Pl(Q()),
		seconds: n ? Il(Q()) : 0
	};
	return Object.assign(r, e);
}, Ef = (e, n, r) => [ed(Q(e), { date: 1 }), ed(Q(), {
	month: n,
	year: r,
	date: 1
})], Df = (e, n, r) => {
	let i = e ? Q(e) : Q();
	return (n || n === 0) && (i = $u(i, n)), r && (i = ad(i, r)), i;
}, Of = (e, n, r, i, a) => {
	if (!i || a && !n || !a && !r) return !1;
	let o = a ? Tc(e, 1) : od(e, 1), s = [Fl(o), Ll(o)];
	return a ? !Af(...s, n) : !kf(...s, r);
}, kf = (e, n, r) => ff(...Ef(r, e, n)) || pf(...Ef(r, e, n)), Af = (e, n, r) => mf(...Ef(r, e, n)) || pf(...Ef(r, e, n)), jf = (e, n, r, i, a, o, s) => {
	if (typeof n == "function" && !s) return n(e);
	let c = r ? { locale: r } : void 0;
	return Array.isArray(e) ? `${Dl(e[0], o, c)}${a && !e[1] ? "" : i}${e[1] ? Dl(e[1], o, c) : ""}` : Dl(e, o, c);
}, Mf = (e) => {
	if (e) return null;
	throw Error(zd.prop("partial-range"));
}, Nf = (e, n) => {
	if (n) return e();
	throw Error(zd.prop("range"));
}, Pf = (e) => Array.isArray(e) ? zc(e[0]) && (!e[1] || zc(e[1])) : e ? zc(e) : !1, Ff = (e, n) => ed(n ?? Q(), {
	hours: +e.hours || 0,
	minutes: +e.minutes || 0,
	seconds: +e.seconds || 0
}), If = (e, n, r, i) => {
	if (!e) return !0;
	if (i) {
		let i = r === "max" ? zl(e, n) : Rl(e, n), a = {
			seconds: 0,
			milliseconds: 0
		};
		return i || Bl(ed(e, a), ed(n, a));
	}
	return r === "max" ? e.getTime() <= n.getTime() : e.getTime() >= n.getTime();
}, Lf = (e, n, r) => e ? Ff(e, n) : Q(r ?? n), Rf = (e, n, r, i, a) => {
	if (Array.isArray(i)) {
		let o = Lf(e, i[0], n), s = Lf(e, i[1], n);
		return If(i[0], o, r, !!n) && If(i[1], s, r, !!n) && a;
	}
	return If(i, Lf(e, i, n), r, !!n) && a;
}, zf = (e) => ed(Q(), vf(e)), Bf = (e, n, r) => {
	if (e instanceof Map) {
		let i = `${of(r + 1)}-${n}`;
		return e.size ? e.has(i) : !1;
	}
	return typeof e == "function" && e(uf(ed(Q(), {
		month: r,
		year: n
	}), !0));
}, Vf = (e, n, r) => {
	if (e instanceof Map) {
		let i = `${of(r + 1)}-${n}`;
		return !e.size || e.has(i);
	}
	return !0;
}, Hf = (e, n, r) => typeof e == "function" ? e({
	month: n,
	year: r
}) : !!e.months.find((e) => e.month === n && e.year === r), Uf = (e, n) => typeof e == "function" ? e(n) : e.years.includes(n), Wf = (e) => `dp-${Dl(e, "yyyy-MM-dd")}`, Gf = (e, n) => ({
	before: Qu(uf(n), e),
	after: wc(uf(n), e)
}), Kf = (e, n) => n < +e[0] || n > +e[1], qf = ee({
	menuFocused: !1,
	shiftKeyInMenu: !1
}), Jf = () => ({
	control: M(() => ({
		shiftKeyInMenu: qf.shiftKeyInMenu,
		menuFocused: qf.menuFocused
	})),
	setMenuFocused: (e) => {
		qf.menuFocused = e;
	},
	setShiftKey: (e) => {
		qf.shiftKeyInMenu !== e && (qf.shiftKeyInMenu = e);
	}
}), Yf = ee({
	monthYear: [],
	calendar: [],
	time: [],
	actionRow: [],
	selectionGrid: [],
	timePicker: {
		0: [],
		1: []
	},
	monthPicker: []
}), Xf = W(null), Zf = W(!1), Qf = W(!1), $f = W(!1), ep = W(!1), tp = W(0), np = W(0), rp = () => {
	let e = M(() => Zf.value ? [...Yf.selectionGrid, Yf.actionRow].filter((e) => e.length) : Qf.value ? [
		...Yf.timePicker[0],
		...Yf.timePicker[1],
		ep.value ? [] : [Xf.value],
		Yf.actionRow
	].filter((e) => e.length) : $f.value ? [...Yf.monthPicker, Yf.actionRow] : [
		Yf.monthYear,
		...Yf.calendar,
		Yf.time,
		Yf.actionRow
	].filter((e) => e.length)), n = (n) => {
		tp.value = n ? tp.value + 1 : tp.value - 1;
		let r = null;
		e.value[np.value] && (r = e.value[np.value][tp.value]), !r && e.value[np.value + (n ? 1 : -1)] ? (np.value += n ? 1 : -1, tp.value = n ? 0 : e.value[np.value].length - 1) : r || (tp.value = n ? tp.value - 1 : tp.value + 1);
	}, r = (n) => {
		np.value === 0 && !n || np.value === e.value.length && n || (np.value = n ? np.value + 1 : np.value - 1, e.value[np.value] ? e.value[np.value] && !e.value[np.value][tp.value] && tp.value !== 0 && (tp.value = e.value[np.value].length - 1) : np.value = n ? np.value - 1 : np.value + 1);
	}, i = (n) => {
		let r = null;
		e.value[np.value] && (r = e.value[np.value][tp.value]), r ? r.focus({ preventScroll: !Zf.value }) : tp.value = n ? tp.value - 1 : tp.value + 1;
	}, a = () => {
		n(!0), i(!0);
	}, o = () => {
		n(!1), i(!1);
	}, s = () => {
		r(!1), i(!0);
	}, c = () => {
		r(!0), i(!0);
	}, l = (e, n) => {
		Yf[n] = e;
	}, u = (e, n) => {
		Yf[n] = e;
	}, d = () => {
		tp.value = 0, np.value = 0;
	};
	return {
		buildMatrix: l,
		buildMultiLevelMatrix: u,
		setTimePickerBackRef: (e) => {
			Xf.value = e;
		},
		setSelectionGrid: (e) => {
			Zf.value = e, d(), e || (Yf.selectionGrid = []);
		},
		setTimePicker: (e, n = !1) => {
			Qf.value = e, ep.value = n, d(), e || (Yf.timePicker[0] = [], Yf.timePicker[1] = []);
		},
		setTimePickerElements: (e, n = 0) => {
			Yf.timePicker[n] = e;
		},
		arrowRight: a,
		arrowLeft: o,
		arrowUp: s,
		arrowDown: c,
		clearArrowNav: () => {
			Yf.monthYear = [], Yf.calendar = [], Yf.time = [], Yf.actionRow = [], Yf.selectionGrid = [], Yf.timePicker[0] = [], Yf.timePicker[1] = [], Zf.value = !1, Qf.value = !1, ep.value = !1, $f.value = !1, d(), Xf.value = null;
		},
		setMonthPicker: (e) => {
			$f.value = e, d();
		},
		refSets: Yf
	};
}, ip = (e) => ({
	menuAppearTop: "dp-menu-appear-top",
	menuAppearBottom: "dp-menu-appear-bottom",
	open: "dp-slide-down",
	close: "dp-slide-up",
	next: "calendar-next",
	previous: "calendar-prev",
	vNext: "dp-slide-up",
	vPrevious: "dp-slide-down",
	...e ?? {}
}), ap = (e) => ({
	toggleOverlay: "Toggle overlay",
	menu: "Datepicker menu",
	input: "Datepicker input",
	openTimePicker: "Open time picker",
	closeTimePicker: "Close time Picker",
	incrementValue: (e) => `Increment ${e}`,
	decrementValue: (e) => `Decrement ${e}`,
	openTpOverlay: (e) => `Open ${e} overlay`,
	amPmButton: "Switch AM/PM mode",
	openYearsOverlay: "Open years overlay",
	openMonthsOverlay: "Open months overlay",
	nextMonth: "Next month",
	prevMonth: "Previous month",
	nextYear: "Next year",
	prevYear: "Previous year",
	day: void 0,
	weekDay: void 0,
	clearInput: "Clear value",
	calendarIcon: "Calendar icon",
	timePicker: "Time picker",
	monthPicker: (e) => `Month picker${e ? " overlay" : ""}`,
	yearPicker: (e) => `Year picker${e ? " overlay" : ""}`,
	timeOverlay: (e) => `${e} overlay`,
	...e ?? {}
}), op = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0, sp = (e) => {
	let n = typeof e == "object" && e, r = {
		static: !0,
		solo: !1
	};
	if (!e) return {
		...r,
		count: op(!1)
	};
	let i = n ? e : {}, a = op(n ? i.count ?? !0 : e);
	return Object.assign(r, i, { count: a });
}, cp = (e, n, r) => e || (typeof r == "string" ? r : n), lp = (e) => typeof e == "boolean" ? e ? ip({}) : !1 : ip(e), up = (e) => {
	let n = {
		enterSubmit: !0,
		tabSubmit: !0,
		openMenu: "open",
		selectOnFocus: !1,
		rangeSeparator: " - ",
		escClose: !0
	};
	return typeof e == "object" ? {
		...n,
		...e ?? {},
		enabled: !0
	} : {
		...n,
		enabled: e
	};
}, dp = (e) => ({
	months: [],
	years: [],
	times: {
		hours: [],
		minutes: [],
		seconds: []
	},
	...e ?? {}
}), fp = (e) => ({
	showSelect: !0,
	showCancel: !0,
	showNow: !1,
	showPreview: !0,
	...e ?? {}
}), pp = (e) => {
	let n = { input: !1 };
	return typeof e == "object" ? {
		...n,
		...e ?? {},
		enabled: !0
	} : {
		enabled: e,
		...n
	};
}, mp = (e) => ({
	allowStopPropagation: !0,
	closeOnScroll: !1,
	modeHeight: 255,
	allowPreventDefault: !1,
	closeOnClearValue: !0,
	closeOnAutoApply: !0,
	noSwipe: !1,
	keepActionRow: !1,
	onClickOutside: void 0,
	tabOutClosesMenu: !0,
	arrowLeft: void 0,
	keepViewOnOffsetClick: !1,
	timeArrowHoldThreshold: 0,
	shadowDom: !1,
	mobileBreakpoint: 600,
	setDateOnMenuClose: !1,
	...e ?? {}
}), hp = (e) => {
	let n = {
		dates: Array.isArray(e) ? e.map((e) => Q(e)) : [],
		years: [],
		months: [],
		quarters: [],
		weeks: [],
		weekdays: [],
		options: { highlightDisabled: !1 }
	};
	return typeof e == "function" ? e : {
		...n,
		...e ?? {}
	};
}, gp = (e) => typeof e == "object" ? {
	type: e?.type ?? "local",
	hideOnOffsetDates: e?.hideOnOffsetDates ?? !1
} : {
	type: e,
	hideOnOffsetDates: !1
}, _p = (e) => {
	let n = {
		noDisabledRange: !1,
		showLastInRange: !0,
		minMaxRawRange: !1,
		partialRange: !0,
		disableTimeRangeValidation: !1,
		maxRange: void 0,
		minRange: void 0,
		autoRange: void 0,
		fixedStart: !1,
		fixedEnd: !1
	};
	return typeof e == "object" ? {
		enabled: !0,
		...n,
		...e
	} : {
		enabled: e,
		...n
	};
}, vp = (e) => e ? typeof e == "string" ? {
	timezone: e,
	exactMatch: !1,
	dateInTz: void 0,
	emitTimezone: void 0,
	convertModel: !0
} : {
	timezone: e.timezone,
	exactMatch: e.exactMatch ?? !1,
	dateInTz: e.dateInTz ?? void 0,
	emitTimezone: e.emitTimezone ?? void 0,
	convertModel: e.convertModel ?? !0
} : {
	timezone: void 0,
	exactMatch: !1,
	emitTimezone: void 0
}, yp = (e, n, r, i) => new Map(e.map((e) => {
	let a = _d(e, n, i);
	return [Qd(a, r), a];
})), bp = (e, n) => e.length ? new Map(e.map((e) => [Qd(_d(e.date, n), kd.DATE), e])) : null, xp = (e) => {
	let n = af(e.isMonthPicker, e.isYearPicker);
	return {
		minDate: yd(e.minDate, e.timezone, e.isSpecific),
		maxDate: yd(e.maxDate, e.timezone, e.isSpecific),
		disabledDates: $d(e.disabledDates) ? yp(e.disabledDates, e.timezone, n, e.isSpecific) : e.disabledDates,
		allowedDates: $d(e.allowedDates) ? yp(e.allowedDates, e.timezone, n, e.isSpecific) : null,
		highlight: typeof e.highlight == "object" && $d(e.highlight?.dates) ? yp(e.highlight.dates, e.timezone, n) : e.highlight,
		markers: bp(e.markers, e.timezone)
	};
}, Sp = (e) => typeof e == "boolean" ? {
	enabled: e,
	dragSelect: !0,
	limit: null
} : {
	enabled: !!e,
	limit: e.limit ? +e.limit : null,
	dragSelect: e.dragSelect ?? !0
}, Cp = (e) => ({ ...Object.fromEntries(Object.keys(e).map((n) => {
	let r = n, i = e[r];
	return [n, typeof e[r] == "string" ? { [i]: !0 } : Object.fromEntries(i.map((e) => [e, !0]))];
})) }), wp = (e) => {
	let n = () => {
		let n = e.enableSeconds ? ":ss" : "", r = e.enableMinutes ? ":mm" : "";
		return e.is24 ? `HH${r}${n}` : `hh${r}${n} aa`;
	}, r = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? n() : e.weekPicker ? `${_.value?.type === "iso" ? "II" : "ww"}-RR` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${n()}` : "MM/dd/yyyy", i = (n) => Tf(n, e.enableSeconds), a = () => x.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [i(e.startTime[0]), i(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? i(e.startTime) : null, o = M(() => sp(e.multiCalendars)), s = M(() => a()), c = M(() => ap(e.ariaLabels)), l = M(() => dp(e.filters)), u = M(() => lp(e.transitions)), d = M(() => fp(e.actionRow)), f = M(() => cp(e.previewFormat, e.format, r())), p = M(() => up(e.textInput)), m = M(() => pp(e.inline)), h = M(() => mp(e.config)), g = M(() => hp(e.highlight)), _ = M(() => gp(e.weekNumbers)), v = M(() => vp(e.timezone)), y = M(() => Sp(e.multiDates)), b = M(() => xp({
		minDate: e.minDate,
		maxDate: e.maxDate,
		disabledDates: e.disabledDates,
		allowedDates: e.allowedDates,
		highlight: g.value,
		markers: e.markers,
		timezone: v.value,
		isSpecific: e.monthPicker || e.yearPicker || e.quarterPicker,
		isMonthPicker: e.monthPicker,
		isYearPicker: e.yearPicker
	})), x = M(() => _p(e.range));
	return {
		defaultedTransitions: u,
		defaultedMultiCalendars: o,
		defaultedStartTime: s,
		defaultedAriaLabels: c,
		defaultedFilters: l,
		defaultedActionRow: d,
		defaultedPreviewFormat: f,
		defaultedTextInput: p,
		defaultedInline: m,
		defaultedConfig: h,
		defaultedHighlight: g,
		defaultedWeekNumbers: _,
		defaultedRange: x,
		propDates: b,
		defaultedTz: v,
		defaultedMultiDates: y,
		defaultedUI: M(() => Cp(e.ui)),
		getDefaultPattern: r,
		getDefaultStartTime: a,
		handleEventPropagation: (e) => {
			h.value.allowStopPropagation && e.stopPropagation(), h.value.allowPreventDefault && e.preventDefault();
		}
	};
}, Tp = (e, n, { isInputFocused: r, isTextInputDate: i }) => {
	let a = W(), { defaultedTextInput: o, defaultedRange: s, defaultedTz: c, defaultedMultiDates: l, getDefaultPattern: u } = wp(n), d = W(""), f = fe(n, "format"), p = fe(n, "formatLocale");
	v(a, () => {
		typeof n.onInternalModelChange == "function" && e("internal-model-change", a.value, pe(!0));
	}, { deep: !0 }), v(s, (e, n) => {
		e.enabled !== n.enabled && (a.value = null);
	}), v(f, () => {
		oe();
	});
	let m = (e) => c.value.timezone && c.value.convertModel ? gd(e, c.value.timezone) : e, h = (e) => c.value.timezone && c.value.convertModel ? Oc(e, xd(c.value.timezone, e)) : e, g = (e, r, i = !1) => jf(e, n.format, n.formatLocale, o.value.rangeSeparator, n.modelAuto, r ?? u(), i), _ = (e) => e ? n.modelType ? ce(e) : {
		hours: Ml(e),
		minutes: Pl(e),
		seconds: n.enableSeconds ? Il(e) : 0
	} : null, y = (e) => n.modelType ? ce(e) : {
		month: Fl(e),
		year: Ll(e)
	}, b = (e) => Array.isArray(e) ? l.value.enabled ? e.map((e) => x(e, ad(Q(), e))) : Nf(() => [ad(Q(), e[0]), e[1] ? ad(Q(), e[1]) : Mf(s.value.partialRange)], s.value.enabled) : ad(Q(), +e), x = (e, r) => (typeof e == "string" || typeof e == "number") && n.modelType ? se(e) : r, S = (e) => Array.isArray(e) ? [x(e[0], df(null, +e[0].hours, +e[0].minutes, e[0].seconds)), x(e[1], df(null, +e[1].hours, +e[1].minutes, e[1].seconds))] : x(e, df(null, e.hours, e.minutes, e.seconds)), C = (e) => {
		let n = ed(Q(), { date: 1 });
		return Array.isArray(e) ? l.value.enabled ? e.map((e) => x(e, Df(n, +e.month, +e.year))) : Nf(() => [x(e[0], Df(n, +e[0].month, +e[0].year)), x(e[1], e[1] ? Df(n, +e[1].month, +e[1].year) : Mf(s.value.partialRange))], s.value.enabled) : x(e, Df(n, +e.month, +e.year));
	}, w = (e) => {
		if (Array.isArray(e)) return e.map((e) => se(e));
		throw Error(zd.dateArr("multi-dates"));
	}, T = (e) => {
		if (Array.isArray(e) && s.value.enabled) {
			let n = e[0], r = e[1];
			return [Q(Array.isArray(n) ? n[0] : null), Array.isArray(r) && r.length ? Q(r[0]) : null];
		}
		return Q(e[0]);
	}, E = (e) => n.modelAuto ? Array.isArray(e) ? [se(e[0]), se(e[1])] : n.autoApply ? [se(e)] : [se(e), null] : Array.isArray(e) ? Nf(() => e[1] ? [se(e[0]), e[1] ? se(e[1]) : Mf(s.value.partialRange)] : [se(e[0])], s.value.enabled) : se(e), D = () => {
		Array.isArray(a.value) && s.value.enabled && a.value.length === 1 && a.value.push(Mf(s.value.partialRange));
	}, O = () => {
		let e = a.value;
		return [ce(e[0]), e[1] ? ce(e[1]) : Mf(s.value.partialRange)];
	}, k = () => Array.isArray(a.value) ? a.value[1] ? O() : ce(Bd(a.value[0])) : [], ee = () => (a.value || []).map((e) => ce(e)), te = (e = !1) => (e || D(), n.modelAuto ? k() : l.value.enabled ? ee() : Array.isArray(a.value) ? Nf(() => O(), s.value.enabled) : ce(Bd(a.value))), ne = (e) => !e || Array.isArray(e) && !e.length ? null : n.timePicker ? S(Bd(e)) : n.monthPicker ? C(Bd(e)) : n.yearPicker ? b(Bd(e)) : l.value.enabled ? w(Bd(e)) : n.weekPicker ? T(Bd(e)) : E(Bd(e)), re = (e) => {
		if (i.value) return;
		let n = ne(e);
		Pf(Bd(n)) ? (a.value = Bd(n), oe()) : (a.value = null, d.value = "");
	}, A = () => {
		let e = (e) => Dl(e, o.value.format);
		return `${e(a.value[0])} ${o.value.rangeSeparator} ${a.value[1] ? e(a.value[1]) : ""}`;
	}, ie = () => r.value && a.value ? Array.isArray(a.value) ? A() : Dl(a.value, o.value.format) : g(a.value), ae = () => a.value ? l.value.enabled ? a.value.map((e) => g(e)).join("; ") : o.value.enabled && typeof o.value.format == "string" ? ie() : g(a.value) : "", oe = () => {
		!n.format || typeof n.format == "string" || o.value.enabled && typeof o.value.format == "string" ? d.value = ae() : d.value = n.format(a.value);
	}, se = (e) => {
		if (n.utc) {
			let r = new Date(e);
			return n.utc === "preserve" ? new Date(r.getTime() + r.getTimezoneOffset() * 6e4) : r;
		}
		return n.modelType ? Ed.includes(n.modelType) ? m(new Date(e)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? m(Yu(e, u(), /* @__PURE__ */ new Date(), { locale: p.value })) : m(Yu(e, n.modelType, /* @__PURE__ */ new Date(), { locale: p.value })) : m(new Date(e));
	}, ce = (e) => e ? n.utc ? lf(e, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +h(e) : n.modelType === "iso" ? h(e).toISOString() : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? g(h(e)) : g(h(e), n.modelType, !0) : h(e) : "", le = (n, r = !1, i = !1) => {
		if (i) return n;
		e("update:model-value", n), c.value.emitTimezone && r && e("update:model-timezone-value", Array.isArray(n) ? n.map((e) => gd(Bd(e), c.value.emitTimezone)) : gd(Bd(n), c.value.emitTimezone));
	}, j = (e) => Array.isArray(a.value) ? l.value.enabled ? a.value.map((n) => e(n)) : [e(a.value[0]), a.value[1] ? e(a.value[1]) : Mf(s.value.partialRange)] : e(Bd(a.value)), ue = () => {
		if (Array.isArray(a.value)) {
			let e = wf(a.value[0], n.weekStart), r = a.value[1] ? wf(a.value[1], n.weekStart) : [];
			return [e.map((e) => Q(e)), r.map((e) => Q(e))];
		}
		return wf(a.value, n.weekStart).map((e) => Q(e));
	}, de = (e, n) => le(Bd(j(e)), !1, n), M = (n) => {
		let r = ue();
		return n ? r : e("update:model-value", ue());
	}, pe = (e = !1) => (e || oe(), n.monthPicker ? de(y, e) : n.timePicker ? de(_, e) : n.yearPicker ? de(Ll, e) : n.weekPicker ? M(e) : le(te(e), !0, e));
	return {
		inputValue: d,
		internalModelValue: a,
		checkBeforeEmit: () => a.value ? s.value.enabled ? s.value.partialRange ? a.value.length >= 1 : a.value.length === 2 : !!a.value : !1,
		parseExternalModelValue: re,
		formatInputValue: oe,
		emitModelValue: pe
	};
}, Ep = (e, n) => {
	let { defaultedFilters: r, propDates: i } = wp(e), { validateMonthYearInRange: a } = nh(e), o = (e, n) => {
		let i = e;
		return r.value.months.includes(Fl(i)) ? (i = n ? Tc(e, 1) : od(e, 1), o(i, n)) : i;
	}, s = (e, n) => {
		let i = e;
		return r.value.years.includes(Ll(i)) ? (i = n ? Ic(e, 1) : cd(e, 1), s(i, n)) : i;
	}, c = (n, i = !1) => {
		let c = ed(Q(), {
			month: e.month,
			year: e.year
		}), u = n ? Tc(c, 1) : od(c, 1);
		e.disableYearSelect && (u = ad(u, e.year));
		let d = Fl(u), f = Ll(u);
		r.value.months.includes(d) && (u = o(u, n), d = Fl(u), f = Ll(u)), r.value.years.includes(f) && (u = s(u, n), f = Ll(u)), a(d, f, n, e.preventMinMaxNavigation) && l(d, f, i);
	}, l = (e, r, i) => {
		n("update-month-year", {
			month: e,
			year: r,
			fromNav: i
		});
	};
	return {
		handleMonthYearChange: c,
		isDisabled: M(() => (n) => Of(ed(Q(), {
			month: e.month,
			year: e.year
		}), i.value.maxDate, i.value.minDate, e.preventMinMaxNavigation, n)),
		updateMonthYear: l
	};
}, Dp = {
	multiCalendars: {
		type: [
			Boolean,
			Number,
			String,
			Object
		],
		default: void 0
	},
	modelValue: {
		type: [
			String,
			Date,
			Array,
			Object,
			Number
		],
		default: null
	},
	modelType: {
		type: String,
		default: null
	},
	position: {
		type: String,
		default: "center"
	},
	dark: {
		type: Boolean,
		default: !1
	},
	format: {
		type: [String, Function],
		default: () => null
	},
	autoPosition: {
		type: [Boolean, String],
		default: !0
	},
	altPosition: {
		type: Function,
		default: null
	},
	transitions: {
		type: [Boolean, Object],
		default: !0
	},
	formatLocale: {
		type: Object,
		default: null
	},
	utc: {
		type: [Boolean, String],
		default: !1
	},
	ariaLabels: {
		type: Object,
		default: () => ({})
	},
	offset: {
		type: [Number, String],
		default: 10
	},
	hideNavigation: {
		type: Array,
		default: () => []
	},
	timezone: {
		type: [String, Object],
		default: null
	},
	vertical: {
		type: Boolean,
		default: !1
	},
	disableMonthYearSelect: {
		type: Boolean,
		default: !1
	},
	disableYearSelect: {
		type: Boolean,
		default: !1
	},
	dayClass: {
		type: Function,
		default: null
	},
	yearRange: {
		type: Array,
		default: () => [1900, 2100]
	},
	enableTimePicker: {
		type: Boolean,
		default: !0
	},
	autoApply: {
		type: Boolean,
		default: !1
	},
	disabledDates: {
		type: [Array, Function],
		default: () => []
	},
	monthNameFormat: {
		type: String,
		default: "short"
	},
	startDate: {
		type: [Date, String],
		default: null
	},
	startTime: {
		type: [Object, Array],
		default: null
	},
	hideOffsetDates: {
		type: Boolean,
		default: !1
	},
	noToday: {
		type: Boolean,
		default: !1
	},
	disabledWeekDays: {
		type: Array,
		default: () => []
	},
	allowedDates: {
		type: Array,
		default: null
	},
	nowButtonLabel: {
		type: String,
		default: "Now"
	},
	markers: {
		type: Array,
		default: () => []
	},
	escClose: {
		type: Boolean,
		default: !0
	},
	spaceConfirm: {
		type: Boolean,
		default: !0
	},
	monthChangeOnArrows: {
		type: Boolean,
		default: !0
	},
	presetDates: {
		type: Array,
		default: () => []
	},
	flow: {
		type: Array,
		default: () => []
	},
	partialFlow: {
		type: Boolean,
		default: !1
	},
	preventMinMaxNavigation: {
		type: Boolean,
		default: !1
	},
	reverseYears: {
		type: Boolean,
		default: !1
	},
	weekPicker: {
		type: Boolean,
		default: !1
	},
	filters: {
		type: Object,
		default: () => ({})
	},
	arrowNavigation: {
		type: Boolean,
		default: !1
	},
	highlight: {
		type: [Function, Object],
		default: null
	},
	teleport: {
		type: [
			Boolean,
			String,
			Object
		],
		default: null
	},
	teleportCenter: {
		type: Boolean,
		default: !1
	},
	locale: {
		type: String,
		default: "en-Us"
	},
	weekNumName: {
		type: String,
		default: "W"
	},
	weekStart: {
		type: [Number, String],
		default: 1
	},
	weekNumbers: {
		type: [
			String,
			Function,
			Object
		],
		default: null
	},
	monthChangeOnScroll: {
		type: [Boolean, String],
		default: !0
	},
	dayNames: {
		type: [Function, Array],
		default: null
	},
	monthPicker: {
		type: Boolean,
		default: !1
	},
	customProps: {
		type: Object,
		default: null
	},
	yearPicker: {
		type: Boolean,
		default: !1
	},
	modelAuto: {
		type: Boolean,
		default: !1
	},
	selectText: {
		type: String,
		default: "Select"
	},
	cancelText: {
		type: String,
		default: "Cancel"
	},
	previewFormat: {
		type: [String, Function],
		default: () => ""
	},
	multiDates: {
		type: [Object, Boolean],
		default: !1
	},
	ignoreTimeValidation: {
		type: Boolean,
		default: !1
	},
	minDate: {
		type: [Date, String],
		default: null
	},
	maxDate: {
		type: [Date, String],
		default: null
	},
	minTime: {
		type: Object,
		default: null
	},
	maxTime: {
		type: Object,
		default: null
	},
	name: {
		type: String,
		default: null
	},
	placeholder: {
		type: String,
		default: ""
	},
	hideInputIcon: {
		type: Boolean,
		default: !1
	},
	clearable: {
		type: Boolean,
		default: !0
	},
	alwaysClearable: {
		type: Boolean,
		default: !1
	},
	state: {
		type: Boolean,
		default: null
	},
	required: {
		type: Boolean,
		default: !1
	},
	autocomplete: {
		type: String,
		default: "off"
	},
	timePicker: {
		type: Boolean,
		default: !1
	},
	enableSeconds: {
		type: Boolean,
		default: !1
	},
	is24: {
		type: Boolean,
		default: !0
	},
	noHoursOverlay: {
		type: Boolean,
		default: !1
	},
	noMinutesOverlay: {
		type: Boolean,
		default: !1
	},
	noSecondsOverlay: {
		type: Boolean,
		default: !1
	},
	hoursGridIncrement: {
		type: [String, Number],
		default: 1
	},
	minutesGridIncrement: {
		type: [String, Number],
		default: 5
	},
	secondsGridIncrement: {
		type: [String, Number],
		default: 5
	},
	hoursIncrement: {
		type: [Number, String],
		default: 1
	},
	minutesIncrement: {
		type: [Number, String],
		default: 1
	},
	secondsIncrement: {
		type: [Number, String],
		default: 1
	},
	range: {
		type: [Boolean, Object],
		default: !1
	},
	uid: {
		type: String,
		default: null
	},
	disabled: {
		type: Boolean,
		default: !1
	},
	readonly: {
		type: Boolean,
		default: !1
	},
	inline: {
		type: [Boolean, Object],
		default: !1
	},
	textInput: {
		type: [Boolean, Object],
		default: !1
	},
	sixWeeks: {
		type: [Boolean, String],
		default: !1
	},
	actionRow: {
		type: Object,
		default: () => ({})
	},
	focusStartDate: {
		type: Boolean,
		default: !1
	},
	disabledTimes: {
		type: [Function, Array],
		default: void 0
	},
	timePickerInline: {
		type: Boolean,
		default: !1
	},
	calendar: {
		type: Function,
		default: null
	},
	config: {
		type: Object,
		default: void 0
	},
	quarterPicker: {
		type: Boolean,
		default: !1
	},
	yearFirst: {
		type: Boolean,
		default: !1
	},
	loading: {
		type: Boolean,
		default: !1
	},
	onInternalModelChange: {
		type: [Function, Object],
		default: null
	},
	enableMinutes: {
		type: Boolean,
		default: !0
	},
	ui: {
		type: Object,
		default: () => ({})
	}
}, Op = {
	...Dp,
	shadow: {
		type: Boolean,
		default: !1
	},
	flowStep: {
		type: Number,
		default: 0
	},
	internalModelValue: {
		type: [Date, Array],
		default: null
	},
	noOverlayFocus: {
		type: Boolean,
		default: !1
	},
	collapse: {
		type: Boolean,
		default: !1
	},
	menuWrapRef: {
		type: Object,
		default: null
	},
	getInputRect: {
		type: Function,
		default: () => ({})
	},
	isTextInputDate: {
		type: Boolean,
		default: !1
	},
	isMobile: {
		type: Boolean,
		default: void 0
	}
}, kp = ["title"], Ap = ["disabled"], jp = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "ActionRow",
	props: {
		menuMount: {
			type: Boolean,
			default: !1
		},
		calendarWidth: {
			type: Number,
			default: 0
		},
		...Op
	},
	emits: [
		"close-picker",
		"select-date",
		"select-now",
		"invalid-select"
	],
	setup(e, { emit: r }) {
		let i = r, a = e, { defaultedActionRow: o, defaultedPreviewFormat: s, defaultedMultiCalendars: c, defaultedTextInput: l, defaultedInline: u, defaultedRange: d, defaultedMultiDates: f } = wp(a), { isTimeValid: p, isMonthValid: m } = nh(a), { buildMatrix: h } = rp(), g = W(null), _ = W(null), v = W(!1), y = W({}), b = W(null), x = W(null);
		It(() => {
			a.arrowNavigation && h([Id(g), Id(_)], "actionRow"), S(), window.addEventListener("resize", S);
		}), Ie(() => {
			window.removeEventListener("resize", S);
		});
		let S = () => {
			v.value = !1, setTimeout(() => {
				let e = b.value?.getBoundingClientRect(), n = x.value?.getBoundingClientRect();
				e && n && (y.value.maxWidth = `${n.width - e.width - 20}px`), v.value = !0;
			}, 0);
		}, C = M(() => d.value.enabled && !d.value.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : !0), w = M(() => !p.value(a.internalModelValue) || !m.value(a.internalModelValue) || !C.value), T = () => {
			let e = s.value;
			return a.timePicker || a.monthPicker, e(Bd(a.internalModelValue));
		}, E = () => {
			let e = a.internalModelValue;
			return c.value.count > 0 ? `${D(e[0])} - ${D(e[1])}` : [D(e[0]), D(e[1])];
		}, D = (e) => jf(e, s.value, a.formatLocale, l.value.rangeSeparator, a.modelAuto, s.value), O = M(() => !a.internalModelValue || !a.menuMount ? "" : typeof s.value == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? E() : f.value.enabled ? a.internalModelValue.map((e) => `${D(e)}`) : a.modelAuto ? `${D(a.internalModelValue[0])}` : `${D(a.internalModelValue[0])} -` : D(a.internalModelValue) : T()), k = () => f.value.enabled ? "; " : " - ", ee = M(() => Array.isArray(O.value) ? O.value.join(k()) : O.value), te = () => {
			p.value(a.internalModelValue) && m.value(a.internalModelValue) && C.value ? i("select-date") : i("invalid-select");
		};
		return (e, r) => (J(), H("div", {
			ref_key: "actionRowRef",
			ref: x,
			class: "dp__action_row"
		}, [e.$slots["action-row"] ? q(e.$slots, "action-row", nt(B({ key: 0 }, {
			internalModelValue: e.internalModelValue,
			disabled: w.value,
			selectDate: () => e.$emit("select-date"),
			closePicker: () => e.$emit("close-picker")
		}))) : (J(), H(F, { key: 1 }, [V(o).showPreview ? (J(), H("div", {
			key: 0,
			class: "dp__selection_preview",
			title: ee.value,
			style: Pe(y.value)
		}, [e.$slots["action-preview"] && v.value ? q(e.$slots, "action-preview", {
			key: 0,
			value: e.internalModelValue
		}) : K("", !0), !e.$slots["action-preview"] && v.value ? (J(), H(F, { key: 1 }, [z(U(ee.value), 1)], 64)) : K("", !0)], 12, kp)) : K("", !0), n("div", {
			ref_key: "actionBtnContainer",
			ref: b,
			class: "dp__action_buttons",
			"data-dp-element": "action-row"
		}, [e.$slots["action-buttons"] ? q(e.$slots, "action-buttons", {
			key: 0,
			value: e.internalModelValue
		}) : K("", !0), e.$slots["action-buttons"] ? K("", !0) : (J(), H(F, { key: 1 }, [
			!V(u).enabled && V(o).showCancel ? (J(), H("button", {
				key: 0,
				ref_key: "cancelButtonRef",
				ref: g,
				type: "button",
				class: "dp__action_button dp__action_cancel",
				onClick: r[0] ||= (n) => e.$emit("close-picker"),
				onKeydown: r[1] ||= (n) => V(nf)(n, () => e.$emit("close-picker"))
			}, U(e.cancelText), 545)) : K("", !0),
			V(o).showNow ? (J(), H("button", {
				key: 1,
				type: "button",
				class: "dp__action_button dp__action_cancel",
				onClick: r[2] ||= (n) => e.$emit("select-now"),
				onKeydown: r[3] ||= (n) => V(nf)(n, () => e.$emit("select-now"))
			}, U(e.nowButtonLabel), 33)) : K("", !0),
			V(o).showSelect ? (J(), H("button", {
				key: 2,
				ref_key: "selectButtonRef",
				ref: _,
				type: "button",
				class: "dp__action_button dp__action_select",
				disabled: w.value,
				"data-test-id": "select-button",
				onKeydown: r[4] ||= (e) => V(nf)(e, () => te()),
				onClick: te
			}, U(e.selectText), 41, Ap)) : K("", !0)
		], 64))], 512)], 64))], 512));
	}
}), Mp = [
	"role",
	"aria-label",
	"tabindex"
], Np = { class: "dp__selection_grid_header" }, Pp = [
	"aria-selected",
	"aria-disabled",
	"data-test-id",
	"onClick",
	"onKeydown",
	"onMouseover"
], Fp = ["aria-label"], Ip = /* @__PURE__ */ xt({
	__name: "SelectionOverlay",
	props: {
		items: {},
		type: {},
		isLast: { type: Boolean },
		arrowNavigation: { type: Boolean },
		skipButtonRef: { type: Boolean },
		headerRefs: {},
		hideNavigation: {},
		escClose: { type: Boolean },
		useRelative: { type: Boolean },
		height: {},
		textInput: { type: [Boolean, Object] },
		config: {},
		noOverlayFocus: { type: Boolean },
		focusValue: {},
		menuWrapRef: {},
		ariaLabels: {},
		overlayLabel: {}
	},
	emits: [
		"selected",
		"toggle",
		"reset-flow",
		"hover-value"
	],
	setup(e, { expose: r, emit: i }) {
		let { setSelectionGrid: a, buildMultiLevelMatrix: o, setMonthPicker: s } = rp(), c = i, l = e, { defaultedAriaLabels: d, defaultedTextInput: f, defaultedConfig: p, handleEventPropagation: m } = wp(l), { hideNavigationButtons: h } = rh(), g = W(!1), _ = W(null), y = W(null), b = W([]), x = W(), S = W(null), C = W(0), w = W(null);
		At(() => {
			_.value = null;
		}), It(() => {
			$e().then(() => A()), l.noOverlayFocus || E(), T(!0);
		}), Ie(() => T(!1));
		let T = (e) => {
			l.arrowNavigation && (l.headerRefs?.length ? s(e) : a(e));
		}, E = () => {
			let e = Id(y);
			e && (f.value.enabled || (_.value ? _.value?.focus({ preventScroll: !0 }) : e.focus({ preventScroll: !0 })), g.value = e.clientHeight < e.scrollHeight);
		}, O = M(() => ({
			dp__overlay: !0,
			"dp--overlay-absolute": !l.useRelative,
			"dp--overlay-relative": l.useRelative
		})), ee = M(() => l.useRelative ? {
			height: `${l.height}px`,
			width: "var(--dp-menu-min-width)"
		} : void 0), te = M(() => ({ dp__overlay_col: !0 })), ne = M(() => ({
			dp__btn: !0,
			dp__button: !0,
			dp__overlay_action: !0,
			dp__over_action_scroll: g.value,
			dp__button_bottom: l.isLast
		})), re = M(() => ({
			dp__overlay_container: !0,
			dp__container_flex: l.items?.length <= 6,
			dp__container_block: l.items?.length > 6
		}));
		v(() => l.items, () => A(!1), { deep: !0 });
		let A = (e = !0) => {
			$e().then(() => {
				let n = Id(_), r = Id(y), i = Id(S), a = Id(w), o = i ? i.getBoundingClientRect().height : 0;
				r && (r.getBoundingClientRect().height ? C.value = r.getBoundingClientRect().height - o : C.value = p.value.modeHeight - o), n && a && e && (a.scrollTop = n.offsetTop - a.offsetTop - (C.value / 2 - n.getBoundingClientRect().height) - o);
			});
		}, ie = (e) => {
			e.disabled || c("selected", e.value);
		}, ae = () => {
			c("toggle"), c("reset-flow");
		}, oe = (e) => {
			l.escClose && (ae(), m(e));
		}, se = (e, n, r, i) => {
			e && ((n.active || n.value === l.focusValue) && (_.value = e), l.arrowNavigation && (Array.isArray(b.value[r]) ? b.value[r][i] = e : b.value[r] = [e], ce()));
		}, ce = () => {
			let e = l.headerRefs?.length ? [l.headerRefs].concat(b.value) : b.value.concat([l.skipButtonRef ? [] : [S.value]]);
			o(Bd(e), l.headerRefs?.length ? "monthPicker" : "selectionGrid");
		}, le = (e) => {
			l.arrowNavigation || qd(e, p.value, !0);
		}, j = (e) => {
			x.value = e, c("hover-value", e);
		}, ue = () => {
			if (ae(), !l.isLast) {
				let e = Xd(l.menuWrapRef ?? null, "action-row");
				e && Ud(e)?.focus();
			}
		}, de = (e) => {
			switch (e.key) {
				case Od.esc: return oe(e);
				case Od.arrowLeft: return le(e);
				case Od.arrowRight: return le(e);
				case Od.arrowUp: return le(e);
				case Od.arrowDown: return le(e);
				default: return;
			}
		}, fe = (e) => {
			if (e.key === Od.enter) return ae();
			if (e.key === Od.tab) return ue();
		};
		return r({ focusGrid: E }), (r, i) => (J(), H("div", {
			ref_key: "gridWrapRef",
			ref: y,
			class: G(O.value),
			style: Pe(ee.value),
			role: e.useRelative ? void 0 : "dialog",
			"aria-label": e.overlayLabel,
			tabindex: e.useRelative ? void 0 : "0",
			onKeydown: de,
			onClick: i[0] ||= D(() => {}, ["prevent"])
		}, [n("div", {
			ref_key: "containerRef",
			ref: w,
			class: G(re.value),
			style: Pe({ "--dp-overlay-height": `${C.value}px` }),
			role: "grid"
		}, [n("div", Np, [q(r.$slots, "header")]), r.$slots.overlay ? q(r.$slots, "overlay", { key: 0 }) : (J(!0), H(F, { key: 1 }, u(e.items, (i, a) => (J(), H("div", {
			key: a,
			class: G(["dp__overlay_row", { dp__flex_row: e.items.length >= 3 }]),
			role: "row"
		}, [(J(!0), H(F, null, u(i, (e, i) => (J(), H("div", {
			key: e.value,
			ref_for: !0,
			ref: (n) => se(n, e, a, i),
			role: "gridcell",
			class: G(te.value),
			"aria-selected": e.active || void 0,
			"aria-disabled": e.disabled || void 0,
			tabindex: "0",
			"data-test-id": e.text,
			onClick: D((n) => ie(e), ["prevent"]),
			onKeydown: (n) => V(nf)(n, () => ie(e), !0),
			onMouseover: (n) => j(e.value)
		}, [n("div", { class: G(e.className) }, [r.$slots.item ? q(r.$slots, "item", {
			key: 0,
			item: e
		}) : K("", !0), r.$slots.item ? K("", !0) : (J(), H(F, { key: 1 }, [z(U(e.text), 1)], 64))], 2)], 42, Pp))), 128))], 2))), 128))], 6), r.$slots["button-icon"] ? N((J(), H("button", {
			key: 0,
			ref_key: "toggleButton",
			ref: S,
			type: "button",
			"aria-label": V(d)?.toggleOverlay,
			class: G(ne.value),
			tabindex: "0",
			onClick: ae,
			onKeydown: fe
		}, [q(r.$slots, "button-icon")], 42, Fp)), [[k, !V(h)(e.hideNavigation, e.type)]]) : K("", !0)], 46, Mp));
	}
}), Lp = ["data-dp-mobile"], Rp = /* @__PURE__ */ xt({
	__name: "InstanceWrap",
	props: {
		multiCalendars: {},
		stretch: { type: Boolean },
		collapse: { type: Boolean },
		isMobile: { type: Boolean }
	},
	setup(e) {
		let n = e, r = M(() => n.multiCalendars > 0 ? [...Array(n.multiCalendars).keys()] : [0]), i = M(() => ({ dp__instance_calendar: n.multiCalendars > 0 }));
		return (n, a) => (J(), H("div", {
			class: G({
				dp__menu_inner: !e.stretch,
				"dp--menu--inner-stretched": e.stretch,
				dp__flex_display: e.multiCalendars > 0,
				"dp--flex-display-collapsed": e.collapse
			}),
			"data-dp-mobile": e.isMobile
		}, [(J(!0), H(F, null, u(r.value, (e, r) => (J(), H("div", {
			key: e,
			class: G(i.value)
		}, [q(n.$slots, "default", {
			instance: e,
			index: r
		})], 2))), 128))], 10, Lp));
	}
}), zp = [
	"data-dp-element",
	"aria-label",
	"aria-disabled"
], Bp = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "ArrowBtn",
	props: {
		ariaLabel: {},
		elName: {},
		disabled: { type: Boolean }
	},
	emits: ["activate", "set-ref"],
	setup(e, { emit: r }) {
		let i = r, a = W(null);
		return It(() => i("set-ref", a)), (r, o) => (J(), H("button", {
			ref_key: "elRef",
			ref: a,
			type: "button",
			"data-dp-element": e.elName,
			class: "dp__btn dp--arrow-btn-nav",
			tabindex: "0",
			"aria-label": e.ariaLabel,
			"aria-disabled": e.disabled || void 0,
			onClick: o[0] ||= (e) => i("activate"),
			onKeydown: o[1] ||= (e) => V(nf)(e, () => i("activate"), !0)
		}, [n("span", { class: G(["dp__inner_nav", { dp__inner_nav_disabled: e.disabled }]) }, [q(r.$slots, "default")], 2)], 40, zp));
	}
}), Vp = ["aria-label", "data-test-id"], Hp = /* @__PURE__ */ xt({
	__name: "YearModePicker",
	props: {
		...Op,
		showYearPicker: {
			type: Boolean,
			default: !1
		},
		items: {
			type: Array,
			default: () => []
		},
		instance: {
			type: Number,
			default: 0
		},
		year: {
			type: Number,
			default: 0
		},
		isDisabled: {
			type: Function,
			default: () => !1
		}
	},
	emits: [
		"toggle-year-picker",
		"year-select",
		"handle-year"
	],
	setup(e, { emit: r }) {
		let i = r, a = e, { showRightIcon: o, showLeftIcon: c } = rh(), { defaultedConfig: l, defaultedMultiCalendars: u, defaultedAriaLabels: d, defaultedTransitions: f, defaultedUI: p } = wp(a), { showTransition: m, transitionName: h } = $m(f), g = W(!1), _ = M(() => Zd(a.year, a.locale)), v = (e = !1, n) => {
			g.value = !g.value, i("toggle-year-picker", {
				flow: e,
				show: n
			});
		}, y = (e) => {
			g.value = !1, i("year-select", e);
		}, b = (e = !1) => {
			i("handle-year", e);
		};
		return (r, i) => (J(), H(F, null, [n("div", { class: G(["dp--year-mode-picker", { "dp--hidden-el": g.value }]) }, [
			V(c)(V(u), e.instance) ? (J(), L(Bp, {
				key: 0,
				ref: "mpPrevIconRef",
				"aria-label": V(d)?.prevYear,
				disabled: e.isDisabled(!1),
				class: G(V(p)?.navBtnPrev),
				onActivate: i[0] ||= (e) => b(!1)
			}, {
				default: A(() => [r.$slots["arrow-left"] ? q(r.$slots, "arrow-left", { key: 0 }) : K("", !0), r.$slots["arrow-left"] ? K("", !0) : (J(), L(V(dd), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : K("", !0),
			n("button", {
				ref: "mpYearButtonRef",
				class: "dp__btn dp--year-select",
				type: "button",
				"aria-label": `${e.year}-${V(d)?.openYearsOverlay}`,
				"data-test-id": `year-mode-btn-${e.instance}`,
				onClick: i[1] ||= () => v(!1),
				onKeydown: i[2] ||= vt(() => v(!1), ["enter"])
			}, [r.$slots.year ? q(r.$slots, "year", {
				key: 0,
				year: e.year,
				text: _.value,
				value: e.year
			}) : K("", !0), r.$slots.year ? K("", !0) : (J(), H(F, { key: 1 }, [z(U(_.value), 1)], 64))], 40, Vp),
			V(o)(V(u), e.instance) ? (J(), L(Bp, {
				key: 1,
				ref: "mpNextIconRef",
				"aria-label": V(d)?.nextYear,
				disabled: e.isDisabled(!0),
				class: G(V(p)?.navBtnNext),
				onActivate: i[3] ||= (e) => b(!0)
			}, {
				default: A(() => [r.$slots["arrow-right"] ? q(r.$slots, "arrow-right", { key: 0 }) : K("", !0), r.$slots["arrow-right"] ? K("", !0) : (J(), L(V(fd), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : K("", !0)
		], 2), I(s, {
			name: V(h)(e.showYearPicker),
			css: V(m)
		}, {
			default: A(() => [e.showYearPicker ? (J(), L(Ip, {
				key: 0,
				items: e.items,
				"text-input": r.textInput,
				"esc-close": r.escClose,
				config: r.config,
				"is-last": r.autoApply && !V(l).keepActionRow,
				"hide-navigation": r.hideNavigation,
				"aria-labels": r.ariaLabels,
				"overlay-label": V(d)?.yearPicker?.(!0),
				type: "year",
				onToggle: v,
				onSelected: i[4] ||= (e) => y(e)
			}, yt({
				"button-icon": A(() => [r.$slots["calendar-icon"] ? q(r.$slots, "calendar-icon", { key: 0 }) : K("", !0), r.$slots["calendar-icon"] ? K("", !0) : (J(), L(V(ld), { key: 1 }))]),
				_: 2
			}, [r.$slots["year-overlay-value"] ? {
				name: "item",
				fn: A(({ item: e }) => [q(r.$slots, "year-overlay-value", {
					text: e.text,
					value: e.value
				})]),
				key: "0"
			} : void 0]), 1032, [
				"items",
				"text-input",
				"esc-close",
				"config",
				"is-last",
				"hide-navigation",
				"aria-labels",
				"overlay-label"
			])) : K("", !0)]),
			_: 3
		}, 8, ["name", "css"])], 64));
	}
}), Up = (e, n, r) => {
	if (n.value && Array.isArray(n.value)) {
		if (n.value.some((n) => pf(e, n))) {
			let r = n.value.filter((n) => !pf(n, e));
			n.value = r.length ? r : null;
		} else (r && +r > n.value.length || !r) && n.value.push(e);
	} else n.value = [e];
}, Wp = (e, n, r) => {
	let i = e.value ? e.value.slice() : [];
	return i.length === 2 && i[1] !== null && (i = []), i.length ? (ff(n, i[0]) ? i.unshift(n) : i[1] = n, r("range-end", n)) : (i = [n], r("range-start", n)), i;
}, Gp = (e, n, r, i) => {
	e && (e[0] && e[1] && r && n("auto-apply"), e[0] && !e[1] && i && r && n("auto-apply"));
}, Kp = (e) => {
	Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((n) => gd(Q(n), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = gd(Q(e.value), e.timezone));
}, qp = (e, n, r, i) => Array.isArray(n.value) && (n.value.length === 2 || n.value.length === 1 && i.value.partialRange) ? i.value.fixedStart && (mf(e, n.value[0]) || pf(e, n.value[0])) ? [n.value[0], e] : i.value.fixedEnd && (ff(e, n.value[1]) || pf(e, n.value[1])) ? [e, n.value[1]] : (r("invalid-fixed-range", e), n.value) : [], Jp = ({ multiCalendars: e, range: n, highlight: r, propDates: i, calendars: a, modelValue: o, props: s, filters: c, year: l, month: u, emit: d }) => {
	let f = M(() => Nd(s.yearRange, s.locale, s.reverseYears)), p = W([!1]), m = M(() => (e, n) => {
		let r = ed(gf(/* @__PURE__ */ new Date()), {
			month: u.value(e),
			year: l.value(e)
		});
		return Of(n ? Jc(r) : Yc(r), i.value.maxDate, i.value.minDate, s.preventMinMaxNavigation, n);
	}), h = () => Array.isArray(o.value) && e.value.solo && o.value[1], g = () => {
		for (let n = 0; n < e.value.count; n++) if (n === 0) a.value[n] = a.value[0];
		else if (n === e.value.count - 1 && h()) a.value[n] = {
			month: Fl(o.value[1]),
			year: Ll(o.value[1])
		};
		else {
			let e = ed(Q(), a.value[n - 1]);
			a.value[n] = {
				month: Fl(e),
				year: Ll(Ic(e, 1))
			};
		}
	}, _ = (n) => {
		if (!n) return g();
		let r = ed(Q(), a.value[n]);
		return a.value[0].year = Ll(cd(r, e.value.count - 1)), g();
	}, y = (e, r) => {
		let i = Hc(r, e);
		return n.value.showLastInRange && i > 1 ? r : e;
	}, b = (n) => s.focusStartDate || e.value.solo ? n[0] : n[1] ? y(n[0], n[1]) : n[0], x = () => {
		if (o.value) {
			let e = Array.isArray(o.value) ? b(o.value) : o.value;
			a.value[0] = {
				month: Fl(e),
				year: Ll(e)
			};
		}
	}, S = () => {
		x(), e.value.count && g();
	};
	v(o, (e, n) => {
		s.isTextInputDate && JSON.stringify(e ?? {}) !== JSON.stringify(n ?? {}) && S();
	}), It(() => {
		S();
	});
	let C = (n, r) => {
		a.value[r].year = n, d("update-month-year", {
			instance: r,
			year: n,
			month: a.value[r].month
		}), e.value.count && !e.value.solo && _(r);
	}, w = M(() => (e) => Kd(f.value, (n) => ({
		active: l.value(e) === n.value,
		disabled: Gd(n.value, xf(i.value.minDate), xf(i.value.maxDate)) || c.value.years?.includes(l.value(e)),
		highlighted: Uf(r.value, n.value)
	}))), T = (e, n) => {
		C(e, n), D(n);
	}, E = (e, n = !1) => {
		if (!m.value(e, n)) {
			let r = n ? l.value(e) + 1 : l.value(e) - 1;
			C(r, e);
		}
	}, D = (e, n = !1, r) => {
		n || d("reset-flow"), r === void 0 ? p.value[e] = !p.value[e] : p.value[e] = r, p.value[e] ? d("overlay-toggle", {
			open: !0,
			overlay: Td.year
		}) : (d("overlay-closed"), d("overlay-toggle", {
			open: !1,
			overlay: Td.year
		}));
	};
	return {
		isDisabled: m,
		groupedYears: w,
		showYearPicker: p,
		selectYear: C,
		toggleYearPicker: D,
		handleYearSelect: T,
		handleYear: E
	};
}, Yp = (e, n) => {
	let { defaultedMultiCalendars: r, defaultedAriaLabels: i, defaultedTransitions: a, defaultedConfig: o, defaultedRange: s, defaultedHighlight: c, propDates: l, defaultedTz: u, defaultedFilters: d, defaultedMultiDates: f } = wp(e), { modelValue: p, year: m, month: h, calendars: g } = eh(e, n, () => {
		e.isTextInputDate && b(Ll(Q(e.startDate)), 0);
	}), _ = M(() => Pd(e.formatLocale, e.locale, e.monthNameFormat)), v = W(null), { checkMinMaxRange: y } = nh(e), { selectYear: b, groupedYears: x, showYearPicker: S, toggleYearPicker: C, handleYearSelect: w, handleYear: T, isDisabled: E } = Jp({
		modelValue: p,
		multiCalendars: r,
		range: s,
		highlight: c,
		calendars: g,
		year: m,
		propDates: l,
		month: h,
		filters: d,
		props: e,
		emit: n
	});
	It(() => {
		e.startDate && (p.value && e.focusStartDate || !p.value) && b(Ll(Q(e.startDate)), 0);
	});
	let D = (e) => e ? {
		month: Fl(e),
		year: Ll(e)
	} : {
		month: null,
		year: null
	}, O = () => p.value ? Array.isArray(p.value) ? p.value.map((e) => D(e)) : D(p.value) : D(), k = (e, n) => {
		let r = g.value[e], i = O();
		return Array.isArray(i) ? i.some((e) => e.year === r?.year && e.month === n) : r?.year === i.year && n === i.month;
	}, ee = (e, n, r) => {
		let i = O();
		return Array.isArray(i) ? m.value(n) === i[r]?.year && e === i[r]?.month : !1;
	}, te = (e, n) => {
		if (s.value.enabled) {
			let r = O();
			if (Array.isArray(p.value) && Array.isArray(r)) {
				let r = ee(e, n, 0) || ee(e, n, 1), i = Df(gf(Q()), e, m.value(n));
				return hf(p.value, v.value, i) && !r;
			}
			return !1;
		}
		return !1;
	}, ne = M(() => (n) => Kd(_.value, (r) => ({
		active: k(n, r.value),
		disabled: Gd(r.value, yf(m.value(n), l.value.minDate), bf(m.value(n), l.value.maxDate)) || Bf(l.value.disabledDates, m.value(n), r.value) || d.value.months?.includes(r.value) || !Vf(l.value.allowedDates, m.value(n), r.value) || Kf(e.yearRange, m.value(n)),
		isBetween: te(r.value, n),
		highlighted: Hf(c.value, r.value, m.value(n))
	}))), re = (e, n) => Df(gf(Q()), e, m.value(n)), A = (e, r) => {
		let i = p.value ? p.value : gf(/* @__PURE__ */ new Date());
		p.value = Df(i, e, m.value(r)), n("auto-apply"), n("update-flow-step");
	}, ie = (r, i) => {
		let a = re(r, i);
		s.value.fixedEnd || s.value.fixedStart ? p.value = qp(a, p, n, s) : p.value ? y(a, p.value) && (p.value = Wp(p, re(r, i), n)) : p.value = [re(r, i)], $e().then(() => {
			Gp(p.value, n, e.autoApply, e.modelAuto);
		});
	}, ae = (e, r) => {
		Up(re(e, r), p, f.value.limit), n("auto-apply", !0);
	}, oe = (e, n) => (g.value[n].month = e, ce(n, g.value[n].year, e), f.value.enabled ? ae(e, n) : s.value.enabled ? ie(e, n) : A(e, n)), se = (e, n) => {
		b(e, n), ce(n, e, null);
	}, ce = (e, r, i) => {
		let a = i;
		if (!a && a !== 0) {
			let n = O();
			a = Array.isArray(n) ? n[e].month : n.month;
		}
		n("update-month-year", {
			instance: e,
			year: r,
			month: a
		});
	};
	return {
		groupedMonths: ne,
		groupedYears: x,
		year: m,
		isDisabled: E,
		defaultedMultiCalendars: r,
		defaultedAriaLabels: i,
		defaultedTransitions: a,
		defaultedConfig: o,
		showYearPicker: S,
		modelValue: p,
		presetDate: (e, r) => {
			Kp({
				value: e,
				modelValue: p,
				range: s.value.enabled,
				timezone: r ? void 0 : u.value.timezone
			}), n("auto-apply");
		},
		setHoverDate: (e, n) => {
			v.value = re(e, n);
		},
		selectMonth: oe,
		selectYear: se,
		toggleYearPicker: C,
		handleYearSelect: w,
		handleYear: T,
		getModelMonthYear: O
	};
}, Xp = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "MonthPicker",
	props: { ...Op },
	emits: [
		"update:internal-model-value",
		"overlay-closed",
		"reset-flow",
		"range-start",
		"range-end",
		"auto-apply",
		"update-month-year",
		"update-flow-step",
		"mount",
		"invalid-fixed-range",
		"overlay-toggle"
	],
	setup(e, { expose: n, emit: r }) {
		let i = r, a = Qm(ae(), "yearMode"), o = e;
		It(() => {
			o.shadow || i("mount", null);
		});
		let { groupedMonths: s, groupedYears: c, year: l, isDisabled: d, defaultedMultiCalendars: f, defaultedConfig: p, showYearPicker: m, modelValue: h, presetDate: g, setHoverDate: _, selectMonth: v, selectYear: y, toggleYearPicker: b, handleYearSelect: x, handleYear: S, getModelMonthYear: C } = Yp(o, i);
		return n({
			getSidebarProps: () => ({
				modelValue: h,
				year: l,
				getModelMonthYear: C,
				selectMonth: v,
				selectYear: y,
				handleYear: S
			}),
			presetDate: g,
			toggleYearPicker: (e) => b(0, e)
		}), (e, n) => (J(), L(Rp, {
			"multi-calendars": V(f).count,
			collapse: e.collapse,
			stretch: "",
			"is-mobile": e.isMobile
		}, {
			default: A(({ instance: n }) => [e.$slots["top-extra"] ? q(e.$slots, "top-extra", {
				key: 0,
				value: e.internalModelValue
			}) : K("", !0), e.$slots["month-year"] ? q(e.$slots, "month-year", nt(B({ key: 1 }, {
				year: V(l),
				months: V(s)(n),
				years: V(c)(n),
				selectMonth: V(v),
				selectYear: V(y),
				instance: n
			}))) : (J(), L(Ip, {
				key: 2,
				items: V(s)(n),
				"arrow-navigation": e.arrowNavigation,
				"is-last": e.autoApply && !V(p).keepActionRow,
				"esc-close": e.escClose,
				height: V(p).modeHeight,
				config: e.config,
				"no-overlay-focus": !!(e.noOverlayFocus || e.textInput),
				"use-relative": "",
				type: "month",
				onSelected: (e) => V(v)(e, n),
				onHoverValue: (e) => V(_)(e, n)
			}, yt({
				header: A(() => [I(Hp, B(e.$props, {
					items: V(c)(n),
					instance: n,
					"show-year-picker": V(m)[n],
					year: V(l)(n),
					"is-disabled": (e) => V(d)(n, e),
					onHandleYear: (e) => V(S)(n, e),
					onYearSelect: (e) => V(x)(e, n),
					onToggleYearPicker: (e) => V(b)(n, e?.flow, e?.show)
				}), yt({ _: 2 }, [u(V(a), (n, r) => ({
					name: n,
					fn: A((r) => [q(e.$slots, n, nt(lt(r)))])
				}))]), 1040, [
					"items",
					"instance",
					"show-year-picker",
					"year",
					"is-disabled",
					"onHandleYear",
					"onYearSelect",
					"onToggleYearPicker"
				])]),
				_: 2
			}, [e.$slots["month-overlay-value"] ? {
				name: "item",
				fn: A(({ item: n }) => [q(e.$slots, "month-overlay-value", {
					text: n.text,
					value: n.value
				})]),
				key: "0"
			} : void 0]), 1032, [
				"items",
				"arrow-navigation",
				"is-last",
				"esc-close",
				"height",
				"config",
				"no-overlay-focus",
				"onSelected",
				"onHoverValue"
			]))]),
			_: 3
		}, 8, [
			"multi-calendars",
			"collapse",
			"is-mobile"
		]));
	}
}), Zp = (e, n) => {
	let { modelValue: r } = eh(e, n, () => {
		e.isTextInputDate && (u.value = Ll(Q(e.startDate)));
	}), i = W(null), { defaultedHighlight: a, defaultedMultiDates: o, defaultedFilters: s, defaultedRange: c, propDates: l } = wp(e), u = W();
	It(() => {
		e.startDate && (r.value && e.focusStartDate || !r.value) && (u.value = Ll(Q(e.startDate)));
	});
	let d = (e) => Array.isArray(r.value) ? r.value.some((n) => Ll(n) === e) : r.value ? Ll(r.value) === e : !1, f = (e) => c.value.enabled && Array.isArray(r.value) ? hf(r.value, i.value, g(e)) : !1, p = (e) => l.value.allowedDates instanceof Map ? l.value.allowedDates.size ? l.value.allowedDates.has(`${e}`) : !1 : !0, m = (e) => l.value.disabledDates instanceof Map ? l.value.disabledDates.size ? l.value.disabledDates.has(`${e}`) : !1 : typeof l.value.disabledDates != "function" || l.value.disabledDates(ad(uf(Yc(Q())), e)), h = M(() => Kd(Nd(e.yearRange, e.locale, e.reverseYears), (e) => {
		let n = d(e.value);
		return {
			active: n,
			disabled: Gd(e.value, xf(l.value.minDate), xf(l.value.maxDate)) || s.value.years.includes(e.value) || !p(e.value) || m(e.value),
			isBetween: f(e.value) && !n,
			highlighted: Uf(a.value, e.value)
		};
	})), g = (e) => ad(gf(Yc(/* @__PURE__ */ new Date())), e);
	return {
		groupedYears: h,
		modelValue: r,
		focusYear: u,
		setHoverValue: (e) => {
			i.value = ad(gf(/* @__PURE__ */ new Date()), e);
		},
		selectYear: (i) => {
			if (n("update-month-year", {
				instance: 0,
				year: i
			}), o.value.enabled) return r.value ? Array.isArray(r.value) && ((r.value?.map((e) => Ll(e))).includes(i) ? r.value = r.value.filter((e) => Ll(e) !== i) : r.value.push(ad(uf(Q()), i))) : r.value = [ad(uf(Yc(Q())), i)], n("auto-apply", !0);
			c.value.enabled ? (r.value = Wp(r, g(i), n), $e().then(() => {
				Gp(r.value, n, e.autoApply, e.modelAuto);
			})) : (r.value = g(i), n("auto-apply"));
		}
	};
}, Qp = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "YearPicker",
	props: { ...Op },
	emits: [
		"update:internal-model-value",
		"reset-flow",
		"range-start",
		"range-end",
		"auto-apply",
		"update-month-year"
	],
	setup(e, { expose: n, emit: r }) {
		let i = r, a = e, { groupedYears: o, modelValue: s, focusYear: c, selectYear: l, setHoverValue: u } = Zp(a, i), { defaultedConfig: d } = wp(a);
		return n({ getSidebarProps: () => ({
			modelValue: s,
			selectYear: l
		}) }), (e, n) => (J(), H("div", null, [e.$slots["top-extra"] ? q(e.$slots, "top-extra", {
			key: 0,
			value: e.internalModelValue
		}) : K("", !0), e.$slots["month-year"] ? q(e.$slots, "month-year", nt(B({ key: 1 }, {
			years: V(o),
			selectYear: V(l)
		}))) : (J(), L(Ip, {
			key: 2,
			items: V(o),
			"is-last": e.autoApply && !V(d).keepActionRow,
			height: V(d).modeHeight,
			config: e.config,
			"no-overlay-focus": !!(e.noOverlayFocus || e.textInput),
			"focus-value": V(c),
			type: "year",
			"use-relative": "",
			onSelected: V(l),
			onHoverValue: V(u)
		}, yt({ _: 2 }, [e.$slots["year-overlay-value"] ? {
			name: "item",
			fn: A(({ item: n }) => [q(e.$slots, "year-overlay-value", {
				text: n.text,
				value: n.value
			})]),
			key: "0"
		} : void 0]), 1032, [
			"items",
			"is-last",
			"height",
			"config",
			"no-overlay-focus",
			"focus-value",
			"onSelected",
			"onHoverValue"
		]))]));
	}
}), $p = {
	key: 0,
	class: "dp__time_input"
}, em = ["data-compact", "data-collapsed"], tm = [
	"data-test-id",
	"aria-label",
	"onKeydown",
	"onClick",
	"onMousedown"
], nm = [
	"aria-label",
	"disabled",
	"data-test-id",
	"onKeydown",
	"onClick"
], rm = [
	"data-test-id",
	"aria-label",
	"onKeydown",
	"onClick",
	"onMousedown"
], im = { key: 0 }, am = ["aria-label", "data-compact"], om = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "TimeInput",
	props: {
		hours: {
			type: Number,
			default: 0
		},
		minutes: {
			type: Number,
			default: 0
		},
		seconds: {
			type: Number,
			default: 0
		},
		closeTimePickerBtn: {
			type: Object,
			default: null
		},
		order: {
			type: Number,
			default: 0
		},
		disabledTimesConfig: {
			type: Function,
			default: null
		},
		validateTime: {
			type: Function,
			default: () => !1
		},
		...Op
	},
	emits: [
		"set-hours",
		"set-minutes",
		"update:hours",
		"update:minutes",
		"update:seconds",
		"reset-flow",
		"mounted",
		"overlay-closed",
		"overlay-opened",
		"am-pm-change"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, { setTimePickerElements: c, setTimePickerBackRef: l } = rp(), { defaultedAriaLabels: d, defaultedTransitions: f, defaultedFilters: m, defaultedConfig: h, defaultedRange: g, defaultedMultiCalendars: _ } = wp(o), { transitionName: v, showTransition: y } = $m(f), b = ee({
			hours: !1,
			minutes: !1,
			seconds: !1
		}), x = W("AM"), S = W(null), C = W([]), w = W(), T = W(!1);
		It(() => {
			a("mounted");
		});
		let E = (e) => ed(/* @__PURE__ */ new Date(), {
			hours: e.hours,
			minutes: e.minutes,
			seconds: o.enableSeconds ? e.seconds : 0,
			milliseconds: 0
		}), D = M(() => (e) => ue(e, o[e]) || k(e, o[e])), O = M(() => ({
			hours: o.hours,
			minutes: o.minutes,
			seconds: o.seconds
		})), k = (e, n) => g.value.enabled && !g.value.disableTimeRangeValidation ? !o.validateTime(e, n) : !1, te = (e, n) => {
			if (g.value.enabled && !g.value.disableTimeRangeValidation) {
				let r = n ? +o[`${e}Increment`] : -+o[`${e}Increment`], i = o[e] + r;
				return !o.validateTime(e, i);
			}
			return !1;
		}, ne = M(() => (e) => !me(+o[e] + +o[`${e}Increment`], e) || te(e, !0)), re = M(() => (e) => !me(+o[e] - o[`${e}Increment`], e) || te(e, !1)), ie = (e, n) => Ec(ed(Q(), e), n), ae = (e, n) => sd(ed(Q(), e), n), oe = M(() => ({
			dp__time_col: !0,
			dp__time_col_block: !o.timePickerInline,
			dp__time_col_reg_block: !o.enableSeconds && o.is24 && !o.timePickerInline,
			dp__time_col_reg_inline: !o.enableSeconds && o.is24 && o.timePickerInline,
			dp__time_col_reg_with_button: !o.enableSeconds && !o.is24,
			dp__time_col_sec: o.enableSeconds && o.is24,
			dp__time_col_sec_with_button: o.enableSeconds && !o.is24
		})), se = M(() => o.timePickerInline && g.value.enabled && !_.value.count), ce = M(() => {
			let e = [{ type: "hours" }];
			return o.enableMinutes && e.push({
				type: "",
				separator: !0
			}, { type: "minutes" }), o.enableSeconds && e.push({
				type: "",
				separator: !0
			}, { type: "seconds" }), e;
		}), le = M(() => ce.value.filter((e) => !e.separator)), j = M(() => (e) => {
			if (e === "hours") {
				let e = ye(+o.hours);
				return {
					text: e < 10 ? `0${e}` : `${e}`,
					value: e
				};
			}
			return {
				text: o[e] < 10 ? `0${o[e]}` : `${o[e]}`,
				value: o[e]
			};
		}), ue = (e, n) => {
			if (!o.disabledTimesConfig) return !1;
			let r = o.disabledTimesConfig(o.order, e === "hours" ? n : void 0);
			return !r[e] || !!r[e]?.includes(n);
		}, de = (e, n) => n !== "hours" || x.value === "AM" ? e : e + 12, fe = (e) => {
			let n = o.is24 ? 24 : 12, r = e === "hours" ? n : 60, i = +o[`${e}GridIncrement`], a = e === "hours" && !o.is24 ? i : 0, s = [];
			for (let n = a; n < r; n += i) s.push({
				value: o.is24 ? n : de(n, e),
				text: n < 10 ? `0${n}` : `${n}`
			});
			return e === "hours" && !o.is24 && s.unshift({
				value: x.value === "PM" ? 12 : 0,
				text: "12"
			}), Kd(s, (n) => ({
				active: !1,
				disabled: m.value.times[e].includes(n.value) || !me(n.value, e) || ue(e, n.value) || k(e, n.value)
			}));
		}, pe = (e) => e >= 0 ? e : 59, N = (e) => e >= 0 ? e : 23, me = (e, n) => {
			let r = o.minTime ? E(_f(o.minTime)) : null, i = o.maxTime ? E(_f(o.maxTime)) : null, a = E(_f(O.value, n, n === "minutes" || n === "seconds" ? pe(e) : N(e)));
			return r && i ? (zl(a, i) || Bl(a, i)) && (Rl(a, r) || Bl(a, r)) : r ? Rl(a, r) || Bl(a, r) : !i || zl(a, i) || Bl(a, i);
		}, he = (e) => o[`no${e[0].toUpperCase() + e.slice(1)}Overlay`], ge = (e) => {
			he(e) || (b[e] = !b[e], b[e] ? (T.value = !0, a("overlay-opened", e)) : (T.value = !1, a("overlay-closed", e)));
		}, _e = (e) => e === "hours" ? Ml : e === "minutes" ? Pl : Il, ve = () => {
			w.value && clearTimeout(w.value);
		}, P = (e, n = !0, r) => {
			let i = n ? ie : ae, s = n ? +o[`${e}Increment`] : -+o[`${e}Increment`];
			me(+o[e] + s, e) && a(`update:${e}`, _e(e)(i({ [e]: +o[e] }, { [e]: +o[`${e}Increment`] }))), !r?.keyboard && h.value.timeArrowHoldThreshold && (w.value = setTimeout(() => {
				P(e, n);
			}, h.value.timeArrowHoldThreshold));
		}, ye = (e) => o.is24 ? e : (e >= 12 ? x.value = "PM" : x.value = "AM", Fd(e)), be = () => {
			x.value === "PM" ? (x.value = "AM", a("update:hours", o.hours - 12)) : (x.value = "PM", a("update:hours", o.hours + 12)), a("am-pm-change", x.value);
		}, xe = (e) => {
			b[e] = !0;
		}, Se = (e, n, r) => {
			if (e && o.arrowNavigation) {
				Array.isArray(C.value[n]) ? C.value[n][r] = e : C.value[n] = [e];
				let i = C.value.reduce((e, n) => n.map((r, i) => [...e[i] || [], n[i]]), []);
				l(o.closeTimePickerBtn), S.value && (i[1] = i[1].concat(S.value)), c(i, o.order);
			}
		}, Ce = (e, n) => (ge(e), a(`update:${e}`, n));
		return r({ openChildCmp: xe }), (e, r) => e.disabled ? K("", !0) : (J(), H("div", $p, [
			(J(!0), H(F, null, u(ce.value, (i, a) => (J(), H("div", {
				key: a,
				class: G(oe.value),
				"data-compact": se.value && !e.enableSeconds,
				"data-collapsed": se.value && e.enableSeconds
			}, [i.separator ? (J(), H(F, { key: 0 }, [T.value ? K("", !0) : (J(), H(F, { key: 0 }, [z(":")], 64))], 64)) : (J(), H(F, { key: 1 }, [
				n("button", {
					ref_for: !0,
					ref: (e) => Se(e, a, 0),
					type: "button",
					class: G({
						dp__btn: !0,
						dp__inc_dec_button: !e.timePickerInline,
						dp__inc_dec_button_inline: e.timePickerInline,
						dp__tp_inline_btn_top: e.timePickerInline,
						dp__inc_dec_button_disabled: ne.value(i.type),
						"dp--hidden-el": T.value
					}),
					"data-test-id": `${i.type}-time-inc-btn-${o.order}`,
					"aria-label": V(d)?.incrementValue(i.type),
					tabindex: "0",
					onKeydown: (e) => V(nf)(e, () => P(i.type, !0, { keyboard: !0 }), !0),
					onClick: (e) => V(h).timeArrowHoldThreshold ? void 0 : P(i.type, !0),
					onMousedown: (e) => V(h).timeArrowHoldThreshold ? P(i.type, !0) : void 0,
					onMouseup: ve
				}, [o.timePickerInline ? (J(), H(F, { key: 1 }, [e.$slots["tp-inline-arrow-up"] ? q(e.$slots, "tp-inline-arrow-up", { key: 0 }) : (J(), H(F, { key: 1 }, [r[2] ||= n("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), r[3] ||= n("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1)], 64))], 64)) : (J(), H(F, { key: 0 }, [e.$slots["arrow-up"] ? q(e.$slots, "arrow-up", { key: 0 }) : K("", !0), e.$slots["arrow-up"] ? K("", !0) : (J(), L(V(md), { key: 1 }))], 64))], 42, tm),
				n("button", {
					ref_for: !0,
					ref: (e) => Se(e, a, 1),
					type: "button",
					"aria-label": `${j.value(i.type).text}-${V(d)?.openTpOverlay(i.type)}`,
					class: G({
						dp__time_display: !0,
						dp__time_display_block: !e.timePickerInline,
						dp__time_display_inline: e.timePickerInline,
						"dp--time-invalid": D.value(i.type),
						"dp--time-overlay-btn": !D.value(i.type),
						"dp--hidden-el": T.value
					}),
					disabled: he(i.type),
					tabindex: "0",
					"data-test-id": `${i.type}-toggle-overlay-btn-${o.order}`,
					onKeydown: (e) => V(nf)(e, () => ge(i.type), !0),
					onClick: (e) => ge(i.type)
				}, [e.$slots[i.type] ? q(e.$slots, i.type, {
					key: 0,
					text: j.value(i.type).text,
					value: j.value(i.type).value
				}) : K("", !0), e.$slots[i.type] ? K("", !0) : (J(), H(F, { key: 1 }, [z(U(j.value(i.type).text), 1)], 64))], 42, nm),
				n("button", {
					ref_for: !0,
					ref: (e) => Se(e, a, 2),
					type: "button",
					class: G({
						dp__btn: !0,
						dp__inc_dec_button: !e.timePickerInline,
						dp__inc_dec_button_inline: e.timePickerInline,
						dp__tp_inline_btn_bottom: e.timePickerInline,
						dp__inc_dec_button_disabled: re.value(i.type),
						"dp--hidden-el": T.value
					}),
					"data-test-id": `${i.type}-time-dec-btn-${o.order}`,
					"aria-label": V(d)?.decrementValue(i.type),
					tabindex: "0",
					onKeydown: (e) => V(nf)(e, () => P(i.type, !1, { keyboard: !0 }), !0),
					onClick: (e) => V(h).timeArrowHoldThreshold ? void 0 : P(i.type, !1),
					onMousedown: (e) => V(h).timeArrowHoldThreshold ? P(i.type, !1) : void 0,
					onMouseup: ve
				}, [o.timePickerInline ? (J(), H(F, { key: 1 }, [e.$slots["tp-inline-arrow-down"] ? q(e.$slots, "tp-inline-arrow-down", { key: 0 }) : (J(), H(F, { key: 1 }, [r[4] ||= n("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), r[5] ||= n("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1)], 64))], 64)) : (J(), H(F, { key: 0 }, [e.$slots["arrow-down"] ? q(e.$slots, "arrow-down", { key: 0 }) : K("", !0), e.$slots["arrow-down"] ? K("", !0) : (J(), L(V(hd), { key: 1 }))], 64))], 42, rm)
			], 64))], 10, em))), 128)),
			e.is24 ? K("", !0) : (J(), H("div", im, [e.$slots["am-pm-button"] ? q(e.$slots, "am-pm-button", {
				key: 0,
				toggle: be,
				value: x.value
			}) : K("", !0), e.$slots["am-pm-button"] ? K("", !0) : (J(), H("button", {
				key: 1,
				ref_key: "amPmButton",
				ref: S,
				type: "button",
				class: "dp__pm_am_button",
				role: "button",
				"aria-label": V(d)?.amPmButton,
				tabindex: "0",
				"data-compact": se.value,
				onClick: be,
				onKeydown: r[0] ||= (e) => V(nf)(e, () => be(), !0)
			}, U(x.value), 41, am))])),
			(J(!0), H(F, null, u(le.value, (n, i) => (J(), L(s, {
				key: i,
				name: V(v)(b[n.type]),
				css: V(y)
			}, {
				default: A(() => [b[n.type] ? (J(), L(Ip, {
					key: 0,
					items: fe(n.type),
					"is-last": e.autoApply && !V(h).keepActionRow,
					"esc-close": e.escClose,
					type: n.type,
					"text-input": e.textInput,
					config: e.config,
					"arrow-navigation": e.arrowNavigation,
					"aria-labels": e.ariaLabels,
					"overlay-label": V(d).timeOverlay?.(n.type),
					onSelected: (e) => Ce(n.type, e),
					onToggle: (e) => ge(n.type),
					onResetFlow: r[1] ||= (n) => e.$emit("reset-flow")
				}, yt({
					"button-icon": A(() => [e.$slots["clock-icon"] ? q(e.$slots, "clock-icon", { key: 0 }) : K("", !0), e.$slots["clock-icon"] ? K("", !0) : (J(), L(p(e.timePickerInline ? V(ld) : V(pd)), { key: 1 }))]),
					_: 2
				}, [e.$slots[`${n.type}-overlay-value`] ? {
					name: "item",
					fn: A(({ item: r }) => [q(e.$slots, `${n.type}-overlay-value`, {
						text: r.text,
						value: r.value
					})]),
					key: "0"
				} : void 0, e.$slots[`${n.type}-overlay-header`] ? {
					name: "header",
					fn: A(() => [q(e.$slots, `${n.type}-overlay-header`, { toggle: () => ge(n.type) })]),
					key: "1"
				} : void 0]), 1032, [
					"items",
					"is-last",
					"esc-close",
					"type",
					"text-input",
					"config",
					"arrow-navigation",
					"aria-labels",
					"overlay-label",
					"onSelected",
					"onToggle"
				])) : K("", !0)]),
				_: 2
			}, 1032, ["name", "css"]))), 128))
		]));
	}
}), sm = ["data-dp-mobile"], cm = ["aria-label", "tabindex"], lm = [
	"role",
	"aria-label",
	"tabindex"
], um = ["aria-label"], dm = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "TimePicker",
	props: {
		hours: {
			type: [Number, Array],
			default: 0
		},
		minutes: {
			type: [Number, Array],
			default: 0
		},
		seconds: {
			type: [Number, Array],
			default: 0
		},
		disabledTimesConfig: {
			type: Function,
			default: null
		},
		validateTime: {
			type: Function,
			default: () => !1
		},
		...Op
	},
	emits: [
		"update:hours",
		"update:minutes",
		"update:seconds",
		"mount",
		"reset-flow",
		"overlay-opened",
		"overlay-closed",
		"am-pm-change"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, { buildMatrix: c, setTimePicker: l } = rp(), d = ae(), { defaultedTransitions: f, defaultedAriaLabels: p, defaultedTextInput: m, defaultedConfig: h, defaultedRange: g } = wp(o), { transitionName: _, showTransition: v } = $m(f), { hideNavigationButtons: y } = rh(), b = W(null), x = W(null), S = W([]), C = W(null), w = W(!1);
		It(() => {
			a("mount"), !o.timePicker && o.arrowNavigation ? c([Id(b.value)], "time") : l(!0, o.timePicker);
		});
		let T = M(() => g.value.enabled && o.modelAuto ? Rd(o.internalModelValue) : !0), E = W(!1), D = (e) => ({
			hours: Array.isArray(o.hours) ? o.hours[e] : o.hours,
			minutes: Array.isArray(o.minutes) ? o.minutes[e] : o.minutes,
			seconds: Array.isArray(o.seconds) ? o.seconds[e] : o.seconds
		}), O = M(() => {
			let e = [];
			if (g.value.enabled) for (let n = 0; n < 2; n++) e.push(D(n));
			else e.push(D(0));
			return e;
		}), ee = (e, n = !1, r = "") => {
			n || a("reset-flow"), E.value = e, a(e ? "overlay-opened" : "overlay-closed", Td.time), o.arrowNavigation && l(e), $e(() => {
				r !== "" && S.value[0] && S.value[0].openChildCmp(r);
			});
		}, te = M(() => ({
			dp__btn: !0,
			dp__button: !0,
			dp__button_bottom: o.autoApply && !h.value.keepActionRow
		})), ne = Qm(d, "timePicker"), re = (e, n, r) => g.value.enabled ? n === 0 ? [e, O.value[1][r]] : [O.value[0][r], e] : e, ie = (e) => {
			a("update:hours", e);
		}, oe = (e) => {
			a("update:minutes", e);
		}, se = (e) => {
			a("update:seconds", e);
		}, ce = () => {
			if (C.value && !m.value.enabled && !o.noOverlayFocus) {
				let e = Ud(C.value);
				e && e.focus({ preventScroll: !0 });
			}
		}, le = (e) => {
			w.value = !1, a("overlay-closed", e);
		}, j = (e) => {
			w.value = !0, a("overlay-opened", e);
		};
		return r({ toggleTimePicker: ee }), (r, i) => (J(), H("div", {
			class: "dp--tp-wrap",
			"data-dp-mobile": r.isMobile
		}, [!r.timePicker && !r.timePickerInline ? N((J(), H("button", {
			key: 0,
			ref_key: "openTimePickerBtn",
			ref: b,
			type: "button",
			class: G({
				...te.value,
				"dp--hidden-el": E.value
			}),
			"aria-label": V(p)?.openTimePicker,
			tabindex: r.noOverlayFocus ? void 0 : 0,
			"data-test-id": "open-time-picker-btn",
			onKeydown: i[0] ||= (e) => V(nf)(e, () => ee(!0)),
			onClick: i[1] ||= (e) => ee(!0)
		}, [r.$slots["clock-icon"] ? q(r.$slots, "clock-icon", { key: 0 }) : K("", !0), r.$slots["clock-icon"] ? K("", !0) : (J(), L(V(pd), { key: 1 }))], 42, cm)), [[k, !V(y)(r.hideNavigation, "time")]]) : K("", !0), I(s, {
			name: V(_)(E.value),
			css: V(v) && !r.timePickerInline
		}, {
			default: A(() => [E.value || r.timePicker || r.timePickerInline ? (J(), H("div", {
				key: 0,
				ref_key: "overlayRef",
				ref: C,
				role: r.timePickerInline ? void 0 : "dialog",
				class: G({
					dp__overlay: !r.timePickerInline,
					"dp--overlay-absolute": !o.timePicker && !r.timePickerInline,
					"dp--overlay-relative": o.timePicker
				}),
				style: Pe(r.timePicker ? { height: `${V(h).modeHeight}px` } : void 0),
				"aria-label": V(p)?.timePicker,
				tabindex: r.timePickerInline ? void 0 : 0
			}, [n("div", {
				class: G(r.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"),
				style: { display: "flex" }
			}, [
				r.$slots["time-picker-overlay"] ? q(r.$slots, "time-picker-overlay", {
					key: 0,
					hours: e.hours,
					minutes: e.minutes,
					seconds: e.seconds,
					setHours: ie,
					setMinutes: oe,
					setSeconds: se
				}) : K("", !0),
				r.$slots["time-picker-overlay"] ? K("", !0) : (J(), H("div", {
					key: 1,
					class: G(r.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
				}, [(J(!0), H(F, null, u(O.value, (n, a) => N((J(), L(om, B({ key: a }, { ref_for: !0 }, {
					...r.$props,
					order: a,
					hours: n.hours,
					minutes: n.minutes,
					seconds: n.seconds,
					closeTimePickerBtn: x.value,
					disabledTimesConfig: e.disabledTimesConfig,
					disabled: a === 0 ? V(g).fixedStart : V(g).fixedEnd
				}, {
					ref_for: !0,
					ref_key: "timeInputRefs",
					ref: S,
					"validate-time": (n, r) => e.validateTime(n, re(r, a, n)),
					"onUpdate:hours": (e) => ie(re(e, a, "hours")),
					"onUpdate:minutes": (e) => oe(re(e, a, "minutes")),
					"onUpdate:seconds": (e) => se(re(e, a, "seconds")),
					onMounted: ce,
					onOverlayClosed: le,
					onOverlayOpened: j,
					onAmPmChange: i[2] ||= (e) => r.$emit("am-pm-change", e)
				}), yt({ _: 2 }, [u(V(ne), (e, n) => ({
					name: e,
					fn: A((n) => [q(r.$slots, e, B({ ref_for: !0 }, n))])
				}))]), 1040, [
					"validate-time",
					"onUpdate:hours",
					"onUpdate:minutes",
					"onUpdate:seconds"
				])), [[k, a === 0 || T.value]])), 128))], 2)),
				!r.timePicker && !r.timePickerInline ? N((J(), H("button", {
					key: 2,
					ref_key: "closeTimePickerBtn",
					ref: x,
					type: "button",
					class: G({
						...te.value,
						"dp--hidden-el": w.value
					}),
					"aria-label": V(p)?.closeTimePicker,
					tabindex: "0",
					onKeydown: i[3] ||= (e) => V(nf)(e, () => ee(!1)),
					onClick: i[4] ||= (e) => ee(!1)
				}, [r.$slots["calendar-icon"] ? q(r.$slots, "calendar-icon", { key: 0 }) : K("", !0), r.$slots["calendar-icon"] ? K("", !0) : (J(), L(V(ld), { key: 1 }))], 42, um)), [[k, !V(y)(r.hideNavigation, "time")]]) : K("", !0)
			], 2)], 14, lm)) : K("", !0)]),
			_: 3
		}, 8, ["name", "css"])], 8, sm));
	}
}), fm = (e, n, r, i) => {
	let { defaultedRange: a } = wp(e), o = (e, r) => Array.isArray(n[e]) ? n[e][r] : n[e], s = (r) => e.enableSeconds ? Array.isArray(n.seconds) ? n.seconds[r] : n.seconds : 0, c = (e, r) => e ? r === void 0 ? df(e, n.hours, n.minutes, s()) : df(e, o("hours", r), o("minutes", r), s(r)) : id(Q(), s(r)), l = (e, r) => {
		n[e] = r;
	}, u = M(() => e.modelAuto && a.value.enabled ? Array.isArray(r.value) ? r.value.length > 1 : !1 : a.value.enabled), d = (e, i) => {
		let o = Object.fromEntries(Object.keys(n).map((r) => r === e ? [r, i] : [r, n[r]].slice()));
		if (u.value && !a.value.disableTimeRangeValidation) {
			let e = (e) => r.value ? df(r.value[e], o.hours[e], o.minutes[e], o.seconds[e]) : null, n = (e) => nd(r.value[e], 0);
			return !(pf(e(0), e(1)) && (Rl(e(0), n(1)) || zl(e(1), n(0))));
		}
		return !0;
	}, f = (e, n) => {
		d(e, n) && (l(e, n), i && i());
	}, p = (e) => {
		f("hours", e);
	}, m = (e) => {
		f("minutes", e);
	}, h = (e) => {
		f("seconds", e);
	}, g = (e, n, i, a) => {
		n && p(e), !n && !i && m(e), i && h(e), r.value && a(r.value);
	}, _ = (n) => {
		if (n) {
			let r = Array.isArray(n), i = r ? [+n[0].hours, +n[1].hours] : +n.hours, a = r ? [+n[0].minutes, +n[1].minutes] : +n.minutes, o = r ? [+n[0].seconds, +n[1].seconds] : +n.seconds;
			l("hours", i), l("minutes", a), e.enableSeconds && l("seconds", o);
		}
	}, v = (r, i) => {
		let o = {
			hours: Array.isArray(n.hours) ? n.hours[r] : n.hours,
			disabledArr: []
		};
		return (i || i === 0) && (o.hours = i), Array.isArray(e.disabledTimes) && (o.disabledArr = a.value.enabled && Array.isArray(e.disabledTimes[r]) ? e.disabledTimes[r] : e.disabledTimes), o;
	};
	return {
		setTime: l,
		updateHours: p,
		updateMinutes: m,
		updateSeconds: h,
		getSetDateTime: c,
		updateTimeValues: g,
		getSecondsValue: s,
		assignStartTime: _,
		validateTime: d,
		disabledTimesConfig: M(() => (n, r) => {
			if (Array.isArray(e.disabledTimes)) {
				let { disabledArr: e, hours: i } = v(n, r), a = e.filter((e) => +e.hours === i);
				return a[0]?.minutes === "*" ? {
					hours: [i],
					minutes: void 0,
					seconds: void 0
				} : {
					hours: [],
					minutes: a?.map((e) => +e.minutes) ?? [],
					seconds: a?.map((e) => e.seconds ? +e.seconds : void 0) ?? []
				};
			}
			return {
				hours: [],
				minutes: [],
				seconds: []
			};
		})
	};
}, pm = (e, n) => {
	let { modelValue: r, time: i } = eh(e, n, () => {
		e.isTextInputDate && b();
	}), { defaultedStartTime: a, defaultedRange: o, defaultedTz: s } = wp(e), { updateTimeValues: c, getSetDateTime: l, setTime: u, assignStartTime: d, disabledTimesConfig: f, validateTime: p } = fm(e, i, r, m);
	function m() {
		n("update-flow-step");
	}
	let h = (e) => {
		let { hours: n, minutes: r, seconds: i } = e;
		return {
			hours: +n,
			minutes: +r,
			seconds: i ? +i : 0
		};
	}, g = () => {
		if (e.startTime) {
			if (Array.isArray(e.startTime)) {
				let n = h(e.startTime[0]), r = h(e.startTime[1]);
				return [ed(Q(), n), ed(Q(), r)];
			}
			let n = h(e.startTime);
			return ed(Q(), n);
		}
		return o.value.enabled ? [null, null] : null;
	}, _ = () => {
		if (o.value.enabled) {
			let [e, n] = g();
			r.value = [gd(l(e, 0), s.value.timezone), gd(l(n, 1), s.value.timezone)];
		} else r.value = gd(l(g()), s.value.timezone);
	}, v = (e) => Array.isArray(e) ? [vf(Q(e[0])), vf(Q(e[1]))] : [vf(e ?? Q())], y = (n, r, i) => {
		u("hours", n), u("minutes", r), u("seconds", e.enableSeconds ? i : 0);
	}, b = () => {
		let [e, n] = v(r.value);
		return o.value.enabled ? y([e.hours, n.hours], [e.minutes, n.minutes], [e.seconds, n.seconds]) : y(e.hours, e.minutes, e.seconds);
	};
	It(() => {
		if (!e.shadow) return d(a.value), r.value ? b() : _();
	});
	let x = () => {
		Array.isArray(r.value) ? r.value = r.value.map((e, n) => e && l(e, n)) : r.value = l(r.value), n("time-update");
	};
	return {
		modelValue: r,
		time: i,
		disabledTimesConfig: f,
		updateTime: (e, n = !0, r = !1) => {
			c(e, n, r, x);
		},
		validateTime: p
	};
}, mm = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "TimePickerSolo",
	props: { ...Op },
	emits: [
		"update:internal-model-value",
		"time-update",
		"am-pm-change",
		"mount",
		"reset-flow",
		"update-flow-step",
		"overlay-toggle"
	],
	setup(e, { expose: n, emit: r }) {
		let i = r, a = e, o = Qm(ae(), "timePicker"), s = W(null), { time: c, modelValue: l, disabledTimesConfig: d, updateTime: f, validateTime: p } = pm(a, i);
		return It(() => {
			a.shadow || i("mount", null);
		}), n({
			getSidebarProps: () => ({
				modelValue: l,
				time: c,
				updateTime: f
			}),
			toggleTimePicker: (e, n = !1, r = "") => {
				s.value?.toggleTimePicker(e, n, r);
			}
		}), (e, n) => (J(), L(Rp, {
			"multi-calendars": 0,
			stretch: "",
			"is-mobile": e.isMobile
		}, {
			default: A(() => [I(dm, B({
				ref_key: "tpRef",
				ref: s
			}, e.$props, {
				hours: V(c).hours,
				minutes: V(c).minutes,
				seconds: V(c).seconds,
				"internal-model-value": e.internalModelValue,
				"disabled-times-config": V(d),
				"validate-time": V(p),
				"onUpdate:hours": n[0] ||= (e) => V(f)(e),
				"onUpdate:minutes": n[1] ||= (e) => V(f)(e, !1),
				"onUpdate:seconds": n[2] ||= (e) => V(f)(e, !1, !0),
				onAmPmChange: n[3] ||= (n) => e.$emit("am-pm-change", n),
				onResetFlow: n[4] ||= (n) => e.$emit("reset-flow"),
				onOverlayClosed: n[5] ||= (n) => e.$emit("overlay-toggle", {
					open: !1,
					overlay: n
				}),
				onOverlayOpened: n[6] ||= (n) => e.$emit("overlay-toggle", {
					open: !0,
					overlay: n
				})
			}), yt({ _: 2 }, [u(V(o), (n, r) => ({
				name: n,
				fn: A((r) => [q(e.$slots, n, nt(lt(r)))])
			}))]), 1040, [
				"hours",
				"minutes",
				"seconds",
				"internal-model-value",
				"disabled-times-config",
				"validate-time"
			])]),
			_: 3
		}, 8, ["is-mobile"]));
	}
}), hm = { class: "dp--header-wrap" }, gm = {
	key: 0,
	class: "dp__month_year_wrap"
}, _m = { key: 0 }, vm = { class: "dp__month_year_wrap" }, ym = [
	"data-dp-element",
	"aria-label",
	"data-test-id",
	"onClick",
	"onKeydown"
], bm = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "DpHeader",
	props: {
		month: {
			type: Number,
			default: 0
		},
		year: {
			type: Number,
			default: 0
		},
		instance: {
			type: Number,
			default: 0
		},
		years: {
			type: Array,
			default: () => []
		},
		months: {
			type: Array,
			default: () => []
		},
		...Op
	},
	emits: [
		"update-month-year",
		"mount",
		"reset-flow",
		"overlay-closed",
		"overlay-opened"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, { defaultedTransitions: c, defaultedAriaLabels: l, defaultedMultiCalendars: d, defaultedFilters: f, defaultedConfig: m, defaultedHighlight: h, propDates: g, defaultedUI: _ } = wp(o), { transitionName: v, showTransition: y } = $m(c), { buildMatrix: b } = rp(), { handleMonthYearChange: x, isDisabled: S, updateMonthYear: C } = Ep(o, a), { showLeftIcon: w, showRightIcon: T } = rh(), E = W(!1), D = W(!1), O = W(!1), k = W([
			null,
			null,
			null,
			null
		]);
		It(() => {
			a("mount");
		});
		let ee = (e) => ({
			get: () => o[e],
			set: (n) => {
				let r = e === Sd.month ? Sd.year : Sd.month;
				a("update-month-year", {
					[e]: n,
					[r]: o[r]
				}), e === Sd.month ? ce(!0) : le(!0);
			}
		}), te = M(ee(Sd.month)), ne = M(ee(Sd.year)), re = M(() => (e) => ({
			month: o.month,
			year: o.year,
			items: e === Sd.month ? o.months : o.years,
			instance: o.instance,
			updateMonthYear: C,
			toggle: e === Sd.month ? ce : le
		})), ie = M(() => o.months.find((e) => e.value === o.month) || {
			text: "",
			value: 0
		}), ae = M(() => Kd(o.months, (e) => ({
			active: o.month === e.value,
			disabled: Gd(e.value, yf(o.year, g.value.minDate), bf(o.year, g.value.maxDate)) || f.value.months.includes(e.value),
			highlighted: Hf(h.value, e.value, o.year)
		}))), oe = M(() => Kd(o.years, (e) => ({
			active: o.year === e.value,
			disabled: Gd(e.value, xf(g.value.minDate), xf(g.value.maxDate)) || f.value.years.includes(e.value),
			highlighted: Uf(h.value, e.value)
		}))), se = (e, n, r) => {
			e.value = r === void 0 ? !e.value : r, e.value ? (O.value = !0, a("overlay-opened", n)) : (O.value = !1, a("overlay-closed", n));
		}, ce = (e = !1, n) => {
			j(e), se(E, Td.month, n);
		}, le = (e = !1, n) => {
			j(e), se(D, Td.year, n);
		}, j = (e) => {
			e || a("reset-flow");
		}, ue = (e, n) => {
			o.arrowNavigation && (k.value[n] = Id(e), b(k.value, "monthYear"));
		}, de = M(() => [{
			type: Sd.month,
			index: 1,
			toggle: ce,
			modelValue: te.value,
			updateModelValue: (e) => te.value = e,
			text: ie.value.text,
			showSelectionGrid: E.value,
			items: ae.value,
			ariaLabel: l.value?.openMonthsOverlay,
			overlayLabel: l.value.monthPicker?.(!0) ?? void 0
		}, {
			type: Sd.year,
			index: 2,
			toggle: le,
			modelValue: ne.value,
			updateModelValue: (e) => ne.value = e,
			text: Zd(o.year, o.locale),
			showSelectionGrid: D.value,
			items: oe.value,
			ariaLabel: l.value?.openYearsOverlay,
			overlayLabel: l.value.yearPicker?.(!0) ?? void 0
		}]), fe = M(() => o.disableYearSelect ? [de.value[0]] : o.yearFirst ? [...de.value].reverse() : de.value);
		return r({
			toggleMonthPicker: ce,
			toggleYearPicker: le,
			handleMonthYearChange: x
		}), (r, i) => (J(), H("div", hm, [r.$slots["month-year"] ? (J(), H("div", gm, [q(r.$slots, "month-year", nt(lt({
			month: e.month,
			year: e.year,
			months: e.months,
			years: e.years,
			updateMonthYear: V(C),
			handleMonthYearChange: V(x),
			instance: e.instance,
			isDisabled: V(S)
		})))])) : (J(), H(F, { key: 1 }, [r.$slots["top-extra"] ? (J(), H("div", _m, [q(r.$slots, "top-extra", { value: r.internalModelValue })])) : K("", !0), n("div", vm, [
			V(w)(V(d), e.instance) && !r.vertical ? (J(), L(Bp, {
				key: 0,
				"aria-label": V(l)?.prevMonth,
				disabled: V(S)(!1),
				class: G(V(_)?.navBtnPrev),
				"el-name": "action-prev",
				onActivate: i[0] ||= (e) => V(x)(!1, !0),
				onSetRef: i[1] ||= (e) => ue(e, 0)
			}, {
				default: A(() => [r.$slots["arrow-left"] ? q(r.$slots, "arrow-left", { key: 0 }) : K("", !0), r.$slots["arrow-left"] ? K("", !0) : (J(), L(V(dd), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : K("", !0),
			n("div", { class: G(["dp__month_year_wrap", { dp__year_disable_select: r.disableYearSelect }]) }, [(J(!0), H(F, null, u(fe.value, (i, a) => (J(), H(F, { key: i.type }, [n("button", {
				ref_for: !0,
				ref: (e) => ue(e, a + 1),
				type: "button",
				"data-dp-element": `overlay-${i.type}`,
				class: G(["dp__btn dp__month_year_select", { "dp--hidden-el": O.value }]),
				"aria-label": `${i.text}-${i.ariaLabel}`,
				"data-test-id": `${i.type}-toggle-overlay-${e.instance}`,
				onClick: i.toggle,
				onKeydown: (e) => V(nf)(e, () => i.toggle(), !0)
			}, [r.$slots[i.type] ? q(r.$slots, i.type, {
				key: 0,
				text: i.text,
				value: o[i.type]
			}) : K("", !0), r.$slots[i.type] ? K("", !0) : (J(), H(F, { key: 1 }, [z(U(i.text), 1)], 64))], 42, ym), I(s, {
				name: V(v)(i.showSelectionGrid),
				css: V(y)
			}, {
				default: A(() => [i.showSelectionGrid ? (J(), L(Ip, {
					key: 0,
					items: i.items,
					"arrow-navigation": r.arrowNavigation,
					"hide-navigation": r.hideNavigation,
					"is-last": r.autoApply && !V(m).keepActionRow,
					"skip-button-ref": !1,
					config: r.config,
					type: i.type,
					"header-refs": [],
					"esc-close": r.escClose,
					"menu-wrap-ref": r.menuWrapRef,
					"text-input": r.textInput,
					"aria-labels": r.ariaLabels,
					"overlay-label": i.overlayLabel,
					onSelected: i.updateModelValue,
					onToggle: i.toggle
				}, yt({
					"button-icon": A(() => [r.$slots["calendar-icon"] ? q(r.$slots, "calendar-icon", { key: 0 }) : K("", !0), r.$slots["calendar-icon"] ? K("", !0) : (J(), L(V(ld), { key: 1 }))]),
					_: 2
				}, [
					r.$slots[`${i.type}-overlay-value`] ? {
						name: "item",
						fn: A(({ item: e }) => [q(r.$slots, `${i.type}-overlay-value`, {
							text: e.text,
							value: e.value
						})]),
						key: "0"
					} : void 0,
					r.$slots[`${i.type}-overlay`] ? {
						name: "overlay",
						fn: A(() => [q(r.$slots, `${i.type}-overlay`, B({ ref_for: !0 }, re.value(i.type)))]),
						key: "1"
					} : void 0,
					r.$slots[`${i.type}-overlay-header`] ? {
						name: "header",
						fn: A(() => [q(r.$slots, `${i.type}-overlay-header`, { toggle: i.toggle })]),
						key: "2"
					} : void 0
				]), 1032, [
					"items",
					"arrow-navigation",
					"hide-navigation",
					"is-last",
					"config",
					"type",
					"esc-close",
					"menu-wrap-ref",
					"text-input",
					"aria-labels",
					"overlay-label",
					"onSelected",
					"onToggle"
				])) : K("", !0)]),
				_: 2
			}, 1032, ["name", "css"])], 64))), 128))], 2),
			V(w)(V(d), e.instance) && r.vertical ? (J(), L(Bp, {
				key: 1,
				"aria-label": V(l)?.prevMonth,
				"el-name": "action-prev",
				disabled: V(S)(!1),
				class: G(V(_)?.navBtnPrev),
				onActivate: i[2] ||= (e) => V(x)(!1, !0)
			}, {
				default: A(() => [r.$slots["arrow-up"] ? q(r.$slots, "arrow-up", { key: 0 }) : K("", !0), r.$slots["arrow-up"] ? K("", !0) : (J(), L(V(md), { key: 1 }))]),
				_: 3
			}, 8, [
				"aria-label",
				"disabled",
				"class"
			])) : K("", !0),
			V(T)(V(d), e.instance) ? (J(), L(Bp, {
				key: 2,
				ref: "rightIcon",
				"el-name": "action-next",
				disabled: V(S)(!0),
				"aria-label": V(l)?.nextMonth,
				class: G(V(_)?.navBtnNext),
				onActivate: i[3] ||= (e) => V(x)(!0, !0),
				onSetRef: i[4] ||= (e) => ue(e, r.disableYearSelect ? 2 : 3)
			}, {
				default: A(() => [r.$slots[r.vertical ? "arrow-down" : "arrow-right"] ? q(r.$slots, r.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : K("", !0), r.$slots[r.vertical ? "arrow-down" : "arrow-right"] ? K("", !0) : (J(), L(p(r.vertical ? V(hd) : V(fd)), { key: 1 }))]),
				_: 3
			}, 8, [
				"disabled",
				"aria-label",
				"class"
			])) : K("", !0)
		])], 64))]));
	}
}), xm = {
	class: "dp__calendar_header",
	role: "row"
}, Sm = {
	key: 0,
	class: "dp__calendar_header_item",
	role: "gridcell"
}, Cm = ["aria-label"], wm = {
	key: 0,
	class: "dp__calendar_item dp__week_num",
	role: "gridcell"
}, Tm = { class: "dp__cell_inner" }, Em = [
	"id",
	"aria-selected",
	"aria-disabled",
	"aria-label",
	"tabindex",
	"data-test-id",
	"onClick",
	"onTouchend",
	"onKeydown",
	"onMouseenter",
	"onMouseleave",
	"onMousedown"
], Dm = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "DpCalendar",
	props: {
		mappedDates: {
			type: Array,
			default: () => []
		},
		instance: {
			type: Number,
			default: 0
		},
		month: {
			type: Number,
			default: 0
		},
		year: {
			type: Number,
			default: 0
		},
		...Op
	},
	emits: [
		"select-date",
		"set-hover-date",
		"handle-scroll",
		"mount",
		"handle-swipe",
		"handle-space",
		"tooltip-open",
		"tooltip-close"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, { buildMultiLevelMatrix: c } = rp(), { defaultedTransitions: l, defaultedConfig: d, defaultedAriaLabels: f, defaultedMultiCalendars: p, defaultedWeekNumbers: m, defaultedMultiDates: h, defaultedUI: g } = wp(o), _ = W(null), v = W({
			bottom: "",
			left: "",
			transform: ""
		}), y = W([]), b = W(null), x = W(!0), S = W(""), C = W({
			startX: 0,
			endX: 0,
			startY: 0,
			endY: 0
		}), w = W([]), T = W({ left: "50%" }), E = W(!1), O = M(() => o.calendar ? o.calendar(o.mappedDates) : o.mappedDates), k = M(() => o.dayNames ? Array.isArray(o.dayNames) ? o.dayNames : o.dayNames(o.locale, +o.weekStart) : Md(o.formatLocale, o.locale, +o.weekStart));
		It(() => {
			a("mount", {
				cmp: "calendar",
				refs: y
			}), d.value.noSwipe || b.value && (b.value.addEventListener("touchstart", ue, { passive: !1 }), b.value.addEventListener("touchend", de, { passive: !1 }), b.value.addEventListener("touchmove", fe, { passive: !1 })), o.monthChangeOnScroll && b.value && b.value.addEventListener("wheel", me, { passive: !1 });
		}), Ie(() => {
			d.value.noSwipe || b.value && (b.value.removeEventListener("touchstart", ue), b.value.removeEventListener("touchend", de), b.value.removeEventListener("touchmove", fe)), o.monthChangeOnScroll && b.value && b.value.removeEventListener("wheel", me);
		});
		let ee = (e) => e ? o.vertical ? "vNext" : "next" : o.vertical ? "vPrevious" : "previous", te = (e, n) => {
			if (o.transitions) {
				let r = uf(Df(Q(), o.month, o.year));
				S.value = mf(uf(Df(Q(), e, n)), r) ? l.value[ee(!0)] : l.value[ee(!1)], x.value = !1, $e(() => {
					x.value = !0;
				});
			}
		}, ne = M(() => ({ ...g.value.calendar ?? {} })), re = M(() => (e) => {
			let n = Ld(e);
			return {
				dp__marker_dot: n.type === "dot",
				dp__marker_line: n.type === "line"
			};
		}), ie = M(() => (e) => pf(e, _.value)), ae = M(() => ({
			dp__calendar: !0,
			dp__calendar_next: p.value.count > 0 && o.instance !== 0
		})), oe = M(() => (e) => !o.hideOffsetDates || e.current), se = async (e, n) => {
			let { width: r, height: i } = e.getBoundingClientRect();
			_.value = n.value;
			let a = { left: `${r / 2}px` }, o = -50;
			if (await $e(), w.value[0]) {
				let { left: e, width: n } = w.value[0].getBoundingClientRect();
				e < 0 && (a = { left: "0" }, o = 0, T.value.left = `${r / 2}px`), window.innerWidth < e + n && (a = { right: "0" }, o = 0, T.value.left = `${n - r / 2}px`);
			}
			v.value = {
				bottom: `${i}px`,
				...a,
				transform: `translateX(${o}%)`
			};
		}, ce = async (e, n, r) => {
			let i = Id(y.value[n][r]);
			i && (e.marker?.customPosition && e.marker?.tooltip?.length ? v.value = e.marker.customPosition(i) : await se(i, e), a("tooltip-open", e.marker));
		}, le = async (e, n, r) => {
			if (E.value && h.value.enabled && h.value.dragSelect) return a("select-date", e);
			if (a("set-hover-date", e), e.marker?.tooltip?.length) {
				if (o.hideOffsetDates && !e.current) return;
				await ce(e, n, r);
			}
		}, j = (e) => {
			_.value && (_.value = null, v.value = JSON.parse(JSON.stringify({
				bottom: "",
				left: "",
				transform: ""
			})), a("tooltip-close", e.marker));
		}, ue = (e) => {
			C.value.startX = e.changedTouches[0].screenX, C.value.startY = e.changedTouches[0].screenY;
		}, de = (e) => {
			C.value.endX = e.changedTouches[0].screenX, C.value.endY = e.changedTouches[0].screenY, pe();
		}, fe = (e) => {
			o.vertical && !o.inline && e.preventDefault();
		}, pe = () => {
			let e = o.vertical ? "Y" : "X";
			Math.abs(C.value[`start${e}`] - C.value[`end${e}`]) > 10 && a("handle-swipe", C.value[`start${e}`] > C.value[`end${e}`] ? "right" : "left");
		}, N = (e, n, r) => {
			e && (Array.isArray(y.value[n]) ? y.value[n][r] = e : y.value[n] = [e]), o.arrowNavigation && c(y.value, "calendar");
		}, me = (e) => {
			o.monthChangeOnScroll && (e.preventDefault(), a("handle-scroll", e));
		}, he = (e) => m.value.type === "local" ? il(e.value, { weekStartsOn: +o.weekStart }) : m.value.type === "iso" ? tl(e.value) : typeof m.value.type == "function" ? m.value.type(e.value) : "", ge = (e) => {
			let n = e[0];
			return m.value.hideOnOffsetDates ? e.some((e) => e.current) ? he(n) : "" : he(n);
		}, _e = (e, n, r = !0) => {
			!r && rf() || (!h.value.enabled || d.value.allowPreventDefault) && (qd(e, d.value), a("select-date", n));
		}, ve = (e) => {
			qd(e, d.value);
		}, P = (e) => {
			h.value.enabled && h.value.dragSelect ? (E.value = !0, a("select-date", e)) : h.value.enabled && a("select-date", e);
		};
		return r({ triggerTransition: te }), (e, r) => (J(), H("div", { class: G(ae.value) }, [n("div", {
			ref_key: "calendarWrapRef",
			ref: b,
			class: G(ne.value),
			role: "grid"
		}, [
			n("div", xm, [e.weekNumbers ? (J(), H("div", Sm, U(e.weekNumName), 1)) : K("", !0), (J(!0), H(F, null, u(k.value, (n, r) => (J(), H("div", {
				key: r,
				class: "dp__calendar_header_item",
				role: "gridcell",
				"data-test-id": "calendar-header",
				"aria-label": V(f)?.weekDay?.(r)
			}, [e.$slots["calendar-header"] ? q(e.$slots, "calendar-header", {
				key: 0,
				day: n,
				index: r
			}) : K("", !0), e.$slots["calendar-header"] ? K("", !0) : (J(), H(F, { key: 1 }, [z(U(n), 1)], 64))], 8, Cm))), 128))]),
			r[2] ||= n("div", { class: "dp__calendar_header_separator" }, null, -1),
			I(s, {
				name: S.value,
				css: !!e.transitions
			}, {
				default: A(() => [x.value ? (J(), H("div", {
					key: 0,
					class: "dp__calendar",
					role: "rowgroup",
					onMouseleave: r[1] ||= (e) => E.value = !1
				}, [(J(!0), H(F, null, u(O.value, (i, a) => (J(), H("div", {
					key: a,
					class: "dp__calendar_row",
					role: "row"
				}, [e.weekNumbers ? (J(), H("div", wm, [n("div", Tm, U(ge(i.days)), 1)])) : K("", !0), (J(!0), H(F, null, u(i.days, (i, o) => (J(), H("div", {
					id: V(Wf)(i.value),
					ref_for: !0,
					ref: (e) => N(e, a, o),
					key: o + a,
					role: "gridcell",
					class: "dp__calendar_item",
					"aria-selected": (i.classData.dp__active_date || i.classData.dp__range_start || i.classData.dp__range_end) ?? void 0,
					"aria-disabled": i.classData.dp__cell_disabled || void 0,
					"aria-label": V(f)?.day?.(i),
					tabindex: !i.current && e.hideOffsetDates ? void 0 : 0,
					"data-test-id": V(Wf)(i.value),
					onClick: D((e) => _e(e, i), ["prevent"]),
					onTouchend: (e) => _e(e, i, !1),
					onKeydown: (n) => V(nf)(n, () => e.$emit("select-date", i)),
					onMouseenter: (e) => le(i, a, o),
					onMouseleave: (e) => j(i),
					onMousedown: (e) => P(i),
					onMouseup: r[0] ||= (e) => E.value = !1
				}, [n("div", { class: G(["dp__cell_inner", i.classData]) }, [
					e.$slots.day && oe.value(i) ? q(e.$slots, "day", {
						key: 0,
						day: +i.text,
						date: i.value
					}) : K("", !0),
					e.$slots.day ? K("", !0) : (J(), H(F, { key: 1 }, [z(U(i.text), 1)], 64)),
					i.marker && oe.value(i) ? (J(), H(F, { key: 2 }, [e.$slots.marker ? q(e.$slots, "marker", {
						key: 0,
						marker: i.marker,
						day: +i.text,
						date: i.value
					}) : (J(), H("div", {
						key: 1,
						class: G(re.value(i.marker)),
						style: Pe(i.marker.color ? { backgroundColor: i.marker.color } : {})
					}, null, 6))], 64)) : K("", !0),
					ie.value(i.value) ? (J(), H("div", {
						key: 3,
						ref_for: !0,
						ref_key: "activeTooltip",
						ref: w,
						class: "dp__marker_tooltip",
						style: Pe(v.value)
					}, [i.marker?.tooltip ? (J(), H("div", {
						key: 0,
						class: "dp__tooltip_content",
						onClick: ve
					}, [(J(!0), H(F, null, u(i.marker.tooltip, (r, a) => (J(), H("div", {
						key: a,
						class: "dp__tooltip_text"
					}, [e.$slots["marker-tooltip"] ? q(e.$slots, "marker-tooltip", {
						key: 0,
						tooltip: r,
						day: i.value
					}) : K("", !0), e.$slots["marker-tooltip"] ? K("", !0) : (J(), H(F, { key: 1 }, [n("div", {
						class: "dp__tooltip_mark",
						style: Pe(r.color ? { backgroundColor: r.color } : {})
					}, null, 4), n("div", null, U(r.text), 1)], 64))]))), 128)), n("div", {
						class: "dp__arrow_bottom_tp",
						style: Pe(T.value)
					}, null, 4)])) : K("", !0)], 4)) : K("", !0)
				], 2)], 40, Em))), 128))]))), 128))], 32)) : K("", !0)]),
				_: 3
			}, 8, ["name", "css"])
		], 2)], 2));
	}
}), Om = (e) => Array.isArray(e), km = (e, n, r, i) => {
	let a = W([]), o = W(/* @__PURE__ */ new Date()), s = W(), { modelValue: c, calendars: l, time: u, today: d } = eh(e, n, () => oe(e.isTextInputDate)), { defaultedMultiCalendars: f, defaultedStartTime: p, defaultedRange: m, defaultedConfig: h, defaultedTz: g, propDates: _, defaultedMultiDates: v } = wp(e), { validateMonthYearInRange: y, isDisabled: b, isDateRangeAllowed: x, checkMinMaxRange: S } = nh(e), { updateTimeValues: C, getSetDateTime: w, setTime: T, assignStartTime: E, validateTime: D, disabledTimesConfig: O } = fm(e, u, c, i), k = M(() => (e) => l.value[e] ? l.value[e].month : 0), ee = M(() => (e) => l.value[e] ? l.value[e].year : 0), te = (e) => !h.value.keepViewOnOffsetClick || e ? !0 : !s.value, ne = (e, n, r, i = !1) => {
		te(i) && (l.value[e] || (l.value[e] = {
			month: 0,
			year: 0
		}), l.value[e].month = Hd(n) ? l.value[e]?.month : n, l.value[e].year = Hd(r) ? l.value[e]?.year : r);
	}, re = () => {
		e.autoApply && n("select-date");
	}, A = () => {
		p.value && E(p.value);
	};
	It(() => {
		e.shadow || (c.value || (he(), A()), oe(!0), e.focusStartDate && e.startDate && he());
	});
	let ie = M(() => e.flow?.length && !e.partialFlow ? e.flowStep === e.flow.length : !0), ae = () => {
		e.autoApply && ie.value && n("auto-apply", e.partialFlow ? e.flowStep !== e.flow.length : !1);
	}, oe = (n = !1) => {
		if (c.value) return Array.isArray(c.value) ? (a.value = c.value, fe(n)) : le(c.value, n);
		if (f.value.count && n && !e.startDate) return ce(Q(), n);
	}, se = () => Array.isArray(c.value) && m.value.enabled ? Fl(c.value[0]) === Fl(c.value[1] ?? c.value[0]) : !1, ce = (e = /* @__PURE__ */ new Date(), n = !1) => {
		if (f.value.count && f.value.static && !n || ne(0, Fl(e), Ll(e)), f.value.count && (!c.value || se() || !f.value.solo) && (!f.value.solo || n)) for (let e = 1; e < f.value.count; e++) {
			let n = Ec(ed(Q(), {
				month: k.value(e - 1),
				year: ee.value(e - 1)
			}), { months: 1 });
			l.value[e] = {
				month: Fl(n),
				year: Ll(n)
			};
		}
	}, le = (e, n) => {
		ce(e), T("hours", Ml(e)), T("minutes", Pl(e)), T("seconds", Il(e)), f.value.count && n && me();
	}, j = (e) => {
		if (f.value.count) {
			if (f.value.solo) return 0;
			let n = Fl(e[0]), r = Fl(e[1]);
			return Math.abs(r - n) < f.value.count ? 0 : 1;
		}
		return 1;
	}, ue = (e, n) => {
		e[1] && m.value.showLastInRange ? ce(e[j(e)], n) : ce(e[0], n);
		let r = (n, r) => [n(e[0]), e[1] ? n(e[1]) : u[r][1]];
		T("hours", r(Ml, "hours")), T("minutes", r(Pl, "minutes")), T("seconds", r(Il, "seconds"));
	}, de = (n, r) => {
		if ((m.value.enabled || e.weekPicker) && !v.value.enabled) return ue(n, r);
		if (v.value.enabled && r) {
			let e = n[n.length - 1];
			return le(e, r);
		}
	}, fe = (e) => {
		let n = c.value;
		de(n, e), f.value.count && f.value.solo && me();
	}, pe = (i, a) => {
		let o = ed(Q(), {
			month: k.value(a),
			year: ee.value(a)
		}), s = i < 0 ? Tc(o, 1) : od(o, 1);
		y(Fl(s), Ll(s), i < 0, e.preventMinMaxNavigation) && (ne(a, Fl(s), Ll(s)), n("update-month-year", {
			instance: a,
			month: Fl(s),
			year: Ll(s)
		}), f.value.count && !f.value.solo && N(a), r());
	}, N = (e) => {
		for (let n = e - 1; n >= 0; n--) {
			let e = od(ed(Q(), {
				month: k.value(n + 1),
				year: ee.value(n + 1)
			}), 1);
			ne(n, Fl(e), Ll(e));
		}
		for (let n = e + 1; n <= f.value.count - 1; n++) {
			let e = Tc(ed(Q(), {
				month: k.value(n - 1),
				year: ee.value(n - 1)
			}), 1);
			ne(n, Fl(e), Ll(e));
		}
	}, me = () => {
		if (Array.isArray(c.value) && c.value.length === 2) {
			let e = Q(Q(c.value[1] ? c.value[1] : Tc(c.value[0], 1))), [n, r] = [Fl(c.value[0]), Ll(c.value[0])], [i, a] = [Fl(c.value[1]), Ll(c.value[1])];
			(n !== i || n === i && r !== a) && f.value.solo && ne(1, Fl(e), Ll(e));
		} else c.value && !Array.isArray(c.value) && (ne(0, Fl(c.value), Ll(c.value)), ce(Q()));
	}, he = () => {
		e.startDate && (ne(0, Fl(Q(e.startDate)), Ll(Q(e.startDate))), f.value.count && N(0));
	}, ge = (n, r) => {
		if (e.monthChangeOnScroll) {
			let i = (/* @__PURE__ */ new Date()).getTime() - o.value.getTime(), a = Math.abs(n.deltaY), s = 500;
			a > 1 && (s = 100), a > 100 && (s = 0), i > s && (o.value = /* @__PURE__ */ new Date(), pe(e.monthChangeOnScroll === "inverse" ? n.deltaY : -n.deltaY, r));
		}
	}, _e = (n, r, i = !1) => {
		e.monthChangeOnArrows && e.vertical === i && ve(n, r);
	}, ve = (e, n) => {
		pe(e === "right" ? -1 : 1, n);
	}, P = (e) => {
		if (_.value.markers) return ef(e.value, _.value.markers);
	}, ye = (n, r) => {
		switch (e.sixWeeks === !0 ? "append" : e.sixWeeks) {
			case "prepend": return [!0, !1];
			case "center": return [n == 0, !0];
			case "fair": return [n == 0 || r > n, !0];
			case "append": return [!1, !1];
			default: return [!1, !1];
		}
	}, be = (n, r, i, a) => {
		if (e.sixWeeks && n.length < 6) {
			let e = 6 - n.length, o = (r.getDay() + 7 - a) % 7, s = 6 - (i.getDay() + 7 - a) % 7, [c, l] = ye(o, s);
			for (let i = 1; i <= e; i++) if (l ? !!(i % 2) == c : c) {
				let e = n[0].days[0], i = xe(wc(e.value, -7), Fl(r));
				n.unshift({ days: i });
			} else {
				let e = n[n.length - 1], i = e.days[e.days.length - 1], a = xe(wc(i.value, 1), Fl(r));
				n.push({ days: a });
			}
		}
		return n;
	}, xe = (n, r) => {
		let i = Q(n), a = [];
		for (let n = 0; n < 7; n++) {
			let o = wc(i, n), s = Fl(o) !== r;
			a.push({
				text: e.hideOffsetDates && s ? "" : o.getDate(),
				value: o,
				current: !s,
				classData: {}
			});
		}
		return a;
	}, Se = (n, r) => {
		let i = [], a = new Date(r, n), o = new Date(r, n + 1, 0), s = e.weekStart, c = Vn(a, { weekStartsOn: s }), l = (e) => {
			let r = xe(e, n);
			if (i.push({ days: r }), !i[i.length - 1].days.some((e) => pf(uf(e.value), uf(o)))) {
				let n = wc(e, 7);
				l(n);
			}
		};
		return l(c), be(i, a, o, s);
	}, Ce = (e) => {
		let r = df(Q(e.value), u.hours, u.minutes, ke());
		n("date-update", r), v.value.enabled ? Up(r, c, v.value.limit) : c.value = r, i(), $e().then(() => {
			ae();
		});
	}, we = (e) => m.value.noDisabledRange ? Sf(a.value[0], e).some((e) => b(e)) : !1, Te = () => {
		a.value = c.value ? c.value.slice() : [], a.value.length === 2 && !(m.value.fixedStart || m.value.fixedEnd) && (a.value = []);
	}, Ee = (e, r) => {
		let i = [Q(e.value), wc(Q(e.value), +m.value.autoRange)];
		x(i) ? (r && De(e.value), a.value = i) : n("invalid-date", e.value);
	}, De = (e) => {
		let n = Fl(Q(e)), r = Ll(Q(e));
		if (ne(0, n, r), f.value.count > 0) for (let n = 1; n < f.value.count; n++) {
			let r = Cf(ed(Q(e), {
				year: ee.value(n - 1),
				month: k.value(n - 1)
			}));
			ne(n, r.month, r.year);
		}
	}, Oe = (e) => {
		if (we(e.value) || !S(e.value, c.value, +!m.value.fixedStart)) return n("invalid-date", e.value);
		a.value = qp(Q(e.value), c, n, m);
	}, F = (r, i) => {
		if (Te(), m.value.autoRange) return Ee(r, i);
		if (m.value.fixedStart || m.value.fixedEnd) return Oe(r);
		a.value[0] ? S(Q(r.value), c.value) && !we(r.value) ? ff(Q(r.value), Q(a.value[0])) ? (a.value.unshift(Q(r.value)), n("range-end", a.value[0])) : (a.value[1] = Q(r.value), n("range-end", a.value[1])) : (e.autoApply && n("auto-apply-invalid", r.value), n("invalid-date", r.value)) : (a.value[0] = Q(r.value), n("range-start", a.value[0]));
	}, ke = (n = !0) => e.enableSeconds ? Array.isArray(u.seconds) ? n ? u.seconds[0] : u.seconds[1] : u.seconds : 0, Ae = (e) => {
		a.value[e] = df(a.value[e], u.hours[e], u.minutes[e], ke(e !== 1));
	}, je = () => {
		a.value[0] && a.value[1] && +a.value?.[0] > +a.value?.[1] && (a.value.reverse(), n("range-start", a.value[0]), n("range-end", a.value[1]));
	}, Me = () => {
		a.value.length && (a.value[0] && !a.value[1] ? Ae(0) : (Ae(0), Ae(1), i()), je(), c.value = a.value.slice(), Gp(a.value, n, e.autoApply, e.modelAuto));
	}, Ne = (r, i = !1) => {
		if (b(r.value) || !r.current && e.hideOffsetDates) return n("invalid-date", r.value);
		if (s.value = JSON.parse(JSON.stringify(r)), !m.value.enabled) return Ce(r);
		Om(u.hours) && Om(u.minutes) && !v.value.enabled && (F(r, i), Me());
	}, Pe = (a, o) => {
		ne(a, o.month, o.year, !0), f.value.count && !f.value.solo && N(a), n("update-month-year", {
			instance: a,
			month: o.month,
			year: o.year
		}), r(f.value.solo ? a : void 0);
		let s = e.flow?.length ? e.flow[e.flowStep] : void 0;
		o.fromNav || s !== Td.month && s !== Td.year || i();
	}, Fe = (n, r) => {
		Kp({
			value: n,
			modelValue: c,
			range: m.value.enabled,
			timezone: r ? void 0 : g.value.timezone
		}), re(), e.multiCalendars && $e().then(() => oe(!0));
	}, I = () => {
		let e = _d(Q(), g.value);
		!m.value.enabled && !v.value.enabled ? c.value = e : c.value && Array.isArray(c.value) && c.value[0] ? v.value.enabled ? c.value = [...c.value, e] : c.value = ff(e, c.value[0]) ? [e, c.value[0]] : [c.value[0], e] : c.value = [e], re();
	}, Ie = () => {
		if (Array.isArray(c.value)) {
			if (v.value.enabled) {
				let e = Le();
				c.value[c.value.length - 1] = w(e);
			} else c.value = c.value.map((e, n) => e && w(e, n));
		} else c.value = w(c.value);
		n("time-update");
	}, Le = () => Array.isArray(c.value) && c.value.length ? c.value[c.value.length - 1] : null;
	return {
		calendars: l,
		modelValue: c,
		month: k,
		year: ee,
		time: u,
		disabledTimesConfig: O,
		today: d,
		validateTime: D,
		getCalendarDays: Se,
		getMarker: P,
		handleScroll: ge,
		handleSwipe: ve,
		handleArrow: _e,
		selectDate: Ne,
		updateMonthYear: Pe,
		presetDate: Fe,
		selectCurrentDate: I,
		updateTime: (e, n = !0, r = !1) => {
			C(e, n, r, Ie);
		},
		assignMonthAndYear: ce,
		setStartTime: A
	};
}, Am = { key: 0 }, jm = /* @__PURE__ */ xt({
	__name: "DatePicker",
	props: { ...Op },
	emits: [
		"tooltip-open",
		"tooltip-close",
		"mount",
		"update:internal-model-value",
		"update-flow-step",
		"reset-flow",
		"auto-apply",
		"focus-menu",
		"select-date",
		"range-start",
		"range-end",
		"invalid-fixed-range",
		"time-update",
		"am-pm-change",
		"time-picker-open",
		"time-picker-close",
		"recalculate-position",
		"update-month-year",
		"auto-apply-invalid",
		"date-update",
		"invalid-date",
		"overlay-toggle"
	],
	setup(e, { expose: n, emit: r }) {
		let i = r, a = e, { calendars: o, month: s, year: c, modelValue: l, time: d, disabledTimesConfig: f, today: p, validateTime: m, getCalendarDays: h, getMarker: g, handleArrow: _, handleScroll: y, handleSwipe: b, selectDate: x, updateMonthYear: S, presetDate: C, selectCurrentDate: w, updateTime: T, assignMonthAndYear: E, setStartTime: D } = km(a, i, de, fe), O = ae(), { setHoverDate: k, getDayClassData: ee, clearHoverDate: te } = th(l, a), { defaultedMultiCalendars: ne } = wp(a), re = W([]), ie = W([]), oe = W(null), se = Qm(O, "calendar"), ce = Qm(O, "monthYear"), le = Qm(O, "timePicker"), j = (e) => {
			a.shadow || i("mount", e);
		};
		v(o, () => {
			a.shadow || setTimeout(() => {
				i("recalculate-position");
			}, 0);
		}, { deep: !0 }), v(ne, (e, n) => {
			e.count - n.count > 0 && E();
		}, { deep: !0 });
		let ue = M(() => (e) => h(s.value(e), c.value(e)).map((e) => ({
			...e,
			days: e.days.map((e) => (e.marker = g(e), e.classData = ee(e), e))
		})));
		function de(e) {
			e || e === 0 ? ie.value[e]?.triggerTransition(s.value(e), c.value(e)) : ie.value.forEach((e, n) => e.triggerTransition(s.value(n), c.value(n)));
		}
		function fe() {
			i("update-flow-step");
		}
		let pe = (e, n = !1) => {
			x(e, n), a.spaceConfirm && i("select-date");
		}, N = (e, n, r = 0) => {
			re.value[r]?.toggleMonthPicker(e, n);
		}, me = (e, n, r = 0) => {
			re.value[r]?.toggleYearPicker(e, n);
		}, he = (e, n, r) => {
			oe.value?.toggleTimePicker(e, n, r);
		}, ge = (e, n) => {
			if (!a.range) {
				let r = l.value ? l.value : p, i = n ? new Date(n) : r, a = e ? Vn(i, { weekStartsOn: 1 }) : Xc(i, { weekStartsOn: 1 });
				x({
					value: a,
					current: Fl(i) === s.value(0),
					text: "",
					classData: {}
				}), document.getElementById(Wf(a))?.focus();
			}
		}, _e = (e) => {
			re.value[0]?.handleMonthYearChange(e, !0);
		}, ve = (e) => {
			S(0, {
				month: s.value(0),
				year: c.value(0) + (e ? 1 : -1),
				fromNav: !0
			});
		}, P = (e, n) => {
			e === Td.time && i(`time-picker-${n ? "open" : "close"}`), i("overlay-toggle", {
				open: n,
				overlay: e
			});
		}, ye = (e) => {
			i("overlay-toggle", {
				open: !1,
				overlay: e
			}), i("focus-menu");
		};
		return n({
			clearHoverDate: te,
			presetDate: C,
			selectCurrentDate: w,
			toggleMonthPicker: N,
			toggleYearPicker: me,
			toggleTimePicker: he,
			handleArrow: _,
			updateMonthYear: S,
			getSidebarProps: () => ({
				modelValue: l,
				month: s,
				year: c,
				time: d,
				updateTime: T,
				updateMonthYear: S,
				selectDate: x,
				presetDate: C
			}),
			changeMonth: _e,
			changeYear: ve,
			selectWeekDate: ge,
			setStartTime: D
		}), (e, n) => (J(), H(F, null, [I(Rp, {
			"multi-calendars": V(ne).count,
			collapse: e.collapse,
			"is-mobile": e.isMobile
		}, {
			default: A(({ instance: r, index: i }) => [e.disableMonthYearSelect ? K("", !0) : (J(), L(bm, B({
				key: 0,
				ref: (e) => {
					e && (re.value[i] = e);
				},
				months: V(Pd)(e.formatLocale, e.locale, e.monthNameFormat),
				years: V(Nd)(e.yearRange, e.locale, e.reverseYears),
				month: V(s)(r),
				year: V(c)(r),
				instance: r
			}, e.$props, {
				onMount: n[0] ||= (e) => j(V(wd).header),
				onResetFlow: n[1] ||= (n) => e.$emit("reset-flow"),
				onUpdateMonthYear: (e) => V(S)(r, e),
				onOverlayClosed: ye,
				onOverlayOpened: n[2] ||= (n) => e.$emit("overlay-toggle", {
					open: !0,
					overlay: n
				})
			}), yt({ _: 2 }, [u(V(ce), (n, r) => ({
				name: n,
				fn: A((r) => [q(e.$slots, n, nt(lt(r)))])
			}))]), 1040, [
				"months",
				"years",
				"month",
				"year",
				"instance",
				"onUpdateMonthYear"
			])), I(Dm, B({
				ref: (e) => {
					e && (ie.value[i] = e);
				},
				"mapped-dates": ue.value(r),
				month: V(s)(r),
				year: V(c)(r),
				instance: r
			}, e.$props, {
				onSelectDate: (e) => V(x)(e, r !== 1),
				onHandleSpace: (e) => pe(e, r !== 1),
				onSetHoverDate: n[3] ||= (e) => V(k)(e),
				onHandleScroll: (e) => V(y)(e, r),
				onHandleSwipe: (e) => V(b)(e, r),
				onMount: n[4] ||= (e) => j(V(wd).calendar),
				onResetFlow: n[5] ||= (n) => e.$emit("reset-flow"),
				onTooltipOpen: n[6] ||= (n) => e.$emit("tooltip-open", n),
				onTooltipClose: n[7] ||= (n) => e.$emit("tooltip-close", n)
			}), yt({ _: 2 }, [u(V(se), (n, r) => ({
				name: n,
				fn: A((r) => [q(e.$slots, n, nt(lt({ ...r })))])
			}))]), 1040, [
				"mapped-dates",
				"month",
				"year",
				"instance",
				"onSelectDate",
				"onHandleSpace",
				"onHandleScroll",
				"onHandleSwipe"
			])]),
			_: 3
		}, 8, [
			"multi-calendars",
			"collapse",
			"is-mobile"
		]), e.enableTimePicker ? (J(), H("div", Am, [e.$slots["time-picker"] ? q(e.$slots, "time-picker", nt(B({ key: 0 }, {
			time: V(d),
			updateTime: V(T)
		}))) : (J(), L(dm, B({
			key: 1,
			ref_key: "timePickerRef",
			ref: oe
		}, e.$props, {
			hours: V(d).hours,
			minutes: V(d).minutes,
			seconds: V(d).seconds,
			"internal-model-value": e.internalModelValue,
			"disabled-times-config": V(f),
			"validate-time": V(m),
			onMount: n[8] ||= (e) => j(V(wd).timePicker),
			"onUpdate:hours": n[9] ||= (e) => V(T)(e),
			"onUpdate:minutes": n[10] ||= (e) => V(T)(e, !1),
			"onUpdate:seconds": n[11] ||= (e) => V(T)(e, !1, !0),
			onResetFlow: n[12] ||= (n) => e.$emit("reset-flow"),
			onOverlayClosed: n[13] ||= (e) => P(e, !1),
			onOverlayOpened: n[14] ||= (e) => P(e, !0),
			onAmPmChange: n[15] ||= (n) => e.$emit("am-pm-change", n)
		}), yt({ _: 2 }, [u(V(le), (n, r) => ({
			name: n,
			fn: A((r) => [q(e.$slots, n, nt(lt(r)))])
		}))]), 1040, [
			"hours",
			"minutes",
			"seconds",
			"internal-model-value",
			"disabled-times-config",
			"validate-time"
		]))])) : K("", !0)], 64));
	}
}), Mm = (e, n) => {
	let r = W(), { defaultedMultiCalendars: i, defaultedConfig: a, defaultedHighlight: o, defaultedRange: s, propDates: c, defaultedFilters: l, defaultedMultiDates: u } = wp(e), { modelValue: d, year: f, month: p, calendars: m } = eh(e, n), { isDisabled: h } = nh(e), { selectYear: g, groupedYears: _, showYearPicker: v, isDisabled: y, toggleYearPicker: b, handleYearSelect: x, handleYear: S } = Jp({
		modelValue: d,
		multiCalendars: i,
		range: s,
		highlight: o,
		calendars: m,
		propDates: c,
		month: p,
		year: f,
		filters: l,
		props: e,
		emit: n
	}), C = (n, r) => [n, r].map((n) => Dl(n, "MMMM", { locale: e.formatLocale })).join("-"), w = M(() => (e) => d.value ? Array.isArray(d.value) ? d.value.some((n) => Zu(e, n)) : Zu(d.value, e) : !1), T = (e) => {
		if (s.value.enabled) {
			if (Array.isArray(d.value)) {
				let n = pf(e, d.value[0]) || pf(e, d.value[1]);
				return hf(d.value, r.value, e) && !n;
			}
			return !1;
		}
		return !1;
	}, E = (e, n) => e.quarter === Bc(n) && e.year === Ll(n), D = (e) => typeof o.value == "function" ? o.value({
		quarter: Bc(e),
		year: Ll(e)
	}) : !!o.value.quarters.find((n) => E(n, e)), O = M(() => (e) => {
		let n = ed(/* @__PURE__ */ new Date(), { year: f.value(e) });
		return Kc({
			start: Yc(n),
			end: Jc(n)
		}).map((e) => {
			let n = Gc(e), r = Zc(e), i = h(e), a = T(n), o = D(n);
			return {
				text: C(n, r),
				value: n,
				active: w.value(n),
				highlighted: o,
				disabled: i,
				isBetween: a
			};
		});
	}), k = (e) => {
		Up(e, d, u.value.limit), n("auto-apply", !0);
	}, ee = (r) => {
		d.value = Wp(d, r, n), Gp(d.value, n, e.autoApply, e.modelAuto);
	}, te = (e) => {
		d.value = e, n("auto-apply");
	};
	return {
		defaultedConfig: a,
		defaultedMultiCalendars: i,
		groupedYears: _,
		year: f,
		isDisabled: y,
		quarters: O,
		showYearPicker: v,
		modelValue: d,
		setHoverDate: (e) => {
			r.value = e;
		},
		selectYear: g,
		selectQuarter: (e, n, r) => {
			if (!r) return m.value[n].month = Fl(Zc(e)), u.value.enabled ? k(e) : s.value.enabled ? ee(e) : te(e);
		},
		toggleYearPicker: b,
		handleYearSelect: x,
		handleYear: S
	};
}, Nm = { class: "dp--quarter-items" }, Pm = [
	"data-test-id",
	"disabled",
	"onClick",
	"onMouseover"
], Fm = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "QuarterPicker",
	props: { ...Op },
	emits: [
		"update:internal-model-value",
		"reset-flow",
		"overlay-closed",
		"auto-apply",
		"range-start",
		"range-end",
		"overlay-toggle",
		"update-month-year"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, s = Qm(ae(), "yearMode"), { defaultedMultiCalendars: c, defaultedConfig: l, groupedYears: d, year: f, isDisabled: p, quarters: m, modelValue: h, showYearPicker: g, setHoverDate: _, selectQuarter: v, toggleYearPicker: y, handleYearSelect: b, handleYear: x } = Mm(o, a);
		return r({ getSidebarProps: () => ({
			modelValue: h,
			year: f,
			selectQuarter: v,
			handleYearSelect: b,
			handleYear: x
		}) }), (e, r) => (J(), L(Rp, {
			"multi-calendars": V(c).count,
			collapse: e.collapse,
			stretch: "",
			"is-mobile": e.isMobile
		}, {
			default: A(({ instance: r }) => [n("div", {
				class: "dp-quarter-picker-wrap",
				style: Pe({ minHeight: `${V(l).modeHeight}px` })
			}, [
				e.$slots["top-extra"] ? q(e.$slots, "top-extra", {
					key: 0,
					value: e.internalModelValue
				}) : K("", !0),
				n("div", null, [I(Hp, B(e.$props, {
					items: V(d)(r),
					instance: r,
					"show-year-picker": V(g)[r],
					year: V(f)(r),
					"is-disabled": (e) => V(p)(r, e),
					onHandleYear: (e) => V(x)(r, e),
					onYearSelect: (e) => V(b)(e, r),
					onToggleYearPicker: (e) => V(y)(r, e?.flow, e?.show)
				}), yt({ _: 2 }, [u(V(s), (n, r) => ({
					name: n,
					fn: A((r) => [q(e.$slots, n, nt(lt(r)))])
				}))]), 1040, [
					"items",
					"instance",
					"show-year-picker",
					"year",
					"is-disabled",
					"onHandleYear",
					"onYearSelect",
					"onToggleYearPicker"
				])]),
				n("div", Nm, [(J(!0), H(F, null, u(V(m)(r), (i, a) => (J(), H("div", { key: a }, [n("button", {
					type: "button",
					class: G(["dp--qr-btn", {
						"dp--qr-btn-active": i.active,
						"dp--qr-btn-between": i.isBetween,
						"dp--qr-btn-disabled": i.disabled,
						"dp--highlighted": i.highlighted
					}]),
					"data-test-id": i.value,
					disabled: i.disabled,
					onClick: (e) => V(v)(i.value, r, i.disabled),
					onMouseover: (e) => V(_)(i.value)
				}, [e.$slots.quarter ? q(e.$slots, "quarter", {
					key: 0,
					value: i.value,
					text: i.text
				}) : (J(), H(F, { key: 1 }, [z(U(i.text), 1)], 64))], 42, Pm)]))), 128))])
			], 4)]),
			_: 3
		}, 8, [
			"multi-calendars",
			"collapse",
			"is-mobile"
		]));
	}
}), Im = (e, n) => {
	let r = W(0);
	It(() => {
		i(), window.addEventListener("resize", i, { passive: !0 });
	}), Ie(() => {
		window.removeEventListener("resize", i);
	});
	let i = () => {
		r.value = window.document.documentElement.clientWidth;
	};
	return { isMobile: M(() => r.value <= e.value.mobileBreakpoint && !n || void 0) };
}, Lm = [
	"id",
	"tabindex",
	"role",
	"aria-label"
], Rm = {
	key: 0,
	class: "dp--menu-load-container"
}, zm = {
	key: 1,
	class: "dp--menu-header"
}, Bm = ["data-dp-mobile"], Vm = {
	key: 0,
	class: "dp__sidebar_left"
}, Hm = ["data-dp-mobile"], Um = [
	"data-test-id",
	"data-dp-mobile",
	"onClick",
	"onKeydown"
], Wm = {
	key: 2,
	class: "dp__sidebar_right"
}, Gm = {
	key: 3,
	class: "dp__action_extra"
}, Km = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "DatepickerMenu",
	props: {
		...Dp,
		shadow: {
			type: Boolean,
			default: !1
		},
		openOnTop: {
			type: Boolean,
			default: !1
		},
		internalModelValue: {
			type: [Date, Array],
			default: null
		},
		noOverlayFocus: {
			type: Boolean,
			default: !1
		},
		collapse: {
			type: Boolean,
			default: !1
		},
		getInputRect: {
			type: Function,
			default: () => ({})
		},
		isTextInputDate: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"close-picker",
		"select-date",
		"auto-apply",
		"time-update",
		"flow-step",
		"update-month-year",
		"invalid-select",
		"update:internal-model-value",
		"recalculate-position",
		"invalid-fixed-range",
		"tooltip-open",
		"tooltip-close",
		"time-picker-open",
		"time-picker-close",
		"am-pm-change",
		"range-start",
		"range-end",
		"auto-apply-invalid",
		"date-update",
		"invalid-date",
		"overlay-toggle",
		"menu-blur"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, s = W(null), c = M(() => {
			let { openOnTop: e, ...n } = o;
			return {
				...n,
				isMobile: b.value,
				flowStep: ie.value,
				menuWrapRef: s.value
			};
		}), { setMenuFocused: l, setShiftKey: d, control: f } = Jf(), m = ae(), { defaultedTextInput: h, defaultedInline: g, defaultedConfig: _, defaultedUI: v, handleEventPropagation: y } = wp(o), { isMobile: b } = Im(_, o.shadow), x = W(null), S = W(0), C = W(null), w = W(!1), T = W(null), E = W(!1), O = (e) => {
			E.value = !0, _.value.allowPreventDefault && e.preventDefault(), qd(e, _.value, !0);
		};
		It(() => {
			if (!o.shadow) {
				w.value = !0, k(), window.addEventListener("resize", k);
				let e = Id(s);
				e && !h.value.enabled && !g.value.enabled && (l(!0), de()), e && (e.addEventListener("pointerdown", O), e.addEventListener("mousedown", O));
			}
			document.addEventListener("mousedown", je);
		}), Ie(() => {
			window.removeEventListener("resize", k), document.removeEventListener("mousedown", je);
			let e = Id(s);
			e && (e.removeEventListener("pointerdown", O), e.removeEventListener("mousedown", O));
		});
		let k = () => {
			let e = Id(C);
			e && (S.value = e.getBoundingClientRect().width);
		}, { arrowRight: ee, arrowLeft: te, arrowDown: ne, arrowUp: re } = rp(), { flowStep: ie, updateFlowStep: oe, childMount: se, resetFlow: ce, handleFlow: le } = ih(o, a, T), j = M(() => o.monthPicker ? Xp : o.yearPicker ? Qp : o.timePicker ? mm : o.quarterPicker ? Fm : jm), ue = M(() => {
			if (_.value.arrowLeft) return _.value.arrowLeft;
			let e = s.value?.getBoundingClientRect(), n = o.getInputRect();
			return n?.width < S?.value && n?.left <= (e?.left ?? 0) ? `${n?.width / 2}px` : n?.right >= (e?.right ?? 0) && n?.width < S?.value ? `${S?.value - n?.width / 2}px` : "50%";
		}), de = () => {
			let e = Id(s);
			e && e.focus({ preventScroll: !0 });
		}, fe = M(() => T.value?.getSidebarProps() || {}), pe = () => {
			o.openOnTop && a("recalculate-position");
		}, N = Qm(m, "action"), me = M(() => o.monthPicker || o.yearPicker ? Qm(m, "monthYear") : o.timePicker ? Qm(m, "timePicker") : Qm(m, "shared")), he = M(() => o.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), ge = M(() => ({
			dp__menu_disabled: o.disabled,
			dp__menu_readonly: o.readonly,
			"dp-menu-loading": o.loading
		})), _e = M(() => ({
			dp__menu: !0,
			dp__menu_index: !g.value.enabled,
			dp__relative: g.value.enabled,
			...v.value.menu ?? {}
		})), ve = (e) => {
			qd(e, _.value, !0);
		}, P = (e) => {
			o.escClose && (a("close-picker"), y(e));
		}, ye = (e) => {
			if (o.arrowNavigation) {
				if (e === Dd.up) return re();
				if (e === Dd.down) return ne();
				if (e === Dd.left) return te();
				if (e === Dd.right) return ee();
			} else e === Dd.left || e === Dd.up ? we("handleArrow", Dd.left, 0, e === Dd.up) : we("handleArrow", Dd.right, 0, e === Dd.down);
		}, be = (e) => {
			d(e.shiftKey), !o.disableMonthYearSelect && e.code === Od.tab && e.target.classList.contains("dp__menu") && f.value.shiftKeyInMenu && (e.preventDefault(), qd(e, _.value, !0), a("close-picker"));
		}, xe = () => {
			de(), a("time-picker-close");
		}, Se = (e) => {
			T.value?.toggleTimePicker(!1, !1), T.value?.toggleMonthPicker(!1, !1, e), T.value?.toggleYearPicker(!1, !1, e);
		}, Ce = (e, n = 0) => e === "month" ? T.value?.toggleMonthPicker(!1, !0, n) : e === "year" ? T.value?.toggleYearPicker(!1, !0, n) : e === "time" ? T.value?.toggleTimePicker(!0, !1) : Se(n), we = (e, ...n) => {
			T.value?.[e] && T.value?.[e](...n);
		}, Te = () => {
			we("selectCurrentDate");
		}, Ee = (e, n) => {
			we("presetDate", Ue(e), n);
		}, De = () => {
			we("clearHoverDate");
		}, Oe = (e, n) => {
			we("updateMonthYear", e, n);
		}, ke = (e, n) => {
			e.preventDefault(), ye(n);
		}, Ae = (e) => {
			if (be(e), e.key === Od.home || e.key === Od.end) return we("selectWeekDate", e.key === Od.home, e.target.getAttribute("id"));
			switch ((e.key === Od.pageUp || e.key === Od.pageDown) && (e.shiftKey ? (we("changeYear", e.key === Od.pageUp), Xd(s.value, "overlay-year")?.focus()) : (we("changeMonth", e.key === Od.pageUp), Xd(s.value, e.key === Od.pageUp ? "action-prev" : "action-next")?.focus()), e.target.getAttribute("id") && s.value?.focus({ preventScroll: !0 })), e.key) {
				case Od.esc: return P(e);
				case Od.arrowLeft: return ke(e, Dd.left);
				case Od.arrowRight: return ke(e, Dd.right);
				case Od.arrowUp: return ke(e, Dd.up);
				case Od.arrowDown: return ke(e, Dd.down);
				default: return;
			}
		}, je = (e) => {
			g.value.enabled && !g.value.input && !s.value?.contains(e.target) && E.value && (E.value = !1, a("menu-blur"));
		};
		return r({
			updateMonthYear: Oe,
			switchView: Ce,
			handleFlow: le,
			onValueCleared: () => {
				T.value?.setStartTime?.();
			}
		}), (r, i) => (J(), H("div", {
			id: r.uid ? `dp-menu-${r.uid}` : void 0,
			ref_key: "dpMenuRef",
			ref: s,
			tabindex: V(g).enabled ? void 0 : "0",
			role: V(g).enabled ? void 0 : "dialog",
			"aria-label": r.ariaLabels?.menu,
			class: G(_e.value),
			style: Pe({ "--dp-arrow-left": ue.value }),
			onMouseleave: De,
			onClick: ve,
			onKeydown: Ae
		}, [
			(r.disabled || r.readonly) && V(g).enabled || r.loading ? (J(), H("div", {
				key: 0,
				class: G(ge.value)
			}, [r.loading ? (J(), H("div", Rm, [...i[19] ||= [n("span", { class: "dp--menu-loader" }, null, -1)]])) : K("", !0)], 2)) : K("", !0),
			r.$slots["menu-header"] ? (J(), H("div", zm, [q(r.$slots, "menu-header")])) : K("", !0),
			!V(g).enabled && !r.teleportCenter ? (J(), H("div", {
				key: 2,
				class: G(he.value)
			}, null, 2)) : K("", !0),
			n("div", {
				ref_key: "innerMenuRef",
				ref: C,
				class: G({
					dp__menu_content_wrapper: r.presetDates?.length || !!r.$slots["left-sidebar"] || !!r.$slots["right-sidebar"],
					"dp--menu-content-wrapper-collapsed": e.collapse && (r.presetDates?.length || !!r.$slots["left-sidebar"] || !!r.$slots["right-sidebar"])
				}),
				"data-dp-mobile": V(b),
				style: Pe({ "--dp-menu-width": `${S.value}px` })
			}, [
				r.$slots["left-sidebar"] ? (J(), H("div", Vm, [q(r.$slots, "left-sidebar", nt(lt(fe.value)))])) : K("", !0),
				r.presetDates.length ? (J(), H("div", {
					key: 1,
					class: G({
						"dp--preset-dates-collapsed": e.collapse,
						"dp--preset-dates": !0
					}),
					"data-dp-mobile": V(b)
				}, [(J(!0), H(F, null, u(r.presetDates, (n, i) => (J(), H(F, { key: i }, [n.slot ? q(r.$slots, n.slot, {
					key: 0,
					presetDate: Ee,
					label: n.label,
					value: n.value
				}) : (J(), H("button", {
					key: 1,
					type: "button",
					style: Pe(n.style || {}),
					class: G(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
					"data-test-id": n.testId ?? void 0,
					"data-dp-mobile": V(b),
					onClick: D((e) => Ee(n.value, n.noTz), ["prevent"]),
					onKeydown: (e) => V(nf)(e, () => Ee(n.value, n.noTz), !0)
				}, U(n.label), 47, Um))], 64))), 128))], 10, Hm)) : K("", !0),
				n("div", {
					ref_key: "calendarWrapperRef",
					ref: x,
					class: "dp__instance_calendar",
					role: "document"
				}, [(J(), L(p(j.value), B({
					ref_key: "dynCmpRef",
					ref: T
				}, c.value, {
					"flow-step": V(ie),
					onMount: V(se),
					onUpdateFlowStep: V(oe),
					onResetFlow: V(ce),
					onFocusMenu: de,
					onSelectDate: i[0] ||= (e) => r.$emit("select-date"),
					onDateUpdate: i[1] ||= (e) => r.$emit("date-update", e),
					onTooltipOpen: i[2] ||= (e) => r.$emit("tooltip-open", e),
					onTooltipClose: i[3] ||= (e) => r.$emit("tooltip-close", e),
					onAutoApply: i[4] ||= (e) => r.$emit("auto-apply", e),
					onRangeStart: i[5] ||= (e) => r.$emit("range-start", e),
					onRangeEnd: i[6] ||= (e) => r.$emit("range-end", e),
					onInvalidFixedRange: i[7] ||= (e) => r.$emit("invalid-fixed-range", e),
					onTimeUpdate: i[8] ||= (e) => r.$emit("time-update"),
					onAmPmChange: i[9] ||= (e) => r.$emit("am-pm-change", e),
					onTimePickerOpen: i[10] ||= (e) => r.$emit("time-picker-open", e),
					onTimePickerClose: xe,
					onRecalculatePosition: pe,
					onUpdateMonthYear: i[11] ||= (e) => r.$emit("update-month-year", e),
					onAutoApplyInvalid: i[12] ||= (e) => r.$emit("auto-apply-invalid", e),
					onInvalidDate: i[13] ||= (e) => r.$emit("invalid-date", e),
					onOverlayToggle: i[14] ||= (e) => r.$emit("overlay-toggle", e),
					"onUpdate:internalModelValue": i[15] ||= (e) => r.$emit("update:internal-model-value", e)
				}), yt({ _: 2 }, [u(me.value, (e, n) => ({
					name: e,
					fn: A((n) => [q(r.$slots, e, nt(lt({ ...n })))])
				}))]), 1040, [
					"flow-step",
					"onMount",
					"onUpdateFlowStep",
					"onResetFlow"
				]))], 512),
				r.$slots["right-sidebar"] ? (J(), H("div", Wm, [q(r.$slots, "right-sidebar", nt(lt(fe.value)))])) : K("", !0),
				r.$slots["action-extra"] ? (J(), H("div", Gm, [r.$slots["action-extra"] ? q(r.$slots, "action-extra", {
					key: 0,
					selectCurrentDate: Te
				}) : K("", !0)])) : K("", !0)
			], 14, Bm),
			!r.autoApply || V(_).keepActionRow ? (J(), L(jp, B({
				key: 3,
				"menu-mount": w.value
			}, c.value, {
				"calendar-width": S.value,
				onClosePicker: i[16] ||= (e) => r.$emit("close-picker"),
				onSelectDate: i[17] ||= (e) => r.$emit("select-date"),
				onInvalidSelect: i[18] ||= (e) => r.$emit("invalid-select"),
				onSelectNow: Te
			}), yt({ _: 2 }, [u(V(N), (e, n) => ({
				name: e,
				fn: A((n) => [q(r.$slots, e, nt(lt({ ...n })))])
			}))]), 1040, ["menu-mount", "calendar-width"])) : K("", !0)
		], 46, Lm));
	}
}), qm = /* @__PURE__ */ ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(qm || {}), Jm = ({ menuRef: e, menuRefInner: n, inputRef: r, pickerWrapperRef: i, inline: a, emit: o, props: s, slots: c }) => {
	let { defaultedConfig: l } = wp(s), u = W({}), d = W(!1), f = W({
		top: "0",
		left: "0"
	}), p = W(!1), m = fe(s, "teleportCenter");
	v(m, () => {
		f.value = JSON.parse(JSON.stringify({})), w();
	});
	let h = (e) => {
		if (s.teleport) {
			let n = e.getBoundingClientRect();
			return {
				left: n.left + window.scrollX,
				top: n.top + window.scrollY
			};
		}
		return {
			top: 0,
			left: 0
		};
	}, g = (e, n) => {
		f.value.left = `${e + n - u.value.width}px`;
	}, _ = (e) => {
		f.value.left = `${e}px`;
	}, y = (e, n) => {
		s.position === qm.left && _(e), s.position === qm.right && g(e, n), s.position === qm.center && (f.value.left = `${e + n / 2 - u.value.width / 2}px`);
	}, b = (e) => {
		let { width: n, height: r } = e.getBoundingClientRect(), { top: i, left: a } = h(e);
		return {
			top: +i,
			left: +a,
			width: n,
			height: r
		};
	}, x = () => {
		f.value.left = "50%", f.value.top = "50%", f.value.transform = "translate(-50%, -50%)", f.value.position = "fixed", delete f.value.opacity;
	}, C = () => {
		let e = Id(r);
		f.value = s.altPosition(e);
	}, w = (r = !0) => {
		if (!a.value.enabled) {
			if (m.value) return x();
			if (s.altPosition !== null) return C();
			if (r) {
				let r = s.teleport ? n.value?.$el : e.value;
				r && (u.value = r.getBoundingClientRect()), o("recalculate-position");
			}
			return te();
		}
	}, T = ({ inputEl: e, left: n, width: r }) => {
		window.screen.width > 768 && !d.value && y(n, r), O(e);
	}, E = (e) => {
		let { top: n, left: r, height: i, width: a } = b(e);
		f.value.top = `${i + n + +s.offset}px`, p.value = !1, d.value || (f.value.left = `${r + a / 2 - u.value.width / 2}px`), T({
			inputEl: e,
			left: r,
			width: a
		});
	}, D = (e) => {
		let { top: n, left: r, width: i } = b(e);
		f.value.top = `${n - +s.offset - u.value.height}px`, p.value = !0, T({
			inputEl: e,
			left: r,
			width: i
		});
	}, O = (e) => {
		if (s.autoPosition) {
			let { left: n, width: r } = b(e), { left: i, right: a } = u.value;
			if (!d.value) {
				if (Math.abs(i) !== Math.abs(a)) {
					if (i <= 0) return d.value = !0, _(n);
					if (a >= document.documentElement.clientWidth) return d.value = !0, g(n, r);
				}
				return y(n, r);
			}
		}
	}, k = () => {
		let e = Id(r);
		if (e) {
			if (s.autoPosition === Cd.top) return Cd.top;
			if (s.autoPosition === Cd.bottom) return Cd.bottom;
			let { height: n } = u.value, { top: r, height: i } = e.getBoundingClientRect(), a = window.innerHeight - r - i, o = r;
			return n <= a ? Cd.bottom : n > a && n <= o ? Cd.top : a >= o ? Cd.bottom : Cd.top;
		}
		return Cd.bottom;
	}, ee = (e) => k() === Cd.bottom ? E(e) : D(e), te = () => {
		let e = Id(r);
		if (e) return s.autoPosition ? ee(e) : E(e);
	}, ne = function(e) {
		if (e) {
			let n = e.scrollHeight > e.clientHeight, r = window.getComputedStyle(e).overflowY.indexOf("hidden") !== -1;
			return n && !r;
		}
		return !0;
	}, re = function(e) {
		return !e || e === document.body || e.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : ne(e) ? e : re(e.assignedSlot && l.value.shadowDom ? e.assignedSlot.parentNode : e.parentNode);
	}, A = (e) => {
		if (e) switch (s.position) {
			case qm.left: return {
				left: 0,
				transform: "translateX(0)"
			};
			case qm.right: return {
				left: `${e.width}px`,
				transform: "translateX(-100%)"
			};
			default: return {
				left: `${e.width / 2}px`,
				transform: "translateX(-50%)"
			};
		}
		return {};
	};
	return {
		openOnTop: p,
		menuStyle: f,
		xCorrect: d,
		setMenuPosition: w,
		getScrollableParent: re,
		shadowRender: (e, n, a) => {
			let o = document.createElement("div"), s = Id(r)?.getBoundingClientRect();
			o.setAttribute("id", "dp--temp-container");
			let d = i.value?.clientWidth ? i.value : document.body;
			d.append(o);
			let f = A(s), p = l.value.shadowDom ? Object.keys(c).filter((e) => [
				"right-sidebar",
				"left-sidebar",
				"top-extra",
				"action-extra"
			].includes(e)) : Object.keys(c), m = Dt(n, {
				...a,
				shadow: !0,
				style: {
					opacity: 0,
					position: "absolute",
					...f
				}
			}, Object.fromEntries(p.map((e) => [e, c[e]])));
			e != null && (m.appContext = e.appContext), S(m, o), u.value = m.el?.getBoundingClientRect(), S(null, o), d.removeChild(o);
		}
	};
}, Ym = [
	{
		name: "clock-icon",
		use: [
			"time",
			"calendar",
			"shared"
		]
	},
	{
		name: "arrow-left",
		use: [
			"month-year",
			"calendar",
			"shared",
			"year-mode"
		]
	},
	{
		name: "arrow-right",
		use: [
			"month-year",
			"calendar",
			"shared",
			"year-mode"
		]
	},
	{
		name: "arrow-up",
		use: [
			"time",
			"calendar",
			"month-year",
			"shared"
		]
	},
	{
		name: "arrow-down",
		use: [
			"time",
			"calendar",
			"month-year",
			"shared"
		]
	},
	{
		name: "calendar-icon",
		use: [
			"month-year",
			"time",
			"calendar",
			"shared",
			"year-mode"
		]
	},
	{
		name: "day",
		use: ["calendar", "shared"]
	},
	{
		name: "month-overlay-value",
		use: [
			"calendar",
			"month-year",
			"shared"
		]
	},
	{
		name: "year-overlay-value",
		use: [
			"calendar",
			"month-year",
			"shared",
			"year-mode"
		]
	},
	{
		name: "year-overlay",
		use: ["month-year", "shared"]
	},
	{
		name: "month-overlay",
		use: ["month-year", "shared"]
	},
	{
		name: "month-overlay-header",
		use: ["month-year", "shared"]
	},
	{
		name: "year-overlay-header",
		use: ["month-year", "shared"]
	},
	{
		name: "hours-overlay-value",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "hours-overlay-header",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "minutes-overlay-value",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "minutes-overlay-header",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "seconds-overlay-value",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "seconds-overlay-header",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "hours",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "minutes",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "month",
		use: [
			"calendar",
			"month-year",
			"shared"
		]
	},
	{
		name: "year",
		use: [
			"calendar",
			"month-year",
			"shared",
			"year-mode"
		]
	},
	{
		name: "action-buttons",
		use: ["action"]
	},
	{
		name: "action-preview",
		use: ["action"]
	},
	{
		name: "calendar-header",
		use: ["calendar", "shared"]
	},
	{
		name: "marker-tooltip",
		use: ["calendar", "shared"]
	},
	{
		name: "action-extra",
		use: ["menu"]
	},
	{
		name: "time-picker-overlay",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "am-pm-button",
		use: [
			"calendar",
			"time",
			"shared"
		]
	},
	{
		name: "left-sidebar",
		use: ["menu"]
	},
	{
		name: "right-sidebar",
		use: ["menu"]
	},
	{
		name: "month-year",
		use: ["month-year", "shared"]
	},
	{
		name: "time-picker",
		use: ["menu", "shared"]
	},
	{
		name: "action-row",
		use: ["action"]
	},
	{
		name: "marker",
		use: ["calendar", "shared"]
	},
	{
		name: "quarter",
		use: ["shared"]
	},
	{
		name: "top-extra",
		use: ["shared", "month-year"]
	},
	{
		name: "tp-inline-arrow-up",
		use: ["shared", "time"]
	},
	{
		name: "tp-inline-arrow-down",
		use: ["shared", "time"]
	},
	{
		name: "menu-header",
		use: ["menu"]
	}
], Xm = [
	{ name: "trigger" },
	{ name: "input-icon" },
	{ name: "clear-icon" },
	{ name: "dp-input" }
], Zm = {
	all: () => Ym,
	monthYear: () => Ym.filter((e) => e.use.includes("month-year")),
	input: () => Xm,
	timePicker: () => Ym.filter((e) => e.use.includes("time")),
	action: () => Ym.filter((e) => e.use.includes("action")),
	calendar: () => Ym.filter((e) => e.use.includes("calendar")),
	menu: () => Ym.filter((e) => e.use.includes("menu")),
	shared: () => Ym.filter((e) => e.use.includes("shared")),
	yearMode: () => Ym.filter((e) => e.use.includes("year-mode"))
}, Qm = (e, n, r) => {
	let i = [];
	return Zm[n]().forEach((n) => {
		e[n.name] && i.push(n.name);
	}), r?.length && r.forEach((e) => {
		e.slot && i.push(e.slot);
	}), i;
}, $m = (e) => {
	let n = M(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), r = M(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
	return {
		transitionName: n,
		showTransition: !!e.value,
		menuTransition: r
	};
}, eh = (e, n, r) => {
	let { defaultedRange: i, defaultedTz: a } = wp(e), o = Q(gd(Q(), a.value.timezone)), s = W([{
		month: Fl(o),
		year: Ll(o)
	}]), c = (e) => {
		let n = {
			hours: Ml(o),
			minutes: Pl(o),
			seconds: 0
		};
		return i.value.enabled ? [n[e], n[e]] : n[e];
	}, l = ee({
		hours: c("hours"),
		minutes: c("minutes"),
		seconds: c("seconds")
	});
	v(i, (e, n) => {
		e.enabled !== n.enabled && (l.hours = c("hours"), l.minutes = c("minutes"), l.seconds = c("seconds"));
	}, { deep: !0 });
	let u = M({
		get: () => e.internalModelValue,
		set: (r) => {
			!e.readonly && !e.disabled && n("update:internal-model-value", r);
		}
	}), d = M(() => (e) => s.value[e] ? s.value[e].month : 0), f = M(() => (e) => s.value[e] ? s.value[e].year : 0);
	return v(u, (e, n) => {
		r && JSON.stringify(e ?? {}) !== JSON.stringify(n ?? {}) && r();
	}, { deep: !0 }), {
		calendars: s,
		time: l,
		modelValue: u,
		month: d,
		year: f,
		today: o
	};
}, th = (e, n) => {
	let { defaultedMultiCalendars: r, defaultedMultiDates: i, defaultedUI: a, defaultedHighlight: o, defaultedTz: s, propDates: c, defaultedRange: l } = wp(n), { isDisabled: u } = nh(n), d = W(null), f = W(gd(/* @__PURE__ */ new Date(), s.value.timezone)), p = (e) => {
		!e.current && n.hideOffsetDates || (d.value = e.value);
	}, m = () => {
		d.value = null;
	}, h = (n) => Array.isArray(e.value) && l.value.enabled && e.value[0] && d.value ? n ? mf(d.value, e.value[0]) : ff(d.value, e.value[0]) : !0, g = (n, r) => {
		let i = e.value && Array.isArray(e.value) && e.value ? r ? e.value[0] || null : e.value[1] : null;
		return pf(Q(n.value), i);
	}, _ = (n) => {
		let r = Array.isArray(e.value) ? e.value[0] : null;
		return !n || !ff(d.value ?? null, r);
	}, v = (r, i = !0) => (l.value.enabled || n.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? n.hideOffsetDates && !r.current ? !1 : pf(Q(r.value), e.value[+!i]) : l.value.enabled ? g(r, i) && _(i) || pf(r.value, Array.isArray(e.value) ? e.value[0] : null) && h(i) : !1, y = (n, r) => {
		if (Array.isArray(e.value) && e.value[0] && e.value.length === 1) {
			let i = pf(n.value, d.value);
			return r ? mf(e.value[0], n.value) && i : ff(e.value[0], n.value) && i;
		}
		return !1;
	}, b = (r) => !e.value || n.hideOffsetDates && !r.current ? !1 : l.value.enabled ? n.modelAuto && Array.isArray(e.value) ? pf(r.value, e.value[0] ? e.value[0] : f.value) : !1 : i.value.enabled && Array.isArray(e.value) ? e.value.some((e) => pf(e, r.value)) : pf(r.value, e.value ? e.value : f.value), x = (e) => {
		if (l.value.autoRange || n.weekPicker) {
			if (d.value) {
				if (n.hideOffsetDates && !e.current) return !1;
				let r = wc(d.value, +l.value.autoRange), i = wf(Q(d.value), n.weekStart);
				return n.weekPicker ? pf(i[1], Q(e.value)) : pf(r, Q(e.value));
			}
			return !1;
		}
		return !1;
	}, S = (e) => {
		if (l.value.autoRange || n.weekPicker) {
			if (d.value) {
				let r = wc(d.value, +l.value.autoRange);
				if (n.hideOffsetDates && !e.current) return !1;
				let i = wf(Q(d.value), n.weekStart);
				return n.weekPicker ? mf(e.value, i[0]) && ff(e.value, i[1]) : mf(e.value, d.value) && ff(e.value, r);
			}
			return !1;
		}
		return !1;
	}, C = (e) => {
		if (l.value.autoRange || n.weekPicker) {
			if (d.value) {
				if (n.hideOffsetDates && !e.current) return !1;
				let r = wf(Q(d.value), n.weekStart);
				return n.weekPicker ? pf(r[0], e.value) : pf(d.value, e.value);
			}
			return !1;
		}
		return !1;
	}, w = (n) => hf(e.value, d.value, n.value), T = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : !1, E = () => !n.modelAuto || Rd(n.internalModelValue), D = (e) => {
		if (n.weekPicker) return !1;
		let r = !l.value.enabled || !v(e) && !v(e, !1);
		return !u(e.value) && !b(e) && !(!e.current && n.hideOffsetDates) && r;
	}, O = (e) => l.value.enabled ? n.modelAuto ? T() && b(e) : !1 : b(e), k = (e) => o.value ? tf(e.value, c.value.highlight) : !1, ee = (e) => {
		let n = u(e.value);
		return n && (typeof o.value == "function" ? !o.value(e.value, n) : !o.value.options.highlightDisabled);
	}, te = (e) => typeof o.value == "function" ? o.value(e.value) : o.value.weekdays?.includes(e.value.getDay()), ne = (e) => (l.value.enabled || n.weekPicker) && (!(r.value.count > 0) || e.current) && E() && (e.current || !n.hideOffsetDates) && !b(e) ? w(e) : !1, re = (n) => {
		if (Array.isArray(e.value) && e.value.length === 1) {
			let { before: r, after: i } = Gf(+l.value.maxRange, e.value[0]);
			return zl(n.value, r) || Rl(n.value, i);
		}
		return !1;
	}, A = (n) => {
		if (Array.isArray(e.value) && e.value.length === 1) {
			let { before: r, after: i } = Gf(+l.value.minRange, e.value[0]);
			return hf([r, i], e.value[0], n.value);
		}
		return !1;
	}, ie = (e) => l.value.enabled && (l.value.maxRange || l.value.minRange) ? l.value.maxRange && l.value.minRange ? re(e) || A(e) : l.value.maxRange ? re(e) : A(e) : !1, ae = (e) => {
		let { isRangeStart: r, isRangeEnd: i } = le(e), a = l.value.enabled ? r || i : !1;
		return {
			dp__cell_offset: !e.current,
			dp__pointer: !n.disabled && !(!e.current && n.hideOffsetDates) && !u(e.value) && !ie(e),
			dp__cell_disabled: u(e.value) || ie(e),
			dp__cell_highlight: !ee(e) && (k(e) || te(e)) && !O(e) && !a && !C(e) && !(ne(e) && n.weekPicker) && !i,
			dp__cell_highlight_active: !ee(e) && (k(e) || te(e)) && O(e),
			dp__today: !n.noToday && pf(e.value, f.value) && e.current,
			"dp--past": ff(e.value, f.value),
			"dp--future": mf(e.value, f.value)
		};
	}, oe = (e) => ({
		dp__active_date: O(e),
		dp__date_hover: D(e)
	}), se = (r) => {
		if (e.value && !Array.isArray(e.value)) {
			let i = wf(e.value, n.weekStart);
			return {
				...ue(r),
				dp__range_start: pf(i[0], r.value),
				dp__range_end: pf(i[1], r.value),
				dp__range_between_week: mf(r.value, i[0]) && ff(r.value, i[1])
			};
		}
		return { ...ue(r) };
	}, ce = (r) => {
		if (e.value && Array.isArray(e.value)) {
			let i = wf(e.value[0], n.weekStart), a = e.value[1] ? wf(e.value[1], n.weekStart) : [];
			return {
				...ue(r),
				dp__range_start: pf(i[0], r.value) || pf(a[0], r.value),
				dp__range_end: pf(i[1], r.value) || pf(a[1], r.value),
				dp__range_between_week: mf(r.value, i[0]) && ff(r.value, i[1]) || mf(r.value, a[0]) && ff(r.value, a[1]),
				dp__range_between: mf(r.value, i[1]) && ff(r.value, a[0])
			};
		}
		return { ...ue(r) };
	}, le = (e) => ({
		isRangeStart: r.value.count > 0 ? e.current && v(e) && E() : v(e) && E(),
		isRangeEnd: r.value.count > 0 ? e.current && v(e, !1) && E() : v(e, !1) && E()
	}), j = (e) => {
		let { isRangeStart: r, isRangeEnd: i } = le(e);
		return {
			dp__range_start: r,
			dp__range_end: i,
			dp__range_between: ne(e),
			dp__date_hover: pf(e.value, d.value) && !r && !i && !n.weekPicker,
			dp__date_hover_start: y(e, !0),
			dp__date_hover_end: y(e, !1)
		};
	}, ue = (e) => ({
		...j(e),
		dp__cell_auto_range: S(e),
		dp__cell_auto_range_start: C(e),
		dp__cell_auto_range_end: x(e)
	}), de = (e) => l.value.enabled ? l.value.autoRange ? ue(e) : n.modelAuto ? {
		...oe(e),
		...j(e)
	} : n.weekPicker ? ce(e) : j(e) : n.weekPicker ? se(e) : oe(e);
	return {
		setHoverDate: p,
		clearHoverDate: m,
		getDayClassData: (e) => n.hideOffsetDates && !e.current ? {} : {
			...ae(e),
			...de(e),
			[n.dayClass ? n.dayClass(e.value, n.internalModelValue) : ""]: !0,
			...a.value.calendarCell ?? {}
		}
	};
}, nh = (e) => {
	let { defaultedFilters: n, defaultedRange: r, propDates: i, defaultedMultiDates: a } = wp(e), o = (e) => i.value.disabledDates ? typeof i.value.disabledDates == "function" ? i.value.disabledDates(Q(e)) : !!ef(e, i.value.disabledDates) : !1, s = (n) => i.value.maxDate ? e.yearPicker ? Ll(n) > Ll(i.value.maxDate) : mf(n, i.value.maxDate) : !1, c = (n) => i.value.minDate ? e.yearPicker ? Ll(n) < Ll(i.value.minDate) : ff(n, i.value.minDate) : !1, l = (r) => {
		let i = s(r), a = c(r), l = o(r), u = n.value.months.map((e) => +e).includes(Fl(r)), d = e.disabledWeekDays.length ? e.disabledWeekDays.some((e) => +e === kl(r)) : !1, f = m(r), p = Ll(r), h = Kf(e.yearRange, p);
		return !(i || a || l || u || h || d || f);
	}, u = (e, n) => ff(...Ef(i.value.minDate, e, n)) || pf(...Ef(i.value.minDate, e, n)), d = (e, n) => mf(...Ef(i.value.maxDate, e, n)) || pf(...Ef(i.value.maxDate, e, n)), f = (e, n, r) => {
		let a = !1;
		return i.value.maxDate && r && d(e, n) && (a = !0), i.value.minDate && !r && u(e, n) && (a = !0), a;
	}, p = (e, n, r, a) => {
		let o = !1;
		return a && (i.value.minDate || i.value.maxDate) ? i.value.minDate && i.value.maxDate ? o = f(e, n, r) : (i.value.minDate && u(e, n) || i.value.maxDate && d(e, n)) && (o = !0) : o = !0, o;
	}, m = (n) => Array.isArray(i.value.allowedDates) && !i.value.allowedDates.length ? !0 : i.value.allowedDates ? !ef(n, i.value.allowedDates, af(e.monthPicker, e.yearPicker)) : !1, h = (e) => !l(e), g = (e) => !r.value.noDisabledRange || !Wc({
		start: e[0],
		end: e[1]
	}).some((e) => h(e)), _ = (n) => {
		if (n) {
			let r = Ll(n);
			return r >= +e.yearRange[0] && r <= e.yearRange[1];
		}
		return !0;
	}, v = (e, n) => !!(Array.isArray(e) && e[n] && (r.value.maxRange || r.value.minRange) && _(e[n])), y = (e, n, i = 0) => {
		if (v(n, i) && _(e)) {
			let a = Nc(e, n[i]), o = Sf(n[i], e), s = o.length === 1 ? 0 : o.filter((e) => h(e)).length, c = Math.abs(a) - (r.value.minMaxRawRange ? 0 : s);
			if (r.value.minRange && r.value.maxRange) return c >= +r.value.minRange && c <= +r.value.maxRange;
			if (r.value.minRange) return c >= +r.value.minRange;
			if (r.value.maxRange) return c <= +r.value.maxRange;
		}
		return !0;
	}, b = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, x = (e) => Array.isArray(e) ? [e[0] ? zf(e[0]) : null, e[1] ? zf(e[1]) : null] : zf(e), S = (e, n, r) => e.find((e) => +e.hours === Ml(n) && e.minutes === "*" || +e.minutes === Pl(n) && +e.hours === Ml(n)) && r, C = (e, n, r) => {
		let [i, a] = e, [o, s] = n;
		return !S(i, o, r) && !S(a, s, r) && r;
	}, w = (n, r) => {
		let i = Array.isArray(r) ? r : [r];
		return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? C(e.disabledTimes, i, n) : !i.some((r) => S(e.disabledTimes, r, n)) : n;
	}, T = (n, r) => {
		let i = Array.isArray(r) ? [vf(r[0]), r[1] ? vf(r[1]) : void 0] : vf(r), a = !e.disabledTimes(i);
		return n && a;
	}, E = (n, r) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? w(r, n) : T(r, n) : r, D = (n) => {
		let r = !0;
		if (!n || b()) return !0;
		let a = !i.value.minDate && !i.value.maxDate ? x(n) : n;
		return (e.maxTime || i.value.maxDate) && (r = Rf(e.maxTime, i.value.maxDate, "max", Bd(a), r)), (e.minTime || i.value.minDate) && (r = Rf(e.minTime, i.value.minDate, "min", Bd(a), r)), E(n, r);
	}, O = (n) => {
		if (!e.monthPicker) return !0;
		let r = !0, a = Q(gf(n));
		if (i.value.minDate && i.value.maxDate) {
			let e = Q(gf(i.value.minDate)), n = Q(gf(i.value.maxDate));
			return mf(a, e) && ff(a, n) || pf(a, e) || pf(a, n);
		}
		if (i.value.minDate) {
			let e = Q(gf(i.value.minDate));
			r = mf(a, e) || pf(a, e);
		}
		if (i.value.maxDate) {
			let e = Q(gf(i.value.maxDate));
			r = ff(a, e) || pf(a, e);
		}
		return r;
	};
	return {
		isDisabled: h,
		validateDate: l,
		validateMonthYearInRange: p,
		isDateRangeAllowed: g,
		checkMinMaxRange: y,
		isValidTime: D,
		isTimeValid: M(() => (n) => !e.enableTimePicker || e.ignoreTimeValidation ? !0 : D(n)),
		isMonthValid: M(() => (n) => e.monthPicker ? Array.isArray(n) && (r.value.enabled || a.value.enabled) ? !n.filter((e) => !O(e)).length : O(n) : !0)
	};
}, rh = () => ({
	hideNavigationButtons: M(() => (e, n) => e?.includes(n)),
	showLeftIcon: M(() => (e, n) => e.count ? e.solo ? !0 : n === 0 : !0),
	showRightIcon: M(() => (e, n) => e.count ? e.solo ? !0 : n === e.count - 1 : !0)
}), ih = (e, n, r) => {
	let i = W(0), a = ee({
		[wd.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
		[wd.calendar]: !1,
		[wd.header]: !1
	}), o = M(() => e.monthPicker || e.timePicker), s = (n) => {
		if (e.flow?.length) {
			if (!n && o.value) return d();
			a[n] = !0, Object.keys(a).filter((e) => !a[e]).length || d();
		}
	}, c = () => {
		e.flow?.length && i.value !== -1 && (i.value += 1, n("flow-step", i.value), d()), e.flow?.length === i.value && $e().then(() => l());
	}, l = () => {
		i.value = -1;
	}, u = (n, a, ...o) => {
		e.flow[i.value] === n && r.value && r.value[a]?.(...o);
	}, d = (n = 0) => {
		n && (i.value += n), u(Td.month, "toggleMonthPicker", !0), u(Td.year, "toggleYearPicker", !0), u(Td.calendar, "toggleTimePicker", !1, !0), u(Td.time, "toggleTimePicker", !0, !0);
		let r = e.flow[i.value];
		(r === Td.hours || r === Td.minutes || r === Td.seconds) && u(r, "toggleTimePicker", !0, !0, r);
	};
	return {
		childMount: s,
		updateFlowStep: c,
		resetFlow: l,
		handleFlow: d,
		flowStep: i
	};
}, ah = {
	key: 1,
	class: "dp__input_wrap"
}, oh = [
	"id",
	"name",
	"inputmode",
	"placeholder",
	"disabled",
	"readonly",
	"required",
	"value",
	"autocomplete",
	"aria-label",
	"aria-disabled",
	"aria-invalid"
], sh = {
	key: 2,
	class: "dp--clear-btn"
}, ch = ["aria-label"], lh = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "DatepickerInput",
	props: {
		isMenuOpen: {
			type: Boolean,
			default: !1
		},
		inputValue: {
			type: String,
			default: ""
		},
		...Dp
	},
	emits: [
		"clear",
		"open",
		"update:input-value",
		"set-input-date",
		"close",
		"select-date",
		"set-empty-date",
		"toggle",
		"focus-prev",
		"focus",
		"blur",
		"real-blur",
		"text-input"
	],
	setup(e, { expose: r, emit: i }) {
		let a = i, o = e, { defaultedTextInput: s, defaultedAriaLabels: c, defaultedInline: l, defaultedConfig: u, defaultedRange: d, defaultedMultiDates: f, defaultedUI: p, getDefaultPattern: m, getDefaultStartTime: h } = wp(o), { checkMinMaxRange: g } = nh(o), _ = W(), v = W(null), y = W(!1), b = W(!1), x = M(() => ({
			dp__pointer: !o.disabled && !o.readonly && !s.value.enabled,
			dp__disabled: o.disabled,
			dp__input_readonly: !s.value.enabled,
			dp__input: !0,
			dp__input_not_clearable: !o.clearable,
			dp__input_icon_pad: !o.hideInputIcon,
			dp__input_valid: typeof o.state == "boolean" && o.state,
			dp__input_invalid: typeof o.state == "boolean" && !o.state,
			dp__input_focus: y.value || o.isMenuOpen,
			dp__input_reg: !s.value.enabled,
			...p.value.input ?? {}
		})), S = () => {
			a("set-input-date", null), o.clearable && o.autoApply && (a("set-empty-date"), _.value = null);
		}, C = (e) => {
			let n = h();
			return cf(e, s.value.format ?? m(), n ?? Tf({}, o.enableSeconds), o.inputValue, b.value, o.formatLocale);
		}, w = (e) => {
			let { rangeSeparator: n } = s.value, [r, i] = e.split(`${n}`);
			if (r) {
				let e = C(r.trim()), n = i ? C(i.trim()) : void 0;
				if (Rl(e, n)) return;
				let a = e && n ? [e, n] : [e];
				g(n, a, 0) && (_.value = e ? a : null);
			}
		}, T = () => {
			b.value = !0;
		}, E = (e) => {
			if (d.value.enabled) w(e);
			else if (f.value.enabled) {
				let n = e.split(";");
				_.value = n.map((e) => C(e.trim())).filter((e) => e);
			} else _.value = C(e);
		}, O = (e) => {
			let n = typeof e == "string" ? e : e.target?.value;
			n === "" ? S() : (s.value.openMenu && !o.isMenuOpen && a("open"), E(n), a("set-input-date", _.value)), b.value = !1, a("update:input-value", n), a("text-input", e, _.value);
		}, k = (e) => {
			s.value.enabled ? (E(e.target.value), s.value.enterSubmit && Pf(_.value) && o.inputValue !== "" ? (a("set-input-date", _.value, !0), _.value = null) : s.value.enterSubmit && o.inputValue === "" && (_.value = null, a("clear"))) : ne(e);
		}, ee = (e, n) => {
			s.value.enabled && s.value.tabSubmit && !n && E(e.target.value), s.value.tabSubmit && Pf(_.value) && o.inputValue !== "" ? (a("set-input-date", _.value, !0, !0), _.value = null) : s.value.tabSubmit && o.inputValue === "" && (_.value = null, a("clear", !0));
		}, te = () => {
			y.value = !0, a("focus"), $e().then(() => {
				s.value.enabled && s.value.selectOnFocus && v.value?.select();
			});
		}, ne = (e) => {
			if (qd(e, u.value, !0), s.value.enabled && s.value.openMenu && !l.value.input) {
				if (s.value.openMenu === "open" && !o.isMenuOpen) return a("open");
				if (s.value.openMenu === "toggle") return a("toggle");
			} else s.value.enabled || a("toggle");
		}, re = () => {
			a("real-blur"), y.value = !1, (!o.isMenuOpen || l.value.enabled && l.value.input) && a("blur"), o.autoApply && s.value.enabled && _.value && !o.isMenuOpen && (a("set-input-date", _.value), a("select-date"), _.value = null);
		}, A = (e) => {
			qd(e, u.value, !0), a("clear");
		}, ie = () => {
			a("close");
		}, ae = (e) => {
			if (e.key === "Tab" && ee(e), e.key === "Enter" && k(e), e.key === "Escape" && s.value.escClose && ie(), !s.value.enabled) {
				if (e.code === "Tab") return;
				e.preventDefault();
			}
		}, oe = () => {
			v.value?.focus({ preventScroll: !0 });
		}, se = (e) => {
			_.value = e;
		}, ce = (e) => {
			e.key === Od.tab && ee(e, !0);
		};
		return r({
			focusInput: oe,
			setParsedDate: se
		}), (r, i) => (J(), H("div", { onClick: ne }, [r.$slots.trigger && !r.$slots["dp-input"] && !V(l).enabled ? q(r.$slots, "trigger", { key: 0 }) : K("", !0), !r.$slots.trigger && (!V(l).enabled || V(l).input) ? (J(), H("div", ah, [
			r.$slots["dp-input"] && !r.$slots.trigger && (!V(l).enabled || V(l).enabled && V(l).input) ? q(r.$slots, "dp-input", {
				key: 0,
				value: e.inputValue,
				isMenuOpen: e.isMenuOpen,
				onInput: O,
				onEnter: k,
				onTab: ee,
				onClear: A,
				onBlur: re,
				onKeypress: ae,
				onPaste: T,
				onFocus: te,
				openMenu: () => r.$emit("open"),
				closeMenu: () => r.$emit("close"),
				toggleMenu: () => r.$emit("toggle")
			}) : K("", !0),
			r.$slots["dp-input"] ? K("", !0) : (J(), H("input", {
				key: 1,
				id: r.uid ? `dp-input-${r.uid}` : void 0,
				ref_key: "inputRef",
				ref: v,
				"data-test-id": "dp-input",
				name: r.name,
				class: G(x.value),
				inputmode: V(s).enabled ? "text" : "none",
				placeholder: r.placeholder,
				disabled: r.disabled,
				readonly: r.readonly,
				required: r.required,
				value: e.inputValue,
				autocomplete: r.autocomplete,
				"aria-label": V(c)?.input,
				"aria-disabled": r.disabled || void 0,
				"aria-invalid": r.state === !1 || void 0,
				onInput: O,
				onBlur: re,
				onFocus: te,
				onKeypress: ae,
				onKeydown: i[0] ||= (e) => ae(e),
				onPaste: T
			}, null, 42, oh)),
			n("div", { onClick: i[3] ||= (e) => a("toggle") }, [r.$slots["input-icon"] && !r.hideInputIcon ? (J(), H("span", {
				key: 0,
				class: "dp__input_icon",
				onClick: i[1] ||= (e) => a("toggle")
			}, [q(r.$slots, "input-icon")])) : K("", !0), !r.$slots["input-icon"] && !r.hideInputIcon && !r.$slots["dp-input"] ? (J(), L(V(ld), {
				key: 1,
				"aria-label": V(c)?.calendarIcon,
				class: "dp__input_icon dp__input_icons",
				onClick: i[2] ||= (e) => a("toggle")
			}, null, 8, ["aria-label"])) : K("", !0)]),
			r.$slots["clear-icon"] && (r.alwaysClearable || e.inputValue && r.clearable && !r.disabled && !r.readonly) ? (J(), H("span", sh, [q(r.$slots, "clear-icon", { clear: A })])) : K("", !0),
			!r.$slots["clear-icon"] && (r.alwaysClearable || r.clearable && e.inputValue && !r.disabled && !r.readonly) ? (J(), H("button", {
				key: 3,
				"aria-label": V(c)?.clearInput,
				class: "dp--clear-btn",
				type: "button",
				onKeydown: i[4] ||= (e) => V(nf)(e, () => A(e), !0, ce),
				onClick: i[5] ||= D((e) => A(e), ["prevent"])
			}, [I(V(ud), {
				class: "dp__input_icons",
				"data-test-id": "clear-icon"
			})], 40, ch)) : K("", !0)
		])) : K("", !0)]));
	}
}), uh = typeof window < "u" ? window : void 0, dh = () => {}, fh = (e) => c() ? (b(e), !0) : !1, ph = (e, n, r, i) => {
	if (!e) return dh;
	let a = dh, o = v(() => V(e), (e) => {
		a(), e && (e.removeEventListener(n, r), e.addEventListener(n, r, i), a = () => {
			e.removeEventListener(n, r, i), a = dh;
		});
	}, {
		immediate: !0,
		flush: "post"
	}), s = () => {
		o(), a();
	};
	return fh(s), s;
}, mh = (e, n, r, i = {}) => {
	let { window: a = uh, event: o = "pointerdown" } = i;
	return a ? ph(a, o, (i) => {
		let a = Id(e), o = Id(n);
		!a || !o || a === i.target || i.composedPath().includes(a) || i.composedPath().includes(o) || r(i);
	}, { passive: !0 }) : void 0;
}, hh = ["data-dp-mobile"], gh = /* @__PURE__ */ xt({
	compatConfig: { MODE: 3 },
	__name: "VueDatePicker",
	props: { ...Dp },
	emits: [
		"update:model-value",
		"update:model-timezone-value",
		"text-submit",
		"closed",
		"cleared",
		"open",
		"focus",
		"blur",
		"internal-model-change",
		"recalculate-position",
		"flow-step",
		"update-month-year",
		"invalid-select",
		"invalid-fixed-range",
		"tooltip-open",
		"tooltip-close",
		"time-picker-open",
		"time-picker-close",
		"am-pm-change",
		"range-start",
		"range-end",
		"date-update",
		"invalid-date",
		"overlay-toggle",
		"text-input"
	],
	setup(e, { expose: n, emit: r }) {
		let i = r, a = e, o = ae(), c = W(!1), l = fe(a, "modelValue"), d = fe(a, "timezone"), f = W(null), m = W(null), h = W(null), g = W(!1), _ = W(null), y = W(!1), b = W(!1), x = W(!1), S = W(!1), { setMenuFocused: w, setShiftKey: T } = Jf(), { clearArrowNav: E } = rp(), { validateDate: D, isValidTime: O } = nh(a), { defaultedTransitions: k, defaultedTextInput: ee, defaultedInline: te, defaultedConfig: ne, defaultedRange: re, defaultedMultiDates: ie } = wp(a), { menuTransition: oe, showTransition: se } = $m(k), { isMobile: ce } = Im(ne), le = Re();
		It(() => {
			P(a.modelValue), $e().then(() => {
				te.value.enabled || (he(_.value)?.addEventListener("scroll", F), window?.addEventListener("resize", ke));
			}), te.value.enabled && (c.value = !0), window?.addEventListener("keyup", Ae), window?.addEventListener("keydown", je);
		}), Ie(() => {
			te.value.enabled || (he(_.value)?.removeEventListener("scroll", F), window?.removeEventListener("resize", ke)), window?.removeEventListener("keyup", Ae), window?.removeEventListener("keydown", je);
		});
		let j = Qm(o, "all", a.presetDates), ue = Qm(o, "input");
		v([l, d], () => {
			P(l.value);
		}, { deep: !0 });
		let { openOnTop: de, menuStyle: pe, xCorrect: N, setMenuPosition: me, getScrollableParent: he, shadowRender: ge } = Jm({
			menuRef: f,
			menuRefInner: m,
			inputRef: h,
			pickerWrapperRef: _,
			inline: te,
			emit: i,
			props: a,
			slots: o
		}), { inputValue: _e, internalModelValue: ve, parseExternalModelValue: P, emitModelValue: ye, formatInputValue: be, checkBeforeEmit: xe } = Tp(i, a, {
			isInputFocused: g,
			isTextInputDate: S
		}), Se = M(() => ({
			dp__main: !0,
			dp__theme_dark: a.dark,
			dp__theme_light: !a.dark,
			dp__flex_display: te.value.enabled,
			"dp--flex-display-collapsed": x.value,
			dp__flex_display_with_input: te.value.input
		})), Ce = M(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), we = M(() => a.teleport ? {
			to: typeof a.teleport == "boolean" ? "body" : a.teleport,
			disabled: !a.teleport || te.value.enabled
		} : {}), Te = M(() => ({ class: "dp__outer_menu_wrap" })), De = M(() => te.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), Oe = () => h.value?.$el?.getBoundingClientRect() ?? {
			width: 0,
			left: 0,
			right: 0
		}, F = () => {
			c.value && (ne.value.closeOnScroll ? He() : me());
		}, ke = () => {
			c.value && me();
			let e = m.value?.$el.getBoundingClientRect().width ?? 0;
			x.value = document.body.offsetWidth <= e;
		}, Ae = (e) => {
			e.key !== "Tab" || te.value.enabled || a.teleport || !ne.value.tabOutClosesMenu || _.value.contains(document.activeElement) || He(), b.value = e.shiftKey;
		}, je = (e) => {
			b.value = e.shiftKey;
		}, Me = () => {
			!a.disabled && !a.readonly && (ge(le, Km, a), me(!1), c.value = !0, c.value && i("open"), c.value || Ve(), P(a.modelValue));
		}, Ne = () => {
			_e.value = "", Ve(), m.value?.onValueCleared(), h.value?.setParsedDate(null), i("update:model-value", null), i("update:model-timezone-value", null), i("cleared"), ne.value.closeOnClearValue && He();
		}, Pe = () => {
			let e = ve.value;
			return !e || !Array.isArray(e) && D(e) ? !0 : Array.isArray(e) ? ie.value.enabled || e.length === 2 && D(e[0]) && D(e[1]) ? !0 : re.value.partialRange && !a.timePicker ? D(e[0]) : !1 : !1;
		}, Fe = () => {
			xe() && Pe() ? (ye(), He()) : i("invalid-select", ve.value);
		}, Le = (e) => {
			ze(), ye(), ne.value.closeOnAutoApply && !e && He();
		}, ze = () => {
			h.value && ee.value.enabled && h.value.setParsedDate(ve.value);
		}, Be = (e = !1) => {
			a.autoApply && O(ve.value) && Pe() && (re.value.enabled && Array.isArray(ve.value) ? (re.value.partialRange || ve.value.length === 2) && Le(e) : Le(e));
		}, Ve = () => {
			ee.value.enabled || (ve.value = null);
		}, He = (e = !1) => {
			e && ve.value && ne.value.setDateOnMenuClose && Fe(), te.value.enabled || (c.value && (c.value = !1, N.value = !1, w(!1), T(!1), E(), i("closed"), _e.value && P(l.value)), Ve(), i("blur"), m.value?.$el?.remove());
		}, Ue = (e, n, r = !1) => {
			if (!e) {
				ve.value = null;
				return;
			}
			let o = Array.isArray(e) ? !e.some((e) => !D(e)) : D(e), s = O(e);
			o && s ? (S.value = !0, ve.value = e, n ? (y.value = r, Fe(), i("text-submit")) : a.autoApply && Be(!0), $e().then(() => {
				S.value = !1;
			})) : i("invalid-date", e);
		}, We = () => {
			a.autoApply && O(ve.value) && ye(), ze();
		}, Ge = () => c.value ? He() : Me(), Ke = (e) => {
			ve.value = e;
		}, qe = () => {
			ee.value.enabled && (g.value = !0, be()), i("focus");
		}, Je = () => {
			ee.value.enabled && (g.value = !1, P(a.modelValue), y.value && Yd(_.value, b.value)?.focus()), i("blur");
		}, Ye = (e) => {
			m.value && m.value.updateMonthYear(0, {
				month: Vd(e.month),
				year: Vd(e.year)
			});
		}, Xe = (e) => {
			P(e ?? a.modelValue);
		}, Ze = (e, n) => {
			m.value?.switchView(e, n);
		}, Qe = (e, n) => ne.value.onClickOutside ? ne.value.onClickOutside(e, n) : He(!0);
		return mh(f, h, (e) => Qe(Pe, e)), n({
			closeMenu: He,
			selectDate: Fe,
			clearValue: Ne,
			openMenu: Me,
			onScroll: F,
			formatInputValue: be,
			updateInternalModelValue: Ke,
			setMonthYear: Ye,
			parseModel: Xe,
			switchView: Ze,
			toggleMenu: Ge,
			handleFlow: (e = 0) => {
				m.value?.handleFlow(e);
			},
			getDpWrapMenuRef: () => f
		}), (e, n) => (J(), H("div", {
			ref_key: "pickerWrapperRef",
			ref: _,
			class: G(Se.value),
			"data-datepicker-instance": "",
			"data-dp-mobile": V(ce)
		}, [I(lh, B({
			ref_key: "inputRef",
			ref: h,
			"input-value": V(_e),
			"onUpdate:inputValue": n[0] ||= (e) => C(_e) ? _e.value = e : null,
			"is-menu-open": c.value
		}, e.$props, {
			onClear: Ne,
			onOpen: Me,
			onSetInputDate: Ue,
			onSetEmptyDate: V(ye),
			onSelectDate: Fe,
			onToggle: Ge,
			onClose: He,
			onFocus: qe,
			onBlur: Je,
			onRealBlur: n[1] ||= (e) => g.value = !1,
			onTextInput: n[2] ||= (n) => e.$emit("text-input", n)
		}), yt({ _: 2 }, [u(V(ue), (n, r) => ({
			name: n,
			fn: A((r) => [q(e.$slots, n, nt(lt(r)))])
		}))]), 1040, [
			"input-value",
			"is-menu-open",
			"onSetEmptyDate"
		]), (J(), L(p(e.teleport ? Ee : "div"), nt(lt(we.value)), {
			default: A(() => [I(s, {
				name: V(oe)(V(de)),
				css: V(se) && !V(te).enabled
			}, {
				default: A(() => [c.value ? (J(), H("div", B({
					key: 0,
					ref_key: "dpWrapMenuRef",
					ref: f
				}, Te.value, {
					class: { "dp--menu-wrapper": !V(te).enabled },
					style: V(te).enabled ? void 0 : V(pe)
				}), [I(Km, B({
					ref_key: "dpMenuRef",
					ref: m
				}, e.$props, {
					"internal-model-value": V(ve),
					"onUpdate:internalModelValue": n[3] ||= (e) => C(ve) ? ve.value = e : null,
					class: {
						[Ce.value]: !0,
						"dp--menu-wrapper": e.teleport
					},
					"open-on-top": V(de),
					"no-overlay-focus": De.value,
					collapse: x.value,
					"get-input-rect": Oe,
					"is-text-input-date": S.value,
					onClosePicker: He,
					onSelectDate: Fe,
					onAutoApply: Be,
					onTimeUpdate: We,
					onFlowStep: n[4] ||= (n) => e.$emit("flow-step", n),
					onUpdateMonthYear: n[5] ||= (n) => e.$emit("update-month-year", n),
					onInvalidSelect: n[6] ||= (n) => e.$emit("invalid-select", V(ve)),
					onAutoApplyInvalid: n[7] ||= (n) => e.$emit("invalid-select", n),
					onInvalidFixedRange: n[8] ||= (n) => e.$emit("invalid-fixed-range", n),
					onRecalculatePosition: V(me),
					onTooltipOpen: n[9] ||= (n) => e.$emit("tooltip-open", n),
					onTooltipClose: n[10] ||= (n) => e.$emit("tooltip-close", n),
					onTimePickerOpen: n[11] ||= (n) => e.$emit("time-picker-open", n),
					onTimePickerClose: n[12] ||= (n) => e.$emit("time-picker-close", n),
					onAmPmChange: n[13] ||= (n) => e.$emit("am-pm-change", n),
					onRangeStart: n[14] ||= (n) => e.$emit("range-start", n),
					onRangeEnd: n[15] ||= (n) => e.$emit("range-end", n),
					onDateUpdate: n[16] ||= (n) => e.$emit("date-update", n),
					onInvalidDate: n[17] ||= (n) => e.$emit("invalid-date", n),
					onOverlayToggle: n[18] ||= (n) => e.$emit("overlay-toggle", n),
					onMenuBlur: n[19] ||= (n) => e.$emit("blur")
				}), yt({ _: 2 }, [u(V(j), (n, r) => ({
					name: n,
					fn: A((r) => [q(e.$slots, n, nt(lt({ ...r })))])
				}))]), 1040, [
					"internal-model-value",
					"class",
					"open-on-top",
					"no-overlay-focus",
					"collapse",
					"is-text-input-date",
					"onRecalculatePosition"
				])], 16)) : K("", !0)]),
				_: 3
			}, 8, ["name", "css"])]),
			_: 3
		}, 16))], 10, hh));
	}
}), _h = /* @__PURE__ */ (() => {
	let e = gh;
	return e.install = (n) => {
		n.component("Vue3DatePicker", e);
	}, e;
})();
// node_modules/@nextcloud/vue/dist/chunks/NcTimezonePicker.vue_vue_type_script_setup_true_lang.mjs
Object.entries(/* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
	__proto__: null,
	default: _h
}, Symbol.toStringTag, { value: "Module" }))).forEach(([e, n]) => {
	e !== "default" && (_h[e] = n);
}), m(ke);
function vh(e) {
	return e.slice(e.indexOf("/") + 1).replaceAll("/", " - ").replaceAll("_", " ");
}
function yh() {
	return Intl.supportedValuesOf("timeZone").filter((e) => !e.startsWith("Etc/")).map((e) => ({
		timezoneId: e,
		label: vh(e)
	})).sort((e, n) => e.timezoneId.localeCompare(n.timezoneId));
}
var bh = /* @__PURE__ */ xt({
	__name: "NcTimezonePicker",
	props: /* @__PURE__ */ gt({
		additionalTimezones: { default: () => [] },
		uid: { default: pt() }
	}, {
		modelValue: { default: "floating" },
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(e) {
		let n = at(e, "modelValue"), r = e, i = M(() => r.additionalTimezones.map(({ timezoneId: e, label: n }) => ({
			timezoneId: e,
			label: n
		}))), a = M(() => {
			let e = yh();
			return e.unshift(...i.value), e;
		});
		function o(e, n, r) {
			let i = r.trim().split(/\s+/), a = Object.values(e);
			return i.every((e) => a.some((n) => n.toLowerCase().includes(e.toLowerCase())));
		}
		return (r, i) => (J(), L(Xt, {
			modelValue: n.value,
			"onUpdate:modelValue": i[0] ||= (e) => n.value = e,
			"aria-label-combobox": V(j)("Search for time zone"),
			clearable: !1,
			filterBy: o,
			multiple: !1,
			options: a.value,
			placeholder: V(j)("Type to search time zone"),
			uid: e.uid,
			reduce: (e) => e.timezoneId,
			label: "label"
		}, null, 8, [
			"modelValue",
			"aria-label-combobox",
			"options",
			"placeholder",
			"uid",
			"reduce"
		]));
	}
}), xh = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, Sh = (e, n, r) => {
	let i, a = xh[e];
	return i = typeof a == "string" ? a : n === 1 ? a.one : a.other.replace("{{count}}", n.toString()), r?.addSuffix ? r.comparison && r.comparison > 0 ? "in " + i : i + " ago" : i;
};
function Ch(e) {
	return (n = {}) => {
		let r = n.width ? String(n.width) : e.defaultWidth;
		return e.formats[r] || e.formats[e.defaultWidth];
	};
}
var wh = {
	date: Ch({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Ch({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Ch({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, Th = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, Eh = (e, n, r, i) => Th[e];
function Dh(e) {
	return (n, r) => {
		let i = r?.context ? String(r.context) : "standalone", a;
		if (i === "formatting" && e.formattingValues) {
			let n = e.defaultFormattingWidth || e.defaultWidth, i = r?.width ? String(r.width) : n;
			a = e.formattingValues[i] || e.formattingValues[n];
		} else {
			let n = e.defaultWidth, i = r?.width ? String(r.width) : e.defaultWidth;
			a = e.values[i] || e.values[n];
		}
		let o = e.argumentCallback ? e.argumentCallback(n) : n;
		return a[o];
	};
}
var Oh = {
	ordinalNumber: (e, n) => {
		let r = Number(e), i = r % 100;
		if (i > 20 || i < 10) switch (i % 10) {
			case 1: return r + "st";
			case 2: return r + "nd";
			case 3: return r + "rd";
		}
		return r + "th";
	},
	era: Dh({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: Dh({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: Dh({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: Dh({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: Dh({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
function kh(e) {
	return (n, r = {}) => {
		let i = r.width, a = i && e.matchPatterns[i] || e.matchPatterns[e.defaultMatchWidth], o = n.match(a);
		if (!o) return null;
		let s = o[0], c = i && e.parsePatterns[i] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(c) ? jh(c, (e) => e.test(s)) : Ah(c, (e) => e.test(s)), u;
		u = e.valueCallback ? e.valueCallback(l) : l, u = r.valueCallback ? r.valueCallback(u) : u;
		let d = n.slice(s.length);
		return {
			value: u,
			rest: d
		};
	};
}
function Ah(e, n) {
	for (let r in e) if (Object.prototype.hasOwnProperty.call(e, r) && n(e[r])) return r;
}
function jh(e, n) {
	for (let r = 0; r < e.length; r++) if (n(e[r])) return r;
}
function Mh(e) {
	return (n, r = {}) => {
		let i = n.match(e.matchPattern);
		if (!i) return null;
		let a = i[0], o = n.match(e.parsePattern);
		if (!o) return null;
		let s = e.valueCallback ? e.valueCallback(o[0]) : o[0];
		s = r.valueCallback ? r.valueCallback(s) : s;
		let c = n.slice(a.length);
		return {
			value: s,
			rest: c
		};
	};
}
var Nh = {
	code: "en-US",
	formatDistance: Sh,
	formatLong: wh,
	formatRelative: Eh,
	localize: Oh,
	match: {
		ordinalNumber: Mh({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: kh({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: kh({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: kh({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: kh({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: kh({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
}, Ph = (e, n) => {
	switch (e) {
		case "P": return n.date({ width: "short" });
		case "PP": return n.date({ width: "medium" });
		case "PPP": return n.date({ width: "long" });
		default: return n.date({ width: "full" });
	}
}, Fh = (e, n) => {
	switch (e) {
		case "p": return n.time({ width: "short" });
		case "pp": return n.time({ width: "medium" });
		case "ppp": return n.time({ width: "long" });
		default: return n.time({ width: "full" });
	}
}, Ih = {
	p: Fh,
	P: (e, n) => {
		let r = e.match(/(P+)(p+)?/) || [], i = r[1], a = r[2];
		if (!a) return Ph(e, n);
		let o;
		switch (i) {
			case "P":
				o = n.dateTime({ width: "short" });
				break;
			case "PP":
				o = n.dateTime({ width: "medium" });
				break;
			case "PPP":
				o = n.dateTime({ width: "long" });
				break;
			default: o = n.dateTime({ width: "full" });
		}
		return o.replace("{{date}}", Ph(i, n)).replace("{{time}}", Fh(a, n));
	}
}, Lh = /^D+$/, Rh = /^Y+$/, zh = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function Bh(e) {
	return Lh.test(e);
}
function Vh(e) {
	return Rh.test(e);
}
function Hh(e, n, r) {
	let i = Uh(e, n, r);
	if (console.warn(i), zh.includes(e)) throw RangeError(i);
}
function Uh(e, n, r) {
	let i = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${n}\`) for formatting ${i} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var Wh = 6048e5, Gh = 6e4, Kh = 36e5, qh = 1e3, Jh = /* @__PURE__ */ Symbol.for("constructDateFrom");
function Yh(e, n) {
	return typeof e == "function" ? e(n) : e && typeof e == "object" && Jh in e ? e[Jh](n) : e instanceof Date ? new e.constructor(n) : new Date(n);
}
var Xh = {};
function Zh() {
	return Xh;
}
function Qh() {
	return Object.assign({}, Zh());
}
function $h(e, n) {
	return Yh(n || e, e);
}
function eg(e, n) {
	let r = tg(n) ? new n(0) : Yh(n, 0);
	return r.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()), r.setHours(e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()), r;
}
function tg(e) {
	return typeof e == "function" && e.prototype?.constructor === e;
}
var ng = 10, rg = class {
	subPriority = 0;
	validate(e, n) {
		return !0;
	}
}, ig = class extends rg {
	constructor(e, n, r, i, a) {
		super(), this.value = e, this.validateValue = n, this.setValue = r, this.priority = i, a && (this.subPriority = a);
	}
	validate(e, n) {
		return this.validateValue(e, this.value, n);
	}
	set(e, n, r) {
		return this.setValue(e, n, this.value, r);
	}
}, ag = class extends rg {
	priority = ng;
	subPriority = -1;
	constructor(e, n) {
		super(), this.context = e || ((e) => Yh(n, e));
	}
	set(e, n) {
		return n.timestampIsSet ? e : Yh(e, eg(e, this.context));
	}
}, og = class {
	run(e, n, r, i) {
		let a = this.parse(e, n, r, i);
		return a ? {
			setter: new ig(a.value, this.validate, this.set, this.priority, this.subPriority),
			rest: a.rest
		} : null;
	}
	validate(e, n, r) {
		return !0;
	}
}, sg = class extends og {
	priority = 140;
	parse(e, n, r) {
		switch (n) {
			case "G":
			case "GG":
			case "GGG": return r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
			case "GGGGG": return r.era(e, { width: "narrow" });
			default: return r.era(e, { width: "wide" }) || r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
		}
	}
	set(e, n, r) {
		return n.era = r, e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"R",
		"u",
		"t",
		"T"
	];
}, cg = {
	month: /^(1[0-2]|0?\d)/,
	date: /^(3[0-1]|[0-2]?\d)/,
	dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
	week: /^(5[0-3]|[0-4]?\d)/,
	hour23h: /^(2[0-3]|[0-1]?\d)/,
	hour24h: /^(2[0-4]|[0-1]?\d)/,
	hour11h: /^(1[0-1]|0?\d)/,
	hour12h: /^(1[0-2]|0?\d)/,
	minute: /^[0-5]?\d/,
	second: /^[0-5]?\d/,
	singleDigit: /^\d/,
	twoDigits: /^\d{1,2}/,
	threeDigits: /^\d{1,3}/,
	fourDigits: /^\d{1,4}/,
	anyDigitsSigned: /^-?\d+/,
	singleDigitSigned: /^-?\d/,
	twoDigitsSigned: /^-?\d{1,2}/,
	threeDigitsSigned: /^-?\d{1,3}/,
	fourDigitsSigned: /^-?\d{1,4}/
}, lg = {
	basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
	basic: /^([+-])(\d{2})(\d{2})|Z/,
	basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
	extended: /^([+-])(\d{2}):(\d{2})|Z/,
	extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function ug(e, n) {
	return e && {
		value: n(e.value),
		rest: e.rest
	};
}
function dg(e, n) {
	let r = n.match(e);
	return r ? {
		value: parseInt(r[0], 10),
		rest: n.slice(r[0].length)
	} : null;
}
function fg(e, n) {
	let r = n.match(e);
	if (!r) return null;
	if (r[0] === "Z") return {
		value: 0,
		rest: n.slice(1)
	};
	let i = r[1] === "+" ? 1 : -1, a = r[2] ? parseInt(r[2], 10) : 0, o = r[3] ? parseInt(r[3], 10) : 0, s = r[5] ? parseInt(r[5], 10) : 0;
	return {
		value: i * (a * Kh + o * Gh + s * qh),
		rest: n.slice(r[0].length)
	};
}
function pg(e) {
	return dg(cg.anyDigitsSigned, e);
}
function mg(e, n) {
	switch (e) {
		case 1: return dg(cg.singleDigit, n);
		case 2: return dg(cg.twoDigits, n);
		case 3: return dg(cg.threeDigits, n);
		case 4: return dg(cg.fourDigits, n);
		default: return dg(RegExp("^\\d{1," + e + "}"), n);
	}
}
function hg(e, n) {
	switch (e) {
		case 1: return dg(cg.singleDigitSigned, n);
		case 2: return dg(cg.twoDigitsSigned, n);
		case 3: return dg(cg.threeDigitsSigned, n);
		case 4: return dg(cg.fourDigitsSigned, n);
		default: return dg(RegExp("^-?\\d{1," + e + "}"), n);
	}
}
function gg(e) {
	switch (e) {
		case "morning": return 4;
		case "evening": return 17;
		case "pm":
		case "noon":
		case "afternoon": return 12;
		default: return 0;
	}
}
function _g(e, n) {
	let r = n > 0, i = r ? n : 1 - n, a;
	if (i <= 50) a = e || 100;
	else {
		let n = i + 50, r = Math.trunc(n / 100) * 100, o = e >= n % 100;
		a = e + r - (o ? 100 : 0);
	}
	return r ? a : 1 - a;
}
function vg(e) {
	return e % 400 == 0 || e % 4 == 0 && e % 100 != 0;
}
var yg = class extends og {
	priority = 130;
	incompatibleTokens = [
		"Y",
		"R",
		"u",
		"w",
		"I",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
	parse(e, n, r) {
		let i = (e) => ({
			year: e,
			isTwoDigitYear: n === "yy"
		});
		switch (n) {
			case "y": return ug(mg(4, e), i);
			case "yo": return ug(r.ordinalNumber(e, { unit: "year" }), i);
			default: return ug(mg(n.length, e), i);
		}
	}
	validate(e, n) {
		return n.isTwoDigitYear || n.year > 0;
	}
	set(e, n, r) {
		let i = e.getFullYear();
		if (r.isTwoDigitYear) {
			let n = _g(r.year, i);
			return e.setFullYear(n, 0, 1), e.setHours(0, 0, 0, 0), e;
		}
		let a = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
		return e.setFullYear(a, 0, 1), e.setHours(0, 0, 0, 0), e;
	}
};
function bg(e, n) {
	let r = Zh(), i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = $h(e, n?.in), o = a.getDay(), s = (o < i ? 7 : 0) + o - i;
	return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function xg(e, n) {
	let r = $h(e, n?.in), i = r.getFullYear(), a = Zh(), o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, s = Yh(n?.in || e, 0);
	s.setFullYear(i + 1, 0, o), s.setHours(0, 0, 0, 0);
	let c = bg(s, n), l = Yh(n?.in || e, 0);
	l.setFullYear(i, 0, o), l.setHours(0, 0, 0, 0);
	let u = bg(l, n);
	return +r >= +c ? i + 1 : +r >= +u ? i : i - 1;
}
var Sg = class extends og {
	priority = 130;
	parse(e, n, r) {
		let i = (e) => ({
			year: e,
			isTwoDigitYear: n === "YY"
		});
		switch (n) {
			case "Y": return ug(mg(4, e), i);
			case "Yo": return ug(r.ordinalNumber(e, { unit: "year" }), i);
			default: return ug(mg(n.length, e), i);
		}
	}
	validate(e, n) {
		return n.isTwoDigitYear || n.year > 0;
	}
	set(e, n, r, i) {
		let a = xg(e, i);
		if (r.isTwoDigitYear) {
			let n = _g(r.year, a);
			return e.setFullYear(n, 0, i.firstWeekContainsDate), e.setHours(0, 0, 0, 0), bg(e, i);
		}
		let o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
		return e.setFullYear(o, 0, i.firstWeekContainsDate), e.setHours(0, 0, 0, 0), bg(e, i);
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"Q",
		"q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"i",
		"t",
		"T"
	];
};
function Cg(e, n) {
	return bg(e, {
		...n,
		weekStartsOn: 1
	});
}
var wg = class extends og {
	priority = 130;
	parse(e, n) {
		return hg(n === "R" ? 4 : n.length, e);
	}
	set(e, n, r) {
		let i = Yh(e, 0);
		return i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0), Cg(i);
	}
	incompatibleTokens = [
		"G",
		"y",
		"Y",
		"u",
		"Q",
		"q",
		"M",
		"L",
		"w",
		"d",
		"D",
		"e",
		"c",
		"t",
		"T"
	];
}, Tg = class extends og {
	priority = 130;
	parse(e, n) {
		return hg(n === "u" ? 4 : n.length, e);
	}
	set(e, n, r) {
		return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"G",
		"y",
		"Y",
		"R",
		"w",
		"I",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, Eg = class extends og {
	priority = 120;
	parse(e, n, r) {
		switch (n) {
			case "Q":
			case "QQ": return mg(n.length, e);
			case "Qo": return r.ordinalNumber(e, { unit: "quarter" });
			case "QQQ": return r.quarter(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.quarter(e, {
				width: "narrow",
				context: "formatting"
			});
			case "QQQQQ": return r.quarter(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.quarter(e, {
				width: "wide",
				context: "formatting"
			}) || r.quarter(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.quarter(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 4;
	}
	set(e, n, r) {
		return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"M",
		"L",
		"w",
		"I",
		"d",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, Dg = class extends og {
	priority = 120;
	parse(e, n, r) {
		switch (n) {
			case "q":
			case "qq": return mg(n.length, e);
			case "qo": return r.ordinalNumber(e, { unit: "quarter" });
			case "qqq": return r.quarter(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.quarter(e, {
				width: "narrow",
				context: "standalone"
			});
			case "qqqqq": return r.quarter(e, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.quarter(e, {
				width: "wide",
				context: "standalone"
			}) || r.quarter(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.quarter(e, {
				width: "narrow",
				context: "standalone"
			});
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 4;
	}
	set(e, n, r) {
		return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"Q",
		"M",
		"L",
		"w",
		"I",
		"d",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, Og = class extends og {
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"L",
		"w",
		"I",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
	priority = 110;
	parse(e, n, r) {
		let i = (e) => e - 1;
		switch (n) {
			case "M": return ug(dg(cg.month, e), i);
			case "MM": return ug(mg(2, e), i);
			case "Mo": return ug(r.ordinalNumber(e, { unit: "month" }), i);
			case "MMM": return r.month(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.month(e, {
				width: "narrow",
				context: "formatting"
			});
			case "MMMMM": return r.month(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.month(e, {
				width: "wide",
				context: "formatting"
			}) || r.month(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.month(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 11;
	}
	set(e, n, r) {
		return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
	}
}, kg = class extends og {
	priority = 110;
	parse(e, n, r) {
		let i = (e) => e - 1;
		switch (n) {
			case "L": return ug(dg(cg.month, e), i);
			case "LL": return ug(mg(2, e), i);
			case "Lo": return ug(r.ordinalNumber(e, { unit: "month" }), i);
			case "LLL": return r.month(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.month(e, {
				width: "narrow",
				context: "standalone"
			});
			case "LLLLL": return r.month(e, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.month(e, {
				width: "wide",
				context: "standalone"
			}) || r.month(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.month(e, {
				width: "narrow",
				context: "standalone"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 11;
	}
	set(e, n, r) {
		return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"M",
		"w",
		"I",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
};
function Ag(e, n) {
	let r = Zh(), i = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = xg(e, n), o = Yh(n?.in || e, 0);
	return o.setFullYear(a, 0, i), o.setHours(0, 0, 0, 0), bg(o, n);
}
function jg(e, n) {
	let r = $h(e, n?.in), i = +bg(r, n) - Ag(r, n);
	return Math.round(i / Wh) + 1;
}
function Mg(e, n, r) {
	let i = $h(e, r?.in), a = jg(i, r) - n;
	return i.setDate(i.getDate() - a * 7), $h(i, r?.in);
}
var Ng = class extends og {
	priority = 100;
	parse(e, n, r) {
		switch (n) {
			case "w": return dg(cg.week, e);
			case "wo": return r.ordinalNumber(e, { unit: "week" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 53;
	}
	set(e, n, r, i) {
		return bg(Mg(e, r, i), i);
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"i",
		"t",
		"T"
	];
};
function Pg(e, n) {
	let r = $h(e, n?.in), i = r.getFullYear(), a = Yh(r, 0);
	a.setFullYear(i + 1, 0, 4), a.setHours(0, 0, 0, 0);
	let o = Cg(a), s = Yh(r, 0);
	s.setFullYear(i, 0, 4), s.setHours(0, 0, 0, 0);
	let c = Cg(s);
	return r.getTime() >= o.getTime() ? i + 1 : r.getTime() >= c.getTime() ? i : i - 1;
}
function Fg(e, n) {
	let r = Pg(e, n), i = Yh(e, 0);
	return i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0), Cg(i);
}
function Ig(e, n) {
	let r = $h(e, n?.in), i = +Cg(r) - Fg(r);
	return Math.round(i / Wh) + 1;
}
function Lg(e, n, r) {
	let i = $h(e, r?.in), a = Ig(i, r) - n;
	return i.setDate(i.getDate() - a * 7), i;
}
var Rg = class extends og {
	priority = 100;
	parse(e, n, r) {
		switch (n) {
			case "I": return dg(cg.week, e);
			case "Io": return r.ordinalNumber(e, { unit: "week" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 53;
	}
	set(e, n, r) {
		return Cg(Lg(e, r));
	}
	incompatibleTokens = [
		"y",
		"Y",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"w",
		"d",
		"D",
		"e",
		"c",
		"t",
		"T"
	];
}, zg = [
	31,
	28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
], Bg = [
	31,
	29,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31
], Vg = class extends og {
	priority = 90;
	subPriority = 1;
	parse(e, n, r) {
		switch (n) {
			case "d": return dg(cg.date, e);
			case "do": return r.ordinalNumber(e, { unit: "date" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		let r = vg(e.getFullYear()), i = e.getMonth();
		return r ? n >= 1 && n <= Bg[i] : n >= 1 && n <= zg[i];
	}
	set(e, n, r) {
		return e.setDate(r), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"w",
		"I",
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, Hg = class extends og {
	priority = 90;
	subpriority = 1;
	parse(e, n, r) {
		switch (n) {
			case "D":
			case "DD": return dg(cg.dayOfYear, e);
			case "Do": return r.ordinalNumber(e, { unit: "date" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return vg(e.getFullYear()) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
	}
	set(e, n, r) {
		return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"Y",
		"R",
		"q",
		"Q",
		"M",
		"L",
		"w",
		"I",
		"d",
		"E",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
};
function Ug(e, n, r) {
	let i = $h(e, r?.in);
	return isNaN(n) ? Yh(r?.in || e, NaN) : (n && i.setDate(i.getDate() + n), i);
}
function Wg(e, n, r) {
	let i = Zh(), a = r?.weekStartsOn ?? r?.locale?.options?.weekStartsOn ?? i.weekStartsOn ?? i.locale?.options?.weekStartsOn ?? 0, o = $h(e, r?.in), s = o.getDay(), c = (n % 7 + 7) % 7, l = 7 - a;
	return Ug(o, n < 0 || n > 6 ? n - (s + l) % 7 : (c + l) % 7 - (s + l) % 7, r);
}
var Gg = class extends og {
	priority = 90;
	parse(e, n, r) {
		switch (n) {
			case "E":
			case "EE":
			case "EEE": return r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEE": return r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.day(e, {
				width: "wide",
				context: "formatting"
			}) || r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 6;
	}
	set(e, n, r, i) {
		return e = Wg(e, r, i), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"D",
		"i",
		"e",
		"c",
		"t",
		"T"
	];
}, Kg = class extends og {
	priority = 90;
	parse(e, n, r, i) {
		let a = (e) => {
			let n = Math.floor((e - 1) / 7) * 7;
			return (e + i.weekStartsOn + 6) % 7 + n;
		};
		switch (n) {
			case "e":
			case "ee": return ug(mg(n.length, e), a);
			case "eo": return ug(r.ordinalNumber(e, { unit: "day" }), a);
			case "eee": return r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeee": return r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.day(e, {
				width: "wide",
				context: "formatting"
			}) || r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 6;
	}
	set(e, n, r, i) {
		return e = Wg(e, r, i), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"E",
		"i",
		"c",
		"t",
		"T"
	];
}, qg = class extends og {
	priority = 90;
	parse(e, n, r, i) {
		let a = (e) => {
			let n = Math.floor((e - 1) / 7) * 7;
			return (e + i.weekStartsOn + 6) % 7 + n;
		};
		switch (n) {
			case "c":
			case "cc": return ug(mg(n.length, e), a);
			case "co": return ug(r.ordinalNumber(e, { unit: "day" }), a);
			case "ccc": return r.day(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.day(e, {
				width: "short",
				context: "standalone"
			}) || r.day(e, {
				width: "narrow",
				context: "standalone"
			});
			case "ccccc": return r.day(e, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return r.day(e, {
				width: "short",
				context: "standalone"
			}) || r.day(e, {
				width: "narrow",
				context: "standalone"
			});
			default: return r.day(e, {
				width: "wide",
				context: "standalone"
			}) || r.day(e, {
				width: "abbreviated",
				context: "standalone"
			}) || r.day(e, {
				width: "short",
				context: "standalone"
			}) || r.day(e, {
				width: "narrow",
				context: "standalone"
			});
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 6;
	}
	set(e, n, r, i) {
		return e = Wg(e, r, i), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"y",
		"R",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"I",
		"d",
		"D",
		"E",
		"i",
		"e",
		"t",
		"T"
	];
};
function Jg(e, n) {
	let r = $h(e, n?.in).getDay();
	return r === 0 ? 7 : r;
}
function Yg(e, n, r) {
	let i = $h(e, r?.in);
	return Ug(i, n - Jg(i, r), r);
}
var Xg = class extends og {
	priority = 90;
	parse(e, n, r) {
		let i = (e) => e === 0 ? 7 : e;
		switch (n) {
			case "i":
			case "ii": return mg(n.length, e);
			case "io": return r.ordinalNumber(e, { unit: "day" });
			case "iii": return ug(r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
			case "iiiii": return ug(r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
			case "iiiiii": return ug(r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
			default: return ug(r.day(e, {
				width: "wide",
				context: "formatting"
			}) || r.day(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.day(e, {
				width: "short",
				context: "formatting"
			}) || r.day(e, {
				width: "narrow",
				context: "formatting"
			}), i);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 7;
	}
	set(e, n, r) {
		return e = Yg(e, r), e.setHours(0, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"y",
		"Y",
		"u",
		"q",
		"Q",
		"M",
		"L",
		"w",
		"d",
		"D",
		"E",
		"e",
		"c",
		"t",
		"T"
	];
}, Zg = class extends og {
	priority = 80;
	parse(e, n, r) {
		switch (n) {
			case "a":
			case "aa":
			case "aaa": return r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			case "aaaaa": return r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(e, {
				width: "wide",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	set(e, n, r) {
		return e.setHours(gg(r), 0, 0, 0), e;
	}
	incompatibleTokens = [
		"b",
		"B",
		"H",
		"k",
		"t",
		"T"
	];
}, Qg = class extends og {
	priority = 80;
	parse(e, n, r) {
		switch (n) {
			case "b":
			case "bb":
			case "bbb": return r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			case "bbbbb": return r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(e, {
				width: "wide",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	set(e, n, r) {
		return e.setHours(gg(r), 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"B",
		"H",
		"k",
		"t",
		"T"
	];
}, $g = class extends og {
	priority = 80;
	parse(e, n, r) {
		switch (n) {
			case "B":
			case "BB":
			case "BBB": return r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			case "BBBBB": return r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
			default: return r.dayPeriod(e, {
				width: "wide",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "abbreviated",
				context: "formatting"
			}) || r.dayPeriod(e, {
				width: "narrow",
				context: "formatting"
			});
		}
	}
	set(e, n, r) {
		return e.setHours(gg(r), 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"b",
		"t",
		"T"
	];
}, e_ = class extends og {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "h": return dg(cg.hour12h, e);
			case "ho": return r.ordinalNumber(e, { unit: "hour" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 12;
	}
	set(e, n, r) {
		let i = e.getHours() >= 12;
		return i && r < 12 ? e.setHours(r + 12, 0, 0, 0) : !i && r === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"H",
		"K",
		"k",
		"t",
		"T"
	];
}, t_ = class extends og {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "H": return dg(cg.hour23h, e);
			case "Ho": return r.ordinalNumber(e, { unit: "hour" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 23;
	}
	set(e, n, r) {
		return e.setHours(r, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"b",
		"h",
		"K",
		"k",
		"t",
		"T"
	];
}, n_ = class extends og {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "K": return dg(cg.hour11h, e);
			case "Ko": return r.ordinalNumber(e, { unit: "hour" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 11;
	}
	set(e, n, r) {
		return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"h",
		"H",
		"k",
		"t",
		"T"
	];
}, r_ = class extends og {
	priority = 70;
	parse(e, n, r) {
		switch (n) {
			case "k": return dg(cg.hour24h, e);
			case "ko": return r.ordinalNumber(e, { unit: "hour" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 1 && n <= 24;
	}
	set(e, n, r) {
		let i = r <= 24 ? r % 24 : r;
		return e.setHours(i, 0, 0, 0), e;
	}
	incompatibleTokens = [
		"a",
		"b",
		"h",
		"H",
		"K",
		"t",
		"T"
	];
}, i_ = class extends og {
	priority = 60;
	parse(e, n, r) {
		switch (n) {
			case "m": return dg(cg.minute, e);
			case "mo": return r.ordinalNumber(e, { unit: "minute" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 59;
	}
	set(e, n, r) {
		return e.setMinutes(r, 0, 0), e;
	}
	incompatibleTokens = ["t", "T"];
}, a_ = class extends og {
	priority = 50;
	parse(e, n, r) {
		switch (n) {
			case "s": return dg(cg.second, e);
			case "so": return r.ordinalNumber(e, { unit: "second" });
			default: return mg(n.length, e);
		}
	}
	validate(e, n) {
		return n >= 0 && n <= 59;
	}
	set(e, n, r) {
		return e.setSeconds(r, 0), e;
	}
	incompatibleTokens = ["t", "T"];
}, o_ = class extends og {
	priority = 30;
	parse(e, n) {
		return ug(mg(n.length, e), (e) => Math.trunc(e * 10 ** (-n.length + 3)));
	}
	set(e, n, r) {
		return e.setMilliseconds(r), e;
	}
	incompatibleTokens = ["t", "T"];
};
function s_(e) {
	let n = $h(e), r = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
	return r.setUTCFullYear(n.getFullYear()), +e - r;
}
var c_ = class extends og {
	priority = 10;
	parse(e, n) {
		switch (n) {
			case "X": return fg(lg.basicOptionalMinutes, e);
			case "XX": return fg(lg.basic, e);
			case "XXXX": return fg(lg.basicOptionalSeconds, e);
			case "XXXXX": return fg(lg.extendedOptionalSeconds, e);
			default: return fg(lg.extended, e);
		}
	}
	set(e, n, r) {
		return n.timestampIsSet ? e : Yh(e, e.getTime() - s_(e) - r);
	}
	incompatibleTokens = [
		"t",
		"T",
		"x"
	];
}, l_ = class extends og {
	priority = 10;
	parse(e, n) {
		switch (n) {
			case "x": return fg(lg.basicOptionalMinutes, e);
			case "xx": return fg(lg.basic, e);
			case "xxxx": return fg(lg.basicOptionalSeconds, e);
			case "xxxxx": return fg(lg.extendedOptionalSeconds, e);
			default: return fg(lg.extended, e);
		}
	}
	set(e, n, r) {
		return n.timestampIsSet ? e : Yh(e, e.getTime() - s_(e) - r);
	}
	incompatibleTokens = [
		"t",
		"T",
		"X"
	];
}, u_ = class extends og {
	priority = 40;
	parse(e) {
		return pg(e);
	}
	set(e, n, r) {
		return [Yh(e, r * 1e3), { timestampIsSet: !0 }];
	}
	incompatibleTokens = "*";
}, d_ = class extends og {
	priority = 20;
	parse(e) {
		return pg(e);
	}
	set(e, n, r) {
		return [Yh(e, r), { timestampIsSet: !0 }];
	}
	incompatibleTokens = "*";
}, f_ = {
	G: new sg(),
	y: new yg(),
	Y: new Sg(),
	R: new wg(),
	u: new Tg(),
	Q: new Eg(),
	q: new Dg(),
	M: new Og(),
	L: new kg(),
	w: new Ng(),
	I: new Rg(),
	d: new Vg(),
	D: new Hg(),
	E: new Gg(),
	e: new Kg(),
	c: new qg(),
	i: new Xg(),
	a: new Zg(),
	b: new Qg(),
	B: new $g(),
	h: new e_(),
	H: new t_(),
	K: new n_(),
	k: new r_(),
	m: new i_(),
	s: new a_(),
	S: new o_(),
	X: new c_(),
	x: new l_(),
	t: new u_(),
	T: new d_()
}, p_ = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, m_ = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, h_ = /^'([^]*?)'?$/, g_ = /''/g, __ = /\S/, v_ = /[a-zA-Z]/;
function y_(e, n, r, i) {
	let a = () => Yh(i?.in || r, NaN), o = Qh(), s = i?.locale ?? o.locale ?? Nh, c = i?.firstWeekContainsDate ?? i?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, l = i?.weekStartsOn ?? i?.locale?.options?.weekStartsOn ?? o.weekStartsOn ?? o.locale?.options?.weekStartsOn ?? 0;
	if (!n) return e ? a() : $h(r, i?.in);
	let u = {
		firstWeekContainsDate: c,
		weekStartsOn: l,
		locale: s
	}, d = [new ag(i?.in, r)], f = n.match(m_).map((e) => {
		let n = e[0];
		if (n in Ih) {
			let r = Ih[n];
			return r(e, s.formatLong);
		}
		return e;
	}).join("").match(p_), p = [];
	for (let r of f) {
		!i?.useAdditionalWeekYearTokens && Vh(r) && Hh(r, n, e), !i?.useAdditionalDayOfYearTokens && Bh(r) && Hh(r, n, e);
		let o = r[0], c = f_[o];
		if (c) {
			let { incompatibleTokens: n } = c;
			if (Array.isArray(n)) {
				let e = p.find((e) => n.includes(e.token) || e.token === o);
				if (e) throw RangeError(`The format string mustn't contain \`${e.fullToken}\` and \`${r}\` at the same time`);
			} else if (c.incompatibleTokens === "*" && p.length > 0) throw RangeError(`The format string mustn't contain \`${r}\` and any other token at the same time`);
			p.push({
				token: o,
				fullToken: r
			});
			let i = c.run(e, r, s.match, u);
			if (!i) return a();
			d.push(i.setter), e = i.rest;
		} else {
			if (o.match(v_)) throw RangeError("Format string contains an unescaped latin alphabet character `" + o + "`");
			if (r === "''" ? r = "'" : o === "'" && (r = b_(r)), e.indexOf(r) === 0) e = e.slice(r.length);
			else return a();
		}
	}
	if (e.length > 0 && __.test(e)) return a();
	let m = d.map((e) => e.priority).sort((e, n) => n - e).filter((e, n, r) => r.indexOf(e) === n).map((e) => d.filter((n) => n.priority === e).sort((e, n) => n.subPriority - e.subPriority)).map((e) => e[0]), h = $h(r, i?.in);
	if (isNaN(+h)) return a();
	let g = {};
	for (let e of m) {
		if (!e.validate(h, u)) return a();
		let n = e.set(h, g, u);
		Array.isArray(n) ? (h = n[0], Object.assign(g, n[1])) : h = n;
	}
	return h;
}
function b_(e) {
	return e.match(h_)[1].replace(g_, "'");
}
m(oe, E);
function x_(e) {
	return e.code.split("-")[0] === "de" ? "P" : "PP";
}
function S_() {
	return "p";
}
function C_(e) {
	return x_(e) + S_();
}
function w_() {
	return "RRRR-II";
}
function T_(e) {
	return D_(e.code, !0);
}
function E_(e) {
	return D_(e.code, !1);
}
function D_(e, n) {
	let r = new Date(2026, 0, 1), i = {
		year: "numeric",
		calendar: "gregory"
	};
	return n && (i.month = "2-digit"), Intl.DateTimeFormat(e, i).formatToParts(r).map((e) => {
		switch (e.type) {
			case "month": return "MM";
			case "year": return "yyyy";
			case "literal": return O_(e.value);
			default: return "";
		}
	}).join("");
}
function O_(e) {
	return e = e.replaceAll(/'/g, "''"), e.replaceAll(/[A-Za-z]+/g, (e) => `'${e}'`);
}
var k_ = /* @__PURE__ */ new Set([
	"i",
	"I",
	"R",
	"t",
	"T",
	"o",
	"P",
	"p"
]), A_ = "'";
function j_(e) {
	let n = /* @__PURE__ */ new Set(), r = !1;
	for (let i of e) i === A_ ? r = !r : r || k_.has(i) && n.add(i);
	return [...n];
}
var $ = {};
$.af = async () => (await import("./af-B3MPDtJC.chunk.mjs")).af, $["ar-DZ"] = async () => (await import("./ar-DZ-C0TTkKOE.chunk.mjs")).arDZ, $["ar-EG"] = async () => (await import("./ar-EG-CcShhFXj.chunk.mjs")).arEG, $["ar-MA"] = async () => (await import("./ar-MA-DEJfU4gv.chunk.mjs")).arMA, $["ar-SA"] = async () => (await import("./ar-SA-KYyNZUyl.chunk.mjs")).arSA, $["ar-TN"] = async () => (await import("./ar-TN-K-eapIGO.chunk.mjs")).arTN, $.ar = async () => (await import("./ar-B_TlRBff.chunk.mjs")).ar, $.az = async () => (await import("./az-DwFM_Ny9.chunk.mjs")).az, $["be-tarask"] = async () => (await import("./be-tarask-BvRk9kiK.chunk.mjs")).beTarasak, $.be = async () => (await import("./be-C92kcBQm.chunk.mjs")).be, $.bg = async () => (await import("./bg-IiFbWEYi.chunk.mjs")).bg, $.bn = async () => (await import("./bn-DVGMUTzc.chunk.mjs")).bn, $.bs = async () => (await import("./bs-ofaHkh8-.chunk.mjs")).bs, $.ca = async () => (await import("./ca-BcENUMRL.chunk.mjs")).ca, $.ckb = async () => (await import("./ckb-BrR8Iuqb.chunk.mjs")).ckb, $.cs = async () => (await import("./cs-Ci33OsuA.chunk.mjs")).cs, $.cy = async () => (await import("./cy-DrhNIHz8.chunk.mjs")).cy, $.da = async () => (await import("./da-Dym_sHmJ.chunk.mjs")).da, $["de-AT"] = async () => (await import("./de-AT-DRQvWsZv.chunk.mjs")).deAT, $.de = async () => (await import("./de-sA5f3zaq.chunk.mjs")).de, $.el = async () => (await import("./el-3QcFJ1i2.chunk.mjs")).el, $["en-AU"] = async () => (await import("./en-AU-jsYxZqrw.chunk.mjs")).enAU, $["en-CA"] = async () => (await import("./en-CA-BPWCrL9o.chunk.mjs")).enCA, $["en-GB"] = async () => (await import("./en-GB-MOGhmtrv.chunk.mjs")).enGB, $["en-IE"] = async () => (await import("./en-IE-BnB5xOb1.chunk.mjs")).enIE, $["en-IN"] = async () => (await import("./en-IN-C3rr9jaR.chunk.mjs")).enIN, $["en-NZ"] = async () => (await import("./en-NZ-yDl8TyHA.chunk.mjs")).enNZ, $["en-ZA"] = async () => (await import("./en-ZA-CgEAfH9j.chunk.mjs")).enZA, $.eo = async () => (await import("./eo-CzPbj8c6.chunk.mjs")).eo, $.es = async () => (await import("./es-CfeVwWKY.chunk.mjs")).es, $.et = async () => (await import("./et-CC_njYad.chunk.mjs")).et, $.eu = async () => (await import("./eu-KH_UQSWC.chunk.mjs")).eu, $["fa-IR"] = async () => (await import("./fa-IR-mba2GgRI.chunk.mjs")).faIR, $.fi = async () => (await import("./fi-CaXIcpGL.chunk.mjs")).fi, $["fr-CA"] = async () => (await import("./fr-CA-BzYNkdkW.chunk.mjs")).frCA, $["fr-CH"] = async () => (await import("./fr-CH-C6Yw3Xj7.chunk.mjs")).frCH, $.fr = async () => (await import("./fr-CT4tKmM4.chunk.mjs")).fr, $.fy = async () => (await import("./fy-BucFFl8L.chunk.mjs")).fy, $.gd = async () => (await import("./gd-BaPiA3nc.chunk.mjs")).gd, $.gl = async () => (await import("./gl-CG5iquim.chunk.mjs")).gl, $.gu = async () => (await import("./gu-WmnD-cXT.chunk.mjs")).gu, $.he = async () => (await import("./he-DdjF7wYA.chunk.mjs")).he, $.hi = async () => (await import("./hi-WfdSIdrQ.chunk.mjs")).hi, $.hr = async () => (await import("./hr-V4PXVLSU.chunk.mjs")).hr, $.ht = async () => (await import("./ht-DNvbNLJG.chunk.mjs")).ht, $.hu = async () => (await import("./hu-BO3cBBw-.chunk.mjs")).hu, $.hy = async () => (await import("./hy-Ce0EuWeZ.chunk.mjs")).hy, $.id = async () => (await import("./id-COh-ny86.chunk.mjs")).id, $.is = async () => (await import("./is-Se_Jp712.chunk.mjs")).is, $["it-CH"] = async () => (await import("./it-CH-Itu-ZlaM.chunk.mjs")).itCH, $.it = async () => (await import("./it-BJSIsYLr.chunk.mjs")).it, $["ja-Hira"] = async () => (await import("./ja-Hira-CibOS9hT.chunk.mjs")).jaHira, $.ja = async () => (await import("./ja-DXWCiaDq.chunk.mjs")).ja, $.ka = async () => (await import("./ka-w_mL0DQL.chunk.mjs")).ka, $.kk = async () => (await import("./kk-DKrOygmy.chunk.mjs")).kk, $.km = async () => (await import("./km-C-UtGOEA.chunk.mjs")).km, $.kn = async () => (await import("./kn-CB8Sm231.chunk.mjs")).kn, $.ko = async () => (await import("./ko-Du849c73.chunk.mjs")).ko, $.lb = async () => (await import("./lb-CYaJuA5N.chunk.mjs")).lb, $.lt = async () => (await import("./lt-D7LjviI5.chunk.mjs")).lt, $.lv = async () => (await import("./lv-CaQwWv5y.chunk.mjs")).lv, $.mk = async () => (await import("./mk-eoaJo0ds.chunk.mjs")).mk, $.mn = async () => (await import("./mn-Dj4ImaHe.chunk.mjs")).mn, $.ms = async () => (await import("./ms-0AnfSwf2.chunk.mjs")).ms, $.mt = async () => (await import("./mt-DHLzo9og.chunk.mjs")).mt, $.nb = async () => (await import("./nb-BWx9gpAP.chunk.mjs")).nb, $["nl-BE"] = async () => (await import("./nl-BE-BIqzG4vw.chunk.mjs")).nlBE, $.nl = async () => (await import("./nl-DDJHcZSD.chunk.mjs")).nl, $.nn = async () => (await import("./nn-Cb_-E3nK.chunk.mjs")).nn, $.oc = async () => (await import("./oc-DpuHsqqa.chunk.mjs")).oc, $.pl = async () => (await import("./pl---rgs0sE.chunk.mjs")).pl, $["pt-BR"] = async () => (await import("./pt-BR-CZdPuc9c.chunk.mjs")).ptBR, $.pt = async () => (await import("./pt-DJSWsp6o.chunk.mjs")).pt, $.ro = async () => (await import("./ro--OtnfaEt.chunk.mjs")).ro, $.ru = async () => (await import("./ru-syTQFmdf.chunk.mjs")).ru, $.se = async () => (await import("./se-DEX-k4iL.chunk.mjs")).se, $.sk = async () => (await import("./sk-lpNaJ5nu.chunk.mjs")).sk, $.sl = async () => (await import("./sl-CKqG07gy.chunk.mjs")).sl, $.sq = async () => (await import("./sq-B1tzNWqb.chunk.mjs")).sq, $["sr-Latn"] = async () => (await import("./sr-Latn-C2zRyn4p.chunk.mjs")).srLatn, $.sr = async () => (await import("./sr-DGvasI2A.chunk.mjs")).sr, $.sv = async () => (await import("./sv-BwGBW9d-.chunk.mjs")).sv, $.ta = async () => (await import("./ta-CggL-X3p.chunk.mjs")).ta, $.te = async () => (await import("./te-Br0DLOfo.chunk.mjs")).te, $.th = async () => (await import("./th-BWRUnWSm.chunk.mjs")).th, $.tr = async () => (await import("./tr-UsPBRrIX.chunk.mjs")).tr, $.ug = async () => (await import("./ug-CGxHIKVg.chunk.mjs")).ug, $.uk = async () => (await import("./uk-B-w6Gd3n.chunk.mjs")).uk, $["uz-Cyrl"] = async () => (await import("./uz-Cyrl-BDOc0YgL.chunk.mjs")).uzCyrl, $.uz = async () => (await import("./uz-BONRbPAf.chunk.mjs")).uz, $.vi = async () => (await import("./vi-Cs3AHiMy.chunk.mjs")).vi, $["zh-CN"] = async () => (await import("./zh-CN-DaE-jFSI.chunk.mjs")).zhCN, $["zh-HK"] = async () => (await import("./zh-HK-OWe0ayTZ.chunk.mjs")).zhHK, $["zh-TW"] = async () => (await import("./zh-TW-CHCm_yve.chunk.mjs")).zhTW;
var M_ = $c, N_;
function P_() {
	let e = ft();
	if (e === M_.code) return {
		isLoading: W(!1),
		locale: W(M_)
	};
	if (N_ === void 0 && (N_ = F_(e)), N_ instanceof Promise) {
		let e = W(!0), n = W(M_);
		return N_.then((r) => {
			N_ = r, e.value = !1, n.value = N_;
		}), {
			isLoading: e,
			locale: n
		};
	}
	return {
		isLoading: W(!1),
		locale: W(N_)
	};
}
async function F_(e) {
	if (e in $) try {
		return await $[e]();
	} catch (n) {
		return be.warn("Failed to load locale.", {
			localeCode: e,
			error: n
		}), M_;
	}
	if (e.includes("-")) {
		let n = e.split("-")[0];
		return F_(n);
	}
	return be.warn("Found no locale to load.", { localeCode: e }), M_;
}
var I_ = { class: "vue-date-time-picker__wrapper" }, L_ = {
	ref: "target",
	class: "vue-date-time-picker__wrapper vue-date-time-picker__wrapper--teleport"
}, R_ = /* @__PURE__ */ xt({
	__name: "NcDateTimePicker",
	props: /* @__PURE__ */ gt({
		appendToBody: { type: Boolean },
		ariaLabel: { default: j("Datepicker input") },
		ariaLabelMenu: { default: j("Datepicker menu") },
		clearable: { type: Boolean },
		confirm: { type: Boolean },
		format: {
			type: [String, Function],
			default: void 0
		},
		locale: { default: void 0 },
		max: { default: void 0 },
		min: { default: void 0 },
		minuteStep: { default: 10 },
		modelValue: { default: null },
		placeholder: { default: void 0 },
		showTimezoneSelect: { type: Boolean },
		showWeekNumber: { type: Boolean },
		type: { default: "date" },
		inline: {
			type: Boolean,
			default: !1
		}
	}, {
		timezoneId: { default: "UTC" },
		timezoneIdModifiers: {}
	}),
	emits: /* @__PURE__ */ gt([
		"update:modelValue",
		"update:timezoneId",
		"blur"
	], ["update:timezoneId"]),
	setup(e, { emit: r }) {
		let a = at(e, "timezoneId"), o = e, s = r, c = ft();
		T(() => {
			o.locale !== void 0 && de("[NcDateTimePicker] The `locale` property is no longer used and will be ignored.");
		});
		let l = ce("target"), u = ce("picker"), d = M(() => {
			if (o.modelValue === null && o.clearable) return null;
			if (o.type === "week") {
				let e = o.modelValue instanceof Date ? o.modelValue : /* @__PURE__ */ new Date(), n = new Date(e);
				return n.setUTCDate(e.getUTCDate() + 6), [e, n];
			}
			if (o.type === "year") return (o.modelValue instanceof Date ? o.modelValue : /* @__PURE__ */ new Date()).getUTCFullYear();
			if (o.type === "month") {
				let e = o.modelValue instanceof Date ? o.modelValue : /* @__PURE__ */ new Date();
				return {
					year: e.getUTCFullYear(),
					month: e.getUTCMonth()
				};
			}
			if (o.type === "time") {
				let e = o.modelValue instanceof Date ? o.modelValue : /* @__PURE__ */ new Date();
				return {
					hours: e.getHours(),
					minutes: e.getMinutes(),
					seconds: e.getSeconds()
				};
			}
			if (o.type === "time-range") {
				let e = [o.modelValue].flat();
				if (e.length !== 2) {
					let n = /* @__PURE__ */ new Date(), r = new Date(n);
					r.setHours(r.getHours() + 1), e.splice(0, 2, n, r);
				}
				return e.map((e) => ({
					hours: e.getHours(),
					minutes: e.getMinutes(),
					seconds: e.getSeconds()
				}));
			}
			if (o.type.endsWith("-range")) {
				if (o.modelValue === void 0) {
					let e = /* @__PURE__ */ new Date(), n = new Date(e);
					return n.setUTCDate(e.getUTCDate() + 7), [e, n];
				}
				return o.modelValue;
			}
			return o.modelValue ?? /* @__PURE__ */ new Date();
		}), f = M(() => o.type === "date" ? j("Select date") : o.type === "time" ? j("Select time") : o.type === "datetime" ? j("Select date and time") : o.type === "week" ? j("Select week") : o.type === "month" ? j("Select month") : o.type === "year" ? j("Select year") : o.type.endsWith("-range") ? j("Select time range") : j("Select date and time")), { isLoading: p, locale: m } = P_();
		v(m, () => {
			u.value?.parseModel();
		}, { flush: "post" }), T(() => {
			if (typeof o.format != "string") return;
			let e = j_(o.format);
			if (e.length !== 0) {
				let n = `[NcDateTimePicker] The \`format\` property value "${o.format}" uses the non-standard formating tokens ${e.join(", ")}.`;
				n += " They will be disabled in the future because they are only supported by the date-fns library.", n += " Only use tokens from the Unicode Technical Standard #35.", n += " See https://github.com/nextcloud-libraries/nextcloud-vue/issues/8931", de(n);
			}
		});
		let h = M(() => {
			if (o.format) return o.format;
			switch (o.type) {
				case "date":
				case "date-range": return x_(m.value);
				case "time":
				case "time-range": return S_();
				case "datetime":
				case "datetime-range": return C_(m.value);
				case "month": return T_(m.value);
				case "year": return E_(m.value);
				case "week": return w_();
			}
		}), g = M(() => {
			let e = h.value;
			return typeof e == "function" ? !1 : typeof e != "string" || { format: (n) => y_(n, e, /* @__PURE__ */ new Date(), { locale: m.value }) };
		}), _ = M(() => ({
			timePicker: o.type === "time" || o.type === "time-range",
			yearPicker: o.type === "year",
			monthPicker: o.type === "month",
			weekPicker: o.type === "week",
			range: o.type.endsWith("-range") && { partialRange: !1 },
			enableTimePicker: o.type === "datetime" || o.type === "datetime-range",
			flow: o.type === "datetime" ? ["calendar", "time"] : void 0
		})), y = M(() => o.min && {
			hours: o.min.getHours(),
			minutes: o.min.getMinutes(),
			seconds: o.min.getSeconds()
		}), b = M(() => o.max && {
			hours: o.max.getHours(),
			minutes: o.max.getMinutes(),
			seconds: o.max.getSeconds()
		});
		function x(e) {
			if (e === null) return s("update:modelValue", null);
			if (o.type === "time") s("update:modelValue", S(e));
			else if (o.type === "time-range") {
				let n = S(e[0]), r = S(e[1]);
				r.getTime() < n.getTime() && r.setDate(r.getDate() + 1), s("update:modelValue", [n, r]);
			} else if (o.type === "month") {
				let n = e;
				s("update:modelValue", new Date(n.year, n.month, 1));
			} else o.type === "year" ? s("update:modelValue", new Date(e, 0)) : o.type === "week" ? s("update:modelValue", e[0]) : s("update:modelValue", e);
		}
		function S(e) {
			let n = /* @__PURE__ */ new Date();
			return n.setHours(e.hours), n.setMinutes(e.minutes), n.setSeconds(e.seconds), n;
		}
		let C = wt(), w = [...We()];
		for (let e = 0; e < C; e++) w.push(w.shift());
		let E = j("W"), D = M(() => ({
			toggleOverlay: j("Toggle overlay"),
			menu: o.ariaLabelMenu,
			input: o.ariaLabel,
			openTimePicker: j("Open time picker"),
			closeTimePicker: j("Close time Picker"),
			incrementValue: (e) => j(e === "hours" ? "Increment hours" : e === "minutes" ? "Increment minutes" : "Increment seconds"),
			decrementValue: (e) => j(e === "hours" ? "Decrement hours" : e === "minutes" ? "Decrement minutes" : "Decrement seconds"),
			openTpOverlay: (e) => j(e === "hours" ? "Open hours overlay" : e === "minutes" ? "Open minutes overlay" : "Open seconds overlay"),
			amPmButton: j("Switch AM/PM mode"),
			openYearsOverlay: j("Open years overlay"),
			openMonthsOverlay: j("Open months overlay"),
			nextMonth: j("Next month"),
			prevMonth: j("Previous month"),
			nextYear: j("Next year"),
			prevYear: j("Previous year"),
			weekDay: (e) => i()[e],
			clearInput: j("Clear value"),
			calendarIcon: j("Calendar icon"),
			timePicker: j("Time picker"),
			monthPicker: (e) => j(e ? "Month picker overlay" : "Month picker"),
			yearPicker: (e) => j(e ? "Year picker overlay" : "Year picker")
		}));
		function O() {
			u.value.selectDate();
		}
		function k() {
			u.value.closeMenu();
		}
		let ee = M(() => o.type === "datetime" ? {
			minDate: o.min,
			maxDate: o.max,
			minTime: o.min && d.value && te(o.min, d.value) ? y.value : void 0,
			maxTime: o.max && d.value && te(o.max, d.value) ? b.value : void 0
		} : o.type === "datetime-range" ? {
			minDate: o.min,
			maxDate: o.max,
			minTime: o.min && d.value && te(o.min, d.value[0]) ? y.value : void 0,
			maxTime: o.max && d.value && te(o.max, d.value[1]) ? b.value : void 0
		} : o.type === "time" || o.type === "time-range" ? {
			minTime: o.min ? y.value : void 0,
			maxTime: o.max ? b.value : void 0
		} : {
			minDate: o.min,
			maxDate: o.max
		});
		function te(e, n) {
			return e.getFullYear() === n.getFullYear() && e.getMonth() === n.getMonth() && e.getDate() === n.getDate();
		}
		return (r, i) => (J(), H("div", I_, [I(V(_h), B({
			ref: "picker",
			"aria-labels": D.value,
			autoApply: !e.confirm,
			class: ["vue-date-time-picker", { "vue-date-time-picker--clearable": e.clearable }],
			cancelText: V(j)("Cancel"),
			clearable: e.clearable,
			dayNames: w,
			placeholder: e.placeholder ?? f.value,
			format: h.value,
			locale: V(c),
			formatLocale: V(m),
			readonly: V(p),
			minDate: ee.value.minDate,
			maxDate: ee.value.maxDate,
			minTime: ee.value.minTime,
			maxTime: ee.value.maxTime,
			minutesIncrement: e.minuteStep,
			modelValue: d.value,
			nowButtonLabel: V(j)("Now"),
			selectText: V(j)("Pick"),
			sixWeeks: "fair",
			inline: e.inline,
			teleport: e.appendToBody ? l.value || void 0 : !1,
			textInput: g.value,
			weekNumName: V(E),
			weekNumbers: e.showWeekNumber ? { type: "iso" } : void 0,
			weekStart: V(C)
		}, _.value, {
			"onUpdate:modelValue": x,
			onBlur: i[1] ||= (e) => s("blur")
		}), yt({
			"action-buttons": A(() => [I(V(Ye), {
				size: "small",
				variant: "tertiary",
				onClick: k
			}, {
				default: A(() => [z(U(V(j)("Cancel")), 1)]),
				_: 1
			}), I(V(Ye), {
				size: "small",
				variant: "primary",
				onClick: O
			}, {
				default: A(() => [z(U(V(j)("Pick")), 1)]),
				_: 1
			})]),
			"clear-icon": A(({ clear: e }) => [I(V(Ye), {
				"aria-label": V(j)("Clear value"),
				variant: "tertiary-no-background",
				onClick: e
			}, {
				icon: A(() => [I(Qe, {
					inline: "",
					path: V(Ne),
					size: 20
				}, null, 8, ["path"])]),
				_: 1
			}, 8, ["aria-label", "onClick"])]),
			"input-icon": A(() => [I(Qe, {
				path: V(ut),
				size: 20
			}, null, 8, ["path"])]),
			"clock-icon": A(() => [I(Qe, {
				inline: "",
				path: V(Ze),
				size: 20
			}, null, 8, ["path"])]),
			"arrow-left": A(() => [I(Qe, {
				inline: "",
				path: V(_t),
				size: 20
			}, null, 8, ["path"])]),
			"arrow-right": A(() => [I(Qe, {
				inline: "",
				path: V(dt),
				size: 20
			}, null, 8, ["path"])]),
			"arrow-down": A(() => [I(Qe, {
				inline: "",
				path: V(qe),
				size: 20
			}, null, 8, ["path"])]),
			"arrow-up": A(() => [I(Qe, {
				inline: "",
				path: V(et),
				size: 20
			}, null, 8, ["path"])]),
			_: 2
		}, [e.showTimezoneSelect ? {
			name: "action-extra",
			fn: A(() => [I(bh, {
				modelValue: a.value,
				"onUpdate:modelValue": i[0] ||= (e) => a.value = e,
				class: "vue-date-time-picker__timezone",
				appendToBody: !1,
				inputLabel: V(j)("Time zone")
			}, null, 8, ["modelValue", "inputLabel"])]),
			key: "0"
		} : void 0]), 1040, [
			"aria-labels",
			"autoApply",
			"class",
			"cancelText",
			"clearable",
			"placeholder",
			"format",
			"locale",
			"formatLocale",
			"readonly",
			"minDate",
			"maxDate",
			"minTime",
			"maxTime",
			"minutesIncrement",
			"modelValue",
			"nowButtonLabel",
			"selectText",
			"inline",
			"teleport",
			"textInput",
			"weekNumName",
			"weekNumbers",
			"weekStart"
		]), (J(), L(Ee, {
			to: "body",
			disabled: !e.appendToBody
		}, [n("div", L_, null, 512)], 8, ["disabled"]))]));
	}
}), z_ = /* @__PURE__ */ je(R_, [["__scopeId", "data-v-23910d95"]]), B_ = {
	name: "SendIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, V_ = ["aria-hidden", "aria-label"], H_ = [
	"fill",
	"width",
	"height"
], U_ = { key: 0 };
function W_(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon send-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", U_, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M2,21L23,12L2,3V10L17,12L2,14V21Z" }, null, -1)
	], 8, H_))], 16, V_);
}
var G_ = /*#__PURE__*/ Y(B_, [["render", W_]]), K_ = {
	name: "LockIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, q_ = ["aria-hidden", "aria-label"], J_ = [
	"fill",
	"width",
	"height"
], Y_ = { key: 0 };
function X_(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon lock-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Y_, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" }, null, -1)
	], 8, J_))], 16, q_);
}
var Z_ = /*#__PURE__*/ Y(K_, [["render", X_]]), Q_ = {
	name: "InformationOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, $_ = ["aria-hidden", "aria-label"], ev = [
	"fill",
	"width",
	"height"
], tv = { key: 0 };
function nv(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon information-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", tv, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" }, null, -1)
	], 8, ev))], 16, $_);
}
// src/components/InfoIcon.vue
var rv = {
	name: "InfoIcon",
	components: {
		NcPopover: Lt,
		InformationOutline: /* @__PURE__ */ Y(Q_, [["render", nv]])
	}
}, iv = { class: "info-icon-wrapper" }, av = { class: "info-popup" };
function ov(e, r, i, a, o, s) {
	let c = P("InformationOutline"), l = P("NcPopover");
	return J(), H("span", iv, [I(l, { "no-focus-trap": "" }, {
		trigger: A(() => [I(c, {
			class: "info-icon",
			size: 14
		})]),
		default: A(() => [r[0] ||= z(), n("div", av, [q(e.$slots, "default", {}, void 0, !0)])]),
		_: 3
	})]);
}
var sv = /*#__PURE__*/ Y(rv, [["render", ov], ["__scopeId", "data-v-68720354"]]), cv = {
	name: "FilePdfBoxIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, lv = ["aria-hidden", "aria-label"], uv = [
	"fill",
	"width",
	"height"
], dv = { key: 0 };
function fv(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon file-pdf-box-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", dv, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9.5 11.5C9.5 12.3 8.8 13 8 13H7V15H5.5V9H8C8.8 9 9.5 9.7 9.5 10.5V11.5M14.5 13.5C14.5 14.3 13.8 15 13 15H10.5V9H13C13.8 9 14.5 9.7 14.5 10.5V13.5M18.5 10.5H17V11.5H18.5V13H17V15H15.5V9H18.5V10.5M12 10.5H13V13.5H12V10.5M7 10.5H8V11.5H7V10.5Z" }, null, -1)
	], 8, uv))], 16, lv);
}
var pv = /*#__PURE__*/ Y(cv, [["render", fv]]), mv = {
	name: "FormatListBulletedIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, hv = ["aria-hidden", "aria-label"], gv = [
	"fill",
	"width",
	"height"
], _v = { key: 0 };
function vv(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon format-list-bulleted-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", _v, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" }, null, -1)
	], 8, gv))], 16, hv);
}
var yv = /*#__PURE__*/ Y(mv, [["render", vv]]), bv = {
	async getActive() {
		try {
			return (await X.get("/projects")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getAll() {
		try {
			return (await X.get("/projects/all")).data;
		} catch (e) {
			Z(e);
		}
	},
	async search(e = "", n = 20) {
		try {
			return (await X.get("/projects/search", { params: {
				q: e,
				limit: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getById(e) {
		try {
			return (await X.get(`/projects/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e) {
		try {
			return (await X.post("/projects", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/projects/${e}`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e) {
		try {
			await X.delete(`/projects/${e}`);
		} catch (e) {
			Z(e);
		}
	},
	async addFavorite(e) {
		try {
			return (await X.put(`/projects/${e}/favorite`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async removeFavorite(e) {
		try {
			return (await X.delete(`/projects/${e}/favorite`)).data;
		} catch (e) {
			Z(e);
		}
	}
}, xv = wr("projects", () => {
	let e = W([]), n = W(!1), r = W(null), i = M(() => e.value.filter((e) => e.isActive));
	function a(n) {
		return e.value.find((e) => e.id === n);
	}
	async function o(i = !1) {
		n.value = !0, r.value = null;
		try {
			e.value = i ? await bv.getAll() : await bv.getActive();
		} catch (e) {
			r.value = Jo(e);
		} finally {
			n.value = !1;
		}
	}
	async function s(n) {
		let r = await bv.create(n);
		return e.value.push(r), r;
	}
	async function c({ id: n, data: r }) {
		let i = await bv.update(n, r);
		return Yo(e.value, i), i;
	}
	async function l(n) {
		await bv.delete(n), e.value = e.value.filter((e) => e.id !== n);
	}
	return {
		projects: e,
		loading: n,
		error: r,
		activeProjects: i,
		getProjectById: a,
		fetchProjects: o,
		createProject: s,
		updateProject: c,
		deleteProject: l
	};
}), Sv = {
	async getPendingMonths() {
		try {
			return (await X.get("/time-entries/pending-months")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getPendingEmergency() {
		try {
			return (await X.get("/time-entries/pending-emergency")).data;
		} catch (e) {
			Z(e);
		}
	},
	async approveEmergency(e) {
		try {
			return (await X.post(`/time-entries/${e}/approve-emergency`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async getApprovedMonths() {
		try {
			return (await X.get("/time-entries/approved-months")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getByEmployee(e, n = null, r = null) {
		try {
			let i = { employeeId: e };
			return n && (i.year = n), r && (i.month = r), (await X.get("/time-entries", { params: i })).data;
		} catch (e) {
			Z(e);
		}
	},
	async get(e) {
		try {
			return (await X.get(`/time-entries/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e) {
		try {
			return (await X.post("/time-entries", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/time-entries/${e}`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e, n = null) {
		try {
			await X.delete(`/time-entries/${e}`, n ? { params: { reason: n } } : void 0);
		} catch (e) {
			Z(e);
		}
	},
	async submit(e) {
		try {
			return (await X.post(`/time-entries/${e}/submit`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async approve(e) {
		try {
			return (await X.post(`/time-entries/${e}/approve`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async reject(e) {
		try {
			return (await X.post(`/time-entries/${e}/reject`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async suggestBreak(e, n) {
		try {
			return (await X.post("/time-entries/suggest-break", {
				startTime: e,
				endTime: n
			})).data.breakMinutes;
		} catch (e) {
			Z(e);
		}
	},
	async getActivePunch(e) {
		try {
			return (await X.get("/time-entries/active", { params: { employeeId: e } })).data;
		} catch (e) {
			Z(e);
		}
	},
	async punchIn(e, n = null, r = null) {
		try {
			return (await X.post("/time-entries/punch-in", {
				employeeId: e,
				projectId: n,
				description: r
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async punchPause(e) {
		try {
			return (await X.post("/time-entries/punch-pause", { employeeId: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async punchResume(e) {
		try {
			return (await X.post("/time-entries/punch-resume", { employeeId: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async punchOut(e, { breakMinutes: n = null, projectId: r = null, description: i = null, endTime: a = null, confirm: o = !1 } = {}) {
		try {
			return (await X.post("/time-entries/punch-out", {
				employeeId: e,
				breakMinutes: n,
				projectId: r,
				description: i,
				endTime: a,
				confirm: o
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async punchDiscard(e) {
		try {
			return (await X.post("/time-entries/punch-discard", { employeeId: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async submitMonth(e, n, r) {
		try {
			return (await X.post("/time-entries/submit-month", {
				employeeId: e,
				year: n,
				month: r
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async approveMonth(e, n, r) {
		try {
			return (await X.post("/time-entries/approve-month", {
				employeeId: e,
				year: n,
				month: r
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async reopenMonth(e, n, r, i) {
		try {
			return (await X.post("/time-entries/reopen-month", {
				employeeId: e,
				year: n,
				month: r,
				reason: i
			})).data;
		} catch (e) {
			throw Z(e), e;
		}
	},
	async rejectMonth(e, n, r, i) {
		try {
			return (await X.post("/time-entries/reject-month", {
				employeeId: e,
				year: n,
				month: r,
				reason: i
			})).data;
		} catch (e) {
			throw Z(e), e;
		}
	},
	async getMonthlyStats(e, n, r) {
		try {
			return (await X.get("/time-entries/stats/monthly", { params: {
				employeeId: e,
				year: n,
				month: r
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getArchiveStatus() {
		try {
			return (await X.get("/time-entries/archive-status")).data;
		} catch (e) {
			Z(e);
		}
	},
	async retryArchive(e) {
		try {
			return (await X.post(`/time-entries/archive-retry/${e}`)).data;
		} catch (e) {
			throw Z(e), e;
		}
	},
	async archiveNow(e, n, r) {
		try {
			return (await X.post("/time-entries/archive-now", {
				employeeId: e,
				year: n,
				month: r
			})).data;
		} catch (e) {
			throw Z(e), e;
		}
	}
}, Cv = wr("timeEntries", () => {
	let e = W([]), n = W({
		year: (/* @__PURE__ */ new Date()).getFullYear(),
		month: (/* @__PURE__ */ new Date()).getMonth() + 1
	}), r = W(!1), i = W(null), a = M(() => {
		let n = {};
		return e.value.forEach((e) => {
			n[e.date] || (n[e.date] = []), n[e.date].push(e);
		}), n;
	}), o = M(() => e.value.reduce((e, n) => e + n.workMinutes, 0)), s = M(() => e.value.filter((e) => e.status === "draft" || e.status === "rejected")), c = M(() => e.value.filter((e) => e.status === "submitted")), l = M(() => s.value.length > 0), u = M(() => c.value.length > 0), d = M(() => e.value.length > 0 && e.value.every((e) => e.status !== "draft" && e.status !== "rejected"));
	function f(n) {
		return e.value.find((e) => e.id === n);
	}
	async function p() {
		let a = qo().activeEmployeeId;
		if (a) {
			r.value = !0, i.value = null;
			try {
				let { year: r, month: i } = n.value;
				e.value = await Sv.getByEmployee(a, r, i);
			} catch (e) {
				i.value = Jo(e);
			} finally {
				r.value = !1;
			}
		}
	}
	function m({ year: e, month: r }) {
		n.value = {
			year: e,
			month: r
		}, p();
	}
	async function h(n) {
		let r = qo().activeEmployeeId, i = await Sv.create({
			...n,
			employeeId: r
		});
		return e.value.push(i), i;
	}
	async function g({ id: n, data: r }) {
		let i = await Sv.update(n, r);
		return Yo(e.value, i), i;
	}
	async function _(n) {
		let { id: r, reason: i } = Xo(n);
		await Sv.delete(r, i), e.value = e.value.filter((e) => e.id !== r);
	}
	async function v(n) {
		let r = await Sv.submit(n);
		return Yo(e.value, r), r;
	}
	async function y(n) {
		let r = await Sv.approve(n);
		return Yo(e.value, r), r;
	}
	async function b(n) {
		let r = await Sv.reject(n);
		return Yo(e.value, r), r;
	}
	async function x({ startTime: e, endTime: n }) {
		return await Sv.suggestBreak(e, n);
	}
	async function S() {
		let e = qo().activeEmployeeId, { year: r, month: i } = n.value, a = await Sv.submitMonth(e, r, i);
		return await p(), a;
	}
	async function C(e) {
		let { year: r, month: i } = n.value, a = await Sv.approveMonth(e, r, i);
		return await p(), a;
	}
	return {
		timeEntries: e,
		selectedMonth: n,
		loading: r,
		error: i,
		entriesByDate: a,
		totalWorkMinutes: o,
		draftEntries: s,
		submittedEntries: c,
		hasSubmittableEntries: l,
		hasApprovableEntries: u,
		allEntriesSubmitted: d,
		getEntryById: f,
		fetchTimeEntries: p,
		setSelectedMonth: m,
		createTimeEntry: h,
		updateTimeEntry: g,
		deleteTimeEntry: _,
		submitTimeEntry: v,
		approveTimeEntry: y,
		rejectTimeEntry: b,
		suggestBreak: x,
		submitMonth: S,
		approveMonth: C
	};
});
// node_modules/@nextcloud/vue/dist/functions/dialog/index.mjs
function wv(e, n = {}, r = {}) {
	let { container: i } = r;
	"container" in n && typeof n.container == "string" && (i ??= n.container);
	let a = (typeof i == "string" && document.querySelector(i) || document.body).appendChild(document.createElement("div"));
	return new Promise((r, i) => {
		let o = xe(e, {
			...n,
			container: null,
			onClose(...e) {
				let n = e.length > 1 ? e : e[0];
				o.unmount(), a.remove(), r(n);
			},
			"onVue:unmounted": () => {
				o.unmount(), a.remove(), i(/* @__PURE__ */ Error("Dialog was unmounted without close event"));
			}
		});
		o.mount(a);
	});
}
// node_modules/@nextcloud/vue/dist/chunks/NcNoteCard.mjs
var Tv = ["role"], Ev = {
	key: 0,
	class: "notecard__heading"
}, Dv = { class: "notecard__text" }, Ov = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcNoteCard",
	props: {
		heading: { default: void 0 },
		showAlert: { type: Boolean },
		text: { default: void 0 },
		type: { default: "warning" }
	},
	setup(e) {
		let r = e, i = M(() => r.showAlert || r.type === "error"), a = M(() => {
			switch (r.type) {
				case "error": return mt;
				case "success": return He;
				case "info": return _e;
				default: return rt;
			}
		});
		return (r, o) => (J(), H("div", {
			class: G(["notecard", {
				[`notecard--${e.type}`]: e.type,
				"notecard--legacy": V(kt)
			}]),
			role: i.value ? "alert" : "note"
		}, [q(r.$slots, "icon", {}, () => [I(V(Qe), {
			path: a.value,
			class: G(["notecard__icon", { "notecard__icon--heading": e.heading }]),
			inline: ""
		}, null, 8, ["path", "class"])], !0), n("div", null, [e.heading ? (J(), H("p", Ev, U(e.heading), 1)) : K("", !0), q(r.$slots, "default", {}, () => [n("p", Dv, U(e.text), 1)], !0)])], 10, Tv));
	}
}), [["__scopeId", "data-v-6be9fa31"]]), kv = "<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"mdi-folder-move\" viewBox=\"0 0 24 24\"><path d=\"M14,18V15H10V11H14V8L19,13M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z\" /></svg>", Av = "<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"mdi-folder-multiple\" viewBox=\"0 0 24 24\"><path d=\"M22,4H14L12,2H6A2,2 0 0,0 4,4V16A2,2 0 0,0 6,18H22A2,2 0 0,0 24,16V6A2,2 0 0,0 22,4M2,6H0V11H0V20A2,2 0 0,0 2,22H20V20H2V6Z\" /></svg>", jv = class extends Error {}, Mv = class {
	title;
	multiSelect;
	mimeTypeFilter;
	directoriesAllowed;
	noMenu;
	buttons;
	path;
	filter;
	canPick;
	container;
	disabledNavigation;
	constructor(e, n, r, i, a, o, s, c, l, u, d = !1) {
		this.title = e, this.multiSelect = n, this.mimeTypeFilter = r, this.directoriesAllowed = i, this.noMenu = a, this.path = s, this.filter = c, this.canPick = l, this.buttons = o, this.container = u, this.disabledNavigation = d;
	}
	async pickNodes() {
		let { default: e } = await import("./FilePicker-qWi4RBGN-BCLO6stc.chunk.mjs"), n = await wv(e, {
			allowPickDirectory: this.directoriesAllowed,
			noMenu: this.noMenu,
			buttons: this.buttons,
			name: this.title,
			path: this.path,
			mimetypeFilter: this.mimeTypeFilter,
			multiselect: this.multiSelect,
			filterFn: this.filter,
			canPickFn: this.canPick,
			disabledNavigation: this.disabledNavigation
		}, { container: this.container });
		if (!Array.isArray(n) || n.length === 0) throw new jv("FilePicker: No nodes selected");
		return n;
	}
	async pick() {
		let e = await this.pickNodes();
		return this.multiSelect ? e.map((e) => e.path) : e[0]?.path ?? "/";
	}
}, Nv = class {
	title;
	multiSelect = !1;
	mimeTypeFilter = [];
	directoriesAllowed = !1;
	noMenu = !1;
	path;
	filter;
	canPick;
	buttons = [];
	container;
	disabledNavigation = !1;
	constructor(e) {
		this.title = e;
	}
	setContainer(e) {
		return this.container = e, this;
	}
	setMultiSelect(e) {
		return this.multiSelect = e, this;
	}
	addMimeTypeFilter(e) {
		return this.mimeTypeFilter.push(e), this;
	}
	setMimeTypeFilter(e) {
		return this.mimeTypeFilter = e, this;
	}
	addButton(e) {
		return typeof this.buttons == "function" && (Zt.warn("FilePicker buttons were set to factory, now overwritten with button object."), this.buttons = []), this.buttons.push(e), this;
	}
	setButtonFactory(e) {
		return this.buttons = e, this;
	}
	setType(e) {
		return this.buttons = (n, r) => {
			let i = [], a = n[0]?.displayname || Yt(r);
			if (e === 1) {
				let e = Wt("Choose");
				n.length === 1 ? e = Wt("Choose {file}", { file: a }) : this.multiSelect && (e = Ht("Choose %n file", "Choose %n files", n.length)), i.push({
					callback: () => {},
					label: e,
					variant: "primary"
				});
			}
			return (e === 4 || e === 3) && i.push({
				callback: () => {},
				label: a ? Wt("Copy to {target}", { target: a }) : Wt("Copy"),
				icon: Av,
				variant: e === 3 ? "primary" : "secondary"
			}), (e === 4 || e === 2) && i.push({
				callback: () => {},
				label: a ? Wt("Move to {target}", { target: a }) : Wt("Move"),
				icon: kv,
				variant: "primary"
			}), i;
		}, this;
	}
	allowDirectories(e = !0) {
		return this.directoriesAllowed = e, this;
	}
	setNoMenu(e = !0) {
		return this.noMenu = e, this;
	}
	startAt(e) {
		return this.path = e, this;
	}
	setFilter(e) {
		return this.filter = e, this;
	}
	setCanPick(e) {
		return this.canPick = e, this;
	}
	disableNavigation() {
		return this.disabledNavigation = !0, this;
	}
	build() {
		return new Mv(this.title, this.multiSelect, this.mimeTypeFilter, this.directoriesAllowed, this.noMenu, this.buttons, this.path, this.filter, this.canPick, this.container, this.disabledNavigation);
	}
};
function Pv(e) {
	return new Nv(e);
}
var Fv = ["textContent"], Iv = ["innerHTML"], Lv = /* @__PURE__ */ xt({
	__name: "GenericDialog",
	props: {
		name: {},
		text: {},
		html: {},
		buttons: {},
		severity: {}
	},
	emits: ["close"],
	setup(e, { emit: r }) {
		let i = e, a = r, o = M(() => i.buttons?.map((e) => ({
			...e,
			callback() {
				e.callback(), a("close", !0);
			}
		}))), s = () => `${i.name}: ${i.text}`;
		return It(() => window.addEventListener("unload", s)), Ie(() => window.removeEventListener("unload", s)), (r, i) => (J(), L(V(Qt), {
			dialogClasses: "nc-generic-dialog",
			buttons: o.value,
			name: e.name,
			message: e.text,
			"onUpdate:open": i[0] ||= (e) => r.$emit("close", !1)
		}, {
			default: A(() => [e.severity ? (J(), L(V(Ov), {
				key: 0,
				type: e.severity
			}, {
				default: A(() => [n("p", { textContent: U(e.text) }, null, 8, Fv)]),
				_: 1
			}, 8, ["type"])) : K("", !0), e.html ? (J(), H("div", {
				key: 1,
				innerHTML: e.html
			}, null, 8, Iv)) : K("", !0)]),
			_: 1
		}, 8, [
			"buttons",
			"name",
			"message"
		]));
	}
}), Rv = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e, n, r = [], i) {
		this.#e = e, this.#t = n, this.#n = r, this.#r = i;
	}
	async show() {
		if (!await wv(Lv, {
			buttons: this.#n,
			name: this.#e,
			text: this.#t,
			severity: this.#r
		})) throw Error("Dialog closed");
	}
}, zv = class {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		this.#e = void 0, this.#t = "", this.#n = e ?? "", this.#r = [];
	}
	setName(e) {
		return this.#n = e, this;
	}
	setText(e) {
		return this.#t = e, this;
	}
	setSeverity(e) {
		return this.#e = e, this;
	}
	setButtons(e) {
		return this.#r.length > 0 && Zt.warn("[@nextcloud/dialogs] Dialog buttons are already set - this overrides previous buttons."), this.#r = e, this;
	}
	addButton(e) {
		return this.#r.push(e), this;
	}
	build() {
		return new Rv(this.#n, this.#t, this.#r, this.#e);
	}
};
function Bv(e) {
	return new zv(e);
}
// src/utils/errorHandler.js
function Vv(e) {
	$t(e);
}
function Hv(e) {
	qt(e);
}
function Uv(e, n = "Bestätigung", r = "OK", i = !1) {
	return new Promise((a) => {
		let o = Bv(n).setText(e).setButtons([{
			label: "Abbrechen",
			variant: "secondary",
			callback: () => a(!1)
		}, {
			label: r,
			variant: i ? "error" : "primary",
			callback: () => a(!0)
		}]);
		i && o.setSeverity("warning"), o.build().show().catch(() => a(!1));
	});
}
// src/utils/dateUtils.js
function Wv() {
	return document.documentElement.lang || navigator.language || "de-DE";
}
function Gv(e) {
	return e ? (typeof e == "string" ? new Date(e) : e).toLocaleDateString(Wv(), {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	}) : "";
}
function Kv(e) {
	if (!e) return "";
	let n = typeof e == "string" ? new Date(e) : e;
	return `${Xv(n.getDay())}, ${n.toLocaleDateString(Wv(), {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	})}`;
}
function qv(e) {
	if (!e) return "";
	let n = typeof e == "string" ? new Date(e) : e;
	return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}
function Jv(e) {
	return [
		R("worktime", "Januar"),
		R("worktime", "Februar"),
		R("worktime", "März"),
		R("worktime", "April"),
		R("worktime", "Mai"),
		R("worktime", "Juni"),
		R("worktime", "Juli"),
		R("worktime", "August"),
		R("worktime", "September"),
		R("worktime", "Oktober"),
		R("worktime", "November"),
		R("worktime", "Dezember")
	][e - 1] || "";
}
function Yv(e) {
	return [
		R("worktime", "Jan"),
		R("worktime", "Feb"),
		R("worktime", "Mrz"),
		R("worktime", "Apr"),
		R("worktime", "Mai"),
		R("worktime", "Jun"),
		R("worktime", "Jul"),
		R("worktime", "Aug"),
		R("worktime", "Sep"),
		R("worktime", "Okt"),
		R("worktime", "Nov"),
		R("worktime", "Dez")
	][e - 1] || "";
}
function Xv(e) {
	return [
		R("worktime", "So"),
		R("worktime", "Mo"),
		R("worktime", "Di"),
		R("worktime", "Mi"),
		R("worktime", "Do"),
		R("worktime", "Fr"),
		R("worktime", "Sa")
	][e] || "";
}
function Zv() {
	return (/* @__PURE__ */ new Date()).getFullYear();
}
function Qv() {
	return (/* @__PURE__ */ new Date()).getMonth() + 1;
}
function $v() {
	return qv(/* @__PURE__ */ new Date());
}
function ey(e) {
	let n = (typeof e == "string" ? new Date(e) : e).getDay();
	return n === 0 || n === 6;
}
function ty(e, n) {
	return new Date(e, n, 0).getDate();
}
function ny(e, n) {
	let r = [], i = ty(e, n);
	for (let a = 1; a <= i; a++) {
		let i = new Date(e, n - 1, a);
		r.push({
			date: qv(i),
			day: a,
			dayOfWeek: i.getDay(),
			isWeekend: ey(i)
		});
	}
	return r;
}
function ry(e) {
	let n = /^(\d{4})-(\d{2})-(\d{2})$/.exec(e || "");
	return n ? new Date(Number(n[1]), Number(n[2]) - 1, Number(n[3])) : new Date(e);
}
function iy(e, n = 2) {
	return !Number.isInteger(e) || e < 0 ? -1 : Math.max(0, e - n);
}
function ay(e, n) {
	return !e || !n ? !1 : e.top >= n.top && e.bottom <= n.bottom;
}
function oy(e) {
	for (let n = e?.parentElement; n; n = n.parentElement) if (/(auto|scroll)/.test(getComputedStyle(n).overflowY) && n.scrollHeight > n.clientHeight) return n;
	return null;
}
// src/constants.js
var sy = {
	DRAFT: "draft",
	SUBMITTED: "submitted",
	APPROVED: "approved",
	REJECTED: "rejected"
}, cy = {
	VACATION: "vacation",
	SICK: "sick",
	CHILD_SICK: "child_sick",
	SPECIAL: "special",
	TRAINING: "training",
	COMPENSATORY: "compensatory",
	UNPAID: "unpaid",
	COMPANY_CLOSURE: "company_closure"
}, ly = {
	PENDING: "pending",
	APPROVED: "approved",
	REJECTED: "rejected",
	CANCELLED: "cancelled"
};
function uy() {
	return {
		[sy.DRAFT]: R("worktime", "Entwurf"),
		[sy.SUBMITTED]: R("worktime", "Eingereicht"),
		[sy.APPROVED]: R("worktime", "Genehmigt"),
		[sy.REJECTED]: R("worktime", "Abgelehnt"),
		[ly.PENDING]: R("worktime", "Ausstehend"),
		[ly.CANCELLED]: R("worktime", "Storniert")
	};
}
function dy() {
	return {
		[cy.VACATION]: R("worktime", "Urlaub"),
		[cy.SICK]: R("worktime", "Krankheit"),
		[cy.CHILD_SICK]: R("worktime", "Kind krank"),
		[cy.SPECIAL]: R("worktime", "Sonderurlaub"),
		[cy.TRAINING]: R("worktime", "Fortbildung"),
		[cy.COMPENSATORY]: R("worktime", "Freizeitausgleich"),
		[cy.UNPAID]: R("worktime", "Unbezahlter Urlaub"),
		[cy.COMPANY_CLOSURE]: R("worktime", "Betriebsschließung")
	};
}
// src/utils/timeUtils.js
function fy(e) {
	if (e == null) return "0:00";
	let n = e < 0 ? "-" : "", r = Math.abs(e);
	return `${n}${Math.floor(r / 60)}:${(r % 60).toString().padStart(2, "0")}`;
}
function py(e) {
	return `${fy(e)} ${R("worktime", "Std.")}`;
}
function my(e) {
	if (!e) return 0;
	let [n, r] = e.split(":").map(Number);
	return n * 60 + r;
}
function hy(e, n, r = 0) {
	let i = my(e), a = my(n);
	return a < i && (a += 1440), Math.max(0, a - i - r);
}
function gy(e, n = 30, r = 45) {
	return e <= 360 ? 0 : e <= 540 + n ? n : r;
}
function _y() {
	let e = /* @__PURE__ */ new Date();
	return `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
}
function vy(e, n) {
	return e ? my(n) > my(e) ? n : "" : n;
}
// src/utils/formatters.js
function yy(e) {
	let n = Number(e) || 0, r = n.toLocaleString(Wv(), { maximumFractionDigits: 2 });
	return Fe("worktime", "{days} Tag", "{days} Tage", n, { days: r });
}
function by(e) {
	return uy()[e] || e;
}
function xy(e) {
	return dy()[e] || e;
}
function Sy(e) {
	return e === "vacation" ? "vacation" : e === "sick" || e === "child_sick" ? "sick" : "other";
}
function Cy(e) {
	if (!e) return "";
	let n = typeof e == "string" ? new Date(e) : e, r = Wv();
	return `${n.toLocaleDateString(r, { weekday: "short" })}, ${n.toLocaleDateString(r, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	})}`;
}
function wy(e, n = 0) {
	return e == null ? "0" : e.toLocaleString(Wv(), {
		minimumFractionDigits: n,
		maximumFractionDigits: n
	});
}
// node_modules/vue-material-design-icons/ChevronLeft.vue
var Ty = {
	name: "ChevronLeftIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Ey = ["aria-hidden", "aria-label"], Dy = [
	"fill",
	"width",
	"height"
], Oy = { key: 0 };
function ky(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon chevron-left-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Oy, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" }, null, -1)
	], 8, Dy))], 16, Ey);
}
var Ay = /*#__PURE__*/ Y(Ty, [["render", ky]]), jy = {
	name: "ChevronRightIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, My = ["aria-hidden", "aria-label"], Ny = [
	"fill",
	"width",
	"height"
], Py = { key: 0 };
function Fy(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon chevron-right-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Py, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }, null, -1)
	], 8, Ny))], 16, My);
}
var Iy = /*#__PURE__*/ Y(jy, [["render", Fy]]), Ly = {
	name: "MonthPicker",
	emits: ["update"],
	components: {
		NcButton: Ye,
		ChevronLeft: Ay,
		ChevronRight: Iy
	},
	props: {
		year: {
			type: Number,
			required: !0
		},
		month: {
			type: Number,
			required: !0
		}
	},
	computed: { monthName() {
		return Jv(this.month);
	} },
	methods: {
		previousMonth() {
			let e = this.month - 1, n = this.year;
			e < 1 && (e = 12, n--), this.$emit("update", {
				year: n,
				month: e
			});
		},
		nextMonth() {
			let e = this.month + 1, n = this.year;
			e > 12 && (e = 1, n++), this.$emit("update", {
				year: n,
				month: e
			});
		}
	}
}, Ry = { class: "month-picker" }, zy = { class: "month-picker__label" };
function By(e, r, i, a, o, s) {
	let c = P("ChevronLeft"), l = P("NcButton"), u = P("ChevronRight");
	return J(), H("div", Ry, [
		I(l, {
			variant: "tertiary",
			"aria-label": e.t("worktime", "Vorheriger Monat"),
			onClick: s.previousMonth
		}, {
			icon: A(() => [I(c, { size: 20 })]),
			_: 1
		}, 8, ["aria-label", "onClick"]),
		r[0] ||= z(),
		n("span", zy, U(s.monthName) + " " + U(i.year), 1),
		r[1] ||= z(),
		I(l, {
			variant: "tertiary",
			"aria-label": e.t("worktime", "Nächster Monat"),
			onClick: s.nextMonth
		}, {
			icon: A(() => [I(u, { size: 20 })]),
			_: 1
		}, 8, ["aria-label", "onClick"])
	]);
}
var Vy = /*#__PURE__*/ Y(Ly, [["render", By], ["__scopeId", "data-v-c82db14b"]]), Hy = {
	name: "YearPicker",
	emits: ["update"],
	components: {
		NcButton: Ye,
		ChevronLeft: Ay,
		ChevronRight: Iy
	},
	props: {
		year: {
			type: Number,
			required: !0
		},
		min: {
			type: Number,
			default: null
		},
		max: {
			type: Number,
			default: null
		}
	}
}, Uy = { class: "year-picker" }, Wy = { class: "year-picker__label" };
function Gy(e, r, i, a, o, s) {
	let c = P("ChevronLeft"), l = P("NcButton"), u = P("ChevronRight");
	return J(), H("div", Uy, [
		I(l, {
			variant: "tertiary",
			"aria-label": e.t("worktime", "Vorheriges Jahr"),
			disabled: i.min !== null && i.year <= i.min,
			onClick: r[0] ||= (n) => e.$emit("update", i.year - 1)
		}, {
			icon: A(() => [I(c, { size: 20 })]),
			_: 1
		}, 8, ["aria-label", "disabled"]),
		r[2] ||= z(),
		n("span", Wy, U(i.year), 1),
		r[3] ||= z(),
		I(l, {
			variant: "tertiary",
			"aria-label": e.t("worktime", "Nächstes Jahr"),
			disabled: i.max !== null && i.year >= i.max,
			onClick: r[1] ||= (n) => e.$emit("update", i.year + 1)
		}, {
			icon: A(() => [I(u, { size: 20 })]),
			_: 1
		}, 8, ["aria-label", "disabled"])
	]);
}
var Ky = /*#__PURE__*/ Y(Hy, [["render", Gy], ["__scopeId", "data-v-7616c164"]]), qy = {
	name: "ChevronDownIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Jy = ["aria-hidden", "aria-label"], Yy = [
	"fill",
	"width",
	"height"
], Xy = { key: 0 };
function Zy(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon chevron-down-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Xy, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }, null, -1)
	], 8, Yy))], 16, Jy);
}
var Qy = /*#__PURE__*/ Y(qy, [["render", Zy]]), $y = {
	name: "ChevronUpIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, eb = ["aria-hidden", "aria-label"], tb = [
	"fill",
	"width",
	"height"
], nb = { key: 0 };
function rb(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon chevron-up-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", nb, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" }, null, -1)
	], 8, tb))], 16, eb);
}
// src/components/OvertimeSummary.vue
var ib = {
	name: "OvertimeSummary",
	components: {
		InfoIcon: sv,
		NcButton: Ye,
		ChevronDown: Qy,
		ChevronUp: /* @__PURE__ */ Y($y, [["render", rb]])
	},
	props: {
		targetMinutes: {
			type: Number,
			default: 0
		},
		actualMinutes: {
			type: Number,
			default: 0
		},
		overtimeMinutes: {
			type: Number,
			default: 0
		},
		balanceMinutes: {
			type: Number,
			default: null
		},
		vacationRemaining: {
			type: Number,
			default: null
		},
		vacationCarryover: {
			type: Number,
			default: 0
		},
		vacationTotal: {
			type: Number,
			default: null
		},
		year: {
			type: Number,
			default: null
		},
		month: {
			type: Number,
			default: null
		},
		statistics: {
			type: Object,
			default: null
		},
		period: {
			type: String,
			default: "month",
			validator: (e) => ["month", "year"].includes(e)
		}
	},
	data() {
		return { showDetails: !1 };
	},
	computed: {
		displayOvertime() {
			return this.balanceMinutes === null ? this.overtimeMinutes : this.balanceMinutes;
		},
		monthLabel() {
			return !this.month || !this.year ? "" : `${Jv(this.month)} ${this.year}`;
		},
		headLabel() {
			return this.period === "year" ? this.t("worktime", "Ist / Soll · {year}", { year: this.year }) : this.t("worktime", "Ist / Soll · {month}", { month: this.monthLabel });
		},
		periodSoll() {
			return this.period === "year" ? this.targetMinutes : this.statistics?.targetMinutes ?? 0;
		},
		percent() {
			return this.periodSoll ? Math.round(this.actualMinutes / this.periodSoll * 100) : 0;
		},
		barWidth() {
			return Math.min(100, Math.max(0, this.percent));
		},
		remaining() {
			return Math.max(0, this.periodSoll - this.actualMinutes);
		},
		remainingLabel() {
			return this.period === "year" ? this.t("worktime", "noch {hours} h bis Jahressoll", { hours: this.hoursLabel(this.remaining) }) : this.t("worktime", "noch {hours} h bis Monatssoll", { hours: this.hoursLabel(this.remaining) });
		},
		pacingPositive() {
			return this.overtimeMinutes >= 0;
		},
		pacingLabel() {
			return this.pacingPositive ? this.t("worktime", "anteilig: im Plan") : this.t("worktime", "{hours} h unter Plan", { hours: this.absHoursLabel(this.overtimeMinutes) });
		},
		vacationSub() {
			return this.vacationCarryover > 0 ? this.t("worktime", "inkl. {days} Tage Übertrag", { days: this.vacationCarryover }) : "";
		},
		overtimeSubLabel() {
			return this.period === "year" ? this.t("worktime", "Jahressaldo {year}", { year: this.year }) : this.t("worktime", "Jahressaldo {year} · Stand heute", { year: this.year });
		}
	},
	methods: {
		formatMinutes(e) {
			return py(e);
		},
		hoursLabel(e) {
			return fy(e);
		},
		absHoursLabel(e) {
			return fy(Math.abs(e));
		},
		dayCount(e) {
			let n = Number(e) || 0;
			return wy(n, +!Number.isInteger(n));
		}
	}
}, ab = { class: "overtime-summary" }, ob = { class: "kpi-card kpi-card--main" }, sb = { class: "kpi-card__head" }, cb = { class: "kpi-lab" }, lb = { class: "kpi-pm" }, ub = { class: "kpi-num" }, db = { class: "kpi-pct" }, fb = { class: "kpi-bar" }, pb = { class: "kpi-bf" }, mb = {
	key: 0,
	class: "kpi-card"
}, hb = { class: "kpi-lab" }, gb = { class: "kpi-num pos" }, _b = {
	key: 0,
	class: "kpi-sub"
}, vb = { class: "kpi-card" }, yb = { class: "kpi-lab" }, bb = { class: "kpi-sub" }, xb = {
	key: 0,
	class: "overtime-details"
}, Sb = { class: "overtime-details__section" }, Cb = { class: "detail-row" }, wb = { class: "detail-value" }, Tb = {
	key: 0,
	class: "detail-row info"
}, Eb = {
	key: 1,
	class: "detail-row subtract"
}, Db = { class: "detail-value" }, Ob = { class: "detail-row detail-row--total" }, kb = { class: "detail-value" }, Ab = { class: "overtime-details__section" }, jb = { class: "detail-row" }, Mb = { class: "detail-value" }, Nb = {
	key: 0,
	class: "detail-row add"
}, Pb = { class: "detail-value" }, Fb = {
	key: 1,
	class: "detail-row info"
}, Ib = { class: "detail-row detail-row--total" }, Lb = { class: "detail-value" };
function Rb(e, r, i, a, o, s) {
	let c = P("ChevronUp"), l = P("ChevronDown"), u = P("NcButton"), d = P("InfoIcon");
	return J(), H("div", ab, [
		n("div", { class: G(["kpi-cards", { "kpi-cards--two": i.vacationTotal === null }]) }, [
			n("div", ob, [
				n("div", sb, [
					n("span", cb, U(s.headLabel), 1),
					r[1] ||= z(),
					i.statistics && i.period === "month" ? (J(), L(u, {
						key: 0,
						variant: "tertiary",
						"aria-label": e.t("worktime", "Berechnung anzeigen"),
						onClick: r[0] ||= (e) => o.showDetails = !o.showDetails
					}, {
						icon: A(() => [o.showDetails ? (J(), L(c, {
							key: 0,
							size: 20
						})) : (J(), L(l, {
							key: 1,
							size: 20
						}))]),
						_: 1
					}, 8, ["aria-label"])) : K("", !0)
				]),
				r[4] ||= z(),
				n("div", lb, [
					n("span", ub, [z(U(s.hoursLabel(i.actualMinutes)) + " h ", 1), n("small", null, "/ " + U(e.t("worktime", "{hours} h Soll", { hours: s.hoursLabel(s.periodSoll) })), 1)]),
					r[2] ||= z(),
					n("span", db, U(s.percent) + " %", 1)
				]),
				r[5] ||= z(),
				n("div", fb, [n("span", { style: Pe({ width: s.barWidth + "%" }) }, null, 4)]),
				r[6] ||= z(),
				n("div", pb, [
					n("span", null, U(s.remainingLabel), 1),
					r[3] ||= z(),
					n("span", { class: G(s.pacingPositive ? "pos" : "neg") }, U(s.pacingLabel), 3)
				])
			]),
			r[12] ||= z(),
			i.vacationTotal === null ? K("", !0) : (J(), H("div", mb, [
				n("div", hb, U(e.t("worktime", "Urlaub {year}", { year: i.year })), 1),
				r[7] ||= z(),
				n("div", gb, [z(U(i.vacationRemaining ?? 0) + " ", 1), n("small", null, "/ " + U(i.vacationTotal) + " " + U(e.t("worktime", "Tage übrig")), 1)]),
				r[8] ||= z(),
				s.vacationSub ? (J(), H("div", _b, U(s.vacationSub), 1)) : K("", !0)
			])),
			r[13] ||= z(),
			n("div", vb, [
				n("div", yb, [z(U(s.displayOvertime >= 0 ? e.t("worktime", "Überstunden") : e.t("worktime", "Minusstunden")) + " ", 1), I(d, null, {
					default: A(() => [z(U(e.t("worktime", "Das Soll wird anteilig bis gestern berechnet. Der heutige Tag zählt erst mit, sobald du Zeit erfasst.")), 1)]),
					_: 1
				})]),
				r[10] ||= z(),
				n("div", { class: G(["kpi-num", {
					pos: s.displayOvertime > 0,
					neg: s.displayOvertime < 0
				}]) }, [z(U(s.displayOvertime > 0 ? "+" : "") + U(s.absHoursLabel(s.displayOvertime)) + " ", 1), r[9] ||= n("small", null, "h", -1)], 2),
				r[11] ||= z(),
				n("div", bb, U(s.overtimeSubLabel), 1)
			])
		], 2),
		r[33] ||= z(),
		o.showDetails && i.statistics ? (J(), H("div", xb, [
			n("div", Sb, [
				n("h4", null, U(e.t("worktime", "Soll-Berechnung")), 1),
				r[19] ||= z(),
				n("div", Cb, [
					n("span", null, U(e.t("worktime", "Arbeitstage ({count})", { count: s.dayCount(i.statistics.workingDays) })), 1),
					r[14] ||= z(),
					n("span", wb, U(s.formatMinutes(i.statistics.monthlyTargetMinutes)), 1)
				]),
				r[20] ||= z(),
				i.statistics.holidayCount > 0 ? (J(), H("div", Tb, [
					n("span", null, U(e.t("worktime", "davon Feiertage ({count})", { count: s.dayCount(i.statistics.holidayCount) })), 1),
					r[15] ||= z(),
					r[16] ||= n("span", { class: "detail-value" }, null, -1)
				])) : K("", !0),
				r[21] ||= z(),
				i.statistics.targetReductionDays > 0 ? (J(), H("div", Eb, [
					n("span", null, U(e.t("worktime", "Soll-Reduktion ({count} Tage)", { count: i.statistics.targetReductionDays })), 1),
					r[17] ||= z(),
					n("span", Db, "-" + U(s.formatMinutes(i.statistics.monthlyTargetMinutes - i.statistics.targetMinutes)), 1)
				])) : K("", !0),
				r[22] ||= z(),
				n("div", Ob, [
					n("span", null, U(e.t("worktime", "Soll (anteilig bis heute)")), 1),
					r[18] ||= z(),
					n("span", kb, U(s.formatMinutes(i.targetMinutes)), 1)
				])
			]),
			r[32] ||= z(),
			n("div", Ab, [
				n("h4", null, U(e.t("worktime", "Ist-Berechnung")), 1),
				r[28] ||= z(),
				n("div", jb, [
					n("span", null, U(e.t("worktime", "Geleistete Arbeitszeit")), 1),
					r[23] ||= z(),
					n("span", Mb, U(s.formatMinutes(i.statistics.workedMinutes)), 1)
				]),
				r[29] ||= z(),
				i.statistics.paidAbsenceMinutes > 0 ? (J(), H("div", Nb, [
					n("span", null, U(e.t("worktime", "Bezahlte Abwesenheiten ({count} Tage)", { count: i.statistics.paidAbsenceDays })), 1),
					r[24] ||= z(),
					n("span", Pb, "+" + U(s.formatMinutes(i.statistics.paidAbsenceMinutes)), 1)
				])) : K("", !0),
				r[30] ||= z(),
				i.statistics.compensatoryDays > 0 ? (J(), H("div", Fb, [
					n("span", null, [z(U(e.t("worktime", "Freizeitausgleich ({count} Tage, nicht gutgeschrieben)", { count: i.statistics.compensatoryDays })) + " ", 1), I(d, null, {
						default: A(() => [z(U(e.t("worktime", "Freizeitausgleich wird nicht als Arbeitszeit gutgeschrieben. Das Soll bleibt bestehen, dadurch sinken die Überstunden.")), 1)]),
						_: 1
					})]),
					r[25] ||= z(),
					r[26] ||= n("span", { class: "detail-value" }, null, -1)
				])) : K("", !0),
				r[31] ||= z(),
				n("div", Ib, [
					n("span", null, U(e.t("worktime", "Ist")), 1),
					r[27] ||= z(),
					n("span", Lb, U(s.formatMinutes(i.actualMinutes)), 1)
				])
			])
		])) : K("", !0)
	]);
}
var zb = /*#__PURE__*/ Y(ib, [["render", Rb], ["__scopeId", "data-v-e3f1177e"]]), Bb = {
	name: "YearOverviewTable",
	components: { InfoIcon: sv },
	props: {
		months: {
			type: Array,
			default: () => []
		},
		year: {
			type: Number,
			required: !0
		},
		carryoverMinutes: {
			type: Number,
			default: 0
		}
	},
	emits: ["select-month"],
	computed: {
		currentYear() {
			return Zv();
		},
		currentMonth() {
			return Qv();
		},
		allMonths() {
			let e = [];
			for (let n = 1; n <= 12; n++) {
				let r = this.months.find((e) => e.month === n);
				e.push(r || {
					month: n,
					targetMinutes: 0,
					actualMinutes: 0,
					overtimeMinutes: 0
				});
			}
			return e;
		},
		isEmpty() {
			return this.year >= this.currentYear ? !1 : this.months.every((e) => (e.actualMinutes || 0) === 0);
		},
		pastMonths() {
			return this.allMonths.filter((e) => !this.isFutureMonth(e.month));
		},
		totalTarget() {
			return this.pastMonths.reduce((e, n) => e + (n.targetMinutes || 0), 0);
		},
		totalActual() {
			return this.pastMonths.reduce((e, n) => e + (n.actualMinutes || 0), 0);
		},
		totalOvertime() {
			return this.pastMonths.reduce((e, n) => e + (n.overtimeMinutes || 0), 0);
		}
	},
	methods: {
		getMonthName(e) {
			return Jv(e);
		},
		isCurrentMonth(e) {
			return this.year === this.currentYear && e === this.currentMonth;
		},
		isFutureMonth(e) {
			return this.year < this.currentYear ? !1 : this.year > this.currentYear || e > this.currentMonth;
		},
		onMonthClick(e) {
			this.isFutureMonth(e) || this.$emit("select-month", e);
		},
		formatMin(e) {
			return py(e || 0);
		},
		formatOvertime(e) {
			return e ? (e > 0 ? "+" : "") + py(e) : py(0);
		},
		overtimeClass(e) {
			return e > 0 ? "positive" : e < 0 ? "negative" : "";
		}
	}
}, Vb = { class: "year-overview-card" }, Hb = {
	key: 0,
	class: "empty-year"
}, Ub = {
	key: 1,
	class: "year-table"
}, Wb = { class: "text-right" }, Gb = { class: "text-right" }, Kb = { class: "text-right" }, qb = [
	"tabindex",
	"role",
	"onClick",
	"onKeydown"
], Jb = { class: "m-cell" }, Yb = { class: "m-name" }, Xb = {
	key: 0,
	class: "now-pill"
}, Zb = { class: "text-right num" }, Qb = { class: "text-right num" }, $b = { class: "text-right num" }, ex = {
	key: 0,
	class: "carryover-row"
}, tx = { class: "text-right num" }, nx = { class: "total-row" }, rx = { class: "text-right num" }, ix = { class: "text-right num" }, ax = { class: "text-right num" }, ox = { class: "year-foot-note" };
function sx(e, r, i, a, o, s) {
	let c = P("InfoIcon");
	return J(), H("div", Vb, [
		s.isEmpty ? (J(), H("p", Hb, U(e.t("worktime", "Keine Daten für dieses Jahr vorhanden.")), 1)) : (J(), H("table", Ub, [
			n("thead", null, [n("tr", null, [
				n("th", null, U(e.t("worktime", "Monat")), 1),
				r[0] ||= z(),
				n("th", Wb, U(e.t("worktime", "Soll")), 1),
				r[1] ||= z(),
				n("th", Gb, U(e.t("worktime", "Ist")), 1),
				r[2] ||= z(),
				n("th", Kb, [z(U(e.t("worktime", "Überstunden")) + " ", 1), I(c, null, {
					default: A(() => [z(U(e.t("worktime", "Differenz zwischen Soll und Ist. Im laufenden Monat kann sich der Wert noch ändern.")), 1)]),
					_: 1
				})])
			])]),
			r[16] ||= z(),
			n("tbody", null, [(J(!0), H(F, null, u(s.allMonths, (i) => (J(), H("tr", {
				key: i.month,
				class: G({
					now: s.isCurrentMonth(i.month),
					future: s.isFutureMonth(i.month),
					clickable: !s.isFutureMonth(i.month)
				}),
				tabindex: s.isFutureMonth(i.month) ? -1 : 0,
				role: s.isFutureMonth(i.month) ? null : "button",
				onClick: (e) => s.onMonthClick(i.month),
				onKeydown: [vt((e) => s.onMonthClick(i.month), ["enter"]), vt(D((e) => s.onMonthClick(i.month), ["prevent"]), ["space"])]
			}, [
				n("td", Jb, [
					n("span", Yb, U(s.getMonthName(i.month)), 1),
					r[3] ||= z(),
					s.isCurrentMonth(i.month) ? (J(), H("span", Xb, U(e.t("worktime", "Jetzt")), 1)) : K("", !0)
				]),
				r[4] ||= z(),
				n("td", Zb, [s.isFutureMonth(i.month) ? (J(), H(F, { key: 1 }, [z("–")], 64)) : (J(), H(F, { key: 0 }, [z(U(s.formatMin(i.targetMinutes)), 1)], 64))]),
				r[5] ||= z(),
				n("td", Qb, [s.isFutureMonth(i.month) ? (J(), H(F, { key: 1 }, [z("–")], 64)) : (J(), H(F, { key: 0 }, [z(U(s.formatMin(i.actualMinutes)), 1)], 64))]),
				r[6] ||= z(),
				n("td", $b, [s.isFutureMonth(i.month) ? (J(), H(F, { key: 1 }, [z("–")], 64)) : (J(), H("span", {
					key: 0,
					class: G(s.overtimeClass(i.overtimeMinutes))
				}, U(s.formatOvertime(i.overtimeMinutes)), 3))])
			], 42, qb))), 128))]),
			r[17] ||= z(),
			n("tfoot", null, [
				i.carryoverMinutes === 0 ? K("", !0) : (J(), H("tr", ex, [
					n("td", null, U(e.t("worktime", "Übertrag Vorjahr")), 1),
					r[7] ||= z(),
					r[8] ||= n("td", null, null, -1),
					r[9] ||= z(),
					r[10] ||= n("td", null, null, -1),
					r[11] ||= z(),
					n("td", tx, [n("span", { class: G(s.overtimeClass(i.carryoverMinutes)) }, U(s.formatOvertime(i.carryoverMinutes)), 3)])
				])),
				r[15] ||= z(),
				n("tr", nx, [
					n("td", null, U(e.t("worktime", "Gesamt bis heute")), 1),
					r[12] ||= z(),
					n("td", rx, U(s.formatMin(s.totalTarget)), 1),
					r[13] ||= z(),
					n("td", ix, U(s.formatMin(s.totalActual)), 1),
					r[14] ||= z(),
					n("td", ax, [n("span", { class: G(s.overtimeClass(s.totalOvertime + i.carryoverMinutes)) }, U(s.formatOvertime(s.totalOvertime + i.carryoverMinutes)), 3)])
				])
			])
		])),
		r[18] ||= z(),
		n("div", ox, U(e.t("worktime", "Klick auf einen Monat öffnet ihn in der Liste-Ansicht.")), 1)
	]);
}
var cx = /*#__PURE__*/ Y(Bb, [["render", sx], ["__scopeId", "data-v-2bfc97e0"]]), lx = {
	name: "DayList",
	props: {
		days: {
			type: Array,
			default: () => []
		},
		selectedDate: {
			type: String,
			default: null
		},
		month: {
			type: Number,
			default: null
		},
		projects: {
			type: Array,
			default: () => []
		}
	},
	emits: ["select"],
	computed: { monthShort() {
		return this.month ? Yv(this.month) : "";
	} },
	methods: {
		projectName(e) {
			if (!e || !e.projectId) return "";
			if (e.projectName) return e.projectName;
			let n = this.projects.find((n) => n.id === e.projectId);
			return n?.displayName || n?.name || "";
		},
		entryLines(e) {
			return (e.entries || []).map((e) => {
				let n = [this.projectName(e), (e.description || "").trim()].filter(Boolean).join(" · ");
				return {
					id: e.id,
					text: n
				};
			}).filter((e) => e.text);
		},
		pad(e) {
			return e < 10 ? "0" + e : "" + e;
		},
		weekday(e) {
			return Xv(e.dayOfWeek);
		},
		isWeekStart(e) {
			return e.dayOfWeek === 1;
		},
		absenceColorClass: Sy,
		pauseLabel(e) {
			if (!e.entries.length) return "";
			let n = e.entries.reduce((e, n) => e + (n.breakMinutes || 0), 0);
			return this.t("worktime", "{min} Min", { min: n });
		},
		scrollToDate(e, n = !1) {
			let r = this.$el.querySelectorAll(".dl-day"), i = this.days.findIndex((n) => n.date === e), a = r[iy(i)];
			if (!a) return;
			let o = oy(this.$el), s = o ? o.getBoundingClientRect() : {
				top: 0,
				bottom: window.innerHeight
			};
			ay(r[i].getBoundingClientRect(), s) || a.scrollIntoView({
				block: "start",
				behavior: n ? "smooth" : "auto"
			});
		},
		hoursLabel(e) {
			let n = e.creditMinutes || 0;
			return !e.entries.length && !n ? "–" : `${fy(e.totalMinutes + n)} h`;
		},
		creditNote(e) {
			return !e.entries.length || !e.creditMinutes || !e.absence ? "" : this.t("worktime", "davon {hours} h {type}", {
				hours: fy(e.creditMinutes),
				type: e.absence.typeName
			});
		}
	}
}, ux = { class: "day-list" }, dx = { class: "dl-head" }, fx = { class: "dl-r" }, px = { class: "dl-r" }, mx = ["onClick", "onKeydown"], hx = { class: "dl-d" }, gx = {
	key: 0,
	class: "today-badge"
}, _x = { class: "dl-mid" }, vx = { class: "dl-mid-top" }, yx = { class: "dl-times" }, bx = {
	key: 1,
	class: "dl-count"
}, xx = {
	key: 1,
	class: "dl-tag"
}, Sx = {
	key: 2,
	class: "dl-tag"
}, Cx = {
	key: 3,
	class: "dl-mut"
}, wx = {
	key: 0,
	class: "dl-entries"
}, Tx = { class: "dl-r dl-pause" }, Ex = {
	key: 0,
	class: "dl-credit"
};
function Dx(e, r, i, a, o, s) {
	return J(), H("div", ux, [
		n("div", dx, [
			n("div", null, U(e.t("worktime", "Tag")), 1),
			r[0] ||= z(),
			n("div", null, U(e.t("worktime", "Zeiten")), 1),
			r[1] ||= z(),
			n("div", fx, U(e.t("worktime", "Pause")), 1),
			r[2] ||= z(),
			n("div", px, U(e.t("worktime", "Stunden")), 1)
		]),
		r[12] ||= z(),
		n("div", null, [(J(!0), H(F, null, u(i.days, (a) => (J(), H("div", {
			key: a.date,
			class: G(["dl-day", {
				sel: a.date === i.selectedDate,
				weekend: a.isWeekend,
				empty: !a.entries.length,
				today: a.isToday,
				weekstart: s.isWeekStart(a)
			}]),
			tabindex: "0",
			role: "button",
			onClick: (n) => e.$emit("select", a.date),
			onKeydown: [vt((n) => e.$emit("select", a.date), ["enter"]), vt(D((n) => e.$emit("select", a.date), ["prevent"]), ["space"])]
		}, [
			n("div", hx, [
				n("span", null, U(s.weekday(a)) + " " + U(s.pad(a.day)) + ".", 1),
				r[3] ||= z(),
				a.isToday ? (J(), H("span", gx, U(e.t("worktime", "Heute")), 1)) : K("", !0),
				r[4] ||= z(),
				n("small", null, U(s.monthShort), 1)
			]),
			r[9] ||= z(),
			n("div", _x, [
				n("div", vx, [a.entries.length ? (J(), H(F, { key: 0 }, [
					a.holiday || a.absence ? (J(), H("span", {
						key: 0,
						class: G(["dot", a.holiday ? "holiday" : s.absenceColorClass(a.absence.type)])
					}, null, 2)) : K("", !0),
					r[5] ||= z(),
					n("span", yx, U(a.firstStart) + " – " + U(a.lastEnd), 1),
					r[6] ||= z(),
					a.entries.length > 1 ? (J(), H("span", bx, U(e.t("worktime", "{n} Einträge", { n: a.entries.length })), 1)) : K("", !0)
				], 64)) : a.holiday ? (J(), H("span", xx, [r[7] ||= n("span", { class: "dot holiday" }, null, -1), z(" " + U(a.holiday.name), 1)])) : a.absence ? (J(), H("span", Sx, [n("span", { class: G(["dot", s.absenceColorClass(a.absence.type)]) }, null, 2), z(" " + U(a.absence.typeName), 1)])) : (J(), H("span", Cx, "–"))]),
				r[8] ||= z(),
				s.entryLines(a).length ? (J(), H("div", wx, [(J(!0), H(F, null, u(s.entryLines(a), (e) => (J(), H("div", {
					key: e.id,
					class: "dl-entry-line"
				}, U(e.text), 1))), 128))])) : K("", !0)
			]),
			r[10] ||= z(),
			n("div", Tx, U(s.pauseLabel(a)), 1),
			r[11] ||= z(),
			n("div", { class: G(["dl-r dl-hh", { "dl-mut": !a.entries.length }]) }, [z(U(s.hoursLabel(a)) + " ", 1), s.creditNote(a) ? (J(), H("div", Ex, U(s.creditNote(a)), 1)) : K("", !0)], 2)
		], 42, mx))), 128))])
	]);
}
var Ox = /*#__PURE__*/ Y(lx, [["render", Dx], ["__scopeId", "data-v-deb4b5ea"]]), kx = {
	name: "MonthCalendar",
	props: {
		days: {
			type: Array,
			default: () => []
		},
		year: {
			type: Number,
			required: !0
		},
		month: {
			type: Number,
			required: !0
		},
		selectedDate: {
			type: String,
			default: null
		}
	},
	emits: ["select"],
	computed: {
		dayNames() {
			return [
				this.t("worktime", "Mo"),
				this.t("worktime", "Di"),
				this.t("worktime", "Mi"),
				this.t("worktime", "Do"),
				this.t("worktime", "Fr"),
				this.t("worktime", "Sa"),
				this.t("worktime", "So")
			];
		},
		cells() {
			let e = [], n = (new Date(this.year, this.month - 1, 1).getDay() + 6) % 7, r = this.month === 1 ? 12 : this.month - 1, i = ty(this.month === 1 ? this.year - 1 : this.year, r);
			for (let r = n - 1; r >= 0; r--) e.push({
				num: i - r,
				out: !0,
				clickable: !1
			});
			for (let n of this.days) e.push({
				num: n.day,
				day: n,
				clickable: !0
			});
			for (; e.length % 7 != 0;) e.push({
				num: e.length % 7,
				out: !0,
				clickable: !1,
				trailing: !0
			});
			let a = 1;
			for (let n of e) n.trailing && (n.num = a++);
			return e;
		}
	},
	methods: {
		hoursLabel(e) {
			return fy(e.totalMinutes + (e.creditMinutes || 0));
		},
		shortName(e) {
			return e.length > 11 ? e.slice(0, 9) + "." : e;
		},
		absenceColorClass: Sy,
		absMiClass(e) {
			return Sy(e);
		},
		cellClasses(e) {
			if (e.out) return "out";
			let n = [];
			return e.day.isWeekend && n.push("we"), e.day.isToday && n.push("today"), e.day.date === this.selectedDate && n.push("sel"), n;
		},
		onCellClick(e) {
			e.clickable && e.day && this.$emit("select", e.day.date);
		}
	}
}, Ax = { class: "month-cal card" }, jx = { class: "cal-grid cal-dow" }, Mx = { class: "cal-grid" }, Nx = [
	"tabindex",
	"role",
	"onClick",
	"onKeydown"
], Px = { class: "n" }, Fx = {
	key: 0,
	class: "mi h"
}, Ix = {
	key: 2,
	class: "hh"
}, Lx = { class: "leg" };
function Rx(e, r, i, a, o, s) {
	return J(), H("div", Ax, [
		n("div", jx, [(J(!0), H(F, null, u(s.dayNames, (e) => (J(), H("div", {
			key: e,
			class: "dow"
		}, U(e), 1))), 128))]),
		r[9] ||= z(),
		n("div", Mx, [(J(!0), H(F, null, u(s.cells, (e, i) => (J(), H("div", {
			key: i,
			class: G(["cell", s.cellClasses(e)]),
			tabindex: e.clickable ? 0 : -1,
			role: e.clickable ? "button" : null,
			onClick: (n) => s.onCellClick(e),
			onKeydown: [vt((n) => s.onCellClick(e), ["enter"]), vt(D((n) => s.onCellClick(e), ["prevent"]), ["space"])]
		}, [
			n("div", Px, U(e.num), 1),
			r[1] ||= z(),
			e.day ? (J(), H(F, { key: 0 }, [e.day.holiday ? (J(), H("div", Fx, U(s.shortName(e.day.holiday.name)), 1)) : e.day.absence ? (J(), H(F, { key: 1 }, [
				n("div", { class: G(["mi", s.absMiClass(e.day.absence.type)]) }, U(e.day.absence.typeName), 3),
				r[0] ||= z(),
				e.day.entries.length || e.day.creditMinutes ? (J(), H("div", {
					key: 0,
					class: G(["hh", { mut: !e.day.entries.length }])
				}, U(s.hoursLabel(e.day)), 3)) : K("", !0)
			], 64)) : e.day.entries.length ? (J(), H("div", Ix, U(s.hoursLabel(e.day)), 1)) : K("", !0)], 64)) : K("", !0)
		], 42, Nx))), 128))]),
		r[10] ||= z(),
		n("div", Lx, [
			n("span", null, [r[2] ||= n("span", { class: "dot vacation" }, null, -1), z(" " + U(e.t("worktime", "Urlaub")), 1)]),
			r[6] ||= z(),
			n("span", null, [r[3] ||= n("span", { class: "dot holiday" }, null, -1), z(" " + U(e.t("worktime", "Feiertag")), 1)]),
			r[7] ||= z(),
			n("span", null, [r[4] ||= n("span", { class: "dot sick" }, null, -1), z(" " + U(e.t("worktime", "Krank")), 1)]),
			r[8] ||= z(),
			n("span", null, [r[5] ||= n("span", { class: "dot other" }, null, -1), z(" " + U(e.t("worktime", "Erfasst")), 1)])
		])
	]);
}
var zx = /*#__PURE__*/ Y(kx, [["render", Rx], ["__scopeId", "data-v-abf06c1d"]]), Bx = {
	name: "PlusIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Vx = ["aria-hidden", "aria-label"], Hx = [
	"fill",
	"width",
	"height"
], Ux = { key: 0 };
function Wx(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon plus-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Ux, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" }, null, -1)
	], 8, Hx))], 16, Vx);
}
var Gx = /*#__PURE__*/ Y(Bx, [["render", Wx]]), Kx = {
	name: "PencilIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, qx = ["aria-hidden", "aria-label"], Jx = [
	"fill",
	"width",
	"height"
], Yx = { key: 0 };
function Xx(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon pencil-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Yx, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" }, null, -1)
	], 8, Jx))], 16, qx);
}
var Zx = /*#__PURE__*/ Y(Kx, [["render", Xx]]), Qx = {
	name: "DeleteIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, $x = ["aria-hidden", "aria-label"], eS = [
	"fill",
	"width",
	"height"
], tS = { key: 0 };
function nS(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon delete-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", tS, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" }, null, -1)
	], 8, eS))], 16, $x);
}
var rS = /*#__PURE__*/ Y(Qx, [["render", nS]]), iS = {
	name: "CalendarStarIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, aS = ["aria-hidden", "aria-label"], oS = [
	"fill",
	"width",
	"height"
], sS = { key: 0 };
function cS(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-star-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", sS, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z" }, null, -1)
	], 8, oS))], 16, aS);
}
var lS = /*#__PURE__*/ Y(iS, [["render", cS]]), uS = {
	name: "StarOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, dS = ["aria-hidden", "aria-label"], fS = [
	"fill",
	"width",
	"height"
], pS = { key: 0 };
function mS(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon star-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", pS, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" }, null, -1)
	], 8, fS))], 16, dS);
}
var hS = /*#__PURE__*/ Y(uS, [["render", mS]]), gS = {
	name: "ProjectSelect",
	emits: ["loaded", "update:modelValue"],
	components: {
		NcSelect: Xt,
		Star: zs,
		StarOutline: hS
	},
	props: {
		modelValue: {
			type: Number,
			default: null
		},
		inputId: {
			type: String,
			default: void 0
		},
		placeholder: {
			type: String,
			default: ""
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		clearable: {
			type: Boolean,
			default: !0
		},
		hasError: {
			type: Boolean,
			default: !1
		}
	},
	data() {
		return {
			options: [],
			selected: null,
			loading: !1,
			searchTimer: null,
			pendingFavoriteIds: /* @__PURE__ */ new Set()
		};
	},
	watch: { modelValue() {
		this.syncSelected();
	} },
	async created() {
		await this.loadInitial(), this.syncSelected();
	},
	beforeUnmount() {
		clearTimeout(this.searchTimer);
	},
	methods: {
		toOption(e) {
			return {
				id: e.id,
				label: e.displayName || e.name,
				isFavorite: e.isFavorite === !0
			};
		},
		sortFavoritesFirst(e) {
			return [...e].sort((e, n) => (n.isFavorite === !0) - (e.isFavorite === !0));
		},
		async loadInitial() {
			this.loading = !0;
			try {
				let e = await bv.search("", 20) || [];
				this.options = this.sortFavoritesFirst(e.map(this.toOption)), this.$emit("loaded", this.options.length);
			} catch (e) {
				console.error("Failed to load projects:", e), this.options = [];
			} finally {
				this.loading = !1;
			}
		},
		onSearch(e) {
			clearTimeout(this.searchTimer), this.searchTimer = setTimeout(async () => {
				this.loading = !0;
				try {
					let n = await bv.search(e || "", 20) || [], r = this.sortFavoritesFirst(n.map(this.toOption));
					this.selected && !r.some((e) => e.id === this.selected.id) && (r = [this.selected, ...r]), this.options = r;
				} catch (e) {
					console.error("Failed to search projects:", e);
				} finally {
					this.loading = !1;
				}
			}, 250);
		},
		onInput(e) {
			this.selected = e || null, this.$emit("update:modelValue", e ? e.id : null);
		},
		async toggleFavorite(e) {
			if (this.pendingFavoriteIds.has(e.id)) return;
			this.pendingFavoriteIds.add(e.id);
			let n = !e.isFavorite;
			try {
				n ? await bv.addFavorite(e.id) : await bv.removeFavorite(e.id), this.options = this.options.map((r) => r.id === e.id ? {
					...r,
					isFavorite: n
				} : r), this.selected && this.selected.id === e.id && (this.selected = {
					...this.selected,
					isFavorite: n
				});
			} catch (e) {
				console.error("Failed to toggle project favorite:", e);
			} finally {
				this.pendingFavoriteIds.delete(e.id);
			}
		},
		async syncSelected() {
			let e = this.modelValue;
			if (!e) {
				this.selected = null;
				return;
			}
			if (this.selected && this.selected.id === e) return;
			let n = this.options.find((n) => n.id === e);
			if (n) this.selected = n;
			else try {
				let n = await bv.getById(e);
				n && n.id && (this.selected = this.toOption(n), this.options.some((e) => e.id === n.id) || (this.options = [this.selected, ...this.options]));
			} catch (n) {
				console.error("Failed to load project " + e + ":", n), this.selected = {
					id: e,
					label: "#" + e
				};
			}
		}
	}
}, _S = { class: "project-option" }, vS = { class: "project-option__label" }, yS = [
	"aria-label",
	"title",
	"onClick"
];
function bS(e, r, i, a, o, s) {
	let c = P("Star"), l = P("StarOutline"), u = P("NcSelect");
	return J(), L(u, {
		"label-outside": "",
		"aria-label-combobox": i.placeholder || e.t("worktime", "Projekt auswählen"),
		"input-id": i.inputId,
		"model-value": o.selected,
		options: o.options,
		loading: o.loading,
		placeholder: i.placeholder || e.t("worktime", "Projekt auswählen"),
		filterable: !1,
		clearable: i.clearable,
		disabled: i.disabled,
		label: "label",
		class: G({ "input-error": i.hasError }),
		onSearch: s.onSearch,
		"onUpdate:modelValue": s.onInput
	}, {
		option: A((i) => [n("span", _S, [
			n("span", vS, U(i.label), 1),
			r[1] ||= z(),
			n("button", {
				type: "button",
				class: G(["project-option__star", { "is-favorite": i.isFavorite }]),
				"aria-label": i.isFavorite ? e.t("worktime", "Aus Favoriten entfernen") : e.t("worktime", "Zu Favoriten hinzufügen"),
				title: i.isFavorite ? e.t("worktime", "Aus Favoriten entfernen") : e.t("worktime", "Zu Favoriten hinzufügen"),
				onMousedown: r[0] ||= D(() => {}, ["stop", "prevent"]),
				onClick: D((e) => s.toggleFavorite(i), ["stop", "prevent"])
			}, [i.isFavorite ? (J(), L(c, {
				key: 0,
				size: 18
			})) : (J(), L(l, {
				key: 1,
				size: 18
			}))], 42, yS)
		])]),
		_: 1
	}, 8, [
		"aria-label-combobox",
		"input-id",
		"model-value",
		"options",
		"loading",
		"placeholder",
		"clearable",
		"disabled",
		"class",
		"onSearch",
		"onUpdate:modelValue"
	]);
}
var xS = /*#__PURE__*/ Y(gS, [["render", bS], ["__scopeId", "data-v-994a2e56"]]), SS = {
	name: "CorrectionReasonModal",
	components: {
		NcModal: Kt,
		NcButton: Ye
	},
	emits: ["confirm", "close"],
	data() {
		return { reason: "" };
	},
	mounted() {
		this.$nextTick(() => this.$refs.textarea?.focus());
	},
	methods: { confirm() {
		let e = this.reason.trim();
		e.length >= 10 && this.$emit("confirm", e);
	} }
}, CS = { class: "correction-reason" }, wS = { id: "wt-correction-reason-title" }, TS = { class: "correction-reason__hint" }, ES = { class: "form-group" }, DS = { for: "correction-reason-text" }, OS = ["placeholder"], kS = { class: "form-actions" };
function AS(e, r, i, a, o, s) {
	let c = P("NcButton"), l = P("NcModal");
	return J(), L(l, {
		"label-id": "wt-correction-reason-title",
		onClose: r[2] ||= (n) => e.$emit("close")
	}, {
		default: A(() => [n("div", CS, [
			n("h3", wS, U(e.t("worktime", "Begründung für die Korrektur")), 1),
			r[6] ||= z(),
			n("p", TS, U(e.t("worktime", "Die Änderung wird protokolliert. In abgeschlossenen Monaten ist eine Begründung Pflicht; der Monat wird danach zur erneuten Genehmigung geöffnet.")), 1),
			r[7] ||= z(),
			n("div", ES, [
				n("label", DS, U(e.t("worktime", "Begründung (mindestens 10 Zeichen)")), 1),
				r[3] ||= z(),
				N(n("textarea", {
					id: "correction-reason-text",
					ref: "textarea",
					"onUpdate:modelValue": r[0] ||= (e) => o.reason = e,
					rows: "3",
					class: "input-field",
					placeholder: e.t("worktime", "z. B. Stempelfehler nach Rücksprache mit der Mitarbeiterin korrigiert")
				}, null, 8, OS), [[y, o.reason]]),
				r[4] ||= z(),
				n("div", { class: G(["charcount", { bad: o.reason.trim().length > 0 && o.reason.trim().length < 10 }]) }, U(o.reason.trim().length) + " / 10\n				", 3)
			]),
			r[8] ||= z(),
			n("div", kS, [
				I(c, {
					variant: "tertiary",
					onClick: r[1] ||= (n) => e.$emit("close")
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}),
				r[5] ||= z(),
				I(c, {
					variant: "primary",
					disabled: o.reason.trim().length < 10,
					onClick: s.confirm
				}, {
					default: A(() => [z(U(e.t("worktime", "Korrektur speichern")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])
			])
		])]),
		_: 1
	});
}
var jS = /*#__PURE__*/ Y(SS, [["render", AS], ["__scopeId", "data-v-d5d26aa1"]]), MS = {
	name: "TimeEntryForm",
	emits: ["cancel", "saved"],
	components: {
		InfoIcon: sv,
		ProjectSelect: xS,
		NcButton: Ye,
		NcDateTimePicker: z_,
		NcCheckboxRadioSwitch: tt,
		CorrectionReasonModal: jS
	},
	props: {
		entry: {
			type: Object,
			default: null
		},
		presetDate: {
			type: [String, Date],
			default: null
		},
		embedded: {
			type: Boolean,
			default: !1
		},
		prefillStart: {
			type: String,
			default: null
		},
		prefillEnd: {
			type: String,
			default: null
		},
		emergencyEligible: {
			type: Boolean,
			default: !1
		}
	},
	data() {
		return {
			break6h: 30,
			break9h: 45,
			form: {
				date: /* @__PURE__ */ new Date(),
				startTime: "08:00",
				endTime: "17:00",
				breakMinutes: 30,
				projectId: null,
				description: "",
				isEmergency: !1
			},
			showReasonModal: !1,
			pendingData: null,
			hasProjects: !1
		};
	},
	computed: {
		...Tr(qo, [
			"isCorrectionMode",
			"requireProject",
			"requireDescription"
		]),
		...Tr($o, ["currentEmployee"]),
		requiredBreak() {
			return !this.form.startTime || !this.form.endTime ? 0 : gy(hy(this.form.startTime, this.form.endTime, 0), this.break6h, this.break9h);
		},
		isEdit() {
			return !!this.entry;
		},
		calculatedWorkMinutes() {
			return !this.form.startTime || !this.form.endTime ? 0 : hy(this.form.startTime, this.form.endTime, this.form.breakMinutes);
		},
		projectRequired() {
			return this.requireProject && this.hasProjects;
		},
		projectMissing() {
			return this.projectRequired && !this.form.projectId;
		},
		descriptionRequired() {
			return this.requireDescription || this.emergencyEligible && this.form.isEmergency;
		},
		descriptionMissing() {
			return this.descriptionRequired && !(this.form.description && this.form.description.trim());
		},
		isValid() {
			return this.form.date && this.form.startTime && this.form.endTime && this.calculatedWorkMinutes > 0 && !this.projectMissing && !this.descriptionMissing;
		}
	},
	watch: {
		entry: {
			immediate: !0,
			handler(e) {
				e ? this.form = {
					date: new Date(e.date),
					startTime: e.startTime,
					endTime: e.endTime,
					breakMinutes: e.breakMinutes,
					projectId: e.projectId,
					description: e.description || "",
					isEmergency: e.isEmergency || !1
				} : this.resetForm();
			}
		},
		currentEmployee: { handler(e) {
			!this.entry && e && this.resetForm();
		} }
	},
	async created() {
		try {
			let [e, n] = await Promise.all([Ko.get("min_break_minutes_6h"), Ko.get("min_break_minutes_9h")]);
			e !== void 0 && (this.break6h = parseInt(e, 10)), n !== void 0 && (this.break9h = parseInt(n, 10)), this.isEdit || this.onTimeChange();
		} catch {}
	},
	methods: {
		...Er(Cv, ["createTimeEntry", "updateTimeEntry"]),
		formatMinutes(e) {
			return py(e);
		},
		resetForm() {
			let e = this.currentEmployee?.defaultStartTime || "08:00", n = this.currentEmployee?.defaultEndTime || "17:00";
			this.form = {
				date: this.presetDate ? new Date(this.presetDate) : /* @__PURE__ */ new Date(),
				startTime: this.prefillStart || e,
				endTime: this.prefillEnd === null ? n : this.prefillEnd,
				breakMinutes: 30,
				projectId: null,
				description: "",
				isEmergency: !1
			}, this.$nextTick(() => {
				this.onTimeChange();
			});
		},
		onTimeChange() {
			if (this.form.startTime && this.form.endTime) {
				let e = gy(hy(this.form.startTime, this.form.endTime, 0), this.break6h, this.break9h), n = this.currentEmployee?.defaultBreakMinutes ?? 0;
				this.form.breakMinutes = Math.max(e, n);
			}
		},
		cancel() {
			this.$emit("cancel");
		},
		onProjectsLoaded(e) {
			this.hasProjects = e > 0;
		},
		save() {
			let e = {
				date: qv(this.form.date),
				startTime: this.form.startTime,
				endTime: this.form.endTime,
				breakMinutes: this.form.breakMinutes,
				projectId: this.form.projectId,
				description: this.form.description || null
			};
			!this.isEdit && this.emergencyEligible && this.form.isEmergency && (e.isEmergency = !0), this.isCorrectionMode ? (this.pendingData = e, this.showReasonModal = !0) : this.persist(e);
		},
		onReasonConfirm(e) {
			let n = this.pendingData;
			this.showReasonModal = !1, this.pendingData = null, n && this.persist({
				...n,
				reason: e
			});
		},
		async persist(e) {
			try {
				this.isEdit ? await this.updateTimeEntry({
					id: this.entry.id,
					data: e
				}) : await this.createTimeEntry(e), this.$emit("saved");
			} catch (e) {
				console.error("Failed to save time entry:", e), Hv(e.message || this.t("worktime", "Fehler beim Speichern"));
			}
		}
	}
}, NS = { key: 0 }, PS = {
	key: 1,
	class: "form-group"
}, FS = { for: "date" }, IS = { class: "form-row" }, LS = { class: "form-group" }, RS = { for: "startTime" }, zS = { class: "form-group" }, BS = { for: "endTime" }, VS = { class: "form-group" }, HS = { for: "breakMinutes" }, US = {
	key: 0,
	class: "break-hint"
}, WS = { class: "form-group" }, GS = { for: "project" }, KS = { key: 0 }, qS = {
	key: 0,
	class: "field-hint field-hint--error"
}, JS = {
	key: 2,
	class: "form-group emergency-group"
}, YS = { class: "form-group" }, XS = { for: "description" }, ZS = { key: 0 }, QS = {
	key: 0,
	class: "field-hint field-hint--error"
}, $S = {
	key: 3,
	class: "form-info"
}, eC = { class: "form-actions" };
function tC(e, r, i, a, o, s) {
	let c = P("NcDateTimePicker"), l = P("InfoIcon"), u = P("ProjectSelect"), d = P("NcCheckboxRadioSwitch"), f = P("NcButton"), p = P("CorrectionReasonModal");
	return J(), H("div", { class: G(["time-entry-form", { embedded: i.embedded }]) }, [
		i.embedded ? K("", !0) : (J(), H("h3", NS, U(s.isEdit ? e.t("worktime", "Eintrag bearbeiten") : e.t("worktime", "Neuer Eintrag")), 1)),
		r[21] ||= z(),
		!i.embedded || s.isEdit ? (J(), H("div", PS, [
			n("label", FS, U(e.t("worktime", "Datum")), 1),
			r[10] ||= z(),
			I(c, {
				id: "date",
				modelValue: o.form.date,
				"onUpdate:modelValue": r[0] ||= (e) => o.form.date = e,
				type: "date",
				format: "dd.MM.yyyy"
			}, null, 8, ["modelValue"])
		])) : K("", !0),
		r[22] ||= z(),
		n("div", IS, [
			n("div", LS, [
				n("label", RS, U(e.t("worktime", "Beginn")), 1),
				r[11] ||= z(),
				N(n("input", {
					id: "startTime",
					"onUpdate:modelValue": r[1] ||= (e) => o.form.startTime = e,
					type: "time",
					class: "time-input",
					onChange: r[2] ||= (...e) => s.onTimeChange && s.onTimeChange(...e)
				}, null, 544), [[y, o.form.startTime]])
			]),
			r[13] ||= z(),
			n("div", zS, [
				n("label", BS, U(e.t("worktime", "Ende")), 1),
				r[12] ||= z(),
				N(n("input", {
					id: "endTime",
					"onUpdate:modelValue": r[3] ||= (e) => o.form.endTime = e,
					type: "time",
					class: "time-input",
					onChange: r[4] ||= (...e) => s.onTimeChange && s.onTimeChange(...e)
				}, null, 544), [[y, o.form.endTime]])
			])
		]),
		r[23] ||= z(),
		n("div", VS, [
			n("label", HS, U(e.t("worktime", "Pause (Minuten)")), 1),
			r[14] ||= z(),
			N(n("input", {
				id: "breakMinutes",
				"onUpdate:modelValue": r[5] ||= (e) => o.form.breakMinutes = e,
				type: "number",
				min: "0",
				class: "break-input"
			}, null, 512), [[
				y,
				o.form.breakMinutes,
				void 0,
				{ number: !0 }
			]]),
			r[15] ||= z(),
			s.requiredBreak > 0 ? (J(), H("p", US, [z(U(e.t("worktime", "Mindestpause: {minutes} min (§4 ArbZG)", { minutes: s.requiredBreak })) + " ", 1), I(l, null, {
				default: A(() => [z(U(e.t("worktime", "Gesetzliche Pausenregelung: Ab 6 Stunden Arbeitszeit mindestens 30 Minuten, ab 9 Stunden mindestens 45 Minuten Pause.")), 1)]),
				_: 1
			})])) : K("", !0)
		]),
		r[24] ||= z(),
		n("div", WS, [
			n("label", GS, [z(U(e.t("worktime", "Projekt")), 1), s.projectRequired ? (J(), H("span", KS, " *")) : K("", !0)]),
			r[16] ||= z(),
			I(u, {
				modelValue: o.form.projectId,
				"onUpdate:modelValue": r[6] ||= (e) => o.form.projectId = e,
				"input-id": "project",
				"has-error": s.projectMissing,
				onLoaded: s.onProjectsLoaded
			}, null, 8, [
				"modelValue",
				"has-error",
				"onLoaded"
			]),
			r[17] ||= z(),
			s.projectMissing ? (J(), H("p", qS, U(e.t("worktime", "Projekt ist erforderlich.")), 1)) : K("", !0)
		]),
		r[25] ||= z(),
		i.emergencyEligible ? (J(), H("div", JS, [I(d, {
			modelValue: o.form.isEmergency,
			"onUpdate:modelValue": r[7] ||= (e) => o.form.isEmergency = e,
			disabled: s.isEdit
		}, {
			default: A(() => [z(U(e.t("worktime", "Notarbeit/Bereitschaft im Urlaub")) + " ", 1), I(l, null, {
				default: A(() => [z(U(e.t("worktime", "An diesem genehmigten Urlaubstag hast du außerplanmäßig gearbeitet. Der Urlaub bleibt bestehen, die Zeit zählt als Überstunden. Eine Begründung ist Pflicht, der/die Vorgesetzte wird informiert.")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["modelValue", "disabled"])])) : K("", !0),
		r[26] ||= z(),
		n("div", YS, [
			n("label", XS, [z(U(e.t("worktime", "Beschreibung")), 1), s.descriptionRequired ? (J(), H("span", ZS, " *")) : K("", !0)]),
			r[18] ||= z(),
			N(n("textarea", {
				id: "description",
				"onUpdate:modelValue": r[8] ||= (e) => o.form.description = e,
				class: G(["description-input", { "input-error": s.descriptionMissing }]),
				rows: "2"
			}, null, 2), [[y, o.form.description]]),
			r[19] ||= z(),
			s.descriptionMissing ? (J(), H("p", QS, U(o.form.isEmergency ? e.t("worktime", "Für Notarbeit im Urlaub ist eine Begründung erforderlich.") : e.t("worktime", "Beschreibung ist erforderlich.")), 1)) : K("", !0)
		]),
		r[27] ||= z(),
		s.calculatedWorkMinutes > 0 ? (J(), H("div", $S, U(e.t("worktime", "Arbeitszeit: {hours}", { hours: s.formatMinutes(s.calculatedWorkMinutes) })), 1)) : K("", !0),
		r[28] ||= z(),
		n("div", eC, [
			I(f, {
				variant: "tertiary",
				onClick: s.cancel
			}, {
				default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
				_: 1
			}, 8, ["onClick"]),
			r[20] ||= z(),
			I(f, {
				variant: "primary",
				disabled: !s.isValid,
				onClick: s.save
			}, {
				default: A(() => [z(U(e.t("worktime", "Speichern")), 1)]),
				_: 1
			}, 8, ["disabled", "onClick"])
		]),
		r[29] ||= z(),
		o.showReasonModal ? (J(), L(p, {
			key: 4,
			onConfirm: s.onReasonConfirm,
			onClose: r[9] ||= (e) => o.showReasonModal = !1
		}, null, 8, ["onConfirm"])) : K("", !0)
	], 2);
}
// src/components/DayDetailPanel.vue
var nC = {
	name: "DayDetailPanel",
	components: {
		NcButton: Ye,
		PlusIcon: Gx,
		PencilIcon: Zx,
		DeleteIcon: rS,
		LockIcon: Z_,
		CalendarStarIcon: lS,
		AlertIcon: uo,
		TimeEntryForm: /* @__PURE__ */ Y(MS, [["render", tC], ["__scopeId", "data-v-1e001f0b"]]),
		CorrectionReasonModal: jS
	},
	props: {
		day: {
			type: Object,
			required: !0
		},
		projects: {
			type: Array,
			default: () => []
		},
		monthStatus: {
			type: String,
			default: null
		}
	},
	emits: ["refresh"],
	data() {
		return {
			formMode: null,
			editingEntry: null,
			pendingDeleteEntry: null
		};
	},
	computed: {
		...Tr(qo, [
			"isCorrectionMode",
			"emergencyWorkEnabled",
			"punchOnly"
		]),
		...Tr($o, ["currentEmployee"]),
		emergencyEligibleDay() {
			let e = this.day && this.day.absence;
			return !!(this.emergencyWorkEnabled && e && e.type === "vacation" && e.scope >= 1 && !e.absenceMinutes);
		},
		dayTitle() {
			return Kv(this.day.date);
		},
		subtitle() {
			return this.day.entries.length ? this.t("worktime", "Erfasst: {hours}", { hours: this.hoursLabel(this.day.totalMinutes) }) : this.t("worktime", "Tag ausgewählt");
		},
		absenceDetail() {
			let e = this.day.absence, n = this.day.creditMinutes ? this.hoursLabel(this.day.creditMinutes) : "";
			if (e.absenceMinutes) {
				let r = this.hoursLabel(e.absenceMinutes);
				return this.day.creditMinutes ? this.day.creditMinutes === e.absenceMinutes ? n : this.t("worktime", "{credit} angerechnet, {reported} gemeldet", {
					credit: n,
					reported: r
				}) : this.t("worktime", "{reported} gemeldet", { reported: r });
			}
			return e.scope < 1 ? [this.scopeLabel, n].filter(Boolean).join(", ") : n;
		},
		scopeLabel() {
			let e = this.day.absence?.scope ?? 1;
			return e === .5 ? this.t("worktime", "Halber Tag") : this.t("worktime", "{scope} Tage", { scope: e });
		},
		readonly() {
			return this.isCorrectionMode ? !1 : this.isResting || this.punchOnly ? !0 : this.monthStatus === "submitted" || this.monthStatus === "approved";
		},
		isResting() {
			return this.currentEmployee !== null && this.currentEmployee.isActive === !1;
		},
		lockedMessage() {
			return this.isResting ? this.t("worktime", "Profil ruhend – keine Erfassung möglich.") : this.punchOnly ? this.t("worktime", "Arbeitszeiten werden nur über die Stempeluhr erfasst. Korrekturen übernimmt HR.") : this.monthStatus === "approved" ? this.t("worktime", "Monat genehmigt – gesperrt. Korrektur nur durch HR.") : this.t("worktime", "Eingereicht – Bearbeitung erst nach Genehmigung oder Ablehnung möglich.");
		},
		prefillStart() {
			let e = this.day.entries;
			return e.length ? e.reduce((e, n) => n.endTime > e ? n.endTime : e, e[0].endTime) : null;
		},
		prefillEnd() {
			return this.day.entries.length ? this.day.date === $v() ? vy(this.prefillStart, _y()) : "" : null;
		}
	},
	watch: { "day.date"() {
		this.closeForm();
	} },
	methods: {
		...Er(Cv, ["deleteTimeEntry"]),
		hoursLabel(e) {
			return `${fy(e)} h`;
		},
		projectName(e) {
			if (!e || !e.projectId) return "";
			if (e.projectName) return e.projectName;
			let n = this.projects.find((n) => n.id === e.projectId);
			return n?.displayName || n?.name || "";
		},
		absenceColorClass: Sy,
		startAdd() {
			this.editingEntry = null, this.formMode = "add";
		},
		startEdit(e) {
			this.editingEntry = e, this.formMode = "edit";
		},
		closeForm() {
			this.formMode = null, this.editingEntry = null;
		},
		onSaved() {
			this.closeForm(), this.$emit("refresh");
		},
		async confirmDelete(e) {
			this.isCorrectionMode ? this.pendingDeleteEntry = e : await Uv(this.t("worktime", "Möchtest du diesen Eintrag wirklich löschen?"), this.t("worktime", "Eintrag löschen"), this.t("worktime", "Löschen"), !0) && this.doDelete(e, null);
		},
		onDeleteReasonConfirm(e) {
			let n = this.pendingDeleteEntry;
			this.pendingDeleteEntry = null, n && this.doDelete(n, e);
		},
		async doDelete(e, n) {
			try {
				await this.deleteTimeEntry({
					id: e.id,
					reason: n
				}), Vv(this.t("worktime", "Eintrag gelöscht")), this.$emit("refresh");
			} catch (e) {
				console.error("Failed to delete entry:", e), Hv(e.message || this.t("worktime", "Fehler beim Löschen"));
			}
		},
		goToAbsence() {
			this.$router.push("/absences");
		}
	}
}, rC = { class: "day-panel" }, iC = {
	id: "wt-day-panel-title",
	class: "dp-title"
}, aC = { class: "dp-sub" }, oC = {
	key: 0,
	class: "dp-note holiday"
}, sC = { key: 0 }, cC = {
	key: 2,
	class: "dp-form"
}, lC = {
	key: 0,
	class: "dp-entries"
}, uC = { class: "dp-entry-main" }, dC = { class: "dp-entry-time" }, fC = {
	key: 0,
	class: "dp-emergency-badge"
}, pC = { class: "dp-entry-meta" }, mC = {
	key: 0,
	class: "dp-entry-desc"
}, hC = {
	key: 0,
	class: "dp-entry-actions"
}, gC = {
	key: 1,
	class: "dp-empty"
}, _C = {
	key: 2,
	class: "dp-locked"
};
function vC(e, r, i, a, o, s) {
	let c = P("CalendarStarIcon"), l = P("NcButton"), d = P("AlertIcon"), f = P("TimeEntryForm"), p = P("PencilIcon"), m = P("DeleteIcon"), h = P("LockIcon"), g = P("PlusIcon"), _ = P("CorrectionReasonModal");
	return J(), H("div", rC, [
		n("h3", iC, U(s.dayTitle), 1),
		r[13] ||= z(),
		n("p", aC, U(s.subtitle), 1),
		r[14] ||= z(),
		i.day.holiday ? (J(), H("div", oC, [I(c, { size: 18 }), z(" " + U(e.t("worktime", "Feiertag")) + ": " + U(i.day.holiday.name), 1)])) : i.day.absence ? (J(), H(F, { key: 1 }, [
			n("div", { class: G(["dp-note", s.absenceColorClass(i.day.absence.type)]) }, [z(U(i.day.absence.typeName), 1), s.absenceDetail ? (J(), H("span", sC, " (" + U(s.absenceDetail) + ")", 1)) : K("", !0)], 2),
			r[1] ||= z(),
			I(l, {
				variant: "tertiary",
				class: "dp-open-abs",
				onClick: s.goToAbsence
			}, {
				default: A(() => [z(U(e.t("worktime", "In „Abwesenheit\" öffnen")), 1)]),
				_: 1
			}, 8, ["onClick"])
		], 64)) : K("", !0),
		r[15] ||= z(),
		(J(!0), H(F, null, u(i.day.warnings || [], (e, n) => (J(), H("div", {
			key: "warn-" + n,
			class: "dp-note warning"
		}, [I(d, { size: 18 }), z(" " + U(e), 1)]))), 128)),
		r[16] ||= z(),
		o.formMode ? (J(), H("div", cC, [I(f, {
			embedded: "",
			entry: o.editingEntry,
			"preset-date": i.day.date,
			"emergency-eligible": s.emergencyEligibleDay,
			"prefill-start": s.prefillStart,
			"prefill-end": s.prefillEnd,
			onSaved: s.onSaved,
			onCancel: s.closeForm
		}, null, 8, [
			"entry",
			"preset-date",
			"emergency-eligible",
			"prefill-start",
			"prefill-end",
			"onSaved",
			"onCancel"
		])])) : (J(), H(F, { key: 3 }, [
			i.day.entries.length ? (J(), H("ul", lC, [(J(!0), H(F, null, u(i.day.entries, (i) => (J(), H("li", {
				key: i.id,
				class: "dp-entry"
			}, [
				n("div", uC, [
					n("div", dC, [z(U(i.startTime) + " – " + U(i.endTime) + " ", 1), i.isEmergency ? (J(), H("span", fC, [z(U(e.t("worktime", "Notarbeit")), 1), i.emergencyApproved ? K("", !0) : (J(), H(F, { key: 0 }, [z(" · " + U(e.t("worktime", "wartet auf Freigabe")), 1)], 64))])) : K("", !0)]),
					r[8] ||= z(),
					n("div", pC, [
						n("span", null, U(s.hoursLabel(i.workMinutes)), 1),
						r[4] ||= z(),
						r[5] ||= n("span", { class: "dp-dot-sep" }, "·", -1),
						r[6] ||= z(),
						n("span", null, U(e.t("worktime", "{min} Min Pause", { min: i.breakMinutes })), 1),
						r[7] ||= z(),
						s.projectName(i) ? (J(), H(F, { key: 0 }, [
							r[2] ||= n("span", { class: "dp-dot-sep" }, "·", -1),
							r[3] ||= z(),
							n("span", null, U(s.projectName(i)), 1)
						], 64)) : K("", !0)
					]),
					r[9] ||= z(),
					i.description ? (J(), H("div", mC, U(i.description), 1)) : K("", !0)
				]),
				r[11] ||= z(),
				s.readonly ? K("", !0) : (J(), H("div", hC, [
					I(l, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Bearbeiten"),
						onClick: (e) => s.startEdit(i)
					}, {
						icon: A(() => [I(p, { size: 18 })]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					r[10] ||= z(),
					I(l, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Löschen"),
						onClick: (e) => s.confirmDelete(i)
					}, {
						icon: A(() => [I(m, { size: 18 })]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				]))
			]))), 128))])) : !i.day.holiday && !i.day.absence && !s.readonly ? (J(), H("p", gC, U(e.t("worktime", "Noch nichts erfasst.")), 1)) : K("", !0),
			r[12] ||= z(),
			s.readonly ? (J(), H("div", _C, [I(h, { size: 16 }), z(" " + U(s.lockedMessage), 1)])) : (J(), L(l, {
				key: 3,
				variant: "primary",
				wide: "",
				class: "dp-add",
				onClick: s.startAdd
			}, {
				icon: A(() => [I(g, { size: 20 })]),
				default: A(() => [z(" " + U(e.t("worktime", "Eintrag hinzufügen")), 1)]),
				_: 1
			}, 8, ["onClick"]))
		], 64)),
		r[17] ||= z(),
		o.pendingDeleteEntry ? (J(), L(_, {
			key: 4,
			onConfirm: s.onDeleteReasonConfirm,
			onClose: r[0] ||= (e) => o.pendingDeleteEntry = null
		}, null, 8, ["onConfirm"])) : K("", !0)
	]);
}
var yC = /*#__PURE__*/ Y(nC, [["render", vC], ["__scopeId", "data-v-4e554be5"]]), bC = wr("punch", () => {
	let e = W(null), n = W(!1), r = M(() => e.value !== null), i = M(() => e.value?.isPaused === !0);
	async function a(r) {
		if (!r) e.value = null;
		else {
			n.value = !0;
			try {
				e.value = await Sv.getActivePunch(r) || null;
			} finally {
				n.value = !1;
			}
		}
	}
	async function o({ employeeId: n, projectId: r = null, description: i = null }) {
		let a = await Sv.punchIn(n, r, i);
		return e.value = a, a;
	}
	async function s(n) {
		let r = await Sv.punchPause(n);
		return e.value = r, r;
	}
	async function c(n) {
		let r = await Sv.punchResume(n);
		return e.value = r, r;
	}
	async function l({ employeeId: n, ...r }) {
		let i = await Sv.punchOut(n, r);
		return e.value = null, i;
	}
	async function u(n) {
		await Sv.punchDiscard(n), e.value = null;
	}
	return {
		activePunch: e,
		punchLoading: n,
		isPunchedIn: r,
		isPunchPaused: i,
		fetchActivePunch: a,
		punchIn: o,
		punchPause: s,
		punchResume: c,
		punchOut: l,
		punchDiscard: u
	};
}), xC = {
	name: "PlayIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, SC = ["aria-hidden", "aria-label"], CC = [
	"fill",
	"width",
	"height"
], wC = { key: 0 };
function TC(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon play-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", wC, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M8,5.14V19.14L19,12.14L8,5.14Z" }, null, -1)
	], 8, CC))], 16, SC);
}
var EC = /*#__PURE__*/ Y(xC, [["render", TC]]), DC = {
	name: "PauseIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, OC = ["aria-hidden", "aria-label"], kC = [
	"fill",
	"width",
	"height"
], AC = { key: 0 };
function jC(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon pause-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", AC, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M14,19H18V5H14M6,19H10V5H6V19Z" }, null, -1)
	], 8, kC))], 16, OC);
}
var MC = /*#__PURE__*/ Y(DC, [["render", jC]]), NC = {
	name: "StopIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, PC = ["aria-hidden", "aria-label"], FC = [
	"fill",
	"width",
	"height"
], IC = { key: 0 };
function LC(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon stop-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", IC, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M18,18H6V6H18V18Z" }, null, -1)
	], 8, FC))], 16, PC);
}
var RC = /*#__PURE__*/ Y(NC, [["render", LC]]), zC = {
	name: "PunchOutDialog",
	components: {
		NcModal: Kt,
		NcButton: Ye,
		NcNoteCard: Ov,
		NcLoadingIcon: g,
		ProjectSelect: xS
	},
	props: { punch: {
		type: Object,
		required: !0
	} },
	emits: ["booked", "close"],
	data() {
		return {
			form: {
				date: "",
				startTime: "",
				endTime: "",
				breakMinutes: 0,
				projectId: null,
				description: ""
			},
			maxDailyHours: 10,
			saving: !1,
			error: null,
			emergencyReasonRequired: !1
		};
	},
	computed: {
		...Tr(qo, ["punchOnly"]),
		grossMinutes() {
			return this.spanMinutes(this.form.startTime, this.form.endTime);
		},
		netMinutes() {
			return Math.max(0, this.grossMinutes - Math.max(0, this.form.breakMinutes || 0));
		},
		netLabel() {
			let e = Math.floor(this.netMinutes / 60), n = this.netMinutes % 60;
			return `${e} h ${String(n).padStart(2, "0")} min`;
		},
		grossHours() {
			return (this.grossMinutes / 60).toFixed(1);
		},
		isOverlong() {
			return this.grossMinutes > this.maxDailyHours * 60;
		},
		punchElapsedHours() {
			return !this.punch || !this.punch.startedAt ? 0 : (Date.now() - new Date(this.punch.startedAt).getTime()) / 36e5;
		},
		isPunchTooLong() {
			return this.punchElapsedHours > 24;
		},
		isValid() {
			return !(this.isPunchTooLong || !this.form.date || !this.form.startTime || !this.form.endTime || this.netMinutes <= 0 || this.emergencyReasonRequired && this.form.description.trim() === "");
		}
	},
	async created() {
		this.prefill(), this.punch.emergencyEligible && (this.emergencyReasonRequired = !0);
		try {
			let e = await Ko.get("max_daily_hours");
			e != null && (this.maxDailyHours = parseFloat(e));
		} catch {}
	},
	methods: {
		prefill() {
			let e = new Date(this.punch.startedAt), n = this.punch.isPaused && this.punch.pausedAt ? new Date(this.punch.pausedAt) : /* @__PURE__ */ new Date();
			this.form.date = this.toYmd(e), this.form.startTime = this.toHm(e), this.form.endTime = this.toHm(n), this.form.projectId = this.punch.projectId || null, this.form.description = this.punch.description || "", this.punch.breakSeconds > 0 ? this.form.breakMinutes = Math.round(this.punch.breakSeconds / 60) : this.suggestBreak();
		},
		async suggestBreak() {
			try {
				this.form.breakMinutes = await Sv.suggestBreak(this.form.startTime, this.form.endTime);
			} catch {
				this.form.breakMinutes = 0;
			}
		},
		spanMinutes(e, n) {
			if (!e || !n) return 0;
			let [r, i] = e.split(":").map(Number), [a, o] = n.split(":").map(Number), s = a * 60 + o - (r * 60 + i);
			return s < 0 && (s += 1440), s;
		},
		toYmd(e) {
			return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
		},
		toHm(e) {
			return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
		},
		async confirm() {
			if (this.isValid && !this.saving) {
				this.saving = !0, this.error = null;
				try {
					let e = await bC().punchOut({
						employeeId: this.punch.employeeId,
						breakMinutes: this.form.breakMinutes,
						projectId: this.form.projectId === null ? 0 : this.form.projectId,
						description: this.form.description || null,
						endTime: this.form.endTime,
						confirm: !0
					});
					this.$emit("booked", e);
				} catch (e) {
					e.code === "reason_required" && (this.emergencyReasonRequired = !0), this.error = e.message || this.t("worktime", "Buchen fehlgeschlagen.");
				} finally {
					this.saving = !1;
				}
			}
		}
	}
}, BC = { class: "punch-out" }, VC = { id: "wt-punch-out-title" }, HC = { class: "punch-out__hint" }, UC = { class: "punch-out__grid" }, WC = { class: "form-group" }, GC = { for: "punch-date" }, KC = { class: "form-group" }, qC = { for: "punch-start" }, JC = { class: "form-group" }, YC = { for: "punch-end" }, XC = ["disabled"], ZC = { class: "form-group" }, QC = { for: "punch-break" }, $C = { class: "form-group" }, ew = { for: "punch-project" }, tw = { class: "form-group" }, nw = { for: "punch-desc" }, rw = ["placeholder"], iw = {
	key: 3,
	class: "punch-out__hint"
}, aw = { class: "punch-out__net" }, ow = { class: "form-actions" };
function sw(e, r, i, a, o, s) {
	let c = P("NcNoteCard"), l = P("ProjectSelect"), u = P("NcButton"), d = P("NcLoadingIcon"), f = P("NcModal");
	return J(), L(f, {
		"label-id": "wt-punch-out-title",
		onClose: r[7] ||= (n) => e.$emit("close")
	}, {
		default: A(() => [n("div", BC, [
			n("h3", VC, U(e.t("worktime", "Zeiteintrag bestätigen")), 1),
			r[18] ||= z(),
			n("p", HC, U(e.t("worktime", "Prüfe die Zeiten und bestätige, um den Zeiteintrag anzulegen.")), 1),
			r[19] ||= z(),
			s.isPunchTooLong ? (J(), L(c, {
				key: 0,
				type: "error"
			}, {
				default: A(() => [z(U(e.punchOnly ? e.t("worktime", "Diese Stempelung ist seit über 24 Stunden offen und lässt sich nicht als einzelner Zeiteintrag buchen. Bitte schließe diesen Dialog, verwirf die Stempelung und gib HR Bescheid, damit die Zeit nachgetragen wird.") : e.t("worktime", "Diese Stempelung ist seit über 24 Stunden offen und lässt sich nicht als einzelner Zeiteintrag buchen. Bitte schließe diesen Dialog, verwirf die Stempelung und erfasse die Zeit manuell.")), 1)]),
				_: 1
			})) : s.isOverlong ? (J(), L(c, {
				key: 1,
				type: "warning"
			}, {
				default: A(() => [z(U(e.t("worktime", "Du bist seit {hours} h eingestempelt. Bitte prüfe das Ende, bevor du buchst.", { hours: s.grossHours })), 1)]),
				_: 1
			})) : K("", !0),
			r[20] ||= z(),
			o.emergencyReasonRequired ? (J(), L(c, {
				key: 2,
				type: "warning"
			}, {
				default: A(() => [z(U(e.t("worktime", "An diesem Tag hast du genehmigten Urlaub. Diese Zeit wird als Notarbeit im Urlaub gebucht (zusätzlich zum Urlaub). Bitte gib eine Begründung an.")), 1)]),
				_: 1
			})) : K("", !0),
			r[21] ||= z(),
			n("div", UC, [
				n("div", WC, [
					n("label", GC, U(e.t("worktime", "Datum")), 1),
					r[8] ||= z(),
					N(n("input", {
						id: "punch-date",
						"onUpdate:modelValue": r[0] ||= (e) => o.form.date = e,
						type: "date",
						class: "input-field",
						disabled: ""
					}, null, 512), [[y, o.form.date]])
				]),
				r[12] ||= z(),
				n("div", KC, [
					n("label", qC, U(e.t("worktime", "Start")), 1),
					r[9] ||= z(),
					N(n("input", {
						id: "punch-start",
						"onUpdate:modelValue": r[1] ||= (e) => o.form.startTime = e,
						type: "time",
						class: "input-field",
						disabled: ""
					}, null, 512), [[y, o.form.startTime]])
				]),
				r[13] ||= z(),
				n("div", JC, [
					n("label", YC, U(e.t("worktime", "Ende")), 1),
					r[10] ||= z(),
					N(n("input", {
						id: "punch-end",
						"onUpdate:modelValue": r[2] ||= (e) => o.form.endTime = e,
						type: "time",
						class: "input-field",
						disabled: e.punchOnly
					}, null, 8, XC), [[y, o.form.endTime]])
				]),
				r[14] ||= z(),
				n("div", ZC, [
					n("label", QC, U(e.t("worktime", "Pause (Minuten)")), 1),
					r[11] ||= z(),
					N(n("input", {
						id: "punch-break",
						"onUpdate:modelValue": r[3] ||= (e) => o.form.breakMinutes = e,
						type: "number",
						min: "0",
						class: "input-field"
					}, null, 512), [[
						y,
						o.form.breakMinutes,
						void 0,
						{ number: !0 }
					]])
				])
			]),
			r[22] ||= z(),
			n("div", $C, [
				n("label", ew, U(e.t("worktime", "Projekt")), 1),
				r[15] ||= z(),
				I(l, {
					modelValue: o.form.projectId,
					"onUpdate:modelValue": r[4] ||= (e) => o.form.projectId = e,
					"input-id": "punch-project",
					placeholder: e.t("worktime", "Kein Projekt")
				}, null, 8, ["modelValue", "placeholder"])
			]),
			r[23] ||= z(),
			n("div", tw, [
				n("label", nw, U(o.emergencyReasonRequired ? e.t("worktime", "Begründung (erforderlich)") : e.t("worktime", "Notiz")), 1),
				r[16] ||= z(),
				N(n("textarea", {
					id: "punch-desc",
					"onUpdate:modelValue": r[5] ||= (e) => o.form.description = e,
					rows: "2",
					class: "input-field",
					placeholder: o.emergencyReasonRequired ? e.t("worktime", "Grund für die Notarbeit im Urlaub") : e.t("worktime", "Optionale Notiz")
				}, null, 8, rw), [[y, o.form.description]])
			]),
			r[24] ||= z(),
			e.punchOnly ? (J(), H("p", iw, U(e.t("worktime", "Die Endzeit setzt die Stempeluhr. Korrekturen übernimmt HR.")), 1)) : K("", !0),
			r[25] ||= z(),
			n("p", aw, U(e.t("worktime", "Nettozeit: {duration}", { duration: s.netLabel })), 1),
			r[26] ||= z(),
			o.error ? (J(), L(c, {
				key: 4,
				type: "error"
			}, {
				default: A(() => [z(U(o.error), 1)]),
				_: 1
			})) : K("", !0),
			r[27] ||= z(),
			n("div", ow, [
				I(u, {
					variant: "tertiary",
					disabled: o.saving,
					onClick: r[6] ||= (n) => e.$emit("close")
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}, 8, ["disabled"]),
				r[17] ||= z(),
				I(u, {
					variant: "primary",
					disabled: !s.isValid || o.saving,
					onClick: s.confirm
				}, yt({
					default: A(() => [z(" " + U(e.t("worktime", "Buchen")), 1)]),
					_: 2
				}, [o.saving ? {
					name: "icon",
					fn: A(() => [I(d, { size: 20 })]),
					key: "0"
				} : void 0]), 1032, ["disabled", "onClick"])
			])
		])]),
		_: 1
	});
}
// src/components/PunchPanel.vue
var cw = {
	name: "PunchPanel",
	components: {
		NcButton: Ye,
		NcNoteCard: Ov,
		ClockIcon: Oa,
		PlayIcon: EC,
		PauseIcon: MC,
		StopIcon: RC,
		DeleteIcon: rS,
		PunchOutDialog: /* @__PURE__ */ Y(zC, [["render", sw], ["__scopeId", "data-v-d8bd851c"]]),
		ProjectSelect: xS
	},
	props: { employeeId: {
		type: Number,
		required: !0
	} },
	emits: ["booked"],
	data() {
		return {
			now: Date.now(),
			timer: null,
			showPunchOut: !1,
			punchSnapshot: null,
			note: "",
			projectId: null,
			busy: !1,
			error: null
		};
	},
	computed: {
		...Tr(bC, [
			"activePunch",
			"isPunchedIn",
			"isPunchPaused"
		]),
		startedLabel() {
			return this.activePunch?.startedAt ? new Date(this.activePunch.startedAt).toLocaleTimeString(Wv(), {
				hour: "2-digit",
				minute: "2-digit"
			}) : "";
		},
		elapsedLabel() {
			if (!this.activePunch?.startedAt) return "00:00:00";
			let e = new Date(this.activePunch.startedAt).getTime(), n = Math.max(0, Math.floor((this.now - e) / 1e3));
			return [
				Math.floor(n / 3600),
				Math.floor(n % 3600 / 60),
				n % 60
			].map((e) => String(e).padStart(2, "0")).join(":");
		}
	},
	watch: { employeeId() {
		this.refresh();
	} },
	mounted() {
		this.refresh(), this.timer = setInterval(() => {
			this.now = Date.now();
		}, 1e3);
	},
	beforeUnmount() {
		this.timer && clearInterval(this.timer);
	},
	methods: {
		async refresh() {
			try {
				await bC().fetchActivePunch(this.employeeId);
			} catch {}
		},
		async doPunchIn() {
			this.busy = !0, this.error = null;
			try {
				await bC().punchIn({
					employeeId: this.employeeId,
					projectId: this.projectId,
					description: this.note || null
				}), this.note = "", this.projectId = null;
			} catch (e) {
				this.error = e.message || this.t("worktime", "Einstempeln fehlgeschlagen.");
			} finally {
				this.busy = !1;
			}
		},
		async doPause() {
			this.busy = !0, this.error = null;
			try {
				await bC().punchPause(this.employeeId);
			} catch (e) {
				this.error = e.message || this.t("worktime", "Pause fehlgeschlagen.");
			} finally {
				this.busy = !1;
			}
		},
		async doResume() {
			this.busy = !0, this.error = null;
			try {
				await bC().punchResume(this.employeeId);
			} catch (e) {
				this.error = e.message || this.t("worktime", "Fortsetzen fehlgeschlagen.");
			} finally {
				this.busy = !1;
			}
		},
		openPunchOut() {
			this.punchSnapshot = this.activePunch, this.showPunchOut = !0;
		},
		closePunchOut() {
			this.showPunchOut = !1, this.punchSnapshot = null;
		},
		onBooked() {
			this.closePunchOut(), this.$emit("booked");
		},
		async doDiscard() {
			if (await Uv(this.t("worktime", "Die laufende Stempelung wird ohne Buchung verworfen. Fortfahren?"), this.t("worktime", "Stempelung verwerfen"), this.t("worktime", "Verwerfen"), !0)) {
				this.busy = !0, this.error = null;
				try {
					await bC().punchDiscard(this.employeeId);
				} catch (e) {
					this.error = e.message || this.t("worktime", "Verwerfen fehlgeschlagen.");
				} finally {
					this.busy = !1;
				}
			}
		}
	}
}, lw = {
	key: 0,
	class: "punch-panel__idle"
}, uw = { class: "punch-panel__idle-fields" }, dw = ["placeholder"], fw = {
	key: 1,
	class: "punch-panel__running"
}, pw = { class: "punch-panel__clock" }, mw = { class: "punch-panel__time" }, hw = {
	key: 0,
	class: "punch-panel__since"
}, gw = {
	key: 1,
	class: "punch-panel__paused-badge"
}, _w = { class: "punch-panel__actions" };
function vw(e, r, i, a, o, s) {
	let c = P("ProjectSelect"), l = P("PlayIcon"), u = P("NcButton"), d = P("ClockIcon"), f = P("PauseIcon"), p = P("StopIcon"), m = P("DeleteIcon"), h = P("NcNoteCard"), g = P("PunchOutDialog");
	return J(), H("div", { class: G(["punch-panel", { "punch-panel--running": e.isPunchedIn }]) }, [
		e.isPunchedIn ? (J(), H("div", fw, [
			n("div", pw, [
				I(d, { size: 22 }),
				r[4] ||= z(),
				n("span", mw, U(s.elapsedLabel), 1),
				r[5] ||= z(),
				s.startedLabel ? (J(), H("span", hw, U(e.t("worktime", "seit {time}", { time: s.startedLabel })), 1)) : K("", !0),
				r[6] ||= z(),
				e.isPunchPaused ? (J(), H("span", gw, U(e.t("worktime", "In Pause")), 1)) : K("", !0)
			]),
			r[9] ||= z(),
			n("div", _w, [
				e.isPunchPaused ? (J(), L(u, {
					key: 1,
					variant: "secondary",
					disabled: o.busy,
					onClick: s.doResume
				}, {
					icon: A(() => [I(l, { size: 20 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Weiter")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])) : (J(), L(u, {
					key: 0,
					variant: "secondary",
					disabled: o.busy,
					onClick: s.doPause
				}, {
					icon: A(() => [I(f, { size: 20 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Pause")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])),
				r[7] ||= z(),
				I(u, {
					variant: "primary",
					disabled: o.busy,
					onClick: s.openPunchOut
				}, {
					icon: A(() => [I(p, { size: 20 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Ausstempeln")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"]),
				r[8] ||= z(),
				I(u, {
					variant: "tertiary",
					disabled: o.busy,
					onClick: s.doDiscard
				}, {
					icon: A(() => [I(m, { size: 20 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Verwerfen")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])
			])
		])) : (J(), H("div", lw, [
			n("div", uw, [
				I(c, {
					modelValue: o.projectId,
					"onUpdate:modelValue": r[0] ||= (e) => o.projectId = e,
					class: "punch-panel__project",
					placeholder: e.t("worktime", "Projekt (optional)")
				}, null, 8, ["modelValue", "placeholder"]),
				r[2] ||= z(),
				N(n("input", {
					"onUpdate:modelValue": r[1] ||= (e) => o.note = e,
					type: "text",
					class: "punch-panel__note",
					placeholder: e.t("worktime", "Notiz (optional)")
				}, null, 8, dw), [[y, o.note]])
			]),
			r[3] ||= z(),
			I(u, {
				variant: "primary",
				disabled: o.busy,
				onClick: s.doPunchIn
			}, {
				icon: A(() => [I(l, { size: 20 })]),
				default: A(() => [z(" " + U(e.t("worktime", "Einstempeln")), 1)]),
				_: 1
			}, 8, ["disabled", "onClick"])
		])),
		r[10] ||= z(),
		o.error ? (J(), L(h, {
			key: 2,
			type: "error",
			class: "punch-panel__error"
		}, {
			default: A(() => [z(U(o.error), 1)]),
			_: 1
		})) : K("", !0),
		r[11] ||= z(),
		o.showPunchOut && o.punchSnapshot ? (J(), L(g, {
			key: 3,
			punch: o.punchSnapshot,
			onBooked: s.onBooked,
			onClose: s.closePunchOut
		}, null, 8, [
			"punch",
			"onBooked",
			"onClose"
		])) : K("", !0)
	], 2);
}
var yw = /*#__PURE__*/ Y(cw, [["render", vw], ["__scopeId", "data-v-4a901343"]]), bw = {
	async getMonthly(e, n, r) {
		try {
			return (await X.get("/reports/monthly", { params: {
				employeeId: e,
				year: n,
				month: r
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getTeam(e, n) {
		try {
			return (await X.get("/reports/team", { params: {
				year: e,
				month: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getTeamYear(e) {
		try {
			return (await X.get("/reports/team-year", { params: { year: e } })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getOvertime(e, n) {
		try {
			return (await X.get("/reports/overtime", { params: {
				employeeId: e,
				year: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getAllEmployeesStatus(e, n) {
		try {
			return (await X.get("/reports/all-status", { params: {
				year: e,
				month: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getProjectEvaluation({ year: e, month: n, period: r, billableOnly: i }) {
		try {
			return (await X.get("/reports/projects", { params: {
				year: e,
				month: n,
				period: r,
				billableOnly: i
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async getProjectEntries({ year: e, month: n, period: r, billableOnly: i }) {
		try {
			return (await X.get("/reports/project-entries", { params: {
				year: e,
				month: n,
				period: r,
				billableOnly: i
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	projectExportUrl(e, { year: n, month: r, period: i, projectIds: a = [], employeeIds: o = [], mode: s = "detail" }) {
		let c = e === "pdf" ? "projects-pdf" : "projects-csv", l = new URLSearchParams({
			year: n,
			month: r,
			period: i,
			mode: s
		});
		return a.length && l.set("projectIds", a.join(",")), o.length && l.set("employeeIds", o.join(",")), Et(`/apps/worktime/api/reports/${c}`) + "?" + l.toString();
	},
	downloadProjectExport(e, n) {
		window.open(this.projectExportUrl(e, n), "_blank");
	},
	getPdfUrl(e, n, r) {
		let i = new URLSearchParams({
			employeeId: e,
			year: n,
			month: r
		});
		return Et("/apps/worktime/api/reports/pdf") + "?" + i.toString();
	},
	downloadPdf(e, n, r) {
		let i = this.getPdfUrl(e, n, r);
		window.open(i, "_blank");
	},
	getRangePdfUrl(e, n, r) {
		let i = new URLSearchParams({
			employeeId: e,
			startDate: n,
			endDate: r
		});
		return Et("/apps/worktime/api/reports/pdf-range") + "?" + i.toString();
	},
	downloadRangePdf(e, n, r) {
		window.open(this.getRangePdfUrl(e, n, r), "_blank");
	}
}, xw = {
	name: "TimeTrackingView",
	components: {
		NcButton: Ye,
		NcActions: ne,
		NcActionButton: e,
		NcLoadingIcon: g,
		NcModal: Kt,
		NcDateTimePicker: z_,
		SendIcon: G_,
		LockIcon: Z_,
		InfoIcon: sv,
		AlertIcon: uo,
		FilePdfBox: pv,
		FormatListBulletedIcon: yv,
		CalendarIcon: Pa,
		ChartBarIcon: Co,
		MonthPicker: Vy,
		YearPicker: Ky,
		OvertimeSummary: zb,
		YearOverviewTable: cx,
		DayList: Ox,
		MonthCalendar: zx,
		DayDetailPanel: yC,
		PunchPanel: yw
	},
	data() {
		return {
			statistics: null,
			reportAbsences: [],
			reportHolidays: [],
			reportDayWarnings: {},
			vacationRemaining: null,
			vacationCarryover: 0,
			vacationTotal: null,
			yearlyMonths: [],
			carryoverMinutes: 0,
			totalOvertimeMinutes: null,
			overviewYear: Zv(),
			layoutMode: [
				"list",
				"calendar",
				"year"
			].includes(localStorage.getItem("worktime_tracking_layout")) ? localStorage.getItem("worktime_tracking_layout") : "list",
			selectedDate: null,
			scrollToTodayPending: !1,
			isNarrow: !1,
			showDayModal: !1,
			showRangeModal: !1,
			rangeStart: null,
			rangeEnd: null
		};
	},
	computed: {
		...Tr(Cv, ["selectedMonth"]),
		...Tr(Cv, ["timeEntries", "loading"]),
		...Tr(qo, [
			"activeEmployeeId",
			"approvalRequired",
			"employeeId",
			"isEmployee",
			"isCorrectionMode"
		]),
		...Tr($o, ["currentEmployee"]),
		...Tr(xv, ["activeProjects"]),
		projects() {
			return this.activeProjects;
		},
		showPunchPanel() {
			return this.isEmployee && !!this.employeeId && !this.isCorrectionMode;
		},
		rangeInvalid() {
			return !!(this.rangeStart && this.rangeEnd && qv(this.rangeEnd) < qv(this.rangeStart));
		},
		effectiveLayout() {
			return this.layoutMode === "year" ? "year" : this.isNarrow ? "list" : this.layoutMode;
		},
		isYearMode() {
			return this.layoutMode === "year";
		},
		yearTargetMinutes() {
			return this.pastYearlyMonths.reduce((e, n) => e + (n.targetMinutes || 0), 0);
		},
		yearActualMinutes() {
			return this.pastYearlyMonths.reduce((e, n) => e + (n.actualMinutes || 0), 0);
		},
		yearOvertimeMinutes() {
			return this.pastYearlyMonths.reduce((e, n) => e + (n.overtimeMinutes || 0), 0) + (this.carryoverMinutes || 0);
		},
		pastYearlyMonths() {
			let e = Zv(), n = Qv();
			return this.yearlyMonths.filter((r) => this.overviewYear < e ? !0 : this.overviewYear > e ? !1 : r.month <= n);
		},
		minYear() {
			return this.currentEmployee?.entryDate ? new Date(this.currentEmployee.entryDate).getFullYear() : Zv();
		},
		maxYear() {
			return Zv() + 1;
		},
		hasSubmittableEntries() {
			return this.timeEntries.some((e) => e.status === "draft" || e.status === "rejected");
		},
		monthStatus() {
			if (!this.approvalRequired) return null;
			let e = this.timeEntries;
			return e.length ? e.every((e) => e.status === "approved") ? "approved" : e.every((e) => e.status !== "draft" && e.status !== "rejected") ? "submitted" : "draft" : "draft";
		},
		locked() {
			return this.monthStatus === "approved";
		},
		monthStatusLabel() {
			return {
				draft: this.t("worktime", "Entwurf"),
				submitted: this.t("worktime", "Eingereicht – wartet auf Genehmigung"),
				approved: this.t("worktime", "Genehmigt")
			}[this.monthStatus] || "";
		},
		monthApproval() {
			let e = this.timeEntries.filter((e) => e.status === "approved" && e.approvedAt);
			if (!e.length) return {
				approverName: "",
				approvedAtLabel: ""
			};
			let n = e.reduce((e, n) => e.approvedAt > n.approvedAt ? e : n);
			return {
				approverName: n.approverName || "",
				approvedAtLabel: n.approvedAt ? new Date(n.approvedAt).toLocaleDateString(Wv()) : ""
			};
		},
		absenceByDate() {
			let e = {}, { year: n, month: r } = this.selectedMonth;
			for (let i of this.reportAbsences) {
				if (!i.startDate || !i.endDate) continue;
				let [a, o, s] = i.startDate.split("-").map(Number), [c, l, u] = i.endDate.split("-").map(Number), d = new Date(a, o - 1, s), f = new Date(c, l - 1, u), p = xy(i.type);
				for (let a = new Date(d); a <= f; a.setDate(a.getDate() + 1)) a.getFullYear() === n && a.getMonth() + 1 === r && (e[qv(a)] = {
					type: i.type || "",
					typeName: p,
					status: i.status,
					scope: i.scope || 1,
					absenceMinutes: i.absenceMinutes ?? null
				});
			}
			return e;
		},
		days() {
			let { year: e, month: n } = this.selectedMonth, r = ny(e, n), i = {};
			for (let e of this.timeEntries) i[e.date] || (i[e.date] = []), i[e.date].push(e);
			let a = {};
			for (let e of this.reportHolidays) a[e.date] = { name: e.name };
			let o = $v(), s = this.statistics?.paidAbsenceByDay || {};
			return r.map((e) => {
				let n = (i[e.date] || []).slice().sort((e, n) => e.startTime.localeCompare(n.startTime)), r = n.reduce((e, n) => e + (n.workMinutes || 0), 0);
				return {
					...e,
					entries: n,
					totalMinutes: r,
					creditMinutes: s[e.date] || 0,
					firstStart: n.length ? n[0].startTime : null,
					lastEnd: n.length ? n[n.length - 1].endTime : null,
					absence: this.absenceByDate[e.date] || null,
					holiday: a[e.date] || null,
					warnings: this.reportDayWarnings[e.date] || [],
					isToday: e.date === o,
					isFuture: e.date > o
				};
			});
		},
		selectedDay() {
			return this.days.length ? this.days.find((e) => e.date === this.selectedDate) || this.days[0] : null;
		}
	},
	watch: {
		selectedMonth: {
			immediate: !0,
			handler({ year: e, month: n }) {
				this.ensureSelectedDate(e, n), this.loadData();
			}
		},
		activeEmployeeId(e, n) {
			e && e !== n && this.loadData();
		}
	},
	mounted() {
		this.updateIsNarrow(), window.addEventListener("resize", this.updateIsNarrow), this.scrollToTodayPending = this.isCurrentMonth();
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.updateIsNarrow);
	},
	methods: {
		...Er(Cv, ["fetchTimeEntries", "setSelectedMonth"]),
		updateIsNarrow() {
			this.isNarrow = window.innerWidth <= 920;
		},
		ensureSelectedDate(e, n) {
			this.selectedDate = e === Zv() && n === Qv() ? $v() : qv(new Date(e, n - 1, 1));
		},
		setLayout(e) {
			this.layoutMode = e, localStorage.setItem("worktime_tracking_layout", e), e === "year" && (this.overviewYear = this.selectedMonth.year, this.loadOvertime()), this.$nextTick(() => this.scrollToTodayIfPending(!1));
		},
		onYearChange(e) {
			this.overviewYear = Math.min(this.maxYear, Math.max(this.minYear, e)), this.loadOvertime();
		},
		onSelectDay(e) {
			this.selectedDate = e, this.isNarrow && (this.showDayModal = !0);
		},
		async loadData() {
			this.activeEmployeeId && (this.overviewYear = this.selectedMonth.year, await Promise.all([
				this.fetchTimeEntries(),
				this.loadStatistics(),
				this.loadVacationStats(),
				this.loadOvertime()
			]), this.$nextTick(() => this.scrollToTodayIfPending(!1)));
		},
		async refreshKeepingScroll() {
			let e = oy(this.$el), n = e ? e.scrollTop : 0;
			await this.loadData(), this.$nextTick(() => {
				e && (e.scrollTop = n);
			});
		},
		isCurrentMonth() {
			return this.selectedMonth.year === Zv() && this.selectedMonth.month === Qv();
		},
		goToToday() {
			this.scrollToTodayPending = !0, this.isCurrentMonth() ? (this.selectedDate = $v(), this.$nextTick(() => this.scrollToTodayIfPending(!0))) : this.onMonthChange({
				year: Zv(),
				month: Qv()
			});
		},
		scrollToTodayIfPending(e) {
			this.scrollToTodayPending && !this.loading && this.$refs.dayList && (this.scrollToTodayPending = !1, this.$refs.dayList.scrollToDate($v(), e));
		},
		async loadOvertime() {
			if (this.activeEmployeeId) try {
				let e = await bw.getOvertime(this.activeEmployeeId, this.overviewYear);
				this.yearlyMonths = e?.monthly || [], this.carryoverMinutes = e?.carryoverMinutes || 0, this.totalOvertimeMinutes = e?.totalOvertimeMinutes ?? null;
			} catch (e) {
				console.error("Failed to load yearly overview:", e);
			}
		},
		async loadStatistics() {
			if (this.activeEmployeeId) try {
				let e = await bw.getMonthly(this.activeEmployeeId, this.selectedMonth.year, this.selectedMonth.month);
				this.statistics = e.statistics, this.reportAbsences = (e.absences || []).filter((e) => e.status === "approved"), this.reportHolidays = e.holidays || [], this.reportDayWarnings = e.dayWarnings || {};
			} catch (e) {
				console.error("Failed to load statistics:", e);
			}
		},
		async loadVacationStats() {
			if (this.activeEmployeeId) try {
				let e = await Go.getVacationStats(this.activeEmployeeId, this.selectedMonth.year);
				this.vacationRemaining = e?.remaining ?? null, this.vacationCarryover = e?.carryover ?? 0, this.vacationTotal = e?.total ?? null;
			} catch (e) {
				console.error("Failed to load vacation stats:", e);
			}
		},
		onMonthChange({ year: e, month: n }) {
			this.setSelectedMonth({
				year: e,
				month: n
			});
		},
		selectMonth(e) {
			this.layoutMode = "list", localStorage.setItem("worktime_tracking_layout", "list"), this.setSelectedMonth({
				year: this.overviewYear,
				month: e
			});
		},
		downloadPdf() {
			this.activeEmployeeId && bw.downloadPdf(this.activeEmployeeId, this.selectedMonth.year, this.selectedMonth.month);
		},
		openRangeModal() {
			let { year: e, month: n } = this.selectedMonth;
			this.rangeStart = new Date(e, n - 1, 1), this.rangeEnd = new Date(e, n, 0), this.showRangeModal = !0;
		},
		exportRangePdf() {
			this.activeEmployeeId && this.rangeStart && this.rangeEnd && !this.rangeInvalid && (bw.downloadRangePdf(this.activeEmployeeId, qv(this.rangeStart), qv(this.rangeEnd)), this.showRangeModal = !1);
		},
		async confirmSubmitMonth() {
			let e = new Date(this.selectedMonth.year, this.selectedMonth.month - 1).toLocaleDateString(Wv(), {
				month: "long",
				year: "numeric"
			});
			if (await Uv(this.t("worktime", "Möchtest du die Zeiteinträge für {month} einreichen? Die eingereichten Einträge werden zur Genehmigung übermittelt.", { month: e }), this.t("worktime", "Monat einreichen"), this.t("worktime", "Einreichen"), !1)) try {
				let e = await Sv.submitMonth(this.activeEmployeeId, this.selectedMonth.year, this.selectedMonth.month);
				$t(this.t("worktime", "{count} Einträge wurden eingereicht.", { count: e.submitted })), await this.refreshKeepingScroll();
			} catch (e) {
				console.error("Failed to submit month:", e), qt(this.t("worktime", "Fehler beim Einreichen des Monats."));
			}
		}
	}
}, Sw = { class: "time-tracking-view" }, Cw = { class: "view-header" }, ww = { class: "view-toolbar" }, Tw = ["aria-label"], Ew = { class: "header-actions__right" }, Dw = {
	key: 1,
	class: "approved-by"
}, Ow = { class: "view-header__nav" }, kw = {
	key: 1,
	class: "lock-banner"
}, Aw = {
	key: 2,
	class: "schedule-warning-banner"
}, jw = { class: "zlayout-main" }, Mw = {
	key: 0,
	class: "zlayout-panel card"
}, Nw = { class: "modal-panel" }, Pw = { class: "range-modal" }, Fw = { id: "wt-range-modal-title" }, Iw = { class: "range-hint" }, Lw = { class: "range-fields" }, Rw = { class: "form-group" }, zw = { class: "form-group" }, Bw = {
	key: 0,
	class: "range-error"
}, Vw = { class: "range-actions" };
function Hw(e, r, i, a, o, s) {
	let c = P("PunchPanel"), l = P("FormatListBulletedIcon"), u = P("CalendarIcon"), d = P("ChartBarIcon"), f = P("SendIcon"), p = P("NcButton"), m = P("FilePdfBox"), h = P("NcActionButton"), g = P("NcActions"), _ = P("MonthPicker"), v = P("YearPicker"), y = P("LockIcon"), b = P("InfoIcon"), x = P("AlertIcon"), S = P("OvertimeSummary"), C = P("NcLoadingIcon"), w = P("YearOverviewTable"), T = P("DayList"), E = P("MonthCalendar"), D = P("DayDetailPanel"), O = P("NcModal"), k = P("NcDateTimePicker");
	return J(), H("div", Sw, [
		n("div", Cw, [n("h2", null, U(e.t("worktime", "Zeiterfassung")), 1)]),
		r[27] ||= z(),
		s.showPunchPanel ? (J(), L(c, {
			key: 0,
			"employee-id": e.employeeId,
			onBooked: s.refreshKeepingScroll
		}, null, 8, ["employee-id", "onBooked"])) : K("", !0),
		r[28] ||= z(),
		n("div", ww, [
			o.isNarrow ? K("", !0) : (J(), H("div", {
				key: 0,
				class: "layout-seg",
				role: "group",
				"aria-label": e.t("worktime", "Ansicht")
			}, [
				n("button", {
					class: G(["seg-btn", { active: o.layoutMode === "list" }]),
					onClick: r[0] ||= (e) => s.setLayout("list")
				}, [I(l, { size: 18 }), z(" " + U(e.t("worktime", "Liste")), 1)], 2),
				r[8] ||= z(),
				n("button", {
					class: G(["seg-btn", { active: o.layoutMode === "calendar" }]),
					onClick: r[1] ||= (e) => s.setLayout("calendar")
				}, [I(u, { size: 18 }), z(" " + U(e.t("worktime", "Kalender")), 1)], 2),
				r[9] ||= z(),
				n("button", {
					class: G(["seg-btn", { active: o.layoutMode === "year" }]),
					onClick: r[2] ||= (e) => s.setLayout("year")
				}, [I(d, { size: 18 }), z(" " + U(e.t("worktime", "Jahr")), 1)], 2)
			], 8, Tw)),
			r[16] ||= z(),
			n("div", Ew, [
				s.monthStatus && !s.isYearMode ? (J(), H("span", {
					key: 0,
					class: G(["month-badge", s.monthStatus])
				}, [r[10] ||= n("span", { class: "badge-dot" }, null, -1), z(" " + U(s.monthStatusLabel), 1)], 2)) : K("", !0),
				r[12] ||= z(),
				s.monthStatus === "approved" && !s.isYearMode && s.monthApproval.approverName ? (J(), H("span", Dw, U(e.t("worktime", "von {name} am {date}", {
					name: s.monthApproval.approverName,
					date: s.monthApproval.approvedAtLabel
				})), 1)) : K("", !0),
				r[13] ||= z(),
				!s.isYearMode && e.approvalRequired && s.monthStatus === "draft" && s.hasSubmittableEntries ? (J(), L(p, {
					key: 2,
					variant: "secondary",
					onClick: s.confirmSubmitMonth
				}, {
					icon: A(() => [I(f, { size: 20 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Monat einreichen")), 1)]),
					_: 1
				}, 8, ["onClick"])) : K("", !0),
				r[14] ||= z(),
				s.isYearMode ? K("", !0) : (J(), L(g, {
					key: 3,
					"aria-label": e.t("worktime", "Weitere Aktionen")
				}, {
					default: A(() => [
						I(h, { onClick: s.downloadPdf }, {
							icon: A(() => [I(m, { size: 20 })]),
							default: A(() => [z(" " + U(e.t("worktime", "PDF Monatsbericht")), 1)]),
							_: 1
						}, 8, ["onClick"]),
						r[11] ||= z(),
						I(h, { onClick: s.openRangeModal }, {
							icon: A(() => [I(u, { size: 20 })]),
							default: A(() => [z(" " + U(e.t("worktime", "PDF über Zeitraum …")), 1)]),
							_: 1
						}, 8, ["onClick"])
					]),
					_: 1
				}, 8, ["aria-label"]))
			]),
			r[17] ||= z(),
			n("div", Ow, [
				s.isYearMode ? K("", !0) : (J(), L(p, {
					key: 0,
					variant: "tertiary",
					onClick: s.goToToday
				}, {
					default: A(() => [z(U(e.t("worktime", "Heute")), 1)]),
					_: 1
				}, 8, ["onClick"])),
				r[15] ||= z(),
				s.isYearMode ? (J(), L(v, {
					key: 2,
					year: o.overviewYear,
					min: s.minYear,
					max: s.maxYear,
					onUpdate: s.onYearChange
				}, null, 8, [
					"year",
					"min",
					"max",
					"onUpdate"
				])) : (J(), L(_, {
					key: 1,
					year: e.selectedMonth.year,
					month: e.selectedMonth.month,
					onUpdate: s.onMonthChange
				}, null, 8, [
					"year",
					"month",
					"onUpdate"
				]))
			])
		]),
		r[29] ||= z(),
		s.locked && !s.isYearMode ? (J(), H("div", kw, [
			I(y, { size: 20 }),
			z(" " + U(e.t("worktime", "Monat genehmigt – Einträge gesperrt. Korrektur nur durch HR.")) + " ", 1),
			I(b, null, {
				default: A(() => [z(U(e.t("worktime", "Ein genehmigter Monat ist festgeschrieben, damit Auswertungen und Nachweise stabil bleiben. Personalverwaltung und Administration können ihn dennoch korrigieren: Die Änderung verlangt eine Begründung, wird protokolliert, und der Monat geht anschließend zurück zur erneuten Genehmigung.")), 1)]),
				_: 1
			})
		])) : K("", !0),
		r[30] ||= z(),
		!s.isYearMode && o.statistics && o.statistics.workingDays === 0 ? (J(), H("div", Aw, [I(x, { size: 20 }), z(" " + U(e.t("worktime", "0 Arbeitstage in diesem Monat – vermutlich fehlt ein gültiges Arbeitszeitprofil mit Wochenstunden größer als 0. Bitte das Arbeitszeitprofil des Mitarbeiters prüfen.")), 1)])) : K("", !0),
		r[31] ||= z(),
		!s.isYearMode && o.statistics ? (J(), L(S, {
			key: 3,
			"target-minutes": o.statistics.adjustedTargetMinutes,
			"actual-minutes": o.statistics.actualMinutes,
			"overtime-minutes": o.statistics.overtimeMinutes,
			"balance-minutes": o.totalOvertimeMinutes,
			"vacation-remaining": o.vacationRemaining,
			"vacation-carryover": o.vacationCarryover,
			"vacation-total": o.vacationTotal,
			year: e.selectedMonth.year,
			month: e.selectedMonth.month,
			statistics: o.statistics
		}, null, 8, [
			"target-minutes",
			"actual-minutes",
			"overtime-minutes",
			"balance-minutes",
			"vacation-remaining",
			"vacation-carryover",
			"vacation-total",
			"year",
			"month",
			"statistics"
		])) : s.isYearMode ? (J(), L(S, {
			key: 4,
			period: "year",
			"target-minutes": s.yearTargetMinutes,
			"actual-minutes": s.yearActualMinutes,
			"overtime-minutes": s.yearOvertimeMinutes,
			"vacation-remaining": o.vacationRemaining,
			"vacation-carryover": o.vacationCarryover,
			"vacation-total": o.vacationTotal,
			year: o.overviewYear
		}, null, 8, [
			"target-minutes",
			"actual-minutes",
			"overtime-minutes",
			"vacation-remaining",
			"vacation-carryover",
			"vacation-total",
			"year"
		])) : K("", !0),
		r[32] ||= z(),
		e.loading ? (J(), L(C, {
			key: 5,
			size: 44
		})) : s.isYearMode ? (J(), L(w, {
			key: 6,
			months: o.yearlyMonths,
			year: o.overviewYear,
			"carryover-minutes": o.carryoverMinutes,
			onSelectMonth: s.selectMonth
		}, null, 8, [
			"months",
			"year",
			"carryover-minutes",
			"onSelectMonth"
		])) : (J(), H("div", {
			key: 7,
			class: G(["zlayout", { narrow: o.isNarrow }])
		}, [
			n("div", jw, [s.effectiveLayout === "list" ? (J(), L(T, {
				key: 0,
				ref: "dayList",
				days: s.days,
				month: e.selectedMonth.month,
				projects: s.projects,
				"selected-date": o.selectedDate,
				onSelect: s.onSelectDay
			}, null, 8, [
				"days",
				"month",
				"projects",
				"selected-date",
				"onSelect"
			])) : (J(), L(E, {
				key: 1,
				days: s.days,
				year: e.selectedMonth.year,
				month: e.selectedMonth.month,
				"selected-date": o.selectedDate,
				onSelect: s.onSelectDay
			}, null, 8, [
				"days",
				"year",
				"month",
				"selected-date",
				"onSelect"
			]))]),
			r[18] ||= z(),
			!o.isNarrow && s.selectedDay ? (J(), H("div", Mw, [I(D, {
				day: s.selectedDay,
				projects: s.projects,
				"month-status": s.monthStatus,
				onRefresh: s.refreshKeepingScroll
			}, null, 8, [
				"day",
				"projects",
				"month-status",
				"onRefresh"
			])])) : K("", !0)
		], 2)),
		r[33] ||= z(),
		o.isNarrow && o.showDayModal && s.selectedDay ? (J(), L(O, {
			key: 8,
			size: "small",
			"label-id": "wt-day-panel-title",
			onClose: r[3] ||= (e) => o.showDayModal = !1
		}, {
			default: A(() => [n("div", Nw, [I(D, {
				day: s.selectedDay,
				projects: s.projects,
				"month-status": s.monthStatus,
				onRefresh: s.refreshKeepingScroll
			}, null, 8, [
				"day",
				"projects",
				"month-status",
				"onRefresh"
			])])]),
			_: 1
		})) : K("", !0),
		r[34] ||= z(),
		o.showRangeModal ? (J(), L(O, {
			key: 9,
			size: "small",
			"label-id": "wt-range-modal-title",
			onClose: r[7] ||= (e) => o.showRangeModal = !1
		}, {
			default: A(() => [n("div", Pw, [
				n("h3", Fw, U(e.t("worktime", "Arbeitszeitnachweis über Zeitraum")), 1),
				r[23] ||= z(),
				n("p", Iw, U(e.t("worktime", "Erzeugt einen Arbeitszeitnachweis als PDF für einen frei wählbaren Zeitraum (z. B. vom 20. bis zum 20.).")), 1),
				r[24] ||= z(),
				n("div", Lw, [
					n("div", Rw, [
						n("label", null, U(e.t("worktime", "Von")), 1),
						r[19] ||= z(),
						I(k, {
							modelValue: o.rangeStart,
							"onUpdate:modelValue": r[4] ||= (e) => o.rangeStart = e,
							clearable: "",
							type: "date",
							format: "dd.MM.yyyy"
						}, null, 8, ["modelValue"])
					]),
					r[21] ||= z(),
					n("div", zw, [
						n("label", null, U(e.t("worktime", "Bis")), 1),
						r[20] ||= z(),
						I(k, {
							modelValue: o.rangeEnd,
							"onUpdate:modelValue": r[5] ||= (e) => o.rangeEnd = e,
							clearable: "",
							type: "date",
							format: "dd.MM.yyyy"
						}, null, 8, ["modelValue"])
					])
				]),
				r[25] ||= z(),
				s.rangeInvalid ? (J(), H("p", Bw, U(e.t("worktime", "Das Enddatum darf nicht vor dem Startdatum liegen.")), 1)) : K("", !0),
				r[26] ||= z(),
				n("div", Vw, [
					I(p, {
						variant: "tertiary",
						onClick: r[6] ||= (e) => o.showRangeModal = !1
					}, {
						default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
						_: 1
					}),
					r[22] ||= z(),
					I(p, {
						variant: "primary",
						disabled: !o.rangeStart || !o.rangeEnd || s.rangeInvalid,
						onClick: s.exportRangePdf
					}, {
						icon: A(() => [I(m, { size: 20 })]),
						default: A(() => [z(" " + U(e.t("worktime", "PDF erstellen")), 1)]),
						_: 1
					}, 8, ["disabled", "onClick"])
				])
			])]),
			_: 1
		})) : K("", !0)
	]);
}
var Uw = /*#__PURE__*/ Y(xw, [["render", Hw], ["__scopeId", "data-v-5960aecc"]]), Ww = {
	name: "CloseIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Gw = ["aria-hidden", "aria-label"], Kw = [
	"fill",
	"width",
	"height"
], qw = { key: 0 };
function Jw(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon close-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", qw, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }, null, -1)
	], 8, Kw))], 16, Gw);
}
var Yw = /*#__PURE__*/ Y(Ww, [["render", Jw]]), Xw = {
	name: "ContentSaveIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Zw = ["aria-hidden", "aria-label"], Qw = [
	"fill",
	"width",
	"height"
], $w = { key: 0 };
function eT(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon content-save-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", $w, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" }, null, -1)
	], 8, Qw))], 16, Zw);
}
var tT = /*#__PURE__*/ Y(Xw, [["render", eT]]), nT = 300, rT = {
	name: "AbsenceRow",
	components: {
		NcButton: Ye,
		NcSelect: Xt,
		NcDateTimePicker: z_,
		PencilIcon: Zx,
		CloseIcon: Yw,
		ContentSaveIcon: tT
	},
	props: {
		absence: {
			type: Object,
			default: null
		},
		mode: {
			type: String,
			default: "view",
			validator: (e) => [
				"view",
				"edit",
				"create"
			].includes(e)
		},
		absenceTypes: {
			type: Object,
			default: () => ({})
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		vacationStats: {
			type: Object,
			default: null
		},
		hourlySickEnabled: {
			type: Boolean,
			default: !1
		},
		employeeId: {
			type: Number,
			default: null
		}
	},
	emits: [
		"edit",
		"save",
		"cancel",
		"remove"
	],
	data() {
		return {
			form: {
				type: "vacation",
				startDate: ry($v()),
				endDate: ry($v()),
				note: "",
				scope: 1,
				absenceHours: null
			},
			endTouched: !1,
			previewDays: null,
			previewTimer: null,
			previewRequest: 0,
			scopeOptions: [{
				id: 1,
				label: this.t("worktime", "Ganzer Tag")
			}, {
				id: .5,
				label: this.t("worktime", "Halber Tag")
			}]
		};
	},
	computed: {
		rowClasses() {
			return {
				editing: this.mode !== "view",
				creating: this.mode === "create"
			};
		},
		translatedTypeName() {
			return this.absence ? xy(this.absence.type) : "";
		},
		formatDateRange() {
			if (!this.absence) return "";
			let e = Cy(this.absence.startDate), n = Cy(this.absence.endDate);
			return e === n ? e : `${e} - ${n}`;
		},
		typeOptions() {
			return Object.entries(this.absenceTypes).filter(([e]) => e !== "company_closure").map(([e]) => ({
				id: e,
				label: xy(e)
			}));
		},
		selectedType: {
			get() {
				return this.typeOptions.find((e) => e.id === this.form.type) || this.typeOptions[0];
			},
			set(e) {
				this.form.type = e?.id || "vacation";
			}
		},
		selectedScope: {
			get() {
				return this.scopeOptions.find((e) => e.id === this.form.scope) || this.scopeOptions[0];
			},
			set(e) {
				let n = e?.id ?? 1;
				this.form.scope = n, n < 1 && (this.form.endDate = new Date(this.form.startDate));
			}
		},
		isSingleDay() {
			return !this.form.startDate || !this.form.endDate ? !1 : qv(this.form.startDate) === qv(this.form.endDate);
		},
		showHourlySick() {
			return this.hourlySickEnabled && this.form.type === "sick" && this.isSingleDay;
		},
		keepsStoredSickHours() {
			return !this.hourlySickEnabled && this.mode === "edit" && this.absence?.absenceMinutes > 0 && this.form.type === "sick" && this.isSingleDay;
		},
		storedSickHours() {
			return this.formatDays((this.absence?.absenceMinutes || 0) / 60);
		},
		previewKey() {
			return this.mode === "view" || this.showHourlySick || this.keepsStoredSickHours || !this.employeeId || !this.form.startDate || !this.form.endDate ? null : [
				this.employeeId,
				qv(this.form.startDate),
				qv(this.form.endDate),
				this.form.scope
			].join("|");
		},
		calculatedDays() {
			return this.previewDays === null ? "–" : yy(this.previewDays);
		},
		quotaAvailable() {
			if (!this.vacationStats) return Infinity;
			let e = this.vacationStats.remaining;
			return this.mode === "edit" && this.absence?.type === "vacation" && (e += parseFloat(this.absence.days || 0)), e;
		},
		showQuotaHint() {
			return this.form.type !== "vacation" || !this.vacationStats || this.previewDays === null ? !1 : this.previewDays > this.quotaAvailable;
		},
		isValid() {
			return !this.form.type || !this.form.startDate || !this.form.endDate ? !1 : qv(this.form.startDate) <= qv(this.form.endDate);
		},
		canEdit() {
			return this.absence && this.absence.status !== "cancelled";
		},
		canRemove() {
			return this.absence && this.absence.status !== "cancelled";
		},
		removeLabel() {
			return this.absence ? this.absence.status === "approved" && this.absence.type !== "sick" && this.absence.type !== "child_sick" ? this.t("worktime", "Stornieren") : this.t("worktime", "Löschen") : this.t("worktime", "Entfernen");
		}
	},
	watch: {
		previewKey: {
			immediate: !0,
			handler(e) {
				clearTimeout(this.previewTimer), this.previewRequest++, this.previewDays = null, e && (this.previewTimer = setTimeout(this.fetchPreviewDays, nT));
			}
		},
		absence: {
			immediate: !0,
			handler(e) {
				e && this.mode === "edit" && this.loadAbsence(e);
			}
		},
		mode: {
			immediate: !0,
			handler(e) {
				e === "edit" && this.absence ? this.loadAbsence(this.absence) : e === "create" && this.resetForm();
			}
		}
	},
	beforeUnmount() {
		clearTimeout(this.previewTimer), this.previewRequest++;
	},
	methods: {
		getStatusLabel: by,
		formatDays(e) {
			return e.toLocaleString(Wv(), { maximumFractionDigits: 1 });
		},
		async fetchPreviewDays() {
			let e = this.previewRequest, n;
			try {
				let e = await Go.previewDays(this.employeeId, qv(this.form.startDate), qv(this.form.endDate), this.form.scope);
				n = typeof e?.days == "number" ? e.days : null;
			} catch {
				n = null;
			}
			e === this.previewRequest && (this.previewDays = n);
		},
		loadAbsence(e) {
			this.form = {
				type: e.type,
				startDate: ry(e.startDate),
				endDate: ry(e.endDate),
				note: e.note || "",
				scope: e.scope ?? 1,
				absenceHours: e.absenceMinutes ? e.absenceMinutes / 60 : null
			}, this.endTouched = !0;
		},
		resetForm() {
			this.form = {
				type: "vacation",
				startDate: ry($v()),
				endDate: ry($v()),
				note: "",
				scope: 1,
				absenceHours: null
			}, this.endTouched = !1;
		},
		onStartDateChange() {
			(this.form.scope < 1 || !this.endTouched || qv(this.form.endDate) < qv(this.form.startDate)) && (this.form.endDate = new Date(this.form.startDate));
		},
		onEndDateChange() {
			this.form.scope < 1 ? this.form.endDate = new Date(this.form.startDate) : this.endTouched = !0;
		},
		onKeydown(e) {
			e.key === "Enter" && this.isValid ? (e.preventDefault(), this.save()) : e.key === "Escape" && (e.preventDefault(), this.$emit("cancel"));
		},
		save() {
			if (!this.isValid) return;
			let e = {
				type: this.form.type,
				startDate: qv(this.form.startDate),
				endDate: qv(this.form.endDate),
				note: this.form.note || null,
				scope: this.form.scope
			};
			this.showHourlySick && this.form.absenceHours > 0 && (e.absenceMinutes = Math.round(this.form.absenceHours * 60), e.scope = 1), this.$emit("save", {
				id: this.absence?.id,
				data: e,
				isCreate: this.mode === "create"
			});
		}
	}
}, iT = { class: "type-cell" }, aT = { class: "note-cell" }, oT = { class: "note-text" }, sT = {
	key: 0,
	class: "actions"
}, cT = {
	key: 0,
	class: "actions-buttons"
}, lT = {
	key: 1,
	colspan: "6",
	class: "edit-cell"
}, uT = { class: "edit-form" }, dT = { class: "edit-fields" }, fT = { class: "field date-cells" }, pT = { class: "date-row" }, mT = { class: "field" }, hT = { class: "field days-cell" }, gT = { class: "scope-row" }, _T = ["placeholder", "title"], vT = { class: "days-value" }, yT = {
	key: 1,
	class: "days-value"
}, bT = { class: "days-value" }, xT = { class: "field note-field" }, ST = ["placeholder"], CT = { class: "field actions" }, wT = { class: "actions-buttons" }, TT = {
	key: 0,
	class: "quota-hint"
}, ET = {
	key: 1,
	class: "edit-hint"
};
function DT(e, r, i, a, o, s) {
	let c = P("PencilIcon"), l = P("NcButton"), u = P("CloseIcon"), d = P("NcDateTimePicker"), f = P("NcSelect"), p = P("ContentSaveIcon");
	return J(), H("tr", { class: G(s.rowClasses) }, [i.mode === "view" ? (J(), H(F, { key: 0 }, [
		n("td", null, U(s.formatDateRange), 1),
		r[11] ||= z(),
		n("td", iT, [n("span", { class: G(["type-dot", "type-" + i.absence.type]) }, null, 2), z(" " + U(s.translatedTypeName), 1)]),
		r[12] ||= z(),
		n("td", null, U(i.absence.days), 1),
		r[13] ||= z(),
		n("td", aT, [n("span", oT, U(i.absence.note || "-"), 1)]),
		r[14] ||= z(),
		n("td", null, [n("span", { class: G(["status-badge", i.absence.status]) }, U(s.getStatusLabel(i.absence.status)), 3)]),
		r[15] ||= z(),
		i.readonly ? K("", !0) : (J(), H("td", sT, [s.canEdit || s.canRemove ? (J(), H("div", cT, [
			s.canEdit ? (J(), L(l, {
				key: 0,
				variant: "tertiary",
				"aria-label": e.t("worktime", "Bearbeiten"),
				onClick: r[0] ||= (n) => e.$emit("edit")
			}, {
				icon: A(() => [I(c, { size: 20 })]),
				_: 1
			}, 8, ["aria-label"])) : K("", !0),
			r[10] ||= z(),
			s.canRemove ? (J(), L(l, {
				key: 1,
				variant: "tertiary",
				"aria-label": s.removeLabel,
				onClick: r[1] ||= (n) => e.$emit("remove", i.absence)
			}, {
				icon: A(() => [I(u, { size: 20 })]),
				_: 1
			}, 8, ["aria-label"])) : K("", !0)
		])) : K("", !0)]))
	], 64)) : (J(), H("td", lT, [n("div", uT, [
		n("div", dT, [
			n("div", fT, [n("div", pT, [
				I(d, {
					modelValue: o.form.startDate,
					"onUpdate:modelValue": [r[2] ||= (e) => o.form.startDate = e, s.onStartDateChange],
					type: "date",
					format: "dd.MM.yyyy",
					class: "inline-picker"
				}, null, 8, ["modelValue", "onUpdate:modelValue"]),
				r[16] ||= z(),
				r[17] ||= n("span", { class: "date-separator" }, "-", -1),
				r[18] ||= z(),
				I(d, {
					modelValue: o.form.endDate,
					"onUpdate:modelValue": [r[3] ||= (e) => o.form.endDate = e, s.onEndDateChange],
					type: "date",
					format: "dd.MM.yyyy",
					class: G(["inline-picker", { "inline-picker--locked": o.form.scope < 1 }]),
					inert: o.form.scope < 1 || null
				}, null, 8, [
					"modelValue",
					"class",
					"inert",
					"onUpdate:modelValue"
				])
			])]),
			r[22] ||= z(),
			n("div", mT, [I(f, {
				"label-outside": "",
				modelValue: s.selectedType,
				"onUpdate:modelValue": r[4] ||= (e) => s.selectedType = e,
				options: s.typeOptions,
				clearable: !1,
				class: "inline-select type-select"
			}, null, 8, ["modelValue", "options"])]),
			r[23] ||= z(),
			n("div", hT, [n("div", gT, [s.showHourlySick ? (J(), H(F, { key: 0 }, [
				N(n("input", {
					"onUpdate:modelValue": r[5] ||= (e) => o.form.absenceHours = e,
					type: "number",
					min: "0",
					max: "24",
					step: "0.25",
					class: "inline-input hours-input",
					placeholder: e.t("worktime", "Std."),
					title: e.t("worktime", "Krank-Stunden für diesen Tag (leer = ganzer Tag)")
				}, null, 8, _T), [[
					y,
					o.form.absenceHours,
					void 0,
					{ number: !0 }
				]]),
				r[19] ||= z(),
				n("span", vT, U(e.t("worktime", "Std. krank")), 1)
			], 64)) : s.keepsStoredSickHours ? (J(), H("span", yT, U(e.t("worktime", "{hours} Std. krank", { hours: s.storedSickHours })), 1)) : (J(), H(F, { key: 2 }, [
				I(f, {
					"label-outside": "",
					modelValue: s.selectedScope,
					"onUpdate:modelValue": r[6] ||= (e) => s.selectedScope = e,
					options: o.scopeOptions,
					clearable: !1,
					class: "scope-select"
				}, null, 8, ["modelValue", "options"]),
				r[20] ||= z(),
				n("span", bT, U(s.calculatedDays), 1)
			], 64))])]),
			r[24] ||= z(),
			n("div", xT, [N(n("input", {
				"onUpdate:modelValue": r[7] ||= (e) => o.form.note = e,
				type: "text",
				class: "inline-input note-input",
				placeholder: e.t("worktime", "Bemerkung"),
				onKeydown: r[8] ||= (...e) => s.onKeydown && s.onKeydown(...e)
			}, null, 40, ST), [[y, o.form.note]])]),
			r[25] ||= z(),
			n("div", CT, [n("div", wT, [
				I(l, {
					variant: "primary",
					disabled: !s.isValid,
					"aria-label": e.t("worktime", "Speichern"),
					onClick: s.save
				}, {
					icon: A(() => [I(p, { size: 20 })]),
					_: 1
				}, 8, [
					"disabled",
					"aria-label",
					"onClick"
				]),
				r[21] ||= z(),
				I(l, {
					variant: "tertiary",
					"aria-label": e.t("worktime", "Abbrechen"),
					onClick: r[9] ||= (n) => e.$emit("cancel")
				}, {
					icon: A(() => [I(u, { size: 20 })]),
					_: 1
				}, 8, ["aria-label"])
			])])
		]),
		r[26] ||= z(),
		s.showQuotaHint ? (J(), H("p", TT, U(e.t("worktime", "Hinweis: Der Antrag umfasst {requested} Urlaubstage, der Resturlaub beträgt {available}.", {
			available: s.formatDays(s.quotaAvailable),
			requested: s.formatDays(o.previewDays)
		})), 1)) : i.absence && i.absence.status === "approved" && i.absence.type !== "sick" && i.absence.type !== "child_sick" ? (J(), H("p", ET, U(e.t("worktime", "Erneute Genehmigung erforderlich")), 1)) : K("", !0)
	])]))], 2);
}
// src/views/AbsenceView.vue
var OT = {
	name: "AbsenceView",
	components: {
		NcButton: Ye,
		NcLoadingIcon: g,
		NcEmptyContent: Gt,
		NcCheckboxRadioSwitch: tt,
		PlusIcon: Gx,
		CalendarIcon: Pa,
		AbsenceRow: /* @__PURE__ */ Y(rT, [["render", DT], ["__scopeId", "data-v-785abf45"]]),
		CorrectionReasonModal: jS,
		YearPicker: Ky,
		InfoIcon: sv
	},
	data() {
		return {
			currentYear: Zv(),
			editingId: null,
			isCreating: !1,
			overtime: null,
			pendingCorrection: null,
			hideCancelledRejected: !0
		};
	},
	computed: {
		...Tr(Zo, [
			"absences",
			"absenceTypes",
			"vacationStats",
			"loading"
		]),
		...Tr(qo, [
			"activeEmployeeId",
			"isCorrectionMode",
			"hourlySickEnabled"
		]),
		...Tr($o, ["currentEmployee"]),
		isResting() {
			return this.currentEmployee !== null && this.currentEmployee.isActive === !1;
		},
		maxYear() {
			return Zv() + 1;
		},
		vacationUsedPercent() {
			let e = this.vacationStats?.total;
			if (!e || e <= 0) return 0;
			let n = this.vacationStats.used || 0;
			return Math.min(100, Math.max(0, Math.round(n / e * 100)));
		},
		sortedAbsences() {
			return [...this.absences].sort((e, n) => n.startDate.localeCompare(e.startDate));
		},
		visibleAbsences() {
			return this.hideCancelledRejected ? this.sortedAbsences.filter((e) => e.status !== "cancelled" && e.status !== "rejected") : this.sortedAbsences;
		},
		hiddenCount() {
			return this.sortedAbsences.length - this.visibleAbsences.length;
		},
		vacationCarryover() {
			return this.vacationStats?.carryover ?? 0;
		},
		vacationBase() {
			return this.vacationStats ? this.vacationStats.entitlement !== void 0 && this.vacationStats.entitlement !== null ? this.vacationStats.entitlement : (this.vacationStats.total ?? 0) - (this.vacationStats.carryover ?? 0) : 0;
		},
		vacationUsedBeforeEntry() {
			return this.vacationStats?.usedBeforeEntry ?? 0;
		},
		overtimeSaldoMin() {
			return this.overtime?.totalOvertimeMinutes ?? 0;
		},
		overtimeCarryMin() {
			return this.overtime?.carryoverMinutes ?? 0;
		},
		overtimePaidOutMin() {
			return this.overtime?.paidOutMinutes ?? 0;
		},
		compensatoryDays() {
			return this.absences.filter((e) => e.type === "compensatory" && e.status === "approved").reduce((e, n) => e + (Number(n.days) || 0), 0);
		},
		compensatoryHoursLabel() {
			let e = this.overtime?.dailyMinutes ?? 0;
			return fy(Math.round(this.compensatoryDays * e));
		}
	},
	watch: { activeEmployeeId: {
		immediate: !0,
		handler() {
			this.activeEmployeeId && this.loadData();
		}
	} },
	methods: {
		formatDaysLabel: yy,
		...Er(Zo, [
			"fetchAbsences",
			"fetchVacationStats",
			"createAbsence",
			"updateAbsence",
			"deleteAbsence",
			"cancelAbsence"
		]),
		onYearChange(e) {
			this.currentYear = e, this.loadData();
		},
		async loadData() {
			await Promise.all([
				this.fetchAbsences(this.currentYear),
				this.fetchVacationStats(this.currentYear),
				this.loadOvertime()
			]);
		},
		async loadOvertime() {
			if (this.activeEmployeeId) try {
				this.overtime = await bw.getOvertime(this.activeEmployeeId, this.currentYear);
			} catch (e) {
				console.error("Failed to load overtime stats:", e);
			}
		},
		signedHours(e) {
			return `${e < 0 ? "−" : "+"}${fy(Math.abs(e))} h`;
		},
		startCreate() {
			this.editingId = null, this.isCreating = !0;
		},
		cancelCreate() {
			this.isCreating = !1;
		},
		startEdit(e) {
			this.isCreating = !1, this.editingId = e;
		},
		cancelEdit() {
			this.editingId = null;
		},
		onCreate({ data: e }) {
			this.isCorrectionMode ? this.pendingCorrection = {
				mode: "create",
				data: e
			} : this.doCreate(e);
		},
		onUpdate({ id: e, data: n }) {
			this.isCorrectionMode ? this.pendingCorrection = {
				mode: "update",
				id: e,
				data: n
			} : this.doUpdate(e, n);
		},
		onReasonConfirm(e) {
			let n = this.pendingCorrection;
			this.pendingCorrection = null, n && (n.mode === "create" ? this.doCreate({
				...n.data,
				reason: e
			}) : n.mode === "update" ? this.doUpdate(n.id, {
				...n.data,
				reason: e
			}) : n.mode === "delete" && this.doDeleteAbsence(n.id, e));
		},
		async doDeleteAbsence(e, n) {
			try {
				await this.deleteAbsence({
					id: e,
					reason: n
				}), Vv(this.t("worktime", "Abwesenheit gelöscht")), this.loadData();
			} catch (e) {
				console.error("Failed to delete absence:", e), Hv(e.message || this.t("worktime", "Fehler beim Entfernen"));
			}
		},
		async doCreate(e) {
			try {
				await this.createAbsence(e), this.isCreating = !1, Vv(this.t("worktime", "Abwesenheit erstellt")), this.loadData();
			} catch (e) {
				console.error("Failed to create absence:", e), Hv(e.message || this.t("worktime", "Fehler beim Erstellen"));
			}
		},
		async doUpdate(e, n) {
			try {
				await this.updateAbsence({
					id: e,
					data: n
				}), this.editingId = null, Vv(this.t("worktime", "Abwesenheit aktualisiert")), this.loadData();
			} catch (e) {
				console.error("Failed to update absence:", e), Hv(e.message || this.t("worktime", "Fehler beim Speichern"));
			}
		},
		async confirmRemove(e) {
			let n = e.status === "approved" && e.type !== "sick" && e.type !== "child_sick";
			if (!n && this.isCorrectionMode) this.pendingCorrection = {
				mode: "delete",
				id: e.id
			};
			else if (await Uv(n ? this.t("worktime", "Diese Abwesenheit stornieren? Sie bleibt mit Status \"Storniert\" sichtbar.") : this.t("worktime", "Diese Abwesenheit löschen?"), n ? this.t("worktime", "Abwesenheit stornieren") : this.t("worktime", "Abwesenheit löschen"), n ? this.t("worktime", "Stornieren") : this.t("worktime", "Löschen"), !0)) try {
				n ? (await this.cancelAbsence(e.id), Vv(this.t("worktime", "Abwesenheit storniert"))) : (await this.deleteAbsence(e.id), Vv(this.t("worktime", "Abwesenheit gelöscht"))), this.loadData();
			} catch (e) {
				console.error("Failed to remove absence:", e), Hv(e.message || this.t("worktime", "Fehler beim Entfernen"));
			}
		}
	}
}, kT = { class: "absence-view" }, AT = { class: "view-header" }, jT = { class: "view-toolbar" }, MT = { class: "view-header__nav" }, NT = { class: "konto-stats" }, PT = {
	key: 0,
	class: "konto-box"
}, FT = ["aria-valuenow", "aria-valuemax"], IT = { class: "konto-barlab" }, LT = { class: "konto-substats" }, RT = { class: "substat" }, zT = { class: "substat__l" }, BT = { class: "substat__v" }, VT = { class: "substat" }, HT = { class: "substat__l" }, UT = { class: "substat__v" }, WT = { key: 0 }, GT = { class: "substat" }, KT = { class: "substat__l" }, qT = { class: "substat__v" }, JT = {
	key: 0,
	class: "substat"
}, YT = { class: "substat__l" }, XT = { class: "substat__v" }, ZT = {
	key: 1,
	class: "konto-box"
}, QT = { class: "konto-barlab" }, $T = { class: "konto-substats" }, eE = { class: "substat" }, tE = { class: "substat__l" }, nE = { class: "substat__v" }, rE = { key: 0 }, iE = {
	key: 0,
	class: "substat"
}, aE = { class: "substat__l" }, oE = { class: "substat__v" }, sE = { class: "substat" }, cE = { class: "substat__l" }, lE = { class: "substat__v" }, uE = { class: "absence-card" }, dE = { class: "list-head" }, fE = { class: "list-title" }, pE = {
	key: 0,
	class: "list-filter"
}, mE = {
	key: 2,
	class: "absence-table"
}, hE = { class: "absence-legend" }, gE = { class: "legend-grid" }, _E = { class: "legend-item" }, vE = { class: "legend-text" }, yE = { class: "legend-item" }, bE = { class: "legend-text" }, xE = { class: "legend-item" }, SE = { class: "legend-text" }, CE = { class: "legend-item" }, wE = { class: "legend-text" }, TE = { class: "legend-item" }, EE = { class: "legend-text" }, DE = { class: "legend-item" }, OE = { class: "legend-text" }, kE = { class: "legend-item" }, AE = { class: "legend-text" }, jE = { class: "legend-item" }, ME = { class: "legend-text" };
function NE(e, r, i, a, o, s) {
	let c = P("YearPicker"), l = P("InfoIcon"), d = P("PlusIcon"), f = P("NcButton"), p = P("NcCheckboxRadioSwitch"), m = P("NcLoadingIcon"), h = P("AbsenceRow"), g = P("CalendarIcon"), _ = P("NcEmptyContent"), v = P("CorrectionReasonModal");
	return J(), H("div", kT, [
		n("div", AT, [n("h2", null, U(e.t("worktime", "Abwesenheit")), 1)]),
		r[69] ||= z(),
		n("div", jT, [n("div", MT, [I(c, {
			year: o.currentYear,
			max: s.maxYear,
			onUpdate: s.onYearChange
		}, null, 8, [
			"year",
			"max",
			"onUpdate"
		])])]),
		r[70] ||= z(),
		n("div", null, [
			n("div", NT, [
				e.vacationStats ? (J(), H("section", PT, [
					n("h3", null, U(e.t("worktime", "Urlaub")), 1),
					r[10] ||= z(),
					n("div", { class: G(["konto-hero", e.vacationStats.remaining >= 0 ? "konto-hero--pos" : "konto-hero--neg"]) }, [z(U(e.vacationStats.remaining) + " ", 1), n("small", null, "/ " + U(e.vacationStats.total) + " " + U(e.t("worktime", "Tage übrig")), 1)], 2),
					r[11] ||= z(),
					n("div", {
						class: "vac-progress",
						role: "progressbar",
						"aria-valuenow": e.vacationStats.used,
						"aria-valuemin": 0,
						"aria-valuemax": e.vacationStats.total
					}, [n("div", {
						class: "vac-progress__fill",
						style: Pe({ width: s.vacationUsedPercent + "%" })
					}, null, 4)], 8, FT),
					r[12] ||= z(),
					n("div", IT, U(e.t("worktime", "{used} von {total} Tagen genommen", {
						used: e.vacationStats.used,
						total: e.vacationStats.total
					})), 1),
					r[13] ||= z(),
					n("div", LT, [
						n("div", RT, [
							n("span", zT, U(e.t("worktime", "Anspruch")), 1),
							r[3] ||= z(),
							n("span", BT, U(s.vacationBase), 1)
						]),
						r[7] ||= z(),
						n("div", VT, [
							n("span", HT, U(e.t("worktime", "Genommen")), 1),
							r[4] ||= z(),
							n("span", UT, [z(U(e.vacationStats.used), 1), e.vacationStats.pending > 0 ? (J(), H("small", WT, U(e.t("worktime", "+ {days} beantragt", { days: e.vacationStats.pending })), 1)) : K("", !0)])
						]),
						r[8] ||= z(),
						n("div", GT, [
							n("span", KT, U(e.t("worktime", "Übertrag Vorjahr")), 1),
							r[5] ||= z(),
							n("span", qT, U(s.vacationCarryover === 0 ? "–" : s.vacationCarryover), 1)
						]),
						r[9] ||= z(),
						s.vacationUsedBeforeEntry > 0 ? (J(), H("div", JT, [
							n("span", YT, U(e.t("worktime", "Vor Eintritt verbraucht")), 1),
							r[6] ||= z(),
							n("span", XT, "−" + U(s.vacationUsedBeforeEntry), 1)
						])) : K("", !0)
					])
				])) : K("", !0),
				r[22] ||= z(),
				o.overtime ? (J(), H("section", ZT, [
					n("h3", null, [z(U(e.t("worktime", "Überstunden")) + " ", 1), I(l, null, {
						default: A(() => [z(U(e.t("worktime", "Freizeitausgleich reduziert die Überstunden automatisch.")), 1)]),
						_: 1
					})]),
					r[19] ||= z(),
					n("div", { class: G(["konto-hero", s.overtimeSaldoMin >= 0 ? "konto-hero--pos" : "konto-hero--neg"]) }, U(s.signedHours(s.overtimeSaldoMin)), 3),
					r[20] ||= z(),
					n("div", QT, U(e.t("worktime", "Stand heute")), 1),
					r[21] ||= z(),
					n("div", $T, [
						n("div", eE, [
							n("span", tE, U(e.t("worktime", "Freizeitausgleich")), 1),
							r[14] ||= z(),
							n("span", nE, [z(U(s.formatDaysLabel(s.compensatoryDays)), 1), s.compensatoryDays > 0 ? (J(), H("small", rE, " (≈" + U(s.compensatoryHoursLabel) + ")", 1)) : K("", !0)])
						]),
						r[17] ||= z(),
						s.overtimePaidOutMin > 0 ? (J(), H("div", iE, [
							n("span", aE, U(e.t("worktime", "Ausgezahlt {year}", { year: o.currentYear })), 1),
							r[15] ||= z(),
							n("span", oE, U(s.signedHours(-s.overtimePaidOutMin)), 1)
						])) : K("", !0),
						r[18] ||= z(),
						n("div", sE, [
							n("span", cE, U(e.t("worktime", "Übertrag Vorjahr")), 1),
							r[16] ||= z(),
							n("span", lE, U(s.overtimeCarryMin === 0 ? "–" : s.signedHours(s.overtimeCarryMin)), 1)
						])
					])
				])) : K("", !0)
			]),
			r[67] ||= z(),
			n("div", uE, [
				n("div", dE, [
					n("h3", fE, U(e.t("worktime", "Meine Abwesenheiten")), 1),
					r[23] ||= z(),
					s.isResting ? K("", !0) : (J(), L(f, {
						key: 0,
						variant: "primary",
						onClick: s.startCreate
					}, {
						icon: A(() => [I(d, { size: 20 })]),
						default: A(() => [z(" " + U(e.t("worktime", "Neue Abwesenheit")), 1)]),
						_: 1
					}, 8, ["onClick"]))
				]),
				r[33] ||= z(),
				e.absences.length > 0 ? (J(), H("div", pE, [
					I(p, {
						modelValue: o.hideCancelledRejected,
						"onUpdate:modelValue": r[0] ||= (e) => o.hideCancelledRejected = e,
						type: "switch"
					}, {
						default: A(() => [z(U(e.t("worktime", "Stornierte und abgelehnte ausblenden")), 1)]),
						_: 1
					}, 8, ["modelValue"]),
					r[24] ||= z(),
					o.hideCancelledRejected && s.hiddenCount > 0 ? (J(), H("button", {
						key: 0,
						class: "list-filter__hint",
						onClick: r[1] ||= (e) => o.hideCancelledRejected = !1
					}, U(e.t("worktime", "{count} ausgeblendet", { count: s.hiddenCount })), 1)) : K("", !0)
				])) : K("", !0),
				r[34] ||= z(),
				e.loading ? (J(), L(m, {
					key: 1,
					size: 44
				})) : e.absences.length > 0 || o.isCreating ? (J(), H("table", mE, [
					n("thead", null, [n("tr", null, [
						n("th", null, U(e.t("worktime", "Zeitraum")), 1),
						r[25] ||= z(),
						n("th", null, U(e.t("worktime", "Art")), 1),
						r[26] ||= z(),
						n("th", null, U(e.t("worktime", "Tage")), 1),
						r[27] ||= z(),
						n("th", null, U(e.t("worktime", "Bemerkung")), 1),
						r[28] ||= z(),
						n("th", null, U(e.t("worktime", "Status")), 1),
						r[29] ||= z(),
						n("th", null, U(e.t("worktime", "Aktionen")), 1)
					])]),
					r[31] ||= z(),
					n("tbody", null, [
						o.isCreating ? (J(), L(h, {
							key: 0,
							absence: null,
							mode: "create",
							"absence-types": e.absenceTypes,
							"vacation-stats": e.vacationStats,
							"employee-id": e.activeEmployeeId,
							"hourly-sick-enabled": e.hourlySickEnabled,
							onSave: s.onCreate,
							onCancel: s.cancelCreate
						}, null, 8, [
							"absence-types",
							"vacation-stats",
							"employee-id",
							"hourly-sick-enabled",
							"onSave",
							"onCancel"
						])) : K("", !0),
						r[30] ||= z(),
						(J(!0), H(F, null, u(s.visibleAbsences, (n) => (J(), L(h, {
							key: n.id,
							absence: n,
							mode: o.editingId === n.id ? "edit" : "view",
							"absence-types": e.absenceTypes,
							"vacation-stats": e.vacationStats,
							"employee-id": e.activeEmployeeId,
							"hourly-sick-enabled": e.hourlySickEnabled,
							onEdit: (e) => s.startEdit(n.id),
							onSave: s.onUpdate,
							onCancel: s.cancelEdit,
							onRemove: s.confirmRemove
						}, null, 8, [
							"absence",
							"mode",
							"absence-types",
							"vacation-stats",
							"employee-id",
							"hourly-sick-enabled",
							"onEdit",
							"onSave",
							"onCancel",
							"onRemove"
						]))), 128))
					])
				])) : (J(), L(_, {
					key: 3,
					name: e.t("worktime", "Keine Abwesenheiten")
				}, {
					icon: A(() => [I(g)]),
					description: A(() => [z(U(e.t("worktime", "Du hast noch keine Abwesenheiten eingetragen.")), 1)]),
					_: 1
				}, 8, ["name"]))
			]),
			r[68] ||= z(),
			n("div", hE, [
				n("h3", null, U(e.t("worktime", "Abwesenheitstypen")), 1),
				r[66] ||= z(),
				n("div", gE, [
					n("div", _E, [
						r[36] ||= n("span", { class: "legend-color type-vacation" }, null, -1),
						r[37] ||= z(),
						n("div", vE, [
							n("strong", null, U(e.t("worktime", "Urlaub")), 1),
							r[35] ||= z(),
							n("span", null, U(e.t("worktime", "Bezahlter Erholungsurlaub. Wird vom Urlaubskonto abgezogen.")), 1)
						])
					]),
					r[59] ||= z(),
					n("div", yE, [
						r[39] ||= n("span", { class: "legend-color type-sick" }, null, -1),
						r[40] ||= z(),
						n("div", bE, [
							n("strong", null, U(e.t("worktime", "Krankheit")), 1),
							r[38] ||= z(),
							n("span", null, U(e.t("worktime", "Krankmeldung. Arbeitszeit gilt als geleistet, keine Urlaubstage.")), 1)
						])
					]),
					r[60] ||= z(),
					n("div", xE, [
						r[42] ||= n("span", { class: "legend-color type-child_sick" }, null, -1),
						r[43] ||= z(),
						n("div", SE, [
							n("strong", null, U(e.t("worktime", "Kind krank")), 1),
							r[41] ||= z(),
							n("span", null, U(e.t("worktime", "Dein Kind ist krank. Wie Krankheit, keine Urlaubstage.")), 1)
						])
					]),
					r[61] ||= z(),
					n("div", CE, [
						r[45] ||= n("span", { class: "legend-color type-special" }, null, -1),
						r[46] ||= z(),
						n("div", wE, [
							n("strong", null, U(e.t("worktime", "Sonderurlaub")), 1),
							r[44] ||= z(),
							n("span", null, U(e.t("worktime", "Bezahlte Freistellung, z.B. Hochzeit, Umzug oder Trauerfall.")), 1)
						])
					]),
					r[62] ||= z(),
					n("div", TE, [
						r[48] ||= n("span", { class: "legend-color type-training" }, null, -1),
						r[49] ||= z(),
						n("div", EE, [
							n("strong", null, U(e.t("worktime", "Fortbildung")), 1),
							r[47] ||= z(),
							n("span", null, U(e.t("worktime", "Schulung, Seminar oder Konferenz. Zählt als Arbeitszeit.")), 1)
						])
					]),
					r[63] ||= z(),
					n("div", DE, [
						r[51] ||= n("span", { class: "legend-color type-unpaid" }, null, -1),
						r[52] ||= z(),
						n("div", OE, [
							n("strong", null, U(e.t("worktime", "Unbezahlter Urlaub")), 1),
							r[50] ||= z(),
							n("span", null, U(e.t("worktime", "Freistellung ohne Gehalt. Reduziert die Soll-Stunden.")), 1)
						])
					]),
					r[64] ||= z(),
					n("div", kE, [
						r[54] ||= n("span", { class: "legend-color type-compensatory" }, null, -1),
						r[55] ||= z(),
						n("div", AE, [
							n("strong", null, U(e.t("worktime", "Freizeitausgleich")), 1),
							r[53] ||= z(),
							n("span", null, U(e.t("worktime", "Überstunden als Freizeit nehmen. Reduziert die Überstunden.")), 1)
						])
					]),
					r[65] ||= z(),
					n("div", jE, [
						r[57] ||= n("span", { class: "legend-color type-company_closure" }, null, -1),
						r[58] ||= z(),
						n("div", ME, [
							n("strong", null, U(e.t("worktime", "Betriebsschließung")), 1),
							r[56] ||= z(),
							n("span", null, U(e.t("worktime", "Bezahlte Freistellung bei Betriebsferien. Kein Urlaubs- oder Überstundenabzug.")), 1)
						])
					])
				])
			])
		]),
		r[71] ||= z(),
		o.pendingCorrection ? (J(), L(v, {
			key: 0,
			onConfirm: s.onReasonConfirm,
			onClose: r[2] ||= (e) => o.pendingCorrection = null
		}, null, 8, ["onConfirm"])) : K("", !0)
	]);
}
var PE = /*#__PURE__*/ Y(OT, [["render", NE], ["__scopeId", "data-v-1e3a8882"]]), FE = {
	name: "FlagOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, IE = ["aria-hidden", "aria-label"], LE = [
	"fill",
	"width",
	"height"
], RE = { key: 0 };
function zE(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon flag-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", RE, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12.36,6L12.76,8H18V14H14.64L14.24,12H7V6H12.36M14,4H5V21H7V14H12.6L13,16H20V6H14.4" }, null, -1)
	], 8, LE))], 16, IE);
}
var BE = /*#__PURE__*/ Y(FE, [["render", zE]]), VE = {
	name: "TagOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, HE = ["aria-hidden", "aria-label"], UE = [
	"fill",
	"width",
	"height"
], WE = { key: 0 };
function GE(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon tag-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", WE, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58M13 20L4 11V4H11L20 13M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z" }, null, -1)
	], 8, UE))], 16, HE);
}
var KE = /*#__PURE__*/ Y(VE, [["render", GE]]), qE = {
	name: "AbsenceTimeline",
	props: {
		employees: {
			type: Array,
			required: !0
		},
		year: {
			type: Number,
			required: !0
		},
		month: {
			type: Number,
			required: !0
		},
		holidays: {
			type: Array,
			default: () => []
		},
		showFullLegend: {
			type: Boolean,
			default: !1
		},
		colorBy: {
			type: String,
			default: "type",
			validator: (e) => ["type", "status"].includes(e)
		}
	},
	computed: {
		statusLegendItems() {
			return [{
				status: "approved",
				label: t("worktime", "Genehmigt"),
				description: t("worktime", "Bestätigte Abwesenheit.")
			}, {
				status: "pending",
				label: t("worktime", "Beantragt"),
				description: t("worktime", "Offener Antrag, noch nicht genehmigt.")
			}];
		},
		activeLegendItems() {
			let e = {
				vacation: {
					label: t("worktime", "Urlaub"),
					description: t("worktime", "Bezahlter Erholungsurlaub. Wird vom Urlaubskonto abgezogen.")
				},
				absent: {
					label: t("worktime", "Abwesend"),
					description: t("worktime", "Mitarbeiter ist abwesend. Grund ist nur für Vorgesetzte sichtbar.")
				},
				sick: {
					label: t("worktime", "Krankheit"),
					description: t("worktime", "Krankmeldung. Arbeitszeit gilt als geleistet, keine Urlaubstage.")
				},
				child_sick: {
					label: t("worktime", "Kind krank"),
					description: t("worktime", "Dein Kind ist krank. Wie Krankheit, keine Urlaubstage.")
				},
				training: {
					label: t("worktime", "Fortbildung"),
					description: t("worktime", "Schulung, Seminar oder Konferenz. Zählt als Arbeitszeit.")
				},
				special: {
					label: t("worktime", "Sonderurlaub"),
					description: t("worktime", "Bezahlte Freistellung, z.B. Hochzeit, Umzug oder Trauerfall.")
				},
				compensatory: {
					label: t("worktime", "Freizeitausgleich"),
					description: t("worktime", "Überstunden als Freizeit nehmen. Reduziert die Überstunden.")
				},
				unpaid: {
					label: t("worktime", "Unbezahlter Urlaub"),
					description: t("worktime", "Freistellung ohne Gehalt. Reduziert die Soll-Stunden.")
				},
				company_closure: {
					label: t("worktime", "Betriebsschließung"),
					description: t("worktime", "Bezahlte Freistellung bei Betriebsferien. Kein Urlaubs- oder Überstundenabzug.")
				}
			};
			if (this.showFullLegend) return [
				"vacation",
				"sick",
				"child_sick",
				"special",
				"training",
				"unpaid",
				"compensatory",
				"company_closure"
			].map((n) => ({
				type: n,
				...e[n]
			}));
			let n = /* @__PURE__ */ new Set();
			return this.employees.forEach((e) => {
				e.absences.forEach((e) => n.add(e.type));
			}), Array.from(n).filter((n) => e[n]).map((n) => ({
				type: n,
				...e[n]
			}));
		},
		daysInMonth() {
			let e = [], n = new Date(this.year, this.month - 1, 1), r = [
				t("worktime", "So"),
				t("worktime", "Mo"),
				t("worktime", "Di"),
				t("worktime", "Mi"),
				t("worktime", "Do"),
				t("worktime", "Fr"),
				t("worktime", "Sa")
			];
			for (; n.getMonth() === this.month - 1;) {
				let i = this.formatDate(n), a = n.getDay(), o = this.holidays.find((e) => e.date === i);
				e.push({
					date: i,
					dayNumber: n.getDate(),
					weekdayShort: r[a],
					isWeekend: a === 0 || a === 6,
					isHoliday: !!o,
					holidayName: o ? o.name : ""
				}), n.setDate(n.getDate() + 1);
			}
			return e;
		}
	},
	methods: {
		barClass(e) {
			return this.colorBy === "status" ? "status-" + (e.status || "approved") : "type-" + e.type;
		},
		formatDate(e) {
			return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
		},
		getAbsenceForDay(e, n) {
			return e.absences.find((e) => n >= e.startDate && n <= e.endDate);
		},
		getAbsenceTooltip(e) {
			if (!e) return "";
			let n = this.formatDisplayDate(e.startDate), r = this.formatDisplayDate(e.endDate);
			return `${{
				vacation: t("worktime", "Urlaub"),
				sick: t("worktime", "Krankheit"),
				child_sick: t("worktime", "Kind krank"),
				special: t("worktime", "Sonderurlaub"),
				training: t("worktime", "Fortbildung"),
				compensatory: t("worktime", "Freizeitausgleich"),
				unpaid: t("worktime", "Unbezahlter Urlaub"),
				company_closure: t("worktime", "Betriebsschließung"),
				absent: t("worktime", "Abwesend")
			}[e.type] || e.typeName}: ${n} - ${r}`;
		},
		formatDisplayDate(e) {
			let n = e.split("-");
			return `${n[2]}.${n[1]}.${n[0]}`;
		}
	}
}, JE = { class: "absence-timeline" }, YE = { class: "timeline-header" }, XE = { class: "timeline-name-col" }, ZE = { class: "timeline-days" }, QE = ["title"], $E = { class: "day-weekday" }, eD = { class: "day-number" }, tD = {
	key: 0,
	class: "timeline-empty"
}, nD = ["title"], rD = { class: "timeline-days" }, iD = ["title"], aD = {
	key: 1,
	class: "absence-legend"
}, oD = { class: "legend-grid" }, sD = { class: "legend-text" }, cD = {
	key: 2,
	class: "absence-legend"
}, lD = { class: "legend-grid" }, uD = { class: "legend-text" };
function dD(e, r, i, a, o, s) {
	return J(), H("div", JE, [
		n("div", YE, [
			n("div", XE, U(e.t("worktime", "Mitarbeiter")), 1),
			r[1] ||= z(),
			n("div", ZE, [(J(!0), H(F, null, u(s.daysInMonth, (e) => (J(), H("div", {
				key: e.date,
				class: G(["timeline-day-header", {
					weekend: e.isWeekend,
					holiday: e.isHoliday
				}]),
				title: e.isHoliday ? e.holidayName : ""
			}, [
				n("span", $E, U(e.weekdayShort), 1),
				r[0] ||= z(),
				n("span", eD, U(e.dayNumber), 1)
			], 10, QE))), 128))])
		]),
		r[9] ||= z(),
		i.employees.length === 0 ? (J(), H("div", tD, U(e.t("worktime", "Keine Mitarbeiter sichtbar")), 1)) : K("", !0),
		r[10] ||= z(),
		(J(!0), H(F, null, u(i.employees, (e) => (J(), H("div", {
			key: e.employeeId,
			class: "timeline-row"
		}, [
			n("div", {
				class: "timeline-name-col",
				title: e.employeeName
			}, U(e.employeeName), 9, nD),
			r[2] ||= z(),
			n("div", rD, [(J(!0), H(F, null, u(s.daysInMonth, (n) => (J(), H("div", {
				key: n.date,
				class: G(["timeline-cell", {
					weekend: n.isWeekend,
					holiday: n.isHoliday
				}])
			}, [s.getAbsenceForDay(e, n.date) ? (J(), H("div", {
				key: 0,
				class: G(["absence-bar", s.barClass(s.getAbsenceForDay(e, n.date))]),
				title: s.getAbsenceTooltip(s.getAbsenceForDay(e, n.date))
			}, null, 10, iD)) : K("", !0)], 2))), 128))])
		]))), 128)),
		r[11] ||= z(),
		i.colorBy === "status" ? (J(), H("div", aD, [
			n("h3", null, U(e.t("worktime", "Status")), 1),
			r[5] ||= z(),
			n("div", oD, [(J(!0), H(F, null, u(s.statusLegendItems, (e) => (J(), H("div", {
				key: e.status,
				class: "legend-item"
			}, [
				n("span", { class: G(["legend-color", "status-" + e.status]) }, null, 2),
				r[4] ||= z(),
				n("div", sD, [
					n("strong", null, U(e.label), 1),
					r[3] ||= z(),
					n("span", null, U(e.description), 1)
				])
			]))), 128))])
		])) : (J(), H("div", cD, [
			n("h3", null, U(e.t("worktime", "Abwesenheitstypen")), 1),
			r[8] ||= z(),
			n("div", lD, [(J(!0), H(F, null, u(s.activeLegendItems, (e) => (J(), H("div", {
				key: e.type,
				class: "legend-item"
			}, [
				n("span", { class: G(["legend-color", "type-" + e.type]) }, null, 2),
				r[7] ||= z(),
				n("div", uD, [
					n("strong", null, U(e.label), 1),
					r[6] ||= z(),
					n("span", null, U(e.description), 1)
				])
			]))), 128))])
		]))
	]);
}
var fD = /*#__PURE__*/ Y(qE, [["render", dD], ["__scopeId", "data-v-cc2f219e"]]), pD = {
	async getByYearAndState(e, n) {
		try {
			return (await X.get("/holidays", { params: {
				year: e,
				federalState: n
			} })).data;
		} catch (e) {
			Z(e);
		}
	},
	async get(e) {
		try {
			return (await X.get(`/holidays/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async generate(e, n) {
		try {
			return (await X.post("/holidays/generate", {
				year: e,
				federalState: n
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async generateAll(e) {
		try {
			return (await X.post("/holidays/generate-all", { year: e })).data;
		} catch (e) {
			Z(e);
		}
	},
	async check(e, n) {
		try {
			return (await X.get("/holidays/check", { params: {
				year: e,
				federalState: n
			} })).data.exists;
		} catch (e) {
			Z(e);
		}
	},
	async getFederalStates() {
		try {
			return (await X.get("/holidays/federal-states")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getByYear(e) {
		try {
			return (await X.get("/holidays", { params: { year: e } })).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e) {
		try {
			return (await X.post("/holidays", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/holidays/${e}`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e) {
		try {
			return (await X.delete(`/holidays/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	}
}, mD = {
	name: "TeamView",
	components: {
		NcLoadingIcon: g,
		NcEmptyContent: Gt,
		AccountGroupIcon: Ba,
		FlagOutline: BE,
		TagOutline: KE,
		MonthPicker: Vy,
		AbsenceTimeline: fD
	},
	data() {
		return {
			month: {
				year: Zv(),
				month: Qv()
			},
			overview: [],
			holidays: [],
			colorBy: "type",
			loading: !1
		};
	},
	computed: {
		...Tr(qo, [
			"isAdmin",
			"isHrManager",
			"canApprove"
		]),
		isPrivileged() {
			return this.isAdmin || this.isHrManager || this.canApprove;
		}
	},
	created() {
		this.load();
	},
	methods: {
		onMonthChange({ year: e, month: n }) {
			this.month = {
				year: e,
				month: n
			}, this.load();
		},
		async load() {
			this.loading = !0;
			try {
				let [e, n] = await Promise.all([Go.getOverview(this.month.year, this.month.month), pD.getByYear(this.month.year)]);
				this.overview = Array.isArray(e) ? e : e?.data || [];
				let r = Array.isArray(n) ? n : n?.data || [];
				this.holidays = r.map((e) => ({
					date: e.date,
					name: e.name
				}));
			} catch (e) {
				console.error("Failed to load team overview:", e), this.overview = [];
			} finally {
				this.loading = !1;
			}
		}
	}
}, hD = { class: "team-view" }, gD = { class: "view-header" }, _D = { class: "view-toolbar" }, vD = ["aria-label"], yD = { class: "view-header__nav" };
function bD(e, r, i, a, o, s) {
	let c = P("FlagOutline"), l = P("TagOutline"), u = P("MonthPicker"), d = P("NcLoadingIcon"), f = P("AbsenceTimeline"), p = P("AccountGroupIcon"), m = P("NcEmptyContent");
	return J(), H("div", hD, [
		n("div", gD, [n("h2", null, U(e.t("worktime", "Team")), 1)]),
		r[5] ||= z(),
		n("div", _D, [
			n("div", {
				class: "seg",
				role: "group",
				"aria-label": e.t("worktime", "Färbung")
			}, [
				n("button", {
					class: G(["seg-btn", { active: o.colorBy === "status" }]),
					onClick: r[0] ||= (e) => o.colorBy = "status"
				}, [I(c, { size: 18 }), z(" " + U(e.t("worktime", "Nach Status")), 1)], 2),
				r[2] ||= z(),
				n("button", {
					class: G(["seg-btn", { active: o.colorBy === "type" }]),
					onClick: r[1] ||= (e) => o.colorBy = "type"
				}, [I(l, { size: 18 }), z(" " + U(e.t("worktime", "Nach Art")), 1)], 2)
			], 8, vD),
			r[3] ||= z(),
			n("div", yD, [I(u, {
				year: o.month.year,
				month: o.month.month,
				onUpdate: s.onMonthChange
			}, null, 8, [
				"year",
				"month",
				"onUpdate"
			])])
		]),
		r[6] ||= z(),
		o.loading ? (J(), L(d, {
			key: 0,
			size: 44
		})) : o.overview.length > 0 ? (J(), L(f, {
			key: 1,
			employees: o.overview,
			year: o.month.year,
			month: o.month.month,
			holidays: o.holidays,
			"color-by": o.colorBy,
			"show-full-legend": s.isPrivileged
		}, null, 8, [
			"employees",
			"year",
			"month",
			"holidays",
			"color-by",
			"show-full-legend"
		])) : (J(), L(m, {
			key: 2,
			name: e.t("worktime", "Kein Team")
		}, {
			icon: A(() => [I(p)]),
			description: A(() => [z(U(e.t("worktime", "Aktuell sind keine Team-Abwesenheiten sichtbar.")), 1)]),
			_: 1
		}, 8, ["name"]))
	]);
}
var xD = /*#__PURE__*/ Y(mD, [["render", bD], ["__scopeId", "data-v-d470fb46"]]), SD = {
	name: "CheckIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, CD = ["aria-hidden", "aria-label"], wD = [
	"fill",
	"width",
	"height"
], TD = { key: 0 };
function ED(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon check-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", TD, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }, null, -1)
	], 8, wD))], 16, CD);
}
var DD = /*#__PURE__*/ Y(SD, [["render", ED]]), OD = {
	name: "ClockOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, kD = ["aria-hidden", "aria-label"], AD = [
	"fill",
	"width",
	"height"
], jD = { key: 0 };
function MD(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon clock-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", jD, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" }, null, -1)
	], 8, AD))], 16, kD);
}
var ND = /*#__PURE__*/ Y(OD, [["render", MD]]), PD = {
	name: "AlertOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, FD = ["aria-hidden", "aria-label"], ID = [
	"fill",
	"width",
	"height"
], LD = { key: 0 };
function RD(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon alert-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", LD, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" }, null, -1)
	], 8, ID))], 16, FD);
}
var zD = /*#__PURE__*/ Y(PD, [["render", RD]]), BD = {
	name: "RestoreIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, VD = ["aria-hidden", "aria-label"], HD = [
	"fill",
	"width",
	"height"
], UD = { key: 0 };
function WD(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon restore-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", UD, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" }, null, -1)
	], 8, HD))], 16, VD);
}
var GD = /*#__PURE__*/ Y(BD, [["render", WD]]), KD = {
	async getActive() {
		try {
			return (await X.get("/departments")).data;
		} catch (e) {
			Z(e);
		}
	},
	async getAll() {
		try {
			return (await X.get("/departments/all")).data;
		} catch (e) {
			Z(e);
		}
	},
	async get(e) {
		try {
			return (await X.get(`/departments/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e) {
		try {
			return (await X.post("/departments", e)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n) {
		try {
			return (await X.put(`/departments/${e}`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e) {
		try {
			await X.delete(`/departments/${e}`);
		} catch (e) {
			Z(e);
		}
	},
	async deletionImpact(e) {
		try {
			return (await X.get(`/departments/${e}/deletion-impact`)).data;
		} catch (e) {
			Z(e);
		}
	}
}, qD = wr("departments", () => {
	let e = W([]), n = W(!1), r = W(null), i = M(() => e.value.filter((e) => e.isActive));
	function a(n) {
		return e.value.find((e) => e.id === n);
	}
	async function o(i = !1) {
		n.value = !0, r.value = null;
		try {
			e.value = i ? await KD.getAll() : await KD.getActive();
		} catch (e) {
			r.value = Jo(e);
		} finally {
			n.value = !1;
		}
	}
	async function s(n) {
		let r = await KD.create(n);
		return e.value.push(r), r;
	}
	async function c({ id: n, data: r }) {
		let i = await KD.update(n, r);
		return Yo(e.value, i), i;
	}
	async function l(n) {
		await KD.delete(n), e.value = e.value.filter((e) => e.id !== n);
	}
	return {
		departments: e,
		loading: n,
		error: r,
		activeDepartments: i,
		getDepartmentById: a,
		fetchDepartments: o,
		createDepartment: s,
		updateDepartment: c,
		deleteDepartment: l
	};
}), JD = {
	name: "MonthApprovalModal",
	components: {
		NcModal: Kt,
		NcButton: Ye,
		NcLoadingIcon: g,
		NcCheckboxRadioSwitch: tt,
		CheckIcon: DD,
		RestoreIcon: GD,
		FilePdfBoxIcon: pv
	},
	props: {
		item: {
			type: Object,
			required: !0
		},
		archiveConfigured: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"approve",
		"reject",
		"close"
	],
	data() {
		return {
			entries: [],
			loading: !0,
			archiveAfterApprove: !1
		};
	},
	computed: {
		monthLabel() {
			return `${Jv(this.item.month)} ${this.item.year}`;
		},
		sortedEntries() {
			return this.entries.slice().sort((e, n) => {
				let r = (e.date || "").localeCompare(n.date || "");
				return r === 0 ? (e.startTime || "").localeCompare(n.startTime || "") : r;
			});
		},
		totalLabel() {
			return `${fy(this.entries.reduce((e, n) => e + (n.workMinutes || 0), 0))} h`;
		}
	},
	async mounted() {
		try {
			let e = await Sv.getByEmployee(this.item.employeeId, this.item.year, this.item.month);
			this.entries = Array.isArray(e) ? e : e?.data || [];
		} catch (e) {
			console.error("Failed to load month entries:", e), qt(t("worktime", "Fehler beim Laden der Monatseinträge"));
		} finally {
			this.loading = !1;
		}
	},
	methods: {
		formatDate: Gv,
		downloadPdf() {
			bw.downloadPdf(this.item.employeeId, this.item.year, this.item.month);
		},
		hoursLabel(e) {
			return `${fy(e || 0)} h`;
		}
	}
}, YD = { class: "month-detail" }, XD = { id: "wt-month-approval-title" }, ZD = { class: "month-detail__summary" }, QD = { class: "month-detail__total" }, $D = {
	key: 1,
	class: "month-detail__empty"
}, eO = {
	key: 2,
	class: "month-detail__card"
}, tO = { class: "month-table" }, nO = { class: "num" }, rO = { class: "num" }, iO = { class: "nowrap" }, aO = { class: "nowrap" }, oO = { class: "num" }, sO = { class: "num" }, cO = { class: "desc" }, lO = { class: "month-detail__actions" };
function uO(e, r, i, a, o, s) {
	let c = P("NcLoadingIcon"), l = P("NcCheckboxRadioSwitch"), d = P("FilePdfBoxIcon"), f = P("NcButton"), p = P("RestoreIcon"), m = P("CheckIcon"), h = P("NcModal");
	return J(), L(h, {
		size: "large",
		"label-id": "wt-month-approval-title",
		onClose: r[3] ||= (n) => e.$emit("close")
	}, {
		default: A(() => [n("div", YD, [
			n("h3", XD, U(i.item.employeeName) + " · " + U(s.monthLabel), 1),
			r[19] ||= z(),
			n("div", ZD, [
				n("span", null, U(o.entries.length) + " " + U(e.t("worktime", "Einträge")), 1),
				r[4] ||= z(),
				n("span", QD, U(s.totalLabel), 1)
			]),
			r[20] ||= z(),
			o.loading ? (J(), L(c, {
				key: 0,
				size: 44,
				class: "month-detail__loading"
			})) : o.entries.length ? (J(), H("div", eO, [n("table", tO, [
				n("thead", null, [n("tr", null, [
					n("th", null, U(e.t("worktime", "Datum")), 1),
					r[5] ||= z(),
					n("th", null, U(e.t("worktime", "Zeiten")), 1),
					r[6] ||= z(),
					n("th", nO, U(e.t("worktime", "Pause")), 1),
					r[7] ||= z(),
					n("th", rO, U(e.t("worktime", "Stunden")), 1),
					r[8] ||= z(),
					n("th", null, U(e.t("worktime", "Projekt")), 1),
					r[9] ||= z(),
					n("th", null, U(e.t("worktime", "Beschreibung")), 1)
				])]),
				r[15] ||= z(),
				n("tbody", null, [(J(!0), H(F, null, u(s.sortedEntries, (i) => (J(), H("tr", { key: i.id }, [
					n("td", iO, U(s.formatDate(i.date)), 1),
					r[10] ||= z(),
					n("td", aO, U(i.startTime) + " – " + U(i.endTime), 1),
					r[11] ||= z(),
					n("td", oO, U(i.breakMinutes) + " " + U(e.t("worktime", "Min")), 1),
					r[12] ||= z(),
					n("td", sO, U(s.hoursLabel(i.workMinutes)), 1),
					r[13] ||= z(),
					n("td", null, U(i.projectName || "–"), 1),
					r[14] ||= z(),
					n("td", cO, U(i.description || ""), 1)
				]))), 128))])
			])])) : (J(), H("p", $D, U(e.t("worktime", "Keine Einträge in diesem Monat.")), 1)),
			r[21] ||= z(),
			n("div", lO, [
				i.archiveConfigured ? (J(), L(l, {
					key: 0,
					modelValue: o.archiveAfterApprove,
					"onUpdate:modelValue": r[0] ||= (e) => o.archiveAfterApprove = e,
					class: "month-detail__archive-toggle"
				}, {
					default: A(() => [z(U(e.t("worktime", "PDF nach dem Genehmigen sofort archivieren")), 1)]),
					_: 1
				}, 8, ["modelValue"])) : K("", !0),
				r[16] ||= z(),
				I(f, {
					variant: "tertiary",
					onClick: s.downloadPdf
				}, {
					icon: A(() => [I(d, { size: 18 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Monatsbericht als PDF")), 1)]),
					_: 1
				}, 8, ["onClick"]),
				r[17] ||= z(),
				I(f, {
					variant: "tertiary",
					onClick: r[1] ||= (n) => e.$emit("reject")
				}, {
					icon: A(() => [I(p, { size: 18 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Zurückweisen")), 1)]),
					_: 1
				}),
				r[18] ||= z(),
				I(f, {
					variant: "primary",
					onClick: r[2] ||= (n) => e.$emit("approve", o.archiveAfterApprove)
				}, {
					icon: A(() => [I(m, { size: 18 })]),
					default: A(() => [z(" " + U(e.t("worktime", "Genehmigen")), 1)]),
					_: 1
				})
			])
		])]),
		_: 1
	});
}
var dO = /*#__PURE__*/ Y(JD, [["render", uO], ["__scopeId", "data-v-0ae5edc3"]]);
function fO(e, n, r, i) {
	let a = /* @__PURE__ */ new Set(), o = !1;
	for (let r of e) {
		let e = n(r);
		e == null ? o = !0 : a.add(e);
	}
	let s = [...a].map((e) => ({
		id: e,
		label: r(e)
	})).sort((e, n) => e.label.localeCompare(n.label));
	return o && s.push({
		id: 0,
		label: i
	}), s;
}
function pO(e, n) {
	return n === null ? !0 : n === 0 ? e == null : e === n;
}
// src/views/ApprovalOverviewView.vue
var mO = {
	name: "ApprovalOverviewView",
	components: {
		InfoIcon: sv,
		MonthApprovalModal: dO,
		NcSelect: Xt,
		NcLoadingIcon: g,
		NcEmptyContent: Gt,
		NcAvatar: Dn,
		NcButton: Ye,
		NcModal: Kt,
		CheckIcon: DD,
		CloseIcon: Yw,
		FormatListBulletedIcon: yv,
		CalendarIcon: Pa,
		ClockOutlineIcon: ND,
		AlertOutlineIcon: zD,
		RestoreIcon: GD
	},
	data() {
		return {
			pendingAbsences: [],
			pendingMonths: [],
			pendingEmergency: [],
			informationalAbsences: [],
			loading: !1,
			kindFilter: "all",
			filterDepartmentId: null,
			processingAbsence: null,
			processingMonth: null,
			processingEmergency: null,
			showRejectModal: !1,
			rejectTarget: null,
			rejectReason: "",
			rejectingKey: null,
			detailItem: null,
			archiveConfigured: !1,
			statusView: "open",
			approvedMonths: [],
			approvedLoaded: !1,
			approvedLoading: !1,
			approvedVisible: 50,
			showReopenModal: !1,
			reopenTarget: null,
			reopenReason: "",
			reopeningKey: null
		};
	},
	computed: {
		...Tr(qD, ["departments"]),
		...Tr($o, ["employees"]),
		...Tr(qo, ["canManageSettings"]),
		departmentsById() {
			let e = {};
			for (let n of this.departments) e[n.id] = n;
			return e;
		},
		departmentName() {
			return (e) => this.departmentsById[e]?.name || this.t("worktime", "Abteilung");
		},
		employeeDeptById() {
			let e = {};
			for (let n of this.employees) e[n.id] = n.departmentId ?? null;
			return e;
		},
		employeeDeptByUserId() {
			let e = {};
			for (let n of this.employees) e[n.userId] = n.departmentId ?? null;
			return e;
		},
		itemDepartmentId() {
			return (e) => e.employeeId == null ? e.employeeUserId == null ? null : this.employeeDeptByUserId[e.employeeUserId] ?? null : this.employeeDeptById[e.employeeId] ?? null;
		},
		departmentOptions() {
			return fO(this.inboxItems, (e) => this.itemDepartmentId(e), (e) => this.departmentName(e), this.t("worktime", "Ohne Abteilung"));
		},
		selectedDepartment: {
			get() {
				return this.departmentOptions.find((e) => e.id === this.filterDepartmentId) || null;
			},
			set(e) {
				this.filterDepartmentId = e ? e.id : null;
			}
		},
		absenceItems() {
			return this.pendingAbsences.map((e) => ({
				key: "a-" + e.id,
				kind: "absence",
				id: e.id,
				employeeName: e.employeeName,
				employeeUserId: e.employeeUserId,
				typeLabel: xy(e.type),
				detail: `${Gv(e.startDate)} – ${Gv(e.endDate)} · ${yy(e.days)}`,
				note: e.note || "",
				waitingSince: (e.createdAt || e.startDate || "").slice(0, 10)
			}));
		},
		monthItems() {
			return this.pendingMonths.map((e) => ({
				key: `m-${e.employeeId}-${e.year}-${e.month}`,
				kind: "month",
				employeeId: e.employeeId,
				year: e.year,
				month: e.month,
				employeeName: e.employeeName,
				employeeUserId: e.employeeUserId,
				detail: `${this.getMonthName(e.month)} ${e.year} · ${fy(e.actualMinutes)} h · ${e.entryCount} ${t("worktime", "Einträge")}`,
				waitingSince: (e.submittedAt || `${e.year}-${String(e.month).padStart(2, "0")}-01`).slice(0, 10)
			}));
		},
		emergencyItems() {
			return this.pendingEmergency.map((e) => ({
				key: "e-" + e.id,
				kind: "emergency",
				id: e.id,
				employeeName: e.employeeName,
				employeeUserId: e.employeeUserId,
				typeLabel: t("worktime", "Notarbeit"),
				detail: `${Gv(e.date)} · ${fy(e.workMinutes)} h`,
				note: e.description || "",
				waitingSince: (e.date || "").slice(0, 10)
			}));
		},
		inboxItems() {
			return [
				...this.absenceItems,
				...this.monthItems,
				...this.emergencyItems
			].sort((e, n) => e.waitingSince.localeCompare(n.waitingSince));
		},
		absenceCount() {
			return this.absenceItems.length;
		},
		monthCount() {
			return this.monthItems.length;
		},
		filteredItems() {
			return this.inboxItems.filter((e) => (this.kindFilter === "all" || e.kind === this.kindFilter) && pO(this.itemDepartmentId(e), this.filterDepartmentId));
		},
		visibleApprovedMonths() {
			return this.approvedMonths.slice(0, this.approvedVisible);
		}
	},
	created() {
		this.loadData(), qD().fetchDepartments(), $o().fetchEmployees();
	},
	beforeUnmount() {
		this._approvedObserver && this._approvedObserver.disconnect();
	},
	methods: {
		formatDaysLabel: yy,
		getAbsenceTypeLabel: xy,
		formatDate: Gv,
		getMonthName(e) {
			return [
				t("worktime", "Januar"),
				t("worktime", "Februar"),
				t("worktime", "März"),
				t("worktime", "April"),
				t("worktime", "Mai"),
				t("worktime", "Juni"),
				t("worktime", "Juli"),
				t("worktime", "August"),
				t("worktime", "September"),
				t("worktime", "Oktober"),
				t("worktime", "November"),
				t("worktime", "Dezember")
			][e - 1] || String(e);
		},
		approvedKey(e) {
			return `${e.employeeId}-${e.year}-${e.month}`;
		},
		approvedMonthLabel(e) {
			return `${this.getMonthName(e.month)} ${e.year}`;
		},
		hoursLabel(e) {
			return `${fy(e)} h`;
		},
		async showApproved() {
			this.statusView = "approved", this.approvedLoaded || await this.loadApprovedMonths(), this.$nextTick(() => this.setupApprovedObserver());
		},
		async loadApprovedMonths() {
			this.approvedLoading = !0;
			try {
				let e = await Sv.getApprovedMonths();
				this.approvedMonths = e || [], this.approvedVisible = 50, this.approvedLoaded = !0;
			} catch (e) {
				console.error("Failed to load approved months:", e);
			} finally {
				this.approvedLoading = !1;
			}
		},
		setupApprovedObserver() {
			this._approvedObserver && this._approvedObserver.disconnect();
			let e = this.$refs.approvedSentinel;
			e && typeof IntersectionObserver < "u" && (this._approvedObserver = new IntersectionObserver((e) => {
				e[0].isIntersecting && this.approvedVisible < this.approvedMonths.length && (this.approvedVisible += 50);
			}), this._approvedObserver.observe(e));
		},
		openReopenApproved(e) {
			this.reopenTarget = e, this.reopenReason = "", this.showReopenModal = !0;
		},
		closeReopenModal() {
			this.showReopenModal = !1, this.reopenTarget = null, this.reopenReason = "";
		},
		async submitReopenApproved() {
			if (!this.reopenTarget || !this.reopenReason.trim()) return;
			let e = this.reopenTarget;
			this.reopeningKey = this.approvedKey(e);
			try {
				let n = await Sv.reopenMonth(e.employeeId, e.year, e.month, this.reopenReason.trim());
				$t(t("worktime", "{count} Einträge zur Korrektur freigegeben", { count: n.reopened })), this.closeReopenModal(), await this.loadApprovedMonths();
			} catch (e) {
				console.error("Failed to reopen month:", e), qt(t("worktime", "Fehler beim Zurücknehmen der Genehmigung"));
			} finally {
				this.reopeningKey = null;
			}
		},
		async loadData() {
			this.loading = !0;
			let e = await Promise.allSettled([
				Go.getPending(),
				Sv.getPendingMonths(),
				Go.getInformational(),
				this.canManageSettings ? Sv.getArchiveStatus() : Promise.resolve({ configured: !1 }),
				Sv.getPendingEmergency()
			]);
			this.pendingAbsences = e[0].status === "fulfilled" && e[0].value || [], this.pendingMonths = e[1].status === "fulfilled" && e[1].value || [], this.informationalAbsences = e[2].status === "fulfilled" && e[2].value || [], this.archiveConfigured = e[3].status === "fulfilled" && !!e[3].value?.configured, this.pendingEmergency = e[4].status === "fulfilled" && e[4].value || [];
			let n = e.some((e) => e.status === "rejected");
			e.forEach((e, n) => {
				e.status === "rejected" && console.error(`Failed: ${[
					"getPending",
					"getPendingMonths",
					"getInformational",
					"getArchiveStatus",
					"getPendingEmergency"
				][n]}`, e.reason);
			}), n && qt(t("worktime", "Genehmigungsdaten konnten nicht vollständig geladen werden. Die Liste ist möglicherweise unvollständig.")), this.loading = !1;
		},
		async approveAbsence(e) {
			this.processingAbsence = e;
			try {
				await Go.approve(e), $t(t("worktime", "Abwesenheit genehmigt")), await this.loadData();
			} catch (e) {
				console.error("Failed to approve absence:", e), qt(e.message || t("worktime", "Fehler beim Genehmigen"));
			} finally {
				this.processingAbsence = null;
			}
		},
		async approveEmergencyItem(e) {
			this.processingEmergency = e.id;
			try {
				await Sv.approveEmergency(e.id), $t(t("worktime", "Notarbeit freigegeben")), await this.loadData();
			} catch (e) {
				console.error("Failed to approve emergency work:", e), qt(e.message || t("worktime", "Fehler beim Genehmigen"));
			} finally {
				this.processingEmergency = null;
			}
		},
		async rejectAbsence(e) {
			this.processingAbsence = e;
			try {
				await Go.reject(e), $t(t("worktime", "Abwesenheit abgelehnt")), await this.loadData();
			} catch (e) {
				console.error("Failed to reject absence:", e), qt(t("worktime", "Fehler beim Ablehnen"));
			} finally {
				this.processingAbsence = null;
			}
		},
		openMonthDetail(e) {
			this.detailItem = e;
		},
		onModalApprove(e) {
			let n = this.detailItem;
			this.detailItem = null, this.approveMonthItem(n, e);
		},
		onModalReject() {
			let e = this.detailItem;
			this.detailItem = null, setTimeout(() => this.openRejectModal(e), 300);
		},
		async approveMonthItem(e, n = !1) {
			this.processingMonth = e.key;
			try {
				let r = await Sv.approveMonth(e.employeeId, e.year, e.month);
				n ? await this.archiveAndNotify(e, r.approved) : r.archiveQueued ? $t(t("worktime", "{count} Einträge genehmigt – PDF wird im Hintergrund archiviert (kann einige Minuten dauern).", { count: r.approved })) : $t(t("worktime", "{count} Einträge genehmigt", { count: r.approved })), await this.loadData();
			} catch (e) {
				console.error("Failed to approve month:", e), qt(t("worktime", "Fehler beim Genehmigen"));
			} finally {
				this.processingMonth = null;
			}
		},
		async archiveAndNotify(e, n) {
			try {
				let r = await Sv.archiveNow(e.employeeId, e.year, e.month);
				r?.result === "replaced" ? $t(t("worktime", "{count} Einträge genehmigt – PDF im Archiv aktualisiert.", { count: n })) : r?.result === "created" ? $t(t("worktime", "{count} Einträge genehmigt – PDF im Archiv erstellt.", { count: n })) : $t(t("worktime", "{count} Einträge genehmigt", { count: n }));
			} catch (e) {
				console.error("Archive now failed:", e), qt(t("worktime", "Genehmigt, aber Archivierung fehlgeschlagen."));
			}
		},
		openRejectModal(e) {
			this.rejectTarget = e, this.rejectReason = "", this.showRejectModal = !0;
		},
		closeRejectModal() {
			this.showRejectModal = !1, this.rejectTarget = null, this.rejectReason = "";
		},
		async submitReject() {
			if (!this.rejectTarget || !this.rejectReason.trim()) return;
			let e = this.rejectTarget;
			this.rejectingKey = e.key;
			try {
				let n = await Sv.rejectMonth(e.employeeId, e.year, e.month, this.rejectReason.trim());
				$t(t("worktime", "{count} Einträge zurückgewiesen", { count: n.rejected })), this.closeRejectModal(), await this.loadData();
			} catch (e) {
				console.error("Failed to reject month:", e), qt(t("worktime", "Fehler beim Zurückweisen"));
			} finally {
				this.rejectingKey = null;
			}
		}
	}
}, hO = { class: "approval-view" }, gO = { class: "view-header" }, _O = { class: "view-toolbar status-toolbar" }, vO = ["aria-label"], yO = {
	key: 0,
	class: "inbox"
}, bO = { class: "view-toolbar" }, xO = ["aria-label"], SO = {
	key: 0,
	class: "dept-filter"
}, CO = { for: "approvalDeptFilter" }, wO = { class: "approval-card" }, TO = { class: "approval-table" }, EO = { class: "actions-col" }, DO = ["onClick"], OO = { class: "who" }, kO = { class: "employee-name" }, AO = { class: "detail" }, jO = {
	key: 0,
	class: "note-line"
}, MO = { class: "note-label" }, NO = { class: "actions-col" }, PO = {
	key: 1,
	class: "info-section"
}, FO = { class: "approval-card" }, IO = { class: "approval-table" }, LO = { class: "who" }, RO = { class: "employee-name" }, zO = { class: "kind sick" }, BO = { class: "detail" }, VO = {
	key: 1,
	class: "approval-card"
}, HO = { class: "approval-table" }, UO = { class: "actions-col" }, WO = { class: "who" }, GO = { class: "employee-name" }, KO = { class: "detail" }, qO = { class: "detail" }, JO = { class: "actions-col" }, YO = { class: "actions" }, XO = {
	ref: "approvedSentinel",
	class: "approved-sentinel"
}, ZO = { class: "reject-modal" }, QO = { id: "wt-reject-month-title" }, $O = { for: "reject-reason" }, ek = ["placeholder"], tk = { class: "form-actions" }, nk = { class: "reject-modal" }, rk = { id: "wt-reopen-month-title" }, ik = { class: "reopen-hint" }, ak = { for: "reopen-reason" }, ok = ["placeholder"], sk = { class: "form-actions" };
function ck(e, r, i, a, o, s) {
	let c = P("NcLoadingIcon"), l = P("FormatListBulletedIcon"), d = P("CalendarIcon"), f = P("ClockOutlineIcon"), p = P("AlertOutlineIcon"), m = P("NcSelect"), h = P("NcAvatar"), g = P("CheckIcon"), _ = P("NcButton"), v = P("CloseIcon"), b = P("InfoIcon"), x = P("NcEmptyContent"), S = P("RestoreIcon"), C = P("NcModal"), w = P("MonthApprovalModal");
	return J(), H("div", hO, [
		n("div", gO, [n("h2", null, U(e.t("worktime", "Genehmigungen")), 1)]),
		r[61] ||= z(),
		o.loading ? (J(), L(c, {
			key: 0,
			size: 44,
			class: "loading"
		})) : (J(), H(F, { key: 1 }, [
			n("div", _O, [n("div", {
				class: "layout-seg",
				role: "group",
				"aria-label": e.t("worktime", "Status")
			}, [
				n("button", {
					class: G(["seg-btn", { active: o.statusView === "open" }]),
					onClick: r[0] ||= (e) => o.statusView = "open"
				}, U(e.t("worktime", "Offen")), 3),
				r[11] ||= z(),
				n("button", {
					class: G(["seg-btn", { active: o.statusView === "approved" }]),
					onClick: r[1] ||= (e) => s.showApproved()
				}, U(e.t("worktime", "Genehmigt")), 3)
			], 8, vO)]),
			r[49] ||= z(),
			o.statusView === "open" ? (J(), H(F, { key: 0 }, [
				s.inboxItems.length > 0 ? (J(), H("section", yO, [
					n("div", bO, [
						n("div", {
							class: "layout-seg",
							role: "group",
							"aria-label": e.t("worktime", "Filter")
						}, [
							n("button", {
								class: G(["seg-btn", { active: o.kindFilter === "all" }]),
								onClick: r[2] ||= (e) => o.kindFilter = "all"
							}, [I(l, { size: 18 }), z(" " + U(e.t("worktime", "Alle")), 1)], 2),
							r[12] ||= z(),
							n("button", {
								class: G(["seg-btn", { active: o.kindFilter === "absence" }]),
								onClick: r[3] ||= (e) => o.kindFilter = "absence"
							}, [I(d, { size: 18 }), z(" " + U(e.t("worktime", "Urlaub")), 1)], 2),
							r[13] ||= z(),
							n("button", {
								class: G(["seg-btn", { active: o.kindFilter === "month" }]),
								onClick: r[4] ||= (e) => o.kindFilter = "month"
							}, [I(f, { size: 18 }), z(" " + U(e.t("worktime", "Zeiten")), 1)], 2),
							r[14] ||= z(),
							s.emergencyItems.length > 0 ? (J(), H("button", {
								key: 0,
								class: G(["seg-btn", { active: o.kindFilter === "emergency" }]),
								onClick: r[5] ||= (e) => o.kindFilter = "emergency"
							}, [I(p, { size: 18 }), z(" " + U(e.t("worktime", "Notarbeit")), 1)], 2)) : K("", !0)
						], 8, xO),
						r[16] ||= z(),
						s.departmentOptions.length > 1 || o.filterDepartmentId !== null ? (J(), H("div", SO, [
							n("label", CO, U(e.t("worktime", "Abteilung")), 1),
							r[15] ||= z(),
							I(m, {
								"label-outside": "",
								id: "approvalDeptFilter",
								modelValue: s.selectedDepartment,
								"onUpdate:modelValue": r[6] ||= (e) => s.selectedDepartment = e,
								options: s.departmentOptions,
								placeholder: e.t("worktime", "Alle Abteilungen"),
								label: "label",
								class: "dept-filter-select"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder"
							])
						])) : K("", !0)
					]),
					r[29] ||= z(),
					n("div", wO, [n("table", TO, [
						n("thead", null, [n("tr", null, [
							n("th", null, U(e.t("worktime", "Mitarbeiter")), 1),
							r[17] ||= z(),
							n("th", null, U(e.t("worktime", "Art")), 1),
							r[18] ||= z(),
							n("th", null, U(e.t("worktime", "Details")), 1),
							r[19] ||= z(),
							n("th", EO, U(e.t("worktime", "Aktion")), 1)
						])]),
						r[28] ||= z(),
						n("tbody", null, [(J(!0), H(F, null, u(s.filteredItems, (i) => (J(), H("tr", {
							key: i.key,
							class: G({ "row-clickable": i.kind === "month" }),
							onClick: (e) => i.kind === "month" && s.openMonthDetail(i)
						}, [
							n("td", null, [n("div", OO, [
								I(h, {
									user: i.employeeUserId,
									"display-name": i.employeeName,
									size: 30
								}, null, 8, ["user", "display-name"]),
								r[20] ||= z(),
								n("span", kO, U(i.employeeName), 1)
							])]),
							r[25] ||= z(),
							n("td", null, [n("span", { class: G(["kind", i.kind]) }, [r[21] ||= n("span", { class: "kind-dot" }, null, -1), z(" " + U(i.kind === "month" ? e.t("worktime", "Monat") : i.typeLabel), 1)], 2)]),
							r[26] ||= z(),
							n("td", AO, [
								n("div", null, U(i.detail), 1),
								r[22] ||= z(),
								i.note ? (J(), H("div", jO, [n("span", MO, U(e.t("worktime", "Bemerkung")) + ":", 1), z(" " + U(i.note), 1)])) : K("", !0)
							]),
							r[27] ||= z(),
							n("td", NO, [n("div", {
								class: "actions",
								onClick: r[7] ||= D(() => {}, ["stop"])
							}, [i.kind === "absence" ? (J(), H(F, { key: 0 }, [
								I(_, {
									variant: "primary",
									disabled: o.processingAbsence === i.id,
									onClick: (e) => s.approveAbsence(i.id)
								}, {
									icon: A(() => [I(g, { size: 18 })]),
									default: A(() => [z(" " + U(e.t("worktime", "Genehmigen")), 1)]),
									_: 1
								}, 8, ["disabled", "onClick"]),
								r[23] ||= z(),
								I(_, {
									variant: "tertiary",
									disabled: o.processingAbsence === i.id,
									onClick: (e) => s.rejectAbsence(i.id)
								}, {
									icon: A(() => [I(v, { size: 18 })]),
									default: A(() => [z(" " + U(e.t("worktime", "Ablehnen")), 1)]),
									_: 1
								}, 8, ["disabled", "onClick"])
							], 64)) : i.kind === "emergency" ? (J(), L(_, {
								key: 1,
								variant: "primary",
								disabled: o.processingEmergency === i.id,
								onClick: (e) => s.approveEmergencyItem(i)
							}, {
								icon: A(() => [I(g, { size: 18 })]),
								default: A(() => [z(" " + U(e.t("worktime", "Genehmigen")), 1)]),
								_: 1
							}, 8, ["disabled", "onClick"])) : (J(), H(F, { key: 2 }, [
								I(_, {
									variant: "primary",
									disabled: o.processingMonth === i.key,
									onClick: (e) => s.approveMonthItem(i)
								}, {
									icon: A(() => [I(g, { size: 18 })]),
									default: A(() => [z(" " + U(e.t("worktime", "Genehmigen")), 1)]),
									_: 1
								}, 8, ["disabled", "onClick"]),
								r[24] ||= z(),
								I(_, {
									variant: "tertiary",
									disabled: o.processingMonth === i.key,
									onClick: (e) => s.openRejectModal(i)
								}, {
									icon: A(() => [I(v, { size: 18 })]),
									default: A(() => [z(" " + U(e.t("worktime", "Zurückweisen")), 1)]),
									_: 1
								}, 8, ["disabled", "onClick"])
							], 64))])])
						], 10, DO))), 128))])
					])])
				])) : K("", !0),
				r[38] ||= z(),
				o.informationalAbsences.length > 0 ? (J(), H("section", PO, [
					n("h3", null, [
						z(U(e.t("worktime", "Zur Kenntnisnahme")) + " ", 1),
						I(b, null, {
							default: A(() => [z(U(e.t("worktime", "Diese Abwesenheiten (z.B. Krankheit) werden nur gemeldet und brauchen keine Genehmigung. Sie werden automatisch in der Sollberechnung berücksichtigt.")), 1)]),
							_: 1
						}),
						z("\n                    (" + U(o.informationalAbsences.length) + ")\n                ", 1)
					]),
					r[36] ||= z(),
					n("div", FO, [n("table", IO, [n("tbody", null, [(J(!0), H(F, null, u(o.informationalAbsences, (e) => (J(), H("tr", { key: "info-" + e.id }, [
						n("td", null, [n("div", LO, [
							I(h, {
								user: e.employeeUserId,
								"display-name": e.employeeName,
								size: 30
							}, null, 8, ["user", "display-name"]),
							r[30] ||= z(),
							n("span", RO, U(e.employeeName), 1)
						])]),
						r[32] ||= z(),
						n("td", null, [n("span", zO, [r[31] ||= n("span", { class: "kind-dot" }, null, -1), z(U(s.getAbsenceTypeLabel(e.type)), 1)])]),
						r[33] ||= z(),
						n("td", BO, U(s.formatDate(e.startDate)) + " – " + U(s.formatDate(e.endDate)) + " · " + U(s.formatDaysLabel(e.days)), 1),
						r[34] ||= z(),
						r[35] ||= n("td", { class: "actions-col" }, null, -1)
					]))), 128))])])])
				])) : K("", !0),
				r[39] ||= z(),
				s.inboxItems.length === 0 && o.informationalAbsences.length === 0 ? (J(), L(x, {
					key: 2,
					name: e.t("worktime", "Keine offenen Genehmigungen")
				}, {
					icon: A(() => [I(g)]),
					description: A(() => [z(U(e.t("worktime", "Aktuell wartet nichts auf deine Genehmigung.")), 1)]),
					_: 1
				}, 8, ["name"])) : K("", !0)
			], 64)) : (J(), H(F, { key: 1 }, [o.approvedLoading ? (J(), L(c, {
				key: 0,
				size: 44,
				class: "loading"
			})) : o.approvedMonths.length ? (J(), H("div", VO, [
				n("table", HO, [
					n("thead", null, [n("tr", null, [
						n("th", null, U(e.t("worktime", "Mitarbeiter")), 1),
						r[40] ||= z(),
						n("th", null, U(e.t("worktime", "Zeitraum")), 1),
						r[41] ||= z(),
						n("th", null, U(e.t("worktime", "Genehmigt am")), 1),
						r[42] ||= z(),
						n("th", UO, U(e.t("worktime", "Aktion")), 1)
					])]),
					r[47] ||= z(),
					n("tbody", null, [(J(!0), H(F, null, u(s.visibleApprovedMonths, (i) => (J(), H("tr", { key: s.approvedKey(i) }, [
						n("td", null, [n("div", WO, [
							I(h, {
								user: i.employeeUserId,
								"display-name": i.employeeName,
								size: 30
							}, null, 8, ["user", "display-name"]),
							r[43] ||= z(),
							n("span", GO, U(i.employeeName), 1)
						])]),
						r[44] ||= z(),
						n("td", KO, U(s.approvedMonthLabel(i)) + " · " + U(s.hoursLabel(i.actualMinutes)), 1),
						r[45] ||= z(),
						n("td", qO, U(i.approvedAt ? s.formatDate(i.approvedAt) : "–"), 1),
						r[46] ||= z(),
						n("td", JO, [n("div", YO, [I(_, {
							variant: "tertiary",
							disabled: o.reopeningKey === s.approvedKey(i),
							onClick: (e) => s.openReopenApproved(i)
						}, {
							icon: A(() => [I(S, { size: 18 })]),
							default: A(() => [z(" " + U(e.t("worktime", "Genehmigung zurücknehmen")), 1)]),
							_: 1
						}, 8, ["disabled", "onClick"])])])
					]))), 128))])
				]),
				r[48] ||= z(),
				n("div", XO, null, 512)
			])) : (J(), L(x, {
				key: 2,
				name: e.t("worktime", "Keine genehmigten Monate")
			}, {
				icon: A(() => [I(g)]),
				_: 1
			}, 8, ["name"]))], 64))
		], 64)),
		r[62] ||= z(),
		o.showRejectModal ? (J(), L(C, {
			key: 2,
			"label-id": "wt-reject-month-title",
			onClose: s.closeRejectModal
		}, {
			default: A(() => [n("div", ZO, [
				n("h3", QO, U(e.t("worktime", "Monat zurückweisen")), 1),
				r[51] ||= z(),
				n("p", null, U(o.rejectTarget ? s.getMonthName(o.rejectTarget.month) + " " + o.rejectTarget.year + " – " + o.rejectTarget.employeeName : ""), 1),
				r[52] ||= z(),
				n("label", $O, U(e.t("worktime", "Begründung")), 1),
				r[53] ||= z(),
				N(n("textarea", {
					id: "reject-reason",
					"onUpdate:modelValue": r[8] ||= (e) => o.rejectReason = e,
					rows: "3",
					placeholder: e.t("worktime", "Warum wird der Monat zurückgewiesen?")
				}, null, 8, ek), [[y, o.rejectReason]]),
				r[54] ||= z(),
				n("div", tk, [
					I(_, {
						variant: "tertiary",
						onClick: s.closeRejectModal
					}, {
						default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
						_: 1
					}, 8, ["onClick"]),
					r[50] ||= z(),
					I(_, {
						variant: "primary",
						disabled: !o.rejectReason.trim() || o.rejectingKey !== null,
						onClick: s.submitReject
					}, {
						default: A(() => [z(U(e.t("worktime", "Zurückweisen")), 1)]),
						_: 1
					}, 8, ["disabled", "onClick"])
				])
			])]),
			_: 1
		}, 8, ["onClose"])) : K("", !0),
		r[63] ||= z(),
		o.showReopenModal ? (J(), L(C, {
			key: 3,
			"label-id": "wt-reopen-month-title",
			onClose: s.closeReopenModal
		}, {
			default: A(() => [n("div", nk, [
				n("h3", rk, U(e.t("worktime", "Genehmigung zurücknehmen")), 1),
				r[56] ||= z(),
				n("p", null, U(o.reopenTarget ? s.getMonthName(o.reopenTarget.month) + " " + o.reopenTarget.year + " – " + o.reopenTarget.employeeName : ""), 1),
				r[57] ||= z(),
				n("p", ik, U(e.t("worktime", "Der Monat wird wieder zur Bearbeitung freigegeben. Der Mitarbeiter kann korrigieren und erneut einreichen.")), 1),
				r[58] ||= z(),
				n("label", ak, U(e.t("worktime", "Begründung")), 1),
				r[59] ||= z(),
				N(n("textarea", {
					id: "reopen-reason",
					"onUpdate:modelValue": r[9] ||= (e) => o.reopenReason = e,
					rows: "3",
					placeholder: e.t("worktime", "Warum wird die Genehmigung zurückgenommen?")
				}, null, 8, ok), [[y, o.reopenReason]]),
				r[60] ||= z(),
				n("div", sk, [
					I(_, {
						variant: "tertiary",
						onClick: s.closeReopenModal
					}, {
						default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
						_: 1
					}, 8, ["onClick"]),
					r[55] ||= z(),
					I(_, {
						variant: "primary",
						disabled: !o.reopenReason.trim() || o.reopeningKey !== null,
						onClick: s.submitReopenApproved
					}, {
						default: A(() => [z(U(e.t("worktime", "Genehmigung zurücknehmen")), 1)]),
						_: 1
					}, 8, ["disabled", "onClick"])
				])
			])]),
			_: 1
		}, 8, ["onClose"])) : K("", !0),
		r[64] ||= z(),
		o.detailItem ? (J(), L(w, {
			key: 4,
			item: o.detailItem,
			"archive-configured": o.archiveConfigured,
			onApprove: s.onModalApprove,
			onReject: s.onModalReject,
			onClose: r[10] ||= (e) => o.detailItem = null
		}, null, 8, [
			"item",
			"archive-configured",
			"onApprove",
			"onReject"
		])) : K("", !0)
	]);
}
var lk = /*#__PURE__*/ Y(mO, [["render", ck], ["__scopeId", "data-v-62db21bf"]]), uk = {
	name: "AccountSwitchOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, dk = ["aria-hidden", "aria-label"], fk = [
	"fill",
	"width",
	"height"
], pk = { key: 0 };
function mk(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon account-switch-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", pk, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M16 9C22 9 22 13 22 13V15H16V13C16 13 16 11.31 14.85 9.8C14.68 9.57 14.47 9.35 14.25 9.14C14.77 9.06 15.34 9 16 9M8 11C11.5 11 11.94 12.56 12 13H4C4.06 12.56 4.5 11 8 11M8 9C2 9 2 13 2 13V15H14V13C14 13 14 9 8 9M9 17V19H15V17L18 20L15 23V21H9V23L6 20L9 17M8 3C8.55 3 9 3.45 9 4S8.55 5 8 5 7 4.55 7 4 7.45 3 8 3M8 1C6.34 1 5 2.34 5 4S6.34 7 8 7 11 5.66 11 4 9.66 1 8 1M16 1C14.34 1 13 2.34 13 4S14.34 7 16 7 19 5.66 19 4 17.66 1 16 1Z" }, null, -1)
	], 8, fk))], 16, dk);
}
var hk = /*#__PURE__*/ Y(uk, [["render", mk]]), gk = {
	name: "EyeOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, _k = ["aria-hidden", "aria-label"], vk = [
	"fill",
	"width",
	"height"
], yk = { key: 0 };
function bk(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon eye-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", yk, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" }, null, -1)
	], 8, vk))], 16, _k);
}
var xk = /*#__PURE__*/ Y(gk, [["render", bk]]), Sk = {
	name: "SettingsCard",
	props: {
		name: {
			type: String,
			required: !0
		},
		description: {
			type: String,
			default: ""
		}
	}
}, Ck = { class: "wt-settings-card" }, wk = { class: "wt-settings-card__title" }, Tk = {
	key: 0,
	class: "wt-settings-card__description"
};
function Ek(e, r, i, a, o, s) {
	return J(), H("section", Ck, [
		n("h3", wk, U(i.name), 1),
		r[0] ||= z(),
		i.description ? (J(), H("p", Tk, U(i.description), 1)) : K("", !0),
		r[1] ||= z(),
		q(e.$slots, "default", {}, void 0, !0)
	]);
}
var Dk = /*#__PURE__*/ Y(Sk, [["render", Ek], ["__scopeId", "data-v-861c3562"]]), Ok = {
	name: "SettingsNav",
	emits: ["select"],
	props: {
		groups: {
			type: Array,
			required: !0,
			validator: (e) => e.every((e) => Array.isArray(e.items))
		},
		active: {
			type: String,
			default: null
		}
	},
	methods: { t: R }
}, kk = ["aria-label"], Ak = {
	key: 0,
	class: "settings-nav-group"
}, jk = ["aria-current", "onClick"];
function Mk(e, n, r, i, a, o) {
	return J(), H("nav", {
		class: "settings-nav",
		"aria-label": o.t("worktime", "Einstellungs-Navigation")
	}, [(J(!0), H(F, null, u(r.groups, (i) => (J(), H(F, { key: i.label }, [
		i.items.length ? (J(), H("div", Ak, U(i.label), 1)) : K("", !0),
		n[0] ||= z(),
		(J(!0), H(F, null, u(i.items, (n) => (J(), H("button", {
			key: n.id,
			type: "button",
			class: G(["settings-nav-item", { active: r.active === n.id }]),
			"aria-current": r.active === n.id ? "page" : null,
			onClick: (r) => e.$emit("select", n.id)
		}, [(J(), L(p(n.icon), { size: 18 })), z(" " + U(n.label), 1)], 10, jk))), 128))
	], 64))), 128))], 8, kk);
}
var Nk = /*#__PURE__*/ Y(Ok, [["render", Mk], ["__scopeId", "data-v-d3f01167"]]);
// src/utils/settingsSection.js
function Pk(e) {
	return (e || "").replace(/^#/, "").split("?")[0];
}
function Fk(e, n) {
	if (!n || n === "/") return !1;
	let r = Pk(e);
	return r === "" || r === "/";
}
function Ik(e) {
	let n = (e || "").match(/[?&]sec=([^&]+)/);
	if (!n) return null;
	try {
		return decodeURIComponent(n[1]);
	} catch {
		return null;
	}
}
function Lk(e, n, r = null) {
	return e && n.includes(e) ? e : r && n.includes(r) ? r : n[0] || null;
}
function Rk(e, n) {
	return "#" + e + "?sec=" + encodeURIComponent(n);
}
function zk(e, n) {
	let r = Rk(e, n);
	typeof window < "u" && window.history?.replaceState && window.location.hash !== r && window.history.replaceState(window.history.state, "", r);
}
// src/views/MySettingsView.vue
var Bk = {
	name: "MySettingsView",
	components: {
		InfoIcon: sv,
		NcLoadingIcon: g,
		NcSelect: Xt,
		SettingsCard: Dk,
		SettingsNav: Nk
	},
	data() {
		return {
			form: {
				defaultStartTime: "",
				defaultEndTime: "",
				defaultBreakMinutes: "",
				absenceVisibility: "none",
				absenceDetail: "hidden",
				deputyId: null
			},
			originalValues: {
				defaultStartTime: "",
				defaultEndTime: "",
				defaultBreakMinutes: "",
				absenceVisibility: "none",
				absenceDetail: "hidden"
			},
			savingWorkTimes: !1,
			workTimesSaved: !1,
			savingVisibility: !1,
			visibilitySaved: !1,
			savingDetail: !1,
			detailSaved: !1,
			savingDeputy: !1,
			deputySaved: !1,
			colleagues: [],
			activeSection: null
		};
	},
	computed: {
		...Tr($o, ["currentEmployee"]),
		...Tr(qo, ["isSupervisor"]),
		navGroups() {
			let e = (e, n) => ({
				label: e,
				items: n.filter((e) => e.visible)
			});
			return [e(this.t("worktime", "Zeiterfassung"), [{
				id: "sec-arbeitszeiten",
				label: this.t("worktime", "Standard-Arbeitszeiten"),
				icon: ND,
				visible: !0
			}]), e(this.t("worktime", "Abwesenheiten"), [{
				id: "sec-datenschutz",
				label: this.t("worktime", "Datenschutz"),
				icon: xk,
				visible: !0
			}, {
				id: "sec-vertretung",
				label: this.t("worktime", "Vertretung"),
				icon: hk,
				visible: this.isSupervisor
			}])];
		},
		availableSectionIds() {
			return this.navGroups.flatMap((e) => e.items.map((e) => e.id));
		},
		deputyOptions() {
			let e = this.currentEmployee?.id;
			return this.colleagues.filter((n) => n.id !== e).map((e) => ({
				id: e.id,
				label: e.fullName
			}));
		},
		selectedDeputy: {
			get() {
				return this.deputyOptions.find((e) => e.id === this.form.deputyId) || null;
			},
			set(e) {
				this.form.deputyId = e?.id || null;
			}
		},
		visibilityOptions() {
			return [
				{
					id: "none",
					label: this.t("worktime", "Niemand")
				},
				{
					id: "team",
					label: this.t("worktime", "Mein Team")
				},
				{
					id: "all",
					label: this.t("worktime", "Alle Mitarbeiter")
				}
			];
		},
		detailOptions() {
			return [{
				id: "hidden",
				label: this.t("worktime", "Nur „Abwesend\" anzeigen")
			}, {
				id: "detailed",
				label: this.t("worktime", "Grund anzeigen (Urlaub, Fortbildung, ...)")
			}];
		},
		selectedVisibility: {
			get() {
				return this.visibilityOptions.find((e) => e.id === this.form.absenceVisibility) || null;
			},
			set(e) {
				this.form.absenceVisibility = e?.id || "none";
			}
		},
		selectedDetail: {
			get() {
				return this.detailOptions.find((e) => e.id === this.form.absenceDetail) || null;
			},
			set(e) {
				this.form.absenceDetail = e?.id || "hidden";
			}
		}
	},
	watch: {
		currentEmployee: {
			immediate: !0,
			handler(e) {
				e && this.loadFromEmployee(e);
			}
		},
		availableSectionIds(e) {
			this.activeSection = Lk(Ik(window.location.hash), e, this.activeSection);
		}
	},
	async created() {
		this.activeSection = Lk(Ik(window.location.hash), this.availableSectionIds), this.colleagues = await Qo.getSelectableEmployees() || [];
	},
	methods: {
		...Er($o, ["updateMyDefaults", "updateMyDeputy"]),
		setActiveSection(e) {
			this.activeSection = e, zk("/my-settings", e);
		},
		loadFromEmployee(e) {
			this.form.defaultStartTime = e.defaultStartTime || "08:00", this.form.defaultEndTime = e.defaultEndTime || "17:00", this.form.defaultBreakMinutes = e.defaultBreakMinutes ? String(e.defaultBreakMinutes) : "", this.form.absenceVisibility = e.absenceVisibility || "none", this.form.absenceDetail = e.absenceDetail || "hidden", this.form.deputyId = e.deputyId ?? null, this.originalValues.defaultStartTime = this.form.defaultStartTime, this.originalValues.defaultEndTime = this.form.defaultEndTime, this.originalValues.defaultBreakMinutes = this.form.defaultBreakMinutes, this.originalValues.absenceVisibility = this.form.absenceVisibility, this.originalValues.absenceDetail = this.form.absenceDetail;
		},
		async saveWorkTimes() {
			this.savingWorkTimes = !0, this.workTimesSaved = !1;
			try {
				await this.updateMyDefaults({
					defaultStartTime: this.form.defaultStartTime || null,
					defaultEndTime: this.form.defaultEndTime || null,
					defaultBreakMinutes: this.form.defaultBreakMinutes === "" || this.form.defaultBreakMinutes === null ? 0 : Number(this.form.defaultBreakMinutes)
				}), this.originalValues.defaultStartTime = this.form.defaultStartTime, this.originalValues.defaultEndTime = this.form.defaultEndTime, this.originalValues.defaultBreakMinutes = this.form.defaultBreakMinutes, this.workTimesSaved = !0, setTimeout(() => {
					this.workTimesSaved = !1;
				}, 2e3);
			} catch (e) {
				console.error("Failed to save work times:", e), qt(t("worktime", "Fehler beim Speichern"));
			} finally {
				this.savingWorkTimes = !1;
			}
		},
		async saveVisibility() {
			this.savingVisibility = !0, this.visibilitySaved = !1;
			try {
				await this.updateMyDefaults({ absenceVisibility: this.form.absenceVisibility }), this.originalValues.absenceVisibility = this.form.absenceVisibility, this.visibilitySaved = !0, setTimeout(() => {
					this.visibilitySaved = !1;
				}, 2e3);
			} catch (e) {
				console.error("Failed to save visibility:", e), qt(t("worktime", "Fehler beim Speichern")), this.form.absenceVisibility = this.originalValues.absenceVisibility;
			} finally {
				this.savingVisibility = !1;
			}
		},
		async saveDetail() {
			this.savingDetail = !0, this.detailSaved = !1;
			try {
				await this.updateMyDefaults({ absenceDetail: this.form.absenceDetail }), this.originalValues.absenceDetail = this.form.absenceDetail, this.detailSaved = !0, setTimeout(() => {
					this.detailSaved = !1;
				}, 2e3);
			} catch (e) {
				console.error("Failed to save detail:", e), qt(t("worktime", "Fehler beim Speichern")), this.form.absenceDetail = this.originalValues.absenceDetail;
			} finally {
				this.savingDetail = !1;
			}
		},
		async saveDeputy() {
			this.savingDeputy = !0, this.deputySaved = !1;
			try {
				await this.updateMyDeputy(this.form.deputyId), this.deputySaved = !0, setTimeout(() => {
					this.deputySaved = !1;
				}, 2e3);
			} catch (e) {
				console.error("Failed to save deputy:", e), qt(t("worktime", "Fehler beim Speichern"));
			} finally {
				this.savingDeputy = !1;
			}
		}
	}
}, Vk = { class: "my-settings-view" }, Hk = { class: "view-header" }, Uk = { class: "settings-layout" }, Wk = { class: "settings-content" }, Gk = { class: "settings-form" }, Kk = { class: "form-row" }, qk = { class: "form-group" }, Jk = { for: "defaultStartTime" }, Yk = ["placeholder"], Xk = { class: "form-group" }, Zk = { for: "defaultEndTime" }, Qk = ["placeholder"], $k = { class: "form-group" }, eA = { for: "defaultBreakMinutes" }, tA = ["placeholder"], nA = { class: "save-indicator" }, rA = {
	key: 1,
	class: "saved-hint"
}, iA = { class: "hint" }, aA = { class: "hint" }, oA = { class: "settings-form" }, sA = { class: "form-group" }, cA = { for: "absenceVisibility" }, lA = { class: "visibility-row" }, uA = {
	key: 1,
	class: "saved-hint"
}, dA = {
	key: 0,
	class: "form-group"
}, fA = { for: "absenceDetail" }, pA = { class: "visibility-row" }, mA = {
	key: 1,
	class: "saved-hint"
}, hA = { class: "settings-form" }, gA = { class: "form-group" }, _A = { for: "deputy" }, vA = { class: "visibility-row" }, yA = {
	key: 1,
	class: "saved-hint"
};
function bA(e, r, i, a, o, s) {
	let c = P("SettingsNav"), l = P("NcLoadingIcon"), u = P("SettingsCard"), d = P("NcSelect"), f = P("InfoIcon");
	return J(), H("div", Vk, [
		n("div", Hk, [n("h2", null, U(e.t("worktime", "Einstellungen")), 1)]),
		r[31] ||= z(),
		n("div", Uk, [
			I(c, {
				groups: s.navGroups,
				active: o.activeSection,
				onSelect: s.setActiveSection
			}, null, 8, [
				"groups",
				"active",
				"onSelect"
			]),
			r[30] ||= z(),
			n("div", Wk, [
				N(I(u, {
					id: "sec-arbeitszeiten",
					name: e.t("worktime", "Standard-Arbeitszeiten"),
					description: e.t("worktime", "Diese Zeiten werden beim Anlegen neuer Zeiteinträge vorausgefüllt.")
				}, {
					default: A(() => [n("div", Gk, [
						n("div", Kk, [
							n("div", qk, [
								n("label", Jk, U(e.t("worktime", "Arbeitsbeginn")), 1),
								r[9] ||= z(),
								N(n("input", {
									id: "defaultStartTime",
									"onUpdate:modelValue": r[0] ||= (e) => o.form.defaultStartTime = e,
									type: "time",
									class: "time-input",
									placeholder: e.t("worktime", "z.B. 08:00"),
									onChange: r[1] ||= (...e) => s.saveWorkTimes && s.saveWorkTimes(...e)
								}, null, 40, Yk), [[y, o.form.defaultStartTime]])
							]),
							r[13] ||= z(),
							n("div", Xk, [
								n("label", Zk, U(e.t("worktime", "Arbeitsende")), 1),
								r[10] ||= z(),
								N(n("input", {
									id: "defaultEndTime",
									"onUpdate:modelValue": r[2] ||= (e) => o.form.defaultEndTime = e,
									type: "time",
									class: "time-input",
									placeholder: e.t("worktime", "z.B. 17:00"),
									onChange: r[3] ||= (...e) => s.saveWorkTimes && s.saveWorkTimes(...e)
								}, null, 40, Qk), [[y, o.form.defaultEndTime]])
							]),
							r[14] ||= z(),
							n("div", $k, [
								n("label", eA, U(e.t("worktime", "Pause (Minuten)")), 1),
								r[11] ||= z(),
								N(n("input", {
									id: "defaultBreakMinutes",
									"onUpdate:modelValue": r[4] ||= (e) => o.form.defaultBreakMinutes = e,
									type: "number",
									min: "0",
									max: "480",
									step: "5",
									class: "break-input",
									placeholder: e.t("worktime", "z.B. 45"),
									onChange: r[5] ||= (...e) => s.saveWorkTimes && s.saveWorkTimes(...e)
								}, null, 40, tA), [[y, o.form.defaultBreakMinutes]])
							]),
							r[15] ||= z(),
							n("div", nA, [
								o.savingWorkTimes ? (J(), L(l, {
									key: 0,
									size: 20
								})) : K("", !0),
								r[12] ||= z(),
								o.workTimesSaved ? (J(), H("span", rA, U(e.t("worktime", "Gespeichert")), 1)) : K("", !0)
							])
						]),
						r[16] ||= z(),
						n("p", iA, U(e.t("worktime", "Leer lassen für Standardwerte (08:00 - 17:00).")), 1),
						r[17] ||= z(),
						n("p", aA, U(e.t("worktime", "Deine gewohnte Pause wird bei neuen Einträgen vorausgefüllt. Sie kann die gesetzliche Mindestpause (§4 ArbZG) nie unterschreiten — bei Bedarf wird automatisch der gesetzliche Wert verwendet. Leer lassen für die gesetzliche Mindestpause.")), 1)
					])]),
					_: 1
				}, 8, ["name", "description"]), [[k, o.activeSection === "sec-arbeitszeiten"]]),
				r[28] ||= z(),
				N(I(u, {
					id: "sec-datenschutz",
					name: e.t("worktime", "Datenschutz"),
					description: e.t("worktime", "Lege fest, wer deine Abwesenheiten in der Abwesenheitsübersicht sehen kann. Vorgesetzte und HR sehen deine Abwesenheiten immer.")
				}, {
					default: A(() => [n("div", oA, [
						n("div", sA, [
							n("label", cA, U(e.t("worktime", "Abwesenheiten sichtbar für")), 1),
							r[20] ||= z(),
							n("div", lA, [
								I(d, {
									"label-outside": "",
									id: "absenceVisibility",
									modelValue: s.selectedVisibility,
									"onUpdate:modelValue": [r[6] ||= (e) => s.selectedVisibility = e, s.saveVisibility],
									options: s.visibilityOptions,
									clearable: !1,
									disabled: o.savingVisibility,
									class: "visibility-select"
								}, null, 8, [
									"modelValue",
									"options",
									"disabled",
									"onUpdate:modelValue"
								]),
								r[18] ||= z(),
								o.savingVisibility ? (J(), L(l, {
									key: 0,
									size: 20
								})) : K("", !0),
								r[19] ||= z(),
								o.visibilitySaved ? (J(), H("span", uA, U(e.t("worktime", "Gespeichert")), 1)) : K("", !0)
							])
						]),
						r[24] ||= z(),
						o.form.absenceVisibility === "none" ? K("", !0) : (J(), H("div", dA, [
							n("label", fA, [z(U(e.t("worktime", "Detailgrad")) + " ", 1), I(f, null, {
								default: A(() => [z(U(e.t("worktime", "Legt fest, ob Kollegen in der Abwesenheitsübersicht deinen Abwesenheitsgrund sehen (z.B. Urlaub) oder nur Abwesend. Vorgesetzte und HR sehen immer den Grund.")), 1)]),
								_: 1
							})]),
							r[23] ||= z(),
							n("div", pA, [
								I(d, {
									"label-outside": "",
									id: "absenceDetail",
									modelValue: s.selectedDetail,
									"onUpdate:modelValue": [r[7] ||= (e) => s.selectedDetail = e, s.saveDetail],
									options: s.detailOptions,
									clearable: !1,
									disabled: o.savingDetail,
									class: "visibility-select"
								}, null, 8, [
									"modelValue",
									"options",
									"disabled",
									"onUpdate:modelValue"
								]),
								r[21] ||= z(),
								o.savingDetail ? (J(), L(l, {
									key: 0,
									size: 20
								})) : K("", !0),
								r[22] ||= z(),
								o.detailSaved ? (J(), H("span", mA, U(e.t("worktime", "Gespeichert")), 1)) : K("", !0)
							])
						]))
					])]),
					_: 1
				}, 8, ["name", "description"]), [[k, o.activeSection === "sec-datenschutz"]]),
				r[29] ||= z(),
				e.isSupervisor ? N((J(), L(u, {
					key: 0,
					id: "sec-vertretung",
					name: e.t("worktime", "Vertretung"),
					description: e.t("worktime", "Wähle eine Person, die deine Genehmigungen für dein Team übernimmt, während du abwesend bist. Die Vertretung wird automatisch aktiv, sobald für dich eine Abwesenheit genehmigt ist (z. B. Urlaub oder Krankheit) — ohne genehmigte Abwesenheit greift sie nicht. Einmal festgelegt, gilt sie für alle deine Abwesenheiten, bis du sie änderst.")
				}, {
					default: A(() => [n("div", hA, [n("div", gA, [
						n("label", _A, U(e.t("worktime", "Meine Vertretung bei Genehmigungen")), 1),
						r[27] ||= z(),
						n("div", vA, [
							I(d, {
								"label-outside": "",
								id: "deputy",
								modelValue: s.selectedDeputy,
								"onUpdate:modelValue": [r[8] ||= (e) => s.selectedDeputy = e, s.saveDeputy],
								options: s.deputyOptions,
								placeholder: e.t("worktime", "Keine Vertretung"),
								disabled: o.savingDeputy,
								label: "label",
								class: "visibility-select"
							}, null, 8, [
								"modelValue",
								"options",
								"placeholder",
								"disabled",
								"onUpdate:modelValue"
							]),
							r[25] ||= z(),
							o.savingDeputy ? (J(), L(l, {
								key: 0,
								size: 20
							})) : K("", !0),
							r[26] ||= z(),
							o.deputySaved ? (J(), H("span", yA, U(e.t("worktime", "Gespeichert")), 1)) : K("", !0)
						])
					])])]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-vertretung"]]) : K("", !0)
			])
		])
	]);
}
var xA = /*#__PURE__*/ Y(Bk, [["render", bA], ["__scopeId", "data-v-10dd6a25"]]), SA = {
	name: "AccountIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, CA = ["aria-hidden", "aria-label"], wA = [
	"fill",
	"width",
	"height"
], TA = { key: 0 };
function EA(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon account-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", TA, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" }, null, -1)
	], 8, wA))], 16, CA);
}
var DA = /*#__PURE__*/ Y(SA, [["render", EA]]), OA = {
	name: "CalendarBlankIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, kA = ["aria-hidden", "aria-label"], AA = [
	"fill",
	"width",
	"height"
], jA = { key: 0 };
function MA(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-blank-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", jA, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" }, null, -1)
	], 8, AA))], 16, kA);
}
var NA = /*#__PURE__*/ Y(OA, [["render", MA]]), PA = {
	name: "KeyVariantIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, FA = ["aria-hidden", "aria-label"], IA = [
	"fill",
	"width",
	"height"
], LA = { key: 0 };
function RA(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon key-variant-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", LA, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z" }, null, -1)
	], 8, IA))], 16, FA);
}
var zA = /*#__PURE__*/ Y(PA, [["render", RA]]), BA = {
	name: "KeyOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, VA = ["aria-hidden", "aria-label"], HA = [
	"fill",
	"width",
	"height"
], UA = { key: 0 };
function WA(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon key-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", UA, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M21 18H15V15H13.3C12.2 17.4 9.7 19 7 19C3.1 19 0 15.9 0 12S3.1 5 7 5C9.7 5 12.2 6.6 13.3 9H24V15H21V18M17 16H19V13H22V11H11.9L11.7 10.3C11 8.3 9.1 7 7 7C4.2 7 2 9.2 2 12S4.2 17 7 17C9.1 17 11 15.7 11.7 13.7L11.9 13H17V16M7 15C5.3 15 4 13.7 4 12S5.3 9 7 9 10 10.3 10 12 8.7 15 7 15M7 11C6.4 11 6 11.4 6 12S6.4 13 7 13 8 12.6 8 12 7.6 11 7 11Z" }, null, -1)
	], 8, HA))], 16, VA);
}
var GA = /*#__PURE__*/ Y(BA, [["render", WA]]), KA = {
	name: "OfficeBuildingIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, qA = ["aria-hidden", "aria-label"], JA = [
	"fill",
	"width",
	"height"
], YA = { key: 0 };
function XA(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon office-building-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", YA, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" }, null, -1)
	], 8, JA))], 16, qA);
}
var ZA = /*#__PURE__*/ Y(KA, [["render", XA]]), QA = {
	name: "ClockCheckOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, $A = ["aria-hidden", "aria-label"], ej = [
	"fill",
	"width",
	"height"
], tj = { key: 0 };
function nj(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon clock-check-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", tj, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M23.5 17L18.5 22L15 18.5L16.5 17L18.5 19L22 15.5L23.5 17M13.1 19.9C12.7 20 12.4 20 12 20C7.6 20 4 16.4 4 12S7.6 4 12 4 20 7.6 20 12C20 12.4 20 12.7 19.9 13.1C20.6 13.2 21.2 13.4 21.8 13.7C21.9 13.1 22 12.6 22 12C22 6.5 17.5 2 12 2S2 6.5 2 12C2 17.5 6.5 22 12 22C12.6 22 13.2 21.9 13.7 21.8C13.4 21.3 13.2 20.6 13.1 19.9M15.6 14.1L12.5 12.3V7H11V13L14.5 15.1C14.8 14.7 15.2 14.4 15.6 14.1Z" }, null, -1)
	], 8, ej))], 16, $A);
}
var rj = /*#__PURE__*/ Y(QA, [["render", nj]]), ij = {
	name: "CoffeeOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, aj = ["aria-hidden", "aria-label"], oj = [
	"fill",
	"width",
	"height"
], sj = { key: 0 };
function cj(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon coffee-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", sj, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M2,21V19H20V21H2M20,8V5H18V8H20M20,3A2,2 0 0,1 22,5V8A2,2 0 0,1 20,10H18V13A4,4 0 0,1 14,17H8A4,4 0 0,1 4,13V3H20M16,5H6V13A2,2 0 0,0 8,15H14A2,2 0 0,0 16,13V5Z" }, null, -1)
	], 8, oj))], 16, aj);
}
var lj = /*#__PURE__*/ Y(ij, [["render", cj]]), uj = {
	name: "BeachIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, dj = ["aria-hidden", "aria-label"], fj = [
	"fill",
	"width",
	"height"
], pj = { key: 0 };
function mj(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon beach-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", pj, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M15,18.54C17.13,18.21 19.5,18 22,18V22H5C5,21.35 8.2,19.86 13,18.9V12.4C12.16,12.65 11.45,13.21 11,13.95C10.39,12.93 9.27,12.25 8,12.25C6.73,12.25 5.61,12.93 5,13.95C5.03,10.37 8.5,7.43 13,7.04V7A1,1 0 0,1 14,6A1,1 0 0,1 15,7V7.04C19.5,7.43 22.96,10.37 23,13.95C22.39,12.93 21.27,12.25 20,12.25C18.73,12.25 17.61,12.93 17,13.95C16.55,13.21 15.84,12.65 15,12.39V18.54M7,2A5,5 0 0,1 2,7V2H7Z" }, null, -1)
	], 8, fj))], 16, dj);
}
var hj = /*#__PURE__*/ Y(uj, [["render", mj]]), gj = {
	name: "SwapHorizontalBoldIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, _j = ["aria-hidden", "aria-label"], vj = [
	"fill",
	"width",
	"height"
], yj = { key: 0 };
function bj(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon swap-horizontal-bold-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", yj, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M8,10V13H14V18H8V21L2,15.5L8,10M22,8.5L16,3V6H10V11H16V14L22,8.5Z" }, null, -1)
	], 8, vj))], 16, _j);
}
var xj = /*#__PURE__*/ Y(gj, [["render", bj]]), Sj = {
	name: "CashMultipleIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, Cj = ["aria-hidden", "aria-label"], wj = [
	"fill",
	"width",
	"height"
], Tj = { key: 0 };
function Ej(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon cash-multiple-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", Tj, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" }, null, -1)
	], 8, wj))], 16, Cj);
}
var Dj = /*#__PURE__*/ Y(Sj, [["render", Ej]]), Oj = {
	name: "MedicalBagIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, kj = ["aria-hidden", "aria-label"], Aj = [
	"fill",
	"width",
	"height"
], jj = { key: 0 };
function Mj(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon medical-bag-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", jj, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M10,3L8,5V7H5C3.85,7 3.12,8 3,9L2,19C1.88,20 2.54,21 4,21H20C21.46,21 22.12,20 22,19L21,9C20.88,8 20.06,7 19,7H16V5L14,3H10M10,5H14V7H10V5M11,10H13V13H16V15H13V18H11V15H8V13H11V10Z" }, null, -1)
	], 8, Aj))], 16, kj);
}
var Nj = /*#__PURE__*/ Y(Oj, [["render", Mj]]), Pj = wr("holidays", () => {
	let e = W([]), n = W({}), r = W(!1), i = W(null), a = M(() => {
		let n = {};
		return e.value.forEach((e) => {
			n[e.date] = e;
		}), n;
	});
	function o(n) {
		return e.value.some((e) => e.date === n);
	}
	async function s({ year: n, federalState: a }) {
		r.value = !0, i.value = null;
		try {
			e.value = await pD.getByYearAndState(n, a);
		} catch (e) {
			i.value = Jo(e);
		} finally {
			r.value = !1;
		}
	}
	async function c() {
		try {
			n.value = await pD.getFederalStates();
		} catch (e) {
			console.error("Failed to fetch federal states:", e);
		}
	}
	async function l({ year: e, federalState: n }) {
		r.value = !0;
		try {
			await pD.generate(e, n), await s({
				year: e,
				federalState: n
			});
		} finally {
			r.value = !1;
		}
	}
	async function u(e) {
		r.value = !0;
		try {
			return await pD.generateAll(e);
		} finally {
			r.value = !1;
		}
	}
	async function d({ year: e, federalState: n }) {
		return await pD.check(e, n);
	}
	return {
		holidays: e,
		federalStates: n,
		loading: r,
		error: i,
		holidaysByDate: a,
		isHoliday: o,
		fetchHolidays: s,
		fetchFederalStates: c,
		generateHolidays: l,
		generateAllHolidays: u,
		checkHolidaysExist: d
	};
}), Fj = [
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat",
	"sun"
];
function Ij(e) {
	return Math.sign(e) * Number(Math.round(Number(Math.abs(e) + "e2")) + "e-2");
}
function Lj(e) {
	let n = Number(e);
	return Number.isFinite(n) ? n : 0;
}
function Rj(e) {
	return Ij(Fj.reduce((n, r) => n + Ij(Lj(e[r])), 0));
}
function zj(e) {
	return Fj.filter((n) => Ij(Lj(e[n])) > 0).length;
}
// src/components/DayHoursInput.vue
var Bj = 0, Vj = {
	name: "DayHoursInput",
	emits: ["update:modelValue"],
	props: {
		modelValue: {
			type: Object,
			required: !0
		},
		maxDailyHours: {
			type: Number,
			required: !0
		}
	},
	data() {
		return Bj++, {
			uid: Bj,
			raw: this.toRaw(this.modelValue),
			weekdays: [
				{
					key: "mon",
					label: this.t("worktime", "Mo")
				},
				{
					key: "tue",
					label: this.t("worktime", "Di")
				},
				{
					key: "wed",
					label: this.t("worktime", "Mi")
				},
				{
					key: "thu",
					label: this.t("worktime", "Do")
				},
				{
					key: "fri",
					label: this.t("worktime", "Fr")
				},
				{
					key: "sat",
					label: this.t("worktime", "Sa")
				},
				{
					key: "sun",
					label: this.t("worktime", "So")
				}
			]
		};
	},
	computed: { weeklyTotal() {
		return Rj(this.modelValue).toLocaleString(Wv(), { maximumFractionDigits: 2 });
	} },
	watch: { modelValue: {
		deep: !0,
		handler(e) {
			Fj.forEach((n) => {
				Lj(this.raw[n]) !== Lj(e[n]) && (this.raw[n] = e[n]);
			});
		}
	} },
	methods: {
		toRaw(e) {
			return Object.fromEntries(Fj.map((n) => [n, e[n]]));
		},
		inputId(e) {
			return `day-hours-${this.uid}-${e}`;
		},
		isAboveMax(e) {
			return Lj(this.raw[e]) > this.maxDailyHours;
		},
		emitDay(e) {
			this.$emit("update:modelValue", {
				...this.modelValue,
				[e]: Lj(this.raw[e])
			});
		}
	}
}, Hj = { class: "day-hours-input" }, Uj = { class: "day-hours-row" }, Wj = ["for"], Gj = [
	"id",
	"onUpdate:modelValue",
	"max",
	"onInput"
], Kj = { class: "hint" }, qj = { class: "form-group" }, Jj = ["for"], Yj = ["id", "value"];
function Xj(e, r, i, a, o, s) {
	return J(), H("div", Hj, [
		n("div", Uj, [(J(!0), H(F, null, u(o.weekdays, (e) => (J(), H("div", {
			key: e.key,
			class: "day-input"
		}, [
			n("label", { for: s.inputId(e.key) }, U(e.label), 9, Wj),
			r[0] ||= z(),
			N(n("input", {
				id: s.inputId(e.key),
				"onUpdate:modelValue": (n) => o.raw[e.key] = n,
				type: "number",
				min: "0",
				max: i.maxDailyHours,
				step: "0.25",
				class: G([
					"input-field",
					"input-day",
					{ "input-error": s.isAboveMax(e.key) }
				]),
				onInput: (n) => s.emitDay(e.key)
			}, null, 42, Gj), [[y, o.raw[e.key]]])
		]))), 128))]),
		r[2] ||= z(),
		n("p", Kj, U(e.t("worktime", "Max. {hours} Std./Tag", { hours: i.maxDailyHours })), 1),
		r[3] ||= z(),
		n("div", qj, [
			n("label", { for: s.inputId("total") }, U(e.t("worktime", "Wochenstunden (berechnet)")), 9, Jj),
			r[1] ||= z(),
			n("input", {
				id: s.inputId("total"),
				value: s.weeklyTotal,
				type: "text",
				class: "input-field input-total",
				disabled: ""
			}, null, 8, Yj)
		])
	]);
}
var Zj = /*#__PURE__*/ Y(Vj, [["render", Xj], ["__scopeId", "data-v-fb548fb9"]]), Qj = {
	async getAll(e) {
		try {
			return (await X.get(`/employees/${e}/schedules`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e, n) {
		try {
			return (await X.post(`/employees/${e}/schedules`, n)).data;
		} catch (e) {
			Z(e);
		}
	},
	async update(e, n, r) {
		try {
			return (await X.put(`/employees/${e}/schedules/${n}`, r)).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e, n) {
		try {
			return (await X.delete(`/employees/${e}/schedules/${n}`)).data;
		} catch (e) {
			Z(e);
		}
	}
}, $j = wr("workSchedules", () => {
	let e = W([]), n = W(!1), r = W(null);
	async function i(i) {
		n.value = !0, r.value = null;
		try {
			e.value = await Qj.getAll(i);
		} catch (e) {
			r.value = Jo(e);
		} finally {
			n.value = !1;
		}
	}
	async function a({ employeeId: n, data: r }) {
		let { quotaWarnings: i = [], ...a } = await Qj.create(n, r);
		return e.value.push(a), e.value.sort((e, n) => n.validFrom.localeCompare(e.validFrom)), {
			schedule: a,
			quotaWarnings: i
		};
	}
	async function o({ employeeId: n, id: r, data: i }) {
		let { quotaWarnings: a = [], ...o } = await Qj.update(n, r, i);
		return Yo(e.value, o), {
			schedule: o,
			quotaWarnings: a
		};
	}
	async function s({ employeeId: n, id: r }) {
		let { quotaWarnings: i = [] } = await Qj.delete(n, r) || {};
		return e.value = e.value.filter((e) => e.id !== r), { quotaWarnings: i };
	}
	return {
		schedules: e,
		loading: n,
		error: r,
		fetchSchedules: i,
		createSchedule: a,
		updateSchedule: o,
		deleteSchedule: s
	};
}), eM = {
	name: "WorkScheduleEditor",
	emits: ["updated"],
	components: {
		NcButton: Ye,
		NcDateTimePicker: z_,
		NcDialog: Qt,
		NcLoadingIcon: g,
		Pencil: Zx,
		Close: Yw,
		Plus: Gx,
		InfoIcon: sv,
		DayHoursInput: Zj
	},
	props: {
		employeeId: {
			type: Number,
			required: !0
		},
		entryDate: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			showForm: !1,
			editingSchedule: null,
			showDeleteDialog: !1,
			scheduleToDelete: null,
			maxDailyHours: 10,
			vacationTouched: !1,
			form: this.getEmptyForm()
		};
	},
	computed: {
		...Tr($j, ["schedules", "loading"]),
		workingDaysInForm() {
			return zj(this.form.dayHours);
		},
		suggestedVacationDays() {
			return Math.round(30 * this.workingDaysInForm / 5);
		},
		minValidFrom() {
			if (!this.entryDate) return null;
			let e = /* @__PURE__ */ new Date(this.entryDate + "T00:00:00");
			return e.setHours(0, 0, 0, 0), e;
		},
		isFormValid() {
			let e = this.form.dayHours, n = Object.values(e).every((e) => e >= 0 && e <= this.maxDailyHours);
			return Rj(e) >= 0 && n && this.form.vacationDays >= 0 && (this.editingSchedule || this.form.validFrom);
		}
	},
	watch: {
		employeeId: {
			immediate: !0,
			async handler(e) {
				if (e) {
					this.fetchSchedules(e);
					try {
						let e = await Ko.get("max_daily_hours");
						e && (this.maxDailyHours = parseFloat(e));
					} catch {}
				}
			}
		},
		"form.dayHours": {
			deep: !0,
			handler() {
				!this.editingSchedule && !this.vacationTouched && (this.form.vacationDays = this.suggestedVacationDays);
			}
		}
	},
	methods: {
		...Er($j, [
			"fetchSchedules",
			"createSchedule",
			"updateSchedule",
			"deleteSchedule"
		]),
		getEmptyForm() {
			return {
				validFrom: /* @__PURE__ */ new Date(),
				dayHours: {
					mon: 8,
					tue: 8,
					wed: 8,
					thu: 8,
					fri: 8,
					sat: 0,
					sun: 0
				},
				vacationDays: 30
			};
		},
		formatDate(e) {
			return e ? (/* @__PURE__ */ new Date(e + "T00:00:00")).toLocaleDateString(Wv()) : "-";
		},
		startCreate() {
			this.editingSchedule = null, this.vacationTouched = !1, this.form = this.getEmptyForm(), this.showForm = !0;
		},
		startEdit(e) {
			this.editingSchedule = e, this.vacationTouched = !0, this.form = {
				validFrom: null,
				dayHours: {
					mon: e.monHours,
					tue: e.tueHours,
					wed: e.wedHours,
					thu: e.thuHours,
					fri: e.friHours,
					sat: e.satHours || 0,
					sun: e.sunHours || 0
				},
				vacationDays: e.vacationDays
			}, this.showForm = !0;
		},
		cancelForm() {
			this.showForm = !1, this.editingSchedule = null;
		},
		async saveForm() {
			try {
				let e = {
					dayHours: this.form.dayHours,
					vacationDays: this.form.vacationDays
				}, n;
				this.editingSchedule ? n = await this.updateSchedule({
					employeeId: this.employeeId,
					id: this.editingSchedule.id,
					data: e
				}) : (e.validFrom = this.form.validFrom ? qv(this.form.validFrom) : qv(/* @__PURE__ */ new Date()), n = await this.createSchedule({
					employeeId: this.employeeId,
					data: e
				})), this.showForm = !1, this.editingSchedule = null, this.$emit("updated"), this.warnOnQuotaOverage(n?.quotaWarnings);
			} catch (e) {
				console.error("Failed to save schedule:", e);
				let n = e && !e.isAxiosError && e.message;
				qt(n || t("worktime", "Fehler beim Speichern des Profils"));
			}
		},
		confirmDelete(e) {
			this.scheduleToDelete = e, this.showDeleteDialog = !0;
		},
		async deleteConfirmed() {
			try {
				let e = await this.deleteSchedule({
					employeeId: this.employeeId,
					id: this.scheduleToDelete.id
				});
				this.$emit("updated"), this.warnOnQuotaOverage(e?.quotaWarnings);
			} catch (e) {
				console.error("Failed to delete schedule:", e), qt(t("worktime", "Fehler beim Löschen des Profils"));
			} finally {
				this.showDeleteDialog = !1, this.scheduleToDelete = null;
			}
		},
		warnOnQuotaOverage(e) {
			Array.isArray(e) && e.length !== 0 && e.forEach((e) => {
				Ut(t("worktime", "Achtung: Durch die Profiländerung überschreitet der Urlaub {year} das Kontingent um {days} Tage. Bitte die geplanten Urlaube dieses Mitarbeiters prüfen.", {
					year: e.year,
					days: Number(e.over).toLocaleString(Wv())
				}));
			});
		}
	}
}, tM = { class: "work-schedule-editor" }, nM = { key: 1 }, rM = {
	key: 0,
	class: "schedules-table"
}, iM = { class: "text-right" }, aM = { class: "text-right" }, oM = { class: "text-right" }, sM = { class: "text-right" }, cM = { class: "text-right" }, lM = { class: "text-right" }, uM = { class: "text-right" }, dM = { class: "text-right" }, fM = { class: "text-right" }, pM = { class: "actions-col" }, mM = { class: "text-right" }, hM = { class: "text-right" }, gM = { class: "text-right" }, _M = { class: "text-right" }, vM = { class: "text-right" }, yM = { class: "text-right" }, bM = { class: "text-right" }, xM = { class: "text-right" }, SM = { class: "text-right" }, CM = { class: "actions-col" }, wM = {
	key: 1,
	class: "add-button"
}, TM = {
	key: 2,
	class: "schedule-form"
}, EM = {
	key: 0,
	class: "form-group"
}, DM = { class: "form-row" }, OM = { class: "form-group" }, kM = {
	key: 0,
	class: "hint"
}, AM = { class: "form-actions" };
function jM(e, r, i, a, o, s) {
	let c = P("NcLoadingIcon"), l = P("Pencil"), d = P("NcButton"), f = P("Close"), p = P("Plus"), m = P("NcDateTimePicker"), h = P("DayHoursInput"), g = P("InfoIcon"), _ = P("NcDialog");
	return J(), H("div", tM, [
		n("h4", null, U(e.t("worktime", "Arbeitszeitprofile")), 1),
		r[41] ||= z(),
		e.loading ? (J(), L(c, {
			key: 0,
			size: 28
		})) : (J(), H("div", nM, [
			e.schedules.length > 0 ? (J(), H("table", rM, [
				n("thead", null, [n("tr", null, [
					n("th", null, U(e.t("worktime", "Gültig ab")), 1),
					r[6] ||= z(),
					n("th", iM, U(e.t("worktime", "Mo")), 1),
					r[7] ||= z(),
					n("th", aM, U(e.t("worktime", "Di")), 1),
					r[8] ||= z(),
					n("th", oM, U(e.t("worktime", "Mi")), 1),
					r[9] ||= z(),
					n("th", sM, U(e.t("worktime", "Do")), 1),
					r[10] ||= z(),
					n("th", cM, U(e.t("worktime", "Fr")), 1),
					r[11] ||= z(),
					n("th", lM, U(e.t("worktime", "Sa")), 1),
					r[12] ||= z(),
					n("th", uM, U(e.t("worktime", "So")), 1),
					r[13] ||= z(),
					n("th", dM, U(e.t("worktime", "Woche")), 1),
					r[14] ||= z(),
					n("th", fM, U(e.t("worktime", "Urlaub")), 1),
					r[15] ||= z(),
					n("th", pM, U(e.t("worktime", "Aktionen")), 1)
				])]),
				r[27] ||= z(),
				n("tbody", null, [(J(!0), H(F, null, u(e.schedules, (i) => (J(), H("tr", { key: i.id }, [
					n("td", null, U(s.formatDate(i.validFrom)), 1),
					r[17] ||= z(),
					n("td", mM, U(i.monHours), 1),
					r[18] ||= z(),
					n("td", hM, U(i.tueHours), 1),
					r[19] ||= z(),
					n("td", gM, U(i.wedHours), 1),
					r[20] ||= z(),
					n("td", _M, U(i.thuHours), 1),
					r[21] ||= z(),
					n("td", vM, U(i.friHours), 1),
					r[22] ||= z(),
					n("td", yM, U(i.satHours), 1),
					r[23] ||= z(),
					n("td", bM, U(i.sunHours), 1),
					r[24] ||= z(),
					n("td", xM, [n("strong", null, U(i.weeklyHours), 1)]),
					r[25] ||= z(),
					n("td", SM, U(i.vacationDays), 1),
					r[26] ||= z(),
					n("td", CM, [
						I(d, {
							variant: "tertiary",
							"aria-label": e.t("worktime", "Bearbeiten"),
							onClick: (e) => s.startEdit(i)
						}, {
							icon: A(() => [I(l, { size: 20 })]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						r[16] ||= z(),
						e.schedules.length > 1 ? (J(), L(d, {
							key: 0,
							variant: "tertiary",
							"aria-label": e.t("worktime", "Löschen"),
							onClick: (e) => s.confirmDelete(i)
						}, {
							icon: A(() => [I(f, { size: 20 })]),
							_: 1
						}, 8, ["aria-label", "onClick"])) : K("", !0)
					])
				]))), 128))])
			])) : K("", !0),
			r[37] ||= z(),
			o.showForm ? K("", !0) : (J(), H("div", wM, [I(d, {
				variant: "secondary",
				onClick: s.startCreate
			}, {
				icon: A(() => [I(p, { size: 20 })]),
				default: A(() => [z(" " + U(e.t("worktime", "Neues Profil")), 1)]),
				_: 1
			}, 8, ["onClick"])])),
			r[38] ||= z(),
			o.showForm ? (J(), H("div", TM, [
				n("h5", null, U(o.editingSchedule ? e.t("worktime", "Profil bearbeiten") : e.t("worktime", "Neues Profil anlegen")), 1),
				r[33] ||= z(),
				o.editingSchedule ? K("", !0) : (J(), H("div", EM, [
					n("label", null, U(e.t("worktime", "Gültig ab")) + " *", 1),
					r[28] ||= z(),
					I(m, {
						modelValue: o.form.validFrom,
						"onUpdate:modelValue": r[0] ||= (e) => o.form.validFrom = e,
						clearable: "",
						type: "date",
						format: "dd.MM.yyyy",
						min: s.minValidFrom || void 0
					}, null, 8, ["modelValue", "min"])
				])),
				r[34] ||= z(),
				I(h, {
					modelValue: o.form.dayHours,
					"onUpdate:modelValue": r[1] ||= (e) => o.form.dayHours = e,
					"max-daily-hours": o.maxDailyHours
				}, null, 8, ["modelValue", "max-daily-hours"]),
				r[35] ||= z(),
				n("div", DM, [n("div", OM, [
					n("label", null, [
						z(U(e.t("worktime", "Urlaubstage")) + " ", 1),
						I(g, null, {
							default: A(() => [z(U(e.t("worktime", "Voller Jahresanspruch bei diesem Arbeitsmuster. Bei unterjährigem Wechsel wird der tatsächliche Jahresanspruch zeitanteilig aus allen Profilen des Jahres berechnet.")), 1)]),
							_: 1
						}),
						r[29] ||= z(" *", -1)
					]),
					r[30] ||= z(),
					N(n("input", {
						"onUpdate:modelValue": r[2] ||= (e) => o.form.vacationDays = e,
						type: "number",
						min: "0",
						max: "60",
						class: "input-field input-small",
						onInput: r[3] ||= (e) => o.vacationTouched = !0
					}, null, 544), [[
						y,
						o.form.vacationDays,
						void 0,
						{ number: !0 }
					]]),
					r[31] ||= z(),
					!o.editingSchedule && !o.vacationTouched ? (J(), H("p", kM, U(e.t("worktime", "Vorschlag {days} bei {count} Arbeitstagen (30 × Tage ÷ 5) — anpassbar", {
						days: s.suggestedVacationDays,
						count: s.workingDaysInForm
					})), 1)) : K("", !0)
				])]),
				r[36] ||= z(),
				n("div", AM, [
					I(d, {
						variant: "tertiary",
						onClick: s.cancelForm
					}, {
						default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
						_: 1
					}, 8, ["onClick"]),
					r[32] ||= z(),
					I(d, {
						variant: "primary",
						disabled: !s.isFormValid,
						onClick: s.saveForm
					}, {
						default: A(() => [z(U(e.t("worktime", "Speichern")), 1)]),
						_: 1
					}, 8, ["disabled", "onClick"])
				])
			])) : K("", !0)
		])),
		r[42] ||= z(),
		o.showDeleteDialog ? (J(), L(_, {
			key: 2,
			name: e.t("worktime", "Profil löschen?"),
			"onUpdate:open": r[5] ||= (e) => o.showDeleteDialog = !1
		}, {
			actions: A(() => [
				I(d, {
					variant: "tertiary",
					onClick: r[4] ||= (e) => o.showDeleteDialog = !1
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}),
				r[39] ||= z(),
				I(d, {
					variant: "error",
					onClick: s.deleteConfirmed
				}, {
					default: A(() => [z(U(e.t("worktime", "Löschen")), 1)]),
					_: 1
				}, 8, ["onClick"])
			]),
			default: A(() => [n("p", null, U(e.t("worktime", "Möchtest du dieses Arbeitszeitprofil wirklich löschen?")), 1), r[40] ||= z()]),
			_: 1
		}, 8, ["name"])) : K("", !0)
	]);
}
// src/components/EmployeeForm.vue
var MM = {
	name: "EmployeeForm",
	emits: [
		"cancel",
		"saved",
		"schedule-updated"
	],
	components: {
		InfoIcon: sv,
		NcButton: Ye,
		NcSelect: Xt,
		NcDateTimePicker: z_,
		NcCheckboxRadioSwitch: tt,
		WorkScheduleEditor: /* @__PURE__ */ Y(eM, [["render", jM], ["__scopeId", "data-v-c4484037"]]),
		DayHoursInput: Zj
	},
	props: {
		employee: {
			type: Object,
			default: null
		},
		defaultFederalState: {
			type: String,
			default: "BY"
		}
	},
	data() {
		return {
			form: this.emptyForm(),
			maxDailyHours: 10,
			saving: !1
		};
	},
	computed: {
		...Tr($o, [
			"employees",
			"federalStates",
			"availableUsers"
		]),
		...Tr(qD, ["departments"]),
		isEdit() {
			return !!this.employee;
		},
		entryYear() {
			return this.form.entryDate ? new Date(this.form.entryDate).getFullYear() : null;
		},
		normalizedVacationDaysUsed() {
			let e = this.form.vacationDaysUsed;
			return e === null || e === "" || Number.isNaN(Number(e)) ? null : Number(e) > 0 ? Number(e) : null;
		},
		userOptions() {
			return this.availableUsers.map((e) => ({
				id: e.user,
				label: e.displayName + (e.subname ? ` (${e.subname})` : ""),
				email: e.subname || ""
			}));
		},
		selectedUser: {
			get() {
				return this.isEdit && this.employee ? {
					id: this.employee.userId,
					label: this.employee.fullName
				} : this.userOptions.find((e) => e.id === this.form.userId) || null;
			},
			set(e) {
				if (this.form.userId = e?.id || "", e && !this.form.firstName && !this.form.lastName) {
					let n = e.label.split(" ");
					n.length >= 2 && (this.form.firstName = n[0], this.form.lastName = n.slice(1).join(" ").replace(/\s*\(.*\)$/, ""));
				}
				e?.email && !this.form.email && (this.form.email = e.email);
			}
		},
		federalStateOptions() {
			return Object.entries(this.federalStates).map(([e, n]) => ({
				id: e,
				label: n
			}));
		},
		selectedFederalState: {
			get() {
				return this.federalStateOptions.find((e) => e.id === this.form.federalState) || null;
			},
			set(e) {
				this.form.federalState = e?.id || "BY";
			}
		},
		supervisorOptions() {
			return this.employees.filter((e) => !this.employee || e.id !== this.employee.id).filter((e) => e.isActive).map((e) => ({
				id: e.id,
				label: e.fullName
			}));
		},
		selectedSupervisor: {
			get() {
				return this.supervisorOptions.find((e) => e.id === this.form.supervisorId) || null;
			},
			set(e) {
				this.form.supervisorId = e?.id || null;
			}
		},
		departmentOptions() {
			return this.departments.filter((e) => e.isActive || e.id === this.form.departmentId).map((e) => ({
				id: e.id,
				label: e.name
			}));
		},
		selectedDepartment: {
			get() {
				return this.departmentOptions.find((e) => e.id === this.form.departmentId) || null;
			},
			set(e) {
				this.form.departmentId = e?.id || null;
			}
		},
		hasWorkingHours() {
			return Rj(this.form.dayHours) > 0;
		},
		isValid() {
			let e = (this.isEdit || this.form.userId) && this.form.firstName.trim() && this.form.lastName.trim() && this.form.federalState;
			if (this.isEdit) return e;
			let n = Object.values(this.form.dayHours).every((e) => e >= 0 && e <= this.maxDailyHours);
			return e && n && this.hasWorkingHours && this.form.vacationDays >= 0 && this.form.vacationDays <= 365;
		}
	},
	watch: { employee: {
		immediate: !0,
		handler(e) {
			e ? this.form = {
				userId: e.userId,
				firstName: e.firstName,
				lastName: e.lastName,
				email: e.email || "",
				personnelNumber: e.personnelNumber || "",
				weeklyHours: e.weeklyHours,
				vacationDays: e.vacationDays,
				workingDaysPerWeek: e.workingDaysPerWeek ?? 5,
				supervisorId: e.supervisorId,
				departmentId: e.departmentId ?? null,
				federalState: e.federalState,
				entryDate: e.entryDate ? new Date(e.entryDate) : null,
				exitDate: e.exitDate ? new Date(e.exitDate) : null,
				vacationDaysUsed: e.vacationDaysUsed ?? null,
				vacationTransferred: e.vacationTransferred ?? !1
			} : this.resetForm();
		}
	} },
	created() {
		$o().fetchFederalStates(), $o().fetchEmployees(), qD().fetchDepartments(!0), this.isEdit || ($o().fetchAvailableUsers(), this.loadMaxDailyHours());
	},
	methods: {
		...Er($o, ["createEmployee", "updateEmployee"]),
		emptyForm() {
			return {
				userId: "",
				firstName: "",
				lastName: "",
				email: "",
				personnelNumber: "",
				weeklyHours: 40,
				vacationDays: 30,
				workingDaysPerWeek: 5,
				dayHours: {
					mon: 8,
					tue: 8,
					wed: 8,
					thu: 8,
					fri: 8,
					sat: 0,
					sun: 0
				},
				supervisorId: null,
				departmentId: null,
				federalState: this.defaultFederalState,
				entryDate: null,
				exitDate: null,
				vacationDaysUsed: null,
				vacationTransferred: !1
			};
		},
		resetForm() {
			this.form = this.emptyForm();
		},
		async loadMaxDailyHours() {
			try {
				let e = parseFloat(await Ko.get("max_daily_hours"));
				e > 0 && (this.maxDailyHours = e);
			} catch {}
		},
		cancel() {
			this.$emit("cancel");
		},
		async save() {
			if (!this.saving) {
				this.saving = !0;
				try {
					let e = {
						userId: this.form.userId,
						firstName: this.form.firstName.trim(),
						lastName: this.form.lastName.trim(),
						email: this.form.email.trim() || null,
						personnelNumber: this.form.personnelNumber.trim() || null,
						weeklyHours: this.form.weeklyHours,
						vacationDays: this.form.vacationDays,
						workingDaysPerWeek: this.form.workingDaysPerWeek,
						supervisorId: this.form.supervisorId,
						departmentId: this.form.departmentId,
						federalState: this.form.federalState,
						entryDate: this.form.entryDate ? qv(this.form.entryDate) : null,
						exitDate: this.form.exitDate ? qv(this.form.exitDate) : null,
						vacationDaysUsed: this.entryYear ? this.normalizedVacationDaysUsed : null,
						vacationTransferred: this.entryYear ? this.form.vacationTransferred : !1
					};
					this.isEdit ? await this.updateEmployee({
						id: this.employee.id,
						data: e
					}) : (delete e.weeklyHours, delete e.workingDaysPerWeek, e.dayHours = this.form.dayHours, await this.createEmployee(e)), this.$emit("saved");
				} catch (e) {
					console.error("Failed to save employee:", e), Hv(e && !e.isAxiosError && e.message || this.t("worktime", "Fehler beim Speichern des Mitarbeiters"));
				} finally {
					this.saving = !1;
				}
			}
		}
	}
}, NM = { class: "employee-form" }, PM = { id: "wt-employee-form-title" }, FM = { class: "form-group" }, IM = { for: "ncUser" }, LM = { class: "form-row" }, RM = { class: "form-group" }, zM = { for: "firstName" }, BM = { class: "form-group" }, VM = { for: "lastName" }, HM = { class: "form-row" }, UM = { class: "form-group" }, WM = { for: "email" }, GM = { class: "form-group" }, KM = { for: "personnelNumber" }, qM = {
	key: 0,
	class: "form-group"
}, JM = {
	key: 0,
	class: "field-hint field-hint--error"
}, YM = {
	key: 1,
	class: "form-row"
}, XM = { class: "form-group" }, ZM = { for: "vacationDays" }, QM = {
	key: 2,
	class: "form-row"
}, $M = { class: "form-group" }, eN = ["value"], tN = { class: "form-group" }, nN = ["value"], rN = {
	key: 3,
	class: "field-hint"
}, iN = {
	key: 4,
	class: "form-row"
}, aN = { class: "form-group" }, oN = ["value"], sN = { class: "form-group" }, cN = { for: "federalState" }, lN = { class: "form-row" }, uN = { class: "form-group" }, dN = { for: "supervisor" }, fN = { class: "form-group" }, pN = { for: "department" }, mN = { class: "form-row" }, hN = { class: "form-group" }, gN = { for: "entryDate" }, _N = {
	key: 0,
	class: "form-group"
}, vN = { for: "exitDate" }, yN = {
	key: 5,
	class: "form-row"
}, bN = { class: "form-group" }, xN = { class: "field-hint" }, SN = {
	key: 6,
	class: "form-row"
}, CN = { class: "form-group" }, wN = { for: "vacationDaysUsed" }, TN = { class: "form-actions" };
function EN(e, r, i, a, o, s) {
	let c = P("NcSelect"), l = P("InfoIcon"), u = P("DayHoursInput"), d = P("NcDateTimePicker"), f = P("NcCheckboxRadioSwitch"), p = P("WorkScheduleEditor"), m = P("NcButton");
	return J(), H("div", NM, [
		n("h3", PM, U(s.isEdit ? e.t("worktime", "Mitarbeiter bearbeiten") : e.t("worktime", "Neuer Mitarbeiter")), 1),
		r[42] ||= z(),
		n("div", FM, [
			n("label", IM, U(e.t("worktime", "Nextcloud-Benutzer")), 1),
			r[15] ||= z(),
			I(c, {
				"label-outside": "",
				id: "ncUser",
				modelValue: s.selectedUser,
				"onUpdate:modelValue": r[0] ||= (e) => s.selectedUser = e,
				options: s.userOptions,
				placeholder: e.t("worktime", "Benutzer auswählen"),
				clearable: !1,
				disabled: s.isEdit,
				label: "label"
			}, null, 8, [
				"modelValue",
				"options",
				"placeholder",
				"disabled"
			])
		]),
		r[43] ||= z(),
		n("div", LM, [
			n("div", RM, [
				n("label", zM, U(e.t("worktime", "Vorname")) + " *", 1),
				r[16] ||= z(),
				N(n("input", {
					id: "firstName",
					"onUpdate:modelValue": r[1] ||= (e) => o.form.firstName = e,
					type: "text",
					class: "input-field",
					required: ""
				}, null, 512), [[y, o.form.firstName]])
			]),
			r[18] ||= z(),
			n("div", BM, [
				n("label", VM, U(e.t("worktime", "Nachname")) + " *", 1),
				r[17] ||= z(),
				N(n("input", {
					id: "lastName",
					"onUpdate:modelValue": r[2] ||= (e) => o.form.lastName = e,
					type: "text",
					class: "input-field",
					required: ""
				}, null, 512), [[y, o.form.lastName]])
			])
		]),
		r[44] ||= z(),
		n("div", HM, [
			n("div", UM, [
				n("label", WM, U(e.t("worktime", "E-Mail")), 1),
				r[19] ||= z(),
				N(n("input", {
					id: "email",
					"onUpdate:modelValue": r[3] ||= (e) => o.form.email = e,
					type: "email",
					class: "input-field"
				}, null, 512), [[y, o.form.email]])
			]),
			r[21] ||= z(),
			n("div", GM, [
				n("label", KM, U(e.t("worktime", "Personalnummer")), 1),
				r[20] ||= z(),
				N(n("input", {
					id: "personnelNumber",
					"onUpdate:modelValue": r[4] ||= (e) => o.form.personnelNumber = e,
					type: "text",
					class: "input-field"
				}, null, 512), [[y, o.form.personnelNumber]])
			])
		]),
		r[45] ||= z(),
		s.isEdit ? K("", !0) : (J(), H("div", qM, [
			n("label", null, [
				z(U(e.t("worktime", "Arbeitszeit pro Tag")) + " ", 1),
				I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Stunden je Wochentag laut Vertrag. Daraus berechnet WorkTime das tägliche Soll, die Wochenstunden und die Arbeitstage. Spätere Änderungen im Arbeitszeitprofil des Mitarbeiters.")), 1)]),
					_: 1
				}),
				r[22] ||= z(" *", -1)
			]),
			r[23] ||= z(),
			I(u, {
				modelValue: o.form.dayHours,
				"onUpdate:modelValue": r[5] ||= (e) => o.form.dayHours = e,
				"max-daily-hours": o.maxDailyHours
			}, null, 8, ["modelValue", "max-daily-hours"]),
			r[24] ||= z(),
			s.hasWorkingHours ? K("", !0) : (J(), H("p", JM, U(e.t("worktime", "Mindestens ein Wochentag braucht Arbeitsstunden. Für eine vorübergehende Auszeit (z. B. Elternzeit) eine Abwesenheit erfassen statt 0 Stunden.")), 1))
		])),
		r[46] ||= z(),
		s.isEdit ? K("", !0) : (J(), H("div", YM, [n("div", XM, [
			n("label", ZM, [
				z(U(e.t("worktime", "Urlaubstage")) + " ", 1),
				I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Voller Jahresanspruch bei diesem Arbeitsmuster. Nicht anteilig eintragen, WorkTime rechnet das Eintrittsjahr bei Eintritt nach dem 1. Juli selbst anteilig (§ 5 BUrlG).")), 1)]),
					_: 1
				}),
				r[25] ||= z(" *", -1)
			]),
			r[26] ||= z(),
			N(n("input", {
				id: "vacationDays",
				"onUpdate:modelValue": r[6] ||= (e) => o.form.vacationDays = e,
				type: "number",
				min: "0",
				max: "60",
				class: "input-field input-small",
				required: ""
			}, null, 512), [[
				y,
				o.form.vacationDays,
				void 0,
				{ number: !0 }
			]])
		])])),
		r[47] ||= z(),
		s.isEdit ? (J(), H("div", QM, [
			n("div", $M, [
				n("label", null, [z(U(e.t("worktime", "Wochenstunden")) + " ", 1), I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Aktuell gültiger Wert aus dem Arbeitszeitprofil. Zum Ändern unten das Profil bearbeiten oder ein neues anlegen.")), 1)]),
					_: 1
				})]),
				r[27] ||= z(),
				n("input", {
					value: o.form.weeklyHours,
					type: "text",
					class: "input-field input-small",
					disabled: ""
				}, null, 8, eN)
			]),
			r[29] ||= z(),
			n("div", tN, [
				n("label", null, [z(U(e.t("worktime", "Urlaubstage")) + " ", 1), I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Aktuell gültiger Wert aus dem Arbeitszeitprofil. Zum Ändern unten das Profil bearbeiten oder ein neues anlegen.")), 1)]),
					_: 1
				})]),
				r[28] ||= z(),
				n("input", {
					value: o.form.vacationDays,
					type: "text",
					class: "input-field input-small",
					disabled: ""
				}, null, 8, nN)
			])
		])) : K("", !0),
		r[48] ||= z(),
		s.isEdit ? (J(), H("p", rN, U(e.t("worktime", "Wochenstunden und Urlaubstage ergeben sich aus dem Arbeitszeitprofil unten und werden dort gepflegt.")), 1)) : K("", !0),
		r[49] ||= z(),
		s.isEdit ? (J(), H("div", iN, [n("div", aN, [
			n("label", null, [z(U(e.t("worktime", "Arbeitstage pro Woche")) + " ", 1), I(l, null, {
				default: A(() => [z(U(e.t("worktime", "Aktuell gültiger Wert aus dem Arbeitszeitprofil. Zum Ändern unten das Profil bearbeiten oder ein neues anlegen.")), 1)]),
				_: 1
			})]),
			r[30] ||= z(),
			n("input", {
				value: o.form.workingDaysPerWeek,
				type: "text",
				class: "input-field input-small",
				disabled: ""
			}, null, 8, oN)
		])])) : K("", !0),
		r[50] ||= z(),
		n("div", sN, [
			n("label", cN, [
				z(U(e.t("worktime", "Bundesland")) + " ", 1),
				I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Legt fest, welche gesetzlichen Feiertage für diesen Mitarbeiter gelten. Bayern hat z.B. mehr Feiertage als Hamburg.")), 1)]),
					_: 1
				}),
				r[31] ||= z(" *", -1)
			]),
			r[32] ||= z(),
			I(c, {
				"label-outside": "",
				id: "federalState",
				modelValue: s.selectedFederalState,
				"onUpdate:modelValue": r[7] ||= (e) => s.selectedFederalState = e,
				options: s.federalStateOptions,
				clearable: !1,
				label: "label"
			}, null, 8, ["modelValue", "options"])
		]),
		r[51] ||= z(),
		n("div", lN, [
			n("div", uN, [
				n("label", dN, [z(U(e.t("worktime", "Vorgesetzter")) + " ", 1), I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Diese Person kann die Zeiteinträge und Abwesenheitsanträge dieses Mitarbeiters einsehen und genehmigen.")), 1)]),
					_: 1
				})]),
				r[33] ||= z(),
				I(c, {
					"label-outside": "",
					id: "supervisor",
					modelValue: s.selectedSupervisor,
					"onUpdate:modelValue": r[8] ||= (e) => s.selectedSupervisor = e,
					options: s.supervisorOptions,
					placeholder: e.t("worktime", "Kein Vorgesetzter"),
					label: "label"
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder"
				])
			]),
			r[35] ||= z(),
			n("div", fN, [
				n("label", pN, [z(U(e.t("worktime", "Abteilung")) + " ", 1), I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Ordnet den Mitarbeiter einer Organisationseinheit zu. Rein organisatorisch – unabhängig vom Vorgesetzten und ohne Einfluss auf Berechtigungen.")), 1)]),
					_: 1
				})]),
				r[34] ||= z(),
				I(c, {
					"label-outside": "",
					id: "department",
					modelValue: s.selectedDepartment,
					"onUpdate:modelValue": r[9] ||= (e) => s.selectedDepartment = e,
					options: s.departmentOptions,
					placeholder: e.t("worktime", "Keine Abteilung"),
					label: "label"
				}, null, 8, [
					"modelValue",
					"options",
					"placeholder"
				])
			])
		]),
		r[52] ||= z(),
		n("div", mN, [
			n("div", hN, [
				n("label", gN, [z(U(e.t("worktime", "Eintrittsdatum")) + " ", 1), I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Ab diesem Datum erscheint der Mitarbeiter in der Zeiterfassung. Für Monate davor werden keine Sollstunden berechnet.")), 1)]),
					_: 1
				})]),
				r[36] ||= z(),
				I(d, {
					id: "entryDate",
					modelValue: o.form.entryDate,
					"onUpdate:modelValue": r[10] ||= (e) => o.form.entryDate = e,
					clearable: "",
					type: "date",
					format: "dd.MM.yyyy"
				}, null, 8, ["modelValue"])
			]),
			r[38] ||= z(),
			s.isEdit ? (J(), H("div", _N, [
				n("label", vN, [z(U(e.t("worktime", "Austrittsdatum")) + " ", 1), I(l, null, {
					default: A(() => [z(U(e.t("worktime", "Ab diesem Datum kann der Mitarbeiter keine neuen Einträge mehr erfassen. Alle bisherigen Daten bleiben erhalten.")), 1)]),
					_: 1
				})]),
				r[37] ||= z(),
				I(d, {
					id: "exitDate",
					modelValue: o.form.exitDate,
					"onUpdate:modelValue": r[11] ||= (e) => o.form.exitDate = e,
					clearable: "",
					type: "date",
					format: "dd.MM.yyyy"
				}, null, 8, ["modelValue"])
			])) : K("", !0)
		]),
		r[53] ||= z(),
		s.entryYear ? (J(), H("div", yN, [n("div", bN, [
			I(f, {
				modelValue: o.form.vacationTransferred,
				"onUpdate:modelValue": r[12] ||= (e) => o.form.vacationTransferred = e
			}, {
				default: A(() => [z(U(e.t("worktime", "Resturlaub aus vorheriger Beschäftigung übernehmen")), 1)]),
				_: 1
			}, 8, ["modelValue"]),
			r[39] ||= z(),
			n("p", xN, U(e.t("worktime", "An: der volle Jahresanspruch gilt, abzüglich der bereits genommenen Tage (interner Wechsel, Umstieg auf diese App). Aus: echte Neueinstellung. Bei Eintritt bis zum 1. Juli gilt der volle Jahresanspruch, bei späterem Eintritt nur anteilig für die Monate ab Eintritt (Teilurlaub). Anderswo gewährte Tage werden angerechnet.")), 1)
		])])) : K("", !0),
		r[54] ||= z(),
		s.entryYear ? (J(), H("div", SN, [n("div", CN, [
			n("label", wN, [z(U(e.t("worktime", "Davon {year} anderswo bereits gewährt/genommen", { year: s.entryYear })) + " ", 1), I(l, null, {
				default: A(() => [z(U(e.t("worktime", "Urlaubstage, die im Eintrittsjahr bereits genommen oder ausbezahlt wurden, beim vorherigen Arbeitgeber oder vor der Umstellung auf diese App. Sie werden vom Anspruch abgezogen, bei Teilurlaub begrenzen sie den anteiligen Anspruch (§ 6 BUrlG). Ab dem Folgejahr gilt wieder der volle Jahresanspruch. Halbe Tage sind möglich.")), 1)]),
				_: 1
			})]),
			r[40] ||= z(),
			N(n("input", {
				id: "vacationDaysUsed",
				"onUpdate:modelValue": r[13] ||= (e) => o.form.vacationDaysUsed = e,
				type: "number",
				min: "0",
				step: "0.5",
				class: "input-field input-small"
			}, null, 512), [[y, o.form.vacationDaysUsed]])
		])])) : K("", !0),
		r[55] ||= z(),
		s.isEdit && i.employee ? (J(), L(p, {
			key: 7,
			"employee-id": i.employee.id,
			"entry-date": i.employee.entryDate || null,
			onUpdated: r[14] ||= (n) => e.$emit("schedule-updated")
		}, null, 8, ["employee-id", "entry-date"])) : K("", !0),
		r[56] ||= z(),
		n("div", TN, [
			I(m, {
				variant: "tertiary",
				onClick: s.cancel
			}, {
				default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
				_: 1
			}, 8, ["onClick"]),
			r[41] ||= z(),
			I(m, {
				variant: "primary",
				disabled: !s.isValid || o.saving,
				onClick: s.save
			}, {
				default: A(() => [z(U(e.t("worktime", "Speichern")), 1)]),
				_: 1
			}, 8, ["disabled", "onClick"])
		])
	]);
}
var DN = /*#__PURE__*/ Y(MM, [["render", EN], ["__scopeId", "data-v-f99f68b2"]]), ON = {
	name: "SleepOffIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, kN = ["aria-hidden", "aria-label"], AN = [
	"fill",
	"width",
	"height"
], jN = { key: 0 };
function MN(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon sleep-off-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", jN, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M2,5.27L3.28,4L20,20.72L18.73,22L12.73,16H9V14L9.79,13.06L2,5.27M23,12H17V10L20.39,6H17V4H23V6L19.62,10H23V12M9.82,8H15V10L13.54,11.72L9.82,8M7,20H1V18L4.39,14H1V12H7V14L3.62,18H7V20Z" }, null, -1)
	], 8, AN))], 16, kN);
}
// src/components/EmployeeList.vue
var NN = {
	name: "EmployeeList",
	emits: [
		"correct",
		"delete",
		"edit",
		"reactivate",
		"rest"
	],
	components: {
		NcButton: Ye,
		NcEmptyContent: Gt,
		NcDialog: Qt,
		NcNoteCard: Ov,
		NcTextField: Jt,
		NcSelect: Xt,
		InfoIcon: sv,
		Pencil: Zx,
		Close: Yw,
		AccountGroup: Ba,
		Wrench: Fo,
		SleepIcon: Vo,
		SleepOffIcon: /* @__PURE__ */ Y(ON, [["render", MN]])
	},
	props: { employees: {
		type: Array,
		required: !0
	} },
	data() {
		return {
			showDeleteDialog: !1,
			employeeToDelete: null,
			deleteImpact: null,
			deleteImpactLoading: !1,
			showRestingDialog: !1,
			employeeToRest: null,
			restingReason: "",
			restingFrom: "",
			impact: null,
			impactLoading: !1,
			filterDepartmentId: null
		};
	},
	computed: {
		...Tr(qD, ["departments"]),
		hasDepartments() {
			return this.departments.length > 0;
		},
		departmentsById() {
			let e = {};
			for (let n of this.departments) e[n.id] = n;
			return e;
		},
		departmentFilterOptions() {
			let e = new Set(this.employees.map((e) => e.departmentId).filter((e) => e != null)), n = this.departments.filter((n) => e.has(n.id)).map((e) => ({
				id: e.id,
				label: e.name
			}));
			return this.employees.some((e) => e.departmentId == null) && n.push({
				id: 0,
				label: this.t("worktime", "Ohne Abteilung")
			}), n;
		},
		selectedFilterDepartment: {
			get() {
				return this.departmentFilterOptions.find((e) => e.id === this.filterDepartmentId) || null;
			},
			set(e) {
				this.filterDepartmentId = e ? e.id : null;
			}
		},
		filteredEmployees() {
			return this.filterDepartmentId === null ? this.employees : this.filterDepartmentId === 0 ? this.employees.filter((e) => e.departmentId == null) : this.employees.filter((e) => e.departmentId === this.filterDepartmentId);
		},
		deletionRows() {
			return this.deleteImpact ? [
				["timeEntries", this.t("worktime", "Zeiteinträge")],
				["absences", this.t("worktime", "Abwesenheiten")],
				["workSchedules", this.t("worktime", "Arbeitszeitprofile")],
				["carryovers", this.t("worktime", "Jahresüberträge")],
				["payouts", this.t("worktime", "Überstunden-Auszahlungen")],
				["projectAssignments", this.t("worktime", "Projektzuordnungen")],
				["archiveJobs", this.t("worktime", "Archiv-Aufträge")],
				["auditLogs", this.t("worktime", "Protokolleinträge")]
			].filter(([e]) => (this.deleteImpact.counts[e] || 0) > 0).map(([e, n]) => ({
				key: e,
				label: n,
				count: this.deleteImpact.counts[e]
			})) : [];
		}
	},
	created() {
		this.departments.length || qD().fetchDepartments(!0);
	},
	methods: {
		departmentName(e) {
			return e == null ? "–" : this.departmentsById[e]?.name || "–";
		},
		async confirmResting(e) {
			this.employeeToRest = e, this.restingReason = "", this.restingFrom = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"), this.impact = null, this.showRestingDialog = !0, this.impactLoading = !0;
			try {
				let n = await Qo.getRestingImpact(e.id);
				this.employeeToRest === e && (this.impact = n);
			} catch {
				this.employeeToRest === e && (this.impact = null);
			} finally {
				this.employeeToRest === e && (this.impactLoading = !1);
			}
		},
		closeRestingDialog() {
			this.showRestingDialog = !1, this.employeeToRest = null, this.restingReason = "", this.restingFrom = "", this.impact = null;
		},
		restingConfirmed() {
			this.$emit("rest", {
				employee: this.employeeToRest,
				reason: this.restingReason,
				restingFrom: this.restingFrom || null
			}), this.closeRestingDialog();
		},
		async confirmDelete(e) {
			this.employeeToDelete = e, this.deleteImpact = null, this.showDeleteDialog = !0, this.deleteImpactLoading = !0;
			try {
				let n = await Qo.getDeletionImpact(e.id);
				this.employeeToDelete === e && (this.deleteImpact = n);
			} catch {
				this.employeeToDelete === e && (this.deleteImpact = null);
			} finally {
				this.employeeToDelete === e && (this.deleteImpactLoading = !1);
			}
		},
		closeDeleteDialog() {
			this.showDeleteDialog = !1, this.employeeToDelete = null, this.deleteImpact = null, this.deleteImpactLoading = !1;
		},
		deleteConfirmed() {
			this.$emit("delete", this.employeeToDelete), this.closeDeleteDialog();
		}
	}
}, PN = { class: "employee-list" }, FN = {
	key: 0,
	class: "list-filter"
}, IN = { for: "employeeDeptFilter" }, LN = {
	key: 1,
	class: "employees-table"
}, RN = { class: "text-right" }, zN = { class: "text-right" }, BN = { key: 0 }, VN = { class: "actions-col" }, HN = {
	key: 0,
	class: "employee-email"
}, UN = { class: "text-right" }, WN = { class: "text-right" }, GN = { key: 0 }, KN = {
	key: 0,
	class: "locked-reason"
}, qN = { class: "actions-col" }, JN = {
	key: 2,
	class: "no-filter-match"
}, YN = { class: "resting-from" }, XN = { for: "resting-from" }, ZN = { class: "resting-from__hint" }, QN = {
	key: 0,
	class: "impact-loading"
}, $N = {
	key: 1,
	class: "impact-block"
}, eP = {
	key: 2,
	class: "impact-block impact-warning"
}, tP = {
	key: 0,
	class: "impact-loading"
}, nP = {
	key: 1,
	class: "impact-block"
}, rP = { class: "deletion-counts" }, iP = { class: "deletion-count" }, aP = { key: 2 }, oP = {
	key: 3,
	class: "impact-block impact-warning"
}, sP = {
	key: 4,
	class: "impact-block"
};
function cP(e, r, i, a, o, s) {
	let c = P("NcSelect"), l = P("Wrench"), d = P("NcButton"), f = P("SleepIcon"), p = P("SleepOffIcon"), m = P("Pencil"), h = P("Close"), g = P("AccountGroup"), _ = P("NcEmptyContent"), v = P("InfoIcon"), b = P("NcTextField"), x = P("NcDialog"), S = P("NcNoteCard");
	return J(), H("div", PN, [
		s.hasDepartments && i.employees.length > 0 ? (J(), H("div", FN, [
			n("label", IN, U(e.t("worktime", "Abteilung")), 1),
			r[3] ||= z(),
			I(c, {
				"label-outside": "",
				id: "employeeDeptFilter",
				modelValue: s.selectedFilterDepartment,
				"onUpdate:modelValue": r[0] ||= (e) => s.selectedFilterDepartment = e,
				options: s.departmentFilterOptions,
				placeholder: e.t("worktime", "Alle Abteilungen"),
				label: "label",
				class: "dept-filter-select"
			}, null, 8, [
				"modelValue",
				"options",
				"placeholder"
			])
		])) : K("", !0),
		r[49] ||= z(),
		i.employees.length > 0 ? (J(), H("table", LN, [
			n("thead", null, [n("tr", null, [
				n("th", null, U(e.t("worktime", "Name")), 1),
				r[4] ||= z(),
				n("th", null, U(e.t("worktime", "Personalnr.")), 1),
				r[5] ||= z(),
				n("th", RN, U(e.t("worktime", "Wochenstd.")), 1),
				r[6] ||= z(),
				n("th", zN, U(e.t("worktime", "Urlaubstage")), 1),
				r[7] ||= z(),
				n("th", null, U(e.t("worktime", "Bundesland")), 1),
				r[8] ||= z(),
				s.hasDepartments ? (J(), H("th", BN, U(e.t("worktime", "Abteilung")), 1)) : K("", !0),
				r[9] ||= z(),
				n("th", null, U(e.t("worktime", "Status")), 1),
				r[10] ||= z(),
				n("th", VN, U(e.t("worktime", "Aktionen")), 1)
			])]),
			r[23] ||= z(),
			n("tbody", null, [(J(!0), H(F, null, u(s.filteredEmployees, (i) => (J(), H("tr", { key: i.id }, [
				n("td", null, [
					n("strong", null, U(i.fullName), 1),
					r[11] ||= z(),
					i.email ? (J(), H("div", HN, U(i.email), 1)) : K("", !0)
				]),
				r[16] ||= z(),
				n("td", null, U(i.personnelNumber || "-"), 1),
				r[17] ||= z(),
				n("td", UN, U(i.weeklyHours), 1),
				r[18] ||= z(),
				n("td", WN, U(i.vacationDays), 1),
				r[19] ||= z(),
				n("td", null, U(i.federalStateName), 1),
				r[20] ||= z(),
				s.hasDepartments ? (J(), H("td", GN, U(s.departmentName(i.departmentId)), 1)) : K("", !0),
				r[21] ||= z(),
				n("td", null, [
					n("span", { class: G(["status-badge", i.isActive ? "active" : "inactive"]) }, U(i.isActive ? e.t("worktime", "Aktiv") : e.t("worktime", "Ruhend")), 3),
					r[12] ||= z(),
					!i.isActive && i.lockedReason ? (J(), H("div", KN, U(i.lockedReason), 1)) : K("", !0)
				]),
				r[22] ||= z(),
				n("td", qN, [
					I(d, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Korrigieren"),
						title: e.t("worktime", "Zeiten/Abwesenheiten dieses Mitarbeiters korrigieren"),
						onClick: (n) => e.$emit("correct", i)
					}, {
						icon: A(() => [I(l, { size: 20 })]),
						_: 1
					}, 8, [
						"aria-label",
						"title",
						"onClick"
					]),
					r[13] ||= z(),
					I(d, {
						variant: "tertiary",
						"aria-label": i.isActive ? e.t("worktime", "Ruhend setzen") : e.t("worktime", "Reaktivieren"),
						title: i.isActive ? e.t("worktime", "Mitarbeiter ruhend setzen: keine neue Erfassung mehr, Daten bleiben einsehbar") : e.t("worktime", "Mitarbeiter wieder aktiv setzen"),
						onClick: (n) => i.isActive ? s.confirmResting(i) : e.$emit("reactivate", i)
					}, {
						icon: A(() => [i.isActive ? (J(), L(f, {
							key: 0,
							size: 20
						})) : (J(), L(p, {
							key: 1,
							size: 20
						}))]),
						_: 2
					}, 1032, [
						"aria-label",
						"title",
						"onClick"
					]),
					r[14] ||= z(),
					I(d, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Bearbeiten"),
						onClick: (n) => e.$emit("edit", i)
					}, {
						icon: A(() => [I(m, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					r[15] ||= z(),
					I(d, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Löschen"),
						onClick: (e) => s.confirmDelete(i)
					}, {
						icon: A(() => [I(h, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])
			]))), 128))])
		])) : K("", !0),
		r[50] ||= z(),
		i.employees.length > 0 && s.filteredEmployees.length === 0 ? (J(), H("p", JN, U(e.t("worktime", "Keine Mitarbeitenden in dieser Abteilung.")), 1)) : K("", !0),
		r[51] ||= z(),
		i.employees.length === 0 ? (J(), L(_, {
			key: 3,
			name: e.t("worktime", "Keine Mitarbeiter"),
			description: e.t("worktime", "Lege Mitarbeiter an, um die Zeiterfassung zu nutzen.")
		}, {
			icon: A(() => [I(g, { size: 64 })]),
			_: 1
		}, 8, ["name", "description"])) : K("", !0),
		r[52] ||= z(),
		o.showRestingDialog ? (J(), L(x, {
			key: 4,
			name: e.t("worktime", "Mitarbeiter ruhend setzen?"),
			"onUpdate:open": s.closeRestingDialog
		}, {
			actions: A(() => [
				I(d, {
					variant: "tertiary",
					onClick: s.closeRestingDialog
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}, 8, ["onClick"]),
				r[29] ||= z(),
				I(d, {
					variant: "primary",
					onClick: s.restingConfirmed
				}, {
					default: A(() => [z(U(e.t("worktime", "Ruhend setzen")), 1)]),
					_: 1
				}, 8, ["onClick"])
			]),
			default: A(() => [
				n("p", null, [z(U(e.t("worktime", "\"{name}\" kann dann keine Zeiten und Abwesenheiten mehr erfassen. Bestehende Daten bleiben einsehbar und exportierbar.", { name: o.employeeToRest?.fullName })) + " ", 1), I(v, null, {
					default: A(() => [z(U(e.t("worktime", "Gedacht für Elternzeit, Mutterschutz, Langzeiterkrankung oder Ausscheiden. Der Mitarbeiter bleibt in der Verwaltung sichtbar und sieht seine eigenen Daten weiterhin, kann aber nichts mehr erfassen. Personalverwaltung und Administration können zurückliegende Einträge weiterhin korrigieren. Jederzeit umkehrbar.")), 1)]),
					_: 1
				})]),
				r[30] ||= z(),
				I(b, {
					modelValue: o.restingReason,
					"onUpdate:modelValue": r[1] ||= (e) => o.restingReason = e,
					maxlength: "500",
					label: e.t("worktime", "Grund (optional)"),
					placeholder: e.t("worktime", "z. B. Elternzeit, Langzeiterkrankung, ausgeschieden")
				}, null, 8, [
					"modelValue",
					"label",
					"placeholder"
				]),
				r[31] ||= z(),
				n("div", YN, [
					n("label", XN, U(e.t("worktime", "Ruhend ab")), 1),
					r[24] ||= z(),
					N(n("input", {
						id: "resting-from",
						"onUpdate:modelValue": r[2] ||= (e) => o.restingFrom = e,
						type: "date",
						class: "resting-from__input"
					}, null, 512), [[y, o.restingFrom]]),
					r[25] ||= z(),
					n("p", ZN, U(e.t("worktime", "Ab diesem Tag fällt kein Sollstunden-Zuwachs mehr an. Standard: heute.")), 1)
				]),
				r[32] ||= z(),
				o.impactLoading ? (J(), H("p", QN, U(e.t("worktime", "Auswirkungen werden geprüft …")), 1)) : K("", !0),
				r[33] ||= z(),
				o.impact && o.impact.deputyFor.length > 0 ? (J(), H("div", $N, [
					n("strong", null, U(e.t("worktime", "Vertretung wird gestrichen bei:")), 1),
					r[26] ||= z(),
					n("ul", null, [(J(!0), H(F, null, u(o.impact.deputyFor, (e) => (J(), H("li", { key: "d" + e.id }, U(e.fullName), 1))), 128))])
				])) : K("", !0),
				r[34] ||= z(),
				o.impact && o.impact.supervisorOf.length > 0 ? (J(), H("div", eP, [
					n("strong", null, U(e.t("worktime", "Diese Mitarbeiter haben dann keinen Vorgesetzten mehr:")), 1),
					r[27] ||= z(),
					n("ul", null, [(J(!0), H(F, null, u(o.impact.supervisorOf, (e) => (J(), H("li", { key: "s" + e.id }, U(e.fullName), 1))), 128))]),
					r[28] ||= z(),
					n("p", null, U(e.t("worktime", "Genehmigungen für diese Mitarbeiter laufen dann nur noch über Admin oder Personalverwaltung.")), 1)
				])) : K("", !0),
				r[35] ||= z()
			]),
			_: 1
		}, 8, ["name", "onUpdate:open"])) : K("", !0),
		r[53] ||= z(),
		o.showDeleteDialog ? (J(), L(x, {
			key: 5,
			name: e.t("worktime", "Mitarbeiter löschen?"),
			"onUpdate:open": s.closeDeleteDialog
		}, {
			actions: A(() => [
				I(d, {
					variant: "tertiary",
					onClick: s.closeDeleteDialog
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}, 8, ["onClick"]),
				r[41] ||= z(),
				I(d, {
					variant: "error",
					onClick: s.deleteConfirmed
				}, {
					default: A(() => [z(U(e.t("worktime", "Löschen")), 1)]),
					_: 1
				}, 8, ["onClick"])
			]),
			default: A(() => [
				n("p", null, U(e.t("worktime", "Möchtest du den Mitarbeiter \"{name}\" wirklich löschen?", { name: o.employeeToDelete?.fullName })), 1),
				r[42] ||= z(),
				o.deleteImpactLoading ? (J(), H("p", tP, U(e.t("worktime", "Umfang wird ermittelt …")), 1)) : K("", !0),
				r[43] ||= z(),
				s.deletionRows.length > 0 ? (J(), H("div", nP, [
					n("strong", null, U(e.t("worktime", "Mitgelöscht werden:")), 1),
					r[37] ||= z(),
					n("ul", rP, [(J(!0), H(F, null, u(s.deletionRows, (e) => (J(), H("li", { key: e.key }, [
						n("span", null, U(e.label), 1),
						r[36] ||= z(),
						n("span", iP, U(e.count), 1)
					]))), 128))])
				])) : o.deleteImpact && !o.deleteImpactLoading ? (J(), H("p", aP, U(e.t("worktime", "Zu diesem Mitarbeiter sind keine weiteren Daten erfasst.")), 1)) : K("", !0),
				r[44] ||= z(),
				o.deleteImpact && o.deleteImpact.supervisorOf.length > 0 ? (J(), H("div", oP, [
					n("strong", null, U(e.t("worktime", "Diese Mitarbeiter haben dann keinen Vorgesetzten mehr:")), 1),
					r[38] ||= z(),
					n("ul", null, [(J(!0), H(F, null, u(o.deleteImpact.supervisorOf, (e) => (J(), H("li", { key: "ds" + e.id }, U(e.fullName), 1))), 128))]),
					r[39] ||= z(),
					n("p", null, U(e.t("worktime", "Genehmigungen für diese Mitarbeiter laufen dann nur noch über Admin oder Personalverwaltung.")), 1)
				])) : K("", !0),
				r[45] ||= z(),
				o.deleteImpact && o.deleteImpact.deputyFor.length > 0 ? (J(), H("div", sP, [
					n("strong", null, U(e.t("worktime", "Vertretung wird gestrichen bei:")), 1),
					r[40] ||= z(),
					n("ul", null, [(J(!0), H(F, null, u(o.deleteImpact.deputyFor, (e) => (J(), H("li", { key: "dd" + e.id }, U(e.fullName), 1))), 128))])
				])) : K("", !0),
				r[46] ||= z(),
				I(S, { type: "warning" }, {
					default: A(() => [z(U(e.t("worktime", "Diese Aktion kann nicht rückgängig gemacht werden. Für Arbeitszeitnachweise können Aufbewahrungspflichten gelten — prüfe das, bevor du löschst.")), 1)]),
					_: 1
				}),
				r[47] ||= z(),
				I(S, { type: "info" }, {
					default: A(() => [z(U(e.t("worktime", "Für ausgeschiedene Mitarbeiter ist meist „Ruhend setzen“ richtig: Die Erfassung wird beendet, die Daten bleiben einsehbar und exportierbar.")), 1)]),
					_: 1
				}),
				r[48] ||= z()
			]),
			_: 1
		}, 8, ["name", "onUpdate:open"])) : K("", !0)
	]);
}
var lP = /*#__PURE__*/ Y(NN, [["render", cP], ["__scopeId", "data-v-0c7b06d4"]]), uP = {
	name: "BetriebsferienSettings",
	components: {
		NcButton: Ye,
		NcDateTimePicker: z_,
		NcCheckboxRadioSwitch: tt,
		NcNoteCard: Ov
	},
	props: { employees: {
		type: Array,
		default: () => []
	} },
	data() {
		return {
			form: {
				startDate: null,
				endDate: null,
				target: "all",
				overageHandling: "skip",
				note: ""
			},
			selectedEmployeeIds: [],
			employeeFilter: "",
			saving: !1,
			result: null,
			resultOverageHandling: "skip",
			central: []
		};
	},
	computed: {
		activeEmployees() {
			return this.employees.filter((e) => e.isActive);
		},
		overageOptions() {
			return [
				{
					value: "skip",
					label: this.t("worktime", "Nicht buchen, nur auflisten")
				},
				{
					value: "closure",
					label: this.t("worktime", "Bezahlte Freistellung (Betriebsschließung)")
				},
				{
					value: "compensatory",
					label: this.t("worktime", "Freizeitausgleich")
				},
				{
					value: "negative",
					label: this.t("worktime", "Urlaub ins Minus")
				}
			];
		},
		bookedWithOverage() {
			return !this.result || !this.result.booked ? [] : this.result.booked.filter((e) => (e.overageDays || 0) > 0);
		},
		bookedWithSkippedDays() {
			return !this.result || !this.result.booked ? [] : this.result.booked.filter((e) => (e.skippedDays || 0) > 0);
		},
		filteredEmployees() {
			let e = this.employeeFilter.trim().toLowerCase();
			return e ? this.activeEmployees.filter((n) => `${n.firstName} ${n.lastName}`.toLowerCase().includes(e)) : this.activeEmployees;
		},
		canSubmit() {
			return !(!this.form.startDate || !this.form.endDate || this.form.target === "selected" && this.selectedEmployeeIds.length === 0);
		},
		groups() {
			let e = {};
			return this.central.forEach((n) => {
				let r = n.centralGroup || `${n.startDate}|${n.endDate}|${n.note || ""}`;
				e[r] || (e[r] = {
					key: r,
					group: n.centralGroup || null,
					startDate: n.startDate,
					endDate: n.endDate,
					note: n.note || "",
					employeeIds: /* @__PURE__ */ new Set()
				});
				let i = e[r];
				n.startDate < i.startDate && (i.startDate = n.startDate), n.endDate > i.endDate && (i.endDate = n.endDate), !i.note && n.note && (i.note = n.note), i.employeeIds.add(n.employeeId);
			}), Object.values(e).map((e) => ({
				...e,
				count: e.employeeIds.size,
				label: this.rangeLabel(e.startDate, e.endDate)
			})).sort((e, n) => n.startDate.localeCompare(e.startDate));
		}
	},
	mounted() {
		this.load();
	},
	methods: {
		async load() {
			this.central = await Go.getCentralAbsences() || [];
		},
		rangeLabel(e, n) {
			let r = (e) => e.split("-").reverse().join(".");
			return e === n ? r(e) : `${r(e)} – ${r(n)}`;
		},
		reasonLabel(e) {
			return e === "insufficient_vacation" ? this.t("worktime", "nicht genug Resturlaub") : e === "time_entry_conflict" ? this.t("worktime", "Zeiteinträge im Zeitraum vorhanden") : e === "absence_conflict" ? this.t("worktime", "bereits eigene Abwesenheit im gesamten Zeitraum") : e;
		},
		async submit() {
			this.saving = !0, this.result = null;
			try {
				let e = {
					startDate: qv(this.form.startDate),
					endDate: qv(this.form.endDate),
					employeeIds: this.form.target === "all" ? null : this.selectedEmployeeIds.map(Number),
					note: this.form.note || null,
					overageHandling: this.form.overageHandling
				};
				this.result = await Go.createCompanyVacation(e), this.resultOverageHandling = e.overageHandling, $t(this.t("worktime", "Betriebsferien eingetragen.")), await this.load();
			} catch (e) {
				Hv(e.message || this.t("worktime", "Fehler beim Eintragen"));
			} finally {
				this.saving = !1;
			}
		},
		overageSplitLabel(e) {
			let n = this.resultOverageHandling === "compensatory" ? this.t("worktime", "Freizeitausgleich") : this.t("worktime", "Betriebsschließung");
			return this.t("worktime", "{name} – {vacation} Tage Urlaub + {overage} Tage {type}", {
				name: e.name,
				vacation: e.vacationDays,
				overage: e.overageDays,
				type: n
			});
		},
		skippedDaysLabel(e) {
			return this.t("worktime", "{name} – {booked} Tage gebucht, {skipped} Tage bereits abwesend", {
				name: e.name,
				booked: e.days,
				skipped: e.skippedDays
			});
		},
		async remove(e) {
			try {
				await Go.deleteCompanyVacation(e.startDate, e.endDate, e.group), $t(this.t("worktime", "Betriebsferien entfernt.")), this.result = null, await this.load();
			} catch (e) {
				Hv(e.message || this.t("worktime", "Fehler beim Entfernen"));
			}
		}
	}
}, dP = { class: "betriebsferien" }, fP = { class: "bf-form" }, pP = { class: "form-row" }, mP = { class: "form-group" }, hP = { class: "form-group" }, gP = { class: "form-group" }, _P = {
	key: 0,
	class: "bf-select"
}, vP = ["placeholder"], yP = { class: "bf-selected-count" }, bP = { class: "bf-employees" }, xP = {
	key: 0,
	class: "help-text"
}, SP = { class: "form-group" }, CP = { class: "form-group" }, wP = { for: "bf-note" }, TP = ["placeholder"], EP = { class: "help-text" }, DP = {
	key: 0,
	class: "bf-result"
}, OP = { class: "bf-skipped" }, kP = { class: "bf-skipped" }, AP = { class: "bf-skipped" }, jP = { class: "bf-existing" }, MP = {
	key: 0,
	class: "help-text"
}, NP = {
	key: 1,
	class: "bf-table"
}, PP = { class: "bf-actions" };
function FP(e, r, i, a, o, s) {
	let c = P("NcDateTimePicker"), l = P("NcCheckboxRadioSwitch"), d = P("NcButton"), f = P("NcNoteCard");
	return J(), H("div", dP, [
		n("div", fP, [
			n("div", pP, [
				n("div", mP, [
					n("label", null, U(e.t("worktime", "Von")), 1),
					r[8] ||= z(),
					I(c, {
						modelValue: o.form.startDate,
						"onUpdate:modelValue": r[0] ||= (e) => o.form.startDate = e,
						clearable: "",
						type: "date",
						format: "dd.MM.yyyy"
					}, null, 8, ["modelValue"])
				]),
				r[10] ||= z(),
				n("div", hP, [
					n("label", null, U(e.t("worktime", "Bis")), 1),
					r[9] ||= z(),
					I(c, {
						modelValue: o.form.endDate,
						"onUpdate:modelValue": r[1] ||= (e) => o.form.endDate = e,
						clearable: "",
						type: "date",
						format: "dd.MM.yyyy"
					}, null, 8, ["modelValue"])
				])
			]),
			r[18] ||= z(),
			n("div", gP, [
				n("label", null, U(e.t("worktime", "Für wen")), 1),
				r[11] ||= z(),
				I(l, {
					modelValue: o.form.target,
					"onUpdate:modelValue": r[2] ||= (e) => o.form.target = e,
					value: "all",
					name: "bf-target",
					type: "radio"
				}, {
					default: A(() => [z(U(e.t("worktime", "Alle aktiven Mitarbeiter")), 1)]),
					_: 1
				}, 8, ["modelValue"]),
				r[12] ||= z(),
				I(l, {
					modelValue: o.form.target,
					"onUpdate:modelValue": r[3] ||= (e) => o.form.target = e,
					value: "selected",
					name: "bf-target",
					type: "radio"
				}, {
					default: A(() => [z(U(e.t("worktime", "Ausgewählte Mitarbeiter")), 1)]),
					_: 1
				}, 8, ["modelValue"])
			]),
			r[19] ||= z(),
			o.form.target === "selected" ? (J(), H("div", _P, [
				N(n("input", {
					"onUpdate:modelValue": r[4] ||= (e) => o.employeeFilter = e,
					type: "text",
					class: "input-field bf-filter",
					placeholder: e.t("worktime", "Mitarbeiter suchen …")
				}, null, 8, vP), [[y, o.employeeFilter]]),
				r[14] ||= z(),
				n("p", yP, U(e.t("worktime", "{count} ausgewählt", { count: o.selectedEmployeeIds.length })), 1),
				r[15] ||= z(),
				n("div", bP, [
					(J(!0), H(F, null, u(s.filteredEmployees, (e) => (J(), L(l, {
						key: e.id,
						modelValue: o.selectedEmployeeIds,
						"onUpdate:modelValue": r[5] ||= (e) => o.selectedEmployeeIds = e,
						value: String(e.id),
						name: "bf-emp"
					}, {
						default: A(() => [z(U(e.firstName) + " " + U(e.lastName), 1)]),
						_: 2
					}, 1032, ["modelValue", "value"]))), 128)),
					r[13] ||= z(),
					s.filteredEmployees.length ? K("", !0) : (J(), H("p", xP, U(e.t("worktime", "Kein Mitarbeiter gefunden.")), 1))
				])
			])) : K("", !0),
			r[20] ||= z(),
			n("div", SP, [
				n("label", null, U(e.t("worktime", "Wenn der Resturlaub nicht reicht")), 1),
				r[16] ||= z(),
				(J(!0), H(F, null, u(s.overageOptions, (e) => (J(), L(l, {
					key: e.value,
					modelValue: o.form.overageHandling,
					"onUpdate:modelValue": r[6] ||= (e) => o.form.overageHandling = e,
					value: e.value,
					name: "bf-overage",
					type: "radio"
				}, {
					default: A(() => [z(U(e.label), 1)]),
					_: 2
				}, 1032, ["modelValue", "value"]))), 128))
			]),
			r[21] ||= z(),
			n("div", CP, [
				n("label", wP, U(e.t("worktime", "Bemerkung")), 1),
				r[17] ||= z(),
				N(n("input", {
					id: "bf-note",
					"onUpdate:modelValue": r[7] ||= (e) => o.form.note = e,
					type: "text",
					class: "input-field",
					placeholder: e.t("worktime", "z. B. Betriebsferien Weihnachten")
				}, null, 8, TP), [[y, o.form.note]])
			]),
			r[22] ||= z(),
			n("p", EP, U(e.t("worktime", "Mitarbeiter mit bereits erfassten Zeiten im Zeitraum werden nicht gebucht, sondern dir aufgelistet.")), 1),
			r[23] ||= z(),
			I(d, {
				variant: "primary",
				disabled: !s.canSubmit || o.saving,
				onClick: s.submit
			}, {
				default: A(() => [z(U(e.t("worktime", "Betriebsferien eintragen")), 1)]),
				_: 1
			}, 8, ["disabled", "onClick"])
		]),
		r[39] ||= z(),
		o.result ? (J(), H("div", DP, [
			I(f, { type: "success" }, {
				default: A(() => [z(U(e.t("worktime", "{count} Mitarbeiter eingetragen.", { count: o.result.booked.length })), 1)]),
				_: 1
			}),
			r[27] ||= z(),
			s.bookedWithOverage.length ? (J(), L(f, {
				key: 0,
				type: "info"
			}, {
				default: A(() => [
					n("strong", null, U(e.t("worktime", "Resturlaub reichte nicht – aufgeteilt gebucht:")), 1),
					r[24] ||= z(),
					n("ul", OP, [(J(!0), H(F, null, u(s.bookedWithOverage, (e) => (J(), H("li", { key: e.employeeId }, U(s.overageSplitLabel(e)), 1))), 128))])
				]),
				_: 1
			})) : K("", !0),
			r[28] ||= z(),
			s.bookedWithSkippedDays.length ? (J(), L(f, {
				key: 1,
				type: "info"
			}, {
				default: A(() => [
					n("strong", null, U(e.t("worktime", "Teilweise gebucht – bereits eigene Abwesenheit im Zeitraum:")), 1),
					r[25] ||= z(),
					n("ul", kP, [(J(!0), H(F, null, u(s.bookedWithSkippedDays, (e) => (J(), H("li", { key: e.employeeId }, U(s.skippedDaysLabel(e)), 1))), 128))])
				]),
				_: 1
			})) : K("", !0),
			r[29] ||= z(),
			o.result.skipped.length ? (J(), L(f, {
				key: 2,
				type: "warning"
			}, {
				default: A(() => [
					n("strong", null, U(e.t("worktime", "Nicht gebucht – bitte einzeln klären:")), 1),
					r[26] ||= z(),
					n("ul", AP, [(J(!0), H(F, null, u(o.result.skipped, (e) => (J(), H("li", { key: e.employeeId }, U(e.name) + " – " + U(s.reasonLabel(e.reason)), 1))), 128))])
				]),
				_: 1
			})) : K("", !0)
		])) : K("", !0),
		r[40] ||= z(),
		n("div", jP, [
			n("h4", null, U(e.t("worktime", "Eingetragene Betriebsferien")), 1),
			r[38] ||= z(),
			s.groups.length ? (J(), H("table", NP, [
				n("thead", null, [n("tr", null, [
					n("th", null, U(e.t("worktime", "Zeitraum")), 1),
					r[30] ||= z(),
					n("th", null, U(e.t("worktime", "Bemerkung")), 1),
					r[31] ||= z(),
					n("th", null, U(e.t("worktime", "Mitarbeiter")), 1),
					r[32] ||= z(),
					r[33] ||= n("th", null, null, -1)
				])]),
				r[37] ||= z(),
				n("tbody", null, [(J(!0), H(F, null, u(s.groups, (i) => (J(), H("tr", { key: i.key }, [
					n("td", null, U(i.label), 1),
					r[34] ||= z(),
					n("td", null, U(i.note || "–"), 1),
					r[35] ||= z(),
					n("td", null, U(i.count), 1),
					r[36] ||= z(),
					n("td", PP, [I(d, {
						variant: "tertiary",
						onClick: (e) => s.remove(i)
					}, {
						default: A(() => [z(U(e.t("worktime", "Entfernen")), 1)]),
						_: 1
					}, 8, ["onClick"])])
				]))), 128))])
			])) : (J(), H("p", MP, U(e.t("worktime", "Noch keine Betriebsferien eingetragen.")), 1))
		])
	]);
}
var IP = /*#__PURE__*/ Y(uP, [["render", FP], ["__scopeId", "data-v-87dfdb21"]]);
// node_modules/@ckpack/vue-color/libs/style-inject.es-746bb8ed.js
function LP(e, n) {
	n === void 0 && (n = {});
	var r = n.insertAt;
	if (e && typeof document < "u") {
		var i = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
		a.type = "text/css", r === "top" && i.firstChild ? i.insertBefore(a, i.firstChild) : i.appendChild(a), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e));
	}
}
// node_modules/@ckpack/vue-color/libs/utils/compoent.js
var RP = function(e, n) {
	let { componentPrefix: r = "" } = n || {};
	e.component(`${r}${this.name}`, this);
}, zP = {}, BP = {
	name: "Checkboard",
	props: {
		size: {
			type: [Number, String],
			default: 8
		},
		white: {
			type: String,
			default: "#fff"
		},
		grey: {
			type: String,
			default: "#e6e6e6"
		}
	},
	computed: { bgStyle() {
		return { "background-image": `url(${HP(this.white, this.grey, this.size)})` };
	} }
};
function VP(e, n, r) {
	if (typeof document > "u") return null;
	let i = document.createElement("canvas");
	i.width = i.height = r * 2;
	let a = i.getContext("2d");
	return a ? (a.fillStyle = e, a.fillRect(0, 0, i.width, i.height), a.fillStyle = n, a.fillRect(0, 0, r, r), a.translate(r, r), a.fillRect(0, 0, r, r), i.toDataURL()) : null;
}
function HP(e, n, r) {
	let i = `${e},${n},${r}`;
	if (zP[i]) return zP[i];
	let a = VP(e, n, r);
	return zP[i] = a, a;
}
function UP(e, n, r, i, a, o) {
	return J(), H("div", {
		class: "vc-checkerboard",
		style: Pe(o.bgStyle)
	}, null, 4);
}
LP(".vc-checkerboard{background-size:contain;bottom:0;left:0;position:absolute;right:0;top:0}"), BP.render = UP, BP.__file = "src/components/checkboard/checkboard.vue", BP.install = RP;
// node_modules/@ckpack/vue-color/libs/components/alpha/index.js
var WP = {
	name: "Alpha",
	components: { Checkboard: BP },
	props: {
		value: Object,
		onChange: Function
	},
	computed: {
		colors() {
			return this.value;
		},
		gradientColor() {
			let { rgba: e } = this.colors, n = [
				e.r,
				e.g,
				e.b
			].join(",");
			return `linear-gradient(to right, rgba(${n}, 0) 0%, rgba(${n}, 1) 100%)`;
		}
	},
	methods: {
		handleChange(e, n) {
			!n && e.preventDefault();
			let { container: r } = this.$refs;
			if (!r) return;
			let i = r.clientWidth, a = r.getBoundingClientRect().left + window.pageXOffset, o = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - a, s;
			s = o < 0 ? 0 : o > i ? 1 : Math.round(o * 100 / i) / 100, this.colors.a !== s && this.$emit("change", {
				h: this.colors.hsl.h,
				s: this.colors.hsl.s,
				l: this.colors.hsl.l,
				a: s,
				source: "rgba"
			});
		},
		handleMouseDown(e) {
			this.handleChange(e, !0), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseUp() {
			this.unbindEventListeners();
		},
		unbindEventListeners() {
			window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp);
		}
	}
}, GP = { class: "vc-alpha" }, KP = { class: "vc-alpha-checkboard-wrap" }, qP = [/* @__PURE__ */ n("div", { class: "vc-alpha-picker" }, null, -1)];
function JP(e, r, i, a, o, s) {
	let c = P("Checkboard");
	return J(), H("div", GP, [
		n("div", KP, [I(c)]),
		n("div", {
			class: "vc-alpha-gradient",
			style: Pe({ background: s.gradientColor })
		}, null, 4),
		n("div", {
			ref: "container",
			class: "vc-alpha-container",
			onMousedown: r[0] ||= (...e) => s.handleMouseDown && s.handleMouseDown(...e),
			onTouchmove: r[1] ||= (...e) => s.handleChange && s.handleChange(...e),
			onTouchstart: r[2] ||= (...e) => s.handleChange && s.handleChange(...e)
		}, [n("div", {
			class: "vc-alpha-pointer",
			style: Pe({ left: `${s.colors.a * 100}%` })
		}, qP, 4)], 544)
	]);
}
LP(".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}"), WP.render = JP, WP.__file = "src/components/alpha/alpha.vue", WP.install = RP;
// node_modules/@ctrl/tinycolor/dist/module/util.js
function YP(e, n) {
	ZP(e) && (e = "100%");
	var r = QP(e);
	return e = n === 360 ? e : Math.min(n, Math.max(0, parseFloat(e))), r && (e = parseInt(String(e * n), 10) / 100), Math.abs(e - n) < 1e-6 ? 1 : (e = n === 360 ? (e < 0 ? e % n + n : e % n) / parseFloat(String(n)) : e % n / parseFloat(String(n)), e);
}
function XP(e) {
	return Math.min(1, Math.max(0, e));
}
function ZP(e) {
	return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function QP(e) {
	return typeof e == "string" && e.indexOf("%") !== -1;
}
function $P(e) {
	return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function eF(e) {
	return e <= 1 ? `${Number(e) * 100}%` : e;
}
function tF(e) {
	return e.length === 1 ? "0" + e : String(e);
}
// node_modules/@ctrl/tinycolor/dist/module/conversion.js
function nF(e, n, r) {
	return {
		r: YP(e, 255) * 255,
		g: YP(n, 255) * 255,
		b: YP(r, 255) * 255
	};
}
function rF(e, n, r) {
	e = YP(e, 255), n = YP(n, 255), r = YP(r, 255);
	var i = Math.max(e, n, r), a = Math.min(e, n, r), o = 0, s = 0, c = (i + a) / 2;
	if (i === a) s = 0, o = 0;
	else {
		var l = i - a;
		switch (s = c > .5 ? l / (2 - i - a) : l / (i + a), i) {
			case e:
				o = (n - r) / l + (n < r ? 6 : 0);
				break;
			case n:
				o = (r - e) / l + 2;
				break;
			case r: o = (e - n) / l + 4;
		}
		o /= 6;
	}
	return {
		h: o,
		s,
		l: c
	};
}
function iF(e, n, r) {
	return r < 0 && (r += 1), r > 1 && --r, r < 1 / 6 ? e + (n - e) * (6 * r) : r < 1 / 2 ? n : r < 2 / 3 ? e + (n - e) * (2 / 3 - r) * 6 : e;
}
function aF(e, n, r) {
	var i, a, o;
	if (e = YP(e, 360), n = YP(n, 100), r = YP(r, 100), n === 0) a = r, o = r, i = r;
	else {
		var s = r < .5 ? r * (1 + n) : r + n - r * n, c = 2 * r - s;
		i = iF(c, s, e + 1 / 3), a = iF(c, s, e), o = iF(c, s, e - 1 / 3);
	}
	return {
		r: i * 255,
		g: a * 255,
		b: o * 255
	};
}
function oF(e, n, r) {
	e = YP(e, 255), n = YP(n, 255), r = YP(r, 255);
	var i = Math.max(e, n, r), a = Math.min(e, n, r), o = 0, s = i, c = i - a, l = i === 0 ? 0 : c / i;
	if (i === a) o = 0;
	else {
		switch (i) {
			case e:
				o = (n - r) / c + (n < r ? 6 : 0);
				break;
			case n:
				o = (r - e) / c + 2;
				break;
			case r: o = (e - n) / c + 4;
		}
		o /= 6;
	}
	return {
		h: o,
		s: l,
		v: s
	};
}
function sF(e, n, r) {
	e = YP(e, 360) * 6, n = YP(n, 100), r = YP(r, 100);
	var i = Math.floor(e), a = e - i, o = r * (1 - n), s = r * (1 - a * n), c = r * (1 - (1 - a) * n), l = i % 6, u = [
		r,
		s,
		o,
		o,
		c,
		r
	][l], d = [
		c,
		r,
		r,
		s,
		o,
		o
	][l], f = [
		o,
		o,
		c,
		r,
		r,
		s
	][l];
	return {
		r: u * 255,
		g: d * 255,
		b: f * 255
	};
}
function cF(e, n, r, i) {
	var a = [
		tF(Math.round(e).toString(16)),
		tF(Math.round(n).toString(16)),
		tF(Math.round(r).toString(16))
	];
	return i && a[0].startsWith(a[0].charAt(1)) && a[1].startsWith(a[1].charAt(1)) && a[2].startsWith(a[2].charAt(1)) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("");
}
function lF(e, n, r, i, a) {
	var o = [
		tF(Math.round(e).toString(16)),
		tF(Math.round(n).toString(16)),
		tF(Math.round(r).toString(16)),
		tF(uF(i))
	];
	return a && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) && o[3].startsWith(o[3].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0) : o.join("");
}
function uF(e) {
	return Math.round(parseFloat(e) * 255).toString(16);
}
function dF(e) {
	return fF(e) / 255;
}
function fF(e) {
	return parseInt(e, 16);
}
function pF(e) {
	return {
		r: e >> 16,
		g: (e & 65280) >> 8,
		b: e & 255
	};
}
// node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
var mF = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkgrey: "#a9a9a9",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	goldenrod: "#daa520",
	gold: "#ffd700",
	gray: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	grey: "#808080",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavenderblush: "#fff0f5",
	lavender: "#e6e6fa",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32"
};
// node_modules/@ctrl/tinycolor/dist/module/format-input.js
function hF(e) {
	var n = {
		r: 0,
		g: 0,
		b: 0
	}, r = 1, i = null, a = null, o = null, s = !1, c = !1;
	return typeof e == "string" && (e = bF(e)), typeof e == "object" && (xF(e.r) && xF(e.g) && xF(e.b) ? (n = nF(e.r, e.g, e.b), s = !0, c = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : xF(e.h) && xF(e.s) && xF(e.v) ? (i = eF(e.s), a = eF(e.v), n = sF(e.h, i, a), s = !0, c = "hsv") : xF(e.h) && xF(e.s) && xF(e.l) && (i = eF(e.s), o = eF(e.l), n = aF(e.h, i, o), s = !0, c = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (r = e.a)), r = $P(r), {
		ok: s,
		format: e.format || c,
		r: Math.min(255, Math.max(n.r, 0)),
		g: Math.min(255, Math.max(n.g, 0)),
		b: Math.min(255, Math.max(n.b, 0)),
		a: r
	};
}
var gF = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)", _F = `[\\s|\\(]+(${gF})[,|\\s]+(${gF})[,|\\s]+(${gF})\\s*\\)?`, vF = `[\\s|\\(]+(${gF})[,|\\s]+(${gF})[,|\\s]+(${gF})[,|\\s]+(${gF})\\s*\\)?`, yF = {
	CSS_UNIT: new RegExp(gF),
	rgb: RegExp("rgb" + _F),
	rgba: RegExp("rgba" + vF),
	hsl: RegExp("hsl" + _F),
	hsla: RegExp("hsla" + vF),
	hsv: RegExp("hsv" + _F),
	hsva: RegExp("hsva" + vF),
	hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function bF(e) {
	if (e = e.trim().toLowerCase(), e.length === 0) return !1;
	var n = !1;
	if (mF[e]) e = mF[e], n = !0;
	else if (e === "transparent") return {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
		format: "name"
	};
	var r = yF.rgb.exec(e);
	return r ? {
		r: r[1],
		g: r[2],
		b: r[3]
	} : (r = yF.rgba.exec(e), r ? {
		r: r[1],
		g: r[2],
		b: r[3],
		a: r[4]
	} : (r = yF.hsl.exec(e), r ? {
		h: r[1],
		s: r[2],
		l: r[3]
	} : (r = yF.hsla.exec(e), r ? {
		h: r[1],
		s: r[2],
		l: r[3],
		a: r[4]
	} : (r = yF.hsv.exec(e), r ? {
		h: r[1],
		s: r[2],
		v: r[3]
	} : (r = yF.hsva.exec(e), r ? {
		h: r[1],
		s: r[2],
		v: r[3],
		a: r[4]
	} : (r = yF.hex8.exec(e), r ? {
		r: fF(r[1]),
		g: fF(r[2]),
		b: fF(r[3]),
		a: dF(r[4]),
		format: n ? "name" : "hex8"
	} : (r = yF.hex6.exec(e), r ? {
		r: fF(r[1]),
		g: fF(r[2]),
		b: fF(r[3]),
		format: n ? "name" : "hex"
	} : (r = yF.hex4.exec(e), r ? {
		r: fF(r[1] + r[1]),
		g: fF(r[2] + r[2]),
		b: fF(r[3] + r[3]),
		a: dF(r[4] + r[4]),
		format: n ? "name" : "hex8"
	} : (r = yF.hex3.exec(e), r ? {
		r: fF(r[1] + r[1]),
		g: fF(r[2] + r[2]),
		b: fF(r[3] + r[3]),
		format: n ? "name" : "hex"
	} : !1)))))))));
}
function xF(e) {
	return !!yF.CSS_UNIT.exec(String(e));
}
// node_modules/@ctrl/tinycolor/dist/module/index.js
var SF = function() {
	function e(n, r) {
		if (n === void 0 && (n = ""), r === void 0 && (r = {}), n instanceof e) return n;
		typeof n == "number" && (n = pF(n)), this.originalInput = n;
		var i = hF(n);
		this.originalInput = n, this.r = i.r, this.g = i.g, this.b = i.b, this.a = i.a, this.roundA = Math.round(100 * this.a) / 100, this.format = r.format ?? i.format, this.gradientType = r.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = i.ok;
	}
	return e.prototype.isDark = function() {
		return this.getBrightness() < 128;
	}, e.prototype.isLight = function() {
		return !this.isDark();
	}, e.prototype.getBrightness = function() {
		var e = this.toRgb();
		return (e.r * 299 + e.g * 587 + e.b * 114) / 1e3;
	}, e.prototype.getLuminance = function() {
		var e = this.toRgb(), n, r, i, a = e.r / 255, o = e.g / 255, s = e.b / 255;
		return n = a <= .03928 ? a / 12.92 : ((a + .055) / 1.055) ** 2.4, r = o <= .03928 ? o / 12.92 : ((o + .055) / 1.055) ** 2.4, i = s <= .03928 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4, .2126 * n + .7152 * r + .0722 * i;
	}, e.prototype.getAlpha = function() {
		return this.a;
	}, e.prototype.setAlpha = function(e) {
		return this.a = $P(e), this.roundA = Math.round(100 * this.a) / 100, this;
	}, e.prototype.isMonochrome = function() {
		return this.toHsl().s === 0;
	}, e.prototype.toHsv = function() {
		var e = oF(this.r, this.g, this.b);
		return {
			h: e.h * 360,
			s: e.s,
			v: e.v,
			a: this.a
		};
	}, e.prototype.toHsvString = function() {
		var e = oF(this.r, this.g, this.b), n = Math.round(e.h * 360), r = Math.round(e.s * 100), i = Math.round(e.v * 100);
		return this.a === 1 ? `hsv(${n}, ${r}%, ${i}%)` : `hsva(${n}, ${r}%, ${i}%, ${this.roundA})`;
	}, e.prototype.toHsl = function() {
		var e = rF(this.r, this.g, this.b);
		return {
			h: e.h * 360,
			s: e.s,
			l: e.l,
			a: this.a
		};
	}, e.prototype.toHslString = function() {
		var e = rF(this.r, this.g, this.b), n = Math.round(e.h * 360), r = Math.round(e.s * 100), i = Math.round(e.l * 100);
		return this.a === 1 ? `hsl(${n}, ${r}%, ${i}%)` : `hsla(${n}, ${r}%, ${i}%, ${this.roundA})`;
	}, e.prototype.toHex = function(e) {
		return e === void 0 && (e = !1), cF(this.r, this.g, this.b, e);
	}, e.prototype.toHexString = function(e) {
		return e === void 0 && (e = !1), "#" + this.toHex(e);
	}, e.prototype.toHex8 = function(e) {
		return e === void 0 && (e = !1), lF(this.r, this.g, this.b, this.a, e);
	}, e.prototype.toHex8String = function(e) {
		return e === void 0 && (e = !1), "#" + this.toHex8(e);
	}, e.prototype.toHexShortString = function(e) {
		return e === void 0 && (e = !1), this.a === 1 ? this.toHexString(e) : this.toHex8String(e);
	}, e.prototype.toRgb = function() {
		return {
			r: Math.round(this.r),
			g: Math.round(this.g),
			b: Math.round(this.b),
			a: this.a
		};
	}, e.prototype.toRgbString = function() {
		var e = Math.round(this.r), n = Math.round(this.g), r = Math.round(this.b);
		return this.a === 1 ? `rgb(${e}, ${n}, ${r})` : `rgba(${e}, ${n}, ${r}, ${this.roundA})`;
	}, e.prototype.toPercentageRgb = function() {
		var e = function(e) {
			return `${Math.round(YP(e, 255) * 100)}%`;
		};
		return {
			r: e(this.r),
			g: e(this.g),
			b: e(this.b),
			a: this.a
		};
	}, e.prototype.toPercentageRgbString = function() {
		var e = function(e) {
			return Math.round(YP(e, 255) * 100);
		};
		return this.a === 1 ? `rgb(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%)` : `rgba(${e(this.r)}%, ${e(this.g)}%, ${e(this.b)}%, ${this.roundA})`;
	}, e.prototype.toName = function() {
		if (this.a === 0) return "transparent";
		if (this.a < 1) return !1;
		for (var e = "#" + cF(this.r, this.g, this.b, !1), n = 0, r = Object.entries(mF); n < r.length; n++) {
			var i = r[n], a = i[0];
			if (e === i[1]) return a;
		}
		return !1;
	}, e.prototype.toString = function(e) {
		var n = !!e;
		e ??= this.format;
		var r = !1, i = this.a < 1 && this.a >= 0;
		return !n && i && (e.startsWith("hex") || e === "name") ? e === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (e === "rgb" && (r = this.toRgbString()), e === "prgb" && (r = this.toPercentageRgbString()), (e === "hex" || e === "hex6") && (r = this.toHexString()), e === "hex3" && (r = this.toHexString(!0)), e === "hex4" && (r = this.toHex8String(!0)), e === "hex8" && (r = this.toHex8String()), e === "name" && (r = this.toName()), e === "hsl" && (r = this.toHslString()), e === "hsv" && (r = this.toHsvString()), r || this.toHexString());
	}, e.prototype.toNumber = function() {
		return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
	}, e.prototype.clone = function() {
		return new e(this.toString());
	}, e.prototype.lighten = function(n) {
		n === void 0 && (n = 10);
		var r = this.toHsl();
		return r.l += n / 100, r.l = XP(r.l), new e(r);
	}, e.prototype.brighten = function(n) {
		n === void 0 && (n = 10);
		var r = this.toRgb();
		return r.r = Math.max(0, Math.min(255, r.r - Math.round(255 * -(n / 100)))), r.g = Math.max(0, Math.min(255, r.g - Math.round(255 * -(n / 100)))), r.b = Math.max(0, Math.min(255, r.b - Math.round(255 * -(n / 100)))), new e(r);
	}, e.prototype.darken = function(n) {
		n === void 0 && (n = 10);
		var r = this.toHsl();
		return r.l -= n / 100, r.l = XP(r.l), new e(r);
	}, e.prototype.tint = function(e) {
		return e === void 0 && (e = 10), this.mix("white", e);
	}, e.prototype.shade = function(e) {
		return e === void 0 && (e = 10), this.mix("black", e);
	}, e.prototype.desaturate = function(n) {
		n === void 0 && (n = 10);
		var r = this.toHsl();
		return r.s -= n / 100, r.s = XP(r.s), new e(r);
	}, e.prototype.saturate = function(n) {
		n === void 0 && (n = 10);
		var r = this.toHsl();
		return r.s += n / 100, r.s = XP(r.s), new e(r);
	}, e.prototype.greyscale = function() {
		return this.desaturate(100);
	}, e.prototype.spin = function(n) {
		var r = this.toHsl(), i = (r.h + n) % 360;
		return r.h = i < 0 ? 360 + i : i, new e(r);
	}, e.prototype.mix = function(n, r) {
		r === void 0 && (r = 50);
		var i = this.toRgb(), a = new e(n).toRgb(), o = r / 100;
		return new e({
			r: (a.r - i.r) * o + i.r,
			g: (a.g - i.g) * o + i.g,
			b: (a.b - i.b) * o + i.b,
			a: (a.a - i.a) * o + i.a
		});
	}, e.prototype.analogous = function(n, r) {
		n === void 0 && (n = 6), r === void 0 && (r = 30);
		var i = this.toHsl(), a = 360 / r, o = [this];
		for (i.h = (i.h - (a * n >> 1) + 720) % 360; --n;) i.h = (i.h + a) % 360, o.push(new e(i));
		return o;
	}, e.prototype.complement = function() {
		var n = this.toHsl();
		return n.h = (n.h + 180) % 360, new e(n);
	}, e.prototype.monochromatic = function(n) {
		n === void 0 && (n = 6);
		for (var r = this.toHsv(), i = r.h, a = r.s, o = r.v, s = [], c = 1 / n; n--;) s.push(new e({
			h: i,
			s: a,
			v: o
		})), o = (o + c) % 1;
		return s;
	}, e.prototype.splitcomplement = function() {
		var n = this.toHsl(), r = n.h;
		return [
			this,
			new e({
				h: (r + 72) % 360,
				s: n.s,
				l: n.l
			}),
			new e({
				h: (r + 216) % 360,
				s: n.s,
				l: n.l
			})
		];
	}, e.prototype.onBackground = function(n) {
		var r = this.toRgb(), i = new e(n).toRgb(), a = r.a + i.a * (1 - r.a);
		return new e({
			r: (r.r * r.a + i.r * i.a * (1 - r.a)) / a,
			g: (r.g * r.a + i.g * i.a * (1 - r.a)) / a,
			b: (r.b * r.a + i.b * i.a * (1 - r.a)) / a,
			a
		});
	}, e.prototype.triad = function() {
		return this.polyad(3);
	}, e.prototype.tetrad = function() {
		return this.polyad(4);
	}, e.prototype.polyad = function(n) {
		for (var r = this.toHsl(), i = r.h, a = [this], o = 360 / n, s = 1; s < n; s++) a.push(new e({
			h: (i + s * o) % 360,
			s: r.s,
			l: r.l
		}));
		return a;
	}, e.prototype.equals = function(n) {
		return this.toRgbString() === new e(n).toRgbString();
	}, e;
}();
// node_modules/@ckpack/vue-color/libs/mixin/color.js
function CF(...e) {
	return new SF(...e);
}
function wF(e, n) {
	let r = e && e.a, i;
	i = e && e.hsl ? CF(e.hsl) : e && e.hex && e.hex.length > 0 ? CF(e.hex) : e && e.hsv ? CF(e.hsv) : e && e.rgba ? CF(e.rgba) : e && e.rgb ? CF(e.rgb) : CF(e), i && (i._a === void 0 || i._a === null) && i.setAlpha(r || i.getAlpha());
	let a = i.toHsl(), o = i.toHsv();
	return a.s === 0 && (o.h = a.h = e.h || e.hsl && e.hsl.h || n || 0), o.v < .0164 && (o.h = e.h || e.hsv && e.hsv.h || 0, o.s = e.s || e.hsv && e.hsv.s || 0), a.l < .01 && (a.h = e.h || e.hsl && e.hsl.h || 0, a.s = e.s || e.hsl && e.hsl.s || 0), {
		hsl: a,
		hex: i.toHexString().toUpperCase(),
		hex8: i.toHex8String().toUpperCase(),
		rgba: i.toRgb(),
		hsv: o,
		oldHue: e.h || n || a.h,
		source: e.source,
		a: i.getAlpha()
	};
}
var TF = {
	model: {
		prop: "modelValue",
		event: "update:modelValue"
	},
	props: ["modelValue"],
	data() {
		return { val: wF(this.modelValue) };
	},
	computed: { colors: {
		get() {
			return this.val;
		},
		set(e) {
			this.val = e, this.$emit("update:modelValue", e);
		}
	} },
	watch: { modelValue(e) {
		this.val = wF(e);
	} },
	methods: {
		colorChange(e, n) {
			this.oldHue = this.colors.hsl.h, this.colors = wF(e, n || this.oldHue);
		},
		isValidHex(e) {
			return CF(e).isValid;
		},
		simpleCheckForValidColor(e) {
			let n = [
				"r",
				"g",
				"b",
				"a",
				"h",
				"s",
				"l",
				"v"
			], r = 0, i = 0;
			for (let a = 0; a < n.length; a++) {
				let o = n[a];
				e[o] && (r++, isNaN(e[o]) || i++);
			}
			if (r === i) return e;
		},
		paletteUpperCase(e) {
			return e.map((e) => e.toUpperCase());
		},
		isTransparent(e) {
			return CF(e).getAlpha() === 0;
		}
	}
}, EF = {
	name: "EditableInput",
	props: {
		label: String,
		labelText: String,
		desc: String,
		value: [String, Number],
		max: Number,
		min: Number,
		arrowOffset: {
			type: Number,
			default: 1
		}
	},
	computed: {
		val: {
			get() {
				return this.value;
			},
			set(e) {
				if (this.max !== void 0 && +e > this.max) this.$refs.input.value = this.max;
				else return e;
			}
		},
		labelId() {
			return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
		},
		labelSpanText() {
			return this.labelText || this.label;
		}
	},
	methods: {
		update(e) {
			this.handleChange(e.target.value);
		},
		handleChange(e) {
			let n = {};
			n[this.label] = e, (n.hex === void 0 && n["#"] === void 0 || e.length > 5) && this.$emit("change", n);
		},
		handleKeyDown(e) {
			let { val: n } = this, r = Number(n);
			if (r) {
				let i = this.arrowOffset || 1;
				e.keyCode === 38 && (n = r + i, this.handleChange(n), e.preventDefault()), e.keyCode === 40 && (n = r - i, this.handleChange(n), e.preventDefault());
			}
		}
	}
}, DF = { class: "vc-editable-input" }, OF = ["aria-labelledby"], kF = ["id", "for"], AF = { class: "vc-input__desc" };
function jF(e, r, i, a, o, s) {
	return J(), H("div", DF, [
		N(n("input", {
			ref: "input",
			"onUpdate:modelValue": r[0] ||= (e) => s.val = e,
			"aria-labelledby": s.labelId,
			class: "vc-input__input",
			onKeydown: r[1] ||= (...e) => s.handleKeyDown && s.handleKeyDown(...e),
			onInput: r[2] ||= (...e) => s.update && s.update(...e)
		}, null, 40, OF), [[y, s.val]]),
		n("span", {
			id: s.labelId,
			for: i.label,
			class: "vc-input__label"
		}, U(s.labelSpanText), 9, kF),
		n("span", AF, U(i.desc), 1)
	]);
}
LP(".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}"), EF.render = jF, EF.__file = "src/components/editable-input/editable-input.vue", EF.install = RP;
// node_modules/@ckpack/vue-color/libs/utils/utils.js
function MF(e, n, r) {
	return n < r ? e < n ? n : e > r ? r : e : e < r ? r : e > n ? n : e;
}
// node_modules/@ckpack/vue-color/libs/components/saturation/index.js
var NF = {
	name: "Saturation",
	props: { value: Object },
	computed: {
		colors() {
			return this.value;
		},
		bgColor() {
			return `hsl(${this.colors.hsv.h}, 100%, 50%)`;
		},
		pointerTop() {
			return `${-(this.colors.hsv.v * 100) + 1 + 100}%`;
		},
		pointerLeft() {
			return `${this.colors.hsv.s * 100}%`;
		}
	},
	methods: {
		handleChange(e, n) {
			!n && e.preventDefault();
			let { container: r } = this.$refs;
			if (!r) return;
			let i = r.clientWidth, a = r.clientHeight, o = r.getBoundingClientRect().left + window.pageXOffset, s = r.getBoundingClientRect().top + window.pageYOffset, c = e.pageX || (e.touches ? e.touches[0].pageX : 0), l = e.pageY || (e.touches ? e.touches[0].pageY : 0), u = MF(c - o, 0, i), d = MF(l - s, 0, a), f = u / i, p = MF(-(d / a) + 1, 0, 1);
			this.onChange({
				h: this.colors.hsv.h,
				s: f,
				v: p,
				a: this.colors.hsv.a,
				source: "hsva"
			});
		},
		onChange(e) {
			this.$emit("change", e);
		},
		handleMouseDown(e) {
			window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseUp(e) {
			this.unbindEventListeners();
		},
		unbindEventListeners() {
			window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp);
		}
	}
}, PF = /*#__PURE__*/ n("div", { class: "vc-saturation--white" }, null, -1), FF = /*#__PURE__*/ n("div", { class: "vc-saturation--black" }, null, -1), IF = [/* @__PURE__ */ n("div", { class: "vc-saturation-circle" }, null, -1)];
function LF(e, r, i, a, o, s) {
	return J(), H("div", {
		ref: "container",
		class: "vc-saturation",
		style: Pe({ background: s.bgColor }),
		onMousedown: r[0] ||= (...e) => s.handleMouseDown && s.handleMouseDown(...e),
		onTouchmove: r[1] ||= (...e) => s.handleChange && s.handleChange(...e),
		onTouchstart: r[2] ||= (...e) => s.handleChange && s.handleChange(...e)
	}, [
		PF,
		FF,
		n("div", {
			class: "vc-saturation-pointer",
			style: Pe({
				top: s.pointerTop,
				left: s.pointerLeft
			})
		}, IF, 4)
	], 36);
}
LP(".vc-saturation,.vc-saturation--black,.vc-saturation--white{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.vc-saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vc-saturation--black{background:linear-gradient(0deg,#000,transparent)}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}"), NF.render = LF, NF.__file = "src/components/saturation/saturation.vue", NF.install = RP;
// node_modules/@ckpack/vue-color/libs/components/hue/index.js
var RF = {
	name: "Hue",
	props: {
		value: Object,
		direction: {
			type: String,
			default: "horizontal"
		}
	},
	data() {
		return {
			oldHue: 0,
			pullDirection: ""
		};
	},
	computed: {
		colors() {
			return this.value;
		},
		directionClass() {
			return {
				"vc-hue--horizontal": this.direction === "horizontal",
				"vc-hue--vertical": this.direction === "vertical"
			};
		},
		pointerTop() {
			return this.direction === "vertical" ? this.colors.hsl.h === 0 && this.pullDirection === "right" ? 0 : `${-(this.colors.hsl.h * 100 / 360) + 100}%` : 0;
		},
		pointerLeft() {
			return this.direction === "vertical" ? 0 : this.colors.hsl.h === 0 && this.pullDirection === "right" ? "100%" : `${this.colors.hsl.h * 100 / 360}%`;
		}
	},
	watch: { value: {
		handler(e, n) {
			let { h: r } = e.hsl;
			r !== 0 && r - this.oldHue > 0 && (this.pullDirection = "right"), r !== 0 && r - this.oldHue < 0 && (this.pullDirection = "left"), this.oldHue = r;
		},
		deep: !0,
		immediate: !0
	} },
	methods: {
		handleChange(e, n) {
			!n && e.preventDefault();
			let { container: r } = this.$refs;
			if (!r) return;
			let i = r.clientWidth, a = r.clientHeight, o = r.getBoundingClientRect().left + window.pageXOffset, s = r.getBoundingClientRect().top + window.pageYOffset, c = e.pageX || (e.touches ? e.touches[0].pageX : 0), l = e.pageY || (e.touches ? e.touches[0].pageY : 0), u = c - o, d = l - s, f, p;
			this.direction === "vertical" ? (d < 0 ? f = 360 : d > a ? f = 0 : (p = -(d * 100 / a) + 100, f = 360 * p / 100), this.colors.hsl.h !== f && this.$emit("change", {
				h: f,
				s: this.colors.hsl.s,
				l: this.colors.hsl.l,
				a: this.colors.hsl.a,
				source: "hsl"
			})) : (u < 0 ? f = 0 : u > i ? f = 360 : (p = u * 100 / i, f = 360 * p / 100), this.colors.hsl.h !== f && this.$emit("change", {
				h: f,
				s: this.colors.hsl.s,
				l: this.colors.hsl.l,
				a: this.colors.hsl.a,
				source: "hsl"
			}));
		},
		handleMouseDown(e) {
			this.handleChange(e, !0), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseUp(e) {
			this.unbindEventListeners();
		},
		unbindEventListeners() {
			window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp);
		}
	}
}, zF = ["aria-valuenow"], BF = [/* @__PURE__ */ n("div", { class: "vc-hue-picker" }, null, -1)];
function VF(e, r, i, a, o, s) {
	return J(), H("div", { class: G(["vc-hue", [s.directionClass]]) }, [n("div", {
		ref: "container",
		class: "vc-hue-container",
		role: "slider",
		"aria-valuenow": s.colors.hsl.h,
		"aria-valuemin": "0",
		"aria-valuemax": "360",
		onMousedown: r[0] ||= (...e) => s.handleMouseDown && s.handleMouseDown(...e),
		onTouchmove: r[1] ||= (...e) => s.handleChange && s.handleChange(...e),
		onTouchstart: r[2] ||= (...e) => s.handleChange && s.handleChange(...e)
	}, [n("div", {
		class: "vc-hue-pointer",
		style: Pe({
			top: s.pointerTop,
			left: s.pointerLeft
		}),
		role: "presentation"
	}, BF, 4)], 40, zF)], 2);
}
LP(".vc-hue{border-radius:2px;bottom:0;left:0;position:absolute;right:0;top:0}.vc-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue-container{cursor:pointer;height:100%;margin:0 2px;position:relative}.vc-hue-pointer{position:absolute;z-index:2}.vc-hue-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}"), RF.render = VF, RF.__file = "src/components/hue/hue.vue", RF.install = RP;
// node_modules/@ckpack/vue-color/libs/components/chrome/index.js
var HF = {
	name: "Chrome",
	components: {
		Saturation: NF,
		Hue: RF,
		Alpha: WP,
		EdIn: EF,
		Checkboard: BP
	},
	mixins: [TF],
	props: {
		disableAlpha: {
			type: Boolean,
			default: !1
		},
		disableFields: {
			type: Boolean,
			default: !1
		},
		format: {
			type: String,
			default: "hex"
		}
	},
	data() {
		return {
			fieldsIndex: "hex",
			highlight: !1
		};
	},
	computed: {
		hsl() {
			let { h: e, s: n, l: r } = this.colors.hsl;
			return {
				h: e.toFixed(),
				s: `${(n * 100).toFixed()}%`,
				l: `${(r * 100).toFixed()}%`
			};
		},
		activeColor() {
			let { rgba: e } = this.colors;
			return `rgba(${[
				e.r,
				e.g,
				e.b,
				e.a
			].join(",")})`;
		},
		hasAlpha() {
			return this.colors.a < 1;
		}
	},
	watch: { format: {
		handler(e) {
			this.fieldsIndex = e;
		},
		immediate: !0
	} },
	methods: {
		childChange(e) {
			this.colorChange(e);
		},
		inputChange(e) {
			if (e) {
				if (e.hex) this.isValidHex(e.hex) && this.colorChange({
					hex: e.hex,
					source: "hex"
				});
				else if (e.r || e.g || e.b || e.a) this.colorChange({
					r: e.r || this.colors.rgba.r,
					g: e.g || this.colors.rgba.g,
					b: e.b || this.colors.rgba.b,
					a: e.a || this.colors.rgba.a,
					source: "rgba"
				});
				else if (e.h || e.s || e.l) {
					let n = e.s ? e.s.replace("%", "") / 100 : this.colors.hsl.s, r = e.l ? e.l.replace("%", "") / 100 : this.colors.hsl.l;
					this.colorChange({
						h: e.h || this.colors.hsl.h,
						s: n,
						l: r,
						source: "hsl"
					});
				}
			}
		},
		toggleViews() {
			switch (this.fieldsIndex) {
				case "hex":
					this.fieldsIndex = `rgb${this.disableAlpha ? "" : "a"}`;
					break;
				case "rgb":
				case "rgba":
					this.fieldsIndex = `hsl${this.disableAlpha ? "" : "a"}`;
					break;
				default: this.fieldsIndex = "hex";
			}
			this.$emit("update:format", this.fieldsIndex);
		},
		showHighlight() {
			this.highlight = !0;
		},
		hideHighlight() {
			this.highlight = !1;
		}
	}
}, UF = { class: "vc-chrome-saturation-wrap" }, WF = { class: "vc-chrome-body" }, GF = { class: "vc-chrome-controls" }, KF = { class: "vc-chrome-color-wrap" }, qF = ["aria-label"], JF = { class: "vc-chrome-sliders" }, YF = { class: "vc-chrome-hue-wrap" }, XF = {
	key: 0,
	class: "vc-chrome-alpha-wrap"
}, ZF = {
	key: 0,
	class: "vc-chrome-fields-wrap"
}, QF = { class: "vc-chrome-fields" }, $F = { class: "vc-chrome-field" }, eI = { class: "vc-chrome-fields" }, tI = { class: "vc-chrome-field" }, nI = { class: "vc-chrome-field" }, rI = { class: "vc-chrome-field" }, iI = {
	key: 0,
	class: "vc-chrome-field"
}, aI = { class: "vc-chrome-fields" }, oI = { class: "vc-chrome-field" }, sI = { class: "vc-chrome-field" }, cI = { class: "vc-chrome-field" }, lI = {
	key: 0,
	class: "vc-chrome-field"
}, uI = { class: "vc-chrome-toggle-icon" }, dI = [/* @__PURE__ */ n("path", {
	fill: "#333",
	d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
}, null, -1)], fI = { class: "vc-chrome-toggle-icon-highlight" };
function pI(e, r, i, a, o, s) {
	let c = P("Saturation"), l = P("Checkboard"), u = P("Hue"), d = P("Alpha"), f = P("EdIn");
	return J(), H("div", {
		role: "application",
		"aria-label": "Chrome color picker",
		class: G(["vc-chrome", [i.disableAlpha ? "vc-chrome__disable-alpha" : ""]])
	}, [n("div", UF, [I(c, {
		value: e.colors,
		onChange: s.childChange
	}, null, 8, ["value", "onChange"])]), n("div", WF, [n("div", GF, [n("div", KF, [n("div", {
		"aria-label": `current color is ${e.colors.hex}`,
		class: "vc-chrome-active-color",
		style: Pe({ background: s.activeColor })
	}, null, 12, qF), i.disableAlpha ? K("v-if", !0) : (J(), L(l, { key: 0 }))]), n("div", JF, [n("div", YF, [I(u, {
		value: e.colors,
		onChange: s.childChange
	}, null, 8, ["value", "onChange"])]), i.disableAlpha ? K("v-if", !0) : (J(), H("div", XF, [I(d, {
		value: e.colors,
		onChange: s.childChange
	}, null, 8, ["value", "onChange"])]))])]), i.disableFields ? K("v-if", !0) : (J(), H("div", ZF, [
		N(n("div", QF, [K(" hex "), n("div", $F, [s.hasAlpha ? K("v-if", !0) : (J(), L(f, {
			key: 0,
			label: "hex",
			value: e.colors.hex,
			onChange: s.inputChange
		}, null, 8, ["value", "onChange"])), s.hasAlpha ? (J(), L(f, {
			key: 1,
			label: "hex",
			value: e.colors.hex8,
			onChange: s.inputChange
		}, null, 8, ["value", "onChange"])) : K("v-if", !0)])], 512), [[k, o.fieldsIndex === "hex"]]),
		N(n("div", eI, [
			K(" rgba "),
			n("div", tI, [I(f, {
				label: "r",
				value: e.colors.rgba.r,
				onChange: s.inputChange
			}, null, 8, ["value", "onChange"])]),
			n("div", nI, [I(f, {
				label: "g",
				value: e.colors.rgba.g,
				onChange: s.inputChange
			}, null, 8, ["value", "onChange"])]),
			n("div", rI, [I(f, {
				label: "b",
				value: e.colors.rgba.b,
				onChange: s.inputChange
			}, null, 8, ["value", "onChange"])]),
			i.disableAlpha ? K("v-if", !0) : (J(), H("div", iI, [I(f, {
				label: "a",
				value: e.colors.a,
				"arrow-offset": .01,
				max: 1,
				onChange: s.inputChange
			}, null, 8, [
				"value",
				"arrow-offset",
				"onChange"
			])]))
		], 512), [[k, ["rgb", "rgba"].includes(o.fieldsIndex)]]),
		N(n("div", aI, [
			K(" hsla "),
			n("div", oI, [I(f, {
				label: "h",
				value: s.hsl.h,
				onChange: s.inputChange
			}, null, 8, ["value", "onChange"])]),
			n("div", sI, [I(f, {
				label: "s",
				value: s.hsl.s,
				onChange: s.inputChange
			}, null, 8, ["value", "onChange"])]),
			n("div", cI, [I(f, {
				label: "l",
				value: s.hsl.l,
				onChange: s.inputChange
			}, null, 8, ["value", "onChange"])]),
			i.disableAlpha ? K("v-if", !0) : (J(), H("div", lI, [I(f, {
				label: "a",
				value: e.colors.a,
				"arrow-offset": .01,
				max: 1,
				onChange: s.inputChange
			}, null, 8, [
				"value",
				"arrow-offset",
				"onChange"
			])]))
		], 512), [[k, ["hsl", "hsla"].includes(o.fieldsIndex)]]),
		K(" btn "),
		n("div", {
			class: "vc-chrome-toggle-btn",
			role: "button",
			"aria-label": "Change another color definition",
			onClick: r[3] ||= (...e) => s.toggleViews && s.toggleViews(...e)
		}, [n("div", uI, [(J(), H("svg", {
			style: {
				width: "24px",
				height: "24px"
			},
			viewBox: "0 0 24 24",
			onMouseover: r[0] ||= (...e) => s.showHighlight && s.showHighlight(...e),
			onMouseenter: r[1] ||= (...e) => s.showHighlight && s.showHighlight(...e),
			onMouseout: r[2] ||= (...e) => s.hideHighlight && s.hideHighlight(...e)
		}, dI, 32))]), N(n("div", fI, null, 512), [[k, o.highlight]])]),
		K(" btn ")
	]))])], 2);
}
// node_modules/@nextcloud/vue/dist/chunks/NcColorPicker.mjs
LP(".vc-chrome{background:#fff;background-color:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.3);box-sizing:initial;font-family:Menlo;width:225px}.vc-chrome-controls{display:flex}.vc-chrome-color-wrap{position:relative;width:36px}.vc-chrome-active-color{border-radius:15px;height:30px;overflow:hidden;position:relative;width:30px;z-index:1}.vc-chrome-color-wrap .vc-checkerboard{background-size:auto;border-radius:15px;height:30px;width:30px}.vc-chrome-sliders{flex:1}.vc-chrome-fields-wrap{display:flex;padding-top:16px}.vc-chrome-fields{display:flex;flex:1;margin-left:-6px}.vc-chrome-field{padding-left:6px;width:100%}.vc-chrome-toggle-btn{position:relative;text-align:right;width:32px}.vc-chrome-toggle-icon{cursor:pointer;margin-right:-4px;margin-top:12px;position:relative;z-index:2}.vc-chrome-toggle-icon-highlight{background:#eee;border-radius:4px;height:28px;left:12px;position:absolute;top:10px;width:24px}.vc-chrome-hue-wrap{margin-bottom:8px}.vc-chrome-alpha-wrap,.vc-chrome-hue-wrap{height:10px;position:relative}.vc-chrome-alpha-wrap .vc-alpha-gradient,.vc-chrome-hue-wrap .vc-hue{border-radius:2px}.vc-chrome-alpha-wrap .vc-alpha-picker,.vc-chrome-hue-wrap .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:12px;transform:translate(-6px,-2px);width:12px}.vc-chrome-body{background-color:#fff;padding:16px 16px 12px}.vc-chrome-saturation-wrap{border-radius:2px 2px 0 0;overflow:hidden;padding-bottom:55%;position:relative;width:100%}.vc-chrome-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-chrome-fields .vc-input__input{border:none;border-radius:2px;box-shadow:inset 0 0 0 1px #dadada;color:#333;font-size:11px;height:21px;text-align:center;width:100%}.vc-chrome-fields .vc-input__label{color:#969696;display:block;font-size:11px;line-height:11px;margin-top:12px;text-align:center;text-transform:uppercase}.vc-chrome__disable-alpha .vc-chrome-active-color{height:18px;width:18px}.vc-chrome__disable-alpha .vc-chrome-color-wrap{width:30px}.vc-chrome__disable-alpha .vc-chrome-hue-wrap{margin-bottom:4px;margin-top:4px}"), HF.render = pI, HF.__file = "src/components/chrome/chrome.vue", HF.install = RP, m(ct);
var mI = ["aria-label"], hI = {
	key: 0,
	class: "color-picker__simple"
}, gI = [
	"aria-label",
	"name",
	"checked",
	"onClick"
], _I = ["title"], vI = [
	"aria-label",
	"name",
	"checked"
], yI = {
	key: 0,
	class: "color-picker__navigation"
}, bI = /* @__PURE__ */ je(/* @__PURE__ */ xt({
	__name: "NcColorPicker",
	props: /* @__PURE__ */ gt({
		advancedFields: { type: Boolean },
		clearable: { type: Boolean },
		container: { default: "body" },
		palette: { default: () => [] },
		paletteOnly: { type: Boolean }
	}, {
		modelValue: { required: !0 },
		modelModifiers: {},
		open: { type: Boolean },
		openModifiers: {}
	}),
	emits: /* @__PURE__ */ gt(["submit", "closed"], ["update:modelValue", "update:open"]),
	setup(e, { emit: r }) {
		let i = at(e, "modelValue"), a = at(e, "open"), o = e, c = r, l = /^#([a-f0-9]{3}|[a-f0-9]{6})$/i, d = pt(), f = W(!1), p = M(() => {
			let e = o.palette;
			for (let n of e) if (typeof n == "string" && !n.match(l) || typeof n == "object" && !n.color?.match(l)) {
				be.error("[NcColorPicker] Invalid palette passed", { color: n }), e = [];
				break;
			}
			return e.length === 0 && (e = o.clearable ? [
				...bn,
				wn,
				En
			] : [...bn]), e.map((e) => ({
				color: typeof e == "object" ? e.color : e,
				name: typeof e == "object" && e.name ? e.name : j("A color with a HEX value {hex}", { hex: typeof e == "string" ? e : e.color })
			}));
		});
		function m(e) {
			c("submit", i.value), e(), f.value = !1;
		}
		function h(e) {
			e = typeof e == "string" ? e : e.color, o.clearable && i.value === e ? i.value = void 0 : i.value = e;
		}
		function g(e) {
			i.value = e.hex;
		}
		function _(e) {
			return v(e) > .5 ? wn.color : En.color;
		}
		function v(e) {
			let [n, r, i] = y(e);
			return (.2126 * n + .7152 * r + .0722 * i) / 255;
		}
		function y(e) {
			let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
			return n ? [
				parseInt(n[1], 16),
				parseInt(n[2], 16),
				parseInt(n[3], 16)
			] : [
				0,
				0,
				0
			];
		}
		return (r, o) => (J(), L(V(Lt), {
			shown: a.value,
			"onUpdate:shown": o[3] ||= (e) => a.value = e,
			container: e.container,
			popupRole: "dialog",
			onApplyHide: o[4] ||= (e) => c("closed")
		}, {
			trigger: A((e) => [q(r.$slots, "default", nt(lt(e)), void 0, !0)]),
			default: A((r) => [n("div", {
				role: "dialog",
				class: G(["color-picker", {
					"color-picker--advanced-fields": f.value && e.advancedFields,
					"color-picker--clearable": e.clearable
				}]),
				"aria-modal": "true",
				"aria-label": V(j)("Color picker")
			}, [I(s, {
				name: "slide",
				mode: "out-in"
			}, {
				default: A(() => [f.value ? (J(), L(V(HF), {
					key: 1,
					class: "color-picker__advanced",
					disableAlpha: "",
					disableFields: !e.advancedFields,
					modelValue: i.value ?? "#000000",
					"onUpdate:modelValue": g
				}, null, 8, ["disableFields", "modelValue"])) : (J(), H("div", hI, [(J(!0), H(F, null, u(p.value, ({ color: e, name: r }, a) => (J(), H("label", {
					key: a,
					class: G(["color-picker__simple-color-circle", { "color-picker__simple-color-circle--active": e === i.value }]),
					style: Pe({
						backgroundColor: e,
						color: _(e)
					})
				}, [e === i.value ? (J(), L(V(Qe), {
					key: 0,
					path: V(Ot)
				}, null, 8, ["path"])) : K("", !0), n("input", {
					type: "radio",
					class: "hidden-visually",
					"aria-label": r,
					name: `color-picker-${V(d)}`,
					checked: e === i.value,
					onClick: (n) => h(e)
				}, null, 8, gI)], 6))), 128)), e.clearable ? (J(), H("label", {
					key: 0,
					class: "color-picker__clear",
					title: V(j)("No color")
				}, [I(V(Qe), {
					size: i.value ? 28 : 34,
					path: V(jt)
				}, null, 8, ["size", "path"]), n("input", {
					type: "radio",
					class: "hidden-visually",
					"aria-label": V(j)("No color"),
					name: `color-picker-${V(d)}`,
					checked: !i.value,
					onClick: o[0] ||= (e) => i.value = void 0
				}, null, 8, vI)], 8, _I)) : K("", !0)]))]),
				_: 1
			}), e.paletteOnly ? K("", !0) : (J(), H("div", yI, [f.value ? (J(), L(V(Ye), {
				key: 0,
				"aria-label": V(j)("Back"),
				title: V(j)("Back"),
				variant: "tertiary",
				onClick: o[1] ||= (e) => f.value = !1
			}, {
				icon: A(() => [I(V(Qe), {
					directional: "",
					path: V(St)
				}, null, 8, ["path"])]),
				_: 1
			}, 8, ["aria-label", "title"])) : (J(), L(V(Ye), {
				key: 1,
				"aria-label": V(j)("More options"),
				title: V(j)("More options"),
				variant: "tertiary",
				onClick: o[2] ||= (e) => f.value = !0
			}, {
				icon: A(() => [I(V(Qe), { path: V(Pt) }, null, 8, ["path"])]),
				_: 1
			}, 8, ["aria-label", "title"])), I(V(Ye), {
				variant: "primary",
				onClick: (e) => m(r.hide)
			}, {
				default: A(() => [z(U(V(j)("Choose")), 1)]),
				_: 1
			}, 8, ["onClick"])]))], 10, mI)]),
			_: 3
		}, 8, ["shown", "container"]));
	}
}), [["__scopeId", "data-v-fab7cffe"]]), xI = [
	"#b6469d",
	"#bf678b",
	"#c98879",
	"#d3a967",
	"#ddcb55",
	"#a5b872",
	"#6ea68f",
	"#3794ac",
	"#0082c9",
	"#2d73be",
	"#5b64b3",
	"#8855a8"
];
function SI(e) {
	if (typeof e != "string") return null;
	let n = e.trim().replace(/^#/, "");
	if (n.length === 3 && (n = n.split("").map((e) => e + e).join("")), !/^[0-9a-fA-F]{6}$/.test(n)) return null;
	let r = (e) => {
		let n = e / 255;
		return n <= .03928 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4;
	}, i = parseInt(n, 16);
	return .2126 * r(i >> 16 & 255) + .7152 * r(i >> 8 & 255) + .0722 * r(i & 255);
}
function CI(e, n) {
	let [r, i] = e > n ? [e, n] : [n, e];
	return (r + .05) / (i + .05);
}
function wI(e) {
	let n = SI(e);
	return n === null ? "#000000" : CI(n, 1) >= CI(n, 0) ? "#ffffff" : "#000000";
}
function TI(e) {
	let n = new Set((e || []).map((e) => e && typeof e.color == "string" ? e.color.toLowerCase() : null).filter(Boolean));
	return xI.find((e) => !n.has(e.toLowerCase())) || xI[n.size % xI.length];
}
// src/components/ProjectForm.vue
var EI = {
	name: "ProjectForm",
	emits: ["cancel", "saved"],
	components: {
		NcButton: Ye,
		NcCheckboxRadioSwitch: tt,
		NcColorPicker: bI,
		NcSelect: Xt
	},
	props: { project: {
		type: Object,
		default: null
	} },
	data() {
		return { form: {
			name: "",
			code: null,
			description: null,
			customer: null,
			color: null,
			isActive: !0,
			isBillable: !0,
			allEmployees: !0,
			memberIds: []
		} };
	},
	computed: {
		...Tr($o, ["employees"]),
		...Tr(xv, ["projects"]),
		isEdit() {
			return !!this.project;
		},
		colorTriggerStyle() {
			return this.form.color ? {
				background: this.form.color,
				borderColor: this.form.color,
				color: wI(this.form.color)
			} : {};
		},
		isValid() {
			return this.form.name.trim().length > 0;
		},
		employeeOptions() {
			return this.employees.filter((e) => e.isActive || this.form.memberIds.includes(e.id)).map((e) => ({
				id: e.id,
				label: `${e.firstName} ${e.lastName}`.trim() || e.userId
			}));
		},
		selectedMembers: {
			get() {
				return this.employeeOptions.filter((e) => this.form.memberIds.includes(e.id));
			},
			set(e) {
				this.form.memberIds = (e || []).map((e) => e.id);
			}
		},
		bookingMode: {
			get() {
				return this.form.allEmployees ? "all" : "selected";
			},
			set(e) {
				this.form.allEmployees = e === "all";
			}
		}
	},
	watch: { project: {
		immediate: !0,
		handler(e) {
			e ? this.form = {
				name: e.name || "",
				code: e.code || null,
				description: e.description || null,
				customer: e.customer || null,
				color: e.color || null,
				isActive: e.isActive ?? !0,
				isBillable: e.isBillable ?? !0,
				allEmployees: e.allEmployees ?? !0,
				memberIds: Array.isArray(e.memberIds) ? [...e.memberIds] : []
			} : this.resetForm();
		}
	} },
	created() {
		this.employees.length || $o().fetchEmployees();
	},
	methods: {
		...Er(xv, ["createProject", "updateProject"]),
		resetForm() {
			this.form = {
				name: "",
				code: null,
				description: null,
				customer: null,
				color: TI(this.projects),
				isActive: !0,
				isBillable: !0,
				allEmployees: !0,
				memberIds: []
			};
		},
		onColorSubmit(e) {
			this.form.color = e || null;
		},
		cancel() {
			this.$emit("cancel");
		},
		async save() {
			try {
				let e = {
					name: this.form.name.trim(),
					code: this.form.code?.trim() || null,
					description: this.form.description?.trim() || null,
					customer: this.form.customer?.trim() || null,
					color: this.form.color || null,
					isActive: this.form.isActive,
					isBillable: this.form.isBillable,
					allEmployees: this.form.allEmployees,
					memberIds: this.form.allEmployees ? [] : this.form.memberIds
				};
				this.isEdit ? (await this.updateProject({
					id: this.project.id,
					data: e
				}), Vv(this.t("worktime", "Projekt aktualisiert"))) : (await this.createProject(e), Vv(this.t("worktime", "Projekt erstellt"))), this.$emit("saved");
			} catch (e) {
				Hv(e.message || this.t("worktime", "Fehler beim Speichern"));
			}
		}
	}
}, DI = { class: "project-form" }, OI = { class: "project-form-header" }, kI = { id: "wt-project-form-title" }, AI = { class: "header-hint" }, jI = { class: "form-row" }, MI = { class: "form-group" }, NI = { for: "projectName" }, PI = { class: "form-group" }, FI = { for: "projectCode" }, II = ["placeholder"], LI = { class: "form-group" }, RI = { for: "projectCustomer" }, zI = ["placeholder"], BI = { class: "form-group" }, VI = { for: "projectDescription" }, HI = { class: "form-group" }, UI = { class: "form-group-label" }, WI = { class: "color-picker-row" }, GI = { key: 0 }, KI = { key: 1 }, qI = { class: "field-hint" }, JI = { class: "form-group" }, YI = { class: "form-group-label" }, XI = {
	key: 0,
	class: "member-select"
}, ZI = { class: "form-actions" };
function QI(e, r, i, a, o, s) {
	let c = P("NcCheckboxRadioSwitch"), l = P("NcColorPicker"), u = P("NcButton"), d = P("NcSelect");
	return J(), H("div", DI, [
		n("div", OI, [
			n("h3", kI, U(s.isEdit ? e.t("worktime", "Projekt bearbeiten") : e.t("worktime", "Neues Projekt")), 1),
			r[10] ||= z(),
			I(c, {
				modelValue: o.form.isActive,
				"onUpdate:modelValue": r[0] ||= (e) => o.form.isActive = e,
				type: "switch"
			}, {
				default: A(() => [z(U(e.t("worktime", "Aktiv")), 1)]),
				_: 1
			}, 8, ["modelValue"])
		]),
		r[23] ||= z(),
		n("p", AI, U(e.t("worktime", "Inaktive Projekte stehen nicht mehr zur Auswahl.")), 1),
		r[24] ||= z(),
		n("div", jI, [
			n("div", MI, [
				n("label", NI, U(e.t("worktime", "Name")) + " *", 1),
				r[11] ||= z(),
				N(n("input", {
					id: "projectName",
					"onUpdate:modelValue": r[1] ||= (e) => o.form.name = e,
					type: "text",
					class: "input-field",
					required: ""
				}, null, 512), [[y, o.form.name]])
			]),
			r[13] ||= z(),
			n("div", PI, [
				n("label", FI, U(e.t("worktime", "Projektcode")), 1),
				r[12] ||= z(),
				N(n("input", {
					id: "projectCode",
					"onUpdate:modelValue": r[2] ||= (e) => o.form.code = e,
					type: "text",
					class: "input-field",
					placeholder: e.t("worktime", "z.B. PRJ-001")
				}, null, 8, II), [[y, o.form.code]])
			])
		]),
		r[25] ||= z(),
		n("div", LI, [
			n("label", RI, U(e.t("worktime", "Kunde")), 1),
			r[14] ||= z(),
			N(n("input", {
				id: "projectCustomer",
				"onUpdate:modelValue": r[3] ||= (e) => o.form.customer = e,
				type: "text",
				class: "input-field",
				placeholder: e.t("worktime", "Optional, z.B. für die Auswertung")
			}, null, 8, zI), [[y, o.form.customer]])
		]),
		r[26] ||= z(),
		n("div", BI, [
			n("label", VI, U(e.t("worktime", "Beschreibung")), 1),
			r[15] ||= z(),
			N(n("textarea", {
				id: "projectDescription",
				"onUpdate:modelValue": r[4] ||= (e) => o.form.description = e,
				class: "input-field textarea-field",
				rows: "3"
			}, null, 512), [[y, o.form.description]])
		]),
		r[27] ||= z(),
		n("div", HI, [
			n("label", UI, U(e.t("worktime", "Farbe")), 1),
			r[17] ||= z(),
			n("div", WI, [
				I(l, {
					modelValue: o.form.color,
					"onUpdate:modelValue": r[5] ||= (e) => o.form.color = e,
					clearable: "",
					"advanced-fields": "",
					onSubmit: s.onColorSubmit
				}, {
					default: A(() => [n("button", {
						type: "button",
						class: "color-trigger",
						style: Pe(s.colorTriggerStyle)
					}, [o.form.color ? (J(), H("span", GI, U(o.form.color.toUpperCase()), 1)) : (J(), H("span", KI, U(e.t("worktime", "Farbe wählen")), 1))], 4)]),
					_: 1
				}, 8, ["modelValue", "onSubmit"]),
				r[16] ||= z(),
				o.form.color ? (J(), L(u, {
					key: 0,
					variant: "tertiary",
					onClick: r[6] ||= (e) => o.form.color = null
				}, {
					default: A(() => [z(U(e.t("worktime", "Zurücksetzen")), 1)]),
					_: 1
				})) : K("", !0)
			]),
			r[18] ||= z(),
			n("p", qI, U(e.t("worktime", "Kennzeichnet das Projekt in Listen und in der Auswertung. Neben der Palette sind auch eigene Farben möglich.")), 1)
		]),
		r[28] ||= z(),
		n("div", JI, [
			n("label", YI, U(e.t("worktime", "Buchungsberechtigung")), 1),
			r[19] ||= z(),
			I(c, {
				modelValue: s.bookingMode,
				"onUpdate:modelValue": r[7] ||= (e) => s.bookingMode = e,
				value: "all",
				name: "project-booking",
				type: "radio"
			}, {
				default: A(() => [z(U(e.t("worktime", "Alle Mitarbeitenden")), 1)]),
				_: 1
			}, 8, ["modelValue"]),
			r[20] ||= z(),
			I(c, {
				modelValue: s.bookingMode,
				"onUpdate:modelValue": r[8] ||= (e) => s.bookingMode = e,
				value: "selected",
				name: "project-booking",
				type: "radio"
			}, {
				default: A(() => [z(U(e.t("worktime", "Nur ausgewählte Mitarbeitende")), 1)]),
				_: 1
			}, 8, ["modelValue"]),
			r[21] ||= z(),
			s.bookingMode === "selected" ? (J(), H("div", XI, [I(d, {
				"label-outside": "",
				"aria-label-combobox": e.t("worktime", "Mitarbeitende auswählen"),
				id: "projectMembers",
				modelValue: s.selectedMembers,
				"onUpdate:modelValue": r[9] ||= (e) => s.selectedMembers = e,
				options: s.employeeOptions,
				multiple: !0,
				"keep-open": "",
				placeholder: e.t("worktime", "Mitarbeitende auswählen")
			}, null, 8, [
				"aria-label-combobox",
				"modelValue",
				"options",
				"placeholder"
			])])) : K("", !0)
		]),
		r[29] ||= z(),
		n("div", ZI, [
			I(u, {
				variant: "tertiary",
				onClick: s.cancel
			}, {
				default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
				_: 1
			}, 8, ["onClick"]),
			r[22] ||= z(),
			I(u, {
				variant: "primary",
				disabled: !s.isValid,
				onClick: s.save
			}, {
				default: A(() => [z(U(e.t("worktime", "Speichern")), 1)]),
				_: 1
			}, 8, ["disabled", "onClick"])
		])
	]);
}
var $I = /*#__PURE__*/ Y(EI, [["render", QI], ["__scopeId", "data-v-75844925"]]), eL = {
	name: "FolderOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, tL = ["aria-hidden", "aria-label"], nL = [
	"fill",
	"width",
	"height"
], rL = { key: 0 };
function iL(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon folder-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", rL, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" }, null, -1)
	], 8, nL))], 16, tL);
}
var aL = /*#__PURE__*/ Y(eL, [["render", iL]]), oL = {
	name: "ProjectList",
	emits: ["delete", "edit"],
	components: {
		NcButton: Ye,
		NcEmptyContent: Gt,
		NcDialog: Qt,
		Pencil: Zx,
		Close: Yw,
		FolderOutline: aL
	},
	props: { projects: {
		type: Array,
		required: !0
	} },
	data() {
		return {
			showDeleteDialog: !1,
			projectToDelete: null
		};
	},
	methods: {
		confirmDelete(e) {
			this.projectToDelete = e, this.showDeleteDialog = !0;
		},
		deleteConfirmed() {
			this.$emit("delete", this.projectToDelete), this.showDeleteDialog = !1, this.projectToDelete = null;
		}
	}
}, sL = { class: "project-list" }, cL = {
	key: 0,
	class: "projects-table"
}, lL = { class: "actions-col" }, uL = { class: "color-col" }, dL = {
	key: 0,
	class: "project-description"
}, fL = { class: "actions-col" }, pL = { class: "delete-warning" };
function mL(e, r, i, a, o, s) {
	let c = P("Pencil"), l = P("NcButton"), d = P("Close"), f = P("FolderOutline"), p = P("NcEmptyContent"), m = P("NcDialog");
	return J(), H("div", sL, [
		i.projects.length > 0 ? (J(), H("table", cL, [
			n("thead", null, [n("tr", null, [
				r[2] ||= n("th", { class: "color-col" }, null, -1),
				r[3] ||= z(),
				n("th", null, U(e.t("worktime", "Name")), 1),
				r[4] ||= z(),
				n("th", null, U(e.t("worktime", "Projektcode")), 1),
				r[5] ||= z(),
				n("th", null, U(e.t("worktime", "Status")), 1),
				r[6] ||= z(),
				n("th", lL, U(e.t("worktime", "Aktionen")), 1)
			])]),
			r[13] ||= z(),
			n("tbody", null, [(J(!0), H(F, null, u(i.projects, (i) => (J(), H("tr", { key: i.id }, [
				n("td", uL, [i.color ? (J(), H("span", {
					key: 0,
					class: "color-dot",
					style: Pe({ backgroundColor: i.color })
				}, null, 4)) : K("", !0)]),
				r[9] ||= z(),
				n("td", null, [
					n("strong", null, U(i.name), 1),
					r[7] ||= z(),
					i.description ? (J(), H("div", dL, U(i.description), 1)) : K("", !0)
				]),
				r[10] ||= z(),
				n("td", null, U(i.code || "-"), 1),
				r[11] ||= z(),
				n("td", null, [n("span", { class: G(["status-badge", i.isActive ? "active" : "inactive"]) }, U(i.isActive ? e.t("worktime", "Aktiv") : e.t("worktime", "Inaktiv")), 3)]),
				r[12] ||= z(),
				n("td", fL, [
					I(l, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Bearbeiten"),
						onClick: (n) => e.$emit("edit", i)
					}, {
						icon: A(() => [I(c, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					r[8] ||= z(),
					I(l, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Löschen"),
						onClick: (e) => s.confirmDelete(i)
					}, {
						icon: A(() => [I(d, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])
			]))), 128))])
		])) : (J(), L(p, {
			key: 1,
			name: e.t("worktime", "Keine Projekte"),
			description: e.t("worktime", "Lege Projekte an, um projektbezogene Zeiterfassung zu nutzen.")
		}, {
			icon: A(() => [I(f, { size: 64 })]),
			_: 1
		}, 8, ["name", "description"])),
		r[17] ||= z(),
		o.showDeleteDialog ? (J(), L(m, {
			key: 2,
			name: e.t("worktime", "Projekt löschen?"),
			"onUpdate:open": r[1] ||= (e) => o.showDeleteDialog = !1
		}, {
			actions: A(() => [
				I(l, {
					variant: "tertiary",
					onClick: r[0] ||= (e) => o.showDeleteDialog = !1
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}),
				r[14] ||= z(),
				I(l, {
					variant: "error",
					onClick: s.deleteConfirmed
				}, {
					default: A(() => [z(U(e.t("worktime", "Löschen")), 1)]),
					_: 1
				}, 8, ["onClick"])
			]),
			default: A(() => [
				n("p", null, U(e.t("worktime", "Möchtest du das Projekt \"{name}\" wirklich löschen?", { name: o.projectToDelete?.name })), 1),
				r[15] ||= z(),
				n("p", pL, U(e.t("worktime", "Diese Aktion kann nicht rückgängig gemacht werden.")), 1),
				r[16] ||= z()
			]),
			_: 1
		}, 8, ["name"])) : K("", !0)
	]);
}
var hL = /*#__PURE__*/ Y(oL, [["render", mL], ["__scopeId", "data-v-35266362"]]), gL = {
	name: "DepartmentForm",
	emits: ["cancel", "saved"],
	components: {
		NcButton: Ye,
		NcCheckboxRadioSwitch: tt
	},
	props: { department: {
		type: Object,
		default: null
	} },
	data() {
		return { form: {
			name: "",
			isActive: !0
		} };
	},
	computed: {
		isEdit() {
			return !!this.department;
		},
		isValid() {
			return this.form.name.trim().length > 0;
		}
	},
	watch: { department: {
		immediate: !0,
		handler(e) {
			this.form = e ? {
				name: e.name || "",
				isActive: e.isActive ?? !0
			} : {
				name: "",
				isActive: !0
			};
		}
	} },
	methods: {
		...Er(qD, ["createDepartment", "updateDepartment"]),
		cancel() {
			this.$emit("cancel");
		},
		async save() {
			try {
				let e = {
					name: this.form.name.trim(),
					isActive: this.form.isActive
				};
				this.isEdit ? (await this.updateDepartment({
					id: this.department.id,
					data: e
				}), Vv(this.t("worktime", "Abteilung aktualisiert"))) : (await this.createDepartment(e), Vv(this.t("worktime", "Abteilung erstellt"))), this.$emit("saved");
			} catch (e) {
				Hv(e.message || this.t("worktime", "Fehler beim Speichern"));
			}
		}
	}
}, _L = { class: "department-form" }, vL = { class: "department-form-header" }, yL = { id: "wt-department-form-title" }, bL = { class: "header-hint" }, xL = { class: "form-group" }, SL = { for: "departmentName" }, CL = { class: "form-actions" };
function wL(e, r, i, a, o, s) {
	let c = P("NcCheckboxRadioSwitch"), l = P("NcButton");
	return J(), H("div", _L, [
		n("div", vL, [
			n("h3", yL, U(s.isEdit ? e.t("worktime", "Abteilung bearbeiten") : e.t("worktime", "Neue Abteilung")), 1),
			r[3] ||= z(),
			I(c, {
				modelValue: o.form.isActive,
				"onUpdate:modelValue": r[0] ||= (e) => o.form.isActive = e,
				type: "switch"
			}, {
				default: A(() => [z(U(e.t("worktime", "Aktiv")), 1)]),
				_: 1
			}, 8, ["modelValue"])
		]),
		r[6] ||= z(),
		n("p", bL, U(e.t("worktime", "Inaktive Abteilungen stehen nicht mehr zur Auswahl.")), 1),
		r[7] ||= z(),
		n("div", xL, [
			n("label", SL, U(e.t("worktime", "Name")) + " *", 1),
			r[4] ||= z(),
			N(n("input", {
				id: "departmentName",
				"onUpdate:modelValue": r[1] ||= (e) => o.form.name = e,
				type: "text",
				class: "input-field",
				required: "",
				onKeyup: r[2] ||= vt((e) => s.isValid && s.save(), ["enter"])
			}, null, 544), [[y, o.form.name]])
		]),
		r[8] ||= z(),
		n("div", CL, [
			I(l, {
				variant: "tertiary",
				onClick: s.cancel
			}, {
				default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
				_: 1
			}, 8, ["onClick"]),
			r[5] ||= z(),
			I(l, {
				variant: "primary",
				disabled: !s.isValid,
				onClick: s.save
			}, {
				default: A(() => [z(U(e.t("worktime", "Speichern")), 1)]),
				_: 1
			}, 8, ["disabled", "onClick"])
		])
	]);
}
var TL = /*#__PURE__*/ Y(gL, [["render", wL], ["__scopeId", "data-v-0cd8c019"]]), EL = {
	name: "DepartmentList",
	emits: ["delete", "edit"],
	components: {
		NcButton: Ye,
		NcEmptyContent: Gt,
		NcDialog: Qt,
		Pencil: Zx,
		Close: Yw,
		OfficeBuilding: ZA
	},
	props: { departments: {
		type: Array,
		required: !0
	} },
	data() {
		return {
			showDeleteDialog: !1,
			departmentToDelete: null,
			memberCount: 0
		};
	},
	methods: {
		async confirmDelete(e) {
			this.departmentToDelete = e, this.memberCount = 0, this.showDeleteDialog = !0;
			try {
				let n = await KD.deletionImpact(e.id);
				this.memberCount = n?.memberCount ?? 0;
			} catch {
				this.memberCount = 0;
			}
		},
		deleteConfirmed() {
			this.$emit("delete", this.departmentToDelete), this.showDeleteDialog = !1, this.departmentToDelete = null, this.memberCount = 0;
		}
	}
}, DL = { class: "department-list" }, OL = {
	key: 0,
	class: "departments-table"
}, kL = { class: "actions-col" }, AL = { class: "actions-col" }, jL = {
	key: 0,
	class: "delete-warning"
}, ML = { class: "delete-warning" };
function NL(e, r, i, a, o, s) {
	let c = P("Pencil"), l = P("NcButton"), d = P("Close"), f = P("OfficeBuilding"), p = P("NcEmptyContent"), m = P("NcDialog");
	return J(), H("div", DL, [
		i.departments.length > 0 ? (J(), H("table", OL, [
			n("thead", null, [n("tr", null, [
				n("th", null, U(e.t("worktime", "Name")), 1),
				r[2] ||= z(),
				n("th", null, U(e.t("worktime", "Status")), 1),
				r[3] ||= z(),
				n("th", kL, U(e.t("worktime", "Aktionen")), 1)
			])]),
			r[7] ||= z(),
			n("tbody", null, [(J(!0), H(F, null, u(i.departments, (i) => (J(), H("tr", { key: i.id }, [
				n("td", null, [n("strong", null, U(i.name), 1)]),
				r[5] ||= z(),
				n("td", null, [n("span", { class: G(["status-badge", i.isActive ? "active" : "inactive"]) }, U(i.isActive ? e.t("worktime", "Aktiv") : e.t("worktime", "Inaktiv")), 3)]),
				r[6] ||= z(),
				n("td", AL, [
					I(l, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Bearbeiten"),
						onClick: (n) => e.$emit("edit", i)
					}, {
						icon: A(() => [I(c, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					r[4] ||= z(),
					I(l, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Löschen"),
						onClick: (e) => s.confirmDelete(i)
					}, {
						icon: A(() => [I(d, { size: 20 })]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])
			]))), 128))])
		])) : (J(), L(p, {
			key: 1,
			name: e.t("worktime", "Keine Abteilungen"),
			description: e.t("worktime", "Lege Abteilungen an, um Mitarbeitende Organisationseinheiten zuzuordnen.")
		}, {
			icon: A(() => [I(f, { size: 64 })]),
			_: 1
		}, 8, ["name", "description"])),
		r[12] ||= z(),
		o.showDeleteDialog ? (J(), L(m, {
			key: 2,
			name: e.t("worktime", "Abteilung löschen?"),
			"onUpdate:open": r[1] ||= (e) => o.showDeleteDialog = !1
		}, {
			actions: A(() => [
				I(l, {
					variant: "tertiary",
					onClick: r[0] ||= (e) => o.showDeleteDialog = !1
				}, {
					default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
					_: 1
				}),
				r[8] ||= z(),
				I(l, {
					variant: "error",
					onClick: s.deleteConfirmed
				}, {
					default: A(() => [z(U(e.t("worktime", "Löschen")), 1)]),
					_: 1
				}, 8, ["onClick"])
			]),
			default: A(() => [
				n("p", null, U(e.t("worktime", "Möchtest du die Abteilung \"{name}\" wirklich löschen?", { name: o.departmentToDelete?.name })), 1),
				r[9] ||= z(),
				o.memberCount > 0 ? (J(), H("p", jL, U(e.n("worktime", "%n Mitarbeitende/r wird dieser Abteilung entzogen. Die Zeiterfassung bleibt unberührt.", "%n Mitarbeitende werden dieser Abteilung entzogen. Die Zeiterfassung bleibt unberührt.", o.memberCount)), 1)) : K("", !0),
				r[10] ||= z(),
				n("p", ML, U(e.t("worktime", "Diese Aktion kann nicht rückgängig gemacht werden.")), 1),
				r[11] ||= z()
			]),
			_: 1
		}, 8, ["name"])) : K("", !0)
	]);
}
var PL = /*#__PURE__*/ Y(EL, [["render", NL], ["__scopeId", "data-v-d802ee34"]]);
// src/services/LicenseService.js
async function FL(e) {
	try {
		return (await e()).data;
	} catch (e) {
		Z(e);
	}
}
var IL = {
	get: () => FL(() => X.get("/license")),
	activate: (e) => FL(() => X.put("/license", { key: e })),
	startTrial: () => FL(() => X.post("/license/trial", {})),
	refresh: () => FL(() => X.post("/license/refresh", {})),
	remove: () => FL(() => X.delete("/license"))
}, LL = ["TRIAL_ALREADY_USED"], RL = {
	name: "WerkPlusSettings",
	components: {
		NcButton: Ye,
		NcNoteCard: Ov
	},
	data() {
		return {
			status: null,
			keyInput: "",
			busy: !1,
			loadError: "",
			actionError: "",
			actionInfo: "",
			trialKey: ""
		};
	},
	computed: {
		canEdit() {
			return this.status?.canManage === !0 && !this.status.storeTooNew;
		},
		licenseActive() {
			return ["valid", "grace"].includes(this.status?.state);
		},
		tierLabel() {
			return this.status?.tier === "werkplus" ? "WerkPlus" : R("worktime", "Frei");
		},
		stateNote() {
			let e = this.status;
			switch (e?.state) {
				case "valid": return {
					type: "success",
					text: R("worktime", "WerkPlus ist aktiv.")
				};
				case "grace": return {
					type: "warning",
					text: R("worktime", "Die Lizenz ist abgelaufen und konnte noch nicht erneuert werden. Die Funktionen bleiben bis {date} erhalten.", { date: e.graceUntil ? this.formatDate(e.graceUntil) : "" })
				};
				case "expired": return {
					type: "error",
					text: R("worktime", "Die Lizenz ist abgelaufen. WorkTime arbeitet im freien Umfang weiter.")
				};
				case "invalid": return {
					type: "error",
					text: R("worktime", "Der gespeicherte Lizenznachweis ist ungültig. Bitte prüfe die Lizenz erneut.")
				};
				default: return null;
			}
		}
	},
	mounted() {
		this.load();
	},
	methods: {
		formatDate(e) {
			return new Date(e).toLocaleDateString(Wv());
		},
		formatDateTime(e) {
			return new Date(e).toLocaleString(Wv());
		},
		async load() {
			try {
				this.status = await IL.get(), this.loadError = "";
			} catch (e) {
				this.loadError = e.message || R("worktime", "Lizenzstatus konnte nicht geladen werden.");
			}
		},
		async run(e) {
			this.busy = !0, this.actionError = "", this.actionInfo = "";
			try {
				this.status = await e(), this.keyInput = "", qo().fetchPermissions();
			} catch (e) {
				let n = e.message || R("worktime", "WerkPlus hat einen Fehler gemeldet. Bitte versuche es später erneut.");
				e.code && LL.includes(e.code) ? this.actionInfo = n : this.actionError = n, await this.load();
			} finally {
				this.busy = !1;
			}
		},
		onActivate() {
			return this.trialKey = "", this.run(() => IL.activate(this.keyInput.trim()));
		},
		async onTrial() {
			if (await Uv(R("worktime", "Der Testzeitraum läuft 30 Tage, braucht keine Zahlungsdaten, gilt für alle Werk-Apps dieser Nextcloud und ist je Nextcloud nur einmal möglich. Jetzt starten?"), R("worktime", "WerkPlus 30 Tage testen"), R("worktime", "Testzeitraum starten"))) return this.trialKey = "", this.run(async () => {
				let e = await IL.startTrial();
				return this.trialKey = e.key, e.status;
			});
		},
		onRefresh() {
			return this.run(IL.refresh);
		},
		async onRemove() {
			if (await Uv(R("worktime", "Der Schlüssel wird für alle Werk-Apps dieser Nextcloud entfernt, sie arbeiten danach im freien Umfang. Den Schlüssel kannst du jederzeit wieder eintragen. Fortfahren?"), R("worktime", "WerkPlus-Schlüssel entfernen"), R("worktime", "Entfernen"), !0)) return this.trialKey = "", this.run(IL.remove);
		}
	}
}, zL = { class: "wt-werkplus" }, BL = { class: "wt-werkplus__hint" }, VL = { key: 0 }, HL = { key: 1 }, UL = {
	key: 6,
	class: "wt-werkplus__facts"
}, WL = {
	key: 7,
	class: "wt-werkplus__hint"
}, GL = {
	key: 8,
	class: "wt-werkplus__field"
}, KL = { for: "wt-werkplus-key" }, qL = ["placeholder"], JL = {
	key: 9,
	class: "wt-werkplus__actions"
}, YL = { class: "wt-werkplus__privacy" }, XL = { class: "wt-werkplus__label" }, ZL = { class: "wt-werkplus__hint" }, QL = { class: "wt-werkplus__hint" }, $L = { class: "wt-werkplus__hint" };
function eR(e, r, i, a, o, s) {
	let c = P("NcNoteCard"), l = P("NcButton");
	return J(), H("div", zL, [
		n("p", BL, U(e.t("worktime", "Ohne Schlüssel ist WorkTime vollständig nutzbar. Mit WerkPlus lässt sich die Zeiterfassung auf die Stempeluhr beschränken.")) + " " + U(e.t("worktime", "Der Schlüssel gilt für alle Werk-Apps dieser Nextcloud und muss nur in einer davon eingetragen werden.")), 1),
		r[28] ||= z(),
		o.loadError ? (J(), L(c, {
			key: 0,
			type: "error"
		}, {
			default: A(() => [z(U(o.loadError), 1)]),
			_: 1
		})) : K("", !0),
		r[29] ||= z(),
		o.status ? (J(), H(F, { key: 1 }, [
			o.status.storeTooNew ? (J(), L(c, {
				key: 0,
				type: "warning"
			}, {
				default: A(() => [z(U(e.t("worktime", "Eine andere Werk-App hat die Lizenz in einem neueren Format gespeichert. Bitte aktualisiere WorkTime.")), 1)]),
				_: 1
			})) : K("", !0),
			r[19] ||= z(),
			s.stateNote ? (J(), L(c, {
				key: 1,
				type: s.stateNote.type
			}, {
				default: A(() => [z(U(s.stateNote.text), 1)]),
				_: 1
			}, 8, ["type"])) : K("", !0),
			r[20] ||= z(),
			o.trialKey ? (J(), L(c, {
				key: 2,
				type: "success",
				class: "wt-werkplus__trial-key"
			}, {
				default: A(() => [
					s.licenseActive ? (J(), H("p", VL, U(e.t("worktime", "Der Testzeitraum läuft. Das ist dein WerkPlus-Schlüssel:")), 1)) : (J(), H("p", HL, U(e.t("worktime", "Der Testzeitraum ist gestartet, die Lizenz konnte aber noch nicht geprüft werden. Mit „Jetzt prüfen“ versuchst du es erneut. Das ist dein WerkPlus-Schlüssel:")), 1)),
					r[1] ||= z(),
					n("p", null, [n("code", null, U(o.trialKey), 1)]),
					r[2] ||= z(),
					n("p", null, U(e.t("worktime", "Bitte bewahre ihn sicher auf. Er ist hinterlegt, wird aber nur jetzt vollständig angezeigt.")), 1)
				]),
				_: 1
			})) : K("", !0),
			r[21] ||= z(),
			o.actionInfo ? (J(), L(c, {
				key: 3,
				type: "info"
			}, {
				default: A(() => [z(U(o.actionInfo), 1)]),
				_: 1
			})) : K("", !0),
			r[22] ||= z(),
			o.actionError ? (J(), L(c, {
				key: 4,
				type: "error"
			}, {
				default: A(() => [z(U(o.actionError), 1)]),
				_: 1
			})) : o.status.lastError ? (J(), L(c, {
				key: 5,
				type: "warning"
			}, {
				default: A(() => [z(U(o.status.lastError.message), 1)]),
				_: 1
			})) : K("", !0),
			r[23] ||= z(),
			o.status.keySet ? (J(), H("dl", UL, [
				n("dt", null, U(e.t("worktime", "Tarif")), 1),
				r[5] ||= z(),
				n("dd", null, U(s.tierLabel), 1),
				r[6] ||= z(),
				o.status.licensedEmployees ? (J(), H(F, { key: 0 }, [
					n("dt", null, U(e.t("worktime", "Lizenzierte Mitarbeitende")), 1),
					r[3] ||= z(),
					n("dd", null, U(o.status.licensedEmployees), 1)
				], 64)) : K("", !0),
				r[7] ||= z(),
				o.status.expiresAt ? (J(), H(F, { key: 1 }, [
					n("dt", null, U(e.t("worktime", "Gültig bis")), 1),
					r[4] ||= z(),
					n("dd", null, U(s.formatDate(o.status.expiresAt)), 1)
				], 64)) : K("", !0),
				r[8] ||= z(),
				n("dt", null, U(e.t("worktime", "Letzte erfolgreiche Prüfung")), 1),
				r[9] ||= z(),
				n("dd", null, U(o.status.lastCheckAt ? s.formatDateTime(o.status.lastCheckAt) : e.t("worktime", "noch keine")), 1),
				r[10] ||= z(),
				n("dt", null, U(e.t("worktime", "Schlüssel")), 1),
				r[11] ||= z(),
				n("dd", null, U(o.status.keyHint), 1)
			])) : K("", !0),
			r[24] ||= z(),
			!o.status.canManage && !o.status.storeTooNew ? (J(), H("p", WL, U(e.t("worktime", "Den Schlüssel können nur Nextcloud-Admins eintragen oder entfernen, weil er für alle Werk-Apps dieser Nextcloud gilt.")), 1)) : K("", !0),
			r[25] ||= z(),
			s.canEdit ? (J(), H("div", GL, [
				n("label", KL, U(e.t("worktime", "WerkPlus-Schlüssel")), 1),
				r[12] ||= z(),
				N(n("input", {
					id: "wt-werkplus-key",
					"onUpdate:modelValue": r[0] ||= (e) => o.keyInput = e,
					type: "text",
					autocomplete: "off",
					spellcheck: "false",
					placeholder: o.status.keySet ? e.t("worktime", "gespeichert, leer lassen") : "wp_…"
				}, null, 8, qL), [[y, o.keyInput]])
			])) : K("", !0),
			r[26] ||= z(),
			s.canEdit ? (J(), H("div", JL, [
				I(l, {
					variant: "primary",
					disabled: o.busy || !o.keyInput.trim() && !o.status.keySet,
					onClick: s.onActivate
				}, {
					default: A(() => [z(U(o.status.keySet ? e.t("worktime", "Speichern und prüfen") : e.t("worktime", "Schlüssel prüfen und speichern")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"]),
				r[13] ||= z(),
				o.status.keySet ? K("", !0) : (J(), L(l, {
					key: 0,
					disabled: o.busy,
					onClick: s.onTrial
				}, {
					default: A(() => [z(U(e.t("worktime", "30 Tage testen")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])),
				r[14] ||= z(),
				o.status.keySet ? (J(), L(l, {
					key: 1,
					disabled: o.busy,
					onClick: s.onRefresh
				}, {
					default: A(() => [z(U(e.t("worktime", "Jetzt prüfen")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])) : K("", !0),
				r[15] ||= z(),
				o.status.keySet ? (J(), L(l, {
					key: 2,
					variant: "tertiary",
					disabled: o.busy,
					onClick: s.onRemove
				}, {
					default: A(() => [z(U(e.t("worktime", "Schlüssel entfernen")), 1)]),
					_: 1
				}, 8, ["disabled", "onClick"])) : K("", !0)
			])) : K("", !0),
			r[27] ||= z(),
			n("div", YL, [
				n("p", XL, U(e.t("worktime", "Was an WerkPlus übertragen wird")), 1),
				r[16] ||= z(),
				n("p", ZL, U(e.t("worktime", "Eine aus dieser Nextcloud abgeleitete Kennung, die Versionen der aktivierten Werk-Apps und, sobald vorhanden, der Schlüssel. Nicht übertragen werden Arbeitszeiten, Abwesenheiten oder andere Personendaten, Nextcloud-Benutzer- oder Datei-IDs.")), 1),
				r[17] ||= z(),
				n("p", QL, U(e.t("worktime", "Die Lizenz wird auf diesem Server geprüft. Ist WerkPlus nicht erreichbar, arbeitet WorkTime normal weiter.")), 1),
				r[18] ||= z(),
				n("p", $L, [z(U(e.t("worktime", "Kennung dieser Nextcloud:")) + " ", 1), n("code", null, U(o.status.instanceUuid), 1)])
			])
		], 64)) : K("", !0)
	]);
}
var tR = /*#__PURE__*/ Y(RL, [["render", eR], ["__scopeId", "data-v-5ec04076"]]), nR = {
	async getByYear(e) {
		try {
			return (await X.get(`/carryover/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async getByEmployeeAndYear(e, n) {
		try {
			return (await X.get(`/carryover/${n}/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async upsert(e, n, r, i, a) {
		try {
			return (await X.put("/carryover", {
				employeeId: e,
				year: n,
				overtimeMinutes: r,
				vacationDays: i,
				note: a
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async lock(e) {
		try {
			return (await X.post(`/carryover/${e}/lock`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async cancel(e, n, r, i) {
		try {
			return (await X.post(`/carryover/${e}/cancel`, {
				overtimeMinutes: n,
				vacationDays: r,
				reason: i
			})).data;
		} catch (e) {
			Z(e);
		}
	}
}, rR = {
	async getByYear(e) {
		try {
			return (await X.get(`/overtime-payouts/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	},
	async create(e, n, r, i) {
		try {
			return (await X.post("/overtime-payouts", {
				employeeId: e,
				payoutDate: n,
				minutes: r,
				note: i
			})).data;
		} catch (e) {
			Z(e);
		}
	},
	async delete(e) {
		try {
			return (await X.delete(`/overtime-payouts/${e}`)).data;
		} catch (e) {
			Z(e);
		}
	}
};
// src/views/SettingsView.vue
function iR(e) {
	return Math.round(e * 100) / 100;
}
var aR = {
	name: "SettingsView",
	components: {
		InfoIcon: sv,
		NcLoadingIcon: g,
		NcButton: Ye,
		NcSelect: Xt,
		NcCheckboxRadioSwitch: tt,
		NcModal: Kt,
		SettingsCard: Dk,
		SettingsNav: Nk,
		NcDateTimePicker: z_,
		NcEmptyContent: Gt,
		Plus: Gx,
		Account: DA,
		AccountGroup: Ba,
		Folder: Ds,
		Pencil: Zx,
		Close: Yw,
		CalendarBlank: NA,
		ChevronRight: Iy,
		ChevronDown: Qy,
		WerkPlusSettings: tR,
		CashMultiple: Dj,
		EmployeeForm: DN,
		EmployeeList: lP,
		BetriebsferienSettings: IP,
		ProjectForm: $I,
		ProjectList: hL,
		DepartmentForm: TL,
		DepartmentList: PL
	},
	data() {
		return {
			loading: !1,
			settings: {},
			activeSection: null,
			holidayYear: Zv(),
			showEmployeeForm: !1,
			editingEmployee: null,
			showProjectForm: !1,
			editingProject: null,
			showDepartmentForm: !1,
			editingDepartment: null,
			availablePrincipals: [],
			hrManagers: [],
			previousHrManagers: [],
			archiveStatus: {
				configured: !1,
				pending: 0,
				failed: 0,
				jobs: []
			},
			archiveLoading: !1,
			archiveRetryingId: null,
			holidays: [],
			loadingHolidays: !1,
			selectedHolidayStateFilter: null,
			showHolidayForm: !1,
			editingHoliday: null,
			holidayFormData: {
				date: null,
				name: "",
				federalStates: [],
				scope: 1
			},
			scopeOptions: [{
				id: 1,
				label: this.t("worktime", "Ganzer Tag")
			}, {
				id: .5,
				label: this.t("worktime", "Halber Tag")
			}],
			expandedGroups: [],
			carryoverYear: Zv(),
			carryoverEmployees: [],
			carryoverSourceYearStatus: null,
			showCancelModal: !1,
			cancellingEmployee: null,
			cancelForm: {
				overtimeHours: 0,
				vacationDays: 0,
				reason: ""
			},
			payoutYear: Zv(),
			payoutEmployees: [],
			payoutHistory: [],
			showPayoutModal: !1,
			payoutTarget: null,
			payoutForm: {
				hours: "",
				date: qv(/* @__PURE__ */ new Date()),
				note: ""
			},
			payoutError: ""
		};
	},
	computed: {
		...Tr(qo, [
			"canManageSettings",
			"canManageHolidays",
			"canManageEmployees",
			"canManageProjects",
			"punchOnlyLicensed"
		]),
		archiveFailedJobs() {
			return (this.archiveStatus.jobs || []).filter((e) => e.status === "failed");
		},
		archiveDoneJobs() {
			return (this.archiveStatus.jobs || []).filter((e) => e.status === "completed").slice(0, 5);
		},
		...Tr(Pj, ["federalStates"]),
		...Tr($o, { employees: "employees" }),
		...Tr(xv, { allProjects: "projects" }),
		...Tr(qD, { allDepartments: "departments" }),
		carryoverYearOptions() {
			let e = Zv(), n = [];
			for (let r = e - 3; r <= e + 1; r++) n.push(r);
			return n;
		},
		federalStateOptions() {
			return Object.entries(this.federalStates).map(([e, n]) => ({
				id: e,
				label: n
			}));
		},
		timezoneOptions() {
			let e;
			try {
				e = Intl.supportedValuesOf("timeZone");
			} catch {
				e = [
					"Europe/Berlin",
					"Europe/Vienna",
					"Europe/Zurich"
				];
			}
			return e.includes("UTC") || (e = [...e, "UTC"]), [{
				id: "",
				label: this.t("worktime", "Automatisch (Server-Standard, sonst Europe/Berlin)")
			}, ...e.map((e) => ({
				id: e,
				label: e
			}))];
		},
		selectedTimezone: {
			get() {
				let e = this.settings.timezone || "";
				return this.timezoneOptions.find((n) => n.id === e) || {
					id: e,
					label: e
				};
			},
			set(e) {
				this.settings.timezone = e?.id || "";
			}
		},
		selectedFederalState: {
			get() {
				return this.federalStateOptions.find((e) => e.id === this.settings.default_federal_state) || null;
			},
			set(e) {
				this.settings.default_federal_state = e?.id || "BY";
			}
		},
		principalOptions() {
			return this.availablePrincipals.map((e) => ({
				id: e.id,
				label: e.label,
				sublabel: e.sublabel,
				type: e.type
			}));
		},
		selectedHrManagers: {
			get() {
				return this.hrManagers.map((e) => this.principalOptions.find((n) => n.id === e)).filter((e) => e !== void 0);
			},
			set(e) {
				this.hrManagers = e.map((e) => e.id);
			}
		},
		holidayStateFilterOptions() {
			return [{
				id: null,
				label: this.t("worktime", "Alle Bundesländer")
			}, ...this.federalStateOptions];
		},
		filteredHolidays() {
			return !this.selectedHolidayStateFilter || !this.selectedHolidayStateFilter.id ? this.holidays : this.holidays.filter((e) => e.federalState === this.selectedHolidayStateFilter.id);
		},
		isHolidayFormValid() {
			return !(!this.holidayFormData.date || !this.holidayFormData.name.trim() || !this.editingHoliday && this.holidayFormData.federalStates.length === 0);
		},
		selectedHolidayScope: {
			get() {
				return this.scopeOptions.find((e) => e.id === this.holidayFormData.scope) || this.scopeOptions[0];
			},
			set(e) {
				this.holidayFormData.scope = e?.id ?? 1;
			}
		},
		groupedHolidays() {
			let e = {};
			for (let n of this.filteredHolidays) {
				let r = `${n.date}_${n.name}`;
				e[r] || (e[r] = {
					key: r,
					date: n.date,
					name: n.name,
					scope: n.scope ?? 1,
					isManual: n.isManual,
					states: [],
					holidays: []
				}), e[r].states.push(n.federalState), e[r].holidays.push(n), n.isManual && (e[r].isManual = !0);
			}
			return Object.values(e).sort((e, n) => e.date.localeCompare(n.date));
		},
		navGroups() {
			let e = (e, n) => ({
				label: e,
				items: n.filter((e) => e.visible)
			});
			return [
				e(this.t("worktime", "Team"), [
					{
						id: "sec-mitarbeiter",
						label: this.t("worktime", "Mitarbeiter"),
						icon: Ba,
						visible: this.canManageEmployees
					},
					{
						id: "sec-abteilungen",
						label: this.t("worktime", "Abteilungen"),
						icon: ZA,
						visible: this.canManageEmployees
					},
					{
						id: "sec-projekte",
						label: this.t("worktime", "Projekte"),
						icon: Ds,
						visible: this.canManageProjects
					},
					{
						id: "sec-berechtigungen",
						label: this.t("worktime", "Berechtigungen"),
						icon: zA,
						visible: this.canManageSettings
					}
				]),
				e(this.t("worktime", "Firma"), [{
					id: "sec-firmendaten",
					label: this.t("worktime", "Firmendaten"),
					icon: ZA,
					visible: this.canManageSettings
				}, {
					id: "sec-arbeitszeit",
					label: this.t("worktime", "Arbeitszeit-Regeln"),
					icon: rj,
					visible: this.canManageSettings
				}]),
				e(this.t("worktime", "Abläufe"), [
					{
						id: "sec-genehmigung",
						label: this.t("worktime", "Genehmigung"),
						icon: Ka,
						visible: this.canManageSettings
					},
					{
						id: "sec-absenzen",
						label: this.t("worktime", "Teiltages-Absenzen"),
						icon: Nj,
						visible: this.canManageSettings
					},
					{
						id: "sec-pausen",
						label: this.t("worktime", "Pausenregelung"),
						icon: lj,
						visible: this.canManageSettings
					},
					{
						id: "sec-pdf",
						label: this.t("worktime", "PDF-Archiv"),
						icon: pv,
						visible: this.canManageSettings
					}
				]),
				e(this.t("worktime", "Kalender"), [
					{
						id: "sec-betriebsferien",
						label: this.t("worktime", "Betriebsferien"),
						icon: hj,
						visible: this.canManageEmployees
					},
					{
						id: "sec-sondertage",
						label: this.t("worktime", "Sondertage"),
						icon: hS,
						visible: this.canManageSettings
					},
					{
						id: "sec-feiertage",
						label: this.t("worktime", "Feiertage"),
						icon: lS,
						visible: this.canManageHolidays
					}
				]),
				e(this.t("worktime", "Konten"), [{
					id: "sec-jahresuebertrag",
					label: this.t("worktime", "Jahresübertrag"),
					icon: xj,
					visible: this.canManageEmployees
				}, {
					id: "sec-ueberstunden-auszahlung",
					label: this.t("worktime", "Überstunden-Auszahlung"),
					icon: Dj,
					visible: this.canManageEmployees
				}]),
				e(this.t("worktime", "Lizenz"), [{
					id: "sec-werkplus",
					label: this.t("worktime", "WerkPlus"),
					icon: GA,
					visible: this.canManageEmployees
				}])
			];
		},
		availableSectionIds() {
			return this.navGroups.flatMap((e) => e.items.map((e) => e.id));
		}
	},
	created() {
		Promise.all([this.loadSettings(), Pj().fetchFederalStates()]).then(() => {
			let e = this.settings.default_federal_state;
			e && !this.selectedHolidayStateFilter && (this.selectedHolidayStateFilter = this.holidayStateFilterOptions.find((n) => n.id === e) || null);
		}), this.canManageEmployees && ($o().fetchEmployees(), this.fetchDepartments(!0)), this.canManageSettings && (this.loadHrManagers(), this.loadArchiveStatus()), this.canManageHolidays && this.loadHolidays(), this.canManageProjects && this.fetchProjects(!0), this.canManageEmployees && (this.loadCarryovers(), this.loadPayouts()), this.initActiveSection();
	},
	watch: { availableSectionIds: {
		immediate: !1,
		handler(e) {
			this.activeSection = Lk(Ik(window.location.hash), e, this.activeSection);
		}
	} },
	methods: {
		...Er(Pj, ["generateAllHolidays"]),
		...Er($o, ["deleteEmployee"]),
		...Er(xv, ["fetchProjects", "deleteProject"]),
		...Er(qD, ["fetchDepartments", "deleteDepartment"]),
		archiveMonthLabel(e) {
			return Jv(e);
		},
		archiveDate(e) {
			if (!e) return "";
			try {
				return new Date(e).toLocaleString(Wv(), {
					dateStyle: "short",
					timeStyle: "short"
				});
			} catch {
				return "";
			}
		},
		async loadArchiveStatus() {
			this.archiveLoading = !0;
			try {
				let e = await Sv.getArchiveStatus();
				e && (this.archiveStatus = e);
			} catch (e) {
				console.error("Failed to load archive status:", e);
			} finally {
				this.archiveLoading = !1;
			}
		},
		async retryArchiveJob(e) {
			this.archiveRetryingId = e.id;
			try {
				await Sv.retryArchive(e.id), Vv(this.t("worktime", "Archivierung wird erneut versucht")), await this.loadArchiveStatus();
			} catch (e) {
				console.error("Failed to retry archive job:", e), Hv(this.t("worktime", "Erneuter Versuch fehlgeschlagen"));
			} finally {
				this.archiveRetryingId = null;
			}
		},
		setActiveSection(e) {
			this.activeSection = e, zk("/settings", e);
		},
		initActiveSection() {
			this.activeSection = Lk(Ik(window.location.hash), this.availableSectionIds);
		},
		async loadSettings() {
			this.loading = !0;
			try {
				let e = await Ko.getAll();
				this.settings = {
					...e,
					require_project: e.require_project === "1",
					require_description: e.require_description === "1",
					allow_future_entries: e.allow_future_entries === "1",
					approval_required: e.approval_required === "1",
					punch_only: e.punch_only === "1",
					hourly_sick_enabled: e.hourly_sick_enabled === "1",
					emergency_work_enabled: e.emergency_work_enabled === "1",
					emergency_work_requires_approval: e.emergency_work_requires_approval === "1",
					christmas_eve_half_day: this.specialDayMode(e.christmas_eve_half_day),
					new_years_eve_half_day: this.specialDayMode(e.new_years_eve_half_day)
				};
			} catch (e) {
				console.error("Failed to load settings:", e);
			} finally {
				this.loading = !1;
			}
		},
		async saveSetting(e) {
			try {
				await Ko.update(e, String(this.settings[e])), Vv(this.t("worktime", "Einstellung gespeichert"));
			} catch (e) {
				Hv(e.message);
			}
		},
		async saveSettingBool(e) {
			try {
				await Ko.update(e, this.settings[e] ? "1" : "0"), Vv(this.t("worktime", "Einstellung gespeichert"));
			} catch (e) {
				Hv(e.message);
			}
		},
		specialDayMode(e) {
			return e === "full" ? "full" : e === "half" || e === "1" ? "half" : "none";
		},
		confirmApprovalToggle(e) {
			let n = e ? this.t("worktime", "Genehmigung aktivieren") : this.t("worktime", "Genehmigung deaktivieren"), r = e ? this.t("worktime", "Ab jetzt müssen Zeiten eingereicht und durch Vorgesetzte freigegeben werden.") : this.t("worktime", "Der Freigabe-Schritt entfällt für alle Mitarbeitenden. Erfasste Zeiten gelten dann direkt. Bereits genehmigte Einträge bleiben gesperrt und können im Aus-Modus nicht mehr aufgemacht werden.");
			new zv().setName(n).setText(r).setButtons([{
				label: this.t("worktime", "Abbrechen"),
				variant: "secondary",
				callback: () => {
					this.settings.approval_required = !e;
				}
			}, {
				label: this.t("worktime", "Fortfahren"),
				variant: "primary",
				callback: () => {
					this.saveSettingBool("approval_required");
				}
			}]).build().show().catch(() => {
				this.settings.approval_required = !e;
			});
		},
		generateHolidays() {
			new zv().setName(this.t("worktime", "Feiertage neu erstellen")).setText(this.t("worktime", "Die automatisch erzeugten Feiertage für {year} werden für alle Bundesländer neu erstellt. Manuell angelegte Feiertage bleiben erhalten.", { year: this.holidayYear })).setButtons([{
				label: this.t("worktime", "Abbrechen"),
				variant: "secondary",
				callback: () => {}
			}, {
				label: this.t("worktime", "Fortfahren"),
				variant: "primary",
				callback: () => {
					this.runGenerateHolidays();
				}
			}]).build().show().catch(() => {});
		},
		async runGenerateHolidays() {
			try {
				let e = await this.generateAllHolidays(this.holidayYear);
				Vv(this.t("worktime", "{count} Feiertage für {year} generiert", {
					count: e.totalHolidays,
					year: this.holidayYear
				})), await this.loadHolidays();
			} catch (e) {
				Hv(e.message);
			}
		},
		openNewEmployeeForm() {
			this.editingEmployee = null, this.showEmployeeForm = !0;
		},
		editEmployee(e) {
			this.editingEmployee = e, this.showEmployeeForm = !0;
		},
		startCorrection(e) {
			qo().startCorrection({
				employeeId: e.id,
				employeeName: e.fullName
			}), this.$router.push("/tracking").catch(() => {});
		},
		closeEmployeeForm() {
			this.showEmployeeForm = !1, this.editingEmployee = null;
		},
		async onEmployeeSaved() {
			let e = !!this.editingEmployee;
			this.closeEmployeeForm(), await $o().fetchEmployees(), await qo().fetchPermissions(), Vv(e ? this.t("worktime", "Mitarbeiter aktualisiert") : this.t("worktime", "Mitarbeiter erstellt"));
		},
		async handleSetResting({ employee: e, reason: n, restingFrom: r }) {
			try {
				await Qo.setResting(e.id, !0, n || null, r || null), await $o().fetchEmployees(!0), Vv(this.t("worktime", "Mitarbeiter ruhend gesetzt"));
			} catch (e) {
				Hv(e.message);
			}
		},
		async handleReactivate(e) {
			try {
				await Qo.setResting(e.id, !1), await $o().fetchEmployees(!0), Vv(this.t("worktime", "Mitarbeiter reaktiviert"));
			} catch (e) {
				Hv(e.message);
			}
		},
		async handleDeleteEmployee(e) {
			try {
				await this.deleteEmployee(e.id), Vv(this.t("worktime", "Mitarbeiter gelöscht"));
			} catch (e) {
				Hv(e.message);
			}
		},
		openNewProjectForm() {
			this.editingProject = null, this.showProjectForm = !0;
		},
		editProject(e) {
			this.editingProject = e, this.showProjectForm = !0;
		},
		closeProjectForm() {
			this.showProjectForm = !1, this.editingProject = null;
		},
		async onProjectSaved() {
			this.closeProjectForm(), await this.fetchProjects(!0);
		},
		async handleDeleteProject(e) {
			try {
				await this.deleteProject(e.id), Vv(this.t("worktime", "Projekt gelöscht"));
			} catch (e) {
				Hv(e.message);
			}
		},
		openNewDepartmentForm() {
			this.editingDepartment = null, this.showDepartmentForm = !0;
		},
		editDepartment(e) {
			this.editingDepartment = e, this.showDepartmentForm = !0;
		},
		closeDepartmentForm() {
			this.showDepartmentForm = !1, this.editingDepartment = null;
		},
		async onDepartmentSaved() {
			this.closeDepartmentForm(), await this.fetchDepartments(!0);
		},
		async handleDeleteDepartment(e) {
			try {
				await this.deleteDepartment(e.id), Vv(this.t("worktime", "Abteilung gelöscht")), await $o().fetchEmployees();
			} catch (e) {
				Hv(e.message);
			}
		},
		async loadHrManagers() {
			try {
				let [e, n] = await Promise.all([Ko.getAvailablePrincipals(), Ko.getHrManagers()]);
				this.availablePrincipals = e, this.hrManagers = n, this.previousHrManagers = [...n];
			} catch (e) {
				console.error("Failed to load HR managers:", e);
			}
		},
		saveHrManagers() {
			let e = this.previousHrManagers.filter((e) => !this.hrManagers.includes(e));
			if (e.length === 0) {
				this.persistHrManagers();
				return;
			}
			let n = e.map((e) => this.principalOptions.find((n) => n.id === e)?.label || e).join(", "), r = e.length === 1 ? this.t("worktime", "{names} verliert damit die HR-Manager-Rechte (Mitarbeiter verwalten, Zeiten genehmigen). Fortfahren?", { names: n }) : this.t("worktime", "{names} verlieren damit die HR-Manager-Rechte (Mitarbeiter verwalten, Zeiten genehmigen). Fortfahren?", { names: n });
			new zv().setName(this.t("worktime", "HR-Manager entfernen")).setText(r).setButtons([{
				label: this.t("worktime", "Abbrechen"),
				variant: "secondary",
				callback: () => {
					this.hrManagers = [...this.previousHrManagers];
				}
			}, {
				label: this.t("worktime", "Entfernen"),
				variant: "error",
				callback: () => {
					this.persistHrManagers();
				}
			}]).build().show().catch(() => {
				this.hrManagers = [...this.previousHrManagers];
			});
		},
		async persistHrManagers() {
			try {
				await Ko.setHrManagers(this.hrManagers), this.previousHrManagers = [...this.hrManagers], Vv(this.t("worktime", "HR-Manager gespeichert"));
			} catch (e) {
				Hv(e.message), this.hrManagers = [...this.previousHrManagers];
			}
		},
		async openFolderPicker() {
			try {
				let e = await Pv(this.t("worktime", "Archiv-Ordner auswählen")).setMultiSelect(!1).setMimeTypeFilter(["httpd/unix-directory"]).allowDirectories(!0).addButton({
					label: this.t("worktime", "Auswählen"),
					variant: "primary",
					callback: () => {}
				}).build().pick();
				e && (this.settings.pdf_archive_path = e, await this.saveSetting("pdf_archive_path"));
			} catch (e) {
				e instanceof jv || console.error("Folder picker error:", e);
			}
		},
		async loadHolidays() {
			this.loadingHolidays = !0;
			try {
				this.holidays = await pD.getByYear(this.holidayYear);
			} catch (e) {
				console.error("Failed to load holidays:", e), this.holidays = [];
			} finally {
				this.loadingHolidays = !1;
			}
		},
		filterHolidays() {},
		formatDate(e) {
			return e ? new Date(e).toLocaleDateString(Wv(), {
				day: "2-digit",
				month: "2-digit",
				year: "numeric"
			}) : "";
		},
		openHolidayForm(e) {
			this.editingHoliday = e, this.holidayFormData = e ? {
				date: new Date(e.date),
				name: e.name,
				federalStates: [e.federalState],
				scope: e.scope ?? 1
			} : {
				date: null,
				name: "",
				federalStates: Object.keys(this.federalStates),
				scope: 1
			}, this.showHolidayForm = !0;
		},
		closeHolidayForm() {
			this.showHolidayForm = !1, this.editingHoliday = null;
		},
		selectAllStates() {
			this.holidayFormData.federalStates = Object.keys(this.federalStates);
		},
		deselectAllStates() {
			this.holidayFormData.federalStates = [];
		},
		toggleState(e, n) {
			n ? this.holidayFormData.federalStates.includes(e) || this.holidayFormData.federalStates.push(e) : this.holidayFormData.federalStates = this.holidayFormData.federalStates.filter((n) => n !== e);
		},
		async saveHoliday() {
			try {
				let e = this.holidayFormData.date instanceof Date ? qv(this.holidayFormData.date) : this.holidayFormData.date;
				if (this.editingHoliday) {
					let n = this.editingHoliday.groupHolidayIds || [this.editingHoliday.id];
					for (let r of n) await pD.update(r, {
						date: e,
						name: this.holidayFormData.name,
						scope: this.holidayFormData.scope
					});
					Vv(this.t("worktime", "{count} Feiertag(e) aktualisiert", { count: n.length }));
				} else await pD.create({
					date: e,
					name: this.holidayFormData.name,
					federalStates: this.holidayFormData.federalStates,
					scope: this.holidayFormData.scope
				}), Vv(this.t("worktime", "Feiertag erstellt"));
				this.closeHolidayForm(), await this.loadHolidays();
			} catch (e) {
				Hv(e.message);
			}
		},
		toggleGroupExpand(e) {
			let n = this.expandedGroups.indexOf(e);
			n === -1 ? this.expandedGroups.push(e) : this.expandedGroups.splice(n, 1);
		},
		openHolidayGroupForm(e) {
			let n = e.holidays[0];
			this.editingHoliday = {
				...n,
				groupHolidayIds: e.holidays.map((e) => e.id)
			}, this.holidayFormData = {
				date: new Date(n.date),
				name: n.name,
				federalStates: e.states,
				scope: n.scope ?? 1
			}, this.showHolidayForm = !0;
		},
		async confirmDeleteHolidayGroup(e) {
			let n = this.t("worktime", "Möchtest du den Feiertag \"{name}\" ({count} Bundesländer) wirklich löschen?", {
				name: e.name,
				count: e.states.length
			});
			new zv().setName(this.t("worktime", "Feiertag löschen")).setText(n).setButtons([{
				label: this.t("worktime", "Abbrechen"),
				variant: "secondary",
				callback: () => {}
			}, {
				label: this.t("worktime", "Löschen"),
				variant: "error",
				callback: async () => {
					await this.deleteHolidayGroup(e);
				}
			}]).build().show().catch(() => {});
		},
		async deleteHolidayGroup(e) {
			if (e) try {
				for (let n of e.holidays) await pD.delete(n.id);
				Vv(this.t("worktime", "{count} Feiertag(e) gelöscht", { count: e.holidays.length })), await this.loadHolidays();
			} catch (e) {
				Hv(e.message);
			}
		},
		async loadCarryovers() {
			try {
				let e = this.carryoverYear - 1, [n, r] = await Promise.all([nR.getByYear(this.carryoverYear), bw.getTeamYear(e)]), i = {};
				(n || []).forEach((e) => {
					i[e.employeeId] = e;
				});
				let a = {};
				(n || []).forEach((e) => {
					a[e.employeeId] = e.wasActiveInSourceYear || !1;
				});
				let o = {};
				(r || []).forEach((e) => {
					let n = e.months?.some((e) => e.status === "submitted" || e.status === "approved" || e.status === "rejected") || !1;
					o[e.employee.id] = n, n && !(e.employee.id in a) && (a[e.employee.id] = !0);
				});
				let s = {};
				for (let e of Object.keys({
					...a,
					...o
				})) s[e] = (a[e] || !1) && (o[e] || !1);
				let c = {};
				(r || []).forEach((e) => {
					let n = (e.totalOvertimeMinutes || 0) - (e.carryoverMinutes || 0);
					c[e.employee.id] = {
						overtimeHours: iR(n / 60),
						vacationRemaining: e.vacationStats?.remaining ?? null
					};
				});
				let l = !0, u = !1;
				(r || []).forEach((e) => {
					o[e.employee.id] && (u = !0, e.months?.forEach((e) => {
						e.overtimeMinutes !== null && e.status !== "approved" && (l = !1);
					}));
				}), this.carryoverSourceYearStatus = u ? l ? "closed" : "open" : null, this.carryoverEmployees = this.employees.map((e) => {
					let n = i[e.id], r = s[e.id] || !1, a = c[e.id] || {}, o = n ? n.overtimeHours : 0, l = n ? n.vacationDays : 0, u = n && n.note || "";
					return {
						employeeId: e.id,
						carryoverId: n ? n.id : null,
						fullName: `${e.firstName} ${e.lastName}`,
						overtimeHours: o,
						vacationDays: l,
						note: u,
						isLocked: n ? n.isLocked : !1,
						wasActive: r,
						actualOvertimeHours: r ? a.overtimeHours ?? null : null,
						actualVacationRemaining: r ? a.vacationRemaining ?? null : null,
						hasValues: !(!n || n.overtimeMinutes === 0 && n.vacationDays === 0 && !n.note)
					};
				});
			} catch (e) {
				console.error("Failed to load carryovers:", e);
			}
		},
		async autoSaveCarryover(e) {
			try {
				let n = await nR.upsert(e.employeeId, this.carryoverYear, Math.round((e.overtimeHours || 0) * 60), e.vacationDays || 0, e.note || null);
				e.carryoverId = n.id, e.hasValues = !!(n.overtimeMinutes !== 0 || n.vacationDays !== 0 || n.note);
			} catch (e) {
				Hv(e.message);
			}
		},
		async lockCarryover(e) {
			if (e.carryoverId) try {
				await nR.lock(e.carryoverId), e.isLocked = !0, Vv(this.t("worktime", "Übertrag durchgeführt"));
			} catch (e) {
				Hv(e.message);
			}
		},
		openCancelModal(e) {
			this.cancellingEmployee = e, this.cancelForm = {
				overtimeHours: e.overtimeHours,
				vacationDays: e.vacationDays,
				reason: ""
			}, this.showCancelModal = !0;
		},
		closeCancelModal() {
			this.showCancelModal = !1, this.cancellingEmployee = null;
		},
		async submitCancel() {
			if (this.cancellingEmployee?.carryoverId) try {
				await nR.cancel(this.cancellingEmployee.carryoverId, Math.round(this.cancelForm.overtimeHours * 60), this.cancelForm.vacationDays, this.cancelForm.reason), Vv(this.t("worktime", "Übertrag korrigiert")), this.closeCancelModal(), await this.loadCarryovers();
			} catch (e) {
				Hv(e.message);
			}
		},
		resizeTextarea(e) {
			let n = e.target;
			n.style.height = "auto", n.style.height = n.scrollHeight + "px";
		},
		formatHours(e) {
			return e == null ? "–" : `${e >= 0 ? "+" : ""}${e.toFixed(1)}`;
		},
		async loadPayouts() {
			try {
				let [e, n] = await Promise.all([bw.getTeamYear(this.payoutYear), rR.getByYear(this.payoutYear)]);
				this.payoutEmployees = (e || []).map((e) => ({
					employeeId: e.employee.id,
					fullName: e.employee.fullName,
					saldoMinutes: e.totalOvertimeMinutes || 0,
					paidOutMinutes: e.paidOutMinutes || 0
				}));
				let r = {};
				this.employees.forEach((e) => {
					r[e.id] = `${e.firstName} ${e.lastName}`;
				}), this.payoutHistory = (n || []).map((e) => ({
					...e,
					employeeName: r[e.employeeId] || `#${e.employeeId}`
				}));
			} catch (e) {
				console.error("Failed to load payouts:", e);
			}
		},
		openPayoutModal(e) {
			this.payoutTarget = e, this.payoutForm = {
				hours: "",
				date: qv(/* @__PURE__ */ new Date()),
				note: ""
			}, this.payoutError = "", this.showPayoutModal = !0;
		},
		closePayoutModal() {
			this.showPayoutModal = !1, this.payoutTarget = null;
		},
		parsePayoutMinutes(e) {
			let n = (e || "").trim().replace(",", ".");
			if (n === "") return null;
			if (n.includes(":")) {
				let [e, r] = n.split(":"), i = parseInt(r || "0", 10), a = parseInt(e || "0", 10);
				return isNaN(a) || isNaN(i) || i > 59 ? null : a * 60 + i;
			}
			let r = parseFloat(n);
			return isNaN(r) ? null : Math.round(r * 60);
		},
		async submitPayout() {
			let e = this.parsePayoutMinutes(this.payoutForm.hours), n = this.payoutTarget?.saldoMinutes || 0;
			if (e === null || e <= 0) this.payoutError = this.t("worktime", "Bitte gültige Stunden eingeben.");
			else if (e > n) this.payoutError = this.t("worktime", "Die Auszahlung darf den verfügbaren Saldo nicht überschreiten.");
			else if (this.payoutForm.note.trim().length < 10) this.payoutError = this.t("worktime", "Bitte einen Grund mit mindestens 10 Zeichen angeben.");
			else try {
				await rR.create(this.payoutTarget.employeeId, this.payoutForm.date, e, this.payoutForm.note.trim()), Vv(this.t("worktime", "Auszahlung erfasst")), this.closePayoutModal(), await this.loadPayouts();
			} catch (e) {
				this.payoutError = e.message;
			}
		},
		async deletePayout(e) {
			if (await Uv(this.t("worktime", "Diese Auszahlung löschen? Der Überstundensaldo wird wieder erhöht."), this.t("worktime", "Auszahlung löschen"), this.t("worktime", "Löschen"), !0)) try {
				await rR.delete(e.id), Vv(this.t("worktime", "Auszahlung gelöscht")), await this.loadPayouts();
			} catch (e) {
				Hv(e.message);
			}
		},
		formatSignedHours(e) {
			return `${e >= 0 ? "+" : ""}${fy(e)}`;
		},
		formatAbsHours(e) {
			return fy(Math.abs(e));
		},
		formatDateDisplay(e) {
			return e ? e.split("-").reverse().join(".") : "";
		}
	}
}, oR = { class: "settings-view" }, sR = { class: "view-header" }, cR = {
	key: 1,
	class: "settings-layout"
}, lR = { class: "settings-content" }, uR = { class: "section-header-actions" }, dR = { class: "section-header-actions" }, fR = { class: "section-header-actions" }, pR = { class: "form-group" }, mR = { class: "principal-option" }, hR = { class: "principal-label" }, gR = { class: "principal-sublabel" }, _R = { class: "form-group" }, vR = { for: "companyName" }, yR = { class: "form-group" }, bR = { for: "defaultState" }, xR = { class: "form-group" }, SR = { for: "timezone" }, CR = { class: "form-row" }, wR = { class: "form-group" }, TR = { for: "weeklyHours" }, ER = { class: "form-group" }, DR = { for: "vacationDays" }, OR = { class: "form-group" }, kR = { for: "maxDailyHours" }, AR = { class: "help-text" }, jR = { class: "form-group" }, MR = { class: "form-group" }, NR = { class: "form-group" }, PR = { class: "form-group" }, FR = {
	key: 0,
	class: "help-text"
}, IR = { class: "form-group" }, LR = { class: "form-group" }, RR = { class: "form-group" }, zR = { class: "form-group" }, BR = { class: "form-row" }, VR = { class: "form-group" }, HR = { for: "break6h" }, UR = { class: "form-group" }, WR = { for: "break9h" }, GR = { class: "form-group" }, KR = { for: "maxPause" }, qR = { class: "form-group" }, JR = { class: "folder-picker" }, YR = { class: "selected-path" }, XR = { class: "help-text" }, ZR = { class: "help-text" }, QR = {
	key: 0,
	class: "form-group archive-status"
}, $R = { class: "help-text" }, ez = {
	key: 0,
	class: "archive-failed-list"
}, tz = { class: "archive-failed-info" }, nz = { class: "archive-failed-month" }, rz = {
	key: 0,
	class: "archive-failed-error"
}, iz = {
	key: 1,
	class: "archive-done-list"
}, az = { class: "help-text archive-done-caption" }, oz = { class: "archive-done-name" }, sz = { class: "archive-done-date" }, cz = { class: "form-group" }, lz = { class: "special-day-label" }, uz = { class: "special-day-options" }, dz = { class: "form-group" }, fz = { class: "special-day-label" }, pz = { class: "special-day-options" }, mz = { class: "help-text" }, hz = { class: "form-row holiday-filters" }, gz = { class: "form-group" }, _z = { for: "holidayYear" }, vz = { class: "form-group" }, yz = { for: "holidayStateFilter" }, bz = {
	key: 1,
	class: "settings-table-card"
}, xz = { class: "holiday-table" }, Sz = ["onClick"], Cz = { class: "col-expand" }, wz = { class: "state-count" }, Tz = { colspan: "7" }, Ez = { class: "state-chips" }, Dz = { class: "holiday-form-modal" }, Oz = { id: "wt-holiday-form-title" }, kz = { class: "form-group" }, Az = { for: "holidayDate" }, jz = { class: "form-group" }, Mz = { for: "holidayName" }, Nz = ["placeholder"], Pz = {
	key: 0,
	class: "form-group"
}, Fz = { class: "state-selection" }, Iz = { class: "state-checkboxes" }, Lz = {
	key: 1,
	class: "form-group"
}, Rz = { class: "state-chips readonly" }, zz = { class: "form-group" }, Bz = { class: "form-actions" }, Vz = { class: "form-row" }, Hz = { class: "form-group" }, Uz = ["value"], Wz = {
	key: 0,
	class: "form-group carryover-year-status"
}, Gz = {
	key: 0,
	class: "year-status year-status--closed"
}, Kz = {
	key: 1,
	class: "year-status year-status--open"
}, qz = {
	key: 0,
	class: "settings-table-card"
}, Jz = { class: "carryover-table" }, Yz = { class: "text-right carryover-actual" }, Xz = {
	key: 1,
	class: "value-na"
}, Zz = { class: "text-right" }, Qz = ["onUpdate:modelValue", "onChange"], $z = {
	key: 1,
	class: "carryover-locked-value"
}, eB = { class: "text-right carryover-actual" }, tB = { key: 0 }, nB = {
	key: 1,
	class: "value-na"
}, rB = { class: "text-right" }, iB = ["onUpdate:modelValue", "onChange"], aB = {
	key: 1,
	class: "carryover-locked-value"
}, oB = { class: "carryover-note-cell" }, sB = ["onUpdate:modelValue", "onChange"], cB = {
	key: 1,
	class: "carryover-locked-note"
}, lB = { class: "carryover-actions" }, uB = {
	key: 1,
	class: "carryover-locked-label"
}, dB = { class: "cancel-modal" }, fB = { id: "wt-carryover-cancel-title" }, pB = { class: "cancel-modal__hint" }, mB = { class: "form-group" }, hB = { class: "form-group" }, gB = { class: "form-group" }, _B = ["placeholder"], vB = { class: "form-actions" }, yB = {
	key: 0,
	class: "settings-table-card"
}, bB = { class: "carryover-table" }, xB = { class: "text-right" }, SB = { class: "text-right" }, CB = { class: "text-right" }, wB = { class: "text-right" }, TB = { key: 0 }, EB = {
	key: 1,
	class: "value-na"
}, DB = { class: "carryover-actions" }, OB = { class: "payout-hist-title" }, kB = {
	key: 1,
	class: "settings-table-card"
}, AB = { class: "carryover-table" }, jB = { class: "text-right" }, MB = { class: "text-right" }, NB = { class: "payout-note" }, PB = { class: "carryover-actions" }, FB = {
	key: 2,
	class: "payout-hist-empty"
}, IB = { class: "cancel-modal" }, LB = { id: "wt-payout-title" }, RB = { class: "cancel-modal__hint" }, zB = { class: "form-group" }, BB = ["placeholder"], VB = { class: "form-group" }, HB = { class: "form-group" }, UB = ["placeholder"], WB = {
	key: 0,
	class: "payout-error"
}, GB = { class: "form-actions" };
function KB(e, r, i, a, o, s) {
	let c = P("NcLoadingIcon"), l = P("SettingsNav"), d = P("Plus"), f = P("NcButton"), p = P("EmployeeList"), m = P("EmployeeForm"), h = P("NcModal"), g = P("SettingsCard"), _ = P("DepartmentList"), v = P("DepartmentForm"), b = P("ProjectList"), x = P("ProjectForm"), S = P("InfoIcon"), C = P("AccountGroup"), w = P("Account"), T = P("NcSelect"), E = P("NcCheckboxRadioSwitch"), O = P("Folder"), ee = P("BetriebsferienSettings"), te = P("ChevronRight"), ne = P("ChevronDown"), re = P("Pencil"), ie = P("Close"), ae = P("CalendarBlank"), oe = P("NcEmptyContent"), se = P("NcDateTimePicker"), ce = P("CashMultiple"), le = P("WerkPlusSettings");
	return J(), H("div", oR, [
		n("div", sR, [n("h2", null, U(e.t("worktime", "Verwaltung")), 1)]),
		r[232] ||= z(),
		o.loading ? (J(), L(c, {
			key: 0,
			size: 44
		})) : (J(), H("div", cR, [
			I(l, {
				groups: s.navGroups,
				active: o.activeSection,
				onSelect: s.setActiveSection
			}, null, 8, [
				"groups",
				"active",
				"onSelect"
			]),
			r[231] ||= z(),
			n("div", lR, [
				e.canManageEmployees ? N((J(), L(g, {
					key: 0,
					id: "sec-mitarbeiter",
					name: e.t("worktime", "Mitarbeiter")
				}, {
					default: A(() => [
						n("div", uR, [I(f, {
							variant: "primary",
							onClick: s.openNewEmployeeForm
						}, {
							icon: A(() => [I(d, { size: 20 })]),
							default: A(() => [z(" " + U(e.t("worktime", "Neuer Mitarbeiter")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						r[63] ||= z(),
						I(p, {
							employees: e.employees,
							onCorrect: s.startCorrection,
							onEdit: s.editEmployee,
							onRest: s.handleSetResting,
							onReactivate: s.handleReactivate,
							onDelete: s.handleDeleteEmployee
						}, null, 8, [
							"employees",
							"onCorrect",
							"onEdit",
							"onRest",
							"onReactivate",
							"onDelete"
						]),
						r[64] ||= z(),
						o.showEmployeeForm ? (J(), L(h, {
							key: 0,
							"label-id": "wt-employee-form-title",
							onClose: s.closeEmployeeForm
						}, {
							default: A(() => [I(m, {
								employee: o.editingEmployee,
								"default-federal-state": o.settings.default_federal_state || "BY",
								onSaved: s.onEmployeeSaved,
								onCancel: s.closeEmployeeForm
							}, null, 8, [
								"employee",
								"default-federal-state",
								"onSaved",
								"onCancel"
							])]),
							_: 1
						}, 8, ["onClose"])) : K("", !0)
					]),
					_: 1
				}, 8, ["name"])), [[k, o.activeSection === "sec-mitarbeiter"]]) : K("", !0),
				r[216] ||= z(),
				e.canManageEmployees ? N((J(), L(g, {
					key: 1,
					id: "sec-abteilungen",
					name: e.t("worktime", "Abteilungen")
				}, {
					default: A(() => [
						n("div", dR, [I(f, {
							variant: "primary",
							onClick: s.openNewDepartmentForm
						}, {
							icon: A(() => [I(d, { size: 20 })]),
							default: A(() => [z(" " + U(e.t("worktime", "Neue Abteilung")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						r[65] ||= z(),
						I(_, {
							departments: e.allDepartments,
							onEdit: s.editDepartment,
							onDelete: s.handleDeleteDepartment
						}, null, 8, [
							"departments",
							"onEdit",
							"onDelete"
						]),
						r[66] ||= z(),
						o.showDepartmentForm ? (J(), L(h, {
							key: 0,
							"label-id": "wt-department-form-title",
							onClose: s.closeDepartmentForm
						}, {
							default: A(() => [I(v, {
								department: o.editingDepartment,
								onSaved: s.onDepartmentSaved,
								onCancel: s.closeDepartmentForm
							}, null, 8, [
								"department",
								"onSaved",
								"onCancel"
							])]),
							_: 1
						}, 8, ["onClose"])) : K("", !0)
					]),
					_: 1
				}, 8, ["name"])), [[k, o.activeSection === "sec-abteilungen"]]) : K("", !0),
				r[217] ||= z(),
				e.canManageProjects ? N((J(), L(g, {
					key: 2,
					id: "sec-projekte",
					name: e.t("worktime", "Projekte")
				}, {
					default: A(() => [
						n("div", fR, [I(f, {
							variant: "primary",
							onClick: s.openNewProjectForm
						}, {
							icon: A(() => [I(d, { size: 20 })]),
							default: A(() => [z(" " + U(e.t("worktime", "Neues Projekt")), 1)]),
							_: 1
						}, 8, ["onClick"])]),
						r[67] ||= z(),
						I(b, {
							projects: e.allProjects,
							onEdit: s.editProject,
							onDelete: s.handleDeleteProject
						}, null, 8, [
							"projects",
							"onEdit",
							"onDelete"
						]),
						r[68] ||= z(),
						o.showProjectForm ? (J(), L(h, {
							key: 0,
							"label-id": "wt-project-form-title",
							onClose: s.closeProjectForm
						}, {
							default: A(() => [I(x, {
								project: o.editingProject,
								onSaved: s.onProjectSaved,
								onCancel: s.closeProjectForm
							}, null, 8, [
								"project",
								"onSaved",
								"onCancel"
							])]),
							_: 1
						}, 8, ["onClose"])) : K("", !0)
					]),
					_: 1
				}, 8, ["name"])), [[k, o.activeSection === "sec-projekte"]]) : K("", !0),
				r[218] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 3,
					id: "sec-berechtigungen",
					name: e.t("worktime", "Berechtigungen")
				}, {
					default: A(() => [n("div", pR, [
						n("label", null, [z(U(e.t("worktime", "HR-Manager")) + " ", 1), I(S, null, {
							default: A(() => [z(U(e.t("worktime", "Admin: Volle Rechte (automatisch). HR-Manager: Mitarbeiter verwalten und Anträge genehmigen (manuell zuweisen). Vorgesetzter: Genehmigt Zeiten seines Teams (automatisch). Mitarbeiter: Eigene Zeiten erfassen (automatisch).")), 1)]),
							_: 1
						})]),
						r[71] ||= z(),
						I(T, {
							"label-outside": "",
							modelValue: s.selectedHrManagers,
							"onUpdate:modelValue": [r[0] ||= (e) => s.selectedHrManagers = e, s.saveHrManagers],
							options: s.principalOptions,
							multiple: !0,
							"keep-open": "",
							placeholder: e.t("worktime", "Benutzer oder Gruppen auswählen"),
							label: "label"
						}, {
							option: A(({ label: e, sublabel: i, type: a }) => [n("div", mR, [
								a === "group" ? (J(), L(C, {
									key: 0,
									size: 20
								})) : (J(), L(w, {
									key: 1,
									size: 20
								})),
								r[69] ||= z(),
								n("span", hR, U(e), 1),
								r[70] ||= z(),
								n("span", gR, U(i), 1)
							])]),
							_: 1
						}, 8, [
							"modelValue",
							"options",
							"placeholder",
							"onUpdate:modelValue"
						])
					])]),
					_: 1
				}, 8, ["name"])), [[k, o.activeSection === "sec-berechtigungen"]]) : K("", !0),
				r[219] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 4,
					id: "sec-firmendaten",
					name: e.t("worktime", "Firmendaten"),
					description: e.t("worktime", "Stammdaten und Standardwerte, die für neue Mitarbeiter vorausgewählt werden.")
				}, {
					default: A(() => [
						n("div", _R, [
							n("label", vR, U(e.t("worktime", "Firmenname")), 1),
							r[72] ||= z(),
							N(n("input", {
								id: "companyName",
								"onUpdate:modelValue": r[1] ||= (e) => o.settings.company_name = e,
								type: "text",
								class: "input-field",
								onChange: r[2] ||= (e) => s.saveSetting("company_name")
							}, null, 544), [[y, o.settings.company_name]])
						]),
						r[78] ||= z(),
						n("div", yR, [
							n("label", bR, [z(U(e.t("worktime", "Standard-Bundesland")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Neue Mitarbeiter bekommen dieses Bundesland automatisch zugewiesen. Jeder Mitarbeiter kann ein eigenes Bundesland haben — das bestimmt, welche Feiertage für ihn gelten.")), 1)]),
								_: 1
							})]),
							r[73] ||= z(),
							I(T, {
								"label-outside": "",
								id: "defaultState",
								modelValue: s.selectedFederalState,
								"onUpdate:modelValue": [r[3] ||= (e) => s.selectedFederalState = e, r[4] ||= (e) => s.saveSetting("default_federal_state")],
								options: s.federalStateOptions
							}, null, 8, ["modelValue", "options"])
						]),
						r[79] ||= z(),
						n("div", xR, [
							n("label", SR, [z(U(e.t("worktime", "Zeitzone")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Gilt für alle, deren Zeitzone Nextcloud nicht kennt, etwa nach Anmeldung per SSO oder nur über die App. Sie bestimmt die Uhrzeit der Stempeluhr und welcher Tag „heute“ ist. Die Zeitzone aus den persönlichen Nextcloud-Einstellungen hat immer Vorrang.")), 1)]),
								_: 1
							})]),
							r[74] ||= z(),
							I(T, {
								"label-outside": "",
								id: "timezone",
								modelValue: s.selectedTimezone,
								"onUpdate:modelValue": [r[5] ||= (e) => s.selectedTimezone = e, r[6] ||= (e) => s.saveSetting("timezone")],
								options: s.timezoneOptions,
								clearable: !1
							}, null, 8, ["modelValue", "options"])
						]),
						r[80] ||= z(),
						n("div", CR, [
							n("div", wR, [
								n("label", TR, [z(U(e.t("worktime", "Standard-Wochenstunden")) + " ", 1), I(S, null, {
									default: A(() => [z(U(e.t("worktime", "Neue Mitarbeiter bekommen diese Wochenstunden voreingestellt. Sie können im Mitarbeiterprofil individuell angepasst werden.")), 1)]),
									_: 1
								})]),
								r[75] ||= z(),
								N(n("input", {
									id: "weeklyHours",
									"onUpdate:modelValue": r[7] ||= (e) => o.settings.default_weekly_hours = e,
									type: "number",
									min: "0",
									max: "60",
									class: "input-field input-small",
									onChange: r[8] ||= (e) => s.saveSetting("default_weekly_hours")
								}, null, 544), [[
									y,
									o.settings.default_weekly_hours,
									void 0,
									{ number: !0 }
								]])
							]),
							r[77] ||= z(),
							n("div", ER, [
								n("label", DR, [z(U(e.t("worktime", "Standard-Urlaubstage")) + " ", 1), I(S, null, {
									default: A(() => [z(U(e.t("worktime", "Neue Mitarbeiter bekommen diesen Urlaubsanspruch voreingestellt. Der tatsächliche Anspruch wird im Mitarbeiterprofil festgelegt.")), 1)]),
									_: 1
								})]),
								r[76] ||= z(),
								N(n("input", {
									id: "vacationDays",
									"onUpdate:modelValue": r[9] ||= (e) => o.settings.default_vacation_days = e,
									type: "number",
									min: "0",
									max: "60",
									class: "input-field input-small",
									onChange: r[10] ||= (e) => s.saveSetting("default_vacation_days")
								}, null, 544), [[
									y,
									o.settings.default_vacation_days,
									void 0,
									{ number: !0 }
								]])
							])
						])
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-firmendaten"]]) : K("", !0),
				r[220] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 5,
					id: "sec-arbeitszeit",
					name: e.t("worktime", "Arbeitszeit-Regeln")
				}, {
					default: A(() => [
						n("div", OR, [
							n("label", kR, [z(U(e.t("worktime", "Maximale tägliche Arbeitszeit (Stunden)")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn ein Zeiteintrag diesen Wert überschreitet, wird eine Warnung angezeigt. Nach §3 ArbZG sind maximal 10 Stunden erlaubt.")), 1)]),
								_: 1
							})]),
							r[81] ||= z(),
							N(n("input", {
								id: "maxDailyHours",
								"onUpdate:modelValue": r[11] ||= (e) => o.settings.max_daily_hours = e,
								type: "number",
								min: "1",
								max: "24",
								step: "0.5",
								class: "input-field input-small",
								onChange: r[12] ||= (e) => s.saveSetting("max_daily_hours")
							}, null, 544), [[
								y,
								o.settings.max_daily_hours,
								void 0,
								{ number: !0 }
							]]),
							r[82] ||= z(),
							n("p", AR, U(e.t("worktime", "Nach §3 ArbZG sind maximal 10 Stunden erlaubt (Ausnahmen möglich).")), 1)
						]),
						r[84] ||= z(),
						n("div", jR, [I(E, {
							modelValue: o.settings.require_project,
							"onUpdate:modelValue": [r[13] ||= (e) => o.settings.require_project = e, r[14] ||= (e) => s.saveSettingBool("require_project")]
						}, {
							default: A(() => [z(U(e.t("worktime", "Projekt erforderlich")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn aktiv, muss bei jedem Zeiteintrag ein Projekt ausgewählt werden — sonst lässt sich der Eintrag nicht speichern.")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue"])]),
						r[85] ||= z(),
						n("div", MR, [I(E, {
							modelValue: o.settings.require_description,
							"onUpdate:modelValue": [r[15] ||= (e) => o.settings.require_description = e, r[16] ||= (e) => s.saveSettingBool("require_description")]
						}, {
							default: A(() => [z(U(e.t("worktime", "Beschreibung erforderlich")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn aktiv, muss bei jedem Zeiteintrag eine Beschreibung eingetragen werden — sonst lässt sich der Eintrag nicht speichern.")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue"])]),
						r[86] ||= z(),
						n("div", NR, [I(E, {
							modelValue: o.settings.allow_future_entries,
							"onUpdate:modelValue": [r[17] ||= (e) => o.settings.allow_future_entries = e, r[18] ||= (e) => s.saveSettingBool("allow_future_entries")]
						}, {
							default: A(() => [z(U(e.t("worktime", "Zukünftige Einträge erlauben")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn deaktiviert, können Mitarbeiter nur für heute oder vergangene Tage Zeiten eintragen — nicht im Voraus.")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue"])]),
						r[87] ||= z(),
						n("div", PR, [
							I(E, {
								modelValue: o.settings.punch_only,
								"onUpdate:modelValue": [r[19] ||= (e) => o.settings.punch_only = e, r[20] ||= (e) => s.saveSettingBool("punch_only")],
								disabled: !e.punchOnlyLicensed
							}, {
								default: A(() => [z(U(e.t("worktime", "Zeiterfassung nur über die Stempeluhr")) + " ", 1), I(S, null, {
									default: A(() => [z(U(e.t("worktime", "Wenn aktiv, können Mitarbeitende nur ein- und ausstempeln und Pausen setzen. Einträge anlegen, ändern oder löschen können nur HR und Admins.")), 1)]),
									_: 1
								})]),
								_: 1
							}, 8, ["modelValue", "disabled"]),
							r[83] ||= z(),
							e.punchOnlyLicensed ? K("", !0) : (J(), H("p", FR, U(e.t("worktime", "Nur mit WerkPlus verfügbar. Den Schlüssel trägst du unter Lizenz › WerkPlus ein.")), 1))
						])
					]),
					_: 1
				}, 8, ["name"])), [[k, o.activeSection === "sec-arbeitszeit"]]) : K("", !0),
				r[221] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 6,
					id: "sec-genehmigung",
					name: e.t("worktime", "Genehmigung"),
					description: e.t("worktime", "Steuert firmenweit, ob erfasste Zeiten durch Vorgesetzte freigegeben werden müssen. Diese Einstellung betrifft alle Mitarbeitenden.")
				}, {
					default: A(() => [n("div", IR, [I(E, {
						modelValue: o.settings.approval_required,
						"onUpdate:modelValue": [r[21] ||= (e) => o.settings.approval_required = e, s.confirmApprovalToggle]
					}, {
						default: A(() => [z(U(e.t("worktime", "Genehmigung erforderlich")) + " ", 1), I(S, null, {
							default: A(() => [z(U(e.t("worktime", "Wenn aktiv, durchlaufen Zeiteinträge einen Freigabe-Workflow: Mitarbeitende reichen den Monat ein, Vorgesetzte genehmigen ihn. Ist die Option deaktiviert, entfällt dieser Schritt und die erfassten Zeiten gelten direkt. Die Stundenberechnung ist in beiden Fällen gleich.")), 1)]),
							_: 1
						})]),
						_: 1
					}, 8, ["modelValue", "onUpdate:modelValue"])])]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-genehmigung"]]) : K("", !0),
				r[222] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 7,
					id: "sec-absenzen",
					name: e.t("worktime", "Teiltages-Absenzen"),
					description: e.t("worktime", "Steuert firmenweit stundenweise Krankmeldungen und Notarbeit an genehmigten Urlaubstagen. Standardmäßig deaktiviert.")
				}, {
					default: A(() => [
						n("div", LR, [I(E, {
							modelValue: o.settings.hourly_sick_enabled,
							"onUpdate:modelValue": [r[22] ||= (e) => o.settings.hourly_sick_enabled = e, r[23] ||= (e) => s.saveSettingBool("hourly_sick_enabled")]
						}, {
							default: A(() => [z(U(e.t("worktime", "Stundenweise Krankmeldung erlauben")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn aktiv, können Mitarbeitende an einem Einzeltag stundenweise krank sein und die restliche Zeit arbeiten. Die Krank-Stunden füllen bis zum Tagessoll, ohne künstliche Überstunden.")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue"])]),
						r[88] ||= z(),
						n("div", RR, [I(E, {
							modelValue: o.settings.emergency_work_enabled,
							"onUpdate:modelValue": [r[24] ||= (e) => o.settings.emergency_work_enabled = e, r[25] ||= (e) => s.saveSettingBool("emergency_work_enabled")]
						}, {
							default: A(() => [z(U(e.t("worktime", "Notarbeit im Urlaub erlauben")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn aktiv, können Mitarbeitende an einem genehmigten vollen Urlaubstag Notarbeit erfassen. Der Urlaub bleibt bestehen, die Arbeit zählt als Überstunden. Eine Begründung ist Pflicht, der/die Vorgesetzte wird informiert.")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue"])]),
						r[89] ||= z(),
						n("div", zR, [I(E, {
							modelValue: o.settings.emergency_work_requires_approval,
							"onUpdate:modelValue": [r[26] ||= (e) => o.settings.emergency_work_requires_approval = e, r[27] ||= (e) => s.saveSettingBool("emergency_work_requires_approval")],
							disabled: o.settings.emergency_work_enabled !== !0
						}, {
							default: A(() => [z(U(e.t("worktime", "Notarbeit muss freigegeben werden")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn aktiv, zählt eine erfasste Notarbeit erst nach Freigabe durch den/die Vorgesetzte(n) in die Überstunden. Nur relevant, wenn Notarbeit im Urlaub erlaubt ist.")), 1)]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue", "disabled"])])
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-absenzen"]]) : K("", !0),
				r[223] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 8,
					id: "sec-pausen",
					name: e.t("worktime", "Pausenregelung"),
					description: e.t("worktime", "Mindestpause gemäß deutschem Arbeitszeitgesetz")
				}, {
					default: A(() => [n("div", BR, [
						n("div", VR, [
							n("label", HR, [z(U(e.t("worktime", "Bei >6h Arbeitszeit (min)")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Gesetzliche Mindestpause bei mehr als 6 Stunden Arbeitszeit. Wird beim Anlegen eines Zeiteintrags automatisch als Vorschlag eingetragen.")), 1)]),
								_: 1
							})]),
							r[90] ||= z(),
							N(n("input", {
								id: "break6h",
								"onUpdate:modelValue": r[28] ||= (e) => o.settings.min_break_minutes_6h = e,
								type: "number",
								min: "0",
								max: "120",
								class: "input-field input-small",
								onChange: r[29] ||= (e) => s.saveSetting("min_break_minutes_6h")
							}, null, 544), [[
								y,
								o.settings.min_break_minutes_6h,
								void 0,
								{ number: !0 }
							]])
						]),
						r[93] ||= z(),
						n("div", UR, [
							n("label", WR, [z(U(e.t("worktime", "Bei >9h Arbeitszeit (min)")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Gesetzliche Mindestpause bei mehr als 9 Stunden Arbeitszeit. Wird beim Anlegen eines Zeiteintrags automatisch als Vorschlag eingetragen.")), 1)]),
								_: 1
							})]),
							r[91] ||= z(),
							N(n("input", {
								id: "break9h",
								"onUpdate:modelValue": r[30] ||= (e) => o.settings.min_break_minutes_9h = e,
								type: "number",
								min: "0",
								max: "120",
								class: "input-field input-small",
								onChange: r[31] ||= (e) => s.saveSetting("min_break_minutes_9h")
							}, null, 544), [[
								y,
								o.settings.min_break_minutes_9h,
								void 0,
								{ number: !0 }
							]])
						]),
						r[94] ||= z(),
						n("div", GR, [
							n("label", KR, [z(U(e.t("worktime", "Max. Pausendauer (min)")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Läuft eine laufende Pause (Stempeluhr) länger als dieser Wert, erhält der Mitarbeiter eine Erinnerung („Bist du noch in der Pause?“).")), 1)]),
								_: 1
							})]),
							r[92] ||= z(),
							N(n("input", {
								id: "maxPause",
								"onUpdate:modelValue": r[32] ||= (e) => o.settings.max_pause_minutes = e,
								type: "number",
								min: "0",
								max: "480",
								class: "input-field input-small",
								onChange: r[33] ||= (e) => s.saveSetting("max_pause_minutes")
							}, null, 544), [[
								y,
								o.settings.max_pause_minutes,
								void 0,
								{ number: !0 }
							]])
						])
					])]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-pausen"]]) : K("", !0),
				r[224] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 9,
					id: "sec-pdf",
					name: e.t("worktime", "PDF-Archiv"),
					description: e.t("worktime", "Genehmigte Monatsberichte werden automatisch als PDF archiviert.")
				}, {
					default: A(() => [
						n("div", qR, [
							n("label", null, [z(U(e.t("worktime", "Archiv-Ordner")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Wenn ein Monat genehmigt wird, speichert WorkTime automatisch einen PDF-Bericht in diesem Ordner. Der Ordner liegt in deinem persönlichen Speicher — nur du als Admin hast Zugriff. Die automatische Archivierung greift nur bei aktivierter Genehmigung; ist sie deaktiviert, nutze den PDF-Export in der Monatsübersicht.")), 1)]),
								_: 1
							})]),
							r[96] ||= z(),
							n("div", JR, [
								I(f, {
									variant: "secondary",
									onClick: s.openFolderPicker
								}, {
									icon: A(() => [I(O, { size: 20 })]),
									default: A(() => [z(" " + U(e.t("worktime", "Ordner auswählen")), 1)]),
									_: 1
								}, 8, ["onClick"]),
								r[95] ||= z(),
								n("span", YR, U(o.settings.pdf_archive_path || e.t("worktime", "Nicht konfiguriert")), 1)
							]),
							r[97] ||= z(),
							n("p", XR, U(e.t("worktime", "PDFs werden in deinem persönlichen Ordner gespeichert. Nur du hast Zugriff.")), 1),
							r[98] ||= z(),
							n("p", ZR, U(e.t("worktime", "Struktur: {path}/{Jahr}/{Nachname_Vorname}/Arbeitszeitnachweis_YYYY-MM.pdf", { path: o.settings.pdf_archive_path || "..." })), 1)
						]),
						r[110] ||= z(),
						o.settings.pdf_archive_path ? (J(), H("div", QR, [
							n("label", null, [z(U(e.t("worktime", "Archivierungs-Status")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Die PDF-Archivierung läuft über einen Hintergrund-Job (ca. alle 5 Minuten). Hier siehst du ausstehende und fehlgeschlagene Archivierungen.")), 1)]),
								_: 1
							})]),
							r[109] ||= z(),
							o.archiveLoading ? (J(), L(c, {
								key: 0,
								size: 20
							})) : (J(), H(F, { key: 1 }, [
								n("p", $R, U(e.t("worktime", "{pending} ausstehend · {failed} fehlgeschlagen", {
									pending: o.archiveStatus.pending,
									failed: o.archiveStatus.failed
								})), 1),
								r[106] ||= z(),
								s.archiveFailedJobs.length ? (J(), H("div", ez, [(J(!0), H(F, null, u(s.archiveFailedJobs, (i) => (J(), H("div", {
									key: i.id,
									class: "archive-failed-row"
								}, [
									n("div", tz, [
										n("strong", null, U(i.employeeName), 1),
										r[99] ||= z(),
										n("span", nz, U(s.archiveMonthLabel(i.month)) + " " + U(i.year), 1),
										r[100] ||= z(),
										i.lastError ? (J(), H("span", rz, U(i.lastError), 1)) : K("", !0)
									]),
									r[101] ||= z(),
									I(f, {
										variant: "secondary",
										disabled: o.archiveRetryingId === i.id,
										onClick: (e) => s.retryArchiveJob(i)
									}, {
										default: A(() => [z(U(e.t("worktime", "Erneut versuchen")), 1)]),
										_: 1
									}, 8, ["disabled", "onClick"])
								]))), 128))])) : K("", !0),
								r[107] ||= z(),
								s.archiveDoneJobs.length ? (J(), H("div", iz, [
									n("p", az, U(e.t("worktime", "Zuletzt archiviert")), 1),
									r[105] ||= z(),
									(J(!0), H(F, null, u(s.archiveDoneJobs, (e) => (J(), H("div", {
										key: e.id,
										class: "archive-done-row"
									}, [
										r[102] ||= n("span", { class: "archive-done-check" }, "✓", -1),
										r[103] ||= z(),
										n("span", oz, U(e.employeeName) + " · " + U(s.archiveMonthLabel(e.month)) + " " + U(e.year), 1),
										r[104] ||= z(),
										n("span", sz, U(s.archiveDate(e.processedAt)), 1)
									]))), 128))
								])) : K("", !0),
								r[108] ||= z(),
								I(f, {
									variant: "tertiary",
									onClick: s.loadArchiveStatus
								}, {
									default: A(() => [z(U(e.t("worktime", "Aktualisieren")), 1)]),
									_: 1
								}, 8, ["onClick"])
							], 64))
						])) : K("", !0)
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-pdf"]]) : K("", !0),
				r[225] ||= z(),
				e.canManageEmployees ? N((J(), L(g, {
					key: 10,
					id: "sec-betriebsferien",
					name: e.t("worktime", "Betriebsferien"),
					description: e.t("worktime", "Trage Betriebsferien zentral für alle oder ausgewählte Mitarbeiter als Urlaub ein.")
				}, {
					default: A(() => [I(ee, { employees: e.employees }, null, 8, ["employees"])]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-betriebsferien"]]) : K("", !0),
				r[226] ||= z(),
				e.canManageSettings ? N((J(), L(g, {
					key: 11,
					id: "sec-sondertage",
					name: e.t("worktime", "Sondertage"),
					description: e.t("worktime", "Lege fest, wie Heiligabend und Silvester behandelt werden.")
				}, {
					default: A(() => [
						n("div", cz, [
							n("label", lz, [z(U(e.t("worktime", "Heiligabend (24.12.)")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Halber freier Tag halbiert das Tagessoll, ganzer freier Tag setzt es auf null. Beispiel: Bei 8 Std./Tag werden 4 Std. bzw. 0 Std. als Soll angerechnet.")), 1)]),
								_: 1
							})]),
							r[113] ||= z(),
							n("div", uz, [
								I(E, {
									modelValue: o.settings.christmas_eve_half_day,
									"onUpdate:modelValue": [r[34] ||= (e) => o.settings.christmas_eve_half_day = e, r[35] ||= (e) => s.saveSetting("christmas_eve_half_day")],
									value: "none",
									name: "christmas-eve-mode",
									type: "radio"
								}, {
									default: A(() => [z(U(e.t("worktime", "Normaler Arbeitstag")), 1)]),
									_: 1
								}, 8, ["modelValue"]),
								r[111] ||= z(),
								I(E, {
									modelValue: o.settings.christmas_eve_half_day,
									"onUpdate:modelValue": [r[36] ||= (e) => o.settings.christmas_eve_half_day = e, r[37] ||= (e) => s.saveSetting("christmas_eve_half_day")],
									value: "half",
									name: "christmas-eve-mode",
									type: "radio"
								}, {
									default: A(() => [z(U(e.t("worktime", "Halber freier Tag")), 1)]),
									_: 1
								}, 8, ["modelValue"]),
								r[112] ||= z(),
								I(E, {
									modelValue: o.settings.christmas_eve_half_day,
									"onUpdate:modelValue": [r[38] ||= (e) => o.settings.christmas_eve_half_day = e, r[39] ||= (e) => s.saveSetting("christmas_eve_half_day")],
									value: "full",
									name: "christmas-eve-mode",
									type: "radio"
								}, {
									default: A(() => [z(U(e.t("worktime", "Ganzer freier Tag")), 1)]),
									_: 1
								}, 8, ["modelValue"])
							])
						]),
						r[117] ||= z(),
						n("div", dz, [
							n("label", fz, [z(U(e.t("worktime", "Silvester (31.12.)")) + " ", 1), I(S, null, {
								default: A(() => [z(U(e.t("worktime", "Halber freier Tag halbiert das Tagessoll, ganzer freier Tag setzt es auf null. Beispiel: Bei 8 Std./Tag werden 4 Std. bzw. 0 Std. als Soll angerechnet.")), 1)]),
								_: 1
							})]),
							r[116] ||= z(),
							n("div", pz, [
								I(E, {
									modelValue: o.settings.new_years_eve_half_day,
									"onUpdate:modelValue": [r[40] ||= (e) => o.settings.new_years_eve_half_day = e, r[41] ||= (e) => s.saveSetting("new_years_eve_half_day")],
									value: "none",
									name: "new-years-eve-mode",
									type: "radio"
								}, {
									default: A(() => [z(U(e.t("worktime", "Normaler Arbeitstag")), 1)]),
									_: 1
								}, 8, ["modelValue"]),
								r[114] ||= z(),
								I(E, {
									modelValue: o.settings.new_years_eve_half_day,
									"onUpdate:modelValue": [r[42] ||= (e) => o.settings.new_years_eve_half_day = e, r[43] ||= (e) => s.saveSetting("new_years_eve_half_day")],
									value: "half",
									name: "new-years-eve-mode",
									type: "radio"
								}, {
									default: A(() => [z(U(e.t("worktime", "Halber freier Tag")), 1)]),
									_: 1
								}, 8, ["modelValue"]),
								r[115] ||= z(),
								I(E, {
									modelValue: o.settings.new_years_eve_half_day,
									"onUpdate:modelValue": [r[44] ||= (e) => o.settings.new_years_eve_half_day = e, r[45] ||= (e) => s.saveSetting("new_years_eve_half_day")],
									value: "full",
									name: "new-years-eve-mode",
									type: "radio"
								}, {
									default: A(() => [z(U(e.t("worktime", "Ganzer freier Tag")), 1)]),
									_: 1
								}, 8, ["modelValue"])
							])
						]),
						r[118] ||= z(),
						n("p", mz, U(e.t("worktime", "Hinweis: Änderungen wirken sich auf neu generierte Feiertage aus. Generiere die Feiertage erneut, um die Änderungen anzuwenden.")), 1)
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-sondertage"]]) : K("", !0),
				r[227] ||= z(),
				e.canManageHolidays ? N((J(), L(g, {
					key: 12,
					id: "sec-feiertage",
					name: e.t("worktime", "Feiertage"),
					description: e.t("worktime", "Feiertage anzeigen, hinzufügen, bearbeiten und löschen.")
				}, {
					default: A(() => [
						n("div", hz, [
							n("div", gz, [
								n("label", _z, U(e.t("worktime", "Jahr")), 1),
								r[119] ||= z(),
								N(n("input", {
									id: "holidayYear",
									"onUpdate:modelValue": r[46] ||= (e) => o.holidayYear = e,
									type: "number",
									min: 2020,
									max: 2050,
									class: "input-field input-small",
									onChange: r[47] ||= (...e) => s.loadHolidays && s.loadHolidays(...e)
								}, null, 544), [[
									y,
									o.holidayYear,
									void 0,
									{ number: !0 }
								]])
							]),
							r[121] ||= z(),
							n("div", vz, [
								n("label", yz, U(e.t("worktime", "Bundesland")), 1),
								r[120] ||= z(),
								I(T, {
									"label-outside": "",
									id: "holidayStateFilter",
									modelValue: o.selectedHolidayStateFilter,
									"onUpdate:modelValue": [r[48] ||= (e) => o.selectedHolidayStateFilter = e, s.filterHolidays],
									options: s.holidayStateFilterOptions
								}, null, 8, [
									"modelValue",
									"options",
									"onUpdate:modelValue"
								])
							]),
							r[122] ||= z(),
							I(f, {
								variant: "secondary",
								onClick: s.generateHolidays
							}, {
								default: A(() => [z(U(e.t("worktime", "Auto-Generieren")), 1)]),
								_: 1
							}, 8, ["onClick"]),
							r[123] ||= z(),
							I(f, {
								variant: "primary",
								onClick: r[49] ||= (e) => s.openHolidayForm(null)
							}, {
								icon: A(() => [I(d, { size: 20 })]),
								default: A(() => [z(" " + U(e.t("worktime", "Feiertag hinzufügen")), 1)]),
								_: 1
							})
						]),
						r[153] ||= z(),
						o.loadingHolidays ? (J(), L(c, {
							key: 0,
							size: 32
						})) : s.groupedHolidays.length > 0 ? (J(), H("div", bz, [n("table", xz, [
							n("thead", null, [n("tr", null, [
								r[124] ||= n("th", { class: "col-expand" }, null, -1),
								r[125] ||= z(),
								n("th", null, U(e.t("worktime", "Datum")), 1),
								r[126] ||= z(),
								n("th", null, U(e.t("worktime", "Name")), 1),
								r[127] ||= z(),
								n("th", null, U(e.t("worktime", "Bundesländer")), 1),
								r[128] ||= z(),
								n("th", null, U(e.t("worktime", "Umfang")), 1),
								r[129] ||= z(),
								n("th", null, U(e.t("worktime", "Typ")), 1),
								r[130] ||= z(),
								n("th", null, U(e.t("worktime", "Aktionen")), 1)
							])]),
							r[139] ||= z(),
							n("tbody", null, [(J(!0), H(F, null, u(s.groupedHolidays, (i) => (J(), H(F, { key: i.key }, [
								n("tr", {
									class: "holiday-row",
									onClick: (e) => s.toggleGroupExpand(i.key)
								}, [
									n("td", Cz, [o.expandedGroups.includes(i.key) ? (J(), L(ne, {
										key: 1,
										size: 20
									})) : (J(), L(te, {
										key: 0,
										size: 20
									}))]),
									r[132] ||= z(),
									n("td", null, U(s.formatDate(i.date)), 1),
									r[133] ||= z(),
									n("td", null, U(i.name), 1),
									r[134] ||= z(),
									n("td", null, [n("span", wz, U(i.states.length) + " " + U(e.t("worktime", "Bundesländer")), 1)]),
									r[135] ||= z(),
									n("td", null, U(i.scope < 1 ? e.t("worktime", "½ Tag") : e.t("worktime", "1 Tag")), 1),
									r[136] ||= z(),
									n("td", null, [n("span", { class: G(["holiday-type", i.isManual ? "manual" : "auto"]) }, U(i.isManual ? e.t("worktime", "Manuell") : e.t("worktime", "Auto")), 3)]),
									r[137] ||= z(),
									n("td", {
										class: "actions",
										onClick: r[50] ||= D(() => {}, ["stop"])
									}, [
										I(f, {
											variant: "tertiary",
											"aria-label": e.t("worktime", "Bearbeiten"),
											onClick: (e) => s.openHolidayGroupForm(i)
										}, {
											icon: A(() => [I(re, { size: 20 })]),
											_: 1
										}, 8, ["aria-label", "onClick"]),
										r[131] ||= z(),
										I(f, {
											variant: "tertiary",
											"aria-label": e.t("worktime", "Löschen"),
											onClick: (e) => s.confirmDeleteHolidayGroup(i)
										}, {
											icon: A(() => [I(ie, { size: 20 })]),
											_: 1
										}, 8, ["aria-label", "onClick"])
									])
								], 8, Sz),
								r[138] ||= z(),
								o.expandedGroups.includes(i.key) ? (J(), H("tr", {
									key: i.key + "-details",
									class: "holiday-details-row"
								}, [n("td", Tz, [n("div", Ez, [(J(!0), H(F, null, u(i.states, (n) => (J(), H("span", {
									key: n,
									class: "state-chip"
								}, U(e.federalStates[n] || n), 1))), 128))])])])) : K("", !0)
							], 64))), 128))])
						])])) : (J(), L(oe, {
							key: 2,
							name: e.t("worktime", "Keine Feiertage"),
							description: e.t("worktime", "Keine Feiertage für diese Auswahl gefunden.")
						}, {
							icon: A(() => [I(ae, { size: 64 })]),
							_: 1
						}, 8, ["name", "description"])),
						r[154] ||= z(),
						o.showHolidayForm ? (J(), L(h, {
							key: 3,
							"label-id": "wt-holiday-form-title",
							onClose: s.closeHolidayForm
						}, {
							default: A(() => [n("div", Dz, [
								n("h3", Oz, U(o.editingHoliday ? e.t("worktime", "Feiertag bearbeiten") : e.t("worktime", "Neuer Feiertag")), 1),
								r[148] ||= z(),
								n("div", kz, [
									n("label", Az, U(e.t("worktime", "Datum")), 1),
									r[140] ||= z(),
									I(se, {
										id: "holidayDate",
										modelValue: o.holidayFormData.date,
										"onUpdate:modelValue": r[51] ||= (e) => o.holidayFormData.date = e,
										clearable: "",
										type: "date",
										format: "dd.MM.yyyy"
									}, null, 8, ["modelValue"])
								]),
								r[149] ||= z(),
								n("div", jz, [
									n("label", Mz, U(e.t("worktime", "Name")), 1),
									r[141] ||= z(),
									N(n("input", {
										id: "holidayName",
										"onUpdate:modelValue": r[52] ||= (e) => o.holidayFormData.name = e,
										type: "text",
										class: "input-field",
										placeholder: e.t("worktime", "z.B. Brückentag")
									}, null, 8, Nz), [[y, o.holidayFormData.name]])
								]),
								r[150] ||= z(),
								o.editingHoliday ? (J(), H("div", Lz, [
									n("label", null, U(e.t("worktime", "Bundesländer")), 1),
									r[145] ||= z(),
									n("div", Rz, [(J(!0), H(F, null, u(o.holidayFormData.federalStates, (n) => (J(), H("span", {
										key: n,
										class: "state-chip"
									}, U(e.federalStates[n] || n), 1))), 128))])
								])) : (J(), H("div", Pz, [
									n("label", null, U(e.t("worktime", "Bundesländer")), 1),
									r[143] ||= z(),
									n("div", Fz, [
										I(f, {
											variant: "tertiary",
											onClick: s.selectAllStates
										}, {
											default: A(() => [z(U(e.t("worktime", "Alle auswählen")), 1)]),
											_: 1
										}, 8, ["onClick"]),
										r[142] ||= z(),
										I(f, {
											variant: "tertiary",
											onClick: s.deselectAllStates
										}, {
											default: A(() => [z(U(e.t("worktime", "Alle abwählen")), 1)]),
											_: 1
										}, 8, ["onClick"])
									]),
									r[144] ||= z(),
									n("div", Iz, [(J(!0), H(F, null, u(e.federalStates, (e, n) => (J(), L(E, {
										key: n,
										"model-value": o.holidayFormData.federalStates.includes(n),
										"onUpdate:modelValue": (e) => s.toggleState(n, e)
									}, {
										default: A(() => [z(U(e), 1)]),
										_: 2
									}, 1032, ["model-value", "onUpdate:modelValue"]))), 128))])
								])),
								r[151] ||= z(),
								n("div", zz, [
									n("label", null, U(e.t("worktime", "Umfang")), 1),
									r[146] ||= z(),
									I(T, {
										"label-outside": "",
										modelValue: s.selectedHolidayScope,
										"onUpdate:modelValue": r[53] ||= (e) => s.selectedHolidayScope = e,
										options: o.scopeOptions,
										clearable: !1
									}, null, 8, ["modelValue", "options"])
								]),
								r[152] ||= z(),
								n("div", Bz, [
									I(f, {
										variant: "tertiary",
										onClick: s.closeHolidayForm
									}, {
										default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
										_: 1
									}, 8, ["onClick"]),
									r[147] ||= z(),
									I(f, {
										variant: "primary",
										disabled: !s.isHolidayFormValid,
										onClick: s.saveHoliday
									}, {
										default: A(() => [z(U(o.editingHoliday ? e.t("worktime", "Speichern") : e.t("worktime", "Erstellen")), 1)]),
										_: 1
									}, 8, ["disabled", "onClick"])
								])
							])]),
							_: 1
						}, 8, ["onClose"])) : K("", !0)
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-feiertage"]]) : K("", !0),
				r[228] ||= z(),
				e.canManageEmployees ? N((J(), L(g, {
					key: 13,
					id: "sec-jahresuebertrag",
					name: e.t("worktime", "Jahresübertrag"),
					description: e.t("worktime", "Überstunden und Resturlaub aus dem Vorjahr händisch übertragen. Durchgeführte Überträge sind verbindlich und unveränderbar.")
				}, {
					default: A(() => [
						n("div", Vz, [
							n("div", Hz, [N(n("select", {
								"onUpdate:modelValue": r[54] ||= (e) => o.carryoverYear = e,
								class: "input-field",
								onChange: r[55] ||= (...e) => s.loadCarryovers && s.loadCarryovers(...e)
							}, [(J(!0), H(F, null, u(s.carryoverYearOptions, (e) => (J(), H("option", {
								key: e,
								value: e
							}, U(e - 1) + " → " + U(e), 9, Uz))), 128))], 544), [[
								we,
								o.carryoverYear,
								void 0,
								{ number: !0 }
							]])]),
							r[155] ||= z(),
							o.carryoverSourceYearStatus ? (J(), H("div", Wz, [o.carryoverSourceYearStatus === "closed" ? (J(), H("span", Gz, "\n                            ✓ " + U(e.t("worktime", "Alle Monate {year} genehmigt", { year: o.carryoverYear - 1 })), 1)) : o.carryoverSourceYearStatus === "open" ? (J(), H("span", Kz, "\n                            ⚠ " + U(e.t("worktime", "{year}: Noch offene Monate", { year: o.carryoverYear - 1 })), 1)) : K("", !0)])) : K("", !0)
						]),
						r[183] ||= z(),
						o.carryoverEmployees.length > 0 ? (J(), H("div", qz, [n("table", Jz, [
							n("thead", null, [n("tr", null, [
								n("th", null, U(e.t("worktime", "Mitarbeiter")), 1),
								r[160] ||= z(),
								n("th", null, [
									z(U(e.t("worktime", "Überstunden")), 1),
									r[156] ||= n("br", null, null, -1),
									z(U(e.t("worktime", "Ist")), 1)
								]),
								r[161] ||= z(),
								n("th", null, [
									z(U(e.t("worktime", "Überstunden")), 1),
									r[157] ||= n("br", null, null, -1),
									z(U(e.t("worktime", "Übertrag")), 1)
								]),
								r[162] ||= z(),
								n("th", null, [
									z(U(e.t("worktime", "Resturlaub")), 1),
									r[158] ||= n("br", null, null, -1),
									z(U(e.t("worktime", "Ist")), 1)
								]),
								r[163] ||= z(),
								n("th", null, [
									z(U(e.t("worktime", "Resturlaub")), 1),
									r[159] ||= n("br", null, null, -1),
									z(U(e.t("worktime", "Übertrag")), 1)
								]),
								r[164] ||= z(),
								n("th", null, U(e.t("worktime", "Bemerkung")), 1),
								r[165] ||= z(),
								r[166] ||= n("th", null, null, -1)
							])]),
							r[173] ||= z(),
							n("tbody", null, [(J(!0), H(F, null, u(o.carryoverEmployees, (i) => (J(), H("tr", {
								key: i.employeeId,
								class: G({ "carryover-row--locked": i.isLocked })
							}, [
								n("td", null, U(i.fullName), 1),
								r[167] ||= z(),
								n("td", Yz, [i.wasActive ? (J(), H("span", {
									key: 0,
									class: G(i.actualOvertimeHours >= 0 ? "value-positive" : "value-negative")
								}, U(s.formatHours(i.actualOvertimeHours)), 3)) : (J(), H("span", Xz, "–"))]),
								r[168] ||= z(),
								n("td", Zz, [i.isLocked ? (J(), H("span", $z, U(s.formatHours(i.overtimeHours)), 1)) : N((J(), H("input", {
									key: 0,
									"onUpdate:modelValue": (e) => i.overtimeHours = e,
									type: "number",
									step: "0.5",
									class: "input-field input-small carryover-input",
									onChange: (e) => s.autoSaveCarryover(i)
								}, null, 40, Qz)), [[
									y,
									i.overtimeHours,
									void 0,
									{ number: !0 }
								]])]),
								r[169] ||= z(),
								n("td", eB, [i.wasActive ? (J(), H("span", tB, U(i.actualVacationRemaining), 1)) : (J(), H("span", nB, "–"))]),
								r[170] ||= z(),
								n("td", rB, [i.isLocked ? (J(), H("span", aB, U(i.vacationDays), 1)) : N((J(), H("input", {
									key: 0,
									"onUpdate:modelValue": (e) => i.vacationDays = e,
									type: "number",
									step: "0.5",
									min: "0",
									class: "input-field input-small carryover-input",
									onChange: (e) => s.autoSaveCarryover(i)
								}, null, 40, iB)), [[
									y,
									i.vacationDays,
									void 0,
									{ number: !0 }
								]])]),
								r[171] ||= z(),
								n("td", oB, [i.isLocked ? (J(), H("span", cB, U(i.note || "–"), 1)) : N((J(), H("textarea", {
									key: 0,
									"onUpdate:modelValue": (e) => i.note = e,
									class: "input-field carryover-note",
									rows: "1",
									onInput: r[56] ||= (e) => s.resizeTextarea(e),
									onChange: (e) => s.autoSaveCarryover(i)
								}, null, 40, sB)), [[y, i.note]])]),
								r[172] ||= z(),
								n("td", lB, [i.hasValues && !i.isLocked ? (J(), L(f, {
									key: 0,
									variant: "primary",
									"aria-label": e.t("worktime", "Übertrag durchführen"),
									onClick: (e) => s.lockCarryover(i)
								}, {
									default: A(() => [z(U(e.t("worktime", "Übertrag durchführen")), 1)]),
									_: 1
								}, 8, ["aria-label", "onClick"])) : i.isLocked ? (J(), H("span", uB, [z("\n                                    🔒 " + U(e.t("worktime", "Durchgeführt")) + " ", 1), I(f, {
									variant: "tertiary",
									"aria-label": e.t("worktime", "Korrektur"),
									onClick: (e) => s.openCancelModal(i)
								}, {
									default: A(() => [z(U(e.t("worktime", "Korrektur")), 1)]),
									_: 1
								}, 8, ["aria-label", "onClick"])])) : K("", !0)])
							], 2))), 128))])
						])])) : K("", !0),
						r[184] ||= z(),
						o.showCancelModal ? (J(), L(h, {
							key: 1,
							"label-id": "wt-carryover-cancel-title",
							onClose: s.closeCancelModal
						}, {
							default: A(() => [n("div", dB, [
								n("h3", fB, U(e.t("worktime", "Übertrag korrigieren für {name}", { name: o.cancellingEmployee?.fullName })), 1),
								r[178] ||= z(),
								n("p", pB, U(e.t("worktime", "Der bestehende Übertrag wird storniert und durch die neuen Werte ersetzt. Beide Einträge bleiben im Audit-Log erhalten.")), 1),
								r[179] ||= z(),
								n("div", mB, [
									n("label", null, U(e.t("worktime", "Neue Überstunden (Std.)")), 1),
									r[174] ||= z(),
									N(n("input", {
										"onUpdate:modelValue": r[57] ||= (e) => o.cancelForm.overtimeHours = e,
										type: "number",
										step: "0.5",
										class: "input-field input-small"
									}, null, 512), [[
										y,
										o.cancelForm.overtimeHours,
										void 0,
										{ number: !0 }
									]])
								]),
								r[180] ||= z(),
								n("div", hB, [
									n("label", null, U(e.t("worktime", "Neuer Resturlaub (Tage)")), 1),
									r[175] ||= z(),
									N(n("input", {
										"onUpdate:modelValue": r[58] ||= (e) => o.cancelForm.vacationDays = e,
										type: "number",
										step: "0.5",
										min: "0",
										class: "input-field input-small"
									}, null, 512), [[
										y,
										o.cancelForm.vacationDays,
										void 0,
										{ number: !0 }
									]])
								]),
								r[181] ||= z(),
								n("div", gB, [
									n("label", null, U(e.t("worktime", "Begründung (Pflicht)")), 1),
									r[176] ||= z(),
									N(n("input", {
										"onUpdate:modelValue": r[59] ||= (e) => o.cancelForm.reason = e,
										type: "text",
										placeholder: e.t("worktime", "Grund für die Korrektur"),
										class: "input-field",
										required: ""
									}, null, 8, _B), [[y, o.cancelForm.reason]])
								]),
								r[182] ||= z(),
								n("div", vB, [
									I(f, {
										variant: "tertiary",
										onClick: s.closeCancelModal
									}, {
										default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
										_: 1
									}, 8, ["onClick"]),
									r[177] ||= z(),
									I(f, {
										variant: "primary",
										disabled: !o.cancelForm.reason.trim(),
										onClick: s.submitCancel
									}, {
										default: A(() => [z(U(e.t("worktime", "Stornieren & Ersetzen")), 1)]),
										_: 1
									}, 8, ["disabled", "onClick"])
								])
							])]),
							_: 1
						}, 8, ["onClose"])) : K("", !0)
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-jahresuebertrag"]]) : K("", !0),
				r[229] ||= z(),
				e.canManageEmployees ? N((J(), L(g, {
					key: 14,
					id: "sec-ueberstunden-auszahlung",
					name: e.t("worktime", "Überstunden-Auszahlung"),
					description: e.t("worktime", "Überstunden in Geld vergüten und vom Saldo abziehen. Auszahlungen werden im Audit-Log protokolliert.")
				}, {
					default: A(() => [
						o.payoutEmployees.length > 0 ? (J(), H("div", yB, [n("table", bB, [
							n("thead", null, [n("tr", null, [
								n("th", null, U(e.t("worktime", "Mitarbeiter")), 1),
								r[185] ||= z(),
								n("th", xB, U(e.t("worktime", "Saldo aktuell")), 1),
								r[186] ||= z(),
								n("th", SB, U(e.t("worktime", "Ausgezahlt {year}", { year: o.payoutYear })), 1),
								r[187] ||= z(),
								r[188] ||= n("th", null, null, -1)
							])]),
							r[192] ||= z(),
							n("tbody", null, [(J(!0), H(F, null, u(o.payoutEmployees, (i) => (J(), H("tr", { key: i.employeeId }, [
								n("td", null, U(i.fullName), 1),
								r[189] ||= z(),
								n("td", CB, [n("span", { class: G(i.saldoMinutes >= 0 ? "value-positive" : "value-negative") }, U(s.formatSignedHours(i.saldoMinutes)) + " h", 3)]),
								r[190] ||= z(),
								n("td", wB, [i.paidOutMinutes > 0 ? (J(), H("span", TB, U(s.formatAbsHours(i.paidOutMinutes)) + " h", 1)) : (J(), H("span", EB, "–"))]),
								r[191] ||= z(),
								n("td", DB, [I(f, {
									variant: "secondary",
									disabled: i.saldoMinutes <= 0,
									onClick: (e) => s.openPayoutModal(i)
								}, {
									icon: A(() => [I(ce, { size: 20 })]),
									default: A(() => [z(" " + U(e.t("worktime", "Auszahlen")), 1)]),
									_: 1
								}, 8, ["disabled", "onClick"])])
							]))), 128))])
						])])) : K("", !0),
						r[213] ||= z(),
						n("h3", OB, U(e.t("worktime", "Auszahlungs-Historie {year}", { year: o.payoutYear })), 1),
						r[214] ||= z(),
						o.payoutHistory.length > 0 ? (J(), H("div", kB, [n("table", AB, [
							n("thead", null, [n("tr", null, [
								n("th", null, U(e.t("worktime", "Datum")), 1),
								r[193] ||= z(),
								n("th", null, U(e.t("worktime", "Mitarbeiter")), 1),
								r[194] ||= z(),
								n("th", jB, U(e.t("worktime", "Stunden")), 1),
								r[195] ||= z(),
								n("th", null, U(e.t("worktime", "Notiz")), 1),
								r[196] ||= z(),
								r[197] ||= n("th", null, null, -1)
							])]),
							r[202] ||= z(),
							n("tbody", null, [(J(!0), H(F, null, u(o.payoutHistory, (i) => (J(), H("tr", { key: i.id }, [
								n("td", null, U(s.formatDateDisplay(i.payoutDate)), 1),
								r[198] ||= z(),
								n("td", null, U(i.employeeName), 1),
								r[199] ||= z(),
								n("td", MB, U(s.formatAbsHours(i.minutes)) + " h", 1),
								r[200] ||= z(),
								n("td", NB, U(i.note), 1),
								r[201] ||= z(),
								n("td", PB, [I(f, {
									variant: "tertiary",
									"aria-label": e.t("worktime", "Auszahlung löschen"),
									onClick: (e) => s.deletePayout(i)
								}, {
									icon: A(() => [I(ie, { size: 20 })]),
									_: 1
								}, 8, ["aria-label", "onClick"])])
							]))), 128))])
						])])) : (J(), H("p", FB, U(e.t("worktime", "Noch keine Auszahlungen erfasst.")), 1)),
						r[215] ||= z(),
						o.showPayoutModal ? (J(), L(h, {
							key: 3,
							"label-id": "wt-payout-title",
							onClose: s.closePayoutModal
						}, {
							default: A(() => [n("div", IB, [
								n("h3", LB, U(e.t("worktime", "Überstunden auszahlen für {name}", { name: o.payoutTarget?.fullName })), 1),
								r[207] ||= z(),
								n("p", RB, U(e.t("worktime", "Verfügbarer Saldo: {saldo} h", { saldo: s.formatSignedHours(o.payoutTarget?.saldoMinutes || 0) })), 1),
								r[208] ||= z(),
								n("div", zB, [
									n("label", null, U(e.t("worktime", "Auszuzahlende Stunden")), 1),
									r[203] ||= z(),
									N(n("input", {
										"onUpdate:modelValue": r[60] ||= (e) => o.payoutForm.hours = e,
										type: "text",
										placeholder: e.t("worktime", "z. B. 8:00 oder 8,5"),
										class: "input-field input-small"
									}, null, 8, BB), [[y, o.payoutForm.hours]])
								]),
								r[209] ||= z(),
								n("div", VB, [
									n("label", null, U(e.t("worktime", "Datum")), 1),
									r[204] ||= z(),
									N(n("input", {
										"onUpdate:modelValue": r[61] ||= (e) => o.payoutForm.date = e,
										type: "date",
										class: "input-field input-small"
									}, null, 512), [[y, o.payoutForm.date]])
								]),
								r[210] ||= z(),
								n("div", HB, [
									n("label", null, U(e.t("worktime", "Notiz / Grund (Pflicht)")), 1),
									r[205] ||= z(),
									N(n("input", {
										"onUpdate:modelValue": r[62] ||= (e) => o.payoutForm.note = e,
										type: "text",
										placeholder: e.t("worktime", "mind. 10 Zeichen, landet im Audit-Log"),
										class: "input-field"
									}, null, 8, UB), [[y, o.payoutForm.note]])
								]),
								r[211] ||= z(),
								o.payoutError ? (J(), H("p", WB, U(o.payoutError), 1)) : K("", !0),
								r[212] ||= z(),
								n("div", GB, [
									I(f, {
										variant: "tertiary",
										onClick: s.closePayoutModal
									}, {
										default: A(() => [z(U(e.t("worktime", "Abbrechen")), 1)]),
										_: 1
									}, 8, ["onClick"]),
									r[206] ||= z(),
									I(f, {
										variant: "primary",
										onClick: s.submitPayout
									}, {
										default: A(() => [z(U(e.t("worktime", "Auszahlung erfassen")), 1)]),
										_: 1
									}, 8, ["onClick"])
								])
							])]),
							_: 1
						}, 8, ["onClose"])) : K("", !0)
					]),
					_: 1
				}, 8, ["name", "description"])), [[k, o.activeSection === "sec-ueberstunden-auszahlung"]]) : K("", !0),
				r[230] ||= z(),
				e.canManageEmployees ? N((J(), L(g, {
					key: 15,
					id: "sec-werkplus",
					name: e.t("worktime", "WerkPlus")
				}, {
					default: A(() => [I(le)]),
					_: 1
				}, 8, ["name"])), [[k, o.activeSection === "sec-werkplus"]]) : K("", !0)
			])
		]))
	]);
}
var qB = /*#__PURE__*/ Y(aR, [["render", KB], ["__scopeId", "data-v-f8abf806"]]), JB = { async getFiltered({ action: e = "", entityType: n = "", from: r = "", to: i = "", limit: a = 200, offset: o = 0, userId: s = "" } = {}) {
	try {
		let c = {
			limit: a,
			offset: o
		};
		return e && (c.action = e), n && (c.entityType = n), r && (c.from = r), i && (c.to = i), s && (c.userId = s), (await X.get("/audit-logs", { params: c })).data;
	} catch (e) {
		Z(e);
	}
} }, YB = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/, XB = /* @__PURE__ */ new Set([
	"id",
	"employeeId",
	"createdAt",
	"updatedAt",
	"userId"
]), ZB = {
	name: "AuditDetailModal",
	components: {
		NcModal: Kt,
		NcButton: Ye
	},
	props: {
		entry: {
			type: Object,
			required: !0
		},
		actionLabel: {
			type: String,
			default: ""
		},
		entityLabel: {
			type: String,
			default: ""
		},
		dateLabel: {
			type: String,
			default: ""
		}
	},
	emits: ["close"],
	computed: {
		diffRows() {
			let e = this.entry.oldValues || {}, n = this.entry.newValues || {};
			return [.../* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(n)])].filter((e) => !XB.has(e)).filter((r) => String(e[r] ?? "") !== String(n[r] ?? "")).map((r) => ({
				key: r,
				old: this.display(e[r]),
				new: this.display(n[r])
			}));
		},
		valueRows() {
			let e = this.entry.action === "delete" ? this.entry.oldValues : this.entry.newValues;
			return !e || typeof e != "object" ? [] : Object.entries(e).filter(([e, n]) => !XB.has(e) && n !== null && n !== "").map(([e, n]) => ({
				key: e,
				value: this.display(n)
			}));
		}
	},
	methods: { display(e) {
		if (e == null || e === "") return "—";
		if (typeof e == "object") return JSON.stringify(e, null, 2);
		let n = String(e);
		if (YB.test(n)) {
			let e = new Date(n);
			if (!isNaN(e.getTime())) return e.toLocaleString(Wv(), {
				dateStyle: "short",
				timeStyle: "short"
			});
		}
		return n;
	} }
}, QB = { class: "audit-detail" }, $B = { id: "wt-audit-detail-title" }, eV = { class: "audit-detail__card" }, tV = { class: "audit-detail__meta" }, nV = { class: "meta-row" }, rV = { class: "meta-row" }, iV = { class: "meta-row" }, aV = { class: "meta-row" }, oV = { class: "meta-row" }, sV = { class: "audit-detail__subhead" }, cV = { class: "audit-detail__card" }, lV = {
	key: 0,
	class: "audit-detail__changes"
}, uV = { class: "change-key" }, dV = { class: "change-old" }, fV = { class: "change-new" }, pV = {
	key: 1,
	class: "audit-detail__values"
}, mV = {
	key: 2,
	class: "audit-detail__empty"
}, hV = { class: "audit-detail__actions" };
function gV(e, r, i, a, o, s) {
	let c = P("NcButton"), l = P("NcModal");
	return J(), L(l, {
		"label-id": "wt-audit-detail-title",
		onClose: r[1] ||= (n) => e.$emit("close")
	}, {
		default: A(() => [n("div", QB, [
			n("h3", $B, U(e.t("worktime", "Audit-Eintrag")), 1),
			r[17] ||= z(),
			n("div", eV, [n("dl", tV, [
				n("div", nV, [
					n("dt", null, U(e.t("worktime", "Zeitpunkt")), 1),
					r[2] ||= z(),
					n("dd", null, U(i.dateLabel), 1)
				]),
				r[7] ||= z(),
				n("div", rV, [
					n("dt", null, U(e.t("worktime", "Benutzer")), 1),
					r[3] ||= z(),
					n("dd", null, U(i.entry.userId || "-"), 1)
				]),
				r[8] ||= z(),
				n("div", iV, [
					n("dt", null, U(e.t("worktime", "Aktion")), 1),
					r[4] ||= z(),
					n("dd", null, [n("span", { class: G(["action-badge", "action-" + i.entry.action]) }, U(i.actionLabel), 3)])
				]),
				r[9] ||= z(),
				n("div", aV, [
					n("dt", null, U(e.t("worktime", "Typ")), 1),
					r[5] ||= z(),
					n("dd", null, U(i.entityLabel), 1)
				]),
				r[10] ||= z(),
				n("div", oV, [
					n("dt", null, U(e.t("worktime", "ID")), 1),
					r[6] ||= z(),
					n("dd", null, U(i.entry.entityId || "-"), 1)
				])
			])]),
			r[18] ||= z(),
			n("h4", sV, U(e.t("worktime", "Änderung")), 1),
			r[19] ||= z(),
			n("div", cV, [i.entry.action === "update" && s.diffRows.length ? (J(), H("table", lV, [
				n("thead", null, [n("tr", null, [
					n("th", null, U(e.t("worktime", "Feld")), 1),
					r[11] ||= z(),
					n("th", null, U(e.t("worktime", "Vorher")), 1),
					r[12] ||= z(),
					n("th", null, U(e.t("worktime", "Nachher")), 1)
				])]),
				r[15] ||= z(),
				n("tbody", null, [(J(!0), H(F, null, u(s.diffRows, (e) => (J(), H("tr", { key: e.key }, [
					n("td", uV, U(e.key), 1),
					r[13] ||= z(),
					n("td", dV, U(e.old), 1),
					r[14] ||= z(),
					n("td", fV, U(e.new), 1)
				]))), 128))])
			])) : s.valueRows.length ? (J(), H("dl", pV, [(J(!0), H(F, null, u(s.valueRows, (e) => (J(), H("div", {
				key: e.key,
				class: "value-row"
			}, [
				n("dt", null, U(e.key), 1),
				r[16] ||= z(),
				n("dd", null, U(e.value), 1)
			]))), 128))])) : (J(), H("p", mV, U(e.t("worktime", "Keine Detaildaten vorhanden.")), 1))]),
			r[20] ||= z(),
			n("div", hV, [I(c, {
				variant: "primary",
				onClick: r[0] ||= (n) => e.$emit("close")
			}, {
				default: A(() => [z(U(e.t("worktime", "Schließen")), 1)]),
				_: 1
			})])
		])]),
		_: 1
	});
}
// src/views/AuditView.vue
var _V = {
	name: "AuditView",
	components: {
		NcButton: Ye,
		NcSelect: Xt,
		NcDateTimePicker: z_,
		NcEmptyContent: Gt,
		ShieldIcon: _o,
		AuditDetailModal: /* @__PURE__ */ Y(ZB, [["render", gV], ["__scopeId", "data-v-9fcb722a"]])
	},
	data() {
		return {
			entries: [],
			loading: !1,
			filterEmployee: null,
			filterAction: null,
			filterEntityType: null,
			filterFrom: null,
			filterTo: null,
			selectedEntry: null
		};
	},
	computed: {
		...Tr($o, ["employees"]),
		employeeOptions() {
			return this.employees.map((e) => ({
				id: e.userId,
				label: e.displayName || (e.firstName + " " + e.lastName).trim() || e.userId
			}));
		},
		actionOptions() {
			return [
				{
					id: "create",
					label: this.t("worktime", "Erstellt")
				},
				{
					id: "update",
					label: this.t("worktime", "Bearbeitet")
				},
				{
					id: "delete",
					label: this.t("worktime", "Gelöscht")
				},
				{
					id: "submit",
					label: this.t("worktime", "Eingereicht")
				},
				{
					id: "approve",
					label: this.t("worktime", "Genehmigt")
				},
				{
					id: "reject",
					label: this.t("worktime", "Abgelehnt")
				}
			];
		},
		entityTypeOptions() {
			return [
				{
					id: "time_entry",
					label: this.t("worktime", "Zeiteintrag")
				},
				{
					id: "absence",
					label: this.t("worktime", "Abwesenheit")
				},
				{
					id: "employee",
					label: this.t("worktime", "Mitarbeiter")
				},
				{
					id: "project",
					label: this.t("worktime", "Projekt")
				},
				{
					id: "setting",
					label: this.t("worktime", "Einstellung")
				}
			];
		}
	},
	created() {
		this.fetchEmployees(), this.load();
	},
	methods: {
		...Er($o, ["fetchEmployees"]),
		openDetail(e) {
			this.selectedEntry = e;
		},
		async load() {
			this.loading = !0, this.entries = await JB.getFiltered({
				action: this.filterAction?.id || "",
				entityType: this.filterEntityType?.id || "",
				from: this.filterFrom ? qv(this.filterFrom) : "",
				to: this.filterTo ? qv(this.filterTo) : "",
				userId: this.filterEmployee?.id || ""
			}) || [], this.loading = !1;
		},
		translateAction(e) {
			return {
				create: this.t("worktime", "Erstellt"),
				update: this.t("worktime", "Bearbeitet"),
				delete: this.t("worktime", "Gelöscht"),
				submit: this.t("worktime", "Eingereicht"),
				approve: this.t("worktime", "Genehmigt"),
				reject: this.t("worktime", "Abgelehnt")
			}[e] || e;
		},
		translateEntityType(e) {
			return {
				time_entry: this.t("worktime", "Zeiteintrag"),
				absence: this.t("worktime", "Abwesenheit"),
				employee: this.t("worktime", "Mitarbeiter"),
				project: this.t("worktime", "Projekt"),
				setting: this.t("worktime", "Einstellung")
			}[e] || e;
		},
		formatDateTime(e) {
			return e ? new Date(e).toLocaleString(Wv(), {
				dateStyle: "short",
				timeStyle: "short"
			}) : "-";
		},
		updateDiff(e) {
			let n = /* @__PURE__ */ new Set([
				"id",
				"employeeId",
				"createdAt",
				"updatedAt",
				"userId"
			]), r = e.oldValues || {}, i = e.newValues || {};
			return [.../* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)])].filter((e) => !n.has(e)).filter((e) => String(r[e] ?? "") !== String(i[e] ?? "")).map((e) => ({
				key: e,
				old: r[e] ?? "—",
				new: i[e] ?? "—"
			}));
		},
		formatValues(e) {
			if (!e || typeof e != "object") return "-";
			let n = /* @__PURE__ */ new Set([
				"id",
				"employeeId",
				"createdAt",
				"updatedAt",
				"userId"
			]);
			return Object.entries(e).filter(([e, r]) => !n.has(e) && r !== null && r !== "").map(([e, n]) => `${e}: ${n}`).join(", ") || "-";
		}
	}
}, vV = { class: "audit-view" }, yV = { class: "view-header" }, bV = { class: "view-toolbar" }, xV = { class: "view-header__controls" }, SV = {
	key: 0,
	class: "loading-hint"
}, CV = {
	key: 2,
	class: "audit-card"
}, wV = { class: "audit-table" }, TV = [
	"aria-label",
	"onClick",
	"onKeydown"
], EV = { class: "nowrap" }, DV = { class: "diff-cell" }, OV = { class: "diff-key" }, kV = { class: "diff-old-val" }, AV = { class: "diff-new-val" }, jV = {
	key: 1,
	class: "diff-old"
}, MV = {
	key: 2,
	class: "diff-new"
}, NV = { key: 3 }, PV = {
	key: 3,
	class: "limit-hint"
};
function FV(e, r, i, a, o, s) {
	let c = P("NcSelect"), l = P("NcDateTimePicker"), d = P("NcButton"), f = P("ShieldIcon"), p = P("NcEmptyContent"), m = P("AuditDetailModal");
	return J(), H("div", vV, [
		n("div", yV, [n("h2", null, U(e.t("worktime", "Audit-Log")), 1)]),
		r[26] ||= z(),
		n("div", bV, [n("div", xV, [
			I(c, {
				"label-outside": "",
				"aria-label-combobox": e.t("worktime", "Alle Mitarbeiter"),
				modelValue: o.filterEmployee,
				"onUpdate:modelValue": r[0] ||= (e) => o.filterEmployee = e,
				options: s.employeeOptions,
				placeholder: e.t("worktime", "Alle Mitarbeiter"),
				clearable: !0,
				label: "label"
			}, null, 8, [
				"aria-label-combobox",
				"modelValue",
				"options",
				"placeholder"
			]),
			r[6] ||= z(),
			I(c, {
				"label-outside": "",
				"aria-label-combobox": e.t("worktime", "Alle Aktionen"),
				modelValue: o.filterAction,
				"onUpdate:modelValue": r[1] ||= (e) => o.filterAction = e,
				options: s.actionOptions,
				placeholder: e.t("worktime", "Alle Aktionen"),
				clearable: !0,
				label: "label"
			}, null, 8, [
				"aria-label-combobox",
				"modelValue",
				"options",
				"placeholder"
			]),
			r[7] ||= z(),
			I(c, {
				"label-outside": "",
				"aria-label-combobox": e.t("worktime", "Alle Typen"),
				modelValue: o.filterEntityType,
				"onUpdate:modelValue": r[2] ||= (e) => o.filterEntityType = e,
				options: s.entityTypeOptions,
				placeholder: e.t("worktime", "Alle Typen"),
				clearable: !0,
				label: "label"
			}, null, 8, [
				"aria-label-combobox",
				"modelValue",
				"options",
				"placeholder"
			]),
			r[8] ||= z(),
			I(l, {
				modelValue: o.filterFrom,
				"onUpdate:modelValue": r[3] ||= (e) => o.filterFrom = e,
				clearable: "",
				type: "date",
				format: "dd.MM.yyyy",
				placeholder: e.t("worktime", "Von")
			}, null, 8, ["modelValue", "placeholder"]),
			r[9] ||= z(),
			I(l, {
				modelValue: o.filterTo,
				"onUpdate:modelValue": r[4] ||= (e) => o.filterTo = e,
				clearable: "",
				type: "date",
				format: "dd.MM.yyyy",
				placeholder: e.t("worktime", "Bis")
			}, null, 8, ["modelValue", "placeholder"]),
			r[10] ||= z(),
			I(d, {
				variant: "secondary",
				onClick: s.load
			}, {
				default: A(() => [z(U(e.t("worktime", "Filtern")), 1)]),
				_: 1
			}, 8, ["onClick"])
		])]),
		r[27] ||= z(),
		o.loading ? (J(), H("div", SV, U(e.t("worktime", "Wird geladen…")), 1)) : o.entries.length === 0 ? (J(), L(p, {
			key: 1,
			name: e.t("worktime", "Keine Einträge")
		}, {
			icon: A(() => [I(f)]),
			_: 1
		}, 8, ["name"])) : (J(), H("div", CV, [n("table", wV, [
			n("thead", null, [n("tr", null, [
				n("th", null, U(e.t("worktime", "Zeitpunkt")), 1),
				r[11] ||= z(),
				n("th", null, U(e.t("worktime", "Benutzer")), 1),
				r[12] ||= z(),
				n("th", null, U(e.t("worktime", "Aktion")), 1),
				r[13] ||= z(),
				n("th", null, U(e.t("worktime", "Typ")), 1),
				r[14] ||= z(),
				n("th", null, U(e.t("worktime", "ID")), 1),
				r[15] ||= z(),
				n("th", null, U(e.t("worktime", "Änderung")), 1)
			])]),
			r[25] ||= z(),
			n("tbody", null, [(J(!0), H(F, null, u(o.entries, (i) => (J(), H("tr", {
				key: i.id,
				class: "audit-row",
				role: "button",
				tabindex: "0",
				"aria-label": e.t("worktime", "Details anzeigen"),
				onClick: (e) => s.openDetail(i),
				onKeydown: [vt((e) => s.openDetail(i), ["enter"]), vt(D((e) => s.openDetail(i), ["prevent"]), ["space"])]
			}, [
				n("td", EV, U(s.formatDateTime(i.createdAt)), 1),
				r[20] ||= z(),
				n("td", null, U(i.userId), 1),
				r[21] ||= z(),
				n("td", null, [n("span", { class: G(["action-badge", "action-" + i.action]) }, U(s.translateAction(i.action)), 3)]),
				r[22] ||= z(),
				n("td", null, U(s.translateEntityType(i.entityType)), 1),
				r[23] ||= z(),
				n("td", null, U(i.entityId || "-"), 1),
				r[24] ||= z(),
				n("td", DV, [i.action === "update" ? (J(!0), H(F, { key: 0 }, u(s.updateDiff(i), (e) => (J(), H("div", {
					key: e.key,
					class: "diff-item"
				}, [
					n("span", OV, U(e.key) + ":", 1),
					r[16] ||= z(),
					n("span", kV, U(e.old), 1),
					r[17] ||= z(),
					r[18] ||= n("span", { class: "diff-arrow" }, "→", -1),
					r[19] ||= z(),
					n("span", AV, U(e.new), 1)
				]))), 128)) : i.action === "delete" && i.oldValues ? (J(), H("span", jV, U(s.formatValues(i.oldValues)), 1)) : i.action === "create" && i.newValues ? (J(), H("span", MV, U(s.formatValues(i.newValues)), 1)) : (J(), H("span", NV, "-"))])
			], 40, TV))), 128))])
		])])),
		r[28] ||= z(),
		o.entries.length >= 200 ? (J(), H("p", PV, U(e.t("worktime", "Es werden maximal 200 Einträge angezeigt. Bitte Filter verwenden um die Ergebnisse einzuschränken.")), 1)) : K("", !0),
		r[29] ||= z(),
		o.selectedEntry ? (J(), L(m, {
			key: 4,
			entry: o.selectedEntry,
			"action-label": s.translateAction(o.selectedEntry.action),
			"entity-label": s.translateEntityType(o.selectedEntry.entityType),
			"date-label": s.formatDateTime(o.selectedEntry.createdAt),
			onClose: r[5] ||= (e) => o.selectedEntry = null
		}, null, 8, [
			"entry",
			"action-label",
			"entity-label",
			"date-label"
		])) : K("", !0)
	]);
}
var IV = /*#__PURE__*/ Y(_V, [["render", FV], ["__scopeId", "data-v-331d4957"]]), LV = {
	name: "DownloadIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, RV = ["aria-hidden", "aria-label"], zV = [
	"fill",
	"width",
	"height"
], BV = { key: 0 };
function VV(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon download-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", BV, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" }, null, -1)
	], 8, zV))], 16, RV);
}
var HV = /*#__PURE__*/ Y(LV, [["render", VV]]), UV = {
	name: "AccountMultipleIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, WV = ["aria-hidden", "aria-label"], GV = [
	"fill",
	"width",
	"height"
], KV = { key: 0 };
function qV(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon account-multiple-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", KV, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" }, null, -1)
	], 8, GV))], 16, WV);
}
var JV = /*#__PURE__*/ Y(UV, [["render", qV]]), YV = {
	name: "ViewListOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, XV = ["aria-hidden", "aria-label"], ZV = [
	"fill",
	"width",
	"height"
], QV = { key: 0 };
function $V(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon view-list-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", QV, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M3 5V19H20V5H3M7 7V9H5V7H7M5 13V11H7V13H5M5 15H7V17H5V15M18 17H9V15H18V17M18 13H9V11H18V13M18 9H9V7H18V9Z" }, null, -1)
	], 8, ZV))], 16, XV);
}
var eH = /*#__PURE__*/ Y(YV, [["render", $V]]), tH = {
	name: "CalendarTextOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, nH = ["aria-hidden", "aria-label"], rH = [
	"fill",
	"width",
	"height"
], iH = { key: 0 };
function aH(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-text-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", iH, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M5 7V5H19V7H5M7 11H17V13H7V11M7 15H14V17H7V15Z" }, null, -1)
	], 8, rH))], 16, nH);
}
var oH = /*#__PURE__*/ Y(tH, [["render", aH]]), sH = {
	name: "CalendarMonthOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, cH = ["aria-hidden", "aria-label"], lH = [
	"fill",
	"width",
	"height"
], uH = { key: 0 };
function dH(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-month-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", uH, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z" }, null, -1)
	], 8, lH))], 16, cH);
}
var fH = /*#__PURE__*/ Y(sH, [["render", dH]]), pH = {
	name: "CalendarRangeIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, mH = ["aria-hidden", "aria-label"], hH = [
	"fill",
	"width",
	"height"
], gH = { key: 0 };
function _H(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-range-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", gH, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" }, null, -1)
	], 8, hH))], 16, mH);
}
var vH = /*#__PURE__*/ Y(pH, [["render", _H]]), yH = {
	name: "CalendarOutlineIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, bH = ["aria-hidden", "aria-label"], xH = [
	"fill",
	"width",
	"height"
], SH = { key: 0 };
function CH(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon calendar-outline-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", SH, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12 12H17V17H12V12M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 5V7H5V5H19M5 19V9H19V19H5Z" }, null, -1)
	], 8, xH))], 16, bH);
}
var wH = /*#__PURE__*/ Y(yH, [["render", CH]]), TH = {
	name: "CheckCircleIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, EH = ["aria-hidden", "aria-label"], DH = [
	"fill",
	"width",
	"height"
], OH = { key: 0 };
function kH(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon check-circle-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", OH, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" }, null, -1)
	], 8, DH))], 16, EH);
}
var AH = /*#__PURE__*/ Y(TH, [["render", kH]]), jH = {
	name: "CloseCircleIcon",
	emits: ["click"],
	props: {
		title: { type: String },
		fillColor: {
			type: String,
			default: "currentColor"
		},
		size: {
			type: Number,
			default: 24
		}
	}
}, MH = ["aria-hidden", "aria-label"], NH = [
	"fill",
	"width",
	"height"
], PH = { key: 0 };
function FH(e, r, i, a, o, s) {
	return J(), H("span", B(e.$attrs, {
		"aria-hidden": i.title ? null : "true",
		"aria-label": i.title,
		class: "material-design-icon close-circle-icon",
		role: "img",
		onClick: r[0] ||= (n) => e.$emit("click", n)
	}), [(J(), H("svg", {
		fill: i.fillColor,
		class: "material-design-icon__svg",
		width: i.size,
		height: i.size,
		viewBox: "0 0 24 24"
	}, [
		i.title ? (J(), H("title", PH, U(i.title), 1)) : K("", !0),
		r[1] ||= z(),
		r[2] ||= n("path", { d: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" }, null, -1)
	], 8, NH))], 16, MH);
}
// src/components/TeamYearTable.vue
var IH = {
	name: "TeamYearTable",
	components: {
		NcAvatar: Dn,
		CheckCircleIcon: AH,
		ClockOutlineIcon: ND,
		CloseCircleIcon: /* @__PURE__ */ Y(jH, [["render", FH]])
	},
	props: {
		report: {
			type: Array,
			required: !0
		},
		year: {
			type: Number,
			required: !0
		}
	},
	methods: {
		getMonthNameShort: Yv,
		formatOvertimeShort(e) {
			return e == null ? "--" : (e >= 0 ? "+" : "") + fy(e);
		},
		overtimeClass(e) {
			return e == null ? "" : e > 0 ? "positive" : e < 0 ? "negative" : "";
		}
	}
}, LH = { class: "team-year-table" }, RH = { class: "member-card__header" }, zH = { class: "member-card__name" }, BH = { class: "member-card__hours" }, VH = { class: "month-header" }, HH = { class: "col-label" }, UH = { class: "col-total" }, WH = { class: "row-data" }, GH = { class: "col-label" }, KH = {
	key: 0,
	class: "vacation-days"
}, qH = { class: "col-total" }, JH = { class: "row-data" }, YH = { class: "col-label" }, XH = { key: 0 }, ZH = { class: "row-data" }, QH = { class: "col-label" };
function $H(e, r, i, a, o, s) {
	let c = P("NcAvatar"), l = P("CheckCircleIcon"), d = P("ClockOutlineIcon"), f = P("CloseCircleIcon");
	return J(), H("div", LH, [(J(!0), H(F, null, u(i.report, (i) => (J(), H("div", {
		key: i.employee.id,
		class: "member-card"
	}, [
		n("div", RH, [
			I(c, {
				user: i.employee.userId,
				"display-name": i.employee.fullName,
				size: 44
			}, null, 8, ["user", "display-name"]),
			r[0] ||= z(),
			n("span", zH, U(i.employee.fullName), 1),
			r[1] ||= z(),
			n("span", BH, U(i.employee.weeklyHours) + " " + U(e.t("worktime", "Std./Woche")), 1)
		]),
		r[14] ||= z(),
		n("table", null, [
			n("thead", null, [n("tr", VH, [
				n("th", HH, U(e.t("worktime", "Art")), 1),
				r[2] ||= z(),
				(J(), H(F, null, u(12, (e) => n("th", {
					key: e,
					class: "col-month"
				}, U(s.getMonthNameShort(e)), 1)), 64)),
				r[3] ||= z(),
				n("th", UH, U(e.t("worktime", "Gesamt")), 1)
			])]),
			r[13] ||= z(),
			n("tbody", null, [
				n("tr", WH, [
					n("td", GH, U(e.t("worktime", "Urlaub")), 1),
					r[4] ||= z(),
					(J(!0), H(F, null, u(i.months, (e) => (J(), H("td", {
						key: e.month,
						class: "col-month"
					}, [e.vacationDays > 0 ? (J(), H("span", KH, U(e.vacationDays), 1)) : K("", !0)]))), 128)),
					r[5] ||= z(),
					n("td", qH, [n("strong", null, U(i.vacationStats.used) + "/" + U(i.vacationStats.total), 1)])
				]),
				r[11] ||= z(),
				n("tr", JH, [
					n("td", YH, U(e.t("worktime", "Stunden")), 1),
					r[6] ||= z(),
					(J(!0), H(F, null, u(i.months, (e) => (J(), H("td", {
						key: e.month,
						class: G(["col-month", s.overtimeClass(e.overtimeMinutes)])
					}, [e.overtimeMinutes === null ? K("", !0) : (J(), H("span", XH, U(s.formatOvertimeShort(e.overtimeMinutes)), 1))], 2))), 128)),
					r[7] ||= z(),
					n("td", { class: G(["col-total", s.overtimeClass(i.totalOvertimeMinutes)]) }, [n("strong", null, U(s.formatOvertimeShort(i.totalOvertimeMinutes)), 1)], 2)
				]),
				r[12] ||= z(),
				n("tr", ZH, [
					n("td", QH, U(e.t("worktime", "Status")), 1),
					r[8] ||= z(),
					(J(!0), H(F, null, u(i.months, (n) => (J(), H("td", {
						key: n.month,
						class: "col-month"
					}, [n.status === "approved" ? (J(), L(l, {
						key: 0,
						size: 20,
						class: "status-icon status-approved",
						title: e.t("worktime", "Genehmigt")
					}, null, 8, ["title"])) : n.status === "submitted" ? (J(), L(d, {
						key: 1,
						size: 20,
						class: "status-icon status-submitted",
						title: e.t("worktime", "Eingereicht")
					}, null, 8, ["title"])) : n.status === "rejected" ? (J(), L(f, {
						key: 2,
						size: 20,
						class: "status-icon status-rejected",
						title: e.t("worktime", "Abgelehnt")
					}, null, 8, ["title"])) : K("", !0)]))), 128)),
					r[9] ||= z(),
					r[10] ||= n("td", { class: "col-total" }, null, -1)
				])
			])
		])
	]))), 128))]);
}
// src/views/EvaluationView.vue
var eU = {
	name: "EvaluationView",
	components: {
		NcButton: Ye,
		NcLoadingIcon: g,
		NcEmptyContent: Gt,
		NcAvatar: Dn,
		NcSelect: Xt,
		ChevronLeftIcon: Ay,
		ChevronRightIcon: Iy,
		DownloadIcon: HV,
		MagnifyIcon: Ns,
		AccountGroupIcon: Ba,
		AccountMultipleIcon: JV,
		FolderOutlineIcon: aL,
		ViewListOutlineIcon: eH,
		CalendarTextOutlineIcon: oH,
		ChartBarIcon: Co,
		FormatListBulletedIcon: yv,
		CalendarMonthOutlineIcon: fH,
		CalendarRangeIcon: vH,
		CalendarOutlineIcon: wH,
		YearPicker: Ky,
		TeamYearTable: /* @__PURE__ */ Y(IH, [["render", $H], ["__scopeId", "data-v-d901f6e3"]])
	},
	data() {
		let e = /* @__PURE__ */ new Date();
		return {
			mode: "mitarbeiter",
			teamYear: e.getFullYear(),
			teamReport: [],
			teamLoading: !1,
			teamSubtab: "overview",
			teamSort: {
				key: "name",
				dir: 1
			},
			year: e.getFullYear(),
			month: e.getMonth() + 1,
			period: "month",
			tab: "agg",
			loading: !1,
			entriesLoading: !1,
			rows: [],
			entries: [],
			entriesLoadedKey: null,
			selectedProjects: /* @__PURE__ */ new Set(),
			selectedEmployees: /* @__PURE__ */ new Set(),
			sort: {
				key: "minutes",
				dir: -1
			},
			topN: 8,
			projectSearch: "",
			employeeSearch: "",
			projectsExpanded: !1,
			employeesExpanded: !1,
			teamFilterDepartmentId: null,
			projectFilterDepartmentId: null
		};
	},
	computed: {
		...Tr(qD, ["departments"]),
		...Tr($o, ["employees"]),
		departmentsById() {
			let e = {};
			for (let n of this.departments) e[n.id] = n;
			return e;
		},
		departmentName() {
			return (e) => this.departmentsById[e]?.name || this.t("worktime", "Abteilung");
		},
		employeeDepartmentById() {
			let e = {};
			for (let n of this.employees) e[n.id] = n.departmentId ?? null;
			return e;
		},
		filteredTeamReport() {
			return this.teamFilterDepartmentId === null ? this.teamReport : this.teamReport.filter((e) => pO(e.employee?.departmentId ?? null, this.teamFilterDepartmentId));
		},
		teamDepartmentOptions() {
			return fO(this.teamReport, (e) => e.employee?.departmentId ?? null, (e) => this.departmentName(e), this.t("worktime", "Ohne Abteilung"));
		},
		selectedTeamDepartment: {
			get() {
				return this.teamDepartmentOptions.find((e) => e.id === this.teamFilterDepartmentId) || null;
			},
			set(e) {
				this.teamFilterDepartmentId = e ? e.id : null;
			}
		},
		projectDepartmentOptions() {
			return fO(this.employeeChipsRaw, (e) => this.employeeDepartmentById[e.id] ?? null, (e) => this.departmentName(e), this.t("worktime", "Ohne Abteilung"));
		},
		selectedProjectDepartment: {
			get() {
				return this.projectDepartmentOptions.find((e) => e.id === this.projectFilterDepartmentId) || null;
			},
			set(e) {
				this.projectFilterDepartmentId = e ? e.id : null;
			}
		},
		teamKpis() {
			let e = 0, n = 0, r = 0;
			for (let i of this.filteredTeamReport) e += i.totalOvertimeMinutes || 0, n += i.vacationStats?.used || 0, r += i.vacationStats?.total || 0;
			return {
				count: this.filteredTeamReport.length,
				overtimeMinutes: e,
				vacationUsed: n,
				vacationTotal: r
			};
		},
		teamOverviewRows() {
			let e = this.filteredTeamReport.map((e) => {
				let n = e.vacationStats?.used || 0, r = e.vacationStats?.total || 0, i = r - n, a = (e.months || []).filter((e) => e.status === "submitted").length;
				return {
					id: e.employee.id,
					userId: e.employee.userId,
					name: e.employee.fullName,
					weeklyHours: e.employee.weeklyHours,
					overtimeMinutes: e.totalOvertimeMinutes || 0,
					vacationTotal: r,
					vacationRemaining: i,
					vacationPercent: r > 0 ? Math.max(0, Math.min(100, Math.round(i / r * 100))) : 0,
					openMonths: a
				};
			}), { key: n, dir: r } = this.teamSort;
			return e.sort((e, i) => {
				let a;
				return a = n === "overtime" ? e.overtimeMinutes - i.overtimeMinutes : n === "vacation" ? e.vacationRemaining - i.vacationRemaining : e.name.localeCompare(i.name), a * r;
			}), e;
		},
		periods() {
			return [
				{
					value: "month",
					label: this.t("worktime", "Monat"),
					icon: fH
				},
				{
					value: "quarter",
					label: this.t("worktime", "Quartal"),
					icon: vH
				},
				{
					value: "year",
					label: this.t("worktime", "Jahr"),
					icon: wH
				}
			];
		},
		periodLabel() {
			return this.period === "year" ? String(this.year) : this.period === "quarter" ? `Q${Math.floor((this.month - 1) / 3) + 1} ${this.year}` : `${Jv(this.month)} ${this.year}`;
		},
		projectChips() {
			let e = {};
			for (let n of this.rows) e[n.projectId] || (e[n.projectId] = {
				id: n.projectId,
				name: n.projectName || this.t("worktime", "Kein Projekt"),
				customer: n.customer,
				color: n.color
			});
			return Object.values(e).sort((e, n) => e.name.localeCompare(n.name));
		},
		employeeChipsRaw() {
			let e = {};
			for (let n of this.rows) e[n.employeeId] || (e[n.employeeId] = {
				id: n.employeeId,
				name: n.employeeName || this.t("worktime", "Unbekannt")
			});
			return Object.values(e).sort((e, n) => e.name.localeCompare(n.name));
		},
		employeeChips() {
			return this.employeeChipsRaw.filter((e) => pO(this.employeeDepartmentById[e.id] ?? null, this.projectFilterDepartmentId));
		},
		projectMinutes() {
			let e = {};
			for (let n of this.rows) e[n.projectId] = (e[n.projectId] || 0) + n.minutes;
			return e;
		},
		employeeMinutes() {
			let e = {};
			for (let n of this.rows) e[n.employeeId] = (e[n.employeeId] || 0) + n.minutes;
			return e;
		},
		visibleProjects() {
			return this.buildChips(this.projectChips, this.selectedProjects, this.projectSearch, this.projectsExpanded, this.projectMinutes);
		},
		visibleEmployees() {
			return this.buildChips(this.employeeChips, this.selectedEmployees, this.employeeSearch, this.employeesExpanded, this.employeeMinutes);
		},
		filteredRows() {
			return this.rows.filter((e) => (!this.selectedProjects.size || this.selectedProjects.has(e.projectId)) && (!this.selectedEmployees.size || this.selectedEmployees.has(e.employeeId)) && pO(this.employeeDepartmentById[e.employeeId] ?? null, this.projectFilterDepartmentId));
		},
		totals() {
			let e = this.filteredRows, n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = 0;
			for (let a of e) i += a.minutes, a.projectId > 0 && n.add(a.projectId), r.add(a.employeeId);
			return {
				totalMinutes: i,
				projectCount: n.size,
				employeeCount: r.size
			};
		},
		aggRows() {
			let e = {};
			for (let n of this.teamReport) n.employee?.weeklyHours != null && (e[n.employee.id] = n.employee.weeklyHours, n.employee.userId && (e[n.employee.userId] = n.employee.weeklyHours));
			let n = {};
			for (let r of this.filteredRows) n[r.employeeId] || (n[r.employeeId] = {
				id: r.employeeId,
				name: r.employeeName || this.t("worktime", "Unbekannt"),
				minutes: 0,
				weeklyHours: e[r.employeeId] ?? null
			}), n[r.employeeId].minutes += r.minutes;
			let r = Object.values(n);
			return r.sort((e, n) => this.sort.key === "name" ? this.sort.dir * e.name.localeCompare(n.name) : this.sort.dir * (e.minutes - n.minutes)), r;
		},
		detailRows() {
			let e = this.entries.filter((e) => (!this.selectedProjects.size || this.selectedProjects.has(e.projectId)) && (!this.selectedEmployees.size || this.selectedEmployees.has(e.employeeId)) && pO(this.employeeDepartmentById[e.employeeId] ?? null, this.projectFilterDepartmentId)), n = this.sort;
			return e.slice().sort((e, r) => n.key === "name" ? n.dir * (e.employeeName || "").localeCompare(r.employeeName || "") : n.key === "minutes" ? n.dir * (e.minutes - r.minutes) : n.dir * e.date.localeCompare(r.date));
		}
	},
	watch: {
		period() {
			this.refresh();
		},
		tab(e) {
			e === "detail" && this.ensureEntries();
		}
	},
	created() {
		this.loadTeamReport(), this.refresh(), qD().fetchDepartments(), $o().fetchEmployees();
	},
	methods: {
		formatDaysLabel: yy,
		textColorOn: wI,
		chipStyle(e) {
			return this.selectedProjects.has(e.id) ? e.color ? {
				background: e.color,
				borderColor: e.color,
				color: wI(e.color)
			} : {
				background: "var(--color-primary-element)",
				borderColor: "var(--color-primary-element)",
				color: "var(--color-primary-element-text)"
			} : {};
		},
		async loadTeamReport() {
			this.teamLoading = !0;
			try {
				this.teamReport = await bw.getTeamYear(this.teamYear) || [];
			} catch (e) {
				console.error("Failed to load team report:", e), this.teamReport = [];
			} finally {
				this.teamLoading = !1;
			}
		},
		onTeamYearChange(e) {
			this.teamYear = e, this.loadTeamReport();
		},
		hours(e) {
			return `${fy(e || 0)} h`;
		},
		timeRange(e) {
			let n = e.startTime, r = e.endTime;
			return n && r ? `${n}–${r}` : "–";
		},
		weeklyLabel(e) {
			if (e == null || e === "") return "";
			let n = parseFloat(e);
			return Number.isNaN(n) ? "" : String(n);
		},
		signedHours(e) {
			return `${e < 0 ? "−" : "+"}${fy(Math.abs(e || 0))} h`;
		},
		teamSortBy(e) {
			this.teamSort = this.teamSort.key === e ? {
				key: e,
				dir: this.teamSort.dir * -1
			} : {
				key: e,
				dir: 1
			};
		},
		teamSortArrow(e) {
			return this.teamSort.key === e ? this.teamSort.dir === 1 ? " ▲" : " ▼" : "";
		},
		formatDate(e) {
			return Gv(e);
		},
		initials(e) {
			return e.split(" ").filter(Boolean).map((e) => e[0]).slice(0, 2).join("").toUpperCase();
		},
		buildChips(e, n, r, i, a) {
			let o = e.filter((e) => n.has(e.id)), s = r.trim().toLowerCase(), c = e.filter((e) => !n.has(e.id));
			s && (c = c.filter((e) => e.name.toLowerCase().includes(s) || (e.customer || "").toLowerCase().includes(s))), c.sort((e, n) => (a[n.id] || 0) - (a[e.id] || 0));
			let l = i || s ? c : c.slice(0, this.topN);
			return {
				list: [...o, ...l],
				hidden: c.length - l.length
			};
		},
		pct(e) {
			let n = this.totals.totalMinutes || 1;
			return Math.round(e / n * 100);
		},
		sortArrow(e) {
			return this.sort.key === e ? this.sort.dir < 0 ? " ▼" : " ▲" : "";
		},
		sortBy(e) {
			this.sort = this.sort.key === e ? {
				key: e,
				dir: -this.sort.dir
			} : {
				key: e,
				dir: e === "name" || e === "date" ? 1 : -1
			};
		},
		toggleProject(e) {
			let n = new Set(this.selectedProjects);
			n.has(e) ? n.delete(e) : n.add(e), this.selectedProjects = n;
		},
		clearProjects() {
			this.selectedProjects = /* @__PURE__ */ new Set();
		},
		toggleEmployee(e) {
			let n = new Set(this.selectedEmployees);
			n.has(e) ? n.delete(e) : n.add(e), this.selectedEmployees = n;
		},
		clearEmployees() {
			this.selectedEmployees = /* @__PURE__ */ new Set();
		},
		setPeriod(e) {
			this.period = e;
		},
		shiftPeriod(e) {
			for (this.period === "year" ? this.year += e : this.period === "quarter" ? this.month += e * 3 : this.month += e; this.month > 12;) this.month -= 12, this.year += 1;
			for (; this.month < 1;) this.month += 12, --this.year;
			this.refresh();
		},
		refresh() {
			this.load(), this.entries = [], this.entriesLoadedKey = null, this.projectSearch = "", this.employeeSearch = "", this.projectsExpanded = !1, this.employeesExpanded = !1, this.tab === "detail" && this.ensureEntries();
		},
		periodKey() {
			return `${this.year}-${this.month}-${this.period}`;
		},
		async load() {
			this.loading = !0;
			try {
				let e = await bw.getProjectEvaluation({
					year: this.year,
					month: this.month,
					period: this.period
				});
				this.rows = e?.rows || [];
			} catch (e) {
				Hv(e.message || this.t("worktime", "Fehler beim Laden der Auswertung"));
			} finally {
				this.loading = !1;
			}
		},
		async ensureEntries() {
			if (this.entriesLoadedKey !== this.periodKey()) {
				this.entriesLoading = !0;
				try {
					let e = await bw.getProjectEntries({
						year: this.year,
						month: this.month,
						period: this.period
					});
					this.entries = e?.entries || [], this.entriesLoadedKey = this.periodKey();
				} catch (e) {
					Hv(e.message || this.t("worktime", "Fehler beim Laden der Auswertung"));
				} finally {
					this.entriesLoading = !1;
				}
			}
		},
		exportData(e) {
			bw.downloadProjectExport(e, {
				year: this.year,
				month: this.month,
				period: this.period,
				projectIds: [...this.selectedProjects],
				employeeIds: this.projectFilterDepartmentId === null ? [...this.selectedEmployees] : [...new Set(this.filteredRows.map((e) => e.employeeId))],
				mode: this.tab
			});
		}
	}
}, tU = { class: "evaluation-view" }, nU = { class: "view-header" }, rU = { class: "view-toolbar" }, iU = ["aria-label"], aU = ["aria-label"], oU = ["onClick"], sU = { class: "view-header__nav" }, cU = { class: "period-nav" }, lU = { class: "period-nav__label" }, uU = { class: "ev-mitarbeiter" }, dU = {
	key: 0,
	class: "ev-kpis"
}, fU = { class: "kpi-card" }, pU = { class: "kpi-lab" }, mU = { class: "kpi-num" }, hU = { class: "kpi-card" }, gU = { class: "kpi-lab" }, _U = { class: "kpi-card" }, vU = { class: "kpi-lab" }, yU = { class: "kpi-num" }, bU = { class: "kpi-sub" }, xU = { class: "ev-subtabs" }, SU = {
	class: "layout-seg",
	role: "group"
}, CU = { class: "ev-card" }, wU = {
	key: 0,
	class: "ev-dept-filter"
}, TU = { for: "teamDeptFilter" }, EU = { class: "ev-table" }, DU = { class: "ev-emp" }, OU = { class: "ev-emp-name" }, kU = { class: "ev-emp-sub" }, AU = { class: "ev-vac" }, jU = { class: "ev-vac-num" }, MU = { class: "ev-vac-track" }, NU = {
	key: 0,
	class: "ev-stchip ev-stchip--open"
}, PU = {
	key: 1,
	class: "ev-stchip ev-stchip--ok"
}, FU = { class: "ev-filter" }, IU = { class: "ev-filter__label" }, LU = { class: "ev-chips" }, RU = ["onClick"], zU = {
	key: 0,
	class: "ev-ccust"
}, BU = {
	key: 1,
	class: "ev-x"
}, VU = { class: "ev-search" }, HU = ["placeholder"], UU = {
	key: 0,
	class: "ev-filter"
}, WU = { class: "ev-filter__label" }, GU = { class: "ev-filter" }, KU = { class: "ev-filter__label" }, qU = { class: "ev-chips" }, JU = ["onClick"], YU = { class: "ev-av" }, XU = {
	key: 0,
	class: "ev-x"
}, ZU = { class: "ev-search" }, QU = ["placeholder"], $U = { class: "ev-kpis" }, eW = { class: "kpi-card" }, tW = { class: "kpi-lab" }, nW = { class: "kpi-num" }, rW = { class: "kpi-card" }, iW = { class: "kpi-lab" }, aW = { class: "kpi-num" }, oW = { class: "kpi-card" }, sW = { class: "kpi-lab" }, cW = { class: "kpi-num" }, lW = { class: "ev-tabs" }, uW = {
	class: "layout-seg",
	role: "group"
}, dW = { class: "ev-export" }, fW = {
	key: 2,
	class: "ev-card"
}, pW = { class: "ev-table" }, mW = { class: "ev-emp-name" }, hW = {
	key: 0,
	class: "ev-emp-sub"
}, gW = { class: "ev-num" }, _W = { class: "ev-share" }, vW = { class: "ev-bar" }, yW = { class: "ev-muted" }, bW = { class: "ev-num" }, xW = {
	key: 3,
	class: "ev-card"
}, SW = { class: "ev-table ev-entries" }, CW = { class: "ev-muted" }, wW = { class: "ev-name" }, TW = { class: "ev-muted" }, EW = { class: "ev-num" }, DW = { class: "ev-muted" }, OW = { colspan: "5" }, kW = { class: "ev-num" }, AW = {
	key: 4,
	class: "ev-empty"
};
function jW(e, r, i, a, o, s) {
	let c = P("AccountMultipleIcon"), l = P("FolderOutlineIcon"), d = P("YearPicker"), f = P("ChevronLeftIcon"), m = P("NcButton"), h = P("ChevronRightIcon"), g = P("NcLoadingIcon"), _ = P("ViewListOutlineIcon"), v = P("CalendarTextOutlineIcon"), b = P("NcSelect"), x = P("NcAvatar"), S = P("TeamYearTable"), C = P("AccountGroupIcon"), w = P("NcEmptyContent"), T = P("MagnifyIcon"), E = P("ChartBarIcon"), D = P("FormatListBulletedIcon"), O = P("DownloadIcon");
	return J(), H("div", tU, [
		n("div", nU, [n("h2", null, U(e.t("worktime", "Auswertung")), 1)]),
		r[117] ||= z(),
		n("div", rU, [
			n("div", {
				class: "layout-seg",
				role: "group",
				"aria-label": e.t("worktime", "Ansicht")
			}, [
				n("button", {
					class: G(["seg-btn", { active: o.mode === "mitarbeiter" }]),
					onClick: r[0] ||= (e) => o.mode = "mitarbeiter"
				}, [I(c, { size: 18 }), z(" " + U(e.t("worktime", "Mitarbeiter")), 1)], 2),
				r[26] ||= z(),
				n("button", {
					class: G(["seg-btn", { active: o.mode === "projekte" }]),
					onClick: r[1] ||= (e) => o.mode = "projekte"
				}, [I(l, { size: 18 }), z(" " + U(e.t("worktime", "Projekte")), 1)], 2)
			], 8, iU),
			r[30] ||= z(),
			N(n("div", {
				class: "layout-seg",
				role: "group",
				"aria-label": e.t("worktime", "Zeitraum")
			}, [(J(!0), H(F, null, u(s.periods, (e) => (J(), H("button", {
				key: e.value,
				class: G(["seg-btn", { active: o.period === e.value }]),
				onClick: (n) => s.setPeriod(e.value)
			}, [(J(), L(p(e.icon), { size: 18 })), z(" " + U(e.label), 1)], 10, oU))), 128))], 8, aU), [[k, o.mode === "projekte"]]),
			r[31] ||= z(),
			n("div", sU, [
				N(I(d, {
					year: o.teamYear,
					onUpdate: s.onTeamYearChange
				}, null, 8, ["year", "onUpdate"]), [[k, o.mode === "mitarbeiter"]]),
				r[29] ||= z(),
				N(n("div", cU, [
					I(m, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Zurück"),
						onClick: r[2] ||= (e) => s.shiftPeriod(-1)
					}, {
						icon: A(() => [I(f, { size: 20 })]),
						_: 1
					}, 8, ["aria-label"]),
					r[27] ||= z(),
					n("span", lU, U(s.periodLabel), 1),
					r[28] ||= z(),
					I(m, {
						variant: "tertiary",
						"aria-label": e.t("worktime", "Weiter"),
						onClick: r[3] ||= (e) => s.shiftPeriod(1)
					}, {
						icon: A(() => [I(h, { size: 20 })]),
						_: 1
					}, 8, ["aria-label"])
				], 512), [[k, o.mode === "projekte"]])
			])
		]),
		r[118] ||= z(),
		N(n("div", uU, [
			o.teamReport.length > 0 ? (J(), H("div", dU, [
				n("div", fU, [
					n("div", pU, U(e.t("worktime", "Mitarbeitende")), 1),
					r[32] ||= z(),
					n("div", mU, U(s.teamKpis.count), 1)
				]),
				r[35] ||= z(),
				n("div", hU, [
					n("div", gU, U(e.t("worktime", "Überstunden gesamt")), 1),
					r[33] ||= z(),
					n("div", { class: G(["kpi-num", s.teamKpis.overtimeMinutes >= 0 ? "kpi-pos" : "kpi-neg"]) }, U(s.signedHours(s.teamKpis.overtimeMinutes)), 3)
				]),
				r[36] ||= z(),
				n("div", _U, [
					n("div", vU, U(e.t("worktime", "Urlaub genommen")), 1),
					r[34] ||= z(),
					n("div", yU, [z(U(s.teamKpis.vacationUsed) + " ", 1), n("span", bU, "/ " + U(s.formatDaysLabel(s.teamKpis.vacationTotal)), 1)])
				])
			])) : K("", !0),
			r[58] ||= z(),
			o.teamLoading ? (J(), L(g, {
				key: 1,
				size: 44
			})) : o.teamReport.length > 0 ? (J(), H(F, { key: 2 }, [
				n("div", xU, [n("div", SU, [
					n("button", {
						class: G(["seg-btn", { active: o.teamSubtab === "overview" }]),
						onClick: r[4] ||= (e) => o.teamSubtab = "overview"
					}, [I(_, { size: 18 }), z(" " + U(e.t("worktime", "Übersicht")), 1)], 2),
					r[37] ||= z(),
					n("button", {
						class: G(["seg-btn", { active: o.teamSubtab === "months" }]),
						onClick: r[5] ||= (e) => o.teamSubtab = "months"
					}, [I(v, { size: 18 }), z(" " + U(e.t("worktime", "Monatsdetail")), 1)], 2)
				])]),
				r[55] ||= z(),
				N(n("div", CU, [
					s.teamDepartmentOptions.length > 1 || o.teamFilterDepartmentId !== null ? (J(), H("div", wU, [
						n("label", TU, U(e.t("worktime", "Abteilung")), 1),
						r[38] ||= z(),
						I(b, {
							"label-outside": "",
							id: "teamDeptFilter",
							modelValue: s.selectedTeamDepartment,
							"onUpdate:modelValue": r[6] ||= (e) => s.selectedTeamDepartment = e,
							options: s.teamDepartmentOptions,
							placeholder: e.t("worktime", "Alle Abteilungen"),
							label: "label",
							class: "ev-dept-select"
						}, null, 8, [
							"modelValue",
							"options",
							"placeholder"
						])
					])) : K("", !0),
					r[54] ||= z(),
					n("table", EU, [
						n("thead", null, [n("tr", null, [
							n("th", {
								class: "sortable",
								onClick: r[7] ||= (e) => s.teamSortBy("name")
							}, U(e.t("worktime", "Mitarbeiter")) + U(s.teamSortArrow("name")), 1),
							r[39] ||= z(),
							n("th", {
								class: "ev-num sortable",
								onClick: r[8] ||= (e) => s.teamSortBy("overtime")
							}, U(e.t("worktime", "Überstunden")) + U(s.teamSortArrow("overtime")), 1),
							r[40] ||= z(),
							n("th", {
								class: "sortable",
								onClick: r[9] ||= (e) => s.teamSortBy("vacation")
							}, U(e.t("worktime", "Resturlaub")) + U(s.teamSortArrow("vacation")), 1),
							r[41] ||= z(),
							n("th", null, U(e.t("worktime", "Status")), 1)
						])]),
						r[52] ||= z(),
						n("tbody", null, [(J(!0), H(F, null, u(s.teamOverviewRows, (i) => (J(), H("tr", { key: i.id }, [
							n("td", null, [n("div", DU, [
								I(x, {
									user: i.userId,
									"display-name": i.name,
									size: 30
								}, null, 8, ["user", "display-name"]),
								r[43] ||= z(),
								n("div", null, [
									n("div", OU, U(i.name), 1),
									r[42] ||= z(),
									n("div", kU, U(s.weeklyLabel(i.weeklyHours)) + " " + U(e.t("worktime", "Std./Woche")), 1)
								])
							])]),
							r[45] ||= z(),
							n("td", { class: G(["ev-num", i.overtimeMinutes >= 0 ? "kpi-pos" : "kpi-neg"]) }, U(s.signedHours(i.overtimeMinutes)), 3),
							r[46] ||= z(),
							n("td", null, [n("div", AU, [
								n("span", jU, U(i.vacationRemaining) + " / " + U(i.vacationTotal), 1),
								r[44] ||= z(),
								n("span", MU, [n("span", {
									class: "ev-vac-fill",
									style: Pe({ width: i.vacationPercent + "%" })
								}, null, 4)])
							])]),
							r[47] ||= z(),
							n("td", null, [i.openMonths > 0 ? (J(), H("span", NU, U(e.t("worktime", "Offen: {n}", { n: i.openMonths })), 1)) : (J(), H("span", PU, U(e.t("worktime", "✓ aktuell")), 1))])
						]))), 128))]),
						r[53] ||= z(),
						n("tfoot", null, [n("tr", null, [
							n("td", null, U(e.t("worktime", "Team gesamt")), 1),
							r[48] ||= z(),
							n("td", { class: G(["ev-num", s.teamKpis.overtimeMinutes >= 0 ? "kpi-pos" : "kpi-neg"]) }, U(s.signedHours(s.teamKpis.overtimeMinutes)), 3),
							r[49] ||= z(),
							n("td", null, U(s.teamKpis.vacationTotal - s.teamKpis.vacationUsed) + " / " + U(s.teamKpis.vacationTotal), 1),
							r[50] ||= z(),
							r[51] ||= n("td", null, null, -1)
						])])
					])
				], 512), [[k, o.teamSubtab === "overview"]]),
				r[56] ||= z(),
				N(n("div", null, [I(S, {
					report: s.filteredTeamReport,
					year: o.teamYear
				}, null, 8, ["report", "year"])], 512), [[k, o.teamSubtab === "months"]])
			], 64)) : (J(), L(w, {
				key: 3,
				name: e.t("worktime", "Kein Team")
			}, {
				icon: A(() => [I(C)]),
				description: A(() => [z(U(e.t("worktime", "Du hast keine Teammitglieder.")), 1)]),
				_: 1
			}, 8, ["name"]))
		], 512), [[k, o.mode === "mitarbeiter"]]),
		r[119] ||= z(),
		N(n("div", null, [
			n("div", FU, [
				n("div", IU, U(e.t("worktime", "Projekte")), 1),
				r[66] ||= z(),
				n("div", LU, [
					n("button", {
						class: G(["ev-chip ev-chip--all", { on: !o.selectedProjects.size }]),
						onClick: r[10] ||= (...e) => s.clearProjects && s.clearProjects(...e)
					}, U(e.t("worktime", "Alle")), 3),
					r[63] ||= z(),
					(J(!0), H(F, null, u(s.visibleProjects.list, (e) => (J(), H("button", {
						key: "p" + e.id,
						class: G(["ev-chip", { on: o.selectedProjects.has(e.id) }]),
						style: Pe(s.chipStyle(e)),
						onClick: (n) => s.toggleProject(e.id)
					}, [
						n("span", {
							class: "ev-cdot",
							style: Pe({ background: o.selectedProjects.has(e.id) ? e.color ? s.textColorOn(e.color) : "var(--color-primary-element-text)" : e.color || "var(--color-border-dark)" })
						}, null, 4),
						r[59] ||= z(),
						n("span", null, U(e.name), 1),
						r[60] ||= z(),
						e.customer ? (J(), H("span", zU, "· " + U(e.customer), 1)) : K("", !0),
						r[61] ||= z(),
						o.selectedProjects.has(e.id) ? (J(), H("span", BU, "×")) : K("", !0)
					], 14, RU))), 128)),
					r[64] ||= z(),
					s.visibleProjects.hidden ? (J(), H("button", {
						key: 0,
						class: "ev-chip ev-chip--more",
						onClick: r[11] ||= (e) => o.projectsExpanded = !0
					}, U(e.t("worktime", "+ {count} weitere", { count: s.visibleProjects.hidden })), 1)) : K("", !0),
					r[65] ||= z(),
					n("label", VU, [
						I(T, { size: 16 }),
						r[62] ||= z(),
						N(n("input", {
							"onUpdate:modelValue": r[12] ||= (e) => o.projectSearch = e,
							type: "text",
							placeholder: e.t("worktime", "Projekt suchen …")
						}, null, 8, HU), [[y, o.projectSearch]])
					])
				])
			]),
			r[112] ||= z(),
			s.projectDepartmentOptions.length > 1 || o.projectFilterDepartmentId !== null ? (J(), H("div", UU, [
				n("div", WU, U(e.t("worktime", "Abteilung")), 1),
				r[67] ||= z(),
				I(b, {
					"label-outside": "",
					"aria-label-combobox": e.t("worktime", "Alle Abteilungen"),
					id: "projectDeptFilter",
					modelValue: s.selectedProjectDepartment,
					"onUpdate:modelValue": r[13] ||= (e) => s.selectedProjectDepartment = e,
					options: s.projectDepartmentOptions,
					placeholder: e.t("worktime", "Alle Abteilungen"),
					label: "label",
					class: "ev-dept-select"
				}, null, 8, [
					"aria-label-combobox",
					"modelValue",
					"options",
					"placeholder"
				])
			])) : K("", !0),
			r[113] ||= z(),
			n("div", GU, [
				n("div", KU, U(e.t("worktime", "Mitarbeitende")), 1),
				r[74] ||= z(),
				n("div", qU, [
					n("button", {
						class: G(["ev-chip ev-chip--all", { on: !o.selectedEmployees.size }]),
						onClick: r[14] ||= (...e) => s.clearEmployees && s.clearEmployees(...e)
					}, U(e.t("worktime", "Alle")), 3),
					r[71] ||= z(),
					(J(!0), H(F, null, u(s.visibleEmployees.list, (e) => (J(), H("button", {
						key: "e" + e.id,
						class: G(["ev-chip ev-chip--emp", { on: o.selectedEmployees.has(e.id) }]),
						onClick: (n) => s.toggleEmployee(e.id)
					}, [
						n("span", YU, U(s.initials(e.name)), 1),
						r[68] ||= z(),
						n("span", null, U(e.name), 1),
						r[69] ||= z(),
						o.selectedEmployees.has(e.id) ? (J(), H("span", XU, "×")) : K("", !0)
					], 10, JU))), 128)),
					r[72] ||= z(),
					s.visibleEmployees.hidden ? (J(), H("button", {
						key: 0,
						class: "ev-chip ev-chip--more",
						onClick: r[15] ||= (e) => o.employeesExpanded = !0
					}, U(e.t("worktime", "+ {count} weitere", { count: s.visibleEmployees.hidden })), 1)) : K("", !0),
					r[73] ||= z(),
					n("label", ZU, [
						I(T, { size: 16 }),
						r[70] ||= z(),
						N(n("input", {
							"onUpdate:modelValue": r[16] ||= (e) => o.employeeSearch = e,
							type: "text",
							placeholder: e.t("worktime", "Mitarbeiter suchen …")
						}, null, 8, QU), [[y, o.employeeSearch]])
					])
				])
			]),
			r[114] ||= z(),
			n("div", $U, [
				n("div", eW, [
					n("div", tW, U(e.t("worktime", "Gebuchte Stunden")), 1),
					r[75] ||= z(),
					n("div", nW, U(s.hours(s.totals.totalMinutes)), 1)
				]),
				r[78] ||= z(),
				n("div", rW, [
					n("div", iW, U(e.t("worktime", "Projekte")), 1),
					r[76] ||= z(),
					n("div", aW, U(s.totals.projectCount), 1)
				]),
				r[79] ||= z(),
				n("div", oW, [
					n("div", sW, U(e.t("worktime", "Mitarbeitende")), 1),
					r[77] ||= z(),
					n("div", cW, U(s.totals.employeeCount), 1)
				])
			]),
			r[115] ||= z(),
			n("div", lW, [
				n("div", uW, [
					n("button", {
						class: G(["seg-btn", { active: o.tab === "agg" }]),
						onClick: r[17] ||= (e) => o.tab = "agg"
					}, [I(E, { size: 18 }), z(" " + U(e.t("worktime", "Aggregiert")), 1)], 2),
					r[80] ||= z(),
					n("button", {
						class: G(["seg-btn", { active: o.tab === "detail" }]),
						onClick: r[18] ||= (e) => o.tab = "detail"
					}, [I(D, { size: 18 }), z(" " + U(e.t("worktime", "Einzelbuchungen")), 1)], 2)
				]),
				r[82] ||= z(),
				n("div", dW, [
					I(m, {
						variant: "secondary",
						onClick: r[19] ||= (e) => s.exportData("csv")
					}, {
						icon: A(() => [I(O, { size: 18 })]),
						default: A(() => [z(" " + U(e.t("worktime", "CSV")), 1)]),
						_: 1
					}),
					r[81] ||= z(),
					I(m, {
						variant: "secondary",
						onClick: r[20] ||= (e) => s.exportData("pdf")
					}, {
						icon: A(() => [I(O, { size: 18 })]),
						default: A(() => [z(" " + U(e.t("worktime", "PDF")), 1)]),
						_: 1
					})
				])
			]),
			r[116] ||= z(),
			o.loading || o.tab === "detail" && o.entriesLoading ? (J(), L(g, {
				key: 1,
				class: "ev-loading",
				size: 32
			})) : o.tab === "agg" && s.aggRows.length ? (J(), H("div", fW, [n("table", pW, [
				n("thead", null, [n("tr", null, [
					n("th", {
						class: "sortable",
						onClick: r[21] ||= (e) => s.sortBy("name")
					}, U(e.t("worktime", "Mitarbeiter")) + U(s.sortArrow("name")), 1),
					r[83] ||= z(),
					n("th", {
						class: "ev-num sortable",
						onClick: r[22] ||= (e) => s.sortBy("minutes")
					}, U(e.t("worktime", "Stunden")) + U(s.sortArrow("minutes")), 1),
					r[84] ||= z(),
					n("th", null, U(e.t("worktime", "Anteil")), 1)
				])]),
				r[92] ||= z(),
				n("tbody", null, [(J(!0), H(F, null, u(s.aggRows, (i) => (J(), H("tr", { key: i.id }, [
					n("td", null, [
						n("div", mW, U(i.name), 1),
						r[85] ||= z(),
						s.weeklyLabel(i.weeklyHours) ? (J(), H("div", hW, U(s.weeklyLabel(i.weeklyHours)) + " " + U(e.t("worktime", "Std./Woche")), 1)) : K("", !0)
					]),
					r[87] ||= z(),
					n("td", gW, U(s.hours(i.minutes)), 1),
					r[88] ||= z(),
					n("td", null, [n("div", _W, [
						n("div", vW, [n("span", { style: Pe({ width: s.pct(i.minutes) + "%" }) }, null, 4)]),
						r[86] ||= z(),
						n("span", yW, U(s.pct(i.minutes)) + " %", 1)
					])])
				]))), 128))]),
				r[93] ||= z(),
				n("tfoot", null, [n("tr", null, [
					n("td", null, U(e.t("worktime", "Gesamt")), 1),
					r[89] ||= z(),
					n("td", bW, U(s.hours(s.totals.totalMinutes)), 1),
					r[90] ||= z(),
					r[91] ||= n("td", { class: "ev-muted" }, "100 %", -1)
				])])
			])])) : o.tab === "detail" && s.detailRows.length ? (J(), H("div", xW, [n("table", SW, [
				n("thead", null, [n("tr", null, [
					n("th", {
						class: "sortable",
						onClick: r[23] ||= (e) => s.sortBy("date")
					}, U(e.t("worktime", "Datum")) + U(s.sortArrow("date")), 1),
					r[94] ||= z(),
					n("th", null, U(e.t("worktime", "Zeit")), 1),
					r[95] ||= z(),
					n("th", null, U(e.t("worktime", "Projekt")), 1),
					r[96] ||= z(),
					n("th", null, U(e.t("worktime", "Kunde")), 1),
					r[97] ||= z(),
					n("th", {
						class: "sortable",
						onClick: r[24] ||= (e) => s.sortBy("name")
					}, U(e.t("worktime", "Mitarbeiter")) + U(s.sortArrow("name")), 1),
					r[98] ||= z(),
					n("th", {
						class: "ev-num sortable",
						onClick: r[25] ||= (e) => s.sortBy("minutes")
					}, U(e.t("worktime", "Stunden")) + U(s.sortArrow("minutes")), 1),
					r[99] ||= z(),
					n("th", null, U(e.t("worktime", "Beschreibung")), 1)
				])]),
				r[110] ||= z(),
				n("tbody", null, [(J(!0), H(F, null, u(s.detailRows, (i) => (J(), H("tr", { key: i.id }, [
					n("td", null, U(s.formatDate(i.date)), 1),
					r[101] ||= z(),
					n("td", CW, U(s.timeRange(i)), 1),
					r[102] ||= z(),
					n("td", wW, [
						n("span", {
							class: "ev-cdot",
							style: Pe({ background: i.color || "var(--color-border-dark)" })
						}, null, 4),
						r[100] ||= z(),
						n("span", null, U(i.projectName || e.t("worktime", "Kein Projekt")), 1)
					]),
					r[103] ||= z(),
					n("td", TW, U(i.customer || "–"), 1),
					r[104] ||= z(),
					n("td", null, U(i.employeeName || e.t("worktime", "Unbekannt")), 1),
					r[105] ||= z(),
					n("td", EW, U(s.hours(i.minutes)), 1),
					r[106] ||= z(),
					n("td", DW, U(i.description || ""), 1)
				]))), 128))]),
				r[111] ||= z(),
				n("tfoot", null, [n("tr", null, [
					n("td", OW, U(e.t("worktime", "Gesamt")), 1),
					r[107] ||= z(),
					n("td", kW, U(s.hours(s.totals.totalMinutes)), 1),
					r[108] ||= z(),
					r[109] ||= n("td", null, null, -1)
				])])
			])])) : (J(), H("div", AW, U(e.t("worktime", "Für diese Auswahl liegen keine Buchungen vor.")), 1))
		], 512), [[k, o.mode === "projekte"]])
	]);
}
var MW = /*#__PURE__*/ Y(eU, [["render", jW], ["__scopeId", "data-v-9ce58c09"]]), NW = () => {
	let e = qo().permissions;
	return e.employeeId ? "/tracking" : e.canManageSettings || e.canManageEmployees ? "/settings" : e.canApprove || e.isAdmin || e.isHrManager ? "/approvals" : "/tracking";
}, PW = [
	{
		path: "/",
		redirect: NW
	},
	{
		path: "/tracking",
		name: "tracking",
		component: Uw
	},
	{
		path: "/absences",
		name: "absences",
		component: PE
	},
	{
		path: "/absence-overview",
		redirect: "/absences"
	},
	{
		path: "/team",
		name: "team",
		component: xD
	},
	{
		path: "/approvals",
		name: "approvals",
		component: lk
	},
	{
		path: "/evaluation",
		name: "evaluation",
		component: MW
	},
	{
		path: "/my-settings",
		name: "my-settings",
		component: xA
	},
	{
		path: "/settings",
		name: "settings",
		component: qB
	},
	{
		path: "/audit",
		name: "audit",
		component: IV
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: NW
	}
], FW = ri({
	history: Mr(),
	routes: PW
});
FW.beforeEach((e) => {
	let n = qo().accessProfile;
	return ts(e.name, n) ? !0 : "/";
}), FW.afterEach((e) => {
	localStorage.setItem("worktime_last_view", e.path);
});
// src/utils/modalEscape.js
function IW(e) {
	if (e.key !== "Escape" || e.defaultPrevented || e.isComposing) return;
	let n = e.target;
	if (!n?.matches?.("input, textarea, select")) return;
	let r = n.closest(".modal-mask");
	r && (n.closest(".vs--open") || document.querySelector(".dp__menu") || r.querySelector(".modal-container__close")?.click());
}
function LW() {
	document.addEventListener("keydown", IW);
}
// src/main.js
var RW = xe(Cc);
RW.use(ur()), RW.config.globalProperties.t = R, RW.config.globalProperties.n = Fe;
var zW = qo();
zW.initFromInitialState(Ge("worktime", "permissions", {})), zW.setApprovalRequired(Ge("worktime", "approvalRequired", !1)), zW.setRequiredFields({
	requireProject: Ge("worktime", "requireProject", !1),
	requireDescription: Ge("worktime", "requireDescription", !1)
}), zW.setHourlySickEnabled(Ge("worktime", "hourlySickEnabled", !1)), zW.setEmergencyWorkEnabled(Ge("worktime", "emergencyWorkEnabled", !1)), RW.use(FW);
var BW = localStorage.getItem("worktime_last_view");
Fk(window.location.hash, BW) && FW.push(BW).catch(() => {}), RW.mount(".app-worktime"), LW();
