import { Component, createSignal, For } from "solid-js";
import styles from "./ClientPage.module.css";

import SearchFlight from "../../components/SearchFlight/SearchFlight";
import MyTickets from "../../components/MyTickets/MyTickets";
import Account from "../../components/Account/Account";

class MenuItem {
    tabName: string
    tabComponent: Component

    constructor(tabName: string, tabComponent: Component) {
        this.tabName = tabName;
        this.tabComponent = tabComponent;
    }
}

const ClientPage: Component<{}> = (props) => {
    const [tabIndex, setTabIndex] = createSignal(0);

    const tabClick = (event: MouseEvent) => {
        setTabIndex(prev => {
            const target = event.target as HTMLElement;
            return parseInt(target.getAttribute("data-index") || "0");
        })
    }
    const menu = [
        new MenuItem("Поиск рейсов", SearchFlight),
        new MenuItem("Мои билеты", MyTickets),
        new MenuItem("Личный кабинет", Account)
    ]

    return <div class={styles.ClientPage}>
        <div class={styles.LeftMenu}>
            <For
                each={menu}
                fallback={<div class={styles.MenuItem}>Меню сломалось</div>}>
                {
                    (item, index) =>
                        <div
                            class={styles.MenuItem}
                            classList={{ [styles.selected]: tabIndex().toString() === index().toString() }}
                            onclick={tabClick}
                            data-index={index()}>
                            {item.tabName}
                        </div>
                }
            </For>

        </div>
        {
            menu[tabIndex()].tabComponent({})
        }
    </div >;
};

export default ClientPage;