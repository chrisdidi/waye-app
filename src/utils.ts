import { Alert } from "react-native";

export const getApi = (link: string): any => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch(link);
      const json = await result.json();
      resolve(json);
    } catch (e) {
      Alert.alert(e.message);
      reject(e);
    }
  });
};
