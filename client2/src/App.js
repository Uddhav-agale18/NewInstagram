import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/NavBar';
import "./App.css"
import {BrowserRouter as Router,Route,Routes,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState } from './reducer/userReducer';
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/Newpassword'; 
export const UserContext = createContext()

const Routing=()=>{
  const navigate = useNavigate()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
     if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!window.location.pathname.startsWith===('/reset'))
      navigate('/signin')
    }
  },[])

  return(
    
    <Routes>

    <Route exact path="/" element={<Home />} />

    
    <Route path ="/signin"element={<Signin />} />

  
    <Route path ="/signup"element={<Signup />} />


    <Route exact path ="/profile"element={<Profile />} />
    
    <Route path ="/create"element={<CreatePost />} />
    
    <Route path ="/profile/:userid"element={<UserProfile />} />

    <Route path ="/myfollowingpost"element={<SubscribedUserPosts />} />

     <Route exact path ="/reset"element={<Reset />} />
    
    <Route path ="/reset/:token"element={<NewPassword />} />

    </Routes>
  )
}


function App() {
  const [state,dispatch]= useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>

     
    
    <Router>

     <NavBar/>
    <Routing/>

    </Router>
    </UserContext.Provider>
  );
}

export default App
