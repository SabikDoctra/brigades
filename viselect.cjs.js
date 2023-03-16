/*! @viselect/vanilla 3.0.0 MIT | https://github.com/Simonwep/selection */
!(function (t, e) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = e())
		: "function" == typeof define && define.amd
		? define(e)
		: ((t =
				"undefined" != typeof globalThis
					? globalThis
					: t || self).SelectionArea = e());
})(this, function () {
	"use strict";
	const t = (t, e = "px") => ("number" == typeof t ? t + e : t);
	function e({ style: e }, s, i) {
		if ("object" == typeof s)
			for (const [i, o] of Object.entries(s)) e[i] = t(o);
		else void 0 !== i && (e[s] = t(i));
	}
	function s(t) {
		return (e, s, i, o = {}) => {
			e instanceof HTMLCollection || e instanceof NodeList
				? (e = Array.from(e))
				: Array.isArray(e) || (e = [e]),
				Array.isArray(s) || (s = [s]);
			for (const n of e) for (const e of s) n[t](e, i, { capture: !1, ...o });
			return [e, s, i, o];
		};
	}
	const i = s("addEventListener"),
		o = s("removeEventListener"),
		n = (t) => {
			const e = (t.touches && t.touches[0]) || t;
			return { tap: e, x: e.clientX, y: e.clientY, target: e.target };
		};
	function r(t) {
		let e = t.path || (t.composedPath && t.composedPath());
		if (e) return e;
		let s = t.target.parentElement;
		for (e = [t.target, s]; (s = s.parentElement); ) e.push(s);
		return e.push(document, window), e;
	}
	function h(t, e, s = "touch") {
		switch (s) {
			case "center": {
				const s = e.left + e.width / 2,
					i = e.top + e.height / 2;
				return s >= t.left && s <= t.right && i >= t.top && i <= t.bottom;
			}
			case "cover":
				return (
					e.left >= t.left &&
					e.top >= t.top &&
					e.right <= t.right &&
					e.bottom <= t.bottom
				);
			case "touch":
				return (
					t.right >= e.left &&
					t.left <= e.right &&
					t.bottom >= e.top &&
					t.top <= e.bottom
				);
			default:
				throw new Error(`Unkown intersection mode: ${s}`);
		}
	}
	function c(t, e) {
		const s = t.indexOf(e);
		~s && t.splice(s, 1);
	}
	function l(t, e = document) {
		const s = Array.isArray(t) ? t : [t],
			i = [];
		for (let t = 0, o = s.length; t < o; t++) {
			const o = s[t];
			"string" == typeof o
				? i.push(...Array.from(e.querySelectorAll(o)))
				: o instanceof Element && i.push(o);
		}
		return i;
	}
	const a = () => matchMedia("(hover: none), (pointer: coarse)").matches,
		u = (t, e) => {
			for (const [s, i] of Object.entries(t)) {
				const o = e[s];
				t[s] =
					void 0 === o
						? t[s]
						: "object" != typeof o ||
						  "object" != typeof i ||
						  null === i ||
						  Array.isArray(i)
						? o
						: u(i, o);
			}
			return t;
		},
		{ abs: d, max: f, min: p, ceil: m } = Math;
	class SelectionArea extends class {
		constructor() {
			(this.t = new Map()),
				(this.on = this.addEventListener),
				(this.off = this.removeEventListener),
				(this.emit = this.dispatchEvent);
		}
		addEventListener(t, e) {
			const s = this.t.get(t) || new Set();
			return this.t.set(t, s), s.add(e), this;
		}
		removeEventListener(t, e) {
			return this.t.get(t).delete(e), this;
		}
		dispatchEvent(t, ...e) {
			let s = !0;
			for (const i of this.t.get(t) || []) s = !1 !== i(...e) && s;
			return s;
		}
		unbindAllListeners() {
			this.t.clear();
		}
	} {
		constructor(t) {
			super(),
				(this.i = {
					touched: [],
					stored: [],
					selected: [],
					changed: { added: [], removed: [] },
				}),
				(this.o = []),
				(this.h = new DOMRect()),
				(this.l = { y1: 0, x2: 0, y2: 0, x1: 0 }),
				(this.u = !0),
				(this.p = !0),
				(this.m = { x: 0, y: 0 }),
				(this.v = { x: 0, y: 0 }),
				(this.disable = this.g.bind(this, !1)),
				(this.enable = this.g),
				(this._ = u(
					{
						selectionAreaClass: "selection-area",
						selectionContainerClass: void 0,
						selectables: [],
						document: window.document,
						behaviour: {
							overlap: "invert",
							intersect: "touch",
							startThreshold: { x: 10, y: 10 },
							scrolling: {
								speedDivider: 10,
								manualSpeed: 750,
								startScrollMargins: { x: 0, y: 0 },
							},
						},
						features: {
							range: !0,
							touch: !0,
							singleTap: { allow: !0, intersect: "native" },
						},
						startAreas: ["html"],
						boundaries: ["html"],
						container: "body",
					},
					t
				));
			for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
				"function" == typeof this[t] && (this[t] = this[t].bind(this));
			const {
				document: s,
				selectionAreaClass: i,
				selectionContainerClass: o,
			} = this._;
			(this.S = s.createElement("div")),
				(this.A = s.createElement("div")),
				this.A.appendChild(this.S),
				this.S.classList.add(i),
				o && this.A.classList.add(o),
				e(this.S, {
					willChange: "top, left, bottom, right, width, height",
					top: 0,
					left: 0,
					position: "fixed",
				}),
				e(this.A, {
					overflow: "hidden",
					position: "fixed",
					transform: "translate3d(0, 0, 0)",
					pointerEvents: "none",
					zIndex: "1",
				}),
				(this.T = ((t) => {
					let e,
						s = -1,
						i = !1;
					return {
						next(...o) {
							(e = o),
								i ||
									((i = !0),
									(s = requestAnimationFrame(() => {
										t(...e), (i = !1);
									})));
						},
						cancel() {
							cancelAnimationFrame(s), (i = !1);
						},
					};
				})((t) => {
					this.L(), this.j(), this.C("move", t), this.M();
				})),
				this.enable();
		}
		g(t = !0) {
			const { document: e, features: s } = this._,
				n = t ? i : o;
			n(e, "mousedown", this.k),
				s.touch && n(e, "touchstart", this.k, { passive: !1 });
		}
		k(t, e = !1) {
			const { x: s, y: o, target: c } = n(t),
				{ _: a } = this,
				{ document: u } = this._,
				d = c.getBoundingClientRect(),
				f = l(a.startAreas, a.document),
				p = l(a.boundaries, a.document);
			this.O = p.find((t) => h(t.getBoundingClientRect(), d));
			const m = r(t);
			if (
				!this.O ||
				!f.find((t) => m.includes(t)) ||
				!p.find((t) => m.includes(t))
			)
				return;
			if (!e && !1 === this.C("beforestart", t)) return;
			this.l = { x1: s, y1: o, x2: 0, y2: 0 };
			const v = u.scrollingElement || u.body;
			(this.v = { x: v.scrollLeft, y: v.scrollTop }),
				(this.u = !0),
				//this.clearSelection(!1),
				i(u, ["touchmove", "mousemove"], this.R, { passive: !1 }),
				i(u, ["mouseup", "touchcancel", "touchend"], this.$),
				i(u, "scroll", this.D);
		}
		F(t) {
			const {
					singleTap: { intersect: e },
					range: s,
				} = this._.features,
				i = n(t);
			let o = null;
			if ("native" === e) o = i.target;
			else if ("touch" === e) {
				this.resolveSelectables();
				const { x: t, y: e } = i;
				o = this.o.find((s) => {
					const {
						right: i,
						left: o,
						top: n,
						bottom: r,
					} = s.getBoundingClientRect();
					return t < i && t > o && e < r && e > n;
				});
			}
			if (!o) return;
			for (this.resolveSelectables(); !this.o.includes(o); ) {
				if (!o.parentElement) return;
				o = o.parentElement;
			}
			const { stored: r } = this.i;
			if ((this.C("start", t), t.shiftKey && r.length && s)) {
				var _a;
				(_a = this.q) !== null && _a !== void 0 ? _a : r[0];
				const t = _a,
					[e, s] = 4 & t.compareDocumentPosition(o) ? [o, t] : [t, o],
					i = [
						...this.o.filter(
							(t) =>
								4 & t.compareDocumentPosition(e) &&
								2 & t.compareDocumentPosition(s)
						),
						e,
						s,
					];
				this.select(i);
			} else r.includes(o) && (1 === r.length || t.ctrlKey || r.every((t) => this.i.stored.includes(t))) ? this.deselect(o) : ((this.q = o), this.select(o));
			this.C("stop", t);
		}
		R(t) {
			const {
					container: s,
					document: r,
					features: h,
					behaviour: { startThreshold: c },
				} = this._,
				{ x1: u, y1: f } = this.l,
				{ x: p, y: m } = n(t),
				v = typeof c;
			if (
				("number" === v && d(p + m - (u + f)) >= c) ||
				("object" === v && d(p - u) >= c.x) ||
				d(m - f) >= c.y
			) {
				if (
					(o(r, ["mousemove", "touchmove"], this.R, { passive: !1 }),
					!1 === this.C("beforedrag", t))
				)
					return void o(r, ["mouseup", "touchcancel", "touchend"], this.$);
				i(r, ["mousemove", "touchmove"], this.H, { passive: !1 }),
					e(this.S, "display", "block"),
					l(s, r)[0].appendChild(this.A),
					this.resolveSelectables(),
					(this.u = !1),
					(this.W = this.O.getBoundingClientRect()),
					(this.p =
						this.O.scrollHeight !== this.O.clientHeight ||
						this.O.scrollWidth !== this.O.clientWidth),
					this.p &&
						(i(r, "wheel", this.I, { passive: !1 }),
						(this.o = this.o.filter((t) => this.O.contains(t)))),
					this.N(),
					this.C("start", t),
					this.H(t);
			}
			h.touch && a() && t.preventDefault();
		}
		N() {
			const { A: t, O: s, S: i } = this,
				o = (this.W = s.getBoundingClientRect());
			this.p
				? (e(t, { top: o.top, left: o.left, width: o.width, height: o.height }),
				  e(i, { marginTop: -o.top, marginLeft: -o.left }))
				: (e(t, { top: 0, left: 0, width: "100%", height: "100%" }),
				  e(i, { marginTop: 0, marginLeft: 0 }));
		}
		H(t) {
			const { x: e, y: s } = n(t),
				{ m: i, l: o, _: r, T: h } = this,
				{ features: c } = r,
				{ speedDivider: l } = r.behaviour.scrolling,
				u = this.O;
			if (((o.x2 = e), (o.y2 = s), this.p && (i.y || i.x))) {
				const e = () => {
					if (!i.x && !i.y) return;
					const { scrollTop: s, scrollLeft: n } = u;
					i.y && ((u.scrollTop += m(i.y / l)), (o.y1 -= u.scrollTop - s)),
						i.x && ((u.scrollLeft += m(i.x / l)), (o.x1 -= u.scrollLeft - n)),
						h.next(t),
						requestAnimationFrame(e);
				};
				requestAnimationFrame(e);
			} else h.next(t);
			c.touch && a() && t.preventDefault();
		}
		D() {
			const {
					v: t,
					_: { document: e },
				} = this,
				{ scrollTop: s, scrollLeft: i } = e.scrollingElement || e.body;
			(this.l.x1 += t.x - i),
				(this.l.y1 += t.y - s),
				(t.x = i),
				(t.y = s),
				this.N(),
				this.T.next(null);
		}
		I(t) {
			const { manualSpeed: e } = this._.behaviour.scrolling,
				s = t.deltaY ? (t.deltaY > 0 ? 1 : -1) : 0,
				i = t.deltaX ? (t.deltaX > 0 ? 1 : -1) : 0;
			(this.m.y += s * e), (this.m.x += i * e), this.H(t), t.preventDefault();
		}
		L() {
			const { m: t, l: e, h: s, O: i, W: o, _: n } = this,
				{
					scrollTop: r,
					scrollHeight: h,
					clientHeight: c,
					scrollLeft: l,
					scrollWidth: a,
					clientWidth: u,
				} = i,
				m = o,
				{ x1: v, y1: g } = e;
			let { x2: y, y2: _ } = e;
			const {
				behaviour: {
					scrolling: { startScrollMargins: b },
				},
			} = n;
			y < m.left + b.x
				? ((t.x = l ? -d(m.left - y + b.x) : 0), (y = y < m.left ? m.left : y))
				: y > m.right - b.x
				? ((t.x = a - l - u ? d(m.left + m.width - y - b.x) : 0),
				  (y = y > m.right ? m.right : y))
				: (t.x = 0),
				_ < m.top + b.y
					? ((t.y = r ? -d(m.top - _ + b.y) : 0), (_ = _ < m.top ? m.top : _))
					: _ > m.bottom - b.y
					? ((t.y = h - r - c ? d(m.top + m.height - _ - b.y) : 0),
					  (_ = _ > m.bottom ? m.bottom : _))
					: (t.y = 0);
			const x = p(v, y),
				S = p(g, _),
				w = f(v, y),
				A = f(g, _);
			(s.x = x), (s.y = S), (s.width = w - x), (s.height = A - S);
		}
		M() {
			const { x: t, y: e, width: s, height: i } = this.h,
				{ style: o } = this.S;
			(o.left = `${t}px`),
				(o.top = `${e}px`),
				(o.width = `${s}px`),
				(o.height = `${i}px`);
		}
		$(t, s) {
			const { document: i, features: n } = this._,
				{ u: r } = this;
			o(i, ["mousemove", "touchmove"], this.R),
				o(i, ["touchmove", "mousemove"], this.H),
				o(i, ["mouseup", "touchcancel", "touchend"], this.$),
				o(i, "scroll", this.D),
				this.U(),
				t && r && n.singleTap.allow
					? this.F(t)
					: r || s || (this.j(), this.C("stop", t)),
				(this.m.x = 0),
				(this.m.y = 0),
				this.p && o(i, "wheel", this.I, { passive: !0 }),
				this.A.remove(),
				this.T.cancel(),
				e(this.S, "display", "none");
		}
		j() {
			const { o: t, _: e, i: s, h: i } = this,
				{ stored: o, selected: n, touched: r } = s,
				{ intersect: c, overlap: l } = e.behaviour,
				a = "invert" === l,
				u = [],
				d = [],
				f = [];
			for (let e = 0; e < t.length; e++) {
				const s = t[e];
				if (h(i, s.getBoundingClientRect(), c)) {
					if (n.includes(s)) o.includes(s) && !r.includes(s) && r.push(s);
					else {
						if (a && o.includes(s)) {
							f.push(s);
							continue;
						}
						d.push(s);
					}
					u.push(s);
				}
			}
			a && d.push(...o.filter((t) => !n.includes(t)));
			const p = "keep" === l;
			for (let t = 0; t < n.length; t++) {
				const e = n[t];
				u.includes(e) || (p && o.includes(e)) || f.push(e);
			}
			(s.selected = u),
				(s.changed = { added: d, removed: f }),
				(this.q = u[u.length - 1]);
		}
		C(t, e) {
			return this.emit(t, { event: e, store: this.i, selection: this });
		}
		U() {
			const { _: t, i: e } = this,
				{ selected: s, changed: i, touched: o, stored: n } = e,
				r = s.filter((t) => !n.includes(t));
			switch (t.behaviour.overlap) {
				case "drop":
					e.stored = [...r, ...n.filter((t) => !o.includes(t))];
					break;
				case "invert":
					e.stored = [...r, ...n.filter((t) => !i.removed.includes(t))];
					break;
				case "keep":
					e.stored = [...n, ...s.filter((t) => !n.includes(t))];
			}
		}
		trigger(t, e = !0) {
			this.k(t, e);
		}
		resolveSelectables() {
			this.o = l(this._.selectables, this._.document);
		}
		clearSelection(t = !0) {
			this.i = {
				stored: t ? [] : this.i.stored,
				selected: [],
				touched: [],
				changed: { added: [], removed: [] },
			};
		}
		getSelection() {
			return this.i.stored;
		}
		getSelectionArea() {
			return this.S;
		}
		cancel(t = !1) {
			this.$(null, !t);
		}
		destroy() {
			this.cancel(),
				this.disable(),
				this.A.remove(),
				super.unbindAllListeners();
		}
		select(t, e = !1) {
			const { changed: s, selected: i, stored: o } = this.i,
				n = l(t, this._.document).filter(
					(t) => !i.includes(t) && !o.includes(t)
				);
			return (
				o.push(...n),
				i.push(...n),
				s.added.push(...n),
				!e && this.C("move", null),
				n
			);
		}
		deselect(t, e = !1) {
			const { selected: s, stored: i, changed: o } = this.i;
			return (
				!(!s.includes(t) && !i.includes(t)) &&
				(o.removed.push(t), c(i, t), c(s, t), !e && this.C("move", null), !0)
			);
		}
	}
	return (SelectionArea.version = "3.0.0"), SelectionArea;
});
//# sourceMappingURL=viselect.cjs.js.map
