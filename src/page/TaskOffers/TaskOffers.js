import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TaskCaller from "../../api/TaskCaller"
import moment from 'moment'

import "./TaskOffers.css"

export default function TaskOffers() {
    const [taskList,setTaskList] = useState([]);

    useEffect(() => {
        const getData = async() => {
            const task = await TaskCaller.getAllTaskList();
            const listTask = task.data;
            listTask.sort();
            listTask.reverse();
            setTaskList(listTask)
        }

        getData()
    },[])


  return (
    <div>
        <div>
            <h3 style={{textAlign:"center", margin:"20px auto"}}>List of Task Offer from organiser</h3>
            {taskList.length > 0 ? (
                <>
                {taskList.map((task,index) => {
                    return (<>
                    <Card className='cards shadow-sm bg-white rounded'>
                        <Card.Body>
                            <Row>
                                <Col>
                                <h5>{task.title}</h5>
                                <p>Participant : {task.response.length}/{task.maxParticipant}
                                <br/>Deadline : {moment(task.deadline).format('d - MMMM - YYYY')}</p>
                                </Col>
                                <Col style={{margin:"auto",textAlign:"right",marginRight:"10px"}}>
                                    {(task.response.filter(function(e){return e.accountData._id === localStorage.getItem('id');}).length > 0) ? (
                                    <>
                                    <Button disabled className='btn btn-success'>Submitted</Button>
                                    </>
                                    ):(
                                        <>
                                        <Link to={"/task/"+task._id} className="btn btn-primary">Take this</Link>
                                        </>
                                    )}
                                
                                
                                </Col>
                            </Row>
                        
                        </Card.Body>
                    </Card>
                    </>)
                })}
                </>
            ):(
                <>No Task Offers Yet</>
            )}
            
           
        </div>

    </div>
  )
}
