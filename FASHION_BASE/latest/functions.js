!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this.options.asNavFor;return e&&null!==e&&(e=i(e).not(this.$slider)),e},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){this.autoPlayTimer&&clearInterval(this.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){for(o in s=null,r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n=this,r=i(e.currentTarget);switch(r.is("a")&&e.preventDefault(),r.is("li")||(r=r.closest("li")),o=n.slideCount%n.options.slidesToScroll!=0?0:(n.slideCount-n.currentSlide)%n.options.slidesToScroll,e.data.message){case"previous":s=0===o?n.options.slidesToScroll:n.options.slidesToShow-o,n.slideCount>n.options.slidesToShow&&n.slideHandler(n.currentSlide-s,!1,t);break;case"next":s=0===o?n.options.slidesToScroll:o,n.slideCount>n.options.slidesToShow&&n.slideHandler(n.currentSlide+s,!1,t);break;case"index":var l=0===e.data.index?0:e.data.index||r.index()*n.options.slidesToScroll;n.slideHandler(n.checkNavigable(l),!1,t),r.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(t=0,i>(e=this.getNavigableIndexes())[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){this.checkResponsive(),this.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){this.autoPlayClear(),this.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){for(e in s.respondTo=s.options.respondTo||"window",n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){i||this.autoPlay(),this.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.apx_slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

const theme = [];

//TRACKING - GENERATE A KEY OR ANYTHING FOR SEARCH INVALID THEMES PURCHASES
theme.tracking = function(){console.log('Theme License is [Valid]')};
theme.beforeStart = function(){};

theme.info = {};
theme.info.icon = '<svg style="height:22px;width:47px;box-sizing: content-box;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320.23 150.05"><defs><style>.cls-1{fill:#fc5656;}.cls-2{fill:#b32fd3;}.cls-3{fill:url(#Gradiente_sem_nome_49);}</style><linearGradient id="Gradiente_sem_nome_49" x1="-1021.91" y1="912.64" x2="-898.84" y2="912.64" gradientTransform="translate(1114.16 -837.62)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fc5656"/><stop offset="1" stop-color="#b32fd3"/></linearGradient></defs><g id="Camada_2" data-name="Camada 2"><g id="Camada_1-2" data-name="Camada 1"><rect x="215.32" y="40.9" width="19.21" height="70.65"/><rect x="92.25" width="19.11" height="111.55"/><path d="M167.15,39.84a36.48,36.48,0,0,0-17.37,4.38V41.07H130.59V150h19.19V108.58a36.56,36.56,0,1,0,17.37-68.74Zm0,53.87A17.32,17.32,0,1,1,184.47,76.4,17.31,17.31,0,0,1,167.15,93.71Z"/><path d="M53.83,111.37H73l0-70.48H53.87v3.3a36.76,36.76,0,0,0-17.31-4.36,36,36,0,0,0-11.7,1.93,36.55,36.55,0,0,0,0,69.26,36.43,36.43,0,0,0,23.4,0,34.82,34.82,0,0,0,5.61-2.43M36.56,94.13A17.32,17.32,0,1,1,53.87,76.81,17.31,17.31,0,0,1,36.56,94.13Z"/><polygon points="318.51 41.07 305.89 58.94 282.36 58.94 294.97 41.07 318.51 41.07"/><polygon points="320.23 111.55 296.55 111.55 282.36 92.17 268.77 111.55 245.22 111.55 270.5 75.69 270.6 75.55 258.79 58.94 246.09 41.07 269.77 41.07 282.36 58.94 282.38 58.94 294.19 75.69 294.24 75.69 320.23 111.55"/><rect class="cls-1" x="92.25" y="130.94" width="19.11" height="19.11"/><rect class="cls-2" x="196.11" width="19.21" height="19.21"/><rect class="cls-3" x="92.25" y="130.94" width="19.11" height="19.11"/><rect class="cls-3" x="196.11" width="19.21" height="19.21"/></g></g></svg>';
theme.info.external = "https://www.alpix.dev?ref=" + window.location.host;
theme.info.ref = "https://www.alpix.dev/criar-sua-loja-integrada";

theme.load = {};
theme.load.fontawesome = function(){$('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">').appendTo('body')};

//LANGUAGE
theme.lang = {};
theme.lang.productListDetail = "Ver Mais";
theme.lang.productListAdd = "Comprar Agora";
theme.lang.sideCartTitle = "Meu Carrinho";
theme.lang.footerTitle1 = "Institucional";
theme.lang.footerTitle2 = "Categorias";
theme.lang.footerTitle3 = "Pagamento e Segurança";
theme.lang.footerTitle4 = "Newsletter";
theme.lang.searchTitle = "Pesquisar";
theme.lang.searchPlaceholder = "Digite o que procura...";
theme.lang.searchButtonText = "Buscar";
theme.lang.accountTitle = "Minha Conta";
theme.lang.filtersTitle = "Filtrar por";
theme.lang.menuTitle = "Menu";
theme.lang.avisoEstoque = "Aproveite! Apenas [qtde] itens em estoque!";
theme.lang.brandTitle = "Compre por Marca";
theme.lang.testimonialsTitle = "O que dizem da gente";

// THEME FUNCTIONS 
theme.functions = {};

theme.functions.isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

theme.functions.updateListHTML = function (){
    $('.span4 .listagem-item').each(function(){
        $(this).find(".imagem-produto").append('<img src="'+$(this).find(".imagem-principal").data("imagem-caminho")+'" class="imagem-zoom" />')
        let hasVariants = $(this).find('.botao-comprar-ajax').length > 0 ? true : false;
        let id = $(this).attr('class').split(' ')[1].replace('prod-id-','').trim();
        let url = $(this).find('.info-produto > a:first-child').attr('href');        
        let block = $('<div id="theme_list-functions"></div>');
        if(hasVariants){
            block.append($('<a href="/carrinho/produto/'+ id +'/adicionar" class="theme_buttonBuy-ajax">'+ theme.icon.cart +'<span>'+ theme.lang.productListAdd +'</span></a>'));
        }        
        block.append($('<a href="'+ url +'">'+ theme.icon.seeMore +'<span>'+ theme.lang.productListDetail +'</span></a>'));
        $(this).find('.imagem-produto').prepend(block);        
    });
    $('.span4 .listagem-item .acoes-produto, .listagem-item .acoes-produto-responsiva').remove();    
    $('.listagem-item').parent('.span4').removeClass('span4');
    theme.functions.productListImageSize(theme.settings.imageSize);
    theme.functions.flags();    
}

theme.functions.autoLoad = function(){
    var pagination = document.querySelector('.pagination:not(.loading)');
    
    if (pagination && isInViewport(pagination)) {
        let nextPage = $('#theme_listing-info [name="changePage"] > option:selected + option').attr('value');
        if(!$('#theme_listing-info [name="changePage"] > option:selected').is(':last-child')){
            pagination.classList.add('loading');
            $.get(nextPage, function(result){
                $('#theme_listing-info [name="changePage"] > option:selected + option').attr('selected','selected');
                $('#theme_listing-info [name="changePage"] > option:selected').last().prev().removeAttr('selected');
                $(result).find('#listagemProdutos .listagem-linha > ul > li').appendTo('#listagemProdutos > ul');
                updateListHTML();
                $('.pagination').removeClass('loading');
            });    
        }
    }
}


theme.functions.toggleSpanToCols = function(oObj, px){
    for(i = 1; i < 13; i++){
        //$(oObj).find('.span'+i).addClass('px-' + px);
        $(oObj).find('.span'+i).toggleClass('span'+i + ' col-md-'+i);
    }
}

theme.functions.resizeBanners = function(){
    $('.secao-banners img').each(function(){
        let url = $(this).attr('src').replace('400x400/','700x700/').replace('1140x1140/','1920x1920/');
        $(this).attr('src',url);

    })
};

theme.functions.checkColor = function(hex){
    if(hex.includes('rgb')){
        let rgbGet = hex.replace('rgb','').replace('(','').replace(')','').trim().split(',');
        hex = theme.functions.rgbToHex(rgbGet[0].trim(),rgbGet[1].trim(),rgbGet[2].trim());
    }
    let c = hex.substring(1);      // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    //console.log(luma)
    if (luma < 40) {
        //return 'black'    
    }
    return luma
    
}

theme.functions.rgbToHex = function(r, g, b) {
    return "#" + theme.functions.componentToHex(r) + theme.functions.componentToHex(g) + theme.functions.componentToHex(b);
}

theme.functions.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}


theme.functions.componentToHex = function(c){
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

theme.functions.flexDestroy = function(oObj){
    var $els = $(oObj);
    $els.each(function() {
        var $el = $(this);
        var $elClean = $el.clone();
    
        $elClean.find('.flex-viewport').children().unwrap();
        $elClean
        .removeClass('flexslider')
        .addClass('unflexedslider')
        .find('.clone, .flex-direction-nav, .flex-control-nav')
            .remove()
            .end()
        .find('*').removeAttr('style').removeClass(function (index, css) {
            if (typeof css === 'string') {
            return (css.match(/\bflex\S+/g) || []).join(' ');
            }
        });
    
        $elClean.insertBefore($el);
        $el.remove();
    });
};

theme.functions.sessionStorage = function(action,name,content){
    if(action == 'get'){
        try{
            return JSON.parse(sessionStorage.getItem(name))
        }catch(e){
            console.log('Theme - Cannot get ['+name+'] from sessionStorage. Err:' + e);
            return null;
        }        
    }
    if(action == 'set'){
        try{
            sessionStorage.setItem(name,JSON.stringify(content));
            return true;
        }catch(e){
            console.log('Theme - Cannot set ['+name+'] on sessionStorage. Err:' + e);
            return false
        }
        
    }
    if(action == 'remove'){
        sessionStorage.removeItem(name);        
    }
};

theme.functions.localStorage = function(action,name,content){
    if(action == 'get'){
        try{
            return JSON.parse(localStorage.getItem(name))
        }catch(e){
            console.log('Theme - Cannot get ['+name+'] from localStorage. Err:' + e);
            return null;
        }        
    }
    if(action == 'set'){
        try{
            localStorage.setItem(name,JSON.stringify(content));
            return true;
        }catch(e){
            console.log('Theme - Cannot set ['+name+'] on localStorage. Err:' + e);
            return false
        }
        
    }
    if(action == 'remove'){
        localStorage.removeItem(name);        
    }
};

theme.functions.productListImageSize = function(param){
    if(theme.options.productImageFill){
        $('.listagem-item').addClass('theme-imageFill');
    }
    
    let h = $('.listagem-item').first().find('.imagem-produto').innerWidth() * param;
    $('.listagem-item .imagem-produto').css('height',h + 'px'); 


    $('.listagem-item .imagem-produto').each(function(){
        $(this).find('img').each(function(){
            let url = $(this).attr('src').replace('300x300/','600x600/').replace('400x400/','600x600/');
            $(this).attr('src',url);
        })
    });    
}

theme.watch = function(){
    //EXECUTE RN
    theme.functions.productListImageSize(theme.options.productImageSize);

    $(window).load(function(){
        theme.functions.productListImageSize(theme.options.productImageSize);
    });

    $(window).scroll(function(){

    });

    $(window).resize(function(){
        theme.functions.productListImageSize(theme.options.productImageSize);
    });

    //copy
    $('#rodape > div:last-child').remove();
    $('<div id="theme_copy" class="py-3"><div class="container"><div class="bs-row justify-content-between align-items-center"><div class="col-12 col-md-auto"><p>'+ theme.resources.store.copy +'</p></div><div class="col-12 col-md-auto"><div class="align-items-center d-flex"><a target="_blank" href="'+ theme.info.external +'">'+ theme.info.icon +'</a><a target="_blank" href="'+ theme.info.ref +'"><img src="'+ theme.resources.store.logo_li +'"/></a></div></div></div></div></div>').appendTo('body');
    //$('#rodape > div:last-child a').before('<a href="'+ theme.info.external +'" target="_blank">'+ theme.info.icon +'</a>');        
};


$(document).ready(function(){
    
    theme.load.fontawesome();
    try{
        theme.functions.resizeBanners();
        theme.functions.flexDestroy($('.flexslider'));
        
        //BASIC THEME RESOURCE CONTENT
        theme.resources = {};
        theme.resources.store = {};
        theme.resources.store.whatsapp = $('.barra-inicial .canais-contato .fa-whatsapp').parent().text().replace('Whatsapp: ','').trim();
        theme.resources.store.whatsappApp = theme.resources.store.whatsapp.replace('(','').replace(')','').replace(' ','').replace('-','');
        theme.resources.store.phone = $('.barra-inicial .canais-contato .icon-phone').parent().text().replace('Telefone: ','').trim();
        theme.resources.store.phoneApp = theme.resources.store.phone.replace('(','').replace(')','').replace(' ','').replace('-','');
        theme.resources.store.skype = $('.barra-inicial .canais-contato .fa-skype').parent().text().replace('Skype: ','').trim();
        theme.resources.store.mail = $('#rodape [href^="mailto"]').attr('href');
        theme.resources.store.mail = theme.resources.store.mail.replace('mailto:','').trim();
        theme.resources.store.description = $('#rodape .sobre-loja-rodape p').text().trim();
        theme.resources.store.copy = $('#rodape > div:last-child p').text().trim();
        theme.resources.store.logo_li = 'https://lojaintegrada.com.br/new-assets/img/logo.svg';
        

        //HTML BASE COMPONENTS
        theme.html = {};
        theme.html.logo = $('<div></div>').append($('#cabecalho .logo').clone()).html();
        theme.html.searchForm = $('<div></div>').append($('#cabecalho .busca #form-buscar').first().clone()).html();
        theme.html.socialIcons = $('<div></div>').append($('.barra-inicial .lista-redes a').clone()).html();
        theme.html.headerMenu = $('<div></div>').append($('.menu.superior').clone()).html();
        theme.html.footerCategories = $('<div></div>').append($('.links-rodape-categorias > ul').clone()).html();
        theme.html.footerPages = $('<div></div>').append($('.links-rodape-paginas > ul').clone()).html();
        theme.html.footerSeals = $('<div></div>').append($('#rodape .selos').clone()).html();
        theme.html.footerPayments = $('<div></div>').append($('#rodape .bandeiras-pagamento').clone()).html();
        theme.html.footerGateways = $('<div></div>').append($('#rodape .gateways-rodape').clone()).html();
        theme.html.headerCart = $('<div></div>').append($('#cabecalho .carrinho').clone()).html();
        theme.html.newsletter = $('<div></div>').append($('#barraNewsletter').clone()).html();
        theme.html.productInstallments = $('<div></div>').append($('.pagina-produto .parcelas-produto').clone()).html();

        
        //ICONS
        theme.icon = {};
        theme.icon.testimonials = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Chatbubbles</title><path d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/></svg>';
        theme.icon.menu = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Menu</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 160h352M80 256h352M80 352h352"/></svg>';
        theme.icon.sideCartClose = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/></g></g></svg>';
        theme.icon.cart = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Cart</title><circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 80h64l48 272h256"/><path d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>';
        theme.icon.wishlist = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Heart</title><path d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>';
        theme.icon.search = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Search</title><path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M338.29 338.29L448 448"/></svg>';
        theme.icon.account = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Person</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>';
        theme.icon.newsletter = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="email"><rect width="24" height="24" opacity="0"/><path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"/></g></g></svg>';
        theme.icon.filter = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="funnel"><rect width="24" height="24" opacity="0"/><path d="M13.9 22a1 1 0 0 1-.6-.2l-4-3.05a1 1 0 0 1-.39-.8v-3.27l-4.8-9.22A1 1 0 0 1 5 4h14a1 1 0 0 1 .86.49 1 1 0 0 1 0 1l-5 9.21V21a1 1 0 0 1-.55.9 1 1 0 0 1-.41.1zm-3-4.54l2 1.53v-4.55A1 1 0 0 1 13 14l4.3-8H6.64l4.13 8a1 1 0 0 1 .11.46z"/></g></g></svg>';
        theme.icon.seeMore = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="eye"><rect width="24" height="24" opacity="0"/><path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"/><path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/></g></g></svg>';
        theme.icon.close = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>';
        theme.icon.whatsapp = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Whatsapp</title><path d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z" fill-rule="evenodd"/></svg>';
        theme.icon.phone = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Call</title><path d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>';
        theme.icon.skype = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Logo Skype</title><path d="M467.16 303.6a205.69 205.69 0 004.9-45.15c0-116.32-95.69-210.7-213.79-210.7a221.83 221.83 0 00-36.52 3A123.58 123.58 0 00155.93 32C87.55 32 32 86.72 32 154.15A119.56 119.56 0 0049 216a211.16 211.16 0 00-4.32 42.35c0 116.44 95.69 210.7 213.67 210.7a214 214 0 0039.09-3.5A125.45 125.45 0 00356.07 480C424.57 480 480 425.28 480 357.85a118 118 0 00-12.84-54.25zM368 359c-9.92 13.76-24.51 24.73-43.41 32.43S283.36 403 257.69 403c-30.69 0-56.36-5.37-76.55-15.87a101 101 0 01-35.24-30.8c-9.11-12.83-13.66-25.66-13.66-38 0-7.7 3-14.35 8.87-19.95 5.84-5.37 13.42-8.17 22.29-8.17 7.35 0 13.65 2.1 18.79 6.42 4.9 4.08 9.1 10.15 12.48 18.08A108.09 108.09 0 00207 336.15q6.32 8.22 17.86 13.65c7.82 3.62 18.2 5.48 31 5.48 17.62 0 32.09-3.73 42.94-11.08 10.74-7.12 15.88-15.75 15.88-26.25 0-8.28-2.69-14.82-8.29-19.95-5.83-5.37-13.42-9.57-22.87-12.37-9.69-3-22.87-6.18-39.21-9.56-22.17-4.67-41-10.27-56-16.57-15.28-6.42-27.65-15.4-36.76-26.48-9.22-11.32-13.77-25.55-13.77-42.24a67.86 67.86 0 0114.47-42.58c9.57-12.25 23.46-21.82 41.55-28.35 17.74-6.53 38.86-9.8 62.66-9.8 19.14 0 35.83 2.22 49.83 6.42s25.91 10.15 35.36 17.38 16.34 14.93 20.77 23 6.66 16.22 6.66 24c0 7.46-2.92 14.35-8.76 20.3a29.65 29.65 0 01-21.94 9.1c-7.93 0-14.12-1.87-18.43-5.6-4-3.5-8.17-8.87-12.72-16.69-5.37-9.91-11.79-17.85-19.14-23.45-7.24-5.36-19.14-8.16-35.71-8.16-15.29 0-27.77 3-37 9-8.87 5.72-13.19 12.37-13.19 20.18a18.26 18.26 0 004.32 12.25 38.13 38.13 0 0012.72 9.57 90.14 90.14 0 0017.15 6.53c6 1.64 15.87 4.09 29.53 7.12 17.38 3.62 33.25 7.82 47.26 12.13 14.24 4.55 26.49 10 36.52 16.45a72.93 72.93 0 0124.16 25.09c5.72 10 8.64 22.63 8.64 37.1A75.09 75.09 0 01368 359z"/></svg>';
        theme.icon.mail = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Mail</title><rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 160l144 112 144-112"/></svg>';

        
        //JSON STORE INFO
        theme.resources.json = {};

        theme.resources.json.social = $('.barra-inicial .lista-redes a').map(function(i){
            return {
                name : $(this).find('i').attr('class').replace('icon-','').trim(),
                url : $(this).attr('href')        
            };
        }).get();

        theme.resources.json.categories = $('.menu.superior [class^="categoria-id-"] a').map(function(i){
            return {
                name : $(this).text().trim(),
                url : $(this).attr('href'),
                level : $(this).closest('ul').attr('class').replace('borda-alpha','').trim(),
                parent : !$(this).closest('ul').attr('class').includes('nivel-um') ? $(this).closest('ul').closest('li').attr('class').replace('borda-principal','').replace('com-filho','').trim() : null
            };
        }).get();

        theme.resources.json.pages = $('.links-rodape-paginas a').map(function(i){
            return {
                name : $(this).text().trim(),
                url : $(this).attr('href')        
            };
        }).get();

        if($('.pagina-produto').length > 0){
            theme.resources.json.currentProduct = {
                title : $('h1.nome-produto').text().trim(),
                sku : $('.codigo-produto [itemprop="sku"]').text().trim(),
                grid_colors : $('.atributo-cor a').map(function(i){
                    return {
                        colors : $(this).find('span').attr('style').replace('border-color:','').replace('height:0;','').replace('padding:0;','').trim().split(' '),                        
                        variantId : $(this).data('variacao-id'),
                        gradeId : $(this).data('grade-id'),                
                    };
                }).get(),
                grid_options : $('.atributo-comum').map(function(i){
                    return {
                        name : $(this).find('span > b.cor-secundaria').text(),
                        values : $(this).find('a').map(function(i){
                            return {
                                name : $(this).find('span').text().trim(),
                                variantId : $(this).data('variacao-id'),
                                gradeId : $(this).data('grade-id')     
                            };
                        }).get(),
                        
                    };
                }).get()
            }
        }

        //CONTENT FROM "FULLBANNERS" ON LI PANEL
        $('.secao-banners .banner.cheio img').each(function(){
            let trigger = $(this).attr('alt');   
            
            //CATEGORY SLIDER
            if(trigger.includes('[item-categoria]')){
                if($('#theme_categorySlider').length == 0){
                    $('<div id="theme_categorySlider"><div class="slides"></div></div>').prependTo('#corpo > .conteiner');
                }
                $(this).closest('li').appendTo('#theme_categorySlider > .slides'); 
                return true;
            }

            //BENEFITS SLIDER
            if(trigger.includes('[item-vantagem]')){
                if($('#theme_benefitsSlider').length == 0){
                    $('<div id="theme_benefitsSlider"><div class="slides"></div></div>').insertAfter('.secao-banners .banner.cheio');
                }
                $(this).closest('li').appendTo('#theme_benefitsSlider > .slides'); 
                return true;
            }

            //TESTIMONIALS SLIDER
            if(trigger.includes('[item-depoimento]')){
                if($('#theme_testimonialSlider').length == 0){
                    $('<div id="theme_testimonialSlider" class="listagem"><div class="titulo-categoria cor-principal"><i class="svg-ico cor-principal">'+ theme.icon.testimonials +'</i><strong>'+ theme.lang.testimonialsTitle +'</strong></div><div class="slides"></div></div>').prependTo('#corpo > .conteiner');
                }
                $(this).closest('li').appendTo('#theme_testimonialSlider > .slides'); 
                return true;
            }

            //FOOTER LOGO
            if(trigger.includes('[logo-rodape]')){
                if($('#theme_footer-logo').length == 0){
                    $('<div id="theme_footer-logo"></div>').insertBefore('.sobre-loja-rodape > span.titulo');
                }
                let r = $(this).closest('li');
                $(this).appendTo('#theme_footer-logo'); 
                r.remove();
                return true;
            }

            //trigger ICONS
            if(trigger.includes('[icone-menu:')){
                let regExp = /\[iconeMenu:(.*?)\]/;
                let target = regExp.exec(trigger);
                let regExp2 = /\[posicao:(.*?)\]/;
                let position = regExp2.exec(trigger);
                if($('.menu.superior .nivel-um > li > a[title="' + target[1] +'"]').length == 1){
                    let removeAfter = $(this).closest('li');
                    $('.menu.superior .nivel-um > li > a[title="' + target[1] +'"]').closest('li').addClass('theme_icon theme_icon-' + (theme.isMobile ? 'Esquerda' : position[1]));
                    $('.menu.superior .nivel-um > li > a[title="' + target[1] +'"]').prepend('<div class="theme_icon-item"></div>');
                    $(this).appendTo('.menu.superior .nivel-um > li > a[title="' + target[1] +'"] .theme_icon-item');
                    removeAfter.remove();    
                }
                return true;
            }

            //THEME ICONS
            if(trigger.includes('[icone-tema:')){
                let regExp = /\[iconeTema:(.*?)\]/;
                let target = regExp.exec(trigger);
                //terminar aqui
                return true;
            }

            //BANNERS WITH COUNTDOWN
            if(trigger.includes('[timer:')){
                let regExp = /\[timer:(.*?)\]/;
                let info = regExp.exec(trigger);
                let removeAfter = $(this).closest('li');
                
                $(this).closest('li').contents().wrapAll('<div class="item apx_timer apx_timer-onBanner" data-end="'+ info[1] +'"/>');
                $(this).closest('li').find('.apx_timer').append('<div class="apx_timer-Timer"><span class="d"></span><span class="h"></span><span class="m"></span><span class="s"></span></div>')
            }
            
            //SET LABEL ON PRODUCT WITH SPECIFIC CATEGORY ID
            if(trigger.includes('[selo-produto:')){
                let regExp = /\[selo-produto:(.*?)\]/;
                let target = regExp.exec(trigger);
                let removeAfter = $(this).closest('li');
                if(target[1]){
                    $(this).addClass('theme_seals');
                    if($('.prod-cat-' + target[1]).length > 0){
                        $(this).appendTo('.prod-cat-' + target[1] + ' .bandeiras-produto');
                    }
                    removeAfter.remove();    
                }
            }

            //REDUCE IMAGES WHEN HAS A MOBILE VIEW
            if(!trigger.includes('[mobile]') && theme.isMobile){
                $(this).closest('li').remove();                        
            }
            if(trigger.includes('[mobile]') && !theme.isMobile){
                $(this).closest('li').remove();                        
            }

            //SET TOPBAR SLIDER
            if(trigger.includes('[item-tarja-topo]')){
                let removeAfter = $(this).closest('li');
                
                if($('#theme_topbarSlider').length == 0){
                    $('#cabecalho').before('<div class="theme_topbarSlider" id="theme_topbarSlider"></div>');
                }
                $(this).closest('li').appendTo('#theme_topbarSlider');
            }

            //SET BANNERS BETWEEN SECTIONS
            if(trigger.includes('[vitrine-')){
                let regExp = /\[vitrine-(.*?)\]/;
                let match = regExp.exec(trigger);
                let above = trigger.includes('[acima]') ? true : false
                if($('.vitrine-' + match[1]).length == 1){
                    if(above){
                        if($('#theme_customBanners-' + match[1] + '.before').length == 0){
                            $('.vitrine-' + match[1]).before('<div class="theme_customBanners-' + match[1] +' before"></div>');
                        }
                    }else{
                        if($('#theme_customBanners-' + match[1] + '.after').length == 0){
                            $('.vitrine-' + match[1] + ' + ul').after('<div class="theme_customBanners-' + match[1] +' after"></div>');
                        }    
                    }                
                    $(this).closest('li').appendTo('.theme_customBanners-' + match[1] + (above ? '.before' : '.after'));               
                }
            }           
        });

        if($('.banner.cheio img').length  == 0){
            $('.banner.cheio').remove()
        }
        if($('.secao-banners img').length  == 0){
            $('.secao-banners').remove()
        }

        
        //OPTIONS
        theme.options = {};
        theme.options.logo_position = $('.logo-centro').length > 0 ? 'theme_logo_centro' : 'theme_logo_esquerda';
        theme.options.header = 1; //Escolhe o tipo de header. Se for usar html, coloque como "custom"
        theme.options.headerOptions = [1,2,'custom'];
        theme.options.headerTemplates = [
            '<div id="theme_header_1" class="' + theme.options.logo_position + '"> <div class="container-fluid"><div class="bs-row align-items-center justify-content-between"><div id="theme_header-menu-trigger-box" class="col-auto d-block d-md-none"><button type="button" id="theme_header-menu-trigger">'+ theme.icon.menu +'</button></div><div class="col-auto" id="theme_header-logo"></div><div class="col justify-content-center" id="theme_header-menu"></div><div class="col-auto" id="theme_header-functions"> <ul></ul> </div></div></div></div>',
            ''
        ];
        
        theme.options.customHeaderTemplate = "";

        theme.options.footer = 1; 
        theme.options.footerOptions = [1,2,'custom'];
        theme.options.customFooterTemplate = "";

        theme.options.filters = 1; 
        theme.options.filtersOptions = [1,2];

        theme.options.account = 1; 
        theme.options.accountOptions = [1,2];

        theme.options.search = 1; 
        theme.options.searchOptions = [1,2];

        theme.options.productList = 1; 
        theme.options.productListOptions = [1,2];

        theme.options.productGallery = 1; 
        //theme.options.productGallery = [1,2];

        theme.options.productImageSize = 1.4;
        theme.options.productImageFill = true;

        theme.options.activeListWishlist = true;

        theme.options.productListType = 1;

        theme.options.sliders = [];
        theme.options.sliders.config = [];
        theme.options.sliders.config.prevArrow = '<span class="arrow-l"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20"><path fill="#000000" d="M0 15c0 0.128 0.049 0.256 0.146 0.354 0.195 0.195 0.512 0.195 0.707 0l8.646-8.646 8.646 8.646c0.195 0.195 0.512 0.195 0.707 0s0.195-0.512 0-0.707l-9-9c-0.195-0.195-0.512-0.195-0.707 0l-9 9c-0.098 0.098-0.146 0.226-0.146 0.354z"></path></svg></span>';            
        theme.options.sliders.config.nextArrow   = '<span class="arrow-r"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20"><path fill="#000000" d="M0 15c0 0.128 0.049 0.256 0.146 0.354 0.195 0.195 0.512 0.195 0.707 0l8.646-8.646 8.646 8.646c0.195 0.195 0.512 0.195 0.707 0s0.195-0.512 0-0.707l-9-9c-0.195-0.195-0.512-0.195-0.707 0l-9 9c-0.098 0.098-0.146 0.226-0.146 0.354z"></path></svg></span>';
        theme.options.sliders.benefitsStripe = {
            dots: false,
            infinite: true,
            autoplay:true,
            autoplaySpeed:3000,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                breakpoint: 9999,
                settings: "unslick"
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
            ]
        }
        
        theme.options.sliders.brands = {
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows : false,
                        centerMode: true
                    }
                }
            ]
        }
        
        theme.options.sliders.categorySlider = {
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows : false,
                        centerMode: true
                    }
                }
            ]
        }
        
        theme.options.sliders.testimonials = {
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,            
                    centerMode:true
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode:true
                }
                }
            ]  
        }
        
        theme.options.sliders.products = {
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,            
                    centerMode:true
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode:true
                }
                }
            ]  
        }
        
        theme.options.sliders.verticalProductGallery = {
            vertical:true,
            infinite: true,
            centerMode:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,    
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    
                    centerMode:false
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    centerMode:false
                }
                }
            ]    
        }
        theme.options.sliders.horizontalProductGallery = {
            infinite: true,
            centerMode:true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,    
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    centerMode:false
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    centerMode:false
                }
                }
            ]
        }
        theme.options.sliders.premiumProductGallery = {
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
        }
        theme.options.sliders.premiumProductGalleryNav = {
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: theme.options.sliders.config.prevArrow,
            nextArrow: theme.options.sliders.config.nextArrow,
        }

        theme.options.sliders.topbar = {
            infinite: true,
            speed:300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows:false,
            dots:false
        }
        

        //SET CATEGORY SLIDER
        $('#theme_categorySlider li').wrap('<div class="item"/>').contents().unwrap();
        //$('#theme_categorySlider > .slides').apx_slick(theme.options.sliders.categorySlider);

        //SET BENEFITS SLIDER
        $('#theme_benefitsSlider li').wrap('<div class="item"/>').contents().unwrap();
        //$('#theme_benefitsSlider > .slides').apx_slick(theme.options.sliders.benefitsSlider);

        //SET TESTIMONIAL SLIDER - OK
        if($('#theme_testimonialSlider').length > 0){
            $('#theme_testimonialSlider li').wrap('<div class="item"><div></div></div>').contents().unwrap();
            $('#theme_testimonialSlider').each(function(){
                let txt = $(this).find('.titulo').html().split('|');
                $(this).find('.titulo').html('<strong>'+ txt[0] +'</strong><br>'+ txt[1]);
                $(this).find('.titulo').attr('class','');
                $(this).find('img').wrap('<div class="testimonial_cover"/>');
            })
            $('#theme_testimonialSlider > .slides').apx_slick(theme.options.sliders.testimonials);
        }
        
        //SET TOPBAR SLIDER - OK
        $('#theme_topbarSlider li').wrap('<div class="item"/>').contents().unwrap();
        $('#theme_topbarSlider').apx_slick(theme.options.sliders.topbar);

    
        
        //EXEC JS CONFIG FROM LI PANEL
        theme.beforeStart();    

        theme.html.aside = {};
        theme.html.aside.search = '<div class="theme_aside theme_search right"><div class="theme_aside-header"><button type="button" class="search-trigger" >'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.searchTitle +'</span></div><div class="theme_aside-content" id="theme_search"></div></div>' ;
        theme.html.aside.account = '<div class="theme_aside theme_account right"><div class="theme_aside-header"><button type="button" class="account-trigger" >'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.accountTitle +'</span></div><div class="theme_aside-content" id="theme_account"></div></div>';
        theme.html.aside.filters = '<div class="theme_aside theme_filter right"><div class="theme_aside-header"><button type="button" class="filter-trigger" >'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.filtersTitle +'</span></div><div class="theme_aside-content" id="theme_filter"></div></div>';


        //BUILD TEMPLATE
        $('body').append('<div class="theme_aside-shadow"></div>');
        theme.build.header(theme.options.headerOptions.includes(theme.options.header) ? theme.options.header : 1);
        theme.build.footer(theme.options.footerOptions.includes(theme.options.footer) ? theme.options.footer : 1);
        
        theme.build.aside_search();
        theme.build.aside_account();
        theme.build.aside_filters();
        
            
        


        theme.currentPage = $('body').attr('class').split(' ')[0].trim();
        try{        
            theme.build[theme.currentPage]();
        }catch(e){
            console.log('Theme - Err on build template - Err: ' + e)
        }
        
        // theme.build.filters(theme.options.filtersOptions.includes(theme.options.filters) ? theme.options.footer : 1);
        // theme.build.account(theme.options.account.includes(theme.options.account) ? theme.options.account : 1);
        // theme.build.search(theme.options.search.includes(theme.options.search) ? theme.options.search : 1);
        // theme.build.productList(theme.options.productListOptions.includes(theme.options.productList) ? theme.options.productList : 1);
        // theme.build.productGallery(theme.options.productGalleryOptions.includes(theme.options.productGallery) ? theme.options.productGallery : 1);

        theme.watch();
        $('body').css('opacity','1');
    }catch(e)       {
        console.log('Theme Err on load - ' + e);
        $('body').css('opacity','1');
    }
});

