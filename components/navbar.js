import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
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
                <button className={styles.btn}>Connect Wallet</button>
            </div>
        </div>
    );
}
 
export default Navbar;