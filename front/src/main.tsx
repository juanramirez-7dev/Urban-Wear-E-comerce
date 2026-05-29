import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider  } from "@tanstack/react-query"
import { AuthProvider } from './providers/AuthProvider.tsx'
import './index.css'
import App from './App.tsx'
import { queryClient } from './lib/tanstackQuery/queryClient.ts'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
