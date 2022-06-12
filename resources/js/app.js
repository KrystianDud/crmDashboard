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
import axios from 'axios';

export const ToastContext = createContext({
    toastList: [],
    setToastList: () => []
});

export const UserDataContext = createContext({
    userData: [{
        reminderContext: ''
    }],
    setUserData: () => []
});

function App() {
    const [section, setSection] = useState(0)
    const [toastList, setToastList] = useState([])
    const [userData, setUserData] = useState({
        reminderContext: ''
    })

    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState({
        title: '',
        confirmationMessage: '',
        cancelMessage: '',
        component: ''
    });

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
        let userItems = JSON.parse(localStorage.getItem('userData'));
        if (!isEmpty(userItems)) {
            userItems.reminderContext = ''
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

    useEffect(() => {
        //   for now check the reminders every time when user data is being updated.
        // replace this functionality in future perhaps using chanels
        if (window.location.pathname == '/') checkReminders()
    }, [window.location.pathname, userData.reminderContext])


    const processUser = (userData) => {
        let updateData = userData;
        updateData.reminderContext = ''
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log('userData processed', JSON.parse(localStorage.getItem('userData')))
    }

    const checkReminders = () => {
        // In this function we check onboarding users, especially admins to see if they did everything to make sure that platform runs smoothly
        // using axios we will connect to the server to seek confirmation if things such as: 
        // company details, ADD MORE REASONS HERE
        // Then an array will be created and passed to the reminder component to display one after another
        // Reminders should be hardcoded and the content provided inside of the Component using switch
        // Reminders should be part of the userData and be available through the context hook

        // Provide dummy context until the Api is in place
        const reminderContext = ['company'];
        const userItems = userData;

        userItems.reminderContext = reminderContext;
        setUserData(userItems)
        console.log('reminder function', userItems)

    }

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
        // let newData = user

        // TODO Validation inside of the modal on the mandatory field
        if (type == 'companyDetails') {

        }
        axios('/api/auth/create_company_data', {
            headers: {
                headers: { 'content-type': 'application/json' },
            },
            method: 'POST',
            data: data
        })

        let updatedUserData = userItems
        updatedUserData.reminderContext.shift()
        setUserData(updatedUserData)
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

    if (isEmpty(JSON.parse(localStorage.getItem('userData')))) {
        return <Login processUser={processUser} />
    }

    return (
        // <React.StrictMode>
        <ToastContext.Provider value={toastState}>
            <UserDataContext.Provider value={userDataState} >
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
                                <Route path="/" element={<Dashboard section={section} user={userData.name} activateModal={activateModal} />} />
                                <Route path="orders" element={<Orders section={section} user={userData.name} />} />
                                <Route path="products" element={<Products section={section} user={userData.name} />} />
                                <Route path="overview" element={<Dashboard section={section} user={userData.name} />} />
                                <Route path="customer" element={<Dashboard section={section} user={userData.name} />} />
                                <Route path="message" element={<Dashboard section={section} user={userData.name} />} />
                                <Route path="settings" element={<Dashboard section={section} user={userData.name} />} />
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

            </UserDataContext.Provider>
        </ToastContext.Provider>
        // </React.StrictMode> 
    );
};

const root = createRoot(document.getElementById('main'));
root.render(<App />);