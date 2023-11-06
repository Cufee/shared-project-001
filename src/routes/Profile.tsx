import { PropsWithChildren, useState } from "react";
import { UpdatePassword, UpdateUsername } from "../core/api/user";
import { useUserContext } from "../core/contexts/UserProvider";
import { useNotificationContext } from "../core/contexts/NotificationProvider";

function Profile() {
  const { user, refetch, logout } = useUserContext();
  const { error } = useNotificationContext();

  const updateUsername = (username: string) => {
    UpdateUsername(username).then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        return;
      }
      refetch();
    });
  };

  const updatePassword = (old: string, changed: string, confirm: string) => {
    if (changed !== confirm) return error("Passwords do not match");
    UpdatePassword(old, changed).then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        return;
      }
      logout();
    });
  };

  if (!user) return null; // ProtectedRoute should prevent this
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <ProfileField label="Role">{user.role}</ProfileField>
      <ProfileField label="Username">{user.username}</ProfileField>
      <ProfileField label="Name">{user.surname + " " + user.name}</ProfileField>
      <div className="flex gap-2">
        <ChangeUsernameModal username={user.username} save={updateUsername} />
        <ChangePasswordModal save={updatePassword} />
      </div>
    </div>
  );
}

function ProfileField({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex flex-row w-full max-w-2xl join">
      <span className="flex items-center w-48 p-4 bg-gray-200">{label}</span>
      <span className="flex-grow p-4 border border-gray-200 text-end">
        {children}
      </span>
    </div>
  );
}

function ChangeUsernameModal({
  save,
  username,
}: {
  save: (username: string) => void;
  username: string;
}) {
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save(newUsername);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-48 btn">
        Change Username
      </button>
      <dialog id="username_change_modal" className="modal" open={open}>
        <div className="border border-gray-200 modal-box">
          <form className="w-full join" onSubmit={handleSubmit}>
            <input
              autoComplete="username"
              type="text"
              name="username"
              value={newUsername}
              className="w-full input input-bordered"
              placeholder="New Username"
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
        <form method="dialog" className="bg-black modal-backdrop bg-opacity-80">
          <button onClick={() => setOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}

function ChangePasswordModal({
  save,
}: {
  save: (old: string, changed: string, confirm: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save(password, newPassword, confirmPassword);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-48 btn">
        Change Password
      </button>
      <dialog id="password_change_modal" className="modal" open={open}>
        <div className="border border-gray-200 modal-box">
          <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
            <input
              autoComplete="password"
              type="password"
              name="currentPassword"
              className="w-full input input-bordered"
              placeholder="Current Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              autoComplete="new-password"
              type="password"
              name="newPassword"
              className="w-full input input-bordered"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              autoComplete="new-password"
              type="password"
              name="newPasswordConfirm"
              className="w-full input input-bordered"
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
        <form method="dialog" className="bg-black modal-backdrop bg-opacity-80">
          <button onClick={() => setOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Profile;
