export default function paramsToString(paramsObject) {
  return new URLSearchParams(paramsObject).toString();
}
