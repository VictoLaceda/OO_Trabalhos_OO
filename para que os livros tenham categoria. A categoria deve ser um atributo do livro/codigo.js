function xmlParaDoc()
{
    let livraria=localStorage.dados;
    if(livraria==undefined)
        livraria="<livraria></livraria>";
    const parser=new DOMParser();
    return parser.parseFromString(livraria,"text/xml");
}
function salvar(xmlDoc)
{
    let serealizador=new  XMLSerializer();
    let textoXML=serealizador.serializeToString(xmlDoc);
    localStorage.dados=textoXML;
}
function pegaProximoSerial()
{
    let novoId=localStorage.serial;
    if(novoId==undefined)
        novoId=1;
    else
        novoId++;
    localStorage.serial=novoId;
    return novoId;
}
function preencheTabela(xmlDoc)
{
    const raiz=xmlDoc.documentElement;
    const livros=raiz.getElementsByTagName("livro");
    
    let texto="";
    for(let livro of livros)
    {
        texto+=livroParaTd(livro);
    }
    document.querySelector("tbody").innerHTML=texto;
}  
function preencheTabelaFiltradoPorAno(xmlDoc,ano)
{
    const raiz=xmlDoc.documentElement;
    const livros=raiz.getElementsByTagName("livro");
    
    let texto="";
    for(let livro of livros)
    {
        if(livro.getElementsByTagName("ano")[0].firstChild.nodeValue==ano)
            texto+=livroParaTd(livro);
    }
    document.querySelector("tbody").innerHTML=texto;
}  
function livroParaTd(livro)
{
    let titulo=pegaDadoDoLivro("titulo",livro)
    let autor=pegaDadoDoLivro("autor",livro);
    let ano=pegaDadoDoLivro("ano",livro);
    let preco=pegaDadoDoLivro("preco",livro)

    return `<tr>
                <td>${titulo}</td>
                <td>${autor}</td>
                <td>${ano}</td>
                <td>${preco}</td>
                <td><input data-id="${livro.getAttribute("id")}" type='button' onclick='antetesDeEditar(this)' value='Editar'></td>
                <td><input data-id="${livro.getAttribute("id")}" type='button' onclick='deletar(this)' value='Deletar'></td>
            </tr>
            `
    //return "<tr><td>"+titulo+"</td><td>"+autor+"</td>";
}
function editar(evento){
    
    evento.preventDefault();
    
    //pegar o documento XML
    const xmlDoc=xmlParaDoc();

    //pegar os dados do formulario
    const titulo=document.getElementById("titulo").value
    const autor=document.getElementById("autor").value
    const ano=document.getElementById("ano").value
    const preco=document.getElementById("preco").value
    const id=document.getElementById("identificador").value

    //buscar o livro que se quer editar
    const livroParaEditar=buscar(id,xmlDoc.documentElement);

    //trocar os dados do no livro
    livroParaEditar.getElementsByTagName("titulo")[0].firstChild.nodeValue=titulo;
    livroParaEditar.getElementsByTagName("autor")[0].firstChild.nodeValue=autor;
    livroParaEditar.getElementsByTagName("ano")[0].firstChild.nodeValue=ano;
    livroParaEditar.getElementsByTagName("preco")[0].firstChild.nodeValue=preco;
    
    //salvar
    salvar(xmlDoc);
    //redesenhar a tela
    preencheTabela(xmlDoc)
    //remover a classe do formulario
    const botao=evento.target;
    botao.parentNode.classList.remove("flutuar");

    //trocar o value do botão
    botao.value="Cadastrar"
    //trocar o envento de click do botão
    botao.onclick=cadastrar;
}
function antetesDeEditar(botao)
{
    //copiar os dados para o formulario

    const tr=botao.parentNode.parentNode;
    const tds=tr.getElementsByTagName("td");
    const titulo=tds[0].firstChild.nodeValue;
    const autor=tds[1].innerText;
    const ano=tds[2].innerText;
    const preco=tds[3].innerText;

    document.getElementById("titulo").value=titulo;
    document.getElementById("autor").value=autor;
    document.getElementById("ano").value=ano;
    document.getElementById("preco").value=preco;
    document.getElementById("identificador").value=botao.getAttribute("data-id");

    //trocar o value do botão para Editar
    const botaoCadastrar=document.getElementById("btCadastrar");
    botaoCadastrar.value="Editar"
    //trocar o envento de click para Editar
    botaoCadastrar.onclick=editar;

    //colocar classe CSS no formulario para deixa-lo mais pra frente.
    botaoCadastrar.parentNode.classList.add("flutuar"); //botao.parentNode.setAttribute("class","flutuar");

}
function deletar(botao)
{
    //pegar o documento XML
    const xmlDoc=xmlParaDoc();
    const raiz=xmlDoc.documentElement;
    //pesquisar pelo livro com o id informado
    let livroParaRemover=buscar(botao.getAttribute("data-id"),raiz);

    if(livroParaRemover!=null)
    {
        //remover o livro informado
        raiz.removeChild(livroParaRemover);

        //salvar o documento XML
        salvar(xmlDoc)

        //redesenhar a tela
        preencheTabela(xmlDoc)
    }
    else
        alert("Não foi possível remover");
}
function buscar(id,raiz)
{
    const livros=raiz.getElementsByTagName("livro");
    for(let livro of livros)
    {
        if(livro.getAttribute("id")==id)
            return livro;
    }
    return null;
}
const pegaDadoDoLivro= (tag,livro) => {
    let elementos=livro.getElementsByTagName(tag);
    if(tag=="autor" && elementos.length>1)
    {
        let texto="<ul>";
        for(let autor of elementos)
            texto+="<li>"+autor.firstChild.nodeValue+"</li>";
        texto+="</ul>";
        return texto;
    }
    else
        return elementos[0].firstChild.nodeValue
}

