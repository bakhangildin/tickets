import { Component } from "solid-js";
import styles from "./MyTickets.module.css";

type MyTicketsProps = {
    text?: string
}

const MyTickets: Component<MyTicketsProps> = (props) => {

    return <div class={styles.MyTickets}>
        {/* Got {props.text} */}
        MyTickets Component
    </div>;
};

export default MyTickets;