import { r as e, t } from "./rolldown-runtime-QGRDbDUS.chunk.mjs";
import { a as n, f as r, g as i, i as a, l as o, m as s, n as c, o as l, p as u, r as d, s as f, t as p } from "./NcTextField-DCMWhriQ.chunk.mjs";
import { $ as m, $n as h, Ar as g, Cr as _, Fr as v, G as y, Ir as b, Jn as x, L as ee, Ln as te, Lr as S, Nr as ne, Or as re, Qn as C, Qr as ie, R as ae, Rn as oe, Tr as se, U as ce, W as le, Xr as ue, Yn as de, Zn as fe, _n as pe, ai as me, ar as w, br as he, c as ge, d as _e, ei as ve, er as T, f as ye, gn as be, hn as xe, hr as Se, i as Ce, ir as we, jr as Te, l as Ee, ln as De, mr as E, n as Oe, ni as D, nn as ke, nr as O, nt as Ae, oi as k, pr as je, qn as Me, qr as A, r as Ne, ri as Pe, rn as Fe, rr as Ie, sr as Le, t as Re, tr as j, u as ze, un as Be, ur as Ve, wr as He, xr as M, yr as Ue, z as We, zn as Ge } from "./NcActionRouter-Ca-mCYkz.chunk.mjs";
import { n as Ke, t as qe } from "./public-DCNW_wOS.chunk.mjs";
// node_modules/@nextcloud/dialogs/dist/chunks/_plugin-vue_export-helper-BOaGB7Aw.js
var N = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, P = Object.freeze({
	NONE: 0,
	READ: 1,
	UPDATE: 2,
	CREATE: 4,
	WRITE: 4,
	DELETE: 8,
	SHARE: 16,
	ALL: 31
});
window._nc_files_scope ??= {}, window._nc_files_scope.v4_0 ??= {};
var Je = window._nc_files_scope.v4_0, Ye = Object.freeze({
	Folder: "folder",
	File: "file"
}), Xe = Object.freeze({
	NEW: "new",
	FAILED: "failed",
	LOADING: "loading",
	LOCKED: "locked"
});
function Ze(e, t) {
	return e.match(t) !== null;
}
function Qe(e, t) {
	if (e.id && typeof e.id != "number" && typeof e.id != "string") throw Error("Invalid id type of value");
	if (!e.source) throw Error("Missing mandatory source");
	try {
		new URL(e.source);
	} catch {
		throw Error("Invalid source format, source must be a valid URL");
	}
	if (!e.source.startsWith("http")) throw Error("Invalid source format, only http(s) is supported");
	if (!e.root) throw Error("Missing mandatory root");
	if (typeof e.root != "string") throw Error("Invalid root type");
	if (!e.root.startsWith("/")) throw Error("Root must start with a leading slash");
	if (!e.source.includes(e.root)) throw Error("Root must be part of the source");
	if (Ze(e.source, t)) {
		let n = e.source.match(t)[0];
		if (!e.source.includes(l(n, e.root))) throw Error("The root must be relative to the service. e.g /files/emma");
	}
	if (e.displayname && typeof e.displayname != "string") throw Error("Invalid displayname type");
	if (e.mtime && !(e.mtime instanceof Date)) throw Error("Invalid mtime type");
	if (e.crtime && !(e.crtime instanceof Date)) throw Error("Invalid crtime type");
	if (!e.mime || typeof e.mime != "string" || !e.mime.match(/^[-\w.]+\/[-+\w.]+$/gi)) throw Error("Missing or invalid mandatory mime");
	if ("size" in e && typeof e.size != "number" && e.size !== void 0) throw Error("Invalid size type");
	if ("permissions" in e && e.permissions !== void 0 && !(typeof e.permissions == "number" && e.permissions >= P.NONE && e.permissions <= P.ALL)) throw Error("Invalid permissions");
	if (e.owner && e.owner !== null && typeof e.owner != "string") throw Error("Invalid owner type");
	if (e.attributes && typeof e.attributes != "object") throw Error("Invalid attributes type");
	if (e.status && !Object.values(Xe).includes(e.status)) throw Error("Status must be a valid NodeStatus");
}
function $e(e) {
	e.mtime && typeof e.mtime == "string" && !isNaN(Date.parse(e.mtime)) && JSON.stringify(new Date(e.mtime)) === JSON.stringify(e.mtime) && (e.mtime = new Date(e.mtime)), e.crtime && typeof e.crtime == "string" && !isNaN(Date.parse(e.crtime)) && JSON.stringify(new Date(e.crtime)) === JSON.stringify(e.crtime) && (e.crtime = new Date(e.crtime));
}
function et(e) {
	if (e instanceof RegExp) return e;
	let t = e.match(/(\/?)(.+)\1([a-z]*)/i);
	if (!t) throw Error("Invalid regular expression format.");
	let n = Array.from(new Set(t[3])).filter((e) => "gimsuy".includes(e)).join("");
	return new RegExp(t[2], n);
}
// node_modules/@nextcloud/files/dist/node/node.mjs
var tt = class e {
	_attributes;
	_data;
	_knownDavService = /(remote|public)\.php\/(web)?dav/i;
	readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(e.prototype)).filter((e) => typeof e[1].get == "function" && e[0] !== "__proto__").map((e) => e[0]);
	handler = {
		set: (e, t, n) => !this.readonlyAttributes.includes(t) && Reflect.set(e, t, n),
		deleteProperty: (e, t) => !this.readonlyAttributes.includes(t) && Reflect.deleteProperty(e, t)
	};
	constructor(...[e, t]) {
		e.mime ||= "application/octet-stream", $e(e), t = et(t || this._knownDavService), Qe(e, t), this._data = {
			...e,
			attributes: {}
		}, this._attributes = new Proxy(this._data.attributes, this.handler), this.update(e.attributes ?? {}), t && (this._knownDavService = t);
	}
	get source() {
		return this._data.source.replace(/\/$/i, "");
	}
	get encodedSource() {
		let { origin: e } = new URL(this.source);
		return e + a(this.source.slice(e.length));
	}
	get basename() {
		return c(this.source);
	}
	get displayname() {
		return this._data.displayname || this.basename;
	}
	set displayname(e) {
		Qe({
			...this._data,
			displayname: e
		}, this._knownDavService), this._data.displayname = e;
	}
	get extension() {
		return n(this.source);
	}
	get dirname() {
		return d(this.path);
	}
	get mime() {
		return this._data.mime || "application/octet-stream";
	}
	set mime(e) {
		e ??= "application/octet-stream", Qe({
			...this._data,
			mime: e
		}, this._knownDavService), this._data.mime = e;
	}
	get mtime() {
		return this._data.mtime;
	}
	set mtime(e) {
		Qe({
			...this._data,
			mtime: e
		}, this._knownDavService), this._data.mtime = e;
	}
	get crtime() {
		return this._data.crtime;
	}
	get size() {
		return this._data.size;
	}
	set size(e) {
		Qe({
			...this._data,
			size: e
		}, this._knownDavService), this.updateMtime(), this._data.size = e;
	}
	get attributes() {
		return this._attributes;
	}
	get permissions() {
		return this.owner === null && !this.isDavResource ? P.READ : this._data.permissions === void 0 ? P.NONE : this._data.permissions;
	}
	set permissions(e) {
		Qe({
			...this._data,
			permissions: e
		}, this._knownDavService), this.updateMtime(), this._data.permissions = e;
	}
	get owner() {
		return this.isDavResource ? this._data.owner : null;
	}
	get isDavResource() {
		return Ze(this.source, this._knownDavService);
	}
	get root() {
		return this._data.root.replace(/^(.+)\/$/, "$1");
	}
	get path() {
		let e = this.source.indexOf("://"), t = this.source.slice(0, e), n = this.source.slice(e + 3), r = n.indexOf("/"), i = n.slice(0, r), o = n.slice(r), s = `${t}://${i}${a(o)}`, c = new URL(s), l = decodeURIComponent(c.pathname);
		this.isDavResource && (l = l.split(this._knownDavService).pop());
		let u = l.indexOf(this.root), d = this.root.replace(/\/$/, "");
		return l.slice(u + d.length) || "/";
	}
	get fileid() {
		return typeof this._data?.id == "number" ? this._data.id : void 0;
	}
	get id() {
		if (!(this._data?.id === void 0 || typeof this._data.id == "number" && this._data.id < 0)) return String(this._data.id);
	}
	get status() {
		return this._data?.status;
	}
	set status(e) {
		Qe({
			...this._data,
			status: e
		}, this._knownDavService), this._data.status = e;
	}
	move(e) {
		Qe({
			...this._data,
			source: e
		}, this._knownDavService);
		let t = this.basename;
		this._data.source = e, this.displayname === t && this.basename !== t && (this.displayname = this.basename);
	}
	rename(e) {
		if (e.includes("/")) throw Error("Invalid basename");
		this.move(d(this.source) + "/" + e);
	}
	updateMtime() {
		this._data.mtime && (this._data.mtime = /* @__PURE__ */ new Date());
	}
	update(e) {
		for (let [t, n] of Object.entries(e)) try {
			n === void 0 ? delete this.attributes[t] : this.attributes[t] = n;
		} catch (e) {
			if (e instanceof TypeError) continue;
			throw e;
		}
	}
	clone() {
		return new this.constructor(structuredClone(this._data), this._knownDavService);
	}
	toJSON() {
		return JSON.stringify([structuredClone(this._data), this._knownDavService.toString()]);
	}
}, nt = class extends tt {
	constructor(...[e, t]) {
		super(e, t);
	}
	get type() {
		return Ye.File;
	}
};
// node_modules/@nextcloud/files/dist/utils/sorting.mjs
function rt(e) {
	return e instanceof Date ? e.toISOString() : String(e);
}
function it(e, t, n) {
	t ??= [(e) => e], n ??= [];
	let r = t.map((e, t) => (n[t] ?? "asc") === "asc" ? 1 : -1), i = Intl.Collator([Fe(), ke()], {
		numeric: !0,
		usage: "sort"
	});
	return [...e].sort((e, n) => {
		for (let [a, o] of t.entries()) {
			let t = i.compare(rt(o(e)), rt(o(n)));
			if (t !== 0) return t * r[a];
		}
		return 0;
	});
}
// node_modules/@nextcloud/files/dist/utils/fileSorting.mjs
var at = Object.freeze({
	Name: "basename",
	Modified: "mtime",
	Size: "size"
});
function ot(e, t = {}) {
	let n = {
		sortingMode: at.Name,
		sortingOrder: "asc",
		...t
	};
	function r(e) {
		let t = e.displayname || e.attributes?.displayname || e.basename || "";
		return e.type === Ye.Folder ? t : t.lastIndexOf(".") > 0 ? t.slice(0, t.lastIndexOf(".")) : t;
	}
	return it(e, [
		...n.sortFavoritesFirst ? [(e) => e.attributes?.favorite !== 1] : [],
		...n.sortFoldersFirst ? [(e) => e.type !== "folder"] : [],
		...n.sortingMode === at.Name ? [] : [(e) => e[n.sortingMode] ?? e.attributes[n.sortingMode]],
		(e) => r(e),
		(e) => e.basename
	], [
		...n.sortFavoritesFirst ? ["asc"] : [],
		...n.sortFoldersFirst ? ["asc"] : [],
		...n.sortingMode === at.Modified ? [n.sortingOrder === "asc" ? "desc" : "asc"] : [],
		...n.sortingMode !== at.Modified && n.sortingMode !== at.Name ? [n.sortingOrder] : [],
		n.sortingOrder,
		n.sortingOrder
	]);
}
// node_modules/@nextcloud/files/dist/node/folder.mjs
var st = class extends tt {
	constructor(...[e, t]) {
		super({
			...e,
			mime: "httpd/unix-directory"
		}, t);
	}
	get type() {
		return Ye.Folder;
	}
	get extension() {
		return null;
	}
	get mime() {
		return "httpd/unix-directory";
	}
}, ct = Object.freeze({
	ReservedName: "reserved name",
	Character: "character",
	Extension: "extension"
}), lt = class extends Error {
	constructor(e) {
		super(`Invalid ${e.reason} '${e.segment}' in filename '${e.filename}'`, { cause: e });
	}
	get filename() {
		return this.cause.filename;
	}
	get reason() {
		return this.cause.reason;
	}
	get segment() {
		return this.cause.segment;
	}
};
function ut(e) {
	let t = _e().files, n = t.forbidden_filename_characters ?? ["/", "\\"];
	for (let t of n) if (e.includes(t)) throw new lt({
		segment: t,
		reason: ct.Character,
		filename: e
	});
	if (e = e.toLocaleLowerCase(), (t.forbidden_filenames ?? [".htaccess"]).includes(e)) throw new lt({
		filename: e,
		segment: e,
		reason: ct.ReservedName
	});
	let r = e.indexOf(".", 1), i = e.substring(0, r === -1 ? void 0 : r);
	if ((t.forbidden_filename_basenames ?? []).includes(i)) throw new lt({
		filename: e,
		segment: i,
		reason: ct.ReservedName
	});
	let a = t.forbidden_filename_extensions ?? [];
	for (let t of a) if (e.length > t.length && e.endsWith(t)) throw new lt({
		segment: t,
		reason: ct.Extension,
		filename: e
	});
}
// node_modules/@nextcloud/files/dist/utils/fileSize.mjs
var dt = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB"
], ft = [
	"B",
	"KiB",
	"MiB",
	"GiB",
	"TiB",
	"PiB"
];
function pt(e, t = !1, n = !1, r = !1) {
	n &&= !r, typeof e == "string" && (e = Number(e));
	let i = e > 0 ? Math.floor(Math.log(e) / Math.log(r ? 1e3 : 1024)) : 0;
	i = Math.min((n ? ft.length : dt.length) - 1, i);
	let a = n ? ft[i] : dt[i], o = (e / (r ? 1e3 : 1024) ** i).toFixed(1);
	return t === !0 && i === 0 ? (o === "0.0" ? "0 " : "< 1 ") + (n ? ft[1] : dt[1]) : (o = i < 2 ? parseFloat(o).toFixed(0) : parseFloat(o).toLocaleString(ke()), o + " " + a);
}
// node_modules/eventemitter3/index.mjs
var mt = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn !== t || i && !o.once || n && o.context !== n || s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})))(), 1), ht = class e extends Error {
	name = "TimeoutError";
	constructor(t, n) {
		super(t, n), Error.captureStackTrace?.(this, e);
	}
}, gt = (e) => e.reason ?? new DOMException("This operation was aborted.", "AbortError");
function _t(e, t) {
	let { milliseconds: n, fallback: r, message: i, customTimers: a = {
		setTimeout,
		clearTimeout
	}, signal: o } = t, s, c, l = new Promise((t, l) => {
		if (typeof n != "number" || Math.sign(n) !== 1) throw TypeError(`Expected \`milliseconds\` to be a positive number, got \`${n}\``);
		if (o?.aborted) {
			l(gt(o)), e.then(t, l);
			return;
		}
		if (o && (c = () => {
			l(gt(o));
		}, o.addEventListener("abort", c, { once: !0 })), e.then(t, l), n === Infinity) return;
		let u = new ht();
		s = a.setTimeout.call(void 0, () => {
			if (r) try {
				t(r());
			} catch (e) {
				l(e);
			}
			else typeof e.cancel == "function" && e.cancel(), i === !1 ? t() : i instanceof Error ? l(i) : (u.message = i ?? `Promise timed out after ${n} milliseconds`, l(u));
		}, n);
	}).finally(() => {
		l.clear(), c && o && o.removeEventListener("abort", c);
	});
	return l.clear = () => {
		a.clearTimeout.call(void 0, s), s = void 0;
	}, l;
}
// node_modules/p-queue/dist/lower-bound.js
function vt(e, t, n) {
	let r = 0, i = e.length;
	for (; i > 0;) {
		let a = Math.trunc(i / 2), o = r + a;
		n(e[o], t) <= 0 ? (r = ++o, i -= a + 1) : i = a;
	}
	return r;
}
// node_modules/p-queue/dist/priority-queue.js
var yt = 100, bt = class {
	#e = [];
	#t = 0;
	enqueue(e, t) {
		let { priority: n = 0, id: r } = t ?? {}, { size: i } = this, a = {
			priority: n,
			id: r,
			run: e
		};
		if (i === 0) {
			this.#e.length = 0, this.#t = 0, this.#e.push(a);
			return;
		}
		if (this.#e.at(-1).priority >= n) {
			this.#e.push(a);
			return;
		}
		this.#n();
		let o = vt(this.#e, a, (e, t) => t.priority - e.priority);
		this.#e.splice(o, 0, a);
	}
	setPriority(e, t) {
		let n = this.#e.findIndex((t, n) => n >= this.#t && t.id === e);
		if (n === -1) throw ReferenceError(`No promise function with the id "${e}" exists in the queue.`);
		let [r] = this.#e.splice(n, 1);
		this.enqueue(r.run, {
			priority: t,
			id: e
		});
	}
	remove(e) {
		let t = this.#e.findIndex((t, n) => n < this.#t ? !1 : typeof e == "string" ? t.id === e : t.run === e);
		t !== -1 && this.#e.splice(t, 1);
	}
	dequeue() {
		if (this.#t === this.#e.length) return;
		let e = this.#e[this.#t];
		return this.#t++, this.#t === this.#e.length ? (this.#e.length = 0, this.#t = 0) : this.#t > yt && this.#t > this.#e.length / 2 && this.#n(), e?.run;
	}
	filter(e) {
		let t = [];
		for (let n = this.#t; n < this.#e.length; n++) {
			let r = this.#e[n];
			r.priority === e.priority && t.push(r.run);
		}
		return t;
	}
	get size() {
		return this.#e.length - this.#t;
	}
	#n() {
		this.#t !== 0 && (this.#e.splice(0, this.#t), this.#t = 0);
	}
}, xt = new class extends mt.default {
	#e;
	#t;
	#n = 0;
	#r;
	#i = !1;
	#a = !1;
	#o;
	#s = 0;
	#c;
	#l;
	#u;
	#d = [];
	#f = 0;
	#p;
	#m;
	#h = 0;
	#g;
	#_;
	#v = 1n;
	#y = /* @__PURE__ */ new Map();
	#b = /* @__PURE__ */ new Set();
	timeout;
	constructor(e) {
		if (super(), e = {
			carryoverIntervalCount: !1,
			intervalCap: Infinity,
			interval: 0,
			concurrency: Infinity,
			autoStart: !0,
			queueClass: bt,
			strict: !1,
			...e
		}, !(typeof e.intervalCap == "number" && e.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${e.intervalCap?.toString() ?? ""}\` (${typeof e.intervalCap})`);
		if (e.interval === void 0 || !(Number.isFinite(e.interval) && e.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${e.interval?.toString() ?? ""}\` (${typeof e.interval})`);
		if (e.strict && e.interval === 0) throw TypeError("The `strict` option requires a non-zero `interval`");
		if (e.strict && e.intervalCap === Infinity) throw TypeError("The `strict` option requires a finite `intervalCap`");
		if (this.#e = e.carryoverIntervalCount ?? e.carryoverConcurrencyCount ?? !1, this.#t = e.intervalCap === Infinity || e.interval === 0, this.#r = e.intervalCap, this.#o = e.interval, this.#u = e.strict, this.#p = new e.queueClass(), this.#m = e.queueClass, this.concurrency = e.concurrency, e.timeout !== void 0 && !(Number.isFinite(e.timeout) && e.timeout > 0)) throw TypeError(`Expected \`timeout\` to be a positive finite number, got \`${e.timeout}\` (${typeof e.timeout})`);
		this.timeout = e.timeout, this.#_ = e.autoStart === !1, this.#R();
	}
	#x(e) {
		for (; this.#f < this.#d.length;) {
			let t = this.#d[this.#f];
			if (t !== void 0 && e - t >= this.#o) this.#f++;
			else break;
		}
		(this.#f > 100 && this.#f > this.#d.length / 2 || this.#f === this.#d.length) && (this.#d = this.#d.slice(this.#f), this.#f = 0);
	}
	#S(e) {
		this.#u ? this.#d.push(e) : this.#n++;
	}
	#C() {
		this.#u ? this.#d.length > this.#f && this.#d.pop() : this.#n > 0 && this.#n--;
	}
	#w() {
		return this.#d.length - this.#f;
	}
	get #T() {
		return this.#t ? !0 : this.#u ? this.#w() < this.#r : this.#n < this.#r;
	}
	get #E() {
		return this.#h < this.#g;
	}
	#D() {
		this.#h--, this.#h === 0 && this.emit("pendingZero"), this.#N(), this.emit("next");
	}
	#O() {
		this.#l = void 0, this.#F(), this.#P();
	}
	#k(e) {
		if (this.#u) {
			if (this.#x(e), this.#w() >= this.#r) {
				let t = this.#d[this.#f], n = this.#o - (e - t);
				return this.#A(n), !0;
			}
			return !1;
		}
		if (this.#c === void 0) {
			let t = this.#s - e;
			if (t < 0) this.#n = this.#e ? this.#h : 0;
			else return this.#A(t), !0;
		}
		return !1;
	}
	#A(e) {
		this.#l === void 0 && (this.#l = setTimeout(() => {
			this.#O();
		}, e));
	}
	#j() {
		this.#c &&= (clearInterval(this.#c), void 0);
	}
	#M() {
		this.#l &&= (clearTimeout(this.#l), void 0);
	}
	#N() {
		if (this.#p.size === 0) {
			if (this.#j(), this.emit("empty"), this.#h === 0) {
				if (this.#M(), this.#u && this.#f > 0) {
					let e = Date.now();
					this.#x(e);
				}
				this.emit("idle");
			}
			return !1;
		}
		let e = !1;
		if (!this.#_) {
			let t = Date.now(), n = !this.#k(t);
			if (this.#T && this.#E) {
				let r = this.#p.dequeue();
				this.#t || (this.#S(t), this.#z()), n && this.#P(), r(), this.emit("active"), e = !0;
			}
		}
		return e;
	}
	#P() {
		this.#t || this.#c !== void 0 || this.#u || (this.#c = setInterval(() => {
			this.#F();
		}, this.#o), this.#s = Date.now() + this.#o);
	}
	#F() {
		this.#u || (this.#c !== void 0 && (this.#n === 0 && this.#h === 0 ? this.#j() : this.#s = Date.now() + this.#o), this.#n = this.#e ? this.#h : 0), this.#I(), this.#z();
	}
	#I() {
		for (; this.#N(););
	}
	get concurrency() {
		return this.#g;
	}
	set concurrency(e) {
		if (!(typeof e == "number" && e >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e}\` (${typeof e})`);
		this.#g = e, this.#I();
	}
	setPriority(e, t) {
		if (typeof t != "number" || !Number.isFinite(t)) throw TypeError(`Expected \`priority\` to be a finite number, got \`${t}\` (${typeof t})`);
		this.#p.setPriority(e, t);
	}
	async add(e, t = {}) {
		if (t = {
			timeout: this.timeout,
			...t,
			id: t.id ?? (this.#v++).toString()
		}, t.timeout !== void 0 && !(Number.isFinite(t.timeout) && t.timeout > 0)) throw TypeError(`Expected \`timeout\` to be a positive finite number, got \`${t.timeout}\` (${typeof t.timeout})`);
		return new Promise((n, r) => {
			let i = Symbol(`task-${t.id}`), a = () => void 0, o = async () => {
				a(), this.#h++, this.#y.set(i, {
					id: t.id,
					priority: t.priority ?? 0,
					startTime: Date.now(),
					timeout: t.timeout
				});
				let o;
				try {
					try {
						t.signal?.throwIfAborted();
					} catch (e) {
						throw this.#B(), this.#y.delete(i), e;
					}
					let r = e({ signal: t.signal });
					if (t.timeout !== void 0 && (r = _t(Promise.resolve(r), {
						milliseconds: t.timeout,
						message: `Task timed out after ${t.timeout}ms (queue has ${this.#h} running, ${this.#p.size} waiting)`
					})), t.signal) {
						let { signal: e } = t;
						r = Promise.race([r, new Promise((t, n) => {
							o = () => {
								n(e.reason);
							}, e.addEventListener("abort", o, { once: !0 }), e.aborted && o();
						})]);
					}
					let a = await r;
					n(a), this.emit("completed", a);
				} catch (e) {
					r(e), this.emit("error", e);
				} finally {
					o && t.signal?.removeEventListener("abort", o), this.#y.delete(i), queueMicrotask(() => {
						this.#D();
					});
				}
			};
			this.#p.enqueue(o, t);
			let s = () => {
				this.#p instanceof bt ? this.#p.remove(o) : this.#p.remove?.(t.id);
			};
			if (t.signal) {
				let { signal: e } = t, n = () => {
					a(), s(), r(e.reason), this.#N(), this.emit("next");
				};
				if (a = () => {
					e.removeEventListener("abort", n), this.#b.delete(a);
				}, e.aborted) {
					n();
					return;
				}
				e.addEventListener("abort", n, { once: !0 }), this.#b.add(a);
			}
			this.emit("add"), this.#N();
		});
	}
	async addAll(e, t) {
		return Promise.all(e.map(async (e) => this.add(e, t)));
	}
	start() {
		return this.#_ && (this.#_ = !1, this.#I()), this;
	}
	pause() {
		this.#_ = !0;
	}
	clear() {
		for (let e of this.#b) e();
		this.#p = new this.#m(), this.#j(), this.#V(), this.emit("empty"), this.#h === 0 && (this.#M(), this.emit("idle")), this.emit("next");
	}
	async onEmpty() {
		this.#p.size !== 0 && await this.#L("empty");
	}
	async onSizeLessThan(e) {
		this.#p.size < e || await this.#L(["next", "active"], () => this.#p.size < e);
	}
	async onIdle() {
		(this.#h !== 0 || this.#p.size !== 0) && await this.#L("idle");
	}
	async onPendingZero() {
		this.#h !== 0 && await this.#L("pendingZero");
	}
	async onRateLimit() {
		this.isRateLimited || await this.#L("rateLimit");
	}
	async onRateLimitCleared() {
		this.isRateLimited && await this.#L("rateLimitCleared");
	}
	onError() {
		return new Promise((e, t) => {
			let n = (e) => {
				this.off("error", n), t(e);
			};
			this.on("error", n);
		});
	}
	async #L(e, t) {
		let n = Array.isArray(e) ? e : [e];
		return new Promise((e) => {
			let r = () => {
				if (!t || t()) {
					for (let e of n) this.off(e, r);
					e();
				}
			};
			for (let e of n) this.on(e, r);
		});
	}
	get size() {
		return this.#p.size;
	}
	sizeBy(e) {
		return this.#p.filter(e).length;
	}
	get pending() {
		return this.#h;
	}
	get isPaused() {
		return this.#_;
	}
	#R() {
		this.#t || (this.on("add", () => {
			this.#p.size > 0 && this.#z();
		}), this.on("next", () => {
			this.#z();
		}));
	}
	#z() {
		this.#t || this.#a || (this.#a = !0, queueMicrotask(() => {
			this.#a = !1, this.#V();
		}));
	}
	#B() {
		this.#t || (this.#C(), this.#z());
	}
	#V() {
		let e = this.#i;
		if (this.#t || this.#p.size === 0) {
			e && (this.#i = !1, this.emit("rateLimitCleared"));
			return;
		}
		let t;
		if (this.#u) {
			let e = Date.now();
			this.#x(e), t = this.#w();
		} else t = this.#n;
		let n = t >= this.#r;
		n !== e && (this.#i = n, this.emit(n ? "rateLimit" : "rateLimitCleared"));
	}
	get isRateLimited() {
		return this.#i;
	}
	get isSaturated() {
		return this.#h === this.#g && this.#p.size > 0 || this.isRateLimited && this.#p.size > 0;
	}
	get runningTasks() {
		return [...this.#y.values()].map((e) => ({
			...e,
			timeoutRemaining: e.timeout ? Math.max(0, e.startTime + e.timeout - Date.now()) : void 0
		}));
	}
}({ concurrency: 5 });
function St(e) {
	let { resolve: t, promise: n } = Promise.withResolvers();
	return xt.add(() => {
		let r = new Image();
		return r.onerror = () => t(!1), r.onload = () => t(!0), r.src = e, n;
	}), n;
}
function Ct(e, t = {}) {
	t = {
		cropPreview: !1,
		mimeFallback: !0,
		...t,
		size: kt(t.size ?? At())
	};
	try {
		let n = e.attributes?.previewUrl || Be("/core/preview?fileId={fileid}", { fileid: e.fileid }), r;
		try {
			r = new URL(n);
		} catch {
			r = new URL(n, window.location.origin);
		}
		return r.searchParams.set("x", `${t.size}`), r.searchParams.set("y", `${t.size}`), r.searchParams.set("mimeFallback", `${t.mimeFallback}`), r.searchParams.set("a", t.cropPreview === !0 ? "0" : "1"), r.searchParams.set("c", `${e.attributes.etag}`), r;
	} catch {
		return null;
	}
}
function wt(e, t) {
	let n = A(null), r = A(!1);
	return b(() => {
		r.value = !1, n.value = Ct(ve(e), ve(t || {})), n.value && ve(e).type === Ye.File && St(n.value.href).then((e) => {
			r.value = e;
		});
	}), {
		previewURL: n,
		previewLoaded: r
	};
}
var Tt = "--file-picker-preview-size", Et = 64, Dt = 256, Ot;
function kt(e) {
	return e <= Et ? Et : Dt;
}
function At() {
	if (Ot !== void 0) return Ot;
	let e = getComputedStyle(document.documentElement).getPropertyValue(Tt).trim(), t = Number.parseFloat(e);
	return Ot = kt(Number.isFinite(t) && t > 0 ? Math.round(t) : Et), Ot;
}
// node_modules/@mdi/js/mdi.js
var jt = "M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z", Mt = "M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z", Nt = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z", Pt = "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z", Ft = "M7 14C5.9 14 5 13.1 5 12S5.9 10 7 10 9 10.9 9 12 8.1 14 7 14M12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12S3.7 18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z", It = "M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z", Lt = "M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V5A2,2 0 0,0 17,3H7A2,2 0 0,0 5,5V15A2,2 0 0,0 7,17H11V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15M7,15V5H17V15H7Z", Rt = "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z", zt = "M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58M13 20L4 11V4H11L20 13M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z", Bt = [
	"data-timestamp",
	"title",
	"textContent"
], Vt = /* @__PURE__ */ Le({
	__name: "NcDateTime",
	props: {
		timestamp: {},
		format: { default: () => ({
			timeStyle: "medium",
			dateStyle: "short"
		}) },
		relativeTime: {
			type: [Boolean, String],
			default: "long"
		},
		ignoreSeconds: { type: Boolean }
	},
	setup(e) {
		let t = e, n = C(() => ({ format: t.format })), r = C(() => ({
			ignoreSeconds: t.ignoreSeconds,
			relativeTime: t.relativeTime || "long",
			update: t.relativeTime !== !1
		})), i = Ee(ie(() => t.timestamp), n), a = ge(ie(() => t.timestamp), r), o = C(() => t.relativeTime ? a.value : i.value);
		return (t, n) => (M(), O("span", {
			class: "nc-datetime",
			dir: "auto",
			"data-timestamp": e.timestamp,
			title: D(i),
			textContent: k(o.value)
		}, null, 8, Bt));
	}
}), Ht;
(function(e) {
	e[e.User = 0] = "User", e[e.Group = 1] = "Group", e[e.Link = 3] = "Link", e[e.Email = 4] = "Email", e[e.Remote = 6] = "Remote", e[e.Team = 7] = "Team", e[e.Guest = 8] = "Guest", e[e.RemoteGroup = 9] = "RemoteGroup", e[e.Room = 10] = "Room", e[e.Deck = 12] = "Deck", e[e.FederatedGroup = 14] = "FederatedGroup", e[e.ScienceMesh = 15] = "ScienceMesh";
})(Ht ||= {});
// node_modules/@nextcloud/vue/dist/chunks/NcBreadcrumb.mjs
var Ut = {
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
}, Wt = ["aria-hidden", "aria-label"], Gt = [
	"fill",
	"width",
	"height"
], Kt = { key: 0 };
function qt(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon chevron-right-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Kt, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }, null, -1)], 8, Gt))], 16, Wt);
}
var Jt = {
	name: "NcBreadcrumb",
	components: {
		NcActions: ee,
		ChevronRight: /* @__PURE__ */ pe(Ut, [["render", qt]]),
		NcButton: be
	},
	inheritAttrs: !1,
	props: {
		name: {
			type: String,
			required: !0
		},
		title: {
			type: String,
			default: null
		},
		to: {
			type: [String, Object],
			default: void 0
		},
		href: {
			type: String,
			default: void 0
		},
		icon: {
			type: String,
			default: ""
		},
		forceIconText: {
			type: Boolean,
			default: !1
		},
		disableDrop: {
			type: Boolean,
			default: !1
		},
		forceMenu: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		class: {
			type: [
				String,
				Array,
				Object
			],
			default: ""
		}
	},
	emits: [
		"dragenter",
		"dragleave",
		"dropped",
		"update:open"
	],
	setup() {
		let e = Ae();
		return {
			actionsContainer: `.vue-crumb[data-crumb-id="${e}"]`,
			crumbId: e
		};
	},
	data() {
		return { hovering: !1 };
	},
	computed: { linkAttributes() {
		return this.to ? {
			to: this.to,
			...this.$attrs
		} : this.href ? {
			href: this.href,
			...this.$attrs
		} : this.$attrs;
	} },
	methods: {
		onOpenChange(e) {
			this.$emit("update:open", e);
		},
		dropped(e) {
			return this.disableDrop || (this.$emit("dropped", e, this.to || this.href), this.$parent.$emit("dropped", e, this.to || this.href), this.hovering = !1), !1;
		},
		dragEnter(e) {
			this.$emit("dragenter", e), this.disableDrop || (this.hovering = !0);
		},
		dragLeave(e) {
			this.$emit("dragleave", e), this.disableDrop || e.target.contains(e.relatedTarget) || this.$refs.crumb.contains(e.relatedTarget) || (this.hovering = !1);
		}
	}
}, Yt = ["data-crumb-id"];
function Xt(e, t, n, r, i, a) {
	let o = se("NcButton"), s = se("NcActions"), c = se("ChevronRight");
	return M(), O("li", {
		ref: "crumb",
		class: Pe(["vue-crumb", [{ "vue-crumb--hovered": i.hovering }, e.$props.class]]),
		"data-crumb-id": r.crumbId,
		draggable: "false",
		onDragstart: x(() => {}, ["prevent"]),
		onDrop: t[0] ||= x((...e) => a.dropped && a.dropped(...e), ["prevent"]),
		onDragover: x(() => {}, ["prevent"]),
		onDragenter: t[1] ||= (...e) => a.dragEnter && a.dragEnter(...e),
		onDragleave: t[2] ||= (...e) => a.dragLeave && a.dragLeave(...e)
	}, [
		(n.name || n.icon || e.$slots.icon) && !e.$slots.default ? (M(), T(o, E({
			key: 0,
			"aria-label": n.icon ? n.name : void 0,
			variant: "tertiary"
		}, a.linkAttributes), Ie({ _: 2 }, [e.$slots.icon || n.icon ? {
			name: "icon",
			fn: S(() => [He(e.$slots, "icon", {}, () => [h("span", { class: Pe([n.icon, "icon"]) }, null, 2)], !0)]),
			key: "0"
		} : void 0, !(e.$slots.icon || n.icon) || n.forceIconText ? {
			name: "default",
			fn: S(() => [we(k(n.name), 1)]),
			key: "1"
		} : void 0]), 1040, ["aria-label"])) : j("", !0),
		e.$slots.default ? (M(), T(s, {
			key: 1,
			ref: "actions",
			container: r.actionsContainer,
			forceMenu: n.forceMenu,
			forceName: "",
			menuName: n.name,
			open: n.open,
			title: n.title,
			variant: "tertiary",
			"onUpdate:open": a.onOpenChange
		}, {
			icon: S(() => [He(e.$slots, "menu-icon", {}, void 0, !0)]),
			default: S(() => [He(e.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, [
			"container",
			"forceMenu",
			"menuName",
			"open",
			"title",
			"onUpdate:open"
		])) : j("", !0),
		w(c, {
			class: "vue-crumb__separator",
			size: 20
		})
	], 42, Yt);
}
var Zt = /* @__PURE__ */ pe(Jt, [["render", Xt], ["__scopeId", "data-v-7cec4a3e"]]), Qt = {
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
}, $t = ["aria-hidden", "aria-label"], en = [
	"fill",
	"width",
	"height"
], tn = { key: 0 };
function nn(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon folder-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", tn, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" }, null, -1)], 8, en))], 16, $t);
}
var rn = /* @__PURE__ */ pe(Qt, [["render", nn]]), F = "vue-crumb", an = /* @__PURE__ */ pe({
	name: "NcBreadcrumbs",
	components: {
		NcActions: ee,
		NcActionButton: m,
		NcActionRouter: Re,
		NcActionLink: Oe,
		NcBreadcrumb: Zt,
		IconFolder: rn
	},
	props: {
		rootIcon: {
			type: String,
			default: "icon-home"
		},
		ariaLabel: {
			type: String,
			default: null
		}
	},
	emits: ["dropped"],
	data() {
		return {
			hiddenIndices: [],
			menuBreadcrumbProps: {
				name: "",
				forceMenu: !0,
				disableDrop: !0,
				open: !1
			},
			breadcrumbsRefs: []
		};
	},
	created() {
		window.addEventListener("resize", Ne(() => {
			this.handleWindowResize();
		}, 100)), oe("navigation-toggled", this.delayedResize);
	},
	mounted() {
		this.handleWindowResize();
	},
	updated() {
		this.delayedResize(), this.$nextTick(() => {
			this.hideCrumbs();
		});
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.handleWindowResize), Ge("navigation-toggled", this.delayedResize);
	},
	methods: {
		closeActions(e) {
			this.$refs.actionsBreadcrumb.$el.contains(e.relatedTarget) || (this.menuBreadcrumbProps.open = !1);
		},
		async delayedResize() {
			await this.$nextTick(), this.handleWindowResize();
		},
		handleWindowResize() {
			if (!this.$refs.container) return;
			let e = this.breadcrumbsRefs.length, t = [], n = this.$refs.container.offsetWidth, r = this.getTotalWidth();
			this.$refs.breadcrumb__actions && (r += this.$refs.breadcrumb__actions.offsetWidth);
			let i = r - n;
			i += i > 0 ? 64 : 0;
			let a = 0, o = Math.floor(e / 2);
			for (; i > 0 && a < e - 2;) {
				let n = o + (a % 2 ? a + 1 : a) / 2 * (-1) ** (a + e % 2);
				i -= this.getWidth(this.breadcrumbsRefs[n]?.$el, n === this.breadcrumbsRefs.length - 1), t.push(n), a++;
			}
			this.arraysEqual(this.hiddenIndices, t.sort((e, t) => e - t)) || (this.hiddenIndices = t);
		},
		arraysEqual(e, t) {
			if (e.length !== t.length) return !1;
			if (e === t) return !0;
			if (e === null || t === null) return !1;
			for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
			return !0;
		},
		getTotalWidth() {
			return this.breadcrumbsRefs.reduce((e, t, n) => e + this.getWidth(t.$el, n === this.breadcrumbsRefs.length - 1), 0);
		},
		getWidth(e, t) {
			if (!e?.classList) return 0;
			let n = e.classList.contains(`${F}--hidden`);
			e.style.minWidth = "auto", t && (e.style.maxWidth = "210px"), e.classList.remove(`${F}--hidden`);
			let r = e.offsetWidth;
			return n && e.classList.add(`${F}--hidden`), e.style.minWidth = "", e.style.maxWidth = "", r;
		},
		preventDefault(e) {
			return e.preventDefault && e.preventDefault(), !1;
		},
		dragStart(e) {
			return this.preventDefault(e);
		},
		dropped(e, t, n) {
			n || this.$emit("dropped", e, t), this.menuBreadcrumbProps.open = !1;
			let r = document.querySelectorAll(`.${F}`);
			for (let e of r) e.classList.remove(`${F}--hovered`);
			return this.preventDefault(e);
		},
		dragOver(e) {
			return this.preventDefault(e);
		},
		dragEnter(e, t) {
			if (!t && e.target.closest) {
				let t = e.target.closest(`.${F}`);
				if (t.classList && t.classList.contains(F)) {
					let e = document.querySelectorAll(`.${F}`);
					for (let t of e) t.classList.remove(`${F}--hovered`);
					t.classList.add(`${F}--hovered`);
				}
			}
		},
		dragLeave(e, t) {
			if (!t && !e.target.contains(e.relatedTarget) && e.target.closest) {
				let t = e.target.closest(`.${F}`);
				if (t.contains(e.relatedTarget)) return;
				t.classList && t.classList.contains(F) && t.classList.remove(`${F}--hovered`);
			}
		},
		hideCrumbs() {
			this.breadcrumbsRefs.forEach((e, t) => {
				e?.$el?.classList && (this.hiddenIndices.includes(t) ? e.$el.classList.add(`${F}--hidden`) : e.$el.classList.remove(`${F}--hidden`));
			});
		},
		isBreadcrumb(e) {
			return e?.type?.name === "NcBreadcrumb";
		}
	},
	render() {
		let e = [];
		if (this.$slots.default?.().forEach((t) => {
			this.isBreadcrumb(t) ? e.push(t) : t?.type === de && t?.children?.forEach?.((t) => {
				this.isBreadcrumb(t) && e.push(t);
			});
		}), e.length === 0) return;
		e[0] = fe(e[0], {
			icon: this.rootIcon,
			ref: "breadcrumbs"
		});
		let t = [];
		e = e.map((e, n) => fe(e, { ref: (e) => {
			t[n] = e;
		} }));
		let n = [...e];
		this.hiddenIndices.length && n.splice(Math.round(e.length / 2), 0, Ve(Zt, {
			class: "dropdown",
			...this.menuBreadcrumbProps,
			"aria-hidden": !0,
			ref: "actionsBreadcrumb",
			key: "actions-breadcrumb-1",
			onDragenter: () => {
				this.menuBreadcrumbProps.open = !0;
			},
			onDragleave: this.closeActions,
			"onUpdate:open": (e) => {
				this.menuBreadcrumbProps.open = e;
			}
		}, { default: () => this.hiddenIndices.filter((t) => t <= e.length - 1).map((t) => {
			let { to: n, href: r, disableDrop: i, name: a, ...o } = e[t].props;
			delete o.ref;
			let s = m, c = "";
			r && (s = Oe, c = r), n && (s = Re, c = n);
			let l = Ve(rn, { size: 20 });
			return Ve(s, {
				...o,
				class: F,
				href: r || null,
				to: n || null,
				draggable: !1,
				onDragstart: this.dragStart,
				onDrop: (e) => this.dropped(e, c, i),
				onDragover: this.dragOver,
				onDragenter: (e) => this.dragEnter(e, i),
				onDragleave: (e) => this.dragLeave(e, i)
			}, {
				default: () => a,
				icon: () => l
			});
		}) }));
		let r = [Ve("nav", { "aria-label": this.ariaLabel }, [Ve("ul", { class: "breadcrumb__crumbs" }, [n])])];
		return ae(this.$slots.actions?.()) && r.push(Ve("div", {
			class: "breadcrumb__actions",
			ref: "breadcrumb__actions"
		}, this.$slots.actions?.())), this.breadcrumbsRefs = t, Ve("div", {
			class: ["breadcrumb", { "breadcrumb--collapsed": this.hiddenIndices.length === e.length - 2 }],
			ref: "container"
		}, r);
	}
}, [["__scopeId", "data-v-5a4d73af"]]), on = {
	2(e) {
		function t(e, t, i) {
			e instanceof RegExp && (e = n(e, i)), t instanceof RegExp && (t = n(t, i));
			var a = r(e, t, i);
			return a && {
				start: a[0],
				end: a[1],
				pre: i.slice(0, a[0]),
				body: i.slice(a[0] + e.length, a[1]),
				post: i.slice(a[1] + t.length)
			};
		}
		function n(e, t) {
			var n = t.match(e);
			return n ? n[0] : null;
		}
		function r(e, t, n) {
			var r, i, a, o, s, c = n.indexOf(e), l = n.indexOf(t, c + 1), u = c;
			if (c >= 0 && l > 0) {
				for (r = [], a = n.length; u >= 0 && !s;) u == c ? (r.push(u), c = n.indexOf(e, u + 1)) : r.length == 1 ? s = [r.pop(), l] : ((i = r.pop()) < a && (a = i, o = l), l = n.indexOf(t, u + 1)), u = c < l && c >= 0 ? c : l;
				r.length && (s = [a, o]);
			}
			return s;
		}
		e.exports = t, t.range = r;
	},
	101(e, t, n) {
		var r;
		e = n.nmd(e), function() {
			var i = (e && e.exports, typeof global == "object" && global);
			i.global !== i && i.window;
			var a = function(e) {
				this.message = e;
			};
			(a.prototype = /* @__PURE__ */ Error()).name = "InvalidCharacterError";
			var o = function(e) {
				throw new a(e);
			}, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = /[\t\n\f\r ]/g, l = {
				encode: function(e) {
					e = String(e), /[^\0-\xFF]/.test(e) && o("The string to be encoded contains characters outside of the Latin1 range.");
					for (var t, n, r, i, a = e.length % 3, c = "", l = -1, u = e.length - a; ++l < u;) t = e.charCodeAt(l) << 16, n = e.charCodeAt(++l) << 8, r = e.charCodeAt(++l), c += s.charAt((i = t + n + r) >> 18 & 63) + s.charAt(i >> 12 & 63) + s.charAt(i >> 6 & 63) + s.charAt(63 & i);
					return a == 2 ? (t = e.charCodeAt(l) << 8, n = e.charCodeAt(++l), c += s.charAt((i = t + n) >> 10) + s.charAt(i >> 4 & 63) + s.charAt(i << 2 & 63) + "=") : a == 1 && (i = e.charCodeAt(l), c += s.charAt(i >> 2) + s.charAt(i << 4 & 63) + "=="), c;
				},
				decode: function(e) {
					var t = (e = String(e).replace(c, "")).length;
					t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length), (t % 4 == 1 || /[^+a-zA-Z0-9/]/.test(e)) && o("Invalid character: the string to be decoded is not correctly encoded.");
					for (var n, r, i = 0, a = "", l = -1; ++l < t;) r = s.indexOf(e.charAt(l)), n = i % 4 ? 64 * n + r : r, i++ % 4 && (a += String.fromCharCode(255 & n >> (-2 * i & 6)));
					return a;
				},
				version: "1.0.0"
			};
			(r = function() {
				return l;
			}.call(t, n, t, e)) === void 0 || (e.exports = r);
		}();
	},
	172(e, t) {
		t.d = function(e) {
			if (!e) return 0;
			for (var t = (e = e.toString()).length, n = e.length; n--;) {
				var r = e.charCodeAt(n);
				56320 <= r && r <= 57343 && n--, 127 < r && r <= 2047 ? t++ : 2047 < r && r <= 65535 && (t += 2);
			}
			return t;
		};
	},
	526(e) {
		var t = {
			utf8: {
				stringToBytes: function(e) {
					return t.bin.stringToBytes(unescape(encodeURIComponent(e)));
				},
				bytesToString: function(e) {
					return decodeURIComponent(escape(t.bin.bytesToString(e)));
				}
			},
			bin: {
				stringToBytes: function(e) {
					for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
					return t;
				},
				bytesToString: function(e) {
					for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
					return t.join("");
				}
			}
		};
		e.exports = t;
	},
	298(e) {
		var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {
			rotl: function(e, t) {
				return e << t | e >>> 32 - t;
			},
			rotr: function(e, t) {
				return e << 32 - t | e >>> t;
			},
			endian: function(e) {
				if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
				for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
				return e;
			},
			randomBytes: function(e) {
				for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
				return t;
			},
			bytesToWords: function(e) {
				for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) t[r >>> 5] |= e[n] << 24 - r % 32;
				return t;
			},
			wordsToBytes: function(e) {
				for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
				return t;
			},
			bytesToHex: function(e) {
				for (var t = [], n = 0; n < e.length; n++) t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16));
				return t.join("");
			},
			hexToBytes: function(e) {
				for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
				return t;
			},
			bytesToBase64: function(e) {
				for (var n = [], r = 0; r < e.length; r += 3) for (var i = e[r] << 16 | e[r + 1] << 8 | e[r + 2], a = 0; a < 4; a++) 8 * r + 6 * a <= 8 * e.length ? n.push(t.charAt(i >>> 6 * (3 - a) & 63)) : n.push("=");
				return n.join("");
			},
			base64ToBytes: function(e) {
				e = e.replace(/[^A-Z0-9+\/]/gi, "");
				for (var n = [], r = 0, i = 0; r < e.length; i = ++r % 4) i != 0 && n.push((t.indexOf(e.charAt(r - 1)) & 2 ** (-2 * i + 8) - 1) << 2 * i | t.indexOf(e.charAt(r)) >>> 6 - 2 * i);
				return n;
			}
		};
		e.exports = n;
	},
	135(e) {
		function t(e) {
			return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
		}
		e.exports = function(e) {
			return e != null && (t(e) || function(e) {
				return typeof e.readFloatLE == "function" && typeof e.slice == "function" && t(e.slice(0, 0));
			}(e) || !!e._isBuffer);
		};
	},
	542(e, t, n) {
		(function() {
			var t = n(298), r = n(526).utf8, i = n(135), a = n(526).bin, o = function(e, n) {
				e.constructor == String ? e = n && n.encoding === "binary" ? a.stringToBytes(e) : r.stringToBytes(e) : i(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || e.constructor === Uint8Array || (e = e.toString());
				for (var s = t.bytesToWords(e), c = 8 * e.length, l = 1732584193, u = -271733879, d = -1732584194, f = 271733878, p = 0; p < s.length; p++) s[p] = 16711935 & (s[p] << 8 | s[p] >>> 24) | 4278255360 & (s[p] << 24 | s[p] >>> 8);
				s[c >>> 5] |= 128 << c % 32, s[14 + (c + 64 >>> 9 << 4)] = c;
				var m = o._ff, h = o._gg, g = o._hh, _ = o._ii;
				for (p = 0; p < s.length; p += 16) {
					var v = l, y = u, b = d, x = f;
					l = m(l, u, d, f, s[p + 0], 7, -680876936), f = m(f, l, u, d, s[p + 1], 12, -389564586), d = m(d, f, l, u, s[p + 2], 17, 606105819), u = m(u, d, f, l, s[p + 3], 22, -1044525330), l = m(l, u, d, f, s[p + 4], 7, -176418897), f = m(f, l, u, d, s[p + 5], 12, 1200080426), d = m(d, f, l, u, s[p + 6], 17, -1473231341), u = m(u, d, f, l, s[p + 7], 22, -45705983), l = m(l, u, d, f, s[p + 8], 7, 1770035416), f = m(f, l, u, d, s[p + 9], 12, -1958414417), d = m(d, f, l, u, s[p + 10], 17, -42063), u = m(u, d, f, l, s[p + 11], 22, -1990404162), l = m(l, u, d, f, s[p + 12], 7, 1804603682), f = m(f, l, u, d, s[p + 13], 12, -40341101), d = m(d, f, l, u, s[p + 14], 17, -1502002290), l = h(l, u = m(u, d, f, l, s[p + 15], 22, 1236535329), d, f, s[p + 1], 5, -165796510), f = h(f, l, u, d, s[p + 6], 9, -1069501632), d = h(d, f, l, u, s[p + 11], 14, 643717713), u = h(u, d, f, l, s[p + 0], 20, -373897302), l = h(l, u, d, f, s[p + 5], 5, -701558691), f = h(f, l, u, d, s[p + 10], 9, 38016083), d = h(d, f, l, u, s[p + 15], 14, -660478335), u = h(u, d, f, l, s[p + 4], 20, -405537848), l = h(l, u, d, f, s[p + 9], 5, 568446438), f = h(f, l, u, d, s[p + 14], 9, -1019803690), d = h(d, f, l, u, s[p + 3], 14, -187363961), u = h(u, d, f, l, s[p + 8], 20, 1163531501), l = h(l, u, d, f, s[p + 13], 5, -1444681467), f = h(f, l, u, d, s[p + 2], 9, -51403784), d = h(d, f, l, u, s[p + 7], 14, 1735328473), l = g(l, u = h(u, d, f, l, s[p + 12], 20, -1926607734), d, f, s[p + 5], 4, -378558), f = g(f, l, u, d, s[p + 8], 11, -2022574463), d = g(d, f, l, u, s[p + 11], 16, 1839030562), u = g(u, d, f, l, s[p + 14], 23, -35309556), l = g(l, u, d, f, s[p + 1], 4, -1530992060), f = g(f, l, u, d, s[p + 4], 11, 1272893353), d = g(d, f, l, u, s[p + 7], 16, -155497632), u = g(u, d, f, l, s[p + 10], 23, -1094730640), l = g(l, u, d, f, s[p + 13], 4, 681279174), f = g(f, l, u, d, s[p + 0], 11, -358537222), d = g(d, f, l, u, s[p + 3], 16, -722521979), u = g(u, d, f, l, s[p + 6], 23, 76029189), l = g(l, u, d, f, s[p + 9], 4, -640364487), f = g(f, l, u, d, s[p + 12], 11, -421815835), d = g(d, f, l, u, s[p + 15], 16, 530742520), l = _(l, u = g(u, d, f, l, s[p + 2], 23, -995338651), d, f, s[p + 0], 6, -198630844), f = _(f, l, u, d, s[p + 7], 10, 1126891415), d = _(d, f, l, u, s[p + 14], 15, -1416354905), u = _(u, d, f, l, s[p + 5], 21, -57434055), l = _(l, u, d, f, s[p + 12], 6, 1700485571), f = _(f, l, u, d, s[p + 3], 10, -1894986606), d = _(d, f, l, u, s[p + 10], 15, -1051523), u = _(u, d, f, l, s[p + 1], 21, -2054922799), l = _(l, u, d, f, s[p + 8], 6, 1873313359), f = _(f, l, u, d, s[p + 15], 10, -30611744), d = _(d, f, l, u, s[p + 6], 15, -1560198380), u = _(u, d, f, l, s[p + 13], 21, 1309151649), l = _(l, u, d, f, s[p + 4], 6, -145523070), f = _(f, l, u, d, s[p + 11], 10, -1120210379), d = _(d, f, l, u, s[p + 2], 15, 718787259), u = _(u, d, f, l, s[p + 9], 21, -343485551), l = l + v >>> 0, u = u + y >>> 0, d = d + b >>> 0, f = f + x >>> 0;
				}
				return t.endian([
					l,
					u,
					d,
					f
				]);
			};
			o._ff = function(e, t, n, r, i, a, o) {
				var s = e + (t & n | ~t & r) + (i >>> 0) + o;
				return (s << a | s >>> 32 - a) + t;
			}, o._gg = function(e, t, n, r, i, a, o) {
				var s = e + (t & r | n & ~r) + (i >>> 0) + o;
				return (s << a | s >>> 32 - a) + t;
			}, o._hh = function(e, t, n, r, i, a, o) {
				var s = e + (t ^ n ^ r) + (i >>> 0) + o;
				return (s << a | s >>> 32 - a) + t;
			}, o._ii = function(e, t, n, r, i, a, o) {
				var s = e + (n ^ (t | ~r)) + (i >>> 0) + o;
				return (s << a | s >>> 32 - a) + t;
			}, o._blocksize = 16, o._digestsize = 16, e.exports = function(e, n) {
				if (e == null) throw Error("Illegal argument " + e);
				var r = t.wordsToBytes(o(e, n));
				return n && n.asBytes ? r : n && n.asString ? a.bytesToString(r) : t.bytesToHex(r);
			};
		})();
	},
	285(e, t, n) {
		var r = n(2);
		e.exports = function(e, t) {
			if (!e) return [];
			var n = (t ||= {}).max == null ? 1e5 : t.max, r = t.maxLength == null ? 4e6 : t.maxLength;
			return e.substr(0, 2) === "{}" && (e = "\\{\\}" + e.substr(2)), v(function(e) {
				return e.split("\\\\").join(i).split("\\{").join(a).split("\\}").join(o).split("\\,").join(s).split("\\.").join(c);
			}(e), n, r, !0).map(u);
		};
		var i = "\0SLASH" + Math.random() + "\0", a = "\0OPEN" + Math.random() + "\0", o = "\0CLOSE" + Math.random() + "\0", s = "\0COMMA" + Math.random() + "\0", c = "\0PERIOD" + Math.random() + "\0";
		function l(e) {
			return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
		}
		function u(e) {
			return e.split(i).join("\\").split(a).join("{").split(o).join("}").split(s).join(",").split(c).join(".");
		}
		function d(e) {
			if (!e) return [""];
			var t = [], n = r("{", "}", e);
			if (!n) return e.split(",");
			var i = n.pre, a = n.body, o = n.post, s = i.split(",");
			s[s.length - 1] += "{" + a + "}";
			var c = d(o);
			return o.length && (s[s.length - 1] += c.shift(), s.push.apply(s, c)), t.push.apply(t, s), t;
		}
		function f(e) {
			return "{" + e + "}";
		}
		function p(e) {
			return /^-?0\d/.test(e);
		}
		function m(e, t) {
			return e <= t;
		}
		function h(e, t) {
			return e >= t;
		}
		function g(e, t, n, r, i, a) {
			for (var o = [], s = 0, c = 0; c < e.length; c++) for (var l = 0; l < n.length; l++) {
				if (o.length >= r) return o;
				var u = e[c] + t + n[l];
				if (!a || u) {
					if (s + u.length > i) return o;
					o.push(u), s += u.length;
				}
			}
			return o;
		}
		function _(e, t, n, r) {
			var i = e.split(/\.\./), a = [];
			if (i[0] === void 0 || i[1] === void 0) return a;
			var o = l(i[0]), s = l(i[1]), c = Math.max(i[0].length, i[1].length), u = i.length === 3 && i[2] !== void 0 ? Math.max(Math.abs(l(i[2])), 1) : 1, d = m;
			s < o && (u *= -1, d = h);
			for (var f = i.some(p), g = 0, _ = o; d(_, s) && a.length < n; _ += u) {
				var v;
				if (t) (v = String.fromCharCode(_)) === "\\" && (v = "");
				else if (v = String(_), f) {
					var y = c - v.length;
					if (y > 0) {
						var b = Array(y + 1).join("0");
						v = _ < 0 ? "-" + b + v.slice(1) : b + v;
					}
				}
				if (g + v.length > r) break;
				a.push(v), g += v.length;
			}
			return a;
		}
		function v(e, t, n, i) {
			for (var a = [""], s = !1, c = !0;;) {
				let C = r("{", "}", e);
				if (!C) return g(a, e, [""], t, n, s);
				let ie = C.pre;
				if (/\$$/.test(ie)) {
					if (a = g(a, ie + "{" + C.body + "}", [""], t, n, s && !C.post.length), c = !1, !C.post.length) break;
					e = C.post;
				} else {
					var l, u = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(C.body), p = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(C.body), m = u || p, h = C.body.indexOf(",") >= 0;
					if (!m && !h) {
						if (C.post.match(/,(?!,).*\}/)) {
							e = C.pre + "{" + C.body + o + C.post, i = !0;
							continue;
						}
						return g(a, ie + "{" + C.body + "}" + C.post, [""], t, n, s);
					}
					if (c &&= (s = i && !m, !1), m) l = _(C.body, p, t, n);
					else {
						var y = d(C.body);
						if (y.length === 1 && y[0] !== void 0 && (y = v(y[0], t, n, !1).map(f)).length === 1) {
							if (a = g(a, ie + y[0], [""], t, n, s && !C.post.length), !C.post.length) break;
							e = C.post;
							continue;
						}
						for (var b = s && !C.post.length && !ie, x = 0; b && x < a.length; x++) a[x] && (b = !1);
						l = [];
						var ee = 0;
						t: for (var te = 0; te < y.length; te++) for (var S = v(y[te], t, n, !1), ne = 0; ne < S.length; ne++) {
							var re = S[ne];
							if (!b || re) {
								if (l.length >= t || ee + re.length > n) break t;
								l.push(re), ee += re.length;
							}
						}
					}
					if (a = g(a, ie, l, t, n, s && !C.post.length), !C.post.length) break;
					e = C.post;
				}
			}
			return a;
		}
	},
	829(e) {
		function t(e) {
			return t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
				return typeof e;
			} : function(e) {
				return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			}, t(e);
		}
		function n(e) {
			var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
			return n = function(e) {
				if (e === null || (n = e, Function.toString.call(n).indexOf("[native code]") === -1)) return e;
				var n;
				if (typeof e != "function") throw TypeError("Super expression must either be null or a function");
				if (t !== void 0) {
					if (t.has(e)) return t.get(e);
					t.set(e, o);
				}
				function o() {
					return r(e, arguments, a(this).constructor);
				}
				return o.prototype = Object.create(e.prototype, { constructor: {
					value: o,
					enumerable: !1,
					writable: !0,
					configurable: !0
				} }), i(o, e);
			}, n(e);
		}
		function r(e, t, n) {
			return r = function() {
				if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
				if (typeof Proxy == "function") return !0;
				try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0;
				} catch {
					return !1;
				}
			}() ? Reflect.construct : function(e, t, n) {
				var r = [null];
				r.push.apply(r, t);
				var a = new (Function.bind.apply(e, r))();
				return n && i(a, n.prototype), a;
			}, r.apply(null, arguments);
		}
		function i(e, t) {
			return i = Object.setPrototypeOf || function(e, t) {
				return e.__proto__ = t, e;
			}, i(e, t);
		}
		function a(e) {
			return a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
				return e.__proto__ || Object.getPrototypeOf(e);
			}, a(e);
		}
		var o = function(e) {
			function n(e) {
				var r;
				return function(e, t) {
					if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
				}(this, n), (r = function(e, n) {
					return !n || t(n) !== "object" && typeof n != "function" ? function(e) {
						if (e === void 0) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
						return e;
					}(e) : n;
				}(this, a(n).call(this, e))).name = "ObjectPrototypeMutationError", r;
			}
			return function(e, t) {
				if (typeof t != "function" && t !== null) throw TypeError("Super expression must either be null or a function");
				e.prototype = Object.create(t && t.prototype, { constructor: {
					value: e,
					writable: !0,
					configurable: !0
				} }), t && i(e, t);
			}(n, e), n;
		}(n(Error));
		function s(e, n) {
			for (var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {}, i = n.split("."), a = i.length, o = function(t) {
				var n = i[t];
				if (!e) return { v: void 0 };
				if (n === "+") {
					if (Array.isArray(e)) return { v: e.map((function(n, a) {
						var o = i.slice(t + 1);
						return o.length > 0 ? s(n, o.join("."), r) : r(e, a, i, t);
					})) };
					var a = i.slice(0, t).join(".");
					throw Error(`Object at wildcard (${a}) is not an array`);
				}
				e = r(e, n, i, t);
			}, c = 0; c < a; c++) {
				var l = o(c);
				if (t(l) === "object") return l.v;
			}
			return e;
		}
		function c(e, t) {
			return e.length === t + 1;
		}
		e.exports = {
			set: function(e, n, r) {
				if (t(e) != "object" || e === null || n === void 0) return e;
				if (typeof n == "number") return e[n] = r, e[n];
				try {
					return s(e, n, (function(e, t, n, i) {
						if (e === Reflect.getPrototypeOf({})) throw new o("Attempting to mutate Object.prototype");
						if (!e[t]) {
							var a = Number.isInteger(Number(n[i + 1])), s = n[i + 1] === "+";
							e[t] = a || s ? [] : {};
						}
						return c(n, i) && (e[t] = r), e[t];
					}));
				} catch (t) {
					if (t instanceof o) throw t;
					return e;
				}
			},
			get: function(e, n) {
				if (t(e) != "object" || e === null || n === void 0) return e;
				if (typeof n == "number") return e[n];
				try {
					return s(e, n, (function(e, t) {
						return e[t];
					}));
				} catch {
					return e;
				}
			},
			has: function(e, n) {
				var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
				if (t(e) != "object" || e === null || n === void 0) return !1;
				if (typeof n == "number") return n in e;
				try {
					var i = !1;
					return s(e, n, (function(e, t, n, a) {
						if (!c(n, a)) return e && e[t];
						i = r.own ? e.hasOwnProperty(t) : t in e;
					})), i;
				} catch {
					return !1;
				}
			},
			hasOwn: function(e, t, n) {
				return this.has(e, t, n || { own: !0 });
			},
			isIn: function(e, n, r) {
				var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
				if (t(e) != "object" || e === null || n === void 0) return !1;
				try {
					var a = !1, o = !1;
					return s(e, n, (function(e, n, i, s) {
						return a = a || e === r || !!e && e[n] === r, o = c(i, s) && t(e) === "object" && n in e, e && e[n];
					})), i.validPath ? a && o : a;
				} catch {
					return !1;
				}
			},
			ObjectPrototypeMutationError: o
		};
	},
	47(e, t, n) {
		var r = n(410), i = function(e) {
			return typeof e == "string";
		};
		function a(e, t) {
			for (var n = [], r = 0; r < e.length; r++) {
				var i = e[r];
				i && i !== "." && (i === ".." ? n.length && n[n.length - 1] !== ".." ? n.pop() : t && n.push("..") : n.push(i));
			}
			return n;
		}
		var o = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, s = {};
		function c(e) {
			return o.exec(e).slice(1);
		}
		s.resolve = function() {
			for (var e = "", t = !1, n = arguments.length - 1; n >= -1 && !t; n--) {
				var r = n >= 0 ? arguments[n] : process.cwd();
				if (!i(r)) throw TypeError("Arguments to path.resolve must be strings");
				r && (e = r + "/" + e, t = r.charAt(0) === "/");
			}
			return (t ? "/" : "") + (e = a(e.split("/"), !t).join("/")) || ".";
		}, s.normalize = function(e) {
			var t = s.isAbsolute(e), n = e.substr(-1) === "/";
			return (e = a(e.split("/"), !t).join("/")) || t || (e = "."), e && n && (e += "/"), (t ? "/" : "") + e;
		}, s.isAbsolute = function(e) {
			return e.charAt(0) === "/";
		}, s.join = function() {
			for (var e = "", t = 0; t < arguments.length; t++) {
				var n = arguments[t];
				if (!i(n)) throw TypeError("Arguments to path.join must be strings");
				n && (e += e ? "/" + n : n);
			}
			return s.normalize(e);
		}, s.relative = function(e, t) {
			function n(e) {
				for (var t = 0; t < e.length && e[t] === ""; t++);
				for (var n = e.length - 1; n >= 0 && e[n] === ""; n--);
				return t > n ? [] : e.slice(t, n + 1);
			}
			e = s.resolve(e).substr(1), t = s.resolve(t).substr(1);
			for (var r = n(e.split("/")), i = n(t.split("/")), a = Math.min(r.length, i.length), o = a, c = 0; c < a; c++) if (r[c] !== i[c]) {
				o = c;
				break;
			}
			var l = [];
			for (c = o; c < r.length; c++) l.push("..");
			return (l = l.concat(i.slice(o))).join("/");
		}, s._makeLong = function(e) {
			return e;
		}, s.dirname = function(e) {
			var t = c(e), n = t[0], r = t[1];
			return n || r ? (r &&= r.substr(0, r.length - 1), n + r) : ".";
		}, s.basename = function(e, t) {
			var n = c(e)[2];
			return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n;
		}, s.extname = function(e) {
			return c(e)[3];
		}, s.format = function(e) {
			if (!r.isObject(e)) throw TypeError("Parameter 'pathObject' must be an object, not " + typeof e);
			if (!i(e.root || "")) throw TypeError("'pathObject.root' must be a string or undefined, not " + typeof e.root);
			return (e.dir ? e.dir + s.sep : "") + (e.base || "");
		}, s.parse = function(e) {
			if (!i(e)) throw TypeError("Parameter 'pathString' must be a string, not " + typeof e);
			var t = c(e);
			if (!t || t.length !== 4) throw TypeError("Invalid path '" + e + "'");
			return t[1] = t[1] || "", t[2] = t[2] || "", t[3] = t[3] || "", {
				root: t[0],
				dir: t[0] + t[1].slice(0, t[1].length - 1),
				base: t[2],
				ext: t[3],
				name: t[2].slice(0, t[2].length - t[3].length)
			};
		}, s.sep = "/", s.delimiter = ":", e.exports = s;
	},
	647(e, t) {
		var n = Object.prototype.hasOwnProperty;
		function r(e) {
			try {
				return decodeURIComponent(e.replace(/\+/g, " "));
			} catch {
				return null;
			}
		}
		function i(e) {
			try {
				return encodeURIComponent(e);
			} catch {
				return null;
			}
		}
		t.stringify = function(e, t) {
			t ||= "";
			var r, a, o = [];
			for (a in typeof t != "string" && (t = "?"), e) if (n.call(e, a)) {
				if ((r = e[a]) || r != null && !isNaN(r) || (r = ""), a = i(a), r = i(r), a === null || r === null) continue;
				o.push(a + "=" + r);
			}
			return o.length ? t + o.join("&") : "";
		}, t.parse = function(e) {
			for (var t, n = /([^=?#&]+)=?([^&]*)/g, i = {}; t = n.exec(e);) {
				var a = r(t[1]), o = r(t[2]);
				a === null || o === null || a in i || (i[a] = o);
			}
			return i;
		};
	},
	670(e) {
		e.exports = function(e, t) {
			if (t = t.split(":")[0], !(e = +e)) return !1;
			switch (t) {
				case "http":
				case "ws": return e !== 80;
				case "https":
				case "wss": return e !== 443;
				case "ftp": return e !== 21;
				case "gopher": return e !== 70;
				case "file": return !1;
			}
			return e !== 0;
		};
	},
	737(e, t, n) {
		var r = n(670), i = n(647), a = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, o = /[\n\r\t]/g, s = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, c = /:\d+$/, l = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, u = /^[a-zA-Z]:/;
		function d(e) {
			return (e || "").toString().replace(a, "");
		}
		var f = [
			["#", "hash"],
			["?", "query"],
			function(e, t) {
				return h(t.protocol) ? e.replace(/\\/g, "/") : e;
			},
			["/", "pathname"],
			[
				"@",
				"auth",
				1
			],
			[
				NaN,
				"host",
				void 0,
				1,
				1
			],
			[
				/:(\d*)$/,
				"port",
				void 0,
				1
			],
			[
				NaN,
				"hostname",
				void 0,
				1,
				1
			]
		], p = {
			hash: 1,
			query: 1
		};
		function m(e) {
			var t, n = (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}).location || {}, r = {}, i = typeof (e ||= n);
			if (e.protocol === "blob:") r = new _(unescape(e.pathname), {});
			else if (i === "string") for (t in r = new _(e, {}), p) delete r[t];
			else if (i === "object") {
				for (t in e) t in p || (r[t] = e[t]);
				r.slashes === void 0 && (r.slashes = s.test(e.href));
			}
			return r;
		}
		function h(e) {
			return e === "file:" || e === "ftp:" || e === "http:" || e === "https:" || e === "ws:" || e === "wss:";
		}
		function g(e, t) {
			e = (e = d(e)).replace(o, ""), t ||= {};
			var n, r = l.exec(e), i = r[1] ? r[1].toLowerCase() : "", a = !!r[2], s = !!r[3], c = 0;
			return a ? s ? (n = r[2] + r[3] + r[4], c = r[2].length + r[3].length) : (n = r[2] + r[4], c = r[2].length) : s ? (n = r[3] + r[4], c = r[3].length) : n = r[4], i === "file:" ? c >= 2 && (n = n.slice(2)) : h(i) ? n = r[4] : i ? a && (n = n.slice(2)) : c >= 2 && h(t.protocol) && (n = r[4]), {
				protocol: i,
				slashes: a || h(i),
				slashesCount: c,
				rest: n
			};
		}
		function _(e, t, n) {
			if (e = (e = d(e)).replace(o, ""), !(this instanceof _)) return new _(e, t, n);
			var a, s, c, l, p, v, y = f.slice(), b = typeof t, x = this, ee = 0;
			for (b !== "object" && b !== "string" && (n = t, t = null), n && typeof n != "function" && (n = i.parse), a = !(s = g(e || "", t = m(t))).protocol && !s.slashes, x.slashes = s.slashes || a && t.slashes, x.protocol = s.protocol || t.protocol || "", e = s.rest, (s.protocol === "file:" && (s.slashesCount !== 2 || u.test(e)) || !s.slashes && (s.protocol || s.slashesCount < 2 || !h(x.protocol))) && (y[3] = [/(.*)/, "pathname"]); ee < y.length; ee++) typeof (l = y[ee]) == "function" ? e = l(e, x) : (c = l[0], v = l[1], c == c ? typeof c == "string" ? ~(p = c === "@" ? e.lastIndexOf(c) : e.indexOf(c)) && (typeof l[2] == "number" ? (x[v] = e.slice(0, p), e = e.slice(p + l[2])) : (x[v] = e.slice(p), e = e.slice(0, p))) : (p = c.exec(e)) && (x[v] = p[1], e = e.slice(0, p.index)) : x[v] = e, x[v] = x[v] || a && l[3] && t[v] || "", l[4] && (x[v] = x[v].toLowerCase()));
			n && (x.query = n(x.query)), a && t.slashes && x.pathname.charAt(0) !== "/" && (x.pathname !== "" || t.pathname !== "") && (x.pathname = function(e, t) {
				if (e === "") return t;
				for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, i = n[r - 1], a = !1, o = 0; r--;) n[r] === "." ? n.splice(r, 1) : n[r] === ".." ? (n.splice(r, 1), o++) : o && (r === 0 && (a = !0), n.splice(r, 1), o--);
				return a && n.unshift(""), i !== "." && i !== ".." || n.push(""), n.join("/");
			}(x.pathname, t.pathname)), x.pathname.charAt(0) !== "/" && h(x.protocol) && (x.pathname = "/" + x.pathname), r(x.port, x.protocol) || (x.host = x.hostname, x.port = ""), x.username = x.password = "", x.auth &&= (~(p = x.auth.indexOf(":")) ? (x.username = x.auth.slice(0, p), x.username = encodeURIComponent(decodeURIComponent(x.username)), x.password = x.auth.slice(p + 1), x.password = encodeURIComponent(decodeURIComponent(x.password))) : x.username = encodeURIComponent(decodeURIComponent(x.auth)), x.password ? x.username + ":" + x.password : x.username), x.origin = x.protocol !== "file:" && h(x.protocol) && x.host ? x.protocol + "//" + x.host : "null", x.href = x.toString();
		}
		_.prototype = {
			set: function(e, t, n) {
				var a = this;
				switch (e) {
					case "query":
						typeof t == "string" && t.length && (t = (n || i.parse)(t)), a[e] = t;
						break;
					case "port":
						a[e] = t, r(t, a.protocol) ? t && (a.host = a.hostname + ":" + t) : (a.host = a.hostname, a[e] = "");
						break;
					case "hostname":
						a[e] = t, a.port && (t += ":" + a.port), a.host = t;
						break;
					case "host":
						a[e] = t, c.test(t) ? (t = t.split(":"), a.port = t.pop(), a.hostname = t.join(":")) : (a.hostname = t, a.port = "");
						break;
					case "protocol":
						a.protocol = t.toLowerCase(), a.slashes = !n;
						break;
					case "pathname":
					case "hash":
						if (t) {
							var o = e === "pathname" ? "/" : "#";
							a[e] = t.charAt(0) === o ? t : o + t;
						} else a[e] = t;
						break;
					case "username":
					case "password":
						a[e] = encodeURIComponent(t);
						break;
					case "auth":
						var s = t.indexOf(":");
						~s ? (a.username = t.slice(0, s), a.username = encodeURIComponent(decodeURIComponent(a.username)), a.password = t.slice(s + 1), a.password = encodeURIComponent(decodeURIComponent(a.password))) : a.username = encodeURIComponent(decodeURIComponent(t));
				}
				for (var l = 0; l < f.length; l++) {
					var u = f[l];
					u[4] && (a[u[1]] = a[u[1]].toLowerCase());
				}
				return a.auth = a.password ? a.username + ":" + a.password : a.username, a.origin = a.protocol !== "file:" && h(a.protocol) && a.host ? a.protocol + "//" + a.host : "null", a.href = a.toString(), a;
			},
			toString: function(e) {
				e && typeof e == "function" || (e = i.stringify);
				var t, n = this, r = n.host, a = n.protocol;
				a && a.charAt(a.length - 1) !== ":" && (a += ":");
				var o = a + (n.protocol && n.slashes || h(n.protocol) ? "//" : "");
				return n.username ? (o += n.username, n.password && (o += ":" + n.password), o += "@") : n.password ? (o += ":" + n.password, o += "@") : n.protocol !== "file:" && h(n.protocol) && !r && n.pathname !== "/" && (o += "@"), (r[r.length - 1] === ":" || c.test(n.hostname) && !n.port) && (r += ":"), o += r + n.pathname, (t = typeof n.query == "object" ? e(n.query) : n.query) && (o += t.charAt(0) === "?" ? t : "?" + t), n.hash && (o += n.hash), o;
			}
		}, _.extractProtocol = g, _.location = m, _.trimLeft = d, _.qs = i, e.exports = _;
	},
	410() {},
	388() {},
	805() {},
	345() {},
	800() {}
}, sn = {};
function I(e) {
	var t = sn[e];
	if (t !== void 0) return t.exports;
	var n = sn[e] = {
		id: e,
		loaded: !1,
		exports: {}
	};
	return on[e].call(n.exports, n, n.exports, I), n.loaded = !0, n.exports;
}
I.n = (e) => {
	var t = e && e.__esModule ? () => e.default : () => e;
	return I.d(t, { a: t }), t;
}, I.d = (e, t) => {
	for (var n in t) I.o(t, n) && !I.o(e, n) && Object.defineProperty(e, n, {
		enumerable: !0,
		get: t[n]
	});
}, I.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), I.nmd = (e) => (e.paths = [], e.children ||= [], e);
var cn = I(737), ln = I.n(cn);
function un(e) {
	if (!dn(e)) throw Error("Parameter was not an error");
}
function dn(e) {
	return !!e && typeof e == "object" && (t = e, Object.prototype.toString.call(t) === "[object Error]") || e instanceof Error;
	var t;
}
var fn = class e extends Error {
	constructor(e, t) {
		let { options: n, shortMessage: r } = function(e) {
			let t, n = "";
			if (e.length === 0) t = {};
			else if (dn(e[0])) t = { cause: e[0] }, n = e.slice(1).join(" ") || "";
			else if (e[0] && typeof e[0] == "object") t = Object.assign({}, e[0]), n = e.slice(1).join(" ") || "";
			else {
				if (typeof e[0] != "string") throw Error("Invalid arguments passed to Layerr");
				t = {}, n = n = e.join(" ") || "";
			}
			return {
				options: t,
				shortMessage: n
			};
		}([...arguments]), i = r;
		if (n.cause && (i = `${i}: ${n.cause.message}`), super(i), this.message = i, n.name && typeof n.name == "string" ? this.name = n.name : this.name = "Layerr", n.cause && Object.defineProperty(this, "_cause", { value: n.cause }), Object.defineProperty(this, "_info", { value: {} }), n.info && typeof n.info == "object" && Object.assign(this._info, n.info), Error.captureStackTrace) {
			let e = n.constructorOpt || this.constructor;
			Error.captureStackTrace(this, e);
		}
	}
	static cause(e) {
		return un(e), e._cause && dn(e._cause) ? e._cause : null;
	}
	static fullStack(t) {
		un(t);
		let n = e.cause(t);
		return n ? `${t.stack}\ncaused by: ${e.fullStack(n)}` : t.stack ?? "";
	}
	static info(t) {
		un(t);
		let n = {}, r = e.cause(t);
		return r && Object.assign(n, e.info(r)), t._info && Object.assign(n, t._info), n;
	}
	toString() {
		let e = this.name || this.constructor.name || this.constructor.prototype.name;
		return this.message && (e = `${e}: ${this.message}`), e;
	}
}, pn = I(47), mn = I.n(pn), hn = "__PATH_SEPARATOR_POSIX__", gn = "__PATH_SEPARATOR_WINDOWS__";
function L(e) {
	try {
		let t = e.replace(/\//g, hn).replace(/\\\\/g, gn);
		return encodeURIComponent(t).split(gn).join("\\\\").split(hn).join("/");
	} catch (e) {
		throw new fn(e, "Failed encoding path");
	}
}
function _n(e) {
	return e.startsWith("/") ? e : "/" + e;
}
function vn(e) {
	let t = e;
	return t[0] !== "/" && (t = "/" + t), /^.+\/$/.test(t) && (t = t.substr(0, t.length - 1)), t;
}
function yn(e) {
	let t = new (ln())(e).pathname;
	return t.length <= 0 && (t = "/"), vn(t);
}
function R(...e) {
	return function() {
		return function(e) {
			var t = [];
			if (e.length === 0) return "";
			if (typeof e[0] != "string") throw TypeError("Url must be a string. Received " + e[0]);
			e[0].match(/^[^/:]+:\/*$/) && e.length > 1 && (e[0] = e.shift() + e[0]), e[0] = e[0].match(/^file:\/\/\//) ? e[0].replace(/^([^/:]+):\/*/, "$1:///") : e[0].replace(/^([^/:]+):\/*/, "$1://");
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r != "string") throw TypeError("Url must be a string. Received " + r);
				r !== "" && (n > 0 && (r = r.replace(/^[\/]+/, "")), r = n < e.length - 1 ? r.replace(/[\/]+$/, "") : r.replace(/[\/]+$/, "/"), t.push(r));
			}
			var i = t.join("/"), a = (i = i.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
			return a.shift() + (a.length > 0 ? "?" : "") + a.join("&");
		}(typeof arguments[0] == "object" ? arguments[0] : [].slice.call(arguments));
	}(e.reduce(((e, t, n) => ((n === 0 || t !== "/" || t === "/" && e[e.length - 1] !== "/") && e.push(t), e)), []));
}
var bn = I(542), xn = I.n(bn);
function Sn(e, t) {
	let n = e.url.replace("//", ""), r = n.indexOf("/") == -1 ? "/" : n.slice(n.indexOf("/")), i = e.method ? e.method.toUpperCase() : "GET", a = !!/(^|,)\s*auth\s*($|,)/.test(t.qop) && "auth", o = `00000000${t.nc}`.slice(-8), s = function(e, t, n, r, i, a, o) {
		let s = o || xn()(`${t}:${n}:${r}`);
		return e && e.toLowerCase() === "md5-sess" ? xn()(`${s}:${i}:${a}`) : s;
	}(t.algorithm, t.username, t.realm, t.password, t.nonce, t.cnonce, t.ha1), c = xn()(`${i}:${r}`), l = a ? xn()(`${s}:${t.nonce}:${o}:${t.cnonce}:${a}:${c}`) : xn()(`${s}:${t.nonce}:${c}`), u = {
		username: t.username,
		realm: t.realm,
		nonce: t.nonce,
		uri: r,
		qop: a,
		response: l,
		nc: o,
		cnonce: t.cnonce,
		algorithm: t.algorithm,
		opaque: t.opaque
	}, d = [];
	for (let e in u) u[e] && (e === "qop" || e === "nc" || e === "algorithm" ? d.push(`${e}=${u[e]}`) : d.push(`${e}="${u[e]}"`));
	return `Digest ${d.join(", ")}`;
}
function Cn(e) {
	return (e.headers && e.headers.get("www-authenticate") || "").split(/\s/)[0].toLowerCase() === "digest";
}
var wn = I(101), Tn = I.n(wn);
function En(e) {
	return Tn().decode(e);
}
function Dn(e, t) {
	var n;
	return `Basic ${n = `${e}:${t}`, Tn().encode(n)}`;
}
var z = function(e) {
	return e.Auto = "auto", e.Digest = "digest", e.None = "none", e.Password = "password", e.Token = "token", e;
}({}), On = function(e) {
	return e.DataTypeNoLength = "data-type-no-length", e.InvalidAuthType = "invalid-auth-type", e.InvalidOutputFormat = "invalid-output-format", e.LinkUnsupportedAuthType = "link-unsupported-auth", e.InvalidUpdateRange = "invalid-update-range", e.NotSupported = "not-supported", e;
}({});
function kn(e, t, n, r, i) {
	switch (e.authType) {
		case z.Auto:
			t && n && (e.headers.Authorization = Dn(t, n));
			break;
		case z.Digest:
			e.digest = function(e, t, n) {
				return {
					username: e,
					password: t,
					ha1: n,
					nc: 0,
					algorithm: "md5",
					hasDigestAuth: !1
				};
			}(t, n, i);
			break;
		case z.None: break;
		case z.Password:
			e.headers.Authorization = Dn(t, n);
			break;
		case z.Token:
			e.headers.Authorization = `${(a = r).token_type} ${a.access_token}`;
			break;
		default: throw new fn({ info: { code: On.InvalidAuthType } }, `Invalid auth type: ${e.authType}`);
	}
	var a;
}
I(345), I(800);
var An = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : typeof window < "u" ? window : globalThis, jn = An.fetch.bind(An);
An.Headers, An.Request, An.Response;
var Mn = "@@HOTPATCHER", Nn = () => {};
function Pn(e) {
	return {
		original: e,
		methods: [e],
		final: !1
	};
}
var Fn = class {
	constructor() {
		this._configuration = {
			registry: {},
			getEmptyAction: "null"
		}, this.__type__ = Mn;
	}
	get configuration() {
		return this._configuration;
	}
	get getEmptyAction() {
		return this.configuration.getEmptyAction;
	}
	set getEmptyAction(e) {
		this.configuration.getEmptyAction = e;
	}
	control(e, t = !1) {
		if (!e || e.__type__ !== Mn) throw Error("Failed taking control of target HotPatcher instance: Invalid type or object");
		return Object.keys(e.configuration.registry).forEach(((n) => {
			this.configuration.registry.hasOwnProperty(n) ? t && (this.configuration.registry[n] = Object.assign({}, e.configuration.registry[n])) : this.configuration.registry[n] = Object.assign({}, e.configuration.registry[n]);
		})), e._configuration = this.configuration, this;
	}
	execute(e, ...t) {
		return (this.get(e) || Nn)(...t);
	}
	get(e) {
		let t = this.configuration.registry[e];
		if (!t) switch (this.getEmptyAction) {
			case "null": return null;
			case "throw": throw Error(`Failed handling method request: No method provided for override: ${e}`);
			default: throw Error(`Failed handling request which resulted in an empty method: Invalid empty-action specified: ${this.getEmptyAction}`);
		}
		return function(...e) {
			if (e.length === 0) throw Error("Failed creating sequence: No functions provided");
			return function(...t) {
				let n = t, r = this;
				for (; e.length > 0;) n = [e.shift().apply(r, n)];
				return n[0];
			};
		}(...t.methods);
	}
	isPatched(e) {
		return !!this.configuration.registry[e];
	}
	patch(e, t, n = {}) {
		let { chain: r = !1 } = n;
		if (this.configuration.registry[e] && this.configuration.registry[e].final) throw Error(`Failed patching '${e}': Method marked as being final`);
		if (typeof t != "function") throw Error(`Failed patching '${e}': Provided method is not a function`);
		if (r) this.configuration.registry[e] ? this.configuration.registry[e].methods.push(t) : this.configuration.registry[e] = Pn(t);
		else if (this.isPatched(e)) {
			let { original: n } = this.configuration.registry[e];
			this.configuration.registry[e] = Object.assign(Pn(t), { original: n });
		} else this.configuration.registry[e] = Pn(t);
		return this;
	}
	patchInline(e, t, ...n) {
		return this.isPatched(e) || this.patch(e, t), this.execute(e, ...n);
	}
	plugin(e, ...t) {
		return t.forEach(((t) => {
			this.patch(e, t, { chain: !0 });
		})), this;
	}
	restore(e) {
		if (!this.isPatched(e)) throw Error(`Failed restoring method: No method present for key: ${e}`);
		if (typeof this.configuration.registry[e].original != "function") throw Error(`Failed restoring method: Original method not found or of invalid type for key: ${e}`);
		return this.configuration.registry[e].methods = [this.configuration.registry[e].original], this;
	}
	setFinal(e) {
		if (!this.configuration.registry.hasOwnProperty(e)) throw Error(`Failed marking '${e}' as final: No method found for key`);
		return this.configuration.registry[e].final = !0, this;
	}
}, In = null;
function Ln() {
	return In ||= new Fn(), In;
}
function Rn(e) {
	return function(e) {
		if (typeof e != "object" || !e || Object.prototype.toString.call(e) != "[object Object]") return !1;
		if (Object.getPrototypeOf(e) === null) return !0;
		let t = e;
		for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
		return Object.getPrototypeOf(e) === t;
	}(e) ? Object.assign({}, e) : Object.setPrototypeOf(Object.assign({}, e), Object.getPrototypeOf(e));
}
function zn(...e) {
	let t = null, n = [...e];
	for (; n.length > 0;) {
		let e = n.shift();
		t = t ? Bn(t, e) : Rn(e);
	}
	return t;
}
function Bn(e, t) {
	let n = Rn(e);
	return Object.keys(t).forEach(((e) => {
		n.hasOwnProperty(e) ? Array.isArray(t[e]) ? n[e] = Array.isArray(n[e]) ? [...n[e], ...t[e]] : [...t[e]] : typeof t[e] == "object" && t[e] ? n[e] = typeof n[e] == "object" && n[e] ? Bn(n[e], t[e]) : Rn(t[e]) : n[e] = t[e] : n[e] = t[e];
	})), n;
}
function Vn(e) {
	let t = {};
	return e.forEach(((e, n) => {
		t[n] = e;
	})), t;
}
function Hn(...e) {
	if (e.length === 0) return {};
	let t = {};
	return e.reduce(((e, n) => (Object.keys(n).forEach(((r) => {
		let i = r.toLowerCase();
		t.hasOwnProperty(i) ? e[t[i]] = n[r] : (t[i] = r, e[r] = n[r]);
	})), e)), {});
}
I(805);
var Un = typeof ArrayBuffer == "function", { toString: Wn } = Object.prototype;
function Gn(e) {
	return Un && (e instanceof ArrayBuffer || Wn.call(e) === "[object ArrayBuffer]");
}
function Kn(e) {
	return e != null && e.constructor != null && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function qn(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}
function Jn(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var Yn = qn((function(e) {
	let t = e._digest;
	return delete e._digest, t.hasDigestAuth && (e = zn(e, { headers: { Authorization: Sn(e, t) } })), Jn(Zn(e), (function(n) {
		let r = !1;
		return i = function(e) {
			return r ? e : n;
		}, (a = function() {
			if (n.status == 401) return t.hasDigestAuth = function(e, t) {
				if (!Cn(e)) return !1;
				let n = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
				for (;;) {
					let r = e.headers && e.headers.get("www-authenticate") || "", i = n.exec(r);
					if (!i) break;
					t[i[1]] = i[2] || i[3];
				}
				return t.nc += 1, t.cnonce = function() {
					let e = "";
					for (let t = 0; t < 32; ++t) e = `${e}${"abcdef0123456789"[Math.floor(16 * Math.random())]}`;
					return e;
				}(), !0;
			}(n, t), function() {
				if (t.hasDigestAuth) return Jn(Zn(e = zn(e, { headers: { Authorization: Sn(e, t) } })), (function(e) {
					return e.status == 401 ? t.hasDigestAuth = !1 : t.nc++, r = !0, e;
				}));
			}();
			t.nc++;
		}()) && a.then ? a.then(i) : i(a);
		var i, a;
	}));
})), Xn = qn((function(e, t) {
	return Jn(Zn(e), (function(n) {
		return n.ok ? (t.authType = z.Password, n) : n.status == 401 && Cn(n) ? (t.authType = z.Digest, kn(t, t.username, t.password, void 0, void 0), e._digest = t.digest, Yn(e)) : n;
	}));
})), B = qn((function(e, t) {
	return t.authType === z.Auto ? Xn(e, t) : e._digest ? Yn(e) : Zn(e);
}));
function V(e, t, n) {
	let r = Rn(e);
	return r.headers = Hn(t.headers, r.headers || {}, n.headers || {}), n.data !== void 0 && (r.data = n.data), n.signal && (r.signal = n.signal), t.httpAgent && (r.httpAgent = t.httpAgent), t.httpsAgent && (r.httpsAgent = t.httpsAgent), t.digest && (r._digest = t.digest), typeof t.withCredentials == "boolean" && (r.withCredentials = t.withCredentials), r;
}
function Zn(e) {
	let t = Ln();
	return t.patchInline("request", ((e) => t.patchInline("fetch", jn, e.url, function(e) {
		let t = {}, n = { method: e.method };
		if (e.headers && (t = Hn(t, e.headers)), e.data !== void 0) {
			let [r, i] = function(e) {
				if (typeof e == "string" || Kn(e) || Gn(e)) return [e, {}];
				if (e && typeof e == "object") return [JSON.stringify(e), { "content-type": "application/json" }];
				throw Error("Unable to convert request body: Unexpected body type: " + typeof e);
			}(e.data);
			n.body = r, t = Hn(t, i);
		}
		return e.signal && (n.signal = e.signal), e.withCredentials && (n.credentials = "include"), n.headers = t, n;
	}(e))), e);
}
var Qn = I(285), $n = (e) => {
	if (typeof e != "string") throw TypeError("invalid pattern");
	if (e.length > 65536) throw TypeError("pattern is too long");
}, er = {
	"[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
	"[:alpha:]": ["\\p{L}\\p{Nl}", !0],
	"[:ascii:]": ["\\x00-\\x7f", !1],
	"[:blank:]": ["\\p{Zs}\\t", !0],
	"[:cntrl:]": ["\\p{Cc}", !0],
	"[:digit:]": ["\\p{Nd}", !0],
	"[:graph:]": [
		"\\p{Z}\\p{C}",
		!0,
		!0
	],
	"[:lower:]": ["\\p{Ll}", !0],
	"[:print:]": ["\\p{C}", !0],
	"[:punct:]": ["\\p{P}", !0],
	"[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
	"[:upper:]": ["\\p{Lu}", !0],
	"[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
	"[:xdigit:]": ["A-Fa-f0-9", !1]
}, tr = (e) => e.replace(/[[\]\\-]/g, "\\$&"), nr = (e) => e.join(""), rr = (e, t) => {
	let n = t;
	if (e.charAt(n) !== "[") throw Error("not in a brace expression");
	let r = [], i = [], a = n + 1, o = !1, s = !1, c = !1, l = !1, u = n, d = "";
	t: for (; a < e.length;) {
		let t = e.charAt(a);
		if (t !== "!" && t !== "^" || a !== n + 1) {
			if (t === "]" && o && !c) {
				u = a + 1;
				break;
			}
			if (o = !0, t !== "\\" || c) {
				if (t === "[" && !c) {
					for (let [t, [o, c, l]] of Object.entries(er)) if (e.startsWith(t, a)) {
						if (d) return [
							"$.",
							!1,
							e.length - n,
							!0
						];
						a += t.length, l ? i.push(o) : r.push(o), s ||= c;
						continue t;
					}
				}
				c = !1, d ? (t > d ? r.push(tr(d) + "-" + tr(t)) : t === d && r.push(tr(t)), d = "", a++) : e.startsWith("-]", a + 1) ? (r.push(tr(t + "-")), a += 2) : e.startsWith("-", a + 1) ? (d = t, a += 2) : (r.push(tr(t)), a++);
			} else c = !0, a++;
		} else l = !0, a++;
	}
	if (u < a) return [
		"",
		!1,
		0,
		!1
	];
	if (!r.length && !i.length) return [
		"$.",
		!1,
		e.length - n,
		!0
	];
	if (i.length === 0 && r.length === 1 && /^\\?.$/.test(r[0]) && !l) return [
		(f = r[0].length === 2 ? r[0].slice(-1) : r[0], f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")),
		!1,
		u - n,
		!1
	];
	var f;
	let p = "[" + (l ? "^" : "") + nr(r) + "]", m = "[" + (l ? "" : "^") + nr(i) + "]";
	return [
		r.length && i.length ? "(" + p + "|" + m + ")" : r.length ? p : m,
		s,
		u - n,
		!0
	];
}, ir = (e, { windowsPathsNoEscape: t = !1 } = {}) => t ? e.replace(/\[([^\/\\])\]/g, "$1") : e.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1"), H, ar = /* @__PURE__ */ new Set([
	"!",
	"?",
	"+",
	"*",
	"@"
]), or = (e) => ar.has(e), sr = (e) => or(e.type), cr = /* @__PURE__ */ new Map([
	["!", ["@"]],
	["?", ["?", "@"]],
	["@", ["@"]],
	["*", [
		"*",
		"+",
		"?",
		"@"
	]],
	["+", ["+", "@"]]
]), lr = /* @__PURE__ */ new Map([
	["!", ["?"]],
	["@", ["?"]],
	["+", ["?", "*"]]
]), ur = /* @__PURE__ */ new Map([
	["!", ["?", "@"]],
	["?", ["?", "@"]],
	["@", ["?", "@"]],
	["*", [
		"*",
		"+",
		"?",
		"@"
	]],
	["+", [
		"+",
		"@",
		"?",
		"*"
	]]
]), dr = /* @__PURE__ */ new Map([
	["!", /* @__PURE__ */ new Map([["!", "@"]])],
	["?", /* @__PURE__ */ new Map([["*", "*"], ["+", "*"]])],
	["@", /* @__PURE__ */ new Map([
		["!", "!"],
		["?", "?"],
		["@", "@"],
		["*", "*"],
		["+", "+"]
	])],
	["+", /* @__PURE__ */ new Map([["?", "*"], ["*", "*"]])]
]), fr = "(?!\\.)", pr = /* @__PURE__ */ new Set(["[", "."]), mr = /* @__PURE__ */ new Set(["..", "."]), hr = /* @__PURE__ */ new Set("().*{}+?[]^$\\!"), gr = "[^/]", _r = gr + "*?", vr = gr + "+?", yr = class {
	type;
	#e;
	#t;
	#n = !1;
	#r = [];
	#i;
	#a;
	#o;
	#s = !1;
	#c;
	#l;
	#u = !1;
	constructor(e, t, n = {}) {
		this.type = e, e && (this.#t = !0), this.#i = t, this.#e = this.#i ? this.#i.#e : this, this.#c = this.#e === this ? n : this.#e.#c, this.#o = this.#e === this ? [] : this.#e.#o, e !== "!" || this.#e.#s || this.#o.push(this), this.#a = this.#i ? this.#i.#r.length : 0;
	}
	get hasMagic() {
		if (this.#t !== void 0) return this.#t;
		for (let e of this.#r) if (typeof e != "string" && (e.type || e.hasMagic)) return this.#t = !0;
		return this.#t;
	}
	toString() {
		return this.#l === void 0 ? this.#l = this.type ? this.type + "(" + this.#r.map(((e) => String(e))).join("|") + ")" : this.#r.map(((e) => String(e))).join("") : this.#l;
	}
	#d() {
		if (this !== this.#e) throw Error("should only call on root");
		if (this.#s) return this;
		let e;
		for (this.toString(), this.#s = !0; e = this.#o.pop();) {
			if (e.type !== "!") continue;
			let t = e, n = t.#i;
			for (; n;) {
				for (let r = t.#a + 1; !n.type && r < n.#r.length; r++) for (let t of e.#r) {
					if (typeof t == "string") throw Error("string part in extglob AST??");
					t.copyIn(n.#r[r]);
				}
				t = n, n = t.#i;
			}
		}
		return this;
	}
	push(...e) {
		for (let t of e) if (t !== "") {
			if (typeof t != "string" && !(t instanceof H && t.#i === this)) throw Error("invalid part: " + t);
			this.#r.push(t);
		}
	}
	toJSON() {
		let e = this.type === null ? this.#r.slice().map(((e) => typeof e == "string" ? e : e.toJSON())) : [this.type, ...this.#r.map(((e) => e.toJSON()))];
		return this.isStart() && !this.type && e.unshift([]), this.isEnd() && (this === this.#e || this.#e.#s && this.#i?.type === "!") && e.push({}), e;
	}
	isStart() {
		if (this.#e === this) return !0;
		if (!this.#i?.isStart()) return !1;
		if (this.#a === 0) return !0;
		let e = this.#i;
		for (let t = 0; t < this.#a; t++) {
			let n = e.#r[t];
			if (!(n instanceof H && n.type === "!")) return !1;
		}
		return !0;
	}
	isEnd() {
		if (this.#e === this || this.#i?.type === "!") return !0;
		if (!this.#i?.isEnd()) return !1;
		if (!this.type) return this.#i?.isEnd();
		let e = this.#i ? this.#i.#r.length : 0;
		return this.#a === e - 1;
	}
	copyIn(e) {
		typeof e == "string" ? this.push(e) : this.push(e.clone(this));
	}
	clone(e) {
		let t = new H(this.type, e);
		for (let e of this.#r) t.copyIn(e);
		return t;
	}
	static #f(e, t, n, r, i) {
		let a = r.maxExtglobRecursion ?? 2, o = !1, s = !1, c = -1, l = !1;
		if (t.type === null) {
			let u = n, d = "";
			for (; u < e.length;) {
				let n = e.charAt(u++);
				if (o || n === "\\") o = !o, d += n;
				else if (s) u === c + 1 ? n !== "^" && n !== "!" || (l = !0) : n !== "]" || u === c + 2 && l || (s = !1), d += n;
				else if (n !== "[") {
					if (!r.noext && or(n) && e.charAt(u) === "(" && i <= a) {
						t.push(d), d = "";
						let a = new H(n, t);
						u = H.#f(e, a, u, r, i + 1), t.push(a);
					} else d += n;
				} else s = !0, c = u, l = !1, d += n;
			}
			return t.push(d), u;
		}
		let u = n + 1, d = new H(null, t), f = [], p = "";
		for (; u < e.length;) {
			let n = e.charAt(u++);
			if (o || n === "\\") o = !o, p += n;
			else if (s) u === c + 1 ? n !== "^" && n !== "!" || (l = !0) : n !== "]" || u === c + 2 && l || (s = !1), p += n;
			else if (n !== "[") {
				if (or(n) && e.charAt(u) === "(" && (i <= a || t && t.#h(n))) {
					let a = t && t.#h(n) ? 0 : 1;
					d.push(p), p = "";
					let o = new H(n, d);
					d.push(o), u = H.#f(e, o, u, r, i + a);
				} else if (n !== "|") {
					if (n === ")") return p === "" && t.#r.length === 0 && (t.#u = !0), d.push(p), p = "", t.push(...f, d), u;
					p += n;
				} else d.push(p), p = "", f.push(d), d = new H(null, t);
			} else s = !0, c = u, l = !1, p += n;
		}
		return t.type = null, t.#t = void 0, t.#r = [e.substring(n - 1)], u;
	}
	#p(e) {
		return this.#m(e, lr);
	}
	#m(e, t = cr) {
		if (!e || typeof e != "object" || e.type !== null || e.#r.length !== 1 || this.type === null) return !1;
		let n = e.#r[0];
		return !(!n || typeof n != "object" || n.type === null) && this.#h(n.type, t);
	}
	#h(e, t = ur) {
		return !!t.get(this.type)?.includes(e);
	}
	#g(e, t) {
		let n = e.#r[0], r = new H(null, n, this.options);
		r.#r.push(""), n.push(r), this.#_(e, t);
	}
	#_(e, t) {
		let n = e.#r[0];
		this.#r.splice(t, 1, ...n.#r);
		for (let e of n.#r) typeof e == "object" && (e.#i = this);
		this.#l = void 0;
	}
	#v(e) {
		return !!dr.get(this.type)?.has(e);
	}
	#y(e) {
		if (!e || typeof e != "object" || e.type !== null || e.#r.length !== 1 || this.type === null || this.#r.length !== 1) return !1;
		let t = e.#r[0];
		return !(!t || typeof t != "object" || t.type === null) && this.#v(t.type);
	}
	#b(e) {
		let t = dr.get(this.type), n = e.#r[0], r = t?.get(n.type);
		if (!r) return !1;
		this.#r = n.#r;
		for (let e of this.#r) typeof e == "object" && (e.#i = this);
		this.type = r, this.#l = void 0, this.#u = !1;
	}
	#x() {
		if (sr(this)) {
			let e = 0, t = !1;
			do {
				t = !0;
				for (let e = 0; e < this.#r.length; e++) {
					let n = this.#r[e];
					typeof n == "object" && (n.#x(), this.#m(n) ? (t = !1, this.#_(n, e)) : this.#p(n) ? (t = !1, this.#g(n, e)) : this.#y(n) && (t = !1, this.#b(n)));
				}
			} while (!t && ++e < 10);
		} else for (let e of this.#r) typeof e == "object" && e.#x();
		this.#l = void 0;
	}
	static fromGlob(e, t = {}) {
		let n = new H(null, void 0, t);
		return H.#f(e, n, 0, t, 0), n;
	}
	toMMPattern() {
		if (this !== this.#e) return this.#e.toMMPattern();
		let e = this.toString(), [t, n, r, i] = this.toRegExpSource();
		if (!(r || this.#t || this.#c.nocase && !this.#c.nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase())) return n;
		let a = (this.#c.nocase ? "i" : "") + (i ? "u" : "");
		return Object.assign(RegExp(`^${t}$`, a), {
			_src: t,
			_glob: e
		});
	}
	get options() {
		return this.#c;
	}
	toRegExpSource(e) {
		let t = e ?? !!this.#c.dot;
		if (this.#e === this && (this.#x(), this.#d()), !sr(this)) {
			let n = this.isStart() && this.isEnd(), r = this.#r.map(((t) => {
				let [r, i, a, o] = typeof t == "string" ? H.#C(t, this.#t, n) : t.toRegExpSource(e);
				return this.#t = this.#t || a, this.#n = this.#n || o, r;
			})).join(""), i = "";
			if (this.isStart() && typeof this.#r[0] == "string" && (this.#r.length !== 1 || !mr.has(this.#r[0]))) {
				let n = pr, a = t && n.has(r.charAt(0)) || r.startsWith("\\.") && n.has(r.charAt(2)) || r.startsWith("\\.\\.") && n.has(r.charAt(4)), o = !t && !e && n.has(r.charAt(0));
				i = a ? "(?!(?:^|/)\\.\\.?(?:$|/))" : o ? fr : "";
			}
			let a = "";
			return this.isEnd() && this.#e.#s && this.#i?.type === "!" && (a = "(?:$|\\/)"), [
				i + r + a,
				ir(r),
				this.#t = !!this.#t,
				this.#n
			];
		}
		let n = this.type === "*" || this.type === "+", r = this.type === "!" ? "(?:(?!(?:" : "(?:", i = this.#S(t);
		if (this.isStart() && this.isEnd() && !i && this.type !== "!") {
			let e = this.toString(), t = this;
			return t.#r = [e], t.type = null, t.#t = void 0, [
				e,
				ir(this.toString()),
				!1,
				!1
			];
		}
		let a = !n || e || t ? "" : this.#S(!0);
		a === i && (a = ""), a && (i = `(?:${i})(?:${a})*?`);
		let o = "";
		return o = this.type === "!" && this.#u ? (this.isStart() && !t ? fr : "") + vr : r + i + (this.type === "!" ? "))" + (!this.isStart() || t || e ? "" : fr) + "[^/]*?)" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && a ? ")" : this.type === "*" && a ? ")?" : `)${this.type}`), [
			o,
			ir(i),
			this.#t = !!this.#t,
			this.#n
		];
	}
	#S(e) {
		return this.#r.map(((t) => {
			if (typeof t == "string") throw Error("string type in extglob ast??");
			let [n, r, i, a] = t.toRegExpSource(e);
			return this.#n = this.#n || a, n;
		})).filter(((e) => !(this.isStart() && this.isEnd() && !e))).join("|");
	}
	static #C(e, t, n = !1) {
		let r = !1, i = "", a = !1, o = !1;
		for (let s = 0; s < e.length; s++) {
			let c = e.charAt(s);
			if (r) r = !1, i += (hr.has(c) ? "\\" : "") + c, o = !1;
			else if (c !== "\\") {
				if (c === "[") {
					let [n, r, c, l] = rr(e, s);
					if (c) {
						i += n, a ||= r, s += c - 1, t ||= l, o = !1;
						continue;
					}
				}
				if (c !== "*") o = !1, c === "?" ? (i += gr, t = !0) : i += c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				else {
					if (o) continue;
					o = !0, i += n && /^[*]+$/.test(e) ? vr : _r, t = !0;
				}
			} else s === e.length - 1 ? i += "\\\\" : r = !0;
		}
		return [
			i,
			ir(e),
			!!t,
			a
		];
	}
};
H = yr;
var U = (e, t, n = {}) => ($n(t), !(!n.nocomment && t.charAt(0) === "#") && new Ur(t, n).match(e)), br = /^\*+([^+@!?\*\[\(]*)$/, xr = (e) => (t) => !t.startsWith(".") && t.endsWith(e), Sr = (e) => (t) => t.endsWith(e), Cr = (e) => (e = e.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(e)), wr = (e) => (e = e.toLowerCase(), (t) => t.toLowerCase().endsWith(e)), Tr = /^\*+\.\*+$/, Er = (e) => !e.startsWith(".") && e.includes("."), Dr = (e) => e !== "." && e !== ".." && e.includes("."), Or = /^\.\*+$/, kr = (e) => e !== "." && e !== ".." && e.startsWith("."), Ar = /^\*+$/, jr = (e) => e.length !== 0 && !e.startsWith("."), Mr = (e) => e.length !== 0 && e !== "." && e !== "..", Nr = /^\?+([^+@!?\*\[\(]*)?$/, Pr = ([e, t = ""]) => {
	let n = Rr([e]);
	return t ? (t = t.toLowerCase(), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
}, Fr = ([e, t = ""]) => {
	let n = zr([e]);
	return t ? (t = t.toLowerCase(), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
}, Ir = ([e, t = ""]) => {
	let n = zr([e]);
	return t ? (e) => n(e) && e.endsWith(t) : n;
}, Lr = ([e, t = ""]) => {
	let n = Rr([e]);
	return t ? (e) => n(e) && e.endsWith(t) : n;
}, Rr = ([e]) => {
	let t = e.length;
	return (e) => e.length === t && !e.startsWith(".");
}, zr = ([e]) => {
	let t = e.length;
	return (e) => e.length === t && e !== "." && e !== "..";
}, Br = typeof process == "object" && process ? {}.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
U.sep = Br === "win32" ? "\\" : "/";
var W = Symbol("globstar **");
U.GLOBSTAR = W, U.filter = (e, t = {}) => (n) => U(n, e, t);
var G = (e, t = {}) => Object.assign({}, e, t);
U.defaults = (e) => {
	if (!e || typeof e != "object" || !Object.keys(e).length) return U;
	let t = U;
	return Object.assign(((n, r, i = {}) => t(n, r, G(e, i))), {
		Minimatch: class extends t.Minimatch {
			constructor(t, n = {}) {
				super(t, G(e, n));
			}
			static defaults(n) {
				return t.defaults(G(e, n)).Minimatch;
			}
		},
		AST: class extends t.AST {
			constructor(t, n, r = {}) {
				super(t, n, G(e, r));
			}
			static fromGlob(n, r = {}) {
				return t.AST.fromGlob(n, G(e, r));
			}
		},
		unescape: (n, r = {}) => t.unescape(n, G(e, r)),
		escape: (n, r = {}) => t.escape(n, G(e, r)),
		filter: (n, r = {}) => t.filter(n, G(e, r)),
		defaults: (n) => t.defaults(G(e, n)),
		makeRe: (n, r = {}) => t.makeRe(n, G(e, r)),
		braceExpand: (n, r = {}) => t.braceExpand(n, G(e, r)),
		match: (n, r, i = {}) => t.match(n, r, G(e, i)),
		sep: t.sep,
		GLOBSTAR: W
	});
};
var Vr = (e, t = {}) => ($n(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : Qn(e));
U.braceExpand = Vr, U.makeRe = (e, t = {}) => new Ur(e, t).makeRe(), U.match = (e, t, n = {}) => {
	let r = new Ur(t, n);
	return e = e.filter(((e) => r.match(e))), r.options.nonull && !e.length && e.push(t), e;
};
var Hr = /[?*]|[+@!]\(.*?\)|\[|\]/, Ur = class {
	options;
	set;
	pattern;
	windowsPathsNoEscape;
	nonegate;
	negate;
	comment;
	empty;
	preserveMultipleSlashes;
	partial;
	globSet;
	globParts;
	nocase;
	isWindows;
	platform;
	windowsNoMagicRoot;
	maxGlobstarRecursion;
	regexp;
	constructor(e, t = {}) {
		$n(e), t ||= {}, this.options = t, this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200, this.pattern = e, this.platform = t.platform || Br, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || !1 === t.allowWindowsEscape, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!t.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!t.nonegate, this.comment = !1, this.empty = !1, this.partial = !!t.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = t.windowsNoMagicRoot === void 0 ? !(!this.isWindows || !this.nocase) : t.windowsNoMagicRoot, this.globSet = [], this.globParts = [], this.set = [], this.make();
	}
	hasMagic() {
		if (this.options.magicalBraces && this.set.length > 1) return !0;
		for (let e of this.set) for (let t of e) if (typeof t != "string") return !0;
		return !1;
	}
	debug(...e) {}
	make() {
		let e = this.pattern, t = this.options;
		if (!t.nocomment && e.charAt(0) === "#") return void (this.comment = !0);
		if (!e) return void (this.empty = !0);
		this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], t.debug && (this.debug = (...e) => console.error(...e)), this.debug(this.pattern, this.globSet);
		let n = this.globSet.map(((e) => this.slashSplit(e)));
		this.globParts = this.preprocess(n), this.debug(this.pattern, this.globParts);
		let r = this.globParts.map(((e, t, n) => {
			if (this.isWindows && this.windowsNoMagicRoot) {
				let t = !(e[0] !== "" || e[1] !== "" || e[2] !== "?" && Hr.test(e[2]) || Hr.test(e[3])), n = /^[a-z]:/i.test(e[0]);
				if (t) return [...e.slice(0, 4), ...e.slice(4).map(((e) => this.parse(e)))];
				if (n) return [e[0], ...e.slice(1).map(((e) => this.parse(e)))];
			}
			return e.map(((e) => this.parse(e)));
		}));
		if (this.debug(this.pattern, r), this.set = r.filter(((e) => e.indexOf(!1) === -1)), this.isWindows) for (let e = 0; e < this.set.length; e++) {
			let t = this.set[e];
			t[0] === "" && t[1] === "" && this.globParts[e][2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]) && (t[2] = "?");
		}
		this.debug(this.pattern, this.set);
	}
	preprocess(e) {
		if (this.options.noglobstar) for (let t = 0; t < e.length; t++) for (let n = 0; n < e[t].length; n++) e[t][n] === "**" && (e[t][n] = "*");
		let { optimizationLevel: t = 1 } = this.options;
		return t >= 2 ? (e = this.firstPhasePreProcess(e), e = this.secondPhasePreProcess(e)) : e = t >= 1 ? this.levelOneOptimize(e) : this.adjascentGlobstarOptimize(e), e;
	}
	adjascentGlobstarOptimize(e) {
		return e.map(((e) => {
			let t = -1;
			for (; (t = e.indexOf("**", t + 1)) !== -1;) {
				let n = t;
				for (; e[n + 1] === "**";) n++;
				n !== t && e.splice(t, n - t);
			}
			return e;
		}));
	}
	levelOneOptimize(e) {
		return e.map(((e) => (e = e.reduce(((e, t) => {
			let n = e[e.length - 1];
			return t === "**" && n === "**" ? e : t === ".." && n && n !== ".." && n !== "." && n !== "**" ? (e.pop(), e) : (e.push(t), e);
		}), [])).length === 0 ? [""] : e));
	}
	levelTwoFileOptimize(e) {
		Array.isArray(e) || (e = this.slashSplit(e));
		let t = !1;
		do {
			if (t = !1, !this.preserveMultipleSlashes) {
				for (let n = 1; n < e.length - 1; n++) {
					let r = e[n];
					n === 1 && r === "" && e[0] === "" || r !== "." && r !== "" || (t = !0, e.splice(n, 1), n--);
				}
				e[0] !== "." || e.length !== 2 || e[1] !== "." && e[1] !== "" || (t = !0, e.pop());
			}
			let n = 0;
			for (; (n = e.indexOf("..", n + 1)) !== -1;) {
				let r = e[n - 1];
				r && r !== "." && r !== ".." && r !== "**" && (t = !0, e.splice(n - 1, 2), n -= 2);
			}
		} while (t);
		return e.length === 0 ? [""] : e;
	}
	firstPhasePreProcess(e) {
		let t = !1;
		do {
			t = !1;
			for (let n of e) {
				let r = -1;
				for (; (r = n.indexOf("**", r + 1)) !== -1;) {
					let i = r;
					for (; n[i + 1] === "**";) i++;
					i > r && n.splice(r + 1, i - r);
					let a = n[r + 1], o = n[r + 2], s = n[r + 3];
					if (a !== ".." || !o || o === "." || o === ".." || !s || s === "." || s === "..") continue;
					t = !0, n.splice(r, 1);
					let c = n.slice(0);
					c[r] = "**", e.push(c), r--;
				}
				if (!this.preserveMultipleSlashes) {
					for (let e = 1; e < n.length - 1; e++) {
						let r = n[e];
						e === 1 && r === "" && n[0] === "" || r !== "." && r !== "" || (t = !0, n.splice(e, 1), e--);
					}
					n[0] !== "." || n.length !== 2 || n[1] !== "." && n[1] !== "" || (t = !0, n.pop());
				}
				let i = 0;
				for (; (i = n.indexOf("..", i + 1)) !== -1;) {
					let e = n[i - 1];
					if (e && e !== "." && e !== ".." && e !== "**") {
						t = !0;
						let e = i === 1 && n[i + 1] === "**" ? ["."] : [];
						n.splice(i - 1, 2, ...e), n.length === 0 && n.push(""), i -= 2;
					}
				}
			}
		} while (t);
		return e;
	}
	secondPhasePreProcess(e) {
		for (let t = 0; t < e.length - 1; t++) for (let n = t + 1; n < e.length; n++) {
			let r = this.partsMatch(e[t], e[n], !this.preserveMultipleSlashes);
			if (r) {
				e[t] = [], e[n] = r;
				break;
			}
		}
		return e.filter(((e) => e.length));
	}
	partsMatch(e, t, n = !1) {
		let r = 0, i = 0, a = [], o = "";
		for (; r < e.length && i < t.length;) if (e[r] === t[i]) a.push(o === "b" ? t[i] : e[r]), r++, i++;
		else if (n && e[r] === "**" && t[i] === e[r + 1]) a.push(e[r]), r++;
		else if (n && t[i] === "**" && e[r] === t[i + 1]) a.push(t[i]), i++;
		else if (e[r] !== "*" || !t[i] || !this.options.dot && t[i].startsWith(".") || t[i] === "**") {
			if (t[i] !== "*" || !e[r] || !this.options.dot && e[r].startsWith(".") || e[r] === "**" || o === "a") return !1;
			o = "b", a.push(t[i]), r++, i++;
		} else {
			if (o === "b") return !1;
			o = "a", a.push(e[r]), r++, i++;
		}
		return e.length === t.length && a;
	}
	parseNegate() {
		if (this.nonegate) return;
		let e = this.pattern, t = !1, n = 0;
		for (let r = 0; r < e.length && e.charAt(r) === "!"; r++) t = !t, n++;
		n && (this.pattern = e.slice(n)), this.negate = t;
	}
	matchOne(e, t, n = !1) {
		let r = 0, i = 0;
		if (this.isWindows) {
			let n = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), a = !n && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]), o = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), s = a ? 3 : n ? 0 : void 0, c = !o && t[0] === "" && t[1] === "" && t[2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]) ? 3 : o ? 0 : void 0;
			if (typeof s == "number" && typeof c == "number") {
				let [n, a] = [e[s], t[c]];
				n.toLowerCase() === a.toLowerCase() && (t[c] = n, i = c, r = s);
			}
		}
		let { optimizationLevel: a = 1 } = this.options;
		return a >= 2 && (e = this.levelTwoFileOptimize(e)), t.includes(W) ? this.#e(e, t, n, r, i) : this.#n(e, t, n, r, i);
	}
	#e(e, t, n, r, i) {
		let a = t.indexOf(W, i), o = t.lastIndexOf(W), [s, c, l] = n ? [
			t.slice(i, a),
			t.slice(a + 1),
			[]
		] : [
			t.slice(i, a),
			t.slice(a + 1, o),
			t.slice(o + 1)
		];
		if (s.length) {
			let t = e.slice(r, r + s.length);
			if (!this.#n(t, s, n, 0, 0)) return !1;
			r += s.length;
		}
		let u = 0;
		if (l.length) {
			if (l.length + r > e.length) return !1;
			let t = e.length - l.length;
			if (this.#n(e, l, n, t, 0)) u = l.length;
			else {
				if (e[e.length - 1] !== "" || r + l.length === e.length || (t--, !this.#n(e, l, n, t, 0))) return !1;
				u = l.length + 1;
			}
		}
		if (!c.length) {
			let t = !!u;
			for (let n = r; n < e.length - u; n++) {
				let r = String(e[n]);
				if (t = !0, r === "." || r === ".." || !this.options.dot && r.startsWith(".")) return !1;
			}
			return n || t;
		}
		let d = [[[], 0]], f = d[0], p = 0, m = [0];
		for (let e of c) e === W ? (m.push(p), f = [[], 0], d.push(f)) : (f[0].push(e), p++);
		let h = d.length - 1, g = e.length - u;
		for (let e of d) e[1] = g - (m[h--] + e[0].length);
		return !!this.#t(e, d, r, 0, n, 0, !!u);
	}
	#t(e, t, n, r, i, a, o) {
		let s = t[r];
		if (!s) {
			for (let t = n; t < e.length; t++) {
				o = !0;
				let n = e[t];
				if (n === "." || n === ".." || !this.options.dot && n.startsWith(".")) return !1;
			}
			return o;
		}
		let [c, l] = s;
		for (; n <= l;) {
			if (this.#n(e.slice(0, n + c.length), c, i, n, 0) && a < this.maxGlobstarRecursion) {
				let s = this.#t(e, t, n + c.length, r + 1, i, a + 1, o);
				if (!1 !== s) return s;
			}
			let s = e[n];
			if (s === "." || s === ".." || !this.options.dot && s.startsWith(".")) return !1;
			n++;
		}
		return i || null;
	}
	#n(e, t, n, r, i) {
		let a, o, s, c;
		for (a = r, o = i, c = e.length, s = t.length; a < c && o < s; a++, o++) {
			this.debug("matchOne loop");
			let n, r = t[o], i = e[a];
			if (this.debug(t, r, i), !1 === r || r === W || (typeof r == "string" ? (n = i === r, this.debug("string match", r, i, n)) : (n = r.test(i), this.debug("pattern match", r, i, n)), !n)) return !1;
		}
		if (a === c && o === s) return !0;
		if (a === c) return n;
		if (o === s) return a === c - 1 && e[a] === "";
		throw Error("wtf?");
	}
	braceExpand() {
		return Vr(this.pattern, this.options);
	}
	parse(e) {
		$n(e);
		let t = this.options;
		if (e === "**") return W;
		if (e === "") return "";
		let n, r = null;
		(n = e.match(Ar)) ? r = t.dot ? Mr : jr : (n = e.match(br)) ? r = (t.nocase ? t.dot ? wr : Cr : t.dot ? Sr : xr)(n[1]) : (n = e.match(Nr)) ? r = (t.nocase ? t.dot ? Fr : Pr : t.dot ? Ir : Lr)(n) : (n = e.match(Tr)) ? r = t.dot ? Dr : Er : (n = e.match(Or)) && (r = kr);
		let i = yr.fromGlob(e, this.options).toMMPattern();
		return r && typeof i == "object" && Reflect.defineProperty(i, "test", { value: r }), i;
	}
	makeRe() {
		if (this.regexp || !1 === this.regexp) return this.regexp;
		let e = this.set;
		if (!e.length) return this.regexp = !1, this.regexp;
		let t = this.options, n = t.noglobstar ? "[^/]*?" : t.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", r = new Set(t.nocase ? ["i"] : []), i = e.map(((e) => {
			let t = e.map(((e) => {
				if (e instanceof RegExp) for (let t of e.flags.split("")) r.add(t);
				return typeof e == "string" ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : e === W ? W : e._src;
			}));
			return t.forEach(((e, r) => {
				let i = t[r + 1], a = t[r - 1];
				e === W && a !== W && (a === void 0 ? i !== void 0 && i !== W ? t[r + 1] = "(?:\\/|" + n + "\\/)?" + i : t[r] = n : i === void 0 ? t[r - 1] = a + "(?:\\/|" + n + ")?" : i !== W && (t[r - 1] = a + "(?:\\/|\\/" + n + "\\/)" + i, t[r + 1] = W));
			})), t.filter(((e) => e !== W)).join("/");
		})).join("|"), [a, o] = e.length > 1 ? ["(?:", ")"] : ["", ""];
		i = "^" + a + i + o + "$", this.negate && (i = "^(?!" + i + ").+$");
		try {
			this.regexp = new RegExp(i, [...r].join(""));
		} catch {
			this.regexp = !1;
		}
		return this.regexp;
	}
	slashSplit(e) {
		return this.preserveMultipleSlashes ? e.split("/") : this.isWindows && /^\/\/[^\/]+/.test(e) ? ["", ...e.split(/\/+/)] : e.split(/\/+/);
	}
	match(e, t = this.partial) {
		if (this.debug("match", e, this.pattern), this.comment) return !1;
		if (this.empty) return e === "";
		if (e === "/" && t) return !0;
		let n = this.options;
		this.isWindows && (e = e.split("\\").join("/"));
		let r = this.slashSplit(e);
		this.debug(this.pattern, "split", r);
		let i = this.set;
		this.debug(this.pattern, "set", i);
		let a = r[r.length - 1];
		if (!a) for (let e = r.length - 2; !a && e >= 0; e--) a = r[e];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = r;
			if (n.matchBase && o.length === 1 && (s = [a]), this.matchOne(s, o, t)) return !!n.flipNegate || !this.negate;
		}
		return !n.flipNegate && this.negate;
	}
	static defaults(e) {
		return U.defaults(e).Minimatch;
	}
};
function Wr(e, t = "") {
	let n = /* @__PURE__ */ Error(`${t}Invalid response: ${e.status} ${e.statusText}`);
	return n.status = e.status, n.response = e, n;
}
function K(e, t) {
	let { status: n } = t;
	if (n === 401 && e.digest) return t;
	if (n >= 400) throw Wr(t);
	return t;
}
function Gr(e, t, n = !1) {
	return n ? {
		data: t,
		headers: e.headers ? Vn(e.headers) : {},
		status: e.status,
		statusText: e.statusText
	} : t;
}
U.AST = yr, U.Minimatch = Ur, U.escape = (e, { windowsPathsNoEscape: t = !1 } = {}) => t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&"), U.unescape = ir;
var Kr = (qr = function(e, t, n, r = {}) {
	let i = V({
		url: R(e.remoteURL, L(t)),
		method: "COPY",
		headers: {
			Destination: R(e.remoteURL, L(n)),
			Overwrite: !1 === r.overwrite ? "F" : "T",
			Depth: r.shallow ? "0" : "infinity"
		}
	}, e, r);
	return o = function(t) {
		K(e, t);
	}, (a = B(i, e)) && a.then || (a = Promise.resolve(a)), o ? a.then(o) : a;
	var a, o;
}, function() {
	var e = [...arguments];
	try {
		return Promise.resolve(qr.apply(this, e));
	} catch (e) {
		return Promise.reject(e);
	}
}), qr, Jr = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Yr = RegExp("^[" + Jr + "][" + Jr + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Xr = function(e) {
	return Yr.exec(e) != null;
}, Zr = [
	"hasOwnProperty",
	"toString",
	"valueOf",
	"__defineGetter__",
	"__defineSetter__",
	"__lookupGetter__",
	"__lookupSetter__"
], Qr = [
	"__proto__",
	"constructor",
	"prototype"
], $r = (e) => Zr.includes(e) ? "__" + e : e, ei = {
	preserveOrder: !1,
	attributeNamePrefix: "@_",
	attributesGroupName: !1,
	textNodeName: "#text",
	ignoreAttributes: !0,
	removeNSPrefix: !1,
	allowBooleanAttributes: !1,
	parseTagValue: !0,
	parseAttributeValue: !1,
	trimValues: !0,
	cdataPropName: !1,
	numberParseOptions: {
		hex: !0,
		leadingZeros: !0,
		eNotation: !0,
		unicode: !1
	},
	tagValueProcessor: function(e, t) {
		return t;
	},
	attributeValueProcessor: function(e, t) {
		return t;
	},
	stopNodes: [],
	alwaysCreateTextNode: !1,
	isArray: () => !1,
	commentPropName: !1,
	unpairedTags: [],
	processEntities: !0,
	htmlEntities: !1,
	entityDecoder: null,
	ignoreDeclaration: !1,
	ignorePiTags: !1,
	transformTagName: !1,
	transformAttributeName: !1,
	updateTag: function(e, t, n) {
		return e;
	},
	captureMetaData: !1,
	maxNestedTags: 100,
	strictReservedNames: !0,
	jPath: !0,
	onDangerousProperty: $r
};
function ti(e, t) {
	if (typeof e != "string") return;
	let n = e.toLowerCase();
	if (Zr.some(((e) => n === e.toLowerCase())) || Qr.some(((e) => n === e.toLowerCase()))) throw Error(`[SECURITY] Invalid ${t}: "${e}" is a reserved JavaScript keyword that could cause prototype pollution`);
}
function ni(e, t) {
	return typeof e == "boolean" ? {
		enabled: e,
		maxEntitySize: 1e4,
		maxExpansionDepth: 1e4,
		maxTotalExpansions: 1 / 0,
		maxExpandedLength: 1e5,
		maxEntityCount: 1e3,
		allowedTags: null,
		tagFilter: null,
		appliesTo: "all"
	} : typeof e == "object" && e ? {
		enabled: !1 !== e.enabled,
		maxEntitySize: Math.max(1, e.maxEntitySize ?? 1e4),
		maxExpansionDepth: Math.max(1, e.maxExpansionDepth ?? 1e4),
		maxTotalExpansions: Math.max(1, e.maxTotalExpansions ?? 1 / 0),
		maxExpandedLength: Math.max(1, e.maxExpandedLength ?? 1e5),
		maxEntityCount: Math.max(1, e.maxEntityCount ?? 1e3),
		allowedTags: e.allowedTags ?? null,
		tagFilter: e.tagFilter ?? null,
		appliesTo: e.appliesTo ?? "all"
	} : ni(!0);
}
var ri = function(e) {
	let t = Object.assign({}, ei, e), n = [
		{
			value: t.attributeNamePrefix,
			name: "attributeNamePrefix"
		},
		{
			value: t.attributesGroupName,
			name: "attributesGroupName"
		},
		{
			value: t.textNodeName,
			name: "textNodeName"
		},
		{
			value: t.cdataPropName,
			name: "cdataPropName"
		},
		{
			value: t.commentPropName,
			name: "commentPropName"
		}
	];
	for (let { value: e, name: t } of n) e && ti(e, t);
	return t.onDangerousProperty === null && (t.onDangerousProperty = $r), t.processEntities = ni(t.processEntities, t.htmlEntities), t.unpairedTagsSet = new Set(t.unpairedTags), t.stopNodes && Array.isArray(t.stopNodes) && (t.stopNodes = t.stopNodes.map(((e) => typeof e == "string" && e.startsWith("*.") ? ".." + e.substring(2) : e))), t;
}, ii = typeof Symbol == "function" ? Symbol("XML Node Metadata") : "@@xmlMetadata", ai = class {
	constructor(e) {
		this.tagname = e, this.child = [], this[":@"] = Object.create(null);
	}
	add(e, t) {
		e === "__proto__" && (e = "#__proto__"), this.child.push({ [e]: t });
	}
	addChild(e, t) {
		e.tagname === "__proto__" && (e.tagname = "#__proto__"), e[":@"] && Object.keys(e[":@"]).length > 0 ? this.child.push({
			[e.tagname]: e.child,
			":@": e[":@"]
		}) : this.child.push({ [e.tagname]: e.child }), this.addStartIndex(t);
	}
	addStartIndex(e) {
		e !== void 0 && (this.child[this.child.length - 1][ii] = { startIndex: e });
	}
	addEndIndex(e) {
		let t = this.child[this.child.length - 1];
		t !== void 0 && t[ii] !== void 0 && t[ii].endIndex === void 0 && (t[ii].endIndex = e);
	}
	static getMetaDataSymbol() {
		return ii;
	}
}, oi = ":A-Za-z_À-ÖØ-öø-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", si = ":A-Za-z_À-˿Ͱ-ͽͿ-҆҈-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�𐀀-󯿿", ci = si + "\\-\\.\\d·̀-ͯ҇‿-⁀", li = (e, t, n = "") => {
	let r = `[${e.replace(":", "")}][${t.replace(":", "")}]*`;
	return {
		name: RegExp(`^[${e}][${t}]*$`, n),
		ncName: RegExp(`^${r}$`, n),
		qName: RegExp(`^${r}(?::${r})?$`, n),
		nmToken: RegExp(`^[${t}]+$`, n),
		nmTokens: RegExp(`^[${t}]+(?:\\s+[${t}]+)*$`, n)
	};
}, ui = li(oi, oi + "\\-\\.\\d·̀-ͯ‿-⁀"), di = li(si, ci, "u"), fi = ":A-Za-z_", pi = li(fi, fi + "\\-\\.\\d"), mi = (e = "1.0", t = !1) => t ? pi : e === "1.1" ? di : ui, hi = (e, { xmlVersion: t = "1.0", asciiOnly: n = !1 } = {}) => mi(t, n).qName.test(e), gi = [
	"name",
	"ncName",
	"qName",
	"nmToken",
	"nmTokens"
], _i = (e, { xmlVersion: t = "1.0", asciiOnly: n = !1, maxCacheSize: r = 2048 } = {}) => {
	if (!gi.includes(e)) throw TypeError(`Unknown production "${e}". Must be one of: ${gi.join(", ")}`);
	let i = mi(t, n)[e], a = /* @__PURE__ */ new Map(), o = (e) => {
		let t = a.get(e);
		if (t !== void 0) return t;
		let n = i.test(e);
		return a.size < r && a.set(e, n), n;
	};
	return o.reset = () => {
		a = /* @__PURE__ */ new Map();
	}, o;
}, vi = class {
	constructor(e, t) {
		this.suppressValidationErr = !e, this.options = e, this.xmlVersion = t || 1;
	}
	setXmlVersion(e = 1) {
		this.xmlVersion = e;
	}
	readDocType(e, t) {
		let n = Object.create(null), r = 0;
		if (e[t + 3] !== "O" || e[t + 4] !== "C" || e[t + 5] !== "T" || e[t + 6] !== "Y" || e[t + 7] !== "P" || e[t + 8] !== "E") throw Error("Invalid Tag instead of DOCTYPE");
		{
			t += 9;
			let i = 1, a = !1, o = !1, s = null, c = "";
			for (; t < e.length; t++) if (s === null) {
				if (a || o || e[t] !== "\"" && e[t] !== "'") {
					if (e[t] !== "<" || o) {
						if (e[t] === ">") {
							if (o ? e[t - 1] === "-" && e[t - 2] === "-" && (o = !1, i--) : i--, i === 0) break;
						} else e[t] === "[" ? a = !0 : c += e[t];
					} else {
						if (a && yi(e, "!ENTITY", t)) {
							let i, a;
							if (t += 7, [i, a, t] = this.readEntityExp(e, t + 1, this.suppressValidationErr), a.indexOf("&") === -1) {
								if (!1 !== this.options.enabled && this.options.maxEntityCount != null && r >= this.options.maxEntityCount) throw Error(`Entity count (${r + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`);
								n[i] = a, r++;
							}
						} else if (a && yi(e, "!ELEMENT", t)) {
							t += 8;
							let { index: n } = this.readElementExp(e, t + 1);
							t = n;
						} else if (a && yi(e, "!ATTLIST", t)) t += 8;
						else if (a && yi(e, "!NOTATION", t)) {
							t += 9;
							let { index: n } = this.readNotationExp(e, t + 1, this.suppressValidationErr);
							t = n;
						} else {
							if (!yi(e, "!--", t)) throw Error("Invalid DOCTYPE");
							o = !0;
						}
						i++, c = "";
					}
				} else s = e[t], c += e[t];
			} else e[t] === s && (s = null), c += e[t];
			if (s !== null || i !== 0) throw Error("Unclosed DOCTYPE");
		}
		return {
			entities: n,
			i: t
		};
	}
	readEntityExp(e, t) {
		let n = t = q(e, t);
		for (; t < e.length && !/\s/.test(e[t]) && e[t] !== "\"" && e[t] !== "'";) t++;
		let r = e.substring(n, t);
		if (bi(r, { xmlVersion: this.xmlVersion }), t = q(e, t), !this.suppressValidationErr) {
			if (e.substring(t, t + 6).toUpperCase() === "SYSTEM") throw Error("External entities are not supported");
			if (e[t] === "%") throw Error("Parameter entities are not supported");
		}
		let i = "";
		if ([t, i] = this.readIdentifierVal(e, t, "entity"), !1 !== this.options.enabled && this.options.maxEntitySize != null && i.length > this.options.maxEntitySize) throw Error(`Entity "${r}" size (${i.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);
		return [
			r,
			i,
			--t
		];
	}
	readNotationExp(e, t) {
		let n = t = q(e, t);
		for (; t < e.length && !/\s/.test(e[t]);) t++;
		let r = e.substring(n, t);
		!this.suppressValidationErr && bi(r, { xmlVersion: this.xmlVersion }), t = q(e, t);
		let i = e.substring(t, t + 6).toUpperCase();
		if (!this.suppressValidationErr && i !== "SYSTEM" && i !== "PUBLIC") throw Error(`Expected SYSTEM or PUBLIC, found "${i}"`);
		t += i.length, t = q(e, t);
		let a = null, o = null;
		if (i === "PUBLIC") [t, a] = this.readIdentifierVal(e, t, "publicIdentifier"), e[t = q(e, t)] !== "\"" && e[t] !== "'" || ([t, o] = this.readIdentifierVal(e, t, "systemIdentifier"));
		else if (i === "SYSTEM" && ([t, o] = this.readIdentifierVal(e, t, "systemIdentifier"), !this.suppressValidationErr && !o)) throw Error("Missing mandatory system identifier for SYSTEM notation");
		return {
			notationName: r,
			publicIdentifier: a,
			systemIdentifier: o,
			index: --t
		};
	}
	readIdentifierVal(e, t, n) {
		let r = "", i = e[t];
		if (i !== "\"" && i !== "'") throw Error(`Expected quoted string, found "${i}"`);
		let a = ++t;
		for (; t < e.length && e[t] !== i;) t++;
		if (r = e.substring(a, t), e[t] !== i) throw Error(`Unterminated ${n} value`);
		return [++t, r];
	}
	readElementExp(e, t) {
		let n = t = q(e, t);
		for (; t < e.length && !/\s/.test(e[t]);) t++;
		let r = e.substring(n, t);
		if (!this.suppressValidationErr && !hi(r, { xmlVersion: this.xmlVersion })) throw Error(`Invalid element name: "${r}"`);
		let i = "";
		if (e[t = q(e, t)] === "E" && yi(e, "MPTY", t)) t += 4;
		else if (e[t] === "A" && yi(e, "NY", t)) t += 2;
		else if (e[t] === "(") {
			let n = ++t;
			for (; t < e.length && e[t] !== ")";) t++;
			if (i = e.substring(n, t), e[t] !== ")") throw Error("Unterminated content model");
		} else if (!this.suppressValidationErr) throw Error(`Invalid Element Expression, found "${e[t]}"`);
		return {
			elementName: r,
			contentModel: i.trim(),
			index: t
		};
	}
	readAttlistExp(e, t) {
		let n = t = q(e, t);
		for (; t < e.length && !/\s/.test(e[t]);) t++;
		let r = e.substring(n, t);
		for (bi(r, { xmlVersion: this.xmlVersion }), n = t = q(e, t); t < e.length && !/\s/.test(e[t]);) t++;
		let i = e.substring(n, t);
		if (!bi(i, { xmlVersion: this.xmlVersion })) throw Error(`Invalid attribute name: "${i}"`);
		t = q(e, t);
		let a = "";
		if (e.substring(t, t + 8).toUpperCase() === "NOTATION") {
			if (a = "NOTATION", e[t = q(e, t += 8)] !== "(") throw Error(`Expected '(', found "${e[t]}"`);
			t++;
			let n = [];
			for (; t < e.length && e[t] !== ")";) {
				let r = t;
				for (; t < e.length && e[t] !== "|" && e[t] !== ")";) t++;
				let i = e.substring(r, t);
				if (i = i.trim(), !bi(i, { xmlVersion: this.xmlVersion })) throw Error(`Invalid notation name: "${i}"`);
				n.push(i), e[t] === "|" && (t++, t = q(e, t));
			}
			if (e[t] !== ")") throw Error("Unterminated list of notations");
			t++, a += " (" + n.join("|") + ")";
		} else {
			let n = t;
			for (; t < e.length && !/\s/.test(e[t]);) t++;
			if (a += e.substring(n, t), !this.suppressValidationErr && ![
				"CDATA",
				"ID",
				"IDREF",
				"IDREFS",
				"ENTITY",
				"ENTITIES",
				"NMTOKEN",
				"NMTOKENS"
			].includes(a.toUpperCase())) throw Error(`Invalid attribute type: "${a}"`);
		}
		t = q(e, t);
		let o = "";
		return e.substring(t, t + 8).toUpperCase() === "#REQUIRED" ? (o = "#REQUIRED", t += 8) : e.substring(t, t + 7).toUpperCase() === "#IMPLIED" ? (o = "#IMPLIED", t += 7) : [t, o] = this.readIdentifierVal(e, t, "ATTLIST"), {
			elementName: r,
			attributeName: i,
			attributeType: a,
			defaultValue: o,
			index: t
		};
	}
}, q = (e, t) => {
	for (; t < e.length && /\s/.test(e[t]);) t++;
	return t;
};
function yi(e, t, n) {
	for (let r = 0; r < t.length; r++) if (t[r] !== e[n + r + 1]) return !1;
	return !0;
}
function bi(e, t) {
	if (hi(e, { xmlVersion: t })) return e;
	throw Error(`Invalid entity name ${e}`);
}
var xi = [
	48,
	1632,
	1776,
	2406,
	2534,
	2662,
	2790,
	2918,
	3046,
	3174,
	3302,
	3430,
	3558,
	3664,
	3792,
	3872,
	4160,
	4240,
	6112,
	6160,
	6470,
	6608,
	6784,
	6800,
	6992,
	7088,
	7232,
	7248,
	65296,
	120782,
	120792,
	120802,
	120812,
	120822,
	66720,
	68912,
	69734,
	69872,
	69942,
	70096,
	70384,
	70736,
	70864,
	71248,
	71360,
	71472,
	71904,
	72016,
	72688,
	72784,
	73040,
	73120,
	73552,
	92768,
	92864,
	93008,
	123200,
	123632,
	124144,
	125264,
	130032
], Si = /* @__PURE__ */ new Map(), Ci = 1632, wi = (/* @__PURE__ */ new Uint8Array(63904)).fill(255);
for (let e of xi) for (let t = 0; t < 10; t++) {
	let n = e + t;
	n <= 65535 ? wi[n - Ci] = t : Si.set(n, t);
}
var Ti = /* @__PURE__ */ new Set([
	8722,
	65293,
	65123
]), Ei = /^[-+]?0x[a-fA-F0-9]+$/, Di = /^0b[01]+$/, Oi = /^0o[0-7]+$/, ki = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, Ai = {
	hex: !0,
	binary: !1,
	octal: !1,
	leadingZeros: !0,
	decimalPoint: ".",
	eNotation: !0,
	infinity: "original",
	unicode: !1
};
function ji(e, t = {}) {
	if (t = Object.assign({}, Ai, t), !e || typeof e != "string") return e;
	let n = e.trim();
	if (n.length === 0 || t.skipLike !== void 0 && t.skipLike.test(n)) return e;
	if (n === "0" || t.unicode && (n = function(e) {
		if (typeof e != "string") return e;
		let t = e.length;
		if (t === 0) return e;
		let n = -1;
		for (let r = 0; r < t; r++) {
			let i = e.charCodeAt(r);
			if (!(i >= 48 && i <= 57 || i === 45)) {
				if (i < Ci) {
					if (Ti.has(i)) {
						n = r;
						break;
					}
				} else if (i >= 55296 && i <= 56319) {
					if (r + 1 < t) {
						let t = e.charCodeAt(r + 1);
						if (t >= 56320 && t <= 57343) {
							let e = 65536 + (i - 55296 << 10) + (t - 56320);
							if (Si.has(e)) {
								n = r;
								break;
							}
						}
					}
				} else if (wi[i - Ci] !== 255 || Ti.has(i)) {
					n = r;
					break;
				}
			}
		}
		if (n === -1) return e;
		let r = [];
		n > 0 && r.push(e.slice(0, n));
		for (let i = n; i < t; i++) {
			let n = e.charCodeAt(i);
			if (n >= 48 && n <= 57 || n === 45) {
				r.push(e[i]);
				continue;
			}
			if (n < Ci) {
				r.push(Ti.has(n) ? "-" : e[i]);
				continue;
			}
			if (n >= 55296 && n <= 56319) {
				if (i + 1 < t) {
					let t = e.charCodeAt(i + 1);
					if (t >= 56320 && t <= 57343) {
						let e = 65536 + (n - 55296 << 10) + (t - 56320), a = Si.get(e);
						if (a !== void 0) {
							r.push(String.fromCharCode(a + 48)), i++;
							continue;
						}
					}
				}
				r.push(e[i]);
				continue;
			}
			if (Ti.has(n)) {
				r.push("-");
				continue;
			}
			let a = wi[n - Ci];
			r.push(a === 255 ? e[i] : String.fromCharCode(a + 48));
		}
		return r.join("");
	}(n), n === "0")) return 0;
	if (t.hex && Ei.test(n)) return Ni(n, 16);
	if (t.binary && Di.test(n)) return Ni(n, 2);
	if (t.octal && Oi.test(n)) return Ni(n, 8);
	if (isFinite(n)) {
		if (n.includes("e") || n.includes("E")) return function(e, t, n) {
			if (!n.eNotation) return e;
			let r = t.match(Mi);
			if (r) {
				let i = r[1] || "", a = r[3].indexOf("e") === -1 ? "E" : "e", o = r[2], s = i ? e[o.length + 1] === a : e[o.length] === a;
				return o.length > 1 && s ? e : (o.length !== 1 || !r[3].startsWith(`.${a}`) && r[3][0] !== a) && o.length > 0 ? n.leadingZeros && !s ? (t = (r[1] || "") + r[3], Number(t)) : e : Number(t);
			}
			return e;
		}(e, n, t);
		{
			let r = ki.exec(n);
			if (r) {
				let i = r[1] || "", a = r[2], o = function(e) {
					if (e && e.indexOf(".") !== -1) {
						let t = e.length;
						for (; t > 0 && e.charCodeAt(t - 1) === 48;) t--;
						return (e = e.slice(0, t)) === "." ? e = "0" : e[0] === "." ? e = "0" + e : e[e.length - 1] === "." && (e = e.substring(0, e.length - 1)), e;
					}
					return e;
				}(r[3]), s = i ? e[a.length + 1] === "." : e[a.length] === ".";
				if (!t.leadingZeros && (a.length > 1 || a.length === 1 && !s)) return e;
				{
					let r = Number(n), s = String(r);
					if (r === 0) return r;
					if (s.search(/[eE]/) !== -1) return t.eNotation ? r : e;
					if (n.indexOf(".") !== -1) return s === "0" || s === o || s === `${i}${o}` ? r : e;
					let c = a ? o : n;
					return a ? c === s || i + c === s ? r : e : c === s || c === i + s ? r : e;
				}
			}
			return e;
		}
	}
	return function(e, t, n) {
		let r = t === 1 / 0;
		switch (n.infinity.toLowerCase()) {
			case "null": return null;
			case "infinity": return t;
			case "string": return r ? "Infinity" : "-Infinity";
			default: return e;
		}
	}(e, Number(n), t);
}
var Mi = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
function Ni(e, t) {
	let n = e.trim();
	if (t !== 2 && t !== 8 || (e = n.substring(2)), parseInt) return parseInt(e, t);
	if (Number.parseInt) return Number.parseInt(e, t);
	if (window && window.parseInt) return window.parseInt(e, t);
	throw Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
var Pi = class {
	constructor(e) {
		this._matcher = e;
	}
	get separator() {
		return this._matcher.separator;
	}
	getCurrentTag() {
		let e = this._matcher.path;
		return e.length > 0 ? e[e.length - 1].tag : void 0;
	}
	getCurrentNamespace() {
		let e = this._matcher.path;
		return e.length > 0 ? e[e.length - 1].namespace : void 0;
	}
	getAttrValue(e) {
		let t = this._matcher.path;
		if (t.length !== 0) return t[t.length - 1].values?.[e];
	}
	hasAttr(e) {
		let t = this._matcher.path;
		if (t.length === 0) return !1;
		let n = t[t.length - 1];
		return n.values !== void 0 && e in n.values;
	}
	getAnyParentAttr(e) {
		return this._matcher.getAnyParentAttr(e);
	}
	hasAnyParentAttr(e) {
		return this._matcher.hasAnyParentAttr(e);
	}
	getPosition() {
		let e = this._matcher.path;
		return e.length === 0 ? -1 : e[e.length - 1].position ?? 0;
	}
	getCounter() {
		let e = this._matcher.path;
		return e.length === 0 ? -1 : e[e.length - 1].counter ?? 0;
	}
	getIndex() {
		return this.getPosition();
	}
	getDepth() {
		return this._matcher.path.length;
	}
	toString(e, t = !0) {
		return this._matcher.toString(e, t);
	}
	toArray() {
		return this._matcher.path.map(((e) => e.tag));
	}
	matches(e) {
		return this._matcher.matches(e);
	}
	matchesAny(e) {
		return e.matchesAny(this._matcher);
	}
}, Fi = class {
	constructor(e = {}) {
		this.separator = e.separator || ".", this.path = [], this.siblingStacks = [], this._pathStringCache = null, this._view = new Pi(this), this._keptAttrs = [];
	}
	push(e, t = null, n = null, r = null) {
		this._pathStringCache = null, this.path.length > 0 && (this.path[this.path.length - 1].values = void 0);
		let i = this.path.length, a = this.siblingStacks[i];
		a || (a = {
			counts: /* @__PURE__ */ new Map(),
			total: 0
		}, this.siblingStacks[i] = a);
		let o = n ? `${n}:${e}` : e, s = a.counts.get(o) || 0, c = a.total;
		a.counts.set(o, s + 1), a.total++;
		let l = {
			tag: e,
			position: c,
			counter: s
		};
		n != null && (l.namespace = n), t != null && (l.values = t), this.path.push(l);
		let u = this.path.length, d = r === null ? null : r.keep;
		if (d != null && d.length > 0 && t) for (let e = 0; e < d.length; e++) {
			let n = d[e];
			t[n] !== void 0 && this._keptAttrs.push({
				depth: u,
				name: n,
				value: t[n]
			});
		}
	}
	pop() {
		if (this.path.length === 0) return;
		this._pathStringCache = null;
		let e = this.path.pop();
		this.siblingStacks.length > this.path.length + 1 && (this.siblingStacks.length = this.path.length + 1);
		let t = this.path.length + 1;
		for (; this._keptAttrs.length > 0 && this._keptAttrs[this._keptAttrs.length - 1].depth >= t;) this._keptAttrs.pop();
		return e;
	}
	updateCurrent(e) {
		if (this.path.length > 0) {
			let t = this.path[this.path.length - 1];
			e != null && (t.values = e);
		}
	}
	getCurrentTag() {
		return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
	}
	getCurrentNamespace() {
		return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
	}
	getAttrValue(e) {
		if (this.path.length !== 0) return this.path[this.path.length - 1].values?.[e];
	}
	hasAttr(e) {
		if (this.path.length === 0) return !1;
		let t = this.path[this.path.length - 1];
		return t.values !== void 0 && e in t.values;
	}
	getAnyParentAttr(e) {
		let t = this._keptAttrs;
		for (let n = t.length - 1; n >= 0; n--) if (t[n].name === e) return t[n].value;
	}
	hasAnyParentAttr(e) {
		let t = this._keptAttrs;
		for (let n = t.length - 1; n >= 0; n--) if (t[n].name === e) return !0;
		return !1;
	}
	getPosition() {
		return this.path.length === 0 ? -1 : this.path[this.path.length - 1].position ?? 0;
	}
	getCounter() {
		return this.path.length === 0 ? -1 : this.path[this.path.length - 1].counter ?? 0;
	}
	getIndex() {
		return this.getPosition();
	}
	getDepth() {
		return this.path.length;
	}
	toString(e, t = !0) {
		let n = e || this.separator;
		if (n === this.separator && !0 === t) {
			if (this._pathStringCache !== null) return this._pathStringCache;
			let e = this.path.map(((e) => e.namespace ? `${e.namespace}:${e.tag}` : e.tag)).join(n);
			return this._pathStringCache = e, e;
		}
		return this.path.map(((e) => t && e.namespace ? `${e.namespace}:${e.tag}` : e.tag)).join(n);
	}
	toArray() {
		return this.path.map(((e) => e.tag));
	}
	reset() {
		this._pathStringCache = null, this.path = [], this.siblingStacks = [], this._keptAttrs = [];
	}
	matches(e) {
		let t = e.segments;
		return t.length !== 0 && (e.hasDeepWildcard() ? this._matchWithDeepWildcard(t) : this._matchSimple(t));
	}
	_matchSimple(e) {
		if (this.path.length !== e.length) return !1;
		for (let t = 0; t < e.length; t++) if (!this._matchSegment(e[t], this.path[t], t === this.path.length - 1)) return !1;
		return !0;
	}
	_matchWithDeepWildcard(e) {
		let t = this.path.length - 1, n = e.length - 1;
		for (; n >= 0 && t >= 0;) {
			let r = e[n];
			if (r.type === "deep-wildcard") {
				if (n--, n < 0) return !0;
				let r = e[n], i = !1;
				for (let e = t; e >= 0; e--) if (this._matchSegment(r, this.path[e], e === this.path.length - 1)) {
					t = e - 1, n--, i = !0;
					break;
				}
				if (!i) return !1;
			} else {
				if (!this._matchSegment(r, this.path[t], t === this.path.length - 1)) return !1;
				t--, n--;
			}
		}
		return n < 0;
	}
	_matchSegment(e, t, n) {
		if (e.tag !== "*" && e.tag !== t.tag || e.namespace !== void 0 && e.namespace !== "*" && e.namespace !== t.namespace || e.attrName !== void 0 && (!n || !t.values || !(e.attrName in t.values) || e.attrValue !== void 0 && String(t.values[e.attrName]) !== String(e.attrValue))) return !1;
		if (e.position !== void 0) {
			if (!n) return !1;
			let r = t.counter ?? 0;
			if (e.position === "first" && r !== 0 || e.position === "odd" && r % 2 != 1 || e.position === "even" && r % 2 != 0 || e.position === "nth" && r !== e.positionValue) return !1;
		}
		return !0;
	}
	matchesAny(e) {
		return e.matchesAny(this);
	}
	snapshot() {
		return {
			path: this.path.map(((e) => ({ ...e }))),
			siblingStacks: this.siblingStacks.map(((e) => e && {
				counts: new Map(e.counts),
				total: e.total
			})),
			keptAttrs: this._keptAttrs.map(((e) => ({ ...e })))
		};
	}
	restore(e) {
		this._pathStringCache = null, this.path = e.path.map(((e) => ({ ...e }))), this.siblingStacks = e.siblingStacks.map(((e) => e && {
			counts: new Map(e.counts),
			total: e.total
		})), this._keptAttrs = (e.keptAttrs || []).map(((e) => ({ ...e })));
	}
	readOnly() {
		return this._view;
	}
}, Ii = class {
	constructor(e, t = {}, n) {
		this.pattern = e, this.separator = t.separator || ".", this.segments = this._parse(e), this.data = n, this._hasDeepWildcard = this.segments.some(((e) => e.type === "deep-wildcard")), this._hasAttributeCondition = this.segments.some(((e) => e.attrName !== void 0)), this._hasPositionSelector = this.segments.some(((e) => e.position !== void 0));
	}
	_parse(e) {
		let t = [], n = 0, r = "";
		for (; n < e.length;) e[n] === this.separator ? n + 1 < e.length && e[n + 1] === this.separator ? (r.trim() && (t.push(this._parseSegment(r.trim())), r = ""), t.push({ type: "deep-wildcard" }), n += 2) : (r.trim() && t.push(this._parseSegment(r.trim())), r = "", n++) : (r += e[n], n++);
		return r.trim() && t.push(this._parseSegment(r.trim())), t;
	}
	_parseSegment(e) {
		let t = { type: "tag" }, n = null, r = e, i = e.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
		if (i && (r = i[1] + i[3], i[2])) {
			let e = i[2].slice(1, -1);
			e && (n = e);
		}
		let a, o, s = r;
		if (r.includes("::")) {
			let t = r.indexOf("::");
			if (a = r.substring(0, t).trim(), s = r.substring(t + 2).trim(), !a) throw Error(`Invalid namespace in pattern: ${e}`);
		}
		let c = null;
		if (s.includes(":")) {
			let e = s.lastIndexOf(":"), t = s.substring(0, e).trim(), n = s.substring(e + 1).trim();
			[
				"first",
				"last",
				"odd",
				"even"
			].includes(n) || /^nth\(\d+\)$/.test(n) ? (o = t, c = n) : o = s;
		} else o = s;
		if (!o) throw Error(`Invalid segment pattern: ${e}`);
		if (t.tag = o, a && (t.namespace = a), n) {
			if (n.includes("=")) {
				let e = n.indexOf("=");
				t.attrName = n.substring(0, e).trim(), t.attrValue = n.substring(e + 1).trim();
			} else t.attrName = n.trim();
		}
		if (c) {
			let e = c.match(/^nth\((\d+)\)$/);
			e ? (t.position = "nth", t.positionValue = parseInt(e[1], 10)) : t.position = c;
		}
		return t;
	}
	get length() {
		return this.segments.length;
	}
	hasDeepWildcard() {
		return this._hasDeepWildcard;
	}
	hasAttributeCondition() {
		return this._hasAttributeCondition;
	}
	hasPositionSelector() {
		return this._hasPositionSelector;
	}
	toString() {
		return this.pattern;
	}
}, Li = class {
	constructor() {
		this._byDepthAndTag = /* @__PURE__ */ new Map(), this._wildcardByDepth = /* @__PURE__ */ new Map(), this._deepWildcards = [], this._deepByTerminalTag = /* @__PURE__ */ new Map(), this._patterns = /* @__PURE__ */ new Set(), this._sealed = !1;
	}
	add(e) {
		if (this._sealed) throw TypeError("ExpressionSet is sealed. Create a new ExpressionSet to add more expressions.");
		if (this._patterns.has(e.pattern)) return this;
		if (this._patterns.add(e.pattern), e.hasDeepWildcard()) {
			let t = e.segments[e.segments.length - 1];
			if (t && t.type !== "deep-wildcard" && t.tag !== "*") {
				let n = t.tag;
				this._deepByTerminalTag.has(n) || this._deepByTerminalTag.set(n, []), this._deepByTerminalTag.get(n).push(e);
			} else this._deepWildcards.push(e);
			return this;
		}
		let t = e.length, n = e.segments[e.segments.length - 1]?.tag;
		if (n && n !== "*") {
			let r = `${t}:${n}`;
			this._byDepthAndTag.has(r) || this._byDepthAndTag.set(r, []), this._byDepthAndTag.get(r).push(e);
		} else this._wildcardByDepth.has(t) || this._wildcardByDepth.set(t, []), this._wildcardByDepth.get(t).push(e);
		return this;
	}
	addAll(e) {
		for (let t of e) this.add(t);
		return this;
	}
	has(e) {
		return this._patterns.has(e.pattern);
	}
	get size() {
		return this._patterns.size;
	}
	seal() {
		return this._sealed = !0, this;
	}
	get isSealed() {
		return this._sealed;
	}
	matchesAny(e) {
		return this.findMatch(e) !== null;
	}
	findMatch(e) {
		let t = e.getDepth(), n = e.getCurrentTag(), r = `${t}:${n}`, i = this._byDepthAndTag.get(r);
		if (i) {
			for (let t = 0; t < i.length; t++) if (e.matches(i[t])) return i[t];
		}
		let a = this._wildcardByDepth.get(t);
		if (a) {
			for (let t = 0; t < a.length; t++) if (e.matches(a[t])) return a[t];
		}
		let o = this._deepByTerminalTag.get(n);
		if (o) {
			for (let t = 0; t < o.length; t++) if (e.matches(o[t])) return o[t];
		}
		for (let t = 0; t < this._deepWildcards.length; t++) if (e.matches(this._deepWildcards[t])) return this._deepWildcards[t];
		return null;
	}
}, Ri = {
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	euro: "€",
	dollar: "$",
	fnof: "ƒ",
	inr: "₹",
	af: "؋",
	birr: "ብር",
	peso: "₱",
	rub: "₽",
	won: "₩",
	yuan: "¥",
	cedil: "¸"
}, zi = {
	amp: "&",
	apos: "'",
	gt: ">",
	lt: "<",
	quot: "\""
}, Bi = {
	nbsp: "\xA0",
	copy: "©",
	reg: "®",
	trade: "™",
	mdash: "—",
	ndash: "–",
	hellip: "…",
	laquo: "«",
	raquo: "»",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”",
	bull: "•",
	para: "¶",
	sect: "§",
	deg: "°",
	frac12: "½",
	frac14: "¼",
	frac34: "¾"
}, Vi = Object.freeze({
	ALLOW: "allow",
	BLOCK: "block",
	THROW: "throw"
}), Hi = /* @__PURE__ */ new Set("!?\\\\/[]$%{}^&*()<>|+");
function Ui(e) {
	if (e[0] === "#") throw Error(`[EntityReplacer] Invalid character '#' in entity name: "${e}"`);
	for (let t of e) if (Hi.has(t)) throw Error(`[EntityReplacer] Invalid character '${t}' in entity name: "${e}"`);
	return e;
}
function Wi(...e) {
	let t = Object.create(null);
	for (let n of e) if (n) for (let e of Object.keys(n)) {
		let r = n[e];
		if (typeof r == "string") t[e] = r;
		else if (r && typeof r == "object" && r.val !== void 0) {
			let n = r.val;
			typeof n == "string" && (t[e] = n);
		}
	}
	return t;
}
var Gi = "external", Ki = "base", qi = "all", J = Object.freeze({
	allow: 0,
	leave: 1,
	remove: 2,
	throw: 3
}), Ji = /* @__PURE__ */ new Set([
	9,
	10,
	13
]), Yi = class {
	constructor(e = {}) {
		var t;
		this._limit = e.limit || {}, this._maxTotalExpansions = this._limit.maxTotalExpansions || 0, this._maxExpandedLength = this._limit.maxExpandedLength || 0, this._postCheck = typeof e.postCheck == "function" ? e.postCheck : (e) => e, this._limitTiers = (t = this._limit.applyLimitsTo ?? Gi) && t !== Gi ? t === qi ? /* @__PURE__ */ new Set([qi]) : t === Ki ? /* @__PURE__ */ new Set([Ki]) : Array.isArray(t) ? new Set(t) : /* @__PURE__ */ new Set([Gi]) : /* @__PURE__ */ new Set([Gi]), this._numericAllowed = e.numericAllowed ?? !0, this._baseMap = Wi(zi, e.namedEntities || null), this._externalMap = Object.create(null), this._inputMap = Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this._removeSet = new Set(e.remove && Array.isArray(e.remove) ? e.remove : []), this._leaveSet = new Set(e.leave && Array.isArray(e.leave) ? e.leave : []);
		let n = function(e) {
			if (!e) return {
				xmlVersion: 1,
				onLevel: J.allow,
				nullLevel: J.remove
			};
			let t = e.xmlVersion === 1.1 ? 1.1 : 1, n = J[e.onNCR] ?? J.allow, r = J[e.nullNCR] ?? J.remove;
			return {
				xmlVersion: t,
				onLevel: n,
				nullLevel: Math.max(r, J.remove)
			};
		}(e.ncr);
		this._ncrXmlVersion = n.xmlVersion, this._ncrOnLevel = n.onLevel, this._ncrNullLevel = n.nullLevel, this._onExternalEntity = typeof e.onExternalEntity == "function" ? e.onExternalEntity : null, this._onInputEntity = typeof e.onInputEntity == "function" ? e.onInputEntity : null;
	}
	_applyRegistrationHook(e, t, n, r) {
		if (!e) return !0;
		let i = e(t, n);
		if (i === Vi.BLOCK) return !1;
		if (i === Vi.THROW) throw Error(`[EntityDecoder] Registration of ${r} entity "&${t};" was rejected by hook`);
		return !0;
	}
	setExternalEntities(e) {
		if (e) for (let t of Object.keys(e)) Ui(t);
		if (!this._onExternalEntity) return void (this._externalMap = Wi(e));
		let t = Wi(e), n = Object.create(null);
		for (let [e, r] of Object.entries(t)) this._applyRegistrationHook(this._onExternalEntity, e, r, "external") && (n[e] = r);
		this._externalMap = n;
	}
	addExternalEntity(e, t) {
		Ui(e), typeof t == "string" && t.indexOf("&") === -1 && this._applyRegistrationHook(this._onExternalEntity, e, t, "external") && (this._externalMap[e] = t);
	}
	addInputEntities(e) {
		if (this._totalExpansions = 0, this._expandedLength = 0, !this._onInputEntity) return void (this._inputMap = Wi(e));
		let t = Wi(e), n = Object.create(null);
		for (let [e, r] of Object.entries(t)) this._applyRegistrationHook(this._onInputEntity, e, r, "input") && (n[e] = r);
		this._inputMap = n;
	}
	reset() {
		return this._inputMap = Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this;
	}
	setXmlVersion(e) {
		this._ncrXmlVersion = e === 1.1 ? 1.1 : 1;
	}
	decode(e) {
		if (typeof e != "string" || e.length === 0 || e.indexOf("&") === -1) return e;
		let t = e, n = [], r = e.length, i = 0, a = 0, o = this._maxTotalExpansions > 0, s = this._maxExpandedLength > 0, c = o || s;
		for (; a < r;) {
			if (e.charCodeAt(a) !== 38) {
				a++;
				continue;
			}
			let t = a + 1;
			for (; t < r && e.charCodeAt(t) !== 59 && t - a <= 32;) t++;
			if (t >= r || e.charCodeAt(t) !== 59) {
				a++;
				continue;
			}
			let l = e.slice(a + 1, t);
			if (l.length === 0) {
				a++;
				continue;
			}
			let u, d;
			if (this._removeSet.has(l)) u = "", d === void 0 && (d = Gi);
			else {
				if (this._leaveSet.has(l)) {
					a++;
					continue;
				}
				if (l.charCodeAt(0) === 35) {
					let e = this._resolveNCR(l);
					if (e === void 0) {
						a++;
						continue;
					}
					u = e, d = Ki;
				} else {
					let e = this._resolveName(l);
					u = e?.value, d = e?.tier;
				}
			}
			if (u !== void 0) {
				if (a > i && n.push(e.slice(i, a)), n.push(u), i = t + 1, a = i, c && this._tierCounts(d)) {
					if (o && (this._totalExpansions++, this._totalExpansions > this._maxTotalExpansions)) throw Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
					if (s) {
						let e = u.length - (l.length + 2);
						if (e > 0 && (this._expandedLength += e, this._expandedLength > this._maxExpandedLength)) throw Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
					}
				}
			} else a++;
		}
		i < r && n.push(e.slice(i));
		let l = n.length === 0 ? e : n.join("");
		return this._postCheck(l, t);
	}
	_tierCounts(e) {
		return !!this._limitTiers.has(qi) || this._limitTiers.has(e);
	}
	_resolveName(e) {
		return e in this._inputMap ? {
			value: this._inputMap[e],
			tier: Gi
		} : e in this._externalMap ? {
			value: this._externalMap[e],
			tier: Gi
		} : e in this._baseMap ? {
			value: this._baseMap[e],
			tier: Ki
		} : void 0;
	}
	_classifyNCR(e) {
		return e === 0 ? this._ncrNullLevel : e >= 55296 && e <= 57343 || this._ncrXmlVersion === 1 && e >= 1 && e <= 31 && !Ji.has(e) ? J.remove : -1;
	}
	_applyNCRAction(e, t, n) {
		switch (e) {
			case J.allow: return String.fromCodePoint(n);
			case J.remove: return "";
			case J.leave: return;
			case J.throw: throw Error(`[EntityDecoder] Prohibited numeric character reference &${t}; (U+${n.toString(16).toUpperCase().padStart(4, "0")})`);
			default: return String.fromCodePoint(n);
		}
	}
	_resolveNCR(e) {
		let t = e.charCodeAt(1), n;
		if (n = t === 120 || t === 88 ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), Number.isNaN(n) || n < 0 || n > 1114111) return;
		let r = this._classifyNCR(n);
		if (!this._numericAllowed && r < J.remove) return;
		let i = r === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, r);
		return this._applyNCRAction(i, e, n);
	}
}, Xi = [
	{
		id: "sql-block-comment-open",
		description: "SQL block comment open: /* ... */ — unusual in legitimate user text",
		pattern: /\/\*/
	},
	{
		id: "sql-union-select",
		description: "UNION SELECT — most common SQL injection aggregation attack",
		pattern: /\bUNION\s{1,20}(?:ALL\s{1,20})?SELECT\b/i
	},
	{
		id: "sql-drop-table",
		description: "DROP TABLE — destructive DDL injection",
		pattern: /\bDROP\s{1,20}TABLE\b/i
	},
	{
		id: "sql-drop-database",
		description: "DROP DATABASE — destructive DDL injection",
		pattern: /\bDROP\s{1,20}DATABASE\b/i
	},
	{
		id: "sql-insert-into",
		description: "INSERT INTO — data injection",
		pattern: /\bINSERT\s{1,20}INTO\b/i
	},
	{
		id: "sql-delete-from",
		description: "DELETE FROM — data deletion injection",
		pattern: /\bDELETE\s{1,20}FROM\b/i
	},
	{
		id: "sql-update-set",
		description: "UPDATE ... SET — data modification injection",
		pattern: /\bUPDATE\b[\s\S]{1,60}\bSET\b/i
	},
	{
		id: "sql-exec-xp",
		description: "EXEC xp_ — MSSQL extended stored procedure execution",
		pattern: /\bEXEC(?:UTE)?\s{1,20}xp_/i
	},
	{
		id: "sql-tautology-string",
		description: "Classic string tautology: ' OR '1'='1 or \" OR \"1\"=\"1\"",
		pattern: /'\s{0,10}OR\s{0,10}'[^']{0,20}'\s*=\s*'[^']{0,20}/i
	},
	{
		id: "sql-tautology-numeric",
		description: "Numeric tautology: OR 1=1",
		pattern: /\bOR\s{1,10}1\s*=\s*1\b/i
	},
	{
		id: "sql-always-true-zero",
		description: "Numeric tautology: OR 0=0",
		pattern: /\bOR\s{1,10}0\s*=\s*0\b/i
	},
	{
		id: "sql-sleep-benchmark",
		description: "Time-based blind injection: SLEEP() or BENCHMARK()",
		pattern: /\b(?:SLEEP|BENCHMARK)\s*\(/i
	},
	{
		id: "sql-waitfor-delay",
		description: "MSSQL time-based blind injection: WAITFOR DELAY",
		pattern: /\bWAITFOR\s{1,20}DELAY\b/i
	},
	{
		id: "sql-char-function",
		description: "CHAR() function — used to obfuscate injected strings",
		pattern: /\bCHAR\s*\(\s*\d{1,3}/i
	},
	{
		id: "sql-information-schema",
		description: "INFORMATION_SCHEMA — reconnaissance query for table/column enumeration",
		pattern: /\bINFORMATION_SCHEMA\b/i
	}
], Zi = [
	...Xi,
	{
		id: "sql-line-comment",
		description: "SQL line comment: -- followed by whitespace or end of string",
		pattern: /--(?:\s|$)/
	},
	{
		id: "sql-stacked-query",
		description: "Stacked queries: semicolon immediately followed by a SQL keyword",
		pattern: /;\s{0,10}(?:SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC)\b/i
	},
	{
		id: "sql-hex-encoding",
		description: "Hex-encoded string injection: 0x41414141 style (MySQL)",
		pattern: /\b0x[0-9a-f]{4,}/i
	}
], Qi = [
	{
		id: "html-script-open",
		description: "<script opening tag",
		pattern: /<script[\s>/]/i
	},
	{
		id: "html-script-close",
		description: "<\/script closing tag",
		pattern: /<\/script[\s>]/i
	},
	{
		id: "html-javascript-protocol",
		description: "javascript: URI scheme (with optional whitespace/encoding)",
		pattern: /j[\t\n\r ]*a[\t\n\r ]*v[\t\n\r ]*a[\t\n\r ]*s[\t\n\r ]*c[\t\n\r ]*r[\t\n\r ]*i[\t\n\r ]*p[\t\n\r ]*t[\t\n\r ]*:/i
	},
	{
		id: "html-vbscript-protocol",
		description: "vbscript: URI scheme",
		pattern: /vbscript[\t\n\r ]*:/i
	},
	{
		id: "html-data-html",
		description: "data:text/html URI — can execute scripts in browsers",
		pattern: /data[\t\n\r ]*:[\t\n\r ]*text\/html/i
	},
	{
		id: "html-data-xhtml",
		description: "data:application/xhtml+xml URI",
		pattern: /data[\t\n\r ]*:[\t\n\r ]*application\/xhtml/i
	},
	{
		id: "html-data-svg",
		description: "data:image/svg+xml URI — can execute scripts",
		pattern: /data[\t\n\r ]*:[\t\n\r ]*image\/svg\+xml/i
	},
	{
		id: "html-inline-event-handler",
		description: "Inline event handler attributes: onclick=, onerror=, onload=, etc.",
		pattern: /\bon\w{1,30}\s*=/i
	},
	{
		id: "html-entity-obfuscated-script",
		description: "HTML-entity-encoded <script (e.g. &#x3C;script or &lt;script)",
		pattern: /(?:&#x0*3[Cc];?|&#0*60;?|&lt;)\s*script/i
	},
	{
		id: "html-entity-obfuscated-javascript",
		description: "HTML-entity-encoded javascript: (partial — catches common &#106; or &#x6a; for \"j\")",
		pattern: /(?:&#x0*6[Aa];?|&#0*106;?)\s*(?:&#x0*61;?|a)[\s\S]{0,80}script\s*:/i
	},
	{
		id: "html-style-expression",
		description: "CSS expression() — IE-era code execution in style attributes",
		pattern: /style[\s\S]{0,20}expression\s*\(/i
	},
	{
		id: "html-object-embed",
		description: "<object or <embed tags that can load active content",
		pattern: /<(?:object|embed)[\s>/]/i
	},
	{
		id: "html-base-tag",
		description: "<base href= — can hijack all relative URLs on a page",
		pattern: /<base[\s>]/i
	},
	{
		id: "html-meta-refresh",
		description: "<meta http-equiv=\"refresh\" — can redirect users",
		pattern: /<meta[\s\S]{0,40}http-equiv[\s\S]{0,20}refresh/i
	},
	{
		id: "html-srcdoc",
		description: "srcdoc= attribute on iframes — embeds HTML that can run scripts",
		pattern: /srcdoc\s*=/i
	},
	{
		id: "html-iframe",
		description: "<iframe tag",
		pattern: /<iframe[\s>/]/i
	},
	{
		id: "html-form",
		description: "<form tag — can be used for phishing / credential harvesting injection",
		pattern: /<form[\s>/]/i
	}
], $i = [
	{
		id: "xml-cdata-injection",
		description: "CDATA section injection: <![CDATA[ breaks out of text node context",
		pattern: /<!\[CDATA\[/i
	},
	{
		id: "xml-cdata-close",
		description: "CDATA close sequence: ]]> can terminate an enclosing CDATA section",
		pattern: /\]\]>/
	},
	{
		id: "xml-processing-instruction",
		description: "XML processing instruction: <?xml-stylesheet or <?php etc.",
		pattern: /<\?(?:xml[\- ]|php|asp)/i
	},
	{
		id: "xml-doctype-injection",
		description: "DOCTYPE declaration embedded in content — can define entities",
		pattern: /<!DOCTYPE(?:[\s[]|$)/i
	},
	{
		id: "xml-entity-system",
		description: "SYSTEM keyword — used in external entity declarations (XXE)",
		pattern: /\bSYSTEM\s+["']/i
	},
	{
		id: "xml-entity-public",
		description: "PUBLIC keyword — used in external entity declarations (XXE)",
		pattern: /\bPUBLIC\s+["']/i
	},
	{
		id: "xml-entity-declaration",
		description: "<!ENTITY declaration — defines entities, potential XXE or entity expansion",
		pattern: /<!ENTITY[\s%]/i
	},
	{
		id: "xml-billion-laughs",
		description: "Entity reference chaining / billion laughs: repeated &eX; style references",
		pattern: /(?:&\w{1,20};){3,}/
	},
	{
		id: "xml-namespace-confusion",
		description: "xmlns: attribute injection — can redefine namespaces to confuse parsers",
		pattern: /\bxmlns(?::\w{1,40})?\s*=/i
	},
	{
		id: "xml-comment-injection",
		description: "<!-- comment injection — can hide content from some parsers",
		pattern: /<!--/
	},
	{
		id: "xml-comment-close",
		description: "--> closes an enclosing XML comment",
		pattern: /-->/
	},
	{
		id: "xml-pi-close",
		description: "?> closes an enclosing processing instruction",
		pattern: /\?>/
	}
], ea = [
	{
		id: "svg-script-element",
		description: "<script element inside SVG executes JavaScript",
		pattern: /<script[\s>/]/i
	},
	{
		id: "svg-xlink-href-javascript",
		description: "xlink:href with javascript: — classic SVG XSS via <a> or <use>",
		pattern: /xlink\s*:\s*href\s*=\s*["']?\s*javascript\s*:/i
	},
	{
		id: "svg-href-javascript",
		description: "href= with javascript: in SVG context (<a>, <animate>, etc.)",
		pattern: /href\s*=\s*["']?\s*javascript\s*:/i
	},
	{
		id: "svg-foreignobject",
		description: "<foreignObject embeds HTML inside SVG — can execute scripts",
		pattern: /<foreignObject[\s>/]/i
	},
	{
		id: "svg-use-external",
		description: "<use xlink:href or href pointing to external resource (non-fragment URL)",
		pattern: /<use[\s\S]{0,60}(?:xlink\s*:\s*)?href\s*=\s*(?:["'][^#]|[^"'#\s>])/i
	},
	{
		id: "svg-animate-href",
		description: "<animate attributeName=\"href\" — can dynamically change href to javascript:",
		pattern: /<animate[\s\S]{0,80}attributeName\s*=\s*["'][\s]*href["']/i
	},
	{
		id: "svg-animate-xlinkhref",
		description: "<animate attributeName=\"xlink:href\"",
		pattern: /<animate[\s\S]{0,80}attributeName\s*=\s*["'][\s]*xlink\s*:\s*href["']/i
	},
	{
		id: "svg-set-javascript",
		description: "<set to=\"javascript:...\" — sets an attribute to a javascript: URI",
		pattern: /<set[\s\S]{0,80}to\s*=\s*["']?\s*javascript\s*:/i
	},
	{
		id: "svg-event-handler",
		description: "SVG-specific event handler attributes: onload=, onerror=, onactivate=, etc.",
		pattern: /\bon(?:load|error|activate|begin|end|repeat|focus|blur|click|mouse\w{1,20}|key\w{1,20})\s*=/i
	},
	{
		id: "svg-handler-generic",
		description: "Generic on* handler catch-all for SVG attributes",
		pattern: /\bon\w{1,30}\s*=/i
	},
	{
		id: "svg-filter-feimage",
		description: "<feImage href= — filter primitive that can load external resources",
		pattern: /<feImage[\s\S]{0,80}(?:xlink\s*:\s*)?href\s*=/i
	},
	{
		id: "svg-image-external",
		description: "<image xlink:href with http/https or javascript protocol",
		pattern: /<image[\s\S]{0,80}(?:xlink\s*:\s*)?href\s*=\s*["']?\s*(?:https?|javascript)\s*:/i
	},
	{
		id: "svg-style-javascript",
		description: "style= attribute containing javascript: (e.g. background:url(javascript:...))",
		pattern: /style\s*=[\s\S]{0,60}javascript\s*:/i
	}
], ta = [
	{
		id: "shell-path-traversal-unix",
		description: "Unix path traversal: ../  — climbing the directory tree",
		pattern: /\.\.\//
	},
	{
		id: "shell-path-traversal-windows",
		description: "Windows path traversal: ..\\ — climbing the directory tree",
		pattern: /\.\.\\/
	},
	{
		id: "shell-path-traversal-encoded",
		description: "URL-encoded path traversal: %2e%2e or %2f variants",
		pattern: /%2e%2e|%2f\.\.|\.\.%2f/i
	},
	{
		id: "shell-null-byte",
		description: "Null byte injection: \\x00 or %00 — truncates strings in C-backed functions",
		pattern: /\x00|%00/
	},
	{
		id: "shell-semicolon",
		description: "Semicolon command separator: cmd1; cmd2",
		pattern: /;/
	},
	{
		id: "shell-pipe",
		description: "Pipe operator: cmd1 | cmd2",
		pattern: /\|/
	},
	{
		id: "shell-and-operator",
		description: "AND operator: cmd1 && cmd2",
		pattern: /&&/
	},
	{
		id: "shell-or-operator",
		description: "OR operator: cmd1 || cmd2",
		pattern: /\|\|/
	},
	{
		id: "shell-backtick",
		description: "Backtick command substitution: `cmd`",
		pattern: /`/
	},
	{
		id: "shell-dollar-paren",
		description: "Dollar-paren command substitution: $(cmd)",
		pattern: /\$\(/
	},
	{
		id: "shell-dollar-brace",
		description: "Dollar-brace variable expansion: ${var} — can be abused for injection",
		pattern: /\$\{/
	},
	{
		id: "shell-redirect-out",
		description: "Output redirection: cmd > file or cmd >> file",
		pattern: />{1,2}/
	},
	{
		id: "shell-redirect-in",
		description: "Input redirection: cmd < file",
		pattern: /</
	},
	{
		id: "shell-newline-injection",
		description: "Newline injection: \\n or \\r — can inject new shell commands",
		pattern: /[\n\r]/
	},
	{
		id: "shell-glob-star",
		description: "Glob expansion: * or ? — can expand to unintended files",
		pattern: /[/\\][*?]/
	},
	{
		id: "shell-absolute-root",
		description: "Absolute root path injection: string starting with / or \\ (Windows UNC)",
		pattern: /^(?:\/|\\\\)/
	},
	{
		id: "shell-windows-drive",
		description: "Windows drive letter path injection: C:\\ or D:/",
		pattern: /^[a-zA-Z]:[/\\]/
	},
	{
		id: "shell-curl-wget",
		description: "curl/wget with URL or flags — can exfiltrate data or download payloads",
		pattern: /\b(?:curl|wget)\s+(?:https?:\/\/|ftp:\/\/|-)/i
	}
], na = [
	{
		id: "redos-nested-quantifier-plus",
		description: "Nested + quantifier inside a group with outer quantifier: (a+)+, (.+b)*, etc.",
		pattern: /\([^)]*\+[^)]*\)[+*]/
	},
	{
		id: "redos-nested-quantifier-star",
		description: "Nested * quantifier: (a*)* or (a*)+ — catastrophic backtracking",
		pattern: /\([^)]*\*[^)]*\)[*+]/
	},
	{
		id: "redos-nested-groups",
		description: "Doubly nested quantified groups: ((a+)+) — guaranteed catastrophic",
		pattern: /\(\([^)]{0,40}\)[+*]\)[+*]/
	},
	{
		id: "redos-alternation-overlap",
		description: "Overlapping alternation under quantifier: (a|a)+ — ambiguous NFA paths",
		pattern: /\(([^|()]{1,20})\|(?:\1)(?:\|[^|()]{1,20}){0,5}\)[+*?]{1,2}/
	},
	{
		id: "redos-star-plus-concat",
		description: "(x*x)+ pattern — triggers super-linear backtracking",
		pattern: /\([^)]{0,10}\*[^)]{0,10}\)[+*]/
	},
	{
		id: "redos-dot-star-greedy",
		description: "(.*){n,} or (.+){n,} — repeated greedy dot quantifiers",
		pattern: /\(\.[*+]\)\{?\d/
	},
	{
		id: "redos-large-repetition",
		description: "Very large fixed or range repetition count {1000,} or {1000,n} — denial of service via backtracking",
		pattern: /\{\d{4,}(?:,\d*)?\}/
	},
	{
		id: "redos-catastrophic-alternation",
		description: "Long alternation with many similar branches — polynomial backtracking risk",
		pattern: /\([^)]{0,200}(?:\|[^|)]{0,50}){9,}\)/
	}
], Y = "[\"'\\s]*:", ra = [
	{
		id: "nosql-where-operator",
		description: "$where — executes arbitrary JavaScript server-side in MongoDB",
		pattern: RegExp(`\\$where${Y}`, "i")
	},
	{
		id: "nosql-ne-operator",
		description: "$ne — \"not equal\" operator used to bypass equality checks",
		pattern: RegExp(`\\$ne${Y}`, "i")
	},
	{
		id: "nosql-gt-operator",
		description: "$gt — \"greater than\" used to bypass password/value checks",
		pattern: RegExp(`\\$gte?${Y}`, "i")
	},
	{
		id: "nosql-lt-operator",
		description: "$lt / $lte — \"less than\" bypass variants",
		pattern: RegExp(`\\$lte?${Y}`, "i")
	},
	{
		id: "nosql-regex-operator",
		description: "$regex — can be used to extract data character by character (blind injection)",
		pattern: RegExp(`\\$regex${Y}`, "i")
	},
	{
		id: "nosql-or-operator",
		description: "$or — logical OR; used to create always-true conditions",
		pattern: RegExp(`\\$or${Y}\\s*\\[`, "i")
	},
	{
		id: "nosql-and-operator",
		description: "$and — logical AND operator injection",
		pattern: RegExp(`\\$and${Y}\\s*\\[`, "i")
	},
	{
		id: "nosql-nor-operator",
		description: "$nor — logical NOR operator injection",
		pattern: RegExp(`\\$nor${Y}\\s*\\[`, "i")
	},
	{
		id: "nosql-exists-operator",
		description: "$exists — can enumerate fields to determine schema",
		pattern: RegExp(`\\$exists${Y}`, "i")
	},
	{
		id: "nosql-in-operator",
		description: "$in — matches any value in a list; can enumerate values",
		pattern: RegExp(`\\$in${Y}\\s*\\[`, "i")
	},
	{
		id: "nosql-expr-operator",
		description: "$expr — allows aggregation expressions in queries (MongoDB 3.6+)",
		pattern: RegExp(`\\$expr${Y}`, "i")
	},
	{
		id: "nosql-function-operator",
		description: "$function — executes arbitrary JavaScript in MongoDB 4.4+",
		pattern: RegExp(`\\$function${Y}`, "i")
	},
	{
		id: "nosql-accumulator-operator",
		description: "$accumulator — custom aggregation with arbitrary JS execution",
		pattern: RegExp(`\\$accumulator${Y}`, "i")
	},
	{
		id: "nosql-proto-pollution",
		description: "__proto__ — prototype pollution via object key injection",
		pattern: /__proto__/
	},
	{
		id: "nosql-constructor-prototype",
		description: "constructor.prototype — alternative prototype pollution vector (dot notation or JSON key)",
		pattern: /constructor[\s"':.,{\[]*prototype/i
	},
	{
		id: "nosql-proto-bracket",
		description: "[\"__proto__\"] — bracket-notation prototype pollution",
		pattern: /\[["']__proto__["']\]/
	}
], ia = [
	{
		id: "log-crlf-injection",
		description: "CRLF injection: literal \\r or \\n embeds fake log lines",
		pattern: /[\r\n]/
	},
	{
		id: "log-url-encoded-crlf",
		description: "URL-encoded CRLF: %0d, %0a, %0D, %0A — decoded by some log parsers",
		pattern: /%0[dDaA]/
	},
	{
		id: "log-unicode-newline",
		description: "Unicode newline variants: U+2028 (line separator), U+2029 (paragraph separator)",
		pattern: /[\u2028\u2029]/
	},
	{
		id: "log-log4shell-jndi",
		description: "Log4Shell: ${jndi:...} triggers remote code execution in Apache Log4j",
		pattern: /\$\{jndi\s*:/i
	},
	{
		id: "log-log4shell-obfuscated",
		description: "Obfuscated Log4Shell: ${::-j}... lookup-bypass prefix used to evade WAF detection",
		pattern: /\$\{::-/
	},
	{
		id: "log-log4j-lookup",
		description: "Log4j lookup syntax: ${env:...}, ${sys:...}, ${ctx:...} — data exfiltration",
		pattern: /\$\{(?:env|sys|ctx|main|map|sd|web|docker|k8s|spring)\s*:/i
	},
	{
		id: "log-ssti-double-brace",
		description: "SSTI double-brace: {{expression}} — Jinja2, Twig, Handlebars, etc.",
		pattern: /\{\{[\s\S]{0,80}\}\}/
	},
	{
		id: "log-ssti-hash-brace",
		description: "SSTI hash-brace: #{expression} — Thymeleaf, Velocity, Ruby ERB",
		pattern: /#\{[\s\S]{0,80}\}/
	},
	{
		id: "log-ssti-dollar-brace",
		description: "SSTI/EL injection: ${expression with operators or method calls} — JSP EL, Freemarker, SpEL",
		pattern: /\$\{[^}]*(?:\.|\(|\*|\+|\bclass\b|\bruntime\b|\bprocess\b|\bexec\b)[^}]{0,80}\}/i
	},
	{
		id: "log-ssti-percent-tag",
		description: "SSTI ERB/ASP tag: <%= expression %> — Ruby ERB, ASP",
		pattern: /<%=[\s\S]{0,80}%>/
	},
	{
		id: "log-null-byte",
		description: "Null byte: \\x00 or %00 — can truncate log entries in C-backed loggers",
		pattern: /\x00|%00/
	},
	{
		id: "log-ansi-escape",
		description: "ANSI escape sequence: ESC[ — can manipulate terminal output when logs are tailed",
		pattern: /\x1b\[/
	}
];
function aa(e, t) {
	let n = t.label ?? "CUSTOM";
	for (let r of t) if (r.pattern.test(e)) return {
		context: n,
		id: r.id,
		description: r.description,
		pattern: r.pattern
	};
	return null;
}
function oa(e, t) {
	(function(e) {
		if (typeof e != "string") throw TypeError("is-unsafe: first argument must be a string, got " + typeof e);
	})(e), function(e) {
		if (!(e instanceof RegExp)) {
			if (!Array.isArray(e)) throw TypeError("is-unsafe: second argument must be a PatternList (e.g. HTML), an array of PatternLists (e.g. [HTML, XML]), or a RegExp. Got: " + typeof e);
			if (e.length === 0) throw TypeError("is-unsafe: context must not be an empty array");
			if (Array.isArray(e[0])) {
				for (let t of e) if (!Array.isArray(t) || t.length === 0) throw TypeError("is-unsafe: each context in the array must be a non-empty pattern array (PatternList)");
			}
		}
	}(t);
	let { lists: n, regex: r } = function(e) {
		return e instanceof RegExp ? {
			lists: null,
			regex: e
		} : Array.isArray(e[0]) ? {
			lists: e,
			regex: null
		} : {
			lists: [e],
			regex: null
		};
	}(t);
	if (r) return r.test(e);
	for (let t of n) if (aa(e, t) !== null) return !0;
	return !1;
}
function sa(e, t) {
	if (!e) return {};
	let n = t.attributesGroupName ? e[t.attributesGroupName] : e;
	if (!n) return {};
	let r = {};
	for (let e in n) e.startsWith(t.attributeNamePrefix) ? r[e.substring(t.attributeNamePrefix.length)] = n[e] : r[e] = n[e];
	return r;
}
function ca(e) {
	if (!e || typeof e != "string") return;
	let t = e.indexOf(":");
	if (t !== -1 && t > 0) {
		let n = e.substring(0, t);
		if (n !== "xmlns") return n;
	}
}
Qi.label = "HTML", $i.label = "XML", ea.label = "SVG", Xi.label = "SQL", Zi.label = "SQL-STRICT", ta.label = "SHELL", na.label = "REDOS", ra.label = "NOSQL", ia.label = "LOG", Object.freeze({
	HTML: Qi,
	XML: $i,
	SVG: ea,
	SQL: Xi,
	"SQL-STRICT": Zi,
	SHELL: ta,
	REDOS: na,
	NOSQL: ra,
	LOG: ia
});
var la = class {
	constructor(e, t) {
		var n;
		this.options = e, this.currentNode = null, this.tagsNodeStack = [], this.parseXml = ma, this.parseTextData = ua, this.resolveNameSpace = da, this.buildAttributesMap = pa, this.isItStopNode = va, this.replaceEntitiesValue = ga, this.readStopNodeData = Sa, this.saveTextToParentTag = _a, this.addChild = ha, this.ignoreAttributesFn = typeof (n = this.options.ignoreAttributes) == "function" ? n : Array.isArray(n) ? (e) => {
			for (let t of n) if (typeof t == "string" && e === t || t instanceof RegExp && t.test(e)) return !0;
		} : () => !1, this.entityExpansionCount = 0, this.currentExpandedLength = 0, this.doctypefound = !1;
		let r = { ...zi };
		this.options.entityDecoder ? this.entityDecoder = this.options.entityDecoder : (typeof this.options.htmlEntities == "object" ? r = this.options.htmlEntities : !0 === this.options.htmlEntities && (r = {
			...Bi,
			...Ri
		}), this.entityDecoder = new Yi({
			namedEntities: {
				...r,
				...t
			},
			numericAllowed: this.options.htmlEntities,
			limit: {
				maxTotalExpansions: this.options.processEntities.maxTotalExpansions,
				maxExpandedLength: this.options.processEntities.maxExpandedLength,
				applyLimitsTo: this.options.processEntities.appliesTo
			},
			onInputEntity: (e, t) => oa(t, [Qi, $i]) ? Vi.BLOCK : Vi.ALLOW
		})), this.matcher = new Fi(), this.readonlyMatcher = this.matcher.readOnly(), this.isCurrentNodeStopNode = !1, this.stopNodeExpressionsSet = new Li();
		let i = this.options.stopNodes;
		if (i && i.length > 0) {
			for (let e = 0; e < i.length; e++) {
				let t = i[e];
				typeof t == "string" ? this.stopNodeExpressionsSet.add(new Ii(t)) : t instanceof Ii && this.stopNodeExpressionsSet.add(t);
			}
			this.stopNodeExpressionsSet.seal();
		}
	}
};
function ua(e, t, n, r, i, a, o) {
	let s = this.options;
	if (e !== void 0 && (s.trimValues && !r && (e = e.trim()), e.length > 0)) {
		o || (e = this.replaceEntitiesValue(e, t, n));
		let r = s.jPath ? n.toString() : n, c = s.tagValueProcessor(t, e, r, i, a);
		return c == null ? e : typeof c != typeof e || c !== e ? c : s.trimValues || e.trim() === e ? Ca(e, s.parseTagValue, s.numberParseOptions) : e;
	}
}
function da(e) {
	if (this.options.removeNSPrefix) {
		let t = e.split(":"), n = e.charAt(0) === "/" ? "/" : "";
		if (t[0] === "xmlns") return "";
		t.length === 2 && (e = n + t[1]);
	}
	return e;
}
var fa = /* @__PURE__ */ RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?", "gm");
function pa(e, t, n, r = !1) {
	let i = this.options;
	if (!0 === r || !0 !== i.ignoreAttributes && typeof e == "string") {
		let r = function(e, t) {
			let n = [], r = t.exec(e);
			for (; r;) {
				let i = [];
				i.startIndex = t.lastIndex - r[0].length;
				let a = r.length;
				for (let e = 0; e < a; e++) i.push(r[e]);
				n.push(i), r = t.exec(e);
			}
			return n;
		}(e, fa), a = r.length, o = {}, s = Array(a), c = !1, l = {};
		for (let e = 0; e < a; e++) {
			let t = this.resolveNameSpace(r[e][1]), a = r[e][4];
			if (t.length && a !== void 0) {
				let r = a;
				i.trimValues && (r = r.trim()), r = this.replaceEntitiesValue(r, n, this.readonlyMatcher), s[e] = r, l[t] = r, c = !0;
			}
		}
		c && typeof t == "object" && t.updateCurrent && t.updateCurrent(l);
		let u = i.jPath ? t.toString() : this.readonlyMatcher, d = !1;
		for (let e = 0; e < a; e++) {
			let t = this.resolveNameSpace(r[e][1]);
			if (this.ignoreAttributesFn(t, u)) continue;
			let n = i.attributeNamePrefix + t;
			if (t.length) {
				if (i.transformAttributeName && (n = i.transformAttributeName(n)), n = Ta(n, i), r[e][4] !== void 0) {
					let r = s[e], a = i.attributeValueProcessor(t, r, u);
					o[n] = a == null ? r : typeof a != typeof r || a !== r ? a : Ca(r, i.parseAttributeValue, i.numberParseOptions), d = !0;
				} else i.allowBooleanAttributes && (o[n] = !0, d = !0);
			}
		}
		if (!d) return;
		if (i.attributesGroupName && !i.preserveOrder) {
			let e = {};
			return e[i.attributesGroupName] = o, e;
		}
		return o;
	}
}
var ma = function(e) {
	e = e.replace(/\r\n?/g, "\n");
	let t = new ai("!xml"), n = t, r = "";
	this.matcher.reset(), this.entityDecoder.reset(), this.entityExpansionCount = 0, this.currentExpandedLength = 0, this.doctypefound = !1;
	let i = this.options, a = new vi(i.processEntities), o = e.length;
	for (let s = 0; s < o; s++) if (e[s] === "<") {
		let c = e.charCodeAt(s + 1);
		if (c === 47) {
			let a = ya(e, ">", s, "Closing Tag is not closed."), o = e.substring(s + 2, a).trim();
			if (i.removeNSPrefix) {
				let e = o.indexOf(":");
				e !== -1 && (o = o.substr(e + 1));
			}
			o = wa(i.transformTagName, o, "", i).tagName, n && (r = this.saveTextToParentTag(r, n, this.readonlyMatcher));
			let c = this.matcher.getCurrentTag();
			if (o && i.unpairedTagsSet.has(o)) throw Error(`Unpaired tag can not be used as closing tag: </${o}>`);
			c && i.unpairedTagsSet.has(c) && (this.matcher.pop(), this.tagsNodeStack.pop()), this.matcher.pop(), this.isCurrentNodeStopNode = !1, n = this.tagsNodeStack.pop() || t, i.captureMetaData && n && n.addEndIndex(a + 1), r = "", s = a;
		} else if (c === 63) {
			let t = xa(e, s, !1, "?>");
			if (!t) throw Error("Pi Tag is not closed.");
			r = this.saveTextToParentTag(r, n, this.readonlyMatcher);
			let o = this.buildAttributesMap(t.tagExp, this.matcher, t.tagName, !0);
			if (o) {
				let e = o[this.options.attributeNamePrefix + "version"];
				this.entityDecoder.setXmlVersion(Number(e) || 1), a.setXmlVersion(Number(e) || 1);
			}
			if (!(i.ignoreDeclaration && t.tagName === "?xml" || i.ignorePiTags)) {
				let e = new ai(t.tagName);
				e.add(i.textNodeName, ""), t.tagName !== t.tagExp && t.attrExpPresent && !0 !== i.ignoreAttributes && (e[":@"] = o), this.addChild(n, e, this.readonlyMatcher, s), i.captureMetaData && n.addEndIndex(t.closeIndex + 2);
			}
			s = t.closeIndex + 1;
		} else if (c === 33 && e.charCodeAt(s + 2) === 45 && e.charCodeAt(s + 3) === 45) {
			let t = ya(e, "-->", s + 4, "Comment is not closed.");
			if (i.commentPropName) {
				let a = e.substring(s + 4, t - 2);
				r = this.saveTextToParentTag(r, n, this.readonlyMatcher), n.add(i.commentPropName, [{ [i.textNodeName]: a }]);
			}
			s = t;
		} else if (c === 33 && e.charCodeAt(s + 2) === 68) {
			if (this.doctypefound) throw Error("Multiple DOCTYPE declarations found.");
			this.doctypefound = !0;
			let t = a.readDocType(e, s);
			this.entityDecoder.addInputEntities(t.entities), s = t.i;
		} else if (c === 33 && e.charCodeAt(s + 2) === 91) {
			let t = ya(e, "]]>", s, "CDATA is not closed.") - 2, a = e.substring(s + 9, t);
			r = this.saveTextToParentTag(r, n, this.readonlyMatcher);
			let o = this.parseTextData(a, n.tagname, this.readonlyMatcher, !0, !1, !0, !0);
			o ??= "", i.cdataPropName ? n.add(i.cdataPropName, [{ [i.textNodeName]: a }]) : n.add(i.textNodeName, o), s = t + 2;
		} else {
			let a = xa(e, s, i.removeNSPrefix);
			if (!a) {
				let t = e.substring(Math.max(0, s - 50), Math.min(o, s + 50));
				throw Error(`readTagExp returned undefined at position ${s}. Context: "${t}"`);
			}
			let c = a.tagName, l = a.rawTagName, u = a.tagExp, d = a.attrExpPresent, f = a.closeIndex;
			if ({tagName: c, tagExp: u} = wa(i.transformTagName, c, u, i), i.strictReservedNames && (c === i.commentPropName || c === i.cdataPropName || c === i.textNodeName || c === i.attributesGroupName)) throw Error(`Invalid tag name: ${c}`);
			n && r && n.tagname !== "!xml" && (r = this.saveTextToParentTag(r, n, this.readonlyMatcher, !1));
			let p = n;
			p && i.unpairedTagsSet.has(p.tagname) && (n = this.tagsNodeStack.pop(), this.matcher.pop());
			let m = !1;
			u.length > 0 && u.lastIndexOf("/") === u.length - 1 && (m = !0, c[c.length - 1] === "/" ? (c = c.substr(0, c.length - 1), u = c) : u = u.substr(0, u.length - 1), d = c !== u);
			let h, g = null;
			h = ca(l), c !== t.tagname && this.matcher.push(c, {}, h), c !== u && d && (g = this.buildAttributesMap(u, this.matcher, c), g && sa(g, i)), c !== t.tagname && (this.isCurrentNodeStopNode = this.isItStopNode());
			let _ = s;
			if (this.isCurrentNodeStopNode) {
				let t = "";
				if (m) s = a.closeIndex;
				else if (i.unpairedTagsSet.has(c)) s = a.closeIndex;
				else {
					let n = this.readStopNodeData(e, l, f + 1);
					if (!n) throw Error(`Unexpected end of ${l}`);
					s = n.i, t = n.tagContent;
				}
				let r = new ai(c);
				g && (r[":@"] = g), r.add(i.textNodeName, t), this.matcher.pop(), this.isCurrentNodeStopNode = !1, this.addChild(n, r, this.readonlyMatcher, _), i.captureMetaData && n.addEndIndex(s + 1);
			} else {
				if (m) {
					({tagName: c, tagExp: u} = wa(i.transformTagName, c, u, i));
					let e = new ai(c);
					g && (e[":@"] = g), this.addChild(n, e, this.readonlyMatcher, _), i.captureMetaData && n.addEndIndex(f + 1), this.matcher.pop(), this.isCurrentNodeStopNode = !1;
				} else {
					if (i.unpairedTagsSet.has(c)) {
						let e = new ai(c);
						g && (e[":@"] = g), this.addChild(n, e, this.readonlyMatcher, _), i.captureMetaData && n.addEndIndex(a.closeIndex + 1), this.matcher.pop(), this.isCurrentNodeStopNode = !1, s = a.closeIndex;
						continue;
					}
					{
						let e = new ai(c);
						if (this.tagsNodeStack.length > i.maxNestedTags) throw Error("Maximum nested tags exceeded");
						this.tagsNodeStack.push(n), g && (e[":@"] = g), this.addChild(n, e, this.readonlyMatcher, _), n = e;
					}
				}
				r = "", s = f;
			}
		}
	} else r += e[s];
	return t.child;
};
function ha(e, t, n, r) {
	this.options.captureMetaData || (r = void 0);
	let i = this.options.jPath ? n.toString() : n, a = this.options.updateTag(t.tagname, i, t[":@"]);
	!1 === a || (typeof a == "string" && (t.tagname = a), e.addChild(t, r));
}
function ga(e, t, n) {
	let r = this.options.processEntities;
	if (!r || !r.enabled) return e;
	if (r.allowedTags) {
		let i = this.options.jPath ? n.toString() : n;
		if (!(Array.isArray(r.allowedTags) ? r.allowedTags.includes(t) : r.allowedTags(t, i))) return e;
	}
	if (r.tagFilter) {
		let i = this.options.jPath ? n.toString() : n;
		if (!r.tagFilter(t, i)) return e;
	}
	return this.entityDecoder.decode(e);
}
function _a(e, t, n, r) {
	return e &&= (r === void 0 && (r = t.child.length === 0), (e = this.parseTextData(e, t.tagname, n, !1, !!t[":@"] && Object.keys(t[":@"]).length !== 0, r)) !== void 0 && e !== "" && t.add(this.options.textNodeName, e), ""), e;
}
function va() {
	return this.stopNodeExpressionsSet.size !== 0 && this.matcher.matchesAny(this.stopNodeExpressionsSet);
}
function ya(e, t, n, r) {
	let i = e.indexOf(t, n);
	if (i === -1) throw Error(r);
	return i + t.length - 1;
}
function ba(e, t, n, r) {
	let i = e.indexOf(t, n);
	if (i === -1) throw Error(r);
	return i;
}
function xa(e, t, n, r = ">") {
	let i = function(e, t, n = ">") {
		let r = 0, i = e.length, a = n.charCodeAt(0), o = n.length > 1 ? n.charCodeAt(1) : -1, s = "", c = t;
		for (let n = t; n < i; n++) {
			let t = e.charCodeAt(n);
			if (r) t === r && (r = 0);
			else if (t === 34 || t === 39) r = t;
			else if (t === a) {
				if (o === -1 || e.charCodeAt(n + 1) === o) return s += e.substring(c, n), {
					data: s,
					index: n
				};
			} else t !== 9 || r || (s += e.substring(c, n) + " ", c = n + 1);
		}
	}(e, t + 1, r);
	if (!i) return;
	let a = i.data, o = i.index, s = a.search(/\s/), c = a, l = !0;
	s !== -1 && (c = a.substring(0, s), a = a.substring(s + 1).trimStart());
	let u = c;
	if (n) {
		let e = c.indexOf(":");
		e !== -1 && (c = c.substr(e + 1), l = c !== i.data.substr(e + 1));
	}
	return {
		tagName: c,
		tagExp: a,
		closeIndex: o,
		attrExpPresent: l,
		rawTagName: u
	};
}
function Sa(e, t, n) {
	let r = n, i = 1, a = e.length;
	for (; n < a; n++) if (e[n] === "<") {
		let a = e.charCodeAt(n + 1);
		if (a === 47) {
			let a = ba(e, ">", n, `${t} is not closed`);
			if (e.substring(n + 2, a).trim() === t && (i--, i === 0)) return {
				tagContent: e.substring(r, n),
				i: a
			};
			n = a;
		} else if (a === 63) n = ya(e, "?>", n + 1, "StopNode is not closed.");
		else if (a === 33 && e.charCodeAt(n + 2) === 45 && e.charCodeAt(n + 3) === 45) n = ya(e, "-->", n + 3, "StopNode is not closed.");
		else if (a === 33 && e.charCodeAt(n + 2) === 91) n = ya(e, "]]>", n, "StopNode is not closed.") - 2;
		else {
			let r = xa(e, n, !1);
			r && ((r && r.tagName) === t && r.tagExp[r.tagExp.length - 1] !== "/" && i++, n = r.closeIndex);
		}
	}
}
function Ca(e, t, n) {
	if (t && typeof e == "string") {
		let t = e.trim();
		return t === "true" || t !== "false" && ji(e, n);
	}
	return e === void 0 ? "" : e;
}
function wa(e, t, n, r) {
	if (e) {
		let r = e(t);
		n === t && (n = r), t = r;
	}
	return {
		tagName: t = Ta(t, r),
		tagExp: n
	};
}
function Ta(e, t) {
	if (Qr.includes(e)) throw Error(`[SECURITY] Invalid name: "${e}" is a reserved JavaScript keyword that could cause prototype pollution`);
	return Zr.includes(e) ? t.onDangerousProperty(e) : e;
}
var Ea = ai.getMetaDataSymbol();
function Da(e, t) {
	if (!e || typeof e != "object") return {};
	if (!t) return e;
	let n = {};
	for (let r in e) r.startsWith(t) ? n[r.substring(t.length)] = e[r] : n[r] = e[r];
	return n;
}
function Oa(e, t, n, r) {
	return ka(e, t, n, r);
}
function ka(e, t, n, r) {
	let i, a = {};
	for (let o = 0; o < e.length; o++) {
		let s = e[o], c = Aa(s);
		if (c !== void 0 && c !== t.textNodeName) {
			let e = Da(s[":@"] || {}, t.attributeNamePrefix);
			n.push(c, e);
		}
		if (c === t.textNodeName) i === void 0 ? i = s[c] : i += "" + s[c];
		else {
			if (c === void 0) continue;
			if (s[c]) {
				let e = ka(s[c], t, n, r), i = Ma(e, t);
				if (Object.keys(e).length === 0 && t.alwaysCreateTextNode && (e[t.textNodeName] = ""), s[":@"] ? ja(e, s[":@"], r, t) : Object.keys(e).length !== 1 || e[t.textNodeName] === void 0 || t.alwaysCreateTextNode ? Object.keys(e).length === 0 && (t.alwaysCreateTextNode ? e[t.textNodeName] = "" : e = "") : e = e[t.textNodeName], s[Ea] !== void 0 && typeof e == "object" && e && (e[Ea] = s[Ea]), a[c] !== void 0 && Object.prototype.hasOwnProperty.call(a, c)) Array.isArray(a[c]) || (a[c] = [a[c]]), a[c].push(e);
				else {
					let n = t.jPath ? r.toString() : r;
					a[c] = t.isArray(c, n, i) ? [e] : e;
				}
				c !== void 0 && c !== t.textNodeName && n.pop();
			}
		}
	}
	return typeof i == "string" ? i.length > 0 && (a[t.textNodeName] = i) : i !== void 0 && (a[t.textNodeName] = i), a;
}
function Aa(e) {
	let t = Object.keys(e);
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (n !== ":@") return n;
	}
}
function ja(e, t, n, r) {
	if (t) {
		let i = Object.keys(t), a = i.length;
		for (let o = 0; o < a; o++) {
			let a = i[o], s = a.startsWith(r.attributeNamePrefix) ? a.substring(r.attributeNamePrefix.length) : a, c = r.jPath ? n.toString() + "." + s : n;
			e[a] = r.isArray(a, c, !0, !0) ? [t[a]] : t[a];
		}
	}
}
function Ma(e, t) {
	let { textNodeName: n } = t, r = Object.keys(e).length;
	return r === 0 || !(r !== 1 || !e[n] && typeof e[n] != "boolean" && e[n] !== 0);
}
var Na = {
	allowBooleanAttributes: !1,
	unpairedTags: []
};
function Pa(e) {
	return e === " " || e === "	" || e === "\n" || e === "\r";
}
function Fa(e, t) {
	let n = t;
	for (; t < e.length; t++) if (e[t] == "?" || e[t] == " ") {
		let r = e.substr(n, t - n);
		if (t > 5 && r === "xml") return X("InvalidXml", "XML declaration allowed only at the start of the document.", Z(e, t));
		if (e[t] == "?" && e[t + 1] == ">") {
			t++;
			break;
		}
	}
	return t;
}
function Ia(e, t) {
	if (e.length > t + 5 && e[t + 1] === "-" && e[t + 2] === "-") {
		for (t += 3; t < e.length; t++) if (e[t] === "-" && e[t + 1] === "-" && e[t + 2] === ">") {
			t += 2;
			break;
		}
	} else if (e.length > t + 8 && e[t + 1] === "D" && e[t + 2] === "O" && e[t + 3] === "C" && e[t + 4] === "T" && e[t + 5] === "Y" && e[t + 6] === "P" && e[t + 7] === "E") {
		let n = 1;
		for (t += 8; t < e.length; t++) if (e[t] === "<") n++;
		else if (e[t] === ">" && (n--, n === 0)) break;
	} else if (e.length > t + 9 && e[t + 1] === "[" && e[t + 2] === "C" && e[t + 3] === "D" && e[t + 4] === "A" && e[t + 5] === "T" && e[t + 6] === "A" && e[t + 7] === "[") {
		for (t += 8; t < e.length; t++) if (e[t] === "]" && e[t + 1] === "]" && e[t + 2] === ">") {
			t += 2;
			break;
		}
	}
	return t;
}
function La(e, t) {
	let n = "", r = "", i = !1;
	for (; t < e.length; t++) {
		if (e[t] === "\"" || e[t] === "'") r === "" ? r = e[t] : r !== e[t] || (r = "");
		else if (e[t] === ">" && r === "") {
			i = !0;
			break;
		}
		n += e[t];
	}
	return r === "" && {
		value: n,
		index: t,
		tagClosed: i
	};
}
function Ra(e, t) {
	let n = function(e) {
		let t = [], n = e.length, r = 0;
		for (; r < n;) {
			let i = r;
			for (; r < n && Pa(e[r]);) r++;
			if (r >= n) break;
			if (e[r] === "=") {
				r = i + 1;
				continue;
			}
			let a = e.slice(i, r), o = r;
			for (; r < n && !Pa(e[r]) && e[r] !== "=";) r++;
			let s = e.slice(o, r), c, l, u, d = r;
			for (; d < n && Pa(e[d]);) d++;
			d < n && e[d] === "=" && (c = e.slice(r, d + 1), r = d + 1);
			let f = r;
			for (; f < n && Pa(e[f]);) f++;
			if (f < n && (e[f] === "\"" || e[f] === "'")) {
				let t = f + 1, n = e.indexOf(e[f], t);
				n !== -1 && (l = e[f], u = e.slice(t, n), r = n + 1);
			}
			let p = { startIndex: i };
			p[1] = a, p[2] = s, p[3] = c, p[4] = l !== void 0 || void 0, p[5] = l, p[6] = u, t.push(p);
		}
		return t;
	}(e), r = {};
	for (let e = 0; e < n.length; e++) {
		if (n[e][1].length === 0) return X("InvalidAttr", "Attribute '" + n[e][2] + "' has no space in starting.", Va(n[e]));
		if (n[e][3] !== void 0 && n[e][4] === void 0) return X("InvalidAttr", "Attribute '" + n[e][2] + "' is without value.", Va(n[e]));
		if (n[e][3] === void 0 && !t.allowBooleanAttributes) return X("InvalidAttr", "boolean attribute '" + n[e][2] + "' is not allowed.", Va(n[e]));
		let i = n[e][2];
		if (!Ba(i)) return X("InvalidAttr", "Attribute '" + i + "' is an invalid name.", Va(n[e]));
		if (Object.prototype.hasOwnProperty.call(r, i)) return X("InvalidAttr", "Attribute '" + i + "' is repeated.", Va(n[e]));
		r[i] = 1;
	}
	return !0;
}
function za(e, t) {
	if (e[++t] === ";") return -1;
	if (e[t] === "#") return function(e, t) {
		let n = /\d/;
		for (e[t] === "x" && (t++, n = /[\da-fA-F]/); t < e.length; t++) {
			if (e[t] === ";") return t;
			if (!e[t].match(n)) break;
		}
		return -1;
	}(e, ++t);
	let n = 0;
	for (; t < e.length; t++, n++) if (!(e[t].match(/\w/) && n < 20)) {
		if (e[t] === ";") break;
		return -1;
	}
	return t;
}
function X(e, t, n) {
	return { err: {
		code: e,
		msg: t,
		line: n.line || n,
		col: n.col
	} };
}
function Ba(e) {
	return Xr(e);
}
function Z(e, t) {
	let n = e.substring(0, t).split(/\r?\n/);
	return {
		line: n.length,
		col: n[n.length - 1].length + 1
	};
}
function Va(e) {
	return e.startIndex + e[1].length;
}
var Ha = class {
	constructor(e) {
		this.externalEntities = {}, this.options = ri(e);
	}
	parse(e, t) {
		if (typeof e != "string" && e.toString) e = e.toString();
		else if (typeof e != "string") throw Error("XML data is accepted in String or Bytes[] form.");
		if (t) {
			!0 === t && (t = {});
			let n = function(e, t) {
				t = Object.assign({}, Na, t);
				let n = [], r = !1, i = !1;
				e[0] === "﻿" && (e = e.substr(1));
				for (let a = 0; a < e.length; a++) if (e[a] === "<" && e[a + 1] === "?") {
					if (a += 2, a = Fa(e, a), a.err) return a;
				} else {
					if (e[a] !== "<") {
						if (Pa(e[a])) continue;
						return X("InvalidChar", "char '" + e[a] + "' is not expected.", Z(e, a));
					}
					{
						let o = a;
						if (a++, e[a] === "!") {
							a = Ia(e, a);
							continue;
						}
						{
							let s = !1;
							e[a] === "/" && (s = !0, a++);
							let c = "";
							for (; a < e.length && e[a] !== ">" && e[a] !== " " && e[a] !== "	" && e[a] !== "\n" && e[a] !== "\r"; a++) c += e[a];
							if (c = c.trim(), c[c.length - 1] === "/" && (c = c.substring(0, c.length - 1), a--), !Xr(c)) {
								let t;
								return t = c.trim().length === 0 ? "Invalid space after '<'." : "Tag '" + c + "' is an invalid name.", X("InvalidTag", t, Z(e, a));
							}
							let l = La(e, a);
							if (!1 === l) return X("InvalidAttr", "Attributes for '" + c + "' have open quote.", Z(e, a));
							let u = l.value;
							if (a = l.index, u[u.length - 1] === "/") {
								let n = a - u.length;
								u = u.substring(0, u.length - 1);
								let i = Ra(u, t);
								if (!0 !== i) return X(i.err.code, i.err.msg, Z(e, n + i.err.line));
								r = !0;
							} else if (s) {
								if (!l.tagClosed) return X("InvalidTag", "Closing tag '" + c + "' doesn't have proper closing.", Z(e, a));
								if (u.trim().length > 0) return X("InvalidTag", "Closing tag '" + c + "' can't have attributes or invalid starting.", Z(e, o));
								if (n.length === 0) return X("InvalidTag", "Closing tag '" + c + "' has not been opened.", Z(e, o));
								{
									let t = n.pop();
									if (c !== t.tagName) {
										let n = Z(e, t.tagStartPos);
										return X("InvalidTag", "Expected closing tag '" + t.tagName + "' (opened in line " + n.line + ", col " + n.col + ") instead of closing tag '" + c + "'.", Z(e, o));
									}
									n.length == 0 && (i = !0);
								}
							} else {
								let s = Ra(u, t);
								if (!0 !== s) return X(s.err.code, s.err.msg, Z(e, a - u.length + s.err.line));
								if (!0 === i) return X("InvalidXml", "Multiple possible root nodes found.", Z(e, a));
								t.unpairedTags.indexOf(c) !== -1 || n.push({
									tagName: c,
									tagStartPos: o
								}), r = !0;
							}
							for (a++; a < e.length; a++) if (e[a] === "<") {
								if (e[a + 1] === "!") {
									a++, a = Ia(e, a);
									continue;
								}
								if (e[a + 1] !== "?") break;
								if (a = Fa(e, ++a), a.err) return a;
							} else if (e[a] === "&") {
								let t = za(e, a);
								if (t == -1) return X("InvalidChar", "char '&' is not expected.", Z(e, a));
								a = t;
							} else if (!0 === i && !Pa(e[a])) return X("InvalidXml", "Extra text at the end", Z(e, a));
							e[a] === "<" && a--;
						}
					}
				}
				return r ? n.length == 1 ? X("InvalidTag", "Unclosed tag '" + n[0].tagName + "'.", Z(e, n[0].tagStartPos)) : !(n.length > 0) || X("InvalidXml", "Invalid '" + JSON.stringify(n.map(((e) => e.tagName)), null, 4).replace(/\r?\n/g, "") + "' found.", {
					line: 1,
					col: 1
				}) : X("InvalidXml", "Start tag expected.", 1);
			}(e, t);
			if (!0 !== n) throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`);
		}
		let n = new la(this.options, this.externalEntities), r = n.parseXml(e);
		return this.options.preserveOrder || r === void 0 ? r : Oa(r, this.options, n.matcher, n.readonlyMatcher);
	}
	addEntity(e, t) {
		if (t.indexOf("&") !== -1) throw Error("Entity value can't have '&'");
		if (e.indexOf("&") !== -1 || e.indexOf(";") !== -1) throw Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
		if (t === "&") throw Error("An entity with value '&' is not permitted");
		this.externalEntities[e] = t;
	}
	static getMetaDataSymbol() {
		return ai.getMetaDataSymbol();
	}
}, Ua = I(829), Wa = I.n(Ua), Ga = function(e) {
	return e.Array = "array", e.Object = "object", e.Original = "original", e;
}(Ga || {});
function Ka(e) {
	let t = e.indexOf(":");
	return t === -1 ? e : e.slice(t + 1);
}
function qa(e) {
	return typeof e == "string" ? e : e.toArray().map(Ka).join(".");
}
function Ja(e, t) {
	if (!e.endsWith("propstat.prop.displayname")) return t;
}
function Ya(e, t, n = Ga.Original) {
	let r = Wa().get(e, t);
	return n === "array" && !1 === Array.isArray(r) ? [r] : n === "object" && Array.isArray(r) ? r[0] : r;
}
var Xa = /* @__PURE__ */ new Set([
	"multistatus",
	"response",
	"propstat",
	"prop",
	"status",
	"href",
	"responsedescription"
]);
function Za(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Qa(e, t) {
	return t ??= {
		attributeNamePrefix: "@",
		attributeParsers: [],
		tagParsers: [Ja]
	}, new Promise(((n) => {
		let r = function({ attributeNamePrefix: e, attributeParsers: t, clarkNotationProps: n, entityDecoder: r, tagParsers: i }) {
			let a = {
				allowBooleanAttributes: !0,
				attributeNamePrefix: e,
				textNodeName: "text",
				ignoreAttributes: !1,
				removeNSPrefix: !n,
				jPath: !1,
				numberParseOptions: {
					hex: !0,
					leadingZeros: !1
				},
				attributeValueProcessor(e, n, r) {
					if (t.length === 0 || (i = e) === "xmlns" || i.startsWith("xmlns:")) return n;
					var i;
					let a = qa(r);
					for (let e of t) try {
						let t = e(a, n);
						if (t !== n) return t;
					} catch {}
					return n;
				},
				tagValueProcessor(e, t, n) {
					if (i.length === 0) return t;
					let r = qa(n);
					for (let e of i) try {
						let n = e(r, t);
						if (n !== t) return n;
					} catch {}
					return t;
				}
			};
			return r && (a.entityDecoder = new Yi({ limit: {
				maxTotalExpansions: r.limit?.maxTotalExpansions ?? 0,
				maxExpandedLength: r.limit?.maxExpandedLength ?? 0
			} })), new Ha(a);
		}(t).parse(e);
		t.clarkNotationProps && function(e, t) {
			if (!Za(e) && !Array.isArray(e)) return;
			let n = `${t}xmlns`, r = `${n}:`, i = r.length, a = "text";
			function o(e) {
				return e === n || e.length > i && e.startsWith(r);
			}
			function s(e, t) {
				let a = null;
				for (let o of Object.keys(e)) o === n ? (a ||= new Map(t), a.set("", e[o])) : o.length > i && o.startsWith(r) && (a ||= new Map(t), a.set(o.slice(i), e[o]));
				return a ?? t;
			}
			function c(e) {
				if (Array.isArray(e)) return e.map(c);
				if (!Za(e)) return e;
				let t = {};
				for (let n of Object.keys(e)) o(n) || (t[n] = c(e[n]));
				let n = Object.keys(t);
				return n.length === 0 ? "" : n.length === 1 && n[0] === a ? t[a] : t;
			}
			function l(e, t, n, r) {
				let i = e.indexOf(":"), a = i === -1 ? "" : e.slice(0, i), o = i === -1 ? e : e.slice(i + 1), l = (e) => (Za(e) ? s(e, n) : n).get(a) ?? "", u = (e, t) => {
					let n = e ? `{${e}}${o}` : o, i = r[n];
					i === void 0 ? r[n] = t : Array.isArray(i) ? i.push(t) : r[n] = [i, t];
				};
				if (Array.isArray(t)) for (let e of t) u(l(e), c(e));
				else u(l(t), c(t));
			}
			function u(e, t) {
				if (!Za(e)) return e;
				let n = function(e, t) {
					let n = s(e, t), r = {};
					for (let t of Object.keys(e)) o(t) || l(t, e[t], n, r);
					return r;
				}(e, t);
				return Object.keys(n).length === 0 ? "" : n;
			}
			(function e(t, n) {
				if (Array.isArray(t)) {
					for (let r = 0; r < t.length; r += 1) t[r] = e(t[r], n);
					return t;
				}
				if (!Za(t)) return t;
				let r = s(t, n);
				for (let n of Object.keys(t)) {
					if (o(n)) {
						delete t[n];
						continue;
					}
					let i = n.indexOf(":"), a = i === -1 ? n : n.slice(i + 1), s = t[n], c = n;
					Xa.has(a) && a !== n && (delete t[n], t[a] = s, c = a), t[c] = a === "prop" ? Array.isArray(s) ? s.map(((e) => u(e, r))) : u(s, r) : e(s, r);
				}
				return Object.keys(t).length === 0 ? "" : t;
			})(e, /* @__PURE__ */ new Map());
		}(r, t.attributeNamePrefix ?? "@"), n(function(e) {
			let { multistatus: t } = e;
			if (t === "") return { multistatus: { response: [] } };
			if (!t) throw Error("Invalid response: No root multistatus found");
			let n = { multistatus: Array.isArray(t) ? t[0] : t };
			return Wa().set(n, "multistatus.response", Ya(n, "multistatus.response", Ga.Array)), Wa().set(n, "multistatus.response", Wa().get(n, "multistatus.response").map(((e) => function(e) {
				let t = Object.assign({}, e);
				return t.status ? Wa().set(t, "status", Ya(t, "status", Ga.Object)) : (Wa().set(t, "propstat", Ya(t, "propstat", Ga.Object)), Wa().set(t, "propstat.prop", Ya(t, "propstat.prop", Ga.Object))), t;
			}(e)))), n;
		}(r));
	}));
}
function $a(e, t, n = !1) {
	let { getlastmodified: r = null, getcontentlength: i = "0", resourcetype: a = null, getcontenttype: o = null, getetag: s = null } = e, c = a && typeof a == "object" && a.collection !== void 0 ? "directory" : "file", l = {
		filename: t,
		basename: mn().basename(t),
		lastmod: r,
		size: parseInt(i, 10),
		type: c,
		etag: typeof s == "string" ? s.replace(/"/g, "") : null
	};
	return c === "file" && (l.mime = o && typeof o == "string" ? o.split(";")[0] : ""), n && (e.displayname !== void 0 && (e.displayname = String(e.displayname)), l.props = e), l;
}
function eo(e, t, n = !1) {
	let r = null;
	try {
		e.multistatus.response[0].propstat && (r = e.multistatus.response[0]);
	} catch {}
	if (!r) throw Error("Failed getting item stat: bad response");
	let { propstat: { prop: i, status: a } } = r, [o, s, c] = a.split(" ", 3), l = parseInt(s, 10);
	if (l >= 400) {
		let e = /* @__PURE__ */ Error(`Invalid response: ${l} ${c}`);
		throw e.status = l, e;
	}
	return $a(i, vn(t), n);
}
function to(e) {
	switch (String(e)) {
		case "-3": return "unlimited";
		case "-2":
		case "-1": return "unknown";
		default: return parseInt(String(e), 10);
	}
}
function no(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var ro = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	let { details: r = !1 } = n;
	return no(B(V({
		url: R(e.remoteURL, L(t)),
		method: "PROPFIND",
		headers: {
			Accept: "text/plain,application/xml",
			Depth: "0"
		}
	}, e, n), e), (function(n) {
		return K(e, n), no(n.text(), (function(i) {
			return no(Qa(i, e.parsing), (function(e) {
				return Gr(n, eo(e, t, r), r);
			}));
		}));
	}));
}));
function io(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var ao = oo((function(e, t, n = {}) {
	let r = function(e) {
		if (!e || e === "/") return [];
		let t = e, n = [];
		do
			n.push(t), t = mn().dirname(t);
		while (t && t !== "/");
		return n;
	}(vn(t));
	r.sort(((e, t) => e.length > t.length ? 1 : t.length > e.length ? -1 : 0));
	let i = !1;
	return function(e, t, n) {
		if (typeof e[lo] == "function") {
			var r, i, a, o = e[lo]();
			function n(e) {
				try {
					for (; !(r = o.next()).done;) if ((e = t(r.value)) && e.then) {
						if (!fo(e)) return void e.then(n, a ||= Q.bind(null, i = new uo(), 2));
						e = e.v;
					}
					i ? Q(i, 1, e) : i = e;
				} catch (e) {
					Q(i ||= new uo(), 2, e);
				}
			}
			if (n(), o.return) {
				var s = function(e) {
					try {
						r.done || o.return();
					} catch {}
					return e;
				};
				if (i && i.then) return i.then(s, (function(e) {
					throw s(e);
				}));
				s();
			}
			return i;
		}
		if (!("length" in e)) throw TypeError("Object is not iterable");
		for (var c = [], l = 0; l < e.length; l++) c.push(e[l]);
		return function(e, t, n) {
			var r, i, a = -1;
			return function o(s) {
				try {
					for (; ++a < e.length && (!n || !n());) if ((s = t(a)) && s.then) {
						if (!fo(s)) return void s.then(o, i ||= Q.bind(null, r = new uo(), 2));
						s = s.v;
					}
					r ? Q(r, 1, s) : r = s;
				} catch (e) {
					Q(r ||= new uo(), 2, e);
				}
			}(), r;
		}(c, (function(e) {
			return t(c[e]);
		}), n);
	}(r, (function(r) {
		return a = function() {
			return function(n, i) {
				try {
					var a = io(ro(e, r), (function(e) {
						if (e.type !== "directory") throw Error(`Path includes a file: ${t}`);
					}));
				} catch (e) {
					return i(e);
				}
				return a && a.then ? a.then(void 0, i) : a;
			}(0, (function(t) {
				let a = t;
				return function() {
					if (a.status === 404) return i = !0, co(po(e, r, {
						...n,
						recursive: !1
					}));
					throw t;
				}();
			}));
		}, (o = function() {
			if (i) return co(po(e, r, {
				...n,
				recursive: !1
			}));
		}()) && o.then ? o.then(a) : a();
		var a, o;
	}), (function() {
		return !1;
	}));
}));
function oo(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}
function so() {}
function co(e, t) {
	if (!t) return e && e.then ? e.then(so) : Promise.resolve();
}
var lo = typeof Symbol < "u" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
function Q(e, t, n) {
	if (!e.s) {
		if (n instanceof uo) {
			if (!n.s) return void (n.o = Q.bind(null, e, t));
			1 & t && (t = n.s), n = n.v;
		}
		if (n && n.then) return void n.then(Q.bind(null, e, t), Q.bind(null, e, 2));
		e.s = t, e.v = n;
		let r = e.o;
		r && r(e);
	}
}
var uo = function() {
	function e() {}
	return e.prototype.then = function(t, n) {
		let r = new e(), i = this.s;
		if (i) {
			let e = 1 & i ? t : n;
			if (e) {
				try {
					Q(r, 1, e(this.v));
				} catch (e) {
					Q(r, 2, e);
				}
				return r;
			}
			return this;
		}
		return this.o = function(e) {
			try {
				let i = e.v;
				1 & e.s ? Q(r, 1, t ? t(i) : i) : n ? Q(r, 1, n(i)) : Q(r, 2, i);
			} catch (e) {
				Q(r, 2, e);
			}
		}, r;
	}, e;
}();
function fo(e) {
	return e instanceof uo && 1 & e.s;
}
var po = oo((function(e, t, n = {}) {
	if (!0 === n.recursive) return ao(e, t, n);
	let r = V({
		url: R(e.remoteURL, (i = L(t), i.endsWith("/") ? i : i + "/")),
		method: "MKCOL"
	}, e, n);
	var i;
	return io(B(r, e), (function(t) {
		K(e, t);
	}));
})), mo = I(388), ho = I.n(mo), go = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	let r = {};
	if (typeof n.range == "object" && typeof n.range.start == "number") {
		let e = `bytes=${n.range.start}-`;
		typeof n.range.end == "number" && (e = `${e}${n.range.end}`), r.Range = e;
	}
	let i = V({
		url: R(e.remoteURL, L(t)),
		method: "GET",
		headers: r
	}, e, n);
	return o = function(t) {
		if (K(e, t), r.Range && t.status !== 206) {
			let e = /* @__PURE__ */ Error(`Invalid response code for partial request: ${t.status}`);
			throw e.status = t.status, e;
		}
		return n.callback && setTimeout((() => {
			n.callback(t);
		}), 0), t.body;
	}, (a = B(i, e)) && a.then || (a = Promise.resolve(a)), o ? a.then(o) : a;
	var a, o;
})), _o = () => {}, vo = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n) {
	n.url ||= R(e.remoteURL, L(t));
	let r = V(n, e, {});
	return a = function(t) {
		return K(e, t), t;
	}, (i = B(r, e)) && i.then || (i = Promise.resolve(i)), a ? i.then(a) : i;
	var i, a;
})), yo = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	let r = V({
		url: R(e.remoteURL, L(t)),
		method: "DELETE"
	}, e, n);
	return a = function(t) {
		K(e, t);
	}, (i = B(r, e)) && i.then || (i = Promise.resolve(i)), a ? i.then(a) : i;
	var i, a;
})), bo = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	return function(r, i) {
		try {
			var a = (o = ro(e, t, n), s = function() {
				return !0;
			}, c ? s ? s(o) : o : (o && o.then || (o = Promise.resolve(o)), s ? o.then(s) : o));
		} catch (e) {
			return i(e);
		}
		var o, s, c;
		return a && a.then ? a.then(void 0, i) : a;
	}(0, (function(e) {
		if (e.status === 404) return !1;
		throw e;
	}));
}));
function xo(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var So = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	return xo(B(V({
		url: R(e.remoteURL, L(t), "/"),
		method: "PROPFIND",
		headers: {
			Accept: "text/plain,application/xml",
			Depth: n.deep ? "infinity" : "1"
		}
	}, e, n), e), (function(r) {
		return K(e, r), xo(r.text(), (function(i) {
			if (!i) throw Error("Failed parsing directory contents: Empty response");
			return xo(Qa(i, e.parsing), (function(i) {
				let a = _n(t), o = function(e, t, n, r = !1, i = !1) {
					let a = mn().join(t, "/"), { multistatus: { response: o } } = e, s = o.map(((e) => {
						let t = function(e) {
							try {
								return e.replace(/^https?:\/\/[^\/]+/, "");
							} catch (e) {
								throw new fn(e, "Failed normalising HREF");
							}
						}(e.href), { propstat: { prop: n } } = e;
						return $a(n, a === "/" ? decodeURIComponent(vn(t)) : vn(mn().relative(decodeURIComponent(a), decodeURIComponent(t))), r);
					}));
					return i ? s : s.filter(((e) => e.basename && (e.type === "file" || e.filename !== n.replace(/\/$/, ""))));
				}(i, _n(e.remoteBasePath || e.remotePath), a, n.details, n.includeSelf);
				return n.glob && (o = function(e, t) {
					return e.filter(((e) => U(e.filename, t, { matchBase: !0 })));
				}(o, n.glob)), Gr(r, o, n.details);
			}));
		}));
	}));
}));
function Co(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}
var wo = Co((function(e, t, n = {}) {
	return To(B(V({
		url: R(e.remoteURL, L(t)),
		method: "GET",
		headers: { Accept: "text/plain" },
		transformResponse: [Oo]
	}, e, n), e), (function(t) {
		return K(e, t), To(t.text(), (function(e) {
			return Gr(t, e, n.details);
		}));
	}));
}));
function To(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var Eo = Co((function(e, t, n = {}) {
	return To(B(V({
		url: R(e.remoteURL, L(t)),
		method: "GET"
	}, e, n), e), (function(t) {
		let r;
		return K(e, t), function(e, t) {
			var n = e();
			return n && n.then ? n.then(t) : t();
		}((function() {
			return To(t.arrayBuffer(), (function(e) {
				r = e;
			}));
		}), (function() {
			return Gr(t, r, n.details);
		}));
	}));
})), Do = Co((function(e, t, n = {}) {
	let { format: r = "binary" } = n;
	if (r !== "binary" && r !== "text") throw new fn({ info: { code: On.InvalidOutputFormat } }, `Invalid output format: ${r}`);
	return r === "text" ? wo(e, t, n) : Eo(e, t, n);
})), Oo = (e) => e;
function $(e) {
	return typeof e == "number" && Object.is(e, -0) ? "-0" : String(e);
}
function ko(e) {
	return $(e).replace(/--/g, "- -").replace(/--/g, "- -").replace(/-$/, "- ");
}
function Ao(e) {
	return $(e).replace(/\]\]>/g, "]]]]><![CDATA[>");
}
function jo(e) {
	return $(e).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function Mo(e, t, n, r, i) {
	return n.sanitizeName ? i(e) ? e : n.sanitizeName(e, {
		isAttribute: t,
		matcher: r.readOnly()
	}) : e;
}
function No(e, t) {
	let n = "";
	t.format && (n = "\n");
	let r = [];
	if (t.stopNodes && Array.isArray(t.stopNodes)) for (let e = 0; e < t.stopNodes.length; e++) {
		let n = t.stopNodes[e];
		typeof n == "string" ? r.push(new Ii(n)) : n instanceof Ii && r.push(n);
	}
	let i = _i("qName", { xmlVersion: function(e, t) {
		if (!Array.isArray(e) || e.length === 0) return "1.0";
		let n = e[0];
		if (Ro(n) === "?xml") {
			let e = n[":@"];
			if (e) {
				let n = t.attributeNamePrefix + "version";
				if (e[n]) return e[n];
			}
		}
		return "1.0";
	}(e, t) });
	return Po(e, t, n, new Fi(), r, i);
}
function Po(e, t, n, r, i, a) {
	let o = "", s = !1;
	if (t.maxNestedTags && r.getDepth() > t.maxNestedTags) throw Error("Maximum nested tags exceeded");
	if (!Array.isArray(e)) {
		if (e != null) {
			let n = $(e);
			return n = Vo(n, t), n;
		}
		return "";
	}
	for (let c = 0; c < e.length; c++) {
		let l = e[c], u = Ro(l);
		if (u === void 0) continue;
		let d = u === t.textNodeName || u === t.cdataPropName || u === t.commentPropName || u[0] === "?" ? u : Mo(u, !1, t, r, a), f = Fo(l[":@"], t);
		r.push(d, f);
		let p = Bo(r, i);
		if (d === t.textNodeName) {
			let e = l[u];
			p || (e = t.tagValueProcessor(d, e), e = Vo(e, t)), e = $(e), s && (o += n), o += e, s = !1, r.pop();
			continue;
		}
		if (d === t.cdataPropName) {
			s && (o += n), o += `<![CDATA[${Ao(l[u][0][t.textNodeName])}]]>`, s = !1, r.pop();
			continue;
		}
		if (d === t.commentPropName) {
			o += n + `\x3c!--${ko(l[u][0][t.textNodeName])}--\x3e`, s = !0, r.pop();
			continue;
		}
		if (d[0] === "?") {
			o += (d === "?xml" ? "" : n) + `<${d}${zo(l[":@"], t, p, r, a)}?>`, s = !0, r.pop();
			continue;
		}
		let m = n;
		m !== "" && (m += t.indentBy);
		let h = n + `<${d}${zo(l[":@"], t, p, r, a)}`, g;
		g = p ? Io(l[u], t) : Po(l[u], t, m, r, i, a), t.unpairedTags.indexOf(d) === -1 ? g && g.length !== 0 || !t.suppressEmptyNode ? g && g.endsWith(">") ? o += h + `>${g}${n}</${d}>` : (o += h + ">", g && n !== "" && (g.includes("/>") || g.includes("</")) ? o += n + t.indentBy + g + n : o += g, o += `</${d}>`) : o += h + "/>" : t.suppressUnpairedNode ? o += h + ">" : o += h + "/>", s = !0, r.pop();
	}
	return o;
}
function Fo(e, t) {
	if (!e || t.ignoreAttributes) return null;
	let n = {}, r = !1;
	for (let i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i.startsWith(t.attributeNamePrefix) ? i.substr(t.attributeNamePrefix.length) : i] = jo(e[i]), r = !0);
	return r ? n : null;
}
function Io(e, t) {
	if (!Array.isArray(e)) return e == null ? "" : $(e);
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = Ro(i);
		if (a === t.textNodeName) n += $(i[a]);
		else if (a === t.cdataPropName) n += i[a][0][t.textNodeName];
		else if (a === t.commentPropName) n += i[a][0][t.textNodeName];
		else {
			if (a && a[0] === "?") continue;
			if (a) {
				let e = Lo(i[":@"], t), r = Io(i[a], t);
				r && r.length !== 0 ? n += `<${a}${e}>${r}</${a}>` : n += `<${a}${e}/>`;
			}
		}
	}
	return n;
}
function Lo(e, t) {
	let n = "";
	if (e && !t.ignoreAttributes) for (let r in e) {
		if (!Object.prototype.hasOwnProperty.call(e, r)) continue;
		let i = e[r];
		!0 === i && t.suppressBooleanAttributes ? n += ` ${r.substr(t.attributeNamePrefix.length)}` : n += ` ${r.substr(t.attributeNamePrefix.length)}="${jo(i)}"`;
	}
	return n;
}
function Ro(e) {
	let t = Object.keys(e);
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (Object.prototype.hasOwnProperty.call(e, r) && r !== ":@") return r;
	}
}
function zo(e, t, n, r, i) {
	let a = "";
	if (e && !t.ignoreAttributes) for (let o in e) {
		if (!Object.prototype.hasOwnProperty.call(e, o)) continue;
		let s = o.substr(t.attributeNamePrefix.length), c = n ? s : Mo(s, !0, t, r, i), l;
		n ? l = e[o] : (l = t.attributeValueProcessor(o, e[o]), l = Vo(l, t)), !0 === l && t.suppressBooleanAttributes ? a += ` ${c}` : a += ` ${c}="${jo(l)}"`;
	}
	return a;
}
function Bo(e, t) {
	if (!t || t.length === 0) return !1;
	for (let n = 0; n < t.length; n++) if (e.matches(t[n])) return !0;
	return !1;
}
function Vo(e, t) {
	if (e && e.length > 0 && t.processEntities) for (let n = 0; n < t.entities.length; n++) {
		let r = t.entities[n];
		e = e.replace(r.regex, r.val);
	}
	return e;
}
var Ho = {
	attributeNamePrefix: "@_",
	attributesGroupName: !1,
	textNodeName: "#text",
	ignoreAttributes: !0,
	cdataPropName: !1,
	format: !1,
	indentBy: "  ",
	suppressEmptyNode: !1,
	suppressUnpairedNode: !0,
	suppressBooleanAttributes: !0,
	tagValueProcessor: function(e, t) {
		return t;
	},
	attributeValueProcessor: function(e, t) {
		return t;
	},
	preserveOrder: !1,
	commentPropName: !1,
	unpairedTags: [],
	entities: [
		{
			regex: /* @__PURE__ */ RegExp("&", "g"),
			val: "&amp;"
		},
		{
			regex: /* @__PURE__ */ RegExp(">", "g"),
			val: "&gt;"
		},
		{
			regex: /* @__PURE__ */ RegExp("<", "g"),
			val: "&lt;"
		},
		{
			regex: /* @__PURE__ */ RegExp("'", "g"),
			val: "&apos;"
		},
		{
			regex: /* @__PURE__ */ RegExp("\"", "g"),
			val: "&quot;"
		}
	],
	processEntities: !0,
	stopNodes: [],
	oneListGroup: !1,
	maxNestedTags: 100,
	jPath: !0,
	sanitizeName: !1
};
function Uo(e) {
	if (this.options = Object.assign({}, Ho, e), this.options.stopNodes && Array.isArray(this.options.stopNodes) && (this.options.stopNodes = this.options.stopNodes.map(((e) => typeof e == "string" && e.startsWith("*.") ? ".." + e.substring(2) : e))), this.stopNodeExpressions = [], this.options.stopNodes && Array.isArray(this.options.stopNodes)) for (let e = 0; e < this.options.stopNodes.length; e++) {
		let t = this.options.stopNodes[e];
		typeof t == "string" ? this.stopNodeExpressions.push(new Ii(t)) : t instanceof Ii && this.stopNodeExpressions.push(t);
	}
	var t;
	!0 === this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
		return !1;
	} : (this.ignoreAttributesFn = typeof (t = this.options.ignoreAttributes) == "function" ? t : Array.isArray(t) ? (e) => {
		for (let n of t) if (typeof n == "string" && e === n || n instanceof RegExp && n.test(e)) return !0;
	} : () => !1, this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = qo), this.processTextOrObjNode = Go, this.options.format ? (this.indentate = Ko, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function() {
		return "";
	}, this.tagEndChar = ">", this.newLine = "");
}
function Wo(e, t, n, r, i) {
	return n.sanitizeName ? i(e) ? e : n.sanitizeName(e, {
		isAttribute: t,
		matcher: r.readOnly()
	}) : e;
}
function Go(e, t, n, r, i) {
	let a = this.extractAttributes(e);
	if (r.push(t, a), this.checkStopNode(r)) {
		let i = this.buildRawContent(e), a = this.buildAttributesForStopNode(e);
		return r.pop(), this.buildObjectNode(i, t, a, n);
	}
	let o = this.j2x(e, n + 1, r, i);
	return r.pop(), t[0] === "?" ? this.buildTextValNode("", t, o.attrStr, n, r) : e[this.options.textNodeName] !== void 0 && Object.keys(e).length === 1 ? this.buildTextValNode(e[this.options.textNodeName], t, o.attrStr, n, r) : this.buildObjectNode(o.val, t, o.attrStr, n);
}
function Ko(e) {
	return this.options.indentBy.repeat(e);
}
function qo(e) {
	return !(!e.startsWith(this.options.attributeNamePrefix) || e === this.options.textNodeName) && e.substr(this.attrPrefixLen);
}
Uo.prototype.build = function(e) {
	if (this.options.preserveOrder) return No(e, this.options);
	{
		Array.isArray(e) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (e = { [this.options.arrayNodeName]: e });
		let t = new Fi(), n = _i("qName", { xmlVersion: function(e, t) {
			let n = e["?xml"];
			if (n && typeof n == "object") {
				if (t.attributesGroupName && n[t.attributesGroupName]) {
					let e = n[t.attributesGroupName][t.attributeNamePrefix + "version"];
					if (e) return e;
				}
				let e = n[t.attributeNamePrefix + "version"];
				if (e) return e;
			}
			return "1.0";
		}(e, this.options) });
		return this.j2x(e, 0, t, n).val;
	}
}, Uo.prototype.j2x = function(e, t, n, r) {
	let i = "", a = "";
	if (this.options.maxNestedTags && n.getDepth() >= this.options.maxNestedTags) throw Error("Maximum nested tags exceeded");
	let o = this.options.jPath ? n.toString() : n, s = this.checkStopNode(n);
	for (let c in e) {
		if (!Object.prototype.hasOwnProperty.call(e, c)) continue;
		let l = c === this.options.textNodeName || c === this.options.cdataPropName || c === this.options.commentPropName || this.options.attributesGroupName && c === this.options.attributesGroupName || this.isAttribute(c) || c[0] === "?" ? c : Wo(c, !1, this.options, n, r);
		if (e[c] === void 0) this.isAttribute(c) && (a += "");
		else if (e[c] === null) this.isAttribute(c) || l === this.options.cdataPropName || l === this.options.commentPropName ? a += "" : l[0] === "?" ? a += this.indentate(t) + "<" + l + "?" + this.tagEndChar : a += this.indentate(t) + "<" + l + "/" + this.tagEndChar;
		else if (e[c] instanceof Date) a += this.buildTextValNode(e[c], l, "", t, n);
		else if (typeof e[c] != "object") {
			let u = this.isAttribute(c);
			if (u && !this.ignoreAttributesFn(u, o)) {
				let t = Wo(u, !0, this.options, n, r);
				i += this.buildAttrPairStr(t, $(e[c]), s);
			} else if (!u) {
				if (c === this.options.textNodeName) {
					let t = this.options.tagValueProcessor(c, $(e[c]));
					a += this.replaceEntitiesValue(t);
				} else {
					n.push(l);
					let r = this.checkStopNode(n);
					if (n.pop(), r) {
						let n = $(e[c]);
						a += n === "" ? this.indentate(t) + "<" + l + this.closeTag(l) + this.tagEndChar : this.indentate(t) + "<" + l + ">" + n + "</" + l + this.tagEndChar;
					} else a += this.buildTextValNode(e[c], l, "", t, n);
				}
			}
		} else if (Array.isArray(e[c])) {
			let i = e[c].length, o = "", s = "";
			for (let u = 0; u < i; u++) {
				let i = e[c][u];
				if (i !== void 0) {
					if (i === null) l[0] === "?" ? a += this.indentate(t) + "<" + l + "?" + this.tagEndChar : a += this.indentate(t) + "<" + l + "/" + this.tagEndChar;
					else if (typeof i == "object") {
						if (this.options.oneListGroup) {
							n.push(l);
							let e = this.j2x(i, t + 1, n, r);
							n.pop(), o += e.val, this.options.attributesGroupName && i.hasOwnProperty(this.options.attributesGroupName) && (s += e.attrStr);
						} else o += this.processTextOrObjNode(i, l, t, n, r);
					} else if (this.options.oneListGroup) {
						let e = this.options.tagValueProcessor(l, i);
						e = this.replaceEntitiesValue(e), e = $(e), o += e;
					} else {
						n.push(l);
						let e = this.checkStopNode(n);
						if (n.pop(), e) {
							let e = $(i);
							o += e === "" ? this.indentate(t) + "<" + l + this.closeTag(l) + this.tagEndChar : this.indentate(t) + "<" + l + ">" + e + "</" + l + this.tagEndChar;
						} else o += this.buildTextValNode(i, l, "", t, n);
					}
				}
			}
			this.options.oneListGroup && (o = this.buildObjectNode(o, l, s, t)), a += o;
		} else if (this.options.attributesGroupName && c === this.options.attributesGroupName) {
			let t = Object.keys(e[c]), a = t.length;
			for (let o = 0; o < a; o++) {
				let a = Wo(t[o], !0, this.options, n, r);
				i += this.buildAttrPairStr(a, $(e[c][t[o]]), s);
			}
		} else a += this.processTextOrObjNode(e[c], l, t, n, r);
	}
	return {
		attrStr: i,
		val: a
	};
}, Uo.prototype.buildAttrPairStr = function(e, t, n) {
	return n || (t = this.options.attributeValueProcessor(e, $(t)), t = this.replaceEntitiesValue(t)), this.options.suppressBooleanAttributes && t === "true" ? " " + e : " " + e + "=\"" + jo(t) + "\"";
}, Uo.prototype.extractAttributes = function(e) {
	if (!e || typeof e != "object") return null;
	let t = {}, n = !1;
	if (this.options.attributesGroupName && e[this.options.attributesGroupName]) {
		let r = e[this.options.attributesGroupName];
		for (let e in r) Object.prototype.hasOwnProperty.call(r, e) && (t[e.startsWith(this.options.attributeNamePrefix) ? e.substring(this.options.attributeNamePrefix.length) : e] = jo(r[e]), n = !0);
	} else for (let r in e) {
		if (!Object.prototype.hasOwnProperty.call(e, r)) continue;
		let i = this.isAttribute(r);
		i && (t[i] = jo(e[r]), n = !0);
	}
	return n ? t : null;
}, Uo.prototype.buildRawContent = function(e) {
	if (typeof e == "string") return e;
	if (typeof e != "object" || !e) return String(e);
	if (e[this.options.textNodeName] !== void 0) return e[this.options.textNodeName];
	let t = "";
	for (let n in e) {
		if (!Object.prototype.hasOwnProperty.call(e, n) || this.isAttribute(n) || this.options.attributesGroupName && n === this.options.attributesGroupName) continue;
		let r = e[n];
		if (n === this.options.textNodeName) t += r;
		else if (Array.isArray(r)) {
			for (let e of r) if (typeof e == "string" || typeof e == "number") t += `<${n}>${e}</${n}>`;
			else if (typeof e == "object" && e) {
				let r = this.buildRawContent(e), i = this.buildAttributesForStopNode(e);
				t += r === "" ? `<${n}${i}/>` : `<${n}${i}>${r}</${n}>`;
			}
		} else if (typeof r == "object" && r) {
			let e = this.buildRawContent(r), i = this.buildAttributesForStopNode(r);
			t += e === "" ? `<${n}${i}/>` : `<${n}${i}>${e}</${n}>`;
		} else t += `<${n}>${r}</${n}>`;
	}
	return t;
}, Uo.prototype.buildAttributesForStopNode = function(e) {
	if (!e || typeof e != "object") return "";
	let t = "";
	if (this.options.attributesGroupName && e[this.options.attributesGroupName]) {
		let n = e[this.options.attributesGroupName];
		for (let e in n) {
			if (!Object.prototype.hasOwnProperty.call(n, e)) continue;
			let r = e.startsWith(this.options.attributeNamePrefix) ? e.substring(this.options.attributeNamePrefix.length) : e, i = n[e];
			!0 === i && this.options.suppressBooleanAttributes ? t += " " + r : t += " " + r + "=\"" + jo(i) + "\"";
		}
	} else for (let n in e) {
		if (!Object.prototype.hasOwnProperty.call(e, n)) continue;
		let r = this.isAttribute(n);
		if (r) {
			let i = e[n];
			!0 === i && this.options.suppressBooleanAttributes ? t += " " + r : t += " " + r + "=\"" + jo(i) + "\"";
		}
	}
	return t;
}, Uo.prototype.buildObjectNode = function(e, t, n, r) {
	if (e === "") return t[0] === "?" ? this.indentate(r) + "<" + t + n + "?" + this.tagEndChar : this.indentate(r) + "<" + t + n + this.closeTag(t) + this.tagEndChar;
	if (t[0] === "?") return this.indentate(r) + "<" + t + n + "?" + this.tagEndChar;
	{
		let i = "</" + t + this.tagEndChar, a = "";
		return t[0] === "?" && (a = "?", i = ""), !n && n !== "" || e.indexOf("<") !== -1 ? !1 !== this.options.commentPropName && t === this.options.commentPropName && a.length === 0 ? this.indentate(r) + `\x3c!--${ko(e)}--\x3e` + this.newLine : this.indentate(r) + "<" + t + n + a + this.tagEndChar + e + this.indentate(r) + i : this.indentate(r) + "<" + t + n + a + ">" + e + i;
	}
}, Uo.prototype.closeTag = function(e) {
	let t = "";
	return this.options.unpairedTags.indexOf(e) === -1 ? t = this.options.suppressEmptyNode ? "/" : `></${e}` : this.options.suppressUnpairedNode || (t = "/"), t;
}, Uo.prototype.checkStopNode = function(e) {
	if (!this.stopNodeExpressions || this.stopNodeExpressions.length === 0) return !1;
	for (let t = 0; t < this.stopNodeExpressions.length; t++) if (e.matches(this.stopNodeExpressions[t])) return !0;
	return !1;
}, Uo.prototype.buildTextValNode = function(e, t, n, r, i) {
	if (!1 !== this.options.cdataPropName && t === this.options.cdataPropName) {
		let t = Ao(e);
		return this.indentate(r) + `<![CDATA[${t}]]>` + this.newLine;
	}
	if (!1 !== this.options.commentPropName && t === this.options.commentPropName) {
		let t = ko(e);
		return this.indentate(r) + `\x3c!--${t}--\x3e` + this.newLine;
	}
	if (t[0] === "?") return this.indentate(r) + "<" + t + n + "?" + this.tagEndChar;
	{
		let i = this.options.tagValueProcessor(t, e);
		return i = this.replaceEntitiesValue(i), i = $(i), i === "" ? this.indentate(r) + "<" + t + n + this.closeTag(t) + this.tagEndChar : this.indentate(r) + "<" + t + n + ">" + i + "</" + t + this.tagEndChar;
	}
}, Uo.prototype.replaceEntitiesValue = function(e) {
	if (e && e.length > 0 && this.options.processEntities) for (let t = 0; t < this.options.entities.length; t++) {
		let n = this.options.entities[t];
		e = e.replace(n.regex, n.val);
	}
	return e;
};
var Jo = Uo;
function Yo(e) {
	return new Jo({
		attributeNamePrefix: "@_",
		format: !0,
		ignoreAttributes: !1,
		suppressEmptyNode: !0
	}).build(Xo({ lockinfo: {
		"@_xmlns:d": "DAV:",
		lockscope: { exclusive: {} },
		locktype: { write: {} },
		owner: { href: e }
	} }, "d"));
}
function Xo(e, t) {
	let n = { ...e };
	for (let e in n) n.hasOwnProperty(e) && (n[e] && typeof n[e] == "object" && e.indexOf(":") === -1 ? (n[`${t}:${e}`] = Xo(n[e], t), delete n[e]) : !1 === /^@_/.test(e) && (n[`${t}:${e}`] = n[e], delete n[e]));
	return n;
}
function Zo(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
function Qo(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}
var $o = Qo((function(e, t, n, r = {}) {
	return Zo(B(V({
		url: R(e.remoteURL, L(t)),
		method: "UNLOCK",
		headers: { "Lock-Token": n }
	}, e, r), e), (function(t) {
		if (K(e, t), t.status !== 204 && t.status !== 200) throw Wr(t);
	}));
})), es = Qo((function(e, t, n = {}) {
	let { refreshToken: r, timeout: i = ts } = n, a = {
		Accept: "text/plain,application/xml",
		Timeout: i
	};
	return r && (a.If = r), Zo(B(V({
		url: R(e.remoteURL, L(t)),
		method: "LOCK",
		headers: a,
		data: Yo(e.contactHref)
	}, e, n), e), (function(t) {
		return K(e, t), Zo(t.text(), (function(e) {
			let n = function(e) {
				return new Ha({
					removeNSPrefix: !0,
					parseAttributeValue: !0,
					parseTagValue: !0
				}).parse(e);
			}(e), r = Wa().get(n, "prop.lockdiscovery.activelock.locktoken.href"), i = Wa().get(n, "prop.lockdiscovery.activelock.timeout");
			if (!r) throw Wr(t, "No lock token received: ");
			return {
				token: r,
				serverTimeout: i
			};
		}));
	}));
})), ts = "Infinite, Second-4100000000";
function ns(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var rs = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t = {}) {
	let n = t.path || "/";
	return ns(B(V({
		url: R(e.remoteURL, n),
		method: "PROPFIND",
		headers: {
			Accept: "text/plain,application/xml",
			Depth: "0"
		}
	}, e, t), e), (function(n) {
		return K(e, n), ns(n.text(), (function(r) {
			return ns(Qa(r, e.parsing), (function(e) {
				return Gr(n, function(e) {
					try {
						let [t] = e.multistatus.response, { propstat: { prop: { "quota-used-bytes": n, "quota-available-bytes": r } } } = t;
						return n !== void 0 && r !== void 0 ? {
							used: parseInt(String(n), 10),
							available: to(r)
						} : null;
					} catch {}
					return null;
				}(e), t.details);
			}));
		}));
	}));
}));
function is(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var as = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	let { details: r = !1 } = n;
	return is(B(V({
		url: R(e.remoteURL, L(t)),
		method: "SEARCH",
		headers: {
			Accept: "text/plain,application/xml",
			"Content-Type": e.headers["Content-Type"] || "application/xml; charset=utf-8"
		}
	}, e, n), e), (function(n) {
		return K(e, n), is(n.text(), (function(i) {
			return is(Qa(i, e.parsing), (function(e) {
				return Gr(n, function(e, t, n) {
					let r = {
						truncated: !1,
						results: []
					};
					return r.truncated = e.multistatus.response.some(((e) => (e.status || e.propstat?.status).split(" ", 3)?.[1] === "507" && e.href.replace(/\/$/, "").endsWith(L(t).replace(/\/$/, "")))), e.multistatus.response.forEach(((e) => {
						if (e.propstat === void 0) return;
						let t = e.href.split("/").map(decodeURIComponent).join("/");
						r.results.push($a(e.propstat.prop, t, n));
					})), r;
				}(e, t, r), r);
			}));
		}));
	}));
})), os = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n, r = {}) {
	let i = V({
		url: R(e.remoteURL, L(t)),
		method: "MOVE",
		headers: {
			Destination: R(e.remoteURL, L(n)),
			Overwrite: !1 === r.overwrite ? "F" : "T"
		}
	}, e, r);
	return o = function(t) {
		K(e, t);
	}, (a = B(i, e)) && a.then || (a = Promise.resolve(a)), o ? a.then(o) : a;
	var a, o;
})), ss = I(172);
function cs(e) {
	if (Gn(e)) return e.byteLength;
	if (Kn(e)) return e.length;
	if (typeof e == "string") return (0, ss.d)(e);
	throw new fn({ info: { code: On.DataTypeNoLength } }, "Cannot calculate data length: Invalid type");
}
var ls = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n, r = {}) {
	let { contentLength: i = !0, overwrite: a = !0 } = r, o = { "Content-Type": "application/octet-stream" };
	!1 === i || (o["Content-Length"] = typeof i == "number" ? `${i}` : `${cs(n)}`), a || (o["If-None-Match"] = "*");
	let s = V({
		url: R(e.remoteURL, L(t)),
		method: "PUT",
		headers: o,
		data: n
	}, e, r);
	return l = function(t) {
		try {
			K(e, t);
		} catch (e) {
			let t = e;
			if (t.status !== 412 || a) throw t;
			return !1;
		}
		return !0;
	}, (c = B(s, e)) && c.then || (c = Promise.resolve(c)), l ? c.then(l) : c;
	var c, l;
})), us = function(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}((function(e, t, n = {}) {
	let r = V({
		url: R(e.remoteURL, L(t)),
		method: "OPTIONS"
	}, e, n);
	return a = function(t) {
		try {
			K(e, t);
		} catch (e) {
			throw e;
		}
		return {
			compliance: (t.headers.get("DAV") ?? "").split(",").map(((e) => e.trim())),
			server: t.headers.get("Server") ?? ""
		};
	}, (i = B(r, e)) && i.then || (i = Promise.resolve(i)), a ? i.then(a) : i;
	var i, a;
}));
function ds(e, t, n) {
	return n ? t ? t(e) : e : (e && e.then || (e = Promise.resolve(e)), t ? e.then(t) : e);
}
var fs = hs((function(e, t, n, r, i, a = {}) {
	if (n > r || n < 0) throw new fn({ info: { code: On.InvalidUpdateRange } }, `Invalid update range ${n} for partial update`);
	let o = {
		"Content-Type": "application/octet-stream",
		"Content-Length": "" + (r - n + 1),
		"Content-Range": `bytes ${n}-${r}/*`
	};
	return ds(B(V({
		url: R(e.remoteURL, L(t)),
		method: "PUT",
		headers: o,
		data: i
	}, e, a), e), (function(t) {
		K(e, t);
	}));
}));
function ps(e, t) {
	var n = e();
	return n && n.then ? n.then(t) : t(n);
}
var ms = hs((function(e, t, n, r, i, a = {}) {
	if (n > r || n < 0) throw new fn({ info: { code: On.InvalidUpdateRange } }, `Invalid update range ${n} for partial update`);
	let o = {
		"Content-Type": "application/x-sabredav-partialupdate",
		"Content-Length": "" + (r - n + 1),
		"X-Update-Range": `bytes=${n}-${r}`
	};
	return ds(B(V({
		url: R(e.remoteURL, L(t)),
		method: "PATCH",
		headers: o,
		data: i
	}, e, a), e), (function(t) {
		K(e, t);
	}));
}));
function hs(e) {
	return function() {
		var t = [...arguments];
		try {
			return Promise.resolve(e.apply(this, t));
		} catch (e) {
			return Promise.reject(e);
		}
	};
}
var gs = hs((function(e, t, n, r, i, a = {}) {
	return ds(us(e, t, a), (function(o) {
		let s = !1;
		return ps((function() {
			if (o.compliance.includes("sabredav-partialupdate")) return ds(ms(e, t, n, r, i, a), (function(e) {
				return s = !0, e;
			}));
		}), (function(c) {
			let l = !1;
			return s ? c : ps((function() {
				if (o.server.includes("Apache") && o.compliance.includes("<http://apache.org/dav/propset/fs/1>")) return ds(fs(e, t, n, r, i, a), (function(e) {
					return l = !0, e;
				}));
			}), (function(e) {
				if (l) return e;
				throw new fn({ info: { code: On.NotSupported } }, "Not supported");
			}));
		}));
	}));
})), _s = "https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";
function vs(e, t = {}) {
	let { authType: n = null, remoteBasePath: r, contactHref: i = _s, entityDecoder: a, ha1: o, headers: s = {}, httpAgent: c, httpsAgent: l, password: u, token: d, username: f, withCredentials: p } = t, m = n;
	m ||= f || u ? z.Password : z.None;
	let h = {
		authType: m,
		remoteBasePath: r,
		contactHref: i,
		ha1: o,
		headers: Object.assign({}, s),
		httpAgent: c,
		httpsAgent: l,
		password: u,
		parsing: {
			attributeNamePrefix: t.attributeNamePrefix ?? "@",
			attributeParsers: [],
			entityDecoder: a,
			tagParsers: [Ja]
		},
		remotePath: yn(e),
		remoteURL: e,
		token: d,
		username: f,
		withCredentials: p
	};
	return kn(h, f, u, d, o), {
		copyFile: (e, t, n) => Kr(h, e, t, n),
		createDirectory: (e, t) => po(h, e, t),
		createReadStream: (e, t) => function(e, t, n = {}) {
			let r = new (ho()).PassThrough();
			return go(e, t, n).then(((e) => {
				e.pipe(r);
			})).catch(((e) => {
				r.emit("error", e);
			})), r;
		}(h, e, t),
		createWriteStream: (e, t, n) => function(e, t, n = {}, r = _o) {
			let i = new (ho()).PassThrough(), a = {};
			return !1 === n.overwrite && (a["If-None-Match"] = "*"), B(V({
				url: R(e.remoteURL, L(t)),
				method: "PUT",
				headers: a,
				data: i,
				maxRedirects: 0
			}, e, n), e).then(((t) => K(e, t))).then(((e) => {
				setTimeout((() => {
					r(e);
				}), 0);
			})).catch(((e) => {
				i.emit("error", e);
			})), i;
		}(h, e, t, n),
		customRequest: (e, t) => vo(h, e, t),
		deleteFile: (e, t) => yo(h, e, t),
		exists: (e, t) => bo(h, e, t),
		getDirectoryContents: (e, t) => So(h, e, t),
		getFileContents: (e, t) => Do(h, e, t),
		getFileDownloadLink: (e) => function(e, t) {
			let n = R(e.remoteURL, L(t)), r = /^https:/i.test(n) ? "https" : "http";
			switch (e.authType) {
				case z.None: break;
				case z.Password: {
					let t = En(e.headers.Authorization.replace(/^Basic /i, "").trim());
					n = n.replace(/^https?:\/\//, `${r}://${t}@`);
					break;
				}
				default: throw new fn({ info: { code: On.LinkUnsupportedAuthType } }, `Unsupported auth type for file link: ${e.authType}`);
			}
			return n;
		}(h, e),
		getFileUploadLink: (e) => function(e, t) {
			let n = `${R(e.remoteURL, L(t))}?Content-Type=application/octet-stream`, r = /^https:/i.test(n) ? "https" : "http";
			switch (e.authType) {
				case z.None: break;
				case z.Password: {
					let t = En(e.headers.Authorization.replace(/^Basic /i, "").trim());
					n = n.replace(/^https?:\/\//, `${r}://${t}@`);
					break;
				}
				default: throw new fn({ info: { code: On.LinkUnsupportedAuthType } }, `Unsupported auth type for file link: ${e.authType}`);
			}
			return n;
		}(h, e),
		getHeaders: () => Object.assign({}, h.headers),
		getQuota: (e) => rs(h, e),
		lock: (e, t) => es(h, e, t),
		moveFile: (e, t, n) => os(h, e, t, n),
		putFileContents: (e, t, n) => ls(h, e, t, n),
		partialUpdateFileContents: (e, t, n, r, i) => gs(h, e, t, n, r, i),
		getDAVCompliance: (e) => us(h, e),
		search: (e, t) => as(h, e, t),
		setHeaders: (e) => {
			h.headers = Object.assign({}, e);
		},
		stat: (e, t) => ro(h, e, t),
		unlock: (e, t, n) => $o(h, e, t, n),
		registerAttributeParser: (e) => {
			h.parsing.attributeParsers.push(e);
		},
		registerTagParser: (e) => {
			h.parsing.tagParsers.push(e);
		}
	};
}
// node_modules/@nextcloud/files/dist/dav/davPermissions.mjs
function ys(e = "") {
	let t = P.NONE;
	return e && (e.includes("G") && (t |= P.READ), e.includes("W") && (t |= P.WRITE), e.includes("CK") && (t |= P.CREATE), e.includes("NV") && (t |= P.UPDATE), e.includes("D") && (t |= P.DELETE), e.includes("R") && (t |= P.SHARE)), t;
}
// node_modules/@nextcloud/files/dist/dav/davProperties.mjs
var bs = [
	"d:getcontentlength",
	"d:getcontenttype",
	"d:getetag",
	"d:getlastmodified",
	"d:creationdate",
	"d:displayname",
	"d:quota-available-bytes",
	"d:resourcetype",
	"nc:has-preview",
	"nc:is-encrypted",
	"nc:mount-type",
	"oc:comments-unread",
	"oc:favorite",
	"oc:fileid",
	"oc:owner-display-name",
	"oc:owner-id",
	"oc:permissions",
	"oc:size",
	"nc:upload_time"
], xs = {
	d: "DAV:",
	nc: "http://nextcloud.org/ns",
	oc: "http://owncloud.org/ns",
	ocs: "http://open-collaboration-services.org/ns"
};
function Ss() {
	return Je.davProperties ??= [...bs], Je.davProperties.map((e) => `<${e} />`).join(" ");
}
function Cs() {
	return Je.davNamespaces ??= { ...xs }, Object.keys(Je.davNamespaces).map((e) => `xmlns:${e}="${Je.davNamespaces?.[e]}"`).join(" ");
}
function ws() {
	return `<?xml version="1.0"?>
		<d:propfind ${Cs()}>
			<d:prop>
				${Ss()}
			</d:prop>
		</d:propfind>`;
}
function Ts() {
	return `<?xml version="1.0"?>
		<oc:filter-files ${Cs()}>
			<d:prop>
				${Ss()}
			</d:prop>
			<oc:filter-rules>
				<oc:favorite>1</oc:favorite>
			</oc:filter-rules>
		</oc:filter-files>`;
}
function Es(e, t = 100) {
	let n = _e(), r = n.dav?.search_supports_upload_time, i = n.dav?.search_supports_last_activity ? "<nc:last_activity/>" : "<d:getlastmodified/>";
	return `<?xml version="1.0" encoding="UTF-8"?>
<d:searchrequest ${Cs()}
	xmlns:ns="https://github.com/icewind1991/SearchDAV/ns">
	<d:basicsearch>
		<d:select>
			<d:prop>
				${Ss()}
			</d:prop>
		</d:select>
		<d:from>
			<d:scope>
				<d:href>/files/${ce()?.uid}/</d:href>
				<d:depth>infinity</d:depth>
			</d:scope>
		</d:from>
		<d:where>
			<d:and>
				<d:or>
					<d:not>
						<d:eq>
							<d:prop>
								<d:getcontenttype/>
							</d:prop>
							<d:literal>httpd/unix-directory</d:literal>
						</d:eq>
					</d:not>
					<d:eq>
						<d:prop>
							<oc:size/>
						</d:prop>
						<d:literal>0</d:literal>
					</d:eq>
				</d:or>
				${r ? `
						<d:or>
							<d:gt>
								<d:prop>
									<d:getlastmodified/>
								</d:prop>
								<d:literal>${e}</d:literal>
							</d:gt>
							<d:gt>
								<d:prop>
									<nc:upload_time/>
								</d:prop>
								<d:literal>${e}</d:literal>
							</d:gt>
						</d:or>
				` : `
					<d:gt>
						<d:prop>
							<d:getlastmodified/>
						</d:prop>
						<d:literal>${e}</d:literal>
					</d:gt>
				`}
			</d:and>
		</d:where>
		<d:orderby>
			<d:order>
				<d:prop>
					${i}
				</d:prop>
				<d:descending/>
			</d:order>
		</d:orderby>
		<d:limit>
			<d:nresults>${t}</d:nresults>
			<ns:firstresult>0</ns:firstresult>
		</d:limit>
	</d:basicsearch>
</d:searchrequest>`;
}
// node_modules/@nextcloud/files/dist/dav/dav.mjs
function Ds() {
	return Ke() ? `/files/${qe()}` : `/files/${ce()?.uid}`;
}
var Os = Ds();
function ks() {
	let e = De("dav");
	return Ke() ? e.replace("remote.php", "public.php") : e;
}
var As = ks();
function js(e = As, t = {}) {
	let n = vs(e, { headers: t });
	function r(e) {
		n.setHeaders({
			...t,
			"X-Requested-With": "XMLHttpRequest",
			requesttoken: e ?? ""
		});
	}
	return y(r), r(le()), Ln().patch("fetch", (e, t) => {
		let n = t.headers;
		return n?.method && (t.method = n.method, delete n.method), fetch(e, t);
	}), n;
}
async function Ms(e = {}) {
	let t = e.client ?? js(), n = e.path ?? "/", r = e.davRoot ?? Os;
	return (await t.getDirectoryContents(`${r}${n}`, {
		signal: e.signal,
		details: !0,
		data: Ts(),
		headers: { method: "REPORT" },
		includeSelf: !0
	})).data.filter((e) => e.filename !== n).map((e) => Ns(e, r));
}
function Ns(e, t = Os, n = As) {
	let r = ce()?.uid;
	if (Ke()) r ??= "anonymous";
	else if (!r) throw Error("No user id found");
	let i = e.props, a = ys(i?.permissions), o = String(i?.["owner-id"] || r), s = i.fileid || 0, c = new Date(Date.parse(e.lastmod)), l = new Date(Date.parse(i.creationdate)), u = new URL(n).pathname.replace(/\/$/, ""), d = {
		id: s,
		source: n + (e.filename.startsWith(u) ? e.filename.slice(u.length) : e.filename),
		mtime: !isNaN(c.getTime()) && c.getTime() !== 0 ? c : void 0,
		crtime: !isNaN(l.getTime()) && l.getTime() !== 0 ? l : void 0,
		mime: e.mime || "application/octet-stream",
		displayname: i.displayname === void 0 ? void 0 : String(i.displayname),
		size: i?.size || Number.parseInt(i.getcontentlength || "0"),
		status: s < 0 ? Xe.FAILED : void 0,
		permissions: a,
		owner: o,
		root: t,
		attributes: {
			...e,
			...i,
			hasPreview: i?.["has-preview"]
		}
	};
	return delete d.attributes?.props, e.type === "file" ? new nt(d) : new st(d);
}
// node_modules/@nextcloud/dialogs/dist/chunks/FilePicker-qWi4RBGN.js
var Ps = {
	name: "FileIcon",
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
function Rs(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon file-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Ls, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" }, null, -1)], 8, Is))], 16, Fs);
}
var zs = /*#__PURE__*/ N(Ps, [["render", Rs]]), Bs = {
	name: "MenuDownIcon",
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
function Ws(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon menu-down-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Us, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M7,10L12,15L17,10H7Z" }, null, -1)], 8, Hs))], 16, Vs);
}
var Gs = /*#__PURE__*/ N(Bs, [["render", Ws]]), Ks = {
	name: "MenuUpIcon",
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
}, qs = ["aria-hidden", "aria-label"], Js = [
	"fill",
	"width",
	"height"
], Ys = { key: 0 };
function Xs(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon menu-up-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Ys, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M7,15L12,10L17,15H7Z" }, null, -1)], 8, Js))], 16, qs);
}
var Zs = /*#__PURE__*/ N(Ks, [["render", Xs]]), Qs = {
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
}, $s = ["aria-hidden", "aria-label"], ec = [
	"fill",
	"width",
	"height"
], tc = { key: 0 };
function nc(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon folder-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", tc, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" }, null, -1)], 8, ec))], 16, $s);
}
var rc = /*#__PURE__*/ N(Qs, [["render", nc]]), ic = {
	"file-picker__file-icon": "_file-picker__file-icon_1hpi8_12",
	"file-picker__file-icon-overlay": "_file-picker__file-icon-overlay_1hpi8_29",
	"file-picker__file-icon--primary": "_file-picker__file-icon--primary_1hpi8_41"
}, ac = /* @__PURE__ */ Le({
	__name: "FilePreview",
	props: {
		node: {},
		cropImagePreviews: { type: Boolean }
	},
	setup(e) {
		let t = e, n = A(ic), { previewURL: r, previewLoaded: i } = wt(ie(t, "node"), C(() => ({ cropPreview: t.cropImagePreviews }))), a = C(() => t.node.type === Ye.File), o = C(() => {
			if (t.node.type !== Ye.Folder) return null;
			if (t.node.attributes?.["is-encrypted"] === 1) return Ft;
			if (t.node.attributes?.["is-tag"]) return zt;
			let e = Object.values(t.node.attributes?.["share-types"] || {}).flat();
			if (e.some((e) => e === Ht.Link || e === Ht.Email)) return It;
			if (e.length > 0) return Mt;
			switch (t.node.attributes?.["mount-type"]) {
				case "external":
				case "external-session": return Lt;
				case "group": return jt;
				case "shared": return Mt;
			}
			return null;
		});
		return (e, t) => (M(), O("div", {
			style: me(D(i) ? { backgroundImage: `url(${D(r)})` } : void 0),
			class: Pe(n.value["file-picker__file-icon"])
		}, [D(i) ? j("", !0) : (M(), O(de, { key: 0 }, [a.value ? (M(), T(zs, { key: 0 })) : (M(), O(de, { key: 1 }, [o.value ? (M(), T(D(xe), {
			key: 0,
			class: Pe(n.value["file-picker__file-icon-overlay"]),
			inline: "",
			path: o.value,
			size: "auto"
		}, null, 8, ["class", "path"])) : j("", !0), w(rc, { class: Pe(n.value["file-picker__file-icon--primary"]) }, null, 8, ["class"])], 64))], 64))], 6));
	}
}), oc = [
	"tabindex",
	"aria-selected",
	"data-filename"
], sc = { class: "row-name" }, cc = {
	class: "file-picker__name-container",
	"data-testid": "row-name"
}, lc = ["title", "textContent"], uc = ["textContent"], dc = { class: "row-size" }, fc = { class: "row-modified" }, pc = /*#__PURE__*/ N(/* @__PURE__ */ Le({
	__name: "FileListRow",
	props: {
		allowPickDirectory: { type: Boolean },
		selected: { type: Boolean },
		showCheckbox: { type: Boolean },
		canPick: { type: Boolean },
		node: {},
		cropImagePreviews: { type: Boolean }
	},
	emits: ["update:selected", "enterDirectory"],
	setup(e, { emit: t }) {
		let i = e, a = t, o = C(() => i.node.mtime ?? 0), s = C(() => n(i.node.displayname)), c = C(() => i.node.displayname.slice(0, s.value ? -s.value.length : void 0)), l = C(() => i.node.type === Ye.Folder), u = C(() => i.canPick && (i.allowPickDirectory || !l.value)), d = C(() => (i.node.permissions & P.READ) === P.READ);
		function f() {
			u.value && a("update:selected", !i.selected);
		}
		function p() {
			l.value ? d.value && a("enterDirectory", i.node) : f();
		}
		function m(e) {
			e.key === "Enter" && p();
		}
		return (t, n) => (M(), O("tr", E({
			tabindex: e.showCheckbox && !l.value ? void 0 : 0,
			"aria-selected": u.value ? e.selected : void 0,
			class: ["file-picker__row", [{
				"file-picker__row--selected": e.selected && !e.showCheckbox,
				"file-picker__row--not-navigatable": l.value && !d.value,
				"file-picker__row--not-pickable": !u.value
			}]],
			"data-filename": e.node.basename,
			"data-testid": "file-list-row"
		}, re({
			click: p,
			...!e.showCheckbox || l.value ? { keydown: m } : {}
		}, !0)), [
			e.showCheckbox ? (M(), O("td", {
				key: 0,
				class: "row-checkbox",
				onClick: x(() => {}, ["stop"])
			}, [w(D(Ce), {
				"aria-label": D(r)("Select the row for {nodename}", { nodename: c.value }),
				disabled: !u.value,
				"data-testid": "row-checkbox",
				modelValue: e.selected,
				"onUpdate:modelValue": f
			}, null, 8, [
				"aria-label",
				"disabled",
				"modelValue"
			])])) : j("", !0),
			h("td", sc, [h("div", cc, [
				w(ac, {
					node: e.node,
					cropImagePreviews: e.cropImagePreviews
				}, null, 8, ["node", "cropImagePreviews"]),
				h("div", {
					class: "file-picker__file-name",
					title: c.value,
					textContent: k(c.value)
				}, null, 8, lc),
				h("div", {
					class: "file-picker__file-extension",
					textContent: k(s.value)
				}, null, 8, uc)
			])]),
			h("td", dc, k(D(pt)(e.node.size || 0)), 1),
			h("td", fc, [w(D(Vt), {
				timestamp: o.value,
				ignoreSeconds: ""
			}, null, 8, ["timestamp"])])
		], 16, oc));
	}
}), [["__scopeId", "data-v-7857e8bd"]]), mc = {
	"aria-hidden": "true",
	class: "file-picker__row loading-row"
}, hc = {
	key: 0,
	class: "row-checkbox"
}, gc = { class: "row-name" }, _c = { class: "row-wrapper" }, vc = /*#__PURE__*/ N(/* @__PURE__ */ Le({
	__name: "LoadingTableRow",
	props: { showCheckbox: { type: Boolean } },
	setup(e) {
		return (t, n) => (M(), O("tr", mc, [
			e.showCheckbox ? (M(), O("td", hc, [...n[0] ||= [h("span", null, null, -1)]])) : j("", !0),
			h("td", gc, [h("div", _c, [h("span", { class: Pe(D(ic)["file-picker__file-icon"]) }, null, 2), n[1] ||= h("span", null, null, -1)])]),
			n[2] ||= h("td", { class: "row-size" }, [h("span")], -1),
			n[3] ||= h("td", { class: "row-modified" }, [h("span")], -1)
		]));
	}
}), [["__scopeId", "data-v-1f96131b"]]);
function yc() {
	let e = ye("files", "config", null), t = A(e?.show_hidden ?? !0), n = A(e?.sort_favorites_first ?? !0), i = A(e?.crop_image_previews ?? !0);
	return Ue(async () => {
		if (Ke()) f.debug("Skip loading files settings - currently on public share");
		else try {
			let { data: e } = await ze.get(Be("/apps/files/api/v1/configs"));
			t.value = e?.data?.show_hidden ?? !1, n.value = e?.data?.sort_favorites_first ?? !0, i.value = e?.data?.crop_image_previews ?? !0;
		} catch (e) {
			f.error("Could not load files settings", { error: e }), o(r("Could not load files settings"));
		}
	}), {
		showHiddenFiles: t,
		sortFavoritesFirst: n,
		cropImagePreviews: i
	};
}
function bc(e) {
	let t = (e) => e === "asc" ? "ascending" : e === "desc" ? "descending" : "none", n = ye("files", "viewConfigs", null), i = A({
		sortBy: n?.files?.sorting_mode ?? "basename",
		order: t(n?.files?.sorting_direction ?? "asc")
	}), a = A({
		sortBy: n?.recent?.sorting_mode ?? "basename",
		order: t(n?.recent?.sorting_direction ?? "asc")
	}), s = A({
		sortBy: n?.favorites?.sorting_mode ?? "basename",
		order: t(n?.favorites?.sorting_direction ?? "asc")
	});
	Ue(async () => {
		if (Ke()) f.debug("Skip loading files views - currently on public share");
		else try {
			let { data: e } = await ze.get(Be("/apps/files/api/v1/views"));
			i.value = {
				sortBy: e?.data?.files?.sorting_mode ?? "basename",
				order: t(e?.data?.files?.sorting_direction)
			}, s.value = {
				sortBy: e?.data?.favorites?.sorting_mode ?? "basename",
				order: t(e?.data?.favorites?.sorting_direction)
			}, a.value = {
				sortBy: e?.data?.recent?.sorting_mode ?? "basename",
				order: t(e?.data?.recent?.sorting_direction)
			};
		} catch (e) {
			f.error("Could not load files views", { error: e }), o(r("Could not load files views"));
		}
	});
	let c = C(() => ve(e || "files") === "files" ? i.value : ve(e) === "recent" ? a.value : s.value);
	return {
		filesViewConfig: i,
		favoritesViewConfig: s,
		recentViewConfig: a,
		currentConfig: c,
		sortBy: C(() => c.value.sortBy),
		order: C(() => c.value.order)
	};
}
var xc = {
	key: 0,
	class: "row-checkbox"
}, Sc = { class: "hidden-visually" }, Cc = ["aria-sort"], wc = { class: "header-wrapper" }, Tc = {
	key: 2,
	style: { width: "44px" }
}, Ec = ["aria-sort"], Dc = {
	key: 2,
	style: { width: "44px" }
}, Oc = ["aria-sort"], kc = {
	key: 2,
	style: { width: "44px" }
}, Ac = /*#__PURE__*/ N(/* @__PURE__ */ Le({
	__name: "FileList",
	props: /*@__PURE__*/ je({
		currentView: {},
		multiselect: { type: Boolean },
		allowPickDirectory: { type: Boolean },
		loading: { type: Boolean },
		files: {},
		canPick: { type: Function }
	}, {
		path: { required: !0 },
		pathModifiers: {},
		selectedFiles: { required: !0 },
		selectedFilesModifiers: {}
	}),
	emits: ["update:path", "update:selectedFiles"],
	setup(e) {
		let t = Te(e, "path"), n = Te(e, "selectedFiles"), i = e, a = A(), { currentConfig: o } = bc(i.currentView), s = C(() => a.value ?? o.value), c = C(() => s.value.sortBy === "basename" ? s.value.order === "none" ? void 0 : s.value.order : void 0), l = C(() => s.value.sortBy === "size" ? s.value.order === "none" ? void 0 : s.value.order : void 0), u = C(() => s.value.sortBy === "mtime" ? s.value.order === "none" ? void 0 : s.value.order : void 0);
		function d(e) {
			s.value.sortBy === e ? s.value.order === "ascending" ? a.value = {
				sortBy: s.value.sortBy,
				order: "descending"
			} : a.value = {
				sortBy: s.value.sortBy,
				order: "ascending"
			} : a.value = {
				sortBy: e,
				order: "ascending"
			};
		}
		let { sortFavoritesFirst: f, cropImagePreviews: p } = yc(), m = C(() => ot(i.files, {
			sortFoldersFirst: !0,
			sortFavoritesFirst: f.value,
			sortingOrder: s.value.order === "descending" ? "desc" : "asc",
			sortingMode: s.value.sortBy
		})), g = C(() => i.files.filter((e) => i.allowPickDirectory || e.type !== Ye.Folder)), v = C(() => !i.loading && n.value.length > 0 && n.value.length >= g.value.length);
		function y() {
			n.value.length < g.value.length ? n.value = [...g.value] : n.value = [];
		}
		function b(e) {
			n.value.includes(e) ? n.value = n.value.filter((t) => t.path !== e.path) : i.multiselect ? n.value = [...n.value, e] : n.value = [e];
		}
		function x(e) {
			t.value = e.path;
		}
		let ee = A(4), te = A();
		{
			let e = () => Se(() => {
				let e = te.value?.parentElement?.children || [], t = te.value?.parentElement?.clientHeight || 450;
				for (let n = 0; n < e.length; n++) te.value?.isSameNode(e[n]) || (t -= e[n].clientHeight);
				ee.value = Math.max(1, Math.floor((t - 50) / 50));
			});
			Ue(() => {
				window.addEventListener("resize", e), e();
			}), he(() => {
				window.removeEventListener("resize", e);
			});
		}
		return (t, i) => (M(), O("div", {
			ref_key: "fileContainer",
			ref: te,
			class: "file-picker__files"
		}, [h("table", null, [h("thead", null, [h("tr", null, [
			e.multiselect ? (M(), O("th", xc, [h("span", Sc, k(D(r)("Select entry")), 1), e.multiselect ? (M(), T(D(Ce), {
				key: 0,
				"aria-label": D(r)("Select all entries"),
				"data-testid": "select-all-checkbox",
				modelValue: v.value,
				"onUpdate:modelValue": y
			}, null, 8, ["aria-label", "modelValue"])) : j("", !0)])) : j("", !0),
			h("th", {
				"aria-sort": c.value,
				class: "row-name"
			}, [h("div", wc, [i[3] ||= h("span", { class: "file-picker__header-preview" }, null, -1), w(D(be), {
				"data-test": "file-picker_sort-name",
				variant: "tertiary",
				wide: "",
				onClick: i[0] ||= (e) => d("basename")
			}, {
				icon: S(() => [c.value === "ascending" ? (M(), T(Zs, {
					key: 0,
					size: 20
				})) : c.value === "descending" ? (M(), T(Gs, {
					key: 1,
					size: 20
				})) : (M(), O("span", Tc))]),
				default: S(() => [we(" " + k(D(r)("Name")), 1)]),
				_: 1
			})])], 8, Cc),
			h("th", {
				"aria-sort": l.value,
				class: "row-size"
			}, [w(D(be), {
				variant: "tertiary",
				wide: "",
				onClick: i[1] ||= (e) => d("size")
			}, {
				icon: S(() => [l.value === "ascending" ? (M(), T(Zs, {
					key: 0,
					size: 20
				})) : l.value === "descending" ? (M(), T(Gs, {
					key: 1,
					size: 20
				})) : (M(), O("span", Dc))]),
				default: S(() => [we(" " + k(D(r)("Size")), 1)]),
				_: 1
			})], 8, Ec),
			h("th", {
				"aria-sort": u.value,
				class: "row-modified"
			}, [w(D(be), {
				variant: "tertiary",
				wide: "",
				onClick: i[2] ||= (e) => d("mtime")
			}, {
				icon: S(() => [u.value === "ascending" ? (M(), T(Zs, {
					key: 0,
					size: 20
				})) : u.value === "descending" ? (M(), T(Gs, {
					key: 1,
					size: 20
				})) : (M(), O("span", kc))]),
				default: S(() => [we(" " + k(D(r)("Modified")), 1)]),
				_: 1
			})], 8, Oc)
		])]), h("tbody", null, [e.loading ? (M(!0), O(de, { key: 0 }, _(ee.value, (t) => (M(), T(vc, {
			key: t,
			showCheckbox: e.multiselect
		}, null, 8, ["showCheckbox"]))), 128)) : (M(!0), O(de, { key: 1 }, _(m.value, (t) => (M(), T(pc, {
			key: t.fileid || t.path,
			allowPickDirectory: e.allowPickDirectory,
			showCheckbox: e.multiselect,
			canPick: e.canPick === void 0 || e.canPick(t),
			selected: n.value.includes(t),
			node: t,
			cropImagePreviews: D(p),
			"onUpdate:selected": (e) => b(t),
			onEnterDirectory: x
		}, null, 8, [
			"allowPickDirectory",
			"showCheckbox",
			"canPick",
			"selected",
			"node",
			"cropImagePreviews",
			"onUpdate:selected"
		]))), 128))])])], 512));
	}
}), [["__scopeId", "data-v-03ad4b4a"]]), jc = {
	name: "HomeIcon",
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
}, Mc = ["aria-hidden", "aria-label"], Nc = [
	"fill",
	"width",
	"height"
], Pc = { key: 0 };
function Fc(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon home-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Pc, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" }, null, -1)], 8, Nc))], 16, Mc);
}
var Ic = /*#__PURE__*/ N(jc, [["render", Fc]]), Lc = {
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
}, Rc = ["aria-hidden", "aria-label"], zc = [
	"fill",
	"width",
	"height"
], Bc = { key: 0 };
function Vc(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon plus-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Bc, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" }, null, -1)], 8, zc))], 16, Rc);
}
var Hc = /*#__PURE__*/ N(Lc, [["render", Vc]]), Uc = ["aria-label"], Wc = ["for"], Gc = /*#__PURE__*/ N(/* @__PURE__ */ Le({
	__name: "FilePickerBreadcrumbs",
	props: /*@__PURE__*/ je({ showMenu: { type: Boolean } }, {
		path: { required: !0 },
		pathModifiers: {}
	}),
	emits: /*@__PURE__*/ je(["createNode"], ["update:path"]),
	setup(e, { emit: t }) {
		let n = Te(e, "path"), i = t, a = A(!1), o = A(""), c = g(), l = ne("nameInput");
		function u() {
			let e = o.value.trim(), t = l.value?.$el?.querySelector("input"), n = "";
			try {
				ut(e);
			} catch (e) {
				if (!(e instanceof lt)) throw e;
				switch (e.reason) {
					case ct.Character:
						n = r("\"{char}\" is not allowed inside a folder name.", { char: e.segment });
						break;
					case ct.ReservedName:
						n = r("\"{segment}\" is a reserved name and not allowed for folder names.", { segment: e.segment });
						break;
					case ct.Extension:
						n = r("Folder names must not end with \"{extension}\".", { extension: e.segment });
						break;
					default: n = r("Invalid folder name.");
				}
			}
			return t && t.setCustomValidity(n), n === "";
		}
		function d() {
			let e = o.value.trim();
			u() ? (a.value = !1, i("createNode", e), o.value = "") : l.value?.$el?.querySelector("input")?.reportValidity();
		}
		let f = C(() => n.value.split("/").filter((e) => e !== "").map((e, t, n) => ({
			name: e,
			path: "/" + n.slice(0, t + 1).join("/")
		})));
		return (t, i) => (M(), T(D(an), { class: "file-picker__breadcrumbs" }, Ie({
			default: S(() => [w(D(Zt), {
				name: D(r)("All files"),
				title: D(r)("Home"),
				onClick: i[0] ||= (e) => n.value = "/"
			}, {
				icon: S(() => [w(Ic, { size: 20 })]),
				_: 1
			}, 8, ["name", "title"]), (M(!0), O(de, null, _(f.value, (e) => (M(), T(D(Zt), {
				key: e.path,
				name: e.name,
				title: e.path,
				onClick: (t) => n.value = e.path
			}, null, 8, [
				"name",
				"title",
				"onClick"
			]))), 128))]),
			_: 2
		}, [e.showMenu ? {
			name: "actions",
			fn: S(() => [w(D(We), {
				shown: a.value,
				"onUpdate:shown": i[3] ||= (e) => a.value = e,
				popupRole: "dialog",
				onAfterHide: i[4] ||= (e) => o.value = ""
			}, {
				trigger: S(() => [w(D(be), {
					"aria-label": D(r)("Create directory"),
					variant: "secondary"
				}, {
					icon: S(() => [w(Hc, { size: 20 })]),
					default: S(() => [we(" " + k(D(r)("New")), 1)]),
					_: 1
				}, 8, ["aria-label"])]),
				default: S(() => [h("form", {
					class: "file-picker__new-folder",
					role: "dialog",
					"aria-label": D(r)("Create directory"),
					onSubmit: x(d, ["prevent"]),
					onKeydown: i[2] ||= Me((e) => a.value = !1, ["esc"])
				}, [
					w(rc, { size: 20 }),
					h("label", {
						class: "file-picker__new-folder-label",
						for: D(c)
					}, k(D(r)("New folder")), 9, Wc),
					w(D(s), {
						id: D(c),
						ref_key: "nameInput",
						ref: l,
						modelValue: o.value,
						"onUpdate:modelValue": [i[1] ||= (e) => o.value = e, u],
						class: "file-picker__new-folder-input",
						labelOutside: "",
						placeholder: D(r)("New folder name"),
						showTrailingButton: "",
						trailingButtonIcon: "arrowEnd",
						trailingButtonLabel: D(r)("Create directory"),
						onTrailingButtonClick: d
					}, null, 8, [
						"id",
						"modelValue",
						"placeholder",
						"trailingButtonLabel"
					])
				], 40, Uc)]),
				_: 1
			}, 8, ["shown"])]),
			key: "0"
		} : void 0]), 1024));
	}
}), [["__scopeId", "data-v-5eb8b83a"]]), Kc = {
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
}, qc = ["aria-hidden", "aria-label"], Jc = [
	"fill",
	"width",
	"height"
], Yc = { key: 0 };
function Xc(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon close-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", Yc, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }, null, -1)], 8, Jc))], 16, qc);
}
var Zc = /*#__PURE__*/ N(Kc, [["render", Xc]]), Qc = {
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
}, $c = ["aria-hidden", "aria-label"], el = [
	"fill",
	"width",
	"height"
], tl = { key: 0 };
function nl(e, t, n, r, i, a) {
	return M(), O("span", E(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon magnify-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(M(), O("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (M(), O("title", tl, k(n.title), 1)) : j("", !0), t[1] ||= h("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" }, null, -1)], 8, el))], 16, $c);
}
var rl = /*#__PURE__*/ N(Qc, [["render", nl]]);
function il(e) {
	let t = [
		{
			id: "files",
			label: r("All files"),
			icon: Pt
		},
		{
			id: "recent",
			label: r("Recent"),
			icon: Nt
		},
		{
			id: "favorites",
			label: r("Favorites"),
			icon: Rt
		}
	];
	return {
		allViews: t,
		availableViews: e.value ? t.filter(({ id: e }) => e === "files") : t
	};
}
var al = {
	key: 0,
	class: "file-picker__side"
}, ol = /*#__PURE__*/ N(/* @__PURE__ */ Le({
	__name: "FilePickerNavigation",
	props: {
		currentView: {},
		filterString: {},
		isCollapsed: { type: Boolean },
		disabledNavigation: { type: Boolean }
	},
	emits: ["update:currentView", "update:filterString"],
	setup(e, { emit: t }) {
		let n = e, i = t, { availableViews: a } = il(A(ce() === null)), o = C(() => a.filter((e) => e.id === n.currentView)[0] ?? a[0]), c = (e) => i("update:filterString", e.toString());
		return (t, n) => (M(), O(de, null, [w(D(s), {
			class: "file-picker__filter-input",
			label: D(r)("Filter file list"),
			showTrailingButton: !!e.filterString,
			modelValue: e.filterString,
			"onUpdate:modelValue": c,
			onTrailingButtonClick: n[0] ||= (e) => c("")
		}, {
			"trailing-button-icon": S(() => [w(Zc, { size: 16 })]),
			default: S(() => [w(rl, { size: 16 })]),
			_: 1
		}, 8, [
			"label",
			"showTrailingButton",
			"modelValue"
		]), D(a).length > 1 && !e.disabledNavigation ? (M(), O(de, { key: 0 }, [e.isCollapsed ? (M(), T(D(u), {
			key: 1,
			"aria-label": D(r)("Current view selector"),
			clearable: !1,
			searchable: !1,
			options: D(a),
			modelValue: o.value,
			"onUpdate:modelValue": n[1] ||= (e) => i("update:currentView", e.id)
		}, null, 8, [
			"aria-label",
			"options",
			"modelValue"
		])) : (M(), O("ul", al, [(M(!0), O(de, null, _(D(a), (n) => (M(), O("li", { key: n.id }, [w(D(be), {
			variant: e.currentView === n.id ? "primary" : "tertiary",
			wide: !0,
			onClick: (e) => t.$emit("update:currentView", n.id)
		}, {
			icon: S(() => [w(D(xe), {
				path: n.icon,
				size: 20
			}, null, 8, ["path"])]),
			default: S(() => [we(" " + k(n.label), 1)]),
			_: 2
		}, 1032, ["variant", "onClick"])]))), 128))]))], 64)) : j("", !0)], 64));
	}
}), [["__scopeId", "data-v-e1c54e23"]]);
async function sl({ client: e, signal: t }) {
	let n = Math.round(Date.now() / 1e3) - 1209600, { data: r } = await e.search("/", {
		signal: t,
		details: !0,
		data: Es(n)
	});
	return r.results.map((e) => Ns(e));
}
async function cl({ client: e, path: t, signal: n }) {
	let r = (await e.getDirectoryContents(l(Os, t), {
		signal: n,
		details: !0,
		includeSelf: !0,
		data: ws()
	})).data.map((e) => Ns(e));
	return {
		contents: r.filter(({ path: e }) => e !== t),
		folder: r.find(({ path: e }) => t === e)
	};
}
async function ll(e, t) {
	let { data: n } = await e.stat(l(Os, t), {
		details: !0,
		data: ws()
	});
	return Ns(n);
}
function ul(e, t) {
	let n = js(), r = ue([]), i = ue(null), a = A(!0), o;
	async function s(e) {
		let i = l(t.value, e);
		await n.createDirectory(l(Os, i));
		let a = await ll(n, i);
		return r.value = [...r.value, a], a;
	}
	async function c() {
		o && o.abort();
		let s = new AbortController();
		o = s, a.value = !0;
		try {
			if (e.value === "favorites") r.value = await Ms({
				client: n,
				path: t.value,
				signal: s.signal
			}), i.value = null;
			else if (e.value === "recent") r.value = await sl({
				client: n,
				signal: s.signal
			}), i.value = null;
			else {
				let e = await cl({
					client: n,
					path: t.value,
					signal: s.signal
				});
				i.value = e.folder, r.value = e.contents;
			}
		} catch (e) {
			if (e instanceof Error && e.name === "AbortError") return;
			throw e;
		} finally {
			o === s && (o = void 0, a.value = !1);
		}
	}
	return v([e, t], () => c()), Ue(() => c()), {
		isLoading: a,
		files: r,
		folder: i,
		loadFiles: c,
		createDirectory: s
	};
}
function dl(e) {
	let t = C(() => e.value.map((e) => e.split("/")));
	return { isSupportedMimeType: (e) => {
		let n = e.split("/");
		return t.value.some(([e, t]) => (n[0] === e || e === "*") && (n[1] === t || t === "*"));
	} };
}
var fl = { class: "file-picker__main" }, pl = {
	key: 1,
	class: "file-picker__view"
}, ml = /*#__PURE__*/ N(/* @__PURE__ */ Le({
	__name: "FilePicker",
	props: {
		buttons: {},
		name: {},
		allowPickDirectory: {
			type: Boolean,
			default: !1
		},
		noMenu: {
			type: Boolean,
			default: !1
		},
		disabledNavigation: {
			type: Boolean,
			default: !1
		},
		filterFn: {
			type: Function,
			default: void 0
		},
		canPickFn: {
			type: Function,
			default: void 0
		},
		mimetypeFilter: { default: () => [] },
		multiselect: {
			type: Boolean,
			default: !1
		},
		path: { default: void 0 }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, a = t, s = A(!0), c = A("files"), l = A(window?.sessionStorage.getItem("NC.FilePicker.LastPath") || "/"), u = A(""), d = C({
			get: () => c.value === "files" ? u.value || n.path || l.value : "/",
			set: (e) => {
				u.value = e;
			}
		}), m = ue([]), g = A(""), { files: _, folder: y, isLoading: b, loadFiles: x, createDirectory: ee } = ul(c, d);
		v([u], () => {
			n.path === void 0 && u.value && window.sessionStorage.setItem("NC.FilePicker.LastPath", u.value), m.value = [], g.value = "";
		});
		let ne = !1, re = C(() => {
			let e = m.value.length === 0 && n.allowPickDirectory && y.value && (!n.canPickFn || n.canPickFn(y.value)) ? [y.value] : m.value;
			return (typeof n.buttons == "function" ? n.buttons(e, d.value, c.value) : n.buttons).map((t) => ({
				...t,
				disabled: t.disabled || b.value,
				callback: () => {
					ne = !0, ae(t.callback, e);
				}
			}));
		});
		async function ae(e, t) {
			await e(t), a("close", t), ne = !1;
		}
		let oe = C(() => c.value === "favorites" ? r("Favorites") : c.value === "recent" ? r("Recent") : ""), { isSupportedMimeType: se } = dl(ie(n, "mimetypeFilter"));
		Ue(() => x());
		let { showHiddenFiles: ce } = yc(), le = C(() => {
			let e = _.value;
			return ce.value || (e = e.filter((e) => !e.basename.startsWith("."))), n.mimetypeFilter.length > 0 && (e = e.filter((e) => e.type === "folder" || e.mime && se(e.mime))), g.value && (e = e.filter((e) => e.basename.toLowerCase().includes(g.value.toLowerCase()))), n.filterFn && (e = e.filter((e) => n.filterFn(e))), e;
		}), de = C(() => c.value === "files" ? r("Upload some content or sync with your devices!") : c.value === "recent" ? r("Files and folders you recently modified will show up here.") : r("Files and folders you mark as favorite will show up here."));
		async function fe(e) {
			try {
				let t = await ee(e);
				u.value = t.path, te("files:node:created", _.value.filter((t) => t.basename === e)[0]);
			} catch (t) {
				f.warn("Could not create new folder", {
					name: e,
					error: t
				}), o(r("Could not create the new folder"));
			}
		}
		function pe(e) {
			!e && !ne && a("close");
		}
		return (t, n) => (M(), T(D(p), {
			open: s.value,
			"onUpdate:open": [n[6] ||= (e) => s.value = e, pe],
			buttons: re.value,
			name: e.name,
			size: "large",
			contentClasses: "file-picker__content",
			dialogClasses: "file-picker",
			navigationClasses: "file-picker__navigation"
		}, {
			navigation: S(({ isCollapsed: t }) => [w(ol, {
				currentView: c.value,
				"onUpdate:currentView": n[0] ||= (e) => c.value = e,
				filterString: g.value,
				"onUpdate:filterString": n[1] ||= (e) => g.value = e,
				isCollapsed: t,
				disabledNavigation: e.disabledNavigation
			}, null, 8, [
				"currentView",
				"filterString",
				"isCollapsed",
				"disabledNavigation"
			])]),
			default: S(() => [h("div", fl, [c.value === "files" ? (M(), T(Gc, {
				key: 0,
				path: d.value,
				"onUpdate:path": n[2] ||= (e) => d.value = e,
				showMenu: !e.noMenu,
				onCreateNode: fe
			}, null, 8, ["path", "showMenu"])) : (M(), O("div", pl, [h("h3", null, k(oe.value), 1)])), D(b) || le.value.length > 0 ? (M(), T(Ac, {
				key: 2,
				path: d.value,
				"onUpdate:path": [n[3] ||= (e) => d.value = e, n[5] ||= (e) => c.value = "files"],
				selectedFiles: m.value,
				"onUpdate:selectedFiles": n[4] ||= (e) => m.value = e,
				allowPickDirectory: e.allowPickDirectory,
				currentView: c.value,
				files: le.value,
				multiselect: e.multiselect,
				loading: D(b),
				name: oe.value,
				canPick: e.canPickFn
			}, null, 8, [
				"path",
				"selectedFiles",
				"allowPickDirectory",
				"currentView",
				"files",
				"multiselect",
				"loading",
				"name",
				"canPick"
			])) : g.value ? (M(), T(D(i), {
				key: 3,
				name: D(r)("No matching files"),
				description: D(r)("No files matching your filter were found.")
			}, {
				icon: S(() => [w(zs)]),
				_: 1
			}, 8, ["name", "description"])) : (M(), T(D(i), {
				key: 4,
				name: D(r)("No files in here"),
				description: de.value
			}, {
				icon: S(() => [w(zs)]),
				_: 1
			}, 8, ["name", "description"]))])]),
			_: 1
		}, 8, [
			"open",
			"buttons",
			"name"
		]));
	}
}), [["__scopeId", "data-v-39182aaf"]]);
export { ml as default };
