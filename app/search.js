var Helper = require('./Helper');

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
      url: 'https://api.douban.com/v2/movie/search',
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