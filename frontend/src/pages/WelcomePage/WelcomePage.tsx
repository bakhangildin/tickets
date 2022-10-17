import { Component } from "solid-js";
import styles from "./WelcomePage.module.css"

type WelcomePageProps = {};

const WelcomePage: Component<WelcomePageProps> = (props) => {

  return <div class={styles.WelcomePage}>
    <h1>Авиабилеты</h1>
    <a href="/client" class={styles.Button}>
      <span>Я - клиент</span>
    </a>
    <a href="/manager" class={styles.Button}>
      <span>Я - менеджер</span>
    </a>
    <a href="/techmanager" class={styles.Button}>
      <span>Я - тех. менеджер</span>
    </a>
  </div>;
};

export default WelcomePage;