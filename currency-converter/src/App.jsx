import Header from "./components/Header"
import "./App.scss"
import { useState } from "react"
import { InputBox } from './components/index.js'
import Footer from "./components/Footer/index.jsx"
import useCurrencyInfo from "./hooks/UseCurrencyInfo.js"

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('ngn')
  const [to, setTo] = useState('usd')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <>
      <Header />
      <main>
        <img
          src="/images/background.webp"
          alt="background"
        />
        <div>
          <div>
            <form onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
              <div>
                <InputBox
                  label="from"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  onAmountChange={(amount) => setAmount(amount)}
                  selectedCurrency={from}
                />
              </div>
              <div>
                <button onClick={swap}>Swap</button>
              </div>
              <div>
                <InputBox
                  label="to"
                  currencyOptions={options}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>
              <button
                type='submit'
              >Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
            </form>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App
