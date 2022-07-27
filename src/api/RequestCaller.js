import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import  bs58  from "bs58";
import axios from "axios";


const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const createRequest = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/request/create-request", data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null
    })
}

const getAllRequest = async () => {
    return await axios.get(process.env.REACT_APP_MASTER_DATA_URL+"/request/get-all-request")
    .then((res) => {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err)
        return null
    })
}

const getRequestByWallet = async (data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/request/get-request-by-wallet",data)
    .then((res) => {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err)
        return null
    })
}

const acceptRequest = async (data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/request/accept-request", data)
    .then((res)=> {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null
    })
}

const acceptRequestExistingToken = async (data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/request/accept-request-existing-token", data)
    .then((res)=> {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err);
        return null
    })
}

export default{
    createRequest,
    getAllRequest,
    getRequestByWallet,
    acceptRequest,
    acceptRequestExistingToken
}