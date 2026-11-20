import { n as e, r as t, t as n } from "./rolldown-runtime-QGRDbDUS.chunk.mjs";
import { $ as r, $n as i, Bt as a, Cr as o, Dr as s, Dt as c, F as l, Fr as u, Ht as d, Jn as f, L as p, Lr as m, Nn as h, Nr as g, Ot as _, Qn as v, S as y, Tr as b, U as x, Ut as S, V as C, Yn as w, _n as T, _r as E, ai as D, ar as O, cn as k, d as ee, ei as te, er as A, fr as j, gn as ne, hn as re, hr as ie, i as M, ir as ae, mn as oe, mr as se, n as ce, ni as N, nn as le, nr as P, nt as ue, oi as F, qn as I, qr as L, ri as de, rr as fe, sr as pe, t as me, tr as R, u as he, un as ge, ur as z, ut as _e, xr as B, y as ve, yr as ye, yt as be } from "./NcActionRouter-Ca-mCYkz.chunk.mjs";
import { a as xe, c as Se, d as Ce, l as we, o as Te, s as Ee, t as De, u as Oe } from "./NcAvatar-BhvDOBni.chunk.mjs";
import { n as ke, r as Ae, t as je } from "./lib-yRjs9Rx9.chunk.mjs";
import { t as Me } from "./public-DCNW_wOS.chunk.mjs";
// node_modules/mdast-util-to-string/lib/index.js
var Ne = {};
function Pe(e, t) {
	let n = t || Ne;
	return Fe(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function Fe(e, t, n) {
	if (Le(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return Ie(e.children, t, n);
	}
	return Array.isArray(e) ? Ie(e, t, n) : "";
}
function Ie(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = Fe(e[i], t, n);
	return r.join("");
}
function Le(e) {
	return !!(e && typeof e == "object");
}
// node_modules/@ungap/structured-clone/esm/deserialize.js
var { defineProperty: Re } = Object, ze = typeof self == "object" ? self : globalThis, Be = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new ze[e](t);
}, Ve = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) {
					let i = r(t), a = r(n);
					i === "__proto__" ? Re(e, i, {
						value: a,
						configurable: !0,
						enumerable: !0,
						writable: !0
					}) : e[i] = a;
				}
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof ze[e] == "function" ? Be(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
			case "-0": return -0;
		}
		return n(Be(a, o), i);
	};
	return r;
}, He = (e) => Ve(/* @__PURE__ */ new Map(), e)(0), Ue = "", { toString: We } = {}, { keys: Ge, is: Ke } = Object, qe = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = We.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, Ue];
		case "Object": return [2, Ue];
		case "Date": return [3, Ue];
		case "RegExp": return [4, Ue];
		case "Map": return [5, Ue];
		case "Set": return [6, Ue];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, Je = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), Ye = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (o) => {
		if (n.has(o)) return n.get(o);
		let [s, c] = qe(o);
		switch (s) {
			case 0: {
				let t = o;
				switch (c) {
					case "bigint":
						s = 8, t = o.toString();
						break;
					case "number":
						if (!o && Ke(o, -0)) return r.push(["-0"]) - 1;
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + c);
						t = null;
						break;
					case "undefined": return i([-1], o);
				}
				return i([s, t], o);
			}
			case 1: {
				if (c) {
					let e = o;
					return c === "DataView" ? e = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (e = new Uint8Array(o)), i([c, [...e]], o);
				}
				let e = [], t = i([s, e], o);
				for (let t of o) e.push(a(t));
				return t;
			}
			case 2: {
				if (c) switch (c) {
					case "BigInt": return i([c, o.toString()], o);
					case "Boolean":
					case "Number":
					case "String": return i([c, o.valueOf()], o);
				}
				if (t && "toJSON" in o) return a(o.toJSON());
				let n = [], r = i([s, n], o);
				for (let t of Ge(o)) (e || !Je(qe(o[t]))) && n.push([a(t), a(o[t])]);
				return r;
			}
			case 3: return i([s, isNaN(o.getTime()) ? Ue : o.toISOString()], o);
			case 4: {
				let { source: e, flags: t } = o;
				return i([s, {
					source: e,
					flags: t
				}], o);
			}
			case 5: {
				let t = [], n = i([s, t], o);
				for (let [n, r] of o) (e || !(Je(qe(n)) || Je(qe(r)))) && t.push([a(n), a(r)]);
				return n;
			}
			case 6: {
				let t = [], n = i([s, t], o);
				for (let n of o) (e || !Je(qe(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: l } = o;
		return i([s, {
			name: c,
			message: l
		}], o);
	};
	return a;
}, Xe = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return Ye(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, Ze = typeof structuredClone == "function" ? 
/* c8 ignore start */
(e, t) => t && ("json" in t || "lossy" in t) ? He(Xe(e, t)) : structuredClone(e) : (e, t) => He(Xe(e, t)), Qe = (function(e) {
	if (e == null) return nt;
	if (typeof e == "string") return et(e);
	if (typeof e == "object") return $e(e);
	if (typeof e == "function") return tt(e);
	throw Error("Expected function, string, or array as `test`");
});
function $e(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = Qe(e[n]);
	return tt(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function et(e) {
	return tt(t);
	function t(t) {
		return t.tagName === e;
	}
}
function tt(e) {
	return t;
	function t(t, n, r) {
		return !!(rt(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function nt(e) {
	return !!(e && typeof e == "object" && "type" in e && e.type === "element" && "tagName" in e && typeof e.tagName == "string");
}
function rt(e) {
	return typeof e == "object" && !!e && "type" in e && "tagName" in e;
}
// node_modules/is-absolute-url/index.js
var it = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, at = /^[a-zA-Z]:\\/;
function ot(e) {
	if (typeof e != "string") throw TypeError(`Expected a \`string\`, got \`${typeof e}\``);
	return !at.test(e) && it.test(e);
}
// node_modules/space-separated-tokens/index.js
function st(e) {
	let t = String(e || "").trim();
	return t ? t.split(/[ \t\n\r\f]+/g) : [];
}
function ct(e) {
	return e.join(" ").trim();
}
// node_modules/unist-util-visit/lib/index.js
function lt(e, t, n, r) {
	let i, a, o;
	typeof n == "function" || n && typeof n == "object" ? (i = t, a = n, o = r) : (a = t, o = n), typeof a == "function" ? ke(e, i, dt(a), o) : ke(e, i, ut(a), o);
}
function ut(e) {
	return !e || typeof e != "object" ? e : {
		enter: typeof e.enter == "function" ? dt(e.enter) : e.enter,
		exit: typeof e.exit == "function" ? dt(e.exit) : e.exit
	};
}
function dt(e) {
	return t;
	function t(t, n, r) {
		return e(t, r, n[n.length - 1]);
	}
}
// node_modules/rehype-external-links/lib/index.js
var ft = ["http", "https"], pt = ["nofollow"], mt = {};
function ht(e) {
	let t = e || mt, n = t.protocols || ft, r = Qe(t.test);
	return function(e) {
		lt(e, "element", function(e, i, a) {
			if (e.tagName === "a" && typeof e.properties.href == "string" && r(e, i, a)) {
				let r = e.properties.href;
				if (ot(r) ? n.includes(r.slice(0, r.indexOf(":"))) : r.startsWith("//")) {
					let n = gt(t.content, e), r = n && !Array.isArray(n) ? [n] : n, i = gt(t.rel, e) || pt, a = typeof i == "string" ? st(i) : i, o = gt(t.target, e), s = gt(t.properties, e);
					if (s && Object.assign(e.properties, Ze(s)), a.length > 0 && (e.properties.rel = [...a]), o && (e.properties.target = o), r) {
						let n = gt(t.contentProperties, e) || {};
						e.children.push({
							type: "element",
							tagName: "span",
							properties: Ze(n),
							children: Ze(r)
						});
					}
				}
			}
		});
	};
}
function gt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
// node_modules/comma-separated-tokens/index.js
function _t(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
// node_modules/devlop/lib/default.js
function vt() {}
// node_modules/estree-util-is-identifier-name/lib/index.js
var yt = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, bt = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, xt = {};
function St(e, t) {
	return ((t || xt).jsx ? bt : yt).test(e);
}
// node_modules/hast-util-whitespace/lib/index.js
var Ct = /[ \t\n\f\r]/g;
function wt(e) {
	return typeof e == "object" ? e.type === "text" && Tt(e.value) : Tt(e);
}
function Tt(e) {
	return e.replace(Ct, "") === "";
}
// node_modules/property-information/lib/util/schema.js
var Et = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
Et.prototype.normal = {}, Et.prototype.property = {}, Et.prototype.space = void 0;
// node_modules/property-information/lib/util/merge.js
function Dt(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new Et(n, r, t);
}
// node_modules/property-information/lib/normalize.js
function Ot(e) {
	return e.toLowerCase();
}
// node_modules/property-information/lib/util/info.js
var V = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
V.prototype.attribute = "", V.prototype.booleanish = !1, V.prototype.boolean = !1, V.prototype.commaOrSpaceSeparated = !1, V.prototype.commaSeparated = !1, V.prototype.defined = !1, V.prototype.mustUseProperty = !1, V.prototype.number = !1, V.prototype.overloadedBoolean = !1, V.prototype.property = "", V.prototype.spaceSeparated = !1, V.prototype.space = void 0;
// node_modules/property-information/lib/util/types.js
var kt = /* @__PURE__ */ e({
	boolean: () => H,
	booleanish: () => U,
	commaOrSpaceSeparated: () => K,
	commaSeparated: () => Mt,
	number: () => W,
	overloadedBoolean: () => jt,
	spaceSeparated: () => G
}), At = 0, H = Nt(), U = Nt(), jt = Nt(), W = Nt(), G = Nt(), Mt = Nt(), K = Nt();
function Nt() {
	return 2 ** ++At;
}
// node_modules/property-information/lib/util/defined-info.js
var Pt = Object.keys(kt), Ft = class extends V {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), It(this, "space", r), typeof n == "number") for (; ++i < Pt.length;) {
			let e = Pt[i];
			It(this, Pt[i], (n & kt[e]) === kt[e]);
		}
	}
};
Ft.prototype.defined = !0;
function It(e, t, n) {
	n && (e[t] = n);
}
// node_modules/property-information/lib/util/create.js
function Lt(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new Ft(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Ot(r)] = r, n[Ot(a.attribute)] = r;
	}
	return new Et(t, n, e.space);
}
// node_modules/property-information/lib/aria.js
var Rt = Lt({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: U,
		ariaAutoComplete: null,
		ariaBusy: U,
		ariaChecked: U,
		ariaColCount: W,
		ariaColIndex: W,
		ariaColSpan: W,
		ariaControls: G,
		ariaCurrent: null,
		ariaDescribedBy: G,
		ariaDetails: null,
		ariaDisabled: U,
		ariaDropEffect: G,
		ariaErrorMessage: null,
		ariaExpanded: U,
		ariaFlowTo: G,
		ariaGrabbed: U,
		ariaHasPopup: null,
		ariaHidden: U,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: G,
		ariaLevel: W,
		ariaLive: null,
		ariaModal: U,
		ariaMultiLine: U,
		ariaMultiSelectable: U,
		ariaOrientation: null,
		ariaOwns: G,
		ariaPlaceholder: null,
		ariaPosInSet: W,
		ariaPressed: U,
		ariaReadOnly: U,
		ariaRelevant: null,
		ariaRequired: U,
		ariaRoleDescription: G,
		ariaRowCount: W,
		ariaRowIndex: W,
		ariaRowSpan: W,
		ariaSelected: U,
		ariaSetSize: W,
		ariaSort: null,
		ariaValueMax: W,
		ariaValueMin: W,
		ariaValueNow: W,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
// node_modules/property-information/lib/util/case-sensitive-transform.js
function zt(e, t) {
	return t in e ? e[t] : t;
}
// node_modules/property-information/lib/util/case-insensitive-transform.js
function Bt(e, t) {
	return zt(e, t.toLowerCase());
}
// node_modules/property-information/lib/html.js
var Vt = Lt({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: Mt,
		acceptCharset: G,
		accessKey: G,
		action: null,
		allow: null,
		allowFullScreen: H,
		allowPaymentRequest: H,
		allowUserMedia: H,
		alpha: H,
		alt: null,
		as: null,
		async: H,
		autoCapitalize: null,
		autoComplete: G,
		autoFocus: H,
		autoPlay: H,
		blocking: G,
		capture: null,
		charSet: null,
		checked: H,
		cite: null,
		className: G,
		closedBy: null,
		colorSpace: null,
		cols: W,
		colSpan: W,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: U,
		controls: H,
		controlsList: G,
		coords: W | Mt,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: H,
		defer: H,
		dir: null,
		dirName: null,
		disabled: H,
		download: jt,
		draggable: U,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: H,
		formTarget: null,
		headers: G,
		height: W,
		hidden: jt,
		high: W,
		href: null,
		hrefLang: null,
		htmlFor: G,
		httpEquiv: G,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: H,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: H,
		itemId: null,
		itemProp: G,
		itemRef: G,
		itemScope: H,
		itemType: G,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: H,
		low: W,
		manifest: null,
		max: null,
		maxLength: W,
		media: null,
		method: null,
		min: null,
		minLength: W,
		multiple: H,
		muted: H,
		name: null,
		nonce: null,
		noModule: H,
		noValidate: H,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: H,
		optimum: W,
		pattern: null,
		ping: G,
		placeholder: null,
		playsInline: H,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: H,
		referrerPolicy: null,
		rel: G,
		required: H,
		reversed: H,
		rows: W,
		rowSpan: W,
		sandbox: G,
		scope: null,
		scoped: H,
		seamless: H,
		selected: H,
		shadowRootClonable: H,
		shadowRootCustomElementRegistry: H,
		shadowRootDelegatesFocus: H,
		shadowRootMode: null,
		shadowRootSerializable: H,
		shape: null,
		size: W,
		sizes: null,
		slot: null,
		span: W,
		spellCheck: U,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: W,
		step: null,
		style: null,
		tabIndex: W,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: H,
		useMap: null,
		value: U,
		width: W,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: G,
		axis: null,
		background: null,
		bgColor: null,
		border: W,
		borderColor: null,
		bottomMargin: W,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: H,
		declare: H,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: W,
		leftMargin: W,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: W,
		marginWidth: W,
		noResize: H,
		noHref: H,
		noShade: H,
		noWrap: H,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: W,
		rules: null,
		scheme: null,
		scrolling: U,
		standby: null,
		summary: null,
		text: null,
		topMargin: W,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: W,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: H,
		disablePictureInPicture: H,
		disableRemotePlayback: H,
		exportParts: Mt,
		part: G,
		prefix: null,
		property: null,
		results: W,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: Bt
}), Ht = Lt({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: K,
		accentHeight: W,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: W,
		amplitude: W,
		arabicForm: null,
		ascent: W,
		attributeName: null,
		attributeType: null,
		azimuth: W,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: W,
		by: null,
		calcMode: null,
		capHeight: W,
		className: G,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: W,
		diffuseConstant: W,
		direction: null,
		display: null,
		dur: null,
		divisor: W,
		dominantBaseline: null,
		download: H,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: W,
		enableBackground: null,
		end: null,
		event: null,
		exponent: W,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: W,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: Mt,
		g2: Mt,
		glyphName: Mt,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: W,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: W,
		horizOriginX: W,
		horizOriginY: W,
		id: null,
		ideographic: W,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: W,
		k: W,
		k1: W,
		k2: W,
		k3: W,
		k4: W,
		kernelMatrix: K,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: W,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: W,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: W,
		overlineThickness: W,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: W,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: G,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: W,
		pointsAtY: W,
		pointsAtZ: W,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: K,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: K,
		rev: K,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: K,
		requiredFeatures: K,
		requiredFonts: K,
		requiredFormats: K,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: W,
		specularExponent: W,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: W,
		strikethroughThickness: W,
		string: null,
		stroke: null,
		strokeDashArray: K,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: W,
		strokeOpacity: W,
		strokeWidth: null,
		style: null,
		surfaceScale: W,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: K,
		tabIndex: W,
		tableValues: null,
		target: null,
		targetX: W,
		targetY: W,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: K,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: W,
		underlineThickness: W,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: W,
		values: null,
		vAlphabetic: W,
		vMathematical: W,
		vectorEffect: null,
		vHanging: W,
		vIdeographic: W,
		version: null,
		vertAdvY: W,
		vertOriginX: W,
		vertOriginY: W,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: W,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: zt
}), Ut = Lt({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), Wt = Lt({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: Bt
}), Gt = Lt({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), Kt = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
}, qt = /[A-Z]/g, Jt = /-[a-z]/g, Yt = /^data[-\w.:]+$/i;
function Xt(e, t) {
	let n = Ot(t), r = t, i = V;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && Yt.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(Jt, Qt);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!Jt.test(e)) {
				let n = e.replace(qt, Zt);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = Ft;
	}
	return new i(r, t);
}
function Zt(e) {
	return "-" + e.toLowerCase();
}
function Qt(e) {
	return e.charAt(1).toUpperCase();
}
// node_modules/property-information/index.js
var $t = Dt([
	Rt,
	Vt,
	Ut,
	Wt,
	Gt
], "html"), en = Dt([
	Rt,
	Ht,
	Ut,
	Wt,
	Gt
], "svg"), tn = /\/\*(?:[^*]|\*(?!\/))*\*\//g, nn = /\n/g, rn = /^\s*/, an = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, on = /^:\s*/, sn = /^((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|url\((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|[^)]*)\)|[^};])+)/, cn = /^[;\s]*/, ln = "\n", un = "/", dn = "*", fn = "", pn = "comment", mn = "declaration";
function hn(e, t) {
	if (typeof e != "string") throw TypeError("First argument must be a string");
	if (!e) return [];
	t ||= {};
	var n = 1, r = 1;
	function i(e) {
		var t = e.match(nn);
		t && (n += t.length);
		var i = e.lastIndexOf(ln);
		r = ~i ? e.length - i : r + e.length;
	}
	function a() {
		var e = {
			line: n,
			column: r
		};
		return function(t) {
			return t.position = new o(e), l(), t;
		};
	}
	function o(e) {
		this.start = e, this.end = {
			line: n,
			column: r
		}, this.source = t.source;
	}
	o.prototype.content = e;
	function s(i) {
		var a = /* @__PURE__ */ Error(t.source + ":" + n + ":" + r + ": " + i);
		if (a.reason = i, a.filename = t.source, a.line = n, a.column = r, a.source = e, !t.silent) throw a;
	}
	function c(t) {
		var n = t.exec(e);
		if (n) {
			var r = n[0];
			return i(r), e = e.slice(r.length), n;
		}
	}
	function l() {
		c(rn);
	}
	function u(e) {
		for (var t; t = d();) e.push(t);
		return e;
	}
	function d() {
		var t = a();
		if (un == e.charAt(0) && dn == e.charAt(1)) {
			for (var n = 2; fn != e.charAt(n) && (dn != e.charAt(n) || un != e.charAt(n + 1));) ++n;
			if (n += 2, fn === e.charAt(n - 1)) return s("End of comment missing");
			var o = e.slice(2, n - 2);
			return r += 2, i(o), e = e.slice(n), r += 2, t({
				type: pn,
				comment: o
			});
		}
	}
	function f() {
		var e = a(), t = c(an);
		if (t) {
			if (d(), !c(on)) return s("property missing ':'");
			var n = c(sn), r = e({
				type: mn,
				property: t[0].replace(tn, fn).trim(),
				value: n ? n[0].replace(tn, fn).trim() : fn
			});
			return c(cn), r;
		}
	}
	function p() {
		var e = [];
		u(e);
		for (var t; t = f();) e.push(t), u(e);
		return e;
	}
	return l(), p();
}
// node_modules/style-to-object/esm/index.mjs
function gn(e, t) {
	let n = null;
	if (!e || typeof e != "string") return n;
	let r = hn(e), i = typeof t == "function";
	return r.forEach((e) => {
		if (e.type !== "declaration") return;
		let { property: r, value: a } = e;
		i ? t(r, a, e) : a && (n ??= {}, n[r] = a);
	}), n;
}
// node_modules/unist-util-position/lib/index.js
var _n = yn("end"), vn = yn("start");
function yn(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function bn(e) {
	let t = vn(e), n = _n(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
// node_modules/unist-util-stringify-position/lib/index.js
function xn(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Cn(e.position) : "start" in e || "end" in e ? Cn(e) : "line" in e || "column" in e ? Sn(e) : "";
}
function Sn(e) {
	return wn(e && e.line) + ":" + wn(e && e.column);
}
function Cn(e) {
	return Sn(e && e.start) + "-" + Sn(e && e.end);
}
function wn(e) {
	return e && typeof e == "number" ? e : 1;
}
// node_modules/vfile-message/lib/index.js
var Tn = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = xn(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
Object.defineProperties(Tn.prototype, {
	file: {
		configurable: !0,
		enumerable: !0,
		value: "",
		writable: !0
	},
	name: {
		configurable: !0,
		enumerable: !0,
		value: "",
		writable: !0
	},
	reason: {
		configurable: !0,
		enumerable: !0,
		value: "",
		writable: !0
	},
	message: {
		configurable: !0,
		enumerable: !0,
		value: "",
		writable: !0
	},
	stack: {
		configurable: !0,
		enumerable: !0,
		value: "",
		writable: !0
	},
	column: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	line: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	ancestors: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	cause: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	fatal: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	place: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	ruleId: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	},
	source: {
		configurable: !0,
		enumerable: !0,
		writable: !0
	}
});
// node_modules/hast-util-to-jsx-runtime/lib/index.js
var En = {}.hasOwnProperty, Dn = /* @__PURE__ */ new Map(), On = /[A-Z]/g, kn = /-([a-z])/g, An = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), jn = /* @__PURE__ */ new Set(["td", "th"]), Mn = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Nn(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = Wn(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = Un(n, t.jsx, t.jsxs);
	}
	let i = {
		Fragment: t.Fragment,
		ancestors: [],
		components: t.components || {},
		create: r,
		elementAttributeNameCase: t.elementAttributeNameCase || "react",
		evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
		filePath: n,
		ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
		passKeys: t.passKeys !== !1,
		passNode: t.passNode || !1,
		schema: t.space === "svg" ? en : $t,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = Pn(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function Pn(e, t, n) {
	if (t.type === "element") return Fn(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return In(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return Rn(e, t, n);
	if (t.type === "mdxjsEsm") return Ln(e, t);
	if (t.type === "root") return zn(e, t, n);
	if (t.type === "text") return Bn(e, t);
}
function Fn(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = en, e.schema = i), e.ancestors.push(t);
	let a = Xn(e, t.tagName, !1), o = Gn(e, t), s = qn(e, t);
	return An.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !wt(e);
	})), Vn(e, o, a, t), Hn(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function In(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	Zn(e, t.position);
}
function Ln(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	Zn(e, t.position);
}
function Rn(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = en, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : Xn(e, t.name, !0), o = Kn(e, t), s = qn(e, t);
	return Vn(e, o, a, t), Hn(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function zn(e, t, n) {
	let r = {};
	return Hn(r, qn(e, t)), e.create(t, e.Fragment, r, n);
}
function Bn(e, t) {
	return t.value;
}
function Vn(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Hn(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function Un(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function Wn(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = vn(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function Gn(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && En.call(t.properties, i)) {
		let a = Jn(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && jn.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style ||= {};
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function Kn(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") {
		if (r.data && r.data.estree && e.evaluater) {
			let t = r.data.estree.body[0];
			t.type;
			let i = t.expression;
			i.type;
			let a = i.properties[0];
			a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
		} else Zn(e, t.position);
	} else {
		let { name: i } = r, a;
		if (r.value && typeof r.value == "object") {
			if (r.value.data && r.value.data.estree && e.evaluater) {
				let t = r.value.data.estree.body[0];
				t.type, a = e.evaluater.evaluateExpression(t.expression);
			} else Zn(e, t.position);
		} else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function qn(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : Dn;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = Pn(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function Jn(e, t, n) {
	if (n == null || typeof n == "number" && Number.isNaN(n)) return;
	let r = Xt(e.schema, t);
	return Array.isArray(n) && (n = r.commaSeparated ? _t(n) : ct(n)), r.property === "style" ? ["style", typeof n == "object" ? e.stylePropertyNameCase === "dom" ? n : Qn(n) : Yn(e, String(n))] : [e.elementAttributeNameCase === "react" && r.space ? Kt[r.property] || r.property : r.attribute, n];
}
function Yn(e, t) {
	let n = {};
	try {
		gn(t, function(t, r) {
			if (t && r) {
				let i = t;
				i.slice(0, 2) !== "--" && (i = i.toLowerCase(), e.stylePropertyNameCase === "dom" && (i.slice(0, 4) === "-ms-" && (i = i.slice(1)), i = i.replace(kn, tr))), n[i] = r;
			}
		});
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new Tn("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = Mn + "#cannot-parse-style-attribute", r;
	}
	return n;
}
function Xn(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = St(e[n]) ? {
				type: "Identifier",
				name: e[n]
			} : {
				type: "Literal",
				value: e[n]
			};
			i = i ? {
				type: "MemberExpression",
				object: i,
				property: t,
				computed: !!(n && t.type === "Literal"),
				optional: !1
			} : t;
		}
		r = i;
	} else r = St(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return En.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	Zn(e);
}
function Zn(e, t) {
	let n = new Tn("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = Mn + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Qn(e) {
	let t = {}, n;
	for (n in e) En.call(e, n) && (t[$n(n)] = e[n]);
	return t;
}
function $n(e) {
	if (e.slice(0, 2) === "--") return e;
	let t = e.replace(On, er);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function er(e) {
	return "-" + e.toLowerCase();
}
function tr(e, t) {
	return t.toUpperCase();
}
// node_modules/rehype-react/lib/index.js
function nr(e) {
	let t = this;
	t.compiler = n;
	function n(t, n) {
		return Nn(t, {
			filePath: n.path,
			...e
		});
	}
}
// node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js
function rr(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
// node_modules/mdast-util-find-and-replace/lib/index.js
function ir(e, t, n) {
	let r = Ae((n || {}).ignore || []), i = ar(t), a = -1;
	for (; ++a < i.length;) ke(e, o);
	function o(e, t, n) {
		if (e.type === "text" && typeof n == "number") return s(e, t, n);
		if (r(e, n, t[t.length - 1])) return je;
	}
	function s(e, t, n) {
		let r = t[t.length - 1], o = i[a][0], s = i[a][1], c = 0, l = !1, u = [];
		o.lastIndex = 0;
		let d = o.exec(e.value);
		for (; d;) {
			let n = d.index, r = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, i = s(...d, r);
			if (typeof i == "string" && (i = i.length > 0 ? {
				type: "text",
				value: i
			} : void 0), i === !1) o.lastIndex = n + 1;
			else {
				if (c !== n && f({
					type: "text",
					value: e.value.slice(c, n)
				}), Array.isArray(i)) for (let e of i) f(e);
				else i && f(i);
				c = n + d[0].length, l = !0;
			}
			if (!o.global) break;
			d = o.exec(e.value);
		}
		return l ? (c < e.value.length && f({
			type: "text",
			value: e.value.slice(c)
		}), r.children.splice(n, 1, ...u)) : u = [e], n + u.length;
		function f(e) {
			let t = u[u.length - 1];
			t && t.type === "text" && e.type === "text" ? t.value += e.value : u.push(e);
		}
	}
}
function ar(e) {
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let t = [], n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([or(e[0]), sr(e[1])]);
	}
	return t;
}
function or(e) {
	return typeof e == "string" ? new RegExp(rr(e), "g") : e;
}
function sr(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
// node_modules/mdast-util-newline-to-break/lib/index.js
function cr(e) {
	ir(e, [/\r?\n|\r/g, lr]);
}
function lr() {
	return { type: "break" };
}
// node_modules/remark-breaks/lib/index.js
function ur() {
	return function(e) {
		cr(e);
	};
}
// node_modules/decode-named-character-reference/index.dom.js
var dr = document.createElement("i");
function fr(e) {
	let t = "&" + e + ";";
	dr.innerHTML = t;
	let n = dr.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
// node_modules/micromark-util-chunked/index.js
function pr(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function mr(e, t) {
	return e.length > 0 ? (pr(e, e.length, 0, t), e) : t;
}
// node_modules/micromark-util-combine-extensions/index.js
var hr = {}.hasOwnProperty;
function gr(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) _r(t, e[n]);
	return t;
}
function _r(e, t) {
	let n;
	for (n in t) {
		let r = (hr.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			hr.call(r, a) || (r[a] = []);
			let e = i[a];
			vr(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function vr(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	pr(e, 0, 0, r);
}
// node_modules/micromark-util-decode-numeric-character-reference/index.js
function yr(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
// node_modules/micromark-util-normalize-identifier/index.js
function br(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
// node_modules/micromark-util-character/index.js
var xr = kr(/[A-Za-z]/), q = kr(/[\dA-Za-z]/), Sr = kr(/[#-'*+\--9=?A-Z^-~]/);
function Cr(e) {
	return e !== null && (e < 32 || e === 127);
}
var wr = kr(/\d/), Tr = kr(/[\dA-Fa-f]/), Er = kr(/[!-/:-@[-`{-~]/);
function J(e) {
	return e !== null && e < -2;
}
function Y(e) {
	return e !== null && (e < 0 || e === 32);
}
function X(e) {
	return e === -2 || e === -1 || e === 32;
}
var Dr = kr(/\p{P}|\p{S}/u), Or = kr(/\s/);
function kr(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
// node_modules/micromark-util-sanitize-uri/index.js
function Ar(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && q(e.charCodeAt(n + 1)) && q(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ""), i &&= (n += i, 0);
	}
	return t.join("") + e.slice(r);
}
// node_modules/micromark-factory-space/index.js
function Z(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return X(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return X(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
function jr(e, t, n, r, i, a) {
	let o = 0;
	return s;
	function s(t) {
		return a > 0 && X(t) ? (e.enter(r), c(t)) : l(t);
	}
	function c(t) {
		return X(t) && o < a ? (e.consume(t), o++, c) : (e.exit(r), l(t));
	}
	function l(e) {
		return o >= i ? t(e) : n(e);
	}
}
// node_modules/micromark/lib/initialize/content.js
var Mr = { tokenize: Nr };
function Nr(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) e.consume(n);
		else return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), Z(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
		else return J(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
// node_modules/micromark-util-edit-map/index.js
var Pr = class {
	constructor() {
		this.index = /* @__PURE__ */ new Map(), this.map = [];
	}
	add(e, t, n) {
		Fr(this, e, t, n, !1);
	}
	addBefore(e, t, n) {
		Fr(this, e, t, n, !0);
	}
	consume(e) {
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function Fr(e, t, n, r, i) {
	if (n === 0 && r.length === 0) return;
	let a = e.index.get(t);
	if (a) {
		a[1] += n, i ? (r.push(...a[2]), a[2] = r) : a[2].push(...r);
		return;
	}
	let o = [
		t,
		n,
		r
	];
	e.map.push(o), e.index.set(t, o);
}
// node_modules/micromark/lib/initialize/document.js
var Ir = { tokenize: Rr }, Lr = { tokenize: zr };
function Rr(e) {
	let t = this, n = [], r = 0, i, a, o;
	return s;
	function s(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
		}
		return l(i);
	}
	function c(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && v();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			_(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			let c = new Pr();
			return c.add(a + 1, 0, t.events.slice(n)), c.add(n, s - n, []), c.consume(t.events), l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !(!i.currentConstruct || i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Lr, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(Lr, p, m)(n);
	}
	function p(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), f(e);
	}
	function m(n) {
		if (n === null) i && v(), _(0), e.consume(n);
		else return i ||= t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), h(n);
	}
	function h(n) {
		if (n === null) g(e.exit("chunkFlow"), !0), _(0), e.consume(n);
		else return J(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
	}
	function g(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			let l = new Pr();
			l.add(a + 1, 0, t.events.slice(n)), l.add(n, e - n, []), l.consume(t.events);
		}
	}
	function _(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function v() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function zr(e, t, n) {
	return Z(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
// node_modules/micromark-util-classify-character/index.js
function Br(e) {
	if (e === null || Y(e) || Or(e)) return 1;
	if (Dr(e)) return 2;
}
// node_modules/micromark-util-resolve-all/index.js
function Vr(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
// node_modules/micromark-core-commonmark/lib/attention.js
var Hr = {
	name: "attention",
	resolveAll: Ur,
	tokenize: Wr
};
function Ur(e, t) {
	let n = -1, r;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		let i = n;
		for (; i--;) if (e[i][0] === "exit" && e[i][1].type === "attentionSequence" && e[i][1]._open && t.sliceSerialize(e[i][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[i][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[i][1].end.offset - e[i][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			let a = e[i][1].end.offset - e[i][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1, o = { ...e[i][1].end }, s = { ...e[n][1].start };
			Gr(o, -a), Gr(s, a);
			let c = {
				type: a > 1 ? "strongSequence" : "emphasisSequence",
				start: o,
				end: { ...e[i][1].end }
			}, l = {
				type: a > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: s
			}, u = {
				type: a > 1 ? "strongText" : "emphasisText",
				start: { ...e[i][1].end },
				end: { ...e[n][1].start }
			}, d = {
				type: a > 1 ? "strong" : "emphasis",
				start: { ...c.start },
				end: { ...l.end }
			};
			e[i][1].end = { ...c.start }, e[n][1].start = { ...l.end }, r = [], e[i][1].end.offset - e[i][1].start.offset && (r = mr(r, [[
				"enter",
				e[i][1],
				t
			], [
				"exit",
				e[i][1],
				t
			]])), r = mr(r, [
				[
					"enter",
					d,
					t
				],
				[
					"enter",
					c,
					t
				],
				[
					"exit",
					c,
					t
				],
				[
					"enter",
					u,
					t
				]
			]), r = mr(r, Vr(t.parser.constructs.insideSpan.null, e.slice(i + 1, n), t)), r = mr(r, [
				[
					"exit",
					u,
					t
				],
				[
					"enter",
					l,
					t
				],
				[
					"exit",
					l,
					t
				],
				[
					"exit",
					d,
					t
				]
			]);
			let f = 0;
			e[n][1].end.offset - e[n][1].start.offset && (f = 2, r = mr(r, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])), pr(e, i - 1, n - i + 3, r), n = i + r.length - f - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function Wr(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Br(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = Br(o), u = !l || l === 2 && i || n.includes(o) && o !== 42 && o !== 95, d = !i || i === 2 && l || n.includes(r) && r !== 42 && r !== 95;
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function Gr(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
// node_modules/micromark-core-commonmark/lib/autolink.js
var Kr = {
	name: "autolink",
	tokenize: qr
};
function qr(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return xr(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || q(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || q(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || Cr(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : Sr(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return q(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || q(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
// node_modules/micromark-core-commonmark/lib/blank-line.js
var Jr = {
	partial: !0,
	tokenize: Yr
};
function Yr(e, t, n) {
	return r;
	function r(t) {
		return X(t) ? Z(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || J(e) ? t(e) : n(e);
	}
}
// node_modules/micromark-core-commonmark/lib/block-quote.js
var Xr = {
	continuation: { tokenize: Qr },
	exit: $r,
	name: "blockQuote",
	tokenize: Zr
};
function Zr(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return X(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function Qr(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return X(t) ? Z(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(Xr, t, n)(r);
	}
}
function $r(e) {
	e.exit("blockQuote");
}
// node_modules/micromark-core-commonmark/lib/character-escape.js
var ei = {
	name: "characterEscape",
	tokenize: ti
};
function ti(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return Er(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
// node_modules/micromark-core-commonmark/lib/character-reference.js
var ni = {
	name: "characterReference",
	tokenize: ri
};
function ri(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = q, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Tr, u) : (e.enter("characterReferenceValue"), a = 7, o = wr, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === q && !fr(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
// node_modules/micromark-core-commonmark/lib/partial-non-lazy-continuation.js
var ii = {
	partial: !0,
	tokenize: ai
};
function ai(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
// node_modules/micromark-core-commonmark/lib/code-fenced.js
var oi = {
	concrete: !0,
	name: "codeFenced",
	tokenize: si
};
function si(e, t, n) {
	let r = this, i = {
		partial: !0,
		tokenize: x
	}, a = 0, o = 0, s;
	return c;
	function c(e) {
		return l(e);
	}
	function l(t) {
		let n = r.events[r.events.length - 1];
		return a = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(t);
	}
	function u(t) {
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), X(t) ? Z(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || J(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(ii, h, b)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || J(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : X(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Z(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || J(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || J(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, b, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && X(t) ? Z(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || J(t) ? e.check(ii, h, b)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || J(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
	}
	function b(n) {
		return e.exit("codeFenced"), t(n);
	}
	function x(e, t, n) {
		let i = 0;
		return a;
		function a(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c;
		}
		function c(t) {
			return e.enter("codeFencedFence"), X(t) ? Z(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), X(t) ? Z(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || J(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
// node_modules/micromark-core-commonmark/lib/code-indented.js
var ci = {
	name: "codeIndented",
	tokenize: ui
}, li = {
	partial: !0,
	tokenize: di
};
function ui(e, t, n) {
	return r;
	function r(t) {
		return e.enter("codeIndented"), jr(e, i, n, "linePrefix", 4, 4)(t);
	}
	function i(t) {
		return t === null ? o(t) : J(t) ? e.attempt(li, i, o)(t) : (e.enter("codeFlowValue"), a(t));
	}
	function a(t) {
		return t === null || J(t) ? (e.exit("codeFlowValue"), i(t)) : (e.consume(t), a);
	}
	function o(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function di(e, t, n) {
	let r = this;
	return i;
	function i(o) {
		return r.parser.lazy[r.now().line] ? n(o) : J(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : jr(e, t, a, "linePrefix", 4, 4)(o);
	}
	function a(e) {
		return J(e) ? i(e) : n(e);
	}
}
// node_modules/micromark-core-commonmark/lib/code-text.js
var fi = {
	name: "codeText",
	previous: mi,
	resolve: pi,
	tokenize: hi
};
function pi(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function mi(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function hi(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : J(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || J(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
// node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var gi = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && _i(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), _i(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), _i(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				_i(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				_i(this.left, t.reverse());
			}
		}
	}
};
function _i(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
// node_modules/micromark-util-subtokenize/index.js
function vi(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new gi(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, yi(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return pr(e, 0, Infinity, u.slice(0)), !l;
}
function yi(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
// node_modules/micromark-core-commonmark/lib/content.js
var bi = {
	resolve: Si,
	tokenize: Ci
}, xi = {
	partial: !0,
	tokenize: wi
};
function Si(e) {
	return vi(e), e;
}
function Ci(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : J(t) ? e.check(xi, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function wi(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), Z(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || J(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
// node_modules/micromark-factory-destination/index.js
function Ti(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || Cr(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || J(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || Y(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || Cr(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
// node_modules/micromark-factory-label/index.js
function Ei(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || 
		/* c8 ignore next 3 */
		l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : J(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || J(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c ||= !X(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
// node_modules/micromark-factory-title/index.js
function Di(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : J(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), Z(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || J(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
// node_modules/micromark-factory-whitespace/index.js
function Oi(e, t) {
	let n;
	return r;
	function r(i) {
		return J(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : X(i) ? Z(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
// node_modules/micromark-core-commonmark/lib/definition.js
var ki = {
	name: "definition",
	tokenize: ji
}, Ai = {
	partial: !0,
	tokenize: Mi
};
function ji(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return Ei.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = br(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return Y(t) ? Oi(e, l)(t) : l(t);
	}
	function l(t) {
		return Ti(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(Ai, d, d)(t);
	}
	function d(t) {
		return X(t) ? Z(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || J(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function Mi(e, t, n) {
	return r;
	function r(t) {
		return Y(t) ? Oi(e, i)(t) : n(t);
	}
	function i(t) {
		return Di(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return X(t) ? Z(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || J(e) ? t(e) : n(e);
	}
}
// node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var Ni = {
	name: "hardBreakEscape",
	tokenize: Pi
};
function Pi(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return J(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
// node_modules/micromark-core-commonmark/lib/heading-atx.js
var Fi = {
	name: "headingAtx",
	resolve: Ii,
	tokenize: Li
};
function Ii(e, t) {
	let n = e.length - 2, r = 3;
	if (e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r) {
		let i = {
			type: "atxHeadingText",
			start: e[r][1].start,
			end: e[n][1].end
		}, a = {
			type: "chunkText",
			start: e[r][1].start,
			end: e[n][1].end,
			contentType: "text"
		};
		pr(e, r, n - r + 1, [
			[
				"enter",
				i,
				t
			],
			[
				"enter",
				a,
				t
			],
			[
				"exit",
				a,
				t
			],
			[
				"exit",
				i,
				t
			]
		]);
	}
	return e;
}
function Li(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || Y(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || J(n) ? (e.exit("atxHeading"), t(n)) : X(n) ? Z(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || Y(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
// node_modules/micromark-util-html-tag-name/index.js
var Ri = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), zi = [
	"pre",
	"script",
	"style",
	"textarea"
], Bi = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: Hi,
	tokenize: Ui
}, Vi = {
	partial: !0,
	tokenize: Wi
};
function Hi(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Ui(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : ie) : xr(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : xr(a) ? (e.consume(a), i = 4, r.interrupt ? t : ie) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : ie) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : O : m) : n(i);
	}
	function h(t) {
		return xr(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || Y(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && zi.includes(l) ? (i = 1, r.interrupt ? t(s) : O(s)) : Ri.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : O(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || q(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : O) : n(i);
	}
	function v(t) {
		return X(t) ? (e.consume(t), v) : E(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), E) : t === 58 || t === 95 || xr(t) ? (e.consume(t), b) : X(t) ? (e.consume(t), y) : E(t);
	}
	function b(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || q(t) ? (e.consume(t), b) : x(t);
	}
	function x(t) {
		return t === 61 ? (e.consume(t), S) : X(t) ? (e.consume(t), x) : y(t);
	}
	function S(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, C) : X(t) ? (e.consume(t), S) : w(t);
	}
	function C(t) {
		return t === c ? (e.consume(t), c = null, T) : t === null || J(t) ? n(t) : (e.consume(t), C);
	}
	function w(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || Y(t) ? x(t) : (e.consume(t), w);
	}
	function T(e) {
		return e === 47 || e === 62 || X(e) ? y(e) : n(e);
	}
	function E(t) {
		return t === 62 ? (e.consume(t), D) : n(t);
	}
	function D(t) {
		return t === null || J(t) ? O(t) : X(t) ? (e.consume(t), D) : n(t);
	}
	function O(t) {
		return t === 45 && i === 2 ? (e.consume(t), A) : t === 60 && i === 1 ? (e.consume(t), j) : t === 62 && i === 4 ? (e.consume(t), M) : t === 63 && i === 3 ? (e.consume(t), ie) : t === 93 && i === 5 ? (e.consume(t), re) : J(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Vi, ae, k)(t)) : t === null || J(t) ? (e.exit("htmlFlowData"), k(t)) : (e.consume(t), O);
	}
	function k(t) {
		return e.check(ii, ee, ae)(t);
	}
	function ee(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), te;
	}
	function te(t) {
		return t === null || J(t) ? k(t) : (e.enter("htmlFlowData"), O(t));
	}
	function A(t) {
		return t === 45 ? (e.consume(t), ie) : O(t);
	}
	function j(t) {
		return t === 47 ? (e.consume(t), o = "", ne) : O(t);
	}
	function ne(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return zi.includes(n) ? (e.consume(t), M) : O(t);
		}
		return xr(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), ne) : O(t);
	}
	function re(t) {
		return t === 93 ? (e.consume(t), ie) : O(t);
	}
	function ie(t) {
		return t === 62 ? (e.consume(t), M) : t === 45 && i === 2 ? (e.consume(t), ie) : O(t);
	}
	function M(t) {
		return t === null || J(t) ? (e.exit("htmlFlowData"), ae(t)) : (e.consume(t), M);
	}
	function ae(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function Wi(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(Jr, t, n);
	}
}
// node_modules/micromark-core-commonmark/lib/html-text.js
var Gi = {
	name: "htmlText",
	tokenize: Ki
};
function Ki(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), x) : t === 63 ? (e.consume(t), y) : xr(t) ? (e.consume(t), w) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : xr(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : J(t) ? (o = d, j(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? A(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : J(t) ? (o = h, j(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? A(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? A(t) : J(t) ? (o = v, j(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), b) : J(t) ? (o = y, j(t)) : (e.consume(t), y);
	}
	function b(e) {
		return e === 62 ? A(e) : y(e);
	}
	function x(t) {
		return xr(t) ? (e.consume(t), S) : n(t);
	}
	function S(t) {
		return t === 45 || q(t) ? (e.consume(t), S) : C(t);
	}
	function C(t) {
		return J(t) ? (o = C, j(t)) : X(t) ? (e.consume(t), C) : A(t);
	}
	function w(t) {
		return t === 45 || q(t) ? (e.consume(t), w) : t === 47 || t === 62 || Y(t) ? T(t) : n(t);
	}
	function T(t) {
		return t === 47 ? (e.consume(t), A) : t === 58 || t === 95 || xr(t) ? (e.consume(t), E) : J(t) ? (o = T, j(t)) : X(t) ? (e.consume(t), T) : A(t);
	}
	function E(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || q(t) ? (e.consume(t), E) : D(t);
	}
	function D(t) {
		return t === 61 ? (e.consume(t), O) : J(t) ? (o = D, j(t)) : X(t) ? (e.consume(t), D) : T(t);
	}
	function O(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, k) : J(t) ? (o = O, j(t)) : X(t) ? (e.consume(t), O) : (e.consume(t), ee);
	}
	function k(t) {
		return t === i ? (e.consume(t), i = void 0, te) : t === null ? n(t) : J(t) ? (o = k, j(t)) : (e.consume(t), k);
	}
	function ee(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || Y(t) ? T(t) : (e.consume(t), ee);
	}
	function te(e) {
		return e === 47 || e === 62 || Y(e) ? T(e) : n(e);
	}
	function A(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function j(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), ne;
	}
	function ne(t) {
		return X(t) ? Z(e, re, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : re(t);
	}
	function re(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
// node_modules/micromark-core-commonmark/lib/label-end.js
var qi = {
	name: "labelEnd",
	resolveAll: Zi,
	resolveTo: Qi,
	tokenize: $i
}, Ji = { tokenize: ea }, Yi = { tokenize: ta }, Xi = { tokenize: na };
function Zi(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && pr(e, 0, e.length, n), e;
}
function Qi(e, t) {
	let n = e.length, r = 0, i, a, o;
	for (; n--;) {
		let t = e[n][1];
		if (i) {
			if (t.type === "link" || t.type === "labelLink" && t._inactive) break;
			e[n][0] === "enter" && t.type === "labelLink" && (t._inactive = !0);
		} else if (a) {
			if (e[n][0] === "enter" && (t.type === "labelImage" || t.type === "labelLink") && !t._balanced && (i = n, t.type !== "labelLink")) {
				r = 2;
				break;
			}
		} else t.type === "labelEnd" && (a = n);
	}
	let s = {
		type: e[i][1].type === "labelLink" ? "link" : "image",
		start: { ...e[i][1].start },
		end: { ...e[e.length - 1][1].end }
	}, c = {
		type: "label",
		start: { ...e[i][1].start },
		end: { ...e[a][1].end }
	}, l = {
		type: "labelText",
		start: { ...e[i + r + 2][1].end },
		end: { ...e[a - 2][1].start }
	};
	return o = [[
		"enter",
		s,
		t
	], [
		"enter",
		c,
		t
	]], o = mr(o, e.slice(i + 1, i + r + 3)), o = mr(o, [[
		"enter",
		l,
		t
	]]), o = mr(o, Vr(t.parser.constructs.insideSpan.null, e.slice(i + r + 4, a - 3), t)), o = mr(o, [
		[
			"exit",
			l,
			t
		],
		e[a - 2],
		e[a - 1],
		[
			"exit",
			c,
			t
		]
	]), o = mr(o, e.slice(a + 1)), o = mr(o, [[
		"exit",
		s,
		t
	]]), pr(e, i, e.length, o), e;
}
function $i(e, t, n) {
	let r = this, i = r._labelStarts, a, o;
	if (i) {
		for (; i.length > 0 && i[i.length - 1]._balanced;) i.pop();
		a = i[i.length - 1];
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(br(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(Ji, u, o ? u : d)(t) : t === 91 ? e.attempt(Yi, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(Xi, u, d)(t);
	}
	function u(e) {
		return i.pop(), t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function ea(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return Y(t) ? Oi(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : Ti(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return Y(t) ? Oi(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? Di(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return Y(t) ? Oi(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function ta(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return Ei.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(br(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function na(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
// node_modules/micromark-core-commonmark/lib/label-start-image.js
var ra = {
	name: "labelStartImage",
	resolveAll: qi.resolveAll,
	tokenize: ia
};
function ia(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), o;
	}
	function o(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), i = e.exit("labelImage"), s) : n(t);
	}
	function s(e) {
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : (r._labelStarts = r._labelStarts || [], r._labelStarts.push(i), t(e));
	}
}
// node_modules/micromark-core-commonmark/lib/label-start-link.js
var aa = {
	name: "labelStartLink",
	resolveAll: qi.resolveAll,
	tokenize: oa
};
function oa(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), i = e.exit("labelLink"), o;
	}
	function o(e) {
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : (r._labelStarts = r._labelStarts || [], r._labelStarts.push(i), t(e));
	}
}
// node_modules/micromark-core-commonmark/lib/line-ending.js
var sa = {
	name: "lineEnding",
	tokenize: ca
};
function ca(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), Z(e, t, "linePrefix");
	}
}
// node_modules/micromark-core-commonmark/lib/thematic-break.js
var la = {
	name: "thematicBreak",
	tokenize: ua
};
function ua(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || J(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), X(t) ? Z(e, s, "whitespace")(t) : s(t));
	}
}
// node_modules/micromark-core-commonmark/lib/list.js
var Q = {
	continuation: { tokenize: ma },
	exit: ga,
	name: "list",
	tokenize: pa
}, da = {
	partial: !0,
	tokenize: _a
}, fa = {
	partial: !0,
	tokenize: ha
};
function pa(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : wr(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(la, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return wr(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(Jr, r.interrupt ? n : u, e.attempt(da, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return X(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function ma(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(Jr, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, Z(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !X(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(fa, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, Z(e, e.attempt(Q, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function ha(e, t, n) {
	let r = this;
	return Z(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function ga(e) {
	e.exit(this.containerState.type);
}
function _a(e, t, n) {
	let r = this;
	return Z(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !X(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
// node_modules/micromark-core-commonmark/lib/setext-underline.js
var va = {
	name: "setextUnderline",
	resolveTo: ya,
	tokenize: ba
};
function ya(e, t) {
	let n = new Pr(), r = e.length, i, a, o;
	for (; r--;) if (e[r][0] === "enter") {
		if (e[r][1].type === "content") {
			i = r;
			break;
		}
		e[r][1].type === "paragraph" && (a = r);
	} else e[r][1].type === "content" && n.add(r, 1, []), !o && e[r][1].type === "definition" && (o = r);
	let s = {
		type: "setextHeading",
		start: { ...e[i][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[a][1].type = "setextHeadingText", o ? (n.add(a, 0, [[
		"enter",
		s,
		t
	]]), n.add(o + 1, 0, [[
		"exit",
		e[i][1],
		t
	]]), e[i][1].end = { ...e[o][1].end }) : e[i][1] = s, n.add(e.length, 0, [[
		"exit",
		s,
		t
	]]), n.consume(e), e;
}
function ba(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		let a = r.events.length, s;
		for (; a--;) if (r.events[a][1].type !== "lineEnding" && r.events[a][1].type !== "linePrefix" && r.events[a][1].type !== "content") {
			s = r.events[a][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter("setextHeadingLine"), i = t, o(t)) : n(t);
	}
	function o(t) {
		return e.enter("setextHeadingLineSequence"), s(t);
	}
	function s(t) {
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), X(t) ? Z(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || J(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
// node_modules/micromark/lib/initialize/flow.js
var xa = { tokenize: Sa };
function Sa(e) {
	let t = this, n = e.attempt(Jr, r, e.attempt(this.parser.constructs.flowInitial, i, Z(e, e.attempt(this.parser.constructs.flow, i, e.attempt(bi, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) e.consume(r);
		else return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) e.consume(r);
		else return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
// node_modules/micromark/lib/initialize/text.js
var Ca = { resolveAll: Da() }, wa = Ea("string"), Ta = Ea("text");
function Ea(e) {
	return {
		resolveAll: Da(e === "text" ? Oa : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) t.consume(e);
			else return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Da(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : t[r] && t[r][1].type === "data" || (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function Oa(e, t) {
	let n = new Pr(), r = 0;
	for (; ++r <= e.length;) if ((r === e.length || e[r][1].type === "lineEnding") && e[r - 1][1].type === "data") {
		let i = e[r - 1][1], a = t.sliceStream(i), o = a.length, s = -1, c = 0, l;
		for (; o--;) {
			let e = a[o];
			if (typeof e == "string") {
				for (s = e.length; e.charCodeAt(s - 1) === 32;) c++, s--;
				if (s) break;
				s = -1;
			} else if (e === -2) l = !0, c++;
			else if (e !== -1) {
				o++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && r === e.length && (c = 0), c) {
			let a = {
				type: r === e.length || l || c < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: o ? s : i.start._bufferIndex + s,
					_index: i.start._index + o,
					line: i.end.line,
					column: i.end.column - c,
					offset: i.end.offset - c
				},
				end: { ...i.end }
			};
			i.end = { ...a.start }, i.start.offset === i.end.offset ? Object.assign(i, a) : n.add(r, 0, [[
				"enter",
				a,
				t
			], [
				"exit",
				a,
				t
			]]);
		}
		r++;
	}
	return n.consume(e), e;
}
// node_modules/micromark/lib/constructs.js
var ka = /* @__PURE__ */ e({
	attentionMarkers: () => La,
	contentInitial: () => ja,
	disable: () => Ra,
	document: () => Aa,
	flow: () => Na,
	flowInitial: () => Ma,
	insideSpan: () => Ia,
	string: () => Pa,
	text: () => Fa
}), Aa = {
	42: Q,
	43: Q,
	45: Q,
	48: Q,
	49: Q,
	50: Q,
	51: Q,
	52: Q,
	53: Q,
	54: Q,
	55: Q,
	56: Q,
	57: Q,
	62: Xr
}, ja = { 91: ki }, Ma = {
	[-2]: ci,
	[-1]: ci,
	32: ci
}, Na = {
	35: Fi,
	42: la,
	45: [va, la],
	60: Bi,
	61: va,
	95: la,
	96: oi,
	126: oi
}, Pa = {
	38: ni,
	92: ei
}, Fa = {
	[-5]: sa,
	[-4]: sa,
	[-3]: sa,
	33: ra,
	38: ni,
	42: Hr,
	60: [Kr, Gi],
	91: aa,
	92: [Ni, ei],
	93: qi,
	95: Hr,
	96: fi
}, Ia = { null: [Hr, Ca] }, La = { null: [42, 95] }, Ra = { null: [] };
// node_modules/micromark/lib/create-tokenizer.js
function za(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], s = [], c = {
		attempt: C(x),
		check: C(S),
		consume: v,
		enter: y,
		exit: b,
		interrupt: C(S, { interrupt: !0 })
	}, l = {
		code: null,
		containerState: {},
		defineSkip: h,
		events: [],
		now: m,
		parser: e,
		previous: null,
		sliceSerialize: f,
		sliceStream: p,
		write: d
	}, u = t.tokenize.call(l, c);
	return t.resolveAll && a.push(t), l;
	function d(e) {
		return o = mr(o, e), g(), o[o.length - 1] === null ? (w(t, 0), l.events = Vr(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return Va(p(e), t);
	}
	function p(e) {
		return Ba(o, e);
	}
	function m() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function h(e) {
		i[e.line] = e.column, E();
	}
	function g() {
		for (; r._index < o.length;) {
			let e = o[r._index];
			if (typeof e == "string") {
				let t = r._index;
				for (r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === t && r._bufferIndex < e.length;) _(e.charCodeAt(r._bufferIndex));
			} else _(e);
		}
	}
	function _(e) {
		u = u(e);
	}
	function v(e) {
		J(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, E()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
	}
	function y(e, t) {
		let n = t || {};
		return n.type = e, n.start = m(), l.events.push([
			"enter",
			n,
			l
		]), s.push(n), n;
	}
	function b(e) {
		let t = s.pop();
		return t.end = m(), l.events.push([
			"exit",
			t,
			l
		]), t;
	}
	function x(e, t) {
		w(e, t.from);
	}
	function S(e, t) {
		t.restore();
	}
	function C(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, u;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return u = T(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
				}
			}
			function m(t) {
				return e(s, u), r;
			}
			function h(e) {
				return u.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function w(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && pr(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
	}
	function T() {
		let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, E();
		}
	}
	function E() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function Ba(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function Va(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
// node_modules/micromark/lib/parse.js
function Ha(e) {
	let t = {
		constructs: gr([ka, ...(e || {}).extensions || []]),
		content: n(Mr),
		defined: [],
		document: n(Ir),
		flow: n(xa),
		lazy: {},
		string: n(wa),
		text: n(Ta)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return za(t, e, n);
		}
	}
}
// node_modules/micromark/lib/postprocess.js
function Ua(e) {
	for (; !vi(e););
	return e;
}
// node_modules/micromark/lib/preprocess.js
var Wa = /[\0\t\n\r]/g;
function Ga() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i));
		let s = [], c = 0;
		for (t = "", n &&= (i.charCodeAt(0) === 65279 && c++, void 0); c < i.length;) {
			Wa.lastIndex = c;
			let n = Wa.exec(i), a = n && n.index !== void 0 ? n.index : i.length, o = i.charCodeAt(a);
			if (!n) {
				t = i.slice(c);
				break;
			}
			if (o === 10 && c === a && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), c < a && (s.push(i.slice(c, a)), e += a - c), o) {
				case 0:
					s.push(65533), e++;
					break;
				case 9: {
					let t = Math.ceil(e / 4) * 4;
					for (s.push(-2); e++ < t;) s.push(-1);
					break;
				}
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			c = a + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
// node_modules/micromark-util-decode-string/index.js
var Ka = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function qa(e) {
	return e.replace(Ka, Ja);
}
function Ja(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return yr(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return fr(n) || e;
}
// node_modules/mdast-util-from-markdown/lib/index.js
var Ya = {}.hasOwnProperty;
function Xa(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), Za(n)(Ua(Ha(n).document().write(Ga()(e, t, !0))));
}
function Za(e) {
	let t = {
		afterExit: [],
		beforeEnter: [],
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: o(z),
			autolinkProtocol: E,
			autolinkEmail: E,
			atxHeading: o(me),
			blockQuote: o(I),
			characterEscape: E,
			characterReference: E,
			codeFenced: o(L),
			codeFencedFenceInfo: s,
			codeFencedFenceMeta: s,
			codeIndented: o(L, s),
			codeText: o(de, s),
			codeTextData: E,
			data: E,
			codeFlowValue: E,
			definition: o(fe),
			definitionDestinationString: s,
			definitionLabelString: s,
			definitionTitleString: s,
			emphasis: o(pe),
			hardBreakEscape: o(R),
			hardBreakTrailing: o(R),
			htmlFlow: o(he, s),
			htmlFlowData: E,
			htmlText: o(he, s),
			htmlTextData: E,
			image: o(ge),
			label: s,
			link: o(z),
			listItem: o(B),
			listItemValue: p,
			listOrdered: o(_e, f),
			listUnordered: o(_e),
			paragraph: o(ve),
			reference: se,
			referenceString: s,
			resourceDestinationString: s,
			resourceTitleString: s,
			setextHeading: o(me),
			strong: o(ye),
			thematicBreak: o(xe)
		},
		exit: {
			atxHeading: l(),
			atxHeadingSequence: S,
			autolink: l(),
			autolinkEmail: F,
			autolinkProtocol: ue,
			blockQuote: l(),
			characterEscapeValue: D,
			characterReferenceMarkerHexadecimal: N,
			characterReferenceMarkerNumeric: N,
			characterReferenceValue: le,
			characterReference: P,
			codeFenced: l(_),
			codeFencedFence: g,
			codeFencedFenceInfo: m,
			codeFencedFenceMeta: h,
			codeFlowValue: D,
			codeIndented: l(v),
			codeText: l(A),
			codeTextData: D,
			data: D,
			definition: l(),
			definitionDestinationString: x,
			definitionLabelString: y,
			definitionTitleString: b,
			emphasis: l(),
			hardBreakEscape: l(k),
			hardBreakTrailing: l(k),
			htmlFlow: l(ee),
			htmlFlowData: D,
			htmlText: l(te),
			htmlTextData: D,
			image: l(ne),
			label: ie,
			labelText: re,
			lineEnding: O,
			link: l(j),
			listItem: l(),
			listOrdered: l(),
			listUnordered: l(),
			paragraph: l(),
			referenceString: ce,
			resourceDestinationString: M,
			resourceTitleString: ae,
			resource: oe,
			setextHeading: l(T),
			setextHeadingLineSequence: w,
			setextHeadingText: C,
			strong: l(),
			thematicBreak: l()
		}
	};
	$a(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: [],
			position: void 0
		}, o = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: c,
			exit: u,
			buffer: s,
			resume: d,
			data: n
		}, l = [], f = [], p = -1;
		for (; ++p < e.length;) f.push(e[p]), (e[p][1].type === "listOrdered" || e[p][1].type === "listUnordered") && (e[p][0] === "enter" ? l.push(f.length - 1) : a(f, l.pop()));
		for (e = f, p = -1; ++p < e.length;) {
			let n = t[e[p][0]];
			e[p][0] === "enter" && t.beforeEnter.length > 0 && i(t.beforeEnter, {
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]), Ya.call(n, e[p][1].type) && n[e[p][1].type].call({
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]), e[p][0] === "exit" && t.afterExit.length > 0 && i(t.afterExit, {
				...o,
				sliceSerialize: e[p][2].sliceSerialize
			}, e[p][1]);
		}
		if (o.tokenStack.length > 0) {
			let e = o.tokenStack[o.tokenStack.length - 1];
			(e[1] || to).call(o, void 0, e[0]);
		}
		for (r.position = {
			start: Qa(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: Qa(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, p = -1; ++p < t.transforms.length;) r = t.transforms[p](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = -1;
		for (; ++r < e.length;) e[r].call(t, n);
	}
	function a(e, t) {
		let n = e.length - 1, r = t - 1, i = -1, a = !1, o, s, c, l, u = [];
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let n = r;
					for (s = void 0; n--;) {
						let t = e[n];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = n;
						} else if (t[1].type !== "linePrefix" && t[1].type !== "blockQuotePrefix" && t[1].type !== "blockQuotePrefixWhitespace" && t[1].type !== "blockQuoteMarker" && t[1].type !== "listItemIndent") break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), u.push({
						at: s || r,
						event: [
							"exit",
							o,
							t[2]
						]
					});
				}
				if (t[1].type === "listItemPrefix") {
					let e = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = e, u.push({
						at: r,
						event: [
							"enter",
							e,
							t[2]
						]
					}), c = void 0, l = !0;
				}
			}
		}
		let d = e.splice(t), f = 0;
		for (r = -1; ++r < d.length;) {
			for (; f < u.length && u[f].at === t + r;) e.push(u[f++].event);
			e.push(d[r]);
		}
		e[t][1]._spread = a;
	}
	function o(e, t) {
		return n;
		function n(n) {
			c.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function s() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function c(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: Qa(t.start),
			end: void 0
		};
	}
	function l(e) {
		return t;
		function t(t) {
			e && e.call(this, t), u.call(this, t);
		}
	}
	function u(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (!r) throw Error("Cannot close `" + e.type + "` (" + xn({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || to).call(this, e, r[0])), n.position.end = Qa(e.end);
	}
	function d() {
		return Pe(this.stack.pop());
	}
	function f() {
		this.data.expectingFirstListItemValue = !0;
	}
	function p(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function h() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function g() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function v() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function y(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = br(this.sliceSerialize(e)).toLowerCase();
	}
	function b() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function x() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function S(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth ||= this.sliceSerialize(e).length;
	}
	function C() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function w(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function T() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function E(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		n && n.type === "text" || (n = be(), n.position = {
			start: Qa(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function D(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = Qa(e.end);
	}
	function O(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = Qa(e.end), this.data.atHardBreak = void 0;
		} else !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (E.call(this, e), D.call(this, e));
	}
	function k() {
		this.data.atHardBreak = !0;
	}
	function ee() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function te() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function A() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function j() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function ne() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function re(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = qa(t), n.identifier = br(t).toLowerCase();
	}
	function ie() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function M() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function ae() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function oe() {
		this.data.inReference = void 0;
	}
	function se() {
		this.data.referenceType = "collapsed";
	}
	function ce(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = br(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function N(e) {
		this.data.characterReferenceType = e.type;
	}
	function le(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = yr(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = fr(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function P(e) {
		let t = this.stack.pop();
		t.position.end = Qa(e.end);
	}
	function ue(e) {
		D.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function F(e) {
		D.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function I() {
		return {
			type: "blockquote",
			children: [],
			position: void 0
		};
	}
	function L() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: "",
			position: void 0
		};
	}
	function de() {
		return {
			type: "inlineCode",
			value: "",
			position: void 0
		};
	}
	function fe() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: "",
			position: void 0
		};
	}
	function pe() {
		return {
			type: "emphasis",
			children: [],
			position: void 0
		};
	}
	function me() {
		return {
			type: "heading",
			depth: 0,
			children: [],
			position: void 0
		};
	}
	function R() {
		return {
			type: "break",
			position: void 0
		};
	}
	function he() {
		return {
			type: "html",
			value: "",
			position: void 0
		};
	}
	function ge() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null,
			position: void 0
		};
	}
	function z() {
		return {
			type: "link",
			title: null,
			url: "",
			children: [],
			position: void 0
		};
	}
	function _e(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: [],
			position: void 0
		};
	}
	function B(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: [],
			position: void 0
		};
	}
	function ve() {
		return {
			type: "paragraph",
			children: [],
			position: void 0
		};
	}
	function ye() {
		return {
			type: "strong",
			children: [],
			position: void 0
		};
	}
	function be() {
		return {
			type: "text",
			value: "",
			position: void 0
		};
	}
	function xe() {
		return {
			type: "thematicBreak",
			position: void 0
		};
	}
}
function Qa(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function $a(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? $a(e, r) : eo(e, r);
	}
}
function eo(e, t) {
	let n;
	for (n in t) if (Ya.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "afterExit":
		case "beforeEnter": {
			let r = t[n];
			r && e[n].push(r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function to(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + xn({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + xn({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + xn({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
// node_modules/remark-parse/lib/index.js
function no(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return Xa(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
// node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function ro(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/break.js
function io(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
// node_modules/mdast-util-to-hast/lib/handlers/code.js
function ao(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
// node_modules/mdast-util-to-hast/lib/handlers/delete.js
function oo(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function so(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function co(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Ar(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
	s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
	let c = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(o)
		}]
	};
	e.patch(t, c);
	let l = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [c]
	};
	return e.patch(t, l), e.applyData(t, l);
}
// node_modules/mdast-util-to-hast/lib/handlers/heading.js
function lo(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/html.js
function uo(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
// node_modules/mdast-util-to-hast/lib/revert.js
function fo(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
// node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function po(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return fo(e, t);
	let i = { src: Ar(r.url || "") };
	t.alt !== null && t.alt !== void 0 && (i.alt = t.alt), r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/mdast-util-to-hast/lib/handlers/image.js
function mo(e, t) {
	let n = { src: Ar(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
// node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function ho(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
// node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function go(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return fo(e, t);
	let i = { href: Ar(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/mdast-util-to-hast/lib/handlers/link.js
function _o(e, t) {
	let n = { href: Ar(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
// node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function vo(e, t, n) {
	let r = e.all(t), i = n ? yo(n) : bo(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function yo(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let { children: n } = e, r = -1;
		for (; !t && ++r < n.length;) t = bo(n[r]);
	}
	return t;
}
function bo(e) {
	let { spread: t } = e;
	return t ?? e.children.length > 1;
}
// node_modules/mdast-util-to-hast/lib/handlers/list.js
function xo(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function So(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/root.js
function Co(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/strong.js
function wo(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/table.js
function To(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = vn(t.children[1]), o = _n(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
// node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function Eo(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
// node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function Do(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/trim-lines/index.js
var Oo = 9, ko = 32;
function Ao(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(jo(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(jo(t.slice(i), i > 0, !1)), a.join("");
}
function jo(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === Oo || t === ko;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === Oo || t === ko;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
// node_modules/mdast-util-to-hast/lib/handlers/text.js
function Mo(e, t) {
	let n = {
		type: "text",
		value: Ao(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function No(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
// node_modules/mdast-util-to-hast/lib/handlers/index.js
var Po = {
	blockquote: ro,
	break: io,
	code: ao,
	delete: oo,
	emphasis: so,
	footnoteReference: co,
	heading: lo,
	html: uo,
	imageReference: po,
	image: mo,
	inlineCode: ho,
	linkReference: go,
	link: _o,
	listItem: vo,
	list: xo,
	paragraph: So,
	root: Co,
	strong: wo,
	table: To,
	tableCell: Do,
	tableRow: Eo,
	text: Mo,
	thematicBreak: No,
	toml: Fo,
	yaml: Fo,
	definition: Fo,
	footnoteDefinition: Fo
};
function Fo() {}
// node_modules/mdast-util-to-hast/lib/footer.js
function Io(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function Lo(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Ro(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Io, r = e.options.footnoteBackLabel || Lo, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = [], l = -1;
	for (; ++l < e.footnoteOrder.length;) {
		let t = e.footnoteById.get(e.footnoteOrder[l]);
		t && (s[l] = e.all(t));
	}
	for (l = -1; ++l < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[l]);
		if (!i) continue;
		let a = s[l], o = String(i.identifier).toUpperCase(), u = Ar(o.toLowerCase()), d = 0, f = [], p = e.footnoteCounts.get(o);
		for (; p !== void 0 && ++d <= p;) {
			f.length > 0 && f.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(l, d);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), f.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + u + (d > 1 ? "-" + d : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(l, d),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let m = a[a.length - 1];
		if (m && m.type === "element" && m.tagName === "p") {
			let e = m.children[m.children.length - 1];
			e && e.type === "text" ? e.value += " " : m.children.push({
				type: "text",
				value: " "
			}), m.children.push(...f);
		} else a.push(...f);
		let h = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + u },
			children: e.wrap(a, !0)
		};
		e.patch(i, h), c.push(h);
	}
	if (c.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...Ze(o),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(c, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
// node_modules/mdast-util-to-hast/lib/state.js
var zo = {}.hasOwnProperty, Bo = {};
function Vo(e, t) {
	let n = t || Bo, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: Uo,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...Po,
			...n.handlers
		},
		one: o,
		options: n,
		patch: Ho,
		wrap: Go
	};
	return lt(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = String(e.identifier).toUpperCase();
			e.type === "definition" ? r.has(t) || r.set(t, e) : i.has(t) || i.set(t, e);
		}
	}), a;
	function o(e, t) {
		let { type: n } = e, r = a.handlers[n];
		if (zo.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e;
				return {
					...Ze(n),
					children: a.all(e)
				};
			}
			return Ze(e);
		}
		return (a.options.unknownHandler || Wo)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = Ko(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = Ko(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function Ho(e, t) {
	e.position && (t.position = bn(e));
}
function Uo(e, t) {
	let n = t;
	if (e && e.data) {
		let { hChildren: t, hName: r, hProperties: i } = e.data;
		typeof r == "string" && (n.type === "element" ? n.tagName = r : n = {
			type: "element",
			tagName: r,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, Ze(i)), "children" in n && n.children && t != null && (n.children = t);
	}
	return n;
}
function Wo(e, t) {
	let n = t.data || {}, r = "value" in t && !(zo.call(n, "hProperties") || zo.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function Go(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function Ko(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
// node_modules/mdast-util-to-hast/lib/index.js
function qo(e, t) {
	let n = Vo(e, t), r = n.one(e, void 0), i = Ro(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
// node_modules/remark-rehype/lib/index.js
function Jo(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = qo(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return qo(n, {
			file: r,
			...e || t
		});
	};
}
// node_modules/mdast-squeeze-paragraphs/lib/index.js
function Yo(e) {
	lt(e, function(e, t, n) {
		if (t !== void 0 && n && e.type === "paragraph" && e.children.every(function(e) {
			return e.type === "text" && /^\s*$/.test(e.value);
		})) return n.children.splice(t, 1), t;
	});
}
// node_modules/remark-unlink-protocols/lib/index.js
function Xo(e = { except: ["http", "https"] }) {
	return function(t) {
		let n = /* @__PURE__ */ new Map();
		lt(t, "definition", function(t, r, i) {
			if (n.set(t.identifier, t.url), i && typeof r == "number") {
				let n = t.url;
				if (n && n.includes(":") && !e.except.some((e) => n.startsWith(`${e}:`))) return i.children.splice(r, 1), r;
			}
		}), lt(t, function(t, r, i) {
			if (i && typeof r == "number" && (t.type === "link" || t.type === "linkReference")) {
				let a = t.type === "link" ? t.url : n.get(t.identifier);
				if (a && a.includes(":") && !e.except.some((e) => a.startsWith(`${e}:`))) return i.children.splice(r, 1, ...t.children), r;
			}
		}), Yo(t);
	};
}
// node_modules/bail/index.js
function Zo(e) {
	if (e) throw e;
}
// node_modules/extend/index.js
var Qo = /* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
}));
// node_modules/is-plain-obj/index.js
function $o(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
// node_modules/trough/lib/index.js
function es() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) r(a);
			else {
				for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
				t = o, s ? ts(s, i)(...o) : r(null, ...o);
			}
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function ts(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
// node_modules/vfile/lib/minpath.browser.js
var ns = {
	basename: rs,
	dirname: is,
	extname: as,
	join: os,
	sep: "/"
};
function rs(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	ls(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function is(e) {
	if (ls(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function as(e) {
	ls(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
		} else n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function os(...e) {
	let t = -1, n;
	for (; ++t < e.length;) ls(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : ss(n);
}
function ss(e) {
	ls(e);
	let t = e.codePointAt(0) === 47, n = cs(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function cs(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (i !== o - 1 && a !== 1) {
				if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf("/"), c !== n.length - 1) {
								c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = "", r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			}
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function ls(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
// node_modules/vfile/lib/minproc.browser.js
var us = { cwd: ds };
function ds() {
	return "/";
}
// node_modules/vfile/lib/minurl.shared.js
function fs(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
// node_modules/vfile/lib/minurl.browser.js
function ps(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!fs(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return ms(e);
}
function ms(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
// node_modules/vfile/lib/index.js
var hs = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], gs = class {
	constructor(e) {
		let t;
		t = e ? fs(e) ? { path: e } : typeof e == "string" || bs(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : us.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < hs.length;) {
			let e = hs[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) hs.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? ns.basename(this.path) : void 0;
	}
	set basename(e) {
		vs(e, "basename"), _s(e, "basename"), this.path = ns.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? ns.dirname(this.path) : void 0;
	}
	set dirname(e) {
		ys(this.basename, "dirname"), this.path = ns.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? ns.extname(this.path) : void 0;
	}
	set extname(e) {
		if (_s(e, "extname"), ys(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = ns.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		fs(e) && (e = ps(e)), vs(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? ns.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		vs(e, "stem"), _s(e, "stem"), this.path = ns.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new Tn(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function _s(e, t) {
	if (e && e.includes(ns.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + ns.sep + "`");
}
function vs(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function ys(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function bs(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
// node_modules/unified/lib/callable-instance.js
var xs = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), Ss = /* @__PURE__ */ t(Qo(), 1), Cs = {}.hasOwnProperty, ws = new class e extends xs {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = es();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, Ss.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (Ds("data", this.frozen), this.namespace[e] = t, this) : Cs.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Ds("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = As(e), n = this.parser || this.Parser;
		return Ts("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), Ts("process", this.parser || this.Parser), Es("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = As(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				Ms(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), Ts("processSync", this.parser || this.Parser), Es("processSync", this.compiler || this.Compiler), this.process(e, r), ks("processSync", "process", t), n;
		function r(e, r) {
			t = !0, Zo(e), n = r;
		}
	}
	run(e, t, n) {
		Os(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = As(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), ks("runSync", "run", n), r;
		function i(e, t) {
			Zo(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = As(t), r = this.compiler || this.Compiler;
		return Es("stringify", r), Os(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (Ds("use", this.frozen), e != null) {
			if (typeof e == "function") s(e, t);
			else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") {
				if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
			} else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, Ss.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) {
				if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				$o(o) && $o(r) && (r = (0, Ss.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function Ts(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function Es(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function Ds(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function Os(e) {
	if (!$o(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function ks(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function As(e) {
	return js(e) ? e : new gs(e);
}
function js(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ms(e) {
	return typeof e == "string" || Ns(e);
}
function Ns(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
window._vue_richtext_widgets ??= {}, window._registerWidget ??= (e, t, n, r) => {
	Ps(e, t, n, r);
};
function Ps(e, t, n = () => {}, r) {
	let i = {
		hasInteractiveView: !0,
		fullWidth: !1,
		isResizable: !1,
		...r
	};
	window._vue_richtext_widgets[e] ? C.error(`[ReferencePicker]: Widget for id ${e} already registered`) : window._vue_richtext_widgets[e] = {
		id: e,
		callback: t,
		onDestroy: n,
		...i
	};
}
function Fs(e, t) {
	let { richObjectType: n, richObject: r, accessible: i, interactive: a } = t;
	n !== "open-graph" && (window._vue_richtext_widgets[n] ? window._vue_richtext_widgets[n].callback(e, {
		richObjectType: n,
		richObject: r,
		accessible: i,
		interactive: a
	}) : C.error("Widget for rich object type " + n + " not registered"));
}
function Is(e, t) {
	e !== "open-graph" && window._vue_richtext_widgets[e] && window._vue_richtext_widgets[e].onDestroy(t);
}
function Ls(e) {
	return !!window._vue_richtext_widgets[e];
}
function Rs(e) {
	return !!window._vue_richtext_widgets[e]?.hasInteractiveView;
}
function zs(e) {
	return !!window._vue_richtext_widgets[e]?.fullWidth;
}
function Bs(e) {
	return !!window._vue_richtext_widgets[e]?.isResizable;
}
// node_modules/@nextcloud/vue/dist/chunks/NcReferenceWidget.mjs
c(S);
var Vs = [
	"aria-label",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax"
], Hs = ["src"], Us = { class: "widget-default--details" }, Ws = { class: "widget-default--name" }, Gs = { class: "widget-default--link" }, Ks = 18e4, qs = 10, Js = /* @__PURE__ */ T(/* @__PURE__ */ pe({
	__name: "NcReferenceWidget",
	props: {
		reference: {},
		interactive: {
			type: Boolean,
			default: !0
		},
		interactiveOptIn: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = j(h, null), r = `nc-reference-widget-${ue()}`, a = L(!1), o = g("customWidget"), c = g("customWidgetContent"), l = g("widgetRoot"), { width: d } = ve(l), { height: p } = ve(o);
		y(l, ([e]) => {
			ie(() => {
				a.value = e.isIntersecting;
			});
		});
		let b = L(!1), x = L(!1), S = null, C = L(!1), w = L(null), T = L(0), O = L(0), k = L(100), ee = L(window.innerHeight - 120), te = v(() => !t.interactiveOptIn && t.interactive || b.value), re = v(() => zs(t.reference.richObjectType)), M = v(() => Bs(t.reference.richObjectType)), oe = v(() => Ls(t.reference.richObjectType)), ce = v(() => w.value ? { height: `${w.value}px !important` } : null), le = v(() => Math.round(w.value ?? p.value)), fe = v(() => oe.value && Rs(t.reference.richObjectType)), pe = v(() => !t.reference.accessible), me = v(() => [
			250,
			550,
			650,
			Infinity
		].findIndex((e) => d.value < e)), he = v(() => {
			if (me.value === 0) return { display: "none" };
			let e = me.value;
			return {
				lineClamp: e,
				webkitLineClamp: e
			};
		}), ge = v(() => {
			let e = t.reference.openGraphObject.link;
			return e ? e.startsWith("https://") ? e.substring(8) : e.startsWith("http://") ? e.substring(7) : e : "";
		}), z = v(() => Ee(n, t.reference.openGraphObject.link)), _e = v(() => z.value ? Ce : "a"), ye = v(() => z.value ? { to: z.value } : {
			href: t.reference.openGraphObject.link,
			target: "_blank"
		});
		u(a, (e) => {
			e ? (S &&= (clearTimeout(S), null), x.value || xe()) : S = setTimeout(() => {
				a.value || Se();
			}, Ks);
		}, { immediate: !0 }), E(() => {
			S &&= (clearTimeout(S), null), ke(), Se();
		});
		function be() {
			b.value = !0, xe();
		}
		function xe() {
			if (!c.value || t.reference.richObjectType === "open-graph") return;
			c.value.innerHTML = "";
			let e = document.createElement("div");
			e.style.width = "100%", c.value.appendChild(e), ie(() => {
				Fs(e, {
					...t.reference,
					interactive: te.value
				}), x.value = !0;
			});
		}
		function Se() {
			x.value && l.value && (Is(t.reference.richObjectType, l.value), x.value = !1);
		}
		function we() {
			let e = c.value?.firstElementChild;
			if (e) {
				let t = window.getComputedStyle(e), n = parseFloat(t.minHeight), r = parseFloat(t.maxHeight);
				k.value = n > 0 ? n : 100, ee.value = Number.isFinite(r) && r > 0 ? r : window.innerHeight - 120;
			} else k.value = 100, ee.value = window.innerHeight - 120;
		}
		function Te(e) {
			M.value && o.value && (we(), C.value = !0, T.value = e.clientY, O.value = o.value.getBoundingClientRect().height, window.addEventListener("pointermove", Oe), window.addEventListener("pointerup", ke));
		}
		function De(e) {
			if (!M.value || !o.value) return;
			we();
			let t = (w.value ?? O.value) + e;
			w.value = Math.min(ee.value, Math.max(k.value, t));
		}
		function Oe(e) {
			if (!C.value || !o.value) return;
			let t = e.clientY - T.value;
			w.value = Math.min(ee.value, Math.max(k.value, O.value + t));
		}
		function ke() {
			C.value && (C.value = !1, window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", ke));
		}
		return (t, n) => (B(), P("div", {
			ref_key: "widgetRoot",
			ref: l,
			class: de({ "toggle-interactive": fe.value && !te.value })
		}, [e.reference && oe.value ? (B(), P("div", {
			key: 0,
			id: r,
			ref_key: "customWidget",
			ref: o,
			class: de(["widget-custom", { "full-width": re.value }]),
			style: D(ce.value)
		}, [i("div", {
			ref_key: "customWidgetContent",
			ref: c,
			class: "widget-custom__content"
		}, null, 512), M.value ? (B(), P("div", {
			key: 0,
			class: "widget-custom__resize-handle",
			role: "slider",
			tabindex: "0",
			"aria-orientation": "vertical",
			"aria-label": N(_)("Widget height"),
			"aria-valuenow": le.value,
			"aria-valuemin": k.value,
			"aria-valuemax": ee.value,
			"aria-controls": r,
			onPointerdown: f(Te, ["stop", "prevent"]),
			onKeydown: [n[0] ||= I(f((e) => De(-10), ["stop", "prevent"]), ["up"]), n[1] ||= I(f((e) => De(qs), ["stop", "prevent"]), ["down"])]
		}, null, 40, Vs)) : R("", !0)], 6)) : !pe.value && e.reference && e.reference.openGraphObject && !oe.value ? (B(), A(s(_e.value), se({ key: 1 }, ye.value, {
			rel: "noopener noreferrer",
			class: "widget-default"
		}), {
			default: m(() => [e.reference.openGraphObject.thumb ? (B(), P("img", {
				key: 0,
				class: "widget-default--image",
				src: e.reference.openGraphObject.thumb
			}, null, 8, Hs)) : R("", !0), i("div", Us, [
				i("p", Ws, F(e.reference.openGraphObject.name), 1),
				i("p", {
					class: "widget-default--description",
					style: D(he.value)
				}, F(e.reference.openGraphObject.description), 5),
				i("p", Gs, F(ge.value), 1)
			])]),
			_: 1
		}, 16)) : R("", !0), e.interactiveOptIn && fe.value && !te.value ? (B(), A(ne, {
			key: 2,
			class: "toggle-interactive--button",
			onClick: be
		}, {
			default: m(() => [ae(F(N(_)("Enable interactive view")), 1)]),
			_: 1
		})) : R("", !0)], 2));
	}
}), [["__scopeId", "data-v-f8edbaf7"]]);
// node_modules/@nextcloud/vue/dist/chunks/useCopy.mjs
c(a);
var Ys = 2e3;
function Xs(e) {
	let t = L(!1), n = v(() => t.value ? _e : be), r = v(() => t.value ? _("Copied") : _("Copy to clipboard"));
	async function i() {
		if (t.value) return;
		let n = te(e);
		try {
			await navigator.clipboard.writeText(n);
		} catch {
			prompt("", n);
		}
		t.value = !0, setTimeout(() => {
			t.value = !1;
		}, Ys);
	}
	return {
		isCopied: t,
		copy: i,
		icon: n,
		altText: r
	};
}
// node_modules/@nextcloud/vue/dist/chunks/NcRichText.mjs
var Zs = {
	name: "NcReferenceList",
	components: { NcReferenceWidget: Js },
	props: {
		text: {
			type: String,
			default: ""
		},
		referenceData: {
			type: Array,
			default: null
		},
		limit: {
			type: Number,
			default: 1
		},
		displayFallback: {
			type: Boolean,
			default: !1
		},
		interactive: {
			type: Boolean,
			default: !0
		},
		interactiveOptIn: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["loaded"],
	data() {
		return {
			references: null,
			loading: !1
		};
	},
	computed: {
		isVisible() {
			return this.loading || this.displayedReferences.length !== 0;
		},
		values() {
			return this.referenceData ? this.referenceData : this.displayFallback && !this.loading && !this.references ? [this.fallbackReference] : this.references ? Object.values(this.references) : [];
		},
		firstReference() {
			return this.values[0] ?? null;
		},
		displayedReferences() {
			return this.values.filter(Boolean).slice(0, this.limit);
		},
		fallbackReference() {
			return {
				accessible: !0,
				openGraphObject: {
					id: this.text,
					link: this.text,
					name: this.text
				},
				richObjectType: "open-graph"
			};
		}
	},
	watch: { text: "fetch" },
	created() {
		this.fetch();
	},
	methods: {
		fetch() {
			this.loading = !0, this.referenceData ? (this.references = null, this.loading = !1) : new RegExp(Te).exec(this.text) ? this.resolve().then((e) => {
				this.references = e.data.ocs.data.references, this.loading = !1, this.$emit("loaded");
			}).catch((e) => {
				C.error("[NcReferenceList] Failed to extract references", { error: e }), this.loading = !1, this.$emit("loaded");
			}) : (this.references = null, this.loading = !1);
		},
		resolve() {
			let e = new RegExp(Te).exec(this.text.trim()), t = x() === null;
			return this.limit === 1 && e ? t ? he.get(k("references/resolvePublic") + `?reference=${encodeURIComponent(e[0])}&sharingToken=${Me()}`) : he.get(k("references/resolve") + `?reference=${encodeURIComponent(e[0])}`) : t ? he.post(k("references/extractPublic"), {
				text: this.text,
				resolve: !0,
				limit: this.limit,
				sharingToken: Me()
			}) : he.post(k("references/extract"), {
				text: this.text,
				resolve: !0,
				limit: this.limit
			});
		}
	}
};
function Qs(e, t, n, r, i, a) {
	let s = b("NcReferenceWidget");
	return a.isVisible ? (B(), P("div", {
		key: 0,
		class: de(["widgets--list", { "icon-loading": i.loading }])
	}, [(B(!0), P(w, null, o(a.displayedReferences, (e) => (B(), A(s, {
		key: e.openGraphObject?.id,
		reference: e,
		interactive: n.interactive,
		interactiveOptIn: n.interactiveOptIn
	}, null, 8, [
		"reference",
		"interactive",
		"interactiveOptIn"
	]))), 128))], 2)) : R("", !0);
}
var $s = /* @__PURE__ */ T(Zs, [["render", Qs], ["__scopeId", "data-v-8db718e3"]]);
function ec(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
var tc = cc(/[A-Za-z]/), nc = cc(/[\dA-Za-z]/);
function rc(e) {
	return e !== null && (e < 32 || e === 127);
}
function ic(e) {
	return e !== null && e < -2;
}
function $(e) {
	return e !== null && (e < 0 || e === 32);
}
function ac(e) {
	return e === -2 || e === -1 || e === 32;
}
var oc = cc(/* @__PURE__ */ RegExp("\\p{P}|\\p{S}", "u")), sc = cc(/\s/);
function cc(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
function lc(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var uc = (function(e) {
	if (e == null) return hc;
	if (typeof e == "function") return mc(e);
	if (typeof e == "object") return Array.isArray(e) ? dc(e) : fc(e);
	if (typeof e == "string") return pc(e);
	throw Error("Expected function, string, or object as test");
});
function dc(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = uc(e[n]);
	return mc(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function fc(e) {
	let t = e;
	return mc(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function pc(e) {
	return mc(t);
	function t(t) {
		return t && t.type === e;
	}
}
function mc(e) {
	return t;
	function t(t, n, r) {
		return !!(gc(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function hc() {
	return !0;
}
function gc(e) {
	return typeof e == "object" && !!e && "type" in e;
}
function _c(e, t, n) {
	let r = uc((n || {}).ignore || []), i = vc(t), a = -1;
	for (; ++a < i.length;) ke(e, "text", o);
	function o(e, t) {
		let n = -1, i;
		for (; ++n < t.length;) {
			let e = t[n], a = i ? i.children : void 0;
			if (r(e, a ? a.indexOf(e) : void 0, i)) return;
			i = e;
		}
		if (i) return s(e, t);
	}
	function s(e, t) {
		let n = t[t.length - 1], r = i[a][0], o = i[a][1], s = 0, c = n.children.indexOf(e), l = !1, u = [];
		r.lastIndex = 0;
		let d = r.exec(e.value);
		for (; d;) {
			let n = d.index, i = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, a = o(...d, i);
			if (typeof a == "string" && (a = a.length > 0 ? {
				type: "text",
				value: a
			} : void 0), a === !1 ? r.lastIndex = n + 1 : (s !== n && u.push({
				type: "text",
				value: e.value.slice(s, n)
			}), Array.isArray(a) ? u.push(...a) : a && u.push(a), s = n + d[0].length, l = !0), !r.global) break;
			d = r.exec(e.value);
		}
		return l ? (s < e.value.length && u.push({
			type: "text",
			value: e.value.slice(s)
		}), n.children.splice(c, 1, ...u)) : u = [e], c + u.length;
	}
}
function vc(e) {
	let t = [];
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([yc(e[0]), bc(e[1])]);
	}
	return t;
}
function yc(e) {
	return typeof e == "string" ? new RegExp(lc(e), "g") : e;
}
function bc(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
var xc = "phrasing", Sc = [
	"autolink",
	"link",
	"image",
	"label"
];
function Cc() {
	return {
		transforms: [jc],
		enter: {
			literalAutolink: Tc,
			literalAutolinkEmail: Ec,
			literalAutolinkHttp: Ec,
			literalAutolinkWww: Ec
		},
		exit: {
			literalAutolink: Ac,
			literalAutolinkEmail: kc,
			literalAutolinkHttp: Dc,
			literalAutolinkWww: Oc
		}
	};
}
function wc() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: xc,
			notInConstruct: Sc
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: xc,
			notInConstruct: Sc
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: xc,
			notInConstruct: Sc
		}
	] };
}
function Tc(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function Ec(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function Dc(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function Oc(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function kc(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Ac(e) {
	this.exit(e);
}
function jc(e) {
	_c(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Mc], [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g, Nc]], { ignore: ["link", "linkReference"] });
}
function Mc(e, t, n, r, i) {
	let a = "";
	if (!Ic(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !Pc(n))) return !1;
	let o = Fc(n + r);
	if (!o[0]) return !1;
	let s = {
		type: "link",
		title: null,
		url: a + t + o[0],
		children: [{
			type: "text",
			value: t + o[0]
		}]
	};
	return o[1] ? [s, {
		type: "text",
		value: o[1]
	}] : s;
}
function Nc(e, t, n, r) {
	return !Ic(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function Pc(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function Fc(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = ec(e, "("), a = ec(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function Ic(e, t) {
	let n = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || sc(n) || oc(n)) && (!t || n !== 47);
}
function Lc(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
qc.peek = Kc;
function Rc() {
	this.buffer();
}
function zc(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function Bc() {
	this.buffer();
}
function Vc(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function Hc(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = Lc(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function Uc(e) {
	this.exit(e);
}
function Wc(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = Lc(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function Gc(e) {
	this.exit(e);
}
function Kc() {
	return "[";
}
function qc(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function Jc() {
	return {
		enter: {
			gfmFootnoteCallString: Rc,
			gfmFootnoteCall: zc,
			gfmFootnoteDefinitionLabelString: Bc,
			gfmFootnoteDefinition: Vc
		},
		exit: {
			gfmFootnoteCallString: Hc,
			gfmFootnoteCall: Uc,
			gfmFootnoteDefinitionLabelString: Wc,
			gfmFootnoteDefinition: Gc
		}
	};
}
function Yc(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: qc
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function n(e, n, r, i) {
		let a = r.createTracker(i), o = a.move("[^"), s = r.enter("footnoteDefinition"), c = r.enter("label");
		return o += a.move(r.safe(r.associationId(e), {
			before: o,
			after: "]"
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? Zc : Xc))), s(), o;
	}
}
function Xc(e, t, n) {
	return t === 0 ? e : Zc(e, t, n);
}
function Zc(e, t, n) {
	return (n ? "" : "    ") + e;
}
var Qc = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
rl.peek = il;
function $c() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: tl },
		exit: { strikethrough: nl }
	};
}
function el() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: Qc
		}],
		handlers: { delete: rl }
	};
}
function tl(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function nl(e) {
	this.exit(e);
}
function rl(e, t, n, r) {
	let i = n.createTracker(r), a = n.enter("strikethrough"), o = i.move("~~");
	return o += n.containerPhrasing(e, {
		...i.current(),
		before: o,
		after: "~"
	}), o += i.move("~~"), a(), o;
}
function il() {
	return "~";
}
function al(e) {
	return e.length;
}
function ol(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || al, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = sl(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = cl(r[d]);
	else {
		let e = cl(r);
		for (; ++d < l;) a[d] = e;
	}
	d = -1;
	let f = [], p = [];
	for (; ++d < l;) {
		let e = a[d], t = "", r = "";
		e === 99 ? (t = ":", r = ":") : e === 108 ? t = ":" : e === 114 && (r = ":");
		let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + "-".repeat(i) + r;
		n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
	}
	o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
	let m = [];
	for (; ++u < o.length;) {
		let e = o[u], t = s[u];
		d = -1;
		let r = [];
		for (; ++d < l;) {
			let i = e[d] || "", o = "", s = "";
			if (n.alignDelimiters !== !1) {
				let e = c[d] - (t[d] || 0), n = a[d];
				n === 114 ? o = " ".repeat(e) : n === 99 ? e % 2 ? (o = " ".repeat(e / 2 + .5), s = " ".repeat(e / 2 - .5)) : (o = " ".repeat(e / 2), s = o) : s = " ".repeat(e);
			}
			n.delimiterStart !== !1 && !d && r.push("|"), n.padding === !1 || n.alignDelimiters === !1 && i === "" || n.delimiterStart === !1 && !d || r.push(" "), n.alignDelimiters !== !1 && r.push(o), r.push(i), n.alignDelimiters !== !1 && r.push(s), n.padding !== !1 && r.push(" "), (n.delimiterEnd !== !1 || d !== l - 1) && r.push("|");
		}
		m.push(n.delimiterEnd === !1 ? r.join("").replace(/ +$/, "") : r.join(""));
	}
	return m.join("\n");
}
function sl(e) {
	return e == null ? "" : String(e);
}
function cl(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
function ll(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), ul);
	return i(), o;
}
function ul(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
function dl(e, t) {
	return fl(e, t.inConstruct, !0) && !fl(e, t.notInConstruct, !1);
}
function fl(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
function pl(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === "\n" && dl(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
	return "\\\n";
}
function ml(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
function hl(e, t) {
	return !(t.options.fences !== !1 || !e.value || e.lang || !/[^ \r\n]/.test(e.value) || /^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function gl(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
function _l(e, t, n, r) {
	let i = gl(n), a = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
	if (hl(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, vl);
		return e(), t;
	}
	let s = n.createTracker(r), c = i.repeat(Math.max(ml(a, i) + 1, 3)), l = n.enter("codeFenced"), u = s.move(c);
	if (e.lang) {
		let t = n.enter(`codeFencedLang${o}`);
		u += s.move(n.safe(e.lang, {
			before: u,
			after: " ",
			encode: ["`"],
			...s.current()
		})), t();
	}
	if (e.lang && e.meta) {
		let t = n.enter(`codeFencedMeta${o}`);
		u += s.move(" "), u += s.move(n.safe(e.meta, {
			before: u,
			after: "\n",
			encode: ["`"],
			...s.current()
		})), t();
	}
	return u += s.move("\n"), a && (u += s.move(a + "\n")), u += s.move(c), l(), u;
}
function vl(e, t, n) {
	return (n ? "" : "    ") + e;
}
function yl(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
function bl(e, t, n, r) {
	let i = yl(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
	return l += c.move(n.safe(n.associationId(e), {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]: "), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : "\n",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), o(), l;
}
function xl(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
function Sl(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
function Cl(e) {
	if (e === null || $(e) || sc(e)) return 1;
	if (oc(e)) return 2;
}
function wl(e, t, n) {
	let r = Cl(e), i = Cl(t);
	return r === void 0 ? i === void 0 ? n === "_" ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !0
	} : r === 1 ? i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !1
	} : {
		inside: !1,
		outside: !1
	};
}
Tl.peek = El;
function Tl(e, t, n, r) {
	let i = xl(n), a = n.enter("emphasis"), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = wl(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = Sl(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = wl(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + Sl(d));
	let p = o.move(i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function El(e, t, n) {
	return n.options.emphasis || "*";
}
function Dl(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), ke(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
function Ol(e, t) {
	let n = !1;
	return Dl(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && Pe(e) && (t.options.setext || n));
}
function kl(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (Ol(e, n)) {
		let t = n.enter("headingSetext"), r = n.enter("phrasing"), o = n.containerPhrasing(e, {
			...a.current(),
			before: "\n",
			after: "\n"
		});
		return r(), t(), o + "\n" + (i === 1 ? "=" : "-").repeat(o.length - (Math.max(o.lastIndexOf("\r"), o.lastIndexOf("\n")) + 1));
	}
	let o = "#".repeat(i), s = n.enter("headingAtx"), c = n.enter("phrasing");
	a.move(o + " ");
	let l = n.containerPhrasing(e, {
		before: "# ",
		after: "\n",
		...a.current()
	});
	return /^[\t ]/.test(l) && (l = Sl(l.charCodeAt(0)) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
Al.peek = jl;
function Al(e) {
	return e.value || "";
}
function jl() {
	return "<";
}
Ml.peek = Nl;
function Ml(e, t, n, r) {
	let i = yl(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
	return l += c.move(n.safe(e.alt, {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]("), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), l += c.move(")"), o(), l;
}
function Nl() {
	return "!";
}
Pl.peek = Fl;
function Pl(e, t, n, r) {
	let i = e.referenceType, a = n.enter("imageReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("!["), l = n.safe(e.alt, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Fl() {
	return "!";
}
Il.peek = Ll;
function Il(e, t, n) {
	let r = e.value || "", i = "`", a = -1;
	for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
	for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < n.unsafe.length;) {
		let e = n.unsafe[a], t = n.compilePattern(e), i;
		if (e.atBreak) for (; i = t.exec(r);) {
			let e = i.index;
			r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + " " + r.slice(i.index + 1);
		}
	}
	return i + r + i;
}
function Ll() {
	return "`";
}
function Rl(e, t) {
	let n = Pe(e);
	return !(t.options.resourceLink || !e.url || e.title || !e.children || e.children.length !== 1 || e.children[0].type !== "text" || n !== e.url && "mailto:" + n !== e.url || !/^[a-z][a-z+.-]+:/i.test(e.url) || /[\0- <>\u007F]/.test(e.url));
}
zl.peek = Bl;
function zl(e, t, n, r) {
	let i = yl(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r), s, c;
	if (Rl(e, n)) {
		let t = n.stack;
		n.stack = [], s = n.enter("autolink");
		let r = o.move("<");
		return r += o.move(n.containerPhrasing(e, {
			before: r,
			after: ">",
			...o.current()
		})), r += o.move(">"), s(), n.stack = t, r;
	}
	s = n.enter("link"), c = n.enter("label");
	let l = o.move("[");
	return l += o.move(n.containerPhrasing(e, {
		before: l,
		after: "](",
		...o.current()
	})), l += o.move("]("), c(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (c = n.enter("destinationLiteral"), l += o.move("<"), l += o.move(n.safe(e.url, {
		before: l,
		after: ">",
		...o.current()
	})), l += o.move(">")) : (c = n.enter("destinationRaw"), l += o.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...o.current()
	}))), c(), e.title && (c = n.enter(`title${a}`), l += o.move(" " + i), l += o.move(n.safe(e.title, {
		before: l,
		after: i,
		...o.current()
	})), l += o.move(i), c()), l += o.move(")"), s(), l;
}
function Bl(e, t, n) {
	return Rl(e, n) ? "<" : "[";
}
Vl.peek = Hl;
function Vl(e, t, n, r) {
	let i = e.referenceType, a = n.enter("linkReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("["), l = n.containerPhrasing(e, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Hl() {
	return "[";
}
function Ul(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
function Wl(e) {
	let t = Ul(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
function Gl(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
function Kl(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
function ql(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? Gl(n) : Ul(n), s = e.ordered ? o === "." ? ")" : "." : Wl(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if (o !== "*" && o !== "-" || !t || t.children && t.children[0] || n.stack[n.stack.length - 1] !== "list" || n.stack[n.stack.length - 2] !== "listItem" || n.stack[n.stack.length - 3] !== "list" || n.stack[n.stack.length - 4] !== "listItem" || n.indexStack[n.indexStack.length - 1] !== 0 || n.indexStack[n.indexStack.length - 2] !== 0 || n.indexStack[n.indexStack.length - 3] !== 0 || (c = !0), Kl(n) === o && t) {
			let t = -1;
			for (; ++t < e.children.length;) {
				let n = e.children[t];
				if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
					c = !0;
					break;
				}
			}
		}
	}
	c && (o = s), n.bulletCurrent = o;
	let l = n.containerFlow(e, r);
	return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
}
function Jl(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
function Yl(e, t, n, r) {
	let i = Jl(n), a = n.bulletCurrent || Ul(n);
	t && t.type === "list" && t.ordered && (a = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
	let o = a.length + 1;
	(i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
	let s = n.createTracker(r);
	s.move(a + " ".repeat(o - a.length)), s.shift(o);
	let c = n.enter("listItem"), l = n.indentLines(n.containerFlow(e, s.current()), u);
	return c(), l;
	function u(e, t, n) {
		return t ? (n ? "" : " ".repeat(o)) + e : (n ? a : a + " ".repeat(o - a.length)) + e;
	}
}
function Xl(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
var Zl = uc([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
function Ql(e, t, n, r) {
	return (e.children.some(function(e) {
		return Zl(e);
	}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
function $l(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
eu.peek = tu;
function eu(e, t, n, r) {
	let i = $l(n), a = n.enter("strong"), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = wl(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = Sl(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = wl(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + Sl(d));
	let p = o.move(i + i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function tu(e, t, n) {
	return n.options.strong || "*";
}
function nu(e, t, n, r) {
	return n.safe(e.value, r);
}
function ru(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
function iu(e, t, n) {
	let r = (Kl(n) + (n.options.ruleSpaces ? " " : "")).repeat(ru(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
var au = {
	blockquote: ll,
	break: pl,
	code: _l,
	definition: bl,
	emphasis: Tl,
	hardBreak: pl,
	heading: kl,
	html: Al,
	image: Ml,
	imageReference: Pl,
	inlineCode: Il,
	link: zl,
	linkReference: Vl,
	list: ql,
	listItem: Yl,
	paragraph: Xl,
	root: Ql,
	strong: eu,
	text: nu,
	thematicBreak: iu
};
function ou() {
	return {
		enter: {
			table: su,
			tableData: du,
			tableHeader: du,
			tableRow: lu
		},
		exit: {
			codeText: fu,
			table: cu,
			tableData: uu,
			tableHeader: uu,
			tableRow: uu
		}
	};
}
function su(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function cu(e) {
	this.exit(e), this.data.inTable = void 0;
}
function lu(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function uu(e) {
	this.exit(e);
}
function du(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function fu(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, pu));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function pu(e, t) {
	return t === "|" ? t : e;
}
function mu(e) {
	let t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, a = n ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: ":",
				after: "-"
			},
			{
				atBreak: !0,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: f,
			table: o,
			tableCell: c,
			tableRow: s
		}
	};
	function o(e, t, n, r) {
		return l(u(e, n, r), e.align);
	}
	function s(e, t, n, r) {
		let i = l([d(e, n, r)]);
		return i.slice(0, i.indexOf("\n"));
	}
	function c(e, t, n, r) {
		let i = n.enter("tableCell"), o = n.enter("phrasing"), s = n.containerPhrasing(e, {
			...r,
			before: a,
			after: a
		});
		return o(), i(), s;
	}
	function l(e, t) {
		return ol(e, {
			align: t,
			alignDelimiters: r,
			padding: n,
			stringLength: i
		});
	}
	function u(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("table");
		for (; ++i < r.length;) a[i] = d(r[i], t, n);
		return o(), a;
	}
	function d(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("tableRow");
		for (; ++i < r.length;) a[i] = c(r[i], e, t, n);
		return o(), a;
	}
	function f(e, t, n) {
		let r = au.inlineCode(e, t, n);
		return n.stack.includes("tableCell") && (r = r.replace(/\|/g, "\\$&")), r;
	}
}
function hu() {
	return { exit: {
		taskListCheckValueChecked: _u,
		taskListCheckValueUnchecked: _u,
		paragraph: vu
	} };
}
function gu() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: yu }
	};
}
function _u(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function vu(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let e = this.stack[this.stack.length - 1];
		e.type;
		let n = e.children[0];
		if (n && n.type === "text") {
			let r = t.children, i = -1, a;
			for (; ++i < r.length;) {
				let e = r[i];
				if (e.type === "paragraph") {
					a = e;
					break;
				}
			}
			a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function yu(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = au.listItem(e, t, n, {
		...r,
		...s.current()
	});
	return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
	function l(e) {
		return e + o;
	}
}
function bu() {
	return [
		Cc(),
		Jc(),
		$c(),
		ou(),
		hu()
	];
}
function xu(e) {
	return { extensions: [
		wc(),
		Yc(e),
		el(),
		mu(e),
		gu()
	] };
}
function Su(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
var Cu = {}.hasOwnProperty;
function wu(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) Tu(t, e[n]);
	return t;
}
function Tu(e, t) {
	let n;
	for (n in t) {
		let r = (Cu.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			Cu.call(r, a) || (r[a] = []);
			let e = i[a];
			Eu(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function Eu(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	Su(e, 0, 0, r);
}
var Du = {
	tokenize: Vu,
	partial: !0
}, Ou = {
	tokenize: Hu,
	partial: !0
}, ku = {
	tokenize: Uu,
	partial: !0
}, Au = {
	tokenize: Wu,
	partial: !0
}, ju = {
	tokenize: Gu,
	partial: !0
}, Mu = {
	name: "wwwAutolink",
	tokenize: zu,
	previous: Ku
}, Nu = {
	name: "protocolAutolink",
	tokenize: Bu,
	previous: qu
}, Pu = {
	name: "emailAutolink",
	tokenize: Ru,
	previous: Ju
}, Fu = {};
function Iu() {
	return { text: Fu };
}
for (var Lu = 48; Lu < 123;) Fu[Lu] = Pu, Lu++, Lu === 58 ? Lu = 65 : Lu === 91 && (Lu = 97);
Fu[43] = Pu, Fu[45] = Pu, Fu[46] = Pu, Fu[95] = Pu, Fu[72] = [Pu, Nu], Fu[104] = [Pu, Nu], Fu[87] = [Pu, Mu], Fu[119] = [Pu, Mu];
function Ru(e, t, n) {
	let r = this, i, a;
	return o;
	function o(t) {
		return !Yu(t) || !Ju.call(r, r.previous) || Xu(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(t));
	}
	function s(t) {
		return Yu(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
	}
	function c(t) {
		return t === 46 ? e.check(ju, u, l)(t) : t === 45 || t === 95 || nc(t) ? (a = !0, e.consume(t), c) : u(t);
	}
	function l(t) {
		return e.consume(t), i = !0, c;
	}
	function u(o) {
		return a && i && tc(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function zu(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !Ku.call(r, r.previous) || Xu(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Du, e.attempt(Ou, e.attempt(ku, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function Bu(e, t, n) {
	let r = this, i = "", a = !1;
	return o;
	function o(t) {
		return (t === 72 || t === 104) && qu.call(r, r.previous) && !Xu(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
	}
	function s(t) {
		if (tc(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
		if (t === 58) {
			let n = i.toLowerCase();
			if (n === "http" || n === "https") return e.consume(t), c;
		}
		return n(t);
	}
	function c(t) {
		return t === 47 ? (e.consume(t), a ? l : (a = !0, c)) : n(t);
	}
	function l(t) {
		return t === null || rc(t) || $(t) || sc(t) || oc(t) ? n(t) : e.attempt(Ou, e.attempt(ku, u), n)(t);
	}
	function u(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function Vu(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function Hu(e, t, n) {
	let r, i, a;
	return o;
	function o(t) {
		return t === 46 || t === 95 ? e.check(Au, c, s)(t) : t === null || $(t) || sc(t) || t !== 45 && oc(t) ? c(t) : (a = !0, e.consume(t), o);
	}
	function s(t) {
		return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
	}
	function c(e) {
		return i || r || !a ? n(e) : t(e);
	}
}
function Uu(e, t) {
	let n = 0, r = 0;
	return i;
	function i(o) {
		return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(Au, t, a)(o) : o === null || $(o) || sc(o) ? t(o) : (e.consume(o), i);
	}
	function a(t) {
		return t === 41 && r++, e.consume(t), i;
	}
}
function Wu(e, t, n) {
	return r;
	function r(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || $(o) || sc(o) ? t(o) : n(o);
	}
	function i(e) {
		return e === null || e === 40 || e === 91 || $(e) || sc(e) ? t(e) : r(e);
	}
	function a(e) {
		return tc(e) ? o(e) : n(e);
	}
	function o(t) {
		return t === 59 ? (e.consume(t), r) : tc(t) ? (e.consume(t), o) : n(t);
	}
}
function Gu(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return nc(e) ? n(e) : t(e);
	}
}
function Ku(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || $(e);
}
function qu(e) {
	return !tc(e);
}
function Ju(e) {
	return !(e === 47 || Yu(e));
}
function Yu(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || nc(e);
}
function Xu(e) {
	let t = e.length, n = !1;
	for (; t--;) {
		let r = e[t][1];
		if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
			n = !0;
			break;
		}
		if (r._gfmAutolinkLiteralWalkedInto) {
			n = !1;
			break;
		}
	}
	return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
function Zu(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
function Qu(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return ac(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return ac(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
var $u = {
	partial: !0,
	tokenize: ed
};
function ed(e, t, n) {
	return r;
	function r(t) {
		return ac(t) ? Qu(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || ic(e) ? t(e) : n(e);
	}
}
var td = {
	tokenize: ld,
	partial: !0
};
function nd() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: od,
			continuation: { tokenize: sd },
			exit: cd
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: ad
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: rd,
				resolveTo: id
			}
		}
	};
}
function rd(e, t, n) {
	let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
	for (; i--;) {
		let e = r.events[i][1];
		if (e.type === "labelImage") {
			o = e;
			break;
		}
		if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") break;
	}
	return s;
	function s(i) {
		if (!o || !o._balanced) return n(i);
		let s = Lc(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function id(e, t) {
	let n = e.length;
	for (; n--;) if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
		e[n][1];
		break;
	}
	e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
	let r = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[n + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, i = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[n + 3][1].end),
		end: Object.assign({}, e[n + 3][1].end)
	};
	i.end.column++, i.end.offset++, i.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, i.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[n + 1],
		e[n + 2],
		[
			"enter",
			r,
			t
		],
		e[n + 3],
		e[n + 4],
		[
			"enter",
			i,
			t
		],
		[
			"exit",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			r,
			t
		]
	];
	return e.splice(n, e.length - n + 1, ...s), e;
}
function ad(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
	return s;
	function s(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), c;
	}
	function c(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l) : n(t);
	}
	function l(s) {
		if (a > 999 || s === 93 && !o || s === null || s === 91 || $(s)) return n(s);
		if (s === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(Lc(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(s);
		}
		return $(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
	}
	function u(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
	}
}
function od(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(t) {
		if (o > 999 || t === 93 && !s || t === null || t === 91 || $(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return a = Lc(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), f;
		}
		return $(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
	function f(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(a) || i.push(a), Qu(e, p, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function p(e) {
		return t(e);
	}
}
function sd(e, t, n) {
	return e.check($u, t, e.attempt(td, t, n));
}
function cd(e) {
	e.exit("gfmFootnoteDefinition");
}
function ld(e, t, n) {
	let r = this;
	return Qu(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
function ud(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && Su(o, o.length, 0, Zu(s, e.slice(r + 1, n), t)), Su(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), Su(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = "data");
		return e;
	}
	function i(e, n, r) {
		let i = this.previous, a = this.events, o = 0;
		return s;
		function s(t) {
			return i === 126 && a[a.length - 1][1].type !== "characterEscape" ? r(t) : (e.enter("strikethroughSequenceTemporary"), c(t));
		}
		function c(a) {
			let s = Cl(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = Cl(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
var dd = class {
	constructor() {
		this.map = [];
	}
	add(e, t, n) {
		fd(this, e, t, n);
	}
	consume(e) {
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0;
	}
};
function fd(e, t, n, r) {
	let i = 0;
	if (n !== 0 || r.length !== 0) {
		for (; i < e.map.length;) {
			if (e.map[i][0] === t) {
				e.map[i][1] += n, e.map[i][2].push(...r);
				return;
			}
			i += 1;
		}
		e.map.push([
			t,
			n,
			r
		]);
	}
}
function pd(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
function md() {
	return { flow: { null: {
		name: "table",
		tokenize: hd,
		resolveAll: gd
	} } };
}
function hd(e, t, n) {
	let r = this, i = 0, a = 0, o;
	return s;
	function s(e) {
		let t = r.events.length - 1;
		for (; t > -1;) {
			let e = r.events[t][1].type;
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let i = t > -1 ? r.events[t][1].type : null, a = i === "tableHead" || i === "tableRow" ? S : c;
		return a === S && r.parser.lazy[r.now().line] ? n(e) : a(e);
	}
	function c(t) {
		return e.enter("tableHead"), e.enter("tableRow"), l(t);
	}
	function l(e) {
		return e === 124 || (o = !0, a += 1), u(e);
	}
	function u(t) {
		return t === null ? n(t) : ic(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p) : n(t) : ac(t) ? Qu(e, u, "whitespace")(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), o = !0, u) : (e.enter("data"), d(t)));
	}
	function d(t) {
		return t === null || t === 124 || $(t) ? (e.exit("data"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
	}
	function p(t) {
		return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter("tableDelimiterRow"), o = !1, ac(t) ? Qu(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : m(t));
	}
	function m(t) {
		return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), h) : x(t);
	}
	function h(t) {
		return ac(t) ? Qu(e, g, "whitespace")(t) : g(t);
	}
	function g(t) {
		return t === 58 ? (a += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), _) : t === 45 ? (a += 1, _(t)) : t === null || ic(t) ? b(t) : x(t);
	}
	function _(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), v(t)) : x(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), y) : (e.exit("tableDelimiterFiller"), y(t));
	}
	function y(t) {
		return ac(t) ? Qu(e, b, "whitespace")(t) : b(t);
	}
	function b(n) {
		return n === 124 ? m(n) : n === null || ic(n) ? !o || i !== a ? x(n) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n)) : x(n);
	}
	function x(e) {
		return n(e);
	}
	function S(t) {
		return e.enter("tableRow"), C(t);
	}
	function C(n) {
		return n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), C) : n === null || ic(n) ? (e.exit("tableRow"), t(n)) : ac(n) ? Qu(e, C, "whitespace")(n) : (e.enter("data"), w(n));
	}
	function w(t) {
		return t === null || t === 124 || $(t) ? (e.exit("data"), C(t)) : (e.consume(t), t === 92 ? T : w);
	}
	function T(t) {
		return t === 92 || t === 124 ? (e.consume(t), w) : w(t);
	}
}
function gd(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], s = !1, c = 0, l, u, d, f = new dd();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && (vd(f, t, c, l, u), u = void 0, c = 0), l = {
			type: "table",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			l,
			t
		]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], s && (s = !1, u = {
			type: "tableBody",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			u,
			t
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = _d(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = _d(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = _d(f, t, o, i, n, d)) : (o[0] = o[1], d = _d(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && vd(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = pd(t.events, n));
	}
	return e;
}
function _d(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, yd(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = yd(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = yd(t.events, n[2]), a = yd(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, yd(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function vd(e, t, n, r, i) {
	let a = [], o = yd(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function yd(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
var bd = {
	name: "tasklistCheck",
	tokenize: Sd
};
function xd() {
	return { text: { 91: bd } };
}
function Sd(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), a);
	}
	function a(t) {
		return $(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), o) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), o) : n(t);
	}
	function o(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : n(t);
	}
	function s(r) {
		return ic(r) ? t(r) : ac(r) ? e.check({ tokenize: Cd }, t, n)(r) : n(r);
	}
}
function Cd(e, t, n) {
	return Qu(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
function wd(e) {
	return wu([
		Iu(),
		nd(),
		ud(e),
		md(),
		xd()
	]);
}
var Td = {};
function Ed(e) {
	let t = this, n = e || Td, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(wd(n)), a.push(bu()), o.push(xu(n));
}
var Dd = /* @__PURE__ */ pe({
	__name: "NcRichTextCopyButton",
	props: { contentId: {} },
	setup(e) {
		let { copy: t, icon: n, altText: r } = Xs(() => document.getElementById(e.contentId).textContent);
		return (e, i) => (B(), A(ne, {
			variant: "tertiary",
			size: "small",
			"aria-label": N(r),
			title: N(r),
			onClick: N(t)
		}, {
			icon: m(() => [O(re, {
				path: N(n),
				inline: ""
			}, null, 8, ["path"])]),
			_: 1
		}, 8, [
			"aria-label",
			"title",
			"onClick"
		]));
	}
});
function Od(e) {
	return e.type === "text";
}
var kd = function(e) {
	ke(e, Od, (e, t) => {
		let n = t.at(-1), r = n.children.indexOf(e), i = e.value.split(/(\{[a-z\-_.0-9]+\})/gi).map((e) => {
			let t = e.match(/^\{([a-z\-_.0-9]+)\}$/i);
			if (!t) return Oe("text", e);
			let [, n] = t;
			return Oe("element", {
				tagName: `#${n}`,
				children: []
			});
		});
		n.children.splice(r, 1, ...i);
	});
}, Ad = () => kd;
function jd(e) {
	return ["code", "inlineCode"].includes(e.type);
}
var Md = function() {
	return function(e) {
		ke(e, jd, (e, t) => {
			let n = t.at(-1), r = n.children.indexOf(e);
			return n.children.splice(r, 1, {
				...e,
				value: ""
			}), [je, r + 1];
		});
	};
};
function Nd(e) {
	return [
		"text",
		"code",
		"inlineCode"
	].includes(e.type);
}
var Pd = function() {
	return function(e) {
		ke(e, Nd, (e, t) => {
			let n = t.at(-1), r = n.children.indexOf(e);
			return n.children.splice(r, 1, {
				...e,
				value: e.value.replace(/&lt;/gim, "<").replace(/&gt;/gim, ">")
			}), [je, r + 1];
		});
	};
}, Fd = [
	"http",
	"https",
	"mailto",
	"tel"
], Id = L(null);
async function Ld() {
	Id.value = (await import("./rehype-highlight-DsxvfLSc.chunk.mjs")).default;
}
var Rd = /* @__PURE__ */ T({
	name: "NcRichText",
	components: { NcReferenceList: $s },
	props: {
		text: {
			type: String,
			default: ""
		},
		arguments: {
			type: Object,
			default: () => ({})
		},
		referenceLimit: {
			type: Number,
			default: 0
		},
		referenceInteractive: {
			type: Boolean,
			default: !0
		},
		referenceInteractiveOptIn: {
			type: Boolean,
			default: !1
		},
		references: {
			type: Array,
			default: null
		},
		useMarkdown: {
			type: Boolean,
			default: !1
		},
		useExtendedMarkdown: {
			type: Boolean,
			default: !1
		},
		interactive: {
			type: Boolean,
			default: !1
		},
		autolink: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["interactTodo"],
	data() {
		return { parentId: ue() };
	},
	methods: {
		renderPlaintext() {
			let e = this.text.split(/(\{[a-z\-_.0-9]+\})/gi).map((e) => {
				let t = e.match(/^\{([a-z\-_.0-9]+)\}$/i);
				if (!t) return this.prepareTextNode(e);
				let n = t[1], r = this.arguments[n];
				if (typeof r == "object") {
					let { component: e, props: t } = r;
					return z(typeof e == "string" ? b(e) : e, {
						...t,
						class: "rich-text--component"
					});
				}
				return r ? z("span", { class: "rich-text--fallback" }, r) : e;
			});
			return z("div", { class: "rich-text--wrapper" }, [z("div", {}, e.flat()), this.referenceLimit > 0 ? z("div", { class: "rich-text--reference-widget" }, [z($s, {
				text: this.text,
				referenceData: this.references,
				interactive: this.referenceInteractive,
				interactiveOptIn: this.referenceInteractiveOptIn
			})]) : null]);
		},
		renderMarkdown() {
			let e = ws().use(no).use(we, {
				autolink: this.autolink,
				useMarkdown: this.useMarkdown,
				useExtendedMarkdown: this.useExtendedMarkdown
			}).use(Pd).use(this.useExtendedMarkdown ? Ed : void 0).use(ur).use(Xo, { except: Fd }).use(Jo, { handlers: { component(e, t) {
				return e(t, t.component, { value: t.value });
			} } }).use(this.useExtendedMarkdown ? Id.value : void 0).use(Ad).use(ht, {
				target: "_blank",
				rel: ["noopener noreferrer"]
			}).use(nr, {
				Fragment: w,
				jsx: this.createElement,
				jsxs: this.createElement,
				elementAttributeNameCase: "html",
				prefix: !1
			}).processSync(this.text.replace(/<[^>]+>/g, (e) => e.replace(/</g, "&lt;")).replace(/&gt;/gim, ">")).result;
			return z("div", { class: "rich-text--wrapper rich-text--wrapper-markdown" }, [e, this.referenceLimit > 0 ? z("div", { class: "rich-text--reference-widget" }, [z($s, {
				text: this.prepareReferenceSource(this.text),
				referenceData: this.references,
				interactive: this.referenceInteractive,
				interactiveOptIn: this.referenceInteractiveOptIn
			})]) : null]);
		},
		prepareTextNode(e) {
			return this.autolink && (e = Se(e)), Array.isArray(e) ? e.map((e) => {
				if (typeof e == "string") return e;
				let { component: t, props: n } = e;
				return z(t, {
					...n,
					class: "rich-text--component"
				});
			}) : e;
		},
		prepareReferenceSource(e) {
			if (!this.useMarkdown && !this.useExtendedMarkdown) return e;
			let t = ws();
			return t.compiler = (e) => Pe(e), t.use(no).use(Md).processSync(e.replace(/\s/g, " ")).value;
		},
		createElement(e, t, n) {
			n && (t.key = n);
			let r = t.children ?? [];
			if (delete t.children, !String(e).startsWith("#")) {
				[
					"h1",
					"h2",
					"h3",
					"h4",
					"h5",
					"h6"
				].includes(String(e)) && (e = `h${Math.min(+String(e)[1] + 3, 6)}`);
				let n = null;
				if (this.useExtendedMarkdown) {
					if (String(e) === "code" && !Id.value && t?.class?.includes("language") && Ld(), String(e) === "pre" && r && String(r.type) === "code") {
						let n = this.parentId + "-code-block-" + ue();
						return z("p", { class: "rich-text__code-block" }, [z(e, {
							...t,
							id: n
						}, r), z(Dd, {
							class: "rich-text__code-block-button",
							contentId: n
						})]);
					}
					if (String(e) === "li" && Array.isArray(r) && r.length !== 0 && r[0].type === "input" && r[0].props.type === "checkbox") {
						let [i, , ...a] = r, o = a.findIndex((e) => [
							"ul",
							"ol",
							"li",
							"blockquote",
							"pre"
						].includes(e.type));
						o !== -1 && (n = a[o], a.splice(o));
						let s = this.parentId + "-markdown-input-" + ue(), c = { ...i.props };
						delete c.checked;
						let l = z(M, {
							...c,
							modelValue: i.props.checked,
							id: s,
							disabled: !this.interactive,
							"onUpdate:modelValue": () => {
								this.$emit("interactTodo", s);
							}
						}, { default: () => a });
						return z(e, t, [l, n]);
					}
				}
				if (String(e) === "a") {
					let e = Ee(this.$router, t.href);
					return e ? (delete t.href, delete t.target, z(Ce, {
						...t,
						to: e
					}, { default: () => r })) : /^(https?:\/\/|tel:|mailto:)/.test(t.href) ? (t.href = t.href.trim(), z(xe, t, r)) : (delete t.href, delete t.target, z("span", t, r));
				}
				return z(e, t, r);
			}
			let i = this.arguments[e.slice(1)];
			return i ? i.component ? z(typeof i.component == "string" ? b(i.component) : i.component, {
				...t,
				...i.props,
				class: "rich-text--component"
			}, { default: () => r }) : z("span", { ...t }, [i]) : z("span", {
				...t,
				class: "rich-text--fallback"
			}, [`{${e.slice(1)}}`]);
		}
	},
	render() {
		return this.useMarkdown || this.useExtendedMarkdown ? this.renderMarkdown() : this.renderPlaintext();
	}
}, [["__scopeId", "data-v-80e57a29"]]), zd = /* @__PURE__ */ e({ default: () => Gf }), Bd = {
	name: "BriefcaseOutlineIcon",
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
}, Vd = ["aria-hidden", "aria-label"], Hd = [
	"fill",
	"width",
	"height"
], Ud = { key: 0 };
function Wd(e, t, n, r, a, o) {
	return B(), P("span", se(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon briefcase-outline-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(B(), P("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (B(), P("title", Ud, F(n.title), 1)) : R("", !0), t[1] ||= i("path", { d: "M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" }, null, -1)], 8, Hd))], 16, Vd);
}
var Gd = /* @__PURE__ */ T(Bd, [["render", Wd]]), Kd = {
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
}, qd = ["aria-hidden", "aria-label"], Jd = [
	"fill",
	"width",
	"height"
], Yd = { key: 0 };
function Xd(e, t, n, r, a, o) {
	return B(), P("span", se(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon clock-outline-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(B(), P("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (B(), P("title", Yd, F(n.title), 1)) : R("", !0), t[1] ||= i("path", { d: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" }, null, -1)], 8, Jd))], 16, qd);
}
var Zd = /* @__PURE__ */ T(Kd, [["render", Xd]]), Qd = {
	name: "MapMarkerOutlineIcon",
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
}, $d = ["aria-hidden", "aria-label"], ef = [
	"fill",
	"width",
	"height"
], tf = { key: 0 };
function nf(e, t, n, r, a, o) {
	return B(), P("span", se(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon map-marker-outline-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(B(), P("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (B(), P("title", tf, F(n.title), 1)) : R("", !0), t[1] ||= i("path", { d: "M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" }, null, -1)], 8, ef))], 16, $d);
}
var rf = /* @__PURE__ */ T(Qd, [["render", nf]]), af = {
	name: "PencilOutlineIcon",
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
}, of = ["aria-hidden", "aria-label"], sf = [
	"fill",
	"width",
	"height"
], cf = { key: 0 };
function lf(e, t, n, r, a, o) {
	return B(), P("span", se(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon pencil-outline-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(B(), P("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (B(), P("title", cf, F(n.title), 1)) : R("", !0), t[1] ||= i("path", { d: "M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" }, null, -1)], 8, sf))], 16, of);
}
var uf = /* @__PURE__ */ T(af, [["render", lf]]);
c(d);
var df = 18e5, ff = /* @__PURE__ */ new Map(), pf = /* @__PURE__ */ new Map();
function mf(e) {
	let t = ff.get(e);
	return t ? Date.now() >= t.expiresAt ? (ff.delete(e), null) : t.data : null;
}
function hf(e, t, n = df) {
	ff.set(e, {
		data: t,
		expiresAt: Date.now() + n
	});
}
async function gf(e, t, n = df) {
	let r = mf(e);
	if (r) return r;
	let i = pf.get(e);
	if (i) return i;
	let a = (async () => {
		try {
			let r = await t();
			return r && hf(e, r, n), r;
		} finally {
			pf.delete(e);
		}
	})();
	return pf.set(e, a), a;
}
var _f = ["aria-label"], vf = {
	key: 0,
	class: "profile-hover-card__loading"
}, yf = { class: "profile-hover-card__header" }, bf = { class: "profile-hover-card__header__container" }, xf = {
	key: 1,
	class: "profile-hover-card__header__container__placeholder"
}, Sf = { class: "profile-hover-card__header__container__identity" }, Cf = { class: "profile-hover-card__header__container__displayname" }, wf = ["href"], Tf = { key: 1 }, Ef = {
	key: 2,
	class: "profile-hover-card__header__container__pronoun-separator"
}, Df = {
	key: 3,
	class: "profile-hover-card__header__container__pronouns"
}, Of = {
	key: 0,
	class: "profile-hover-card__header__container__status"
}, kf = { class: "profile-hover-card__header__container__status-content" }, Af = { class: "profile-hover-card__body" }, jf = { class: "profile-hover-card__content" }, Mf = { class: "profile-hover-card__sidebar" }, Nf = { class: "user-actions" }, Pf = {
	key: 0,
	class: "user-actions__loading"
}, Ff = ["src"], If = ["src"], Lf = {
	key: 0,
	class: "profile-hover-card__blocks"
}, Rf = {
	key: 0,
	class: "profile-hover-card__blocks-details"
}, zf = {
	key: 0,
	class: "detail"
}, Bf = { key: 0 }, Vf = {
	key: 1,
	class: "detail"
}, Hf = {
	key: 2,
	class: "detail"
}, Uf = {
	key: 0,
	class: "profile-hover-card__blocks-headline"
}, Wf = {
	key: 1,
	class: "profile-hover-card__blocks-biography"
}, Gf = /* @__PURE__ */ T(/* @__PURE__ */ pe({
	__name: "NcProfileHoverCard",
	props: {
		user: { default: null },
		displayName: { default: null },
		profile: { default: null },
		preloadedUserStatus: { default: null },
		open: {
			type: Boolean,
			default: !1
		},
		actions: { default: null },
		actionsLoading: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = L(!1), a = L(!1), c = L(t.profile), d = L(t.preloadedUserStatus ?? {}), f = L(!!t.profile), h = L(t.preloadedUserStatus !== null), g = oe(), y = v(() => n.value || !!c.value && !a.value && !h.value);
		t.user && t.profile && hf(t.user, t.profile);
		let b = v(() => !!t.user && x()?.uid === t.user), S = ge("/settings/user"), T = v(() => {
			if (!f.value) return null;
			let e = c.value?.userId || t.user;
			return e ? ge("/u/{userId}", { userId: e }) : null;
		}), E = v(() => c.value?.displayname || t.displayName || c.value?.userId || t.user || ""), D = v(() => T.value ? {
			href: T.value,
			"aria-label": _("View profile")
		} : {});
		function te(e) {
			return e.appId !== "timezone" && e.appId !== "profile" && e.id !== "profile";
		}
		function j(e) {
			return b.value ? e.text : e.id === "talk-call" || ie(e) ? _("Start call") : e.id === "talk" || e.appId === "spreed" ? _("Send message") : e.text;
		}
		function ie(e) {
			if (e.appId !== "spreed") return !1;
			let t = e.href ?? (typeof e.to == "string" ? e.to : "");
			return typeof t == "string" && t.includes("#direct-call");
		}
		let M = v(() => t.actions && t.actions.length > 0 ? t.actions.filter(te) : (c.value?.actions ?? []).filter(te).map((e) => ({
			id: e.id,
			appId: e.appId,
			text: e.title,
			href: e.target || void 0,
			icon: e.icon,
			target: e.id === "phone" ? "_self" : "_blank",
			rel: e.id === "fediverse" ? "me" : void 0
		}))), ue = v(() => {
			let e = ve(/* @__PURE__ */ new Date());
			return e ? _("Local time: {time}", { time: e }) : null;
		}), I = v(() => M.value[0]), pe = v(() => M.value.slice(1)), z = v(() => {
			let e = I.value;
			return e ? e.to ? { to: e.to } : e.href ? {
				href: e.href,
				target: e.target ?? (e.href.startsWith("tel:") ? "_self" : "_blank"),
				rel: e.rel
			} : {} : {};
		}), _e = v(() => ({
			status: d.value.status ?? null,
			icon: d.value.icon ?? null,
			message: d.value.message ?? null
		}));
		function ve(e) {
			let t = c.value?.timezone;
			if (t) try {
				return new Intl.DateTimeFormat(le(), {
					timeZone: t,
					hour: "2-digit",
					minute: "2-digit"
				}).format(e);
			} catch {}
			if (typeof c.value?.timezoneOffset == "number") {
				let t = new Date(e.getTime() + c.value.timezoneOffset * 1e3);
				return new Intl.DateTimeFormat(le(), {
					timeZone: "UTC",
					hour: "2-digit",
					minute: "2-digit"
				}).format(t);
			}
			return null;
		}
		function be(e) {
			return !!e && (/^(https?:)?\/\//.test(e) || e.startsWith("/") || e.startsWith("data:"));
		}
		function xe(e) {
			return e.to ? me : e.onClick && !e.href ? r : ce;
		}
		function Se(e) {
			return e.to ? {
				to: e.to,
				closeAfterClick: !0
			} : e.onClick && !e.href ? {
				onClick: e.onClick,
				closeAfterClick: !0
			} : {
				href: e.href,
				target: e.target ?? (e.href?.startsWith("tel:") ? "_self" : "_blank"),
				rel: e.rel,
				closeAfterClick: !0
			};
		}
		u(() => t.profile, (e) => {
			e && (c.value = e, f.value = !0, t.user && hf(t.user, e), a.value = !1);
		}), u(() => t.preloadedUserStatus, (e) => {
			e && (d.value = e, h.value = !0);
		}), u(() => t.displayName, (e) => {
			e && c.value && !f.value && (c.value = {
				...c.value,
				displayname: e
			});
		}), u(() => t.user, () => {
			c.value = t.profile, d.value = t.preloadedUserStatus ?? {}, h.value = t.preloadedUserStatus !== null, f.value = !!t.profile, a.value = !1, t.user && t.profile && hf(t.user, t.profile), t.open && Ee();
		}), u(() => t.open, (e) => {
			e && Ee();
		}), ye(() => {
			t.open && Ee();
		});
		async function Ce(e) {
			if (t.displayName) return t.displayName;
			try {
				let { data: t } = await he.post(ge("/displaynames"), { users: [e] });
				return t?.users?.[e] || e;
			} catch (t) {
				return C.debug("Failed to load display name for hovercard", {
					error: t,
					userId: e
				}), e;
			}
		}
		async function we(e) {
			return {
				userId: e,
				displayname: await Ce(e),
				actions: [],
				isUserAvatarVisible: !0
			};
		}
		async function Te(e) {
			h.value ||= (d.value = await Oe(e), !0);
		}
		async function Ee() {
			if (!t.user || n.value) return;
			let e = t.user;
			if (!c.value) {
				let t = mf(e);
				t && (c.value = t, f.value = !0);
			}
			if (c.value && f.value) {
				if (!h.value) {
					n.value = !0;
					try {
						await Te(e);
					} finally {
						n.value = !1;
					}
				}
				return;
			}
			n.value = !0, a.value = !1;
			let r = h.value ? Promise.resolve(d.value) : Oe(e);
			try {
				let t = await gf(e, async () => {
					let { data: t } = await he.get(k("/profile/{userId}", { userId: e }));
					return t.ocs?.data ?? null;
				});
				t ? (c.value = t, f.value = !0) : (c.value = await we(e), f.value = !1);
			} catch (t) {
				C.debug("Failed to load profile for hovercard, showing limited info", {
					error: t,
					user: e
				}), c.value = await we(e), f.value = !1;
			}
			try {
				d.value = await r, h.value = !0;
			} finally {
				n.value = !1;
			}
		}
		async function Oe(e) {
			try {
				if (!ee()?.user_status?.enabled || !x()) return {};
				let { data: t } = await he.get(k("/apps/user_status/api/v1/statuses/{userId}", { userId: e }));
				return t.ocs?.data ?? {};
			} catch (t) {
				return C.debug("Failed to load user status for hovercard", {
					error: t,
					userId: e
				}), {};
			}
		}
		return (t, n) => (B(), P("div", {
			class: de(["profile-hover-card", { "profile-hover-card--limited": !y.value && !!c.value && !a.value && !f.value }]),
			role: "dialog",
			"aria-label": N(_)("Profile of {user}", { user: E.value })
		}, [y.value ? (B(), P("div", vf, [O(l, {
			size: 32,
			name: N(_)("Loading profile")
		}, null, 8, ["name"])])) : c.value && !a.value ? (B(), P(w, { key: 1 }, [i("div", yf, [b.value ? (B(), A(ne, {
			key: 0,
			class: "profile-hover-card__header__edit",
			variant: "tertiary",
			"aria-label": N(_)("Edit profile"),
			title: N(_)("Edit profile"),
			href: N(S),
			target: "_blank"
		}, {
			icon: m(() => [O(uf, { size: 20 })]),
			_: 1
		}, 8, [
			"aria-label",
			"title",
			"href"
		])) : R("", !0), i("div", bf, [N(g) ? (B(), A(s(T.value ? "a" : "div"), se({
			key: 0,
			class: ["profile-hover-card__header__container__avatar", { "profile-hover-card__profile-link": !!T.value }]
		}, D.value), {
			default: m(() => [O(De, {
				class: "avatar",
				user: c.value.userId,
				displayName: E.value,
				size: 96,
				disableMenu: "",
				disableTooltip: "",
				preloadedUserStatus: _e.value,
				isNoUser: !c.value.isUserAvatarVisible
			}, null, 8, [
				"user",
				"displayName",
				"preloadedUserStatus",
				"isNoUser"
			])]),
			_: 1
		}, 16, ["class"])) : (B(), P("div", xf)), i("div", Sf, [i("div", Cf, [
			T.value ? (B(), P("a", {
				key: 0,
				class: "profile-hover-card__profile-link",
				href: T.value
			}, [i("h2", null, F(E.value), 1)], 8, wf)) : (B(), P("h2", Tf, F(E.value), 1)),
			c.value.pronouns ? (B(), P("span", Ef, "·")) : R("", !0),
			c.value.pronouns ? (B(), P("span", Df, F(c.value.pronouns), 1)) : R("", !0)
		]), d.value.icon || d.value.message ? (B(), P("div", Of, [i("span", kf, [i("span", null, F(d.value.icon) + " " + F(d.value.message), 1)])])) : R("", !0)])])]), i("div", Af, [i("div", jf, [i("div", Mf, [N(g) ? R("", !0) : (B(), A(s(T.value ? "a" : "div"), se({
			key: 0,
			class: { "profile-hover-card__profile-link": !!T.value }
		}, D.value), {
			default: m(() => [O(De, {
				class: "avatar",
				user: c.value.userId,
				displayName: E.value,
				size: 135,
				disableMenu: "",
				disableTooltip: "",
				preloadedUserStatus: _e.value,
				isNoUser: !c.value.isUserAvatarVisible
			}, null, 8, [
				"user",
				"displayName",
				"preloadedUserStatus",
				"isNoUser"
			])]),
			_: 1
		}, 16, ["class"])), i("div", Nf, [e.actionsLoading && M.value.length === 0 ? (B(), P("div", Pf, [O(l, {
			size: 20,
			name: N(_)("Loading actions")
		}, null, 8, ["name"])])) : (B(), P(w, { key: 1 }, [I.value ? (B(), A(ne, se({
			key: 0,
			variant: "primary",
			class: "user-actions__primary"
		}, z.value, { onClick: I.value.onClick }), fe({
			default: m(() => [ae(" " + F(j(I.value)), 1)]),
			_: 2
		}, [I.value.iconSvg || I.value.icon ? {
			name: "icon",
			fn: m(() => [I.value.iconSvg ? (B(), A(N(re), {
				key: 0,
				svg: I.value.iconSvg
			}, null, 8, ["svg"])) : be(I.value.icon) ? (B(), P("img", {
				key: 1,
				src: I.value.icon,
				alt: "",
				class: "user-actions__primary__icon"
			}, null, 8, Ff)) : (B(), P("span", {
				key: 2,
				"aria-hidden": "true",
				class: de(["user-actions__primary__icon-class", I.value.icon])
			}, null, 2))]),
			key: "0"
		} : void 0]), 1040, ["onClick"])) : R("", !0), pe.value.length > 0 ? (B(), A(p, {
			key: 1,
			class: "user-actions__other",
			inline: N(g) ? 5 : 4
		}, {
			default: m(() => [(B(!0), P(w, null, o(pe.value, (e, t) => (B(), A(s(xe(e)), se({ key: e.id || e.href || t }, { ref_for: !0 }, Se(e)), fe({
				default: m(() => [ae(" " + F(j(e)), 1)]),
				_: 2
			}, [e.iconSvg || e.icon ? {
				name: "icon",
				fn: m(() => [e.iconSvg ? (B(), A(N(re), {
					key: 0,
					svg: e.iconSvg
				}, null, 8, ["svg"])) : be(e.icon) ? (B(), P("img", {
					key: 1,
					src: e.icon,
					alt: "",
					class: "user-actions__other__icon"
				}, null, 8, If)) : (B(), P("span", {
					key: 2,
					"aria-hidden": "true",
					class: de(["user-actions__other__icon-class", e.icon])
				}, null, 2))]),
				key: "0"
			} : void 0]), 1040))), 128))]),
			_: 1
		}, 8, ["inline"])) : R("", !0)], 64))])]), f.value ? (B(), P("div", Lf, [c.value.organisation || c.value.role || c.value.address || ue.value ? (B(), P("div", Rf, [
			c.value.organisation || c.value.role ? (B(), P("div", zf, [i("p", null, [
				O(Gd, {
					class: "detail-icon",
					size: 16,
					title: ""
				}),
				ae(" " + F(c.value.organisation) + " ", 1),
				c.value.organisation && c.value.role ? (B(), P("span", Bf, "•")) : R("", !0),
				ae(" " + F(c.value.role), 1)
			])])) : R("", !0),
			c.value.address ? (B(), P("div", Vf, [i("p", null, [O(rf, {
				class: "detail-icon",
				size: 16,
				title: ""
			}), ae(" " + F(c.value.address), 1)])])) : R("", !0),
			ue.value ? (B(), P("div", Hf, [i("p", null, [O(Zd, {
				class: "detail-icon",
				size: 16,
				title: ""
			}), ae(" " + F(ue.value), 1)])])) : R("", !0)
		])) : R("", !0), c.value.headline || c.value.biography ? (B(), P(w, { key: 1 }, [c.value.headline ? (B(), P("h3", Uf, F(c.value.headline), 1)) : R("", !0), c.value.biography ? (B(), P("div", Wf, [O(Rd, {
			text: c.value.biography,
			useExtendedMarkdown: ""
		}, null, 8, ["text"])])) : R("", !0)], 64)) : R("", !0)])) : R("", !0)])])], 64)) : R("", !0)], 10, _f));
	}
}), [["__scopeId", "data-v-592f6ec3"]]);
export { Gf as default, vt as n, lt as r, zd as t };
