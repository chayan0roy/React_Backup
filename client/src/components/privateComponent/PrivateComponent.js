import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import FromData from 'form-data';

import ShopFollowingPage from '../../pages/shopFollowingPage/ShopFollowingPage';
import FrontPage from '../../pages/frontPage/FrontPage';
import SecondPage from '../../pages/secondPage/SecondPage';
import ShopListByProduct from '../../pages/shopListByProduct/ShopListByProduct';
import AddData from '../../pages/addData/AddData';
import CPLPage from '../../pages/CPLPage/CPLPage';
import BuyPage from '../../pages/buy/BuyPage';
import Register from '../../pages/login_register/Register';
import Login from '../../pages/login_register/Login';
import UserPage from '../../pages/userPage/UserPage';
import ShopPage from '../../pages/shopPage/ShopPage';
import ShopCreate from '../../pages/login_register/ShopCreate';



export default function PrivateComponent({ isLogin, setIsLogin, addToCart, buyProductData, setBuyProductData, shopListProductData, setShopListProductData, isShopCreate, setIsShopCreate }) {

    const [isFollowing, setIsFollowing] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        check_Auth_Token();
    }, []);

    const check_Auth_Token = async () => {
        const token = Cookies.get("auth_token");
        if (token) {
            let fromData = new FromData();
            fromData.append("token", token);
            const result = await axios.post("http://localhost:5000/getToken", fromData,);
            setIsFollowing(result.data.followings);
            if (result.data.message) {
                setIsLogin(true);
                navigate('/');
            } else {
                Cookies.remove("auth_token");
                setIsLogin(false);
                navigate('/register');
            }
        } else {
            setIsLogin(false);
            navigate('/register');
        }
    }



    return (
        <Routes>
            {
                isLogin ?
                    <>
                        <Route path='/' element={<FrontPage addToCart={addToCart} setShopListProductData={setShopListProductData} />} />
                        <Route path='/secondPage/:catagory' element={<SecondPage addToCart={addToCart} setShopListProductData={setShopListProductData} />} />
                        <Route path='/cplPage/:companyName' element={<CPLPage addToCart={addToCart} setShopListProductData={setShopListProductData} />} />
                        <Route path='/shopListByProduct' element={<ShopListByProduct addToCart={addToCart} shopListProductData={shopListProductData} setBuyProductData={setBuyProductData} />} />
                        <Route path='/buyPage' element={<BuyPage addToCart={addToCart} isShopCreate={isShopCreate} buyProductData={buyProductData} />} />
                        <Route path='/addData' element={<AddData />} />
                        <Route path='/userPage' element={<UserPage />} />
                        <Route path='/shopPage/:shopID' element={<ShopPage />} />
                        <Route path='/shopCreate' element={<ShopCreate setIsShopCreate={setIsShopCreate} />} />
                        <Route path='/shopFollowingPage' element={<ShopFollowingPage />} />
                    </>
                    :
                    <>
                        <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
                        <Route path='/register' element={<Register />} />
                    </>
            }
        </Routes>
    )

}
