import { Component } from "solid-js";
import styles from "./MyTickets.module.css"

type MyTicketsProps = {};

const MyTickets: Component<MyTicketsProps> = (props) => {
  
  return <div class={styles.MyTickets}>
    MyTickets
  </div>;
};

export default MyTickets;