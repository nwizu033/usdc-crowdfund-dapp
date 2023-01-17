import { ethers } from 'ethers';
import styles from '../styles/listing.module.css';
import crowdfund_abi from '../utils/crowdfundAbi.json';
import { useState } from 'react';

// 0x138d450D2701E50e6Ef8DE223AF94Bb3b1c8D523 crowdfund
// matic crowdfund 0x40277C4eCB2804b2C1Ad860EC0430a4b50932aF5

const listing = () => {
    
    const contractAddress = '0x66d0071274821E0FC84a120c3c8c01ef29372385';
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();
    const [target, setTarget] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();


    const list = async () => {
        try{
            const { ethereum } = window;

        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, crowdfund_abi, signer);
            const listCampaign = await contract.listCampaign(title,detail,target,start,end);
            alert('Listing campaign, please wait');
            await listCampaign.wait();
            alert('Campaign listed successfully');
            }
        
        } catch(err) {

            console.error(err);
            alert( err.message + "Make sure your wallet is connected and fill every detail")
        
        }
    }


    return (
        <div className={styles.list_container}>
            <div className={styles.form}>
                <h2 className={styles.list_h2}>List your campaign</h2>
                <input type='text' placeholder='Title of campaign'  onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type='text' placeholder='Brief detail (less than 300 characters)' onChange={(e)=>{setDetail(e.target.value)}}/>
                <input type='number' placeholder='Target in (USDC)' onChange={(e)=>{setTarget(e.target.value)}}/>
                <input type='number' placeholder='Start time in minutes' onChange={(e)=>{setStart(e.target.value)}}/>
                <input type='number' placeholder='End time in minutes' onChange={(e)=>{setEnd(e.target.value)}}/>
                <button type='submit' className={styles.btn} onClick={list}>List</button>
            </div>

        </div>
    );
}
 
export default listing;