import { File } from "../../core/types/File";

function FilesList({ files }: { files: File[] }) {
  files = new Array(10).fill({
    name: "test",
    size: 100,
    type: "test",
    url: "test",
  });

  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <FileItem file={file} />
      ))}
    </div>
  );
}
export default FilesList;

function FileItem({ file }: { file: File }) {
  return (
    <div className="flex flex-row justify-between gap-2">
      <span className="flex-grow">{file.name}</span>
      <div className="flex gap-2">
        <span>{file.type}</span>
        <button className="btn btn-sm">Delete</button>
      </div>
    </div>
  );
}
