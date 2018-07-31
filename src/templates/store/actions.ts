import * as constants from "./constants";

export interface SetUser {
    type: constants.SET_USER;
    payload: any;
}

export interface RemoveUser {
    type: constants.REMOVE_USER;
}

export type UserAction = SetUser | RemoveUser;

export function setUser(payload: any): SetUser {
    return {
        type: constants.SET_USER,
        payload,
    };
}

export function removeUser(): RemoveUser {
    return {
        type: constants.REMOVE_USER,
    };
}