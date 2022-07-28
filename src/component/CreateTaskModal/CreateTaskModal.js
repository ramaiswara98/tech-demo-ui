import { Alert, Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import TaskCaller from '../../api/TaskCaller';

export default function CreateTaskModal(props) {
    const [picSize,setPicSize] = useState(0);
    const [form,setForm] =useState([]);
    const [urlList,setUrlList] = useState([]);
    const [title,setTitle] = useState();
    const [maxParticipant,setMaxParticipant] = useState();
    const [deadline,setDeadline] = useState();
    const [alert,setAlert] = useState();


    const onChange = (e) => {
        const newUrl = urlList;
        newUrl[e.target.name] = {
            id:e.target.name,
            link:e.target.value
        }
        setUrlList(newUrl)
    }

    const onChangeNormal = (e) => {
        if(e.target.name === "title"){
            setTitle(e.target.value)
        }
        if(e.target.name === "maxParticipant"){
            setMaxParticipant(e.target.value)
        }
        if(e.target.name === "deadline"){
            setDeadline(e.target.value)
        }
    }

    const getFormUrl = async() => {
        setPicSize(picSize+1)
        let newArray = form;
        let newUrl = urlList;
        // for(let i=0; i<picSize;i++){
            const item = (<>
                <Form.Group>
                <Form.Label>Picture URL {picSize+1}</Form.Label>
                        <Form.Control type={'text'} placeholder='Enter Picture URL' name={picSize} onChange={(e)=> {onChange(e)}}></Form.Control>
                </Form.Group>
            </>)
            newUrl[picSize] = {
                id:picSize,
                link:""
            }
            newArray.push(item)
        // }
        setForm(newArray);
        setUrlList(newUrl)
    }

    const createTask = async() => {
        if(urlList.length < 6){
            setAlert(<Alert variant='warning'>Minimum picture url must be 6</Alert>)
        }else{
        setAlert(<Alert variant='secondary'>Creating Task ...</Alert>)
        const data = {
            organiserId:localStorage.getItem('id'),
            title,
            maxParticipant,
            deadline,
            urlList
        }
        const create = await TaskCaller.createTask(data);
        console.log(create.data);
        setAlert(<Alert variant='success'>Successfully Created Task</Alert>)
        window.location.reload();
        }
    }
  return (
    <div>
       <Modal show={props.show} onHide={() => {props.toggle()}}>
            <Modal.Body>
                <Form>
                    {alert}
                    <Form.Group>
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type={'text'} placeholder='Enter Title' name={'title'} onChange={(e) => {onChangeNormal(e)}}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max Participant</Form.Label>
                        <Form.Control type={'number'} placeholder='Enter Max Participant' name={'maxParticipant'} onChange={(e) => {onChangeNormal(e)}}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type={'date'} placeholder='Choose deadline Date' name={'deadline'} onChange={(e) => {onChangeNormal(e)}}></Form.Control>
                    </Form.Group>
                        {form.length > 0 ? (
                            <>
                             {form.map((item,index) => {
                                return(<>{item}</>)
                             })}   
                            </>
                        ):(
                            <></>
                        )}
                    <div style={{textAlign:"right", margin:"20px auto"}}>
                        <Button className='btn btn-primary' onClick={() => {getFormUrl()}}>Add Picture URL</Button>
                    </div>
                    <hr/>
                    <div style={{textAlign:"center", margin:"20px auto"}}>
                        <Button className='btn btn-primary' onClick={() => {createTask()}}>Create Task</Button>
                    </div>
                </Form>
            </Modal.Body>
       </Modal>
    </div>
  )
}
