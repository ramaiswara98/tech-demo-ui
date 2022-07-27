import axios from "axios";

const signUp = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL + "/user/create-user", data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}


const login = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+ "/user/login",data)
    .then((res) => {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

const getUser = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/user/get-user",data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err)=> {
        console.log(err);
        return null;
    })
}
export default{
    signUp,
    login,
    getUser
}