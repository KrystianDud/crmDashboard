import React, { useState, useEffect, useContext } from 'react';

import './index.css';
import '../../css/globals.css'

import ImageCard from '../Components/ImageCard/Index';
import ProductSidebar from '../Components/ProductSidebar';
import axios from 'axios';

import Toast, { newToast } from '../Components/Toast/Index';
import { ToastContext } from '../App';

export default function Products() {
    const { toastList, setToastList } = useContext(ToastContext);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedCard, setSelectedCard] = useState(0);
    const [newItem, setNewItem] = useState(false);
    const [productList, setProductList] = useState([])
    const [currentItem, setCurrentItem] = useState({
        id: null,
        name: '',
        description: '',
        price: 0,
        slug: ''
    })

    useEffect(() => {
        getList()

        return () => {
            // setProductList([])

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
        setCurrentItem(productList.filter(item => item.id == id)[0])
    }




    const createProduct = (value, id) => {
        setCurrentItem({ ...currentItem, [id]: value })
    }



    return (
        <div className='viewProducts'>
            <div className='mainProductView'>
                <div className="flexRow flexCenter w100 m5 flexAround">
                    <h3 className='m5'>List of Items</h3>
                    <button className='bMain' onClick={addNewProduct}>Add New</button>
                </div>
                <div className='productList'>
                    {productList.length ? productList.map((item, index) => (
                        <ImageCard
                            key={'product' + item.id}
                            onClose={() => closeItem()}
                            // img={ }
                            heading={item.name}
                            subtitle={item.description}
                            price={item.price}

                            edit={() => editItem(item.id)}
                            deleteProduct={deleteProduct}

                            showSidebar={showDetails}
                            selectedCard={selectedCard}
                            id={item.id}
                        />
                    )) : null}
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