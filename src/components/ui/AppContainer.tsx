type childrenProps = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: childrenProps) {
  return (
    <>
      <div className="p-2 mx-auto bg-gray-100">{children}</div>
    </>
  );
}
