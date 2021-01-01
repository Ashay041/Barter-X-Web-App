import React from 'react';
import phone from './images/phone.jpg'
import "../styles/style.css";
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
  } from 'reactstrap';

function Array (props)  {
    
    return (   
                
                <div className="item col-md-3 col-sm-4"  style={{marginTop:"2%"}} >
                <Card className="hover">
                <CardBody>
                  <CardTitle><b>Product Name : </b>{props.name}</CardTitle>
                  <CardSubtitle><b>category : </b>{props.category}</CardSubtitle>
                </CardBody>
               <CardImg src={phone} alt="" style={{height:"200px",padding:"5px"}}/>
                <CardBody>
                  <CardText style={{color:"black"}}><b>Price : </b>{props.price}</CardText>
                  <CardText style={{color:"black"}}><b>Owner : </b>{props.owner}</CardText>
                  <button  className="btn btn-primary mx-2">BUY</button>
                  <button  className="btn btn-primary mx-2"><a href="/barter">Barter</a></button>
                </CardBody>
              </Card>
                </div>  
                
    )   
    
    }

export default Array;

