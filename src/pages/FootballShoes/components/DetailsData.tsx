export default function DetailsData({ footballShoesDetails }) {
  return (
    <>
      <div className="text-[18px] flex">
        <span className="px-1 shadow min-w-[150px] bg-gray-200">
          Product ID:
        </span>
        <span className="mx-2 font-semibold">
          {footballShoesDetails?.detailsObject[0]?.id}
        </span>
      </div>
      <div className="text-[18px] flex">
        <span className="px-1 shadow min-w-[150px] bg-gray-200">
          Product Name:
        </span>
        <span className="mx-2 font-semibold">
          {footballShoesDetails?.detailsObject[0]?.productName}
        </span>
      </div>
      <div className="text-[18px] flex">
        <span className="px-1 shadow min-w-[150px] bg-gray-200">
          Product Price:
        </span>
        <span className="mx-2 font-semibold">
          {footballShoesDetails?.detailsObject[0]?.productPrice}
        </span>
      </div>
      <div className="text-[18px] flex">
        <span className="px-1 shadow min-w-[150px] bg-gray-200">
          {" "}
          Descripition:
        </span>
        <span className="mx-2 font-semibold">
          {footballShoesDetails?.detailsObject[0]?.productDescripition}
        </span>
      </div>
    </>
  );
}
