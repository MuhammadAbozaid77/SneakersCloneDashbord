import SpinnerLoading from "../../../components/ui/SpinnerLoading";
import TableItem from "./TableItem";
import ErrorFounded from "../../../components/ui/ErrorFounded";
import NoDataToDisplay from "../../../components/ui/NoDataToDisplay";
import PageContainer from "../../../components/ui/PageContainer";
import useGetSneakers from "../../../hooks/sneakrsHooks/useGetSneakers";

export default function TableRows() {
  const { isLoading, error, sneakersData } = useGetSneakers();

  if (isLoading) {
    return (
      <>
        <SpinnerLoading />;
      </>
    );
  }
  if (error) {
    return (
      <>
        <ErrorFounded error={error} />
      </>
    );
  }

  if (sneakersData?.length === 0 || null) {
    return <NoDataToDisplay />;
  }

  return (
    <PageContainer>
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
              {sneakersData?.map((el, index) => (
                <TableItem item={el} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
