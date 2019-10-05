const required = (hint = "value is required") => value => {
  return new Promise((resolve, reject) => {
    if (value !== null && value !== undefined && value !== "") {
      return resolve(value);
    } else {
      typeof hint === "function" ? reject(hint(value)) : reject(hint);
    }
  });
};

export default required;
