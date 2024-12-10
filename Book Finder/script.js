let books = []; // Declare globally to store books data

// Fetch JSON file and initialize search functionality
fetch('books.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        books = data; // Assign fetched data to the global variable
        initializeSearch(books); // Initialize search with loaded data
    })
    .catch((error) => {
        console.error("Error loading JSON file:", error);
    });


// Function to initialize search functionality
function initializeSearch(books) {
    const searchInput = document.getElementById("searchInput");
    const filterOption = document.getElementById("filterOption");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("resultsContainer");

    // Event Listener for Search Button
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        const filter = filterOption.value;

        // Filter books based on search criteria
        const filteredBooks = books.filter((book) => {
            if (book[filter]) {
                return book[filter].toLowerCase().includes(query);
            }
            return false;
        });

        displayResults(filteredBooks); // Display filtered books
    });

    // Function to display search results
    function displayResults(books) {
        resultsContainer.innerHTML = ""; // Clear previous results

        if (books.length === 0) {
            resultsContainer.innerHTML = "<p>No books found.</p>";
            return;
        }

        books.forEach((book) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");

            bookCard.innerHTML = `
                <img src="${book.thumbnail}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>by ${book.authors}</p>
                <button onclick="viewDetails('${book.isbn13}')">View Details</button>
            `;
            resultsContainer.appendChild(bookCard);
        });
    }
}

function viewDetails(isbn13) {
    // Find the book based on the ISBN
    const selectedBook = books.find((book) => book.isbn13 === isbn13);

    if (selectedBook) {
        // Redirect to details page with book data as a URL parameter
        const bookData = encodeURIComponent(JSON.stringify(selectedBook));
        window.location.href = `details.html?book=${bookData}`;
    } else {
        console.error("Book not found.");
    }
}


