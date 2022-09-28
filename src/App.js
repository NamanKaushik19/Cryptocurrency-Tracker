import React, { useEffect, useState } from 'react';
import './App.css';
import Coin from './Coin';
import Carousel from './Carousel';
import TableHeader from './TableHeader';
import { LinearProgress, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
const axios = require('axios');
const logo = require('./logo.png');
const searchIcon = require('./search.png');

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
      <nav className="title">
        <img src={ logo } alt="logo" height="35em" />
        <h1>Crypto Tracker</h1>
      </nav>
      <Carousel />
      <div className="coin-search">
        <h1 className="coin-text">Search a currency<img src={ searchIcon } alt="search-logo" height="30em" /></h1>
        <form>
          <input type="text" placeholder="Search" onChange={ handleChange } className="coin-input" />        </form>
      </div>
      { filteredCoins.length === 0 ? (<Box sx={ { width: '100%' } }>
        <LinearProgress style={ { backgroundColor: '#7918f2' } } />
      </Box>)
        : (<>
          <TableHeader />
          { filteredCoins.slice((page - 1) * 20, (page - 1) * 20 + 20).map(coin => {
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
          <Pagination count={ Math.round((filteredCoins.length / 20)) } style={ {
            padding: 20,
            width: "100%",
            display: "flex",
            margin: "15px",
            justifyContent: "center",
          } }
            onChange={ (_, value) => {
              setPage(value);
              window.scroll(0, 420);
            } }
          />
        </>) }
    </div>
  );
}

export default App;
