import './SecondPage.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../../components/card/Card';

export default function SecondPage({ addToCart, setShopListProductData }) {
	const params = useParams();

	const [resultData, setResultData] = useState();

	useEffect(() => {
		getSPCodeData();
	}, [])

	const getSPCodeData = async () => {
		let result = await fetch(`http://localhost:5000/SPCodeData/${params.catagory}`);
		result = await result.json();
		setResultData(result)
	}

	return (
		<div className='secondPage'>
			<div className='SecondPageBoxArea boxAreaBottom'>
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

