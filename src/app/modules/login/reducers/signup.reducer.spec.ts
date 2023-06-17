import { reducer, initialState } from "@modules/login/reducers/signup.reducer";

describe("Signup Reducer", () => {
    describe("unknown action", () => {
        it("should return the initial state", () => {
            const action = {} as any;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
