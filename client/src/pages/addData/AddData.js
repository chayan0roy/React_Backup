import React, { useState } from 'react'
import FromData from 'form-data';
import Cookies from 'js-cookie';
import axios from 'axios';
import './AddData.css'
import downloadImg from '../../assets/downloadImg.png'


export default function AddData() {

    const allSellingType = ["container", "peti"];
    const allCatagory = ["cookies", "cake", "brade", "milkShake", "hotdog"];
    
    const [productName, setProductName] = useState();
    const [productImage, setProductImage] = useState();
    const [companyName, setCompanyName] = useState();
    const [companyImage, setCompanyImage] = useState();
    const [sellType, setSellType] = useState(allSellingType[0]);
    const [catagory, setCatagory] = useState(allCatagory[0]);
    const [productPrice, setProductPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [description, setDescription] = useState();
    const [offer, setOffer] = useState();
    const [deliveryCharge, setDeliveryCharge] = useState();
    const [rating, setRating] = useState();

    const convertProductIMG = (e) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
            setProductImage(fileReader.result);
        }
    }

    const convertCompanyIMG = (e) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
            setCompanyImage(fileReader.result);
        }
    }

    const handleSubmit = async () => {
        const token = Cookies.get("auth_token");
        let fromData = new FromData();
        fromData.append("token", token);
        fromData.append("productName", productName);
        fromData.append("productImage", productImage);
        fromData.append("companyName", companyName);
        fromData.append("companyImage", companyImage);
        fromData.append("sellType", sellType);
        fromData.append("catagory", catagory);
        fromData.append("productPrice", productPrice);
        fromData.append("quantity", quantity);
        fromData.append("description", description);
        fromData.append("offer", offer);
        fromData.append("deliveryCharge", deliveryCharge);
        fromData.append("rating", rating);
        
        const result = await axios.post("http://localhost:5000/addData", fromData,);
        if(result.status === 201) {
            alert("Product uploaded");
        }
    }

    return (
        <div className='addData flex'>
            <div className='leftSide'>
                <div class="input_box">
                    <input className='input_box' type='text' name='name' required onChange={(e) => setProductName(e.target.value)}></input>
                    <span>Product Name</span>
                    <i></i>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='companyName' required onChange={(e) => setCompanyName(e.target.value)}></input>
                    <span>Company Name</span>
                    <i></i>
                </div>
                <div class="select_box">
                    <select onChange={(c) => setCatagory(c.target.value)}>
                        {
                            allCatagory.map((c) => {
                                return (
                                    <option value={c}>{c}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div class="select_box">
                    <select onChange={(s) => setSellType(s.target.value)}>
                        {
                            allSellingType.map((s) => {
                                return (
                                    <option value={s}>{s}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='description' required onChange={(e) => setProductPrice(e.target.value)}></input>
                    <span>Product Price</span>
                    <i></i>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='description' required onChange={(e) => setDescription(e.target.value)}></input>
                    <span>Product Description</span>
                    <i></i>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='description' required onChange={(e) => setQuantity(e.target.value)}></input>
                    <span>Product Quantity</span>
                    <i></i>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='rating' required onChange={(e) => setOffer(e.target.value)}></input>
                    <span>Offer</span>
                    <i></i>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='rating' required onChange={(e) => setDeliveryCharge(e.target.value)}></input>
                    <span>Delivery Charge</span>
                    <i></i>
                </div>
                <div class="input_box">
                    <input className='input_box' type='text' name='rating' required onChange={(e) => setRating(e.target.value)}></input>
                    <span>Rating</span>
                    <i></i>
                </div>
                <button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='rightSide'>
                <div className='input_img_box flex'>
                    <img src={productImage == "" || productImage == null ? downloadImg : productImage}></img>
                    <input className='image_input' accept='image/*' name='image' type='file' onChange={convertProductIMG}></input>
                </div>
                <div className='input_img_box flex'>
                    <img src={companyImage == "" || companyImage == null ? downloadImg : companyImage}></img>
                    <input className='image_input' accept='image/*' name='image' type='file' onChange={convertCompanyIMG}></input>
                </div>
            </div>
        </div>
    )
}