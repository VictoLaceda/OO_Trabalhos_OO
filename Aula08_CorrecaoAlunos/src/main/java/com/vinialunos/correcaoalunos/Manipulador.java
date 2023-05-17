package com.vinialunos.correcaoalunos;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

public class Manipulador {
    Document doc;


    protected Manipulador(String documento) throws ParserConfigurationException, IOException,  {
        DocumentBuilder fab = DocumentBuilderFactory.newDefaultInstance().newDocumentBuilder();
        doc = fab.parse(documento);
    }



    protected Document fazerParse(String dadosXML) throws ParserConfigurationException, IOException, SAXException {
        DocumentBuilderFactory fabrica=DocumentBuilderFactory.newInstance();
        DocumentBuilder construtor=fabrica.newDocumentBuilder();
        ByteArrayInputStream fluxo=new ByteArrayInputStream(dadosXML.getBytes());
        return construtor.parse(fluxo);
    }



    public static void main(String[] args) {
        Document doc2 = fazerParse(dadosXML);
        // cria uma copia. o doc
        Node copia = doc.importNode(doc2.getDocumentElement(), true);
        // coloca o doc 2 dentro do doc principal
        doc.getDocumentElement().appendChild(copia);
    }
}
