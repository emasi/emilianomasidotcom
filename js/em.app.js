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

//------ Main Directives ------

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
      element.removeClass("hidden");
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

angular.module("em").directive("parallax", ["$rootScope", "scrollService", function(rootScope, scrollService){
  var parallaxDirectiveInstance;
  return{
    link: function(scope, element, attrs){
      
      var parallaxParentClass = "parallax-parent",
      parallaxContainerClass = "parallax-container",
      parallaxImageClass = "parallax-image",
      parallaxContentClass = "parallax-content",
      parallaxParentElement,
      parallaxContainerElement,
      parallaxImageElement,
      parallaxContentElement,
      parallaxContainerElementPosition,
      isInViewState;
      
      function init(){
        win = $(window);
        parallaxParentElement = $("."+parallaxParentClass);
        parallaxContainerElement = $(document.createElement("div"));
        parallaxImageElement = $(document.createElement("div"));
        parallaxContentElement = $(document.createElement("div"));
        
        parallaxContainerElement.addClass(parallaxContainerClass);
        parallaxContainerElement.addClass(element.attr("class").split(" ")[0]);
        parallaxImageElement.addClass(parallaxImageClass);
        parallaxContentElement.addClass(parallaxContentClass);
        
        //TODO check for mobile vs desktop
        parallaxContainerElement.append(parallaxImageElement);
        parallaxContainerElement.append(parallaxContentElement);
        $(element.find(".inner")[0]).appendTo(parallaxContentElement);
        parallaxParentElement.append(parallaxContainerElement);
        
        parallaxContainerElement.css("visibility","hidden");
        
        scrollService.addScrollEventCallback(startEffect);
      }
      
      function startEffect(){
        if(isInView()){
          if(!isInViewState){
            parallaxContainerElement.css("height",element.outerHeight()+"px");
            parallaxContainerElement.css("visibility","visible");
            isInViewState = true;
            
          }
          
          var elementOffsetTop = element.offset().top, currentScrollTop = scrollService.scrollTop();
          TweenMax.to(parallaxContainerElement, 0,{top: elementOffsetTop-currentScrollTop});
          TweenMax.to(parallaxImageElement, 0,{top: -((elementOffsetTop-currentScrollTop)*0.5)-(element.outerHeight()*0.5)});

        }else if(!isInView() && isInViewState){
          parallaxContainerElement.css("visibility","hidden");
          parallaxContainerElement.css("height","");
          isInViewState = false;
        }
      }
      
      function isInView(){
        var elementOffsetTop = element.offset().top, currentScrollTop = scrollService.scrollTop();
        return (elementOffsetTop+element.outerHeight() >= currentScrollTop) && (elementOffsetTop <= currentScrollTop+win.height());
      }
      
      init();
    }
  }
}]);

//------ Services ------

angular.module("em").service("scrollService", ["$rootScope", function(rootScope) {
  var win = $(window), globalContainers = $("html, body"), headerHeight = $("header").outerHeight(), callbacksStack = [], isWindowCallbackSetted = false;
  
  function windowCallbackManager(){
    if (callbacksStack.length > 0 && !isWindowCallbackSetted) {
      win.on("scroll.scrollService", runCallbacksStack);
      isWindowCallbackSetted = true
    } else if (callbacksStack.length == 0 && isWindowCallbackSetted) {
      win.off("scroll.scrollService");
      isWindowCallbackSetted = false
    }
  }
  
  function runCallbacksStack(event){
    //TODO improve performances with window.requestAnimationFrame()
    var stackLength = callbacksStack.length;
    for (var i = 0; i < stackLength; i++){
      callbacksStack[i](event);
    }
  }
  
  var scrollServiceObject = {
      hasVerticalScroll: function() {
        return document.documentElement.clientWidth < win.innerWidth;
      },
      scrollTop: function(value){
        if(typeof value !== "undefined"){
          globalContainers.scrollTop(value);
          return this;
        }else{
          return win.scrollTop();
        }
      },
      addScrollEventCallback: function(callbackFn){
        if (!scrollServiceObject.hasScrollEventCallback(callbackFn)) {
          callbacksStack.push(callbackFn);
        }
        windowCallbackManager();
      },
      hasScrollEventCallback: function(callbackFnToCheck){
        return callbacksStack.indexOf(callbackFnToCheck) > -1;
      }
  };
  return scrollServiceObject;
}]);

