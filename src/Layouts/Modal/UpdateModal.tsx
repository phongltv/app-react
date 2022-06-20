import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { render } from "react-dom";
import { convertTypeAcquisitionFromJson } from "typescript";
import {Book} from '../../Models/Book';
export default class UpdateModal extends React.Component<Book>{
constructor(props:any,book:Book){
    super(props);
    this.state={
        book:{
            id:'',
            title:'',
            content:'',
            price:null
        }
     
    }
}
book:Book={
    id: "",
    content: "",
    price: 0,
    rating: 0,
    title: ""
}

render(){

    return(
        <>
        <Modal
         {...this.props}
       size="lg"
       aria-labelledby="contained-modal-title-vcenter"
       centered
     >
       <Modal.Header closeButton>
         <Modal.Title id="contained-modal-title-vcenter">
           Update Product
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <h4>Product Information</h4>
         <p>
         <Form>
         <Form.Group className="form-group">
               <Form.Label>Id</Form.Label>
               <Form.Control
                 type="text"           
               />
               <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
             </Form.Group>
         <Form.Group className="form-group">
               <Form.Label>Book Title</Form.Label>
               <Form.Control
                 type="text"
                 value={this.book?.title}
               />
               <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
             </Form.Group>
             <Form.Group className="form-group">
               <Form.Label>Book Content</Form.Label>
               <Form.Control as="textarea" rows={3}
                 type="text"
                 value={this.book?.content}
  
               />
               <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
             </Form.Group>
             <Form.Group className="form-group">
               <Form.Label>Price</Form.Label>
               <Form.Control
                 type="number"
                 value={this.book?.price}
               />
               <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
             </Form.Group>
             
             </Form>
         </p>
       </Modal.Body>
       <Modal.Footer>
         <Button className="btn btn-primary">Save</Button>
         <Button className="btn btn-secondary">Close</Button>
       </Modal.Footer>
     </Modal>
         </>


    )
}



}