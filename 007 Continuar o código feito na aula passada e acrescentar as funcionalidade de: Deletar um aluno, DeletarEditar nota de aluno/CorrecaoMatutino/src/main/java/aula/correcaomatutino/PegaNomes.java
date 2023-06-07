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

@WebServlet("/pegaNomes")
public class PegaNomes extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String caminho= getServletContext().getRealPath("/WEB-INF/alunos.xml");
        response.setCharacterEncoding("utf-8");
        ManipuladorXML manipulador= null;
        try {
            manipulador = new ManipuladorXML(caminho);

            response.getWriter().print(manipulador.pegaNomes());
        } catch (ParserConfigurationException |SAXException  e) {
            response.getWriter().print("<mensagem>Erro ao tentar Cadastrar</mensagem>");
        }
    }
}
