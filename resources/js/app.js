import { createRoot } from 'react-dom/client';
import React, { createContext, useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

export const ToastContext = createContext({
    toastList: [],
    setToastList: () => []
});

export const UserDataContext = createContext({
    userData: [],
    setUserData: () => []
});

function App() {
    const [section, setSection] = useState(0)
    const [toastList, setToastList] = useState([])
    const [userData, setUserData] = useState({})

    const toastState = useMemo(
        () => ({ toastList, setToastList }),
        [toastList]
    );

    const userDataState = useMemo(
        () => ({ userData, setUserData }),
        [userData]
    );

    useEffect(() => {
        // update session from the storage if available, otherwise ask to login.
        const userItems = JSON.parse(localStorage.getItem('userData'));
        if (!isEmpty(userItems)) {
            console.log('current Data in storage', userItems);
            setUserData(userItems)
        }

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

        return () => {
            setUserData({})
        }
    }, [])

    // useEffect(() => {
    //     if (!isEmpty(userData)) {
    //         setUserData(userData)
    //     }
    // }, [userData])



    const processUser = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData))
        setUserData(userData)
        console.log('userData processed', JSON.parse(localStorage.getItem('userData')))
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
        console.info('user Data has been cleared', JSON.parse(localStorage.getItem('userData')));
        setUserData({})
    }

    if (isEmpty(userData)) {
        return <Login processUser={processUser} />
    }

    return (
        // <React.StrictMode>
        <ToastContext.Provider value={userDataState}>
            <UserDataContext.Provider value={toastState} >
                <div className="App">
                    <Router >
                        <Sidebar
                            getDirectory={getDirectory}
                            section={section}
                        />
                        <div className="view">
                            <Navbar
                                section={section}
                                logoutUser={logoutUser}
                            />
                            <Routes>
                                <Route path="/" element={<Dashboard section={section} user={userData.name} />} />
                                <Route path="orders" element={<Orders section={section} />} />
                                <Route path="products" element={<Products section={section} />} />
                                <Route path="overview" element={<Dashboard section={section} />} />
                                <Route path="customer" element={<Dashboard section={section} />} />
                                <Route path="message" element={<Dashboard section={section} />} />
                                <Route path="settings" element={<Dashboard section={section} />} />
                            </Routes>
                        </div>
                    </Router>
                    <Toast
                        toastList={toastList}
                        autoDelete={true}
                        autoDeleteTime={3000}
                    />
                    <Modal
                        title='Title for the modal.'
                        confirmationMessage='Accept'
                        cancelMessage='Discard'
                    >
                        this is modal
                    </Modal>
                </div>

            </UserDataContext.Provider>
        </ToastContext.Provider>
        // </React.StrictMode> 
    );
};

const root = createRoot(document.getElementById('main'));
root.render(<App />);