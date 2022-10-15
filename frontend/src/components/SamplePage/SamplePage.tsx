import { Component } from "solid-js";
import styles from "./SamplePage.module.css";

type SamplePageProps = {
    text: string
}

const SamplePage: Component<SamplePageProps> = (props) => {

    return <div class={styles.SamplePage}>
        <br />
        <p>Props value = {props.text}</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, reprehenderit.</p>
    </div>;
};

export default SamplePage;