import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider  } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { CartProvider } from './providers/CartProvider.tsx'
import './index.css'
import App from './App.tsx'
import { queryClient } from './lib/tanstackQuery/queryClient.ts'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
