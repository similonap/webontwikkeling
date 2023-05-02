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
    return `Welcome, today is ${dateFormatter(date)} - ${timeFormatter(date)}`;
}

const startWelcome = (formatter: DateFormatter) => {
    let colors = ['red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
    let colorIndex = 0;
    let color = colors[colorIndex];
    term.grabInput( { mouse: 'button' } ) ;
    term.on( 'key' , function( name:string ) {
        if ( name === 'x' ) { process.exit(); }
        if ( name === 'c' ) { colorIndex++; color = colors[colorIndex % colors.length]; }
    } ) ;
    setInterval(() => {
        let date = new Date();
        term.clear();
        term.moveTo(1,1);
        term.color(color);
        term(welcome(date, formatter, hhmmssFormatter));
        term.moveTo(1,term.height);
        term.color("black");
        term.bold("Press 'c' to change color, 'x' to exit")
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
term.clear();
term.cyan( 'Select a date format: \n' ) ;
term.singleColumnMenu( items , function( error , response ) {
	startWelcome(formatters[response.selectedText])
} ) ;


