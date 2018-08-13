import { capitalize, uppercase } from "../string.utils";

export function generateActions(name: string) {
    return (
        `
import * as constants from "./constants";

export interface Set${capitalize(name)} {
    type: constants.SET_${uppercase(name)};
    payload: any;
}

export interface Remove${capitalize(name)} {
    type: constants.REMOVE_${uppercase(name)};
}

export type ${capitalize(name)}Action = Set${capitalize(name)} | Remove${capitalize(name)};

export function set${capitalize(name)}(payload: any): Set${capitalize(name)} {
    return {
        payload,
        type: constants.SET_${uppercase(name)},
    };
}

export function remove${capitalize(name)}(): Remove${capitalize(name)} {
    return {
        type: constants.REMOVE_${uppercase(name)},
    };
}
`
    );
}

export function generateActionsTest(name: string): string {
    return (
        `
describe("Store actions -> ${name}", () => {
    it("should generate actions", () => {
        expect(false).toBeTruthy();
    });
});
`
    );
}
