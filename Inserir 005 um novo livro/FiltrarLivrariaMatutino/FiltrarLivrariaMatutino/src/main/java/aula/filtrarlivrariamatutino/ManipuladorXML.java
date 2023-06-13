package aula.filtrarlivrariamatutino;


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
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;

public class ManipuladorXML {
    private Document doc;
    private String caminho;
    public ManipuladorXML(String caminho) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory fabrica=DocumentBuilderFactory.newDefaultInstance();
        DocumentBuilder construtor=fabrica.newDocumentBuilder();
        this.caminho=caminho;
        doc=construtor.parse(caminho);
    }
    public boolean deletar(String titulo) throws TransformerException
    {
        NodeList titulos=doc.getElementsByTagName("titulo");
        int tam=titulos.getLength();
        for(int i=0;i<tam;i++)
        {
            Node noTitulo=titulos.item(i);
            if(noTitulo.getTextContent().equals(titulo)) {
                Node livroParaRemover = noTitulo.getParentNode();
                livroParaRemover.getParentNode().removeChild(livroParaRemover);
                Serealizar();
                return true;
            }
        }
        return false;
    }
    public Element pegarLivroPeloNome(String titulo)
    {
        Element raiz=doc.getDocumentElement();
        NodeList livros=raiz.getElementsByTagName("livro");
        int tam=livros.getLength();
        for(int i=0;i<tam;i++)
        {
            Element livro=(Element) livros.item(i);
            //String valor=livro.getElementsByTagName("titulo").item(0).getFirstChild().getNodeValue();
            String valor=livro.getElementsByTagName("titulo").item(0).getTextContent();
            if(valor.equalsIgnoreCase(titulo))
                return livro;
        }
        return null;
    }
    public Element pegaLivroPorAno(int ano,String operador)
    {
        Element raiz=doc.getDocumentElement();
        NodeList livros=raiz.getElementsByTagName("livro");
        int tam=livros.getLength();
        for(int i=tam-1;i>=0;i--)
        {
            Element livro=(Element) livros.item(i);
            int anoDoLivro=Integer.parseInt(livro.getElementsByTagName("ano").item(0).getTextContent());
            switch (operador)
            {
                case "=":
                    if(anoDoLivro!=ano)
                        raiz.removeChild(livro);
                    break;
                case ">":
                    if(anoDoLivro<ano)
                        raiz.removeChild(livro);
                    break;
                case "<":
                    if(anoDoLivro>ano)
                        raiz.removeChild(livro);
                    break;
                default:
                    raiz.removeChild(livro);
            }
        }
        return raiz;
    }
    public String Serealizar(Node no) throws TransformerException {
        TransformerFactory fabrica=TransformerFactory.newInstance();
        Transformer tranformador= fabrica.newTransformer();
        DOMSource fonte=new DOMSource(no);
        StringWriter escritor=new StringWriter();
        StreamResult saida=new StreamResult(escritor);
        tranformador.transform(fonte,saida);
        return escritor.toString();
    }
    public void Serealizar()throws TransformerException
    {
        TransformerFactory fabrica=TransformerFactory.newInstance();
        Transformer tranformador= fabrica.newTransformer();
        DOMSource fonte=new DOMSource(doc);
        File arquivo=new File(caminho);
        StreamResult saida=new StreamResult(arquivo);
        tranformador.transform(fonte,saida);
    }
}
