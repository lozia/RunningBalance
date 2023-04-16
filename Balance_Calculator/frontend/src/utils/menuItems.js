
import {dashboard, expenses, news, location, trend, weather, visualization} from '../utils/Icons'


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
        icon: weather,
        link: '/dashboard',
    }, 
    {
        id: 5,
        title: "NEWS",
        icon: news,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "LOCATION",
        icon: location,
        link: "/dashboard",
    },
    {
        id: 7,
        title: 'VISUALIZATION',
        icon: visualization,
        link: '/visualization',
      },
]