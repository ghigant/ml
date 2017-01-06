export function isFileApiEnabled() {
  return !!(window.File && window.FileReader && window.FileList && window.Blob);
}
