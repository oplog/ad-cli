import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { merge, throttle } from "lodash";
import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { loadState, saveState } from "./utils";

export const history = createBrowserHistory();

export interface StoreState {
    // TODO: Add your redux store keys here 
    // Sample
    // user: { email: string; name: string; };
}

export function getInitialState(): StoreState {
    // Load state from disk
    const storageState = loadState();

    const memoryState: StoreState = {
        // TODO: Add your initial memory state here
        // Sample
        // user: { name: "", email: "" },
    };

    // Merge memory state with storage state
    // Storage state will override memory state
    return merge(memoryState, storageState);
}

export function rootReducer(state: StoreState, action: any) {
    return {
        // TODO: Add your reducers here
        // Sample
        // user: userReducer(state.user, action)
    };
}

export function initStore(): Store<StoreState> {

    const STORE_SAVE_INTERVAL = 500;
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const initialState = getInitialState();

    const store = createStore<StoreState>(
        connectRouter(history)(rootReducer),
        initialState,
        applyMiddleware(...middlewares),
    );

    store.subscribe(
        throttle(() => {
            saveState({
                // TODO: Add your stores which requires disk saving here
                // Sample
                // user: store.getState().user
            });
        }, STORE_SAVE_INTERVAL)
    );

    // Saga
    // TODO: Add your saga run statements here
    // Sample
    // sagaMiddleware.run(userSaga);

    return store;
}
