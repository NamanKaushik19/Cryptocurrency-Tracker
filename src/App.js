import React, { useEffect, useState } from 'react';
import './App.css';
import Coin from './Coin';
const axios = require('axios');

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        // console.log(res.data);
        setCoins(res.data);
      }).catch(err => { console.log(err) })
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" onChange={ handleChange } className="coin-input" />        </form>
      </div>
      { filteredCoins.map(coin => {
        return (
          <Coin
            key={ coin.id }
            name={ coin.name }
            price={ coin.current_price }
            image={ coin.image }
            symbol={ coin.symbol }
            marketCap={ coin.market_cap }
            volume={ coin.total_volume }
            priceChange={ coin.price_change_percentage_24h }
          />
        )
      }) }
    </div>


  );
}

export default App;
