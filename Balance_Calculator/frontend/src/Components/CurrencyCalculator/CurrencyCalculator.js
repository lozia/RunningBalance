
import React, { useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import "./CurrencyCalculator.scss";
import axios from "axios";

const CurrencyCalculator = () => {
  const { currencies, conversionRates } = useGlobalContext();
//   const [fromCurrency, setFromCurrency] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD"); 
  const [toCurrency, setToCurrency] = useState("CNY");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

//   const handleConversion = () => {
//     const rate = conversionRates[fromCurrency] ? conversionRates[fromCurrency][toCurrency] : 0;
//     setConvertedAmount(amount * rate);
//   };
// const handleConversion = async () => {
//     try {
//       const apiKey = "2qNF66Ui388KZnxtPW0vcWGqDJ5ImPH9"; // Replace with your actual API key
//       const apiUrl = `https://api.exchangeratesapi.io/latest?access_key=${apiKey}&base=${fromCurrency}&symbols=${toCurrency}`;
//       console.log("API URL:", apiUrl);
//       const response = await axios.get(apiUrl);
//       console.log("API response:", response.data);
//       const rate = response.data.rates[toCurrency];
//       setConvertedAmount(amount * rate);
//     } catch (error) {
//       console.error("Error fetching exchange rate:", error);
//     }
//   };
const handleConversion = async () => {
    const apiKey = "022d11269c3b11995d881143"; // Replace with your actual valid API key from exchangerate-api.com
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
  
    try {
      const response = await axios.get(apiUrl);
      const rate = response.data.conversion_rates[toCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };
  

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    if (name === "fromCurrency") {
      setFromCurrency(value);
    } else {
      setToCurrency(value);
    }
  };

  return (
    <div className="currency-calculator-main">
      <InnerLayout>
        <h1>CURRENCY CALCULATOR</h1>
        <div className="currency-converter">
          <label>
            From:
            <select
              name="fromCurrency"
              value={fromCurrency}
              onChange={handleCurrencyChange}
            >
              {currencies &&
                currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </label>
          <label>
            To:
            <select
              name="toCurrency"
              value={toCurrency}
              onChange={handleCurrencyChange}
            >
              {currencies &&
                currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <button onClick={handleConversion}>Convert</button>
          {convertedAmount && (
            <p>
              {amount} {fromCurrency} is equal to {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </p>
          )}
        </div>
      </InnerLayout>
    </div>
  );
};

export default CurrencyCalculator;
