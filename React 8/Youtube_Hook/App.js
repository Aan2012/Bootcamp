import React, { useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
import Masonry from 'react-responsive-masonry';

const ImageSearch = () => {
  const [query, setQuery] = useState(''); // State to store the search query
  const [videos, setVideos] = useState([]); // State to store the fetched videos
  const [currentVideo, setCurrentVideo] = useState(null); // State to store current video being played
  const inputRef = useRef(null); // Ref to access the input element

  // Function to handle input change in the search field
  const handleInputChange = (event) => {
    setQuery(event.target.value); // Update the query state with input value
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Fetch videos from YouTube Data API based on the query
    axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          key: 'AIzaSyApU4ZlTvQnyIMJCmvf_mfc8eA0EKMz98Q', // Replace with your actual YouTube API key
        },
      })
      .then((response) => {
        console.log(response.data.items); // Log the fetched video items
        setVideos(response.data.items.slice(0, 10)); // Update videos state with the first 10 results
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log an error if fetching data fails
      });

    setQuery(''); // Clear the query input after submission
    inputRef.current.focus(); // Focus on the input field after submission
  };

  // Function to handle click on video thumbnail
  const handleClickThumbnail = (video) => {
    setCurrentVideo(video); // Set the current video state to the clicked video
  };

  // JSX for displaying the video player and current video information
  const renderVideoPlayer = () => {
    if (!currentVideo) {
      return null; // If no current video, return nothing
    }

    return (
      <div className="video-player">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
          frameBorder="0"
          allowFullScreen
          title="YouTube Video Player"
        ></iframe>
        <h2>{currentVideo.snippet.title}</h2>
        <p>{currentVideo.snippet.description}</p>
      </div>
    );
  };

  return (
    <div className="image-search-container">
      <h1>Hasil Pencarian Video</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search YouTube videos..."
          ref={inputRef} // Attach the ref to the input field
        />
        &nbsp;&nbsp;&nbsp;
        <button type="submit">Search</button>
      </form>
      <div className="video-list-container">
        <div className="video-player-container">
          {renderVideoPlayer()}
        </div>
        <div className="video-list">
          <Masonry columnsCount={3} gutter="10px">
            {videos.map((video) => (
              <div key={video.id.videoId} className="video-item" onClick={() => handleClickThumbnail(video)}>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  style={{ width: '100%', height: 'auto', marginBottom: '10px', cursor: 'pointer' }}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;