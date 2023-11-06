import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../core/contexts/UserProvider";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="text-xl normal-case btn btn-ghost">
          Cloud-File
        </Link>
      </div>
      <div className="flex-none">
        <ActionMenu />
      </div>
    </div>
  );
}

function ActionMenu() {
  const { user, loading } = useUserContext();
  const location = useLocation();
  if (loading) {
    return (
      <div className="menu menu-horizontal">
        <li>
          <span className="loading loading-spinner loading-sm"></span>
        </li>
      </div>
    );
  }
  if (user) {
    return (
      <>
        {location.pathname !== "/upload" && (
          <div className="menu menu-horizontal">
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </div>
        )}
        <UserProfile />
      </>
    );
  }
  return <LoginButton />;
}

function LoginButton() {
  const location = useLocation();
  if (location.pathname === "/login") return null;
  return (
    <div className="menu menu-horizontal">
      <li>
        <Link to="/login" className="font-bold">
          Login
        </Link>
      </li>
    </div>
  );
}

function UserProfile() {
  const { logout } = useUserContext();
  const location = useLocation();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://picsum.photos/100" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {location.pathname !== "/manage" && (
          <li>
            <Link to="/manage">Team</Link>
          </li>
        )}
        {location.pathname !== "/profile" && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
