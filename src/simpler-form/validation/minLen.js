const minLen = (
  length,
  hint = `value must have at least ${length} characters`
) => value => {
  return new Promise((resolve, reject) => {
    if (typeof value === "string" && value.length >= length) {
      return resolve(value);
    } else {
      typeof hint === "function" ? reject(hint(value)) : reject(hint);
    }
  });
};

export default minLen;
