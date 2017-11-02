var top250 = require('./top250');
var usBox = require('./usBox');
var search = require('./search');
var url = require('./url');


var app = {
  init: function () {
    this.$tabs = $('footer>div')
    this.$panels = $('section')
    this.bind()
    url()
    top250.init()
    usBox.init()
    search.init()
  },
  bind: function () {
    $('footer>div').click(function () {
      $(this).addClass('active')
        .siblings()
        .removeClass('active')
      $currentPage = $('main>section')
        .hide().eq($(this).index())
        .fadeIn()
    })
    window.ontouchmove = function (e) {
      e.preventDefault()
    }
    $('section').each(function () {
      this.ontouchmove = function (e) {
        e.stopPropagation()
      }
    })
  }
}

app.init();