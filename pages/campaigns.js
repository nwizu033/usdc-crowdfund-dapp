import { ethers } from "ethers";
// import styles from '../styles/listing.module.css';
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
    return new Date(timeStamp);

  }

  
  return (
    <div>
        <button onClick={see}>See campaigns</button>
        {
          yes.map((res) => (
            <div>{res}</div>
          ))
        }
        {
          result.map((res) => (
            <div>{((res.Target)/1000000).toString()}</div>
          ))
        }
        {/* {
          result.map((res) => (
            <div>{(res.Withdrawn).toString()}</div>
          ))
        } */}
        {
          result.map((res) => (
            <div>{(new Date(res.StartTime * 1000).toDateString())}</div>
          ))
        }
    </div>
  );
};

export default campaigns;
