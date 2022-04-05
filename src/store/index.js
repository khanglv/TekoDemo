import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import myReducer from '../reducers/index';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();
let paramsCreateStore;
paramsCreateStore= createStore(
    myReducer,
    applyMiddleware(sagaMiddleware)
  )

sagaMiddleware.run(rootSaga);
export default paramsCreateStore;
