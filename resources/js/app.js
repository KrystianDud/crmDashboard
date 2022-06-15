import { createRoot } from 'react-dom/client';
import React, { createContext, useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
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
import axios from 'axios';

import { newToast } from './Components/Toast';

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
    const [scrren, setScreen] = useState({ x: window.innerWidth, y: window.innerHeight })
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    const [section, setSection] = useState(0)
    const [toastList, setToastList] = useState([])

    const [userData, setUserData] = useState({})
    const [companyData, setCompanyData] = useState({})

    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState({
        title: '',
        confirmationMessage: '',
        cancelMessage: '',
        component: ''
    });

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
        // setToastList([...toastList, newToast('test message', 'warning')])

        // do auth check on page load. if not here the page will route to login page
        let userAuthVar
        if (!userAuth) {
            let auth = JSON.parse(localStorage.getItem('auth'));
            console.log(auth)
            if (auth) {
                setUserAuth(true);
                userAuthVar = auth;
            }
        }

        // update session from the storage if available, otherwise ask to login.
        let userItems = JSON.parse(localStorage.getItem('userData'));
        if (!isEmpty(userItems)) {
            console.log('user Data from storage', userItems);
            setUserData(userItems)
        }
        console.log(companyData)
        let companyItems = JSON.parse(localStorage.getItem('companyData'));
        if (userAuthVar && isEmpty(companyItems)) {
            axios.get(`api/get_company/${userItems.company_id}`)
                .then((response) => {
                    console.log('getting company data', response);
                    setCompanyData(response.data);
                })
                .catch((error) => {
                    let message = 'Could not update company data!'
                    setToastList([...toastList, newToast(message, 'Danger')])
                })
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
        }
        else if (userAuthVar) {
            console.log('company  from storage', companyItems)
            setCompanyData(companyItems)
        }
    }, [])

    useEffect(() => {
        console.log('log')
        setScreen({ x: window.innerWidth, y: window.innerHeight })
    }, [window.innerHeight, window.innerWidth])


    // Function from the Login component once user logs in
    const processUser = (userData) => {
        let updateData = userData;
        updateData.reminderContext = ['company'];
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log('userData processed', JSON.parse(localStorage.getItem('userData')))

        localStorage.setItem('auth', JSON.stringify(true))
        setUserAuth(true);
    }

    // opens on Click from components that need modal to display data
    const activateModal = (data) => {
        // update component responsible for the modal content
        console.log('modal data: ', data)
        setModalData(data)
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false)
    }

    const processData = (data, type) => {
        // check for user context and remove it from the list if completed.
        const datas = new FormData()

        // TODO Validation inside of the modal on the mandatory field
        if (type == 'companyDetails') {
            datas.append('name', data.name)
            datas.append('line_1', data.line_1)
            datas.append('line_2', data.line_2)
            datas.append('city', data.city)
            datas.append('postcode', data.postcode)
            datas.append('website', data.website)
            datas.append('logo', data.logo, 'logo.jpg')
            datas.append('email', data.email)
        }

        axios(`/api/create_company_data/${userData.id}`, {
            method: 'POST',
            data: datas
        })
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                    let updateUserData = response.data.user;
                    updateUserData.reminderContext = []
                    localStorage.setItem('userData', JSON.stringify(updateUserData))
                    localStorage.setItem('companyData', JSON.stringify(response.data.company))

                    setUserData(updateUserData)
                    setCompanyData(response.data.company)
                    setOpenModal(false)
                    setModalData({
                        title: '',
                        confirmationMessage: '',
                        cancelMessage: '',
                        component: ''
                    });

                    let message = 'Company information was saved successfully!'
                    setToastList([...toastList, newToast(message, 'Success')])
                }
            })
    }

    const getDirectory = (id) => {
        setSection(id)
    }

    const logoutUser = () => {
        // Logout should occur on timeout but also by the user.
        // Clear local storage of user data to return to login page 
        // but make it remember that this computer does not need registration
        const userItems = JSON.parse(localStorage.getItem('userData'));
        console.log('current Data in storage', userItems);
        localStorage.removeItem('userData');
        localStorage.removeItem('auth');
        console.info('user Data has been cleared', JSON.parse(localStorage.getItem('userData')));
        setUserData({})
        setUserAuth(false)
    }

    const updateShoppingCart = (product, func) => {
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
                console.log('minus less than one', list)
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

    // if (isEmpty(JSON.parse(localStorage.getItem('userData')))) {
    //     return <Login processUser={processUser} />
    // }

    return (
        // <React.StrictMode>
        <ToastContext.Provider value={toastState}>
            <UserDataContext.Provider value={userDataState} >
                <CompanyDataContext.Provider value={companyDataState}>
                    {/* initialise and apply the size of the screen to the app view to hold proportions */}
                    <div className="App"
                    // style={{ width: window.innerWidth, height: window.innerHeight }}
                    >
                        <Router >
                            {userAuth ? <Sidebar
                                getDirectory={getDirectory}
                                section={section}
                            /> : null}

                            <div className="view">

                                {userAuth ?
                                    <Navbar
                                        section={section}
                                        logoutUser={logoutUser}
                                        shoppingCart={shoppingCart}
                                        updateCart={updateShoppingCart}
                                        user={userData}
                                        activateModal={activateModal}
                                    /> : null
                                }

                                <Routes>
                                    <Route path="/" element={userAuth ? <Dashboard user={userData.name} activateModal={activateModal} /> : <Navigate to="login" />} />
                                    <Route path="orders" element={userAuth ? <Orders user={userData.name} /> : <Navigate to="login" />} />
                                    <Route path="products" element={userAuth ? <Products user={userData.name} updateCart={updateShoppingCart} /> : <Navigate to="login" />} />
                                    <Route path="overview" element={userAuth ? <Dashboard user={userData.name} /> : <Navigate to="login" />} />
                                    <Route path="customer" element={userAuth ? <Dashboard user={userData.name} /> : <Navigate to="login" />} />
                                    <Route path="message" element={userAuth ? <Dashboard user={userData.name} /> : <Navigate to="login" />} />
                                    <Route path="settings" element={userAuth ? <Dashboard user={userData.name} /> : <Navigate to="login" />} />
                                    <Route path="/register:comapny_id" element={userAuth ? <Navigate to="/" /> : <Login processUser={processUser} />} />
                                    <Route path="/login" element={userAuth ? <Navigate to="/" /> : <Login processUser={processUser} />} />
                                    <Route path="/register" element={userAuth ? <Navigate to="/" /> : <Login processUser={processUser} />} />
                                </Routes>
                            </div>
                        </Router>
                        <Toast
                            toastList={toastList}
                            autoDelete={false}
                            autoDeleteTime={3000}
                        />
                        {openModal && !isEmpty(modalData) ?
                            <Modal
                                type={modalData.type}
                                title={modalData.title}
                                confirmationMessage={modalData.confirmationMessage}
                                cancelMessage={modalData.cancelMessage}
                                BodyComponent={modalData.component}
                                onAccept={processData}
                                onClose={closeModal}
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