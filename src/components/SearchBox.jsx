import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { searchBook } from '../services/book.service';
import { throttle } from '../utils/debounce';

function SearchBox({ setResults = () => null }) {
    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState('');

    const Search = useCallback(throttle(async (searchTerm, sortOrder) => {
        try {
            const results = await searchBook(searchTerm.toLowerCase(), sortOrder);
            setResults(results);
        } catch (err) {
            console.error(err);
        }
    }, 500), []);

    useEffect(() => {
        if (keyword)
            Search(keyword, sort);
    }, [keyword, sort, Search]);

    return (
        <div>
            <label>Keyword: <input type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='The great gatsby' /></label>
            &nbsp;
            <label>
                Sort:
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Relevance</option>
                    <option value="title">Title</option>
                    <option value="new">Recently Published</option>
                </select>
            </label>
        </div>
    );
}

SearchBox.propTypes = {
    setResults: PropTypes.func
}

export default SearchBox;
