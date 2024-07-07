import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"; 

// Function to add a favorite city to the user's favorites
export const addFavoriteCity = async (userId, city) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        favoriteCities: arrayUnion(city)
      });
      console.log("Favorite city added");
    } else {
      console.error("User document does not exist");
    }
  } catch (e) {
    console.error("Error adding favorite city: ", e);
  }
};

// Function to retrieve favorite cities for a user
export const getFavoriteCities = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data().favoriteCities || [];
    } else {
      console.error("User document does not exist");
      return [];
    }
  } catch (e) {
    console.error("Error retrieving favorite cities: ", e);
    return [];
  }
};
