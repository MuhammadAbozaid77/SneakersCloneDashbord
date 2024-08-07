export default function PageContainer({ children }) {
  return (
    <>
      <div className="bg-white rounded shadow py-5"> {children} </div>
    </>
  );
}
