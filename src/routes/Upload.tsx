import FilesList from "../components/upload/FilesList";
import UploadBox from "../components/upload/UploadBox";

function Upload() {
  return (
    <div className="relative flex flex-col w-full h-full max-w-7xl">
      <div className="flex items-center justify-center w-full h-1/4">
        <UploadBox />
      </div>
      <div className="divider"></div>
      <FilesList />
    </div>
  );
}
export default Upload;
