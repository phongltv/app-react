import { API,graphqlOperation } from "aws-amplify";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { Book } from "../../Models/Book";
import { queries } from '../../graphql/queries';
import { Header } from "antd/lib/layout/layout";
import './BookDetail.css'
import { MyModal } from "../../Layouts/Modal/Modal";
import UpdateModal from "../../Layouts/Modal/UpdateModal";
export default function BookDetail(){

   let detail:Book={
      id: "",
      content: "",
      price: 0,
      rating: 0,
      title: ""
   };
   const editModal:CSSProperties={
      width:'100%',

   }

   const params:any=useParams();
   const id:string=params.id;
   const [isOpen,setIsOpen]=useState(false);
   const [bookDetail,setBookDetail]=useState(detail);
   const getBookDetail:any=async()=>{ 
     try{ 
      const response:any=await API.graphql(graphqlOperation(queries.getBookById, { id:id }))
      let detail:Book=response.data.getBook
     setBookDetail(detail)
     console.log(detail)
   }
    catch(error:any){
         console.log(error)
    }
   }
 
   useEffect(
      ()=>{
     getBookDetail()
      },[]
   )
 return(
    <Container className="mt-3">
      <Header className="justify-content-center" style={{textAlign:'center'}}>Product Detail</Header>
      <table id='detail'>
         <tbody>
      <tr>
    <th>Book Title</th>
    <td>{bookDetail.title}</td>
  </tr>
  <tr>
    <th>Content</th>
    <td>{bookDetail.content} </td>
  </tr>
  <tr>
    <th>Price</th>
    <td>{bookDetail.price}</td>
  </tr>
  <tr>
    <th>Rating</th>
    <td>{bookDetail.rating}</td>
  </tr>
  <tr>
   <td colSpan={2}>
      <Button style={{width:'100%'}} onClick={()=>setIsOpen(true)}>Edit</Button>
      </td>
   </tr></tbody>

      </table>
<MyModal 
book={detail}
onHide={()=>setIsOpen(false)}
show={isOpen}
/>
{/* <UpdateModal 
book={bookDetail}
onHide={()=>setIsOpen(false)}
show={isOpen}
/> */}
    </Container>
 )
}