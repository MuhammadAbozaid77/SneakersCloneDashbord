type childrenProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: childrenProps) {
  return (
    <>
      <div className="bg-white rounded shadow py-5 mb-2"> {children} </div>
    </>
  );
}
