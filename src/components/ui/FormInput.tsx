export default function FormInput({ label, error, children }) {
  return (
    <>
      <div className="flex justify-center items-start flex-col mb-3">
        <label className="font-semibold text-gray-600" htmlFor={`${label}`}>
          {label}
        </label>
      </div>
      {children}
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
}
