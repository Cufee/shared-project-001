import { useEffect, useState } from "react";
import FilesList from "../components/upload/FilesList";
import UploadBox from "../components/upload/UploadBox";
import { File } from "../core/types/File";
import { CompanyFiles, UserFiles } from "../core/api/files";
import { useNotificationContext } from "../core/contexts/NotificationProvider";
import { useUserContext } from "../core/contexts/UserProvider";

function Upload() {
  const { error } = useNotificationContext();
  const { user } = useUserContext();

  const [loadingFiles, setLoadingFiles] = useState(true);
  const [companyFiles, setCompanyFiles] = useState<File[]>([]);
  const [userFiles, setUserFiles] = useState<File[]>([]);

  const refreshFiles = () => {
    setLoadingFiles(true);

    UserFiles()
      .then((res) => {
        if (res.error) {
          error(res.error.message, res.error.context);
          return;
        }
        if (res.data) {
          setUserFiles(res.data);
        }
      })
      .finally(() => setLoadingFiles(false));

    if (user!.role === "moderator") {
      CompanyFiles().then((res) => {
        if (res.error) {
          error(res.error.message, res.error.context);
          return;
        }
        if (res.data) {
          setCompanyFiles(res.data);
        }
      });
    }
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full p-4 m-auto max-w-7xl">
      <div className="flex items-center justify-center w-full h-1/4">
        <UploadBox onUpload={refreshFiles} />
      </div>
      <div className="divider"></div>
      {loadingFiles ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1">
            <div className="w-full">
              <FilesList refresh={refreshFiles} files={userFiles} />
            </div>
          </div>
          {user?.role === "moderator" && (
            <>
              <div className="divider"></div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">All Company Files</span>
                <div className="w-full">
                  <FilesList refresh={refreshFiles} files={companyFiles} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Upload;
