import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import  bs58  from "bs58";
import axios from "axios";


const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const createSolanaWallet = async() => {
    
    const wallet = await Keypair.generate();
    return wallet.publicKey.toBase58();
}

const createToken = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/token/create-token", data)
    .then((res) => {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

// const checkBalance = async(payer) => {
//     const fromWallet = await Keypair.fromSecretKey(bs58.decode(payer));
//     const response = await connection.getBalance(fromWallet.publicKey);
//     const amount = (parseInt(response)/1000000000);
//     return amount;
//     console.log(amount)
// }

const getTokenList = async(_id) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/token/get-token-list",_id)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err)
        return null;
    })
}

const mintingToken = async (data ) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/token/mint-token", data)
    .then((res) => {
        const datas = res.data;
        return datas;
    })
    .catch((err) => {
        console.log(err)
        return null
    })
}

const getAvailableToken = async () => {
    return await axios.get(process.env.REACT_APP_MASTER_DATA_URL+"/token/get-available-token")
    .then((res) => {
        const datas = res.data;
        return datas
    })
    .catch((err) => {
        console.log(err)
        return null;
    })
}

const sendToPhantom = async(data) => {
    return await axios.post(process.env.REACT_APP_MASTER_DATA_URL+"/token/send-to-phantom",data)
    .then((res) => {
        const datas=res.data;
        return datas
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

export default{
    createSolanaWallet,
    createToken,
    getTokenList,
    mintingToken,
    getAvailableToken,
    sendToPhantom
    // checkBalance,
}