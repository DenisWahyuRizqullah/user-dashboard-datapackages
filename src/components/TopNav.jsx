import { Menu, Switch } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import "./TopNav.css";

const menuItems = [
  { key: "/dashboard", label: "Dashboard" },
  { key: "/customer", label: "Customer" },
  { key: "/transactions", label: "Transaksi" },
];

function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const currentPath = location.pathname;
  const activeItem =
    menuItems.find((item) => currentPath.startsWith(item.key)) || menuItems[0];
  const selectedKey = activeItem.key;

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="topnav-wrapper">
      <div className="topnav-left">
        <h1>{activeItem.label}</h1>
      </div>

      <div className="topnav-center">
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>

      <div className="topnav-right">
        <div className="theme-toggle">
          <span>{theme === "dark" ? "Dark" : "Light"} mode</span>
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            size="small"
          />
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopNav;

