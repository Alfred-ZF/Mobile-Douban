/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Helper = {
  isToEnd: function ($viewport, $content) {
    return $viewport.height() + $viewport.scrollTop() + 10 >= $content.height()
  },

  createNode: function (movie) {
    var tpl =
      `<div class="item">
      <a href="#">
      <div class="hover">
      <img src="" alt="">
          </div>
      <div class="detail">
      <h2></h2>
      <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
      <div class="extra"><span class="year"></span> / <span class="type"></span></div>
      <div class="extra">导演: <span class="director"></span></div>
      <div class="extra">主演: <span class="actor"></span></div>
    </div>
    </a>
    </div>`
    var $node = $(tpl)
    $node.find('a').attr('href', movie.alt)
    $node.find('.hover img')
      .attr('src', movie.images.medium)
    $node.find('.detail h2').text(movie.title)
    $node.find('.score').text(movie.rating.average)
    $node.find('.collect').text(movie.collect_count)
    $node.find('.year').text(movie.year)
    $node.find('.type').text(movie.genres.join(' / '))
    $node.find('.director').text(function () {
      var directorsArr = []
      movie.directors.forEach(function (item) {
        directorsArr.push(item.name)
      })
      return directorsArr.join('、')
    })
    $node.find('.actor').text(function () {
      var actorArr = []
      movie.casts.forEach(function (item) {
        actorArr.push(item.name)
      })
      return actorArr.join('、')
    })
    return $node
  }
}

module.exports = Helper

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var top250 = __webpack_require__(2);
var usBox = __webpack_require__(3);
var search = __webpack_require__(4);
var url = __webpack_require__(5);


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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Helper = __webpack_require__(0);


var top250 = {
  init: function () {

    this.$element = $('#top250')
    this.$content = this.$element.find('.container')
    this.index = 0
    this.isLoading = false
    this.isFinish = false
    this.bind()
    this.start()
  },
  bind: function () {
    var _this = this
    this.$element.scroll(function () {
      if (!_this.isFinish && Helper.isToEnd(_this.$element, _this.$content)) {
        console.log('daodile!')
        _this.start()
      }
    })
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading) return;
    _this.isLoading = true
    _this.$element.find('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      data: {
        start: _this.index || 0,

      },
      dataType: 'jsonp'
    }).done(function (ret) {
      //           console.log(ret);

      _this.index += 20;
      if (_this.index >= ret.total) {
        _this.isFinish = true
      }
      callback && callback(ret)
    }).fail(function () {
      console.log('数据异常...');
    }).always(function () {
      _this.isLoading = false
      _this.$element.find('.loading').hide()
    })
  },
  render: function (data) {
    console.log(data, '1122')
    var _this = this
    data.subjects.forEach(function (movie) {
      console.log(movie)
      _this.$content.append(Helper.createNode(movie))
    })

  }
}

module.exports = top250;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Helper = __webpack_require__(0);

var usBox = {
  init: function () {
    console.log('usBox ok')
    this.$element = $('#beimei')
    this.$content = this.$element.find('.container')
    this.index = 0
    this.isLoading = false
    this.isFinish = false
    this.bind()
    this.start()

  },

  bind: function () {
    var _this = this
    this.$element.scroll(function () {
      if (!_this.isFinish && Helper.isToEnd(_this.$element, _this.$content)) {
        console.log('daodile!')
        _this.start()
      }
    })
  },

  start: function () {
    var _this = this
    this.getData(function (data) {

      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading) return;
    _this.isLoading = true

    _this.$element.find('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/us_box',
      data: {
        start: _this.index || 0,
      },

      dataType: 'jsonp'
    }).done(function (ret) {
      console.log(ret)
      _this.index += 10;
      if (_this.index >= ret.total) {
        _this.isFinish = true
      }
      callback && callback(ret)

    }).fail(function () {
      console.log('数据异常...');
    }).always(function () {
      _this.isLoading = false

      _this.$element.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    console.log(data);
    data.subjects.forEach(function (movie) {
      _this.$content.append(Helper.createNode(movie.subject))

    })
  }
}

module.exports = usBox;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Helper = __webpack_require__(0);

var search = {
  init: function () {
    console.log('search ok')
    this.$element = $('#search')
    this.$input = this.$element.find('input')
    this.$btn = this.$element.find('.button')
    this.$content = this.$element.find('.search-result')
    this.keyword = ''
    this.index = 20
    this.isLoading = false
    this.isFinish = false
    this.bind()


  },
  bind: function () {
    var _this = this;

    this.$btn.click(function () {
      _this.getData(_this.$input.val(), function (data) {
        console.log(data)
        _this.render(data)
      })
    });

    this.$element.scroll(function () {
      if (!_this.isFinish && Helper.isToEnd(_this.$element, _this.$content)) {
        console.log('daodile!')
        _this.getData(_this.$input.val(), function (data) {
          console.log(data)
          _this.render(data)
        })
      }
    });
  },



  getData: function (keyword, callback) {
    var _this = this

    if (_this.isLoading) return;
    _this.isLoading = true


    _this.$element.find('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/search',
      data: {
        q: keyword,
        start: _this.index || 20
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      _this.index += 20;

      if (_this.index >= ret.total) {
        _this.isFinish = true
      }

      callback && callback(ret)
    }).fail(function () {
      console.log('数据异常...');
    }).always(function () {
      _this.isLoading = false
      _this.$element.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    console.log(data);
    data.subjects.forEach(function (movie) {

      _this.$content.append(Helper.createNode(movie))
    })
  }
}

module.exports = search;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);