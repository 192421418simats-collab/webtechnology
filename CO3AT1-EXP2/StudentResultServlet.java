import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/student-result")
public class StudentResultServlet extends HttpServlet {
    private static final double PASS_MARK = 40.0;
    private static final String PAGE_STYLES = """
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
            :root { --ink: #202040; --muted: #666687; --accent: #ff5f6d; --accent-dark: #e74659; --glass: rgba(255, 255, 255, 0.78); --line: rgba(255, 255, 255, 0.6); }
            * { box-sizing: border-box; }
            body { align-items: center; background: linear-gradient(135deg, #ff9966 0%, #ff5e62 45%, #6a5af9 100%); color: var(--ink); display: flex; font-family: 'Poppins', sans-serif; justify-content: center; margin: 0; min-height: 100vh; overflow-x: hidden; padding: 2rem 1rem; position: relative; }
            body::before, body::after { border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 50%; content: ''; position: fixed; z-index: -1; }
            body::before { height: 19rem; right: -6rem; top: -7rem; width: 19rem; }
            body::after { bottom: -9rem; height: 25rem; left: -10rem; width: 25rem; }
            .card { animation: rise-in 0.7s ease-out both; backdrop-filter: blur(18px); background: var(--glass); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 24px 60px rgba(62, 29, 83, 0.25); max-width: 38rem; padding: clamp(1.5rem, 5vw, 3rem); width: 100%; }
            .eyebrow { color: var(--accent-dark); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; margin: 0 0 0.5rem; text-transform: uppercase; }
            h1 { font-size: clamp(1.8rem, 5vw, 2.5rem); line-height: 1.15; margin: 0 0 0.5rem; }
            .intro { color: var(--muted); margin: 0 0 1.75rem; }
            .result-grid { display: grid; gap: 0.75rem; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 1.5rem; }
            .result-item { background: rgba(255, 255, 255, 0.52); border: 1px solid rgba(96, 82, 155, 0.12); border-radius: 12px; padding: 1rem; }
            .result-item strong { color: var(--muted); display: block; font-size: 0.75rem; margin-bottom: 0.25rem; text-transform: uppercase; }
            .result-item span { font-size: 1.25rem; font-weight: 700; }
            .status-pass { color: #15803d; }
            .status-fail { color: #c2410c; }
            .error { background: rgba(255, 235, 238, 0.8); border: 1px solid #ffb4bd; border-radius: 12px; color: #a61b2b; margin: 1.5rem 0; padding: 1rem; }
            a { color: var(--accent-dark); font-weight: 600; }
            footer { border-top: 1px solid rgba(96, 82, 155, 0.15); color: var(--muted); font-size: 0.72rem; margin-top: 2rem; padding-top: 1rem; text-align: center; }
            @keyframes rise-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
            @media (max-width: 30em) { body { padding: 1rem; } .card { border-radius: 18px; } .result-grid { grid-template-columns: 1fr; } }
            """;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        String name = request.getParameter("name");
        String registerNumber = request.getParameter("registerNumber");
        String subject1Value = request.getParameter("subject1");
        String subject2Value = request.getParameter("subject2");
        String subject3Value = request.getParameter("subject3");

        if (isBlank(name) || isBlank(registerNumber)
                || isBlank(subject1Value) || isBlank(subject2Value) || isBlank(subject3Value)) {
            sendError(response, "All fields are required.");
            return;
        }

        try (PrintWriter out = response.getWriter()) {
            double subject1 = Double.parseDouble(subject1Value.trim());
            double subject2 = Double.parseDouble(subject2Value.trim());
            double subject3 = Double.parseDouble(subject3Value.trim());

            if (!isValidMark(subject1) || !isValidMark(subject2) || !isValidMark(subject3)) {
                sendError(response, "Each mark must be strictly greater than 0 and less than 100.");
                return;
            }

            double total = subject1 + subject2 + subject3;
            double average = total / 3;
            double highestMark = Math.max(subject1, Math.max(subject2, subject3));
            boolean passed = subject1 >= PASS_MARK
                    && subject2 >= PASS_MARK
                    && subject3 >= PASS_MARK;

            printHeader(out, "Student Result");
            out.println("<p class=\"eyebrow\">Academic Record</p><h1>Student Result</h1>");
            out.println("<p class=\"intro\"><strong>" + escapeHtml(name.trim()) + "</strong> | Register No: " + escapeHtml(registerNumber.trim()) + "</p>");
            out.println("<div class=\"result-grid\">");
            printResult(out, "Total", String.format("%.2f", total), "");
            printResult(out, "Average", String.format("%.2f", average), "");
            printResult(out, "Highest Mark", String.format("%.2f", highestMark), "");
            printResult(out, "Status", passed ? "Pass" : "Fail", passed ? "status-pass" : "status-fail");
            out.println("</div><p><a href=\"index.html\">Process another result</a></p>");
            printFooter(out);
            out.println("</main></body></html>");
        } catch (NumberFormatException exception) {
            sendError(response, "Marks must be valid numbers.");
        }
    }

    private static boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private static boolean isValidMark(double mark) {
        return mark > 0 && mark < 100;
    }

    private static void sendError(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        try (PrintWriter out = response.getWriter()) {
            printHeader(out, "Input Error");
            out.println("<p class=\"eyebrow\">Please check your entry</p><h1>Input Error</h1>");
            out.println("<p class=\"error\">" + escapeHtml(message) + "</p>");
            out.println("<p><a href=\"index.html\">Return to form</a></p>");
            printFooter(out);
            out.println("</main></body></html>");
        }
    }

    private static void printHeader(PrintWriter out, String title) {
        out.println("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\">");
        out.println("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>"
                + escapeHtml(title) + "</title><style>");
        out.print(PAGE_STYLES);
        out.println("</style></head><body><main class=\"card\">");
    }

    private static void printResult(PrintWriter out, String label, String value, String valueClass) {
        out.println("<div class=\"result-item\"><strong>" + label + "</strong><span class=\""
                + valueClass + "\">" + value + "</span></div>");
    }

    private static void printFooter(PrintWriter out) {
        out.println("<footer>Assignment by ALUKA PARDHU (192421418)</footer>");
    }

    private static String escapeHtml(String value) {
        return value.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
