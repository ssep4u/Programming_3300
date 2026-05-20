// https://programming-3300.ssep4u.workers.dev/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './reset.css'
import TodoListApp from './TodoListApp.jsx'
import HomeApp from './HomeApp.jsx'
import RouterApp from './RouterApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
