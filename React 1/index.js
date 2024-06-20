import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// Komponen Menu

const App = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>BOOTCAMP Batch 1 : Experiment with REACTJS</h1>
        <nav className="menu">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="body"><h2><b>This is React</b></h2></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));


//ReactDOM.render(Menu, body, document.getElementById("root"));
// Render ke dalam HTML
// ReactDOM.render(
//   <React.StrictMode>
//     <Menu />
//     <Body />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// const element = <h1>this is react</h1>;
// ReactDOM.render(element, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
