import axios from "axios";
import { Component, createSignal, For } from "solid-js";
import { apiUrls } from "../../utils/api";
import { formatDate } from "../SearchFlight/SearchFlight";
import styles from "./MyTickets.module.css"

type MyTicketsProps = {};

const seats = "ABCDEF";

type Ticket = {
  price: number
  sit_row: number
  sit_number: number
  name: string
  BC_ST: string
  luggage_weight: number
  hand_luggage: number
  departure: string
  arrival: string
  city_to: string
  city_from: string
}

type MyFlightsResponse = {
  tickets?: Ticket[]
}

const MyTickets: Component<MyTicketsProps> = (props) => {
  const [tickets, setTickets] = createSignal<Ticket[]>([]);
  axios.post<MyFlightsResponse>(apiUrls.baseUrl + apiUrls.myTickets, { id: localStorage.getItem("id") }).then(response => {
    const data = response.data;
    if (data.tickets) setTickets(data.tickets)
  })
  return <div class={styles.MyTickets}>
    <For each={tickets()} fallback={<div>Ничего нет</div>}>
      {(item, index) => {
        return <div class={styles.Ticket}>
          {item.city_from} &mdash; {item.city_to} <br />
          {(new Date(item.departure).toLocaleString())} &mdash; {(new Date(item.arrival).toLocaleString())} <br />
          {item.price} ₽ <br />
          {item.sit_row}{seats[item.sit_number - 1]} <br />
          {item.name} <br />
          Багаж {item.luggage_weight} кг<br />
          Ручная кладь {item.hand_luggage} кг
        </div>
      }}
    </For>
  </div>;
};

export default MyTickets;