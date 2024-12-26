let vocab = []; // Array to store vocabulary words

// Function to parse the CSV text
function parseCSV(text) {
    const lines = text.split("\n"); // Split the file into lines
    const header = lines[0].split(","); // Split the header line into columns
    const rows = lines.slice(1); // Skip the header for data rows

    return rows.map(row => {
        const values = row.split(","); // Split each row into values
        const entry = {};
        header.forEach((column, index) => {
            entry[column.trim()] = values[index]?.trim(); // Map column names to values
        });
        return entry;
    }).filter(entry => Object.keys(entry).length > 0); // Filter out empty rows
}

// Handle file upload
document.getElementById('csvUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const csvText = e.target.result; // Get the file's text content
            vocab = parseCSV(csvText); // Parse the CSV content
            alert('CSV file uploaded successfully!');
        };

        reader.readAsText(file); // Read the file as text
    }
});

// Handle chat interaction
document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value.trim();
    const chatBox = document.getElementById('chatBox');

    if (!userInput) {
        return;
    }

    // Display user message
    chatBox.innerHTML += `<p><strong>User:</strong> ${userInput}</p>`;

    // Generate bot response
    if (vocab.length > 0) {
        const randomWord = vocab[Math.floor(Math.random() * vocab.length)];
        const botResponse = `English: ${randomWord.Word || randomWord.English}, Chinese: ${randomWord.Translation || randomWord.Chinese}`;
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    } else {
        chatBox.innerHTML += `<p><strong>Bot:</strong> Please upload a CSV file first!</p>`;
    }

    // Scroll chat box to bottom and clear input
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById('userInput').value = '';
});