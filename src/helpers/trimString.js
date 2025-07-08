function trimString (text, isLowerCase = false) {
  let newText = text.trim()
  if (isLowerCase) {
    return newText.toLowerCase()
  }
  return newText
}

module.exports = {
  trimString
}
