import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';


// const root = ReactDOMClient.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>  
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>  
</React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
