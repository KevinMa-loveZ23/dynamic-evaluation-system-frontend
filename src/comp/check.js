/**
 * 
 * @param {string} str - test string
 * @returns {boolean}
 */
function strIsInt(str) {
    const reg = /^[0-9]+$/
    return reg.test(str)
}

export { strIsInt }