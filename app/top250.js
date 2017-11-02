var Helper = require('./Helper');


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
      url: 'https://api.douban.com/v2/movie/top250',
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