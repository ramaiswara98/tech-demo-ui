import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Table, Alert } from "react-bootstrap";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  LAMPORT_PER_SOL,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
  Account,
  getMint,
  getAccount,
} from "@solana/spl-token";
import bs58 from "bs58";

import "./AccountAdmin.css"

import CreatePayerModal from "../../component/CreatePayerModal/CreatePayerModal";
import AirDropModal from "../../component/AirDropModal/AirDropModal";
import PayerCaller from "../../api/PayerCaller";
import TokenCaller from "../../api/TokenCaller";
import CreateTokenModal from "../../component/CreateTokenModal/CreateTokenModal";
import UserCaller from "../../api/UserCaller";
import MintTokenModal from "../../component/MintTokenModal/MintTokenModal";
import RequestCaller from "../../api/RequestCaller";
import AcceptRequestModal from "../../component/AcceptRequestModal/AcceptRequestModal";

import Avatar from "../../assets/images/man.png"

export default function AccountAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalAirDrop, setShowModalAirDrop] = useState(false);
  const [showModalCreateToken, setShowModalCreateToken] = useState(false);
  const [listPayer, setListPayer] = useState([]);
  const [accountData, setAccountData] = useState(null);
  const [tokenList, setTokenList] = useState(null);
  const [showModalMint, setShowModalMint] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState();
  const [requestList, setRequestList] = useState([]);
  const [showModalAcceptRequest, setshowModalAcceptRequest] = useState();
  const [requestData, setRequestData] = useState();
  const [tabActive, setTabActive] = useState("balance");

  useEffect(() => {
    const getPayerList = async () => {
      const payerLists = await PayerCaller.getPayerList();
      setListPayer(payerLists.data);
      const user = await UserCaller.getUser({
        _id: localStorage.getItem("id"),
      });
      setAccountData(user.data);
      const tokens = await TokenCaller.getTokenList({
        _id: localStorage.getItem("id"),
      });
      setTokenList(tokens.data);
      const request = await RequestCaller.getAllRequest();
      const requestRaw = request.data;
      requestRaw.sort();
      requestRaw.reverse();
      setRequestList(requestRaw);
    };

    getPayerList();
  }, []);

  const toggle = () => {
    setShowModal(!showModal);
  };
  const toggleModalAcceptRequest = (request) => {
    setRequestData(requestList[request]);
    setshowModalAcceptRequest(!showModalAcceptRequest);
  };

  const toggleCreateToken = () => {
    setShowModalCreateToken(!showModalCreateToken);
  };

  const toggleAirDropModal = () => {
    setShowModalAirDrop(!showModalAirDrop);
  };

  const toggleMintModal = () => {
    setShowModalMint(!showModalMint);
  };

  const openMintModal = (tokenId) => {
    setSelectedTokenId(tokenId);
    setShowModalMint(!showModalMint);
  };

  const tabClick = (tabs) => {
    setTabActive(tabs);
  };

  return (
    <div className={"container"}>
      {accountData !== null ? (
        <>
          <CreateTokenModal
            show={showModalCreateToken}
            toggle={toggleCreateToken}
            payerList={listPayer}
            accountData={accountData}
          />

          <AcceptRequestModal
            requestData={requestData}
            holderWallet={accountData.walletPublicKey}
            show={showModalAcceptRequest}
            toggle={toggleModalAcceptRequest}
          />

          <MintTokenModal
            show={showModalMint}
            toggle={toggleMintModal}
            _id={accountData._id}
            tokenId={selectedTokenId}
          />

          <AirDropModal
            show={showModalAirDrop}
            toggle={toggleAirDropModal}
            payerList={listPayer}
          />

          <CreatePayerModal show={showModal} toggle={toggle} />
          <Card className="card-account">
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
          <div style={{ marginBottom: "40px", marginTop: "40px" }}>
            <hr />
            <div className="tabs-container">
              <p className={tabActive === "balance" ? "active-tab":"tab-button-admin"} onClick={() => tabClick("balance")}>
                Balance
              </p>
              <p className={tabActive === "request" ? "active-tab":"tab-button-admin"} onClick={() => tabClick("request")}>
                Request
              </p>
              <p className={tabActive === "payer" ? "active-tab":"tab-button-admin"} onClick={() => tabClick("payer")}>
                Payer
              </p>
            </div>
            {tabActive === "balance" ? (
              <>
                <div style={{ margin: "20px 0px 20px 0px" }}>
                  <Button
                    onClick={() => {
                      toggleCreateToken();
                    }}
                  >
                    Create Token
                  </Button>
                  {/* <Button
                    onClick={() => {
                      toggle();
                    }}
                    style={{ marginLeft: "20px" }}
                  >
                    Create Payer Wallet
                  </Button> */}
                  <Button
                    onClick={() => {
                      toggleAirDropModal();
                    }}
                    style={{ marginLeft: "20px" }}
                  >
                    Air Drop
                  </Button>
                </div>
                <hr />
                <h4 style={{ textAlign: "left" }}>Wallet Balance</h4>
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
                        {tokenList.map((token, index) => {
                          return (
                            <tr>
                              <td style={{textAlign:"center"}}><img src="https://img.icons8.com/ios-filled/452/help.png"  width={"45px"}/></td>
                              <td><b>{token.name}</b><br/> Token Id : <b>{token.tokenId}</b></td>
                              <td>
                                <b>{token.amount}</b>
                              </td>
                              <td>
                                <Button className="btn btn-primary" onClick={() => {window.open("https://solscan.io/account/"+token.address+"?cluster="+process.env.REACT_APP_CLUSTER,"_blank")}}>
                                  See History
                                </Button>
                                <Button
                                  className="btn btn-primary"
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => {
                                    openMintModal(token.tokenId);
                                  }}
                                >
                                  Mint Token
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <tr>No Token Yet</tr>
                      </>
                    )}
                      </>
                    ):(
                      <>
                      Loading ...
                      </>
                    )}
                    
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                {tabActive === "request" ? (
                  <>
                    <hr />
                    <div style={{ marginBottom: "40px", marginTop: "40px" }}>
                      <h4>Token Request</h4>

                      <Table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Organiser Name</th>
                            <th>Organiser Wallet</th>
                            <th>Token</th>
                            <th>Amount</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {requestList.length > 0 ? (
                            <>
                              {requestList.map((request, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{request.organiserName}</td>
                                    <td>{request.organiserWallet}</td>
                                    <td>{request.token.name}</td>
                                    <td>{request.amount}</td>
                                    <td>
                                      {request.status === "pending" ? (
                                        <>
                                          <Button
                                            onClick={() => {
                                              toggleModalAcceptRequest(index);
                                            }}
                                          >
                                            Accept
                                          </Button>
                                          <Button
                                            className={"btn btn-danger"}
                                            style={{ marginLeft: "10px" }}
                                          >
                                            Reject
                                          </Button>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {request.status === "success" ? (
                                        <>
                                          <Alert variant="success">
                                            Success
                                          </Alert>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {request.status === "rejected" ? (
                                        <>
                                          <Alert variant="danger">
                                            Rejected
                                          </Alert>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : (
                            <tr>No Request Token Yet</tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </>
                ) : (
                  <>
                    <hr />
                    <div style={{ marginBottom: "40px", marginTop: "40px" }}>
                      <h4>Payer Walet Balance</h4>

                      <Table>
                        <thead>
                          <tr>
                            <th>Number</th>
                            <th>Payer Name</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listPayer.map((payer, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{payer.name}</td>
                                <td>{payer.amount} SOL</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
