import { capitalize, uppercase } from "../string.utils";

export function generateReducer(name: string) {
    return (
    `
import { Set${capitalize(name)}, ${capitalize(name)}Action } from "./actions";
import { REMOVE_${uppercase(name)}, SET_${uppercase(name)} } from "./constants";

export function ${name}Reducer(state: any = {}, action: ${capitalize(name)}Action) {
    switch (action.type) {
        case SET_${uppercase(name)}:
            return (action as Set${capitalize(name)}).payload;
        case REMOVE_${uppercase(name)}:
            return undefined;
        default:
            return state;
    }
}
`
    );
}
