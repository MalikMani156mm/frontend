import { useSelector } from "react-redux";
import styles from "./PriorBar.module.css";
import { useNavigate } from "react-router-dom";

function PriorBar() {

    const navigate = useNavigate();
    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const Role = "SuperAdmin";
    const handleClick = () => {
        if (user.role === Role) {
            navigate("/admin/PriorityComplaint");
        } else {
            navigate("/PriorityComplaint");
        }
    }
    return (
        <div className={styles.PriorBar}>
            <button className={styles.Button} onClick={handleClick}>Priority Complaints ({cart && cart.length})</button>
        </div>

    );

}

export default PriorBar;