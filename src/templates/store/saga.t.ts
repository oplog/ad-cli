
export function generateSaga(name: string) {
    return (
    `
// import { put, takeEvery, call } from "redux-saga";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
//     try {
//         // TODO: make your api call here
//         //const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
//     } catch (e) {
//         yield put({ type: "USER_FETCH_FAILED", message: e.message });
//     }
// }

/*
  Starts fetchUser on each dispatched \`USER_FETCH_REQUESTED\` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
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
