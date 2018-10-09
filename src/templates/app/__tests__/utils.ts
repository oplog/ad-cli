import { StoreState } from "@store";
import { shallow } from "enzyme";
import * as React from "react";
import { Middleware, Store } from "redux";
import { default as configureStore } from "redux-mock-store";

export function createMockStore(state: StoreState, middlewares: Middleware[] = []): Store<StoreState> {
    const mockStore = configureStore(middlewares);
    return mockStore(state) as Store<StoreState>;
}

export function shallowWithStore<T>(component: React.ReactElement<T>, store: Store<StoreState>) {
    const context = {
        store,
    };

    return shallow(component, { context });
}