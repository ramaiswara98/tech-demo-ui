import React from "react";
import { Card } from "react-bootstrap";
import "./ImageCard.css"



export const ImageCard = (props) => {
  const artDetails = props.artDetail;
  return (
    
        <Card 
        className={"card-image"+(artDetails.status ? " selected":"" )}
        onClick={()=>props.selected(props.index, artDetails)}
        >
            <Card.Img variant="top" src={props.artDetail.link} className={"cardImage"}/>
            <Card.Title>{"Pic "+(parseInt(props.artDetail.id)+1)}</Card.Title>
            <Card.Text>Created by Rama Iswara</Card.Text>
        </Card>
    
  )
}
