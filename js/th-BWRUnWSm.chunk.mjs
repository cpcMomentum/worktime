import { i as e, n as t, r as n, t as r } from "./buildMatchPatternFn-BB3ClLLf.chunk.mjs";
// node_modules/date-fns/locale/th/_lib/formatDistance.js
var i = {
	lessThanXSeconds: {
		one: "น้อยกว่า 1 วินาที",
		other: "น้อยกว่า {{count}} วินาที"
	},
	xSeconds: {
		one: "1 วินาที",
		other: "{{count}} วินาที"
	},
	halfAMinute: "ครึ่งนาที",
	lessThanXMinutes: {
		one: "น้อยกว่า 1 นาที",
		other: "น้อยกว่า {{count}} นาที"
	},
	xMinutes: {
		one: "1 นาที",
		other: "{{count}} นาที"
	},
	aboutXHours: {
		one: "ประมาณ 1 ชั่วโมง",
		other: "ประมาณ {{count}} ชั่วโมง"
	},
	xHours: {
		one: "1 ชั่วโมง",
		other: "{{count}} ชั่วโมง"
	},
	xDays: {
		one: "1 วัน",
		other: "{{count}} วัน"
	},
	aboutXWeeks: {
		one: "ประมาณ 1 สัปดาห์",
		other: "ประมาณ {{count}} สัปดาห์"
	},
	xWeeks: {
		one: "1 สัปดาห์",
		other: "{{count}} สัปดาห์"
	},
	aboutXMonths: {
		one: "ประมาณ 1 เดือน",
		other: "ประมาณ {{count}} เดือน"
	},
	xMonths: {
		one: "1 เดือน",
		other: "{{count}} เดือน"
	},
	aboutXYears: {
		one: "ประมาณ 1 ปี",
		other: "ประมาณ {{count}} ปี"
	},
	xYears: {
		one: "1 ปี",
		other: "{{count}} ปี"
	},
	overXYears: {
		one: "มากกว่า 1 ปี",
		other: "มากกว่า {{count}} ปี"
	},
	almostXYears: {
		one: "เกือบ 1 ปี",
		other: "เกือบ {{count}} ปี"
	}
}, a = (e, t, n) => {
	let r, a = i[e];
	return r = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", String(t)), n?.addSuffix ? n.comparison && n.comparison > 0 ? e === "halfAMinute" ? "ใน" + r : "ใน " + r : r + "ที่ผ่านมา" : r;
}, o = {
	date: e({
		formats: {
			full: "วันEEEEที่ do MMMM y",
			long: "do MMMM y",
			medium: "d MMM y",
			short: "dd/MM/yyyy"
		},
		defaultWidth: "full"
	}),
	time: e({
		formats: {
			full: "H:mm:ss น. zzzz",
			long: "H:mm:ss น. z",
			medium: "H:mm:ss น.",
			short: "H:mm น."
		},
		defaultWidth: "medium"
	}),
	dateTime: e({
		formats: {
			full: "{{date}} 'เวลา' {{time}}",
			long: "{{date}} 'เวลา' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, s = {
	lastWeek: "eeee'ที่แล้วเวลา' p",
	yesterday: "'เมื่อวานนี้เวลา' p",
	today: "'วันนี้เวลา' p",
	tomorrow: "'พรุ่งนี้เวลา' p",
	nextWeek: "eeee 'เวลา' p",
	other: "P"
}, c = {
	code: "th",
	formatDistance: a,
	formatLong: o,
	formatRelative: (e, t, n, r) => s[e],
	localize: {
		ordinalNumber: (e, t) => String(e),
		era: n({
			values: {
				narrow: ["B", "คศ"],
				abbreviated: ["BC", "ค.ศ."],
				wide: ["ปีก่อนคริสตกาล", "คริสต์ศักราช"]
			},
			defaultWidth: "wide"
		}),
		quarter: n({
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
					"ไตรมาสแรก",
					"ไตรมาสที่สอง",
					"ไตรมาสที่สาม",
					"ไตรมาสที่สี่"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: n({
			values: {
				narrow: [
					"ม.ค.",
					"ก.พ.",
					"มี.ค.",
					"เม.ย.",
					"พ.ค.",
					"มิ.ย.",
					"ก.ค.",
					"ส.ค.",
					"ก.ย.",
					"ต.ค.",
					"พ.ย.",
					"ธ.ค."
				],
				abbreviated: [
					"ม.ค.",
					"ก.พ.",
					"มี.ค.",
					"เม.ย.",
					"พ.ค.",
					"มิ.ย.",
					"ก.ค.",
					"ส.ค.",
					"ก.ย.",
					"ต.ค.",
					"พ.ย.",
					"ธ.ค."
				],
				wide: [
					"มกราคม",
					"กุมภาพันธ์",
					"มีนาคม",
					"เมษายน",
					"พฤษภาคม",
					"มิถุนายน",
					"กรกฎาคม",
					"สิงหาคม",
					"กันยายน",
					"ตุลาคม",
					"พฤศจิกายน",
					"ธันวาคม"
				]
			},
			defaultWidth: "wide"
		}),
		day: n({
			values: {
				narrow: [
					"อา.",
					"จ.",
					"อ.",
					"พ.",
					"พฤ.",
					"ศ.",
					"ส."
				],
				short: [
					"อา.",
					"จ.",
					"อ.",
					"พ.",
					"พฤ.",
					"ศ.",
					"ส."
				],
				abbreviated: [
					"อา.",
					"จ.",
					"อ.",
					"พ.",
					"พฤ.",
					"ศ.",
					"ส."
				],
				wide: [
					"อาทิตย์",
					"จันทร์",
					"อังคาร",
					"พุธ",
					"พฤหัสบดี",
					"ศุกร์",
					"เสาร์"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: n({
			values: {
				narrow: {
					am: "ก่อนเที่ยง",
					pm: "หลังเที่ยง",
					midnight: "เที่ยงคืน",
					noon: "เที่ยง",
					morning: "เช้า",
					afternoon: "บ่าย",
					evening: "เย็น",
					night: "กลางคืน"
				},
				abbreviated: {
					am: "ก่อนเที่ยง",
					pm: "หลังเที่ยง",
					midnight: "เที่ยงคืน",
					noon: "เที่ยง",
					morning: "เช้า",
					afternoon: "บ่าย",
					evening: "เย็น",
					night: "กลางคืน"
				},
				wide: {
					am: "ก่อนเที่ยง",
					pm: "หลังเที่ยง",
					midnight: "เที่ยงคืน",
					noon: "เที่ยง",
					morning: "เช้า",
					afternoon: "บ่าย",
					evening: "เย็น",
					night: "กลางคืน"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "ก่อนเที่ยง",
					pm: "หลังเที่ยง",
					midnight: "เที่ยงคืน",
					noon: "เที่ยง",
					morning: "ตอนเช้า",
					afternoon: "ตอนกลางวัน",
					evening: "ตอนเย็น",
					night: "ตอนกลางคืน"
				},
				abbreviated: {
					am: "ก่อนเที่ยง",
					pm: "หลังเที่ยง",
					midnight: "เที่ยงคืน",
					noon: "เที่ยง",
					morning: "ตอนเช้า",
					afternoon: "ตอนกลางวัน",
					evening: "ตอนเย็น",
					night: "ตอนกลางคืน"
				},
				wide: {
					am: "ก่อนเที่ยง",
					pm: "หลังเที่ยง",
					midnight: "เที่ยงคืน",
					noon: "เที่ยง",
					morning: "ตอนเช้า",
					afternoon: "ตอนกลางวัน",
					evening: "ตอนเย็น",
					night: "ตอนกลางคืน"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: r({
			matchPattern: /^\d+/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: t({
			matchPatterns: {
				narrow: /^([bB]|[aA]|คศ)/i,
				abbreviated: /^([bB]\.?\s?[cC]\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?|ค\.?ศ\.?)/i,
				wide: /^(ก่อนคริสตกาล|คริสต์ศักราช|คริสตกาล)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^[bB]/i, /^(^[aA]|ค\.?ศ\.?|คริสตกาล|คริสต์ศักราช|)/i] },
			defaultParseWidth: "any"
		}),
		quarter: t({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^ไตรมาส(ที่)? ?[1234]/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/(1|แรก|หนึ่ง)/i,
				/(2|สอง)/i,
				/(3|สาม)/i,
				/(4|สี่)/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: t({
			matchPatterns: {
				narrow: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?)/i,
				abbreviated: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?')/i,
				wide: /^(มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				wide: [
					/^มก/i,
					/^กุม/i,
					/^มี/i,
					/^เม/i,
					/^พฤษ/i,
					/^มิ/i,
					/^กรก/i,
					/^ส/i,
					/^กัน/i,
					/^ต/i,
					/^พฤศ/i,
					/^ธ/i
				],
				any: [
					/^ม\.?ค\.?/i,
					/^ก\.?พ\.?/i,
					/^มี\.?ค\.?/i,
					/^เม\.?ย\.?/i,
					/^พ\.?ค\.?/i,
					/^มิ\.?ย\.?/i,
					/^ก\.?ค\.?/i,
					/^ส\.?ค\.?/i,
					/^ก\.?ย\.?/i,
					/^ต\.?ค\.?/i,
					/^พ\.?ย\.?/i,
					/^ธ\.?ค\.?/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: t({
			matchPatterns: {
				narrow: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
				short: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
				abbreviated: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
				wide: /^(อาทิตย์|จันทร์|อังคาร|พุธ|พฤหัสบดี|ศุกร์|เสาร์)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				wide: [
					/^อา/i,
					/^จั/i,
					/^อั/i,
					/^พุธ/i,
					/^พฤ/i,
					/^ศ/i,
					/^เส/i
				],
				any: [
					/^อา/i,
					/^จ/i,
					/^อ/i,
					/^พ(?!ฤ)/i,
					/^พฤ/i,
					/^ศ/i,
					/^ส/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: t({
			matchPatterns: { any: /^(ก่อนเที่ยง|หลังเที่ยง|เที่ยงคืน|เที่ยง|(ตอน.*?)?.*(เที่ยง|เช้า|บ่าย|เย็น|กลางคืน))/i },
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^ก่อนเที่ยง/i,
				pm: /^หลังเที่ยง/i,
				midnight: /^เที่ยงคืน/i,
				noon: /^เที่ยง/i,
				morning: /เช้า/i,
				afternoon: /บ่าย/i,
				evening: /เย็น/i,
				night: /กลางคืน/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
export { c as default, c as th };
