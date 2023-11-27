import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './use context/useAuthInfo.jsx'
// import { DataCurrentUserProvider } from './use context/useAllDataCurrentUser.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          {/* <DataCurrentUserProvider> */}
            <App />
          {/* </DataCurrentUserProvider> */}
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
