import axios from "axios";
import { Component, createSignal } from "solid-js";
import { apiUrls } from "../../utils/api";
import { check, logoutUser } from "../../utils/login";

import styles from "./Account.module.css"

type AccountProps = {};

type Account = {
  birth_sertificate?: number
  date_of_birth?: string
  idcustomers?: number
  // login?: string
  name?: string
  passport_number?: number
  passport_series?: number
  // password?: string
  sex?: string
  surname?: string
}
const Account: Component<AccountProps> = (props) => {
  const [data, setData] = createSignal<Account>();
  axios.post<Account>(apiUrls.baseUrl + apiUrls.account, { id: window.localStorage.getItem("id") }).then(response => {
    setData(response.data)

  })
  return <div class={styles.Account}>
    <pre class={styles.Data}>
      {JSON.stringify(data(), null, 2)}
    </pre>
    <button onclick={logoutUser} class={styles.Button}>Выйти</button>
  </div>;
};

export default Account;