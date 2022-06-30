import React, { useState, useEffect, useContext } from 'react';

import './index.css';
import '../../css/globals.css'

import { faFilter, faList, faGripHorizontal } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
import Toast, { NewToast } from '../Components/Toast/Index';
import { UserDataContext } from '../app'
import { ToastContext } from '../app';

import ButtonRectangle from '../Components/IconButtons/ButtonRectangle';
import TwinButtonRectangle from '../Components/IconButtons/TwinButtonRectangle';
import CardList from '../Components/CardList';
import Button from '../Components/Button';
import ImageCard from '../Components/ImageCard/Index';
import Table from '../Components/Table';
import ProductSidebar from '../Components/ProductSidebar';


export default function Products({ updateCart, openModal, user }) {
    const { toastList, setToastList } = useContext(ToastContext);
    const { userData, setUserData } = useContext(UserDataContext);

    const [showDetails, setShowDetails] = useState(false);

    const [newItem, setNewItem] = useState(false);
    const [productList, setProductList] = useState([])
    const [productListTable, setProductListTable] = useState([])

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
    }, [openModal])

    const getList = () => {
        axios.get('/api/products', {
            'Content-Type': 'application/javascript'
        })
            .then((response) => {
                if (response.status == 200) {
                    // console.log(response.data)
                    setProductList(response.data.products);
                    setColumns(response.data.columns)


                    // This column list will be used behind the scenes and should not be displayed on the user screen
                    const columnQueue = ['slug', 'id', 'name', 'description', 'price', 'stock', 'options'];
                    let tempTableArray = [];

                    let data = response.data.products.forEach((item, index) => {
                        const len = Object.keys(item).length-1;
                        let key
                        for(let i = 0; i < len; i++){
                            key = Object.keys(item)[i]
                            console.log(item[key])
                            // console.log(key)
                            if(!columnQueue.includes(key)){
                                delete item[key]
                            }
                        } 
                        
                    })
                    console.log(data)

                    // setProductListTable(tableList)
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
                setToastList([...toastList, NewToast('The item was removed!', 'Success')])
                getList()
            })
            .catch(function (error) {
                setToastList([...toastList, NewToast('There was a problem with removing the item, try again later!', 'Danger')])
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
        setToastList([...toastList, NewToast(message, type)])
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

    const optionsProps = {
        text: 'View',
        type: 'contained',
        disabled: false,
        color: 'normal',
        size: 'sm',
        icon: null,
    }

    const displayProductsTable = (
        productList && columns ?
            <Table
                columns={columns}
                list={productList}

                showDetails={false}
                provideDetails={null}

                options={user.type == 'service' ? true : false}
                provideOptions={Button}
                optionsProps={optionsProps}
                defaultOptionFunction={true}
                optionFunction={null}
                sliderData={null}
            /> : null
    );



    // When the options are set to true on the table we can provide them in the parent
    // Due to the fact that not always table will have this functionality and also they might need
    // to be configured in different ways depending on the client and service needs
    const provideOptions = (
        <Button
            text={'View'}
            type={'contained'}
            disabled={false}
            color={'normal'}
            size={'sm'}
            icon={null}
            callback={() => editItem(index)}
        />
    );

    return (
        <div className='viewWindow flexRow'>
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