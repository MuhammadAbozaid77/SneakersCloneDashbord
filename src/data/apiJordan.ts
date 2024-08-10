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
export async function GetJordanImages(argsFolderName) {
  try {
    const folderRef = ref(firebaseStorage, `${argsFolderName}/`);
    const res = await listAll(folderRef);
    //
    const imageUrls = [];
    //
    for (const itemRef of res.items) {
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

/* -------------------------------  Create Jordan  --------------------------- */
export async function createJordanItem(newJordanItem) {
  try {
    // await createJordanFolderImage(newJordanItem);
    await addDoc(jordanCollection, newJordanItem);
  } catch (error) {
    throw new Error("Cant Craeted New Jordan");
  }
}
/* -------------------------------  Create Jordan Folder Image --------------------------- */
export async function createJordanFolderImage({ folderName, folderImage }) {
  try {
    const storageRef = ref(firebaseStorage, `${folderName}/`);

    const uploadPromises = Array.from(folderImage).map(async (image) => {
      const imageRef = ref(storageRef, `${image?.name}`);
      await uploadBytes(imageRef, image);
      await Promise.all(uploadPromises);
    });
  } catch (error) {
    throw new Error("Cant Craeted New Image Folder");
  }
}

/* -------------------------------  Delete Jordan Item --------------------------- */
export async function deleteJordanItem({ imageFolderName, id }) {
  try {
    await deleteFolderImage(imageFolderName);

    const docObject = doc(db, "jordan", id);
    try {
      await deleteDoc(docObject);
    } catch (error) {
      throw new Error("Cant Delete This Cabin");
    }
  } catch (error) {
    console.error("Error deleting Item:", error);
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
    console.error("Error deleting folder:", error);
  }
}
/* -------------------------------  Delete Image From Folder  --------------------------- */

export async function deleteImageFromFolder(folderName, imageName) {
  try {
    // Create a reference to the file to delete
    const fileRef = ref(
      firebaseStorage,
      `${"Muhammaded77Picsss"}/${"images.jfif"}`
    );
    // Delete the file
    await deleteObject(fileRef);

    // console.log(`Image '${imageName}' deleted successfully from folder '${folderName}'.`);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
