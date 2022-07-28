import React, { useEffect, useState } from 'react'
import{Card, Button, Row, Col, Table, Alert} from 'react-bootstrap'
import RequestCaller from '../../api/RequestCaller';
import TokenCaller from '../../api/TokenCaller';
import UserCaller from '../../api/UserCaller';
import RequestTokenModal from '../../component/RequestTokenModal.js/RequestTokenModal';
import Avatar from "../../assets/images/man.png"

export default function AccountOrganiser() {
  const [accountData,setAccountData] = useState(null);
  const [tokenList, setTokenList] = useState(null);
  const [availableTokenList, setAvailableTokenList] = useState([]);
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [requestList, setRequestList] = useState([])
  const [phantomWallet,setPhantomWallet] = useState("");
  const [tabActive,setTabActive] = useState("balance");
  useEffect(()=> {
      const getAccounData = async() => {
        const user = await UserCaller.getUser({_id:localStorage.getItem('id')});
        setAccountData(user.data);
        const token = await TokenCaller.getTokenList({_id:localStorage.getItem('id')});
        setTokenList(token.data);
        const availableToken = await TokenCaller.getAvailableToken();
        setAvailableTokenList(availableToken.data);
        const request = await RequestCaller.getRequestByWallet({organiserWallet:user.data.walletPublicKey})
        const requestRaw = request.data;
        requestRaw.sort();
        requestRaw.reverse();
        setRequestList(requestRaw);
      }


      getAccounData();
  },[])

  const toggleModalRequestToken = () => {
    setShowModalRequest(!showModalRequest);
  }

  const clickTab = (tabs) => {
    setTabActive(tabs)
  }

  return (
    <div className={'container'}>
      {(accountData != null)? (
        <>
        <RequestTokenModal
          show={showModalRequest}
          toggle={toggleModalRequestToken}
          tokenList = {availableTokenList}
          accountData = {accountData}
          ownTokenList = {tokenList}
        />

         <Card className='card-account'>
          <Card.Body>
            <Row>
            <Col style={{margin:"auto"}}>
              <p className='card-account-name'><b>{accountData.name}</b></p>
              <p className='card-account-wallet'>SOL Wallet Address : <br/><b>{accountData.walletPublicKey}</b></p>
            
              </Col>
              
              <Col style={{margin:"auto 20px auto", textAlign:"right"}}>
              <img src={Avatar} style={{width:"120px"}}/>
              </Col>
            </Row>
           
          </Card.Body>
        </Card>
        <hr/>
        <div className='tabs-container'>
          <p className={tabActive === "balance" ? "active-tab":"tab-button-admin"} onClick = {() => {clickTab("balance")}}>Balance</p>
          <p className={tabActive === "request" ? "active-tab":"tab-button-admin"} onClick = {() => {clickTab("request")}}>Request</p>
        </div>
        <div style={{marginBottom:"40px", marginTop:"40px"}}>
          {tabActive === "balance" ? (
            <>
               <hr/>
          <Button onClick={() => { toggleModalRequestToken()}}>Request Token</Button>
          {/* <Button>Send Token</Button> */}
          <div style={{marginBottom:"40px", marginTop:"40px"}}>
          <h4 style={{textAlign:"left"}}>Wallet Balance</h4>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Logo</th>
              <th>Token</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {tokenList != null ? (
                <>
                 {tokenList.length > 0 ? (
                <>{tokenList.map((token,index) => {
                  return (
                  <tr>
                    <td style={{textAlign:"center"}}><img src="https://img.icons8.com/ios-filled/452/help.png"  width={"45px"}/></td>
                    <td><b>{token.name}</b><br/> Token Id : <b>{token.tokenId}</b></td>
                    <td><b>{token.amount}</b></td>
                    <td>
                      <Button className='btn btn-primary' onClick={() => {window.open("https://solscan.io/account/"+token.address+"?cluster="+process.env.REACT_APP_CLUSTER,"_blank")}}>See History</Button>
                      {/* <Button className='btn btn-primary' style={{marginLeft:"10px"}} >Send to <img src='https://bitcoin-trading.io/wp-content/uploads/2022/02/phantom-logo-long.png' height={"30px"} /></Button> */}
                    </td>
                  </tr>
                  
                  )
                })}</>
              ):(
                <>
                <tr>
                  No Token Yet
                </tr>
                </>
              )}
                </>

              ):(<>
              Loading ...
              </>)}
             
            
 
            </tbody>
            </Table>
            </div>
            </>
          ):(
            <>
               <hr/>
            <div style={{marginBottom:"40px", marginTop:"40px"}}>
                <h4>Token Request</h4>

                <Table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Organiser Name</th>
                            {/* <th>Signature</th> */}
                            <th>Token</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      {requestList.length > 0 ? (
                        <>
                        {requestList.map((request,index) => {
                          return(
                            <tr>
                              <td>{index+1}</td>
                              <td>{request.organiserName}</td>
                              {/* <td>{request.signature !== "" ? (
                                 <><a href={'https://solscan.io/search?q='+request.signature+"&cluster=devnet"} target={"_blank"}>{request.signature}</a></>
                              ):(
                                <></>
                              )}</td> */}
                              <td>{request.token.name}</td>
                              <td>{request.amount}</td>
                              <td>
                                  {
                                    request.status === "pending" ? (
                                      <Alert variant='warning'>Pending</Alert>
                                    ):(<></>)
                                  }
                                  {
                                    request.status === "success" ? (
                                      <Alert variant='success'>Success</Alert>
                                    ):(<></>)
                                  }
                                  {
                                    request.status === "rejected" ? (
                                      <Alert variant='danger'>Rejected</Alert>
                                    ):(<></>)
                                  }
                              </td>
                          </tr>
                          )
                        })}
                        
                        </>
                      ):(<>
                      <tr>
                        No Request Token Yet
                      </tr>
                      </>)}
                        
                    </tbody>
                </Table>
            </div>
            </>
          )}
         
            
           
            </div>
        </>
      ):(
        <>Loading</>
      )}
       
    </div>
  )
}
