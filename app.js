const form = document.getElementById("dailyLogForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    message.textContent = "✅ Daily log recorded successfully!";

    form.reset();

});
