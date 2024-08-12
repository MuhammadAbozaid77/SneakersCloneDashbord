import SpinnerLoading from "../../../components/ui/SpinnerLoading";
import useGetRunningShoes from "../../../hooks/runningShoesHook/useGetRunningShoes";
import TableItem from "./TableItem";

export default function TableRows() {
  const { isLoading, error, runningShoesData } = useGetRunningShoes();

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (error) {
    <> "Error" </>;
  }

  return (
    <>
      <div className="p-5">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>

                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {runningShoesData?.map((el, index) => (
                <TableItem item={el} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}