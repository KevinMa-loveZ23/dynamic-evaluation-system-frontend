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

// class AchievementInfo {
//     achievementList = []
//     /**
//      * 
//      * @param {UserInfo} userInfo - user's info
//      */
//     constructor(userInfo) {
//         (this.havePosted = userInfo.mostValuePostScore >= 0)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('havePosted'))
//             : ""
//         (this.mvps200 = userInfo.mostValuePostScore >= 200)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('mvps200'))
//             : ""
//         (this.mvps500 = userInfo.mostValuePostScore >= 500)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('mvps500'))
//             : ""
//         (this.mvps1k = userInfo.mostValuePostScore >= 1000)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('mvps1k'))
//             : ""
//         (this.mvps2k = userInfo.mostValuePostScore >= 2000)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('mvps2k'))
//             : ""
//         (this.mvps5k = userInfo.mostValuePostScore >= 5000)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('mvps5k'))
//             : ""
//         (this.fan500 = userInfo.fanCount > 500)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('fan500'))
//             : ""
//         (this.fan2k = userInfo.fanCount > 2000)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('fan2k'))
//             : ""
//         (this.fan5k = userInfo.fanCount > 5000)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('fan5k'))
//             : ""
//         (this.fan10k = userInfo.fanCount > 10000)
//             ? this.achievementList.push(
//                 AchievementInfo.achievementNameList.get('fan10k'))
//             : ""
//     }
// }
// /**
//  * 
//  * @static
//  */
// AchievementInfo.achievementNameList = new Map([
//     ['havePosted', "新手上路"],
//     ['mvps200', "初级创作者"],
//     ['mvps500', "高级创作者"],
//     ['mvps1k', "专业创作者"],
//     ['mvps2k', "杰出创作者"],
//     ['mvps5k', "社区领袖"],
//     ['fan500', "社区风云"],
//     ['fan2k', "网络达人"],
//     ['fan5k', "社区偶像"],
//     ['fan10k', "网络巨星"]
// ])

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
// class AchvInfo {
//     /**
//      * 
//      * @param {UserInfo} userInfo - user's info
//      */
//     constructor(userInfo) {
//         // this.achvStatus = new Map([
//         //     ['havePosted', new AchvStatus("新手上路", "发送过帖子", userInfo.mostValuePostScore >= 0)],
//         //     ['mvps200', new AchvStatus("初级创作者", "贴文最大热度达200", userInfo.mostValuePostScore >= 200)],
//         //     ['mvps500', new AchvStatus("高级创作者", "贴文最大热度达500", userInfo.mostValuePostScore >= 500)],
//         //     ['mvps1k', new AchvStatus("专业创作者", "贴文最大热度达1000", userInfo.mostValuePostScore >= 1000)],
//         //     ['mvps2k', new AchvStatus("杰出创作者", "贴文最大热度达2000", userInfo.mostValuePostScore >= 2000)],
//         //     ['mvps5k', new AchvStatus("社区领袖", "贴文最大热度达5000", userInfo.mostValuePostScore >= 5000)],
//         //     ['fan500', new AchvStatus("社区风云", "粉丝数超过500", userInfo.fanCount > 500)],
//         //     ['fan2k', new AchvStatus("网络达人", "粉丝数超过2000", userInfo.fanCount > 2000)],
//         //     ['fan5k', new AchvStatus("社区偶像", "粉丝数超过5000", userInfo.fanCount > 5000)],
//         //     ['fan10k', new AchvStatus("网络巨星", "粉丝数超过10000", userInfo.fanCount > 10000)]
//         // ])
//         this.achvStatus = [
//             new AchvStatus("新手上路", "发送过帖子", userInfo.mostValuePostScore >= 0),
//             new AchvStatus("初级创作者", "贴文最大热度达200", userInfo.mostValuePostScore >= 200),
//             new AchvStatus("高级创作者", "贴文最大热度达500", userInfo.mostValuePostScore >= 500),
//             new AchvStatus("专业创作者", "贴文最大热度达1000", userInfo.mostValuePostScore >= 1000),
//             new AchvStatus("杰出创作者", "贴文最大热度达2000", userInfo.mostValuePostScore >= 2000),
//             new AchvStatus("社区领袖", "贴文最大热度达5000", userInfo.mostValuePostScore >= 5000),
//             new AchvStatus("社区风云", "粉丝数超过500", userInfo.fanCount > 500),
//             new AchvStatus("网络达人", "粉丝数超过2000", userInfo.fanCount > 2000),
//             new AchvStatus("社区偶像", "粉丝数超过5000", userInfo.fanCount > 5000),
//             new AchvStatus("网络巨星", "粉丝数超过10000", userInfo.fanCount > 10000)
//         ]
//     }
// }

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