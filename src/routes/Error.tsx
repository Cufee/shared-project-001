function Error({ code, message }: { code: number; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="font-bold text-center text-9xl">{code}</span>
      <span className="text-xl">{message}</span>
    </div>
  );
}
export default Error;
