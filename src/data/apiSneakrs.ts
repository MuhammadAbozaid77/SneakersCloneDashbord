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

const sneakrsCollection = collection(db, "sneakrs");
/* -------------------------------  Get Data Objects --------------------------- */
export async function getSneakrsData() {
  try {
    const data = await getDocs(sneakrsCollection);
    const filteredData = data.docs?.map((doc, index) => ({
      ...doc?.data(),
      id: doc?.id,
    }));
    return filteredData;
  } catch (error) {
    if (error) {
      throw new Error("Cant Get Sneakrs Items");
    } else {
      return [];
    }
  }
}
/* -------------------------------  Get Sneakrs Images --------------------------- */
export async function GetSneakrsImages({ folderName }) {
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
      throw new Error("Cant Get Sneakrs Images");
    } else {
      return [];
    }
  }
}

/* -------------------------------  Create Sneakrs  --------------------------- */
export async function addNewSneakrsItem({
  productImages,
  folderName,
  productName,
  productDescripition,
  productPrice,
}) {
  try {
    await createSneakrsFolderImage(folderName, productImages);
    await addDoc(sneakrsCollection, {
      folderName,
      productName,
      productDescripition,
      productPrice,
    });
  } catch (error) {
    throw new Error("Cant Craeted New Sneakrs");
  }
}
/* -------------------------------  Create Sneakrs Folder Image --------------------------- */
export async function createSneakrsFolderImage(folderName, productImages) {
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

/* -------------------------------  Delete Sneakrs Item --------------------------- */
export async function deleteSneakrsItem({ folderName, id }) {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "Sneakrs", id);
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
