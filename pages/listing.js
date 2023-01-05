import styles from '../styles/listing.module.css';
const listing = () => {
    return (
        <div className={styles.list_container}>
            <form className={styles.form}>
                <h2 className={styles.list_h2}>List your campaign</h2>
                <input type='text' placeholder='Title of campaign' required/>
                <input type='text' placeholder='Brief detail (less than 300 characters)' required/>
                <input type='number' placeholder='Target in (USDC)' required/>
                <input type='number' placeholder='Start time in minutes' required/>
                <input type='number' placeholder='End time in minutes'required/>
                <button type='submit' className={styles.btn}>List</button>
            </form>

        </div>
    );
}
 
export default listing;