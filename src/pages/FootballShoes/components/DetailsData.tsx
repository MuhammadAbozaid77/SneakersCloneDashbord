type DetailsObject = {
  id: string;
  productName: string;
  productPrice: string;
  productDescripition: string;
};

type FoootballShoesDetailsType = {
  detailsObject: DetailsObject[];
};

type DetailsDataProps = {
  footballShoesDetails: FoootballShoesDetailsType | any;
};

export default function DetailsData({
  footballShoesDetails,
}: DetailsDataProps) {
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
