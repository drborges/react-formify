const min = (
  number,
  hint = `value must be greater or equals to ${number}`
) => value => {
  return new Promise((resolve, reject) => {
    if (typeof value === "string" && value >= number) {
      return resolve(value);
    } else {
      typeof hint === "function" ? reject(hint(value)) : reject(hint);
    }
  });
};

export default min;
