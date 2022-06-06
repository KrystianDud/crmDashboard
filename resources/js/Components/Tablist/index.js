import React from 'react'
import './index.css'

export default function Tablist({name, activeTab, index, func}) {
    return (
        <div onClick={() => func(index)} className={`tab-ele ${activeTab == index ? 'active' : 'hoverable'}`}>{name}</div>
    )
}
