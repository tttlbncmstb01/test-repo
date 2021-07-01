import client from "./client";

const privateInfo = (userInfo) => client.post("/privateInfo", { userInfo });
export default {
    privateInfo,
};
