import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout_content}>
            <Navbar />

            { children }

            <Footer />
        </div>
    );
};

export default Layout;