package com.university.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Experiment 8: Online Student Result Processing Using Servlet
 * Academic Crimson Theme (#881337, #fb7185)
 * 
 * Deployment Annotation:
 * @WebServlet("/Exp8ResultServlet")
 */
@WebServlet(name = "Exp8ResultServlet", urlPatterns = {"/Exp8ResultServlet"})
public class Exp8ResultServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        String studentName = request.getParameter("studentName");
        String regNumber = request.getParameter("regNumber");

        String strM1 = request.getParameter("m1");
        String strM2 = request.getParameter("m2");
        String strM3 = request.getParameter("m3");
        String strM4 = request.getParameter("m4");
        String strM5 = request.getParameter("m5");

        boolean isValid = true;
        StringBuilder errorLog = new StringBuilder();

        double m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0;

        if (studentName == null || studentName.trim().isEmpty()) {
            isValid = false;
            errorLog.append("<li>Student Name is required.</li>");
        }
        if (regNumber == null || regNumber.trim().isEmpty()) {
            isValid = false;
            errorLog.append("<li>Register Number is required.</li>");
        }

        try {
            m1 = parseAndValidateMark(strM1, "Data Structures");
            m2 = parseAndValidateMark(strM2, "Web Technology");
            m3 = parseAndValidateMark(strM3, "Operating Systems");
            m4 = parseAndValidateMark(strM4, "Database Systems");
            m5 = parseAndValidateMark(strM5, "Software Engineering");
        } catch (IllegalArgumentException e) {
            isValid = false;
            errorLog.append("<li>").append(e.getMessage()).append("</li>");
        }

        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("  <meta charset='UTF-8'>");
            out.println("  <title>Exp 8 - Mark Sheet Report</title>");
            out.println("  <link href='https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' rel='stylesheet'>");
            out.println("  <style>");
            out.println("    :root { --bg-dark: #2a030e; --card-bg: rgba(136, 19, 55, 0.7); --accent-crimson: #fb7185; --text-bright: #fff1f2; --text-muted: #fecdd3; }");
            out.println("    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', sans-serif; }");
            out.println("    body { background: radial-gradient(circle at top left, #881337, #2a030e 80%); min-height: 100vh; color: var(--text-bright); padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; }");
            out.println("    .container { width: 100%; max-width: 850px; background: var(--card-bg); backdrop-filter: blur(16px); border: 1px solid rgba(251, 113, 133, 0.3); border-radius: 24px; padding: 2.5rem; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); }");
            out.println("    .report-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }");
            out.println("    .report-table th, .report-table td { padding: 0.85rem; text-align: left; border-bottom: 1px solid rgba(251, 113, 133, 0.2); }");
            out.println("    .report-table th { color: var(--accent-crimson); font-size: 0.85rem; text-transform: uppercase; }");
            out.println("    .badge-pass { background: #10b981; color: #000; font-weight: 800; padding: 0.4rem 1rem; border-radius: 9999px; }");
            out.println("    .badge-fail { background: #f43f5e; color: #fff; font-weight: 800; padding: 0.4rem 1rem; border-radius: 9999px; }");
            out.println("    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; background: rgba(0,0,0,0.4); padding: 1.25rem; border-radius: 16px; margin-top: 1.5rem; }");
            out.println("    .btn-back { display: inline-block; background: var(--accent-crimson); color: #2a030e; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; margin-top: 1.5rem; }");
            out.println("  </style>");
            out.println("</head>");
            out.println("<body>");
            out.println("  <div class='container'>");

            if (isValid) {
                double total = m1 + m2 + m3 + m4 + m5;
                double avg = total / 5.0;
                double highest = Math.max(m1, Math.max(m2, Math.max(m3, Math.max(m4, m5))));
                double lowest = Math.min(m1, Math.min(m2, Math.min(m3, Math.min(m4, m5))));

                boolean isPass = (m1 >= 40 && m2 >= 40 && m3 >= 40 && m4 >= 40 && m5 >= 40);

                String grade = "F";
                if (isPass) {
                    if (avg >= 85) grade = "Distinction (A+)";
                    else if (avg >= 75) grade = "First Class (A)";
                    else if (avg >= 60) grade = "Second Class (B)";
                    else if (avg >= 50) grade = "Third Class (C)";
                }

                out.println("    <div style='display:flex; justify-content:space-between; align-items:center;'>");
                out.println("      <div><h2>🎓 Official Academic Marksheet</h2><p style='color: var(--text-muted);'>" + sanitize(studentName) + " | Reg: " + sanitize(regNumber) + "</p></div>");
                out.println("      <span class='" + (isPass ? "badge-pass" : "badge-fail") + "'>" + (isPass ? "PASS" : "FAIL") + "</span>");
                out.println("    </div>");

                out.println("    <table class='report-table'>");
                out.println("      <thead><tr><th>Subject Name</th><th>Max Marks</th><th>Scored Marks</th><th>Status</th></tr></thead>");
                out.println("      <tbody>");
                renderSubjectRow(out, "Data Structures", m1);
                renderSubjectRow(out, "Web Technology", m2);
                renderSubjectRow(out, "Operating Systems", m3);
                renderSubjectRow(out, "Database Systems", m4);
                renderSubjectRow(out, "Software Engineering", m5);
                out.println("      </tbody>");
                out.println("    </table>");

                out.println("    <div class='summary-grid'>");
                out.println("      <div><span style='font-size:0.75rem; color: var(--text-muted);'>TOTAL SCORE</span><br><strong>" + total + " / 500</strong></div>");
                out.println("      <div><span style='font-size:0.75rem; color: var(--text-muted);'>AVERAGE</span><br><strong style='color: var(--accent-crimson);'>" + String.format("%.2f", avg) + "%</strong></div>");
                out.println("      <div><span style='font-size:0.75rem; color: var(--text-muted);'>HIGH / LOW</span><br><strong>" + highest + " / " + lowest + "</strong></div>");
                out.println("      <div><span style='font-size:0.75rem; color: var(--text-muted);'>GRADE</span><br><strong style='color: #34d399;'>" + grade + "</strong></div>");
                out.println("    </div>");

                out.println("    <div style='text-align:center;'><a href='exp8_results.html' class='btn-back'>← Calculate Another Result</a></div>");
            } else {
                out.println("    <h2 style='color:#f43f5e;'>⚠️ Validation Errors Found:</h2>");
                out.println("    <ul style='margin:1rem 0 1.5rem 1.5rem; color:#fca5a5;'>" + errorLog.toString() + "</ul>");
                out.println("    <div style='text-align:center;'><a href='exp8_results.html' class='btn-back'>← Return to Form</a></div>");
            }

            out.println("  </div>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    private double parseAndValidateMark(String valStr, String subjectName) throws IllegalArgumentException {
        if (valStr == null || valStr.trim().isEmpty()) {
            throw new IllegalArgumentException("Mark for " + subjectName + " is required.");
        }
        try {
            double mark = Double.parseDouble(valStr.trim());
            if (mark < 0 || mark > 100) {
                throw new IllegalArgumentException("Mark for " + subjectName + " (" + mark + ") must be between 0 and 100.");
            }
            return mark;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid numeric format for " + subjectName + ": \"" + valStr + "\"");
        }
    }

    private void renderSubjectRow(PrintWriter out, String subject, double mark) {
        out.println("<tr>");
        out.println("  <td>" + subject + "</td>");
        out.println("  <td>100</td>");
        out.println("  <td><strong>" + mark + "</strong></td>");
        out.println("  <td style='color:" + (mark >= 40 ? "#34d399" : "#f43f5e") + "; font-weight:700;'>" + (mark >= 40 ? "Pass" : "Fail") + "</td>");
        out.println("</tr>");
    }

    private String sanitize(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
}
