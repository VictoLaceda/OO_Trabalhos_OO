// fessor refiz denovo nao consegui entender o seu codigo
// mas ele recebe mais de um autor


function leitura() {
    const elem = this.responseXML.documentElement;
    const elem.getElementsByTagName('livro').;
}

function ajax(get, ajax) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = leitura;
    xhttp.open(get, ajax, true);
    xhttp.send();
}

ajax("GET", "dados.xml");

//document