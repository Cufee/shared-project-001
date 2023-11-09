import { useEffect, useState } from "react";
import { useUserContext } from "../core/contexts/UserProvider";
import { useNotificationContext } from "../core/contexts/NotificationProvider";
import {
  createCompanyInvitation,
  getCompanyDetails,
  getCompanyWorkers,
  removeCompanyWorker,
} from "../core/api/company";
import { Company } from "../core/types/Company";
import { User } from "../core/types/User";

function Manage() {
  const { user } = useUserContext();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!user?.company) {
      setLoading(false);
      return;
    }

    getCompanyDetails(user?.company!).then((company) => {
      setCompany(company.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // ProtectedRoute should prevent this
  if (!company) return <div>You are not part of a company</div>;

  return (
    <div className="flex flex-col items-center w-full gap-4 max-w-7xl">
      <div className="flex flex-row w-full max-w-2xl join">
        <span className="flex items-center w-48 p-4 bg-gray-200">
          Company Name
        </span>
        <span className="flex-grow p-4 border border-gray-200 text-end">
          {company.name}
        </span>
      </div>

      {user.role === "moderator" && <ManageUsers />}
    </div>
  );
}

function ManageUsers() {
  const { error } = useNotificationContext();
  const [inviteToken, setInviteToken] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [workers, setWorkers] = useState<User[]>([]);

  const onInviteCreate = () => {
    createCompanyInvitation().then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        return;
      }
      setInviteToken(
        `${import.meta.env.VITE_FRONTEND_URL}/join?invite=${
          res.data.invitationToken
        }`
      );
      setInviteModalOpen(true);
    });
  };

  const removeUserHandler = (id: string) => {
    removeCompanyWorker(id).then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        return;
      }
      setWorkers(workers.filter((user) => user.id !== id));
    });
  };

  useEffect(() => {
    getCompanyWorkers().then((res) => {
      if (res.data) {
        setWorkers(res.data);
      } else {
        error(res.error.message, res.error.context);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl gap-2">
      <div className="w-full divider">Manage Users</div>
      <div className="flex justify-center gap-2">
        <button className="btn btn-primary" onClick={onInviteCreate}>
          Create New Invite Code
        </button>
      </div>

      <div className="flex flex-col w-full gap-2">
        {workers.map((user) => (
          <div className="flex flex-row items-center justify-between w-full">
            <span className="flex items-center h-full p-2 bg-gray-200">
              {user.name} {user.surname}
            </span>
            <div className="flex items-center justify-end flex-grow h-full gap-2 p-2 border border-gray-200">
              <span>@{user.username}</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => removeUserHandler(user.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {inviteToken && (
        <dialog id="invitation_modal" className="modal" open={inviteModalOpen}>
          <div className="border border-gray-200 modal-box">{inviteToken}</div>
          <form
            method="dialog"
            className="bg-black modal-backdrop bg-opacity-80"
          >
            <button onClick={() => setInviteModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default Manage;
