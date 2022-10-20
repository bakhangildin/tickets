import axios from "axios";
import { Component, createSignal, For } from "solid-js";
import { FlightCardProps, toOption } from "../../components/SearchFlight/SearchFlight";
import { apiUrls } from "../../utils/api";
import styles from "./BuyPage.module.css"

type BuyPageProps = {};

type FlightInfo = {
  city_from?: string
  city_to?: string
  departure?: string
  arrival?: string
}

type SeatType = {
  id_seats: number
  name: string
  BC_ST: string
  luggage_weight: number
  hand_luggage: number
  price: number
}
const BuyPage: Component<BuyPageProps> = (props) => {
  const [info, setInfo] = createSignal<FlightInfo>();
  const [types, setTypes] = createSignal<SeatType[]>([]);

  const [places, setPlaces] = createSignal([]);

  const id = parseInt(window.location.pathname.split("/")[2]);

  setTimeout(() => {
    axios.post<FlightInfo>(apiUrls.baseUrl + apiUrls.flightInfoSm, { id: id }).then((response) => {
      const data = response.data;
      setInfo(data)
    })
  }, 500)


  axios.post<SeatType[]>(apiUrls.baseUrl + apiUrls.seatTypes, { id: id }).then(r => {
    if (r.data.length > 0) {
      setTypes(r.data);
    }
  })

  const avaliable_seats = (event: MouseEvent) => {
    const elm = event.target as HTMLInputElement;
    const data = {
      // "seat_id": elm.dataset.seat_id,
      "BC_ST": elm.dataset.bc_st,
      "flight_id": id
    }
    axios.post(apiUrls.baseUrl + apiUrls.avaliablePlaces, data).then(r => {
      setPlaces(prev => r.data);
    })



  }

  const buy = (event: Event) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const place: string = document.querySelector("#place").value;

    const tmp = place.split(" ")
    const row = parseInt(tmp[0]);
    // const seat = 

    const data = {
      "seat_row": row,
      "seat_number": tmp[1].charCodeAt(0) - "A".charCodeAt(0) + 1,
      "seat_id": parseInt(document.querySelector("#seat-id").dataset.seat_id),
      "flight-id": id,
      "buyer-id": parseInt(window.localStorage.getItem("id")),
      "passanger-id": parseInt(window.localStorage.getItem("id")),
    }





    axios.post(apiUrls.baseUrl + apiUrls.buy, data).then(r => {
      if (r.data.success) {
        document.querySelector("#success").innerText = "Билет куплен";
      } else {
        document.querySelector("#success").innerText = "Место занято. Обновите страницу";
        setTimeout(() => document.location.reload(), 5000);
      }
    })

    // })
    // axios.post(apiUrls.baseUrl + apiUrls.buy, {seatId: }).then(r => {
    //   console.log(r.data);
    // })
    // axios.post(apiUrls.baseUrl + apiUrls.buy, { id: id }).then(response => {
    //   console.log(response.data);

    // })
  }

  return <form class={styles.BuyPage} onsubmit={buy}>
    <div class={styles.VerticalLayout}>
      <div class={styles.VerticalLayout}>
        <p style="padding: var(--padding);">

          {info()?.city_from} &mdash; {info()?.city_to} <br />
          {(new Date(info()?.departure)).toLocaleString()} &mdash; {(new Date(info()?.arrival)).toLocaleString()}
        </p>
        <div class={styles.Card}>
          <For each={types()} fallback={<p>Ошибка</p>}>
            {(item, index) => {
              return <div style="display: flex; gap: 10px;">
                <input required onclick={avaliable_seats} class={styles.Radio} type="radio" name="seat-id" id="seat-id" data-seat_id={item.id_seats} data-bc_st={item.BC_ST} />
                <label for={index().toString()}>{item.name} {parseInt(item.price.toString()).toString()} ₽  Багаж {item.luggage_weight.toString()}кг  Ручная кладь {item.hand_luggage.toString()}кг</label>
              </div>
            }}
          </For>
        </div>
        <div class={styles.Card}>
          <select name="place" id="place" required>
            <option value="" disabled selected>Место</option>
            {places().map(item => toOption(item))}
          </select>
        </div>
        {/* <div class={styles.Card}></div> */}
      </div>
      <button type="submit" class={styles.Button}>Купить</button>
    </div>
    <p id="success"></p>
  </form >;
};

export default BuyPage;