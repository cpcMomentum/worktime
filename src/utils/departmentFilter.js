/**
 * Client-side department filter helpers (#570 Phase 2).
 *
 * The department filter ALWAYS operates as a subset of an already
 * permission-scoped list. Its options are derived from the items that are
 * actually visible — never from a global department list — so a supervisor
 * only ever sees the departments present in their own scope and the filter
 * can only narrow, never widen or reveal.
 */

/** Sentinel filter value for the "no department" bucket. */
export const NO_DEPARTMENT = 0

/**
 * Build filter options from the departments actually present in `items`.
 *
 * @param {Array} items visible, already-scoped items
 * @param {Function} getDeptId (item) => number|null|undefined
 * @param {Function} nameOf (departmentId) => string
 * @param {string} noneLabel label for the unassigned bucket
 * @return {Array<{id: number, label: string}>}
 */
export function departmentFilterOptions(items, getDeptId, nameOf, noneLabel) {
    const usedIds = new Set()
    let hasNone = false
    for (const it of items) {
        const id = getDeptId(it)
        if (id == null) {
            hasNone = true
        } else {
            usedIds.add(id)
        }
    }
    const options = [...usedIds]
        .map(id => ({ id, label: nameOf(id) }))
        .sort((a, b) => a.label.localeCompare(b.label))
    if (hasNone) {
        options.push({ id: NO_DEPARTMENT, label: noneLabel })
    }
    return options
}

/**
 * Whether an item's department matches the active filter.
 *
 * @param {number|null|undefined} deptId the item's department id
 * @param {number|null} filterId null = no filter; NO_DEPARTMENT = unassigned; else exact match
 * @return {boolean}
 */
export function matchesDepartment(deptId, filterId) {
    if (filterId === null) {
        return true
    }
    if (filterId === NO_DEPARTMENT) {
        return deptId == null
    }
    return deptId === filterId
}
