function leitura() {
    const elem = this.responseXML.documentElement;
    const livro = elem.getElementsByTagName('livro');
    console.log(livro);
}

function pegadir(elem, i, j) {
    const livro = elem.getElementsByTagName('livro')[i];
    return [livro.getElementsByTagName("titulo")[j].firstChild.nodeValue, livro.getElementsByTagName("autor")[j].firstChild.nodeValue, livro.getElementsByTagName("ano")[j].firstChild.nodeValue, livro.getElementsByTagName("preco")[j].firstChild.nodeValue];
}

function jogaParaPagina() {
    const elem = this.responseXML.documentElement;
    const matrizDiretorio = [];
    for (let i = 0; i < elem.getElementsByTagName('livro').length; i++) {
        matrizDiretorio[i] = pegadir(elem, i, 0);
        console.log(matrizDiretorio[i][1]);
    }
}

function ajax(get, url, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = callback;
    xhttp.open(get, url, true);
    xhttp.send();
}

ajax("GET", "dados.xml", jogaParaPagina);