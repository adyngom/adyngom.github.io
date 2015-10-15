var Utils = (function(win, undef) {
  Utils = {
    /**
     * this is a port of the assign fuction in the lodash library
     * allowing to merge objects
     * @param  {[type]} object [description]
     * @return {[type]}        [description]
     */
    extend: function(object) {
      if (!object) {
        return object;
      }
      for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
        var iterable = arguments[argsIndex];
        if (iterable) {
          for (var key in iterable) {
            if(iterable.hasOwnProperty(key)) {
              object[key] = iterable[key];
            }  
          }
        }
      }
      return object;
    }
  };
  return Utils;
}(window, undefined));

/**
 * Sliderr function - allows sliding of related DOM elements
 * @param  {Number}    i    starting index of the slides - defaults to 0
 * @param  {String}    el   DOM target parent element of all the slides
 * @param  {Object}    opts User optional parameters
 * @return {Sliderr}   Sliderr instance
 */
var Sliderr = (function (win, undefined) {

  "use strict";
  /**
   * [Sliderr description]
   * @param {[type]} i    [description]
   * @param {[type]} el   [description]
   * @param {[type]} opts [description]
   */
  function Sliderr (i, el, opts) {
    this._index = (typeof i === "number") ? Math.floor(i) : 0,
    this._el = document.getElementById(el),
    this.slides = this._el.children,
    this.lastSlide = i,
    this.slideWidth = this.slides[0].offsetWidth,
    this.len = this.slides.length,
    this.container = document.getElementsByTagName("body")[0],
    this.slideshow = null,
    this.defaults = {
      slideshow: true,
      slidetime: 3000
    };

    this.options = (!!opts) ? Utils.extend({}, this.defaults, opts) : this.defaults;

    //console.log(this.options);

    if (!this.slides) {
      return false;
    }
    return this;
  }

  Sliderr.prototype = {
    animations : {},
    setAnimation: function(name) {
      if(!!this.animations[name]) {
        this.animation = name;
        this.animations[name].init.call(this);
      }
    },
    addAnimation : function (name, params) {
      if(!(name in params)){
        this.animations[name] = params;
      }else{
        //throw "Blah";
      }
    },
    slideNext: function() {
        this._increment();
        this.animations[this.animation].next.call(this);
      },

    slidePrev: function() {
      this._decrement();
      this.animations[this.animation].prev.call(this);
    },
    
    slideTransition: function() {

    },

    slidePause: function() {
      //console.log("pausing slideshow");
      //console.log(this.slideshow);
      clearTimeout(this.slideshow);
    },

    slideShow: function() {
      var that = this;
      //console.log(that.options.slidetime);
      that.slideshow = setTimeout (function callee() {
          slider.slideNext();
          that.slideshow = setTimeout(callee, 4000);
      }, 1000);
    },

    slideControls: function () {
      
      var that = this;
      
      return {
        buttons: function() {

        },
        keyboard: function () {
          that.container.addEventListener("keydown", function(e) {
            var thisKey = e.keyCode,
                keyMap = {
                  "37": "leftArrow",
                  "38": "upArrow",
                  "39": "rightArrow",
                  "40": "downArrow"
                };
                if(!!keyMap[thisKey]) {
                  that.slidePause()
                  switch(thisKey.toString()) {
                    case "37": 
                      that.slidePrev();
                    break;

                    case "39":
                      that.slideNext();
                    break;
                  }
                }
          }, false);  
        }
      }
    },
    
    _increment: function () {
      this.lastSlide = this._index;
      this._index = (this._index < (this.len - 1) ) ? this._index + 1 : 0;
    },

    _decrement: function () {
      this.lastSlide = this._index;
      this._index = (this._index > 0 ) ? this._index - 1 : (this.len - 1);
    }
  }; 

  return Sliderr;

}(window, undefined)); 