/*function pegaDadoDoLivro(tag,livro)
{
    return livro.getElementsByTagName(tag)[0].firstChild.nodeValue
}*/
function criaElementoNoLivro(tag,texto,nolivro,xmlDoc)
{
    const noElemento=xmlDoc.createElement(tag);
    const noTexto=xmlDoc.createTextNode(texto);
    noElemento.appendChild(noTexto);
    nolivro.appendChild(noElemento);
}

function cadastrar(evento)
{
    evento.preventDefault();
    //pegar o documento XML
    const xmlDoc=xmlParaDoc();

    //pegar os dados da interface
    const titulo=document.getElementById("titulo").value;
    const autor=document.getElementById("autor").value;
    const ano=document.getElementById("ano").value;
    const preco=document.getElementById("preco").value;

    //criar um livro
    const nolivro=xmlDoc.createElement("livro");

    nolivro.setAttribute("id",pegaProximoSerial());

    //inserir os dados da interface no livro
    criaElementoNoLivro("titulo",titulo,nolivro,xmlDoc);
    criaElementoNoLivro("autor",autor,nolivro,xmlDoc);
    criaElementoNoLivro("ano",ano,nolivro,xmlDoc);
    criaElementoNoLivro("preco",preco,nolivro,xmlDoc);

    //inserir o livro no documento XML
    xmlDoc.documentElement.appendChild(nolivro);

    //salvar
    salvar(xmlDoc);

    //Redesenha a Tela
    preencheTabela(xmlDoc)
}

function buscarPorTitulo(evento)
{
    evento.preventDefault();
    const textoConsulta=document.getElementById("inputBuscarTitulo").value;
    const xmlDoc=xmlParaDoc();
    const livros=xmlDoc.documentElement.getElementsByTagName("livro");
    for(let livro of livros)
    {
        let noTitulo=livro.getElementsByTagName("titulo")[0];
        let textoTitulo=noTitulo.firstChild.nodeValue;
        if(textoTitulo==textoConsulta)
            alert(livro.getElementsByTagName("preco")[0].firstChild.nodeValue);
    }
}

onload=function(){
    preencheTabela(xmlParaDoc())
    this.document.getElementById("botaoFiltrar").onclick=function(){
        let ano=document.getElementById("filtroAno").value;
        preencheTabelaFiltradoPorAno(xmlParaDoc(),ano);
    }
    document.getElementById("btCadastrar").onclick=cadastrar;
    document.getElementById("btBuscar").addEventListener("click",buscarPorTitulo);
}

function buscarPorCategoria(evento)
{
    evento.preventDefault();
    const textoConsulta=document.getElementById("categoria").getAttribute("id").nodeValue;
    const xmlDoc=xmlParaDoc();
    const livros=xmlDoc.documentElement.getElementsByTagName("livro");
    for(let livro of livros)
    {
        let noCategoria=livro.getElementsByTagName("categoria")[0];
        let textoCategoria=noCategoria.firstChild.nodeValue;
        if(textoCategoria==textoConsulta)
            alert(livro.getElementsByTagName("preco")[0].firstChild.nodeValue);
    }
}