//------ Directives Objects ------

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
    var currentHeight = this.$element.outerHeight();
    var contentId = "content";
    if(this.scrollService.scrollTop() < $("header").outerHeight()){
      if(!this.isInPositionRelative){
        this.$element.css("position","relative");
        this.isInPositionRelative = !this.isInPositionRelative;
        this.$element.parent().children("#"+contentId).css("margin-top","0");
      }
    }else{
      if(this.isInPositionRelative){
        this.$element.css("position","fixed");
        this.isInPositionRelative = !this.isInPositionRelative;
        this.$element.parent().children("#"+contentId).css("margin-top", currentHeight+"px");
      }
    }
    this.$rootScope.isInPositionRelative = this.isInPositionRelative;
  }
});

// ------ Miscellaneus Functions ------

var DeviceInfo;
DeviceInfo = {initCompleted: !1,isWebkit: !1,isMobilePhone: !1,isIphone: !1,isAndroid: !1,isAndroidPhone: !1,isTierTablet: !1,isTierIphone: !1,isTierRichCss: !1,isTierGenericMobile: !1,engineWebKit: "webkit",deviceIphone: "iphone",deviceIpod: "ipod",deviceIpad: "ipad",deviceMacPpc: "macintosh",deviceAndroid: "android",deviceGoogleTV: "googletv",deviceHtcFlyer: "htc_flyer",deviceNuvifone: "nuvifone",deviceSymbian: "symbian",deviceSymbos: "symbos",deviceS60: "series60",deviceS70: "series70",deviceS80: "series80",deviceS90: "series90",deviceWinPhone7: "windows phone os 7",deviceWinMob: "windows ce",deviceWindows: "windows",deviceIeMob: "iemobile",devicePpc: "ppc",enginePie: "wm5 pie",deviceBB: "blackberry",vndRIM: "vnd.rim",deviceBBStorm: "blackberry95",deviceBBBold: "blackberry97",deviceBBBoldTouch: "blackberry 99",deviceBBTour: "blackberry96",deviceBBCurve: "blackberry89",deviceBBCurveTouch: "blackberry 938",deviceBBTorch: "blackberry 98",deviceBBPlaybook: "playbook",devicePalm: "palm",deviceWebOS: "webos",deviceWebOShp: "hpwos",deviceBada: "bada",engineBlazer: "blazer",engineXiino: "xiino",deviceKindle: "kindle",engineSilk: "silk",vndwap: "vnd.wap",wml: "wml",deviceTablet: "tablet",deviceBrew: "brew",deviceDanger: "danger",deviceHiptop: "hiptop",devicePlaystation: "playstation",deviceNintendoDs: "nitro",deviceNintendo: "nintendo",deviceArchos: "archos",engineOpera: "opera",engineNetfront: "netfront",engineUpBrowser: "up.browser",deviceMidp: "midp",uplink: "up.link",engineTelecaQ: "teleca q",engineObigo: "obigo",devicePda: "pda",mini: "mini",mobile: "mobile",mobi: "mobi",maemo: "maemo",linux: "linux",mylocom2: "sony/com",manuSonyEricsson: "sonyericsson",manuericsson: "ericsson",manuSamsung1: "sec-sgh",manuSony: "sony",manuHtc: "htc",svcDocomo: "docomo",svcKddi: "kddi",svcVodafone: "vodafone",disUpdate: "update",iE: "msie",uagent: "",startDetection: function() {
        this.initCompleted = !1;
        navigator && navigator.userAgent && (this.uagent = navigator.userAgent.toLowerCase());
        this.isWebkit = this.detectWebkit();
        this.isIphone = this.detectIphone();
        this.isAndroid = this.detectAndroid();
        this.isAndroidPhone = this.detectAndroidPhone();
        this.isTierTablet = this.detectTierTablet();
        this.isMobilePhone = this.detectMobileQuick();
        this.isTierIphone = this.detectTierIphone();
        this.initCompleted = !0
    },detectSmartphone: function() {
        return this.detectIphoneOrIpod() || this.detectAndroidPhone() || this.detectS60OssBrowser() || this.detectSymbianOS() || this.detectWindowsMobile() || this.detectWindowsPhone7() || this.detectBlackBerry() || this.detectPalmWebOS() || this.detectPalmOS() || this.detectBada() ? !0 : !1
    },detectMobileQuick: function() {
        return this.initCompleted || this.isMobilePhone ? this.isMobilePhone : this.detectTierTablet() ? !1 : this.detectSmartphone() ? !0 : this.detectKindle() || this.detectAmazonSilk() ? !0 : this.uagent.search(this.mobile) > -1 ? !0 : this.uagent.search(this.deviceMidp) > -1 || this.detectBrewDevice() ? !0 : this.detectOperaMobile() || this.detectArchos() ? !0 : this.uagent.search(this.engineObigo) > -1 || this.uagent.search(this.engineNetfront) > -1 || this.uagent.search(this.engineUpBrowser) > -1 ? !0 : !1
    },detectTierTablet: function() {
        return this.initCompleted || this.isTierTablet ? this.isTierTablet : this.detectIpad() || this.detectAndroidTablet() || this.detectBlackBerryTablet() || this.detectWebOSTablet() ? !0 : !1
    },detectTierIphone: function() {
        return this.initCompleted || this.isTierIphone ? this.isTierIphone : this.detectIphoneOrIpod() || this.detectAndroidPhone() || this.detectWindowsPhone7() || this.detectBlackBerryWebKit() && this.detectBlackBerryTouch() || this.detectPalmWebOS() || this.detectBada() || this.detectGarminNuvifone() ? !0 : !1
    },detectIphone: function() {
        return this.initCompleted || this.isIphone ? this.isIphone : this.uagent.search(this.deviceIphone) > -1 ? this.detectIpad() || this.detectIpod() ? !1 : !0 : !1
    },detectIpod: function() {
        return this.uagent.search(this.deviceIpod) > -1 ? !0 : !1
    },detectIphoneOrIpod: function() {
        return this.uagent.search(this.deviceIphone) > -1 || this.uagent.search(this.deviceIpod) > -1 ? !0 : !1
    },detectIpad: function() {
        return this.uagent.search(this.deviceIpad) > -1 && this.detectWebkit() ? !0 : !1
    },detectIos: function() {
        return this.detectIphoneOrIpod() || this.detectIpad() ? !0 : !1
    },detectAndroid: function() {
        return this.initCompleted || this.isAndroid ? this.isAndroid : this.uagent.search(this.deviceAndroid) > -1 || this.detectGoogleTV() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },detectAndroidPhone: function() {
        return this.initCompleted || this.isAndroidPhone ? this.isAndroidPhone : this.detectAndroid() && this.uagent.search(this.mobile) > -1 ? !0 : this.detectOperaAndroidPhone() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },detectAndroidTablet: function() {
        return this.detectAndroid() ? this.detectOperaMobile() ? !1 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !1 : this.uagent.search(this.mobile) > -1 ? !1 : !0 : !1
    },detectGoogleTV: function() {
        return this.uagent.search(this.deviceGoogleTV) > -1 ? !0 : !1
    },detectWebkit: function() {
        return this.initCompleted || this.isWebkit ? this.isWebkit : this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },detectS60OssBrowser: function() {
        return this.detectWebkit() ? this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbian) > -1 ? !0 : !1 : !1
    },detectSymbianOS: function() {
        return this.uagent.search(this.deviceSymbian) > -1 || this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbos) > -1 && this.detectOperaMobile || this.uagent.search(this.deviceS70) > -1 || this.uagent.search(this.deviceS80) > -1 || this.uagent.search(this.deviceS90) > -1 ? !0 : !1
    },detectWindowsPhone7: function() {
        return this.uagent.search(this.deviceWinPhone7) > -1 ? !0 : !1
    },detectWindowsMobile: function() {
        return this.detectWindowsPhone7() ? !1 : this.uagent.search(this.deviceWinMob) > -1 || this.uagent.search(this.deviceIeMob) > -1 || this.uagent.search(this.enginePie) > -1 ? !0 : this.uagent.search(this.devicePpc) > -1 && !(this.uagent.search(this.deviceMacPpc) > -1) ? !0 : this.uagent.search(this.manuHtc) > -1 && this.uagent.search(this.deviceWindows) > -1 ? !0 : !1
    },detectBlackBerry: function() {
        return this.uagent.search(this.deviceBB) > -1 || this.uagent.search(this.vndRIM) > -1 ? !0 : !1
    },detectBlackBerryTablet: function() {
        return this.uagent.search(this.deviceBBPlaybook) > -1 ? !0 : !1
    },detectBlackBerryWebKit: function() {
        return this.detectBlackBerry() && this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },detectBlackBerryTouch: function() {
        return this.detectBlackBerry() && (this.uagent.search(this.deviceBBStorm) > -1 || this.uagent.search(this.deviceBBTorch) > -1 || this.uagent.search(this.deviceBBBoldTouch) > -1 || this.uagent.search(this.deviceBBCurveTouch) > -1) ? !0 : !1
    },detectPalmOS: function() {
        return this.detectPalmWebOS() ? !1 : this.uagent.search(this.devicePalm) > -1 || this.uagent.search(this.engineBlazer) > -1 || this.uagent.search(this.engineXiino) > -1 ? !0 : !1
    },detectPalmWebOS: function() {
        return this.uagent.search(this.deviceWebOS) > -1 ? !0 : !1
    },detectWebOSTablet: function() {
        return this.uagent.search(this.deviceWebOShp) > -1 && this.uagent.search(this.deviceTablet) > -1 ? !0 : !1
    },detectOperaMobile: function() {
        return this.uagent.search(this.engineOpera) > -1 && (this.uagent.search(this.mini) > -1 || this.uagent.search(this.mobi) > -1) ? !0 : !1
    },detectOperaAndroidPhone: function() {
        return this.uagent.search(this.engineOpera) > -1 && this.uagent.search(this.deviceAndroid) > -1 && this.uagent.search(this.mobi) > -1 ? !0 : !1
    },detectKindle: function() {
        return this.uagent.search(this.deviceKindle) > -1 && !this.detectAndroid() ? !0 : !1
    },detectAmazonSilk: function() {
        return this.uagent.search(this.engineSilk) > -1 ? !0 : !1
    },detectBada: function() {
        return this.uagent.search(this.deviceBada) > -1 ? !0 : !1
    },detectGarminNuvifone: function() {
        return this.uagent.search(this.deviceNuvifone) > -1 ? !0 : !1
    },detectArchos: function() {
        return this.uagent.search(this.deviceArchos) > -1 ? !0 : !1
    },detectBrewDevice: function() {
        return this.uagent.search(this.deviceBrew) > -1 ? !0 : !1
    },detectInternetExplorer: function() {
        return this.uagent.search(this.iE) > -1 ? !0 : !1
    }};
