// Function to display confirmation modal and handle confirmation
function showConfirmationModal(message, callback) {
    // Get the confirmation modal elements
    const confirmationModal = document.getElementById('confirmationModal');
    const modalMessage = document.getElementById('modalMessage');
    const confirmYesBtn = document.getElementById('confirmYesBtn');
    const confirmNoBtn = document.getElementById('confirmNoBtn');

    // Set confirmation message
    modalMessage.textContent = message;

    // Function to handle the save confirmation
    function handleSaveConfirmation(confirmed) {
        // Close the confirmation modal
        confirmationModal.classList.add('hidden');

        // Call the callback function only when confirmed is true
        if (confirmed) {
            callback();
        }
    }

    // Function to hide the confirmation modal
    function hideConfirmationModal() {
        confirmationModal.classList.add('hidden');
    }

    // Display the confirmation modal
    confirmationModal.classList.remove('hidden');

    // Add event listeners for confirmation buttons
    confirmYesBtn.addEventListener('click', () => handleSaveConfirmation(true));
    confirmNoBtn.addEventListener('click', hideConfirmationModal);
}



// A Function to send POST request to the backend
async function postData(url = '', data = {}) {
    console.log(data, "incoming data");
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        // Update error message and background color based on success status
        const errorContainer = document.querySelector('.error-container');
        if (responseData.success) {
            errorContainer.style.backgroundColor = 'green';
            errorContainer.querySelector('p').textContent = 'Saved data successfully';
        } else {
            errorContainer.style.backgroundColor = 'red';
            errorContainer.querySelector('p').textContent = 'Percentage has to be between 1 to 100';
        }

        return responseData;
    } catch (error) {
        console.error('Error while posting data:', error);
        const errorContainer = document.querySelector('.error-container');
        errorContainer.style.backgroundColor = 'red';
        errorContainer.querySelector('p').textContent = 'Error while posting data. Please try again later.';
    }
}




async function fetchData() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/toushik018/473f31c780bceed8f66730ebc1cbada7/raw/031536b36b7d8d470619016821003793e1dc2b63/gistfile1.txt');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching data:', error);
    }
}

// Function to populate input fields with default values
async function populateInputFields() {
    const data = await fetchData();

    if (data) {
        document.getElementById('div1').value = data.distribution['panda-eds']?.div || 0;
        document.getElementById('opt1').value = data.distribution['panda-eds']?.opt || 0;

        document.getElementById('div2').value = data.distribution['panda-bro']?.div || 0;
        document.getElementById('opt2').value = data.distribution['panda-bro']?.opt || 0;

        document.getElementById('opt3').value = data.distribution['panda-workerbee']?.opt || 0;

        // Populate management hive fields
        const hiveData = data.management.hive;
        renderHiveEntries(hiveData);
        console.log(hiveData);

        // Populate management panda token fields
        const tokenData = data.management.token;
        renderTokenEntries(tokenData);

    }
}


// Function to render hive entries
function renderHiveEntries(hiveData) {

    const hiveEntriesContainer = document.getElementById('hiveEntries');
    hiveEntriesContainer.innerHTML = ''; // Clear existing entries

    hiveData.forEach(entry => {
        const key = Object.keys(entry)[0];
        const value = entry[key];
        const entryHTML = `
        <div class="w-full mx-auto">
        <div class="flex items-center justify-evenly py-2">
            <label for="${key}" class="block text-gray-700 dark:text-gray-100 font-semibold mb-2" style="width: 30%">
                <p>${key}</p>
            </label>
            <input type="number" value="${value}" id="${key}" data-name="${key}" class="hive-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" style="width: 70%" required>
            <div class="text-gray-500 py-2 px-2">
                <i class="fas fa-percent"></i>
            </div>
        </div>
    </div>
    
        `;
        hiveEntriesContainer.insertAdjacentHTML('beforeend', entryHTML);
    });
}


// Function to render token entries
function renderTokenEntries(tokenData) {
    const tokenEntriesContainer = document.getElementById('tokenEntries');
    tokenEntriesContainer.innerHTML = '';

    tokenData.forEach(entry => {
        const key = Object.keys(entry)[0];
        const value = entry[key];
        const entryHTML = `
        <div class="w-full mx-auto">
        <div class="flex items-center justify-evenly py-2">
            <label for="input" class="block text-gray-700 dark:text-gray-100 font-semibold mb-2" style="width: 30%">
                <p>${key}</p>
            </label>
            <input type="number" value="${value}" id="${key}" data-name="${key}" class="token-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" style="width: 70%" required>
            <div class="text-gray-500 py-2 px-2">
                <i class="fas fa-percent"></i>
            </div>
        </div>
    </div>
        `;
        tokenEntriesContainer.insertAdjacentHTML('beforeend', entryHTML);
    });
}




// Function to save Panda Eds data
function savePandaEds() {
    const divValue = document.getElementById('div1').value;
    const optValue = document.getElementById('opt1').value;

    // Constructing the data object
    const data = {
        schema: "distribution",
        data: {
            "panda-eds": { div: parseInt(divValue), opt: parseInt(optValue) }
        }
    };

    // Logging the data for debugging
    console.log('Panda Eds Data:', data);



    function savePandaEdsData() {
        // Sending the data to the backend API
        postData('http://localhost/api/save_settings', data);
    }
    showConfirmationModal("Are you sure you want to save Panda Eds?", savePandaEdsData);
}




// // Function to save Panda Bro data
// function savePandaBro() {
//     const divValue = document.getElementById('div2').value;
//     const optValue = document.getElementById('opt2').value;

//     // Constructing the data object
//     const data = {
//         schema: "distribution",
//         data: {
//             "panda-bro": { div: parseInt(divValue), opt: parseInt(optValue) }
//         }
//     };

