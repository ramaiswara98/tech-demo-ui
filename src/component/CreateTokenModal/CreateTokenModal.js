import React, {useEffect, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TokenCaller from '../../api/TokenCaller';

export default function CreateTokenModal(props) {
    const [name,setName]=useState();
    const [payerSecretKey, setPayerSecretKey] = useState();
    const [alert,setAlert] = useState();

    useEffect(()=> {
        const getPayerSecretKey = () => {
            if(props.payerList.length > 0){
                setPayerSecretKey(props.payerList[0].secretKey)
            }
            
        }
        getPayerSecretKey();
        
    },[props.payerList])
    
    const onChange = (e) => {
        if(e.target.name === "name") {
            setName(e.target.value);
        }
        if(e.target.name === "payer") {
            setPayerSecretKey(e.target.value);
        }
    }

    const createToken = async() => {
        setAlert(<Alert variant='secondary'>Creating Token ...</Alert>)
        const data = {
            name,
            payerSecretKey,
            holderWallet:props.accountData.walletPublicKey
        }

        const createToken = await TokenCaller.createToken(data);
        if(createToken){
            setAlert(<Alert variant='success'>Token Successfully Created</Alert>)
            window.location.reload();
        }
    }
    
  return (
    <div>
        
        <Modal show={props.show} onHide={()=> {props.toggle()}}>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Token Name</Form.Label>
                        <Form.Control type='text' name={'name'} value={name} onChange={(e)=> {onChange(e)}}></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Choose Payer</Form.Label>
                        <Form.Select name={'payer'} onChange={(e)=> {onChange(e)}}>
                          {props.payerList.map((payer,index) => {
                            return(<option value={payer.secretKey}>{payer.name+" ("+payer.amount+" SOL)"}</option>)
                          })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Holder Wallet Address</Form.Label>
                        <Form.Control type='text' value={props.accountData.walletPublicKey} disabled></Form.Control>
                    </Form.Group>
                    <div style={{textAlign:"center", margin:"20px auto"}}>
                        <Button className='btn btn-primary' onClick={() => {createToken()}}>Create Token</Button>
                    </div>
                    {alert}
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
