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

@WebServlet("/deletar")
public class Deletar extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out= response.getWriter();
        response.setContentType("text/xml");
        String titulo=request.getParameter("titulo");
        String caminho=getServletContext().getRealPath("/WEB-INF/livraria.xml");
        if(titulo!=null&&titulo.length()>0) {
            try {
                ManipuladorXML manipulador = new ManipuladorXML(caminho);
                if(manipulador.deletar(titulo))
                    out.print("<mensagem>Deletado com sucesso.</mensagem>");
                else
                    out.print("<erro>Título não existe</erro>");
            } catch (ParserConfigurationException | SAXException | TransformerException | NumberFormatException e) {
                //response.setStatus(500);
                out.println("<erro>" + e + "</erro>");
            }
        }
        else
            out.println("<erro>Faltou o título</erro>");
    }
}
