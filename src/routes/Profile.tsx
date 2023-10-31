import { PropsWithChildren, useState } from "react";
import useUserInfo from "../core/hooks/useUserInfo";
import { UpdateUsername } from "../core/api/user";

function Profile() {
  const { loading, user, save } = useUserInfo();
  if (loading) return null;
  if (!user) return null;

  const updateUsername = (username: string) => {
    UpdateUsername(username).then((res) => save(res.data || undefined));
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <ProfileField label="Role">{user.role}</ProfileField>
      <ProfileField label="Username">{user.username}</ProfileField>
      <ProfileField label="Name">{user.surname + " " + user.name}</ProfileField>
      <div className="flex gap-2">
        <ChangeUsernameModal username={user.username} save={updateUsername} />
        <ChangePasswordModal />
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
  return (
    <>
      <button onClick={() => setOpen(true)} className="w-48 btn">
        Change Username
      </button>
      <dialog id="username_change_modal" className="modal" open={open}>
        <div className="border border-gray-200 modal-box">
          <div className="w-full join">
            <input
              type="text"
              name="username"
              value={newUsername}
              className="w-full input input-bordered"
              placeholder="New Username"
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => save(newUsername)}
            >
              Save
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}

function ChangePasswordModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-48 btn">
        Change Password
      </button>
      <dialog id="password_change_modal" className="modal" open={open}>
        <div className="border border-gray-200 modal-box">
          <div className="flex flex-col w-full gap-2">
            <input
              type="password"
              name="currentPassword"
              className="w-full input input-bordered"
              placeholder="Current Password"
            />
            <input
              type="password"
              name="newPassword"
              className="w-full input input-bordered"
              placeholder="New Password"
            />
            <input
              type="password"
              name="newPasswordConfirm"
              className="w-full input input-bordered"
              placeholder="Confirm New Password"
            />
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
        <form method="dialog" className="bg-black modal-backdrop bg-opacity-40">
          <button onClick={() => setOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Profile;
