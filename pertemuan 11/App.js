import React from 'react';
import { faker } from '@faker-js/faker';
import Comment from './comments_list';
import "./style.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      time: new Date().toLocaleTimeString(),
      comments: []
    };
  }

  componentDidMount() {
    this.generateComments();
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  startTimer() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  generateComments() {
    const comments = Array.from({ length: 3 }, () => ({
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
      chat: faker.lorem.sentence(),
    }));

    this.setState({
      comments: comments
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment, index) => (
          <Comment
            key={comment.id}
            avatar={comment.avatar}
            name={comment.name}
            chat={comment.chat}
            time={this.state.time}
          />
        ))}  
      </div>      
    );    
  }
}

export default Comments;