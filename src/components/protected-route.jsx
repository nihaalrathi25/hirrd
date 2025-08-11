import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) return null; // or loading spinner

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" state={{ from: pathname }} />;
  }

  // If signed in but user has no role, redirect to onboarding (except when already there)
  if (
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoute;
