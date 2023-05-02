let fromPole = null;
let toPole = null;

function onClick(poleid) {
    if (fromPole === null) {
        fromPole = poleid;
    } else {
        toPole = poleid;
        document.location.search = `from=${fromPole}&to=${toPole}`;
    }
    document.getElementById("pole-" + poleid).classList.add('selected');
}