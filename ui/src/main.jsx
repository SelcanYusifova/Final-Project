import { createRoot } from 'react-dom/client'
import './index.css'
import './layout.css'
import 'react-toastify/dist/ReactToastify.css'

import { RouterProvider } from 'react-router'
import App from './App'
import { route } from './routes/router'
import { MainProvider } from './context/context'

createRoot(document.getElementById('root')).render(
  <MainProvider>
    <App />
    <RouterProvider router={route} />
  </MainProvider>
)