import React from 'react'
import Footer from '../components/module/home/Footer/Footer'
import Navbar from "../components/module/home/Navbar/Navbar";
import EditProfile from '../components/module/Profile/EditProfile'

const Profil = () => {
  return (
    <div>
      <Navbar />
      <EditProfile />
      <Footer />
    </div>
  );
}

export default Profil