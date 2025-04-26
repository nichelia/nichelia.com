function qo(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let o = 0; o < r.length; o++)
        n[r[o]] = !0;
    return t ? o => !!n[o.toLowerCase()] : o => !!n[o]
}
function on(e) {
    if (Y(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                o = ke(r) ? Ul(r) : on(r);
            if (o)
                for (const i in o)
                    t[i] = o[i]
        }
        return t
    } else {
        if (ke(e))
            return e;
        if (be(e))
            return e
    }
}
const Nl = /;(?![^(]*\))/g,
    jl = /:([^]+)/,
    Vl = /\/\*.*?\*\//gs;
function Ul(e) {
    const t = {};
    return e.replace(Vl, "").split(Nl).forEach(n => {
        if (n) {
            const r = n.split(jl);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}
function vt(e) {
    let t = "";
    if (ke(e))
        t = e;
    else if (Y(e))
        for (let n = 0; n < e.length; n++) {
            const r = vt(e[n]);
            r && (t += r + " ")
        }
    else if (be(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
const Wl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Kl = qo(Wl);
function qi(e) {
    return !!e || e === ""
}
const uo = e => ke(e) ? e : e == null ? "" : Y(e) || be(e) && (e.toString === Gi || !J(e.toString)) ? JSON.stringify(e, zi, 2) : String(e),
    zi = (e, t) => t && t.__v_isRef ? zi(e, t.value) : hn(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})
    } : Zi(t) ? {
        [`Set(${t.size})`]: [...t.values()]
    } : be(t) && !Y(t) && !Xi(t) ? String(t) : t,
    ye = {},
    pn = [],
    pt = () => {},
    ql = () => !1,
    zl = /^on[^a-z]/,
    nr = e => zl.test(e),
    zo = e => e.startsWith("onUpdate:"),
    Oe = Object.assign,
    Zo = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    Zl = Object.prototype.hasOwnProperty,
    ae = (e, t) => Zl.call(e, t),
    Y = Array.isArray,
    hn = e => rr(e) === "[object Map]",
    Zi = e => rr(e) === "[object Set]",
    Gl = e => rr(e) === "[object RegExp]",
    J = e => typeof e == "function",
    ke = e => typeof e == "string",
    Go = e => typeof e == "symbol",
    be = e => e !== null && typeof e == "object",
    Xo = e => be(e) && J(e.then) && J(e.catch),
    Gi = Object.prototype.toString,
    rr = e => Gi.call(e),
    Xl = e => rr(e).slice(8, -1),
    Xi = e => rr(e) === "[object Object]",
    Yo = e => ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Dn = qo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Lr = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    Yl = /-(\w)/g,
    yt = Lr(e => e.replace(Yl, (t, n) => n ? n.toUpperCase() : "")),
    Ql = /\B([A-Z])/g,
    Cn = Lr(e => e.replace(Ql, "-$1").toLowerCase()),
    Ir = Lr(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Kr = Lr(e => e ? `on${Ir(e)}` : ""),
    Zn = (e, t) => !Object.is(e, t),
    Nn = (e, t) => {
        for (let n = 0; n < e.length; n++)
            e[n](t)
    },
    br = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    Jl = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    },
    Yi = e => {
        const t = ke(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t
    };
let Ls;
const ec = () => Ls || (Ls = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let ut;
class tc {
    constructor(t=!1)
    {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = ut,
        !t && ut && (this.index = (ut.scopes || (ut.scopes = [])).push(this) - 1)
    }
    get active()
    {
        return this._active
    }
    run(t)
    {
        if (this._active) {
            const n = ut;
            try {
                return ut = this, t()
            } finally {
                ut = n
            }
        }
    }
    on()
    {
        ut = this
    }
    off()
    {
        ut = this.parent
    }
    stop(t)
    {
        if (this._active) {
            let n,
                r;
            for (n = 0, r = this.effects.length; n < r; n++)
                this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0, r = this.scopes.length; n < r; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function nc(e, t=ut) {
    t && t.active && t.effects.push(e)
}
function rc() {
    return ut
}
const Qo = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    },
    Qi = e => (e.w & Kt) > 0,
    Ji = e => (e.n & Kt) > 0,
    oc = ({deps: e}) => {
        if (e.length)
            for (let t = 0; t < e.length; t++)
                e[t].w |= Kt
    },
    sc = e => {
        const {deps: t} = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const o = t[r];
                Qi(o) && !Ji(o) ? o.delete(e) : t[n++] = o,
                o.w &= ~Kt,
                o.n &= ~Kt
            }
            t.length = n
        }
    },
    wr = new WeakMap;
let Fn = 0,
    Kt = 1;
const fo = 30;
let ft;
const tn = Symbol(""),
    po = Symbol("");
class Jo {
    constructor(t, n=null, r)
    {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        nc(this, r)
    }
    run()
    {
        if (!this.active)
            return this.fn();
        let t = ft,
            n = jt;
        for (; t;) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = ft, ft = this, jt = !0, Kt = 1 << ++Fn, Fn <= fo ? oc(this) : Is(this), this.fn()
        } finally {
            Fn <= fo && sc(this),
            Kt = 1 << --Fn,
            ft = this.parent,
            jt = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop()
    {
        ft === this ? this.deferStop = !0 : this.active && (Is(this), this.onStop && this.onStop(), this.active = !1)
    }
}
function Is(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let jt = !0;
const ea = [];
function kn() {
    ea.push(jt),
    jt = !1
}
function Sn() {
    const e = ea.pop();
    jt = e === void 0 ? !0 : e
}
function Ne(e, t, n) {
    if (jt && ft) {
        let r = wr.get(e);
        r || wr.set(e, r = new Map);
        let o = r.get(n);
        o || r.set(n, o = Qo()),
        ta(o)
    }
}
function ta(e, t) {
    let n = !1;
    Fn <= fo ? Ji(e) || (e.n |= Kt, n = !Qi(e)) : n = !e.has(ft),
    n && (e.add(ft), ft.deps.push(e))
}
function St(e, t, n, r, o, i) {
    const a = wr.get(e);
    if (!a)
        return;
    let c = [];
    if (t === "clear")
        c = [...a.values()];
    else if (n === "length" && Y(e)) {
        const u = Number(r);
        a.forEach((f, _) => {
            (_ === "length" || _ >= u) && c.push(f)
        })
    } else
        switch (n !== void 0 && c.push(a.get(n)), t) {
        case "add":
            Y(e) ? Yo(n) && c.push(a.get("length")) : (c.push(a.get(tn)), hn(e) && c.push(a.get(po)));
            break;
        case "delete":
            Y(e) || (c.push(a.get(tn)), hn(e) && c.push(a.get(po)));
            break;
        case "set":
            hn(e) && c.push(a.get(tn));
            break
        }
    if (c.length === 1)
        c[0] && ho(c[0]);
    else {
        const u = [];
        for (const f of c)
            f && u.push(...f);
        ho(Qo(u))
    }
}
function ho(e, t) {
    const n = Y(e) ? e : [...e];
    for (const r of n)
        r.computed && $s(r);
    for (const r of n)
        r.computed || $s(r)
}
function $s(e, t) {
    (e !== ft || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function ic(e, t) {
    var n;
    return (n = wr.get(e)) === null || n === void 0 ? void 0 : n.get(t)
}
const ac = qo("__proto__,__v_isRef,__isVue"),
    na = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Go)),
    lc = es(),
    cc = es(!1, !0),
    uc = es(!0),
    Fs = fc();
function fc() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const r = ce(this);
            for (let i = 0, a = this.length; i < a; i++)
                Ne(r, "get", i + "");
            const o = r[t](...n);
            return o === -1 || o === !1 ? r[t](...n.map(ce)) : o
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            kn();
            const r = ce(this)[t].apply(this, n);
            return Sn(), r
        }
    }), e
}
function dc(e) {
    const t = ce(this);
    return Ne(t, "has", e), t.hasOwnProperty(e)
}
function es(e=!1, t=!1) {
    return function(r, o, i) {
        if (o === "__v_isReactive")
            return !e;
        if (o === "__v_isReadonly")
            return e;
        if (o === "__v_isShallow")
            return t;
        if (o === "__v_raw" && i === (e ? t ? xc : aa : t ? ia : sa).get(r))
            return r;
        const a = Y(r);
        if (!e) {
            if (a && ae(Fs, o))
                return Reflect.get(Fs, o, i);
            if (o === "hasOwnProperty")
                return dc
        }
        const c = Reflect.get(r, o, i);
        return (Go(o) ? na.has(o) : ac(o)) || (e || Ne(r, "get", o), t) ? c : Pe(c) ? a && Yo(o) ? c : c.value : be(c) ? e ? la(c) : bt(c) : c
    }
}
const pc = ra(),
    hc = ra(!0);
function ra(e=!1) {
    return function(n, r, o, i) {
        let a = n[r];
        if (rn(a) && Pe(a) && !Pe(o))
            return !1;
        if (!e && (!Tr(o) && !rn(o) && (a = ce(a), o = ce(o)), !Y(n) && Pe(a) && !Pe(o)))
            return a.value = o, !0;
        const c = Y(n) && Yo(r) ? Number(r) < n.length : ae(n, r),
            u = Reflect.set(n, r, o, i);
        return n === ce(i) && (c ? Zn(o, a) && St(n, "set", r, o) : St(n, "add", r, o)), u
    }
}
function _c(e, t) {
    const n = ae(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && St(e, "delete", t, void 0), r
}
function mc(e, t) {
    const n = Reflect.has(e, t);
    return (!Go(t) || !na.has(t)) && Ne(e, "has", t), n
}
function gc(e) {
    return Ne(e, "iterate", Y(e) ? "length" : tn), Reflect.ownKeys(e)
}
const oa = {
        get: lc,
        set: pc,
        deleteProperty: _c,
        has: mc,
        ownKeys: gc
    },
    vc = {
        get: uc,
        set(e, t) {
            return !0
        },
        deleteProperty(e, t) {
            return !0
        }
    },
    yc = Oe({}, oa, {
        get: cc,
        set: hc
    }),
    ts = e => e,
    $r = e => Reflect.getPrototypeOf(e);
function lr(e, t, n=!1, r=!1) {
    e = e.__v_raw;
    const o = ce(e),
        i = ce(t);
    n || (t !== i && Ne(o, "get", t), Ne(o, "get", i));
    const {has: a} = $r(o),
        c = r ? ts : n ? os : Gn;
    if (a.call(o, t))
        return c(e.get(t));
    if (a.call(o, i))
        return c(e.get(i));
    e !== o && e.get(t)
}
function cr(e, t=!1) {
    const n = this.__v_raw,
        r = ce(n),
        o = ce(e);
    return t || (e !== o && Ne(r, "has", e), Ne(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o)
}
function ur(e, t=!1) {
    return e = e.__v_raw, !t && Ne(ce(e), "iterate", tn), Reflect.get(e, "size", e)
}
function Bs(e) {
    e = ce(e);
    const t = ce(this);
    return $r(t).has.call(t, e) || (t.add(e), St(t, "add", e, e)), this
}
function Ds(e, t) {
    t = ce(t);
    const n = ce(this),
        {has: r, get: o} = $r(n);
    let i = r.call(n, e);
    i || (e = ce(e), i = r.call(n, e));
    const a = o.call(n, e);
    return n.set(e, t), i ? Zn(t, a) && St(n, "set", e, t) : St(n, "add", e, t), this
}
function Ns(e) {
    const t = ce(this),
        {has: n, get: r} = $r(t);
    let o = n.call(t, e);
    o || (e = ce(e), o = n.call(t, e)),
    r && r.call(t, e);
    const i = t.delete(e);
    return o && St(t, "delete", e, void 0), i
}
function js() {
    const e = ce(this),
        t = e.size !== 0,
        n = e.clear();
    return t && St(e, "clear", void 0, void 0), n
}
function fr(e, t) {
    return function(r, o) {
        const i = this,
            a = i.__v_raw,
            c = ce(a),
            u = t ? ts : e ? os : Gn;
        return !e && Ne(c, "iterate", tn), a.forEach((f, _) => r.call(o, u(f), u(_), i))
    }
}
function dr(e, t, n) {
    return function(...r) {
        const o = this.__v_raw,
            i = ce(o),
            a = hn(i),
            c = e === "entries" || e === Symbol.iterator && a,
            u = e === "keys" && a,
            f = o[e](...r),
            _ = n ? ts : t ? os : Gn;
        return !t && Ne(i, "iterate", u ? po : tn), {
            next() {
                const {value: s, done: l} = f.next();
                return l ? {
                    value: s,
                    done: l
                } : {
                    value: c ? [_(s[0]), _(s[1])] : _(s),
                    done: l
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function Ht(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function bc() {
    const e = {
            get(i) {
                return lr(this, i)
            },
            get size() {
                return ur(this)
            },
            has: cr,
            add: Bs,
            set: Ds,
            delete: Ns,
            clear: js,
            forEach: fr(!1, !1)
        },
        t = {
            get(i) {
                return lr(this, i, !1, !0)
            },
            get size() {
                return ur(this)
            },
            has: cr,
            add: Bs,
            set: Ds,
            delete: Ns,
            clear: js,
            forEach: fr(!1, !0)
        },
        n = {
            get(i) {
                return lr(this, i, !0)
            },
            get size() {
                return ur(this, !0)
            },
            has(i) {
                return cr.call(this, i, !0)
            },
            add: Ht("add"),
            set: Ht("set"),
            delete: Ht("delete"),
            clear: Ht("clear"),
            forEach: fr(!0, !1)
        },
        r = {
            get(i) {
                return lr(this, i, !0, !0)
            },
            get size() {
                return ur(this, !0)
            },
            has(i) {
                return cr.call(this, i, !0)
            },
            add: Ht("add"),
            set: Ht("set"),
            delete: Ht("delete"),
            clear: Ht("clear"),
            forEach: fr(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        e[i] = dr(i, !1, !1),
        n[i] = dr(i, !0, !1),
        t[i] = dr(i, !1, !0),
        r[i] = dr(i, !0, !0)
    }), [e, n, t, r]
}
const [wc, Tc, Ac, Ec] = bc();
function ns(e, t) {
    const n = t ? e ? Ec : Ac : e ? Tc : wc;
    return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(ae(n, o) && o in r ? n : r, o, i)
}
const Cc = {
        get: ns(!1, !1)
    },
    kc = {
        get: ns(!1, !0)
    },
    Sc = {
        get: ns(!0, !1)
    },
    sa = new WeakMap,
    ia = new WeakMap,
    aa = new WeakMap,
    xc = new WeakMap;
function Pc(e) {
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
function Mc(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Pc(Xl(e))
}
function bt(e) {
    return rn(e) ? e : rs(e, !1, oa, Cc, sa)
}
function Rc(e) {
    return rs(e, !1, yc, kc, ia)
}
function la(e) {
    return rs(e, !0, vc, Sc, aa)
}
function rs(e, t, n, r, o) {
    if (!be(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const i = o.get(e);
    if (i)
        return i;
    const a = Mc(e);
    if (a === 0)
        return e;
    const c = new Proxy(e, a === 2 ? r : n);
    return o.set(e, c), c
}
function _n(e) {
    return rn(e) ? _n(e.__v_raw) : !!(e && e.__v_isReactive)
}
function rn(e) {
    return !!(e && e.__v_isReadonly)
}
function Tr(e) {
    return !!(e && e.__v_isShallow)
}
function ca(e) {
    return _n(e) || rn(e)
}
function ce(e) {
    const t = e && e.__v_raw;
    return t ? ce(t) : e
}
function ua(e) {
    return br(e, "__v_skip", !0), e
}
const Gn = e => be(e) ? bt(e) : e,
    os = e => be(e) ? la(e) : e;
function fa(e) {
    jt && ft && (e = ce(e), ta(e.dep || (e.dep = Qo())))
}
function da(e, t) {
    e = ce(e);
    const n = e.dep;
    n && ho(n)
}
function Pe(e) {
    return !!(e && e.__v_isRef === !0)
}
function z(e) {
    return pa(e, !1)
}
function _o(e) {
    return pa(e, !0)
}
function pa(e, t) {
    return Pe(e) ? e : new Hc(e, t)
}
class Hc {
    constructor(t, n)
    {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : ce(t),
        this._value = n ? t : Gn(t)
    }
    get value()
    {
        return fa(this), this._value
    }
    set value(t)
    {
        const n = this.__v_isShallow || Tr(t) || rn(t);
        t = n ? t : ce(t),
        Zn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Gn(t), da(this))
    }
}
function ne(e) {
    return Pe(e) ? e.value : e
}
const Oc = {
    get: (e, t, n) => ne(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const o = e[t];
        return Pe(o) && !Pe(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r)
    }
};
function ha(e) {
    return _n(e) ? e : new Proxy(e, Oc)
}
class Lc {
    constructor(t, n, r)
    {
        this._object = t,
        this._key = n,
        this._defaultValue = r,
        this.__v_isRef = !0
    }
    get value()
    {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t)
    {
        this._object[this._key] = t
    }
    get dep()
    {
        return ic(ce(this._object), this._key)
    }
}
function ss(e, t, n) {
    const r = e[t];
    return Pe(r) ? r : new Lc(e, t, n)
}
var _a;
class Ic {
    constructor(t, n, r, o)
    {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this[_a] = !1,
        this._dirty = !0,
        this.effect = new Jo(t, () => {
            this._dirty || (this._dirty = !0, da(this))
        }),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !o,
        this.__v_isReadonly = r
    }
    get value()
    {
        const t = ce(this);
        return fa(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }
    set value(t)
    {
        this._setter(t)
    }
}
_a = "__v_isReadonly";
function $c(e, t, n=!1) {
    let r,
        o;
    const i = J(e);
    return i ? (r = e, o = pt) : (r = e.get, o = e.set), new Ic(r, o, i || !o, n)
}
function Vt(e, t, n, r) {
    let o;
    try {
        o = r ? e(...r) : e()
    } catch (i) {
        xn(i, t, n)
    }
    return o
}
function st(e, t, n, r) {
    if (J(e)) {
        const i = Vt(e, t, n, r);
        return i && Xo(i) && i.catch(a => {
            xn(a, t, n)
        }), i
    }
    const o = [];
    for (let i = 0; i < e.length; i++)
        o.push(st(e[i], t, n, r));
    return o
}
function xn(e, t, n, r=!0) {
    const o = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const a = t.proxy,
            c = n;
        for (; i;) {
            const f = i.ec;
            if (f) {
                for (let _ = 0; _ < f.length; _++)
                    if (f[_](e, a, c) === !1)
                        return
            }
            i = i.parent
        }
        const u = t.appContext.config.errorHandler;
        if (u) {
            Vt(u, null, 10, [e, a, c]);
            return
        }
    }
    Fc(e, n, o, r)
}
function Fc(e, t, n, r=!0) {
    console.error(e)
}
let Xn = !1,
    mo = !1;
const Le = [];
let gt = 0;
const mn = [];
let Et = null,
    Qt = 0;
const ma = Promise.resolve();
let is = null;
function Pn(e) {
    const t = is || ma;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Bc(e) {
    let t = gt + 1,
        n = Le.length;
    for (; t < n;) {
        const r = t + n >>> 1;
        Yn(Le[r]) < e ? t = r + 1 : n = r
    }
    return t
}
function Fr(e) {
    (!Le.length || !Le.includes(e, Xn && e.allowRecurse ? gt + 1 : gt)) && (e.id == null ? Le.push(e) : Le.splice(Bc(e.id), 0, e), ga())
}
function ga() {
    !Xn && !mo && (mo = !0, is = ma.then(ya))
}
function Dc(e) {
    const t = Le.indexOf(e);
    t > gt && Le.splice(t, 1)
}
function va(e) {
    Y(e) ? mn.push(...e) : (!Et || !Et.includes(e, e.allowRecurse ? Qt + 1 : Qt)) && mn.push(e),
    ga()
}
function Vs(e, t=Xn ? gt + 1 : 0) {
    for (; t < Le.length; t++) {
        const n = Le[t];
        n && n.pre && (Le.splice(t, 1), t--, n())
    }
}
function Ar(e) {
    if (mn.length) {
        const t = [...new Set(mn)];
        if (mn.length = 0, Et) {
            Et.push(...t);
            return
        }
        for (Et = t, Et.sort((n, r) => Yn(n) - Yn(r)), Qt = 0; Qt < Et.length; Qt++)
            Et[Qt]();
        Et = null,
        Qt = 0
    }
}
const Yn = e => e.id == null ? 1 / 0 : e.id,
    Nc = (e, t) => {
        const n = Yn(e) - Yn(t);
        if (n === 0) {
            if (e.pre && !t.pre)
                return -1;
            if (t.pre && !e.pre)
                return 1
        }
        return n
    };
function ya(e) {
    mo = !1,
    Xn = !0,
    Le.sort(Nc);
    const t = pt;
    try {
        for (gt = 0; gt < Le.length; gt++) {
            const n = Le[gt];
            n && n.active !== !1 && Vt(n, null, 14)
        }
    } finally {
        gt = 0,
        Le.length = 0,
        Ar(),
        Xn = !1,
        is = null,
        (Le.length || mn.length) && ya()
    }
}
function jc(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const r = e.vnode.props || ye;
    let o = n;
    const i = t.startsWith("update:"),
        a = i && t.slice(7);
    if (a && a in r) {
        const _ = `${a === "modelValue" ? "model" : a}Modifiers`,
            {number: s, trim: l} = r[_] || ye;
        l && (o = n.map(d => ke(d) ? d.trim() : d)),
        s && (o = n.map(Jl))
    }
    let c,
        u = r[c = Kr(t)] || r[c = Kr(yt(t))];
    !u && i && (u = r[c = Kr(Cn(t))]),
    u && st(u, e, 6, o);
    const f = r[c + "Once"];
    if (f) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[c])
            return;
        e.emitted[c] = !0,
        st(f, e, 6, o)
    }
}
function ba(e, t, n=!1) {
    const r = t.emitsCache,
        o = r.get(e);
    if (o !== void 0)
        return o;
    const i = e.emits;
    let a = {},
        c = !1;
    if (!J(e)) {
        const u = f => {
            const _ = ba(f, t, !0);
            _ && (c = !0, Oe(a, _))
        };
        !n && t.mixins.length && t.mixins.forEach(u),
        e.extends && u(e.extends),
        e.mixins && e.mixins.forEach(u)
    }
    return !i && !c ? (be(e) && r.set(e, null), null) : (Y(i) ? i.forEach(u => a[u] = null) : Oe(a, i), be(e) && r.set(e, a), a)
}
function Br(e, t) {
    return !e || !nr(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, Cn(t)) || ae(e, t))
}
let He = null,
    wa = null;
function Er(e) {
    const t = He;
    return He = e, wa = e && e.type.__scopeId || null, t
}
function ee(e, t=He, n) {
    if (!t || e._n)
        return e;
    const r = (...o) => {
        r._d && Js(-1);
        const i = Er(t);
        let a;
        try {
            a = e(...o)
        } finally {
            Er(i),
            r._d && Js(1)
        }
        return a
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}
function qr(e) {
    const {type: t, vnode: n, proxy: r, withProxy: o, props: i, propsOptions: [a], slots: c, attrs: u, emit: f, render: _, renderCache: s, data: l, setupState: d, ctx: h, inheritAttrs: g} = e;
    let y,
        p;
    const m = Er(e);
    try {
        if (n.shapeFlag & 4) {
            const T = o || r;
            y = rt(_.call(T, T, s, i, d, l, h)),
            p = u
        } else {
            const T = t;
            y = rt(T.length > 1 ? T(i, {
                attrs: u,
                slots: c,
                emit: f
            }) : T(i, null)),
            p = t.props ? u : Uc(u)
        }
    } catch (T) {
        Un.length = 0,
        xn(T, e, 1),
        y = B(Be)
    }
    let b = y;
    if (p && g !== !1) {
        const T = Object.keys(p),
            {shapeFlag: E} = b;
        T.length && E & 7 && (a && T.some(zo) && (p = Wc(p, a)), b = xt(b, p))
    }
    return n.dirs && (b = xt(b), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && (b.transition = n.transition), y = b, Er(m), y
}
function Vc(e) {
    let t;
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        if (wn(r)) {
            if (r.type !== Be || r.children === "v-if") {
                if (t)
                    return;
                t = r
            }
        } else
            return
    }
    return t
}
const Uc = e => {
        let t;
        for (const n in e)
            (n === "class" || n === "style" || nr(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    Wc = (e, t) => {
        const n = {};
        for (const r in e)
            (!zo(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n
    };
function Kc(e, t, n) {
    const {props: r, children: o, component: i} = e,
        {props: a, children: c, patchFlag: u} = t,
        f = i.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && u >= 0) {
        if (u & 1024)
            return !0;
        if (u & 16)
            return r ? Us(r, a, f) : !!a;
        if (u & 8) {
            const _ = t.dynamicProps;
            for (let s = 0; s < _.length; s++) {
                const l = _[s];
                if (a[l] !== r[l] && !Br(f, l))
                    return !0
            }
        }
    } else
        return (o || c) && (!c || !c.$stable) ? !0 : r === a ? !1 : r ? a ? Us(r, a, f) : !0 : !!a;
    return !1
}
function Us(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length)
        return !0;
    for (let o = 0; o < r.length; o++) {
        const i = r[o];
        if (t[i] !== e[i] && !Br(n, i))
            return !0
    }
    return !1
}
function as({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e;)
        (e = t.vnode).el = n,
        t = t.parent
}
const Ta = e => e.__isSuspense,
    qc = {
        name: "Suspense",
        __isSuspense: !0,
        process(e, t, n, r, o, i, a, c, u, f) {
            e == null ? zc(t, n, r, o, i, a, c, u, f) : Zc(e, t, n, r, o, a, c, u, f)
        },
        hydrate: Gc,
        create: ls,
        normalize: Xc
    },
    Aa = qc;
function Qn(e, t) {
    const n = e.props && e.props[t];
    J(n) && n()
}
function zc(e, t, n, r, o, i, a, c, u) {
    const {p: f, o: {createElement: _}} = u,
        s = _("div"),
        l = e.suspense = ls(e, o, r, t, s, n, i, a, c, u);
    f(null, l.pendingBranch = e.ssContent, s, null, r, l, i, a),
    l.deps > 0 ? (Qn(e, "onPending"), Qn(e, "onFallback"), f(null, e.ssFallback, t, n, r, null, i, a), gn(l, e.ssFallback)) : l.resolve()
}
function Zc(e, t, n, r, o, i, a, c, {p: u, um: f, o: {createElement: _}}) {
    const s = t.suspense = e.suspense;
    s.vnode = t,
    t.el = e.el;
    const l = t.ssContent,
        d = t.ssFallback,
        {activeBranch: h, pendingBranch: g, isInFallback: y, isHydrating: p} = s;
    if (g)
        s.pendingBranch = l,
        dt(l, g) ? (u(g, l, s.hiddenContainer, null, o, s, i, a, c), s.deps <= 0 ? s.resolve() : y && (u(h, d, n, r, o, null, i, a, c), gn(s, d))) : (s.pendingId++, p ? (s.isHydrating = !1, s.activeBranch = g) : f(g, o, s), s.deps = 0, s.effects.length = 0, s.hiddenContainer = _("div"), y ? (u(null, l, s.hiddenContainer, null, o, s, i, a, c), s.deps <= 0 ? s.resolve() : (u(h, d, n, r, o, null, i, a, c), gn(s, d))) : h && dt(l, h) ? (u(h, l, n, r, o, s, i, a, c), s.resolve(!0)) : (u(null, l, s.hiddenContainer, null, o, s, i, a, c), s.deps <= 0 && s.resolve()));
    else if (h && dt(l, h))
        u(h, l, n, r, o, s, i, a, c),
        gn(s, l);
    else if (Qn(t, "onPending"), s.pendingBranch = l, s.pendingId++, u(null, l, s.hiddenContainer, null, o, s, i, a, c), s.deps <= 0)
        s.resolve();
    else {
        const {timeout: m, pendingId: b} = s;
        m > 0 ? setTimeout(() => {
            s.pendingId === b && s.fallback(d)
        }, m) : m === 0 && s.fallback(d)
    }
}
function ls(e, t, n, r, o, i, a, c, u, f, _=!1) {
    const {p: s, m: l, um: d, n: h, o: {parentNode: g, remove: y}} = f,
        p = e.props ? Yi(e.props.timeout) : void 0,
        m = {
            vnode: e,
            parent: t,
            parentComponent: n,
            isSVG: a,
            container: r,
            hiddenContainer: o,
            anchor: i,
            deps: 0,
            pendingId: 0,
            timeout: typeof p == "number" ? p : -1,
            activeBranch: null,
            pendingBranch: null,
            isInFallback: !0,
            isHydrating: _,
            isUnmounted: !1,
            effects: [],
            resolve(b=!1) {
                const {vnode: T, activeBranch: E, pendingBranch: P, pendingId: H, effects: k, parentComponent: M, container: U} = m;
                if (m.isHydrating)
                    m.isHydrating = !1;
                else if (!b) {
                    const X = E && P.transition && P.transition.mode === "out-in";
                    X && (E.transition.afterLeave = () => {
                        H === m.pendingId && l(P, U, L, 0)
                    });
                    let {anchor: L} = m;
                    E && (L = h(E), d(E, M, m, !0)),
                    X || l(P, U, L, 0)
                }
                gn(m, P),
                m.pendingBranch = null,
                m.isInFallback = !1;
                let W = m.parent,
                    F = !1;
                for (; W;) {
                    if (W.pendingBranch) {
                        W.effects.push(...k),
                        F = !0;
                        break
                    }
                    W = W.parent
                }
                F || va(k),
                m.effects = [],
                Qn(T, "onResolve")
            },
            fallback(b) {
                if (!m.pendingBranch)
                    return;
                const {vnode: T, activeBranch: E, parentComponent: P, container: H, isSVG: k} = m;
                Qn(T, "onFallback");
                const M = h(E),
                    U = () => {
                        m.isInFallback && (s(null, b, H, M, P, null, k, c, u), gn(m, b))
                    },
                    W = b.transition && b.transition.mode === "out-in";
                W && (E.transition.afterLeave = U),
                m.isInFallback = !0,
                d(E, P, null, !0),
                W || U()
            },
            move(b, T, E) {
                m.activeBranch && l(m.activeBranch, b, T, E),
                m.container = b
            },
            next() {
                return m.activeBranch && h(m.activeBranch)
            },
            registerDep(b, T) {
                const E = !!m.pendingBranch;
                E && m.deps++;
                const P = b.vnode.el;
                b.asyncDep.catch(H => {
                    xn(H, b, 0)
                }).then(H => {
                    if (b.isUnmounted || m.isUnmounted || m.pendingId !== b.suspenseId)
                        return;
                    b.asyncResolved = !0;
                    const {vnode: k} = b;
                    To(b, H, !1),
                    P && (k.el = P);
                    const M = !P && b.subTree.el;
                    T(b, k, g(P || b.subTree.el), P ? null : h(b.subTree), m, a, u),
                    M && y(M),
                    as(b, k.el),
                    E && --m.deps === 0 && m.resolve()
                })
            },
            unmount(b, T) {
                m.isUnmounted = !0,
                m.activeBranch && d(m.activeBranch, n, b, T),
                m.pendingBranch && d(m.pendingBranch, n, b, T)
            }
        };
    return m
}
function Gc(e, t, n, r, o, i, a, c, u) {
    const f = t.suspense = ls(t, r, n, e.parentNode, document.createElement("div"), null, o, i, a, c, !0),
        _ = u(e, f.pendingBranch = t.ssContent, n, f, i, a);
    return f.deps === 0 && f.resolve(), _
}
function Xc(e) {
    const {shapeFlag: t, children: n} = e,
        r = t & 32;
    e.ssContent = Ws(r ? n.default : n),
    e.ssFallback = r ? Ws(n.fallback) : B(Be)
}
function Ws(e) {
    let t;
    if (J(e)) {
        const n = bn && e._c;
        n && (e._d = !1, oe()),
        e = e(),
        n && (e._d = !0, t = ot, za())
    }
    return Y(e) && (e = Vc(e)), e = rt(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter(n => n !== e)), e
}
function Ea(e, t) {
    t && t.pendingBranch ? Y(e) ? t.effects.push(...e) : t.effects.push(e) : va(e)
}
function gn(e, t) {
    e.activeBranch = t;
    const {vnode: n, parentComponent: r} = e,
        o = n.el = t.el;
    r && r.subTree === n && (r.vnode.el = o, as(r, o))
}
function vn(e, t) {
    if (Ce) {
        let n = Ce.provides;
        const r = Ce.parent && Ce.parent.provides;
        r === n && (n = Ce.provides = Object.create(r)),
        n[e] = t
    }
}
function Je(e, t, n=!1) {
    const r = Ce || He;
    if (r) {
        const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (o && e in o)
            return o[e];
        if (arguments.length > 1)
            return n && J(t) ? t.call(r.proxy) : t
    }
}
function Yc(e, t) {
    return cs(e, null, t)
}
const pr = {};
function Ut(e, t, n) {
    return cs(e, t, n)
}
function cs(e, t, {immediate: n, deep: r, flush: o, onTrack: i, onTrigger: a}=ye) {
    const c = rc() === (Ce == null ? void 0 : Ce.scope) ? Ce : null;
    let u,
        f = !1,
        _ = !1;
    if (Pe(e) ? (u = () => e.value, f = Tr(e)) : _n(e) ? (u = () => e, r = !0) : Y(e) ? (_ = !0, f = e.some(b => _n(b) || Tr(b)), u = () => e.map(b => {
        if (Pe(b))
            return b.value;
        if (_n(b))
            return en(b);
        if (J(b))
            return Vt(b, c, 2)
    })) : J(e) ? t ? u = () => Vt(e, c, 2) : u = () => {
        if (!(c && c.isUnmounted))
            return s && s(), st(e, c, 3, [l])
    } : u = pt, t && r) {
        const b = u;
        u = () => en(b())
    }
    let s,
        l = b => {
            s = p.onStop = () => {
                Vt(b, c, 4)
            }
        },
        d;
    if (Tn)
        if (l = pt, t ? n && st(t, c, 3, [u(), _ ? [] : void 0, l]) : u(), o === "sync") {
            const b = Ku();
            d = b.__watcherHandles || (b.__watcherHandles = [])
        } else
            return pt;
    let h = _ ? new Array(e.length).fill(pr) : pr;
    const g = () => {
        if (p.active)
            if (t) {
                const b = p.run();
                (r || f || (_ ? b.some((T, E) => Zn(T, h[E])) : Zn(b, h))) && (s && s(), st(t, c, 3, [b, h === pr ? void 0 : _ && h[0] === pr ? [] : h, l]), h = b)
            } else
                p.run()
    };
    g.allowRecurse = !!t;
    let y;
    o === "sync" ? y = g : o === "post" ? y = () => Me(g, c && c.suspense) : (g.pre = !0, c && (g.id = c.uid), y = () => Fr(g));
    const p = new Jo(u, y);
    t ? n ? g() : h = p.run() : o === "post" ? Me(p.run.bind(p), c && c.suspense) : p.run();
    const m = () => {
        p.stop(),
        c && c.scope && Zo(c.scope.effects, p)
    };
    return d && d.push(m), m
}
function Qc(e, t, n) {
    const r = this.proxy,
        o = ke(e) ? e.includes(".") ? Ca(r, e) : () => r[e] : e.bind(r, r);
    let i;
    J(t) ? i = t : (i = t.handler, n = t);
    const a = Ce;
    qt(this);
    const c = cs(o, i.bind(r), n);
    return a ? qt(a) : Wt(), c
}
function Ca(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let o = 0; o < n.length && r; o++)
            r = r[n[o]];
        return r
    }
}
function en(e, t) {
    if (!be(e) || e.__v_skip || (t = t || new Set, t.has(e)))
        return e;
    if (t.add(e), Pe(e))
        en(e.value, t);
    else if (Y(e))
        for (let n = 0; n < e.length; n++)
            en(e[n], t);
    else if (Zi(e) || hn(e))
        e.forEach(n => {
            en(n, t)
        });
    else if (Xi(e))
        for (const n in e)
            en(e[n], t);
    return e
}
function Jc() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return it(() => {
        e.isMounted = !0
    }), wt(() => {
        e.isUnmounting = !0
    }), e
}
const nt = [Function, Array],
    eu = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: nt,
            onEnter: nt,
            onAfterEnter: nt,
            onEnterCancelled: nt,
            onBeforeLeave: nt,
            onLeave: nt,
            onAfterLeave: nt,
            onLeaveCancelled: nt,
            onBeforeAppear: nt,
            onAppear: nt,
            onAfterAppear: nt,
            onAppearCancelled: nt
        },
        setup(e, {slots: t}) {
            const n = zt(),
                r = Jc();
            let o;
            return () => {
                const i = t.default && xa(t.default(), !0);
                if (!i || !i.length)
                    return;
                let a = i[0];
                if (i.length > 1) {
                    for (const g of i)
                        if (g.type !== Be) {
                            a = g;
                            break
                        }
                }
                const c = ce(e),
                    {mode: u} = c;
                if (r.isLeaving)
                    return zr(a);
                const f = Ks(a);
                if (!f)
                    return zr(a);
                const _ = go(f, c, r, n);
                Cr(f, _);
                const s = n.subTree,
                    l = s && Ks(s);
                let d = !1;
                const {getTransitionKey: h} = f.type;
                if (h) {
                    const g = h();
                    o === void 0 ? o = g : g !== o && (o = g, d = !0)
                }
                if (l && l.type !== Be && (!dt(f, l) || d)) {
                    const g = go(l, c, r, n);
                    if (Cr(l, g), u === "out-in")
                        return r.isLeaving = !0, g.afterLeave = () => {
                            r.isLeaving = !1,
                            n.update.active !== !1 && n.update()
                        }, zr(a);
                    u === "in-out" && f.type !== Be && (g.delayLeave = (y, p, m) => {
                        const b = Sa(r, l);
                        b[String(l.key)] = l,
                        y._leaveCb = () => {
                            p(),
                            y._leaveCb = void 0,
                            delete _.delayedLeave
                        },
                        _.delayedLeave = m
                    })
                }
                return a
            }
        }
    },
    ka = eu;
function Sa(e, t) {
    const {leavingVNodes: n} = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null), n.set(t.type, r)), r
}
function go(e, t, n, r) {
    const {appear: o, mode: i, persisted: a=!1, onBeforeEnter: c, onEnter: u, onAfterEnter: f, onEnterCancelled: _, onBeforeLeave: s, onLeave: l, onAfterLeave: d, onLeaveCancelled: h, onBeforeAppear: g, onAppear: y, onAfterAppear: p, onAppearCancelled: m} = t,
        b = String(e.key),
        T = Sa(n, e),
        E = (k, M) => {
            k && st(k, r, 9, M)
        },
        P = (k, M) => {
            const U = M[1];
            E(k, M),
            Y(k) ? k.every(W => W.length <= 1) && U() : k.length <= 1 && U()
        },
        H = {
            mode: i,
            persisted: a,
            beforeEnter(k) {
                let M = c;
                if (!n.isMounted)
                    if (o)
                        M = g || c;
                    else
                        return;
                k._leaveCb && k._leaveCb(!0);
                const U = T[b];
                U && dt(e, U) && U.el._leaveCb && U.el._leaveCb(),
                E(M, [k])
            },
            enter(k) {
                let M = u,
                    U = f,
                    W = _;
                if (!n.isMounted)
                    if (o)
                        M = y || u,
                        U = p || f,
                        W = m || _;
                    else
                        return;
                let F = !1;
                const X = k._enterCb = L => {
                    F || (F = !0, L ? E(W, [k]) : E(U, [k]), H.delayedLeave && H.delayedLeave(), k._enterCb = void 0)
                };
                M ? P(M, [k, X]) : X()
            },
            leave(k, M) {
                const U = String(e.key);
                if (k._enterCb && k._enterCb(!0), n.isUnmounting)
                    return M();
                E(s, [k]);
                let W = !1;
                const F = k._leaveCb = X => {
                    W || (W = !0, M(), X ? E(h, [k]) : E(d, [k]), k._leaveCb = void 0, T[U] === e && delete T[U])
                };
                T[U] = e,
                l ? P(l, [k, F]) : F()
            },
            clone(k) {
                return go(k, t, n, r)
            }
        };
    return H
}
function zr(e) {
    if (or(e))
        return e = xt(e), e.children = null, e
}
function Ks(e) {
    return or(e) ? e.children ? e.children[0] : void 0 : e
}
function Cr(e, t) {
    e.shapeFlag & 6 && e.component ? Cr(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}
function xa(e, t=!1, n) {
    let r = [],
        o = 0;
    for (let i = 0; i < e.length; i++) {
        let a = e[i];
        const c = n == null ? a.key : String(n) + String(a.key != null ? a.key : i);
        a.type === Re ? (a.patchFlag & 128 && o++, r = r.concat(xa(a.children, t, c))) : (t || a.type !== Be) && r.push(c != null ? xt(a, {
            key: c
        }) : a)
    }
    if (o > 1)
        for (let i = 0; i < r.length; i++)
            r[i].patchFlag = -2;
    return r
}
function Pt(e) {
    return J(e) ? {
        setup: e,
        name: e.name
    } : e
}
const nn = e => !!e.type.__asyncLoader;
function tu(e) {
    J(e) && (e = {
        loader: e
    });
    const {loader: t, loadingComponent: n, errorComponent: r, delay: o=200, timeout: i, suspensible: a=!0, onError: c} = e;
    let u = null,
        f,
        _ = 0;
    const s = () => (_++, u = null, l()),
        l = () => {
            let d;
            return u || (d = u = t().catch(h => {
                    if (h = h instanceof Error ? h : new Error(String(h)), c)
                        return new Promise((g, y) => {
                            c(h, () => g(s()), () => y(h), _ + 1)
                        });
                    throw h
                }).then(h => d !== u && u ? u : (h && (h.__esModule || h[Symbol.toStringTag] === "Module") && (h = h.default), f = h, h)))
        };
    return Pt({
        name: "AsyncComponentWrapper",
        __asyncLoader: l,
        get __asyncResolved() {
            return f
        },
        setup() {
            const d = Ce;
            if (f)
                return () => Zr(f, d);
            const h = m => {
                u = null,
                xn(m, d, 13, !r)
            };
            if (a && d.suspense || Tn)
                return l().then(m => () => Zr(m, d)).catch(m => (h(m), () => r ? B(r, {
                    error: m
                }) : null));
            const g = z(!1),
                y = z(),
                p = z(!!o);
            return o && setTimeout(() => {
                p.value = !1
            }, o), i != null && setTimeout(() => {
                if (!g.value && !y.value) {
                    const m = new Error(`Async component timed out after ${i}ms.`);
                    h(m),
                    y.value = m
                }
            }, i), l().then(() => {
                g.value = !0,
                d.parent && or(d.parent.vnode) && Fr(d.parent.update)
            }).catch(m => {
                h(m),
                y.value = m
            }), () => {
                if (g.value && f)
                    return Zr(f, d);
                if (y.value && r)
                    return B(r, {
                        error: y.value
                    });
                if (n && !p.value)
                    return B(n)
            }
        }
    })
}
function Zr(e, t) {
    const {ref: n, props: r, children: o, ce: i} = t.vnode,
        a = B(e, r, o);
    return a.ref = n, a.ce = i, delete t.vnode.ce, a
}
const or = e => e.type.__isKeepAlive,
    nu = {
        name: "KeepAlive",
        __isKeepAlive: !0,
        props: {
            include: [String, RegExp, Array],
            exclude: [String, RegExp, Array],
            max: [String, Number]
        },
        setup(e, {slots: t}) {
            const n = zt(),
                r = n.ctx;
            if (!r.renderer)
                return () => {
                    const m = t.default && t.default();
                    return m && m.length === 1 ? m[0] : m
                };
            const o = new Map,
                i = new Set;
            let a = null;
            const c = n.suspense,
                {renderer: {p: u, m: f, um: _, o: {createElement: s}}} = r,
                l = s("div");
            r.activate = (m, b, T, E, P) => {
                const H = m.component;
                f(m, b, T, 0, c),
                u(H.vnode, m, b, T, H, c, E, m.slotScopeIds, P),
                Me(() => {
                    H.isDeactivated = !1,
                    H.a && Nn(H.a);
                    const k = m.props && m.props.onVnodeMounted;
                    k && De(k, H.parent, m)
                }, c)
            },
            r.deactivate = m => {
                const b = m.component;
                f(m, l, null, 1, c),
                Me(() => {
                    b.da && Nn(b.da);
                    const T = m.props && m.props.onVnodeUnmounted;
                    T && De(T, b.parent, m),
                    b.isDeactivated = !0
                }, c)
            };
            function d(m) {
                Gr(m),
                _(m, n, c, !0)
            }
            function h(m) {
                o.forEach((b, T) => {
                    const E = Ao(b.type);
                    E && (!m || !m(E)) && g(T)
                })
            }
            function g(m) {
                const b = o.get(m);
                !a || !dt(b, a) ? d(b) : a && Gr(a),
                o.delete(m),
                i.delete(m)
            }
            Ut(() => [e.include, e.exclude], ([m, b]) => {
                m && h(T => Bn(m, T)),
                b && h(T => !Bn(b, T))
            }, {
                flush: "post",
                deep: !0
            });
            let y = null;
            const p = () => {
                y != null && o.set(y, Xr(n.subTree))
            };
            return it(p), Oa(p), wt(() => {
                o.forEach(m => {
                    const {subTree: b, suspense: T} = n,
                        E = Xr(b);
                    if (m.type === E.type && m.key === E.key) {
                        Gr(E);
                        const P = E.component.da;
                        P && Me(P, T);
                        return
                    }
                    d(m)
                })
            }), () => {
                if (y = null, !t.default)
                    return null;
                const m = t.default(),
                    b = m[0];
                if (m.length > 1)
                    return a = null, m;
                if (!wn(b) || !(b.shapeFlag & 4) && !(b.shapeFlag & 128))
                    return a = null, b;
                let T = Xr(b);
                const E = T.type,
                    P = Ao(nn(T) ? T.type.__asyncResolved || {} : E),
                    {include: H, exclude: k, max: M} = e;
                if (H && (!P || !Bn(H, P)) || k && P && Bn(k, P))
                    return a = T, b;
                const U = T.key == null ? E : T.key,
                    W = o.get(U);
                return T.el && (T = xt(T), b.shapeFlag & 128 && (b.ssContent = T)), y = U, W ? (T.el = W.el, T.component = W.component, T.transition && Cr(T, T.transition), T.shapeFlag |= 512, i.delete(U), i.add(U)) : (i.add(U), M && i.size > parseInt(M, 10) && g(i.values().next().value)), T.shapeFlag |= 256, a = T, Ta(b.type) ? b : T
            }
        }
    },
    ru = nu;
function Bn(e, t) {
    return Y(e) ? e.some(n => Bn(n, t)) : ke(e) ? e.split(",").includes(t) : Gl(e) ? e.test(t) : !1
}
function Pa(e, t) {
    Ra(e, "a", t)
}
function Ma(e, t) {
    Ra(e, "da", t)
}
function Ra(e, t, n=Ce) {
    const r = e.__wdc || (e.__wdc = () => {
        let o = n;
        for (; o;) {
            if (o.isDeactivated)
                return;
            o = o.parent
        }
        return e()
    });
    if (Dr(t, r, n), n) {
        let o = n.parent;
        for (; o && o.parent;)
            or(o.parent.vnode) && ou(r, t, n, o),
            o = o.parent
    }
}
function ou(e, t, n, r) {
    const o = Dr(t, e, r, !0);
    Jn(() => {
        Zo(r[t], o)
    }, n)
}
function Gr(e) {
    e.shapeFlag &= -257,
    e.shapeFlag &= -513
}
function Xr(e) {
    return e.shapeFlag & 128 ? e.ssContent : e
}
function Dr(e, t, n=Ce, r=!1) {
    if (n) {
        const o = n[e] || (n[e] = []),
            i = t.__weh || (t.__weh = (...a) => {
                if (n.isUnmounted)
                    return;
                kn(),
                qt(n);
                const c = st(t, n, e, a);
                return Wt(), Sn(), c
            });
        return r ? o.unshift(i) : o.push(i), i
    }
}
const Mt = e => (t, n=Ce) => (!Tn || e === "sp") && Dr(e, (...r) => t(...r), n),
    Ha = Mt("bm"),
    it = Mt("m"),
    su = Mt("bu"),
    Oa = Mt("u"),
    wt = Mt("bum"),
    Jn = Mt("um"),
    iu = Mt("sp"),
    au = Mt("rtg"),
    lu = Mt("rtc");
function La(e, t=Ce) {
    Dr("ec", e, t)
}
function cu(e, t) {
    const n = He;
    if (n === null)
        return e;
    const r = jr(n) || n.proxy,
        o = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
        let [a, c, u, f=ye] = t[i];
        a && (J(a) && (a = {
            mounted: a,
            updated: a
        }), a.deep && en(c), o.push({
            dir: a,
            instance: r,
            value: c,
            oldValue: void 0,
            arg: u,
            modifiers: f
        }))
    }
    return e
}
function mt(e, t, n, r) {
    const o = e.dirs,
        i = t && t.dirs;
    for (let a = 0; a < o.length; a++) {
        const c = o[a];
        i && (c.oldValue = i[a].value);
        let u = c.dir[r];
        u && (kn(), st(u, n, 8, [e.el, c, e, t]), Sn())
    }
}
const us = "components",
    uu = "directives";
function fu(e, t) {
    return fs(us, e, !0, t) || e
}
const Ia = Symbol();
function $a(e) {
    return ke(e) ? fs(us, e, !1) || e : e || Ia
}
function du(e) {
    return fs(uu, e)
}
function fs(e, t, n=!0, r=!1) {
    const o = He || Ce;
    if (o) {
        const i = o.type;
        if (e === us) {
            const c = Ao(i, !1);
            if (c && (c === t || c === yt(t) || c === Ir(yt(t))))
                return i
        }
        const a = qs(o[e] || i[e], t) || qs(o.appContext[e], t);
        return !a && r ? i : a
    }
}
function qs(e, t) {
    return e && (e[t] || e[yt(t)] || e[Ir(yt(t))])
}
function ds(e, t, n, r) {
    let o;
    const i = n && n[r];
    if (Y(e) || ke(e)) {
        o = new Array(e.length);
        for (let a = 0, c = e.length; a < c; a++)
            o[a] = t(e[a], a, void 0, i && i[a])
    } else if (typeof e == "number") {
        o = new Array(e);
        for (let a = 0; a < e; a++)
            o[a] = t(a + 1, a, void 0, i && i[a])
    } else if (be(e))
        if (e[Symbol.iterator])
            o = Array.from(e, (a, c) => t(a, c, void 0, i && i[c]));
        else {
            const a = Object.keys(e);
            o = new Array(a.length);
            for (let c = 0, u = a.length; c < u; c++) {
                const f = a[c];
                o[c] = t(e[f], f, c, i && i[c])
            }
        }
    else
        o = [];
    return n && (n[r] = o), o
}
function un(e, t, n={}, r, o) {
    if (He.isCE || He.parent && nn(He.parent) && He.parent.isCE)
        return t !== "default" && (n.name = t), B("slot", n, r && r());
    let i = e[t];
    i && i._c && (i._d = !1),
    oe();
    const a = i && Fa(i(n)),
        c = Qe(Re, {
            key: n.key || a && a.key || `_${t}`
        }, a || (r ? r() : []), a && e._ === 1 ? 64 : -2);
    return !o && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), i && i._c && (i._d = !0), c
}
function Fa(e) {
    return e.some(t => wn(t) ? !(t.type === Be || t.type === Re && !Fa(t.children)) : !0) ? e : null
}
const vo = e => e ? Xa(e) ? jr(e) || e.proxy : vo(e.parent) : null,
    jn = Oe(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => vo(e.parent),
        $root: e => vo(e.root),
        $emit: e => e.emit,
        $options: e => ps(e),
        $forceUpdate: e => e.f || (e.f = () => Fr(e.update)),
        $nextTick: e => e.n || (e.n = Pn.bind(e.proxy)),
        $watch: e => Qc.bind(e)
    }),
    Yr = (e, t) => e !== ye && !e.__isScriptSetup && ae(e, t),
    pu = {
        get({_: e}, t) {
            const {ctx: n, setupState: r, data: o, props: i, accessCache: a, type: c, appContext: u} = e;
            let f;
            if (t[0] !== "$") {
                const d = a[t];
                if (d !== void 0)
                    switch (d) {
                    case 1:
                        return r[t];
                    case 2:
                        return o[t];
                    case 4:
                        return n[t];
                    case 3:
                        return i[t]
                    }
                else {
                    if (Yr(r, t))
                        return a[t] = 1, r[t];
                    if (o !== ye && ae(o, t))
                        return a[t] = 2, o[t];
                    if ((f = e.propsOptions[0]) && ae(f, t))
                        return a[t] = 3, i[t];
                    if (n !== ye && ae(n, t))
                        return a[t] = 4, n[t];
                    yo && (a[t] = 0)
                }
            }
            const _ = jn[t];
            let s,
                l;
            if (_)
                return t === "$attrs" && Ne(e, "get", t), _(e);
            if ((s = c.__cssModules) && (s = s[t]))
                return s;
            if (n !== ye && ae(n, t))
                return a[t] = 4, n[t];
            if (l = u.config.globalProperties, ae(l, t))
                return l[t]
        },
        set({_: e}, t, n) {
            const {data: r, setupState: o, ctx: i} = e;
            return Yr(o, t) ? (o[t] = n, !0) : r !== ye && ae(r, t) ? (r[t] = n, !0) : ae(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
        },
        has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: i}}, a) {
            let c;
            return !!n[a] || e !== ye && ae(e, a) || Yr(t, a) || (c = i[0]) && ae(c, a) || ae(r, a) || ae(jn, a) || ae(o.config.globalProperties, a)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : ae(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };
let yo = !0;
function hu(e) {
    const t = ps(e),
        n = e.proxy,
        r = e.ctx;
    yo = !1,
    t.beforeCreate && zs(t.beforeCreate, e, "bc");
    const {data: o, computed: i, methods: a, watch: c, provide: u, inject: f, created: _, beforeMount: s, mounted: l, beforeUpdate: d, updated: h, activated: g, deactivated: y, beforeDestroy: p, beforeUnmount: m, destroyed: b, unmounted: T, render: E, renderTracked: P, renderTriggered: H, errorCaptured: k, serverPrefetch: M, expose: U, inheritAttrs: W, components: F, directives: X, filters: L} = t;
    if (f && _u(f, r, null, e.appContext.config.unwrapInjectedRef), a)
        for (const fe in a) {
            const de = a[fe];
            J(de) && (r[fe] = de.bind(n))
        }
    if (o) {
        const fe = o.call(n, n);
        be(fe) && (e.data = bt(fe))
    }
    if (yo = !0, i)
        for (const fe in i) {
            const de = i[fe],
                N = J(de) ? de.bind(n, n) : J(de.get) ? de.get.bind(n, n) : pt,
                Te = !J(de) && J(de.set) ? de.set.bind(n) : pt,
                me = le({
                    get: N,
                    set: Te
                });
            Object.defineProperty(r, fe, {
                enumerable: !0,
                configurable: !0,
                get: () => me.value,
                set: Ae => me.value = Ae
            })
        }
    if (c)
        for (const fe in c)
            Ba(c[fe], r, n, fe);
    if (u) {
        const fe = J(u) ? u.call(n) : u;
        Reflect.ownKeys(fe).forEach(de => {
            vn(de, fe[de])
        })
    }
    _ && zs(_, e, "c");
    function se(fe, de) {
        Y(de) ? de.forEach(N => fe(N.bind(n))) : de && fe(de.bind(n))
    }
    if (se(Ha, s), se(it, l), se(su, d), se(Oa, h), se(Pa, g), se(Ma, y), se(La, k), se(lu, P), se(au, H), se(wt, m), se(Jn, T), se(iu, M), Y(U))
        if (U.length) {
            const fe = e.exposed || (e.exposed = {});
            U.forEach(de => {
                Object.defineProperty(fe, de, {
                    get: () => n[de],
                    set: N => n[de] = N
                })
            })
        } else
            e.exposed || (e.exposed = {});
    E && e.render === pt && (e.render = E),
    W != null && (e.inheritAttrs = W),
    F && (e.components = F),
    X && (e.directives = X)
}
function _u(e, t, n=pt, r=!1) {
    Y(e) && (e = bo(e));
    for (const o in e) {
        const i = e[o];
        let a;
        be(i) ? "default" in i ? a = Je(i.from || o, i.default, !0) : a = Je(i.from || o) : a = Je(i),
        Pe(a) && r ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => a.value,
            set: c => a.value = c
        }) : t[o] = a
    }
}
function zs(e, t, n) {
    st(Y(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Ba(e, t, n, r) {
    const o = r.includes(".") ? Ca(n, r) : () => n[r];
    if (ke(e)) {
        const i = t[e];
        J(i) && Ut(o, i)
    } else if (J(e))
        Ut(o, e.bind(n));
    else if (be(e))
        if (Y(e))
            e.forEach(i => Ba(i, t, n, r));
        else {
            const i = J(e.handler) ? e.handler.bind(n) : t[e.handler];
            J(i) && Ut(o, i, e)
        }
}
function ps(e) {
    const t = e.type,
        {mixins: n, extends: r} = t,
        {mixins: o, optionsCache: i, config: {optionMergeStrategies: a}} = e.appContext,
        c = i.get(t);
    let u;
    return c ? u = c : !o.length && !n && !r ? u = t : (u = {}, o.length && o.forEach(f => kr(u, f, a, !0)), kr(u, t, a)), be(t) && i.set(t, u), u
}
function kr(e, t, n, r=!1) {
    const {mixins: o, extends: i} = t;
    i && kr(e, i, n, !0),
    o && o.forEach(a => kr(e, a, n, !0));
    for (const a in t)
        if (!(r && a === "expose")) {
            const c = mu[a] || n && n[a];
            e[a] = c ? c(e[a], t[a]) : t[a]
        }
    return e
}
const mu = {
    data: Zs,
    props: Yt,
    emits: Yt,
    methods: Yt,
    computed: Yt,
    beforeCreate: $e,
    created: $e,
    beforeMount: $e,
    mounted: $e,
    beforeUpdate: $e,
    updated: $e,
    beforeDestroy: $e,
    beforeUnmount: $e,
    destroyed: $e,
    unmounted: $e,
    activated: $e,
    deactivated: $e,
    errorCaptured: $e,
    serverPrefetch: $e,
    components: Yt,
    directives: Yt,
    watch: vu,
    provide: Zs,
    inject: gu
};
function Zs(e, t) {
    return t ? e ? function() {
        return Oe(J(e) ? e.call(this, this) : e, J(t) ? t.call(this, this) : t)
    } : t : e
}
function gu(e, t) {
    return Yt(bo(e), bo(t))
}
function bo(e) {
    if (Y(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function $e(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Yt(e, t) {
    return e ? Oe(Oe(Object.create(null), e), t) : t
}
function vu(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = Oe(Object.create(null), e);
    for (const r in t)
        n[r] = $e(e[r], t[r]);
    return n
}
function yu(e, t, n, r=!1) {
    const o = {},
        i = {};
    br(i, Nr, 1),
    e.propsDefaults = Object.create(null),
    Da(e, t, o, i);
    for (const a in e.propsOptions[0])
        a in o || (o[a] = void 0);
    n ? e.props = r ? o : Rc(o) : e.type.props ? e.props = o : e.props = i,
    e.attrs = i
}
function bu(e, t, n, r) {
    const {props: o, attrs: i, vnode: {patchFlag: a}} = e,
        c = ce(o),
        [u] = e.propsOptions;
    let f = !1;
    if ((r || a > 0) && !(a & 16)) {
        if (a & 8) {
            const _ = e.vnode.dynamicProps;
            for (let s = 0; s < _.length; s++) {
                let l = _[s];
                if (Br(e.emitsOptions, l))
                    continue;
                const d = t[l];
                if (u)
                    if (ae(i, l))
                        d !== i[l] && (i[l] = d, f = !0);
                    else {
                        const h = yt(l);
                        o[h] = wo(u, c, h, d, e, !1)
                    }
                else
                    d !== i[l] && (i[l] = d, f = !0)
            }
        }
    } else {
        Da(e, t, o, i) && (f = !0);
        let _;
        for (const s in c)
            (!t || !ae(t, s) && ((_ = Cn(s)) === s || !ae(t, _))) && (u ? n && (n[s] !== void 0 || n[_] !== void 0) && (o[s] = wo(u, c, s, void 0, e, !0)) : delete o[s]);
        if (i !== c)
            for (const s in i)
                (!t || !ae(t, s)) && (delete i[s], f = !0)
    }
    f && St(e, "set", "$attrs")
}
function Da(e, t, n, r) {
    const [o, i] = e.propsOptions;
    let a = !1,
        c;
    if (t)
        for (let u in t) {
            if (Dn(u))
                continue;
            const f = t[u];
            let _;
            o && ae(o, _ = yt(u)) ? !i || !i.includes(_) ? n[_] = f : (c || (c = {}))[_] = f : Br(e.emitsOptions, u) || (!(u in r) || f !== r[u]) && (r[u] = f, a = !0)
        }
    if (i) {
        const u = ce(n),
            f = c || ye;
        for (let _ = 0; _ < i.length; _++) {
            const s = i[_];
            n[s] = wo(o, u, s, f[s], e, !ae(f, s))
        }
    }
    return a
}
function wo(e, t, n, r, o, i) {
    const a = e[n];
    if (a != null) {
        const c = ae(a, "default");
        if (c && r === void 0) {
            const u = a.default;
            if (a.type !== Function && J(u)) {
                const {propsDefaults: f} = o;
                n in f ? r = f[n] : (qt(o), r = f[n] = u.call(null, t), Wt())
            } else
                r = u
        }
        a[0] && (i && !c ? r = !1 : a[1] && (r === "" || r === Cn(n)) && (r = !0))
    }
    return r
}
function Na(e, t, n=!1) {
    const r = t.propsCache,
        o = r.get(e);
    if (o)
        return o;
    const i = e.props,
        a = {},
        c = [];
    let u = !1;
    if (!J(e)) {
        const _ = s => {
            u = !0;
            const [l, d] = Na(s, t, !0);
            Oe(a, l),
            d && c.push(...d)
        };
        !n && t.mixins.length && t.mixins.forEach(_),
        e.extends && _(e.extends),
        e.mixins && e.mixins.forEach(_)
    }
    if (!i && !u)
        return be(e) && r.set(e, pn), pn;
    if (Y(i))
        for (let _ = 0; _ < i.length; _++) {
            const s = yt(i[_]);
            Gs(s) && (a[s] = ye)
        }
    else if (i)
        for (const _ in i) {
            const s = yt(_);
            if (Gs(s)) {
                const l = i[_],
                    d = a[s] = Y(l) || J(l) ? {
                        type: l
                    } : Object.assign({}, l);
                if (d) {
                    const h = Qs(Boolean, d.type),
                        g = Qs(String, d.type);
                    d[0] = h > -1,
                    d[1] = g < 0 || h < g,
                    (h > -1 || ae(d, "default")) && c.push(s)
                }
            }
        }
    const f = [a, c];
    return be(e) && r.set(e, f), f
}
function Gs(e) {
    return e[0] !== "$"
}
function Xs(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}
function Ys(e, t) {
    return Xs(e) === Xs(t)
}
function Qs(e, t) {
    return Y(t) ? t.findIndex(n => Ys(n, e)) : J(t) && Ys(t, e) ? 0 : -1
}
const ja = e => e[0] === "_" || e === "$stable",
    hs = e => Y(e) ? e.map(rt) : [rt(e)],
    wu = (e, t, n) => {
        if (t._n)
            return t;
        const r = ee((...o) => hs(t(...o)), n);
        return r._c = !1, r
    },
    Va = (e, t, n) => {
        const r = e._ctx;
        for (const o in e) {
            if (ja(o))
                continue;
            const i = e[o];
            if (J(i))
                t[o] = wu(o, i, r);
            else if (i != null) {
                const a = hs(i);
                t[o] = () => a
            }
        }
    },
    Ua = (e, t) => {
        const n = hs(t);
        e.slots.default = () => n
    },
    Tu = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = ce(t), br(t, "_", n)) : Va(t, e.slots = {})
        } else
            e.slots = {},
            t && Ua(e, t);
        br(e.slots, Nr, 1)
    },
    Au = (e, t, n) => {
        const {vnode: r, slots: o} = e;
        let i = !0,
            a = ye;
        if (r.shapeFlag & 32) {
            const c = t._;
            c ? n && c === 1 ? i = !1 : (Oe(o, t), !n && c === 1 && delete o._) : (i = !t.$stable, Va(t, o)),
            a = t
        } else
            t && (Ua(e, t), a = {
                default: 1
            });
        if (i)
            for (const c in o)
                !ja(c) && !(c in a) && delete o[c]
    };
function Wa() {
    return {
        app: null,
        config: {
            isNativeTag: ql,
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
let Eu = 0;
function Cu(e, t) {
    return function(r, o=null) {
        J(r) || (r = Object.assign({}, r)),
        o != null && !be(o) && (o = null);
        const i = Wa(),
            a = new Set;
        let c = !1;
        const u = i.app = {
            _uid: Eu++,
            _component: r,
            _props: o,
            _container: null,
            _context: i,
            _instance: null,
            version: Qa,
            get config() {
                return i.config
            },
            set config(f) {},
            use(f, ..._) {
                return a.has(f) || (f && J(f.install) ? (a.add(f), f.install(u, ..._)) : J(f) && (a.add(f), f(u, ..._))), u
            },
            mixin(f) {
                return i.mixins.includes(f) || i.mixins.push(f), u
            },
            component(f, _) {
                return _ ? (i.components[f] = _, u) : i.components[f]
            },
            directive(f, _) {
                return _ ? (i.directives[f] = _, u) : i.directives[f]
            },
            mount(f, _, s) {
                if (!c) {
                    const l = B(r, o);
                    return l.appContext = i, _ && t ? t(l, f) : e(l, f, s), c = !0, u._container = f, f.__vue_app__ = u, jr(l.component) || l.component.proxy
                }
            },
            unmount() {
                c && (e(null, u._container), delete u._container.__vue_app__)
            },
            provide(f, _) {
                return i.provides[f] = _, u
            }
        };
        return u
    }
}
function Sr(e, t, n, r, o=!1) {
    if (Y(e)) {
        e.forEach((l, d) => Sr(l, t && (Y(t) ? t[d] : t), n, r, o));
        return
    }
    if (nn(r) && !o)
        return;
    const i = r.shapeFlag & 4 ? jr(r.component) || r.component.proxy : r.el,
        a = o ? null : i,
        {i: c, r: u} = e,
        f = t && t.r,
        _ = c.refs === ye ? c.refs = {} : c.refs,
        s = c.setupState;
    if (f != null && f !== u && (ke(f) ? (_[f] = null, ae(s, f) && (s[f] = null)) : Pe(f) && (f.value = null)), J(u))
        Vt(u, c, 12, [a, _]);
    else {
        const l = ke(u),
            d = Pe(u);
        if (l || d) {
            const h = () => {
                if (e.f) {
                    const g = l ? ae(s, u) ? s[u] : _[u] : u.value;
                    o ? Y(g) && Zo(g, i) : Y(g) ? g.includes(i) || g.push(i) : l ? (_[u] = [i], ae(s, u) && (s[u] = _[u])) : (u.value = [i], e.k && (_[e.k] = u.value))
                } else
                    l ? (_[u] = a, ae(s, u) && (s[u] = a)) : d && (u.value = a, e.k && (_[e.k] = a))
            };
            a ? (h.id = -1, Me(h, n)) : h()
        }
    }
}
let Ot = !1;
const hr = e => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
    _r = e => e.nodeType === 8;
function ku(e) {
    const {mt: t, p: n, o: {patchProp: r, createText: o, nextSibling: i, parentNode: a, remove: c, insert: u, createComment: f}} = e,
        _ = (p, m) => {
            if (!m.hasChildNodes()) {
                n(null, p, m),
                Ar(),
                m._vnode = p;
                return
            }
            Ot = !1,
            s(m.firstChild, p, null, null, null),
            Ar(),
            m._vnode = p,
            Ot && console.error("Hydration completed but contains mismatches.")
        },
        s = (p, m, b, T, E, P=!1) => {
            const H = _r(p) && p.data === "[",
                k = () => g(p, m, b, T, E, H),
                {type: M, ref: U, shapeFlag: W, patchFlag: F} = m;
            let X = p.nodeType;
            m.el = p,
            F === -2 && (P = !1, m.dynamicChildren = null);
            let L = null;
            switch (M) {
            case yn:
                X !== 3 ? m.children === "" ? (u(m.el = o(""), a(p), p), L = p) : L = k() : (p.data !== m.children && (Ot = !0, p.data = m.children), L = i(p));
                break;
            case Be:
                X !== 8 || H ? L = k() : L = i(p);
                break;
            case Vn:
                if (H && (p = i(p), X = p.nodeType), X === 1 || X === 3) {
                    L = p;
                    const we = !m.children.length;
                    for (let se = 0; se < m.staticCount; se++)
                        we && (m.children += L.nodeType === 1 ? L.outerHTML : L.data),
                        se === m.staticCount - 1 && (m.anchor = L),
                        L = i(L);
                    return H ? i(L) : L
                } else
                    k();
                break;
            case Re:
                H ? L = h(p, m, b, T, E, P) : L = k();
                break;
            default:
                if (W & 1)
                    X !== 1 || m.type.toLowerCase() !== p.tagName.toLowerCase() ? L = k() : L = l(p, m, b, T, E, P);
                else if (W & 6) {
                    m.slotScopeIds = E;
                    const we = a(p);
                    if (t(m, we, null, b, T, hr(we), P), L = H ? y(p) : i(p), L && _r(L) && L.data === "teleport end" && (L = i(L)), nn(m)) {
                        let se;
                        H ? (se = B(Re), se.anchor = L ? L.previousSibling : we.lastChild) : se = p.nodeType === 3 ? xe("") : B("div"),
                        se.el = p,
                        m.component.subTree = se
                    }
                } else
                    W & 64 ? X !== 8 ? L = k() : L = m.type.hydrate(p, m, b, T, E, P, e, d) : W & 128 && (L = m.type.hydrate(p, m, b, T, hr(a(p)), E, P, e, s))
            }
            return U != null && Sr(U, null, T, m), L
        },
        l = (p, m, b, T, E, P) => {
            P = P || !!m.dynamicChildren;
            const {type: H, props: k, patchFlag: M, shapeFlag: U, dirs: W} = m,
                F = H === "input" && W || H === "option";
            if (F || M !== -1) {
                if (W && mt(m, null, b, "created"), k)
                    if (F || !P || M & 48)
                        for (const L in k)
                            (F && L.endsWith("value") || nr(L) && !Dn(L)) && r(p, L, null, k[L], !1, void 0, b);
                    else
                        k.onClick && r(p, "onClick", null, k.onClick, !1, void 0, b);
                let X;
                if ((X = k && k.onVnodeBeforeMount) && De(X, b, m), W && mt(m, null, b, "beforeMount"), ((X = k && k.onVnodeMounted) || W) && Ea(() => {
                    X && De(X, b, m),
                    W && mt(m, null, b, "mounted")
                }, T), U & 16 && !(k && (k.innerHTML || k.textContent))) {
                    let L = d(p.firstChild, m, p, b, T, E, P);
                    for (; L;) {
                        Ot = !0;
                        const we = L;
                        L = L.nextSibling,
                        c(we)
                    }
                } else
                    U & 8 && p.textContent !== m.children && (Ot = !0, p.textContent = m.children)
            }
            return p.nextSibling
        },
        d = (p, m, b, T, E, P, H) => {
            H = H || !!m.dynamicChildren;
            const k = m.children,
                M = k.length;
            for (let U = 0; U < M; U++) {
                const W = H ? k[U] : k[U] = rt(k[U]);
                if (p)
                    p = s(p, W, T, E, P, H);
                else {
                    if (W.type === yn && !W.children)
                        continue;
                    Ot = !0,
                    n(null, W, b, null, T, E, hr(b), P)
                }
            }
            return p
        },
        h = (p, m, b, T, E, P) => {
            const {slotScopeIds: H} = m;
            H && (E = E ? E.concat(H) : H);
            const k = a(p),
                M = d(i(p), m, k, b, T, E, P);
            return M && _r(M) && M.data === "]" ? i(m.anchor = M) : (Ot = !0, u(m.anchor = f("]"), k, M), M)
        },
        g = (p, m, b, T, E, P) => {
            if (Ot = !0, m.el = null, P) {
                const M = y(p);
                for (;;) {
                    const U = i(p);
                    if (U && U !== M)
                        c(U);
                    else
                        break
                }
            }
            const H = i(p),
                k = a(p);
            return c(p), n(null, m, k, H, b, T, hr(k), E), H
        },
        y = p => {
            let m = 0;
            for (; p;)
                if (p = i(p), p && _r(p) && (p.data === "[" && m++, p.data === "]")) {
                    if (m === 0)
                        return i(p);
                    m--
                }
            return p
        };
    return [_, s]
}
const Me = Ea;
function Su(e) {
    return Ka(e)
}
function xu(e) {
    return Ka(e, ku)
}
function Ka(e, t) {
    const n = ec();
    n.__VUE__ = !0;
    const {insert: r, remove: o, patchProp: i, createElement: a, createText: c, createComment: u, setText: f, setElementText: _, parentNode: s, nextSibling: l, setScopeId: d=pt, insertStaticContent: h} = e,
        g = (v, w, A, C=null, x=null, I=null, V=!1, O=null, $=!!w.dynamicChildren) => {
            if (v === w)
                return;
            v && !dt(v, w) && (C = D(v), Ae(v, x, I, !0), v = null),
            w.patchFlag === -2 && ($ = !1, w.dynamicChildren = null);
            const {type: R, ref: Z, shapeFlag: K} = w;
            switch (R) {
            case yn:
                y(v, w, A, C);
                break;
            case Be:
                p(v, w, A, C);
                break;
            case Vn:
                v == null && m(w, A, C, V);
                break;
            case Re:
                F(v, w, A, C, x, I, V, O, $);
                break;
            default:
                K & 1 ? E(v, w, A, C, x, I, V, O, $) : K & 6 ? X(v, w, A, C, x, I, V, O, $) : (K & 64 || K & 128) && R.process(v, w, A, C, x, I, V, O, $, re)
            }
            Z != null && x && Sr(Z, v && v.ref, I, w || v, !w)
        },
        y = (v, w, A, C) => {
            if (v == null)
                r(w.el = c(w.children), A, C);
            else {
                const x = w.el = v.el;
                w.children !== v.children && f(x, w.children)
            }
        },
        p = (v, w, A, C) => {
            v == null ? r(w.el = u(w.children || ""), A, C) : w.el = v.el
        },
        m = (v, w, A, C) => {
            [v.el, v.anchor] = h(v.children, w, A, C, v.el, v.anchor)
        },
        b = ({el: v, anchor: w}, A, C) => {
            let x;
            for (; v && v !== w;)
                x = l(v),
                r(v, A, C),
                v = x;
            r(w, A, C)
        },
        T = ({el: v, anchor: w}) => {
            let A;
            for (; v && v !== w;)
                A = l(v),
                o(v),
                v = A;
            o(w)
        },
        E = (v, w, A, C, x, I, V, O, $) => {
            V = V || w.type === "svg",
            v == null ? P(w, A, C, x, I, V, O, $) : M(v, w, x, I, V, O, $)
        },
        P = (v, w, A, C, x, I, V, O) => {
            let $,
                R;
            const {type: Z, props: K, shapeFlag: G, transition: Q, dirs: ie} = v;
            if ($ = v.el = a(v.type, I, K && K.is, K), G & 8 ? _($, v.children) : G & 16 && k(v.children, $, null, C, x, I && Z !== "foreignObject", V, O), ie && mt(v, null, C, "created"), H($, v, v.scopeId, V, C), K) {
                for (const _e in K)
                    _e !== "value" && !Dn(_e) && i($, _e, null, K[_e], I, v.children, C, x, j);
                "value" in K && i($, "value", null, K.value),
                (R = K.onVnodeBeforeMount) && De(R, C, v)
            }
            ie && mt(v, null, C, "beforeMount");
            const ve = (!x || x && !x.pendingBranch) && Q && !Q.persisted;
            ve && Q.beforeEnter($),
            r($, w, A),
            ((R = K && K.onVnodeMounted) || ve || ie) && Me(() => {
                R && De(R, C, v),
                ve && Q.enter($),
                ie && mt(v, null, C, "mounted")
            }, x)
        },
        H = (v, w, A, C, x) => {
            if (A && d(v, A), C)
                for (let I = 0; I < C.length; I++)
                    d(v, C[I]);
            if (x) {
                let I = x.subTree;
                if (w === I) {
                    const V = x.vnode;
                    H(v, V, V.scopeId, V.slotScopeIds, x.parent)
                }
            }
        },
        k = (v, w, A, C, x, I, V, O, $=0) => {
            for (let R = $; R < v.length; R++) {
                const Z = v[R] = O ? Bt(v[R]) : rt(v[R]);
                g(null, Z, w, A, C, x, I, V, O)
            }
        },
        M = (v, w, A, C, x, I, V) => {
            const O = w.el = v.el;
            let {patchFlag: $, dynamicChildren: R, dirs: Z} = w;
            $ |= v.patchFlag & 16;
            const K = v.props || ye,
                G = w.props || ye;
            let Q;
            A && Zt(A, !1),
            (Q = G.onVnodeBeforeUpdate) && De(Q, A, w, v),
            Z && mt(w, v, A, "beforeUpdate"),
            A && Zt(A, !0);
            const ie = x && w.type !== "foreignObject";
            if (R ? U(v.dynamicChildren, R, O, A, C, ie, I) : V || de(v, w, O, null, A, C, ie, I, !1), $ > 0) {
                if ($ & 16)
                    W(O, w, K, G, A, C, x);
                else if ($ & 2 && K.class !== G.class && i(O, "class", null, G.class, x), $ & 4 && i(O, "style", K.style, G.style, x), $ & 8) {
                    const ve = w.dynamicProps;
                    for (let _e = 0; _e < ve.length; _e++) {
                        const Se = ve[_e],
                            lt = K[Se],
                            an = G[Se];
                        (an !== lt || Se === "value") && i(O, Se, lt, an, x, v.children, A, C, j)
                    }
                }
                $ & 1 && v.children !== w.children && _(O, w.children)
            } else
                !V && R == null && W(O, w, K, G, A, C, x);
            ((Q = G.onVnodeUpdated) || Z) && Me(() => {
                Q && De(Q, A, w, v),
                Z && mt(w, v, A, "updated")
            }, C)
        },
        U = (v, w, A, C, x, I, V) => {
            for (let O = 0; O < w.length; O++) {
                const $ = v[O],
                    R = w[O],
                    Z = $.el && ($.type === Re || !dt($, R) || $.shapeFlag & 70) ? s($.el) : A;
                g($, R, Z, null, C, x, I, V, !0)
            }
        },
        W = (v, w, A, C, x, I, V) => {
            if (A !== C) {
                if (A !== ye)
                    for (const O in A)
                        !Dn(O) && !(O in C) && i(v, O, A[O], null, V, w.children, x, I, j);
                for (const O in C) {
                    if (Dn(O))
                        continue;
                    const $ = C[O],
                        R = A[O];
                    $ !== R && O !== "value" && i(v, O, R, $, V, w.children, x, I, j)
                }
                "value" in C && i(v, "value", A.value, C.value)
            }
        },
        F = (v, w, A, C, x, I, V, O, $) => {
            const R = w.el = v ? v.el : c(""),
                Z = w.anchor = v ? v.anchor : c("");
            let {patchFlag: K, dynamicChildren: G, slotScopeIds: Q} = w;
            Q && (O = O ? O.concat(Q) : Q),
            v == null ? (r(R, A, C), r(Z, A, C), k(w.children, A, Z, x, I, V, O, $)) : K > 0 && K & 64 && G && v.dynamicChildren ? (U(v.dynamicChildren, G, A, x, I, V, O), (w.key != null || x && w === x.subTree) && qa(v, w, !0)) : de(v, w, A, Z, x, I, V, O, $)
        },
        X = (v, w, A, C, x, I, V, O, $) => {
            w.slotScopeIds = O,
            v == null ? w.shapeFlag & 512 ? x.ctx.activate(w, A, C, V, $) : L(w, A, C, x, I, V, $) : we(v, w, $)
        },
        L = (v, w, A, C, x, I, V) => {
            const O = v.component = Fu(v, C, x);
            if (or(v) && (O.ctx.renderer = re), Bu(O), O.asyncDep) {
                if (x && x.registerDep(O, se), !v.el) {
                    const $ = O.subTree = B(Be);
                    p(null, $, w, A)
                }
                return
            }
            se(O, v, w, A, x, I, V)
        },
        we = (v, w, A) => {
            const C = w.component = v.component;
            if (Kc(v, w, A))
                if (C.asyncDep && !C.asyncResolved) {
                    fe(C, w, A);
                    return
                } else
                    C.next = w,
                    Dc(C.update),
                    C.update();
            else
                w.el = v.el,
                C.vnode = w
        },
        se = (v, w, A, C, x, I, V) => {
            const O = () => {
                    if (v.isMounted) {
                        let {next: Z, bu: K, u: G, parent: Q, vnode: ie} = v,
                            ve = Z,
                            _e;
                        Zt(v, !1),
                        Z ? (Z.el = ie.el, fe(v, Z, V)) : Z = ie,
                        K && Nn(K),
                        (_e = Z.props && Z.props.onVnodeBeforeUpdate) && De(_e, Q, Z, ie),
                        Zt(v, !0);
                        const Se = qr(v),
                            lt = v.subTree;
                        v.subTree = Se,
                        g(lt, Se, s(lt.el), D(lt), v, x, I),
                        Z.el = Se.el,
                        ve === null && as(v, Se.el),
                        G && Me(G, x),
                        (_e = Z.props && Z.props.onVnodeUpdated) && Me(() => De(_e, Q, Z, ie), x)
                    } else {
                        let Z;
                        const {el: K, props: G} = w,
                            {bm: Q, m: ie, parent: ve} = v,
                            _e = nn(w);
                        if (Zt(v, !1), Q && Nn(Q), !_e && (Z = G && G.onVnodeBeforeMount) && De(Z, ve, w), Zt(v, !0), K && te) {
                            const Se = () => {
                                v.subTree = qr(v),
                                te(K, v.subTree, v, x, null)
                            };
                            _e ? w.type.__asyncLoader().then(() => !v.isUnmounted && Se()) : Se()
                        } else {
                            const Se = v.subTree = qr(v);
                            g(null, Se, A, C, v, x, I),
                            w.el = Se.el
                        }
                        if (ie && Me(ie, x), !_e && (Z = G && G.onVnodeMounted)) {
                            const Se = w;
                            Me(() => De(Z, ve, Se), x)
                        }
                        (w.shapeFlag & 256 || ve && nn(ve.vnode) && ve.vnode.shapeFlag & 256) && v.a && Me(v.a, x),
                        v.isMounted = !0,
                        w = A = C = null
                    }
                },
                $ = v.effect = new Jo(O, () => Fr(R), v.scope),
                R = v.update = () => $.run();
            R.id = v.uid,
            Zt(v, !0),
            R()
        },
        fe = (v, w, A) => {
            w.component = v;
            const C = v.vnode.props;
            v.vnode = w,
            v.next = null,
            bu(v, w.props, C, A),
            Au(v, w.children, A),
            kn(),
            Vs(),
            Sn()
        },
        de = (v, w, A, C, x, I, V, O, $=!1) => {
            const R = v && v.children,
                Z = v ? v.shapeFlag : 0,
                K = w.children,
                {patchFlag: G, shapeFlag: Q} = w;
            if (G > 0) {
                if (G & 128) {
                    Te(R, K, A, C, x, I, V, O, $);
                    return
                } else if (G & 256) {
                    N(R, K, A, C, x, I, V, O, $);
                    return
                }
            }
            Q & 8 ? (Z & 16 && j(R, x, I), K !== R && _(A, K)) : Z & 16 ? Q & 16 ? Te(R, K, A, C, x, I, V, O, $) : j(R, x, I, !0) : (Z & 8 && _(A, ""), Q & 16 && k(K, A, C, x, I, V, O, $))
        },
        N = (v, w, A, C, x, I, V, O, $) => {
            v = v || pn,
            w = w || pn;
            const R = v.length,
                Z = w.length,
                K = Math.min(R, Z);
            let G;
            for (G = 0; G < K; G++) {
                const Q = w[G] = $ ? Bt(w[G]) : rt(w[G]);
                g(v[G], Q, A, null, x, I, V, O, $)
            }
            R > Z ? j(v, x, I, !0, !1, K) : k(w, A, C, x, I, V, O, $, K)
        },
        Te = (v, w, A, C, x, I, V, O, $) => {
            let R = 0;
            const Z = w.length;
            let K = v.length - 1,
                G = Z - 1;
            for (; R <= K && R <= G;) {
                const Q = v[R],
                    ie = w[R] = $ ? Bt(w[R]) : rt(w[R]);
                if (dt(Q, ie))
                    g(Q, ie, A, null, x, I, V, O, $);
                else
                    break;
                R++
            }
            for (; R <= K && R <= G;) {
                const Q = v[K],
                    ie = w[G] = $ ? Bt(w[G]) : rt(w[G]);
                if (dt(Q, ie))
                    g(Q, ie, A, null, x, I, V, O, $);
                else
                    break;
                K--,
                G--
            }
            if (R > K) {
                if (R <= G) {
                    const Q = G + 1,
                        ie = Q < Z ? w[Q].el : C;
                    for (; R <= G;)
                        g(null, w[R] = $ ? Bt(w[R]) : rt(w[R]), A, ie, x, I, V, O, $),
                        R++
                }
            } else if (R > G)
                for (; R <= K;)
                    Ae(v[R], x, I, !0),
                    R++;
            else {
                const Q = R,
                    ie = R,
                    ve = new Map;
                for (R = ie; R <= G; R++) {
                    const Ve = w[R] = $ ? Bt(w[R]) : rt(w[R]);
                    Ve.key != null && ve.set(Ve.key, R)
                }
                let _e,
                    Se = 0;
                const lt = G - ie + 1;
                let an = !1,
                    Rs = 0;
                const Rn = new Array(lt);
                for (R = 0; R < lt; R++)
                    Rn[R] = 0;
                for (R = Q; R <= K; R++) {
                    const Ve = v[R];
                    if (Se >= lt) {
                        Ae(Ve, x, I, !0);
                        continue
                    }
                    let _t;
                    if (Ve.key != null)
                        _t = ve.get(Ve.key);
                    else
                        for (_e = ie; _e <= G; _e++)
                            if (Rn[_e - ie] === 0 && dt(Ve, w[_e])) {
                                _t = _e;
                                break
                            }
                    _t === void 0 ? Ae(Ve, x, I, !0) : (Rn[_t - ie] = R + 1, _t >= Rs ? Rs = _t : an = !0, g(Ve, w[_t], A, null, x, I, V, O, $), Se++)
                }
                const Hs = an ? Pu(Rn) : pn;
                for (_e = Hs.length - 1, R = lt - 1; R >= 0; R--) {
                    const Ve = ie + R,
                        _t = w[Ve],
                        Os = Ve + 1 < Z ? w[Ve + 1].el : C;
                    Rn[R] === 0 ? g(null, _t, A, Os, x, I, V, O, $) : an && (_e < 0 || R !== Hs[_e] ? me(_t, A, Os, 2) : _e--)
                }
            }
        },
        me = (v, w, A, C, x=null) => {
            const {el: I, type: V, transition: O, children: $, shapeFlag: R} = v;
            if (R & 6) {
                me(v.component.subTree, w, A, C);
                return
            }
            if (R & 128) {
                v.suspense.move(w, A, C);
                return
            }
            if (R & 64) {
                V.move(v, w, A, re);
                return
            }
            if (V === Re) {
                r(I, w, A);
                for (let K = 0; K < $.length; K++)
                    me($[K], w, A, C);
                r(v.anchor, w, A);
                return
            }
            if (V === Vn) {
                b(v, w, A);
                return
            }
            if (C !== 2 && R & 1 && O)
                if (C === 0)
                    O.beforeEnter(I),
                    r(I, w, A),
                    Me(() => O.enter(I), x);
                else {
                    const {leave: K, delayLeave: G, afterLeave: Q} = O,
                        ie = () => r(I, w, A),
                        ve = () => {
                            K(I, () => {
                                ie(),
                                Q && Q()
                            })
                        };
                    G ? G(I, ie, ve) : ve()
                }
            else
                r(I, w, A)
        },
        Ae = (v, w, A, C=!1, x=!1) => {
            const {type: I, props: V, ref: O, children: $, dynamicChildren: R, shapeFlag: Z, patchFlag: K, dirs: G} = v;
            if (O != null && Sr(O, null, A, v, !0), Z & 256) {
                w.ctx.deactivate(v);
                return
            }
            const Q = Z & 1 && G,
                ie = !nn(v);
            let ve;
            if (ie && (ve = V && V.onVnodeBeforeUnmount) && De(ve, w, v), Z & 6)
                S(v.component, A, C);
            else {
                if (Z & 128) {
                    v.suspense.unmount(A, C);
                    return
                }
                Q && mt(v, null, w, "beforeUnmount"),
                Z & 64 ? v.type.remove(v, w, A, x, re, C) : R && (I !== Re || K > 0 && K & 64) ? j(R, w, A, !1, !0) : (I === Re && K & 384 || !x && Z & 16) && j($, w, A),
                C && at(v)
            }
            (ie && (ve = V && V.onVnodeUnmounted) || Q) && Me(() => {
                ve && De(ve, w, v),
                Q && mt(v, null, w, "unmounted")
            }, A)
        },
        at = v => {
            const {type: w, el: A, anchor: C, transition: x} = v;
            if (w === Re) {
                je(A, C);
                return
            }
            if (w === Vn) {
                T(v);
                return
            }
            const I = () => {
                o(A),
                x && !x.persisted && x.afterLeave && x.afterLeave()
            };
            if (v.shapeFlag & 1 && x && !x.persisted) {
                const {leave: V, delayLeave: O} = x,
                    $ = () => V(A, I);
                O ? O(v.el, I, $) : $()
            } else
                I()
        },
        je = (v, w) => {
            let A;
            for (; v !== w;)
                A = l(v),
                o(v),
                v = A;
            o(w)
        },
        S = (v, w, A) => {
            const {bum: C, scope: x, update: I, subTree: V, um: O} = v;
            C && Nn(C),
            x.stop(),
            I && (I.active = !1, Ae(V, v, w, A)),
            O && Me(O, w),
            Me(() => {
                v.isUnmounted = !0
            }, w),
            w && w.pendingBranch && !w.isUnmounted && v.asyncDep && !v.asyncResolved && v.suspenseId === w.pendingId && (w.deps--, w.deps === 0 && w.resolve())
        },
        j = (v, w, A, C=!1, x=!1, I=0) => {
            for (let V = I; V < v.length; V++)
                Ae(v[V], w, A, C, x)
        },
        D = v => v.shapeFlag & 6 ? D(v.component.subTree) : v.shapeFlag & 128 ? v.suspense.next() : l(v.anchor || v.el),
        q = (v, w, A) => {
            v == null ? w._vnode && Ae(w._vnode, null, null, !0) : g(w._vnode || null, v, w, null, null, null, A),
            Vs(),
            Ar(),
            w._vnode = v
        },
        re = {
            p: g,
            um: Ae,
            m: me,
            r: at,
            mt: L,
            mc: k,
            pc: de,
            pbc: U,
            n: D,
            o: e
        };
    let ge,
        te;
    return t && ([ge, te] = t(re)), {
        render: q,
        hydrate: ge,
        createApp: Cu(q, ge)
    }
}
function Zt({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function qa(e, t, n=!1) {
    const r = e.children,
        o = t.children;
    if (Y(r) && Y(o))
        for (let i = 0; i < r.length; i++) {
            const a = r[i];
            let c = o[i];
            c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = o[i] = Bt(o[i]), c.el = a.el), n || qa(a, c)),
            c.type === yn && (c.el = a.el)
        }
}
function Pu(e) {
    const t = e.slice(),
        n = [0];
    let r,
        o,
        i,
        a,
        c;
    const u = e.length;
    for (r = 0; r < u; r++) {
        const f = e[r];
        if (f !== 0) {
            if (o = n[n.length - 1], e[o] < f) {
                t[r] = o,
                n.push(r);
                continue
            }
            for (i = 0, a = n.length - 1; i < a;)
                c = i + a >> 1,
                e[n[c]] < f ? i = c + 1 : a = c;
            f < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
        }
    }
    for (i = n.length, a = n[i - 1]; i-- > 0;)
        n[i] = a,
        a = t[a];
    return n
}
const Mu = e => e.__isTeleport,
    Re = Symbol(void 0),
    yn = Symbol(void 0),
    Be = Symbol(void 0),
    Vn = Symbol(void 0),
    Un = [];
let ot = null;
function oe(e=!1) {
    Un.push(ot = e ? null : [])
}
function za() {
    Un.pop(),
    ot = Un[Un.length - 1] || null
}
let bn = 1;
function Js(e) {
    bn += e
}
function Za(e) {
    return e.dynamicChildren = bn > 0 ? ot || pn : null, za(), bn > 0 && ot && ot.push(e), e
}
function Ee(e, t, n, r, o, i) {
    return Za(pe(e, t, n, r, o, i, !0))
}
function Qe(e, t, n, r, o) {
    return Za(B(e, t, n, r, o, !0))
}
function wn(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function dt(e, t) {
    return e.type === t.type && e.key === t.key
}
const Nr = "__vInternal",
    Ga = ({key: e}) => e ?? null,
    yr = ({ref: e, ref_key: t, ref_for: n}) => e != null ? ke(e) || Pe(e) || J(e) ? {
        i: He,
        r: e,
        k: t,
        f: !!n
    } : e : null;
function pe(e, t=null, n=null, r=0, o=null, i=e === Re ? 0 : 1, a=!1, c=!1) {
    const u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Ga(t),
        ref: t && yr(t),
        scopeId: wa,
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
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: He
    };
    return c ? (_s(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= ke(n) ? 8 : 16), bn > 0 && !a && ot && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && ot.push(u), u
}
const B = Ru;
function Ru(e, t=null, n=null, r=0, o=null, i=!1) {
    if ((!e || e === Ia) && (e = Be), wn(e)) {
        const c = xt(e, t, !0);
        return n && _s(c, n), bn > 0 && !i && ot && (c.shapeFlag & 6 ? ot[ot.indexOf(e)] = c : ot.push(c)), c.patchFlag |= -2, c
    }
    if (Vu(e) && (e = e.__vccOpts), t) {
        t = Hu(t);
        let {class: c, style: u} = t;
        c && !ke(c) && (t.class = vt(c)),
        be(u) && (ca(u) && !Y(u) && (u = Oe({}, u)), t.style = on(u))
    }
    const a = ke(e) ? 1 : Ta(e) ? 128 : Mu(e) ? 64 : be(e) ? 4 : J(e) ? 2 : 0;
    return pe(e, t, n, r, o, a, i, !0)
}
function Hu(e) {
    return e ? ca(e) || Nr in e ? Oe({}, e) : e : null
}
function xt(e, t, n=!1) {
    const {props: r, ref: o, patchFlag: i, children: a} = e,
        c = t ? Lu(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && Ga(c),
        ref: t && t.ref ? n && o ? Y(o) ? o.concat(yr(t)) : [o, yr(t)] : yr(t) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: a,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Re ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && xt(e.ssContent),
        ssFallback: e.ssFallback && xt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function xe(e=" ", t=0) {
    return B(yn, null, e, t)
}
function Ou(e, t) {
    const n = B(Vn, null, e);
    return n.staticCount = t, n
}
function Nt(e="", t=!1) {
    return t ? (oe(), Qe(Be, null, e)) : B(Be, null, e)
}
function rt(e) {
    return e == null || typeof e == "boolean" ? B(Be) : Y(e) ? B(Re, null, e.slice()) : typeof e == "object" ? Bt(e) : B(yn, null, String(e))
}
function Bt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : xt(e)
}
function _s(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null)
        t = null;
    else if (Y(t))
        n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1), _s(e, o()), o._c && (o._d = !0));
            return
        } else {
            n = 32;
            const o = t._;
            !o && !(Nr in t) ? t._ctx = He : o === 3 && He && (He.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else
        J(t) ? (t = {
            default: t,
            _ctx: He
        }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [xe(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function Lu(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const o in r)
            if (o === "class")
                t.class !== r.class && (t.class = vt([t.class, r.class]));
            else if (o === "style")
                t.style = on([t.style, r.style]);
            else if (nr(o)) {
                const i = t[o],
                    a = r[o];
                a && i !== a && !(Y(i) && i.includes(a)) && (t[o] = i ? [].concat(i, a) : a)
            } else
                o !== "" && (t[o] = r[o])
    }
    return t
}
function De(e, t, n, r=null) {
    st(e, t, 7, [n, r])
}
const Iu = Wa();
let $u = 0;
function Fu(e, t, n) {
    const r = e.type,
        o = (t ? t.appContext : e.appContext) || Iu,
        i = {
            uid: $u++,
            vnode: e,
            type: r,
            parent: t,
            appContext: o,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new tc(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(o.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Na(r, o),
            emitsOptions: ba(r, o),
            emit: null,
            emitted: null,
            propsDefaults: ye,
            inheritAttrs: r.inheritAttrs,
            ctx: ye,
            data: ye,
            props: ye,
            attrs: ye,
            slots: ye,
            refs: ye,
            setupState: ye,
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
    return i.ctx = {
        _: i
    }, i.root = t ? t.root : i, i.emit = jc.bind(null, i), e.ce && e.ce(i), i
}
let Ce = null;
const zt = () => Ce || He,
    qt = e => {
        Ce = e,
        e.scope.on()
    },
    Wt = () => {
        Ce && Ce.scope.off(),
        Ce = null
    };
function Xa(e) {
    return e.vnode.shapeFlag & 4
}
let Tn = !1;
function Bu(e, t=!1) {
    Tn = t;
    const {props: n, children: r} = e.vnode,
        o = Xa(e);
    yu(e, n, o, t),
    Tu(e, r);
    const i = o ? Du(e, t) : void 0;
    return Tn = !1, i
}
function Du(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = ua(new Proxy(e.ctx, pu));
    const {setup: r} = n;
    if (r) {
        const o = e.setupContext = r.length > 1 ? ju(e) : null;
        qt(e),
        kn();
        const i = Vt(r, e, 0, [e.props, o]);
        if (Sn(), Wt(), Xo(i)) {
            if (i.then(Wt, Wt), t)
                return i.then(a => {
                    To(e, a, t)
                }).catch(a => {
                    xn(a, e, 0)
                });
            e.asyncDep = i
        } else
            To(e, i, t)
    } else
        Ya(e, t)
}
function To(e, t, n) {
    J(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : be(t) && (e.setupState = ha(t)),
    Ya(e, n)
}
let ei;
function Ya(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && ei && !r.render) {
            const o = r.template || ps(e).template;
            if (o) {
                const {isCustomElement: i, compilerOptions: a} = e.appContext.config,
                    {delimiters: c, compilerOptions: u} = r,
                    f = Oe(Oe({
                        isCustomElement: i,
                        delimiters: c
                    }, a), u);
                r.render = ei(o, f)
            }
        }
        e.render = r.render || pt
    }
    qt(e),
    kn(),
    hu(e),
    Sn(),
    Wt()
}
function Nu(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return Ne(e, "get", "$attrs"), t[n]
        }
    })
}
function ju(e) {
    const t = r => {
        e.exposed = r || {}
    };
    let n;
    return {
        get attrs() {
            return n || (n = Nu(e))
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function jr(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(ha(ua(e.exposed)), {
                get(t, n) {
                    if (n in t)
                        return t[n];
                    if (n in jn)
                        return jn[n](e)
                },
                has(t, n) {
                    return n in t || n in jn
                }
            }))
}
function Ao(e, t=!0) {
    return J(e) ? e.displayName || e.name : e.name || t && e.__name
}
function Vu(e) {
    return J(e) && "__vccOpts" in e
}
const le = (e, t) => $c(e, t, Tn);
function Uu(e) {
    const t = zt();
    let n = e();
    return Wt(), Xo(n) && (n = n.catch(r => {
        throw qt(t), r
    })), [n, () => qt(t)]
}
function et(e, t, n) {
    const r = arguments.length;
    return r === 2 ? be(t) && !Y(t) ? wn(t) ? B(e, null, [t]) : B(e, t) : B(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && wn(n) && (n = [n]), B(e, t, n))
}
const Wu = Symbol(""),
    Ku = () => Je(Wu),
    Qa = "3.2.47",
    qu = "http://www.w3.org/2000/svg",
    Jt = typeof document < "u" ? document : null,
    ti = Jt && Jt.createElement("template"),
    zu = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const o = t ? Jt.createElementNS(qu, e) : Jt.createElement(e, n ? {
                is: n
            } : void 0);
            return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o
        },
        createText: e => Jt.createTextNode(e),
        createComment: e => Jt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => Jt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, r, o, i) {
            const a = n ? n.previousSibling : t.lastChild;
            if (o && (o === i || o.nextSibling))
                for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling));)
                    ;
            else {
                ti.innerHTML = r ? `<svg>${e}</svg>` : e;
                const c = ti.content;
                if (r) {
                    const u = c.firstChild;
                    for (; u.firstChild;)
                        c.appendChild(u.firstChild);
                    c.removeChild(u)
                }
                t.insertBefore(c, n)
            }
            return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };
function Zu(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function Gu(e, t, n) {
    const r = e.style,
        o = ke(n);
    if (n && !o) {
        if (t && !ke(t))
            for (const i in t)
                n[i] == null && Eo(r, i, "");
        for (const i in n)
            Eo(r, i, n[i])
    } else {
        const i = r.display;
        o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod" in e && (r.display = i)
    }
}
const ni = /\s*!important$/;
function Eo(e, t, n) {
    if (Y(n))
        n.forEach(r => Eo(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = Xu(e, t);
        ni.test(n) ? e.setProperty(Cn(r), n.replace(ni, ""), "important") : e[r] = n
    }
}
const ri = ["Webkit", "Moz", "ms"],
    Qr = {};
function Xu(e, t) {
    const n = Qr[t];
    if (n)
        return n;
    let r = yt(t);
    if (r !== "filter" && r in e)
        return Qr[t] = r;
    r = Ir(r);
    for (let o = 0; o < ri.length; o++) {
        const i = ri[o] + r;
        if (i in e)
            return Qr[t] = i
    }
    return t
}
const oi = "http://www.w3.org/1999/xlink";
function Yu(e, t, n, r, o) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(oi, t.slice(6, t.length)) : e.setAttributeNS(oi, t, n);
    else {
        const i = Kl(t);
        n == null || i && !qi(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n)
    }
}
function Qu(e, t, n, r, o, i, a) {
    if (t === "innerHTML" || t === "textContent") {
        r && a(r, o, i),
        e[t] = n ?? "";
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const u = n ?? "";
        (e.value !== u || e.tagName === "OPTION") && (e.value = u),
        n == null && e.removeAttribute(t);
        return
    }
    let c = !1;
    if (n === "" || n == null) {
        const u = typeof e[t];
        u === "boolean" ? n = qi(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0)
    }
    try {
        e[t] = n
    } catch {}
    c && e.removeAttribute(t)
}
function Ju(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function ef(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
function tf(e, t, n, r, o=null) {
    const i = e._vei || (e._vei = {}),
        a = i[t];
    if (r && a)
        a.value = r;
    else {
        const [c, u] = nf(t);
        if (r) {
            const f = i[t] = sf(r, o);
            Ju(e, c, f, u)
        } else
            a && (ef(e, c, a, u), i[t] = void 0)
    }
}
const si = /(?:Once|Passive|Capture)$/;
function nf(e) {
    let t;
    if (si.test(e)) {
        t = {};
        let r;
        for (; r = e.match(si);)
            e = e.slice(0, e.length - r[0].length),
            t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Cn(e.slice(2)), t]
}
let Jr = 0;
const rf = Promise.resolve(),
    of = () => Jr || (rf.then(() => Jr = 0), Jr = Date.now());
function sf(e, t) {
    const n = r => {
        if (!r._vts)
            r._vts = Date.now();
        else if (r._vts <= n.attached)
            return;
        st(af(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = of(), n
}
function af(e, t) {
    if (Y(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e),
            e._stopped = !0
        }, t.map(r => o => !o._stopped && r && r(o))
    } else
        return t
}
const ii = /^on[a-z]/,
    lf = (e, t, n, r, o=!1, i, a, c, u) => {
        t === "class" ? Zu(e, r, o) : t === "style" ? Gu(e, n, r) : nr(t) ? zo(t) || tf(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : cf(e, t, r, o)) ? Qu(e, t, r, i, a, c, u) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Yu(e, t, r, o))
    };
function cf(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && ii.test(t) && J(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ii.test(t) && ke(n) ? !1 : t in e
}
const Lt = "transition",
    Hn = "animation",
    kt = (e, {slots: t}) => et(ka, uf(e), t);
kt.displayName = "Transition";
const Ja = {
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
kt.props = Oe({}, ka.props, Ja);
const Gt = (e, t=[]) => {
        Y(e) ? e.forEach(n => n(...t)) : e && e(...t)
    },
    ai = e => e ? Y(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;
function uf(e) {
    const t = {};
    for (const F in e)
        F in Ja || (t[F] = e[F]);
    if (e.css === !1)
        return t;
    const {name: n="v", type: r, duration: o, enterFromClass: i=`${n}-enter-from`, enterActiveClass: a=`${n}-enter-active`, enterToClass: c=`${n}-enter-to`, appearFromClass: u=i, appearActiveClass: f=a, appearToClass: _=c, leaveFromClass: s=`${n}-leave-from`, leaveActiveClass: l=`${n}-leave-active`, leaveToClass: d=`${n}-leave-to`} = e,
        h = ff(o),
        g = h && h[0],
        y = h && h[1],
        {onBeforeEnter: p, onEnter: m, onEnterCancelled: b, onLeave: T, onLeaveCancelled: E, onBeforeAppear: P=p, onAppear: H=m, onAppearCancelled: k=b} = t,
        M = (F, X, L) => {
            Xt(F, X ? _ : c),
            Xt(F, X ? f : a),
            L && L()
        },
        U = (F, X) => {
            F._isLeaving = !1,
            Xt(F, s),
            Xt(F, d),
            Xt(F, l),
            X && X()
        },
        W = F => (X, L) => {
            const we = F ? H : m,
                se = () => M(X, F, L);
            Gt(we, [X, se]),
            li(() => {
                Xt(X, F ? u : i),
                It(X, F ? _ : c),
                ai(we) || ci(X, r, g, se)
            })
        };
    return Oe(t, {
        onBeforeEnter(F) {
            Gt(p, [F]),
            It(F, i),
            It(F, a)
        },
        onBeforeAppear(F) {
            Gt(P, [F]),
            It(F, u),
            It(F, f)
        },
        onEnter: W(!1),
        onAppear: W(!0),
        onLeave(F, X) {
            F._isLeaving = !0;
            const L = () => U(F, X);
            It(F, s),
            hf(),
            It(F, l),
            li(() => {
                F._isLeaving && (Xt(F, s), It(F, d), ai(T) || ci(F, r, y, L))
            }),
            Gt(T, [F, L])
        },
        onEnterCancelled(F) {
            M(F, !1),
            Gt(b, [F])
        },
        onAppearCancelled(F) {
            M(F, !0),
            Gt(k, [F])
        },
        onLeaveCancelled(F) {
            U(F),
            Gt(E, [F])
        }
    })
}
function ff(e) {
    if (e == null)
        return null;
    if (be(e))
        return [eo(e.enter), eo(e.leave)];
    {
        const t = eo(e);
        return [t, t]
    }
}
function eo(e) {
    return Yi(e)
}
function It(e, t) {
    t.split(/\s+/).forEach(n => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set)).add(t)
}
function Xt(e, t) {
    t.split(/\s+/).forEach(r => r && e.classList.remove(r));
    const {_vtc: n} = e;
    n && (n.delete(t), n.size || (e._vtc = void 0))
}
function li(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e)
    })
}
let df = 0;
function ci(e, t, n, r) {
    const o = e._endId = ++df,
        i = () => {
            o === e._endId && r()
        };
    if (n)
        return setTimeout(i, n);
    const {type: a, timeout: c, propCount: u} = pf(e, t);
    if (!a)
        return r();
    const f = a + "end";
    let _ = 0;
    const s = () => {
            e.removeEventListener(f, l),
            i()
        },
        l = d => {
            d.target === e && ++_ >= u && s()
        };
    setTimeout(() => {
        _ < u && s()
    }, c + 1),
    e.addEventListener(f, l)
}
function pf(e, t) {
    const n = window.getComputedStyle(e),
        r = h => (n[h] || "").split(", "),
        o = r(`${Lt}Delay`),
        i = r(`${Lt}Duration`),
        a = ui(o, i),
        c = r(`${Hn}Delay`),
        u = r(`${Hn}Duration`),
        f = ui(c, u);
    let _ = null,
        s = 0,
        l = 0;
    t === Lt ? a > 0 && (_ = Lt, s = a, l = i.length) : t === Hn ? f > 0 && (_ = Hn, s = f, l = u.length) : (s = Math.max(a, f), _ = s > 0 ? a > f ? Lt : Hn : null, l = _ ? _ === Lt ? i.length : u.length : 0);
    const d = _ === Lt && /\b(transform|all)(,|$)/.test(r(`${Lt}Property`).toString());
    return {
        type: _,
        timeout: s,
        propCount: l,
        hasTransform: d
    }
}
function ui(e, t) {
    for (; e.length < t.length;)
        e = e.concat(e);
    return Math.max(...t.map((n, r) => fi(n) + fi(e[r])))
}
function fi(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function hf() {
    return document.body.offsetHeight
}
const rg = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = e.style.display === "none" ? "" : e.style.display,
        n && t ? n.beforeEnter(e) : On(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e), On(e, !0), r.enter(e)) : r.leave(e, () => {
            On(e, !1)
        }) : On(e, t))
    },
    beforeUnmount(e, {value: t}) {
        On(e, t)
    }
};
function On(e, t) {
    e.style.display = t ? e._vod : "none"
}
const el = Oe({
    patchProp: lf
}, zu);
let Wn,
    di = !1;
function _f() {
    return Wn || (Wn = Su(el))
}
function mf() {
    return Wn = di ? Wn : xu(el), di = !0, Wn
}
const gf = (...e) => {
        const t = _f().createApp(...e),
            {mount: n} = t;
        return t.mount = r => {
            const o = tl(r);
            if (!o)
                return;
            const i = t._component;
            !J(i) && !i.render && !i.template && (i.template = o.innerHTML),
            o.innerHTML = "";
            const a = n(o, !1, o instanceof SVGElement);
            return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), a
        }, t
    },
    vf = (...e) => {
        const t = mf().createApp(...e),
            {mount: n} = t;
        return t.mount = r => {
            const o = tl(r);
            if (o)
                return n(o, !0, o instanceof SVGElement)
        }, t
    };
function tl(e) {
    return ke(e) ? document.querySelector(e) : e
}
const yf = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    bf = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    wf = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function Tf(e, t) {
    if (e !== "__proto__" && !(e === "constructor" && t && typeof t == "object" && "prototype" in t))
        return t
}
function Af(e, t={}) {
    if (typeof e != "string")
        return e;
    const n = e.toLowerCase().trim();
    if (n === "true")
        return !0;
    if (n === "false")
        return !1;
    if (n === "null")
        return null;
    if (n === "nan")
        return Number.NaN;
    if (n === "infinity")
        return Number.POSITIVE_INFINITY;
    if (n !== "undefined") {
        if (!wf.test(e)) {
            if (t.strict)
                throw new SyntaxError("Invalid JSON");
            return e
        }
        try {
            return yf.test(e) || bf.test(e) ? JSON.parse(e, Tf) : JSON.parse(e)
        } catch (r) {
            if (t.strict)
                throw r;
            return e
        }
    }
}
const Ef = /#/g,
    Cf = /&/g,
    kf = /=/g,
    nl = /\+/g,
    Sf = /%5e/gi,
    xf = /%60/gi,
    Pf = /%7c/gi,
    Mf = /%20/gi;
function Rf(e) {
    return encodeURI("" + e).replace(Pf, "|")
}
function Co(e) {
    return Rf(typeof e == "string" ? e : JSON.stringify(e)).replace(nl, "%2B").replace(Mf, "+").replace(Ef, "%23").replace(Cf, "%26").replace(xf, "`").replace(Sf, "^")
}
function to(e) {
    return Co(e).replace(kf, "%3D")
}
function rl(e="") {
    try {
        return decodeURIComponent("" + e)
    } catch {
        return "" + e
    }
}
function Hf(e) {
    return rl(e.replace(nl, " "))
}
function ol(e="") {
    const t = {};
    e[0] === "?" && (e = e.slice(1));
    for (const n of e.split("&")) {
        const r = n.match(/([^=]+)=?(.*)/) || [];
        if (r.length < 2)
            continue;
        const o = rl(r[1]);
        if (o === "__proto__" || o === "constructor")
            continue;
        const i = Hf(r[2] || "");
        typeof t[o] < "u" ? Array.isArray(t[o]) ? t[o].push(i) : t[o] = [t[o], i] : t[o] = i
    }
    return t
}
function Of(e, t) {
    return (typeof t == "number" || typeof t == "boolean") && (t = String(t)), t ? Array.isArray(t) ? t.map(n => `${to(e)}=${Co(n)}`).join("&") : `${to(e)}=${Co(t)}` : to(e)
}
function Lf(e) {
    return Object.keys(e).filter(t => e[t] !== void 0).map(t => Of(t, e[t])).join("&")
}
const If = /^\w{2,}:([/\\]{1,2})/,
    $f = /^\w{2,}:([/\\]{2})?/,
    Ff = /^([/\\]\s*){2,}[^/\\]/;
function Mn(e, t={}) {
    return typeof t == "boolean" && (t = {
        acceptRelative: t
    }), t.strict ? If.test(e) : $f.test(e) || (t.acceptRelative ? Ff.test(e) : !1)
}
const Bf = /\/$|\/\?/;
function ko(e="", t=!1) {
    return t ? Bf.test(e) : e.endsWith("/")
}
function ms(e="", t=!1) {
    if (!t)
        return (ko(e) ? e.slice(0, -1) : e) || "/";
    if (!ko(e, !0))
        return e || "/";
    const [n, ...r] = e.split("?");
    return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "")
}
function sl(e="", t=!1) {
    if (!t)
        return e.endsWith("/") ? e : e + "/";
    if (ko(e, !0))
        return e || "/";
    const [n, ...r] = e.split("?");
    return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "")
}
function Df(e="") {
    return e.startsWith("/")
}
function Nf(e="") {
    return (Df(e) ? e.slice(1) : e) || "/"
}
function jf(e, t) {
    if (il(t) || Mn(e))
        return e;
    const n = ms(t);
    return e.startsWith(n) ? e : sr(n, e)
}
function pi(e, t) {
    if (il(t))
        return e;
    const n = ms(t);
    if (!e.startsWith(n))
        return e;
    const r = e.slice(n.length);
    return r[0] === "/" ? r : "/" + r
}
function Vf(e, t) {
    const n = ir(e),
        r = {
            ...ol(n.search),
            ...t
        };
    return n.search = Lf(r), Wf(n)
}
function il(e) {
    return !e || e === "/"
}
function Uf(e) {
    return e && e !== "/"
}
function sr(e, ...t) {
    let n = e || "";
    for (const r of t.filter(o => Uf(o)))
        n = n ? sl(n) + Nf(r) : r;
    return n
}
function ir(e="", t) {
    if (!Mn(e, {
        acceptRelative: !0
    }))
        return t ? ir(t + e) : hi(e);
    const [n="", r, o=""] = (e.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1),
        [i="", a=""] = (o.match(/([^#/?]*)(.*)?/) || []).splice(1),
        {pathname: c, search: u, hash: f} = hi(a.replace(/\/(?=[A-Za-z]:)/, ""));
    return {
        protocol: n,
        auth: r ? r.slice(0, Math.max(0, r.length - 1)) : "",
        host: i,
        pathname: c,
        search: u,
        hash: f
    }
}
function hi(e="") {
    const [t="", n="", r=""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
        pathname: t,
        search: n,
        hash: r
    }
}
function Wf(e) {
    const t = e.pathname + (e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "") + e.hash;
    return e.protocol ? e.protocol + "//" + (e.auth ? e.auth + "@" : "") + e.host + t : t
}
class Kf extends Error {
    constructor()
    {
        super(...arguments),
        this.name = "FetchError"
    }
}
function qf(e, t, n) {
    let r = "";
    t && (r = t.message),
    e && n ? r = `${r} (${n.status} ${n.statusText} (${e.toString()}))` : e && (r = `${r} (${e.toString()})`);
    const o = new Kf(r);
    return Object.defineProperty(o, "request", {
        get() {
            return e
        }
    }), Object.defineProperty(o, "response", {
        get() {
            return n
        }
    }), Object.defineProperty(o, "data", {
        get() {
            return n && n._data
        }
    }), Object.defineProperty(o, "status", {
        get() {
            return n && n.status
        }
    }), Object.defineProperty(o, "statusText", {
        get() {
            return n && n.statusText
        }
    }), Object.defineProperty(o, "statusCode", {
        get() {
            return n && n.status
        }
    }), Object.defineProperty(o, "statusMessage", {
        get() {
            return n && n.statusText
        }
    }), o
}
const zf = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function _i(e="GET") {
    return zf.has(e.toUpperCase())
}
function Zf(e) {
    if (e === void 0)
        return !1;
    const t = typeof e;
    return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function"
}
const Gf = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]),
    Xf = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Yf(e="") {
    if (!e)
        return "json";
    const t = e.split(";").shift() || "";
    return Xf.test(t) ? "json" : Gf.has(t) || t.startsWith("text/") ? "text" : "blob"
}
const Qf = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function al(e) {
    const {fetch: t, Headers: n} = e;
    function r(a) {
        const c = a.error && a.error.name === "AbortError" || !1;
        if (a.options.retry !== !1 && !c) {
            let f;
            typeof a.options.retry == "number" ? f = a.options.retry : f = _i(a.options.method) ? 0 : 1;
            const _ = a.response && a.response.status || 500;
            if (f > 0 && Qf.has(_))
                return o(a.request, {
                    ...a.options,
                    retry: f - 1
                })
        }
        const u = qf(a.request, a.error, a.response);
        throw Error.captureStackTrace && Error.captureStackTrace(u, o), u
    }
    const o = async function(c, u={}) {
            const f = {
                request: c,
                options: {
                    ...e.defaults,
                    ...u
                },
                response: void 0,
                error: void 0
            };
            f.options.onRequest && await f.options.onRequest(f),
            typeof f.request == "string" && (f.options.baseURL && (f.request = jf(f.request, f.options.baseURL)), (f.options.query || f.options.params) && (f.request = Vf(f.request, {
                ...f.options.params,
                ...f.options.query
            })), f.options.body && _i(f.options.method) && Zf(f.options.body) && (f.options.body = typeof f.options.body == "string" ? f.options.body : JSON.stringify(f.options.body), f.options.headers = new n(f.options.headers), f.options.headers.has("content-type") || f.options.headers.set("content-type", "application/json"), f.options.headers.has("accept") || f.options.headers.set("accept", "application/json"))),
            f.response = await t(f.request, f.options).catch(async s => (f.error = s, f.options.onRequestError && await f.options.onRequestError(f), r(f)));
            const _ = (f.options.parseResponse ? "json" : f.options.responseType) || Yf(f.response.headers.get("content-type") || "");
            if (_ === "json") {
                const s = await f.response.text(),
                    l = f.options.parseResponse || Af;
                f.response._data = l(s)
            } else
                _ === "stream" ? f.response._data = f.response.body : f.response._data = await f.response[_]();
            return f.options.onResponse && await f.options.onResponse(f), f.response.status >= 400 && f.response.status < 600 ? (f.options.onResponseError && await f.options.onResponseError(f), r(f)) : f.response
        },
        i = function(c, u) {
            return o(c, u).then(f => f._data)
        };
    return i.raw = o, i.native = t, i.create = (a={}) => al({
        ...e,
        defaults: {
            ...e.defaults,
            ...a
        }
    }), i
}
const ll = function() {
        if (typeof globalThis < "u")
            return globalThis;
        if (typeof self < "u")
            return self;
        if (typeof window < "u")
            return window;
        if (typeof global < "u")
            return global;
        throw new Error("unable to locate global object")
    }(),
    Jf = ll.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
    ed = ll.Headers,
    td = al({
        fetch: Jf,
        Headers: ed
    }),
    nd = td,
    rd = () => {
        var e;
        return ((e = window == null ? void 0 : window.__NUXT__) == null ? void 0 : e.config) || {}
    },
    xr = rd().app,
    od = () => xr.baseURL,
    sd = () => xr.buildAssetsDir,
    id = (...e) => sr(cl(), sd(), ...e),
    cl = (...e) => {
        const t = xr.cdnURL || xr.baseURL;
        return e.length ? sr(t, ...e) : t
    };
globalThis.__buildAssetsURL = id,
globalThis.__publicAssetsURL = cl;
function So(e, t={}, n) {
    for (const r in e) {
        const o = e[r],
            i = n ? `${n}:${r}` : r;
        typeof o == "object" && o !== null ? So(o, t, i) : typeof o == "function" && (t[i] = o)
    }
    return t
}
const ad = {
        run: e => e()
    },
    ld = () => ad,
    ul = typeof console.createTask < "u" ? console.createTask : ld;
function cd(e, t) {
    const n = t.shift(),
        r = ul(n);
    return e.reduce((o, i) => o.then(() => r.run(() => i(...t))), Promise.resolve())
}
function ud(e, t) {
    const n = t.shift(),
        r = ul(n);
    return Promise.all(e.map(o => r.run(() => o(...t))))
}
function no(e, t) {
    for (const n of [...e])
        n(t)
}
class fd {
    constructor()
    {
        this._hooks = {},
        this._before = void 0,
        this._after = void 0,
        this._deprecatedMessages = void 0,
        this._deprecatedHooks = {},
        this.hook = this.hook.bind(this),
        this.callHook = this.callHook.bind(this),
        this.callHookWith = this.callHookWith.bind(this)
    }
    hook(t, n, r={})
    {
        if (!t || typeof n != "function")
            return () => {};
        const o = t;
        let i;
        for (; this._deprecatedHooks[t];)
            i = this._deprecatedHooks[t],
            t = i.to;
        if (i && !r.allowDeprecated) {
            let a = i.message;
            a || (a = `${o} hook has been deprecated` + (i.to ? `, please use ${i.to}` : "")),
            this._deprecatedMessages || (this._deprecatedMessages = new Set),
            this._deprecatedMessages.has(a) || (console.warn(a), this._deprecatedMessages.add(a))
        }
        if (!n.name)
            try {
                Object.defineProperty(n, "name", {
                    get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
                    configurable: !0
                })
            } catch {}
        return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(n), () => {
            n && (this.removeHook(t, n), n = void 0)
        }
    }
    hookOnce(t, n)
    {
        let r,
            o = (...i) => (typeof r == "function" && r(), r = void 0, o = void 0, n(...i));
        return r = this.hook(t, o), r
    }
    removeHook(t, n)
    {
        if (this._hooks[t]) {
            const r = this._hooks[t].indexOf(n);
            r !== -1 && this._hooks[t].splice(r, 1),
            this._hooks[t].length === 0 && delete this._hooks[t]
        }
    }
    deprecateHook(t, n)
    {
        this._deprecatedHooks[t] = typeof n == "string" ? {
            to: n
        } : n;
        const r = this._hooks[t] || [];
        delete this._hooks[t];
        for (const o of r)
            this.hook(t, o)
    }
    deprecateHooks(t)
    {
        Object.assign(this._deprecatedHooks, t);
        for (const n in t)
            this.deprecateHook(n, t[n])
    }
    addHooks(t)
    {
        const n = So(t),
            r = Object.keys(n).map(o => this.hook(o, n[o]));
        return () => {
            for (const o of r.splice(0, r.length))
                o()
        }
    }
    removeHooks(t)
    {
        const n = So(t);
        for (const r in n)
            this.removeHook(r, n[r])
    }
    removeAllHooks()
    {
        for (const t in this._hooks)
            delete this._hooks[t]
    }
    callHook(t, ...n)
    {
        return n.unshift(t), this.callHookWith(cd, t, ...n)
    }
    callHookParallel(t, ...n)
    {
        return n.unshift(t), this.callHookWith(ud, t, ...n)
    }
    callHookWith(t, n, ...r)
    {
        const o = this._before || this._after ? {
            name: n,
            args: r,
            context: {}
        } : void 0;
        this._before && no(this._before, o);
        const i = t(n in this._hooks ? [...this._hooks[n]] : [], r);
        return i instanceof Promise ? i.finally(() => {
            this._after && o && no(this._after, o)
        }) : (this._after && o && no(this._after, o), i)
    }
    beforeEach(t)
    {
        return this._before = this._before || [], this._before.push(t), () => {
            if (this._before !== void 0) {
                const n = this._before.indexOf(t);
                n !== -1 && this._before.splice(n, 1)
            }
        }
    }
    afterEach(t)
    {
        return this._after = this._after || [], this._after.push(t), () => {
            if (this._after !== void 0) {
                const n = this._after.indexOf(t);
                n !== -1 && this._after.splice(n, 1)
            }
        }
    }
}
function fl() {
    return new fd
}
function dd(e={}) {
    let t,
        n = !1;
    const r = a => {
        if (t && t !== a)
            throw new Error("Context conflict")
    };
    let o;
    if (e.asyncContext) {
        const a = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
        a ? o = new a : console.warn("[unctx] `AsyncLocalStorage` is not provided.")
    }
    const i = () => {
        if (o && t === void 0) {
            const a = o.getStore();
            if (a !== void 0)
                return a
        }
        return t
    };
    return {
        use: () => {
            const a = i();
            if (a === void 0)
                throw new Error("Context is not available");
            return a
        },
        tryUse: () => i(),
        set: (a, c) => {
            c || r(a),
            t = a,
            n = !0
        },
        unset: () => {
            t = void 0,
            n = !1
        },
        call: (a, c) => {
            r(a),
            t = a;
            try {
                return o ? o.run(a, c) : c()
            } finally {
                n || (t = void 0)
            }
        },
        async callAsync(a, c) {
            t = a;
            const u = () => {
                    t = a
                },
                f = () => t === a ? u : void 0;
            xo.add(f);
            try {
                const _ = o ? o.run(a, c) : c();
                return n || (t = void 0), await _
            } finally {
                xo.delete(f)
            }
        }
    }
}
function pd(e={}) {
    const t = {};
    return {
        get(n, r={}) {
            return t[n] || (t[n] = dd({
                ...e,
                ...r
            })), t[n], t[n]
        }
    }
}
const Pr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : typeof window < "u" ? window : {},
    mi = "__unctx__",
    hd = Pr[mi] || (Pr[mi] = pd()),
    _d = (e, t={}) => hd.get(e, t),
    gi = "__unctx_async_handlers__",
    xo = Pr[gi] || (Pr[gi] = new Set);
function Po(e) {
    const t = [];
    for (const o of xo) {
        const i = o();
        i && t.push(i)
    }
    const n = () => {
        for (const o of t)
            o()
    };
    let r = e();
    return r && typeof r == "object" && "catch" in r && (r = r.catch(o => {
        throw n(), o
    })), [r, n]
}
const dl = _d("nuxt-app"),
    md = "__nuxt_plugin";
function gd(e) {
    let t = 0;
    const n = {
        provide: void 0,
        globalName: "nuxt",
        versions: {
            get nuxt() {
                return "3.4.3"
            },
            get vue() {
                return n.vueApp.version
            }
        },
        payload: bt({
            data: {},
            state: {},
            _errors: {},
            ...window.__NUXT__ ?? {}
        }),
        static: {
            data: {}
        },
        isHydrating: !0,
        deferHydration() {
            if (!n.isHydrating)
                return () => {};
            t++;
            let i = !1;
            return () => {
                if (!i && (i = !0, t--, t === 0))
                    return n.isHydrating = !1, n.callHook("app:suspense:resolve")
            }
        },
        _asyncDataPromises: {},
        _asyncData: {},
        _payloadRevivers: {},
        ...e
    };
    n.hooks = fl(),
    n.hook = n.hooks.hook,
    n.callHook = n.hooks.callHook,
    n.provide = (i, a) => {
        const c = "$" + i;
        mr(n, c, a),
        mr(n.vueApp.config.globalProperties, c, a)
    },
    mr(n.vueApp, "$nuxt", n),
    mr(n.vueApp.config.globalProperties, "$nuxt", n);
    {
        window.addEventListener("nuxt.preloadError", a => {
            n.callHook("app:chunkError", {
                error: a.payload
            })
        });
        const i = n.hook("app:error", (...a) => {
            console.error("[nuxt] error caught during app initialization", ...a)
        });
        n.hook("app:mounted", i)
    }
    const r = bt(n.payload.config),
        o = new Proxy(r, {
            get(i, a) {
                return a in i ? i[a] : i.public[a]
            },
            set(i, a, c) {
                return a === "public" || a === "app" ? !1 : (i[a] = c, i.public[a] = c, !0)
            }
        });
    return n.provide("config", o), n
}
async function vd(e, t) {
    if (typeof t != "function")
        return;
    const {provide: n} = await Ct(e, t, [e]) || {};
    if (n && typeof n == "object")
        for (const r in n)
            e.provide(r, n[r])
}
async function yd(e, t) {
    for (const n of t)
        await vd(e, n)
}
function bd(e) {
    const t = [];
    for (const n of e) {
        if (typeof n != "function")
            continue;
        let r = n;
        n.length > 1 && (r = o => n(o, o.provide)),
        t.push(r)
    }
    return t.sort((n, r) => {
        var o,
            i;
        return (((o = n.meta) == null ? void 0 : o.order) || Mr.default) - (((i = r.meta) == null ? void 0 : i.order) || Mr.default)
    }), t
}
const Mr = {
    pre: -20,
    default: 0,
    post: 20
};
function tt(e, t) {
    var r;
    if (typeof e == "function")
        return tt({
            setup: e
        }, t);
    const n = o => {
        if (e.hooks && o.hooks.addHooks(e.hooks), e.setup)
            return e.setup(o)
    };
    return n.meta = {
        name: (t == null ? void 0 : t.name) || e.name || ((r = e.setup) == null ? void 0 : r.name),
        order: (t == null ? void 0 : t.order) || e.order || Mr[e.enforce || "default"] || Mr.default
    }, n[md] = !0, n
}
function Ct(e, t, n) {
    const r = () => n ? t(...n) : t();
    return dl.set(e), r()
}
function ue() {
    const e = dl.tryUse();
    if (!e) {
        const t = zt();
        if (!t)
            throw new Error("[nuxt] instance unavailable");
        return t.appContext.app.$nuxt
    }
    return e
}
function sn() {
    return ue().$config
}
function mr(e, t, n) {
    Object.defineProperty(e, t, {
        get: () => n
    })
}
const wd = tt({
    name: "nuxt:global-components"
});
function Td(e) {
    return Array.isArray(e) ? e : [e]
}
const pl = ["title", "script", "style", "noscript"],
    hl = ["base", "meta", "link", "style", "script", "noscript"],
    Ad = ["title", "titleTemplate", "templateParams", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"],
    Ed = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"],
    Cd = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent"];
function _l(e) {
    let t = 9;
    for (let n = 0; n < e.length;)
        t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
    return ((t ^ t >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase()
}
function Mo(e) {
    return _l(`${e.tag}:${e.textContent || e.innerHTML || ""}:${Object.entries(e.props).map(([t, n]) => `${t}:${String(n)}`).join(",")}`)
}
function kd(e) {
    let t = 9;
    for (const n of e)
        for (let r = 0; r < n.length;)
            t = Math.imul(t ^ n.charCodeAt(r++), 9 ** 9);
    return ((t ^ t >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase()
}
function ml(e, t) {
    const {props: n, tag: r} = e;
    if (Ed.includes(r))
        return r;
    if (r === "link" && n.rel === "canonical")
        return "canonical";
    if (n.charset)
        return "charset";
    const o = ["id"];
    r === "meta" && o.push("name", "property", "http-equiv");
    for (const i of o)
        if (typeof n[i] < "u") {
            const a = String(n[i]);
            return t && !t(a) ? !1 : `${r}:${i}:${a}`
        }
    return !1
}
function vi(e, t) {
    return e == null ? t || null : typeof e == "function" ? e(t) : e
}
function gr(e, t=!1, n) {
    const {tag: r, $el: o} = e;
    o && (Object.entries(r.props).forEach(([i, a]) => {
        a = String(a);
        const c = `attr:${i}`;
        if (i === "class") {
            if (!a)
                return;
            for (const u of a.split(" ")) {
                const f = `${c}:${u}`;
                n && n(e, f, () => o.classList.remove(u)),
                o.classList.contains(u) || o.classList.add(u)
            }
            return
        }
        n && !i.startsWith("data-h-") && n(e, c, () => o.removeAttribute(i)),
        (t || o.getAttribute(i) !== a) && o.setAttribute(i, a)
    }), pl.includes(r.tag) && (r.textContent && r.textContent !== o.textContent ? o.textContent = r.textContent : r.innerHTML && r.innerHTML !== o.innerHTML && (o.innerHTML = r.innerHTML)))
}
let Ln = !1;
async function Sd(e, t={}) {
    var l,
        d;
    const n = {
        shouldRender: !0
    };
    if (await e.hooks.callHook("dom:beforeRender", n), !n.shouldRender)
        return;
    const r = t.document || e.resolvedOptions.document || window.document,
        o = (await e.resolveTags()).map(c);
    if (e.resolvedOptions.experimentalHashHydration && (Ln = Ln || e._hash || !1, Ln)) {
        const h = kd(o.map(g => g.tag._h));
        if (Ln === h)
            return;
        Ln = h
    }
    const i = e._popSideEffectQueue();
    e.headEntries().map(h => h._sde).forEach(h => {
        Object.entries(h).forEach(([g, y]) => {
            i[g] = y
        })
    });
    const a = (h, g, y) => {
        g = `${h.renderId}:${g}`,
        h.entry && (h.entry._sde[g] = y),
        delete i[g]
    };
    function c(h) {
        const g = e.headEntries().find(p => p._i === h._e),
            y = {
                renderId: h._d || Mo(h),
                $el: null,
                shouldRender: !0,
                tag: h,
                entry: g,
                markSideEffect: (p, m) => a(y, p, m)
            };
        return y
    }
    const u = [],
        f = {
            body: [],
            head: []
        },
        _ = h => {
            e._elMap[h.renderId] = h.$el,
            u.push(h),
            a(h, "el", () => {
                var g;
                (g = h.$el) == null || g.remove(),
                delete e._elMap[h.renderId]
            })
        };
    for (const h of o) {
        if (await e.hooks.callHook("dom:beforeRenderTag", h), !h.shouldRender)
            continue;
        const {tag: g} = h;
        if (g.tag === "title") {
            r.title = g.textContent || "",
            u.push(h);
            continue
        }
        if (g.tag === "htmlAttrs" || g.tag === "bodyAttrs") {
            h.$el = r[g.tag === "htmlAttrs" ? "documentElement" : "body"],
            gr(h, !1, a),
            u.push(h);
            continue
        }
        if (h.$el = e._elMap[h.renderId], !h.$el && g.key && (h.$el = r.querySelector(`${(l = g.tagPosition) != null && l.startsWith("body") ? "body" : "head"} > ${g.tag}[data-h-${g._h}]`)), h.$el) {
            h.tag._d && gr(h),
            _(h);
            continue
        }
        f[(d = g.tagPosition) != null && d.startsWith("body") ? "body" : "head"].push(h)
    }
    const s = {
        bodyClose: void 0,
        bodyOpen: void 0,
        head: void 0
    };
    Object.entries(f).forEach(([h, g]) => {
        var p;
        if (!g.length)
            return;
        const y = (p = r == null ? void 0 : r[h]) == null ? void 0 : p.children;
        if (y) {
            for (const m of [...y].reverse()) {
                const b = m.tagName.toLowerCase();
                if (!hl.includes(b))
                    continue;
                const T = m.getAttributeNames().reduce((k, M) => ({
                        ...k,
                        [M]: m.getAttribute(M)
                    }), {}),
                    E = {
                        tag: b,
                        props: T
                    };
                m.innerHTML && (E.innerHTML = m.innerHTML);
                const P = Mo(E);
                let H = g.findIndex(k => (k == null ? void 0 : k.renderId) === P);
                if (H === -1) {
                    const k = ml(E);
                    H = g.findIndex(M => (M == null ? void 0 : M.tag._d) && M.tag._d === k)
                }
                if (H !== -1) {
                    const k = g[H];
                    k.$el = m,
                    gr(k),
                    _(k),
                    delete g[H]
                }
            }
            g.forEach(m => {
                const b = m.tag.tagPosition || "head";
                s[b] = s[b] || r.createDocumentFragment(),
                m.$el || (m.$el = r.createElement(m.tag.tag), gr(m, !0)),
                s[b].appendChild(m.$el),
                _(m)
            })
        }
    }),
    s.head && r.head.appendChild(s.head),
    s.bodyOpen && r.body.insertBefore(s.bodyOpen, r.body.firstChild),
    s.bodyClose && r.body.appendChild(s.bodyClose);
    for (const h of u)
        await e.hooks.callHook("dom:renderTag", h);
    Object.values(i).forEach(h => h())
}
let ro = null;
async function xd(e, t={}) {
    function n() {
        return ro = null, Sd(e, t)
    }
    const r = t.delayFn || (o => setTimeout(o, 10));
    return ro = ro || new Promise(o => r(() => o(n())))
}
function Pd(e) {
    return {
        hooks: {
            "entries:updated": function(t) {
                if (typeof (e == null ? void 0 : e.document) > "u" && typeof window > "u")
                    return;
                let n = e == null ? void 0 : e.delayFn;
                !n && typeof requestAnimationFrame < "u" && (n = requestAnimationFrame),
                xd(t, {
                    document: (e == null ? void 0 : e.document) || window.document,
                    delayFn: n
                })
            }
        }
    }
}
function Md(e) {
    var t;
    return ((t = e == null ? void 0 : e.head.querySelector('meta[name="unhead:ssr"]')) == null ? void 0 : t.getAttribute("content")) || !1
}
const yi = {
    critical: 2,
    high: 9,
    low: 12,
    base: -1,
    title: 1,
    meta: 10
};
function bi(e) {
    if (typeof e.tagPriority == "number")
        return e.tagPriority;
    if (e.tag === "meta") {
        if (e.props.charset)
            return -2;
        if (e.props["http-equiv"] === "content-security-policy")
            return 0
    }
    const t = e.tagPriority || e.tag;
    return t in yi ? yi[t] : 10
}
const Rd = [{
    prefix: "before:",
    offset: -1
}, {
    prefix: "after:",
    offset: 1
}];
function Hd() {
    return {
        hooks: {
            "tags:resolve": e => {
                const t = n => {
                    var r;
                    return (r = e.tags.find(o => o._d === n)) == null ? void 0 : r._p
                };
                for (const {prefix: n, offset: r} of Rd)
                    for (const o of e.tags.filter(i => typeof i.tagPriority == "string" && i.tagPriority.startsWith(n))) {
                        const i = t(o.tagPriority.replace(n, ""));
                        typeof i < "u" && (o._p = i + r)
                    }
                e.tags.sort((n, r) => n._p - r._p).sort((n, r) => bi(n) - bi(r))
            }
        }
    }
}
function Od() {
    return {
        hooks: {
            "tags:resolve": e => {
                const {tags: t} = e;
                let n = t.findIndex(o => o.tag === "titleTemplate");
                const r = t.findIndex(o => o.tag === "title");
                if (r !== -1 && n !== -1) {
                    const o = vi(t[n].textContent, t[r].textContent);
                    o !== null ? t[r].textContent = o || t[r].textContent : delete t[r]
                } else if (n !== -1) {
                    const o = vi(t[n].textContent);
                    o !== null && (t[n].textContent = o, t[n].tag = "title", n = -1)
                }
                n !== -1 && delete t[n],
                e.tags = t.filter(Boolean)
            }
        }
    }
}
function Ld() {
    return {
        hooks: {
            "tag:normalise": function({tag: e}) {
                typeof e.props.body < "u" && (e.tagPosition = "bodyClose", delete e.props.body)
            }
        }
    }
}
const Id = ["link", "style", "script", "noscript"];
function $d() {
    return {
        hooks: {
            "tag:normalise": ({tag: e, resolvedOptions: t}) => {
                t.experimentalHashHydration === !0 && (e._h = Mo(e)),
                e.key && Id.includes(e.tag) && (e._h = _l(e.key), e.props[`data-h-${e._h}`] = "")
            }
        }
    }
}
const wi = ["script", "link", "bodyAttrs"];
function Fd() {
    const e = (t, n) => {
        const r = {},
            o = {};
        Object.entries(n.props).forEach(([a, c]) => {
            a.startsWith("on") && typeof c == "function" ? o[a] = c : r[a] = c
        });
        let i;
        return t === "dom" && n.tag === "script" && typeof r.src == "string" && typeof o.onload < "u" && (i = r.src, delete r.src), {
            props: r,
            eventHandlers: o,
            delayedSrc: i
        }
    };
    return {
        hooks: {
            "ssr:render": function(t) {
                t.tags = t.tags.map(n => (!wi.includes(n.tag) || !Object.entries(n.props).find(([r, o]) => r.startsWith("on") && typeof o == "function") || (n.props = e("ssr", n).props), n))
            },
            "dom:beforeRenderTag": function(t) {
                if (!wi.includes(t.tag.tag) || !Object.entries(t.tag.props).find(([i, a]) => i.startsWith("on") && typeof a == "function"))
                    return;
                const {props: n, eventHandlers: r, delayedSrc: o} = e("dom", t.tag);
                Object.keys(r).length && (t.tag.props = n, t.tag._eventHandlers = r, t.tag._delayedSrc = o)
            },
            "dom:renderTag": function(t) {
                const n = t.$el;
                if (!t.tag._eventHandlers || !n)
                    return;
                const r = t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : n;
                Object.entries(t.tag._eventHandlers).forEach(([o, i]) => {
                    const a = `${t.tag._d || t.tag._p}:${o}`,
                        c = o.slice(2).toLowerCase(),
                        u = `data-h-${c}`;
                    if (t.markSideEffect(a, () => {}), n.hasAttribute(u))
                        return;
                    const f = i;
                    n.setAttribute(u, ""),
                    r.addEventListener(c, f),
                    t.entry && (t.entry._sde[a] = () => {
                        r.removeEventListener(c, f),
                        n.removeAttribute(u)
                    })
                }),
                t.tag._delayedSrc && n.setAttribute("src", t.tag._delayedSrc)
            }
        }
    }
}
const Bd = ["templateParams", "htmlAttrs", "bodyAttrs"];
function Dd() {
    return {
        hooks: {
            "tag:normalise": function({tag: e}) {
                ["hid", "vmid", "key"].forEach(r => {
                    e.props[r] && (e.key = e.props[r], delete e.props[r])
                });
                const n = ml(e) || (e.key ? `${e.tag}:${e.key}` : !1);
                n && (e._d = n)
            },
            "tags:resolve": function(e) {
                const t = {};
                e.tags.forEach(r => {
                    const o = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p,
                        i = t[o];
                    if (i) {
                        let c = r == null ? void 0 : r.tagDuplicateStrategy;
                        if (!c && Bd.includes(r.tag) && (c = "merge"), c === "merge") {
                            const u = i.props;
                            ["class", "style"].forEach(f => {
                                r.props[f] && u[f] && (f === "style" && !u[f].endsWith(";") && (u[f] += ";"), r.props[f] = `${u[f]} ${r.props[f]}`)
                            }),
                            t[o].props = {
                                ...u,
                                ...r.props
                            };
                            return
                        } else if (r._e === i._e) {
                            i._duped = i._duped || [],
                            r._d = `${i._d}:${i._duped.length + 1}`,
                            i._duped.push(r);
                            return
                        }
                    }
                    const a = Object.keys(r.props).length + (r.innerHTML ? 1 : 0) + (r.textContent ? 1 : 0);
                    if (hl.includes(r.tag) && a === 0) {
                        delete t[o];
                        return
                    }
                    t[o] = r
                });
                const n = [];
                Object.values(t).forEach(r => {
                    const o = r._duped;
                    delete r._duped,
                    n.push(r),
                    o && n.push(...o)
                }),
                e.tags = n
            }
        }
    }
}
function vr(e, t) {
    function n(i) {
        if (["s", "pageTitle"].includes(i))
            return t.pageTitle;
        let a;
        return i.includes(".") ? a = i.split(".").reduce((c, u) => c && c[u] || void 0, t) : a = t[i], typeof a < "u" ? a || "" : !1
    }
    let r = e;
    try {
        r = decodeURI(e)
    } catch {}
    return (r.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse().forEach(i => {
        const a = n(i.slice(1));
        typeof a == "string" && (e = e.replaceAll(new RegExp(`\\${i}(\\W|$)`, "g"), `${a}$1`).trim())
    }), t.separator && (e.endsWith(t.separator) && (e = e.slice(0, -t.separator.length).trim()), e.startsWith(t.separator) && (e = e.slice(t.separator.length).trim()), e = e.replace(new RegExp(`\\${t.separator}\\s*\\${t.separator}`, "g"), t.separator)), e
}
function Nd() {
    return {
        hooks: {
            "tags:resolve": e => {
                var i;
                const {tags: t} = e,
                    n = (i = t.find(a => a.tag === "title")) == null ? void 0 : i.textContent,
                    r = t.findIndex(a => a.tag === "templateParams"),
                    o = r !== -1 ? t[r].props : {};
                o.pageTitle = o.pageTitle || n || "";
                for (const a of t)
                    if (["titleTemplate", "title"].includes(a.tag) && typeof a.textContent == "string")
                        a.textContent = vr(a.textContent, o);
                    else if (a.tag === "meta" && typeof a.props.content == "string")
                        a.props.content = vr(a.props.content, o);
                    else if (a.tag === "link" && typeof a.props.href == "string")
                        a.props.href = vr(a.props.href, o);
                    else if (a.tag === "script" && ["application/json", "application/ld+json"].includes(a.props.type) && typeof a.innerHTML == "string")
                        try {
                            a.innerHTML = JSON.stringify(JSON.parse(a.innerHTML), (c, u) => typeof u == "string" ? vr(u, o) : u)
                        } catch {}
                e.tags = t.filter(a => a.tag !== "templateParams")
            }
        }
    }
}
const jd = typeof window < "u";
let gl;
function Vd(e) {
    return gl = e
}
function Ud() {
    return gl
}
function Ro(e, t) {
    const n = [],
        r = t.resolveKeyData || (i => i.key),
        o = t.resolveValueData || (i => i.value);
    for (const [i, a] of Object.entries(e))
        n.push(...(Array.isArray(a) ? a : [a]).map(c => {
            const u = {
                    key: i,
                    value: c
                },
                f = o(u);
            return typeof f == "object" ? Ro(f, t) : Array.isArray(f) ? f : {
                [typeof t.key == "function" ? t.key(u) : t.key]: r(u),
                [typeof t.value == "function" ? t.value(u) : t.value]: f
            }
        }).flat());
    return n
}
function vl(e, t) {
    return Object.entries(e).map(([n, r]) => {
        if (typeof r == "object" && (r = vl(r, t)), t.resolve) {
            const o = t.resolve({
                key: n,
                value: r
            });
            if (o)
                return o
        }
        return typeof r == "number" && (r = r.toString()), typeof r == "string" && t.wrapValue && (r = r.replace(new RegExp(t.wrapValue, "g"), `\\${t.wrapValue}`), r = `${t.wrapValue}${r}${t.wrapValue}`), `${n}${t.keyValueSeparator || ""}${r}`
    }).join(t.entrySeparator || "")
}
const gs = {
        robots: {
            unpack: {
                keyValueSeparator: ":"
            }
        },
        contentSecurityPolicy: {
            unpack: {
                keyValueSeparator: " ",
                entrySeparator: "; "
            },
            metaKey: "http-equiv"
        },
        fbAppId: {
            keyValue: "fb:app_id",
            metaKey: "property"
        },
        ogSiteName: {
            keyValue: "og:site_name"
        },
        msapplicationTileImage: {
            keyValue: "msapplication-TileImage"
        },
        msapplicationTileColor: {
            keyValue: "msapplication-TileColor"
        },
        msapplicationConfig: {
            keyValue: "msapplication-Config"
        },
        charset: {
            metaKey: "charset"
        },
        contentType: {
            metaKey: "http-equiv"
        },
        defaultStyle: {
            metaKey: "http-equiv"
        },
        xUaCompatible: {
            metaKey: "http-equiv"
        },
        refresh: {
            metaKey: "http-equiv"
        }
    },
    Wd = ["Image", "Video", "Audio"],
    Kd = /^(og|twitter|fb)/,
    qd = /^(og|fb)/;
function zd(e) {
    var t;
    return qd.test(e) ? "property" : ((t = gs[e]) == null ? void 0 : t.metaKey) || "name"
}
function Zd(e) {
    var t;
    return ((t = gs[e]) == null ? void 0 : t.keyValue) || vs(e)
}
function vs(e) {
    return e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), Kd.test(e) && (e = e.replace("secure-url", "secure_url").replace(/-/g, ":")), e
}
function Ho(e) {
    if (Array.isArray(e))
        return e.map(n => Ho(n));
    if (typeof e != "object" || Array.isArray(e))
        return e;
    const t = {};
    for (const [n, r] of Object.entries(e))
        t[vs(n)] = Ho(r);
    return t
}
function og(e) {
    const t = [];
    Wd.forEach(r => {
        const o = `og:${r.toLowerCase()}`,
            i = `og${r}`,
            a = e[i];
        typeof a == "object" && ((Array.isArray(a) ? a : [a]).forEach(c => {
            if (!c)
                return;
            const u = Ro(c, {
                key: "property",
                value: "content",
                resolveKeyData({key: f}) {
                    return vs(`${o}${f !== "url" ? `:${f}` : ""}`)
                },
                resolveValueData({value: f}) {
                    return typeof f == "number" ? f.toString() : f
                }
            });
            t.push(...u.sort((f, _) => f.property === o ? -1 : _.property === o ? 1 : 0))
        }), delete e[i])
    });
    const n = Ro(e, {
        key({key: r}) {
            return zd(r)
        },
        value({key: r}) {
            return r === "charset" ? "charset" : "content"
        },
        resolveKeyData({key: r}) {
            return Zd(r)
        },
        resolveValueData({value: r, key: o}) {
            return r === null ? "_null" : typeof r == "object" ? Gd(r, o) : typeof r == "number" ? r.toString() : r
        }
    });
    return [...t, ...n].filter(r => typeof r.content > "u" || r.content !== "_null")
}
function Gd(e, t) {
    const n = gs[t];
    return t === "refresh" ? `${e.seconds};url=${e.url}` : vl(Ho(e), {
        entrySeparator: ", ",
        keyValueSeparator: "=",
        resolve({value: r, key: o}) {
            if (r === null)
                return "";
            if (typeof r == "boolean")
                return `${o}`
        },
        ...n == null ? void 0 : n.unpack
    })
}
async function Xd(e, t) {
    const n = {
        tag: e,
        props: {}
    };
    return e === "templateParams" ? (n.props = t, n) : ["title", "titleTemplate"].includes(e) ? (n.textContent = t instanceof Promise ? await t : t, n) : typeof t == "string" ? ["script", "noscript", "style"].includes(e) ? (e === "script" && (/^(https?:)?\/\//.test(t) || t.startsWith("/")) ? n.props.src = t : n.innerHTML = t, n) : !1 : (n.props = await Qd(e, {
        ...t
    }), n.props.children && (n.props.innerHTML = n.props.children), delete n.props.children, Object.keys(n.props).filter(r => Cd.includes(r)).forEach(r => {
        (!["innerHTML", "textContent"].includes(r) || pl.includes(n.tag)) && (n[r] = n.props[r]),
        delete n.props[r]
    }), ["innerHTML", "textContent"].forEach(r => {
        if (n.tag === "script" && typeof n[r] == "string" && ["application/ld+json", "application/json"].includes(n.props.type))
            try {
                n[r] = JSON.parse(n[r])
            } catch {
                n[r] = ""
            }
        typeof n[r] == "object" && (n[r] = JSON.stringify(n[r]))
    }), n.props.class && (n.props.class = Yd(n.props.class)), n.props.content && Array.isArray(n.props.content) ? n.props.content.map(r => ({
        ...n,
        props: {
            ...n.props,
            content: r
        }
    })) : n)
}
function Yd(e) {
    return typeof e == "object" && !Array.isArray(e) && (e = Object.keys(e).filter(t => e[t])), (Array.isArray(e) ? e.join(" ") : e).split(" ").filter(t => t.trim()).filter(Boolean).join(" ")
}
async function Qd(e, t) {
    for (const n of Object.keys(t)) {
        const r = n.startsWith("data-");
        t[n] instanceof Promise && (t[n] = await t[n]),
        String(t[n]) === "true" ? t[n] = r ? "true" : "" : String(t[n]) === "false" && (r ? t[n] = "false" : delete t[n])
    }
    return t
}
const Jd = 10;
async function ep(e) {
    const t = [];
    return Object.entries(e.resolvedInput).filter(([n, r]) => typeof r < "u" && Ad.includes(n)).forEach(([n, r]) => {
        const o = Td(r);
        t.push(...o.map(i => Xd(n, i)).flat())
    }), (await Promise.all(t)).flat().filter(Boolean).map((n, r) => (n._e = e._i, n._p = (e._i << Jd) + r, n))
}
function tp() {
    return [Dd(), Hd(), Nd(), Od(), $d(), Fd(), Ld()]
}
function np(e={}) {
    return [Pd({
        document: e == null ? void 0 : e.document,
        delayFn: e == null ? void 0 : e.domDelayFn
    })]
}
function rp(e={}) {
    const t = op({
        ...e,
        plugins: [...np(e), ...(e == null ? void 0 : e.plugins) || []]
    });
    return e.experimentalHashHydration && t.resolvedOptions.document && (t._hash = Md(t.resolvedOptions.document)), Vd(t), t
}
function op(e={}) {
    let t = [],
        n = {},
        r = 0;
    const o = fl();
    e != null && e.hooks && o.addHooks(e.hooks),
    e.plugins = [...tp(), ...(e == null ? void 0 : e.plugins) || []],
    e.plugins.forEach(c => c.hooks && o.addHooks(c.hooks)),
    e.document = e.document || (jd ? document : void 0);
    const i = () => o.callHook("entries:updated", a),
        a = {
            resolvedOptions: e,
            headEntries() {
                return t
            },
            get hooks() {
                return o
            },
            use(c) {
                c.hooks && o.addHooks(c.hooks)
            },
            push(c, u) {
                const f = {
                    _i: r++,
                    input: c,
                    _sde: {}
                };
                return u != null && u.mode && (f._m = u == null ? void 0 : u.mode), u != null && u.transform && (f._t = u == null ? void 0 : u.transform), t.push(f), i(), {
                    dispose() {
                        t = t.filter(_ => _._i !== f._i ? !0 : (n = {
                            ...n,
                            ..._._sde || {}
                        }, _._sde = {}, i(), !1))
                    },
                    patch(_) {
                        t = t.map(s => (s._i === f._i && (f.input = s.input = _, i()), s))
                    }
                }
            },
            async resolveTags() {
                const c = {
                    tags: [],
                    entries: [...t]
                };
                await o.callHook("entries:resolve", c);
                for (const u of c.entries) {
                    const f = u._t || (_ => _);
                    if (u.resolvedInput = f(u.resolvedInput || u.input), u.resolvedInput)
                        for (const _ of await ep(u)) {
                            const s = {
                                tag: _,
                                entry: u,
                                resolvedOptions: a.resolvedOptions
                            };
                            await o.callHook("tag:normalise", s),
                            c.tags.push(s.tag)
                        }
                }
                return await o.callHook("tags:resolve", c), c.tags
            },
            _popSideEffectQueue() {
                const c = {
                    ...n
                };
                return n = {}, c
            },
            _elMap: {}
        };
    return a.hooks.callHook("init", a), a
}
function sp(e) {
    return typeof e == "function" ? e() : ne(e)
}
function Rr(e, t="") {
    if (e instanceof Promise)
        return e;
    const n = sp(e);
    return !e || !n ? n : Array.isArray(n) ? n.map(r => Rr(r, t)) : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([r, o]) => r === "titleTemplate" || r.startsWith("on") ? [r, ne(o)] : [r, Rr(o, r)])) : n
}
const ip = Qa.startsWith("3"),
    ap = typeof window < "u",
    yl = "usehead";
function ys() {
    return zt() && Je(yl) || Ud()
}
function lp(e) {
    return {
        install(n) {
            ip && (n.config.globalProperties.$unhead = e, n.config.globalProperties.$head = e, n.provide(yl, e))
        }
    }.install
}
function cp(e={}) {
    const t = rp({
        ...e,
        domDelayFn: n => setTimeout(() => Pn(() => n()), 10),
        plugins: [up(), ...(e == null ? void 0 : e.plugins) || []]
    });
    return t.install = lp(t), t
}
function up() {
    return {
        hooks: {
            "entries:resolve": function(e) {
                for (const t of e.entries)
                    t.resolvedInput = Rr(t.input)
            }
        }
    }
}
function fp(e, t={}) {
    const n = ys(),
        r = z(!1),
        o = z({});
    Yc(() => {
        o.value = r.value ? {} : Rr(e)
    });
    const i = n.push(o.value, t);
    return Ut(o, c => {
        i.patch(c)
    }), zt() && (wt(() => {
        i.dispose()
    }), Ma(() => {
        r.value = !0
    }), Pa(() => {
        r.value = !1
    })), i
}
function dp(e, t={}) {
    return ys().push(e, t)
}
function pp(e, t={}) {
    var r;
    const n = ys();
    if (n) {
        const o = ap || !!((r = n.resolvedOptions) != null && r.document);
        return t.mode === "server" && o || t.mode === "client" && !o ? void 0 : o ? fp(e, t) : dp(e, t)
    }
}
const hp = {
        meta: [{
            charset: "utf-8"
        }, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        }, {
            name: "msapplication-TileColor",
            content: "#000000"
        }, {
            "http-equiv": "X-UA-Compatible",
            content: "IE=edge"
        }],
        link: [{
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon/favicon.ico"
        }, {
            rel: "icon",
            type: "image/png",
            sizes: "512x512",
            href: "/favicon/android-chrome-512x512.png"
        }, {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/favicon/android-chrome-192x192.png"
        }, {
            rel: "apple-touch-icon",
            type: "image/png",
            sizes: "180x180",
            href: "/favicon/apple-touch-icon.png"
        }, {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon/favicon-32x32.png"
        }, {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon/favicon-16x16.png"
        }],
        style: [],
        script: [],
        noscript: [],
        htmlAttrs: {
            lang: "en"
        },
        title: "Press Play On Tape"
    },
    _p = !1,
    Oo = !1,
    mp = !1,
    gp = "__nuxt",
    vp = !1,
    yp = tt({
        name: "nuxt:head",
        setup(e) {
            const n = cp();
            n.push(hp),
            e.vueApp.use(n);
            {
                let r = !0;
                const o = () => {
                    r = !1,
                    n.hooks.callHook("entries:updated", n)
                };
                n.hooks.hook("dom:beforeRender", i => {
                    i.shouldRender = !r
                }),
                e.hooks.hook("page:start", () => {
                    r = !0
                }),
                e.hooks.hook("page:finish", o),
                e.hooks.hook("app:suspense:resolve", o)
            }
        }
    }); /*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */



const cn = typeof window < "u";
function bp(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const he = Object.assign;
function oo(e, t) {
    const n = {};
    for (const r in t) {
        const o = t[r];
        n[r] = ht(o) ? o.map(e) : e(o)
    }
    return n
}
const Kn = () => {},
    ht = Array.isArray,
    wp = /\/$/,
    Tp = e => e.replace(wp, "");
function so(e, t, n="/") {
    let r,
        o = {},
        i = "",
        a = "";
    const c = t.indexOf("#");
    let u = t.indexOf("?");
    return c < u && c >= 0 && (u = -1), u > -1 && (r = t.slice(0, u), i = t.slice(u + 1, c > -1 ? c : t.length), o = e(i)), c > -1 && (r = r || t.slice(0, c), a = t.slice(c, t.length)), r = kp(r ?? t, n), {
        fullPath: r + (i && "?") + i + a,
        path: r,
        query: o,
        hash: a
    }
}
function Ap(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}
function Ti(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function Ep(e, t, n) {
    const r = t.matched.length - 1,
        o = n.matched.length - 1;
    return r > -1 && r === o && An(t.matched[r], n.matched[o]) && bl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}
function An(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function bl(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!Cp(e[n], t[n]))
            return !1;
    return !0
}
function Cp(e, t) {
    return ht(e) ? Ai(e, t) : ht(t) ? Ai(t, e) : e === t
}
function Ai(e, t) {
    return ht(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}
function kp(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const n = t.split("/"),
        r = e.split("/");
    let o = n.length - 1,
        i,
        a;
    for (i = 0; i < r.length; i++)
        if (a = r[i], a !== ".")
            if (a === "..")
                o > 1 && o--;
            else
                break;
    return n.slice(0, o).join("/") + "/" + r.slice(i - (i === r.length ? 1 : 0)).join("/")
}
var er;
(function(e) {
    e.pop = "pop",
    e.push = "push"
})(er || (er = {}));
var qn;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
})(qn || (qn = {}));
function Sp(e) {
    if (!e)
        if (cn) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Tp(e)
}
const xp = /^[^#]+#/;
function Pp(e, t) {
    return e.replace(xp, "#") + t
}
function Mp(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        r = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0)
    }
}
const Vr = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
});
function Rp(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            r = typeof n == "string" && n.startsWith("#"),
            o = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!o)
            return;
        t = Mp(o, e)
    } else
        t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}
function Ei(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const Lo = new Map;
function Hp(e, t) {
    Lo.set(e, t)
}
function Op(e) {
    const t = Lo.get(e);
    return Lo.delete(e), t
}
let Lp = () => location.protocol + "//" + location.host;
function wl(e, t) {
    const {pathname: n, search: r, hash: o} = t,
        i = e.indexOf("#");
    if (i > -1) {
        let c = o.includes(e.slice(i)) ? e.slice(i).length : 1,
            u = o.slice(c);
        return u[0] !== "/" && (u = "/" + u), Ti(u, "")
    }
    return Ti(n, e) + r + o
}
function Ip(e, t, n, r) {
    let o = [],
        i = [],
        a = null;
    const c = ({state: l}) => {
        const d = wl(e, location),
            h = n.value,
            g = t.value;
        let y = 0;
        if (l) {
            if (n.value = d, t.value = l, a && a === h) {
                a = null;
                return
            }
            y = g ? l.position - g.position : 0
        } else
            r(d);
        o.forEach(p => {
            p(n.value, h, {
                delta: y,
                type: er.pop,
                direction: y ? y > 0 ? qn.forward : qn.back : qn.unknown
            })
        })
    };
    function u() {
        a = n.value
    }
    function f(l) {
        o.push(l);
        const d = () => {
            const h = o.indexOf(l);
            h > -1 && o.splice(h, 1)
        };
        return i.push(d), d
    }
    function _() {
        const {history: l} = window;
        l.state && l.replaceState(he({}, l.state, {
            scroll: Vr()
        }), "")
    }
    function s() {
        for (const l of i)
            l();
        i = [],
        window.removeEventListener("popstate", c),
        window.removeEventListener("beforeunload", _)
    }
    return window.addEventListener("popstate", c), window.addEventListener("beforeunload", _), {
        pauseListeners: u,
        listen: f,
        destroy: s
    }
}
function Ci(e, t, n, r=!1, o=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: o ? Vr() : null
    }
}
function $p(e) {
    const {history: t, location: n} = window,
        r = {
            value: wl(e, n)
        },
        o = {
            value: t.state
        };
    o.value || i(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function i(u, f, _) {
        const s = e.indexOf("#"),
            l = s > -1 ? (n.host && document.querySelector("base") ? e : e.slice(s)) + u : Lp() + e + u;
        try {
            t[_ ? "replaceState" : "pushState"](f, "", l),
            o.value = f
        } catch (d) {
            console.error(d),
            n[_ ? "replace" : "assign"](l)
        }
    }
    function a(u, f) {
        const _ = he({}, t.state, Ci(o.value.back, u, o.value.forward, !0), f, {
            position: o.value.position
        });
        i(u, _, !0),
        r.value = u
    }
    function c(u, f) {
        const _ = he({}, o.value, t.state, {
            forward: u,
            scroll: Vr()
        });
        i(_.current, _, !0);
        const s = he({}, Ci(r.value, u, null), {
            position: _.position + 1
        }, f);
        i(u, s, !1),
        r.value = u
    }
    return {
        location: r,
        state: o,
        push: c,
        replace: a
    }
}
function Tl(e) {
    e = Sp(e);
    const t = $p(e),
        n = Ip(e, t.state, t.location, t.replace);
    function r(i, a=!0) {
        a || n.pauseListeners(),
        history.go(i)
    }
    const o = he({
        location: "",
        base: e,
        go: r,
        createHref: Pp.bind(null, e)
    }, t, n);
    return Object.defineProperty(o, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(o, "state", {
        enumerable: !0,
        get: () => t.state.value
    }), o
}
function Fp(e) {
    return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), Tl(e)
}
function Bp(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function Al(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const $t = {
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
    El = Symbol("");
var ki;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
})(ki || (ki = {}));
function En(e, t) {
    return he(new Error, {
        type: e,
        [El]: !0
    }, t)
}
function Tt(e, t) {
    return e instanceof Error && El in e && (t == null || !!(e.type & t))
}
const Si = "[^/]+?",
    Dp = {
        sensitive: !1,
        strict: !1,
        start: !0,
        end: !0
    },
    Np = /[.+*?^${}()[\]/\\]/g;
function jp(e, t) {
    const n = he({}, Dp, t),
        r = [];
    let o = n.start ? "^" : "";
    const i = [];
    for (const f of e) {
        const _ = f.length ? [] : [90];
        n.strict && !f.length && (o += "/");
        for (let s = 0; s < f.length; s++) {
            const l = f[s];
            let d = 40 + (n.sensitive ? .25 : 0);
            if (l.type === 0)
                s || (o += "/"),
                o += l.value.replace(Np, "\\$&"),
                d += 40;
            else if (l.type === 1) {
                const {value: h, repeatable: g, optional: y, regexp: p} = l;
                i.push({
                    name: h,
                    repeatable: g,
                    optional: y
                });
                const m = p || Si;
                if (m !== Si) {
                    d += 10;
                    try {
                        new RegExp(`(${m})`)
                    } catch (T) {
                        throw new Error(`Invalid custom RegExp for param "${h}" (${m}): ` + T.message)
                    }
                }
                let b = g ? `((?:${m})(?:/(?:${m}))*)` : `(${m})`;
                s || (b = y && f.length < 2 ? `(?:/${b})` : "/" + b),
                y && (b += "?"),
                o += b,
                d += 20,
                y && (d += -8),
                g && (d += -20),
                m === ".*" && (d += -50)
            }
            _.push(d)
        }
        r.push(_)
    }
    if (n.strict && n.end) {
        const f = r.length - 1;
        r[f][r[f].length - 1] += .7000000000000001
    }
    n.strict || (o += "/?"),
    n.end ? o += "$" : n.strict && (o += "(?:/|$)");
    const a = new RegExp(o, n.sensitive ? "" : "i");
    function c(f) {
        const _ = f.match(a),
            s = {};
        if (!_)
            return null;
        for (let l = 1; l < _.length; l++) {
            const d = _[l] || "",
                h = i[l - 1];
            s[h.name] = d && h.repeatable ? d.split("/") : d
        }
        return s
    }
    function u(f) {
        let _ = "",
            s = !1;
        for (const l of e) {
            (!s || !_.endsWith("/")) && (_ += "/"),
            s = !1;
            for (const d of l)
                if (d.type === 0)
                    _ += d.value;
                else if (d.type === 1) {
                    const {value: h, repeatable: g, optional: y} = d,
                        p = h in f ? f[h] : "";
                    if (ht(p) && !g)
                        throw new Error(`Provided param "${h}" is an array but it is not repeatable (* or + modifiers)`);
                    const m = ht(p) ? p.join("/") : p;
                    if (!m)
                        if (y)
                            l.length < 2 && (_.endsWith("/") ? _ = _.slice(0, -1) : s = !0);
                        else
                            throw new Error(`Missing required param "${h}"`);
                    _ += m
                }
        }
        return _ || "/"
    }
    return {
        re: a,
        score: r,
        keys: i,
        parse: c,
        stringify: u
    }
}
function Vp(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const r = t[n] - e[n];
        if (r)
            return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}
function Up(e, t) {
    let n = 0;
    const r = e.score,
        o = t.score;
    for (; n < r.length && n < o.length;) {
        const i = Vp(r[n], o[n]);
        if (i)
            return i;
        n++
    }
    if (Math.abs(o.length - r.length) === 1) {
        if (xi(r))
            return 1;
        if (xi(o))
            return -1
    }
    return o.length - r.length
}
function xi(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const Wp = {
        type: 0,
        value: ""
    },
    Kp = /[a-zA-Z0-9_]/;
function qp(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[Wp]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(d) {
        throw new Error(`ERR (${n})/"${f}": ${d}`)
    }
    let n = 0,
        r = n;
    const o = [];
    let i;
    function a() {
        i && o.push(i),
        i = []
    }
    let c = 0,
        u,
        f = "",
        _ = "";
    function s() {
        f && (n === 0 ? i.push({
            type: 0,
            value: f
        }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (u === "*" || u === "+") && t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`), i.push({
            type: 1,
            value: f,
            regexp: _,
            repeatable: u === "*" || u === "+",
            optional: u === "*" || u === "?"
        })) : t("Invalid state to consume buffer"), f = "")
    }
    function l() {
        f += u
    }
    for (; c < e.length;) {
        if (u = e[c++], u === "\\" && n !== 2) {
            r = n,
            n = 4;
            continue
        }
        switch (n) {
        case 0:
            u === "/" ? (f && s(), a()) : u === ":" ? (s(), n = 1) : l();
            break;
        case 4:
            l(),
            n = r;
            break;
        case 1:
            u === "(" ? n = 2 : Kp.test(u) ? l() : (s(), n = 0, u !== "*" && u !== "?" && u !== "+" && c--);
            break;
        case 2:
            u === ")" ? _[_.length - 1] == "\\" ? _ = _.slice(0, -1) + u : n = 3 : _ += u;
            break;
        case 3:
            s(),
            n = 0,
            u !== "*" && u !== "?" && u !== "+" && c--,
            _ = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), s(), a(), o
}
function zp(e, t, n) {
    const r = jp(qp(e.path), n),
        o = he(r, {
            record: e,
            parent: t,
            children: [],
            alias: []
        });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o
}
function Zp(e, t) {
    const n = [],
        r = new Map;
    t = Ri({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function o(_) {
        return r.get(_)
    }
    function i(_, s, l) {
        const d = !l,
            h = Gp(_);
        h.aliasOf = l && l.record;
        const g = Ri(t, _),
            y = [h];
        if ("alias" in _) {
            const b = typeof _.alias == "string" ? [_.alias] : _.alias;
            for (const T of b)
                y.push(he({}, h, {
                    components: l ? l.record.components : h.components,
                    path: T,
                    aliasOf: l ? l.record : h
                }))
        }
        let p,
            m;
        for (const b of y) {
            const {path: T} = b;
            if (s && T[0] !== "/") {
                const E = s.record.path,
                    P = E[E.length - 1] === "/" ? "" : "/";
                b.path = s.record.path + (T && P + T)
            }
            if (p = zp(b, s, g), l ? l.alias.push(p) : (m = m || p, m !== p && m.alias.push(p), d && _.name && !Mi(p) && a(_.name)), h.children) {
                const E = h.children;
                for (let P = 0; P < E.length; P++)
                    i(E[P], p, l && l.children[P])
            }
            l = l || p,
            (p.record.components && Object.keys(p.record.components).length || p.record.name || p.record.redirect) && u(p)
        }
        return m ? () => {
            a(m)
        } : Kn
    }
    function a(_) {
        if (Al(_)) {
            const s = r.get(_);
            s && (r.delete(_), n.splice(n.indexOf(s), 1), s.children.forEach(a), s.alias.forEach(a))
        } else {
            const s = n.indexOf(_);
            s > -1 && (n.splice(s, 1), _.record.name && r.delete(_.record.name), _.children.forEach(a), _.alias.forEach(a))
        }
    }
    function c() {
        return n
    }
    function u(_) {
        let s = 0;
        for (; s < n.length && Up(_, n[s]) >= 0 && (_.record.path !== n[s].record.path || !Cl(_, n[s]));)
            s++;
        n.splice(s, 0, _),
        _.record.name && !Mi(_) && r.set(_.record.name, _)
    }
    function f(_, s) {
        let l,
            d = {},
            h,
            g;
        if ("name" in _ && _.name) {
            if (l = r.get(_.name), !l)
                throw En(1, {
                    location: _
                });
            g = l.record.name,
            d = he(Pi(s.params, l.keys.filter(m => !m.optional).map(m => m.name)), _.params && Pi(_.params, l.keys.map(m => m.name))),
            h = l.stringify(d)
        } else if ("path" in _)
            h = _.path,
            l = n.find(m => m.re.test(h)),
            l && (d = l.parse(h), g = l.record.name);
        else {
            if (l = s.name ? r.get(s.name) : n.find(m => m.re.test(s.path)), !l)
                throw En(1, {
                    location: _,
                    currentLocation: s
                });
            g = l.record.name,
            d = he({}, s.params, _.params),
            h = l.stringify(d)
        }
        const y = [];
        let p = l;
        for (; p;)
            y.unshift(p.record),
            p = p.parent;
        return {
            name: g,
            path: h,
            params: d,
            matched: y,
            meta: Yp(y)
        }
    }
    return e.forEach(_ => i(_)), {
        addRoute: i,
        resolve: f,
        removeRoute: a,
        getRoutes: c,
        getRecordMatcher: o
    }
}
function Pi(e, t) {
    const n = {};
    for (const r of t)
        r in e && (n[r] = e[r]);
    return n
}
function Gp(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Xp(e),
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
function Xp(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e)
        t.default = n;
    else
        for (const r in e.components)
            t[r] = typeof n == "boolean" ? n : n[r];
    return t
}
function Mi(e) {
    for (; e;) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function Yp(e) {
    return e.reduce((t, n) => he(t, n.meta), {})
}
function Ri(e, t) {
    const n = {};
    for (const r in e)
        n[r] = r in t ? t[r] : e[r];
    return n
}
function Cl(e, t) {
    return t.children.some(n => n === e || Cl(e, n))
}
const kl = /#/g,
    Qp = /&/g,
    Jp = /\//g,
    eh = /=/g,
    th = /\?/g,
    Sl = /\+/g,
    nh = /%5B/g,
    rh = /%5D/g,
    xl = /%5E/g,
    oh = /%60/g,
    Pl = /%7B/g,
    sh = /%7C/g,
    Ml = /%7D/g,
    ih = /%20/g;
function bs(e) {
    return encodeURI("" + e).replace(sh, "|").replace(nh, "[").replace(rh, "]")
}
function ah(e) {
    return bs(e).replace(Pl, "{").replace(Ml, "}").replace(xl, "^")
}
function Io(e) {
    return bs(e).replace(Sl, "%2B").replace(ih, "+").replace(kl, "%23").replace(Qp, "%26").replace(oh, "`").replace(Pl, "{").replace(Ml, "}").replace(xl, "^")
}
function lh(e) {
    return Io(e).replace(eh, "%3D")
}
function ch(e) {
    return bs(e).replace(kl, "%23").replace(th, "%3F")
}
function uh(e) {
    return e == null ? "" : ch(e).replace(Jp, "%2F")
}
function Hr(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
function fh(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let o = 0; o < r.length; ++o) {
        const i = r[o].replace(Sl, " "),
            a = i.indexOf("="),
            c = Hr(a < 0 ? i : i.slice(0, a)),
            u = a < 0 ? null : Hr(i.slice(a + 1));
        if (c in t) {
            let f = t[c];
            ht(f) || (f = t[c] = [f]),
            f.push(u)
        } else
            t[c] = u
    }
    return t
}
function Hi(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = lh(n), r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (ht(r) ? r.map(i => i && Io(i)) : [r && Io(r)]).forEach(i => {
            i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i))
        })
    }
    return t
}
function dh(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = ht(r) ? r.map(o => o == null ? null : "" + o) : r == null ? r : "" + r)
    }
    return t
}
const ph = Symbol(""),
    Oi = Symbol(""),
    ws = Symbol(""),
    Ts = Symbol(""),
    $o = Symbol("");
function In() {
    let e = [];
    function t(r) {
        return e.push(r), () => {
            const o = e.indexOf(r);
            o > -1 && e.splice(o, 1)
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
function Dt(e, t, n, r, o) {
    const i = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () => new Promise((a, c) => {
        const u = s => {
                s === !1 ? c(En(4, {
                    from: n,
                    to: t
                })) : s instanceof Error ? c(s) : Bp(s) ? c(En(2, {
                    from: t,
                    to: s
                })) : (i && r.enterCallbacks[o] === i && typeof s == "function" && i.push(s), a())
            },
            f = e.call(r && r.instances[o], t, n, u);
        let _ = Promise.resolve(f);
        e.length < 3 && (_ = _.then(u)),
        _.catch(s => c(s))
    })
}
function io(e, t, n, r) {
    const o = [];
    for (const i of e)
        for (const a in i.components) {
            let c = i.components[a];
            if (!(t !== "beforeRouteEnter" && !i.instances[a]))
                if (hh(c)) {
                    const f = (c.__vccOpts || c)[t];
                    f && o.push(Dt(f, n, r, i, a))
                } else {
                    let u = c();
                    o.push(() => u.then(f => {
                        if (!f)
                            return Promise.reject(new Error(`Couldn't resolve component "${a}" at "${i.path}"`));
                        const _ = bp(f) ? f.default : f;
                        i.components[a] = _;
                        const l = (_.__vccOpts || _)[t];
                        return l && Dt(l, n, r, i, a)()
                    }))
                }
        }
    return o
}
function hh(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}
function Li(e) {
    const t = Je(ws),
        n = Je(Ts),
        r = le(() => t.resolve(ne(e.to))),
        o = le(() => {
            const {matched: u} = r.value,
                {length: f} = u,
                _ = u[f - 1],
                s = n.matched;
            if (!_ || !s.length)
                return -1;
            const l = s.findIndex(An.bind(null, _));
            if (l > -1)
                return l;
            const d = Ii(u[f - 2]);
            return f > 1 && Ii(_) === d && s[s.length - 1].path !== d ? s.findIndex(An.bind(null, u[f - 2])) : l
        }),
        i = le(() => o.value > -1 && vh(n.params, r.value.params)),
        a = le(() => o.value > -1 && o.value === n.matched.length - 1 && bl(n.params, r.value.params));
    function c(u={}) {
        return gh(u) ? t[ne(e.replace) ? "replace" : "push"](ne(e.to)).catch(Kn) : Promise.resolve()
    }
    return {
        route: r,
        href: le(() => r.value.href),
        isActive: i,
        isExactActive: a,
        navigate: c
    }
}
const _h = Pt({
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
        useLink: Li,
        setup(e, {slots: t}) {
            const n = bt(Li(e)),
                {options: r} = Je(ws),
                o = le(() => ({
                    [$i(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
                    [$i(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
                }));
            return () => {
                const i = t.default && t.default(n);
                return e.custom ? i : et("a", {
                    "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                    href: n.href,
                    onClick: n.navigate,
                    class: o.value
                }, i)
            }
        }
    }),
    mh = _h;
function gh(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(), !0
    }
}
function vh(e, t) {
    for (const n in t) {
        const r = t[n],
            o = e[n];
        if (typeof r == "string") {
            if (r !== o)
                return !1
        } else if (!ht(o) || o.length !== r.length || r.some((i, a) => i !== o[a]))
            return !1
    }
    return !0
}
function Ii(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const $i = (e, t, n) => e ?? t ?? n,
    yh = Pt({
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
        setup(e, {attrs: t, slots: n}) {
            const r = Je($o),
                o = le(() => e.route || r.value),
                i = Je(Oi, 0),
                a = le(() => {
                    let f = ne(i);
                    const {matched: _} = o.value;
                    let s;
                    for (; (s = _[f]) && !s.components;)
                        f++;
                    return f
                }),
                c = le(() => o.value.matched[a.value]);
            vn(Oi, le(() => a.value + 1)),
            vn(ph, c),
            vn($o, o);
            const u = z();
            return Ut(() => [u.value, c.value, e.name], ([f, _, s], [l, d, h]) => {
                _ && (_.instances[s] = f, d && d !== _ && f && f === l && (_.leaveGuards.size || (_.leaveGuards = d.leaveGuards), _.updateGuards.size || (_.updateGuards = d.updateGuards))),
                f && _ && (!d || !An(_, d) || !l) && (_.enterCallbacks[s] || []).forEach(g => g(f))
            }, {
                flush: "post"
            }), () => {
                const f = o.value,
                    _ = e.name,
                    s = c.value,
                    l = s && s.components[_];
                if (!l)
                    return Fi(n.default, {
                        Component: l,
                        route: f
                    });
                const d = s.props[_],
                    h = d ? d === !0 ? f.params : typeof d == "function" ? d(f) : d : null,
                    y = et(l, he({}, h, t, {
                        onVnodeUnmounted: p => {
                            p.component.isUnmounted && (s.instances[_] = null)
                        },
                        ref: u
                    }));
                return Fi(n.default, {
                        Component: y,
                        route: f
                    }) || y
            }
        }
    });
function Fi(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const Rl = yh;
function bh(e) {
    const t = Zp(e.routes, e),
        n = e.parseQuery || fh,
        r = e.stringifyQuery || Hi,
        o = e.history,
        i = In(),
        a = In(),
        c = In(),
        u = _o($t);
    let f = $t;
    cn && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const _ = oo.bind(null, S => "" + S),
        s = oo.bind(null, uh),
        l = oo.bind(null, Hr);
    function d(S, j) {
        let D,
            q;
        return Al(S) ? (D = t.getRecordMatcher(S), q = j) : q = S, t.addRoute(q, D)
    }
    function h(S) {
        const j = t.getRecordMatcher(S);
        j && t.removeRoute(j)
    }
    function g() {
        return t.getRoutes().map(S => S.record)
    }
    function y(S) {
        return !!t.getRecordMatcher(S)
    }
    function p(S, j) {
        if (j = he({}, j || u.value), typeof S == "string") {
            const v = so(n, S, j.path),
                w = t.resolve({
                    path: v.path
                }, j),
                A = o.createHref(v.fullPath);
            return he(v, w, {
                params: l(w.params),
                hash: Hr(v.hash),
                redirectedFrom: void 0,
                href: A
            })
        }
        let D;
        if ("path" in S)
            D = he({}, S, {
                path: so(n, S.path, j.path).path
            });
        else {
            const v = he({}, S.params);
            for (const w in v)
                v[w] == null && delete v[w];
            D = he({}, S, {
                params: s(S.params)
            }),
            j.params = s(j.params)
        }
        const q = t.resolve(D, j),
            re = S.hash || "";
        q.params = _(l(q.params));
        const ge = Ap(r, he({}, S, {
                hash: ah(re),
                path: q.path
            })),
            te = o.createHref(ge);
        return he({
            fullPath: ge,
            hash: re,
            query: r === Hi ? dh(S.query) : S.query || {}
        }, q, {
            redirectedFrom: void 0,
            href: te
        })
    }
    function m(S) {
        return typeof S == "string" ? so(n, S, u.value.path) : he({}, S)
    }
    function b(S, j) {
        if (f !== S)
            return En(8, {
                from: j,
                to: S
            })
    }
    function T(S) {
        return H(S)
    }
    function E(S) {
        return T(he(m(S), {
            replace: !0
        }))
    }
    function P(S) {
        const j = S.matched[S.matched.length - 1];
        if (j && j.redirect) {
            const {redirect: D} = j;
            let q = typeof D == "function" ? D(S) : D;
            return typeof q == "string" && (q = q.includes("?") || q.includes("#") ? q = m(q) : {
                path: q
            }, q.params = {}), he({
                query: S.query,
                hash: S.hash,
                params: "path" in q ? {} : S.params
            }, q)
        }
    }
    function H(S, j) {
        const D = f = p(S),
            q = u.value,
            re = S.state,
            ge = S.force,
            te = S.replace === !0,
            v = P(D);
        if (v)
            return H(he(m(v), {
                state: typeof v == "object" ? he({}, re, v.state) : re,
                force: ge,
                replace: te
            }), j || D);
        const w = D;
        w.redirectedFrom = j;
        let A;
        return !ge && Ep(r, q, D) && (A = En(16, {
            to: w,
            from: q
        }), Te(q, q, !0, !1)), (A ? Promise.resolve(A) : M(w, q)).catch(C => Tt(C) ? Tt(C, 2) ? C : N(C) : fe(C, w, q)).then(C => {
            if (C) {
                if (Tt(C, 2))
                    return H(he({
                        replace: te
                    }, m(C.to), {
                        state: typeof C.to == "object" ? he({}, re, C.to.state) : re,
                        force: ge
                    }), j || w)
            } else
                C = W(w, q, !0, te, re);
            return U(w, q, C), C
        })
    }
    function k(S, j) {
        const D = b(S, j);
        return D ? Promise.reject(D) : Promise.resolve()
    }
    function M(S, j) {
        let D;
        const [q, re, ge] = wh(S, j);
        D = io(q.reverse(), "beforeRouteLeave", S, j);
        for (const v of q)
            v.leaveGuards.forEach(w => {
                D.push(Dt(w, S, j))
            });
        const te = k.bind(null, S, j);
        return D.push(te), ln(D).then(() => {
            D = [];
            for (const v of i.list())
                D.push(Dt(v, S, j));
            return D.push(te), ln(D)
        }).then(() => {
            D = io(re, "beforeRouteUpdate", S, j);
            for (const v of re)
                v.updateGuards.forEach(w => {
                    D.push(Dt(w, S, j))
                });
            return D.push(te), ln(D)
        }).then(() => {
            D = [];
            for (const v of S.matched)
                if (v.beforeEnter && !j.matched.includes(v))
                    if (ht(v.beforeEnter))
                        for (const w of v.beforeEnter)
                            D.push(Dt(w, S, j));
                    else
                        D.push(Dt(v.beforeEnter, S, j));
            return D.push(te), ln(D)
        }).then(() => (S.matched.forEach(v => v.enterCallbacks = {}), D = io(ge, "beforeRouteEnter", S, j), D.push(te), ln(D))).then(() => {
            D = [];
            for (const v of a.list())
                D.push(Dt(v, S, j));
            return D.push(te), ln(D)
        }).catch(v => Tt(v, 8) ? v : Promise.reject(v))
    }
    function U(S, j, D) {
        for (const q of c.list())
            q(S, j, D)
    }
    function W(S, j, D, q, re) {
        const ge = b(S, j);
        if (ge)
            return ge;
        const te = j === $t,
            v = cn ? history.state : {};
        D && (q || te ? o.replace(S.fullPath, he({
            scroll: te && v && v.scroll
        }, re)) : o.push(S.fullPath, re)),
        u.value = S,
        Te(S, j, D, te),
        N()
    }
    let F;
    function X() {
        F || (F = o.listen((S, j, D) => {
            if (!je.listening)
                return;
            const q = p(S),
                re = P(q);
            if (re) {
                H(he(re, {
                    replace: !0
                }), q).catch(Kn);
                return
            }
            f = q;
            const ge = u.value;
            cn && Hp(Ei(ge.fullPath, D.delta), Vr()),
            M(q, ge).catch(te => Tt(te, 12) ? te : Tt(te, 2) ? (H(te.to, q).then(v => {
                Tt(v, 20) && !D.delta && D.type === er.pop && o.go(-1, !1)
            }).catch(Kn), Promise.reject()) : (D.delta && o.go(-D.delta, !1), fe(te, q, ge))).then(te => {
                te = te || W(q, ge, !1),
                te && (D.delta && !Tt(te, 8) ? o.go(-D.delta, !1) : D.type === er.pop && Tt(te, 20) && o.go(-1, !1)),
                U(q, ge, te)
            }).catch(Kn)
        }))
    }
    let L = In(),
        we = In(),
        se;
    function fe(S, j, D) {
        N(S);
        const q = we.list();
        return q.length ? q.forEach(re => re(S, j, D)) : console.error(S), Promise.reject(S)
    }
    function de() {
        return se && u.value !== $t ? Promise.resolve() : new Promise((S, j) => {
            L.add([S, j])
        })
    }
    function N(S) {
        return se || (se = !S, X(), L.list().forEach(([j, D]) => S ? D(S) : j()), L.reset()), S
    }
    function Te(S, j, D, q) {
        const {scrollBehavior: re} = e;
        if (!cn || !re)
            return Promise.resolve();
        const ge = !D && Op(Ei(S.fullPath, 0)) || (q || !D) && history.state && history.state.scroll || null;
        return Pn().then(() => re(S, j, ge)).then(te => te && Rp(te)).catch(te => fe(te, S, j))
    }
    const me = S => o.go(S);
    let Ae;
    const at = new Set,
        je = {
            currentRoute: u,
            listening: !0,
            addRoute: d,
            removeRoute: h,
            hasRoute: y,
            getRoutes: g,
            resolve: p,
            options: e,
            push: T,
            replace: E,
            go: me,
            back: () => me(-1),
            forward: () => me(1),
            beforeEach: i.add,
            beforeResolve: a.add,
            afterEach: c.add,
            onError: we.add,
            isReady: de,
            install(S) {
                const j = this;
                S.component("RouterLink", mh),
                S.component("RouterView", Rl),
                S.config.globalProperties.$router = j,
                Object.defineProperty(S.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => ne(u)
                }),
                cn && !Ae && u.value === $t && (Ae = !0, T(o.location).catch(re => {}));
                const D = {};
                for (const re in $t)
                    D[re] = le(() => u.value[re]);
                S.provide(ws, j),
                S.provide(Ts, bt(D)),
                S.provide($o, u);
                const q = S.unmount;
                at.add(S),
                S.unmount = function() {
                    at.delete(S),
                    at.size < 1 && (f = $t, F && F(), F = null, u.value = $t, Ae = !1, se = !1),
                    q()
                }
            }
        };
    return je
}
function ln(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve())
}
function wh(e, t) {
    const n = [],
        r = [],
        o = [],
        i = Math.max(t.matched.length, e.matched.length);
    for (let a = 0; a < i; a++) {
        const c = t.matched[a];
        c && (e.matched.find(f => An(f, c)) ? r.push(c) : n.push(c));
        const u = e.matched[a];
        u && (t.matched.find(f => An(f, u)) || o.push(u))
    }
    return [n, r, o]
}
function Th() {
    return Je(Ts)
}
function ao(e) {
    return e !== null && typeof e == "object"
}
function Fo(e, t, n=".", r) {
    if (!ao(t))
        return Fo(e, {}, n, r);
    const o = Object.assign({}, t);
    for (const i in e) {
        if (i === "__proto__" || i === "constructor")
            continue;
        const a = e[i];
        a != null && (r && r(o, i, a, n) || (Array.isArray(a) && Array.isArray(o[i]) ? o[i] = [...a, ...o[i]] : ao(a) && ao(o[i]) ? o[i] = Fo(a, o[i], (n ? `${n}.` : "") + i.toString(), r) : o[i] = a))
    }
    return o
}
function Ah(e) {
    return (...t) => t.reduce((n, r) => Fo(n, r, "", e), {})
}
const Eh = Ah();
class Bo extends Error {
    constructor()
    {
        super(...arguments),
        this.statusCode = 500,
        this.fatal = !1,
        this.unhandled = !1,
        this.statusMessage = void 0
    }
    toJSON()
    {
        const t = {
            message: this.message,
            statusCode: No(this.statusCode, 500)
        };
        return this.statusMessage && (t.statusMessage = Hl(this.statusMessage)), this.data !== void 0 && (t.data = this.data), t
    }
}
Bo.__h3_error__ = !0;
function Do(e) {
    if (typeof e == "string")
        return new Bo(e);
    if (Ch(e))
        return e;
    const t = new Bo(e.message ?? e.statusMessage, e.cause ? {
        cause: e.cause
    } : void 0);
    if ("stack" in e)
        try {
            Object.defineProperty(t, "stack", {
                get() {
                    return e.stack
                }
            })
        } catch {
            try {
                t.stack = e.stack
            } catch {}
        }
    if (e.data && (t.data = e.data), e.statusCode ? t.statusCode = No(e.statusCode, t.statusCode) : e.status && (t.statusCode = No(e.status, t.statusCode)), e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText), t.statusMessage) {
        const n = t.statusMessage;
        Hl(t.statusMessage) !== n && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default.")
    }
    return e.fatal !== void 0 && (t.fatal = e.fatal), e.unhandled !== void 0 && (t.unhandled = e.unhandled), t
}
function Ch(e) {
    var t;
    return ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.__h3_error__) === !0
}
const kh = /[^\u0009\u0020-\u007E]/g;
function Hl(e="") {
    return e.replace(kh, "")
}
function No(e, t=200) {
    return !e || (typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999) ? t : e
}
function tr(...e) {
    const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
    typeof e[0] != "string" && e.unshift(t);
    const [n, r] = e;
    if (!n || typeof n != "string")
        throw new TypeError("[nuxt] [useState] key must be a string: " + n);
    if (r !== void 0 && typeof r != "function")
        throw new Error("[nuxt] [useState] init must be a function: " + r);
    const o = "$s" + n,
        i = ue(),
        a = ss(i.payload.state, o);
    if (a.value === void 0 && r) {
        const c = r();
        if (Pe(c))
            return i.payload.state[o] = c, c;
        a.value = c
    }
    return a
}
const Rt = () => {
        var e;
        return (e = ue()) == null ? void 0 : e.$router
    },
    Ur = () => zt() ? Je("_route", ue()._route) : ue()._route,
    Sh = e => e,
    xh = () => {
        try {
            if (ue()._processingMiddleware)
                return !0
        } catch {
            return !0
        }
        return !1
    },
    Ph = (e, t) => {
        e || (e = "/");
        const n = typeof e == "string" ? e : e.path || "/",
            r = (t == null ? void 0 : t.external) || Mn(n, {
                acceptRelative: !0
            });
        if (r && !(t != null && t.external))
            throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
        if (r && ir(n).protocol === "script:")
            throw new Error("Cannot navigate to an URL with script protocol.");
        const o = xh();
        if (!r && o)
            return e;
        const i = Rt();
        return r ? (t != null && t.replace ? location.replace(n) : location.href = n, Promise.resolve()) : t != null && t.replace ? i.replace(e) : i.push(e)
    },
    Wr = () => ss(ue().payload, "error"),
    fn = e => {
        const t = As(e);
        try {
            ue().callHook("app:error", t);
            const r = Wr();
            r.value = r.value || t
        } catch {
            throw t
        }
        return t
    },
    Mh = async (e={}) => {
        const t = ue(),
            n = Wr();
        t.callHook("app:error:cleared", e),
        e.redirect && await Rt().replace(e.redirect),
        n.value = null
    },
    Rh = e => !!(e && typeof e == "object" && "__nuxt_error" in e),
    As = e => {
        const t = Do(e);
        return t.__nuxt_error = !0, t
    },
    Hh = "modulepreload",
    Oh = function(e, t) {
        return e.startsWith(".") ? new URL(e, t).href : e
    },
    Bi = {},
    Lh = function(t, n, r) {
        if (!n || n.length === 0)
            return t();
        const o = document.getElementsByTagName("link");
        return Promise.all(n.map(i => {
            if (i = Oh(i, r), i in Bi)
                return;
            Bi[i] = !0;
            const a = i.endsWith(".css"),
                c = a ? '[rel="stylesheet"]' : "";
            if (!!r)
                for (let _ = o.length - 1; _ >= 0; _--) {
                    const s = o[_];
                    if (s.href === i && (!a || s.rel === "stylesheet"))
                        return
                }
            else if (document.querySelector(`link[href="${i}"]${c}`))
                return;
            const f = document.createElement("link");
            if (f.rel = a ? "stylesheet" : Hh, a || (f.as = "script", f.crossOrigin = ""), f.href = i, document.head.appendChild(f), a)
                return new Promise((_, s) => {
                    f.addEventListener("load", _),
                    f.addEventListener("error", () => s(new Error(`Unable to preload CSS for ${i}`)))
                })
        })).then(() => t())
    },
    Fe = (...e) => Lh(...e).catch(t => {
        const n = new Event("nuxt.preloadError");
        throw n.payload = t, window.dispatchEvent(n), t
    }),
    Ue = {
        layout: "projects"
    },
    We = {
        layout: "default"
    },
    Ke = {
        layout: "blank"
    },
    qe = {
        layout: "default"
    },
    ze = {
        layout: "default"
    },
    Ze = {
        layout: "default"
    },
    Ge = {
        layout: "default"
    },
    Xe = {
        layout: "default"
    },
    Ye = {
        layout: "default"
    },
    Di = [{
        name: (Ue == null ? void 0 : Ue.name) ?? "case-studies-project",
        path: (Ue == null ? void 0 : Ue.path) ?? "/case-studies/:project()",
        meta: Ue || {},
        alias: (Ue == null ? void 0 : Ue.alias) || [],
        redirect: (Ue == null ? void 0 : Ue.redirect) || void 0,
        component: () => Fe(() => import("./_project_.8aeb4b0f.js"), ["./_project_.8aeb4b0f.js", "./CTextO.9a4eed92.js", "./CTextO.4a4b7076.css", "./mobile.25cec666.js", "./Content.5f2d3b4d.js", "./Image.5fb1fbc2.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Image.53ce813c.css", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./headerColor.fc00d50c.js", "./Content.8a43b26c.css", "./_project_.934314ec.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (We == null ? void 0 : We.name) ?? "case-studies",
        path: (We == null ? void 0 : We.path) ?? "/case-studies",
        meta: We || {},
        alias: (We == null ? void 0 : We.alias) || [],
        redirect: (We == null ? void 0 : We.redirect) || void 0,
        component: () => Fe(() => import("./index.3ae6ce89.js"), ["./index.3ae6ce89.js", "./ProjectsList.47bb7f38.js", "./Image.5fb1fbc2.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Image.53ce813c.css", "./CTextO.9a4eed92.js", "./CTextO.4a4b7076.css", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./translate.cdcd0167.js", "./mobile.25cec666.js", "./ProjectsList.09f46f9d.css", "./Push.ce53be57.js", "./Push.12b73f26.css", "./index.5cbd21c9.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (Ke == null ? void 0 : Ke.name) ?? "contact",
        path: (Ke == null ? void 0 : Ke.path) ?? "/contact",
        meta: Ke || {},
        alias: (Ke == null ? void 0 : Ke.alias) || [],
        redirect: (Ke == null ? void 0 : Ke.redirect) || void 0,
        component: () => Fe(() => import("./contact.86fe1435.js"), ["./contact.86fe1435.js", "./FooterBottom.de38607e.js", "./CTextO.9a4eed92.js", "./CTextO.4a4b7076.css", "./FooterBottom.345d308b.css", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./_plugin-vue_export-helper.c27b6911.js", "./contact.c28f2994.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (qe == null ? void 0 : qe.name) ?? "index",
        path: (qe == null ? void 0 : qe.path) ?? "/",
        meta: qe || {},
        alias: (qe == null ? void 0 : qe.alias) || [],
        redirect: (qe == null ? void 0 : qe.redirect) || void 0,
        component: () => Fe(() => import("./index.90c51ba7.js"), ["./index.90c51ba7.js", "./CTextO.9a4eed92.js", "./CTextO.4a4b7076.css", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./Content.5f2d3b4d.js", "./Image.5fb1fbc2.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Image.53ce813c.css", "./headerColor.fc00d50c.js", "./Content.8a43b26c.css", "./ProjectsList.47bb7f38.js", "./translate.cdcd0167.js", "./mobile.25cec666.js", "./ProjectsList.09f46f9d.css", "./index.c00b0110.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (ze == null ? void 0 : ze.name) ?? "privacy-policies-cookies",
        path: (ze == null ? void 0 : ze.path) ?? "/privacy-policies-cookies",
        meta: ze || {},
        alias: (ze == null ? void 0 : ze.alias) || [],
        redirect: (ze == null ? void 0 : ze.redirect) || void 0,
        component: () => Fe(() => import("./privacy-policies-cookies.37facd99.js"), ["./privacy-policies-cookies.37facd99.js", "./Wysiwyg.67bdce34.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Wysiwyg.b9b14d04.css", "./privacy-policies-cookies.b9a0dea0.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (Ze == null ? void 0 : Ze.name) ?? "services",
        path: (Ze == null ? void 0 : Ze.path) ?? "/services",
        meta: Ze || {},
        alias: (Ze == null ? void 0 : Ze.alias) || [],
        redirect: (Ze == null ? void 0 : Ze.redirect) || void 0,
        component: () => Fe(() => import("./services.64f26006.js"), ["./services.64f26006.js", "./Image.5fb1fbc2.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Image.53ce813c.css", "./headerColor.fc00d50c.js", "./Content.5f2d3b4d.js", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./Content.8a43b26c.css", "./Push.ce53be57.js", "./translate.cdcd0167.js", "./Push.12b73f26.css", "./services.ddc39667.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (Ge == null ? void 0 : Ge.name) ?? "studio",
        path: (Ge == null ? void 0 : Ge.path) ?? "/studio",
        meta: Ge || {},
        alias: (Ge == null ? void 0 : Ge.alias) || [],
        redirect: (Ge == null ? void 0 : Ge.redirect) || void 0,
        component: () => Fe(() => import("./studio.caba91e8.js"), ["./studio.caba91e8.js", "./CTextO.9a4eed92.js", "./CTextO.4a4b7076.css", "./headerColor.fc00d50c.js", "./Content.5f2d3b4d.js", "./Image.5fb1fbc2.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Image.53ce813c.css", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./Content.8a43b26c.css", "./Push.ce53be57.js", "./translate.cdcd0167.js", "./Push.12b73f26.css", "./studio.ef4b5909.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (Xe == null ? void 0 : Xe.name) ?? "typography",
        path: (Xe == null ? void 0 : Xe.path) ?? "/typography",
        meta: Xe || {},
        alias: (Xe == null ? void 0 : Xe.alias) || [],
        redirect: (Xe == null ? void 0 : Xe.redirect) || void 0,
        component: () => Fe(() => import("./typography.66e3c381.js"), ["./typography.66e3c381.js", "./typography.c425428b.css"], import.meta.url).then(e => e.default || e)
    }, {
        name: (Ye == null ? void 0 : Ye.name) ?? "web-credits",
        path: (Ye == null ? void 0 : Ye.path) ?? "/web-credits",
        meta: Ye || {},
        alias: (Ye == null ? void 0 : Ye.alias) || [],
        redirect: (Ye == null ? void 0 : Ye.redirect) || void 0,
        component: () => Fe(() => import("./web-credits.655f9f36.js"), ["./web-credits.655f9f36.js", "./Wysiwyg.67bdce34.js", "./seo.1021c7f7.js", "./seo.8c9ffc58.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Wysiwyg.b9b14d04.css", "./web-credits.15b501b8.css"], import.meta.url).then(e => e.default || e)
    }],
    Ih = {
        scrollBehavior(e, t, n) {
            const r = ue();
            let o = n || void 0;
            if (!o && t && e && e.meta.scrollToTop !== !1 && $h(t, e) && (o = {
                left: 0,
                top: 0
            }), e.path === t.path) {
                if (t.hash && !e.hash)
                    return {
                        left: 0,
                        top: 0
                    };
                if (e.hash)
                    return {
                        el: e.hash,
                        top: Ni(e.hash)
                    }
            }
            const i = c => !!(c.meta.pageTransition ?? Oo),
                a = i(t) && i(e) ? "page:transition:finish" : "page:finish";
            return new Promise(c => {
                r.hooks.hookOnce(a, async () => {
                    await Pn(),
                    e.hash && (o = {
                        el: e.hash,
                        top: Ni(e.hash)
                    }),
                    c(o)
                })
            })
        }
    };
function Ni(e) {
    try {
        const t = document.querySelector(e);
        if (t)
            return parseFloat(getComputedStyle(t).scrollMarginTop)
    } catch {}
    return 0
}
function $h(e, t) {
    const n = e.matched[0] === t.matched[0];
    return !!(!n || n && JSON.stringify(e.params) !== JSON.stringify(t.params))
}
const Fh = {},
    At = {
        ...Fh,
        ...Ih
    },
    Bh = Sh(async e => {
        var u;
        let t,
            n;
        if (!((u = e.meta) != null && u.validate))
            return;
        const r = ue(),
            o = Rt();
        if (([t, n] = Po(() => Promise.resolve(e.meta.validate(e))), t = await t, n(), t) === !0)
            return;
        const a = As({
                statusCode: 404,
                statusMessage: `Page Not Found: ${e.fullPath}`
            }),
            c = o.beforeResolve(f => {
                if (c(), f === e) {
                    const _ = o.afterEach(async () => {
                        _(),
                        await Ct(r, fn, [a]),
                        window.history.pushState({}, "", e.fullPath)
                    });
                    return !1
                }
            })
    }),
    Dh = [Bh],
    zn = {};
function Nh(e, t) {
    const {pathname: n, search: r, hash: o} = t,
        i = e.indexOf("#");
    if (i > -1) {
        const c = o.includes(e.slice(i)) ? e.slice(i).length : 1;
        let u = o.slice(c);
        return u[0] !== "/" && (u = "/" + u), pi(u, "")
    }
    return pi(n, e) + r + o
}
const jh = tt({
        name: "nuxt:router",
        enforce: "pre",
        async setup(e) {
            var h,
                g;
            let t,
                n,
                r = sn().app.baseURL;
            At.hashMode && !r.includes("#") && (r += "#");
            const o = ((h = At.history) == null ? void 0 : h.call(At, r)) ?? (At.hashMode ? Fp(r) : Tl(r)),
                i = ((g = At.routes) == null ? void 0 : g.call(At, Di)) ?? Di,
                a = Nh(r, window.location),
                c = bh({
                    ...At,
                    history: o,
                    routes: i
                });
            e.vueApp.use(c);
            const u = _o(c.currentRoute.value);
            c.afterEach((y, p) => {
                u.value = p
            }),
            Object.defineProperty(e.vueApp.config.globalProperties, "previousRoute", {
                get: () => u.value
            });
            const f = _o(c.resolve(a)),
                _ = () => {
                    f.value = c.currentRoute.value
                };
            e.hook("page:finish", _),
            c.afterEach((y, p) => {
                var m,
                    b,
                    T,
                    E;
                ((b = (m = y.matched[0]) == null ? void 0 : m.components) == null ? void 0 : b.default) === ((E = (T = p.matched[0]) == null ? void 0 : T.components) == null ? void 0 : E.default) && _()
            });
            const s = {};
            for (const y in f.value)
                s[y] = le(() => f.value[y]);
            e._route = bt(s),
            e._middleware = e._middleware || {
                global: [],
                named: {}
            };
            const l = Wr();
            try {
                [t, n] = Po(() => c.isReady()),
                await t,
                n()
            } catch (y) {
                [t, n] = Po(() => Ct(e, fn, [y])),
                await t,
                n()
            }
            const d = tr("_layout");
            return c.beforeEach(async (y, p) => {
                var b;
                y.meta = bt(y.meta),
                e.isHydrating && d.value && !rn(y.meta.layout) && (y.meta.layout = d.value),
                e._processingMiddleware = !0;
                const m = new Set([...Dh, ...e._middleware.global]);
                for (const T of y.matched) {
                    const E = T.meta.middleware;
                    if (E)
                        if (Array.isArray(E))
                            for (const P of E)
                                m.add(P);
                        else
                            m.add(E)
                }
                for (const T of m) {
                    const E = typeof T == "string" ? e._middleware.named[T] || await ((b = zn[T]) == null ? void 0 : b.call(zn).then(H => H.default || H)) : T;
                    if (!E)
                        throw new Error(`Unknown route middleware: '${T}'.`);
                    const P = await Ct(e, E, [y, p]);
                    if (!e.payload.serverRendered && e.isHydrating && (P === !1 || P instanceof Error)) {
                        const H = P || Do({
                            statusCode: 404,
                            statusMessage: `Page Not Found: ${a}`
                        });
                        return await Ct(e, fn, [H]), !1
                    }
                    if (P || P === !1)
                        return P
                }
            }), c.onError(() => {
                delete e._processingMiddleware
            }), c.afterEach(async (y, p, m) => {
                delete e._processingMiddleware,
                !e.isHydrating && l.value && await Ct(e, Mh),
                y.matched.length === 0 && await Ct(e, fn, [Do({
                    statusCode: 404,
                    fatal: !1,
                    statusMessage: `Page not found: ${y.fullPath}`
                })])
            }), e.hooks.hookOnce("app:created", async () => {
                try {
                    await c.replace({
                        ...c.resolve(a),
                        name: void 0,
                        force: !0
                    })
                } catch (y) {
                    await Ct(e, fn, [y])
                }
            }), {
                provide: {
                    router: c
                }
            }
        }
    }, 1),
    dn = {
        blank: () => Fe(() => import("./blank.4335f7b8.js"), ["./blank.4335f7b8.js", "./_plugin-vue_export-helper.c27b6911.js"], import.meta.url).then(e => e.default || e),
        default: () => Fe(() => import("./default.1f8edd16.js"), ["./default.1f8edd16.js", "./FooterBottom.de38607e.js", "./CTextO.9a4eed92.js", "./CTextO.4a4b7076.css", "./FooterBottom.345d308b.css", "./CTextAppear.0128840d.js", "./CTextAppear.20999364.css", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./headerColor.fc00d50c.js", "./_plugin-vue_export-helper.c27b6911.js", "./default.5b8b0de2.css"], import.meta.url).then(e => e.default || e),
        error: () => Fe(() => import("./error.c22ccbff.js"), ["./error.c22ccbff.js", "./_plugin-vue_export-helper.c27b6911.js"], import.meta.url).then(e => e.default || e),
        projects: () => Fe(() => import("./projects.6342f854.js"), ["./projects.6342f854.js", "./_plugin-vue_export-helper.c27b6911.js", "./typography.c425428b.css"], import.meta.url).then(e => e.default || e)
    },
    Vh = tt({
        name: "nuxt:prefetch",
        setup(e) {
            const t = Rt();
            e.hooks.hook("app:mounted", () => {
                t.beforeEach(async n => {
                    var o;
                    const r = (o = n == null ? void 0 : n.meta) == null ? void 0 : o.layout;
                    r && typeof dn[r] == "function" && await dn[r]()
                })
            }),
            e.hooks.hook("link:prefetch", n => {
                var a,
                    c,
                    u,
                    f;
                if (Mn(n))
                    return;
                const r = t.resolve(n);
                if (!r)
                    return;
                const o = (a = r == null ? void 0 : r.meta) == null ? void 0 : a.layout;
                let i = Array.isArray((c = r == null ? void 0 : r.meta) == null ? void 0 : c.middleware) ? (u = r == null ? void 0 : r.meta) == null ? void 0 : u.middleware : [(f = r == null ? void 0 : r.meta) == null ? void 0 : f.middleware];
                i = i.filter(_ => typeof _ == "string");
                for (const _ of i)
                    typeof zn[_] == "function" && zn[_]();
                o && typeof dn[o] == "function" && dn[o]()
            })
        }
    }),
    Uh = () => null;
function lo(...e) {
    var l;
    const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
    typeof e[0] != "string" && e.unshift(t);
    let [n, r, o={}] = e;
    if (typeof n != "string")
        throw new TypeError("[nuxt] [asyncData] key must be a string.");
    if (typeof r != "function")
        throw new TypeError("[nuxt] [asyncData] handler must be a function.");
    o.server = o.server ?? !0,
    o.default = o.default ?? Uh,
    o.lazy = o.lazy ?? !1,
    o.immediate = o.immediate ?? !0;
    const i = ue(),
        a = () => i.isHydrating ? i.payload.data[n] : i.static.data[n],
        c = () => a() !== void 0;
    i._asyncData[n] || (i._asyncData[n] = {
        data: z(a() ?? ((l = o.default) == null ? void 0 : l.call(o)) ?? null),
        pending: z(!c()),
        error: ss(i.payload._errors, n)
    });
    const u = {
        ...i._asyncData[n]
    };
    u.refresh = u.execute = (d={}) => {
        if (i._asyncDataPromises[n]) {
            if (d.dedupe === !1)
                return i._asyncDataPromises[n];
            i._asyncDataPromises[n].cancelled = !0
        }
        if (d._initial && c())
            return a();
        u.pending.value = !0;
        const h = new Promise((g, y) => {
            try {
                g(r(i))
            } catch (p) {
                y(p)
            }
        }).then(g => {
            if (h.cancelled)
                return i._asyncDataPromises[n];
            let y = g;
            o.transform && (y = o.transform(g)),
            o.pick && (y = Wh(y, o.pick)),
            u.data.value = y,
            u.error.value = null
        }).catch(g => {
            var y;
            if (h.cancelled)
                return i._asyncDataPromises[n];
            u.error.value = g,
            u.data.value = ne(((y = o.default) == null ? void 0 : y.call(o)) ?? null)
        }).finally(() => {
            h.cancelled || (u.pending.value = !1, i.payload.data[n] = u.data.value, u.error.value && (i.payload._errors[n] = As(u.error.value)), delete i._asyncDataPromises[n])
        });
        return i._asyncDataPromises[n] = h, i._asyncDataPromises[n]
    };
    const f = () => u.refresh({
            _initial: !0
        }),
        _ = o.server !== !1 && i.payload.serverRendered;
    {
        const d = zt();
        if (d && !d._nuxtOnBeforeMountCbs) {
            d._nuxtOnBeforeMountCbs = [];
            const g = d._nuxtOnBeforeMountCbs;
            d && (Ha(() => {
                g.forEach(y => {
                    y()
                }),
                g.splice(0, g.length)
            }), Jn(() => g.splice(0, g.length)))
        }
        _ && i.isHydrating && c() ? u.pending.value = !1 : d && (i.payload.serverRendered && i.isHydrating || o.lazy) && o.immediate ? d._nuxtOnBeforeMountCbs.push(f) : o.immediate && f(),
        o.watch && Ut(o.watch, () => u.refresh());
        const h = i.hook("app:data:refresh", g => {
            if (!g || g.includes(n))
                return u.refresh()
        });
        d && Jn(h)
    }
    const s = Promise.resolve(i._asyncDataPromises[n]).then(() => u);
    return Object.assign(s, u), s
}
function Wh(e, t) {
    const n = {};
    for (const r of t)
        n[r] = e[r];
    return n
}
const jo = globalThis.requestIdleCallback || (e => {
        const t = Date.now(),
            n = {
                didTimeout: !1,
                timeRemaining: () => Math.max(0, 50 - (Date.now() - t))
            };
        return setTimeout(() => {
            e(n)
        }, 1)
    }),
    Kh = globalThis.cancelIdleCallback || (e => {
        clearTimeout(e)
    }),
    qh = e => {
        const t = ue();
        t.isHydrating ? t.hooks.hookOnce("app:suspense:resolve", () => {
            jo(e)
        }) : jo(e)
    };
async function Ol(e, t=Rt()) {
    const {path: n, matched: r} = t.resolve(e);
    if (!r.length || (t._routePreloaded || (t._routePreloaded = new Set), t._routePreloaded.has(n)))
        return;
    const o = t._preloadPromises = t._preloadPromises || [];
    if (o.length > 4)
        return Promise.all(o).then(() => Ol(e, t));
    t._routePreloaded.add(n);
    const i = r.map(a => {
        var c;
        return (c = a.components) == null ? void 0 : c.default
    }).filter(a => typeof a == "function");
    for (const a of i) {
        const c = Promise.resolve(a()).catch(() => {}).finally(() => o.splice(o.indexOf(c)));
        o.push(c)
    }
    await Promise.all(o)
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
const zh = -1,
    Zh = -2,
    Gh = -3,
    Xh = -4,
    Yh = -5,
    Qh = -6;
function Jh(e, t) {
    return e_(JSON.parse(e), t)
}
function e_(e, t) {
    if (typeof e == "number")
        return o(e, !0);
    if (!Array.isArray(e) || e.length === 0)
        throw new Error("Invalid input");
    const n = e,
        r = Array(n.length);
    function o(i, a=!1) {
        if (i === zh)
            return;
        if (i === Gh)
            return NaN;
        if (i === Xh)
            return 1 / 0;
        if (i === Yh)
            return -1 / 0;
        if (i === Qh)
            return -0;
        if (a)
            throw new Error("Invalid input");
        if (i in r)
            return r[i];
        const c = n[i];
        if (!c || typeof c != "object")
            r[i] = c;
        else if (Array.isArray(c))
            if (typeof c[0] == "string") {
                const u = c[0],
                    f = t == null ? void 0 : t[u];
                if (f)
                    return r[i] = f(o(c[1]));
                switch (u) {
                case "Date":
                    r[i] = new Date(c[1]);
                    break;
                case "Set":
                    const _ = new Set;
                    r[i] = _;
                    for (let d = 1; d < c.length; d += 1)
                        _.add(o(c[d]));
                    break;
                case "Map":
                    const s = new Map;
                    r[i] = s;
                    for (let d = 1; d < c.length; d += 2)
                        s.set(o(c[d]), o(c[d + 1]));
                    break;
                case "RegExp":
                    r[i] = new RegExp(c[1], c[2]);
                    break;
                case "Object":
                    r[i] = Object(c[1]);
                    break;
                case "BigInt":
                    r[i] = BigInt(c[1]);
                    break;
                case "null":
                    const l = Object.create(null);
                    r[i] = l;
                    for (let d = 1; d < c.length; d += 2)
                        l[c[d]] = o(c[d + 1]);
                    break;
                default:
                    throw new Error(`Unknown type ${u}`)
                }
            } else {
                const u = new Array(c.length);
                r[i] = u;
                for (let f = 0; f < c.length; f += 1) {
                    const _ = c[f];
                    _ !== Zh && (u[f] = o(_))
                }
            }
        else {
            const u = {};
            r[i] = u;
            for (const f in c) {
                const _ = c[f];
                u[f] = o(_)
            }
        }
        return r[i]
    }
    return o(0)
}
function ji(e, t={}) {
    const n = t_(e, t),
        r = ue(),
        o = r._payloadCache = r._payloadCache || {};
    return o[n] || (o[n] = n_(n).then(i => i || (delete o[n], null))), o[n]
}
const Vi = "js";
function t_(e, t={}) {
    const n = new URL(e, "http://localhost");
    if (n.search)
        throw new Error("Payload URL cannot contain search params: " + e);
    if (n.host !== "localhost" || Mn(n.pathname, {
        acceptRelative: !0
    }))
        throw new Error("Payload URL must not include hostname: " + e);
    const r = t.hash || (t.fresh ? Date.now() : "");
    return sr(sn().app.baseURL, n.pathname, r ? `_payload.${r}.${Vi}` : `_payload.${Vi}`)
}
async function n_(e) {
    try {
        return vp ? o_(await fetch(e).then(t => t.text())) : await Fe(() => import(e), [], import.meta.url).then(t => t.default || t)
    } catch (t) {
        console.warn("[nuxt] Cannot load payload ", e, t)
    }
    return null
}
function r_() {
    return !!ue().payload.prerenderedAt
}
function o_(e) {
    return Jh(e, ue()._payloadRevivers)
}
function s_(e={}) {
    const t = e.path || window.location.pathname;
    let n = {};
    try {
        n = JSON.parse(sessionStorage.getItem("nuxt:reload") || "{}")
    } catch {}
    if (e.force || (n == null ? void 0 : n.path) !== t || (n == null ? void 0 : n.expires) < Date.now()) {
        try {
            sessionStorage.setItem("nuxt:reload", JSON.stringify({
                path: t,
                expires: Date.now() + (e.ttl ?? 1e4)
            }))
        } catch {}
        if (e.persistState)
            try {
                sessionStorage.setItem("nuxt:reload:state", JSON.stringify({
                    state: ue().payload.state
                }))
            } catch {}
        window.location.pathname !== t ? window.location.href = t : window.location.reload()
    }
}
const i_ = (...e) => e.find(t => t !== void 0),
    a_ = "noopener noreferrer";
function l_(e) {
    const t = e.componentName || "NuxtLink",
        n = (r, o) => {
            if (!r || e.trailingSlash !== "append" && e.trailingSlash !== "remove")
                return r;
            const i = e.trailingSlash === "append" ? sl : ms;
            if (typeof r == "string")
                return i(r, !0);
            const a = "path" in r ? r.path : o(r).path;
            return {
                ...r,
                name: void 0,
                path: i(a, !0)
            }
        };
    return Pt({
        name: t,
        props: {
            to: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            href: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            target: {
                type: String,
                default: void 0,
                required: !1
            },
            rel: {
                type: String,
                default: void 0,
                required: !1
            },
            noRel: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            prefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            noPrefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            activeClass: {
                type: String,
                default: void 0,
                required: !1
            },
            exactActiveClass: {
                type: String,
                default: void 0,
                required: !1
            },
            prefetchedClass: {
                type: String,
                default: void 0,
                required: !1
            },
            replace: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            ariaCurrentValue: {
                type: String,
                default: void 0,
                required: !1
            },
            external: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            custom: {
                type: Boolean,
                default: void 0,
                required: !1
            }
        },
        setup(r, {slots: o}) {
            const i = Rt(),
                a = le(() => {
                    const s = r.to || r.href || "";
                    return n(s, i.resolve)
                }),
                c = le(() => r.external || r.target && r.target !== "_self" ? !0 : typeof a.value == "object" ? !1 : a.value === "" || Mn(a.value, {
                    acceptRelative: !0
                })),
                u = z(!1),
                f = z(null),
                _ = s => {
                    var l;
                    f.value = r.custom ? (l = s == null ? void 0 : s.$el) == null ? void 0 : l.nextElementSibling : s == null ? void 0 : s.$el
                };
            if (r.prefetch !== !1 && r.noPrefetch !== !0 && r.target !== "_blank" && !u_()) {
                const l = ue();
                let d,
                    h = null;
                it(() => {
                    const g = c_();
                    qh(() => {
                        d = jo(() => {
                            var y;
                            (y = f == null ? void 0 : f.value) != null && y.tagName && (h = g.observe(f.value, async () => {
                                h == null || h(),
                                h = null;
                                const p = typeof a.value == "string" ? a.value : i.resolve(a.value).fullPath;
                                await Promise.all([l.hooks.callHook("link:prefetch", p).catch(() => {}), !c.value && Ol(a.value, i).catch(() => {})]),
                                u.value = !0
                            }))
                        })
                    })
                }),
                wt(() => {
                    d && Kh(d),
                    h == null || h(),
                    h = null
                })
            }
            return () => {
                var g,
                    y;
                if (!c.value) {
                    const p = {
                        ref: _,
                        to: a.value,
                        activeClass: r.activeClass || e.activeClass,
                        exactActiveClass: r.exactActiveClass || e.exactActiveClass,
                        replace: r.replace,
                        ariaCurrentValue: r.ariaCurrentValue,
                        custom: r.custom
                    };
                    return r.custom || (u.value && (p.class = r.prefetchedClass || e.prefetchedClass), p.rel = r.rel), et(fu("RouterLink"), p, o.default)
                }
                const s = typeof a.value == "object" ? ((g = i.resolve(a.value)) == null ? void 0 : g.href) ?? null : a.value || null,
                    l = r.target || null,
                    d = r.noRel ? null : i_(r.rel, e.externalRelAttribute, s ? a_ : "") || null,
                    h = () => Ph(s, {
                        replace: r.replace
                    });
                return r.custom ? o.default ? o.default({
                    href: s,
                    navigate: h,
                    get route() {
                        if (!s)
                            return;
                        const p = ir(s);
                        return {
                            path: p.pathname,
                            fullPath: p.pathname,
                            get query() {
                                return ol(p.search)
                            },
                            hash: p.hash,
                            params: {},
                            name: void 0,
                            matched: [],
                            redirectedFrom: void 0,
                            meta: {},
                            href: s
                        }
                    },
                    rel: d,
                    target: l,
                    isExternal: c.value,
                    isActive: !1,
                    isExactActive: !1
                }) : null : et("a", {
                    ref: f,
                    href: s,
                    rel: d,
                    target: l
                }, (y = o.default) == null ? void 0 : y.call(o))
            }
        }
    })
}
const Es = l_({
    componentName: "NuxtLink"
});
function c_() {
    const e = ue();
    if (e._observer)
        return e._observer;
    let t = null;
    const n = new Map,
        r = (i, a) => (t || (t = new IntersectionObserver(c => {
            for (const u of c) {
                const f = n.get(u.target);
                (u.isIntersecting || u.intersectionRatio > 0) && f && f()
            }
        })), n.set(i, a), t.observe(i), () => {
            n.delete(i),
            t.unobserve(i),
            n.size === 0 && (t.disconnect(), t = null)
        });
    return e._observer = {
        observe: r
    }
}
function u_() {
    const e = navigator.connection;
    return !!(e && (e.saveData || /2g/.test(e.effectiveType)))
}
function Vo(...e) {
    window.dataLayer.push(arguments)
}
const f_ = tt(() => {
        const {gtag: {id: e, config: t, initialConsent: n, loadingStrategy: r}} = sn().public;
        if (!e || (window.dataLayer = window.dataLayer || [], Vo("js", new Date), Vo("config", e, t), !n))
            return;
        const o = r === "async" ? "async" : "defer";
        pp({
            script: [{
                src: `https://www.googletagmanager.com/gtag/js?id=${e}`,
                [o]: !0
            }]
        })
    }),
    d_ = tt({
        name: "nuxt:chunk-reload",
        setup(e) {
            const t = Rt(),
                n = sn(),
                r = new Set;
            t.beforeEach(() => {
                r.clear()
            }),
            e.hook("app:chunkError", ({error: o}) => {
                r.add(o)
            }),
            t.onError((o, i) => {
                if (r.has(o)) {
                    const c = "href" in i && i.href.startsWith("#") ? n.app.baseURL + i.href : sr(n.app.baseURL, i.fullPath);
                    s_({
                        path: c,
                        persistState: !0
                    })
                }
            })
        }
    }),
    p_ = tt({
        name: "nuxt:payload",
        setup(e) {
            r_() && (e.hooks.hook("link:prefetch", async t => {
                ir(t).protocol || await ji(t)
            }), Rt().beforeResolve(async (t, n) => {
                if (t.path === n.path)
                    return;
                const r = await ji(t.path);
                r && Object.assign(e.static.data, r.data)
            }))
        }
    });
var $n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function h_(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Cs = {
    exports: {}
};
function ks() {}
ks.prototype = {
    on: function(e, t, n) {
        var r = this.e || (this.e = {});
        return (r[e] || (r[e] = [])).push({
            fn: t,
            ctx: n
        }), this
    },
    once: function(e, t, n) {
        var r = this;
        function o() {
            r.off(e, o),
            t.apply(n, arguments)
        }
        return o._ = t, this.on(e, o, n)
    },
    emit: function(e) {
        var t = [].slice.call(arguments, 1),
            n = ((this.e || (this.e = {}))[e] || []).slice(),
            r = 0,
            o = n.length;
        for (r; r < o; r++)
            n[r].fn.apply(n[r].ctx, t);
        return this
    },
    off: function(e, t) {
        var n = this.e || (this.e = {}),
            r = n[e],
            o = [];
        if (r && t)
            for (var i = 0, a = r.length; i < a; i++)
                r[i].fn !== t && r[i].fn._ !== t && o.push(r[i]);
        return o.length ? n[e] = o : delete n[e], this
    }
};
Cs.exports = ks;
Cs.exports.TinyEmitter = ks;
var __ = Cs.exports;
const m_ = h_(__),
    g_ = tt(() => {
        const e = new m_;
        return {
            provide: {
                on: (...i) => e.on(...i),
                once: (...i) => e.once(...i),
                off: (...i) => e.off(...i),
                emit: (...i) => e.emit(...i)
            }
        }
    });
class v_ {
    constructor(t=null, n={})
    {
        this.$el = this.findElement(t),
        this.$el && (this.observer = null, this.default = {
            autoResize: !0,
            once: !1
        }, this.$params = {
            ...this.default,
            ...n
        }, this.destroyedOnce = !1, this.init())
    }
    findElement(t)
    {
        if (t)
            if (typeof t == "string") {
                const n = document.querySelector(t);
                return n || (console.warn("No element with the selector : ", t), !1)
            } else
                return typeof t == "object" ? t : (console.warn("Element passed is not known : ", t), !1);
        else
            return console.warn("No linked element to IntersectionObserver"), !1
    }
    init()
    {
        this.observer = this.createObserver(),
        this.observer.observe(this.$el),
        this.addEvents()
    }
    destroy()
    {
        this.$params.onDestroy && this.$params.onDestroy(entry),
        this.observer && this.observer.unobserve(this.$el),
        this.removeEvents(),
        this.observer = null
    }
    createObserver(t=null)
    {
        return this._update = this.update.bind(this), t && (this.$params = {
            ...this.default,
            ...t
        }), new IntersectionObserver(this._update, this.$params)
    }
    update(t)
    {
        t.forEach(n => {
            this.$params.onIntersect && n.isIntersecting && this.$params.onIntersect(n),
            this.$params.onVisible && n.isVisible && this.$params.onVisible(n),
            this.$params.onEnter && n.isIntersecting && this.$params.onEnter(n),
            this.$params.onLeave && !n.isIntersecting && this.$params.onLeave(n),
            n.isIntersecting && this.$params.once && (this.$params.onDestroyOnce && this.$params.onDestroyOnce(n), this.destroy(), this.destroyedOnce = !0)
        })
    }
    resize()
    {
        this.destroyedOnce || (this.observer && this.observer.unobserve(this.$el), this.observer = this.createObserver(), this.observer.observe(this.$el))
    }
    addEvents()
    {
        this._onResize = this.resize.bind(this),
        this.resizeDebounced = this.debounce(this._onResize, 600),
        this.$params.autoResize && window.addEventListener("resize", this.resizeDebounced)
    }
    removeEvents()
    {
        this.$params.autoResize && window.removeEventListener("resize", this._onResize)
    }
    isEmpty(t)
    {
        for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n))
                return !1;
        return JSON.stringify(t) === JSON.stringify({})
    }
    debounce(t, n, r)
    {
        let o;
        return function() {
            let i = this,
                a = arguments,
                c = function() {
                    o = null,
                    r || t.apply(i, a)
                },
                u = r && !o;
            clearTimeout(o),
            o = setTimeout(c, n),
            u && t.apply(i, a)
        }
    }
}
const y_ = tt(e => {
    e.vueApp.directive("observer", {
        mounted(t, n) {
            t.$observer = new v_(t, n.value)
        },
        getSSRProps(t, n) {
            return {}
        },
        beforeUnmount(t) {
            t.$observer && t.$observer.destroy()
        }
    })
});
class Uo {
    constructor({fps: t=60}={})
    {
        this.fpsInterval = 0,
        this.startTime = 0,
        this.now = 0,
        this.then = 0,
        this.elapsed = 0,
        this.destroyed = !1,
        this.start(t),
        this.callbacks = new Array
    }
    start(t)
    {
        this.fpsInterval = 1e3 / t,
        this.then = performance.now(),
        this.startTime = this.then,
        this.update()
    }
    update(t)
    {
        this.destroyed || (this.raf = requestAnimationFrame(n => {
            this.update(n)
        }), this.now = t, this.elapsed = this.now - this.then, this.elapsed > this.fpsInterval && (this.then = this.now - this.elapsed % this.fpsInterval, this.callbacks.forEach(n => {
            n(this.now)
        })))
    }
    add(t)
    {
        this.callbacks.push(t)
    }
    remove(t)
    {
        this.callbacks = this.callbacks.filter(n => {
            if (n !== t)
                return n
        })
    }
    destroy()
    {
        this.destroyed = !0,
        cancelAnimationFrame(this.raf)
    }
}
const b_ = tt(e => {
    const t = new Uo;
    return e.hook("app:onMounted", () => {
        t.start()
    }), {
        provide: {
            raf: t
        }
    }
});
let Ui = 1234567;
const Ll = Math.PI / 180,
    Il = 180 / Math.PI;
function w_(e, t, n) {
    return Math.max(t, Math.min(n, e))
}
function $l(e, t) {
    return (e % t + t) % t
}
function T_(e, t, n, r, o) {
    return r + (e - t) * (o - r) / (n - t)
}
function A_(e, t, n) {
    return e !== t ? (n - e) / (t - e) : 0
}
function Fl(e, t, n) {
    return (1 - n) * e + n * t
}
function E_(e, t, n, r) {
    return Fl(e, t, 1 - Math.exp(-n * r))
}
function C_(e, t=1) {
    return t - Math.abs($l(e, t * 2) - t)
}
function k_(e, t, n) {
    return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e))
}
function S_(e, t, n) {
    return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10))
}
function x_(e, t) {
    return e + Math.floor(Math.random() * (t - e + 1))
}
function P_(e, t) {
    return e + Math.random() * (t - e)
}
function M_(e) {
    return e * (.5 - Math.random())
}
function R_(e) {
    e !== void 0 && (Ui = e);
    let t = Ui += 1831565813;
    return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296
}
function H_(e) {
    return e * Ll
}
function O_(e) {
    return e * Il
}
function L_(e) {
    return (e & e - 1) === 0 && e !== 0
}
function I_(e) {
    return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2))
}
function $_(e) {
    return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
}
function F_(e, t, n, r, o) {
    const i = Math.cos,
        a = Math.sin,
        c = i(n / 2),
        u = a(n / 2),
        f = i((t + r) / 2),
        _ = a((t + r) / 2),
        s = i((t - r) / 2),
        l = a((t - r) / 2),
        d = i((r - t) / 2),
        h = a((r - t) / 2);
    switch (o) {
    case "XYX":
        e.set(c * _, u * s, u * l, c * f);
        break;
    case "YZY":
        e.set(u * l, c * _, u * s, c * f);
        break;
    case "ZXZ":
        e.set(u * s, u * l, c * _, c * f);
        break;
    case "XZX":
        e.set(c * _, u * h, u * d, c * f);
        break;
    case "YXY":
        e.set(u * d, c * _, u * h, c * f);
        break;
    case "ZYZ":
        e.set(u * h, u * d, c * _, c * f);
        break;
    default:
        console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + o)
    }
}
function B_(e, t) {
    switch (t.constructor) {
    case Float32Array:
        return e;
    case Uint16Array:
        return e / 65535;
    case Uint8Array:
        return e / 255;
    case Int16Array:
        return Math.max(e / 32767, -1);
    case Int8Array:
        return Math.max(e / 127, -1);
    default:
        throw new Error("Invalid component type.")
    }
}
function D_(e, t) {
    switch (t.constructor) {
    case Float32Array:
        return e;
    case Uint16Array:
        return Math.round(e * 65535);
    case Uint8Array:
        return Math.round(e * 255);
    case Int16Array:
        return Math.round(e * 32767);
    case Int8Array:
        return Math.round(e * 127);
    default:
        throw new Error("Invalid component type.")
    }
}
const co = {
    DEG2RAD: Ll,
    RAD2DEG: Il,
    clamp: w_,
    euclideanModulo: $l,
    mapLinear: T_,
    inverseLerp: A_,
    lerp: Fl,
    damp: E_,
    pingpong: C_,
    smoothstep: k_,
    smootherstep: S_,
    randInt: x_,
    randFloat: P_,
    randFloatSpread: M_,
    seededRandom: R_,
    degToRad: H_,
    radToDeg: O_,
    isPowerOfTwo: L_,
    ceilPowerOfTwo: I_,
    floorPowerOfTwo: $_,
    setQuaternionFromProperEuler: F_,
    normalize: D_,
    denormalize: B_
};
var ct = {}; /*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */







(function(e) {
    (function() {
        var t = function() {
            this.init()
        };
        t.prototype = {
            init: function() {
                var s = this || n;
                return s._counter = 1e3, s._html5AudioPool = [], s.html5PoolSize = 10, s._codecs = {}, s._howls = [], s._muted = !1, s._volume = 1, s._canPlayEvent = "canplaythrough", s._navigator = typeof window < "u" && window.navigator ? window.navigator : null, s.masterGain = null, s.noAudio = !1, s.usingWebAudio = !0, s.autoSuspend = !0, s.ctx = null, s.autoUnlock = !0, s._setup(), s
            },
            volume: function(s) {
                var l = this || n;
                if (s = parseFloat(s), l.ctx || _(), typeof s < "u" && s >= 0 && s <= 1) {
                    if (l._volume = s, l._muted)
                        return l;
                    l.usingWebAudio && l.masterGain.gain.setValueAtTime(s, n.ctx.currentTime);
                    for (var d = 0; d < l._howls.length; d++)
                        if (!l._howls[d]._webAudio)
                            for (var h = l._howls[d]._getSoundIds(), g = 0; g < h.length; g++) {
                                var y = l._howls[d]._soundById(h[g]);
                                y && y._node && (y._node.volume = y._volume * s)
                            }
                    return l
                }
                return l._volume
            },
            mute: function(s) {
                var l = this || n;
                l.ctx || _(),
                l._muted = s,
                l.usingWebAudio && l.masterGain.gain.setValueAtTime(s ? 0 : l._volume, n.ctx.currentTime);
                for (var d = 0; d < l._howls.length; d++)
                    if (!l._howls[d]._webAudio)
                        for (var h = l._howls[d]._getSoundIds(), g = 0; g < h.length; g++) {
                            var y = l._howls[d]._soundById(h[g]);
                            y && y._node && (y._node.muted = s ? !0 : y._muted)
                        }
                return l
            },
            stop: function() {
                for (var s = this || n, l = 0; l < s._howls.length; l++)
                    s._howls[l].stop();
                return s
            },
            unload: function() {
                for (var s = this || n, l = s._howls.length - 1; l >= 0; l--)
                    s._howls[l].unload();
                return s.usingWebAudio && s.ctx && typeof s.ctx.close < "u" && (s.ctx.close(), s.ctx = null, _()), s
            },
            codecs: function(s) {
                return (this || n)._codecs[s.replace(/^x-/, "")]
            },
            _setup: function() {
                var s = this || n;
                if (s.state = s.ctx && s.ctx.state || "suspended", s._autoSuspend(), !s.usingWebAudio)
                    if (typeof Audio < "u")
                        try {
                            var l = new Audio;
                            typeof l.oncanplaythrough > "u" && (s._canPlayEvent = "canplay")
                        } catch {
                            s.noAudio = !0
                        }
                    else
                        s.noAudio = !0;
                try {
                    var l = new Audio;
                    l.muted && (s.noAudio = !0)
                } catch {}
                return s.noAudio || s._setupCodecs(), s
            },
            _setupCodecs: function() {
                var s = this || n,
                    l = null;
                try {
                    l = typeof Audio < "u" ? new Audio : null
                } catch {
                    return s
                }
                if (!l || typeof l.canPlayType != "function")
                    return s;
                var d = l.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    h = s._navigator ? s._navigator.userAgent : "",
                    g = h.match(/OPR\/([0-6].)/g),
                    y = g && parseInt(g[0].split("/")[1], 10) < 33,
                    p = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1,
                    m = h.match(/Version\/(.*?) /),
                    b = p && m && parseInt(m[1], 10) < 15;
                return s._codecs = {
                    mp3: !!(!y && (d || l.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!d,
                    opus: !!l.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!l.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    oga: !!l.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!(l.canPlayType('audio/wav; codecs="1"') || l.canPlayType("audio/wav")).replace(/^no$/, ""),
                    aac: !!l.canPlayType("audio/aac;").replace(/^no$/, ""),
                    caf: !!l.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                    m4a: !!(l.canPlayType("audio/x-m4a;") || l.canPlayType("audio/m4a;") || l.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    m4b: !!(l.canPlayType("audio/x-m4b;") || l.canPlayType("audio/m4b;") || l.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(l.canPlayType("audio/x-mp4;") || l.canPlayType("audio/mp4;") || l.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!(!b && l.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    webm: !!(!b && l.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    dolby: !!l.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(l.canPlayType("audio/x-flac;") || l.canPlayType("audio/flac;")).replace(/^no$/, "")
                }, s
            },
            _unlockAudio: function() {
                var s = this || n;
                if (!(s._audioUnlocked || !s.ctx)) {
                    s._audioUnlocked = !1,
                    s.autoUnlock = !1,
                    !s._mobileUnloaded && s.ctx.sampleRate !== 44100 && (s._mobileUnloaded = !0, s.unload()),
                    s._scratchBuffer = s.ctx.createBuffer(1, 1, 22050);
                    var l = function(d) {
                        for (; s._html5AudioPool.length < s.html5PoolSize;)
                            try {
                                var h = new Audio;
                                h._unlocked = !0,
                                s._releaseHtml5Audio(h)
                            } catch {
                                s.noAudio = !0;
                                break
                            }
                        for (var g = 0; g < s._howls.length; g++)
                            if (!s._howls[g]._webAudio)
                                for (var y = s._howls[g]._getSoundIds(), p = 0; p < y.length; p++) {
                                    var m = s._howls[g]._soundById(y[p]);
                                    m && m._node && !m._node._unlocked && (m._node._unlocked = !0, m._node.load())
                                }
                        s._autoResume();
                        var b = s.ctx.createBufferSource();
                        b.buffer = s._scratchBuffer,
                        b.connect(s.ctx.destination),
                        typeof b.start > "u" ? b.noteOn(0) : b.start(0),
                        typeof s.ctx.resume == "function" && s.ctx.resume(),
                        b.onended = function() {
                            b.disconnect(0),
                            s._audioUnlocked = !0,
                            document.removeEventListener("touchstart", l, !0),
                            document.removeEventListener("touchend", l, !0),
                            document.removeEventListener("click", l, !0),
                            document.removeEventListener("keydown", l, !0);
                            for (var T = 0; T < s._howls.length; T++)
                                s._howls[T]._emit("unlock")
                        }
                    };
                    return document.addEventListener("touchstart", l, !0), document.addEventListener("touchend", l, !0), document.addEventListener("click", l, !0), document.addEventListener("keydown", l, !0), s
                }
            },
            _obtainHtml5Audio: function() {
                var s = this || n;
                if (s._html5AudioPool.length)
                    return s._html5AudioPool.pop();
                var l = new Audio().play();
                return l && typeof Promise < "u" && (l instanceof Promise || typeof l.then == "function") && l.catch(function() {
                    console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                }), new Audio
            },
            _releaseHtml5Audio: function(s) {
                var l = this || n;
                return s._unlocked && l._html5AudioPool.push(s), l
            },
            _autoSuspend: function() {
                var s = this;
                if (!(!s.autoSuspend || !s.ctx || typeof s.ctx.suspend > "u" || !n.usingWebAudio)) {
                    for (var l = 0; l < s._howls.length; l++)
                        if (s._howls[l]._webAudio) {
                            for (var d = 0; d < s._howls[l]._sounds.length; d++)
                                if (!s._howls[l]._sounds[d]._paused)
                                    return s
                        }
                    return s._suspendTimer && clearTimeout(s._suspendTimer), s._suspendTimer = setTimeout(function() {
                        if (s.autoSuspend) {
                            s._suspendTimer = null,
                            s.state = "suspending";
                            var h = function() {
                                s.state = "suspended",
                                s._resumeAfterSuspend && (delete s._resumeAfterSuspend, s._autoResume())
                            };
                            s.ctx.suspend().then(h, h)
                        }
                    }, 3e4), s
                }
            },
            _autoResume: function() {
                var s = this;
                if (!(!s.ctx || typeof s.ctx.resume > "u" || !n.usingWebAudio))
                    return s.state === "running" && s.ctx.state !== "interrupted" && s._suspendTimer ? (clearTimeout(s._suspendTimer), s._suspendTimer = null) : s.state === "suspended" || s.state === "running" && s.ctx.state === "interrupted" ? (s.ctx.resume().then(function() {
                        s.state = "running";
                        for (var l = 0; l < s._howls.length; l++)
                            s._howls[l]._emit("resume")
                    }), s._suspendTimer && (clearTimeout(s._suspendTimer), s._suspendTimer = null)) : s.state === "suspending" && (s._resumeAfterSuspend = !0), s
            }
        };
        var n = new t,
            r = function(s) {
                var l = this;
                if (!s.src || s.src.length === 0) {
                    console.error("An array of source files must be passed with any new Howl.");
                    return
                }
                l.init(s)
            };
        r.prototype = {
            init: function(s) {
                var l = this;
                return n.ctx || _(), l._autoplay = s.autoplay || !1, l._format = typeof s.format != "string" ? s.format : [s.format], l._html5 = s.html5 || !1, l._muted = s.mute || !1, l._loop = s.loop || !1, l._pool = s.pool || 5, l._preload = typeof s.preload == "boolean" || s.preload === "metadata" ? s.preload : !0, l._rate = s.rate || 1, l._sprite = s.sprite || {}, l._src = typeof s.src != "string" ? s.src : [s.src], l._volume = s.volume !== void 0 ? s.volume : 1, l._xhr = {
                    method: s.xhr && s.xhr.method ? s.xhr.method : "GET",
                    headers: s.xhr && s.xhr.headers ? s.xhr.headers : null,
                    withCredentials: s.xhr && s.xhr.withCredentials ? s.xhr.withCredentials : !1
                }, l._duration = 0, l._state = "unloaded", l._sounds = [], l._endTimers = {}, l._queue = [], l._playLock = !1, l._onend = s.onend ? [{
                    fn: s.onend
                }] : [], l._onfade = s.onfade ? [{
                    fn: s.onfade
                }] : [], l._onload = s.onload ? [{
                    fn: s.onload
                }] : [], l._onloaderror = s.onloaderror ? [{
                    fn: s.onloaderror
                }] : [], l._onplayerror = s.onplayerror ? [{
                    fn: s.onplayerror
                }] : [], l._onpause = s.onpause ? [{
                    fn: s.onpause
                }] : [], l._onplay = s.onplay ? [{
                    fn: s.onplay
                }] : [], l._onstop = s.onstop ? [{
                    fn: s.onstop
                }] : [], l._onmute = s.onmute ? [{
                    fn: s.onmute
                }] : [], l._onvolume = s.onvolume ? [{
                    fn: s.onvolume
                }] : [], l._onrate = s.onrate ? [{
                    fn: s.onrate
                }] : [], l._onseek = s.onseek ? [{
                    fn: s.onseek
                }] : [], l._onunlock = s.onunlock ? [{
                    fn: s.onunlock
                }] : [], l._onresume = [], l._webAudio = n.usingWebAudio && !l._html5, typeof n.ctx < "u" && n.ctx && n.autoUnlock && n._unlockAudio(), n._howls.push(l), l._autoplay && l._queue.push({
                    event: "play",
                    action: function() {
                        l.play()
                    }
                }), l._preload && l._preload !== "none" && l.load(), l
            },
            load: function() {
                var s = this,
                    l = null;
                if (n.noAudio) {
                    s._emit("loaderror", null, "No audio support.");
                    return
                }
                typeof s._src == "string" && (s._src = [s._src]);
                for (var d = 0; d < s._src.length; d++) {
                    var h,
                        g;
                    if (s._format && s._format[d])
                        h = s._format[d];
                    else {
                        if (g = s._src[d], typeof g != "string") {
                            s._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        h = /^data:audio\/([^;,]+);/i.exec(g),
                        h || (h = /\.([^.]+)$/.exec(g.split("?", 1)[0])),
                        h && (h = h[1].toLowerCase())
                    }
                    if (h || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), h && n.codecs(h)) {
                        l = s._src[d];
                        break
                    }
                }
                if (!l) {
                    s._emit("loaderror", null, "No codec support for selected audio sources.");
                    return
                }
                return s._src = l, s._state = "loading", window.location.protocol === "https:" && l.slice(0, 5) === "http:" && (s._html5 = !0, s._webAudio = !1), new o(s), s._webAudio && a(s), s
            },
            play: function(s, l) {
                var d = this,
                    h = null;
                if (typeof s == "number")
                    h = s,
                    s = null;
                else {
                    if (typeof s == "string" && d._state === "loaded" && !d._sprite[s])
                        return null;
                    if (typeof s > "u" && (s = "__default", !d._playLock)) {
                        for (var g = 0, y = 0; y < d._sounds.length; y++)
                            d._sounds[y]._paused && !d._sounds[y]._ended && (g++, h = d._sounds[y]._id);
                        g === 1 ? s = null : h = null
                    }
                }
                var p = h ? d._soundById(h) : d._inactiveSound();
                if (!p)
                    return null;
                if (h && !s && (s = p._sprite || "__default"), d._state !== "loaded") {
                    p._sprite = s,
                    p._ended = !1;
                    var m = p._id;
                    return d._queue.push({
                        event: "play",
                        action: function() {
                            d.play(m)
                        }
                    }), m
                }
                if (h && !p._paused)
                    return l || d._loadQueue("play"), p._id;
                d._webAudio && n._autoResume();
                var b = Math.max(0, p._seek > 0 ? p._seek : d._sprite[s][0] / 1e3),
                    T = Math.max(0, (d._sprite[s][0] + d._sprite[s][1]) / 1e3 - b),
                    E = T * 1e3 / Math.abs(p._rate),
                    P = d._sprite[s][0] / 1e3,
                    H = (d._sprite[s][0] + d._sprite[s][1]) / 1e3;
                p._sprite = s,
                p._ended = !1;
                var k = function() {
                    p._paused = !1,
                    p._seek = b,
                    p._start = P,
                    p._stop = H,
                    p._loop = !!(p._loop || d._sprite[s][2])
                };
                if (b >= H) {
                    d._ended(p);
                    return
                }
                var M = p._node;
                if (d._webAudio) {
                    var U = function() {
                        d._playLock = !1,
                        k(),
                        d._refreshBuffer(p);
                        var L = p._muted || d._muted ? 0 : p._volume;
                        M.gain.setValueAtTime(L, n.ctx.currentTime),
                        p._playStart = n.ctx.currentTime,
                        typeof M.bufferSource.start > "u" ? p._loop ? M.bufferSource.noteGrainOn(0, b, 86400) : M.bufferSource.noteGrainOn(0, b, T) : p._loop ? M.bufferSource.start(0, b, 86400) : M.bufferSource.start(0, b, T),
                        E !== 1 / 0 && (d._endTimers[p._id] = setTimeout(d._ended.bind(d, p), E)),
                        l || setTimeout(function() {
                            d._emit("play", p._id),
                            d._loadQueue()
                        }, 0)
                    };
                    n.state === "running" && n.ctx.state !== "interrupted" ? U() : (d._playLock = !0, d.once("resume", U), d._clearTimer(p._id))
                } else {
                    var W = function() {
                        M.currentTime = b,
                        M.muted = p._muted || d._muted || n._muted || M.muted,
                        M.volume = p._volume * n.volume(),
                        M.playbackRate = p._rate;
                        try {
                            var L = M.play();
                            if (L && typeof Promise < "u" && (L instanceof Promise || typeof L.then == "function") ? (d._playLock = !0, k(), L.then(function() {
                                d._playLock = !1,
                                M._unlocked = !0,
                                l ? d._loadQueue() : d._emit("play", p._id)
                            }).catch(function() {
                                d._playLock = !1,
                                d._emit("playerror", p._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),
                                p._ended = !0,
                                p._paused = !0
                            })) : l || (d._playLock = !1, k(), d._emit("play", p._id)), M.playbackRate = p._rate, M.paused) {
                                d._emit("playerror", p._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            s !== "__default" || p._loop ? d._endTimers[p._id] = setTimeout(d._ended.bind(d, p), E) : (d._endTimers[p._id] = function() {
                                d._ended(p),
                                M.removeEventListener("ended", d._endTimers[p._id], !1)
                            }, M.addEventListener("ended", d._endTimers[p._id], !1))
                        } catch (we) {
                            d._emit("playerror", p._id, we)
                        }
                    };
                    M.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (M.src = d._src, M.load());
                    var F = window && window.ejecta || !M.readyState && n._navigator.isCocoonJS;
                    if (M.readyState >= 3 || F)
                        W();
                    else {
                        d._playLock = !0,
                        d._state = "loading";
                        var X = function() {
                            d._state = "loaded",
                            W(),
                            M.removeEventListener(n._canPlayEvent, X, !1)
                        };
                        M.addEventListener(n._canPlayEvent, X, !1),
                        d._clearTimer(p._id)
                    }
                }
                return p._id
            },
            pause: function(s) {
                var l = this;
                if (l._state !== "loaded" || l._playLock)
                    return l._queue.push({
                        event: "pause",
                        action: function() {
                            l.pause(s)
                        }
                    }), l;
                for (var d = l._getSoundIds(s), h = 0; h < d.length; h++) {
                    l._clearTimer(d[h]);
                    var g = l._soundById(d[h]);
                    if (g && !g._paused && (g._seek = l.seek(d[h]), g._rateSeek = 0, g._paused = !0, l._stopFade(d[h]), g._node))
                        if (l._webAudio) {
                            if (!g._node.bufferSource)
                                continue;
                            typeof g._node.bufferSource.stop > "u" ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0),
                            l._cleanBuffer(g._node)
                        } else
                            (!isNaN(g._node.duration) || g._node.duration === 1 / 0) && g._node.pause();
                    arguments[1] || l._emit("pause", g ? g._id : null)
                }
                return l
            },
            stop: function(s, l) {
                var d = this;
                if (d._state !== "loaded" || d._playLock)
                    return d._queue.push({
                        event: "stop",
                        action: function() {
                            d.stop(s)
                        }
                    }), d;
                for (var h = d._getSoundIds(s), g = 0; g < h.length; g++) {
                    d._clearTimer(h[g]);
                    var y = d._soundById(h[g]);
                    y && (y._seek = y._start || 0, y._rateSeek = 0, y._paused = !0, y._ended = !0, d._stopFade(h[g]), y._node && (d._webAudio ? y._node.bufferSource && (typeof y._node.bufferSource.stop > "u" ? y._node.bufferSource.noteOff(0) : y._node.bufferSource.stop(0), d._cleanBuffer(y._node)) : (!isNaN(y._node.duration) || y._node.duration === 1 / 0) && (y._node.currentTime = y._start || 0, y._node.pause(), y._node.duration === 1 / 0 && d._clearSound(y._node))), l || d._emit("stop", y._id))
                }
                return d
            },
            mute: function(s, l) {
                var d = this;
                if (d._state !== "loaded" || d._playLock)
                    return d._queue.push({
                        event: "mute",
                        action: function() {
                            d.mute(s, l)
                        }
                    }), d;
                if (typeof l > "u")
                    if (typeof s == "boolean")
                        d._muted = s;
                    else
                        return d._muted;
                for (var h = d._getSoundIds(l), g = 0; g < h.length; g++) {
                    var y = d._soundById(h[g]);
                    y && (y._muted = s, y._interval && d._stopFade(y._id), d._webAudio && y._node ? y._node.gain.setValueAtTime(s ? 0 : y._volume, n.ctx.currentTime) : y._node && (y._node.muted = n._muted ? !0 : s), d._emit("mute", y._id))
                }
                return d
            },
            volume: function() {
                var s = this,
                    l = arguments,
                    d,
                    h;
                if (l.length === 0)
                    return s._volume;
                if (l.length === 1 || l.length === 2 && typeof l[1] > "u") {
                    var g = s._getSoundIds(),
                        y = g.indexOf(l[0]);
                    y >= 0 ? h = parseInt(l[0], 10) : d = parseFloat(l[0])
                } else
                    l.length >= 2 && (d = parseFloat(l[0]), h = parseInt(l[1], 10));
                var p;
                if (typeof d < "u" && d >= 0 && d <= 1) {
                    if (s._state !== "loaded" || s._playLock)
                        return s._queue.push({
                            event: "volume",
                            action: function() {
                                s.volume.apply(s, l)
                            }
                        }), s;
                    typeof h > "u" && (s._volume = d),
                    h = s._getSoundIds(h);
                    for (var m = 0; m < h.length; m++)
                        p = s._soundById(h[m]),
                        p && (p._volume = d, l[2] || s._stopFade(h[m]), s._webAudio && p._node && !p._muted ? p._node.gain.setValueAtTime(d, n.ctx.currentTime) : p._node && !p._muted && (p._node.volume = d * n.volume()), s._emit("volume", p._id))
                } else
                    return p = h ? s._soundById(h) : s._sounds[0], p ? p._volume : 0;
                return s
            },
            fade: function(s, l, d, h) {
                var g = this;
                if (g._state !== "loaded" || g._playLock)
                    return g._queue.push({
                        event: "fade",
                        action: function() {
                            g.fade(s, l, d, h)
                        }
                    }), g;
                s = Math.min(Math.max(0, parseFloat(s)), 1),
                l = Math.min(Math.max(0, parseFloat(l)), 1),
                d = parseFloat(d),
                g.volume(s, h);
                for (var y = g._getSoundIds(h), p = 0; p < y.length; p++) {
                    var m = g._soundById(y[p]);
                    if (m) {
                        if (h || g._stopFade(y[p]), g._webAudio && !m._muted) {
                            var b = n.ctx.currentTime,
                                T = b + d / 1e3;
                            m._volume = s,
                            m._node.gain.setValueAtTime(s, b),
                            m._node.gain.linearRampToValueAtTime(l, T)
                        }
                        g._startFadeInterval(m, s, l, d, y[p], typeof h > "u")
                    }
                }
                return g
            },
            _startFadeInterval: function(s, l, d, h, g, y) {
                var p = this,
                    m = l,
                    b = d - l,
                    T = Math.abs(b / .01),
                    E = Math.max(4, T > 0 ? h / T : h),
                    P = Date.now();
                s._fadeTo = d,
                s._interval = setInterval(function() {
                    var H = (Date.now() - P) / h;
                    P = Date.now(),
                    m += b * H,
                    m = Math.round(m * 100) / 100,
                    b < 0 ? m = Math.max(d, m) : m = Math.min(d, m),
                    p._webAudio ? s._volume = m : p.volume(m, s._id, !0),
                    y && (p._volume = m),
                    (d < l && m <= d || d > l && m >= d) && (clearInterval(s._interval), s._interval = null, s._fadeTo = null, p.volume(d, s._id), p._emit("fade", s._id))
                }, E)
            },
            _stopFade: function(s) {
                var l = this,
                    d = l._soundById(s);
                return d && d._interval && (l._webAudio && d._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(d._interval), d._interval = null, l.volume(d._fadeTo, s), d._fadeTo = null, l._emit("fade", s)), l
            },
            loop: function() {
                var s = this,
                    l = arguments,
                    d,
                    h,
                    g;
                if (l.length === 0)
                    return s._loop;
                if (l.length === 1)
                    if (typeof l[0] == "boolean")
                        d = l[0],
                        s._loop = d;
                    else
                        return g = s._soundById(parseInt(l[0], 10)), g ? g._loop : !1;
                else
                    l.length === 2 && (d = l[0], h = parseInt(l[1], 10));
                for (var y = s._getSoundIds(h), p = 0; p < y.length; p++)
                    g = s._soundById(y[p]),
                    g && (g._loop = d, s._webAudio && g._node && g._node.bufferSource && (g._node.bufferSource.loop = d, d && (g._node.bufferSource.loopStart = g._start || 0, g._node.bufferSource.loopEnd = g._stop, s.playing(y[p]) && (s.pause(y[p], !0), s.play(y[p], !0)))));
                return s
            },
            rate: function() {
                var s = this,
                    l = arguments,
                    d,
                    h;
                if (l.length === 0)
                    h = s._sounds[0]._id;
                else if (l.length === 1) {
                    var g = s._getSoundIds(),
                        y = g.indexOf(l[0]);
                    y >= 0 ? h = parseInt(l[0], 10) : d = parseFloat(l[0])
                } else
                    l.length === 2 && (d = parseFloat(l[0]), h = parseInt(l[1], 10));
                var p;
                if (typeof d == "number") {
                    if (s._state !== "loaded" || s._playLock)
                        return s._queue.push({
                            event: "rate",
                            action: function() {
                                s.rate.apply(s, l)
                            }
                        }), s;
                    typeof h > "u" && (s._rate = d),
                    h = s._getSoundIds(h);
                    for (var m = 0; m < h.length; m++)
                        if (p = s._soundById(h[m]), p) {
                            s.playing(h[m]) && (p._rateSeek = s.seek(h[m]), p._playStart = s._webAudio ? n.ctx.currentTime : p._playStart),
                            p._rate = d,
                            s._webAudio && p._node && p._node.bufferSource ? p._node.bufferSource.playbackRate.setValueAtTime(d, n.ctx.currentTime) : p._node && (p._node.playbackRate = d);
                            var b = s.seek(h[m]),
                                T = (s._sprite[p._sprite][0] + s._sprite[p._sprite][1]) / 1e3 - b,
                                E = T * 1e3 / Math.abs(p._rate);
                            (s._endTimers[h[m]] || !p._paused) && (s._clearTimer(h[m]), s._endTimers[h[m]] = setTimeout(s._ended.bind(s, p), E)),
                            s._emit("rate", p._id)
                        }
                } else
                    return p = s._soundById(h), p ? p._rate : s._rate;
                return s
            },
            seek: function() {
                var s = this,
                    l = arguments,
                    d,
                    h;
                if (l.length === 0)
                    s._sounds.length && (h = s._sounds[0]._id);
                else if (l.length === 1) {
                    var g = s._getSoundIds(),
                        y = g.indexOf(l[0]);
                    y >= 0 ? h = parseInt(l[0], 10) : s._sounds.length && (h = s._sounds[0]._id, d = parseFloat(l[0]))
                } else
                    l.length === 2 && (d = parseFloat(l[0]), h = parseInt(l[1], 10));
                if (typeof h > "u")
                    return 0;
                if (typeof d == "number" && (s._state !== "loaded" || s._playLock))
                    return s._queue.push({
                        event: "seek",
                        action: function() {
                            s.seek.apply(s, l)
                        }
                    }), s;
                var p = s._soundById(h);
                if (p)
                    if (typeof d == "number" && d >= 0) {
                        var m = s.playing(h);
                        m && s.pause(h, !0),
                        p._seek = d,
                        p._ended = !1,
                        s._clearTimer(h),
                        !s._webAudio && p._node && !isNaN(p._node.duration) && (p._node.currentTime = d);
                        var b = function() {
                            m && s.play(h, !0),
                            s._emit("seek", h)
                        };
                        if (m && !s._webAudio) {
                            var T = function() {
                                s._playLock ? setTimeout(T, 0) : b()
                            };
                            setTimeout(T, 0)
                        } else
                            b()
                    } else if (s._webAudio) {
                        var E = s.playing(h) ? n.ctx.currentTime - p._playStart : 0,
                            P = p._rateSeek ? p._rateSeek - p._seek : 0;
                        return p._seek + (P + E * Math.abs(p._rate))
                    } else
                        return p._node.currentTime;
                return s
            },
            playing: function(s) {
                var l = this;
                if (typeof s == "number") {
                    var d = l._soundById(s);
                    return d ? !d._paused : !1
                }
                for (var h = 0; h < l._sounds.length; h++)
                    if (!l._sounds[h]._paused)
                        return !0;
                return !1
            },
            duration: function(s) {
                var l = this,
                    d = l._duration,
                    h = l._soundById(s);
                return h && (d = l._sprite[h._sprite][1] / 1e3), d
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var s = this, l = s._sounds, d = 0; d < l.length; d++)
                    l[d]._paused || s.stop(l[d]._id),
                    s._webAudio || (s._clearSound(l[d]._node), l[d]._node.removeEventListener("error", l[d]._errorFn, !1), l[d]._node.removeEventListener(n._canPlayEvent, l[d]._loadFn, !1), l[d]._node.removeEventListener("ended", l[d]._endFn, !1), n._releaseHtml5Audio(l[d]._node)),
                    delete l[d]._node,
                    s._clearTimer(l[d]._id);
                var h = n._howls.indexOf(s);
                h >= 0 && n._howls.splice(h, 1);
                var g = !0;
                for (d = 0; d < n._howls.length; d++)
                    if (n._howls[d]._src === s._src || s._src.indexOf(n._howls[d]._src) >= 0) {
                        g = !1;
                        break
                    }
                return i && g && delete i[s._src], n.noAudio = !1, s._state = "unloaded", s._sounds = [], s = null, null
            },
            on: function(s, l, d, h) {
                var g = this,
                    y = g["_on" + s];
                return typeof l == "function" && y.push(h ? {
                    id: d,
                    fn: l,
                    once: h
                } : {
                    id: d,
                    fn: l
                }), g
            },
            off: function(s, l, d) {
                var h = this,
                    g = h["_on" + s],
                    y = 0;
                if (typeof l == "number" && (d = l, l = null), l || d)
                    for (y = 0; y < g.length; y++) {
                        var p = d === g[y].id;
                        if (l === g[y].fn && p || !l && p) {
                            g.splice(y, 1);
                            break
                        }
                    }
                else if (s)
                    h["_on" + s] = [];
                else {
                    var m = Object.keys(h);
                    for (y = 0; y < m.length; y++)
                        m[y].indexOf("_on") === 0 && Array.isArray(h[m[y]]) && (h[m[y]] = [])
                }
                return h
            },
            once: function(s, l, d) {
                var h = this;
                return h.on(s, l, d, 1), h
            },
            _emit: function(s, l, d) {
                for (var h = this, g = h["_on" + s], y = g.length - 1; y >= 0; y--)
                    (!g[y].id || g[y].id === l || s === "load") && (setTimeout(function(p) {
                        p.call(this, l, d)
                    }.bind(h, g[y].fn), 0), g[y].once && h.off(s, g[y].fn, g[y].id));
                return h._loadQueue(s), h
            },
            _loadQueue: function(s) {
                var l = this;
                if (l._queue.length > 0) {
                    var d = l._queue[0];
                    d.event === s && (l._queue.shift(), l._loadQueue()),
                    s || d.action()
                }
                return l
            },
            _ended: function(s) {
                var l = this,
                    d = s._sprite;
                if (!l._webAudio && s._node && !s._node.paused && !s._node.ended && s._node.currentTime < s._stop)
                    return setTimeout(l._ended.bind(l, s), 100), l;
                var h = !!(s._loop || l._sprite[d][2]);
                if (l._emit("end", s._id), !l._webAudio && h && l.stop(s._id, !0).play(s._id), l._webAudio && h) {
                    l._emit("play", s._id),
                    s._seek = s._start || 0,
                    s._rateSeek = 0,
                    s._playStart = n.ctx.currentTime;
                    var g = (s._stop - s._start) * 1e3 / Math.abs(s._rate);
                    l._endTimers[s._id] = setTimeout(l._ended.bind(l, s), g)
                }
                return l._webAudio && !h && (s._paused = !0, s._ended = !0, s._seek = s._start || 0, s._rateSeek = 0, l._clearTimer(s._id), l._cleanBuffer(s._node), n._autoSuspend()), !l._webAudio && !h && l.stop(s._id, !0), l
            },
            _clearTimer: function(s) {
                var l = this;
                if (l._endTimers[s]) {
                    if (typeof l._endTimers[s] != "function")
                        clearTimeout(l._endTimers[s]);
                    else {
                        var d = l._soundById(s);
                        d && d._node && d._node.removeEventListener("ended", l._endTimers[s], !1)
                    }
                    delete l._endTimers[s]
                }
                return l
            },
            _soundById: function(s) {
                for (var l = this, d = 0; d < l._sounds.length; d++)
                    if (s === l._sounds[d]._id)
                        return l._sounds[d];
                return null
            },
            _inactiveSound: function() {
                var s = this;
                s._drain();
                for (var l = 0; l < s._sounds.length; l++)
                    if (s._sounds[l]._ended)
                        return s._sounds[l].reset();
                return new o(s)
            },
            _drain: function() {
                var s = this,
                    l = s._pool,
                    d = 0,
                    h = 0;
                if (!(s._sounds.length < l)) {
                    for (h = 0; h < s._sounds.length; h++)
                        s._sounds[h]._ended && d++;
                    for (h = s._sounds.length - 1; h >= 0; h--) {
                        if (d <= l)
                            return;
                        s._sounds[h]._ended && (s._webAudio && s._sounds[h]._node && s._sounds[h]._node.disconnect(0), s._sounds.splice(h, 1), d--)
                    }
                }
            },
            _getSoundIds: function(s) {
                var l = this;
                if (typeof s > "u") {
                    for (var d = [], h = 0; h < l._sounds.length; h++)
                        d.push(l._sounds[h]._id);
                    return d
                } else
                    return [s]
            },
            _refreshBuffer: function(s) {
                var l = this;
                return s._node.bufferSource = n.ctx.createBufferSource(), s._node.bufferSource.buffer = i[l._src], s._panner ? s._node.bufferSource.connect(s._panner) : s._node.bufferSource.connect(s._node), s._node.bufferSource.loop = s._loop, s._loop && (s._node.bufferSource.loopStart = s._start || 0, s._node.bufferSource.loopEnd = s._stop || 0), s._node.bufferSource.playbackRate.setValueAtTime(s._rate, n.ctx.currentTime), l
            },
            _cleanBuffer: function(s) {
                var l = this,
                    d = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0;
                if (n._scratchBuffer && s.bufferSource && (s.bufferSource.onended = null, s.bufferSource.disconnect(0), d))
                    try {
                        s.bufferSource.buffer = n._scratchBuffer
                    } catch {}
                return s.bufferSource = null, l
            },
            _clearSound: function(s) {
                var l = /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent);
                l || (s.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
            }
        };
        var o = function(s) {
            this._parent = s,
            this.init()
        };
        o.prototype = {
            init: function() {
                var s = this,
                    l = s._parent;
                return s._muted = l._muted, s._loop = l._loop, s._volume = l._volume, s._rate = l._rate, s._seek = 0, s._paused = !0, s._ended = !0, s._sprite = "__default", s._id = ++n._counter, l._sounds.push(s), s.create(), s
            },
            create: function() {
                var s = this,
                    l = s._parent,
                    d = n._muted || s._muted || s._parent._muted ? 0 : s._volume;
                return l._webAudio ? (s._node = typeof n.ctx.createGain > "u" ? n.ctx.createGainNode() : n.ctx.createGain(), s._node.gain.setValueAtTime(d, n.ctx.currentTime), s._node.paused = !0, s._node.connect(n.masterGain)) : n.noAudio || (s._node = n._obtainHtml5Audio(), s._errorFn = s._errorListener.bind(s), s._node.addEventListener("error", s._errorFn, !1), s._loadFn = s._loadListener.bind(s), s._node.addEventListener(n._canPlayEvent, s._loadFn, !1), s._endFn = s._endListener.bind(s), s._node.addEventListener("ended", s._endFn, !1), s._node.src = l._src, s._node.preload = l._preload === !0 ? "auto" : l._preload, s._node.volume = d * n.volume(), s._node.load()), s
            },
            reset: function() {
                var s = this,
                    l = s._parent;
                return s._muted = l._muted, s._loop = l._loop, s._volume = l._volume, s._rate = l._rate, s._seek = 0, s._rateSeek = 0, s._paused = !0, s._ended = !0, s._sprite = "__default", s._id = ++n._counter, s
            },
            _errorListener: function() {
                var s = this;
                s._parent._emit("loaderror", s._id, s._node.error ? s._node.error.code : 0),
                s._node.removeEventListener("error", s._errorFn, !1)
            },
            _loadListener: function() {
                var s = this,
                    l = s._parent;
                l._duration = Math.ceil(s._node.duration * 10) / 10,
                Object.keys(l._sprite).length === 0 && (l._sprite = {
                    __default: [0, l._duration * 1e3]
                }),
                l._state !== "loaded" && (l._state = "loaded", l._emit("load"), l._loadQueue()),
                s._node.removeEventListener(n._canPlayEvent, s._loadFn, !1)
            },
            _endListener: function() {
                var s = this,
                    l = s._parent;
                l._duration === 1 / 0 && (l._duration = Math.ceil(s._node.duration * 10) / 10, l._sprite.__default[1] === 1 / 0 && (l._sprite.__default[1] = l._duration * 1e3), l._ended(s)),
                s._node.removeEventListener("ended", s._endFn, !1)
            }
        };
        var i = {},
            a = function(s) {
                var l = s._src;
                if (i[l]) {
                    s._duration = i[l].duration,
                    f(s);
                    return
                }
                if (/^data:[^;]+;base64,/.test(l)) {
                    for (var d = atob(l.split(",")[1]), h = new Uint8Array(d.length), g = 0; g < d.length; ++g)
                        h[g] = d.charCodeAt(g);
                    u(h.buffer, s)
                } else {
                    var y = new XMLHttpRequest;
                    y.open(s._xhr.method, l, !0),
                    y.withCredentials = s._xhr.withCredentials,
                    y.responseType = "arraybuffer",
                    s._xhr.headers && Object.keys(s._xhr.headers).forEach(function(p) {
                        y.setRequestHeader(p, s._xhr.headers[p])
                    }),
                    y.onload = function() {
                        var p = (y.status + "")[0];
                        if (p !== "0" && p !== "2" && p !== "3") {
                            s._emit("loaderror", null, "Failed loading audio file with status: " + y.status + ".");
                            return
                        }
                        u(y.response, s)
                    },
                    y.onerror = function() {
                        s._webAudio && (s._html5 = !0, s._webAudio = !1, s._sounds = [], delete i[l], s.load())
                    },
                    c(y)
                }
            },
            c = function(s) {
                try {
                    s.send()
                } catch {
                    s.onerror()
                }
            },
            u = function(s, l) {
                var d = function() {
                        l._emit("loaderror", null, "Decoding audio data failed.")
                    },
                    h = function(g) {
                        g && l._sounds.length > 0 ? (i[l._src] = g, f(l, g)) : d()
                    };
                typeof Promise < "u" && n.ctx.decodeAudioData.length === 1 ? n.ctx.decodeAudioData(s).then(h).catch(d) : n.ctx.decodeAudioData(s, h, d)
            },
            f = function(s, l) {
                l && !s._duration && (s._duration = l.duration),
                Object.keys(s._sprite).length === 0 && (s._sprite = {
                    __default: [0, s._duration * 1e3]
                }),
                s._state !== "loaded" && (s._state = "loaded", s._emit("load"), s._loadQueue())
            },
            _ = function() {
                if (n.usingWebAudio) {
                    try {
                        typeof AudioContext < "u" ? n.ctx = new AudioContext : typeof webkitAudioContext < "u" ? n.ctx = new webkitAudioContext : n.usingWebAudio = !1
                    } catch {
                        n.usingWebAudio = !1
                    }
                    n.ctx || (n.usingWebAudio = !1);
                    var s = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
                        l = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                        d = l ? parseInt(l[1], 10) : null;
                    if (s && d && d < 9) {
                        var h = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());
                        n._navigator && !h && (n.usingWebAudio = !1)
                    }
                    n.usingWebAudio && (n.masterGain = typeof n.ctx.createGain > "u" ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.setValueAtTime(n._muted ? 0 : n._volume, n.ctx.currentTime), n.masterGain.connect(n.ctx.destination)),
                    n._setup()
                }
            };
        e.Howler = n,
        e.Howl = r,
        typeof $n < "u" ? ($n.HowlerGlobal = t, $n.Howler = n, $n.Howl = r, $n.Sound = o) : typeof window < "u" && (window.HowlerGlobal = t, window.Howler = n, window.Howl = r, window.Sound = o)
    })(); /*!
     *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
     *  
     *  howler.js v2.2.3
     *  howlerjs.com
     *
     *  (c) 2013-2020, James Simpson of GoldFire Studios
     *  goldfirestudios.com
     *
     *  MIT License
     */









    (function() {
        HowlerGlobal.prototype._pos = [0, 0, 0],
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0],
        HowlerGlobal.prototype.stereo = function(n) {
            var r = this;
            if (!r.ctx || !r.ctx.listener)
                return r;
            for (var o = r._howls.length - 1; o >= 0; o--)
                r._howls[o].stereo(n);
            return r
        },
        HowlerGlobal.prototype.pos = function(n, r, o) {
            var i = this;
            if (!i.ctx || !i.ctx.listener)
                return i;
            if (r = typeof r != "number" ? i._pos[1] : r, o = typeof o != "number" ? i._pos[2] : o, typeof n == "number")
                i._pos = [n, r, o],
                typeof i.ctx.listener.positionX < "u" ? (i.ctx.listener.positionX.setTargetAtTime(i._pos[0], Howler.ctx.currentTime, .1), i.ctx.listener.positionY.setTargetAtTime(i._pos[1], Howler.ctx.currentTime, .1), i.ctx.listener.positionZ.setTargetAtTime(i._pos[2], Howler.ctx.currentTime, .1)) : i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2]);
            else
                return i._pos;
            return i
        },
        HowlerGlobal.prototype.orientation = function(n, r, o, i, a, c) {
            var u = this;
            if (!u.ctx || !u.ctx.listener)
                return u;
            var f = u._orientation;
            if (r = typeof r != "number" ? f[1] : r, o = typeof o != "number" ? f[2] : o, i = typeof i != "number" ? f[3] : i, a = typeof a != "number" ? f[4] : a, c = typeof c != "number" ? f[5] : c, typeof n == "number")
                u._orientation = [n, r, o, i, a, c],
                typeof u.ctx.listener.forwardX < "u" ? (u.ctx.listener.forwardX.setTargetAtTime(n, Howler.ctx.currentTime, .1), u.ctx.listener.forwardY.setTargetAtTime(r, Howler.ctx.currentTime, .1), u.ctx.listener.forwardZ.setTargetAtTime(o, Howler.ctx.currentTime, .1), u.ctx.listener.upX.setTargetAtTime(i, Howler.ctx.currentTime, .1), u.ctx.listener.upY.setTargetAtTime(a, Howler.ctx.currentTime, .1), u.ctx.listener.upZ.setTargetAtTime(c, Howler.ctx.currentTime, .1)) : u.ctx.listener.setOrientation(n, r, o, i, a, c);
            else
                return f;
            return u
        },
        Howl.prototype.init = function(n) {
            return function(r) {
                var o = this;
                return o._orientation = r.orientation || [1, 0, 0], o._stereo = r.stereo || null, o._pos = r.pos || null, o._pannerAttr = {
                    coneInnerAngle: typeof r.coneInnerAngle < "u" ? r.coneInnerAngle : 360,
                    coneOuterAngle: typeof r.coneOuterAngle < "u" ? r.coneOuterAngle : 360,
                    coneOuterGain: typeof r.coneOuterGain < "u" ? r.coneOuterGain : 0,
                    distanceModel: typeof r.distanceModel < "u" ? r.distanceModel : "inverse",
                    maxDistance: typeof r.maxDistance < "u" ? r.maxDistance : 1e4,
                    panningModel: typeof r.panningModel < "u" ? r.panningModel : "HRTF",
                    refDistance: typeof r.refDistance < "u" ? r.refDistance : 1,
                    rolloffFactor: typeof r.rolloffFactor < "u" ? r.rolloffFactor : 1
                }, o._onstereo = r.onstereo ? [{
                    fn: r.onstereo
                }] : [], o._onpos = r.onpos ? [{
                    fn: r.onpos
                }] : [], o._onorientation = r.onorientation ? [{
                    fn: r.onorientation
                }] : [], n.call(this, r)
            }
        }(Howl.prototype.init),
        Howl.prototype.stereo = function(n, r) {
            var o = this;
            if (!o._webAudio)
                return o;
            if (o._state !== "loaded")
                return o._queue.push({
                    event: "stereo",
                    action: function() {
                        o.stereo(n, r)
                    }
                }), o;
            var i = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
            if (typeof r > "u")
                if (typeof n == "number")
                    o._stereo = n,
                    o._pos = [n, 0, 0];
                else
                    return o._stereo;
            for (var a = o._getSoundIds(r), c = 0; c < a.length; c++) {
                var u = o._soundById(a[c]);
                if (u)
                    if (typeof n == "number")
                        u._stereo = n,
                        u._pos = [n, 0, 0],
                        u._node && (u._pannerAttr.panningModel = "equalpower", (!u._panner || !u._panner.pan) && t(u, i), i === "spatial" ? typeof u._panner.positionX < "u" ? (u._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), u._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : u._panner.setPosition(n, 0, 0) : u._panner.pan.setValueAtTime(n, Howler.ctx.currentTime)),
                        o._emit("stereo", u._id);
                    else
                        return u._stereo
            }
            return o
        },
        Howl.prototype.pos = function(n, r, o, i) {
            var a = this;
            if (!a._webAudio)
                return a;
            if (a._state !== "loaded")
                return a._queue.push({
                    event: "pos",
                    action: function() {
                        a.pos(n, r, o, i)
                    }
                }), a;
            if (r = typeof r != "number" ? 0 : r, o = typeof o != "number" ? -.5 : o, typeof i > "u")
                if (typeof n == "number")
                    a._pos = [n, r, o];
                else
                    return a._pos;
            for (var c = a._getSoundIds(i), u = 0; u < c.length; u++) {
                var f = a._soundById(c[u]);
                if (f)
                    if (typeof n == "number")
                        f._pos = [n, r, o],
                        f._node && ((!f._panner || f._panner.pan) && t(f, "spatial"), typeof f._panner.positionX < "u" ? (f._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), f._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime), f._panner.positionZ.setValueAtTime(o, Howler.ctx.currentTime)) : f._panner.setPosition(n, r, o)),
                        a._emit("pos", f._id);
                    else
                        return f._pos
            }
            return a
        },
        Howl.prototype.orientation = function(n, r, o, i) {
            var a = this;
            if (!a._webAudio)
                return a;
            if (a._state !== "loaded")
                return a._queue.push({
                    event: "orientation",
                    action: function() {
                        a.orientation(n, r, o, i)
                    }
                }), a;
            if (r = typeof r != "number" ? a._orientation[1] : r, o = typeof o != "number" ? a._orientation[2] : o, typeof i > "u")
                if (typeof n == "number")
                    a._orientation = [n, r, o];
                else
                    return a._orientation;
            for (var c = a._getSoundIds(i), u = 0; u < c.length; u++) {
                var f = a._soundById(c[u]);
                if (f)
                    if (typeof n == "number")
                        f._orientation = [n, r, o],
                        f._node && (f._panner || (f._pos || (f._pos = a._pos || [0, 0, -.5]), t(f, "spatial")), typeof f._panner.orientationX < "u" ? (f._panner.orientationX.setValueAtTime(n, Howler.ctx.currentTime), f._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime), f._panner.orientationZ.setValueAtTime(o, Howler.ctx.currentTime)) : f._panner.setOrientation(n, r, o)),
                        a._emit("orientation", f._id);
                    else
                        return f._orientation
            }
            return a
        },
        Howl.prototype.pannerAttr = function() {
            var n = this,
                r = arguments,
                o,
                i,
                a;
            if (!n._webAudio)
                return n;
            if (r.length === 0)
                return n._pannerAttr;
            if (r.length === 1)
                if (typeof r[0] == "object")
                    o = r[0],
                    typeof i > "u" && (o.pannerAttr || (o.pannerAttr = {
                        coneInnerAngle: o.coneInnerAngle,
                        coneOuterAngle: o.coneOuterAngle,
                        coneOuterGain: o.coneOuterGain,
                        distanceModel: o.distanceModel,
                        maxDistance: o.maxDistance,
                        refDistance: o.refDistance,
                        rolloffFactor: o.rolloffFactor,
                        panningModel: o.panningModel
                    }), n._pannerAttr = {
                        coneInnerAngle: typeof o.pannerAttr.coneInnerAngle < "u" ? o.pannerAttr.coneInnerAngle : n._coneInnerAngle,
                        coneOuterAngle: typeof o.pannerAttr.coneOuterAngle < "u" ? o.pannerAttr.coneOuterAngle : n._coneOuterAngle,
                        coneOuterGain: typeof o.pannerAttr.coneOuterGain < "u" ? o.pannerAttr.coneOuterGain : n._coneOuterGain,
                        distanceModel: typeof o.pannerAttr.distanceModel < "u" ? o.pannerAttr.distanceModel : n._distanceModel,
                        maxDistance: typeof o.pannerAttr.maxDistance < "u" ? o.pannerAttr.maxDistance : n._maxDistance,
                        refDistance: typeof o.pannerAttr.refDistance < "u" ? o.pannerAttr.refDistance : n._refDistance,
                        rolloffFactor: typeof o.pannerAttr.rolloffFactor < "u" ? o.pannerAttr.rolloffFactor : n._rolloffFactor,
                        panningModel: typeof o.pannerAttr.panningModel < "u" ? o.pannerAttr.panningModel : n._panningModel
                    });
                else
                    return a = n._soundById(parseInt(r[0], 10)), a ? a._pannerAttr : n._pannerAttr;
            else
                r.length === 2 && (o = r[0], i = parseInt(r[1], 10));
            for (var c = n._getSoundIds(i), u = 0; u < c.length; u++)
                if (a = n._soundById(c[u]), a) {
                    var f = a._pannerAttr;
                    f = {
                        coneInnerAngle: typeof o.coneInnerAngle < "u" ? o.coneInnerAngle : f.coneInnerAngle,
                        coneOuterAngle: typeof o.coneOuterAngle < "u" ? o.coneOuterAngle : f.coneOuterAngle,
                        coneOuterGain: typeof o.coneOuterGain < "u" ? o.coneOuterGain : f.coneOuterGain,
                        distanceModel: typeof o.distanceModel < "u" ? o.distanceModel : f.distanceModel,
                        maxDistance: typeof o.maxDistance < "u" ? o.maxDistance : f.maxDistance,
                        refDistance: typeof o.refDistance < "u" ? o.refDistance : f.refDistance,
                        rolloffFactor: typeof o.rolloffFactor < "u" ? o.rolloffFactor : f.rolloffFactor,
                        panningModel: typeof o.panningModel < "u" ? o.panningModel : f.panningModel
                    };
                    var _ = a._panner;
                    _ ? (_.coneInnerAngle = f.coneInnerAngle, _.coneOuterAngle = f.coneOuterAngle, _.coneOuterGain = f.coneOuterGain, _.distanceModel = f.distanceModel, _.maxDistance = f.maxDistance, _.refDistance = f.refDistance, _.rolloffFactor = f.rolloffFactor, _.panningModel = f.panningModel) : (a._pos || (a._pos = n._pos || [0, 0, -.5]), t(a, "spatial"))
                }
            return n
        },
        Sound.prototype.init = function(n) {
            return function() {
                var r = this,
                    o = r._parent;
                r._orientation = o._orientation,
                r._stereo = o._stereo,
                r._pos = o._pos,
                r._pannerAttr = o._pannerAttr,
                n.call(this),
                r._stereo ? o.stereo(r._stereo) : r._pos && o.pos(r._pos[0], r._pos[1], r._pos[2], r._id)
            }
        }(Sound.prototype.init),
        Sound.prototype.reset = function(n) {
            return function() {
                var r = this,
                    o = r._parent;
                return r._orientation = o._orientation, r._stereo = o._stereo, r._pos = o._pos, r._pannerAttr = o._pannerAttr, r._stereo ? o.stereo(r._stereo) : r._pos ? o.pos(r._pos[0], r._pos[1], r._pos[2], r._id) : r._panner && (r._panner.disconnect(0), r._panner = void 0, o._refreshBuffer(r)), n.call(this)
            }
        }(Sound.prototype.reset);
        var t = function(n, r) {
            r = r || "spatial",
            r === "spatial" ? (n._panner = Howler.ctx.createPanner(), n._panner.coneInnerAngle = n._pannerAttr.coneInnerAngle, n._panner.coneOuterAngle = n._pannerAttr.coneOuterAngle, n._panner.coneOuterGain = n._pannerAttr.coneOuterGain, n._panner.distanceModel = n._pannerAttr.distanceModel, n._panner.maxDistance = n._pannerAttr.maxDistance, n._panner.refDistance = n._pannerAttr.refDistance, n._panner.rolloffFactor = n._pannerAttr.rolloffFactor, n._panner.panningModel = n._pannerAttr.panningModel, typeof n._panner.positionX < "u" ? (n._panner.positionX.setValueAtTime(n._pos[0], Howler.ctx.currentTime), n._panner.positionY.setValueAtTime(n._pos[1], Howler.ctx.currentTime), n._panner.positionZ.setValueAtTime(n._pos[2], Howler.ctx.currentTime)) : n._panner.setPosition(n._pos[0], n._pos[1], n._pos[2]), typeof n._panner.orientationX < "u" ? (n._panner.orientationX.setValueAtTime(n._orientation[0], Howler.ctx.currentTime), n._panner.orientationY.setValueAtTime(n._orientation[1], Howler.ctx.currentTime), n._panner.orientationZ.setValueAtTime(n._orientation[2], Howler.ctx.currentTime)) : n._panner.setOrientation(n._orientation[0], n._orientation[1], n._orientation[2])) : (n._panner = Howler.ctx.createStereoPanner(), n._panner.pan.setValueAtTime(n._stereo, Howler.ctx.currentTime)),
            n._panner.connect(n._node),
            n._paused || n._parent.pause(n._id, !0).play(n._id, !0)
        }
    })()
})(ct);
const Ft = 300,
    Ie = 150,
    N_ = tt(e => {
        const t = z(null),
            n = z(null),
            r = z(!1),
            o = z(null),
            i = z(null),
            a = z(null),
            c = z(3);
        let u = !1;
        const f = z(new Array({
                start: 3,
                end: 6
            }, {
                start: 6,
                end: 28
            }, {
                start: 28,
                end: 54
            })),
            _ = z(0),
            s = z([]),
            l = z([]),
            d = z(""),
            h = sn(),
            g = z(!1),
            y = new Map;
        let p = {
                canvas: null,
                ctx: null,
                threshold: {
                    dom: null,
                    value: .5
                },
                force: {
                    dom: null,
                    value: 1.3
                },
                size: {
                    width: Ft,
                    height: Ie
                }
            },
            m = !1,
            b = !0;
        for (let N = 0; N < c.value; N++)
            s.value.push(1),
            l.value.push(1);
        const T = () => {
                a.value || (a.value = ct.Howler.ctx.createAnalyser(), ct.Howler.masterGain.connect(a.value), a.value.connect(ct.Howler.ctx.destination), a.value.fftSize = Math.pow(2, 8))
            },
            E = async N => {
                var at;
                if (d.value && N === d.value.slug)
                    return console.warn("same slug being used", N);
                const Te = await se(N),
                    me = await se("default"),
                    Ae = (at = d.value) == null ? void 0 : at.src;
                if (Te.mp3 ? d.value = {
                    slug: N,
                    src: Te.mp3,
                    start: parseInt(Te.loop_start) || 0,
                    end: parseInt(Te.loop_end) || 99999999,
                    volume: parseInt(Te.volume) / 100 || 1
                } : d.value = {
                    slug: "default",
                    src: me.mp3,
                    start: parseInt(me.loop_start) || 0,
                    end: parseInt(me.loop_end) || 99999999,
                    volume: parseInt(me.volume) / 100 || 1
                }, !d.value)
                    return fe(), console.warn("no source linked");
                if (Ae === d.value.src)
                    return console.warn("Same src being used", Ae);
                if (!t.value)
                    return console.warn("no sound linked");
                if (u && m && (r.value = !0), !r.value)
                    return t.value = L(d.value), console.warn("Not playing, loopable sound created");
                if (r.value && t.value)
                    return n.value = L(d.value), ct.Howler.ctx.state !== "running" ? void 0 : (n.value.current.play(), n.value.current.fade(0, n.value.volume, 1500), t.value.current.fade(t.value.current._volume, 0, 1500), setTimeout(() => {
                        t.value.current.stop(),
                        t.value.swap.stop(),
                        t.value = n.value
                    }, 1500), console.warn("Sounds crossfade"))
            },
            P = () => {
                p.canvas = document.createElement("canvas"),
                p.ctx = p.canvas.getContext("2d"),
                p.canvas.width = Ft,
                p.canvas.height = Ie,
                p.canvas.style.position = "fixed",
                p.canvas.style.top = "0",
                p.canvas.style.left = "0",
                p.canvas.style.zIndex = "99999",
                p.canvas.style.pointerEvents = "none",
                p.threshold.dom = document.createElement("input"),
                p.threshold.dom.type = "range",
                p.threshold.dom.style.position = "fixed",
                p.threshold.dom.style.top = "150px",
                p.threshold.dom.style.width = "300px",
                p.threshold.dom.style.left = "0",
                p.threshold.dom.style.zIndex = "99999",
                p.threshold.dom.value = p.threshold.value * 100,
                p.threshold.dom.addEventListener("input", N => {
                    p.threshold.value = parseInt(N.target.value) / 100
                }),
                p.force.dom = document.createElement("input"),
                p.force.dom.type = "range",
                p.force.dom.style.position = "fixed",
                p.force.dom.style.top = "200px",
                p.force.dom.style.width = "300px",
                p.force.dom.style.left = "0",
                p.force.dom.style.zIndex = "99999",
                p.force.dom.value = p.force.value * 10,
                p.force.dom.addEventListener("input", N => {
                    p.force.value = parseInt(N.target.value) / 10
                })
            },
            H = () => {
                o.value = new Uo({
                    fps: 60
                }),
                i.value = new Uo({
                    fps: 24
                }),
                o.value.add(k),
                i.value.add(U),
                setInterval(M, 10),
                new ct.Howl({
                    src: "/sounds/silence.mp3"
                }).play(),
                P()
            },
            k = () => {
                for (let N = 0; N < c.value; N++)
                    s.value[N] = co.lerp(s.value[N], l.value[N], .5)
            },
            M = () => {
                var N;
                t.value && r.value && ((N = t.value.current) == null ? void 0 : N.seek()) * 1e3 > t.value.loopEnd && X(t.value)
            },
            U = () => {
                const N = p.threshold.value;
                if (r.value) {
                    const me = a.value.fftSize * .25,
                        Ae = new Uint8Array(me);
                    a.value.getByteFrequencyData(Ae),
                    p.canvas && (p.ctx.fillStyle = "rgb(200, 200, 200)", p.ctx.fillRect(0, 0, Ft, Ie), p.ctx.save());
                    const at = Ft / me * 2.5;
                    let je;
                    f.value.forEach((S, j) => {
                        const D = Ae.slice(S.start, S.end);
                        let q = Ie,
                            re = -255;
                        p.ctx.fillStyle = "rgb(255, 0, 0)",
                        D.forEach((w, A) => {
                            je = w / 255,
                            p.ctx.fillRect((S.start + A) / me * Ft, Ie - je * Ie, at, Ie * 10),
                            je > N && (je *= p.force.value),
                            q > Ie - je * Ie && (q = Ie - je * Ie),
                            je > re && (re = je)
                        }),
                        l.value[j] = co.clamp(co.mapLinear(re, 0, 1, .35, 1), 0, 1);
                        const ge = S.start / me * Ft,
                            te = (S.end + 1) / me * Ft,
                            v = ge + (te - ge) / 2;
                        p.canvas && (p.ctx.save(), p.ctx.font = "12px Arial", p.ctx.fillText(j, v, 20), p.ctx.fillText(S.start / me * 48e3 / 4 + "hz", v - 10, 20 + 20), p.ctx.fillText(S.end / me * 48e3 / 4 + "hz", v - 10, 20 + 40), p.ctx.beginPath(), p.ctx.moveTo(ge, q), p.ctx.lineTo(te, q), p.ctx.strokeStyle = "rgb(0, 0, 255)", p.ctx.stroke(), p.ctx.restore())
                    }),
                    p.canvas && (p.ctx.beginPath(), p.ctx.moveTo(0, Ie - Ie * N), p.ctx.lineTo(Ft, Ie - Ie * N), p.ctx.strokeStyle = "rgb(0, 255, 0)", p.ctx.stroke(), p.ctx.restore())
                } else
                    for (let Te = 0; Te < c.value; Te++)
                        l.value[Te] = 1
            },
            W = () => {
                var N;
                !ct.Howler.ctx || ct.Howler.ctx && ((N = ct.Howler.ctx) == null ? void 0 : N.state) !== "running" || F()
            },
            F = () => {
                b && (r.value ? fe() : we(), m = r.value, r.value && d.value && d.value.slug === "default" ? g.value = !0 : g.value = !1)
            },
            X = N => {
                N.isLooping || (N.swap.fade(0, N.volume, 100), N.swap.seek(N.loopStart / 1e3), N.swap.play(), setTimeout(() => {
                    N.current.fade(N.volume, 0, 100),
                    setTimeout(() => {
                        N.current.pause();
                        const me = N.current;
                        N.current = N.swap,
                        N.swap = me,
                        N.isLooping = !1
                    }, 100)
                }, 100 / 2), N.isLooping = !0)
            },
            L = N => ({
                current: new ct.Howl({
                    src: [N.src],
                    loop: !1,
                    volume: N.volume
                }),
                swap: new ct.Howl({
                    src: [N.src],
                    loop: !1,
                    volume: N.volume
                }),
                loopStart: N.start,
                loopEnd: N.end,
                isStart: !0,
                isLooping: !1,
                volume: N.volume
            }),
            we = async (N="default") => {
                d.value && (b = !1, r.value = !0, t.value || (t.value = L(d.value), T()), t.value.current.play(), t.value.current.fade(0, t.value.volume, 500), setTimeout(() => {
                    b = !0
                }, 500))
            },
            se = async N => {
                const Te = y.get(N);
                if (Te)
                    return Te;
                const Ae = await (await fetch(h.public.apiSound + "?page=" + N)).json();
                return y.set(N, Ae), Ae
            },
            fe = () => {
                b = !1,
                r.value = !1,
                !(!t.value || !t.value.current) && (t.value.current.fade(t.value.current._volume, 0, 1e3), setTimeout(() => {
                    t.value.current.pause(),
                    b = !0
                }, 1e3))
            },
            de = N => {
                u = N
            };
        return e.hook("app:beforeMount", () => {
            H()
        }), {
            provide: {
                sound: {
                    playing: r,
                    play: we,
                    pause: fe,
                    toggle: F,
                    autoToggle: W,
                    setSource: E,
                    setMediaStatus: de,
                    frequencies: s,
                    frequency: _,
                    range: c
                }
            }
        }
    }),
    j_ = tt(e => {
        const t = z(document.documentElement.clientWidth),
            n = z(document.documentElement.clientHeight),
            r = new Map,
            o = new Map,
            i = (d=() => {}) => {
                r.set(d, d)
            },
            a = (d=() => {}) => {
                r.delete(d, d),
                o.delete(d, d)
            },
            c = (d=() => {}) => {
                o.set(d, d)
            },
            u = () => {
                f()
            },
            f = () => {
                t.value = document.documentElement.clientWidth,
                n.value = document.documentElement.clientHeight,
                r.forEach(d => {
                    d({
                        width: t.value,
                        height: n.value
                    })
                }),
                l(),
                document.documentElement.style.setProperty("--app-height", `${n.value}px`),
                e.$emit("resize", {
                    width: t.value,
                    height: t.value
                })
            },
            l = ((d, h, g) => {
                let y;
                return function() {
                    let p = this,
                        m = arguments,
                        b = function() {
                            y = null,
                            g || d.apply(p, m)
                        },
                        T = g && !y;
                    clearTimeout(y),
                    y = setTimeout(b, h),
                    T && d.apply(p, m)
                }
            })(() => {
                o.forEach(d => {
                    d({
                        width: t.value,
                        height: n.value
                    })
                }),
                e.$emit("resize-debounce", {
                    width: t.value,
                    height: n.value
                })
            }, 400);
        return f(), e.hook("app:beforeMount", () => {
            window.addEventListener("resize", f, !1)
        }), {
            provide: {
                viewport: {
                    width: t,
                    height: n,
                    add: i,
                    remove: a,
                    debounce: c,
                    trigger: u
                }
            }
        }
    }),
    V_ = [wd, yp, jh, Vh, f_, d_, p_, g_, y_, b_, N_, j_];
const U_ = ["innerHTML"],
    ar = {
        __name: "CText",
        props: {
            tag: {
                type: String,
                default: "span",
                required: !1
            },
            type: {
                type: String,
                default: "",
                required: !1
            },
            uppercase: {
                type: Boolean,
                default: !1,
                required: !1
            },
            bold: {
                type: Boolean,
                default: !1,
                required: !1
            },
            html: {
                type: String,
                default: "",
                required: !1
            }
        },
        setup(e) {
            const t = e,
                n = le(() => ["CText", t.type, {
                    "CText--uppercase": t.uppercase,
                    "CText--bold": t.bold
                }]);
            return (r, o) => e.html ? (oe(), Ee("div", {
                key: 1,
                class: vt(ne(n)),
                innerHTML: e.html
            }, null, 10, U_)) : (oe(), Qe($a(e.tag), {
                key: 0,
                class: vt(ne(n))
            }, {
                default: ee(() => [un(r.$slots, "default")]),
                _: 3
            }, 8, ["class"]))
        }
    };
const W_ = {
        key: 0,
        class: "Loader"
    },
    K_ = pe("div", {
        class: "Loader__fold"
    }, null, -1),
    q_ = {
        key: 0,
        class: "Loader__pourcent"
    },
    z_ = {
        __name: "Loader",
        props: {
            autoShow: {
                type: Boolean,
                default: !0
            }
        },
        setup(e) {
            const t = e,
                n = ue(),
                r = z(!0),
                o = z(t.autoShow),
                i = z(0),
                a = z(0),
                c = z(!0),
                u = z(!1),
                f = z(null),
                _ = le(() => i.value.toString().split(""));
            it(() => {
                n.$on("loader-show", s),
                n.$on("loader-hide", d)
            }),
            wt(() => {
                n.$off("loader-show", s),
                n.$off("loader-hide", d)
            });
            const s = (p=null) => {
                    o.value = !0,
                    u.value = !1,
                    p && (f.value = p)
                },
                l = () => {
                    document.body.classList.add("no-scroll");
                    const p = setInterval(() => {
                        a.value++,
                        a.value < 2 ? i.value += i.value > 90 ? 99 - i.value : Math.round(Math.random() * (99 - i.value)) : i.value = 99,
                        i.value === 99 && (clearInterval(p), a.value = 0, setTimeout(() => {
                            r.value = !1,
                            setTimeout(() => {
                                d()
                            }, 10)
                        }, 1200))
                    }, 1200)
                },
                d = () => {
                    u.value = !0,
                    c.value && !r.value ? (o.value = !1, n.$viewport.trigger(), setTimeout(() => {
                        n.$emit("loader-end")
                    }, 10)) : c.value && r.value && l()
                },
                h = () => {
                    c.value = !0,
                    f.value && f.value(),
                    u.value && d(),
                    n.$emit("loader-transition-end")
                },
                g = () => {
                    c.value = !1,
                    document.body.classList.add("no-scroll")
                },
                y = () => {
                    document.body.classList.remove("no-scroll")
                };
            return (p, m) => {
                const b = ar;
                return oe(), Qe(kt, {
                    name: "Loader__transition",
                    mode: "out-in",
                    appear: "",
                    onBeforeEnter: g,
                    onAfterEnter: h,
                    onAfterLeave: y
                }, {
                    default: ee(() => [ne(o) ? (oe(), Ee("div", W_, [K_, B(kt, {
                        name: "slide"
                    }, {
                        default: ee(() => [ne(r) ? (oe(), Ee("div", q_, [(oe(!0), Ee(Re, null, ds(ne(_), (T, E) => (oe(), Ee("div", {
                            class: "Loader__pourcent__container",
                            key: E
                        }, [B(kt, {
                            name: "slide-group",
                            appear: ""
                        }, {
                            default: ee(() => [(oe(), Qe(b, {
                                class: "Loader__pourcent__container__value",
                                key: T,
                                type: "heading--1"
                            }, {
                                default: ee(() => [xe(uo(T), 1)]),
                                _: 2
                            }, 1024))]),
                            _: 2
                        }, 1024)]))), 128))])) : Nt("", !0)]),
                        _: 1
                    })])) : Nt("", !0)]),
                    _: 1
                })
            }
        }
    };
const Z_ = Ou('<svg class="PressPlayOnTape__word PressPlayOnTape__word--press" width="54" height="15" viewBox="0 0 54 15" preserveAspectRatio="xMinYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8012 13.179H14.5192V9.06362H16.1622C17.3293 9.06362 17.8514 9.61643 17.9896 10.6299C18.1585 11.7202 18.1124 13.01 18.4042 13.179H21.0453V13.0408C20.6615 12.9026 20.815 11.5205 20.5847 10.0771C20.4311 8.98685 19.9397 8.38797 18.9877 8.0655V8.01944C20.2622 7.57412 20.8918 6.63742 20.8918 5.3629C20.8918 3.32059 19.2334 2.19962 17.0529 2.19962H11.8012V13.179ZM14.5192 7.05203V4.34942H16.6229C17.6671 4.34942 18.1892 4.91758 18.1892 5.71608C18.1892 6.54529 17.6364 7.05203 16.5615 7.05203H14.5192Z"></path><path d="M22.1033 13.179H30.5183V10.8756H24.8213V8.52618H29.6276V6.40709H24.8213V4.44156H30.4261V2.19962H22.1033V13.179Z"></path><path d="M36.047 13.44C38.5807 13.44 40.5463 12.1655 40.5463 9.86212C40.5463 7.5127 38.7036 6.88311 36.6613 6.40709C35.0182 6.03855 34.1736 5.85428 34.1736 5.0865C34.1736 4.47227 34.8032 4.05766 35.7553 4.05766C36.7687 4.05766 37.4137 4.53369 37.5212 5.37826H40.1777C40.0702 3.0749 38.2275 2 35.8474 2C33.3905 2 31.4864 3.02883 31.4864 5.37826C31.4864 7.68161 33.498 8.26513 35.4021 8.71044C36.9069 9.07898 37.7976 9.26325 37.7976 10.1385C37.7976 10.9677 36.9223 11.2902 36.0317 11.2902C34.7264 11.2902 34.0047 10.8295 33.8819 9.72392H31.1486C31.21 12.1501 33.1294 13.44 36.047 13.44Z"></path><path d="M46.1842 13.44C48.7179 13.44 50.6834 12.1655 50.6834 9.86212C50.6834 7.5127 48.8407 6.88311 46.7984 6.40709C45.1554 6.03855 44.3108 5.85428 44.3108 5.0865C44.3108 4.47227 44.9404 4.05766 45.8924 4.05766C46.9059 4.05766 47.5509 4.53369 47.6583 5.37826H50.3149C50.2074 3.0749 48.3647 2 45.9846 2C43.5277 2 41.6235 3.02883 41.6235 5.37826C41.6235 7.68161 43.6351 8.26513 45.5393 8.71044C47.0441 9.07898 47.9347 9.26325 47.9347 10.1385C47.9347 10.9677 47.0595 11.2902 46.1688 11.2902C44.8636 11.2902 44.1419 10.8295 44.019 9.72392H41.2857C41.3471 12.1501 43.2666 13.44 46.1842 13.44Z"></path><path d="M1.78418 13.179H4.54821V9.50894H7.11261C9.3699 9.50894 10.8287 8.01943 10.8287 5.9157C10.8287 4.81009 10.4294 3.8734 9.72308 3.2131C9.04743 2.56816 8.06466 2.19962 6.72872 2.19962H1.78418V13.179ZM4.54821 7.35914V4.48762H6.5598C7.52721 4.48762 8.09537 5.02507 8.09537 5.90035C8.09537 6.77562 7.54257 7.35914 6.5598 7.35914H4.54821Z"></path></svg><svg class="PressPlayOnTape__word PressPlayOnTape__word--play" width="42" height="15" viewBox="0 0 42 15" preserveAspectRatio="xMinYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8152 13.44H19.7832V11.04H14.6472V2H11.8152V13.44Z"></path><path d="M20.2184 13.44H23.0664L23.7224 11.376H27.7224L28.3944 13.44H31.3704L27.2424 2H24.3304L20.2184 13.44ZM24.3784 9.344L25.2584 6.576C25.4504 5.984 25.7224 4.96 25.7224 4.96H25.7544C25.7544 4.96 26.0104 5.984 26.2024 6.576L27.0664 9.344H24.3784Z"></path><path d="M33.6849 13.44H36.5169V9.216L40.3889 2H37.3969L35.9409 4.96C35.5569 5.744 35.1569 6.704 35.1569 6.704H35.1249C35.1249 6.704 34.7569 5.744 34.3729 4.96L32.9009 2H29.8129L33.6849 9.216V13.44Z"></path><path d="M1.37793 13.44H4.25793V9.616H6.92993C9.28193 9.616 10.8019 8.064 10.8019 5.872C10.8019 4.72 10.3859 3.744 9.64993 3.056C8.94593 2.384 7.92193 2 6.52993 2H1.37793V13.44ZM4.25793 7.376V4.384H6.35393C7.36193 4.384 7.95393 4.944 7.95393 5.856C7.95393 6.768 7.37793 7.376 6.35393 7.376H4.25793Z"></path></svg><svg class="PressPlayOnTape__word PressPlayOnTape__word--on" width="26" height="15" viewBox="0 0 26 15" preserveAspectRatio="xMinYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6609 13.35H17.4289V8.022C17.4289 7.622 17.3969 6.15 17.3969 6.15H17.4289C17.4289 6.15 18.0529 7.382 18.2449 7.686L21.6049 13.35H24.4529V1.91H21.6849V7.334C21.6849 7.734 21.7169 9.11 21.7169 9.11H21.6849C21.6849 9.11 21.0769 7.974 20.9009 7.654L17.5089 1.91H14.6609V13.35Z"></path><circle cx="7.5" cy="7.65" r="6"></circle></svg><svg class="PressPlayOnTape__word PressPlayOnTape__word--tape" width="42" height="15" viewBox="0 0 42 15" preserveAspectRatio="xMinYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="PressPlayOnTape__word--tape-a" d="M9.68964 13.44H12.5376L13.1936 11.376H17.1936L17.8656 13.44H20.8416L16.7136 2H13.8016L9.68964 13.44ZM13.8496 9.344L14.7296 6.576C14.9216 5.984 15.1936 4.96 15.1936 4.96H15.2256C15.2256 4.96 15.4816 5.984 15.6736 6.576L16.5376 9.344H13.8496Z"></path><path d="M21.6459 13.44H24.5259V9.616H27.1979C29.5499 9.616 31.0699 8.064 31.0699 5.872C31.0699 4.72 30.6539 3.744 29.9179 3.056C29.2139 2.384 28.1899 2 26.7979 2H21.6459V13.44ZM24.5259 7.376V4.384H26.6219C27.6299 4.384 28.2219 4.944 28.2219 5.856C28.2219 6.768 27.6459 7.376 26.6219 7.376H24.5259Z"></path><path d="M32.0834 13.44H40.8514V11.04H34.9154V8.592H39.9234V6.384H34.9154V4.336H40.7554V2H32.0834V13.44Z"></path><path d="M4.68066 13.44H7.51266V4.4H10.8727V2H1.35266V4.4H4.68066V13.44Z"></path></svg>', 4),
    G_ = [Z_],
    Ss = {
        __name: "PressPlayOnTape",
        props: {
            open: {
                type: Boolean,
                default: !1
            }
        },
        setup(e) {
            const t = e,
                n = ue(),
                r = le(() => ["PressPlayOnTape", {
                    "PressPlayOnTape--open": t.open
                }]),
                o = le(() => `--frequency: ${n.$sound.playing ? n.$sound.frequencies.value[1] : 1}`);
            return (i, a) => (oe(), Ee("div", {
                class: vt(ne(r)),
                style: on(ne(o))
            }, G_, 6))
        }
    };
const X_ = {
        key: 0,
        viewBox: "0 0 44 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    Y_ = pe("path", {
        d: "M0.784058 11.9999H3.66406V8.17594H6.33606C8.68806 8.17594 10.2081 6.62394 10.2081 4.43194C10.2081 3.27994 9.79206 2.30394 9.05606 1.61594C8.35206 0.943938 7.32806 0.559938 5.93606 0.559938H0.784058V11.9999ZM3.66406 5.93594V2.94394H5.76006C6.76806 2.94394 7.36006 3.50394 7.36006 4.41594C7.36006 5.32794 6.78406 5.93594 5.76006 5.93594H3.66406Z"
    }, null, -1),
    Q_ = pe("path", {
        d: "M11.2216 11.9999H14.1016V8.17594H16.7736C19.1256 8.17594 20.6456 6.62394 20.6456 4.43194C20.6456 3.27994 20.2296 2.30394 19.4936 1.61594C18.7896 0.943938 17.7656 0.559938 16.3736 0.559938H11.2216V11.9999ZM14.1016 5.93594V2.94394H16.1976C17.2056 2.94394 17.7976 3.50394 17.7976 4.41594C17.7976 5.32794 17.2216 5.93594 16.1976 5.93594H14.1016Z"
    }, null, -1),
    J_ = pe("path", {
        d: "M37.4613 11.9999H40.2933V2.95994H43.6533V0.559938H34.1333V2.95994H37.4613V11.9999Z"
    }, null, -1),
    em = pe("path", {
        d: "M33.7003 6.19995C33.7003 9.51366 31.014 12.2 27.7003 12.2C24.3865 12.2 21.7003 9.51366 21.7003 6.19995C21.7003 2.88624 24.3865 0.199951 27.7003 0.199951C31.014 0.199951 33.7003 2.88624 33.7003 6.19995Z"
    }, null, -1),
    tm = [Y_, Q_, J_, em],
    nm = {
        key: 1,
        viewBox: "0 0 11 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    rm = pe("path", {
        d: "M10.5 5.63397C11.1667 6.01888 11.1667 6.98112 10.5 7.36602L1.5 12.5622C0.833332 12.9471 3.43203e-07 12.466 3.76852e-07 11.6962L8.31114e-07 1.30385C8.64763e-07 0.534046 0.833334 0.0529218 1.5 0.437822L10.5 5.63397Z"
    }, null, -1),
    om = [rm],
    sm = {
        key: 2,
        viewBox: "0 0 10 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    im = pe("path", {
        d: "M0 1.5C0 0.947715 0.447715 0.5 1 0.5H3C3.55228 0.5 4 0.947715 4 1.5V11.5C4 12.0523 3.55228 12.5 3 12.5H1C0.447715 12.5 0 12.0523 0 11.5V1.5Z"
    }, null, -1),
    am = pe("path", {
        d: "M6 1.5C6 0.947715 6.44772 0.5 7 0.5H9C9.55228 0.5 10 0.947715 10 1.5V11.5C10 12.0523 9.55228 12.5 9 12.5H7C6.44772 12.5 6 12.0523 6 11.5V1.5Z"
    }, null, -1),
    lm = [im, am],
    cm = {
        key: 3,
        class: "Icon__external",
        viewBox: "0 0 16 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    um = pe("path", {
        d: "M4 12.5L12 4.5M12 4.5V12.18M12 4.5H4.32",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
    }, null, -1),
    fm = [um],
    dm = {
        __name: "Icon",
        props: {
            name: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: "--dark"
            },
            stroke: {
                type: String,
                default: "--dark"
            }
        },
        setup(e) {
            const t = e,
                n = le(() => `--svg-color: var(${t.color});`);
            return (r, o) => (oe(), Ee("div", {
                class: "Icon",
                style: on(ne(n))
            }, [e.name === "logo" ? (oe(), Ee("svg", X_, tm)) : Nt("", !0), e.name === "play" ? (oe(), Ee("svg", nm, om)) : Nt("", !0), e.name === "pause" ? (oe(), Ee("svg", sm, lm)) : Nt("", !0), e.name === "external" ? (oe(), Ee("svg", cm, fm)) : Nt("", !0)], 4))
        }
    };
const pm = {
    __name: "Marquee",
    props: {
        data: null,
        auto: {
            type: Boolean,
            default: !1
        },
        clones: {
            type: Number,
            default: 6
        },
        speed: {
            type: Number,
            default: 1
        },
        start: {
            type: Number,
            default: 0
        }
    },
    setup(e, {expose: t}) {
        const n = e,
            r = ue(),
            o = z(null),
            i = z(null),
            a = z(null),
            c = z(0),
            u = z(n.start),
            f = z(!1),
            _ = z(!1),
            s = le(() => `width: ${c.value}px; transform: translateX(${-u.value}px);`),
            l = () => {
                f.value && (u.value += n.speed),
                u.value > c.value && (u.value = 0, _.value && (f.value = !1, _.value = !1))
            },
            d = () => {
                y(),
                f.value = !0,
                _.value = !1
            },
            h = () => {
                y(),
                _.value = !0
            },
            g = () => {
                f.value = !1
            },
            y = () => {
                const p = i.value.children[0];
                a.value = o.value.parentElement,
                c.value = parseFloat(window.getComputedStyle(p).width.replace("px", ""))
            };
        return t({
            start: d,
            stop: h,
            pause: g
        }), it(() => {
            y(),
            r.$raf.add(l),
            n.auto && d(),
            r.$viewport.add(y)
        }), wt(() => {
            r.$viewport.remove(y),
            r.$raf.remove(l)
        }), (p, m) => (oe(), Ee("div", {
            class: "Marquee",
            ref_key: "marquee",
            ref: o
        }, [pe("div", {
            class: "Marquee__container",
            style: on(ne(s)),
            ref_key: "container",
            ref: i
        }, [(oe(!0), Ee(Re, null, ds(e.clones, b => un(p.$slots, "default", {
            key: b
        })), 128))], 4)], 512))
    }
};
const hm = {
        class: "Perspective__container"
    },
    _m = {
        ref: "bottom",
        class: "Perspective__container__face Perspective__container__face--bottom"
    },
    mm = {
        __name: "Perspective",
        props: {
            front: !1,
            top: !1,
            back: !1,
            shadows: {
                type: Boolean,
                default: !0
            },
            autoWidth: {
                type: Boolean,
                default: !1
            },
            height: {
                default: 100,
                type: Number
            }
        },
        setup(e) {
            const t = e,
                n = ue(),
                r = z(180),
                o = z(!1),
                i = z(null),
                a = z(null),
                c = z(null),
                u = z(null),
                f = z(!1),
                _ = le(() => ["Perspective", {
                    resizing: f.value,
                    "Perspective--hidden": o.value,
                    "Perspective--front": t.front || !t.top && !t.back,
                    "Perspective--top": t.top && !t.front,
                    "Perspective--back": t.back && !t.front && !t.top,
                    "Perspective--shadows": t.shadows
                }]),
                s = le(() => `--height: ${Math.floor(r.value) / 2}px; height: ${Math.floor(r.value)}px;` + (t.autoWidth ? `--width: ${i.value / 2}px; width: ${i.value}px;` : "")),
                l = g => {
                    o.value = !1
                },
                d = g => {
                    o.value = !0
                },
                h = () => {
                    f.value = !0;
                    const g = parseFloat(window.getComputedStyle(a.value.children[0]).height.replace("px", "")),
                        y = parseFloat(window.getComputedStyle(a.value.children[0]).width.replace("px", ""));
                    r.value = g,
                    i.value = y,
                    setTimeout(() => {
                        f.value = !1
                    }, 20)
                };
            return it(() => {
                h(),
                n.$viewport.add(h)
            }), wt(() => {
                n.$viewport.remove(h)
            }), (g, y) => {
                const p = du("observer");
                return cu((oe(), Ee("div", {
                    class: vt(ne(_)),
                    style: on(ne(s))
                }, [pe("div", hm, [pe("div", {
                    ref_key: "front",
                    ref: a,
                    class: "Perspective__container__face Perspective__container__face--front"
                }, [un(g.$slots, "front")], 512), pe("div", {
                    ref_key: "top",
                    ref: c,
                    class: "Perspective__container__face Perspective__container__face--top"
                }, [un(g.$slots, "top")], 512), pe("div", {
                    ref_key: "back",
                    ref: u,
                    class: "Perspective__container__face Perspective__container__face--back"
                }, [un(g.$slots, "back")], 512), pe("div", _m, [un(g.$slots, "bottom")], 512)])], 6)), [[p, {
                    onEnter: l,
                    onLeave: d
                }]])
            }
        }
    };
const gm = {
        class: "PlayButton__inner"
    },
    vm = {
        class: "PlayButton__inner"
    },
    xs = {
        __name: "PlayButton",
        props: {
            data: null,
            mobile: {
                type: Boolean,
                default: !1
            },
            clones: {
                type: Number,
                default: 4
            }
        },
        setup(e) {
            const t = e,
                n = ue(),
                r = z(null),
                o = le(() => n.$sound.playing.value),
                i = le(() => ["PlayButton", {
                    "PlayButton--mobile": t.mobile
                }]);
            return it(() => {
                r.value.start()
            }), (a, c) => {
                const u = ar,
                    f = dm,
                    _ = pm,
                    s = mm;
                return oe(), Ee("button", {
                    class: vt(ne(i))
                }, [B(s, {
                    front: !ne(o),
                    top: ne(o),
                    height: 10,
                    shadows: !1
                }, {
                    front: ee(() => [B(_, {
                        clones: e.clones,
                        ref_key: "marquee",
                        ref: r
                    }, {
                        default: ee(() => [pe("div", gm, [B(u, {
                            type: "body-02",
                            uppercase: ""
                        }, {
                            default: ee(() => [xe("Play")]),
                            _: 1
                        }), B(f, {
                            name: "play",
                            color: e.mobile ? "--dark" : "--white"
                        }, null, 8, ["color"])])]),
                        _: 1
                    }, 8, ["clones"])]),
                    top: ee(() => [pe("div", vm, [B(u, {
                        type: "body-02",
                        uppercase: ""
                    }, {
                        default: ee(() => [xe("Pause")]),
                        _: 1
                    }), B(f, {
                        name: "pause",
                        color: e.mobile ? "--dark" : "--white"
                    }, null, 8, ["color"])])]),
                    _: 1
                }, 8, ["front", "top"])], 2)
            }
        }
    };
const Ps = {
    __name: "MenuToggle",
    emits: ["toggle"],
    setup(e, {emit: t}) {
        return (n, r) => (oe(), Ee("div", {
            class: "MenuToggle",
            onClick: r[0] || (r[0] = o => t("toggle"))
        }))
    }
};
const ym = {
        class: "MenuFixed"
    },
    bm = {
        class: "MenuFixed__play"
    },
    wm = {
        class: "MenuFixed__links"
    },
    Tm = {
        __name: "MenuFixed",
        props: {
            open: {
                type: Boolean,
                default: !1
            },
            data: null,
            infos: {
                type: Array,
                default: () => [{
                    title: "Privacy Policy & Cookies",
                    url: "/privacy-policies-cookies"
                }, {
                    title: "Web Credits",
                    url: "/web-credits"
                }]
            }
        },
        emits: ["toggle"],
        setup(e, {emit: t}) {
            return (n, r) => {
                const o = Ss,
                    i = Es,
                    a = xs,
                    c = ar,
                    u = Ps;
                return oe(), Ee("div", ym, [B(i, {
                    class: "MenuFixed__logo",
                    to: "/",
                    "aria-label": "home"
                }, {
                    default: ee(() => [B(o, {
                        open: e.open
                    }, null, 8, ["open"])]),
                    _: 1
                }), pe("div", bm, [B(a, {
                    onClick: r[0] || (r[0] = f => n.$sound.toggle())
                })]), pe("div", wm, [B(i, {
                    class: "link-hover",
                    to: "/studio"
                }, {
                    default: ee(() => [B(c, {
                        type: "body-02"
                    }, {
                        default: ee(() => [xe("Studio")]),
                        _: 1
                    })]),
                    _: 1
                }), B(i, {
                    class: "link-hover",
                    to: "/case-studies"
                }, {
                    default: ee(() => [B(c, {
                        type: "body-02"
                    }, {
                        default: ee(() => [xe("Case studies")]),
                        _: 1
                    })]),
                    _: 1
                }), B(i, {
                    class: "link-hover",
                    to: "/services"
                }, {
                    default: ee(() => [B(c, {
                        type: "body-02"
                    }, {
                        default: ee(() => [xe("Services")]),
                        _: 1
                    })]),
                    _: 1
                }), B(i, {
                    class: "link-hover",
                    to: "/contact"
                }, {
                    default: ee(() => [B(c, {
                        type: "body-02"
                    }, {
                        default: ee(() => [xe("Contact")]),
                        _: 1
                    })]),
                    _: 1
                })]), B(u, {
                    class: "MenuFixed__toggle",
                    onToggle: r[1] || (r[1] = f => t("toggle"))
                })])
            }
        }
    };
const Am = pe("svg", {
        preserveAspectRatio: "none",
        viewBox: "0 0 59 55",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, [pe("path", {
        d: "M44.6973 8.17791L22.313 43.7756C17.9205 50.761 10.2475 55 1.99592 55H59.5V0C53.488 0 47.8976 3.08849 44.6973 8.17791Z",
        fill: "white"
    })], -1),
    Em = [Am],
    Cm = {
        __name: "MenuSide",
        props: {
            inverse: {
                type: Boolean,
                default: !1
            }
        },
        setup(e) {
            const t = e,
                n = le(() => ["MenuSide", {
                    "MenuSide--inverse": t.inverse
                }]);
            return (r, o) => (oe(), Ee("div", {
                class: vt(ne(n))
            }, Em, 2))
        }
    };
const km = {
        key: 0,
        ref: "cookie",
        class: "MenuSticky"
    },
    Sm = {
        class: "MenuSticky__container"
    },
    xm = {
        class: "MenuSticky__links"
    },
    Pm = {
        __name: "MenuSticky",
        props: {
            show: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["toggle"],
        setup(e, {emit: t}) {
            const n = ue();
            return le(() => !(n.$viewport.width.value < 640)), it(() => {}), wt(() => {}), (r, o) => {
                const i = Cm,
                    a = Ss,
                    c = Es,
                    u = xs,
                    f = ar,
                    _ = Ps;
                return oe(), Qe(kt, {
                    name: "MenuSticky__transition",
                    appear: "",
                    mode: "out-in"
                }, {
                    default: ee(() => [e.show ? (oe(), Ee("div", km, [B(i), pe("div", Sm, [B(c, {
                        class: "MenuSticky__logo",
                        to: "/",
                        "aria-label": "home"
                    }, {
                        default: ee(() => [B(a)]),
                        _: 1
                    }), B(u, {
                        class: "MenuSticky__play",
                        onClick: o[0] || (o[0] = s => r.$sound.toggle())
                    }), pe("div", xm, [B(c, {
                        class: "link-hover",
                        to: "/studio"
                    }, {
                        default: ee(() => [B(f, {
                            type: "body-02"
                        }, {
                            default: ee(() => [xe("Studio")]),
                            _: 1
                        })]),
                        _: 1
                    }), B(c, {
                        class: "link-hover",
                        to: "/case-studies"
                    }, {
                        default: ee(() => [B(f, {
                            type: "body-02"
                        }, {
                            default: ee(() => [xe("Case studies")]),
                            _: 1
                        })]),
                        _: 1
                    }), B(c, {
                        class: "link-hover",
                        to: "/services"
                    }, {
                        default: ee(() => [B(f, {
                            type: "body-02"
                        }, {
                            default: ee(() => [xe("Services")]),
                            _: 1
                        })]),
                        _: 1
                    }), B(c, {
                        class: "link-hover",
                        to: "/contact"
                    }, {
                        default: ee(() => [B(f, {
                            type: "body-02"
                        }, {
                            default: ee(() => [xe("Contact")]),
                            _: 1
                        })]),
                        _: 1
                    })]), B(_, {
                        class: "MenuSticky__toggle",
                        onToggle: o[1] || (o[1] = s => t("toggle"))
                    })]), B(i, {
                        inverse: ""
                    })], 512)) : Nt("", !0)]),
                    _: 1
                })
            }
        }
    };
const Mm = {
        key: 0,
        class: "MenuMobile"
    },
    Rm = {
        class: "MenuMobile__container"
    },
    Hm = {
        class: "MenuMobile__header"
    },
    Om = {
        class: "MenuMobile__links"
    },
    Lm = {
        class: "MenuMobile__footer"
    },
    Im = {
        class: "MenuMobile__footer__links__copyright"
    },
    $m = {
        __name: "MenuMobile",
        props: {
            open: {
                type: Boolean,
                default: !1
            },
            infos: {
                type: Array,
                default: () => [{
                    title: "Privacy Policy & Cookies",
                    url: "/privacy-policies-cookies"
                }, {
                    title: "Web Credits",
                    url: "/web-credits"
                }]
            }
        },
        emits: ["toggle"],
        setup(e, {emit: t}) {
            const n = z(!1),
                r = () => {
                    document.body.classList.add("no-scroll")
                },
                o = () => {
                    n.value = !0
                },
                i = () => {
                    n.value = !1
                },
                a = () => {
                    document.body.classList.remove("no-scroll")
                };
            return (c, u) => {
                const f = Ss,
                    _ = Es,
                    s = Ps,
                    l = ar,
                    d = xs;
                return oe(), Qe(kt, {
                    name: "MenuMobile__transition",
                    mode: "out-in",
                    appear: "",
                    onBeforeEnter: r,
                    onEnter: o,
                    onBeforeLeave: i,
                    onAfterLeave: a
                }, {
                    default: ee(() => [e.open ? (oe(), Ee("div", Mm, [pe("div", Rm, [pe("div", Hm, [B(_, {
                        class: "MenuMobile__logo",
                        to: "/",
                        "aria-label": "home"
                    }, {
                        default: ee(() => [B(f, {
                            open: ne(n)
                        }, null, 8, ["open"])]),
                        _: 1
                    }), B(s, {
                        class: "MenuMobile__toggle",
                        onToggle: u[0] || (u[0] = h => t("toggle"))
                    })]), pe("div", Om, [B(_, {
                        class: "link-hover",
                        to: "/studio"
                    }, {
                        default: ee(() => [B(l, {
                            type: "heading--2"
                        }, {
                            default: ee(() => [xe("Studio")]),
                            _: 1
                        })]),
                        _: 1
                    }), B(_, {
                        class: "link-hover",
                        to: "/case-studies"
                    }, {
                        default: ee(() => [B(l, {
                            type: "heading--2"
                        }, {
                            default: ee(() => [xe("Case studies")]),
                            _: 1
                        })]),
                        _: 1
                    }), B(_, {
                        class: "link-hover",
                        to: "/services"
                    }, {
                        default: ee(() => [B(l, {
                            type: "heading--2"
                        }, {
                            default: ee(() => [xe("Services")]),
                            _: 1
                        })]),
                        _: 1
                    }), B(_, {
                        class: "link-hover",
                        to: "/contact"
                    }, {
                        default: ee(() => [B(l, {
                            type: "heading--2"
                        }, {
                            default: ee(() => [xe("Contact")]),
                            _: 1
                        })]),
                        _: 1
                    })]), B(d, {
                        class: "MenuMobile__play",
                        mobile: "",
                        clones: 8,
                        onClick: u[1] || (u[1] = h => c.$sound.toggle())
                    }), pe("div", Lm, [(oe(!0), Ee(Re, null, ds(e.infos, h => (oe(), Qe(_, {
                        to: h.url,
                        class: "link-hover"
                    }, {
                        default: ee(() => [xe(uo(h.title), 1)]),
                        _: 2
                    }, 1032, ["to"]))), 256)), pe("div", Im, "© " + uo(new Date().getFullYear()), 1)])])])) : Nt("", !0)]),
                    _: 1
                })
            }
        }
    },
    Ms = () => tr("store", () => ({
        options: null,
        contact: null,
        tags: null,
        cases: null,
        scroll: null,
        caseScrolling: !1
    }));
function Wo() {
    return Wo = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Wo.apply(this, arguments)
}
function Or(e, t, n) {
    return Math.max(e, Math.min(t, n))
}
class Fm {
    advance(t)
    {
        var n;
        if (!this.isRunning)
            return;
        let r = !1;
        if (this.lerp)
            this.value = (o = this.value, i = this.to, (1 - (a = 1 - Math.exp(-60 * this.lerp * t))) * o + a * i),
            Math.round(this.value) === this.to && (this.value = this.to, r = !0);
        else {
            this.currentTime += t;
            const c = Or(0, this.currentTime / this.duration, 1);
            r = c >= 1;
            const u = r ? 1 : this.easing(c);
            this.value = this.from + (this.to - this.from) * u
        }
        var o,
            i,
            a;
        (n = this.onUpdate) == null || n.call(this, this.value, r),
        r && this.stop()
    }
    stop()
    {
        this.isRunning = !1
    }
    fromTo(t, n, {lerp: r=.1, duration: o=1, easing: i=u => u, onStart: a, onUpdate: c})
    {
        this.from = this.value = t,
        this.to = n,
        this.lerp = r,
        this.duration = o,
        this.easing = i,
        this.currentTime = 0,
        this.isRunning = !0,
        a == null || a(),
        this.onUpdate = c
    }
}
class Bm {
    constructor({wrapper: t, content: n, autoResize: r=!0}={})
    {
        if (this.resize = () => {
            this.onWrapperResize(),
            this.onContentResize()
        }, this.onWrapperResize = () => {
            this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight)
        }, this.onContentResize = () => {
            this.scrollHeight = this.content.scrollHeight,
            this.scrollWidth = this.content.scrollWidth
        }, this.wrapper = t, this.content = n, r) {
            const o = function(i, a) {
                let c;
                return function() {
                    let u = arguments,
                        f = this;
                    clearTimeout(c),
                    c = setTimeout(function() {
                        i.apply(f, u)
                    }, 250)
                }
            }(this.resize);
            this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(o), this.wrapperResizeObserver.observe(this.wrapper)),
            this.contentResizeObserver = new ResizeObserver(o),
            this.contentResizeObserver.observe(this.content)
        }
        this.resize()
    }
    destroy()
    {
        var t,
            n;
        (t = this.wrapperResizeObserver) == null || t.disconnect(),
        (n = this.contentResizeObserver) == null || n.disconnect()
    }
    get limit()
    {
        return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height
        }
    }
}
class Bl {
    constructor()
    {
        this.events = {}
    }
    emit(t, ...n)
    {
        let r = this.events[t] || [];
        for (let o = 0, i = r.length; o < i; o++)
            r[o](...n)
    }
    on(t, n)
    {
        var r;
        return (r = this.events[t]) != null && r.push(n) || (this.events[t] = [n]), () => {
            var o;
            this.events[t] = (o = this.events[t]) == null ? void 0 : o.filter(i => n !== i)
        }
    }
    off(t, n)
    {
        var r;
        this.events[t] = (r = this.events[t]) == null ? void 0 : r.filter(o => n !== o)
    }
    destroy()
    {
        this.events = {}
    }
}
class Dm {
    constructor(t, {wheelMultiplier: n=1, touchMultiplier: r=2, normalizeWheel: o=!1})
    {
        this.onTouchStart = i => {
            const {clientX: a, clientY: c} = i.targetTouches ? i.targetTouches[0] : i;
            this.touchStart.x = a,
            this.touchStart.y = c,
            this.lastDelta = {
                x: 0,
                y: 0
            }
        },
        this.onTouchMove = i => {
            const {clientX: a, clientY: c} = i.targetTouches ? i.targetTouches[0] : i,
                u = -(a - this.touchStart.x) * this.touchMultiplier,
                f = -(c - this.touchStart.y) * this.touchMultiplier;
            this.touchStart.x = a,
            this.touchStart.y = c,
            this.lastDelta = {
                x: u,
                y: f
            },
            this.emitter.emit("scroll", {
                deltaX: u,
                deltaY: f,
                event: i
            })
        },
        this.onTouchEnd = i => {
            this.emitter.emit("scroll", {
                deltaX: this.lastDelta.x,
                deltaY: this.lastDelta.y,
                event: i
            })
        },
        this.onWheel = i => {
            let {deltaX: a, deltaY: c} = i;
            this.normalizeWheel && (a = Or(-100, a, 100), c = Or(-100, c, 100)),
            a *= this.wheelMultiplier,
            c *= this.wheelMultiplier,
            this.emitter.emit("scroll", {
                deltaX: a,
                deltaY: c,
                event: i
            })
        },
        this.element = t,
        this.wheelMultiplier = n,
        this.touchMultiplier = r,
        this.normalizeWheel = o,
        this.touchStart = {
            x: null,
            y: null
        },
        this.emitter = new Bl,
        this.element.addEventListener("wheel", this.onWheel, {
            passive: !1
        }),
        this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }),
        this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }),
        this.element.addEventListener("touchend", this.onTouchEnd, {
            passive: !1
        })
    }
    on(t, n)
    {
        return this.emitter.on(t, n)
    }
    destroy()
    {
        this.emitter.destroy(),
        this.element.removeEventListener("wheel", this.onWheel, {
            passive: !1
        }),
        this.element.removeEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }),
        this.element.removeEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }),
        this.element.removeEventListener("touchend", this.onTouchEnd, {
            passive: !1
        })
    }
}
class Nm {
    constructor({wrapper: t=window, content: n=document.documentElement, wheelEventsTarget: r=t, eventsTarget: o=r, smoothWheel: i=!0, smoothTouch: a=!1, syncTouch: c=!1, syncTouchLerp: u=.1, __iosNoInertiaSyncTouchLerp: f=.4, touchInertiaMultiplier: _=35, duration: s, easing: l=E => Math.min(1, 1.001 - Math.pow(2, -10 * E)), lerp: d=!s && .1, infinite: h=!1, orientation: g="vertical", gestureOrientation: y="vertical", touchMultiplier: p=1, wheelMultiplier: m=1, normalizeWheel: b=!1, autoResize: T=!0}={})
    {
        this.onVirtualScroll = ({deltaX: E, deltaY: P, event: H}) => {
            if (H.ctrlKey)
                return;
            const k = H.type.includes("touch"),
                M = H.type.includes("wheel");
            if (this.options.gestureOrientation === "both" && E === 0 && P === 0 || this.options.gestureOrientation === "vertical" && P === 0 || this.options.gestureOrientation === "horizontal" && E === 0 || k && this.options.gestureOrientation === "vertical" && this.scroll === 0 && !this.options.infinite && P <= 0)
                return;
            let U = H.composedPath();
            if (U = U.slice(0, U.indexOf(this.rootElement)), U.find(L => {
                var we;
                return (L.hasAttribute == null ? void 0 : L.hasAttribute("data-lenis-prevent")) || k && (L.hasAttribute == null ? void 0 : L.hasAttribute("data-lenis-prevent-touch")) || M && (L.hasAttribute == null ? void 0 : L.hasAttribute("data-lenis-prevent-wheel")) || ((we = L.classList) == null ? void 0 : we.contains("lenis"))
            }))
                return;
            if (this.isStopped || this.isLocked)
                return void H.preventDefault();
            if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && k || this.options.smoothWheel && M, !this.isSmooth)
                return this.isScrolling = !1, void this.animate.stop();
            H.preventDefault();
            let W = P;
            this.options.gestureOrientation === "both" ? W = Math.abs(P) > Math.abs(E) ? P : E : this.options.gestureOrientation === "horizontal" && (W = E);
            const F = k && this.options.syncTouch,
                X = k && H.type === "touchend" && Math.abs(W) > 1;
            X && (W = this.velocity * this.options.touchInertiaMultiplier),
            this.scrollTo(this.targetScroll + W, Wo({
                programmatic: !1
            }, F && {
                lerp: X ? this.syncTouchLerp : this.options.__iosNoInertiaSyncTouchLerp
            }))
        },
        this.onScroll = () => {
            if (!this.isScrolling) {
                const E = this.animatedScroll;
                this.animatedScroll = this.targetScroll = this.actualScroll,
                this.velocity = 0,
                this.direction = Math.sign(this.animatedScroll - E),
                this.emit()
            }
        },
        window.lenisVersion = "1.0.27",
        t !== document.documentElement && t !== document.body || (t = window),
        this.options = {
            wrapper: t,
            content: n,
            wheelEventsTarget: r,
            eventsTarget: o,
            smoothWheel: i,
            smoothTouch: a,
            syncTouch: c,
            syncTouchLerp: u,
            __iosNoInertiaSyncTouchLerp: f,
            touchInertiaMultiplier: _,
            duration: s,
            easing: l,
            lerp: d,
            infinite: h,
            gestureOrientation: y,
            orientation: g,
            touchMultiplier: p,
            wheelMultiplier: m,
            normalizeWheel: b,
            autoResize: T
        },
        this.animate = new Fm,
        this.emitter = new Bl,
        this.dimensions = new Bm({
            wrapper: t,
            content: n,
            autoResize: T
        }),
        this.toggleClass("lenis", !0),
        this.velocity = 0,
        this.isLocked = !1,
        this.isStopped = !1,
        this.isSmooth = c || i || a,
        this.isScrolling = !1,
        this.targetScroll = this.animatedScroll = this.actualScroll,
        this.options.wrapper.addEventListener("scroll", this.onScroll, {
            passive: !1
        }),
        this.virtualScroll = new Dm(o, {
            touchMultiplier: p,
            wheelMultiplier: m,
            normalizeWheel: b
        }),
        this.virtualScroll.on("scroll", this.onVirtualScroll)
    }
    destroy()
    {
        this.emitter.destroy(),
        this.options.wrapper.removeEventListener("scroll", this.onScroll, {
            passive: !1
        }),
        this.virtualScroll.destroy(),
        this.dimensions.destroy(),
        this.toggleClass("lenis", !1),
        this.toggleClass("lenis-smooth", !1),
        this.toggleClass("lenis-scrolling", !1),
        this.toggleClass("lenis-stopped", !1),
        this.toggleClass("lenis-locked", !1)
    }
    on(t, n)
    {
        return this.emitter.on(t, n)
    }
    off(t, n)
    {
        return this.emitter.off(t, n)
    }
    setScroll(t)
    {
        this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
    }
    resize()
    {
        this.dimensions.resize()
    }
    emit()
    {
        this.emitter.emit("scroll", this)
    }
    reset()
    {
        this.isLocked = !1,
        this.isScrolling = !1,
        this.velocity = 0,
        this.animate.stop()
    }
    start()
    {
        this.isStopped = !1,
        this.reset()
    }
    stop()
    {
        this.isStopped = !0,
        this.animate.stop(),
        this.reset()
    }
    raf(t)
    {
        const n = t - (this.time || t);
        this.time = t,
        this.animate.advance(.001 * n)
    }
    scrollTo(t, {offset: n=0, immediate: r=!1, lock: o=!1, duration: i=this.options.duration, easing: a=this.options.easing, lerp: c=!i && this.options.lerp, onComplete: u=null, force: f=!1, programmatic: _=!0}={})
    {
        if (!this.isStopped && !this.isLocked || f) {
            if (["top", "left", "start"].includes(t))
                t = 0;
            else if (["bottom", "right", "end"].includes(t))
                t = this.limit;
            else {
                var s;
                let l;
                if (typeof t == "string" ? l = document.querySelector(t) : (s = t) != null && s.nodeType && (l = t), l) {
                    if (this.options.wrapper !== window) {
                        const h = this.options.wrapper.getBoundingClientRect();
                        n -= this.isHorizontal ? h.left : h.top
                    }
                    const d = l.getBoundingClientRect();
                    t = (this.isHorizontal ? d.left : d.top) + this.animatedScroll
                }
            }
            if (typeof t == "number") {
                if (t += n, t = Math.round(t), this.options.infinite ? _ && (this.targetScroll = this.animatedScroll = this.scroll) : t = Or(0, t, this.limit), r)
                    return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), void (u == null || u(this));
                if (!_) {
                    if (t === this.targetScroll)
                        return;
                    this.targetScroll = t
                }
                this.animate.fromTo(this.animatedScroll, t, {
                    duration: i,
                    easing: a,
                    lerp: c,
                    onStart: () => {
                        o && (this.isLocked = !0),
                        this.isScrolling = !0
                    },
                    onUpdate: (l, d) => {
                        this.isScrolling = !0,
                        this.velocity = l - this.animatedScroll,
                        this.direction = Math.sign(this.velocity),
                        this.animatedScroll = l,
                        this.setScroll(this.scroll),
                        _ && (this.targetScroll = l),
                        d || this.emit(),
                        d && requestAnimationFrame(() => {
                            this.reset(),
                            this.emit(),
                            u == null || u(this)
                        })
                    }
                })
            }
        }
    }
    get rootElement()
    {
        return this.options.wrapper === window ? this.options.content : this.options.wrapper
    }
    get limit()
    {
        return this.dimensions.limit[this.isHorizontal ? "x" : "y"]
    }
    get isHorizontal()
    {
        return this.options.orientation === "horizontal"
    }
    get actualScroll()
    {
        return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
    }
    get scroll()
    {
        return this.options.infinite ? (this.animatedScroll % (t = this.limit) + t) % t : this.animatedScroll;
        var t
    }
    get progress()
    {
        return this.limit === 0 ? 1 : this.scroll / this.limit
    }
    get isSmooth()
    {
        return this.__isSmooth
    }
    set isSmooth(t)
    {
        this.__isSmooth !== t && (this.__isSmooth = t, this.toggleClass("lenis-smooth", t))
    }
    get isScrolling()
    {
        return this.__isScrolling
    }
    set isScrolling(t)
    {
        this.__isScrolling !== t && (this.__isScrolling = t, this.toggleClass("lenis-scrolling", t))
    }
    get isStopped()
    {
        return this.__isStopped
    }
    set isStopped(t)
    {
        this.__isStopped !== t && (this.__isStopped = t, this.toggleClass("lenis-stopped", t))
    }
    get isLocked()
    {
        return this.__isLocked
    }
    set isLocked(t)
    {
        this.__isLocked !== t && (this.__isLocked = t, this.toggleClass("lenis-locked", t))
    }
    get className()
    {
        let t = "lenis";
        return this.isStopped && (t += " lenis-stopped"), this.isLocked && (t += " lenis-locked"), this.isScrolling && (t += " lenis-scrolling"), this.isSmooth && (t += " lenis-smooth"), t
    }
    toggleClass(t, n)
    {
        this.rootElement.classList.toggle(t, n),
        this.emitter.emit("className change", this)
    }
}
function Dl() {
    const e = ue(),
        t = tr("scroll-state", () => ({
            lenis: null,
            prevent: !1,
            callbacks: new Map
        })),
        n = tr("scroll-values", () => null),
        r = m => {
            t.value.callbacks.set(m, m)
        },
        o = m => {
            t.value.callbacks.delete(m, m)
        },
        i = () => {
            _({
                to: 0,
                immediate: !0
            })
        },
        a = m => {
            t.value.prevent && (m.preventDefault(), m.stopPropagation())
        },
        c = ({scroll: m, limit: b, velocity: T, direction: E, progress: P}) => {
            n.value = {
                scroll: m,
                limit: b,
                velocity: T,
                direction: E,
                progress: P
            },
            t.value.callbacks.forEach(H => {
                H(n.value)
            }),
            e.$emit("scroll", n.value)
        },
        u = () => {
            t.value.prevent = !1,
            e.$emit("scroll-started")
        },
        f = () => {
            t.value.prevent = !0,
            e.$emit("scroll-stopped")
        },
        _ = m => {
            t.value.lenis.scrollTo(m.to, m)
        },
        s = m => {
            t.value.lenis.raf(m)
        },
        l = () => {
            t.value.lenis.resize()
        },
        d = () => {
            document.body.addEventListener("wheel", a, {
                passive: !1
            }),
            document.body.addEventListener("touchmove", a, {
                passive: !1
            }),
            t.value.lenis.on("scroll", c),
            e.$raf.add(s)
        },
        h = () => {
            document.body.removeEventListener("wheel", a, {
                passive: !1
            }),
            document.body.removeEventListener("touchmove", a, {
                passive: !1
            }),
            t.value.lenis.off("scroll", c),
            e.$raf.remove(s)
        },
        g = () => "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
        y = ({duration: m=1.2, easing: b=W => Math.min(1, 1.001 - Math.pow(2, -10 * W)), orientation: T="vertical", gestureOrientation: E="vertical", smoothWheel: P=!0, wheelMultiplier: H=1, smoothTouch: k=!1, touchMultiplier: M=2, infinite: U=!1}={}) => {
            t.value.lenis = new Nm({
                duration: m,
                easing: b,
                orientation: T,
                gestureOrientation: E,
                smoothWheel: P,
                wheelMultiplier: H,
                smoothTouch: k,
                touchMultiplier: M,
                infinite: U
            }),
            d(),
            g() && document.body.classList.add("no-smooth")
        },
        p = () => {
            h(),
            t.value.lenis.destroy()
        };
    return {
        state: t,
        values: n,
        lenis: t.value.lenis,
        init: y,
        destroy: p,
        watch: r,
        unwatch: o,
        start: u,
        stop: f,
        reset: i,
        scrollTo: _,
        resize: l
    }
}
const jm = {
        __name: "Menu",
        props: {
            data: null,
            infos: {
                type: Array,
                default: () => [{
                    title: "Privacy Policy & Cookies",
                    url: "/privacy-policies-cookies"
                }, {
                    title: "Web Credits",
                    url: "/web-credits"
                }]
            }
        },
        setup(e) {
            const t = Ur(),
                n = Ms(),
                {watch: r, unwatch: o} = Dl(),
                i = ue(),
                a = z("dark"),
                c = z(!1),
                u = z(!1),
                f = z(0),
                _ = z(!1),
                s = z(0),
                l = le(() => ["Menu", `Menu--${a.value}`, {
                    "Menu--open": c.value,
                    "Menu--sticky": d.value,
                    "Menu--scrolled": h.value
                }]),
                d = le(() => !!(u.value || _.value)),
                h = le(() => f.value > g.value || n.value.caseScrolling),
                g = le(() => i.$viewport.height.value * .5),
                y = T => {
                    a.value !== T && (a.value = T)
                },
                p = () => {
                    c.value = !c.value
                },
                m = () => {
                    c.value = !1
                },
                b = T => {
                    _.value = !1,
                    f.value = T.scroll,
                    t.name !== "case-studies-project" && (n.value.caseScrolling = !1);
                    const E = i.$viewport.width.value < 1e3 ? s.value : T.direction;
                    T.scroll > g.value && E < 0 ? u.value = !0 : (E > 0 || T.scroll < g.value) && (u.value = !1)
                };
            return Ut(f, (T, E) => {
                s.value = E - T < 0 ? 1 : -1
            }), it(() => {
                i.$on("mode", y),
                i.$on("loader-transition-end", m),
                r(b)
            }), wt(() => {
                i.$off("mode", y),
                i.$off("loader-transition-end", m),
                o(b)
            }), (T, E) => {
                const P = Tm,
                    H = Pm,
                    k = $m;
                return oe(), Ee("div", {
                    class: vt(ne(l))
                }, [B(P, {
                    open: ne(c),
                    onToggle: E[0] || (E[0] = M => p())
                }, null, 8, ["open"]), B(H, {
                    show: ne(d),
                    onToggle: E[1] || (E[1] = M => p())
                }, null, 8, ["show"]), B(k, {
                    open: ne(c),
                    infos: e.infos,
                    onToggle: E[2] || (E[2] = M => p())
                }, null, 8, ["open", "infos"])], 2)
            }
        }
    },
    Vm = (e, t) => t.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, n => {
        var r;
        return ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ""
    }),
    Um = (e, t) => {
        const n = e.route.matched.find(o => {
                var i;
                return ((i = o.components) == null ? void 0 : i.default) === e.Component.type
            }),
            r = t ?? (n == null ? void 0 : n.meta.key) ?? (n && Vm(e.route, n));
        return typeof r == "function" ? r(e.route) : r
    },
    Wm = (e, t) => ({
        default: () => e ? et(ru, e === !0 ? {} : e, t) : t
    }),
    Km = Pt({
        name: "FragmentWrapper",
        setup(e, {slots: t}) {
            return () => {
                var n;
                return (n = t.default) == null ? void 0 : n.call(t)
            }
        }
    }),
    Ko = (e, t, n) => ({
        default: () => t ? et(e, t === !0 ? {} : t, n) : et(Km, {}, n)
    }),
    qm = Pt({
        name: "NuxtPage",
        inheritAttrs: !1,
        props: {
            name: {
                type: String
            },
            transition: {
                type: [Boolean, Object],
                default: void 0
            },
            keepalive: {
                type: [Boolean, Object],
                default: void 0
            },
            route: {
                type: Object
            },
            pageKey: {
                type: [Function, String],
                default: null
            }
        },
        setup(e, {attrs: t}) {
            const n = ue();
            return () => et(Rl, {
                name: e.name,
                route: e.route,
                ...t
            }, {
                default: r => {
                    if (!r.Component)
                        return;
                    const o = Um(r, e.pageKey),
                        i = n.deferHydration(),
                        a = !!(e.transition ?? r.route.meta.pageTransition ?? Oo),
                        c = a && Zm([e.transition, r.route.meta.pageTransition, Oo, {
                            onAfterLeave: () => {
                                n.callHook("page:transition:finish", r.Component)
                            }
                        }].filter(Boolean));
                    return Ko(kt, a && c, Wm(e.keepalive ?? r.route.meta.keepalive ?? mp, et(Aa, {
                        onPending: () => n.callHook("page:start", r.Component),
                        onResolve: () => {
                            Pn(() => n.callHook("page:finish", r.Component).finally(i))
                        }
                    }, {
                        default: () => et(Gm, {
                            key: o,
                            routeProps: r,
                            pageKey: o,
                            hasTransition: a
                        })
                    }))).default()
                }
            })
        }
    });
function zm(e) {
    return Array.isArray(e) ? e : e ? [e] : []
}
function Zm(e) {
    const t = e.map(n => ({
        ...n,
        onAfterLeave: zm(n.onAfterLeave)
    }));
    return Eh(...t)
}
const Gm = Pt({
        name: "RouteProvider",
        props: ["routeProps", "pageKey", "hasTransition"],
        setup(e) {
            const t = e.pageKey,
                n = e.routeProps.route,
                r = {};
            for (const o in e.routeProps.route)
                r[o] = le(() => t === e.pageKey ? e.routeProps.route[o] : n[o]);
            return vn("_route", bt(r)), () => et(e.routeProps.Component)
        }
    }),
    Xm = Pt({
        name: "LayoutLoader",
        inheritAttrs: !1,
        props: {
            name: String
        },
        async setup(e, t) {
            const n = await dn[e.name]().then(r => r.default || r);
            return () => et(n, t.attrs, t.slots)
        }
    }),
    Ym = Pt({
        name: "NuxtLayout",
        inheritAttrs: !1,
        props: {
            name: {
                type: [String, Boolean, Object],
                default: null
            }
        },
        setup(e, t) {
            const n = Je("_route"),
                r = n === Ur() ? Th() : n,
                o = le(() => ne(e.name) ?? r.meta.layout ?? "default");
            return () => {
                const i = o.value && o.value in dn,
                    a = r.meta.layoutTransition ?? _p;
                return Ko(kt, i && a, {
                    default: () => Ko(Xm, i && {
                        key: o.value,
                        name: o.value,
                        ...t.attrs
                    }, t.slots).default()
                }).default()
            }
        }
    });
function Qm() {
    const e = Rt(),
        t = ue();
    Ms();
    const n = tr("before-route", () => !1),
        r = z(!1),
        o = () => {
            r.value = !0
        },
        i = () => {
            r.value = !1
        },
        a = (c, u, f) => {
            c.meta.layout === "projects" && u.meta.layout === "projects" && r.value ? (f(), i()) : t.$emit("loader-show", f),
            c.meta.layout !== "projects" && t.$sound.setSource("default")
        };
    return it(() => {
        n.value || (e.beforeEach(a), t.$on("block-fold", o), t.$on("unblock-fold", i), n.value = !0)
    }), {
        instanced: n
    }
}
function Jm() {
    const {gtag: {id: e}} = sn().public;
    return e ? Vo : () => {}
}
const eg = {
        class: "app"
    },
    tg = {
        __name: "app",
        async setup(e) {
            let t,
                n;
            const r = ue(),
                o = sn(),
                i = Ms(),
                a = Ur(),
                {init: c, destroy: u} = Dl();
            Qm(),
            Jm();
            const [{data: f}, {data: _}, {data: s}] = ([t, n] = Uu(() => Promise.all([lo("site-options", () => $fetch(o.public.apiACF + "/options/site-options")), lo("options-case-studies", () => $fetch(o.public.apiACF + "/options/options-case-studies")), lo("tag-case-studies", () => $fetch(o.public.apiBase + "/tag-case-studies"))])), t = await t, n(), t);
            return f.value && (i.value.options = f.value.acf), _.value && (i.value.cases = _.value.acf), s.value && (i.value.tags = s.value), a.meta.layout !== "projects" && r.$sound.setSource("default"), it(() => {
                c(),
                setTimeout(() => {
                    r.$viewport.trigger()
                }, 1e3)
            }), Jn(() => {
                u()
            }), (l, d) => {
                const h = z_,
                    g = jm,
                    y = qm,
                    p = Ym;
                return oe(), Ee("div", eg, [B(h), B(g), B(p, null, {
                    default: ee(() => [B(y)]),
                    _: 1
                })])
            }
        }
    },
    Wi = {
        __name: "nuxt-root",
        setup(e) {
            const t = tu(() => Fe(() => import("./error-component.b891bc01.js"), ["./error-component.b891bc01.js", "./Button.cbf10bed.js", "./Button.efdb5afc.css", "./error-component.cc00ed2a.css"], import.meta.url).then(u => u.default || u)),
                n = () => null,
                r = ue(),
                o = r.deferHydration(),
                i = !1;
            vn("_route", Ur()),
            r.hooks.callHookWith(u => u.map(f => f()), "vue:setup");
            const a = Wr();
            La((u, f, _) => {
                if (r.hooks.callHook("vue:error", u, f, _).catch(s => console.error("[nuxt] Error in `vue:error` hook", s)), Rh(u) && (u.fatal || u.unhandled))
                    return Ct(r, fn, [u]), !1
            });
            const {islandContext: c} = !1;
            return (u, f) => (oe(), Qe(Aa, {
                onResolve: ne(o)
            }, {
                default: ee(() => [ne(a) ? (oe(), Qe(ne(t), {
                    key: 0,
                    error: ne(a)
                }, null, 8, ["error"])) : ne(c) ? (oe(), Qe(ne(n), {
                    key: 1,
                    context: ne(c)
                }, null, 8, ["context"])) : ne(i) ? (oe(), Qe($a(ne(i)), {
                    key: 2
                })) : (oe(), Qe(ne(tg), {
                    key: 3
                }))]),
                _: 1
            }, 8, ["onResolve"]))
        }
    };
globalThis.$fetch || (globalThis.$fetch = nd.create({
    baseURL: od()
}));
let Ki;
const ng = bd(V_);
Ki = async function() {
    var o,
        i;
    const n = !!((o = window.__NUXT__) != null && o.serverRendered || ((i = document.getElementById("__NUXT_DATA__")) == null ? void 0 : i.dataset.ssr) === "true") ? vf(Wi) : gf(Wi),
        r = gd({
            vueApp: n
        });
    try {
        await yd(r, ng)
    } catch (a) {
        await r.callHook("app:error", a),
        r.payload.error = r.payload.error || a
    }
    try {
        await r.hooks.callHook("app:created", n),
        await r.hooks.callHook("app:beforeMount", n),
        n.mount("#" + gp),
        await r.hooks.callHook("app:mounted", n),
        await Pn()
    } catch (a) {
        await r.callHook("app:error", a),
        r.payload.error = r.payload.error || a
    }
},
Ki().catch(e => {
    console.error("Error while mounting app:", e)
});
export { on as A, co as B, ds as C, $a as D, Ms as E, Re as F, Dl as G, Ph as H, Ur as I, Uu as J, As as K, lo as L, sn as M, pp as N, pm as O, Pn as P, du as Q, Es as R, Oa as S, kt as T, Uo as U, Yc as V, Rr as W, og as X, un as Y, dm as Z, z_ as _, wt as a, oe as b, Ee as c, pe as d, Rt as e, Qm as f, B as g, Mh as h, jm as i, le as j, ne as k, Qe as l, Nt as m, vt as n, it as o, mm as p, tr as q, z as r, cu as s, xe as t, ue as u, uo as v, ee as w, rg as x, ar as y, Jn as z };
