<!DOCTYPE html>
<html>
<head>
    <title>Experiment 3 - Event Registration</title>
</head>

<body>

    <h2>Interactive Event Registration</h2>

    <form id="registrationForm">

        <label>Student Name:</label>
        <input type="text" id="name"><br><br>

        <label>Register Number:</label>
        <input type="text" id="regno" value="192421418"><br><br>

        <label>Email:</label>
        <input type="email" id="email"><br><br>

        <label>Select Event:</label>
        <select id="event">
            <option value="">Select</option>
            <option value="Coding Competition">Coding Competition</option>
            <option value="Web Development Workshop">Web Development Workshop</option>
            <option value="Technical Seminar">Technical Seminar</option>
        </select>

        <br><br>

        <button type="submit">Register</button>

    </form>

    <h3 id="message"></h3>

    <script>
        let name = document.getElementById("name");
        let regno = document.getElementById("regno");
        let email = document.getElementById("email");
        let event = document.getElementById("event");
        let form = document.getElementById("registrationForm");
        let message = document.getElementById("message");

        name.addEventListener("focus", function() {
            name.style.backgroundColor = "yellow";
        });

        name.addEventListener("blur", function() {
            name.style.backgroundColor = "white";
        });

        name.addEventListener("input", function() {
            message.innerHTML = "Typing: " + name.value;
        });

        event.addEventListener("change", function() {
            message.innerHTML = "Selected Event: " + event.value;
        });

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            if (name.value === "" || email.value === "" || event.value === "") {
                message.innerHTML = "Please fill all the fields.";
                return;
            }

            message.innerHTML =
                "Registration Successful!<br>" +
                "Name: " + name.value + "<br>" +
                "Register No: " + regno.value + "<br>" +
                "Event: " + event.value;
        });
    </script>

</body>
</html>