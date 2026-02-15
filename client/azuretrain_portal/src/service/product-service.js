import axios from "axios";

// Create an Axios instance for reusability
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  timeout: 500000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const apiBLOB = axios.create({
  baseURL: process.env.REACT_APP_BLOB_URL, 
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const apiCheckout = axios.create({
  baseURL: process.env.REACT_APP_CHECKOUT_URL, 
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const apiSendEmail = axios.create({
  baseURL: process.env.REACT_APP_CHECKOUT_URL, 
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProductCatalogue = async (productSelected) => {
  try {
    const response = await api.get(`/productType?product=${productSelected}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    throw error; // Let the component handle the errord
  }
};

export const downloadProductSelected = async (productSelected) => {
  try {
    const response = await apiBLOB.get(`/downloadProduct?productDetails=${productSelected}`, {
         responseType: "blob",
        });
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    throw error; // Let the component handle the errord
  }
};

export const checkoutProduct = async(productSelected) => {
    try {
         const response = await apiCheckout.post(`/checkoutNagPortal?productId=${productSelected}`, {
           productId: productSelected
         });
          sendEmail(productSelected);
           return response.data;
          
  } catch (error) {
    console.error("Error fetching details:", error.message);
    throw error; // Let the component handle the errord
  }

}
  export const sendEmail = async(productSelected) => {
    try {
         const response = await apiSendEmail.post(`?productId=${productSelected}`, {
           productId: productSelected
         });

           return response.data;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    throw error; // Let the component handle the errord
  }
}


