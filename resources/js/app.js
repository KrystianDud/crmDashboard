import { createRoot } from 'react-dom/client';
import React, { createContext, useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './app.css';
import '../css/mainApp.css'

import Login from './Login/index';

import Dashboard from './Dashboard/Dashboard';
import Orders from './Orders/Index';

import Sidebar from './Sidebar/Index'
import Navbar from './NavBar/NavBar'
import Products from './Products/index'
import Toast from './Components/Toast/Index';

export const ToastContext = createContext({
    toastList: [],
    setToastList: () => []
});

function App() {
    // const [user, setUser] = useState(null)
    const [user, setUser] = useState({
        id: 0,
        email: 'test',
        name: 'test'
    })

    const [section, setSection] = useState(0)
    const [toastList, setToastList] = useState([])

    const toastState = useMemo(
        () => ({ toastList, setToastList }),
        [toastList]
    );

    useEffect(() => {
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
        
    }, [user])
    

    const processUser = (userData) => {
        setUser(userData)
    }

    const getDirectory = (id) => {
        setSection(id)
    }

    if (!user) {
        return <Login processUser={processUser} />
    }

    return (
        // <React.StrictMode>
            <ToastContext.Provider value={toastState} >

                <div className="App">
                    <Router >
                        <Sidebar
                            getDirectory={getDirectory}
                            section={section}
                        />

                        <div className="view">
                            <Navbar
                                section={section}
                            />
                            <Routes>
                                <Route path="/" element={<Dashboard section={section} user={user}/>} />
                                <Route path="orders" element={<Orders section={section} />} />
                                <Route path="products" element={<Products section={section} />} />
                                {/* <Route path="overview" element={<Dashboard section={section} />} /> */}
                                {/* <Route path="customer" element={<Dashboard section={section} />} /> */}
                                {/* <Route path="message" element={<Dashboard section={section} />} /> */}
                                {/* <Route path="settings" element={<Dashboard section={section} />} />  */}

                            </Routes>

                        </div>
                    </Router>
                </div>

                <Toast
                    toastList={toastList}
                    autoDelete={true}
                    autoDeleteTime={3000}
                />
            </ToastContext.Provider>
        // </React.StrictMode> 
    );
}
const root = createRoot(document.getElementById('main'));
root.render(<App />);