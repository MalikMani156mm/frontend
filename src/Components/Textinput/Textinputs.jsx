import styles from "./Textinputs.module.css";

function Textinputs(props){
    return(
        <div className={styles.TextInputWrapper}>
            <input {...props} />
            {props.error && <p className={styles.errormessage}>{props.errormessage}</p>}
        </div>

    );

}

export default Textinputs;