import { Component, createSignal, For } from "solid-js";
import styles from "./SearchFlight.module.css"

import { apiUrls } from "../../utils/api";
import axios from "axios";
import plane from "../../assets/plane4.svg"
import FlightCard from "../FlightCard/FlightCard";


type SearchFlightProps = {};

type citiesResponse = {
	cities: string[]
}

export type FlightCardProps = {
	id: number
	fromCity: string,
	toCity: string,
	departure: string,
	arrival: string,
	minPrice: number
}

type SearchResults = {
	results: FlightCardProps[]
}


export const toOption = (option: string) => {
	return <option value={option}>{option}</option>
}

export const formatDate = (date: Date) => {
	const s = date.toLocaleDateString("ru").split(".")
	return `${s[2]}-${s[1]}-${s[0]}`
}

const updateMin = (event: MouseEvent) => {
	const elm = document.getElementById("date-begin") as HTMLInputElement;
	if (elm.value) {
		const input = event.target as HTMLInputElement;
		input.min = elm.value;
	}
}


const SearchFlight: Component<SearchFlightProps> = (props) => {
	const [cities, setCities] = createSignal<string[]>([]);
	axios.get<citiesResponse>(apiUrls.baseUrl + apiUrls.city).then((response) => {
		const cities = response.data.cities;
		setCities(prev => cities);
	});

	const [results, setResults] = createSignal<FlightCardProps[]>([]);
	const search = (event: SubmitEvent) => {
		document.getElementById("error-message")?.remove();
		document.getElementById("notfound-message")?.remove();
		event.preventDefault();
		const form = new FormData(event.target as HTMLFormElement);
		if (form.get("fromCity") == form.get("toCity")) {
			const err = document.createElement("p");
			err.id = "error-message"
			err.style.color = "#CC0000";
			err.style.fontSize = "12px";
			err.innerText = "Неверный выбор городов"
			document.getElementById("submit")?.appendChild(err);
			return;
		}
		axios.postForm<SearchResults>(apiUrls.baseUrl + apiUrls.search, form).then(response => {
			setResults(prev => response.data.results)
			if (results().length == 0) {
				const err = document.createElement("p");
				err.id = "notfound-message"
				err.style.color = "#CC0000";
				err.style.fontSize = "12px";
				err.innerText = "Ничего не нашлось"
				document.getElementById("submit")?.appendChild(err);
				return;
			}
		})
	}

	return <div class={styles.SearchFlight}>
		<form action={apiUrls.baseUrl + apiUrls.search} method="post" class={styles.SearchForm} onsubmit={search}>
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
				<input type="date" name="date-begin" id="date-begin" min={formatDate(new Date())} class={styles.Select} />
			</div>
			<div class={styles.VerticalLayout}>
				<label for="date-end">До</label>
				<input type="date" name="date-end" id="date-end" min={formatDate(new Date())} onclick={updateMin} class={styles.Select} />
			</div>
			<div class={styles.VerticalLayout}>
				<label for="price">Максимальная цена</label>
				<input type="number" name="price" id="price" class={styles.Input} placeholder="10 000 ₽" min="0" max="1000000" />
			</div>
			<div class={styles.VerticalLayout}>
				<br />
				<button type="submit" id="submit" class={styles.Button}>Искать</button>
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