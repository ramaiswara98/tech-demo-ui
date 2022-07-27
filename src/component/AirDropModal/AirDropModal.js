import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL, PUBLIC_KEY_OF_TOKEN} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import  bs58  from "bs58";

import PayerCaller from '../../api/PayerCaller';
import { useNavigate } from 'react-router';

export default function AirDropModal(props) {
    const navigate = useNavigate();
    const payerList = props.payerList;
    const [selected,setSelected] = useState(0);

    const onChange = (e) => {
        setSelected(e.target.value);
    }

    const onClickAirDop = async() => {
        const payer = payerList[selected];
        const secretKey = payer.secretKey;
        const id = payer._id;

        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromWallet = Keypair.fromSecretKey(bs58.decode(secretKey));
        const airdropSignature = await connection.requestAirdrop(fromWallet.publicKey,LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSignature);

        // console.log(await connection.confirmTransaction(airdropSignature));
        
        const response = await connection.getBalance(fromWallet.publicKey);
        const amount = (parseInt(response)/1000000000);
        const data = {
            id,
            amount
        }
        const res = await PayerCaller.updateBalance(data);
        if(res !== null){
            if(res.success){
                window.location.reload();
            }else{
                alert('something wrong!')
            }
        }
        // console.log("balance "+(parseInt(response)/1000000000)+ " SOL" )
    }

  return (
    <div>
        <Modal show={props.show} onHide={() => {props.toggle()}}>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select payer account</Form.Label>
                        <Form.Select onChange={(e) => {onChange(e)}}>
                            {props.payerList.map((payer,index) => {
                                return(<option value={index}>{payer.name}
                                
                                </option>)
                            })}
                            {/* <option>Payer wallet 1</option>
                            <option>Payer wallet 1</option>
                            <option>Payer wallet 1</option> */}
                        </Form.Select>
                    </Form.Group>
                    <div style={{textAlign:"center",margin:"20px auto"}}>
                    <Button className='btn btn-primary' onClick={()=>{onClickAirDop()}}>Air Drop 1 SOL</Button>
                    </div>
                   
                </Form>
            </Modal.Body>
        </Modal>
    </div>
    
  )
}
