import { Get } from "@/web/comm"
/**
 * 
 * @param {number} postId - id value of searching post
 * @returns {Promise<PostInfo>}
 */
function getPostInfo(postId) {
    return new Get()
        .url("api", "post", postId)
        .send()
}

/**
 * 
 * @param {number} n - range to search
 * @param {number} type - type to search
 * @param {number} [timestamp] - (nullable) timestamp for searching records
 * @returns {Promise<Array<PostInfo>>}
 */
function getTopNPosts(n, type, timestamp) {
    const getRequest = new Get()
        .url("api", "post", "sort")
        .query("n", n)
        .query("type", type)
    if (timestamp) {
        getRequest.query("timestamp", timestamp)
    }
    return getRequest
        .addQuery()
        .send()
}

class PostInfo {
    /**
     * 
     * @param {number} postId - id value of post
     * @param {number} type - type of post
     * @param {number} score - score of post
     */
    constructor(postId, type, score) {
        this.postId = postId
        this.type = type
        this.score = score
    }
}

export {
    getPostInfo, getTopNPosts, PostInfo
}