theme.build = {};

theme.build.header = function(type){
    
    $('#cabecalho').html(type == "custom" ? theme.options.customHeaderTemplate : theme.options.headerTemplates[(type - 1)]);    

    //APPEND COMPONENTS
    $('#theme_header-logo').append(theme.html.logo);
    $('#theme_header-menu').html(theme.html.headerMenu + '<span class="theme_header-menu-hoverShadow"></span>');
    $('#theme_header-functions > ul').append('<li>' + theme.html.headerCart + '</li>');
    $('#theme_header-functions > ul').prepend('<li class="d-md-block d-none"><button type="button" class="account-trigger">'+ theme.icon.account +'</button></li>');
    $('#theme_header-functions > ul').prepend('<li class="d-md-block d-none"><a href="/conta/favorito/listar">'+ theme.icon.wishlist +'</a></li>');
    $('#theme_header-functions > ul').prepend('<li><button type="button" class="search-trigger">'+ theme.icon.search +'</button></li>');
    $('.carrinho .icon-shopping-cart').before(theme.icon.cart);
    $('.carrinho .icon-shopping-cart').remove();
    $('.barra-inicial, #barraTopo').remove();

    $('#theme_header_1 .menu.superior .nivel-um > .com-filho').mouseover(function(){
        $('#theme_header_1').addClass('theme-hoverShadow-on');
    });
    $('#theme_header_1 .menu.superior .nivel-um > .com-filho').mouseout(function(){
        $('#theme_header_1').removeClass('theme-hoverShadow-on');
    });

    $('#theme_header_1 .menu.superior .nivel-tres ').closest('.nivel-dois').addClass('theme_header-menu-multiColumn')

    //SET TRIPLE MENU ON FIRST
    $('.menu.superior .nivel-tres').closest('li').prependTo($('.menu.superior .nivel-tres').closest('.nivel-dois'));


    //HIDE ITENS FROM CATEGORY MENU
    $('.menu.superior > .nivel-um > li > a > strong:contains(Ocultar)').closest('li').prev('li').nextAll().remove();
};
theme.build.footer = function(type){
    //HIDE ITENS FROM PAGES MENU
    $('#rodape a:contains(Ocultar)').closest('li').prev('li').nextAll().remove();
    if(type == 1){
        $('#barraNewsletter').remove();
        $('#rodape .institucional').addClass('py-5');
        $('#rodape .institucional .span4').addClass('col-12 col-md-auto').removeClass('span4');
        $('#rodape .conteiner').toggleClass('conteiner container')
        $('#rodape').addClass('type_'+type);
        $('#rodape .row-fluid').toggleClass('row-fluid row-flex')
        $('#rodape .institucional .row-flex').addClass('justify-content-between')
        
        $('#rodape .span9').toggleClass('span9 col-12');
        $('.sobre-loja-rodape').toggleClass('col-md-auto col-md-3');
        $('.sobre-loja-rodape').addClass('order-md-first');
        if(theme.html.newsletter){
            $('<div class="col-md-3" id="theme_footer-newsletter">'+ theme.html.newsletter +'</div>').insertAfter('.sobre-loja-rodape');            
        } 
        if(theme.resources.store.mail){
            $('.sobre-loja-rodape').append('<div id="theme_contact-mail" class="theme_contact"><i class="svg-ico">'+ theme.icon.mail +'</i><a href="mailto:'+ theme.resources.store.mail +'">'+ theme.resources.store.mail +'</a></div>');
        }
        if(theme.resources.store.phone){
            $('.sobre-loja-rodape').append('<div id="theme_contact-phone" class="theme_contact"><i class="svg-ico">'+ theme.icon.phone +'</i><a href="tel:+55'+ theme.resources.store.phoneApp +'">'+ theme.resources.store.phone +'</a></div>');
            
        }
        if(theme.resources.store.whatsapp){
            $('.sobre-loja-rodape').append('<div id="theme_contact-whatsapp" class="theme_contact"><i class="svg-ico">'+ theme.icon.whatsapp+ '</i><a href="https://wa.me/55'+ theme.resources.store.whatsappApp +'">'+ theme.resources.store.whatsapp +'</a></div>');
        }
        if(theme.resources.store.skype){
            $('.sobre-loja-rodape').append('<div id="theme_contact-skype" class="theme_contact"><i class="svg-ico">'+ theme.icon.skype +'</i><a href="skype:'+ theme.resources.store.skype +'?chat">'+ theme.resources.store.skype +'</div>');
        }
        $('.sobre-loja-rodape').append('<div id="theme_footer-social">'+ theme.html.socialIcons +'</div>');
        $('#rodape .redes-sociais').closest('.span3').remove();
        $('#rodape .pagamento-selos .row-flex').addClass('justify-content-between');
        $('#rodape .pagamento-selos').addClass('py-0 mt-5');
        $('#rodape .pagamento-selos .span4').toggleClass('span4 col-md-auto');        
        $('#rodape .pagamento-selos').appendTo('#rodape .institucional');
        let bgCC = theme.functions.checkColor($('#rodape .institucional').css('background-color'));
        let txtCC = theme.functions.checkColor($('#rodape .institucional .titulo').first().css('color'))
        if(bgCC - txtCC < 5){
            $('#rodape .institucional').addClass('theme_contrastFixWhite');
        }
    }
};
theme.build.aside_filters = function(){

};
theme.build.aside_account = function(){
    $('body').append(theme.html.aside.account);
    let menu = $('<ul></ul>');
    if(theme.isLogged){
        menu.append('<li><a href="/conta/index">Meus dados</a></li>');
        menu.append('<li><a href="/conta/pedido/listar">Meus pedidos</a></li>');
        menu.append('<li><a href="/conta/logout">Sair</a></li>');
    }else{
        menu.append('<li><form id="apx_sideLogin" action="/conta/login" method="post"><label>E-mail<input id="id_email" maxlength="128" name="email" type="text"></label><label>Senha<input id="id_senha" maxlength="32" name="senha" type="password"></label><div><button type="submit" class="botao principal">Entrar</button><button id="recoverPassword" data-toggle="modal"> <i class="icon-lock cor-secundaria"></i> Esqueceu a senha? </button></div></form></li>');
        menu.append('<li><a href="/conta/criar?next=conta_index&email=_">Cliente novo? Cadastre-se</a></li>');
    }
    menu.append('<li class="divider"></li>');
    
    $('#theme_account').append(menu);
    $('.account-trigger').click(function(){   
        $('body').toggleClass('asideAccount-visible');         
    });

    $('#recoverPassword').click(function(){
        let mail = $('#apx_sideLogin #id_email');
        $.get('/conta/recuperar_senha?email=' + mail.val(), function(data){
            let res = JSON.parse(data);
            console.log(res.mensagem);
            if(res.status == "erro"){
                mail.focus()
            }
            alert(res.mensagem);
        })
    });
};
theme.build.aside_search = function(){
    $('body').append(theme.html.aside.search)
    $('#theme_search').append(theme.html.searchForm);

    $('#theme_search #auto-complete').attr('placeholder',theme.lang.searchPlaceholder);
    $('#theme_search .botao.icon-search').text(theme.lang.searchButtonText);
    $('#theme_search .botao.icon-search').removeClass('icon-search');

    $('.search-trigger').click(function(){   
        $('body').toggleClass('asideSearch-visible');         
        $('#theme_search input').val('');
        //$('#theme_search input').autocomplete('destroy');
    });

    $("#theme_search input").autocomplete({
        delay: 300,
        minLength: 5,
        source: function(o, n) {
            $.ajax({
                url: "//api.awsli.com.br/v2/autocomplete/" + LOJA_ID,
                dataType: "json",
                data: {
                    q: o.term,
                    size: 3,
                    ttl: 300
                },
                success: function(p) {
                    n($.map(p.hits, function(q) {
                        console.log(q);
                        if (q.imagens) {
                            return {
                                label: '<span class="img"><img src="' + MEDIA_URL + "80x80/" + q.imagens[0].caminho + '?type=trim" /></span><span>' + q.nome + '</span>',
                                value: q.nome,
                                url: q.canonical_path
                            }
                        } else {
                            return {
                                label: '<span class="img"></span><span>' + q.nome + '</span>',
                                value: q.nome,
                                url: q.canonical_path
                            }
                        }
                    }))
                }
            })
        },
        open: function(n, o) {
            $(this).autocomplete("widget").css("z-index", 100000);
            $(this).autocomplete("widget").width($(this).parent().width())
        },
        select: function(n, o) {
            console.log(o);
            window.location = o.item.url
        }
    });
    $("#theme_search input").each(function() {
        $(this).data("ui-autocomplete")._renderItem = function(n, o) {
            return $("<li></li>").data("item.autocomplete", o).append("<a>" + o.label + "</a>").appendTo(n)
        }
    });
    
};
theme.build.productList = function(type){
    $('.listagem > ul > li > ul > li').attr('class','');
    $('.listagem-item').unwrap().unwrap().unwrap().wrap('<li/>');
   
    if($('.produtos-carrossel').length){
        $('.produtos-carrossel').each(function(){
            let listagemUL = $(this);
            let listagemQtdLinhas = $(this).attr('data-produtos-linha');
            theme.options.sliders.products.slidesToShow = parseInt(listagemQtdLinhas);
            listagemUL.apx_slick(theme.options.sliders.products);
            listagemUL.find('[data-imagem-caminho]').each(function(){
                $(this).after('<img src="'+ $(this).attr('data-imagem-caminho')+'" class="imagem-zoom"/>');
            })
        })   
    }else{
        $('.listagem.aproveite-tambem ul').addClass('row-flex');
        $('.listagem.aproveite-tambem ul > li').addClass('col-6 col-md-3');
    }
    
    $('.listagem-item .acoes-produto, .listagem-item .acoes-produto-responsiva').remove(); 

    $('.listagem-item .preco-produto > div:not(:first-child), .listagem-item .preco-produto > div:not(:first-child) *').addClass('cor-secundaria');
    $('.listagem-item .titulo').removeClass('titulo');

    theme.build.listItemFunctions(theme.options.productListType);
};
theme.build.listItemFunctions = function(type){
    $('.listagem-item').addClass('type_' + type);
    
    if(type == 1){
        $('.listagem-item').each(function(){
            let hasVariants = $(this).find('.botao-comprar-ajax').length > 0 ? true : false;
            let id = $(this).attr('class').split(' ')[1].replace('prod-id-','').trim();
            let url = $(this).find('.info-produto > a:first-child').attr('href');        
            let block = $('<div id="theme_list-functions"></div>');
            if(hasVariants){
                block.append($('<a href="/carrinho/produto/'+ id +'/adicionar" class="theme_buttonBuy-ajax">'+ theme.icon.cart +'<span>'+ theme.lang.productListAdd +'</span></a>'));
            }        
            block.append($('<a href="'+ url +'">'+ theme.icon.seeMore +'<span>'+ theme.lang.productListDetail +'</span></a>'));
            $(this).find('.imagem-produto').prepend(block);        
        });
        
        let bgCC = theme.functions.checkColor($('.listagem-item.type_1 #theme_list-functions > a').first().css('background-color'));
        let txtCC = theme.functions.checkColor($('.listagem-item.type_1 #theme_list-functions > a span').first().css('color'));
        if(bgCC - txtCC < 5){
            $('.listagem-item.type_1 #theme_list-functions > a').css('color','white');
            $('.listagem-item.type_1 #theme_list-functions > a svg').css('fill','white');
        }
        
    }
}
theme.build.productGallery = function(type){
    if(type == 1){
        $('.produto-thumbs img').each(function(){
            let crop = $(this).attr('src').split('/')[3];
            let removeCrop = $(this).attr('src').replace(crop,'150x150');
            $(this).attr('src',removeCrop);
        });
    
        let h = $('.thumbs-vertical .produto-thumbs .miniaturas a').first().innerWidth() * theme.options.productImageSize;
        $('.thumbs-vertical .produto-thumbs .miniaturas a').css('height', h + 'px!important');
        
        $('.comprar .icon-shopping-cart').remove();
    
        $('.lista-favoritos').appendTo('.codigo-produto').attr('class','lista-favoritos adicionar-favorito')
        $('.lista-favoritos .icon-plus').before(theme.icon.wishlist);
        $('.lista-favoritos .icon-plus').remove();
    
        if($('.thumbs-vertical').length > 0){
            theme.functions.flexDestroy($('.thumbs-vertical #carouselImagem'));
            if($('.thumbs-vertical #carouselImagem .miniaturas a').length > theme.options.sliders.verticalProductGallery.slidesToShow){
                $('.thumbs-vertical #carouselImagem .miniaturas').apx_slick(theme.options.sliders.verticalProductGallery);
            }
        };

        if($('.thumbs-horizontal').length > 0){
            theme.functions.flexDestroy($('.thumbs-horizontal'));
            $('.thumbs-horizontal #carouselImagem .miniaturas').apx_slick(theme.options.sliders.horizontalProductGallery);
            $(".produto-thumbs").on("click", ".miniaturas li a", function(d) {
                d.preventDefault();
                $(this).parent().siblings().removeClass("active");
                $(this).parent().addClass("active");
                var c = $("#imagemProduto").data("imagezoom");
                if (c) {
                    c.changeImage($(this).find("img").attr("data-mediumimg"), $(this).find("img").attr("data-largeimg"))
                }
            })
        };

        $('.produto-thumbs img').each(function(){
            let crop = $(this).attr('data-mediumimg').replace('600x700','1000x1000');
            $(this).attr('data-mediumimg', crop);
        });
        
        $('[data-imagem-grande]').each(function(){
            let url = $(this).attr('data-imagem-grande').replace('1000x1000','1500x1500')
            $(this).attr('data-imagem-grande', url);
        });
        $('[data-mediumimg]').each(function(){
            let url = $(this).attr('data-mediumimg').replace('600x1000','1500x1500')
            $(this).attr('data-mediumimg', url);
        })
        
        $('.produto .conteiner-imagem img').each(function(){
            let url = $(this).attr('src').replace('600x1000','1500x1500')
            $(this).attr('src', url);
        })
            
        $('.thumbs-vertical #carouselImagem .miniaturas li.slick-slide.slick-center a').click();
        
        $(window).load(function(){
            $('.thumbs-vertical #carouselImagem .miniaturas li.slick-slide.slick-center a').click();
        })
    }
};
theme.build.breadcrumb = function(type){
    $('<div class="conteiner theme-bc"></div>').prependTo('#corpo');
    $('.breadcrumbs').appendTo('.theme-bc');
    $('.breadcrumbs > ul > li:first-child > a').html('Página Inicial');
    $('.breadcrumbs > ul').append('<li><strong class="cor-secundaria">'+ $('.info-principal-produto h1.nome-produto.titulo').text() +'</strong></li>');
};

