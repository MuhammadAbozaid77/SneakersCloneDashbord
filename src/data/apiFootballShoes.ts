import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, firebaseStorage } from "./firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

const footballshoesCollection = collection(db, "footballshoes");

/* -------------------------------  Get Data Objects --------------------------- */
export interface FootballShoesData {
  id: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
  folderName: string;
}

export async function getFootballShoesData(): Promise<FootballShoesData[]> {
  try {
    const data = await getDocs(footballshoesCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as FootballShoesData[];
    return filteredData;
  } catch (error) {
    throw new Error("Can't Get Football Shoes Items");
  }
}

/* -------------------------------  Get FootballShoes Images --------------------------- */
export async function getFootballShoesImages(
  folderName: string
): Promise<string[]> {
  try {
    const folderRef = ref(firebaseStorage, `${folderName}/`);
    const res = await listAll(folderRef);
    const imageUrls: string[] = [];
    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);
      imageUrls.push(url);
    }
    return imageUrls;
  } catch (error) {
    throw new Error("Can't Get FootballShoes Images");
  }
}

/* -------------------------  Create FootballShoes Only Image and Details  -------------------- */
export async function getFootballShoesDetails(
  folderName: string,
  id: string
): Promise<{ imageDetails: string[]; detailsObject: FootballShoesData[] }> {
  const imageDetails = await getFootballShoesImages(folderName);
  const footballshoesDetails = await getFootballShoesData();
  const detailsObject = footballshoesDetails.filter((el) => el.id === id);
  return { imageDetails, detailsObject };
}

/* -------------------------------  Create FootballShoes  --------------------------- */
interface AddNewFootballShoesItemParams {
  productImages: FileList;
  folderName: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
}

export async function addNewFootballShoesItem(
  params: AddNewFootballShoesItemParams
): Promise<void> {
  try {
    await createFootballShoesFolderImage(
      params.folderName,
      params.productImages
    );
    await addDoc(footballshoesCollection, {
      folderName: params.folderName,
      productName: params.productName,
      productDescripition: params.productDescripition,
      productPrice: params.productPrice,
    });
  } catch (error) {
    throw new Error("Can't Create New FootballShoes");
  }
}

/* -------------------------------  Create FootballShoes Folder Image --------------------------- */
export async function createFootballShoesFolderImage(
  folderName: string,
  productImages: FileList
): Promise<void> {
  try {
    const storageRef = ref(firebaseStorage, `${folderName}/`);
    const uploadPromises = Array.from(productImages).map(async (image) => {
      const imageRef = ref(storageRef, image.name);
      await uploadBytes(imageRef, image);
    });
    await Promise.all(uploadPromises);
  } catch (error) {
    throw new Error("Can't Create New Image Folder");
  }
}

/* -------------------------------  Delete FootballShoes Item --------------------------- */
interface DeleteFootballShoesItemParams {
  folderName: string;
  id: string;
}

export async function deleteFootballShoesItem({
  folderName,
  id,
}: DeleteFootballShoesItemParams): Promise<void> {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "footballshoes", id);
    await deleteDoc(docObject);
  } catch (error) {
    throw new Error("Error Deleting Item");
  }
}

/* -------------------------------  Delete Folder Image --------------------------- */
export async function deleteFolderImage(folderName: string): Promise<void> {
  try {
    const folderRef = ref(firebaseStorage, `${folderName}/`);
    const res = await listAll(folderRef);
    for (const itemRef of res.items) {
      await deleteObject(itemRef);
    }
  } catch (error) {
    throw new Error("Error Deleting Folder");
  }
}

/* -------------------------------  Delete Image From Folder  --------------------------- */
export interface DeleteImageFromFolderParams {
  folderName: string;
  imageName: string;
}

export async function deleteImageFromFolder({
  folderName,
  imageName,
}: DeleteImageFromFolderParams): Promise<void> {
  const url = imageName;
  const [beforeFolder, rest] = url.split("%2F");
  const [imageURL] = rest.split("?alt=");
  console.log(beforeFolder);

  try {
    const fileRef = ref(firebaseStorage, `${folderName}/${imageURL}`);
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error(`Error Deleting Image: ${error}`);
  }
}

/* ----------------------------------- Edit FootballShoes Item Object ---------------------------------------- */
interface EditFootballShoesItemParams {
  values: Partial<FootballShoesData>;
  id: string;
}

export async function editFootballShoesItem({
  values,
  id,
}: EditFootballShoesItemParams): Promise<void> {
  const docObject = doc(db, "footballshoes", id);
  try {
    await updateDoc(docObject, values);
  } catch (error) {
    throw new Error("Can't Update This Item");
  }
}
