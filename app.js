import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const form = document.getElementById("dailyLogForm");
const message = document.getElementById("message");

// Google Apps Script Web App URL
const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbySpl3Tt5lHT9yD_g_WUU7OcnOUoVEHnQ2Y06gun9rs7psP3QAzsG8bWZ-nZMyFNLNIqg/exec";


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
        remarks: document.getElementById("remarks").value
    };


    try {

        // 1. Save to Firebase Firestore
        await addDoc(
            collection(window.firebaseDB, "dailyLogs"),
            {
                ...dailyLog,
                createdAt: serverTimestamp()
            }
        );


        // 2. Send a copy to Google Sheets
        try {

            await fetch(GOOGLE_SHEET_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(dailyLog)
            });

        } catch (sheetError) {

            console.error(
                "Google Sheet error:",
                sheetError
            );

        }


        message.textContent =
            "✅ Daily log saved successfully!";

        form.reset();


    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ Failed to save daily log. Please try again.";

    }

});
