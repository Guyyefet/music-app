// gets result message from back-end, takes the rows variable and 
// present it the HTML
const updateResultMessage = (message, rows) => {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.innerHTML = message;

    if (rows) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';  // Clear existing rows

        rows.forEach(row => {
            const title = row.title.replace(/"/g, '');
            const artist = row.artist.replace(/"/g, '');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `<td>${row.index}</td><td>${title}</td><td>${artist}</td>`;
            tableBody.appendChild(newRow);
        });
    }
};

// picks the file that in the form, and makes a POST request to the back-end
const uploadFile = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const uploadForm = document.getElementById('uploadForm');

    const file = fileInput.files[0];
    if (!file) {
        updateResultMessage('No file selected');
        return;
    }

    const formData = new FormData(uploadForm);
    formData.append('file', file);

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        updateResultMessage(data.message, data.rows);
    })
    .catch(error => {
        console.error('Error:', error);
        updateResultMessage('An error occurred');
    });
};




