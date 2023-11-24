import { Post } from "@/web/comm"
/**
 * 
 * @param {string} file - json to be uploaded
 * @returns {Promise}
 */
async function uploadJsonFile(file) {
    return new Post()
        .url("api","info")
        .bodyObject(JSON.parse(file))
        .send()
}

export { uploadJsonFile }