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

const runningShoesCollection = collection(db, "runningshoes");

/* -------------------------------  Get Data Objects --------------------------- */
export interface RunningShoes {
  id: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
  folderName: string;
}

export async function getRunningShoesData(): Promise<RunningShoes[]> {
  try {
    const data = await getDocs(runningShoesCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as RunningShoes[];
    return filteredData;
  } catch (error) {
    throw new Error("Can't Get RunningShoes Items");
  }
}

/* -------------------------------  Get RunningShoes Images --------------------------- */
export async function getRunningShoesImages(
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
    throw new Error("Can't Get RunningShoes Images");
  }
}

/* -------------------------  Create RunningShoes Only Image and Details  -------------------- */
export async function getRunningShoesDetails(
  folderName: string,
  id: string
): Promise<{ imageDetails: string[]; detailsObject: RunningShoes[] }> {
  const imageDetails = await getRunningShoesImages(folderName);
  const runningshoesDetails = await getRunningShoesData();
  const detailsObject = runningshoesDetails.filter((el) => el.id === id);
  return { imageDetails, detailsObject };
}

/* -------------------------------  Create RunningShoes  --------------------------- */
interface AddNewRunningShoesItemParams {
  productImages: FileList;
  folderName: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
}

export async function addNewRunningShoesItem(
  params: AddNewRunningShoesItemParams
): Promise<void> {
  try {
    await createRunningShoesFolderImage(
      params.folderName,
      params.productImages
    );
    await addDoc(runningShoesCollection, {
      folderName: params.folderName,
      productName: params.productName,
      productDescripition: params.productDescripition,
      productPrice: params.productPrice,
    });
  } catch (error) {
    throw new Error("Can't Create New RunningShoes");
  }
}

/* -------------------------------  Create RunningShoes Folder Image --------------------------- */
export async function createRunningShoesFolderImage(
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

/* -------------------------------  Delete RunningShoes Item --------------------------- */
interface DeleteRunningShoesItemParams {
  folderName: string;
  id: string;
}

export async function deleteRunningShoesItem({
  folderName,
  id,
}: DeleteRunningShoesItemParams): Promise<void> {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "runningshoes", id);
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
  folderName: any;
  imageName: any;
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

/* ----------------------------------- Edit RunningShoes Item Object ---------------------------------------- */
interface EditRunningShoesItemParams {
  values: Partial<RunningShoes>;
  id: string;
}

export async function editRunningShoesItem({
  values,
  id,
}: EditRunningShoesItemParams): Promise<void> {
  const docObject = doc(db, "runningshoes", id);
  try {
    await updateDoc(docObject, values);
  } catch (error) {
    throw new Error("Can't Update This Item");
  }
}
