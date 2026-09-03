import { departmentFilterOptions, matchesDepartment, NO_DEPARTMENT } from '../../src/utils/departmentFilter.js'

/**
 * Security lock for the #570 P2 department filter. The filter must only ever
 * NARROW an already permission-scoped list — never widen it and never reveal a
 * department outside the caller's scope. That guarantee lives in two places:
 *
 *  - departmentFilterOptions derives its options ONLY from the items passed in
 *    (the already-scoped, visible set), never from a global department list, so
 *    a supervisor can never see another department in the control.
 *  - matchesDepartment is a pure subset predicate.
 */

const nameOf = (id) => ({ 1: 'Vertrieb', 2: 'Technik', 9: 'Geheim' }[id] || 'Abteilung')

describe('departmentFilterOptions', () => {
	const items = [
		{ id: 'a', dept: 1 },
		{ id: 'b', dept: 1 },
		{ id: 'c', dept: 2 },
		{ id: 'd', dept: null },
	]
	const opts = departmentFilterOptions(items, (i) => i.dept, nameOf, 'Ohne Abteilung')

	it('offers only departments present in the visible items, sorted by label, plus the unassigned bucket last', () => {
		expect(opts).toEqual([
			{ id: 2, label: 'Technik' },
			{ id: 1, label: 'Vertrieb' },
			{ id: NO_DEPARTMENT, label: 'Ohne Abteilung' },
		])
	})

	it('never offers a department absent from the scoped items (no leak)', () => {
		// Department 9 ("Geheim") exists globally but is not in `items`.
		expect(opts.some((o) => o.id === 9)).toBe(false)
	})

	it('omits the unassigned bucket when every item has a department', () => {
		const o = departmentFilterOptions([{ dept: 1 }], (i) => i.dept, nameOf, 'Ohne Abteilung')
		expect(o).toEqual([{ id: 1, label: 'Vertrieb' }])
	})

	it('returns an empty list for no items', () => {
		expect(departmentFilterOptions([], (i) => i.dept, nameOf, 'Ohne Abteilung')).toEqual([])
	})
})

describe('matchesDepartment', () => {
	it('passes everything when no filter is set (null)', () => {
		expect(matchesDepartment(1, null)).toBe(true)
		expect(matchesDepartment(null, null)).toBe(true)
	})

	it('matches only the unassigned when filter is NO_DEPARTMENT', () => {
		expect(matchesDepartment(null, NO_DEPARTMENT)).toBe(true)
		expect(matchesDepartment(undefined, NO_DEPARTMENT)).toBe(true)
		expect(matchesDepartment(1, NO_DEPARTMENT)).toBe(false)
	})

	it('matches exact department id otherwise', () => {
		expect(matchesDepartment(2, 2)).toBe(true)
		expect(matchesDepartment(1, 2)).toBe(false)
		expect(matchesDepartment(null, 2)).toBe(false)
	})
})
