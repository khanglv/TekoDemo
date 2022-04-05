import { connect } from "react-redux";
import ProductList from './Product';
import * as actionTeko from '../../actions'

const mapStateToProps = state => {
    return {
        productState: state.productReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListProducts: () => dispatch(actionTeko.getListProducts()),
        getListColors: () => dispatch(actionTeko.getListColors()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);