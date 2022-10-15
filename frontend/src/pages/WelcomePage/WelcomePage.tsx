import { Component } from "solid-js";
import styles from "./WelcomePage.module.css";


const WelcomePage: Component<{}> = (props) => {
    // axios.get
    // axios.post
    // axios.put
    // axios.delete
    // axios.put(apiUrls.baseUrl).then((response) => {
    //     console.log(response.data);
    // })
    return <div class={styles.WelcomePage}>
        <h1>Авиабилеты</h1>
        <a href="/client" class={styles.button}>
            <span>Я - клиент</span>
        </a>
        <a href="/manager" class={styles.button}>
            <span>Я - менеджер</span>
        </a>
        <a href="/techmanager" class={styles.button}>
            <span>Я - тех. менеджер</span>
        </a>
    </div>;
};

export default WelcomePage;
