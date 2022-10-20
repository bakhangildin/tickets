import { Component } from "solid-js";
import { apiUrls } from "../../utils/api";
import styles from "./FlightCard.module.css"

type FlightCardProps = {
  id: number
  fromCity: string,
  toCity: string,
  departure: string,
  arrival: string,
  minPrice: number
}


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("ru").slice(0, -3);
}

const FlightCard: Component<FlightCardProps> = (props) => {
  const buy = (event: MouseEvent) => {
    event.preventDefault();
    console.log(`Clicked on`, props.id);
    window.open(apiUrls.flightInfoSm + "/" + props.id.toString());
  }

  return <div class={styles.FlightCard} onClick={(event: MouseEvent) => { console.log(event.target) }}>
    <div class={styles.HorizontalLayout}>
      <p>{props.fromCity} &mdash; {props.toCity}</p>
      <hr />
      <p>{formatDate(props.departure)} &mdash; {formatDate(props.arrival)}</p>
      <hr />
      <p>от {props.minPrice} &#8381;</p>
      <hr />
      <button class={styles.Button} onClick={buy}>Купить</button>
    </div>
  </div>;
};

export default FlightCard;