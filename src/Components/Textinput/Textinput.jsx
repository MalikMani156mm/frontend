import styles from "./Textinput.module.css";

function Textinput(props){
    return(
        <div className={styles.TextInputWrapper}>
            <input {...props} />
            {props.error && <p className={styles.errormessage}>{props.errormessage}</p>}
        </div>

    );

}

export default Textinput;