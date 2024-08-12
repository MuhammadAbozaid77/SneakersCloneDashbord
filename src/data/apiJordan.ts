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
export async function getJordanData() {
  try {
    const data = await getDocs(jordanCollection);
    const filteredData = data.docs?.map((doc, index) => ({
      ...doc?.data(),
      id: doc?.id,
    }));
    return filteredData;
  } catch (error) {
    if (error) {
      throw new Error("Cant Get Jordan Items");
    } else {
      return [];
    }
  }
}
/* -------------------------------  Get Jordan Images --------------------------- */
export async function GetJordanImages({ folderName }) {
  try {
    const folderRef = ref(firebaseStorage, `${folderName}/`);
    const res = await listAll(folderRef);
    const imageUrls = [];
    //
    for (const itemRef of res?.items) {
      const url = await getDownloadURL(itemRef);
      imageUrls.push(url);
    }
    //
    return imageUrls;
  } catch (error) {
    if (error) {
      throw new Error("Cant Get Jordan Images");
    } else {
      return [];
    }
  }
}
/* -------------------------  Create Jordan Only Image and Details  -------------------- */
export async function getJordanDetails(folderName, id) {
  const imageDetails = await GetJordanImages({ folderName });
  const jordanDetails = await getJordanData();
  const detailsObject = jordanDetails?.filter((el) => {
    return el.id === id;
  });
  return { imageDetails, detailsObject };
}

/* -------------------------------  Create Jordan  --------------------------- */
export async function addNewJordanItem({
  productImages,
  folderName,
  productName,
  productDescripition,
  productPrice,
}) {
  try {
    await createJordanFolderImage(folderName, productImages);
    await addDoc(jordanCollection, {
      folderName,
      productName,
      productDescripition,
      productPrice,
    });
  } catch (error) {
    throw new Error("Cant Craeted New Jordan");
  }
}
/* -------------------------------  Create Jordan Folder Image --------------------------- */
export async function createJordanFolderImage(folderName, productImages) {
  try {
    const storageRef = ref(firebaseStorage, `${folderName}/`);
    const uploadPromises = Array.from(productImages).map(async (image) => {
      const imageRef = ref(storageRef, `${image?.name}`);
      await uploadBytes(imageRef, image);
      await Promise.all(uploadPromises);
    });
  } catch (error) {
    throw new Error("Cant Craeted New Image Folder");
  }
}

/* -------------------------------  Delete Jordan Item --------------------------- */
export async function deleteJordanItem({ folderName, id }) {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "jordan", id);
    try {
      await deleteDoc(docObject);
    } catch (error) {
      throw new Error("Cant Delete Item");
    }
  } catch (error) {
    throw new Error("Error Deleting Item:", error);
  }
}

/* -------------------------------  Delete Folder Image --------------------------- */
export async function deleteFolderImage(folderName) {
  try {
    // Create a reference to the folder
    const folderRef = ref(firebaseStorage, "Muhammaded77Picsss");
    // List all files in the folder
    const res = await listAll(folderRef);
    // Iterate through each file and delete it
    for (const itemRef of res.items) {
      await deleteObject(itemRef);
    }
  } catch (error) {
    throw new Error("Error deleting folder:");
  }
}
/* -------------------------------  Delete Image From Folder  --------------------------- */

export async function deleteImageFromFolder({ folderName, imageName }) {
  const url = imageName;
  const [beforeFolder, rest] = url.split("%2F");
  const [imageURL] = rest.split("?alt=");

  try {
    // Create a reference to the file to delete
    const fileRef = ref(firebaseStorage, `${folderName}/${imageURL}`);
    // Delete the file
    await deleteObject(fileRef);
  } catch (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
}

/* ----------------------------------- Edit Jordan Item Object ---------------------------------------- */
export async function editJordanItem({ values, id }) {
  const docObject = doc(db, "jordan", id);
  try {
    await updateDoc(docObject, values);
  } catch (error) {
    throw new Error("Cant Updated This Cabin");
  }
}
