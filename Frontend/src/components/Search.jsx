import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Search = ({ search,setSearch,setFilteredData,data }) => {
  
  const filterDataBySearch = (searchTerm, data) => {
    if (!searchTerm) return data; // If no search term, return the full data
    return data.filter(item =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }; 

  // Update filteredData based on search term
  useEffect(() => {
    const filtered = filterDataBySearch(search, data);
    setFilteredData(filtered);
  }, [search, data]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="search d-flex align-items-center">
        <input
          type="text"
          className="search-input"
          placeholder="search..."
          onChange={handleSearchChange}
        />
        <a href="#" className="search-icon">
          <i className="fa fa-search"></i> 
        </a>
      </div>
    </div>
  );
};

Search.propTypes = {
  data:PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired, 
  setFilteredData:PropTypes.func.isRequired
};

export default Search;
