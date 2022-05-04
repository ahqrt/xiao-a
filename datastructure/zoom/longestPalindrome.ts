/**
 * 最长回文子串
 * 暴力解法
 * @param s 
 * @returns 
 */

function longestPalindrome2(s: string): string {
  const len = s.length
  if (len < 2) {
    return s
  }
  let maxLen = 1
  let start = 0
  const charArr = s.split('')

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (j - i + 1 > maxLen && isValidPalindromic(charArr, i, j)) {
        maxLen = j - i + 1
        start = i
      }
    }
  }

  return s.substring(start, start + maxLen)
}


/**
 * 最长回文子串
 * 
 * 思路： 动态规划
 * 
 * 子串长度 > 2
 * 假设一个子串是回文串，那么它的左右两边必须是相同的字符，
 * 
 * P(i,j) = P(i+1,j-1) && s[i] === s[j]
 * 要求 i<j
 * 
 * 
 * 
 * 
 * @param s 
 */
function longestPalindrome(s: string): string {
  const len = s.length
  if (len < 2) {
    return s
  }

  let maxLen = 1
  let start = 0
  const dp = new Array(len).fill(new Array(len).fill(true))

  const charArr = s.split('')
  for (let l = 2; l < len; l++) {
    for (let i = 0; i < len - l; i++) {
      const j = i + l
      if (j >= len) {
        break
      }

      if (charArr[i] !== charArr[j]) {
        dp[i][j] = false
        continue
      } else {
        if (j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }

      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1
        start = i
      }

    }

    return s.substring(start, start + maxLen)
  }
}


function isValidPalindromic(charArr: string[], i: number, j: number): boolean {
  while (i < j) {
    if (charArr[i] !== charArr[j]) {
      return false
    }
  }
  return true
}