export default function removeFalsyValues(object) {
  Object.keys(object).forEach(key => !object[key] && delete object[key]);
}
