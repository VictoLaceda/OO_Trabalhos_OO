function ajax(recurso,dados,funcao)
{
    const xhr=new XMLHttpRequest();
    xhr.addEventListener("readystatechange",funcao);
    //xhr.onreadystatechange=funcao;
    xhr.open("post",recurso,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`dados=${dados}`);
}
function mostrarMensagem()
{
    if(this.readyState==4&&this.status==200)
    {
        alert(this.responseXML.documentElement.textContent);
    }
}
onload=()=>{
    if(document.getElementById("btCadastrarAluno")!=null) {
        document.getElementById("btCadastrarAluno").addEventListener("click", () => {
            const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
            const textoXML = `<aluno>
                <nome>${nome}</nome>
                <idade>${idade}</idade>
                <notas></notas>
            </aluno>`
            ajax("cadastrar", textoXML, mostrarMensagem);
        });
    }
    if(document.getElementById("btAdicionarNota")!=null)
    {
        ajax("pegaNomes","",function (){ //preencher o select com nomes
            if(this.readyState==4&&this.status==200)
            {
                const raiz=this.responseXML.documentElement;
                const nomes=raiz.getElementsByTagName("nome");
                let texto="";
                for(let nome of nomes)
                {
                    texto+=`<option value=${nome.textContent}>${nome.textContent}</option>`;
                }
                document.getElementById("nomes").innerHTML=texto;
            }
        });
        document.getElementById("btAdicionarNota").addEventListener("click",()=>{
            const nome = document.getElementById("nomes").value;
            const nota=document.getElementById("nota").value;
            const textoXML=`<dados>
                <nome>${nome}</nome>
                <nota>${nota}</nota>
            </dados>`
            ajax("adicionarNota", textoXML, mostrarMensagem);
        });
    }
}