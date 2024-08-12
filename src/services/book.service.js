export function searchBook(keyword, sort) {
    const sortParam = sort ? `&sort=${sort}` : '';
    const fieldsParam = 'fields=title,author_name,key,editions,publish_date';
    return fetch(`http://openlibrary.org/search.json?q=${keyword}&limit=25&${fieldsParam}${sortParam}`).then((res) => res.json()).catch((reason) => {
        console.error(reason);
        throw new Error(`Failed to search book by keyword: ${keyword}`);
    });
}

export function getBookByISBN(isbn) {
    return fetch(`http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`).then((res) => res.json()).catch((reason) => {
        console.error(reason);
        throw new Error(`Failed to get book by isbn: ${isbn}`);
    });
}
