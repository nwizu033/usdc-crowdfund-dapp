import { ethers } from 'ethers';
import styles from '../styles/listing.module.css';
import crowdfund_abi from '../utils/crowdfundAbi.json';
import { useState } from 'react';

// 0x138d450D2701E50e6Ef8DE223AF94Bb3b1c8D523 crowdfund
// matic crowdfund 0x40277C4eCB2804b2C1Ad860EC0430a4b50932aF5
const listing = () => {
    const contractAddress = '0x40277C4eCB2804b2C1Ad860EC0430a4b50932aF5';
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();
    const [target, setTarget] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();


    const list = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, crowdfund_abi, signer);
        const listCampaign = await contract.listCampaign(title,detail,target,start,end);
        await listCampaign.wait();
        console.log(listCampaign.hash);
    }
    return (
        <div className={styles.list_container}>
            <div className={styles.form}>
                <h2 className={styles.list_h2}>List your campaign</h2>
                <input type='text' placeholder='Title of campaign' required onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type='text' placeholder='Brief detail (less than 300 characters)' required onChange={(e)=>{setDetail(e.target.value)}}/>
                <input type='number' placeholder='Target in (USDC)' required onChange={(e)=>{setTarget(e.target.value)}}/>
                <input type='number' placeholder='Start time in minutes' required onChange={(e)=>{setStart(e.target.value)}}/>
                <input type='number' placeholder='End time in minutes'required onChange={(e)=>{setEnd(e.target.value)}}/>
                <button className={styles.btn} onClick={list}>List</button>
            </div>

        </div>
    );
}
 
export default listing;