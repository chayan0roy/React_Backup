import './AddToCart.css'
import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import FromData from 'form-data';
import axios from 'axios';
import Cookies from 'js-cookie';

import cartImg from '../../assets/cart.png'
import crossImg from '../../assets/cross.png'
import deletImg from '../../assets/trash.png'
import plusImg from '../../assets/PLS.png'
import minusImg from '../../assets/MNS.png'

export default function AddToCart({ PPCartData, setPPCartData, isShopCreate }) {
	const token = Cookies.get("auth_token");
	const navigate = useNavigate();

	const [cartOpen, setCartOpen] = useState(false)

	const close = () => {
		setCartOpen(null)
	}

	const [cart, setCart] = useState([]);

	let buyChartProdctsData = [];
	// const [buyChartProdctsData, setBuyChartProdctsData] = useState([]);


	useEffect(() => {
		setCart(PPCartData);
	}, [PPCartData])

	const buyChartProdcts = async () => {
		if (isShopCreate) {
			cart.map((c) => {
				buyChartProdctsData = buyChartProdctsData.concat(
					{
						productId: c._id,
						quantity: c.quantity,
						productPrice: 200,
						sellType: "pkt",
						offer: 2,
						deliveryCharge: 30
					}
				)
			})
		
			const result = await axios.post("http://localhost:5000/buyChartProdcts", {
				token: token,
				buyChartProdctsData: buyChartProdctsData
			});
		} else {
			setCart([]);
			alert('You successfully buy product');
			navigate('/');
		}
	}



	return (
		<div className='cartList'>
			{cart ? (
				<>
					<div className='cartImg' onClick={() => setCartOpen(!cartOpen)}>
						<img src={cartImg}></img>
						<span className='flex'>{cart.length}</span>
					</div>

					{cartOpen && (
						<div className='openCart'>
							<div className='cartTop flex3'>
								<h1>Your Cart</h1>
								<div onClick={close}>
									<img src={crossImg}></img>
								</div>
							</div>
							<div className='cartList'>
								{
									cart.map((cartData, cartIndex) => {
										return (
											<div className='cart flex2'>
												<div className='leftArea flex3'>
													<img src={cartData[0].productImage} ></img>
													<h1>{cartData[0].productName}</h1>
												</div>
												<div className='rightArea flex2'>
													<button className='decrease_value' onClick={() => {
														const CART = cart.map((item, indx) => {
															return (cartIndex === indx ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item)
														})
														setCart(CART);
													}}>
														<img src={minusImg}></img>
													</button>
													<h3>{cartData.quantity}</h3>
													<button className='increase_value' onClick={() => {
														const CART = cart.map((item, indx) => {
															return (cartIndex === indx ? { ...item, quantity: item.quantity + 1 } : item)
														})
														setCart(CART);
													}}>
														<img src={plusImg}></img>
													</button>
													<div className='rpoductPrice'>
														<h3>{(cartData[1].productPrice - ((cartData[1].productPrice * cartData[1].offer) / 100)) * cartData.quantity}</h3>
														<h3 className='flex3'><del>{cartData[1].productPrice * cartData.quantity}</del></h3>
													</div>

													<button className='deleteChart flex' onClick={() => {
														const newChart = cart.filter((i) => (i[0]._id !== cartData[0]._id && i[1]._id !== cartData[1]._id));
														setCart(newChart);

														if (cart.length == 1) {
															setPPCartData([]);
														}
													}}><img src={deletImg}></img></button>
												</div>
											</div>
										)
									})
								}
								<div className='pricelist'>
									<h2 className='flex3'>Total Items <span>{cart.length}</span></h2>
									<h2 className='flex3'>Total amount <span>
										{
											cart.map(item => (item[1].productPrice - ((item[1].productPrice * item[1].offer) / 100)) * item.quantity).reduce((total, value) => total += value, 0)
										}
									</span></h2>
									<button className="pricelistBuyBtn btn" onClick={buyChartProdcts}>Buy</button>
								</div>
							</div>

						</div>
					)}
				</>
			) : (
				<button>Add to cart</button>
			)}
		</div>
	)
}