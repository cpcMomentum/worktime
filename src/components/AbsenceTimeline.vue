<template>
	<div class="absence-timeline">
		<div class="timeline-header">
			<div class="timeline-name-col">{{ t('worktime', 'Mitarbeiter') }}</div>
			<div class="timeline-days">
				<div v-for="day in daysInMonth"
					:key="day.date"
					class="timeline-day-header"
					:class="{ weekend: day.isWeekend, holiday: day.isHoliday }"
					:title="day.isHoliday ? day.holidayName : ''">
					<span class="day-weekday">{{ day.weekdayShort }}</span>
					<span class="day-number">{{ day.dayNumber }}</span>
				</div>
			</div>
		</div>

		<div v-if="employees.length === 0" class="timeline-empty">
			{{ t('worktime', 'Keine Mitarbeiter sichtbar') }}
		</div>

		<div v-for="emp in employees"
			:key="emp.employeeId"
			class="timeline-row">
			<div class="timeline-name-col" :title="emp.employeeName">
				{{ emp.employeeName }}
			</div>
			<div class="timeline-days">
				<div v-for="day in daysInMonth"
					:key="day.date"
					class="timeline-cell"
					:class="{ weekend: day.isWeekend, holiday: day.isHoliday }">
					<div v-if="getAbsenceForDay(emp, day.date)"
						class="absence-bar"
						:class="'type-' + getAbsenceForDay(emp, day.date).type"
						:title="getAbsenceTooltip(getAbsenceForDay(emp, day.date))">
					</div>
				</div>
			</div>
		</div>

		<div class="absence-legend">
			<h3>{{ t('worktime', 'Abwesenheitstypen') }}</h3>
			<div class="legend-grid">
				<div v-for="item in activeLegendItems"
					:key="item.type"
					class="legend-item">
					<span class="legend-color" :class="'type-' + item.type"></span>
					<div class="legend-text">
						<strong>{{ item.label }}</strong>
						<span>{{ item.description }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AbsenceTimeline',
	props: {
		employees: {
			type: Array,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		month: {
			type: Number,
			required: true,
		},
		holidays: {
			type: Array,
			default: () => [],
		},
		showFullLegend: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		activeLegendItems() {
			const typeInfo = {
				vacation: { label: t('worktime', 'Urlaub'), description: t('worktime', 'Bezahlter Erholungsurlaub. Wird vom Urlaubskonto abgezogen.') },
				absent: { label: t('worktime', 'Abwesend'), description: t('worktime', 'Mitarbeiter ist abwesend. Grund ist nur für Vorgesetzte sichtbar.') },
				sick: { label: t('worktime', 'Krankheit'), description: t('worktime', 'Krankmeldung. Arbeitszeit gilt als geleistet, keine Urlaubstage.') },
				child_sick: { label: t('worktime', 'Kind krank'), description: t('worktime', 'Ihr Kind ist krank. Wie Krankheit, keine Urlaubstage.') },
				training: { label: t('worktime', 'Fortbildung'), description: t('worktime', 'Schulung, Seminar oder Konferenz. Zählt als Arbeitszeit.') },
				special: { label: t('worktime', 'Sonderurlaub'), description: t('worktime', 'Bezahlte Freistellung, z.B. Hochzeit, Umzug oder Trauerfall.') },
				compensatory: { label: t('worktime', 'Freizeitausgleich'), description: t('worktime', 'Überstunden als Freizeit nehmen. Reduziert die Soll-Stunden.') },
				unpaid: { label: t('worktime', 'Unbezahlter Urlaub'), description: t('worktime', 'Freistellung ohne Gehalt. Reduziert die Soll-Stunden.') },
			}
			// Privilegierte User (Admin/HR/Supervisor) sehen immer die volle Legende
			// ohne "Abwesend" (das ist nur die maskierte Anzeige für Kollegen)
			if (this.showFullLegend) {
				const types = ['vacation', 'sick', 'child_sick', 'special', 'training', 'unpaid', 'compensatory']
				return types.map(type => ({ type, ...typeInfo[type] }))
			}
			const usedTypes = new Set()
			this.employees.forEach(emp => {
				emp.absences.forEach(a => usedTypes.add(a.type))
			})
			return Array.from(usedTypes)
				.filter(type => typeInfo[type])
				.map(type => ({ type, ...typeInfo[type] }))
		},
		daysInMonth() {
			const days = []
			const date = new Date(this.year, this.month - 1, 1)
			const weekdays = [
					t('worktime', 'So'), t('worktime', 'Mo'), t('worktime', 'Di'),
					t('worktime', 'Mi'), t('worktime', 'Do'), t('worktime', 'Fr'),
					t('worktime', 'Sa'),
				]

			while (date.getMonth() === this.month - 1) {
				const dateStr = this.formatDate(date)
				const dayOfWeek = date.getDay()
				const holiday = this.holidays.find(h => h.date === dateStr)

				days.push({
					date: dateStr,
					dayNumber: date.getDate(),
					weekdayShort: weekdays[dayOfWeek],
					isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
					isHoliday: !!holiday,
					holidayName: holiday ? holiday.name : '',
				})
				date.setDate(date.getDate() + 1)
			}
			return days
		},
	},
	methods: {
		formatDate(date) {
			const y = date.getFullYear()
			const m = String(date.getMonth() + 1).padStart(2, '0')
			const d = String(date.getDate()).padStart(2, '0')
			return `${y}-${m}-${d}`
		},
		getAbsenceForDay(employee, dateStr) {
			return employee.absences.find(a => {
				return dateStr >= a.startDate && dateStr <= a.endDate
			})
		},
		getAbsenceTooltip(absence) {
			if (!absence) return ''
			const start = this.formatDisplayDate(absence.startDate)
			const end = this.formatDisplayDate(absence.endDate)
			const typeLabels = {
					vacation: t('worktime', 'Urlaub'),
					sick: t('worktime', 'Krankheit'),
					child_sick: t('worktime', 'Kind krank'),
					special: t('worktime', 'Sonderurlaub'),
					training: t('worktime', 'Fortbildung'),
					compensatory: t('worktime', 'Freizeitausgleich'),
					unpaid: t('worktime', 'Unbezahlter Urlaub'),
				}
			const typeLabel = typeLabels[absence.type] || absence.typeName
			return `${typeLabel}: ${start} - ${end}`
		},
		formatDisplayDate(dateStr) {
			const parts = dateStr.split('-')
			return `${parts[2]}.${parts[1]}.${parts[0]}`
		},
	},
}
</script>

<style scoped>
.absence-timeline {
	overflow-x: auto;
	font-size: 13px;
}

.timeline-header,
.timeline-row {
	display: flex;
	align-items: stretch;
	border-bottom: 1px solid var(--color-border);
}

.timeline-header {
	position: sticky;
	top: 0;
	background: var(--color-main-background);
	z-index: 1;
	font-weight: 600;
}

.timeline-name-col {
	min-width: 160px;
	max-width: 160px;
	padding: 6px 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	border-right: 1px solid var(--color-border);
	display: flex;
	align-items: center;
}

.timeline-days {
	display: flex;
	flex: 1;
}

.timeline-day-header {
	min-width: 32px;
	max-width: 32px;
	text-align: center;
	padding: 4px 0;
	display: flex;
	flex-direction: column;
	gap: 1px;
}

.timeline-day-header .day-weekday {
	font-size: 10px;
	color: var(--color-text-maxcontrast);
}

.timeline-day-header .day-number {
	font-size: 12px;
}

.timeline-cell {
	min-width: 32px;
	max-width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px;
}

.weekend,
.holiday {
	background-color: var(--color-background-dark);
}

.absence-bar {
	width: 100%;
	height: 20px;
	border-radius: 3px;
	cursor: default;
}

.type-vacation { background-color: #0082c9; }     /* Urlaub – blau */
.type-sick { background-color: #e74c3c; }         /* Krank – rot */
.type-child_sick { background-color: #f39c12; }   /* Kind krank – orange */
.type-training { background-color: #2ecc71; }     /* Fortbildung – gruen */
.type-special { background-color: #9b59b6; }      /* Sonderurlaub – lila */
.type-compensatory { background-color: #1abc9c; } /* Freizeitausgleich – tuerkis */
.type-unpaid { background-color: #34495e; }       /* Unbezahlt – dunkelblau */
.type-absent { background-color: #95a5a6; }       /* Abwesend (maskiert) – grau */

.timeline-empty {
	padding: 40px;
	text-align: center;
	color: var(--color-text-maxcontrast);
}

.absence-legend {
	margin-top: 24px;
	padding-top: 16px;
	border-top: 1px solid var(--color-border);
}

.absence-legend h3 {
	font-size: 15px;
	font-weight: 600;
	margin-bottom: 12px;
}

.legend-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 12px;
}

.legend-item {
	display: flex;
	align-items: flex-start;
	gap: 10px;
}

.legend-color {
	width: 12px;
	height: 12px;
	min-width: 12px;
	border-radius: 50%;
	margin-top: 3px;
}

.legend-text {
	display: flex;
	flex-direction: column;
	gap: 2px;
	font-size: 13px;
	line-height: 1.4;
}

.legend-text strong {
	font-weight: 600;
	color: var(--color-main-text);
}

.legend-text span {
	color: var(--color-text-maxcontrast);
}
</style>
