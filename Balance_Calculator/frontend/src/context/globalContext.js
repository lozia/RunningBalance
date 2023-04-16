import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5001/api/v1/";
const NEWS_API_KEY = "apiKey=2d6ff00e0317456ea33408d024a2cc97"
const NEWS_URL = `https://newsapi.org/v2/top-headlines?language=en&pageSize=5&category=business&${NEWS_API_KEY}`

const WEATHER_API_KEY = 'db0b09b486a19feb1860cfb78eebf35b'; 
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [news, setNews] = useState([])
    const [weather, setWeather] = useState({})
    const [weatherForecast, setWeatherForecast] = useState(null);
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
        // console.log(response.data)
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
        // console.log(response.data)
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

    const getNews = async () => {
        setNews([{
            source: {
                id: null,
                name: 'example.publisher'
            },
            title: 'Example Title1',
            publishedAt: '2023.04.16',
            url: 'http://example.com',
            descript: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem"
        },{
            source: {
                id: null,
                name: 'example.publisher'
            },
            title: 'Example Title2',
            publishedAt: '2023.04.16',
            url: 'http://example.com',
            descript: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem"
        },{
            source: {
                id: null,
                name: 'example.publisher'
            },
            title: 'Example Title3',
            publishedAt: '2023.04.16',
            url: 'http://example.com',
            descript: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem"
        },{
            source: {
                id: null,
                name: 'example.publisher'
            },
            title: 'Example Title4',
            publishedAt: '2023.04.16',
            url: 'http://example.com',
            descript: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem"
        },{
            source: {
                id: null,
                name: 'example.publisher'
            },
            title: 'Example Title5',
            publishedAt: '2023.04.16',
            url: 'http://example.com',
            descript: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem"
        },{
            source: {
                id: null,
                name: 'example.publisher'
            },
            title: 'Example Title6',
            publishedAt: '2023.04.16',
            url: 'http://example.com',
            descript: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem"
        }])
        // const res = await axios.get(`${NEWS_URL}`,{responseType:'json'})
        // if (res.data.status === "ok") {
        //     const articles = res.data.articles
        //     setNews(articles)
        //     console.log(`Fetch news from ${NEWS_URL} successfully`)

        // } else {
        //     console.log(`Cannot fetch news from ${NEWS_URL}`)
        // }
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

      const getWeatherForecast = async (lat, lon) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${WEATHER_API_KEY}`
          );
          const data = await response.json();
          console.log("Weather Forecast Data:", data);
          if (response.ok) {
            setWeatherForecast(data);
          } else {
            setError(data.message);
          }
        } catch (error) {
          setError(error.message);
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
            weatherForecast,
            getWeatherForecast,
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