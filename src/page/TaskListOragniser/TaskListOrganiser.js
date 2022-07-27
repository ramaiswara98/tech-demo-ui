import React, { useEffect, useState } from 'react'
import { Button, Card,Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateTaskModal from '../../component/CreateTaskModal/CreateTaskModal'
import UserCaller from '../../api/UserCaller'

import "./TaskListOrganiser.css"
import TaskCaller from '../../api/TaskCaller'

export default function TaskListOrganiser() {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState();
    const [taskList, setTaskList] = useState([]);


    const toggleCreateTaskModal = () => {
        setShowCreateTaskModal(!showCreateTaskModal);
    }

    useEffect(() => {
        const getData = async() => {
            const task = await TaskCaller.getTaskListByOrganiserId({organiserId:localStorage.getItem("id")});
            setTaskList(task.data)
            
        }

        getData()
    },[])

  return (
    <div className={'container'}>
        <CreateTaskModal
            show={showCreateTaskModal}
            toggle={toggleCreateTaskModal}
        />
        <Button onClick={() => {toggleCreateTaskModal()}}>Create Task</Button>
            {taskList.length > 0 ? (
                <>
                {taskList.map((task,index) => {
                    return (
                        <>
                         <Card className='cards'>
                            <Card.Body>
                                <Row>
                                    <Col>
                                    <h5>{task.title}</h5>
                                    <p>Participant : {task.response.length}/{task.maxParticipant}
                                    <br/>Deadline : {task.deadline}</p>
                                    </Col>
                                    <Col style={{margin:"auto",textAlign:"right",marginRight:"10px"}}>
                                    <Link to={"/organiser/submission-list/"+task._id} className="btn btn-primary">See Submission</Link>
                                    
                                    </Col>
                                </Row>
                            
                            </Card.Body>
                        </Card>
                        </>
                    )
                })}
                
                </>
            ):(
                <>No Task Yet</>
            )}
           
            
    </div>
  )
}
