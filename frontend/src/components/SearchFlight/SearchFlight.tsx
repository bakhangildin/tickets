import { Component, createSignal, For, JSX } from "solid-js";
import styles from "./SearchFlight.module.css";

import { apiUrls } from "../../api/urls";
import axios from "axios";
import plane from "../../assets/plane4.svg"
import FlightCard from "../FlightCard/FlightCard";



const toOption = (option: string) => {
    return <option value={option}>{option}</option>
}

type citiesResponse = {
    cities: Array<string>
}


type FlightCardProps = {
    id: number
    fromCity: string,
    toCity: string,
    date: string,
    price: number
}

type SearchResults = {
    results: FlightCardProps[]
}

const formatDate = (date: Date) => {
    const s = date.toLocaleDateString("ru").split(".")
    return `${s[2]}-${s[1]}-${s[0]}`
}

const SearchFlight: Component<{}> = (props) => {
    const [cities, setCities] = createSignal<string[]>([]);
    axios.get<citiesResponse>(apiUrls.baseUrl + apiUrls.city).then((response) => {
        const cities = response.data.cities;
        setCities(prev => cities);
    });

    const [results, setResults] = createSignal<FlightCardProps[]>([]);
    const search = (event: SubmitEvent) => {
        event.preventDefault();
        const form = new FormData(event.target as HTMLFormElement);
        axios.postForm<SearchResults>(apiUrls.baseUrl + apiUrls.search, form).then(response => {
            setResults(prev => response.data.results)
        })
    }

    const updateMin = (event: MouseEvent) => {
        const elm = document.getElementById("date-begin") as HTMLInputElement;
        if (elm.value) {
            const input = event.target as HTMLInputElement;
            input.min = elm.value;
        }
    }


    return <div class={styles.SearchFlight}>
        <form action={apiUrls.baseUrl + apiUrls.search} method="post" onsubmit={search} class={styles.SearchForm}>
            <div class={styles.VerticalLayout}>
                <label for="fromCity">Город вылета</label>
                <select name="fromCity" id="fromCity" required value="" class={styles.Select}>
                    <option value="">Откуда</option>
                    {cities().map(city => toOption(city))}
                </select>
            </div>

            <div class={styles.VerticalLayout}>
                <label for="toCity">Город прилета</label>
                <select name="toCity" id="toCity" required value="" class={styles.Select}>
                    <option value="">Куда</option>
                    {cities().map(city => toOption(city))}
                </select>
            </div>

            <div class={styles.VerticalLayout}>
                <label for="date-begin">От</label>
                <input type="date" name="date-begin" id="date-begin" min={formatDate(new Date())} required class={styles.Select} />
            </div>

            <div class={styles.VerticalLayout}>
                <label for="date-end">До</label>
                <input type="date" name="date-end" id="date-end" min={formatDate(new Date())} onclick={updateMin} required class={styles.Select} />
            </div>

            <div class={styles.VerticalLayout}>
                <br />
                <button type="submit" class={styles.Button}>Искать</button>
            </div>
        </form>
        <For each={results()} fallback={
            <img src={plane} alt="" class={styles.Plane} />
        }>
            {(item, index) => <div data-index={index()}>{
                FlightCard(item)
            }</div>}
        </For>

    </div>;
};

export default SearchFlight;