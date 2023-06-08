function pegaTags() {
    const elem = this.responseXML.documentElement;
    const livro = elem.getElementsByTagName('livro');
    console.log(livro);
}

function pegadirXML(elem, i, j) {
    const livro = elem.getElementsByTagName('livro')[i];
    const titulo = livro.getElementsByTagName("titulo")[j].firstChild.nodeValue;
    const autores = livro.getElementsByTagName("autor");
    const autoresArray = [];

    for (let k = 0; k < autores.length; k++) {
        autoresArray.push(autores[k].firstChild.nodeValue);
    }

    const ano = livro.getElementsByTagName("ano")[j].firstChild.nodeValue;
    const preco = livro.getElementsByTagName("preco")[j].firstChild.nodeValue;

    return [titulo, autoresArray, ano, preco];
}

function jogaParaPagina() {
    const elem = this.responseXML.documentElement;
    const matrizXML = [];

    for (let i = 0; i < elem.getElementsByTagName('livro').length; i++) {
        const matrizDados = pegadirXML(elem, i, 0);
        matrizXML.push(matrizDados);

        const linhaDados = document.getElementById('linha_dados');
        const clonado = linhaDados.cloneNode(true);

        clonado.querySelector('td:nth-child(1)').textContent = matrizDados[0];

        const autoresList = clonado.querySelector('ul');
        autoresList.innerHTML = '';

        matrizDados[1].forEach(function(autor) {
            const li = document.createElement('li');
            li.textContent = autor;
            autoresList.appendChild(li);
        });

        clonado.querySelector('td:nth-child(3)').textContent = matrizDados[2];
        clonado.querySelector('td:nth-child(4)').textContent = matrizDados[3];

        linhaDados.parentNode.appendChild(clonado);
    }
}

function ajax(get, url, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = callback;
    xhttp.open(get, url, true);
    xhttp.send();
}

ajax("GET", "colorido.xml", jogaParaPagina);

document.getElementsByTagName('table')[0].onmousemove = () => {
    console.log('aeeee')
}