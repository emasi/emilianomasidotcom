(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    this.Class = function(){};
    Class.extend = function(prop) {
        var _super = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }
        function Class() {
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();

angular.module("em", ["ngRoute"]);

angular.module("em").controller("MainCtrl", ["$scope", "$timeout", function(scope, timeout){
  //Setting opening header image
  scope.openingHeaderImagePath;
  timeout(function () {
      scope.openingHeaderImagePath = "images/opening_header_hd.jpg";
  }, 50);
}]);

angular.module("em").directive("container", [function(){
  var winObj = $(window);
  function setMarginTop(){
    $("#container").css('margin-top', $('header').outerHeight()+"px");
  }
  return {
    link: function (scope, element, attrs){
      setMarginTop();
      winObj.on("resize", function(){
        setMarginTop();
      });
    }
  }
}]);

angular.module("em").directive("topBar", ["$rootScope", "$window", "scrollService", function(rootScope, window,scrollService){
  var topBarDirectiveInstance;
  return {
    link: function(scope, element, attrs) {
      topBarDirectiveInstance = new TopBarDirective(scope, element, attrs, rootScope, window, scrollService);
    }
  }
}]);

angular.module("em").service("scrollService", ["$rootScope", "$timeout", function(rootScope, timeout) {
  var win = $(window), globalContainers = $("html, body"), headerHeight = $("header").outerHeight();
  var scrollServiceObject = {
      hasVerticalScroll: function() {
        return document.documentElement.clientWidth < win.innerWidth;
      },
      //It scrolls of "value" pixels if defined, otherwise it will gives you back the actual pixels scrolled
      scrollTop: function(value){
        if(typeof value !== "undefined"){
          globalContainers.scrollTop(value);
          return this;
        }else{
          return win.scrollTop();
        }
      }
  };
  return scrollServiceObject;
}]);

var AbstractAngularDirective = Class.extend({
  init: function(scope, element, attrs) {
    this.$scope = scope;
    this.$element = element;
    this.attrs = attrs;
  },
  exposePublicMethod: function(key, method) {
    this.$scope[key] = method.bind(this);
  }
});

var TopBarDirective = AbstractAngularDirective.extend({
  init: function(scope, element, attrs, rootScope, window, scrollService){
    this._super(scope, element, attrs);
    this.$rootScope = rootScope;
    this.scrollService = scrollService;
    this.isInPositionRelative = false;
    
    this.calculatePositioning();
    var currObjInstance = this;
    angular.element(window).bind("scroll", function(){
      currObjInstance.calculatePositioning();
    });
    angular.element(window).bind("resize", function(){
      currObjInstance.calculatePositioning();
    });
  },
  calculatePositioning: function(){
    if(this.scrollService.scrollTop() < $("header").outerHeight()-5){
      if(!this.isInPositionRelative){
        this.$element.css("position","relative");
        this.isInPositionRelative = !this.isInPositionRelative;
        this.$element.parent().find('#content').css('margin-top', '0');
      }
    }else{
      if(this.isInPositionRelative){
        this.$element.css("position","fixed");
        this.isInPositionRelative = !this.isInPositionRelative;
        this.$element.parent().find('#content').css('margin-top', this.$element.outerHeight());
      }
    }
  }
});
