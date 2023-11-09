import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadFile } from "../../core/api/files";
import { useNotificationContext } from "../../core/contexts/NotificationProvider";

function UploadBox({ onUpload }: { onUpload: () => void }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useNotificationContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const uploadHandler = () => {
    setIsLoading(true);

    UploadFile(selectedFiles[0]).then((res) => {
      if (res.error) {
        error(res.error.message, res.error.context);
        setSelectedFiles([]);
      }
      if (res.data) {
        onUpload();
      }
      setIsLoading(false);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "application/zip": [".zip"] },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 group">
      {selectedFiles.length == 0 ? (
        <label
          htmlFor="dropzone-file"
          {...getRootProps()}
          className="flex items-center justify-center w-full h-full cursor-pointer group-hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {isDragActive ? (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Drop the files here
              </p>
            ) : (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            {...getInputProps()}
          />
        </label>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 pt-5 pb-6 cursor-default">
          {selectedFiles.map((file) => (
            <SelectedFile file={file} />
          ))}
          <button className="btn btn-primary" onClick={uploadHandler}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

function SelectedFile({ file }: { file: File }) {
  return <div>{file.name}</div>;
}

export default UploadBox;
