package com.university.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Experiment 9: Servlet Lifecycle Demonstration
 * Cyber Terminal Green Theme (#022c22, #4ade80)
 * 
 * Lifecycle Phases Overridden:
 * 1. Constructor: Instantiates the Servlet object in memory.
 * 2. init(ServletConfig): One-time initialization phase when Servlet is loaded.
 * 3. service() / doGet(): Executed for every client request HTTP thread.
 * 4. destroy(): Called when container unloads/reloads the Servlet.
 */
@WebServlet(name = "Exp9LifecycleServlet", urlPatterns = {"/Exp9LifecycleServlet"}, loadOnStartup = 1)
public class Exp9LifecycleServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    // Static Lifecycle Counters across container lifespan
    private static int constructorCount = 0;
    private static int initCount = 0;
    private static int requestCount = 0;
    private static int destroyCount = 0;

    private String initTimestamp;

    // 1. Instantiation Phase (Constructor)
    public Exp9LifecycleServlet() {
        super();
        constructorCount++;
        System.out.println("[LIFECYCLE-EVENT] 1. Constructor Invoked | Total Constructor Hits: " + constructorCount);
    }

    // 2. Initialization Phase (init)
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        initCount++;
        initTimestamp = new Date().toString();
        System.out.println("[LIFECYCLE-EVENT] 2. init(ServletConfig) Invoked | Total Init Hits: " + initCount);
    }

    // 3. Request Handling Phase (doGet)
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        requestCount++;
        System.out.println("[LIFECYCLE-EVENT] 3. doGet() Executed | Request Hit #" + requestCount);

        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("  <meta charset='UTF-8'>");
            out.println("  <title>Exp 9 - Servlet Lifecycle Monitor</title>");
            out.println("  <link href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap' rel='stylesheet'>");
            out.println("  <style>");
            out.println("    :root { --bg-dark: #011914; --card-bg: #022c22; --accent-green: #4ade80; --border-green: rgba(74, 222, 128, 0.3); --text-light: #f0fdf4; }");
            out.println("    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'JetBrains Mono', monospace; }");
            out.println("    body { background: #011914; color: var(--text-light); padding: 2.5rem 1.5rem; display: flex; flex-direction: column; align-items: center; }");
            out.println("    .terminal { width: 100%; max-width: 900px; background: var(--card-bg); border: 1px solid var(--border-green); border-radius: 20px; padding: 2rem; box-shadow: 0 0 40px rgba(74, 222, 128, 0.15); }");
            out.println("    .title { font-size: 1.5rem; color: var(--accent-green); font-weight: 700; margin-bottom: 1.5rem; text-align: center; border-bottom: 1px solid var(--border-green); padding-bottom: 1rem; }");
            out.println("    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }");
            out.println("    .metric-card { background: #011914; border: 1px solid var(--border-green); border-radius: 12px; padding: 1.25rem; text-align: center; }");
            out.println("    .metric-card h3 { font-size: 2rem; color: var(--accent-green); margin-top: 0.5rem; }");
            out.println("    .metric-card span { font-size: 0.75rem; color: #a7f3d0; text-transform: uppercase; }");
            out.println("    .log-box { background: #000; border: 1px solid var(--border-green); padding: 1.25rem; border-radius: 12px; font-size: 0.85rem; color: var(--accent-green); line-height: 1.8; }");
            out.println("    .btn-refresh { display: inline-block; background: var(--accent-green); color: #011914; padding: 0.75rem 1.5rem; border-radius: 10px; font-weight: 700; text-decoration: none; margin-top: 1.5rem; }");
            out.println("  </style>");
            out.println("</head>");
            out.println("<body>");
            out.println("  <div class='terminal'>");
            out.println("    <div class='title'>⚡ SERVLET LIFECYCLE MONITOR</div>");
            out.println("    <div class='grid'>");
            out.println("      <div class='metric-card'><span>Constructor</span><h3>" + constructorCount + "</h3></div>");
            out.println("      <div class='metric-card'><span>init() Hits</span><h3>" + initCount + "</h3></div>");
            out.println("      <div class='metric-card'><span>service() Hits</span><h3>" + requestCount + "</h3></div>");
            out.println("      <div class='metric-card'><span>destroy() Hits</span><h3>" + destroyCount + "</h3></div>");
            out.println("    </div>");
            out.println("    <div class='log-box'>");
            out.println("      > Container Status: ACTIVE<br>");
            out.println("      > Initialized At: " + initTimestamp + "<br>");
            out.println("      > Current Request Hit: #" + requestCount + "<br>");
            out.println("      > Thread: " + Thread.currentThread().getName() + "<br>");
            out.println("    </div>");
            out.println("    <div style='text-align: center;'>");
            out.println("      <a href='Exp9LifecycleServlet' class='btn-refresh'>🔄 Trigger Next Request (doGet)</a>");
            out.println("    </div>");
            out.println("  </div>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // 4. Destruction Phase (destroy)
    @Override
    public void destroy() {
        destroyCount++;
        System.out.println("[LIFECYCLE-EVENT] 4. destroy() Invoked | Total Destroy Hits: " + destroyCount);
        super.destroy();
    }
}
