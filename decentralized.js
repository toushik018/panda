// // Define the base URLs for your API endpoints
// const currentDataApi = 'http://127.0.0.1:8000/api/currentData';
// const previousDataApi = 'http://127.0.0.1:8000/api/previousData';

// const data = {
//     current: {
//         result: [],
//         is_votable: true
//     },
//     previous: {
//         result: [],
//         is_votable: false
//     }
// };

// // Function to fetch data from the API and update the data object
// async function fetchDataFromApi(apiUrl, dataType) {
//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data for ${dataType}`);
//         }
//         const jsonData = await response.json();
//         data[dataType].result = jsonData;
//         updateTable(currentDataType);
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Fetch initial data for "current" and "previous"
// fetchDataFromApi(currentDataApi, "current");
// fetchDataFromApi(previousDataApi, "previous");

// const itemsPerPage = 5;
// let currentPage = 1;
// let currentDataType = "current"; // Initial data type is "current"

// const tableBody = document.querySelector("tbody");
// const prevPageBtn = document.getElementById("prevPage");
// const nextPageBtn = document.getElementById("nextPage");
// const currentPageLabel = document.getElementById("currentPage");
// const totalPagesLabel = document.getElementById("totalPages");
// const prevButton = document.getElementById("prevButton");
// const currentButton = document.getElementById("currentButton");

// // Function to update the table rows based on data type
// function updateTable(dataType) {
//     const dataToDisplay = data[dataType].result;
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, dataToDisplay.length);

//     tableBody.innerHTML = ''; // Clear the table

//     if (dataToDisplay.length > 0) {
//         for (let i = startIndex; i < endIndex; i++) {
//             const rowData = dataToDisplay[i];

//             const row = document.createElement("tr");

//             row.innerHTML = `
//                 <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100 font-bold">${rowData.sl}</td>
//                 <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100 font-semibold">${rowData.username}</td>
//                 <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">${rowData.post_title}</td>
//                 <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">${rowData.nominated_by}</td>
//                 <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">Category</td>
//                 <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100 font-semibold">${rowData.point}</td>
//                 ${data[dataType].is_votable ? `
//                     <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">
//                         <button class="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out active-button">Support</button>
//                     </td>
//                 ` : ''}
//             `;

//             tableBody.appendChild(row);
//         }
//     } else {
//         const message = dataType === "current" ? "No current data" : "No previous data";
//         tableBody.innerHTML = `<tr><td colspan="7" class="text-center">${message}</td></tr>`;
//     }

//     // Update current page and total pages labels
//     currentPageLabel.textContent = currentPage;
//     totalPagesLabel.textContent = Math.ceil(dataToDisplay.length / itemsPerPage);

//     // Disable/enable Previous and Next buttons based on the current page
//     prevPageBtn.disabled = currentPage === 1;
//     nextPageBtn.disabled = currentPage === Math.ceil(dataToDisplay.length / itemsPerPage);

//     // Hide the support button and header column when viewing previous data
//     if (dataType === "previous") {
//         const supportButtons = document.querySelectorAll("td:nth-child(7) button");
//         supportButtons.forEach((button) => {
//             button.style.display = "none";
//         });
//         const supportHeader = document.querySelector("th:nth-child(7)");
//         supportHeader.style.display = "none";
//     } else {
//         const supportButtons = document.querySelectorAll("td:nth-child(7) button");
//         supportButtons.forEach((button) => {
//             button.style.display = "block";
//         });
//         const supportHeader = document.querySelector("th:nth-child(7)");
//         supportHeader.style.display = "table-cell";
//     }
// }

// // Initial table update for "current" data
// updateTable(currentDataType);

// // Event listener for "Previous" button
// prevPageBtn.addEventListener("click", () => {
//     if (currentPage > 1) {
//         currentPage--;
//     }
//     updateTable(currentDataType); // Update table after changing the page
// });

// // Event listener for "Next" button
// nextPageBtn.addEventListener("click", () => {
//     const dataToDisplay = data[currentDataType].result;
//     if (currentPage < Math.ceil(dataToDisplay.length / itemsPerPage)) {
//         currentPage++;
//     }
//     updateTable(currentDataType); // Update table after changing the page
// });

// // Initial setup, set the "Current" button to green
// currentButton.classList.add("bg-green-500");
// prevButton.classList.add("bg-gray-300");

// // Event listener for "Current" button
// currentButton.addEventListener("click", () => {
//     if (currentDataType !== "current") {
//         currentDataType = "current";
//         currentPage = 1;
//         updateTable(currentDataType);

