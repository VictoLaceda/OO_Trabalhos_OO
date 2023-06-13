function ajax(recurso,dado,funcao)
{
    const xhr=new XMLHttpRequest();
    xhr.open("get",`${recurso}?${dado}`,true);
    xhr.onreadystatechange=funcao;
    xhr.send();
}
onload=function (){
    document.getElementById("btTitulo").onclick=function (evento){
        evento.preventDefault();
        const titulo=document.getElementById("titulo").value;
        ajax("pegaportitulo","titulo="+titulo,mostrarLivro);
    }
    document.getElementById("btAno").onclick=function (evento){
        evento.preventDefault();
        const ano=document.getElementById("ano").value;
        const operador=document.getElementById("operador").value;
        ajax("pegaporano",`ano=${ano}&operador=${operador}`,mostrarLivros);
    }
}
function livroParaHtml(livro)
{
    const categoria=livro.getAttribute("categoria");
    const titulo=livro.getElementsByTagName("titulo")[0].textContent;
    const ano=livro.getElementsByTagName("ano")[0].textContent;
    const preco=livro.getElementsByTagName("preco")[0].textContent;

    const autores=livro.getElementsByTagName("autor");
    let texto=`<article class="${categoria}">
            <h1>${titulo}</h1>
            <ul>`;

    for(let autor of autores)
        texto+=`<li>${autor.firstChild.nodeValue}</li>`;

    texto+=`</ul>
            <p><b>${ano}</b></p>
            <p><em>R$ ${preco}</em></p>
            <a href="deletar?titulo=${titulo}" data-titulo="${titulo}" onclick="deletar(event)">Deletar</a>
        </article>`;
    return texto;
}
function deletar(evento){
    evento.preventDefault();
    const link=evento.target;
    const titulo=link.getAttribute("data-titulo");
    ajax("deletar","titulo="+titulo,function (){
        if(this.readyState==4 && this.status==200)
        {
            alert(this.responseXML.documentElement.textContent);
            const artigo=link.parentNode;
            artigo.parentNode.removeChild(artigo);
        }
    });
}
function mostrarLivro()
{
    if(this.readyState==4 && this.status==200)
    {
        const livro=this.responseXML.documentElement;
        document.getElementById("resultado").innerHTML=livroParaHtml(livro);
    }
}
function mostrarLivros()
{
    if(this.readyState==4 && this.status==200)
    {
        const livraria=this.responseXML.documentElement;
        const livros=livraria.getElementsByTagName("livro");
        texto="";
        for(let livro of livros)
        {
            texto+=livroParaHtml(livro);
        }
        document.getElementById("resultado").innerHTML=texto;
    }
}