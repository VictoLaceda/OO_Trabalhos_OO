import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import java.io.IOException;
import java.text.ParseException;

public class Filtrar {
    private String caminho;
    private Document doc;
    public Filtrar(String caminho) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory fabrica=DocumentBuilderFactory.newInstance();
        DocumentBuilder construtor=fabrica.newDocumentBuilder();
        this.caminho=caminho;
        doc=construtor.parse(caminho);
    }
    public void cadastrar(String dadosXML) throws ParserConfigurationException, IOException, SAXException, TransformerException {
        Document doc2=fazerParse(dadosXML);
        Node raiz2=doc2.getDocumentElement();
        Node copia= doc.importNode(raiz2,true);
        doc.getDocumentElement().appendChild(copia);
        salvar();
    }
    public String pegaNomes() {
        String texto="<nomes>"; //reescrever usando stringbuilder
        NodeList nomes=doc.getElementsByTagName("nome");
        int tam=nomes.getLength();
        for(int i=0;i<tam;i++)
        {
            Node nome=nomes.item(i);
            texto+="<nome>"+ nome.getTextContent() + "</nome>";
        }
        return texto+"</nomes>";
    }

    public static void main(String[] args) {

    }
}
