import { capitalize } from "../string.utils";

export function generateSelectors(name: string): string {
    return (
        `
// TODO: Add your selector functions here
// Sample

/*
export function get${capitalize(name)}(state: User) {
    return state.data;
}
*/
`
    );
}

export function generateSelectorTests(name: string): string {
    return (
        `
describe("Store selectors -> ${name}", () => {
    it("should work correctly", () => {
        expect(false).toBeTruthy();
    });
});
`
    );
}
