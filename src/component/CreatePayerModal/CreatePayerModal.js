import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL, PUBLIC_KEY_OF_TOKEN} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import  bs58  from "bs58";

import PayerCaller from '../../api/PayerCaller';

export default function CreatePayerModal(props) {
    const [name,setName] = useState();

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const generatePayer = async() => {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromWallet = await Keypair.generate();
        // const publicKey = fromWallet.publicKey.toBase58();
        // const secretKey = bs58.encode(new Uint8Array(fromWallet.secretKey));
        const data = {
            name,
            secretKey : bs58.encode(new Uint8Array(fromWallet.secretKey)),
            publicKey : fromWallet.publicKey.toBase58(), 
        }
        const payer = await PayerCaller.createPayer(data);
        if(payer !== null ){
            if(payer.success){
                alert('Payer Successfully Created');
                window.location.reload();
            }else{

            }
        }
    }

    const onChange = (e) => {
        if(e.target.name === "name"){
            setName(e.target.value);
        }
    }

    
  return (
    <div>
        <Modal show={props.show} centered onHide={() =>{props.toggle()}}>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Payer Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter payer name' name={'name'} onChange={(e) => {onChange(e)}} value={name}></Form.Control>
                    </Form.Group>
                    <div style={{textAlign:"center"}}>
                        <Button className='btn btn-primary' style={{margin:"20px auto", textAlign:"center"}} onClick={()=> {generatePayer()}}>Generate Payer Account</Button>
                    </div>
                    
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
