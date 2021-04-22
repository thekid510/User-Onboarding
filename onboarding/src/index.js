
import { worker } from './api-mocks/browser'

import React from 'react'
import { render } from 'react-dom'

import App from './App'
worker.start()
render(
  <App />
  , document.querySelector('#root')
)
