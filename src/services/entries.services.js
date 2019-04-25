import axios from 'axios';
import backendPath from '../backendPath';

class EntriesService {
    static async readEntries() {
        try {
            const response = await axios.get(`${backendPath.ROOT_URL}/readEntries`);
            return response.data;
        } catch (err) {
            console.log(err)
        }
    }

    static async addEntries(entry) {
        try {
            const response = await axios.post(`${backendPath.ROOT_URL}/addEntries`, entry);
            return response.data;
        } catch (err) {
            console.log(err)
        }
    }

    static async editEntries(entry) {
        const response = await axios.put(`${backendPath.ROOT_URL}/addEntries`, entry);
        return response.data;
    }
}

export default EntriesService;