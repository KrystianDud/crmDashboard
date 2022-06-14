import React, { createContext, useMemo, useState } from 'react'

export const ToastCtx = createContext(null);

export default function ToastContext() {
    const [toastList, setToastList] = useState([])

    const toastState = useMemo(
        () => ({ 
            toastList, 
            addToast: () => setToastList((prev) => ([...prev, ])) }),
        [toastList]
    );

    return (
        <ToastCtx.Provider value={toastState}>ToastContext</ToastCtx.Provider>
    )
}
