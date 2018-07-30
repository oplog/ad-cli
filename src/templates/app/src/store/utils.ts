export const STORE_KEY = "store.state";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(STORE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORE_KEY, serializedState);
    } catch (e) {
        // ignore errors
    }
};
