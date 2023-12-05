import React, { useEffect, useState } from 'react'
import FromData from 'form-data';
import axios from 'axios';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import img from "../../assets/accont.png"


export default function Register() {

	const navigate = useNavigate();

	const [userImage, setUserImage] = useState(img);
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userCpassword, setUserCpassword] = useState("");

	const convertUserIMG = (e) => {
		var fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = () => {
			setUserImage(fileReader.result);
		}
	}

	const handleSubmit = async () => {
		if (userImage && userName && userEmail && userPassword && userCpassword) {
			if (userPassword === userCpassword) {
				let fromData = new FromData();
				fromData.append("userImage", userImage);
				fromData.append("userName", userName);
				fromData.append("userEmail", userEmail);
				fromData.append("userPassword", userPassword);

				const result = await axios.post("http://localhost:5000/register", fromData,);
				navigate('/login');
			} else {
				alert("Password and Confrom Password");
			}
		} else {
			alert("Please Fill The field");
		}
	}

	return (
		<div className='register'>
			<div className='clientRegister'>
				<div className='clientInputArea'>
					<div className='input_image_box'>
						<img className='input_image' src={userImage == "" || userImage == null ? img : userImage}></img>
						<input className='image_input' accept='image/*' type='file' name='userImage' onChange={convertUserIMG}></input>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='name' required onChange={(e) => setUserName(e.target.value)}></input>
						<span>Enter User Name</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='email' name='email' required onChange={(e) => setUserEmail(e.target.value)}></input>
						<span>Enter Email</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='password' required onChange={(e) => setUserPassword(e.target.value)}></input>
						<span>Enter Password</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='cpassword' required onChange={(e) => setUserCpassword(e.target.value)}></input>
						<span>Enter Confirm Password</span>
						<i></i>
					</div>
					<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
					<Link className='link' to="/login">Login your Account</Link>
				</div>
			</div>
		</div>
	)
}
