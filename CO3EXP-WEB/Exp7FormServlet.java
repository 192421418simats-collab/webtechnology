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
 * Experiment 7: Student Registration Form Processing Using Servlet
 * Sleek Clean Teal/Cyan Theme (#134e4a, #2dd4bf)
 * 
 * Deployment Annotation:
 * @WebServlet("/Exp7FormServlet")
 */
@WebServlet(name = "Exp7FormServlet", urlPatterns = {"/Exp7FormServlet"})
public class Exp7FormServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Set Encoding & Response Content Type
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        // 2. Extract POST Parameters via request.getParameter()
        String studentName = request.getParameter("studentName");
        String registerNo = request.getParameter("registerNo");
        String email = request.getParameter("email");
        String department = request.getParameter("department");
        String semester = request.getParameter("semester");

        // 3. Server-side Validation check
        boolean isValid = true;
        StringBuilder errorMsg = new StringBuilder();

        if (studentName == null || studentName.trim().isEmpty()) {
            isValid = false;
            errorMsg.append("<li>Student Name is required.</li>");
        }
        if (registerNo == null || registerNo.trim().isEmpty()) {
            isValid = false;
            errorMsg.append("<li>Register Number is required.</li>");
        }
        if (email == null || email.trim().isEmpty()) {
            isValid = false;
            errorMsg.append("<li>Institutional Email is required.</li>");
        }
        if (department == null || department.trim().isEmpty()) {
            isValid = false;
            errorMsg.append("<li>Department selection is required.</li>");
        }
        if (semester == null || semester.trim().isEmpty()) {
            isValid = false;
            errorMsg.append("<li>Semester selection is required.</li>");
        }

        // 4. Render Dynamic HTML Output Card
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("  <meta charset='UTF-8'>");
            out.println("  <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            out.println("  <title>Exp 7 - Form Servlet Response</title>");
            out.println("  <link rel='preconnect' href='https://fonts.googleapis.com'>");
            out.println("  <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
            out.println("  <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' rel='stylesheet'>");
            out.println("  <style>");
            out.println("    :root {");
            out.println("      --bg-dark: #042f2e;");
            out.println("      --card-bg: rgba(19, 78, 74, 0.65);");
            out.println("      --accent-teal: #2dd4bf;");
            out.println("      --accent-cyan: #22d3ee;");
            out.println("      --text-bright: #f0fdfa;");
            out.println("      --text-muted: #99f6e4;");
            out.println("      --danger: #f43f5e;");
            out.println("    }");
            out.println("    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }");
            out.println("    body { background: radial-gradient(circle at top right, #134e4a, #042f2e 75%); min-height: 100vh; color: var(--text-bright); padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; }");
            out.println("    .container { width: 100%; max-width: 750px; background: var(--card-bg); backdrop-filter: blur(16px); border: 1px solid rgba(45, 212, 191, 0.3); border-radius: 24px; padding: 2.5rem; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4); }");
            out.println("    .header { text-align: center; margin-bottom: 2rem; }");
            out.println("    .header h1 { font-size: 2rem; color: var(--accent-teal); margin-bottom: 0.5rem; }");
            out.println("    .summary-card { background: rgba(4, 47, 46, 0.8); border: 1px solid rgba(45, 212, 191, 0.25); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }");
            out.println("    .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }");
            out.println("    .data-item label { display: block; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }");
            out.println("    .data-item span { font-size: 1.05rem; font-weight: 700; color: #ffffff; }");
            out.println("    .reg-code { font-family: 'JetBrains Mono', monospace; color: var(--accent-teal) !important; }");
            out.println("    .err-box { background: rgba(244, 63, 94, 0.15); border: 1px solid var(--danger); color: #fca5a5; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; }");
            out.println("    .err-box h3 { color: var(--danger); margin-bottom: 0.5rem; }");
            out.println("    .err-box ul { margin-left: 1.25rem; }");
            out.println("    .btn-back { display: inline-block; background: var(--accent-teal); color: #042f2e; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; transition: all 0.3s ease; }");
            out.println("    .btn-back:hover { background: var(--accent-cyan); }");
            out.println("  </style>");
            out.println("</head>");
            out.println("<body>");
            out.println("  <div class='container'>");

            if (isValid) {
                out.println("    <div class='header'>");
                out.println("      <h1>✅ Registration Successfully Processed</h1>");
                out.println("      <p style='color: var(--text-muted);'>Dynamic Response generated by Exp7FormServlet via doPost()</p>");
                out.println("    </div>");
                out.println("    <div class='summary-card'>");
                out.println("      <div class='data-grid'>");
                out.println("        <div class='data-item'>");
                out.println("          <label>Student Full Name</label>");
                out.println("          <span>" + sanitize(studentName) + "</span>");
                out.println("        </div>");
                out.println("        <div class='data-item'>");
                out.println("          <label>Register Number</label>");
                out.println("          <span class='reg-code'>" + sanitize(registerNo) + "</span>");
                out.println("        </div>");
                out.println("        <div class='data-item'>");
                out.println("          <label>Email Address</label>");
                out.println("          <span>" + sanitize(email) + "</span>");
                out.println("        </div>");
                out.println("        <div class='data-item'>");
                out.println("          <label>Department</label>");
                out.println("          <span>" + sanitize(department) + "</span>");
                out.println("        </div>");
                out.println("        <div class='data-item' style='grid-column: 1 / -1;'>");
                out.println("          <label>Current Semester</label>");
                out.println("          <span>" + sanitize(semester) + "</span>");
                out.println("        </div>");
                out.println("      </div>");
                out.println("    </div>");
                out.println("    <div style='text-align: center;'>");
                out.println("      <a href='exp7_form.html' class='btn-back'>← Register Another Student</a>");
                out.println("    </div>");
            } else {
                out.println("    <div class='header'>");
                out.println("      <h1 style='color: var(--danger);'>⚠️ Form Processing Error</h1>");
                out.println("    </div>");
                out.println("    <div class='err-box'>");
                out.println("      <h3>Validation Failed:</h3>");
                out.println("      <ul>" + errorMsg.toString() + "</ul>");
                out.println("    </div>");
                out.println("    <div style='text-align: center;'>");
                out.println("      <a href='exp7_form.html' class='btn-back'>← Return to Form</a>");
                out.println("    </div>");
            }

            out.println("  </div>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    private String sanitize(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#x27;");
    }
}
