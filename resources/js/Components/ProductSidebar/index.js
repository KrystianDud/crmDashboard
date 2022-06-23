import React, { useState, useEffect } from 'react'
import './index.css'
import '../../../css/globals.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

import BorderLine from '../BorderLine'
import Button from '../Button'
import FileUpload from '../FileUpload'


export default function ProductSidebar({ getList, showSidebar, closeItem, newItem, showToast, productList, selectedProduct }) {

    const [product, setProduct] = useState({
        id: null,
        name: '',
        description: '',
        price: 0,
        prod_pic: ''
    })

    useEffect(() => {
        if (!newItem && selectedProduct) {
            let selectedProd = productList.filter(item => item.id == selectedProduct)[0]
            setProduct({
                id: selectedProd.id,
                name: selectedProd.name,
                description: selectedProd.description,
                price: selectedProd.price,
                prod_pic: selectedProd.slug
            })
        }
        else {
            setProduct({
                id: null,
                name: '',
                description: '',
                price: 0,
                prod_pic: ''
            })
        }
    }, [selectedProduct])

    const createProduct = (value, id) => {
        setProduct(prevState => ({
            ...prevState, [id]: value
        }));
    }

    const saveProduct = () => {
        // let img_file = new Blob()
        const data = new FormData()
        data.append('name', product.name)
        data.append('description', product.description)
        data.append('price', product.price)
        data.append('prod_pic', product.prod_pic, product.prod_pic.name)

        let url
        if (product.id) {
            url = `/api/products/${product.id}`
        }
        else {
            url = '/api/products'
        }
        axios(url, {
            method: `${product.id ? 'PUT' : 'POST'}`,
            data: data
        })
            .then((response) => {
                let message = 'New item was saved successfully!'
                showToast(message, 'Success')
                getList()
            })
            .catch(function (error) {
                let message = 'There was a problem with adding new product! Please try again later.'
                showToast(message, 'Danger')

                console.error(error.response.data.errors)
            });
    }

    return (
        <div className={`${showSidebar ? 'sidebarBody pInline5 flexColumn  h100 alignCenter  sideScreenShow' : 'sideScreenHide'}`}>

            <div>
                <div className='topSection' >
                    <div className={`closeSidebar ${showSidebar ? '' : 'hideClose'}`} onClick={() => closeItem()}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                </div>
                <BorderLine />
                <div className="w100">
                    <div className='flexColumn flexLeft w100 m5 product-head'>
                        <h4>Product creation</h4>
                        <p className='product-subtext'>Create or update product details.</p>
                    </div>
                </div>
                <BorderLine />

                <div className="w100 minH10vh">

                    <div className='flexColumn flexLeft w100 m5 product-stack'>
                        <p className='stack-heading'>Product name</p>
                        <p className='stack-thin'>Add name of product visible for everyone.</p>
                        {newItem ?
                            <input id='name' type='text' className='subtleInput' onChange={(e) => createProduct(e.target.value, e.target.id)} />
                            :
                            <input id='name' type='text' className='subtleInput' value={product.name} onChange={(e) => createProduct(e.target.value, e.target.id)} />
                        }
                    </div>

                    <h4 className="showTitle">{product.name}</h4>
                </div>

                <BorderLine />

                <div className="w100 minH10vh">

                    <div className='flexColumn flexLeft m5 product-stack' style={{ margin: '5px 0 5px 5px' }}>
                        <p className='stack-heading'>Product Description</p>
                        <p className='stack-thin'>Provide information about the product.</p>
                        {newItem ?
                            <textarea id='description' type='text' maxLength='200' rows='5' className='subtleInput ' onChange={(e) => createProduct(e.target.value, e.target.id)} />
                            :
                            <textarea id='description' type='text' maxLength='200' rows='5' className='subtleInput ' onChange={(e) => createProduct(e.target.value, e.target.id)} />
                        }
                    </div>

                    <p className="showTitle">{product.description}</p>
                </div>

                <BorderLine />

                <div className="w100 minH10vh m5">
                    {newItem ?
                        <div className="flexColumn flexLeft m5 product-stack">
                            <p className='stack-heading'>Product price</p>
                            <p className='stack-thin'>Set the price of a product before tax.</p>
                            <div className='productPriceInput'>
                                <span style={{ position: 'absolute' }}>
                                    <label className='placeSymbol'>£</label>
                                    <input type="number" min="1" max="10000" value={product.price} className="subtleInput" id="price" onChange={(e) => createProduct(e.target.value, e.target.id)} style={{ paddingLeft: '15px' }} />
                                </span>
                            </div>
                        </div>
                        :
                        <div className="flexColumn flexLeft m5 product-stack">
                            <p className='stack-heading'>Product price</p>
                            <p className='stack-thin'>{`Value: $${product.price}`}</p>
                        </div>}
                </div>

                <BorderLine />
                <div className="w100 minH10vh m5">
                    <div className="flexColumn flexLeft m5 product-stack">
                        <p className='stack-heading'>Image upload</p>
                        <p className='stack-thin'>Upload Image showing the product.</p>
                    </div>
                    <FileUpload
                        width='160px'
                        height='100px'
                        text='Drag and drop product image here.'
                        multiple={false}
                        format={'jpg png'}
                        showToast={showToast}
                        callback={createProduct}
                    />
                </div>


                <BorderLine />
            </div>

            <div className="w100" style={{ margin: 'auto' }}>
                <Button
                    text={'Update'}
                    type={'contained'}
                    disabled={false}
                    color={'normal'}
                    size={'lg'}
                    icon={null}
                    callback={() => saveProduct()}
                />
            </div>



        </div>
    )
} 