theme.build['pagina-inicial'] = function(){
    if($('.secao-principal > .coluna').length){
        $('.secao-principal > .conteudo').toggleClass('span9 span12');
        $('.secao-principal > .coluna').remove();
    }
    if($('.marcas').length){
        //theme.functions.flexDestroy($('.marcas .unflexedslider'));
        $('.marcas .slides').apx_slick(theme.options.sliders.brands);
        $('<div class="titulo-categoria cor-principal"><strong>'+ theme.lang.brandTitle +'</strong></div>').prependTo('.marcas');
    }
    if($('.listagem-item')){
        $('.titulo-categoria').each(function(k){
            $(this).addClass('block_'+k);
            $(this).next('ul').addClass('block_'+k);
            $('.block_' + k).wrapAll('<div class="content_'+ k +'"></div>');
        })
        theme.build.productList();
    }    
};

theme.build['pagina-produto'] = function(){
    theme.build.breadcrumb();
    theme.build.productList();

    if($('.secao-principal > .coluna').length){
        $('.secao-principal > .produto').toggleClass('span9 span12');
        $('.secao-principal > .coluna').remove();
    }

    theme.build.productGallery(theme.options.productGallery);

    $('.qtde_estoque').each(function(){
        let estoque = parseInt($(this).text());
        if(theme.settings.avisoEstoque >= estoque){
            let aviso = theme.lang.avisoEstoque.replace('[qtde]',estoque);
            $('<p class="theme-avisoEstoque">'+ aviso +'</p>').insertBefore($(this).closest('.comprar'))
        }
    });

    $('.qtde-adicionar-carrinho').append('<button type="button"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg></button>');
    $('.qtde-adicionar-carrinho').prepend('<button class="minus" type="button"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Remove</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112"/></svg></button>');

    $('.qtde-adicionar-carrinho button').click(function(){
        let me = $(this).closest('.qtde-adicionar-carrinho');
        let input = me.find('input');
        let qtd = parseInt(input.val());

        if($(this).hasClass('minus')){
            qtd = qtd - 1
        }else{
            qtd = qtd + 1
        }

        if(qtd < 1){qtd = 1}

        input.val(qtd);
        input.trigger('change');
    });

    $('.botao-comprar-ajax').unbind();
    $('.botao-comprar-ajax').removeAttr('data-loading-text');
    $('.botao-comprar-ajax').addClass('theme_buttonBuy-ajax').removeClass('botao-comprar-ajax');
    
};

