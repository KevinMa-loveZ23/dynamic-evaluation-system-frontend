import { Get } from "@/web/comm"
/**
 * 
 * @param {number} userId - id value of searching user
 * @returns {Promise<UserInfo>}
 */
function getUserInfo(userId) {
    return new Get()
        .url("api", "user", userId)
        .send()
}
/**
 * 
 * @param {number} n - range to search
 * @param {number} type - type to search
 * @param {number} [timestamp] - (nullable) timestamp for searching records
 * @returns {Promise<Array<UserInfo>>}
 */
function getTopNUsers(n, type, timestamp) {
    const getRequest = new Get()
        .url("api", "user", "sort")
        .query("n", n)
        .query("type", type)
    if (timestamp) {
        getRequest.query("timestamp", timestamp)
    }
    return getRequest
        .addQuery()
        .send()
}

class UserInfo {
    /**
     * 
     * @static
     * @param {number} score - score of user
     * @returns {number}
     */
    #getLevelByScore(score) {
        let level = 0
        // 十分怀念kotlin。。。
        if (score < 1400) {
            level = 0
        } else if (score < 1600) {
            level = 1
        } else if (score < 1900) {
            level = 2
        } else if (score < 2100) {
            level = 6
        } else if (score < 2300) {
            level = 5
        } else if (score < 2400) {
            level = 4
        } else if (score < 2600) {
            level = 3
        } else if (score < 3000) {
            level = 7
        } else {
            level = 8
        }
        return level
    }

    /**
     * 
     * @param {number} userId - id value of user
     * @param {number} type  - type of user
     * @param {number} score - score of user
     * @param {number} fanCount - fan number of user
     * @param {number} mostValuePostScore - score of user's most valuable post
     */
    constructor(userId, type, score, fanCount, mostValuePostScore) {
        this.userId = userId
        this.type = type
        this.score = score
        this.fanCount = fanCount
        this.mostValuePostScore = mostValuePostScore

        this.level = this.#getLevelByScore(score)
    }
}

class AchvStatus{
    /**
     * 
     * @param {string} name 
     * @param {string} policy 
     * @param {boolean} status 
     */
    constructor(name, policy, status) {
        this.name = name
        this.policy = policy
        this.status = status
    }
}

/**
 * 
 * @param {UserInfo} userInfo - user's info
 * @returns {Array<AchvStatus>}
 */
function getAchvStatus(userInfo) {
    return [
        new AchvStatus("新手上路", "发送过帖子", userInfo.mostValuePostScore >= 0),
        new AchvStatus("初级创作者", "贴文最大热度达200", userInfo.mostValuePostScore >= 200),
        new AchvStatus("高级创作者", "贴文最大热度达500", userInfo.mostValuePostScore >= 500),
        new AchvStatus("专业创作者", "贴文最大热度达1000", userInfo.mostValuePostScore >= 1000),
        new AchvStatus("杰出创作者", "贴文最大热度达2000", userInfo.mostValuePostScore >= 2000),
        new AchvStatus("社区领袖", "贴文最大热度达5000", userInfo.mostValuePostScore >= 5000),
        new AchvStatus("社区风云", "粉丝数超过500", userInfo.fanCount > 500),
        new AchvStatus("网络达人", "粉丝数超过2000", userInfo.fanCount > 2000),
        new AchvStatus("社区偶像", "粉丝数超过5000", userInfo.fanCount > 5000),
        new AchvStatus("网络巨星", "粉丝数超过10000", userInfo.fanCount > 10000)
    ]
}

export {
    getUserInfo, getTopNUsers, UserInfo, getAchvStatus
}