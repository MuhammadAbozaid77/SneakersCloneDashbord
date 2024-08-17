type errorType = {
  error: any;
};

export default function ErrorFounded({ error }: errorType) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[200px]">
      <span> {error} </span>
    </div>
  );
}
