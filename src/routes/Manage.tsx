import { useEffect, useState } from "react";
import { useUserContext } from "../core/contexts/UserProvider";
import { useNotificationContext } from "../core/contexts/NotificationProvider";
import { getCompanyDetails } from "../core/api/company";

function Manage() {
  const { error } = useNotificationContext();
  const { token, user } = useUserContext();

  const [company, setCompany] = useState<{} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const companyId = user?.worksFor?.id || user?.ownedCompany?.id;
    if (!companyId) error("You are not part of a company");
    setLoading(false);

    getCompanyDetails(token!, companyId!).then((company) => {
      console.log(company);
      setCompany(company.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>Company Info</div>
      <div>Users</div>
    </div>
  );
}
export default Manage;
