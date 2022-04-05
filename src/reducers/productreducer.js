import * as Types from '../types';

const initialState = {
    isFetching: false,
    products: [],
    colors: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Types.API_PRODUCT_ACTION:
            return { ...state, isFetching: true };
        case Types.API_PRODUCT_SUCCESS:
            return { ...state, products: action.data, isFetching: false };
        case Types.API_PRODUCT_FAIL:
            return { ...state, isFetching: false };

        case Types.API_COLORS_ACTION:
            return { ...state, isFetching: true };
        case Types.API_COLORS_SUCCESS:
            return { ...state, colors: action.data, isFetching: false };
        case Types.API_COLORS_FAIL:
            return { ...state, isFetching: false };

        default: 
            return state
    }
}