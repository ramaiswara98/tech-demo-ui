 import axios from "axios";

 const createTask = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/task/create-task", data)
    .then((res)=> {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err)
        return null
    })
 }

 const getTaskListByOrganiserId = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/task/get-task-list-by-organiser-id", data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
 }

 const getAllTaskList = async() => {
    return await axios.get(process.env.REACT_APP_MASTER_DATA_URL+"/task/get-all-task-list")
    .then((res)=> {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
 }

 const getTaskById = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/task/get-task-by-id",data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err)
        return null
    })
 }

 const submitTask = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/task/submit-task",data)
    .then((res) => {
        const datas= res.data;
        return datas
    })
    .catch((err) => {
        console.log(err);
        return null
    })
 }

 const appreciateRespondent = async (data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/task/appreciate-respondent",data)
    .then((res) =>{
        const datas=res.data;
        return data;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
 }

 export default{
    createTask,
    getTaskListByOrganiserId,
    getAllTaskList,
    getTaskById,
    submitTask,
    appreciateRespondent
 }