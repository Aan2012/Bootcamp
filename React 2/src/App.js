import React from "react";
import { faker } from "@faker-js/faker";
import "./style.css";

// import logo from './logo.svg';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const data = Array.from({ length: 3 }, () => ({
    name: faker.name.fullName(),
    avatar: faker.image.avatar(),
    chat: faker.lorem.sentence(),
    date: new Date().toLocaleString(),
  }));

  return (
    <div className="container">
      <div className="header">
        <h1>BOOTCAMP Batch 1 : Experiment with REACTJS</h1>
        <nav className="menu">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="body">
        {data.map((user, index) => (
          <div class="ui comments">
            <div class="comment">
              <a class="avatar">
                <img alt={user.name} src={user.avatar} />
              </a>
              <div class="content">
                <a class="author">{user.name}</a>
                <div class="metadata">
                  <div class="date">{user.date} ago</div>
                  <div class="rating">
                    <i class="star icon"></i>{index + 1} Faves
                  </div>
                </div>
                <div class="text">
                  {user.chat}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
