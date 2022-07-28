import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { Route, BrowserRouter, useNavigate } from 'react-router';

import UserCaller from '../../api/UserCaller';
import SignUpModal from '../SignUpModal/SignUpModal'

export default function SignInModal(props) {

    const [signUpModal,setSignUpModal] = useState(false);
    const [user,setUser] = useState({name:'rama',email:'rama@gmail.com'});
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [alertSuccess,setAlertSuccess]=useState();
    const navigate = useNavigate();


  const toggleSignUpModal = () => {
    props.toggle();
    setSignUpModal(!signUpModal);
    
  }

  const handleOnChange = (e) => {
    if(e.target.name === 'email'){
        setEmail(e.target.value);
    }
    if(e.target.name === 'password'){
        setPassword(e.target.value);
    }
  }

  const submitOnClick = async () => {
    setAlertSuccess(<Alert variant='secondary'>Connecting ...</Alert>)
    const data = {
        email,
        password
    }
    
    const res = await UserCaller.login(data);
    if(res !== null){
        if(res.success){
            localStorage.setItem('id',res.data[0]._id);
            localStorage.setItem('isAdmin',res.data[0].isAdmin);
            localStorage.setItem('isUser',res.data[0].isUser);
            localStorage.setItem('isOrganiser',res.data[0].isOrganiser);
            setAlertSuccess(<Alert variant='success'>Successfully Sign In</Alert>)
            props.toggle();
            if(res.data[0].isAdmin){
                navigate('/admin/account')
            }
            else if(res.data[0].isOrganiser){
                navigate('/organiser/account')
            }else{
                navigate('/account')
            }
            
        }else{
            setAlertSuccess(<Alert variant='danger'>{res.data}</Alert>)
        }
    }
  }

  return (
    <div >
        <SignUpModal
        show={signUpModal}
        toggle={toggleSignUpModal}
        />
        <Modal show={props.show} centered onHide={()=>{props.toggle()}}>
            <Modal.Body>
                <div style={{textAlign:'center'}}>
                <h5><u>Sign In</u></h5>
                </div>
                
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type={'email'} placeholder="Enter Your Email" name={'email'} onChange={(e)=>{handleOnChange(e)}}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={'password'} placeholder="Enter Your Password" name={'password'} onChange={(e)=>{handleOnChange(e)}}></Form.Control>
                    </Form.Group>
                    <div style={{textAlign:'center'}}>
                    <Button className='btn btn-primary' style={{marginTop:'30px', textAlign:'center',paddingLeft:"40px",paddingRight:'40px'}} onClick={()=>submitOnClick()}>Sign In</Button>
                    <p style={{marginTop:'20px'}}>Don't have account yet ? <span style={{color:'blue',cursor:'pointer'}} onClick={()=>{toggleSignUpModal()}}>Sign Up</span></p>
                    </div>
                    {alertSuccess}
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
