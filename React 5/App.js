import React, { Component } from 'react';
import { faker } from '@faker-js/faker';
import "./style.css";
import axios from 'axios';

class ImageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=lsMC9ZMswcFrFxHLP_woOs7zlGry9IpJQjI4VkChIo8`)
      .then(response => {
        console.log(response.data.results);
        this.setState({ images: response.data.results });
      })
      .catch(error => {
        console.error('Error pencarian data:', error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleInputChange}
            placeholder="Cari gambar di Unsplash.."
          />&nbsp;&nbsp;&nbsp;
          <button type="submit">Cari</button>
        </form>
        <div className="image-list">
          {this.state.images.map(image => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              style={{ margin: '10px', width: '200px' }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ImageSearch;
