import { UserAction } from "./actions";
import { REMOVE_USER, SET_USER } from "./constants";

export function userReducer(state: any = {}, action: UserAction) {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case REMOVE_USER:
            return undefined;
        default:
            return state;
    }
}
