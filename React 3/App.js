import React from 'react';
import { faker } from '@faker-js/faker';
import Comment from './comments_list';
import "./style.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  App = () => {
    return Array.from({ length: 3 }, () => ({
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
      chat: faker.lorem.sentence(),
      date: new Date().toLocaleString(),
    }));
  };

  render() {
    const comments = this.App();

    return (
      <div>
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            avatar={comment.avatar}
            name={comment.name}
            chat={comment.chat}
            date={comment.date}
          />
        ))}
      </div>
    );
  }
}

export default Comments;