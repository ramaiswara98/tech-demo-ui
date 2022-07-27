import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import  bs58  from "bs58";

import RequestCaller from '../../api/RequestCaller';

export default function AcceptRequestModal(props) {
    const [alert,setAlert] = useState();
    const [signatureReal, setSignatureReal] = useState("none")

  const onClickYes = () => {
    console.log(props.requestData.existing)
    if(props.requestData.existing === true){
        setAlert(<Alert variant='secondary'>Processing Request ...</Alert>)
        const requestData = props.requestData;
        const holderWallet = props.holderWallet;
        const data = {
            requestData,
            holderWallet
        }
        const signature = RequestCaller.acceptRequestExistingToken(data);
        if(signature){
            setAlert(<Alert variant='success'>Successfully Transfer Token</Alert>)
            window.location.reload()
        }else{
            setAlert(<Alert variant='danger'>Failed to Accept Request, Something Wrong !</Alert>)
        }
    }else{
        setAlert(<Alert variant='secondary'>Processing Request ...</Alert>)
        const requestData = props.requestData;
        const holderWallet = props.holderWallet;
        const data = {
            requestData,
            holderWallet
        }
        const signature = RequestCaller.acceptRequest(data);
        if(signature){
            setAlert(<Alert variant='success'>Successfully Transfer Token</Alert>)
            window.location.reload()
        }else{
            setAlert(<Alert variant='danger'>Failed to Accept Request, Something Wrong !</Alert>)
        }
    }
   
  }  


  
  return (
    <div>
       
        <Modal show={props.show} onHide={()=> {props.toggle()}} centered>
            <Modal.Body>
                {signatureReal === "none" ? (
                    <>
                        <h4>Accept Request</h4>
                        <p>Are you sure want to accept this request ?</p>
                        <div style={{textAlign:"center", margin:"20px auto"}}>
                            
                            <Button className='btn btn-danger'>No</Button>
                            <Button className='btn btn-primary' style={{marginLeft:"20px"}} onClick={() =>onClickYes()}>Yes</Button>
                        </div>
                        {alert}
                    </>
                ):(
                    <>
                        <h4>Request Accpeted</h4>
                        <p>You can see the history by click signature below :</p>
                        <a href={"https://solscan.io/search?q="+signatureReal.tokenId+"&cluster=devnet"} target={"_blank"} rel="noopener noreferrer">{signatureReal.data.signature}</a>
                        <div>
                            <Button className='btn btn-primary' onClick={()=> {props.toggle()}}>Okay</Button>
                        </div>
                    </>
                )}
                
            </Modal.Body>
        </Modal>
    </div>
  )
}
