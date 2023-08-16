const Va = function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver(s => {
        for (const o of s)
            if (o.type === "childList")
                for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity), s.referrerpolicy && (o.referrerPolicy = s.referrerpolicy), s.crossorigin === "use-credentials" ? o.credentials = "include" : s.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o)
    }
};
Va();

function ws(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? s => !!n[s.toLowerCase()] : s => !!n[s]
}
const Ga = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Ja = ws(Ga);

function ci(e) {
    return !!e || e === ""
}

function yr(e) {
    if (j(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = ye(r) ? ec(r) : yr(r);
            if (s)
                for (const o in s) t[o] = s[o]
        }
        return t
    } else {
        if (ye(e)) return e;
        if (ae(e)) return e
    }
}
const Xa = /;(?![^(]*\))/g,
    Za = /:(.+)/;

function ec(e) {
    const t = {};
    return e.split(Xa).forEach(n => {
        if (n) {
            const r = n.split(Za);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function bt(e) {
    let t = "";
    if (ye(e)) t = e;
    else if (j(e))
        for (let n = 0; n < e.length; n++) {
            const r = bt(e[n]);
            r && (t += r + " ")
        } else if (ae(e))
            for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const ke = e => ye(e) ? e : e == null ? "" : j(e) || ae(e) && (e.toString === di || !H(e.toString)) ? JSON.stringify(e, li, 2) : String(e),
    li = (e, t) => t && t.__v_isRef ? li(e, t.value) : Gt(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
    } : ui(t) ? {
        [`Set(${t.size})`]: [...t.values()]
    } : ae(t) && !j(t) && !hi(t) ? String(t) : t,
    re = {},
    Vt = [],
    Qe = () => {},
    tc = () => !1,
    nc = /^on[^a-z]/,
    vr = e => nc.test(e),
    Es = e => e.startsWith("onUpdate:"),
    Se = Object.assign,
    As = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    rc = Object.prototype.hasOwnProperty,
    V = (e, t) => rc.call(e, t),
    j = Array.isArray,
    Gt = e => br(e) === "[object Map]",
    ui = e => br(e) === "[object Set]",
    H = e => typeof e == "function",
    ye = e => typeof e == "string",
    Ss = e => typeof e == "symbol",
    ae = e => e !== null && typeof e == "object",
    fi = e => ae(e) && H(e.then) && H(e.catch),
    di = Object.prototype.toString,
    br = e => di.call(e),
    sc = e => br(e).slice(8, -1),
    hi = e => br(e) === "[object Object]",
    _s = e => ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Xn = ws(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    wr = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    oc = /-(\w)/g,
    tt = wr(e => e.replace(oc, (t, n) => n ? n.toUpperCase() : "")),
    ic = /\B([A-Z])/g,
    sn = wr(e => e.replace(ic, "-$1").toLowerCase()),
    Er = wr(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Ur = wr(e => e ? `on${Er(e)}` : ""),
    Tn = (e, t) => !Object.is(e, t),
    Mr = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    cr = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    ac = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let to;
const cc = () => to || (to = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let Xe;
class lc {
    constructor(t = !1) {
        this.active = !0, this.effects = [], this.cleanups = [], !t && Xe && (this.parent = Xe, this.index = (Xe.scopes || (Xe.scopes = [])).push(this) - 1)
    }
    run(t) {
        if (this.active) {
            const n = Xe;
            try {
                return Xe = this, t()
            } finally {
                Xe = n
            }
        }
    }
    on() {
        Xe = this
    }
    off() {
        Xe = this.parent
    }
    stop(t) {
        if (this.active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.active = !1
        }
    }
}

function uc(e, t = Xe) {
    t && t.active && t.effects.push(e)
}
const Os = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    },
    pi = e => (e.w & _t) > 0,
    mi = e => (e.n & _t) > 0,
    fc = ({
        deps: e
    }) => {
        if (e.length)
            for (let t = 0; t < e.length; t++) e[t].w |= _t
    },
    dc = e => {
        const {
            deps: t
        } = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const s = t[r];
                pi(s) && !mi(s) ? s.delete(e) : t[n++] = s, s.w &= ~_t, s.n &= ~_t
            }
            t.length = n
        }
    },
    Gr = new WeakMap;
let wn = 0,
    _t = 1;
const Jr = 30;
let qe;
const Yt = Symbol(""),
    Xr = Symbol("");
class Rs {
    constructor(t, n = null, r) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, uc(this, r)
    }
    run() {
        if (!this.active) return this.fn();
        let t = qe,
            n = wt;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = qe, qe = this, wt = !0, _t = 1 << ++wn, wn <= Jr ? fc(this) : no(this), this.fn()
        } finally {
            wn <= Jr && dc(this), _t = 1 << --wn, qe = this.parent, wt = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        qe === this ? this.deferStop = !0 : this.active && (no(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function no(e) {
    const {
        deps: t
    } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}
let wt = !0;
const gi = [];

function on() {
    gi.push(wt), wt = !1
}

function an() {
    const e = gi.pop();
    wt = e === void 0 ? !0 : e
}

function xe(e, t, n) {
    if (wt && qe) {
        let r = Gr.get(e);
        r || Gr.set(e, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = Os()), yi(s)
    }
}

function yi(e, t) {
    let n = !1;
    wn <= Jr ? mi(e) || (e.n |= _t, n = !pi(e)) : n = !e.has(qe), n && (e.add(qe), qe.deps.push(e))
}

function ut(e, t, n, r, s, o) {
    const i = Gr.get(e);
    if (!i) return;
    let c = [];
    if (t === "clear") c = [...i.values()];
    else if (n === "length" && j(e)) i.forEach((a, l) => {
        (l === "length" || l >= r) && c.push(a)
    });
    else switch (n !== void 0 && c.push(i.get(n)), t) {
        case "add":
            j(e) ? _s(n) && c.push(i.get("length")) : (c.push(i.get(Yt)), Gt(e) && c.push(i.get(Xr)));
            break;
        case "delete":
            j(e) || (c.push(i.get(Yt)), Gt(e) && c.push(i.get(Xr)));
            break;
        case "set":
            Gt(e) && c.push(i.get(Yt));
            break
    }
    if (c.length === 1) c[0] && Zr(c[0]);
    else {
        const a = [];
        for (const l of c) l && a.push(...l);
        Zr(Os(a))
    }
}

function Zr(e, t) {
    const n = j(e) ? e : [...e];
    for (const r of n) r.computed && ro(r);
    for (const r of n) r.computed || ro(r)
}

function ro(e, t) {
    (e !== qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const hc = ws("__proto__,__v_isRef,__isVue"),
    vi = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Ss)),
    pc = Ps(),
    mc = Ps(!1, !0),
    gc = Ps(!0),
    so = yc();

function yc() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const r = X(this);
            for (let o = 0, i = this.length; o < i; o++) xe(r, "get", o + "");
            const s = r[t](...n);
            return s === -1 || s === !1 ? r[t](...n.map(X)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            on();
            const r = X(this)[t].apply(this, n);
            return an(), r
        }
    }), e
}

function Ps(e = !1, t = !1) {
    return function(r, s, o) {
        if (s === "__v_isReactive") return !e;
        if (s === "__v_isReadonly") return e;
        if (s === "__v_isShallow") return t;
        if (s === "__v_raw" && o === (e ? t ? Lc : Si : t ? Ai : Ei).get(r)) return r;
        const i = j(r);
        if (!e && i && V(so, s)) return Reflect.get(so, s, o);
        const c = Reflect.get(r, s, o);
        return (Ss(s) ? vi.has(s) : hc(s)) || (e || xe(r, "get", s), t) ? c : ge(c) ? i && _s(s) ? c : c.value : ae(c) ? e ? _i(c) : cn(c) : c
    }
}
const vc = bi(),
    bc = bi(!0);

function bi(e = !1) {
    return function(n, r, s, o) {
        let i = n[r];
        if (Zt(i) && ge(i) && !ge(s)) return !1;
        if (!e && (!lr(s) && !Zt(s) && (i = X(i), s = X(s)), !j(n) && ge(i) && !ge(s))) return i.value = s, !0;
        const c = j(n) && _s(r) ? Number(r) < n.length : V(n, r),
            a = Reflect.set(n, r, s, o);
        return n === X(o) && (c ? Tn(s, i) && ut(n, "set", r, s) : ut(n, "add", r, s)), a
    }
}

function wc(e, t) {
    const n = V(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && ut(e, "delete", t, void 0), r
}

function Ec(e, t) {
    const n = Reflect.has(e, t);
    return (!Ss(t) || !vi.has(t)) && xe(e, "has", t), n
}

function Ac(e) {
    return xe(e, "iterate", j(e) ? "length" : Yt), Reflect.ownKeys(e)
}
const wi = {
        get: pc,
        set: vc,
        deleteProperty: wc,
        has: Ec,
        ownKeys: Ac
    },
    Sc = {
        get: gc,
        set(e, t) {
            return !0
        },
        deleteProperty(e, t) {
            return !0
        }
    },
    _c = Se({}, wi, {
        get: mc,
        set: bc
    }),
    Cs = e => e,
    Ar = e => Reflect.getPrototypeOf(e);

function Qn(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = X(e),
        o = X(t);
    n || (t !== o && xe(s, "get", t), xe(s, "get", o));
    const {
        has: i
    } = Ar(s), c = r ? Cs : n ? Ns : In;
    if (i.call(s, t)) return c(e.get(t));
    if (i.call(s, o)) return c(e.get(o));
    e !== s && e.get(t)
}

function zn(e, t = !1) {
    const n = this.__v_raw,
        r = X(n),
        s = X(e);
    return t || (e !== s && xe(r, "has", e), xe(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s)
}

function $n(e, t = !1) {
    return e = e.__v_raw, !t && xe(X(e), "iterate", Yt), Reflect.get(e, "size", e)
}

function oo(e) {
    e = X(e);
    const t = X(this);
    return Ar(t).has.call(t, e) || (t.add(e), ut(t, "add", e, e)), this
}

function io(e, t) {
    t = X(t);
    const n = X(this),
        {
            has: r,
            get: s
        } = Ar(n);
    let o = r.call(n, e);
    o || (e = X(e), o = r.call(n, e));
    const i = s.call(n, e);
    return n.set(e, t), o ? Tn(t, i) && ut(n, "set", e, t) : ut(n, "add", e, t), this
}

function ao(e) {
    const t = X(this),
        {
            has: n,
            get: r
        } = Ar(t);
    let s = n.call(t, e);
    s || (e = X(e), s = n.call(t, e)), r && r.call(t, e);
    const o = t.delete(e);
    return s && ut(t, "delete", e, void 0), o
}

function co() {
    const e = X(this),
        t = e.size !== 0,
        n = e.clear();
    return t && ut(e, "clear", void 0, void 0), n
}

function Vn(e, t) {
    return function(r, s) {
        const o = this,
            i = o.__v_raw,
            c = X(i),
            a = t ? Cs : e ? Ns : In;
        return !e && xe(c, "iterate", Yt), i.forEach((l, u) => r.call(s, a(l), a(u), o))
    }
}

function Gn(e, t, n) {
    return function(...r) {
        const s = this.__v_raw,
            o = X(s),
            i = Gt(o),
            c = e === "entries" || e === Symbol.iterator && i,
            a = e === "keys" && i,
            l = s[e](...r),
            u = n ? Cs : t ? Ns : In;
        return !t && xe(o, "iterate", a ? Xr : Yt), {
            next() {
                const {
                    value: h,
                    done: d
                } = l.next();
                return d ? {
                    value: h,
                    done: d
                } : {
                    value: c ? [u(h[0]), u(h[1])] : u(h),
                    done: d
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function pt(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}

function Oc() {
    const e = {
            get(o) {
                return Qn(this, o)
            },
            get size() {
                return $n(this)
            },
            has: zn,
            add: oo,
            set: io,
            delete: ao,
            clear: co,
            forEach: Vn(!1, !1)
        },
        t = {
            get(o) {
                return Qn(this, o, !1, !0)
            },
            get size() {
                return $n(this)
            },
            has: zn,
            add: oo,
            set: io,
            delete: ao,
            clear: co,
            forEach: Vn(!1, !0)
        },
        n = {
            get(o) {
                return Qn(this, o, !0)
            },
            get size() {
                return $n(this, !0)
            },
            has(o) {
                return zn.call(this, o, !0)
            },
            add: pt("add"),
            set: pt("set"),
            delete: pt("delete"),
            clear: pt("clear"),
            forEach: Vn(!0, !1)
        },
        r = {
            get(o) {
                return Qn(this, o, !0, !0)
            },
            get size() {
                return $n(this, !0)
            },
            has(o) {
                return zn.call(this, o, !0)
            },
            add: pt("add"),
            set: pt("set"),
            delete: pt("delete"),
            clear: pt("clear"),
            forEach: Vn(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(o => {
        e[o] = Gn(o, !1, !1), n[o] = Gn(o, !0, !1), t[o] = Gn(o, !1, !0), r[o] = Gn(o, !0, !0)
    }), [e, n, t, r]
}
const [Rc, Pc, Cc, Tc] = Oc();

function Ts(e, t) {
    const n = t ? e ? Tc : Cc : e ? Pc : Rc;
    return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(V(n, s) && s in r ? n : r, s, o)
}
const Ic = {
        get: Ts(!1, !1)
    },
    Nc = {
        get: Ts(!1, !0)
    },
    xc = {
        get: Ts(!0, !1)
    },
    Ei = new WeakMap,
    Ai = new WeakMap,
    Si = new WeakMap,
    Lc = new WeakMap;

function Fc(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function kc(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Fc(sc(e))
}

function cn(e) {
    return Zt(e) ? e : Is(e, !1, wi, Ic, Ei)
}

function Dc(e) {
    return Is(e, !1, _c, Nc, Ai)
}

function _i(e) {
    return Is(e, !0, Sc, xc, Si)
}

function Is(e, t, n, r, s) {
    if (!ae(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const o = s.get(e);
    if (o) return o;
    const i = kc(e);
    if (i === 0) return e;
    const c = new Proxy(e, i === 2 ? r : n);
    return s.set(e, c), c
}

function Jt(e) {
    return Zt(e) ? Jt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function Zt(e) {
    return !!(e && e.__v_isReadonly)
}

function lr(e) {
    return !!(e && e.__v_isShallow)
}

function Oi(e) {
    return Jt(e) || Zt(e)
}

function X(e) {
    const t = e && e.__v_raw;
    return t ? X(t) : e
}

function Ri(e) {
    return cr(e, "__v_skip", !0), e
}
const In = e => ae(e) ? cn(e) : e,
    Ns = e => ae(e) ? _i(e) : e;

function Pi(e) {
    wt && qe && (e = X(e), yi(e.dep || (e.dep = Os())))
}

function Ci(e, t) {
    e = X(e), e.dep && Zr(e.dep)
}

function ge(e) {
    return !!(e && e.__v_isRef === !0)
}

function Et(e) {
    return Ti(e, !1)
}

function Yc(e) {
    return Ti(e, !0)
}

function Ti(e, t) {
    return ge(e) ? e : new Bc(e, t)
}
class Bc {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : X(t), this._value = n ? t : In(t)
    }
    get value() {
        return Pi(this), this._value
    }
    set value(t) {
        const n = this.__v_isShallow || lr(t) || Zt(t);
        t = n ? t : X(t), Tn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : In(t), Ci(this))
    }
}

function Oe(e) {
    return ge(e) ? e.value : e
}
const Uc = {
    get: (e, t, n) => Oe(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return ge(s) && !ge(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function Ii(e) {
    return Jt(e) ? e : new Proxy(e, Uc)
}
var Ni;
class Mc {
    constructor(t, n, r, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Ni] = !1, this._dirty = !0, this.effect = new Rs(t, () => {
            this._dirty || (this._dirty = !0, Ci(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
    }
    get value() {
        const t = X(this);
        return Pi(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }
    set value(t) {
        this._setter(t)
    }
}
Ni = "__v_isReadonly";

function jc(e, t, n = !1) {
    let r, s;
    const o = H(e);
    return o ? (r = e, s = Qe) : (r = e.get, s = e.set), new Mc(r, s, o || !s, n)
}

function At(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e()
    } catch (o) {
        Sr(o, t, n)
    }
    return s
}

function Be(e, t, n, r) {
    if (H(e)) {
        const o = At(e, t, n, r);
        return o && fi(o) && o.catch(i => {
            Sr(i, t, n)
        }), o
    }
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(Be(e[o], t, n, r));
    return s
}

function Sr(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy,
            c = n;
        for (; o;) {
            const l = o.ec;
            if (l) {
                for (let u = 0; u < l.length; u++)
                    if (l[u](e, i, c) === !1) return
            }
            o = o.parent
        }
        const a = t.appContext.config.errorHandler;
        if (a) {
            At(a, null, 10, [e, i, c]);
            return
        }
    }
    Hc(e, n, s, r)
}

function Hc(e, t, n, r = !0) {
    console.error(e)
}
let Nn = !1,
    es = !1;
const Ae = [];
let et = 0;
const Xt = [];
let it = null,
    Nt = 0;
const xi = Promise.resolve();
let xs = null;

function Li(e) {
    const t = xs || xi;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Wc(e) {
    let t = et + 1,
        n = Ae.length;
    for (; t < n;) {
        const r = t + n >>> 1;
        xn(Ae[r]) < e ? t = r + 1 : n = r
    }
    return t
}

function Ls(e) {
    (!Ae.length || !Ae.includes(e, Nn && e.allowRecurse ? et + 1 : et)) && (e.id == null ? Ae.push(e) : Ae.splice(Wc(e.id), 0, e), Fi())
}

function Fi() {
    !Nn && !es && (es = !0, xs = xi.then(Di))
}

function qc(e) {
    const t = Ae.indexOf(e);
    t > et && Ae.splice(t, 1)
}

function Kc(e) {
    j(e) ? Xt.push(...e) : (!it || !it.includes(e, e.allowRecurse ? Nt + 1 : Nt)) && Xt.push(e), Fi()
}

function lo(e, t = Nn ? et + 1 : 0) {
    for (; t < Ae.length; t++) {
        const n = Ae[t];
        n && n.pre && (Ae.splice(t, 1), t--, n())
    }
}

function ki(e) {
    if (Xt.length) {
        const t = [...new Set(Xt)];
        if (Xt.length = 0, it) {
            it.push(...t);
            return
        }
        for (it = t, it.sort((n, r) => xn(n) - xn(r)), Nt = 0; Nt < it.length; Nt++) it[Nt]();
        it = null, Nt = 0
    }
}
const xn = e => e.id == null ? 1 / 0 : e.id,
    Qc = (e, t) => {
        const n = xn(e) - xn(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

function Di(e) {
    es = !1, Nn = !0, Ae.sort(Qc);
    const t = Qe;
    try {
        for (et = 0; et < Ae.length; et++) {
            const n = Ae[et];
            n && n.active !== !1 && At(n, null, 14)
        }
    } finally {
        et = 0, Ae.length = 0, ki(), Nn = !1, xs = null, (Ae.length || Xt.length) && Di()
    }
}

function zc(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || re;
    let s = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in r) {
        const u = `${i==="modelValue"?"model":i}Modifiers`,
            {
                number: h,
                trim: d
            } = r[u] || re;
        d && (s = n.map(p => p.trim())), h && (s = n.map(ac))
    }
    let c, a = r[c = Ur(t)] || r[c = Ur(tt(t))];
    !a && o && (a = r[c = Ur(sn(t))]), a && Be(a, e, 6, s);
    const l = r[c + "Once"];
    if (l) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[c]) return;
        e.emitted[c] = !0, Be(l, e, 6, s)
    }
}

function Yi(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {},
        c = !1;
    if (!H(e)) {
        const a = l => {
            const u = Yi(l, t, !0);
            u && (c = !0, Se(i, u))
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    return !o && !c ? (ae(e) && r.set(e, null), null) : (j(o) ? o.forEach(a => i[a] = null) : Se(i, o), ae(e) && r.set(e, i), i)
}

function _r(e, t) {
    return !e || !vr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), V(e, t[0].toLowerCase() + t.slice(1)) || V(e, sn(t)) || V(e, t))
}
let Ye = null,
    Or = null;

function ur(e) {
    const t = Ye;
    return Ye = e, Or = e && e.type.__scopeId || null, t
}

function jt(e) {
    Or = e
}

function Ht() {
    Or = null
}

function $c(e, t = Ye, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && Eo(-1);
        const o = ur(t),
            i = e(...s);
        return ur(o), r._d && Eo(1), i
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function jr(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: o,
        propsOptions: [i],
        slots: c,
        attrs: a,
        emit: l,
        render: u,
        renderCache: h,
        data: d,
        setupState: p,
        ctx: g,
        inheritAttrs: y
    } = e;
    let A, w;
    const T = ur(e);
    try {
        if (n.shapeFlag & 4) {
            const L = s || r;
            A = Ze(u.call(L, L, h, o, p, d, g)), w = a
        } else {
            const L = t;
            A = Ze(L.length > 1 ? L(o, {
                attrs: a,
                slots: c,
                emit: l
            }) : L(o, null)), w = t.props ? a : Vc(a)
        }
    } catch (L) {
        Sn.length = 0, Sr(L, e, 1), A = ve($e)
    }
    let k = A;
    if (w && y !== !1) {
        const L = Object.keys(w),
            {
                shapeFlag: W
            } = k;
        L.length && W & 7 && (i && L.some(Es) && (w = Gc(w, i)), k = Ot(k, w))
    }
    return n.dirs && (k = Ot(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), A = k, ur(T), A
}
const Vc = e => {
        let t;
        for (const n in e)(n === "class" || n === "style" || vr(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    Gc = (e, t) => {
        const n = {};
        for (const r in e)(!Es(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n
    };

function Jc(e, t, n) {
    const {
        props: r,
        children: s,
        component: o
    } = e, {
        props: i,
        children: c,
        patchFlag: a
    } = t, l = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && a >= 0) {
        if (a & 1024) return !0;
        if (a & 16) return r ? uo(r, i, l) : !!i;
        if (a & 8) {
            const u = t.dynamicProps;
            for (let h = 0; h < u.length; h++) {
                const d = u[h];
                if (i[d] !== r[d] && !_r(l, d)) return !0
            }
        }
    } else return (s || c) && (!c || !c.$stable) ? !0 : r === i ? !1 : r ? i ? uo(r, i, l) : !0 : !!i;
    return !1
}

function uo(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !_r(n, o)) return !0
    }
    return !1
}

function Xc({
    vnode: e,
    parent: t
}, n) {
    for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent
}
const Zc = e => e.__isSuspense;

function el(e, t) {
    t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : Kc(e)
}

function An(e, t) {
    if (me) {
        let n = me.provides;
        const r = me.parent && me.parent.provides;
        r === n && (n = me.provides = Object.create(r)), n[e] = t
    }
}

function ze(e, t, n = !1) {
    const r = me || Ye;
    if (r) {
        const s = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && H(t) ? t.call(r.proxy) : t
    }
}
const fo = {};

function Zn(e, t, n) {
    return Bi(e, t, n)
}

function Bi(e, t, {
    immediate: n,
    deep: r,
    flush: s,
    onTrack: o,
    onTrigger: i
} = re) {
    const c = me;
    let a, l = !1,
        u = !1;
    if (ge(e) ? (a = () => e.value, l = lr(e)) : Jt(e) ? (a = () => e, r = !0) : j(e) ? (u = !0, l = e.some(w => Jt(w) || lr(w)), a = () => e.map(w => {
            if (ge(w)) return w.value;
            if (Jt(w)) return Ft(w);
            if (H(w)) return At(w, c, 2)
        })) : H(e) ? t ? a = () => At(e, c, 2) : a = () => {
            if (!(c && c.isUnmounted)) return h && h(), Be(e, c, 3, [d])
        } : a = Qe, t && r) {
        const w = a;
        a = () => Ft(w())
    }
    let h, d = w => {
        h = A.onStop = () => {
            At(w, c, 4)
        }
    };
    if (kn) return d = Qe, t ? n && Be(t, c, 3, [a(), u ? [] : void 0, d]) : a(), Qe;
    let p = u ? [] : fo;
    const g = () => {
        if (!!A.active)
            if (t) {
                const w = A.run();
                (r || l || (u ? w.some((T, k) => Tn(T, p[k])) : Tn(w, p))) && (h && h(), Be(t, c, 3, [w, p === fo ? void 0 : p, d]), p = w)
            } else A.run()
    };
    g.allowRecurse = !!t;
    let y;
    s === "sync" ? y = g : s === "post" ? y = () => Ce(g, c && c.suspense) : (g.pre = !0, c && (g.id = c.uid), y = () => Ls(g));
    const A = new Rs(a, y);
    return t ? n ? g() : p = A.run() : s === "post" ? Ce(A.run.bind(A), c && c.suspense) : A.run(), () => {
        A.stop(), c && c.scope && As(c.scope.effects, A)
    }
}

function tl(e, t, n) {
    const r = this.proxy,
        s = ye(e) ? e.includes(".") ? Ui(r, e) : () => r[e] : e.bind(r, r);
    let o;
    H(t) ? o = t : (o = t.handler, n = t);
    const i = me;
    tn(this);
    const c = Bi(s, o.bind(r), n);
    return i ? tn(i) : Bt(), c
}

function Ui(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r
    }
}

function Ft(e, t) {
    if (!ae(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), ge(e)) Ft(e.value, t);
    else if (j(e))
        for (let n = 0; n < e.length; n++) Ft(e[n], t);
    else if (ui(e) || Gt(e)) e.forEach(n => {
        Ft(n, t)
    });
    else if (hi(e))
        for (const n in e) Ft(e[n], t);
    return e
}

function nl() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return Wi(() => {
        e.isMounted = !0
    }), qi(() => {
        e.isUnmounting = !0
    }), e
}
const Fe = [Function, Array],
    rl = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Fe,
            onEnter: Fe,
            onAfterEnter: Fe,
            onEnterCancelled: Fe,
            onBeforeLeave: Fe,
            onLeave: Fe,
            onAfterLeave: Fe,
            onLeaveCancelled: Fe,
            onBeforeAppear: Fe,
            onAppear: Fe,
            onAfterAppear: Fe,
            onAppearCancelled: Fe
        },
        setup(e, {
            slots: t
        }) {
            const n = Wl(),
                r = nl();
            let s;
            return () => {
                const o = t.default && ji(t.default(), !0);
                if (!o || !o.length) return;
                let i = o[0];
                if (o.length > 1) {
                    for (const y of o)
                        if (y.type !== $e) {
                            i = y;
                            break
                        }
                }
                const c = X(e),
                    {
                        mode: a
                    } = c;
                if (r.isLeaving) return Hr(i);
                const l = ho(i);
                if (!l) return Hr(i);
                const u = ts(l, c, r, n);
                ns(l, u);
                const h = n.subTree,
                    d = h && ho(h);
                let p = !1;
                const {
                    getTransitionKey: g
                } = l.type;
                if (g) {
                    const y = g();
                    s === void 0 ? s = y : y !== s && (s = y, p = !0)
                }
                if (d && d.type !== $e && (!xt(l, d) || p)) {
                    const y = ts(d, c, r, n);
                    if (ns(d, y), a === "out-in") return r.isLeaving = !0, y.afterLeave = () => {
                        r.isLeaving = !1, n.update()
                    }, Hr(i);
                    a === "in-out" && l.type !== $e && (y.delayLeave = (A, w, T) => {
                        const k = Mi(r, d);
                        k[String(d.key)] = d, A._leaveCb = () => {
                            w(), A._leaveCb = void 0, delete u.delayedLeave
                        }, u.delayedLeave = T
                    })
                }
                return i
            }
        }
    },
    sl = rl;

function Mi(e, t) {
    const {
        leavingVNodes: n
    } = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null), n.set(t.type, r)), r
}

function ts(e, t, n, r) {
    const {
        appear: s,
        mode: o,
        persisted: i = !1,
        onBeforeEnter: c,
        onEnter: a,
        onAfterEnter: l,
        onEnterCancelled: u,
        onBeforeLeave: h,
        onLeave: d,
        onAfterLeave: p,
        onLeaveCancelled: g,
        onBeforeAppear: y,
        onAppear: A,
        onAfterAppear: w,
        onAppearCancelled: T
    } = t, k = String(e.key), L = Mi(n, e), W = (q, ue) => {
        q && Be(q, r, 9, ue)
    }, ee = (q, ue) => {
        const ie = ue[1];
        W(q, ue), j(q) ? q.every(we => we.length <= 1) && ie() : q.length <= 1 && ie()
    }, Re = {
        mode: o,
        persisted: i,
        beforeEnter(q) {
            let ue = c;
            if (!n.isMounted)
                if (s) ue = y || c;
                else return;
            q._leaveCb && q._leaveCb(!0);
            const ie = L[k];
            ie && xt(e, ie) && ie.el._leaveCb && ie.el._leaveCb(), W(ue, [q])
        },
        enter(q) {
            let ue = a,
                ie = l,
                we = u;
            if (!n.isMounted)
                if (s) ue = A || a, ie = w || l, we = T || u;
                else return;
            let Ee = !1;
            const Me = q._enterCb = st => {
                Ee || (Ee = !0, st ? W(we, [q]) : W(ie, [q]), Re.delayedLeave && Re.delayedLeave(), q._enterCb = void 0)
            };
            ue ? ee(ue, [q, Me]) : Me()
        },
        leave(q, ue) {
            const ie = String(e.key);
            if (q._enterCb && q._enterCb(!0), n.isUnmounting) return ue();
            W(h, [q]);
            let we = !1;
            const Ee = q._leaveCb = Me => {
                we || (we = !0, ue(), Me ? W(g, [q]) : W(p, [q]), q._leaveCb = void 0, L[ie] === e && delete L[ie])
            };
            L[ie] = e, d ? ee(d, [q, Ee]) : Ee()
        },
        clone(q) {
            return ts(q, t, n, r)
        }
    };
    return Re
}

function Hr(e) {
    if (Rr(e)) return e = Ot(e), e.children = null, e
}

function ho(e) {
    return Rr(e) ? e.children ? e.children[0] : void 0 : e
}

function ns(e, t) {
    e.shapeFlag & 6 && e.component ? ns(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function ji(e, t = !1, n) {
    let r = [],
        s = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const c = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        i.type === le ? (i.patchFlag & 128 && s++, r = r.concat(ji(i.children, t, c))) : (t || i.type !== $e) && r.push(c != null ? Ot(i, {
            key: c
        }) : i)
    }
    if (s > 1)
        for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
    return r
}

function jn(e) {
    return H(e) ? {
        setup: e,
        name: e.name
    } : e
}
const er = e => !!e.type.__asyncLoader,
    Rr = e => e.type.__isKeepAlive;

function ol(e, t) {
    Hi(e, "a", t)
}

function il(e, t) {
    Hi(e, "da", t)
}

function Hi(e, t, n = me) {
    const r = e.__wdc || (e.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return e()
    });
    if (Pr(t, r, n), n) {
        let s = n.parent;
        for (; s && s.parent;) Rr(s.parent.vnode) && al(r, t, n, s), s = s.parent
    }
}

function al(e, t, n, r) {
    const s = Pr(t, e, r, !0);
    Ki(() => {
        As(r[t], s)
    }, n)
}

function Pr(e, t, n = me, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            o = t.__weh || (t.__weh = (...i) => {
                if (n.isUnmounted) return;
                on(), tn(n);
                const c = Be(t, n, e, i);
                return Bt(), an(), c
            });
        return r ? s.unshift(o) : s.push(o), o
    }
}
const ft = e => (t, n = me) => (!kn || e === "sp") && Pr(e, (...r) => t(...r), n),
    cl = ft("bm"),
    Wi = ft("m"),
    ll = ft("bu"),
    ul = ft("u"),
    qi = ft("bum"),
    Ki = ft("um"),
    fl = ft("sp"),
    dl = ft("rtg"),
    hl = ft("rtc");

function pl(e, t = me) {
    Pr("ec", e, t)
}

function Ln(e, t) {
    const n = Ye;
    if (n === null) return e;
    const r = Tr(n) || n.proxy,
        s = e.dirs || (e.dirs = []);
    for (let o = 0; o < t.length; o++) {
        let [i, c, a, l = re] = t[o];
        H(i) && (i = {
            mounted: i,
            updated: i
        }), i.deep && Ft(c), s.push({
            dir: i,
            instance: r,
            value: c,
            oldValue: void 0,
            arg: a,
            modifiers: l
        })
    }
    return e
}

function Pt(e, t, n, r) {
    const s = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        o && (c.oldValue = o[i].value);
        let a = c.dir[r];
        a && (on(), Be(a, n, 8, [e.el, c, e, t]), an())
    }
}
const Qi = "components";

function ml(e, t) {
    return yl(Qi, e, !0, t) || e
}
const gl = Symbol();

function yl(e, t, n = !0, r = !1) {
    const s = Ye || me;
    if (s) {
        const o = s.type;
        if (e === Qi) {
            const c = $l(o, !1);
            if (c && (c === t || c === tt(t) || c === Er(tt(t)))) return o
        }
        const i = po(s[e] || o[e], t) || po(s.appContext[e], t);
        return !i && r ? o : i
    }
}

function po(e, t) {
    return e && (e[t] || e[tt(t)] || e[Er(tt(t))])
}

function at(e, t, n, r) {
    let s;
    const o = n && n[r];
    if (j(e) || ye(e)) {
        s = new Array(e.length);
        for (let i = 0, c = e.length; i < c; i++) s[i] = t(e[i], i, void 0, o && o[i])
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i])
    } else if (ae(e))
        if (e[Symbol.iterator]) s = Array.from(e, (i, c) => t(i, c, void 0, o && o[c]));
        else {
            const i = Object.keys(e);
            s = new Array(i.length);
            for (let c = 0, a = i.length; c < a; c++) {
                const l = i[c];
                s[c] = t(e[l], l, c, o && o[c])
            }
        }
    else s = [];
    return n && (n[r] = s), s
}
const rs = e => e ? ra(e) ? Tr(e) || e.proxy : rs(e.parent) : null,
    fr = Se(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => rs(e.parent),
        $root: e => rs(e.root),
        $emit: e => e.emit,
        $options: e => Fs(e),
        $forceUpdate: e => e.f || (e.f = () => Ls(e.update)),
        $nextTick: e => e.n || (e.n = Li.bind(e.proxy)),
        $watch: e => tl.bind(e)
    }),
    vl = {
        get({
            _: e
        }, t) {
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: o,
                accessCache: i,
                type: c,
                appContext: a
            } = e;
            let l;
            if (t[0] !== "$") {
                const p = i[t];
                if (p !== void 0) switch (p) {
                    case 1:
                        return r[t];
                    case 2:
                        return s[t];
                    case 4:
                        return n[t];
                    case 3:
                        return o[t]
                } else {
                    if (r !== re && V(r, t)) return i[t] = 1, r[t];
                    if (s !== re && V(s, t)) return i[t] = 2, s[t];
                    if ((l = e.propsOptions[0]) && V(l, t)) return i[t] = 3, o[t];
                    if (n !== re && V(n, t)) return i[t] = 4, n[t];
                    ss && (i[t] = 0)
                }
            }
            const u = fr[t];
            let h, d;
            if (u) return t === "$attrs" && xe(e, "get", t), u(e);
            if ((h = c.__cssModules) && (h = h[t])) return h;
            if (n !== re && V(n, t)) return i[t] = 4, n[t];
            if (d = a.config.globalProperties, V(d, t)) return d[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: r,
                setupState: s,
                ctx: o
            } = e;
            return s !== re && V(s, t) ? (s[t] = n, !0) : r !== re && V(r, t) ? (r[t] = n, !0) : V(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: r,
                appContext: s,
                propsOptions: o
            }
        }, i) {
            let c;
            return !!n[i] || e !== re && V(e, i) || t !== re && V(t, i) || (c = o[0]) && V(c, i) || V(r, i) || V(fr, i) || V(s.config.globalProperties, i)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : V(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };
let ss = !0;

function bl(e) {
    const t = Fs(e),
        n = e.proxy,
        r = e.ctx;
    ss = !1, t.beforeCreate && mo(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: c,
        provide: a,
        inject: l,
        created: u,
        beforeMount: h,
        mounted: d,
        beforeUpdate: p,
        updated: g,
        activated: y,
        deactivated: A,
        beforeDestroy: w,
        beforeUnmount: T,
        destroyed: k,
        unmounted: L,
        render: W,
        renderTracked: ee,
        renderTriggered: Re,
        errorCaptured: q,
        serverPrefetch: ue,
        expose: ie,
        inheritAttrs: we,
        components: Ee,
        directives: Me,
        filters: st
    } = t;
    if (l && wl(l, r, null, e.appContext.config.unwrapInjectedRef), i)
        for (const se in i) {
            const te = i[se];
            H(te) && (r[se] = te.bind(n))
        }
    if (s) {
        const se = s.call(n, n);
        ae(se) && (e.data = cn(se))
    }
    if (ss = !0, o)
        for (const se in o) {
            const te = o[se],
                je = H(te) ? te.bind(n, n) : H(te.get) ? te.get.bind(n, n) : Qe,
                Rt = !H(te) && H(te.set) ? te.set.bind(n) : Qe,
                He = De({
                    get: je,
                    set: Rt
                });
            Object.defineProperty(r, se, {
                enumerable: !0,
                configurable: !0,
                get: () => He.value,
                set: Pe => He.value = Pe
            })
        }
    if (c)
        for (const se in c) zi(c[se], r, n, se);
    if (a) {
        const se = H(a) ? a.call(n) : a;
        Reflect.ownKeys(se).forEach(te => {
            An(te, se[te])
        })
    }
    u && mo(u, e, "c");

    function fe(se, te) {
        j(te) ? te.forEach(je => se(je.bind(n))) : te && se(te.bind(n))
    }
    if (fe(cl, h), fe(Wi, d), fe(ll, p), fe(ul, g), fe(ol, y), fe(il, A), fe(pl, q), fe(hl, ee), fe(dl, Re), fe(qi, T), fe(Ki, L), fe(fl, ue), j(ie))
        if (ie.length) {
            const se = e.exposed || (e.exposed = {});
            ie.forEach(te => {
                Object.defineProperty(se, te, {
                    get: () => n[te],
                    set: je => n[te] = je
                })
            })
        } else e.exposed || (e.exposed = {});
    W && e.render === Qe && (e.render = W), we != null && (e.inheritAttrs = we), Ee && (e.components = Ee), Me && (e.directives = Me)
}

function wl(e, t, n = Qe, r = !1) {
    j(e) && (e = os(e));
    for (const s in e) {
        const o = e[s];
        let i;
        ae(o) ? "default" in o ? i = ze(o.from || s, o.default, !0) : i = ze(o.from || s) : i = ze(o), ge(i) && r ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: c => i.value = c
        }) : t[s] = i
    }
}

function mo(e, t, n) {
    Be(j(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function zi(e, t, n, r) {
    const s = r.includes(".") ? Ui(n, r) : () => n[r];
    if (ye(e)) {
        const o = t[e];
        H(o) && Zn(s, o)
    } else if (H(e)) Zn(s, e.bind(n));
    else if (ae(e))
        if (j(e)) e.forEach(o => zi(o, t, n, r));
        else {
            const o = H(e.handler) ? e.handler.bind(n) : t[e.handler];
            H(o) && Zn(s, o, e)
        }
}

function Fs(e) {
    const t = e.type,
        {
            mixins: n,
            extends: r
        } = t,
        {
            mixins: s,
            optionsCache: o,
            config: {
                optionMergeStrategies: i
            }
        } = e.appContext,
        c = o.get(t);
    let a;
    return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(l => dr(a, l, i, !0)), dr(a, t, i)), ae(t) && o.set(t, a), a
}

function dr(e, t, n, r = !1) {
    const {
        mixins: s,
        extends: o
    } = t;
    o && dr(e, o, n, !0), s && s.forEach(i => dr(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const c = El[i] || n && n[i];
            e[i] = c ? c(e[i], t[i]) : t[i]
        }
    return e
}
const El = {
    data: go,
    props: Tt,
    emits: Tt,
    methods: Tt,
    computed: Tt,
    beforeCreate: _e,
    created: _e,
    beforeMount: _e,
    mounted: _e,
    beforeUpdate: _e,
    updated: _e,
    beforeDestroy: _e,
    beforeUnmount: _e,
    destroyed: _e,
    unmounted: _e,
    activated: _e,
    deactivated: _e,
    errorCaptured: _e,
    serverPrefetch: _e,
    components: Tt,
    directives: Tt,
    watch: Sl,
    provide: go,
    inject: Al
};

function go(e, t) {
    return t ? e ? function() {
        return Se(H(e) ? e.call(this, this) : e, H(t) ? t.call(this, this) : t)
    } : t : e
}

function Al(e, t) {
    return Tt(os(e), os(t))
}

function os(e) {
    if (j(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function _e(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Tt(e, t) {
    return e ? Se(Se(Object.create(null), e), t) : t
}

function Sl(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Se(Object.create(null), e);
    for (const r in t) n[r] = _e(e[r], t[r]);
    return n
}

function _l(e, t, n, r = !1) {
    const s = {},
        o = {};
    cr(o, Cr, 1), e.propsDefaults = Object.create(null), $i(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? e.props = r ? s : Dc(s) : e.type.props ? e.props = s : e.props = o, e.attrs = o
}

function Ol(e, t, n, r) {
    const {
        props: s,
        attrs: o,
        vnode: {
            patchFlag: i
        }
    } = e, c = X(s), [a] = e.propsOptions;
    let l = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const u = e.vnode.dynamicProps;
            for (let h = 0; h < u.length; h++) {
                let d = u[h];
                if (_r(e.emitsOptions, d)) continue;
                const p = t[d];
                if (a)
                    if (V(o, d)) p !== o[d] && (o[d] = p, l = !0);
                    else {
                        const g = tt(d);
                        s[g] = is(a, c, g, p, e, !1)
                    }
                else p !== o[d] && (o[d] = p, l = !0)
            }
        }
    } else {
        $i(e, t, s, o) && (l = !0);
        let u;
        for (const h in c)(!t || !V(t, h) && ((u = sn(h)) === h || !V(t, u))) && (a ? n && (n[h] !== void 0 || n[u] !== void 0) && (s[h] = is(a, c, h, void 0, e, !0)) : delete s[h]);
        if (o !== c)
            for (const h in o)(!t || !V(t, h) && !0) && (delete o[h], l = !0)
    }
    l && ut(e, "set", "$attrs")
}

function $i(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1,
        c;
    if (t)
        for (let a in t) {
            if (Xn(a)) continue;
            const l = t[a];
            let u;
            s && V(s, u = tt(a)) ? !o || !o.includes(u) ? n[u] = l : (c || (c = {}))[u] = l : _r(e.emitsOptions, a) || (!(a in r) || l !== r[a]) && (r[a] = l, i = !0)
        }
    if (o) {
        const a = X(n),
            l = c || re;
        for (let u = 0; u < o.length; u++) {
            const h = o[u];
            n[h] = is(s, a, h, l[h], e, !V(l, h))
        }
    }
    return i
}

function is(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const c = V(i, "default");
        if (c && r === void 0) {
            const a = i.default;
            if (i.type !== Function && H(a)) {
                const {
                    propsDefaults: l
                } = s;
                n in l ? r = l[n] : (tn(s), r = l[n] = a.call(null, t), Bt())
            } else r = a
        }
        i[0] && (o && !c ? r = !1 : i[1] && (r === "" || r === sn(n)) && (r = !0))
    }
    return r
}

function Vi(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const o = e.props,
        i = {},
        c = [];
    let a = !1;
    if (!H(e)) {
        const u = h => {
            a = !0;
            const [d, p] = Vi(h, t, !0);
            Se(i, d), p && c.push(...p)
        };
        !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
    }
    if (!o && !a) return ae(e) && r.set(e, Vt), Vt;
    if (j(o))
        for (let u = 0; u < o.length; u++) {
            const h = tt(o[u]);
            yo(h) && (i[h] = re)
        } else if (o)
            for (const u in o) {
                const h = tt(u);
                if (yo(h)) {
                    const d = o[u],
                        p = i[h] = j(d) || H(d) ? {
                            type: d
                        } : d;
                    if (p) {
                        const g = wo(Boolean, p.type),
                            y = wo(String, p.type);
                        p[0] = g > -1, p[1] = y < 0 || g < y, (g > -1 || V(p, "default")) && c.push(h)
                    }
                }
            }
    const l = [i, c];
    return ae(e) && r.set(e, l), l
}

function yo(e) {
    return e[0] !== "$"
}

function vo(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}

function bo(e, t) {
    return vo(e) === vo(t)
}

function wo(e, t) {
    return j(t) ? t.findIndex(n => bo(n, e)) : H(t) && bo(t, e) ? 0 : -1
}
const Gi = e => e[0] === "_" || e === "$stable",
    ks = e => j(e) ? e.map(Ze) : [Ze(e)],
    Rl = (e, t, n) => {
        if (t._n) return t;
        const r = $c((...s) => ks(t(...s)), n);
        return r._c = !1, r
    },
    Ji = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (Gi(s)) continue;
            const o = e[s];
            if (H(o)) t[s] = Rl(s, o, r);
            else if (o != null) {
                const i = ks(o);
                t[s] = () => i
            }
        }
    },
    Xi = (e, t) => {
        const n = ks(t);
        e.slots.default = () => n
    },
    Pl = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = X(t), cr(t, "_", n)) : Ji(t, e.slots = {})
        } else e.slots = {}, t && Xi(e, t);
        cr(e.slots, Cr, 1)
    },
    Cl = (e, t, n) => {
        const {
            vnode: r,
            slots: s
        } = e;
        let o = !0,
            i = re;
        if (r.shapeFlag & 32) {
            const c = t._;
            c ? n && c === 1 ? o = !1 : (Se(s, t), !n && c === 1 && delete s._) : (o = !t.$stable, Ji(t, s)), i = t
        } else t && (Xi(e, t), i = {
            default: 1
        });
        if (o)
            for (const c in s) !Gi(c) && !(c in i) && delete s[c]
    };

function Zi() {
    return {
        app: null,
        config: {
            isNativeTag: tc,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Tl = 0;

function Il(e, t) {
    return function(r, s = null) {
        H(r) || (r = Object.assign({}, r)), s != null && !ae(s) && (s = null);
        const o = Zi(),
            i = new Set;
        let c = !1;
        const a = o.app = {
            _uid: Tl++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: Gl,
            get config() {
                return o.config
            },
            set config(l) {},
            use(l, ...u) {
                return i.has(l) || (l && H(l.install) ? (i.add(l), l.install(a, ...u)) : H(l) && (i.add(l), l(a, ...u))), a
            },
            mixin(l) {
                return o.mixins.includes(l) || o.mixins.push(l), a
            },
            component(l, u) {
                return u ? (o.components[l] = u, a) : o.components[l]
            },
            directive(l, u) {
                return u ? (o.directives[l] = u, a) : o.directives[l]
            },
            mount(l, u, h) {
                if (!c) {
                    const d = ve(r, s);
                    return d.appContext = o, u && t ? t(d, l) : e(d, l, h), c = !0, a._container = l, l.__vue_app__ = a, Tr(d.component) || d.component.proxy
                }
            },
            unmount() {
                c && (e(null, a._container), delete a._container.__vue_app__)
            },
            provide(l, u) {
                return o.provides[l] = u, a
            }
        };
        return a
    }
}

function as(e, t, n, r, s = !1) {
    if (j(e)) {
        e.forEach((d, p) => as(d, t && (j(t) ? t[p] : t), n, r, s));
        return
    }
    if (er(r) && !s) return;
    const o = r.shapeFlag & 4 ? Tr(r.component) || r.component.proxy : r.el,
        i = s ? null : o,
        {
            i: c,
            r: a
        } = e,
        l = t && t.r,
        u = c.refs === re ? c.refs = {} : c.refs,
        h = c.setupState;
    if (l != null && l !== a && (ye(l) ? (u[l] = null, V(h, l) && (h[l] = null)) : ge(l) && (l.value = null)), H(a)) At(a, c, 12, [i, u]);
    else {
        const d = ye(a),
            p = ge(a);
        if (d || p) {
            const g = () => {
                if (e.f) {
                    const y = d ? u[a] : a.value;
                    s ? j(y) && As(y, o) : j(y) ? y.includes(o) || y.push(o) : d ? (u[a] = [o], V(h, a) && (h[a] = u[a])) : (a.value = [o], e.k && (u[e.k] = a.value))
                } else d ? (u[a] = i, V(h, a) && (h[a] = i)) : p && (a.value = i, e.k && (u[e.k] = i))
            };
            i ? (g.id = -1, Ce(g, n)) : g()
        }
    }
}
const Ce = el;

function Nl(e) {
    return xl(e)
}

function xl(e, t) {
    const n = cc();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: o,
        createElement: i,
        createText: c,
        createComment: a,
        setText: l,
        setElementText: u,
        parentNode: h,
        nextSibling: d,
        setScopeId: p = Qe,
        insertStaticContent: g
    } = e, y = (f, m, v, b = null, _ = null, C = null, x = !1, P = null, I = !!m.dynamicChildren) => {
        if (f === m) return;
        f && !xt(f, m) && (b = N(f), Pe(f, _, C, !0), f = null), m.patchFlag === -2 && (I = !1, m.dynamicChildren = null);
        const {
            type: O,
            ref: B,
            shapeFlag: D
        } = m;
        switch (O) {
            case Ds:
                A(f, m, v, b);
                break;
            case $e:
                w(f, m, v, b);
                break;
            case tr:
                f == null && T(m, v, b, x);
                break;
            case le:
                Ee(f, m, v, b, _, C, x, P, I);
                break;
            default:
                D & 1 ? W(f, m, v, b, _, C, x, P, I) : D & 6 ? Me(f, m, v, b, _, C, x, P, I) : (D & 64 || D & 128) && O.process(f, m, v, b, _, C, x, P, I, G)
        }
        B != null && _ && as(B, f && f.ref, C, m || f, !m)
    }, A = (f, m, v, b) => {
        if (f == null) r(m.el = c(m.children), v, b);
        else {
            const _ = m.el = f.el;
            m.children !== f.children && l(_, m.children)
        }
    }, w = (f, m, v, b) => {
        f == null ? r(m.el = a(m.children || ""), v, b) : m.el = f.el
    }, T = (f, m, v, b) => {
        [f.el, f.anchor] = g(f.children, m, v, b, f.el, f.anchor)
    }, k = ({
        el: f,
        anchor: m
    }, v, b) => {
        let _;
        for (; f && f !== m;) _ = d(f), r(f, v, b), f = _;
        r(m, v, b)
    }, L = ({
        el: f,
        anchor: m
    }) => {
        let v;
        for (; f && f !== m;) v = d(f), s(f), f = v;
        s(m)
    }, W = (f, m, v, b, _, C, x, P, I) => {
        x = x || m.type === "svg", f == null ? ee(m, v, b, _, C, x, P, I) : ue(f, m, _, C, x, P, I)
    }, ee = (f, m, v, b, _, C, x, P) => {
        let I, O;
        const {
            type: B,
            props: D,
            shapeFlag: U,
            transition: M,
            dirs: Q
        } = f;
        if (I = f.el = i(f.type, C, D && D.is, D), U & 8 ? u(I, f.children) : U & 16 && q(f.children, I, null, b, _, C && B !== "foreignObject", x, P), Q && Pt(f, null, b, "created"), D) {
            for (const ne in D) ne !== "value" && !Xn(ne) && o(I, ne, null, D[ne], C, f.children, b, _, F);
            "value" in D && o(I, "value", null, D.value), (O = D.onVnodeBeforeMount) && Je(O, b, f)
        }
        Re(I, f, f.scopeId, x, b), Q && Pt(f, null, b, "beforeMount");
        const oe = (!_ || _ && !_.pendingBranch) && M && !M.persisted;
        oe && M.beforeEnter(I), r(I, m, v), ((O = D && D.onVnodeMounted) || oe || Q) && Ce(() => {
            O && Je(O, b, f), oe && M.enter(I), Q && Pt(f, null, b, "mounted")
        }, _)
    }, Re = (f, m, v, b, _) => {
        if (v && p(f, v), b)
            for (let C = 0; C < b.length; C++) p(f, b[C]);
        if (_) {
            let C = _.subTree;
            if (m === C) {
                const x = _.vnode;
                Re(f, x, x.scopeId, x.slotScopeIds, _.parent)
            }
        }
    }, q = (f, m, v, b, _, C, x, P, I = 0) => {
        for (let O = I; O < f.length; O++) {
            const B = f[O] = P ? yt(f[O]) : Ze(f[O]);
            y(null, B, m, v, b, _, C, x, P)
        }
    }, ue = (f, m, v, b, _, C, x) => {
        const P = m.el = f.el;
        let {
            patchFlag: I,
            dynamicChildren: O,
            dirs: B
        } = m;
        I |= f.patchFlag & 16;
        const D = f.props || re,
            U = m.props || re;
        let M;
        v && Ct(v, !1), (M = U.onVnodeBeforeUpdate) && Je(M, v, m, f), B && Pt(m, f, v, "beforeUpdate"), v && Ct(v, !0);
        const Q = _ && m.type !== "foreignObject";
        if (O ? ie(f.dynamicChildren, O, P, v, b, Q, C) : x || te(f, m, P, null, v, b, Q, C, !1), I > 0) {
            if (I & 16) we(P, m, D, U, v, b, _);
            else if (I & 2 && D.class !== U.class && o(P, "class", null, U.class, _), I & 4 && o(P, "style", D.style, U.style, _), I & 8) {
                const oe = m.dynamicProps;
                for (let ne = 0; ne < oe.length; ne++) {
                    const de = oe[ne],
                        We = D[de],
                        qt = U[de];
                    (qt !== We || de === "value") && o(P, de, We, qt, _, f.children, v, b, F)
                }
            }
            I & 1 && f.children !== m.children && u(P, m.children)
        } else !x && O == null && we(P, m, D, U, v, b, _);
        ((M = U.onVnodeUpdated) || B) && Ce(() => {
            M && Je(M, v, m, f), B && Pt(m, f, v, "updated")
        }, b)
    }, ie = (f, m, v, b, _, C, x) => {
        for (let P = 0; P < m.length; P++) {
            const I = f[P],
                O = m[P],
                B = I.el && (I.type === le || !xt(I, O) || I.shapeFlag & 70) ? h(I.el) : v;
            y(I, O, B, null, b, _, C, x, !0)
        }
    }, we = (f, m, v, b, _, C, x) => {
        if (v !== b) {
            if (v !== re)
                for (const P in v) !Xn(P) && !(P in b) && o(f, P, v[P], null, x, m.children, _, C, F);
            for (const P in b) {
                if (Xn(P)) continue;
                const I = b[P],
                    O = v[P];
                I !== O && P !== "value" && o(f, P, O, I, x, m.children, _, C, F)
            }
            "value" in b && o(f, "value", v.value, b.value)
        }
    }, Ee = (f, m, v, b, _, C, x, P, I) => {
        const O = m.el = f ? f.el : c(""),
            B = m.anchor = f ? f.anchor : c("");
        let {
            patchFlag: D,
            dynamicChildren: U,
            slotScopeIds: M
        } = m;
        M && (P = P ? P.concat(M) : M), f == null ? (r(O, v, b), r(B, v, b), q(m.children, v, B, _, C, x, P, I)) : D > 0 && D & 64 && U && f.dynamicChildren ? (ie(f.dynamicChildren, U, v, _, C, x, P), (m.key != null || _ && m === _.subTree) && ea(f, m, !0)) : te(f, m, v, B, _, C, x, P, I)
    }, Me = (f, m, v, b, _, C, x, P, I) => {
        m.slotScopeIds = P, f == null ? m.shapeFlag & 512 ? _.ctx.activate(m, v, b, x, I) : st(m, v, b, _, C, x, I) : mn(f, m, I)
    }, st = (f, m, v, b, _, C, x) => {
        const P = f.component = Hl(f, b, _);
        if (Rr(f) && (P.ctx.renderer = G), ql(P), P.asyncDep) {
            if (_ && _.registerDep(P, fe), !f.el) {
                const I = P.subTree = ve($e);
                w(null, I, m, v)
            }
            return
        }
        fe(P, f, m, v, _, C, x)
    }, mn = (f, m, v) => {
        const b = m.component = f.component;
        if (Jc(f, m, v))
            if (b.asyncDep && !b.asyncResolved) {
                se(b, m, v);
                return
            } else b.next = m, qc(b.update), b.update();
        else m.el = f.el, b.vnode = m
    }, fe = (f, m, v, b, _, C, x) => {
        const P = () => {
                if (f.isMounted) {
                    let {
                        next: B,
                        bu: D,
                        u: U,
                        parent: M,
                        vnode: Q
                    } = f, oe = B, ne;
                    Ct(f, !1), B ? (B.el = Q.el, se(f, B, x)) : B = Q, D && Mr(D), (ne = B.props && B.props.onVnodeBeforeUpdate) && Je(ne, M, B, Q), Ct(f, !0);
                    const de = jr(f),
                        We = f.subTree;
                    f.subTree = de, y(We, de, h(We.el), N(We), f, _, C), B.el = de.el, oe === null && Xc(f, de.el), U && Ce(U, _), (ne = B.props && B.props.onVnodeUpdated) && Ce(() => Je(ne, M, B, Q), _)
                } else {
                    let B;
                    const {
                        el: D,
                        props: U
                    } = m, {
                        bm: M,
                        m: Q,
                        parent: oe
                    } = f, ne = er(m);
                    if (Ct(f, !1), M && Mr(M), !ne && (B = U && U.onVnodeBeforeMount) && Je(B, oe, m), Ct(f, !0), D && K) {
                        const de = () => {
                            f.subTree = jr(f), K(D, f.subTree, f, _, null)
                        };
                        ne ? m.type.__asyncLoader().then(() => !f.isUnmounted && de()) : de()
                    } else {
                        const de = f.subTree = jr(f);
                        y(null, de, v, b, f, _, C), m.el = de.el
                    }
                    if (Q && Ce(Q, _), !ne && (B = U && U.onVnodeMounted)) {
                        const de = m;
                        Ce(() => Je(B, oe, de), _)
                    }(m.shapeFlag & 256 || oe && er(oe.vnode) && oe.vnode.shapeFlag & 256) && f.a && Ce(f.a, _), f.isMounted = !0, m = v = b = null
                }
            },
            I = f.effect = new Rs(P, () => Ls(O), f.scope),
            O = f.update = () => I.run();
        O.id = f.uid, Ct(f, !0), O()
    }, se = (f, m, v) => {
        m.component = f;
        const b = f.vnode.props;
        f.vnode = m, f.next = null, Ol(f, m.props, b, v), Cl(f, m.children, v), on(), lo(), an()
    }, te = (f, m, v, b, _, C, x, P, I = !1) => {
        const O = f && f.children,
            B = f ? f.shapeFlag : 0,
            D = m.children,
            {
                patchFlag: U,
                shapeFlag: M
            } = m;
        if (U > 0) {
            if (U & 128) {
                Rt(O, D, v, b, _, C, x, P, I);
                return
            } else if (U & 256) {
                je(O, D, v, b, _, C, x, P, I);
                return
            }
        }
        M & 8 ? (B & 16 && F(O, _, C), D !== O && u(v, D)) : B & 16 ? M & 16 ? Rt(O, D, v, b, _, C, x, P, I) : F(O, _, C, !0) : (B & 8 && u(v, ""), M & 16 && q(D, v, b, _, C, x, P, I))
    }, je = (f, m, v, b, _, C, x, P, I) => {
        f = f || Vt, m = m || Vt;
        const O = f.length,
            B = m.length,
            D = Math.min(O, B);
        let U;
        for (U = 0; U < D; U++) {
            const M = m[U] = I ? yt(m[U]) : Ze(m[U]);
            y(f[U], M, v, null, _, C, x, P, I)
        }
        O > B ? F(f, _, C, !0, !1, D) : q(m, v, b, _, C, x, P, I, D)
    }, Rt = (f, m, v, b, _, C, x, P, I) => {
        let O = 0;
        const B = m.length;
        let D = f.length - 1,
            U = B - 1;
        for (; O <= D && O <= U;) {
            const M = f[O],
                Q = m[O] = I ? yt(m[O]) : Ze(m[O]);
            if (xt(M, Q)) y(M, Q, v, null, _, C, x, P, I);
            else break;
            O++
        }
        for (; O <= D && O <= U;) {
            const M = f[D],
                Q = m[U] = I ? yt(m[U]) : Ze(m[U]);
            if (xt(M, Q)) y(M, Q, v, null, _, C, x, P, I);
            else break;
            D--, U--
        }
        if (O > D) {
            if (O <= U) {
                const M = U + 1,
                    Q = M < B ? m[M].el : b;
                for (; O <= U;) y(null, m[O] = I ? yt(m[O]) : Ze(m[O]), v, Q, _, C, x, P, I), O++
            }
        } else if (O > U)
            for (; O <= D;) Pe(f[O], _, C, !0), O++;
        else {
            const M = O,
                Q = O,
                oe = new Map;
            for (O = Q; O <= U; O++) {
                const Ie = m[O] = I ? yt(m[O]) : Ze(m[O]);
                Ie.key != null && oe.set(Ie.key, O)
            }
            let ne, de = 0;
            const We = U - Q + 1;
            let qt = !1,
                Xs = 0;
            const gn = new Array(We);
            for (O = 0; O < We; O++) gn[O] = 0;
            for (O = M; O <= D; O++) {
                const Ie = f[O];
                if (de >= We) {
                    Pe(Ie, _, C, !0);
                    continue
                }
                let Ge;
                if (Ie.key != null) Ge = oe.get(Ie.key);
                else
                    for (ne = Q; ne <= U; ne++)
                        if (gn[ne - Q] === 0 && xt(Ie, m[ne])) {
                            Ge = ne;
                            break
                        }
                Ge === void 0 ? Pe(Ie, _, C, !0) : (gn[Ge - Q] = O + 1, Ge >= Xs ? Xs = Ge : qt = !0, y(Ie, m[Ge], v, null, _, C, x, P, I), de++)
            }
            const Zs = qt ? Ll(gn) : Vt;
            for (ne = Zs.length - 1, O = We - 1; O >= 0; O--) {
                const Ie = Q + O,
                    Ge = m[Ie],
                    eo = Ie + 1 < B ? m[Ie + 1].el : b;
                gn[O] === 0 ? y(null, Ge, v, eo, _, C, x, P, I) : qt && (ne < 0 || O !== Zs[ne] ? He(Ge, v, eo, 2) : ne--)
            }
        }
    }, He = (f, m, v, b, _ = null) => {
        const {
            el: C,
            type: x,
            transition: P,
            children: I,
            shapeFlag: O
        } = f;
        if (O & 6) {
            He(f.component.subTree, m, v, b);
            return
        }
        if (O & 128) {
            f.suspense.move(m, v, b);
            return
        }
        if (O & 64) {
            x.move(f, m, v, G);
            return
        }
        if (x === le) {
            r(C, m, v);
            for (let D = 0; D < I.length; D++) He(I[D], m, v, b);
            r(f.anchor, m, v);
            return
        }
        if (x === tr) {
            k(f, m, v);
            return
        }
        if (b !== 2 && O & 1 && P)
            if (b === 0) P.beforeEnter(C), r(C, m, v), Ce(() => P.enter(C), _);
            else {
                const {
                    leave: D,
                    delayLeave: U,
                    afterLeave: M
                } = P, Q = () => r(C, m, v), oe = () => {
                    D(C, () => {
                        Q(), M && M()
                    })
                };
                U ? U(C, Q, oe) : oe()
            }
        else r(C, m, v)
    }, Pe = (f, m, v, b = !1, _ = !1) => {
        const {
            type: C,
            props: x,
            ref: P,
            children: I,
            dynamicChildren: O,
            shapeFlag: B,
            patchFlag: D,
            dirs: U
        } = f;
        if (P != null && as(P, null, v, f, !0), B & 256) {
            m.ctx.deactivate(f);
            return
        }
        const M = B & 1 && U,
            Q = !er(f);
        let oe;
        if (Q && (oe = x && x.onVnodeBeforeUnmount) && Je(oe, m, f), B & 6) S(f.component, v, b);
        else {
            if (B & 128) {
                f.suspense.unmount(v, b);
                return
            }
            M && Pt(f, null, m, "beforeUnmount"), B & 64 ? f.type.remove(f, m, v, _, G, b) : O && (C !== le || D > 0 && D & 64) ? F(O, m, v, !1, !0) : (C === le && D & 384 || !_ && B & 16) && F(I, m, v), b && Wt(f)
        }(Q && (oe = x && x.onVnodeUnmounted) || M) && Ce(() => {
            oe && Je(oe, m, f), M && Pt(f, null, m, "unmounted")
        }, v)
    }, Wt = f => {
        const {
            type: m,
            el: v,
            anchor: b,
            transition: _
        } = f;
        if (m === le) {
            Kn(v, b);
            return
        }
        if (m === tr) {
            L(f);
            return
        }
        const C = () => {
            s(v), _ && !_.persisted && _.afterLeave && _.afterLeave()
        };
        if (f.shapeFlag & 1 && _ && !_.persisted) {
            const {
                leave: x,
                delayLeave: P
            } = _, I = () => x(v, C);
            P ? P(f.el, C, I) : I()
        } else C()
    }, Kn = (f, m) => {
        let v;
        for (; f !== m;) v = d(f), s(f), f = v;
        s(m)
    }, S = (f, m, v) => {
        const {
            bum: b,
            scope: _,
            update: C,
            subTree: x,
            um: P
        } = f;
        b && Mr(b), _.stop(), C && (C.active = !1, Pe(x, f, m, v)), P && Ce(P, m), Ce(() => {
            f.isUnmounted = !0
        }, m), m && m.pendingBranch && !m.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === m.pendingId && (m.deps--, m.deps === 0 && m.resolve())
    }, F = (f, m, v, b = !1, _ = !1, C = 0) => {
        for (let x = C; x < f.length; x++) Pe(f[x], m, v, b, _)
    }, N = f => f.shapeFlag & 6 ? N(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : d(f.anchor || f.el), Y = (f, m, v) => {
        f == null ? m._vnode && Pe(m._vnode, null, null, !0) : y(m._vnode || null, f, m, null, null, null, v), lo(), ki(), m._vnode = f
    }, G = {
        p: y,
        um: Pe,
        m: He,
        r: Wt,
        mt: st,
        mc: q,
        pc: te,
        pbc: ie,
        n: N,
        o: e
    };
    let ce, K;
    return t && ([ce, K] = t(G)), {
        render: Y,
        hydrate: ce,
        createApp: Il(Y, ce)
    }
}

function Ct({
    effect: e,
    update: t
}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function ea(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (j(r) && j(s))
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            let c = s[o];
            c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[o] = yt(s[o]), c.el = i.el), n || ea(i, c))
        }
}

function Ll(e) {
    const t = e.slice(),
        n = [0];
    let r, s, o, i, c;
    const a = e.length;
    for (r = 0; r < a; r++) {
        const l = e[r];
        if (l !== 0) {
            if (s = n[n.length - 1], e[s] < l) {
                t[r] = s, n.push(r);
                continue
            }
            for (o = 0, i = n.length - 1; o < i;) c = o + i >> 1, e[n[c]] < l ? o = c + 1 : i = c;
            l < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), n[o] = r)
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0;) n[o] = i, i = t[i];
    return n
}
const Fl = e => e.__isTeleport,
    le = Symbol(void 0),
    Ds = Symbol(void 0),
    $e = Symbol(void 0),
    tr = Symbol(void 0),
    Sn = [];
let Ke = null;

function z(e = !1) {
    Sn.push(Ke = e ? null : [])
}

function kl() {
    Sn.pop(), Ke = Sn[Sn.length - 1] || null
}
let Fn = 1;

function Eo(e) {
    Fn += e
}

function ta(e) {
    return e.dynamicChildren = Fn > 0 ? Ke || Vt : null, kl(), Fn > 0 && Ke && Ke.push(e), e
}

function $(e, t, n, r, s, o) {
    return ta(R(e, t, n, r, s, o, !0))
}

function Dl(e, t, n, r, s) {
    return ta(ve(e, t, n, r, s, !0))
}

function cs(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function xt(e, t) {
    return e.type === t.type && e.key === t.key
}
const Cr = "__vInternal",
    na = ({
        key: e
    }) => e != null ? e : null,
    nr = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => e != null ? ye(e) || ge(e) || H(e) ? {
        i: Ye,
        r: e,
        k: t,
        f: !!n
    } : e : null;

function R(e, t = null, n = null, r = 0, s = null, o = e === le ? 0 : 1, i = !1, c = !1) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && na(t),
        ref: t && nr(t),
        scopeId: Or,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null
    };
    return c ? (Ys(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= ye(n) ? 8 : 16), Fn > 0 && !i && Ke && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && Ke.push(a), a
}
const ve = Yl;

function Yl(e, t = null, n = null, r = 0, s = null, o = !1) {
    if ((!e || e === gl) && (e = $e), cs(e)) {
        const c = Ot(e, t, !0);
        return n && Ys(c, n), Fn > 0 && !o && Ke && (c.shapeFlag & 6 ? Ke[Ke.indexOf(e)] = c : Ke.push(c)), c.patchFlag |= -2, c
    }
    if (Vl(e) && (e = e.__vccOpts), t) {
        t = Bl(t);
        let {
            class: c,
            style: a
        } = t;
        c && !ye(c) && (t.class = bt(c)), ae(a) && (Oi(a) && !j(a) && (a = Se({}, a)), t.style = yr(a))
    }
    const i = ye(e) ? 1 : Zc(e) ? 128 : Fl(e) ? 64 : ae(e) ? 4 : H(e) ? 2 : 0;
    return R(e, t, n, r, s, i, o, !0)
}

function Bl(e) {
    return e ? Oi(e) || Cr in e ? Se({}, e) : e : null
}

function Ot(e, t, n = !1) {
    const {
        props: r,
        ref: s,
        patchFlag: o,
        children: i
    } = e, c = t ? Ul(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && na(c),
        ref: t && t.ref ? n && s ? j(s) ? s.concat(nr(t)) : [s, nr(t)] : nr(t) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== le ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Ot(e.ssContent),
        ssFallback: e.ssFallback && Ot(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    }
}

function en(e = " ", t = 0) {
    return ve(Ds, null, e, t)
}

function dt(e, t) {
    const n = ve(tr, null, e);
    return n.staticCount = t, n
}

function hr(e = "", t = !1) {
    return t ? (z(), Dl($e, null, e)) : ve($e, null, e)
}

function Ze(e) {
    return e == null || typeof e == "boolean" ? ve($e) : j(e) ? ve(le, null, e.slice()) : typeof e == "object" ? yt(e) : ve(Ds, null, String(e))
}

function yt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ot(e)
}

function Ys(e, t) {
    let n = 0;
    const {
        shapeFlag: r
    } = e;
    if (t == null) t = null;
    else if (j(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), Ys(e, s()), s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = t._;
            !s && !(Cr in t) ? t._ctx = Ye : s === 3 && Ye && (Ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else H(t) ? (t = {
        default: t,
        _ctx: Ye
    }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [en(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function Ul(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = bt([t.class, r.class]));
            else if (s === "style") t.style = yr([t.style, r.style]);
        else if (vr(s)) {
            const o = t[s],
                i = r[s];
            i && o !== i && !(j(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
        } else s !== "" && (t[s] = r[s])
    }
    return t
}

function Je(e, t, n, r = null) {
    Be(e, t, 7, [n, r])
}
const Ml = Zi();
let jl = 0;

function Hl(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || Ml,
        o = {
            uid: jl++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new lc(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(s.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Vi(r, s),
            emitsOptions: Yi(r, s),
            emit: null,
            emitted: null,
            propsDefaults: re,
            inheritAttrs: r.inheritAttrs,
            ctx: re,
            data: re,
            props: re,
            attrs: re,
            slots: re,
            refs: re,
            setupState: re,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return o.ctx = {
        _: o
    }, o.root = t ? t.root : o, o.emit = zc.bind(null, o), e.ce && e.ce(o), o
}
let me = null;
const Wl = () => me || Ye,
    tn = e => {
        me = e, e.scope.on()
    },
    Bt = () => {
        me && me.scope.off(), me = null
    };

function ra(e) {
    return e.vnode.shapeFlag & 4
}
let kn = !1;

function ql(e, t = !1) {
    kn = t;
    const {
        props: n,
        children: r
    } = e.vnode, s = ra(e);
    _l(e, n, s, t), Pl(e, r);
    const o = s ? Kl(e, t) : void 0;
    return kn = !1, o
}

function Kl(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = Ri(new Proxy(e.ctx, vl));
    const {
        setup: r
    } = n;
    if (r) {
        const s = e.setupContext = r.length > 1 ? zl(e) : null;
        tn(e), on();
        const o = At(r, e, 0, [e.props, s]);
        if (an(), Bt(), fi(o)) {
            if (o.then(Bt, Bt), t) return o.then(i => {
                Ao(e, i, t)
            }).catch(i => {
                Sr(i, e, 0)
            });
            e.asyncDep = o
        } else Ao(e, o, t)
    } else sa(e, t)
}

function Ao(e, t, n) {
    H(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) && (e.setupState = Ii(t)), sa(e, n)
}
let So;

function sa(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && So && !r.render) {
            const s = r.template || Fs(e).template;
            if (s) {
                const {
                    isCustomElement: o,
                    compilerOptions: i
                } = e.appContext.config, {
                    delimiters: c,
                    compilerOptions: a
                } = r, l = Se(Se({
                    isCustomElement: o,
                    delimiters: c
                }, i), a);
                r.render = So(s, l)
            }
        }
        e.render = r.render || Qe
    }
    tn(e), on(), bl(e), an(), Bt()
}

function Ql(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return xe(e, "get", "$attrs"), t[n]
        }
    })
}

function zl(e) {
    const t = r => {
        e.exposed = r || {}
    };
    let n;
    return {
        get attrs() {
            return n || (n = Ql(e))
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function Tr(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Ii(Ri(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in fr) return fr[n](e)
        }
    }))
}

function $l(e, t = !0) {
    return H(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Vl(e) {
    return H(e) && "__vccOpts" in e
}
const De = (e, t) => jc(e, t, kn);

function oa(e, t, n) {
    const r = arguments.length;
    return r === 2 ? ae(t) && !j(t) ? cs(t) ? ve(e, null, [t]) : ve(e, t) : ve(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && cs(n) && (n = [n]), ve(e, t, n))
}
const Gl = "3.2.40",
    Jl = "http://www.w3.org/2000/svg",
    Lt = typeof document != "undefined" ? document : null,
    _o = Lt && Lt.createElement("template"),
    Xl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const s = t ? Lt.createElementNS(Jl, e) : Lt.createElement(e, n ? {
                is: n
            } : void 0);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: e => Lt.createTextNode(e),
        createComment: e => Lt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => Lt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)););
            else {
                _o.innerHTML = r ? `<svg>${e}</svg>` : e;
                const c = _o.content;
                if (r) {
                    const a = c.firstChild;
                    for (; a.firstChild;) c.appendChild(a.firstChild);
                    c.removeChild(a)
                }
                t.insertBefore(c, n)
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };

function Zl(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function eu(e, t, n) {
    const r = e.style,
        s = ye(n);
    if (n && !s) {
        for (const o in n) ls(r, o, n[o]);
        if (t && !ye(t))
            for (const o in t) n[o] == null && ls(r, o, "")
    } else {
        const o = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = o)
    }
}
const Oo = /\s*!important$/;

function ls(e, t, n) {
    if (j(n)) n.forEach(r => ls(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const r = tu(e, t);
        Oo.test(n) ? e.setProperty(sn(r), n.replace(Oo, ""), "important") : e[r] = n
    }
}
const Ro = ["Webkit", "Moz", "ms"],
    Wr = {};

function tu(e, t) {
    const n = Wr[t];
    if (n) return n;
    let r = tt(t);
    if (r !== "filter" && r in e) return Wr[t] = r;
    r = Er(r);
    for (let s = 0; s < Ro.length; s++) {
        const o = Ro[s] + r;
        if (o in e) return Wr[t] = o
    }
    return t
}
const Po = "http://www.w3.org/1999/xlink";

function nu(e, t, n, r, s) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Po, t.slice(6, t.length)) : e.setAttributeNS(Po, t, n);
    else {
        const o = Ja(t);
        n == null || o && !ci(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n)
    }
}

function ru(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), e[t] = n == null ? "" : n;
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const a = n == null ? "" : n;
        (e.value !== a || e.tagName === "OPTION") && (e.value = a), n == null && e.removeAttribute(t);
        return
    }
    let c = !1;
    if (n === "" || n == null) {
        const a = typeof e[t];
        a === "boolean" ? n = ci(n) : n == null && a === "string" ? (n = "", c = !0) : a === "number" && (n = 0, c = !0)
    }
    try {
        e[t] = n
    } catch {}
    c && e.removeAttribute(t)
}
const [ia, su] = (() => {
    let e = Date.now,
        t = !1;
    if (typeof window != "undefined") {
        Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
        const n = navigator.userAgent.match(/firefox\/(\d+)/i);
        t = !!(n && Number(n[1]) <= 53)
    }
    return [e, t]
})();
let us = 0;
const ou = Promise.resolve(),
    iu = () => {
        us = 0
    },
    au = () => us || (ou.then(iu), us = ia());

function cu(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function lu(e, t, n, r) {
    e.removeEventListener(t, n, r)
}

function uu(e, t, n, r, s = null) {
    const o = e._vei || (e._vei = {}),
        i = o[t];
    if (r && i) i.value = r;
    else {
        const [c, a] = fu(t);
        if (r) {
            const l = o[t] = du(r, s);
            cu(e, c, l, a)
        } else i && (lu(e, c, i, a), o[t] = void 0)
    }
}
const Co = /(?:Once|Passive|Capture)$/;

function fu(e) {
    let t;
    if (Co.test(e)) {
        t = {};
        let r;
        for (; r = e.match(Co);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : sn(e.slice(2)), t]
}

function du(e, t) {
    const n = r => {
        const s = r.timeStamp || ia();
        (su || s >= n.attached - 1) && Be(hu(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = au(), n
}

function hu(e, t) {
    if (j(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
}
const To = /^on[a-z]/,
    pu = (e, t, n, r, s = !1, o, i, c, a) => {
        t === "class" ? Zl(e, r, s) : t === "style" ? eu(e, n, r) : vr(t) ? Es(t) || uu(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : mu(e, t, r, s)) ? ru(e, t, r, o, i, c, a) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), nu(e, t, r, s))
    };

function mu(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && To.test(t) && H(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || To.test(t) && ye(n) ? !1 : t in e
}
const gu = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
sl.props;
const Dn = {
    beforeMount(e, {
        value: t
    }, {
        transition: n
    }) {
        e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : yn(e, t)
    },
    mounted(e, {
        value: t
    }, {
        transition: n
    }) {
        n && t && n.enter(e)
    },
    updated(e, {
        value: t,
        oldValue: n
    }, {
        transition: r
    }) {
        !t != !n && (r ? t ? (r.beforeEnter(e), yn(e, !0), r.enter(e)) : r.leave(e, () => {
            yn(e, !1)
        }) : yn(e, t))
    },
    beforeUnmount(e, {
        value: t
    }) {
        yn(e, t)
    }
};

function yn(e, t) {
    e.style.display = t ? e._vod : "none"
}
const yu = Se({
    patchProp: pu
}, Xl);
let Io;

function vu() {
    return Io || (Io = Nl(yu))
}
const bu = (...e) => {
    const t = vu().createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = r => {
        const s = wu(r);
        if (!s) return;
        const o = t._component;
        !H(o) && !o.render && !o.template && (o.template = s.innerHTML), s.innerHTML = "";
        const i = n(s, !1, s instanceof SVGElement);
        return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i
    }, t
};

function wu(e) {
    return ye(e) ? document.querySelector(e) : e
}
var aa = "./assets/logo.d23e0f28.png",
    ca = "./assets/icon_google.6b418216.svg",
    la = "./assets/icon_mega.3379f3cf.svg";
/*!
 * vue-router v4.1.5
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */
const Qt = typeof window != "undefined";

function Eu(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const Z = Object.assign;

function qr(e, t) {
    const n = {};
    for (const r in t) {
        const s = t[r];
        n[r] = Ve(s) ? s.map(e) : e(s)
    }
    return n
}
const _n = () => {},
    Ve = Array.isArray,
    Au = /\/$/,
    Su = e => e.replace(Au, "");

function Kr(e, t, n = "/") {
    let r, s = {},
        o = "",
        i = "";
    const c = t.indexOf("#");
    let a = t.indexOf("?");
    return c < a && c >= 0 && (a = -1), a > -1 && (r = t.slice(0, a), o = t.slice(a + 1, c > -1 ? c : t.length), s = e(o)), c > -1 && (r = r || t.slice(0, c), i = t.slice(c, t.length)), r = Pu(r != null ? r : t, n), {
        fullPath: r + (o && "?") + o + i,
        path: r,
        query: s,
        hash: i
    }
}

function _u(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}

function No(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function Ou(e, t, n) {
    const r = t.matched.length - 1,
        s = n.matched.length - 1;
    return r > -1 && r === s && nn(t.matched[r], n.matched[s]) && ua(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}

function nn(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function ua(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e)
        if (!Ru(e[n], t[n])) return !1;
    return !0
}

function Ru(e, t) {
    return Ve(e) ? xo(e, t) : Ve(t) ? xo(t, e) : e === t
}

function xo(e, t) {
    return Ve(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}

function Pu(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
        r = e.split("/");
    let s = n.length - 1,
        o, i;
    for (o = 0; o < r.length; o++)
        if (i = r[o], i !== ".")
            if (i === "..") s > 1 && s--;
            else break;
    return n.slice(0, s).join("/") + "/" + r.slice(o - (o === r.length ? 1 : 0)).join("/")
}
var Yn;
(function(e) {
    e.pop = "pop", e.push = "push"
})(Yn || (Yn = {}));
var On;
(function(e) {
    e.back = "back", e.forward = "forward", e.unknown = ""
})(On || (On = {}));

function Cu(e) {
    if (!e)
        if (Qt) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Su(e)
}
const Tu = /^[^#]+#/;

function Iu(e, t) {
    return e.replace(Tu, "#") + t
}

function Nu(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        r = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0)
    }
}
const Ir = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
});

function xu(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            r = typeof n == "string" && n.startsWith("#"),
            s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s) return;
        t = Nu(s, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function Lo(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const fs = new Map;

function Lu(e, t) {
    fs.set(e, t)
}

function Fu(e) {
    const t = fs.get(e);
    return fs.delete(e), t
}
let ku = () => location.protocol + "//" + location.host;

function fa(e, t) {
    const {
        pathname: n,
        search: r,
        hash: s
    } = t, o = e.indexOf("#");
    if (o > -1) {
        let c = s.includes(e.slice(o)) ? e.slice(o).length : 1,
            a = s.slice(c);
        return a[0] !== "/" && (a = "/" + a), No(a, "")
    }
    return No(n, e) + r + s
}

function Du(e, t, n, r) {
    let s = [],
        o = [],
        i = null;
    const c = ({
        state: d
    }) => {
        const p = fa(e, location),
            g = n.value,
            y = t.value;
        let A = 0;
        if (d) {
            if (n.value = p, t.value = d, i && i === g) {
                i = null;
                return
            }
            A = y ? d.position - y.position : 0
        } else r(p);
        s.forEach(w => {
            w(n.value, g, {
                delta: A,
                type: Yn.pop,
                direction: A ? A > 0 ? On.forward : On.back : On.unknown
            })
        })
    };

    function a() {
        i = n.value
    }

    function l(d) {
        s.push(d);
        const p = () => {
            const g = s.indexOf(d);
            g > -1 && s.splice(g, 1)
        };
        return o.push(p), p
    }

    function u() {
        const {
            history: d
        } = window;
        !d.state || d.replaceState(Z({}, d.state, {
            scroll: Ir()
        }), "")
    }

    function h() {
        for (const d of o) d();
        o = [], window.removeEventListener("popstate", c), window.removeEventListener("beforeunload", u)
    }
    return window.addEventListener("popstate", c), window.addEventListener("beforeunload", u), {
        pauseListeners: a,
        listen: l,
        destroy: h
    }
}

function Fo(e, t, n, r = !1, s = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: s ? Ir() : null
    }
}

function Yu(e) {
    const {
        history: t,
        location: n
    } = window, r = {
        value: fa(e, n)
    }, s = {
        value: t.state
    };
    s.value || o(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);

    function o(a, l, u) {
        const h = e.indexOf("#"),
            d = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + a : ku() + e + a;
        try {
            t[u ? "replaceState" : "pushState"](l, "", d), s.value = l
        } catch (p) {
            console.error(p), n[u ? "replace" : "assign"](d)
        }
    }

    function i(a, l) {
        const u = Z({}, t.state, Fo(s.value.back, a, s.value.forward, !0), l, {
            position: s.value.position
        });
        o(a, u, !0), r.value = a
    }

    function c(a, l) {
        const u = Z({}, s.value, t.state, {
            forward: a,
            scroll: Ir()
        });
        o(u.current, u, !0);
        const h = Z({}, Fo(r.value, a, null), {
            position: u.position + 1
        }, l);
        o(a, h, !1), r.value = a
    }
    return {
        location: r,
        state: s,
        push: c,
        replace: i
    }
}

function Bu(e) {
    e = Cu(e);
    const t = Yu(e),
        n = Du(e, t.state, t.location, t.replace);

    function r(o, i = !0) {
        i || n.pauseListeners(), history.go(o)
    }
    const s = Z({
        location: "",
        base: e,
        go: r,
        createHref: Iu.bind(null, e)
    }, t, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(s, "state", {
        enumerable: !0,
        get: () => t.state.value
    }), s
}

function Uu(e) {
    return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Bu(e)
}

function Mu(e) {
    return typeof e == "string" || e && typeof e == "object"
}

function da(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const mt = {
        path: "/",
        name: void 0,
        params: {},
        query: {},
        hash: "",
        fullPath: "/",
        matched: [],
        meta: {},
        redirectedFrom: void 0
    },
    ha = Symbol("");
var ko;
(function(e) {
    e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(ko || (ko = {}));

function rn(e, t) {
    return Z(new Error, {
        type: e,
        [ha]: !0
    }, t)
}

function ot(e, t) {
    return e instanceof Error && ha in e && (t == null || !!(e.type & t))
}
const Do = "[^/]+?",
    ju = {
        sensitive: !1,
        strict: !1,
        start: !0,
        end: !0
    },
    Hu = /[.+*?^${}()[\]/\\]/g;

function Wu(e, t) {
    const n = Z({}, ju, t),
        r = [];
    let s = n.start ? "^" : "";
    const o = [];
    for (const l of e) {
        const u = l.length ? [] : [90];
        n.strict && !l.length && (s += "/");
        for (let h = 0; h < l.length; h++) {
            const d = l[h];
            let p = 40 + (n.sensitive ? .25 : 0);
            if (d.type === 0) h || (s += "/"), s += d.value.replace(Hu, "\\$&"), p += 40;
            else if (d.type === 1) {
                const {
                    value: g,
                    repeatable: y,
                    optional: A,
                    regexp: w
                } = d;
                o.push({
                    name: g,
                    repeatable: y,
                    optional: A
                });
                const T = w || Do;
                if (T !== Do) {
                    p += 10;
                    try {
                        new RegExp(`(${T})`)
                    } catch (L) {
                        throw new Error(`Invalid custom RegExp for param "${g}" (${T}): ` + L.message)
                    }
                }
                let k = y ? `((?:${T})(?:/(?:${T}))*)` : `(${T})`;
                h || (k = A && l.length < 2 ? `(?:/${k})` : "/" + k), A && (k += "?"), s += k, p += 20, A && (p += -8), y && (p += -20), T === ".*" && (p += -50)
            }
            u.push(p)
        }
        r.push(u)
    }
    if (n.strict && n.end) {
        const l = r.length - 1;
        r[l][r[l].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const i = new RegExp(s, n.sensitive ? "" : "i");

    function c(l) {
        const u = l.match(i),
            h = {};
        if (!u) return null;
        for (let d = 1; d < u.length; d++) {
            const p = u[d] || "",
                g = o[d - 1];
            h[g.name] = p && g.repeatable ? p.split("/") : p
        }
        return h
    }

    function a(l) {
        let u = "",
            h = !1;
        for (const d of e) {
            (!h || !u.endsWith("/")) && (u += "/"), h = !1;
            for (const p of d)
                if (p.type === 0) u += p.value;
                else if (p.type === 1) {
                const {
                    value: g,
                    repeatable: y,
                    optional: A
                } = p, w = g in l ? l[g] : "";
                if (Ve(w) && !y) throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);
                const T = Ve(w) ? w.join("/") : w;
                if (!T)
                    if (A) d.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : h = !0);
                    else throw new Error(`Missing required param "${g}"`);
                u += T
            }
        }
        return u || "/"
    }
    return {
        re: i,
        score: r,
        keys: o,
        parse: c,
        stringify: a
    }
}

function qu(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const r = t[n] - e[n];
        if (r) return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}

function Ku(e, t) {
    let n = 0;
    const r = e.score,
        s = t.score;
    for (; n < r.length && n < s.length;) {
        const o = qu(r[n], s[n]);
        if (o) return o;
        n++
    }
    if (Math.abs(s.length - r.length) === 1) {
        if (Yo(r)) return 1;
        if (Yo(s)) return -1
    }
    return s.length - r.length
}

function Yo(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const Qu = {
        type: 0,
        value: ""
    },
    zu = /[a-zA-Z0-9_]/;

function $u(e) {
    if (!e) return [
        []
    ];
    if (e === "/") return [
        [Qu]
    ];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

    function t(p) {
        throw new Error(`ERR (${n})/"${l}": ${p}`)
    }
    let n = 0,
        r = n;
    const s = [];
    let o;

    function i() {
        o && s.push(o), o = []
    }
    let c = 0,
        a, l = "",
        u = "";

    function h() {
        !l || (n === 0 ? o.push({
            type: 0,
            value: l
        }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (a === "*" || a === "+") && t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`), o.push({
            type: 1,
            value: l,
            regexp: u,
            repeatable: a === "*" || a === "+",
            optional: a === "*" || a === "?"
        })) : t("Invalid state to consume buffer"), l = "")
    }

    function d() {
        l += a
    }
    for (; c < e.length;) {
        if (a = e[c++], a === "\\" && n !== 2) {
            r = n, n = 4;
            continue
        }
        switch (n) {
            case 0:
                a === "/" ? (l && h(), i()) : a === ":" ? (h(), n = 1) : d();
                break;
            case 4:
                d(), n = r;
                break;
            case 1:
                a === "(" ? n = 2 : zu.test(a) ? d() : (h(), n = 0, a !== "*" && a !== "?" && a !== "+" && c--);
                break;
            case 2:
                a === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + a : n = 3 : u += a;
                break;
            case 3:
                h(), n = 0, a !== "*" && a !== "?" && a !== "+" && c--, u = "";
                break;
            default:
                t("Unknown state");
                break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${l}"`), h(), i(), s
}

function Vu(e, t, n) {
    const r = Wu($u(e.path), n),
        s = Z(r, {
            record: e,
            parent: t,
            children: [],
            alias: []
        });
    return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s
}

function Gu(e, t) {
    const n = [],
        r = new Map;
    t = Mo({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);

    function s(u) {
        return r.get(u)
    }

    function o(u, h, d) {
        const p = !d,
            g = Ju(u);
        g.aliasOf = d && d.record;
        const y = Mo(t, u),
            A = [g];
        if ("alias" in u) {
            const k = typeof u.alias == "string" ? [u.alias] : u.alias;
            for (const L of k) A.push(Z({}, g, {
                components: d ? d.record.components : g.components,
                path: L,
                aliasOf: d ? d.record : g
            }))
        }
        let w, T;
        for (const k of A) {
            const {
                path: L
            } = k;
            if (h && L[0] !== "/") {
                const W = h.record.path,
                    ee = W[W.length - 1] === "/" ? "" : "/";
                k.path = h.record.path + (L && ee + L)
            }
            if (w = Vu(k, h, y), d ? d.alias.push(w) : (T = T || w, T !== w && T.alias.push(w), p && u.name && !Uo(w) && i(u.name)), g.children) {
                const W = g.children;
                for (let ee = 0; ee < W.length; ee++) o(W[ee], w, d && d.children[ee])
            }
            d = d || w, a(w)
        }
        return T ? () => {
            i(T)
        } : _n
    }

    function i(u) {
        if (da(u)) {
            const h = r.get(u);
            h && (r.delete(u), n.splice(n.indexOf(h), 1), h.children.forEach(i), h.alias.forEach(i))
        } else {
            const h = n.indexOf(u);
            h > -1 && (n.splice(h, 1), u.record.name && r.delete(u.record.name), u.children.forEach(i), u.alias.forEach(i))
        }
    }

    function c() {
        return n
    }

    function a(u) {
        let h = 0;
        for (; h < n.length && Ku(u, n[h]) >= 0 && (u.record.path !== n[h].record.path || !pa(u, n[h]));) h++;
        n.splice(h, 0, u), u.record.name && !Uo(u) && r.set(u.record.name, u)
    }

    function l(u, h) {
        let d, p = {},
            g, y;
        if ("name" in u && u.name) {
            if (d = r.get(u.name), !d) throw rn(1, {
                location: u
            });
            y = d.record.name, p = Z(Bo(h.params, d.keys.filter(T => !T.optional).map(T => T.name)), u.params && Bo(u.params, d.keys.map(T => T.name))), g = d.stringify(p)
        } else if ("path" in u) g = u.path, d = n.find(T => T.re.test(g)), d && (p = d.parse(g), y = d.record.name);
        else {
            if (d = h.name ? r.get(h.name) : n.find(T => T.re.test(h.path)), !d) throw rn(1, {
                location: u,
                currentLocation: h
            });
            y = d.record.name, p = Z({}, h.params, u.params), g = d.stringify(p)
        }
        const A = [];
        let w = d;
        for (; w;) A.unshift(w.record), w = w.parent;
        return {
            name: y,
            path: g,
            params: p,
            matched: A,
            meta: Zu(A)
        }
    }
    return e.forEach(u => o(u)), {
        addRoute: o,
        resolve: l,
        removeRoute: i,
        getRoutes: c,
        getRecordMatcher: s
    }
}

function Bo(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n
}

function Ju(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Xu(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}

function Xu(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else
        for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
    return t
}

function Uo(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function Zu(e) {
    return e.reduce((t, n) => Z(t, n.meta), {})
}

function Mo(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n
}

function pa(e, t) {
    return t.children.some(n => n === e || pa(e, n))
}
const ma = /#/g,
    ef = /&/g,
    tf = /\//g,
    nf = /=/g,
    rf = /\?/g,
    ga = /\+/g,
    sf = /%5B/g,
    of = /%5D/g,
    ya = /%5E/g,
    af = /%60/g,
    va = /%7B/g,
    cf = /%7C/g,
    ba = /%7D/g,
    lf = /%20/g;

function Bs(e) {
    return encodeURI("" + e).replace(cf, "|").replace(sf, "[").replace( of , "]")
}

function uf(e) {
    return Bs(e).replace(va, "{").replace(ba, "}").replace(ya, "^")
}

function ds(e) {
    return Bs(e).replace(ga, "%2B").replace(lf, "+").replace(ma, "%23").replace(ef, "%26").replace(af, "`").replace(va, "{").replace(ba, "}").replace(ya, "^")
}

function ff(e) {
    return ds(e).replace(nf, "%3D")
}

function df(e) {
    return Bs(e).replace(ma, "%23").replace(rf, "%3F")
}

function hf(e) {
    return e == null ? "" : df(e).replace(tf, "%2F")
}

function pr(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}

function pf(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let s = 0; s < r.length; ++s) {
        const o = r[s].replace(ga, " "),
            i = o.indexOf("="),
            c = pr(i < 0 ? o : o.slice(0, i)),
            a = i < 0 ? null : pr(o.slice(i + 1));
        if (c in t) {
            let l = t[c];
            Ve(l) || (l = t[c] = [l]), l.push(a)
        } else t[c] = a
    }
    return t
}

function jo(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = ff(n), r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }(Ve(r) ? r.map(o => o && ds(o)) : [r && ds(r)]).forEach(o => {
            o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o))
        })
    }
    return t
}

function mf(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = Ve(r) ? r.map(s => s == null ? null : "" + s) : r == null ? r : "" + r)
    }
    return t
}
const gf = Symbol(""),
    Ho = Symbol(""),
    Nr = Symbol(""),
    wa = Symbol(""),
    hs = Symbol("");

function vn() {
    let e = [];

    function t(r) {
        return e.push(r), () => {
            const s = e.indexOf(r);
            s > -1 && e.splice(s, 1)
        }
    }

    function n() {
        e = []
    }
    return {
        add: t,
        list: () => e,
        reset: n
    }
}

function vt(e, t, n, r, s) {
    const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
    return () => new Promise((i, c) => {
        const a = h => {
                h === !1 ? c(rn(4, {
                    from: n,
                    to: t
                })) : h instanceof Error ? c(h) : Mu(h) ? c(rn(2, {
                    from: t,
                    to: h
                })) : (o && r.enterCallbacks[s] === o && typeof h == "function" && o.push(h), i())
            },
            l = e.call(r && r.instances[s], t, n, a);
        let u = Promise.resolve(l);
        e.length < 3 && (u = u.then(a)), u.catch(h => c(h))
    })
}

function Qr(e, t, n, r) {
    const s = [];
    for (const o of e)
        for (const i in o.components) {
            let c = o.components[i];
            if (!(t !== "beforeRouteEnter" && !o.instances[i]))
                if (yf(c)) {
                    const l = (c.__vccOpts || c)[t];
                    l && s.push(vt(l, n, r, o, i))
                } else {
                    let a = c();
                    s.push(() => a.then(l => {
                        if (!l) return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`));
                        const u = Eu(l) ? l.default : l;
                        o.components[i] = u;
                        const d = (u.__vccOpts || u)[t];
                        return d && vt(d, n, r, o, i)()
                    }))
                }
        }
    return s
}

function yf(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function Wo(e) {
    const t = ze(Nr),
        n = ze(wa),
        r = De(() => t.resolve(Oe(e.to))),
        s = De(() => {
            const {
                matched: a
            } = r.value, {
                length: l
            } = a, u = a[l - 1], h = n.matched;
            if (!u || !h.length) return -1;
            const d = h.findIndex(nn.bind(null, u));
            if (d > -1) return d;
            const p = qo(a[l - 2]);
            return l > 1 && qo(u) === p && h[h.length - 1].path !== p ? h.findIndex(nn.bind(null, a[l - 2])) : d
        }),
        o = De(() => s.value > -1 && Ef(n.params, r.value.params)),
        i = De(() => s.value > -1 && s.value === n.matched.length - 1 && ua(n.params, r.value.params));

    function c(a = {}) {
        return wf(a) ? t[Oe(e.replace) ? "replace" : "push"](Oe(e.to)).catch(_n) : Promise.resolve()
    }
    return {
        route: r,
        href: De(() => r.value.href),
        isActive: o,
        isExactActive: i,
        navigate: c
    }
}
const vf = jn({
        name: "RouterLink",
        compatConfig: {
            MODE: 3
        },
        props: {
            to: {
                type: [String, Object],
                required: !0
            },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: {
                type: String,
                default: "page"
            }
        },
        useLink: Wo,
        setup(e, {
            slots: t
        }) {
            const n = cn(Wo(e)),
                {
                    options: r
                } = ze(Nr),
                s = De(() => ({
                    [Ko(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
                    [Ko(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
                }));
            return () => {
                const o = t.default && t.default(n);
                return e.custom ? o : oa("a", {
                    "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                    href: n.href,
                    onClick: n.navigate,
                    class: s.value
                }, o)
            }
        }
    }),
    bf = vf;

function wf(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return
        }
        return e.preventDefault && e.preventDefault(), !0
    }
}

function Ef(e, t) {
    for (const n in t) {
        const r = t[n],
            s = e[n];
        if (typeof r == "string") {
            if (r !== s) return !1
        } else if (!Ve(s) || s.length !== r.length || r.some((o, i) => o !== s[i])) return !1
    }
    return !0
}

function qo(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Ko = (e, t, n) => e != null ? e : t != null ? t : n,
    Af = jn({
        name: "RouterView",
        inheritAttrs: !1,
        props: {
            name: {
                type: String,
                default: "default"
            },
            route: Object
        },
        compatConfig: {
            MODE: 3
        },
        setup(e, {
            attrs: t,
            slots: n
        }) {
            const r = ze(hs),
                s = De(() => e.route || r.value),
                o = ze(Ho, 0),
                i = De(() => {
                    let l = Oe(o);
                    const {
                        matched: u
                    } = s.value;
                    let h;
                    for (;
                        (h = u[l]) && !h.components;) l++;
                    return l
                }),
                c = De(() => s.value.matched[i.value]);
            An(Ho, De(() => i.value + 1)), An(gf, c), An(hs, s);
            const a = Et();
            return Zn(() => [a.value, c.value, e.name], ([l, u, h], [d, p, g]) => {
                u && (u.instances[h] = l, p && p !== u && l && l === d && (u.leaveGuards.size || (u.leaveGuards = p.leaveGuards), u.updateGuards.size || (u.updateGuards = p.updateGuards))), l && u && (!p || !nn(u, p) || !d) && (u.enterCallbacks[h] || []).forEach(y => y(l))
            }, {
                flush: "post"
            }), () => {
                const l = s.value,
                    u = e.name,
                    h = c.value,
                    d = h && h.components[u];
                if (!d) return Qo(n.default, {
                    Component: d,
                    route: l
                });
                const p = h.props[u],
                    g = p ? p === !0 ? l.params : typeof p == "function" ? p(l) : p : null,
                    A = oa(d, Z({}, g, t, {
                        onVnodeUnmounted: w => {
                            w.component.isUnmounted && (h.instances[u] = null)
                        },
                        ref: a
                    }));
                return Qo(n.default, {
                    Component: A,
                    route: l
                }) || A
            }
        }
    });

function Qo(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const Sf = Af;

function _f(e) {
    const t = Gu(e.routes, e),
        n = e.parseQuery || pf,
        r = e.stringifyQuery || jo,
        s = e.history,
        o = vn(),
        i = vn(),
        c = vn(),
        a = Yc(mt);
    let l = mt;
    Qt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = qr.bind(null, S => "" + S),
        h = qr.bind(null, hf),
        d = qr.bind(null, pr);

    function p(S, F) {
        let N, Y;
        return da(S) ? (N = t.getRecordMatcher(S), Y = F) : Y = S, t.addRoute(Y, N)
    }

    function g(S) {
        const F = t.getRecordMatcher(S);
        F && t.removeRoute(F)
    }

    function y() {
        return t.getRoutes().map(S => S.record)
    }

    function A(S) {
        return !!t.getRecordMatcher(S)
    }

    function w(S, F) {
        if (F = Z({}, F || a.value), typeof S == "string") {
            const f = Kr(n, S, F.path),
                m = t.resolve({
                    path: f.path
                }, F),
                v = s.createHref(f.fullPath);
            return Z(f, m, {
                params: d(m.params),
                hash: pr(f.hash),
                redirectedFrom: void 0,
                href: v
            })
        }
        let N;
        if ("path" in S) N = Z({}, S, {
            path: Kr(n, S.path, F.path).path
        });
        else {
            const f = Z({}, S.params);
            for (const m in f) f[m] == null && delete f[m];
            N = Z({}, S, {
                params: h(S.params)
            }), F.params = h(F.params)
        }
        const Y = t.resolve(N, F),
            G = S.hash || "";
        Y.params = u(d(Y.params));
        const ce = _u(r, Z({}, S, {
                hash: uf(G),
                path: Y.path
            })),
            K = s.createHref(ce);
        return Z({
            fullPath: ce,
            hash: G,
            query: r === jo ? mf(S.query) : S.query || {}
        }, Y, {
            redirectedFrom: void 0,
            href: K
        })
    }

    function T(S) {
        return typeof S == "string" ? Kr(n, S, a.value.path) : Z({}, S)
    }

    function k(S, F) {
        if (l !== S) return rn(8, {
            from: F,
            to: S
        })
    }

    function L(S) {
        return Re(S)
    }

    function W(S) {
        return L(Z(T(S), {
            replace: !0
        }))
    }

    function ee(S) {
        const F = S.matched[S.matched.length - 1];
        if (F && F.redirect) {
            const {
                redirect: N
            } = F;
            let Y = typeof N == "function" ? N(S) : N;
            return typeof Y == "string" && (Y = Y.includes("?") || Y.includes("#") ? Y = T(Y) : {
                path: Y
            }, Y.params = {}), Z({
                query: S.query,
                hash: S.hash,
                params: "path" in Y ? {} : S.params
            }, Y)
        }
    }

    function Re(S, F) {
        const N = l = w(S),
            Y = a.value,
            G = S.state,
            ce = S.force,
            K = S.replace === !0,
            f = ee(N);
        if (f) return Re(Z(T(f), {
            state: typeof f == "object" ? Z({}, G, f.state) : G,
            force: ce,
            replace: K
        }), F || N);
        const m = N;
        m.redirectedFrom = F;
        let v;
        return !ce && Ou(r, Y, N) && (v = rn(16, {
            to: m,
            from: Y
        }), Rt(Y, Y, !0, !1)), (v ? Promise.resolve(v) : ue(m, Y)).catch(b => ot(b) ? ot(b, 2) ? b : je(b) : se(b, m, Y)).then(b => {
            if (b) {
                if (ot(b, 2)) return Re(Z({
                    replace: K
                }, T(b.to), {
                    state: typeof b.to == "object" ? Z({}, G, b.to.state) : G,
                    force: ce
                }), F || m)
            } else b = we(m, Y, !0, K, G);
            return ie(m, Y, b), b
        })
    }

    function q(S, F) {
        const N = k(S, F);
        return N ? Promise.reject(N) : Promise.resolve()
    }

    function ue(S, F) {
        let N;
        const [Y, G, ce] = Of(S, F);
        N = Qr(Y.reverse(), "beforeRouteLeave", S, F);
        for (const f of Y) f.leaveGuards.forEach(m => {
            N.push(vt(m, S, F))
        });
        const K = q.bind(null, S, F);
        return N.push(K), Kt(N).then(() => {
            N = [];
            for (const f of o.list()) N.push(vt(f, S, F));
            return N.push(K), Kt(N)
        }).then(() => {
            N = Qr(G, "beforeRouteUpdate", S, F);
            for (const f of G) f.updateGuards.forEach(m => {
                N.push(vt(m, S, F))
            });
            return N.push(K), Kt(N)
        }).then(() => {
            N = [];
            for (const f of S.matched)
                if (f.beforeEnter && !F.matched.includes(f))
                    if (Ve(f.beforeEnter))
                        for (const m of f.beforeEnter) N.push(vt(m, S, F));
                    else N.push(vt(f.beforeEnter, S, F));
            return N.push(K), Kt(N)
        }).then(() => (S.matched.forEach(f => f.enterCallbacks = {}), N = Qr(ce, "beforeRouteEnter", S, F), N.push(K), Kt(N))).then(() => {
            N = [];
            for (const f of i.list()) N.push(vt(f, S, F));
            return N.push(K), Kt(N)
        }).catch(f => ot(f, 8) ? f : Promise.reject(f))
    }

    function ie(S, F, N) {
        for (const Y of c.list()) Y(S, F, N)
    }

    function we(S, F, N, Y, G) {
        const ce = k(S, F);
        if (ce) return ce;
        const K = F === mt,
            f = Qt ? history.state : {};
        N && (Y || K ? s.replace(S.fullPath, Z({
            scroll: K && f && f.scroll
        }, G)) : s.push(S.fullPath, G)), a.value = S, Rt(S, F, N, K), je()
    }
    let Ee;

    function Me() {
        Ee || (Ee = s.listen((S, F, N) => {
            if (!Kn.listening) return;
            const Y = w(S),
                G = ee(Y);
            if (G) {
                Re(Z(G, {
                    replace: !0
                }), Y).catch(_n);
                return
            }
            l = Y;
            const ce = a.value;
            Qt && Lu(Lo(ce.fullPath, N.delta), Ir()), ue(Y, ce).catch(K => ot(K, 12) ? K : ot(K, 2) ? (Re(K.to, Y).then(f => {
                ot(f, 20) && !N.delta && N.type === Yn.pop && s.go(-1, !1)
            }).catch(_n), Promise.reject()) : (N.delta && s.go(-N.delta, !1), se(K, Y, ce))).then(K => {
                K = K || we(Y, ce, !1), K && (N.delta && !ot(K, 8) ? s.go(-N.delta, !1) : N.type === Yn.pop && ot(K, 20) && s.go(-1, !1)), ie(Y, ce, K)
            }).catch(_n)
        }))
    }
    let st = vn(),
        mn = vn(),
        fe;

    function se(S, F, N) {
        je(S);
        const Y = mn.list();
        return Y.length ? Y.forEach(G => G(S, F, N)) : console.error(S), Promise.reject(S)
    }

    function te() {
        return fe && a.value !== mt ? Promise.resolve() : new Promise((S, F) => {
            st.add([S, F])
        })
    }

    function je(S) {
        return fe || (fe = !S, Me(), st.list().forEach(([F, N]) => S ? N(S) : F()), st.reset()), S
    }

    function Rt(S, F, N, Y) {
        const {
            scrollBehavior: G
        } = e;
        if (!Qt || !G) return Promise.resolve();
        const ce = !N && Fu(Lo(S.fullPath, 0)) || (Y || !N) && history.state && history.state.scroll || null;
        return Li().then(() => G(S, F, ce)).then(K => K && xu(K)).catch(K => se(K, S, F))
    }
    const He = S => s.go(S);
    let Pe;
    const Wt = new Set,
        Kn = {
            currentRoute: a,
            listening: !0,
            addRoute: p,
            removeRoute: g,
            hasRoute: A,
            getRoutes: y,
            resolve: w,
            options: e,
            push: L,
            replace: W,
            go: He,
            back: () => He(-1),
            forward: () => He(1),
            beforeEach: o.add,
            beforeResolve: i.add,
            afterEach: c.add,
            onError: mn.add,
            isReady: te,
            install(S) {
                const F = this;
                S.component("RouterLink", bf), S.component("RouterView", Sf), S.config.globalProperties.$router = F, Object.defineProperty(S.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => Oe(a)
                }), Qt && !Pe && a.value === mt && (Pe = !0, L(s.location).catch(G => {}));
                const N = {};
                for (const G in mt) N[G] = De(() => a.value[G]);
                S.provide(Nr, F), S.provide(wa, cn(N)), S.provide(hs, a);
                const Y = S.unmount;
                Wt.add(S), S.unmount = function() {
                    Wt.delete(S), Wt.size < 1 && (l = mt, Ee && Ee(), Ee = null, a.value = mt, Pe = !1, fe = !1), Y()
                }
            }
        };
    return Kn
}

function Kt(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve())
}

function Of(e, t) {
    const n = [],
        r = [],
        s = [],
        o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const c = t.matched[i];
        c && (e.matched.find(l => nn(l, c)) ? r.push(c) : n.push(c));
        const a = e.matched[i];
        a && (t.matched.find(l => nn(l, a)) || s.push(a))
    }
    return [n, r, s]
}

function Us() {
    return ze(Nr)
}
const Ms = Symbol.for("yaml.alias"),
    Rf = Symbol.for("yaml.document"),
    Ut = Symbol.for("yaml.map"),
    Ea = Symbol.for("yaml.pair"),
    js = Symbol.for("yaml.scalar"),
    Hn = Symbol.for("yaml.seq"),
    nt = Symbol.for("yaml.node.type"),
    ln = e => !!e && typeof e == "object" && e[nt] === Ms,
    Hs = e => !!e && typeof e == "object" && e[nt] === Rf,
    Aa = e => !!e && typeof e == "object" && e[nt] === Ut,
    be = e => !!e && typeof e == "object" && e[nt] === Ea,
    pe = e => !!e && typeof e == "object" && e[nt] === js,
    Ws = e => !!e && typeof e == "object" && e[nt] === Hn;

function Ne(e) {
    if (e && typeof e == "object") switch (e[nt]) {
        case Ut:
        case Hn:
            return !0
    }
    return !1
}

function Te(e) {
    if (e && typeof e == "object") switch (e[nt]) {
        case Ms:
        case Ut:
        case js:
        case Hn:
            return !0
    }
    return !1
}
const Pf = e => (pe(e) || Ne(e)) && !!e.anchor;
class qs {
    constructor(t) {
        Object.defineProperty(this, nt, {
            value: t
        })
    }
    clone() {
        const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        return this.range && (t.range = this.range.slice()), t
    }
}
const It = Symbol("break visit"),
    Cf = Symbol("skip children"),
    Rn = Symbol("remove node");

function Bn(e, t) {
    const n = Tf(t);
    Hs(e) ? $t(null, e.contents, n, Object.freeze([e])) === Rn && (e.contents = null) : $t(null, e, n, Object.freeze([]))
}
Bn.BREAK = It;
Bn.SKIP = Cf;
Bn.REMOVE = Rn;

function $t(e, t, n, r) {
    const s = If(e, t, n, r);
    if (Te(s) || be(s)) return Nf(e, r, s), $t(e, s, n, r);
    if (typeof s != "symbol") {
        if (Ne(t)) {
            r = Object.freeze(r.concat(t));
            for (let o = 0; o < t.items.length; ++o) {
                const i = $t(o, t.items[o], n, r);
                if (typeof i == "number") o = i - 1;
                else {
                    if (i === It) return It;
                    i === Rn && (t.items.splice(o, 1), o -= 1)
                }
            }
        } else if (be(t)) {
            r = Object.freeze(r.concat(t));
            const o = $t("key", t.key, n, r);
            if (o === It) return It;
            o === Rn && (t.key = null);
            const i = $t("value", t.value, n, r);
            if (i === It) return It;
            i === Rn && (t.value = null)
        }
    }
    return s
}

function Tf(e) {
    return typeof e == "object" && (e.Collection || e.Node || e.Value) ? Object.assign({
        Alias: e.Node,
        Map: e.Node,
        Scalar: e.Node,
        Seq: e.Node
    }, e.Value && {
        Map: e.Value,
        Scalar: e.Value,
        Seq: e.Value
    }, e.Collection && {
        Map: e.Collection,
        Seq: e.Collection
    }, e) : e
}

function If(e, t, n, r) {
    var s, o, i, c, a;
    if (typeof n == "function") return n(e, t, r);
    if (Aa(t)) return (s = n.Map) == null ? void 0 : s.call(n, e, t, r);
    if (Ws(t)) return (o = n.Seq) == null ? void 0 : o.call(n, e, t, r);
    if (be(t)) return (i = n.Pair) == null ? void 0 : i.call(n, e, t, r);
    if (pe(t)) return (c = n.Scalar) == null ? void 0 : c.call(n, e, t, r);
    if (ln(t)) return (a = n.Alias) == null ? void 0 : a.call(n, e, t, r)
}

function Nf(e, t, n) {
    const r = t[t.length - 1];
    if (Ne(r)) r.items[e] = n;
    else if (be(r)) e === "key" ? r.key = n : r.value = n;
    else if (Hs(r)) r.contents = n;
    else {
        const s = ln(r) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${s} parent`)
    }
}

function Sa(e) {
    if (/[\x00-\x19\s,[\]{}]/.test(e)) {
        const n = `Anchor must not contain whitespace or control characters: ${JSON.stringify(e)}`;
        throw new Error(n)
    }
    return !0
}
class xf extends qs {
    constructor(t) {
        super(Ms), this.source = t, Object.defineProperty(this, "tag", {
            set() {
                throw new Error("Alias nodes cannot have tags")
            }
        })
    }
    resolve(t) {
        let n;
        return Bn(t, {
            Node: (r, s) => {
                if (s === this) return Bn.BREAK;
                s.anchor === this.source && (n = s)
            }
        }), n
    }
    toJSON(t, n) {
        if (!n) return {
            source: this.source
        };
        const {
            anchors: r,
            doc: s,
            maxAliasCount: o
        } = n, i = this.resolve(s);
        if (!i) {
            const a = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new ReferenceError(a)
        }
        const c = r.get(i);
        if (!c || c.res === void 0) {
            const a = "This should not happen: Alias anchor was not resolved?";
            throw new ReferenceError(a)
        }
        if (o >= 0 && (c.count += 1, c.aliasCount === 0 && (c.aliasCount = rr(s, i, r)), c.count * c.aliasCount > o)) {
            const a = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(a)
        }
        return c.res
    }
    toString(t, n, r) {
        const s = `*${this.source}`;
        if (t) {
            if (Sa(this.source), t.options.verifyAliasOrder && !t.anchors.has(this.source)) {
                const o = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
                throw new Error(o)
            }
            if (t.implicitKey) return `${s} `
        }
        return s
    }
}

function rr(e, t, n) {
    if (ln(t)) {
        const r = t.resolve(e),
            s = n && r && n.get(r);
        return s ? s.count * s.aliasCount : 0
    } else if (Ne(t)) {
        let r = 0;
        for (const s of t.items) {
            const o = rr(e, s, n);
            o > r && (r = o)
        }
        return r
    } else if (be(t)) {
        const r = rr(e, t.key, n),
            s = rr(e, t.value, n);
        return Math.max(r, s)
    }
    return 1
}

function ct(e, t, n) {
    if (Array.isArray(e)) return e.map((r, s) => ct(r, String(s), n));
    if (e && typeof e.toJSON == "function") {
        if (!n || !Pf(e)) return e.toJSON(t, n);
        const r = {
            aliasCount: 0,
            count: 1,
            res: void 0
        };
        n.anchors.set(e, r), n.onCreate = o => {
            r.res = o, delete n.onCreate
        };
        const s = e.toJSON(t, n);
        return n.onCreate && n.onCreate(s), s
    }
    return typeof e == "bigint" && !(n != null && n.keep) ? Number(e) : e
}
const _a = e => !e || typeof e != "function" && typeof e != "object";
class he extends qs {
    constructor(t) {
        super(js), this.value = t
    }
    toJSON(t, n) {
        return n != null && n.keep ? this.value : ct(this.value, t, n)
    }
    toString() {
        return String(this.value)
    }
}
he.BLOCK_FOLDED = "BLOCK_FOLDED";
he.BLOCK_LITERAL = "BLOCK_LITERAL";
he.PLAIN = "PLAIN";
he.QUOTE_DOUBLE = "QUOTE_DOUBLE";
he.QUOTE_SINGLE = "QUOTE_SINGLE";
const Lf = "tag:yaml.org,2002:";

function Ff(e, t, n) {
    var r;
    if (t) {
        const s = n.filter(i => i.tag === t),
            o = (r = s.find(i => !i.format)) != null ? r : s[0];
        if (!o) throw new Error(`Tag ${t} not found`);
        return o
    }
    return n.find(s => {
        var o;
        return ((o = s.identify) == null ? void 0 : o.call(s, e)) && !s.format
    })
}

function kf(e, t, n) {
    var h, d;
    if (Hs(e) && (e = e.contents), Te(e)) return e;
    if (be(e)) {
        const p = (d = (h = n.schema[Ut]).createNode) == null ? void 0 : d.call(h, n.schema, null, n);
        return p.items.push(e), p
    }(e instanceof String || e instanceof Number || e instanceof Boolean || typeof BigInt != "undefined" && e instanceof BigInt) && (e = e.valueOf());
    const {
        aliasDuplicateObjects: r,
        onAnchor: s,
        onTagObj: o,
        schema: i,
        sourceObjects: c
    } = n;
    let a;
    if (r && e && typeof e == "object") {
        if (a = c.get(e), a) return a.anchor || (a.anchor = s(e)), new xf(a.anchor);
        a = {
            anchor: null,
            node: null
        }, c.set(e, a)
    }
    t != null && t.startsWith("!!") && (t = Lf + t.slice(2));
    let l = Ff(e, t, i.tags);
    if (!l) {
        if (e && typeof e.toJSON == "function" && (e = e.toJSON()), !e || typeof e != "object") {
            const p = new he(e);
            return a && (a.node = p), p
        }
        l = e instanceof Map ? i[Ut] : Symbol.iterator in Object(e) ? i[Hn] : i[Ut]
    }
    o && (o(l), delete n.onTagObj);
    const u = l != null && l.createNode ? l.createNode(n.schema, e, n) : new he(e);
    return t && (u.tag = t), a && (a.node = u), u
}

function zo(e, t, n) {
    let r = n;
    for (let s = t.length - 1; s >= 0; --s) {
        const o = t[s];
        if (typeof o == "number" && Number.isInteger(o) && o >= 0) {
            const i = [];
            i[o] = r, r = i
        } else r = new Map([
            [o, r]
        ])
    }
    return kf(r, void 0, {
        aliasDuplicateObjects: !1,
        keepUndefined: !1,
        onAnchor: () => {
            throw new Error("This should not happen, please report a bug.")
        },
        schema: e,
        sourceObjects: new Map
    })
}
const Df = e => e == null || typeof e == "object" && !!e[Symbol.iterator]().next().done;
class xr extends qs {
    constructor(t, n) {
        super(t), Object.defineProperty(this, "schema", {
            value: n,
            configurable: !0,
            enumerable: !1,
            writable: !0
        })
    }
    clone(t) {
        const n = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        return t && (n.schema = t), n.items = n.items.map(r => Te(r) || be(r) ? r.clone(t) : r), this.range && (n.range = this.range.slice()), n
    }
    addIn(t, n) {
        if (Df(t)) this.add(n);
        else {
            const [r, ...s] = t, o = this.get(r, !0);
            if (Ne(o)) o.addIn(s, n);
            else if (o === void 0 && this.schema) this.set(r, zo(this.schema, s, n));
            else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${s}`)
        }
    }
    deleteIn(t) {
        const [n, ...r] = t;
        if (r.length === 0) return this.delete(n);
        const s = this.get(n, !0);
        if (Ne(s)) return s.deleteIn(r);
        throw new Error(`Expected YAML collection at ${n}. Remaining path: ${r}`)
    }
    getIn(t, n) {
        const [r, ...s] = t, o = this.get(r, !0);
        return s.length === 0 ? !n && pe(o) ? o.value : o : Ne(o) ? o.getIn(s, n) : void 0
    }
    hasAllNullValues(t) {
        return this.items.every(n => {
            if (!be(n)) return !1;
            const r = n.value;
            return r == null || t && pe(r) && r.value == null && !r.commentBefore && !r.comment && !r.tag
        })
    }
    hasIn(t) {
        const [n, ...r] = t;
        if (r.length === 0) return this.has(n);
        const s = this.get(n, !0);
        return Ne(s) ? s.hasIn(r) : !1
    }
    setIn(t, n) {
        const [r, ...s] = t;
        if (s.length === 0) this.set(r, n);
        else {
            const o = this.get(r, !0);
            if (Ne(o)) o.setIn(s, n);
            else if (o === void 0 && this.schema) this.set(r, zo(this.schema, s, n));
            else throw new Error(`Expected YAML collection at ${r}. Remaining path: ${s}`)
        }
    }
}
xr.maxFlowStringSingleLineLength = 60;
const Yf = e => e.replace(/^(?!$)(?: $)?/gm, "#");

function Un(e, t) {
    return /^\n+$/.test(e) ? e.substring(1) : t ? e.replace(/^(?! *$)/gm, t) : e
}
const kt = (e, t, n) => e.endsWith(`
`) ? Un(n, t) : n.includes(`
`) ? `
` + Un(n, t) : (e.endsWith(" ") ? "" : " ") + n,
    Oa = "flow",
    ps = "block",
    sr = "quoted";

function Lr(e, t, n = "flow", {
    indentAtStart: r,
    lineWidth: s = 80,
    minContentWidth: o = 20,
    onFold: i,
    onOverflow: c
} = {}) {
    if (!s || s < 0) return e;
    const a = Math.max(1 + o, 1 + s - t.length);
    if (e.length <= a) return e;
    const l = [],
        u = {};
    let h = s - t.length;
    typeof r == "number" && (r > s - Math.max(2, o) ? l.push(0) : h = s - r);
    let d, p, g = !1,
        y = -1,
        A = -1,
        w = -1;
    n === ps && (y = $o(e, y), y !== -1 && (h = y + a));
    for (let k; k = e[y += 1];) {
        if (n === sr && k === "\\") {
            switch (A = y, e[y + 1]) {
                case "x":
                    y += 3;
                    break;
                case "u":
                    y += 5;
                    break;
                case "U":
                    y += 9;
                    break;
                default:
                    y += 1
            }
            w = y
        }
        if (k === `
`) n === ps && (y = $o(e, y)), h = y + a, d = void 0;
        else {
            if (k === " " && p && p !== " " && p !== `
` && p !== "	") {
                const L = e[y + 1];
                L && L !== " " && L !== `
` && L !== "	" && (d = y)
            }
            if (y >= h)
                if (d) l.push(d), h = d + a, d = void 0;
                else if (n === sr) {
                for (; p === " " || p === "	";) p = k, k = e[y += 1], g = !0;
                const L = y > w + 1 ? y - 2 : A - 1;
                if (u[L]) return e;
                l.push(L), u[L] = !0, h = L + a, d = void 0
            } else g = !0
        }
        p = k
    }
    if (g && c && c(), l.length === 0) return e;
    i && i();
    let T = e.slice(0, l[0]);
    for (let k = 0; k < l.length; ++k) {
        const L = l[k],
            W = l[k + 1] || e.length;
        L === 0 ? T = `
${t}${e.slice(0,W)}` : (n === sr && u[L] && (T += `${e[L]}\\`), T += `
${t}${e.slice(L+1,W)}`)
    }
    return T
}

function $o(e, t) {
    let n = e[t + 1];
    for (; n === " " || n === "	";) {
        do n = e[t += 1]; while (n && n !== `
`);
        n = e[t + 1]
    }
    return t
}
const Fr = e => ({
        indentAtStart: e.indentAtStart,
        lineWidth: e.options.lineWidth,
        minContentWidth: e.options.minContentWidth
    }),
    kr = e => /^(%|---|\.\.\.)/m.test(e);

function Bf(e, t, n) {
    if (!t || t < 0) return !1;
    const r = t - n,
        s = e.length;
    if (s <= r) return !1;
    for (let o = 0, i = 0; o < s; ++o)
        if (e[o] === `
`) {
            if (o - i > r) return !0;
            if (i = o + 1, s - i <= r) return !1
        }
    return !0
}

function Pn(e, t) {
    const n = JSON.stringify(e);
    if (t.options.doubleQuotedAsJSON) return n;
    const {
        implicitKey: r
    } = t, s = t.options.doubleQuotedMinMultiLineLength, o = t.indent || (kr(e) ? "  " : "");
    let i = "",
        c = 0;
    for (let a = 0, l = n[a]; l; l = n[++a])
        if (l === " " && n[a + 1] === "\\" && n[a + 2] === "n" && (i += n.slice(c, a) + "\\ ", a += 1, c = a, l = "\\"), l === "\\") switch (n[a + 1]) {
            case "u":
                {
                    i += n.slice(c, a);
                    const u = n.substr(a + 2, 4);
                    switch (u) {
                        case "0000":
                            i += "\\0";
                            break;
                        case "0007":
                            i += "\\a";
                            break;
                        case "000b":
                            i += "\\v";
                            break;
                        case "001b":
                            i += "\\e";
                            break;
                        case "0085":
                            i += "\\N";
                            break;
                        case "00a0":
                            i += "\\_";
                            break;
                        case "2028":
                            i += "\\L";
                            break;
                        case "2029":
                            i += "\\P";
                            break;
                        default:
                            u.substr(0, 2) === "00" ? i += "\\x" + u.substr(2) : i += n.substr(a, 6)
                    }
                    a += 5,
                    c = a + 1
                }
                break;
            case "n":
                if (r || n[a + 2] === '"' || n.length < s) a += 1;
                else {
                    for (i += n.slice(c, a) + `

`; n[a + 2] === "\\" && n[a + 3] === "n" && n[a + 4] !== '"';) i += `
`, a += 2;
                    i += o, n[a + 2] === " " && (i += "\\"), a += 1, c = a + 1
                }
                break;
            default:
                a += 1
        }
    return i = c ? i + n.slice(c) : n, r ? i : Lr(i, o, sr, Fr(t))
}

function ms(e, t) {
    if (t.options.singleQuote === !1 || t.implicitKey && e.includes(`
`) || /[ \t]\n|\n[ \t]/.test(e)) return Pn(e, t);
    const n = t.indent || (kr(e) ? "  " : ""),
        r = "'" + e.replace(/'/g, "''").replace(/\n+/g, `$&
${n}`) + "'";
    return t.implicitKey ? r : Lr(r, n, Oa, Fr(t))
}

function Cn(e, t) {
    const {
        singleQuote: n
    } = t.options;
    let r;
    if (n === !1) r = Pn;
    else {
        const s = e.includes('"'),
            o = e.includes("'");
        s && !o ? r = ms : o && !s ? r = Pn : r = n ? ms : Pn
    }
    return r(e, t)
}

function or({
    comment: e,
    type: t,
    value: n
}, r, s, o) {
    const {
        blockQuote: i,
        commentString: c,
        lineWidth: a
    } = r.options;
    if (!i || /\n[\t ]+$/.test(n) || /^\s*$/.test(n)) return Cn(n, r);
    const l = r.indent || (r.forceBlockIndent || kr(n) ? "  " : ""),
        u = i === "literal" ? !0 : i === "folded" || t === he.BLOCK_FOLDED ? !1 : t === he.BLOCK_LITERAL ? !0 : !Bf(n, a, l.length);
    if (!n) return u ? `|
` : `>
`;
    let h, d;
    for (d = n.length; d > 0; --d) {
        const ee = n[d - 1];
        if (ee !== `
` && ee !== "	" && ee !== " ") break
    }
    let p = n.substring(d);
    const g = p.indexOf(`
`);
    g === -1 ? h = "-" : n === p || g !== p.length - 1 ? (h = "+", o && o()) : h = "", p && (n = n.slice(0, -p.length), p[p.length - 1] === `
` && (p = p.slice(0, -1)), p = p.replace(/\n+(?!\n|$)/g, `$&${l}`));
    let y = !1,
        A, w = -1;
    for (A = 0; A < n.length; ++A) {
        const ee = n[A];
        if (ee === " ") y = !0;
        else if (ee === `
`) w = A;
        else break
    }
    let T = n.substring(0, w < A ? w + 1 : A);
    T && (n = n.substring(T.length), T = T.replace(/\n+/g, `$&${l}`));
    let L = (u ? "|" : ">") + (y ? l ? "2" : "1" : "") + h;
    if (e && (L += " " + c(e.replace(/ ?[\r\n]+/g, " ")), s && s()), u) return n = n.replace(/\n+/g, `$&${l}`), `${L}
${l}${T}${n}${p}`;
    n = n.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
    const W = Lr(`${T}${n}${p}`, l, ps, Fr(r));
    return `${L}
${l}${W}`
}

function Uf(e, t, n, r) {
    const {
        type: s,
        value: o
    } = e, {
        actualString: i,
        implicitKey: c,
        indent: a,
        inFlow: l
    } = t;
    if (c && /[\n[\]{},]/.test(o) || l && /[[\]{},]/.test(o)) return Cn(o, t);
    if (!o || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o)) return c || l || !o.includes(`
`) ? Cn(o, t) : or(e, t, n, r);
    if (!c && !l && s !== he.PLAIN && o.includes(`
`)) return or(e, t, n, r);
    if (a === "" && kr(o)) return t.forceBlockIndent = !0, or(e, t, n, r);
    const u = o.replace(/\n+/g, `$&
${a}`);
    if (i) {
        const h = g => {
                var y;
                return g.default && g.tag !== "tag:yaml.org,2002:str" && ((y = g.test) == null ? void 0 : y.test(u))
            },
            {
                compat: d,
                tags: p
            } = t.doc.schema;
        if (p.some(h) || (d == null ? void 0 : d.some(h))) return Cn(o, t)
    }
    return c ? u : Lr(u, a, Oa, Fr(t))
}

function Mf(e, t, n, r) {
    const {
        implicitKey: s,
        inFlow: o
    } = t, i = typeof e.value == "string" ? e : Object.assign({}, e, {
        value: String(e.value)
    });
    let {
        type: c
    } = e;
    c !== he.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(i.value) && (c = he.QUOTE_DOUBLE);
    const a = u => {
        switch (u) {
            case he.BLOCK_FOLDED:
            case he.BLOCK_LITERAL:
                return s || o ? Cn(i.value, t) : or(i, t, n, r);
            case he.QUOTE_DOUBLE:
                return Pn(i.value, t);
            case he.QUOTE_SINGLE:
                return ms(i.value, t);
            case he.PLAIN:
                return Uf(i, t, n, r);
            default:
                return null
        }
    };
    let l = a(c);
    if (l === null) {
        const {
            defaultKeyType: u,
            defaultStringType: h
        } = t.options, d = s && u || h;
        if (l = a(d), l === null) throw new Error(`Unsupported default string type ${d}`)
    }
    return l
}

function jf(e, t) {
    const n = Object.assign({
        blockQuote: !0,
        commentString: Yf,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: !1,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        indentSeq: !0,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: !1,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: !0
    }, e.schema.toStringOptions, t);
    let r;
    switch (n.collectionStyle) {
        case "block":
            r = !1;
            break;
        case "flow":
            r = !0;
            break;
        default:
            r = null
    }
    return {
        anchors: new Set,
        doc: e,
        indent: "",
        indentStep: typeof n.indent == "number" ? " ".repeat(n.indent) : "  ",
        inFlow: r,
        options: n
    }
}

function Hf(e, t) {
    var s, o, i, c;
    if (t.tag) {
        const a = e.filter(l => l.tag === t.tag);
        if (a.length > 0) return (s = a.find(l => l.format === t.format)) != null ? s : a[0]
    }
    let n, r;
    if (pe(t)) {
        r = t.value;
        const a = e.filter(l => {
            var u;
            return (u = l.identify) == null ? void 0 : u.call(l, r)
        });
        n = (o = a.find(l => l.format === t.format)) != null ? o : a.find(l => !l.format)
    } else r = t, n = e.find(a => a.nodeClass && r instanceof a.nodeClass);
    if (!n) {
        const a = (c = (i = r == null ? void 0 : r.constructor) == null ? void 0 : i.name) != null ? c : typeof r;
        throw new Error(`Tag not resolved for ${a} value`)
    }
    return n
}

function Wf(e, t, {
    anchors: n,
    doc: r
}) {
    if (!r.directives) return "";
    const s = [],
        o = (pe(e) || Ne(e)) && e.anchor;
    o && Sa(o) && (n.add(o), s.push(`&${o}`));
    const i = e.tag ? e.tag : t.default ? null : t.tag;
    return i && s.push(r.directives.tagString(i)), s.join(" ")
}

function mr(e, t, n, r) {
    var a, l;
    if (be(e)) return e.toString(t, n, r);
    if (ln(e)) {
        if (t.doc.directives) return e.toString(t);
        if ((a = t.resolvedAliases) != null && a.has(e)) throw new TypeError("Cannot stringify circular structure without alias nodes");
        t.resolvedAliases ? t.resolvedAliases.add(e) : t.resolvedAliases = new Set([e]), e = e.resolve(t.doc)
    }
    let s;
    const o = Te(e) ? e : t.doc.createNode(e, {
        onTagObj: u => s = u
    });
    s || (s = Hf(t.doc.schema.tags, o));
    const i = Wf(o, s, t);
    i.length > 0 && (t.indentAtStart = ((l = t.indentAtStart) != null ? l : 0) + i.length + 1);
    const c = typeof s.stringify == "function" ? s.stringify(o, t, n, r) : pe(o) ? Mf(o, t, n, r) : o.toString(t, n, r);
    return i ? pe(o) || c[0] === "{" || c[0] === "[" ? `${i} ${c}` : `${i}
${t.indent}${c}` : c
}

function qf({
    key: e,
    value: t
}, n, r, s) {
    const {
        allNullValues: o,
        doc: i,
        indent: c,
        indentStep: a,
        options: {
            commentString: l,
            indentSeq: u,
            simpleKeys: h
        }
    } = n;
    let d = Te(e) && e.comment || null;
    if (h) {
        if (d) throw new Error("With simple keys, key nodes cannot have comments");
        if (Ne(e)) {
            const ee = "With simple keys, collection cannot be used as a key value";
            throw new Error(ee)
        }
    }
    let p = !h && (!e || d && t == null && !n.inFlow || Ne(e) || (pe(e) ? e.type === he.BLOCK_FOLDED || e.type === he.BLOCK_LITERAL : typeof e == "object"));
    n = Object.assign({}, n, {
        allNullValues: !1,
        implicitKey: !p && (h || !o),
        indent: c + a
    });
    let g = !1,
        y = !1,
        A = mr(e, n, () => g = !0, () => y = !0);
    if (!p && !n.inFlow && A.length > 1024) {
        if (h) throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        p = !0
    }
    if (n.inFlow) {
        if (o || t == null) return g && r && r(), A === "" ? "?" : p ? `? ${A}` : A
    } else if (o && !h || t == null && p) return A = `? ${A}`, d && !g ? A += kt(A, n.indent, l(d)) : y && s && s(), A;
    g && (d = null), p ? (d && (A += kt(A, n.indent, l(d))), A = `? ${A}
${c}:`) : (A = `${A}:`, d && (A += kt(A, n.indent, l(d))));
    let w = "",
        T = null;
    if (Te(t)) {
        if (t.spaceBefore && (w = `
`), t.commentBefore) {
            const ee = l(t.commentBefore);
            w += `
${Un(ee,n.indent)}`
        }
        T = t.comment
    } else t && typeof t == "object" && (t = i.createNode(t));
    n.implicitKey = !1, !p && !d && pe(t) && (n.indentAtStart = A.length + 1), y = !1, !u && a.length >= 2 && !n.inFlow && !p && Ws(t) && !t.flow && !t.tag && !t.anchor && (n.indent = n.indent.substr(2));
    let k = !1;
    const L = mr(t, n, () => k = !0, () => y = !0);
    let W = " ";
    return w || d ? L === "" && !n.inFlow ? W = w === `
` ? `

` : w : W = `${w}
${n.indent}` : !p && Ne(t) ? (!(L[0] === "[" || L[0] === "{") || L.includes(`
`)) && (W = `
${n.indent}`) : (L === "" || L[0] === `
`) && (W = ""), A += W + L, n.inFlow ? k && r && r() : T && !k ? A += kt(A, n.indent, l(T)) : y && s && s(), A
}

function Kf(e, t) {
    (e === "debug" || e === "warn") && (typeof process != "undefined" && process.emitWarning ? process.emitWarning(t) : console.warn(t))
}
const Vo = "<<";

function Ra(e, t, {
    key: n,
    value: r
}) {
    if ((e == null ? void 0 : e.doc.schema.merge) && Qf(n))
        if (r = ln(r) ? r.resolve(e.doc) : r, Ws(r))
            for (const s of r.items) zr(e, t, s);
        else if (Array.isArray(r))
        for (const s of r) zr(e, t, s);
    else zr(e, t, r);
    else {
        const s = ct(n, "", e);
        if (t instanceof Map) t.set(s, ct(r, s, e));
        else if (t instanceof Set) t.add(s);
        else {
            const o = zf(n, s, e),
                i = ct(r, o, e);
            o in t ? Object.defineProperty(t, o, {
                value: i,
                writable: !0,
                enumerable: !0,
                configurable: !0
            }) : t[o] = i
        }
    }
    return t
}
const Qf = e => e === Vo || pe(e) && e.value === Vo && (!e.type || e.type === he.PLAIN);

function zr(e, t, n) {
    const r = e && ln(n) ? n.resolve(e.doc) : n;
    if (!Aa(r)) throw new Error("Merge sources must be maps or map aliases");
    const s = r.toJSON(null, e, Map);
    for (const [o, i] of s) t instanceof Map ? t.has(o) || t.set(o, i) : t instanceof Set ? t.add(o) : Object.prototype.hasOwnProperty.call(t, o) || Object.defineProperty(t, o, {
        value: i,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
    return t
}

function zf(e, t, n) {
    if (t === null) return "";
    if (typeof t != "object") return String(t);
    if (Te(e) && n && n.doc) {
        const r = jf(n.doc, {});
        r.anchors = new Set;
        for (const o of n.anchors.keys()) r.anchors.add(o.anchor);
        r.inFlow = !0, r.inStringifyKey = !0;
        const s = e.toString(r);
        if (!n.mapKeyWarned) {
            let o = JSON.stringify(s);
            o.length > 40 && (o = o.substring(0, 36) + '..."'), Kf(n.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${o}. Set mapAsMap: true to use object keys.`), n.mapKeyWarned = !0
        }
        return s
    }
    return JSON.stringify(t)
}
class St {
    constructor(t, n = null) {
        Object.defineProperty(this, nt, {
            value: Ea
        }), this.key = t, this.value = n
    }
    clone(t) {
        let {
            key: n,
            value: r
        } = this;
        return Te(n) && (n = n.clone(t)), Te(r) && (r = r.clone(t)), new St(n, r)
    }
    toJSON(t, n) {
        const r = n != null && n.mapAsMap ? new Map : {};
        return Ra(n, r, this)
    }
    toString(t, n, r) {
        return t != null && t.doc ? qf(this, t, n, r) : JSON.stringify(this)
    }
}

function Pa(e, t, n) {
    var o;
    return (((o = t.inFlow) != null ? o : e.flow) ? Vf : $f)(e, t, n)
}

function $f({
    comment: e,
    items: t
}, n, {
    blockItemPrefix: r,
    flowChars: s,
    itemIndent: o,
    onChompKeep: i,
    onComment: c
}) {
    const {
        indent: a,
        options: {
            commentString: l
        }
    } = n, u = Object.assign({}, n, {
        indent: o,
        type: null
    });
    let h = !1;
    const d = [];
    for (let g = 0; g < t.length; ++g) {
        const y = t[g];
        let A = null;
        if (Te(y)) !h && y.spaceBefore && d.push(""), gr(n, d, y.commentBefore, h), y.comment && (A = y.comment);
        else if (be(y)) {
            const T = Te(y.key) ? y.key : null;
            T && (!h && T.spaceBefore && d.push(""), gr(n, d, T.commentBefore, h))
        }
        h = !1;
        let w = mr(y, u, () => A = null, () => h = !0);
        A && (w += kt(w, o, l(A))), h && A && (h = !1), d.push(r + w)
    }
    let p;
    if (d.length === 0) p = s.start + s.end;
    else {
        p = d[0];
        for (let g = 1; g < d.length; ++g) {
            const y = d[g];
            p += y ? `
${a}${y}` : `
`
        }
    }
    return e ? (p += `
` + Un(l(e), a), c && c()) : h && i && i(), p
}

function Vf({
    comment: e,
    items: t
}, n, {
    flowChars: r,
    itemIndent: s,
    onComment: o
}) {
    const {
        indent: i,
        indentStep: c,
        options: {
            commentString: a
        }
    } = n;
    s += c;
    const l = Object.assign({}, n, {
        indent: s,
        inFlow: !0,
        type: null
    });
    let u = !1,
        h = 0;
    const d = [];
    for (let A = 0; A < t.length; ++A) {
        const w = t[A];
        let T = null;
        if (Te(w)) w.spaceBefore && d.push(""), gr(n, d, w.commentBefore, !1), w.comment && (T = w.comment);
        else if (be(w)) {
            const L = Te(w.key) ? w.key : null;
            L && (L.spaceBefore && d.push(""), gr(n, d, L.commentBefore, !1), L.comment && (u = !0));
            const W = Te(w.value) ? w.value : null;
            W ? (W.comment && (T = W.comment), W.commentBefore && (u = !0)) : w.value == null && L && L.comment && (T = L.comment)
        }
        T && (u = !0);
        let k = mr(w, l, () => T = null);
        A < t.length - 1 && (k += ","), T && (k += kt(k, s, a(T))), !u && (d.length > h || k.includes(`
`)) && (u = !0), d.push(k), h = d.length
    }
    let p;
    const {
        start: g,
        end: y
    } = r;
    if (d.length === 0) p = g + y;
    else if (u || (u = d.reduce((w, T) => w + T.length + 2, 2) > xr.maxFlowStringSingleLineLength), u) {
        p = g;
        for (const A of d) p += A ? `
${c}${i}${A}` : `
`;
        p += `
${i}${y}`
    } else p = `${g} ${d.join(" ")} ${y}`;
    return e && (p += kt(p, a(e), i), o && o()), p
}

function gr({
    indent: e,
    options: {
        commentString: t
    }
}, n, r, s) {
    if (r && s && (r = r.replace(/^\n+/, "")), r) {
        const o = Un(t(r), e);
        n.push(o.trimStart())
    }
}

function Dt(e, t) {
    const n = pe(t) ? t.value : t;
    for (const r of e)
        if (be(r) && (r.key === t || r.key === n || pe(r.key) && r.key.value === n)) return r
}
class zt extends xr {
    constructor(t) {
        super(Ut, t), this.items = []
    }
    static get tagName() {
        return "tag:yaml.org,2002:map"
    }
    add(t, n) {
        var i;
        let r;
        be(t) ? r = t : !t || typeof t != "object" || !("key" in t) ? r = new St(t, t == null ? void 0 : t.value) : r = new St(t.key, t.value);
        const s = Dt(this.items, r.key),
            o = (i = this.schema) == null ? void 0 : i.sortMapEntries;
        if (s) {
            if (!n) throw new Error(`Key ${r.key} already set`);
            pe(s.value) && _a(r.value) ? s.value.value = r.value : s.value = r.value
        } else if (o) {
            const c = this.items.findIndex(a => o(r, a) < 0);
            c === -1 ? this.items.push(r) : this.items.splice(c, 0, r)
        } else this.items.push(r)
    }
    delete(t) {
        const n = Dt(this.items, t);
        return n ? this.items.splice(this.items.indexOf(n), 1).length > 0 : !1
    }
    get(t, n) {
        var o;
        const r = Dt(this.items, t),
            s = r == null ? void 0 : r.value;
        return (o = !n && pe(s) ? s.value : s) != null ? o : void 0
    }
    has(t) {
        return !!Dt(this.items, t)
    }
    set(t, n) {
        this.add(new St(t, n), !0)
    }
    toJSON(t, n, r) {
        const s = r ? new r : n != null && n.mapAsMap ? new Map : {};
        n != null && n.onCreate && n.onCreate(s);
        for (const o of this.items) Ra(n, s, o);
        return s
    }
    toString(t, n, r) {
        if (!t) return JSON.stringify(this);
        for (const s of this.items)
            if (!be(s)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(s)} instead`);
        return !t.allNullValues && this.hasAllNullValues(!1) && (t = Object.assign({}, t, {
            allNullValues: !0
        })), Pa(this, t, {
            blockItemPrefix: "",
            flowChars: {
                start: "{",
                end: "}"
            },
            itemIndent: t.indent || "",
            onChompKeep: r,
            onComment: n
        })
    }
}
class Gf extends xr {
    constructor(t) {
        super(Hn, t), this.items = []
    }
    static get tagName() {
        return "tag:yaml.org,2002:seq"
    }
    add(t) {
        this.items.push(t)
    }
    delete(t) {
        const n = Jn(t);
        return typeof n != "number" ? !1 : this.items.splice(n, 1).length > 0
    }
    get(t, n) {
        const r = Jn(t);
        if (typeof r != "number") return;
        const s = this.items[r];
        return !n && pe(s) ? s.value : s
    }
    has(t) {
        const n = Jn(t);
        return typeof n == "number" && n < this.items.length
    }
    set(t, n) {
        const r = Jn(t);
        if (typeof r != "number") throw new Error(`Expected a valid index, not ${t}.`);
        const s = this.items[r];
        pe(s) && _a(n) ? s.value = n : this.items[r] = n
    }
    toJSON(t, n) {
        const r = [];
        n != null && n.onCreate && n.onCreate(r);
        let s = 0;
        for (const o of this.items) r.push(ct(o, String(s++), n));
        return r
    }
    toString(t, n, r) {
        return t ? Pa(this, t, {
            blockItemPrefix: "- ",
            flowChars: {
                start: "[",
                end: "]"
            },
            itemIndent: (t.indent || "") + "  ",
            onChompKeep: r,
            onComment: n
        }) : JSON.stringify(this)
    }
}

function Jn(e) {
    let t = pe(e) ? e.value : e;
    return t && typeof t == "string" && (t = Number(t)), typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : null
}
class Ks extends Gf {
    constructor() {
        super(), this.add = zt.prototype.add.bind(this), this.delete = zt.prototype.delete.bind(this), this.get = zt.prototype.get.bind(this), this.has = zt.prototype.has.bind(this), this.set = zt.prototype.set.bind(this), this.tag = Ks.tag
    }
    toJSON(t, n) {
        if (!n) return super.toJSON(t);
        const r = new Map;
        n != null && n.onCreate && n.onCreate(r);
        for (const s of this.items) {
            let o, i;
            if (be(s) ? (o = ct(s.key, "", n), i = ct(s.value, o, n)) : o = ct(s, "", n), r.has(o)) throw new Error("Ordered maps must not include duplicate keys");
            r.set(o, i)
        }
        return r
    }
}
Ks.tag = "tag:yaml.org,2002:omap";
class Qs extends zt {
    constructor(t) {
        super(t), this.tag = Qs.tag
    }
    add(t) {
        let n;
        be(t) ? n = t : t && typeof t == "object" && "key" in t && "value" in t && t.value === null ? n = new St(t.key, null) : n = new St(t, null), Dt(this.items, n.key) || this.items.push(n)
    }
    get(t, n) {
        const r = Dt(this.items, t);
        return !n && be(r) ? pe(r.key) ? r.key.value : r.key : r
    }
    set(t, n) {
        if (typeof n != "boolean") throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof n}`);
        const r = Dt(this.items, t);
        r && !n ? this.items.splice(this.items.indexOf(r), 1) : !r && n && this.items.push(new St(t))
    }
    toJSON(t, n) {
        return super.toJSON(t, n, Set)
    }
    toString(t, n, r) {
        if (!t) return JSON.stringify(this);
        if (this.hasAllNullValues(!0)) return super.toString(Object.assign({}, t, {
            allNullValues: !0
        }), n, r);
        throw new Error("Set items must all have null values")
    }
}
Qs.tag = "tag:yaml.org,2002:set";

function Ca(e, t) {
    return function() {
        return e.apply(t, arguments)
    }
}
const {
    toString: Ta
} = Object.prototype, {
    getPrototypeOf: zs
} = Object, $s = (e => t => {
    const n = Ta.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
})(Object.create(null)), ht = e => (e = e.toLowerCase(), t => $s(t) === e), Dr = e => t => typeof t === e, {
    isArray: Wn
} = Array, gs = Dr("undefined");

function Jf(e) {
    return e !== null && !gs(e) && e.constructor !== null && !gs(e.constructor) && un(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const Ia = ht("ArrayBuffer");

function Xf(e) {
    let t;
    return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ia(e.buffer), t
}
const Zf = Dr("string"),
    un = Dr("function"),
    Na = Dr("number"),
    xa = e => e !== null && typeof e == "object",
    ed = e => e === !0 || e === !1,
    ir = e => {
        if ($s(e) !== "object") return !1;
        const t = zs(e);
        return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
    },
    td = ht("Date"),
    nd = ht("File"),
    rd = ht("Blob"),
    sd = ht("FileList"),
    od = e => xa(e) && un(e.pipe),
    id = e => {
        const t = "[object FormData]";
        return e && (typeof FormData == "function" && e instanceof FormData || Ta.call(e) === t || un(e.toString) && e.toString() === t)
    },
    ad = ht("URLSearchParams"),
    cd = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function Yr(e, t, {
    allOwnKeys: n = !1
} = {}) {
    if (e === null || typeof e == "undefined") return;
    let r, s;
    if (typeof e != "object" && (e = [e]), Wn(e))
        for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
    else {
        const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
            i = o.length;
        let c;
        for (r = 0; r < i; r++) c = o[r], t.call(null, e[c], c, e)
    }
}

function ys() {
    const e = {},
        t = (n, r) => {
            ir(e[r]) && ir(n) ? e[r] = ys(e[r], n) : ir(n) ? e[r] = ys({}, n) : Wn(n) ? e[r] = n.slice() : e[r] = n
        };
    for (let n = 0, r = arguments.length; n < r; n++) arguments[n] && Yr(arguments[n], t);
    return e
}
const ld = (e, t, n, {
        allOwnKeys: r
    } = {}) => (Yr(t, (s, o) => {
        n && un(s) ? e[o] = Ca(s, n) : e[o] = s
    }, {
        allOwnKeys: r
    }), e),
    ud = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    fd = (e, t, n, r) => {
        e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
            value: t.prototype
        }), n && Object.assign(e.prototype, n)
    },
    dd = (e, t, n, r) => {
        let s, o, i;
        const c = {};
        if (t = t || {}, e == null) return t;
        do {
            for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0;) i = s[o], (!r || r(i, e, t)) && !c[i] && (t[i] = e[i], c[i] = !0);
            e = n !== !1 && zs(e)
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t
    },
    hd = (e, t, n) => {
        e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
        const r = e.indexOf(t, n);
        return r !== -1 && r === n
    },
    pd = e => {
        if (!e) return null;
        if (Wn(e)) return e;
        let t = e.length;
        if (!Na(t)) return null;
        const n = new Array(t);
        for (; t-- > 0;) n[t] = e[t];
        return n
    },
    md = (e => t => e && t instanceof e)(typeof Uint8Array != "undefined" && zs(Uint8Array)),
    gd = (e, t) => {
        const r = (e && e[Symbol.iterator]).call(e);
        let s;
        for (;
            (s = r.next()) && !s.done;) {
            const o = s.value;
            t.call(e, o[0], o[1])
        }
    },
    yd = (e, t) => {
        let n;
        const r = [];
        for (;
            (n = e.exec(t)) !== null;) r.push(n);
        return r
    },
    vd = ht("HTMLFormElement"),
    bd = e => e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function(n, r, s) {
        return r.toUpperCase() + s
    }),
    Go = (({
        hasOwnProperty: e
    }) => (t, n) => e.call(t, n))(Object.prototype),
    wd = ht("RegExp"),
    La = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e),
            r = {};
        Yr(n, (s, o) => {
            t(s, o, e) !== !1 && (r[o] = s)
        }), Object.defineProperties(e, r)
    },
    Ed = e => {
        La(e, (t, n) => {
            const r = e[n];
            if (!!un(r)) {
                if (t.enumerable = !1, "writable" in t) {
                    t.writable = !1;
                    return
                }
                t.set || (t.set = () => {
                    throw Error("Can not read-only method '" + n + "'")
                })
            }
        })
    },
    Ad = (e, t) => {
        const n = {},
            r = s => {
                s.forEach(o => {
                    n[o] = !0
                })
            };
        return Wn(e) ? r(e) : r(String(e).split(t)), n
    },
    Sd = () => {},
    _d = (e, t) => (e = +e, Number.isFinite(e) ? e : t);
var E = {
    isArray: Wn,
    isArrayBuffer: Ia,
    isBuffer: Jf,
    isFormData: id,
    isArrayBufferView: Xf,
    isString: Zf,
    isNumber: Na,
    isBoolean: ed,
    isObject: xa,
    isPlainObject: ir,
    isUndefined: gs,
    isDate: td,
    isFile: nd,
    isBlob: rd,
    isRegExp: wd,
    isFunction: un,
    isStream: od,
    isURLSearchParams: ad,
    isTypedArray: md,
    isFileList: sd,
    forEach: Yr,
    merge: ys,
    extend: ld,
    trim: cd,
    stripBOM: ud,
    inherits: fd,
    toFlatObject: dd,
    kindOf: $s,
    kindOfTest: ht,
    endsWith: hd,
    toArray: pd,
    forEachEntry: gd,
    matchAll: yd,
    isHTMLForm: vd,
    hasOwnProperty: Go,
    hasOwnProp: Go,
    reduceDescriptors: La,
    freezeMethods: Ed,
    toObjectSet: Ad,
    toCamelCase: bd,
    noop: Sd,
    toFiniteNumber: _d
};

function J(e, t, n, r, s) {
    Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s)
}
E.inherits(J, Error, {
    toJSON: function() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
const Fa = J.prototype,
    ka = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
    ka[e] = {
        value: e
    }
});
Object.defineProperties(J, ka);
Object.defineProperty(Fa, "isAxiosError", {
    value: !0
});
J.from = (e, t, n, r, s, o) => {
    const i = Object.create(Fa);
    return E.toFlatObject(e, i, function(a) {
        return a !== Error.prototype
    }, c => c !== "isAxiosError"), J.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i
};
var Od = typeof self == "object" ? self.FormData : window.FormData;

function vs(e) {
    return E.isPlainObject(e) || E.isArray(e)
}

function Da(e) {
    return E.endsWith(e, "[]") ? e.slice(0, -2) : e
}

function Jo(e, t, n) {
    return e ? e.concat(t).map(function(s, o) {
        return s = Da(s), !n && o ? "[" + s + "]" : s
    }).join(n ? "." : "") : t
}

function Rd(e) {
    return E.isArray(e) && !e.some(vs)
}
const Pd = E.toFlatObject(E, {}, null, function(t) {
    return /^is[A-Z]/.test(t)
});

function Cd(e) {
    return e && E.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]
}

function Br(e, t, n) {
    if (!E.isObject(e)) throw new TypeError("target must be an object");
    t = t || new(Od || FormData), n = E.toFlatObject(n, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, function(y, A) {
        return !E.isUndefined(A[y])
    });
    const r = n.metaTokens,
        s = n.visitor || u,
        o = n.dots,
        i = n.indexes,
        a = (n.Blob || typeof Blob != "undefined" && Blob) && Cd(t);
    if (!E.isFunction(s)) throw new TypeError("visitor must be a function");

    function l(g) {
        if (g === null) return "";
        if (E.isDate(g)) return g.toISOString();
        if (!a && E.isBlob(g)) throw new J("Blob is not supported. Use a Buffer instead.");
        return E.isArrayBuffer(g) || E.isTypedArray(g) ? a && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g
    }

    function u(g, y, A) {
        let w = g;
        if (g && !A && typeof g == "object") {
            if (E.endsWith(y, "{}")) y = r ? y : y.slice(0, -2), g = JSON.stringify(g);
            else if (E.isArray(g) && Rd(g) || E.isFileList(g) || E.endsWith(y, "[]") && (w = E.toArray(g))) return y = Da(y), w.forEach(function(k, L) {
                !(E.isUndefined(k) || k === null) && t.append(i === !0 ? Jo([y], L, o) : i === null ? y : y + "[]", l(k))
            }), !1
        }
        return vs(g) ? !0 : (t.append(Jo(A, y, o), l(g)), !1)
    }
    const h = [],
        d = Object.assign(Pd, {
            defaultVisitor: u,
            convertValue: l,
            isVisitable: vs
        });

    function p(g, y) {
        if (!E.isUndefined(g)) {
            if (h.indexOf(g) !== -1) throw Error("Circular reference detected in " + y.join("."));
            h.push(g), E.forEach(g, function(w, T) {
                (!(E.isUndefined(w) || w === null) && s.call(t, w, E.isString(T) ? T.trim() : T, y, d)) === !0 && p(w, y ? y.concat(T) : [T])
            }), h.pop()
        }
    }
    if (!E.isObject(e)) throw new TypeError("data must be an object");
    return p(e), t
}

function Xo(e) {
    const t = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
        return t[r]
    })
}

function Vs(e, t) {
    this._pairs = [], e && Br(e, this, t)
}
const Ya = Vs.prototype;
Ya.append = function(t, n) {
    this._pairs.push([t, n])
};
Ya.toString = function(t) {
    const n = t ? function(r) {
        return t.call(this, r, Xo)
    } : Xo;
    return this._pairs.map(function(s) {
        return n(s[0]) + "=" + n(s[1])
    }, "").join("&")
};

function Td(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function Ba(e, t, n) {
    if (!t) return e;
    const r = n && n.encode || Td,
        s = n && n.serialize;
    let o;
    if (s ? o = s(t, n) : o = E.isURLSearchParams(t) ? t.toString() : new Vs(t, n).toString(r), o) {
        const i = e.indexOf("#");
        i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o
    }
    return e
}
class Zo {
    constructor() {
        this.handlers = []
    }
    use(t, n, r) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: r ? r.synchronous : !1,
            runWhen: r ? r.runWhen : null
        }), this.handlers.length - 1
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(t) {
        E.forEach(this.handlers, function(r) {
            r !== null && t(r)
        })
    }
}
var Ua = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1
    },
    Id = typeof URLSearchParams != "undefined" ? URLSearchParams : Vs,
    Nd = FormData;
const xd = (() => {
    let e;
    return typeof navigator != "undefined" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window != "undefined" && typeof document != "undefined"
})();
var lt = {
    isBrowser: !0,
    classes: {
        URLSearchParams: Id,
        FormData: Nd,
        Blob
    },
    isStandardBrowserEnv: xd,
    protocols: ["http", "https", "file", "blob", "url", "data"]
};

function Ld(e, t) {
    return Br(e, new lt.classes.URLSearchParams, Object.assign({
        visitor: function(n, r, s, o) {
            return lt.isNode && E.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments)
        }
    }, t))
}

function Fd(e) {
    return E.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
}

function kd(e) {
    const t = {},
        n = Object.keys(e);
    let r;
    const s = n.length;
    let o;
    for (r = 0; r < s; r++) o = n[r], t[o] = e[o];
    return t
}

function Ma(e) {
    function t(n, r, s, o) {
        let i = n[o++];
        const c = Number.isFinite(+i),
            a = o >= n.length;
        return i = !i && E.isArray(s) ? s.length : i, a ? (E.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !c) : ((!s[i] || !E.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && E.isArray(s[i]) && (s[i] = kd(s[i])), !c)
    }
    if (E.isFormData(e) && E.isFunction(e.entries)) {
        const n = {};
        return E.forEachEntry(e, (r, s) => {
            t(Fd(r), s, n, 0)
        }), n
    }
    return null
}

function Dd(e, t, n) {
    const r = n.config.validateStatus;
    !n.status || !r || r(n.status) ? e(n) : t(new J("Request failed with status code " + n.status, [J.ERR_BAD_REQUEST, J.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}
var Yd = lt.isStandardBrowserEnv ? function() {
    return {
        write: function(n, r, s, o, i, c) {
            const a = [];
            a.push(n + "=" + encodeURIComponent(r)), E.isNumber(s) && a.push("expires=" + new Date(s).toGMTString()), E.isString(o) && a.push("path=" + o), E.isString(i) && a.push("domain=" + i), c === !0 && a.push("secure"), document.cookie = a.join("; ")
        },
        read: function(n) {
            const r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
            return r ? decodeURIComponent(r[3]) : null
        },
        remove: function(n) {
            this.write(n, "", Date.now() - 864e5)
        }
    }
}() : function() {
    return {
        write: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }
}();

function Bd(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}

function Ud(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
}

function ja(e, t) {
    return e && !Bd(t) ? Ud(e, t) : t
}
var Md = lt.isStandardBrowserEnv ? function() {
    const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
    let r;

    function s(o) {
        let i = o;
        return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
        }
    }
    return r = s(window.location.href),
        function(i) {
            const c = E.isString(i) ? s(i) : i;
            return c.protocol === r.protocol && c.host === r.host
        }
}() : function() {
    return function() {
        return !0
    }
}();

function qn(e, t, n) {
    J.call(this, e == null ? "canceled" : e, J.ERR_CANCELED, t, n), this.name = "CanceledError"
}
E.inherits(qn, J, {
    __CANCEL__: !0
});

function jd(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || ""
}
const Hd = E.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
var Wd = e => {
    const t = {};
    let n, r, s;
    return e && e.split(`
`).forEach(function(i) {
        s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && Hd[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r)
    }), t
};
const ei = Symbol("internals"),
    Ha = Symbol("defaults");

function En(e) {
    return e && String(e).trim().toLowerCase()
}

function ar(e) {
    return e === !1 || e == null ? e : E.isArray(e) ? e.map(ar) : String(e)
}

function qd(e) {
    const t = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let r;
    for (; r = n.exec(e);) t[r[1]] = r[2];
    return t
}

function ti(e, t, n, r) {
    if (E.isFunction(r)) return r.call(this, t, n);
    if (!!E.isString(t)) {
        if (E.isString(r)) return t.indexOf(r) !== -1;
        if (E.isRegExp(r)) return r.test(t)
    }
}

function Kd(e) {
    return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}

function Qd(e, t) {
    const n = E.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(r => {
        Object.defineProperty(e, r + n, {
            value: function(s, o, i) {
                return this[r].call(this, t, s, o, i)
            },
            configurable: !0
        })
    })
}

function bn(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let r = n.length,
        s;
    for (; r-- > 0;)
        if (s = n[r], t === s.toLowerCase()) return s;
    return null
}

function Ue(e, t) {
    e && this.set(e), this[Ha] = t || null
}
Object.assign(Ue.prototype, {
    set: function(e, t, n) {
        const r = this;

        function s(o, i, c) {
            const a = En(i);
            if (!a) throw new Error("header name must be a non-empty string");
            const l = bn(r, a);
            l && c !== !0 && (r[l] === !1 || c === !1) || (r[l || i] = ar(o))
        }
        return E.isPlainObject(e) ? E.forEach(e, (o, i) => {
            s(o, i, t)
        }) : s(t, e, n), this
    },
    get: function(e, t) {
        if (e = En(e), !e) return;
        const n = bn(this, e);
        if (n) {
            const r = this[n];
            if (!t) return r;
            if (t === !0) return qd(r);
            if (E.isFunction(t)) return t.call(this, r, n);
            if (E.isRegExp(t)) return t.exec(r);
            throw new TypeError("parser must be boolean|regexp|function")
        }
    },
    has: function(e, t) {
        if (e = En(e), e) {
            const n = bn(this, e);
            return !!(n && (!t || ti(this, this[n], n, t)))
        }
        return !1
    },
    delete: function(e, t) {
        const n = this;
        let r = !1;

        function s(o) {
            if (o = En(o), o) {
                const i = bn(n, o);
                i && (!t || ti(n, n[i], i, t)) && (delete n[i], r = !0)
            }
        }
        return E.isArray(e) ? e.forEach(s) : s(e), r
    },
    clear: function() {
        return Object.keys(this).forEach(this.delete.bind(this))
    },
    normalize: function(e) {
        const t = this,
            n = {};
        return E.forEach(this, (r, s) => {
            const o = bn(n, s);
            if (o) {
                t[o] = ar(r), delete t[s];
                return
            }
            const i = e ? Kd(s) : String(s).trim();
            i !== s && delete t[s], t[i] = ar(r), n[i] = !0
        }), this
    },
    toJSON: function(e) {
        const t = Object.create(null);
        return E.forEach(Object.assign({}, this[Ha] || null, this), (n, r) => {
            n == null || n === !1 || (t[r] = e && E.isArray(n) ? n.join(", ") : n)
        }), t
    }
});
Object.assign(Ue, {
    from: function(e) {
        return E.isString(e) ? new this(Wd(e)) : e instanceof this ? e : new this(e)
    },
    accessor: function(e) {
        const n = (this[ei] = this[ei] = {
                accessors: {}
            }).accessors,
            r = this.prototype;

        function s(o) {
            const i = En(o);
            n[i] || (Qd(r, o), n[i] = !0)
        }
        return E.isArray(e) ? e.forEach(s) : s(e), this
    }
});
Ue.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
E.freezeMethods(Ue.prototype);
E.freezeMethods(Ue);

function zd(e, t) {
    e = e || 10;
    const n = new Array(e),
        r = new Array(e);
    let s = 0,
        o = 0,
        i;
    return t = t !== void 0 ? t : 1e3,
        function(a) {
            const l = Date.now(),
                u = r[o];
            i || (i = l), n[s] = a, r[s] = l;
            let h = o,
                d = 0;
            for (; h !== s;) d += n[h++], h = h % e;
            if (s = (s + 1) % e, s === o && (o = (o + 1) % e), l - i < t) return;
            const p = u && l - u;
            return p ? Math.round(d * 1e3 / p) : void 0
        }
}

function ni(e, t) {
    let n = 0;
    const r = zd(50, 250);
    return s => {
        const o = s.loaded,
            i = s.lengthComputable ? s.total : void 0,
            c = o - n,
            a = r(c),
            l = o <= i;
        n = o;
        const u = {
            loaded: o,
            total: i,
            progress: i ? o / i : void 0,
            bytes: c,
            rate: a || void 0,
            estimated: a && i && l ? (i - o) / a : void 0
        };
        u[t ? "download" : "upload"] = !0, e(u)
    }
}

function ri(e) {
    return new Promise(function(n, r) {
        let s = e.data;
        const o = Ue.from(e.headers).normalize(),
            i = e.responseType;
        let c;

        function a() {
            e.cancelToken && e.cancelToken.unsubscribe(c), e.signal && e.signal.removeEventListener("abort", c)
        }
        E.isFormData(s) && lt.isStandardBrowserEnv && o.setContentType(!1);
        let l = new XMLHttpRequest;
        if (e.auth) {
            const p = e.auth.username || "",
                g = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
            o.set("Authorization", "Basic " + btoa(p + ":" + g))
        }
        const u = ja(e.baseURL, e.url);
        l.open(e.method.toUpperCase(), Ba(u, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;

        function h() {
            if (!l) return;
            const p = Ue.from("getAllResponseHeaders" in l && l.getAllResponseHeaders()),
                y = {
                    data: !i || i === "text" || i === "json" ? l.responseText : l.response,
                    status: l.status,
                    statusText: l.statusText,
                    headers: p,
                    config: e,
                    request: l
                };
            Dd(function(w) {
                n(w), a()
            }, function(w) {
                r(w), a()
            }, y), l = null
        }
        if ("onloadend" in l ? l.onloadend = h : l.onreadystatechange = function() {
                !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(h)
            }, l.onabort = function() {
                !l || (r(new J("Request aborted", J.ECONNABORTED, e, l)), l = null)
            }, l.onerror = function() {
                r(new J("Network Error", J.ERR_NETWORK, e, l)), l = null
            }, l.ontimeout = function() {
                let g = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
                const y = e.transitional || Ua;
                e.timeoutErrorMessage && (g = e.timeoutErrorMessage), r(new J(g, y.clarifyTimeoutError ? J.ETIMEDOUT : J.ECONNABORTED, e, l)), l = null
            }, lt.isStandardBrowserEnv) {
            const p = (e.withCredentials || Md(u)) && e.xsrfCookieName && Yd.read(e.xsrfCookieName);
            p && o.set(e.xsrfHeaderName, p)
        }
        s === void 0 && o.setContentType(null), "setRequestHeader" in l && E.forEach(o.toJSON(), function(g, y) {
            l.setRequestHeader(y, g)
        }), E.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), i && i !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", ni(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", ni(e.onUploadProgress)), (e.cancelToken || e.signal) && (c = p => {
            !l || (r(!p || p.type ? new qn(null, e, l) : p), l.abort(), l = null)
        }, e.cancelToken && e.cancelToken.subscribe(c), e.signal && (e.signal.aborted ? c() : e.signal.addEventListener("abort", c)));
        const d = jd(u);
        if (d && lt.protocols.indexOf(d) === -1) {
            r(new J("Unsupported protocol " + d + ":", J.ERR_BAD_REQUEST, e));
            return
        }
        l.send(s || null)
    })
}
const si = {
    http: ri,
    xhr: ri
};
var oi = {
    getAdapter: e => {
        if (E.isString(e)) {
            const t = si[e];
            if (!e) throw Error(E.hasOwnProp(e) ? `Adapter '${e}' is not available in the build` : `Can not resolve adapter '${e}'`);
            return t
        }
        if (!E.isFunction(e)) throw new TypeError("adapter is not a function");
        return e
    },
    adapters: si
};
const $d = {
    "Content-Type": "application/x-www-form-urlencoded"
};

function Vd() {
    let e;
    return typeof XMLHttpRequest != "undefined" ? e = oi.getAdapter("xhr") : typeof process != "undefined" && E.kindOf(process) === "process" && (e = oi.getAdapter("http")), e
}

function Gd(e, t, n) {
    if (E.isString(e)) try {
        return (t || JSON.parse)(e), E.trim(e)
    } catch (r) {
        if (r.name !== "SyntaxError") throw r
    }
    return (n || JSON.stringify)(e)
}
const fn = {
    transitional: Ua,
    adapter: Vd(),
    transformRequest: [function(t, n) {
        const r = n.getContentType() || "",
            s = r.indexOf("application/json") > -1,
            o = E.isObject(t);
        if (o && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t)) return s && s ? JSON.stringify(Ma(t)) : t;
        if (E.isArrayBuffer(t) || E.isBuffer(t) || E.isStream(t) || E.isFile(t) || E.isBlob(t)) return t;
        if (E.isArrayBufferView(t)) return t.buffer;
        if (E.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
        let c;
        if (o) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1) return Ld(t, this.formSerializer).toString();
            if ((c = E.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                const a = this.env && this.env.FormData;
                return Br(c ? {
                    "files[]": t
                } : t, a && new a, this.formSerializer)
            }
        }
        return o || s ? (n.setContentType("application/json", !1), Gd(t)) : t
    }],
    transformResponse: [function(t) {
        const n = this.transitional || fn.transitional,
            r = n && n.forcedJSONParsing,
            s = this.responseType === "json";
        if (t && E.isString(t) && (r && !this.responseType || s)) {
            const i = !(n && n.silentJSONParsing) && s;
            try {
                return JSON.parse(t)
            } catch (c) {
                if (i) throw c.name === "SyntaxError" ? J.from(c, J.ERR_BAD_RESPONSE, this, null, this.response) : c
            }
        }
        return t
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: lt.classes.FormData,
        Blob: lt.classes.Blob
    },
    validateStatus: function(t) {
        return t >= 200 && t < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*"
        }
    }
};
E.forEach(["delete", "get", "head"], function(t) {
    fn.headers[t] = {}
});
E.forEach(["post", "put", "patch"], function(t) {
    fn.headers[t] = E.merge($d)
});

function $r(e, t) {
    const n = this || fn,
        r = t || n,
        s = Ue.from(r.headers);
    let o = r.data;
    return E.forEach(e, function(c) {
        o = c.call(n, o, s.normalize(), t ? t.status : void 0)
    }), s.normalize(), o
}

function Wa(e) {
    return !!(e && e.__CANCEL__)
}

function Vr(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new qn
}

function ii(e) {
    return Vr(e), e.headers = Ue.from(e.headers), e.data = $r.call(e, e.transformRequest), (e.adapter || fn.adapter)(e).then(function(r) {
        return Vr(e), r.data = $r.call(e, e.transformResponse, r), r.headers = Ue.from(r.headers), r
    }, function(r) {
        return Wa(r) || (Vr(e), r && r.response && (r.response.data = $r.call(e, e.transformResponse, r.response), r.response.headers = Ue.from(r.response.headers))), Promise.reject(r)
    })
}

function Mn(e, t) {
    t = t || {};
    const n = {};

    function r(l, u) {
        return E.isPlainObject(l) && E.isPlainObject(u) ? E.merge(l, u) : E.isPlainObject(u) ? E.merge({}, u) : E.isArray(u) ? u.slice() : u
    }

    function s(l) {
        if (E.isUndefined(t[l])) {
            if (!E.isUndefined(e[l])) return r(void 0, e[l])
        } else return r(e[l], t[l])
    }

    function o(l) {
        if (!E.isUndefined(t[l])) return r(void 0, t[l])
    }

    function i(l) {
        if (E.isUndefined(t[l])) {
            if (!E.isUndefined(e[l])) return r(void 0, e[l])
        } else return r(void 0, t[l])
    }

    function c(l) {
        if (l in t) return r(e[l], t[l]);
        if (l in e) return r(void 0, e[l])
    }
    const a = {
        url: o,
        method: o,
        data: o,
        baseURL: i,
        transformRequest: i,
        transformResponse: i,
        paramsSerializer: i,
        timeout: i,
        timeoutMessage: i,
        withCredentials: i,
        adapter: i,
        responseType: i,
        xsrfCookieName: i,
        xsrfHeaderName: i,
        onUploadProgress: i,
        onDownloadProgress: i,
        decompress: i,
        maxContentLength: i,
        maxBodyLength: i,
        beforeRedirect: i,
        transport: i,
        httpAgent: i,
        httpsAgent: i,
        cancelToken: i,
        socketPath: i,
        responseEncoding: i,
        validateStatus: c
    };
    return E.forEach(Object.keys(e).concat(Object.keys(t)), function(u) {
        const h = a[u] || s,
            d = h(u);
        E.isUndefined(d) && h !== c || (n[u] = d)
    }), n
}
const qa = "1.1.3",
    Gs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
    Gs[e] = function(r) {
        return typeof r === e || "a" + (t < 1 ? "n " : " ") + e
    }
});
const ai = {};
Gs.transitional = function(t, n, r) {
    function s(o, i) {
        return "[Axios v" + qa + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "")
    }
    return (o, i, c) => {
        if (t === !1) throw new J(s(i, " has been removed" + (n ? " in " + n : "")), J.ERR_DEPRECATED);
        return n && !ai[i] && (ai[i] = !0, console.warn(s(i, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(o, i, c) : !0
    }
};

function Jd(e, t, n) {
    if (typeof e != "object") throw new J("options must be an object", J.ERR_BAD_OPTION_VALUE);
    const r = Object.keys(e);
    let s = r.length;
    for (; s-- > 0;) {
        const o = r[s],
            i = t[o];
        if (i) {
            const c = e[o],
                a = c === void 0 || i(c, o, e);
            if (a !== !0) throw new J("option " + o + " must be " + a, J.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0) throw new J("Unknown option " + o, J.ERR_BAD_OPTION)
    }
}
var bs = {
    assertOptions: Jd,
    validators: Gs
};
const gt = bs.validators;
class Mt {
    constructor(t) {
        this.defaults = t, this.interceptors = {
            request: new Zo,
            response: new Zo
        }
    }
    request(t, n) {
        typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Mn(this.defaults, n);
        const {
            transitional: r,
            paramsSerializer: s
        } = n;
        r !== void 0 && bs.assertOptions(r, {
            silentJSONParsing: gt.transitional(gt.boolean),
            forcedJSONParsing: gt.transitional(gt.boolean),
            clarifyTimeoutError: gt.transitional(gt.boolean)
        }, !1), s !== void 0 && bs.assertOptions(s, {
            encode: gt.function,
            serialize: gt.function
        }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
        const o = n.headers && E.merge(n.headers.common, n.headers[n.method]);
        o && E.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(g) {
            delete n.headers[g]
        }), n.headers = new Ue(n.headers, o);
        const i = [];
        let c = !0;
        this.interceptors.request.forEach(function(g) {
            typeof g.runWhen == "function" && g.runWhen(n) === !1 || (c = c && g.synchronous, i.unshift(g.fulfilled, g.rejected))
        });
        const a = [];
        this.interceptors.response.forEach(function(g) {
            a.push(g.fulfilled, g.rejected)
        });
        let l, u = 0,
            h;
        if (!c) {
            const p = [ii.bind(this), void 0];
            for (p.unshift.apply(p, i), p.push.apply(p, a), h = p.length, l = Promise.resolve(n); u < h;) l = l.then(p[u++], p[u++]);
            return l
        }
        h = i.length;
        let d = n;
        for (u = 0; u < h;) {
            const p = i[u++],
                g = i[u++];
            try {
                d = p(d)
            } catch (y) {
                g.call(this, y);
                break
            }
        }
        try {
            l = ii.call(this, d)
        } catch (p) {
            return Promise.reject(p)
        }
        for (u = 0, h = a.length; u < h;) l = l.then(a[u++], a[u++]);
        return l
    }
    getUri(t) {
        t = Mn(this.defaults, t);
        const n = ja(t.baseURL, t.url);
        return Ba(n, t.params, t.paramsSerializer)
    }
}
E.forEach(["delete", "get", "head", "options"], function(t) {
    Mt.prototype[t] = function(n, r) {
        return this.request(Mn(r || {}, {
            method: t,
            url: n,
            data: (r || {}).data
        }))
    }
});
E.forEach(["post", "put", "patch"], function(t) {
    function n(r) {
        return function(o, i, c) {
            return this.request(Mn(c || {}, {
                method: t,
                headers: r ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: o,
                data: i
            }))
        }
    }
    Mt.prototype[t] = n(), Mt.prototype[t + "Form"] = n(!0)
});
class Js {
    constructor(t) {
        if (typeof t != "function") throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function(o) {
            n = o
        });
        const r = this;
        this.promise.then(s => {
            if (!r._listeners) return;
            let o = r._listeners.length;
            for (; o-- > 0;) r._listeners[o](s);
            r._listeners = null
        }), this.promise.then = s => {
            let o;
            const i = new Promise(c => {
                r.subscribe(c), o = c
            }).then(s);
            return i.cancel = function() {
                r.unsubscribe(o)
            }, i
        }, t(function(o, i, c) {
            r.reason || (r.reason = new qn(o, i, c), n(r.reason))
        })
    }
    throwIfRequested() {
        if (this.reason) throw this.reason
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }
    unsubscribe(t) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1)
    }
    static source() {
        let t;
        return {
            token: new Js(function(s) {
                t = s
            }),
            cancel: t
        }
    }
}

function Xd(e) {
    return function(n) {
        return e.apply(null, n)
    }
}

function Zd(e) {
    return E.isObject(e) && e.isAxiosError === !0
}

function Ka(e) {
    const t = new Mt(e),
        n = Ca(Mt.prototype.request, t);
    return E.extend(n, Mt.prototype, t, {
        allOwnKeys: !0
    }), E.extend(n, t, null, {
        allOwnKeys: !0
    }), n.create = function(s) {
        return Ka(Mn(e, s))
    }, n
}
const Le = Ka(fn);
Le.Axios = Mt;
Le.CanceledError = qn;
Le.CancelToken = Js;
Le.isCancel = Wa;
Le.VERSION = qa;
Le.toFormData = Br;
Le.AxiosError = J;
Le.Cancel = Le.CanceledError;
Le.all = function(t) {
    return Promise.all(t)
};
Le.spread = Xd;
Le.isAxiosError = Zd;
Le.formToJSON = e => Ma(E.isHTMLForm(e) ? new FormData(e) : e);
var rt = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n
};
const dn = e => (jt("data-v-0809058e"), e = e(), Ht(), e),
    eh = {
        class: "page-header"
    },
    th = dn(() => R("img", {
        src: aa,
        alt: ""
    }, null, -1)),
    nh = {
        class: "tabs"
    },
    rh = ["onClick"],
    sh = {
        class: "options n-flex-row n-align-center"
    },
    oh = dn(() => R("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, [R("path", {
        d: "M13.1315 4.6875H2.86897C2.56116 4.6875 2.38929 5.0125 2.57991 5.23438L7.71116 11.1844C7.85804 11.3547 8.14085 11.3547 8.28929 11.1844L13.4205 5.23438C13.6112 5.0125 13.4393 4.6875 13.1315 4.6875Z",
        fill: "white"
    })], -1)),
    ih = dn(() => R("img", {
        src: ca,
        alt: "Google driver"
    }, null, -1)),
    ah = dn(() => R("p", null, "Google driver", -1)),
    ch = [ih, ah],
    lh = dn(() => R("img", {
        src: la,
        alt: "Mega"
    }, null, -1)),
    uh = dn(() => R("p", null, "Mega", -1)),
    fh = [lh, uh],
    dh = {
        class: "page-popup"
    },
    hh = {
        __name: "page-header",
        props: {
            msg: String
        },
        setup(e) {
            const t = Us(),
                n = ze("downloadUrls"),
                r = d => {
                    gtag("event", "conversion", {
                        send_to: "AW-10885895103/-VGCCO3BloMYEL-n5sYo"
                    }), window.open(n[d], "_blank")
                },
                s = () => {
                    window.scrollTo(0, document.body.scrollHeight)
                },
                o = () => {
                    const d = document.createElement("a");
                    d.href = "mailto:deepfutureai@gmail.com", d.click()
                },
                i = () => {
                    window.open("https://discord.com/invite/5yPew6Cy6a", "_blank")
                },
                c = () => {
                    window.open("https://t.me/deepfakelive", "_blank")
                },
                a = Et([{
                    name: "What we do",
                    path: "/home"
                }, {
                    name: "Tutorials and FAQ",
                    path: "/tutorial"
                }, {
                    name: "Pricing",
                    path: "/price"
                }, {
                    name: "Get free credits",
                    path: "/credits"
                }, {
                    name: "Download",
                    path: "",
                    event: r
                }, {
                    name: "Contact",
                    path: "",
                    event: s
                }]),
                l = d => {
                    t.push({
                        path: d
                    }), window.scrollTo(0, 0)
                },
                u = Et(!0),
                h = Et(!1);
            return (d, p) => (z(), $(le, null, [R("div", eh, [th, R("div", nh, [(z(!0), $(le, null, at(a.value, (g, y) => (z(), $("div", {
                class: "item",
                key: y,
                onClick: A => g.event ? g.event() : l(g.path)
            }, ke(g.name), 9, rh))), 128))]), R("div", sh, [R("div", {
                class: "icon mail",
                onClick: o
            }), R("div", {
                class: "icon telegram",
                onClick: c
            }), R("div", {
                class: "icon discord",
                onClick: i
            }), R("div", {
                class: "download n-flex-row n-align-center",
                onMouseenter: p[0] || (p[0] = g => h.value = !0)
            }, [en(" DOWNLOAD "), oh], 32)])]), h.value ? (z(), $("div", {
                key: 0,
                class: "download-popup n-flex-row",
                onMouseleave: p[3] || (p[3] = g => h.value = !1)
            }, [R("div", {
                class: "item n-flex-column n-justify-center n-align-center",
                onClick: p[1] || (p[1] = g => r("googleDriver"))
            }, ch), R("div", {
                class: "item n-flex-column n-justify-center n-align-center",
                onClick: p[2] || (p[2] = g => r("mega"))
            }, fh)], 32)) : hr("", !0), Ln(R("div", dh, [R("div", {
                class: "container n-flex-row n-justify-center n-align-center"
            }, [en(" Join our official Discord to get free credits, receive 24/7 team support, and interact with other members! "), R("div", {
                class: "go",
                onClick: i
            }, "Go!")]), R("div", {
                class: "close",
                onClick: p[4] || (p[4] = g => u.value = !1)
            }, "\xD7")], 512), [
                [Dn, u.value]
            ])], 64))
        }
    };
var ph = rt(hh, [
    ["__scopeId", "data-v-0809058e"]
]);
const Qa = e => (jt("data-v-4b2f2d38"), e = e(), Ht(), e),
    mh = {
        class: "page-footer"
    },
    gh = Qa(() => R("img", {
        src: aa,
        alt: ""
    }, null, -1)),
    yh = Qa(() => R("p", null, "Copyright \xA9 2022. All rights reserved.", -1)),
    vh = ["onClick"],
    bh = dt('<hr data-v-4b2f2d38><p style="color:#fff;font-weight:600;font-size:14px;" id="concact_us" data-v-4b2f2d38> Contact Us </p><div class="connect" data-v-4b2f2d38><a class="icon mail" href="mailto:deepfutureai@gmail.com" data-v-4b2f2d38></a><a class="icon telegram" href="https://t.me/deepfakelive" target="_blank" data-v-4b2f2d38></a><a class="icon discord" href="https://discord.com/invite/5yPew6Cy6a" target="_blank" data-v-4b2f2d38></a></div>', 3),
    wh = jn({
        __name: "page-footer",
        setup(e) {
            const t = Us();
            let n = cn([{
                title: "Privacy Policy",
                path: "/privacy"
            }, {
                title: "Terms of service",
                path: "/service"
            }, {
                title: "Refund Policy",
                path: "/refund"
            }, {
                title: "About",
                path: "/about"
            }]);
            const r = s => {
                t.push({
                    path: s
                }), window.scrollTo(0, 0)
            };
            return (s, o) => (z(), $("div", mh, [gh, yh, R("p", null, [(z(!0), $(le, null, at(Oe(n), (i, c) => (z(), $("a", {
                key: i.title,
                onClick: a => r(i.path)
            }, ke(i.title), 9, vh))), 128))]), bh]))
        }
    });
var Eh = rt(wh, [
    ["__scopeId", "data-v-4b2f2d38"]
]);
const Ah = {
    __name: "App",
    setup(e) {
        return An("downloadUrls", {
            mega: "https://mega.nz/file/0G4FiYTY#8GnUIF5keCuuXSGGYQ1rOuxa6JQ7TF-FEDMbtTRQCpI",
            googleDriver: "https://drive.google.com/file/d/1VLSN3wfCoyjqyqF05FVtNkGWSKYFNQXM/view?usp=drive_link"
        }), (t, n) => {
            const r = ml("router-view");
            return z(), $(le, null, [ve(ph), ve(r), ve(Eh)], 64)
        }
    }
};
var Sh = "data:image/png;base64,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",
    _h = "data:image/png;base64,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",
    Oh = "data:image/png;base64,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",
    Rh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYqSURBVHgB7Z09zxw1EMfHvAgqUtIQIVFAEfEBEB0SBFBERxEiQYH4BJQUSEh08BFSQBEaGlAkiESJxCdIAQUSgoYSKiCsJx7b45e7vTzPc5fz3tz9f1GSZ327e17/PePxzCohAgAAAAAAAAAAAAAAAAAAAOB4cXRAXP6Uea7994/cufq59PUjeISAKSCYMSCYMSCYMSCYMSCYMSCYMSCYMSCYMSCYMSCYMSCYMRZLaj535Qsmw/x6971Fxg4WZgwIZgwIZgwIZgwIZozHaEc2ldXP5NaXs8333nmXDonHN/Rz2+fe9XUDWJgxIJgxIJgxIJgxIJgxdo4St416tsklPnOJ6PNrRFeeJnrqSaI7PxN98kPow180nKVeLjVjYSLW9+8TvfRsEku4+gLRd6Ht8iU6GcwI9vGrVagWafvsGp0MZgS7+vzmz8RFngpmBPv7n82fzVnesWJGsLt/bv5Mgo9TwYxgH96etzJpk0jxVDAj2B8hdH/9ZrCmX9KxCPXTb0Rv3FwmrF+KnfdhIxHRPviaThpkOoxxcPUwK6AeBs4FBDPG0KDjretTfXX1+o34sxyKb3Gc/v72Kzoo3rx9I3eQ0t+khxNx7v83tx6lUQwVzMuTcvO6cfjZ02EzaQfnVqwF3l0eKpgu015nLHUTt55wQEiXUrdS31yIGbSXS9RXhtbDprf/5yhQeGbnxQtyHAAZkaThfodgm3raFGaX9KuIxCpdFjD8GlkbG+sS81M6z46zOL6xqn0+tdbT2kSx1NOkvvagbEm0MOLG+3Fdd4m6T0YwNEr0QTE/sZN1wYeZK65R2tTtTH5/D79tPS32UVxC7mv8ndpYnmMarNjgNYyjRxHzkrXcadSV3Yzbo2fZtp7mS1TU2FP6I/WWxy5lY11iengRK0bE/dR0nXt82EiyeFPd7EH1NN/OrEISz5cNyTgGu8TkBlksjNW1aDs3s/nhs209TbpUXKG6cp/6yj66yqEWNlawYFf60NPEdQBiO+81qt+2nlbW2tA5WWOnvHecZIKJZoM3koMFS4t0iDuiNtGqglhTnrH7dInb1tN0MsXAg6gGH+EZQrvbZ5/nGLyGMemmpg2TyeXN6Z6ffZt6mvdNZEQazqfn4LQrO+KgI61fLNFgsLEUKcoHYyfphdAlqs12tJFiCG1thfUXqQt5vicT08msjQkOSgOh0fwh6ja7N2xzU2HiXWQMds2KDN6HrYTuWSyfTe2g/gHiTAkquqRnPl4gcz1UMJ2tLj9s3IbqEsCa7DksvParsyFZvdwiHmF8eYX6DAdpApjG5+XOA68IlSaVRoy81+zMHOOjxDm4JlRffOW/VMLgFD1qdjwOi7Y3tJ6qT8rmttKYrq2H/TGRpsbU6tP00XqYK9Np9R40lOEWNrcUxM+aY8+ppEErmXLHjQ3q+tfdy3VW6sp3rgtdE5jN9cw5CGrLPakHrtyRaz1vgfrdUHt+7cd/OYXBXBxJGyW2x6Wd161GSNdUm6ruict9+nPXI1K3cle9ZrOX0+/pz73z8hPHWQ9Lm2OO4+QbYWhVtGw2apHxZ1K3mAc+r3/Nzogcd9vxck+N9NqBTq8n8LxLXXUB3GyYqTdOT8b2YRfB6yCzS9n6MuiuBiKU3aFeQzpQrtmw5j0cVUHbAKD1WPWc+L3NOlTPrf3j8gpAuY7rvX3zfeIpOGZ/j7m8UkeiTMviAolKEKAzvw8UuFhYkWAlaKDsrqhzupQDmMZtqnX1/jH1hfI6pveN59cQXu8VzNb1JjuG0YKlcc8re3Zk8ZUBamZ8nd2sgybp4vRaQR3VeIrPn+m1JapsAhS9F2kak9M2PX9Xup57d8j6rkmeFBo5xjXYS3bNFdc9kgUKmDlhyillr5M0jVqOk13vqnTG5yDQZbGa/FbRg5olql7f/sTV07l8L272A7x+UbdOlr7ort9aLvEiSDmixszJFtinpEF8i8rxehCSp31e7zS6LgufrEVlousiw7QeVtJKm8s1nmwx9bv0HK7X9LeIxdfiE/zYbP3QLzsL/P9hZ4N3640BwYwBwYwBwYwBwYwBwYwBwYwBwYwBwYwBwYwBwQAAAAAAAAAAAAAAAAAAAAAAB8N9jUqJA8dW+zMAAAAASUVORK5CYII=";
const Ph = {
        setup() {
            const e = ze("downloadUrls");
            return {
                current: Et(null),
                questions: [{
                    title: "Does it require a graphic accelerator to work?",
                    context: "Yes, RTX 2070+ is recommended. The program is based on machine learning models. For example, face detection in the frame, facial point detection, face replacement. These models require intensive computations, which graphical accelerator can handle tens of times faster than on an ordinary processor."
                }, {
                    title: "How to increase the quality of the picture?",
                    context: "Play with an advanced webcam that supports 1080P, try different lighting in the room, a proper camera angle with head-on frontal view, don\u2019t wear glasses or anything that could cover your face. If you meet all the requirements but still don\u2019t increase the performance of face replacement, please contact us."
                }, {
                    title: "Why doesn't the replaced face look like a celebrity?",
                    context: "PIt depends on how much your face fits the shape of the celebrity's face."
                }, {
                    title: "I want to swap my face to a particular celebrity. What I need to do?",
                    context: "Now here are lots of available ready-to-use faces in face market. You can choose and swap any faces you like from the face market. We will also update the face market and increase new faces. Currently we do not support users upload face images and use them, in the future, if Swapface is widely popular and there are enough users, we will consider adding this feature."
                }, {
                    title: "Why the Swapface is slow in my machine (less than 30 fps)? How to speed it up?",
                    context: "The Swapface is currently the lightest and fastest face replacement program in the world. However, since the program is based on machine learning models, the advanced CPU and GPU is recommended. If the speed in your machine less than 30 fps, please update your machine or using a more powerful machine. You can find the recommended system requirements here."
                }, {
                    title: "Is there a time delay for the Swapface?",
                    context: "The Swapface is currently the lightest and fastest face replacement program in the world. If the system requirements are meet, the program is real time without time delay. If you feel time delay, please change a more powerful machine."
                }],
                toDownload: s => {
                    gtag("event", "conversion", {
                        send_to: "AW-10885895103/-VGCCO3BloMYEL-n5sYo"
                    }), window.open(e[s], "_blank")
                }
            }
        }
    },
    hn = e => (jt("data-v-177796fc"), e = e(), Ht(), e),
    Ch = {
        class: "homePage"
    },
    Th = {
        class: "container"
    },
    Ih = {
        class: "banner"
    },
    Nh = hn(() => R("h5", null, "The most light, hyperrealistic, real-time", -1)),
    xh = hn(() => R("h2", null, "Easy-to-use AI beauty filter tools in the world!", -1)),
    Lh = {
        class: "n-flex-row"
    },
    Fh = {
        class: "download-box n-flex-row"
    },
    kh = hn(() => R("img", {
        src: ca,
        alt: "Google driver"
    }, null, -1)),
    Dh = hn(() => R("p", null, "Google driver", -1)),
    Yh = [kh, Dh],
    Bh = hn(() => R("img", {
        src: la,
        alt: "Mega"
    }, null, -1)),
    Uh = hn(() => R("p", null, "Mega", -1)),
    Mh = [Bh, Uh],
    jh = dt('<div class="cards" data-v-177796fc></div><div class="working" data-v-177796fc><h2 class="title" data-v-177796fc>Benefits of working with Swapface!</h2><div class="items" data-v-177796fc><div class="item" data-v-177796fc><img src="' + Sh + '" alt="" class="cover" data-v-177796fc><div class="right" data-v-177796fc><h5 data-v-177796fc>Easy-to-use</h5><p data-v-177796fc> All you need to do is connecting your camera and clicking the start button on Swapface App, we do the rest. Try it now! </p></div></div><div class="item" data-v-177796fc><img src="' + _h + '" alt="" class="cover" data-v-177796fc><div class="right" data-v-177796fc><h5 data-v-177796fc>Private</h5><p data-v-177796fc> All procedure and data is running in your own machine, so only you have access to your data. </p></div></div><div class="item" data-v-177796fc><img src="' + Oh + '" alt="" class="cover" data-v-177796fc><div class="right" data-v-177796fc><h5 data-v-177796fc>Cost effective</h5><p data-v-177796fc> A mid-range graphics card is enough! <br data-v-177796fc> Time-saving and computationally efficient! </p></div></div><div class="item" data-v-177796fc><img src="' + Rh + '" alt="" class="cover" data-v-177796fc><div class="right" data-v-177796fc><h5 data-v-177796fc>Best performance</h5><p data-v-177796fc> Our technology and Al models create hyperrealistic and natural representations of faces. </p></div></div></div></div>', 2),
    Hh = {
        class: "description"
    },
    Wh = {
        class: "n-flex-row"
    },
    qh = dt('<div class="system" data-v-177796fc><h2 data-v-177796fc>System Requirements</h2><div class="container n-flex-column n-justify-between" data-v-177796fc><div class="list n-flex-row n-justify-between" data-v-177796fc><div class="item" data-v-177796fc><h5 data-v-177796fc>Operating System:</h5><p data-v-177796fc>Windows 10 Anniversary Update or newer</p></div><div class="item" data-v-177796fc></div></div><div class="list n-flex-row n-justify-between" data-v-177796fc><div class="item" data-v-177796fc><h5 data-v-177796fc>Minimum Hardware:</h5><p data-v-177796fc> Intel Core i5 9400 or AMD Ryzen 5 2600 with 8 GB RAM\uFF1B NVIDIA Geforce 1060 or Radeon RX 580 </p></div><div class="item" data-v-177796fc><h5 data-v-177796fc>Recommended Hardware\uFF1A</h5><p data-v-177796fc> Intel Core i5 11400 or AMD Ryzen 5 3600 with 16 GB RAM; NVIDIA Geforce 2070 or Radeon RX 5700 </p></div></div></div></div>', 1);

function Kh(e, t, n, r, s, o) {
    return z(), $("div", Ch, [R("div", Th, [R("div", Ih, [Nh, xh, R("div", Lh, [R("div", {
        class: "download",
        onClick: t[0] || (t[0] = i => r.toDownload("mega"))
    }, "Download for Windows")]), R("div", Fh, [R("div", {
        class: "download-icon item n-flex-column n-justify-center n-align-center",
        onClick: t[1] || (t[1] = i => r.toDownload("googleDriver"))
    }, Yh), R("div", {
        class: "download-icon item n-flex-column n-justify-center n-align-center",
        onClick: t[2] || (t[2] = i => r.toDownload("mega"))
    }, Mh)])]), jh, R("div", Hh, [R("div", Wh, [R("div", {
        class: "download",
        onClick: t[3] || (t[3] = i => r.toDownload("mega"))
    }, "Download for Windows")])]), qh])])
}
var Qh = rt(Ph, [
        ["render", Kh],
        ["__scopeId", "data-v-177796fc"]
    ]),
    zh = "./assets/tutorial.1b91af22.png",
    $h = "./assets/1.dc99c21f.png",
    Vh = "./assets/2.8af07065.png",
    Gh = "./assets/3.39df314d.png",
    Jh = "./assets/1.2e967d72.png",
    Xh = "./assets/2.e9e96318.png";
const za = e => (jt("data-v-1c6f11a4"), e = e(), Ht(), e),
    Zh = {
        class: "tutorial-page"
    },
    ep = {
        class: "container"
    },
    tp = za(() => R("div", {
        class: "row flex head n-align-center"
    }, [R("div", {
        class: "left",
        style: {
            width: "500px",
            height: "auto",
            background: "unset",
            padding: "0",
            margin: "0"
        }
    }, [R("h2", null, "Windows quick setup tutorial"), R("p", null, " Wondering how to make high quality real-time face swap for PC streaming or video calls? Or create any dedicate deepfake videos and images? "), R("p", null, " This tutorial will make it easy for you to create any kinds of deepfake by Swapface! ")]), R("img", {
        src: zh,
        alt: "",
        style: {
            width: "480px"
        }
    })], -1)),
    np = {
        class: "tabs n-flex-row n-justify-center"
    },
    rp = dt('<div class="row" data-v-1c6f11a4><h4 data-v-1c6f11a4>STEP 1</h4><p data-v-1c6f11a4> Before install the software, you need a graphic card and a webcam. If you want to get a perfect face swap live steaming performance, a good webcam which support 1080P and a DirectX12 compatible graphics card (RTX 20+) is recommended. </p><img width="100%" src="' + $h + '" style="max-width:unset;margin-top:40px;border-radius:8px;" data-v-1c6f11a4></div><div class="row" data-v-1c6f11a4><h4 class="second" data-v-1c6f11a4>STEP 2</h4><p data-v-1c6f11a4> Download Windows build exe and run and install to root of any disk. </p><img width="100%" src="' + Vh + '" style="max-width:unset;margin-top:40px;border-radius:8px;" data-v-1c6f11a4></div><div class="row" data-v-1c6f11a4><h4 data-v-1c6f11a4>STEP 3</h4><p data-v-1c6f11a4>Run the program\xA0Swapface.exe file.</p><img width="100%" src="' + Gh + '" style="max-width:unset;margin-top:40px;border-radius:8px;" data-v-1c6f11a4></div><h2 style="margin-top:100px;text-align:center;" data-v-1c6f11a4>Tutorials</h2>', 4),
    sp = dt('<div class="row m" data-v-1c6f11a4><div class="left" data-v-1c6f11a4><h4 data-v-1c6f11a4>STEP 1</h4><p data-v-1c6f11a4> If you don&#39;t have an account, please register first. Enter your email and click the &quot;Send Code&quot; button. You will receive a email with verification code. Enter the verification code to complete the registration. <br data-v-1c6f11a4><br data-v-1c6f11a4> If you get a invitation code from your friends, you can fill it to get a $5 coupon and your daily quota will be increased to 15. </p></div><img src="' + Jh + '" class="right" alt="" data-v-1c6f11a4></div><div class="row m" data-v-1c6f11a4><div class="left" data-v-1c6f11a4><h4 class="second" data-v-1c6f11a4>STEP 2</h4><p data-v-1c6f11a4>Enter your username and password to log into Swapface app.</p></div><img src="' + Xh + '" class="right" alt="" data-v-1c6f11a4></div>', 2),
    op = {
        class: "questions"
    },
    ip = za(() => R("h2", null, "Frequently asked questions?", -1)),
    ap = ["onClick"],
    cp = jn({
        __name: "tutorial",
        setup(e) {
            const t = Et(1);
            let n = Et(null),
                r = [{
                    title: "Does it require a graphic accelerator to work?",
                    context: "Yes, RTX 2070+ is recommended. The program is based on machine learning models. For example, face detection in the frame, facial point detection, face replacement. These models require intensive computations, which graphical accelerator can handle tens of times faster than on an ordinary processor."
                }, {
                    title: "How to increase the quality ?",
                    context: ["For Stream Faceswap, Play with an advanced webcam that supports 1080P, try different lighting in the room, a proper camera angle with head-on frontal view, don't wear glasses or anything that could cover your face.", "For Video/Gif/Image Faceswap, avoid having faces that are at too severe of an angle or obstructed, and low video resolutions can also impact the final result.", "If you meet all the requirements but still don't increase the performance of face replacement, please contact us."]
                }, {
                    title: "What are the differences between Fast Mode, Pro Mode and Expert Mode?",
                    context: ["Fast mode has the fastest processing speed with lower resource consumption. The swapped result is stable.", "Pro mode has the better quality then Fast Mode and requires longer processing time. ", "Expert Mode has the best swap performance with higher resource consumption."]
                }, {
                    title: "Why the Swapface is slow in my machine? How to speed it up?",
                    context: "The Swapface is currently the lightest and fastest face replacement program in the world. However, since the program is based on machine learning models, the advanced CPU and GPU is recommended. If the speed in your machine is too slow, please update your machine or using a more powerful machine. "
                }, {
                    title: "Is there a time delay for the Stream Faceswap?",
                    context: "The Swapface is currently the lightest and fastest face replacement program in the world. If the system requirements are meet, the program is real time without time delay. If you feel delay in live streaming, change a more powerful machine."
                }, {
                    title: "Which live streaming apps do Swapface support?",
                    context: " It is compatiable with almost all live streaming apps which suppot virtual camera, such as Teams, Facebook messenger, Wechat, Omegle, Telegram, Zoom, Twitch, Google meet, Tictok and so on."
                }, {
                    title: "Is Swapface GDPR compliant?",
                    context: "Yes, we are 100% GDPR compliant. "
                }, {
                    title: "What Are the Recommended Files for Making Deepfakes?",
                    context: ["Maximum image resolution: 1920*1920", "Video formats: MP4, MOV", "Image format: .PNG, .JPG, .JPEG", "Frame rate: 25-60", "Maximum image size: 5M", "Maximum video size and length: Unlimited"]
                }, {
                    title: "Does Swapface save my data?",
                    context: "We take privacy very seriously, all the media data is running on your local machine, which is one of the reasons why it's so fast. We only save the uploaded faces to make it more convenient for users to use. You can delete them yourself at any time."
                }, {
                    title: "How to Delete an Account?",
                    context: "We do not have the function of deleting accounts in Swapface app. You can contact customer service and send your registered email to delete your account."
                }];
            return console.log(typeof r[0]), (s, o) => (z(), $("div", Zh, [R("div", ep, [tp, R("div", np, [R("div", {
                class: bt(["item", {
                    active: t.value === 1
                }]),
                onClick: o[0] || (o[0] = i => t.value = 1)
            }, " Install Software ", 2), R("div", {
                class: bt(["item", {
                    active: t.value === 2
                }]),
                onClick: o[1] || (o[1] = i => t.value = 2)
            }, " User Registration ", 2)]), t.value === 1 ? (z(), $(le, {
                key: 0
            }, [rp], 64)) : hr("", !0), t.value === 2 ? (z(), $(le, {
                key: 1
            }, [sp], 64)) : hr("", !0)]), R("div", op, [ip, (z(!0), $(le, null, at(Oe(r), (i, c) => (z(), $("div", {
                class: "item",
                key: c
            }, [R("h5", {
                onClick: a => ge(n) ? n.value = c : n = c,
                class: "n-flex-row n-align-center n-justify-between"
            }, [en(ke(i.title), 1), R("span", {
                class: bt(["icon", {
                    up: Oe(n) === c
                }])
            }, null, 2)], 8, ap), typeof i.context == "string" ? Ln((z(), $("p", {
                key: 0
            }, ke(i.context), 513)), [
                [Dn, Oe(n) === c]
            ]) : (z(!0), $(le, {
                key: 1
            }, at(i.context, (a, l) => Ln((z(), $("p", {
                key: `${l}-${l}`
            }, ke(a), 1)), [
                [Dn, Oe(n) === c]
            ])), 128))]))), 128))])]))
        }
    });
var lp = rt(cp, [
    ["__scopeId", "data-v-1c6f11a4"]
]);
const up = {
        setup() {
            return {}
        }
    },
    fp = {
        class: "privacyPage"
    },
    dp = dt('<div class="container" data-v-4655569f><h2 data-v-4655569f>Privacy Policy</h2><p data-v-4655569f> Last updated: May 1, 2022<br data-v-4655569f><br data-v-4655569f> This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.<br data-v-4655569f><br data-v-4655569f> We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Template. </p><h2 style="margin-bottom:24px;" data-v-4655569f>Interpretation and Definitions</h2><h2 data-v-4655569f>Interpretation</h2><p data-v-4655569f> The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural. </p><h2 data-v-4655569f>Definitions</h2><h5 data-v-4655569f>For the purposes of this Privacy Policy:</h5><p data-v-4655569f> \u2022 Account means a unique account created for You to access our Service or parts of our Service.<br data-v-4655569f> \u2022 Company (referred to as either \u201Cthe Company\u201D, \u201CWe\u201D, \u201CUs\u201D or \u201COur\u201D in this Agreement) refers to swapface.org.<br data-v-4655569f> \u2022 Country refers to: California, United States<br data-v-4655569f> \u2022 Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.<br data-v-4655569f> \u2022 Personal Data is any information that relates to an identified or identifiable individual.<br data-v-4655569f> \u2022 Service refers to the Face Swap AI tools.<br data-v-4655569f> \u2022 Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.<br data-v-4655569f> \u2022 Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of Face Swap Tools).<br data-v-4655569f> \u2022 Website refers to swapface.org, accessible from https://www.swapface.org<br data-v-4655569f> \u2022 You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable. </p><h2 style="margin-bottom:24px;" data-v-4655569f>Collecting and Using Your Personal Data</h2><h2 data-v-4655569f>Types of Data Collected</h2><p data-v-4655569f>We only collect information that is necessary for one or more of our legitimate business functions or activities. The information we collect from our users may include:</p><h2 data-v-4655569f>Personal Data</h2><p data-v-4655569f>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:<br data-v-4655569f><br data-v-4655569f> \u2022 Email address<br data-v-4655569f> \u2022 Usage Data</p><h2 data-v-4655569f>Usage Data</h2><p data-v-4655569f>Usage Data is collected automatically when using the Service.<br data-v-4655569f> When You access the Service by or through a computer,Usage Data may include information such as Your Device\u2019s Internet Protocol address (e.g. IP address), the time and date of Your login in, the time spent on the Service, unique device identifiers and other diagnostic data.</p><h2 data-v-4655569f>Non-collectable information</h2><p data-v-4655569f>All procedure and media data is running in your own machine, so only you have access to them. We do not collect or store any of your media data in any form.</p><h2 data-v-4655569f>Use of Your Personal Data</h2><h5 data-v-4655569f>The Company may use Personal Data for the following purposes:</h5><p data-v-4655569f> \u2022 To provide and maintain our Service, including to monitor the usage of our Service.<br data-v-4655569f> \u2022 To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.<br data-v-4655569f> \u2022 For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.<br data-v-4655569f> \u2022 To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application\u2019s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.<br data-v-4655569f> \u2022 To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.<br data-v-4655569f> \u2022 To manage Your requests: To attend and manage Your requests to Us.<br data-v-4655569f> \u2022 For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.<br data-v-4655569f> \u2022 For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p><h5 data-v-4655569f>We may share Your personal information in the following situations:</h5><p data-v-4655569f> \u2022 With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.<br data-v-4655569f> \u2022 For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company. <br data-v-4655569f> \u2022 With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.<br data-v-4655569f> \u2022 With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.<br data-v-4655569f> \u2022 With Your consent: We may disclose Your personal information for any other purpose with Your consent.</p><h2 style="margin-top:64px;" data-v-4655569f>Retention of Your Personal Data</h2><p data-v-4655569f>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.<br data-v-4655569f><br data-v-4655569f> The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p><h2 data-v-4655569f>Transfer of Your Personal Data</h2><p data-v-4655569f>Your information, including Personal Data, is processed at the Company\u2019s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to \u2014 and maintained on \u2014 computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.<br data-v-4655569f><br data-v-4655569f> Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.<br data-v-4655569f><br data-v-4655569f> The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p><h2 data-v-4655569f>Disclosure of Your Personal Data</h2><h5 data-v-4655569f>Business Transactions</h5><p data-v-4655569f>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p><h5 data-v-4655569f>Law enforcement</h5><p data-v-4655569f>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p><h5 data-v-4655569f>Other legal requirements</h5><p data-v-4655569f> \u2022 Protect and defend the rights or property of the Company<br data-v-4655569f> \u2022 Prevent or investigate possible wrongdoing in connection with the Service<br data-v-4655569f> \u2022 Protect the personal safety of Users of the Service or the public<br data-v-4655569f> \u2022 Protect against legal liability</p><h2 data-v-4655569f>Security of Your Personal Data</h2><p data-v-4655569f>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p><h2 data-v-4655569f>Links to Other Websites</h2><p data-v-4655569f>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party\u2019s site. We strongly advise You to review the Privacy Policy of every site You visit.<br data-v-4655569f><br data-v-4655569f> We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p><h2 data-v-4655569f>Changes to this Privacy Policy</h2><p data-v-4655569f>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.<br data-v-4655569f><br data-v-4655569f> We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the \u201CLast updated\u201D date at the top of this Privacy Policy.<br data-v-4655569f><br data-v-4655569f> You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p><h2 data-v-4655569f>Contact Us</h2><h5 data-v-4655569f>If you have any questions about this Privacy Policy, You can contact us:</h5><p data-v-4655569f>By email: <a href="mailto:support@swapface.org" style="color:#87E6FF;" data-v-4655569f>support@swapface.org</a></p></div>', 1),
    hp = [dp];

function pp(e, t, n, r, s, o) {
    return z(), $("div", fp, hp)
}
var mp = rt(up, [
    ["render", pp],
    ["__scopeId", "data-v-4655569f"]
]);
const gp = {
        setup() {
            return {}
        }
    },
    yp = e => (jt("data-v-74beb812"), e = e(), Ht(), e),
    vp = {
        class: "about-page"
    },
    bp = yp(() => R("div", {
        class: "container"
    }, [R("div", {
        class: "title"
    }), R("div", {
        class: "box"
    }, [R("h2", null, "Values:"), R("p", null, " Our team consists of AI enthusiasts from different countries. Swapface's generative AI technology is a revolution AI tool for content creators of all sorts. "), R("h2", null, "What's next:"), R("p", null, " We'll continue to empower content creation by democratizing complex AI technologies. Generative AI is the future and we plan to lead humanity toward it. ")])], -1)),
    wp = [bp];

function Ep(e, t, n, r, s, o) {
    return z(), $("div", vp, wp)
}
var Ap = rt(gp, [
    ["render", Ep],
    ["__scopeId", "data-v-74beb812"]
]);
const Sp = {
        setup() {
            return {}
        }
    },
    _p = {
        class: "refund-page"
    },
    Op = dt('<div class="container" data-v-025e02ef><div class="title" data-v-025e02ef></div><div class="box" data-v-025e02ef><p data-v-025e02ef> The <span data-v-025e02ef>Refund Policy</span> was updated on [09/04/2023].<br data-v-025e02ef> Thank you for spending at Swapface.org. If you are not completely satisfied with your purchase, we are willing to help.<br data-v-025e02ef> To initiate the refund process, please follow the steps below. </p><h2 data-v-025e02ef>Digital Subscription Products (e.g. Swapface Subscription)</h2><p data-v-025e02ef> If you stop using Swapface but forget to unsubscribe your plan, we will usually be happy to refund your latest subscription payment, as long as you have not created any content since the payment was completed.<br data-v-025e02ef> To request a refund, please send us a refund request via Discord (also works for unsubscribe requests). </p><h2 data-v-025e02ef>Digital products (e.g. Swapface Credits Packs)</h2><p data-v-025e02ef> No refund if any credit pack have been used. We do not offer partial or pro rata refunds.<br data-v-025e02ef><br data-v-025e02ef> You have 7 calendar days from the date of the transaction to apply for the refund. </p><h2 data-v-025e02ef>Non-returnable items</h2><p data-v-025e02ef> \xB7 Official Rewards<br data-v-025e02ef><br data-v-025e02ef> \xB7 Used credits </p><h2 data-v-025e02ef>Refunds (if applicable)</h2><p data-v-025e02ef> Upon receipt of your refund request, our staff will check your membership status to determine if it is eligible for a refund.<br data-v-025e02ef> If you are approved, then your refund will be processed. Refunds will be credited to the original [credit card/payment method] used for the purchase. </p><h2 data-v-025e02ef>Late or missing refunds (if applicable)</h2><p data-v-025e02ef> If you haven&#39;t received a refund yet, first check your bank account again.<br data-v-025e02ef> Then contact your credit card company, it may take some time before your refund is officially posted.<br data-v-025e02ef> Next contact your bank. There is often some processing time before a refund is posted.<br data-v-025e02ef> If you&#39;ve done all of this and you still have not received your refund yet, please contact us via the <a href="mailto:support@swapface.org" data-v-025e02ef>support@swapface.org</a></p><h2 data-v-025e02ef>Contact Us</h2><p data-v-025e02ef> If you need to contact DeepSwap directly, you can reach us at <a href="mailto:support@swapface.org" data-v-025e02ef>support@swapface.org</a>. or Swapface Offical <a href="https://discord.com/invite/5yPew6Cy6a" target="_blank" data-v-025e02ef>Discord</a><span data-v-025e02ef>/</span><a href="https://t.me/deepfakelive" target="_blank" data-v-025e02ef>Telegram</a>. </p></div></div>', 1),
    Rp = [Op];

function Pp(e, t, n, r, s, o) {
    return z(), $("div", _p, Rp)
}
var Cp = rt(Sp, [
    ["render", Pp],
    ["__scopeId", "data-v-025e02ef"]
]);
const Tp = {
        setup() {
            return {}
        }
    },
    Ip = {
        class: "service-page"
    },
    Np = dt('<div class="container" data-v-076cca4d><div class="title" data-v-076cca4d></div><div class="box" data-v-076cca4d><p data-v-076cca4d> This <span data-v-076cca4d>TERMS OF SERVICE</span> was last updated on [09/04/2021].<br data-v-076cca4d> Welcome to Swapface (the \u201CApp\u201D). You are reading the terms of service (the \u201CTOS\u201D), which govern the relationship and serve as an agreement between you and us and set forth the terms and conditions by which you may access and use the APP and our related services. For purposes of the TOS, \u201CYou\u201D and \u201Cyour\u201D means you as the user of the App.<br data-v-076cca4d> By downloading, updating, accessing and/or using the App, you agree to be bound by this TOS. You understand and agree that we will treat your access or use of the APP as acceptance of the TOS and our Privacy Policy. You agree that by downloading the App from our website (swapface.org) or other distribution platforms ( indicated or recognized by us ).You are bound by the respective terms and conditions of such distribution platforms. </p><h2 data-v-076cca4d>1. Description of Services:</h2><p data-v-076cca4d><span data-v-076cca4d>1.1</span> Swapface is a PC face swap application that uses artificial intelligence algorithms to generate a unique content (\u201CServices\u201D). You may use Swapface immediately with registration.<br data-v-076cca4d> To begin with, You may choose a photo or image, GIF or video in your PC or you may also access to video stream from your webcam for further face-swapping processing, and then upload a photo with faces from your PC in the supported format and file size (\u201CUploaded content\u201D). After that, You can click the generating button \u201CStart\u201D or any other similar option. Our artificial intelligence algorithms scan either a GIF or a video or a chosen image or stream, find the faces and instantly swap them into a new object (\u201CGenerated content\u201D). Please note that some functions above may be limited if you are not a paid subscriber.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>1.2</span> Subscription. We retain a right, at our sole discretion to provide some services, which will be available only for paid subscribers. The subscription begins after the initial payment and the payment should be performed via the method and in the amount indicated at the time of the purchase. You are responsible for payment of all fees, charges and taxes (if required by law) related to the transaction. Please note that if You download the App from a distribution platform which is not indicated or recognized by us, we are not responsible for any costs or liability arising from your action.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>1.3</span> Pay as you go. We also support pay as you go for one-off faceswaps. The credits avaliable for use anytime within two years of purchase. </p><h2 data-v-076cca4d>2. Legal Capacity:</h2><p data-v-076cca4d> You understand and warrant that:<br data-v-076cca4d><br data-v-076cca4d> \xB7 a.if You are entering into this TOS on behalf of another person, You are duly authorized by such person to enter into this TOS which will be binding upon both You individually and such other person (and\u201CYou\u201Das used in this TOS shall refer to both);<br data-v-076cca4d><br data-v-076cca4d> \xB7 b.You are of the legal age to form a binding contract with us;<br data-v-076cca4d><br data-v-076cca4d> \xB7 c.if You are under the legal age, You shall access or use our Services under the supervision of a parent or legal guardian who agrees to be bound by these Terms and subjected to the local laws and regulations;<br data-v-076cca4d><br data-v-076cca4d> \xB7 d.You are not a person barred from subscribing to, using or accessing the App under the laws or other applicable jurisdictions. </p><h2 data-v-076cca4d>3. Content:</h2><p data-v-076cca4d><span data-v-076cca4d>3.1</span> We reserve and retain all right, title and interest (including all intellectual property rights) in and to the App and the technology, systems and software used to provide the App. We reserve all rights not expressly granted to You in this TOS. You retain all intellectual property rights in to Uploaded materials and Uploaded content by you that will be modified or processed through the App as well as the Generated content.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>3.2</span> You hereby grant us an irrevocable, worldwide, non-exclusive, royalty-free, sublicensable, assignable right and license to use any content to the App for the purposes of providing the functionality available on the App. You shall be the sole owner of, or otherwise have all requisite rights and licenses to use content and materials.<br data-v-076cca4d> You warrant that the creation, modification or any other use of the content and materials does not infringe or violate any rights of any third party, including any intellectual property rights, data privacy rights, rights of publicity and privacy rights. </p><h2 data-v-076cca4d>4. Restrictions of conduct and content:</h2><p data-v-076cca4d><span data-v-076cca4d>4.1</span> In accessing and using the App, You agree to abide by the following rules, restrictions and limitations:<br data-v-076cca4d> \xB7 a.You will not modify, translate, adapt or reformat the App;<br data-v-076cca4d> \xB7 b.You will not decipher, decompile, disassemble, or reverse-engineer, or otherwise attempt to discover the source code or structure of, the software or materials comprising the App (except where the foregoing is permitted by applicable local law notwithstanding such restrictions, and then only to the extent that such intended activities are disclosed in advance in writing to us);<br data-v-076cca4d> \xB7 c.You will not interfere with or circumvent any security feature of the App or any feature that restricts or enforces limitations on the use of the App;<br data-v-076cca4d> \xB7 d.You will not use the App to gain unauthorized access to our or any third party&#39;s data, systems or networks;<br data-v-076cca4d> \xB7 e.You will not use the App in any manner that could damage, disable, overburden, impair or otherwise interfere with or disrupt our systems and networks, or otherwise interfere with other users&#39; use of the App;<br data-v-076cca4d> \xB7 f.You will not use the App in any way that, in our sole discretion, may expose us and others to liability or damages;<br data-v-076cca4d> \xB7 g.You will not remove, change or obscure any copyright, trademark notice, trademark, hyperlink or other proprietary rights notices contained in the App; and<br data-v-076cca4d> \xB7 h.You will comply with all applicable laws in your access and use of the App, including the laws of your country or district if You live outside of the Hong Kong Special Administrative Region (HKSAR).<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>4.2</span> You shall not upload, share or otherwise transmit to or via the Services any content that:<br data-v-076cca4d> \xB7 a.is unlawful, harmful, libelous, defamatory, obscene, abusive, racially or ethnically offensive, pornographic, indecent, lewd, harassing, threatening, invasive of personal privacy or publicity rights, or otherwise objectionable;<br data-v-076cca4d> \xB7 b.would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party or otherwise create liability or violate any local, state, national or international law;<br data-v-076cca4d> \xB7 c.may infringe any patent, trademark, trade secret, copyright or other intellectual or proprietary right of any third party;<br data-v-076cca4d> \xB7 d.contains any unsolicited promotions, political campaigning, advertising or solicitations;<br data-v-076cca4d> \xB7 e.contains any private or personal information of a third party without such third party\u2019s consent;<br data-v-076cca4d> \xB7 f.may harm or exploit children by exposing them to inappropriate content, asking for personally identifiable details or otherwise;<br data-v-076cca4d> \xB7 g.contains any viruses, corrupted data or other harmful, disruptive or destructive files or content, designed to interrupt, destroy or limit the functionality of the Application;<br data-v-076cca4d> \xB7 h.contains any information or content that you do not have a right to make available under any law or under contractual or fiduciary relationships (e.g., inside information, confidential information received in the context of an employment or a non-disclosure agreement); or<br data-v-076cca4d> \xB7 i.is in our sole judgment, objectionable or that restricts or inhibits any other person from using or enjoying our Services, or that may expose us or others to any harm or liability of any type.<br data-v-076cca4d> We reserves the right, but is not obligated, to reject and/or remove any user content that we believe, in our sole discretion, violates these provisions. If you have noticed any violation of these Terms from your prospective, content of any nature whatsoever, please contact us at support@swapface.org or directly report in the App. </p><h2 data-v-076cca4d>5. Claims of Infringement:</h2><p data-v-076cca4d><span data-v-076cca4d>5.1</span> Copyright<br data-v-076cca4d><br data-v-076cca4d> If You believe in good faith that materials transmitted or created through the App infringe Your copyright, You (or Your agent) may send us a notice requesting that we remove the material or block access to it. Please provide the following information in writing: \xB7 a.an electronic or physical signature of the owner (or person authorized to act on behalf of the owner) of the copyrighted work; \xB7 b.a description of the copyrighted work that You claim has been infringed upon and sufficient information for us to locate such copyrighted work; \xB7 c.Your address, telephone number, and e-mail address; \xB7 d.a statement by You that You have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; \xB7 e.a statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner&#39;s behalf. If You believe in good faith that someone has wrongly filed a notice of copyright infringement against You, You may send us a counter-notice. If you do, we will wait 10-14 days and then re-enable your content unless the copyright owner initiates a legal action against you before then. Our counter-notice form, set forth below, is consistent with the form suggested by the DMCA statute, which can be found at the U.S. Copyright Office\u2019s official website:http://www.copyright.gov. There is no specific time limit for submitting a counter-notice, but you should not delay unreasonably in doing so. Notices and counter-notices should be sent to us via email at:support@swapface.org.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>5.2</span> Other rights If You believe in good faith that materials in or to the App infringe Your other rights, You (or Your agent) may send us a notice requesting that we remove the material or block access to it. Please provide relevant information that could prove basic facts of the infringement in writing when You contact us.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>5.3</span> We have the right to suspend or terminate the use of the App by anyone engaged in suspected repeated any infringement involved above. </p><h2 data-v-076cca4d>6. Indemnification:</h2><p data-v-076cca4d> You agree to indemnify and hold us and our officers, directors, shareholders and employees harmless from and against any loss, costs, liabilities and expenses (including, but not limited to, attorneys&#39; fees and expenses) resulting from Your breach of this TOS, Your use of the App, Content, and any infringement by You of any intellectual property or other right of any third party. </p><h2 data-v-076cca4d>7. Disclaimers; Limitation of Liability:</h2><p data-v-076cca4d> THE APP IS PROVIDED TO YOU ON AN &quot;AS-IS&quot; AND &quot;AS AVAILABLE&quot; BASIS AND THE USE THEREOF IS AT YOUR SOLE RISK. WE MAKE NO, AND HEREBY DISCLAIM, ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, SATISFACTORY QUALITY, NONINFRINGEMENT, AND TITLE WITH RESPECT TO THE APP, TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW.<br data-v-076cca4d> WE DO NOT WARRANT THAT: (A) THE APP (OR THE RESULTS OBTAINED FROM THE USE THEREOF) WILL BE TIMELY, ERROR-FREE, SECURE OR UNINTERRUPTED; (B) THE APP MEET YOUR REQUIREMENTS; OR (C) ANY ERRORS OR MALFUNCTIONS IN THE APP WILL BE CORRECTED.<br data-v-076cca4d> WE SHALL IN NO EVENT BE RESPONSIBLE OR LIABLE TO YOU OR TO ANY THIRD PARTY, WHETHER UNDER CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, INDEMNITY OR OTHER THEORY, FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY, LIQUIDATED OR PUNITIVE DAMAGES OR ANY OTHER DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFIT, REVENUE OR BUSINESS, COST OF SUBSTITUTE PROCUREMENT, ARISING IN WHOLE OR IN PART FROM YOUR USE OF (OR INABILITY TO USE) THE APP, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. UNDER NO CIRCUMSTANCES SHALL WE BE HELD LIABLE FOR ANY DELAY OR FAILURE IN PERFORMANCE RESULTING DIRECTLY OR INDIRECTLY FROM ANY CAUSES BEYOND ITS REASONABLE CONTROL. IF ANY OF THE FOREGOING LIMITATIONS ARE FOUND TO BE INVALID, OUR AGGREGATE LIABILITY FOR ALL CAUSES OF ACTION, DAMAGES, EXPENSES AND LOSSES OF ANY KIND AND NATURE WHATSOEVER SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY APPLICABLE LAW. </p><h2 data-v-076cca4d>8. Governing Law; Dispute Resolution:</h2><p data-v-076cca4d> This TOS shall be governed by and construed in accordance with the internal laws of Hong Kong Special Administrative Region (HKSAR) without giving effect to its conflict of law\u2019s provisions, regardless of your location.<br data-v-076cca4d> Any dispute arising out of or in connection with the TOS, including any question regarding existence, validity or termination of the TOS, shall be referred to and finally resolved by the courts of HKSAR. The parties specifically disclaim application of the Convention on Contracts for the International Sale of Goods. </p><h2 data-v-076cca4d>9. Changes to this TOS:</h2><p data-v-076cca4d><span data-v-076cca4d>9.1</span> We reserve the right to update or make changes to this TOS from time to time in our sole discretion, and we may notify You of changes by making the revised version of this TOS accessible through the App, which changes will become effective immediately. Please return to this TOS periodically to ensure familiarity with the latest version of this TOS, so that You can determine when this TOS was last revised by referring to the \u201CDate of Revision\u201D at the top of this TOS. Your continued access or use of the App after any changes to this TOS have been posted means Your agreement and consent to such changes.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>9.2</span> We reserve the right to change the Services scope listed herein and change charging standard applicable to the Services at any time for any reason in our sole discretion and without notice. We are entitled to stop or restrict provision of the Services in full or in part toward a certain user. We retain powers to discontinue provision and/or support of the Services without any prior notice. </p><h2 data-v-076cca4d>10. Termination; Assignment:</h2><p data-v-076cca4d><span data-v-076cca4d>10.1</span> This TOS will continue in effect until terminated by either You or us as set out below. You may terminate this TOS at any time by ceasing Your access and use of the App. In the case that you are a subscriber to us, the subsequent processing of fees shall be subject to the respective rules of the Apple Store and Google Play or other distribution platforms (indicated or recognized by us). We may terminate this TOS and your right to access or use the App, with or without notice to you, for any reason, including suspected breach of this TOS by You. Upon any termination of this TOS, Sections 3, 5, 6, 7, 8, 9, 10,11and 12 will survive.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>10.2</span> We reserve and retain the rights to assign, transfer or subcontract the Services to any third parties. Notice will be posted on the APP and your continuing use or update of the APP means your consent to such assignment. </p><h2 data-v-076cca4d>11. Miscellaneous:</h2><p data-v-076cca4d><span data-v-076cca4d>11.1</span> If any provision of this TOS is found to be unlawful, void or for any reason unenforceable, that provision will not affect the validity and enforceability of any remaining provision and such provision will be enforced to the maximum extent possible so as to effect the intent of the parties.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>11.2</span> This TOS, together with the Privacy Policy and other published policies, constitute the entire agreement between We and You pertaining to any and all access and use of the App and supersede any and all prior or contemporaneous written or oral agreements between us and You pertaining thereto. No amendment or waiver of this TOS will be binding on us unless set forth in a writing expressly identifying this TOS and signed by us and You.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>11.3</span> Any caption, heading or section title contained herein is inserted only as a matter of convenience, and in no way defines or explains any section or provision hereof.<br data-v-076cca4d><br data-v-076cca4d><span data-v-076cca4d>11.4</span> We will collect and process your information and technical data in accordance with the Privacy Policy. </p><h2 data-v-076cca4d>12.Contact Us</h2><p data-v-076cca4d> If You have any questions regarding the use of the App or this TOS, please contact us at <a href="mailto:support@swapface.org" data-v-076cca4d>support@swapface.org</a>. </p></div></div>', 1),
    xp = [Np];

function Lp(e, t, n, r, s, o) {
    return z(), $("div", Ip, xp)
}
var Fp = rt(Tp, [
    ["render", Lp],
    ["__scopeId", "data-v-076cca4d"]
]);
const pn = e => (jt("data-v-f52f98f4"), e = e(), Ht(), e),
    kp = {
        class: "price-page"
    },
    Dp = {
        class: "n-flex-row n-justify-between n-flex-1",
        style: {
            "margin-top": "40px",
            width: "96%",
            "max-width": "1920px"
        }
    },
    Yp = pn(() => R("div", {
        class: "bar"
    }, null, -1)),
    Bp = {
        key: 1,
        class: "item",
        style: {
            "text-align": "center"
        }
    },
    Up = pn(() => R("div", {
        class: "line"
    }, null, -1)),
    Mp = {
        class: "lists n-flex-column"
    },
    jp = pn(() => R("span", {
        class: "icon"
    }, null, -1)),
    Hp = {
        key: 0,
        class: "tips"
    },
    Wp = {
        class: "questions"
    },
    qp = pn(() => R("h2", null, "Frequently asked questions?", -1)),
    Kp = ["onClick"],
    Qp = pn(() => R("h2", null, "Invite others to get free trial!", -1)),
    zp = pn(() => R("p", null, " Hi Swapface users, you earn free credits by promote Swapface, such as invite your friend or feature it in social media. ", -1)),
    $p = jn({
        __name: "price",
        setup(e) {
            const t = Us(),
                n = [{
                    name: "Free",
                    description: "",
                    type: 0,
                    products: [],
                    rights: ["Watermark", "10 image faces upload per day", "10 video faces upload per day", "10 stream faces upload per day", "10 image faceswap per day", "10 video faceswap per day", "10 stream faceswap per day"]
                }, {
                    id: "",
                    name: "Pay as you go",
                    description: "balabala",
                    products: [{
                        price: "$9.9",
                        value: "40 credits"
                    }, {
                        price: "$19.0",
                        value: "100 credits"
                    }, {
                        price: "$49.0",
                        value: "500 credits"
                    }],
                    type: 1,
                    rights: ["No watermark", "Only for Image and video faceswap", "1 image faceswap = 1 credit", "1 video faceswap = 4 credits", "Pro mode for image faceswap", "Pro mode for video faceswap", "Expert mode for image faceswap", "Expert mode for video faceswap", "Nvidia GPU acceleration(Over 2x)"]
                }, {
                    id: "10498885499748384",
                    name: "Pro Plan",
                    description: "",
                    type: 0,
                    products: [{
                        price: "$29.0",
                        value: "monthly"
                    }, {
                        price: "$290.0",
                        value: "yearly"
                    }],
                    rights: ["No Watermark", "Unlimited image faces upload", "Unlimited video faces upload", "Unlimited stream faces upload", "30 image faceswap per day", "30 video faceswap per day", "Unlimited stream faceswap per day", "Pro mode for video faceswap", "Pro mode for image faceswap", "Expert mode for image faceswap", "Expert mode for video faceswap", "HD MP4 for video faceswap", "Fast mode for stream faceswap", "Nvidia GPU acceleration(Over 2x)"]
                }, {
                    id: "10498885499748368",
                    name: "Advance Plan",
                    description: "",
                    type: 0,
                    products: [{
                        price: "$49.0",
                        value: "monthly"
                    }, {
                        price: "$499.0",
                        value: "yearly"
                    }],
                    rights: ["No Watermark", "Unlimited image faces upload", "Unlimited video faces upload", "Unlimited stream faces upload", "70 image faceswap per day", "70 video faceswap per day", "Unlimited stream faceswap per day", "Pro mode for video faceswap", "Pro mode for image faceswap", "Expert mode for image faceswap", "Expert mode for video faceswap", "HD MP4 for video faceswap", "Fast mode for stream faceswap", "Nvidia GPU acceleration(Over 2x)"]
                }, {
                    id: "10498885499748357",
                    name: "Enterprise Plan",
                    description: "",
                    type: 0,
                    products: [{
                        price: "$99.0",
                        value: "monthly"
                    }, {
                        price: "$990.0",
                        value: "yearly"
                    }],
                    rights: ["No Watermark", "Unlimited image faces upload", "Unlimited video faces upload", "Unlimited stream faces upload", "200 image faceswap per day", "200 video faceswap per day", "Unlimited stream faceswap per day", "Pro mode for video faceswap", "Pro mode for image faceswap", "Expert mode for image faceswap", "Expert mode for video faceswap", "HD MP4 for video faceswap", "Fast mode for stream faceswap", "Pro mode for stream faceswap", "Nvidia GPU acceleration(Over 2x)", "High Priority Support", "Suitable for live streaming"]
                }];
            let r = Et(null),
                s = [{
                    title: "Should I get Pay-as-you-go or a subscription?",
                    context: "For one-off faceswap needs, pay as you go are a great option. For larger or ongoing faceswap needs, you'll benefit from huge savings with a subscription."
                }, {
                    title: "Can I cancel my subscription?",
                    context: ["Yes, you can cancel your subscription any time. ", "1.	Cancel via Swapface: ", ' Sign in Swapface App > My > Account plan> click the "Turn off Auto-renewal"', "2.	Unsubscribe via PayPal Activity Management: ", " Activity >select the Recurring payment to Swapface > check the Transaction details > click View Recurring Payment Details> manage automatic payments> select cancel"]
                }, {
                    title: "What payment methods do you support?",
                    context: "We support PayPal."
                }, {
                    title: "Can I change my subscription plan?",
                    context: ["Yes, you can change your subscription any time. ", 'For upgrade plan: Sign in Swapface App > My > Account plan> click the "Change Plan" ']
                }, {
                    title: "How to get a refund?",
                    context: "If it is for other reasons or if you insist on a refund, please refer to our Refund Policy."
                }];
            const o = () => {
                t.push({
                    path: "/credits"
                }), window.scrollTo(0, 0)
            };
            return (i, c) => (z(), $("div", kp, [R("div", Dp, [(z(), $(le, null, at(n, (a, l) => R("div", {
                class: "card n-flex-column",
                key: l
            }, [R("h5", null, ke(a.name), 1), Yp, R("div", {
                class: bt(["price n-flex-row n-wrap-wrap n-align-center", {
                    "n-justify-center": a.products.length === 0
                }])
            }, [a.products.length ? (z(!0), $(le, {
                key: 0
            }, at(a.products, (u, h) => (z(), $("div", {
                key: h,
                class: "item"
            }, [en(ke(u.price) + "/", 1), R("span", {
                style: yr(a.id === "" ? "color: #87E6FF;" : "")
            }, ke(u.value), 5)]))), 128)) : (z(), $("div", Bp, "$0.0"))], 2), Up, R("div", Mp, [(z(!0), $(le, null, at(a.rights, (u, h) => (z(), $("div", {
                class: "n-flex-row n-align-center item",
                key: h
            }, [jp, R("p", null, ke(u), 1)]))), 128))]), a.type === 1 ? (z(), $("div", Hp, " Credits cannot be used for stream faceswap. If you want to create faceswap for live streaming or video calls, please subscribe to other plan. ")) : hr("", !0)])), 64))]), R("div", Wp, [qp, (z(!0), $(le, null, at(Oe(s), (a, l) => (z(), $("div", {
                class: "item",
                key: l
            }, [R("h5", {
                onClick: u => ge(r) ? r.value = l : r = l,
                class: "n-flex-row n-align-center n-justify-between"
            }, [en(ke(a.title), 1), R("span", {
                class: bt(["icon", {
                    up: Oe(r) === l
                }])
            }, null, 2)], 8, Kp), typeof a.context == "string" ? Ln((z(), $("p", {
                key: 0
            }, ke(a.context), 513)), [
                [Dn, Oe(r) === l]
            ]) : (z(!0), $(le, {
                key: 1
            }, at(a.context, (u, h) => Ln((z(), $("p", {
                key: `${h}-${h}`
            }, ke(u), 1)), [
                [Dn, Oe(r) === l]
            ])), 128))]))), 128))]), R("div", {
                class: "questions"
            }, [Qp, R("div", {
                class: "box"
            }, [zp, R("div", {
                class: "n-btn",
                onClick: o
            }, "Get free credits")])])]))
        }
    });
var Vp = rt($p, [
        ["__scopeId", "data-v-f52f98f4"]
    ]),
    Gp = "./assets/pic4.53095080.png";
const Jp = {
        setup() {
            return {
                goDiscord: () => {
                    window.open("https://discord.com/invite/5yPew6Cy6a", "_blank")
                }
            }
        }
    },
    $a = e => (jt("data-v-5518df3c"), e = e(), Ht(), e),
    Xp = {
        class: "credits-page"
    },
    Zp = dt('<div class="container" data-v-5518df3c><div class="title" data-v-5518df3c>Invite others to get free credits!</div><div class="box" data-v-5518df3c><p data-v-5518df3c> Hi Swapface users, you earn free credits by promote Swapface, such as invite your friend or feature it in social media. </p></div></div><div class="cards" data-v-5518df3c><div class="card" data-v-5518df3c><div class="cover" data-v-5518df3c><h2 data-v-5518df3c>Just a few steps to get free credits</h2><img src="' + Gp + '" alt="" data-v-5518df3c></div><div class="detail" data-v-5518df3c><div class="inner" data-v-5518df3c><h2 data-v-5518df3c>01.</h2><p data-v-5518df3c> Sign in Swapface app and copy your invitation code (in My part). </p><h2 data-v-5518df3c>02.</h2><p data-v-5518df3c>Send your invitation code to your friends.</p><h2 data-v-5518df3c>03.</h2><p data-v-5518df3c> If your friends sign up with your invitation code, they will get a 5$ coupon, and their daily quota will be increased to 15. </p><h2 data-v-5518df3c>04.</h2><p data-v-5518df3c> If your friend successful subscribe and pay Swapface, you wll get 40 free credits. </p><h2 data-v-5518df3c>05.</h2><p data-v-5518df3c> The rewards are cumulative,which means the more friends you invite, the more credits you get. </p></div></div></div></div>', 2),
    em = {
        class: "n-flex-row n-justify-between tips"
    },
    tm = $a(() => R("div", {
        class: "item"
    }, [R("h2", null, "Tips:"), R("p", null, " You can promote Swapface in social media, for example, post in Whatsapp, facebook, twitter, youtube, instgram, tictok, reddit, quora, or any forum where have lots of potential faceswap users, introduct Swapface and add your invitation code, that could bring you lots of traffic and earn endless free credits. ")], -1)),
    nm = {
        class: "item icon n-flex-column n-justify-between"
    },
    rm = $a(() => R("h5", null, " Don't forget to join Swapface offical Discord to participate in various activities to earn free trail. ", -1)),
    sm = {
        class: "n-flex-row n-justify-end"
    };

function om(e, t, n, r, s, o) {
    return z(), $("div", Xp, [Zp, R("div", em, [tm, R("div", nm, [rm, R("div", sm, [R("a", {
        class: "btn",
        onClick: t[0] || (t[0] = (...i) => r.goDiscord && r.goDiscord(...i))
    }, "JOIN")])])])])
}
var im = rt(Jp, [
    ["render", om],
    ["__scopeId", "data-v-5518df3c"]
]);
const am = [{
        name: "home",
        path: "/home",
        component: Qh
    }, {
        name: "tutorial",
        path: "/tutorial",
        component: lp
    }, {
        name: "privacy",
        path: "/privacy",
        component: mp
    }, {
        name: "service",
        path: "/service",
        component: Fp
    }, {
        name: "refund",
        path: "/refund",
        component: Cp
    }, {
        name: "about",
        path: "/about",
        component: Ap
    }, {
        name: "price",
        path: "/price",
        component: Vp
    }, {
        name: "credits",
        path: "/credits",
        component: im
    }, {
        path: "/:catchAll(.*)",
        redirect: {
            name: "home"
        }
    }],
    cm = _f({
        routes: am,
        history: Uu()
    });
bu(Ah).use(cm).mount("#app");