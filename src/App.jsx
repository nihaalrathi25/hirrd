import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css" 
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/app-layout.jsx'
import LandingPage from './pages/landing.jsx'
import OnBoarding from './pages/onboarding.jsx'
import JobListing from './pages/job-listing.jsx'
import JobPage from './pages/job.jsx'
import SavedJobs from './pages/saved-jobs.jsx'
import PostJob from './pages/post-job.jsx'
import MyJobs from './pages/my-jobs.jsx'
import { ThemeProvider } from './components/theme-provider.jsx';
import ProtectedRoute from './components/protected-route.jsx'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnBoarding/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
    </ThemeProvider>
    
  )
}

export default App
