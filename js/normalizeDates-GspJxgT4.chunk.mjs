var e = 6048e5, t = 864e5, n = 6e4, r = 36e5, i = 1e3, a = Symbol.for("constructDateFrom");
// node_modules/date-fns/constructFrom.js
function o(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && a in e ? e[a](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
// node_modules/date-fns/toDate.js
function s(e, t) {
	return o(t || e, e);
}
// node_modules/date-fns/_lib/defaultOptions.js
var c = {};
function l() {
	return c;
}
// node_modules/date-fns/startOfWeek.js
function u(e, t) {
	let n = l(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = s(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
// node_modules/date-fns/_lib/normalizeDates.js
function d(e, ...t) {
	let n = o.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
export { o as a, n as c, s as i, i as l, u as n, t as o, l as r, r as s, d as t, e as u };
