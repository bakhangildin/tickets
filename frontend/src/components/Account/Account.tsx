import { Component } from "solid-js";
import styles from "./Account.module.css";

type AccountProps = {
    text?: string
}

const Account: Component<AccountProps> = (props) => {

    return <div class={styles.Account}>
        {/* Got {props.text} */}
        Account Component
    </div>;
};

export default Account;