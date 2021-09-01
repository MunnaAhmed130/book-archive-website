const searchBooks = () => {
    const searchField = document.getElementById("search-field")
    const searchText = searchField.value;
    const emptySearch = document.getElementById('empty-search');
    searchField.value = '';
    if (!searchText) {
        console.log('no result');
        emptySearch.style.display = ('block');
    }
    else {
        const spinner = document.getElementById('spinner');
        spinner.style.display=('block')
        emptySearch.style.display = ('none');
        fetch(`http://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
    }

}

const displayBooks = (data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = '';
    const spinner = document.getElementById('spinner');
    spinner.style.display=('none')
    data.forEach(book => {
        console.log(book);
        const firstPublishYear = book.first_publish_year;
        const cover_i = book.cover_i;
        const title = book.title;
        const authorName = book.author_name
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src=" https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" height="300px" alt="...">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <h6 class="card-title">Author/Author's: <br>${authorName}</h6>
                <h6>First Published in : ${firstPublishYear}</h6>
            </div>
        </div>
        `;
        cardContainer.appendChild(div)
    });
}