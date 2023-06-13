package aula.correcaomatutino;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.IOException;

@WebServlet("/cadastrar")
public class Cadastrar extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String dadosXML=request.getParameter("dados");
        String caminho= getServletContext().getRealPath("/WEB-INF/alunos.xml");
        ManipuladorXML manipulador= null;
        try {
            manipulador = new ManipuladorXML(caminho);
            manipulador.cadastrar(dadosXML);
            response.getWriter().print("<mensagem>Cadastrado com Sucesso.</mensagem>");
        } catch (ParserConfigurationException |SAXException |TransformerException e) {
            response.getWriter().print("<mensagem>Erro ao tentar Cadastrar</mensagem>");
        }
    }
}
