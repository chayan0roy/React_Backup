import './UserPage.css'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import FromData from 'form-data';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


export default function UserPage() {
    const navigate = useNavigate();

    const params = useParams();
    useEffect(() => {
        userDetails();
    }, [])

    const [userData, setUserData] = useState();

    const userDetails = async () => {
        const token = Cookies.get("auth_token");
        let fromData = new FromData();
        fromData.append("token", token);
        const result = await axios.post("http://localhost:5000/userDetails", fromData,);
        setUserData(result.data);
    }

    const goToShopFollowingPage = async () => {
		navigate('/shopFollowingPage');
	}

    const createShopCccount = async () => {
        navigate('/shopCreate');
    }

    return (
        <div className='UserPage'> 
            {
				userData
					?
					<div className='accontDetailsTop flex'>
						<div className='imageArea flex'>
							<img src={userData.userImage} />
						</div>
						<div className='textArea flex2'>
							<h1>{userData.userName}</h1>
							<div className='followingArea flex2'>
								<div>
                                <h4 onClick={goToShopFollowingPage}>Following</h4>
									<h4>{userData.followings.length}</h4>
								</div>
							</div>
						</div>
                        <button onClick={createShopCccount}>Create Shop Account</button>
					</div>
					:
					<></>
			}
        </div>
    )
}
