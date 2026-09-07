import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const form = document.getElementById("dailyLogForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    message.textContent = "Saving...";

    const presence = document.querySelector(
        'input[name="presence"]:checked'
    )?.value || "";

    const activity = document.querySelector(
        'input[name="activity"]:checked'
    )?.value || "";

    const appetite = document.querySelector(
        'input[name="appetite"]:checked'
    )?.value || "";

    const dailyLog = {
        date: document.getElementById("date").value,
        keeper: document.getElementById("keeper").value,
        animal: document.getElementById("animal").value,
        animalId: document.getElementById("animalId").value,
        presence: presence,
        activity: activity,
        appetite: appetite,
        observation: document.getElementById("observation").value,
        health: document.getElementById("health").value,
        enrichment: document.getElementById("enrichment").value,
        remarks: document.getElementById("remarks").value,
        createdAt: serverTimestamp()
    };

    try {

        await addDoc(
            collection(window.firebaseDB, "dailyLogs"),
            dailyLog
        );

        message.textContent =
            "✅ Daily log saved successfully!";

        form.reset();

    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ Failed to save daily log. Please try again.";

    }

});
