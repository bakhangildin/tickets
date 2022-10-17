import axios from "axios";
import { Component } from "solid-js";
import { apiUrls } from "../../api/api";
import styles from "./BuyPage.module.css"

type BuyPageProps = {};

const BuyPage: Component<BuyPageProps> = (props) => {
  const id = parseInt(window.location.pathname.split("/")[2]);

  const buy = (event: MouseEvent) => {
    event.preventDefault();
    axios.post(apiUrls.baseUrl + apiUrls.buy, { id: id }).then(response => {
      console.log(response.data);

    })
  }

  return <div class={styles.BuyPage}>
    <div class={styles.VerticalLayout}>
      <p> BuyPage FlightID = {id}
      </p>
      <button onClick={buy}>Купить</button>
    </div>
  </div>;
};

export default BuyPage;