//     // Logging the data for debugging
//     console.log('Panda Bro Data:', data);

//     // Sending the data to the backend API
//     postData('http://localhost/api/save_settings', data);
// }



// Function to save Panda Bro data
function savePandaBro() {
    const divValue = document.getElementById('div2').value;
    const optValue = document.getElementById('opt2').value;

    // Constructing the data object
    const data = {
        schema: "distribution",
        data: {
            "panda-bro": { div: parseInt(divValue), opt: parseInt(optValue) }
        }
    };

    // Logging the data for debugging
    console.log('Panda Bro Data:', data);

    // Callback function for saving Panda Bro data
    function savePandaBroData() {
        postData('http://localhost/api/save_settings', data);
        console.log(data);
    }

    // Show confirmation modal and handle confirmation
    showConfirmationModal("Are you sure you want to save Panda Bro?", savePandaBroData);
}


// Function to save Panda Worker Bee data
function pandaWorkerBee() {
    const optValue = document.getElementById('opt3').value;

    // Constructing the data object
    const data = {
        schema: "distribution",
        data: {
            "panda-workerbee": { opt: parseInt(optValue) }
        }
    };

    // Logging the data for debugging
    console.log('Panda Worker Bee Data:', data);

    // Callback function for saving Panda Worker Bee data
    function savePandaWorkerBeeData() {
        postData('http://localhost/api/save_settings', data);
    }

    // Show confirmation modal and handle confirmation
    showConfirmationModal("Are you sure you want to save Panda Worker Bee?", savePandaWorkerBeeData);
}





// For management hive and panda Token
function saveHive() {
    const hiveInputs = document.querySelectorAll('.hive-input');
    const hiveData = {
        schema: "management-hive",
        data: {}
    };

    hiveInputs.forEach(input => {
        const name = input.getAttribute('data-name');
        const value = parseFloat(input.value);
        hiveData.data[name] = value;

    });
    console.log(hiveData);


    function saveHiveData() {
        // Send hiveData to the backend API
        postData('http://localhost:/api/save_settings', hiveData)
    }

    showConfirmationModal("Are you sure you want to save the Hive Data?", saveHiveData);

}

function savePandaToken() {
    const tokenInputs = document.querySelectorAll('.token-input');
    const tokenData = {
        schema: "management-token",
        data: {}
    };

    tokenInputs.forEach(input => {
        const name = input.getAttribute('data-name');
        const value = parseFloat(input.value);
        tokenData.data[name] = value;
    });


    console.log('Token Data:', tokenData);


    function saveTokenData() {
        // Send token to the backend API
        postData('http://localhost:/api/save_settings', tokenData)
    }

    showConfirmationModal("Are you sure you want to save the Token Data?", saveTokenData);

}


// Function to distribute
function distribute() {
    // Callback function for distributing
    function distributeData() {
        const data = {
            distribute: true
        };

        // Perform the distribute action here
        postData('http://localhost/api/distribute', data);
        console.log(data);
    }

    // Show confirmation modal and handle confirmation
    showConfirmationModal("Are you sure you want to distribute?", distributeData);
}


// Calling the function
populateInputFields();


// --------------///

// Function to open the "Add Hive" modal
function openAddHiveModal() {
    document.getElementById('addHiveModal').classList.remove('hidden');
}

// Function to close the "Add Hive" modal
function closeAddHiveModal() {
    document.getElementById('addHiveModal').classList.add('hidden');
}

// Function to open the "Add Panda Token" modal
function openAddPandaTokenModal() {
    document.getElementById('addPandaTokenModal').classList.remove('hidden');
}

// Function to close the "Add Panda Token" modal
function closeAddPandaTokenModal() {
    document.getElementById('addPandaTokenModal').classList.add('hidden');
}


// Function to add a new entry to management hive
function addHive() {
    const name = document.getElementById('newEntryName2').value;
    const value = document.getElementById('newEntryValue2').value;

    // Create a new entry HTML
    const entryHTML = `
        <div class="w-full mx-auto">
            <div class="flex items-center justify-evenly py-2">
                <label for="input" class="block text-gray-700 dark:text-gray-100 font-semibold mb-2" style="width: 30%">
                    <p>${name}</p>
                </label>
                <input type="number" value="${value}" data-name="${name}" class="hive-input new-hive-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" style="width: 70%" required>
                <div class="text-gray-500 py-2 px-2">
                    <i class="fas fa-percent"></i>
                </div>
            </div>
        </div>
    `;

    // Append the new entry HTML to the hive entries container
    document.getElementById('hiveEntries').insertAdjacentHTML('beforeend', entryHTML);

    // Close the modal
    closeAddHiveModal();
}

// Function to add a new entry to management panda token
function addPandaToken() {
    const name = document.getElementById('newEntryName1').value;
    const value = document.getElementById('newEntryValue1').value;

    // Create a new entry HTML
    const entryHTML = `
        <div class="w-full mx-auto">
            <div class="flex items-center justify-evenly py-2">
                <label for="input" class="block text-gray-700 dark:text-gray-100 font-semibold mb-2" style="width: 30%">
                    <p>${name}</p>
                </label>
                <input type="number" value="${value}" data-name="${name}" class="token-input w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100" style="width: 70%" required>
                <div class="text-gray-500 py-2 px-2">
                    <i class="fas fa-percent"></i>
                </div>
            </div>
        </div>
    `;

    // Append the new entry HTML to the panda token entries container
    document.getElementById('tokenEntries').insertAdjacentHTML('beforeend', entryHTML);

    // Close the modal
    closeAddPandaTokenModal();
}
