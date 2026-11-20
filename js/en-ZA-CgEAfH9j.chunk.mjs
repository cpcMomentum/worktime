import { t as e } from "./formatDistance-DJicDYcW.chunk.mjs";
import { n as t, r as n, t as r } from "./match-BVhkiPqW.chunk.mjs";
import { i } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
var a = {
	date: i({
		formats: {
			full: "EEEE, dd MMMM yyyy",
			long: "dd MMMM yyyy",
			medium: "dd MMM yyyy",
			short: "yyyy/MM/dd"
		},
		defaultWidth: "full"
	}),
	time: i({
		formats: {
			full: "HH:mm:ss zzzz",
			long: "HH:mm:ss z",
			medium: "HH:mm:ss",
			short: "HH:mm"
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
	code: "en-ZA",
	formatDistance: e,
	formatLong: a,
	formatRelative: n,
	localize: t,
	match: r,
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { o as default, o as enZA };
