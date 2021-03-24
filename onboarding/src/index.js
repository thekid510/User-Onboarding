import React from 'react';
import './index.css';
import App from './App';

// This is for the fake API. Do not delete!
import { worker } from './api-mocks/browser'
worker.start()

// 👉 Importing React libs from node_modules folder
import React from 'react'
import { render, ReactDOM } from 'react-dom'

// 👉 Importing the top-level component
import App from './components/App'

render(
  <App />
  , document.querySelector('#root')
)

