/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/**
 * Created by jcdev00 on 18. 10. 18.
 */

class StringLib {}

StringLib.checkEmail = (email) => {
  let result = false;
  if (email) {
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    result = regex.test(email);
  }
  return result;
};

StringLib.checkNumber = (string) => {
  let result = false;
  if (string) result = /[0-9]/.test(string);
  return result;
};

StringLib.checkLowercase = (string) => {
  let result = false;
  if (string) result = /[a-z]/.test(string);
  return result;
};

StringLib.checkUppercase = (string) => {
  let result = false;
  if (string) result = /[A-Z]/.test(string);
  return result;
};

StringLib.checkSpecial = (string) => {
  let result = false;
  if (string) result = /[!"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]/gi.test(string);
  return result;
};

StringLib.checkEtc = (string) => {
  let result = false;
  if (string) { result = /[^0-9a-zA-Z!"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]/.test(string); }
  return result;
};

/*
 @param
 - string : 체크 문자열
 - repeatCount : 반복 개수 (min 2)
 @result
 1 : 설정한 repeatCount 개수 이상 만큼 반복 문자열이 존재
 0 : 설정한 repeatCount 개수 이상 만큼 반복 문자열이 없음
 -1 : 체크 문자열이 널이거나, repeatCount이 최소개수가 아닌 경우
 */
StringLib.checkSameRepeat = (string, repeatCount) => {
  let result = -1;

  if (string && repeatCount > 1) {
    // 이 자체가 한개 반복문자를 의미
    let regex = "(\\w)";
    for (let i = 0; i < repeatCount - 1; i++) {
      regex = regex.concat("\\1");
    }
    regex = new RegExp(regex);
    if (regex.test(string)) result = 1;
    else result = 0;
  }

  return result;
};

/*
 @param
 - string : 체크 문자열
 - continuedCount : 반복 개수 (min 2)
 @result
 1 : 설정한 continuedCount 개수 이상 만큼 연속된 값으로  문자열이 존재
 0 : 설정한 continuedCount 개수 이상 만큼 연속된 값으로  문자열이 없음
 -1 : 체크 문자열이 널이거나, continuedCount 최소개수가 아닌 경우
 */
StringLib.checkContinuedValue = (string, continuedCount) => {
  let result = -1;

  if (string && continuedCount > 1) {
    let intCnt1 = 0;
    let intCnt2 = 0;

    for (let i = 1; i < string.length; i++) {
      const current = string.charAt(i);
      const prev = string.charAt(i - 1);

      if (current.charCodeAt(0) - prev.charCodeAt(0) === 1) { intCnt1 += 1; } else intCnt1 = 0;

      if (current.charCodeAt(0) - prev.charCodeAt(0) === -1) { intCnt2 += 1; } else intCnt2 = 0;

      if (continuedCount - 1 === intCnt1 || continuedCount - 1 === intCnt2) {
        result = 1;
        break;
      }
    }

    if (result !== 1) result = 0;
  }

  return result;
};

StringLib.isStringContain = (ori, check) => {
  let result = false;

  if (ori && check) result = ori.includes(check);

  return result;
};

/*
 @param
 - ori : 원본 문자열
 - division : 기준 문자열
 - extract : 기준 문자열에서 추출 문자열의 위치(1:기준 문자열 앞, 2: 기준 문자열 뒤)
 @result
 null : param이 유효하지 않거나 기준 문자열에 해당된 없는 경우
 */
StringLib.isStringExtract = (ori, division, extract) => {
  let result = null;

  if (ori && division) {
    const nIndex = ori.lastIndexOf(division);
    if (nIndex !== -1) {
      if (extract === 1) result = ori.substring(0, nIndex);
      else if (extract === 2) result = ori.substring(nIndex + 1);
    }
  }

  return result;
};

StringLib.isJson = (jsonString) => {
  try {
    let prevObject = null;
    if (typeof jsonString !== "string") {
      prevObject = jsonString;
      jsonString = JSON.stringify(jsonString);
    }

    const oJson = JSON.parse(jsonString);

    if (oJson && typeof oJson === "object") {
      if (prevObject) return prevObject;
      return oJson;
    }
  } catch (e) {
    return false;
  }
  return false;
};

StringLib.isJsonEmpty = (jsonObj) => {
  if (Object.keys(jsonObj).length > 0) return false;
  return true;
};

StringLib.extractFileExt = (filePath) => {
  let fileExt;

  if (filePath) {
    const index = filePath.lastIndexOf(".");

    if (index > -1) {
      fileExt = filePath.substring(index + 1);
    }
  }

  return fileExt;
};

StringLib.getCurTimeStamp = (filePath) => {
  const d = new Date();
  let s = `${this.leadingZeros(d.getFullYear(), 10, 4)}-`;
  s += `${this.leadingZeros(d.getMonth() + 1, 10, 2)}-`;
  s += `${this.leadingZeros(d.getDate(), 10, 2)}=`;
  s += `${this.leadingZeros(d.getHours(), 10, 2)}-`;
  s += `${this.leadingZeros(d.getMinutes(), 10, 2)}-`;
  s += this.leadingZeros(d.getSeconds(), 10, 2);

  return s;
};

StringLib.leadingZeros = (n, rare, digits) => {
  let zero = "";
  n = n.toString(rare);

  if (n.length < digits) {
    for (let i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
};

StringLib.isStringEmpty = (value) => {
  console.log(`isEmpty value = ${value}`);
  let isEmpty = true;
  if (
    value === "" ||
    value == null ||
    value === undefined ||
    (value != null && typeof value === "object" && !Object.keys(value).length)
  ) { isEmpty = true; } else isEmpty = false;

  console.log(`isEmpty isEmpty = ${isEmpty}`);

  return isEmpty;
};

module.exports = StringLib;
