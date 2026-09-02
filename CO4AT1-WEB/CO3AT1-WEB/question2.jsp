<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.DecimalFormat" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saveetha University - Question 2: Student Result Processing</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0f172a;
            --card-bg: rgba(30, 41, 59, 0.75);
            --card-border: rgba(255, 255, 255, 0.12);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --primary: #8b5cf6;
            --primary-hover: #7c3aed;
            --pass-color: #10b981;
            --fail-color: #ef4444;
            --warning: #f59e0b;
            --radius-lg: 16px;
            --radius-md: 10px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            background-image: 
                radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
                radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%);
            background-attachment: fixed;
            color: var(--text-main);
            min-height: 100vh;
            padding: 2.5rem 1rem;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 2rem;
        }

        header h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 2.3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #38bdf8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
        }

        header p {
            color: var(--text-muted);
            font-size: 1.05rem;
        }

        .badge-exp {
            display: inline-block;
            background: rgba(139, 92, 246, 0.15);
            color: #c4b5fd;
            border: 1px solid rgba(139, 92, 246, 0.3);
            padding: 0.35rem 1rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }

        .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--card-border);
            border-radius: var(--radius-lg);
            padding: 2.2rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            animation: fadeIn 0.4s ease-out;
        }

        .card-title {
            font-family: 'Outfit', sans-serif;
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .alert-error {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #fca5a5;
            padding: 1rem 1.25rem;
            border-radius: var(--radius-md);
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
        }

        .form-group-full {
            grid-column: 1 / -1;
        }

        @media (max-width: 600px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
        }

        .form-group {
            margin-bottom: 0.5rem;
        }

        .form-group label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: #cbd5e1;
            margin-bottom: 0.4rem;
        }

        .input-control {
            width: 100%;
            padding: 0.85rem 1rem;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: var(--radius-md);
            color: #fff;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.25s ease;
        }

        .input-control:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25);
            background: rgba(15, 23, 42, 0.85);
        }

        .btn-submit {
            width: 100%;
            padding: 1rem;
            margin-top: 1.5rem;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
            color: #fff;
            border: none;
            border-radius: var(--radius-md);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.4);
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 30px -5px rgba(139, 92, 246, 0.6);
        }

        .result-card {
            border-top: 4px solid var(--primary);
        }

        .result-card.passed {
            border-top-color: var(--pass-color);
        }

        .result-card.failed {
            border-top-color: var(--fail-color);
        }

        .status-banner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.5rem;
        }

        .status-badge {
            padding: 0.5rem 1.25rem;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .status-badge.pass {
            background: rgba(16, 185, 129, 0.2);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.4);
        }

        .status-badge.fail {
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.4);
        }

        .student-profile-header h2 {
            font-size: 1.3rem;
            font-weight: 700;
            color: #fff;
        }

        .student-profile-header p {
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .marks-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
        }

        .marks-table th, .marks-table td {
            padding: 1rem 1.25rem;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .marks-table th {
            background: rgba(15, 23, 42, 0.8);
            color: #94a3b8;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .marks-table td {
            font-size: 0.95rem;
            color: #e2e8f0;
        }

        .progress-bar-container {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
            margin-top: 0.4rem;
        }

        .progress-bar-fill {
            height: 100%;
            border-radius: 10px;
            transition: width 0.6s ease;
        }

        .fill-pass {
            background: linear-gradient(90deg, #10b981, #34d399);
        }

        .fill-fail {
            background: linear-gradient(90deg, #ef4444, #f87171);
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        @media (max-width: 600px) {
            .summary-grid {
                grid-template-columns: 1fr;
            }
        }

        .summary-box {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 1.25rem;
            text-align: center;
        }

        .summary-box span {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 0.4rem;
        }

        .summary-box h3 {
            font-size: 1.4rem;
            font-weight: 700;
            color: #fff;
        }

        .btn-back {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.9rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #fff;
            border-radius: var(--radius-md);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.25s ease;
        }

        .btn-back:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <span class="badge-exp">Saveetha University • Question 02</span>
        <h1>Server-Based Student Result Processing</h1>
        <p>JSP Server-Side Result Evaluation • Saveetha University</p>
    </header>

<%
    boolean isPost = "POST".equalsIgnoreCase(request.getMethod());
    
    String studentName = "";
    String registerNo = "";
    String sub1Str = "";
    String sub2Str = "";
    String sub3Str = "";
    
    double mark1 = 0.0, mark2 = 0.0, mark3 = 0.0;
    double totalMarks = 0.0;
    double averageMarks = 0.0;
    boolean isPass = false;
    String resultGrade = "";
    String errorMessage = null;

    if (isPost) {
        studentName = request.getParameter("studentName");
        registerNo = request.getParameter("registerNo");
        sub1Str = request.getParameter("subject1");
        sub2Str = request.getParameter("subject2");
        sub3Str = request.getParameter("subject3");

        if (studentName == null || studentName.trim().isEmpty() ||
            registerNo == null || registerNo.trim().isEmpty() ||
            sub1Str == null || sub1Str.trim().isEmpty() ||
            sub2Str == null || sub2Str.trim().isEmpty() ||
            sub3Str == null || sub3Str.trim().isEmpty()) {
            
            errorMessage = "All form fields are mandatory. Please fill in complete student and subject details.";
        } else {
            try {
                mark1 = Double.parseDouble(sub1Str.trim());
                mark2 = Double.parseDouble(sub2Str.trim());
                mark3 = Double.parseDouble(sub3Str.trim());

                if (mark1 < 0 || mark1 > 100 || mark2 < 0 || mark2 > 100 || mark3 < 0 || mark3 > 100) {
                    errorMessage = "Invalid Marks! Marks for all subjects must be strictly between 0 and 100.";
                } else {
                    totalMarks = mark1 + mark2 + mark3;
                    averageMarks = totalMarks / 3.0;
                    isPass = (mark1 >= 40.0 && mark2 >= 40.0 && mark3 >= 40.0);

                    if (!isPass) {
                        resultGrade = "Reappear (Fail)";
                    } else if (averageMarks >= 75.0) {
                        resultGrade = "First Class with Distinction";
                    } else if (averageMarks >= 60.0) {
                        resultGrade = "First Class";
                    } else if (averageMarks >= 50.0) {
                        resultGrade = "Second Class";
                    } else {
                        resultGrade = "Third Class (Pass)";
                    }
                }
            } catch (NumberFormatException e) {
                errorMessage = "Numeric Error! Please enter valid numeric values for subject marks.";
            }
        }
    }
%>

<% if (isPost && errorMessage == null) { 
    DecimalFormat df = new DecimalFormat("0.00");
%>
    <!-- SERVER PROCESSED RESULT CARD (POST STATE) -->
    <section class="glass-card result-card <%= isPass ? "passed" : "failed" %>">
        <div class="card-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Saveetha University - Processed Student Marksheet
        </div>

        <div class="status-banner">
            <div class="student-profile-header">
                <h2><%= studentName %></h2>
                <p>Register Number: <strong><%= registerNo.toUpperCase() %></strong></p>
            </div>
            <div class="status-badge <%= isPass ? "pass" : "fail" %>">
                <%= isPass ? "PASSED" : "FAILED / REAPPEAR" %>
            </div>
        </div>

        <table class="marks-table">
            <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Max Marks</th>
                    <th>Marks Obtained</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Subject 1 (Web Technologies)</td>
                    <td>100</td>
                    <td><strong><%= df.format(mark1) %></strong></td>
                    <td>
                        <span style="color: <%= mark1 >= 40 ? "#34d399" : "#f87171" %>; font-weight:600;">
                            <%= mark1 >= 40 ? "Pass" : "Fail" %>
                        </span>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill <%= mark1 >= 40 ? "fill-pass" : "fill-fail" %>" style="width: <%= mark1 %>%;"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Subject 2 (Data Structures & Algos)</td>
                    <td>100</td>
                    <td><strong><%= df.format(mark2) %></strong></td>
                    <td>
                        <span style="color: <%= mark2 >= 40 ? "#34d399" : "#f87171" %>; font-weight:600;">
                            <%= mark2 >= 40 ? "Pass" : "Fail" %>
                        </span>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill <%= mark2 >= 40 ? "fill-pass" : "fill-fail" %>" style="width: <%= mark2 %>%;"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Subject 3 (Database Systems)</td>
                    <td>100</td>
                    <td><strong><%= df.format(mark3) %></strong></td>
                    <td>
                        <span style="color: <%= mark3 >= 40 ? "#34d399" : "#f87171" %>; font-weight:600;">
                            <%= mark3 >= 40 ? "Pass" : "Fail" %>
                        </span>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill <%= mark3 >= 40 ? "fill-pass" : "fill-fail" %>" style="width: <%= mark3 %>%;"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="summary-grid">
            <div class="summary-box">
                <span>Total Score</span>
                <h3><%= df.format(totalMarks) %> / 300</h3>
            </div>
            <div class="summary-box">
                <span>Percentage / Average</span>
                <h3><%= df.format(averageMarks) %>%</h3>
            </div>
            <div class="summary-box">
                <span>Final Classification</span>
                <h3 style="font-size: 1.1rem; color: <%= isPass ? "#a78bfa" : "#f87171" %>;"><%= resultGrade %></h3>
            </div>
        </div>

        <a href="question2.jsp" class="btn-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Process Another Student Result
        </a>
    </section>

<% } else { %>

    <!-- FORM INPUT -->
    <section class="glass-card">
        <div class="card-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Enter Student Marks
        </div>

        <% if (errorMessage != null) { %>
            <div class="alert-error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span><%= errorMessage %></span>
            </div>
        <% } %>

        <form action="question2.jsp" method="POST">
            <div class="form-grid">
                <div class="form-group">
                    <label for="studentName">Student Name *</label>
                    <input type="text" id="studentName" name="studentName" class="input-control" placeholder="e.g. ALUKA PARDHU" value="<%= studentName %>" required>
                </div>

                <div class="form-group">
                    <label for="registerNo">Register Number *</label>
                    <input type="text" id="registerNo" name="registerNo" class="input-control" placeholder="e.g. 21CS001" value="<%= registerNo %>" required>
                </div>

                <div class="form-group form-group-full">
                    <label for="subject1">Subject 1 Marks (0 - 100) *</label>
                    <input type="number" id="subject1" name="subject1" class="input-control" min="0" max="100" step="0.5" placeholder="e.g. 85" value="<%= sub1Str %>" required>
                </div>

                <div class="form-group form-group-full">
                    <label for="subject2">Subject 2 Marks (0 - 100) *</label>
                    <input type="number" id="subject2" name="subject2" class="input-control" min="0" max="100" step="0.5" placeholder="e.g. 92" value="<%= sub2Str %>" required>
                </div>

                <div class="form-group form-group-full">
                    <label for="subject3">Subject 3 Marks (0 - 100) *</label>
                    <input type="number" id="subject3" name="subject3" class="input-control" min="0" max="100" step="0.5" placeholder="e.g. 78" value="<%= sub3Str %>" required>
                </div>
            </div>

            <button type="submit" class="btn-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Process & Calculate Results (Server POST)
            </button>
        </form>
    </section>

<% } %>

</div>

</body>
</html>
