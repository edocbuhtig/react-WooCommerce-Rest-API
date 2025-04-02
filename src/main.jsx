import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MyStoreProvider } from './MyStoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <MyStoreProvider>
      <App />
  </MyStoreProvider>
)
