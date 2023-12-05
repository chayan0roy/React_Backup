import './ShopPage.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import ShopPageCard from './ShopPageCard';

export default function ShopPage({ addToCart, setBuyProductData }) {
	const navigate = useNavigate();
	const params = useParams();
	const allCatagory = ["cookies", "cake", "brade", "milkShake", "hotdog"];
	useEffect(() => {
		getShopData();
	}, [])

	const [shopData, setShopData] = useState();
	const [shopProducts, setsShopProducts] = useState();

	const getShopData = async () => {
		const result = await axios.get(`http://localhost:5000/getShopData/${params.shopID}`);
		setShopData(result.data);
	}
console.log(shopData);
	const goToShopFollowingPage = async () => {
		navigate('/shopFollowingPage');
	}

	const getShopProducts = async () => {
		const result = await axios.get(`http://localhost:5000/getShopProducts/${shopData.shopProductListId}`);
		setsShopProducts(result.data);
	}
	
	return (
		<div className='ShopPage'>
			{
				shopData
					?
					<div className='accontDetailsTop flex'>
						<div className='imageArea flex'>
							<img src={shopData.shopImage} />
						</div>
						<div className='textArea flex2'>
							<h1>{shopData.shopName} <span>({shopData.shopType})</span></h1>
							<h4>{shopData.shopAddress}</h4>
							<div className='followingArea flex2'>
								<div>
									<h4>Products</h4>
									<h4>2300</h4>
								</div>
								<div>
									<h4>Follower</h4>
									<h4>{shopData.followers.length}</h4>
								</div>
								<div>
									<h4 onClick={goToShopFollowingPage}>Following</h4>
									{/* <h4>{shopData.followings.length}</h4> */}
								</div>
							</div>
						</div>
					</div>
					:
					<></>
			}

			<div className='accontDetailsBottom'>
				<div className='topBar'>
					<ul>
						<li onClick={getShopProducts}>Products</li>
						<li>Photos</li>
					</ul>
				</div>
				<div className='topBar topBar1 flex'>
					{
						shopData
							?
							<>
								<Link className='btn topBarBtn' to="/">Shopping</Link>
								<Link className='btn topBarBtn' to="/">Shopping Following Shop</Link>
								<Link className='btn topBarBtn' to='/addData'>Add Data</Link>
							</>
							:
							<></>
					}
				</div>
				<div className='shopBody'>
					<div className='ShopBodyArea'>
						{
							shopProducts
								?
								<>
									<div className='ShopBodyAreaTop'>
										<h1>{allCatagory[0]}</h1>
										<Link className='link' to={`/secondPage/${allCatagory[0]}`}>See All</Link>
									</div>
									<div className='ShopBodyAreaBottom'>
										{
											shopProducts.map((e) => {
												if (e.products.catagory === allCatagory[0]) {
													return (
														<ShopPageCard cardData={e} addToCart={addToCart} setBuyProductData={setBuyProductData} />
													);
												}
											})
										}
									</div>
								</>
								:
								<></>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
