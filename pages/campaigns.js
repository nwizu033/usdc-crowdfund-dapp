import { ethers } from "ethers";
import styles from '../styles/campaign.module.css';
import crowdfund_abi from "../utils/crowdfundAbi.json";
import { useState } from "react";

  

const campaigns = () => {

  const [result, setResult] = useState([]);
  const yes = ['boy','girl'];
  console.log(yes);

  const see = async () => {
  const contractAddress = '0x40277C4eCB2804b2C1Ad860EC0430a4b50932aF5';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, crowdfund_abi, signer);
  const seeCampaigns = await contract.seeCampaigns();
  setResult(seeCampaigns);
  console.log(result);
  }

  const date = (timeStamp) => {
    let dateFormat = new Date(timeStamp);
    return (dateFormat.getDate()+
    '/' + (dateFormat.getMonth()+1)+
    '/' + dateFormat.getFullYear()+
    ' ' + dateFormat.getHours()+
    ':' + dateFormat.getMinutes()+
    ':' + dateFormat.getSeconds()
    );

  }

  const disp = () => {
    alert("campaign clicked")
  }

  
  return (
    <div>
        <button onClick={see}>See campaigns</button>
       <div className={styles.container}>
          {
            result.map((res) => (
              <div className={styles.card} onClick={disp}>
                <h2>{(res.Title).toString()}</h2>
                <p>{(res.Purpose).toString()}</p>
                <p>{((res.Target)/1000000).toString()} USDC</p>
                <p>{((res.Raised)/1000000).toString()} USDC</p>
                <p>{(date(res.StartTime * 1000))}</p>
                <p>{(date(res.EndTime * 1000))}</p>
                {(res.StartTime *1000 > Date.now()) ? <p className={styles.yet_to_start}>Campaign yet to start</p> :((res.StartTime*1000 < Date.now()) && (res.EndTime*1000 > Date.now()))?<p className={styles.ongoing}>Campaign is ongoing</p> :<p className={styles.ended}>Campaign ended</p>}

                </div>
              
            ))
          }
       
    </div>
    </div>
  );
};

export default campaigns;
