import React, { useState, useEffect, useContext } from 'react';

import './index.css';
import '../../css/globals.css'

import { faFilter, faList, faGripHorizontal } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import Toast, { newToast } from '../Components/Toast/Index';
import { UserDataContext } from '../app'
import { ToastContext } from '../app';

import ButtonRectangle from '../Components/IconButtons/ButtonRectangle';
import TwinButtonRectangle from '../Components/IconButtons/TwinButtonRectangle';
import CardList from '../Components/CardList';
import Button from '../Components/Button';
import ImageCard from '../Components/ImageCard/Index';
import Table from '../Components/Table';
import ProductSidebar from '../Components/ProductSidebar';


export default function Products({ updateCart }) {
    const { toastList, setToastList } = useContext(ToastContext);
    const { userData, setUserData } = useContext(UserDataContext);

    const [showDetails, setShowDetails] = useState(false);

    const [newItem, setNewItem] = useState(false);
    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    // The reason for hardcoded columns is becuase sometime there might be a 
    // chance that the name of the item for the table might have undescore which will result in bad UX
    const [columns, setColumns] = useState([
        {
            name: 'Name',
            keyName: 'name'
        },
        {
            name: 'Description',
            keyName: 'description'
        },
        {
            name: 'Price',
            keyName: 'price'
        },
        {
            name: 'Options',
            keyName: 'options'
        },
        {
            name: 'Stock',
            keyName: 'stock'
        }
    ])
    const [currentView, setCurrentView] = useState(1)

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        axios.get('/api/products', {
            'Content-Type': 'application/javascript'
        })
            .then((response) => {
                if (response.status == 200) {
                    setProductList(response.data);
                }
            })
    }

    const deleteProduct = (id) => {
        axios({
            method: 'DELETE',
            url: `/api/products/${id}`,
            headers: { 'content-type': 'application/json' },
        })
            .then((response) => {
                setToastList([...toastList, newToast('The item was removed!', 'Success')])
                getList()
            })
            .catch(function (error) {
                setToastList([...toastList, newToast('There was a problem with removing the item, try again later!', 'Danger')])
                console.error(error.response.data.errors)
            });
    }

    const addNewProduct = () => {
        setShowDetails(true);
        setNewItem(true);
        setSelectedProduct(null)
    }

    const closeItem = () => {
        setShowDetails(false)
        setSelectedProduct(null)
        setNewItem(false)
    }

    const editItem = (id) => {
        // With the api if the index is zero, that means the new product is meant to be created. Otherwise it will be update
        setShowDetails(true);
        setSelectedProduct(productList.filter((item, index) => index == id)[0])
        setNewItem(false)
        setSelectedProduct(id)
    }

    const viewType = (ref) => {
        setCurrentView(ref)
    }

    const filterList = () => {

    }

    const showToast = (type, message) => {
        setToastList([...toastList, newToast(message, type)])
    }

    const DisplayCardList = (
        <CardList
            list={productList}
            onClick={userData.type == 'service' ? editItem : updateCart}
            selectedCard={selectedProduct}
            showSidebar={showDetails}
            user={userData}
        />
    );

    const displayProductsTable = (
        <Table
            columns={columns}
            list={productList}
            showDetails={showDetails}
            options={true}
            editItem={editItem}
            onClick={userData.type == 'service' ? editItem : updateCart}
            user={userData}
        />
    );

    return (
        <div className='viewProducts'>
            <div className='mainView'>
                <h3 className='m5'>List of Items</h3>

                <div className={`flexRow flexCenter w100 m5 ${userData.type === 'service' ? 'flexBetween' : 'justifyEnd'} `}>
                    {userData.type === 'service' ? <Button
                        text={'Add New'}
                        type={'contained'}
                        disabled={false}
                        color={'normal'}
                        size={'lg'}
                        icon={null}
                        callback={() => addNewProduct()}
                    /> : null}

                    <div className='flexRow alignCenter'>
                        <ButtonRectangle
                            icon={faFilter}
                            onClick={filterList}
                        />
                        <TwinButtonRectangle
                            defaultView={currentView}
                            onClick={viewType}
                            iconOne={faList}
                            iconTwo={faGripHorizontal}
                        />
                    </div>
                </div>
                <div className='productList'>
                    {productList.length > 0 && currentView == 0 ? displayProductsTable : DisplayCardList}
                </div>
            </div>
            <ProductSidebar
                showSidebar={showDetails}
                closeItem={() => closeItem()}
                // Key props for the api  
                newItem={newItem}
                saveProduct={() => saveProduct()}
                showToast={showToast}
                getList={getList}
                productList={productList}
                selectedProduct={selectedProduct}
            />

        </div>
    )
} 