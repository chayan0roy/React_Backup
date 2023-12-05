import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react'

import Header from './components/header_footer/Header';
import PrivateComponent from './components/privateComponent/PrivateComponent';

function App() {

	const [isShopCreate, setIsShopCreate] = useState(false);

	const [isLogin, setIsLogin] = useState();
	const [buyProductData, setBuyProductData] = useState([]);
	const [shopListProductData, setShopListProductData] = useState();

	const [PPCartData, setPPCartData] = useState([]);

	const addToCart = (newPPCartData) => {
		let found = false;
		let i = 0;

		for (i in PPCartData) {
			if (PPCartData[i][0]._id === newPPCartData[0]._id && PPCartData[i][1]._id === newPPCartData[1]._id) {
				found = true;
				break;
			}
		}

		if (found) {
			PPCartData[i].quantity++;
		} else {
			setPPCartData([...PPCartData, { ...newPPCartData, quantity: 1 }]);
		}
	}


	return (
		<div className="App">
			<BrowserRouter>
				<Header
					addToCart={addToCart}
					PPCartData={PPCartData}
					setPPCartData={setPPCartData}
					isLogin={isLogin}
					setIsLogin={setIsLogin}
					setBuyProductData={setBuyProductData}
					setShopListProductData={setShopListProductData}
					isShopCreate={isShopCreate}
					setIsShopCreate={setIsShopCreate}
				/>
				<PrivateComponent
					isLogin={isLogin}
					setIsLogin={setIsLogin}
					addToCart={addToCart}
					buyProductData={buyProductData}
					setBuyProductData={setBuyProductData}
					shopListProductData={shopListProductData}
					setShopListProductData={setShopListProductData}
					isShopCreate={isShopCreate}
					setIsShopCreate={setIsShopCreate}
				/>
			</BrowserRouter>
		</div>
	);
}

export default App;



