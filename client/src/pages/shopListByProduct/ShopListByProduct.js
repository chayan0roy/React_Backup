import './ShopListByProduct.css';
import React, { useEffect, useState } from 'react'
import FromData from 'form-data';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import addToCartImg from '../../assets/cart1.png'

export default function ShopListByProduct({ addToCart, shopListProductData, setBuyProductData }) {
	const params = useParams();
	const navigate = useNavigate();

	const [shopListByProductData, setShopListByProductData] = useState();

	useEffect(() => {
		getShopListByProducts();
	}, [])

	const getShopListByProducts = async () => {
		let fromData = new FromData();
		fromData.append("productId", shopListProductData._id);
		const result = await axios.post("http://localhost:5000/getShopListByProduct", fromData,);
		setShopListByProductData(result.data)
	}

	const GoByPage = (shopListProductData, sp) => {
		setBuyProductData([shopListProductData, sp])
		navigate('/buyPage');
	}



	return (
		<div className='ShopListByProduct'>

			{
				shopListByProductData ?
					shopListByProductData.map((sp) => {
						return (
							<div className='ShopListByProductDataArea'>
								<img src={shopListProductData.productImage} />
								<h1>{shopListProductData.productName}</h1>
								<h1>{shopListByProductData.shopname}</h1>
								<div className='priceDetails'>
									<h3>Quantity<span>{sp.quantity}</span></h3>
									<span>{sp.productPrice}</span><br />
									<span>{sp.offer}</span><br />
									<span>{(sp.productPrice * sp.offer) / 100}</span><br />
									<span>{sp.deliveryCharge}</span><br />
									<p>Under Line</p>
									<h1>Total Price <span>{((sp.productPrice * sp.offer) / 100) + sp.deliveryCharge}</span></h1>
								</div>
								<div className='bttonArea'>
									<button className="btnAreaBtn" onClick={() => addToCart([shopListProductData, sp])}>
										<img src={addToCartImg} />
									</button>
									<button className="btnAreaBtn" onClick={() => GoByPage(shopListProductData, sp)}>Buy</button>
								</div>
							</div>
						);
					})
					:
					<></>
			}

		</div>

	)
}

