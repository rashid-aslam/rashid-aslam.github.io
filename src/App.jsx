import { useState, useCallback } from "react";
import SearchBox from "./components/SearchBox";
import Book from "./components/Book";

export default function App() {
    const [books, setBooks] = useState();
    
    const setResults = useCallback((results) => {
        setBooks(results);
    }, []);

    function renderBooks() {
        if (!books) return null;

        return books.docs.map(({key, ...book}) => (
            <Book key={key} {...book} />
        ))
    }

    return (
        <>
            <h1>The Book Search App!</h1>
            <header>
                <SearchBox {...{ setResults }} />
            </header>

            <h2>Results found: </h2>

            <main className="books">
                {renderBooks()}
            </main>
        </>
    );
}

