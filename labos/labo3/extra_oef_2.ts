import Terminal from "terminal-kit";

const term = Terminal.terminal;

interface DateFormatter {
    (date: Date): string
}

const pad = (number: number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

const ddmmyyyFormatter : DateFormatter = (date) => {
    return `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()}`;
}

const mmddyyyFormatter : DateFormatter = (date) => {
    return `${pad(date.getMonth()+1)}/${pad(date.getDate())}/${date.getFullYear()}`;
}

const yyyymmddFormatter : DateFormatter = (date) => {
    return `${date.getFullYear()}/${pad(date.getMonth()+1)}/${pad(date.getDate())}`;
}

const hhmmssFormatter : DateFormatter = (date) => {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const welcome = (date: Date, dateFormatter: DateFormatter, timeFormatter: DateFormatter) => {
    console.log(`Welcome, today is ${dateFormatter(date)} - ${timeFormatter(date)}`);
}

const startWelcome = (formatter: DateFormatter) => {
    setInterval(() => {
        let date = new Date();
        welcome(date, formatter, hhmmssFormatter);
    }, 1000);
}

let formatters : {
    [key: string]: DateFormatter
} = {
    "dd/mm/yyyy": ddmmyyyFormatter,
    "mm/dd/yyyy": mmddyyyFormatter,
    "yyyy/mm/dd": yyyymmddFormatter
}

var items = Object.keys(formatters);

term.cyan( 'Select a date format: \n' ) ;
term.singleColumnMenu( items , function( error , response ) {
	startWelcome(formatters[response.selectedText])
} ) ;


