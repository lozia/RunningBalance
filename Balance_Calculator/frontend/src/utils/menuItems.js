import {dashboard, expenses, transactions, trend} from '../utils/Icons'

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
]