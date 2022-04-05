export function sagaWrapper(saga, errorHandle) {
    return function* (action) {
        try {
            yield saga(action);
        } catch (e) {
            yield errorHandle(e, action)
        }
    };
}