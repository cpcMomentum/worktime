import { t as e } from "./rolldown-runtime-QGRDbDUS.chunk.mjs";
import { $ as t, $n as n, A as r, At as i, C as a, Cn as o, Cr as s, Dr as c, Dt as l, E as u, En as d, Er as f, F as p, Fr as m, I as ee, Jr as te, K as ne, Kr as h, L as re, Lr as g, M as ie, Mn as ae, N as oe, Nn as se, O as _, On as ce, Ot as v, Qn as y, Rn as b, Rr as le, S as ue, Sn as de, T as fe, Tn as x, Tr as S, U as C, V as w, Wt as pe, Xr as T, Yn as me, Yr as he, Zt as ge, _ as _e, _n as E, a as ve, ai as D, ar as ye, b as be, bn as xe, cn as Se, cr as Ce, d as we, dn as Te, ei as O, er as k, et as Ee, fn as De, fr as A, gn as Oe, h as ke, hn as Ae, ir as je, j as Me, jn as Ne, jr as Pe, jt as Fe, k as j, m as Ie, mr as Le, n as Re, ni as M, nr as N, o as ze, oi as P, on as Be, or as Ve, p as He, pr as Ue, r as We, ri as F, rr as Ge, sn as Ke, sr as qe, t as Je, tr as I, tt as Ye, u as L, un as Xe, ur as Ze, v as Qe, w as $e, wn as et, wr as R, x as tt, xr as z, y as nt, yr as rt, z as it, zn as B } from "./NcActionRouter-Ca-mCYkz.chunk.mjs";
import { n as at, t as ot } from "./lib-yRjs9Rx9.chunk.mjs";
// node_modules/vue-router/dist/devtools-RytpElE1.js
var st = typeof document < "u", ct = /#/g, lt = /&/g, ut = /\//g, dt = /=/g, ft = /\?/g, pt = /\+/g, mt = /%5B/g, ht = /%5D/g, gt = /%5E/g, _t = /%60/g, vt = /%7B/g, yt = /%7C/g, bt = /%7D/g, xt = /%20/g;
function V(e) {
	return e == null ? "" : encodeURI("" + e).replace(yt, "|").replace(mt, "[").replace(ht, "]");
}
function St(e) {
	return V(e).replace(vt, "{").replace(bt, "}").replace(gt, "^");
}
function H(e) {
	return V(e).replace(pt, "%2B").replace(xt, "+").replace(ct, "%23").replace(lt, "%26").replace(_t, "`").replace(vt, "{").replace(bt, "}").replace(gt, "^");
}
function Ct(e) {
	return H(e).replace(dt, "%3D");
}
function wt(e) {
	return V(e).replace(ct, "%23").replace(ft, "%3F");
}
function Tt(e) {
	return wt(e).replace(ut, "%2F");
}
function U(e) {
	if (e == null) return null;
	try {
		return decodeURIComponent("" + e);
	} catch {}
	return "" + e;
}
var Et = /\/$/, Dt = (e) => e.replace(Et, "");
function Ot(e, t, n = "/") {
	let r, i = {}, a = "", o = "", s = t.indexOf("#"), c = t.indexOf("?");
	return c = s >= 0 && c > s ? -1 : c, c >= 0 && (r = t.slice(0, c), a = t.slice(c, s > 0 ? s : t.length), i = e(a.slice(1))), s >= 0 && (r ||= t.slice(0, s), o = t.slice(s, t.length)), r = Ft(r ?? t, n), {
		fullPath: r + a + o,
		path: r,
		query: i,
		hash: U(o)
	};
}
function kt(e, t) {
	let n = t.query ? e(t.query) : "";
	return t.path + (n && "?") + n + (t.hash || "");
}
function At(e, t) {
	return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function jt(e, t, n) {
	let r = t.matched.length - 1, i = n.matched.length - 1;
	return r > -1 && r === i && W(t.matched[r], n.matched[i]) && Mt(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function W(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function Mt(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (var n in e) if (!Nt(e[n], t[n])) return !1;
	return !0;
}
function Nt(e, t) {
	return x(e) ? Pt(e, t) : x(t) ? Pt(t, e) : (e && e.valueOf()) === (t && t.valueOf());
}
function Pt(e, t) {
	return x(t) ? e.length === t.length && e.every((e, n) => e === t[n]) : e.length === 1 && e[0] === t;
}
function Ft(e, t) {
	if (et(e)) return e;
	if (!e) return t;
	let n = t.split("/"), r = e.split("/"), i = r[r.length - 1];
	(i === ".." || i === ".") && r.push("");
	let a = n.length - 1, o, s;
	for (o = 0; o < r.length; o++) if (s = r[o], s !== ".") {
		if (s === "..") a > 1 && a--;
		else break;
	}
	return n.slice(0, a).join("/") + "/" + r.slice(o).join("/");
}
var It = {
	path: "/",
	name: void 0,
	params: {},
	query: {},
	hash: "",
	fullPath: "/",
	matched: [],
	meta: {},
	redirectedFrom: void 0
};
function Lt(e) {
	let t = {};
	for (let n in It) Object.defineProperty(t, n, {
		get: () => e.value[n],
		enumerable: !0
	});
	return te(t);
}
function Rt(e) {
	if (!e) {
		if (st) {
			let t = document.querySelector("base");
			e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^/]+/, "");
		} else e = "/";
	}
	return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Dt(e);
}
var zt = /^[^#]+#/;
function Bt(e, t) {
	return e.replace(zt, "#") + t;
}
function Vt(e, t) {
	let n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
	return {
		behavior: t.behavior,
		left: r.left - n.left - (t.left || 0),
		top: r.top - n.top - (t.top || 0)
	};
}
function Ht(e) {
	let t;
	if ("el" in e) {
		let n = e.el, r = typeof n == "string" && n.startsWith("#"), i = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
		if (!i) return;
		t = Vt(i, e);
	} else t = e;
	"scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left == null ? window.scrollX : t.left, t.top == null ? window.scrollY : t.top);
}
var Ut = "vue-router:scroll";
function Wt() {
	try {
		return de({}, JSON.parse(sessionStorage[Ut]));
	} catch {
		return {};
	}
}
var G = /*#__PURE__*/ Wt();
function K() {
	try {
		sessionStorage[Ut] = JSON.stringify(G);
	} catch {}
}
function Gt(e, t) {
	return (history.state ? history.state.position - t : -1) + e;
}
function Kt(e, t = 0) {
	history.scrollRestoration === "manual" && (G[Gt(e, t)] = {
		left: window.scrollX,
		top: window.scrollY
	}, K());
}
function qt(e) {
	let t = Gt(e, 0), n = G[t];
	return delete G[t], K(), n;
}
function Jt(e, t = !1) {
	for (let n in G) {
		let r = parseInt(n, 10);
		(r === e || !t && r > e) && delete G[n];
	}
	K();
}
function Yt(e) {
	return typeof e == "string" || e && typeof e == "object";
}
function Xt(e) {
	return typeof e == "string" || typeof e == "symbol";
}
function Zt(e) {
	let t = {};
	if (e === "" || e === "?") return t;
	let n = (e[0] === "?" ? e.slice(1) : e).split("&");
	for (let e = 0; e < n.length; ++e) {
		let r = n[e].replace(pt, " "), i = r.indexOf("="), a = U(i < 0 ? r : r.slice(0, i)), o = i < 0 ? null : U(r.slice(i + 1));
		if (a in t) {
			let e = t[a];
			x(e) || (e = t[a] = [e]), e.push(o);
		} else t[a] = o;
	}
	return t;
}
function Qt(e) {
	let t = "";
	for (let n in e) {
		let r = e[n];
		n = Ct(n), r == null ? r !== void 0 && (t += (t.length ? "&" : "") + n) : (x(r) ? r.map((e) => e && H(e)) : [r && H(r)]).forEach((e) => {
			e !== void 0 && (t += (t.length ? "&" : "") + n, e != null && (t += "=" + e));
		});
	}
	return t;
}
function $t(e) {
	let t = {};
	for (let n in e) {
		let r = e[n];
		r !== void 0 && (t[n] = x(r) ? r.map((e) => e == null ? null : "" + e) : r == null ? r : "" + r);
	}
	return t;
}
function en() {
	let e = [];
	function t(t) {
		return e.push(t), () => {
			let n = e.indexOf(t);
			n > -1 && e.splice(n, 1);
		};
	}
	function n() {
		e = [];
	}
	return {
		add: t,
		list: () => e.slice(),
		reset: n
	};
}
function q(e, t, n, r, i, a = (e) => e()) {
	let s = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
	return () => new Promise((c, l) => {
		let u = (e) => {
			e === !1 ? l(o(4, {
				from: n,
				to: t
			})) : e instanceof Error ? l(e) : Yt(e) ? l(o(2, {
				from: t,
				to: e
			})) : (s && r.enterCallbacks[i] === s && typeof e == "function" && s.push(e), c());
		}, d = a(() => e.call(r && r.instances[i], t, n, u)), f = Promise.resolve(d);
		e.length < 3 && (f = f.then(u)), f.catch((e) => l(e));
	});
}
function tn(e, t, n, r, i = (e) => e()) {
	let a = [];
	for (let o of e) for (let e in o.components) {
		let s = o.components[e];
		if (t === "beforeRouteEnter" || o.instances[e]) {
			if (ce(s)) {
				let c = (s.__vccOpts || s)[t];
				c && a.push(q(c, n, r, o, e, i));
			} else {
				let c = s();
				a.push(() => c.then((a) => {
					if (!a) throw Error(`Couldn't resolve component "${e}" at "${o.path}"`);
					let s = d(a) ? a.default : a;
					o.mods[e] = a, o.components[e] = s;
					let c = (s.__vccOpts || s)[t];
					return c && q(c, n, r, o, e, i)();
				}));
			}
		}
	}
	return a;
}
function nn(e, t) {
	let n = [], r = [], i = [], a = Math.max(t.matched.length, e.matched.length);
	for (let o = 0; o < a; o++) {
		let a = t.matched[o];
		a && (e.matched.find((e) => W(e, a)) ? r.push(a) : n.push(a));
		let s = e.matched[o];
		s && (t.matched.find((e) => W(e, s)) || i.push(s));
	}
	return [
		n,
		r,
		i
	];
}
function rn(e) {
	let t = A(se), n = A(ae), r = y(() => {
		let n = M(e.to);
		return t.resolve(n);
	}), i = y(() => {
		let { matched: e } = r.value, { length: t } = e, i = e[t - 1], a = n.matched;
		if (!i || !a.length) return -1;
		let o = a.findIndex(W.bind(null, i));
		if (o > -1) return o;
		let s = ln(e[t - 2]);
		return t > 1 && ln(i) === s && a[a.length - 1].path !== s ? a.findIndex(W.bind(null, e[t - 2])) : o;
	}), a = y(() => i.value > -1 && cn(n.params, r.value.params)), o = y(() => i.value > -1 && i.value === n.matched.length - 1 && Mt(n.params, r.value.params));
	function s(n = {}) {
		if (sn(n)) {
			let n = t[M(e.replace) ? "replace" : "push"](M(e.to)).catch(Ne);
			return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => n), n;
		}
		return Promise.resolve();
	}
	return {
		route: r,
		href: y(() => r.value.href),
		isActive: a,
		isExactActive: o,
		navigate: s
	};
}
function an(e) {
	return e.length === 1 ? e[0] : e;
}
var on = /* @__PURE__ */ qe({
	name: "RouterLink",
	compatConfig: { MODE: 3 },
	props: {
		to: {
			type: [String, Object],
			required: !0
		},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {
			type: String,
			default: "page"
		},
		viewTransition: Boolean
	},
	useLink: rn,
	setup(e, { slots: t }) {
		let n = h(rn(e)), { options: r } = A(se), i = y(() => ({
			[un(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
			[un(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
		}));
		return () => {
			let r = t.default && an(t.default(n));
			return e.custom ? r : Ze("a", {
				"aria-current": n.isExactActive ? e.ariaCurrentValue : null,
				href: n.href,
				onClick: n.navigate,
				class: i.value
			}, r);
		};
	}
});
function sn(e) {
	if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && (e.button === void 0 || e.button === 0)) {
		if (e.currentTarget && e.currentTarget.getAttribute) {
			let t = e.currentTarget.getAttribute("target");
			if (/\b_blank\b/i.test(t)) return;
		}
		return e.preventDefault && e.preventDefault(), !0;
	}
}
function cn(e, t) {
	for (let n in t) {
		let r = t[n], i = e[n];
		if (x(r)) {
			if (!x(i) || i.length !== r.length || r.some((e, t) => e.valueOf() !== i[t].valueOf())) return !1;
		} else if (r !== i) return !1;
	}
	return !0;
}
function ln(e) {
	return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
var un = (e, t, n) => e ?? t ?? n, J = /* @__PURE__ */ new WeakMap(), dn = {
	mounted(e, t) {
		let n = !t.modifiers.bubble, r;
		if (typeof t.value == "function") r = He(e, t.value, { capture: n });
		else {
			let [i, a] = t.value;
			r = He(e, i, Object.assign({ capture: n }, a));
		}
		J.set(e, r);
	},
	unmounted(e) {
		let t = J.get(e);
		t && typeof t == "function" ? t() : t?.stop(), J.delete(e);
	}
};
_({ mounted(e, t) {
	let n = t.arg?.split(",") ?? !0;
	if (typeof t.value == "function") Ie(n, t.value, { target: e });
	else {
		let [r, i] = t.value;
		Ie(n, r, {
			target: e,
			...i
		});
	}
} }), _({ mounted(e, t) {
	typeof t.value == "function" ? ke(e, t.value, { modifiers: t.modifiers }) : ke(e, ...t.value);
} }), _({ mounted(e, t) {
	let [n, r] = typeof t.value == "function" ? [t.value, {}] : t.value, { height: i, bottom: a, left: o, right: s, top: c, width: l, x: u, y: d } = _e(e, r);
	m([
		i,
		a,
		o,
		s,
		c,
		l,
		u,
		d
	], () => n({
		height: i,
		bottom: a,
		left: o,
		right: s,
		top: c,
		width: l,
		x: u,
		y: d
	}));
} }), _({ mounted(e, t) {
	let n = t.value;
	if (typeof n == "function") {
		let t = Qe(e);
		m(t, (e) => n(e));
	} else {
		let [t, r] = n, i = Qe(e, r);
		m(i, (e) => t(e));
	}
} });
var Y = j ? window : void 0;
j && window.document, j && window.navigator, j && window.location;
function X(e) {
	let t = O(e);
	return t?.$el ?? t;
}
function fn() {
	let e = T(!1), t = Ce();
	return t && rt(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function pn(e) {
	let t = fn();
	return y(() => (t.value, !!e()));
}
function mn(e, t, n = {}) {
	let { window: i = Y, ...a } = n, o, s = /* @__PURE__ */ pn(() => i && "MutationObserver" in i), c = () => {
		o &&= (o.disconnect(), void 0);
	}, l = y(() => {
		let t = O(e), n = ie(t).map(X).filter(r);
		return new Set(n);
	}), u = m(l, (e) => {
		c(), s.value && e.size && (o = new MutationObserver(t), e.forEach((e) => o.observe(e, a)));
	}, {
		immediate: !0,
		flush: "post"
	}), d = () => o?.takeRecords(), f = () => {
		u(), c();
	};
	return oe(f), {
		isSupported: s,
		stop: f,
		takeRecords: d
	};
}
function hn(e, t, n = {}) {
	let { window: r = Y, ...i } = n, a, o = /* @__PURE__ */ pn(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = y(() => {
		let t = O(e);
		return Array.isArray(t) ? t.map((e) => X(e)) : [X(t)];
	}), l = m(c, (e) => {
		if (s(), o.value && r) {
			a = new ResizeObserver(t);
			for (let t of e) t instanceof Element && a.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), u = () => {
		s(), l();
	};
	return oe(u), {
		isSupported: o,
		stop: u
	};
}
function gn(e, t = {}) {
	let { observeMutation: n = !1, onUpdated: r, window: i = Y } = t, a = T(!1), o = T(!1);
	function s(e) {
		a.value = e.scrollWidth > e.offsetWidth, o.value = e.scrollHeight > e.offsetHeight;
	}
	let c = r, l = y(() => {
		let t = X(e);
		if (!(!t || t instanceof SVGElement)) return t;
	}), u = () => {
		let e = l.value;
		return !e || e instanceof SVGElement ? [] : [e, ...Array.from(e.children).filter((e) => e instanceof HTMLElement)];
	};
	if (hn(u, (e, t) => {
		let n = l.value;
		n && s(n), c?.(e, t);
	}, { window: i }), n) {
		let e = r;
		mn(u, (t, n) => {
			let r = l.value;
			r && s(r), e?.(t, n);
		}, {
			window: i,
			...typeof n == "object" ? n : {
				childList: !0,
				subtree: !0,
				characterData: !0
			}
		});
	}
	return {
		isXOverflowed: he(a),
		isYOverflowed: he(o),
		stop,
		update: () => {
			let e = l.value;
			e && i && s(e);
		}
	};
}
_({ mounted(e, t) {
	let [n, r] = typeof t.value == "function" ? [t.value] : t.value, i = gn(e, r), { isXOverflowed: a, isYOverflowed: o } = i;
	m([a, o], () => n(i), { immediate: !0 });
} }), _({ mounted(e, t) {
	let n = typeof t.value == "function" ? t.value : t.value?.[0], r = typeof t.value == "function" ? [] : t.value.slice(1), { width: i, height: a } = nt(e, ...r);
	m([i, a], ([e, t]) => n({
		width: e,
		height: t
	}), { immediate: !0 });
} }), _({ mounted(e, t) {
	if (typeof t.value == "function") {
		let n = t.value, r = be(e);
		m(r, (e) => n(e), { immediate: !0 });
	} else {
		let [n, r] = t.value;
		if (r?.controls) {
			let t = be(e, r);
			m(t.isVisible, () => n(t), { immediate: !0 });
		} else {
			let t = be(e, r);
			m(t, (e) => n(e), { immediate: !0 });
		}
	}
} }), _({ mounted(e, t) {
	typeof t.value == "function" ? tt(e, t.value) : tt(e, ...t.value);
} }), _({ mounted(e, t) {
	typeof t.value == "function" ? ue(e, t.value) : ue(e, ...t.value);
} }), _({ mounted(e, t) {
	let [n, r] = typeof t.value == "function" ? [t.value, {}] : t.value, i = Me(h(a(e, r)), "stop");
	m(i, (e) => n(e));
} }), _({ mounted(e, t) {
	typeof t.value == "function" ? $e(e, t.value) : $e(e, ...t.value);
} }), _({ mounted(e, t) {
	if (typeof t.value == "function") {
		let n = t.value, r = fe(e, {
			onScroll() {
				n(r);
			},
			onStop() {
				n(r);
			}
		});
	} else {
		let [n, r] = t.value, i = fe(e, {
			...r,
			onScroll(e) {
				var t;
				(t = r.onScroll) == null || t.call(r, e), n(i);
			},
			onStop(e) {
				var t;
				(t = r.onStop) == null || t.call(r, e), n(i);
			}
		});
	}
} });
function _n() {
	let e = !1, t = T(!1);
	return _((n, r) => {
		if (t.value = r.value, e) return;
		e = !0;
		let i = u(n, r.value);
		m(t, (e) => i.value = e);
	});
}
_n();
// node_modules/unist-builder/lib/index.js
function Z(e, t, n) {
	let r = { type: String(e) };
	return n == null && (typeof t == "string" || Array.isArray(t)) ? n = t : Object.assign(r, t), Array.isArray(n) ? r.children = n : n != null && (r.value = String(n)), r;
}
// node_modules/@nextcloud/vue/dist/chunks/autolink.mjs
var vn = ["href"], yn = /* @__PURE__ */ E(/* @__PURE__ */ qe({
	__name: "NcRichTextExternalLink",
	props: {
		href: {},
		decorateExternal: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		return (t, n) => (z(), N("a", {
			href: e.href,
			rel: "noopener noreferrer",
			target: "_blank",
			class: F([t.$style.externalLink, { [t.$style.externalLink_decorated]: e.decorateExternal }])
		}, [R(t.$slots, "default", {}, () => [je(P(e.href), 1)])], 10, vn));
	}
}), [["__cssModules", { $style: {
	"material-design-icon": "_material-design-icon_fVNS6",
	externalLink: "_externalLink_CE9eQ",
	externalLink_decorated: "_externalLink_decorated_pI-iA"
} }]]), bn = /(\s|^)(https?:\/\/)([-A-Z0-9+_.]+(?::[0-9]+)?(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*)(\s|$)/gi, xn = /(\s|\(|^)((https?:\/\/)([-A-Z0-9+_.]+[-A-Z0-9]+(?::[0-9]+)?(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*))(?=\s|\)|$)/gi;
function Sn({ autolink: e, useMarkdown: t, useExtendedMarkdown: n }) {
	return function(r) {
		!n && t && e && at(r, (e) => e.type === "text", (e, t) => {
			if (t.some((e) => e.type === "link" || e.type === "linkReference")) return;
			let n = t.at(-1), r = n.children.indexOf(e) ?? 0, i = Cn(e.value), a = typeof i == "string" ? [Z("text", i)] : i.map((e) => typeof e == "string" ? Z("text", e) : Z("link", { url: e.props.href }, [Z("text", e.props.href)])).filter((e) => e).flat();
			return n.children.splice(r, 1, ...a), [ot, r + a.length];
		});
	};
}
function Cn(e) {
	let t = xn.exec(e), n = [], r = 0;
	for (; t !== null;) {
		let i = t[2], a, o = e.substring(r, t.index + t[1].length);
		i[0] === " " && (o += i[0], i = i.substring(1).trim());
		let s = i[i.length - 1];
		(s === "." || s === "," || s === ";" || t[0][0] === "(" && s === ")") && (i = i.substring(0, i.length - 1), a = s), n.push(o), n.push({
			component: yn,
			props: {
				href: i.trim(),
				decorateExternal: !0
			}
		}), a && n.push(a), r = t.index + t[0].length, t = xn.exec(e);
	}
	return n.push(e.substring(r)), e === n.map((e) => typeof e == "string" ? e : e.props.href).join("") ? n : (w.error("[NcRichText] Failed to reassemble the chunked text: " + e), e);
}
function Q(e, t) {
	let n = (e, t) => e.startsWith(t) ? e.slice(t.length) : e, r = (e, ...t) => t.reduce((e, t) => n(e, t), e);
	if (!e) return null;
	let i = /^https?:\/\//.test(t), a = /^[a-z][a-z0-9+.-]*:.+/.test(t);
	if (!i && a || i && !t.startsWith(Te()) || !i && !t.startsWith("/")) return null;
	let o = r(i ? r(t, Te(), "/index.php") : t, r(e.options.history.base, De(), "/index.php")) || "/", s = e.resolve(o);
	return s.matched.length ? s.fullPath : null;
}
// node_modules/@nextcloud/vue/dist/functions/contactsMenu/index.mjs
function wn(e) {
	return window._nc_contacts_menu_hooks ? Object.values(window._nc_contacts_menu_hooks).filter((t) => t.enabled(e)) : [];
}
// node_modules/ts-md5/dist/index.es.js
var Tn = /* @__PURE__ */ new Int32Array(4), En = class e {
	static hashStr(e, t = !1) {
		return this.onePassHasher.start().appendStr(e).end(t);
	}
	static hashAsciiStr(e, t = !1) {
		return this.onePassHasher.start().appendAsciiStr(e).end(t);
	}
	static stateIdentity = new Int32Array([
		1732584193,
		-271733879,
		-1732584194,
		271733878
	]);
	static buffer32Identity = new Int32Array([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]);
	static hexChars = "0123456789abcdef";
	static hexOut = [];
	static onePassHasher = new e();
	static _hex(t) {
		let n = e.hexChars, r = e.hexOut, i, a, o, s = 0;
		for (; s < 4; s += 1) for (a = s * 8, i = t[s], o = 0; o < 8; o += 2) r[a + 1 + o] = n.charAt(i & 15), i >>>= 4, r[a + 0 + o] = n.charAt(i & 15), i >>>= 4;
		return r.join("");
	}
	static _md5cycle(e, t) {
		let n = e[0], r = e[1], i = e[2], a = e[3];
		n += (r & i | ~r & a) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + r | 0, a += (n & r | ~n & i) + t[1] - 389564586 | 0, a = (a << 12 | a >>> 20) + n | 0, i += (a & n | ~a & r) + t[2] + 606105819 | 0, i = (i << 17 | i >>> 15) + a | 0, r += (i & a | ~i & n) + t[3] - 1044525330 | 0, r = (r << 22 | r >>> 10) + i | 0, n += (r & i | ~r & a) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + r | 0, a += (n & r | ~n & i) + t[5] + 1200080426 | 0, a = (a << 12 | a >>> 20) + n | 0, i += (a & n | ~a & r) + t[6] - 1473231341 | 0, i = (i << 17 | i >>> 15) + a | 0, r += (i & a | ~i & n) + t[7] - 45705983 | 0, r = (r << 22 | r >>> 10) + i | 0, n += (r & i | ~r & a) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + r | 0, a += (n & r | ~n & i) + t[9] - 1958414417 | 0, a = (a << 12 | a >>> 20) + n | 0, i += (a & n | ~a & r) + t[10] - 42063 | 0, i = (i << 17 | i >>> 15) + a | 0, r += (i & a | ~i & n) + t[11] - 1990404162 | 0, r = (r << 22 | r >>> 10) + i | 0, n += (r & i | ~r & a) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + r | 0, a += (n & r | ~n & i) + t[13] - 40341101 | 0, a = (a << 12 | a >>> 20) + n | 0, i += (a & n | ~a & r) + t[14] - 1502002290 | 0, i = (i << 17 | i >>> 15) + a | 0, r += (i & a | ~i & n) + t[15] + 1236535329 | 0, r = (r << 22 | r >>> 10) + i | 0, n += (r & a | i & ~a) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + r | 0, a += (n & i | r & ~i) + t[6] - 1069501632 | 0, a = (a << 9 | a >>> 23) + n | 0, i += (a & r | n & ~r) + t[11] + 643717713 | 0, i = (i << 14 | i >>> 18) + a | 0, r += (i & n | a & ~n) + t[0] - 373897302 | 0, r = (r << 20 | r >>> 12) + i | 0, n += (r & a | i & ~a) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + r | 0, a += (n & i | r & ~i) + t[10] + 38016083 | 0, a = (a << 9 | a >>> 23) + n | 0, i += (a & r | n & ~r) + t[15] - 660478335 | 0, i = (i << 14 | i >>> 18) + a | 0, r += (i & n | a & ~n) + t[4] - 405537848 | 0, r = (r << 20 | r >>> 12) + i | 0, n += (r & a | i & ~a) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + r | 0, a += (n & i | r & ~i) + t[14] - 1019803690 | 0, a = (a << 9 | a >>> 23) + n | 0, i += (a & r | n & ~r) + t[3] - 187363961 | 0, i = (i << 14 | i >>> 18) + a | 0, r += (i & n | a & ~n) + t[8] + 1163531501 | 0, r = (r << 20 | r >>> 12) + i | 0, n += (r & a | i & ~a) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + r | 0, a += (n & i | r & ~i) + t[2] - 51403784 | 0, a = (a << 9 | a >>> 23) + n | 0, i += (a & r | n & ~r) + t[7] + 1735328473 | 0, i = (i << 14 | i >>> 18) + a | 0, r += (i & n | a & ~n) + t[12] - 1926607734 | 0, r = (r << 20 | r >>> 12) + i | 0, n += (r ^ i ^ a) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + r | 0, a += (n ^ r ^ i) + t[8] - 2022574463 | 0, a = (a << 11 | a >>> 21) + n | 0, i += (a ^ n ^ r) + t[11] + 1839030562 | 0, i = (i << 16 | i >>> 16) + a | 0, r += (i ^ a ^ n) + t[14] - 35309556 | 0, r = (r << 23 | r >>> 9) + i | 0, n += (r ^ i ^ a) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + r | 0, a += (n ^ r ^ i) + t[4] + 1272893353 | 0, a = (a << 11 | a >>> 21) + n | 0, i += (a ^ n ^ r) + t[7] - 155497632 | 0, i = (i << 16 | i >>> 16) + a | 0, r += (i ^ a ^ n) + t[10] - 1094730640 | 0, r = (r << 23 | r >>> 9) + i | 0, n += (r ^ i ^ a) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + r | 0, a += (n ^ r ^ i) + t[0] - 358537222 | 0, a = (a << 11 | a >>> 21) + n | 0, i += (a ^ n ^ r) + t[3] - 722521979 | 0, i = (i << 16 | i >>> 16) + a | 0, r += (i ^ a ^ n) + t[6] + 76029189 | 0, r = (r << 23 | r >>> 9) + i | 0, n += (r ^ i ^ a) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + r | 0, a += (n ^ r ^ i) + t[12] - 421815835 | 0, a = (a << 11 | a >>> 21) + n | 0, i += (a ^ n ^ r) + t[15] + 530742520 | 0, i = (i << 16 | i >>> 16) + a | 0, r += (i ^ a ^ n) + t[2] - 995338651 | 0, r = (r << 23 | r >>> 9) + i | 0, n += (i ^ (r | ~a)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + r | 0, a += (r ^ (n | ~i)) + t[7] + 1126891415 | 0, a = (a << 10 | a >>> 22) + n | 0, i += (n ^ (a | ~r)) + t[14] - 1416354905 | 0, i = (i << 15 | i >>> 17) + a | 0, r += (a ^ (i | ~n)) + t[5] - 57434055 | 0, r = (r << 21 | r >>> 11) + i | 0, n += (i ^ (r | ~a)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + r | 0, a += (r ^ (n | ~i)) + t[3] - 1894986606 | 0, a = (a << 10 | a >>> 22) + n | 0, i += (n ^ (a | ~r)) + t[10] - 1051523 | 0, i = (i << 15 | i >>> 17) + a | 0, r += (a ^ (i | ~n)) + t[1] - 2054922799 | 0, r = (r << 21 | r >>> 11) + i | 0, n += (i ^ (r | ~a)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + r | 0, a += (r ^ (n | ~i)) + t[15] - 30611744 | 0, a = (a << 10 | a >>> 22) + n | 0, i += (n ^ (a | ~r)) + t[6] - 1560198380 | 0, i = (i << 15 | i >>> 17) + a | 0, r += (a ^ (i | ~n)) + t[13] + 1309151649 | 0, r = (r << 21 | r >>> 11) + i | 0, n += (i ^ (r | ~a)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + r | 0, a += (r ^ (n | ~i)) + t[11] - 1120210379 | 0, a = (a << 10 | a >>> 22) + n | 0, i += (n ^ (a | ~r)) + t[2] + 718787259 | 0, i = (i << 15 | i >>> 17) + a | 0, r += (a ^ (i | ~n)) + t[9] - 343485551 | 0, r = (r << 21 | r >>> 11) + i | 0, e[0] = n + e[0] | 0, e[1] = r + e[1] | 0, e[2] = i + e[2] | 0, e[3] = a + e[3] | 0;
	}
	_dataLength = 0;
	_bufferLength = 0;
	_state = /* @__PURE__ */ new Int32Array(4);
	_buffer = /* @__PURE__ */ new ArrayBuffer(68);
	_buffer8;
	_buffer32;
	constructor() {
		this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
	}
	start() {
		return this._dataLength = 0, this._bufferLength = 0, this._state.set(e.stateIdentity), this;
	}
	appendStr(t) {
		let n = this._buffer8, r = this._buffer32, i = this._bufferLength, a, o = 0;
		for (; o < t.length; o += 1) {
			if (a = t.charCodeAt(o), a < 128) n[i++] = a;
			else if (a < 2048) n[i++] = (a >>> 6) + 192, n[i++] = a & 63 | 128;
			else if (a < 55296 || a > 56319) n[i++] = (a >>> 12) + 224, n[i++] = a >>> 6 & 63 | 128, n[i++] = a & 63 | 128;
			else {
				if (a = (a - 55296) * 1024 + (t.charCodeAt(++o) - 56320) + 65536, a > 1114111) throw Error("Unicode standard supports code points up to U+10FFFF");
				n[i++] = (a >>> 18) + 240, n[i++] = a >>> 12 & 63 | 128, n[i++] = a >>> 6 & 63 | 128, n[i++] = a & 63 | 128;
			}
			i >= 64 && (this._dataLength += 64, e._md5cycle(this._state, r), i -= 64, r[0] = r[16]);
		}
		return this._bufferLength = i, this;
	}
	appendAsciiStr(t) {
		let n = this._buffer8, r = this._buffer32, i = this._bufferLength, a, o = 0;
		for (;;) {
			for (a = Math.min(t.length - o, 64 - i); a--;) n[i++] = t.charCodeAt(o++);
			if (i < 64) break;
			this._dataLength += 64, e._md5cycle(this._state, r), i = 0;
		}
		return this._bufferLength = i, this;
	}
	appendByteArray(t) {
		let n = this._buffer8, r = this._buffer32, i = this._bufferLength, a, o = 0;
		for (;;) {
			for (a = Math.min(t.length - o, 64 - i); a--;) n[i++] = t[o++];
			if (i < 64) break;
			this._dataLength += 64, e._md5cycle(this._state, r), i = 0;
		}
		return this._bufferLength = i, this;
	}
	getState() {
		let e = this._state;
		return {
			buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
			buflen: this._bufferLength,
			length: this._dataLength,
			state: [
				e[0],
				e[1],
				e[2],
				e[3]
			]
		};
	}
	setState(e) {
		let t = e.buffer, n = e.state, r = this._state, i;
		for (this._dataLength = e.length, this._bufferLength = e.buflen, r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], i = 0; i < t.length; i += 1) this._buffer8[i] = t.charCodeAt(i);
	}
	end(t = !1) {
		let n = this._bufferLength, r = this._buffer8, i = this._buffer32, a = (n >> 2) + 1;
		this._dataLength += n;
		let o = this._dataLength * 8;
		if (r[n] = 128, r[n + 1] = r[n + 2] = r[n + 3] = 0, i.set(e.buffer32Identity.subarray(a), a), n > 55 && (e._md5cycle(this._state, i), i.set(e.buffer32Identity)), o <= 4294967295) i[14] = o;
		else {
			let e = o.toString(16).match(/(.*?)(.{0,8})$/);
			if (e === null) return t ? Tn : "";
			let n = parseInt(e[2], 16), r = parseInt(e[1], 16) || 0;
			i[14] = n, i[15] = r;
		}
		return e._md5cycle(this._state, i), t ? this._state : e._hex(this._state);
	}
};
if (En.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592") throw Error("Md5 self test failed.");
// node_modules/@nextcloud/vue/dist/chunks/colors.mjs
l(pe);
var $ = class {
	constructor(e, t, n, r) {
		this.r = e, this.g = t, this.b = n, this.name = r, this.r = Math.min(e, 255), this.g = Math.min(t, 255), this.b = Math.min(n, 255), this.name = r;
	}
	r;
	g;
	b;
	name;
	get color() {
		let e = (e) => `00${e.toString(16)}`.slice(-2);
		return `#${e(this.r)}${e(this.g)}${e(this.b)}`;
	}
};
function Dn(e, t, n) {
	return {
		r: (n.r - t.r) / e,
		g: (n.g - t.g) / e,
		b: (n.b - t.b) / e
	};
}
function On(e, t, n) {
	let r = [];
	r.push(t);
	let i = Dn(e, t, n);
	for (let n = 1; n < e; n++) {
		let e = Math.floor(t.r + i.r * n), a = Math.floor(t.g + i.g * n), o = Math.floor(t.b + i.b * n);
		r.push(new $(e, a, o));
	}
	return r;
}
var kn = new $(182, 70, 157, v("Purple")), An = new $(221, 203, 85, v("Gold")), jn = new $(0, 130, 201, v("Nextcloud blue")), Mn = new $(0, 0, 0, v("Black")), Nn = new $(255, 255, 255, v("White")), Pn = [
	kn,
	new $(191, 103, 139, v("Rosy brown")),
	new $(201, 136, 121, v("Feldspar")),
	new $(211, 169, 103, v("Whiskey")),
	An,
	new $(165, 184, 114, v("Olivine")),
	new $(110, 166, 143, v("Acapulco")),
	new $(55, 148, 172, v("Boston Blue")),
	jn,
	new $(45, 115, 190, v("Mariner")),
	new $(91, 100, 179, v("Blue Violet")),
	new $(136, 85, 168, v("Deluge"))
];
function Fn(e) {
	let t = On(e, kn, An), n = On(e, An, jn), r = On(e, jn, kn);
	return t.concat(n).concat(r);
}
// node_modules/@nextcloud/vue/dist/functions/usernameToColor/index.mjs
function In(e) {
	let t = e;
	e.match(/^([0-9a-f]{4}-?){8}$/) === null && (t = En.hashStr(e)), t = t.replace(/[^0-9a-f]/g, "");
	let n = 0;
	for (let e = 0; e < t.length; e++) n += parseInt(t.charAt(e), 16);
	return n;
}
function Ln(e) {
	let t = Fn(6);
	return t[In(e.toLocaleLowerCase()) % t.length];
}
// node_modules/striptags/src/striptags.js
var Rn = /* @__PURE__ */ e(((e, t, n) => {
	(function(e) {
		if (typeof n != "function") {
			var n = function(e) {
				return e;
			};
			n.nonNative = !0;
		}
		let r = n("plaintext"), i = n("html"), a = n("comment"), o = /<(\w*)>/g, s = /<\/?([^\s\/>]+)/;
		function c(e, t, n) {
			e ||= "", t ||= [], n ||= "";
			let r = u(t, n);
			return d(e, r);
		}
		function l(e, t) {
			e ||= [], t ||= "";
			let n = u(e, t);
			return function(e) {
				return d(e || "", n);
			};
		}
		c.init_streaming_mode = l;
		function u(e, t) {
			return e = f(e), {
				allowable_tags: e,
				tag_replacement: t,
				state: r,
				tag_buffer: "",
				depth: 0,
				in_quote_char: ""
			};
		}
		function d(e, t) {
			if (typeof e != "string") throw TypeError("'html' parameter must be a string");
			let n = t.allowable_tags, o = t.tag_replacement, s = t.state, c = t.tag_buffer, l = t.depth, u = t.in_quote_char, d = "";
			for (let t = 0, f = e.length; t < f; t++) {
				let f = e[t];
				if (s === r) switch (f) {
					case "<":
						s = i, c += f;
						break;
					default: d += f;
				}
				else if (s === i) switch (f) {
					case "<":
						if (u) break;
						l++;
						break;
					case ">":
						if (u) break;
						if (l) {
							l--;
							break;
						}
						u = "", s = r, c += ">", n.has(p(c)) ? d += c : d += o, c = "";
						break;
					case "\"":
					case "'":
						f === u ? u = "" : u ||= f, c += f;
						break;
					case "-":
						c === "<!-" && (s = a), c += f;
						break;
					case " ":
					case "\n":
						if (c === "<") {
							s = r, d += "< ", c = "";
							break;
						}
						c += f;
						break;
					default: c += f;
				}
				else if (s === a) switch (f) {
					case ">":
						c.slice(-2) == "--" && (s = r), c = "";
						break;
					default: c += f;
				}
			}
			return t.state = s, t.tag_buffer = c, t.depth = l, t.in_quote_char = u, d;
		}
		function f(e) {
			let t = /* @__PURE__ */ new Set();
			if (typeof e == "string") {
				let n;
				for (; n = o.exec(e);) t.add(n[1]);
			} else !n.nonNative && typeof e[n.iterator] == "function" ? t = new Set(e) : typeof e.forEach == "function" && e.forEach(t.add, t);
			return t;
		}
		function p(e) {
			let t = s.exec(e);
			return t ? t[1].toLowerCase() : null;
		}
		typeof define == "function" && define.amd ? define(function() {
			return c;
		}) : typeof t == "object" && t.exports ? t.exports = c : e.striptags = c;
	})(n);
}));
Be(), Rn();
// node_modules/@nextcloud/vue/dist/chunks/NcMentionBubble.vue_vue_type_style_index_0_scoped_3c4a673d_lang.mjs
function zn(e, t) {
	return Ke(e, {
		size: t?.size,
		isGuestUser: t?.isGuest,
		isDarkTheme: t?.isDarkTheme ?? ze(document.body),
		guestFallback: !0,
		version: t?.version
	});
}
// node_modules/@nextcloud/vue/dist/chunks/NcUserStatusIcon.mjs
var Bn = "<!--\n  - SPDX-FileCopyrightText: 2020 Google Inc.\n  - SPDX-License-Identifier: Apache-2.0\n-->\n<svg viewBox=\"0 -960 960 960\" width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\">\n	<path\n		fill=\"var(--user-status-color-away, var(--color-warning, #C88800))\"\n		d=\"m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z\"/>\n</svg>\n", Vn = "<!--\n  - SPDX-FileCopyrightText: 2020 Google Inc.\n  - SPDX-License-Identifier: Apache-2.0\n-->\n<svg viewBox=\"0 -960 960 960\" width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\">\n	<path\n		fill=\"var(--user-status-color-busy, var(--color-error, #DB0606))\"\n		d=\"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z\"/>\n</svg>\n", Hn = "<!--\n  - SPDX-FileCopyrightText: 2020 Google Inc.\n  - SPDX-License-Identifier: Apache-2.0\n-->\n<svg viewBox=\"0 -960 960 960\" width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\">\n	<path\n		fill=\"var(--user-status-color-busy, var(--color-error, #DB0606))\"\n		d=\"M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z\"/>\n</svg>\n", Un = "<!--\n  - SPDX-FileCopyrightText: 2020 Google Inc.\n  - SPDX-License-Identifier: Apache-2.0\n-->\n<svg viewBox=\"0 -960 960 960\" width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\">\n	<path\n		fill=\"var(--user-status-color-offline, var(--color-text-maxcontrast, #6B6B6B))\"\n		d=\"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z\"/>\n</svg>\n", Wn = "<!--\n  - SPDX-FileCopyrightText: 2020 Google Inc.\n  - SPDX-License-Identifier: Apache-2.0\n-->\n<svg viewBox=\"0 -960 960 960\" width=\"24px\" height=\"24px\" xmlns=\"http://www.w3.org/2000/svg\">\n	<path\n		fill=\"var(--user-status-color-online, var(--color-success, #2D7B41))\"\n		d=\"m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z\"/>\n</svg>\n";
l(ge), l(Fe);
function Gn(e) {
	switch (e) {
		case "away": return v("away");
		case "busy": return v("busy");
		case "dnd": return v("do not disturb");
		case "online": return v("online");
		case "invisible": return v("invisible");
		case "offline": return v("offline");
		default: return e;
	}
}
var Kn = [
	"aria-hidden",
	"aria-label",
	"innerHTML"
], qn = /* @__PURE__ */ E(/* @__PURE__ */ qe({
	__name: "NcUserStatusIcon",
	props: /* @__PURE__ */ Ue({
		user: { default: void 0 },
		ariaHidden: {
			type: [Boolean, String],
			default: !1
		}
	}, {
		status: {},
		statusModifiers: {}
	}),
	emits: ["update:status"],
	setup(e) {
		let t = Pe(e, "status"), n = e, r = y(() => t.value && ["invisible", "offline"].includes(t.value)), i = y(() => t.value && (!n.ariaHidden || n.ariaHidden === "false") ? v("User status: {status}", { status: Gn(t.value) }) : void 0);
		m(() => n.user, async (e) => {
			if (!t.value && e && we()?.user_status?.enabled) try {
				let { data: n } = await L.get(Se("/apps/user_status/api/v1/statuses/{user}", { user: e }));
				t.value = n.ocs?.data?.status;
			} catch (e) {
				w.debug("Error while fetching user status", { error: e });
			}
		}, { immediate: !0 });
		let a = {
			online: Wn,
			away: Bn,
			busy: Vn,
			dnd: Hn,
			invisible: Un,
			offline: Un
		}, o = y(() => t.value && a[t.value]);
		return (e, n) => t.value ? (z(), N("span", {
			key: 0,
			class: F(["user-status-icon", { "user-status-icon--invisible": r.value }]),
			"aria-hidden": !i.value || void 0,
			"aria-label": i.value,
			role: "img",
			innerHTML: o.value
		}, null, 10, Kn)) : I("", !0);
	}
}), [["__scopeId", "data-v-881a79fb"]]), Jn = {
	name: "NcActionText",
	mixins: [Ee],
	inject: { isInSemanticMenu: {
		from: Ye,
		default: !1
	} }
}, Yn = ["role"], Xn = {
	key: 0,
	class: "action-text__longtext-wrapper"
}, Zn = { class: "action-text__name" }, Qn = ["textContent"], $n = ["textContent"], er = {
	key: 2,
	class: "action-text__text"
};
function tr(e, t, r, i, a, o) {
	return z(), N("li", {
		class: "action",
		role: o.isInSemanticMenu && "presentation"
	}, [n("span", {
		class: "action-text",
		onClick: t[0] ||= (...t) => e.onClick && e.onClick(...t)
	}, [
		R(e.$slots, "icon", {}, () => [e.icon === "" ? I("", !0) : (z(), N("span", {
			key: 0,
			"aria-hidden": "true",
			class: F(["action-text__icon", [e.isIconUrl ? "action-text__icon--url" : e.icon]]),
			style: D({ backgroundImage: e.isIconUrl ? `url(${e.icon})` : null })
		}, null, 6))], !0),
		e.name ? (z(), N("span", Xn, [n("strong", Zn, P(e.name), 1), n("span", {
			class: "action-text__longtext",
			textContent: P(e.text)
		}, null, 8, Qn)])) : e.isLongText ? (z(), N("span", {
			key: 1,
			class: "action-text__longtext",
			textContent: P(e.text)
		}, null, 8, $n)) : (z(), N("span", er, P(e.text), 1)),
		I("", !0)
	])], 8, Yn);
}
var nr = /* @__PURE__ */ E(Jn, [["render", tr], ["__scopeId", "data-v-fa684b48"]]);
// node_modules/@nextcloud/vue/dist/chunks/NcAvatar.mjs
l(i);
var rr = {
	data() {
		return {
			hasStatus: !1,
			userStatus: {
				status: null,
				message: null,
				icon: null
			}
		};
	},
	methods: {
		async fetchUserStatus(e) {
			if (!e) return;
			let t = we();
			if (Object.hasOwn(t, "user_status") && t.user_status.enabled && C()) try {
				let { data: t } = await L.get(Se("apps/user_status/api/v1/statuses/{userId}", { userId: e }));
				this.setUserStatus(t.ocs.data);
			} catch (e) {
				if (e.response.status === 404 && e.response.data.ocs?.data?.length === 0) return;
				w.error("Failed to fetch user status", { error: e });
			}
		},
		setUserStatus({ status: e, message: t, icon: n }) {
			this.userStatus.status = e || "", this.userStatus.message = t || "", this.userStatus.icon = n || "", this.hasStatus = !!e;
		}
	}
}, ir = ne("nextcloud").persist().build(), ar = 1.5;
function or(e) {
	return Number(e.toFixed(3));
}
function sr(e) {
	let t = ir.getItem("user-has-avatar." + e);
	return typeof t == "string" ? !!t : null;
}
function cr(e, t) {
	e && ir.setItem("user-has-avatar." + e, t);
}
var lr = {
	name: "NcAvatar",
	directives: { ClickOutside: dn },
	components: {
		IconDotsHorizontal: ee,
		NcActions: re,
		NcButton: Oe,
		NcIconSvgWrapper: Ae,
		NcLoadingIcon: p,
		NcPopover: it,
		NcProfileHoverCard: Ve(() => import("./NcProfileHoverCard-iv3KJoqU.chunk.mjs").then((e) => e.t)),
		NcUserStatusIcon: qn
	},
	mixins: [rr],
	props: {
		url: {
			type: String,
			default: void 0
		},
		iconClass: {
			type: String,
			default: void 0
		},
		user: {
			type: String,
			default: void 0
		},
		hideStatus: {
			type: Boolean,
			default: !1
		},
		verboseStatus: {
			type: Boolean,
			default: !1
		},
		preloadedUserStatus: {
			type: Object,
			default: void 0
		},
		isGuest: {
			type: Boolean,
			default: !1
		},
		version: {
			type: [String, Number],
			default: void 0
		},
		displayName: {
			type: String,
			default: void 0
		},
		size: {
			type: Number,
			default: 32
		},
		noPlaceholder: {
			type: Boolean,
			default: !1
		},
		disableTooltip: {
			type: Boolean,
			default: !1
		},
		disableMenu: {
			type: Boolean,
			default: !1
		},
		tooltipMessage: {
			type: String,
			default: null
		},
		isNoUser: {
			type: Boolean,
			default: !1
		},
		menuContainer: {
			type: [Boolean, String],
			default: "body"
		}
	},
	setup() {
		return {
			isDarkTheme: ve(),
			isLegacy35: xe
		};
	},
	data() {
		return {
			avatarUrlLoaded: null,
			avatarSrcSetLoaded: null,
			userDoesNotExist: !1,
			isAvatarLoaded: !1,
			isMenuLoaded: !1,
			contactsMenuLoading: !1,
			contactsMenuData: {},
			contactsMenuActions: [],
			contactsMenuOpenState: !1
		};
	},
	computed: {
		avatarAriaLabel() {
			if (this.hasMenu) return this.canDisplayUserStatus || this.showUserStatusIconOnAvatar ? v("Avatar of {displayName}, {status}", {
				displayName: this.displayName ?? this.user,
				status: Gn(this.userStatus.status)
			}) : v("Avatar of {displayName}", { displayName: this.displayName ?? this.user });
		},
		canDisplayUserStatus() {
			return !this.hideStatus && this.hasStatus && [
				"online",
				"away",
				"busy",
				"dnd"
			].includes(this.userStatus.status);
		},
		showUserStatusIconOnAvatar() {
			return !this.hideStatus && !this.verboseStatus && this.hasStatus && this.userStatus.status !== "dnd" && this.userStatus.icon;
		},
		userIdentifier() {
			return this.isDisplayNameDefined ? this.displayName : this.isUserDefined ? this.user : "";
		},
		isUserDefined() {
			return this.user !== void 0;
		},
		isDisplayNameDefined() {
			return this.displayName !== void 0;
		},
		isUrlDefined() {
			return this.url !== void 0;
		},
		hasMenu() {
			return this.disableMenu ? !1 : this.isLegacy35 ? this.isMenuLoaded ? this.menu.length > 0 : !(this.user === C()?.uid || this.userDoesNotExist || this.url) : !!this.user && !this.isNoUser && !this.url && !this.userDoesNotExist;
		},
		showInitials() {
			return !this.noPlaceholder && this.userDoesNotExist && !(this.iconClass || this.$slots.icon);
		},
		avatarStyle() {
			return {
				"--avatar-size": this.size + "px",
				lineHeight: this.showInitials ? this.size + "px" : 0,
				fontSize: Math.round(this.size * .45) + "px"
			};
		},
		initialsWrapperStyle() {
			let { r: e, g: t, b: n } = Ln(this.userIdentifier);
			return { backgroundColor: `rgba(${e}, ${t}, ${n}, 0.1)` };
		},
		initialsStyle() {
			let { r: e, g: t, b: n } = Ln(this.userIdentifier);
			return { color: `rgb(${e}, ${t}, ${n})` };
		},
		tooltip() {
			return this.disableTooltip ? null : this.tooltipMessage ? this.tooltipMessage : this.displayName;
		},
		initials() {
			let e = "?";
			if (this.showInitials) {
				let t = this.userIdentifier.trim();
				if (t === "") return e;
				let n = t.match(/[\p{L}\p{N}\s]/gu);
				if (!n) return e;
				let r = n.join("").trim(), i = r.lastIndexOf(" ");
				e = String.fromCodePoint(r.codePointAt(0)), i !== -1 && (e = e.concat(String.fromCodePoint(r.codePointAt(i + 1))));
			}
			return e.toLocaleUpperCase();
		},
		hoverCardActions() {
			return this.isLegacy35 || !this.isMenuLoaded ? null : this.menu.length > 0 ? this.menu : null;
		},
		hoverCardDisplayName() {
			return this.displayName || this.contactsMenuData?.fullName || void 0;
		},
		hoverCardPreloadedUserStatus() {
			if (this.preloadedUserStatus || this.userStatus.status || this.userStatus.icon || this.userStatus.message) return this.userStatus;
		},
		menu() {
			if (this.isLegacy35) return this.legacyMenu;
			let e = this.contactsMenuActions.map((e) => {
				let t = Q(this.$router, e.hyperlink);
				return {
					id: e.id,
					appId: e.appId,
					text: e.title,
					href: t ? void 0 : e.hyperlink,
					to: t || void 0,
					icon: e.icon
				};
			});
			for (let t of wn(this.contactsMenuData)) try {
				e.push({
					id: t.id,
					text: t.displayName(this.contactsMenuData),
					iconSvg: t.iconSvg(this.contactsMenuData),
					onClick: () => t.callback(this.contactsMenuData)
				});
			} catch (e) {
				w.error(`Failed to render ContactsMenu action ${t.id}`, {
					error: e,
					action: t
				});
			}
			return e;
		},
		legacyMenu() {
			let e = this.contactsMenuActions.map((e) => {
				let t = Q(this.$router, e.hyperlink);
				return {
					ncActionComponent: t ? Je : Re,
					ncActionComponentProps: t ? {
						to: t,
						icon: e.icon
					} : {
						href: e.hyperlink,
						icon: e.icon
					},
					text: e.title
				};
			});
			for (let n of wn(this.contactsMenuData)) try {
				e.push({
					ncActionComponent: t,
					ncActionComponentProps: { onClick: () => n.callback(this.contactsMenuData) },
					text: n.displayName(this.contactsMenuData),
					iconSvg: n.iconSvg(this.contactsMenuData)
				});
			} catch (e) {
				w.error(`Failed to render ContactsMenu action ${n.id}`, {
					error: e,
					action: n
				});
			}
			function n(e) {
				let t = document.createTextNode(e), n = document.createElement("p");
				return n.appendChild(t), n.innerHTML;
			}
			if (!this.hideStatus && (this.userStatus.icon || this.userStatus.message)) {
				let t = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					<text x="50%" y="50%" text-anchor="middle" style="dominant-baseline: central; font-size: 85%">${n(this.userStatus.icon)}</text>
				</svg>`;
				return [{
					ncActionComponent: nr,
					ncActionComponentProps: {},
					iconSvg: this.userStatus.icon ? t : void 0,
					text: `${this.userStatus.message}`
				}].concat(e);
			}
			return e;
		}
	},
	watch: {
		url() {
			this.userDoesNotExist = !1, this.loadAvatarUrl();
		},
		user() {
			this.userDoesNotExist = !1, this.isMenuLoaded = !1, this.loadAvatarUrl();
		},
		version: "loadAvatarUrl",
		preloadedUserStatus(e) {
			e && this.setUserStatus(e);
		},
		contactsMenuOpenState(e) {
			this.isLegacy35 || (e ? this.debouncedFetchContactsMenu() : this.debouncedFetchContactsMenu.clear());
		}
	},
	created() {
		this.debouncedFetchContactsMenu = We(this.fetchContactsMenu, 300);
	},
	mounted() {
		this.loadAvatarUrl(), b("settings:avatar:updated", this.loadAvatarUrl), b("settings:display-name:updated", this.loadAvatarUrl), !this.hideStatus && this.user && !this.isNoUser ? (this.preloadedUserStatus ? this.setUserStatus(this.preloadedUserStatus) : this.fetchUserStatus(this.user), b("user_status:status.updated", this.handleUserStatusUpdated)) : !this.hideStatus && this.preloadedUserStatus && this.setUserStatus(this.preloadedUserStatus);
	},
	beforeUnmount() {
		this.debouncedFetchContactsMenu.clear(), B("settings:avatar:updated", this.loadAvatarUrl), B("settings:display-name:updated", this.loadAvatarUrl), B("user_status:status.updated", this.handleUserStatusUpdated);
	},
	methods: {
		t: v,
		handleUserStatusUpdated(e) {
			this.user === e.userId && (this.userStatus = {
				status: e.status,
				icon: e.icon,
				message: e.message
			}, this.hasStatus = e.status !== null);
		},
		async toggleMenu(e) {
			(e.type !== "keydown" || e.key === "Enter") && (this.contactsMenuOpenState || await this.fetchContactsMenu(), this.contactsMenuOpenState = !this.contactsMenuOpenState);
		},
		closeMenu() {
			this.isLegacy35 && (this.contactsMenuOpenState = !1);
		},
		async fetchContactsMenu() {
			this.contactsMenuLoading = !0;
			try {
				let e = encodeURIComponent(this.user), { data: t } = await L.post(Xe("contactsmenu/findOne"), `shareType=0&shareWith=${e}`);
				this.contactsMenuData = t, this.contactsMenuActions = t.topAction ? [t.topAction].concat(t.actions) : t.actions;
			} catch {
				this.contactsMenuData = {}, this.contactsMenuActions = [], this.isLegacy35 && (this.contactsMenuOpenState = !1);
			}
			this.contactsMenuLoading = !1, this.isMenuLoaded = !0;
		},
		loadAvatarUrl() {
			if (this.isAvatarLoaded = !1, !this.isUrlDefined && (!this.isUserDefined || this.isNoUser || this.iconClass || this.$slots.icon)) this.isAvatarLoaded = !0, this.userDoesNotExist = !0;
			else if (this.isUrlDefined) this.updateImageIfValid(this.url);
			else if (this.size <= 64) {
				let e = this.avatarUrlGenerator(this.user, 64), t = [`${e} ${or(64 * ar / this.size)}x`, `${this.avatarUrlGenerator(this.user, 512)} ${or(512 / this.size)}x`].join(", ");
				this.updateImageIfValid(e, t);
			} else {
				let e = this.avatarUrlGenerator(this.user, 512);
				this.updateImageIfValid(e);
			}
		},
		avatarUrlGenerator(e, t) {
			let n = this.version ?? (e === C()?.uid ? window.oc_userconfig?.avatar?.version : void 0);
			return zn(e, {
				size: t,
				isDarkTheme: this.isDarkTheme,
				isGuest: this.isGuest,
				version: n
			});
		},
		updateImageIfValid(e, t = null) {
			let n = sr(this.user);
			if (this.isUserDefined && typeof n == "boolean") {
				this.isAvatarLoaded = !0, this.avatarUrlLoaded = e, t && (this.avatarSrcSetLoaded = t), n === !1 && (this.userDoesNotExist = !0);
				return;
			}
			let r = new Image();
			r.onload = () => {
				this.avatarUrlLoaded = e, t && (this.avatarSrcSetLoaded = t), this.isAvatarLoaded = !0, cr(this.user, !0);
			}, r.onerror = (t) => {
				w.debug("[NcAvatar] Invalid avatar url", {
					error: t,
					url: e
				}), this.avatarUrlLoaded = null, this.avatarSrcSetLoaded = null, this.userDoesNotExist = !0, this.isAvatarLoaded = !1, cr(this.user, !1);
			}, t && (r.srcset = t), r.src = e;
		}
	}
}, ur = ["title"], dr = ["src", "srcset"], fr = ["aria-label"], pr = {
	key: 2,
	class: "avatardiv__user-status avatardiv__user-status--icon"
};
function mr(e, t, r, i, a, o) {
	let l = S("NcLoadingIcon"), u = S("IconDotsHorizontal"), d = S("NcButton"), p = S("NcIconSvgWrapper"), m = S("NcActions"), ee = S("NcProfileHoverCard"), te = S("NcPopover"), ne = S("NcUserStatusIcon"), h = f("click-outside");
	return le((z(), N("span", {
		class: F(["avatardiv popovermenu-wrapper", {
			"avatardiv--unknown": a.userDoesNotExist,
			"avatardiv--with-menu": o.hasMenu,
			"avatardiv--with-legacy-menu": o.hasMenu && i.isLegacy35,
			"avatardiv--with-menu-loading": a.contactsMenuLoading
		}]),
		style: D(o.avatarStyle),
		title: o.tooltip
	}, [
		R(e.$slots, "icon", {}, () => [r.iconClass ? (z(), N("span", {
			key: 0,
			class: F([r.iconClass, "avatar-class-icon"])
		}, null, 2)) : a.isAvatarLoaded && !a.userDoesNotExist ? (z(), N("img", {
			key: 1,
			src: a.avatarUrlLoaded,
			srcset: a.avatarSrcSetLoaded,
			alt: ""
		}, null, 8, dr)) : I("", !0)], !0),
		i.isLegacy35 && o.hasMenu ? (z(), N(me, { key: 0 }, [o.menu.length === 0 ? (z(), k(d, {
			key: 0,
			"aria-label": o.avatarAriaLabel,
			class: "action-item action-item__menutoggle",
			variant: "tertiary-no-background",
			onClick: o.toggleMenu
		}, {
			icon: g(() => [a.contactsMenuLoading ? (z(), k(l, { key: 0 })) : (z(), k(u, {
				key: 1,
				size: 20
			}))]),
			_: 1
		}, 8, ["aria-label", "onClick"])) : (z(), k(m, {
			key: 1,
			open: a.contactsMenuOpenState,
			"onUpdate:open": t[0] ||= (e) => a.contactsMenuOpenState = e,
			"aria-label": o.avatarAriaLabel,
			container: r.menuContainer,
			forceMenu: "",
			manualOpen: "",
			variant: "tertiary-no-background",
			onClick: o.toggleMenu
		}, Ge({
			default: g(() => [(z(!0), N(me, null, s(o.menu, (e, t) => (z(), k(c(e.ncActionComponent), Le({ key: t }, { ref_for: !0 }, e.ncActionComponentProps), Ge({
				default: g(() => [je(" " + P(e.text), 1)]),
				_: 2
			}, [e.iconSvg ? {
				name: "icon",
				fn: g(() => [ye(p, { svg: e.iconSvg }, null, 8, ["svg"])]),
				key: "0"
			} : void 0]), 1040))), 128))]),
			_: 2
		}, [a.contactsMenuLoading ? {
			name: "icon",
			fn: g(() => [ye(l)]),
			key: "0"
		} : void 0]), 1032, [
			"open",
			"aria-label",
			"container",
			"onClick"
		]))], 64)) : o.hasMenu ? (z(), k(te, {
			key: 1,
			shown: a.contactsMenuOpenState,
			"onUpdate:shown": t[1] ||= (e) => a.contactsMenuOpenState = e,
			class: "avatar-profile-popover",
			container: r.menuContainer,
			delay: {
				show: 400,
				hide: 0
			},
			popoverTriggers: ["hover"],
			triggers: [
				"hover",
				"focus",
				"click"
			],
			noFocusTrap: "",
			popupRole: "dialog"
		}, {
			trigger: g(({ attrs: e }) => [n("span", Le({ class: "avatar-profile-popover__trigger" }, e, {
				role: "button",
				tabindex: "0",
				"aria-label": o.avatarAriaLabel
			}), null, 16, fr)]),
			default: g(() => [ye(ee, {
				user: r.user,
				displayName: o.hoverCardDisplayName,
				open: a.contactsMenuOpenState,
				actions: o.hoverCardActions,
				actionsLoading: a.contactsMenuLoading,
				preloadedUserStatus: o.hoverCardPreloadedUserStatus
			}, null, 8, [
				"user",
				"displayName",
				"open",
				"actions",
				"actionsLoading",
				"preloadedUserStatus"
			])]),
			_: 1
		}, 8, ["shown", "container"])) : I("", !0),
		o.showUserStatusIconOnAvatar ? (z(), N("span", pr, P(e.userStatus.icon), 1)) : o.canDisplayUserStatus ? (z(), k(ne, {
			key: 3,
			class: "avatardiv__user-status",
			status: e.userStatus.status,
			"aria-hidden": String(o.hasMenu)
		}, null, 8, ["status", "aria-hidden"])) : I("", !0),
		o.showInitials ? (z(), N("span", {
			key: 4,
			style: D(o.initialsWrapperStyle),
			class: "avatardiv__initials-wrapper"
		}, [n("span", {
			style: D(o.initialsStyle),
			class: "avatardiv__initials"
		}, P(o.initials), 5)], 4)) : I("", !0)
	], 14, ur)), [[h, o.closeMenu]]);
}
var hr = /* @__PURE__ */ E(lr, [["render", mr], ["__scopeId", "data-v-b005f1da"]]);
export { Ot as A, st as C, Rt as D, W as E, At as F, en as I, Ht as M, Qt as N, $t as O, kt as P, Jt as S, jt as T, Tt as _, yn as a, qt as b, Cn as c, on as d, It as f, St as g, U as h, Pn as i, Kt as j, Zt as k, Sn as l, Lt as m, Mn as n, bn as o, Bt as p, Nn as r, Q as s, hr as t, Z as u, nn as v, Xt as w, q as x, tn as y };
