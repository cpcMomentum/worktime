import { t as e } from "./formatDistance-DJicDYcW.chunk.mjs";
import { n as t, r as n, t as r } from "./match-BVhkiPqW.chunk.mjs";
import { i } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
var a = {
	date: i({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: i({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: i({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, o = {
	code: "en-NZ",
	formatDistance: e,
	formatLong: a,
	formatRelative: n,
	localize: t,
	match: r,
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { o as default, o as enNZ };
