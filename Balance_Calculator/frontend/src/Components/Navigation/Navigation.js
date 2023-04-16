import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/icon.svg'
import { menuItems } from '../../utils/menuItems'
import './Navigation.scss'
import Weather from '../Weather/Weather';

function Navigation({active, setActive}) {
    
    return (
        <div className='nav-main'>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Balance Calculator</h2>
                    <p>Team CyberWorker</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            {/* <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div> */}
        </div>
    )
}


export default Navigation