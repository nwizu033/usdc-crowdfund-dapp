import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import { ethers } from 'ethers';
import {useEffect, useState} from "react";


const Navbar = () => {
    const [currentAccount, setCurrentAccount] = useState();

    const isWalletConnected = async () => {
        try{
            const { ethereum } = window;

            const accounts = await ethereum.request({ method: "eth_accounts"});

            if (accounts.length !== 0) {
                const account = accounts[0];

                setCurrentAccount(account);
                alert(" Wallet is connected");

            } else{
                alert("Please connect your wallet");
            }
        } catch(error) {

            alert(error);
        }
    }

    const connectWallet = async () => {
        try{
            const { ethereum } = window;

            if(!ethereum) {
                alert("Please install metamask for easy experience ");
                
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
        }
   
      }

      const shortenAddress = (currentAccount) => `${currentAccount.slice(0, 3)}...${currentAccount.slice(currentAccount.length - 4)}`
      


      useEffect(()=> {
        isWalletConnected();
      }, []);

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
            <button className={styles.btn}>Connected: {shortenAddress(currentAccount)}</button>}

            </div>
        </div>
    );
}
 
export default Navbar;