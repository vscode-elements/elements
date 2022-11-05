let counter = 0;

const uniqueId = (prefix = '') => {
  counter++;

  return `${prefix}${counter}`;
}

export default uniqueId;
