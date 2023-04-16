
import {dashboard, expenses, news, transactions, trend} from '../utils/Icons'
import { RiCloudWindyLine } from 'react-icons/ri';

export const menuItems = [
    {
        id: 1,
        title: 'DASHBOARD',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "INCOMES",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "EXPENSES",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: 'WEATHER',
        icon: <RiCloudWindyLine />,
        link: '/dashboard',
    }, 
    {
        id: 5,
        title: "NEWS",
        icon: news,
        link: "/dashboard",
    },
]