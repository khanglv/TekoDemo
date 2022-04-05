import { useEffect, useState } from "react";
import { Alert, Button, Spin, Modal, notification, List, Avatar } from 'antd';
import TableReUp from './Table';
import { UploadOutlined } from '@ant-design/icons';
import './styles.scss';

const ProductList = ({ ...props })=>{
    const {
        getListProducts,
        productState,
        getListColors
    } = props;

    const {
        products,
        colors,
        isFetching
    } = productState;

    const [dataUpdate, setDataUpdate] = useState([])
    const [_isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        function loadData(){
            getListProducts();
            getListColors();
        }
        loadData()
    }, [])

    const reupProduct = ()=> {
        if(dataUpdate && dataUpdate.length > 0){
            setIsVisible(true)
        }else{
            notification['warning']({
                message: 'Notify',
                description:
                  'No data updated!!!',
            });
        }
    }

    const _onCloseModal = ()=>{
        setIsVisible(false)
    }

    const _onHandleAction = ()=>{
        console.log("Action in here!!!");
        setIsVisible(false)
    }

    const _updateNewData = (newData, action)=> {
        if(action === 'push'){
            setDataUpdate([
                ...dataUpdate,
                {...newData}
            ])
        }
        if(action === 'pop'){
            if(newData && dataUpdate && dataUpdate.length > 0){
                let dataUpdateTmp = dataUpdate.filter(item => item.id !== newData.id)
                setDataUpdate(dataUpdateTmp)
            }
        }
    }

    return(
        <Spin spinning={isFetching}>
            <ModalProductUpdated 
                isVisible={_isVisible}
                onCloseModal={_onCloseModal}
                onHandleAction={_onHandleAction}
                data={dataUpdate}
            />
            <div className="re-upload-product">
                <div className="__header">
                    <div className="pt-15">
                        <Alert message="Re-upload Error Products" type="warning" />
                    </div>
                    <div className="pt-15">
                        <Button type="primary" icon={<UploadOutlined />} onClick={reupProduct}>
                            Submit
                        </Button>
                    </div>
                </div>
                <div className="mt-15">
                    <TableReUp products={products} colors={colors} updateNewData={_updateNewData}/>
                </div>
                
            </div>
        </Spin>
    )
}

const ModalProductUpdated = ({...props})=>{
    const {
        isVisible,
        onCloseModal,
        onHandleAction,
        data
    } = props;

    const handleOk = () => {
        onHandleAction();
    };

    const handleCancel = () => {
        onCloseModal();
    };

    return (
        <>
            <Modal
                title="Re-uploaded Products"
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} size={100}/>}
                            title={item.name}
                            description={<div>
                                <div>ID: <b>{item.id}</b></div>
                                <div>SKU: <b>{item.sku}</b></div>
                                <div>Color: <b>{item.color}</b></div>
                            </div>}
                        />
                    </List.Item>
                    )}
                />
            </Modal>
        </>
    );
}

export default ProductList;