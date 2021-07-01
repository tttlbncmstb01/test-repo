import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authoToken";
const key2 = "privateInformation";
// Autho token
const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing to auth token", error);
    }
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log("Error getting to auth token", error);
    }
};

const getUser = async () => {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error removing to auth token", error);
    }
};
// step 1 informations
const storePrivateInfor = async (privateInformation) => {
    try {
      await SecureStore.setItemAsync(key2, privateInformation);
    } catch (error) {
      console.log("Error storing to private information", error);
    }
  };
  
  const getPrivateInfor = async () => {
    try {
      return await SecureStore.getItemAsync(key2);
    } catch (error) {
      console.log("Error getting to private information", error);
    }
  };
  
  const getUserInfor = async () => {
    const token = await getPrivateInfor();
    return token;
  };
  
  const removePrivateInfor = async () => {
    try {
      await SecureStore.deleteItemAsync(key2);
    } catch (error) {
      console.log("Error removing to private information", error);
    }
  };
export default {
    getUser,
    removeToken,
    storeToken,
    getUserInfor,
    storePrivateInfor,
    removePrivateInfor,
  };