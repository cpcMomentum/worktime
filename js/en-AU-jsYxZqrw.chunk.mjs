import { t as e } from "./formatDistance-DJicDYcW.chunk.mjs";
import { i as t } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
import { n, r, t as i } from "./match-BVhkiPqW.chunk.mjs";
var a = {
	date: t({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: t({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: t({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, o = {
	code: "en-AU",
	formatDistance: e,
	formatLong: a,
	formatRelative: r,
	localize: n,
	match: i,
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 4
	}
};
export { o as default, o as enAU };
