export function generateConstants(name: string) {
    return (
        `
export const SET_${name} = "SET_${name}";
export type SET_${name} = typeof SET_${name};

export const REMOVE_${name} = "REMOVE_${name}";
export type REMOVE_${name} = typeof REMOVE_${name};
`
    );
}
