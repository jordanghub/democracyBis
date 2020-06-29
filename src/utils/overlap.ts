/**
 * @description Fait glisser selectedText sur selection de la gauche vers la droite (strToFind sur strToFindIn)
 * @param {string} strToFind Text
 * @param {string} strToFindIn Selection
 * @param {string} content Contenu dans lequel se trouve la sélection
 */

export const findOverlapStart = (strToFind, strToFindIn, content) => {
  const strToFindMaxIdx = strToFind.length - 1;
  const strToFindInMaxIdx = strToFindIn.length - 1;

  for (let charIndex = 0; charIndex < strToFind.length; charIndex++) {
    if (charIndex > strToFindInMaxIdx) {
      return false;
    }
    const replacement =
      strToFind.slice(strToFindMaxIdx - charIndex) +
      strToFindIn.slice(charIndex + 1);
    if (replacement === strToFindIn) {
      const rest =
        strToFind.slice(0, strToFindMaxIdx - charIndex) + strToFindIn;

      if (content.includes(rest)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * @description Fait glisser selectedText sur selection de la doite vers la gauche (strToFind sur strToFindIn)
 * @param {string} strToFind Text
 * @param {string} strToFindIn Selection
 * @param {string} content Contenu dans lequel se trouve la sélection
 */

export const findOverlapEnd = (strToFind, strToFindIn, content) => {
  const strToFindMaxIdx = strToFind.length - 1;
  const strToFindInMaxIdx = strToFindIn.length - 1;

  for (let charIndex = 0; charIndex <= strToFindMaxIdx; charIndex++) {
    if (charIndex > strToFindInMaxIdx) {
      return false;
    }
    const replacement =
      strToFindIn.slice(0, strToFindInMaxIdx - charIndex) +
      strToFind.slice(0, charIndex + 1);
    if (replacement === strToFindIn) {
      const rest =
        strToFindIn.slice(0, strToFindInMaxIdx - charIndex) + strToFind;

      if (content.includes(rest)) {
        return true;
      }
    }
  }
  return false;
};
