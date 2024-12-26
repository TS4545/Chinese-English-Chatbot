let vocab = []; // Array to store vocabulary words

// Handle file upload and parse CSV
document.getElementById('csvUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                vocab = results.data.map(row => ({
                    english: row.Word || row.English,
                    chinese: row.Translation || row.Chinese
                }));
                alert('CSV file uploaded successfully!');
            }
        });
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
        const botResponse = `English: ${randomWord.english}, Chinese: ${randomWord.chinese}`;
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    } else {
        chatBox.innerHTML += `<p><strong>Bot:</strong> Please upload a CSV file first!</p>`;
    }

    // Scroll chat box to bottom and clear input
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById('userInput').value = '';
});