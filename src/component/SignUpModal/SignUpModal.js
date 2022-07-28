import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import UserCaller from "../../api/UserCaller";

export default function SignUpModal(props) {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [isAdmin,setIsAdmin] = useState(false);
    const [isOrganiser,setIsOrganiser] = useState(false);
    const [isUser,setIsUser] = useState(true);
    const [password,setPassword] = useState();
    const [wallet,setWallet]=useState();
    const [userData,setUserData] =useState();
    const [alert,setAlert] = useState();

    const onChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        if(e.target.name ==='password'){
            setPassword(e.target.value)
        }
        if(e.target.name === 'role'){
            if(e.target.value === 'Organiser'){
                setIsOrganiser(true);
                setIsAdmin(false);
                setIsUser(false)
            }
            if(e.target.value === 'User'){
                setIsOrganiser(false);
                setIsAdmin(false);
                setIsUser(true)
            }
            console.log(e.target.value)
        }
        
    }

    const onSubmit = async() => {
        setAlert(<Alert variant='secondary'>Storing Data ...</Alert>)
        const data = {
            name,
            email,
            password,
            isAdmin,
            isOrganiser,
            isUser,
            wallet:"1232343534534545645"
        }
        const res = await UserCaller.signUp(data);
        if(res !== null){
            if(res.success){
                setUserData(res.data);
                setAlert(<Alert variant='success'>Successfully Sign Up</Alert>)
                props.toggle();
            }else{
                setAlert(<Alert variant='danger'>Something Wrong</Alert>)
            }
        }else{
            setAlert(<Alert variant='danger'>Something Wrong</Alert>)
        }
    }


  return (
    <div>
        <Modal show={props.show} centered onHide={()=>{props.toggle()}}>
            <Modal.Body>
                <div style={{textAlign:'center'}}>
                <h5><u>Sign Up</u></h5>
                </div>
                
                <Form>
                <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type={'text'} placeholder="Enter Your Name" onChange={(e) => onChange(e)} name={'name'} value={name}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type={'email'} placeholder="Enter Your Email" onChange={(e) => onChange(e)} name={'email'} value={email}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Choose Role</Form.Label>
                        <Form.Select onChange={(e) => onChange(e)} name={'role'}>
                            <option>Organiser</option>
                            <option selected>User</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={'password'} placeholder="Enter Your Password" onChange={(e) => onChange(e)} name={'password'} value={password}></Form.Control>
                    </Form.Group>
                    <div style={{textAlign:'center'}}>
                    <Button className='btn btn-primary' style={{marginTop:'30px', textAlign:'center',paddingLeft:"40px",paddingRight:'40px'}} onClick={()=>{onSubmit()}}>Sign Up</Button>
                    <p style={{marginTop:'20px'}}>Already have account ? <span style={{color:'blue',cursor:'pointer'}} onClick={()=>props.toggle()}>Sign In</span></p>
                    </div>
                    
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
