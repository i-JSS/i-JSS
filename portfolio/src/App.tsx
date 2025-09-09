import './App.css'
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Certifications from "./components/certifications";

function App() {

  return (
    <>
        <Navbar/>
        <div className="main-content">
            <Certifications/>
        </div>
        <Footer/>
    </>
  )
}

export default App
