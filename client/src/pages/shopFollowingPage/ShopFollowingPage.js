import './ShopFollowingPage.css';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import FromData from 'form-data';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ShopFollowingPage() {
	const allPlaces = ["Bagdah", "Helencha", "phone_number"];

	const [place, setPlace] = useState(allPlaces[0]);
	const [isPlace, setIsPlace] = useState();
	const [isFollowingList, setIsFollowingList] = useState();

	useEffect(() => {
		followingList();
	}, []);

	const followingList = async () => {
		const token = Cookies.get("auth_token");
		let fromData = new FromData();
		fromData.append("token", token);
		const result = await axios.post("http://localhost:5000/followingList", fromData,);
		setIsFollowingList(result.data);
	}

	const getShopByPlaces = async () => {
		const token = Cookies.get("auth_token");
		let fromData = new FromData();
		fromData.append("token", token);
		fromData.append("place", place);
		const result = await axios.post("http://localhost:5000/getShopByPlace", fromData,);
		setIsPlace(result.data);
	}

	const follow = async (p) => {
		const token = Cookies.get("auth_token");
		let fromData = new FromData();
		fromData.append("token", token);
		fromData.append("shopId", p._id);
		fromData.append("shopName", p.shopName);
		fromData.append("shopImage", p.shopImage);
		fromData.append("shopCatagory", p.shopType);

		const result = await axios.post("http://localhost:5000/follow", fromData,);
	}

	return (
		<div className='ShopFollowingPage'>
			<div className='ShopFollowingPageTop'>
				{
					isFollowingList
						?
						<div className='ShopFollowingPageBottom flex'>
							{
								isFollowingList.map((fl) => {
									return (
										<div className='ShopFollowingList flex3'>
											<img src={fl.followingImage} />
											<h1 >{fl.followingName}</h1>
											<h3>{fl.followingCatagory}</h3>
											<Link className='btn ShopFollowingListBtn' to={`viewShop/${fl.followingID}`}>Visit</Link>
										</div>
									)
								})
							}
						</div>
						:
						<></>
				}
			</div>
			<div className='ShopFollowingPageMiddil'>
				<select onChange={(c) => setPlace(c.target.value)}>
					{
						allPlaces.map((c) => {
							return (
								<option value={c}>{c}</option>
							)
						})
					}
				</select>
				<button onClick={getShopByPlaces}>Search By Place</button>
			</div>
			{
				isPlace ?
					<div className='ShopFollowingPageBottom flex'>
						{
							isPlace.map((p) => {
								return (
									<div className='ShopFollowingList flex3'>
										<img src={p.shopImage} />
										<h1 >{p.shopName}</h1>
										<h3>{p.shopType}</h3>
										<button className='btn ShopFollowingListBtn' onClick={() => follow(p)}>Follow</button>
										{/* <Link className='btn ShopFollowingListBtn' to={`viewShop/${p._id}`}>Visit</Link> */}
									</div>
								)
							})
						}
					</div>
					:
					<></>
			}
		</div>
	)
}
