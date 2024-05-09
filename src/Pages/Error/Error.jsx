import styles from "./Error.module.css"
import { Link } from "react-router-dom";
function Error(){
    return (
    <div className={styles.errorwrapper}>
        <div className={styles.errorHeader}>Error 404 - Page not found</div>
        <div className={styles.errorbody}>Go back to <Link to="/" className={styles.homelink}>Home</Link></div>
    </div>
    );
}
export default Error;