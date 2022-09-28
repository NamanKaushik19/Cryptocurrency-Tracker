import React from 'react'
import './Coin.css';

const TableHeader = () => {
    return (
        <div style={ {
            backgroundImage: "linear-gradient(-225deg, #ac32e4 0%, #7918f2 48%, #4801ff 100%)",
            fontWeight: "bold",
        } } className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    {/* <img src={ image } alt="crypto" /> */ }
                    <h1>Name</h1>
                    <p className="coin-symbol">Symbol</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">Price</p>
                    <p className="coin-price">Volume</p>
                    <p className="coin-percent">Change%</p>
                    <p className="coin-marketcap">Market Capital</p>
                </div>
            </div>
        </div>
    )
}

export default TableHeader;