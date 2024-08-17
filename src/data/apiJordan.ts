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

const jordanCollection = collection(db, "jordan");

/* -------------------------------  Get Data Objects --------------------------- */
export interface JordanData {
  id: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
  folderName: string;
}

export async function getJordanData(): Promise<JordanData[]> {
  try {
    const data = await getDocs(jordanCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as JordanData[];
    return filteredData;
  } catch (error) {
    throw new Error("Can't Get Jordan Items");
  }
}

/* -------------------------------  Get Jordan Images --------------------------- */
export async function getJordanImages(folderName: string): Promise<string[]> {
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
    throw new Error("Can't Get Jordan Images");
  }
}

/* -------------------------  Create Jordan Only Image and Details  -------------------- */
export async function getJordanDetails(
  folderName: string,
  id: string
): Promise<{ imageDetails: string[]; detailsObject: JordanData[] }> {
  const imageDetails = await getJordanImages(folderName);
  const jordanDetails = await getJordanData();
  const detailsObject = jordanDetails.filter((el) => el.id === id);
  return { imageDetails, detailsObject };
}

/* -------------------------------  Create Jordan  --------------------------- */
interface AddNewJordanItemParams {
  productImages: FileList;
  folderName: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
}

export async function addNewJordanItem(
  params: AddNewJordanItemParams
): Promise<void> {
  try {
    await createJordanFolderImage(params.folderName, params.productImages);
    await addDoc(jordanCollection, {
      folderName: params.folderName,
      productName: params.productName,
      productDescripition: params.productDescripition,
      productPrice: params.productPrice,
    });
  } catch (error) {
    throw new Error("Can't Create New Jordan");
  }
}

/* -------------------------------  Create Jordan Folder Image --------------------------- */
export async function createJordanFolderImage(
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

/* -------------------------------  Delete Jordan Item --------------------------- */
export interface DeleteJordanItemParams {
  folderName: string;
  id: string;
}

export async function deleteJordanItem({
  folderName,
  id,
}: DeleteJordanItemParams): Promise<void> {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "jordan", id);
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

/* ----------------------------------- Edit Jordan Item Object ---------------------------------------- */
export interface EditJordanItemParams {
  values: Partial<JordanData>;
  id: string;
}

export async function editJordanItem({
  values,
  id,
}: EditJordanItemParams): Promise<void> {
  const docObject = doc(db, "jordan", id);
  try {
    await updateDoc(docObject, values);
  } catch (error) {
    throw new Error("Can't Update This Item");
  }
}
