import { capitalize, uppercase } from "../string.utils";

export function generateSaga(name: string) {
    return (
    `
// TODO: Add saga middleware definition to store/index.ts
// import { put, takeEvery, call } from "redux-saga";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetch${capitalize(name)}(action) {
//     try {
//         // TODO: make your api call here
//         //const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({ type: "${uppercase(name)}_FETCH_SUCCEEDED", ${name}: ${name} });
//     } catch (e) {
//         yield put({ type: "${uppercase(name)}_FETCH_FAILED", message: e.message });
//     }
// }

/*
  Starts fetchUser on each dispatched \`${uppercase(name)}_FETCH_REQUESTED\` action.
  Allows concurrent fetches of user.
*/
// function* ${name}Saga() {
//     yield takeEvery("${uppercase(name)}_FETCH_REQUESTED", fetch${capitalize(name)});
// }

`
    );
}

export function generateSagaTest(name: string): string {
    return (
        `
describe("Store saga -> ${name}", () => {
    it("should work correctly", () => {
        expect(false).toBeTruthy();
    });
});
`
    );
}
