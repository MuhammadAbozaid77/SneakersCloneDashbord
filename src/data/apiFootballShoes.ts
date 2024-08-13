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

const footballShoesCollection = collection(db, "footballshoes");
/* -------------------------------  Get Data Objects --------------------------- */
export async function getFootballShoesData() {
  try {
    const data = await getDocs(footballShoesCollection);
    const filteredData = data.docs?.map((doc, index) => ({
      ...doc?.data(),
      id: doc?.id,
    }));
    return filteredData;
  } catch (error) {
    if (error) {
      throw new Error("Cant Get FootballShoes Items");
    } else {
      return [];
    }
  }
}
/* -------------------------------  Get FootballShoes Images --------------------------- */
export async function GetFootballShoesImages({ folderName }) {
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
      throw new Error("Cant Get FootballShoes Images");
    } else {
      return [];
    }
  }
}
/* -------------------------  Create FootballShoes Only Image and Details  -------------------- */
export async function getFootballShoesDetails(folderName, id) {
  const imageDetails = await GetFootballShoesImages({ folderName });
  const FootballShoesDetails = await getFootballShoesData();
  const detailsObject = FootballShoesDetails?.filter((el) => {
    return el.id === id;
  });
  return { imageDetails, detailsObject };
}

/* -------------------------------  Create FootballShoes  --------------------------- */
export async function addNewFootballShoesItem({
  productImages,
  folderName,
  productName,
  productDescripition,
  productPrice,
}) {
  try {
    await createFootballShoesFolderImage(folderName, productImages);
    await addDoc(footballShoesCollection, {
      folderName,
      productName,
      productDescripition,
      productPrice,
    });
  } catch (error) {
    throw new Error("Cant Craeted New FootballShoes");
  }
}
/* -------------------------------  Create FootballShoes Folder Image --------------------------- */
export async function createFootballShoesFolderImage(
  folderName,
  productImages
) {
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

/* -------------------------------  Delete FootballShoes Item --------------------------- */
export async function deleteFootballShoesItem({ folderName, id }) {
  try {
    await deleteFolderImage(folderName);
    const docObject = doc(db, "footballshoes", id);
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

/* ----------------------------------- Edit FootballShoes Item Object ---------------------------------------- */
export async function editFootballShoesItem({ values, id }) {
  const docObject = doc(db, "footballshoes", id);
  try {
    await updateDoc(docObject, values);
  } catch (error) {
    throw new Error("Cant Updated This Cabin");
  }
}
