/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

function routePath(hash) {
    return (hash || '').replace(/^#/, '').split('?')[0]
}

// Vor dem Mount steht router.currentRoute noch auf "/", deshalb entscheidet die URL selbst.
export function shouldRestoreLastView(hash, savedView) {
    if (!savedView || savedView === '/') {
        return false
    }
    const path = routePath(hash)
    return path === '' || path === '/'
}

export function sectionFromHash(hash) {
    const match = (hash || '').match(/[?&]sec=([^&]+)/)
    return match ? decodeURIComponent(match[1]) : null
}

export function pickSection(fromUrl, ids, current = null) {
    if (fromUrl && ids.includes(fromUrl)) {
        return fromUrl
    }
    if (current && ids.includes(current)) {
        return current
    }
    return ids[0] || null
}

export function sectionHash(basePath, id) {
    return '#' + basePath + '?sec=' + encodeURIComponent(id)
}

// replaceState statt router.push: der Punktwechsel soll keinen eigenen Eintrag fuer "Zurueck" erzeugen.
export function writeSectionToUrl(basePath, id) {
    const target = sectionHash(basePath, id)
    if (typeof window !== 'undefined' && window.history?.replaceState && window.location.hash !== target) {
        window.history.replaceState(null, '', target)
    }
}
