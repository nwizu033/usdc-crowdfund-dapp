import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/home.module.css';
import {useEffect, useState} from "react";
function Home() {
  const [currentAccount, setCurrentAccount] = useState();
  
  return (
    <div className={styles.home}>
        <div className={styles.home_left}>
          <h2 className={styles.heading}>Solve that problem by raising a campaign <br/>
              on this awesome platform
          </h2>
          <p>We provide you the opportunity to raise a campaign to solve<br/>
            those problems affecting your life, family and the society <br/>
            around you. Our numerous users are eager to help.
          </p>
          <Link href='/listing'><button className={styles.btn}>List a campaign</button></Link>
        </div>
        <div className={styles.home_right}>
            <div className={styles.row_1}>
                <Image src='/event1.jpeg' width={150} height={180}/>
                <Image src='/event2.jpeg' width={150} height={180}/>
            </div>
            <div className={styles.row_2}>
                <Image src='/event3.jpeg' width={150} height={180}/>
                <Image src='/event4.jpeg' width={150} height={180}/>
            </div>
        </div>
    </div>
  )
}

export default Home