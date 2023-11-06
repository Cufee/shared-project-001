import { useEffect, useState } from "react";
import { useUserContext } from "../core/contexts/UserProvider";
import { useNotificationContext } from "../core/contexts/NotificationProvider";
import {
  createCompanyInvitation,
  getCompanyDetails,
} from "../core/api/company";

function Manage() {
  const { error } = useNotificationContext();
  const { user } = useUserContext();

  const [company, setCompany] = useState<{ name: string } | null>(null);
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
    const companyId = user?.worksFor?.id || user?.ownedCompany?.id;
    if (!companyId) error("You are not part of a company");
    setLoading(false);

    getCompanyDetails(companyId!).then((company) => {
      setCompany(company.data);
      setLoading(false);
    });
  }, []);

  if (!user) return null; // ProtectedRoute should prevent this
  if (loading) return null;
  if (!company) return null;
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
    </div>
  );
}

export default Manage;
