
import React, { CSSProperties, PropsWithRef, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Book } from "../../Models/Book";
import { setConstantValue } from "typescript";
export const MyModal = (props:any,book:Book) => {
    const updateProduct=Yup.object().shape({
        id:Yup.string().required('Id must not be empty'),
        title:Yup.string().required('Book title is required').min(4,'Minimum 4 characters'),
        content:Yup.string().required('Content must not be empty'),
        price:Yup.number().required('Price must be set')
     })
     const updateProductSchema=updateProduct
     const{register,handleSubmit,getValues,setValue}=useForm({
        resolver:yupResolver(updateProductSchema)
     })
    useEffect(()=>{
      if(book){
     setValue("id",book.id)
     setValue("title",book.title)
     setValue("content",book.content)
     setValue("price",book.price)
     console.log(book)
      }
      else{
        console.log('no book')
      }
    },[book])
    return (
        <>
       <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Details</h4>
        <p>
        <Form>
        <Form.Group className="form-group">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                {...register('id')}
               
              />
              <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
            </Form.Group>
        <Form.Group className="form-group">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                {...register('title')}
              />
              <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Book Content</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text"
              />
              <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                {...register('price')}
              />
              <Form.Control.Feedback className="invalid-feedback"></Form.Control.Feedback>
            </Form.Group>
            
            </Form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-primary">Save</Button>
        <Button onClick={props.onHide} className="btn btn-secondary">Close</Button>
      </Modal.Footer>
    </Modal>
        </>
    )
}



