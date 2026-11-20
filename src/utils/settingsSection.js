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
    if (!match) {
        return null
    }
    try {
        return decodeURIComponent(match[1])
    } catch {
        return null
    }
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

// replaceState statt router.push: kein eigener Zurueck-Eintrag; history.state bleibt fuer den Router erhalten
export function writeSectionToUrl(basePath, id) {
    const target = sectionHash(basePath, id)
    if (typeof window !== 'undefined' && window.history?.replaceState && window.location.hash !== target) {
        window.history.replaceState(window.history.state, '', target)
    }
}
