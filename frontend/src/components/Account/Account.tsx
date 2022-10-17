import { Component } from "solid-js";
import styles from "./Account.module.css"

type AccountProps = {};

const Account: Component<AccountProps> = (props) => {
  
  return <div class={styles.Account}>
    Account
  </div>;
};

export default Account;