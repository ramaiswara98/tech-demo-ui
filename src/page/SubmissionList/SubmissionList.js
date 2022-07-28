import React, { useEffect, useState } from 'react'
import { Card, Row,Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router';
import TaskCaller from '../../api/TaskCaller';
import ApreciateRespondentModal from '../../component/ApreciateRespondentModal/ApreciateRespondentModal';
import ViewResponseModal from '../../component/ViewResponseModal/ViewResponseModal';

import Avatar from "../../assets/images/man.png"

export default function SubmissionList() {

    const [task,setTask] = useState(null);
    const [showViewResponseModal,setShowViewResponseModal] = useState(false);
    const [selectedResponse,setSelectedResponse] = useState(null)
    const [showApreciateModal,setShowApreciateModal] = useState(false);
    const [selectedIndex,setSelectedIndex] = useState();
    const params = useParams();

    useEffect(()=> {
        const getData = async() => {
            const getTask = await TaskCaller.getTaskById({_id:params.id});
            setTask(getTask.data);
        }
        getData();
    },[])

    const toggleViewResponseModal = (index) => {
        setShowViewResponseModal(!showViewResponseModal)
    }
    const toggleAppreciateModal = (index) => {
        setShowApreciateModal(!showApreciateModal)
    }
    const clickButton = (index) => {
        setSelectedResponse(task.response[index])
        setShowViewResponseModal(!showViewResponseModal)
    }

    const openAppreciationModal = (index) => {
        setSelectedIndex(index);
        setSelectedResponse(task.response[index]);
        setShowApreciateModal(!showApreciateModal);
    }
  return (
    <div>
        <div style={{margin:"20px auto", textAlign:"center", width:"500px"}}>
            {task !== null ? (
                <>
                <ViewResponseModal
                    show={showViewResponseModal}
                    toggle={toggleViewResponseModal}
                    response={selectedResponse != null ? selectedResponse:null}
                />

                <ApreciateRespondentModal
                    show={showApreciateModal}
                    toggle={toggleAppreciateModal}
                    respondentData={selectedResponse !== null ? selectedResponse.accountData:null}
                    response={selectedResponse !== null ? selectedResponse.answer:null}
                    indexResponse={selectedIndex}
                    taskId = {params.id}
                />
                {task.response.length > 0 ? (
                    <>
                    {task.response.map((response,index) => {
                        return(
                            <>
                                <Card style={{maxWidth:"400px"}}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <img src={Avatar} style={{width:"96px"}}/>
                                                <p style={{fontSize:"18pt", marginTop:"5px"}}><b>{response.accountData.name}</b></p>
                                            </Col>
                                            <Col style={{margin:"auto"}}>
                                            <Button onClick={() => {clickButton(index)}}>View Response</Button><br/>
                                            <Button style={{marginTop:"20px"}} onClick={() => {openAppreciationModal(index)}} disabled={(response.status)}>{response.status ? "Apreciated":"Appreciate Respondent"}</Button>
                                            </Col>
                                        </Row>
                                        
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })}
                    </>
                ):(
                    <>
                     <Card style={{textAlign:"center",paddingTop:"20px", paddingBottom:"20px"}}>
                        <b>No Response yet</b>
                    </Card></>
                )}
               
                </>
            ):(
                <>
                <Card style={{textAlign:"center",paddingTop:"20px", paddingBottom:"20px"}}>
                    <b>Loading Data ...</b>
                </Card>
                </>
            )}
            
        </div>
    </div>
  )
}
