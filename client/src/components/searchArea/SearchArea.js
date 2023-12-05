import './SearchArea.css'
import React, { useState } from 'react'
import closeImg from '../../assets/cross.png'
import searchImg from '../../assets/search.png'
import { useNavigate } from 'react-router-dom';
import addToCartImg from '../../assets/cart1.png'
import Card from '../card/Card';


export default function SearchArea({ addToCart, setBuyProductData }) {
    const [resultData, setResultData] = useState(undefined);
    const navigate = useNavigate();

    const [cartOpen, setCartOpen] = useState(false)
    const close = () => {
        setResultData(undefined);
        setCartOpen(null);
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key == "") {
            setResultData(undefined);
        } else {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            setResultData(result);
        }
    }

    
    const goToBuy = (e) => {
        setBuyProductData(e);
        setCartOpen(false);
        setResultData(undefined);
        navigate('/buyPage');
    }

    return (
        <div className='searchArea'>
            <div className='searchImg flex' onClick={() => setCartOpen(!cartOpen)}>
                <img src={searchImg}></img>
            </div>
            {cartOpen && (
                <div className='searchResultArea'>
                    <div className='searchResultAreaTop'>
                        <div className='closeImgArea' onClick={close}>
                            <img src={closeImg}></img>
                        </div>
                        <input type='search' placeholder='Search here ...' className='searchBar' onChange={searchHandle} />
                    </div>
                    <div className='searchResultAreaBottom'>
                        {
                            resultData ?
                                resultData.map((e) => {
                                    return (
                                        <Card cardData={e} addToCart={addToCart} setBuyProductData={setBuyProductData} />
                                    );
                                }) : <></>
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
