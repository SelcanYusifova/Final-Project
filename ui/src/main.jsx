import { createRoot } from 'react-dom/client'
import './index.css'
import './layout.css'
import 'react-toastify/dist/ReactToastify.css'

import { RouterProvider } from 'react-router'
import App from './App'
import { route } from './routes/router'

createRoot(document.getElementById('root')).render(
<>
  <App/>
  <RouterProvider router={route}/>
</>
)
