import { Link, Links } from "react-router-dom";
import Styles from "../CSS/Header.module.scss";
const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.header_links}>
        <p>
          <Link to="/">Live Writing</Link>
        </p>
        <div className={Styles.separator}></div>
        <p>
          <Link to="/list">Recopilation</Link>
        </p>
        <div className={Styles.separator}></div>
        <p>
          <Link to="/graphs">Graficas</Link>
        </p>
      </div>
    </header>
  );
};
export default Header;
