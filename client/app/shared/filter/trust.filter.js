export default ['$sce', function($sce) {
  return function (html = '') {
    return $sce.trustAsHtml(html);
  }
}]
