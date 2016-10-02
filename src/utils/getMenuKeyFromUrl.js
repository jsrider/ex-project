export default function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}
