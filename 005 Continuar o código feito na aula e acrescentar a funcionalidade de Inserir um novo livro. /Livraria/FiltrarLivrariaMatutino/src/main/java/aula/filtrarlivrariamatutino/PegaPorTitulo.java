package aula.filtrarlivrariamatutino;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/pegaportitulo")
public class PegaPorTitulo extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out= response.getWriter();
        response.setContentType("text/xml");
        String caminho=getServletContext().getRealPath("/WEB-INF/livraria.xml");
        try {
            ManipuladorXML manipulador=new ManipuladorXML(caminho);
            Element livro=manipulador.pegarLivroPeloNome(request.getParameter("titulo"));
            if(livro==null)
                //throw new SAXException("Livro nulo");
                out.print("<livro></livro>");
            else
                out.println(manipulador.Serealizar(livro));
        } catch (ParserConfigurationException | SAXException | TransformerException e) {
            //response.setStatus(500);
            out.println("<erro>"+e+"</erro>");
        }

    }
}
