irineu = document.getElementsByTagName('section')

function defina(nome, sobrenome) {
  document.querySelector('div#titulo h2').firstChild.nodeValue = nome
  document.querySelector('div#desc p').firstChild.nodeValue = sobrenome

}


function criarBotoes(nome, nomefuncao) {
  var button = document.createElement("button")
  button.setAttribute("class", "titulo")
  button.setAttribute("onclick", nomefuncao)
  button.textContent = nome
  button.style.display = "flex"
  button.style.cursor = "pointer"
  var parentElement = document.querySelector(".comand")
  parentElement.appendChild(button)
}

function definaSubt(i, qual, nome) {
  document.querySelectorAll("section.explicar " + qual)[i].firstChild.nodeValue = nome
}

function redirecione(item) {
  window.location.href = `https://www.example.com/search?q=${item}`
}

function divideEmParagrafos() {
  var textarea = document.getElementById("paragrafos")
  var texto = textarea.value
  var paragrafos = texto.split("\n")
  var resultado = ""

  for (var i = 0; i < paragrafos.length; i++) {
    definaSubt(i,'p',paragrafos[i])
  }
}


document.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') { // Obtém os valores dos elementos HTML
    var titulo = document.getElementsByTagName('input')[0].value
    var desc = document.getElementsByTagName('input')[1].value
    var h2 = document.getElementsByTagName('input')[2].value
    var paragrafos = document.getElementsByTagName("paragrafos").value
    defina(titulo, desc)
    definaSubt(0, 'h2', h2)
    divideEmParagrafos()
  }
})