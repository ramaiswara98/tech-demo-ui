import React from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from '../../assets/images/blockchain.png'


import "./Home.css"

export default function Home() {
  return (
    <div
      className='homeContainer'
    >
      <Row className='row-home'>
        <Col className='column'>
        <div>
          <h1 className={'title'}>Tech Demo Solana Token</h1>
        </div>
         
          <h4>This website just for demonstration purpose</h4>  
        </Col>
        <Col className='column'>
          <img src={logo} width={'320px'}/>
        </Col>
      </Row>
     
      
    </div>
  )
}
