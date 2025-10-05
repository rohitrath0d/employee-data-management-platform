import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import EmployeeListPage from './pages/EmployeeListPage'
import EmployeeFormPage from './pages/EmployeeFormPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/new" element={<EmployeeFormPage />} />
          <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
        </Routes>
      </Layout>
      {/* Toast notifications container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  )
}

export default App
