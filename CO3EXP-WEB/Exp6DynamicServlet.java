package com.university.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Experiment 6: Basic Java Servlet for Dynamic Content Generation
 * Corporate Blue Enterprise Theme (#1e3a8a, #60a5fa)
 * 
 * Deployment Configuration:
 * @WebServlet("/Exp6DynamicServlet")
 * Or configured in WEB-INF/web.xml
 */
@WebServlet(name = "Exp6DynamicServlet", urlPatterns = {"/Exp6DynamicServlet"})
public class Exp6DynamicServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Set Response Content Type to HTML with UTF-8 encoding
        response.setContentType("text/html;charset=UTF-8");

        // 2. Obtain PrintWriter object from HttpServletResponse
        try (PrintWriter out = response.getWriter()) {
            
            // Extract query parameter if provided, otherwise fallback to defaults
            String studentName = request.getParameter("name");
            if (studentName == null || studentName.trim().isEmpty()) {
                studentName = "Aluka Pardhu";
            }

            String courseName = request.getParameter("course");
            if (courseName == null || courseName.trim().isEmpty()) {
                courseName = "Computer Science & Engineering - Saveetha University";
            }

            // Generate live server timestamp
            String currentTimestamp = new Date().toString();

            // 3. Render HTML Response Document with Corporate Blue Enterprise Theme
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("  <meta charset='UTF-8'>");
            out.println("  <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            out.println("  <title>Exp 6 - Dynamic Servlet Response</title>");
            out.println("  <link rel='preconnect' href='https://fonts.googleapis.com'>");
            out.println("  <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
            out.println("  <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' rel='stylesheet'>");
            out.println("  <style>");
            out.println("    :root {");
            out.println("      --bg-dark: #0f172a;");
            out.println("      --card-bg: #1e3a8a;");
            out.println("      --accent-blue: #60a5fa;");
            out.println("      --accent-cyan: #38bdf8;");
            out.println("      --text-main: #f8fafc;");
            out.println("      --text-muted: #93c5fd;");
            out.println("    }");
            out.println("    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }");
            out.println("    body { background: radial-gradient(circle at top, #1e3a8a, #0f172a 80%); min-height: 100vh; color: var(--text-main); padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; }");
            out.println("    .container { width: 100%; max-width: 800px; background: rgba(30, 58, 138, 0.5); backdrop-filter: blur(16px); border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 24px; padding: 3rem; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); text-align: center; }");
            out.println("    .banner { background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 1.25rem 2rem; border-radius: 16px; margin-bottom: 2rem; border: 1px solid rgba(96, 165, 250, 0.4); }");
            out.println("    .banner h1 { font-size: 1.8rem; font-weight: 800; color: #ffffff; letter-spacing: -0.01em; }");
            out.println("    .banner p { font-size: 0.9rem; color: #bfdbfe; margin-top: 0.25rem; }");
            out.println("    .info-card { background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(96, 165, 250, 0.2); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; text-align: left; }");
            out.println("    .info-row { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid rgba(96, 165, 250, 0.15); }");
            out.println("    .info-row:last-child { border-bottom: none; }");
            out.println("    .label { color: var(--text-muted); font-size: 0.9rem; font-weight: 500; }");
            out.println("    .value { font-weight: 700; color: #ffffff; font-size: 1rem; }");
            out.println("    .timestamp-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(96, 165, 250, 0.15); border: 1px solid var(--accent-blue); padding: 0.6rem 1.25rem; border-radius: 9999px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--accent-blue); }");
            out.println("    .footer-text { margin-top: 2rem; font-size: 0.8rem; color: var(--text-muted); }");
            out.println("  </style>");
            out.println("</head>");
            out.println("<body>");
            out.println("  <div class='container'>");
            out.println("    <div class='banner'>");
            out.println("      <h1>🎓 Dynamic Java Servlet Response</h1>");
            out.println("      <p>Generated in real-time via HttpServlet.doGet()</p>");
            out.println("    </div>");
            out.println("    <div class='info-card'>");
            out.println("      <div class='info-row'>");
            out.println("        <span class='label'>Student Full Name</span>");
            out.println("        <span class='value'>" + studentName + "</span>");
            out.println("      </div>");
            out.println("      <div class='info-row'>");
            out.println("        <span class='label'>Enrolled Course</span>");
            out.println("        <span class='value'>" + courseName + "</span>");
            out.println("      </div>");
            out.println("      <div class='info-row'>");
            out.println("        <span class='label'>Servlet Engine</span>");
            out.println("        <span class='value'>Apache Tomcat HttpServlet / 4.0</span>");
            out.println("      </div>");
            out.println("    </div>");
            out.println("    <div class='timestamp-badge'>");
            out.println("      <span>⏱️ Server Time:</span>");
            out.println("      <span>" + currentTimestamp + "</span>");
            out.println("    </div>");
            out.println("    <div class='footer-text'>Exp 6: Basic Java Servlet for Dynamic Content Generation</div>");
            out.println("  </div>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}
