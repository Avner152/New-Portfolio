import "bootstrap/dist/css/bootstrap.min.css";

import "./CSS/App.css";
import Header from "./Components/Header";
import Body from "./Components/Pages/Body";
import ContactUs from "./Components/Pages/ContactUs";
import Edit from "./Components/Pages/Edit";
import Profile from "./Components/Pages/Profile";
import Set from "./Components/Pages/Set";
import NotFound from "./Components/Pages/404";
import Main from "./Components/Pages/Main";
import Footer from "./Components/Footer";
import SetList from "./Components/Pages/SetList";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("scrolled up");
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/sets/:_set" element={<SetList />}></Route>
          <Route path="/set" element={<Body />}></Route>
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="edit" element={<Edit />} />
          <Route path="/set/:set_id" element={<Set />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
