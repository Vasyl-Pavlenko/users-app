import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ShareButton from './components/ShareButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UniversalList from './components/UniversalList';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetail from './components/PostDetail';
import UserDetail from './components/UserDetails';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
      <Header />

      <Container>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />} 
          />

          <Route
            path="/posts"
            element={<UniversalList />}
          />

          <Route path="/users" element={<UserDetail />} />

          <Route
            path="/posts/:userId/:id"
            element={<PostDetail />}
          />

          <Route
            path="/albums"
            element={<UniversalList />}
          />

          <Route
            path="/*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>

        <ShareButton />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}


export default App;