theme.build['pagina-categoria'] = function(){
    theme.build.breadcrumb();
};
theme.build['pagina-busca'] = theme.build['pagina-categoria'];
theme.build['pagina-marca'] = theme.build['pagina-categoria'];

theme.build['pagina-carrinho'] = function(){    
    //ZIP ON RESUME CART
    $('.pagina-carrinho #formCalcularFrete').closest('tr').attr('id','cep-wrapper');
    $('.pagina-carrinho .bg-dark').each(function(){
        if($(this).html().trim().length == 0){
            $(this).remove();
        }
    })
}

//GET CSS VARIABLES
theme.colors = {};
theme.colors.primary = getComputedStyle(document.documentElement)
.getPropertyValue('--cor-primaria').trim();
theme.colors.secondary = getComputedStyle(document.documentElement)
.getPropertyValue('--cor-secundaria').trim();
theme.colors.button = getComputedStyle(document.documentElement)
.getPropertyValue('--cor-botao').trim();
theme.colors.slrgb = theme.functions.hexToRgb(theme.colors.secondary);
theme.colors.secondary_light = 'rgba('+theme.colors.slrgb.r+','+theme.colors.slrgb.g+','+theme.colors.slrgb.b+', .7)'
theme.colors.secondary_lighter = 'rgba('+theme.colors.slrgb.r+','+theme.colors.slrgb.g+','+theme.colors.slrgb.b+', .3)'
document.documentElement.style.setProperty('--cor-secundaria-light',theme.colors.secondary_light);
document.documentElement.style.setProperty('--cor-secundaria-lighter',theme.colors.secondary_lighter);


