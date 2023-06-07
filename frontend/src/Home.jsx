import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Home.css";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [reload, setReload]=useState(false)
    useEffect(() => {
        axios.get("http://localhost:8080/")
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [reload]);

    const handleClick = () => {
        navigate("/AddProduct");
      };
    const handleDelete=(id)=>{
        let header={}
        let req={id}
        axios.post("http://localhost:8081/delete",req,header)
        .then((res) => {
          setReload(!reload)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className='ProductPage'>
            <div className="Productshead">
                <div className='Head_left'>
                    <h1>Products Page</h1>
                </div>
                <div className="Header_right" >
                    <button onClick={()=>{handleClick();}} >
                        Add Product
                    </button>
                </div>
            </div>
            <div className='Productcontent'>
                {data.map((product) => (
                    <div key={product.Id}>

                        <div className='Products'>
                            <div className='ProductImg'>
                                <img src={product.Image} alt='' />
                            </div>
                            <div className='ProductRow'>
                                <h2><u>{product.Title}</u></h2>
                                <h3>Rs.{product.Price}.00</h3>
                                <h4>{product.CompanyName}</h4>
                                <div className='button'>
                                <button onClick= { ()=> handleDelete(product.Id)}><AiFillDelete/></button></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
