import { Component } from "solid-js";
import styles from "./TemplatePage.module.css";

type TemplatePageProps = {
    text?: string
}

const TemplatePage: Component<TemplatePageProps> = (props) => {

    return <div class={styles.TemplatePage}>
        Got {props.text}
    </div>;
};

export default TemplatePage;