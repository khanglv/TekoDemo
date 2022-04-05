import { call, put, fork, takeLatest, all } from 'redux-saga/effects'
import { message } from 'antd';
import * as Types from '../types';
import * as apiService from '../api/apiService';
import * as Func from "../helpers/functions";
import { setListProducts, setListColors } from '../actions';

function* getListProducts() {
    try {
        const result = yield call(apiService.getListProducts);
        yield put(setListProducts(result));
    } catch (e) {
        yield put({ type: Types.API_PRODUCT_FAIL, message: e.message });
        message.error(`Cann't load data from server. Please contact admin!`);;
    }
}

function* getListColors() {
    try {
        const result = yield call(apiService.getListColors);
        yield put(setListColors(result));
    } catch (e) {
        yield put({ type: Types.API_COLORS_FAIL, message: e.message });
        message.error(`Cann't load data from server. Please contact admin!`);;
    }
}

export function* productSaga() {
    yield all([
        fork(getListProducts),
        fork(getListColors)
    ])
}
