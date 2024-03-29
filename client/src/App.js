import logo from './logo.svg';
import './App.css';
import Post from './post'
import Header from './Header'
import {Route, Routes} from "react-router-dom"
import Layout from './Layout';
import Indexpage from './pages/indexpage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {UserContextProvider} from "./UserContext";
import PostPage from "./pages/PostPage";
import SinglePost from "./pages/SinglePost";
import EditPost from './pages/EditPost';

function App() {
  return (
    <UserContextProvider>
  <Routes>

    <Route path='/' element={<Layout />}>

      <Route index element={<Indexpage />} />

      <Route path={"/login"} 
      element={
        <LoginPage/>
      }>
      </Route>
      <Route path={"/register"} 
      element={
        <RegisterPage/>
      }>
      </Route>
      <Route path='/create' element={ <PostPage />}>

      </Route>
      <Route path='/post/:id' element={ <SinglePost />}> </Route>
      <Route path='/edit/:id' element={ <EditPost />}> </Route>

    </Route>
 
  </Routes>
  </UserContextProvider>
   
  );
} 

export default App;
