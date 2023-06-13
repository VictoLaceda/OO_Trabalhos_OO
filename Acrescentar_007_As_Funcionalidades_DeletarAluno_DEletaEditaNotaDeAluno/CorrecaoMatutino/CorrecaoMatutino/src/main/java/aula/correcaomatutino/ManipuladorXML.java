package aula.correcaomatutino;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class ManipuladorXML {
    private String caminho;
    private Document doc;
    public ManipuladorXML(String caminho) throws ParserConfigurationException, IOException, SAXException {
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
    private Document fazerParse(String dadosXML) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory fabrica=DocumentBuilderFactory.newInstance();
        DocumentBuilder construtor=fabrica.newDocumentBuilder();
        ByteArrayInputStream fluxo=new ByteArrayInputStream(dadosXML.getBytes());
        return construtor.parse(fluxo);
    }
    public String pegaNomes()
    {
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
    private void salvar() throws TransformerException {
        TransformerFactory fabrica=TransformerFactory.newInstance();
        Transformer transformador=fabrica.newTransformer();
        DOMSource fonte=new DOMSource(doc);
        File f=new File(caminho);
        StreamResult saida=new StreamResult(f);
        transformador.transform(fonte,saida);
    }
    private Element buscarPeloNome(String nome){
        NodeList nomes=doc.getElementsByTagName("nome");
        int tam=nomes.getLength();
        for(int i=0;i<tam;i++)
        {
            Node noNome=nomes.item(i);
            if(noNome.getFirstChild().getNodeValue().equals(nome))
                return (Element) noNome.getParentNode();
        }
        return null;
    }
    public void adicionarNota(String dadosXML) throws ParserConfigurationException, IOException, SAXException, TransformerException {
        Document docDados=fazerParse(dadosXML);
        String nome=docDados.getElementsByTagName("nome").item(0).getTextContent();
        String nota=docDados.getElementsByTagName("nota").item(0).getTextContent();
        Element aluno= buscarPeloNome(nome);
        if(aluno!=null)
        {
            Element noNota=doc.createElement("nota");
            noNota.setTextContent(nota);
            aluno.getElementsByTagName("notas").item(0).appendChild(noNota);
            salvar();
        }
        else
            throw new IllegalArgumentException(" nome não existe");
    }
}
