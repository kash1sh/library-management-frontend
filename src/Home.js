import axios from 'axios';
import React, {useEffect, useState } from 'react';


const Home = (props) =>{
    const [books,setBooks]=useState([]);
    const [fine,setFine]=useState(0);
    const [overDueBooks,setOverDueBooks]=useState(0);
    const [showData,setShowData]=useState(false);
    const [error,setError]=useState("");
    const {user}=props;
    useEffect(()=>{
        const getBookList = async ()=>{
            const res = await axios.get('http://localhost:3001/getBooks');
            console.log(res.data.data);
            setBooks(res.data.data);
        }
        getBookList();
    },[]);

    const checkout = async(BookID,BookName,NumberOfCopies)=>{
        const response = await axios.post('http://localhost:3001/checkout',{
            BookID,
            BookName,
            MemberID:user,
            NumberOfCopies
        })
        const booksList = await axios.get('http://localhost:3001/getBooks');
        console.log(booksList.data.data);
        setBooks(booksList.data.data);
       if(response.data.data.status===false){
        setError(response.message);
       } 
        console.log(response);
    }
    const returnBook = async (BookID,BookName,NumberOfCopies)=>{
       const response= await axios.post('http://localhost:3001/return',{
            BookID,
            BookName,
            MemberID:user,
            NumberOfCopies
        })
        console.log(response.data);
        if(response.data.status===false){
            setError(response.data.message);
           } 
        const booksList = await axios.get('http://localhost:3001/getBooks');
        console.log(booksList.data.data);
        setBooks(booksList.data.data);
       
    }

    const getBookData = async (BookID,BookName,NumberOfCopies) =>{
        const response= await axios.post('http://localhost:3001/transactionDetails',{
            MemberID:user
        })
        console.log(response.data);
        setFine(response.data.totalFine);
        setOverDueBooks(response.data.overDueBooks);
        setShowData(true);
        // const res = await axios.get('http://localhost:3001/getBooks');
        // console.log(res.data.data);
        // setBooks(res.data.data);
    }
    return (
        <div>
             {books.map(function(data) {
      return (
        <div>
             <div>
            <span style={{margin:"20px"}}>
          Book Name:  {data.BookName}
          </span>
          <span style={{margin:"20px"}}>
          Book Copies:  {data.NumberOfCopies}
          </span>
          <span style={{margin:"20px"}}>
          <button onClick={()=>{checkout(data.BookID,data.BookName,data.NumberOfCopies)}}>Checkout</button>
          </span>
          <span style={{margin:"20px"}}>
          <button onClick={()=>{returnBook(data.BookID,data.BookName,data.NumberOfCopies)}}>return</button>
          </span>
          <span style={{margin:"20px"}}>
          <button onClick={()=>{getBookData(data.BookID,data.BookName,data.NumberOfCopies)}}>getDetails</button>
          </span>
         
        </div>
       
        </div>
       
      )
    })}
     <span style={{margin:"20px"}}>
          {showData?<div>
            <span style={{margin:"20px"}}>
          Over-Due books:  {overDueBooks}
          </span>
          <span style={{margin:"20px"}}>
          total fine:  {fine}
          </span>
            </div>:<div></div>}
          </span>
     <div style={{color:"red",marginTop:"5rem",marginLeft:"10rem"}}>
            {error?<div>{error}</div>:<div></div>}
        </div>
        </div>
    )
}

export default Home;