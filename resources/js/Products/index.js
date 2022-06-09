import React, { useState, useEffect, useContext } from 'react';

import './index.css';
import '../../css/globals.css'

import { faFilter, faList, faGripHorizontal } from '@fortawesome/free-solid-svg-icons'


import ImageCard from '../Components/ImageCard/Index';
import Table from '../Components/Table';

import ProductSidebar from '../Components/ProductSidebar';
import axios from 'axios';

import Toast, { newToast } from '../Components/Toast/Index';
import { ToastContext } from '../App';

import ButtonRectangle from '../Components/IconButtons/ButtonRectangle';
import TwinButtonRectangle from '../Components/IconButtons/TwinButtonRectangle';
import CardList from '../Components/CardList';

export default function Products() {
    const { toastList, setToastList } = useContext(ToastContext);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [newItem, setNewItem] = useState(false);
    const [productList, setProductList] = useState([])
    const [currentItem, setCurrentItem] = useState({
        id: null,
        name: '',
        description: '',
        price: 0,
        slug: ''
    })

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
        }
    ])
    const [currentView, setCurrentView] = useState(1)

    useEffect(() => {
        getList()

        return () => {
            setCurrentItem({
                name: '',
                description: '',
                price: 0,
                slug: ''
            })
        }
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

    const saveProduct = () => {
        // check if new or existing product
        let method = 'POST'
        let url = '/api/products'
        let data = JSON.stringify({
            name: currentItem.name,
            description: currentItem.description,
            price: currentItem.price,
            slug: currentItem.slug
        })

        if (currentItem.id != null) {
            method = 'PUT'
            url = `/api/products/${currentItem.id}`
        }

        axios({
            method: method,
            url: url,
            headers: { 'content-type': 'application/json' },
            data: data
        })
            .then((response) => {
                let message = 'New item was saved successfully!'
                setToastList([...toastList, newToast(message, 'Success')])

                getList()
            })
            .catch(function (error) {
                let message = 'There was a problem with adding new product! Please try again later.'
                setToastList([...toastList, newToast(message, 'Danger')])

                console.error(error.response.data.errors)
            });
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
        setCurrentItem({
            id: null,
            name: '',
            description: '',
            price: 0,
            slug: 'x'
        });
        setShowDetails(true);
        setNewItem(true);
        setSelectedCard(null)
    }

    const closeItem = () => {
        setShowDetails(false)
        setSelectedCard(null)
        setNewItem(false)
    }

    const editItem = (id) => {
        // With the api if the index is zero, that means the new product is meant to be created. Otherwise it will be update
        setShowDetails(true);
        setSelectedCard(id);

        setCurrentItem(productList.filter((item, index) => index == id)[0])
        setNewItem(false)
    }

    const buyItem = () => {
        console.log('Item added to the Basket')
    }

    const createProduct = (value, id) => {
        setCurrentItem({ ...currentItem, [id]: value })
    }

    const viewType = (ref) => {
        setCurrentView(ref)
    }

    const filterList = () => {

    }

    const DisplayCardList = (
        <CardList
            list={productList}
            editItem={editItem}
            selectedCard={selectedCard}
            showSidebar={showDetails}
        />
    );

    const displayProductsTable = (
        <Table
            columns={columns}
            list={productList}
            showDetails={showDetails}
            options={true}
            editItem={editItem}
            buyItem={buyItem}
        />
    );

    return (
        <div className='viewProducts'>
            <div className='mainView'>
                <h3 className='m5'>List of Items</h3>

                <div className="flexRow flexCenter w100 m5 flexBetween">
                <button className='bMain' onClick={() => addNewProduct()}>Add New</button>

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

            <div className='sideScreen'>
                <ProductSidebar
                    showSidebar={showDetails}
                    closeItem={() => closeItem()}

                    // Key props for the api  
                    currentItem={currentItem}
                    newItem={newItem}
                    createProduct={createProduct}
                    saveProduct={() => saveProduct()}
                />
            </div>

        </div>
    )
} 