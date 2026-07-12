import axios from "axios";

const albumesAPi = axios.create({
   baseURL: 'https://vvrodriguez.pythonanywhere.com/api',
   headers: { 'Content-Type': 'application/json' },
});

export default albumesAPi;