import './BuyPage.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FromData from 'form-data';
import axios from 'axios';
import Cookies from 'js-cookie';
import addToCartImg from '../../assets/cart1.png'
import minusImg from '../../assets/MNS.png'
import plusImg from '../../assets/PLS.png'


export default function BuyPage({ buyProductData, addToCart, isShopCreate }) {
    const token = Cookies.get("auth_token");
    const navigate = useNavigate();

    const [productItem, setProductItem] = useState(1);

    const buyProduct = async (buyProductData) => {
        if (isShopCreate) {
            let fromData = new FromData();
            fromData.append("token", token);
            fromData.append("productId", buyProductData[0]._id);
            fromData.append("productListObjectId", buyProductData[1]._id);
            fromData.append("quantity", productItem);
            fromData.append("productPrice", buyProductData[1].productPrice);
            fromData.append("sellType", buyProductData[1].sellType);
            fromData.append("offer", buyProductData[1].offer);
            fromData.append("deliveryCharge", buyProductData[1].deliveryCharge);
            const result = await axios.post("http://localhost:5000/buySingleProducts", fromData,);
        } else {
            alert('You successfully buy product');
            navigate('/');
        }

    }

    return (
        <div className='buyPage flex'>
            <div className='imgArea flex'>
                <img src={buyProductData[0].productImage}></img>
            </div>
            <div className='productDetailsArea'>
                <h1 className='productName'>{buyProductData[0].productName}</h1>
                <p className='productDesc'>{buyProductData[0].description}</p>
                <h3 className='productPriceArea flex3'><span>Product productPrice</span><span data-decoration="deleted">{buyProductData[1].productPrice * productItem}</span><span>{(buyProductData[1].productPrice - ((buyProductData[1].productPrice * buyProductData[1].offer) / 100)) * productItem}</span></h3>
                <h3 className='productPriceArea flex3'><span>Delivery Charge</span><span>{buyProductData[1].deliveryCharge}</span></h3>
                <h1 className='totalPriceArea flex3'>
                    <span>Total Price</span>
                    <button className='decrease_value' onClick={() => {
                        if (productItem > 1) {
                            setProductItem(productItem - 1);
                        }
                    }}>
                        <img src={minusImg}></img>
                    </button>
                    <h3>{productItem}</h3>
                    <button className='increase_value' onClick={() => {
                        setProductItem(productItem + 1);
                    }}>
                        <img src={plusImg}></img>
                    </button>
                    <span>{((buyProductData[1].productPrice - ((buyProductData[1].productPrice * buyProductData[1].offer) / 100)) * productItem) + buyProductData[1].deliveryCharge}</span>
                </h1>
                <div className='btnArea flex2'>
                    <button className='btnAreaBtn btn' onClick={() => buyProduct(buyProductData)}>Buy</button>
                    <button className="btnAreaBtn" onClick={() => addToCart(buyProductData)}>
                        <img src={addToCartImg} />
                    </button>
                </div>
            </div>
        </div>
    )
}