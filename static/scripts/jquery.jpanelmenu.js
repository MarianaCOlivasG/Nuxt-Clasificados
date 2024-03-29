/**
 *
 * jPanelMenu 1.4.1 (http://jpanelmenu.com)
 * By Anthony Colangelo (http://acolangelo.com)
 *
 * */
! function (a) {
  a.jPanelMenu = function (b) {
    "undefined" != typeof b && null != b || (b = {});
    var c = {
      options: a.extend({
        menu: "#menu",
        panel: "body",
        trigger: ".menu-trigger",
        excludedPanelContent: "style, script, .viewer",
        clone: !0,
        keepEventHandlers: !1,
        direction: "left",
        openPosition: "250px",
        animated: !1,
        closeOnContentClick: !1,
        keyboardShortcuts: [{
          code: 27,
          open: !1,
          close: !0
        }, {
          code: 37,
          open: !1,
          close: !0
        }, {
          code: 39,
          open: !0,
          close: !0
        }, {
          code: 77,
          open: !0,
          close: !0
        }],
        duration: 150,
        openDuration: b.duration || 150,
        closeDuration: b.duration || 150,
        easing: "ease-in-out",
        openEasing: b.easing || "ease-in-out",
        closeEasing: b.easing || "ease-in-out",
        before: function () {},
        beforeOpen: function () {},
        beforeClose: function () {},
        after: function () {},
        afterOpen: function () {},
        afterClose: function () {},
        beforeOn: function () {},
        afterOn: function () {},
        beforeOff: function () {},
        afterOff: function () {}
      }, b),
      settings: {
        transitionsSupported: "WebkitTransition" in document.body.style || "MozTransition" in document.body.style || "msTransition" in document.body.style || "OTransition" in document.body.style || "Transition" in document.body.style,
        transformsSupported: "WebkitTransform" in document.body.style || "MozTransform" in document.body.style || "msTransform" in document.body.style || "OTransform" in document.body.style || "Transform" in document.body.style,
        cssPrefix: "",
        panelPosition: "static",
        positionUnits: "px"
      },
      menu: "#jPanelMenu-menu",
      panel: ".jPanelMenu-panel",
      timeouts: {},
      clearTimeouts: function () {
        clearTimeout(c.timeouts.open), clearTimeout(c.timeouts.afterOpen), clearTimeout(c.timeouts.afterClose)
      },
      setPositionUnits: function () {
        for (var a = !1, b = ["%", "px", "em"], d = 0; d < b.length; d++) {
          var e = b[d];
          c.options.openPosition.toString().substr(-e.length) == e && (a = !0, c.settings.positionUnits = e)
        }
        a || (c.options.openPosition = parseInt(c.options.openPosition) + c.settings.positionUnits)
      },
      computePositionStyle: function (a, b) {
        var d = a ? c.options.openPosition : "0" + c.settings.positionUnits,
          e = {};
        if (c.settings.transformsSupported) {
          var f = a && "right" == c.options.direction ? "-" : "",
            g = "translate3d(" + f + d + ",0,0)",
            h = "transform";
          b ? (e = "", "" != c.settings.cssPrefix && (e = c.settings.cssPrefix + h + ":" + g + ";"), e += h + ":" + g + ";") : ("" != c.settings.cssPrefix && (e[c.settings.cssPrefix + h] = g), e[h] = g)
        } else b ? (e = "", e = c.options.direction + ": " + d + ";") : e[c.options.direction] = d;
        return e
      },
      setCSSPrefix: function () {
        c.settings.cssPrefix = c.getCSSPrefix()
      },
      setjPanelMenuStyles: function () {
        var b = "background:#fff",
          d = a("html").css("background-color"),
          e = a("body").css("background-color"),
          f = function (b) {
            var c = [];
            return a.each(["background-color", "background-image", "background-position", "background-repeat", "background-attachment", "background-size", "background-clip"], function (a, d) {
              "" !== b.css(d) && c.push(d + ":" + b.css(d))
            }), c.join(";")
          };
        "transparent" !== e && "rgba(0, 0, 0, 0)" !== e ? b = f(a("body")) : "transparent" !== d && "rgba(0, 0, 0, 0)" !== d && (b = f(a("html"))), 0 == a("#jPanelMenu-style-master").length && a("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;' + c.options.direction + ":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;" + c.options.direction + ":0;top:0;z-index:2;width:100%;min-height:100%;" + b + ";}</style>")
      },
      setMenuState: function (b) {
        var d = b ? "open" : "closed";
        a(c.options.panel).attr("data-menu-position", d)
      },
      getMenuState: function () {
        return a(c.options.panel).attr("data-menu-position")
      },
      menuIsOpen: function () {
        return "open" == c.getMenuState()
      },
      setMenuStyle: function (b) {
        a(c.menu).css(b)
      },
      setPanelStyle: function (b) {
        a(c.panel).css(b)
      },
      showMenu: function () {
        c.setMenuStyle({
          display: "block"
        }), c.setMenuStyle({
          "z-index": "1"
        })
      },
      hideMenu: function () {
        c.setMenuStyle({
          "z-index": "-1"
        }), c.setMenuStyle({
          display: "none"
        })
      },
      enableTransitions: function (b, d) {
        var e = b / 1e3,
          f = c.getCSSEasingFunction(d);
        c.disableTransitions(), a("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{' + c.settings.cssPrefix + "transition: all " + e + "s " + f + "; transition: all " + e + "s " + f + ";}</style>")
      },
      disableTransitions: function () {
        a("#jPanelMenu-style-transitions").remove()
      },
      getCSSEasingFunction: function (a) {
        switch (a) {
          case "linear":
            return a;
          case "ease":
            return a;
          case "ease-in":
            return a;
          case "ease-out":
            return a;
          case "ease-in-out":
            return a;
          default:
            return "ease-in-out"
        }
      },
      getJSEasingFunction: function (a) {
        switch (a) {
          case "linear":
            return a;
          default:
            return "swing"
        }
      },
      getVendorPrefix: function () {
        if ("result" in arguments.callee) return arguments.callee.result;
        var a = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
          b = document.getElementsByTagName("script")[0];
        for (var c in b.style)
          if (a.test(c)) return arguments.callee.result = c.match(a)[0];
        return "WebkitOpacity" in b.style ? arguments.callee.result = "Webkit" : "KhtmlOpacity" in b.style ? arguments.callee.result = "Khtml" : arguments.callee.result = ""
      },
      getCSSPrefix: function () {
        var a = c.getVendorPrefix();
        return "" != a ? "-" + a.toLowerCase() + "-" : ""
      },
      openMenu: function (b) {
        "undefined" != typeof b && null != b || (b = c.options.animated), c.clearTimeouts(), c.options.before(), c.options.beforeOpen(), c.setMenuState(!0), c.showMenu();
        var d = {
          none: !b,
          transitions: !(!b || !c.settings.transitionsSupported)
        };
        if (d.transitions || d.none) {
          d.none && c.disableTransitions(), d.transitions && c.enableTransitions(c.options.openDuration, c.options.openEasing);
          var e = c.computePositionStyle(!0);
          c.setPanelStyle(e), c.timeouts.afterOpen = setTimeout(function () {
            c.options.after(), c.options.afterOpen(), c.initiateContentClickListeners()
          }, c.options.openDuration)
        } else {
          var f = c.getJSEasingFunction(c.options.openEasing),
            g = {};
          g[c.options.direction] = c.options.openPosition, a(c.panel).stop().animate(g, c.options.openDuration, f, function () {
            c.options.after(), c.options.afterOpen(), c.initiateContentClickListeners()
          })
        }
      },
      closeMenu: function (b) {
        "undefined" != typeof b && null != b || (b = c.options.animated), c.clearTimeouts(), c.options.before(), c.options.beforeClose(), c.setMenuState(!1);
        var d = {
          none: !b,
          transitions: !(!b || !c.settings.transitionsSupported)
        };
        if (d.transitions || d.none) {
          d.none && c.disableTransitions(), d.transitions && c.enableTransitions(c.options.closeDuration, c.options.closeEasing);
          var e = c.computePositionStyle();
          c.setPanelStyle(e), c.timeouts.afterClose = setTimeout(function () {
            c.disableTransitions(), c.hideMenu(), c.options.after(), c.options.afterClose(), c.destroyContentClickListeners()
          }, c.options.closeDuration)
        } else {
          var f = c.getJSEasingFunction(c.options.closeEasing),
            g = {};
          g[c.options.direction] = 0 + c.settings.positionUnits, a(c.panel).stop().animate(g, c.options.closeDuration, f, function () {
            c.hideMenu(), c.options.after(), c.options.afterClose(), c.destroyContentClickListeners()
          })
        }
      },
      triggerMenu: function (a) {
        c.menuIsOpen() ? c.closeMenu(a) : c.openMenu(a)
      },
      initiateClickListeners: function () {
        a(document).on("click touchend", c.options.trigger, function (a) {
          c.triggerMenu(c.options.animated), a.preventDefault()
        })
      },
      destroyClickListeners: function () {
        a(document).off("click touchend", c.options.trigger, null)
      },
      initiateContentClickListeners: function () {
        return !!c.options.closeOnContentClick && void a(document).on("click touchend", c.panel, function (a) {
          c.menuIsOpen() && c.closeMenu(c.options.animated), a.preventDefault()
        })
      },
      destroyContentClickListeners: function () {
        return !!c.options.closeOnContentClick && void a(document).off("click touchend", c.panel, null)
      },
      initiateKeyboardListeners: function () {
        var b = ["input", "textarea", "select"];
        a(document).on("keydown", function (d) {
          var e = a(d.target),
            f = !1;
          if (a.each(b, function () {
              e.is(this.toString()) && (f = !0)
            }), f) return !0;
          for (mapping in c.options.keyboardShortcuts)
            if (d.which == c.options.keyboardShortcuts[mapping].code) {
              var g = c.options.keyboardShortcuts[mapping];
              g.open && g.close ? c.triggerMenu(c.options.animated) : !g.open || g.close || c.menuIsOpen() ? !g.open && g.close && c.menuIsOpen() && c.closeMenu(c.options.animated) : c.openMenu(c.options.animated), d.preventDefault()
            }
        })
      },
      destroyKeyboardListeners: function () {
        a(document).off("keydown", null)
      },
      setupMarkup: function () {
        a("html").addClass("jPanelMenu"), a(c.options.panel + " > *").not(c.menu + ", " + c.options.excludedPanelContent).wrapAll('<div class="' + c.panel.replace(".", "") + '"/>');
        var b = c.options.clone ? a(c.options.menu).clone(c.options.keepEventHandlers) : a(c.options.menu);
        b.attr("id", c.menu.replace("#", "")).insertAfter(c.options.panel + " > " + c.panel)
      },
      resetMarkup: function () {
        a("html").removeClass("jPanelMenu"), a(c.options.panel + " > " + c.panel + " > *").unwrap(), a(c.menu).remove()
      },
      init: function () {
        c.options.beforeOn(), c.setPositionUnits(), c.setCSSPrefix(), c.initiateClickListeners(), "[object Array]" === Object.prototype.toString.call(c.options.keyboardShortcuts) && c.initiateKeyboardListeners(), c.setjPanelMenuStyles(), c.setMenuState(!1), c.setupMarkup(), c.setPanelStyle({
          position: c.options.animated && "static" === c.settings.panelPosition ? "relative" : c.settings.panelPosition
        }), c.setMenuStyle({
          width: c.options.openPosition
        }), c.closeMenu(!1), c.options.afterOn()
      },
      destroy: function () {
        c.options.beforeOff(), c.closeMenu(), c.destroyClickListeners(), "[object Array]" === Object.prototype.toString.call(c.options.keyboardShortcuts) && c.destroyKeyboardListeners(), c.resetMarkup();
        var a = {};
        a[c.options.direction] = "auto", c.options.afterOff()
      }
    };
    return {
      on: c.init,
      off: c.destroy,
      trigger: c.triggerMenu,
      open: c.openMenu,
      close: c.closeMenu,
      isOpen: c.menuIsOpen,
      menu: c.menu,
      getMenu: function () {
        return a(c.menu)
      },
      panel: c.panel,
      getPanel: function () {
        return a(c.panel)
      },
      setPosition: function (a) {
        "undefined" != typeof a && null != a || (a = c.options.openPosition), c.options.openPosition = a, c.setMenuStyle({
          width: c.options.openPosition
        })
      }
    }
  }
}(jQuery);