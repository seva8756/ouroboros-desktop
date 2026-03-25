function normalizePrefix(rawPrefix) {
    if (!rawPrefix) {
        return '';
    }
    let prefix = String(rawPrefix).trim();
    if (!prefix) {
        return '';
    }
    if (!prefix.startsWith('/')) {
        prefix = `/${prefix}`;
    }
    while (prefix.length > 1 && prefix.endsWith('/')) {
        prefix = prefix.slice(0, -1);
    }
    return prefix;
}

function detectPrefixFromPathname(pathname) {
    const match = pathname.match(/^\/ouroboros\/[^/]+/);
    return match ? match[0] : '';
}

const explicitPrefix = typeof window !== 'undefined' ? window.__OUROBOROS_PATH_PREFIX__ : '';
export const PATH_PREFIX = normalizePrefix(explicitPrefix) || detectPrefixFromPathname(location.pathname);

export function withPrefix(path) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${PATH_PREFIX}${normalizedPath}`;
}

export function apiUrl(path) {
    return withPrefix(path);
}

export function wsUrl(path) {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${location.host}${withPrefix(path)}`;
}

