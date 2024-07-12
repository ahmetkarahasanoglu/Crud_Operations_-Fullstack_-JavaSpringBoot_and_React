import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from './layout/Navbar.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddUser from './users/AddUser.jsx'
import EditUser from './users/EditUser.jsx'
import ViewUser from './users/ViewUser.jsx'

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/edituser/:id" element={<EditUser />} />  {/* (we will use this 'id' in the target component [EditUser component], by using 'useParams()' there. (for database operations). */}
            <Route path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
