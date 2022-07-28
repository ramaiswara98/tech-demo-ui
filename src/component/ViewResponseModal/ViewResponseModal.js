import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import "./ViewResponseModal.css"


export default function ViewResponseModal(props) {
    const response = props.response;
  return (
    <div>
        <Modal show={props.show} onHide={() => {props.toggle()}} dialogClassName={"modal-dialogs"}>
            <Modal.Body>
                {props.response !== null ? (
                    <>
                     <div style={{textAlign:"center"}}><h3>{props.response.accountData.name}</h3></div>
                        <div className='galeryContainer'>
                            {props.response.answer.map((answer,index) => {
                                return(<>
                                     <Card className={'card-images selected'} key={index}>
                                        <Card.Img variant="top" src={answer.link} className={"cardImage"}/>
                                        <Card.Title style={{textAlign:"center"}}>{"Pic "+(parseInt(answer.id)+1)}</Card.Title>
                                     </Card>
                                </>)
                            })}
                        </div>
                        
                    </>
                ):(
                    <>
                    No Response Yet
                    </>
                )}
               
            </Modal.Body>
        </Modal>
    </div>
  )
}
