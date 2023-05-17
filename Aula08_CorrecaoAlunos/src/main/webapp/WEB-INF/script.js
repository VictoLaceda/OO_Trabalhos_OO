
function parseFromS_Insere(inserir) {
    const parser=new DOMParser();
    return parser.parseFromString(inserir,"text/html");
}


function mostrarmensagem() {
    if (this.readyState == 4 && this.status==200){

    }
}