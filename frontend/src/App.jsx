import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';

// import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';

const AuthenticatedRoute = ({children}) => {
  if (localStorage.getItem('user')) {
    return children;
  }
  return <Navigate to ='/login' replace />;
};

// import Dummy from './components/Dummy';
// import Emoji from './components/Emoji';

// /**
//  * Simple component with no state.
//  *
//  * @return {object} JSX
//  */
// function App() {
//   return (
//     <div>
//       <Dummy />
//       <Emoji />
//     </div>
//   );
// }

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute >
              <Home />
            </AuthenticatedRoute>
          }
        />
        <Route path="/login" exact element={<Login />} />
        <Route
          path="*"
          element={
            <AuthenticatedRoute >
              <NotFound />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
