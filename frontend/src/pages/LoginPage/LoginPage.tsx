import axios from "axios";
import { Component } from "solid-js";
import { apiUrls } from "../../utils/api";
import { check, LoginResponse, loginUser } from "../../utils/login";
import styles from "./LoginPage.module.css"

type LoginPageProps = {};

const LoginPage: Component<LoginPageProps> = (props) => {
  const errP = <p style="display: none; color: red;">Неверные данные</p>

  check();

  const login = (event: Event) => {
    errP.style.display = "none";
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    axios.postForm<LoginResponse>(apiUrls.baseUrl + apiUrls.login, form)
      .then(response => response.data)
      .then(data => {
        if (data.request_success) {
          if (data.isLogin) {
            loginUser(data.login, data.password, data.type, data.id);
          } else {
            errP.style.display = "block";
          }
        }
      }).then(() => {
        check();
      })
  }
  return <div class={styles.LoginPage}>
    <form action={apiUrls.baseUrl + apiUrls.login} class={styles.Center} onsubmit={login}>
      <div class={styles.VerticalLayout} style="--gap: 5px;">
        <label for="login">Логин</label>
        <input type="text" name="login" id="login" required placeholder="Логин" />
      </div>

      <div class={styles.VerticalLayout} style="--gap: 5px;">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password" required placeholder="Пароль" />
        {/* <p ref={errP} style="display: none; color: red;">Неверные данные</p> */}
        {errP}
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>;
};

export default LoginPage;