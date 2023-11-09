import { DeleteFile } from "../../core/api/files";
import { useNotificationContext } from "../../core/contexts/NotificationProvider";
import { File } from "../../core/types/File";

function FilesList({ files, refresh }: { refresh: () => void; files: File[] }) {
  const { error } = useNotificationContext();
  const deleteFile = (id: string) => {
    DeleteFile(id).then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        return;
      }
      refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <FileItem deleteFile={deleteFile} file={file} key={file.id} />
      ))}
    </div>
  );
}
export default FilesList;

function FileItem({
  file,
  deleteFile,
}: {
  file: File;
  deleteFile: (id: string) => void;
}) {
  const { info, error } = useNotificationContext();

  const shareHandler = () => {
    const link = `${
      import.meta.env.VITE_BACKEND_API_URL
    }/file-management/download/${file.generatedLink}`;
    const blob = new Blob([link], { type: "text/plain" });
    const data = new ClipboardItem({ "text/plain": blob });
    navigator.clipboard.write([data]).then(
      () => {
        info(`Download link for ${file.originalFileName} copied to clipboard`);
      },
      () => {
        error("Failed to copy link to clipboard");
      }
    );
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 p-2 hover:bg-gray-300">
      <span className="flex-grow">{file.originalFileName}</span>
      <div className="flex items-center gap-2">
        <span>{file.expirationDate}</span>
        <button className="btn btn-primary btn-sm" onClick={shareHandler}>
          Share
        </button>
        <button
          className="btn btn-error btn-sm"
          onClick={() => deleteFile(file.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
