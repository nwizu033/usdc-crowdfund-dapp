import Navbar from "../components/Navbar";
import Footer from "../components/Navbar";
const Layout = ({ children }) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}
 
export default Layout;