import './CPLPage.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';

export default function CPLPage({ addToCart, setShopListProductData }) {
	const navigate = useNavigate();
	const params = useParams();

	const [resultData, setResultData] = useState();

	useEffect(() => {
		getCPData();
	}, [])

	const getCPData = async () => {
		let result = await fetch(`http://localhost:5000/CPData/${params.companyName}`);
		result = await result.json();
		setResultData(result)
	}

	return (
		<div className='cplPage'>
			<div className='colPageBoxArea boxAreaBottom'>
				{
					resultData ?
						resultData.map((e) => {
							return (
								<Card cardData={e} addToCart={addToCart} setShopListProductData={setShopListProductData} />
							);
						})
						:
						<></>
				}
			</div>
		</div>

	)
}

