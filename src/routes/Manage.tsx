import { useEffect, useState } from "react";
import { useUserContext } from "../core/contexts/UserProvider";
import { useNotificationContext } from "../core/contexts/NotificationProvider";
import {
  createCompanyInvitation,
  getCompanyDetails,
} from "../core/api/company";
import { Company } from "../core/types/Company";

function Manage() {
  const { error } = useNotificationContext();
  const { user } = useUserContext();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteToken, setInviteToken] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const onInviteCreate = () => {
    createCompanyInvitation().then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        return;
      }
      console.log(res);
      setInviteToken(
        `${import.meta.env.VITE_FRONTEND_URL}/join?invite=${
          res.data.invitationToken
        }`
      );
      setInviteModalOpen(true);
    });
  };

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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full max-w-2xl join">
        <span className="flex items-center w-48 p-4 bg-gray-200">
          Company Name
        </span>
        <span className="flex-grow p-4 border border-gray-200 text-end">
          {company.name}
        </span>
      </div>

      <div className="flex justify-center">
        <button className="btn btn-primary" onClick={onInviteCreate}>
          Create New Invite Code
        </button>
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

      {user.role === "moderator" && <ManageUsers companyId={user.company} />}
    </div>
  );
}

function ManageUsers({ companyId: string }: { companyId: string }) {
  // my/workers
  return <div>ManageUsers</div>;
}

export default Manage;
