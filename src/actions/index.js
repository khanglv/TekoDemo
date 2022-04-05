import * as Types from '../types';

export const getListProducts = () => ({ type: Types.API_PRODUCT_ACTION });
export const setListProducts = (data) => ({ type: Types.API_PRODUCT_SUCCESS, data });

export const getListColors = () => ({ type: Types.API_COLORS_ACTION });
export const setListColors = (data) => ({ type: Types.API_COLORS_SUCCESS, data });