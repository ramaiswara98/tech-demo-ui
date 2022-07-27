import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TaskCaller from '../../api/TaskCaller';

import TokenCaller from '../../api/TokenCaller';
import UserCaller from '../../api/UserCaller';

export default function ApreciateRespondentModal(props) {
    const [tokenList,setTokenList]=useState([]);
    const [selectedToken,setSelectedToken]=useState(null);
    const [amount, setAmount] = useState(0);
    const [alert,setAlert] = useState();
    const [accountData,setAccountData] = useState();

    useEffect(()=> {
        const getData = async() => {
            const token = await TokenCaller.getTokenList({_id:localStorage.getItem('id')});
            setTokenList(token.data);
            const user = await UserCaller.getUser({_id:localStorage.getItem('id')});
            setAccountData(user.data);
        }

        getData();
    },[])

    const onChange = (e) => {
        if(e.target.name === "token"){
            setSelectedToken(tokenList[e.target.value]);
        }
        if(e.target.name === "amount"){
            setAmount(e.target.value)
        }
    }

    const onClick = async() => {
        if(selectedToken === null || amount ===0 || amount === ""){
            setAlert(<Alert variant='warning'>Please fill up all the form</Alert>)
        }else if(amount<1){
            setAlert(<Alert variant='warning'>Minimun Appreciation is 1 Token</Alert>)
        }
        else{
            if(amount>selectedToken.amount){
                setAlert(<Alert variant='danger'>Not Enough Token Balance</Alert>)
            }else{
                setAlert(<Alert variant='secondary'>Sending Appreciation ...</Alert>)
                const data = {
                    response:props.response,
                    indexResponse:props.indexResponse,
                    respondentData:props.respondentData,
                    organiserData:accountData,
                    choosenToken:selectedToken,
                    amount:amount,
                    taskId:props.taskId
                }
                const appreciate = await TaskCaller.appreciateRespondent(data);
                if(appreciate !== null){
                    
                    setAlert(<Alert variant='success'>Successfully Send Appreciation</Alert>)
                    window.location.reload();
                }
            }
        }
        
    }

    const onHide = () => {
        setAlert();
        props.toggle();
    }

  return (
    <div>
        <Modal show={props.show} onHide={() => {onHide()}} centered>
            <Modal.Body>
                {tokenList.length > 0 ? (
                    <>
                     <Form>
                        <Form.Group>
                            <Form.Label>Token</Form.Label>
                            <Form.Select onChange={(e) => onChange(e)} name="token">
                                <option disabled selected>Choose Token ...</option>
                                {tokenList.map((token,index) => {
                                    return(
                                     <option value={index}>{token.name+" ("+token.amount+" Token)"}</option>
                                    )
                                })}
                               
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type='number' placeholder='Enter Amount' name="amount" onChange={(e) => onChange(e)}></Form.Control>
                        </Form.Group>
                        <div style={{textAlign:"center", margin:"20px auto"}}>
                            {alert}
                        </div>
                        <div style={{textAlign:"center", margin:"20px auto"}}>
                            <Button className='btn btn-primary' onClick={() => {onClick()}}>Send Token For Apreciation</Button>
                        </div>
                    </Form>
                    </>
                ):(
                    <>
                    Loading data ...
                    </>
                )}
               
            </Modal.Body>
        </Modal>
    </div>
  )
}
