package com.university.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.atomic.AtomicInteger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Experiment 10: Thread-Safe Concurrent Visitor Counter Using Servlet
 * High-Contrast Deep Gold/Amber Theme (#451a03, #f59e0b)
 * 
 * Technical Concurrency Breakdown:
 * --------------------------------
 * Servlet instances are SINGLETONS by default in Servlet containers (Tomcat).
 * A single Servlet instance handles multiple incoming client requests concurrently
 * across multiple JVM threads.
 * 
 * 1. UNSAFE COUNTER (Instance variable: private int unsafeCounter):
 *    - The operation `unsafeCounter++` is NOT atomic. It consists of 3 distinct bytecode steps:
 *      READ -> MODIFY -> WRITE.
 *    - Under concurrent request threads, race conditions occur where multiple threads
 *      read the same initial value simultaneously, causing lost updates.
 * 
 * 2. THREAD-SAFE COUNTER (AtomicInteger / synchronized):
 *    - `AtomicInteger safeCounter = new AtomicInteger(0)` uses hardware-level
 *      Compare-And-Swap (CAS) instructions to guarantee atomic increments (`incrementAndGet()`).
 *    - Synchronized blocks (`synchronized(lock) { ... }`) ensure exclusive access via intrinsic locks.
 * 
 * 3. LOCAL VARIABLES (Inside doGet):
 *    - Variables declared inside methods (e.g. `int localVar = 0`) are allocated on individual
 *      thread execution stacks and are inherently thread-safe.
 */
@WebServlet(name = "Exp10ConcurrencyServlet", urlPatterns = {"/Exp10ConcurrencyServlet"})
public class Exp10ConcurrencyServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    // 1. UNSAFE INSTANCE VARIABLE (Shared across all worker threads -> Race condition prone)
    private int unsafeCounter = 0;

    // 2. THREAD-SAFE ATOMIC COUNTER (Uses CAS lock-free atomic operations)
    private final AtomicInteger safeCounter = new AtomicInteger(0);

    // 3. SYNCHRONIZED COUNTER LOCK OBJECT
    private int synchronizedCounter = 0;
    private final Object lock = new Object();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // --- UNSAFE INCREMENT (Simulates race condition opportunity under concurrent threads) ---
        // Artificial delay to expand race condition window during high concurrency simulation
        int temp = unsafeCounter;
        try {
            Thread.sleep(2); // Small delay to force thread context switch
        } catch (InterruptedException ignored) {}
        unsafeCounter = temp + 1;

        // --- THREAD-SAFE ATOMIC INCREMENT ---
        int safeVal = safeCounter.incrementAndGet();

        // --- THREAD-SAFE SYNCHRONIZED INCREMENT ---
        int syncVal;
        synchronized (lock) {
            synchronizedCounter++;
            syncVal = synchronizedCounter;
        }

        // --- THREAD-LOCAL VARIABLE (Stack allocated -> Always thread-safe per request) ---
        long threadId = Thread.currentThread().getId();
        String threadName = Thread.currentThread().getName();

        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("  <meta charset='UTF-8'>");
            out.println("  <title>Exp 10 - Concurrency Diagnostics</title>");
            out.println("  <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap' rel='stylesheet'>");
            out.println("  <style>");
            out.println("    :root { --bg-dark: #230d02; --card-bg: #451a03; --accent-amber: #f59e0b; --accent-gold: #fbbf24; --text-bright: #fffbeb; }");
            out.println("    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }");
            out.println("    body { background: radial-gradient(circle at top, #451a03, #230d02 80%); min-height: 100vh; color: var(--text-bright); padding: 3rem 1.5rem; display: flex; flex-direction: column; align-items: center; }");
            out.println("    .container { width: 100%; max-width: 900px; background: rgba(69, 26, 3, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 24px; padding: 2.5rem; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5); }");
            out.println("    .title { text-align: center; font-size: 2rem; font-weight: 800; color: var(--accent-amber); margin-bottom: 2rem; }");
            out.println("    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem; }");
            out.println("    .card { background: rgba(35, 13, 2, 0.8); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 16px; padding: 1.5rem; text-align: center; }");
            out.println("    .card h3 { font-family: 'JetBrains Mono', monospace; font-size: 2.2rem; color: var(--accent-gold); margin: 0.5rem 0; }");
            out.println("    .card span { font-size: 0.8rem; color: #fde68a; font-weight: 600; text-transform: uppercase; }");
            out.println("    .info-box { background: #170801; border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--accent-amber); line-height: 1.7; }");
            out.println("    .btn { display: inline-block; background: var(--accent-amber); color: #230d02; padding: 0.8rem 1.6rem; border-radius: 10px; font-weight: 700; text-decoration: none; margin-top: 1.5rem; transition: all 0.3s ease; }");
            out.println("    .btn:hover { background: var(--accent-gold); box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }");
            out.println("  </style>");
            out.println("</head>");
            out.println("<body>");
            out.println("  <div class='container'>");
            out.println("    <div class='title'>⚡ Servlet Concurrency & Thread-Safety Audit</div>");
            out.println("    <div class='grid'>");
            out.println("      <div class='card'><span>Unsafe Counter</span><h3 style='color: #f43f5e;'>" + unsafeCounter + "</h3><small style='color:#fca5a5;'>Race Prone</small></div>");
            out.println("      <div class='card'><span>AtomicInteger</span><h3>" + safeVal + "</h3><small style='color:#34d399;'>CAS Lock-Free</small></div>");
            out.println("      <div class='card'><span>Synchronized</span><h3>" + syncVal + "</h3><small style='color:#38bdf8;'>Intrinsic Lock</small></div>");
            out.println("    </div>");
            out.println("    <div class='info-box'>");
            out.println("      > Current Thread Name : " + threadName + "<br>");
            out.println("      > Current Thread ID   : " + threadId + "<br>");
            out.println("      > Local Variable      : Thread-stack isolated (Always Thread-Safe)<br>");
            out.println("      > Container Model     : Singleton HttpServlet under Tomcat Worker Pool<br>");
            out.println("    </div>");
            out.println("    <div style='text-align:center;'>");
            out.println("      <a href='Exp10ConcurrencyServlet' class='btn'>🔄 Issue Next Request</a>");
            out.println("    </div>");
            out.println("  </div>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}
