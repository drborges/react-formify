import required from "./required";
import minLen from "./minLen";
import min from "./min";

export const validate = (value, validators) => {
  return Promise.all(validators.map(validator => validator(value)));
};

export default { required, minLen, min };
