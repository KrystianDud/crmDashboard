import { createRoot } from 'react-dom/client';
import React, { createContext, useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

import '../css/globals.css'
import './app.css';
import '../css/mainApp.css'

import Login from './Login/index';

import Dashboard from './Dashboard/Dashboard';
import Orders from './Orders/Index';

import Sidebar from './Sidebar/Index'
import Navbar from './NavBar/NavBar'
import Products from './Products/index'
import Toast from './Components/Toast/Index';
import Modal from './Components/Modal';
import Messages from './Messages';
import Overview from './Overview/index'
import axios from 'axios';

import { NewToast } from './Components/Toast';
import RegisterView from './Components/Login/RegisterView';
import UserDetails from './Components/Modal/ModalBody/UserDetails';

export const ToastContext = createContext({
    toastList: [],
    setToastList: () => []
});

export const UserDataContext = createContext({
    userData: {},
    setUserData: () => []
});

export const CompanyDataContext = createContext({
    companyData: [],
    setCompanyData: () => []
});

function App() {
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
    const [companyData, setCompanyData] = useState({})

    const [section, setSection] = useState(0)
    const [toastList, setToastList] = useState([])


    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState({});

    const [shoppingCart, setShoppingCart] = useState([])

    const toastState = useMemo(
        () => ({ toastList, setToastList }),
        [toastList]
    );

    const userDataState = useMemo(
        () => ({ userData, setUserData }),
        [userData]
    );

    const companyDataState = useMemo(
        () => ({ companyData, setCompanyData }),
        [companyData]
    );

    useEffect(() => {
        // do auth check on page load. if not here the page will route to login page
        // if (userAuth) {
        // getUserData();
        // }

        

        switch (window.location.pathname) {
            case "/":
                setSection(0)
                break;
            case "/Orders":
                setSection(1)
                break;
            case "/Products":
                setSection(2)
                break;
            case "/Overview":
                setSection(3)
                break;
            case "/Customer":
                setSection(4)
                break;
                setSection(5)
            case "/Message":
                setSection(6)
                break;
            case "/Settings":
                setSection(7)
                break;
        }
    }, [])

    useEffect(() => {
        getCompany()
    }, [userData.company_id])
    

    const getCompany = () => {
        let companyItems = JSON.parse(localStorage.getItem('companyData'));
        if ((userAuth) && isEmpty(companyItems) && userData.company_id) {
            axios.get(`api/get_company/${userData.company_id}`)
                .then((response) => {
                    setCompanyData(response.data);
                })
                .catch((error) => {
                    let message = 'Could not update company data!'
                    setToastList([...toastList, NewToast(message, 'Danger')])
                })
        }
        else {
            setCompanyData(companyItems)
        }
    }

    const getUserData = () => {
        axios.get(`api/get_user/${userData.id}`)
            .then((response) => {
                console.log
                setUserData(response.data.response)
                localStorage.setItem('userData', JSON.stringify(response.data.response))
            })
    }

    // Function from the Login component once user logs in
    const processUser = (userData) => {
        // Before user can start journey, they should be asked few more details to complete the user profile. only then the user data can be saved and state updated.
        // toast={setToastList([...toastList, NewToast('File uploaded successfully, 'Success')])}
        if (typeof userData.avatar == 'undefined' && typeof userData.position == 'undefined') {
            let modalData = {
                sendRequest: (data, callback) => { 
                    axios.post(`api/update_user/${userData.id}?_method=put`, data)
                        .then((response) => { 
                            if (response.status === 200) {
                                let updateData = response.data.response;
                                if (updateData.privilege === 'admin') {
                                    updateData.reminderContext = ['company']
                                }
                                else {
                                    updateData.reminderContext = []
                                }
                                localStorage.setItem('userData', JSON.stringify(response.data.response))
                                setUserData(response.data.response);
                                callback(response.data.message)
                            }
                        })
                        .catch((error) => {
                            console.log(error, ' data: ', data)
                        })
                        .then(() => {
                        })
                },
                title: 'User Details',
                confirmationMessage: 'Complete',
                cancelMessage: 'Dismiss',
                component: <UserDetails
                    user={userData}
                    showToast={() => setToastList([...toastList, NewToast('File uploaded successfully', 'Success')])}
                />,
                width: '50%',
                activationData: ['name, surname']
            }
            activateModal(modalData)
        }
        else {
            localStorage.setItem('auth', JSON.stringify(true))
            setUserAuth(true);
        }
        getCompany();
    }

    // opens on Click from components that need modal to display data
    const activateModal = (data) => {
        // update component responsible for the modal content
        setModalData(data)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const processData = (message, api) => {
        localStorage.setItem('auth', JSON.stringify(true))
        setUserAuth(true);

        setOpenModal(false)
        setModalData({});

        if(typeof api != 'undefined' && api === 'api/orders'){
            setShoppingCart([])
        }

        // let message = 'Company information was saved successfully!'
        setToastList([...toastList, NewToast(message, 'Success')])
    }

    const getDirectory = (id) => {
        setSection(id)
    }

    const logoutUser = () => {
        // Logout should occur on timeout but also by the user.
        // Clear local storage of user data to return to login page 
        // but make it remember that this computer does not need registration
        const userItems = JSON.parse(localStorage.getItem('userData'));
        localStorage.removeItem('userData');
        localStorage.removeItem('auth');
        console.info('user Data has been cleared', JSON.parse(localStorage.getItem('userData')));
        setUserData({})
        setUserAuth(false)
    }

    const updateShoppingCart = (product, func='add') => {
        let elementPos = ''
        // check if given product exists in the list
        if (shoppingCart.some(item => item.id == product.id)) {
            elementPos = shoppingCart.map((item) => item.id).indexOf(product.id);
        }

        let list
        if (func == 'remove') {
            list = shoppingCart.filter(item => item.id == product.id);
        }
        else if (func == 'add') {
            // using cart controllers to manipulate quantity
            if (typeof elementPos == 'number') {
                let array = shoppingCart;
                array[elementPos].quantity++;
                setShoppingCart(array)
            }
            // standard on Click from the product view
            else {
                list = product;
                list.quantity = 1
                setShoppingCart([...shoppingCart, list])
            }
            // when user click on the same 'buy' button again, the item in the cart will increase the value rather than add the new one.
        }
        else if (func == 'minus') {
            // using cart controllers to manipulate quantity
            let array = shoppingCart;
            if (array[elementPos].quantity > 1) {
                array[elementPos].quantity--;
                setShoppingCart(array)
            }
            else {
                list = array.filter(item => item.id != product.id)
                if (typeof list === 'undefined' || list.length < 1) setShoppingCart([])
                else {
                    setShoppingCart(list)
                }
            }
        }
        else {
            let newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                slug: product.slug,
                quantity: 1,
            }
            setShoppingCart([...shoppingCart, newProduct])
        }
    }

    return (
        // <React.StrictMode>
        <ToastContext.Provider value={toastState}>
            <UserDataContext.Provider value={userDataState} >
                <CompanyDataContext.Provider value={companyDataState}>
                    <div className="App" >
                        <Router >
                            {userAuth && userData ?
                                <Navbar
                                    section={section}
                                    logoutUser={logoutUser}
                                    shoppingCart={shoppingCart}
                                    updateCart={updateShoppingCart}
                                    user={userData}
                                    company={companyData}
                                    activateModal={activateModal}
                                /> : null
                            }
                            <div className="view">

                                {userAuth ?
                                    <Sidebar
                                        getDirectory={getDirectory}
                                        section={section}
                                    /> : null
                                }
                                <Routes>
                                    <Route path="/" element={userAuth ? <Dashboard user={userData} activateModal={activateModal} /> : <Navigate to="login" />} />
                                    <Route path="orders" element={userAuth ? <Orders user={userData} /> : <Navigate to="login" />} />
                                    <Route path="products" element={userAuth ? <Products user={userData} updateCart={updateShoppingCart} openModal={openModal} /> : <Navigate to="login" />} />
                                    <Route path="overview" element={userAuth ? <Overview user={userData} /> : <Navigate to="login" />} />
                                    <Route path="customer" element={userAuth ? <Dashboard user={userData} /> : <Navigate to="login" />} />
                                    <Route path="message" element={userAuth ? <Messages user={userData} /> : <Navigate to="login" />} />
                                    <Route path="settings" element={userAuth ? <Dashboard user={userData} /> : <Navigate to="login" />} />

                                    <Route path="/register:comapny_id" element={userAuth ? <Navigate to="/" /> : <Login processUser={processUser} />} />
                                    <Route path="/login" element={userAuth ? <Navigate to="/" /> : <Login processUser={processUser} />} />
                                    <Route path="/register" element={userAuth ? <Navigate to="/" /> : <Login processUser={processUser} />} />
                                    <Route path={`/register/:id`} element={<Login processUser={processUser} block={true} />} />
                                </Routes>

                            </div>
                        </Router>

                        <Toast
                            toastList={toastList}
                            autoDelete={true}
                            autoDeleteTime={3000}
                        />
                        {openModal && !isEmpty(modalData) ?
                            <Modal
                                sendRequest={modalData.sendRequest}
                                title={modalData.title}
                                confirmationMessage={modalData.confirmationMessage}
                                cancelMessage={modalData.cancelMessage}
                                BodyComponent={modalData.component}
                                onAccept={processData}
                                onClose={closeModal}
                                widthSize={modalData.width}
                            /> : null
                        }
                    </div>
                </CompanyDataContext.Provider>
            </UserDataContext.Provider>
        </ToastContext.Provider>
        // </React.StrictMode> 
    );
};

const root = createRoot(document.getElementById('main'));
root.render(<App />); 