// import axios from "axios";
// import { apiUrls } from "./api";

export const loginUser = (login: string, password: string, type?: string, id?: number) => {
    window.localStorage.setItem("login", login);
    window.localStorage.setItem("password", password);
    if (type) {
        window.localStorage.setItem("type", type);
    }
    if (id) {
        window.localStorage.setItem("id", id.toString());
    }
    window.localStorage.setItem("isLogin", "true");
    console.log(login, password, "logged in");
}

export const logoutUser = () => {
    window.localStorage.clear();
    window.location.reload();
}

export const check = () => {
    const isLogin = window.localStorage.getItem("isLogin");
    if (isLogin == "true") {
        const type = localStorage.getItem("type");
        if (type) {
            window.location.href = type;
            console.log('a');
        }
    }
}

export type LoginResponse = {
    id?: number,
    request_success: boolean,
    error_message?: string,
    login: string,
    password: string,
    type?: string,
    isLogin: boolean
}
// export const checkLogin = async () => {
//     const login = window.localStorage.getItem("login");
//     const password = window.localStorage.getItem("password");
//     const response = await axios.post<LoginResponse>(apiUrls.baseUrl + apiUrls.login, { login: login, password: password });
//     const data = response.data;

//     if (data.request_success) {
//         if (data.isLogin) {
//             loginUser(data.login, data.password);
//         } else {
//             logoutUser()
//             if (window.localStorage.getItem("isLogin") == "process") {
//                 return
//             } else if (window.localStorage.getItem("isLogin") != "true") {
//                 if (window.location.pathname != "/login") {
//                     window.location.href = "login";
//                     window.localStorage.setItem("isLogin", "process")
//                 }
//             }
//         }
//     } else {
//         console.error("Login server error:", data.error_message);
//     }
// }

