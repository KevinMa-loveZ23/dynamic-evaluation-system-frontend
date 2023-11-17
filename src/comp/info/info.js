import { Post } from "@/web/comm"
/**
 * 
 * @param {string} file - json to be uploaded
 */
function uploadJsonFile(file) {
    return new Post()
        .url("api","info")
        .bodyObject(JSON.parse(file))
        .send()
}

export { uploadJsonFile }