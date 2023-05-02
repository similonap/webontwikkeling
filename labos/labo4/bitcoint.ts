import axios from "axios";

interface Code {
    rate: string
}

interface BPI {
    EUR: Code,
    USD: Code
}

interface Bitcoin {
    bpi: BPI
}

fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((response) => {
        return response.json();
    })
    .then((json: Bitcoin) => {
        console.log(json.bpi.EUR.rate);
    });

axios.get<Bitcoin>("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((json) => {
        console.log(json.data.bpi.EUR.rate);
    });