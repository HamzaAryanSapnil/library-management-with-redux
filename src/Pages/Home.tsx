import Footer from "@/components/layouts/Footer"
import Navbar from "@/components/layouts/Navbar"
import { Outlet } from "react-router"


const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
