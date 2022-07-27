import {  clusterApiUrl,Connection,PublicKey, Keypair,LAMPORT_PER_SOL, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount,mintTo, transfer, Account, getMint, getAccount} from"@solana/spl-token";
import  bs58  from "bs58";

function MintToken(){

  // const isPhantomInstalled = window.phantom?.solana?.isPhantom;
  // const getProvider = () => {
  //   if ('phantom' in window) {
  //     const provider = window.phantom?.solana;
  //     console.log(provider)
  //     if (provider?.isPhantom) {
  //       return provider;
  //     }
  //   }
    
  //   window.open('https://phantom.app/', '_blank');
  // };
  // const getAccount = async() => {
  //   const isPhantomInstalled = window.phantom?.solana?.isPhantom;
  //   console.log(isPhantomInstalled)
  //   const provider = getProvider(); // see "Detecting the Provider"
  //   try {
  //       const resp = await provider.connect();
  //       console.log(resp.publicKey.toString());
  //       // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
  //       console.log(resp);
  //   } catch (err) {
  //       // { code: 4001, message: 'User rejected the request.' }
  //   }
  //   console.log(23)
  
  // }




    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWallet = Keypair.generate();
    // const payer = Keypair.fromSecretKey(bs58.decode("4KZfGCMbwK2r7Zrpghp4sKPVyBXoKAjDsyfQ3ut3it9C4Hv3UUzfrXjo97rEAg223FD2fCpst2pwTMvY1cAvbSeW"));
    // console.log(bs58.decode("4KZfGCMbwK2r7Zrpghp4sKPVyBXoKAjDsyfQ3ut3it9C4Hv3UUzfrXjo97rEAg223FD2fCpst2pwTMvY1cAvbSeW"))
    // console.log("payer: "+payer.publicKey);
    // Keypair.fromSecretKey(
    //   bs58.decode("HKKWjxqBUqYnhBekh62h7tzfNFvmF2qUisYodinDXQ4A")
    // );

    let mint;
    let fromTokenAccount;
    const toWallet = new PublicKey("CGft9hK6gN8eYZCyu2UfFewibHVH1gpsw8wG4a6AwSsk");
    const tokenId = new PublicKey("8ZabCdY5JrNXobs28Lc8GDnZj2VW7HcbVLj3BZm1H4W5");
    const holderAddres = new PublicKey("J2r7oLBXeJVpgVang8XqKajikN7sjRxxSgmnMySTiviY");
    const payer = Keypair.fromSecretKey(bs58.decode("65R9KA83MEzveeFwozMHrPeoNEEXXWnFrB8WJbLoAqLXT7KEvrV8cKaG1dj4VDGL4S1tJt6YrnfSiqiVm5AmenkE"));

    const createToken = async() => {
        const airdropSignature = await connection.requestAirdrop(fromWallet.publicKey,LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSignature);

        mint = await createMint(
            connection,
            fromWallet,
           fromWallet.publicKey,
            null,
            6
        );
        console.log('Create Token: '+ mint.toBase58());

        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        );
        console.log("Create Token Account: " + fromTokenAccount.address.toBase58());
        let payerSecret = new Uint8Array(fromWallet.secretKey);
        console.log("Payer Secret Key: "+ bs58.encode(payerSecret));
    }

    const mintingToken = async() => {
      const signature = await mintTo(
        connection,
        payer,
        tokenId,
        holderAddres,
        payer.publicKey,
        10000000
      );
      console.log("Mint Signature: "+signature);
    }

    const checkBalance = async() => {
      const mintInfo = await getMint(connection, tokenId);
      console.log(mintInfo.supply);

      const tokenAccountInfo =  await getAccount(connection, holderAddres);
      console.log(tokenAccountInfo.amount)
    }

    const airdropping = async() => {
      const airdropSignature = await connection.requestAirdrop(toWallet,LAMPORTS_PER_SOL);
      console.log(await connection.confirmTransaction(airdropSignature));
    }

    const sendToken = async() => {
      // await airdropping();
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection,payer, tokenId, toWallet);
      console.log("toTokenAccount "+toTokenAccount.address);

      const signature = await transfer(
        connection,
        payer,
        holderAddres,
        toTokenAccount.address,
        payer.publicKey,
        1000000
      );
      console.log("signature: "+ signature)
      // console.log("mint : "+mint);
      // console.log("from token account: "+fromTokenAccount);
    }


    return(
        <div>
        <button
        
        onClick={getAccount}
        >
          Connect with wallet
        </button>
        <button
        
        onClick={createToken}
        >
          Create Token
        </button>
        <button
        
        onClick={mintingToken}
        >
          Mint Token
        </button>
        <button
        
        onClick={checkBalance}
        >
          Check Balance
        </button>
        <button
        onClick={sendToken}
        >
          Send Token
        </button>
        <button
        onClick={airdropping}
        >
          Air Dopping SOL
        </button>
        </div>
    )
}

export default MintToken;