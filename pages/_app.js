import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '../components'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../context/AuthContext'


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Component
          {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
