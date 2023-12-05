import React, { useState } from 'react'
import FromData from 'form-data';
import Cookies from 'js-cookie';
import axios from 'axios';
import './ShopCreate.css'
import { Link, useNavigate } from 'react-router-dom';
import img from "../../assets/accont.png"


export default function ShopCreate({ setIsShopCreate }) {

	const navigate = useNavigate();
	const shopTypes = ["Grocery", "Electronics"];

	const [shopImage, setShopImage] = useState(img);
	const [shopName, setShopName] = useState();
	const [shopType, setShopType] = useState(shopTypes[0]);
	const [shopAddress, setShopAddress] = useState();
	const [place, setPlace] = useState();

	const convertShopIMG = (e) => {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setShopImage(fileReader.result);
		}
	}

	const handleSubmit = async () => {
		if (shopName && shopType && shopAddress) {
			const token = Cookies.get("auth_token");
			let fromData = new FromData();
			fromData.append("token", token);
			fromData.append("shopImage", shopImage);
			fromData.append("shopName", shopName);
			fromData.append("shopType", shopType);
			fromData.append("shopAddress", shopAddress);
			fromData.append("place", place);
			const result = await axios.post("http://localhost:5000/shopCreate", fromData,);
			setIsShopCreate(true);
			navigate('/shopPage');
		} else {
			alert("Please Fill The field");
		}
	}

	return (
		<div className='shopCreate flex'>
			<div className='shopDetailsArea'>
				<div className='shopInputArea'>
					<div className='input_image_box'>
						<img className='input_image' src={shopImage == "" || shopImage == null ? img : shopImage}></img>
						<input className='image_input' accept='image/*' type='file' name='shopImage' onChange={convertShopIMG}></input>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='name' required onChange={(e) => setShopName(e.target.value)}></input>
						<span>Enter Shop Name</span>
						<i></i>
					</div>
					<div className="select_box">
						<select className='select_box' onChange={(c) => setShopType(c.target.value)}>
							{
								shopTypes.map((c) => {
									return (
										<option value={c}>{c}</option>
									)
								})
							}
						</select>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='name' required onChange={(e) => setShopAddress(e.target.value)}></input>
						<span>Enter Address</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='name' required onChange={(e) => setPlace(e.target.value)}></input>
						<span>Enter Place</span>
						<i></i>
					</div>
					<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
				</div>
			</div>
		</div>
	)
}
