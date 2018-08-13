
export function capitalize(name: string) {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

export function lowerize(name: string) {
    return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
}

export function uppercase(name: string) {
    return `${name.toUpperCase()}`;
}
