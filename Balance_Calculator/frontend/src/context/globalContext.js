// import React, { useContext, useState, useCallback } from "react"
import React, {  useContext, useState, useCallback, useEffect } from "react";
import axios from 'axios'


const BASE_URL = "http://localhost:5001/api/v1/";
const NEWS_API_KEY = "apiKey=2d6ff00e0317456ea33408d024a2cc97"
const NEWS_URL = `https://newsapi.org/v2/top-headlines?language=en&pageSize=5&category=business&${NEWS_API_KEY}`

// const WEATHER_API_KEY = "205924f4285a40d9a96233209231604";
const WEATHER_API_KEY = "db0b09b486a19feb1860cfb78eebf35b";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";

const CURRENCY_CONVERSION_API_KEY = "2qNF66Ui388KZnxtPW0vcWGqDJ5ImPH9";
const CURRENCY_CONVERSION_URL = `https://api.apilayer.com/exchangerates_data_api/latest?access_key=${CURRENCY_CONVERSION_API_KEY}`;



const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [news, setNews] = useState([])
    const [weather, setWeather] = useState({})
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [conversionRates, setConversionRates] = useState({});  
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

    const getWeather = useCallback(async (city) => {
        try {
          // Fetch the current weather using the city name
          const response = await fetch(
            `${WEATHER_URL}q=${city}&appid=${WEATHER_API_KEY}`
          );
          const data = await response.json();
          if (data) {
            setWeather(data);
            console.log("Fetch weather from", response.url, "successfully");
          } else {
            throw new Error("Failed to fetch weather data");
          }
        } catch (error) {
          console.log("Error fetching weather data:", error);
        }
      }, []);
      
      const getWeatherForecast = useCallback(async (city) => {
        try {
          // Fetch the 5-day forecast using the city name
          const response = await fetch(
            `${FORECAST_URL}q=${city}&appid=${WEATHER_API_KEY}`
          );
          const data = await response.json();
          if (data) {
            setWeatherForecast(data);
            console.log("Fetch weather forecast from", response.url, "successfully");
          } else {
            throw new Error("Failed to fetch weather forecast data");
          }
        } catch (error) {
          console.log("Error fetching weather forecast data:", error);
        }
      }, []);

      
      
      useEffect(() => {
        const fetchCurrenciesAndRates = async () => {
          try {
            const response = await axios.get("https://openexchangerates.org/api/currencies.json");
            const currencyKeys = Object.keys(response.data);
            setCurrencies(currencyKeys);
    
            const responseRates = await axios.get("https://openexchangerates.org/api/latest.json?app_id=eacbd5b69f33433b9ee64550fb744192");
            setConversionRates(responseRates.data.rates);
          } catch (error) {
            console.error("Error fetching currencies and rates:", error);
          }
        };
    
        if (currencies.length === 0) {
          fetchCurrenciesAndRates();
        }
      }, [currencies]);
    
      

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
            currencies,
            setCurrencies,
            conversionRates,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
};
