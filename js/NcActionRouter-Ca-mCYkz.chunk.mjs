import { n as e, r as t, t as n } from "./rolldown-runtime-QGRDbDUS.chunk.mjs";
// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function r(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var i = {}, a = [], o = () => {}, s = () => !1, c = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), l = (e) => e.startsWith("onUpdate:"), u = Object.assign, d = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, f = Object.prototype.hasOwnProperty, p = (e, t) => f.call(e, t), m = Array.isArray, h = (e) => T(e) === "[object Map]", g = (e) => T(e) === "[object Set]", _ = (e) => T(e) === "[object Date]", v = (e) => T(e) === "[object RegExp]", y = (e) => typeof e == "function", b = (e) => typeof e == "string", x = (e) => typeof e == "symbol", S = (e) => typeof e == "object" && !!e, C = (e) => (S(e) || y(e)) && y(e.then) && y(e.catch), w = Object.prototype.toString, T = (e) => w.call(e), E = (e) => T(e).slice(8, -1), D = (e) => T(e) === "[object Object]", O = (e) => b(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, k = /* @__PURE__ */ r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ee = /* @__PURE__ */ r("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, A = /* @__PURE__ */ te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, j = /* @__PURE__ */ te((e) => e.replace(re, "-$1").toLowerCase()), ie = /* @__PURE__ */ te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ae = /* @__PURE__ */ te((e) => e ? `on${ie(e)}` : ""), M = (e, t) => !Object.is(e, t), oe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, se = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ce = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, le = (e) => {
	let t = b(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, N, ue = () => N ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function de(e, t) {
	return e + JSON.stringify(t, (e, t) => typeof t == "function" ? t.toString() : t);
}
var fe = /* @__PURE__ */ r("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function pe(e) {
	if (m(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = b(r) ? _e(r) : pe(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (b(e) || S(e)) return e;
}
var me = /;(?![^(]*\))/g, he = /:([^]+)/, ge = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function _e(e) {
	let t = {};
	return e.replace(ge, (e) => e.startsWith("/*") ? "" : e).split(me).forEach((e) => {
		if (e) {
			let n = e.split(he);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function ve(e) {
	let t = "";
	if (b(e)) t = e;
	else if (m(e)) for (let n = 0; n < e.length; n++) {
		let r = ve(e[n]);
		r && (t += r + " ");
	}
	else if (S(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
function P(e) {
	if (!e) return null;
	let { class: t, style: n } = e;
	return t && !b(t) && (e.class = ve(t)), n && (e.style = pe(n)), e;
}
var ye = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", be = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", xe = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Se = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", Ce = /* @__PURE__ */ r(ye), we = /* @__PURE__ */ r(be), Te = /* @__PURE__ */ r(xe), Ee = /* @__PURE__ */ r(Se), De = /* @__PURE__ */ r("itemscope,allowfullscreen,disablepictureinpicture,disableremoteplayback,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly");
function Oe(e) {
	return !!e || e === "";
}
function ke(e, t, n) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let i = 0; r && i < e.length; i++) r = Ne(e[i], t[i], n);
	return r;
}
function Ae(e, t, n) {
	if (e.size !== t.size) return !1;
	let r = Array.from(t), i = new Uint8Array(r.length);
	for (let t of e) {
		let e = -1;
		for (let a = 0; a < r.length; a++) if (!i[a] && Ne(t, r[a], n)) {
			e = a;
			break;
		}
		if (e < 0) return !1;
		i[e] = 1;
	}
	return !0;
}
function je(e, t, n) {
	let r = h(e), i = h(t);
	if (r || i || (r = g(e), i = g(t), r || i)) return r && i ? Ae(e, t, n) : !1;
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let r in e) {
		let i = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
		if (i && !a || !i && a || !Ne(e[r], t[r], n)) return !1;
	}
	return String(e) === String(t);
}
function Me(e, t, n, r) {
	n ||= [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	let [i, a] = n;
	if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
	i.set(e, t), a.set(t, e);
	let o = r(e, t, n);
	return i.delete(e), a.delete(t), o;
}
function Ne(e, t, n) {
	if (e === t) return !0;
	let r = _(e), i = _(t);
	return r || i ? r && i ? e.getTime() === t.getTime() : !1 : (r = x(e), i = x(t), r || i ? e === t : (r = m(e), i = m(t), r || i ? r && i ? Me(e, t, n, ke) : !1 : (r = S(e), i = S(t), r || i ? !r || !i ? !1 : Me(e, t, n, je) : String(e) === String(t))));
}
function Pe(e, t) {
	return e.findIndex((e) => Ne(e, t));
}
var Fe = (e) => !!(e && e.__v_isRef === !0), F = (e) => b(e) ? e : e == null ? "" : m(e) || S(e) && (e.toString === w || !y(e.toString)) ? Fe(e) ? F(e.value) : JSON.stringify(e, Ie, 2) : String(e), Ie = (e, t) => Fe(t) ? Ie(e, t.value) : h(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Le(t, r) + " =>"] = n, e), {}) } : g(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Le(e)) } : x(t) ? Le(t) : S(t) && !m(t) && !D(t) ? String(t) : t, Le = (e, t = "") => x(e) ? `Symbol(${e.description ?? t})` : e;
function Re(e) {
	return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : String(e);
}
// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var ze, Be = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ze && (ze.active ? (this.parent = ze, this.index = (ze.scopes || (ze.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = ze;
			try {
				return ze = this, e();
			} finally {
				ze = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = ze, ze = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (ze === this) ze = this.prevScope;
			else {
				let e = ze;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ve(e) {
	return new Be(e);
}
function He() {
	return ze;
}
function Ue(e, t = !1) {
	ze && (ze.active ? ze.cleanups.push(e) : e());
}
var I, We = /* @__PURE__ */ new WeakSet(), Ge = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ze && (ze.active ? ze.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, We.has(this) && (We.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ye(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, ut(this), Qe(this);
		let e = I, t = ot;
		I = this, ot = !0;
		try {
			return this.fn();
		} finally {
			$e(this), I = e, ot = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) nt(e);
			this.deps = this.depsTail = void 0, ut(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? We.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		et(this) && this.run();
	}
	get dirty() {
		return et(this);
	}
}, Ke = 0, qe, Je;
function Ye(e, t = !1) {
	e.flags |= 8, t ? (e.next = Je, Je = e) : (e.next = qe, qe = e);
}
function Xe() {
	Ke++;
}
function Ze() {
	if (--Ke > 0) return;
	if (Je) {
		let e = Je;
		for (Je = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; qe;) {
		let t = qe;
		for (qe = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Qe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function $e(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), nt(r), rt(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function et(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (tt(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function tt(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === dt) || (e.globalVersion = dt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !et(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = I, r = ot;
	I = e, ot = !0;
	try {
		Qe(e);
		let n = e.fn(e._value);
		(t.version === 0 || M(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		I = n, ot = r, $e(e), e.flags &= -3;
	}
}
function nt(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) nt(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function rt(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function it(e, t) {
	e.effect instanceof Ge && (e = e.effect.fn);
	let n = new Ge(e);
	t && u(n, t);
	try {
		n.run();
	} catch (e) {
		throw n.stop(), e;
	}
	let r = n.run.bind(n);
	return r.effect = n, r;
}
function at(e) {
	e.effect.stop();
}
var ot = !0, st = [];
function ct() {
	st.push(ot), ot = !1;
}
function lt() {
	let e = st.pop();
	ot = e === void 0 || e;
}
function ut(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = I;
		I = void 0;
		try {
			t();
		} finally {
			I = e;
		}
	}
}
var dt = 0, ft = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, pt = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!I || !ot || I === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== I) t = this.activeLink = new ft(I, this), I.deps ? (t.prevDep = I.depsTail, I.depsTail.nextDep = t, I.depsTail = t) : I.deps = I.depsTail = t, mt(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = I.depsTail, t.nextDep = void 0, I.depsTail.nextDep = t, I.depsTail = t, I.deps === t && (I.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, dt++, this.notify(e);
	}
	notify(e) {
		Xe();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ze();
		}
	}
};
function mt(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) mt(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var ht = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ Symbol(""), _t = /* @__PURE__ */ Symbol(""), vt = /* @__PURE__ */ Symbol("");
function yt(e, t, n) {
	if (ot && I) {
		let t = ht.get(e);
		t || ht.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new pt()), r.map = t, r.key = n), r.track();
	}
}
function bt(e, t, n, r, i, a) {
	let o = ht.get(e);
	if (!o) {
		dt++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Xe(), t === "clear") o.forEach(s);
	else {
		let i = m(e), a = i && O(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === vt || !x(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(vt)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(gt)), h(e) && s(o.get(_t)));
				break;
			case "delete":
				i || (s(o.get(gt)), h(e) && s(o.get(_t)));
				break;
			case "set": h(e) && s(o.get(gt));
		}
	}
	Ze();
}
function xt(e, t) {
	let n = ht.get(e);
	return n && n.get(t);
}
function St(e) {
	let t = /* @__PURE__ */ L(e);
	return t === e || (yt(t, "iterate", vt), /* @__PURE__ */ fn(e)) ? t : /* @__PURE__ */ dn(e) ? /* @__PURE__ */ un(e) ? t.map((e) => gn(hn(e))) : t.map(gn) : t.map(hn);
}
function Ct(e) {
	return yt(e = /* @__PURE__ */ L(e), "iterate", vt), e;
}
function wt(e, t) {
	return /* @__PURE__ */ dn(e) ? gn(/* @__PURE__ */ un(e) ? hn(t) : t) : hn(t);
}
var Tt = {
	__proto__: null,
	[Symbol.iterator]() {
		return Et(this, Symbol.iterator, (e) => wt(this, e));
	},
	concat(...e) {
		return St(this).concat(...e.map((e) => m(e) ? St(e) : e));
	},
	entries() {
		return Et(this, "entries", (e) => (e[1] = wt(this, e[1]), e));
	},
	every(e, t) {
		return kt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return kt(this, "filter", e, t, (e) => e.map((e) => wt(this, e)), arguments);
	},
	find(e, t) {
		return kt(this, "find", e, t, (e) => wt(this, e), arguments);
	},
	findIndex(e, t) {
		return kt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return kt(this, "findLast", e, t, (e) => wt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return kt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return kt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return jt(this, "includes", e);
	},
	indexOf(...e) {
		return jt(this, "indexOf", e);
	},
	join(e) {
		return St(this).join(e);
	},
	lastIndexOf(...e) {
		return jt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return kt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Mt(this, "pop");
	},
	push(...e) {
		return Mt(this, "push", e);
	},
	reduce(e, ...t) {
		return At(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return At(this, "reduceRight", e, t);
	},
	shift() {
		return Mt(this, "shift");
	},
	some(e, t) {
		return kt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Mt(this, "splice", e);
	},
	toReversed() {
		return St(this).toReversed();
	},
	toSorted(e) {
		return St(this).toSorted(e);
	},
	toSpliced(...e) {
		return St(this).toSpliced(...e);
	},
	unshift(...e) {
		return Mt(this, "unshift", e);
	},
	values() {
		return Et(this, "values", (e) => wt(this, e));
	}
};
function Et(e, t, n) {
	let r = Ct(e), i = r[t], a = i.call(r);
	if (r !== e && !/* @__PURE__ */ fn(e)) {
		if (a[Symbol.toStringTag] === "Array Iterator") {
			let e = Object.create(Object.getPrototypeOf(a));
			return e.next = () => Dt(a.next(), n), i !== Ot[t] && Object.defineProperties(e, {
				return: { get() {
					let e = a.return;
					return typeof e == "function" ? e.bind(a) : e;
				} },
				throw: { get() {
					let e = a.throw;
					return typeof e == "function" ? e.bind(a) : e;
				} }
			}), e;
		}
		a._next = a.next, a.next = () => Dt(a._next(), n);
	}
	return a;
}
function Dt(e, t) {
	return e.done || (e.value = t(e.value)), e;
}
var Ot = Array.prototype;
function kt(e, t, n, r, i, a) {
	let o = Ct(e), s = o !== e && !/* @__PURE__ */ fn(e), c = o[t];
	if (c !== Ot[t]) {
		let t = c.apply(e, a);
		return s ? hn(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, wt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function At(e, t, n, r) {
	let i = Ct(e), a = i !== e && !/* @__PURE__ */ fn(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = wt(e, t)), n.call(this, t, wt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? wt(e, c) : c;
}
function jt(e, t, n) {
	let r = /* @__PURE__ */ L(e);
	yt(r, "iterate", vt);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ pn(n[0]) ? (n[0] = /* @__PURE__ */ L(n[0]), r[t](...n)) : i;
}
function Mt(e, t, n = []) {
	ct(), Xe();
	let r = (/* @__PURE__ */ L(e))[t].apply(e, n);
	return Ze(), lt(), r;
}
var Nt = /* @__PURE__ */ r("__proto__,__v_isRef,__isVue"), Pt = /* @__PURE__ */ new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(x));
function Ft(e) {
	x(e) || (e = String(e));
	let t = /* @__PURE__ */ L(this);
	return yt(t, "has", e), t.hasOwnProperty(e);
}
var It = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? nn : tn : i ? en : $t).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = m(e);
		if (!r) {
			let e;
			if (a && (e = Tt[t])) return e;
			if (t === "hasOwnProperty") return Ft;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ R(e) ? e : n);
		if ((x(t) ? Pt.has(t) : Nt(t)) || (r || yt(e, "get", t), i)) return o;
		if (/* @__PURE__ */ R(o)) {
			let e = a && O(t) ? o : o.value;
			return r && S(e) ? /* @__PURE__ */ sn(e) : e;
		}
		return S(o) ? r ? /* @__PURE__ */ sn(o) : /* @__PURE__ */ an(o) : o;
	}
}, Lt = class extends It {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = m(e) && O(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ dn(i);
			if (!/* @__PURE__ */ fn(n) && !/* @__PURE__ */ dn(n) && (i = /* @__PURE__ */ L(i), n = /* @__PURE__ */ L(n)), !a && /* @__PURE__ */ R(i) && !/* @__PURE__ */ R(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : p(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ R(e) ? e : r);
		return e === /* @__PURE__ */ L(r) && s && (o ? M(n, i) && bt(e, "set", t, n, i) : bt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = p(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && bt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return x(t) && Pt.has(t) || yt(e, "has", t), n;
	}
	ownKeys(e) {
		return yt(e, "iterate", m(e) ? "length" : gt), Reflect.ownKeys(e);
	}
}, Rt = class extends It {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, zt = /* @__PURE__ */ new Lt(), Bt = /* @__PURE__ */ new Rt(), Vt = /* @__PURE__ */ new Lt(!0), Ht = /* @__PURE__ */ new Rt(!0), Ut = (e) => e, Wt = (e) => Reflect.getPrototypeOf(e);
function Gt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ L(i), o = h(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), d = n ? Ut : t ? gn : hn;
		return !t && yt(a, "iterate", c ? _t : gt), u(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Kt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function qt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ L(r), a = /* @__PURE__ */ L(n);
			e || (M(n, a) && yt(i, "get", n), yt(i, "get", a));
			let { has: o } = Wt(i), s = t ? Ut : e ? gn : hn;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && yt(/* @__PURE__ */ L(t), "iterate", gt), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ L(n), i = /* @__PURE__ */ L(t);
			return e || (M(t, i) && yt(r, "has", t), yt(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ L(a), s = t ? Ut : e ? gn : hn;
			return !e && yt(o, "iterate", gt), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return u(n, e ? {
		add: Kt("add"),
		set: Kt("set"),
		delete: Kt("delete"),
		clear: Kt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ L(this), r = Wt(n), i = /* @__PURE__ */ L(e), a = !t && !/* @__PURE__ */ fn(e) && !/* @__PURE__ */ dn(e) ? i : e;
			return r.has.call(n, a) || M(e, a) && r.has.call(n, e) || M(i, a) && r.has.call(n, i) || (n.add(a), bt(n, "add", a, a)), this;
		},
		set(e, n) {
			t || /* @__PURE__ */ fn(n) || /* @__PURE__ */ dn(n) || (n = /* @__PURE__ */ L(n));
			let r = /* @__PURE__ */ L(this), { has: i, get: a } = Wt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ L(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? M(n, s) && bt(r, "set", e, n, s) : bt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ L(this), { has: n, get: r } = Wt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ L(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && bt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ L(this), t = e.size !== 0, n = e.clear();
			return t && bt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Gt(r, e, t);
	}), n;
}
function Jt(e, t) {
	let n = qt(e, t);
	return (r, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? r : Reflect.get(p(n, i) && i in r ? n : r, i, a);
}
var Yt = { get: /* @__PURE__ */ Jt(!1, !1) }, Xt = { get: /* @__PURE__ */ Jt(!1, !0) }, Zt = { get: /* @__PURE__ */ Jt(!0, !1) }, Qt = { get: /* @__PURE__ */ Jt(!0, !0) }, $t = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap(), tn = /* @__PURE__ */ new WeakMap(), nn = /* @__PURE__ */ new WeakMap();
function rn(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function an(e) {
	return /* @__PURE__ */ dn(e) ? e : ln(e, !1, zt, Yt, $t);
}
// @__NO_SIDE_EFFECTS__
function on(e) {
	return ln(e, !1, Vt, Xt, en);
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
	return ln(e, !0, Bt, Zt, tn);
}
// @__NO_SIDE_EFFECTS__
function cn(e) {
	return ln(e, !0, Ht, Qt, nn);
}
function ln(e, t, n, r, i) {
	if (!S(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = rn(E(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function un(e) {
	return /* @__PURE__ */ dn(e) ? /* @__PURE__ */ un(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function dn(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function fn(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function pn(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ L(t) : e;
}
function mn(e) {
	return !p(e, "__v_skip") && Object.isExtensible(e) && se(e, "__v_skip", !0), e;
}
var hn = (e) => S(e) ? /* @__PURE__ */ an(e) : e, gn = (e) => S(e) ? /* @__PURE__ */ sn(e) : e;
// @__NO_SIDE_EFFECTS__
function R(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function _n(e) {
	return vn(e, !1);
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	return vn(e, !0);
}
function vn(e, t) {
	return /* @__PURE__ */ R(e) ? e : new yn(e, t);
}
var yn = class {
	constructor(e, t) {
		this.dep = new pt(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ L(e), this._value = t ? e : hn(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ fn(e) || /* @__PURE__ */ dn(e);
		e = n ? e : /* @__PURE__ */ L(e), M(e, t) && (this._rawValue = e, this._value = n ? e : hn(e), this.dep.trigger());
	}
};
function bn(e) {
	e.dep && e.dep.trigger();
}
function xn(e) {
	return /* @__PURE__ */ R(e) ? e.value : e;
}
function B(e) {
	return y(e) ? e() : xn(e);
}
var Sn = {
	get: (e, t, n) => t === "__v_raw" ? e : xn(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ R(i) && !/* @__PURE__ */ R(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Cn(e) {
	return /* @__PURE__ */ un(e) ? e : new Proxy(e, Sn);
}
var wn = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new pt(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function Tn(e) {
	return new wn(e);
}
// @__NO_SIDE_EFFECTS__
function En(e) {
	let t = m(e) ? Array(e.length) : {};
	for (let n in e) t[n] = An(e, n);
	return t;
}
var Dn = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = x(t) ? t : String(t), this._raw = /* @__PURE__ */ L(e);
		let r = !0, i = e;
		if (!m(e) || x(this._key) || !O(this._key)) do
			r = !/* @__PURE__ */ pn(i) || /* @__PURE__ */ fn(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = xn(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ R(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ R(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return xt(this._raw, this._key);
	}
}, On = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function kn(e, t, n) {
	return /* @__PURE__ */ R(e) ? e : y(e) ? new On(e) : S(e) && arguments.length > 1 ? An(e, t, n) : /* @__PURE__ */ _n(e);
}
function An(e, t, n) {
	return new Dn(e, t, n);
}
var jn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new pt(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = dt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && I !== this) return Ye(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return tt(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function Mn(e, t, n = !1) {
	let r, i;
	return y(e) ? r = e : (r = e.get, i = e.set), new jn(r, i, n);
}
var Nn = {
	GET: "get",
	HAS: "has",
	ITERATE: "iterate"
}, Pn = {
	SET: "set",
	ADD: "add",
	DELETE: "delete",
	CLEAR: "clear"
}, Fn = {}, In = /* @__PURE__ */ new WeakMap(), Ln = void 0;
function Rn() {
	return Ln;
}
function zn(e, t = !1, n = Ln) {
	if (n) {
		let t = In.get(n);
		t || In.set(n, t = []), t.push(e);
	}
}
function Bn(e, t, n = i) {
	let { immediate: r, deep: a, once: s, scheduler: c, augmentJob: l, call: u } = n, f = (e) => a ? e : /* @__PURE__ */ fn(e) || a === !1 || a === 0 ? Vn(e, 1) : Vn(e), p, h, g, _, v = !1, b = !1;
	if (/* @__PURE__ */ R(e) ? (h = () => e.value, v = /* @__PURE__ */ fn(e)) : /* @__PURE__ */ un(e) ? (h = () => f(e), v = !0) : m(e) ? (b = !0, v = e.some((e) => /* @__PURE__ */ un(e) || /* @__PURE__ */ fn(e)), h = () => e.map((e) => {
		if (/* @__PURE__ */ R(e)) return e.value;
		if (/* @__PURE__ */ un(e)) return f(e);
		if (y(e)) return u ? u(e, 2) : e();
	})) : h = y(e) ? t ? u ? () => u(e, 2) : e : () => {
		if (g) {
			ct();
			try {
				g();
			} finally {
				lt();
			}
		}
		let t = Ln;
		Ln = p;
		try {
			return u ? u(e, 3, [_]) : e(_);
		} finally {
			Ln = t;
		}
	} : o, t && a) {
		let e = h, t = a === !0 ? Infinity : a;
		h = () => Vn(e(), t);
	}
	let x = He(), S = () => {
		p.stop(), x && x.active && d(x.effects, p);
	};
	if (s && t) {
		let e = t;
		t = (...t) => {
			try {
				return e(...t);
			} finally {
				S();
			}
		};
	}
	let C = b ? Array(e.length).fill(Fn) : Fn, w = (e) => {
		if (p.flags & 1 && (p.dirty || e)) {
			if (t) {
				let n = p.run();
				if (e || a || v || (b ? n.some((e, t) => M(e, C[t])) : M(n, C))) {
					let e = Ln;
					ct();
					try {
						g && g(), Ln = p;
						let e = [
							n,
							C === Fn ? void 0 : b && C[0] === Fn ? [] : C,
							_
						];
						C = n, u ? u(t, 3, e) : t(...e);
					} finally {
						Ln = e, lt();
					}
				}
			} else p.run();
		}
	};
	return l && l(w), p = new Ge(h), p.scheduler = c ? () => c(w, !1) : w, _ = (e) => zn(e, !1, p), g = p.onStop = () => {
		let e = In.get(p);
		if (e) {
			if (u) u(e, 4);
			else for (let t of e) t();
			In.delete(p);
		}
	}, t ? r ? w(!0) : C = p.run() : c ? c(w.bind(null, !0), !0) : p.run(), S.pause = p.pause.bind(p), S.resume = p.resume.bind(p), S.stop = S, S;
}
function Vn(e, t = Infinity, n) {
	if (t <= 0 || !S(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ R(e)) Vn(e.value, t, n);
	else if (m(e)) for (let r = 0; r < e.length; r++) Vn(e[r], t, n);
	else if (g(e) || h(e)) e.forEach((e) => {
		Vn(e, t, n);
	});
	else if (D(e)) {
		for (let r in e) Vn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Vn(e[r], t, n);
	}
	return e;
}
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var Hn = [];
function Un(e) {
	Hn.push(e);
}
function Wn() {
	Hn.pop();
}
function Gn(e, t) {}
var Kn = {
	SETUP_FUNCTION: 0,
	0: "SETUP_FUNCTION",
	RENDER_FUNCTION: 1,
	1: "RENDER_FUNCTION",
	NATIVE_EVENT_HANDLER: 5,
	5: "NATIVE_EVENT_HANDLER",
	COMPONENT_EVENT_HANDLER: 6,
	6: "COMPONENT_EVENT_HANDLER",
	VNODE_HOOK: 7,
	7: "VNODE_HOOK",
	DIRECTIVE_HOOK: 8,
	8: "DIRECTIVE_HOOK",
	TRANSITION_HOOK: 9,
	9: "TRANSITION_HOOK",
	APP_ERROR_HANDLER: 10,
	10: "APP_ERROR_HANDLER",
	APP_WARN_HANDLER: 11,
	11: "APP_WARN_HANDLER",
	FUNCTION_REF: 12,
	12: "FUNCTION_REF",
	ASYNC_COMPONENT_LOADER: 13,
	13: "ASYNC_COMPONENT_LOADER",
	SCHEDULER: 14,
	14: "SCHEDULER",
	COMPONENT_UPDATE: 15,
	15: "COMPONENT_UPDATE",
	APP_UNMOUNT_CLEANUP: 16,
	16: "APP_UNMOUNT_CLEANUP"
}, qn = {
	sp: "serverPrefetch hook",
	bc: "beforeCreate hook",
	c: "created hook",
	bm: "beforeMount hook",
	m: "mounted hook",
	bu: "beforeUpdate hook",
	u: "updated",
	bum: "beforeUnmount hook",
	um: "unmounted hook",
	a: "activated hook",
	da: "deactivated hook",
	ec: "errorCaptured hook",
	rtc: "renderTracked hook",
	rtg: "renderTriggered hook",
	0: "setup function",
	1: "render function",
	2: "watcher getter",
	3: "watcher callback",
	4: "watcher cleanup function",
	5: "native event handler",
	6: "component event handler",
	7: "vnode hook",
	8: "directive hook",
	9: "transition hook",
	10: "app errorHandler",
	11: "app warnHandler",
	12: "ref function",
	13: "async component loader",
	14: "scheduler flush",
	15: "component update",
	16: "app unmount cleanup function"
};
function Jn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Xn(e, t, n);
	}
}
function Yn(e, t, n, r) {
	if (y(e)) {
		let i = Jn(e, t, n, r);
		return i && C(i) && i.catch((e) => {
			Xn(e, t, n, void 0, !0);
		}), i;
	}
	if (m(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Yn(e[a], t, n, r));
		return i;
	}
}
function Xn(e, t, n, r = !0, a = !1) {
	let o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: c } = t && t.appContext.config || i;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t && !r.isUnmounted && (!a || r.scope.active)) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (s) {
			ct(), Jn(s, null, 10, [
				e,
				i,
				o
			]), lt();
			return;
		}
	}
	Zn(e, n, o, r, c);
}
function Zn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var Qn = [], $n = -1, er = [], tr = null, nr = 0, rr = /* @__PURE__ */ Promise.resolve(), ir = null;
function ar(e) {
	let t = ir || rr;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function or(e) {
	let t = $n + 1, n = Qn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Qn[r], a = mr(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function sr(e) {
	if (!(e.flags & 1)) {
		let t = mr(e), n = Qn[Qn.length - 1];
		!n || !(e.flags & 2) && t >= mr(n) ? Qn.push(e) : Qn.splice(or(t), 0, e), e.flags |= 1, cr();
	}
}
function cr() {
	ir ||= rr.then(hr);
}
function lr(e) {
	if (!m(e)) tr && e.id === -1 ? tr.splice(nr + 1, 0, e) : e.flags & 1 || (er.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) er.push(e[t]);
	cr();
}
function ur(e, t, n, r = $n + 1) {
	for (; r < Qn.length; r++) {
		let n = Qn[r];
		if (n && n.flags & 2) {
			if (e && n.id !== e.uid || t !== void 0 && !(n.id >= t)) continue;
			Qn.splice(r, 1), r = e ? r - 1 : $n, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
		}
	}
}
function dr(e, t, n = 0) {
	if (er.length) {
		let e = er, r = 0;
		if (t) {
			e = [];
			for (let i = 0; i < er.length; i++) {
				let a = er[i];
				(a.i === void 0 ? t.has(a) : !a.i || a.i.uid < n) ? er[r++] = a : e.push(a);
			}
		}
		let i = [...new Set(e)].sort((e, t) => mr(e) - mr(t));
		if (er.length = r, tr) {
			for (let e = 0; e < i.length; e++) tr.push(i[e]);
			return;
		}
		for (tr = i, nr = 0; nr < tr.length; nr++) {
			let e = tr[nr];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		tr = null, nr = 0;
	}
}
var fr = !1;
function pr(e, t) {
	if (fr) {
		e();
		return;
	}
	let n = t === void 0 ? void 0 : new Set(er);
	e(), fr = !0;
	try {
		ur(void 0, t), dr(void 0, n, t);
	} finally {
		fr = !1;
	}
}
var mr = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function hr(e) {
	try {
		for ($n = 0; $n < Qn.length; $n++) {
			let e = Qn[$n];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Jn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; $n < Qn.length; $n++) {
			let e = Qn[$n];
			e && (e.flags &= -2);
		}
		$n = -1, Qn.length = 0, dr(e), ir = null, (Qn.length || er.length) && hr(e);
	}
}
var gr, _r = [];
function vr(e, t) {
	gr = e, gr ? (gr.enabled = !0, _r.forEach(({ event: e, args: t }) => gr.emit(e, ...t)), _r = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		vr(e, t);
	}), setTimeout(() => {
		gr || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, _r = []);
	}, 3e3)) : _r = [];
}
var yr = null, br = null;
function xr(e) {
	let t = yr;
	return yr = e, br = e && e.type.__scopeId || null, t;
}
function Sr(e) {
	br = e;
}
function Cr() {
	br = null;
}
var wr = (e) => Tr;
function Tr(e, t = yr, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && js(-1);
		let i = xr(t), a = Ds.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Ds.length; e > a; e--) ks();
			xr(i), r._d && js(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Er(e, t) {
	if (yr === null) return e;
	let n = yc(yr), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [a, o, s, c = i] = t[e];
		a && (y(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && Vn(o), r.push({
			dir: a,
			instance: n,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Dr(e, t, n, r) {
	let i = e;
	if (r === "beforeMount") e._mount = e;
	else if (r === "beforeUpdate") {
		let n = t && t._mount;
		n && (n._latest = e, e._mount = n);
	} else if (r === "mounted") {
		let t = e._latest;
		e._mount = e._latest = void 0, t && (i = t, t._mount = void 0);
	}
	let a = i.dirs, o = t && t.dirs;
	for (let s = 0; s < a.length; s++) {
		let c = a[s];
		o ? c.oldValue = o[s].value : r === "mounted" && c.oldValue !== void 0 && (c = u({}, c, { oldValue: void 0 }));
		let l = c.dir[r];
		l && (ct(), Yn(l, n, 8, [
			e.el,
			c,
			i,
			t
		]), lt());
	}
}
function Or(e, t) {
	if (ec) {
		let n = ec.provides, r = ec.parent && ec.parent.provides;
		r === n && (n = ec.provides = Object.create(r)), n[e] = t;
	}
}
function kr(e, t, n = !1) {
	let r = tc();
	if (r || ho) {
		let i = ho ? ho._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && y(t) ? t.call(r && r.proxy) : t;
	}
}
function Ar() {
	return !!(tc() || ho);
}
var jr = /* @__PURE__ */ Symbol.for("v-scx"), Mr = () => kr(jr);
function Nr(e, t) {
	return Lr(e, null, t);
}
function Pr(e, t) {
	return Lr(e, null, { flush: "post" });
}
function Fr(e, t) {
	return Lr(e, null, { flush: "sync" });
}
function Ir(e, t, n) {
	return Lr(e, t, n);
}
function Lr(e, t, n = i) {
	let { immediate: r, deep: a, flush: s, once: c } = n, l = u({}, n), d = t && r || !t && s !== "post", f;
	if (sc) {
		if (s === "sync") {
			let e = Mr();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = o, e.resume = o, e.pause = o, e;
		}
	}
	let p = ec;
	l.call = (e, t, n) => Yn(e, p, t, n);
	let m = !1;
	s === "post" ? l.scheduler = (e) => {
		e.i = p, Jo(e, p && p.suspense);
	} : s !== "sync" && (m = !0, l.scheduler = (e, t) => {
		t ? e() : sr(e);
	}), l.augmentJob = (e) => {
		t && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = Bn(e, t, l);
	return sc && (f ? f.push(h) : d && h()), h;
}
function Rr(e, t, n) {
	let r = this.proxy, i = b(e) ? e.includes(".") ? zr(r, e) : () => r[e] : e.bind(r, r), a;
	y(t) ? a = t : (a = t.handler, n = t);
	let o = ic(this), s = Lr(i, a.bind(r), n);
	return o(), s;
}
function zr(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Br = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ Symbol("_vte"), Hr = (e) => e.__isTeleport, Ur = (e) => e && (e.disabled || e.disabled === ""), Wr = (e) => e && (e.defer || e.defer === ""), Gr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Kr = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, qr = (e, t) => {
	let n = e && e.to;
	return b(n) ? t ? t(n) : null : n;
}, Jr = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = Ur(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = Ur(e.props), r = e.target = qr(e.props, m), a = $r(r, e, h, p);
			r && (o !== "svg" && Gr(r) ? o = "svg" : o !== "mathml" && Kr(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), Qr(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (Br.get(e) === t) {
					if (Br.delete(e), Ur(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), Qr(e, !0);
					}
					x(e);
				}
			};
			Br.set(e, t), Jo(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), Wr(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), Qr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = Br.get(e);
			if (u) {
				u.flags |= 8, Br.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = Ur(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || Gr(p) ? o = "svg" : (o === "mathml" || Kr(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), ts(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Yr(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = qr(t.props, m);
				e && (t.target = e, Yr(t, e, null, l, 0));
			} else g && Yr(t, p, h, l, 1);
			Qr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = Ur(f), m = a || !p, h = Br.get(e);
		if (h && (h.flags |= 8, Br.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: Yr,
	hydrate: Xr
};
function Yr(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && (e.targetStart && r(e.targetStart, t, n), r(e.targetAnchor, t, n), n = e.targetAnchor);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !Br.has(e) && (!d || Ur(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function Xr(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = qr(t.props, c), h = Ur(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || $r(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || $r(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Qr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Zr = Jr;
function Qr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function $r(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Vr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var ei = /* @__PURE__ */ Symbol("_leaveCb"), ti = /* @__PURE__ */ Symbol("_enterCb");
function ni() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return ca(() => {
		e.isMounted = !0;
	}), da(() => {
		e.isUnmounting = !0;
	}), e;
}
var ri = [Function, Array], ii = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: ri,
	onEnter: ri,
	onAfterEnter: ri,
	onEnterCancelled: ri,
	onBeforeLeave: ri,
	onLeave: ri,
	onAfterLeave: ri,
	onLeaveCancelled: ri,
	onBeforeAppear: ri,
	onAppear: ri,
	onAfterAppear: ri,
	onAppearCancelled: ri
}, ai = {
	name: "BaseTransition",
	props: ii,
	setup(e, { slots: t }) {
		let n = tc(), r = ni();
		return () => {
			let i = t.default && pi(t.default(), !0), a = i && i.length ? oi(i) : n.subTree ? Ws() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ L(e), { mode: s } = o;
			if (r.isLeaving) return ui(a);
			let c = di(a);
			if (!c) return ui(a);
			let l = li(c, o, r, n);
			c.type !== Ts && fi(c, l);
			let u = n.subTree && di(n.subTree);
			if (u && u.type !== Ts && !Fs(u, c) && mi(n.subTree)) {
				let e = li(u, o, r, n);
				if (fi(u, e), s === "out-in" && c.type !== Ts) return r.isLeaving = !0, e.afterLeave = () => {
					if (r.isLeaving = !1, !(n.job.flags & 8)) {
						if (n.effect.flags & 2) {
							let e = () => {
								n.job.flags & 8 || n.update();
							};
							e.i = n, sr(e);
						} else n.update();
					}
					delete e.afterLeave, u = void 0;
				}, ui(a);
				s === "in-out" && c.type !== Ts ? e.delayLeave = (e, t, n) => {
					let i = ci(r, u);
					i[String(u.key)] = u, e[ei] = () => {
						t(), e[ei] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function oi(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Ts) {
			t = n;
			break;
		}
	}
	return t;
}
var si = ai;
function ci(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function li(e, t, n, r) {
	let { appear: i, mode: a, persisted: o = !1, onBeforeEnter: s, onEnter: c, onAfterEnter: l, onEnterCancelled: u, onBeforeLeave: d, onLeave: f, onAfterLeave: p, onLeaveCancelled: h, onBeforeAppear: g, onAppear: _, onAfterAppear: v, onAppearCancelled: y } = t, b = String(e.key), x = ci(n, e), S = (e, t) => {
		e && Yn(e, r, 9, t);
	}, C = (e, t) => {
		let n = t[1];
		S(e, t), m(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, w = {
		mode: a,
		persisted: o,
		beforeEnter(t) {
			let r = s;
			if (!n.isMounted) {
				if (i) r = g || s;
				else return;
			}
			t[ei] && t[ei](!0);
			let a = x[b];
			if (a && Fs(e, a)) {
				let e = a.el[ei];
				if (!e) {
					let t = mi(a);
					e = t && t.el[ei];
				}
				e && e();
			}
			S(r, [t]);
		},
		enter(t) {
			if (x[b] === e) return;
			let r = c, a = l, o = u;
			if (!n.isMounted) {
				if (i) r = _ || c, a = v || l, o = y || u;
				else return;
			}
			let s = !1;
			t[ti] = (e) => {
				s || (s = !0, S(e ? o : a, [t]), w.delayedLeave && w.delayedLeave(), t[ti] = void 0);
			};
			let d = t[ti].bind(null, !1);
			r ? C(r, [t, d]) : d();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[ti] && t[ti](!0), n.isUnmounting) return r();
			S(d, [t]);
			let a = !1;
			t[ei] = (n) => {
				a || (a = !0, r(), S(n ? h : p, [t]), t[ei] = void 0, x[i] === e && delete x[i]);
			};
			let o = t[ei].bind(null, !1);
			x[i] = e, f ? C(f, [t, o]) : o();
		},
		clone(e) {
			let i = li(e, t, n, r);
			return i.afterLeave = () => {
				w.afterLeave && w.afterLeave();
			}, i.delayLeave = (e, t, n) => {
				w.delayLeave ? w.delayLeave(e, t, n) : n();
			}, i.delayedLeave = () => {
				w.delayedLeave && w.delayedLeave();
			}, i;
		}
	};
	return w;
}
function ui(e) {
	if (Xi(e)) return e = Vs(e), e.children = null, e;
}
function di(e) {
	if (!Xi(e)) return Hr(e.type) && e.children ? oi(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && y(n.default)) return n.default();
	}
}
function fi(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		fi(Hr(n.type) && di(n) || n, t);
	} else if (e.shapeFlag & 128) {
		let n = e.suspense;
		if (n) {
			let e = n.isHydrating ? n.pendingBranch : n.activeBranch;
			e && fi(e, t.clone(e));
		} else e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
	} else if (e.transition = t, e.type === Cs && m(e.children)) {
		let n = Co(e.children, !1);
		n && fi(n, t);
	}
}
function pi(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === Cs ? (o.patchFlag & 128 && i++, r = r.concat(pi(o.children, t, s))) : (t || o.type !== Ts) && r.push(s == null ? o : Vs(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
function mi(e) {
	if (e.component) return mi(e.component.subTree);
	if (e.type === Cs) {
		let t = m(e.children) && Co(e.children, !1);
		return t ? mi(t) : void 0;
	}
	if (e.type !== Ts) return e;
}
// @__NO_SIDE_EFFECTS__
function hi(e, t) {
	return y(e) ? /* @__PURE__ */ u({ name: e.name }, t, { setup: e }) : e;
}
function gi() {
	let e = tc();
	return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function _i(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function vi(e) {
	let t = tc(), n = /* @__PURE__ */ z(null);
	if (t) {
		let r = t.refs === i ? t.refs = {} : t.refs;
		Object.defineProperty(r, e, {
			enumerable: !0,
			get: () => n.value,
			set: (e) => n.value = e
		});
	}
	return n;
}
function yi(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var bi = /* @__PURE__ */ new WeakMap();
function xi(e, t, n, r, a = !1) {
	if (m(e)) {
		e.forEach((e, i) => xi(e, t && (m(t) ? t[i] : t), n, r, a));
		return;
	}
	if (qi(r) && !a) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && xi(e, t, n, r.component.subTree);
		return;
	}
	let o = r.shapeFlag & 4 ? yc(r.component) : r.el, c = a ? null : o, { i: l, r: u } = e, f = t && t.r, h = l.refs === i ? l.refs = {} : l.refs, g = l.setupState, _ = /* @__PURE__ */ L(g), v = g === i ? s : (e) => !yi(h, e) && p(_, e), x = (e, t) => !(t && yi(h, t));
	if (f != null && f !== u) {
		if (Si(t), b(f)) h[f] = null, v(f) && (g[f] = null);
		else if (/* @__PURE__ */ R(f)) {
			let e = t;
			x(f, e.k) && (f.value = null), e.k && (h[e.k] = null);
		}
	}
	if (y(u)) Jn(u, l, 12, [c, h]);
	else {
		let t = b(u), r = /* @__PURE__ */ R(u);
		if (t || r) {
			let i = () => {
				if (e.f) {
					let n = t ? v(u) ? g[u] : h[u] : x(u) || !e.k ? u.value : h[e.k];
					if (a) m(n) && d(n, o);
					else if (m(n)) n.includes(o) || n.push(o);
					else if (t) h[u] = [o], v(u) && (g[u] = h[u]);
					else {
						let t = [o];
						x(u, e.k) && (u.value = t), e.k && (h[e.k] = t);
					}
				} else t ? (h[u] = c, v(u) && (g[u] = c)) : r && (x(u, e.k) && (u.value = c), e.k && (h[e.k] = c));
			};
			if (c) {
				let t = () => {
					i(), bi.delete(e);
				};
				t.id = -1, bi.set(e, t), Jo(t, n);
			} else Si(e), i();
		}
	}
}
function Si(e) {
	let t = bi.get(e);
	t && (t.flags |= 8, bi.delete(e));
}
var Ci = !1, wi = () => {
	Ci ||= (console.error("Hydration completed but contains mismatches."), !0);
}, Ti = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", Ei = (e) => e.namespaceURI.includes("MathML"), Di = (e) => {
	if (e.nodeType === 1) {
		if (Ti(e)) return "svg";
		if (Ei(e)) return "mathml";
	}
}, Oi = (e) => e.nodeType === 8;
function ki(e) {
	let { mt: t, p: n, o: { patchProp: r, createText: i, nextSibling: a, parentNode: o, remove: s, insert: l, createComment: u } } = e, d = (e, t) => {
		t.hasChildNodes() ? (f(t.firstChild, e, null, null, null), dr(), t._vnode = e) : (n(null, e, t), dr(), t._vnode = e);
	}, f = (n, r, s, c, u, d = !1) => {
		d ||= !!r.dynamicChildren;
		let b = Oi(n) && n.data === "[", x = () => g(n, r, s, c, u, b), { type: S, ref: C, shapeFlag: w, patchFlag: T } = r, E = n.nodeType;
		r.el = n, T === -2 && (d = !1, r.dynamicChildren = null);
		let D = null;
		switch (S) {
			case ws:
				E === 3 ? (n.data !== r.children && (wi(), n.data = r.children), D = a(n)) : r.children === "" ? (l(r.el = i(""), o(n), n), D = n) : D = x();
				break;
			case Ts:
				y(n) ? (D = a(n), v(r.el = n.content.firstChild, n, s)) : D = E !== 8 || b ? x() : a(n);
				break;
			case Es:
				if (b && (n = a(n), E = n.nodeType), E === 1 || E === 3) {
					D = n;
					let e = !r.children.length;
					for (let t = 0; t < r.staticCount; t++) e && (r.children += D.nodeType === 1 ? D.outerHTML : D.data), t === r.staticCount - 1 && (r.anchor = D), D = a(D);
					return b ? a(D) : D;
				}
				x();
				break;
			case Cs:
				D = b ? h(n, r, s, c, u, d) : x();
				break;
			default: if (w & 1) D = (E !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : p(n, r, s, c, u, d);
			else if (w & 6) {
				r.slotScopeIds = u;
				let e = o(n);
				if (D = b ? _(n) : Oi(n) && n.data === "teleport start" ? _(n, n.data, "teleport end") : a(n), t(r, e, null, s, c, Di(e), d), (qi(r) || r.component.asyncDep) && !r.component.subTree) {
					let t;
					b ? (t = W(Es), t.anchor = D ? D.previousSibling : e.lastChild) : t = n.nodeType === 3 ? Hs("") : W(n.nodeType === 8 ? Ts : "div"), t.el = n, r.component.subTree = t;
				}
			} else w & 64 ? D = E === 8 ? r.type.hydrate(n, r, s, c, u, d, e, m) : x() : w & 128 && (D = r.type.hydrate(n, r, s, c, Di(o(n)), u, d, e, f));
		}
		return C != null && xi(C, null, c, r), D;
	}, p = (e, t, n, i, a, o) => {
		o ||= !!t.dynamicChildren;
		let { type: l, dynamicProps: u, props: d, patchFlag: f, shapeFlag: p, dirs: h, transition: g } = t, _ = l === "input" || l === "option", b = !!u;
		if (_ || b || f !== -1) {
			h && Dr(t, null, n, "created");
			let l = !1;
			if (y(e)) {
				l = es(null, g) && n && n.vnode.props && n.vnode.props.appear;
				let r = e.content.firstChild;
				if (l) {
					let e = r.getAttribute("class");
					e && (r.$cls = e), g.beforeEnter(r);
				}
				v(r, e, n), t.el = e = r;
			}
			if (p & 16 && !(d && (d.innerHTML || d.textContent))) {
				let r = m(e.firstChild, t, e, n, i, a, o);
				for (r && !Pi(e, 1) && wi(); r;) {
					let e = r;
					r = r.nextSibling, s(e);
				}
			} else if (p & 8) {
				let n = t.children;
				n[0] === "\n" && (e.tagName === "PRE" || e.tagName === "TEXTAREA") && (n = n.slice(1));
				let { textContent: r } = e;
				r !== n && r !== n.replace(/\r\n|\r/g, "\n") && (Pi(e, 0) || wi(), e.textContent = t.children);
			}
			if (d) {
				if (_ || b || !o || f & 48) {
					let t = e.tagName.includes("-"), i = e.namespaceURI.includes("svg") ? "svg" : e.namespaceURI.includes("MathML") ? "mathml" : void 0;
					for (let a in d) if (_ && (a.endsWith("value") || a === "indeterminate") || c(a) && !k(a) || a[0] === "." || t && !k(a) || u && u.includes(a)) {
						if (ji(e, a, d[a])) continue;
						r(e, a, null, d[a], i, n);
					}
				} else if (d.onClick) r(e, "onClick", null, d.onClick, void 0, n);
				else if (f & 4 && /* @__PURE__ */ un(d.style)) for (let e in d.style) d.style[e];
			}
			let x;
			(x = d && d.onVnodeBeforeMount) && Ys(x, n, t), h && Dr(t, null, n, "beforeMount"), ((x = d && d.onVnodeMounted) || h || l) && bs(() => {
				x && Ys(x, n, t), l && g.enter(e), h && Dr(t, null, n, "mounted");
			}, i);
		}
		return e.nextSibling;
	}, m = (e, t, r, o, s, c, u) => {
		u ||= !!t.dynamicChildren;
		let d = t.children, p = d.length, m = !1;
		for (let t = 0; t < p; t++) {
			let h = u ? d[t] : d[t] = Gs(d[t]), g = h.type === ws;
			e ? (g && !u && t + 1 < p && Gs(d[t + 1]).type === ws && (l(i(e.data.slice(h.children.length)), r, a(e)), e.data = h.children), e = f(e, h, o, s, c, u)) : g && !h.children ? l(h.el = i(""), r) : (m || (m = !0, Pi(r, 1) || wi()), n(null, h, r, null, o, s, Di(r), c));
		}
		return e;
	}, h = (e, t, n, r, i, s) => {
		let { slotScopeIds: c } = t;
		c && (i = i ? i.concat(c) : c);
		let d = o(e), f = m(a(e), t, d, n, r, i, s);
		return f && Oi(f) && f.data === "]" ? a(t.anchor = f) : (wi(), l(t.anchor = u("]"), d, f), f);
	}, g = (e, t, r, i, c, l) => {
		if (Ii(e, t) || wi(), t.el = null, l) {
			let t = _(e);
			for (;;) {
				let n = a(e);
				if (n && n !== t) s(n);
				else break;
			}
		}
		let u = a(e), d = o(e);
		return s(e), n(null, t, d, u, r, i, Di(d), c), r && r.vnode.el === e && (r.vnode.el = t.el, ko(r, t.el)), u;
	}, _ = (e, t = "[", n = "]") => {
		let r = 0;
		for (; e;) if (e = a(e), e && Oi(e) && (e.data === t && r++, e.data === n)) {
			if (r === 0) return a(e);
			r--;
		}
		return e;
	}, v = (e, t, n) => {
		let r = t.parentNode;
		r && r.replaceChild(e, t);
		let i = n;
		for (; i;) i.vnode.el === t && (i.vnode.el = i.subTree.el = e), i = i.parent;
	}, y = (e) => e.nodeType === 1 && e.tagName === "TEMPLATE";
	return [d, f];
}
var Ai = /* @__PURE__ */ new Set([
	"src",
	"srcset",
	"href",
	"poster"
]);
function ji(e, t, n) {
	return Ai.has(t) ? e.getAttribute(t) === (n == null ? null : `${n}`) : !1;
}
var Mi = "data-allow-mismatch", Ni = {
	0: "text",
	1: "children",
	2: "class",
	3: "style",
	4: "attribute"
};
function Pi(e, t) {
	if (t === 0 || t === 1) for (; e && !e.hasAttribute(Mi);) e = e.parentElement;
	return Fi(e && e.getAttribute(Mi), t);
}
function Fi(e, t) {
	if (e == null) return !1;
	if (e === "") return !0;
	{
		let n = e.split(",");
		return t === 0 && n.includes("children") ? !0 : n.includes(Ni[t]);
	}
}
function Ii(e, t) {
	return Pi(e.parentElement, 1) || Li(e) || Ri(t);
}
function Li(e) {
	return e.nodeType === 1 && Fi(e.getAttribute(Mi), 1);
}
function Ri({ props: e }) {
	let t = e && e[Mi];
	return typeof t == "string" && Fi(t, 1);
}
var zi = ue().requestIdleCallback || ((e) => setTimeout(e, 1)), Bi = ue().cancelIdleCallback || ((e) => clearTimeout(e)), Vi = (e = 1e4) => (t) => {
	let n = zi(t, { timeout: e });
	return () => Bi(n);
};
function Hi(e) {
	let { top: t, left: n, bottom: r, right: i } = e.getBoundingClientRect(), { innerHeight: a, innerWidth: o } = window;
	return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var Ui = (e) => (t, n) => {
	let r = new IntersectionObserver((e) => {
		for (let n of e) if (n.isIntersecting) {
			r.disconnect(), t();
			break;
		}
	}, e), i = (e) => {
		if (Hi(e)) return t(), r.disconnect(), !1;
		if (getComputedStyle(e).display === "contents") {
			for (let t = 0; t < e.children.length; t++) if (i(e.children[t]) === !1) return !1;
		}
		r.observe(e);
	};
	return n((e) => {
		if (e instanceof Element) return i(e);
	}), () => r.disconnect();
}, Wi = (e) => (t) => {
	if (e) {
		let n = matchMedia(e);
		if (n.matches) t();
		else return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
	}
}, Gi = (e = []) => (t, n) => {
	b(e) && (e = [e]);
	let r = !1, i = (e) => {
		r || (r = !0, a(), t(), e.target.dispatchEvent(new e.constructor(e.type, e)));
	}, a = () => {
		n((t) => {
			for (let n of e) t.removeEventListener(n, i);
		});
	};
	return n((t) => {
		for (let n of e) t.addEventListener(n, i, { once: !0 });
	}), a;
};
function Ki(e, t) {
	if (Oi(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (Oi(r)) {
				if (r.data === "]") {
					if (--n === 0) break;
				} else r.data === "[" && n++;
			}
			r = r.nextSibling;
		}
	} else t(e);
}
var qi = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Ji(e) {
	y(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ hi({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => Ki(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = ec;
			if (_i(e), u) return () => Yi(u, e);
			let t = (t) => {
				l = null, Xn(t, e, 13, !r, !0);
			};
			if (s && e.suspense || sc) return p().then((t) => () => Yi(t, e)).catch((e) => (t(e), () => r ? W(r, { error: e }) : null));
			let a = /* @__PURE__ */ _n(!1), c = /* @__PURE__ */ _n(), d = /* @__PURE__ */ _n(!!i), f, m;
			return Ue(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Xi(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				e.isUnmounted ? l = null : (t(n), c.value = n);
			}), () => {
				if (a.value && u) return Yi(u, e);
				if (c.value && r) return W(r, { error: c.value });
				if (n && !d.value) return Yi(n, e);
			};
		}
	});
}
function Yi(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = W(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Xi = (e) => e.type.__isKeepAlive, Zi = {
	name: "KeepAlive",
	__isKeepAlive: !0,
	props: {
		include: [
			String,
			RegExp,
			Array
		],
		exclude: [
			String,
			RegExp,
			Array
		],
		max: [String, Number]
	},
	setup(e, { slots: t }) {
		let n = tc(), r = n.ctx;
		if (!r.renderer) return () => {
			let e = t.default && t.default();
			return e && e.length === 1 ? e[0] : e;
		};
		let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set(), o = null, s = n.suspense, { renderer: { p: c, m: l, um: u, o: { createElement: d } } } = r, f = d("div");
		r.activate = (e, t, n, r, i) => {
			let a = e.component;
			l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), Jo(() => {
				a.isDeactivated = !1, a.a && oe(a.a);
				let t = e.props && e.props.onVnodeMounted;
				t && Ys(t, a.parent, e);
			}, s);
		}, r.deactivate = (e) => {
			let t = i.get(e.key == null ? e.type : e.key);
			if (!t || t.component !== e.component) return !1;
			let n = e.component;
			return is(n.m), is(n.a), l(e, f, null, 1, s), Jo(() => {
				n.da && oe(n.da);
				let t = e.props && e.props.onVnodeUnmounted;
				t && Ys(t, n.parent, e), n.isDeactivated = !0;
			}, s), !0;
		};
		function p(e) {
			ra(e), u(e, n, s, !0);
		}
		function m(e) {
			i.forEach((t, n) => {
				let r = bc(qi(t) ? t.type.__asyncResolved || {} : t.type);
				r && !e(r) && h(n);
			});
		}
		function h(e) {
			let t = i.get(e);
			t && (!o || !Fs(t, o)) ? p(t) : o && (ra(o), t && ra(t)), i.delete(e), a.delete(e);
		}
		Ir(() => [e.include, e.exclude], ([e, t]) => {
			e && m((t) => Qi(e, t)), t && m((e) => !Qi(t, e));
		}, {
			flush: "post",
			deep: !0
		});
		let g = null, _ = () => {
			if (g != null) {
				if (os(n.subTree.type)) {
					let e = () => {
						let e = ia(n.subTree);
						e.component && i.set(g, e);
					};
					n.subTree.suspense.pendingBranch ? Jo(e, n.subTree.suspense) : e();
				} else i.set(g, ia(n.subTree));
			}
		};
		return ca(_), ua(_), da(() => {
			i.forEach((e) => {
				let { subTree: t, suspense: r } = n, i = ia(t);
				if (e.type === i.type && e.key === i.key) {
					ra(i);
					let e = i.component.da;
					e && Jo(e, r);
				} else p(e);
			});
		}), () => {
			if (g = null, !t.default) return o = null;
			let n = t.default(), r = n[0];
			if (n.length > 1) return o = null, n;
			if (!Ps(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
			let s = ia(r);
			if (s.type === Ts) return o = null, s;
			let c = s.type, l = bc(qi(s) ? s.type.__asyncResolved || {} : c), { include: u, exclude: d, max: f } = e;
			if (u && (!l || !Qi(u, l)) || d && l && Qi(d, l)) return s.shapeFlag &= -257, o = s, r;
			let p = s.key == null ? c : s.key, m = i.get(p);
			return s.el && (s = Vs(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && fi(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, os(r.type) ? r : s;
		};
	}
};
function Qi(e, t) {
	return m(e) ? e.some((e) => Qi(e, t)) : b(e) ? e.split(",").includes(t) : v(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function $i(e, t) {
	ta(e, "a", t);
}
function ea(e, t) {
	ta(e, "da", t);
}
function ta(e, t, n = ec) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (aa(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Xi(e.parent.vnode) && na(r, t, n, e), e = e.parent;
	}
}
function na(e, t, n, r) {
	let i = aa(t, e, r, !0), a = aa("um", () => d(r[t], i), n);
	a.flags = 16;
}
function ra(e) {
	e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function ia(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function aa(e, t, n = ec, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			ct();
			let i = ic(n), a = Yn(t, n, e, r);
			return i(), lt(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var oa = (e) => (t, n = ec) => {
	sc && e !== "sp" || aa(e, (...e) => t(...e), n);
}, sa = oa("bm"), ca = oa("m"), la = oa("bu"), ua = oa("u"), da = oa("bum"), fa = oa("um"), pa = oa("sp"), ma = oa("rtg"), ha = oa("rtc");
function ga(e, t = ec) {
	aa("ec", e, t);
}
var _a = "components", va = "directives";
function ya(e, t) {
	return Ca(_a, e, !0, t) || e;
}
var ba = /* @__PURE__ */ Symbol.for("v-ndc");
function xa(e) {
	return b(e) ? Ca(_a, e, !1) || e : e || ba;
}
function Sa(e) {
	return Ca(va, e);
}
function Ca(e, t, n = !0, r = !1) {
	let i = yr || ec;
	if (i) {
		let n = i.type;
		if (e === _a) {
			let e = bc(n, !1);
			if (e && (e === t || e === A(t) || e === ie(A(t)))) return n;
		}
		let a = wa(i[e] || n[e], t) || wa(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function wa(e, t) {
	return e && (e[t] || e[A(t)] || e[ie(A(t))]);
}
function Ta(e, t, n, r) {
	let i, a = n && n[r], o = m(e);
	if (o || b(e)) {
		let n = o && /* @__PURE__ */ un(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ fn(e), s = /* @__PURE__ */ dn(e), e = Ct(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? gn(hn(e[n])) : hn(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		if (!Number.isInteger(e) || e < 0) i = [];
		else {
			i = Array(e);
			for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
		}
	} else if (S(e)) {
		if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
		else {
			let n = Object.keys(e);
			i = Array(n.length);
			for (let r = 0, o = n.length; r < o; r++) {
				let o = n[r];
				i[r] = t(e[o], o, r, a && a[r]);
			}
		}
	} else i = [];
	return n && (n[r] = i), i;
}
function Ea(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (m(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;
		else r && (e[r.name] = r.key ? (...e) => {
			let t = r.fn(...e);
			return t && (t.key = r.key), t;
		} : r.fn);
	}
	return e;
}
function Da(e, t, n, r, i, a) {
	if (n ??= {}, yr.ce || yr.parent && qi(yr.parent) && yr.parent.ce) {
		let e = a != null && n.key == null ? u({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), V(), Ns(Cs, null, [W("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let s = Ds.length;
	V();
	let c;
	try {
		let i = o && Oa(o(n)), s = n.key || a || i && i.key;
		c = Ns(Cs, { key: (s && !x(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = Ds.length; e > s; e--) ks();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), c;
}
function Oa(e) {
	return e.some((e) => !Ps(e) || !(e.type === Ts || e.type === Cs && !Oa(e.children))) ? e : null;
}
function ka(e, t) {
	let n = {};
	for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : ae(r)] = e[r];
	return n;
}
var Aa = (e) => e ? oc(e) ? yc(e) : Aa(e.parent) : null, ja = /* @__PURE__ */ u(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Aa(e.parent),
	$root: (e) => Aa(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => to(e),
	$forceUpdate: (e) => e.f ||= () => {
		sr(e.update);
	},
	$nextTick: (e) => e.n ||= ar.bind(e.proxy),
	$watch: (e) => Rr.bind(e)
}), Ma = (e, t) => e !== i && !e.__isScriptSetup && p(e, t), Na = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (t[0] !== "$") {
			let e = s[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return a[t];
				case 4: return n[t];
				case 3: return o[t];
			}
			else if (Ma(r, t)) return s[t] = 1, r[t];
			else if (a !== i && p(a, t)) return s[t] = 2, a[t];
			else if (p(o, t)) return s[t] = 3, o[t];
			else if (n !== i && p(n, t)) return s[t] = 4, n[t];
			else Xa && (s[t] = 0);
		}
		let u = ja[t], d, f;
		if (u) return t === "$attrs" && yt(e.attrs, "get", ""), u(e);
		if ((d = c.__cssModules) && (d = d[t])) return d;
		if (n !== i && p(n, t)) return s[t] = 4, n[t];
		if (f = l.config.globalProperties, p(f, t)) return f[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: a, ctx: o } = e;
		return Ma(a, t) ? (a[t] = n, !0) : r !== i && p(r, t) ? (r[t] = n, !0) : p(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(n[c] || e !== i && c[0] !== "$" && p(e, c) || Ma(t, c) || p(o, c) || p(r, c) || p(ja, c) || p(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? p(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
}, Pa = /* @__PURE__ */ u({}, Na, {
	get(e, t) {
		if (t !== Symbol.unscopables) return Na.get(e, t, e);
	},
	has(e, t) {
		return t[0] !== "_" && !fe(t);
	}
});
function Fa() {
	return null;
}
function Ia() {
	return null;
}
function La(e) {}
function Ra(e) {}
function za() {
	return null;
}
function Ba() {}
function Va(e, t) {
	return null;
}
function Ha() {
	return Wa("useSlots").slots;
}
function Ua() {
	return Wa("useAttrs").attrs;
}
function Wa(e) {
	let t = tc();
	return t.setupContext ||= vc(t);
}
function Ga(e) {
	return m(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Ka(e, t) {
	let n = Ga(e);
	for (let e in t) {
		if (e.startsWith("__skip")) continue;
		let r = n[e];
		r ? m(r) || y(r) ? r = n[e] = {
			type: r,
			default: t[e]
		} : r.default = t[e] : r === null && (r = n[e] = { default: t[e] }), r && t[`__skip_${e}`] && (r.skipFactory = !0);
	}
	return n;
}
function qa(e, t) {
	return !e || !t ? e || t : m(e) && m(t) ? e.concat(t) : u({}, Ga(e), Ga(t));
}
function Ja(e, t) {
	let n = {};
	for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
		enumerable: !0,
		get: () => e[r]
	});
	return n;
}
function Ya(e) {
	let t = tc(), n = sc, r = e();
	ac(), n && rc(!1);
	let i = () => {
		ic(t), n && rc(!0);
	}, a = () => {
		tc() !== t && t.scope.off(), ac(), n && rc(!1);
	};
	return C(r) && (r = r.catch((e) => {
		throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
	})), [r, () => {
		i(), Promise.resolve().then(a);
	}];
}
var Xa = !0;
function Za(e) {
	let t = to(e), n = e.proxy, r = e.ctx;
	Xa = !1, t.beforeCreate && $a(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: s, watch: c, provide: l, inject: u, created: d, beforeMount: f, mounted: p, beforeUpdate: h, updated: g, activated: _, deactivated: v, beforeDestroy: b, beforeUnmount: x, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: D, errorCaptured: O, serverPrefetch: k, expose: ee, inheritAttrs: te, components: ne, directives: A, filters: re } = t;
	if (u && Qa(u, r, null), s) for (let e in s) {
		let t = s[e];
		y(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		S(t) && (e.data = /* @__PURE__ */ an(t));
	}
	if (Xa = !0, a) for (let e in a) {
		let t = a[e], i = G({
			get: y(t) ? t.bind(n, n) : y(t.get) ? t.get.bind(n, n) : o,
			set: !y(t) && y(t.set) ? t.set.bind(n) : o
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (c) for (let e in c) eo(c[e], r, n, e);
	if (l) {
		let e = y(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Or(t, e[t]);
		});
	}
	d && $a(d, e, "c");
	function j(e, t) {
		m(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (j(sa, f), j(ca, p), j(la, h), j(ua, g), j($i, _), j(ea, v), j(ga, O), j(ha, E), j(ma, D), j(da, x), j(fa, w), j(pa, k), m(ee)) {
		if (ee.length) {
			let t = e.exposed ||= {};
			ee.forEach((e) => {
				Object.defineProperty(t, e, {
					get: () => n[e],
					set: (t) => n[e] = t,
					enumerable: !0
				});
			});
		} else e.exposed ||= {};
	}
	T && e.render === o && (e.render = T), te != null && (e.inheritAttrs = te), ne && (e.components = ne), A && (e.directives = A), k && _i(e);
}
function Qa(e, t, n = o) {
	m(e) && (e = oo(e));
	for (let n in e) {
		let r = e[n], i;
		i = S(r) ? "default" in r ? kr(r.from || n, r.default, !0) : kr(r.from || n) : kr(r), /* @__PURE__ */ R(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function $a(e, t, n) {
	Yn(m(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function eo(e, t, n, r) {
	let i = r.includes(".") ? zr(n, r) : () => n[r];
	if (b(e)) {
		let n = t[e];
		y(n) && Ir(i, n);
	} else if (y(e)) Ir(i, e.bind(n));
	else if (S(e)) {
		if (m(e)) e.forEach((e) => eo(e, t, n, r));
		else {
			let r = y(e.handler) ? e.handler.bind(n) : t[e.handler];
			y(r) && Ir(i, r, e);
		}
	}
}
function to(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => no(c, e, o, !0)), no(c, t, o)), S(t) && a.set(t, c), c;
}
function no(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && no(e, a, n, !0), i && i.forEach((t) => no(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = ro[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var ro = {
	data: io,
	props: lo,
	emits: lo,
	methods: co,
	computed: co,
	beforeCreate: so,
	created: so,
	beforeMount: so,
	mounted: so,
	beforeUpdate: so,
	updated: so,
	beforeDestroy: so,
	beforeUnmount: so,
	destroyed: so,
	unmounted: so,
	activated: so,
	deactivated: so,
	errorCaptured: so,
	serverPrefetch: so,
	components: co,
	directives: co,
	watch: uo,
	provide: io,
	inject: ao
};
function io(e, t) {
	return t ? e ? function() {
		return u(y(e) ? e.call(this, this) : e, y(t) ? t.call(this, this) : t);
	} : t : e;
}
function ao(e, t) {
	return co(oo(e), oo(t));
}
function oo(e) {
	if (m(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function so(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function co(e, t) {
	return e ? u(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function lo(e, t) {
	return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : u(/* @__PURE__ */ Object.create(null), Ga(e), Ga(t ?? {})) : t;
}
function uo(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = u(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = so(e[r], t[r]);
	return n;
}
function fo() {
	return {
		app: null,
		config: {
			isNativeTag: s,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var po = 0;
function mo(e, t) {
	return function(n, r = null) {
		y(n) || (n = u({}, n)), r != null && !S(r) && (r = null);
		let i = fo(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: po++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Tc,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && y(e.install) ? (a.add(e), e.install(c, ...t)) : y(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || W(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, yc(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Yn(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = ho;
				ho = c;
				try {
					return e();
				} finally {
					ho = t;
				}
			}
		};
		return c;
	};
}
var ho = null;
function go(e, t, n = i) {
	let r = tc(), a = A(t), o = j(t), s = _o(e, a), c = Tn((s, c) => {
		let l, u = i, d;
		return Fr(() => {
			let t = e[a];
			M(l, t) && (l = t, c());
		}), {
			get() {
				return s(), n.get ? n.get(l) : l;
			},
			set(e) {
				let s = n.set ? n.set(e) : e;
				if (!M(s, l) && !(u !== i && M(e, u))) return;
				let f = r.vnode.props, p = !!(f && (t in f || a in f || o in f) && (`onUpdate:${t}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), r.emit(`update:${t}`, s), M(e, u) && (M(e, s) && !M(s, d) || p && u !== i && !M(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || i : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var _o = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${A(t)}Modifiers`] || e[`${j(t)}Modifiers`];
function vo(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || i, a = n, o = t.startsWith("update:"), s = o && _o(r, t.slice(7));
	s && (s.trim && (a = n.map((e) => b(e) ? e.trim() : e)), s.number && (a = a.map(ce)));
	let c, l = r[c = ae(t)] || r[c = ae(A(t))];
	!l && o && (l = r[c = ae(j(t))]), l && Yn(l, e, 6, a);
	let u = r[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, Yn(u, e, 6, a);
	}
}
var yo = /* @__PURE__ */ new WeakMap();
function bo(e, t, n = !1) {
	let r = n ? yo : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!y(e)) {
		let r = (e) => {
			let n = bo(e, t, !0);
			n && (s = !0, u(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (S(e) && r.set(e, null), null) : (m(a) ? a.forEach((e) => o[e] = null) : u(o, a), S(e) && r.set(e, o), o);
}
function xo(e, t) {
	return !e || !c(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), p(e, t[0].toLowerCase() + t.slice(1)) || p(e, j(t)) || p(e, t));
}
function So(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = xr(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Gs(u.call(t, e, d, f, m, p, h)), y = s;
		} else {
			let e = t;
			v = Gs(e.length > 1 ? e(f, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(f, null)), y = t.props ? s : wo(s);
		}
	} catch (t) {
		Ds.length = 0, Xn(t, e, 1), v = W(Ts);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(l) && (y = To(y, a)), b = Vs(b, y, !1, !0));
	}
	return n.dirs && (b = Vs(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && fi(Hr(b.type) && di(b) || b, n.transition), v = b, xr(_), v;
}
function Co(e, t = !0) {
	let n;
	for (let t = 0; t < e.length; t++) {
		let r = e[t];
		if (Ps(r)) {
			if (r.type !== Ts || r.children === "v-if") {
				if (n) return;
				n = r;
			}
		} else return;
	}
	return n;
}
var wo = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || c(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, To = (e, t) => {
	let n = {};
	for (let r in e) l(r) && r.slice(9) in t || (n[r] = e[r]);
	return n;
};
function Eo(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Do(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (Oo(o, r, n) && !xo(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || Do(r, o, l) : !!o;
	return !1;
}
function Do(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (!p(e, a) || Oo(t, e, a) && !xo(n, a)) return !0;
	}
	return !1;
}
function Oo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && S(r) && S(i) ? !Ne(r, i) : r !== i;
}
function ko({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Ao = {}, jo = () => Object.create(Ao), Mo = (e) => Object.getPrototypeOf(e) === Ao;
function No(e, t, n, r = !1) {
	let i = {}, a = jo();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Fo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ on(i) : e.type.props ? i : a, e.attrs = a;
}
function Po(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ L(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (xo(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) {
					if (p(a, o)) u !== a[o] && (a[o] = u, l = !0);
					else {
						let t = A(o);
						i[t] = Io(c, s, t, u, e, !1);
					}
				} else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Fo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) t && (p(t, a) || (r = j(a)) !== a && p(t, r)) || (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Io(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) t && p(t, e) || (delete a[e], l = !0);
	}
	l && bt(e.attrs, "set", "");
}
function Fo(e, t, n, r) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (t) for (let i in t) {
		if (k(i)) continue;
		let l = t[i], u;
		a && p(a, u = A(i)) ? !o || !o.includes(u) ? n[u] = l : (c ||= {})[u] = l : xo(e.emitsOptions, i) || i in r && l === r[i] || (r[i] = l, s = !0);
	}
	if (o) {
		let t = /* @__PURE__ */ L(n), r = c || i;
		for (let i = 0; i < o.length; i++) {
			let s = o[i];
			n[s] = Io(a, t, s, r[s], e, !p(r, s));
		}
	}
	return s;
}
function Io(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = p(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && y(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = ic(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === j(n)) && (r = !0));
	}
	return r;
}
var Lo = /* @__PURE__ */ new WeakMap();
function Ro(e, t, n = !1) {
	let r = n ? Lo : t.propsCache, o = r.get(e);
	if (o) return o;
	let s = e.props, c = {}, l = [], d = !1;
	if (!y(e)) {
		let r = (e) => {
			d = !0;
			let [n, r] = Ro(e, t, !0);
			u(c, n), r && l.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!s && !d) return S(e) && r.set(e, a), a;
	if (m(s)) for (let e = 0; e < s.length; e++) {
		let t = A(s[e]);
		zo(t) && (c[t] = i);
	}
	else if (s) for (let e in s) {
		let t = A(e);
		if (zo(t)) {
			let n = s[e], r = c[t] = m(n) || y(n) ? { type: n } : u({}, n), i = r.type, a = !1, o = !0;
			if (m(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = y(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = y(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || p(r, "default")) && l.push(t);
		}
	}
	let f = [c, l];
	return S(e) && r.set(e, f), f;
}
function zo(e) {
	return e[0] !== "$" && !k(e);
}
var Bo = (e) => e === "_" || e === "_ctx" || e === "$stable", Vo = (e) => m(e) ? e.map(Gs) : [Gs(e)], Ho = (e, t, n) => {
	if (t._n) return t;
	let r = Tr((...e) => Vo(t(...e)), n);
	return r._c = !1, r;
}, Uo = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Bo(n)) continue;
		let i = e[n];
		if (y(i)) t[n] = Ho(n, i, r);
		else if (i != null) {
			let e = Vo(i);
			t[n] = () => e;
		}
	}
}, Wo = (e, t) => {
	let n = Vo(t);
	e.slots.default = () => n;
}, Go = (e, t, n) => {
	for (let r in t) (n || !Bo(r)) && (e[r] = t[r]);
}, Ko = (e, t, n) => {
	let r = e.slots = jo();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Go(r, t, n), n && se(r, "_", e, !0)) : Uo(t, r);
	} else t && Wo(e, t);
}, qo = (e, t, n) => {
	let { vnode: r, slots: a } = e, o = !0, s = i;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? o = !1 : Go(a, t, n) : (o = !t.$stable, Uo(t, a)), s = t;
	} else t && (Wo(e, t), s = { default: 1 });
	if (o) for (let e in a) !Bo(e) && s[e] == null && delete a[e];
}, Jo = bs;
function Yo(e) {
	return Zo(e);
}
function Xo(e) {
	return Zo(e, ki);
}
function Zo(e, t) {
	let n = ue();
	n.__VUE__ = !0;
	let { insert: r, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = o, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, o = null, s = void 0, c = null, l = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Fs(e, t) && (r = he(e), N(e, i, o, !0), e = null), t.patchFlag === -2 && (l = !1, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === a && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = !0);
		let { type: u, ref: d, shapeFlag: f } = t;
		switch (u) {
			case ws:
				y(e, t, n, r);
				break;
			case Ts:
				b(e, t, n, r);
				break;
			case Es:
				e ?? x(t, n, r, s);
				break;
			case Cs:
				ne(e, t, n, r, i, o, s, c, l);
				break;
			default: f & 1 ? w(e, t, n, r, i, o, s, c, l) : f & 6 ? A(e, t, n, r, i, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, n, r, i, o, s, c, l, _e);
		}
		d != null && i ? xi(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && xi(e.ref, null, o, e, !0);
	}, y = (e, t, n, i) => {
		if (e == null) r(t.el = u(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, i) => {
		e == null ? r(t.el = d(t.children || ""), n, i) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = h(e), r(e, n, i), e = a;
		r(t, n, i);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) T(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), O(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, T = (e, t, n, i, a, o, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, o, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, i, a, Qo(e, o), s, u), _ && Dr(e, null, i, "created"), E(d, e, e.scopeId, s, i), m) {
			for (let e in m) e !== "value" && !k(e) && c(d, e, null, m[e], o, i);
			"value" in m && c(d, "value", null, m.value, o), (f = m.onVnodeBeforeMount) && Ys(f, i, e);
		}
		_ && Dr(e, null, i, "beforeMount");
		let v = es(a, g);
		v ? g.beforeEnter(d) : g && !g.persisted && (d[cs] = !0), r(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Jo(() => {
			try {
				f && Ys(f, i, e), v && g.enter(d), _ && Dr(e, null, i, "mounted");
			} finally {}
		}, a);
	}, E = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || os(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				E(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? Ks(e[l]) : Gs(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, O = (e, t, n, r, a, o, s) => {
		let l = t.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = t;
		u |= e.patchFlag & 16;
		let m = e.props || i, h = t.props || i, g;
		if (n && $o(n, !1), (g = h.onVnodeBeforeUpdate) && Ys(g, n, t, e), f && Dr(t, e, n, "beforeUpdate"), n && $o(n, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? ee(e.dynamicChildren, d, l, n, r, Qo(t, a), o) : s || M(e, t, l, null, n, r, Qo(t, a), o, !1), u > 0) {
			if (u & 16) te(l, m, h, n, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], i = m[r], o = h[r];
					(o !== i || r === "value") && c(l, r, i, o, a, n);
				}
			}
			u & 1 && e.children !== t.children && p(l, t.children);
		} else !s && d == null && te(l, m, h, n, a);
		((g = h.onVnodeUpdated) || f) && Jo(() => {
			g && Ys(g, n, t, e), f && Dr(t, e, n, "updated");
		}, r);
	}, ee = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el || as(c), d = u && (c.type === Cs || !Fs(c, l) || c.shapeFlag & 198) ? m(u) : n;
			v(c, l, d, null, r, i, a, o, !0);
		}
	}, te = (e, t, n, r, a) => {
		if (t !== n) {
			if (t !== i) for (let i in t) !k(i) && !(i in n) && c(e, i, t[i], null, a, r);
			for (let i in n) {
				if (k(i)) continue;
				let o = n[i], s = t[i];
				o !== s && i !== "value" && c(e, i, s, o, a, r);
			}
			"value" in n && c(e, "value", t.value, n.value, a);
		}
	}, ne = (e, t, n, i, a, o, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), D(t.children || [], n, f, a, o, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ee(e.dynamicChildren, m, n, a, o, s, c), (t.key != null || a && t === a.subTree) && ts(e, t, !0)) : M(e, t, n, f, a, o, s, c, l);
	}, A = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : re(t, n, r, i, a, o, c) : j(e, t, c);
	}, re = (e, t, n, r, i, a, o) => {
		let s = e.component = $s(e, r, i);
		if (Xi(e) && (s.ctx.renderer = _e), cc(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ie, o, a), !e.el) {
				let r = s.subTree = W(Ts);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ie(s, e, t, n, i, a, o);
	}, j = (e, t, n) => {
		let r = t.component = e.component;
		if (Eo(e, t, n)) {
			if (r.asyncDep && !r.asyncResolved) {
				t.el = e.el, t.placeholder = e.placeholder, ae(r, t, n);
				return;
			}
			r.next = t, r.update();
		} else t.el = e.el, t.placeholder = e.placeholder, r.vnode = t;
	}, ie = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = rs(e);
					if (n) {
						t && (t.el = c.el, ae(e, t, o)), n.asyncDep.then(() => {
							let t = () => {
								e.job.flags & 8 || (i && i.pendingBranch ? Jo(t, i) : l());
							};
							t.flags = 48, Jo(t, i);
						});
						return;
					}
				}
				let u = t, d;
				$o(e, !1), t ? (t.el = c.el, ae(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && Ys(d, s, t, c), $o(e, !0);
				let f = So(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el || as(p)), he(p), e, i, a), t.el = f.el, u === null && ko(e, f.el), r && Jo(r, i), (d = t.props && t.props.onVnodeUpdated) && Jo(() => Ys(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = qi(t);
				if ($o(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && Ys(o, d, t), $o(e, !0), s && P) {
					let t = () => {
						e.subTree = So(e), P(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = So(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Jo(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Jo(() => Ys(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && qi(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Jo(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ge(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => sr(u), $o(e, !0), l();
	}, ae = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Po(e, t.props, r, n), qo(e, t.children, n), ct(), ur(e), lt();
	}, M = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				ce(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				se(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && me(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ce(l, d, n, r, i, a, o, s, c) : me(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, se = (e, t, n, r, i, o, s, c, l) => {
		e ||= a, t ||= a;
		let u = e.length, d = t.length, f = Math.min(u, d), p = 0;
		for (; p < f; p++) {
			let r = t[p] = l ? Ks(t[p]) : Gs(t[p]);
			v(e[p], r, n, null, i, o, s, c, l);
		}
		u > d ? me(e, i, o, !0, !1, f) : D(t, n, r, i, o, s, c, l, f);
	}, ce = (e, t, n, r, i, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let r = e[u], a = t[u] = l ? Ks(t[u]) : Gs(t[u]);
			if (Fs(r, a)) v(r, a, n, null, i, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let r = e[f], a = t[p] = l ? Ks(t[p]) : Gs(t[p]);
			if (Fs(r, a)) v(r, a, n, null, i, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, a = e < d ? t[e].el : r;
				for (; u <= p;) v(null, t[u] = l ? Ks(t[u]) : Gs(t[u]), n, a, i, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) N(e[u], i, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Ks(t[u]) : Gs(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let r = e[u];
				if (y >= b) {
					N(r, i, o, !0);
					continue;
				}
				let a;
				if (r.key != null) a = g.get(r.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Fs(r, t[_])) {
					a = _;
					break;
				}
				a === void 0 ? N(r, i, o, !0) : (C[a - h] = u + 1, a >= S ? S = a : x = !0, v(r, t[a], n, null, i, o, s, c, l), y++);
			}
			let w = x ? ns(C) : a;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, a = t[e], f = t[e + 1], p = e + 1 < d ? f.el || as(f) : r;
				C[u] === 0 ? v(null, a, n, p, i, o, s, c, l) : x && (_ < 0 || u !== w[_] ? le(a, n, p, 2) : _--);
			}
		}
	}, le = (e, t, n, i, a = null) => {
		let { el: o, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) le(e.component.subTree, t, n, i);
		else if (d & 128) e.suspense.move(t, n, i);
		else if (d & 64) c.move(e, t, n, _e);
		else if (c === Cs) {
			r(o, t, n);
			for (let e = 0; e < u.length; e++) le(u[e], t, n, i);
			r(e.anchor, t, n);
		} else if (c === Es) S(e, t, n);
		else if (i !== 2 && d & 1 && l) {
			if (i === 0) l.persisted && !o[ei] ? r(o, t, n) : (l.beforeEnter(o), r(o, t, n), Jo(() => l.enter(o), a));
			else {
				let { leave: i, delayLeave: a, afterLeave: c } = l, u = () => {
					e.ctx.isUnmounted ? s(o) : r(o, t, n);
				}, d = () => {
					let e = o._isLeaving || !!o[ei];
					o._isLeaving && o[ei](!0), l.persisted && !e ? u() : i(o, () => {
						u(), c && c();
					});
				};
				a ? a(o, u, d) : d();
			}
		} else r(o, t, n);
	}, N = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if ((d === -2 || l && l.hasOnce) && (i = !1), s != null && (ct(), xi(s, null, n, e, !0), lt()), p == null || e.ctx && e.ctx !== t || (t.renderCache[p] = void 0), u & 256 && t.ctx.deactivate(e)) return;
		let h = u & 1 && f, g = !qi(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Ys(_, t, e), u & 6) pe(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Dr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, _e, r) : l && !l.hasOnce && (a !== Cs || d > 0 && d & 64) ? me(l, t, n, !1, !0) : (a === Cs && d & 384 || !i && u & 16) && me(c, t, n), r && de(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && Jo(() => {
			_ && Ys(_, t, e), h && Dr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, de = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e, a = t === Cs;
		if (a && !i) {
			fe(n, r);
			return;
		}
		if (t === Es) {
			C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
			return;
		}
		let o = a ? mi(e) : e, c = () => {
			a ? m(n) && fe(n, r) : s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (o && o.shapeFlag & 1 && i && !i.persisted) {
			let { leave: e, delayLeave: t } = i, n = o.el, r = () => e(n, c);
			t ? t(n, c, r) : r();
		} else c();
	}, fe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, pe = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		is(c), is(l), r && oe(r), i.stop(), a ? (a.flags |= 8, N(o, e, t, n)) : o && (o.transition = e.vnode.transition, N(o, e, t, n)), s && Jo(s, t);
		let u = () => {
			e.isUnmounted = !0;
		};
		u.flags = 16, Jo(u, t);
	}, me = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) N(e[o], t, n, r, i);
	}, he = (e) => {
		if (e.shapeFlag & 6) return he(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Vr];
		return n ? h(n) : t;
	}, ge = (e, t, n) => {
		pr(() => {
			e == null ? t._vnode && N(t._vnode, null, null, !0) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e;
		}, e && t._vnode ? void 0 : e && e.component ? e.component.uid : Qs());
	}, _e = {
		p: v,
		um: N,
		m: le,
		r: de,
		mt: re,
		mc: D,
		pc: M,
		pbc: ee,
		n: he,
		o: e
	}, ve, P;
	return t && ([ve, P] = t(_e)), {
		render: ge,
		hydrate: ve,
		createApp: mo(ge, ve)
	};
}
function Qo({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function $o({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function es(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ts(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (m(r) && m(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Ks(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && ts(t, a)), a.type === ws && (a.patchFlag === -1 && (a = i[e] = Ks(a)), a.el = t.el), a.type === Ts && !a.el && (a.el = t.el);
	}
}
function ns(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function rs(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : rs(t);
}
function is(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function as(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	if (t) return as(t.subTree);
	let n = e.suspense;
	return n && n.activeBranch ? as(n.activeBranch) : null;
}
var os = (e) => e.__isSuspense, ss = 0, cs = /* @__PURE__ */ Symbol("_deferredEnter"), ls = {
	name: "Suspense",
	__isSuspense: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		if (e == null) ps(t, n, r, i, a, o, s, c, l);
		else {
			let u = e.suspense;
			if (a && a.deps > 0 && !a.isHydrating) {
				let n = u.parentComponent;
				if (n && n.suspense === a && n.suspenseId !== a.pendingId ? a.pendingBranch && !Fs(t.ssContent, u.pendingBranch || u.activeBranch) : !u.isInFallback) {
					t.suspense = u, u.vnode = t, t.el = e.el;
					return;
				}
			}
			ms(e, t, n, r, i, o, s, c, l);
		}
	},
	hydrate: gs,
	normalize: _s
};
function us(e, t) {
	let n = e.props && e.props[t];
	y(n) && n();
}
function ds(e) {
	let t = [];
	fs(e, t, !0), t.length && lr(t);
}
function fs(e, t, n) {
	let { el: r, transition: i, children: a, shapeFlag: o } = e;
	if (o & 6) fs(e.component.subTree, t, n);
	else if (!(o & 192) && (o & 1 && (!n && r && r[cs] && (r[cs] = void 0, i && !i.persisted && (i.beforeEnter(r), t.push(() => i.enter(r)))), n = !1), o & 16)) for (let e = 0; e < a.length; e++) fs(a[e], t, n);
}
function ps(e, t, n, r, i, a, o, s, c) {
	let { p: l, o: { createElement: u } } = c, d = u("div"), f = e.suspense = hs(e, i, r, t, d, n, a, o, s, c);
	l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (us(e, "onPending"), us(e, "onFallback"), l(null, e.ssFallback, t, n, r, null, a, o), xs(f, e.ssFallback)) : f.resolve(!1, !0);
}
function ms(e, t, n, r, i, a, o, s, { p: c, um: l, o: { createElement: u } }) {
	let d = t.suspense = e.suspense;
	d.vnode = t, t.el = e.el;
	let f = t.ssContent, p = t.ssFallback, { activeBranch: m, pendingBranch: h, isInFallback: g, isHydrating: _ } = d;
	if (h) d.pendingBranch = f, Fs(h, f) ? (d.deps++, c(h, f, _ ? n : d.hiddenContainer, null, i, d, a, o, s), d.deps--, d.deps <= 0 ? d.resolve() : g && !_ && !d.isFallbackMountPending && (c(m, p, n, r, i, null, a, o, s), xs(d, p))) : (d.pendingId = ss++, _ ? (d.isHydrating = !1, d.activeBranch = h) : l(h, i, d), d.deps = 0, ys(d), d.hiddenContainer = u("div"), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : d.isFallbackMountPending || (c(m, p, n, r, i, null, a, o, s), xs(d, p))) : m && Fs(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(!0)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));
	else if (m && Fs(m, f)) c(m, f, n, r, i, d, a, o, s), xs(d, f);
	else if (us(t, "onPending"), d.pendingBranch = f, d.pendingId = ss++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();
	else {
		let { timeout: e } = d;
		e > 0 ? d.timeoutTimer = setTimeout(() => {
			d.timeoutTimer = void 0, d.fallback(d.vnode.ssFallback);
		}, e) : e === 0 && d.fallback(p);
	}
}
function hs(e, t, n, r, i, a, o, s, c, l, u = !1) {
	let { p: d, m: f, um: p, n: m, o: { parentNode: h, remove: g } } = l, _, v = Ss(e);
	v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
	let y = e.props ? le(e.props.timeout) : void 0, b = a, x = {
		vnode: e,
		parent: t,
		parentComponent: n,
		namespace: o,
		container: r,
		hiddenContainer: i,
		deps: 0,
		pendingId: ss++,
		timeout: typeof y == "number" ? y : -1,
		timeoutTimer: void 0,
		activeBranch: null,
		isFallbackMountPending: !1,
		pendingBranch: null,
		isInFallback: !u,
		isHydrating: u,
		isUnmounted: !1,
		effects: [],
		resolve(e = !1, n = !1) {
			let { vnode: r, activeBranch: i, pendingBranch: o, pendingId: s, effects: c, parentComponent: l, container: u, isInFallback: d } = x, g = !1;
			if (x.isHydrating) x.isHydrating = !1;
			else if (!e) {
				g = i && o.transition && o.transition.mode === "out-in";
				let e = !1;
				g && (i.transition.afterLeave = () => {
					s === x.pendingId && !x.isUnmounted && (ds(o), f(o, u, a === b && !e ? m(i) : a, 0), lr(c), d && r.ssFallback && (r.ssFallback.el = null));
				}), i && !x.isFallbackMountPending && (h(i.el || as(i)) === u && (a = m(i), e = !0), p(i, l, x, !0), !g && d && r.ssFallback && Jo(() => r.ssFallback.el = null, x)), g || (ds(o), f(o, u, a, 0));
			}
			clearTimeout(x.timeoutTimer), x.timeoutTimer = void 0, x.isFallbackMountPending = !1, xs(x, o), x.pendingBranch = null, x.isInFallback = !1;
			let y = 0;
			for (let e = 0; e < c.length; e++) {
				let t = c[e];
				t.flags & 32 ? lr(t) : c[y++] = t;
			}
			c.length = y;
			let S = x.parent, C = !1;
			for (; S;) {
				if (S.pendingBranch) {
					for (let e = 0; e < c.length; e++) S.effects.push(c[e]);
					C = !0;
					break;
				}
				S = S.parent;
			}
			!C && !g && lr(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (_ = void 0, t.deps--, t.deps === 0 && !n && t.resolve()), us(r, "onResolve");
		},
		fallback(e) {
			if (x.isUnmounted || !x.pendingBranch) return;
			let { vnode: t, activeBranch: n, parentComponent: r, container: i, namespace: a } = x;
			us(t, "onFallback");
			let o = m(n), l = () => {
				if (x.isFallbackMountPending = !1, x.isUnmounted || !x.isInFallback) return;
				let e = x.vnode.ssFallback;
				d(null, e, i, o, r, null, a, s, c), xs(x, e);
			}, u = e.transition && e.transition.mode === "out-in";
			u && (x.isFallbackMountPending = !0, n.transition.afterLeave = l), x.isInFallback = !0, p(n, r, null, !0), u || l();
		},
		move(e, t, n) {
			x.activeBranch && f(x.activeBranch, e, t, n), x.container = e;
		},
		next() {
			return x.activeBranch && m(x.activeBranch);
		},
		registerDep(e, t, n, r) {
			let i = !!x.pendingBranch;
			i && x.deps++;
			let a = e.vnode.el, o = (i) => {
				e.asyncResolved = !0;
				let { vnode: o } = e;
				uc(e, i, !1), a && (o.el = a);
				let s = !a && e.subTree.el;
				t(e, o, h(a || e.subTree.el), a ? null : m(e.subTree), x, r, n), s && (o.placeholder = null, g(s)), ko(e, o.el);
			};
			e.asyncDep.catch((t) => (Xn(t, e, 0, !1, !0), () => null)).then((t) => {
				if (e.isUnmounted || x.isUnmounted) return;
				let n = i && x.pendingId === e.suspenseId;
				if (ac(), !e.scope.active) n && --x.deps === 0 && x.resolve();
				else if (!n && x.pendingBranch) {
					let n = () => {
						e.isUnmounted || x.isUnmounted || !e.scope.active || (x.pendingBranch ? bs(n, x) : o(t));
					};
					n.flags = 48, bs(n, x);
				} else o(t), n && --x.deps === 0 && x.resolve();
			});
		},
		unmount(e, t) {
			if (x.isUnmounted = !0, clearTimeout(x.timeoutTimer), x.timeoutTimer = void 0, _ !== void 0) {
				let e = x.parent, t = _;
				_ = void 0, lr(() => {
					e.pendingId === t && !e.isUnmounted && --e.deps === 0 && e.resolve();
				});
			}
			x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && (p(x.pendingBranch, n, x, t), ys(x));
		}
	};
	return x;
}
function gs(e, t, n, r, i, a, o, s, c) {
	let l = t.suspense = hs(t, r, n, e.parentNode, document.createElement("div"), null, i, a, o, s, !0), u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
	return l.deps === 0 && l.resolve(!1, !0), u;
}
function _s(e) {
	let { shapeFlag: t, children: n } = e, r = t & 32;
	e.ssContent = vs(r ? n.default : n), e.ssFallback = r ? vs(n.fallback) : W(Ts);
}
function vs(e) {
	let t;
	if (y(e)) {
		let n = As && e._c;
		n && (e._d = !1, V()), e = e(), n && (e._d = !0, t = Os, ks());
	}
	return m(e) && (e = Co(e)), e = Gs(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((t) => t !== e)), e;
}
function ys(e) {
	let { effects: t } = e;
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		n.flags & 16 && lr(n);
	}
	t.length = 0;
}
function bs(e, t) {
	t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : lr(e);
}
function xs(e, t) {
	e.activeBranch = t;
	let { vnode: n, parentComponent: r } = e, i = t.el;
	for (; !i && t.component;) t = t.component.subTree, i = t.el;
	n.el = i, r && r.subTree === n && (r.vnode.el = i, ko(r, i));
}
function Ss(e) {
	let t = e.props && e.props.suspensible;
	return t != null && t !== !1;
}
var Cs = /* @__PURE__ */ Symbol.for("v-fgt"), ws = /* @__PURE__ */ Symbol.for("v-txt"), Ts = /* @__PURE__ */ Symbol.for("v-cmt"), Es = /* @__PURE__ */ Symbol.for("v-stc"), Ds = [], Os = null;
function V(e = !1) {
	Ds.push(Os = e ? null : []);
}
function ks() {
	Ds.pop(), Os = Ds[Ds.length - 1] || null;
}
var As = 1;
function js(e, t = !1) {
	As += e, e < 0 && Os && t && (Os.hasOnce = !0);
}
function Ms(e) {
	return e.dynamicChildren = As > 0 ? Os || a : null, ks(), As > 0 && Os && Os.push(e), e;
}
function H(e, t, n, r, i, a) {
	return Ms(U(e, t, n, r, i, a, !0));
}
function Ns(e, t, n, r, i) {
	return Ms(W(e, t, n, r, i, !0));
}
function Ps(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Fs(e, t) {
	return e.type === t.type && e.key === t.key;
}
function Is(e) {}
var Ls = ({ key: e }) => e ?? null, Rs = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : b(e) || /* @__PURE__ */ R(e) || y(e) ? {
	i: yr,
	r: e,
	k: t,
	f: !!n
} : e);
function U(e, t = null, n = null, r = 0, i = null, a = e === Cs ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Ls(t),
		ref: t && Rs(t),
		scopeId: br,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: yr
	};
	return s ? (qs(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= b(n) ? 8 : 16), As > 0 && !o && Os && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Os.push(c), c;
}
var W = zs;
function zs(e, t = null, n = null, r = 0, i = null, a = !1) {
	if (e && e !== ba || (e = Ts), Ps(e)) {
		let r = Vs(e, t, !0);
		return n && qs(r, n), As > 0 && !a && Os && (r.shapeFlag & 6 ? Os[Os.indexOf(e)] = r : Os.push(r)), r.patchFlag = -2, r;
	}
	if (xc(e) && (e = e.__vccOpts), t) {
		t = Bs(t);
		let { class: e, style: n } = t;
		e && !b(e) && (t.class = ve(e)), S(n) && (/* @__PURE__ */ pn(n) && !m(n) && (n = u({}, n)), t.style = pe(n));
	}
	let o = b(e) ? 1 : os(e) ? 128 : Hr(e) ? 64 : S(e) ? 4 : y(e) ? 2 : 0;
	return U(e, t, n, r, i, o, a, !0);
}
function Bs(e) {
	return e ? /* @__PURE__ */ pn(e) ? u({}, e) : Mo(e) ? u({}, e[gc] || e) : e : null;
}
function Vs(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Js(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Ls(l),
		ref: t && t.ref ? n && a ? m(a) ? a.concat(Rs(t)) : [a, Rs(t)] : Rs(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Cs ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Vs(e.ssContent),
		ssFallback: e.ssFallback && Vs(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
		cacheIndex: e.cacheIndex
	};
	return c && r && fi(u, c.clone(u)), u;
}
function Hs(e = " ", t = 0) {
	return W(ws, null, e, t);
}
function Us(e, t) {
	let n = W(Es, null, e);
	return n.staticCount = t, n;
}
function Ws(e = "", t = !1) {
	return t ? (V(), Ns(Ts, null, e)) : W(Ts, null, e);
}
function Gs(e) {
	return e == null || typeof e == "boolean" ? W(Ts) : m(e) ? W(Cs, null, e.slice()) : Ps(e) ? Ks(e) : W(ws, null, String(e));
}
function Ks(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Vs(e);
}
function qs(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (m(t)) n = 16;
	else if (typeof t == "object") {
		if (r & 65) {
			let n = t.default;
			n && (n._c && (n._d = !1), qs(e, n()), n._c && (n._d = !0));
			return;
		}
		{
			n = 32;
			let r = t._;
			!r && !Mo(t) ? t._ctx = yr : r === 3 && yr && (yr.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
		}
	} else if (y(t)) {
		if (r & 65) {
			qs(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: yr
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Hs(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function Js(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = ve([t.class, r.class]));
		else if (e === "style") t.style = pe([t.style, r.style]);
		else if (c(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(m(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !l(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Ys(e, t, n, r = null) {
	Yn(e, t, 7, [n, r]);
}
var Xs = /* @__PURE__ */ fo(), Zs = 0;
function Qs() {
	return Zs;
}
function $s(e, t, n) {
	let r = e.type, a = (t ? t.appContext : e.appContext) || Xs, o = {
		uid: Zs++,
		vnode: e,
		type: r,
		parent: t,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Be(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(a.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Ro(r, a),
		emitsOptions: bo(r, a),
		emit: null,
		emitted: null,
		propsDefaults: i,
		inheritAttrs: r.inheritAttrs,
		ctx: i,
		data: i,
		props: i,
		attrs: i,
		slots: i,
		refs: i,
		setupState: i,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = vo.bind(null, o), e.ce && e.ce(o), o;
}
var ec = null, tc = () => ec || yr, nc, rc;
{
	let e = ue(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	nc = t("__VUE_INSTANCE_SETTERS__", (e) => ec = e), rc = t("__VUE_SSR_SETTERS__", (e) => sc = e);
}
var ic = (e) => {
	let t = ec;
	return nc(e), e.scope.on(), () => {
		e.scope.off(), nc(t);
	};
}, ac = () => {
	ec && ec.scope.off(), nc(null);
};
function oc(e) {
	return e.vnode.shapeFlag & 4;
}
var sc = !1;
function cc(e, t = !1, n = !1) {
	t && rc(t);
	let { props: r, children: i } = e.vnode, a = oc(e);
	No(e, r, a, t), Ko(e, i, n || t);
	let o = a ? lc(e, t) : void 0;
	return t && rc(!1), o;
}
function lc(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Na);
	let { setup: r } = n;
	if (r) {
		ct();
		let n = e.setupContext = r.length > 1 ? vc(e) : null, i = ic(e), a = Jn(r, e, 0, [e.props, n]), o = C(a);
		if (lt(), i(), (o || e.sp) && !qi(e) && _i(e), o) {
			if (a.then(ac, ac), t) return a.then((n) => {
				rc(!0);
				try {
					uc(e, n, t);
				} finally {
					rc(!1);
				}
			}).catch((t) => {
				Xn(t, e, 0, void 0, !0), e.ssrRender = (e, t) => t("<!---->");
			});
			e.asyncDep = a;
		} else uc(e, a, t);
	} else hc(e, t);
}
function uc(e, t, n) {
	y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : S(t) && (e.setupState = Cn(t)), hc(e, n);
}
var dc, fc;
function pc(e) {
	dc = e, fc = (e) => {
		e.render._rc && (e.withProxy = new Proxy(e.ctx, Pa));
	};
}
var mc = () => !dc;
function hc(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && dc && !r.render) {
			let t = r.template || to(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r, s = u(u({
					isCustomElement: n,
					delimiters: a
				}, i), o);
				r.render = dc(t, s);
			}
		}
		e.render = r.render || o, fc && fc(e);
	}
	{
		let t = ic(e);
		ct();
		try {
			Za(e);
		} finally {
			lt(), t();
		}
	}
}
var gc = /* @__PURE__ */ Symbol(), _c = { get(e, t) {
	return yt(e, "get", ""), t === gc ? e : e[t];
} };
function vc(e) {
	return {
		attrs: new Proxy(e.attrs, _c),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function yc(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Cn(mn(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in ja) return ja[n](e);
		},
		has(e, t) {
			return t in e || t in ja;
		}
	}) : e.proxy;
}
function bc(e, t = !0) {
	return y(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function xc(e) {
	return y(e) && "__vccOpts" in e;
}
var G = (e, t) => /* @__PURE__ */ Mn(e, t, sc);
function K(e, t, n) {
	try {
		js(-1);
		let r = arguments.length;
		return r === 2 ? S(t) && !m(t) ? Ps(t) ? W(e, null, [t]) : W(e, t) : W(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Ps(n) && (n = [n]), W(e, t, n));
	} finally {
		js(1);
	}
}
function Sc() {}
function Cc(e, t, n, r) {
	let i = n[r];
	if (i && wc(i, e)) return i;
	let a = t();
	return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function wc(e, t) {
	let n = e.memo;
	if (n.length != t.length) return !1;
	for (let e = 0; e < n.length; e++) if (M(n[e], t[e])) return !1;
	return As > 0 && Os && Os.push(e), !0;
}
var Tc = "3.5.45", Ec = o, Dc = qn, Oc = gr, kc = vr, Ac = {
	createComponentInstance: $s,
	setupComponent: cc,
	renderComponentRoot: So,
	setCurrentRenderingInstance: xr,
	isVNode: Ps,
	normalizeVNode: Gs,
	getComponentPublicInstance: yc,
	ensureValidVNode: Oa,
	pushWarningContext: Un,
	popWarningContext: Wn
}, jc = /* @__PURE__ */ e({
	BaseTransition: () => si,
	BaseTransitionPropsValidators: () => ii,
	Comment: () => Ts,
	DeprecationTypes: () => null,
	EffectScope: () => Be,
	ErrorCodes: () => Kn,
	ErrorTypeStrings: () => Dc,
	Fragment: () => Cs,
	KeepAlive: () => Zi,
	ReactiveEffect: () => Ge,
	Static: () => Es,
	Suspense: () => ls,
	Teleport: () => Zr,
	Text: () => ws,
	TrackOpTypes: () => Nn,
	Transition: () => Gc,
	TransitionGroup: () => tu,
	TriggerOpTypes: () => Pn,
	VueElement: () => Kl,
	assertNumber: () => Gn,
	callWithAsyncErrorHandling: () => Yn,
	callWithErrorHandling: () => Jn,
	camelize: () => A,
	capitalize: () => ie,
	cloneVNode: () => Vs,
	compatUtils: () => null,
	computed: () => G,
	createApp: () => Hu,
	createBlock: () => Ns,
	createCommentVNode: () => Ws,
	createElementBlock: () => H,
	createElementVNode: () => U,
	createHydrationRenderer: () => Xo,
	createPropsRestProxy: () => Ja,
	createRenderer: () => Yo,
	createSSRApp: () => Uu,
	createSlots: () => Ea,
	createStaticVNode: () => Us,
	createTextVNode: () => Hs,
	createVNode: () => W,
	customRef: () => Tn,
	defineAsyncComponent: () => Ji,
	defineComponent: () => hi,
	defineCustomElement: () => Ul,
	defineEmits: () => Ia,
	defineExpose: () => La,
	defineModel: () => Ba,
	defineOptions: () => Ra,
	defineProps: () => Fa,
	defineSSRCustomElement: () => Wl,
	defineSlots: () => za,
	devtools: () => Oc,
	effect: () => it,
	effectScope: () => Ve,
	getCurrentInstance: () => tc,
	getCurrentScope: () => He,
	getCurrentWatcher: () => Rn,
	getTransitionRawChildren: () => pi,
	guardReactiveProps: () => Bs,
	h: () => K,
	handleError: () => Xn,
	hasInjectionContext: () => Ar,
	hydrate: () => Vu,
	hydrateOnIdle: () => Vi,
	hydrateOnInteraction: () => Gi,
	hydrateOnMediaQuery: () => Wi,
	hydrateOnVisible: () => Ui,
	initCustomFormatter: () => Sc,
	initDirectivesForSSR: () => qu,
	inject: () => kr,
	isMemoSame: () => wc,
	isProxy: () => pn,
	isReactive: () => un,
	isReadonly: () => dn,
	isRef: () => R,
	isRuntimeOnly: () => mc,
	isShallow: () => fn,
	isVNode: () => Ps,
	markRaw: () => mn,
	mergeDefaults: () => Ka,
	mergeModels: () => qa,
	mergeProps: () => Js,
	nextTick: () => ar,
	nodeOps: () => zc,
	normalizeClass: () => ve,
	normalizeProps: () => P,
	normalizeStyle: () => pe,
	onActivated: () => $i,
	onBeforeMount: () => sa,
	onBeforeUnmount: () => da,
	onBeforeUpdate: () => la,
	onDeactivated: () => ea,
	onErrorCaptured: () => ga,
	onMounted: () => ca,
	onRenderTracked: () => ha,
	onRenderTriggered: () => ma,
	onScopeDispose: () => Ue,
	onServerPrefetch: () => pa,
	onUnmounted: () => fa,
	onUpdated: () => ua,
	onWatcherCleanup: () => zn,
	openBlock: () => V,
	patchProp: () => zl,
	popScopeId: () => Cr,
	provide: () => Or,
	proxyRefs: () => Cn,
	pushScopeId: () => Sr,
	queuePostFlushCb: () => lr,
	reactive: () => an,
	readonly: () => sn,
	ref: () => _n,
	registerRuntimeCompiler: () => pc,
	render: () => Bu,
	renderList: () => Ta,
	renderSlot: () => Da,
	resolveComponent: () => ya,
	resolveDirective: () => Sa,
	resolveDynamicComponent: () => xa,
	resolveFilter: () => null,
	resolveTransitionHooks: () => li,
	setBlockTracking: () => js,
	setDevtoolsHook: () => kc,
	setTransitionHooks: () => fi,
	shallowReactive: () => on,
	shallowReadonly: () => cn,
	shallowRef: () => z,
	ssrContextKey: () => jr,
	ssrUtils: () => Ac,
	stop: () => at,
	toDisplayString: () => F,
	toHandlerKey: () => ae,
	toHandlers: () => ka,
	toRaw: () => L,
	toRef: () => kn,
	toRefs: () => En,
	toValue: () => B,
	transformVNodeArgs: () => Is,
	triggerRef: () => bn,
	unref: () => xn,
	useAttrs: () => Ua,
	useCssModule: () => Yl,
	useCssVars: () => pl,
	useHost: () => ql,
	useId: () => gi,
	useModel: () => go,
	useSSRContext: () => Mr,
	useShadowRoot: () => Jl,
	useSlots: () => Ha,
	useTemplateRef: () => vi,
	useTransitionState: () => ni,
	vModelCheckbox: () => vu,
	vModelDynamic: () => Eu,
	vModelRadio: () => bu,
	vModelSelect: () => xu,
	vModelText: () => _u,
	vShow: () => ll,
	version: () => Tc,
	warn: () => Ec,
	watch: () => Ir,
	watchEffect: () => Nr,
	watchPostEffect: () => Pr,
	watchSyncEffect: () => Fr,
	withAsyncContext: () => Ya,
	withCtx: () => Tr,
	withDefaults: () => Va,
	withDirectives: () => Er,
	withKeys: () => Pu,
	withMemo: () => Cc,
	withModifiers: () => Mu,
	withScopeId: () => wr
}), Mc = void 0, Nc = typeof window < "u" && window.trustedTypes;
if (Nc) try {
	Mc = /* @__PURE__ */ Nc.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Pc = Mc ? (e) => Mc.createHTML(e) : (e) => e, Fc = "http://www.w3.org/2000/svg", Ic = "http://www.w3.org/1998/Math/MathML", Lc = typeof document < "u" ? document : null, Rc = Lc && /* @__PURE__ */ Lc.createElement("template"), zc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Lc.createElementNS(Fc, e) : t === "mathml" ? Lc.createElementNS(Ic, e) : n ? Lc.createElement(e, { is: n }) : Lc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Lc.createTextNode(e),
	createComment: (e) => Lc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Lc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), i !== a && (i = i.nextSibling););
		else {
			Rc.innerHTML = Pc(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Rc.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Bc = "transition", Vc = "animation", Hc = /* @__PURE__ */ Symbol("_vtc"), Uc = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, Wc = /* @__PURE__ */ u({}, ii, Uc), Gc = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Wc, e))((e, { slots: t }) => K(si, Jc(e), t)), Kc = (e, t = []) => {
	m(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, qc = (e) => e ? m(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Jc(e) {
	let t = {};
	for (let n in e) n in Uc || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: s = `${n}-enter-to`, appearFromClass: c = a, appearActiveClass: l = o, appearToClass: d = s, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Yc(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, Qc(e, t ? d : s), Qc(e, t ? l : o), n && n();
	}, D = (e, t) => {
		e._isLeaving = !1, Qc(e, f), Qc(e, m), Qc(e, p), t && t();
	}, O = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		Kc(i, [t, o]), $c(() => {
			Qc(t, e ? c : a), Zc(t, e ? d : s), qc(i) || tl(t, r, g, o);
		});
	};
	return u(t, {
		onBeforeEnter(e) {
			Kc(v, [e]), Zc(e, a), Zc(e, o);
		},
		onBeforeAppear(e) {
			Kc(C, [e]), Zc(e, c), Zc(e, l);
		},
		onEnter: O(!1),
		onAppear: O(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => D(e, t);
			Zc(e, f), e._enterCancelled ? (Zc(e, p), al(e)) : (al(e), Zc(e, p)), $c(() => {
				e._isLeaving && (Qc(e, f), Zc(e, m), qc(x) || tl(e, r, _, n));
			}), Kc(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), Kc(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), Kc(T, [e]);
		},
		onLeaveCancelled(e) {
			D(e), Kc(S, [e]);
		}
	});
}
function Yc(e) {
	if (e == null) return null;
	if (S(e)) return [Xc(e.enter), Xc(e.leave)];
	{
		let t = Xc(e);
		return [t, t];
	}
}
function Xc(e) {
	return le(e);
}
function Zc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Hc] || (e[Hc] = /* @__PURE__ */ new Set())).add(t);
}
function Qc(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Hc];
	n && (n.delete(t), n.size || (e[Hc] = void 0));
}
function $c(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var el = 0;
function tl(e, t, n, r) {
	let i = e._endId = ++el, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = nl(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function nl(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Bc}Delay`), a = r(`${Bc}Duration`), o = rl(i, a), s = r(`${Vc}Delay`), c = r(`${Vc}Duration`), l = rl(s, c), u = null, d = 0, f = 0;
	t === Bc ? o > 0 && (u = Bc, d = o, f = a.length) : t === Vc ? l > 0 && (u = Vc, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Bc : Vc : null, f = u ? u === Bc ? a.length : c.length : 0);
	let p = u === Bc && /\b(?:transform|all)(?:,|$)/.test(r(`${Bc}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function rl(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => il(t) + il(e[n])));
}
function il(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function al(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function ol(e, t, n) {
	let r = e[Hc];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var sl = /* @__PURE__ */ Symbol("_vod"), cl = /* @__PURE__ */ Symbol("_vsh"), ll = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[sl] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ul(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), ul(e, !0), r.enter(e)) : r.leave(e, () => {
			ul(e, !1);
		}) : ul(e, t));
	},
	beforeUnmount(e, { value: t }) {
		ul(e, t);
	}
};
function ul(e, t) {
	e.style.display = t ? e[sl] : "none", e[cl] = !t;
}
function dl() {
	ll.getSSRProps = ({ value: e }) => {
		if (!e) return { style: { display: "none" } };
	};
}
var fl = /* @__PURE__ */ Symbol("");
function pl(e) {
	let t = tc();
	if (!t) return;
	let n = t.ut = (n = e(t.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e) => hl(e, n));
	}, r = () => {
		let r = e(t.proxy);
		t.ce ? hl(t.ce, r) : ml(t.subTree, r), n(r);
	};
	la(() => {
		lr(r);
	}), ca(() => {
		Ir(r, o, { flush: "post" });
		let e = new MutationObserver(r);
		e.observe(t.subTree.el.parentNode, { childList: !0 }), fa(() => e.disconnect());
	});
}
function ml(e, t) {
	if (e.shapeFlag & 128) {
		let n = e.suspense;
		e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
			ml(n.activeBranch, t);
		});
	}
	for (; e.component;) e = e.component.subTree;
	if (e.shapeFlag & 1 && e.el) hl(e.el, t);
	else if (e.type === Cs) e.children.forEach((e) => ml(e, t));
	else if (e.type === Es) {
		let { el: n, anchor: r } = e;
		for (; n && (hl(n, t), n !== r);) n = n.nextSibling;
	}
}
function hl(e, t) {
	if (e.nodeType === 1) {
		let n = e.style, r = "";
		for (let e in t) {
			let i = Re(t[e]);
			n.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
		}
		n[fl] = r;
	}
}
var gl = /(?:^|;)\s*display\s*:/;
function _l(e, t, n) {
	let r = e.style, i = b(n), a = !1;
	if (n && !i) {
		if (t) {
			if (b(t)) for (let e of t.split(";")) {
				let t = e.slice(0, e.indexOf(":")).trim();
				n[t] ?? yl(r, t, "");
			}
			else for (let e in t) n[e] ?? yl(r, e, "");
		}
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? yl(r, i, "") : Cl(e, i, !b(t) && t ? t[i] : void 0, o) || yl(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[fl];
			e && (n += ";" + e), r.cssText = n, a = gl.test(n);
		}
	} else t && e.removeAttribute("style");
	sl in e && (i && t === n || (e[sl] = a ? r.display : ""), e[cl] && (r.display = "none"));
}
var vl = /\s*!important$/;
function yl(e, t, n) {
	if (m(n)) n.forEach((n) => yl(e, t, n));
	else if (n ??= "", t.startsWith("--")) vl.test(n) ? e.setProperty(t, n.replace(vl, ""), "important") : e.setProperty(t, n);
	else {
		let r = Sl(e, t);
		vl.test(n) ? e.setProperty(j(r), n.replace(vl, ""), "important") : e[r] = n;
	}
}
var bl = [
	"Webkit",
	"Moz",
	"ms"
], xl = {};
function Sl(e, t) {
	let n = xl[t];
	if (n) return n;
	let r = A(t);
	if (r !== "filter" && r in e) return xl[t] = r;
	r = ie(r);
	for (let n = 0; n < bl.length; n++) {
		let i = bl[n] + r;
		if (i in e) return xl[t] = i;
	}
	return t;
}
function Cl(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && b(r) && n === r;
}
var wl = "http://www.w3.org/1999/xlink";
function Tl(e, t, n, r, i, a = De(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(wl, t.slice(6, t.length)) : e.setAttributeNS(wl, t, n) : n == null || a && !Oe(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : x(n) ? String(n) : n);
}
function El(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Pc(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		r === i && "_value" in e || (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = Oe(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function Dl(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Ol(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var kl = /* @__PURE__ */ Symbol("_vei");
function Al(e, t, n, r, i = null) {
	let a = e[kl] || (e[kl] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Nl(t);
		r ? Dl(e, n, a[t] = Ll(r, i), s) : o && (Ol(e, n, o, s), a[t] = void 0);
	}
}
var jl = /(Once|Passive|Capture)$/, Ml = /^on:?(?:Once|Passive|Capture)$/;
function Nl(e) {
	let t, n;
	for (; (n = e.match(jl)) && !Ml.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : j(e.slice(2)), t];
}
var Pl = 0, Fl = /* @__PURE__ */ Promise.resolve(), Il = () => Pl ||= (Fl.then(() => Pl = 0), Date.now());
function Ll(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (m(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Yn(e, t, 5, a);
			}
		} else Yn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Il(), n;
}
var Rl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, zl = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? ol(e, r, o) : t === "style" ? _l(e, n, r) : c(t) ? l(t) || Al(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), 1) : t[0] === "^" ? (t = t.slice(1), 0) : Bl(e, t, r, o)) ? (El(e, t, r), e.tagName.includes("-") || t !== "value" && t !== "checked" && t !== "selected" || Tl(e, t, r, o, a, t !== "value")) : e._isVueCE && (Vl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !b(r))) ? El(e, A(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Tl(e, t, r, o));
};
function Bl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Rl(t) && y(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Rl(t) && b(n) ? !1 : t in e;
}
function Vl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = A(t);
	return Array.isArray(n) ? n.some((e) => A(e) === r) : Object.keys(n).some((e) => A(e) === r);
}
var Hl = {};
// @__NO_SIDE_EFFECTS__
function Ul(e, t, n) {
	let r = /* @__PURE__ */ hi(e, t);
	D(r) && (r = u({}, r, t));
	class i extends Kl {
		constructor(e) {
			super(r, e, n);
		}
	}
	return i.def = r, i;
}
var Wl = /* @__NO_SIDE_EFFECTS__ */ ((e, t) => /* @__PURE__ */ Ul(e, t, Uu)), Gl = typeof HTMLElement < "u" ? HTMLElement : class {}, Kl = class e extends Gl {
	constructor(e, t = {}, n = Hu) {
		super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._styleAnchors = /* @__PURE__ */ new WeakMap(), this._ob = null, this.shadowRoot && n !== Hu ? this._root = this.shadowRoot : e.shadowRoot === !1 ? this._root = this : (this.attachShadow(u({}, e.shadowRootOptions, { mode: "open" })), this._root = this.shadowRoot);
	}
	connectedCallback() {
		if (!this.isConnected) return;
		!this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
		let t = this;
		for (; t &&= t.assignedSlot || t.parentNode || t.host;) if (t instanceof e) {
			this._parent = t;
			break;
		}
		this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
			if (this._pendingResolve = void 0, this.isConnected) return this._resolveDef();
		}) : this._resolveDef());
	}
	_setParent(e = this._parent) {
		e && (this._instance.parent = e._instance, this._inheritParentContext(e));
	}
	_inheritParentContext(e = this._parent) {
		e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
	}
	disconnectedCallback() {
		this._connected = !1, ar(() => {
			this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), void 0));
		});
	}
	_processMutations(e) {
		for (let t of e) this._setAttr(t.attributeName);
	}
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
		this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
		let e = (e, t = !1) => {
			this._resolved = !0, this._pendingResolve = void 0;
			let { props: n, styles: r } = e, i;
			if (n && !m(n)) for (let e in n) {
				let t = n[e];
				(t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = le(this._props[e])), (i ||= /* @__PURE__ */ Object.create(null))[A(e)] = !0);
			}
			this._numberProps = i, this._resolveProps(e), this.shadowRoot && this._applyStyles(r), this._connected && this._mount(e);
		}, t = this._def.__asyncLoader;
		if (t) return this._pendingResolve = t().then((t) => {
			t.configureApp = this._def.configureApp, e(this._def = t, !0);
		}), this._pendingResolve;
		e(this._def);
	}
	_mount(e) {
		this._app = this._createApp(e), this._inheritParentContext(), e.configureApp && e.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
		let t = this._instance && this._instance.exposed;
		if (t) for (let e in t) p(this, e) || Object.defineProperty(this, e, { get: () => xn(t[e]) });
	}
	_resolveProps(e) {
		let { props: t } = e, n = m(t) ? t : Object.keys(t || {});
		for (let e of Object.keys(this)) e[0] !== "_" && n.includes(e) && this._setProp(e, this[e]);
		for (let e of n.map(A)) Object.defineProperty(this, e, {
			get() {
				return this._getProp(e);
			},
			set(t) {
				this._setProp(e, t, !0, !this._patching);
			}
		});
	}
	_setAttr(e) {
		if (e.startsWith("data-v-")) return;
		let t = this.hasAttribute(e), n = t ? this.getAttribute(e) : Hl, r = A(e);
		t && this._numberProps && this._numberProps[r] && (n = le(n)), this._setProp(r, n, !1, !0);
	}
	_getProp(e) {
		return this._props[e];
	}
	_setProp(e, t, n = !0, r = !1) {
		if (t !== this._props[e] && (this._dirty = !0, t === Hl ? delete this._props[e] : (this._props[e] = t, e === "key" && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
			let n = this._ob;
			n && (this._processMutations(n.takeRecords()), n.disconnect()), t === !0 ? this.setAttribute(j(e), "") : typeof t == "string" || typeof t == "number" ? this.setAttribute(j(e), t + "") : t || this.removeAttribute(j(e)), n && n.observe(this, { attributes: !0 });
		}
	}
	_update() {
		let e = this._createVNode();
		this._app && (e.appContext = this._app._context), Bu(e, this._root);
	}
	_createVNode() {
		let e = {};
		this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
		let t = W(this._def, u(e, this._props));
		return this._instance || (t.ce = (e) => {
			this._instance = e, e.ce = this, e.isCE = !0;
			let t = (e, t) => {
				this.dispatchEvent(new CustomEvent(e, D(t[0]) ? u({ detail: t }, t[0]) : { detail: t }));
			};
			e.emit = (e, ...n) => {
				t(e, n), j(e) !== e && t(j(e), n);
			}, this._setParent();
		}), t;
	}
	_applyStyles(e, t, n) {
		if (!e) return;
		if (t) {
			if (t === this._def || this._styleChildren.has(t)) return;
			this._styleChildren.add(t);
		}
		let r = this._nonce, i = this.shadowRoot, a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(i), o = null;
		for (let s = e.length - 1; s >= 0; s--) {
			let c = document.createElement("style");
			r && c.setAttribute("nonce", r), c.textContent = e[s], i.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
		}
	}
	_getStyleAnchor(e) {
		if (!e) return null;
		let t = this._styleAnchors.get(e);
		return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
	}
	_getRootStyleInsertionAnchor(e) {
		for (let t = 0; t < e.childNodes.length; t++) {
			let n = e.childNodes[t];
			if (!(n instanceof HTMLStyleElement)) return n;
		}
		return null;
	}
	_parseSlots() {
		let e = this._slots = {}, t;
		for (; t = this.firstChild;) {
			let n = t.nodeType === 1 && t.getAttribute("slot") || "default";
			(e[n] || (e[n] = [])).push(t), this.removeChild(t);
		}
	}
	_renderSlots() {
		let e = this._getSlots(), t = this._instance.type.__scopeId;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.getAttribute("name") || "default", a = this._slots[i], o = r.parentNode;
			if (a) for (let e of a) {
				if (t && e.nodeType === 1) {
					let n = t + "-s", r = document.createTreeWalker(e, 1);
					e.setAttribute(n, "");
					let i;
					for (; i = r.nextNode();) i.setAttribute(n, "");
				}
				o.insertBefore(e, r);
			}
			else for (; r.firstChild;) o.insertBefore(r.firstChild, r);
			o.removeChild(r);
		}
	}
	_getSlots() {
		let e = [this];
		this._teleportTargets && e.push(...this._teleportTargets);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) {
			let e = n.querySelectorAll("slot");
			for (let n = 0; n < e.length; n++) t.add(e[n]);
		}
		return Array.from(t);
	}
	_injectChildStyle(e, t) {
		this._applyStyles(e.styles, e, t);
	}
	_beginPatch() {
		this._patching = !0, this._dirty = !1;
	}
	_endPatch() {
		this._patching = !1, this._dirty && this._instance && this._update();
	}
	_hasShadowRoot() {
		return this._def.shadowRoot !== !1;
	}
	_removeChildStyle(e) {}
};
function ql(e) {
	let t = tc();
	return t && t.ce || null;
}
function Jl() {
	let e = ql();
	return e && e.shadowRoot;
}
function Yl(e = "$style") {
	{
		let t = tc();
		if (!t) return i;
		let n = t.type.__cssModules;
		return n && n[e] || i;
	}
}
var Xl = /* @__PURE__ */ new WeakMap(), Zl = /* @__PURE__ */ new WeakMap(), Ql = /* @__PURE__ */ Symbol("_moveCb"), $l = /* @__PURE__ */ Symbol("_enterCb"), eu = /* @__PURE__ */ new WeakMap(), tu = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ u({}, Wc, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = tc(), r = ni(), i, a, o, s, c = () => (s === void 0 && (s = i.length > 0 && uu(i[0].el, n.vnode.el, ru(e))), s);
		return ua(() => {
			if (eu.delete(n), !c()) {
				i = [], o = void 0;
				return;
			}
			let t = ru(e);
			i.forEach(nu);
			let r = o && lu(o, n.vnode.el);
			o = void 0, i.forEach((e) => iu(e, r));
			let a = i.filter(au);
			al(n.vnode.el), a.forEach((e) => {
				let n = e.el, r = n.style;
				Zc(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[Ql] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[Ql] = null, Qc(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let l = /* @__PURE__ */ L(e), u = Jc(l), d = l.tag || Cs;
			if (i = [], s = void 0, a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && !t.el[cl] && (i.push(t), fi(t, li(t, u, r, n)), Xl.set(t, ou(t.el)));
			}
			a = t.default ? pi(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && fi(t, li(t, u, r, n));
			}
			return i.length && (o = su(n), eu.set(n, c)), W(d, null, a);
		};
	}
});
function nu(e) {
	let t = e.el;
	t[Ql] && t[Ql](), t[$l] && t[$l]();
}
function ru(e) {
	return e.moveClass || `${e.name || "v"}-move`;
}
function iu(e, t) {
	Zl.set(e, ou(e.el, t));
}
function au(e) {
	let t = Xl.get(e), n = Zl.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), Number.isFinite(o) && o !== 0 || (o = 1), Number.isFinite(s) && s !== 0 || (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function ou(e, t) {
	let n = e.getBoundingClientRect();
	return {
		left: n.left - (t ? t.left : 0),
		top: n.top - (t ? t.top : 0)
	};
}
function su(e) {
	let t;
	for (let n = e.parent; n; n = n.parent) {
		let r = eu.get(n);
		if (r) {
			let i = cu(n.vnode.el, e.vnode.el);
			i && (t ||= []).push(u(ou(i), {
				item: i,
				willMove: r
			}));
		}
	}
	return t;
}
function cu(e, t) {
	let n = e.nodeType === 1 ? e : e.parentNode;
	for (; t && t.parentNode !== n;) t = t.parentNode;
	if (t && t.nodeType === 1) return t;
}
function lu(e, t) {
	let n = e.find((e) => e.willMove() && e.item.contains(t));
	return n && ou(n.item, n);
}
function uu(e, t, n) {
	let r = e.cloneNode(), i = e[Hc];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = nl(r);
	return a.removeChild(r), o;
}
var du = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return m(t) ? (e) => oe(t, e) : t;
};
function fu(e) {
	e.target.composing = !0;
}
function pu(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var mu = /* @__PURE__ */ Symbol("_assign"), hu = /* @__PURE__ */ Symbol("_initialValue");
function gu(e, t, n) {
	return t && (e = e.trim()), n && (e = ce(e)), e;
}
var _u = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[hu] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[hu] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[mu] = du(i);
		let a = r || i.props && i.props.type === "number";
		Dl(e, t ? "change" : "input", (t) => {
			t.target.composing || e[mu](gu(e.value, n, a));
		}), (n || a) && Dl(e, "change", () => {
			e.value = gu(e.value, n, a);
		}), t || (Dl(e, "compositionstart", fu), Dl(e, "compositionend", pu), Dl(e, "change", pu));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[hu];
		delete e[hu], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[mu](gu(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[mu] = du(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? ce(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, vu = {
	deep: !0,
	created(e, t, n) {
		e[mu] = du(n), Dl(e, "change", () => {
			let t = e._modelValue, n = wu(e), r = e.checked, i = e[mu];
			if (m(t)) {
				let e = Pe(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (g(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Tu(e, r));
		});
	},
	mounted: yu,
	beforeUpdate(e, t, n) {
		e[mu] = du(n), yu(e, t, n);
	}
};
function yu(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (m(t)) i = Pe(t, r.props.value) > -1;
	else if (g(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Ne(t, Tu(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var bu = {
	created(e, { value: t }, n) {
		e.checked = Ne(t, n.props.value), e[mu] = du(n), Dl(e, "change", () => {
			e[mu](wu(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[mu] = du(r), t !== n && (e.checked = Ne(t, r.props.value));
	}
}, xu = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, Dl(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? ce(wu(e)) : wu(e)), r = e.multiple, i = r ? g(e._modelValue) ? new Set(t) : t : t[0], a = e._pendingValue = [r, r ? m(i) ? t.slice() : t : i];
			try {
				e[mu](i);
			} finally {
				ar(() => {
					e._pendingValue === a && (e._pendingValue = void 0);
				});
			}
		}), e[mu] = du(r);
	},
	mounted(e, { value: t, modifiers: { number: n } }) {
		Cu(e, t, n);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[mu] = du(n);
	},
	updated(e, { value: t, modifiers: { number: n } }) {
		let r = e._pendingValue;
		e._pendingValue = void 0, r && r[0] === e.multiple && Su(t, r[1], r[0]) || Cu(e, t, n);
	}
};
function Su(e, t, n) {
	if (!n || m(e)) return Ne(e, t);
	if (g(e)) {
		if (e.size !== t.length) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	return !1;
}
function Cu(e, t, n = !1) {
	let r = e.multiple, i = m(t);
	if (!r || i || g(t)) {
		for (let a = 0, o = e.options.length; a < o; a++) {
			let o = e.options[a], s = wu(o);
			if (r) {
				if (i) {
					let e = typeof s;
					o.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(s)) : Pe(t, s) > -1;
				} else o.selected = t.has(s) || n && typeof s == "string" && t.has(ce(s));
			} else if (Ne(wu(o), t)) {
				e.selectedIndex !== a && (e.selectedIndex = a);
				return;
			}
		}
		!r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function wu(e) {
	return "_value" in e ? e._value : e.value;
}
function Tu(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Eu = {
	created(e, t, n) {
		Ou(e, t, n, null, "created");
	},
	mounted(e, t, n) {
		Ou(e, t, n, null, "mounted");
	},
	beforeUpdate(e, t, n, r) {
		Ou(e, t, n, r, "beforeUpdate");
	},
	updated(e, t, n, r) {
		Ou(e, t, n, r, "updated");
	}
};
function Du(e, t) {
	switch (e) {
		case "SELECT": return xu;
		case "TEXTAREA": return _u;
		default: switch (t) {
			case "checkbox": return vu;
			case "radio": return bu;
			default: return _u;
		}
	}
}
function Ou(e, t, n, r, i) {
	let a = Du(e.tagName, n.props && n.props.type)[i];
	a && a(e, t, n, r);
}
function ku() {
	_u.getSSRProps = ({ value: e }) => ({ value: e }), bu.getSSRProps = ({ value: e }, t) => {
		if (t.props && Ne(t.props.value, e)) return { checked: !0 };
	}, vu.getSSRProps = ({ value: e }, t) => {
		if (m(e)) {
			if (t.props && Pe(e, t.props.value) > -1) return { checked: !0 };
		} else if (g(e)) {
			if (t.props && e.has(t.props.value)) return { checked: !0 };
		} else if (e) return { checked: !0 };
	}, Eu.getSSRProps = (e, t) => {
		if (typeof t.type != "string") return;
		let n = Du(t.type.toUpperCase(), t.props && t.props.type);
		if (n.getSSRProps) return n.getSSRProps(e, t);
	};
}
var Au = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], ju = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Au.some((n) => e[`${n}Key`] && !t.includes(n))
}, Mu = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = ju[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Nu = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, Pu = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = j(n.key);
		if (t.some((e) => e === r || Nu[e] === r)) return e(n);
	}));
}, Fu = /* @__PURE__ */ u({ patchProp: zl }, zc), Iu, Lu = !1;
function Ru() {
	return Iu ||= Yo(Fu);
}
function zu() {
	return Iu = Lu ? Iu : Xo(Fu), Lu = !0, Iu;
}
var Bu = ((...e) => {
	Ru().render(...e);
}), Vu = ((...e) => {
	zu().hydrate(...e);
}), Hu = ((...e) => {
	let t = Ru().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Gu(e);
		if (!r) return;
		let i = t._component;
		y(i) || i.render || i.template || (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Wu(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
}), Uu = ((...e) => {
	let t = zu().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let t = Gu(e);
		if (t) return n(t, !0, Wu(t));
	}, t;
});
function Wu(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Gu(e) {
	return b(e) ? document.querySelector(e) : e;
}
var Ku = !1, qu = () => {
	Ku || (Ku = !0, ku(), dl());
}, Ju = /* @__PURE__ */ Symbol(""), Yu = /* @__PURE__ */ Symbol(""), Xu = /* @__PURE__ */ Symbol(""), Zu = /* @__PURE__ */ Symbol(""), Qu = /* @__PURE__ */ Symbol(""), $u = /* @__PURE__ */ Symbol(""), ed = /* @__PURE__ */ Symbol(""), td = /* @__PURE__ */ Symbol(""), nd = /* @__PURE__ */ Symbol(""), rd = /* @__PURE__ */ Symbol(""), id = /* @__PURE__ */ Symbol(""), ad = /* @__PURE__ */ Symbol(""), od = /* @__PURE__ */ Symbol(""), sd = /* @__PURE__ */ Symbol(""), cd = /* @__PURE__ */ Symbol(""), ld = /* @__PURE__ */ Symbol(""), ud = /* @__PURE__ */ Symbol(""), dd = /* @__PURE__ */ Symbol(""), fd = /* @__PURE__ */ Symbol(""), pd = /* @__PURE__ */ Symbol(""), md = /* @__PURE__ */ Symbol(""), hd = /* @__PURE__ */ Symbol(""), gd = /* @__PURE__ */ Symbol(""), _d = /* @__PURE__ */ Symbol(""), vd = /* @__PURE__ */ Symbol(""), yd = /* @__PURE__ */ Symbol(""), bd = /* @__PURE__ */ Symbol(""), xd = /* @__PURE__ */ Symbol(""), Sd = /* @__PURE__ */ Symbol(""), Cd = /* @__PURE__ */ Symbol(""), wd = /* @__PURE__ */ Symbol(""), Td = /* @__PURE__ */ Symbol(""), Ed = /* @__PURE__ */ Symbol(""), Dd = /* @__PURE__ */ Symbol(""), Od = /* @__PURE__ */ Symbol(""), kd = /* @__PURE__ */ Symbol(""), Ad = /* @__PURE__ */ Symbol(""), jd = /* @__PURE__ */ Symbol(""), Md = /* @__PURE__ */ Symbol(""), Nd = {
	[Ju]: "Fragment",
	[Yu]: "Teleport",
	[Xu]: "Suspense",
	[Zu]: "KeepAlive",
	[Qu]: "BaseTransition",
	[$u]: "openBlock",
	[ed]: "createBlock",
	[td]: "createElementBlock",
	[nd]: "createVNode",
	[rd]: "createElementVNode",
	[id]: "createCommentVNode",
	[ad]: "createTextVNode",
	[od]: "createStaticVNode",
	[sd]: "resolveComponent",
	[cd]: "resolveDynamicComponent",
	[ld]: "resolveDirective",
	[ud]: "resolveFilter",
	[dd]: "withDirectives",
	[fd]: "renderList",
	[pd]: "renderSlot",
	[md]: "createSlots",
	[hd]: "toDisplayString",
	[gd]: "mergeProps",
	[_d]: "normalizeClass",
	[vd]: "normalizeStyle",
	[yd]: "normalizeProps",
	[bd]: "guardReactiveProps",
	[xd]: "toHandlers",
	[Sd]: "camelize",
	[Cd]: "capitalize",
	[wd]: "toHandlerKey",
	[Td]: "setBlockTracking",
	[Ed]: "pushScopeId",
	[Dd]: "popScopeId",
	[Od]: "withCtx",
	[kd]: "unref",
	[Ad]: "isRef",
	[jd]: "withMemo",
	[Md]: "isMemoSame"
};
function Pd(e) {
	Object.getOwnPropertySymbols(e).forEach((t) => {
		Nd[t] = e[t];
	});
}
var Fd = {
	start: {
		line: 1,
		column: 1,
		offset: 0
	},
	end: {
		line: 1,
		column: 1,
		offset: 0
	},
	source: ""
};
function Id(e, t = "") {
	return {
		type: 0,
		source: t,
		children: e,
		helpers: /* @__PURE__ */ new Set(),
		components: [],
		directives: [],
		hoists: [],
		imports: [],
		cached: [],
		temps: 0,
		codegenNode: void 0,
		loc: Fd
	};
}
function Ld(e, t, n, r, i, a, o, s = !1, c = !1, l = !1, u = Fd) {
	return e && (s ? (e.helper($u), e.helper(Jd(e.inSSR, l))) : e.helper(qd(e.inSSR, l)), o && e.helper(dd)), {
		type: 13,
		tag: t,
		props: n,
		children: r,
		patchFlag: i,
		dynamicProps: a,
		directives: o,
		isBlock: s,
		disableTracking: c,
		isComponent: l,
		loc: u
	};
}
function Rd(e, t = Fd) {
	return {
		type: 17,
		loc: t,
		elements: e
	};
}
function zd(e, t = Fd) {
	return {
		type: 15,
		loc: t,
		properties: e
	};
}
function Bd(e, t) {
	return {
		type: 16,
		loc: Fd,
		key: b(e) ? q(e, !0) : e,
		value: t
	};
}
function q(e, t = !1, n = Fd, r = 0) {
	return {
		type: 4,
		loc: n,
		content: e,
		isStatic: t,
		constType: t ? 3 : r
	};
}
function Vd(e, t = Fd) {
	return {
		type: 8,
		loc: t,
		children: e
	};
}
function Hd(e, t = [], n = Fd) {
	return {
		type: 14,
		loc: n,
		callee: e,
		arguments: t
	};
}
function Ud(e, t = void 0, n = !1, r = !1, i = Fd) {
	return {
		type: 18,
		params: e,
		returns: t,
		newline: n,
		isSlot: r,
		loc: i
	};
}
function Wd(e, t, n, r = !0) {
	return {
		type: 19,
		test: e,
		consequent: t,
		alternate: n,
		newline: r,
		loc: Fd
	};
}
function Gd(e, t, n = !1, r = !1) {
	return {
		type: 20,
		index: e,
		value: t,
		needPauseTracking: n,
		inVOnce: r,
		needArraySpread: !1,
		loc: Fd
	};
}
function Kd(e) {
	return {
		type: 21,
		body: e,
		loc: Fd
	};
}
function qd(e, t) {
	return e || t ? nd : rd;
}
function Jd(e, t) {
	return e || t ? ed : td;
}
function Yd(e, { helper: t, removeHelper: n, inSSR: r }) {
	e.isBlock || (e.isBlock = !0, n(qd(r, e.isComponent)), t($u), t(Jd(r, e.isComponent)));
}
var Xd = new Uint8Array([123, 123]), Zd = new Uint8Array([125, 125]);
function Qd(e) {
	return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function $d(e) {
	return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function ef(e) {
	return e === 47 || e === 62 || $d(e);
}
function tf(e) {
	let t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return t;
}
var nf = {
	Cdata: new Uint8Array([
		67,
		68,
		65,
		84,
		65,
		91
	]),
	CdataEnd: new Uint8Array([
		93,
		93,
		62
	]),
	CommentEnd: new Uint8Array([
		45,
		45,
		62
	]),
	ScriptEnd: new Uint8Array([
		60,
		47,
		115,
		99,
		114,
		105,
		112,
		116
	]),
	StyleEnd: new Uint8Array([
		60,
		47,
		115,
		116,
		121,
		108,
		101
	]),
	TitleEnd: new Uint8Array([
		60,
		47,
		116,
		105,
		116,
		108,
		101
	]),
	TextareaEnd: new Uint8Array([
		60,
		47,
		116,
		101,
		120,
		116,
		97,
		114,
		101,
		97
	])
}, rf = class {
	constructor(e, t) {
		this.stack = e, this.cbs = t, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = Xd, this.delimiterClose = Zd, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
	}
	get inSFCRoot() {
		return this.mode === 2 && this.stack.length === 0;
	}
	reset() {
		this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = Xd, this.delimiterClose = Zd;
	}
	getPos(e) {
		let t = 1, n = e + 1, r = this.newlines.length, i = -1;
		if (r > 100) {
			let t = -1, n = r;
			for (; t + 1 < n;) {
				let r = t + n >>> 1;
				this.newlines[r] < e ? t = r : n = r;
			}
			i = t;
		} else for (let t = r - 1; t >= 0; t--) if (e > this.newlines[t]) {
			i = t;
			break;
		}
		return i >= 0 && (t = i + 2, n = e - this.newlines[i]), {
			column: n,
			line: t,
			offset: e
		};
	}
	peek() {
		return this.buffer.charCodeAt(this.index + 1);
	}
	stateText(e) {
		e === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : !this.inVPre && e === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e));
	}
	stateInterpolationOpen(e) {
		if (e === this.delimiterOpen[this.delimiterIndex]) {
			if (this.delimiterIndex === this.delimiterOpen.length - 1) {
				let e = this.index + 1 - this.delimiterOpen.length;
				e > this.sectionStart && this.cbs.ontext(this.sectionStart, e), this.state = 3, this.sectionStart = e;
			} else this.delimiterIndex++;
		} else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(e)) : (this.state = 1, this.stateText(e));
	}
	stateInterpolation(e) {
		e === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(e));
	}
	stateInterpolationClose(e) {
		e === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.state = this.inRCDATA ? 32 : 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(e));
	}
	stateSpecialStartSequence(e) {
		let t = this.sequenceIndex === this.currentSequence.length;
		if (!(t ? ef(e) : (e | 32) === this.currentSequence[this.sequenceIndex])) this.inRCDATA = !1;
		else if (!t) {
			this.sequenceIndex++;
			return;
		}
		this.sequenceIndex = 0, this.state = 6, this.stateInTagName(e);
	}
	stateInRCDATA(e) {
		if (this.sequenceIndex === this.currentSequence.length) {
			if (e === 62 || $d(e)) {
				let t = this.index - this.currentSequence.length;
				if (this.sectionStart < t) {
					let e = this.index;
					this.index = t, this.cbs.ontext(this.sectionStart, t), this.index = e;
				}
				this.sectionStart = t + 2, this.stateInClosingTagName(e), this.inRCDATA = !1;
				return;
			}
			this.sequenceIndex = 0;
		}
		(e | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === nf.TitleEnd || this.currentSequence === nf.TextareaEnd && !this.inSFCRoot ? !this.inVPre && e === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = Number(e === 60);
	}
	stateCDATASequence(e) {
		e === nf.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === nf.Cdata.length && (this.state = 28, this.currentSequence = nf.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(e));
	}
	fastForwardTo(e) {
		for (; ++this.index < this.buffer.length;) {
			let t = this.buffer.charCodeAt(this.index);
			if (t === 10 && this.newlines.push(this.index), t === e) return !0;
		}
		return this.index = this.buffer.length - 1, !1;
	}
	stateInCommentLike(e) {
		e === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === nf.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
	}
	startSpecial(e, t) {
		this.enterRCDATA(e, t), this.state = 31;
	}
	enterRCDATA(e, t) {
		this.inRCDATA = !0, this.currentSequence = e, this.sequenceIndex = t;
	}
	stateBeforeTagName(e) {
		e === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : e === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : Qd(e) ? (this.sectionStart = this.index, this.state = this.mode === 0 ? 6 : this.inSFCRoot ? 34 : this.inXML ? 6 : e === 116 ? 30 : e === 115 ? 29 : 6) : e === 47 ? this.state = 8 : (this.state = 1, this.stateText(e));
	}
	stateInTagName(e) {
		ef(e) && this.handleTagName(e);
	}
	stateInSFCRootTagName(e) {
		if (ef(e)) {
			let t = this.buffer.slice(this.sectionStart, this.index);
			t !== "template" && this.enterRCDATA(tf("</" + t), 0), this.handleTagName(e);
		}
	}
	handleTagName(e) {
		this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e);
	}
	stateBeforeClosingTagName(e) {
		$d(e) || (e === 62 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = Qd(e) ? 9 : 27, this.sectionStart = this.index));
	}
	stateInClosingTagName(e) {
		(e === 62 || $d(e)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(e));
	}
	stateAfterClosingTagName(e) {
		e === 62 && (this.state = 1, this.sectionStart = this.index + 1);
	}
	stateBeforeAttrName(e) {
		e === 62 ? (this.cbs.onopentagend(this.index), this.state = this.inRCDATA ? 32 : 1, this.sectionStart = this.index + 1) : e === 47 ? this.state = 7 : e === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : $d(e) || this.handleAttrStart(e);
	}
	handleAttrStart(e) {
		e === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : e === 46 || e === 58 || e === 64 || e === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
	}
	stateInSelfClosingTag(e) {
		e === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : $d(e) || (this.state = 11, this.stateBeforeAttrName(e));
	}
	stateInAttrName(e) {
		(e === 61 || ef(e)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(e));
	}
	stateInDirName(e) {
		e === 61 || ef(e) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(e)) : e === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : e === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
	}
	stateInDirArg(e) {
		e === 61 || ef(e) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(e)) : e === 91 ? this.state = 15 : e === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
	}
	stateInDynamicDirArg(e) {
		e === 93 ? this.state = 14 : (e === 61 || ef(e)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(e));
	}
	stateInDirModifier(e) {
		e === 61 || ef(e) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(e)) : e === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
	}
	handleAttrNameEnd(e) {
		this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(e);
	}
	stateAfterAttrName(e) {
		e === 61 ? this.state = 18 : e === 47 || e === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e)) : $d(e) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(e));
	}
	stateBeforeAttrValue(e) {
		e === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : e === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : $d(e) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(e));
	}
	handleInAttrValue(e, t) {
		(e === t || this.fastForwardTo(t)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(t === 34 ? 3 : 2, this.index + 1), this.state = 11);
	}
	stateInAttrValueDoubleQuotes(e) {
		this.handleInAttrValue(e, 34);
	}
	stateInAttrValueSingleQuotes(e) {
		this.handleInAttrValue(e, 39);
	}
	stateInAttrValueNoQuotes(e) {
		$d(e) || e === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(e)) : (e === 39 || e === 60 || e === 61 || e === 96) && this.cbs.onerr(18, this.index);
	}
	stateBeforeDeclaration(e) {
		e === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = e === 45 ? 25 : 23;
	}
	stateInDeclaration(e) {
		(e === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
	}
	stateInProcessingInstruction(e) {
		(e === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
	}
	stateBeforeComment(e) {
		e === 45 ? (this.state = 28, this.currentSequence = nf.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
	}
	stateInSpecialComment(e) {
		(e === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
	}
	stateBeforeSpecialS(e) {
		e === nf.ScriptEnd[3] ? this.startSpecial(nf.ScriptEnd, 4) : e === nf.StyleEnd[3] ? this.startSpecial(nf.StyleEnd, 4) : (this.state = 6, this.stateInTagName(e));
	}
	stateBeforeSpecialT(e) {
		e === nf.TitleEnd[3] ? this.startSpecial(nf.TitleEnd, 4) : e === nf.TextareaEnd[3] ? this.startSpecial(nf.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(e));
	}
	startEntity() {}
	stateInEntity() {}
	parse(e) {
		for (this.buffer = e; this.index < this.buffer.length;) {
			let e = this.buffer.charCodeAt(this.index);
			switch (e === 10 && this.state !== 33 && this.newlines.push(this.index), this.state) {
				case 1:
					this.stateText(e);
					break;
				case 2:
					this.stateInterpolationOpen(e);
					break;
				case 3:
					this.stateInterpolation(e);
					break;
				case 4:
					this.stateInterpolationClose(e);
					break;
				case 31:
					this.stateSpecialStartSequence(e);
					break;
				case 32:
					this.stateInRCDATA(e);
					break;
				case 26:
					this.stateCDATASequence(e);
					break;
				case 19:
					this.stateInAttrValueDoubleQuotes(e);
					break;
				case 12:
					this.stateInAttrName(e);
					break;
				case 13:
					this.stateInDirName(e);
					break;
				case 14:
					this.stateInDirArg(e);
					break;
				case 15:
					this.stateInDynamicDirArg(e);
					break;
				case 16:
					this.stateInDirModifier(e);
					break;
				case 28:
					this.stateInCommentLike(e);
					break;
				case 27:
					this.stateInSpecialComment(e);
					break;
				case 11:
					this.stateBeforeAttrName(e);
					break;
				case 6:
					this.stateInTagName(e);
					break;
				case 34:
					this.stateInSFCRootTagName(e);
					break;
				case 9:
					this.stateInClosingTagName(e);
					break;
				case 5:
					this.stateBeforeTagName(e);
					break;
				case 17:
					this.stateAfterAttrName(e);
					break;
				case 20:
					this.stateInAttrValueSingleQuotes(e);
					break;
				case 18:
					this.stateBeforeAttrValue(e);
					break;
				case 8:
					this.stateBeforeClosingTagName(e);
					break;
				case 10:
					this.stateAfterClosingTagName(e);
					break;
				case 29:
					this.stateBeforeSpecialS(e);
					break;
				case 30:
					this.stateBeforeSpecialT(e);
					break;
				case 21:
					this.stateInAttrValueNoQuotes(e);
					break;
				case 7:
					this.stateInSelfClosingTag(e);
					break;
				case 23:
					this.stateInDeclaration(e);
					break;
				case 22:
					this.stateBeforeDeclaration(e);
					break;
				case 25:
					this.stateBeforeComment(e);
					break;
				case 24:
					this.stateInProcessingInstruction(e);
					break;
				case 33: this.stateInEntity();
			}
			this.index++;
		}
		this.cleanup(), this.finish();
	}
	cleanup() {
		this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
	}
	finish() {
		this.handleTrailingData(), this.cbs.onend();
	}
	handleTrailingData() {
		let e = this.buffer.length;
		this.sectionStart >= e || (this.state === 28 ? this.currentSequence === nf.CdataEnd ? this.cbs.oncdata(this.sectionStart, e) : this.cbs.oncomment(this.sectionStart, e) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, e));
	}
	emitCodePoint(e, t) {}
};
function af(e, { compatConfig: t }) {
	let n = t && t[e];
	return e === "MODE" ? n || 3 : n;
}
function of(e, t) {
	let n = af("MODE", t), r = af(e, t);
	return n === 3 ? r === !0 : r !== !1;
}
function sf(e, t, n, ...r) {
	return of(e, t);
}
function cf(e) {
	throw e;
}
function lf(e) {}
function uf(e, t, n, r) {
	let i = `https://vuejs.org/error-reference/#compiler-${e}`, a = SyntaxError(String(i));
	return a.code = e, a.loc = t, a;
}
var df = (e) => e.type === 4 && e.isStatic;
function ff(e) {
	switch (e) {
		case "Teleport":
		case "teleport": return Yu;
		case "Suspense":
		case "suspense": return Xu;
		case "KeepAlive":
		case "keep-alive": return Zu;
		case "BaseTransition":
		case "base-transition": return Qu;
	}
}
var pf = /^$|^\d|[^\$\w\xA0-\uFFFF]/, mf = (e) => !pf.test(e), hf = /[A-Za-z_$\xA0-\uFFFF]/, gf = /[\.\?\w$\xA0-\uFFFF]/, _f = /\s+[.[]\s*|\s*[.[]\s+/g, vf = (e) => e.type === 4 ? e.content : e.loc.source, yf = (e) => {
	let t = vf(e).trim().replace(_f, (e) => e.trim()), n = 0, r = [], i = 0, a = 0, o = null;
	for (let e = 0; e < t.length; e++) {
		let s = t.charAt(e);
		switch (n) {
			case 0:
				if (s === "[") r.push(n), n = 1, i++;
				else if (s === "(") r.push(n), n = 2, a++;
				else if (!(e === 0 ? hf : gf).test(s)) return !1;
				break;
			case 1:
				s === "'" || s === "\"" || s === "`" ? (r.push(n), n = 3, o = s) : s === "[" ? i++ : s === "]" && (--i || (n = r.pop()));
				break;
			case 2:
				if (s === "'" || s === "\"" || s === "`") r.push(n), n = 3, o = s;
				else if (s === "(") a++;
				else if (s === ")") {
					if (e === t.length - 1) return !1;
					--a || (n = r.pop());
				}
				break;
			case 3: s === o && (n = r.pop(), o = null);
		}
	}
	return !i && !a;
}, bf = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/, xf = (e) => bf.test(vf(e));
function Sf(e, t, n = !1) {
	for (let r = 0; r < e.props.length; r++) {
		let i = e.props[r];
		if (i.type === 7 && (n || i.exp) && (b(t) ? i.name === t : t.test(i.name))) return i;
	}
}
function Cf(e, t, n = !1, r = !1) {
	for (let i = 0; i < e.props.length; i++) {
		let a = e.props[i];
		if (a.type === 6) {
			if (n) continue;
			if (a.name === t && (a.value || r)) return a;
		} else if (a.name === "bind" && (a.exp || r) && wf(a.arg, t)) return a;
	}
}
function wf(e, t) {
	return !!(e && df(e) && e.content === t);
}
function Tf(e) {
	return e.props.some((e) => e.type === 7 && e.name === "bind" && (!e.arg || e.arg.type !== 4 || !e.arg.isStatic));
}
function Ef(e) {
	return e.type === 5 || e.type === 2;
}
function Df(e) {
	return e.type === 7 && e.name === "pre";
}
function Of(e) {
	return e.type === 7 && e.name === "slot";
}
function kf(e) {
	return e.type === 1 && e.tagType === 3;
}
function Af(e) {
	return e.type === 1 && e.tagType === 2;
}
var jf = /* @__PURE__ */ new Set([yd, bd]);
function Mf(e, t = []) {
	if (e && !b(e) && e.type === 14) {
		let n = e.callee;
		if (!b(n) && jf.has(n)) return Mf(e.arguments[0], t.concat(e));
	}
	return [e, t];
}
function Nf(e, t, n) {
	if (e.type !== 13 && Pf(e, t)) return;
	let r, i = e.type === 13 ? e.props : e.arguments[2], a = [], o;
	if (i && !b(i) && i.type === 14) {
		let e = Mf(i);
		i = e[0], a = e[1], o = a[a.length - 1];
	}
	if (i == null || b(i)) r = zd([t]);
	else if (i.type === 14) {
		let e = i.arguments[0];
		!b(e) && e.type === 15 ? Ff(t, e) || e.properties.unshift(t) : i.callee === xd ? r = Hd(n.helper(gd), [zd([t]), i]) : i.arguments.unshift(zd([t])), !r && (r = i);
	} else i.type === 15 ? (Ff(t, i) || i.properties.unshift(t), r = i) : (r = Hd(n.helper(gd), [zd([t]), i]), o && o.callee === bd && (o = a[a.length - 2]));
	e.type === 13 ? o ? o.arguments[0] = r : e.props = r : o ? o.arguments[0] = r : e.arguments[2] = r;
}
function Pf(e, t) {
	var n, r, i;
	if (t.key.type !== 4 || t.key.content !== "key") return !1;
	let a = e.arguments[2];
	if (a && !b(a)) {
		let [e] = Mf(a);
		if (e && !b(e) && e.type === 15 && Ff(t, e)) return !0;
	}
	return (n = e.arguments)[2] || (n[2] = "{}"), (r = e.arguments)[3] || (r[3] = "undefined"), (i = e.arguments)[4] || (i[4] = "undefined"), e.arguments[5] = t.value, !0;
}
function Ff(e, t) {
	let n = !1;
	if (e.key.type === 4) {
		let r = e.key.content;
		n = t.properties.some((e) => e.key.type === 4 && e.key.content === r);
	}
	return n;
}
function If(e, t) {
	return `_${t}_${e.replace(/[^\w]/g, (t, n) => t === "-" ? "_" : e.charCodeAt(n).toString())}`;
}
function Lf(e) {
	return e.type === 14 && e.callee === jd ? e.arguments[1].returns : e;
}
var Rf = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
function zf(e) {
	for (let t = 0; t < e.length; t++) if (!$d(e.charCodeAt(t))) return !1;
	return !0;
}
function Bf(e) {
	return e.type === 2 && zf(e.content) || e.type === 12 && Bf(e.content);
}
function Vf(e) {
	return e.type === 3 || Bf(e);
}
var Hf = {
	parseMode: "base",
	ns: 0,
	delimiters: ["{{", "}}"],
	getNamespace: () => 0,
	isVoidTag: s,
	isPreTag: s,
	isIgnoreNewlineTag: s,
	isCustomElement: s,
	onError: cf,
	onWarn: lf,
	comments: !1,
	prefixIdentifiers: !1
}, J = Hf, Uf = null, Wf = "", Gf = null, Y = null, Kf = "", qf = -1, Jf = -1, Yf = 0, Xf = !1, Zf = null, Qf = [], $f = new rf(Qf, {
	onerr: Cp,
	ontext(e, t) {
		ap(rp(e, t), e, t);
	},
	ontextentity(e, t, n) {
		ap(e, t, n);
	},
	oninterpolation(e, t) {
		if (Xf) return ap(rp(e, t), e, t);
		let n = e + $f.delimiterOpen.length, r = t - $f.delimiterClose.length;
		for (; $d(Wf.charCodeAt(n));) n++;
		for (; $d(Wf.charCodeAt(r - 1));) r--;
		let i = rp(n, r);
		i.includes("&") && (i = J.decodeEntities(i, !1)), _p({
			type: 5,
			content: Sp(i, !1, vp(n, r)),
			loc: vp(e, t)
		});
	},
	onopentagname(e, t) {
		let n = rp(e, t);
		Gf = {
			type: 1,
			tag: n,
			ns: J.getNamespace(n, Qf[0], J.ns),
			tagType: 0,
			props: [],
			children: [],
			loc: vp(e - 1, t),
			codegenNode: void 0
		};
	},
	onopentagend(e) {
		ip(e);
	},
	onclosetag(e, t) {
		let n = rp(e, t);
		if (!J.isVoidTag(n)) {
			let r = !1;
			for (let e = 0; e < Qf.length; e++) if (Qf[e].tag.toLowerCase() === n.toLowerCase()) {
				r = !0, e > 0 && Cp(24, Qf[0].loc.start.offset);
				for (let n = 0; n <= e; n++) op(Qf.shift(), t, n < e);
				break;
			}
			r || Cp(23, cp(e, 60));
		}
	},
	onselfclosingtag(e) {
		let t = Gf.tag;
		Gf.isSelfClosing = !0, ip(e), Qf[0] && Qf[0].tag === t && op(Qf.shift(), e);
	},
	onattribname(e, t) {
		Y = {
			type: 6,
			name: rp(e, t),
			nameLoc: vp(e, t),
			value: void 0,
			loc: vp(e)
		};
	},
	ondirname(e, t) {
		let n = rp(e, t), r = n === "." || n === ":" ? "bind" : n === "@" ? "on" : n === "#" ? "slot" : n.slice(2);
		if (!Xf && r === "" && Cp(26, e), Xf || r === "") Y = {
			type: 6,
			name: n,
			nameLoc: vp(e, t),
			value: void 0,
			loc: vp(e)
		};
		else if (Y = {
			type: 7,
			name: r,
			rawName: n,
			exp: void 0,
			arg: void 0,
			modifiers: n === "." ? [q("prop")] : [],
			loc: vp(e)
		}, r === "pre") {
			Xf = $f.inVPre = !0, Zf = Gf;
			let e = Gf.props;
			for (let t = 0; t < e.length; t++) e[t].type === 7 && (e[t] = xp(e[t]));
		}
	},
	ondirarg(e, t) {
		if (e === t) return;
		let n = rp(e, t);
		if (Xf && !Df(Y)) Y.name += n, bp(Y.nameLoc, t);
		else {
			let r = n[0] !== "[";
			Y.arg = Sp(r ? n : n.slice(1, -1), r, vp(e, t), r ? 3 : 0);
		}
	},
	ondirmodifier(e, t) {
		let n = rp(e, t);
		if (Xf && !Df(Y)) Y.name += "." + n, bp(Y.nameLoc, t);
		else if (Y.name === "slot") {
			let e = Y.arg;
			e && (e.content += "." + n, bp(e.loc, t));
		} else {
			let r = q(n, !0, vp(e, t));
			Y.modifiers.push(r);
		}
	},
	onattribdata(e, t) {
		Kf += rp(e, t), qf < 0 && (qf = e), Jf = t;
	},
	onattribentity(e, t, n) {
		Kf += e, qf < 0 && (qf = t), Jf = n;
	},
	onattribnameend(e) {
		let t = Y.loc.start.offset, n = rp(t, e);
		Y.type === 7 && (Y.rawName = n), Gf.props.some((e) => (e.type === 7 ? e.rawName : e.name) === n) && Cp(2, t);
	},
	onattribend(e, t) {
		if (Gf && Y) {
			if (bp(Y.loc, t), e !== 0) {
				if (Kf.includes("&") && (Kf = J.decodeEntities(Kf, !0)), Y.type === 6) Y.name === "class" && (Kf = gp(Kf).trim()), e === 1 && !Kf && Cp(13, t), Y.value = {
					type: 2,
					content: Kf,
					loc: e === 1 ? vp(qf, Jf) : vp(qf - 1, Jf + 1)
				}, $f.inSFCRoot && Gf.tag === "template" && Y.name === "lang" && Kf && Kf !== "html" && $f.enterRCDATA(tf("</template"), 0);
				else {
					Y.exp = Sp(Kf, !1, vp(qf, Jf), 0, 0), Y.name === "for" && (Y.forParseResult = np(Y.exp));
					let e = -1;
					Y.name === "bind" && (e = Y.modifiers.findIndex((e) => e.content === "sync")) > -1 && sf("COMPILER_V_BIND_SYNC", J, Y.loc, Y.arg.loc.source) && (Y.name = "model", Y.modifiers.splice(e, 1));
				}
			}
			(Y.type !== 7 || Y.name !== "pre") && Gf.props.push(Y);
		}
		Kf = "", qf = Jf = -1;
	},
	oncomment(e, t) {
		J.comments && _p({
			type: 3,
			content: rp(e, t),
			loc: vp(e - 4, t + 3)
		});
	},
	onend() {
		let e = Wf.length;
		for (let t = 0; t < Qf.length; t++) op(Qf[t], e - 1), Cp(24, Qf[t].loc.start.offset);
	},
	oncdata(e, t) {
		(Qf[0] ? Qf[0].ns : J.ns) === 0 ? Cp(1, e - 9) : ap(rp(e, t), e, t);
	},
	onprocessinginstruction(e) {
		(Qf[0] ? Qf[0].ns : J.ns) === 0 && Cp(21, e - 1);
	}
}), ep = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, tp = /^\(|\)$/g;
function np(e) {
	let t = e.loc, n = e.content, r = n.match(Rf);
	if (!r) return;
	let [, i, a] = r, o = (e, n, r = !1) => {
		let i = t.start.offset + n;
		return Sp(e, !1, vp(i, i + e.length), 0, +!!r);
	}, s = {
		source: o(a.trim(), n.indexOf(a, i.length)),
		value: void 0,
		key: void 0,
		index: void 0,
		finalized: !1
	}, c = i.trim().replace(tp, "").trim(), l = i.indexOf(c), u = c.match(ep);
	if (u) {
		c = c.replace(ep, "").trim();
		let e = u[1].trim(), t;
		if (e && (t = n.indexOf(e, l + c.length), s.key = o(e, t, !0)), u[2]) {
			let r = u[2].trim();
			r && (s.index = o(r, n.indexOf(r, s.key ? t + e.length : l + c.length), !0));
		}
	}
	return c && (s.value = o(c, l, !0)), s;
}
function rp(e, t) {
	return Wf.slice(e, t);
}
function ip(e) {
	$f.inSFCRoot && (Gf.innerLoc = vp(e + 1, e + 1)), _p(Gf);
	let { tag: t, ns: n } = Gf;
	n === 0 && J.isPreTag(t) && Yf++, J.isVoidTag(t) ? op(Gf, e) : (Qf.unshift(Gf), (n === 1 || n === 2) && ($f.inXML = !0)), Gf = null;
}
function ap(e, t, n) {
	{
		let t = Qf[0] && Qf[0].tag;
		t !== "script" && t !== "style" && e.includes("&") && (e = J.decodeEntities(e, !1));
	}
	let r = Qf[0] || Uf, i = r.children[r.children.length - 1];
	i && i.type === 2 ? (i.content += e, bp(i.loc, n)) : r.children.push({
		type: 2,
		content: e,
		loc: vp(t, n)
	});
}
function op(e, t, n = !1) {
	n ? bp(e.loc, cp(t, 60)) : bp(e.loc, sp(t, 62) + 1), $f.inSFCRoot && (e.children.length ? e.innerLoc.end = u({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = u({}, e.innerLoc.start), e.innerLoc.source = rp(e.innerLoc.start.offset, e.innerLoc.end.offset));
	let { tag: r, ns: i, children: a } = e;
	if (Xf || (r === "slot" ? e.tagType = 2 : up(e) ? e.tagType = 3 : dp(e) && (e.tagType = 1)), $f.inRCDATA || (e.children = mp(a)), i === 0 && J.isIgnoreNewlineTag(r)) {
		let e = a[0];
		e && e.type === 2 && (e.content = e.content.replace(/^\r?\n/, ""));
	}
	i === 0 && J.isPreTag(r) && Yf--, Zf === e && (Xf = $f.inVPre = !1, Zf = null), $f.inXML && (Qf[0] ? Qf[0].ns : J.ns) === 0 && ($f.inXML = !1);
	{
		let t = e.props;
		if (!$f.inSFCRoot && of("COMPILER_NATIVE_TEMPLATE", J) && e.tag === "template" && !up(e)) {
			let t = Qf[0] || Uf, n = t.children.indexOf(e);
			t.children.splice(n, 1, ...e.children);
		}
		let n = t.find((e) => e.type === 6 && e.name === "inline-template");
		n && sf("COMPILER_INLINE_TEMPLATE", J, n.loc) && e.children.length && (n.value = {
			type: 2,
			content: rp(e.children[0].loc.start.offset, e.children[e.children.length - 1].loc.end.offset),
			loc: n.loc
		});
	}
}
function sp(e, t) {
	let n = e;
	for (; Wf.charCodeAt(n) !== t && n < Wf.length - 1;) n++;
	return n;
}
function cp(e, t) {
	let n = e;
	for (; Wf.charCodeAt(n) !== t && n >= 0;) n--;
	return n;
}
var lp = /* @__PURE__ */ new Set([
	"if",
	"else",
	"else-if",
	"for",
	"slot"
]);
function up({ tag: e, props: t }) {
	if (e === "template") {
		for (let e = 0; e < t.length; e++) if (t[e].type === 7 && lp.has(t[e].name)) return !0;
	}
	return !1;
}
function dp({ tag: e, props: t }) {
	if (J.isCustomElement(e)) return !1;
	if (e === "component" || fp(e.charCodeAt(0)) || ff(e) || J.isBuiltInComponent && J.isBuiltInComponent(e) || J.isNativeTag && !J.isNativeTag(e)) return !0;
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (n.type === 6) {
			if (n.name === "is" && n.value && (n.value.content.startsWith("vue:") || sf("COMPILER_IS_ON_ELEMENT", J, n.loc))) return !0;
		} else if (n.name === "bind" && wf(n.arg, "is") && sf("COMPILER_IS_ON_ELEMENT", J, n.loc)) return !0;
	}
	return !1;
}
function fp(e) {
	return e > 64 && e < 91;
}
var pp = /\r\n/g;
function mp(e) {
	let t = J.whitespace !== "preserve", n = !1;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i.type === 2) {
			if (Yf) i.content = i.content.replace(pp, "\n");
			else if (zf(i.content)) {
				let a = e[r - 1] && e[r - 1].type, o = e[r + 1] && e[r + 1].type;
				!a || !o || t && (a === 3 && (o === 3 || o === 1) || a === 1 && (o === 3 || o === 1 && hp(i.content))) ? (n = !0, e[r] = null) : i.content = " ";
			} else t && (i.content = gp(i.content));
		}
	}
	return n ? e.filter(Boolean) : e;
}
function hp(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e.charCodeAt(t);
		if (n === 10 || n === 13) return !0;
	}
	return !1;
}
function gp(e) {
	let t = "", n = !1;
	for (let r = 0; r < e.length; r++) $d(e.charCodeAt(r)) ? n ||= (t += " ", !0) : (t += e[r], n = !1);
	return t;
}
function _p(e) {
	(Qf[0] || Uf).children.push(e);
}
function vp(e, t) {
	return {
		start: $f.getPos(e),
		end: t == null ? t : $f.getPos(t),
		source: t == null ? t : rp(e, t)
	};
}
function yp(e) {
	return {
		start: u({}, e.start),
		end: u({}, e.end),
		source: e.source
	};
}
function bp(e, t) {
	e.end = $f.getPos(t), e.source = rp(e.start.offset, t);
}
function xp(e) {
	let t = {
		type: 6,
		name: e.rawName,
		nameLoc: vp(e.loc.start.offset, e.loc.start.offset + e.rawName.length),
		value: void 0,
		loc: e.loc
	};
	if (e.exp) {
		let n = e.exp.loc;
		n.end.offset < e.loc.end.offset && (n.start.offset--, n.start.column--, n.end.offset++, n.end.column++), t.value = {
			type: 2,
			content: e.exp.content,
			loc: n
		};
	}
	return t;
}
function Sp(e, t = !1, n, r = 0, i = 0) {
	return q(e, t, n, r);
}
function Cp(e, t, n) {
	J.onError(uf(e, vp(t, t), void 0, n));
}
function wp() {
	$f.reset(), Gf = null, Y = null, Kf = "", qf = -1, Jf = -1, Qf.length = 0;
}
function Tp(e, t) {
	if (wp(), Wf = e, J = u({}, Hf), t) {
		let e;
		for (e in t) t[e] != null && (J[e] = t[e]);
	}
	$f.mode = J.parseMode === "html" ? 1 : J.parseMode === "sfc" ? 2 : 0, $f.inXML = J.ns === 1 || J.ns === 2;
	let n = t && t.delimiters;
	n && ($f.delimiterOpen = tf(n[0]), $f.delimiterClose = tf(n[1]));
	let r = Uf = Id([], e);
	return $f.parse(Wf), r.loc = vp(0, e.length), r.children = mp(r.children), Uf = null, r;
}
function Ep(e, t) {
	Op(e, void 0, t, !!Dp(e));
}
function Dp(e) {
	let t = e.children.filter((e) => e.type !== 3);
	return t.length === 1 && t[0].type === 1 && !Af(t[0]) ? t[0] : null;
}
function Op(e, t, n, r = !1, i = !1) {
	let { children: a } = e, o = [];
	for (let t = 0; t < a.length; t++) {
		let s = a[t];
		if (s.type === 1 && s.tagType === 0) {
			let e = r ? 0 : kp(s, n);
			if (e > 0) {
				if (e >= 2) {
					s.codegenNode.patchFlag = -1, o.push(s);
					continue;
				}
			} else {
				let e = s.codegenNode;
				if (e.type === 13) {
					let t = e.patchFlag;
					if ((t === void 0 || t === 512 || t === 1) && Mp(s, n) >= 2) {
						let t = Np(s);
						t && (e.props = n.hoist(t));
					}
					e.dynamicProps &&= n.hoist(e.dynamicProps);
				}
			}
		} else if (s.type === 12 && (r ? 0 : kp(s, n)) >= 2) {
			s.codegenNode.type === 14 && s.codegenNode.arguments.length > 0 && s.codegenNode.arguments.push("-1"), o.push(s);
			continue;
		}
		if (s.type === 1) {
			let t = s.tagType === 1;
			t && n.scopes.vSlot++, Op(s, e, n, !1, i), t && n.scopes.vSlot--;
		} else if (s.type === 11) Op(s, e, n, s.children.length === 1, !0);
		else if (s.type === 9) for (let t = 0; t < s.branches.length; t++) Op(s.branches[t], e, n, s.branches[t].children.length === 1, i);
	}
	let s = !1;
	if (o.length === a.length && e.type === 1) {
		if (e.tagType === 0 && e.codegenNode && e.codegenNode.type === 13 && m(e.codegenNode.children)) e.codegenNode.children = c(Rd(e.codegenNode.children)), s = !0;
		else if (e.tagType === 1 && e.codegenNode && e.codegenNode.type === 13 && e.codegenNode.children && !m(e.codegenNode.children) && e.codegenNode.children.type === 15) {
			let t = l(e.codegenNode, "default");
			t && (t.returns = c(Rd(t.returns)), s = !0);
		} else if (e.tagType === 3 && t && t.type === 1 && t.tagType === 1 && t.codegenNode && t.codegenNode.type === 13 && t.codegenNode.children && !m(t.codegenNode.children) && t.codegenNode.children.type === 15) {
			let n = Sf(e, "slot", !0), r = n && n.arg && l(t.codegenNode, n.arg);
			r && (r.returns = c(Rd(r.returns)), s = !0);
		}
	}
	if (!s) for (let e of o) e.codegenNode = n.cache(e.codegenNode);
	function c(e) {
		let t = n.cache(e);
		return t.needArraySpread = !0, t;
	}
	function l(e, t) {
		if (e.children && !m(e.children) && e.children.type === 15) {
			let n = e.children.properties.find((e) => e.key === t || e.key.content === t);
			return n && n.value;
		}
	}
	o.length && n.transformHoist && n.transformHoist(a, n, e);
}
function kp(e, t) {
	let { constantCache: n } = t;
	switch (e.type) {
		case 1:
			if (e.tagType !== 0) return 0;
			let r = n.get(e);
			if (r !== void 0) return r;
			let i = e.codegenNode;
			if (i.type !== 13 || i.isBlock && e.tag !== "svg" && e.tag !== "foreignObject" && e.tag !== "math") return 0;
			if (i.patchFlag === void 0) {
				let r = 3, a = Mp(e, t);
				if (a === 0) return n.set(e, 0), 0;
				a < r && (r = a);
				for (let i = 0; i < e.children.length; i++) {
					let a = kp(e.children[i], t);
					if (a === 0) return n.set(e, 0), 0;
					a < r && (r = a);
				}
				if (r > 1) for (let i = 0; i < e.props.length; i++) {
					let a = e.props[i];
					if (a.type === 7 && a.name === "bind" && a.exp) {
						let i = kp(a.exp, t);
						if (i === 0) return n.set(e, 0), 0;
						i < r && (r = i);
					}
				}
				if (i.isBlock) {
					for (let t = 0; t < e.props.length; t++) if (e.props[t].type === 7) return n.set(e, 0), 0;
					t.removeHelper($u), t.removeHelper(Jd(t.inSSR, i.isComponent)), i.isBlock = !1, t.helper(qd(t.inSSR, i.isComponent));
				}
				return n.set(e, r), r;
			}
			return n.set(e, 0), 0;
		case 2:
		case 3: return 3;
		case 9:
		case 11:
		case 10: return 0;
		case 5:
		case 12: return kp(e.content, t);
		case 4: return e.constType;
		case 8:
			let a = 3;
			for (let n = 0; n < e.children.length; n++) {
				let r = e.children[n];
				if (b(r) || x(r)) continue;
				let i = kp(r, t);
				if (i === 0) return 0;
				i < a && (a = i);
			}
			return a;
		case 20: return 2;
		default: return 0;
	}
}
var Ap = /* @__PURE__ */ new Set([
	_d,
	vd,
	yd,
	bd
]);
function jp(e, t) {
	if (e.type === 14 && !b(e.callee) && Ap.has(e.callee)) {
		let n = e.arguments[0];
		if (n.type === 4) return kp(n, t);
		if (n.type === 14) return jp(n, t);
	}
	return 0;
}
function Mp(e, t) {
	let n = 3, r = Np(e);
	if (r && r.type === 15) {
		let { properties: e } = r;
		for (let r = 0; r < e.length; r++) {
			let { key: i, value: a } = e[r], o = kp(i, t);
			if (o === 0) return o;
			o < n && (n = o);
			let s;
			if (s = a.type === 4 ? kp(a, t) : a.type === 14 ? jp(a, t) : 0, s === 0) return s;
			s < n && (n = s);
		}
	}
	return n;
}
function Np(e) {
	let t = e.codegenNode;
	if (t.type === 13) return t.props;
}
function Pp(e, { filename: t = "", prefixIdentifiers: n = !1, hoistStatic: r = !1, hmr: a = !1, cacheHandlers: s = !1, nodeTransforms: c = [], directiveTransforms: l = {}, transformHoist: u = null, isBuiltInComponent: d = o, isCustomElement: f = o, expressionPlugins: p = [], scopeId: m = null, slotted: h = !0, ssr: g = !1, inSSR: _ = !1, ssrCssVars: v = "", bindingMetadata: y = i, inline: x = !1, isTS: S = !1, onError: C = cf, onWarn: w = lf, compatConfig: T }) {
	let E = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), D = {
		filename: t,
		selfName: E && ie(A(E[1])),
		prefixIdentifiers: n,
		hoistStatic: r,
		hmr: a,
		cacheHandlers: s,
		nodeTransforms: c,
		directiveTransforms: l,
		transformHoist: u,
		isBuiltInComponent: d,
		isCustomElement: f,
		expressionPlugins: p,
		scopeId: m,
		slotted: h,
		ssr: g,
		inSSR: _,
		ssrCssVars: v,
		bindingMetadata: y,
		inline: x,
		isTS: S,
		onError: C,
		onWarn: w,
		compatConfig: T,
		root: e,
		helpers: /* @__PURE__ */ new Map(),
		components: /* @__PURE__ */ new Set(),
		directives: /* @__PURE__ */ new Set(),
		hoists: [],
		imports: [],
		cached: [],
		constantCache: /* @__PURE__ */ new WeakMap(),
		vForMemoKeyedNodes: /* @__PURE__ */ new WeakSet(),
		temps: 0,
		identifiers: /* @__PURE__ */ Object.create(null),
		scopes: {
			vFor: 0,
			vSlot: 0,
			vPre: 0,
			vOnce: 0
		},
		parent: null,
		grandParent: null,
		currentNode: e,
		childIndex: 0,
		inVOnce: !1,
		helper(e) {
			let t = D.helpers.get(e) || 0;
			return D.helpers.set(e, t + 1), e;
		},
		removeHelper(e) {
			let t = D.helpers.get(e);
			if (t) {
				let n = t - 1;
				n ? D.helpers.set(e, n) : D.helpers.delete(e);
			}
		},
		helperString(e) {
			return `_${Nd[D.helper(e)]}`;
		},
		replaceNode(e) {
			D.parent.children[D.childIndex] = D.currentNode = e;
		},
		removeNode(e) {
			let t = D.parent.children, n = e ? t.indexOf(e) : D.currentNode ? D.childIndex : -1;
			!e || e === D.currentNode ? (D.currentNode = null, D.onNodeRemoved()) : D.childIndex > n && (D.childIndex--, D.onNodeRemoved()), D.parent.children.splice(n, 1);
		},
		onNodeRemoved: o,
		addIdentifiers(e) {},
		removeIdentifiers(e) {},
		hoist(e) {
			b(e) && (e = q(e)), D.hoists.push(e);
			let t = q(`_hoisted_${D.hoists.length}`, !1, e.loc, 2);
			return t.hoisted = e, t;
		},
		cache(e, t = !1, n = !1) {
			let r = Gd(D.cached.length, e, t, n);
			return D.cached.push(r), r;
		}
	};
	return D.filters = /* @__PURE__ */ new Set(), D;
}
function Fp(e, t) {
	let n = Pp(e, t);
	Rp(e, n), t.hoistStatic && Ep(e, n), t.ssr || Ip(e, n), e.helpers = /* @__PURE__ */ new Set([...n.helpers.keys()]), e.components = [...n.components], e.directives = [...n.directives], e.imports = n.imports, e.hoists = n.hoists, e.temps = n.temps, e.cached = n.cached, e.transformed = !0, e.filters = [...n.filters];
}
function Ip(e, t) {
	let { helper: n } = t, { children: r } = e;
	if (r.length === 1) {
		let n = Dp(e);
		if (n && n.codegenNode) {
			let r = n.codegenNode;
			r.type === 13 && Yd(r, t), e.codegenNode = r;
		} else e.codegenNode = r[0];
	} else r.length > 1 && (e.codegenNode = Ld(t, n(Ju), void 0, e.children, 64, void 0, void 0, !0, void 0, !1));
}
function Lp(e, t) {
	let n = 0, r = () => {
		n--;
	};
	for (; n < e.children.length; n++) {
		let i = e.children[n];
		b(i) || (t.grandParent = t.parent, t.parent = e, t.childIndex = n, t.onNodeRemoved = r, Rp(i, t));
	}
}
function Rp(e, t) {
	t.currentNode = e;
	let { nodeTransforms: n } = t, r = [];
	for (let i = 0; i < n.length; i++) {
		let a = n[i](e, t);
		if (a && (m(a) ? r.push(...a) : r.push(a)), t.currentNode) e = t.currentNode;
		else return;
	}
	switch (e.type) {
		case 3:
			t.ssr || t.helper(id);
			break;
		case 5:
			t.ssr || t.helper(hd);
			break;
		case 9:
			for (let n = 0; n < e.branches.length; n++) Rp(e.branches[n], t);
			break;
		case 10:
		case 11:
		case 1:
		case 0: Lp(e, t);
	}
	t.currentNode = e;
	let i = r.length;
	for (; i--;) r[i]();
}
function zp(e, t) {
	let n = b(e) ? (t) => t === e : (t) => e.test(t);
	return (e, r) => {
		if (e.type === 1) {
			let { props: i } = e;
			if (e.tagType === 3 && i.some(Of)) return;
			let a = [];
			for (let o = 0; o < i.length; o++) {
				let s = i[o];
				if (s.type === 7 && n(s.name)) {
					i.splice(o, 1), o--;
					let n = t(e, s, r);
					n && a.push(n);
				}
			}
			return a;
		}
	};
}
var Bp = "/*@__PURE__*/", Vp = (e) => `${Nd[e]}: _${Nd[e]}`;
function Hp(e, { mode: t = "function", prefixIdentifiers: n = t === "module", sourceMap: r = !1, filename: i = "template.vue.html", scopeId: a = null, optimizeImports: o = !1, runtimeGlobalName: s = "Vue", runtimeModuleName: c = "vue", ssrRuntimeModuleName: l = "vue/server-renderer", ssr: u = !1, isTS: d = !1, inSSR: f = !1 }) {
	let p = {
		mode: t,
		prefixIdentifiers: n,
		sourceMap: r,
		filename: i,
		scopeId: a,
		optimizeImports: o,
		runtimeGlobalName: s,
		runtimeModuleName: c,
		ssrRuntimeModuleName: l,
		ssr: u,
		isTS: d,
		inSSR: f,
		source: e.source,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		indentLevel: 0,
		pure: !1,
		map: void 0,
		helper(e) {
			return `_${Nd[e]}`;
		},
		push(e, t = -2, n) {
			p.code += e;
		},
		indent() {
			m(++p.indentLevel);
		},
		deindent(e = !1) {
			e ? --p.indentLevel : m(--p.indentLevel);
		},
		newline() {
			m(p.indentLevel);
		}
	};
	function m(e) {
		p.push("\n" + "  ".repeat(e), 0);
	}
	return p;
}
function Up(e, t = {}) {
	let n = Hp(e, t);
	t.onContextCreated && t.onContextCreated(n);
	let { mode: r, push: i, prefixIdentifiers: a, indent: o, deindent: s, newline: c, scopeId: l, ssr: u } = n, d = Array.from(e.helpers), f = d.length > 0, p = !a && r !== "module";
	if (Wp(e, n), i(`function ${u ? "ssrRender" : "render"}(${(u ? [
		"_ctx",
		"_push",
		"_parent",
		"_attrs"
	] : ["_ctx", "_cache"]).join(", ")}) {`), o(), p && (i("with (_ctx) {"), o(), f && (i(`const { ${d.map(Vp).join(", ")} } = _Vue
`, -1), c())), e.components.length && (Gp(e.components, "component", n), (e.directives.length || e.temps > 0) && c()), e.directives.length && (Gp(e.directives, "directive", n), e.temps > 0 && c()), e.filters && e.filters.length && (c(), Gp(e.filters, "filter", n), c()), e.temps > 0) {
		i("let ");
		for (let t = 0; t < e.temps; t++) i(`${t > 0 ? ", " : ""}_temp${t}`);
	}
	return (e.components.length || e.directives.length || e.temps) && (i("\n", 0), c()), u || i("return "), e.codegenNode ? Yp(e.codegenNode, n) : i("null"), p && (s(), i("}")), s(), i("}"), {
		ast: e,
		code: n.code,
		preamble: "",
		map: n.map ? n.map.toJSON() : void 0
	};
}
function Wp(e, t) {
	let { ssr: n, prefixIdentifiers: r, push: i, newline: a, runtimeModuleName: o, runtimeGlobalName: s, ssrRuntimeModuleName: c } = t, l = s, u = Array.from(e.helpers);
	u.length > 0 && (i(`const _Vue = ${l}
`, -1), e.hoists.length && i(`const { ${[
		nd,
		rd,
		id,
		ad,
		od
	].filter((e) => u.includes(e)).map(Vp).join(", ")} } = _Vue
`, -1)), Kp(e.hoists, t), a(), i("return ");
}
function Gp(e, t, { helper: n, push: r, newline: i, isTS: a }) {
	let o = n(t === "filter" ? ud : t === "component" ? sd : ld);
	for (let n = 0; n < e.length; n++) {
		let s = e[n], c = s.endsWith("__self");
		c && (s = s.slice(0, -6)), r(`const ${If(s, t)} = ${o}(${JSON.stringify(s)}${c ? ", true" : ""})${a ? "!" : ""}`), n < e.length - 1 && i();
	}
}
function Kp(e, t) {
	if (!e.length) return;
	t.pure = !0;
	let { push: n, newline: r } = t;
	r();
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		a && (n(`const _hoisted_${i + 1} = `), Yp(a, t), r());
	}
	t.pure = !1;
}
function qp(e, t) {
	let n = e.length > 3 || !1;
	t.push("["), n && t.indent(), Jp(e, t, n), n && t.deindent(), t.push("]");
}
function Jp(e, t, n = !1, r = !0) {
	let { push: i, newline: a } = t;
	for (let o = 0; o < e.length; o++) {
		let s = e[o];
		b(s) ? i(s, -3) : m(s) ? qp(s, t) : Yp(s, t), o < e.length - 1 && (n ? (r && i(","), a()) : r && i(", "));
	}
}
function Yp(e, t) {
	if (b(e)) t.push(e, -3);
	else if (x(e)) t.push(t.helper(e));
	else switch (e.type) {
		case 1:
		case 9:
		case 11:
			Yp(e.codegenNode, t);
			break;
		case 2:
			Xp(e, t);
			break;
		case 4:
			Zp(e, t);
			break;
		case 5:
			Qp(e, t);
			break;
		case 12:
			Yp(e.codegenNode, t);
			break;
		case 8:
			$p(e, t);
			break;
		case 3:
			tm(e, t);
			break;
		case 13:
			nm(e, t);
			break;
		case 14:
			im(e, t);
			break;
		case 15:
			am(e, t);
			break;
		case 17:
			om(e, t);
			break;
		case 18:
			sm(e, t);
			break;
		case 19:
			cm(e, t);
			break;
		case 20:
			lm(e, t);
			break;
		case 21: Jp(e.body, t, !0, !1);
	}
}
function Xp(e, t) {
	t.push(JSON.stringify(e.content), -3, e);
}
function Zp(e, t) {
	let { content: n, isStatic: r } = e;
	t.push(r ? JSON.stringify(n) : n, -3, e);
}
function Qp(e, t) {
	let { push: n, helper: r, pure: i } = t;
	i && n(Bp), n(`${r(hd)}(`), Yp(e.content, t), n(")");
}
function $p(e, t) {
	for (let n = 0; n < e.children.length; n++) {
		let r = e.children[n];
		b(r) ? t.push(r, -3) : Yp(r, t);
	}
}
function em(e, t) {
	let { push: n } = t;
	e.type === 8 ? (n("["), $p(e, t), n("]")) : e.isStatic ? n(mf(e.content) ? e.content : JSON.stringify(e.content), -2, e) : n(`[${e.content}]`, -3, e);
}
function tm(e, t) {
	let { push: n, helper: r, pure: i } = t;
	i && n(Bp), n(`${r(id)}(${JSON.stringify(e.content)})`, -3, e);
}
function nm(e, t) {
	let { push: n, helper: r, pure: i } = t, { tag: a, props: o, children: s, patchFlag: c, dynamicProps: l, directives: u, isBlock: d, disableTracking: f, isComponent: p } = e, m;
	c && (m = String(c)), u && n(r(dd) + "("), d && n(`(${r($u)}(${f ? "true" : ""}), `), i && n(Bp), n(r(d ? Jd(t.inSSR, p) : qd(t.inSSR, p)) + "(", -2, e), Jp(rm([
		a,
		o,
		s,
		m,
		l
	]), t), n(")"), d && n(")"), u && (n(", "), Yp(u, t), n(")"));
}
function rm(e) {
	let t = e.length;
	for (; t-- && e[t] == null;);
	return e.slice(0, t + 1).map((e) => e || "null");
}
function im(e, t) {
	let { push: n, helper: r, pure: i } = t, a = b(e.callee) ? e.callee : r(e.callee);
	i && n(Bp), n(a + "(", -2, e), Jp(e.arguments, t), n(")");
}
function am(e, t) {
	let { push: n, indent: r, deindent: i, newline: a } = t, { properties: o } = e;
	if (!o.length) {
		n("{}", -2, e);
		return;
	}
	let s = o.length > 1 || !1;
	n(s ? "{" : "{ "), s && r();
	for (let e = 0; e < o.length; e++) {
		let { key: r, value: i } = o[e];
		em(r, t), n(": "), Yp(i, t), e < o.length - 1 && (n(","), a());
	}
	s && i(), n(s ? "}" : " }");
}
function om(e, t) {
	qp(e.elements, t);
}
function sm(e, t) {
	let { push: n, indent: r, deindent: i } = t, { params: a, returns: o, body: s, newline: c, isSlot: l } = e;
	l && n(`_${Nd[Od]}(`), n("(", -2, e), m(a) ? Jp(a, t) : a && Yp(a, t), n(") => "), (c || s) && (n("{"), r()), o ? (c && n("return "), m(o) ? qp(o, t) : Yp(o, t)) : s && Yp(s, t), (c || s) && (i(), n("}")), l && (e.isNonScopedSlot && n(", undefined, true"), n(")"));
}
function cm(e, t) {
	let { test: n, consequent: r, alternate: i, newline: a } = e, { push: o, indent: s, deindent: c, newline: l } = t;
	if (n.type === 4) {
		let e = !mf(n.content);
		e && o("("), Zp(n, t), e && o(")");
	} else o("("), Yp(n, t), o(")");
	a && s(), t.indentLevel++, a || o(" "), o("? "), Yp(r, t), t.indentLevel--, a && l(), a || o(" "), o(": ");
	let u = i.type === 19;
	u || t.indentLevel++, Yp(i, t), u || t.indentLevel--, a && c(!0);
}
function lm(e, t) {
	let { push: n, helper: r, indent: i, deindent: a, newline: o } = t, { needPauseTracking: s, needArraySpread: c } = e;
	c && n("[...("), n(`_cache[${e.index}] || (`), s && (i(), n(`${r(Td)}(-1`), e.inVOnce && n(", true"), n("),"), o(), n("(")), n(`_cache[${e.index}] = `), Yp(e.value, t), s && (n(`).cacheIndex = ${e.index},`), o(), n(`${r(Td)}(1),`), o(), n(`_cache[${e.index}]`), a()), n(")"), c && n(")]");
}
RegExp("\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b");
var um = zp(/^(?:if|else|else-if)$/, (e, t, n) => dm(e, t, n, (e, t, r) => {
	let i = n.parent.children, a = i.indexOf(e), o = 0;
	for (; a-- >= 0;) {
		let e = i[a];
		e && e.type === 9 && (o += e.branches.length);
	}
	return () => {
		if (r) e.codegenNode = pm(t, o, n);
		else {
			let r = hm(e.codegenNode);
			r.alternate = pm(t, o + e.branches.length - 1, n);
		}
	};
}));
function dm(e, t, n, r) {
	if (t.name !== "else" && (!t.exp || !t.exp.content.trim())) {
		let r = t.exp ? t.exp.loc : e.loc;
		n.onError(uf(28, t.loc)), t.exp = q("true", !1, r);
	}
	if (t.name === "if") {
		let i = fm(e, t), a = {
			type: 9,
			loc: yp(e.loc),
			branches: [i]
		};
		if (n.replaceNode(a), r) return r(a, i, !0);
	} else {
		let i = n.parent.children, a = i.indexOf(e);
		for (; a-- >= -1;) {
			let o = i[a];
			if (o && Vf(o)) n.removeNode(o);
			else {
				if (o && o.type === 9) {
					(t.name === "else-if" || t.name === "else") && o.branches[o.branches.length - 1].condition === void 0 && n.onError(uf(30, e.loc)), n.removeNode();
					let i = fm(e, t);
					o.branches.push(i);
					let a = r && r(o, i, !1);
					Rp(i, n), a && a(), n.currentNode = null;
				} else n.onError(uf(30, e.loc));
				break;
			}
		}
	}
}
function fm(e, t) {
	let n = e.tagType === 3;
	return {
		type: 10,
		loc: e.loc,
		condition: t.name === "else" ? void 0 : t.exp,
		children: n && !Sf(e, "for") ? e.children : [e],
		userKey: Cf(e, "key"),
		isTemplateIf: n
	};
}
function pm(e, t, n) {
	return e.condition ? Wd(e.condition, mm(e, t, n), Hd(n.helper(id), ["\"\"", "true"])) : mm(e, t, n);
}
function mm(e, t, n) {
	let { helper: r } = n, i = Bd("key", q(`${t}`, !1, Fd, 2)), { children: a } = e, o = a[0];
	if (a.length !== 1 || o.type !== 1) {
		if (a.length === 1 && o.type === 11) {
			let e = o.codegenNode;
			return Nf(e, i, n), e;
		}
		return Ld(n, r(Ju), zd([i]), a, 64, void 0, void 0, !0, !1, !1, e.loc);
	}
	{
		let e = o.codegenNode, t = Lf(e);
		return t.type === 13 && Yd(t, n), Nf(t, i, n), e;
	}
}
function hm(e) {
	for (;;) if (e.type === 19) {
		if (e.alternate.type === 19) e = e.alternate;
		else return e;
	} else e.type === 20 && (e = e.value);
}
var gm = zp("for", (e, t, n) => {
	let { helper: r, removeHelper: i } = n;
	return _m(e, t, n, (t) => {
		let a = Hd(r(fd), [t.source]), o = kf(e), s = Sf(e, "memo"), c = Cf(e, "key", !1, !0);
		c && c.type;
		let l = c && (c.type === 6 ? c.value ? q(c.value.content, !0) : void 0 : c.exp), u = l ? Bd("key", l) : null, d = t.source.type === 4 && t.source.constType > 0, f = d ? 64 : c ? 128 : 256;
		return t.codegenNode = Ld(n, r(Ju), void 0, a, f, void 0, void 0, !0, !d, !1, e.loc), () => {
			let c, { children: f } = t, p = f.length !== 1 || f[0].type !== 1, m = Af(e) ? e : o && e.children.length === 1 && Af(e.children[0]) ? e.children[0] : null;
			if (m) c = m.codegenNode, o && u && Nf(c, u, n);
			else if (p) c = Ld(n, r(Ju), u ? zd([u]) : void 0, e.children, 64, void 0, void 0, !0, void 0, !1);
			else {
				c = f[0].codegenNode, o && u && Nf(c, u, n);
				let e = !d || c.isBlockRequired === !0;
				c.isBlock !== e && (c.isBlock ? (i($u), i(Jd(n.inSSR, c.isComponent))) : i(qd(n.inSSR, c.isComponent))), c.isBlock = e, c.isBlock ? (r($u), r(Jd(n.inSSR, c.isComponent))) : (r(qd(n.inSSR, c.isComponent)), c.needsPatch && (c.patchFlag = (c.patchFlag ?? 0) | 512));
			}
			if (s) {
				let e = Ud(ym(t.parseResult, [q("_cached")]));
				e.body = Kd([
					Vd([
						"const _memo = (",
						s.exp,
						")"
					]),
					Vd([
						"if (_cached && _cached.el",
						...l ? [
							" && _cached.key === (",
							l,
							")"
						] : [],
						` && ${n.helperString(Md)}(_cached, _memo)) return _cached`
					]),
					Vd(["const _item = ", c]),
					q("_item.memo = _memo"),
					q("return _item")
				]), a.arguments.push(e, q("_cache"), q(String(n.cached.length))), n.cached.push(null);
			} else a.arguments.push(Ud(ym(t.parseResult), c, !0));
		};
	});
});
function _m(e, t, n, r) {
	if (!t.exp) {
		n.onError(uf(31, t.loc));
		return;
	}
	let i = t.forParseResult;
	if (!i) {
		n.onError(uf(32, t.loc));
		return;
	}
	vm(i, n);
	let { addIdentifiers: a, removeIdentifiers: o, scopes: s } = n, { source: c, value: l, key: u, index: d } = i, f = {
		type: 11,
		loc: t.loc,
		source: c,
		valueAlias: l,
		keyAlias: u,
		objectIndexAlias: d,
		parseResult: i,
		children: kf(e) ? e.children : [e]
	};
	n.replaceNode(f), s.vFor++;
	let p = r && r(f);
	return () => {
		s.vFor--, p && p();
	};
}
function vm(e, t) {
	e.finalized ||= !0;
}
function ym({ value: e, key: t, index: n }, r = []) {
	return bm([
		e,
		t,
		n,
		...r
	]);
}
function bm(e) {
	let t = e.length;
	for (; t-- && !e[t];);
	return e.slice(0, t + 1).map((e, t) => e || q("_".repeat(t + 1), !1));
}
var xm = q("undefined", !1), Sm = (e, t) => {
	if (e.type === 1 && (e.tagType === 1 || e.tagType === 3)) {
		let n = Sf(e, "slot");
		if (n) return n.exp, t.scopes.vSlot++, () => {
			t.scopes.vSlot--;
		};
	}
}, Cm = (e, t, n, r) => Ud(e, n, !1, !0, n.length ? n[0].loc : r);
function wm(e, t, n = Cm) {
	t.helper(Od);
	let { children: r, loc: i } = e, a = [], o = [], s = t.scopes.vSlot > 0 || t.scopes.vFor > 0, c = Sf(e, "slot", !0);
	if (c) {
		let { arg: e, exp: t } = c;
		e && !df(e) && (s = !0), a.push(Bd(e || q("default", !0), n(t, void 0, r, i)));
	}
	let l = !1, u = !1, d = [], f = /* @__PURE__ */ new Set(), p = 0;
	for (let e = 0; e < r.length; e++) {
		let i = r[e], m;
		if (!kf(i) || !(m = Sf(i, "slot", !0))) {
			i.type !== 3 && d.push(i);
			continue;
		}
		if (c) {
			t.onError(uf(37, m.loc));
			break;
		}
		l = !0;
		let { children: h, loc: g } = i, { arg: _ = q("default", !0), exp: v, loc: y } = m, b;
		df(_) ? b = _ ? _.content : "default" : s = !0;
		let x = Sf(i, "for"), S = n(v, x, h, g), C, w;
		if (C = Sf(i, "if")) s = !0, o.push(Wd(C.exp, Tm(_, S, p++), xm));
		else if (w = Sf(i, /^else(?:-if)?$/, !0)) {
			let n = e, i;
			for (; n-- && (i = r[n], Vf(i)););
			if (i && kf(i) && Sf(i, /^(?:else-)?if$/)) {
				let e = o[o.length - 1];
				for (; e.alternate.type === 19;) e = e.alternate;
				e.alternate = w.exp ? Wd(w.exp, Tm(_, S, p++), xm) : Tm(_, S, p++);
			} else t.onError(uf(30, w.loc));
		} else if (x) {
			s = !0;
			let e = x.forParseResult;
			e ? (vm(e, t), o.push(Hd(t.helper(fd), [e.source, Ud(ym(e), Tm(_, S), !0)]))) : t.onError(uf(32, x.loc));
		} else {
			if (b) {
				if (f.has(b)) {
					t.onError(uf(38, y));
					continue;
				}
				f.add(b), b === "default" && (u = !0);
			}
			a.push(Bd(_, S));
		}
	}
	if (!c) {
		let e = (e, r) => {
			let a = n(e, void 0, r, i);
			return t.compatConfig && (a.isNonScopedSlot = !0), Bd("default", a);
		};
		l ? d.length && !d.every(Bf) && (u ? t.onError(uf(39, d[0].loc)) : a.push(e(void 0, d))) : a.push(e(void 0, r));
	}
	let m = s ? 2 : Em(e.children) ? 3 : 1, h = zd(a.concat(Bd("_", q(m + "", !1))), i);
	return o.length && (h = Hd(t.helper(md), [h, Rd(o)])), {
		slots: h,
		hasDynamicSlots: s
	};
}
function Tm(e, t, n) {
	let r = [Bd("name", e), Bd("fn", t)];
	return n != null && r.push(Bd("key", q(String(n), !0))), zd(r);
}
function Em(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		switch (n.type) {
			case 1:
				if (n.tagType === 2 || Em(n.children)) return !0;
				break;
			case 9:
				if (Em(n.branches)) return !0;
				break;
			case 10:
			case 11: if (Em(n.children)) return !0;
		}
	}
	return !1;
}
var Dm = /* @__PURE__ */ new WeakMap(), Om = (e, t) => function() {
	if (e = t.currentNode, e.type !== 1 || e.tagType !== 0 && e.tagType !== 1) return;
	let { tag: n, props: r } = e, i = e.tagType === 1, a = i ? km(e, t) : `"${n}"`, o = S(a) && a.callee === cd, s, c, l = 0, u, d, f, p = !1, m = !1, h = o || a === Yu || a === Xu || !i && (n === "svg" || n === "foreignObject" || n === "math");
	if (r.length > 0) {
		let n = Am(e, t, void 0, i, o);
		s = n.props, l = n.patchFlag, d = n.dynamicPropNames, p = n.needsPatch, m = n.isBlockRequired;
		let r = n.directives;
		f = r && r.length ? Rd(r.map((e) => Nm(e, t))) : void 0, n.shouldUseBlock && (h = !0);
	}
	if (e.children.length > 0) {
		if (a === Zu && (h = !0, l |= 1024), i && a !== Yu && a !== Zu) {
			let { slots: n, hasDynamicSlots: r } = wm(e, t);
			c = n, r && (l |= 1024);
		} else if (e.children.length === 1 && a !== Yu) {
			let n = e.children[0], r = n.type, i = r === 5 || r === 8;
			i && kp(n, t) === 0 && (l |= 1), c = i || r === 2 ? n : e.children;
		} else c = e.children;
	}
	d && d.length && (u = Pm(d));
	let g = e.codegenNode = Ld(t, a, s, c, l === 0 ? void 0 : l, u, f, !!h, !1, i, e.loc);
	p &&= l === 0 || l === 32, p && (g.needsPatch = !0), m && (g.isBlockRequired = !0);
};
function km(e, t, n = !1) {
	let { tag: r } = e, i = Fm(r), a = Cf(e, "is", !1, !0);
	if (a) {
		if (i || of("COMPILER_IS_ON_ELEMENT", t)) {
			let e;
			if (a.type === 6 ? e = a.value && q(a.value.content, !0) : (e = a.exp, e ||= q("is", !1, a.arg.loc)), e) return Hd(t.helper(cd), [e]);
		} else a.type === 6 && a.value.content.startsWith("vue:") && (r = a.value.content.slice(4));
	}
	let o = ff(r) || t.isBuiltInComponent(r);
	return o ? (n || t.helper(o), o) : (t.helper(sd), t.components.add(r), If(r, "component"));
}
function Am(e, t, n = e.props, r, i, a = !1) {
	let { tag: o, loc: s, children: l } = e, u = [], d = [], f = [], p = l.length > 0, m = !1, h = !1, g = 0, _ = !1, v = !1, y = !1, b = !1, S = !1, C = !1, w = [], T = (e) => {
		u.length && (d.push(zd(jm(u), s)), u = []), e && d.push(e);
	}, E = () => {
		t.scopes.vFor > 0 && u.push(Bd(q("ref_for", !0), q("true")));
	}, D = ({ key: e, value: n }) => {
		if (df(e)) {
			let a = e.content, o = c(a);
			if (o && (!r || i) && a.toLowerCase() !== "onclick" && a !== "onUpdate:modelValue" && !k(a) && (b = !0), o && k(a) && (C = !0), a === "ref" && (_ = !0), o && n.type === 14 && (n = n.arguments[0]), n.type === 20 || (n.type === 4 || n.type === 8) && kp(n, t) > 0) return;
			a === "class" ? v = !0 : a === "style" ? y = !0 : a !== "ref" && a !== "key" && !w.includes(a) && w.push(a), r && (a === "class" || a === "style") && !w.includes(a) && w.push(a);
		} else S = !0;
	};
	for (let i = 0; i < n.length; i++) {
		let c = n[i];
		if (c.type === 6) {
			let { loc: e, name: n, nameLoc: r, value: i } = c;
			if (n === "ref" && (_ = !0, E()), n === "is" && (Fm(o) || i && i.content.startsWith("vue:") || of("COMPILER_IS_ON_ELEMENT", t))) continue;
			u.push(Bd(q(n, !0, r), q(i ? i.content : "", !0, i ? i.loc : e)));
		} else {
			let { name: n, arg: i, exp: l, loc: _, modifiers: v } = c, y = n === "bind", b = n === "on";
			if (n === "slot") {
				r || t.onError(uf(40, _));
				continue;
			}
			if (n === "once" || n === "memo" || n === "is" || y && wf(i, "is") && (Fm(o) || of("COMPILER_IS_ON_ELEMENT", t)) || b && a) continue;
			if (y && wf(i, "key") && (m = !0), b && p && i && df(i) && A(i.content) === "vue:beforeUpdate" && (m = !0, h = !0), y && wf(i, "ref") && E(), !i && (y || b)) {
				if (S = !0, l) {
					if (y) {
						if (T(), of("COMPILER_V_BIND_OBJECT_ORDER", t)) {
							d.unshift(l);
							continue;
						}
						E(), T(), d.push(l);
					} else T({
						type: 14,
						loc: _,
						callee: t.helper(xd),
						arguments: r ? [l] : [l, "true"]
					});
				} else t.onError(uf(y ? 34 : 35, _));
				continue;
			}
			y && v.some((e) => e.content === "prop") && (g |= 32);
			let C = t.directiveTransforms[n];
			if (C) {
				let { props: n, needRuntime: r } = C(c, e, t);
				!a && n.forEach(D), b && i && !df(i) ? T(zd(n, s)) : u.push(...n), r && (f.push(c), x(r) && Dm.set(c, r));
			} else ee(n) || (f.push(c), p && (m = !0, h = !0));
		}
	}
	let O;
	d.length ? (T(), O = d.length > 1 ? Hd(t.helper(gd), d, s) : d[0]) : u.length && (O = zd(jm(u), s)), S ? g |= 16 : (v && !r && (g |= 2), y && !r && (g |= 4), w.length && (g |= 8), b && (g |= 32));
	let te = (g === 0 || g === 32) && (_ || C || f.length > 0);
	if (!m && te && (g |= 512), !t.inSSR && O) switch (O.type) {
		case 15:
			let e = -1, n = -1, r = !1;
			for (let t = 0; t < O.properties.length; t++) {
				let i = O.properties[t].key;
				df(i) ? i.content === "class" ? e = t : i.content === "style" && (n = t) : i.isHandlerKey || (r = !0);
			}
			let i = O.properties[e], a = O.properties[n];
			r ? O = Hd(t.helper(yd), [O]) : (i && !df(i.value) && (i.value = Hd(t.helper(_d), [i.value])), a && (y || a.value.type === 4 && a.value.content.trim()[0] === "[" || a.value.type === 17) && (a.value = Hd(t.helper(vd), [a.value])));
			break;
		case 14: break;
		default: O = Hd(t.helper(yd), [Hd(t.helper(bd), [O])]);
	}
	return {
		props: O,
		directives: f,
		patchFlag: g,
		dynamicPropNames: w,
		shouldUseBlock: m,
		needsPatch: te,
		isBlockRequired: h
	};
}
function jm(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i.key.type === 8 || !i.key.isStatic) {
			n.push(i);
			continue;
		}
		let a = i.key.content, o = t.get(a);
		o ? (a === "style" || a === "class" || c(a)) && Mm(o, i) : (t.set(a, i), n.push(i));
	}
	return n;
}
function Mm(e, t) {
	e.value.type === 17 ? e.value.elements.push(t.value) : e.value = Rd([e.value, t.value], e.loc);
}
function Nm(e, t) {
	let n = [], r = Dm.get(e);
	r ? n.push(t.helperString(r)) : (t.helper(ld), t.directives.add(e.name), n.push(If(e.name, "directive")));
	let { loc: i } = e;
	if (e.exp && n.push(e.exp), e.arg && (e.exp || n.push("void 0"), n.push(e.arg)), Object.keys(e.modifiers).length) {
		e.arg || (e.exp || n.push("void 0"), n.push("void 0"));
		let t = q("true", !1, i);
		n.push(zd(e.modifiers.map((e) => Bd(e, t)), i));
	}
	return Rd(n, e.loc);
}
function Pm(e) {
	let t = "[";
	for (let n = 0, r = e.length; n < r; n++) t += JSON.stringify(e[n]), n < r - 1 && (t += ", ");
	return t + "]";
}
function Fm(e) {
	return e === "component" || e === "Component";
}
var Im = (e, t) => {
	if (Af(e)) {
		let { children: n, loc: r } = e, { slotName: i, slotProps: a } = Lm(e, t), o = [
			t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
			i,
			"{}",
			"undefined",
			"true"
		], s = 2;
		a && (o[2] = a, s = 3), n.length && (o[3] = Ud([], n, !1, !1, r), s = 4), t.scopeId && !t.slotted && (s = 5), o.splice(s), e.codegenNode = Hd(t.helper(pd), o, r);
	}
};
function Lm(e, t) {
	let n = "\"default\"", r, i = [];
	for (let t = 0; t < e.props.length; t++) {
		let r = e.props[t];
		r.type === 6 ? r.value && (r.name === "name" ? n = JSON.stringify(r.value.content) : (r.name = A(r.name), i.push(r))) : r.name === "bind" && wf(r.arg, "name") ? r.exp ? n = r.exp : r.arg && r.arg.type === 4 && (n = r.exp = q(A(r.arg.content), !1, r.arg.loc)) : (r.name === "bind" && r.arg && df(r.arg) && (r.arg.content = A(r.arg.content)), i.push(r));
	}
	if (i.length > 0) {
		let { props: n, directives: a } = Am(e, t, i, !1, !1);
		r = n, a.length && t.onError(uf(36, a[0].loc));
	}
	return {
		slotName: n,
		slotProps: r
	};
}
var Rm = (e, t, n, r) => {
	let { loc: i, modifiers: a, arg: o } = e;
	!e.exp && !a.length && n.onError(uf(35, i));
	let s;
	if (o.type === 4) {
		if (o.isStatic) {
			let e = o.content;
			e.startsWith("vue:") && (e = `vnode-${e.slice(4)}`), s = q(t.tagType !== 0 || e.startsWith("vnode") || !/[A-Z]/.test(e) ? ae(A(e)) : `on:${e}`, !0, o.loc);
		} else s = Vd([
			`${n.helperString(wd)}(`,
			o,
			")"
		]);
	} else s = o, s.children.unshift(`${n.helperString(wd)}(`), s.children.push(")");
	let c = e.exp;
	c && !c.content.trim() && (c = void 0);
	let l = n.cacheHandlers && !c && !n.inVOnce;
	if (c) {
		let e = yf(c), t = !(e || xf(c)), n = c.content.includes(";");
		(t || l && e) && (c = Vd([
			`${t ? "$event" : "(...args)"} => ${n ? "{" : "("}`,
			c,
			n ? "}" : ")"
		]));
	}
	let u = { props: [Bd(s, c || q("() => {}", !1, i))] };
	return r && (u = r(u)), l && (u.props[0].value = n.cache(u.props[0].value)), u.props.forEach((e) => e.key.isHandlerKey = !0), u;
}, zm = (e, t, n) => {
	let { modifiers: r, loc: i } = e, a = e.arg, { exp: o } = e;
	return o && o.type === 4 && !o.content.trim() && (o = void 0), a.type === 4 ? a.isStatic || (a.content = a.content ? `${a.content} || ""` : "\"\"") : (a.children.unshift("("), a.children.push(") || \"\"")), r.some((e) => e.content === "camel") && (a.type === 4 ? a.content = a.isStatic ? A(a.content) : `${n.helperString(Sd)}(${a.content})` : (a.children.unshift(`${n.helperString(Sd)}(`), a.children.push(")"))), n.inSSR || (r.some((e) => e.content === "prop") && Bm(a, "."), r.some((e) => e.content === "attr") && Bm(a, "^")), { props: [Bd(a, o)] };
}, Bm = (e, t) => {
	e.type === 4 ? e.content = e.isStatic ? t + e.content : `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
}, Vm = (e, t) => {
	if (e.type === 0 || e.type === 1 || e.type === 11 || e.type === 10) return () => {
		let n = e.children, r, i = !1;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (Ef(t)) {
				i = !0;
				for (let i = e + 1; i < n.length; i++) {
					let a = n[i];
					if (Ef(a)) r ||= n[e] = Vd([t], t.loc), r.children.push(" + ", a), n.splice(i, 1), i--;
					else {
						r = void 0;
						break;
					}
				}
			}
		}
		if (i && (n.length !== 1 || e.type !== 0 && (e.type !== 1 || e.tagType !== 0 || e.props.find((e) => e.type === 7 && !t.directiveTransforms[e.name]) || e.tag === "template"))) for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (Ef(r) || r.type === 8) {
				let i = [];
				(r.type !== 2 || r.content !== " ") && i.push(r), !t.ssr && kp(r, t) === 0 && i.push("1"), n[e] = {
					type: 12,
					content: r,
					loc: r.loc,
					codegenNode: Hd(t.helper(ad), i)
				};
			}
		}
	};
}, Hm = /* @__PURE__ */ new WeakSet(), Um = (e, t) => {
	if (e.type === 1 && Sf(e, "once", !0)) return Hm.has(e) || t.inVOnce || t.inSSR ? void 0 : (Hm.add(e), t.inVOnce = !0, t.helper(Td), () => {
		t.inVOnce = !1;
		let e = t.currentNode;
		e.codegenNode &&= t.cache(e.codegenNode, !0, !0);
	});
}, Wm = (e, t, n) => {
	let { exp: r, arg: i } = e;
	if (!r) return n.onError(uf(41, e.loc)), Gm();
	let a = r.loc.source.trim(), o = r.type === 4 ? r.content : a, s = n.bindingMetadata[a];
	if (s === "props" || s === "props-aliased") return n.onError(uf(44, r.loc)), Gm();
	if (s === "literal-const" || s === "setup-const") return n.onError(uf(45, r.loc)), Gm();
	if (!o.trim() || !yf(r)) return n.onError(uf(42, r.loc)), Gm();
	let c = i || q("modelValue", !0), l = i ? df(i) ? `onUpdate:${A(i.content)}` : Vd(["\"onUpdate:\" + ", i]) : "onUpdate:modelValue", u;
	u = Vd([
		`${n.isTS ? "($event: any)" : "$event"} => ((`,
		r,
		") = $event)"
	]);
	let d = [Bd(c, e.exp), Bd(l, u)];
	if (e.modifiers.length && t.tagType === 1) {
		let t = e.modifiers.map((e) => e.content).map((e) => (mf(e) ? e : JSON.stringify(e)) + ": true").join(", "), n = i ? df(i) ? `${i.content}Modifiers` : Vd([i, " + \"Modifiers\""]) : "modelModifiers";
		d.push(Bd(n, q(`{ ${t} }`, !1, e.loc, 2)));
	}
	return Gm(d);
};
function Gm(e = []) {
	return { props: e };
}
var Km = /[\w).+\-_$\]]/, qm = (e, t) => {
	of("COMPILER_FILTERS", t) && (e.type === 5 ? Jm(e.content, t) : e.type === 1 && e.props.forEach((e) => {
		e.type === 7 && e.name !== "for" && e.exp && Jm(e.exp, t);
	}));
};
function Jm(e, t) {
	if (e.type === 4) Ym(e, t);
	else for (let n = 0; n < e.children.length; n++) {
		let r = e.children[n];
		typeof r == "object" && (r.type === 4 ? Ym(r, t) : r.type === 8 ? Jm(r, t) : r.type === 5 && Jm(r.content, t));
	}
}
function Ym(e, t) {
	let n = e.content, r = !1, i = !1, a = !1, o = !1, s = 0, c = 0, l = 0, u = 0, d, f, p, m, h = [];
	for (p = 0; p < n.length; p++) if (f = d, d = n.charCodeAt(p), r) d === 39 && f !== 92 && (r = !1);
	else if (i) d === 34 && f !== 92 && (i = !1);
	else if (a) d === 96 && f !== 92 && (a = !1);
	else if (o) d === 47 && f !== 92 && (o = !1);
	else if (d === 124 && n.charCodeAt(p + 1) !== 124 && n.charCodeAt(p - 1) !== 124 && !s && !c && !l) m === void 0 ? (u = p + 1, m = n.slice(0, p).trim()) : g();
	else {
		switch (d) {
			case 34:
				i = !0;
				break;
			case 39:
				r = !0;
				break;
			case 96:
				a = !0;
				break;
			case 40:
				l++;
				break;
			case 41:
				l--;
				break;
			case 91:
				c++;
				break;
			case 93:
				c--;
				break;
			case 123:
				s++;
				break;
			case 125: s--;
		}
		if (d === 47) {
			let e = p - 1, t;
			for (; e >= 0 && (t = n.charAt(e), t === " "); e--);
			t && Km.test(t) || (o = !0);
		}
	}
	m === void 0 ? m = n.slice(0, p).trim() : u !== 0 && g();
	function g() {
		h.push(n.slice(u, p).trim()), u = p + 1;
	}
	if (h.length) {
		for (p = 0; p < h.length; p++) m = Xm(m, h[p], t);
		e.content = m, e.ast = void 0;
	}
}
function Xm(e, t, n) {
	n.helper(ud);
	let r = t.indexOf("(");
	if (r < 0) return n.filters.add(t), `${If(t, "filter")}(${e})`;
	{
		let i = t.slice(0, r), a = t.slice(r + 1);
		return n.filters.add(i), `${If(i, "filter")}(${e}${a === ")" ? a : "," + a}`;
	}
}
var Zm = /* @__PURE__ */ new WeakSet(), Qm = (e, t) => {
	if (e.type === 1) {
		let n = Sf(e, "memo");
		return !n || Zm.has(e) || t.inSSR ? void 0 : (Zm.add(e), () => {
			let r = e.codegenNode || t.currentNode.codegenNode;
			r && r.type === 13 && (e.tagType !== 1 && Yd(r, t), e.codegenNode = Hd(t.helper(jd), [
				n.exp,
				Ud(void 0, r),
				"_cache",
				String(t.cached.length)
			]), t.cached.push(null));
		});
	}
}, $m = (e, t) => {
	if (e.type === 1) {
		for (let n of e.props) if (n.type === 7 && n.name === "bind" && (!n.exp || n.exp.type === 4 && !n.exp.content.trim()) && n.arg) {
			let e = n.arg;
			if (e.type !== 4 || !e.isStatic) t.onError(uf(53, e.loc)), n.exp = q("", !0, e.loc);
			else {
				let t = A(e.content);
				(hf.test(t[0]) || t[0] === "-") && (n.exp = q(t, !1, e.loc));
			}
		}
	}
};
function eh(e) {
	return [[
		$m,
		Um,
		um,
		Qm,
		gm,
		qm,
		Im,
		Om,
		Sm,
		Vm
	], {
		on: Rm,
		bind: zm,
		model: Wm
	}];
}
function th(e, t = {}) {
	let n = t.onError || cf, r = t.mode === "module";
	t.prefixIdentifiers === !0 ? n(uf(48)) : r && n(uf(49)), t.cacheHandlers && n(uf(50)), t.scopeId && !r && n(uf(51));
	let i = u({}, t, { prefixIdentifiers: !1 }), a = b(e) ? Tp(e, i) : e, [o, s] = eh();
	return Fp(a, u({}, i, {
		nodeTransforms: [...o, ...t.nodeTransforms || []],
		directiveTransforms: u({}, s, t.directiveTransforms || {})
	})), Up(a, i);
}
var nh = () => ({ props: [] }), rh = /* @__PURE__ */ Symbol(""), ih = /* @__PURE__ */ Symbol(""), ah = /* @__PURE__ */ Symbol(""), oh = /* @__PURE__ */ Symbol(""), sh = /* @__PURE__ */ Symbol(""), ch = /* @__PURE__ */ Symbol(""), lh = /* @__PURE__ */ Symbol(""), uh = /* @__PURE__ */ Symbol(""), dh = /* @__PURE__ */ Symbol(""), fh = /* @__PURE__ */ Symbol("");
Pd({
	[rh]: "vModelRadio",
	[ih]: "vModelCheckbox",
	[ah]: "vModelText",
	[oh]: "vModelSelect",
	[sh]: "vModelDynamic",
	[ch]: "withModifiers",
	[lh]: "withKeys",
	[uh]: "vShow",
	[dh]: "Transition",
	[fh]: "TransitionGroup"
});
var ph;
function mh(e, t = !1) {
	return ph ||= document.createElement("div"), t ? (ph.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, ph.children[0].getAttribute("foo")) : (ph.innerHTML = e, ph.textContent);
}
var hh = {
	parseMode: "html",
	isVoidTag: Ee,
	isNativeTag: (e) => Ce(e) || we(e) || Te(e),
	isPreTag: (e) => e === "pre",
	isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
	decodeEntities: mh,
	isBuiltInComponent: (e) => {
		if (e === "Transition" || e === "transition") return dh;
		if (e === "TransitionGroup" || e === "transition-group") return fh;
	},
	getNamespace(e, t, n) {
		let r = t ? t.ns : n;
		if (t && r === 2) {
			if (t.tag === "annotation-xml") {
				if (e === "svg") return 1;
				t.props.some((e) => e.type === 6 && e.name === "encoding" && e.value != null && (e.value.content === "text/html" || e.value.content === "application/xhtml+xml")) && (r = 0);
			} else /^m(?:[ions]|text)$/.test(t.tag) && e !== "mglyph" && e !== "malignmark" && (r = 0);
		} else t && r === 1 && (t.tag === "foreignObject" || t.tag === "desc" || t.tag === "title") && (r = 0);
		if (r === 0) {
			if (e === "svg") return 1;
			if (e === "math") return 2;
		}
		return r;
	}
}, gh = (e) => {
	e.type === 1 && e.props.forEach((t, n) => {
		t.type === 6 && t.name === "style" && t.value && (e.props[n] = {
			type: 7,
			name: "bind",
			arg: q("style", !0, t.loc),
			exp: _h(t.value.content, t.loc),
			modifiers: [],
			loc: t.loc
		});
	});
}, _h = (e, t) => {
	let n = _e(e);
	return q(JSON.stringify(n), !1, t, 3);
};
function vh(e, t) {
	return uf(e, t, void 0);
}
var yh = (e, t, n) => {
	let { exp: r, loc: i } = e;
	return r || n.onError(vh(54, i)), t.children.length && (n.onError(vh(55, i)), t.children.length = 0), { props: [Bd(q("innerHTML", !0, i), r || q("", !0))] };
}, bh = (e, t, n) => {
	let { exp: r, loc: i } = e;
	return r || n.onError(vh(56, i)), t.children.length && (n.onError(vh(57, i)), t.children.length = 0), { props: [Bd(q("textContent", !0), r ? kp(r, n) > 0 ? r : Hd(n.helperString(hd), [r], i) : q("", !0))] };
}, xh = (e, t, n) => {
	let r = Wm(e, t, n);
	if (!r.props.length || t.tagType === 1) return r;
	e.arg && n.onError(vh(59, e.arg.loc));
	let { tag: i } = t, a = n.isCustomElement(i);
	if (i === "input" || i === "textarea" || i === "select" || a) {
		let o = ah, s = !1;
		if (i === "input" || a) {
			let r = Cf(t, "type");
			if (r) {
				if (r.type === 7) o = sh;
				else if (r.value) switch (r.value.content) {
					case "radio":
						o = rh;
						break;
					case "checkbox":
						o = ih;
						break;
					case "file": s = !0, n.onError(vh(60, e.loc));
				}
			} else Tf(t) && (o = sh);
		} else i === "select" && (o = oh);
		s || (r.needRuntime = n.helper(o));
	} else n.onError(vh(58, e.loc));
	return r.props = r.props.filter((e) => e.key.type !== 4 || e.key.content !== "modelValue"), r;
}, Sh = /* @__PURE__ */ r("passive,once,capture"), Ch = /* @__PURE__ */ r("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"), wh = /* @__PURE__ */ r("left,right"), Th = /* @__PURE__ */ r("onkeyup,onkeydown,onkeypress"), Eh = (e, t, n, r) => {
	let i = [], a = [], o = [];
	for (let s = 0; s < t.length; s++) {
		let c = t[s].content;
		c === "native" && sf("COMPILER_V_ON_NATIVE", n, r) || Sh(c) ? o.push(c) : wh(c) ? df(e) ? Th(e.content.toLowerCase()) ? i.push(c) : a.push(c) : (i.push(c), a.push(c)) : Ch(c) ? a.push(c) : i.push(c);
	}
	return {
		keyModifiers: i,
		nonKeyModifiers: a,
		eventOptionModifiers: o
	};
}, Dh = (e, t) => df(e) && e.content.toLowerCase() === "onclick" ? q(t, !0) : e.type === 4 ? e : Vd([
	"(",
	e,
	`) === "onClick" ? "${t}" : (`,
	e,
	")"
]), Oh = (e, t, n) => Rm(e, t, n, (t) => {
	let { modifiers: r } = e;
	if (!r.length) return t;
	let { key: i, value: a } = t.props[0], { keyModifiers: o, nonKeyModifiers: s, eventOptionModifiers: c } = Eh(i, r, n, e.loc);
	if (s.includes("right") && (i = Dh(i, "onContextmenu")), s.includes("middle") && (i = Dh(i, "onMouseup")), s.length && (a = Hd(n.helper(ch), [a, JSON.stringify(s)])), o.length && (!df(i) || Th(i.content.toLowerCase())) && (a = Hd(n.helper(lh), [a, JSON.stringify(o)])), c.length) {
		let e = c.map(ie).join("");
		i = df(i) ? q(`${i.content}${e}`, !0) : Vd([
			"(",
			i,
			`) + "${e}"`
		]);
	}
	return { props: [Bd(i, a)] };
}), kh = (e, t, n) => {
	let { exp: r, loc: i } = e;
	return r || n.onError(vh(62, i)), {
		props: [],
		needRuntime: n.helper(uh)
	};
}, Ah = (e, t) => {
	if (e.type === 1 && e.tagType === 1 && t.isBuiltInComponent(e.tag) === dh) return () => {
		if (!e.children.length) return;
		jh(e);
		let t = e.children[0];
		if (t.type === 1) for (let n of t.props) n.type === 7 && n.name === "show" && e.props.push({
			type: 6,
			name: "persisted",
			nameLoc: e.loc,
			value: void 0,
			loc: e.loc
		});
	};
};
function jh(e) {
	let t = e.children = e.children.filter((e) => !Vf(e)), n = t[0];
	return t.length !== 1 || n.type === 11 || n.type === 9 && n.branches.some(jh);
}
var Mh = (e, t) => {
	e.type === 1 && e.tagType === 0 && (e.tag === "script" || e.tag === "style") && t.removeNode();
}, Nh = [gh, Ah], Ph = {
	cloak: nh,
	html: yh,
	text: bh,
	model: xh,
	on: Oh,
	show: kh
};
function Fh(e, t = {}) {
	return th(e, u({}, hh, t, {
		nodeTransforms: [
			Mh,
			...Nh,
			...t.nodeTransforms || []
		],
		directiveTransforms: u({}, Ph, t.directiveTransforms || {}),
		transformHoist: null
	}));
}
// node_modules/vue/dist/vue.esm-bundler.js
var Ih = /* @__PURE__ */ Object.create(null);
function Lh(e, t) {
	if (!b(e)) {
		if (e.nodeType) e = e.innerHTML;
		else return o;
	}
	let n = de(e, t), r = Ih[n];
	if (r) return r;
	if (e[0] === "#") {
		let t = document.querySelector(e);
		e = t ? t.innerHTML : "";
	}
	let i = u({
		hoistStatic: !0,
		onError: void 0,
		onWarn: o
	}, t);
	!i.isCustomElement && typeof customElements < "u" && (i.isCustomElement = (e) => !!customElements.get(e));
	let { code: a } = Fh(e, i), s = Function("Vue", a)(jc);
	return s._rc = !0, Ih[n] = s;
}
pc(Lh);
// node_modules/semver/internal/debug.js
var Rh = /* @__PURE__ */ n(((e, t) => {
	t.exports = typeof process == "object" && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
})), zh = /* @__PURE__ */ n(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 
		/* istanbul ignore next */ 9007199254740991,
		WHITESPACE_CHARACTERS: [
			"	",
			"\n",
			"\v",
			"\f",
			"\r",
			" ",
			"\xA0",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"\u2028",
			"\u2029",
			" ",
			" ",
			"　",
			"﻿"
		],
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), Bh = /* @__PURE__ */ n(((e, t) => {
	var { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = zh(), a = Rh();
	e = t.exports = {};
	var o = e.re = [], s = e.safeRe = [], c = e.src = [], l = e.safeSrc = [], u = e.t = {}, d = 0, f = "[a-zA-Z0-9-]", p = [
		["\\s", 1],
		["\\d", i],
		[f, r]
	], m = (e) => {
		for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, h = (e, t, n) => {
		let r = m(t), i = d++;
		a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? "g" : void 0), s[i] = new RegExp(r, n ? "g" : void 0);
	};
	h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), h("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${f}+`), h("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h("FULL", `^${c[u.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h("LOOSE", `^${c[u.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", c[u.COERCE], !0), h("COERCERTLFULL", c[u.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", h("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", h("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), Vh = /* @__PURE__ */ n(((e, t) => {
	var n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == "object" ? e : n : r;
})), Hh = /* @__PURE__ */ n(((e, t) => {
	var n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == "number" && typeof t == "number") return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
})), Uh = /* @__PURE__ */ n(((e, t) => {
	var n = Rh(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = zh(), { safeRe: a, t: o } = Bh(), s = Vh(), { compareIdentifiers: c } = Hh(), l = (e, t) => {
		let n = t.split(".");
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (c(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n("SemVer", t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			this.prerelease = l[4] ? l[4].split(".").map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : [], this.build = l[5] ? l[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n("SemVer.compare", this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == "string" && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n("prerelease compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return c(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n("build compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return c(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith("pre")) {
				if (!t && n === !1) throw Error("invalid increment argument: identifier is empty");
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == "number" && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(".") && n === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), l(this.prerelease, t)) {
							let e = this.prerelease[t.split(".").length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), Wh = /* @__PURE__ */ n(((e, t) => {
	var n = Uh();
	t.exports = (e, t) => new n(e, t).major;
})), Gh = /* @__PURE__ */ n(((e, t) => {
	var n = Uh();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
})), Kh = /* @__PURE__ */ n(((e, t) => {
	var n = Gh();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
})), qh = /* @__PURE__ */ t(Wh(), 1), Jh = /* @__PURE__ */ t(Kh(), 1), Yh = class {
	bus;
	constructor(e) {
		typeof e.getVersion != "function" || !(0, Jh.default)(e.getVersion()) ? console.warn("Proxying an event bus with an unknown or invalid version") : (0, qh.default)(e.getVersion()) !== (0, qh.default)(this.getVersion()) && console.warn("Proxying an event bus of version " + e.getVersion() + " with " + this.getVersion()), this.bus = e;
	}
	getVersion() {
		return "3.3.3";
	}
	subscribe(e, t) {
		this.bus.subscribe(e, t);
	}
	unsubscribe(e, t) {
		this.bus.unsubscribe(e, t);
	}
	emit(e, ...t) {
		this.bus.emit(e, ...t);
	}
}, Xh = class {
	handlers = /* @__PURE__ */ new Map();
	getVersion() {
		return "3.3.3";
	}
	subscribe(e, t) {
		this.handlers.set(e, (this.handlers.get(e) || []).concat(t));
	}
	unsubscribe(e, t) {
		this.handlers.set(e, (this.handlers.get(e) || []).filter((e) => e !== t));
	}
	emit(e, ...t) {
		(this.handlers.get(e) || []).forEach((e) => {
			try {
				e(t[0]);
			} catch (e) {
				console.error("could not invoke event listener", e);
			}
		});
	}
}, Zh = null;
function Qh() {
	return Zh === null ? typeof window > "u" ? new Proxy({}, { get: () => () => console.error("Window not available, EventBus can not be established!") }) : (window.OC?._eventBus && window._nc_event_bus === void 0 && (console.warn("found old event bus instance at OC._eventBus. Update your version!"), window._nc_event_bus = window.OC._eventBus), Zh = window?._nc_event_bus === void 0 ? window._nc_event_bus = new Xh() : new Yh(window._nc_event_bus), Zh) : Zh;
}
function $h(e, t) {
	Qh().subscribe(e, t);
}
function eg(e, t) {
	Qh().unsubscribe(e, t);
}
function tg(e, ...t) {
	Qh().emit(e, ...t);
}
// node_modules/vue-router/dist/useApi-SF8tY_yo.js
var ng = (e) => e.startsWith("/");
function rg(e) {
	return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function ig(e) {
	return e.__esModule || e[Symbol.toStringTag] === "Module" || e.default && rg(e.default);
}
var ag = Object.assign;
function og(e, t) {
	let n = {};
	for (let r in t) {
		let i = t[r];
		n[r] = cg(i) ? i.map(e) : e(i);
	}
	return n;
}
var sg = () => {}, cg = Array.isArray;
function lg(e, t) {
	let n = {};
	for (let r in e) n[r] = r in t ? t[r] : e[r];
	return n;
}
var ug = Symbol("");
function dg(e, t) {
	return ag(/* @__PURE__ */ Error(), {
		type: e,
		[ug]: !0
	}, t);
}
function fg(e, t) {
	return e instanceof Error && ug in e && (t == null || !!(e.type & t));
}
var pg = Symbol(""), mg = Symbol(""), hg = Symbol(""), gg = Symbol(""), _g = Symbol(""), vg = Symbol(""), [yg] = window.OC?.config?.version?.split(".") ?? [], bg = Number.parseInt(yg ?? "35"), xg = bg < 32, Sg = bg < 34, Cg = bg < 35, wg = /* @__PURE__ */ Symbol.for("NcFormBox:context");
function Tg() {
	return kr(wg, {
		isInFormBox: !1,
		formBoxItemClass: void 0
	});
}
// node_modules/@nextcloud/vue/dist/chunks/_plugin-vue_export-helper.mjs
var Eg = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Dg = { class: "button-vue__wrapper" }, Og = { class: "button-vue__icon" }, kg = { class: "button-vue__text" }, Ag = /* @__PURE__ */ Eg(/* @__PURE__ */ hi({
	__name: "NcButton",
	props: {
		alignment: { default: "center" },
		ariaLabel: { default: void 0 },
		disabled: { type: Boolean },
		download: {
			type: [String, Boolean],
			default: void 0
		},
		href: { default: void 0 },
		pressed: {
			type: Boolean,
			default: void 0
		},
		size: { default: "normal" },
		target: { default: "_self" },
		text: { default: void 0 },
		to: { default: void 0 },
		type: { default: "button" },
		variant: { default: "secondary" },
		wide: { type: Boolean }
	},
	emits: ["click", "update:pressed"],
	setup(e, { emit: t }) {
		let n = e, r = t, { formBoxItemClass: i } = Tg(), a = kr(hg, null) !== null, o = G(() => a && n.to ? "RouterLink" : n.href ? "a" : "button"), s = G(() => o.value === "button" && typeof n.pressed == "boolean"), c = G(() => n.pressed ? "primary" : n.pressed === !1 && n.variant === "primary" ? "secondary" : n.variant), l = G(() => c.value.startsWith("tertiary")), u = G(() => n.alignment.split("-")[0]), d = G(() => n.alignment.includes("-")), f = kr("NcPopover:trigger:attrs", () => ({}), !1), p = G(() => f()), m = G(() => {
			if (o.value === "RouterLink") return {
				to: n.to,
				activeClass: "active"
			};
			if (o.value === "a") return {
				href: n.href || "#",
				target: n.target,
				rel: "nofollow noreferrer noopener",
				download: n.download || void 0
			};
			if (o.value === "button") return {
				...p.value,
				"aria-pressed": n.pressed,
				type: n.type,
				disabled: n.disabled
			};
		});
		function h(e) {
			s.value && r("update:pressed", !n.pressed), r("click", e);
		}
		return (t, n) => (V(), Ns(xa(o.value), Js({
			class: ["button-vue", [
				`button-vue--size-${e.size}`,
				{
					[`button-vue--${c.value}`]: c.value,
					"button-vue--tertiary": l.value,
					"button-vue--wide": e.wide,
					[`button-vue--${u.value}`]: u.value !== "center",
					"button-vue--reverse": d.value,
					"button-vue--legacy": xn(xg),
					"button-vue--legacy34": xn(Sg)
				},
				xn(i)
			]],
			"aria-label": e.ariaLabel
		}, m.value, { onClick: h }), {
			default: Tr(() => [U("span", Dg, [U("span", Og, [Da(t.$slots, "icon", {}, void 0, !0)]), U("span", kg, [Da(t.$slots, "default", {}, () => [Hs(F(e.text), 1)], !0)])])]),
			_: 3
		}, 16, ["class", "aria-label"]));
	}
}), [["__scopeId", "data-v-47ce59a3"]]);
// node_modules/dompurify/dist/purify.es.mjs
function jg(e, t) {
	this.v = e, this.k = t;
}
function Mg(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Ng(e) {
	if (Array.isArray(e)) return e;
}
function Pg(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Fg() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ig(e, t) {
	return Ng(e) || Pg(e, t) || Lg(e, t) || Fg();
}
function Lg(e, t) {
	if (e) {
		if (typeof e == "string") return Mg(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Mg(e, t) : void 0;
	}
}
function Rg(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof jg;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" && o.k ? t : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(!!a.done, n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i(2, e);
		}
	}
	function i(e, i) {
		e === 2 ? t.reject(i) : t.resolve({
			value: i,
			done: e
		}), (t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
Rg.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, Rg.prototype.next = function(e) {
	return this._invoke("next", e);
}, Rg.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, Rg.prototype.return = function(e) {
	return this._invoke("return", e);
};
var zg = Object.entries, Bg = Object.keys, Vg = Object.setPrototypeOf, Hg = Object.isFrozen, Ug = Object.getPrototypeOf, Wg = Object.getOwnPropertyDescriptor, Gg = Object.freeze, Kg = Object.seal, qg = Object.create, Jg = typeof Reflect < "u" && Reflect, Yg = Jg.apply, Xg = Jg.construct;
Gg ||= function(e) {
	return e;
}, Kg ||= function(e) {
	return e;
}, Yg ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, Xg ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var Zg = S_(Array.prototype.forEach), Qg = S_(Array.prototype.lastIndexOf), $g = S_(Array.prototype.pop), e_ = S_(Array.prototype.push), t_ = S_(Array.prototype.slice), n_ = S_(Array.prototype.splice), r_ = Array.isArray, i_ = C_(Set), a_ = S_(Set.prototype.add), o_ = S_(Set.prototype.has), s_ = S_(String.prototype.toLowerCase), c_ = S_(String.prototype.toString), l_ = S_(String.prototype.match), u_ = S_(String.prototype.replace), d_ = S_(String.prototype.indexOf), f_ = S_(String.prototype.trim), p_ = S_(Number.prototype.toString), m_ = S_(Boolean.prototype.toString), h_ = typeof BigInt > "u" ? null : S_(BigInt.prototype.toString), g_ = typeof Symbol > "u" ? null : S_(Symbol.prototype.toString), __ = S_(Object.prototype.hasOwnProperty), v_ = S_(Object.prototype.toString), y_ = RegExp.prototype.test, b_ = function(e, t) {
	return e instanceof RegExp && (e.lastIndex = 0), Yg(y_, e, [t]);
}, x_ = C_(TypeError);
function S_(e) {
	return function(t) {
		var n = [...arguments].slice(1);
		return Yg(e, t, n);
	};
}
function C_(e) {
	return function() {
		return Xg(e, [...arguments]);
	};
}
function X(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : s_;
	if (Vg && Vg(e, null), !r_(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (Hg(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function w_(e) {
	for (let t = 0; t < e.length; t++) __(e, t) || (e[t] = null);
	return e;
}
function T_(e) {
	let t = qg(null);
	for (let r of zg(e)) {
		var n = Ig(r, 2);
		let i = n[0], a = n[1];
		__(e, i) && (t[i] = r_(a) ? w_(a) : a && typeof a == "object" && a.constructor === Object ? T_(a) : a);
	}
	return t;
}
function E_(e) {
	let t = qg(null), n = Bg(e), r = n.length;
	for (; r--;) t[n[r]] = e[n[r]];
	return t;
}
function D_(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return p_(e);
		case "boolean": return m_(e);
		case "bigint": return h_ ? h_(e) : "0";
		case "symbol": return g_ ? g_(e) : "Symbol()";
		case "undefined": return v_(e);
		case "function":
		case "object": {
			if (e === null) return v_(e);
			let t = e, n = O_(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : v_(e);
			}
			return v_(e);
		}
		default: return v_(e);
	}
}
function O_(e, t) {
	for (; e !== null;) {
		let n = Wg(e, t);
		if (n) {
			if (n.get) return S_(n.get);
			if (typeof n.value == "function") return S_(n.value);
		}
		e = Ug(e);
	}
	function n() {
		return null;
	}
	return n;
}
function k_(e, t) {
	for (; e !== null;) {
		let n = Wg(e, t);
		if (n) return n.get ? S_(n.get) : null;
		e = Ug(e);
	}
	return null;
}
function A_(e) {
	if (!e) return !1;
	try {
		return b_(e, ""), !0;
	} catch {
		return !1;
	}
}
var j_ = Gg(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), M_ = Gg(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.filter.font.g.glyph.glyphref.hkern.image.line.lineargradient.marker.mask.metadata.mpath.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), N_ = Gg([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), P_ = Gg([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), F_ = Gg(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), I_ = Gg([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), L_ = Gg(["#text"]), R_ = Gg(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), z_ = Gg(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), B_ = Gg(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), V_ = Gg([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), H_ = Kg(/{{[\w\W]*|^[\w\W]*}}/g), U_ = Kg(/<%[\w\W]*|^[\w\W]*%>/g), W_ = Kg(/\${[\w\W]*/g), G_ = Kg(/{{|}}|\${|<%|%>|&lt;%|%&gt;/), K_ = Kg(/^data-[\-\w.\u00B7-\uFFFF]+$/), q_ = Kg(/^aria-[\-\w]+$/), J_ = Kg(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), Y_ = Kg(/^(?:\w+script|data):/i), X_ = Kg(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Z_ = Kg(/^html$/i), Q_ = Kg(/^[a-z][.\w]*(-[.\w]+)+$/i), $_ = Kg(/<[/\w!]/g), ev = Kg(/<[/\w]/g), tv = Kg(/<\/no(script|embed|frames)/i), nv = Kg(/\/>/i), rv = Kg(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i), iv = Kg(/^[\r\n\t ]+/), av = {
	element: 1,
	text: 3,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentFragment: 11
}, ov = Gg(X({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), sv = function() {
	return typeof window > "u" ? null : window;
}, cv = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, lv = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, uv = function(e, t, n, r) {
	return __(e, t) && r_(e[t]) ? X(r.base ? E_(r.base) : {}, e[t], r.transform) : n;
}, dv = function(e, t, n) {
	let r = __(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? T_(r) : n;
};
function fv() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : sv(), t = (e) => fv(e);
	if (t.version = "3.4.18", t.removed = [], !e || !e.document || e.document.nodeType !== av.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript, a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter, l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = O_(d, "cloneNode"), p = O_(d, "remove"), m = O_(d, "removeAttributeNode"), h = O_(d, "nextSibling"), g = O_(d, "childNodes"), _ = O_(d, "parentNode"), v = O_(d, "shadowRoot"), y = O_(d, "attributes"), b = o && o.prototype ? O_(o.prototype, "nodeType") : null, x = o && o.prototype ? O_(o.prototype, "nodeName") : null, S = o && o.prototype ? O_(o.prototype, "ownerDocument") : null, C = function(e) {
		return b ? b(e) : e.nodeType;
	}, w = function(e) {
		return x ? x(e) : e.nodeName;
	}, T = k_(d, "namespaceURI"), E = function(e) {
		return T ? T(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let D, O = "", k, ee = !1, te = 0, ne = function() {
		if (te > 0) throw x_("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, A = function(e) {
		ne(), te++;
		try {
			return D.createHTML(e);
		} finally {
			te--;
		}
	}, re = function(e) {
		return D && Re ? A(e) : e;
	}, j = function(e) {
		ne(), te++;
		try {
			return D.createScriptURL(e);
		} finally {
			te--;
		}
	}, ie = function() {
		return ee ||= (k = cv(u, i), !0), k;
	}, ae = n, M = ae.implementation, oe = ae.createNodeIterator, se = ae.createDocumentFragment, ce = ae.getElementsByTagName, le = r.importNode, N = lv();
	t.isSupported = typeof zg == "function" && typeof _ == "function" && M && M.createHTMLDocument !== void 0;
	let ue = H_, de = U_, fe = W_, pe = K_, me = q_, he = Y_, ge = X_, _e = Q_, ve = J_, P = null, ye = X({}, [
		...j_,
		...M_,
		...N_,
		...F_,
		...L_
	]), be = null, xe = X({}, [
		...R_,
		...z_,
		...B_,
		...V_
	]), Se = null, Ce = null, we = null, Te = Object.seal(qg(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), Ee = !0, De = !0, Oe = !1, ke = !0, Ae = !1, je = !0, Me = !1, Ne = !1, Pe = null, Fe = null, F = !1, Ie = !1, Le = !1, Re = !1, ze = !0, Be = !1, Ve = "user-content-", He = !0, Ue = !1, I = null, We = !1, Ge = null, Ke = X({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), qe = null, Je = X({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), Ye = null, Xe = X({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), Ze = "http://www.w3.org/1998/Math/MathML", Qe = "http://www.w3.org/2000/svg", $e = "http://www.w3.org/1999/xhtml", et = $e, tt = !1, nt = null, rt = X({}, [
		Ze,
		Qe,
		$e
	], c_), it = Gg(X({}, [
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	])), at = null, ot = Gg(X({}, ["annotation-xml"])), st = null, ct = Gg(qg(null)), lt = X({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), ut = null, dt = ["application/xhtml+xml", "text/html"], ft = null, pt = null, mt = n.createElement("form"), ht = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, gt = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		e && typeof e == "object" || (e = {}), e = T_(e), ut = dt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, ft = ut === "application/xhtml+xml" ? c_ : s_, P = uv(e, "ALLOWED_TAGS", ye, { transform: ft }), be = uv(e, "ALLOWED_ATTR", xe, { transform: ft }), nt = uv(e, "ALLOWED_NAMESPACES", rt, { transform: c_ }), Ye = uv(e, "ADD_URI_SAFE_ATTR", Xe, {
			transform: ft,
			base: Xe
		}), qe = uv(e, "ADD_DATA_URI_TAGS", Je, {
			transform: ft,
			base: Je
		}), Ge = uv(e, "FORBID_CONTENTS", Ke, { transform: ft }), Ce = uv(e, "FORBID_TAGS", qg(null), { transform: ft }), we = uv(e, "FORBID_ATTR", qg(null), { transform: ft }), We = __(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? T_(e.USE_PROFILES) : e.USE_PROFILES : !1, Ee = e.ALLOW_ARIA_ATTR !== !1, De = e.ALLOW_DATA_ATTR !== !1, Oe = e.ALLOW_UNKNOWN_PROTOCOLS || !1, ke = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Ae = e.SAFE_FOR_TEMPLATES || !1, je = e.SAFE_FOR_XML !== !1, Me = e.WHOLE_DOCUMENT || !1, Ie = e.RETURN_DOM || !1, Le = e.RETURN_DOM_FRAGMENT || !1, Re = e.RETURN_TRUSTED_TYPE || !1, F = e.FORCE_BODY || !1, ze = e.SANITIZE_DOM !== !1, Be = e.SANITIZE_NAMED_PROPS || !1, He = e.KEEP_CONTENT !== !1, Ue = e.IN_PLACE || !1, ve = A_(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : J_, et = typeof e.NAMESPACE == "string" ? e.NAMESPACE : $e, at = dv(e, "MATHML_TEXT_INTEGRATION_POINTS", it), st = dv(e, "HTML_INTEGRATION_POINTS", ot);
		let t = dv(e, "CUSTOM_ELEMENT_HANDLING", ct);
		if (Se = qg(null), __(t, "tagNameCheck") && ht(t.tagNameCheck) && (Se.tagNameCheck = t.tagNameCheck), __(t, "attributeNameCheck") && ht(t.attributeNameCheck) && (Se.attributeNameCheck = t.attributeNameCheck), __(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (Se.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), Kg(Se), Ae && (De = !1), Le && (Ie = !0), We && ((__(e, "ALLOWED_TAGS") || __(e, "ALLOWED_ATTR")) && typeof console < "u" && typeof console.warn == "function" && console.warn("DOMPurify: USE_PROFILES overrides ALLOWED_TAGS and ALLOWED_ATTR. Do not use these options together."), P = X({}, L_), be = qg(null), We.html === !0 && (X(P, j_), X(be, R_)), We.svg === !0 && (X(P, M_), X(be, z_), X(be, V_)), We.svgFilters === !0 && (X(P, N_), X(be, z_), X(be, V_)), We.mathMl === !0 && (X(P, F_), X(be, B_), X(be, V_))), Te.tagCheck = null, Te.attributeCheck = null, __(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? Te.tagCheck = e.ADD_TAGS : r_(e.ADD_TAGS) && (P === ye && (P = E_(P)), X(P, e.ADD_TAGS, ft))), __(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? Te.attributeCheck = e.ADD_ATTR : r_(e.ADD_ATTR) && (be === xe && (be = E_(be)), X(be, e.ADD_ATTR, ft))), __(e, "ADD_FORBID_CONTENTS") && r_(e.ADD_FORBID_CONTENTS) && (Ge === Ke && (Ge = E_(Ge)), X(Ge, e.ADD_FORBID_CONTENTS, ft)), He && (P["#text"] = !0), Me && X(P, [
			"html",
			"head",
			"body"
		]), P.table && (P.tbody = !0, delete Ce.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw x_("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw x_("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = D;
			D = e.TRUSTED_TYPES_POLICY;
			try {
				O = A("");
			} catch (e) {
				throw D = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (D = void 0, O = "") : (D === void 0 && (D = ie()), D && typeof O == "string" && (O = A("")));
		pt = Gg(e);
	}, _t = X({}, [
		...M_,
		...N_,
		...P_
	]), vt = X({}, [...F_, ...I_]), yt = function(e, t, n) {
		return t === $e ? e === "svg" : t === Ze ? e === "svg" && (n === "annotation-xml" || at[n]) : !!_t[e];
	}, bt = function(e, t, n) {
		return t === $e ? e === "math" : t === Qe ? e === "math" && st[n] : !!vt[e];
	}, xt = function(e, t, n) {
		return t === Qe && !st[n] || t === Ze && !at[n] ? !1 : !vt[e] && (lt[e] || !_t[e]);
	}, St = function(e) {
		let t = E(e), n = s_(w(e)), r = _(e), i = et, a = "template";
		return r && C(r) === av.element && (i = E(r), a = s_(w(r))), nt[t] ? t === Qe ? yt(n, i, a) : t === Ze ? bt(n, i, a) : t === $e ? xt(n, i, a) : ut === "application/xhtml+xml" : !1;
	}, Ct = function(e) {
		e_(t.removed, { element: e });
		try {
			_(e).removeChild(e);
		} catch {
			if (p(e), !_(e)) throw x_("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, wt = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, Tt = function(e) {
		kt(e);
		let t = g(e);
		t && Zg(t_(t), (e) => {
			try {
				p(e);
			} catch {}
		}), C(e) === av.element && Dt(e, !1);
	}, Et = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		if (e_(t.removed, {
			attribute: r || null,
			from: n
		}), r) wt(n, r, e);
		else try {
			n.removeAttribute(e);
		} catch {}
		if (e === "is") {
			if (Ie || Le) try {
				Ct(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, Dt = function(e, t) {
		let n = y(e);
		if (n) for (let r = n.length - 1; r >= 0; --r) {
			let i = n[r], a = i && i.name;
			typeof a == "string" && !(t && be[ft(a)]) && wt(e, i, a);
		}
	}, Ot = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && C(e) === av.element) {
				let t = v(e);
				Gt(t) && r.push(t);
			}
			let i = g(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, kt = function(e) {
		Ot(e, (e) => {
			C(e) === av.element && Dt(e, !0);
		});
	}, At = function(e) {
		let t = [];
		return Ot(e, (e) => {
			t.push(e);
		}, !0), t;
	}, jt = function(e, t) {
		let n = i_();
		Zg(At(e), (e) => {
			C(e) === av.element && a_(n, e);
		}), Zg(t, (e) => {
			C(e) === av.element && !o_(n, e) && Dt(e, !0);
		});
	}, Mt = function(e, n) {
		let r = !1;
		return Zg(t.removed, (t) => {
			t.element && (r ||= t.element === e, kt(t.element));
		}), jt(e, n), r;
	}, Nt = function(e, t) {
		let n = I, r = null, i = () => (r || (r = i_(), Zg(t, (e) => {
			a_(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = At(e), a = [e], o = !1;
			if (Zg(r, (e) => {
				C(e) === av.documentFragment ? e_(a, e) : !o && !o_(n, e) && (o = o_(i(), e));
			}), !o) return;
			if (t >= 8) throw x_("the tree kept changing during in-place sanitization; refusing to return it");
			Zg(a, (t, n) => {
				Pt(t, n > 0, e, i());
			});
		}
	}, Pt = function(e, t, n, r) {
		let i = zt(e), a;
		for (; a = i.nextNode();) o_(r, a) && !o_(I, a) && (t && qt(N.uponSanitizeShadowNode, a, null), cn(a, n));
	}, Ft = function(e) {
		I && a_(I, e);
	}, It = function(e, t) {
		return je ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, Lt = function(e) {
		je && Ot(e, (e) => {
			let t = C(e);
			if (t === av.processingInstruction || t === av.comment && b_(ev, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === av.element) {
				let t = e, n = ft(w(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && It("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, Rt = function(e) {
		let t = null, r = null;
		if (F) e = "<remove></remove>" + e;
		else {
			let t = l_(e, iv);
			r = t && t[0];
		}
		ut === "application/xhtml+xml" && et === $e && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = D ? A(e) : e;
		if (et === $e) try {
			t = new l().parseFromString(i, ut);
		} catch {}
		if (!t || !t.documentElement) {
			t = M.createDocument(et, "template", null);
			try {
				t.documentElement.innerHTML = tt ? O : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), et === $e ? ce.call(t, Me ? "html" : "body")[0] : Me ? t.documentElement : a;
	}, zt = function(e) {
		let t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], n = S ? S(e) : e.ownerDocument;
		return oe.call(n || e, e, (t ? 0 : c.SHOW_ELEMENT) | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Bt = function(e) {
		return e = u_(e, ue, " "), e = u_(e, de, " "), e = u_(e, fe, " "), e;
	}, Vt = function(e) {
		Ht(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && Zg(t, (e) => {
			Gt(e.content) && Vt(e.content);
		});
	}, Ht = function(e) {
		e.normalize();
		let t = zt(e, !0), n = t.nextNode();
		for (; n;) n.data = Bt(n.data), n = t.nextNode();
	}, Ut = function(e) {
		let t = x ? x(e) : null;
		return typeof t != "string" || ft(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== y(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== b(e) || e.childNodes !== g(e);
	}, Wt = function(e) {
		if (!b || typeof e != "object" || !e) return null;
		try {
			let t = b(e);
			return typeof t == "number" ? t : null;
		} catch {
			return null;
		}
	}, Gt = function(e) {
		return Wt(e) === av.documentFragment;
	}, Kt = function(e) {
		return Wt(e) !== null;
	};
	function qt(e, n, r) {
		e.length !== 0 && Zg(e, (e) => {
			e.call(t, n, r, pt);
		});
	}
	let Jt = function(e, t, n) {
		return !!(je && n === av.element && e.hasChildNodes() && !Kt(e.firstElementChild) && b_($_, e.textContent) && b_($_, e.innerHTML) || je && ov[t] && n === av.element && E(e) === $e && (Kt(e.firstElementChild) || typeof e.textContent == "string" && b_($_, e.textContent)) || n === av.processingInstruction || je && n === av.comment && b_(ev, e.data));
	}, Yt = function(e, t) {
		return e instanceof RegExp ? b_(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, Xt = function(e, t, n) {
		if (!Ce[t] && nn(t) && Yt(Se.tagNameCheck, t)) return !1;
		if (He && !Ge[t] && !Ge[s_(t)]) {
			let t = _(e), r = g(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, h(e));
				}
			}
		}
		return Ct(e), !0;
	}, Zt = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? E_(t) : t;
	}, Qt = function(e, t) {
		return e === t || _(e) !== null ? !1 : (Ue && kt(e), !0);
	}, $t = function(e, n) {
		if (Ft(e), qt(N.beforeSanitizeElements, e, null), Qt(e, n)) return !0;
		if (Ut(e)) return Ct(e), !0;
		let r = ft(w(e)), i = C(e);
		if (P = Zt(N.uponSanitizeElement, P, ye, Pe), qt(N.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: P
		}), Qt(e, n)) return !0;
		if (Jt(e, r, i)) return Ct(e), !0;
		if (Ce[r] || !(Te.tagCheck instanceof Function && Te.tagCheck(r)) && !P[r]) {
			let t = Xt(e, r, n);
			return t === !1 && (qt(N.afterSanitizeElements, e, null), Qt(e, n)) ? !0 : t;
		}
		if (i === av.element && !St(e) || (r === "noscript" || r === "noembed" || r === "noframes") && b_(tv, e.innerHTML)) return Ct(e), !0;
		if (Ae && i === av.text) {
			let n = e.textContent, r = Bt(n);
			n !== r && (e_(t.removed, { element: e.cloneNode() }), e.textContent = r);
		}
		return qt(N.afterSanitizeElements, e, null), Qt(e, n);
	}, en = function(e, t, r) {
		if (we[t] || It(t, e) || ze && (t === "id" || t === "name") && (r in n || r in mt)) return !1;
		let i = be[t] || Te.attributeCheck instanceof Function && Te.attributeCheck(t, e);
		if (De && b_(pe, t) || Ee && b_(me, t)) return !0;
		if (!i) return nn(e) && Yt(Se.tagNameCheck, e) && Yt(Se.attributeNameCheck, t, e) || t === "is" && Se.allowCustomizedBuiltInElements && Yt(Se.tagNameCheck, r);
		if (Ye[t]) return !0;
		let a = u_(r, ge, "");
		return b_(ve, a) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && d_(r, "data:") === 0 && qe[e] || Oe && !b_(he, a) ? !0 : !r;
	}, tn = X({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), nn = function(e) {
		return !tn[s_(e)] && b_(_e, e);
	}, rn = function(e, t, n, r) {
		if (D && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return A(r);
			case "TrustedScriptURL": return j(r);
		}
		return r;
	}, an = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !Ut(e) || (Ct(e), !1);
		} catch {
			return Et(t, e), !1;
		}
	}, on = function(e, t) {
		return je && b_(rv, t) ? !0 : s_(e) === "attributename" && d_(t, "href") !== -1;
	}, sn = function(e, n) {
		if (qt(N.beforeSanitizeAttributes, e, null), Qt(e, n)) return;
		let r = e.attributes;
		if (!r || Ut(e)) return;
		be = Zt(N.uponSanitizeAttribute, be, xe, Fe);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: be,
			forceKeepAttr: void 0
		}, a = r.length, o = ft(w(e));
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = ft(s), d = l, f = s === "value" ? d : f_(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, qt(N.uponSanitizeAttribute, e, i), f = i.attrValue, Be && (u === "id" || u === "name") && d_(f, Ve) !== 0 && (Et(s, e, n), f = Ve + f, p = !0), on(s, f) ? Et(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !ke && b_(nv, f) ? Et(s, e, n) : (Ae && (f = Bt(f)), en(o, u, f) ? (f = rn(o, u, c, f), f !== d && an(e, s, c, f) && p && $g(t.removed)) : Et(s, e, n)) : Et(s, e, n));
		}
		qt(N.afterSanitizeAttributes, e, null), Qt(e, n);
	}, cn = function(e, t) {
		$t(e, t), sn(e, t), Gt(e.content) && ln(e.content);
	}, ln = function(e) {
		let t = null, n = zt(e);
		for (qt(N.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if (qt(N.uponSanitizeShadowNode, t, null), cn(t, e), C(t) === av.element) {
			let e = v(t);
			Gt(e) && (un(e), ln(e));
		}
		Ae && Ht(e), qt(N.afterSanitizeShadowDOM, e, null);
	}, un = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				ln(e.shadow);
				continue;
			}
			let n = e.node, r = C(n) === av.element, i = g(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = x ? x(n) : null;
				if (typeof e == "string" && ft(e) === "template") {
					let e = n.content;
					Gt(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = v(n);
				Gt(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (tt = !e, tt && (e = "<!-->"), typeof e != "string" && !Kt(e) && (e = D_(e), typeof e != "string")) throw x_("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		Ne ? (P = Pe, be = Fe) : gt(n), t.removed = [];
		let c = Ue && typeof e != "string" && Kt(e), l = [], u = I;
		if (c) {
			Lt(e);
			let t = w(e);
			if (typeof t == "string") {
				let n = ft(t);
				if (!P[n] || Ce[n]) throw Tt(e), x_("root node is forbidden and cannot be sanitized in-place");
			}
			if (Ut(e)) throw Tt(e), x_("root node is clobbered and cannot be sanitized in-place");
			l = At(e), I = i_();
		} else if (Kt(e)) i = Rt("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === av.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), un(i);
		else {
			if (!Ie && !Ae && !Me && e.indexOf("<") === -1) return re(e);
			if (i = Rt(e), !i) return Ie ? null : Re ? O : "";
		}
		i && F && Ct(i.firstChild);
		let d = c ? e : i;
		try {
			c && un(e);
			let t = zt(d);
			for (; o = t.nextNode();) cn(o, d);
			c && Nt(e, l);
		} catch (t) {
			throw c && (Tt(e), Mt(e, l)), t;
		} finally {
			I = u;
		}
		if (c) {
			if (Mt(e, l)) throw x_("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return Ae && Vt(e), e;
		}
		if (Ie) {
			if (Ae && Vt(i), Le) for (s = se.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (be.shadowroot || be.shadowrootmode) && (s = le.call(r, s, !0)), s;
		}
		let f = () => Me ? i.outerHTML : i.innerHTML, p = f();
		return Ae && b_(G_, p) && (Ht(i), p = f()), Me && P["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && b_(Z_, i.ownerDocument.doctype.name) && (p = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + p), re(p);
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		gt(e), Ne = !0, Pe = P, Fe = be;
	}, t.clearConfig = function() {
		pt = null, Ne = !1, Pe = null, Fe = null, D = k, O = "";
	}, t.isValidAttribute = function(e, t, n) {
		pt || gt({});
		let r = ft(e), i = ft(t);
		return typeof n == "string" && (on(t, n) || !ke && b_(nv, n)) ? !1 : en(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && __(N, e) && e_(N[e], t);
	}, t.removeHook = function(e, t) {
		if (__(N, e)) {
			if (t !== void 0) {
				let n = Qg(N[e], t);
				return n === -1 ? void 0 : n_(N[e], n, 1)[0];
			}
			return $g(N[e]);
		}
	}, t.removeHooks = function(e) {
		__(N, e) && (N[e] = []);
	}, t.removeAllHooks = function() {
		N = lv();
	}, t;
}
var pv = fv(), mv = ["aria-hidden", "aria-label"], hv = {
	key: 0,
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg"
}, gv = ["d"], _v = ["innerHTML"], vv = /* @__PURE__ */ Eg(/* @__PURE__ */ hi({
	__name: "NcIconSvgWrapper",
	props: {
		directional: { type: Boolean },
		inline: { type: Boolean },
		svg: { default: "" },
		name: { default: void 0 },
		path: { default: "" },
		size: { default: 20 }
	},
	setup(e) {
		pl((e) => ({ fb515064: n.value }));
		let t = e, n = G(() => typeof t.size == "number" ? `${t.size}px` : t.size), r = G(() => {
			if (!t.svg || t.path) return;
			let e = pv.sanitize(t.svg), n = new DOMParser().parseFromString(e, "image/svg+xml");
			return n.querySelector("parsererror") ? (Ec("SVG is not valid"), "") : (n.documentElement.id && n.documentElement.removeAttribute("id"), n.documentElement.outerHTML);
		});
		return (t, n) => (V(), H("span", {
			"aria-hidden": e.name ? void 0 : "true",
			"aria-label": e.name || void 0,
			class: ve(["icon-vue", {
				"icon-vue--directional": e.directional,
				"icon-vue--inline": e.inline
			}]),
			role: "img"
		}, [r.value ? (V(), H("span", {
			key: 1,
			innerHTML: r.value
		}, null, 8, _v)) : (V(), H("svg", hv, [U("path", { d: e.path }, null, 8, gv)]))], 10, mv));
	}
}), [["__scopeId", "data-v-aaedb1c3"]]), yv = 1024;
yv / 2;
var bv = (e) => document.documentElement.clientWidth < e, xv = /* @__PURE__ */ _n(bv(yv)), Sv = /* @__PURE__ */ _n(bv(512));
window.addEventListener("resize", () => {
	xv.value = bv(yv), Sv.value = bv(512);
}, { passive: !0 });
function Cv() {
	return /* @__PURE__ */ sn(xv);
}
function wv() {
	return /* @__PURE__ */ sn(Sv);
}
// node_modules/@nextcloud/router/dist/index.mjs
var Tv = (e) => "/remote.php/" + e;
function Ev(e, t) {
	return Nv(t), (t?.baseURL ?? Av()) + Tv(e);
}
function Dv(e, t, n) {
	let r = {
		ocsVersion: 2,
		...n || {}
	};
	Nv(r);
	let i = r.ocsVersion === 1 ? 1 : 2;
	return (n?.baseURL ?? Av()) + "/ocs/v" + i + ".php" + Ov(e, t, n);
}
function Ov(e, t, n) {
	let r = {
		escape: !0,
		...n || {}
	};
	return e.charAt(0) !== "/" && (e = "/" + e), function(e, t) {
		return t ||= {}, e.replace(/{([^{}]*)}/g, function(e, n) {
			let i = t[n];
			return r.escape ? encodeURIComponent(typeof i == "string" || typeof i == "number" ? i.toString() : e) : typeof i == "string" || typeof i == "number" ? i.toString() : e;
		});
	}(e, t || {});
}
function kv(e, t, n) {
	let r = {
		noRewrite: !1,
		...n || {}
	};
	Nv(r);
	let i = n?.baseURL ?? jv();
	return !r.noRewrite && typeof window < "u" && window.OC?.config?.modRewriteWorking === !0 ? i + Ov(e, t, n) : i + "/index.php" + Ov(e, t, n);
}
function Av() {
	return Mv(), window.location.protocol + "//" + window.location.host + jv();
}
function jv() {
	Mv();
	let e = window._oc_webroot;
	if (e === void 0) {
		e = location.pathname;
		let t = e.indexOf("/index.php/");
		if (t !== -1) e = e.slice(0, t);
		else {
			let t = e.indexOf("/", 1);
			e = e.slice(0, t > 0 ? t : void 0);
		}
	}
	return e;
}
function Mv() {
	if (typeof window > "u") throw Error("This function is only available in a DOM environment");
}
function Nv(e) {
	if (typeof window > "u" && !e?.baseURL) throw Error("This function requires baseURL option to be provided in non-DOM environments");
}
function Pv(e, t) {
	let n = (t?.size || 64) <= 64 ? 64 : 512, r = kv(`/avatar${t?.isGuestUser ? "/guest" : ""}/{user}/{size}${t?.isDarkTheme ? "/dark" : ""}`, {
		user: e,
		size: n
	}), i = new URLSearchParams();
	t?.guestFallback && i.set("guestFallback", "true"), t?.version !== void 0 && i.set("v", String(t.version));
	let a = i.toString();
	return a ? `${r}?${a}` : r;
}
// node_modules/escape-html/index.js
var Fv = /* @__PURE__ */ n(((e, t) => {
	var n = /["'&<>]/;
	t.exports = r;
	function r(e) {
		var t = "" + e, r = n.exec(t);
		if (!r) return t;
		var i, a = "", o = 0, s = 0;
		for (o = r.index; o < t.length; o++) {
			switch (t.charCodeAt(o)) {
				case 34:
					i = "&quot;";
					break;
				case 38:
					i = "&amp;";
					break;
				case 39:
					i = "&#39;";
					break;
				case 60:
					i = "&lt;";
					break;
				case 62:
					i = "&gt;";
					break;
				default: continue;
			}
			s !== o && (a += t.substring(s, o)), s = o + 1, a += i;
		}
		return s === o ? a : a + t.substring(s, o);
	}
})), Iv = /* @__PURE__ */ t(Fv(), 1);
function Lv() {
	return globalThis._nc_l10n_locale;
}
function Rv() {
	return Lv().replaceAll(/_/g, "-");
}
function zv() {
	return globalThis._nc_l10n_language;
}
function Bv(e) {
	let t = e || zv();
	return [
		"ae",
		"ar",
		"arc",
		"arz",
		"bcc",
		"bqi",
		"ckb",
		"dv",
		"fa",
		"glk",
		"ha",
		"he",
		"khw",
		"ks",
		"ku",
		"mzn",
		"nqo",
		"pnb",
		"ps",
		"sd",
		"ug",
		"ur",
		"ur-PK",
		"uz-AF",
		"yi"
	].includes(t);
}
globalThis._nc_l10n_locale ??= typeof document < "u" && document.documentElement.dataset.locale || Intl.DateTimeFormat().resolvedOptions().locale.replaceAll(/-/g, "_"), globalThis._nc_l10n_language ??= typeof document < "u" && document.documentElement.lang || (globalThis.navigator?.language ?? "en");
function Vv(e) {
	return {
		translations: globalThis._oc_l10n_registry_translations[e] ?? {},
		pluralFunction: globalThis._oc_l10n_registry_plural_functions[e] ?? ((e) => e)
	};
}
globalThis._oc_l10n_registry_translations ??= {}, globalThis._oc_l10n_registry_plural_functions ??= {};
function Hv(e, t, n, r, i) {
	let a = typeof n == "object" ? n : void 0, o = typeof r == "number" ? r : typeof n == "number" ? n : void 0, s = {
		escape: !0,
		sanitize: !0,
		...typeof i == "object" ? i : typeof r == "object" ? r : {}
	}, c = (e) => e, l = (s.sanitize ? pv.sanitize : c) || c, u = s.escape ? Iv.default : c, d = (e) => typeof e == "string" || typeof e == "number", f = (e, t, n) => e.replace(/%n/g, "" + n).replace(/{([^{}]*)}/g, (e, n) => {
		if (t === void 0 || !(n in t)) return u(e);
		let r = t[n];
		return d(r) ? u(`${r}`) : typeof r == "object" && d(r.value) ? (r.escape === !1 ? c : Iv.default)(`${r.value}`) : u(e);
	}), p = (i?.bundle ?? Vv(e)).translations[t] || t;
	return p = Array.isArray(p) ? p[0] : p, l(typeof a == "object" || o !== void 0 ? f(p, a, o) : p);
}
function Uv(e, t, n, r, i, a) {
	let o = "_" + t + "_::_" + n + "_", s = a?.bundle ?? Vv(e), c = s.translations[o];
	if (c !== void 0) {
		let t = c;
		if (Array.isArray(t)) return Hv(e, t[s.pluralFunction(r)], i, r, a);
	}
	return r === 1 ? Hv(e, t, i, r, a) : Hv(e, n, i, r, a);
}
function Wv(e, t = zv()) {
	switch (t === "pt-BR" && (t = "xbr"), t.length > 3 && (t = t.substring(0, t.lastIndexOf("-"))), t) {
		case "az":
		case "bo":
		case "dz":
		case "id":
		case "ja":
		case "jv":
		case "ka":
		case "km":
		case "kn":
		case "ko":
		case "ms":
		case "th":
		case "tr":
		case "vi":
		case "zh": return 0;
		case "af":
		case "bn":
		case "bg":
		case "ca":
		case "da":
		case "de":
		case "el":
		case "en":
		case "eo":
		case "es":
		case "et":
		case "eu":
		case "fa":
		case "fi":
		case "fo":
		case "fur":
		case "fy":
		case "gl":
		case "gu":
		case "ha":
		case "he":
		case "hu":
		case "is":
		case "it":
		case "ku":
		case "lb":
		case "ml":
		case "mn":
		case "mr":
		case "nah":
		case "nb":
		case "ne":
		case "nl":
		case "nn":
		case "no":
		case "oc":
		case "om":
		case "or":
		case "pa":
		case "pap":
		case "ps":
		case "pt":
		case "so":
		case "sq":
		case "sv":
		case "sw":
		case "ta":
		case "te":
		case "tk":
		case "ur":
		case "zu": return e === 1 ? 0 : 1;
		case "am":
		case "bh":
		case "fil":
		case "fr":
		case "gun":
		case "hi":
		case "hy":
		case "ln":
		case "mg":
		case "nso":
		case "xbr":
		case "ti":
		case "wa": return e === 0 || e === 1 ? 0 : 1;
		case "be":
		case "bs":
		case "hr":
		case "ru":
		case "sh":
		case "sr":
		case "uk": return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
		case "cs":
		case "sk": return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
		case "ga": return e === 1 ? 0 : e === 2 ? 1 : 2;
		case "lt": return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
		case "sl": return e % 100 == 1 ? 0 : e % 100 == 2 ? 1 : e % 100 == 3 || e % 100 == 4 ? 2 : 3;
		case "mk": return e % 10 == 1 ? 0 : 1;
		case "mt": return e === 1 ? 0 : e === 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
		case "lv": return e === 0 ? 0 : e % 10 == 1 && e % 100 != 11 ? 1 : 2;
		case "pl": return e === 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 12 || e % 100 > 14) ? 1 : 2;
		case "cy": return e === 1 ? 0 : e === 2 ? 1 : e === 8 || e === 11 ? 2 : 3;
		case "ro": return e === 1 ? 0 : e === 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
		case "ar": return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 && e % 100 <= 99 ? 4 : 5;
		default: return 0;
	}
}
// node_modules/@nextcloud/l10n/dist/index.mjs
function Gv() {
	if (globalThis.firstDay !== void 0) return globalThis.firstDay;
	let e = new Intl.Locale(Rv()), t = e.getWeekInfo?.() ?? e.weekInfo;
	return t ? t.firstDay % 7 : 1;
}
function Kv() {
	if (globalThis.dayNames !== void 0) return globalThis.dayNames;
	let e = Rv();
	return [
		new Date(1970, 0, 4).toLocaleDateString(e, { weekday: "long" }),
		new Date(1970, 0, 5).toLocaleDateString(e, { weekday: "long" }),
		new Date(1970, 0, 6).toLocaleDateString(e, { weekday: "long" }),
		new Date(1970, 0, 7).toLocaleDateString(e, { weekday: "long" }),
		new Date(1970, 0, 8).toLocaleDateString(e, { weekday: "long" }),
		new Date(1970, 0, 9).toLocaleDateString(e, { weekday: "long" }),
		new Date(1970, 0, 10).toLocaleDateString(e, { weekday: "long" })
	];
}
function qv() {
	if (globalThis.dayNamesMin !== void 0) return globalThis.dayNamesMin;
	let e = Rv();
	return [
		new Date(1970, 0, 4).toLocaleDateString(e, { weekday: "narrow" }),
		new Date(1970, 0, 5).toLocaleDateString(e, { weekday: "narrow" }),
		new Date(1970, 0, 6).toLocaleDateString(e, { weekday: "narrow" }),
		new Date(1970, 0, 7).toLocaleDateString(e, { weekday: "narrow" }),
		new Date(1970, 0, 8).toLocaleDateString(e, { weekday: "narrow" }),
		new Date(1970, 0, 9).toLocaleDateString(e, { weekday: "narrow" }),
		new Date(1970, 0, 10).toLocaleDateString(e, { weekday: "narrow" })
	];
}
function Jv(e = Date.now(), t = {}) {
	let n = {
		ignoreSeconds: !1,
		language: zv(),
		relativeTime: "long",
		...t
	}, r = new Date(e), i = new Intl.RelativeTimeFormat([n.language, zv()], {
		numeric: "auto",
		style: n.relativeTime
	}), a = (r.getTime() - Date.now()) / 1e3;
	if (Math.abs(a) < 59.5) return n.ignoreSeconds || i.format(Math.round(a), "second");
	let o = a / 60;
	if (Math.abs(o) <= 59) return i.format(Math.round(o), "minute");
	let s = o / 60;
	if (Math.abs(s) < 23.5) return i.format(Math.round(s), "hour");
	let c = s / 24;
	if (Math.abs(c) < 6.5) return i.format(Math.round(c), "day");
	if (Math.abs(c) < 27.5) {
		let e = c / 7;
		return i.format(Math.round(e), "week");
	}
	let l = c / 30, u = Math.abs(l) < 11 ? {
		month: n.relativeTime,
		day: "numeric"
	} : {
		year: n.relativeTime === "narrow" ? "2-digit" : "numeric",
		month: n.relativeTime
	};
	return new Intl.DateTimeFormat([n.language, zv()], u).format(r);
}
// node_modules/@nextcloud/l10n/dist/gettext.mjs
var Yv = class {
	bundle;
	constructor(e) {
		this.bundle = {
			pluralFunction: e,
			translations: {}
		};
	}
	addTranslations(e) {
		let t = Object.values(e.translations[""] ?? {}).map(({ msgid: e, msgid_plural: t, msgstr: n }) => t === void 0 ? [e, n[0]] : [`_${e}_::_${t}_`, n]);
		this.bundle.translations = {
			...this.bundle.translations,
			...Object.fromEntries(t)
		};
	}
	gettext(e, t = {}) {
		return Hv("", e, t, void 0, { bundle: this.bundle });
	}
	ngettext(e, t, n, r = {}) {
		return Uv("", e, t, n, r, { bundle: this.bundle });
	}
}, Xv = class {
	debug = !1;
	language = "en";
	translations = {};
	setLanguage(e) {
		return this.language = e, this;
	}
	detectLocale() {
		return this.detectLanguage();
	}
	detectLanguage() {
		return this.setLanguage(zv().replace("-", "_"));
	}
	addTranslation(e, t) {
		return this.translations[e] = t, this;
	}
	enableDebugMode() {
		return this.debug = !0, this;
	}
	build() {
		this.debug && console.debug(`Creating gettext instance for language ${this.language}`);
		let e = new Yv((e) => Wv(e, this.language));
		return this.language in this.translations && e.addTranslations(this.translations[this.language]), e;
	}
};
function Zv() {
	return new Xv();
}
// node_modules/@nextcloud/vue/dist/chunks/_l10n.mjs
var Qv = Zv().detectLanguage().build(), $v = (...e) => Qv.ngettext(...e), ey = (...e) => Qv.gettext(...e);
function ty(...e) {
	for (let t of e) if (!t.registered) {
		for (let { l: e, t: n } of t) {
			if (e !== zv() || !n) continue;
			let t = Object.fromEntries(Object.entries(n).map(([e, t]) => [e, {
				msgid: e,
				msgid_plural: t.p,
				msgstr: t.v
			}]));
			Qv.addTranslations({ translations: { "": t } });
		}
		t.registered = !0;
	}
}
var ny = [
	{
		l: "ar",
		t: {
			"A color with a HEX value {hex}": { v: ["لون بالقيمة الست عشرية {hex}"] },
			Back: { v: ["عودة"] },
			Choose: { v: ["إختَر"] },
			"Color picker": { v: ["لاقط الألوان"] },
			"More options": { v: ["خيارات أخرى ..."] }
		}
	},
	{
		l: "ast",
		t: {
			"A color with a HEX value {hex}": { v: ["Un color con un valor HEX {hex}"] },
			Back: { v: ["Atrás"] },
			Choose: { v: ["Escoyer"] },
			"Color picker": { v: ["Selector de colores"] },
			"More options": { v: ["Más opciones"] }
		}
	},
	{
		l: "br",
		t: { Choose: { v: ["Dibab"] } }
	},
	{
		l: "ca",
		t: { Choose: { v: ["Tria"] } }
	},
	{
		l: "cs",
		t: {
			"A color with a HEX value {hex}": { v: ["Barva vyjádřená HEX hodnotou {hex}"] },
			Back: { v: ["Zpět"] },
			Choose: { v: ["Zvolit"] },
			"Color picker": { v: ["Výběr barev"] },
			"More options": { v: ["Další volby"] },
			"No color": { v: ["Žádná barva"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"A color with a HEX value {hex}": { v: ["Barva vyjádřená HEX hodnotou {hex}"] },
			Back: { v: ["Zpět"] },
			Choose: { v: ["Zvolit"] },
			"Color picker": { v: ["Výběr barev"] },
			"More options": { v: ["Další volby"] }
		}
	},
	{
		l: "da",
		t: {
			"A color with a HEX value {hex}": { v: ["En farve med en HEX-værdi {hex}"] },
			Back: { v: ["Tilbage"] },
			Choose: { v: ["Vælg"] },
			"Color picker": { v: ["Farvevælger"] },
			"More options": { v: ["Flere muligheder"] },
			"No color": { v: ["Ingen farve"] }
		}
	},
	{
		l: "de",
		t: {
			"A color with a HEX value {hex}": { v: ["Eine Farbe mit einem HEX-Wert {hex}"] },
			Back: { v: ["Zurück"] },
			Choose: { v: ["Auswählen"] },
			"Color picker": { v: ["Farbauswahl"] },
			"More options": { v: ["Weitere Optionen"] },
			"No color": { v: ["Keine Farbe"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"A color with a HEX value {hex}": { v: ["Eine Farbe mit einem HEX-Wert {hex}"] },
			Back: { v: ["Zurück"] },
			Choose: { v: ["Auswählen"] },
			"Color picker": { v: ["Farbauswahl"] },
			"More options": { v: ["Mehr Optionen"] },
			"No color": { v: ["Keine Farbe"] }
		}
	},
	{
		l: "el",
		t: {
			"A color with a HEX value {hex}": { v: ["Ένα χρώμα με τιμή HEX {hex}"] },
			Back: { v: ["Επιστροφή"] },
			Choose: { v: ["Επιλογή"] },
			"Color picker": { v: ["Επιλογέας χρώματος"] },
			"More options": { v: ["Περισσότερες επιλογές"] },
			"No color": { v: ["Χωρίς χρώμα"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"A color with a HEX value {hex}": { v: ["A colour with a HEX value {hex}"] },
			Back: { v: ["Back"] },
			Choose: { v: ["Choose"] },
			"Color picker": { v: ["Colour picker"] },
			"More options": { v: ["More options"] },
			"No color": { v: ["No colour"] }
		}
	},
	{
		l: "eo",
		t: { Choose: { v: ["Elektu"] } }
	},
	{
		l: "es",
		t: {
			"A color with a HEX value {hex}": { v: ["Un color con un valor HEX {hex}"] },
			Back: { v: ["Atrás"] },
			Choose: { v: ["Escoger"] },
			"Color picker": { v: ["Selector de color"] },
			"More options": { v: ["Más opciones"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"A color with a HEX value {hex}": { v: ["Un color con valor HEX {hex}"] },
			Back: { v: ["Atrás"] },
			Choose: { v: ["Elegir"] },
			"Color picker": { v: ["Selector de color"] },
			"More options": { v: ["Más opciones"] }
		}
	},
	{
		l: "es-EC",
		t: {
			Back: { v: ["Atrás"] },
			Choose: { v: ["Elegir"] },
			"More options": { v: ["Más opciones"] }
		}
	},
	{
		l: "es-MX",
		t: {
			"A color with a HEX value {hex}": { v: ["Un color con valor HEX {hex}"] },
			Back: { v: ["Atrás"] },
			Choose: { v: ["Elegir"] },
			"Color picker": { v: ["Selector de color"] },
			"More options": { v: ["Más opciones"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"A color with a HEX value {hex}": { v: ["Värv kuueteistkümnendarvuna {hex}"] },
			Back: { v: ["Tagasi"] },
			Choose: { v: ["Tee valik"] },
			"Color picker": { v: ["Värvivalija"] },
			"More options": { v: ["Rohkem valikuid"] },
			"No color": { v: ["Värv puudub"] }
		}
	},
	{
		l: "eu",
		t: {
			Back: { v: ["Atzera"] },
			Choose: { v: ["Aukeratu"] },
			"More options": { v: ["Aukera gehiago"] }
		}
	},
	{
		l: "fa",
		t: {
			"A color with a HEX value {hex}": { v: ["رنگی با مقدار مبنای هشت {hex}"] },
			Back: { v: ["بازگشت"] },
			Choose: { v: ["انتخاب کنید"] },
			"Color picker": { v: ["انتخاب‌گر رنگ"] },
			"More options": { v: ["گزینه‌های بیشتر"] }
		}
	},
	{
		l: "fi",
		t: {
			"A color with a HEX value {hex}": { v: ["Väri heksa-arvolla {hex}"] },
			Back: { v: ["Takaisin"] },
			Choose: { v: ["Valitse"] },
			"Color picker": { v: ["Värivalitsin"] },
			"More options": { v: ["Lisää vaihtoehtoja"] }
		}
	},
	{
		l: "fr",
		t: {
			"A color with a HEX value {hex}": { v: ["Une couleur dont la valeur hexadécimale est {hex}"] },
			Back: { v: ["Retour"] },
			Choose: { v: ["Choisir"] },
			"Color picker": { v: ["Sélecteur de couleurs"] },
			"More options": { v: ["Plus d'options"] },
			"No color": { v: ["Sans couleur"] }
		}
	},
	{
		l: "ga",
		t: {
			"A color with a HEX value {hex}": { v: ["Dath le luach HEX {hex}"] },
			Back: { v: ["Ar ais"] },
			Choose: { v: ["Roghnaigh"] },
			"Color picker": { v: ["Roghnóir dathanna"] },
			"More options": { v: ["Tuilleadh roghanna"] },
			"No color": { v: ["Gan dath"] }
		}
	},
	{
		l: "gl",
		t: {
			"A color with a HEX value {hex}": { v: ["Unha cor cun valor HEX {hex}"] },
			Back: { v: ["Atrás"] },
			Choose: { v: ["Escoller"] },
			"Color picker": { v: ["Selector de cores"] },
			"More options": { v: ["Máis opcións"] },
			"No color": { v: ["Sen cor"] }
		}
	},
	{
		l: "he",
		t: {
			Back: { v: ["חזרה"] },
			Choose: { v: ["בחירה"] },
			"More options": { v: ["אפשרויות נוספות"] }
		}
	},
	{
		l: "hr",
		t: {
			"A color with a HEX value {hex}": { v: ["Boja s HEX vrijednošću {hex}"] },
			Back: { v: ["Natrag"] },
			Choose: { v: ["Odaberi"] },
			"Color picker": { v: ["Odabir boje"] },
			"More options": { v: ["Više mogućnosti"] },
			"No color": { v: ["Bez boje"] }
		}
	},
	{
		l: "hu",
		t: {
			"A color with a HEX value {hex}": { v: ["Szín ezzel a HEX értékkel: {hex}"] },
			Back: { v: ["Vissza"] },
			Choose: { v: ["Válassszon"] },
			"Color picker": { v: ["Színválasztó"] },
			"More options": { v: ["További lehetőségek"] },
			"No color": { v: ["Nincs szín"] }
		}
	},
	{
		l: "id",
		t: {
			"A color with a HEX value {hex}": { v: ["Warna dengan nilai HEX {hex}"] },
			Back: { v: ["Kembali"] },
			Choose: { v: ["Pilih"] },
			"Color picker": { v: ["Pemilih warna"] },
			"More options": { v: ["Opsi lainnya"] },
			"No color": { v: ["Tanpa warna"] }
		}
	},
	{
		l: "is",
		t: {
			"A color with a HEX value {hex}": { v: ["Litur með HEX-gildi {hex}"] },
			Back: { v: ["Til baka"] },
			Choose: { v: ["Velja"] },
			"Color picker": { v: ["Litaplokkari"] },
			"More options": { v: ["Fleiri valkostir"] }
		}
	},
	{
		l: "it",
		t: {
			"A color with a HEX value {hex}": { v: ["Un colore con un valore HEX {hex}"] },
			Back: { v: ["Indietro"] },
			Choose: { v: ["Scegli"] },
			"More options": { v: ["Altre opzioni"] }
		}
	},
	{
		l: "ja",
		t: {
			"A color with a HEX value {hex}": { v: [" HEX値 {hex} を持つ色"] },
			Back: { v: ["戻る"] },
			Choose: { v: ["選択"] },
			"Color picker": { v: ["カラーピッカー"] },
			"More options": { v: ["他のオプション"] },
			"No color": { v: ["色なし"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"A color with a HEX value {hex}": { v: [" HEX値 {hex} を持つ色"] },
			Back: { v: ["戻る"] },
			Choose: { v: ["選択"] },
			"Color picker": { v: ["カラーピッカー"] },
			"More options": { v: ["他のオプション"] }
		}
	},
	{
		l: "ko",
		t: {
			"A color with a HEX value {hex}": { v: ["HEX 값이 {hex}인 색상"] },
			Back: { v: ["뒤로"] },
			Choose: { v: ["선택"] },
			"Color picker": { v: ["색상 선택기"] },
			"More options": { v: ["옵션 더 보기"] },
			"No color": { v: ["색 없음"] }
		}
	},
	{
		l: "lo",
		t: {
			"A color with a HEX value {hex}": { v: ["ສີທີ່ມີຄ່າ HEX {hex}"] },
			Back: { v: ["ກັບຄືນ"] },
			Choose: { v: ["ເລືອກ"] },
			"Color picker": { v: ["ໂຕເລືອກສີ"] },
			"More options": { v: ["ຕົວເລືອກເພີ່ມເຕີມ"] },
			"No color": { v: ["ບໍ່ມີສີ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"A color with a HEX value {hex}": { v: ["Spalva, kurios HEX reikšmė yra {hex}"] },
			Back: { v: ["Atgal"] },
			Choose: { v: ["Pasirinkti"] },
			"Color picker": { v: ["Spalvos parinkiklis"] },
			"More options": { v: ["Daugiau parinkčių"] },
			"No color": { v: ["Be spalvos"] }
		}
	},
	{
		l: "lv",
		t: { Choose: { v: ["Izvēlēties"] } }
	},
	{
		l: "mk",
		t: {
			"A color with a HEX value {hex}": { v: ["Боја со HEX вредност {hex}"] },
			Back: { v: ["Назад"] },
			Choose: { v: ["Избери"] },
			"Color picker": { v: ["Избор на боја"] },
			"More options": { v: ["Повеќе опции"] },
			"No color": { v: ["Без боја"] }
		}
	},
	{
		l: "mn",
		t: {
			"A color with a HEX value {hex}": { v: ["{hex} HEX утгатай өнгө"] },
			Back: { v: ["Буцах"] },
			Choose: { v: ["Сонгох"] },
			"Color picker": { v: ["Өнгө сонгогч"] },
			"More options": { v: ["Нэмэлт сонголтууд"] },
			"No color": { v: ["Өнгөгүй"] }
		}
	},
	{
		l: "my",
		t: { Choose: { v: ["ရွေးချယ်ရန်"] } }
	},
	{
		l: "nb",
		t: {
			"A color with a HEX value {hex}": { v: ["En farge med en HEX-verdi {hex}"] },
			Back: { v: ["Tilbake"] },
			Choose: { v: ["Velg"] },
			"Color picker": { v: ["Fargevelger"] },
			"More options": { v: ["Flere alternativer"] }
		}
	},
	{
		l: "nl",
		t: {
			"A color with a HEX value {hex}": { v: ["Een kleur met een HEX-waarde {hex}"] },
			Back: { v: ["Terug"] },
			Choose: { v: ["Kiezen"] },
			"Color picker": { v: ["Kleurkiezer"] },
			"More options": { v: ["Meer opties"] },
			"No color": { v: ["Geen kleur"] }
		}
	},
	{
		l: "oc",
		t: { Choose: { v: ["Causir"] } }
	},
	{
		l: "pl",
		t: {
			"A color with a HEX value {hex}": { v: ["Kolor o wartości HEX {hex}"] },
			Back: { v: ["Wstecz"] },
			Choose: { v: ["Wybierz"] },
			"Color picker": { v: ["Wybierz kolor"] },
			"More options": { v: ["Więcej opcji"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"A color with a HEX value {hex}": { v: ["Uma cor com valor HEX {hex}"] },
			Back: { v: ["Voltar"] },
			Choose: { v: ["Escolher"] },
			"Color picker": { v: ["Seletor de cores"] },
			"More options": { v: ["Mais opções"] },
			"No color": { v: ["Sem cor"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"A color with a HEX value {hex}": { v: ["Uma cor com o valor HEX  {hex}"] },
			Back: { v: ["Anterior"] },
			Choose: { v: ["Escolher"] },
			"Color picker": { v: ["seletor de cores"] },
			"More options": { v: ["Mais opções"] }
		}
	},
	{
		l: "ro",
		t: {
			"A color with a HEX value {hex}": { v: ["O culoare cu valoarea HEX {hex}"] },
			Back: { v: ["Înapoi"] },
			Choose: { v: ["Alege"] },
			"Color picker": { v: ["Selector de culori"] },
			"More options": { v: ["Mai multe opțiuni"] },
			"No color": { v: ["Nicio culoare"] }
		}
	},
	{
		l: "ru",
		t: {
			"A color with a HEX value {hex}": { v: ["Цвет с HEX-кодом {hex}"] },
			Back: { v: ["Назад"] },
			Choose: { v: ["Выбрать"] },
			"Color picker": { v: ["Выбор цвета"] },
			"More options": { v: ["Дополнительные параметры"] },
			"No color": { v: ["Без цвета"] }
		}
	},
	{
		l: "sk",
		t: {
			"A color with a HEX value {hex}": { v: ["Farba s hodnotou HEX {hex}"] },
			Back: { v: ["Späť"] },
			Choose: { v: ["Vybrať"] },
			"Color picker": { v: ["Výber farby"] },
			"More options": { v: ["Viac možností"] }
		}
	},
	{
		l: "sl",
		t: { Choose: { v: ["Izbor"] } }
	},
	{
		l: "sr",
		t: {
			"A color with a HEX value {hex}": { v: ["Боја са HEX вредности {hex}"] },
			Back: { v: ["Назад"] },
			Choose: { v: ["Изаберите"] },
			"Color picker": { v: ["Бирач боје"] },
			"More options": { v: ["Још опција"] },
			"No color": { v: ["Без боје"] }
		}
	},
	{
		l: "sv",
		t: {
			"A color with a HEX value {hex}": { v: ["En färg med HEX-värdet {hex}"] },
			Back: { v: ["Tillbaka"] },
			Choose: { v: ["Välj"] },
			"Color picker": { v: ["Färgväljare"] },
			"More options": { v: ["Fler alternativ"] },
			"No color": { v: ["Ingen färg"] }
		}
	},
	{
		l: "tr",
		t: {
			"A color with a HEX value {hex}": { v: ["{hex} onaltılık değeri ile bir renk "] },
			Back: { v: ["Geri"] },
			Choose: { v: ["Seçin"] },
			"Color picker": { v: ["Renk seçici"] },
			"More options": { v: ["Diğer seçenekler"] },
			"No color": { v: ["Renk yok"] }
		}
	},
	{
		l: "uk",
		t: {
			"A color with a HEX value {hex}": { v: ["Колір у форматі HEX {hex}"] },
			Back: { v: ["Назад"] },
			Choose: { v: ["Виберіть"] },
			"Color picker": { v: ["Вибір кольору"] },
			"More options": { v: ["Більше об'єктів"] }
		}
	},
	{
		l: "uz",
		t: {
			"A color with a HEX value {hex}": { v: ["HEX qiymatiga ega rang {hex}"] },
			Back: { v: ["Orqaga"] },
			Choose: { v: ["Tanlang"] },
			"Color picker": { v: ["Rang tanlagich"] },
			"More options": { v: ["Boshqa variantlar"] },
			"No color": { v: ["Rangsiz"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"A color with a HEX value {hex}": { v: ["以16进制 {hex} 表示的颜色为"] },
			Back: { v: ["返回"] },
			Choose: { v: ["选择"] },
			"Color picker": { v: ["颜色拾取器"] },
			"More options": { v: ["更多选项"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"A color with a HEX value {hex}": { v: ["具有 HEX 值 {hex}的顏色 "] },
			Back: { v: ["返回"] },
			Choose: { v: ["選擇"] },
			"Color picker": { v: ["顏色選擇器"] },
			"More options": { v: ["更多選項"] },
			"No color": { v: ["無顏色"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"A color with a HEX value {hex}": { v: ["HEX 值為 {hex} 的顏色"] },
			Back: { v: ["返回"] },
			Choose: { v: ["選擇"] },
			"Color picker": { v: ["色彩挑選器"] },
			"More options": { v: ["更多選項"] },
			"No color": { v: ["沒有顏色"] }
		}
	}
], ry = [
	{
		l: "ar",
		t: {
			"a few seconds ago": { v: ["منذ عدة ثوانٍ"] },
			"sec. ago": { v: ["ثانية مضت"] },
			"seconds ago": { v: ["ثوانٍ مضت"] }
		}
	},
	{
		l: "ast",
		t: {
			"a few seconds ago": { v: ["hai unos segundos"] },
			"sec. ago": { v: ["hai segs"] },
			"seconds ago": { v: ["hai segundos"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			"a few seconds ago": { v: ["před několika sekundami"] },
			"Invalid date": { v: ["Neplatné datum"] },
			"sec. ago": { v: ["sek. před"] },
			"seconds ago": { v: ["sekund předtím"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"a few seconds ago": { v: ["před několika sekundami"] },
			"sec. ago": { v: ["sek. před"] },
			"seconds ago": { v: ["sekund předtím"] }
		}
	},
	{
		l: "da",
		t: {
			"a few seconds ago": { v: ["for et par sekunder siden"] },
			"Invalid date": { v: ["Ugyldig dato"] },
			"sec. ago": { v: ["for få sek. siden"] },
			"seconds ago": { v: ["for få sekunder siden"] }
		}
	},
	{
		l: "de",
		t: {
			"a few seconds ago": { v: ["vor ein paar Sekunden"] },
			"Invalid date": { v: ["Ungültiges Datum"] },
			"sec. ago": { v: ["Sek. zuvor"] },
			"seconds ago": { v: ["Sekunden zuvor"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"a few seconds ago": { v: ["vor ein paar Sekunden"] },
			"Invalid date": { v: ["Ungültiges Datum"] },
			"sec. ago": { v: ["Sek. zuvor"] },
			"seconds ago": { v: ["Sekunden zuvor"] }
		}
	},
	{
		l: "el",
		t: {
			"a few seconds ago": { v: ["πριν λίγα δευτερόλεπτα"] },
			"sec. ago": { v: ["δευτ. πριν"] },
			"seconds ago": { v: ["δευτερόλεπτα πριν"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"a few seconds ago": { v: ["a few seconds ago"] },
			"Invalid date": { v: ["Invalid date"] },
			"sec. ago": { v: ["sec. ago"] },
			"seconds ago": { v: ["seconds ago"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"a few seconds ago": { v: ["hace unos pocos segundos"] },
			"sec. ago": { v: ["hace segundos"] },
			"seconds ago": { v: ["segundos atrás"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"a few seconds ago": { v: ["hace unos segundos"] },
			"sec. ago": { v: ["seg. atrás"] },
			"seconds ago": { v: ["segundos atrás"] }
		}
	},
	{
		l: "es-EC",
		t: {
			"a few seconds ago": { v: ["hace unos segundos"] },
			"sec. ago": { v: ["hace segundos"] },
			"seconds ago": { v: ["Segundos atrás"] }
		}
	},
	{
		l: "es-MX",
		t: {
			"a few seconds ago": { v: ["hace unos segundos"] },
			"sec. ago": { v: ["seg. atrás"] },
			"seconds ago": { v: ["segundos atrás"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"a few seconds ago": { v: ["mõni sekund tagasi"] },
			"Invalid date": { v: ["Vigane kuupäev"] },
			"sec. ago": { v: ["sek. tagasi"] },
			"seconds ago": { v: ["sekundit tagasi"] }
		}
	},
	{
		l: "eu",
		t: {
			"a few seconds ago": { v: ["duela segundo batzuk"] },
			"sec. ago": { v: ["duela seg."] },
			"seconds ago": { v: ["duela segundo"] }
		}
	},
	{
		l: "fa",
		t: {
			"a few seconds ago": { v: ["چند ثانیه پیش"] },
			"sec. ago": { v: ["چند ثانیه پیش"] },
			"seconds ago": { v: ["چند ثانیه پیش"] }
		}
	},
	{
		l: "fi",
		t: {
			"a few seconds ago": { v: ["muutamia sekunteja sitten"] },
			"sec. ago": { v: ["sek. sitten"] },
			"seconds ago": { v: ["sekunteja sitten"] }
		}
	},
	{
		l: "fr",
		t: {
			"a few seconds ago": { v: ["il y a quelques secondes"] },
			"Invalid date": { v: ["Date non valide"] },
			"sec. ago": { v: ["il y a qq. sec."] },
			"seconds ago": { v: ["il y a quelques sec."] }
		}
	},
	{
		l: "ga",
		t: {
			"a few seconds ago": { v: ["cúpla soicind ó shin"] },
			"Invalid date": { v: ["Dáta neamhbhailí"] },
			"sec. ago": { v: ["soic. ó shin"] },
			"seconds ago": { v: ["soicind ó shin"] }
		}
	},
	{
		l: "gl",
		t: {
			"a few seconds ago": { v: ["hai uns segundos"] },
			"sec. ago": { v: ["segs. atrás"] },
			"seconds ago": { v: ["segundos atrás"] }
		}
	},
	{
		l: "he",
		t: {
			"a few seconds ago": { v: ["לפני מספר שניות"] },
			"sec. ago": { v: ["לפני מספר שניות"] },
			"seconds ago": { v: ["לפני מס׳ שניות"] }
		}
	},
	{
		l: "hr",
		t: {
			"a few seconds ago": { v: ["prije nekoliko sekundi"] },
			"sec. ago": { v: ["prije nek. sek."] },
			"seconds ago": { v: ["prije nek. sek."] }
		}
	},
	{
		l: "hu",
		t: {
			"a few seconds ago": { v: ["néhány másodperce"] },
			"sec. ago": { v: ["másodperce"] },
			"seconds ago": { v: ["másodperce"] }
		}
	},
	{
		l: "id",
		t: {
			"a few seconds ago": { v: ["beberapa detik yang lalu"] },
			"sec. ago": { v: ["dtk. yang lalu"] },
			"seconds ago": { v: ["beberapa detik lalu"] }
		}
	},
	{
		l: "is",
		t: {
			"a few seconds ago": { v: ["fyrir örfáum sekúndum síðan"] },
			"sec. ago": { v: ["sek. síðan"] },
			"seconds ago": { v: ["sekúndum síðan"] }
		}
	},
	{
		l: "it",
		t: {
			"a few seconds ago": { v: ["pochi secondi fa"] },
			"sec. ago": { v: ["sec. fa"] },
			"seconds ago": { v: ["secondi fa"] }
		}
	},
	{
		l: "ja",
		t: {
			"a few seconds ago": { v: ["数秒前"] },
			"Invalid date": { v: ["無効な日付"] },
			"sec. ago": { v: ["秒前"] },
			"seconds ago": { v: ["数秒前"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"a few seconds ago": { v: ["数秒前"] },
			"sec. ago": { v: ["秒前"] },
			"seconds ago": { v: ["数秒前"] }
		}
	},
	{
		l: "ko",
		t: {
			"a few seconds ago": { v: ["방금 전"] },
			"sec. ago": { v: ["몇 초 전"] },
			"seconds ago": { v: ["초 전"] }
		}
	},
	{
		l: "lo",
		t: {
			"a few seconds ago": { v: ["ສອງສາມວິນາທີກ່ອນ"] },
			"sec. ago": { v: ["ວິ. ກ່ອນ"] },
			"seconds ago": { v: ["ວິນາທີກ່ອນ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"a few seconds ago": { v: ["prieš keletą sekundžių"] },
			"sec. ago": { v: ["prieš sek."] },
			"seconds ago": { v: ["prieš sekundes"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"a few seconds ago": { v: ["пред неколку секунди"] },
			"sec. ago": { v: ["секунда"] },
			"seconds ago": { v: ["секунди"] }
		}
	},
	{
		l: "mn",
		t: {
			"a few seconds ago": { v: ["хэдхэн секундын өмнө"] },
			"sec. ago": { v: ["сек. өмнө"] },
			"seconds ago": { v: ["секундын өмнө"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			"a few seconds ago": { v: ["noen få sekunder siden"] },
			"sec. ago": { v: ["sek. siden"] },
			"seconds ago": { v: ["sekunder siden"] }
		}
	},
	{
		l: "nl",
		t: {
			"a few seconds ago": { v: ["enkele seconden geleden"] },
			"sec. ago": { v: ["sec. geleden"] },
			"seconds ago": { v: ["seconden geleden"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"a few seconds ago": { v: ["kilka sekund temu"] },
			"sec. ago": { v: ["sek. temu"] },
			"seconds ago": { v: ["sekund temu"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"a few seconds ago": { v: ["há alguns segundos"] },
			"Invalid date": { v: ["Data inválida"] },
			"sec. ago": { v: ["seg. atrás"] },
			"seconds ago": { v: ["segundos atrás"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"a few seconds ago": { v: ["há alguns segundos"] },
			"sec. ago": { v: ["seg. atrás"] },
			"seconds ago": { v: ["segundos atrás"] }
		}
	},
	{
		l: "ro",
		t: {
			"a few seconds ago": { v: ["acum câteva secunde"] },
			"Invalid date": { v: ["Dată invalidă"] },
			"sec. ago": { v: ["acum"] },
			"seconds ago": { v: ["acum câteva secunde"] }
		}
	},
	{
		l: "ru",
		t: {
			"a few seconds ago": { v: ["несколько секунд назад"] },
			"Invalid date": { v: ["Неверная дата"] },
			"sec. ago": { v: ["сек. назад"] },
			"seconds ago": { v: ["секунд назад"] }
		}
	},
	{
		l: "sk",
		t: {
			"a few seconds ago": { v: ["pred chvíľou"] },
			"sec. ago": { v: ["pred pár sekundami"] },
			"seconds ago": { v: ["pred sekundami"] }
		}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {
			"a few seconds ago": { v: ["пре неколико секунди"] },
			"sec. ago": { v: ["сек. раније"] },
			"seconds ago": { v: ["секунди раније"] }
		}
	},
	{
		l: "sv",
		t: {
			"a few seconds ago": { v: ["för några sekunder sedan"] },
			"Invalid date": { v: ["Ogiltigt datum"] },
			"sec. ago": { v: ["sek. sedan"] },
			"seconds ago": { v: ["sekunder sedan"] }
		}
	},
	{
		l: "tr",
		t: {
			"a few seconds ago": { v: ["birkaç saniye önce"] },
			"Invalid date": { v: ["Tarih geçersiz"] },
			"sec. ago": { v: ["sn. önce"] },
			"seconds ago": { v: ["saniye önce"] }
		}
	},
	{
		l: "uk",
		t: {
			"a few seconds ago": { v: ["декілька секунд тому"] },
			"sec. ago": { v: ["с тому"] },
			"seconds ago": { v: ["с тому"] }
		}
	},
	{
		l: "uz",
		t: {
			"a few seconds ago": { v: ["bir necha soniya oldin"] },
			"sec. ago": { v: ["sek. oldin"] },
			"seconds ago": { v: ["soniyalar oldin"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"a few seconds ago": { v: ["几秒前"] },
			"sec. ago": { v: ["几秒前"] },
			"seconds ago": { v: ["几秒前"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"a few seconds ago": { v: ["幾秒前"] },
			"Invalid date": { v: ["無效日期"] },
			"sec. ago": { v: ["秒前"] },
			"seconds ago": { v: ["秒前"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"a few seconds ago": { v: ["幾秒前"] },
			"sec. ago": { v: ["秒前"] },
			"seconds ago": { v: ["秒前"] }
		}
	}
], iy = [
	{
		l: "ar",
		t: {
			Acapulco: { v: ["بازلائي مطفي"] },
			"Blue Violet": { v: ["بنفسجي مشعشع"] },
			"Boston Blue": { v: ["سماوي مطفي"] },
			Deluge: { v: ["بنفسجي مطفي"] },
			Feldspar: { v: ["وردي صخري"] },
			Gold: { v: ["ذهبي"] },
			Mariner: { v: ["أزرق بحري"] },
			"Nextcloud blue": { v: ["أزرق نكست كلاود"] },
			Olivine: { v: ["زيتي"] },
			Purple: { v: ["بنفسجي"] },
			"Rosy brown": { v: ["بُنِّي زهري"] },
			Whiskey: { v: ["نبيذي"] }
		}
	},
	{
		l: "ast",
		t: {
			Acapulco: { v: ["Acapulcu"] },
			"Blue Violet": { v: ["Viola azulao"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Oru"] },
			Mariner: { v: ["Marineru"] },
			"Nextcloud blue": { v: ["Nextcloud azul"] },
			Olivine: { v: ["Olivina"] },
			Purple: { v: ["Moráu"] },
			"Rosy brown": { v: ["Marrón arrosao"] },
			Whiskey: { v: ["Whiskey"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			Acapulco: { v: ["Akapulko"] },
			Black: { v: ["Černá"] },
			"Blue Violet": { v: ["Modrofialová"] },
			"Boston Blue": { v: ["Bostonská modrá"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Živicová"] },
			Gold: { v: ["Zlatá"] },
			Mariner: { v: ["Námořnická"] },
			"Nextcloud blue": { v: ["Nextcloud modrá"] },
			Olivine: { v: ["Olivínová"] },
			Purple: { v: ["Fialová"] },
			"Rosy brown": { v: ["Růžovohnědá"] },
			Whiskey: { v: ["Whisky"] },
			White: { v: ["Bílá"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			Acapulco: { v: ["Akapulko"] },
			"Blue Violet": { v: ["Modrofialová"] },
			"Boston Blue": { v: ["Bostonská modrá"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Živicová"] },
			Gold: { v: ["Zlatá"] },
			Mariner: { v: ["Námořnická"] },
			"Nextcloud blue": { v: ["Nextcloud modrá"] },
			Olivine: { v: ["Olivínová"] },
			Purple: { v: ["Fialová"] },
			"Rosy brown": { v: ["Růžovohnědá"] },
			Whiskey: { v: ["Whisky"] }
		}
	},
	{
		l: "da",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Sort"] },
			"Blue Violet": { v: ["Blue Violet"] },
			"Boston Blue": { v: ["Boston Blue"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Guld"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Nextcloud-blå"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Lilla"] },
			"Rosy brown": { v: ["Rosy brown"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Hvid"] }
		}
	},
	{
		l: "de",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Schwarz"] },
			"Blue Violet": { v: ["Blau Violett"] },
			"Boston Blue": { v: ["Boston-Blau"] },
			Deluge: { v: ["Sintflut"] },
			Feldspar: { v: ["Feldspat"] },
			Gold: { v: ["Gold"] },
			Mariner: { v: ["Seemann"] },
			"Nextcloud blue": { v: ["Nextcloud Blau"] },
			Olivine: { v: ["Olivin"] },
			Purple: { v: ["Lila"] },
			"Rosy brown": { v: ["Rosiges Braun"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Weiß"] }
		}
	},
	{
		l: "de-DE",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Schwarz"] },
			"Blue Violet": { v: ["Blau Violett"] },
			"Boston Blue": { v: ["Boston-Blau"] },
			Deluge: { v: ["Sintflut"] },
			Feldspar: { v: ["Feldspat"] },
			Gold: { v: ["Gold"] },
			Mariner: { v: ["Seemann"] },
			"Nextcloud blue": { v: ["Nextcloud Blau"] },
			Olivine: { v: ["Olivin"] },
			Purple: { v: ["Lila"] },
			"Rosy brown": { v: ["Rosiges Braun"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Weiß"] }
		}
	},
	{
		l: "el",
		t: {
			Acapulco: { v: ["Ακαπούλκο"] },
			Black: { v: ["Μαύρο"] },
			"Blue Violet": { v: ["Μπλε Βιολέτ"] },
			"Boston Blue": { v: ["Μπλε Βοστώνης"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Χρυσό"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Μπλε Nextcloud"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Μωβ"] },
			"Rosy brown": { v: ["Ροζ καφέ"] },
			Whiskey: { v: ["Ουίσκι"] },
			White: { v: ["Λευκό"] }
		}
	},
	{
		l: "en-GB",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Black"] },
			"Blue Violet": { v: ["Blue Violet"] },
			"Boston Blue": { v: ["Boston Blue"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Gold"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Nextcloud blue"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Purple"] },
			"Rosy brown": { v: ["Rosy brown"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["White"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Violeta Azul"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Diluvio"] },
			Feldspar: { v: ["Feldespato"] },
			Gold: { v: ["Oro"] },
			Mariner: { v: ["Marinero"] },
			"Nextcloud blue": { v: ["Azul Nextcloud"] },
			Olivine: { v: ["Olivino"] },
			Purple: { v: ["Púrpura"] },
			"Rosy brown": { v: ["Marrón rosáceo"] },
			Whiskey: { v: ["Whiskey"] }
		}
	},
	{
		l: "es-AR",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Violeta Azul"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Diluvio"] },
			Feldspar: { v: ["Feldespato"] },
			Gold: { v: ["Oro"] },
			Mariner: { v: ["Marinero"] },
			"Nextcloud blue": { v: ["Azul Nextcloud"] },
			Olivine: { v: ["Olivino"] },
			Purple: { v: ["Púrpura"] },
			"Rosy brown": { v: ["Marrón rosáceo"] },
			Whiskey: { v: ["Whiskey"] }
		}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Violeta Azul"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Diluvio"] },
			Feldspar: { v: ["Feldespato"] },
			Gold: { v: ["Oro"] },
			Mariner: { v: ["Marinero"] },
			"Nextcloud blue": { v: ["Azul Nextcloud"] },
			Olivine: { v: ["Olivino"] },
			Purple: { v: ["Púrpura"] },
			"Rosy brown": { v: ["Marrón rosáceo"] },
			Whiskey: { v: ["Whiskey"] }
		}
	},
	{
		l: "et-EE",
		t: {
			Acapulco: { v: ["Acapulco meresinine"] },
			Black: { v: ["Must"] },
			"Blue Violet": { v: ["Sinakasvioletne"] },
			"Boston Blue": { v: ["Bostoni rohekassinine"] },
			Deluge: { v: ["Tulvavee lilla"] },
			Feldspar: { v: ["Põlevkivipruun"] },
			Gold: { v: ["Kuldne"] },
			Mariner: { v: ["Meresinine"] },
			"Nextcloud blue": { v: ["Nextcloudi sinine"] },
			Olivine: { v: ["Oliiviroheline"] },
			Purple: { v: ["Purpurpunane"] },
			"Rosy brown": { v: ["Roosikarva pruun"] },
			Whiskey: { v: ["Viskikarva kollakaspruun"] },
			White: { v: ["Valge"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {
			Acapulco: { v: ["آکاپولکو"] },
			"Blue Violet": { v: ["بنفش آبی"] },
			"Boston Blue": { v: ["آبی بوستونی"] },
			Deluge: { v: ["سیل"] },
			Feldspar: { v: ["فلدسپات"] },
			Gold: { v: ["طلا"] },
			Mariner: { v: ["مارینر"] },
			"Nextcloud blue": { v: ["نکس کلود آبی"] },
			Olivine: { v: ["الیوین"] },
			Purple: { v: ["بنفش"] },
			"Rosy brown": { v: ["قهوه‌ای رز"] },
			Whiskey: { v: ["ویسکی"] }
		}
	},
	{
		l: "fi",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Sinivioletti"] },
			"Boston Blue": { v: ["Bostoninsininen"] },
			Deluge: { v: ["Tulva"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Kulta"] },
			Mariner: { v: ["Merenkulkija"] },
			"Nextcloud blue": { v: ["Nextcloudin sininen"] },
			Olivine: { v: ["Oliviini"] },
			Purple: { v: ["Purppura"] },
			"Rosy brown": { v: ["Ruusunruskea"] },
			Whiskey: { v: ["Viski"] }
		}
	},
	{
		l: "fr",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Noir"] },
			"Blue Violet": { v: ["Bleu violet"] },
			"Boston Blue": { v: ["Bleu de Boston"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Doré"] },
			Mariner: { v: ["Marin"] },
			"Nextcloud blue": { v: ["Bleu Nextcloud"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Violet"] },
			"Rosy brown": { v: ["Brun rosé"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Blanc"] }
		}
	},
	{
		l: "ga",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Dubh"] },
			"Blue Violet": { v: ["Gorm Violet"] },
			"Boston Blue": { v: ["Bostún Gorm"] },
			Deluge: { v: ["Díle"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Óir"] },
			Mariner: { v: ["Mairnéalach"] },
			"Nextcloud blue": { v: ["Nextcloud gorm"] },
			Olivine: { v: ["Olaivín"] },
			Purple: { v: ["Corcra"] },
			"Rosy brown": { v: ["Rosach donn"] },
			Whiskey: { v: ["Fuisce"] },
			White: { v: ["Bán"] }
		}
	},
	{
		l: "gl",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Negro"] },
			"Blue Violet": { v: ["Azul violeta"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Dioivo"] },
			Feldspar: { v: ["Feldespato"] },
			Gold: { v: ["Ouro"] },
			Mariner: { v: ["Marino"] },
			"Nextcloud blue": { v: ["Azul Nextcloud"] },
			Olivine: { v: ["Olivina"] },
			Purple: { v: ["Púrpura"] },
			"Rosy brown": { v: ["Pardo rosado"] },
			Whiskey: { v: ["Whisky"] },
			White: { v: ["Branco"] }
		}
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Crna"] },
			"Blue Violet": { v: ["Plavoljubičasta"] },
			"Boston Blue": { v: ["Bostonsko plava"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Zlatna"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Nextcloud plava"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Ljubičasta"] },
			"Rosy brown": { v: ["Ružičastosmeđa"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Bijela"] }
		}
	},
	{
		l: "hu",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Fekete"] },
			"Blue Violet": { v: ["Kék ibolya"] },
			"Boston Blue": { v: ["Boston kék"] },
			Deluge: { v: ["Özönvíz"] },
			Feldspar: { v: ["Földpát"] },
			Gold: { v: ["Arany"] },
			Mariner: { v: ["Tengerész"] },
			"Nextcloud blue": { v: ["Nextcloud kék"] },
			Olivine: { v: ["Olivin"] },
			Purple: { v: ["Lila"] },
			"Rosy brown": { v: ["Rózsás barna"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Fehér"] }
		}
	},
	{
		l: "id",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Hitam"] },
			"Blue Violet": { v: ["Ungu kebiruan"] },
			"Boston Blue": { v: ["Biru Boston"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Emas"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Biru Nextcloud"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Ungu"] },
			"Rosy brown": { v: ["Cokelat kemerahan"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Putih"] }
		}
	},
	{
		l: "is",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Bláklukka"] },
			"Boston Blue": { v: ["Bostonblátt"] },
			Deluge: { v: ["Fjólublátt"] },
			Feldspar: { v: ["Feldspat"] },
			Gold: { v: ["Gull"] },
			Mariner: { v: ["Sjóarablátt"] },
			"Nextcloud blue": { v: ["Nextcloud blátt"] },
			Olivine: { v: ["Ólivín"] },
			Purple: { v: ["Purpurablátt"] },
			"Rosy brown": { v: ["Rósabrúnt"] },
			Whiskey: { v: ["Viský"] }
		}
	},
	{
		l: "it",
		t: {
			Gold: { v: ["Oro"] },
			"Nextcloud blue": { v: ["Nextcloud blue"] },
			Purple: { v: ["Viola"] }
		}
	},
	{
		l: "ja",
		t: {
			Acapulco: { v: ["アカプルコ"] },
			Black: { v: ["黒"] },
			"Blue Violet": { v: ["ブルーバイオレット"] },
			"Boston Blue": { v: ["ボストンブルー"] },
			Deluge: { v: ["豪雨"] },
			Feldspar: { v: ["長石"] },
			Gold: { v: ["黄金"] },
			Mariner: { v: ["船乗り"] },
			"Nextcloud blue": { v: ["ネクストクラウド・ブルー"] },
			Olivine: { v: ["カンラン石"] },
			Purple: { v: ["紫色"] },
			"Rosy brown": { v: ["バラ色"] },
			Whiskey: { v: ["ウイスキー"] },
			White: { v: ["白"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			Acapulco: { v: ["アカプルコ"] },
			"Blue Violet": { v: ["ブルーバイオレット"] },
			"Boston Blue": { v: ["ボストンブルー"] },
			Deluge: { v: ["豪雨"] },
			Feldspar: { v: ["長石"] },
			Gold: { v: ["黄金"] },
			Mariner: { v: ["船乗り"] },
			"Nextcloud blue": { v: ["ネクストクラウド・ブルー"] },
			Olivine: { v: ["カンラン石"] },
			Purple: { v: ["紫色"] },
			"Rosy brown": { v: ["バラ色"] },
			Whiskey: { v: ["ウイスキー"] }
		}
	},
	{
		l: "ko",
		t: {
			Acapulco: { v: ["아카풀코"] },
			Black: { v: ["검정"] },
			"Blue Violet": { v: ["푸른 보라"] },
			"Boston Blue": { v: ["보스턴 블루"] },
			Deluge: { v: ["폭우"] },
			Feldspar: { v: ["장석"] },
			Gold: { v: ["금"] },
			Mariner: { v: ["뱃사람"] },
			"Nextcloud blue": { v: ["Nextcloud 파랑"] },
			Olivine: { v: ["감람석"] },
			Purple: { v: ["보라"] },
			"Rosy brown": { v: ["로지 브라운"] },
			Whiskey: { v: ["위스키"] },
			White: { v: ["하양"] }
		}
	},
	{
		l: "lo",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["ສີດຳ"] },
			"Blue Violet": { v: ["Blue Violet"] },
			"Boston Blue": { v: ["Boston Blue"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["ສີຄຳ"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["ສີຟ້າ Nextcloud"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["ສີມ່ວງ"] },
			"Rosy brown": { v: ["Rosy brown"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["ສີຂາວ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			Acapulco: { v: ["\"Acapulco\""] },
			Black: { v: ["Juoda"] },
			"Blue Violet": { v: ["Mėlyna-violetinė"] },
			"Boston Blue": { v: ["\"Boston Blue\""] },
			Deluge: { v: ["\"Deluge\""] },
			Feldspar: { v: ["\"Feldspar\""] },
			Gold: { v: ["Auksas"] },
			Mariner: { v: ["\"Mariner\""] },
			"Nextcloud blue": { v: ["\"Nextcloud\" mėlyna"] },
			Olivine: { v: ["\"Olivine\""] },
			Purple: { v: ["Violetinė"] },
			"Rosy brown": { v: ["Rožiniai rudas"] },
			Whiskey: { v: ["\"Whiskey\""] },
			White: { v: ["Balta"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			Acapulco: { v: ["Акапулко"] },
			Black: { v: ["Црно"] },
			"Blue Violet": { v: ["Сино Виолетова"] },
			"Boston Blue": { v: ["Бостон Сина"] },
			Deluge: { v: ["Делуџ"] },
			Feldspar: { v: ["Фелдспар"] },
			Gold: { v: ["Златна"] },
			Mariner: { v: ["Маринер"] },
			"Nextcloud blue": { v: ["Nextcloud сина"] },
			Olivine: { v: ["Оливин"] },
			Purple: { v: ["Виолетова"] },
			"Rosy brown": { v: ["Розево-кафеава"] },
			Whiskey: { v: ["Виски"] },
			White: { v: ["Бела"] }
		}
	},
	{
		l: "mn",
		t: {
			Acapulco: { v: ["Акапулько"] },
			Black: { v: ["Хар"] },
			"Blue Violet": { v: ["Цэнхэр ягаан"] },
			"Boston Blue": { v: ["Бостон цэнхэр"] },
			Deluge: { v: ["Делюж"] },
			Feldspar: { v: ["Фельдспар"] },
			Gold: { v: ["Алтан"] },
			Mariner: { v: ["Маринер"] },
			"Nextcloud blue": { v: ["Nextcloud цэнхэр"] },
			Olivine: { v: ["Оливин"] },
			Purple: { v: ["Нил ягаан"] },
			"Rosy brown": { v: ["Ягаан бор"] },
			Whiskey: { v: ["Виски"] },
			White: { v: ["Цагаан"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Blå fiolett"] },
			"Boston Blue": { v: ["Boston blå"] },
			Deluge: { v: ["Syndflod"] },
			Feldspar: { v: ["Feltspat"] },
			Gold: { v: ["Gull"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Nextcloud-blå"] },
			Olivine: { v: ["Olivin"] },
			Purple: { v: ["Lilla"] },
			"Rosy brown": { v: ["Rosenrød brun"] },
			Whiskey: { v: ["Whiskey"] }
		}
	},
	{
		l: "nl",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Zwart"] },
			"Blue Violet": { v: ["Blauw Paars"] },
			"Boston Blue": { v: ["Boston Blauw"] },
			Deluge: { v: ["Overlopen"] },
			Feldspar: { v: ["Veldspaat"] },
			Gold: { v: ["Goud"] },
			Mariner: { v: ["Marineblauw"] },
			"Nextcloud blue": { v: ["Nextcloud blauw"] },
			Olivine: { v: ["Olivijn"] },
			Purple: { v: ["Paars"] },
			"Rosy brown": { v: ["Rozig bruin"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Wit"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Niebieski fiolet"] },
			"Boston Blue": { v: ["Błękit Bostonu"] },
			Deluge: { v: ["Potop"] },
			Feldspar: { v: ["Skaleń"] },
			Gold: { v: ["Złote"] },
			Mariner: { v: ["Marynarz"] },
			"Nextcloud blue": { v: ["Niebieskie Nextcloud"] },
			Olivine: { v: ["Oliwin"] },
			Purple: { v: ["Fioletowy"] },
			"Rosy brown": { v: ["Różowy brąz"] },
			Whiskey: { v: ["Whisky"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Preto"] },
			"Blue Violet": { v: ["Violeta Azul"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspato"] },
			Gold: { v: ["Ouro"] },
			Mariner: { v: ["Marinheiro"] },
			"Nextcloud blue": { v: ["Azul Nextcloud"] },
			Olivine: { v: ["Olivina"] },
			Purple: { v: ["Roxo"] },
			"Rosy brown": { v: ["Castanho rosado"] },
			Whiskey: { v: ["Uísque"] },
			White: { v: ["Branco"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Azul violeta"] },
			"Boston Blue": { v: ["Azul Boston"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Ouro"] },
			Mariner: { v: ["Mariner"] },
			"Nextcloud blue": { v: ["Nextcloud azul"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Púrpura"] },
			"Rosy brown": { v: ["Castanho rosado"] },
			Whiskey: { v: ["Whiskey"] }
		}
	},
	{
		l: "ro",
		t: {
			Acapulco: { v: ["Verde salvie"] },
			Black: { v: ["Negru"] },
			"Blue Violet": { v: ["Albastru-violet"] },
			"Boston Blue": { v: ["Albastru-verzui"] },
			Deluge: { v: ["Violet"] },
			Feldspar: { v: ["Somon"] },
			Gold: { v: ["Auriu"] },
			Mariner: { v: ["Albastru marin"] },
			"Nextcloud blue": { v: ["Albastru Nextcloud"] },
			Olivine: { v: ["Verde oliv"] },
			Purple: { v: ["Purpuriu"] },
			"Rosy brown": { v: ["Roz-maroniu"] },
			Whiskey: { v: ["Chihlimbar"] },
			White: { v: ["Alb"] }
		}
	},
	{
		l: "ru",
		t: {
			Acapulco: { v: ["Акапулько"] },
			Black: { v: ["Чёрный"] },
			"Blue Violet": { v: ["Сине-фиолетовый"] },
			"Boston Blue": { v: ["Бостонский синий"] },
			Deluge: { v: ["Перламутрово-фиолетовый"] },
			Feldspar: { v: ["Античная латунь"] },
			Gold: { v: ["Золотой"] },
			Mariner: { v: ["Морской"] },
			"Nextcloud blue": { v: ["Голубой Nextcloud"] },
			Olivine: { v: ["Оливковый"] },
			Purple: { v: ["Фиолетовый"] },
			"Rosy brown": { v: ["Розово-коричневый"] },
			Whiskey: { v: ["Виски"] },
			White: { v: ["Белый"] }
		}
	},
	{
		l: "sk",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["Modro fialová"] },
			"Boston Blue": { v: ["Bostonská modrá"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["Živec"] },
			Gold: { v: ["Zlatá"] },
			Mariner: { v: ["Námorník"] },
			"Nextcloud blue": { v: ["Nextcloud modrá"] },
			Olivine: { v: ["Olivová"] },
			Purple: { v: ["Fialová"] },
			"Rosy brown": { v: ["Ružovo hnedá"] },
			Whiskey: { v: ["Whisky"] }
		}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {
			Acapulco: { v: ["Акапулко"] },
			Black: { v: ["Црно"] },
			"Blue Violet": { v: ["Плаво љубичаста"] },
			"Boston Blue": { v: ["Бостон плава"] },
			Deluge: { v: ["Поплава"] },
			Feldspar: { v: ["Фелдспар"] },
			Gold: { v: ["Злато"] },
			Mariner: { v: ["Морнар"] },
			"Nextcloud blue": { v: ["Nextcloud плава"] },
			Olivine: { v: ["Маслинаста"] },
			Purple: { v: ["Пурпурна"] },
			"Rosy brown": { v: ["Роси браон"] },
			Whiskey: { v: ["Виски"] },
			White: { v: ["Бело"] }
		}
	},
	{
		l: "sv",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["Svart"] },
			"Blue Violet": { v: ["Blåviolett"] },
			"Boston Blue": { v: ["Bostonblå"] },
			Deluge: { v: ["Djuplila"] },
			Feldspar: { v: ["Fältspat"] },
			Gold: { v: ["Guld"] },
			Mariner: { v: ["Marinblå"] },
			"Nextcloud blue": { v: ["Nextcloud-blå"] },
			Olivine: { v: ["Olivin"] },
			Purple: { v: ["Lila"] },
			"Rosy brown": { v: ["Rosabrun"] },
			Whiskey: { v: ["Whisky"] },
			White: { v: ["Vit"] }
		}
	},
	{
		l: "tr",
		t: {
			Acapulco: { v: ["Akapulko"] },
			Black: { v: ["Siyah"] },
			"Blue Violet": { v: ["Mavi mor"] },
			"Boston Blue": { v: ["Boston mavisi"] },
			Deluge: { v: ["Sel"] },
			Feldspar: { v: ["Feldispat"] },
			Gold: { v: ["Altın"] },
			Mariner: { v: ["Denizci"] },
			"Nextcloud blue": { v: ["Nextcloud mavi"] },
			Olivine: { v: ["Zeytinlik"] },
			Purple: { v: ["Mor"] },
			"Rosy brown": { v: ["Kırmızımsı kahverengi"] },
			Whiskey: { v: ["Viski"] },
			White: { v: ["Beyaz"] }
		}
	},
	{
		l: "uk",
		t: {
			Acapulco: { v: ["Акапулько"] },
			"Blue Violet": { v: ["Блакитна фіалка"] },
			"Boston Blue": { v: ["Бостонський синій"] },
			Deluge: { v: ["Злива"] },
			Feldspar: { v: ["Польові шпати"] },
			Gold: { v: ["Золотий"] },
			Mariner: { v: ["Морський"] },
			"Nextcloud blue": { v: ["Блакитний Nextcloud"] },
			Olivine: { v: ["Олива"] },
			Purple: { v: ["Фіолетовий"] },
			"Rosy brown": { v: ["Темно-рожевий"] },
			Whiskey: { v: ["Кола"] }
		}
	},
	{
		l: "uz",
		t: {
			Acapulco: { v: ["Akapulko"] },
			Black: { v: ["Qora"] },
			"Blue Violet": { v: ["Moviy binafsha"] },
			"Boston Blue": { v: ["Boston ko'k"] },
			Deluge: { v: ["To'fon"] },
			Feldspar: { v: ["Feldspar"] },
			Gold: { v: ["Oltin"] },
			Mariner: { v: ["Dengizchi"] },
			"Nextcloud blue": { v: ["Ko'k Nextcloud\xA0"] },
			Olivine: { v: ["Olivine"] },
			Purple: { v: ["Binafsha"] },
			"Rosy brown": { v: ["Qizil jigarrang"] },
			Whiskey: { v: ["Whiskey"] },
			White: { v: ["Oq"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			Acapulco: { v: ["Acapulco"] },
			"Blue Violet": { v: ["瓦罗兰特蓝"] },
			"Boston Blue": { v: ["波士顿蓝"] },
			Deluge: { v: ["洪水色"] },
			Feldspar: { v: ["长石"] },
			Gold: { v: ["金色"] },
			Mariner: { v: ["水手"] },
			"Nextcloud blue": { v: ["Nextcloud 蓝"] },
			Olivine: { v: ["橄榄石色"] },
			Purple: { v: ["紫色"] },
			"Rosy brown": { v: ["玫瑰棕色"] },
			Whiskey: { v: ["威士忌"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			Acapulco: { v: ["阿卡普爾科"] },
			Black: { v: ["黑色"] },
			"Blue Violet": { v: ["藍紫色"] },
			"Boston Blue": { v: ["波士頓藍"] },
			Deluge: { v: ["大洪水"] },
			Feldspar: { v: ["長石"] },
			Gold: { v: ["Gold"] },
			Mariner: { v: ["海軍藍"] },
			"Nextcloud blue": { v: ["Nextcloud 藍色"] },
			Olivine: { v: ["橄欖石色"] },
			Purple: { v: ["紫色"] },
			"Rosy brown": { v: ["玫瑰棕色"] },
			Whiskey: { v: ["威士忌"] },
			White: { v: ["白色"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			Acapulco: { v: ["Acapulco"] },
			Black: { v: ["黑色"] },
			"Blue Violet": { v: ["藍紫色"] },
			"Boston Blue": { v: ["波士頓藍"] },
			Deluge: { v: ["Deluge"] },
			Feldspar: { v: ["長石"] },
			Gold: { v: ["金色"] },
			Mariner: { v: ["海軍藍"] },
			"Nextcloud blue": { v: ["Nextcloud 藍色"] },
			Olivine: { v: ["橄欖石色"] },
			Purple: { v: ["紫色"] },
			"Rosy brown": { v: ["玫瑰棕色"] },
			Whiskey: { v: ["威士忌"] },
			White: { v: ["白色"] }
		}
	}
], ay = [
	{
		l: "ar",
		t: { Actions: { v: ["إجراءات"] } }
	},
	{
		l: "ast",
		t: { Actions: { v: ["Aiciones"] } }
	},
	{
		l: "br",
		t: { Actions: { v: ["Oberioù"] } }
	},
	{
		l: "ca",
		t: { Actions: { v: ["Accions"] } }
	},
	{
		l: "cs",
		t: { Actions: { v: ["Akce"] } }
	},
	{
		l: "cs-CZ",
		t: { Actions: { v: ["Akce"] } }
	},
	{
		l: "da",
		t: { Actions: { v: ["Handlinger"] } }
	},
	{
		l: "de",
		t: { Actions: { v: ["Aktionen"] } }
	},
	{
		l: "de-DE",
		t: { Actions: { v: ["Aktionen"] } }
	},
	{
		l: "el",
		t: { Actions: { v: ["Ενέργειες"] } }
	},
	{
		l: "en-GB",
		t: { Actions: { v: ["Actions"] } }
	},
	{
		l: "eo",
		t: { Actions: { v: ["Agoj"] } }
	},
	{
		l: "es",
		t: { Actions: { v: ["Acciones"] } }
	},
	{
		l: "es-AR",
		t: { Actions: { v: ["Acciones"] } }
	},
	{
		l: "es-EC",
		t: { Actions: { v: ["Acciones"] } }
	},
	{
		l: "es-MX",
		t: { Actions: { v: ["Acciones"] } }
	},
	{
		l: "et-EE",
		t: { Actions: { v: ["Tegevus"] } }
	},
	{
		l: "eu",
		t: { Actions: { v: ["Ekintzak"] } }
	},
	{
		l: "fa",
		t: { Actions: { v: ["کنش‌ها"] } }
	},
	{
		l: "fi",
		t: { Actions: { v: ["Toiminnot"] } }
	},
	{
		l: "fr",
		t: { Actions: { v: ["Actions"] } }
	},
	{
		l: "ga",
		t: { Actions: { v: ["Gníomhartha"] } }
	},
	{
		l: "gl",
		t: { Actions: { v: ["Accións"] } }
	},
	{
		l: "he",
		t: { Actions: { v: ["פעולות"] } }
	},
	{
		l: "hr",
		t: { Actions: { v: ["Radnje"] } }
	},
	{
		l: "hu",
		t: { Actions: { v: ["Műveletek"] } }
	},
	{
		l: "id",
		t: { Actions: { v: ["Tindakan"] } }
	},
	{
		l: "is",
		t: { Actions: { v: ["Aðgerðir"] } }
	},
	{
		l: "it",
		t: { Actions: { v: ["Azioni"] } }
	},
	{
		l: "ja",
		t: { Actions: { v: ["操作"] } }
	},
	{
		l: "ja-JP",
		t: { Actions: { v: ["操作"] } }
	},
	{
		l: "ko",
		t: { Actions: { v: ["동작"] } }
	},
	{
		l: "lo",
		t: { Actions: { v: ["ການກະທຳ"] } }
	},
	{
		l: "lt-LT",
		t: { Actions: { v: ["Veiksmai"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { Actions: { v: ["Акции"] } }
	},
	{
		l: "mn",
		t: { Actions: { v: ["Үйлдлүүд"] } }
	},
	{
		l: "my",
		t: { Actions: { v: ["လုပ်ဆောင်ချက်များ"] } }
	},
	{
		l: "nb",
		t: { Actions: { v: ["Handlinger"] } }
	},
	{
		l: "nl",
		t: { Actions: { v: ["Acties"] } }
	},
	{
		l: "oc",
		t: { Actions: { v: ["Accions"] } }
	},
	{
		l: "pl",
		t: { Actions: { v: ["Działania"] } }
	},
	{
		l: "pt-BR",
		t: { Actions: { v: ["Ações"] } }
	},
	{
		l: "pt-PT",
		t: { Actions: { v: ["Ações"] } }
	},
	{
		l: "ro",
		t: { Actions: { v: ["Acțiuni"] } }
	},
	{
		l: "ru",
		t: { Actions: { v: ["Действия"] } }
	},
	{
		l: "sk",
		t: { Actions: { v: ["Akcie"] } }
	},
	{
		l: "sl",
		t: { Actions: { v: ["Dejanja"] } }
	},
	{
		l: "sr",
		t: { Actions: { v: ["Радње"] } }
	},
	{
		l: "sv",
		t: { Actions: { v: ["Åtgärder"] } }
	},
	{
		l: "tr",
		t: { Actions: { v: ["İşlemler"] } }
	},
	{
		l: "uk",
		t: { Actions: { v: ["Дії"] } }
	},
	{
		l: "uz",
		t: { Actions: { v: ["Harakatlar"] } }
	},
	{
		l: "zh-CN",
		t: { Actions: { v: ["行为"] } }
	},
	{
		l: "zh-HK",
		t: { Actions: { v: ["動作"] } }
	},
	{
		l: "zh-TW",
		t: { Actions: { v: ["動作"] } }
	}
], oy = [
	{
		l: "ar",
		t: {
			"Avatar of {displayName}": { v: ["صورة الملف الشخصي الرمزية لــ {displayName}  "] },
			"Avatar of {displayName}, {status}": { v: ["صورة الملف الشخصي الرمزية لــ {displayName}، {status}"] }
		}
	},
	{
		l: "ast",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de: {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de: {displayName}, {status}"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "cs",
		t: {
			"Avatar of {displayName}": { v: ["Zástupný obrázek uživatele {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Zástupný obrázek uživatele {displayName}, {status}"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Avatar of {displayName}": { v: ["Zástupný obrázek uživatele {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Zástupný obrázek uživatele {displayName}, {status}"] }
		}
	},
	{
		l: "da",
		t: {
			"Avatar of {displayName}": { v: ["Avatar af {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar af {displayName}, {status}"] }
		}
	},
	{
		l: "de",
		t: {
			"Avatar of {displayName}": { v: ["Avatar von {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar von {displayName}, {status}"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Avatar of {displayName}": { v: ["Avatar von {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar von {displayName}, {status}"] }
		}
	},
	{
		l: "el",
		t: {
			"Avatar of {displayName}": { v: ["Άβαταρ του {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Άβαταρ του {displayName}, {status}"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Avatar of {displayName}": { v: ["Avatar of {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar of {displayName}, {status}"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "es-EC",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "es-MX",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Avatar of {displayName}": { v: ["Tunnuspilt: {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Tunnuspilt: {displayName}, {status}"] }
		}
	},
	{
		l: "eu",
		t: {
			"Avatar of {displayName}": { v: ["{displayName}-(e)n irudia"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName} -(e)n irudia, {status}"] }
		}
	},
	{
		l: "fa",
		t: {
			"Avatar of {displayName}": { v: ["آواتار {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["آواتار {displayName} ، {status}"] }
		}
	},
	{
		l: "fi",
		t: {
			"Avatar of {displayName}": { v: ["{displayName}n avatar"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}n avatar, {status}"] }
		}
	},
	{
		l: "fr",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "ga",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "gl",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "he",
		t: {
			"Avatar of {displayName}": { v: ["תמונה ייצוגית של {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["תמונה ייצוגית של {displayName}, {status}"] }
		}
	},
	{
		l: "hr",
		t: {
			"Avatar of {displayName}": { v: ["Avatar od {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar od {displayName}, {status}"] }
		}
	},
	{
		l: "hu",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} profilképe"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName} profilképe, {status}"] }
		}
	},
	{
		l: "id",
		t: {
			"Avatar of {displayName}": { v: ["Avatar {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar {displayName}, {status}"] }
		}
	},
	{
		l: "is",
		t: {
			"Avatar of {displayName}": { v: ["Auðkennismynd fyrir {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Auðkennismynd fyrir {displayName}, {status}"] }
		}
	},
	{
		l: "it",
		t: {
			"Avatar of {displayName}": { v: ["Avatar di {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar di {displayName}, {status}"] }
		}
	},
	{
		l: "ja",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} のアバター"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}, {status} のアバター"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} のアバター"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}, {status} のアバター"] }
		}
	},
	{
		l: "ko",
		t: {
			"Avatar of {displayName}": { v: ["{displayName}님의 아바타"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}, {status}님의 아바타"] }
		}
	},
	{
		l: "lo",
		t: {
			"Avatar of {displayName}": { v: ["ຮູບແທນຕົວຂອງ {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["ຮູບແທນຕົວຂອງ {displayName}, {status}"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} avataras"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName} avataras, {status}"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Avatar of {displayName}": { v: ["Аватар на {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Аватар на {displayName}, {status}"] }
		}
	},
	{
		l: "mn",
		t: {
			"Avatar of {displayName}": { v: ["{displayName}-ийн аватар"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}-ийн аватар, {status}"] }
		}
	},
	{
		l: "my",
		t: { "Avatar of {displayName}": { v: ["{displayName} ၏ ကိုယ်ပွား"] } }
	},
	{
		l: "nb",
		t: {
			"Avatar of {displayName}": { v: ["Avataren til {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}'s avatar, {status}"] }
		}
	},
	{
		l: "nl",
		t: {
			"Avatar of {displayName}": { v: ["Avatar van {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar van {displayName}, {status}"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"Avatar of {displayName}": { v: ["Awatar {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Awatar {displayName}, {status}"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Avatar of {displayName}": { v: ["Avatar de {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar de {displayName}, {status}"] }
		}
	},
	{
		l: "ro",
		t: {
			"Avatar of {displayName}": { v: ["Avatarul lui {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatarul lui {displayName}, {status}"] }
		}
	},
	{
		l: "ru",
		t: {
			"Avatar of {displayName}": { v: ["Аватар {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Аватар {displayName}, {status}"] }
		}
	},
	{
		l: "sk",
		t: {
			"Avatar of {displayName}": { v: ["Avatar {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar {displayName}, {status}"] }
		}
	},
	{
		l: "sl",
		t: {
			"Avatar of {displayName}": { v: ["Podoba {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Prikazna slika {displayName}, {status}"] }
		}
	},
	{
		l: "sr",
		t: {
			"Avatar of {displayName}": { v: ["Аватар за {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar za {displayName}, {status}"] }
		}
	},
	{
		l: "sv",
		t: {
			"Avatar of {displayName}": { v: ["Avatar för {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Avatar för {displayName}, {status}"] }
		}
	},
	{
		l: "tr",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} avatarı"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}, {status} avatarı"] }
		}
	},
	{
		l: "uk",
		t: {
			"Avatar of {displayName}": { v: ["Аватар {displayName}"] },
			"Avatar of {displayName}, {status}": { v: ["Аватар {displayName}, {status}"] }
		}
	},
	{
		l: "uz",
		t: {
			"Avatar of {displayName}": { v: [" {displayName}Avatari"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}, {status} Avatari"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Avatar of {displayName}": { v: ["{displayName}的头像"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}的头像，{status}"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} 的頭像"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName} 的頭像，{status}"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Avatar of {displayName}": { v: ["{displayName} 的大頭照"] },
			"Avatar of {displayName}, {status}": { v: ["{displayName}, {status} 的大頭照"] }
		}
	}
], sy = [
	{
		l: "ar",
		t: {
			away: { v: ["غير موجود"] },
			busy: { v: ["مشغول"] },
			"do not disturb": { v: ["يُرجى عدم الإزعاج"] },
			invisible: { v: ["غير مرئي"] },
			offline: { v: ["غير متصل"] },
			online: { v: ["متصل"] }
		}
	},
	{
		l: "ast",
		t: {
			away: { v: ["ausente"] },
			busy: { v: ["ocupáu"] },
			"do not disturb": { v: ["nun molestar"] },
			invisible: { v: ["invisible"] },
			offline: { v: ["desconectáu"] },
			online: { v: ["en llinia"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			away: { v: ["pryč"] },
			busy: { v: ["zaneprádněn/a"] },
			"do not disturb": { v: ["nerušit"] },
			invisible: { v: ["neviditelné"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			away: { v: ["pryč"] },
			busy: { v: ["zaneprádněn(a)"] },
			"do not disturb": { v: ["nerušit"] },
			invisible: { v: ["neviditelné"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "da",
		t: {
			away: { v: ["ikke til stede"] },
			busy: { v: ["optaget"] },
			"do not disturb": { v: ["forstyr ikke"] },
			invisible: { v: ["usynlig"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "de",
		t: {
			away: { v: ["Abwesend"] },
			busy: { v: ["Beschäftigt"] },
			"do not disturb": { v: ["Bitte nicht stören"] },
			invisible: { v: ["Unsichtbar"] },
			offline: { v: ["Offline"] },
			online: { v: ["Online"] }
		}
	},
	{
		l: "de-DE",
		t: {
			away: { v: ["Abwesend"] },
			busy: { v: ["Beschäftigt"] },
			"do not disturb": { v: ["Bitte nicht stören"] },
			invisible: { v: ["Unsichtbar"] },
			offline: { v: ["Offline"] },
			online: { v: ["Online"] }
		}
	},
	{
		l: "el",
		t: {
			away: { v: ["μακριά"] },
			busy: { v: ["απασχολημένος"] },
			"do not disturb": { v: ["μην ενοχλείτε"] },
			invisible: { v: ["αόρατο"] },
			offline: { v: ["εκτός σύνδεσης"] },
			online: { v: ["συνδεδεμένος"] }
		}
	},
	{
		l: "en-GB",
		t: {
			away: { v: ["away"] },
			busy: { v: ["busy"] },
			"do not disturb": { v: ["do not disturb"] },
			invisible: { v: ["invisible"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			away: { v: ["ausente"] },
			busy: { v: ["ocupado"] },
			"do not disturb": { v: ["no molestar"] },
			invisible: { v: ["invisible"] },
			offline: { v: ["fuera de línea"] },
			online: { v: ["en línea"] }
		}
	},
	{
		l: "es-AR",
		t: {
			away: { v: ["ausente"] },
			busy: { v: ["ocupado"] },
			"do not disturb": { v: ["no molestar"] },
			invisible: { v: ["invisible"] },
			offline: { v: ["desconectado"] },
			online: { v: ["en línea"] }
		}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {
			away: { v: ["ausente"] },
			busy: { v: ["ocupado"] },
			"do not disturb": { v: ["no molestar"] },
			invisible: { v: ["invisible"] },
			offline: { v: ["fuera de línea"] },
			online: { v: ["en línea"] }
		}
	},
	{
		l: "et-EE",
		t: {
			away: { v: ["eemal"] },
			busy: { v: ["hõivatud"] },
			"do not disturb": { v: ["ära sega"] },
			invisible: { v: ["nähtamatu"] },
			offline: { v: ["pole võrgus"] },
			online: { v: ["võrgus"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {
			away: { v: ["دور از دستگاه"] },
			busy: { v: ["مشغول"] },
			"do not disturb": { v: ["مزاحم نشوید"] },
			invisible: { v: ["مخفی"] },
			offline: { v: ["برون‌خط"] },
			online: { v: ["برخط"] }
		}
	},
	{
		l: "fi",
		t: {
			away: { v: ["poissa"] },
			busy: { v: ["varattu"] },
			"do not disturb": { v: ["älä häiritse"] },
			invisible: { v: ["näkymätön"] },
			offline: { v: ["ei linjalla"] },
			online: { v: ["linjalla"] }
		}
	},
	{
		l: "fr",
		t: {
			away: { v: ["absent"] },
			busy: { v: ["occupé"] },
			"do not disturb": { v: ["ne pas déranger"] },
			invisible: { v: ["invisible"] },
			offline: { v: ["hors ligne"] },
			online: { v: ["en ligne"] }
		}
	},
	{
		l: "ga",
		t: {
			away: { v: ["ar shiúl"] },
			busy: { v: ["gnóthach"] },
			"do not disturb": { v: ["ná cur as"] },
			invisible: { v: ["dofheicthe"] },
			offline: { v: ["as líne"] },
			online: { v: ["ar líne"] }
		}
	},
	{
		l: "gl",
		t: {
			away: { v: ["ausente"] },
			busy: { v: ["ocupado"] },
			"do not disturb": { v: ["non molestar"] },
			invisible: { v: ["invisíbel"] },
			offline: { v: ["desconectado"] },
			online: { v: ["conectado"] }
		}
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: {
			away: { v: ["odsutan"] },
			busy: { v: ["zauzet"] },
			"do not disturb": { v: ["ne smetaj"] },
			invisible: { v: ["nevidljiv"] },
			offline: { v: ["izvan mreže"] },
			online: { v: ["na mreži"] }
		}
	},
	{
		l: "hu",
		t: {
			away: { v: ["távol"] },
			busy: { v: ["foglalt"] },
			"do not disturb": { v: ["ne zavarjanak"] },
			invisible: { v: ["láthatatlan"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "id",
		t: {
			away: { v: ["tidak tersedia"] },
			busy: { v: ["sibuk"] },
			"do not disturb": { v: ["jangan ganggu"] },
			invisible: { v: ["tidak terlihat"] },
			offline: { v: ["luring"] },
			online: { v: ["daring"] }
		}
	},
	{
		l: "is",
		t: {
			away: { v: ["í burtu"] },
			busy: { v: ["upptekin/n"] },
			"do not disturb": { v: ["ekki ónáða"] },
			invisible: { v: ["ósýnilegt"] },
			offline: { v: ["ónettengt"] },
			online: { v: ["nettengt"] }
		}
	},
	{
		l: "it",
		t: {
			away: { v: ["via"] },
			"do not disturb": { v: ["non disturbare"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "ja",
		t: {
			away: { v: ["離れる"] },
			busy: { v: ["ビジー"] },
			"do not disturb": { v: ["邪魔をしないでください"] },
			invisible: { v: ["不可視"] },
			offline: { v: ["オフライン"] },
			online: { v: ["オンライン"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			away: { v: ["離れる"] },
			busy: { v: ["ビジー"] },
			"do not disturb": { v: ["邪魔をしないでください"] },
			invisible: { v: ["不可視"] },
			offline: { v: ["オフライン"] },
			online: { v: ["オンライン"] }
		}
	},
	{
		l: "ko",
		t: {
			away: { v: ["자리 비움"] },
			busy: { v: ["바쁨"] },
			"do not disturb": { v: ["방해 금지"] },
			invisible: { v: ["보이지 않음"] },
			offline: { v: ["오프라인"] },
			online: { v: ["온라인"] }
		}
	},
	{
		l: "lo",
		t: {
			away: { v: ["ບໍ່ຢູ່"] },
			busy: { v: ["ບໍ່ວ່າງ"] },
			"do not disturb": { v: ["ຫ້າມລົບກວນ"] },
			invisible: { v: ["ບໍ່ສະແດງ"] },
			offline: { v: ["ອອບໄລນ໌"] },
			online: { v: ["ອອນໄລນ໌"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			away: { v: ["pasišalinęs"] },
			busy: { v: ["užsiėmęs"] },
			"do not disturb": { v: ["netrukdyti"] },
			invisible: { v: ["nematomas"] },
			offline: { v: ["neprisijungęs"] },
			online: { v: ["prisijungęs"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			away: { v: ["оддалечен"] },
			busy: { v: ["зафатен"] },
			"do not disturb": { v: ["не вознемирувај"] },
			invisible: { v: ["невидливо"] },
			offline: { v: ["офлајн"] },
			online: { v: ["онлајн"] }
		}
	},
	{
		l: "mn",
		t: {
			away: { v: ["хол байна"] },
			busy: { v: ["завгүй"] },
			"do not disturb": { v: ["бүү саад бол"] },
			invisible: { v: ["үл харагдах"] },
			offline: { v: ["офлайн"] },
			online: { v: ["онлайн"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			away: { v: ["borte"] },
			busy: { v: ["opptatt"] },
			"do not disturb": { v: ["ikke forstyrr"] },
			invisible: { v: ["usynlig"] },
			offline: { v: ["frakoblet"] },
			online: { v: ["tilkoblet"] }
		}
	},
	{
		l: "nl",
		t: {
			away: { v: ["weg"] },
			busy: { v: ["bezig"] },
			"do not disturb": { v: ["niet storen"] },
			invisible: { v: ["Onzichtbaar"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			away: { v: ["stąd"] },
			busy: { v: ["zajęty"] },
			"do not disturb": { v: ["nie przeszkadzać"] },
			invisible: { v: ["niewidzialny"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			away: { v: ["ausente"] },
			busy: { v: ["ocupado"] },
			"do not disturb": { v: ["não perturbe"] },
			invisible: { v: ["invisível"] },
			offline: { v: ["off-line"] },
			online: { v: ["on-line"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			away: { v: ["longe"] },
			busy: { v: ["ocupado"] },
			"do not disturb": { v: ["não incomodar"] },
			invisible: { v: ["invisível"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "ro",
		t: {
			away: { v: ["absent"] },
			busy: { v: ["ocupat"] },
			"do not disturb": { v: ["nu deranja"] },
			invisible: { v: ["invizibil"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "ru",
		t: {
			away: { v: ["неактивен"] },
			busy: { v: ["занят"] },
			"do not disturb": { v: ["не беспокоить"] },
			invisible: { v: ["невидимый"] },
			offline: { v: ["не в сети"] },
			online: { v: ["в сети"] }
		}
	},
	{
		l: "sk",
		t: {
			away: { v: ["neprítomný"] },
			busy: { v: ["zaneprázdnený"] },
			"do not disturb": { v: ["nerušiť"] },
			invisible: { v: ["neviditeľný"] },
			offline: { v: ["Odpojený - offline"] },
			online: { v: ["Pripojený - online"] }
		}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {
			away: { v: ["одсутан"] },
			busy: { v: ["заузет"] },
			"do not disturb": { v: ["не узнемиравај"] },
			invisible: { v: ["невидљиво"] },
			offline: { v: ["ван мреже"] },
			online: { v: ["на мрежи"] }
		}
	},
	{
		l: "sv",
		t: {
			away: { v: ["borta"] },
			busy: { v: ["upptagen"] },
			"do not disturb": { v: ["stör ej"] },
			invisible: { v: ["osynlig"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "tr",
		t: {
			away: { v: ["Uzakta"] },
			busy: { v: ["Meşgul"] },
			"do not disturb": { v: ["Rahatsız etmeyin"] },
			invisible: { v: ["görünmez"] },
			offline: { v: ["Çevrim dışı"] },
			online: { v: ["Çevrim içi"] }
		}
	},
	{
		l: "uk",
		t: {
			away: { v: ["відсутній"] },
			busy: { v: ["зайнято"] },
			"do not disturb": { v: ["не турбувати"] },
			invisible: { v: ["Невидимий"] },
			offline: { v: ["не в мережі"] },
			online: { v: ["в мережі"] }
		}
	},
	{
		l: "uz",
		t: {
			away: { v: ["uzoqda"] },
			busy: { v: ["band"] },
			"do not disturb": { v: ["bezovta qilmang"] },
			invisible: { v: ["ko'rinmas"] },
			offline: { v: ["offline"] },
			online: { v: ["online"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			away: { v: ["离开"] },
			busy: { v: ["繁忙"] },
			"do not disturb": { v: ["请勿打扰"] },
			invisible: { v: ["隐藏的"] },
			offline: { v: ["离线"] },
			online: { v: ["在线"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			away: { v: ["離開"] },
			busy: { v: ["忙碌"] },
			"do not disturb": { v: ["請勿打擾"] },
			invisible: { v: ["隐藏的"] },
			offline: { v: ["離線"] },
			online: { v: ["在線"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			away: { v: ["離開"] },
			busy: { v: ["忙碌"] },
			"do not disturb": { v: ["請勿打擾"] },
			invisible: { v: ["不可見"] },
			offline: { v: ["離線"] },
			online: { v: ["線上"] }
		}
	}
], cy = [
	{
		l: "ar",
		t: {
			"Calendar icon": { v: ["أيقونة التقويم"] },
			Cancel: { v: ["إلغاء"] },
			"Close time Picker": { v: ["إغلاق لاقط الوقت"] },
			"Datepicker input": { v: ["مُدخَلات لاقط التاريخ"] },
			"Datepicker menu": { v: ["قائمة لاقط التاريخ"] },
			"Decrement hours": { v: ["إنقاص الساعات"] },
			"Decrement minutes": { v: ["إنقاص الدقائق"] },
			"Decrement seconds": { v: ["إنقاص الثواني"] },
			"Increment hours": { v: ["زيادة الساعات"] },
			"Increment minutes": { v: ["زيادة الدقائق"] },
			"Increment seconds": { v: ["زيادة الثواني"] },
			"Month picker": { v: ["لاقط الشهر"] },
			"Month picker overlay": { v: ["تراكب لاقط الشهر"] },
			"Next month": { v: ["الشهر القادم"] },
			"Next year": { v: ["السنة القادمة"] },
			Now: { v: ["الآن"] },
			"Open hours overlay": { v: ["فتح تراكب الساعات "] },
			"Open minutes overlay": { v: ["فتح تراكب الدقائق"] },
			"Open months overlay": { v: ["فتح تراكب الشهور"] },
			"Open seconds overlay": { v: ["فتح تراكب الثواني"] },
			"Open time picker": { v: ["فتح لاقط الوقت"] },
			"Open years overlay": { v: ["فتح تراكب السنوات"] },
			Pick: { v: ["إلتقاط"] },
			"Previous month": { v: ["الشهر الماضي"] },
			"Previous year": { v: ["السنة الماضية"] },
			"Select date": { v: ["إختيار التاريخ"] },
			"Select date and time": { v: ["إختيار التاريخ والوقت"] },
			"Select month": { v: ["إختيار الشهر"] },
			"Select time": { v: ["إختيار الوقت"] },
			"Select time range": { v: ["إختيار المدى الزمني"] },
			"Select week": { v: ["إختيار الأسبوع"] },
			"Select year": { v: ["إختيار السنة"] },
			"Switch AM/PM mode": { v: ["تبديل وضعية صباحاً/مساءً"] },
			"Time picker": { v: ["لاقط الوقت"] },
			"Toggle overlay": { v: ["تبديل التراكب"] },
			W: { v: ["أ"] },
			"Year picker": { v: ["لاقط السنة"] },
			"Year picker overlay": { v: ["تراكب لاقط السنة"] }
		}
	},
	{
		l: "ast",
		t: {}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			"Calendar icon": { v: ["Ikona kalendáře"] },
			Cancel: { v: ["Storno"] },
			"Close time Picker": { v: ["Zavřít výběr času"] },
			"Datepicker input": { v: ["Vstup výběru data"] },
			"Datepicker menu": { v: ["Nabídka výběru data"] },
			"Decrement hours": { v: ["Snížit hodiny"] },
			"Decrement minutes": { v: ["Snížit minuty"] },
			"Decrement seconds": { v: ["Snížit sekundy"] },
			"Increment hours": { v: ["Zvýšit hodiny"] },
			"Increment minutes": { v: ["Zvýšit minuty"] },
			"Increment seconds": { v: ["Zvýšit sekundy"] },
			"Month picker": { v: ["Výběr měsíce"] },
			"Month picker overlay": { v: ["Překryvné okno výběru měsíce"] },
			"Next month": { v: ["Příští měsíc"] },
			"Next year": { v: ["Příští rok"] },
			Now: { v: ["Nyní"] },
			"Open hours overlay": { v: ["Otevřít překryvné okno hodin"] },
			"Open minutes overlay": { v: ["Otevřít překryvné okno minut"] },
			"Open months overlay": { v: ["Otevřít překryvné okno měsíců"] },
			"Open seconds overlay": { v: ["Otevřít překryvné okno sekund"] },
			"Open time picker": { v: ["Otevřít výběr času"] },
			"Open years overlay": { v: ["Otevřít překryvné okno roku"] },
			Pick: { v: ["Vybrat"] },
			"Previous month": { v: ["Předchozí měsíc"] },
			"Previous year": { v: ["Předchozí rok"] },
			"Select date": { v: ["Vybrat datum"] },
			"Select date and time": { v: ["Vybrat datum a čas"] },
			"Select month": { v: ["Vybrat měsíc"] },
			"Select time": { v: ["Vybrat čas"] },
			"Select time range": { v: ["Vybrat časový rozsah"] },
			"Select week": { v: ["Vybrat týden"] },
			"Select year": { v: ["Vybrat rok"] },
			"Switch AM/PM mode": { v: ["Přepnout režim dopo/odpoledne"] },
			"Time picker": { v: ["Výběr času"] },
			"Time zone": { v: ["Časové pásmo"] },
			"Toggle overlay": { v: ["Vyp/zap. překryvné okno"] },
			W: { v: ["T"] },
			"Year picker": { v: ["Výběr roku"] },
			"Year picker overlay": { v: ["Překryvné okno výběru roku"] }
		}
	},
	{
		l: "cs-CZ",
		t: {}
	},
	{
		l: "da",
		t: {
			"Calendar icon": { v: ["Kalenderikon"] },
			Cancel: { v: ["Annuller"] },
			"Close time Picker": { v: ["Luk tidsvælger"] },
			"Datepicker input": { v: ["Datofelt"] },
			"Datepicker menu": { v: ["Menu til datovælger"] },
			"Decrement hours": { v: ["Formindsk timer"] },
			"Decrement minutes": { v: ["Formindsk minutter"] },
			"Decrement seconds": { v: ["Formindsk sekunder"] },
			"Increment hours": { v: ["Forøg timer"] },
			"Increment minutes": { v: ["Forøg minutter"] },
			"Increment seconds": { v: ["Forøg sekunder"] },
			"Month picker": { v: ["Månedsvælger"] },
			"Month picker overlay": { v: ["Oversigt til valg af måned"] },
			"Next month": { v: ["Næste måned"] },
			"Next year": { v: ["Næste år"] },
			Now: { v: ["Nu"] },
			"Open hours overlay": { v: ["Åbn oversigt over timer"] },
			"Open minutes overlay": { v: ["Åbn oversigt over minutter"] },
			"Open months overlay": { v: ["Åbn oversigt over måneder"] },
			"Open seconds overlay": { v: ["Åbn oversigt over sekunder"] },
			"Open time picker": { v: ["Åbn tidsvælger"] },
			"Open years overlay": { v: ["Åbn oversigt over år"] },
			Pick: { v: ["Vælg"] },
			"Previous month": { v: ["Forrige måned"] },
			"Previous year": { v: ["Forrige år"] },
			"Select date": { v: ["Vælg dato"] },
			"Select date and time": { v: ["Vælg dato og tidspunkt"] },
			"Select month": { v: ["Vælg måned"] },
			"Select time": { v: ["Vælg tidspunkt"] },
			"Select time range": { v: ["Vælg tidsrum"] },
			"Select week": { v: ["Vælg uge"] },
			"Select year": { v: ["Vælg år"] },
			"Switch AM/PM mode": { v: ["Skift AM/PM-tilstand"] },
			"Time picker": { v: ["Tidsvælger"] },
			"Time zone": { v: ["Tidszone"] },
			"Toggle overlay": { v: ["Vis/skjul oversigt"] },
			W: { v: ["U"] },
			"Year picker": { v: ["Årsvælger"] },
			"Year picker overlay": { v: ["Oversigt til valg af år"] }
		}
	},
	{
		l: "de",
		t: {
			"Calendar icon": { v: ["Kalendersymbol"] },
			Cancel: { v: ["Abbrechen"] },
			"Close time Picker": { v: ["Zeitauswahl schließen"] },
			"Datepicker input": { v: ["Eingabe Datumsauswahl"] },
			"Datepicker menu": { v: ["Menü Datumsauswahl"] },
			"Decrement hours": { v: ["Stunden verringern"] },
			"Decrement minutes": { v: ["Minuten verringern"] },
			"Decrement seconds": { v: ["Sekunden verringern"] },
			"Increment hours": { v: ["Stunden hochzählen"] },
			"Increment minutes": { v: ["Minuten hochzählen"] },
			"Increment seconds": { v: ["Sekunden hochzählen"] },
			"Month picker": { v: ["Monatsauswahl"] },
			"Month picker overlay": { v: ["Monatsauswahl-Overlay"] },
			"Next month": { v: ["Nächster Monat"] },
			"Next year": { v: ["Nächstes Jahr"] },
			Now: { v: ["Jetzt"] },
			"Open hours overlay": { v: ["Stunden-Overlay öffnen"] },
			"Open minutes overlay": { v: ["Minuten-Overlay öffnen"] },
			"Open months overlay": { v: ["Monate-Overlay öffnen"] },
			"Open seconds overlay": { v: ["Sekunden-Overlay öffnen"] },
			"Open time picker": { v: ["Zeitauswahl öffnen"] },
			"Open years overlay": { v: ["Jahre-Overlay öffnen"] },
			Pick: { v: ["Auswählen"] },
			"Previous month": { v: ["Vorheriger Monat"] },
			"Previous year": { v: ["Vorheriges Jahr"] },
			"Select date": { v: ["Datum auswählen"] },
			"Select date and time": { v: ["Datum und Uhrzeit auswählen"] },
			"Select month": { v: ["Monat auswählen"] },
			"Select time": { v: ["Uhrzeit auswählen"] },
			"Select time range": { v: ["Zeitspanne auswählen"] },
			"Select week": { v: ["Woche auswählen"] },
			"Select year": { v: ["Jahr auswählen"] },
			"Switch AM/PM mode": { v: ["Zwischen AM/PM-Modus wechseln"] },
			"Time picker": { v: ["Zeitauswahl"] },
			"Time zone": { v: ["Zeitzone"] },
			"Toggle overlay": { v: ["Overlay umschalten"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Jahresauswahl"] },
			"Year picker overlay": { v: ["Jahre-Overlay öffnen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Calendar icon": { v: ["Kalendersymbol"] },
			Cancel: { v: ["Abbrechen"] },
			"Close time Picker": { v: ["Zeitauswahl schließen"] },
			"Datepicker input": { v: ["Eingabe Datumsauswahl"] },
			"Datepicker menu": { v: ["Menü Datumsauswahl"] },
			"Decrement hours": { v: ["Stunden verringern"] },
			"Decrement minutes": { v: ["Minuten verringern"] },
			"Decrement seconds": { v: ["Sekunden verringern"] },
			"Increment hours": { v: ["Stunden hochzählen"] },
			"Increment minutes": { v: ["Minuten hochzählen"] },
			"Increment seconds": { v: ["Sekunden hochzählen"] },
			"Month picker": { v: ["Monatsauswahl"] },
			"Month picker overlay": { v: ["Monatsauswahl-Overlay"] },
			"Next month": { v: ["Nächster Monat"] },
			"Next year": { v: ["Nächstes Jahr"] },
			Now: { v: ["Jetzt"] },
			"Open hours overlay": { v: ["Stunden-Overlay öffnen"] },
			"Open minutes overlay": { v: ["Minuten-Overlay öffnen"] },
			"Open months overlay": { v: ["Monate-Overlay öffnen"] },
			"Open seconds overlay": { v: ["Sekunden-Overlay öffnen"] },
			"Open time picker": { v: ["Zeitauswahl öffnen"] },
			"Open years overlay": { v: ["Jahre-Overlay öffnen"] },
			Pick: { v: ["Auswählen"] },
			"Previous month": { v: ["Vorheriger Monat"] },
			"Previous year": { v: ["Vorheriges Jahr"] },
			"Select date": { v: ["Datum auswählen"] },
			"Select date and time": { v: ["Datum und Uhrzeit auswählen"] },
			"Select month": { v: ["Monat auswählen"] },
			"Select time": { v: ["Uhrzeit auswählen"] },
			"Select time range": { v: ["Zeitspanne auswählen"] },
			"Select week": { v: ["Woche auswählen"] },
			"Select year": { v: ["Jahr auswählen"] },
			"Switch AM/PM mode": { v: ["Zwischen AM/PM-Modus wechseln"] },
			"Time picker": { v: ["Zeitauswahl"] },
			"Time zone": { v: ["Zeitzone"] },
			"Toggle overlay": { v: ["Overlay umschalten"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Jahresauswahl"] },
			"Year picker overlay": { v: ["Jahre-Overlay öffnen"] }
		}
	},
	{
		l: "el",
		t: {
			"Calendar icon": { v: ["Εικονίδιο ημερολογίου"] },
			Cancel: { v: ["Ακύρωση"] },
			"Close time Picker": { v: ["Κλείσιμο επιλογέα ώρας"] },
			"Datepicker input": { v: ["Εισαγωγή ημερομηνίας"] },
			"Datepicker menu": { v: ["Μενού επιλογής ημερομηνίας"] },
			"Decrement hours": { v: ["Μείωση ωρών"] },
			"Decrement minutes": { v: ["Μείωση λεπτών"] },
			"Decrement seconds": { v: ["Μείωση δευτερολέπτων"] },
			"Increment hours": { v: ["Αύξηση ωρών"] },
			"Increment minutes": { v: ["Αύξηση λεπτών"] },
			"Increment seconds": { v: ["Αύξηση δευτερολέπτων"] },
			"Month picker": { v: ["Επιλογή μήνα"] },
			"Month picker overlay": { v: ["Επικάλυψη επιλογής μήνα"] },
			"Next month": { v: ["Επόμενος μήνας"] },
			"Next year": { v: ["Επόμενο έτος"] },
			Now: { v: ["Τώρα"] },
			"Open hours overlay": { v: ["Άνοιγμα επικάλυψης ωρών"] },
			"Open minutes overlay": { v: ["Άνοιγμα επικάλυψης λεπτών"] },
			"Open months overlay": { v: ["Άνοιγμα επικάλυψης μηνών"] },
			"Open seconds overlay": { v: ["Άνοιγμα επικάλυψης δευτερολέπτων"] },
			"Open time picker": { v: ["Άνοιγμα επιλογέα ώρας"] },
			"Open years overlay": { v: ["Άνοιγμα επικάλυψης ετών"] },
			Pick: { v: ["Επιλογή"] },
			"Previous month": { v: ["Προηγούμενος μήνας"] },
			"Previous year": { v: ["Προηγούμενο έτος"] },
			"Select date": { v: ["Επιλογή ημερομηνίας"] },
			"Select date and time": { v: ["Επιλογή ημερομηνίας και ώρας"] },
			"Select month": { v: ["Επιλογή μήνα"] },
			"Select time": { v: ["Επιλογή ώρας"] },
			"Select time range": { v: ["Επιλογή χρονικού διαστήματος"] },
			"Select week": { v: ["Επιλογή εβδομάδας"] },
			"Select year": { v: ["Επιλογή έτους"] },
			"Switch AM/PM mode": { v: ["Εναλλαγή λειτουργίας AM/PM"] },
			"Time picker": { v: ["Επιλογή ώρας"] },
			"Toggle overlay": { v: ["Εναλλαγή επικάλυψης"] },
			W: { v: ["Τε"] },
			"Year picker": { v: ["Επιλογέας έτους"] },
			"Year picker overlay": { v: ["Επικάλυψη επιλογέα έτους"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Calendar icon": { v: ["Calendar icon"] },
			Cancel: { v: ["Cancel"] },
			"Close time Picker": { v: ["Close time Picker"] },
			"Datepicker input": { v: ["Datepicker input"] },
			"Datepicker menu": { v: ["Datepicker menu"] },
			"Decrement hours": { v: ["Decrement hours"] },
			"Decrement minutes": { v: ["Decrement minutes"] },
			"Decrement seconds": { v: ["Decrement seconds"] },
			"Increment hours": { v: ["Increment hours"] },
			"Increment minutes": { v: ["Increment minutes"] },
			"Increment seconds": { v: ["Increment seconds"] },
			"Month picker": { v: ["Month picker"] },
			"Month picker overlay": { v: ["Month picker overlay"] },
			"Next month": { v: ["Next month"] },
			"Next year": { v: ["Next year"] },
			Now: { v: ["Now"] },
			"Open hours overlay": { v: ["Open hours overlay"] },
			"Open minutes overlay": { v: ["Open minutes overlay"] },
			"Open months overlay": { v: ["Open months overlay"] },
			"Open seconds overlay": { v: ["Open seconds overlay"] },
			"Open time picker": { v: ["Open time picker"] },
			"Open years overlay": { v: ["Open years overlay"] },
			Pick: { v: ["Pick"] },
			"Previous month": { v: ["Previous month"] },
			"Previous year": { v: ["Previous year"] },
			"Select date": { v: ["Select date"] },
			"Select date and time": { v: ["Select date and time"] },
			"Select month": { v: ["Select month"] },
			"Select time": { v: ["Select time"] },
			"Select time range": { v: ["Select time range"] },
			"Select week": { v: ["Select week"] },
			"Select year": { v: ["Select year"] },
			"Switch AM/PM mode": { v: ["Switch AM/PM mode"] },
			"Time picker": { v: ["Time picker"] },
			"Time zone": { v: ["Time zone"] },
			"Toggle overlay": { v: ["Toggle overlay"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Year picker"] },
			"Year picker overlay": { v: ["Year picker overlay"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {}
	},
	{
		l: "es-AR",
		t: {}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {}
	},
	{
		l: "et-EE",
		t: {
			"Calendar icon": { v: ["Kalendriikoon"] },
			Cancel: { v: ["Katkesta"] },
			"Close time Picker": { v: ["Sulge ajavalija"] },
			"Datepicker input": { v: ["Kuupäevavalija sisend"] },
			"Datepicker menu": { v: ["Kuupäevavalija menüü"] },
			"Decrement hours": { v: ["Vähenda tunde"] },
			"Decrement minutes": { v: ["Vähenda minuteid"] },
			"Decrement seconds": { v: ["Vähenda sekundeid"] },
			"Increment hours": { v: ["Suurenda tunde"] },
			"Increment minutes": { v: ["Suurenda minuteid"] },
			"Increment seconds": { v: ["Suurenda sekundeid"] },
			"Month picker": { v: ["Kuupäevavalija"] },
			"Month picker overlay": { v: ["Kuupäevavalija ülekatteaken"] },
			"Next month": { v: ["Järgmine kuu"] },
			"Next year": { v: ["Järgmine aasta"] },
			Now: { v: ["Praegu"] },
			"Open hours overlay": { v: ["Ava tundide vaade"] },
			"Open minutes overlay": { v: ["Ava minutite vaade"] },
			"Open months overlay": { v: ["Ava kuude vaade"] },
			"Open seconds overlay": { v: ["Ava sekundite vaade"] },
			"Open time picker": { v: ["Ava ajavalija"] },
			"Open years overlay": { v: ["Ava aastate vaade"] },
			Pick: { v: ["Vali"] },
			"Previous month": { v: ["Eelmine kuu"] },
			"Previous year": { v: ["Eelmine aasta"] },
			"Select date": { v: ["Vali kuupäev"] },
			"Select date and time": { v: ["Vali kuupäev ja kellaaeg"] },
			"Select month": { v: ["Vali kuu"] },
			"Select time": { v: ["Vali aeg"] },
			"Select time range": { v: ["Vali ajavahemik"] },
			"Select week": { v: ["Vali nädal"] },
			"Select year": { v: ["Vali aasta"] },
			"Switch AM/PM mode": { v: ["Vaheta AM/PM kuvamist"] },
			"Time picker": { v: ["Ajavalija"] },
			"Time zone": { v: ["Ajavöönd"] },
			"Toggle overlay": { v: ["Lülita ülekatteaken sisse/välja"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Aastavalija"] },
			"Year picker overlay": { v: ["Aastavavalija ülekatteaken"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {}
	},
	{
		l: "fi",
		t: {}
	},
	{
		l: "fr",
		t: {
			"Calendar icon": { v: ["Icône de calendrier"] },
			Cancel: { v: ["Annuler"] },
			"Close time Picker": { v: ["Fermer le sélecteur d’heure"] },
			"Datepicker input": { v: ["Champ du sélecteur de date"] },
			"Datepicker menu": { v: ["Menu du sélecteur de date"] },
			"Decrement hours": { v: ["Diminuer les heures"] },
			"Decrement minutes": { v: ["Diminuer les minutes"] },
			"Decrement seconds": { v: ["Diminuer les secondes"] },
			"Increment hours": { v: ["Augmenter les heures"] },
			"Increment minutes": { v: ["Augmenter les minutes"] },
			"Increment seconds": { v: ["Augmenter les secondes"] },
			"Month picker": { v: ["Sélecteur de mois"] },
			"Month picker overlay": { v: ["Panneau du sélecteur de mois"] },
			"Next month": { v: ["Mois suivant"] },
			"Next year": { v: ["Année suivante"] },
			Now: { v: ["Maintenant"] },
			"Open hours overlay": { v: ["Ouvrir le sélecteur des heures"] },
			"Open minutes overlay": { v: ["Ouvrir le sélecteur des minutes"] },
			"Open months overlay": { v: ["Ouvrir le sélecteur des mois"] },
			"Open seconds overlay": { v: ["Ouvrir le sélecteur des secondes"] },
			"Open time picker": { v: ["Ouvrir le sélecteur d’heure"] },
			"Open years overlay": { v: ["Ouvrir le sélecteur des années"] },
			Pick: { v: ["Choisir"] },
			"Previous month": { v: ["Mois précédent"] },
			"Previous year": { v: ["Année précédente"] },
			"Select date": { v: ["Sélectionnez la date"] },
			"Select date and time": { v: ["Sélectionnez la date et l'heure"] },
			"Select month": { v: ["Sélectionnez le mois"] },
			"Select time": { v: ["Sélectionnez l'heure"] },
			"Select time range": { v: ["Sélectionnez la plage horaire"] },
			"Select week": { v: ["Sélectionnez la semaine"] },
			"Select year": { v: ["Sélectionnez l'année"] },
			"Switch AM/PM mode": { v: ["Basculer entre AM et PM"] },
			"Time picker": { v: ["Sélecteur d’heure"] },
			"Time zone": { v: ["Fuseau horaire"] },
			"Toggle overlay": { v: ["Afficher ou masquer le panneau de sélection"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Sélecteur d'année"] },
			"Year picker overlay": { v: ["Panneau du sélecteur d’année"] }
		}
	},
	{
		l: "ga",
		t: {
			"Calendar icon": { v: ["Deilbhín féilire"] },
			Cancel: { v: ["Cealaigh"] },
			"Close time Picker": { v: ["Roghnóir am dúnta"] },
			"Datepicker input": { v: ["Ionchur datepicker"] },
			"Datepicker menu": { v: ["Roghchlár datepicker"] },
			"Decrement hours": { v: ["Laghdaigh uaireanta"] },
			"Decrement minutes": { v: ["Laghdaigh nóiméid "] },
			"Decrement seconds": { v: ["Laghdaigh soicind"] },
			"Increment hours": { v: ["Méadaigh uaireanta"] },
			"Increment minutes": { v: ["Méadaigh nóiméid"] },
			"Increment seconds": { v: ["Méadaigh soicind"] },
			"Month picker": { v: ["Roghnóir míosa"] },
			"Month picker overlay": { v: ["Forleagan roghnóir míosa"] },
			"Next month": { v: ["An mhí seo chugainn"] },
			"Next year": { v: ["An bhliain seo chugainn"] },
			Now: { v: ["Anois"] },
			"Open hours overlay": { v: ["Forleagan uaireanta oscailte"] },
			"Open minutes overlay": { v: ["Forleagan nóiméad oscailte"] },
			"Open months overlay": { v: ["Forleagan míonna oscailte"] },
			"Open seconds overlay": { v: ["Soicind oscailte forleagan"] },
			"Open time picker": { v: ["Roghnóir am oscailte"] },
			"Open years overlay": { v: ["Forleagan blianta oscailte"] },
			Pick: { v: ["Pioc"] },
			"Previous month": { v: ["An mhí roimhe sin"] },
			"Previous year": { v: ["Bhliain roimhe sin"] },
			"Select date": { v: ["Roghnaigh dáta"] },
			"Select date and time": { v: ["Roghnaigh dáta agus am"] },
			"Select month": { v: ["Roghnaigh mí"] },
			"Select time": { v: ["Roghnaigh am"] },
			"Select time range": { v: ["Roghnaigh raon ama"] },
			"Select week": { v: ["Roghnaigh seachtain"] },
			"Select year": { v: ["Roghnaigh bliain"] },
			"Switch AM/PM mode": { v: ["Athraigh mód AM/PM"] },
			"Time picker": { v: ["Roghnóir ama"] },
			"Time zone": { v: ["Crios ama"] },
			"Toggle overlay": { v: ["Scoránaigh forleagan"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Roghnóir bliana"] },
			"Year picker overlay": { v: ["Forleagan roghnóir bliana"] }
		}
	},
	{
		l: "gl",
		t: {
			"Calendar icon": { v: ["Icona do calendario"] },
			Cancel: { v: ["Cancelar"] },
			"Close time Picker": { v: ["Pechar o Selector de hora"] },
			"Datepicker input": { v: ["Entrada do selector de datas"] },
			"Datepicker menu": { v: ["Menú do selector de datas"] },
			"Decrement hours": { v: ["Diminuír as horas"] },
			"Decrement minutes": { v: ["Diminuír os minutos"] },
			"Decrement seconds": { v: ["Diminuír os segundos"] },
			"Increment hours": { v: ["Aumentar as horas"] },
			"Increment minutes": { v: ["Aumentar os minutos"] },
			"Increment seconds": { v: ["Aumentar os segundos"] },
			"Month picker": { v: ["Selector de mes"] },
			"Month picker overlay": { v: ["Superposición do selector de mes"] },
			"Next month": { v: ["Próximo mes"] },
			"Next year": { v: ["Próximo ano"] },
			Now: { v: ["Agora"] },
			"Open hours overlay": { v: ["Abrir a superposición de horas"] },
			"Open minutes overlay": { v: ["Abrir a superposición de minutos"] },
			"Open months overlay": { v: ["Abrir a superposición de meses"] },
			"Open seconds overlay": { v: ["Abrir a superposición de segundos"] },
			"Open time picker": { v: ["Abrir o selector de hora"] },
			"Open years overlay": { v: ["Abrir a superposición de anos"] },
			Pick: { v: ["Escoller"] },
			"Previous month": { v: ["Mes pasado"] },
			"Previous year": { v: ["Ano pasado"] },
			"Select date": { v: ["Seleccione a data"] },
			"Select date and time": { v: ["Seleccione a data e a hora"] },
			"Select month": { v: ["Seleccione o mes"] },
			"Select time": { v: ["Seleccione a hora"] },
			"Select time range": { v: [" Seleccione o intervalo de tempo"] },
			"Select week": { v: ["Seleccione a semana"] },
			"Select year": { v: ["Seleccione o ano"] },
			"Switch AM/PM mode": { v: ["Alternar o modo AM/PM"] },
			"Time picker": { v: ["Selector de hora"] },
			"Time zone": { v: ["Fuso horario"] },
			"Toggle overlay": { v: ["Alternar a sobreposición"] },
			W: { v: ["S"] },
			"Year picker": { v: ["Selector de ano"] },
			"Year picker overlay": { v: ["Superposición do selector de ano"] }
		}
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: {
			"Calendar icon": { v: ["Ikona kalendara"] },
			Cancel: { v: ["Otkaži"] },
			"Close time Picker": { v: ["Zatvori odabir vremena"] },
			"Datepicker input": { v: ["Unos birača datuma"] },
			"Datepicker menu": { v: ["Izbornik birača datuma"] },
			"Decrement hours": { v: ["Smanji sate"] },
			"Decrement minutes": { v: ["Smanji minute"] },
			"Decrement seconds": { v: ["Smanji sekunde"] },
			"Increment hours": { v: ["Povećaj sate"] },
			"Increment minutes": { v: ["Povećaj minute"] },
			"Increment seconds": { v: ["Povećaj sekunde"] },
			"Month picker": { v: ["Odabir mjeseca"] },
			"Month picker overlay": { v: ["Sloj za odabir mjeseca"] },
			"Next month": { v: ["Sljedeći mjesec"] },
			"Next year": { v: ["Sljedeća godina"] },
			Now: { v: ["Sada"] },
			"Open hours overlay": { v: ["Otvori sloj za odabir sati"] },
			"Open minutes overlay": { v: ["Otvori sloj za odabir minuta"] },
			"Open months overlay": { v: ["Otvori sloj za odabir mjeseci"] },
			"Open seconds overlay": { v: ["Otvori sloj za odabir sekundi"] },
			"Open time picker": { v: ["Otvori birač vremena"] },
			"Open years overlay": { v: ["Otvori sloj za odabir godina"] },
			Pick: { v: ["Odaberi"] },
			"Previous month": { v: ["Prethodni mjesec"] },
			"Previous year": { v: ["Prethodna godina"] },
			"Select date": { v: ["Odaberi datum"] },
			"Select date and time": { v: ["Odaberi datum i vrijeme"] },
			"Select month": { v: ["Odaberi mjesec"] },
			"Select time": { v: ["Odaberi vrijeme"] },
			"Select time range": { v: ["Odaberi vremenski raspon"] },
			"Select week": { v: ["Odaberi tjedan"] },
			"Select year": { v: ["Odaberi godinu"] },
			"Switch AM/PM mode": { v: ["Prebaci AM/PM način"] },
			"Time picker": { v: ["Odabir vremena"] },
			"Time zone": { v: ["Vremenska zona"] },
			"Toggle overlay": { v: ["Uključi/isključi sloj"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Odabir godine"] },
			"Year picker overlay": { v: ["Sloj za odabir godine"] }
		}
	},
	{
		l: "hu",
		t: {
			"Calendar icon": { v: ["Naptárikon"] },
			Cancel: { v: ["Mégse"] },
			"Close time Picker": { v: ["Időválasztó bezárása"] },
			"Datepicker input": { v: ["Dátumválasztó bemenet"] },
			"Datepicker menu": { v: ["Dátumválasztó menü"] },
			"Decrement hours": { v: ["Órák csökkentése"] },
			"Decrement minutes": { v: ["Percek csökkentése"] },
			"Decrement seconds": { v: ["Másodpercek csökkentése"] },
			"Increment hours": { v: ["Órák növelése"] },
			"Increment minutes": { v: ["Percek növelése"] },
			"Increment seconds": { v: ["Másodpercek növelése"] },
			"Month picker": { v: ["Hónapválasztó"] },
			"Month picker overlay": { v: ["Hónapválasztó átfedés"] },
			"Next month": { v: ["Következő hónap"] },
			"Next year": { v: ["Következő év"] },
			Now: { v: ["Most"] },
			"Open hours overlay": { v: ["Órák átfedésének megnyitása"] },
			"Open minutes overlay": { v: ["Percek átfedésének megnyitása"] },
			"Open months overlay": { v: ["Hónapok átfedésének megnyitása"] },
			"Open seconds overlay": { v: ["Másodpercek átfedésének megnyitása"] },
			"Open time picker": { v: ["Időválasztó megnyitása"] },
			"Open years overlay": { v: ["Évek átfedésének megnyitása"] },
			Pick: { v: ["Válasszon"] },
			"Previous month": { v: ["Előző hónap"] },
			"Previous year": { v: ["Előző év"] },
			"Select date": { v: ["Válasszon dátumot"] },
			"Select date and time": { v: ["Válasszon dátumot és időt"] },
			"Select month": { v: ["Válasszon hónapot"] },
			"Select time": { v: ["Válasszon időt"] },
			"Select time range": { v: ["Válasszon időszakot"] },
			"Select week": { v: ["Válasszon hetet"] },
			"Select year": { v: ["Válasszon évet"] },
			"Switch AM/PM mode": { v: ["Váltás de./du. módra"] },
			"Time picker": { v: ["Időválasztó"] },
			"Time zone": { v: ["Időzóna"] },
			"Toggle overlay": { v: ["Átfedés be/ki"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Évválasztó"] },
			"Year picker overlay": { v: ["Évválasztó átfedés"] }
		}
	},
	{
		l: "id",
		t: {
			"Calendar icon": { v: ["Ikon kalender"] },
			Cancel: { v: ["Batal"] },
			"Close time Picker": { v: ["Tutup pemilih waktu"] },
			"Datepicker input": { v: ["Input pemilih tanggal"] },
			"Datepicker menu": { v: ["Menu pemilih tanggal"] },
			"Decrement hours": { v: ["Kurangi jam"] },
			"Decrement minutes": { v: ["Kurangi menit"] },
			"Decrement seconds": { v: ["Kurangi detik"] },
			"Increment hours": { v: ["Tambah jam"] },
			"Increment minutes": { v: ["Tambah menit"] },
			"Increment seconds": { v: ["Tambah detik"] },
			"Month picker": { v: ["Pemilih bulan"] },
			"Month picker overlay": { v: ["Overlay pemilih bulan"] },
			"Next month": { v: ["Bulan berikutnya"] },
			"Next year": { v: ["Tahun berikutnya"] },
			Now: { v: ["Sekarang"] },
			"Open hours overlay": { v: ["Buka overlay jam"] },
			"Open minutes overlay": { v: ["Buka overlay menit"] },
			"Open months overlay": { v: ["Buka overlay bulan"] },
			"Open seconds overlay": { v: ["Buka overlay detik"] },
			"Open time picker": { v: ["Buka pemilih waktu"] },
			"Open years overlay": { v: ["Buka overlay tahun"] },
			Pick: { v: ["Pilih"] },
			"Previous month": { v: ["Bulan sebelumnya"] },
			"Previous year": { v: ["Tahun sebelumnya"] },
			"Select date": { v: ["Pilih tanggal"] },
			"Select date and time": { v: ["Pilih tanggal dan waktu"] },
			"Select month": { v: ["Pilih bulan"] },
			"Select time": { v: ["Pilih waktu"] },
			"Select time range": { v: ["Pilih rentang waktu"] },
			"Select week": { v: ["Pilih minggu"] },
			"Select year": { v: ["Pilih tahun"] },
			"Switch AM/PM mode": { v: ["Ganti mode AM/PM"] },
			"Time picker": { v: ["Pemilih waktu"] },
			"Time zone": { v: ["Zona waktu"] },
			"Toggle overlay": { v: ["Alihkan overlay"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Pemilih tahun"] },
			"Year picker overlay": { v: ["Overlay pemilih tahun"] }
		}
	},
	{
		l: "is",
		t: {}
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: {
			"Calendar icon": { v: ["カレンダーのアイコン"] },
			Cancel: { v: ["キャンセル"] },
			"Close time Picker": { v: ["時間ピッカーを閉じる"] },
			"Datepicker input": { v: ["データピッカー入力"] },
			"Datepicker menu": { v: ["データピッカーメニュー"] },
			"Decrement hours": { v: ["時間を減らす"] },
			"Decrement minutes": { v: ["分を減らす"] },
			"Decrement seconds": { v: ["秒を減らす"] },
			"Increment hours": { v: ["時間を増やす"] },
			"Increment minutes": { v: ["分を増やす"] },
			"Increment seconds": { v: ["秒を増やす"] },
			"Month picker": { v: ["月ピッカー"] },
			"Month picker overlay": { v: ["月ピッカーオーバーレイ"] },
			"Next month": { v: ["次月"] },
			"Next year": { v: ["次年"] },
			Now: { v: ["現在"] },
			"Open hours overlay": { v: ["時間オーバーレイを開く"] },
			"Open minutes overlay": { v: ["分オーバーレイを開く"] },
			"Open months overlay": { v: ["月オーバーレイを開く"] },
			"Open seconds overlay": { v: ["秒オーバーレイを開く"] },
			"Open time picker": { v: ["時間ピッカーを開く"] },
			"Open years overlay": { v: ["年オーバーレイを開く"] },
			Pick: { v: ["選択"] },
			"Previous month": { v: ["前月"] },
			"Previous year": { v: ["前年"] },
			"Select date": { v: ["日付を選択"] },
			"Select date and time": { v: ["日付と時刻を選択"] },
			"Select month": { v: ["月を選択"] },
			"Select time": { v: ["時刻を選択"] },
			"Select time range": { v: ["時間範囲を選択"] },
			"Select week": { v: ["週を選択"] },
			"Select year": { v: ["年を選択"] },
			"Switch AM/PM mode": { v: ["AM/PMモードの切り替え"] },
			"Time picker": { v: ["時刻ピッカー"] },
			"Time zone": { v: ["タイムゾーン"] },
			"Toggle overlay": { v: ["オーバーレイの切り替え"] },
			W: { v: ["W"] },
			"Year picker": { v: ["年ピッカー"] },
			"Year picker overlay": { v: ["年ピッカーオーバーレイ"] }
		}
	},
	{
		l: "ja-JP",
		t: {}
	},
	{
		l: "ko",
		t: {
			"Calendar icon": { v: ["캘린더 아이콘"] },
			Cancel: { v: ["취소"] },
			"Close time Picker": { v: ["시간 선택기 닫기"] },
			"Datepicker input": { v: ["날짜 선택기 입력"] },
			"Datepicker menu": { v: ["날짜 입력기 메뉴"] },
			"Decrement hours": { v: ["시 감소"] },
			"Decrement minutes": { v: ["분 감소"] },
			"Decrement seconds": { v: ["초 감소"] },
			"Increment hours": { v: ["시 증가"] },
			"Increment minutes": { v: ["분 증가"] },
			"Increment seconds": { v: ["초 증가"] },
			"Month picker": { v: ["월 선택기"] },
			"Month picker overlay": { v: ["월 선택기 오버레이"] },
			"Next month": { v: ["다음 달"] },
			"Next year": { v: ["다음 해"] },
			Now: { v: ["현재"] },
			"Open hours overlay": { v: ["시 오버레이 열기"] },
			"Open minutes overlay": { v: ["분 오버레이 열기"] },
			"Open months overlay": { v: ["월 오버레이 열기"] },
			"Open seconds overlay": { v: ["초 오버레이 열기"] },
			"Open time picker": { v: ["시간 선택기 열기"] },
			"Open years overlay": { v: ["년 오버레이 열기"] },
			Pick: { v: ["선택"] },
			"Previous month": { v: ["이전 달"] },
			"Previous year": { v: ["이전 해"] },
			"Select date": { v: ["날짜 선택"] },
			"Select date and time": { v: ["날짜와 시간 선택"] },
			"Select month": { v: ["월 선택"] },
			"Select time": { v: ["시간 선택"] },
			"Select time range": { v: ["시간 구간 선택"] },
			"Select week": { v: ["주 선택"] },
			"Select year": { v: ["년도 선택"] },
			"Switch AM/PM mode": { v: ["AM/PM 모드 전환"] },
			"Time picker": { v: ["시간 선택기"] },
			"Time zone": { v: ["시간대"] },
			"Toggle overlay": { v: ["오버레이 토글"] },
			W: { v: ["W"] },
			"Year picker": { v: ["년도 선택기"] },
			"Year picker overlay": { v: ["년도 선택기 오버레이"] }
		}
	},
	{
		l: "lo",
		t: {
			"Calendar icon": { v: ["ໄອຄອນປະຕິທິນ"] },
			Cancel: { v: ["ຍົກເລີກ"] },
			"Close time Picker": { v: ["ປິດໂຕເລືອກເວລາ"] },
			"Datepicker input": { v: ["ຊ່ອງປ້ອນວັນທີ"] },
			"Datepicker menu": { v: ["ເມນູໂຕເລືອກວັນທີ"] },
			"Decrement hours": { v: ["ຫຼຸດຊົ່ວໂມງ"] },
			"Decrement minutes": { v: ["ຫຼຸດນາທີ"] },
			"Decrement seconds": { v: ["ຫຼຸດວິນາທີ"] },
			"Increment hours": { v: ["ເພີ່ມຊົ່ວໂມງ"] },
			"Increment minutes": { v: ["ເພີ່ມນາທີ"] },
			"Increment seconds": { v: ["ເພີ່ມວິນາທີ"] },
			"Month picker": { v: ["ໂຕເລືອກເດືອນ"] },
			"Month picker overlay": { v: ["ໜ້າຕ່າງໂຕເລືອກເດືອນ"] },
			"Next month": { v: ["ເດືອນໜ້າ"] },
			"Next year": { v: ["ປີໜ້າ"] },
			Now: { v: ["ຕອນນີ້"] },
			"Open hours overlay": { v: ["ເປີດໜ້າຕ່າງເລືອກຊົ່ວໂມງ"] },
			"Open minutes overlay": { v: ["ເປີດໜ້າຕ່າງເລືອກນາທີ"] },
			"Open months overlay": { v: ["ເປີດໜ້າຕ່າງເລືອກເດືອນ"] },
			"Open seconds overlay": { v: ["ເປີດໜ້າຕ່າງເລືອກວິນາທີ"] },
			"Open time picker": { v: ["ເປີດໂຕເລືອກເວລາ"] },
			"Open years overlay": { v: ["ເປີດໜ້າຕ່າງເລືອກປີ"] },
			Pick: { v: ["ເລືອກ"] },
			"Previous month": { v: ["ເດືອນກ່ອນ"] },
			"Previous year": { v: ["ປີກ່ອນ"] },
			"Select date": { v: ["ເລືອກວັນທີ"] },
			"Select date and time": { v: ["ເລືອກວັນທີ ແລະ ເວລາ"] },
			"Select month": { v: ["ເລືອກເດືອນ"] },
			"Select time": { v: ["ເລືອກເວລາ"] },
			"Select time range": { v: ["ເລືອກຊ່ວງເວລາ"] },
			"Select week": { v: ["ເລືອກອາທິດ"] },
			"Select year": { v: ["ເລືອກປີ"] },
			"Switch AM/PM mode": { v: ["ສະຫຼັບໂໝດ AM/PM"] },
			"Time picker": { v: ["ໂຕເລືອກເວລາ"] },
			"Time zone": { v: ["ເຂດເວລາ"] },
			"Toggle overlay": { v: ["ສະຫຼັບໜ້າຕ່າງ"] },
			W: { v: ["ອ"] },
			"Year picker": { v: ["ໂຕເລືອກປີ"] },
			"Year picker overlay": { v: ["ໜ້າຕ່າງໂຕເລືອກປີ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Calendar icon": { v: ["Kalendoriaus piktograma"] },
			Cancel: { v: ["Atsisakyti"] },
			"Close time Picker": { v: ["Uždaryti laiko pasirinkimo langą"] },
			"Datepicker input": { v: ["Datos rinkiklio įvestis"] },
			"Datepicker menu": { v: ["Datos rinkiklio meniu"] },
			"Decrement hours": { v: ["Sumažinkite valandas"] },
			"Decrement minutes": { v: ["Sumažinkite minutes"] },
			"Decrement seconds": { v: ["Sumažinkite sekundes"] },
			"Increment hours": { v: ["Padidinkite valandas"] },
			"Increment minutes": { v: ["Padidinkite minutes"] },
			"Increment seconds": { v: ["Padidinkite sekundes"] },
			"Month picker": { v: ["Mėnesio pasirinkimas"] },
			"Month picker overlay": { v: ["Mėnesio parinkiklio langas"] },
			"Next month": { v: ["Kitą mėnesį"] },
			"Next year": { v: ["Kiti metai"] },
			Now: { v: ["Dabar"] },
			"Open hours overlay": { v: ["Atidaryti valandų pasirinkimą"] },
			"Open minutes overlay": { v: ["Atidaryti minučių pasirinkimą"] },
			"Open months overlay": { v: ["Atidaryti mėnesių pasirinkimą"] },
			"Open seconds overlay": { v: ["Atidaryti sekundžių pasirinkimą"] },
			"Open time picker": { v: ["Atverti laiko pasirinkimo langą"] },
			"Open years overlay": { v: ["Atidaryti metų pasirinkimą"] },
			Pick: { v: ["Pasirinkti"] },
			"Previous month": { v: ["Ankstesnis mėnesis"] },
			"Previous year": { v: ["Ankstesni metai"] },
			"Select date": { v: ["Pasirinkti datą"] },
			"Select date and time": { v: ["Pasirinkti datą ir laiką"] },
			"Select month": { v: ["Pasirinkti mėnesį"] },
			"Select time": { v: ["Pasirinkti laiką"] },
			"Select time range": { v: ["Pasirinkti laikotarpį"] },
			"Select week": { v: ["Pasirinkti savaitę"] },
			"Select year": { v: ["Pasirinkti metus"] },
			"Switch AM/PM mode": { v: ["Perjungti AM/PM režimą"] },
			"Time picker": { v: ["Laiko parinkiklis"] },
			"Time zone": { v: ["Laiko juosta"] },
			"Toggle overlay": { v: ["Perjungti pasirinkimo langą"] },
			W: { v: ["\"W\""] },
			"Year picker": { v: ["Metų parinkiklis"] },
			"Year picker overlay": { v: ["Metų pasirinkimo langas"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Calendar icon": { v: ["Икона за календар"] },
			Cancel: { v: ["Откажи"] },
			"Close time Picker": { v: ["Затвори избирач на време"] },
			"Datepicker input": { v: ["Поле за избор на датум"] },
			"Datepicker menu": { v: ["Мени за избор на датум"] },
			"Decrement hours": { v: ["Намали часови"] },
			"Decrement minutes": { v: ["Намали минути"] },
			"Decrement seconds": { v: ["Намали секунди"] },
			"Increment hours": { v: ["Зголеми часови"] },
			"Increment minutes": { v: ["Зголеми минути"] },
			"Increment seconds": { v: ["Зголеми секунди"] },
			"Month picker": { v: ["Избор на месец"] },
			"Month picker overlay": { v: ["Надолжен избор на месец"] },
			"Next month": { v: ["Следен месец"] },
			"Next year": { v: ["Следна година"] },
			Now: { v: ["Сега"] },
			"Open hours overlay": { v: ["Отвори преклоп за часови"] },
			"Open minutes overlay": { v: ["Отвори преклоп за минути"] },
			"Open months overlay": { v: ["Отвори преклоп за месеци"] },
			"Open seconds overlay": { v: ["Отвори преклоп за секунди"] },
			"Open time picker": { v: ["Отвори избор на време"] },
			"Open years overlay": { v: ["Отвори преклоп за години"] },
			Pick: { v: ["Избери"] },
			"Previous month": { v: ["Предходен месец"] },
			"Previous year": { v: ["Предходна година"] },
			"Select date": { v: ["Избери датум"] },
			"Select date and time": { v: ["Избери датум и време"] },
			"Select month": { v: ["Избери месец"] },
			"Select time": { v: ["Избери време"] },
			"Select time range": { v: ["Избери времески опсег"] },
			"Select week": { v: ["Избери недела"] },
			"Select year": { v: ["Избери година"] },
			"Switch AM/PM mode": { v: ["Смени AM/PM режим"] },
			"Time picker": { v: ["Избирач на време"] },
			"Time zone": { v: ["Временска зона"] },
			"Toggle overlay": { v: ["Вклучи/исклучи преклоп"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Избор на година"] },
			"Year picker overlay": { v: ["Надолжен избор на година"] }
		}
	},
	{
		l: "mn",
		t: {
			"Calendar icon": { v: ["Календарийн дүрс"] },
			Cancel: { v: ["Цуцлах"] },
			"Close time Picker": { v: ["Цаг сонгогчийг хаах"] },
			"Datepicker input": { v: ["Огноо сонгогчийн оролт"] },
			"Datepicker menu": { v: ["Огноо сонгогчийн цэс"] },
			"Decrement hours": { v: ["Цагийг бууруулах"] },
			"Decrement minutes": { v: ["Минутыг бууруулах"] },
			"Decrement seconds": { v: ["Секундыг бууруулах"] },
			"Increment hours": { v: ["Цагийг нэмэгдүүлэх"] },
			"Increment minutes": { v: ["Минутыг нэмэгдүүлэх"] },
			"Increment seconds": { v: ["Секундыг нэмэгдүүлэх"] },
			"Month picker": { v: ["Сар сонгогч"] },
			"Month picker overlay": { v: ["Сар сонгогчийн давхарга"] },
			"Next month": { v: ["Дараа сар"] },
			"Next year": { v: ["Дараа жил"] },
			Now: { v: ["Одоо"] },
			"Open hours overlay": { v: ["Цагийн давхаргыг нээх"] },
			"Open minutes overlay": { v: ["Минутын давхаргыг нээх"] },
			"Open months overlay": { v: ["Сарын давхаргыг нээх"] },
			"Open seconds overlay": { v: ["Секундын давхаргыг нээх"] },
			"Open time picker": { v: ["Цаг сонгогчийг нээх"] },
			"Open years overlay": { v: ["Жилийн давхаргыг нээх"] },
			Pick: { v: ["Сонгох"] },
			"Previous month": { v: ["Өмнөх сар"] },
			"Previous year": { v: ["Өмнөх жил"] },
			"Select date": { v: ["Огноо сонгох"] },
			"Select date and time": { v: ["Огноо, цаг сонгох"] },
			"Select month": { v: ["Сар сонгох"] },
			"Select time": { v: ["Цаг сонгох"] },
			"Select time range": { v: ["Цагийн хүрээ сонгох"] },
			"Select week": { v: ["Долоо хоног сонгох"] },
			"Select year": { v: ["Жил сонгох"] },
			"Switch AM/PM mode": { v: ["ҮӨ/ҮХ горимыг солих"] },
			"Time picker": { v: ["Цаг сонгогч"] },
			"Time zone": { v: ["Цагийн бүс"] },
			"Toggle overlay": { v: ["Давхаргыг сэлгэх"] },
			W: { v: ["Д"] },
			"Year picker": { v: ["Жил сонгогч"] },
			"Year picker overlay": { v: ["Жил сонгогчийн давхарга"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {}
	},
	{
		l: "nl",
		t: {
			"Calendar icon": { v: ["Kalender-pictogram"] },
			Cancel: { v: ["Annuleren"] },
			"Close time Picker": { v: ["Tijdkiezer sluiten"] },
			"Datepicker input": { v: ["Datumkiezer invoer"] },
			"Datepicker menu": { v: ["Datumkiezer menu"] },
			"Decrement hours": { v: ["Uren verminderen"] },
			"Decrement minutes": { v: ["Minuten verminderen"] },
			"Decrement seconds": { v: ["Seconden verminderen"] },
			"Increment hours": { v: ["Uren vermeerderen"] },
			"Increment minutes": { v: ["Minuten vermeerderen"] },
			"Increment seconds": { v: ["Seconden vermeerderen"] },
			"Month picker": { v: ["Maandkiezer"] },
			"Month picker overlay": { v: ["Maandkiezer-overlay"] },
			"Next month": { v: ["Volgende maand"] },
			"Next year": { v: ["Volgend jaar"] },
			Now: { v: ["Nu"] },
			"Open hours overlay": { v: ["Uren-overlay openen"] },
			"Open minutes overlay": { v: ["Minuten-overlay openen"] },
			"Open months overlay": { v: ["Maanden-overlay openen"] },
			"Open seconds overlay": { v: ["Seconden-overlay openen"] },
			"Open time picker": { v: ["Tijdkiezer openen"] },
			"Open years overlay": { v: ["Jaren-overlay openen"] },
			Pick: { v: ["Kiezen"] },
			"Previous month": { v: ["Vorige maand"] },
			"Previous year": { v: ["Vorig jaar"] },
			"Select date": { v: ["Selecteer datum"] },
			"Select date and time": { v: ["Selecteer datum en tijd"] },
			"Select month": { v: ["Selecteer maand"] },
			"Select time": { v: ["Selecteer tijd"] },
			"Select time range": { v: ["Selecteer tijdsbereik"] },
			"Select week": { v: ["Selecteer week"] },
			"Select year": { v: ["Selecteer jaar"] },
			"Switch AM/PM mode": { v: ["AM/PM-modus wisselen"] },
			"Time picker": { v: ["Tijdkiezer"] },
			"Time zone": { v: ["Tijdzone"] },
			"Toggle overlay": { v: ["Overlay wisselen"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Jaarkiezer"] },
			"Year picker overlay": { v: ["Jaarkiezer-overlay"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {}
	},
	{
		l: "pt-BR",
		t: {
			"Calendar icon": { v: ["Ícone de calendário"] },
			Cancel: { v: ["Cancelar"] },
			"Close time Picker": { v: ["Fechar Seletor de tempo"] },
			"Datepicker input": { v: ["entrada do seletor de data"] },
			"Datepicker menu": { v: ["menu do seletor de data"] },
			"Decrement hours": { v: ["Diminuir horas"] },
			"Decrement minutes": { v: ["Diminuir minutos"] },
			"Decrement seconds": { v: ["Diminuir segundos"] },
			"Increment hours": { v: ["Aumentar horas"] },
			"Increment minutes": { v: ["Aumentar minutos"] },
			"Increment seconds": { v: ["Aumentar segundos"] },
			"Month picker": { v: ["Seletor de meses"] },
			"Month picker overlay": { v: ["Sobreposição do seletor de meses"] },
			"Next month": { v: ["Próximo mês"] },
			"Next year": { v: ["Próximo ano"] },
			Now: { v: ["Agora"] },
			"Open hours overlay": { v: ["Abrir sobreposição de horas"] },
			"Open minutes overlay": { v: ["Abrir sobreposição de minutos"] },
			"Open months overlay": { v: ["Abrir sobreposição de meses"] },
			"Open seconds overlay": { v: ["Abrir sobreposição de segundos"] },
			"Open time picker": { v: ["Abrir seletor de tempo"] },
			"Open years overlay": { v: ["Abrir sobreposição de anos"] },
			Pick: { v: ["Escolher"] },
			"Previous month": { v: ["Mês anterior"] },
			"Previous year": { v: ["Ano anterior"] },
			"Select date": { v: ["Selecione data"] },
			"Select date and time": { v: ["Selecione data e hora"] },
			"Select month": { v: ["Selecione mês"] },
			"Select time": { v: ["Selecione hora"] },
			"Select time range": { v: ["Selecione intervalo de tempo"] },
			"Select week": { v: ["Selecione semana"] },
			"Select year": { v: ["Selecione ano"] },
			"Switch AM/PM mode": { v: ["Alternar modo AM/PM"] },
			"Time picker": { v: ["Seletor de tempo"] },
			"Time zone": { v: ["Fuso horário"] },
			"Toggle overlay": { v: ["Alternar sobreposição"] },
			W: { v: ["S"] },
			"Year picker": { v: ["Seletor de ano"] },
			"Year picker overlay": { v: ["Sobreposição do seletor de ano"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Calendar icon": { v: ["Ícone de calendário"] },
			Cancel: { v: ["Cancelar"] },
			"Close time Picker": { v: ["Fechar seletor de hora"] },
			"Datepicker input": { v: ["Campo do seletor de data"] },
			"Datepicker menu": { v: ["Menu do seletor de data"] },
			"Decrement hours": { v: ["Diminuir horas"] },
			"Decrement minutes": { v: ["Diminuir minutos"] },
			"Decrement seconds": { v: ["Diminuir segundos"] },
			"Increment hours": { v: ["Aumentar horas"] },
			"Increment minutes": { v: ["Aumentar minutos"] },
			"Increment seconds": { v: ["Aumentar segundos"] },
			"Month picker": { v: ["Seletor de mês"] },
			"Month picker overlay": { v: ["Janela do seletor de mês"] },
			"Next month": { v: ["Próximo mês"] },
			"Next year": { v: ["Próximo ano"] },
			Now: { v: ["Agora"] },
			"Open hours overlay": { v: ["Abrir janela de horas"] },
			"Open minutes overlay": { v: ["Abrir janela de minutos"] },
			"Open months overlay": { v: ["Abrir janela de meses"] },
			"Open seconds overlay": { v: ["Abrir janela de segundos"] },
			"Open time picker": { v: ["Abrir seletor de hora"] },
			"Open years overlay": { v: ["Abrir janela de anos"] },
			Pick: { v: ["Selecionar"] },
			"Previous month": { v: ["Mês anterior"] },
			"Previous year": { v: ["Ano anterior"] },
			"Select date": { v: ["Selecionar data"] },
			"Select date and time": { v: ["Selecionar data e hora"] },
			"Select month": { v: ["Selecionar mês"] },
			"Select time": { v: ["Selecionar hora"] },
			"Select time range": { v: ["Selecionar intervalo de horas"] },
			"Select week": { v: ["Selecionar semana"] },
			"Select year": { v: ["Selecionar ano"] },
			"Switch AM/PM mode": { v: ["Alternar modo AM/PM"] },
			"Time picker": { v: ["Seletor de hora"] },
			"Toggle overlay": { v: ["Alternar sobreposição"] },
			W: { v: ["S"] },
			"Year picker": { v: ["Seletor de ano"] },
			"Year picker overlay": { v: ["Janela do seletor de ano"] }
		}
	},
	{
		l: "ro",
		t: {
			"Calendar icon": { v: ["Pictogramă calendar"] },
			Cancel: { v: ["Anulare"] },
			"Close time Picker": { v: ["Închide selectorul de oră"] },
			"Datepicker input": { v: ["Câmpul selectorului de dată"] },
			"Datepicker menu": { v: ["Meniul selectorului de dată"] },
			"Decrement hours": { v: ["Scade ora"] },
			"Decrement minutes": { v: ["Scade minutele"] },
			"Decrement seconds": { v: ["Scade secundele"] },
			"Increment hours": { v: ["Crește ora"] },
			"Increment minutes": { v: ["Crește minutele"] },
			"Increment seconds": { v: ["Crește secundele"] },
			"Month picker": { v: ["Selector de lună"] },
			"Month picker overlay": { v: ["Panoul selectorului de lună"] },
			"Next month": { v: ["Luna următoare"] },
			"Next year": { v: ["Anul următor"] },
			Now: { v: ["Acum"] },
			"Open hours overlay": { v: ["Deschide panoul orelor"] },
			"Open minutes overlay": { v: ["Deschide panoul minutelor"] },
			"Open months overlay": { v: ["Deschide panoul lunilor"] },
			"Open seconds overlay": { v: ["Deschide panoul secundelor"] },
			"Open time picker": { v: ["Deschide selectorul de oră"] },
			"Open years overlay": { v: ["Deschide panoul anilor"] },
			Pick: { v: ["Alege"] },
			"Previous month": { v: ["Luna anterioară"] },
			"Previous year": { v: ["Anul anterior"] },
			"Select date": { v: ["Selectează data"] },
			"Select date and time": { v: ["Selectează data și ora"] },
			"Select month": { v: ["Selectează luna"] },
			"Select time": { v: ["Selectează ora"] },
			"Select time range": { v: ["Selectează intervalul orar"] },
			"Select week": { v: ["Selectează săptămâna"] },
			"Select year": { v: ["Selectează anul"] },
			"Switch AM/PM mode": { v: ["Comută AM/PM"] },
			"Time picker": { v: ["Selector de oră"] },
			"Time zone": { v: ["Fus orar"] },
			"Toggle overlay": { v: ["Comută panoul"] },
			W: { v: ["S"] },
			"Year picker": { v: ["Selector de an"] },
			"Year picker overlay": { v: ["Panoul selectorului de an"] }
		}
	},
	{
		l: "ru",
		t: {
			"Calendar icon": { v: ["Значок календаря"] },
			Cancel: { v: ["Отмена"] },
			"Close time Picker": { v: ["Закрыть выбор времени"] },
			"Datepicker input": { v: ["Поле выбора даты"] },
			"Datepicker menu": { v: ["Меню выбора даты"] },
			"Decrement hours": { v: ["Уменьшить количество часов"] },
			"Decrement minutes": { v: ["Уменьшить количество минут"] },
			"Decrement seconds": { v: ["Уменьшить количество секунд"] },
			"Increment hours": { v: ["Увеличить количество часов"] },
			"Increment minutes": { v: ["Увеличить количество минут"] },
			"Increment seconds": { v: ["Увеличить количество секунд"] },
			"Month picker": { v: ["Выбор месяца"] },
			"Month picker overlay": { v: ["Окно выбора месяца"] },
			"Next month": { v: ["Следующий месяц"] },
			"Next year": { v: ["Следующий год"] },
			Now: { v: ["Сейчас"] },
			"Open hours overlay": { v: ["Открыть окно выбора часов"] },
			"Open minutes overlay": { v: ["Открыть окно выбора минут"] },
			"Open months overlay": { v: ["Открыть окно выбора месяца"] },
			"Open seconds overlay": { v: ["Открыть окно выбора секунд"] },
			"Open time picker": { v: ["Открыть выбор времени"] },
			"Open years overlay": { v: ["Открыть окно выбора года"] },
			Pick: { v: ["Выбрать"] },
			"Previous month": { v: ["Предыдущий месяц"] },
			"Previous year": { v: ["Предыдущий год"] },
			"Select date": { v: ["Выбрать дату"] },
			"Select date and time": { v: ["Выбрать дату и время"] },
			"Select month": { v: ["Выбрать месяц"] },
			"Select time": { v: ["Выбрать время"] },
			"Select time range": { v: ["Выбрать временной диапазон"] },
			"Select week": { v: ["Выбрать неделю"] },
			"Select year": { v: ["Выбрать год"] },
			"Switch AM/PM mode": { v: ["Переключение режима AM/PM"] },
			"Time picker": { v: ["Выбор времени"] },
			"Time zone": { v: ["Часовой пояс"] },
			"Toggle overlay": { v: ["Переключить панель"] },
			W: { v: ["Н"] },
			"Year picker": { v: ["Выбор года"] },
			"Year picker overlay": { v: ["Окно выбора года"] }
		}
	},
	{
		l: "sk",
		t: {}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {
			"Calendar icon": { v: ["Икона календара"] },
			Cancel: { v: ["Откажи"] },
			"Close time Picker": { v: ["Затвори бирач времена"] },
			"Datepicker input": { v: ["Улаз бирача датума"] },
			"Datepicker menu": { v: ["Мени бирача датума"] },
			"Decrement hours": { v: ["Умањи сате"] },
			"Decrement minutes": { v: ["Умањи минуте"] },
			"Decrement seconds": { v: ["Умањи секунде"] },
			"Increment hours": { v: ["Увећај сате"] },
			"Increment minutes": { v: ["Увећај минуте"] },
			"Increment seconds": { v: ["Увећај секунде"] },
			"Month picker": { v: ["Бирач месеца"] },
			"Month picker overlay": { v: ["Маска бирача месеца"] },
			"Next month": { v: ["Наредни месец"] },
			"Next year": { v: ["Наредна година"] },
			Now: { v: ["Сада"] },
			"Open hours overlay": { v: ["Отвори маску сати"] },
			"Open minutes overlay": { v: ["Отвори маску минута"] },
			"Open months overlay": { v: ["Отвори маску месеци"] },
			"Open seconds overlay": { v: ["Отвори маску секунди"] },
			"Open time picker": { v: ["Отвори бирач времена"] },
			"Open years overlay": { v: ["Отвори маску година"] },
			Pick: { v: ["Изабери"] },
			"Previous month": { v: ["Претходни месец"] },
			"Previous year": { v: ["Претходна година"] },
			"Select date": { v: ["Изаберите датум"] },
			"Select date and time": { v: ["Изаберите датум и време"] },
			"Select month": { v: ["Изаберите месец"] },
			"Select time": { v: ["Изаберите време"] },
			"Select time range": { v: ["Изаберите опсег времена"] },
			"Select week": { v: ["Изаберите недељу"] },
			"Select year": { v: ["Изаберите годину"] },
			"Switch AM/PM mode": { v: ["Укљ./Искљ. AM/PM режим"] },
			"Time picker": { v: ["Бирач времена"] },
			"Toggle overlay": { v: ["Укљ./Искљ. маску"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Бирач године"] },
			"Year picker overlay": { v: ["Маска бирача године"] }
		}
	},
	{
		l: "sv",
		t: {
			"Calendar icon": { v: ["Kalenderikon"] },
			Cancel: { v: ["Avbryt"] },
			"Close time Picker": { v: ["Stäng tidsväljaren"] },
			"Datepicker input": { v: ["Inmatningsfält för datumväljare"] },
			"Datepicker menu": { v: ["Meny för datumväljare"] },
			"Decrement hours": { v: ["Minska timmar"] },
			"Decrement minutes": { v: ["Minska minuter"] },
			"Decrement seconds": { v: ["Minska sekunder"] },
			"Increment hours": { v: ["Öka timmar"] },
			"Increment minutes": { v: ["Öka minuter"] },
			"Increment seconds": { v: ["Öka sekunder"] },
			"Month picker": { v: ["Månadsväljare"] },
			"Month picker overlay": { v: ["Panel för månadsväljare"] },
			"Next month": { v: ["Nästa månad"] },
			"Next year": { v: ["Nästa år"] },
			Now: { v: ["Nu"] },
			"Open hours overlay": { v: ["Öppna panelen för timmar"] },
			"Open minutes overlay": { v: ["Öppna panelen för minuter"] },
			"Open months overlay": { v: ["Öppna panelen för månader"] },
			"Open seconds overlay": { v: ["Öppna panelen för sekunder"] },
			"Open time picker": { v: ["Öppna tidsväljaren"] },
			"Open years overlay": { v: ["Öppna panelen för år"] },
			Pick: { v: ["Välj"] },
			"Previous month": { v: ["Föregående månad"] },
			"Previous year": { v: ["Föregående år"] },
			"Select date": { v: ["Välj datum"] },
			"Select date and time": { v: ["Välj datum och tid"] },
			"Select month": { v: ["Välj månad"] },
			"Select time": { v: ["Välj tid"] },
			"Select time range": { v: ["Välj tidsintervall"] },
			"Select week": { v: ["Välj vecka"] },
			"Select year": { v: ["Välj år"] },
			"Switch AM/PM mode": { v: ["Växla AM/PM-läge"] },
			"Time picker": { v: ["Tidsväljare"] },
			"Time zone": { v: ["Tidszon"] },
			"Toggle overlay": { v: ["Visa eller dölj panelen"] },
			W: { v: ["V"] },
			"Year picker": { v: ["Årsväljare"] },
			"Year picker overlay": { v: ["Panel för årsväljare"] }
		}
	},
	{
		l: "tr",
		t: {
			"Calendar icon": { v: ["Takvim simgesi"] },
			Cancel: { v: ["İptal"] },
			"Close time Picker": { v: ["Zaman seçiciyi kapat"] },
			"Datepicker input": { v: ["Tarih seçici girişi"] },
			"Datepicker menu": { v: ["Tarih seçici menüsü"] },
			"Decrement hours": { v: ["Azalma saati"] },
			"Decrement minutes": { v: ["Azalma dakikası"] },
			"Decrement seconds": { v: ["Azalma saniyesi"] },
			"Increment hours": { v: ["Artma saati"] },
			"Increment minutes": { v: ["Artma dakikası"] },
			"Increment seconds": { v: ["Artma saniyesi"] },
			"Month picker": { v: ["Ay seçici"] },
			"Month picker overlay": { v: ["Ay seçici kaplaması"] },
			"Next month": { v: ["Sonraki ay"] },
			"Next year": { v: ["Sonraki yıl"] },
			Now: { v: ["Şimdi"] },
			"Open hours overlay": { v: ["Açık saatler kaplaması"] },
			"Open minutes overlay": { v: ["Dakika kaplamasını aç"] },
			"Open months overlay": { v: ["Ay kaplamasını aç"] },
			"Open seconds overlay": { v: ["Saniye kaplamasını aç"] },
			"Open time picker": { v: ["Saat seçiciyi aç"] },
			"Open years overlay": { v: ["Yıl kaplamasını aç"] },
			Pick: { v: ["Seçin"] },
			"Previous month": { v: ["Önceki ay"] },
			"Previous year": { v: ["Önceki yıl"] },
			"Select date": { v: ["Tarih seçin"] },
			"Select date and time": { v: ["Tarih ve saat seçin"] },
			"Select month": { v: ["Ay seçin"] },
			"Select time": { v: ["Saat seçin"] },
			"Select time range": { v: ["Saat aralığı seçin"] },
			"Select week": { v: ["Hafta seçin"] },
			"Select year": { v: ["Yıl seçin"] },
			"Switch AM/PM mode": { v: ["ÖÖ/ÖS kipine geç"] },
			"Time picker": { v: ["Saat seçici"] },
			"Time zone": { v: ["Saat dilimi"] },
			"Toggle overlay": { v: ["Kaplamayı aç/kapat"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Yıl seçici"] },
			"Year picker overlay": { v: ["Yıl seçici kaplaması"] }
		}
	},
	{
		l: "uk",
		t: {
			"Calendar icon": { v: ["Значок календаря"] },
			Cancel: { v: ["Скасувати"] },
			"Close time Picker": { v: ["Закрити вибір часу"] },
			"Datepicker input": { v: ["Вибір дати"] },
			"Datepicker menu": { v: ["Меню вибору дати"] },
			"Decrement hours": { v: ["Зменшення годин"] },
			"Decrement minutes": { v: ["Зменшення хвилин"] },
			"Decrement seconds": { v: ["Зменшення секунд"] },
			"Increment hours": { v: ["Збільшення годин"] },
			"Increment minutes": { v: ["Збільшення хвилин"] },
			"Increment seconds": { v: ["Збільшення секунд"] },
			"Month picker": { v: ["Вибір місяця"] },
			"Month picker overlay": { v: ["Напис вибору місяця"] },
			"Next month": { v: ["Наступний місяць"] },
			"Next year": { v: ["Наступний рік"] },
			Now: { v: ["Зараз"] },
			"Open hours overlay": { v: ["Відкрити напис годин"] },
			"Open minutes overlay": { v: ["Відкрити напис хвилин"] },
			"Open months overlay": { v: ["Відкрити напис місяців"] },
			"Open seconds overlay": { v: ["Відкрити напис секунд"] },
			"Open time picker": { v: ["Відкрити вибір часу"] },
			"Open years overlay": { v: ["Відкрити напис років"] },
			Pick: { v: ["Вибрати"] },
			"Previous month": { v: ["Попередній місяць"] },
			"Previous year": { v: ["Попередній рік"] },
			"Select date": { v: ["Вибрати дату"] },
			"Select date and time": { v: ["Вибрати дату та час"] },
			"Select month": { v: ["Вибрати місяць"] },
			"Select time": { v: ["Вибрати час"] },
			"Select time range": { v: ["Вибрати проміжок часу"] },
			"Select week": { v: ["Вибрати тиждень"] },
			"Select year": { v: ["Вибрати рік"] },
			"Switch AM/PM mode": { v: ["Перемкнути показ по полудні/до полудня"] },
			"Time picker": { v: ["Вибір часу"] },
			"Toggle overlay": { v: ["Перемкнути напис"] },
			W: { v: ["Тиж."] },
			"Year picker": { v: ["Вибір року"] },
			"Year picker overlay": { v: ["Напис вибору року"] }
		}
	},
	{
		l: "uz",
		t: {
			"Calendar icon": { v: ["Kalendar belgisi"] },
			Cancel: { v: ["Bekor qilish"] },
			"Close time Picker": { v: ["Vaqtni tanlash vositasini yopish"] },
			"Datepicker input": { v: ["Sana tanlash vositasi kiritish"] },
			"Datepicker menu": { v: ["Sana tanlash menyusi"] },
			"Decrement hours": { v: ["Ish vaqtini qisqartirish"] },
			"Decrement minutes": { v: ["Daqiqalarni kamaytirish"] },
			"Decrement seconds": { v: ["Soniyalarni kamaytirish"] },
			"Increment hours": { v: ["Ish soatlarini oshirish"] },
			"Increment minutes": { v: ["Daqiqalarni oshiring"] },
			"Increment seconds": { v: ["Soniyalarni ko'paytirish"] },
			"Month picker": { v: ["Oyni tanlovchi"] },
			"Month picker overlay": { v: ["Oyni tanlash vositasi qoplamasi"] },
			"Next month": { v: ["Keyingi oy"] },
			"Next year": { v: ["Keyingi yil"] },
			Now: { v: ["Hozir"] },
			"Open hours overlay": { v: ["Ochiq ish soatlari"] },
			"Open minutes overlay": { v: ["Ochiq daqiqalar qoplamasi"] },
			"Open months overlay": { v: ["Ochiq oylik qoplama"] },
			"Open seconds overlay": { v: ["Ochiq soniyalar qoplamasi"] },
			"Open time picker": { v: ["Vaqt tanlagichni ochish"] },
			"Open years overlay": { v: ["Yillar qoplamasini ochish"] },
			Pick: { v: ["Tanlash"] },
			"Previous month": { v: ["Oldingi oy"] },
			"Previous year": { v: ["O'tgan yil"] },
			"Select date": { v: ["Sana tanlang"] },
			"Select date and time": { v: ["Sana va vaqtni tanlang"] },
			"Select month": { v: ["Oyni tanlang"] },
			"Select time": { v: ["Oyni tanlang"] },
			"Select time range": { v: ["Vaqt oralig'ini tanlang"] },
			"Select week": { v: ["Haftani tanlang"] },
			"Select year": { v: ["Yilni tanlang"] },
			"Switch AM/PM mode": { v: ["AM/PM rejimini almashtiring"] },
			"Time picker": { v: ["Vaqtni tanlovchi"] },
			"Time zone": { v: ["Vaqt mintaqasi"] },
			"Toggle overlay": { v: ["Qoplamani almashtirish"] },
			W: { v: ["W"] },
			"Year picker": { v: ["Yilni tanlovchi"] },
			"Year picker overlay": { v: ["Yilni tanlash vositasi"] }
		}
	},
	{
		l: "zh-CN",
		t: {}
	},
	{
		l: "zh-HK",
		t: {
			"Calendar icon": { v: ["行事曆圖示"] },
			Cancel: { v: ["取消"] },
			"Close time Picker": { v: ["關閉時間挑選器"] },
			"Datepicker input": { v: ["日期挑選器輸入"] },
			"Datepicker menu": { v: ["日期挑選器選單"] },
			"Decrement hours": { v: ["小時遞減"] },
			"Decrement minutes": { v: ["分鐘遞減"] },
			"Decrement seconds": { v: ["秒遞減"] },
			"Increment hours": { v: ["小時遞增"] },
			"Increment minutes": { v: ["分鐘遞增"] },
			"Increment seconds": { v: ["秒遞增"] },
			"Month picker": { v: ["月挑選器"] },
			"Month picker overlay": { v: ["月挑選器覆蓋層"] },
			"Next month": { v: ["下個月"] },
			"Next year": { v: ["明年"] },
			Now: { v: ["現在"] },
			"Open hours overlay": { v: ["開啟小時覆蓋層"] },
			"Open minutes overlay": { v: ["開啟分鐘覆蓋層"] },
			"Open months overlay": { v: ["開啟月覆蓋層"] },
			"Open seconds overlay": { v: ["開啟秒覆蓋層"] },
			"Open time picker": { v: ["開啟時間挑選器"] },
			"Open years overlay": { v: ["開啟年覆蓋層"] },
			Pick: { v: ["挑選"] },
			"Previous month": { v: ["上個月"] },
			"Previous year": { v: ["去年"] },
			"Select date": { v: ["選取日期"] },
			"Select date and time": { v: ["選取日期與時間"] },
			"Select month": { v: ["選取月"] },
			"Select time": { v: ["選取時間"] },
			"Select time range": { v: ["選取時間範圍"] },
			"Select week": { v: ["選取週"] },
			"Select year": { v: ["選取年"] },
			"Switch AM/PM mode": { v: ["切換上午/下午模式"] },
			"Time picker": { v: ["時間挑選器"] },
			"Time zone": { v: ["時區"] },
			"Toggle overlay": { v: ["切換覆蓋層"] },
			W: { v: ["週"] },
			"Year picker": { v: ["年挑選器"] },
			"Year picker overlay": { v: ["年挑選器覆蓋層"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Calendar icon": { v: ["行事曆圖示"] },
			Cancel: { v: ["取消"] },
			"Close time Picker": { v: ["關閉時間挑選器"] },
			"Datepicker input": { v: ["日期挑選器輸入"] },
			"Datepicker menu": { v: ["日期挑選器選單"] },
			"Decrement hours": { v: ["小時遞減"] },
			"Decrement minutes": { v: ["分鐘遞減"] },
			"Decrement seconds": { v: ["秒遞減"] },
			"Increment hours": { v: ["小時遞增"] },
			"Increment minutes": { v: ["分鐘遞增"] },
			"Increment seconds": { v: ["秒遞增"] },
			"Month picker": { v: ["月挑選器"] },
			"Month picker overlay": { v: ["月挑選器覆蓋層"] },
			"Next month": { v: ["下個月"] },
			"Next year": { v: ["明年"] },
			Now: { v: ["現在"] },
			"Open hours overlay": { v: ["開啟小時覆蓋層"] },
			"Open minutes overlay": { v: ["開啟分鐘覆蓋層"] },
			"Open months overlay": { v: ["開啟月覆蓋層"] },
			"Open seconds overlay": { v: ["開啟秒覆蓋層"] },
			"Open time picker": { v: ["開啟時間挑選器"] },
			"Open years overlay": { v: ["開啟年覆蓋層"] },
			Pick: { v: ["挑選"] },
			"Previous month": { v: ["上個月"] },
			"Previous year": { v: ["去年"] },
			"Select date": { v: ["選取日期"] },
			"Select date and time": { v: ["選取日期與時間"] },
			"Select month": { v: ["選取月"] },
			"Select time": { v: ["選取時間"] },
			"Select time range": { v: ["選取時間範圍"] },
			"Select week": { v: ["選取週"] },
			"Select year": { v: ["選取年"] },
			"Switch AM/PM mode": { v: ["切換上午/下午模式"] },
			"Time picker": { v: ["時間挑選器"] },
			"Time zone": { v: ["時區"] },
			"Toggle overlay": { v: ["切換覆蓋層"] },
			W: { v: ["W"] },
			"Year picker": { v: ["年挑選器"] },
			"Year picker overlay": { v: ["年挑選器覆蓋層"] }
		}
	}
], ly = [
	{
		l: "ar",
		t: {
			"Cancel changes": { v: ["إلغاء التغييرات"] },
			"Confirm changes": { v: ["تأكيد التغييرات"] }
		}
	},
	{
		l: "ast",
		t: {
			"Cancel changes": { v: ["Encaboxar los cambeos"] },
			"Confirm changes": { v: ["Confirmar los cambeos"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {
			"Cancel changes": { v: ["Cancel·la els canvis"] },
			"Confirm changes": { v: ["Confirmeu els canvis"] }
		}
	},
	{
		l: "cs",
		t: {
			"Cancel changes": { v: ["Zrušit změny"] },
			"Confirm changes": { v: ["Potvrdit změny"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Cancel changes": { v: ["Zrušit změny"] },
			"Confirm changes": { v: ["Potvrdit změny"] }
		}
	},
	{
		l: "da",
		t: {
			"Cancel changes": { v: ["Annuller ændringer"] },
			"Confirm changes": { v: ["Bekræft ændringer"] }
		}
	},
	{
		l: "de",
		t: {
			"Cancel changes": { v: ["Änderungen verwerfen"] },
			"Confirm changes": { v: ["Änderungen bestätigen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Cancel changes": { v: ["Änderungen verwerfen"] },
			"Confirm changes": { v: ["Änderungen bestätigen"] }
		}
	},
	{
		l: "el",
		t: {
			"Cancel changes": { v: ["Ακύρωση αλλαγών"] },
			"Confirm changes": { v: ["Επιβεβαίωση αλλαγών"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Cancel changes": { v: ["Cancel changes"] },
			"Confirm changes": { v: ["Confirm changes"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Cancel changes": { v: ["Cancelar cambios"] },
			"Confirm changes": { v: ["Confirmar cambios"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Cancel changes": { v: ["Cancelar cambios"] },
			"Confirm changes": { v: ["Confirmar cambios"] }
		}
	},
	{
		l: "es-EC",
		t: {
			"Cancel changes": { v: ["Cancelar cambios"] },
			"Confirm changes": { v: ["Confirmar cambios"] }
		}
	},
	{
		l: "es-MX",
		t: {
			"Cancel changes": { v: ["Cancelar cambios"] },
			"Confirm changes": { v: ["Confirmar cambios"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Cancel changes": { v: ["Tühista muudatused"] },
			"Confirm changes": { v: ["Kinnita muudatused"] }
		}
	},
	{
		l: "eu",
		t: {
			"Cancel changes": { v: ["Ezeztatu aldaketak"] },
			"Confirm changes": { v: ["Baieztatu aldaketak"] }
		}
	},
	{
		l: "fa",
		t: {
			"Cancel changes": { v: ["لغو تغییرات"] },
			"Confirm changes": { v: ["تایید تغییرات"] }
		}
	},
	{
		l: "fi",
		t: {
			"Cancel changes": { v: ["Peruuta muutokset"] },
			"Confirm changes": { v: ["Vahvista muutokset"] }
		}
	},
	{
		l: "fr",
		t: {
			"Cancel changes": { v: ["Annuler les modifications"] },
			"Confirm changes": { v: ["Confirmer les modifications"] }
		}
	},
	{
		l: "ga",
		t: {
			"Cancel changes": { v: ["Cealaigh athruithe"] },
			"Confirm changes": { v: ["Deimhnigh na hathruithe"] }
		}
	},
	{
		l: "gl",
		t: {
			"Cancel changes": { v: ["Cancelar os cambios"] },
			"Confirm changes": { v: ["Confirma os cambios"] }
		}
	},
	{
		l: "he",
		t: {
			"Cancel changes": { v: ["ביטול שינויים"] },
			"Confirm changes": { v: ["אישור השינויים"] }
		}
	},
	{
		l: "hr",
		t: {
			"Cancel changes": { v: ["Otkaži promjene"] },
			"Confirm changes": { v: ["Potvrdi promjene"] }
		}
	},
	{
		l: "hu",
		t: {
			"Cancel changes": { v: ["Változtatások elvetése"] },
			"Confirm changes": { v: ["Változtatások megerősítése"] }
		}
	},
	{
		l: "id",
		t: {
			"Cancel changes": { v: ["Batalkan perubahan"] },
			"Confirm changes": { v: ["Konfirmasikan perubahan"] }
		}
	},
	{
		l: "is",
		t: {
			"Cancel changes": { v: ["Hætta við breytingar"] },
			"Confirm changes": { v: ["Staðfesta breytingar"] }
		}
	},
	{
		l: "it",
		t: {
			"Cancel changes": { v: ["Annulla modifiche"] },
			"Confirm changes": { v: ["Conferma modifiche"] }
		}
	},
	{
		l: "ja",
		t: {
			"Cancel changes": { v: ["変更をキャンセル"] },
			"Confirm changes": { v: ["変更を承認"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Cancel changes": { v: ["変更をキャンセル"] },
			"Confirm changes": { v: ["変更を承認"] }
		}
	},
	{
		l: "ko",
		t: {
			"Cancel changes": { v: ["변경 취소"] },
			"Confirm changes": { v: ["변경 사항 확인"] }
		}
	},
	{
		l: "lo",
		t: {
			"Cancel changes": { v: ["ຍົກເລີກການປ່ຽນແປງ"] },
			"Confirm changes": { v: ["ຢືນຢັນການປ່ຽນແປງ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Cancel changes": { v: ["Atsisakyti pakeitimų"] },
			"Confirm changes": { v: ["Patvirtinti pakeitimus"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Cancel changes": { v: ["Откажи ги промените"] },
			"Confirm changes": { v: ["Потврди ги промените"] }
		}
	},
	{
		l: "mn",
		t: {
			"Cancel changes": { v: ["Өөрчлөлтийг цуцлах"] },
			"Confirm changes": { v: ["Өөрчлөлтийг баталгаажуулах"] }
		}
	},
	{
		l: "my",
		t: {
			"Cancel changes": { v: ["ပြောင်းလဲမှုများ ပယ်ဖျက်ရန်"] },
			"Confirm changes": { v: ["ပြောင်းလဲမှုများ အတည်ပြုရန်"] }
		}
	},
	{
		l: "nb",
		t: {
			"Cancel changes": { v: ["Avbryt endringer"] },
			"Confirm changes": { v: ["Bekreft endringer"] }
		}
	},
	{
		l: "nl",
		t: {
			"Cancel changes": { v: ["Wijzigingen annuleren"] },
			"Confirm changes": { v: ["Wijzigingen bevestigen"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"Cancel changes": { v: ["Anuluj zmiany"] },
			"Confirm changes": { v: ["Potwierdź zmiany"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Cancel changes": { v: ["Cancelar alterações"] },
			"Confirm changes": { v: ["Confirmar alterações"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Cancel changes": { v: ["Cancelar alterações"] },
			"Confirm changes": { v: ["Confirmar alterações"] }
		}
	},
	{
		l: "ro",
		t: {
			"Cancel changes": { v: ["Anulează modificările"] },
			"Confirm changes": { v: ["Confirmă modificările"] }
		}
	},
	{
		l: "ru",
		t: {
			"Cancel changes": { v: ["Отменить изменения"] },
			"Confirm changes": { v: ["Подтвердить изменения"] }
		}
	},
	{
		l: "sk",
		t: {
			"Cancel changes": { v: ["Zrušiť zmeny"] },
			"Confirm changes": { v: ["Potvrdiť zmeny"] }
		}
	},
	{
		l: "sl",
		t: {
			"Cancel changes": { v: ["Prekliči spremembe"] },
			"Confirm changes": { v: ["Potrdi spremembe"] }
		}
	},
	{
		l: "sr",
		t: {
			"Cancel changes": { v: ["Откажи измене"] },
			"Confirm changes": { v: ["Потврдите измене"] }
		}
	},
	{
		l: "sv",
		t: {
			"Cancel changes": { v: ["Avbryt ändringar"] },
			"Confirm changes": { v: ["Bekräfta ändringar"] }
		}
	},
	{
		l: "tr",
		t: {
			"Cancel changes": { v: ["Değişiklikleri iptal et"] },
			"Confirm changes": { v: ["Değişiklikleri onayla"] }
		}
	},
	{
		l: "uk",
		t: {
			"Cancel changes": { v: ["Скасувати зміни"] },
			"Confirm changes": { v: ["Підтвердити зміни"] }
		}
	},
	{
		l: "uz",
		t: {
			"Cancel changes": { v: ["O'zgarishlarni bekor qilish"] },
			"Confirm changes": { v: ["O'zgarishlarni tasdiqlang"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Cancel changes": { v: ["取消更改"] },
			"Confirm changes": { v: ["确认更改"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Cancel changes": { v: ["取消更改"] },
			"Confirm changes": { v: ["確認更改"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Cancel changes": { v: ["取消變更"] },
			"Confirm changes": { v: ["確認變更"] }
		}
	}
], uy = [
	{
		l: "ar",
		t: {
			"Clear selected": { v: ["محو المحدّد"] },
			"Deselect {option}": { v: ["إلغاء تحديد {option}"] },
			"No results": { v: ["ليس هناك أية نتيجة"] },
			Options: { v: ["خيارات"] }
		}
	},
	{
		l: "ast",
		t: {
			"Clear selected": { v: ["Borrar lo seleicionao"] },
			"Deselect {option}": { v: ["Deseleicionar «{option}»"] },
			"No results": { v: ["Nun hai nengún resultáu"] },
			Options: { v: ["Opciones"] }
		}
	},
	{
		l: "br",
		t: { "No results": { v: ["Disoc'h ebet"] } }
	},
	{
		l: "ca",
		t: { "No results": { v: ["Sense resultats"] } }
	},
	{
		l: "cs",
		t: {
			"Clear selected": { v: ["Vyčistit vybrané"] },
			"Deselect {option}": { v: ["Zrušit výběr {option}"] },
			"No results": { v: ["Nic nenalezeno"] },
			Options: { v: ["Možnosti"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Clear selected": { v: ["Vyčistit vybrané"] },
			"Deselect {option}": { v: ["Zrušit výběr {option}"] },
			"No results": { v: ["Nic nenalezeno"] },
			Options: { v: ["Možnosti"] }
		}
	},
	{
		l: "da",
		t: {
			"Clear selected": { v: ["Ryd valgte"] },
			"Deselect {option}": { v: ["Fravælg {option}"] },
			"No results": { v: ["Ingen resultater"] },
			Options: { v: ["Valgmuligheder"] }
		}
	},
	{
		l: "de",
		t: {
			"Clear selected": { v: ["Auswahl leeren"] },
			"Deselect {option}": { v: ["{option} abwählen"] },
			"No results": { v: ["Keine Ergebnisse"] },
			Options: { v: ["Optionen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Clear selected": { v: ["Auswahl leeren"] },
			"Deselect {option}": { v: ["{option} abwählen"] },
			"No results": { v: ["Keine Ergebnisse"] },
			Options: { v: ["Optionen"] }
		}
	},
	{
		l: "el",
		t: {
			"Clear selected": { v: ["Εκκαθάριση επιλογής"] },
			"Deselect {option}": { v: ["Αποεπιλογή {option}"] },
			"No results": { v: ["Κανένα αποτέλεσμα"] },
			Options: { v: ["Επιλογές"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Clear selected": { v: ["Clear selected"] },
			"Deselect {option}": { v: ["Deselect {option}"] },
			"No results": { v: ["No results"] },
			Options: { v: ["Options"] }
		}
	},
	{
		l: "eo",
		t: { "No results": { v: ["La rezulto forestas"] } }
	},
	{
		l: "es",
		t: {
			"Clear selected": { v: ["Limpiar selección"] },
			"Deselect {option}": { v: ["Deseleccionar {option}"] },
			"No results": { v: [" Ningún resultado"] },
			Options: { v: ["Opciones"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Clear selected": { v: ["Limpiar selección"] },
			"Deselect {option}": { v: ["Deseleccionar {option}"] },
			"No results": { v: ["Sin resultados"] },
			Options: { v: ["Opciones"] }
		}
	},
	{
		l: "es-EC",
		t: { "No results": { v: ["Sin resultados"] } }
	},
	{
		l: "es-MX",
		t: {
			"Clear selected": { v: ["Limpiar selección"] },
			"Deselect {option}": { v: ["Deseleccionar {option}"] },
			"No results": { v: ["Sin resultados"] },
			Options: { v: ["Opciones"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Clear selected": { v: ["Tühjenda valik"] },
			"Deselect {option}": { v: ["Eemalda {option} valik"] },
			"No results": { v: ["Tulemusi pole"] },
			Options: { v: ["Valikud"] }
		}
	},
	{
		l: "eu",
		t: { "No results": { v: ["Emaitzarik ez"] } }
	},
	{
		l: "fa",
		t: {
			"Clear selected": { v: ["پاک کردن مورد انتخاب شده"] },
			"Deselect {option}": { v: ["لغو انتخاب {option}"] },
			"No results": { v: ["بدون هیچ نتیجه‌ای"] },
			Options: { v: ["گزینه‌ها"] }
		}
	},
	{
		l: "fi",
		t: {
			"Clear selected": { v: ["Tyhjennä valitut"] },
			"Deselect {option}": { v: ["Poista valinta {option}"] },
			"No results": { v: ["Ei tuloksia"] },
			Options: { v: ["Valinnat"] }
		}
	},
	{
		l: "fr",
		t: {
			"Clear selected": { v: ["Vider la sélection"] },
			"Deselect {option}": { v: ["Désélectionner {option}"] },
			"No results": { v: ["Aucun résultat"] },
			Options: { v: ["Options"] }
		}
	},
	{
		l: "ga",
		t: {
			"Clear selected": { v: ["Glan roghnaithe"] },
			"Deselect {option}": { v: ["Díroghnaigh {option}"] },
			"No results": { v: ["Gan torthaí"] },
			Options: { v: ["Roghanna"] }
		}
	},
	{
		l: "gl",
		t: {
			"Clear selected": { v: ["Limpar o seleccionado"] },
			"Deselect {option}": { v: ["Desmarcar {option}"] },
			"No results": { v: ["Sen resultados"] },
			Options: { v: ["Opcións"] }
		}
	},
	{
		l: "he",
		t: { "No results": { v: ["אין תוצאות"] } }
	},
	{
		l: "hr",
		t: {
			"Clear selected": { v: ["Očisti odabir"] },
			"Deselect {option}": { v: ["Odznači {option}"] },
			"No results": { v: ["Nema rezultata"] },
			Options: { v: ["Mogućnosti"] }
		}
	},
	{
		l: "hu",
		t: {
			"Clear selected": { v: ["Kijelölés törlése"] },
			"Deselect {option}": { v: ["{option} kijelölésének megszüntetése"] },
			"No results": { v: ["Nincs találat"] },
			Options: { v: ["Beállítások"] }
		}
	},
	{
		l: "id",
		t: {
			"Clear selected": { v: ["Hapus terpilih"] },
			"Deselect {option}": { v: ["Batalkan pemilihan {option}"] },
			"No results": { v: ["Tidak ada hasil"] },
			Options: { v: ["Opsi"] }
		}
	},
	{
		l: "is",
		t: {
			"Clear selected": { v: ["Hreinsa valið"] },
			"Deselect {option}": { v: ["Afvelja {option}"] },
			"No results": { v: ["Engar niðurstöður"] },
			Options: { v: ["Valkostir"] }
		}
	},
	{
		l: "it",
		t: {
			"Clear selected": { v: ["Cancella selezionati"] },
			"Deselect {option}": { v: ["Deselezionare {option}"] },
			"No results": { v: ["Nessun risultato"] }
		}
	},
	{
		l: "ja",
		t: {
			"Clear selected": { v: ["選択を解除"] },
			"Deselect {option}": { v: ["{option} の選択を解除"] },
			"No results": { v: ["結果無し"] },
			Options: { v: ["オプション"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Clear selected": { v: ["選択を解除"] },
			"Deselect {option}": { v: ["{option} の選択を解除"] },
			"No results": { v: ["結果無し"] },
			Options: { v: ["オプション"] }
		}
	},
	{
		l: "ko",
		t: {
			"Clear selected": { v: ["선택 항목 지우기"] },
			"Deselect {option}": { v: ["{option} 선택 해제"] },
			"No results": { v: ["결과 없음"] },
			Options: { v: ["옵션"] }
		}
	},
	{
		l: "lo",
		t: {
			"Clear selected": { v: ["ລຶບສິ່ງທີ່ເລືອກ"] },
			"Deselect {option}": { v: ["ຍົກເລີກການເລືອກ {option}"] },
			"No results": { v: ["ບໍ່ມີຜົນລັບ"] },
			Options: { v: ["ຕົວເລືອກ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Clear selected": { v: ["Išvalyti pasirinkimą"] },
			"Deselect {option}": { v: ["Panaikinkite {option} pasirinkimą"] },
			"No results": { v: ["Nėra rezultatų"] },
			Options: { v: ["Parinktys"] }
		}
	},
	{
		l: "lv",
		t: { "No results": { v: ["Nav rezultātu"] } }
	},
	{
		l: "mk",
		t: {
			"Clear selected": { v: ["Исчисти означени"] },
			"Deselect {option}": { v: ["Откажи избор на {option}"] },
			"No results": { v: ["Нема резултати"] },
			Options: { v: ["Опции"] }
		}
	},
	{
		l: "mn",
		t: {
			"Clear selected": { v: ["Сонголтыг цэвэрлэх"] },
			"Deselect {option}": { v: ["{option}-г сонголтоос хасах"] },
			"No results": { v: ["Үр дүн алга"] },
			Options: { v: ["Тохиргоо"] }
		}
	},
	{
		l: "my",
		t: { "No results": { v: ["ရလဒ်မရှိပါ"] } }
	},
	{
		l: "nb",
		t: {
			"Clear selected": { v: ["Tøm merket"] },
			"Deselect {option}": { v: ["Opphev valg {option}"] },
			"No results": { v: ["Ingen resultater"] },
			Options: { v: ["Alternativer"] }
		}
	},
	{
		l: "nl",
		t: {
			"Clear selected": { v: ["Selectie wissen"] },
			"Deselect {option}": { v: ["Selectie {option} opheffen"] },
			"No results": { v: ["Geen resultaten"] },
			Options: { v: ["Opties"] }
		}
	},
	{
		l: "oc",
		t: { "No results": { v: ["Cap de resultat"] } }
	},
	{
		l: "pl",
		t: {
			"Clear selected": { v: ["Wyczyść wybrane"] },
			"Deselect {option}": { v: ["Odznacz {option}"] },
			"No results": { v: ["Brak wyników"] },
			Options: { v: ["Opcje"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Clear selected": { v: ["Limpar selecionado"] },
			"Deselect {option}": { v: ["Desselecionar {option}"] },
			"No results": { v: ["Sem resultados"] },
			Options: { v: ["Opções"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Clear selected": { v: ["Limpeza selecionada"] },
			"Deselect {option}": { v: ["Desmarcar {option}"] },
			"No results": { v: ["Sem resultados"] },
			Options: { v: ["Opções"] }
		}
	},
	{
		l: "ro",
		t: {
			"Clear selected": { v: ["Șterge selecția"] },
			"Deselect {option}": { v: ["Deselectează {option}"] },
			"No results": { v: ["Niciun rezultat"] },
			Options: { v: ["Opțiuni"] }
		}
	},
	{
		l: "ru",
		t: {
			"Clear selected": { v: ["Снять выбор"] },
			"Deselect {option}": { v: ["Отменить выбор {option}"] },
			"No results": { v: ["Ничего не найдено"] },
			Options: { v: ["Варианты"] }
		}
	},
	{
		l: "sk",
		t: {
			"Clear selected": { v: ["Vymazať vybraté"] },
			"Deselect {option}": { v: ["Zrušiť výber {option}"] },
			"No results": { v: ["Žiadne výsledky"] },
			Options: { v: ["možnosti"] }
		}
	},
	{
		l: "sl",
		t: { "No results": { v: ["Ni zadetkov"] } }
	},
	{
		l: "sr",
		t: {
			"Clear selected": { v: ["Обриши изабрано"] },
			"Deselect {option}": { v: ["Уклони избор {option}"] },
			"No results": { v: ["Нема резултата"] },
			Options: { v: ["Опције"] }
		}
	},
	{
		l: "sv",
		t: {
			"Clear selected": { v: ["Rensa valda"] },
			"Deselect {option}": { v: ["Avmarkera {option}"] },
			"No results": { v: ["Inga resultat"] },
			Options: { v: ["Alternativ"] }
		}
	},
	{
		l: "tr",
		t: {
			"Clear selected": { v: ["Seçilmişleri temizle"] },
			"Deselect {option}": { v: ["{option} bırak"] },
			"No results": { v: ["Herhangi bir sonuç bulunamadı"] },
			Options: { v: ["Seçenekler"] }
		}
	},
	{
		l: "uk",
		t: {
			"Clear selected": { v: ["Очистити вибране"] },
			"Deselect {option}": { v: ["Зняти вибір {option}"] },
			"No results": { v: ["Відсутні результати"] },
			Options: { v: ["Параметри"] }
		}
	},
	{
		l: "uz",
		t: {
			"Clear selected": { v: ["Tanlanganni tozalash"] },
			"Deselect {option}": { v: ["{option}tanlovni bekor qiling"] },
			"No results": { v: ["Natija yoʻq"] },
			Options: { v: ["Variantlar"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Clear selected": { v: ["清除所选"] },
			"Deselect {option}": { v: ["取消选择 {option}"] },
			"No results": { v: ["无结果"] },
			Options: { v: ["选项"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Clear selected": { v: ["清除所選項目"] },
			"Deselect {option}": { v: ["取消選擇 {option}"] },
			"No results": { v: ["無結果"] },
			Options: { v: ["選項"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Clear selected": { v: ["清除選定項目"] },
			"Deselect {option}": { v: ["取消選取 {option}"] },
			"No results": { v: ["無結果"] },
			Options: { v: ["選項"] }
		}
	}
], dy = [
	{
		l: "ar",
		t: {
			"Clear text": { v: ["محو النص"] },
			"Save changes": { v: ["حفظ التغييرات"] }
		}
	},
	{
		l: "ast",
		t: {
			"Clear text": { v: ["Borrar el testu"] },
			"Save changes": { v: ["Guardar los cambeos"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: { "Clear text": { v: ["Netejar text"] } }
	},
	{
		l: "cs",
		t: {
			"Clear text": { v: ["Čitelný text"] },
			"Save changes": { v: ["Uložit změny"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Clear text": { v: ["Čitelný text"] },
			"Save changes": { v: ["Uložit změny"] }
		}
	},
	{
		l: "da",
		t: {
			"Clear text": { v: ["Ryd tekst"] },
			"Save changes": { v: ["Gem ændringer"] }
		}
	},
	{
		l: "de",
		t: {
			"Clear text": { v: ["Klartext"] },
			"Save changes": { v: ["Änderungen speichern"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Clear text": { v: ["Klartext"] },
			"Save changes": { v: ["Änderungen speichern"] }
		}
	},
	{
		l: "el",
		t: {
			"Clear text": { v: ["Εκκαθάριση κειμένου"] },
			"Save changes": { v: ["Αποθήκευση αλλαγών"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Clear text": { v: ["Clear text"] },
			"Save changes": { v: ["Save changes"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Clear text": { v: ["Limpiar texto"] },
			"Save changes": { v: ["Guardar cambios"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Clear text": { v: ["Limpiar texto"] },
			"Save changes": { v: ["Guardar cambios"] }
		}
	},
	{
		l: "es-EC",
		t: { "Clear text": { v: ["Limpiar texto"] } }
	},
	{
		l: "es-MX",
		t: {
			"Clear text": { v: ["Limpiar texto"] },
			"Save changes": { v: ["Guardar cambios"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Clear text": { v: ["Kustuta tekst"] },
			"Save changes": { v: ["Salvesta muudatused"] }
		}
	},
	{
		l: "eu",
		t: { "Clear text": { v: ["Garbitu testua"] } }
	},
	{
		l: "fa",
		t: {
			"Clear text": { v: ["پاک کردن متن"] },
			"Save changes": { v: ["ذخیرهٔ تغییرات"] }
		}
	},
	{
		l: "fi",
		t: {
			"Clear text": { v: ["Tyhjennä teksti"] },
			"Save changes": { v: ["Tallenna muutokset"] }
		}
	},
	{
		l: "fr",
		t: {
			"Clear text": { v: ["Effacer le texte"] },
			"Save changes": { v: ["Enregistrer les modifications"] }
		}
	},
	{
		l: "ga",
		t: {
			"Clear text": { v: ["Glan téacs"] },
			"Save changes": { v: ["Sabháil na hathruithe"] }
		}
	},
	{
		l: "gl",
		t: {
			"Clear text": { v: ["Limpar o texto"] },
			"Save changes": { v: ["Gardar os cambios"] }
		}
	},
	{
		l: "he",
		t: { "Clear text": { v: ["פינוי טקסט"] } }
	},
	{
		l: "hr",
		t: {
			"Clear text": { v: ["Očisti tekst"] },
			"Save changes": { v: ["Spremi promjene"] }
		}
	},
	{
		l: "hu",
		t: {
			"Clear text": { v: ["Szöveg törlése"] },
			"Save changes": { v: ["Változtatások mentése"] }
		}
	},
	{
		l: "id",
		t: {
			"Clear text": { v: ["Bersihkan teks"] },
			"Save changes": { v: ["Simpan perubahan"] }
		}
	},
	{
		l: "is",
		t: {
			"Clear text": { v: ["Hreinsa texta"] },
			"Save changes": { v: ["Vista breytingar"] }
		}
	},
	{
		l: "it",
		t: {
			"Clear text": { v: ["Cancella il testo"] },
			"Save changes": { v: ["Salva le modifiche"] }
		}
	},
	{
		l: "ja",
		t: {
			"Clear text": { v: ["テキストをクリア"] },
			"Save changes": { v: ["変更を保存"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Clear text": { v: ["テキストをクリア"] },
			"Save changes": { v: ["変更を保存"] }
		}
	},
	{
		l: "ko",
		t: {
			"Clear text": { v: ["텍스트 지우기"] },
			"Save changes": { v: ["변경 사항 저장"] }
		}
	},
	{
		l: "lo",
		t: {
			"Clear text": { v: ["ລຶບຂໍ້ຄວາມ"] },
			"Save changes": { v: ["ບັນທຶກການປ່ຽນແປງ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Clear text": { v: ["Išvalyti tekstą"] },
			"Save changes": { v: ["Įrašyti pakeitimus"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Clear text": { v: ["Исчисти текст"] },
			"Save changes": { v: ["Зачувај промени"] }
		}
	},
	{
		l: "mn",
		t: {
			"Clear text": { v: ["Текстийг цэвэрлэх"] },
			"Save changes": { v: ["Өөрчлөлтийг хадгалах"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			"Clear text": { v: ["Fjern tekst"] },
			"Save changes": { v: ["Lagre endringer"] }
		}
	},
	{
		l: "nl",
		t: {
			"Clear text": { v: ["Tekst wissen"] },
			"Save changes": { v: ["Wijzigingen opslaan"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"Clear text": { v: ["Wyczyść tekst"] },
			"Save changes": { v: ["Zapisz zmiany"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Clear text": { v: ["Limpar texto"] },
			"Save changes": { v: ["Salvar alterações"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Clear text": { v: ["Limpar texto"] },
			"Save changes": { v: ["Gravar alterações"] }
		}
	},
	{
		l: "ro",
		t: {
			"Clear text": { v: ["Golește textul"] },
			"Save changes": { v: ["Salvează modificările"] }
		}
	},
	{
		l: "ru",
		t: {
			"Clear text": { v: ["Очистить текст"] },
			"Save changes": { v: ["Сохранить изменения"] }
		}
	},
	{
		l: "sk",
		t: {
			"Clear text": { v: ["Vamazať text"] },
			"Save changes": { v: ["Uložiť zmeny"] }
		}
	},
	{
		l: "sl",
		t: { "Clear text": { v: ["Počisti besedilo"] } }
	},
	{
		l: "sr",
		t: {
			"Clear text": { v: ["Обриши текст"] },
			"Save changes": { v: ["Сачувај измене"] }
		}
	},
	{
		l: "sv",
		t: {
			"Clear text": { v: ["Rensa text"] },
			"Save changes": { v: ["Spara ändringar"] }
		}
	},
	{
		l: "tr",
		t: {
			"Clear text": { v: ["Metni temizle"] },
			"Save changes": { v: ["Değişiklikleri kaydet"] }
		}
	},
	{
		l: "uk",
		t: {
			"Clear text": { v: ["Очистити текст"] },
			"Save changes": { v: ["Зберегти зміни"] }
		}
	},
	{
		l: "uz",
		t: {
			"Clear text": { v: ["Matnni tozalash"] },
			"Save changes": { v: ["O'zgarishlarni saqlang"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Clear text": { v: ["清除文本"] },
			"Save changes": { v: ["保存修改"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Clear text": { v: ["清除文本"] },
			"Save changes": { v: ["保存更改"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Clear text": { v: ["清除文字"] },
			"Save changes": { v: ["儲存變更"] }
		}
	}
], fy = [
	{
		l: "ar",
		t: { "Clear value": { v: ["مَحو القيمة"] } }
	},
	{
		l: "ast",
		t: {}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: { "Clear value": { v: ["Vyčistit hodnotu"] } }
	},
	{
		l: "cs-CZ",
		t: {}
	},
	{
		l: "da",
		t: { "Clear value": { v: ["Ryd værdi"] } }
	},
	{
		l: "de",
		t: { "Clear value": { v: ["Wert löschen"] } }
	},
	{
		l: "de-DE",
		t: { "Clear value": { v: ["Wert löschen"] } }
	},
	{
		l: "el",
		t: { "Clear value": { v: ["Εκκαθάριση αξίας"] } }
	},
	{
		l: "en-GB",
		t: { "Clear value": { v: ["Clear value"] } }
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {}
	},
	{
		l: "es-AR",
		t: {}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {}
	},
	{
		l: "et-EE",
		t: { "Clear value": { v: ["Kustuta väärtus"] } }
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {}
	},
	{
		l: "fi",
		t: {}
	},
	{
		l: "fr",
		t: { "Clear value": { v: ["Effacer la valeur"] } }
	},
	{
		l: "ga",
		t: { "Clear value": { v: ["Luach soiléir"] } }
	},
	{
		l: "gl",
		t: { "Clear value": { v: ["Limpar o valor"] } }
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: { "Clear value": { v: ["Očisti vrijednost"] } }
	},
	{
		l: "hu",
		t: { "Clear value": { v: ["Érték törlése"] } }
	},
	{
		l: "id",
		t: { "Clear value": { v: ["Hapus nilai"] } }
	},
	{
		l: "is",
		t: {}
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: { "Clear value": { v: ["値をクリア"] } }
	},
	{
		l: "ja-JP",
		t: {}
	},
	{
		l: "ko",
		t: { "Clear value": { v: ["값 지우기"] } }
	},
	{
		l: "lo",
		t: { "Clear value": { v: ["ລຶບຄ່າ"] } }
	},
	{
		l: "lt-LT",
		t: { "Clear value": { v: ["Aiški vertė"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "Clear value": { v: ["Исчисти вредност"] } }
	},
	{
		l: "mn",
		t: { "Clear value": { v: ["Утгыг цэвэрлэх"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {}
	},
	{
		l: "nl",
		t: { "Clear value": { v: ["Waarde wissen"] } }
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {}
	},
	{
		l: "pt-BR",
		t: { "Clear value": { v: ["Limpar valor"] } }
	},
	{
		l: "pt-PT",
		t: { "Clear value": { v: ["Limpar valor"] } }
	},
	{
		l: "ro",
		t: { "Clear value": { v: ["Golește valoarea"] } }
	},
	{
		l: "ru",
		t: { "Clear value": { v: ["Очистить значение"] } }
	},
	{
		l: "sk",
		t: {}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: { "Clear value": { v: ["Обриши вредност"] } }
	},
	{
		l: "sv",
		t: { "Clear value": { v: ["Rensa värdet"] } }
	},
	{
		l: "tr",
		t: { "Clear value": { v: ["Değeri temizle"] } }
	},
	{
		l: "uk",
		t: { "Clear value": { v: ["Очистити значення"] } }
	},
	{
		l: "uz",
		t: { "Clear value": { v: ["Qiymatni tozalash"] } }
	},
	{
		l: "zh-CN",
		t: {}
	},
	{
		l: "zh-HK",
		t: { "Clear value": { v: ["清除值"] } }
	},
	{
		l: "zh-TW",
		t: { "Clear value": { v: ["清除值"] } }
	}
], py = [
	{
		l: "ar",
		t: { Close: { v: ["إغلاق"] } }
	},
	{
		l: "ast",
		t: { Close: { v: ["Zarrar"] } }
	},
	{
		l: "br",
		t: { Close: { v: ["Serriñ"] } }
	},
	{
		l: "ca",
		t: { Close: { v: ["Tanca"] } }
	},
	{
		l: "cs",
		t: { Close: { v: ["Zavřít"] } }
	},
	{
		l: "cs-CZ",
		t: { Close: { v: ["Zavřít"] } }
	},
	{
		l: "da",
		t: { Close: { v: ["Luk"] } }
	},
	{
		l: "de",
		t: { Close: { v: ["Schließen"] } }
	},
	{
		l: "de-DE",
		t: { Close: { v: ["Schließen"] } }
	},
	{
		l: "el",
		t: { Close: { v: ["Κλείσιμο"] } }
	},
	{
		l: "en-GB",
		t: { Close: { v: ["Close"] } }
	},
	{
		l: "eo",
		t: { Close: { v: ["Fermu"] } }
	},
	{
		l: "es",
		t: { Close: { v: ["Cerrar"] } }
	},
	{
		l: "es-AR",
		t: { Close: { v: ["Cerrar"] } }
	},
	{
		l: "es-EC",
		t: { Close: { v: ["Cerrar"] } }
	},
	{
		l: "es-MX",
		t: { Close: { v: ["Cerrar"] } }
	},
	{
		l: "et-EE",
		t: { Close: { v: ["Sulge"] } }
	},
	{
		l: "eu",
		t: { Close: { v: ["Itxi"] } }
	},
	{
		l: "fa",
		t: { Close: { v: ["بستن"] } }
	},
	{
		l: "fi",
		t: { Close: { v: ["Sulje"] } }
	},
	{
		l: "fr",
		t: { Close: { v: ["Fermer"] } }
	},
	{
		l: "ga",
		t: { Close: { v: ["Dún"] } }
	},
	{
		l: "gl",
		t: { Close: { v: ["Pechar"] } }
	},
	{
		l: "he",
		t: { Close: { v: ["סגירה"] } }
	},
	{
		l: "hr",
		t: { Close: { v: ["Zatvori"] } }
	},
	{
		l: "hu",
		t: { Close: { v: ["Bezárás"] } }
	},
	{
		l: "id",
		t: { Close: { v: ["Tutup"] } }
	},
	{
		l: "is",
		t: { Close: { v: ["Loka"] } }
	},
	{
		l: "it",
		t: { Close: { v: ["Chiudi"] } }
	},
	{
		l: "ja",
		t: { Close: { v: ["閉じる"] } }
	},
	{
		l: "ja-JP",
		t: { Close: { v: ["閉じる"] } }
	},
	{
		l: "ko",
		t: { Close: { v: ["닫기"] } }
	},
	{
		l: "lo",
		t: { Close: { v: ["ປິດ"] } }
	},
	{
		l: "lt-LT",
		t: { Close: { v: ["Užverti"] } }
	},
	{
		l: "lv",
		t: { Close: { v: ["Aizvērt"] } }
	},
	{
		l: "mk",
		t: { Close: { v: ["Затвори"] } }
	},
	{
		l: "mn",
		t: { Close: { v: ["Хаах"] } }
	},
	{
		l: "my",
		t: { Close: { v: ["ပိတ်ရန်"] } }
	},
	{
		l: "nb",
		t: { Close: { v: ["Lukk"] } }
	},
	{
		l: "nl",
		t: { Close: { v: ["Sluiten"] } }
	},
	{
		l: "oc",
		t: { Close: { v: ["Tampar"] } }
	},
	{
		l: "pl",
		t: { Close: { v: ["Zamknij"] } }
	},
	{
		l: "pt-BR",
		t: { Close: { v: ["Fechar"] } }
	},
	{
		l: "pt-PT",
		t: { Close: { v: ["Fechar"] } }
	},
	{
		l: "ro",
		t: { Close: { v: ["Închide"] } }
	},
	{
		l: "ru",
		t: { Close: { v: ["Закрыть"] } }
	},
	{
		l: "sk",
		t: { Close: { v: ["Zavrieť"] } }
	},
	{
		l: "sl",
		t: { Close: { v: ["Zapri"] } }
	},
	{
		l: "sr",
		t: { Close: { v: ["Затвори"] } }
	},
	{
		l: "sv",
		t: { Close: { v: ["Stäng"] } }
	},
	{
		l: "tr",
		t: { Close: { v: ["Kapat"] } }
	},
	{
		l: "uk",
		t: { Close: { v: ["Закрити"] } }
	},
	{
		l: "uz",
		t: { Close: { v: ["Yopish"] } }
	},
	{
		l: "zh-CN",
		t: { Close: { v: ["关闭"] } }
	},
	{
		l: "zh-HK",
		t: { Close: { v: ["關閉"] } }
	},
	{
		l: "zh-TW",
		t: { Close: { v: ["關閉"] } }
	}
], my = [
	{
		l: "ar",
		t: {
			"Close navigation": { v: ["إغلاق التصفح"] },
			"Open navigation": { v: ["فتح التنقُّل"] }
		}
	},
	{
		l: "ast",
		t: {
			"Close navigation": { v: ["Zarrar la navegación"] },
			"Open navigation": { v: ["Abrir la navegación"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {
			"Close navigation": { v: ["Tanca la navegació"] },
			"Open navigation": { v: ["Obre la navegació"] }
		}
	},
	{
		l: "cs",
		t: {
			"Close navigation": { v: ["Zavřít navigaci"] },
			"Open navigation": { v: ["Otevřít navigaci"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Close navigation": { v: ["Zavřít navigaci"] },
			"Open navigation": { v: ["Otevřít navigaci"] }
		}
	},
	{
		l: "da",
		t: {
			"Close navigation": { v: ["Luk navigation"] },
			"Open navigation": { v: ["Åbn navigation"] }
		}
	},
	{
		l: "de",
		t: {
			"Close navigation": { v: ["Navigation schließen"] },
			"Open navigation": { v: ["Navigation öffnen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Close navigation": { v: ["Navigation schließen"] },
			"Open navigation": { v: ["Navigation öffnen"] }
		}
	},
	{
		l: "el",
		t: {
			"Close navigation": { v: ["Κλείσιμο πλοήγησης"] },
			"Open navigation": { v: ["Άνοιγμα πλοήγησης"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Close navigation": { v: ["Close navigation"] },
			"Open navigation": { v: ["Open navigation"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Close navigation": { v: ["Cerrar navegación"] },
			"Open navigation": { v: ["Abrir navegación"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Close navigation": { v: ["Cerrar navegación"] },
			"Open navigation": { v: ["Abrir navegación"] }
		}
	},
	{
		l: "es-EC",
		t: {
			"Close navigation": { v: ["Cerrar navegación"] },
			"Open navigation": { v: ["Abrir navegación"] }
		}
	},
	{
		l: "es-MX",
		t: {
			"Close navigation": { v: ["Cerrar navegación"] },
			"Open navigation": { v: ["Abrir navegación"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Close navigation": { v: ["Sulge navigatsioon"] },
			"Open navigation": { v: ["Ava liikumisvaade"] }
		}
	},
	{
		l: "eu",
		t: {
			"Close navigation": { v: ["Itxi nabigazioa"] },
			"Open navigation": { v: ["Ireki nabigazioa"] }
		}
	},
	{
		l: "fa",
		t: {
			"Close navigation": { v: ["بستن بخش ناوبری"] },
			"Open navigation": { v: ["باز کردن بخش ناوبری"] }
		}
	},
	{
		l: "fi",
		t: { "Close navigation": { v: ["Sulje navigaatio"] } }
	},
	{
		l: "fr",
		t: {
			"Close navigation": { v: ["Fermer la navigation"] },
			"Open navigation": { v: ["Ouvrir la navigation"] }
		}
	},
	{
		l: "ga",
		t: {
			"Close navigation": { v: ["Dún nascleanúint"] },
			"Open navigation": { v: ["Oscail nascleanúint"] }
		}
	},
	{
		l: "gl",
		t: {
			"Close navigation": { v: ["Pechar a navegación"] },
			"Open navigation": { v: ["Abrir a navegación"] }
		}
	},
	{
		l: "he",
		t: {
			"Close navigation": { v: ["סגירת הניווט"] },
			"Open navigation": { v: ["פתיחת ניווט"] }
		}
	},
	{
		l: "hr",
		t: {
			"Close navigation": { v: ["Zatvori navigaciju"] },
			"Open navigation": { v: ["Otvori navigaciju"] }
		}
	},
	{
		l: "hu",
		t: {
			"Close navigation": { v: ["Navigáció bezárása"] },
			"Open navigation": { v: ["Navigáció megnyitása"] }
		}
	},
	{
		l: "id",
		t: {
			"Close navigation": { v: ["Tutup navigasi"] },
			"Open navigation": { v: ["Buka navigasi"] }
		}
	},
	{
		l: "is",
		t: { "Close navigation": { v: ["Loka leiðsagnarsleða"] } }
	},
	{
		l: "it",
		t: {
			"Close navigation": { v: ["Chiudi la navigazione"] },
			"Open navigation": { v: ["Apri la navigazione"] }
		}
	},
	{
		l: "ja",
		t: {
			"Close navigation": { v: ["ナビゲーションを閉じる"] },
			"Open navigation": { v: ["ナビゲーションを開く"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Close navigation": { v: ["ナビゲーションを閉じる"] },
			"Open navigation": { v: ["ナビゲーションを開く"] }
		}
	},
	{
		l: "ko",
		t: {
			"Close navigation": { v: ["탐색 닫기"] },
			"Open navigation": { v: ["탐색 열기"] }
		}
	},
	{
		l: "lo",
		t: {
			"Close navigation": { v: ["ປິດການນຳທາງ"] },
			"Open navigation": { v: ["ເປີດການນຳທາງ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Close navigation": { v: ["Užverti naršymą"] },
			"Open navigation": { v: ["Atverti naršymą"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Close navigation": { v: ["Затвори навигација"] },
			"Open navigation": { v: ["Отвори навигација"] }
		}
	},
	{
		l: "mn",
		t: {
			"Close navigation": { v: ["Навигацийг хаах"] },
			"Open navigation": { v: ["Навигацийг нээх"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			"Close navigation": { v: ["Lukk navigasjon"] },
			"Open navigation": { v: ["Åpne navigasjon"] }
		}
	},
	{
		l: "nl",
		t: {
			"Close navigation": { v: ["Navigatie sluiten"] },
			"Open navigation": { v: ["Navigatie openen"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "Close navigation": { v: ["Zamknij nawigację"] } }
	},
	{
		l: "pt-BR",
		t: {
			"Close navigation": { v: ["Fechar navegação"] },
			"Open navigation": { v: ["Abrir navegação"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Close navigation": { v: ["Fechar navegação"] },
			"Open navigation": { v: ["Abrir navegação"] }
		}
	},
	{
		l: "ro",
		t: {
			"Close navigation": { v: ["Închide navigarea"] },
			"Open navigation": { v: ["Deschide navigarea"] }
		}
	},
	{
		l: "ru",
		t: {
			"Close navigation": { v: ["Закрыть навигацию"] },
			"Open navigation": { v: ["Открыть навигацию"] }
		}
	},
	{
		l: "sk",
		t: { "Close navigation": { v: ["Zavrieť navigáciu"] } }
	},
	{
		l: "sl",
		t: {
			"Close navigation": { v: ["Zapri krmarjenje"] },
			"Open navigation": { v: ["Odpri krmarjenje"] }
		}
	},
	{
		l: "sr",
		t: {
			"Close navigation": { v: ["Затвори навигацију"] },
			"Open navigation": { v: ["Отвори навигацију"] }
		}
	},
	{
		l: "sv",
		t: {
			"Close navigation": { v: ["Stäng navigeringen"] },
			"Open navigation": { v: ["Öppna navigeringen"] }
		}
	},
	{
		l: "tr",
		t: {
			"Close navigation": { v: ["Gezinmeyi kapat"] },
			"Open navigation": { v: ["Gezinmeyi aç"] }
		}
	},
	{
		l: "uk",
		t: {
			"Close navigation": { v: ["Закрити навігацію"] },
			"Open navigation": { v: ["Перейти до навігації"] }
		}
	},
	{
		l: "uz",
		t: {
			"Close navigation": { v: ["Navigatsiyani yopish"] },
			"Open navigation": { v: ["Navigatsiyani oching"] }
		}
	},
	{
		l: "zh-CN",
		t: { "Close navigation": { v: ["关闭导航"] } }
	},
	{
		l: "zh-HK",
		t: {
			"Close navigation": { v: ["關閉導航"] },
			"Open navigation": { v: ["開啟導航"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Close navigation": { v: ["關閉導航"] },
			"Open navigation": { v: ["開啟導航"] }
		}
	}
], hy = [
	{
		l: "ar",
		t: {
			"Collapse menu": { v: ["طي القائمة"] },
			"Open menu": { v: ["إفتَح القائمة"] }
		}
	},
	{
		l: "ast",
		t: {
			"Collapse menu": { v: ["Recoyer el menú"] },
			"Open menu": { v: ["Abrir le menú"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			"Collapse menu": { v: ["Sbalit nabídku"] },
			"Open menu": { v: ["Otevřít nabídku"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Collapse menu": { v: ["Sbalit nabídku"] },
			"Open menu": { v: ["Otevřít nabídku"] }
		}
	},
	{
		l: "da",
		t: {
			"Collapse menu": { v: ["Fold menuen sammen"] },
			"Open menu": { v: ["Åbn menu"] }
		}
	},
	{
		l: "de",
		t: {
			"Collapse menu": { v: ["Menü einklappen"] },
			"Open menu": { v: ["Menü öffnen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Collapse menu": { v: ["Menü einklappen"] },
			"Open menu": { v: ["Menü öffnen"] }
		}
	},
	{
		l: "el",
		t: {
			"Collapse menu": { v: ["Σύμπτυξη μενού"] },
			"Open menu": { v: ["Άνοιγμα μενού"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Collapse menu": { v: ["Collapse menu"] },
			"Open menu": { v: ["Open menu"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Collapse menu": { v: ["Ocultar menú"] },
			"Open menu": { v: ["Abrir menú"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Collapse menu": { v: ["Ocultar menú"] },
			"Open menu": { v: ["Abrir menú"] }
		}
	},
	{
		l: "es-EC",
		t: {
			"Collapse menu": { v: ["Ocultar menú"] },
			"Open menu": { v: ["Abrir menú"] }
		}
	},
	{
		l: "es-MX",
		t: {
			"Collapse menu": { v: ["Ocultar menú"] },
			"Open menu": { v: ["Abrir menú"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Collapse menu": { v: ["Ahenda menüü"] },
			"Open menu": { v: ["Ava menüü"] }
		}
	},
	{
		l: "eu",
		t: {
			"Collapse menu": { v: ["Tolestu menua"] },
			"Open menu": { v: ["Ireki menua"] }
		}
	},
	{
		l: "fa",
		t: {
			"Collapse menu": { v: ["بستن فهرست"] },
			"Open menu": { v: ["باز کردن فهرست"] }
		}
	},
	{
		l: "fi",
		t: {
			"Collapse menu": { v: ["Supista valikko"] },
			"Open menu": { v: ["Avaa valikko"] }
		}
	},
	{
		l: "fr",
		t: {
			"Collapse menu": { v: ["Réduire le menu"] },
			"Open menu": { v: ["Ouvrir le menu"] }
		}
	},
	{
		l: "ga",
		t: {
			"Collapse menu": { v: ["Roghchlár Laghdaigh"] },
			"Open menu": { v: ["Roghchlár a oscailt"] }
		}
	},
	{
		l: "gl",
		t: {
			"Collapse menu": { v: ["Contraer o menú"] },
			"Open menu": { v: ["Abrir o menú"] }
		}
	},
	{
		l: "he",
		t: {
			"Collapse menu": { v: ["צמצום התפריט"] },
			"Open menu": { v: ["פתיחת תפריט"] }
		}
	},
	{
		l: "hr",
		t: {
			"Collapse menu": { v: ["Sakrij izbornik"] },
			"Open menu": { v: ["Otvori izbornik"] }
		}
	},
	{
		l: "hu",
		t: {
			"Collapse menu": { v: ["Menü összecsukása"] },
			"Open menu": { v: ["Menü megnyitása"] }
		}
	},
	{
		l: "id",
		t: {
			"Collapse menu": { v: ["Ciutkan menu"] },
			"Open menu": { v: ["Buka menu"] }
		}
	},
	{
		l: "is",
		t: {
			"Collapse menu": { v: ["Fella valmynd saman"] },
			"Open menu": { v: ["Opna valmynd"] }
		}
	},
	{
		l: "it",
		t: {
			"Collapse menu": { v: ["Chiudi Menu"] },
			"Open menu": { v: ["Apri il menu"] }
		}
	},
	{
		l: "ja",
		t: {
			"Collapse menu": { v: ["メニューの折りたたみ"] },
			"Open menu": { v: ["メニューを開く"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Collapse menu": { v: ["メニューの折りたたみ"] },
			"Open menu": { v: ["メニューを開く"] }
		}
	},
	{
		l: "ko",
		t: {
			"Collapse menu": { v: ["메뉴 접기"] },
			"Open menu": { v: ["메뉴 열기"] }
		}
	},
	{
		l: "lo",
		t: {
			"Collapse menu": { v: ["ຫຍໍ້ເມນູ"] },
			"Open menu": { v: ["ເປີດເມນູ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Collapse menu": { v: ["Suskleisti meniu"] },
			"Open menu": { v: ["Atverti meniu"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Collapse menu": { v: ["Скриј мени"] },
			"Open menu": { v: ["Отвори мени"] }
		}
	},
	{
		l: "mn",
		t: {
			"Collapse menu": { v: ["Цэсийг хураах"] },
			"Open menu": { v: ["Цэсийг нээх"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			"Collapse menu": { v: ["Skjul meny"] },
			"Open menu": { v: ["Åpne meny"] }
		}
	},
	{
		l: "nl",
		t: {
			"Collapse menu": { v: ["Menu inklappen"] },
			"Open menu": { v: ["Menu openen"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"Collapse menu": { v: ["Zwiń menu"] },
			"Open menu": { v: ["Otwórz menu"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Collapse menu": { v: ["Recolher menu"] },
			"Open menu": { v: ["Abrir menu"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Collapse menu": { v: ["Ocultar menu"] },
			"Open menu": { v: ["Abrir menu"] }
		}
	},
	{
		l: "ro",
		t: {
			"Collapse menu": { v: ["Restrânge meniul"] },
			"Open menu": { v: ["Deschide meniul"] }
		}
	},
	{
		l: "ru",
		t: {
			"Collapse menu": { v: ["Свернуть меню"] },
			"Open menu": { v: ["Открыть меню"] }
		}
	},
	{
		l: "sk",
		t: {
			"Collapse menu": { v: ["Zbaliť menu"] },
			"Open menu": { v: ["Otvoriť menu"] }
		}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {
			"Collapse menu": { v: ["Сажми мени"] },
			"Open menu": { v: ["Отвори мени"] }
		}
	},
	{
		l: "sv",
		t: {
			"Collapse menu": { v: ["Fäll ihop menyn"] },
			"Open menu": { v: ["Öppna menyn"] }
		}
	},
	{
		l: "tr",
		t: {
			"Collapse menu": { v: ["Menüyü daralt"] },
			"Open menu": { v: ["Menüyü aç"] }
		}
	},
	{
		l: "uk",
		t: {
			"Collapse menu": { v: ["Згорнути меню"] },
			"Open menu": { v: ["Відкрити меню"] }
		}
	},
	{
		l: "uz",
		t: {
			"Collapse menu": { v: ["Menyuni yig‘ish"] },
			"Open menu": { v: ["Menyuni oching"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Collapse menu": { v: ["收起菜单"] },
			"Open menu": { v: ["打开菜单"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Collapse menu": { v: ["折疊選單"] },
			"Open menu": { v: ["開啟選單"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Collapse menu": { v: ["折疊選單"] },
			"Open menu": { v: ["開啟選單"] }
		}
	}
], gy = [
	{
		l: "ar",
		t: {}
	},
	{
		l: "ast",
		t: {}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			Copied: { v: ["Zkopírováno"] },
			"Copy to clipboard": { v: ["Zkopírovat do schránky"] }
		}
	},
	{
		l: "cs-CZ",
		t: {}
	},
	{
		l: "da",
		t: {
			Copied: { v: ["Kopieret"] },
			"Copy to clipboard": { v: ["Kopiér til udklipsholderen"] }
		}
	},
	{
		l: "de",
		t: {
			Copied: { v: ["Kopiert"] },
			"Copy to clipboard": { v: ["In die Zwischenablage kopieren"] }
		}
	},
	{
		l: "de-DE",
		t: {
			Copied: { v: ["Kopiert"] },
			"Copy to clipboard": { v: ["In die Zwischenablage kopieren"] }
		}
	},
	{
		l: "el",
		t: {}
	},
	{
		l: "en-GB",
		t: {
			Copied: { v: ["Copied"] },
			"Copy to clipboard": { v: ["Copy to clipboard"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {}
	},
	{
		l: "es-AR",
		t: {}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {}
	},
	{
		l: "et-EE",
		t: {
			Copied: { v: ["Kopeeritud"] },
			"Copy to clipboard": { v: ["Kopeeri lõikelauale"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {}
	},
	{
		l: "fi",
		t: {}
	},
	{
		l: "fr",
		t: {
			Copied: { v: ["Copié"] },
			"Copy to clipboard": { v: ["Copier dans le presse-papiers"] }
		}
	},
	{
		l: "ga",
		t: {
			Copied: { v: ["Cóipeáilte"] },
			"Copy to clipboard": { v: ["Cóipeáil chuig an ghearrthaisce"] }
		}
	},
	{
		l: "gl",
		t: {
			Copied: { v: ["Copiado"] },
			"Copy to clipboard": { v: ["Copiar ao portapapeis"] }
		}
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: {
			Copied: { v: ["Kopirano"] },
			"Copy to clipboard": { v: ["Kopiraj u međuspremnik"] }
		}
	},
	{
		l: "hu",
		t: {
			Copied: { v: ["Másolva"] },
			"Copy to clipboard": { v: ["Vágólapra másolás"] }
		}
	},
	{
		l: "id",
		t: {
			Copied: { v: ["Disalin"] },
			"Copy to clipboard": { v: ["Salin ke clipboard"] }
		}
	},
	{
		l: "is",
		t: {}
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: {
			Copied: { v: ["コピーされました"] },
			"Copy to clipboard": { v: ["クリップボードにコピー"] }
		}
	},
	{
		l: "ja-JP",
		t: {}
	},
	{
		l: "ko",
		t: {
			Copied: { v: ["복사됨"] },
			"Copy to clipboard": { v: ["클립보드로 복사"] }
		}
	},
	{
		l: "lo",
		t: {
			Copied: { v: ["ສຳເນົາແລ້ວ"] },
			"Copy to clipboard": { v: ["ສຳເນົາໃສ່ຄລິບບອດ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			Copied: { v: ["Nukopijuota"] },
			"Copy to clipboard": { v: ["Kopijuoti į iškarpinę"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			Copied: { v: ["Копирано"] },
			"Copy to clipboard": { v: ["Копирај во клипбоард"] }
		}
	},
	{
		l: "mn",
		t: {
			Copied: { v: ["Хуулагдлаа"] },
			"Copy to clipboard": { v: ["Санах ой руу хуулах"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {}
	},
	{
		l: "nl",
		t: {
			Copied: { v: ["Gekopieerd"] },
			"Copy to clipboard": { v: ["Kopieer naar klembord"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {}
	},
	{
		l: "pt-BR",
		t: {
			Copied: { v: ["Copiado"] },
			"Copy to clipboard": { v: ["Copiar para a área de transferência"] }
		}
	},
	{
		l: "pt-PT",
		t: {}
	},
	{
		l: "ro",
		t: {
			Copied: { v: ["Copiat"] },
			"Copy to clipboard": { v: ["Copiază în clipboard"] }
		}
	},
	{
		l: "ru",
		t: {
			Copied: { v: ["Скопировано"] },
			"Copy to clipboard": { v: ["Скопировать в буфер обмена"] }
		}
	},
	{
		l: "sk",
		t: {}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {}
	},
	{
		l: "sv",
		t: {
			Copied: { v: ["Kopierat"] },
			"Copy to clipboard": { v: ["Kopiera till urklipp"] }
		}
	},
	{
		l: "tr",
		t: {
			Copied: { v: ["Kopyalandı"] },
			"Copy to clipboard": { v: ["Panoya kopyalandı"] }
		}
	},
	{
		l: "uk",
		t: {}
	},
	{
		l: "uz",
		t: {
			Copied: { v: ["Nusxalandi"] },
			"Copy to clipboard": { v: ["Buferga nusxalash"] }
		}
	},
	{
		l: "zh-CN",
		t: {}
	},
	{
		l: "zh-HK",
		t: {
			Copied: { v: ["已被複製"] },
			"Copy to clipboard": { v: ["複製到剪貼簿"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			Copied: { v: ["已被複製"] },
			"Copy to clipboard": { v: ["複製到剪貼簿"] }
		}
	}
], _y = [
	{
		l: "ar",
		t: { "Edit item": { v: ["تعديل عنصر"] } }
	},
	{
		l: "ast",
		t: { "Edit item": { v: ["Editar l'elementu"] } }
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: { "Edit item": { v: ["Edita l'element"] } }
	},
	{
		l: "cs",
		t: { "Edit item": { v: ["Upravit položku"] } }
	},
	{
		l: "cs-CZ",
		t: { "Edit item": { v: ["Upravit položku"] } }
	},
	{
		l: "da",
		t: { "Edit item": { v: ["Rediger element"] } }
	},
	{
		l: "de",
		t: { "Edit item": { v: ["Element bearbeiten"] } }
	},
	{
		l: "de-DE",
		t: { "Edit item": { v: ["Element bearbeiten"] } }
	},
	{
		l: "el",
		t: { "Edit item": { v: ["Επεξεργασία αντικειμένου"] } }
	},
	{
		l: "en-GB",
		t: { "Edit item": { v: ["Edit item"] } }
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: { "Edit item": { v: ["Editar elemento"] } }
	},
	{
		l: "es-AR",
		t: { "Edit item": { v: ["Editar elemento"] } }
	},
	{
		l: "es-EC",
		t: { "Edit item": { v: ["Editar elemento"] } }
	},
	{
		l: "es-MX",
		t: { "Edit item": { v: ["Editar elemento"] } }
	},
	{
		l: "et-EE",
		t: { "Edit item": { v: ["Muuda objekti"] } }
	},
	{
		l: "eu",
		t: { "Edit item": { v: ["Editatu elementua"] } }
	},
	{
		l: "fa",
		t: { "Edit item": { v: ["ویرایش مورد"] } }
	},
	{
		l: "fi",
		t: { "Edit item": { v: ["Muokkaa kohdetta"] } }
	},
	{
		l: "fr",
		t: { "Edit item": { v: ["Modifier l’élément"] } }
	},
	{
		l: "ga",
		t: { "Edit item": { v: ["Cuir mír in eagar"] } }
	},
	{
		l: "gl",
		t: { "Edit item": { v: ["Editar o elemento"] } }
	},
	{
		l: "he",
		t: { "Edit item": { v: ["עריכת פריט"] } }
	},
	{
		l: "hr",
		t: { "Edit item": { v: ["Uredi stavku"] } }
	},
	{
		l: "hu",
		t: { "Edit item": { v: ["Elem szerkesztése"] } }
	},
	{
		l: "id",
		t: { "Edit item": { v: ["Edit item"] } }
	},
	{
		l: "is",
		t: { "Edit item": { v: ["Breyta atriði"] } }
	},
	{
		l: "it",
		t: { "Edit item": { v: ["Modifica l'elemento"] } }
	},
	{
		l: "ja",
		t: { "Edit item": { v: ["編集"] } }
	},
	{
		l: "ja-JP",
		t: { "Edit item": { v: ["編集"] } }
	},
	{
		l: "ko",
		t: { "Edit item": { v: ["항목 수정"] } }
	},
	{
		l: "lo",
		t: { "Edit item": { v: ["ແກ້ໄຂລາຍການ"] } }
	},
	{
		l: "lt-LT",
		t: { "Edit item": { v: ["Taisyti elementą"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "Edit item": { v: ["Уреди"] } }
	},
	{
		l: "mn",
		t: { "Edit item": { v: ["Зүйлийг засварлах"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: { "Edit item": { v: ["Rediger"] } }
	},
	{
		l: "nl",
		t: { "Edit item": { v: ["Item bewerken"] } }
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "Edit item": { v: ["Edytuj element"] } }
	},
	{
		l: "pt-BR",
		t: { "Edit item": { v: ["Editar item"] } }
	},
	{
		l: "pt-PT",
		t: { "Edit item": { v: ["Editar item"] } }
	},
	{
		l: "ro",
		t: { "Edit item": { v: ["Editează elementul"] } }
	},
	{
		l: "ru",
		t: { "Edit item": { v: ["Изменить элемент"] } }
	},
	{
		l: "sk",
		t: { "Edit item": { v: ["Upraviť položku"] } }
	},
	{
		l: "sl",
		t: { "Edit item": { v: ["Uredi predmet"] } }
	},
	{
		l: "sr",
		t: { "Edit item": { v: ["Уреди ставку"] } }
	},
	{
		l: "sv",
		t: { "Edit item": { v: ["Redigera objektet"] } }
	},
	{
		l: "tr",
		t: { "Edit item": { v: ["Ögeyi düzenle"] } }
	},
	{
		l: "uk",
		t: { "Edit item": { v: ["Редагувати елемент"] } }
	},
	{
		l: "uz",
		t: { "Edit item": { v: ["Elementni tahrirlash"] } }
	},
	{
		l: "zh-CN",
		t: { "Edit item": { v: ["编辑项目"] } }
	},
	{
		l: "zh-HK",
		t: { "Edit item": { v: ["編輯項目"] } }
	},
	{
		l: "zh-TW",
		t: { "Edit item": { v: ["編輯項目"] } }
	}
], vy = [
	{
		l: "ar",
		t: {}
	},
	{
		l: "ast",
		t: {}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			"Edit profile": { v: ["Upravit profil"] },
			"Loading actions": { v: ["Načítání akcí"] },
			"Loading profile": { v: ["Načítání profilu"] },
			"Local time: {time}": { v: ["Místní čas: {time}"] },
			"Profile of {user}": { v: ["Profil uživatele {user}"] },
			"Send message": { v: ["Odeslat zprávu"] },
			"Start call": { v: ["Zahájit hovor"] },
			"View profile": { v: ["Zobrazit profil"] }
		}
	},
	{
		l: "cs-CZ",
		t: {}
	},
	{
		l: "da",
		t: {
			"Edit profile": { v: ["Rediger profil"] },
			"Loading actions": { v: ["Indlæser handlinger"] },
			"Loading profile": { v: ["Indlæser profil"] },
			"Local time: {time}": { v: ["Lokal tid: {time}"] },
			"Profile of {user}": { v: ["Profil for {user}"] },
			"Send message": { v: ["Send besked"] },
			"Start call": { v: ["Start opkald"] },
			"View profile": { v: ["Vis profil"] }
		}
	},
	{
		l: "de",
		t: {
			"Edit profile": { v: ["Profil bearbeiten"] },
			"Loading actions": { v: ["Aktionen werden geladen"] },
			"Loading profile": { v: ["Profil wird geladen"] },
			"Local time: {time}": { v: ["Ortszeit: {time}"] },
			"Profile of {user}": { v: ["Profil von {user}"] },
			"Send message": { v: ["Nachricht senden"] },
			"Start call": { v: ["Anruf starten"] },
			"View profile": { v: ["Profil anzeigen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Edit profile": { v: ["Profil bearbeiten"] },
			"Loading actions": { v: ["Aktionen werden geladen"] },
			"Loading profile": { v: ["Profil wird geladen"] },
			"Local time: {time}": { v: ["Ortszeit: {time}"] },
			"Profile of {user}": { v: ["Profil von {user}"] },
			"Send message": { v: ["Nachricht senden"] },
			"Start call": { v: ["Anruf starten"] },
			"View profile": { v: ["Profil anzeigen"] }
		}
	},
	{
		l: "el",
		t: {}
	},
	{
		l: "en-GB",
		t: {
			"Edit profile": { v: ["Edit profile"] },
			"Loading actions": { v: ["Loading actions"] },
			"Loading profile": { v: ["Loading profile"] },
			"Local time: {time}": { v: ["Local time: {time}"] },
			"Profile of {user}": { v: ["Profile of {user}"] },
			"Send message": { v: ["Send message"] },
			"Start call": { v: ["Start call"] },
			"View profile": { v: ["View profile"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {}
	},
	{
		l: "es-AR",
		t: {}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {}
	},
	{
		l: "et-EE",
		t: {
			"Edit profile": { v: ["Muuda profiili"] },
			"Loading actions": { v: ["Laadin tegevusi"] },
			"Loading profile": { v: ["Laadin profiili"] },
			"Local time: {time}": { v: ["Kohalik aeg: {time}"] },
			"Profile of {user}": { v: ["Kasutaja profiil: {user}"] },
			"Send message": { v: ["Saada sõnum"] },
			"Start call": { v: ["Helista"] },
			"View profile": { v: ["Vaata profiili"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {}
	},
	{
		l: "fi",
		t: {}
	},
	{
		l: "fr",
		t: {
			"Edit profile": { v: ["Modifier le profil"] },
			"Loading actions": { v: ["Chargement des actions"] },
			"Loading profile": { v: ["Chargement du profil"] },
			"Local time: {time}": { v: ["Heure locale\xA0: {time}"] },
			"Profile of {user}": { v: ["Profil de {user}"] },
			"Send message": { v: ["Envoyer un message"] },
			"Start call": { v: ["Lancer un appel"] },
			"View profile": { v: ["Voir le profil"] }
		}
	},
	{
		l: "ga",
		t: {
			"Edit profile": { v: ["Cuir an phróifíl in eagar"] },
			"Loading actions": { v: ["Ag luchtú gníomhartha"] },
			"Loading profile": { v: ["Ag luchtú an phróifíle"] },
			"Local time: {time}": { v: ["Am áitiúil: {time}"] },
			"Profile of {user}": { v: ["Próifíl {user}"] },
			"Send message": { v: ["Seol teachtaireacht"] },
			"Start call": { v: ["Cuir tús leis an nglao"] },
			"View profile": { v: ["Féach ar an bpróifíl"] }
		}
	},
	{
		l: "gl",
		t: {}
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: {}
	},
	{
		l: "hu",
		t: {}
	},
	{
		l: "id",
		t: {}
	},
	{
		l: "is",
		t: {}
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: {
			"Edit profile": { v: ["プロフィールを編集する"] },
			"Loading actions": { v: ["アクションの読み込み中"] },
			"Loading profile": { v: ["プロフィールを読み込み中"] },
			"Local time: {time}": { v: ["現地時間：{time}"] },
			"Profile of {user}": { v: ["{user}のプロフィール"] },
			"Send message": { v: ["メッセージを送信"] },
			"Start call": { v: ["通話を開始する"] },
			"View profile": { v: ["プロフィールを表示"] }
		}
	},
	{
		l: "ja-JP",
		t: {}
	},
	{
		l: "ko",
		t: {}
	},
	{
		l: "lo",
		t: {}
	},
	{
		l: "lt-LT",
		t: {}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {}
	},
	{
		l: "mn",
		t: {}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {}
	},
	{
		l: "nl",
		t: {}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {}
	},
	{
		l: "pt-BR",
		t: {
			"Edit profile": { v: ["Editar perfil"] },
			"Loading actions": { v: ["Carregando ações"] },
			"Loading profile": { v: ["Carregando perfil"] },
			"Local time: {time}": { v: ["Hora local: {time}"] },
			"Profile of {user}": { v: ["Perfil de {user}"] },
			"Send message": { v: ["Enviar mensagem"] },
			"Start call": { v: ["Iniciar chamada"] },
			"View profile": { v: ["Ver perfil"] }
		}
	},
	{
		l: "pt-PT",
		t: {}
	},
	{
		l: "ro",
		t: {
			"Edit profile": { v: ["Editează profilul"] },
			"Loading actions": { v: ["Se încarcă acțiunile"] },
			"Loading profile": { v: ["Se încarcă profilul"] },
			"Local time: {time}": { v: ["Ora locală: {time}"] },
			"Profile of {user}": { v: ["Profilul lui {user}"] },
			"Send message": { v: ["Trimite mesajul"] },
			"Start call": { v: ["Începe apelul"] },
			"View profile": { v: ["Vezi profilul"] }
		}
	},
	{
		l: "ru",
		t: {
			"Edit profile": { v: ["Изменить профиль"] },
			"Loading actions": { v: ["Загрузка действий"] },
			"Loading profile": { v: ["Загрузка профиля"] },
			"Local time: {time}": { v: ["Местное время: {time}"] },
			"Profile of {user}": { v: ["Профиль {user}"] },
			"Send message": { v: ["Отправить сообщение"] },
			"Start call": { v: ["Начать звонок"] },
			"View profile": { v: ["Открыть профиль"] }
		}
	},
	{
		l: "sk",
		t: {}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {}
	},
	{
		l: "sv",
		t: {
			"Edit profile": { v: ["Redigera profil"] },
			"Loading actions": { v: ["Läser in åtgärder"] },
			"Loading profile": { v: ["Läser in profil"] },
			"Local time: {time}": { v: ["Lokal tid: {time}"] },
			"Profile of {user}": { v: ["Profil för {user}"] },
			"Send message": { v: ["Skicka meddelande"] },
			"Start call": { v: ["Starta samtal"] },
			"View profile": { v: ["Visa profil"] }
		}
	},
	{
		l: "tr",
		t: {
			"Edit profile": { v: ["Profili düzenle"] },
			"Loading actions": { v: ["İşlemler yükleniyor"] },
			"Loading profile": { v: ["Profil yükleniyor"] },
			"Local time: {time}": { v: ["Yerel zaman: {time}"] },
			"Profile of {user}": { v: ["{user} profili"] },
			"Send message": { v: ["İleti gönder"] },
			"Start call": { v: ["Çağrı başlat"] },
			"View profile": { v: ["Profili görüntüle"] }
		}
	},
	{
		l: "uk",
		t: {}
	},
	{
		l: "uz",
		t: {}
	},
	{
		l: "zh-CN",
		t: {}
	},
	{
		l: "zh-HK",
		t: {
			"Edit profile": { v: ["編輯個人資料"] },
			"Loading actions": { v: ["正在載入操作"] },
			"Loading profile": { v: ["正在載入個人資料"] },
			"Local time: {time}": { v: ["當地時間：{time}"] },
			"Profile of {user}": { v: ["{user} 的個人資料"] },
			"Send message": { v: ["傳送訊息"] },
			"Start call": { v: ["開始通話"] },
			"View profile": { v: ["查看個人資料"] }
		}
	},
	{
		l: "zh-TW",
		t: {}
	}
], yy = [
	{
		l: "ar",
		t: { "Enable interactive view": { v: ["تمكين المنظور التفاعلي"] } }
	},
	{
		l: "ast",
		t: { "Enable interactive view": { v: ["Activar la vista interactiva"] } }
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			"Enable interactive view": { v: ["Zapnout interaktivní zobrazení"] },
			"Widget height": { v: ["Výška ovládacího prvku"] }
		}
	},
	{
		l: "cs-CZ",
		t: {}
	},
	{
		l: "da",
		t: {
			"Enable interactive view": { v: ["Aktivér interaktiv visning"] },
			"Widget height": { v: ["Widgethøjde"] }
		}
	},
	{
		l: "de",
		t: {
			"Enable interactive view": { v: ["Die interaktive Ansicht aktivieren"] },
			"Widget height": { v: ["Widget-Höhe"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Enable interactive view": { v: ["Die interaktive Ansicht aktivieren"] },
			"Widget height": { v: ["Widget-Höhe"] }
		}
	},
	{
		l: "el",
		t: { "Enable interactive view": { v: ["Ενεργοποίηση διαδραστικής προβολής"] } }
	},
	{
		l: "en-GB",
		t: {
			"Enable interactive view": { v: ["Enable interactive view"] },
			"Widget height": { v: ["Widget height"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: { "Enable interactive view": { v: ["Habilitar vista interactiva"] } }
	},
	{
		l: "es-AR",
		t: { "Enable interactive view": { v: ["Habilitar vista interactiva"] } }
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: { "Enable interactive view": { v: ["Habilitar vista interactiva"] } }
	},
	{
		l: "et-EE",
		t: {
			"Enable interactive view": { v: ["Lülita interaktiivne vaade sisse"] },
			"Widget height": { v: ["Vidina kõrgus"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: { "Enable interactive view": { v: ["فعال‌سازی نمای تعاملی"] } }
	},
	{
		l: "fi",
		t: { "Enable interactive view": { v: ["Näytä vuorovaikutteinen näkymä"] } }
	},
	{
		l: "fr",
		t: {
			"Enable interactive view": { v: ["Activer la vue interactive"] },
			"Widget height": { v: ["Hauteur du widget"] }
		}
	},
	{
		l: "ga",
		t: {
			"Enable interactive view": { v: ["Cumasaigh amharc idirghníomhach"] },
			"Widget height": { v: ["Airde an ghiuirléid"] }
		}
	},
	{
		l: "gl",
		t: { "Enable interactive view": { v: ["Activar a vista interactiva"] } }
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: { "Enable interactive view": { v: ["Omogući interaktivni prikaz"] } }
	},
	{
		l: "hu",
		t: { "Enable interactive view": { v: ["Interaktív nézet engedélyezése"] } }
	},
	{
		l: "id",
		t: { "Enable interactive view": { v: ["Aktifkan tampilan interaktif"] } }
	},
	{
		l: "is",
		t: { "Enable interactive view": { v: ["Virkja gagnvirka sýn"] } }
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: {
			"Enable interactive view": { v: ["インタラクティブ・ビューを有効にする"] },
			"Widget height": { v: ["ウィジェットの高さ"] }
		}
	},
	{
		l: "ja-JP",
		t: { "Enable interactive view": { v: ["インタラクティブ・ビューを有効にする"] } }
	},
	{
		l: "ko",
		t: { "Enable interactive view": { v: ["대화형 보기 활성화"] } }
	},
	{
		l: "lo",
		t: { "Enable interactive view": { v: ["ເປີດໃຊ້ງານມຸມມອງໂຕ້ຕອບ"] } }
	},
	{
		l: "lt-LT",
		t: { "Enable interactive view": { v: ["Įgalinti interaktyvų vaizdą"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "Enable interactive view": { v: ["Овозможи интерактивен приказ"] } }
	},
	{
		l: "mn",
		t: { "Enable interactive view": { v: ["Интерактив харагдацыг идэвхжүүлэх"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: { "Enable interactive view": { v: ["Aktiver interaktiv visning"] } }
	},
	{
		l: "nl",
		t: {
			"Enable interactive view": { v: ["Interactieve weergave inschakelen"] },
			"Widget height": { v: ["Hoogte van widget"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "Enable interactive view": { v: ["Włącz widok interaktywny"] } }
	},
	{
		l: "pt-BR",
		t: {
			"Enable interactive view": { v: ["Ativar visualização interativa"] },
			"Widget height": { v: ["Altura do widget"] }
		}
	},
	{
		l: "pt-PT",
		t: { "Enable interactive view": { v: ["Ativar vista interativa"] } }
	},
	{
		l: "ro",
		t: {
			"Enable interactive view": { v: ["Activează vizualizarea interactivă"] },
			"Widget height": { v: ["Înălțimea widgetului"] }
		}
	},
	{
		l: "ru",
		t: {
			"Enable interactive view": { v: ["Включить интерактивный просмотр"] },
			"Widget height": { v: ["Высота виджета"] }
		}
	},
	{
		l: "sk",
		t: { "Enable interactive view": { v: ["Povoliť interaktívny pohľad"] } }
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: { "Enable interactive view": { v: ["Укључи интерактивни приказ"] } }
	},
	{
		l: "sv",
		t: {
			"Enable interactive view": { v: ["Aktivera interaktiv vy"] },
			"Widget height": { v: ["Widgethöjd"] }
		}
	},
	{
		l: "tr",
		t: {
			"Enable interactive view": { v: ["Etkileşimli görünümü aç"] },
			"Widget height": { v: ["Araç takımı yüksekliği"] }
		}
	},
	{
		l: "uk",
		t: { "Enable interactive view": { v: ["Увімкнути інтерактивний перегляд"] } }
	},
	{
		l: "uz",
		t: { "Enable interactive view": { v: ["Interaktiv ko'rinishni yoqing"] } }
	},
	{
		l: "zh-CN",
		t: { "Enable interactive view": { v: ["启用交互视窗"] } }
	},
	{
		l: "zh-HK",
		t: {
			"Enable interactive view": { v: ["啟用互動視圖"] },
			"Widget height": { v: ["小工具高度"] }
		}
	},
	{
		l: "zh-TW",
		t: { "Enable interactive view": { v: ["啟用互動檢視"] } }
	}
], by = [
	{
		l: "ar",
		t: { "Go back to the list": { v: ["عودة إلى القائمة"] } }
	},
	{
		l: "ast",
		t: { "Go back to the list": { v: ["Volver a la llista"] } }
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: { "Go back to the list": { v: ["Torna a la llista"] } }
	},
	{
		l: "cs",
		t: { "Go back to the list": { v: ["Jít zpět na seznam"] } }
	},
	{
		l: "cs-CZ",
		t: { "Go back to the list": { v: ["Jít zpět na seznam"] } }
	},
	{
		l: "da",
		t: { "Go back to the list": { v: ["Tilbage til listen"] } }
	},
	{
		l: "de",
		t: { "Go back to the list": { v: ["Zurück zur Liste"] } }
	},
	{
		l: "de-DE",
		t: { "Go back to the list": { v: ["Zurück zur Liste"] } }
	},
	{
		l: "el",
		t: { "Go back to the list": { v: ["Επιστροφή στην αρχική λίστα"] } }
	},
	{
		l: "en-GB",
		t: { "Go back to the list": { v: ["Go back to the list"] } }
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: { "Go back to the list": { v: ["Volver a la lista"] } }
	},
	{
		l: "es-AR",
		t: { "Go back to the list": { v: ["Volver a la lista"] } }
	},
	{
		l: "es-EC",
		t: { "Go back to the list": { v: ["Volver a la lista"] } }
	},
	{
		l: "es-MX",
		t: { "Go back to the list": { v: ["Regresar a la lista"] } }
	},
	{
		l: "et-EE",
		t: { "Go back to the list": { v: ["Tagasi nimekirja juurde"] } }
	},
	{
		l: "eu",
		t: { "Go back to the list": { v: ["Bueltatu zerrendara"] } }
	},
	{
		l: "fa",
		t: { "Go back to the list": { v: ["برگشت به لیست"] } }
	},
	{
		l: "fi",
		t: { "Go back to the list": { v: ["Takaisin listaan"] } }
	},
	{
		l: "fr",
		t: { "Go back to the list": { v: ["Retourner à la liste"] } }
	},
	{
		l: "ga",
		t: { "Go back to the list": { v: ["Téigh ar ais go dtí an liosta"] } }
	},
	{
		l: "gl",
		t: { "Go back to the list": { v: ["Volver á lista"] } }
	},
	{
		l: "he",
		t: { "Go back to the list": { v: ["חזרה לרשימה"] } }
	},
	{
		l: "hr",
		t: { "Go back to the list": { v: ["Vrati se na popis"] } }
	},
	{
		l: "hu",
		t: { "Go back to the list": { v: ["Ugrás vissza a listához"] } }
	},
	{
		l: "id",
		t: { "Go back to the list": { v: ["Kembali ke daftar"] } }
	},
	{
		l: "is",
		t: { "Go back to the list": { v: ["Fara til baka í listann"] } }
	},
	{
		l: "it",
		t: { "Go back to the list": { v: ["Torna all'elenco"] } }
	},
	{
		l: "ja",
		t: { "Go back to the list": { v: ["リストに戻る"] } }
	},
	{
		l: "ja-JP",
		t: { "Go back to the list": { v: ["リストに戻る"] } }
	},
	{
		l: "ko",
		t: { "Go back to the list": { v: ["목록으로 돌아가기"] } }
	},
	{
		l: "lo",
		t: { "Go back to the list": { v: ["ກັບໄປທີ່ລາຍການ"] } }
	},
	{
		l: "lt-LT",
		t: { "Go back to the list": { v: ["Grįžti į sąrašą"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "Go back to the list": { v: ["Врати се на листата"] } }
	},
	{
		l: "mn",
		t: { "Go back to the list": { v: ["Жагсаалт руу буцах"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: { "Go back to the list": { v: ["Gå tilbake til listen"] } }
	},
	{
		l: "nl",
		t: { "Go back to the list": { v: ["Ga terug naar de lijst"] } }
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "Go back to the list": { v: ["Powrót do listy"] } }
	},
	{
		l: "pt-BR",
		t: { "Go back to the list": { v: ["Voltar para a lista"] } }
	},
	{
		l: "pt-PT",
		t: { "Go back to the list": { v: ["Voltar para a lista"] } }
	},
	{
		l: "ro",
		t: { "Go back to the list": { v: ["Înapoi la listă"] } }
	},
	{
		l: "ru",
		t: { "Go back to the list": { v: ["Вернуться к списку"] } }
	},
	{
		l: "sk",
		t: { "Go back to the list": { v: ["Späť na zoznam"] } }
	},
	{
		l: "sl",
		t: { "Go back to the list": { v: ["Vrni se na seznam"] } }
	},
	{
		l: "sr",
		t: { "Go back to the list": { v: ["Назад на листу"] } }
	},
	{
		l: "sv",
		t: { "Go back to the list": { v: ["Gå tillbaka till listan"] } }
	},
	{
		l: "tr",
		t: { "Go back to the list": { v: ["Listeye dön"] } }
	},
	{
		l: "uk",
		t: { "Go back to the list": { v: ["Повернутися до списку"] } }
	},
	{
		l: "uz",
		t: { "Go back to the list": { v: ["Ro'yxatga qayting"] } }
	},
	{
		l: "zh-CN",
		t: { "Go back to the list": { v: ["返回至列表"] } }
	},
	{
		l: "zh-HK",
		t: { "Go back to the list": { v: ["返回清單"] } }
	},
	{
		l: "zh-TW",
		t: { "Go back to the list": { v: ["回到清單"] } }
	}
], xy = [
	{
		l: "ar",
		t: {
			"Keyboard navigation help": { v: ["مساعدة في التنقل باستعمال لوحة المفاتيح"] },
			"Skip to app navigation": { v: ["تجاوَز إلى التنقل في التطبيق"] },
			"Skip to main content": { v: ["تجاوَز إلى المحتوى الرئيسي"] }
		}
	},
	{
		l: "ast",
		t: {
			"Keyboard navigation help": { v: ["Ayuda de la navegación pente'l tecláu"] },
			"Skip to app navigation": { v: ["Dir a la navegación d'aplicaciones"] },
			"Skip to main content": { v: ["Dir al conteníu principal"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: {
			"Keyboard navigation help": { v: ["Nápověda pro pohyb pomocí klávesnice"] },
			"Skip to app navigation": { v: ["Přeskočit na navigaci aplikace"] },
			"Skip to main content": { v: ["Přeskočit na hlavní obsah"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Keyboard navigation help": { v: ["Nápověda pro pohyb pomocí klávesnice"] },
			"Skip to app navigation": { v: ["Přeskočit na navigaci aplikace"] },
			"Skip to main content": { v: ["Přeskočit na hlavní obsah"] }
		}
	},
	{
		l: "da",
		t: {
			"Keyboard navigation help": { v: ["Hjælp til tastaturnavigation"] },
			"Skip to app navigation": { v: ["Spring til appnavigation"] },
			"Skip to main content": { v: ["Spring til hovedindhold"] }
		}
	},
	{
		l: "de",
		t: {
			"Keyboard navigation help": { v: ["Tastatur-Navigationshilfe"] },
			"Skip to app navigation": { v: ["Zur App-Navigation springen"] },
			"Skip to main content": { v: ["Zum Hauptinhalt springen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Keyboard navigation help": { v: ["Tastatur-Navigationshilfe"] },
			"Skip to app navigation": { v: ["Zur App-Navigation springen"] },
			"Skip to main content": { v: ["Zum Hauptinhalt springen"] }
		}
	},
	{
		l: "el",
		t: {
			"Keyboard navigation help": { v: ["Βοήθεια πλοήγησης με πληκτρολόγιο"] },
			"Skip to app navigation": { v: ["Μετάβαση στην πλοήγηση της εφαρμογής"] },
			"Skip to main content": { v: ["Μετάβαση στο κύριο περιεχόμενο"] }
		}
	},
	{
		l: "en-GB",
		t: {
			"Keyboard navigation help": { v: ["Keyboard navigation help"] },
			"Skip to app navigation": { v: ["Skip to app navigation"] },
			"Skip to main content": { v: ["Skip to main content"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Keyboard navigation help": { v: ["Ayuda de navegación del teclado"] },
			"Skip to app navigation": { v: ["Saltar a la navegación de apps"] },
			"Skip to main content": { v: ["Saltar al contenido principal"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Keyboard navigation help": { v: ["Ayuda de navegación del teclado"] },
			"Skip to app navigation": { v: ["Saltar a la navegación de app"] },
			"Skip to main content": { v: ["Saltar al contenido principal"] }
		}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {
			"Keyboard navigation help": { v: ["Ayuda de navegación del teclado"] },
			"Skip to app navigation": { v: ["Saltar a la navegación de app"] },
			"Skip to main content": { v: ["Saltar al contenido principal"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Keyboard navigation help": { v: ["Klahvistiku kasutuse abiteave"] },
			"Skip to app navigation": { v: ["Suundu rakenduses liikumise valikute juurde"] },
			"Skip to main content": { v: ["Suundu põhisisu juurde"] }
		}
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: {
			"Keyboard navigation help": { v: ["راهنمای ناوبری صفحه کلید"] },
			"Skip to app navigation": { v: ["رفتن به پیمایش برنامه"] },
			"Skip to main content": { v: ["رفتن به محتوای اصلی"] }
		}
	},
	{
		l: "fi",
		t: {
			"Keyboard navigation help": { v: ["Näppäimistönavigoinnin ohje"] },
			"Skip to app navigation": { v: ["Siirry sovelluksen navigaatioon"] },
			"Skip to main content": { v: ["Siirry pääsisältöön"] }
		}
	},
	{
		l: "fr",
		t: {
			"Keyboard navigation help": { v: ["Aide à la navigation au clavier"] },
			"Skip to app navigation": { v: ["Passer à la navigation de l’application"] },
			"Skip to main content": { v: ["Passer au contenu principal"] }
		}
	},
	{
		l: "ga",
		t: {
			"Keyboard navigation help": { v: ["Cabhair le nascleanúint méarchláir"] },
			"Skip to app navigation": { v: ["Téigh ar aghaidh chuig nascleanúint aip"] },
			"Skip to main content": { v: ["Téigh ar aghaidh chuig an bpríomhábhar"] }
		}
	},
	{
		l: "gl",
		t: {
			"Keyboard navigation help": { v: ["Axuda á navegación co teclado"] },
			"Skip to app navigation": { v: ["Ir á navegación da aplicación"] },
			"Skip to main content": { v: ["Ir ao contido principal"] }
		}
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: {
			"Keyboard navigation help": { v: ["Pomoć za navigaciju tipkovnicom"] },
			"Skip to app navigation": { v: ["Preskoči na navigaciju aplikacije"] },
			"Skip to main content": { v: ["Preskoči na glavni sadržaj"] }
		}
	},
	{
		l: "hu",
		t: {
			"Keyboard navigation help": { v: ["Billentyűzetes navigáció súgója"] },
			"Skip to app navigation": { v: ["Ugrás az alkalmazásnavigációhoz"] },
			"Skip to main content": { v: ["Ugrás a fő tartalomhoz"] }
		}
	},
	{
		l: "id",
		t: {
			"Keyboard navigation help": { v: ["Bantuan navigasi keyboard"] },
			"Skip to app navigation": { v: ["Lewati ke navigasi aplikasi"] },
			"Skip to main content": { v: ["Lewati ke konten utama"] }
		}
	},
	{
		l: "is",
		t: {
			"Keyboard navigation help": { v: ["Aðstoð við rötun á lyklaborði"] },
			"Skip to app navigation": { v: ["Sleppa og fara í flakk innan forrits"] },
			"Skip to main content": { v: ["Sleppa og fara í meginefni"] }
		}
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: {
			"Keyboard navigation help": { v: ["キーボード・ナビゲーション・ヘルプ"] },
			"Skip to app navigation": { v: ["アプリのナビゲーションへ移動"] },
			"Skip to main content": { v: ["メインコンテンツへ移動"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Keyboard navigation help": { v: ["キーボード・ナビゲーション・ヘルプ"] },
			"Skip to app navigation": { v: ["アプリのナビゲーションへ移動"] },
			"Skip to main content": { v: ["メインコンテンツへ移動"] }
		}
	},
	{
		l: "ko",
		t: {
			"Keyboard navigation help": { v: ["키보드 탐색 도움말"] },
			"Skip to app navigation": { v: ["앱 탐색으로 건너뛰기"] },
			"Skip to main content": { v: ["본 내용으로 건너뛰기"] }
		}
	},
	{
		l: "lo",
		t: {
			"Keyboard navigation help": { v: ["ການຊ່ວຍເຫຼືອການນຳທາງດ້ວຍຄີບອດ"] },
			"Skip to app navigation": { v: ["ຂ້າມໄປທີ່ການນຳທາງຂອງແອັບ"] },
			"Skip to main content": { v: ["ຂ້າມໄປທີ່ເນື້ອຫາຫຼັກ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Keyboard navigation help": { v: ["Klaviatūros navigacijos pagalba"] },
			"Skip to app navigation": { v: ["Pereiti prie programėlės naršymo"] },
			"Skip to main content": { v: ["Pereiti prie pagrindinio turinio"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Keyboard navigation help": { v: ["Навигација со тастатура"] },
			"Skip to app navigation": { v: ["Прескокни на навигација на апликацијата"] },
			"Skip to main content": { v: ["Прескокни на главна содржина"] }
		}
	},
	{
		l: "mn",
		t: {
			"Keyboard navigation help": { v: ["Гарын навигацийн тусламж"] },
			"Skip to app navigation": { v: ["Аппын навигаци руу алгасах"] },
			"Skip to main content": { v: ["Үндсэн агуулга руу алгасах"] }
		}
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: {
			"Keyboard navigation help": { v: ["Hjelp for tastaturnavigering"] },
			"Skip to app navigation": { v: ["Hopp til appnavigering"] },
			"Skip to main content": { v: ["Hopp til hovedinnhold"] }
		}
	},
	{
		l: "nl",
		t: {
			"Keyboard navigation help": { v: ["Hulp voor toetsenbordnavigatie"] },
			"Skip to app navigation": { v: ["Doorgaan naar app-navigatie"] },
			"Skip to main content": { v: ["Naar hoofdinhoud gaan"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"Keyboard navigation help": { v: ["Pomoc w nawigacji za pomocą klawiatury"] },
			"Skip to app navigation": { v: ["Przewiń do nawigacji"] },
			"Skip to main content": { v: ["Przewiń do głównych treści"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Keyboard navigation help": { v: ["Ajuda para navegação pelo teclado"] },
			"Skip to app navigation": { v: ["Ir para navegação de aplicativo"] },
			"Skip to main content": { v: ["Ir para conteúdo principal"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			"Keyboard navigation help": { v: ["Ajuda à navegação no teclado"] },
			"Skip to app navigation": { v: ["Saltar para navegação da app"] },
			"Skip to main content": { v: ["Saltar para conteúdo principal"] }
		}
	},
	{
		l: "ro",
		t: {
			"Keyboard navigation help": { v: ["Ajutor pentru navigarea cu tastatura"] },
			"Skip to app navigation": { v: ["Salt la navigarea aplicației"] },
			"Skip to main content": { v: ["Salt la conținutul principal"] }
		}
	},
	{
		l: "ru",
		t: {
			"Keyboard navigation help": { v: ["Справка по навигации с помощью клавиатуры"] },
			"Skip to app navigation": { v: ["Перейти к навигации по приложению"] },
			"Skip to main content": { v: ["Перейти к основному содержанию"] }
		}
	},
	{
		l: "sk",
		t: {
			"Keyboard navigation help": { v: ["Pomoc pri navigácii pomocou klávesnice"] },
			"Skip to app navigation": { v: ["Preskočiť na navigáciu v aplikácii"] },
			"Skip to main content": { v: ["Preskočiť na hlavný obsah"] }
		}
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: {
			"Keyboard navigation help": { v: ["Помоћ за навигацију тастатуром"] },
			"Skip to app navigation": { v: ["Прескочи на навигацију апликацијом"] },
			"Skip to main content": { v: ["Прескочи на главни садржај"] }
		}
	},
	{
		l: "sv",
		t: {
			"Keyboard navigation help": { v: ["Hjälp för tangentbordsnavigering"] },
			"Skip to app navigation": { v: ["Hoppa till appnavigeringen"] },
			"Skip to main content": { v: ["Hoppa till huvudinnehåll"] }
		}
	},
	{
		l: "tr",
		t: {
			"Keyboard navigation help": { v: ["Klavye ile gezinme yardımı"] },
			"Skip to app navigation": { v: ["Uygulama gezinmesine git"] },
			"Skip to main content": { v: ["Ana içeriğe git"] }
		}
	},
	{
		l: "uk",
		t: {
			"Keyboard navigation help": { v: ["Допомога з навігацією клавішами"] },
			"Skip to app navigation": { v: ["Пропустити навігацію по застосунках"] },
			"Skip to main content": { v: ["Перейти одразу до головного вмісту"] }
		}
	},
	{
		l: "uz",
		t: {
			"Keyboard navigation help": { v: ["Klaviatura navigatsiyasi yordami"] },
			"Skip to app navigation": { v: ["Ilova navigatsiyasiga oʻtish"] },
			"Skip to main content": { v: ["Asosiy tarkibga o'tish"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Keyboard navigation help": { v: ["键盘导航栏帮助"] },
			"Skip to app navigation": { v: ["跳转至应用程序导航页"] },
			"Skip to main content": { v: ["跳转至主要内容"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Keyboard navigation help": { v: ["鍵盤導航幫助"] },
			"Skip to app navigation": { v: ["跳至應用程式導航"] },
			"Skip to main content": { v: ["跳至主要內容"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Keyboard navigation help": { v: ["鍵盤導航說明"] },
			"Skip to app navigation": { v: ["略過應用程式導覽"] },
			"Skip to main content": { v: ["跳至主要內容"] }
		}
	}
], Sy = [
	{
		l: "ar",
		t: { "Loading\xA0…": { v: ["التحميل جارٍ ..."] } }
	},
	{
		l: "ast",
		t: {}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: { "Loading\xA0…": { v: ["Načítání\xA0…"] } }
	},
	{
		l: "cs-CZ",
		t: {}
	},
	{
		l: "da",
		t: { "Loading\xA0…": { v: ["Indlæser\xA0…"] } }
	},
	{
		l: "de",
		t: { "Loading\xA0…": { v: ["Wird geladen\xA0…"] } }
	},
	{
		l: "de-DE",
		t: { "Loading\xA0…": { v: ["Wird geladen\xA0…"] } }
	},
	{
		l: "el",
		t: { "Loading\xA0…": { v: ["Φόρτωση \xA0…"] } }
	},
	{
		l: "en-GB",
		t: { "Loading\xA0…": { v: ["Loading\xA0…"] } }
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {}
	},
	{
		l: "es-AR",
		t: {}
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: {}
	},
	{
		l: "et-EE",
		t: { "Loading\xA0…": { v: ["Laadin…"] } }
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: { "Loading\xA0…": { v: ["در حال بارگذاری ..."] } }
	},
	{
		l: "fi",
		t: { "Loading\xA0…": { v: ["Ladataan ..."] } }
	},
	{
		l: "fr",
		t: { "Loading\xA0…": { v: ["Chargement…"] } }
	},
	{
		l: "ga",
		t: { "Loading\xA0…": { v: ["Ag lódáil\xA0…"] } }
	},
	{
		l: "gl",
		t: { "Loading\xA0…": { v: ["Cargando…"] } }
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: { "Loading\xA0…": { v: ["Učitavanje\xA0…"] } }
	},
	{
		l: "hu",
		t: { "Loading\xA0…": { v: ["Betöltés…"] } }
	},
	{
		l: "id",
		t: { "Loading\xA0…": { v: ["Memuat\xA0…"] } }
	},
	{
		l: "is",
		t: { "Loading\xA0…": { v: ["Hleð inn\xA0…"] } }
	},
	{
		l: "it",
		t: {}
	},
	{
		l: "ja",
		t: { "Loading\xA0…": { v: ["読み込み中 …"] } }
	},
	{
		l: "ja-JP",
		t: {}
	},
	{
		l: "ko",
		t: { "Loading\xA0…": { v: ["로딩 중 ..."] } }
	},
	{
		l: "lo",
		t: { "Loading\xA0…": { v: ["ກຳລັງໂຫຼດ…"] } }
	},
	{
		l: "lt-LT",
		t: { "Loading\xA0…": { v: ["Įkeliama\xA0…"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "Loading\xA0…": { v: ["Вчитување\xA0…"] } }
	},
	{
		l: "mn",
		t: { "Loading\xA0…": { v: ["Ачаалж байна …"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: { "Loading\xA0…": { v: ["Laster inn..."] } }
	},
	{
		l: "nl",
		t: { "Loading\xA0…": { v: ["Laden\xA0…"] } }
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "Loading\xA0…": { v: ["Wczytywanie…"] } }
	},
	{
		l: "pt-BR",
		t: { "Loading\xA0…": { v: ["Carregando\xA0…"] } }
	},
	{
		l: "pt-PT",
		t: { "Loading\xA0…": { v: ["A carregar..."] } }
	},
	{
		l: "ro",
		t: { "Loading\xA0…": { v: ["Se încarcă\xA0…"] } }
	},
	{
		l: "ru",
		t: { "Loading\xA0…": { v: ["Загрузка\xA0…"] } }
	},
	{
		l: "sk",
		t: { "Loading\xA0…": { v: ["Nahrávam ..."] } }
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: { "Loading\xA0…": { v: ["Учитава се…"] } }
	},
	{
		l: "sv",
		t: { "Loading\xA0…": { v: ["Läser in\xA0…"] } }
	},
	{
		l: "tr",
		t: { "Loading\xA0…": { v: ["Yükleniyor…"] } }
	},
	{
		l: "uk",
		t: { "Loading\xA0…": { v: ["Завантаження\xA0…"] } }
	},
	{
		l: "uz",
		t: { "Loading\xA0…": { v: ["Yuklanmoqda..."] } }
	},
	{
		l: "zh-CN",
		t: { "Loading\xA0…": { v: ["加载中..."] } }
	},
	{
		l: "zh-HK",
		t: { "Loading\xA0…": { v: ["加載中\xA0…"] } }
	},
	{
		l: "zh-TW",
		t: { "Loading\xA0…": { v: ["載入中......"] } }
	}
], Cy = [
	{
		l: "ar",
		t: {
			Next: { v: ["التالي"] },
			"Pause slideshow": { v: ["تجميد عرض الشرائح"] },
			Previous: { v: ["السابق"] },
			"Start slideshow": { v: ["إبدإ العرض"] }
		}
	},
	{
		l: "ast",
		t: {
			Next: { v: ["Siguiente"] },
			"Pause slideshow": { v: ["Posar la presentación de diapositives"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Aniciar la presentación de diapositives"] }
		}
	},
	{
		l: "br",
		t: {
			Next: { v: ["Da heul"] },
			"Pause slideshow": { v: ["Arsav an diaporama"] },
			Previous: { v: ["A-raok"] },
			"Start slideshow": { v: ["Kregiñ an diaporama"] }
		}
	},
	{
		l: "ca",
		t: {
			Next: { v: ["Següent"] },
			"Pause slideshow": { v: ["Atura la presentació"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Inicia la presentació"] }
		}
	},
	{
		l: "cs",
		t: {
			Next: { v: ["Následující"] },
			"Pause slideshow": { v: ["Pozastavit prezentaci"] },
			Previous: { v: ["Předchozí"] },
			"Start slideshow": { v: ["Spustit prezentaci"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			Next: { v: ["Následující"] },
			"Pause slideshow": { v: ["Pozastavit prezentaci"] },
			Previous: { v: ["Předchozí"] },
			"Start slideshow": { v: ["Spustit prezentaci"] }
		}
	},
	{
		l: "da",
		t: {
			Next: { v: ["Næste"] },
			"Pause slideshow": { v: ["Sæt slideshowet på pause"] },
			Previous: { v: ["Forrige"] },
			"Start slideshow": { v: ["Start slideshow"] }
		}
	},
	{
		l: "de",
		t: {
			Next: { v: ["Weiter"] },
			"Pause slideshow": { v: ["Diashow pausieren"] },
			Previous: { v: ["Vorherige"] },
			"Start slideshow": { v: ["Diashow starten"] }
		}
	},
	{
		l: "de-DE",
		t: {
			Next: { v: ["Weiter"] },
			"Pause slideshow": { v: ["Diashow pausieren"] },
			Previous: { v: ["Vorherige"] },
			"Start slideshow": { v: ["Diashow starten"] }
		}
	},
	{
		l: "el",
		t: {
			Next: { v: ["Επόμενο"] },
			"Pause slideshow": { v: ["Παύση προβολής διαφανειών"] },
			Previous: { v: ["Προηγούμενο"] },
			"Start slideshow": { v: ["Έναρξη προβολής διαφανειών"] }
		}
	},
	{
		l: "en-GB",
		t: {
			Next: { v: ["Next"] },
			"Pause slideshow": { v: ["Pause slideshow"] },
			Previous: { v: ["Previous"] },
			"Start slideshow": { v: ["Start slideshow"] }
		}
	},
	{
		l: "eo",
		t: {
			Next: { v: ["Sekva"] },
			"Pause slideshow": { v: ["Payzi bildprezenton"] },
			Previous: { v: ["Antaŭa"] },
			"Start slideshow": { v: ["Komenci bildprezenton"] }
		}
	},
	{
		l: "es",
		t: {
			Next: { v: ["Siguiente"] },
			"Pause slideshow": { v: ["Pausar la presentación "] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Iniciar la presentación"] }
		}
	},
	{
		l: "es-AR",
		t: {
			Next: { v: ["Siguiente"] },
			"Pause slideshow": { v: ["Pausar la presentación "] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Iniciar la presentación"] }
		}
	},
	{
		l: "es-EC",
		t: {
			Next: { v: ["Siguiente"] },
			"Pause slideshow": { v: ["Pausar presentación de diapositivas"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Iniciar presentación de diapositivas"] }
		}
	},
	{
		l: "es-MX",
		t: {
			Next: { v: ["Siguiente"] },
			"Pause slideshow": { v: ["Pausar presentación de diapositivas"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Iniciar presentación de diapositivas"] }
		}
	},
	{
		l: "et-EE",
		t: {
			Next: { v: ["Edasi"] },
			"Pause slideshow": { v: ["Slaidiesitluse paus"] },
			Previous: { v: ["Eelmine"] },
			"Start slideshow": { v: ["Alusta slaidiesitust"] }
		}
	},
	{
		l: "eu",
		t: {
			Next: { v: ["Hurrengoa"] },
			"Pause slideshow": { v: ["Pausatu diaporama"] },
			Previous: { v: ["Aurrekoa"] },
			"Start slideshow": { v: ["Hasi diaporama"] }
		}
	},
	{
		l: "fa",
		t: {
			Next: { v: ["بعدی"] },
			"Pause slideshow": { v: ["توقف نمایش اسلاید"] },
			Previous: { v: ["قبلی"] },
			"Start slideshow": { v: ["شروع نمایش اسلاید"] }
		}
	},
	{
		l: "fi",
		t: {
			Next: { v: ["Seuraava"] },
			"Pause slideshow": { v: ["Keskeytä diaesitys"] },
			Previous: { v: ["Edellinen"] },
			"Start slideshow": { v: ["Aloita diaesitys"] }
		}
	},
	{
		l: "fr",
		t: {
			Next: { v: ["Suivant"] },
			"Pause slideshow": { v: ["Mettre le diaporama en pause"] },
			Previous: { v: ["Précédent"] },
			"Start slideshow": { v: ["Démarrer le diaporama"] }
		}
	},
	{
		l: "ga",
		t: {
			Next: { v: ["Ar aghaidh"] },
			"Pause slideshow": { v: ["Cuir taispeántas sleamhnán ar sos"] },
			Previous: { v: ["Roimhe Seo"] },
			"Start slideshow": { v: ["Tosaigh taispeántas sleamhnán"] }
		}
	},
	{
		l: "gl",
		t: {
			Next: { v: ["Seguinte"] },
			"Pause slideshow": { v: ["Pausar o diaporama"] },
			Previous: { v: ["Anterir"] },
			"Start slideshow": { v: ["Iniciar o diaporama"] }
		}
	},
	{
		l: "he",
		t: {
			Next: { v: ["הבא"] },
			"Pause slideshow": { v: ["השהיית מצגת"] },
			Previous: { v: ["הקודם"] },
			"Start slideshow": { v: ["התחלת המצגת"] }
		}
	},
	{
		l: "hr",
		t: {
			Next: { v: ["Sljedeće"] },
			"Pause slideshow": { v: ["Pauziraj dijaprojekciju"] },
			Previous: { v: ["Prethodno"] },
			"Start slideshow": { v: ["Pokreni dijaprojekciju"] }
		}
	},
	{
		l: "hu",
		t: {
			Next: { v: ["Következő"] },
			"Pause slideshow": { v: ["Diavetítés szüneteltetése"] },
			Previous: { v: ["Előző"] },
			"Start slideshow": { v: ["Diavetítés indítása"] }
		}
	},
	{
		l: "id",
		t: {
			Next: { v: ["Selanjutnya"] },
			"Pause slideshow": { v: ["Jeda tayangan slide"] },
			Previous: { v: ["Sebelumnya"] },
			"Start slideshow": { v: ["Mulai salindia"] }
		}
	},
	{
		l: "is",
		t: {
			Next: { v: ["Næsta"] },
			"Pause slideshow": { v: ["Gera hlé á skyggnusýningu"] },
			Previous: { v: ["Fyrri"] },
			"Start slideshow": { v: ["Byrja skyggnusýningu"] }
		}
	},
	{
		l: "it",
		t: {
			Next: { v: ["Successivo"] },
			"Pause slideshow": { v: ["Presentazione in pausa"] },
			Previous: { v: ["Precedente"] },
			"Start slideshow": { v: ["Avvia presentazione"] }
		}
	},
	{
		l: "ja",
		t: {
			Next: { v: ["次"] },
			"Pause slideshow": { v: ["スライドショーを一時停止"] },
			Previous: { v: ["前"] },
			"Start slideshow": { v: ["スライドショーを開始"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			Next: { v: ["次"] },
			"Pause slideshow": { v: ["スライドショーを一時停止"] },
			Previous: { v: ["前"] },
			"Start slideshow": { v: ["スライドショーを開始"] }
		}
	},
	{
		l: "ko",
		t: {
			Next: { v: ["다음"] },
			"Pause slideshow": { v: ["슬라이드쇼 일시정지"] },
			Previous: { v: ["이전"] },
			"Start slideshow": { v: ["슬라이드쇼 시작"] }
		}
	},
	{
		l: "lo",
		t: {
			Next: { v: ["ຕໍ່ໄປ"] },
			"Pause slideshow": { v: ["ຢຸດສະໄລ້ໂຊຊົ່ວຄາວ"] },
			Previous: { v: ["ກ່ອນໜ້າ"] },
			"Start slideshow": { v: ["ເລີ່ມສະໄລ້ໂຊ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			Next: { v: ["Kitas"] },
			"Pause slideshow": { v: ["Pristabdyti skaidrių rodymą"] },
			Previous: { v: ["Ankstesnis"] },
			"Start slideshow": { v: ["Pradėti skaidrių rodymą"] }
		}
	},
	{
		l: "lv",
		t: {
			Next: { v: ["Nākamais"] },
			"Pause slideshow": { v: ["Pauzēt slaidrādi"] },
			Previous: { v: ["Iepriekšējais"] },
			"Start slideshow": { v: ["Sākt slaidrādi"] }
		}
	},
	{
		l: "mk",
		t: {
			Next: { v: ["Следно"] },
			"Pause slideshow": { v: ["Пузирај слајдшоу"] },
			Previous: { v: ["Предходно"] },
			"Start slideshow": { v: ["Стартувај слајдшоу"] }
		}
	},
	{
		l: "mn",
		t: {
			Next: { v: ["Дараах"] },
			"Pause slideshow": { v: ["Слайд шоуг түр зогсоох"] },
			Previous: { v: ["Өмнөх"] },
			"Start slideshow": { v: ["Слайд шоуг эхлүүлэх"] }
		}
	},
	{
		l: "my",
		t: {
			Next: { v: ["နောက်သို့ဆက်ရန်"] },
			"Pause slideshow": { v: ["စလိုက်ရှိုး ခေတ္တရပ်ရန်"] },
			Previous: { v: ["ယခင်"] },
			"Start slideshow": { v: ["စလိုက်ရှိုးအား စတင်ရန်"] }
		}
	},
	{
		l: "nb",
		t: {
			Next: { v: ["Neste"] },
			"Pause slideshow": { v: ["Pause lysbildefremvisning"] },
			Previous: { v: ["Forrige"] },
			"Start slideshow": { v: ["Start lysbildefremvisning"] }
		}
	},
	{
		l: "nl",
		t: {
			Next: { v: ["Volgende"] },
			"Pause slideshow": { v: ["Diavoorstelling pauzeren"] },
			Previous: { v: ["Vorige"] },
			"Start slideshow": { v: ["Diavoorstelling starten"] }
		}
	},
	{
		l: "oc",
		t: {
			Next: { v: ["Seguent"] },
			"Pause slideshow": { v: ["Metre en pausa lo diaporama"] },
			Previous: { v: ["Precedent"] },
			"Start slideshow": { v: ["Lançar lo diaporama"] }
		}
	},
	{
		l: "pl",
		t: {
			Next: { v: ["Następny"] },
			"Pause slideshow": { v: ["Wstrzymaj pokaz slajdów"] },
			Previous: { v: ["Poprzedni"] },
			"Start slideshow": { v: ["Rozpocznij pokaz slajdów"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			Next: { v: ["Próximo"] },
			"Pause slideshow": { v: ["Pausar apresentação de slides"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Iniciar apresentação de slides"] }
		}
	},
	{
		l: "pt-PT",
		t: {
			Next: { v: ["Seguinte"] },
			"Pause slideshow": { v: ["Pausar diaporama"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Iniciar diaporama"] }
		}
	},
	{
		l: "ro",
		t: {
			Next: { v: ["Următorul"] },
			"Pause slideshow": { v: ["Întrerupe prezentarea"] },
			Previous: { v: ["Anterior"] },
			"Start slideshow": { v: ["Pornește prezentarea"] }
		}
	},
	{
		l: "ru",
		t: {
			Next: { v: ["Следующее"] },
			"Pause slideshow": { v: ["Приостановить показ слайдов"] },
			Previous: { v: ["Предыдущее"] },
			"Start slideshow": { v: ["Начать показ слайдов"] }
		}
	},
	{
		l: "sk",
		t: {
			Next: { v: ["Ďalej"] },
			"Pause slideshow": { v: ["Pozastaviť prezentáciu"] },
			Previous: { v: ["Predchádzajúce"] },
			"Start slideshow": { v: ["Začať prezentáciu"] }
		}
	},
	{
		l: "sl",
		t: {
			Next: { v: ["Naslednji"] },
			"Pause slideshow": { v: ["Ustavi predstavitev"] },
			Previous: { v: ["Predhodni"] },
			"Start slideshow": { v: ["Začni predstavitev"] }
		}
	},
	{
		l: "sr",
		t: {
			Next: { v: ["Следеће"] },
			"Pause slideshow": { v: ["Паузирај слајд шоу"] },
			Previous: { v: ["Претходно"] },
			"Start slideshow": { v: ["Покрени слајд шоу"] }
		}
	},
	{
		l: "sv",
		t: {
			Next: { v: ["Nästa"] },
			"Pause slideshow": { v: ["Pausa bildspelet"] },
			Previous: { v: ["Föregående"] },
			"Start slideshow": { v: ["Starta bildspelet"] }
		}
	},
	{
		l: "tr",
		t: {
			Next: { v: ["Sonraki"] },
			"Pause slideshow": { v: ["Slayt sunumunu duraklat"] },
			Previous: { v: ["Önceki"] },
			"Start slideshow": { v: ["Slayt sunumunu başlat"] }
		}
	},
	{
		l: "uk",
		t: {
			Next: { v: ["Вперед"] },
			"Pause slideshow": { v: ["Пауза у показі слайдів"] },
			Previous: { v: ["Назад"] },
			"Start slideshow": { v: ["Почати показ слайдів"] }
		}
	},
	{
		l: "uz",
		t: {
			Next: { v: ["Keyingi"] },
			"Pause slideshow": { v: ["Slayd-shouni to'xtatib turish"] },
			Previous: { v: ["Oldingi"] },
			"Start slideshow": { v: ["Slayd-shouni boshlash"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			Next: { v: ["下一个"] },
			"Pause slideshow": { v: ["暂停幻灯片"] },
			Previous: { v: ["上一个"] },
			"Start slideshow": { v: ["开始幻灯片"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			Next: { v: ["下一個"] },
			"Pause slideshow": { v: ["暫停幻燈片"] },
			Previous: { v: ["上一個"] },
			"Start slideshow": { v: ["開始幻燈片"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			Next: { v: ["下一個"] },
			"Pause slideshow": { v: ["暫停幻燈片"] },
			Previous: { v: ["上一個"] },
			"Start slideshow": { v: ["開始幻燈片"] }
		}
	}
], wy = [
	{
		l: "ar",
		t: { "Type to search time zone": { v: ["أكتُب للبحث عن منطقة زمنية"] } }
	},
	{
		l: "ast",
		t: {
			"Search for time zone": { v: ["Buscar fusos horarios"] },
			"Type to search time zone": { v: ["Escribi pa buscar un fusu horariu"] }
		}
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: { "Type to search time zone": { v: ["Escriviu per cercar la zona horària"] } }
	},
	{
		l: "cs",
		t: {
			"Search for time zone": { v: ["Vyhledat časové pásmo"] },
			"Type to search time zone": { v: ["Psaním vyhledejte časovou zónu"] }
		}
	},
	{
		l: "cs-CZ",
		t: {
			"Search for time zone": { v: ["Vyhledat časové pásmo"] },
			"Type to search time zone": { v: ["Psaním vyhledejte časovou zónu"] }
		}
	},
	{
		l: "da",
		t: {
			"Search for time zone": { v: ["Søg efter tidszone"] },
			"Type to search time zone": { v: ["Skriv for at søge efter tidszone"] }
		}
	},
	{
		l: "de",
		t: {
			"Search for time zone": { v: ["Nach Zeitzone suchen"] },
			"Type to search time zone": { v: ["Tippen, um eine Zeitzone zu suchen"] }
		}
	},
	{
		l: "de-DE",
		t: {
			"Search for time zone": { v: ["Nach Zeitzone suchen"] },
			"Type to search time zone": { v: ["Tippen, um eine Zeitzone zu suchen"] }
		}
	},
	{
		l: "el",
		t: { "Type to search time zone": { v: ["Πληκτρολογήστε για αναζήτηση ζώνης ώρας"] } }
	},
	{
		l: "en-GB",
		t: {
			"Search for time zone": { v: ["Search for time zone"] },
			"Type to search time zone": { v: ["Type to search time zone"] }
		}
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: {
			"Search for time zone": { v: ["Buscar huso horario"] },
			"Type to search time zone": { v: ["Escriba para buscar un huso horario"] }
		}
	},
	{
		l: "es-AR",
		t: {
			"Search for time zone": { v: ["Buscar zona horaria"] },
			"Type to search time zone": { v: ["Escriba para buscar la zona horaria"] }
		}
	},
	{
		l: "es-EC",
		t: { "Type to search time zone": { v: ["Escribe para buscar la zona horaria"] } }
	},
	{
		l: "es-MX",
		t: {
			"Search for time zone": { v: ["Buscar zona horaria"] },
			"Type to search time zone": { v: ["Escriba para buscar la zona horaria"] }
		}
	},
	{
		l: "et-EE",
		t: {
			"Search for time zone": { v: ["Otsi ajavööndit"] },
			"Type to search time zone": { v: ["Ajavööndi otsimiseks kirjuta midagi"] }
		}
	},
	{
		l: "eu",
		t: { "Type to search time zone": { v: ["Idatzi ordu-zona bat bilatzeko"] } }
	},
	{
		l: "fa",
		t: {
			"Search for time zone": { v: ["جستجو برای منطقهٔ زمانی"] },
			"Type to search time zone": { v: ["برای جستجوی منطقه زمانی تایپ کنید"] }
		}
	},
	{
		l: "fi",
		t: {
			"Search for time zone": { v: ["Etsi aikavyöhykettä"] },
			"Type to search time zone": { v: ["Kirjoita etsiäksesi aikavyöhykettä"] }
		}
	},
	{
		l: "fr",
		t: {
			"Search for time zone": { v: ["Rechercher un fuseau horaire"] },
			"Type to search time zone": { v: ["Saisissez du texte pour rechercher un fuseau horaire"] }
		}
	},
	{
		l: "ga",
		t: {
			"Search for time zone": { v: ["Cuardaigh crios ama"] },
			"Type to search time zone": { v: ["Clóscríobh chun crios ama a chuardach"] }
		}
	},
	{
		l: "gl",
		t: {
			"Search for time zone": { v: ["Buscar por fuso horario"] },
			"Type to search time zone": { v: ["Escriba para buscar o fuso horario"] }
		}
	},
	{
		l: "he",
		t: { "Type to search time zone": { v: ["יש להקליד כדי לחפש אזור זמן"] } }
	},
	{
		l: "hr",
		t: {
			"Search for time zone": { v: ["Pretraži vremensku zonu"] },
			"Type to search time zone": { v: ["Upišite za pretraživanje vremenske zone"] }
		}
	},
	{
		l: "hu",
		t: {
			"Search for time zone": { v: ["Időzóna keresése"] },
			"Type to search time zone": { v: ["Gépeljen az időzóna kereséséhez"] }
		}
	},
	{
		l: "id",
		t: {
			"Search for time zone": { v: ["Cari zona waktu"] },
			"Type to search time zone": { v: ["Ketik untuk mencari zona waktu"] }
		}
	},
	{
		l: "is",
		t: {
			"Search for time zone": { v: ["Leita að tímabelti"] },
			"Type to search time zone": { v: ["Skrifaðu til að leita að tímabelti"] }
		}
	},
	{
		l: "it",
		t: {
			"Search for time zone": { v: ["Ricerca del fuso orario"] },
			"Type to search time zone": { v: ["Digita per cercare un fuso orario"] }
		}
	},
	{
		l: "ja",
		t: {
			"Search for time zone": { v: ["タイムゾーンを検索"] },
			"Type to search time zone": { v: ["タイムゾーン検索のため入力してください"] }
		}
	},
	{
		l: "ja-JP",
		t: {
			"Search for time zone": { v: ["タイムゾーンを検索"] },
			"Type to search time zone": { v: ["タイムゾーン検索のため入力してください"] }
		}
	},
	{
		l: "ko",
		t: {
			"Search for time zone": { v: ["시간대 찾기"] },
			"Type to search time zone": { v: ["입력하여 시간대를 검색"] }
		}
	},
	{
		l: "lo",
		t: {
			"Search for time zone": { v: ["ຄົ້ນຫາເຂດເວລາ"] },
			"Type to search time zone": { v: ["ພິມເພື່ອຄົ້ນຫາເຂດເວລາ"] }
		}
	},
	{
		l: "lt-LT",
		t: {
			"Search for time zone": { v: ["Ieškoti laiko juostų"] },
			"Type to search time zone": { v: ["Įveskite, kad surastumėte laiko juostą"] }
		}
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: {
			"Search for time zone": { v: ["Барај временска зона"] },
			"Type to search time zone": { v: ["Напишете за да пребарате временска зона"] }
		}
	},
	{
		l: "mn",
		t: {
			"Search for time zone": { v: ["Цагийн бүс хайх"] },
			"Type to search time zone": { v: ["Цагийн бүс хайхын тулд бичнэ үү"] }
		}
	},
	{
		l: "my",
		t: { "Type to search time zone": { v: ["ဒေသစံတော်ချိန်များ ရှာဖွေရန် စာရိုက်ပါ"] } }
	},
	{
		l: "nb",
		t: {
			"Search for time zone": { v: ["Søk etter tidssone"] },
			"Type to search time zone": { v: ["Tast for å søke etter tidssone"] }
		}
	},
	{
		l: "nl",
		t: {
			"Search for time zone": { v: ["Zoeken naar tijdzone"] },
			"Type to search time zone": { v: ["Typ om een tijdzone te zoeken"] }
		}
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: {
			"Search for time zone": { v: ["Szukaj strefy czasowej"] },
			"Type to search time zone": { v: ["Wpisz, aby wyszukać strefę czasową"] }
		}
	},
	{
		l: "pt-BR",
		t: {
			"Search for time zone": { v: ["Pesquisar fuso horário"] },
			"Type to search time zone": { v: ["Digite para pesquisar o fuso horário "] }
		}
	},
	{
		l: "pt-PT",
		t: { "Type to search time zone": { v: ["Digite para pesquisar o fuso horário "] } }
	},
	{
		l: "ro",
		t: {
			"Search for time zone": { v: ["Caută fusul orar"] },
			"Type to search time zone": { v: ["Tastează pentru a căuta fusul orar"] }
		}
	},
	{
		l: "ru",
		t: {
			"Search for time zone": { v: ["Поиск часового пояса"] },
			"Type to search time zone": { v: ["Введите название часового пояса"] }
		}
	},
	{
		l: "sk",
		t: {
			"Search for time zone": { v: ["Vyhľadať časové pásmo"] },
			"Type to search time zone": { v: ["Začníte písať pre vyhľadávanie časovej zóny"] }
		}
	},
	{
		l: "sl",
		t: { "Type to search time zone": { v: ["Vpišite niz za iskanje časovnega pasu"] } }
	},
	{
		l: "sr",
		t: { "Type to search time zone": { v: ["Куцајте да претражите временске зоне"] } }
	},
	{
		l: "sv",
		t: {
			"Search for time zone": { v: ["Sök efter en tidszon"] },
			"Type to search time zone": { v: ["Skriv för att söka efter en tidszon"] }
		}
	},
	{
		l: "tr",
		t: {
			"Search for time zone": { v: ["Saat dilimi ara"] },
			"Type to search time zone": { v: ["Saat dilimi aramak için yazmaya başlayın"] }
		}
	},
	{
		l: "uk",
		t: { "Type to search time zone": { v: ["Введіть для пошуку часовий пояс"] } }
	},
	{
		l: "uz",
		t: {
			"Search for time zone": { v: ["Vaqt mintaqasini qidirish"] },
			"Type to search time zone": { v: ["Vaqt mintaqasini qidirish uchun kiriting"] }
		}
	},
	{
		l: "zh-CN",
		t: {
			"Search for time zone": { v: ["搜索时区"] },
			"Type to search time zone": { v: ["打字以搜索时区"] }
		}
	},
	{
		l: "zh-HK",
		t: {
			"Search for time zone": { v: ["搜索時區"] },
			"Type to search time zone": { v: ["鍵入以搜索時區"] }
		}
	},
	{
		l: "zh-TW",
		t: {
			"Search for time zone": { v: ["搜尋時區"] },
			"Type to search time zone": { v: ["輸入以搜尋時區"] }
		}
	}
], Ty = [
	{
		l: "ar",
		t: { "Undo changes": { v: ["تراجَع عن التغييرات"] } }
	},
	{
		l: "ast",
		t: { "Undo changes": { v: ["Desfacer los cambeos"] } }
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: { "Undo changes": { v: ["Desfés els canvis"] } }
	},
	{
		l: "cs",
		t: { "Undo changes": { v: ["Vzít změny zpět"] } }
	},
	{
		l: "cs-CZ",
		t: { "Undo changes": { v: ["Vzít změny zpět"] } }
	},
	{
		l: "da",
		t: { "Undo changes": { v: ["Fortryd ændringer"] } }
	},
	{
		l: "de",
		t: { "Undo changes": { v: ["Änderungen rückgängig machen"] } }
	},
	{
		l: "de-DE",
		t: { "Undo changes": { v: ["Änderungen rückgängig machen"] } }
	},
	{
		l: "el",
		t: { "Undo changes": { v: ["Αναίρεση Αλλαγών"] } }
	},
	{
		l: "en-GB",
		t: { "Undo changes": { v: ["Undo changes"] } }
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: { "Undo changes": { v: ["Deshacer cambios"] } }
	},
	{
		l: "es-AR",
		t: { "Undo changes": { v: ["Deshacer cambios"] } }
	},
	{
		l: "es-EC",
		t: { "Undo changes": { v: ["Deshacer cambios"] } }
	},
	{
		l: "es-MX",
		t: { "Undo changes": { v: ["Deshacer cambios"] } }
	},
	{
		l: "et-EE",
		t: { "Undo changes": { v: ["Pööra muudatused tagasi"] } }
	},
	{
		l: "eu",
		t: { "Undo changes": { v: ["Aldaketak desegin"] } }
	},
	{
		l: "fa",
		t: { "Undo changes": { v: ["لغو تغییرات"] } }
	},
	{
		l: "fi",
		t: { "Undo changes": { v: ["Kumoa muutokset"] } }
	},
	{
		l: "fr",
		t: { "Undo changes": { v: ["Annuler les modifications"] } }
	},
	{
		l: "ga",
		t: { "Undo changes": { v: ["Cealaigh athruithe"] } }
	},
	{
		l: "gl",
		t: { "Undo changes": { v: ["Desfacer os cambios"] } }
	},
	{
		l: "he",
		t: { "Undo changes": { v: ["ביטול שינויים"] } }
	},
	{
		l: "hr",
		t: { "Undo changes": { v: ["Poništi promjene"] } }
	},
	{
		l: "hu",
		t: { "Undo changes": { v: ["Változtatások visszavonása"] } }
	},
	{
		l: "id",
		t: { "Undo changes": { v: ["Urungkan perubahan"] } }
	},
	{
		l: "is",
		t: { "Undo changes": { v: ["Afturkalla breytingar"] } }
	},
	{
		l: "it",
		t: { "Undo changes": { v: ["Cancella i cambiamenti"] } }
	},
	{
		l: "ja",
		t: { "Undo changes": { v: ["変更を取り消し"] } }
	},
	{
		l: "ja-JP",
		t: { "Undo changes": { v: ["変更を取り消し"] } }
	},
	{
		l: "ko",
		t: { "Undo changes": { v: ["변경 되돌리기"] } }
	},
	{
		l: "lo",
		t: { "Undo changes": { v: ["ຍ້ອນຄືນການປ່ຽນແປງ"] } }
	},
	{
		l: "lt-LT",
		t: { "Undo changes": { v: ["Atšaukti pakeitimus"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "Undo changes": { v: ["Врати ги промените"] } }
	},
	{
		l: "mn",
		t: { "Undo changes": { v: ["Өөрчлөлтийг буцаах"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: { "Undo changes": { v: ["Tilbakestill endringer"] } }
	},
	{
		l: "nl",
		t: { "Undo changes": { v: ["Wijzigingen ongedaan maken"] } }
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "Undo changes": { v: ["Cofnij zmiany"] } }
	},
	{
		l: "pt-BR",
		t: { "Undo changes": { v: ["Desfazer modificações"] } }
	},
	{
		l: "pt-PT",
		t: { "Undo changes": { v: ["Anular alterações"] } }
	},
	{
		l: "ro",
		t: { "Undo changes": { v: ["Revino asupra modificărilor"] } }
	},
	{
		l: "ru",
		t: { "Undo changes": { v: ["Отменить изменения"] } }
	},
	{
		l: "sk",
		t: { "Undo changes": { v: ["Vrátiť zmeny"] } }
	},
	{
		l: "sl",
		t: { "Undo changes": { v: ["Razveljavi spremembe"] } }
	},
	{
		l: "sr",
		t: { "Undo changes": { v: ["Поништи измене"] } }
	},
	{
		l: "sv",
		t: { "Undo changes": { v: ["Ångra ändringar"] } }
	},
	{
		l: "tr",
		t: { "Undo changes": { v: ["Değişiklikleri geri al"] } }
	},
	{
		l: "uk",
		t: { "Undo changes": { v: ["Скасувати зміни"] } }
	},
	{
		l: "uz",
		t: { "Undo changes": { v: ["O'zgarishlarni bekor qilish"] } }
	},
	{
		l: "zh-CN",
		t: { "Undo changes": { v: ["撤销更改"] } }
	},
	{
		l: "zh-HK",
		t: { "Undo changes": { v: ["取消更改"] } }
	},
	{
		l: "zh-TW",
		t: { "Undo changes": { v: ["還原變更"] } }
	}
], Ey = [
	{
		l: "ar",
		t: { "User status: {status}": { v: ["حالة المستخدِم: {status}"] } }
	},
	{
		l: "ast",
		t: { "User status: {status}": { v: ["Estáu del usuariu: {status}"] } }
	},
	{
		l: "br",
		t: {}
	},
	{
		l: "ca",
		t: {}
	},
	{
		l: "cs",
		t: { "User status: {status}": { v: ["Stav uživatele: {status}"] } }
	},
	{
		l: "cs-CZ",
		t: { "User status: {status}": { v: ["Stav uživatele: {status}"] } }
	},
	{
		l: "da",
		t: { "User status: {status}": { v: ["Brugerstatus: {status}"] } }
	},
	{
		l: "de",
		t: { "User status: {status}": { v: ["Benutzerstatus: {status}"] } }
	},
	{
		l: "de-DE",
		t: { "User status: {status}": { v: ["Benutzerstatus: {status}"] } }
	},
	{
		l: "el",
		t: { "User status: {status}": { v: ["Κατάσταση χρήστη: {status}"] } }
	},
	{
		l: "en-GB",
		t: { "User status: {status}": { v: ["User status: {status}"] } }
	},
	{
		l: "eo",
		t: {}
	},
	{
		l: "es",
		t: { "User status: {status}": { v: ["Estatus del usuario: {status}"] } }
	},
	{
		l: "es-AR",
		t: { "User status: {status}": { v: ["Estado del usuario: {status}"] } }
	},
	{
		l: "es-EC",
		t: {}
	},
	{
		l: "es-MX",
		t: { "User status: {status}": { v: ["Estado del usuario: {status}"] } }
	},
	{
		l: "et-EE",
		t: { "User status: {status}": { v: ["Kasutaja olek: {status}"] } }
	},
	{
		l: "eu",
		t: {}
	},
	{
		l: "fa",
		t: { "User status: {status}": { v: ["وضعیت کاربر: {status}"] } }
	},
	{
		l: "fi",
		t: { "User status: {status}": { v: ["Käyttäjän tila: {status}"] } }
	},
	{
		l: "fr",
		t: { "User status: {status}": { v: ["Statut de l'utilisateur : {status}"] } }
	},
	{
		l: "ga",
		t: { "User status: {status}": { v: ["Stádas úsáideora: {status}"] } }
	},
	{
		l: "gl",
		t: { "User status: {status}": { v: ["Estado do usuario: {status}"] } }
	},
	{
		l: "he",
		t: {}
	},
	{
		l: "hr",
		t: { "User status: {status}": { v: ["Status korisnika: {status}"] } }
	},
	{
		l: "hu",
		t: { "User status: {status}": { v: ["Felhasználó állapota: {status}"] } }
	},
	{
		l: "id",
		t: { "User status: {status}": { v: ["Status pengguna: {status}"] } }
	},
	{
		l: "is",
		t: { "User status: {status}": { v: ["Staða notanda: {status}"] } }
	},
	{
		l: "it",
		t: { "User status: {status}": { v: ["Stato dell'utente: {status}"] } }
	},
	{
		l: "ja",
		t: { "User status: {status}": { v: ["ユーザのステータス: {status}"] } }
	},
	{
		l: "ja-JP",
		t: { "User status: {status}": { v: ["ユーザのステータス: {status}"] } }
	},
	{
		l: "ko",
		t: { "User status: {status}": { v: ["사용자 상태: {status}"] } }
	},
	{
		l: "lo",
		t: { "User status: {status}": { v: ["ສະຖານະຜູ້ໃຊ້: {status}"] } }
	},
	{
		l: "lt-LT",
		t: { "User status: {status}": { v: ["Naudotojo būsena: {status}"] } }
	},
	{
		l: "lv",
		t: {}
	},
	{
		l: "mk",
		t: { "User status: {status}": { v: ["Статус: {status}"] } }
	},
	{
		l: "mn",
		t: { "User status: {status}": { v: ["Хэрэглэгчийн төлөв: {status}"] } }
	},
	{
		l: "my",
		t: {}
	},
	{
		l: "nb",
		t: { "User status: {status}": { v: ["Brukerstatus: {status}"] } }
	},
	{
		l: "nl",
		t: { "User status: {status}": { v: ["Gebruikersstatus: {status}"] } }
	},
	{
		l: "oc",
		t: {}
	},
	{
		l: "pl",
		t: { "User status: {status}": { v: ["Status użytkownika: {status}"] } }
	},
	{
		l: "pt-BR",
		t: { "User status: {status}": { v: ["Status do usuário: {status}"] } }
	},
	{
		l: "pt-PT",
		t: { "User status: {status}": { v: ["Estado do utilizador: {status}"] } }
	},
	{
		l: "ro",
		t: { "User status: {status}": { v: ["Stare utilizator: {status}"] } }
	},
	{
		l: "ru",
		t: { "User status: {status}": { v: ["Статус пользователя: {status}"] } }
	},
	{
		l: "sk",
		t: { "User status: {status}": { v: ["Stav užívateľa: {status}"] } }
	},
	{
		l: "sl",
		t: {}
	},
	{
		l: "sr",
		t: { "User status: {status}": { v: ["Статус корисника: {status}"] } }
	},
	{
		l: "sv",
		t: { "User status: {status}": { v: ["Användarstatus: {status}"] } }
	},
	{
		l: "tr",
		t: { "User status: {status}": { v: ["Kullanıcı durumu: {status}"] } }
	},
	{
		l: "uk",
		t: { "User status: {status}": { v: ["Статус користувача: {status}"] } }
	},
	{
		l: "uz",
		t: { "User status: {status}": { v: ["Foydalanuvchi holati: {status}"] } }
	},
	{
		l: "zh-CN",
		t: { "User status: {status}": { v: ["用户状态：{status}"] } }
	},
	{
		l: "zh-HK",
		t: { "User status: {status}": { v: ["用戶狀態：{status}"] } }
	},
	{
		l: "zh-TW",
		t: { "User status: {status}": { v: ["使用者狀態：{status}"] } }
	}
], Dy = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"area[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
], Oy = /* #__PURE__ */ Dy.join(","), ky = typeof Element > "u", Ay = ky ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, jy = !ky && Element.prototype.getRootNode ? function(e) {
	return e == null || e.getRootNode == null ? void 0 : e.getRootNode();
} : function(e) {
	return e?.ownerDocument;
}, My = function(e, t) {
	t === void 0 && (t = !0);
	var n = e == null || e.getAttribute == null ? void 0 : e.getAttribute("inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : My(e.parentNode));
}, Ny = function(e) {
	var t, n = e == null || e.getAttribute == null || (t = e.getAttribute("contenteditable")) == null ? void 0 : t.toLowerCase();
	return n === "" || n === "true" || n === "plaintext-only";
}, Py = function(e, t, n) {
	if (My(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(Oy));
	return t && Ay.call(e, Oy) && r.unshift(e), r = r.filter(n), r;
}, Fy = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!My(a, !1)) {
			if (a.tagName === "SLOT") {
				var o = a.assignedElements(), s = Fy(o.length ? o : a.children, !0, n);
				n.flatten ? r.push.apply(r, s) : r.push({
					scopeParent: a,
					candidates: s
				});
			} else {
				Ay.call(a, Oy) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
				var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !My(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
				if (c && l) {
					var u = Fy(c === !0 ? a.children : c.children, !0, n);
					n.flatten ? r.push.apply(r, u) : r.push({
						scopeParent: a,
						candidates: u
					});
				} else i.unshift.apply(i, a.children);
			}
		}
	}
	return r;
}, Iy = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, Ly = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || Ny(e)) && !Iy(e) ? 0 : e.tabIndex;
}, Ry = function(e, t) {
	var n = Ly(e);
	return n < 0 && t && !Iy(e) ? 0 : n;
}, zy = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, By = function(e) {
	return e.tagName === "INPUT";
}, Vy = function(e) {
	return By(e) && e.type === "hidden";
}, Hy = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Uy = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, Wy = function(e) {
	if (!e.name) return !0;
	var t = e.form || jy(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Uy(r, e.form);
	return !i || i === e;
}, Gy = function(e) {
	return By(e) && e.type === "radio";
}, Ky = function(e) {
	return Gy(e) && !Wy(e);
}, qy = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Jy = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	var i = getComputedStyle(e).visibility;
	if (i === "hidden" || i === "collapse") return !0;
	var a = Ay.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (Ay.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = jy(e);
				if (s && !s.shadowRoot && r(s) === !0) return qy(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (e.isConnected) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return qy(e);
	return !1;
}, Yy = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return Ay.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, Xy = function(e, t) {
	return !(t.disabled || Vy(t) || Jy(t, e) || Hy(t) || Yy(t));
}, Zy = function(e, t) {
	return !(Ky(t) || Ly(t) < 0 || !Xy(e, t));
}, Qy = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, $y = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = Ry(a, i), s = i ? $y(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(zy).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, eb = function(e, t) {
	return t ||= {}, $y(t.getShadowRoot ? Fy([e], t.includeContainer, {
		filter: Zy.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: Qy
	}) : Py(e, t.includeContainer, Zy.bind(null, t)));
}, tb = function(e, t) {
	return t ||= {}, t.getShadowRoot ? Fy([e], t.includeContainer, {
		filter: Xy.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : Py(e, t.includeContainer, Xy.bind(null, t));
}, nb = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return Ay.call(e, Oy) !== !1 && Zy(t, e);
}, rb = /* #__PURE__ */ Dy.concat("iframe:not([inert]):not([inert] *)").join(","), ib = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return Ay.call(e, rb) !== !1 && Xy(t, e);
};
// node_modules/focus-trap/dist/focus-trap.esm.js
function ab(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ob(e) {
	if (Array.isArray(e)) return ab(e);
}
function sb(e, t) {
	var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (!n) {
		if (Array.isArray(e) || (n = gb(e)) || t) {
			n && (e = n);
			var r = 0, i = function() {};
			return {
				s: i,
				n: function() {
					return r >= e.length ? { done: !0 } : {
						done: !1,
						value: e[r++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: i
			};
		}
		throw TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var a, o = !0, s = !1;
	return {
		s: function() {
			n = n.call(e);
		},
		n: function() {
			var e = n.next();
			return o = e.done, e;
		},
		e: function(e) {
			s = !0, a = e;
		},
		f: function() {
			try {
				o || n.return == null || n.return();
			} finally {
				if (s) throw a;
			}
		}
	};
}
function cb(e, t, n) {
	return (t = hb(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lb(e) {
	if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function ub() {
	throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function db(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function fb(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? db(Object(n), !0).forEach(function(t) {
			cb(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : db(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function pb(e) {
	return ob(e) || lb(e) || gb(e) || ub();
}
function mb(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t);
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function hb(e) {
	var t = mb(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gb(e, t) {
	if (e) {
		if (typeof e == "string") return ab(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ab(e, t) : void 0;
	}
}
var _b = /* @__PURE__ */ new WeakMap(), vb = function(e) {
	var t = e?.preexistingTrap;
	if (t) {
		var n = _b.get(t);
		n === 1 ? _b.delete(t) : _b.set(t, n - 1), e.preexistingTrap = void 0;
	}
}, yb = {
	getActiveTrap: function(e) {
		return e?.length > 0 ? e[e.length - 1] : null;
	},
	activateTrap: function(e, t) {
		t !== yb.getActiveTrap(e) && yb.pauseTrap(e);
		var n = e.indexOf(t);
		n === -1 || e.splice(n, 1), e.push(t);
	},
	deactivateTrap: function(e, t) {
		var n = e.indexOf(t);
		n !== -1 && e.splice(n, 1), yb.unpauseTrap(e);
	},
	pauseTrap: function(e) {
		yb.getActiveTrap(e)?._setPausedState(!0);
	},
	unpauseTrap: function(e) {
		var t = yb.getActiveTrap(e);
		t && !t._isManuallyPaused() && t._setPausedState(!1);
	}
}, bb = function(e) {
	return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, xb = function(e) {
	return e?.key === "Escape" || e?.key === "Esc" || e?.keyCode === 27;
}, Sb = function(e) {
	return e?.key === "Tab" || e?.keyCode === 9;
}, Cb = function(e) {
	return Sb(e) && !e.shiftKey;
}, wb = function(e) {
	return Sb(e) && e.shiftKey;
}, Tb = function(e) {
	return setTimeout(e, 0);
}, Eb = function(e) {
	var t = [...arguments].slice(1);
	return typeof e == "function" ? e.apply(void 0, t) : e;
}, Db = function(e) {
	return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, Ob = [], kb = function(e, t) {
	var n = t?.document || document, r = t?.trapStack || Ob, i = fb({
		returnFocusOnDeactivate: !0,
		escapeDeactivates: !0,
		delayInitialFocus: !0,
		delayReturnFocus: !0,
		isolateSubtrees: !1,
		isKeyForward: Cb,
		isKeyBackward: wb
	}, t), a = {
		containers: [],
		containerGroups: [],
		tabbableGroups: [],
		adjacentElements: /* @__PURE__ */ new Set(),
		alreadySilent: /* @__PURE__ */ new Set(),
		subtreeIsolated: !1,
		activation: void 0,
		nodeFocusedBeforeActivation: null,
		mostRecentlyFocusedNode: null,
		active: !1,
		paused: !1,
		manuallyPaused: !1,
		delayInitialFocusTimer: void 0,
		unpausing: void 0,
		recentNavEvent: void 0
	}, o, s = function(e, t, n) {
		return e && e[t] !== void 0 ? e[t] : i[n || t];
	}, c = function(e, t) {
		var n = typeof t?.composedPath == "function" ? t.composedPath() : void 0;
		return a.containerGroups.findIndex(function(t) {
			var r = t.container, i = t.tabbableNodes;
			return r.contains(e) || n?.includes(r) || i.find(function(t) {
				return t === e;
			});
		});
	}, l = function(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.hasFallback, a = r !== void 0 && r, o = t.params, s = o === void 0 ? [] : o, c = i[e];
		if (typeof c == "function" && (c = c.apply(void 0, pb(s))), c === !0 && (c = void 0), !c) {
			if (c === void 0 || c === !1) return c;
			throw Error(`\`${e}\` was specified but was not a node, or did not return a node`);
		}
		var l = c;
		if (typeof c == "string") {
			try {
				l = n.querySelector(c);
			} catch (t) {
				throw Error(`\`${e}\` appears to be an invalid selector; error="${t.message}"`, { cause: t });
			}
			if (!l && !a) throw Error(`\`${e}\` as selector refers to no known node`);
		}
		return l;
	}, u = function(e) {
		var t = e.activeElement;
		return t ? t.shadowRoot && t.shadowRoot.activeElement !== null ? u(t.shadowRoot) : t : null;
	}, d = function() {
		var e = l("initialFocus", { hasFallback: !0 });
		if (e === !1) return !1;
		if (e === void 0 || e && !ib(e, i.tabbableOptions)) {
			var t = u(n);
			if (c(t) >= 0) e = t;
			else {
				var r = a.tabbableGroups[0];
				e = r && r.firstTabbableNode || l("fallbackFocus");
			}
		} else e === null && (e = l("fallbackFocus"));
		if (!e) throw Error("Your focus-trap needs to have at least one focusable element");
		return e;
	}, f = function() {
		if (a.containerGroups = a.containers.map(function(e) {
			var t = eb(e, i.tabbableOptions), n = tb(e, i.tabbableOptions), r = t.length > 0 ? t[0] : void 0, a = t.length > 0 ? t[t.length - 1] : void 0, o = n.find(function(e) {
				return nb(e);
			}), s = n.slice().reverse().find(function(e) {
				return nb(e);
			});
			return {
				container: e,
				tabbableNodes: t,
				focusableNodes: n,
				posTabIndexesFound: !!t.find(function(e) {
					return Ly(e) > 0;
				}),
				firstTabbableNode: r,
				lastTabbableNode: a,
				firstDomTabbableNode: o,
				lastDomTabbableNode: s,
				nextTabbableNode: function(e) {
					var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, i = t.indexOf(e);
					return i < 0 ? r ? n.slice(n.indexOf(e) + 1).find(function(e) {
						return nb(e);
					}) : n.slice(0, n.indexOf(e)).reverse().find(function(e) {
						return nb(e);
					}) : t[i + (r ? 1 : -1)];
				}
			};
		}), a.tabbableGroups = a.containerGroups.filter(function(e) {
			return e.tabbableNodes.length > 0;
		}), a.tabbableGroups.length <= 0 && !l("fallbackFocus")) throw Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
		if (a.containerGroups.find(function(e) {
			return e.posTabIndexesFound;
		}) && a.containerGroups.length > 1) throw Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
	}, p = function(e) {
		e !== !1 && (e === u(n) ? a.mostRecentlyFocusedNode = e : !e || !e.focus ? p(d()) : (e.focus({ preventScroll: !!i.preventScroll }), a.mostRecentlyFocusedNode = e, bb(e) && e.select()));
	}, m = function(e) {
		var t = l("setReturnFocus", { params: [e] });
		return t || t !== !1 && e;
	}, h = function(e) {
		var t = e.target, n = e.event, r = e.isBackward, o = r !== void 0 && r;
		t ||= Db(n), f();
		var s = null;
		if (a.tabbableGroups.length > 0) {
			var u = c(t, n), d = u >= 0 ? a.containerGroups[u] : void 0;
			if (u < 0) s = o ? a.tabbableGroups[a.tabbableGroups.length - 1].lastTabbableNode : a.tabbableGroups[0].firstTabbableNode;
			else if (o) {
				var p = a.tabbableGroups.findIndex(function(e) {
					var n = e.firstTabbableNode;
					return t === n;
				});
				if (p < 0 && (d.container === t || ib(t, i.tabbableOptions) && !nb(t, i.tabbableOptions) && !d.nextTabbableNode(t, !1)) && (p = Math.max(0, a.tabbableGroups.findIndex(function(e) {
					return a.containerGroups.indexOf(e) >= u;
				}))), p >= 0) {
					var m = p === 0 ? a.tabbableGroups.length - 1 : p - 1, h = a.tabbableGroups[m];
					s = Ly(t) >= 0 ? h.lastTabbableNode : h.lastDomTabbableNode;
				} else Sb(n) || (s = d.nextTabbableNode(t, !1));
			} else {
				var g = a.tabbableGroups.findIndex(function(e) {
					var n = e.lastTabbableNode;
					return t === n;
				});
				if (g < 0 && (d.container === t || ib(t, i.tabbableOptions) && !nb(t, i.tabbableOptions) && !d.nextTabbableNode(t))) {
					var _ = a.tabbableGroups.findIndex(function(e) {
						return a.containerGroups.indexOf(e) > u;
					});
					g = _ > 0 ? _ - 1 : a.tabbableGroups.length - 1;
				}
				if (g >= 0) {
					var v = g === a.tabbableGroups.length - 1 ? 0 : g + 1, y = a.tabbableGroups[v];
					s = Ly(t) >= 0 ? y.firstTabbableNode : y.firstDomTabbableNode;
				} else Sb(n) || (s = d.nextTabbableNode(t));
			}
		} else s = l("fallbackFocus");
		return s;
	}, g = function(e) {
		c(Db(e), e) >= 0 || (Eb(i.clickOutsideDeactivates, e) ? o.deactivate({ returnFocus: i.returnFocusOnDeactivate }) : Eb(i.allowOutsideClick, e) || e.preventDefault());
	}, _ = function(e) {
		var t = Db(e), n = c(t, e) >= 0;
		if (n || t instanceof Document) n && (a.mostRecentlyFocusedNode = t);
		else {
			e.stopImmediatePropagation();
			var r, o = !0;
			if (a.mostRecentlyFocusedNode) {
				if (Ly(a.mostRecentlyFocusedNode) > 0) {
					var s = c(a.mostRecentlyFocusedNode), l = a.containerGroups[s].tabbableNodes;
					if (l.length > 0) {
						var u = l.findIndex(function(e) {
							return e === a.mostRecentlyFocusedNode;
						});
						u >= 0 && (i.isKeyForward(a.recentNavEvent) ? u + 1 < l.length && (r = l[u + 1], o = !1) : u - 1 >= 0 && (r = l[u - 1], o = !1));
					}
				} else a.containerGroups.some(function(e) {
					return e.tabbableNodes.some(function(e) {
						return Ly(e) > 0;
					});
				}) || (o = !1);
			} else o = !1;
			o && (r = h({
				target: a.mostRecentlyFocusedNode,
				isBackward: i.isKeyBackward(a.recentNavEvent)
			})), p(r || a.mostRecentlyFocusedNode || d());
		}
		a.recentNavEvent = void 0;
	}, v = function(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
		a.recentNavEvent = e;
		var n = h({
			event: e,
			isBackward: t
		});
		n && (Sb(e) && e.preventDefault(), p(n));
	}, y = function(e) {
		(i.isKeyForward(e) || i.isKeyBackward(e)) && v(e, i.isKeyBackward(e));
	}, b = function(e) {
		xb(e) && Eb(i.escapeDeactivates, e) !== !1 && (e.preventDefault(), o.deactivate());
	}, x = function(e) {
		c(Db(e), e) >= 0 || Eb(i.clickOutsideDeactivates, e) || Eb(i.allowOutsideClick, e) || (e.preventDefault(), e.stopImmediatePropagation());
	}, S = function() {
		if (a.active && (yb.activateTrap(r, o), !a.paused)) {
			var e;
			if (i.delayInitialFocus) e = new Promise(function(e) {
				a.delayInitialFocusTimer = Tb(function() {
					p(d()), e();
				});
			});
			else if (p(d()), !a.active || a.paused) return;
			return n.addEventListener("focusin", _, !0), n.addEventListener("mousedown", g, {
				capture: !0,
				passive: !1
			}), n.addEventListener("touchstart", g, {
				capture: !0,
				passive: !1
			}), n.addEventListener("click", x, {
				capture: !0,
				passive: !1
			}), n.addEventListener("keydown", y, {
				capture: !0,
				passive: !1
			}), n.addEventListener("keydown", b), e;
		}
	}, C = function(e) {
		a.active && !a.paused && o._setSubtreeIsolation(!1), a.adjacentElements.clear(), a.alreadySilent.clear();
		var t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = sb(e), i;
		try {
			for (r.s(); !(i = r.n()).done;) {
				var s = i.value;
				t.add(s);
				for (var c = typeof ShadowRoot < "u" && s.getRootNode() instanceof ShadowRoot, l = s; l;) {
					t.add(l);
					var u = l.parentElement, d = [];
					u ? d = u.children : !u && c && (d = l.getRootNode().children, u = l.getRootNode().host, c = typeof ShadowRoot < "u" && u.getRootNode() instanceof ShadowRoot);
					var f = sb(d), p;
					try {
						for (f.s(); !(p = f.n()).done;) {
							var m = p.value;
							n.add(m);
						}
					} catch (e) {
						f.e(e);
					} finally {
						f.f();
					}
					l = u;
				}
			}
		} catch (e) {
			r.e(e);
		} finally {
			r.f();
		}
		t.forEach(function(e) {
			n.delete(e);
		}), a.adjacentElements = n;
	}, w = function() {
		if (a.active) return n.removeEventListener("focusin", _, !0), n.removeEventListener("mousedown", g, !0), n.removeEventListener("touchstart", g, !0), n.removeEventListener("click", x, !0), n.removeEventListener("keydown", y, !0), n.removeEventListener("keydown", b), o;
	}, T = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(function(e) {
		var t = a.mostRecentlyFocusedNode;
		t && e.some(function(e) {
			return Array.from(e.removedNodes).some(function(e) {
				return e === t || typeof e.contains == "function" && e.contains(t);
			});
		}) && a.containers.some(function(e) {
			return e?.isConnected;
		}) && (f(), p(d()));
	}) : void 0, E = function() {
		T && (T.disconnect(), a.active && !a.paused && a.containers.map(function(e) {
			T.observe(e, {
				subtree: !0,
				childList: !0
			});
		}));
	};
	return o = {
		get active() {
			return a.active;
		},
		get paused() {
			return a.paused;
		},
		activate: function(e) {
			if (a.active) return this;
			var t = {};
			a.activation = t;
			var i = s(e, "onActivate"), c = s(e, "onPostActivate"), l = s(e, "checkCanFocusTrap"), d = yb.getActiveTrap(r), p = !1;
			if (d && !d.paused) {
				var m;
				(m = d._setSubtreeIsolation) == null || m.call(d, !1), p = !0, t.preexistingTrap = d, _b.set(d, (_b.get(d) || 0) + 1);
			}
			try {
				l || f(), a.active = !0, a.paused = !1, a.nodeFocusedBeforeActivation = u(n), i?.({ trap: o });
				var h = function() {
					if (a.active && a.activation === t) {
						l && f();
						var e = function() {
							a.active && a.activation === t && (a.paused || o._setSubtreeIsolation(!0), E(), c?.({ trap: o }));
						};
						vb(t);
						var n = S();
						n ? n.then(e) : e();
					}
				};
				if (l) return l(a.containers.concat()).then(h, h), this;
				h();
			} catch (e) {
				if (vb(t), d === yb.getActiveTrap(r) && p && !_b.has(d)) {
					var g;
					(g = d._setSubtreeIsolation) == null || g.call(d, !0);
				}
				throw e;
			}
			return this;
		},
		deactivate: function(e) {
			if (!a.active) return this;
			var t = fb({
				onDeactivate: i.onDeactivate,
				onPostDeactivate: i.onPostDeactivate,
				checkCanReturnFocus: i.checkCanReturnFocus
			}, e);
			clearTimeout(a.delayInitialFocusTimer), a.delayInitialFocusTimer = void 0, a.unpausing = void 0, a.paused || o._setSubtreeIsolation(!1), a.alreadySilent.clear(), w(), a.active = !1, a.paused = !1, E(), yb.deactivateTrap(r, o);
			var n = a.activation?.preexistingTrap;
			if (vb(a.activation), !_b.has(n) && n === yb.getActiveTrap(r) && n != null && n.active && !n.paused) {
				var c;
				(c = n._setSubtreeIsolation) == null || c.call(n, !0);
			}
			var l = s(t, "onDeactivate"), u = s(t, "onPostDeactivate"), d = s(t, "checkCanReturnFocus"), f = s(t, "delayReturnFocus"), h = s(t, "returnFocus", "returnFocusOnDeactivate");
			l?.({ trap: o });
			var g = function() {
				h && p(m(a.nodeFocusedBeforeActivation)), u?.({ trap: o });
			}, _ = function() {
				f && h ? Tb(g) : g();
			};
			return h && d ? (d(m(a.nodeFocusedBeforeActivation)).then(_, _), this) : (_(), this);
		},
		pause: function(e) {
			return a.active ? (a.manuallyPaused = !0, this._setPausedState(!0, e)) : this;
		},
		unpause: function(e) {
			return !a.active || (a.manuallyPaused = !1, r[r.length - 1] !== this) ? this : this._setPausedState(!1, e);
		},
		updateContainerElements: function(e) {
			return a.containers = [].concat(e).filter(Boolean).map(function(e) {
				return typeof e == "string" ? n.querySelector(e) : e;
			}), i.isolateSubtrees && C(a.containers), a.active && (f(), a.paused || o._setSubtreeIsolation(!0)), E(), this;
		}
	}, Object.defineProperties(o, {
		_isManuallyPaused: { value: function() {
			return a.manuallyPaused;
		} },
		_setPausedState: { value: function(e, t) {
			if (a.paused === e) return this;
			if (a.paused = e, e) {
				var n = s(t, "onPause"), r = s(t, "onPostPause");
				n?.({ trap: o }), a.unpausing = void 0, w(), o._setSubtreeIsolation(!1), E(), r?.({ trap: o });
			} else {
				var i = s(t, "onUnpause"), c = s(t, "onPostUnpause"), l = {};
				if (a.unpausing = l, i?.({ trap: o }), a.unpausing !== l) return this;
				(function() {
					if (a.active && !a.paused) {
						f();
						var e = function() {
							a.unpausing === l && (_b.has(o) || o._setSubtreeIsolation(!0), E(), c?.({ trap: o }));
						}, t = S();
						t ? t.then(e) : e();
					}
				})();
			}
			return this;
		} },
		_setSubtreeIsolation: { value: function(e) {
			if (i.isolateSubtrees) {
				if (a.subtreeIsolated === e) return;
				a.subtreeIsolated = e, a.adjacentElements.forEach(function(t) {
					if (e) switch (i.isolateSubtrees) {
						case "aria-hidden":
							(t.ariaHidden === "true" || t.getAttribute("aria-hidden")?.toLowerCase() === "true") && a.alreadySilent.add(t), t.setAttribute("aria-hidden", "true");
							break;
						default: (t.inert || t.hasAttribute("inert")) && a.alreadySilent.add(t), t.setAttribute("inert", !0);
					}
					else if (!a.alreadySilent.has(t)) switch (i.isolateSubtrees) {
						case "aria-hidden":
							t.removeAttribute("aria-hidden");
							break;
						default: t.removeAttribute("inert");
					}
				});
			}
		} }
	}), o.updateContainerElements(e), o;
}, Ab = "M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z", jb = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z", Mb = "M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M13,17H11V15H13V17M13,13H11V7H13V13Z", Nb = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z", Pb = "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z", Fb = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1", Ib = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z", Lb = "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", Rb = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z", zb = "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z", Bb = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z", Vb = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z", Hb = "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z", Ub = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", Wb = "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z", Gb = "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z", Kb = "M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V6A2 2 0 0 0 20 4M20 18H9V6H20Z", qb = "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z", Jb = "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", Yb = "M14,19H18V5H14M6,19H10V5H6V19Z", Xb = "M8,5.14V19.14L19,12.14L8,5.14Z", Zb = "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z";
// node_modules/@nextcloud/vue/dist/chunks/focusTrap.mjs
function Qb() {
	return window._nc_focus_trap ??= [], window._nc_focus_trap;
}
function $b() {
	let e = [];
	return {
		pause() {
			e = [...Qb()];
			for (let t of e) t.pause();
		},
		unpause() {
			if (e.length === Qb().length) for (let t of e) t.unpause();
			e = [];
		}
	};
}
// node_modules/@nextcloud/vue/dist/chunks/createElementId.mjs
window._nc_vue_element_id = window._nc_vue_element_id ?? 0;
function ex() {
	return `nc-vue-${window._nc_vue_element_id++}`;
}
// node_modules/@nextcloud/vue/dist/chunks/useNcActions.mjs
var tx = /* @__PURE__ */ Symbol.for("NcActions:isSemanticMenu"), nx = /* @__PURE__ */ Symbol.for("NcActions:closeMenu"), rx = {
	mixins: [{
		beforeUpdate() {
			this.text = this.getText();
		},
		data() {
			return { text: this.getText() };
		},
		computed: { isLongText() {
			return this.text && this.text.trim().length > 20;
		} },
		methods: { getText() {
			return this.$slots.default?.()[0].children?.trim?.() || "";
		} }
	}],
	props: {
		icon: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		closeAfterClick: {
			type: Boolean,
			default: !1
		},
		ariaLabel: {
			type: String,
			default: null
		}
	},
	inject: { closeMenu: { from: nx } },
	emits: ["click"],
	created() {
		"ariaHidden" in this.$attrs && Ec("[NcAction*]: Do not set the ariaHidden attribute as the root element will inherit the incorrect aria-hidden.");
	},
	computed: { isIconUrl() {
		try {
			return !!new URL(this.icon, this.icon.startsWith("/") ? window.location.origin : void 0);
		} catch {
			return !1;
		}
	} },
	methods: { onClick(e) {
		this.$emit("click", e), this.closeAfterClick && this.closeMenu(!1);
	} }
}, ix = {
	name: "NcActionButton",
	components: { NcIconSvgWrapper: vv },
	mixins: [rx],
	inject: { isInSemanticMenu: {
		from: tx,
		default: !1
	} },
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		isMenu: {
			type: Boolean,
			default: !1
		},
		type: {
			type: String,
			default: "button",
			validator: (e) => [
				"button",
				"checkbox",
				"radio",
				"reset",
				"submit"
			].includes(e)
		},
		modelValue: {
			type: [Boolean, String],
			default: null
		},
		value: {
			type: String,
			default: null
		},
		description: {
			type: String,
			default: ""
		}
	},
	emits: ["update:modelValue"],
	setup() {
		return {
			mdiCheck: Ib,
			mdiChevronRight: Bb
		};
	},
	computed: {
		isFocusable() {
			return !this.disabled;
		},
		isChecked() {
			return this.type === "radio" && typeof this.modelValue != "boolean" ? this.modelValue === this.value : this.modelValue;
		},
		nativeType() {
			return this.type === "submit" || this.type === "reset" ? this.type : "button";
		},
		buttonAttributes() {
			let e = {};
			return this.isInSemanticMenu ? (e.role = "menuitem", this.type === "radio" ? (e.role = "menuitemradio", e["aria-checked"] = this.isChecked ? "true" : "false") : (this.type === "checkbox" || this.nativeType === "button" && this.modelValue !== null) && (e.role = "menuitemcheckbox", e["aria-checked"] = this.modelValue === null ? "mixed" : this.modelValue ? "true" : "false")) : this.modelValue !== null && this.nativeType === "button" && (e["aria-pressed"] = this.modelValue ? "true" : "false"), e;
		}
	},
	methods: { handleClick(e) {
		this.onClick(e), (this.modelValue !== null || this.type !== "button") && (this.type === "radio" ? typeof this.modelValue == "boolean" ? this.$emit("update:modelValue", !this.isChecked) : this.isChecked || this.$emit("update:modelValue", this.value) : this.$emit("update:modelValue", !this.isChecked));
	} }
}, ax = ["role"], ox = [
	"aria-label",
	"disabled",
	"title",
	"type"
], sx = { class: "action-button__longtext-wrapper" }, cx = {
	key: 0,
	class: "action-button__name"
}, lx = ["textContent"], ux = {
	key: 2,
	class: "action-button__text"
}, dx = ["textContent"], fx = {
	key: 2,
	class: "action-button__pressed-icon material-design-icon"
};
function px(e, t, n, r, i, a) {
	let o = ya("NcIconSvgWrapper");
	return V(), H("li", {
		class: ve(["action", { "action--disabled": n.disabled }]),
		role: a.isInSemanticMenu && "presentation"
	}, [U("button", Js({
		"aria-label": e.ariaLabel,
		class: ["action-button button-vue", {
			"action-button--active": a.isChecked,
			focusable: a.isFocusable
		}],
		disabled: n.disabled,
		title: e.title,
		type: a.nativeType
	}, a.buttonAttributes, { onClick: t[0] ||= (...e) => a.handleClick && a.handleClick(...e) }), [
		Da(e.$slots, "icon", {}, () => [U("span", {
			class: ve([[e.isIconUrl ? "action-button__icon--url" : e.icon], "action-button__icon"]),
			style: pe({ backgroundImage: e.isIconUrl ? `url(${e.icon})` : null }),
			"aria-hidden": "true"
		}, null, 6)], !0),
		U("span", sx, [
			e.name ? (V(), H("strong", cx, F(e.name), 1)) : Ws("", !0),
			e.isLongText ? (V(), H("span", {
				key: 1,
				class: "action-button__longtext",
				textContent: F(e.text)
			}, null, 8, lx)) : (V(), H("span", ux, F(e.text), 1)),
			n.description ? (V(), H("span", {
				key: 3,
				class: "action-button__description",
				textContent: F(n.description)
			}, null, 8, dx)) : Ws("", !0)
		]),
		n.isMenu ? (V(), Ns(o, {
			key: 0,
			class: "action-button__menu-icon",
			directional: "",
			path: r.mdiChevronRight
		}, null, 8, ["path"])) : a.isChecked ? (V(), Ns(o, {
			key: 1,
			path: r.mdiCheck,
			class: "action-button__pressed-icon"
		}, null, 8, ["path"])) : a.isChecked === !1 ? (V(), H("span", fx)) : Ws("", !0),
		Ws("", !0)
	], 16, ox)], 10, ax);
}
var mx = /* @__PURE__ */ Eg(ix, [["render", px], ["__scopeId", "data-v-6c2daf4e"]]);
// node_modules/@nextcloud/vue/dist/chunks/useTrapStackControl.mjs
function hx(e, t = {}) {
	let n = $b();
	Ir(e, () => {
		B(t.disabled) || (B(e) ? n.pause() : n.unpause());
	}), fa(() => {
		n.unpause();
	});
}
// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var gx = [
	"top",
	"right",
	"bottom",
	"left"
], _x = ["start", "end"], vx = /*#__PURE__*/ gx.reduce((e, t) => e.concat(t, t + "-" + _x[0], t + "-" + _x[1]), []), yx = Math.min, bx = Math.max, xx = Math.round, Sx = Math.floor, Cx = (e) => ({
	x: e,
	y: e
}), wx = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Tx(e, t, n) {
	return bx(e, yx(t, n));
}
function Ex(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Dx(e) {
	return e.split("-")[0];
}
function Ox(e) {
	return e.split("-")[1];
}
function kx(e) {
	return e === "x" ? "y" : "x";
}
function Ax(e) {
	return e === "y" ? "height" : "width";
}
function jx(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Mx(e) {
	return kx(jx(e));
}
function Nx(e, t, n) {
	n === void 0 && (n = !1);
	let r = Ox(e), i = Mx(e), a = Ax(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Hx(o)), [o, Hx(o)];
}
function Px(e) {
	let t = Hx(e);
	return [
		Fx(e),
		t,
		Fx(t)
	];
}
function Fx(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Ix = ["left", "right"], Lx = ["right", "left"], Rx = ["top", "bottom"], zx = ["bottom", "top"];
function Bx(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Lx : Ix : t ? Ix : Lx;
		case "left":
		case "right": return t ? Rx : zx;
		default: return [];
	}
}
function Vx(e, t, n, r) {
	let i = Ox(e), a = Bx(Dx(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Fx)))), a;
}
function Hx(e) {
	let t = Dx(e);
	return wx[t] + e.slice(t.length);
}
function Ux(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function Wx(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Ux(e);
}
function Gx(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Kx(e, t, n) {
	let { reference: r, floating: i } = e, a = jx(t), o = Mx(t), s = Ax(o), c = Dx(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = Ox(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function qx(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Ex(t, e), p = Wx(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = Gx(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = Gx(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Jx = 50, Yx = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: qx
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Kx(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Jx && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Kx(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Xx = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Ex(e, t) || {};
		if (l == null) return {};
		let d = Wx(u), f = {
			x: n,
			y: r
		}, p = Mx(i), m = Ax(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		C && await (o.isElement == null ? void 0 : o.isElement(S)) || (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = yx(d[_], T), D = yx(d[v], T), O = C - h[m] - D, k = C / 2 - h[m] / 2 + w, ee = Tx(E, k, O), te = !c.arrow && Ox(i) != null && k !== ee && a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0, ne = te ? k < E ? k - E : k - O : 0;
		return {
			[p]: f[p] + ne,
			data: {
				[p]: ee,
				centerOffset: k - ee - ne,
				...te && { alignmentOffset: ne }
			},
			reset: te
		};
	}
});
function Zx(e, t, n) {
	return (e ? [...n.filter((t) => Ox(t) === e), ...n.filter((t) => Ox(t) !== e)] : n.filter((e) => Dx(e) === e)).filter((n) => !e || Ox(n) === e || (t ? Fx(n) !== n : !1));
}
var Qx = function(e) {
	return e === void 0 && (e = {}), {
		name: "autoPlacement",
		options: e,
		async fn(t) {
			let { rects: n, middlewareData: r, placement: i, platform: a, elements: o } = t, { crossAxis: s = !1, alignment: c, allowedPlacements: l = vx, autoAlignment: u = !0, ...d } = Ex(e, t), f = c !== void 0 || l === vx ? Zx(c || null, u, l) : l, p = r.autoPlacement?.index || 0, m = f[p];
			if (m == null) return {};
			if (i !== m) return { reset: { placement: f[0] } };
			let h = await a.detectOverflow(t, d), g = Nx(m, n, await (a.isRTL == null ? void 0 : a.isRTL(o.floating))), _ = [
				h[Dx(m)],
				h[g[0]],
				h[g[1]]
			], v = [...r.autoPlacement?.overflows || [], {
				placement: m,
				overflows: _
			}], y = f[p + 1];
			if (y) return {
				data: {
					index: p + 1,
					overflows: v
				},
				reset: { placement: y }
			};
			let b = v.map((e) => {
				let t = Ox(e.placement);
				return [
					e.placement,
					t && s ? e.overflows.slice(0, 2).reduce((e, t) => e + t, 0) : e.overflows[0],
					e.overflows
				];
			}).sort((e, t) => e[1] - t[1]), x = b.filter((e) => e[2].slice(0, Ox(e[0]) ? 2 : 3).every((e) => e <= 0))[0]?.[0] || b[0][0];
			return x === i ? {} : {
				data: {
					index: p + 1,
					overflows: v
				},
				reset: { placement: x }
			};
		}
	};
}, $x = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Ex(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Dx(r), _ = jx(o), v = Dx(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Hx(o)] : Px(o)), x = p !== "none";
			!d && x && b.push(...Vx(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Nx(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === jx(t) || T.every((e) => jx(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = jx(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, eS = /*#__PURE__*/ new Set(["left", "top"]);
async function tS(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Dx(n), s = Ox(n), c = jx(n) === "y", l = eS.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Ex(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var nS = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await tS(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, rS = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Ex(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = jx(i), p = kx(f), m = u[p], h = u[f], g = (e, t) => Tx(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, iS = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Ex(e, t), u = {
				x: n,
				y: r
			}, d = jx(i), f = kx(d), p = u[f], m = u[d], h = Ex(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: h.mainAxis ?? 0,
				crossAxis: h.crossAxis ?? 0
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = eS.has(Dx(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, aS = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = Ex(e, t), c = await i.detectOverflow(t, s), l = Dx(n), u = Ox(n), d = jx(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = yx(p - c[m], g), y = yx(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * bx(c.left, c.right) : S = p - 2 * bx(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function oS() {
	return typeof window < "u";
}
function sS(e) {
	return uS(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function cS(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function lS(e) {
	return ((uS(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function uS(e) {
	return oS() ? e instanceof Node || e instanceof cS(e).Node : !1;
}
function dS(e) {
	return oS() ? e instanceof Element || e instanceof cS(e).Element : !1;
}
function fS(e) {
	return oS() ? e instanceof HTMLElement || e instanceof cS(e).HTMLElement : !1;
}
function pS(e) {
	return !oS() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof cS(e).ShadowRoot;
}
function mS(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = TS(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function hS(e) {
	return /^(table|td|th)$/.test(sS(e));
}
function gS(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var _S = /transform|translate|scale|rotate|perspective|filter/, vS = /paint|layout|strict|content/, yS = (e) => !!e && e !== "none", bS;
function xS(e) {
	let t = dS(e) ? TS(e) : e;
	return yS(t.transform) || yS(t.translate) || yS(t.scale) || yS(t.rotate) || yS(t.perspective) || !CS() && (yS(t.backdropFilter) || yS(t.filter)) || _S.test(t.willChange || "") || vS.test(t.contain || "");
}
function SS(e) {
	let t = DS(e);
	for (; fS(t) && !wS(t);) {
		if (xS(t)) return t;
		if (gS(t)) return null;
		t = DS(t);
	}
	return null;
}
function CS() {
	return bS ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), bS;
}
function wS(e) {
	return /^(html|body|#document)$/.test(sS(e));
}
function TS(e) {
	return cS(e).getComputedStyle(e);
}
function ES(e) {
	return dS(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function DS(e) {
	if (sS(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || pS(e) && e.host || lS(e);
	return pS(t) ? t.host : t;
}
function OS(e) {
	let t = DS(e);
	return wS(t) ? (e.ownerDocument || e).body : fS(t) && mS(t) ? t : OS(t);
}
function kS(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = OS(e), i = r === e.ownerDocument?.body, a = cS(r);
	if (i) {
		let e = AS(a);
		return t.concat(a, a.visualViewport || [], mS(r) ? r : [], e && n ? kS(e) : []);
	}
	return t.concat(r, kS(r, [], n));
}
function AS(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function jS(e) {
	let t = TS(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = fS(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = xx(n) !== a || xx(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function MS(e) {
	return dS(e) ? e : e.contextElement;
}
function NS(e) {
	let t = MS(e);
	if (!fS(t)) return Cx(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = jS(t), o = (a ? xx(n.width) : n.width) / r, s = (a ? xx(n.height) : n.height) / i;
	return o && Number.isFinite(o) || (o = 1), s && Number.isFinite(s) || (s = 1), {
		x: o,
		y: s
	};
}
var PS = /*#__PURE__*/ Cx(0);
function FS(e) {
	let t = cS(e);
	return !CS() || !t.visualViewport ? PS : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function IS(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === cS(e);
}
function LS(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = MS(e), o = Cx(1);
	t && (r ? dS(r) && (o = NS(r)) : o = NS(e));
	let s = IS(a, n, r) ? FS(a) : Cx(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = cS(a), t = dS(r) ? cS(r) : r, n = e, i = AS(n);
		for (; i && t !== n;) {
			let e = NS(i), t = i.getBoundingClientRect(), r = TS(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = cS(i), i = AS(n);
		}
	}
	return Gx({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function RS(e, t) {
	let n = ES(e).scrollLeft;
	return t ? t.left + n : LS(lS(e)).left + n;
}
function zS(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - RS(e, n),
		y: n.top + t.scrollTop
	};
}
function BS(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = lS(r), s = t ? gS(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Cx(1), u = Cx(0), d = fS(r);
	if ((d || !a) && ((sS(r) !== "body" || mS(o)) && (c = ES(r)), d)) {
		let e = LS(r);
		l = NS(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? zS(o, c) : Cx(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function VS(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function HS(e) {
	let t = ES(e), n = e.ownerDocument.body, r = bx(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = bx(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + RS(e), o = -t.scrollTop;
	return TS(n).direction === "rtl" && (a += bx(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var US = 25;
function WS(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = cS(e), a = lS(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !CS() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (RS(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= US && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function GS(e, t) {
	let n = LS(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = NS(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function KS(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = WS(e, n, t);
	else if (t === "document") r = HS(lS(e));
	else if (dS(t)) r = GS(t, n);
	else {
		let n = FS(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return Gx(r);
}
function qS(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = kS(e, [], !1).filter((e) => dS(e) && sS(e) !== "body"), i = null, a = TS(e).position === "fixed", o = a ? DS(e) : e;
	for (; dS(o) && !wS(o);) {
		let e = TS(o), t = xS(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = DS(o);
	}
	return t.set(e, r), r;
}
function JS(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? gS(t) ? [] : qS(t, this._c) : [].concat(n), r], o = KS(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = KS(t, a[e], i);
		s = bx(n.top, s), c = yx(n.right, c), l = yx(n.bottom, l), u = bx(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function YS(e) {
	let { width: t, height: n } = jS(e);
	return {
		width: t,
		height: n
	};
}
function XS(e, t, n) {
	let r = fS(t), i = lS(t), a = n === "fixed", o = LS(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Cx(0);
	if ((r || !a) && ((sS(t) !== "body" || mS(i)) && (s = ES(t)), r)) {
		let e = LS(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = RS(i));
	let l = i && !r && !a ? zS(i, s) : Cx(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function ZS(e) {
	return TS(e).position === "static";
}
function QS(e, t) {
	if (!fS(e) || TS(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return lS(e) === n && (n = n.ownerDocument.body), n;
}
function $S(e, t) {
	let n = cS(e);
	if (gS(e)) return n;
	if (!fS(e)) {
		let t = DS(e);
		for (; t && !wS(t);) {
			if (dS(t) && !ZS(t)) return t;
			t = DS(t);
		}
		return n;
	}
	let r = QS(e, t);
	for (; r && hS(r) && ZS(r);) r = QS(r, t);
	return r && wS(r) && ZS(r) && !xS(r) ? n : r || SS(e) || n;
}
var eC = async function(e) {
	let t = this.getOffsetParent || $S, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: XS(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function tC(e) {
	return TS(e).direction === "rtl";
}
var nC = {
	convertOffsetParentRelativeRectToViewportRelativeRect: BS,
	getDocumentElement: lS,
	getClippingRect: JS,
	getOffsetParent: $S,
	getElementRects: eC,
	getClientRects: VS,
	getDimensions: YS,
	getScale: NS,
	isElement: dS,
	isRTL: tC
};
function rC(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function iC(e, t, n) {
	let r = null, i, a = lS(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = Sx(d), h = Sx(a.clientWidth - (u + f)), g = Sx(a.clientHeight - (d + p)), _ = Sx(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: bx(0, yx(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!rC(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = cS(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function aC(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = MS(e), u = i || a ? [...l ? kS(l) : [], ...t ? kS(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? iC(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? LS(e) : null;
	c && g();
	function g() {
		let t = LS(e);
		h && !rC(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var oC = nS, sC = Qx, cC = rS, lC = $x, uC = aS, dC = Xx, fC = iS, pC = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...nC,
		...i.platform,
		_c: r
	};
	return Yx(e, t, {
		...i,
		platform: a
	});
}, mC = {
	disabled: !1,
	distance: 5,
	skidding: 0,
	container: "body",
	boundary: void 0,
	instantMove: !1,
	disposeTimeout: 150,
	popperTriggers: [],
	strategy: "absolute",
	preventOverflow: !0,
	flip: !0,
	shift: !0,
	overflowPadding: 0,
	arrowPadding: 0,
	arrowOverflow: !0,
	autoHideOnMousedown: !1,
	themes: {
		tooltip: {
			placement: "top",
			triggers: [
				"hover",
				"focus",
				"touch"
			],
			hideTriggers: (e) => [...e, "click"],
			delay: {
				show: 200,
				hide: 0
			},
			handleResize: !1,
			html: !1,
			loadingContent: "..."
		},
		dropdown: {
			placement: "bottom",
			triggers: ["click"],
			delay: 0,
			handleResize: !0,
			autoHide: !0
		},
		menu: {
			$extend: "dropdown",
			triggers: ["hover", "focus"],
			popperTriggers: ["hover"],
			delay: {
				show: 0,
				hide: 400
			}
		}
	}
};
function hC(e, t) {
	let n = mC.themes[e] || {}, r;
	do
		r = n[t], r === void 0 ? n.$extend ? n = mC.themes[n.$extend] || {} : (n = null, r = mC[t]) : n = null;
	while (n);
	return r;
}
function gC(e) {
	let t = [e], n = mC.themes[e] || {};
	do
		n.$extend && !n.$resetCss ? (t.push(n.$extend), n = mC.themes[n.$extend] || {}) : n = null;
	while (n);
	return t.map((e) => `v-popper--theme-${e}`);
}
function _C(e) {
	let t = [e], n = mC.themes[e] || {};
	do
		n.$extend ? (t.push(n.$extend), n = mC.themes[n.$extend] || {}) : n = null;
	while (n);
	return t;
}
var vC = (() => {
	if (typeof window > "u") return !1;
	let e = !1;
	try {
		let t = Object.defineProperty({}, "passive", { get() {
			e = !0;
		} });
		window.addEventListener("test", null, t);
	} catch {}
	return e;
})(), yC = typeof window < "u" && typeof navigator < "u" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, bC = [
	"auto",
	"top",
	"bottom",
	"left",
	"right"
].reduce((e, t) => e.concat([
	t,
	`${t}-start`,
	`${t}-end`
]), []), xC = {
	hover: "mouseenter",
	focus: "focus",
	click: "click",
	touch: "touchstart",
	pointer: "pointerdown"
}, SC = {
	hover: "mouseleave",
	focus: "blur",
	click: "click",
	touch: "touchend",
	pointer: "pointerup"
};
function CC(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function wC() {
	return new Promise((e) => requestAnimationFrame(() => {
		requestAnimationFrame(e);
	}));
}
var TC = [], EC = null, DC = {};
function OC(e) {
	let t = DC[e];
	return t ||= DC[e] = [], t;
}
var kC = function() {};
typeof window < "u" && (kC = window.Element);
function Z(e) {
	return function(t) {
		return hC(t.theme, e);
	};
}
var AC = "__floating-vue__popper", jC = () => /* @__PURE__ */ hi({
	name: "VPopper",
	provide() {
		return { [AC]: { parentPopper: this } };
	},
	inject: { [AC]: { default: null } },
	props: {
		theme: {
			type: String,
			required: !0
		},
		targetNodes: {
			type: Function,
			required: !0
		},
		referenceNode: {
			type: Function,
			default: null
		},
		popperNode: {
			type: Function,
			required: !0
		},
		shown: {
			type: Boolean,
			default: !1
		},
		showGroup: {
			type: String,
			default: null
		},
		ariaId: { default: null },
		disabled: {
			type: Boolean,
			default: Z("disabled")
		},
		positioningDisabled: {
			type: Boolean,
			default: Z("positioningDisabled")
		},
		placement: {
			type: String,
			default: Z("placement"),
			validator: (e) => bC.includes(e)
		},
		delay: {
			type: [
				String,
				Number,
				Object
			],
			default: Z("delay")
		},
		distance: {
			type: [Number, String],
			default: Z("distance")
		},
		skidding: {
			type: [Number, String],
			default: Z("skidding")
		},
		triggers: {
			type: Array,
			default: Z("triggers")
		},
		showTriggers: {
			type: [Array, Function],
			default: Z("showTriggers")
		},
		hideTriggers: {
			type: [Array, Function],
			default: Z("hideTriggers")
		},
		popperTriggers: {
			type: Array,
			default: Z("popperTriggers")
		},
		popperShowTriggers: {
			type: [Array, Function],
			default: Z("popperShowTriggers")
		},
		popperHideTriggers: {
			type: [Array, Function],
			default: Z("popperHideTriggers")
		},
		container: {
			type: [
				String,
				Object,
				kC,
				Boolean
			],
			default: Z("container")
		},
		boundary: {
			type: [String, kC],
			default: Z("boundary")
		},
		strategy: {
			type: String,
			validator: (e) => ["absolute", "fixed"].includes(e),
			default: Z("strategy")
		},
		autoHide: {
			type: [Boolean, Function],
			default: Z("autoHide")
		},
		handleResize: {
			type: Boolean,
			default: Z("handleResize")
		},
		instantMove: {
			type: Boolean,
			default: Z("instantMove")
		},
		eagerMount: {
			type: Boolean,
			default: Z("eagerMount")
		},
		popperClass: {
			type: [
				String,
				Array,
				Object
			],
			default: Z("popperClass")
		},
		computeTransformOrigin: {
			type: Boolean,
			default: Z("computeTransformOrigin")
		},
		autoMinSize: {
			type: Boolean,
			default: Z("autoMinSize")
		},
		autoSize: {
			type: [Boolean, String],
			default: Z("autoSize")
		},
		autoMaxSize: {
			type: Boolean,
			default: Z("autoMaxSize")
		},
		autoBoundaryMaxSize: {
			type: Boolean,
			default: Z("autoBoundaryMaxSize")
		},
		preventOverflow: {
			type: Boolean,
			default: Z("preventOverflow")
		},
		overflowPadding: {
			type: [Number, String],
			default: Z("overflowPadding")
		},
		arrowPadding: {
			type: [Number, String],
			default: Z("arrowPadding")
		},
		arrowOverflow: {
			type: Boolean,
			default: Z("arrowOverflow")
		},
		flip: {
			type: Boolean,
			default: Z("flip")
		},
		shift: {
			type: Boolean,
			default: Z("shift")
		},
		shiftCrossAxis: {
			type: Boolean,
			default: Z("shiftCrossAxis")
		},
		noAutoFocus: {
			type: Boolean,
			default: Z("noAutoFocus")
		},
		disposeTimeout: {
			type: Number,
			default: Z("disposeTimeout")
		}
	},
	emits: {
		show: () => !0,
		hide: () => !0,
		"update:shown": (e) => !0,
		"apply-show": () => !0,
		"apply-hide": () => !0,
		"close-group": () => !0,
		"close-directive": () => !0,
		"auto-hide": () => !0,
		resize: () => !0
	},
	data() {
		return {
			isShown: !1,
			isMounted: !1,
			skipTransition: !1,
			classes: {
				showFrom: !1,
				showTo: !1,
				hideFrom: !1,
				hideTo: !0
			},
			result: {
				x: 0,
				y: 0,
				placement: "",
				strategy: this.strategy,
				arrow: {
					x: 0,
					y: 0,
					centerOffset: 0
				},
				transformOrigin: null
			},
			randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
			shownChildren: /* @__PURE__ */ new Set(),
			lastAutoHide: !0,
			pendingHide: !1,
			containsGlobalTarget: !1,
			isDisposed: !0,
			mouseDownContains: !1
		};
	},
	computed: {
		popperId() {
			return this.ariaId ?? this.randomId;
		},
		shouldMountContent() {
			return this.eagerMount || this.isMounted;
		},
		slotData() {
			return {
				popperId: this.popperId,
				isShown: this.isShown,
				shouldMountContent: this.shouldMountContent,
				skipTransition: this.skipTransition,
				autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
				show: this.show,
				hide: this.hide,
				handleResize: this.handleResize,
				onResize: this.onResize,
				classes: {
					...this.classes,
					popperClass: this.popperClass
				},
				result: this.positioningDisabled ? null : this.result,
				attrs: this.$attrs
			};
		},
		parentPopper() {
			return this[AC]?.parentPopper;
		},
		hasPopperShowTriggerHover() {
			return this.popperTriggers?.includes("hover") || this.popperShowTriggers?.includes("hover");
		}
	},
	watch: {
		shown: "$_autoShowHide",
		disabled(e) {
			e ? this.dispose() : this.init();
		},
		async container() {
			this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
		},
		triggers: {
			handler: "$_refreshListeners",
			deep: !0
		},
		positioningDisabled: "$_refreshListeners",
		...[
			"placement",
			"distance",
			"skidding",
			"boundary",
			"strategy",
			"overflowPadding",
			"arrowPadding",
			"preventOverflow",
			"shift",
			"shiftCrossAxis",
			"flip"
		].reduce((e, t) => (e[t] = "$_computePosition", e), {})
	},
	created() {
		this.autoMinSize && console.warn("[floating-vue] `autoMinSize` option is deprecated. Use `autoSize=\"min\"` instead."), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
	},
	mounted() {
		this.init(), this.$_detachPopperNode();
	},
	activated() {
		this.$_autoShowHide();
	},
	deactivated() {
		this.hide();
	},
	beforeUnmount() {
		this.dispose();
	},
	methods: {
		show({ event: e = null, skipDelay: t = !1, force: n = !1 } = {}) {
			this.parentPopper?.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = !1, (n || !this.disabled) && (this.parentPopper?.lockedChild === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = !0, requestAnimationFrame(() => {
				this.$_showFrameLocked = !1;
			})), this.$emit("update:shown", !0));
		},
		hide({ event: e = null, skipDelay: t = !1 } = {}) {
			this.$_hideInProgress || (this.shownChildren.size > 0 ? this.pendingHide = !0 : this.hasPopperShowTriggerHover && this.$_isAimingPopper() ? this.parentPopper && (this.parentPopper.lockedChild = this, this.parentPopper.lockedChildTimer && clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
				this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
			}, 1e3)) : (this.parentPopper?.lockedChild === this && (this.parentPopper.lockedChild = null), this.pendingHide = !1, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", !1)));
		},
		init() {
			this.isDisposed && (this.isDisposed = !1, this.isMounted = !1, this.$_events = [], this.$_preventShow = !1, this.$_referenceNode = this.referenceNode?.call(this) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((e) => e.nodeType === e.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
		},
		dispose() {
			this.isDisposed || (this.isDisposed = !0, this.$_removeEventListeners(), this.hide({ skipDelay: !0 }), this.$_detachPopperNode(), this.isMounted = !1, this.isShown = !1, this.$_updateParentShownChildren(!1), this.$_swapTargetAttrs("data-original-title", "title"));
		},
		async onResize() {
			this.isShown && (await this.$_computePosition(), this.$emit("resize"));
		},
		async $_computePosition() {
			if (this.isDisposed || this.positioningDisabled) return;
			let e = {
				strategy: this.strategy,
				middleware: []
			};
			(this.distance || this.skidding) && e.middleware.push(oC({
				mainAxis: this.distance,
				crossAxis: this.skidding
			}));
			let t = this.placement.startsWith("auto");
			if (t ? e.middleware.push(sC({ alignment: this.placement.split("-")[1] ?? "" })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(cC({
				padding: this.overflowPadding,
				boundary: this.boundary,
				crossAxis: this.shiftCrossAxis
			})), !t && this.flip && e.middleware.push(lC({
				padding: this.overflowPadding,
				boundary: this.boundary
			}))), e.middleware.push(dC({
				element: this.$_arrowNode,
				padding: this.arrowPadding
			})), this.arrowOverflow && e.middleware.push({
				name: "arrowOverflow",
				fn: ({ placement: e, rects: t, middlewareData: n }) => {
					let r, { centerOffset: i } = n.arrow;
					return r = e.startsWith("top") || e.startsWith("bottom") ? Math.abs(i) > t.reference.width / 2 : Math.abs(i) > t.reference.height / 2, { data: { overflow: r } };
				}
			}), this.autoMinSize || this.autoSize) {
				let t = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
				e.middleware.push({
					name: "autoSize",
					fn: ({ rects: e, placement: n, middlewareData: r }) => {
						if (r.autoSize?.skip) return {};
						let i, a;
						return n.startsWith("top") || n.startsWith("bottom") ? i = e.reference.width : a = e.reference.height, this.$_innerNode.style[t === "min" ? "minWidth" : t === "max" ? "maxWidth" : "width"] = i == null ? null : `${i}px`, this.$_innerNode.style[t === "min" ? "minHeight" : t === "max" ? "maxHeight" : "height"] = a == null ? null : `${a}px`, {
							data: { skip: !0 },
							reset: { rects: !0 }
						};
					}
				});
			}
			(this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(uC({
				boundary: this.boundary,
				padding: this.overflowPadding,
				apply: ({ availableWidth: e, availableHeight: t }) => {
					this.$_innerNode.style.maxWidth = e == null ? null : `${e}px`, this.$_innerNode.style.maxHeight = t == null ? null : `${t}px`;
				}
			})));
			let n = await pC(this.$_referenceNode, this.$_popperNode, e);
			Object.assign(this.result, {
				x: n.x,
				y: n.y,
				placement: n.placement,
				strategy: n.strategy,
				arrow: {
					...n.middlewareData.arrow,
					...n.middlewareData.arrowOverflow
				}
			});
		},
		$_scheduleShow(e, t = !1) {
			this.$_updateParentShownChildren(!0), this.$_hideInProgress = !1, clearTimeout(this.$_scheduleTimer), EC && this.instantMove && EC.instantMove && EC !== this.parentPopper ? (EC.$_applyHide(!0), this.$_applyShow(!0)) : t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
		},
		$_scheduleHide(e, t = !1) {
			this.shownChildren.size > 0 ? this.pendingHide = !0 : (this.$_updateParentShownChildren(!1), this.$_hideInProgress = !0, this.$_scheduleTimer && clearTimeout(this.$_scheduleTimer), this.isShown && (EC = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide")));
		},
		$_computeDelay(e) {
			let t = this.delay;
			return parseInt(t && t[e] || t || 0);
		},
		async $_applyShow(e = !1) {
			this.$_disposeTimer && clearTimeout(this.$_disposeTimer), this.$_scheduleTimer && clearTimeout(this.$_scheduleTimer), this.skipTransition = e, this.isShown || (this.$_ensureTeleport(), await wC(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([...kS(this.$_referenceNode), ...kS(this.$_popperNode)], "scroll", () => {
				this.$_computePosition();
			}));
		},
		async $_applyShowEffect() {
			if (this.$_hideInProgress) return;
			if (this.computeTransformOrigin) {
				let e = this.$_referenceNode.getBoundingClientRect(), t = this.$_popperNode.querySelector(".v-popper__wrapper"), n = t.parentNode.getBoundingClientRect(), r = e.x + e.width / 2 - (n.left + t.offsetLeft), i = e.y + e.height / 2 - (n.top + t.offsetTop);
				this.result.transformOrigin = `${r}px ${i}px`;
			}
			this.isShown = !0, this.$_applyAttrsToTarget({
				"aria-describedby": this.popperId,
				"data-popper-shown": ""
			});
			let e = this.showGroup;
			if (e) {
				let t;
				for (let n = 0; n < TC.length; n++) t = TC[n], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
			}
			TC.push(this), document.body.classList.add("v-popper--some-open");
			for (let e of _C(this.theme)) OC(e).push(this), document.body.classList.add(`v-popper--some-open--${e}`);
			this.$emit("apply-show"), this.classes.showFrom = !0, this.classes.showTo = !1, this.classes.hideFrom = !1, this.classes.hideTo = !1, await wC(), this.classes.showFrom = !1, this.classes.showTo = !0, this.noAutoFocus || this.$_popperNode.focus();
		},
		async $_applyHide(e = !1) {
			if (this.shownChildren.size > 0) {
				this.pendingHide = !0, this.$_hideInProgress = !1;
				return;
			}
			if (this.$_scheduleTimer && clearTimeout(this.$_scheduleTimer), !this.isShown) return;
			this.skipTransition = e, CC(TC, this), TC.length === 0 && document.body.classList.remove("v-popper--some-open");
			for (let e of _C(this.theme)) {
				let t = OC(e);
				CC(t, this), t.length === 0 && document.body.classList.remove(`v-popper--some-open--${e}`);
			}
			EC === this && (EC = null), this.isShown = !1, this.$_applyAttrsToTarget({
				"aria-describedby": void 0,
				"data-popper-shown": void 0
			}), this.$_disposeTimer && clearTimeout(this.$_disposeTimer);
			let t = this.disposeTimeout;
			t !== null && (this.$_disposeTimer = setTimeout(() => {
				this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = !1);
			}, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = !1, this.classes.showTo = !1, this.classes.hideFrom = !0, this.classes.hideTo = !1, await wC(), this.classes.hideFrom = !1, this.classes.hideTo = !0;
		},
		$_autoShowHide() {
			this.shown ? this.show() : this.hide();
		},
		$_ensureTeleport() {
			if (this.isDisposed) return;
			let e = this.container;
			if (typeof e == "string" ? e = window.document.querySelector(e) : e === !1 && (e = this.$_targetNodes[0].parentNode), !e) throw Error(`No container for popover: ${this.container}`);
			e.appendChild(this.$_popperNode), this.isMounted = !0;
		},
		$_addEventListeners() {
			let e = (e) => {
				(!this.isShown || this.$_hideInProgress) && (e.usedByTooltip = !0, !this.$_preventShow && this.show({ event: e }));
			};
			this.$_registerTriggerListeners(this.$_targetNodes, xC, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], xC, this.popperTriggers, this.popperShowTriggers, e);
			let t = (e) => {
				e.usedByTooltip || this.hide({ event: e });
			};
			this.$_registerTriggerListeners(this.$_targetNodes, SC, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], SC, this.popperTriggers, this.popperHideTriggers, t);
		},
		$_registerEventListeners(e, t, n) {
			this.$_events.push({
				targetNodes: e,
				eventType: t,
				handler: n
			}), e.forEach((e) => e.addEventListener(t, n, vC ? { passive: !0 } : void 0));
		},
		$_registerTriggerListeners(e, t, n, r, i) {
			let a = n;
			r != null && (a = typeof r == "function" ? r(a) : r), a.forEach((n) => {
				let r = t[n];
				r && this.$_registerEventListeners(e, r, i);
			});
		},
		$_removeEventListeners(e) {
			let t = [];
			this.$_events.forEach((n) => {
				let { targetNodes: r, eventType: i, handler: a } = n;
				!e || e === i ? r.forEach((e) => e.removeEventListener(i, a)) : t.push(n);
			}), this.$_events = t;
		},
		$_refreshListeners() {
			this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
		},
		$_handleGlobalClose(e, t = !1) {
			this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = !0, setTimeout(() => {
				this.$_preventShow = !1;
			}, 300)));
		},
		$_detachPopperNode() {
			this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
		},
		$_swapTargetAttrs(e, t) {
			for (let n of this.$_targetNodes) {
				let r = n.getAttribute(e);
				r && (n.removeAttribute(e), n.setAttribute(t, r));
			}
		},
		$_applyAttrsToTarget(e) {
			for (let t of this.$_targetNodes) for (let n in e) {
				let r = e[n];
				r == null ? t.removeAttribute(n) : t.setAttribute(n, r);
			}
		},
		$_updateParentShownChildren(e) {
			let t = this.parentPopper;
			for (; t;) e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
		},
		$_isAimingPopper() {
			let e = this.$_referenceNode.getBoundingClientRect();
			if (BC >= e.left && BC <= e.right && VC >= e.top && VC <= e.bottom) {
				let e = this.$_popperNode.getBoundingClientRect(), t = BC - RC, n = VC - zC, r = e.left + e.width / 2 - RC + (e.top + e.height / 2) - zC + e.width + e.height, i = RC + t * r, a = zC + n * r;
				return HC(RC, zC, i, a, e.left, e.top, e.left, e.bottom) || HC(RC, zC, i, a, e.left, e.top, e.right, e.top) || HC(RC, zC, i, a, e.right, e.top, e.right, e.bottom) || HC(RC, zC, i, a, e.left, e.bottom, e.right, e.bottom);
			}
			return !1;
		}
	},
	render() {
		return this.$slots.default(this.slotData);
	}
});
if (typeof document < "u" && typeof window < "u") {
	if (yC) {
		let e = !vC || {
			passive: !0,
			capture: !0
		};
		document.addEventListener("touchstart", (e) => MC(e, !0), e), document.addEventListener("touchend", (e) => NC(e, !0), e);
	} else window.addEventListener("mousedown", (e) => MC(e, !1), !0), window.addEventListener("click", (e) => NC(e, !1), !0);
	window.addEventListener("resize", LC);
}
function MC(e, t) {
	if (mC.autoHideOnMousedown) PC(e, t);
	else for (let t = 0; t < TC.length; t++) {
		let n = TC[t];
		try {
			n.mouseDownContains = n.popperNode().contains(e.target);
		} catch {}
	}
}
function NC(e, t) {
	mC.autoHideOnMousedown || PC(e, t);
}
function PC(e, t) {
	let n = {};
	for (let r = TC.length - 1; r >= 0; r--) {
		let i = TC[r];
		try {
			let r = Array.from(i.shownChildren).some((t) => {
				let n = TC.find((e) => e.randomId === t);
				return n && n.popperNode().contains(e.target);
			}), a = i.containsGlobalTarget = i.mouseDownContains || i.popperNode().contains(e.target) || r;
			i.pendingHide = !1, requestAnimationFrame(() => {
				if (i.pendingHide = !1, !n[i.randomId] && FC(i, a, e)) {
					if (i.$_handleGlobalClose(e, t), !e.closeAllPopover && e.closePopover && a) {
						let e = i.parentPopper;
						for (; e;) n[e.randomId] = !0, e = e.parentPopper;
						return;
					}
					let r = i.parentPopper;
					for (; r && FC(r, r.containsGlobalTarget, e);) r.$_handleGlobalClose(e, t), r = r.parentPopper;
				}
			});
		} catch {}
	}
}
function FC(e, t, n) {
	return n.closeAllPopover || n.closePopover && t || IC(e, n) && !t;
}
function IC(e, t) {
	if (typeof e.autoHide == "function") {
		let n = e.autoHide(t);
		return e.lastAutoHide = n, n;
	}
	return e.autoHide;
}
function LC() {
	for (let e = 0; e < TC.length; e++) TC[e].$_computePosition();
}
var RC = 0, zC = 0, BC = 0, VC = 0;
typeof window < "u" && window.addEventListener("mousemove", (e) => {
	RC = BC, zC = VC, BC = e.clientX, VC = e.clientY;
}, vC ? { passive: !0 } : void 0);
function HC(e, t, n, r, i, a, o, s) {
	let c = ((o - i) * (t - a) - (s - a) * (e - i)) / ((s - a) * (n - e) - (o - i) * (r - t)), l = ((n - e) * (t - a) - (r - t) * (e - i)) / ((s - a) * (n - e) - (o - i) * (r - t));
	return c >= 0 && c <= 1 && l >= 0 && l <= 1;
}
var UC = /* @__PURE__ */ hi({
	extends: jC(),
	render() {
		var e;
		return K("div", {
			ref: "reference",
			class: ["v-popper", { "v-popper--shown": this.slotData.isShown }]
		}, (e = this.$slots).default?.call(e, this.slotData));
	}
}), WC = (e = "theme") => ({ computed: { themeClass() {
	return gC(this[e]);
} } }), GC = /* @__PURE__ */ hi({
	name: "VPopperContent",
	mixins: [WC()],
	props: {
		popperId: String,
		theme: String,
		shown: Boolean,
		mounted: Boolean,
		skipTransition: Boolean,
		autoHide: Boolean,
		handleResize: Boolean,
		classes: Object,
		result: Object
	},
	emits: ["hide", "resize"],
	mounted() {
		this.handleResize && (this.$_resizeObserver = new ResizeObserver(() => this.$emit("resize")), this.$_resizeObserver.observe(this.$refs.inner));
	},
	beforeUnmount() {
		var e;
		(e = this.$_resizeObserver) == null || e.disconnect();
	},
	methods: { toPx(e) {
		return e != null && !Number.isNaN(e) ? `${e}px` : null;
	} },
	render() {
		var e;
		let { autoHide: t, classes: n, result: r, shown: i } = this;
		return K("div", {
			id: this.popperId,
			ref: "popover",
			"data-allow-mismatch": "",
			class: [
				"v-popper__popper",
				this.themeClass,
				n.popperClass,
				{
					"v-popper__popper--shown": i,
					"v-popper__popper--hidden": !i,
					"v-popper__popper--show-from": n.showFrom,
					"v-popper__popper--show-to": n.showTo,
					"v-popper__popper--hide-from": n.hideFrom,
					"v-popper__popper--hide-to": n.hideTo,
					"v-popper__popper--skip-transition": this.skipTransition,
					"v-popper__popper--arrow-overflow": r && r.arrow.overflow,
					"v-popper__popper--no-positioning": !r
				}
			],
			style: r ? {
				position: r.strategy,
				transform: `translate3d(${Math.round(r.x)}px,${Math.round(r.y)}px,0)`
			} : void 0,
			"aria-hidden": i || t ? "false" : "true",
			tabindex: t ? 0 : void 0,
			"data-popper-placement": r ? r.placement : void 0,
			onKeyup: (e) => {
				e.key === "Escape" && t && this.$emit("hide");
			}
		}, [K("div", {
			class: "v-popper__backdrop",
			onClick: () => t && this.$emit("hide")
		}), K("div", {
			class: "v-popper__wrapper",
			style: r ? { transformOrigin: r.transformOrigin } : void 0
		}, [K("div", {
			ref: "inner",
			class: "v-popper__inner"
		}, this.mounted ? [K("div", (e = this.$slots).default?.call(e))] : void 0), K("div", {
			ref: "arrow",
			class: "v-popper__arrow-container",
			style: r ? {
				left: this.toPx(r.arrow.x),
				top: this.toPx(r.arrow.y)
			} : void 0
		}, [K("div", { class: "v-popper__arrow-outer" }), K("div", { class: "v-popper__arrow-inner" })])])]);
	}
}), KC = { methods: {
	show(...e) {
		return this.$refs.popper.show(...e);
	},
	hide(...e) {
		return this.$refs.popper.hide(...e);
	},
	dispose(...e) {
		return this.$refs.popper.dispose(...e);
	},
	onResize(...e) {
		return this.$refs.popper.onResize(...e);
	}
} }, qC = function() {};
typeof window < "u" && (qC = window.Element);
var JC = /* @__PURE__ */ hi({
	name: "VPopperWrapper",
	mixins: [KC, WC("finalTheme")],
	props: {
		theme: {
			type: String,
			default: null
		},
		referenceNode: {
			type: Function,
			default: null
		},
		shown: {
			type: Boolean,
			default: !1
		},
		showGroup: {
			type: String,
			default: null
		},
		ariaId: { default: null },
		disabled: {
			type: Boolean,
			default: void 0
		},
		positioningDisabled: {
			type: Boolean,
			default: void 0
		},
		placement: {
			type: String,
			default: void 0
		},
		delay: {
			type: [
				String,
				Number,
				Object
			],
			default: void 0
		},
		distance: {
			type: [Number, String],
			default: void 0
		},
		skidding: {
			type: [Number, String],
			default: void 0
		},
		triggers: {
			type: Array,
			default: void 0
		},
		showTriggers: {
			type: [Array, Function],
			default: void 0
		},
		hideTriggers: {
			type: [Array, Function],
			default: void 0
		},
		popperTriggers: {
			type: Array,
			default: void 0
		},
		popperShowTriggers: {
			type: [Array, Function],
			default: void 0
		},
		popperHideTriggers: {
			type: [Array, Function],
			default: void 0
		},
		container: {
			type: [
				String,
				Object,
				qC,
				Boolean
			],
			default: void 0
		},
		boundary: {
			type: [String, qC],
			default: void 0
		},
		strategy: {
			type: String,
			default: void 0
		},
		autoHide: {
			type: [Boolean, Function],
			default: void 0
		},
		handleResize: {
			type: Boolean,
			default: void 0
		},
		instantMove: {
			type: Boolean,
			default: void 0
		},
		eagerMount: {
			type: Boolean,
			default: void 0
		},
		popperClass: {
			type: [
				String,
				Array,
				Object
			],
			default: void 0
		},
		computeTransformOrigin: {
			type: Boolean,
			default: void 0
		},
		autoMinSize: {
			type: Boolean,
			default: void 0
		},
		autoSize: {
			type: [Boolean, String],
			default: void 0
		},
		autoMaxSize: {
			type: Boolean,
			default: void 0
		},
		autoBoundaryMaxSize: {
			type: Boolean,
			default: void 0
		},
		preventOverflow: {
			type: Boolean,
			default: void 0
		},
		overflowPadding: {
			type: [Number, String],
			default: void 0
		},
		arrowPadding: {
			type: [Number, String],
			default: void 0
		},
		arrowOverflow: {
			type: Boolean,
			default: void 0
		},
		flip: {
			type: Boolean,
			default: void 0
		},
		shift: {
			type: Boolean,
			default: void 0
		},
		shiftCrossAxis: {
			type: Boolean,
			default: void 0
		},
		noAutoFocus: {
			type: Boolean,
			default: void 0
		},
		disposeTimeout: {
			type: Number,
			default: void 0
		}
	},
	emits: {
		show: () => !0,
		hide: () => !0,
		"update:shown": (e) => !0,
		"apply-show": () => !0,
		"apply-hide": () => !0,
		"close-group": () => !0,
		"close-directive": () => !0,
		"auto-hide": () => !0,
		resize: () => !0
	},
	computed: { finalTheme() {
		return this.theme ?? this.$options.vPopperTheme;
	} },
	methods: { getTargetNodes() {
		return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
	} },
	render() {
		return K(UC, {
			ref: "popper",
			...this.$props,
			theme: this.finalTheme,
			targetNodes: this.getTargetNodes,
			popperNode: () => this.$refs.popperContent.$el,
			class: [this.themeClass],
			onShow: () => this.$emit("show"),
			onHide: () => this.$emit("hide"),
			"onUpdate:shown": (e) => this.$emit("update:shown", e),
			onApplyShow: () => this.$emit("apply-show"),
			onApplyHide: () => this.$emit("apply-hide"),
			onCloseGroup: () => this.$emit("close-group"),
			onCloseDirective: () => this.$emit("close-directive"),
			onAutoHide: () => this.$emit("auto-hide"),
			onResize: () => this.$emit("resize")
		}, { default: ({ popperId: e, isShown: t, shouldMountContent: n, skipTransition: r, autoHide: i, show: a, hide: o, handleResize: s, onResize: c, classes: l, result: u }) => {
			var d;
			return [(d = this.$slots).default?.call(d, {
				shown: t,
				show: a,
				hide: o
			}), K(GC, {
				ref: "popperContent",
				popperId: e,
				theme: this.finalTheme,
				shown: t,
				mounted: n,
				skipTransition: r,
				autoHide: i,
				handleResize: s,
				classes: l,
				result: u,
				onHide: o,
				onResize: c
			}, { default: () => {
				var e;
				return (e = this.$slots).popper?.call(e, {
					shown: t,
					hide: o
				});
			} })];
		} });
	}
});
function YC(e, t) {
	return {
		...JC,
		name: e,
		vPopperTheme: t
	};
}
var XC = YC("VDropdown", "dropdown");
YC("VMenu", "menu"), YC("VTooltip", "tooltip"), jC();
var ZC = mC, QC = class e {
	static GLOBAL_SCOPE_VOLATILE = "nextcloud_vol";
	static GLOBAL_SCOPE_PERSISTENT = "nextcloud_per";
	scope;
	wrapped;
	constructor(t, n, r) {
		this.scope = `${r ? e.GLOBAL_SCOPE_PERSISTENT : e.GLOBAL_SCOPE_VOLATILE}_${btoa(t)}_`, this.wrapped = n;
	}
	scopeKey(e) {
		return `${this.scope}${e}`;
	}
	setItem(e, t) {
		this.wrapped.setItem(this.scopeKey(e), t);
	}
	getItem(e) {
		return this.wrapped.getItem(this.scopeKey(e));
	}
	removeItem(e) {
		this.wrapped.removeItem(this.scopeKey(e));
	}
	clear() {
		Object.keys(this.wrapped).filter((e) => e.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
	}
}, $C = class {
	appId;
	persisted = !1;
	clearedOnLogout = !1;
	constructor(e) {
		this.appId = e;
	}
	persist(e = !0) {
		return this.persisted = e, this;
	}
	clearOnLogout(e = !0) {
		return this.clearedOnLogout = e, this;
	}
	build() {
		return new QC(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
	}
};
// node_modules/@nextcloud/browser-storage/dist/index.js
function ew(e) {
	return new $C(e);
}
// node_modules/@nextcloud/auth/dist/index.mjs
aw();
function tw() {
	return globalThis._nc_auth_requestToken ? globalThis._nc_auth_requestToken : globalThis.document ? document.head.dataset.requesttoken ?? null : null;
}
function nw(e) {
	if (!e || typeof e != "string") throw Error("Invalid CSRF token given", { cause: { token: e } });
	globalThis._nc_auth_requestToken !== e && (globalThis._nc_auth_requestToken = e, globalThis.document && (document.head.dataset.requesttoken = e), tg("csrf-token-update", {
		token: e,
		_internal: !0
	}));
}
async function rw() {
	let e = kv("/csrftoken"), t = await fetch(e);
	if (!t.ok) throw Error("Could not fetch CSRF token from API", { cause: t });
	try {
		let { token: e } = await t.json();
		return nw(e), e;
	} catch (e) {
		throw Error("Could not parse CSRF token from API response", { cause: e });
	}
}
function iw(e) {
	let t = async ({ token: t }) => {
		try {
			e(t);
		} catch (e) {
			console.error("Error updating CSRF token observer", e);
		}
	};
	return $h("csrf-token-update", t), () => eg("csrf-token-update", t);
}
function aw() {
	$h("csrf-token-update", ({ token: e, _internal: t }) => {
		t || nw(e);
	});
}
ew("public").persist().build();
var ow;
function sw(e, t) {
	return e ? e.getAttribute(t) : null;
}
function cw() {
	if (ow !== void 0) return ow;
	let e = document?.getElementsByTagName("head")[0];
	if (!e) return null;
	let t = sw(e, "data-user");
	return t === null ? (ow = null, ow) : (ow = {
		uid: t,
		displayName: sw(e, "data-user-displayname"),
		isAdmin: !!window._oc_isadmin
	}, ow);
}
// node_modules/@nextcloud/logger/dist/index.mjs
var lw = /* @__PURE__ */ ((e) => (e[e.Debug = 0] = "Debug", e[e.Info = 1] = "Info", e[e.Warn = 2] = "Warn", e[e.Error = 3] = "Error", e[e.Fatal = 4] = "Fatal", e))(lw || {}), uw = class {
	context;
	constructor(e) {
		this.context = e || {};
	}
	formatMessage(e, t, n) {
		let r = "[" + lw[t].toUpperCase() + "] ";
		return n && n.app && (r += n.app + ": "), typeof e == "string" ? r + e : (r += `Unexpected ${e.name}`, e.message && (r += ` "${e.message}"`), t === lw.Debug && e.stack && (r += `

Stack trace:
${e.stack}`), r);
	}
	log(e, t, n) {
		if (!(typeof this.context?.level == "number" && e < this.context?.level)) switch (typeof t == "object" && n?.error === void 0 && (n.error = t), e) {
			case lw.Debug:
				console.debug(this.formatMessage(t, lw.Debug, n), n);
				break;
			case lw.Info:
				console.info(this.formatMessage(t, lw.Info, n), n);
				break;
			case lw.Warn:
				console.warn(this.formatMessage(t, lw.Warn, n), n);
				break;
			case lw.Error:
				console.error(this.formatMessage(t, lw.Error, n), n);
				break;
			case lw.Fatal:
			default: console.error(this.formatMessage(t, lw.Fatal, n), n);
		}
	}
	debug(e, t) {
		this.log(lw.Debug, e, Object.assign({}, this.context, t));
	}
	info(e, t) {
		this.log(lw.Info, e, Object.assign({}, this.context, t));
	}
	warn(e, t) {
		this.log(lw.Warn, e, Object.assign({}, this.context, t));
	}
	error(e, t) {
		this.log(lw.Error, e, Object.assign({}, this.context, t));
	}
	fatal(e, t) {
		this.log(lw.Fatal, e, Object.assign({}, this.context, t));
	}
};
function dw(e) {
	return new uw(e);
}
var fw = class {
	context;
	factory;
	constructor(e) {
		this.context = {}, this.factory = e;
	}
	setApp(e) {
		return this.context.app = e, this;
	}
	setLogLevel(e) {
		return this.context.level = e, this;
	}
	setUid(e) {
		return this.context.uid = e, this;
	}
	detectUser() {
		let e = cw();
		return e !== null && (this.context.uid = e.uid), this;
	}
	detectLogLevel() {
		let e = this, t = () => {
			document.readyState === "complete" || document.readyState === "interactive" ? (e.context.level = window._oc_config?.loglevel ?? lw.Warn, window._oc_debug && (e.context.level = lw.Debug), document.removeEventListener("readystatechange", t)) : document.addEventListener("readystatechange", t);
		};
		return t(), this;
	}
	build() {
		return this.context.level === void 0 && this.detectLogLevel(), this.factory(this.context);
	}
};
function pw() {
	return new fw(dw);
}
// node_modules/@nextcloud/vue/dist/chunks/logger.mjs
var mw = pw().detectUser().setApp("@nextcloud/vue").build(), hw = Bv(), gw = /* @__PURE__ */ hi({
	name: "NcPopoverTriggerProvider",
	provide() {
		return {
			"NcPopover:trigger:shown": () => this.shown,
			"NcPopover:trigger:attrs": () => this.triggerAttrs
		};
	},
	props: {
		shown: {
			type: Boolean,
			required: !0
		},
		popupRole: {
			type: String,
			default: void 0
		}
	},
	computed: { triggerAttrs() {
		return {
			"aria-haspopup": this.popupRole,
			"aria-expanded": this.shown.toString()
		};
	} },
	render() {
		return this.$slots.default?.({ attrs: this.triggerAttrs });
	}
}), _w = {
	"material-design-icon": "_material-design-icon_c-yz9",
	ncPopover: "_ncPopover_1UidJ"
}, vw = "nc-popover-9";
ZC.themes[vw] = structuredClone(ZC.themes.dropdown);
var yw = {
	name: "NcPopover",
	components: {
		Dropdown: XC,
		NcPopoverTriggerProvider: gw
	},
	props: {
		boundary: {
			type: [String, Object],
			default: ""
		},
		closeOnClickOutside: {
			type: Boolean,
			default: !0
		},
		noCloseOnClickOutside: {
			type: Boolean,
			default: !1
		},
		container: {
			type: [Boolean, String],
			default: "body"
		},
		delay: {
			type: [Number, Object],
			default: 0
		},
		noFocusTrap: {
			type: Boolean,
			default: !1
		},
		placement: {
			type: String,
			default: "bottom"
		},
		popoverBaseClass: {
			type: String,
			default: ""
		},
		popoverTriggers: {
			type: [Array, Object],
			default: null
		},
		popupRole: {
			type: String,
			default: void 0,
			validator: (e) => [
				"menu",
				"listbox",
				"tree",
				"grid",
				"dialog",
				"true"
			].includes(e)
		},
		setReturnFocus: {
			default: void 0,
			type: [
				Boolean,
				HTMLElement,
				SVGElement,
				String,
				Function
			]
		},
		shown: {
			type: Boolean,
			default: !1
		},
		triggers: {
			type: [Array, Object],
			default: () => ["click"]
		}
	},
	emits: [
		"afterShow",
		"afterHide",
		"update:shown"
	],
	setup() {
		return { theme: vw };
	},
	data() {
		return { internalShown: this.shown };
	},
	computed: {
		popperTriggers() {
			if (this.popoverTriggers && Array.isArray(this.popoverTriggers)) return this.popoverTriggers;
		},
		popperHideTriggers() {
			if (this.popoverTriggers && typeof this.popoverTriggers == "object") return this.popoverTriggers.hide;
		},
		popperShowTriggers() {
			if (this.popoverTriggers && typeof this.popoverTriggers == "object") return this.popoverTriggers.show;
		},
		internalTriggers() {
			if (this.triggers && Array.isArray(this.triggers)) return this.triggers;
		},
		hideTriggers() {
			if (this.triggers && typeof this.triggers == "object") return this.triggers.hide;
		},
		showTriggers() {
			if (this.triggers && typeof this.triggers == "object") return this.triggers.show;
		},
		internalPlacement() {
			return this.placement === "start" ? hw ? "right" : "left" : this.placement === "end" ? hw ? "left" : "right" : this.placement;
		}
	},
	watch: {
		shown(e) {
			this.internalShown = e;
		},
		internalShown(e) {
			this.$emit("update:shown", e);
		}
	},
	mounted() {
		this.checkTriggerA11y();
	},
	beforeUnmount() {
		this.clearFocusTrap(), this.clearEscapeStopPropagation();
	},
	methods: {
		checkTriggerA11y() {
			window.OC?.debug && (this.getPopoverTriggerContainerElement().querySelector("[aria-expanded]") || Ec("It looks like you are using a custom button as a <NcPopover> or other popover #trigger. If you are not using <NcButton> as a trigger, you need to bind attrs from the #trigger slot props to your custom button. See <NcPopover> docs for an example."));
		},
		removeFloatingVueAriaDescribedBy() {
			let e = this.getPopoverTriggerContainerElement().querySelectorAll("[data-popper-shown]");
			for (let t of e) t.removeAttribute("aria-describedby");
		},
		getPopoverContentElement() {
			return this.$refs.popover?.$refs.popperContent?.$el;
		},
		getPopoverTriggerContainerElement() {
			return this.$refs.popover?.$refs.popper?.$refs.reference;
		},
		async useFocusTrap() {
			if (await this.$nextTick(), this.noFocusTrap) return;
			let e = this.getPopoverContentElement();
			e.tabIndex = -1, e && (this.$focusTrap = kb(e, {
				escapeDeactivates: !1,
				allowOutsideClick: !0,
				setReturnFocus: this.setReturnFocus,
				trapStack: Qb(),
				fallbackFocus: e
			}), this.$focusTrap.activate());
		},
		clearFocusTrap(e = {}) {
			try {
				this.$focusTrap?.deactivate(e), this.$focusTrap = null;
			} catch (e) {
				mw.warn("[NcPopover] Failed to clear focus trap", { error: e });
			}
		},
		addEscapeStopPropagation() {
			this.getPopoverContentElement()?.addEventListener("keydown", this.stopKeydownEscapeHandler);
		},
		clearEscapeStopPropagation() {
			this.getPopoverContentElement()?.removeEventListener("keydown", this.stopKeydownEscapeHandler);
		},
		stopKeydownEscapeHandler(e) {
			e.type === "keydown" && e.key === "Escape" && e.stopPropagation();
		},
		async afterShow() {
			this.getPopoverContentElement().addEventListener("transitionend", () => {
				this.$emit("afterShow");
			}, {
				once: !0,
				passive: !0
			}), this.removeFloatingVueAriaDescribedBy(), await this.$nextTick(), await this.useFocusTrap(), this.addEscapeStopPropagation();
		},
		afterHide() {
			this.getPopoverContentElement()?.addEventListener("transitionend", () => {
				this.$emit("afterHide");
			}, {
				once: !0,
				passive: !0
			}), this.clearFocusTrap(), this.clearEscapeStopPropagation();
		}
	}
};
function bw(e, t, n, r, i, a) {
	let o = ya("NcPopoverTriggerProvider"), s = ya("Dropdown");
	return V(), Ns(s, {
		ref: "popover",
		shown: i.internalShown,
		"onUpdate:shown": [t[0] ||= (e) => i.internalShown = e, t[1] ||= (e) => i.internalShown = e],
		autoHide: !n.noCloseOnClickOutside && n.closeOnClickOutside,
		boundary: n.boundary || void 0,
		container: n.container,
		delay: n.delay,
		distance: 4,
		handleResize: "",
		noAutoFocus: !0,
		placement: a.internalPlacement,
		popperClass: [e.$style.ncPopover, n.popoverBaseClass],
		popperTriggers: a.popperTriggers,
		popperHideTriggers: a.popperHideTriggers,
		popperShowTriggers: a.popperShowTriggers,
		theme: r.theme,
		triggers: a.internalTriggers,
		hideTriggers: a.hideTriggers,
		showTriggers: a.showTriggers,
		onApplyShow: a.afterShow,
		onApplyHide: a.afterHide
	}, {
		popper: Tr((t) => [Da(e.$slots, "default", P(Bs(t)))]),
		default: Tr(() => [W(o, {
			shown: i.internalShown,
			popupRole: n.popupRole
		}, {
			default: Tr((t) => [Da(e.$slots, "trigger", P(Bs(t)))]),
			_: 3
		}, 8, ["shown", "popupRole"])]),
		_: 3
	}, 8, [
		"shown",
		"autoHide",
		"boundary",
		"container",
		"delay",
		"placement",
		"popperClass",
		"popperTriggers",
		"popperHideTriggers",
		"popperShowTriggers",
		"theme",
		"triggers",
		"hideTriggers",
		"showTriggers",
		"onApplyShow",
		"onApplyHide"
	]);
}
var xw = /* @__PURE__ */ Eg(yw, [["render", bw], ["__cssModules", { $style: _w }]]), Sw = {
	name: "DotsHorizontalIcon",
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
}, Cw = ["aria-hidden", "aria-label"], ww = [
	"fill",
	"width",
	"height"
], Tw = { key: 0 };
function Ew(e, t, n, r, i, a) {
	return V(), H("span", Js(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon dots-horizontal-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(V(), H("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (V(), H("title", Tw, F(n.title), 1)) : Ws("", !0), t[1] ||= U("path", { d: "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" }, null, -1)], 8, ww))], 16, Cw);
}
var Dw = /* @__PURE__ */ Eg(Sw, [["render", Ew]]);
ty(ay);
function Ow(e) {
	return Array.isArray(e) && e.some((e) => {
		if (e === null) return !1;
		if (typeof e == "object") {
			let t = e;
			if (t.type === Ts || t.type === Cs && !Ow(t.children) || t.type === ws && !t.children.trim()) return !1;
		}
		return !0;
	});
}
var kw = ".focusable", Aw = /* @__PURE__ */ Eg({
	name: "NcActions",
	components: {
		NcButton: Ag,
		NcPopover: xw
	},
	provide() {
		return {
			[tx]: G(() => this.actionsMenuSemanticType === "menu"),
			[nx]: this.closeMenu
		};
	},
	props: {
		open: {
			type: Boolean,
			default: !1
		},
		manualOpen: {
			type: Boolean,
			default: !1
		},
		forceMenu: {
			type: Boolean,
			default: !1
		},
		forceName: {
			type: Boolean,
			default: !1
		},
		menuName: {
			type: String,
			default: null
		},
		primary: {
			type: Boolean,
			default: !1
		},
		defaultIcon: {
			type: String,
			default: ""
		},
		ariaLabel: {
			type: String,
			default: ey("Actions")
		},
		placement: {
			type: String,
			default: "bottom"
		},
		boundariesElement: {
			type: Element,
			default: () => document.getElementById("content-vue") ?? document.querySelector("body")
		},
		container: {
			type: [
				Boolean,
				String,
				Object,
				Element
			],
			default: "body"
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		inline: {
			type: Number,
			default: 0
		},
		variant: {
			type: String,
			validator(e) {
				return [
					"primary",
					"secondary",
					"tertiary",
					"tertiary-no-background",
					"tertiary-on-primary",
					"error",
					"warning",
					"success"
				].includes(e);
			},
			default: null
		},
		wide: {
			type: Boolean,
			default: !1
		},
		size: {
			type: String,
			default: "normal",
			validator(e) {
				return [
					"small",
					"normal",
					"large"
				].includes(e);
			}
		}
	},
	emits: [
		"click",
		"blur",
		"focus",
		"close",
		"closed",
		"open",
		"opened",
		"update:open"
	],
	setup() {
		return { randomId: ex() };
	},
	data() {
		return {
			opened: this.open,
			focusIndex: 0,
			actionsMenuSemanticType: "unknown"
		};
	},
	computed: {
		triggerButtonVariant() {
			return this.variant || (this.primary ? "primary" : this.menuName ? "secondary" : "tertiary");
		},
		config() {
			return {
				menu: {
					popupRole: "menu",
					withArrowNavigation: !0,
					withTabNavigation: !1,
					withFocusTrap: !1
				},
				navigation: {
					popupRole: void 0,
					withArrowNavigation: !1,
					withTabNavigation: !0,
					withFocusTrap: !1
				},
				dialog: {
					popupRole: "dialog",
					withArrowNavigation: !1,
					withTabNavigation: !0,
					withFocusTrap: !0
				},
				tooltip: {
					popupRole: void 0,
					withArrowNavigation: !1,
					withTabNavigation: !1,
					withFocusTrap: !1
				},
				unknown: {
					popupRole: void 0,
					role: void 0,
					withArrowNavigation: !0,
					withTabNavigation: !1,
					withFocusTrap: !0
				}
			}[this.actionsMenuSemanticType];
		},
		withFocusTrap() {
			return this.config.withFocusTrap;
		}
	},
	watch: {
		open(e) {
			e !== this.opened && (this.opened = e);
		},
		opened() {
			this.opened ? document.body.addEventListener("keydown", this.handleEscapePressed) : document.body.removeEventListener("keydown", this.handleEscapePressed);
		}
	},
	created() {
		hx(() => this.opened, { disabled: () => this.config.withFocusTrap }), "ariaHidden" in this.$attrs && Ec("[NcActions]: Do not set the ariaHidden attribute as the root element will inherit the incorrect aria-hidden.");
	},
	methods: {
		getActionName(e) {
			return e?.type?.name;
		},
		isValidSingleAction(e) {
			return [
				"NcActionButton",
				"NcActionLink",
				"NcActionRouter"
			].includes(this.getActionName(e));
		},
		isAction(e) {
			return this.getActionName(e)?.startsWith?.("NcAction");
		},
		isIconUrl(e) {
			try {
				return !!new URL(e, e.startsWith("/") ? window.location.origin : void 0);
			} catch {
				return !1;
			}
		},
		toggleMenu(e) {
			e ? this.openMenu() : this.closeMenu();
		},
		openMenu() {
			this.opened || (this.opened = !0, this.$emit("update:open", !0), this.$emit("open"));
		},
		async closeMenu(e = !0) {
			this.opened && (await this.$nextTick(), this.opened = !1, this.$refs.popover?.clearFocusTrap({ returnFocus: e }), this.$emit("update:open", !1), this.$emit("close"), this.focusIndex = 0, e && this.$refs.triggerButton?.$el.focus());
		},
		onOpened() {
			this.$nextTick(() => {
				this.focusFirstAction(null), this.$emit("opened");
			});
		},
		onClosed() {
			this.$emit("closed");
		},
		getCurrentActiveMenuItemElement() {
			return this.$refs.menu.querySelector("li.active");
		},
		getFocusableMenuItemElements() {
			return this.$refs.menu.querySelectorAll(kw);
		},
		onKeydown(e) {
			if (e.key === "Tab") {
				if (this.config.withFocusTrap) return;
				if (!this.config.withTabNavigation) {
					this.closeMenu(!0);
					return;
				}
				e.preventDefault();
				let t = this.getFocusableMenuItemElements(), n = [...t].indexOf(document.activeElement);
				if (n === -1) return;
				let r = e.shiftKey ? n - 1 : n + 1;
				(r < 0 || r === t.length) && this.closeMenu(!0), this.focusIndex = r, this.focusAction();
			} else this.config.withArrowNavigation && (e.key === "ArrowUp" && this.focusPreviousAction(e), e.key === "ArrowDown" && this.focusNextAction(e), e.key === "PageUp" && this.focusFirstAction(e), e.key === "PageDown" && this.focusLastAction(e)), this.handleEscapePressed(e);
		},
		onTriggerKeydown(e) {
			e.key === "Escape" && this.actionsMenuSemanticType === "tooltip" && this.closeMenu();
		},
		handleEscapePressed(e) {
			e.key === "Escape" && (this.closeMenu(), e.preventDefault());
		},
		removeCurrentActive() {
			let e = this.$refs.menu.querySelector("li.active");
			e && e.classList.remove("active");
		},
		focusAction() {
			let e = this.getFocusableMenuItemElements()[this.focusIndex];
			if (e) {
				this.removeCurrentActive();
				let t = e.closest("li.action");
				e.focus(), t && t.classList.add("active");
			}
		},
		focusPreviousAction(e) {
			this.opened && (this.focusIndex === 0 ? this.focusLastAction(e) : (this.preventIfEvent(e), --this.focusIndex), this.focusAction());
		},
		focusNextAction(e) {
			if (this.opened) {
				let t = this.getFocusableMenuItemElements().length - 1;
				this.focusIndex === t ? this.focusFirstAction(e) : (this.preventIfEvent(e), this.focusIndex += 1), this.focusAction();
			}
		},
		focusFirstAction(e) {
			if (this.opened) {
				this.preventIfEvent(e);
				let t = [...this.getFocusableMenuItemElements()].findIndex((e) => e.getAttribute("aria-checked") === "true" && e.getAttribute("role") === "menuitemradio");
				this.focusIndex = t > -1 ? t : 0, this.focusAction();
			}
		},
		focusLastAction(e) {
			this.opened && (this.preventIfEvent(e), this.focusIndex = this.getFocusableMenuItemElements().length - 1, this.focusAction());
		},
		preventIfEvent(e) {
			e && (e.preventDefault(), e.stopPropagation());
		},
		onFocus(e) {
			this.$emit("focus", e);
		},
		onBlur(e) {
			this.$emit("blur", e), this.actionsMenuSemanticType === "tooltip" && this.$refs.menu && this.getFocusableMenuItemElements().length === 0 && this.closeMenu(!1);
		},
		onClick(e) {
			this.$emit("click", e);
		}
	},
	render() {
		let e = [], t = (e, n) => {
			e.forEach((e) => {
				this.isAction(e) ? n.push(e) : e.type === Cs && t(e.children, n);
			});
		};
		if (t(this.$slots.default?.(), e), e.length === 0) return;
		let n = e.filter(this.isValidSingleAction);
		this.forceMenu && n.length > 0 && this.inline > 0 && (Ec("Specifying forceMenu will ignore any inline actions rendering."), n = []);
		let r = n.slice(0, this.inline), i = e.filter((e) => !r.includes(e)), a = [
			"NcActionButton",
			"NcActionButtonGroup",
			"NcActionCheckbox",
			"NcActionRadio"
		], o = ["NcActionInput", "NcActionTextEditable"], s = ["NcActionLink", "NcActionRouter"], c = i.some((e) => o.includes(this.getActionName(e))), l = i.some((e) => a.includes(this.getActionName(e))), u = i.some((e) => s.includes(this.getActionName(e)));
		this.actionsMenuSemanticType = c ? "dialog" : l ? "menu" : u ? "navigation" : e.filter((e) => this.getActionName(e).startsWith("NcAction")).length === e.length ? "tooltip" : "unknown";
		let d = (e) => {
			let t = e?.props?.icon, n = e?.children?.icon?.()?.[0] ?? (this.isIconUrl(t) ? K("img", {
				class: "action-item__menutoggle__icon",
				src: t,
				alt: ""
			}) : K("span", { class: ["icon", t] })), r = e?.children?.default?.()?.[0]?.children?.trim(), i = this.forceName ? r : "", a = e?.props?.title;
			this.forceName || a || (a = r);
			let o = { ...e?.props ?? {} }, s = ["submit", "reset"].includes(o.type) ? o.modelValue : "button";
			return delete o.modelValue, delete o.type, K(Ag, Js(o, {
				class: ["action-item action-item--single", { "action-item--wide": this.wide }],
				"aria-label": e?.props?.["aria-label"] || r,
				title: a,
				disabled: this.disabled || e?.props?.disabled,
				pressed: e?.props?.modelValue,
				size: this.size,
				type: s,
				wide: this.wide,
				variant: this.variant || (i ? "secondary" : "tertiary"),
				onFocus: this.onFocus,
				onBlur: this.onBlur,
				"onUpdate:pressed": e?.props?.["onUpdate:modelValue"] ?? (() => {})
			}), {
				default: () => i,
				icon: () => n
			});
		}, f = (e) => {
			let t = Ow(this.$slots.icon?.()) ? this.$slots.icon?.() : this.defaultIcon ? K("span", { class: ["icon", this.defaultIcon] }) : K(Dw, { size: 20 }), n = `${this.randomId}-trigger`;
			return K(xw, {
				ref: "popover",
				delay: 0,
				shown: this.opened,
				placement: this.placement,
				boundary: this.boundariesElement,
				autoBoundaryMaxSize: !0,
				container: this.container,
				...this.manualOpen && { triggers: [] },
				noCloseOnClickOutside: this.manualOpen,
				popoverBaseClass: "action-item__popper",
				popupRole: this.config.popupRole,
				setReturnFocus: this.config.withFocusTrap ? this.$refs.triggerButton?.$el : void 0,
				noFocusTrap: !this.config.withFocusTrap,
				"onUpdate:shown": this.toggleMenu,
				onAfterShow: this.onOpened,
				onAfterHide: this.onClosed
			}, {
				trigger: () => K(Ag, {
					id: n,
					class: "action-item__menutoggle",
					disabled: this.disabled,
					size: this.size,
					variant: this.triggerButtonVariant,
					wide: this.wide,
					ref: "triggerButton",
					"aria-label": this.menuName ? null : this.ariaLabel,
					"aria-controls": this.opened && this.config.popupRole ? this.randomId : null,
					onFocus: this.onFocus,
					onBlur: this.onBlur,
					onClick: this.onClick,
					onKeydown: this.onTriggerKeydown
				}, {
					icon: () => t,
					default: () => this.menuName
				}),
				default: () => K("div", {
					class: { open: this.opened },
					tabindex: "-1",
					onKeydown: this.onKeydown,
					ref: "menu"
				}, [K("ul", {
					id: this.randomId,
					tabindex: "-1",
					ref: "menuList",
					role: this.config.popupRole,
					"aria-labelledby": n,
					"aria-modal": this.actionsMenuSemanticType === "dialog" ? "true" : void 0
				}, [e])])
			});
		};
		return e.length === 1 && n.length === 1 && !this.forceMenu ? d(e[0]) : (this.$nextTick(() => {
			this.opened && this.$refs.menu && (this.$refs.menu.querySelector("li.active") || []).length === 0 && this.focusFirstAction();
		}), r.length > 0 && this.inline > 0 ? K("div", { class: ["action-items", `action-item--${this.triggerButtonVariant}`] }, [...r.map(d), i.length > 0 ? K("div", { class: ["action-item", { "action-item--open": this.opened }] }, [f(i)]) : null]) : K("div", { class: [
			"action-item action-item--default-popover",
			`action-item--${this.triggerButtonVariant}`,
			{
				"action-item--open": this.opened,
				"action-item--wide": this.wide
			}
		] }, [f(e)]));
	}
}, [["__scopeId", "data-v-7206c1f1"]]), jw = [
	"aria-label",
	"aria-hidden",
	"role"
], Mw = ["width", "height"], Nw = ["fill"], Pw = ["fill"], Fw = { key: 0 }, Iw = /* @__PURE__ */ Eg(/* @__PURE__ */ hi({
	__name: "NcLoadingIcon",
	props: {
		appearance: { default: "auto" },
		name: { default: "" },
		size: { default: 20 }
	},
	setup(e) {
		let t = e, n = G(() => {
			let e = ["#777", "#CCC"];
			return t.appearance === "light" ? e : t.appearance === "dark" ? e.reverse() : ["var(--color-loading-light)", "var(--color-loading-dark)"];
		});
		return (t, r) => (V(), H("span", {
			"aria-label": e.name || void 0,
			"aria-hidden": e.name ? void 0 : "true",
			role: e.name ? "img" : void 0,
			class: "material-design-icon loading-icon"
		}, [(V(), H("svg", {
			width: e.size,
			height: e.size,
			viewBox: "0 0 24 24"
		}, [U("path", {
			fill: n.value[0],
			d: "M12,4V2A10,10 0 1,0 22,12H20A8,8 0 1,1 12,4Z"
		}, null, 8, Nw), U("path", {
			fill: n.value[1],
			d: "M12,4V2A10,10 0 0,1 22,12H20A8,8 0 0,0 12,4Z"
		}, [e.name ? (V(), H("title", Fw, F(e.name), 1)) : Ws("", !0)], 8, Pw)], 8, Mw))], 8, jw));
	}
}), [["__scopeId", "data-v-469673da"]]);
// node_modules/@vueuse/shared/dist/index.js
function Lw(e, t, n = {}) {
	let r, i, a, o = !0, s = () => {
		o = !0, a();
	};
	Ir(e, s, {
		flush: "sync",
		...n
	});
	let c = typeof t == "function" ? t : t.get, l = typeof t == "function" ? void 0 : t.set, u = Tn((e, t) => (i = e, a = t, {
		get() {
			return o &&= (r = c(r), !1), i(), r;
		},
		set(e) {
			l?.(e);
		}
	}));
	return u.trigger = s, u;
}
function Rw(e = {}) {
	function t(e) {
		return typeof e == "function";
	}
	let n = t(e) ? {
		mounted: e,
		updated: e
	} : e, { mounted: r, unmounted: i } = n;
	if (!t(r)) return e;
	let a = /* @__PURE__ */ new WeakMap();
	return {
		...n,
		mounted(e, t, n, i) {
			let o = a.get(e) ?? Ve();
			a.set(e, o), o.run(() => {
				r?.(e, t, n, i);
			});
		},
		unmounted(e, n, r, o) {
			var s;
			(s = a.get(e)) == null || s.stop(), a.delete(e), t(i) && i(e, n, r, o);
		}
	};
}
function zw(e, t) {
	return He() ? (Ue(e, t), !0) : !1;
}
var Bw = /* @__PURE__ */ new WeakMap(), Vw = /* @__NO_SIDE_EFFECTS__ */ (...e) => {
	let t = e[0], n = tc()?.proxy ?? He();
	if (n == null && !Ar()) throw Error("injectLocal must be called in setup");
	return n && Bw.has(n) && t in Bw.get(n) ? Bw.get(n)[t] : kr(...e);
}, Hw = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var Uw = (e) => e != null, Ww = Object.prototype.toString, Gw = (e) => Ww.call(e) === "[object Object]", Kw = () => {}, qw = /* #__PURE__ */ Jw();
function Jw() {
	var e, t;
	return Hw && !!((e = window) != null && (e = e.navigator) != null && e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window) == null || (t = t.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function Yw(...e) {
	if (e.length !== 1) return /* @__PURE__ */ kn(...e);
	let t = e[0];
	return typeof t == "function" ? /* @__PURE__ */ sn(Tn(() => ({
		get: t,
		set: Kw
	}))) : /* @__PURE__ */ _n(t);
}
function Xw(e, t) {
	function n(...n) {
		return new Promise((r, i) => {
			Promise.resolve(e(() => t.apply(this, n), {
				fn: t,
				thisArg: this,
				args: n
			})).then(r).catch(i);
		});
	}
	return "cancel" in e && Object.assign(n, {
		cancel: e.cancel,
		flush: e.flush,
		isPending: e.isPending
	}), n;
}
function Zw(e, t = {}) {
	let n, r, i = Kw, a = Kw, o = /* @__PURE__ */ z(!1), s = (e) => {
		clearTimeout(e), i(), i = Kw;
	}, c;
	return Object.assign((l) => {
		let u = B(e), d = B(t.maxWait);
		return n && s(n), u <= 0 || d !== void 0 && d <= 0 ? (r &&= (s(r), void 0), o.value = !1, Promise.resolve(l())) : (o.value = !0, new Promise((e, f) => {
			i = t.rejectOnCancel ? f : e, a = e, c = l, d && !r && (r = setTimeout(() => {
				n && s(n), r = void 0, o.value = !1, e(c());
			}, d)), n = setTimeout(() => {
				r && s(r), r = void 0, o.value = !1, e(l());
			}, u);
		}));
	}, {
		cancel: () => {
			n &&= (s(n), void 0), r &&= (s(r), void 0), o.value = !1, a = Kw;
		},
		flush: () => {
			if (o.value) {
				n &&= (clearTimeout(n), void 0), r &&= (clearTimeout(r), void 0), o.value = !1;
				let e = a;
				i = Kw, a = Kw, e(c());
			}
		},
		isPending: /* @__PURE__ */ cn(o)
	});
}
function Qw(...e) {
	let t = 0, n, r = !0, i = Kw, a, o, s, c, l;
	!/* @__PURE__ */ R(e[0]) && typeof e[0] == "object" ? {delay: o, trailing: s = !0, leading: c = !0, rejectOnCancel: l = !1} = e[0] : [o, s = !0, c = !0, l = !1] = e;
	let u = () => {
		n && (clearTimeout(n), n = void 0, i(), i = Kw);
	};
	return (e) => {
		let d = B(o), f = Date.now() - t, p = () => a = e();
		return u(), d <= 0 ? (t = Date.now(), p()) : (f > d ? (t = Date.now(), (c || !r) && p()) : s && (a = new Promise((e, a) => {
			i = l ? a : e, n = setTimeout(() => {
				t = Date.now(), r = !0, e(p()), u();
			}, Math.max(0, d - f));
		})), !c && !n && (n = setTimeout(() => r = !0, d)), r = !1, a);
	};
}
function $w(e) {
	return e.endsWith("rem") ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function eT(e) {
	return Array.isArray(e) ? e : [e];
}
function tT(e) {
	return e || tc();
}
function nT(e) {
	if (!Hw) return e;
	let t = 0, n, r, i = () => {
		--t, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
	};
	return ((...a) => (t += 1, r || (r = Ve(!0), n = r.run(() => e(...a))), zw(i), n));
}
function rT(e) {
	return /* @__PURE__ */ an(/* @__PURE__ */ R(e) ? new Proxy({}, {
		get(t, n, r) {
			return xn(Reflect.get(e.value, n, r));
		},
		set(t, n, r) {
			return /* @__PURE__ */ R(e.value[n]) && !/* @__PURE__ */ R(r) ? e.value[n].value = r : e.value[n] = r, !0;
		},
		deleteProperty(t, n) {
			return Reflect.deleteProperty(e.value, n);
		},
		has(t, n) {
			return Reflect.has(e.value, n);
		},
		ownKeys() {
			return Object.keys(e.value);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: !0,
				configurable: !0
			};
		}
	}) : e);
}
function iT(e) {
	return rT(G(e));
}
function aT(e, ...t) {
	let n = t.flat(), r = n[0];
	return iT(() => Object.fromEntries(typeof r == "function" ? Object.entries(/* @__PURE__ */ En(e)).filter(([e, t]) => !r(B(t), e)) : Object.entries(/* @__PURE__ */ En(e)).filter((e) => !n.includes(e[0]))));
}
function oT(e, t = 200, n = {}) {
	return Xw(Zw(t, n), e);
}
function sT(e, t = 200, n = !0, r = !0, i = !1) {
	return Xw(Qw(t, n, r, i), e);
}
function cT(e, t = !0, n) {
	tT(n) ? ca(e, n) : t ? e() : ar(e);
}
function lT(e, t) {
	tT(t) && fa(e, t);
}
function uT(e, t = 1e3, n = {}) {
	let { immediate: r = !0, immediateCallback: i = !1 } = n, a = null, o = /* @__PURE__ */ z(!1);
	function s() {
		a &&= (clearInterval(a), null);
	}
	function c() {
		o.value = !1, s();
	}
	function l() {
		let n = B(t);
		n <= 0 || (o.value = !0, i && e(), s(), o.value && (a = setInterval(e, n)));
	}
	return r && Hw && l(), (/* @__PURE__ */ R(t) || typeof t == "function") && zw(Ir(t, () => {
		o.value && Hw && l();
	})), zw(c), {
		isActive: /* @__PURE__ */ cn(o),
		pause: c,
		resume: l
	};
}
function dT(e, t, n) {
	return Ir(e, t, {
		...n,
		immediate: !0
	});
}
function fT(e, t, n) {
	return Ir(e, t, {
		...n,
		once: !0
	});
}
// node_modules/@vueuse/core/dist/index.js
var pT = Hw ? window : void 0;
Hw && window.document, Hw && window.navigator, Hw && window.location;
function mT(e) {
	let t = B(e);
	return t?.$el ?? t;
}
function hT(...e) {
	let t = (e, t, n, r) => (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r)), n = G(() => {
		let t = eT(B(e[0])).filter((e) => e != null);
		return t.every((e) => typeof e != "string") ? t : void 0;
	});
	return dT(() => [
		n.value?.map((e) => mT(e)) ?? [pT].filter((e) => e != null),
		eT(B(n.value ? e[1] : e[0])),
		eT(xn(n.value ? e[2] : e[1])),
		B(n.value ? e[3] : e[2])
	], ([e, n, r, i], a, o) => {
		if (!e?.length || !n?.length || !r?.length) return;
		let s = Gw(i) ? { ...i } : i, c = e.flatMap((e) => n.flatMap((n) => r.map((r) => t(e, n, r, s))));
		o(() => {
			c.forEach((e) => e());
		});
	}, { flush: "post" });
}
var gT = !1;
function _T(e, t, n = {}) {
	let { window: r = pT, ignore: i = [], capture: a = !0, detectIframe: o = !1, controls: s = !1 } = n;
	if (!r) return s ? {
		stop: Kw,
		cancel: Kw,
		trigger: Kw
	} : Kw;
	if (qw && !gT) {
		gT = !0;
		let e = { passive: !0 };
		Array.from(r.document.body.children).forEach((t) => t.addEventListener("click", Kw, e)), r.document.documentElement.addEventListener("click", Kw, e);
	}
	let c = !0, l = (e) => B(i).some((t) => {
		if (typeof t == "string") return Array.from(r.document.querySelectorAll(t)).some((t) => t === e.target || e.composedPath().includes(t));
		{
			let n = mT(t);
			return n && (e.target === n || e.composedPath().includes(n));
		}
	});
	function u(e) {
		let t = B(e);
		return t && t.$.subTree.shapeFlag === 16;
	}
	function d(e, t) {
		let n = B(e), r = n.$.subTree && n.$.subTree.children;
		return r == null || !Array.isArray(r) ? !1 : r.some((e) => e.el === t.target || t.composedPath().includes(e.el));
	}
	let f = (n) => {
		let r = mT(e);
		n.target != null && (!(r instanceof Element) && u(e) && d(e, n) || r && r !== n.target && !n.composedPath().includes(r) && ("detail" in n && n.detail === 0 && (c = !l(n)), c ? t(n) : c = !0));
	}, p = !1, m = [
		hT(r, "click", (e) => {
			p || (p = !0, setTimeout(() => {
				p = !1;
			}, 0), f(e));
		}, {
			passive: !0,
			capture: a
		}),
		hT(r, "pointerdown", (t) => {
			let n = mT(e);
			c = !l(t) && !(!n || t.composedPath().includes(n));
		}, { passive: !0 }),
		o && hT(r, "blur", (n) => {
			setTimeout(() => {
				let i = mT(e), a = r.document.activeElement;
				for (; a?.shadowRoot;) a = a.shadowRoot.activeElement;
				a?.tagName === "IFRAME" && !i?.contains(r.document.activeElement) && t(n);
			}, 0);
		}, { passive: !0 })
	].filter(Boolean), h = () => m.forEach((e) => e());
	return s ? {
		stop: h,
		cancel: () => {
			c = !1;
		},
		trigger: (e) => {
			c = !0, f(e), c = !1;
		}
	} : h;
}
function vT() {
	let e = /* @__PURE__ */ z(!1), t = tc();
	return t && ca(() => {
		e.value = !0;
	}, t), e;
}
/* @__NO_SIDE_EFFECTS__ */
function yT(e) {
	let t = vT();
	return G(() => (t.value, !!e()));
}
function bT(e, t, n = {}) {
	let { window: r = pT, ...i } = n, a, o = /* @__PURE__ */ yT(() => r && "MutationObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = Ir(G(() => {
		let t = eT(B(e)).map(mT).filter(Uw);
		return new Set(t);
	}), (e) => {
		s(), o.value && e.size && (a = new MutationObserver(t), e.forEach((e) => a.observe(e, i)));
	}, {
		immediate: !0,
		flush: "post"
	}), l = () => a?.takeRecords(), u = () => {
		c(), s();
	};
	return zw(u), {
		isSupported: o,
		stop: u,
		takeRecords: l
	};
}
function xT(e, t, n = {}) {
	let { window: r = pT, document: i = r?.document, flush: a = "sync" } = n;
	if (!r || !i) return Kw;
	let o, s = (e) => {
		o?.(), o = e;
	}, c = Nr(() => {
		let n = mT(e);
		if (n) {
			let { stop: e } = bT(i, (e) => {
				e.map((e) => [...e.removedNodes]).flat().some((e) => e === n || e.contains(n)) && t(e);
			}, {
				window: r,
				childList: !0,
				subtree: !0
			});
			s(e);
		}
	}, { flush: a }), l = () => {
		c(), s();
	};
	return zw(l), l;
}
function ST(e) {
	return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function CT(...e) {
	let t, n, r = {};
	e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
	let { target: i = pT, eventName: a = "keydown", passive: o = !1, dedupe: s = !1 } = r, c = ST(t);
	return hT(i, a, (e) => {
		e.repeat && B(s) || c(e) && n(e);
	}, o);
}
var wT = 500, TT = 10;
function ET(e, t, n) {
	var r, i;
	let a = G(() => mT(e)), o, s, c, l = !1;
	function u() {
		o &&= (clearTimeout(o), void 0), s = void 0, c = void 0, l = !1;
	}
	function d(e) {
		let t = n?.delay;
		return typeof t == "function" ? t(e) : t ?? wT;
	}
	function f(e) {
		var t, r, i;
		let [o, d, f] = [
			c,
			s,
			l
		];
		if (u(), !n?.onMouseUp || !d || !o || n != null && (t = n.modifiers) != null && t.self && e.target !== a.value) return;
		n != null && (r = n.modifiers) != null && r.prevent && e.preventDefault(), n != null && (i = n.modifiers) != null && i.stop && e.stopPropagation();
		let p = e.x - d.x, m = e.y - d.y, h = Math.sqrt(p * p + m * m);
		n.onMouseUp(e.timeStamp - o, h, f, e);
	}
	function p(e) {
		var r, i, f;
		n != null && (r = n.modifiers) != null && r.self && e.target !== a.value || (u(), n != null && (i = n.modifiers) != null && i.prevent && e.preventDefault(), n != null && (f = n.modifiers) != null && f.stop && e.stopPropagation(), s = {
			x: e.x,
			y: e.y
		}, c = e.timeStamp, o = setTimeout(() => {
			l = !0, t(e);
		}, d(e)));
	}
	function m(e) {
		var t, r, i;
		if (n != null && (t = n.modifiers) != null && t.self && e.target !== a.value || !s || n?.distanceThreshold === !1) return;
		n != null && (r = n.modifiers) != null && r.prevent && e.preventDefault(), n != null && (i = n.modifiers) != null && i.stop && e.stopPropagation();
		let o = e.x - s.x, c = e.y - s.y;
		Math.sqrt(o * o + c * c) >= (n?.distanceThreshold ?? TT) && u();
	}
	let h = {
		capture: n == null || (r = n.modifiers) == null ? void 0 : r.capture,
		once: n == null || (i = n.modifiers) == null ? void 0 : i.once
	}, g = [
		hT(a, "pointerdown", p, h),
		hT(a, "pointermove", m, h),
		hT(a, [
			"pointerup",
			"pointerleave",
			"pointercancel"
		], f, h)
	];
	return () => g.forEach((e) => e());
}
var DT = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function OT() {
	let e = Ar() ? /* @__PURE__ */ Vw(DT, null) : null;
	return typeof e == "number" ? e : void 0;
}
function kT(e, t = {}) {
	let { window: n = pT, ssrWidth: r = /* @__PURE__ */ OT() } = t, i = /* @__PURE__ */ yT(() => n && "matchMedia" in n && typeof n.matchMedia == "function"), a = /* @__PURE__ */ z(typeof r == "number"), o = /* @__PURE__ */ z(), s = /* @__PURE__ */ z(!1);
	return Nr(() => {
		if (a.value) {
			a.value = !i.value;
			let t = B(e).split(",");
			s.value = t.some((e) => {
				let t = e.includes("not all"), n = e.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), i = e.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), a = !!(n || i);
				return n && a && (a = r >= $w(n[1])), i && a && (a = r <= $w(i[1])), t ? !a : a;
			});
		} else i.value && (o.value = n.matchMedia(B(e)), s.value = o.value.matches);
	}), hT(o, "change", (e) => {
		s.value = e.matches;
	}, { passive: !0 }), G(() => s.value);
}
function AT(e) {
	return kT("(prefers-color-scheme: dark)", e);
}
function jT(e) {
	let t = tc(), n = Lw(() => null, () => e ? mT(e) : t.proxy.$el);
	return ua(n.trigger), ca(n.trigger), n;
}
function MT(e, t, n = {}) {
	let { window: r = pT, ...i } = n, a, o = /* @__PURE__ */ yT(() => r && "ResizeObserver" in r), s = () => {
		a &&= (a.disconnect(), void 0);
	}, c = Ir(G(() => {
		let t = B(e);
		return Array.isArray(t) ? t.map((e) => mT(e)) : [mT(t)];
	}), (e) => {
		if (s(), o.value && r) {
			a = new ResizeObserver(t);
			for (let t of e) t instanceof Element && a.observe(t, i);
		}
	}, {
		immediate: !0,
		flush: "post"
	}), l = () => {
		s(), c();
	};
	return zw(l), {
		isSupported: o,
		stop: l
	};
}
function NT(e, t = {}) {
	let { reset: n = !0, windowResize: r = !0, windowScroll: i = !0, immediate: a = !0, updateTiming: o = "sync" } = t, s = /* @__PURE__ */ z(0), c = /* @__PURE__ */ z(0), l = /* @__PURE__ */ z(0), u = /* @__PURE__ */ z(0), d = /* @__PURE__ */ z(0), f = /* @__PURE__ */ z(0), p = /* @__PURE__ */ z(0), m = /* @__PURE__ */ z(0);
	function h() {
		let t = mT(e);
		if (!t) {
			n && (s.value = 0, c.value = 0, l.value = 0, u.value = 0, d.value = 0, f.value = 0, p.value = 0, m.value = 0);
			return;
		}
		let r = t.getBoundingClientRect();
		s.value = r.height, c.value = r.bottom, l.value = r.left, u.value = r.right, d.value = r.top, f.value = r.width, p.value = r.x, m.value = r.y;
	}
	function g() {
		o === "sync" ? h() : o === "next-frame" && requestAnimationFrame(() => h());
	}
	return MT(e, g), Ir(() => mT(e), (e) => !e && g()), bT(e, g, { attributeFilter: ["style", "class"] }), i && hT("scroll", g, {
		capture: !0,
		passive: !0
	}), r && hT("resize", g, { passive: !0 }), cT(() => {
		a && g();
	}), {
		height: s,
		bottom: c,
		left: l,
		right: u,
		top: d,
		width: f,
		x: p,
		y: m,
		update: g
	};
}
function PT(e, t = {}) {
	let { delayEnter: n = 0, delayLeave: r = 0, triggerOnRemoval: i = !1, window: a = pT } = t, o = /* @__PURE__ */ z(!1), s, c = (e) => {
		let t = e ? n : r;
		s &&= (clearTimeout(s), void 0), t ? s = setTimeout(() => o.value = e, t) : o.value = e;
	};
	return a && (hT(e, "mouseenter", () => c(!0), { passive: !0 }), hT(e, "mouseleave", () => c(!1), { passive: !0 }), i && xT(G(() => mT(e)), () => c(!1))), o;
}
function FT(e, t = {
	width: 0,
	height: 0
}, n = {}) {
	let { window: r = pT, box: i = "content-box" } = n, a = G(() => {
		var t;
		return (t = mT(e)) == null || (t = t.namespaceURI) == null ? void 0 : t.includes("svg");
	}), o = /* @__PURE__ */ z(t.width), s = /* @__PURE__ */ z(t.height), { stop: c } = MT(e, ([t]) => {
		let n = i === "border-box" ? t.borderBoxSize : i === "content-box" ? t.contentBoxSize : t.devicePixelContentBoxSize;
		if (r && a.value) {
			let t = mT(e);
			if (t) {
				let e = t.getBoundingClientRect();
				o.value = e.width, s.value = e.height;
			}
		} else if (n) {
			let e = eT(n);
			o.value = e.reduce((e, { inlineSize: t }) => e + t, 0), s.value = e.reduce((e, { blockSize: t }) => e + t, 0);
		} else o.value = t.contentRect.width, s.value = t.contentRect.height;
	}, n);
	cT(() => {
		let n = mT(e);
		if (n && "offsetWidth" in n) {
			if (i === "content-box" && r) {
				let e = r.getComputedStyle(n), t = Number.parseFloat(e.paddingLeft) + Number.parseFloat(e.paddingRight), i = Number.parseFloat(e.paddingTop) + Number.parseFloat(e.paddingBottom), a = Number.parseFloat(e.borderLeftWidth) + Number.parseFloat(e.borderRightWidth), c = Number.parseFloat(e.borderTopWidth) + Number.parseFloat(e.borderBottomWidth);
				o.value = n.offsetWidth - t - a, s.value = n.offsetHeight - i - c;
			} else o.value = n.offsetWidth, s.value = n.offsetHeight;
		} else n && (o.value = t.width, s.value = t.height);
	});
	let l = Ir(() => mT(e), (e) => {
		o.value = e ? t.width : 0, s.value = e ? t.height : 0;
	});
	function u() {
		c(), l();
	}
	return {
		width: o,
		height: s,
		stop: u
	};
}
function IT(e, t, n = {}) {
	let { root: r, rootMargin: i, threshold: a = 0, window: o = pT, immediate: s = !0 } = n, c = /* @__PURE__ */ yT(() => o && "IntersectionObserver" in o), l = G(() => eT(B(e)).map(mT).filter(Uw)), u = Kw, d = /* @__PURE__ */ z(s), f = c.value ? Ir(() => [
		l.value,
		mT(r),
		B(i),
		d.value
	], ([e, n, r]) => {
		if (u(), !d.value || !e.length) return;
		let i = new IntersectionObserver(t, {
			root: mT(n),
			rootMargin: r,
			threshold: a
		});
		e.forEach((e) => e && i.observe(e)), u = () => {
			i.disconnect(), u = Kw;
		};
	}, {
		immediate: s,
		flush: "post"
	}) : Kw, p = () => {
		u(), f(), d.value = !1;
	};
	return zw(p), {
		isSupported: c,
		isActive: d,
		pause() {
			u(), d.value = !1;
		},
		resume() {
			d.value = !0;
		},
		stop: p
	};
}
function LT(e, t = {}) {
	let { window: n = pT, scrollTarget: r, threshold: i = 0, rootMargin: a, once: o = !1, initialValue: s = !1 } = t, c = /* @__PURE__ */ z(s), l = IT(e, (e) => {
		let t = c.value, n = 0;
		for (let r of e) r.time >= n && (n = r.time, t = r.isIntersecting);
		c.value = t, o && fT(c, () => {
			l.stop();
		});
	}, {
		root: r,
		window: n,
		threshold: i,
		rootMargin: a
	});
	return t.controls ? {
		...l,
		isVisible: c
	} : c;
}
function RT(e) {
	return typeof Window < "u" && e instanceof Window ? e.document.documentElement : typeof Document < "u" && e instanceof Document ? e.documentElement : e;
}
var zT = 1;
function BT(e, t = {}) {
	let { throttle: n = 0, idle: r = 200, onStop: i = Kw, onScroll: a = Kw, offset: o = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}, observe: s = { mutation: !1 }, eventListenerOptions: c = {
		capture: !1,
		passive: !0
	}, behavior: l = "auto", window: u = pT, onError: d = (e) => {
		console.error(e);
	} } = t, f = typeof s == "boolean" ? { mutation: s } : s, p = /* @__PURE__ */ z(0), m = /* @__PURE__ */ z(0), h = G({
		get() {
			return p.value;
		},
		set(e) {
			_(e, void 0);
		}
	}), g = G({
		get() {
			return m.value;
		},
		set(e) {
			_(void 0, e);
		}
	});
	function _(t, n) {
		var r, i;
		if (!u) return;
		let a = B(e);
		if (!a) return;
		(r = a instanceof Document ? u.document.body : a) == null || r.scrollTo({
			top: B(n) ?? g.value,
			left: B(t) ?? h.value,
			behavior: B(l)
		});
		let o = (a == null || (i = a.document) == null ? void 0 : i.documentElement) || a?.documentElement || a;
		h != null && (p.value = o.scrollLeft), g != null && (m.value = o.scrollTop);
	}
	let v = /* @__PURE__ */ z(!1), y = /* @__PURE__ */ an({
		left: !0,
		right: !1,
		top: !0,
		bottom: !1
	}), b = /* @__PURE__ */ an({
		left: !1,
		right: !1,
		top: !1,
		bottom: !1
	}), x = (e) => {
		v.value && (v.value = !1, b.left = !1, b.right = !1, b.top = !1, b.bottom = !1, i(e));
	}, S = oT(x, n + r), C = (e) => {
		var t;
		if (!u) return;
		let n = (e == null || (t = e.document) == null ? void 0 : t.documentElement) || e?.documentElement || mT(e), { display: r, flexDirection: i, direction: a } = u.getComputedStyle(n), s = a === "rtl" ? -1 : 1, c = n.scrollLeft;
		b.left = c < p.value, b.right = c > p.value;
		let l = Math.abs(c * s) <= (o.left || 0), d = Math.abs(c * s) + n.clientWidth >= n.scrollWidth - (o.right || 0) - zT;
		r === "flex" && i === "row-reverse" ? (y.left = d, y.right = l) : (y.left = l, y.right = d), p.value = c;
		let f = n.scrollTop;
		e === u.document && !f && (f = u.document.body.scrollTop), b.top = f < m.value, b.bottom = f > m.value;
		let h = Math.abs(f) <= (o.top || 0), g = Math.abs(f) + n.clientHeight >= n.scrollHeight - (o.bottom || 0) - zT;
		r === "flex" && i === "column-reverse" ? (y.top = g, y.bottom = h) : (y.top = h, y.bottom = g), m.value = f;
	}, w = (e) => {
		if (!u) return;
		let t = e.target.documentElement ?? e.target;
		C(t), v.value = !0, S(e), a(e);
	};
	return hT(e, "scroll", n ? sT(w, n, !0, !1) : w, c), cT(() => {
		try {
			let t = B(e);
			if (!t) return;
			C(t);
		} catch (e) {
			d(e);
		}
	}), f?.mutation && e != null && e !== u && e !== document && bT(e, () => {
		let t = B(e);
		t && C(t);
	}, {
		attributes: !0,
		childList: !0,
		subtree: !0
	}), hT(e, "scrollend", x, c), {
		x: h,
		y: g,
		isScrolling: v,
		arrivedState: y,
		directions: b,
		measure() {
			let t = B(e);
			u && t && C(t);
		}
	};
}
function VT(e, t, n = {}) {
	let { direction: r = "bottom", interval: i = 100, canLoadMore: a = () => !0 } = n, o = /* @__PURE__ */ an(BT(e, {
		...n,
		offset: {
			[r]: n.distance ?? 0,
			...n.offset
		}
	})), s = /* @__PURE__ */ z(), c = G(() => !!s.value), l = G(() => RT(B(e))), u = LT(l), d = G(() => l.value ? a(l.value) : !1);
	function f() {
		if (o.measure(), !l.value || !u.value || !d.value || s.value) return;
		let { scrollHeight: e, clientHeight: n, scrollWidth: a, clientWidth: c } = l.value, p = r === "bottom" || r === "top" ? e <= n : a <= c;
		(o.arrivedState[r] || p) && (s.value = Promise.all([t(o), new Promise((e) => setTimeout(e, i))]).finally(() => {
			s.value = null, ar(() => f());
		}));
	}
	return lT(Ir(() => [
		o.arrivedState[r],
		u.value,
		d.value
	], f, {
		immediate: !0,
		flush: "post"
	})), {
		isLoading: c,
		reset() {
			ar(() => f());
		}
	};
}
var HT = {
	page: (e) => [e.pageX, e.pageY],
	client: (e) => [e.clientX, e.clientY],
	screen: (e) => [e.screenX, e.screenY],
	movement: (e) => e instanceof MouseEvent ? [e.movementX, e.movementY] : null
};
function UT(e = {}) {
	let { type: t = "page", touch: n = !0, resetOnTouchEnds: r = !1, initialValue: i = {
		x: 0,
		y: 0
	}, window: a = pT, target: o = a, scroll: s = !0, eventFilter: c } = e, l = null, u = 0, d = 0, f = /* @__PURE__ */ z(i.x), p = /* @__PURE__ */ z(i.y), m = /* @__PURE__ */ z(null), h = typeof t == "function" ? t : HT[t], g = (e) => {
		let t = h(e);
		l = e, t && ([f.value, p.value] = t, m.value = "mouse"), a && (u = a.scrollX, d = a.scrollY);
	}, _ = (e) => {
		if (e.touches.length > 0) {
			let t = h(e.touches[0]);
			t && ([f.value, p.value] = t, m.value = "touch");
		}
	}, v = () => {
		if (!l || !a) return;
		let e = h(l);
		l instanceof MouseEvent && e && (f.value = e[0] + a.scrollX - u, p.value = e[1] + a.scrollY - d);
	}, y = () => {
		f.value = i.x, p.value = i.y;
	}, b = c ? (e) => c(() => g(e), {}) : (e) => g(e), x = c ? (e) => c(() => _(e), {}) : (e) => _(e), S = c ? () => c(() => v(), {}) : () => v();
	if (o) {
		let e = { passive: !0 };
		hT(o, ["mousemove", "dragover"], b, e), n && t !== "movement" && (hT(o, ["touchstart", "touchmove"], x, e), r && hT(o, "touchend", y, e)), s && t === "page" && hT(a, "scroll", S, e);
	}
	return {
		x: f,
		y: p,
		sourceType: m
	};
}
function WT(e, t = {}) {
	let { windowResize: n = !0, windowScroll: r = !0, handleOutside: i = !0, window: a = pT } = t, o = t.type || "page", { x: s, y: c, sourceType: l } = UT(t), u = /* @__PURE__ */ z(e ?? a?.document.body), d = /* @__PURE__ */ z(0), f = /* @__PURE__ */ z(0), p = /* @__PURE__ */ z(0), m = /* @__PURE__ */ z(0), h = /* @__PURE__ */ z(0), g = /* @__PURE__ */ z(0), _ = /* @__PURE__ */ z(!0);
	function v() {
		if (!a) return;
		let e = mT(u);
		if (e && e instanceof Element) for (let t of e.getClientRects()) {
			let { left: e, top: n, width: r, height: l } = t;
			p.value = e + (o === "page" ? a.pageXOffset : 0), m.value = n + (o === "page" ? a.pageYOffset : 0), h.value = l, g.value = r;
			let u = s.value - p.value, v = c.value - m.value;
			if (_.value = r === 0 || l === 0 || u < 0 || v < 0 || u > r || v > l, (i || !_.value) && (d.value = u, f.value = v), !_.value) break;
		}
	}
	let y = [];
	function b() {
		y.forEach((e) => e()), y.length = 0;
	}
	if (cT(() => {
		v();
	}), a) {
		let { stop: e } = MT(u, v), { stop: t } = bT(u, v, { attributeFilter: ["style", "class"] }), i = Ir([
			u,
			s,
			c
		], v);
		y.push(e, t, i), hT(document, "mouseleave", () => _.value = !0, { passive: !0 }), r && y.push(hT("scroll", v, {
			capture: !0,
			passive: !0
		})), n && y.push(hT("resize", v, { passive: !0 }));
	}
	return {
		x: s,
		y: c,
		sourceType: l,
		elementX: d,
		elementY: f,
		elementPositionX: p,
		elementPositionY: m,
		elementHeight: h,
		elementWidth: g,
		isOutside: _,
		stop: b
	};
}
function GT(e) {
	let t = window.getComputedStyle(e);
	if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
	{
		let t = e.parentNode;
		return !t || t.tagName === "BODY" ? !1 : GT(t);
	}
}
function KT(e) {
	let t = e || window.event, n = t.target;
	return GT(n) ? !1 : t.touches.length > 1 || (t.preventDefault && t.preventDefault(), !1);
}
var qT = /* @__PURE__ */ new WeakMap();
function JT(e, t = !1) {
	let n = /* @__PURE__ */ z(t), r = null, i = "";
	Ir(Yw(e), (e) => {
		let t = RT(B(e));
		if (t) {
			let e = t;
			if (qT.get(e) || qT.set(e, e.style.overflow), e.style.overflow !== "hidden" && (i = e.style.overflow), e.style.overflow === "hidden") return n.value = !0;
			if (n.value) return e.style.overflow = "hidden";
		}
	}, { immediate: !0 });
	let a = () => {
		let t = RT(B(e));
		t && !n.value && (qw && (r = hT(t, "touchmove", (e) => {
			KT(e);
		}, { passive: !1 })), t.style.overflow = "hidden", n.value = !0);
	}, o = () => {
		let t = RT(B(e));
		t && n.value && (qw && r?.(), t.style.overflow = i, qT.delete(t), n.value = !1);
	};
	return zw(o), G({
		get() {
			return n.value;
		},
		set(e) {
			e ? a() : o();
		}
	});
}
function YT(e, t = {}) {
	let { threshold: n = 50, onSwipe: r, onSwipeEnd: i, onSwipeStart: a, passive: o = !0 } = t, s = /* @__PURE__ */ an({
		x: 0,
		y: 0
	}), c = /* @__PURE__ */ an({
		x: 0,
		y: 0
	}), l = G(() => s.x - c.x), u = G(() => s.y - c.y), { max: d, abs: f } = Math, p = G(() => d(f(l.value), f(u.value)) >= n), m = /* @__PURE__ */ z(!1), h = G(() => p.value ? f(l.value) > f(u.value) ? l.value > 0 ? "left" : "right" : u.value > 0 ? "up" : "down" : "none"), g = (e) => [e.touches[0].clientX, e.touches[0].clientY], _ = (e, t) => {
		s.x = e, s.y = t;
	}, v = (e, t) => {
		c.x = e, c.y = t;
	}, y = {
		passive: o,
		capture: !o
	}, b = [
		hT(e, "touchstart", (e) => {
			if (e.touches.length !== 1) return;
			let [t, n] = g(e);
			_(t, n), v(t, n), a?.(e);
		}, y),
		hT(e, "touchmove", (e) => {
			if (e.touches.length !== 1) return;
			let [t, n] = g(e);
			v(t, n), y.capture && !y.passive && Math.abs(l.value) > Math.abs(u.value) && e.preventDefault(), !m.value && p.value && (m.value = !0), m.value && r?.(e);
		}, y),
		hT(e, ["touchend", "touchcancel"], (e) => {
			m.value && i?.(e, h.value), m.value = !1;
		}, y)
	];
	return {
		isSwiping: m,
		direction: h,
		coordsStart: s,
		coordsEnd: c,
		lengthX: l,
		lengthY: u,
		stop: () => b.forEach((e) => e())
	};
}
// node_modules/@nextcloud/initial-state/dist/index.js
function XT(e, t, n) {
	let r = `#initial-state-${e}-${t}`;
	if (window._nc_initial_state?.has(r)) return window._nc_initial_state.get(r);
	window._nc_initial_state || (window._nc_initial_state = /* @__PURE__ */ new Map());
	let i = document.querySelector(r);
	if (i === null) {
		if (n !== void 0) return n;
		throw Error(`Could not find initial state ${t} of ${e}`);
	}
	try {
		let e = JSON.parse(atob(i.value));
		return window._nc_initial_state.set(r, e), e;
	} catch (r) {
		if (console.error("[@nextcloud/initial-state] Could not parse initial state", {
			key: t,
			app: e,
			error: r
		}), n !== void 0) return n;
		throw Error(`Could not parse initial state ${t} of ${e}`, { cause: r });
	}
}
// node_modules/@nextcloud/capabilities/dist/index.mjs
function ZT() {
	try {
		return XT("core", "capabilities");
	} catch {
		return console.debug("Could not find capabilities initial state fall back to _oc_capabilities"), "_oc_capabilities" in window ? window._oc_capabilities : {};
	}
}
// node_modules/axios/lib/helpers/bind.js
function QT(e, t) {
	return function() {
		return e.apply(t, arguments);
	};
}
// node_modules/axios/lib/utils.js
var { toString: $T } = Object.prototype, { getPrototypeOf: eE } = Object, { iterator: tE, toStringTag: nE } = Symbol, rE = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), iE = (e) => typeof e == "string" && (e === "__proto__" || e === "constructor" || e === "prototype"), aE = (e, t, n) => e === Object.prototype || !n && t === null, oE = (e) => {
	if (!Object.isExtensible(e)) return !1;
	let t = Object.getOwnPropertyNames(e);
	return Object.getOwnPropertySymbols && t.push(...Object.getOwnPropertySymbols(e)), t.every((t) => {
		if (iE(t)) return !1;
		let n = Object.getOwnPropertyDescriptor(e, t);
		return !!n && n.configurable && n.writable === !0;
	});
}, sE = (e, t) => {
	let n = e, r = [];
	for (; n != null;) {
		if (r.indexOf(n) !== -1) return !1;
		r.push(n);
		let i = eE(n);
		if (aE(n, i, n === e)) return !1;
		if (rE(n, t)) return !0;
		n = i;
	}
	return !1;
}, cE = (e, t) => e != null && sE(e, t) ? e[t] : void 0, lE = (e) => {
	if (e == null || typeof e != "object" && typeof e != "function") return e;
	let t = eE(e);
	if (t === null && oE(e)) return e;
	let n = Object.create(null), r = Object.create(null), i = [], a = e;
	for (; a != null && i.indexOf(a) === -1;) {
		i.push(a);
		let o = a === e ? t : eE(a);
		if (aE(a, o, a === e)) break;
		let s = Object.getOwnPropertyNames(a);
		Object.getOwnPropertySymbols && s.push(...Object.getOwnPropertySymbols(a));
		for (let t of s) iE(t) || rE(r, t) || (n[t] = e[t], r[t] = !0);
		a = o;
	}
	return n;
}, uE = ((e) => (t) => {
	let n = $T.call(t);
	return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(Object.create(null)), dE = (e) => (e = e.toLowerCase(), (t) => uE(t) === e), fE = (e) => (t) => typeof t === e, { isArray: pE } = Array, mE = fE("undefined");
function hE(e) {
	return e !== null && !mE(e) && e.constructor !== null && !mE(e.constructor) && yE(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
var gE = dE("ArrayBuffer");
function _E(e) {
	let t;
	return t = typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && gE(e.buffer), t;
}
var vE = fE("string"), yE = fE("function"), bE = fE("number"), xE = (e) => typeof e == "object" && !!e, SE = (e) => e === !0 || e === !1, CE = (e) => {
	if (!xE(e)) return !1;
	let t = eE(e);
	return (t === null || t === Object.prototype || eE(t) === null) && (aE(e, t, !0) || !rE(e, nE) && !rE(e, tE));
}, wE = (e) => {
	if (!xE(e) || hE(e)) return !1;
	try {
		return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
	} catch {
		return !1;
	}
}, TE = dE("Date"), EE = dE("File"), DE = (e) => !!(e && e.uri !== void 0), OE = (e) => e && e.getParts !== void 0, kE = dE("Blob"), AE = dE("FileList"), jE = dE("Set"), ME = (e) => xE(e) && yE(e.pipe);
function NE() {
	return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
var PE = NE(), FE = PE.FormData === void 0 ? void 0 : PE.FormData, IE = (e) => {
	if (!e) return !1;
	if (FE && e instanceof FE) return !0;
	let t = eE(e);
	if (!t || t === Object.prototype || !yE(e.append)) return !1;
	let n = uE(e);
	return n === "formdata" || n === "object" && yE(e.toString) && e.toString() === "[object FormData]";
}, LE = dE("URLSearchParams"), [RE, zE, BE, VE] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(dE), HE = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function UE(e, t, { allOwnKeys: n = !1 } = {}) {
	if (e == null) return;
	let r, i;
	if (typeof e != "object" && (e = [e]), pE(e)) for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
	else {
		if (hE(e)) return;
		let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length, o;
		for (r = 0; r < a; r++) o = i[r], t.call(null, e[o], o, e);
	}
}
function WE(e, t) {
	if (hE(e)) return null;
	t = t.toLowerCase();
	let n = Object.keys(e), r = n.length, i;
	for (; r-- > 0;) if (i = n[r], t === i.toLowerCase()) return i;
	return null;
}
var GE = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, KE = (e) => !mE(e) && e !== GE;
function qE(...e) {
	let { caseless: t, skipUndefined: n } = KE(this) && this || {}, r = {}, i = t ? Object.create(null) : null, a = (e, t) => {
		if (t === "__proto__" || t === "constructor" || t === "prototype") return;
		let a = t;
		if (i && typeof t == "string") {
			let e = t.toLowerCase(), n = i[e];
			n !== void 0 && rE(r, n) ? a = n : i[e] = t;
		}
		let o = rE(r, a) ? r[a] : void 0;
		CE(o) && CE(e) ? r[a] = qE(o, e) : CE(e) ? r[a] = qE({}, e) : pE(e) ? r[a] = e.slice() : n && mE(e) || (r[a] = e);
	};
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		if (!n || hE(n) || (UE(n, a), typeof n != "object" || pE(n) || !Object.getOwnPropertySymbols)) continue;
		let r = Object.getOwnPropertySymbols(n);
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			aD.call(n, t) && a(n[t], t);
		}
	}
	return r;
}
var JE = (e, t, n, { allOwnKeys: r } = {}) => (UE(t, (t, r) => {
	n && yE(t) ? Object.defineProperty(e, r, {
		__proto__: null,
		value: QT(t, n),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : Object.defineProperty(e, r, {
		__proto__: null,
		value: t,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}, { allOwnKeys: r }), e), YE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), XE = (e, t, n, r) => {
	e.prototype = Object.create(t.prototype, r), Object.defineProperty(e.prototype, "constructor", {
		__proto__: null,
		value: e,
		writable: !0,
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e, "super", {
		__proto__: null,
		value: t.prototype
	}), n && Object.assign(e.prototype, n);
}, ZE = (e, t, n, r) => {
	let i, a, o, s = {};
	if (t ||= {}, e == null) return t;
	do {
		for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;) o = i[a], r && !r(o, e, t) || s[o] || (t[o] = e[o], s[o] = !0);
		e = n !== !1 && eE(e);
	} while (e && (!n || n(e, t)) && e !== Object.prototype);
	return t;
}, QE = (e, t, n) => {
	e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
	let r = e.indexOf(t, n);
	return r !== -1 && r === n;
}, $E = (e) => {
	if (!e) return null;
	if (pE(e)) return e;
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) return null;
	let n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = e;
	for (; i != null && n.size < t;) {
		if (r.has(i)) return null;
		r.add(i);
		let a = eE(i);
		if (aE(i, a, i === e)) break;
		Object.getOwnPropertyNames(i).forEach((e) => {
			let r = +e;
			Number.isInteger(r) && r >= 0 && r < t && String(r) === e && rE(i, e) && n.add(r);
		}), i = a;
	}
	if (n.size !== t) return null;
	let a = Array(t);
	for (; t-- > 0;) a[t] = e[t];
	return a;
}, eD = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && eE(Uint8Array)), tD = (e, t) => {
	let n = (e && e[tE]).call(e), r;
	for (; (r = n.next()) && !r.done;) {
		let n = r.value;
		t.call(e, n[0], n[1]);
	}
}, nD = (e, t) => {
	let n, r = [];
	for (; (n = e.exec(t)) !== null;) r.push(n);
	return r;
}, rD = dE("HTMLFormElement"), iD = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e, t, n) {
	return t.toUpperCase() + n;
}), { propertyIsEnumerable: aD } = Object.prototype, oD = dE("RegExp"), sD = (e, t) => {
	let n = Object.getOwnPropertyDescriptors(e), r = {};
	UE(n, (n, i) => {
		let a;
		(a = t(n, i, e)) !== !1 && (r[i] = a || n);
	}), Object.defineProperties(e, r);
}, cD = (e) => {
	sD(e, (t, n) => {
		if (yE(e) && [
			"arguments",
			"caller",
			"callee"
		].includes(n)) return !1;
		let r = e[n];
		yE(r) && (t.enumerable = !1, "writable" in t ? t.writable = !1 : t.set ||= () => {
			throw Error("Can not rewrite read-only method '" + n + "'");
		});
	});
}, lD = (e, t) => {
	let n = {}, r = (e) => {
		e.forEach((e) => {
			n[e] = !0;
		});
	};
	return pE(e) ? r(e) : r(String(e).split(t)), n;
}, uD = () => {}, dD = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function fD(e) {
	return !!(e && yE(e.append) && e[nE] === "FormData" && e[tE]);
}
var pD = (e) => {
	let t = /* @__PURE__ */ new WeakSet(), n = (e) => {
		if (xE(e)) {
			if (t.has(e)) return;
			if (hE(e)) return e;
			if (!("toJSON" in e)) {
				t.add(e);
				let r;
				if (jE(e)) {
					r = [];
					for (let t of e) {
						let e = n(t);
						!mE(e) && r.push(e);
					}
				} else r = pE(e) ? [] : {}, UE(e, (e, t) => {
					let i = n(e);
					!mE(i) && (r[t] = i);
				});
				return t.delete(e), r;
			}
		}
		return e;
	};
	return n(e);
}, mD = dE("AsyncFunction"), hD = (e) => e && (xE(e) || yE(e)) && yE(e.then) && yE(e.catch), gD = ((e, t) => e ? setImmediate : t ? ((e, t) => (GE.addEventListener("message", ({ source: n, data: r }) => {
	n === GE && r === e && t.length && t.shift()();
}, !1), (n) => {
	t.push(n), GE.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(typeof setImmediate == "function", yE(GE.postMessage)), _D = typeof queueMicrotask < "u" ? queueMicrotask.bind(GE) : typeof process < "u" && process.nextTick || gD, vD = (e) => e != null && yE(e[tE]), Q = {
	isArray: pE,
	isArrayBuffer: gE,
	isBuffer: hE,
	isFormData: IE,
	isArrayBufferView: _E,
	isString: vE,
	isNumber: bE,
	isBoolean: SE,
	isObject: xE,
	isPlainObject: CE,
	isEmptyObject: wE,
	isReadableStream: RE,
	isRequest: zE,
	isResponse: BE,
	isHeaders: VE,
	isUndefined: mE,
	isDate: TE,
	isFile: EE,
	isReactNativeBlob: DE,
	isReactNative: OE,
	isBlob: kE,
	isRegExp: oD,
	isFunction: yE,
	isStream: ME,
	isURLSearchParams: LE,
	isTypedArray: eD,
	isFileList: AE,
	forEach: UE,
	merge: qE,
	extend: JE,
	trim: HE,
	stripBOM: YE,
	inherits: XE,
	toFlatObject: ZE,
	kindOf: uE,
	kindOfTest: dE,
	endsWith: QE,
	toArray: $E,
	forEachEntry: tD,
	matchAll: nD,
	isHTMLForm: rD,
	hasOwnProperty: rE,
	hasOwnProp: rE,
	hasOwnInPrototypeChain: sE,
	getSafeProp: cE,
	toSafeFlatObject: lE,
	reduceDescriptors: sD,
	freezeMethods: cD,
	toObjectSet: lD,
	toCamelCase: iD,
	noop: uD,
	toFiniteNumber: dD,
	findKey: WE,
	global: GE,
	isContextDefined: KE,
	isSpecCompliantForm: fD,
	toJSONObject: pD,
	isAsyncFn: mD,
	isThenable: hD,
	setImmediate: gD,
	asap: _D,
	isIterable: vD,
	isSafeIterable: (e) => e != null && sE(e, tE) && vD(e)
}, yD = Q.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]), bD = (e) => {
	let t = Object.create(null), n, r, i;
	return e && e.split("\n").forEach(function(e) {
		i = e.indexOf(":"), n = e.substring(0, i).trim().toLowerCase(), r = e.substring(i + 1).trim();
		let a = Q.hasOwnProp(t, n);
		!n || a && Q.hasOwnProp(yD, n) || (n === "set-cookie" ? a ? t[n].push(r) : t[n] = [r] : t[n] = a ? t[n] + ", " + r : r);
	}), t;
};
// node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function xD(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
var SD = /* @__PURE__ */ RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), CD = /* @__PURE__ */ RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function wD(e, t) {
	return Q.isArray(e) ? e.map((e) => wD(e, t)) : xD(String(e).replace(t, ""));
}
var TD = (e) => wD(e, SD), ED = (e) => wD(e, CD);
function DD(e) {
	let t = Object.create(null);
	return Q.forEach(e.toJSON(), (e, n) => {
		t[n] = ED(e);
	}), t;
}
// node_modules/axios/lib/core/AxiosHeaders.js
var OD = Symbol("internals");
function kD(e) {
	return e && String(e).trim().toLowerCase();
}
function AD(e) {
	return e === !1 || e == null ? e : Q.isArray(e) ? e.map(AD) : TD(String(e));
}
function jD(e) {
	let t = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g, r;
	for (; r = n.exec(e);) t[r[1]] = r[2];
	return t;
}
var MD = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function ND(e) {
	let t = 0, n = e.length;
	for (; t < n;) {
		let n = e.charCodeAt(t);
		if (n !== 9 && n !== 32) break;
		t += 1;
	}
	for (; n > t;) {
		let t = e.charCodeAt(n - 1);
		if (t !== 9 && t !== 32) break;
		--n;
	}
	return t === 0 && n === e.length ? e : e.slice(t, n);
}
function PD(e) {
	let t = e.length - 1;
	if (t < 1 || e.charCodeAt(0) !== 34 || e.charCodeAt(t) !== 34) return e;
	let n = "";
	for (let r = 1; r < t; r++) {
		let i = e.charCodeAt(r);
		if (i === 34 || i === 92 && (r += 1, r >= t)) return e;
		n += e[r];
	}
	return n;
}
function FD(e) {
	let t = Object.create(null), n = String(e), r = 0, i = !1, a = !1;
	function o(e) {
		let i = ND(n.slice(r, e)), a = i.indexOf("=");
		if (a < 1) return;
		let o = ND(i.slice(0, a));
		if (!MD.test(o)) return;
		let s = o.toLowerCase();
		if (s === "__proto__" || s === "constructor" || s === "prototype") return;
		let c = ND(i.slice(a + 1));
		t[s] = PD(c);
	}
	for (let e = 0; e < n.length; e++) {
		let t = n.charCodeAt(e);
		i ? a ? a = !1 : t === 92 ? a = !0 : t === 34 && (i = !1) : t === 34 ? i = !0 : (t === 44 || t === 59) && (o(e), r = e + 1);
	}
	return o(n.length), t;
}
var ID = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()), LD = "__Proto__", RD = (e) => e === "__proto__" ? LD : e;
function zD(e, t, n, r, i) {
	if (Q.isFunction(r)) return r.call(e, t, n);
	if (i && (t = n), Q.isString(t)) {
		if (Q.isString(r)) return t.indexOf(r) !== -1;
		if (Q.isRegExp(r)) return r.test(t);
	}
}
function BD(e) {
	return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function VD(e, t) {
	let n = Q.toCamelCase(" " + t);
	[
		"get",
		"set",
		"has"
	].forEach((r) => {
		Object.defineProperty(e, r + n, {
			__proto__: null,
			value: function(e, n, i) {
				return this[r].call(this, t, e, n, i);
			},
			configurable: !0
		});
	});
}
var HD = class {
	constructor(e) {
		e && this.set(e);
	}
	set(e, t, n) {
		let r = this;
		function i(e, t, n) {
			let i = kD(t);
			if (!i) return;
			let a = Q.findKey(r, i);
			(!a || r[a] === void 0 || n === !0 || n === void 0 && r[a] !== !1) && (r[RD(a || t)] = AD(e));
		}
		let a = (e, t) => Q.forEach(e, (e, n) => i(e, n, t));
		if (Q.isPlainObject(e) || e instanceof this.constructor) a(e, t);
		else if (Q.isString(e) && (e = e.trim()) && !ID(e)) a(bD(e), t);
		else if (Q.isObject(e) && Q.isSafeIterable(e)) {
			let n = Object.create(null), r, i;
			for (let t of e) {
				if (!Q.isArray(t)) throw TypeError("Object iterator must return a key-value pair");
				i = t[0], Q.hasOwnProp(n, i) ? (r = n[i], n[i] = Q.isArray(r) ? [...r, t[1]] : [r, t[1]]) : n[i] = t[1];
			}
			a(n, t);
		} else e != null && i(t, e, n);
		return this;
	}
	get(e, t) {
		if (e = kD(e), e) {
			let n = Q.findKey(this, e);
			if (n) {
				let e = this[n];
				if (!t) return e;
				if (t === !0) return jD(e);
				if (Q.isFunction(t)) return t.call(this, e, n);
				if (Q.isRegExp(t)) return t.exec(e);
				throw TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(e, t) {
		if (e = kD(e), e) {
			let n = Q.findKey(this, e);
			return !(!n || this[n] === void 0 || t && !zD(this, this[n], n, t));
		}
		return !1;
	}
	delete(e, t) {
		let n = this, r = !1;
		function i(e) {
			if (e = kD(e), e) {
				let i = Q.findKey(n, e);
				i && (!t || zD(n, n[i], i, t)) && (delete n[i], r = !0);
			}
		}
		return Q.isArray(e) ? e.forEach(i) : i(e), r;
	}
	clear(e) {
		let t = Object.keys(this), n = t.length, r = !1;
		for (; n--;) {
			let i = t[n];
			(!e || zD(this, this[i], i, e, !0)) && (delete this[i], r = !0);
		}
		return r;
	}
	normalize(e) {
		let t = this, n = Object.create(null);
		return Q.forEach(this, (r, i) => {
			let a = Q.findKey(n, i);
			if (a) {
				t[a] = AD(r), delete t[i];
				return;
			}
			let o = RD(e ? BD(i) : String(i).trim());
			o !== i && delete t[i], t[o] = AD(r), n[o] = !0;
		}), this;
	}
	concat(...e) {
		return this.constructor.concat(this, ...e);
	}
	toJSON(e) {
		let t = Object.create(null);
		return Q.forEach(this, (n, r) => {
			n != null && n !== !1 && (t[r] = e && Q.isArray(n) ? n.join(", ") : n);
		}), t;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join("\n");
	}
	getSetCookie() {
		let e = this.get("set-cookie");
		return Q.isArray(e) ? e : e == null || e === !1 ? [] : [e];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(e) {
		return e instanceof this ? e : new this(e);
	}
	static parseParameters(e) {
		return FD(e);
	}
	static concat(e, ...t) {
		let n = new this(e);
		return t.forEach((e) => n.set(e)), n;
	}
	static accessor(e) {
		let t = (this[OD] = this[OD] = { accessors: {} }).accessors, n = this.prototype;
		function r(e) {
			let r = kD(e);
			t[r] || (VD(n, e), t[r] = !0);
		}
		return Q.isArray(e) ? e.forEach(r) : r(e), this;
	}
};
HD.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]), Q.reduceDescriptors(HD.prototype, ({ value: e }, t) => {
	let n = t[0].toUpperCase() + t.slice(1);
	return {
		get: () => e,
		set(e) {
			this[n] = e;
		}
	};
}), Q.freezeMethods(HD);
// node_modules/axios/lib/core/AxiosError.js
var UD = "[REDACTED ****]";
function WD(e) {
	if (Q.hasOwnProp(e, "toJSON")) return !0;
	let t = Object.getPrototypeOf(e);
	for (; t && t !== Object.prototype;) {
		if (Q.hasOwnProp(t, "toJSON")) return !0;
		t = Object.getPrototypeOf(t);
	}
	return !1;
}
function GD(e, t) {
	let n = new Set(t.map((e) => String(e).toLowerCase())), r = [], i = (e) => {
		if (typeof e != "object" || !e || Q.isBuffer(e)) return e;
		if (r.indexOf(e) !== -1) return;
		e instanceof HD && (e = e.toJSON()), r.push(e);
		let t;
		if (Q.isArray(e)) t = [], e.forEach((e, n) => {
			let r = i(e);
			Q.isUndefined(r) || (t[n] = r);
		});
		else {
			if (!Q.isPlainObject(e) && WD(e)) return r.pop(), e;
			t = Object.create(null);
			for (let [r, a] of Object.entries(e)) {
				let e = n.has(r.toLowerCase()) ? UD : i(a);
				Q.isUndefined(e) || (t[r] = e);
			}
		}
		return r.pop(), t;
	};
	return i(e);
}
function KD(e) {
	try {
		return String(e);
	} catch {
		return "";
	}
}
function qD(e) {
	return e.errors.map((e) => {
		try {
			return e && e.message ? KD(e.message) : KD(e);
		} catch {
			return "";
		}
	}).filter(Boolean).join("; ") || e.name || "AggregateError";
}
var JD = "\nCaused by: ", YD = Symbol("causeStack");
function XD(e, t) {
	let n = Q.hasOwnProp(e, YD) && e[YD];
	return n && t.endsWith(n) ? t.length - n.length : -1;
}
function ZD(e, t) {
	try {
		let n = t && t.stack;
		if (typeof n != "string" || !n) return;
		let r = e.stack;
		if (typeof r != "string" || !r) return;
		let i = JD + n;
		e.stack = r + i, Object.defineProperty(e, YD, {
			__proto__: null,
			value: i
		});
	} catch {}
}
var $ = class e extends Error {
	static from(t, n, r, i, a, o) {
		let s = t.message;
		!s && Q.isArray(t.errors) && t.errors.length && (s = qD(t));
		let c = new e(s, n || t.code, r, i, a);
		return Object.defineProperty(c, "cause", {
			__proto__: null,
			value: t,
			writable: !0,
			enumerable: !1,
			configurable: !0
		}), c.name = t.name, ZD(c, t), t.status != null && c.status == null && (c.status = t.status), o && Object.assign(c, o), c;
	}
	constructor(e, t, n, r, i) {
		super(e), Object.defineProperty(this, "message", {
			__proto__: null,
			value: e,
			enumerable: !0,
			writable: !0,
			configurable: !0
		}), this.name = "AxiosError", this.isAxiosError = !0, t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status);
	}
	toJSON() {
		let e = this.config, t = e && Q.hasOwnProp(e, "redact") ? e.redact : void 0, n = Q.isArray(t) && t.length > 0 ? GD(e, t) : Q.toJSONObject(e);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: n,
			code: this.code,
			status: this.status
		};
	}
};
$.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE", $.ERR_BAD_OPTION = "ERR_BAD_OPTION", $.ECONNABORTED = "ECONNABORTED", $.ETIMEDOUT = "ETIMEDOUT", $.ECONNREFUSED = "ECONNREFUSED", $.ERR_NETWORK = "ERR_NETWORK", $.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS", $.ERR_DEPRECATED = "ERR_DEPRECATED", $.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE", $.ERR_BAD_REQUEST = "ERR_BAD_REQUEST", $.ERR_CANCELED = "ERR_CANCELED", $.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT", $.ERR_INVALID_URL = "ERR_INVALID_URL", $.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
function QD(e) {
	return Q.isPlainObject(e) || Q.isArray(e);
}
function $D(e) {
	return Q.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function eO(e, t, n) {
	return e ? e.concat(t).map(function(e, t) {
		return e = $D(e), !n && t ? "[" + e + "]" : e;
	}).join(n ? "." : "") : t;
}
function tO(e) {
	return Q.isArray(e) && !e.some(QD);
}
var nO = Q.toFlatObject(Q, {}, null, function(e) {
	return /^is[A-Z]/.test(e);
});
function rO(e, t, n) {
	if (!Q.isObject(e)) throw TypeError("target must be an object");
	t ||= new FormData();
	let r = (e, t) => {
		let r = Q.getSafeProp(n, e);
		return Q.isUndefined(r) ? t : r;
	}, i = r("metaTokens", !0), a = r("visitor") || h, o = r("dots", !1), s = r("indexes", !1), c = r("Blob") || typeof Blob < "u" && Blob, l = r("maxDepth", 100), u = c && Q.isSpecCompliantForm(t), d = [];
	if (!Q.isFunction(a)) throw TypeError("visitor must be a function");
	function f(e) {
		if (e === null) return "";
		if (Q.isDate(e)) return e.toISOString();
		if (Q.isBoolean(e)) return e.toString();
		if (!u && Q.isBlob(e)) throw new $("Blob is not supported. Use a Buffer instead.");
		if (Q.isArrayBuffer(e) || Q.isTypedArray(e)) {
			if (u && typeof c == "function") return new c([e]);
			throw new $("Blob is not supported. Use a Buffer instead.", $.ERR_NOT_SUPPORT);
		}
		return e;
	}
	function p(e) {
		if (e > l) throw new $("Object is too deeply nested (" + e + " levels). Max depth: " + l, $.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function m(e, t) {
		if (l === Infinity) return JSON.stringify(e);
		let n = [];
		return JSON.stringify(e, function(e, r) {
			if (!Q.isObject(r)) return r;
			for (; n.length && n[n.length - 1] !== this;) n.pop();
			return n.push(r), p(t + n.length - 1), r;
		});
	}
	function h(e, n, r) {
		let a = e;
		if (Q.isReactNative(t) && Q.isReactNativeBlob(e)) return t.append(eO(r, n, o), f(e)), !1;
		if (e && !r && typeof e == "object") {
			if (Q.endsWith(n, "{}")) n = i ? n : n.slice(0, -2), e = m(e, 1);
			else if (Q.isArray(e) && tO(e) || (Q.isFileList(e) || Q.endsWith(n, "[]")) && (a = Q.toArray(e))) return n = $D(n), a.forEach(function(e, r) {
				!(Q.isUndefined(e) || e === null) && t.append(s === !0 ? eO([n], r, o) : s === null ? n : n + "[]", f(e));
			}), !1;
		}
		return QD(e) ? !0 : (t.append(eO(r, n, o), f(e)), !1);
	}
	let g = Object.assign(nO, {
		defaultVisitor: h,
		convertValue: f,
		isVisitable: QD
	});
	function _(e, n, r = 0) {
		if (!Q.isUndefined(e)) {
			if (p(r), d.indexOf(e) !== -1) throw Error("Circular reference detected in " + n.join("."));
			d.push(e), Q.forEach(e, function(e, i) {
				(!(Q.isUndefined(e) || e === null) && a.call(t, e, Q.isString(i) ? i.trim() : i, n, g)) === !0 && _(e, n ? n.concat(i) : [i], r + 1);
			}), d.pop();
		}
	}
	if (!Q.isObject(e)) throw TypeError("data must be an object");
	return _(e), t;
}
// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function iO(e) {
	let t = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(e) {
		return t[e];
	});
}
function aO(e, t) {
	this._pairs = [], e && rO(e, this, t);
}
var oO = aO.prototype;
oO.append = function(e, t) {
	this._pairs.push([e, t]);
}, oO.toString = function(e) {
	let t = e ? (t) => e.call(this, t, iO) : iO;
	return this._pairs.map(function(e) {
		return t(e[0]) + "=" + t(e[1]);
	}, "").join("&");
};
// node_modules/axios/lib/helpers/buildURL.js
function sO(e) {
	return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function cO(e, t, n) {
	if (!t) return e;
	e ||= "";
	let r = Q.isFunction(n) ? { serialize: n } : n, i = Q.getSafeProp(r, "encode") || sO, a = Q.getSafeProp(r, "serialize"), o;
	if (o = a ? a(t, r) : Q.isURLSearchParams(t) ? t.toString() : new aO(t, r).toString(i), o) {
		let t = e.indexOf("#");
		t !== -1 && (e = e.slice(0, t)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
	}
	return e;
}
// node_modules/axios/lib/core/InterceptorManager.js
var lO = Symbol("internals");
function uO(e) {
	return e ? e.length : 0;
}
function dO(e) {
	if (e) for (; e.length && e[e.length - 1] === null;) e.pop();
}
function fO(e) {
	return typeof e == "string" && e !== "" && String(Number(e)) === e ? Number(e) : e;
}
function pO(e, t) {
	let n = e.handlers, r = uO(n);
	n === t.handlersRef ? r !== t.handlersLength && (r ? t.handlerEntries.forEach(function(e, r) {
		n[e.index] !== e.handler && t.handlerEntries.delete(r);
	}) : t.handlerEntries.clear()) : (t.handlersRef = n, t.handlerEntries.clear()), t.handlersLength = r;
}
var mO = class {
	constructor() {
		this.handlers = [], this[lO] = {
			handlersRef: this.handlers,
			handlersLength: this.handlers.length,
			handlerEntries: /* @__PURE__ */ new Map(),
			iterationDepth: 0,
			nextId: 0
		};
	}
	use(e, t, n) {
		let r = {
			fulfilled: e,
			rejected: t,
			synchronous: n ? n.synchronous : !1,
			runWhen: n ? n.runWhen : null
		}, i = this[lO];
		this.handlers ??= [], pO(this, i);
		let a = i.nextId++;
		return this.handlers.push(r), i.handlerEntries.set(a, {
			handler: r,
			index: this.handlers.length - 1
		}), i.handlersLength = this.handlers.length, a;
	}
	eject(e) {
		let t = this[lO];
		pO(this, t);
		let n = fO(e), r = t.handlerEntries.get(n);
		if (r) {
			if (t.handlerEntries.delete(n), this.handlers[r.index] !== r.handler) return;
			this.handlers[r.index] = null, t.iterationDepth || (dO(this.handlers), t.handlersLength = this.handlers.length);
		}
	}
	clear() {
		this.handlers && (this.handlers = [], pO(this, this[lO]));
	}
	forEach(e) {
		let t = this[lO];
		pO(this, t), t.iterationDepth++;
		try {
			Q.forEach(this.handlers, function(t) {
				t !== null && e(t);
			});
		} finally {
			--t.iterationDepth || (pO(this, t), dO(this.handlers), t.handlersLength = uO(this.handlers));
		}
	}
}, hO = {
	silentJSONParsing: !0,
	forcedJSONParsing: !0,
	clarifyTimeoutError: !1,
	legacyInterceptorReqResOrdering: !0,
	advertiseZstdAcceptEncoding: !1,
	validateStatusUndefinedResolves: !0,
	encodeBasicAuthUsername: !1
}, gO = {
	isBrowser: !0,
	classes: {
		URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : aO,
		FormData: typeof FormData < "u" ? FormData : null,
		Blob: typeof Blob < "u" ? Blob : null
	},
	protocols: [
		"http",
		"https",
		"file",
		"blob",
		"url",
		"data"
	]
}, _O = /* @__PURE__ */ e({
	hasBrowserEnv: () => vO,
	hasStandardBrowserEnv: () => bO,
	hasStandardBrowserWebWorkerEnv: () => xO,
	navigator: () => yO,
	origin: () => SO
}), vO = typeof window < "u" && typeof document < "u", yO = typeof navigator == "object" && navigator || void 0, bO = vO && (!yO || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(yO.product) < 0), xO = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", SO = vO && window.location.href || "http://localhost", CO = {
	..._O,
	...gO
};
// node_modules/axios/lib/helpers/toURLEncodedForm.js
function wO(e, t) {
	return rO(e, new CO.classes.URLSearchParams(), {
		visitor: function(e, t, n, r) {
			return CO.isNode && Q.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
		},
		...t
	});
}
// node_modules/axios/lib/helpers/formDataToJSON.js
var TO = 100;
function EO(e) {
	if (e > TO) throw new $("FormData field is too deeply nested (" + e + " levels). Max depth: " + TO, $.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
function DO(e) {
	let t = [], n = /[^.[\]]+|\[([^.[\]]*)]/g, r;
	for (; (r = n.exec(e)) !== null;) EO(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]);
	return t;
}
function OO(e) {
	let t = {}, n = Object.keys(e), r, i = n.length, a;
	for (r = 0; r < i; r++) a = n[r], t[a] = e[a];
	return t;
}
function kO(e) {
	if (!Q.isArray(e)) return e;
	let t = Object.keys(e);
	return t.length !== e.length || t.some((e, t) => e !== String(t)) ? OO(e) : e;
}
function AO(e) {
	let t = [e];
	for (; t.length;) {
		let e = t.pop();
		Object.keys(e).forEach((n) => {
			let r = e[n] = kO(e[n]);
			(Q.isArray(r) || Q.isPlainObject(r)) && t.push(r);
		});
	}
	return e;
}
function jO(e) {
	function t(e, n, r, i) {
		EO(i);
		let a = e[i++];
		if (a === "__proto__") return !0;
		let o = Number.isFinite(+a), s = i >= e.length;
		return a = !a && Q.isArray(r) ? r.length : a, s ? (Q.hasOwnProp(r, a) ? (r[a] = kO(r[a]), r[a] = Q.isArray(r[a]) ? r[a].concat(n) : [r[a], n]) : r[a] = n, !o) : (Q.hasOwnProp(r, a) && Q.isObject(r[a]) || (r[a] = []), t(e, n, r[a], i) && Q.isArray(r[a]) && (r[a] = OO(r[a])), !o);
	}
	if (Q.isFormData(e) && Q.isFunction(e.entries)) {
		let n = {};
		return Q.forEachEntry(e, (e, r) => {
			t(DO(e), r, n, 0);
		}), AO(n);
	}
	return null;
}
// node_modules/axios/lib/core/methodList.js
var MO = Object.freeze([
	"get",
	"delete",
	"head",
	"options",
	"post",
	"put",
	"patch",
	"purge",
	"link",
	"unlink",
	"query"
]), NO = (e, t) => e != null && Q.hasOwnProp(e, t) ? e[t] : void 0;
function PO(e, t, n) {
	if (Q.isString(e)) try {
		return (t || JSON.parse)(e), Q.trim(e);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (n || JSON.stringify)(e);
}
var FO = {
	transitional: hO,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function(e, t) {
		let n = t.getContentType() || "", r = n.indexOf("application/json") > -1, i = Q.isObject(e);
		if (i && Q.isHTMLForm(e) && (e = new FormData(e)), Q.isFormData(e)) return r ? JSON.stringify(jO(e)) : e;
		if (Q.isArrayBuffer(e) || Q.isBuffer(e) || Q.isStream(e) || Q.isFile(e) || Q.isBlob(e) || Q.isReadableStream(e)) return e;
		if (Q.isArrayBufferView(e)) return e.buffer;
		if (Q.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
		let a;
		if (i) {
			let t = NO(this, "formSerializer");
			if (n.indexOf("application/x-www-form-urlencoded") > -1) return wO(e, t).toString();
			if ((a = Q.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
				let n = NO(this, "env"), r = n && n.FormData;
				return rO(a ? { "files[]": e } : e, r && new r(), t);
			}
		}
		return i || r ? (t.setContentType("application/json", !1), PO(e)) : e;
	}],
	transformResponse: [function(e) {
		let t = NO(this, "transitional") || FO.transitional, n = t && t.forcedJSONParsing, r = NO(this, "responseType"), i = r === "json";
		if (Q.isResponse(e) || Q.isReadableStream(e)) return e;
		if (e && Q.isString(e) && (n && !r || i)) {
			let n = !(t && t.silentJSONParsing) && i;
			try {
				return JSON.parse(e, NO(this, "parseReviver"));
			} catch (e) {
				if (n) throw e.name === "SyntaxError" ? $.from(e, $.ERR_BAD_RESPONSE, this, null, NO(this, "response")) : e;
			}
		}
		return e;
	}],
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: CO.classes.FormData,
		Blob: CO.classes.Blob
	},
	validateStatus: function(e) {
		return e >= 200 && e < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
Q.forEach(MO, (e) => {
	FO.headers[e] = {};
});
// node_modules/axios/lib/core/transformData.js
function IO(e, t) {
	let n = this || FO, r = t || n, i = HD.from(r.headers), a = r.data;
	return Q.forEach(e, function(e) {
		a = e.call(n, a, i.normalize(), t ? t.status : void 0);
	}), i.normalize(), a;
}
// node_modules/axios/lib/cancel/isCancel.js
function LO(e) {
	return !!(e && e.__CANCEL__);
}
// node_modules/axios/lib/cancel/CanceledError.js
var RO = class extends $ {
	constructor(e, t, n) {
		super(e ?? "canceled", $.ERR_CANCELED, t, n), this.name = "CanceledError", this.__CANCEL__ = !0;
	}
};
// node_modules/axios/lib/core/settle.js
function zO(e, t, n) {
	let r = n.config.validateStatus;
	!n.status || !r || r(n.status) ? e(n) : t(new $("Request failed with status code " + n.status, n.status >= 400 && n.status < 500 ? $.ERR_BAD_REQUEST : $.ERR_BAD_RESPONSE, n.config, n.request, n));
}
// node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js
var BO = /[\t\n\r]/g;
function VO(e) {
	if (typeof e != "string") return e;
	let t = 0;
	for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
	return e.slice(t).replace(BO, "");
}
// node_modules/axios/lib/helpers/parseProtocol.js
function HO(e) {
	let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
	return t && t[1].toLowerCase() || "";
}
// node_modules/axios/lib/helpers/cookies.js
var UO = (e) => {
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, WO = CO.hasStandardBrowserEnv ? {
	write(e, t, n, r, i, a, o) {
		if (typeof document > "u") return;
		let s = [`${e}=${encodeURIComponent(t)}`];
		Q.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), Q.isString(r) && s.push(`path=${r}`), Q.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), Q.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
	},
	read(e) {
		if (typeof document > "u") return null;
		let t = document.cookie;
		if (!t) return null;
		let n = t.split(";");
		for (let t = 0; t < n.length; t++) {
			let r = n[t].replace(/^\s+/, ""), i = r.indexOf("=");
			if (i !== -1 && r.slice(0, i) === e) return UO(r.slice(i + 1));
		}
		return null;
	},
	async readAsync(e) {
		try {
			let t = typeof window < "u" && window.cookieStore;
			if (t && Q.isFunction(t.get)) {
				let n = await t.get(e);
				return n ? UO(n.value) : null;
			}
		} catch {}
		return this.read(e);
	},
	remove(e) {
		this.write(e, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	async readAsync() {
		return null;
	},
	remove() {}
};
// node_modules/axios/lib/helpers/speedometer.js
function GO(e, t) {
	e ||= 10;
	let n = Array(e), r = Array(e), i = 0, a = 0, o;
	return t = t === void 0 ? 1e3 : t, function(s) {
		let c = Date.now(), l = r[a];
		o ||= c, n[i] = s, r[i] = c;
		let u = a, d = 0;
		for (; u !== i;) d += n[u++], u %= e;
		if (i = (i + 1) % e, i === a && (a = (a + 1) % e), c - o < t) return;
		let f = l && c - l;
		return f ? Math.round(d * 1e3 / f) : void 0;
	};
}
// node_modules/axios/lib/helpers/throttle.js
function KO(e, t) {
	let n = 0, r = 1e3 / t, i, a, o = (t, r = Date.now()) => {
		n = r, i = null, a &&= (clearTimeout(a), null), e(...t);
	};
	return [
		(...e) => {
			let t = Date.now(), s = t - n;
			s >= r ? o(e, t) : (i = e, a ||= setTimeout(() => {
				a = null, o(i);
			}, r - s));
		},
		() => i && o(i),
		(...e) => o(e)
	];
}
// node_modules/axios/lib/helpers/progressEventReducer.js
var qO = (e, t, n = 3) => {
	let r = 0, i = GO(50, 250);
	return KO((n) => {
		if (!n || !Q.isNumber(n.loaded)) return;
		let a = n.loaded, o = n.lengthComputable ? n.total : void 0, s = Math.max(0, o == null ? a : Math.min(a, o)), c = Math.max(0, s - r), l = i(c);
		r = Math.max(r, s), e({
			loaded: s,
			total: o,
			progress: o ? s / o : void 0,
			bytes: c,
			rate: l || void 0,
			estimated: l && o ? (o - s) / l : void 0,
			event: n,
			lengthComputable: o != null,
			[t ? "download" : "upload"]: !0
		});
	}, n);
}, JO = (e, t) => {
	let n = e != null;
	return [(r) => t[0]({
		lengthComputable: n,
		total: e,
		loaded: r
	}), t[1]];
}, YO = (e, t = Q.asap) => (...n) => t(() => e(...n)), XO = CO.hasStandardBrowserEnv ? ((e) => (t) => (t = new URL(t, document.baseURI || CO.origin), e.protocol === t.protocol && e.host === t.host && e.port === t.port))(new URL(CO.origin)) : () => !0;
// node_modules/axios/lib/helpers/isAbsoluteURL.js
function ZO(e) {
	return typeof e == "string" && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
// node_modules/axios/lib/helpers/combineURLs.js
function QO(e, t) {
	if (!t) return e;
	let n = e.length;
	for (; n > 0 && e.charCodeAt(n - 1) === 47;) n--;
	return e.slice(0, n) + "/" + t.replace(/^\/+/, "");
}
// node_modules/axios/lib/core/buildFullPath.js
var $O = /^https?:(?!\/\/)/i;
function ek(e) {
	return e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (e, t, n = "") => `${t}${n}${UD}`);
}
function tk(e) {
	let t = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${UD}@`), n = t.indexOf("#"), r = (n === -1 ? t : t.slice(0, n)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${UD}`);
	return n === -1 ? r : `${r}#${ek(t.slice(n + 1))}`;
}
function nk(e, t) {
	if (typeof e == "string") {
		let n = VO(e);
		if ($O.test(n)) throw new $(`Invalid URL ${JSON.stringify(tk(n))}: missing "//" after protocol`, $.ERR_INVALID_URL, t);
	}
}
function rk(e, t, n, r) {
	nk(t, r);
	let i = !ZO(t);
	return e && (i || n === !1) ? (nk(e, r), QO(e, t)) : t;
}
// node_modules/axios/lib/core/assertParamsAcyclic.js
function ik(e) {
	let t = [{ value: e }], n = /* @__PURE__ */ new WeakSet(), r = /* @__PURE__ */ new WeakSet();
	for (; t.length;) {
		let { value: e, done: i } = t.pop();
		if (!Q.isPlainObject(e) && !Q.isArray(e)) continue;
		if (i) {
			n.delete(e);
			continue;
		}
		if (n.has(e)) throw new $("Circular reference detected in params", $.ERR_BAD_OPTION_VALUE);
		if (r.has(e)) continue;
		r.add(e), n.add(e), t.push({
			value: e,
			done: !0
		});
		let a = Object.keys(e);
		Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor && Object.getOwnPropertySymbols(e).forEach((t) => {
			let n = Object.getOwnPropertyDescriptor(e, t);
			n && n.enumerable && a.push(t);
		}), a.forEach((n) => {
			if (n === "__proto__" || n === "constructor" || n === "prototype") {
				let r = Object.getOwnPropertyDescriptor(e, n);
				r && Q.hasOwnProp(r, "value") && t.push({ value: r.value });
			} else t.push({ value: e[n] });
		});
	}
}
// node_modules/axios/lib/core/mergeConfig.js
var ak = (e) => e instanceof HD ? { ...e } : e, ok = (e) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e).concat(Object.getOwnPropertySymbols(e).filter((t) => {
	let n = Object.getOwnPropertyDescriptor(e, t);
	return n && n.enumerable;
})) : Object.keys(e);
function sk(e, t) {
	let n = [], r = /* @__PURE__ */ new WeakMap(), i = {};
	function a(e, t) {
		if (!Q.isPlainObject(t)) return Q.isArray(t) ? t.slice() : t;
		let a = Q.isPlainObject(e) ? e : i, o = r.get(t);
		if (o || (o = /* @__PURE__ */ new WeakMap(), r.set(t, o)), o.has(a)) return o.get(a);
		let s = {};
		return o.set(a, s), n.push({
			base: a,
			source: t,
			result: s
		}), s;
	}
	let o = Q.isUndefined(t) ? a(void 0, e) : a(e, t);
	for (; n.length;) {
		let { base: e, source: t, result: r } = n.pop(), i = new Set(ok(e)), o = new Set(ok(t));
		(/* @__PURE__ */ new Set([...i, ...o])).forEach((n) => {
			if (n === "__proto__" || n === "constructor" || n === "prototype") return;
			let s = o.has(n), c = s ? t[n] : void 0, l = (!s || Q.isPlainObject(c)) && i.has(n) ? e[n] : void 0;
			r[n] = s ? a(l, c) : a(void 0, l);
		});
	}
	return ik(o), o;
}
function ck(e, t, n, r) {
	return Q.isPlainObject(e) && Q.isPlainObject(t) ? Q.merge.call({ caseless: r }, e, t) : Q.isPlainObject(t) ? Q.merge({}, t) : Q.isArray(t) ? t.slice() : t;
}
function lk(e, t, n, r) {
	if (!Q.isUndefined(t)) return ck(e, t, n, r);
	if (!Q.isUndefined(e)) return ck(void 0, e, n, r);
}
function uk(e, t) {
	if (!Q.isUndefined(t)) return ck(void 0, t);
}
function dk(e, t) {
	if (!Q.isUndefined(t)) return ck(void 0, t);
	if (!Q.isUndefined(e)) return ck(void 0, e);
}
function fk(e, t, n) {
	let r = Q.hasOwnProp(t, "transitional") ? t.transitional : void 0;
	if (!Q.isUndefined(r)) {
		if (Q.isPlainObject(r)) {
			if (Q.hasOwnProp(r, n)) return r[n];
		} else return;
	}
	let i = Q.hasOwnProp(e, "transitional") ? e.transitional : void 0;
	if (Q.isPlainObject(i) && Q.hasOwnProp(i, n)) return i[n];
}
function pk(e, t, n, r, i) {
	if (Q.hasOwnProp(i, n)) return ck(e, t);
	if (Q.hasOwnProp(r, n)) return ck(void 0, e);
}
function mk(e, t, n) {
	return lk(ak(e), ak(t), n, !0);
}
var hk = Object.freeze({
	__proto__: null,
	value: Object.prototype.hasOwnProperty,
	enumerable: !1,
	writable: !0,
	configurable: !0
}), gk = {
	url: uk,
	method: uk,
	data: uk,
	baseURL: dk,
	transformRequest: dk,
	transformResponse: dk,
	params: sk,
	paramsSerializer: dk,
	timeout: dk,
	timeoutErrorMessage: dk,
	withCredentials: dk,
	withXSRFToken: dk,
	adapter: dk,
	responseType: dk,
	xsrfCookieName: dk,
	xsrfHeaderName: dk,
	onUploadProgress: dk,
	onDownloadProgress: dk,
	decompress: dk,
	maxContentLength: dk,
	maxBodyLength: dk,
	beforeRedirect: dk,
	transport: dk,
	httpAgent: dk,
	httpsAgent: dk,
	cancelToken: dk,
	socketPath: dk,
	allowedSocketPaths: dk,
	responseEncoding: dk,
	validateStatus: pk,
	headers: mk
};
function _k(e, t) {
	e ||= {}, t ||= {};
	let n = Object.create(null);
	Object.defineProperty(n, "hasOwnProperty", hk);
	let r = ok({
		...e,
		...t
	});
	for (let i = 0, a = r.length; i < a; i++) {
		let a = r[i];
		if (a === "__proto__" || a === "constructor" || a === "prototype") continue;
		let o = Q.hasOwnProp(gk, a) ? gk[a] : lk, s = Q.hasOwnProp(e, a) ? e[a] : void 0, c = Q.hasOwnProp(t, a) ? t[a] : void 0, l = o === pk ? o(s, c, a, e, t) : o(s, c, a);
		Q.isUndefined(l) && o !== pk || (n[a] = l);
	}
	return Q.hasOwnProp(t, "validateStatus") && Q.isUndefined(t.validateStatus) && fk(e, t, "validateStatusUndefinedResolves") === !1 && (Q.hasOwnProp(e, "validateStatus") ? n.validateStatus = ck(void 0, e.validateStatus) : delete n.validateStatus), n;
}
// node_modules/axios/lib/core/setFormDataHeaders.js
var vk = ["content-type", "content-length"];
function yk(e, t, n) {
	n === "content-only" ? Object.entries(t || {}).forEach(([t, n]) => {
		vk.includes(t.toLowerCase()) && e.set(t, n);
	}) : e.set(t);
}
// node_modules/axios/lib/helpers/resolveConfig.js
var bk = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), xk = (e) => WO.read(e);
function Sk(e, t = xk) {
	let n = _k({}, e), r = (e) => Q.hasOwnProp(n, e) ? n[e] : void 0, i = r("data"), a = r("withXSRFToken"), o = r("xsrfHeaderName"), s = r("xsrfCookieName"), c = r("headers"), l = r("auth"), u = r("baseURL"), d = r("allowAbsoluteUrls"), f = r("url");
	if (n.headers = c = HD.from(c), n.url = cO(rk(u, f, d, n), r("params"), r("paramsSerializer")), l) {
		let t = Q.getSafeProp(l, "username") || "", n = Q.getSafeProp(l, "password") || "", i = r("transitional"), a = i && Q.hasOwnProp(i, "encodeBasicAuthUsername") && i.encodeBasicAuthUsername === !0;
		try {
			c.set("Authorization", "Basic " + btoa((a ? bk(t) : t) + ":" + (n ? bk(n) : "")));
		} catch (t) {
			throw $.from(t, $.ERR_BAD_OPTION_VALUE, e);
		}
	}
	if (Q.isFormData(i)) {
		let e = Q.getSafeProp(i, "getHeaders");
		CO.hasStandardBrowserEnv || CO.hasStandardBrowserWebWorkerEnv || Q.isReactNative(i) ? c.setContentType(void 0) : Q.isFunction(e) && yk(c, e.call(i), r("formDataHeaderPolicy"));
	}
	if (CO.hasStandardBrowserEnv && (Q.isFunction(a) && (a = a(n)), a === !0 || a == null && XO(n.url))) {
		let e = o && s && t(s);
		e && c.set(o, e);
	}
	return n;
}
var Ck = typeof XMLHttpRequest < "u" && function(e) {
	return new Promise(function(t, n) {
		let r;
		try {
			let e = CO.hasStandardBrowserEnv && typeof window < "u" && window.cookieStore;
			r = e && Q.isFunction(e.get);
		} catch {}
		let i, a = Sk(e, r ? (e) => (i = e, null) : void 0), o = a.data, s = HD.from(a.headers).normalize(), { responseType: c, onUploadProgress: l, onDownloadProgress: u } = a, d, f, p, m, h, g, _;
		function v() {
			clearTimeout(f);
			try {
				h && h();
			} catch (e) {
				setTimeout(() => {
					throw e;
				});
			}
			try {
				g && g();
			} catch (e) {
				setTimeout(() => {
					throw e;
				});
			}
			y && (m && y.removeEventListener("progress", m), y.upload && (p && y.upload.removeEventListener("progress", p), h && y.upload.removeEventListener("loadend", h))), a.cancelToken && a.cancelToken.unsubscribe(d), a.signal && a.signal.removeEventListener("abort", d);
		}
		let y = new XMLHttpRequest();
		y.open(a.method.toUpperCase(), a.url, !0), y.timeout = a.timeout;
		function b(r) {
			if (!y) return;
			if (y.status === 0 && (HO(VO(a.url)) || HO(CO.origin)) !== "file" && !(y.responseURL && y.responseURL.startsWith("file:"))) {
				n(new $("Request aborted", $.ECONNABORTED, e, y)), v(), y = null;
				return;
			}
			try {
				r ? _ && _(r) : g && g();
			} catch (e) {
				setTimeout(() => {
					throw e;
				});
			}
			if (!y) return;
			let i = HD.from("getAllResponseHeaders" in y && y.getAllResponseHeaders());
			zO(function(e) {
				t(e), v();
			}, function(e) {
				n(e), v();
			}, {
				data: !c || c === "text" || c === "json" ? y.responseText : y.response,
				status: y.status,
				statusText: y.statusText,
				headers: i,
				config: e,
				request: y
			}), y = null;
		}
		if ("onloadend" in y ? y.onloadend = b : y.onreadystatechange = function() {
			y && y.readyState === 4 && (y.status !== 0 || y.responseURL && y.responseURL.startsWith("file:")) && setTimeout(b);
		}, y.onabort = function() {
			y &&= (n(new $("Request aborted", $.ECONNABORTED, e, y)), v(), null);
		}, y.onerror = function(t) {
			let r = new $(t && t.message ? t.message : "Network Error", $.ERR_NETWORK, e, y);
			r.event = t || null, n(r), v(), y = null;
		}, y.ontimeout = function() {
			if (!y) return;
			let t = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded", r = a.transitional || hO;
			a.timeoutErrorMessage && (t = a.timeoutErrorMessage), n(new $(t, r.clarifyTimeoutError ? $.ETIMEDOUT : $.ECONNABORTED, e, y)), v(), y = null;
		}, o === void 0 && s.setContentType(null), Q.isUndefined(a.withCredentials) || (y.withCredentials = !!a.withCredentials), c && c !== "json" && (y.responseType = a.responseType), u && ([m, g, _] = qO(u, !0), y.addEventListener("progress", m)), l && y.upload && ([p, h] = qO(l), y.upload.addEventListener("progress", p), y.upload.addEventListener("loadend", h)), a.cancelToken || a.signal) {
			if (d = (t) => {
				if (!y) return;
				n(!t || t.type ? new RO(null, e, y) : t);
				let r = y;
				v(), y = null, r.abort();
			}, a.cancelToken && a.cancelToken.subscribe(d), !y) return;
			a.signal && (a.signal.aborted ? d() : a.signal.addEventListener("abort", d));
		}
		if (!y) return;
		let x = HO(a.url);
		if (x && !CO.protocols.includes(x)) {
			n(new $("Unsupported protocol " + x + ":", $.ERR_BAD_REQUEST, e)), v();
			return;
		}
		let S = () => {
			y && ("setRequestHeader" in y && Q.forEach(DD(s), function(e, t) {
				y.setRequestHeader(t, e);
			}), y.send(o || null));
		};
		if (i) {
			let t = typeof performance < "u" && Q.isFunction(performance.now) ? () => performance.now() : Date.now, r = y.timeout > 0 ? t() + Number(y.timeout) : void 0, o = () => {
				if (!y) return;
				let e = y;
				e.ontimeout(), e.abort();
			};
			if (r !== void 0) {
				let e = () => {
					let n = r - t();
					n > 0 ? f = setTimeout(e, Math.min(n, 2147483647)) : o();
				};
				e();
			}
			WO.readAsync(i).then((e) => {
				if (y) {
					if (r !== void 0 && t() >= r) o();
					else {
						if (e) {
							let t = Q.hasOwnProp(a, "xsrfHeaderName") && a.xsrfHeaderName;
							s.set(t, e);
						}
						S();
					}
				}
			}).catch((t) => {
				y &&= (n($.from(t, null, e, y)), v(), null);
			});
		} else S();
	});
}, wk = (e, t) => {
	if (e = e ? e.filter(Boolean) : [], !t && !e.length) return;
	let n = new AbortController(), r = !1, i = function(e) {
		if (!r) {
			r = !0, o();
			let t = e instanceof Error ? e : this.reason;
			n.abort(t instanceof $ ? t : new RO(t instanceof Error ? t.message : t));
		}
	}, a = t && setTimeout(() => {
		a = null, i(new $(`timeout of ${t}ms exceeded`, $.ETIMEDOUT));
	}, t), o = () => {
		e &&= (a && clearTimeout(a), a = null, e.forEach((e) => {
			let t = Q.getSafeProp(e, "unsubscribe");
			Q.isFunction(t) ? t.call(e, i) : e.removeEventListener("abort", i);
		}), null);
	};
	e.forEach((e) => {
		r || (e.aborted ? i.call(e) : e.addEventListener("abort", i, { once: !0 }));
	});
	let { signal: s } = n;
	return s.unsubscribe = () => Q.asap(o), s;
}, Tk = function* (e, t) {
	let n = e.byteLength;
	if (!t || n < t) {
		yield e;
		return;
	}
	let r = 0, i;
	for (; r < n;) i = r + t, yield e.slice(r, i), r = i;
}, Ek = async function* (e, t) {
	for await (let n of Dk(e)) yield* Tk(n, t);
}, Dk = async function* (e) {
	if (e[Symbol.asyncIterator]) {
		yield* e;
		return;
	}
	let t = e.getReader();
	try {
		for (;;) {
			let { done: e, value: n } = await t.read();
			if (e) break;
			yield n;
		}
	} finally {
		await t.cancel();
	}
}, Ok = (e, t, n, r) => {
	let i = Ek(e, t), a = 0, o, s = (e) => {
		o || (o = !0, r && r(e));
	};
	return new ReadableStream({
		async pull(e) {
			try {
				let { done: t, value: r } = await i.next();
				if (t) {
					s(), e.close();
					return;
				}
				let o = r.byteLength;
				n && n(a += o), e.enqueue(new Uint8Array(r));
			} catch (e) {
				throw s(e), e;
			}
		},
		cancel(e) {
			return s(e), i.return();
		}
	}, { highWaterMark: 2 });
}, kk = "\r\n", Ak = (e) => String(e).replace(/\r\n|\r|\n/g, kk), jk = (e) => String(e).replace(/[\r\n"]/g, (e) => e === "\r" ? "%0D" : e === "\n" ? "%0A" : "%22"), Mk = (e, t) => {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e.charCodeAt(r);
		t && (i === 13 || i === 10) ? (i === 13 && e.charCodeAt(r + 1) === 10 && r++, n += 2) : i < 128 ? n++ : i < 2048 ? n += 2 : i >= 55296 && i <= 56319 && e.charCodeAt(r + 1) >= 56320 && e.charCodeAt(r + 1) <= 57343 ? (n += 4, r++) : n += 3;
	}
	return n;
}, Nk = class extends TypeError {
	constructor(e, t) {
		super(e), this.name = "FormDataError", this.reason = t;
	}
};
function Pk(e, t, n, r, i) {
	if (!Q.isFunction(t)) throw new Nk("Blob is not supported", "blob");
	if (!Q.isString(i) || !/^[A-Za-z0-9'()+_,./:=? -]{1,70}$/.test(i) || / $/.test(i)) throw new Nk("Invalid multipart boundary", "boundary");
	let a = "--" + i + "--\r\n", o = a.length, s = [], c = (e) => {
		if (o + e > n) throw r();
	};
	c(0);
	for (let [t, n] of e) {
		let e = Q.isString(n), r = e ? Mk(n, !0) : n.size;
		if (!Number.isFinite(r) || r < 0) throw new Nk("Unsupported FormData part size", "part");
		c(r + Mk(t, !0) + (!e && n.name ? Mk(n.name, !1) : 0) + (!e && n.type ? Mk(n.type, !1) : 0));
		let a = "--" + i + "\r\nContent-Disposition: form-data; name=\"" + jk(Ak(t)) + "\"";
		e || (a += "; filename=\"" + jk(Q.isString(n.name) ? n.name : "blob") + "\"\r\nContent-Type: " + String(n.type || "application/octet-stream").replace(/[\r\n]/g, "")), a += "\r\n\r\n";
		let l = Mk(a, !1) + r + 2;
		c(l), o += l, s.push({
			header: a,
			value: n,
			isString: e
		});
	}
	let l = [];
	for (let e of s) l.push(e.header, e.isString ? Ak(e.value) : e.value, kk);
	return l.push(a), new t(l, { type: "multipart/form-data; boundary=" + i });
}
// node_modules/axios/lib/core/createMultipartBody.js
function Fk(e, t, n, r, i) {
	if (!Q.isFunction(t)) throw new $("Blob is not supported", $.ERR_NOT_SUPPORT);
	if (i === void 0) {
		if (Q.isFunction(CO.generateString)) i = "axios-" + CO.generateString(36, "0123456789abcdef");
		else {
			let e = Q.global.crypto;
			if (!e || !Q.isFunction(e.getRandomValues)) throw new $("Random byte generation is not supported", $.ERR_NOT_SUPPORT);
			let t = /* @__PURE__ */ new Uint8Array(18);
			e.getRandomValues(t), i = "axios-" + Array.from(t, (e) => ("0" + e.toString(16)).slice(-2)).join("");
		}
	}
	try {
		return Pk(e, t, n, r, i);
	} catch (e) {
		if (e instanceof Nk) {
			let t = e.reason === "boundary" ? $.ERR_BAD_OPTION_VALUE : $.ERR_BAD_REQUEST;
			throw new $(e.message, t);
		}
		throw e;
	}
}
// node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
var Ik = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, Lk = (e, t, n) => t + 2 < n && Ik(e.charCodeAt(t + 1)) && Ik(e.charCodeAt(t + 2)), Rk = (e) => e <= 57 ? e - 48 : (e & 223) - 55, zk = (e) => e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 43 || e === 47 || e === 45 || e === 95, Bk = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32, Vk = (e) => {
	let t = Math.floor(e / 4), n = e % 4;
	return t * 3 + (n === 2 ? 1 : n === 3 ? 2 : 0);
}, Hk = (e) => {
	let t = e.length, n = 0;
	return t > 0 && e.charCodeAt(t - 1) === 61 && (n++, t > 1 && e.charCodeAt(t - 2) === 61 && n++), Math.floor((t - n) * 3 / 4);
}, Uk = (e) => {
	let t = e.length, n = 0, r = 0, i = !1;
	for (let a = 0; a < t; a++) {
		let o = e.charCodeAt(a);
		o === 37 && Lk(e, a, t) && (o = Rk(e.charCodeAt(a + 1)) * 16 + Rk(e.charCodeAt(a + 2)), a += 2), Bk(o) || (o === 61 ? r++ : !zk(o) || r > 0 ? i = !0 : n++);
	}
	return i || r > 2 || r > 0 && (n + r) % 4 != 0 || n % 4 == 1 ? Hk(e) : Vk(n);
}, Wk = (e, t, n) => {
	if (!e || typeof e != "string" || !/^data:/i.test(e)) return 0;
	let r = e.indexOf(",");
	if (r < 0) return 0;
	let i = e.slice(5, r), a = e.slice(r + 1);
	if (n.test(i)) return t(a);
	let o = 0;
	for (let e = 0, t = a.length; e < t; e++) {
		let n = a.charCodeAt(e);
		if (n === 37 && Lk(a, e, t)) o += 1, e += 2;
		else if (n < 128) o += 1;
		else if (n < 2048) o += 2;
		else if (n >= 55296 && n <= 56319 && e + 1 < t) {
			let t = a.charCodeAt(e + 1);
			t >= 56320 && t <= 57343 ? (o += 4, e++) : o += 3;
		} else o += 3;
	}
	return o;
};
function Gk(e) {
	let t = typeof e == "string" ? e.indexOf("#") : -1;
	return Wk(t === -1 ? e : e.slice(0, t), Uk, /; *base64[\t\n\f\r ]*$/i);
}
// node_modules/axios/lib/env/data.js
var Kk = "1.21.1", qk = 65536, Jk = {
	cache: "default",
	redirect: "follow",
	referrer: "about:client",
	referrerPolicy: "",
	mode: "cors",
	integrity: "",
	keepalive: !1,
	priority: "auto",
	window: null
}, { isFunction: Yk } = Q, Xk = (e) => encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) => String.fromCharCode(parseInt(t, 16))), Zk = (e) => {
	if (!Q.isString(e)) return e;
	try {
		return decodeURIComponent(e);
	} catch {
		return e;
	}
}, Qk = (e, ...t) => {
	try {
		return !!e(...t);
	} catch {
		return !1;
	}
}, $k = (e) => {
	let t = e.indexOf("://"), n = e;
	return t !== -1 && (n = n.slice(t + 3)), n.includes("@") || n.includes(":");
}, eA = (e) => {
	let t = Q.global !== void 0 && Q.global !== null ? Q.global : globalThis, { ReadableStream: n, TextEncoder: r } = t;
	e = Q.merge.call({ skipUndefined: !0 }, {
		Request: t.Request,
		Response: t.Response,
		Blob: t.Blob
	}, e);
	let i = Q.hasOwnProp(e, "fetch") ? e.fetch : void 0, { Request: a, Response: o, Blob: s } = e, c = i ? Yk(i) : typeof fetch == "function", l = Yk(a), u = Yk(o);
	if (!c) return !1;
	let d = c && Yk(n), f = c && (typeof r == "function" ? ((e) => (t) => e.encode(t))(new r()) : async (e) => new Uint8Array(await new a(e).arrayBuffer())), p = l && d && Qk(() => {
		let e = !1, t = new a(CO.origin, {
			body: new n(),
			method: "POST",
			get duplex() {
				return e = !0, "half";
			}
		}), r = t.headers.has("Content-Type");
		return t.body != null && t.body.cancel(), e && !r;
	}), m = u && d && Qk(() => Q.isReadableStream(new o("").body)), h = Object.assign(Object.create(null), Jk);
	l && !Qk(() => new a(CO.origin, h)) && (delete h.cache, Qk(() => new a(CO.origin, h)) || (h.cache = Jk.cache));
	let g = { stream: m && ((e) => e.body) };
	c && [
		"text",
		"arrayBuffer",
		"blob",
		"formData",
		"stream"
	].forEach((e) => {
		!g[e] && (g[e] = (t, n) => {
			let r = t && t[e];
			if (r) return r.call(t);
			throw new $(`Response type '${e}' is not supported`, $.ERR_NOT_SUPPORT, n);
		});
	});
	let _ = async (e) => {
		if (e == null) return 0;
		if (Q.isBlob(e)) return e.size;
		if (Q.isArrayBufferView(e) || Q.isArrayBuffer(e)) return e.byteLength;
		if (Q.isURLSearchParams(e) && (e += ""), Q.isString(e)) return (await f(e)).byteLength;
	}, v = async (e, t) => Q.toFiniteNumber(e.getContentLength()) ?? _(t);
	return async (e) => {
		let { url: t, method: n, data: c, signal: u, cancelToken: f, timeout: y, onDownloadProgress: b, onUploadProgress: x, responseType: S, headers: C, withCredentials: w = "same-origin", fetchOptions: T, maxContentLength: E, maxBodyLength: D, maxRedirects: O } = Sk(e), k = Q.isNumber(E) && E > -1, ee = Q.isNumber(D) && D > -1, te = (t) => Q.hasOwnProp(e, t) ? e[t] : void 0, ne = i || fetch;
		S = S ? (S + "").toLowerCase() : "text";
		let A = wk([u, f && f.toAbortSignal()], y), re = null, j = A && A.unsubscribe && (() => {
			A.unsubscribe();
		}), ie, ae = null, M = null, oe = () => new $("Request body larger than maxBodyLength limit", $.ERR_BAD_REQUEST, e, re);
		try {
			let i, u = te("auth");
			u && (i = {
				username: Q.getSafeProp(u, "username") || "",
				password: Q.getSafeProp(u, "password") || ""
			});
			let f;
			if ($k(t) && (f = new URL(t, CO.origin), !i && (f.username || f.password) && (i = {
				username: Zk(f.username),
				password: Zk(f.password)
			}), (f.username || f.password) && (f.username = "", f.password = "", t = f.href)), i && (C.delete("authorization"), C.set("Authorization", "Basic " + btoa(Xk((i.username || "") + ":" + (i.password || ""))))), k && f && f.protocol === "data:" && Gk(f.href) > E) throw new $("maxContentLength size of " + E + " exceeded", $.ERR_BAD_RESPONSE, e, re);
			let y = Q.isSpecCompliantForm(c) && HD.from(te("headers")).getContentType(), se;
			if (Q.isString(y) && /^multipart\/form-data(?:\s*;|$)/i.test(y.trim())) {
				let e = HD.parseParameters(y);
				Q.hasOwnProp(e, "boundary") && (se = e.boundary);
			}
			if (Q.isSpecCompliantForm(c) && n !== "get" && n !== "head" && (ee || x && p || se !== void 0) && (c = Fk(c, s, ee ? D : Infinity, oe, se), C.setContentType(se === void 0 ? c.type : y), ie = c.size), ee && n !== "get" && n !== "head") {
				let e = await _(c);
				if (typeof e == "number" && isFinite(e) && (ie = e, e > D)) throw oe();
			}
			let ce = ee && (Q.isReadableStream(c) || Q.isStream(c)), le = (e, t, n) => Ok(e, qk, (e) => {
				if (ee && e > D) throw ae = oe();
				t && t(e);
			}, n);
			if (p && n !== "get" && n !== "head" && (x || ce)) {
				if (ie ??= await v(C, c), ie !== 0 || ce) {
					let e = new a(t, {
						method: "POST",
						body: c,
						duplex: "half"
					}), n;
					if (Q.isFormData(c) && (n = e.headers.get("content-type")) && C.setContentType(n), e.body) {
						let [t, n] = x && JO(ie, qO(YO(x))) || [];
						c = le(e.body, t, n);
					}
				}
			} else if (ce && !l && d && n !== "get" && n !== "head") c = le(c);
			else if (ce && l && !p && n !== "get" && n !== "head") throw new $("Stream request bodies are not supported by the current fetch implementation", $.ERR_NOT_SUPPORT, e, re);
			Q.isString(w) || (w = w ? "include" : "omit");
			let N = l && "credentials" in a.prototype;
			if (Q.isFormData(c)) {
				let e = C.getContentType();
				e && /^multipart\/form-data/i.test(e) && !/boundary=/i.test(e) && C.delete("content-type");
			}
			C.set("User-Agent", "axios/" + Kk, !1);
			let ue = T == null ? T : Object.assign(Object.create(null), T);
			ue && (delete ue.body, delete ue.headers, delete ue.method, delete ue.signal, delete ue.duplex, delete ue.credentials);
			let de = Object.assign(Object.create(null), ue, {
				signal: A,
				method: n.toUpperCase(),
				headers: DD(C.normalize()),
				body: c,
				duplex: "half",
				credentials: N ? w : void 0
			});
			l && (Q.forEach(h, (e, t) => {
				de[t] === void 0 && (de[t] = e);
			}), de.signal === void 0 && (de.signal = null), de.body === void 0 && (de.body = null)), O === 0 && (de.redirect = "manual", ue && (ue.redirect = "manual")), re = l && new a(t, de);
			let fe = await (l ? ne(re, ue) : ne(t, de)), pe = HD.from(fe.headers);
			if (k) {
				let t = Q.toFiniteNumber(pe.getContentLength());
				if (t != null && t > E) throw new $("maxContentLength size of " + E + " exceeded", $.ERR_BAD_RESPONSE, e, re);
			}
			let me = m && (S === "stream" || S === "response");
			if (m && fe.body && (b || k || me && j)) {
				let t = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((e) => {
					t[e] = fe[e];
				});
				let n = Q.toFiniteNumber(pe.getContentLength()), [r, i] = b && JO(n, qO(YO(b), !0)) || [], a = 0;
				fe = new o(Ok(fe.body, qk, (t) => {
					if (k && (a = t, a > E)) throw M = new $("maxContentLength size of " + E + " exceeded", $.ERR_BAD_RESPONSE, e, re);
					r && r(t);
				}, () => {
					i && i(), j && j();
				}), t);
			}
			S ||= "text";
			let he = await g[Q.findKey(g, S) || "text"](fe, e);
			if (k && !m && !me) {
				let t;
				if (he != null && (typeof he.byteLength == "number" ? t = he.byteLength : typeof he.size == "number" ? t = he.size : typeof he == "string" && (t = typeof r == "function" ? new r().encode(he).byteLength : he.length)), typeof t == "number" && t > E) throw new $("maxContentLength size of " + E + " exceeded", $.ERR_BAD_RESPONSE, e, re);
			}
			return !me && j && j(), await new Promise((t, n) => {
				zO(t, n, {
					data: he,
					headers: HD.from(fe.headers),
					status: fe.status,
					statusText: fe.statusText,
					config: e,
					request: re
				});
			});
		} catch (t) {
			if (j && j(), A && A.aborted && A.reason instanceof $) {
				let n = A.reason;
				throw n.config = e, re && (n.request = re), t !== n && Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			if (ae) throw re && !ae.request && (ae.request = re), ae;
			if (M) throw M;
			if (t instanceof $) throw re && !t.request && (t.request = re), t;
			if (t && t.name === "TypeError" && /Load failed|fetch/i.test(t.message)) {
				let n = new $("Network Error", $.ERR_NETWORK, e, re, t && t.response);
				throw Object.defineProperty(n, "cause", {
					__proto__: null,
					value: t.cause || t,
					writable: !0,
					enumerable: !1,
					configurable: !0
				}), n;
			}
			throw $.from(t, t && t.code, e, re, t && t.response);
		}
	};
}, tA = /* @__PURE__ */ new Map(), nA = (e) => {
	let t = Object.create(null), n = e && Q.hasOwnProp(e, "env") && e.env;
	[
		"fetch",
		"Request",
		"Response",
		"Blob"
	].forEach((e) => {
		n && Q.hasOwnProp(n, e) && (t[e] = n[e]);
	});
	let { fetch: r, Request: i, Response: a, Blob: o } = t, s = [
		i,
		a,
		r,
		o
	], c = s.length, l, u, d = tA;
	for (; c--;) l = s[c], u = d.get(l), u === void 0 && d.set(l, u = c ? /* @__PURE__ */ new Map() : eA(t)), d = u;
	return u;
};
nA();
// node_modules/axios/lib/adapters/adapters.js
var rA = {
	http: null,
	xhr: Ck,
	fetch: { get: nA }
};
Q.forEach(rA, (e, t) => {
	if (e) {
		try {
			Object.defineProperty(e, "name", {
				__proto__: null,
				value: t
			});
		} catch {}
		Object.defineProperty(e, "adapterName", {
			__proto__: null,
			value: t
		});
	}
});
var iA = (e) => `- ${e}`, aA = (e) => Q.isFunction(e) || e === null || e === !1;
function oA(e, t) {
	e = Q.isArray(e) ? e : [e];
	let { length: n } = e, r, i, a = {};
	for (let o = 0; o < n; o++) {
		r = e[o];
		let n;
		if (i = r, !aA(r) && (i = rA[(n = String(r)).toLowerCase()], i === void 0)) throw new $(`Unknown adapter '${n}'`);
		if (i && (Q.isFunction(i) || (i = i.get(t)))) break;
		a[n || "#" + o] = i;
	}
	if (!i) {
		let e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (t === !1 ? "is not supported by the environment" : "is not available in the build"));
		throw new $("There is no suitable adapter to dispatch the request " + (n ? e.length > 1 ? "since :\n" + e.map(iA).join("\n") : " " + iA(e[0]) : "as no adapter specified"), $.ERR_NOT_SUPPORT);
	}
	return i;
}
var sA = {
	getAdapter: oA,
	adapters: rA
};
// node_modules/axios/lib/core/dispatchRequest.js
function cA(e) {
	if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new RO(null, e);
}
function lA() {
	return typeof performance < "u" && Q.isFunction(performance.now) ? () => performance.now() : Date.now;
}
function uA(e, t) {
	return Math.max(0, Math.round(e() - t));
}
function dA(e) {
	let t = Q.toSafeFlatObject(e);
	cA(t), t.headers = HD.from(Q.getSafeProp(t, "headers")), t.data = IO.call(t, t.transformRequest), [
		"post",
		"put",
		"patch"
	].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1);
	let n = sA.getAdapter(t.adapter || FO.adapter, t), r = lA(), i = r();
	return n(t).then(function(e) {
		cA(t), e.duration = uA(r, i), t.response = e;
		try {
			e.data = IO.call(t, t.transformResponse, e);
		} finally {
			delete t.response;
		}
		return e.headers = HD.from(e.headers), e;
	}, function(e) {
		if (!LO(e) && (cA(t), e && e.response)) {
			e.response.duration = uA(r, i), t.response = e.response;
			try {
				e.response.data = IO.call(t, t.transformResponse, e.response);
			} finally {
				delete t.response;
			}
			e.response.headers = HD.from(e.response.headers);
		}
		return Promise.reject(e);
	});
}
// node_modules/axios/lib/helpers/validator.js
var fA = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((e, t) => {
	fA[e] = function(n) {
		return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
	};
});
var pA = {};
fA.transitional = function(e, t, n) {
	function r(e, t) {
		return "[Axios v" + Kk + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
	}
	return (n, i, a) => {
		if (e === !1) throw new $(r(i, " has been removed" + (t ? " in " + t : "")), $.ERR_DEPRECATED);
		return t && !pA[i] && (pA[i] = !0, console.warn(r(i, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, i, a);
	};
}, fA.spelling = function(e) {
	return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
};
function mA(e, t, n) {
	if (typeof e != "object" || !e) throw new $("options must be an object", $.ERR_BAD_OPTION_VALUE);
	let r = Object.keys(e), i = r.length;
	for (; i-- > 0;) {
		let a = r[i], o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
		if (o) {
			let t = e[a], n = t === void 0 || o(t, a, e);
			if (n !== !0) throw new $("option " + a + " must be " + n, $.ERR_BAD_OPTION_VALUE);
		} else if (n !== !0) throw new $("Unknown option " + a, $.ERR_BAD_OPTION);
	}
}
var hA = {
	assertOptions: mA,
	validators: fA
}, gA = hA.validators, _A = (e) => {
	if (e == null || Q.isPlainObject(e) || e instanceof HD) return !0;
	try {
		return Q.isObject(e) && Q.getSafeProp(e, Symbol.toStringTag) === "AxiosHeaders" && [
			"toJSON",
			"set",
			"get",
			"has",
			"delete",
			"clear",
			"normalize",
			"concat",
			"toString",
			Symbol.iterator
		].every((t) => Q.isFunction(Q.getSafeProp(e, t)));
	} catch {
		return !1;
	}
}, vA = class {
	constructor(e) {
		this.defaults = e || {}, this.interceptors = {
			request: new mO(),
			response: new mO()
		};
	}
	async request(e, t) {
		try {
			return await this._request(e, t);
		} catch (e) {
			if (e instanceof Error) try {
				let t = {};
				Error.captureStackTrace ? Error.captureStackTrace(t) : t = /* @__PURE__ */ Error();
				let n = t.stack, r = "";
				if (typeof n == "string") {
					let e = n.indexOf("\n");
					r = e === -1 ? "" : n.slice(e + 1);
				}
				if (!e.stack) e.stack = r;
				else if (r) {
					let t = r.indexOf("\n"), n = t === -1 ? -1 : r.indexOf("\n", t + 1), i = n === -1 ? r : r.slice(n + 1), a = String(e.stack), o = XD(e, a), s = o === -1 ? a : a.slice(0, o), c = o === -1 ? "" : a.slice(o);
					s.endsWith(i) || (e.stack = s + "\n" + r + c);
				}
			} catch {}
			throw e;
		}
	}
	_request(e, t) {
		typeof e == "string" ? (t ||= {}, t.url = e) : t = e || {}, t = _k(this.defaults, t);
		let { transitional: n, paramsSerializer: r, headers: i } = t;
		n !== void 0 && hA.assertOptions(n, {
			silentJSONParsing: gA.transitional(gA.boolean),
			forcedJSONParsing: gA.transitional(gA.boolean),
			clarifyTimeoutError: gA.transitional(gA.boolean),
			legacyInterceptorReqResOrdering: gA.transitional(gA.boolean),
			advertiseZstdAcceptEncoding: gA.transitional(gA.boolean),
			validateStatusUndefinedResolves: gA.transitional(gA.boolean),
			encodeBasicAuthUsername: gA.transitional(gA.boolean)
		}, !1), r != null && (Q.isFunction(r) ? t.paramsSerializer = { serialize: r } : hA.assertOptions(r, {
			encode: gA.function,
			serialize: gA.function
		}, !0)), t.allowAbsoluteUrls !== void 0 || (Q.hasOwnProp(this.defaults, "allowAbsoluteUrls") && this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), hA.assertOptions(t, {
			baseUrl: gA.spelling("baseURL"),
			withXsrfToken: gA.spelling("withXSRFToken")
		}, !0), t.method = (Q.getSafeProp(t, "method") || Q.getSafeProp(this.defaults, "method") || "get").toLowerCase();
		let a = Q.getSafeProp(i, "common"), o = Q.getSafeProp(i, t.method), s = i && Q.merge(_A(a) ? a : void 0, _A(o) ? o : void 0);
		i && Q.forEach(MO.concat("common"), (e) => {
			_A(Q.getSafeProp(i, e)) && delete i[e];
		}), t.headers = HD.concat(s, i);
		let c = [], l = !0;
		this.interceptors.request.forEach(function(e) {
			if (typeof e.runWhen == "function" && e.runWhen(t) === !1) return;
			l &&= e.synchronous;
			let n = t.transitional || hO;
			n && n.legacyInterceptorReqResOrdering ? c.unshift(e.fulfilled, e.rejected) : c.push(e.fulfilled, e.rejected);
		});
		let u = [];
		this.interceptors.response.forEach(function(e) {
			u.push(e.fulfilled, e.rejected);
		});
		let d, f = 0, p;
		if (!l) {
			let e = [dA.bind(this), void 0];
			for (e.unshift(...c), e.push(...u), p = e.length, d = Promise.resolve(t); f < p;) d = d.then(e[f++], e[f++]);
			return d;
		}
		p = c.length;
		let m = t;
		for (; f < p;) {
			let e = c[f++], t = c[f++];
			try {
				m = e ? e(m) : m;
			} catch (e) {
				if (!t) {
					d = Promise.reject(e);
					break;
				}
				try {
					let n = t.call(this, e);
					Q.isThenable(n) && (d = Promise.resolve(n).then(() => dA.call(this, m)));
				} catch (e) {
					d = Promise.reject(e);
				}
				break;
			}
		}
		if (!d) try {
			d = dA.call(this, m);
		} catch (e) {
			d = Promise.reject(e);
		}
		for (f = 0, p = u.length; f < p;) d = d.then(u[f++], u[f++]);
		return d;
	}
	getUri(e) {
		return e = _k(this.defaults, e), cO(rk(e.baseURL, e.url, e.allowAbsoluteUrls, e), e.params, e.paramsSerializer);
	}
};
Q.forEach([
	"delete",
	"get",
	"head",
	"options"
], function(e) {
	vA.prototype[e] = async function(t, n) {
		return this.request(_k(n || {}, {
			method: e,
			url: t,
			data: n && Q.hasOwnProp(n, "data") ? n.data : void 0
		}));
	};
}), Q.forEach([
	"post",
	"put",
	"patch",
	"query"
], function(e) {
	function t(t) {
		return async function(n, r, i) {
			return this.request(_k(i || {}, {
				method: e,
				headers: t ? { "Content-Type": "multipart/form-data" } : {},
				url: n,
				data: r
			}));
		};
	}
	vA.prototype[e] = t(), e !== "query" && (vA.prototype[e + "Form"] = t(!0));
});
// node_modules/axios/lib/cancel/CancelToken.js
var yA = class e {
	constructor(e) {
		if (typeof e != "function") throw TypeError("executor must be a function.");
		let t;
		this.promise = new Promise(function(e) {
			t = e;
		});
		let n = this;
		this.promise.then((e) => {
			if (!n._listeners) return;
			let t = n._listeners.length;
			for (; t-- > 0;) n._listeners[t](e);
			n._listeners = null;
		}), this.promise.then = (e) => {
			let t, r = new Promise((e) => {
				n.subscribe(e), t = e;
			}).then(e);
			return r.cancel = function() {
				n.unsubscribe(t);
			}, r;
		}, e(function(e, r, i) {
			n.reason || (n.reason = new RO(e, r, i), t(n.reason));
		});
	}
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	subscribe(e) {
		this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e];
	}
	unsubscribe(e) {
		if (!this._listeners) return;
		let t = this._listeners.indexOf(e);
		t !== -1 && this._listeners.splice(t, 1);
	}
	toAbortSignal() {
		let e = new AbortController(), t = (t) => {
			e.abort(t);
		};
		return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
	}
	static source() {
		let t;
		return {
			token: new e(function(e) {
				t = e;
			}),
			cancel: t
		};
	}
};
// node_modules/axios/lib/helpers/spread.js
function bA(e) {
	return function(t) {
		return e.apply(null, t);
	};
}
// node_modules/axios/lib/helpers/isAxiosError.js
function xA(e) {
	return Q.isObject(e) && e.isAxiosError === !0;
}
// node_modules/axios/lib/helpers/HttpStatusCode.js
var SA = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	PayloadTooLarge: 413,
	ContentTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	UnprocessableEntity: 422,
	UnprocessableContent: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerReturnsAnUnknownError: 520,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(SA).forEach(([e, t]) => {
	SA[t] === void 0 && (SA[t] = e);
});
// node_modules/axios/lib/axios.js
function CA(e) {
	let t = new vA(e), n = QT(vA.prototype.request, t);
	return Q.extend(n, vA.prototype, t, { allOwnKeys: !0 }), Q.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(t) {
		return CA(_k(e, t));
	}, n;
}
var wA = CA(FO);
wA.Axios = vA, wA.CanceledError = RO, wA.CancelToken = yA, wA.isCancel = LO, wA.VERSION = Kk, wA.toFormData = rO, wA.AxiosError = $, wA.Cancel = wA.CanceledError, wA.all = function(e) {
	return Promise.all(e);
}, wA.spread = bA, wA.isAxiosError = xA, wA.mergeConfig = _k, wA.AxiosHeaders = HD, wA.formToJSON = (e) => jO(Q.isHTMLForm(e) ? new FormData(e) : e), wA.getAdapter = sA.getAdapter, wA.HttpStatusCode = SA, wA.default = wA;
// node_modules/axios/index.js
var { Axios: TA, AxiosError: EA, CanceledError: DA, isCancel: OA, CancelToken: kA, VERSION: AA, all: jA, Cancel: MA, isAxiosError: NA, spread: PA, toFormData: FA, AxiosHeaders: IA, HttpStatusCode: LA, formToJSON: RA, getAdapter: zA, mergeConfig: BA, create: VA } = wA;
// node_modules/@nextcloud/axios/dist/client.js
function HA() {
	let e = wA.create({ headers: {
		requesttoken: tw() ?? "",
		"X-Requested-With": "XMLHttpRequest"
	} });
	return iw((t) => {
		e.defaults.headers.requesttoken = t;
	}), Object.assign(e, {
		CancelToken: wA.CancelToken,
		isCancel: wA.isCancel
	});
}
// node_modules/@nextcloud/axios/dist/interceptors/csrf-token.js
var UA = "_nextcloudCsrfTokenReloaded";
function WA(e) {
	return async (t) => {
		if (!NA(t)) throw t;
		let { config: n, response: r, request: i } = t, a = i?.responseURL;
		if (n && !(UA in n) && r?.status === 412 && r?.data?.message === "CSRF check failed") {
			console.warn(`Request to ${a} failed because of a CSRF mismatch. Fetching a new token.`);
			let t = await rw();
			return e.defaults.headers.requesttoken = t, e({
				...n,
				[UA]: !0,
				headers: {
					...n.headers,
					requesttoken: t
				}
			});
		}
		throw t;
	};
}
// node_modules/@nextcloud/axios/dist/interceptors/maintenance-mode.js
var GA = "_nextcloudMaintenanceModeRetryDelay";
function KA(e) {
	return async (t) => {
		if (!NA(t)) throw t;
		let { config: n, response: r, request: i } = t, a = i?.responseURL, o = r?.status, s = r?.headers, c = n?.[GA] ?? 1;
		if (o === 503 && s?.["x-nextcloud-maintenance-mode"] === "1" && n?.retryIfMaintenanceMode) {
			if (c *= 2, c > 32) throw console.error("Retry delay exceeded one minute, giving up.", { responseURL: a }), t;
			return console.warn(`Request to ${a} failed because of maintenance mode. Retrying in ${c}s`), await new Promise((e) => {
				setTimeout(e, c * 1e3);
			}), e({
				...n,
				[GA]: c
			});
		}
		throw t;
	};
}
// node_modules/@nextcloud/axios/dist/interceptors/not-logged-in.js
async function qA(e) {
	if (NA(e)) {
		let { config: t, response: n, request: r } = e, i = r?.responseURL;
		n?.status === 401 && n?.data?.message === "Current user is not logged in" && t?.reloadExpiredSession && globalThis.location?.reload && (console.error(`Request to ${i} failed because the user session expired. Reloading the page …`), globalThis.OC?.reload ? globalThis.OC.reload() : globalThis.location.reload());
	}
	throw e;
}
// node_modules/@nextcloud/axios/dist/index.js
var JA = HA();
// node_modules/@nextcloud/vue/dist/composables/useFormatDateTime/index.mjs
JA.interceptors.response.use((e) => e, WA(JA)), JA.interceptors.response.use((e) => e, KA(JA)), JA.interceptors.response.use((e) => e, qA), ty(ry);
var YA = {
	long: ey("a few seconds ago"),
	short: ey("seconds ago"),
	narrow: ey("sec. ago")
};
function XA(e = Date.now(), t = {}) {
	let n, r = G(() => new Date(B(e))), i = G(() => {
		let { language: e, relativeTime: n, ignoreSeconds: r } = B(t);
		return {
			...e && { language: e },
			...n && { relativeTime: n },
			ignoreSeconds: r ? YA[n || "long"] : !1
		};
	}), a = /* @__PURE__ */ _n("");
	Nr(o);
	function o() {
		let e = r.value.getTime();
		if (Number.isNaN(e)) a.value = ey("Invalid date");
		else if (a.value = Jv(r.value, i.value), B(t).update !== !1) {
			let t = Math.abs(Date.now() - e), r = t > 12e4 || i.value.ignoreSeconds ? Math.min(t / 60, 18e5) : 1e3;
			n = window.setTimeout(o, r);
		}
	}
	return fa(() => n && window.clearTimeout(n)), /* @__PURE__ */ sn(a);
}
function ZA(e, t) {
	let n = G(() => ({
		locale: Rv(),
		format: {
			dateStyle: "short",
			timeStyle: "medium"
		},
		...B(t)
	})), r = G(() => new Intl.DateTimeFormat(n.value.locale, n.value.format));
	return G(() => r.value.format(B(e)));
}
// node_modules/@nextcloud/vue/dist/chunks/platform.mjs
var QA = /mac|ipad|iphone|darwin/i.test(navigator.userAgent), $A = window.OCP?.Accessibility?.disableKeyboardShortcuts?.(), ej = /^[a-zA-Z0-9]$/, tj = /^[^\x20-\x7F]$/;
function nj(e, t) {
	return !(e.target instanceof HTMLElement) || !t.allowInInput && (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement || e.target.isContentEditable) ? !0 : !t.allowInModal && Array.from(document.getElementsByClassName("modal-mask")).filter((e) => e.checkVisibility()).length > 0;
}
function rj(e, t) {
	return (n) => {
		(QA ? n.metaKey : n.ctrlKey) !== !!t.ctrl || n.altKey !== !!t.alt || t.shift !== void 0 && n.shiftKey !== !!t.shift || nj(n, t) || (t.prevent && n.preventDefault(), t.stop && n.stopPropagation(), e(n));
	};
}
function ij(e, t = () => {}, n = {}) {
	if ($A) return () => {};
	let r = (e, t) => e.key === t ? !0 : n.caseSensitive && t === t.toLowerCase() != (e.key === e.key.toLowerCase()) ? !1 : ej.test(t) && tj.test(e.key) ? e.code.replace(/^(?:Key|Digit|Numpad)/, "") === t.toUpperCase() : e.key.toLowerCase() === t.toLowerCase(), i = (t) => typeof e == "function" ? e(t) : typeof e == "string" ? r(t, e) : !Array.isArray(e) || e.some((e) => r(t, e)), a = CT(i, rj(t, n), {
		eventName: "keydown",
		dedupe: !0,
		passive: !n.prevent
	}), o = n.push ? CT(i, rj(t, n), {
		eventName: "keyup",
		passive: !n.prevent
	}) : () => {};
	return () => {
		a(), o();
	};
}
// node_modules/@nextcloud/vue/dist/functions/isDarkTheme/index.mjs
function aj(e = document.body) {
	let t = window.getComputedStyle(e), n = t.getPropertyValue("color-scheme").trim();
	return n === "dark" || n === "light" ? n === "dark" : t.getPropertyValue("--background-invert-if-dark").trim() === "invert(100%)";
}
aj();
// node_modules/@nextcloud/vue/dist/chunks/constants.mjs
var oj = /* @__PURE__ */ Symbol.for("nc:theme:enforced");
// node_modules/@nextcloud/vue/dist/composables/useIsDarkTheme/index.mjs
function sj(e) {
	let t = G(() => B(e) ?? document.body), n = /* @__PURE__ */ _n(aj(t.value)), r = AT();
	function i() {
		n.value = aj(t.value);
	}
	return bT(t, i, { attributes: !0 }), Ir(t, i), Ir(r, i, { immediate: !0 }), /* @__PURE__ */ sn(n);
}
var cj = nT(() => sj());
function lj() {
	let e = cj(), t = kr(oj, void 0);
	return G(() => t?.value ? t.value === "dark" : e.value);
}
// node_modules/@nextcloud/vue/dist/composables/useIsFullscreen/index.mjs
var uj = /* @__PURE__ */ _n(dj());
window.addEventListener("resize", () => {
	uj.value = dj();
});
function dj() {
	return window.outerHeight === window.screen.height;
}
// node_modules/@nextcloud/vue/dist/chunks/NcIconToggleSwitch.mjs
var fj = "<svg\n	xmlns=\"http://www.w3.org/2000/svg\"\n	viewBox=\"0 0 24 12\">\n	<path d=\"M17,1H7A5,5 0 0,0 2,6 5,5 0 0,0 7,11H17A5,5 0 0,0 22,6 5,5 0 0,0 17,1Z\" />\n	<circle\n		cy=\"6\"\n		r=\"3\"\n		fill=\"var(--color-main-background)\" />\n</svg>", pj = /* @__PURE__ */ Eg(/* @__PURE__ */ hi({
	__name: "NcIconToggleSwitch",
	props: {
		checked: { type: Boolean },
		size: { default: 34 },
		inline: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		pl((e) => ({
			v6bd152af: t.value,
			v16fd8ca9: n.value
		}));
		let t = G(() => e.checked ? "var(--color-primary-element)" : "var(--color-text-maxcontrast)"), n = G(() => e.checked ? "calc(17 / 24 * 100%)" : "calc(7 / 24 * 100%)");
		return (t, n) => (V(), Ns(vv, {
			class: ve(t.$style.iconToggleSwitch),
			svg: fj,
			size: e.size,
			inline: e.inline
		}, null, 8, [
			"class",
			"size",
			"inline"
		]));
	}
}), [["__cssModules", { $style: {
	"material-design-icon": "_material-design-icon_dVDJQ",
	iconToggleSwitch: "_iconToggleSwitch_IL4eF"
} }]]), mj = /* @__PURE__ */ Symbol.for("insideRadioGroup");
function hj() {
	return kr(mj, void 0);
}
// node_modules/@nextcloud/vue/dist/chunks/NcCheckboxRadioSwitch.mjs
var gj = {
	name: "CheckboxBlankOutlineIcon",
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
function bj(e, t, n, r, i, a) {
	return V(), H("span", Js(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon checkbox-blank-outline-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(V(), H("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (V(), H("title", yj, F(n.title), 1)) : Ws("", !0), t[1] ||= U("path", { d: "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" }, null, -1)], 8, vj))], 16, _j);
}
var xj = /* @__PURE__ */ Eg(gj, [["render", bj]]), Sj = {
	name: "CheckboxMarkedIcon",
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
function Ej(e, t, n, r, i, a) {
	return V(), H("span", Js(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon checkbox-marked-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(V(), H("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (V(), H("title", Tj, F(n.title), 1)) : Ws("", !0), t[1] ||= U("path", { d: "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" }, null, -1)], 8, wj))], 16, Cj);
}
var Dj = /* @__PURE__ */ Eg(Sj, [["render", Ej]]), Oj = {
	name: "MinusBoxIcon",
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
function Mj(e, t, n, r, i, a) {
	return V(), H("span", Js(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon minus-box-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(V(), H("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (V(), H("title", jj, F(n.title), 1)) : Ws("", !0), t[1] ||= U("path", { d: "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" }, null, -1)], 8, Aj))], 16, kj);
}
var Nj = /* @__PURE__ */ Eg(Oj, [["render", Mj]]), Pj = {
	name: "RadioboxBlankIcon",
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
}, Fj = ["aria-hidden", "aria-label"], Ij = [
	"fill",
	"width",
	"height"
], Lj = { key: 0 };
function Rj(e, t, n, r, i, a) {
	return V(), H("span", Js(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon radiobox-blank-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(V(), H("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (V(), H("title", Lj, F(n.title), 1)) : Ws("", !0), t[1] ||= U("path", { d: "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" }, null, -1)], 8, Ij))], 16, Fj);
}
var zj = /* @__PURE__ */ Eg(Pj, [["render", Rj]]), Bj = {
	name: "RadioboxMarkedIcon",
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
}, Vj = ["aria-hidden", "aria-label"], Hj = [
	"fill",
	"width",
	"height"
], Uj = { key: 0 };
function Wj(e, t, n, r, i, a) {
	return V(), H("span", Js(e.$attrs, {
		"aria-hidden": n.title ? null : "true",
		"aria-label": n.title,
		class: "material-design-icon radiobox-marked-icon",
		role: "img",
		onClick: t[0] ||= (t) => e.$emit("click", t)
	}), [(V(), H("svg", {
		fill: n.fillColor,
		class: "material-design-icon__svg",
		width: n.size,
		height: n.size,
		viewBox: "0 0 24 24"
	}, [n.title ? (V(), H("title", Uj, F(n.title), 1)) : Ws("", !0), t[1] ||= U("path", { d: "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" }, null, -1)], 8, Hj))], 16, Vj);
}
var Gj = /* @__PURE__ */ Eg(Bj, [["render", Wj]]), Kj = "checkbox", qj = "radio", Jj = "switch", Yj = "button", Xj = {
	name: "NcCheckboxContent",
	components: {
		NcLoadingIcon: Iw,
		NcIconToggleSwitch: pj
	},
	props: {
		iconClass: {
			type: [String, Object],
			default: null
		},
		textClass: {
			type: [String, Object],
			default: null
		},
		type: {
			type: String,
			default: "checkbox",
			validator: (e) => [
				Kj,
				qj,
				Jj,
				Yj
			].includes(e)
		},
		buttonVariant: {
			type: Boolean,
			default: !1
		},
		isChecked: {
			type: Boolean,
			default: !1
		},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		iconSize: {
			type: Number,
			default: 24
		},
		labelId: {
			type: String,
			required: !0
		},
		descriptionId: {
			type: String,
			required: !0
		}
	},
	computed: {
		isButtonType() {
			return this.type === Yj;
		},
		isSwitchType() {
			return this.type === Jj;
		},
		checkboxRadioIconElement() {
			return this.type === qj ? this.isChecked ? Gj : zj : this.indeterminate ? Nj : this.isChecked ? Dj : xj;
		}
	}
}, Zj = {
	key: 0,
	class: "checkbox-content__wrapper"
}, Qj = ["id"], $j = ["id"];
function eM(e, t, n, r, i, a) {
	let o = ya("NcLoadingIcon"), s = ya("NcIconToggleSwitch");
	return V(), H("span", { class: ve(["checkbox-content", {
		["checkbox-content-" + n.type]: !0,
		"checkbox-content--button-variant": n.buttonVariant,
		"checkbox-content--has-text": !!e.$slots.default
	}]) }, [U("span", {
		class: ve(["checkbox-content__icon", {
			"checkbox-content__icon--checked": n.isChecked,
			"checkbox-content__icon--has-description": !a.isButtonType && e.$slots.description,
			[n.iconClass]: !0
		}]),
		"aria-hidden": !0,
		inert: ""
	}, [Da(e.$slots, "icon", {
		checked: n.isChecked,
		loading: n.loading
	}, () => [n.loading ? (V(), Ns(o, { key: 0 })) : a.isSwitchType ? (V(), Ns(s, {
		key: 1,
		checked: n.isChecked,
		size: n.iconSize,
		inline: ""
	}, null, 8, ["checked", "size"])) : n.buttonVariant ? Ws("", !0) : (V(), Ns(xa(a.checkboxRadioIconElement), {
		key: 2,
		size: n.iconSize
	}, null, 8, ["size"]))], !0)], 2), e.$slots.default || e.$slots.description ? (V(), H("span", Zj, [e.$slots.default ? (V(), H("span", {
		key: 0,
		id: n.labelId,
		class: ve(["checkbox-content__text", n.textClass])
	}, [Da(e.$slots, "default", {}, void 0, !0)], 10, Qj)) : Ws("", !0), !a.isButtonType && e.$slots.description ? (V(), H("span", {
		key: 1,
		id: n.descriptionId,
		class: "checkbox-content__description"
	}, [Da(e.$slots, "description", {}, void 0, !0)], 8, $j)) : Ws("", !0)])) : Ws("", !0)], 2);
}
var tM = /* @__PURE__ */ Eg(Xj, [["render", eM], ["__scopeId", "data-v-5ca1e30f"]]);
ty();
var nM = {
	name: "NcCheckboxRadioSwitch",
	components: { NcCheckboxContent: tM },
	inheritAttrs: !1,
	props: {
		id: {
			type: String,
			default: () => "checkbox-radio-switch-" + ex(),
			validator: (e) => e.trim() !== ""
		},
		wrapperId: {
			type: String,
			default: null
		},
		name: {
			type: String,
			default: null
		},
		ariaLabel: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "checkbox",
			validator: (e) => [
				Kj,
				qj,
				Jj,
				Yj
			].includes(e)
		},
		buttonVariant: {
			type: Boolean,
			default: !1
		},
		buttonVariantGrouped: {
			type: String,
			default: "no",
			validator: (e) => [
				"no",
				"vertical",
				"horizontal"
			].includes(e)
		},
		modelValue: {
			type: [
				Boolean,
				Array,
				String
			],
			default: !1
		},
		value: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		required: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		wrapperElement: {
			type: String,
			default: null
		},
		class: {
			type: [
				String,
				Array,
				Object
			],
			default: ""
		},
		style: {
			type: [
				String,
				Array,
				Object
			],
			default: ""
		},
		description: {
			type: String,
			default: null
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = hj();
		return ca(() => n?.value.register(!1)), {
			internalType: G(() => n?.value ? qj : e.type),
			internalModelValue: G({
				get() {
					return n?.value ? n.value.modelValue : e.modelValue;
				},
				set(e) {
					n?.value ? n.value.onUpdate(e) : t("update:modelValue", e);
				}
			}),
			labelId: ex(),
			descriptionId: ex()
		};
	},
	computed: {
		isButtonType() {
			return this.internalType === Yj;
		},
		computedWrapperElement() {
			return this.isButtonType ? "button" : this.wrapperElement === null ? "span" : this.wrapperElement;
		},
		listeners() {
			return this.isButtonType ? { click: this.onToggle } : { change: this.onToggle };
		},
		iconSize() {
			return this.internalType === Jj ? 36 : 20;
		},
		cssIconSize() {
			return this.iconSize + "px";
		},
		cssIconHeight() {
			return this.internalType === Jj ? "16px" : this.cssIconSize;
		},
		inputType() {
			return [
				Kj,
				qj,
				Yj
			].includes(this.internalType) ? this.internalType : Kj;
		},
		inputRole() {
			return this.internalType === Jj ? "switch" : void 0;
		},
		isChecked() {
			return this.value === null ? this.internalModelValue === !0 : Array.isArray(this.internalModelValue) ? [...this.internalModelValue].indexOf(this.value) > -1 : this.internalModelValue === this.value;
		},
		hasIndeterminate() {
			return [Kj, qj].includes(this.inputType);
		}
	},
	mounted() {
		if (this.name && this.internalType === Kj && !Array.isArray(this.internalModelValue)) throw Error("When using groups of checkboxes, the updated value will be an array.");
		if (this.name && this.internalType === Jj) throw Error("Switches are not made to be used for data sets. Please use checkboxes instead.");
		if (typeof this.internalModelValue != "boolean" && this.internalType === Jj) throw Error("Switches can only be used with boolean as modelValue prop.");
	},
	methods: {
		t: ey,
		n: $v,
		onToggle(e) {
			this.disabled || e.target.tagName.toLowerCase() === "a" || (this.internalModelValue = this.internalType === qj ? this.value : this.internalType === Jj ? !this.isChecked : typeof this.internalModelValue == "boolean" ? !this.internalModelValue : this.isChecked ? this.internalModelValue.filter((e) => e !== this.value) : [...this.internalModelValue, this.value]);
		}
	}
}, rM = () => {
	pl((e) => ({
		f99d0228: e.cssIconSize,
		v69c82152: e.cssIconHeight
	}));
}, iM = nM.setup;
nM.setup = iM ? (e, t) => (rM(), iM(e, t)) : rM;
var aM = [
	"id",
	"aria-labelledby",
	"aria-describedby",
	"aria-label",
	"disabled",
	"type",
	"role",
	"value",
	"checked",
	".indeterminate",
	"required",
	"name"
];
function oM(e, t, n, r, i, a) {
	let o = ya("NcCheckboxContent");
	return V(), Ns(xa(a.computedWrapperElement), Js({
		id: n.wrapperId ?? (a.isButtonType ? n.id : null),
		"aria-label": a.isButtonType && n.ariaLabel ? n.ariaLabel : void 0,
		class: ["checkbox-radio-switch", [e.$props.class, {
			["checkbox-radio-switch-" + r.internalType]: r.internalType,
			"checkbox-radio-switch--checked": a.isChecked,
			"checkbox-radio-switch--disabled": n.disabled,
			"checkbox-radio-switch--indeterminate": a.hasIndeterminate ? n.indeterminate : !1,
			"checkbox-radio-switch--button-variant": n.buttonVariant,
			"checkbox-radio-switch--button-variant-v-grouped": n.buttonVariant && n.buttonVariantGrouped === "vertical",
			"checkbox-radio-switch--button-variant-h-grouped": n.buttonVariant && n.buttonVariantGrouped === "horizontal",
			"button-vue": a.isButtonType
		}]],
		style: n.style,
		type: a.isButtonType ? "button" : null
	}, a.isButtonType ? e.$attrs : {}, ka(a.isButtonType ? a.listeners : {})), {
		default: Tr(() => [a.isButtonType ? Ws("", !0) : (V(), H("input", Js({
			key: 0,
			id: n.id,
			"aria-labelledby": !a.isButtonType && !n.ariaLabel ? r.labelId : null,
			"aria-describedby": !a.isButtonType && (n.description || e.$slots.description) ? r.descriptionId : null,
			"aria-label": n.ariaLabel || void 0,
			class: "checkbox-radio-switch__input",
			disabled: n.disabled,
			type: a.inputType,
			role: a.inputRole,
			value: n.value,
			checked: a.isChecked,
			".indeterminate": a.hasIndeterminate ? n.indeterminate : null,
			required: n.required,
			name: n.name
		}, e.$attrs, ka(a.listeners, !0)), null, 48, aM)), W(o, {
			id: a.isButtonType ? void 0 : `${n.id}-label`,
			class: "checkbox-radio-switch__content",
			iconClass: "checkbox-radio-switch__icon",
			textClass: "checkbox-radio-switch__text",
			type: r.internalType,
			indeterminate: a.hasIndeterminate ? n.indeterminate : !1,
			buttonVariant: n.buttonVariant,
			isChecked: a.isChecked,
			loading: n.loading,
			labelId: r.labelId,
			descriptionId: r.descriptionId,
			iconSize: a.iconSize,
			onClick: a.onToggle
		}, Ea({
			icon: Tr(() => [Da(e.$slots, "icon", {}, void 0, !0)]),
			_: 2
		}, [e.$slots.description || n.description ? {
			name: "description",
			fn: Tr(() => [Da(e.$slots, "description", {}, () => [Hs(F(n.description), 1)], !0)]),
			key: "0"
		} : void 0, e.$slots.default ? {
			name: "default",
			fn: Tr(() => [Da(e.$slots, "default", {}, void 0, !0)]),
			key: "1"
		} : void 0]), 1032, [
			"id",
			"type",
			"indeterminate",
			"buttonVariant",
			"isChecked",
			"loading",
			"labelId",
			"descriptionId",
			"iconSize",
			"onClick"
		])]),
		_: 3
	}, 16, [
		"id",
		"aria-label",
		"class",
		"style",
		"type"
	]);
}
var sM = /* @__PURE__ */ Eg(nM, [["render", oM], ["__scopeId", "data-v-81045d2a"]]);
// node_modules/debounce/index.js
function cM(e, t = 100, n = {}) {
	if (typeof e != "function") throw TypeError(`Expected the first parameter to be a function, got \`${typeof e}\`.`);
	if (t < 0) throw RangeError("`wait` must not be negative.");
	if (typeof n == "boolean") throw TypeError("The `options` parameter must be an object, not a boolean. Use `{immediate: true}` instead.");
	let { immediate: r } = n, i, a, o, s, c;
	function l() {
		let t = i, n = a;
		return i = void 0, a = void 0, c = e.apply(t, n), c;
	}
	function u() {
		let e = Date.now() - s;
		e < t && e >= 0 ? o = setTimeout(u, t - e) : (o = void 0, r || (c = l()));
	}
	let d = function(...e) {
		if (i && this !== i && Object.getPrototypeOf(this) === Object.getPrototypeOf(i)) throw Error("Debounced method called with different contexts of the same prototype.");
		i = this, a = e, s = Date.now();
		let n = r && !o;
		if (o ||= setTimeout(u, t), n) return c = l(), c;
	};
	return Object.defineProperty(d, "isPending", { get() {
		return o !== void 0;
	} }), d.clear = () => {
		o && (clearTimeout(o), o = void 0, i = void 0, a = void 0);
	}, d.flush = () => {
		o && d.trigger();
	}, d.trigger = () => {
		c = l(), d.clear();
	}, d;
}
// node_modules/@nextcloud/vue/dist/chunks/NcActionLink.mjs
var lM = {
	name: "NcActionLink",
	mixins: [rx],
	inject: { isInSemanticMenu: {
		from: tx,
		default: !1
	} },
	props: {
		href: {
			type: String,
			required: !0,
			validator: (e) => {
				try {
					return new URL(e);
				} catch {
					return e.startsWith("#") || e.startsWith("/");
				}
			}
		},
		download: {
			type: String,
			default: null
		},
		target: {
			type: String,
			default: "_self",
			validator: (e) => e && (!e.startsWith("_") || [
				"_blank",
				"_self",
				"_parent",
				"_top"
			].indexOf(e) > -1)
		},
		title: {
			type: String,
			default: null
		}
	}
}, uM = ["role"], dM = [
	"download",
	"href",
	"aria-label",
	"target",
	"title",
	"role"
], fM = {
	key: 0,
	class: "action-link__longtext-wrapper"
}, pM = { class: "action-link__name" }, mM = ["textContent"], hM = ["textContent"], gM = {
	key: 2,
	class: "action-link__text"
};
function _M(e, t, n, r, i, a) {
	return V(), H("li", {
		class: "action",
		role: a.isInSemanticMenu && "presentation"
	}, [U("a", {
		download: n.download,
		href: n.href,
		"aria-label": e.ariaLabel,
		target: n.target,
		title: n.title,
		class: "action-link focusable",
		rel: "nofollow noreferrer noopener",
		role: a.isInSemanticMenu && "menuitem",
		onClick: t[0] ||= (...t) => e.onClick && e.onClick(...t)
	}, [
		Da(e.$slots, "icon", {}, () => [U("span", {
			"aria-hidden": "true",
			class: ve(["action-link__icon", [e.isIconUrl ? "action-link__icon--url" : e.icon]]),
			style: pe({ backgroundImage: e.isIconUrl ? `url(${e.icon})` : null })
		}, null, 6)], !0),
		e.name ? (V(), H("span", fM, [
			U("strong", pM, F(e.name), 1),
			t[1] ||= U("br", null, null, -1),
			U("span", {
				class: "action-link__longtext",
				textContent: F(e.text)
			}, null, 8, mM)
		])) : e.isLongText ? (V(), H("span", {
			key: 1,
			class: "action-link__longtext",
			textContent: F(e.text)
		}, null, 8, hM)) : (V(), H("span", gM, F(e.text), 1)),
		Ws("", !0)
	], 8, dM)], 8, uM);
}
var vM = /* @__PURE__ */ Eg(lM, [["render", _M], ["__scopeId", "data-v-32f01b7a"]]), yM = {
	name: "NcActionRouter",
	mixins: [rx],
	inject: { isInSemanticMenu: {
		from: tx,
		default: !1
	} },
	props: { to: {
		type: [String, Object],
		required: !0
	} }
}, bM = ["role"], xM = {
	key: 0,
	class: "action-router__longtext-wrapper"
}, SM = { class: "action-router__name" }, CM = ["textContent"], wM = ["textContent"], TM = {
	key: 2,
	class: "action-router__text"
};
function EM(e, t, n, r, i, a) {
	let o = ya("RouterLink");
	return V(), H("li", {
		class: "action",
		role: a.isInSemanticMenu && "presentation"
	}, [W(o, {
		"aria-label": e.ariaLabel,
		class: "action-router focusable",
		rel: "nofollow noreferrer noopener",
		role: a.isInSemanticMenu && "menuitem",
		title: e.title,
		to: n.to,
		onClick: e.onClick
	}, {
		default: Tr(() => [
			Da(e.$slots, "icon", {}, () => [U("span", {
				"aria-hidden": "true",
				class: ve(["action-router__icon", [e.isIconUrl ? "action-router__icon--url" : e.icon]]),
				style: pe({ backgroundImage: e.isIconUrl ? `url(${e.icon})` : null })
			}, null, 6)], !0),
			e.name ? (V(), H("span", xM, [
				U("strong", SM, F(e.name), 1),
				t[0] ||= U("br", null, null, -1),
				U("span", {
					class: "action-router__longtext",
					textContent: F(e.text)
				}, null, 8, CM)
			])) : e.isLongText ? (V(), H("span", {
				key: 1,
				class: "action-router__longtext",
				textContent: F(e.text)
			}, null, 8, wM)) : (V(), H("span", TM, F(e.text), 1)),
			Ws("", !0)
		]),
		_: 3
	}, 8, [
		"aria-label",
		"role",
		"title",
		"to",
		"onClick"
	])], 8, bM);
}
var DM = /* @__PURE__ */ Eg(yM, [["render", EM], ["__scopeId", "data-v-87267750"]]);
export { mx as $, U as $n, En as $r, Kv as $t, Uw as A, lg as An, gi as Ar, oy as At, hw as B, Gc as Bn, He as Br, gy as Bt, WT as C, dg as Cn, Ta as Cr, Yb as Ct, YT as D, fg as Dn, xa as Dr, ty as Dt, JT as E, ig as En, Sa as Er, kb as Et, Iw as F, vg as Fn, Ir as Fr, dy as Ft, iw as G, _u as Gn, Ue as Gr, by as Gt, pw as H, Bu as Hn, R as Hr, vy as Ht, Dw as I, mg as In, Nr as Ir, fy as It, pC as J, Mu as Jn, on as Jr, Cy as Jt, ew as K, ll as Kn, an as Kr, xy as Kt, Aw as L, tg as Ln, Tr as Lr, py as Lt, eT as M, gg as Mn, Ha as Mr, cy as Mt, zw as N, hg as Nn, vi as Nr, ly as Nt, Rw as O, rg as On, ka as Or, ey as Ot, uT as P, _g as Pn, Ec as Pr, uy as Pt, cC as Q, G as Qn, kn as Qr, Zv as Qt, Ow as R, $h as Rn, Er as Rr, my as Rt, IT as S, ag as Sn, Or as Sr, Jb as St, BT as T, cg as Tn, ya as Tr, Zb as Tt, cw as U, pl as Un, fn as Ur, yy as Ut, mw as V, Hu as Vn, un as Vr, _y as Vt, tw as W, xu as Wn, mn as Wr, iy as Wt, fC as X, Zr as Xn, z as Xr, Ty as Xt, lC as Y, Cs as Yn, cn as Yr, wy as Yt, oC as Z, Vs as Zn, L as Zr, Ey as Zt, NT as _, Eg as _n, da as _r, Ub as _t, lj as a, pe as ai, Uv as an, W as ar, jb as at, LT as b, Cg as bn, fa as br, Kb as bt, XA as c, Dv as cn, tc as cr, Pb as ct, ZT as d, Av as dn, Ar as dr, Lb as dt, B as ei, qv as en, Ns as er, rx as et, XT as f, jv as fn, kr as fr, Rb as ft, jT as g, Ag as gn, sa as gr, Hb as gt, ET as h, vv as hn, ar as hr, Vb as ht, sM as i, P as ii, Hv as in, Hs as ir, Ab as it, aT as j, sg as jn, go as jr, sy as jt, Hw as k, pg as kn, Ua as kr, ny as kt, ZA as l, Ev as ln, Bs as lr, Fb as lt, CT as m, wv as mn, Js as mr, Bb as mt, vM as n, xn as ni, Rv as nn, H as nr, ex as nt, aj as o, F as oi, Fv as on, Ji as or, Mb as ot, _T as p, Cv as pn, qa as pr, zb as pt, aC as q, Pu as qn, _n as qr, Sy as qt, cM as r, ve as ri, zv as rn, Ea as rr, Qb as rt, ij as s, Pv as sn, hi as sr, Nb as st, DM as t, bn as ti, Gv as tn, Ws as tr, tx as tt, JA as u, kv as un, K as ur, Ib as ut, PT as v, xg as vn, la as vr, Wb as vt, MT as w, ng as wn, Da as wr, Xb as wt, VT as x, og as xn, V as xr, qb as xt, FT as y, Sg as yn, ca as yr, Gb as yt, xw as z, eg as zn, Ve as zr, hy as zt };
