import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import { CardCollection } from "./types/CardCollection";

export const createCollection = async (options: {
  userId: string;
  name: string;
}): Promise<CardCollection> => {
  const db = getFirestore();
  const userRef = doc(db, "users", options.userId);
  const cardCollectionRef = collection(userRef, "cardcollections");
  const q = query(cardCollectionRef, where("name", "==", options.name));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Collection with that name already exists");
  } else {
    // create empty list
    const newCardCollection = {
      name: options.name,
      cards: [],
    };
    // Add a new document in collection "todolists"
    const ref = await addDoc(cardCollectionRef, newCardCollection);

    return {
      ...newCardCollection,
      ref: ref.id,
    };
  }
};
