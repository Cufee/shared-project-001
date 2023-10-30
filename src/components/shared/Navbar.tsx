function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl normal-case btn btn-ghost" href="/">
          Cloud-File
        </a>
      </div>
      <div className="flex-none">
        <div className="menu menu-horizontal">
          <li>
            <a href="/upload">Upload</a>
          </li>
        </div>
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
            <li>
              <a href="/manage">Team</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
