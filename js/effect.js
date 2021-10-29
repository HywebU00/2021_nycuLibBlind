$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  var wh = _window.height();
  var wwNew = ww;

  const wwSlim = 500;
  const wwMedium = 700;
  const wwNormal = 1020;
  const wwWide = 1440;
  const wwMaximum = 1920;

  const speed = 400;
  const speedFaster = 200;

  _html.removeClass('no-js');


  // 主選單（桌機版）
  var _menu = $('.webHeader .menu');
  _menu.find('li').has('ul').addClass('hasChild');
  var  _hasChildMenu = _menu.find('.hasChild');
  _hasChildMenu.each(function(){
    let _this = $(this);
    let _a = _this.children('a');
    let _subMenu = _this.children('ul');
    _this.hover(
      function(){
        _subMenu.stop(true, false).slideDown(250);
      },
      function(){
        _subMenu.stop(true, false).slideUp(150);
      }
    )

    _a.keyup(function (e) { 
      _subMenu.show();
    });
    _this.find('li:last>a').focusout(function (e) { 
      _subMenu.hide();
    });
  })


  // 右上選單（桌機版）
  var _topLink = $('.webHeader').find('.topLinks');
  _topLink.children('ul').children('li').not('.assistant').has('ul').addClass('hasChild');
  var _hasChildLi = _topLink.find('.hasChild');
  var _slideUl = _hasChildLi.children('ul');
  _hasChildLi.find('a').click(function(){
    let _slideTarget = $(this).next('ul');
    if (_slideTarget.is(':visible')) {
      _slideTarget.stop(true, false).slideUp();
    } else {
      _slideTarget.stop(true, false).slideDown();
    }
  })
  _slideUl.mouseleave( function(){
    $(this).slideUp();
  })
  _hasChildLi.siblings().children('a').focus(function(){
    _slideUl.slideUp();
  })






  // 側欄
  var _sidebar = $('.sidebar');
  _sidebar.before('<div class="sidebarCover"></div>');//製作遮罩
  _menu.clone().prependTo(_sidebar);//複製主選單到側欄給行動版用
  var _sidebarCover = _sidebar.prev('.sidebarCover');
  var _sidebarCtrl = $('.sidebarCtrl');
  var _sidebarMenu = _sidebar.find('.menu');

  _sidebarMenu.after('<nav class="topLinks"><ul></ul></nav>');
  _sidebar.find('.topLinks>ul').html(
    _topLink.children('ul').children('li').not('.assistant, .loginBtn, .member').clone()
  )

  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('reveal')) {
      _sidebar.removeClass('reveal');
      _sidebarCtrl.removeClass('closeIt');
      _sidebarCover.fadeOut(speed);
      _body.removeClass('noScroll');
    } else {
      _sidebar.addClass('reveal');
      _sidebarCtrl.addClass('closeIt');
      _sidebarCover.fadeIn(speed);
      _body.addClass('noScroll')
    }
  })
  _sidebarCover.click(function(){
    _sidebar.removeClass('reveal');
    _sidebarCover.fadeOut(speed);
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
  });

  var _hasChild_sb = _sidebarMenu.find('.hasChild>a');
  _hasChild_sb.click(
    function(e){
      e.preventDefault();

      let _this = $(this);
      let _subMenu = _this.next('ul');

      if (_subMenu.is(':hidden')) {
        _subMenu.stop(true, false).slideDown();
        _this.parent().addClass('closeIt');
      } else {
        _subMenu.stop(true, false).slideUp();
        _this.parent().removeClass('closeIt');
      }
    }
  )



  // 輔助偏好設定開合
  var _assistantCtrl = $('.assistant>a');
  var _astPreferences = $('.assistant').find('.preferences');
  var _options = _astPreferences.find('.fontSize, .colorSet');
  var _closePref = _astPreferences.find('.closeBtn>a');
  const hideSpeed = 250;

  _options.each(function(){
    let _this = $(this);
    let _optionItems = _this.find('li>a');
    _optionItems.click(function(e){
      e.preventDefault();
      $(this).parent().addClass('active').siblings().removeClass('active');
    })
  })

  _assistantCtrl.click( function(){
    if ( _astPreferences.is(':hidden') ) {
      _astPreferences.stop(true, false).slideDown();
    } else {
      _astPreferences.stop(true, false).slideUp(hideSpeed);
    }
  });

  _closePref.click( function(){ 
    _astPreferences.stop(true, false).slideUp(hideSpeed);
  });

  _closePref.focusout( function(e){
    _astPreferences.stop(true, false).slideUp(hideSpeed);
  });





  // 輔助偏好設定：文字大小
  var _prefFontSize = _options.filter('.fontSize').children('li').children('a');
  _prefFontSize.click(function(e){
    let fontSize = $(this).parent().attr('class').replace(' active','');
    e.preventDefault();
    if ( fontSize ==  "small") {
      _html.removeClass().addClass('smallFont');
      createCookie('FontSize', 'small', 356);
    } else if (fontSize ==  "large") {
      _html.removeClass().addClass('largeFont');
      createCookie('FontSize', 'large', 356);
    } else {
      _html.removeClass();
      createCookie('FontSize', 'normal', 356);
    }
  });


  // 輔助偏好設定：更換配色
  var _prefColorset = _options.filter('.colorSet').children('li').children('a');
  // const colorsetNow = _prefColorset.parent().filter('.active').attr('class').replace(' active','');
  // _body.addClass(colorsetNow);
  _prefColorset.click(function(e){
    let colorSet = $(this).parent().attr('class').replace(' active','');
    e.preventDefault();
    _body.removeClass('color0 color1 color2 color3 color4').addClass(colorSet);
  });


  


  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else expires = '';
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  window.onload = function () {
    var cookie = readCookie('FontSize');
    if (cookie == 'small') {
      _prefFontSize.parent().removeClass('active').filter('.small').addClass('active');
      _html.removeClass().addClass('smallFont');
    } else if (cookie == 'large') {
      _prefFontSize.parent().removeClass('active').filter('.large').addClass('active');
      _html.removeClass().addClass('largeFont');
    } else {
      //這裡是預設宣告
      _prefFontSize.parent().removeClass('active').filter('.normal').addClass('active');
      _html.removeClass();
    }
  }










  // 產生「下載中」動畫的圓點元件
  $('.loadingAni').append('<span></span><span></span><span></span><span></span>');






  // 燈箱 --- 【會員登入】 
  var _showLightbox = $('.showLightbox');
  var _lightbox = $('.lightbox');

  _lightbox.before('<div class="cover"></div>');

  _showLightbox.click( function(){
    let boxID = $(this).attr('data-id');
    let _lightboxNow = _lightbox.filter( function(){ return $(this).attr('data-id') === boxID} );
    _lightboxNow.add(_lightboxNow.prev('.cover')).stop(true, false).fadeIn(speed);
    _lightboxNow.find('.closeThis>a').focus();
    _body.addClass('noScroll');
  });

  _lightbox.each( function(){
    let _this = $(this);
    let boxID = _this.attr('data-id');
    let _hideLightbox = _this.find('.closeThis>a');
    let _cover = _this.prev('.cover');

    _hideLightbox.add(_cover).on( 'click', closeLightbox);

    function closeLightbox(){
      _this.add(_cover).fadeOut(speed);
      _body.removeClass('noScroll');
      _showLightbox.filter( function(){ return $(this).attr('data-id') === boxID} ).find('a').focus();
    }
  })






  //go top and bottom ------------------------------------------
	var _goTop = $('.goTop');
  _goTop.click(function(e){
    e.preventDefault();
    _html.stop(true,false).animate({scrollTop: 0}, 600);
  });

	$(window).scroll(function() {
		if ( $(this).scrollTop() > 200){
			_goTop.addClass('show');
		} else {
      _goTop.removeClass('show');
		}
	});

  // 條列頁 active 樣式 ------------------------------------------
  var _category = $('.category');
  _category.each(function(){
    let _item = $(this).find('li');
    _item.click(function(){
      $(this).addClass('active').siblings().removeClass('active');
    })
  })


  // 開合區 slideToggle ------------------------------------------
  var _slideToggle = $('.slideToggle');
  _slideToggle.each(function(){
    let _this = $(this);
    let _ctrl = _this.find('.slideCtrl');
    let _toggleArea = _this.find('.toggleArea');
    let text1 = _ctrl.text();
    let text2 = _ctrl.attr('data-altTitle');

    // if(_toggleArea.is(':hidden')) {
    //   _ctrl.addClass('closeIt').text(text2);
    // } else {
    //   _ctrl.removeClass('closeIt').text(text1);
    // }

    _ctrl.click(function(){
      if (_toggleArea.is(':visible')) {
        _toggleArea.slideUp(600, function(){
          _ctrl.removeClass('closeIt').text(text2);
        });
      } else {
        _toggleArea.slideDown(600, function(){
          _ctrl.addClass('closeIt').text(text1);
        });
      }
    })
  })





  // 字體大小 ------------------------------------------
  var _fontSize = $('.fontSize');
  var _sizeSelect = _fontSize.find('li');
  var _fsArea = $('.contBox').add('.row>section[class]');
  _sizeSelect.click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    if ($(this).hasClass('large')) {
      _fsArea.css('font-size', '1.4rem')
    }
    if ($(this).hasClass('medium')) {
      _fsArea.css('font-size', '1.16rem')
    }
    if ($(this).hasClass('small')) {
      _fsArea.css('font-size', '1rem')
    }
  })

  // on/off 開關
  var _switchOnOff = $('.switchOnOff');
  const textOn = '已啟用自動播放功能';
  const texOff = '已關閉自動播放功能';
  _switchOnOff.click(function () {
    let _this = $(this);
    if(_this.hasClass('on')){
      _this.removeClass('on').attr('aria-checked', 'false').attr('aria-label' , texOff);
    } else {
      _this.addClass('on').attr('aria-checked', 'true').attr('aria-label' , textOn);
    }
  });

  // 待播清單
  var _playList = $('.playList');
  _playList.each(function(){
    let _playItem = $(this).find('li>a');
    _playItem.click(function(){
      _playItem.attr('aria-selected','false').parent().removeClass('playing');
      $(this).attr('aria-selected','true').parent().addClass('playing');
    })
  })

})