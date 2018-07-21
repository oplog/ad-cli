import {
    RESOURCE_FETCH_FAILED,
    RESOURCE_FETCH_REQUESTED,
    RESOURCE_FETCH_SUCCEEDED
} from "./constants";

export type ResourceType = string;

export interface ResourceFetchRequested {
    type: RESOURCE_FETCH_REQUESTED,
    payload: {
        type: ResourceType;
        params?: any;
    };
}

export interface ResourceFetchSucceeded {
    type: RESOURCE_FETCH_SUCCEEDED,
    payload: {
        type: ResourceType;
        data: any;
    };
}

export interface ResourceFetchFailed {
    type: RESOURCE_FETCH_FAILED,
    payload: {
        type: ResourceType;
        error: Error;
    };
}

export type ResourceAction = ResourceFetchRequested | ResourceFetchFailed | ResourceFetchSucceeded;

export function resourceFetchRequested(type: ResourceType, params = {}): ResourceFetchRequested {
    return {
        payload: {
            params,
            type
        },
        type: RESOURCE_FETCH_REQUESTED,
    };
}

export function resourceFetchSucceeded(type: ResourceType, data = {}): ResourceFetchSucceeded {
    return {
        payload: {
            data,
            type
        },
        type: RESOURCE_FETCH_SUCCEEDED
    };
}

export function resourceFetchFailed(type: ResourceType, error: Error): ResourceFetchFailed {
    return {
        payload: {
            error,
            type
        },
        type: RESOURCE_FETCH_FAILED
    };
}
