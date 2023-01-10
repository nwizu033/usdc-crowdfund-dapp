import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { ethers } from 'ethers';
import {useState} from "react";


const Navbar = () => {
    const [currentAccount, setCurrentAccount] = useState();
    
    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any"); 
        // Prompt user for account connections
        const accounts = await provider.send("eth_requestAccounts", []);
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
      }

      const shortenAddress = (currentAccount) => `${currentAccount.slice(0, 3)}...${currentAccount.slice(currentAccount.length - 4)}`
      
      const disconnectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const accounts = await provider.send("eth_requestAccounts", []);
        setCurrentAccount(!accounts[0]);
      }

    return (
        <div className={styles.navbar}>
            <div className={styles.logoSection}>
                <Image src="https://logotyp.us/files/usd-coin.svg" width={128} height ={70}/>
                <h1>USDC CrowdFund</h1>
            </div>
            <div className={styles.navRest}>
                <Link href='/'>Home</Link>
                <Link href='/campaigns'>Campaigns</Link>
                <Link href='/listing'>List a campaign</Link>
                {!currentAccount ?  <button onClick={connectWallet} className={styles.btn}>Connect Wallet</button> :
            <button onClick={disconnectWallet} className={styles.btn}>Connected: {shortenAddress(currentAccount)}</button>}

            </div>
        </div>
    );
}
 
export default Navbar;