import { useState, useRef, useEffect } from 'react';

const SearchComponent = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null); // Ref for the search box

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
                setSearchTerm("");
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchRef]);

    const handleChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const results = items.filter(item =>
                item.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="ui-input-container" ref={searchRef}>
            <input
                required=""
                placeholder="Ara"
                className="ui-input"
                type="text"
                onChange={handleChange}
                value={searchTerm}
            />
            <div className="ui-input-underline"></div>
            <div className="ui-input-highlight"></div>
            <div className="ui-input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    ></path>
                </svg>
            </div>
            {searchResults.length > 0 && (
                <div className="search-results">
                    <ul>
                        {searchResults.map((item, index) => (
                            <a href={`#${item.name}`}>
                                <li key={index} className="search-result-item">
                                    <span>{item.name}</span>
                                    <img src={item.img} alt={item.name} className="search-result-image" />
                                </li>
                            </a>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;