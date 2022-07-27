import React, { useState } from 'react'
import { Col, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import SignInModal from '../SignInModal/SignInModal'

import "./Navigation.css"

export default function Navigation() {
  const [signInModal,setSignInModal] = useState(false);
  const [user,setUser] = useState({name:'rama',email:'rama@gmail.com'});
  const navigate = useNavigate();

  const toggleSignInModal = () => {
    setSignInModal(!signInModal);
  }

  const logOut = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');
    localStorage.removeItem('isOrganiser');
    navigate('/')
  }

  return (<>
    <SignInModal
      show={signInModal}
      toggle={toggleSignInModal}
    />
    <Nav className='navbar row' >
      <Col className='nav'>
            <Navbar.Brand style={{color:'#fff'}}>[TechDemo]</Navbar.Brand>
            <Nav.Link href="/" className='active'>Home</Nav.Link>
            {localStorage.getItem('isUser') == 'true' ? (<>
              <Nav.Link href="/offers" className='nav-title'>Offers</Nav.Link>
              <Nav.Link href="/account">Account</Nav.Link>
             </>
            ) : (<>
             
            </>)}

            {localStorage.getItem('isAdmin') == 'true' ? (<>
               <Nav.Link href="/admin/account">Account</Nav.Link>
            </>
           ) : (<>
          
           </>)}

           {localStorage.getItem('isOrganiser') == 'true' ? (<>
            <Nav.Link href="/organiser/task">Task List</Nav.Link>
             <Nav.Link href="/organiser/account">Account</Nav.Link>
            </>
           ) : (<>
            
           </>)}
            
       
      </Col>
      <Col className='left'>
        
        {localStorage.getItem('id') !== null ? (
         <Nav.Link onClick={()=> logOut()}>Sign Out</Nav.Link>
        ):(
          <Nav.Link onClick={()=> toggleSignInModal()}>Sign In</Nav.Link>
        )}
      </Col>
    </Nav>
    </>
  )
}
