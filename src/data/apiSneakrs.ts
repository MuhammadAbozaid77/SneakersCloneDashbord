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

const sneakersCollection = collection(db, "sneakers");

/* -------------------------------  Get Data Objects --------------------------- */
export interface SneakersData {
  id: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
  folderName: string;
}

export async function getSneakersData(): Promise<SneakersData[]> {
  try {
    const data = await getDocs(sneakersCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as SneakersData[];
    return filteredData;
  } catch (error) {
    throw new Error("Can't Get Sneakers Items");
  }
}

/* -------------------------------  Get Sneakers Images --------------------------- */
export async function getSneakersImages(folderName: string): Promise<string[]> {
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
    throw new Error("Can't Get Sneakers Images");
  }
}

/* -------------------------  Create Sneakers Only Image and Details  -------------------- */
export async function getSneakersDetails(
  folderName: string,
  id: string
): Promise<{ imageDetails: string[]; detailsObject: SneakersData[] }> {
  const imageDetails = await getSneakersImages(folderName);
  const sneakersDetails = await getSneakersData();
  const detailsObject = sneakersDetails.filter((el) => el.id === id);
  return { imageDetails, detailsObject };
}

/* -------------------------------  Create New Sneakers Item --------------------------- */
interface AddNewSneakersItemParams {
  productImages: FileList;
  folderName: string;
  productName: string;
  productDescripition: string;
  productPrice: number;
}

export async function addNewSneakersItem(
  params: AddNewSneakersItemParams
): Promise<void> {
  try {
    await createSneakersFolderImage(params.folderName, params.productImages);
    await addDoc(sneakersCollection, {
      folderName: params.folderName,
      productName: params.productName,
      productDescripition: params.productDescripition,
      productPrice: params.productPrice,
    });
  } catch (error) {
    throw new Error("Can't Create New Sneakers");
  }
}

/* -------------------------------  Create Sneakers Folder Image --------------------------- */
export async function createSneakersFolderImage(
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

/* -------------------------------  Delete Sneakers Item --------------------------- */
interface DeleteSneakersItemParams {
  folderName: string;
  id: string;
}

export async function deleteSneakersItem({
  folderName,
  id,
}: DeleteSneakersItemParams): Promise<void> {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "sneakers", id);
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
interface DeleteImageFromFolderParams {
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

  try {
    const fileRef = ref(firebaseStorage, `${folderName}/${imageURL}`);
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error(`Error Deleting Image: ${error?.message}`);
  }
}

/* ----------------------------------- Edit Jordan Item Object ---------------------------------------- */
interface EditSneakersItemParams {
  values: Partial<SneakersData>;
  id: string;
}

export async function editSneakersItem({
  values,
  id,
}: EditSneakersItemParams): Promise<void> {
  const docObject = doc(db, "sneakers", id);
  try {
    await updateDoc(docObject, values);
  } catch (error) {
    throw new Error("Can't Update This Item");
  }
}