//         // Change the appearance of the buttons using Tailwind CSS classes
//         currentButton.classList.replace("bg-gray-300", "bg-green-500");
//         prevButton.classList.replace("bg-green-500", "bg-gray-300");
//     }
//     // Make the support button green for current data
//     const supportButtons = document.querySelectorAll("td:nth-child(7) button");
//     supportButtons.forEach((button) => {
//         button.classList.add("active-button");
//     });
// });

// // Event listener for "Previous" button
// prevButton.addEventListener("click", () => {
//     if (currentDataType !== "previous") {
//         currentDataType = "previous";
//         currentPage = 1;
//         updateTable(currentDataType);

//         // Change the appearance of the buttons using Tailwind CSS classes
//         prevButton.classList.replace("bg-gray-300", "bg-green-500");
//         currentButton.classList.replace("bg-green-500", "bg-gray-300");
//     }
//     // Make the support button invisible for previous data
//     const supportButtons = document.querySelectorAll("td:nth-child(7) button");
//     supportButtons.forEach((button) => {
//         button.classList.remove("active-button");
//     });
// });














const currentData = {
    result: [
        { sl: 1, username: "sourov", post_title: "This is a post link 1", nominated_by: "Sakib", point: 1000 },
        { sl: 2, username: "sourov", post_title: "This is a post link 2", nominated_by: "Sakib", point: 1000 },
        { sl: 3, username: "sourov", post_title: "This is a post link 3", nominated_by: "Sakib", point: 1000 },
        { sl: 4, username: "sourov", post_title: "This is a post link 4", nominated_by: "Sakib", point: 1000 },
        { sl: 5, username: "sourov", post_title: "This is a post link 5", nominated_by: "Sakib", point: 1000 },
        { sl: 6, username: "sourov", post_title: "This is a post link 6", nominated_by: "Sakib", point: 1000 },
        { sl: 7, username: "sourov", post_title: "This is a post link 7", nominated_by: "Sakib", point: 1000 }
        // Add more data as needed
    ],
    is_votable: true
};

const previousData = {
    result: [
        { sl: 1, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 },
        { sl: 2, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 },
        { sl: 3, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 },
        { sl: 4, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 },
        { sl: 5, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 },
        { sl: 6, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 },
        { sl: 7, username: "tayeb", post_title: "This is a post link is previous", nominated_by: "Sakib", point: 1000 }
        // Add more data as needed
    ],
    is_votable: false
};

const data = {
    current: currentData,
    previous: previousData
};

const itemsPerPage = 20;
let currentPage = 1;
let currentDataType = "current"; // Initial data type is "current"

const tableBody = document.querySelector("tbody");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const currentPageLabel = document.getElementById("currentPage");
const totalPagesLabel = document.getElementById("totalPages");
const prevButton = document.getElementById("prevButton");
const currentButton = document.getElementById("currentButton");


// Function to update the table rows based on data type
function updateTable(dataType) {
    const dataToDisplay = data[dataType].result;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataToDisplay.length);

    tableBody.innerHTML = ''; // Clear the table

    if (dataToDisplay.length > 0) {
        for (let i = startIndex; i < endIndex; i++) {
            const rowData = dataToDisplay[i];

            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100 font-bold">${rowData.sl}</td>
                <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100 font-semibold username-cell">
                    ${window.innerWidth < 768 ? `<a href="/post/${rowData.post_title}">${rowData.username}</a>` : rowData.username}
                </td>
                <!-- For mobile view, hide these columns -->
                <td class="hidden md:table-cell px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">${rowData.post_title}</td>
                <td class="hidden md:table-cell px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">${rowData.nominated_by}</td>
                <td class="hidden md:table-cell px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">Category</td>
                <td class="px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100 font-semibold"><span class="cursor-pointer curation-point-cell">${rowData.point}</span></td>
                ${data[dataType].is_votable ? `
                    <td class="md:table-cell px-6 py-4 text-left text-base text-gray-900 dark:text-gray-100">
                    <button class="bg-teal-500 dark:bg-teal-800 dark:hover:bg-teal-900 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition duration-300 ease-in-out">Support</button>
                    </td>
                ` : ''}
            `;

            tableBody.appendChild(row);
        }
    } else {
        const message = dataType === "current" ? "No current data" : "No previous data";
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center">${message}</td></tr>`;
    }

    // Update current page and total pages labels
    currentPageLabel.textContent = currentPage;
    totalPagesLabel.textContent = Math.ceil(dataToDisplay.length / itemsPerPage);

    // Disable/enable Previous and Next buttons based on the current page
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === Math.ceil(dataToDisplay.length / itemsPerPage);

    // Hide the support button and header column when viewing previous data
    if (dataType === "previous") {
        const supportButtons = document.querySelectorAll("td:nth-child(7) button");
        supportButtons.forEach((button) => {
            button.style.display = "none";
        });
        const supportHeader = document.querySelector("th:nth-child(7)");
        supportHeader.style.display = "none";
    } else {
        const supportButtons = document.querySelectorAll("td:nth-child(7) button");
        supportButtons.forEach((button) => {
            button.style.display = "block";
        });
        const supportHeader = document.querySelector("th:nth-child(7)");
        supportHeader.style.display = "table-cell";
    }
}

