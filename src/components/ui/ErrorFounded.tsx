export default function ErrorFounded({ error }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[200px]">
      <span> {error} </span>
    </div>
  );
}
