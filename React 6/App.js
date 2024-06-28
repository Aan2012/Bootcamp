import React, { useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
import Masonry from 'react-responsive-masonry';

const ImageSearch = () => {
  const [query, setQuery] = useState(''); // State to store the search query
  const [images, setImages] = useState([]); // State to store the fetched images
  const inputRef = useRef(null); // Ref to access the input element

  // Function to handle input change in the search field
  const handleInputChange = (event) => {
    setQuery(event.target.value); // Update the query state with input value
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Fetch images from Unsplash API based on the query
    axios
      .get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: query,
          client_id: 'lsMC9ZMswcFrFxHLP_woOs7zlGry9IpJQjI4VkChIo8',
        },
      })
      .then((response) => {
        console.log(response.data.results); // Log the fetched image results
        setImages(response.data.results.slice(0, 10)); // Update images state with the first 10 results
      })
      .catch((error) => {
        console.error("Error pencarian data:", error); // Log an error if fetching data fails
      });

    setQuery(''); // Clear the query input after submission
    inputRef.current.focus(); // Focus on the input field after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Cari gambar di Unsplash.."
          ref={inputRef} // Attach the ref to the input field
        />
        &nbsp;&nbsp;&nbsp;
        <button type="submit">Cari</button>
      </form>
      <div className="image-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Masonry columnsCount={3} gutter="10px">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img
                src={image.urls.small}
                alt={image.alt_description}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default ImageSearch;
