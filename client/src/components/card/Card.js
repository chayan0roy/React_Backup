import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom';
import addToCartImg from '../../assets/cart1.png'

export default function Card({ cardData, setShopListProductData }) {
    const navigate = useNavigate();

    const goToBuy = (cardData) => {
        setShopListProductData(cardData);
        navigate('/shopListByProduct');
    }

    return (
        <div className='card slideBoxDiv' onClick={()=>goToBuy(cardData)}>
            <div className='imgArea flex'>
                <img src={cardData.productImage} />
            </div>
            <div className='textArea'>
                <h1>{cardData.productName}</h1>
            </div>
        </div>
    )
}