// Initial table update for "current" data
updateTable(currentDataType);

// Event listener for "Previous" button
prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
    }
    updateTable(currentDataType); // Update table after changing the page
});

// Event listener for "Next" button
nextPageBtn.addEventListener("click", () => {
    const dataToDisplay = data[currentDataType].result;
    if (currentPage < Math.ceil(dataToDisplay.length / itemsPerPage)) {
        currentPage++;
    }
    updateTable(currentDataType); // Update table after changing the page
});

// Initial setup, set the "Current" button to green
currentButton.classList.add("bg-teal-400", "dark:bg-teal-800");
prevButton.classList.add("bg-gray-300", "dark:bg-gray-500");

// Event listener for "Current" button
currentButton.addEventListener("click", () => {
    if (currentDataType !== "current") {
        currentDataType = "current";
        currentPage = 1;
        updateTable(currentDataType);

        // Change the appearance of the buttons using Tailwind CSS classes
        currentButton.classList.replace("bg-gray-300", "bg-teal-400");
        currentButton.classList.replace("dark:bg-gray-500", "dark:bg-teal-800");
        prevButton.classList.replace("bg-teal-400", "bg-gray-300");
        prevButton.classList.replace("dark:bg-teal-800", "dark:bg-gray-500");
    }
    // Make the support button green for current data
    const supportButtons = document.querySelectorAll("td:nth-child(7) button");
    supportButtons.forEach((button) => {
        button.classList.add("active-button");
    });
});

// Event listener for "Previous" button
prevButton.addEventListener("click", () => {
    if (currentDataType !== "previous") {
        currentDataType = "previous";
        currentPage = 1;
        updateTable(currentDataType);

        // Change the appearance of the buttons using Tailwind CSS classes
        prevButton.classList.replace("bg-gray-300", "bg-teal-400");
        prevButton.classList.replace("dark:bg-gray-500", "dark:bg-teal-800");
        currentButton.classList.replace("bg-teal-400", "bg-gray-300");
        currentButton.classList.replace("dark:bg-teal-800", "dark:bg-gray-500");
    }
    // Make the support button invisible for previous data
    const supportButtons = document.querySelectorAll("td:nth-child(7) button");
    supportButtons.forEach((button) => {
        button.classList.remove("active-button");
    });
});





document.addEventListener("DOMContentLoaded", function () {
    // Event listener ... ... for Curation Point cell clicks
    const tableBody = document.querySelector("tbody");
    const userData = [
      {
        username: "sourov",
        profilePicture: "https://i.ibb.co/HFHwdF0/Illustration.png",
        points: 1000,
      },
      {
        username: "tayeb",
        profilePicture: "https://i.ibb.co/HFHwdF0/Illustration.png",
        points: 1000,
      },
      // Add more user data as needed
    ];
  
    // Function to open the user modal
    function openUserModal(username, profilePicture, points) {
      const userModal = document.getElementById("userModal");
      const userName = document.getElementById("userName");
      const userProfilePicture = document.getElementById("userProfilePicture");
      const closeUserModal = document.getElementById("closeUserModal");
      const userPoints = document.getElementById("userPoints")
  
      userName.textContent = username;
      userProfilePicture.src = profilePicture;
      userProfilePicture.alt = `Profile Picture of ${username}`;
      userPoints.textContent = `Points: ${points}`;
  
      console.log("Opening the modal now.");
      userModal.classList.remove("hidden");
  
      // Event listener for close button click
      closeUserModal.addEventListener("click", () => {
        console.log("Closing the modal now.");
        userModal.classList.add("hidden");
      });
    }
  
    // Event listener for Curation Point cell clicks
    tableBody.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("curation-point-cell")) {
        const row = target.parentElement.parentElement;
        const usernameCell = row.querySelector("td:nth-child(2)"); // Assuming the "Username" cell is the second column (index 1)
        const username = usernameCell.textContent.trim();
        const rowData = userData.find((user) => user.username === username);
  
        if (rowData) {
          openUserModal(
            rowData.username,
            rowData.profilePicture,
            rowData.points
          );
        }
      }
    });
  });