import { ethers } from "ethers";
import styles from '../styles/campaign.module.css';
import crowdfund_abi from "../utils/crowdfundAbi.json";
import usdcAbi from "../utils/usdcAbi.json";
import { useState } from "react";

  

const campaigns = () => {

  const [result, setResult] = useState([]);
  const [showModal, setShowModdal] = useState(false);
  const [id, setId] = useState();
  const [amount, setAmount] = useState();
  const contractAddress = '0x3cebD7D44b0CE040CFd222E48f5e2E2edF88366E';
  const  usdcContractAddress = '0x07865c6e87b9f70255377e024ace6630c1eaa37f';

  // See all the listed campaigns
  const see = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, crowdfund_abi, signer);
  const seeCampaigns = await contract.seeCampaigns();
  setResult(seeCampaigns);
  }


  const pledge = async () => {
    // first approve before pledging
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner(); 
  const usdcContract = new ethers.Contract(usdcContractAddress,usdcAbi,signer);
  const approval = await usdcContract.approve(contractAddress, (amount * 1000000));
  await approval.wait();
  alert('approved');

  // Implement the pledge function
  const contract = new ethers.Contract(contractAddress, crowdfund_abi, signer);
  const pledge = await contract.pledge(id,amount);
  await pledge.wait();
  alert(pledge.hash);
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


  
  return (
    <div>

        <div className={styles.top}>
          <button onClick={see}>Click to see campaigns</button>
        </div>
          
        <div className={styles.container}>
            {
            result.map((res) => (
              <div className={styles.card} onClick={()=> setShowModdal(true)}>
                <h2>{(res.Title).toString()}</h2>
                <h3>Campaign ID: {(res.CampaignNo).toString()}</h3>
                <p> Details: {(res.Purpose).toString()}</p>
                <p>Target: {((res.Target)/1000000).toString()} USDC</p>
                <p> Raised so far: {((res.Raised)/1000000).toString()} USDC</p>
                <p> Start Time: {(date(res.StartTime * 1000))}</p>
                <button onClick={()=>{alert('Withdraw')}}>Withdraw</button>
                <p> End Time: {(date(res.EndTime * 1000))}</p>
                {(res.StartTime *1000 > Date.now()) ? <p className={styles.yet_to_start}>Campaign yet to start</p> :((res.StartTime*1000 < Date.now()) && (res.EndTime*1000 > Date.now()))?<p className={styles.ongoing}>Campaign is ongoing</p> :<p className={styles.ended}>Campaign ended</p>}

                </div>
              
            ))
          }

          {showModal ? (
            <div className={styles.modal}>
              <p>Pledge</p>
              <input type='number' onChange={(e)=>{ setId(e.target.value)}} placeholder='Campaign ID'/>
              <input type='number' onChange={(e)=>{ setAmount(e.target.value)}} placeholder='Amount'/>
              <button onClick={pledge}>Pledge</button>
              <button onClick={()=> setShowModdal(false)}>Close modal</button>
            </div>
          ) : null}
       
    </div>
    </div>
  );
};

export default campaigns;
