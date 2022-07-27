import axios from "axios";

const createPayer = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+'/payer/create-payer', data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

const getPayerList = async () => {
    return await axios.get(process.env.REACT_APP_MASTER_DATA_URL+"/payer/payer-lists")
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

const updateBalance = async (data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+'/payer/airdrop',data)
    .then((res) => {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

export default{
    createPayer,
    getPayerList,
    updateBalance,
}