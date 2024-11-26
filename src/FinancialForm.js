import React, { useState } from 'react'
import './FinancialForm.css';
import { PacmanLoader } from 'react-spinners';

const API_KEY = process.env.REACT_APP_GEMINI_API;

const FinancialForm = ({setResult}) => {

    const [values, setValues] = useState({
        marketPrice:"50",
        eps:"5",
        bookValue:"25",
        sales:"10",
        annualDividends:"2",
        previousEps:"4",
        currentEps:"5",
        totalDebt:"100",
        totalEquity:"200",
        netIncome:"30",

    })

    const [isSent, setIsSent] = useState(true)

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setValues({ ...values, [name]: value});
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();

        // console.log(values);

        const trainingPrompt = [
            {
                "parts":[
                    {
                        "text": "from next from I am going to send you some parameters for predicting stock market share, tell me if it is overvalued or undervalued, buy or not"
                    }
                ],
                "role": "user"
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "user",
                "parts": [{
                    "text": "and also calculate - P/E ratio, P/B ratio, P/S ratio, Dividend Yield, Earnings growth in %, Deby to equity ratio, ROE% and give as response"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "always give response in form of html div and table tag, dont include ```html tag"
                }]
            },
            {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
            },
        ]

        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`

        let messagesToSend = [
            ...trainingPrompt,
            {
                "role": "user",
                "parts": [{
                    "text": JSON.stringify(values)
                }]
            }
        ]    
        setIsSent(false)
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": messagesToSend
            })
        })
        let resjson = await res.json()
        setIsSent(true)
        let responseMessage = resjson.candidates[0].content.parts[0].text
        console.log(responseMessage);
        setResult(responseMessage)
        
    }
    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <div>
                <label>Market Price per Share: </label>
                <input type='number' name='marketPrice' value={values.marketPrice} onChange={handleChange}/>
            </div>
            <div>
                <label>Earnings per share (EPS):</label>
                <input type='number' name='eps' value={values.eps} onChange={handleChange}/>
            </div>
            <div>
                <label>Book Value per share:</label>
                <input type='number' name='bookValue' value={values.bookValue} onChange={handleChange}/>
            </div>
            <div>
                <label>Sales:</label>
                <input type='number' name='sales' value={values.sales} onChange={handleChange}/>
            </div>
            <div>
                <label>Annual Dividends:</label>
                <input type='number' name='annualDividends' value={values.annualDividends} onChange={handleChange}/>
            </div>
            <div>
                <label>Previous EPS:</label>
                <input type='number' name='previousEps' value={values.previousEps} onChange={handleChange}/>
            </div>
            <div>
                <label>Current EPS:</label>
                <input type='number' name='currentEps' value={values.currentEps} onChange={handleChange}/>
            </div>
            <div>
                <label>Total Debt:</label>
                <input type='number' name='totalDebt' value={values.totalDebt} onChange={handleChange}/>
            </div>
            <div>
                <label>Total Equity:</label>
                <input type='number' name='totalEquity' value={values.totalEquity} onChange={handleChange}/>
            </div>
            <div>
                <label>Net Income:</label>
                <input type='number' name='netIncome' value={values.netIncome} onChange={handleChange}/>
            </div>

            {
                isSent ?
                <button type='submit'>Submit</button>
                :
                <PacmanLoader className='loader'/>
            }
            
        </form>
    )
}

export default FinancialForm