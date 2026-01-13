import { createRoot } from 'react-dom/client'
import './index.css'
import './layout.css'
import 'react-toastify/dist/ReactToastify.css'

import { RouterProvider } from 'react-router'
import { route } from './routes/router'
import App from './App'

createRoot(document.getElementById('root')).render(
<>
  <App/>
  <RouterProvider router={route}/>
</>
)
