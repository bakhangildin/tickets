import { Component } from "solid-js";
import styles from "./FlightCard.module.css";

type FlightCardProps = {
    id: number
    fromCity: string,
    toCity: string,
    date: string,
    price: number
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru");
}

const FlightCard: Component<FlightCardProps> = (props) => {
    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        console.log(`Clicked on `, props.id);
    }

    return <div class={styles.FlightCard} onclick={handleClick}>
        <div class={styles.Info}>
            <p>{props.fromCity} &mdash; {props.toCity}</p>
            <p>{formatDate(props.date)}</p>
            <p>{props.price} &#8381;</p>

            <button class={styles.Button}>Купить</button>
        </div>

    </div>;
};

export default FlightCard;