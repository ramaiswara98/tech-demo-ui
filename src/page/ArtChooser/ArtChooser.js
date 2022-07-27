import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router';
import TaskCaller from '../../api/TaskCaller';
import UserCaller from '../../api/UserCaller';
import { ImageCard } from '../../component/ImageCard/ImageCard'
import './ArtChooser.css';



export default function ArtChooser() {
   
    const [artList,setArtList] = useState([]);
    const [taskItem, setTaskItem] = useState();
    const [accountData,setAccountData] = useState(null);
    const [alert,setAlert] =useState();

    // selectedPic.bind(this,art.title)

    const params = useParams();

    useState(()=>{
      const getData = async() => {
          const account = await UserCaller.getUser({_id:localStorage.getItem("id")});
          setAccountData(account.data);
          const task = await TaskCaller.getTaskById({_id:params.id})
          setTaskItem(task.data);
          const newArray = []
          if(task.data.urlList.length > 0 ){
            task.data.urlList.map((url,index) => {
              const items = {
                id:url.id,
                link:url.link,
                status:false
              }
              newArray.push(items)
            })
            setArtList(newArray)
          }else{

          }
          
      }

      getData();
    },[])

    const counterCalculate = () =>{
      let counterSum=0;
      artList.map((art,index)=>{
        if(art.status){
          counterSum++
        }else{

        }
      })
      return counterSum;
    }
    const selectedPic = async(index,art) => {
      const counter = await counterCalculate();
      if(counter>=5 && art.status || counter < 5){
        let newArtTotal = [...artList];
        newArtTotal[index]={id:art.id,link:art.link,status:!(art.status)}
        setArtList(newArtTotal)
      }else{
        alert("You only can choose 5 picture")
      }
      
    }

    const onSubmitClick= async() => {
      setAlert(<Alert variant='secondary'>Submiting Answer ...</Alert>)
      const counter = counterCalculate();
      if(counter < 5){
        setAlert(<Alert variant='warning'>Please Choose 5 Pic</Alert>)
        // alert("please choose 5 pic")
      }else{
        let newArray =[];
          artList.map((art,index) => {
            if(art.status){
              newArray.push(art)
            }
          })
          if(accountData !== null) {
            const data = {
              accountData,
              answer:newArray,
              taskData:taskItem
            }
            const submit = await TaskCaller.submitTask(data);
            if(submit){
              setAlert(<Alert variant='success'>Successfully Submit Answer</Alert>)
              window.location.href="/offers"
            }
            console.log(data)
          }else{

          }
          }
      
      
    }

  return (
    <div >
      <h2>Please choose five picture that will be examinate</h2>
  
      <div className='galeryContainer'>
        {artList.length > 0 ? (
          <>
          {artList.map((art,index)=>{
              return(
                  <div >
                  <ImageCard
                    artDetail={art}
                    index={index}
                    selected={selectedPic}
                  />
                  </div>
              )
          })}
          </>
        ):(
        <>No Art Yet</>)}
          
        
      </div>
      <div style={{textAlign:"center", margin:"20px auto"}}>
        {alert}
      </div>
      <div style={{margin:"auto auto 10px auto", textAligment:"center", maxWidth:"300px"}}>
      <Button 
      className='button-red'
      onClick={()=>{onSubmitClick()}}
      >Submit Selection</Button>{''}
      </div>

      
     
    </div>
  )
}
