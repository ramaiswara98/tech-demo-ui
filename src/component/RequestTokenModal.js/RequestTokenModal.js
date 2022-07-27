import React, { useState } from 'react'
import { Alert, Button, Form, Modal, ModalBody } from 'react-bootstrap'

import RequestCaller from '../../api/RequestCaller';

export default function RequestTokenModal(props) {
    const [selectedToken,setSelectedToken] = useState({});
    const [amount,setAmount] = useState();
    const [alert,setAlert] = useState();

    const onChange = (e) => {
        if(e.target.name === "token"){
            console.log(e.target.value)
            setSelectedToken(props.tokenList[e.target.value])
        }

        if(e.target.name === "amount"){
            setAmount(e.target.value);
        }
    }

    const onClickRequest = async() => {
        setAlert(<Alert variant='secondary' >Creating Request Token on Server ...</Alert>)
        const organiserName = props.accountData.name;
        const organiserWallet = props.accountData.walletPublicKey;
        let existing = false
        if(props.ownTokenList.length > 0 ){
            for(let i=0;i<props.ownTokenList.length;i++){
                if(props.ownTokenList[i].tokenId === selectedToken.tokenId){
                    existing = true
                }
            }
            const token = {
                name:selectedToken.name,
                tokenId:selectedToken.tokenId
            };
            const data = {
                organiserName,
                organiserWallet,
                token,
                existing,
                amount
            }
            const request = await RequestCaller.createRequest(data);
            if(request){
                if(request.data){
                    setAlert(<Alert variant='success' >Successfully Request Token</Alert>)
                    window.location.reload();
                }else{
                    setAlert(<Alert variant='danger' >Failed to Request Token, Something Wrong !</Alert>)
                }
            }
        }else{
            const token = {
                name:selectedToken.name,
                tokenId:selectedToken.tokenId
            };
            const data = {
                organiserName,
                organiserWallet,
                token,
                existing,
                amount
            }
            const request = await RequestCaller.createRequest(data);
            if(request){
                if(request.data){
                    setAlert(<Alert variant='success' >Successfully Request Token</Alert>)
                    window.location.reload();
                }else{
                    setAlert(<Alert variant='danger' >Failed to Request Token, Something Wrong !</Alert>)
                }
            }
        }
        
       
    }
  return (
    <div>
        <Modal show={props.show}  onHide={() => {props.toggle()}}>
            <ModalBody>
                <Form>
                    <Form.Group>
                        <Form.Label>Token</Form.Label>
                        <Form.Select onChange={(e)=>{onChange(e)}} name={"token"}>
                            {props.tokenList.length > 0 ? (
                                <>
                                <option selected disabled>Choose Token</option>
                                {props.tokenList.map((tokens,index) => {
                                    const token={
                                        name:tokens.name,
                                        tokenId:tokens.tokenId
                                    }
                                    return(
                                    <option value={index}>{tokens.name}</option>)
                                })}
                                </>
                            ):(
                                <>
                                <option>No Token Available Yet</option>
                                </>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder='Enter amount of token' value={amount} onChange={(e)=>{onChange(e)}} name={"amount"}></Form.Control>
                    </Form.Group>

                    <div style={{textAlign:"center", margin:"20px auto"}}>
                        <Button className='btn btn-primary' onClick={()=>{onClickRequest()}}>Request Token</Button>
                    </div>
                    {alert}
                </Form>
            </ModalBody>
        </Modal>

    </div>
  )
}
