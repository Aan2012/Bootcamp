// src/Comment.js
import React from 'react';

class Comment extends React.Component {
  render() {      
    return (        
            <div class="ui comments">
              <div class="comment">
                <a class="avatar">
                  <img alt={this.props.name} src={this.props.avatar} />
                </a>
                <div class="content">
                  <a class="author">{this.props.name}</a>
                  <div class="metadata">
                    <div class="date">{this.props.time} ago</div>
                  </div>
                  <div class="text">
                    {this.props.chat}
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

export default Comment;