import axios from "./root.service.js";
import { formatInventoryData } from '@helpers/formatData.js';

export async function getInventorys() {
    try {
        const { data } = await axios.get('/inventory');
        const formattedData = data.data.map(formatInventoryData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function addInventory(newItem) {
    try {
        const response = await axios.post('/inventory', newItem);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}


export async function updateInventory(data, id) {
    try {
        const response = await axios.put(`/inventory/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
