import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5001/api/v1/";
const NEWS_API_KEY = "&apiKey=2d6ff00e0317456ea33408d024a2cc97"
const NEWS_URL = `https://newsapi.org/v2/everything?language=en&pageSize=5&${NEWS_API_KEY}&q=`

const WEATHER_API_KEY = 'db0b09b486a19feb1860cfb78eebf35b'; 
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [news, setNews] = useState([])
    const [weather, setWeather] = useState({})
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const getNews = async (kw) => {
        const res = await axios.get(`${NEWS_URL}${kw}`,{responseType:'json'})
        if (res.data.status === "ok") {
            const articles = res.data.articles
            setNews(articles)
            console.log(`Fetch news from ${NEWS_URL} successfully`)

        } else {
            console.log(`Cannot fetch news from ${NEWS_URL}`)
        }
    }

    const getWeather = async (city) => {
        try {
          const response = await axios.get(`${WEATHER_URL}${city}&appid=${WEATHER_API_KEY}`);
          setWeather(response.data);
          console.log(`Fetch weather from ${WEATHER_URL} successfully`);
        } catch (error) {
          console.log(`Cannot fetch weather from ${WEATHER_URL}`);
        }
      };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            news,
            getNews,
            weather,
            getWeather,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}