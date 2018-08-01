import { uppercase } from "../string.utils";

export function generateConstants(name: string) {
    return (
        `
export const SET_${uppercase(name)}: string = "SET_${uppercase(name)}";
export type SET_${uppercase(name)} = typeof SET_${uppercase(name)};

export const REMOVE_${uppercase(name)}: string = "REMOVE_${uppercase(name)}";
export type REMOVE_${uppercase(name)} = typeof REMOVE_${uppercase(name)};
`
    );
}
