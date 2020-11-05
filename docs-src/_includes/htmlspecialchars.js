module.exports = (raw) => {
  let converted = raw;
  converted = converted.replace(/&/g, '&amp;');
  converted = converted.replace(/</g, '&lt;');
  converted = converted.replace(/>/g, '&gt;');
  converted = converted.replace(/"/g, '&quot;');
  converted = converted.replace(/'/g, '&#039;');

  return converted;
};