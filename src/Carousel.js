import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "./Carousel.css";
import { CircularProgress, Typography } from '@mui/material';

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')

    setTrending(data);
  }
  useEffect(() => {
    fetchTrendingCoins();
  }, []);
  // console.log(trending);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 4
    }
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h > 0;
    return <div className="carouselItem">
      <img src={ coin.image } alt={ coin.name } height="70" style={ { marginBottom: 10 } } />
      <span>{ coin.symbol } &nbsp;
        <span style={ {
          color: profit > 0 ? "#11d811" : "#f00606",
          fontWeight: 500,
        } }>{ profit && "+" }{ coin.price_change_percentage_24h.toFixed(2) }%</span>
      </span>
      <span style={ { fontSize: 22, fontWeight: 500 } }>${ coin.current_price.toLocaleString() }</span>
    </div>;
  })
  return <div className="carousel">
    <Typography
      variant="subtitle1"
      style={ {
        color: "white",
        textTransform: "capitalize",
        fontFamily: "Montserrat",
      } }
    >
      Get all the Info regarding your favourate Crypto Currencies
    </Typography>
    { trending.length === 0 ? (<CircularProgress style={ {
      margin: "20px"
    } } />) :
      (<AliceCarousel
        mouseTracking
        infinite={ true }
        autoPlayInterval={ 1000 }
        animationDuration={ 1500 }
        disableDotsControls
        responsive={ responsive }
        autoPlay
        disableButtonsControls
        items={ items }
      />) }
  </div>
}

export default Carousel;