DeviceInfo.startDetection();
var ComplexDetection;
ComplexDetection = {userA: navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase(),getUserAgent: function() {
        return this.userA
    },getScreenSize: function() {
        return {width: screen.width,height: screen.height}
    },getScreenHeight: function() {
        return screen.height
    },getScreenWidth: function() {
        return screen.width
    },getBrowserSize: function() {
        return {width: $(window).width(),height: $(window).height()}
    },getBrowserHeight: function() {
        return window.innerHeight || $("body").height()
    },getBrowserWidth: function() {
        return window.innerWidth || $("body").width()
    },getDevice: function() {
        var a = this.userA.match(/ipad|iphone|android/) != null || screen.width <= 480;
        var b = a ? "mobile" : "desktop";
        b = DeviceInfo.detectTierTablet() ? "tablet" : b;
        return b
    },getOsVersion: function() {
        if (DeviceInfo.detectAndroid()) {
            return parseFloat(this.userA.slice(this.userA.indexOf("android") + 8))
        } else if (DeviceInfo.detectIphone() || DeviceInfo.detectIpad()) {
            return this.userA.substr(this.userA.indexOf("os ") + 3, 3).replace("_", ".")
        } else {
            return false
        }
    },getOs: function() {
        var a = this.userA;
        if (DeviceInfo.detectIos())
            return "iOS";
        else if (DeviceInfo.detectAndroid())
            return "android";
        else if (a.match(/blackberry/))
            return "blackberry";
        else if (a.match(/macintosh/))
            return "macOS";
        else
            return "windows"
    },getBrowser: function() {
        var a = navigator.appName, b = navigator.userAgent, c;
        var d = b.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (d && (c = b.match(/version\/([\.\d]+)/i)) != null)
            d[2] = c[1];
        d = d ? [d[1], d[2]] : [a, navigator.appVersion, "-?"];
        if (d[0] === "MSIE")
            d[0] = "internet explorer";
        if (!this.isDesktop()) {
            var e = "Chrome";
            var f = navigator.userAgent.indexOf(e);
            if (f < 0) {
                e = "CriOS";
                f = navigator.userAgent.indexOf(e)
            }
            if (f > 0) {
                d[0] = "chrome";
                var g, h;
                g = f + e.length + 1;
                h = g + 2;
                d[1] = parseInt(navigator.userAgent.substring(g, h))
            }
        }
        return {name: d[0],version: d[1]}
    },getBrowserName: function() {
        var a = this.getBrowser();
        return a.name.toLowerCase()
    },getBrowserVersion: function() {
        var a = this.getBrowser();
        return parseFloat(a.version)
    },isMobile: function() {
        return DeviceInfo.detectMobileQuick()
    },isDesktop: function() {
        return !DeviceInfo.detectMobileQuick() && !DeviceInfo.detectTierTablet()
    },isAndroid: function() {
        return DeviceInfo.detectAndroid()
    },isIos: function() {
        return DeviceInfo.detectIos()
    },isIphone: function() {
        return DeviceInfo.detectIphone()
    },isIpad: function() {
        return DeviceInfo.detectIpad()
    },isIpod: function() {
        return DeviceInfo.detectIpod()
    },isTablet: function() {
        return DeviceInfo.detectTierTablet()
    },isAndroidTablet: function() {
        return DeviceInfo.detectAndroidTablet()
    },isBlackBerryTablet: function() {
        return DeviceInfo.detectBlackBerryTablet()
    },isSymbian: function() {
        return DeviceInfo.detectSymbianOS()
    },isBlackBerry: function() {
        return DeviceInfo.detectBlackBerry()
    },isInternetExplorer: function() {
        return DeviceInfo.detectInternetExplorer()
    },isInternetExplorer6: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "6.0"
    },isInternetExplorer7: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "7.0"
    },isInternetExplorer8: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "8.0"
    },isInternetExplorer9: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "9"
    },isInternetExplorer10: function() {
        var a = this.getBrowserVersion();
        return DeviceInfo.detectInternetExplorer() && a === "10"
    },isWindows: function() {
        if (this.getOs() == "windows") {
            return true
        } else {
            return false
        }
    },isChrome: function() {
        if (this.getBrowserName() == "chrome") {
            return true
        } else {
            return false
        }
    },isFirefox: function() {
        if (this.getBrowserName().toLowerCase() == "firefox") {
            return true
        } else {
            return false
        }
    },isChromeBook: function() {
        var a = this.userA.search("cros");
        if (a > 0 && this.isDesktop()) {
            return true
        } else {
            return false
        }
    },isLandscape: function() {
        var a = window.innerWidth || $("body").width();
        var b = window.innerHeight || $("body").height();
        if (a > b)
            return true;
        return false
    },isPortrait: function() {
        var a = window.innerWidth || $("body").width();
        var b = window.innerHeight || $("body").height();
        if (a < b)
            return true;
        return false
    }
};
