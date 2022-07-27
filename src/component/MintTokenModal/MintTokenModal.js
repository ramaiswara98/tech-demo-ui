import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TokenCaller from '../../api/TokenCaller';

export default function MintTokenModal(props) {

const [amount,setAmount]  =useState(0);
const [alert,setAlert] = useState();

const onChange = (e) => {
    setAmount(e.target.value);
}

const onClick = async() => {
    setAlert(<Alert variant='secondary'>Minting Token</Alert>)
    console.log("clicked")
    const data = {
        _id:props._id,
        tokenId:props.tokenId,
        amount
    }
    // console.log(props._id+" "+props.tokenId+" "+amount.toString())

    const mintingToken = await TokenCaller.mintingToken(data);
    console.log(mintingToken)
    if(mintingToken){
        setAlert(<Alert variant='success'>Successfully Minting Token</Alert>);
        window.location.reload();
        
    }
}

  return (
    <div>
        <Modal show={props.show} onHide={() => {props.toggle()}}>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type='number' value={amount} onChange={(e) => onChange(e)}></Form.Control>
                    </Form.Group>
                    <div style={{textAlign:"center", margin:"20px auto"}}>
                        <Button className='btn btn-primary' onClick={() => {onClick()}}>Mint Token</Button>
                    </div>
                    {alert}
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
