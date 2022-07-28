import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'

import HistoryTransactionModal from '../../component/HistoryTransactionModal/HistoryTransactionModal'
import "./AccountUser.css"
import UserCaller from '../../api/UserCaller';
import TokenCaller from '../../api/TokenCaller';
import Avatar from "../../assets/images/man.png"

export default function AccountUser() {
  
  const [modal,setModal]= useState(false)
  const [accountData,setAccountData] = useState(null);
  const [tokenList,setTokenList] = useState(null);
  const [tabActive,setTabActive] = useState('balance');

  const [phantomWallet,setPhantomWallet] = useState(null);

  const [buttonText,setButtontext] = useState("state")
  const [buttonVariant,setButtonVariant] = useState("btn btn-prmary")


  useEffect(()=>{
    const getData = async () => {
      const account = await UserCaller.getUser({_id:localStorage.getItem('id')})
      setAccountData(account.data)
      const token = await TokenCaller.getTokenList({_id:localStorage.getItem('id')});
        setTokenList(token.data);
    }
    getData();
  },[])

  const changeTab= (tabs) => {
    setTabActive(tabs)
  }


  const historyOnClick = () => {
    modalTrigger()
    console.log(modal)
  }

  const modalTrigger = () => {
    setModal(!modal);
  }


  const sendToken =async (index,phantomWallets) => {
    const selectedToken = tokenList[index];
    if(phantomWallets !== null & selectedToken.amount > 0){
     
      const requestData = {
        organiserName:"none",
        phantomWallet:phantomWallets,
        amount:selectedToken.amount,
        token:selectedToken,
        holderSecretWallet:accountData.walletSecretKey,
        holderWallet:accountData.walletPublicKey
  
      }
      const sending = await TokenCaller.sendToPhantom(requestData);
      if(sending.data !== null){
        setButtonVariant("btn btn-success")
        setButtontext("Successfully sending token");
        window.location.reload();
      }
      // console.log(sending.data)
    }else{
      // await getProvider();
      // await getAccount();
      // sendToken();
      alert("Something Wrong")
      setButtonVariant("btn btn-primary");
      setButtontext("state")
      console.log("no Phantom")
    }
  } 

  const sendPhantom = async(index) => {
    setButtonVariant("btn btn-secondary");
    setButtontext("Sending Token ...");
  const isPhantomInstalled = window.phantom?.solana?.isPhantom;
  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
      // console.log(provider)
      if (provider?.isPhantom) {
        return provider;
        
      }
    }
    
    window.open('https://phantom.app/', '_blank');
  };
  const getAccount = async() => {
    const isPhantomInstalled = window.phantom?.solana?.isPhantom;
    // console.log(isPhantomInstalled)
    const provider = await getProvider(); // see "Detecting the Provider"
    try {
        const resp = await provider.connect();
        setPhantomWallet(resp.publicKey.toString());
        sendToken(index, resp.publicKey.toString());
        // return (resp.publicKey.toString());
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
    } catch (err) {
      return null;
    }
  
  }
  await getProvider();
  await getAccount();
  
 
  // await sendToken();
  
  }

  return (
    <div className='account-wrapper'>
      {accountData !== null ? (
        <>
           <HistoryTransactionModal
        show={modal}
        close={modalTrigger}
      />
      <div>
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
        </div>
        <div  class={"tabs-container"}>
          <p className={tabActive === "balance" ? "active-tab":"tab-button-user"} onClick={() => {changeTab("balance")}}>Balance</p>
          <p className={tabActive === "task" ? "active-tab":"tab-button-user"} onClick={() => {changeTab("task")}}>Task Done</p>
        </div>
        {tabActive === "balance" ? (
          <>
             <hr/>
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
              {tokenList !== null ? (
                <>
                {tokenList.length > 0 ? (
                <>
                {tokenList.map((token,index) => {
                  return(<>
                   <tr>
                      <td style={{textAlign:"center"}}><img src="https://img.icons8.com/ios-filled/452/help.png"  width={"45px"}/></td>
                      <td><b>{token.name}</b><br/> Token Id : <b>{token.tokenId}</b></td>
                      <td><b>{token.amount}</b></td>
                      <td>
                        <Button className='btn btn-primary' onClick={() => {window.open("https://solscan.io/account/"+token.address+"?cluster="+process.env.REACT_APP_CLUSTER,"_blank")}}>History</Button>
                        <Button className={buttonVariant} style={{marginLeft:"10px"}} onClick={() => {sendPhantom(index)}}>{buttonText === "state" ? (
                          <>
                          Send to <img src='https://bitcoin-trading.io/wp-content/uploads/2022/02/phantom-logo-long.png' height={"30px"} />
                          </>
                        ):(
                          <>
                         {buttonText}
                          </>
                        )}</Button>
                      </td>
                    </tr>
                  </>)
                })}
                </>
              ):(<>
                <tr>No Token Yet</tr>
              </>)}                
                </>
              ) : (
                <>
                Loading ...
                </>
              )}
              
           
 
            </tbody>
          </Table>
        </div>
          </>
        ):(
          <>
            <hr/>
        <div style={{marginTop:"40px"}}>
          <h4  style={{textAlign:"left"}}>Task Done</h4>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Reward</th>
            </tr>
            </thead>
            <tbody>
              {accountData.taskDone.length > 0 ? (
                <>

                {accountData.taskDone.map((taskDone,index) => {
                  return(
                    <>
                    <tr>
                      <td><b>{taskDone.taskTitle}</b></td>
                      <td>{taskDone.status}</td>
                      <td>{taskDone.reward}</td>
                    
                    </tr>
                    </>
                  )
                })}
                </>
              ):(
                <>
                <tr>
                  No Task Done Yet</tr></>
              )}
            
            
            </tbody>
          </Table>
          </div>
        <div>

        </div>
          </>
        )}
       
        
        </>
      ):(
        <>Loading ...</>
      )}
     
    </div>
  )
}
