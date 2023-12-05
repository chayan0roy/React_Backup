import React from 'react'
import './ViewShopCard.css'
import { Link, useNavigate } from 'react-router-dom';
import addToCartImg from '../../assets/cart1.png'

export default function ViewShopCard({ cardData, addToCart, setBuyProductData }) {
    const navigate = useNavigate();

    const goToBuy = (e) => {
        setBuyProductData(e);
        navigate('/buyPage');
    }

    return (
        <div className='card slideBoxDiv'>
            <div className='imgArea flex'>
                <img src={cardData.products.productImage} />
            </div>
            <div className='textArea'>
                <h1>{cardData.products.productName}</h1>
                <div className='textAreaDetails'>
                    <h2 className='priceDetails'><span>{cardData.details.productPrice - ((cardData.details.productPrice * cardData.details.offer) / 100)}</span> <span><del>{cardData.details.productPrice}</del> </span> <span> {cardData.details.offer}% off </span></h2>
                    <h2>{cardData.details.deliveryCharge == 0 ? "free delivery " : "Delivery Charge " + cardData.details.deliveryCharge}</h2>
                </div>
                <div className='btnArea flex2'>
                    <button className="btnAreaBtn btn" onClick={() => goToBuy(cardData)}>Buy</button>
                    <button className="btnAreaBtn btn flex" onClick={() => addToCart(cardData)}>
                        <img src={addToCartImg} />
                    </button>
                </div>
            </div>
        </div>
    )
}
