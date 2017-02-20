function Swipe(n, t) {
	"use strict";
	function e() {
		w = x.children,
		m = w.length,
		w.length < 2 && (t.continuous = !1),
		f.transitions && t.continuous && w.length < 3 && (x.appendChild(w[0].cloneNode(!0)), x.appendChild(x.children[1].cloneNode(!0)), w = x.children),
		E = new Array(w.length),
		p = n.getBoundingClientRect().width || n.offsetWidth,
		x.style.width = w.length * p + "px";
		for (var e = w.length; e--;) {
			var i = w[e];
			i.style.width = p + "px",
			i.setAttribute("data-index", e),
			f.transitions && (i.style.left = e * -p + "px", a(e, b > e ? -p: e > b ? p: 0, 0))
		}
		t.continuous && f.transitions && (a(s(b - 1), -p, 0), a(s(b + 1), p, 0)),
		f.transitions || (x.style.left = b * -p + "px"),
		n.style.visibility = "visible"
	}
	function i() {
		t.continuous ? r(b - 1) : b && r(b - 1)
	}
	function o() {
		t.continuous ? r(b + 1) : b < w.length - 1 && r(b + 1)
	}
	function s(n) {
		return (w.length + n % w.length) % w.length
	}
	function r(n, e) {
		if (b != n) {
			if (f.transitions) {
				var i = Math.abs(b - n) / (b - n);
				if (t.continuous) {
					var o = i;
					i = -E[s(n)] / p,
					i !== o && (n = -i * w.length + n)
				}
				for (var r = Math.abs(b - n) - 1; r--;) a(s((n > b ? n: b) - r - 1), p * i, 0);
				n = s(n),
				a(b, p * i, e || g),
				a(n, 0, e || g),
				t.continuous && a(s(n - i), -(p * i), 0)
			} else n = s(n),
			c(b * -p, n * -p, e || g);
			b = n,
			h(t.callback && t.callback(b, w[b]))
		}
	}
	function a(n, t, e) {
		u(n, t, e),
		E[n] = t
	}
	function u(n, t, e) {
		var i = w[n],
		o = i && i.style;
		o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = e + "ms", o.webkitTransform = "translate(" + t + "px,0)translateZ(0)", o.msTransform = o.MozTransform = o.OTransform = "translateX(" + t + "px)")
	}
	function c(n, e, i) {
		if (!i) return void(x.style.left = e + "px");
		var o = +new Date,
		s = setInterval(function() {
			var r = +new Date - o;
			return r > i ? (x.style.left = e + "px", L && d(), t.transitionEnd && t.transitionEnd.call(event, b, w[b]), void clearInterval(s)) : void(x.style.left = (e - n) * (Math.floor(r / i * 100) / 100) + n + "px")
		},
		4)
	}
	function d() {
		T = setTimeout(o, L)
	}
	function l() {
		L = 0,
		clearTimeout(T)
	}
	var v = function() {},
	h = function(n) {
		setTimeout(n || v, 0)
	},
	f = {
		addEventListener: !!window.addEventListener,
		touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
		transitions: function(n) {
			var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
			for (var e in t) if (void 0 !== n.style[t[e]]) return ! 0;
			return ! 1
		} (document.createElement("swipe"))
	};
	if (n) {
		var w,
		E,
		p,
		m,
		x = n.children[0];
		t = t || {};
		var b = parseInt(t.startSlide, 10) || 0,
		g = t.speed || 300;
		t.continuous = void 0 !== t.continuous ? t.continuous: !0;
		var T,
		y,
		L = t.auto || 0,
		k = {},
		D = {},
		M = {
			handleEvent: function(n) {
				switch (n.type) {
				case "touchstart":
					this.start(n);
					break;
				case "touchmove":
					this.move(n);
					break;
				case "touchend":
					h(this.end(n));
					break;
				case "webkitTransitionEnd":
				case "msTransitionEnd":
				case "oTransitionEnd":
				case "otransitionend":
				case "transitionend":
					h(this.transitionEnd(n));
					break;
				case "resize":
					h(e)
				}
				t.stopPropagation && n.stopPropagation()
			},
			start: function(n) {
				var t = n.touches[0];
				k = {
					x: t.pageX,
					y: t.pageY,
					time: +new Date
				},
				y = void 0,
				D = {},
				x.addEventListener("touchmove", this, !1),
				x.addEventListener("touchend", this, !1)
			},
			move: function(n) {
				if (! (n.touches.length > 1 || n.scale && 1 !== n.scale)) {
					t.disableScroll && n.preventDefault();
					var e = n.touches[0];
					D = {
						x: e.pageX - k.x,
						y: e.pageY - k.y
					},
					"undefined" == typeof y && (y = !!(y || Math.abs(D.x) < Math.abs(D.y))),
					y || (l(), t.continuous ? (u(s(b - 1), D.x + E[s(b - 1)], 0), u(b, D.x + E[b], 0), u(s(b + 1), D.x + E[s(b + 1)], 0)) : (D.x = D.x / (!b && D.x > 0 || b == w.length - 1 && D.x < 0 ? Math.abs(D.x) / p + 1: 1), u(b - 1, D.x + E[b - 1], 0), u(b, D.x + E[b], 0), u(b + 1, D.x + E[b + 1], 0)))
				}
			},
			end: function(n) {
				var e = +new Date - k.time,
				i = Number(e) < 250 && Math.abs(D.x) > 20 || Math.abs(D.x) > p / 2,
				o = !b && D.x > 0 || b == w.length - 1 && D.x < 0;
				t.continuous && (o = !1);
				var r = D.x < 0;
				y || (i && !o ? (r ? (t.continuous ? (a(s(b - 1), -p, 0), a(s(b + 2), p, 0)) : a(b - 1, -p, 0), a(b, E[b] - p, g), a(s(b + 1), E[s(b + 1)] - p, g), b = s(b + 1)) : (t.continuous ? (a(s(b + 1), p, 0), a(s(b - 2), -p, 0)) : a(b + 1, p, 0), a(b, E[b] + p, g), a(s(b - 1), E[s(b - 1)] + p, g), b = s(b - 1)), t.callback && t.callback(b, w[b])) : t.continuous ? (a(s(b - 1), -p, g), a(b, 0, g), a(s(b + 1), p, g)) : (a(b - 1, -p, g), a(b, 0, g), a(b + 1, p, g))),
				x.removeEventListener("touchmove", M, !1),
				x.removeEventListener("touchend", M, !1)
			},
			transitionEnd: function(n) {
				parseInt(n.target.getAttribute("data-index"), 10) == b && (L && d(), t.transitionEnd && t.transitionEnd.call(n, b, w[b]))
			}
		};
		return e(),
		L && d(),
		f.addEventListener ? (f.touch && x.addEventListener("touchstart", M, !1), f.transitions && (x.addEventListener("webkitTransitionEnd", M, !1), x.addEventListener("msTransitionEnd", M, !1), x.addEventListener("oTransitionEnd", M, !1), x.addEventListener("otransitionend", M, !1), x.addEventListener("transitionend", M, !1)), window.addEventListener("resize", M, !1)) : window.onresize = function() {
			e()
		},
		{
			setup: function() {
				e()
			},
			slide: function(n, t) {
				l(),
				r(n, t)
			},
			prev: function() {
				l(),
				i()
			},
			next: function() {
				l(),
				o()
			},
			stop: function() {
				l()
			},
			getPos: function() {
				return b
			},
			getNumSlides: function() {
				return m
			},
			kill: function() {
				l(),
				x.style.width = "",
				x.style.left = "";
				for (var n = w.length; n--;) {
					var t = w[n];
					t.style.width = "",
					t.style.left = "",
					f.transitions && u(n, 0, 0)
				}
				f.addEventListener ? (x.removeEventListener("touchstart", M, !1), x.removeEventListener("webkitTransitionEnd", M, !1), x.removeEventListener("msTransitionEnd", M, !1), x.removeEventListener("oTransitionEnd", M, !1), x.removeEventListener("otransitionend", M, !1), x.removeEventListener("transitionend", M, !1), window.removeEventListener("resize", M, !1)) : window.onresize = null
			}
		}
	}
} (window.jQuery || window.Zepto) && !
function(n) {
	n.fn.Swipe = function(t) {
		return this.each(function() {
			n(this).data("Swipe", new Swipe(n(this)[0], t))
		})
	}
} (window.jQuery || window.Zepto);
module.exports = Swipe;
export default Swipe;
