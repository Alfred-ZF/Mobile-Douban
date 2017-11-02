function url() {
  init()
  window.onpopstate = function () {
    init()
  }

  function init() {
    var search = location.hash;
    if (search === '#top250') {
      $('section').eq(0).fadeIn().siblings().hide()
      $('footer>div').eq(0).addClass('active').siblings().removeClass('active')
    }
    if (search === '#us_box') {
      $('section').eq(1).fadeIn().siblings().hide()
      $('footer>div').eq(1).addClass('active').siblings().removeClass('active')
    }
    if (search === '#search') {
      $('section').eq(2).fadeIn().siblings().hide()
      $('footer>div').eq(2).addClass('active').siblings().removeClass('active')
    } else {
      $('section').eq(0).fadeIn().siblings().hide()
      $('footer>div').eq(0).addClass('active').siblings().removeClass('active')
    }
  }
  $('footer>div').eq(0).on('click', function () {
    history.pushState({
      page: 1
    }, null, '#top250')
  })
  $('footer>div').eq(1).on('click', function () {
    history.pushState({
      page: 2
    }, null, '#us_box')
  })
  $('footer>div').eq(2).on('click', function () {
    history.pushState({
      page: 3
    }, null, '#search')
  })
}
module.exports = url