const spinner = document.getElementById('spinner');

const hiveKeychain = 'https://api.hive-keychain.com/hive/delegators/bdvoter';
let multiplierValue = 0.0005680694363369867;  //http://127.0.0.1:8000/api/hpconverter_constant

// Function to populate table rows
function populateTable(tableBody, data) {
  tableBody.innerHTML = "";
  const startIndex = (currentPage - 1) * rowsPerPage;

  data.forEach((row, index) => {
    const vestingShares = row.vesting_shares;
    const multipliedValue = vestingShares * multiplierValue;
    const newRow = tableBody.insertRow();

    const serialNumber = startIndex + index + 1;

    newRow.innerHTML = `
      <td class="px-4 py-2">${serialNumber}</td>
      <td class="px-4 py-2">${row.delegator}</td>
      <td class="px-4 py-2">${multipliedValue.toFixed(3)}</td>
      <td class="px-4 py-2">${row.delegation_date.split('T')[0]}</td>
    `;

    // Apply alternating row background colors
    if (index % 2 === 0) {
      newRow.classList.add('bg-gray-200', 'dark:bg-gray-700');
    } else {
      newRow.classList.add('bg-white', 'dark:bg-gray-600');
    }
  });
}



// Pagination variables
let currentPage = 1;
let currentTableData = [];


const rowsPerPage = 10; // Define the number of rows per page

// Function to update pagination UI
function updatePagination(totalRows) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("totalPages").textContent = totalPages;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

let sortedDataTop = [];
let sortedDataNew = [];

// Keep track of the initially loaded data
let initialDataLoaded = false;

// Function to fetch and populate the tables
function fetchDataAndPopulateTable() {

  spinner.style.display = "block";

  fetch(hiveKeychain)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const filteredData = data.filter(entry => entry.vesting_shares > 0);

      sortedDataTop = filteredData.slice().sort((a, b) => b.vesting_shares - a.vesting_shares);
      sortedDataNew = filteredData.slice().sort((a, b) => new Date(b.delegation_date) - new Date(a.delegation_date));

      currentTableData = sortedDataTop; // Set initial currentTableData to sortedDataTop

      // Populate the table with the first set of rowsPerPage data
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const initialDisplayData = currentTableData.slice(startIndex, endIndex);
      populateTable(document.getElementById("topTableBody"), initialDisplayData);

      updatePagination(currentTableData.length);

      initialDataLoaded = true; // Mark the initial data as loaded

      // Hide the spinner after data is loaded
      spinner.style.display = "none";
    })
    .catch(error => {
      // Handle error and hide the spinner
      console.error("Error loading data:", error);
      spinner.style.display = "none";
    });
}
// Call the function to fetch and populate the top table initially
fetchDataAndPopulateTable();


// Function to switch table data
function switchTable(tableData) {
  currentTableData = tableData;
  currentPage = 1;
  updateTable();
  updatePagination(currentTableData.length);
}

// Handle table buttons
document.getElementById("topTableButton").addEventListener("click", () => {
  if (initialDataLoaded) {
    currentTableData = sortedDataTop;
    currentPage = 1;
    topTableButton.classList.add('bg-green-500', 'text-white', 'dark:bg-green-800');
    newTableButton.classList.remove('bg-green-500', 'text-white', 'dark:bg-green-800');

    // Update the table with the first set of rowsPerPage data
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const initialDisplayData = currentTableData.slice(startIndex, endIndex);
    populateTable(document.getElementById("topTableBody"), initialDisplayData);

    updatePagination(currentTableData.length);
  }
});

document.getElementById("newTableButton").addEventListener("click", () => {
  if (initialDataLoaded) {
    currentTableData = sortedDataNew;
    currentPage = 1;
    newTableButton.classList.add('bg-green-500', 'text-white', 'dark:bg-green-800');
    topTableButton.classList.remove('bg-green-500', 'text-white', 'dark:bg-green-800');

    // Update the table with the first set of rowsPerPage data
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const initialDisplayData = currentTableData.slice(startIndex, endIndex);
    populateTable(document.getElementById("topTableBody"), initialDisplayData);

    updatePagination(currentTableData.length);
  }
});



// Handle search
document.getElementById("searchButton").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  // Check for empty search input
  if (!searchInput) {
    document.getElementById("emptySearchWarning").classList.remove("hidden");
    document.getElementById("noResultsWarning").classList.add("hidden");
    return;
  }

  const matchedRows = currentTableData.filter((row) =>
    row.delegator.toLowerCase().includes(searchInput)
  );

  const tableBody = document.getElementById("topTableBody"); // Assuming you are using top table for search results
  populateTable(tableBody, matchedRows);

  if (matchedRows.length === 0) {
    document.getElementById("noResultsWarning").classList.remove("hidden");
    document.getElementById("emptySearchWarning").classList.add("hidden");
  } else {
    document.getElementById("noResultsWarning").classList.add("hidden");
    document.getElementById("emptySearchWarning").classList.add("hidden");
  }

  currentPage = 1;
  updatePagination(matchedRows.length);
});



// Handle pagination
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const totalPages = Math.ceil(currentTableData.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
});

// Function to update the displayed table
function updateTable() {
  const tableBody = document.getElementById("topTableBody"); // Assuming you are using top table for pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = currentTableData.slice(startIndex, endIndex);
  populateTable(tableBody, displayedData);
  updatePagination(currentTableData.length);
}

// Initial table setup
updateTable();
