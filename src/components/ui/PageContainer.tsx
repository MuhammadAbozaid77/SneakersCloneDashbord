export default function PageContainer({ children }) {
  return (
    <>
      <div className="bg-white rounded shadow py-5 mb-2"> {children} </div>
    </>
  );
}
