(self.webpackChunkinapps_tada_rd = self.webpackChunkinapps_tada_rd || []).push([[179], {
    187: (xi,U,tn)=>{
        "use strict";
        function te(e) {
            return "function" == typeof e
        }
        function b(e) {
            const n = e(r=>{
                Error.call(r),
                r.stack = (new Error).stack
            }
            );
            return n.prototype = Object.create(Error.prototype),
            n.prototype.constructor = n,
            n
        }
        const Ln = b(e=>function(n) {
            e(this),
            this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map((r,o)=>`${o + 1}) ${r.toString()}`).join("\n  ")}` : "",
            this.name = "UnsubscriptionError",
            this.errors = n
        }
        );
        function fo(e, t) {
            if (e) {
                const n = e.indexOf(t);
                0 <= n && e.splice(n, 1)
            }
        }
        class wt {
            constructor(t) {
                this.initialTeardown = t,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
            }
            unsubscribe() {
                let t;
                if (!this.closed) {
                    this.closed = !0;
                    const {_parentage: n} = this;
                    if (n)
                        if (this._parentage = null,
                        Array.isArray(n))
                            for (const i of n)
                                i.remove(this);
                        else
                            n.remove(this);
                    const {initialTeardown: r} = this;
                    if (te(r))
                        try {
                            r()
                        } catch (i) {
                            t = i instanceof Ln ? i.errors : [i]
                        }
                    const {_finalizers: o} = this;
                    if (o) {
                        this._finalizers = null;
                        for (const i of o)
                            try {
                                yn(i)
                            } catch (s) {
                                t = t ?? [],
                                s instanceof Ln ? t = [...t, ...s.errors] : t.push(s)
                            }
                    }
                    if (t)
                        throw new Ln(t)
                }
            }
            add(t) {
                var n;
                if (t && t !== this)
                    if (this.closed)
                        yn(t);
                    else {
                        if (t instanceof wt) {
                            if (t.closed || t._hasParent(this))
                                return;
                            t._addParent(this)
                        }
                        (this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                    }
            }
            _hasParent(t) {
                const {_parentage: n} = this;
                return n === t || Array.isArray(n) && n.includes(t)
            }
            _addParent(t) {
                const {_parentage: n} = this;
                this._parentage = Array.isArray(n) ? (n.push(t),
                n) : n ? [n, t] : t
            }
            _removeParent(t) {
                const {_parentage: n} = this;
                n === t ? this._parentage = null : Array.isArray(n) && fo(n, t)
            }
            remove(t) {
                const {_finalizers: n} = this;
                n && fo(n, t),
                t instanceof wt && t._removeParent(this)
            }
        }
        wt.EMPTY = (()=>{
            const e = new wt;
            return e.closed = !0,
            e
        }
        )();
        const ho = wt.EMPTY;
        function ze(e) {
            return e instanceof wt || e && "closed"in e && te(e.remove) && te(e.add) && te(e.unsubscribe)
        }
        function yn(e) {
            te(e) ? e() : e.unsubscribe()
        }
        const wn = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1
        }
          , po = {
            setTimeout(e, t, ...n) {
                const {delegate: r} = po;
                return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
            },
            clearTimeout(e) {
                const {delegate: t} = po;
                return (t?.clearTimeout || clearTimeout)(e)
            },
            delegate: void 0
        };
        function oa(e) {
            po.setTimeout(()=>{
                const {onUnhandledError: t} = wn;
                if (!t)
                    throw e;
                t(e)
            }
            )
        }
        function Ar() {}
        const Ei = Te("C", void 0, void 0);
        function Te(e, t, n) {
            return {
                kind: e,
                value: t,
                error: n
            }
        }
        let St = null;
        function je(e) {
            if (wn.useDeprecatedSynchronousErrorHandling) {
                const t = !St;
                if (t && (St = {
                    errorThrown: !1,
                    error: null
                }),
                e(),
                t) {
                    const {errorThrown: n, error: r} = St;
                    if (St = null,
                    n)
                        throw r
                }
            } else
                e()
        }
        class Bn extends wt {
            constructor(t) {
                super(),
                this.isStopped = !1,
                t ? (this.destination = t,
                ze(t) && t.add(this)) : this.destination = $n
            }
            static create(t, n, r) {
                return new lr(t,n,r)
            }
            next(t) {
                this.isStopped ? lt(function Pi(e) {
                    return Te("N", e, void 0)
                }(t), this) : this._next(t)
            }
            error(t) {
                this.isStopped ? lt(function kr(e) {
                    return Te("E", void 0, e)
                }(t), this) : (this.isStopped = !0,
                this._error(t))
            }
            complete() {
                this.isStopped ? lt(Ei, this) : (this.isStopped = !0,
                this._complete())
            }
            unsubscribe() {
                this.closed || (this.isStopped = !0,
                super.unsubscribe(),
                this.destination = null)
            }
            _next(t) {
                this.destination.next(t)
            }
            _error(t) {
                try {
                    this.destination.error(t)
                } finally {
                    this.unsubscribe()
                }
            }
            _complete() {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
        }
        const bc = Function.prototype.bind;
        function go(e, t) {
            return bc.call(e, t)
        }
        class mo {
            constructor(t) {
                this.partialObserver = t
            }
            next(t) {
                const {partialObserver: n} = this;
                if (n.next)
                    try {
                        n.next(t)
                    } catch (r) {
                        cr(r)
                    }
            }
            error(t) {
                const {partialObserver: n} = this;
                if (n.error)
                    try {
                        n.error(t)
                    } catch (r) {
                        cr(r)
                    }
                else
                    cr(t)
            }
            complete() {
                const {partialObserver: t} = this;
                if (t.complete)
                    try {
                        t.complete()
                    } catch (n) {
                        cr(n)
                    }
            }
        }
        class lr extends Bn {
            constructor(t, n, r) {
                let o;
                if (super(),
                te(t) || !t)
                    o = {
                        next: t ?? void 0,
                        error: n ?? void 0,
                        complete: r ?? void 0
                    };
                else {
                    let i;
                    this && wn.useDeprecatedNextContext ? (i = Object.create(t),
                    i.unsubscribe = ()=>this.unsubscribe(),
                    o = {
                        next: t.next && go(t.next, i),
                        error: t.error && go(t.error, i),
                        complete: t.complete && go(t.complete, i)
                    }) : o = t
                }
                this.destination = new mo(o)
            }
        }
        function cr(e) {
            wn.useDeprecatedSynchronousErrorHandling ? function se(e) {
                wn.useDeprecatedSynchronousErrorHandling && St && (St.errorThrown = !0,
                St.error = e)
            }(e) : oa(e)
        }
        function lt(e, t) {
            const {onStoppedNotification: n} = wn;
            n && po.setTimeout(()=>n(e, t))
        }
        const $n = {
            closed: !0,
            next: Ar,
            error: function yo(e) {
                throw e
            },
            complete: Ar
        }
          , Ut = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function jn(e) {
            return e
        }
        function dr(e) {
            return 0 === e.length ? jn : 1 === e.length ? e[0] : function(n) {
                return e.reduce((r,o)=>o(r), n)
            }
        }
        let De = (()=>{
            class e {
                constructor(n) {
                    n && (this._subscribe = n)
                }
                lift(n) {
                    const r = new e;
                    return r.source = this,
                    r.operator = n,
                    r
                }
                subscribe(n, r, o) {
                    const i = function _c(e) {
                        return e && e instanceof Bn || function Si(e) {
                            return e && te(e.next) && te(e.error) && te(e.complete)
                        }(e) && ze(e)
                    }(n) ? n : new lr(n,r,o);
                    return je(()=>{
                        const {operator: s, source: a} = this;
                        i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                    }
                    ),
                    i
                }
                _trySubscribe(n) {
                    try {
                        return this._subscribe(n)
                    } catch (r) {
                        n.error(r)
                    }
                }
                forEach(n, r) {
                    return new (r = Rr(r))((o,i)=>{
                        const s = new lr({
                            next: a=>{
                                try {
                                    n(a)
                                } catch (l) {
                                    i(l),
                                    s.unsubscribe()
                                }
                            }
                            ,
                            error: i,
                            complete: o
                        });
                        this.subscribe(s)
                    }
                    )
                }
                _subscribe(n) {
                    var r;
                    return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                }
                [Ut]() {
                    return this
                }
                pipe(...n) {
                    return dr(n)(this)
                }
                toPromise(n) {
                    return new (n = Rr(n))((r,o)=>{
                        let i;
                        this.subscribe(s=>i = s, s=>o(s), ()=>r(i))
                    }
                    )
                }
            }
            return e.create = t=>new e(t),
            e
        }
        )();
        function Rr(e) {
            var t;
            return null !== (t = e ?? wn.Promise) && void 0 !== t ? t : Promise
        }
        const Ii = b(e=>function() {
            e(this),
            this.name = "ObjectUnsubscribedError",
            this.message = "object unsubscribed"
        }
        );
        let It = (()=>{
            class e extends De {
                constructor() {
                    super(),
                    this.closed = !1,
                    this.currentObservers = null,
                    this.observers = [],
                    this.isStopped = !1,
                    this.hasError = !1,
                    this.thrownError = null
                }
                lift(n) {
                    const r = new Nr(this,this);
                    return r.operator = n,
                    r
                }
                _throwIfClosed() {
                    if (this.closed)
                        throw new Ii
                }
                next(n) {
                    je(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.currentObservers || (this.currentObservers = Array.from(this.observers));
                            for (const r of this.currentObservers)
                                r.next(n)
                        }
                    }
                    )
                }
                error(n) {
                    je(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.hasError = this.isStopped = !0,
                            this.thrownError = n;
                            const {observers: r} = this;
                            for (; r.length; )
                                r.shift().error(n)
                        }
                    }
                    )
                }
                complete() {
                    je(()=>{
                        if (this._throwIfClosed(),
                        !this.isStopped) {
                            this.isStopped = !0;
                            const {observers: n} = this;
                            for (; n.length; )
                                n.shift().complete()
                        }
                    }
                    )
                }
                unsubscribe() {
                    this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
                }
                get observed() {
                    var n;
                    return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                }
                _trySubscribe(n) {
                    return this._throwIfClosed(),
                    super._trySubscribe(n)
                }
                _subscribe(n) {
                    return this._throwIfClosed(),
                    this._checkFinalizedStatuses(n),
                    this._innerSubscribe(n)
                }
                _innerSubscribe(n) {
                    const {hasError: r, isStopped: o, observers: i} = this;
                    return r || o ? ho : (this.currentObservers = null,
                    i.push(n),
                    new wt(()=>{
                        this.currentObservers = null,
                        fo(i, n)
                    }
                    ))
                }
                _checkFinalizedStatuses(n) {
                    const {hasError: r, thrownError: o, isStopped: i} = this;
                    r ? n.error(o) : i && n.complete()
                }
                asObservable() {
                    const n = new De;
                    return n.source = this,
                    n
                }
            }
            return e.create = (t,n)=>new Nr(t,n),
            e
        }
        )();
        class Nr extends It {
            constructor(t, n) {
                super(),
                this.destination = t,
                this.source = n
            }
            next(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
            }
            error(t) {
                var n, r;
                null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
            }
            complete() {
                var t, n;
                null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
            }
            _subscribe(t) {
                var n, r;
                return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : ho
            }
        }
        function ia(e) {
            return te(e?.lift)
        }
        function ye(e) {
            return t=>{
                if (ia(t))
                    return t.lift(function(n) {
                        try {
                            return e(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                throw new TypeError("Unable to lift unknown Observable type")
            }
        }
        function ae(e, t, n, r, o) {
            return new nn(e,t,n,r,o)
        }
        class nn extends Bn {
            constructor(t, n, r, o, i, s) {
                super(t),
                this.onFinalize = i,
                this.shouldUnsubscribe = s,
                this._next = n ? function(a) {
                    try {
                        n(a)
                    } catch (l) {
                        t.error(l)
                    }
                }
                : super._next,
                this._error = o ? function(a) {
                    try {
                        o(a)
                    } catch (l) {
                        t.error(l)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._error,
                this._complete = r ? function() {
                    try {
                        r()
                    } catch (a) {
                        t.error(a)
                    } finally {
                        this.unsubscribe()
                    }
                }
                : super._complete
            }
            unsubscribe() {
                var t;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    const {closed: n} = this;
                    super.unsubscribe(),
                    !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                }
            }
        }
        function Q(e, t) {
            return ye((n,r)=>{
                let o = 0;
                n.subscribe(ae(r, i=>{
                    r.next(e.call(t, i, o++))
                }
                ))
            }
            )
        }
        function Un(e) {
            return this instanceof Un ? (this.v = e,
            this) : new Un(e)
        }
        function Sc(e) {
            if (!Symbol.asyncIterator)
                throw new TypeError("Symbol.asyncIterator is not defined.");
            var n, t = e[Symbol.asyncIterator];
            return t ? t.call(e) : (e = function Ti(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }(e),
            n = {},
            r("next"),
            r("throw"),
            r("return"),
            n[Symbol.asyncIterator] = function() {
                return this
            }
            ,
            n);
            function r(i) {
                n[i] = e[i] && function(s) {
                    return new Promise(function(a, l) {
                        !function o(i, s, a, l) {
                            Promise.resolve(l).then(function(u) {
                                i({
                                    value: u,
                                    done: a
                                })
                            }, s)
                        }(a, l, (s = e[i](s)).done, s.value)
                    }
                    )
                }
            }
        }
        const vo = e=>e && "number" == typeof e.length && "function" != typeof e;
        function la(e) {
            return te(e?.then)
        }
        function ca(e) {
            return te(e[Ut])
        }
        function fr(e) {
            return Symbol.asyncIterator && te(e?.[Symbol.asyncIterator])
        }
        function ua(e) {
            return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
        }
        const da = function Ic() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }();
        function fa(e) {
            return te(e?.[da])
        }
        function Co(e) {
            return function Ec(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var o, r = n.apply(e, t || []), i = [];
                return o = {},
                s("next"),
                s("throw"),
                s("return"),
                o[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                o;
                function s(g) {
                    r[g] && (o[g] = function(y) {
                        return new Promise(function(w, C) {
                            i.push([g, y, w, C]) > 1 || a(g, y)
                        }
                        )
                    }
                    )
                }
                function a(g, y) {
                    try {
                        !function l(g) {
                            g.value instanceof Un ? Promise.resolve(g.value.v).then(u, f) : p(i[0][2], g)
                        }(r[g](y))
                    } catch (w) {
                        p(i[0][3], w)
                    }
                }
                function u(g) {
                    a("next", g)
                }
                function f(g) {
                    a("throw", g)
                }
                function p(g, y) {
                    g(y),
                    i.shift(),
                    i.length && a(i[0][0], i[0][1])
                }
            }(this, arguments, function*() {
                const n = e.getReader();
                try {
                    for (; ; ) {
                        const {value: r, done: o} = yield Un(n.read());
                        if (o)
                            return yield Un(void 0);
                        yield yield Un(r)
                    }
                } finally {
                    n.releaseLock()
                }
            })
        }
        function ha(e) {
            return te(e?.getReader)
        }
        function Ht(e) {
            if (e instanceof De)
                return e;
            if (null != e) {
                if (ca(e))
                    return function Oc(e) {
                        return new De(t=>{
                            const n = e[Ut]();
                            if (te(n.subscribe))
                                return n.subscribe(t);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        }
                        )
                    }(e);
                if (vo(e))
                    return function Tc(e) {
                        return new De(t=>{
                            for (let n = 0; n < e.length && !t.closed; n++)
                                t.next(e[n]);
                            t.complete()
                        }
                        )
                    }(e);
                if (la(e))
                    return function Ac(e) {
                        return new De(t=>{
                            e.then(n=>{
                                t.closed || (t.next(n),
                                t.complete())
                            }
                            , n=>t.error(n)).then(null, oa)
                        }
                        )
                    }(e);
                if (fr(e))
                    return pa(e);
                if (fa(e))
                    return function kc(e) {
                        return new De(t=>{
                            for (const n of e)
                                if (t.next(n),
                                t.closed)
                                    return;
                            t.complete()
                        }
                        )
                    }(e);
                if (ha(e))
                    return function Rc(e) {
                        return pa(Co(e))
                    }(e)
            }
            throw ua(e)
        }
        function pa(e) {
            return new De(t=>{
                (function Nc(e, t) {
                    var n, r, o, i;
                    return function wo(e, t, n, r) {
                        return new (n || (n = Promise))(function(i, s) {
                            function a(f) {
                                try {
                                    u(r.next(f))
                                } catch (p) {
                                    s(p)
                                }
                            }
                            function l(f) {
                                try {
                                    u(r.throw(f))
                                } catch (p) {
                                    s(p)
                                }
                            }
                            function u(f) {
                                f.done ? i(f.value) : function o(i) {
                                    return i instanceof n ? i : new n(function(s) {
                                        s(i)
                                    }
                                    )
                                }(f.value).then(a, l)
                            }
                            u((r = r.apply(e, t || [])).next())
                        }
                        )
                    }(this, void 0, void 0, function*() {
                        try {
                            for (n = Sc(e); !(r = yield n.next()).done; )
                                if (t.next(r.value),
                                t.closed)
                                    return
                        } catch (s) {
                            o = {
                                error: s
                            }
                        } finally {
                            try {
                                r && !r.done && (i = n.return) && (yield i.call(n))
                            } finally {
                                if (o)
                                    throw o.error
                            }
                        }
                        t.complete()
                    })
                }
                )(e, t).catch(n=>t.error(n))
            }
            )
        }
        function on(e, t, n, r=0, o=!1) {
            const i = t.schedule(function() {
                n(),
                o ? e.add(this.schedule(null, r)) : this.unsubscribe()
            }, r);
            if (e.add(i),
            !o)
                return i
        }
        function Ee(e, t, n=1 / 0) {
            return te(t) ? Ee((r,o)=>Q((i,s)=>t(r, i, o, s))(Ht(e(r, o))), n) : ("number" == typeof t && (n = t),
            ye((r,o)=>function Fc(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0
                  , f = 0
                  , p = !1;
                const g = ()=>{
                    p && !l.length && !u && t.complete()
                }
                  , y = C=>u < r ? w(C) : l.push(C)
                  , w = C=>{
                    i && t.next(C),
                    u++;
                    let v = !1;
                    Ht(n(C, f++)).subscribe(ae(t, M=>{
                        o?.(M),
                        i ? y(M) : t.next(M)
                    }
                    , ()=>{
                        v = !0
                    }
                    , void 0, ()=>{
                        if (v)
                            try {
                                for (u--; l.length && u < r; ) {
                                    const M = l.shift();
                                    s ? on(t, s, ()=>w(M)) : w(M)
                                }
                                g()
                            } catch (M) {
                                t.error(M)
                            }
                    }
                    ))
                }
                ;
                return e.subscribe(ae(t, y, ()=>{
                    p = !0,
                    g()
                }
                )),
                ()=>{
                    a?.()
                }
            }(r, o, e, n)))
        }
        function zt(e=1 / 0) {
            return Ee(jn, e)
        }
        const Ot = new De(e=>e.complete());
        function Ri(e) {
            return e[e.length - 1]
        }
        function hr(e) {
            return function Lc(e) {
                return e && te(e.schedule)
            }(Ri(e)) ? e.pop() : void 0
        }
        function ga(e, t=0) {
            return ye((n,r)=>{
                n.subscribe(ae(r, o=>on(r, e, ()=>r.next(o), t), ()=>on(r, e, ()=>r.complete(), t), o=>on(r, e, ()=>r.error(o), t)))
            }
            )
        }
        function ma(e, t=0) {
            return ye((n,r)=>{
                r.add(e.schedule(()=>n.subscribe(r), t))
            }
            )
        }
        function va(e, t) {
            if (!e)
                throw new Error("Iterable cannot be null");
            return new De(n=>{
                on(n, t, ()=>{
                    const r = e[Symbol.asyncIterator]();
                    on(n, t, ()=>{
                        r.next().then(o=>{
                            o.done ? n.complete() : n.next(o.value)
                        }
                        )
                    }
                    , 0, !0)
                }
                )
            }
            )
        }
        function Pe(e, t) {
            return t ? function Hc(e, t) {
                if (null != e) {
                    if (ca(e))
                        return function ya(e, t) {
                            return Ht(e).pipe(ma(t), ga(t))
                        }(e, t);
                    if (vo(e))
                        return function wa(e, t) {
                            return new De(n=>{
                                let r = 0;
                                return t.schedule(function() {
                                    r === e.length ? n.complete() : (n.next(e[r++]),
                                    n.closed || this.schedule())
                                })
                            }
                            )
                        }(e, t);
                    if (la(e))
                        return function jc(e, t) {
                            return Ht(e).pipe(ma(t), ga(t))
                        }(e, t);
                    if (fr(e))
                        return va(e, t);
                    if (fa(e))
                        return function Vc(e, t) {
                            return new De(n=>{
                                let r;
                                return on(n, t, ()=>{
                                    r = e[da](),
                                    on(n, t, ()=>{
                                        let o, i;
                                        try {
                                            ({value: o, done: i} = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        i ? n.complete() : n.next(o)
                                    }
                                    , 0, !0)
                                }
                                ),
                                ()=>te(r?.return) && r.return()
                            }
                            )
                        }(e, t);
                    if (ha(e))
                        return function Uc(e, t) {
                            return va(Co(e), t)
                        }(e, t)
                }
                throw ua(e)
            }(e, t) : Ht(e)
        }
        function bo(e, t, ...n) {
            if (!0 === t)
                return void e();
            if (!1 === t)
                return;
            const r = new lr({
                next: ()=>{
                    r.unsubscribe(),
                    e()
                }
            });
            return t(...n).subscribe(r)
        }
        function ue(e) {
            for (let t in e)
                if (e[t] === ue)
                    return t;
            throw Error("Could not find renamed property on target object.")
        }
        function de(e) {
            if ("string" == typeof e)
                return e;
            if (Array.isArray(e))
                return "[" + e.map(de).join(", ") + "]";
            if (null == e)
                return "" + e;
            if (e.overriddenName)
                return `${e.overriddenName}`;
            if (e.name)
                return `${e.name}`;
            const t = e.toString();
            if (null == t)
                return "" + t;
            const n = t.indexOf("\n");
            return -1 === n ? t : t.substring(0, n)
        }
        function Fi(e, t) {
            return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
        }
        const Ca = ue({
            __forward_ref__: ue
        });
        function Li(e) {
            return e.__forward_ref__ = Li,
            e.toString = function() {
                return de(this())
            }
            ,
            e
        }
        function k(e) {
            return vn(e) ? e() : e
        }
        function vn(e) {
            return "function" == typeof e && e.hasOwnProperty(Ca) && e.__forward_ref__ === Li
        }
        function _o(e) {
            return e && !!e.\u0275providers
        }
        class E extends Error {
            constructor(t, n) {
                super(Mo(t, n)),
                this.code = t
            }
        }
        function Mo(e, t) {
            return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`
        }
        function V(e) {
            return "string" == typeof e ? e : null == e ? "" : String(e)
        }
        function Cn(e, t) {
            throw new E(-201,!1)
        }
        function qe(e, t) {
            null == e && function ce(e, t, n, r) {
                throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
            }(t, e, null, "!=")
        }
        function L(e) {
            return {
                token: e.token,
                providedIn: e.providedIn || null,
                factory: e.factory,
                value: void 0
            }
        }
        function _n(e) {
            return {
                providers: e.providers || [],
                imports: e.imports || []
            }
        }
        function Lr(e) {
            return Bi(e, Eo) || Bi(e, Ma)
        }
        function Bi(e, t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }
        function Da(e) {
            return e && (e.hasOwnProperty($i) || e.hasOwnProperty(pr)) ? e[$i] : null
        }
        const Eo = ue({
            \u0275prov: ue
        })
          , $i = ue({
            \u0275inj: ue
        })
          , Ma = ue({
            ngInjectableDef: ue
        })
          , pr = ue({
            ngInjectorDef: ue
        });
        var R = (()=>((R = R || {})[R.Default = 0] = "Default",
        R[R.Host = 1] = "Host",
        R[R.Self = 2] = "Self",
        R[R.SkipSelf = 4] = "SkipSelf",
        R[R.Optional = 8] = "Optional",
        R))();
        let ji;
        function ut(e) {
            const t = ji;
            return ji = e,
            t
        }
        function Vi(e, t, n) {
            const r = Lr(e);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & R.Optional ? null : void 0 !== t ? t : void Cn(de(e))
        }
        const he = (()=>typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)()
          , Br = {}
          , Ui = "__NG_DI_FLAG__"
          , Po = "ngTempTokenPath"
          , eu = "ngTokenPath"
          , Ea = /\n/gm
          , Hi = "\u0275"
          , zi = "__source";
        let Gt;
        function gr(e) {
            const t = Gt;
            return Gt = e,
            t
        }
        function tu(e, t=R.Default) {
            if (void 0 === Gt)
                throw new E(-203,!1);
            return null === Gt ? Vi(e, void 0, t) : Gt.get(e, t & R.Optional ? null : void 0, t)
        }
        function T(e, t=R.Default) {
            return (function Jc() {
                return ji
            }() || tu)(k(e), t)
        }
        function J(e, t=R.Default) {
            return T(e, So(t))
        }
        function So(e) {
            return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
        }
        function Gi(e) {
            const t = [];
            for (let n = 0; n < e.length; n++) {
                const r = k(e[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length)
                        throw new E(900,!1);
                    let o, i = R.Default;
                    for (let s = 0; s < r.length; s++) {
                        const a = r[s]
                          , l = nu(a);
                        "number" == typeof l ? -1 === l ? o = a.token : i |= l : o = a
                    }
                    t.push(T(o, i))
                } else
                    t.push(T(r))
            }
            return t
        }
        function $r(e, t) {
            return e[Ui] = t,
            e.prototype[Ui] = t,
            e
        }
        function nu(e) {
            return e[Ui]
        }
        function Dn(e) {
            return {
                toString: e
            }.toString()
        }
        var Tt = (()=>((Tt = Tt || {})[Tt.OnPush = 0] = "OnPush",
        Tt[Tt.Default = 1] = "Default",
        Tt))()
          , qt = (()=>{
            return (e = qt || (qt = {}))[e.Emulated = 0] = "Emulated",
            e[e.None = 2] = "None",
            e[e.ShadowDom = 3] = "ShadowDom",
            qt;
            var e
        }
        )();
        const At = {}
          , re = []
          , jr = ue({
            \u0275cmp: ue
        })
          , Vr = ue({
            \u0275dir: ue
        })
          , Wi = ue({
            \u0275pipe: ue
        })
          , Ia = ue({
            \u0275mod: ue
        })
          , sn = ue({
            \u0275fac: ue
        })
          , Mn = ue({
            __NG_ELEMENT_ID__: ue
        });
        let ou = 0;
        function xn(e) {
            return Dn(()=>{
                const n = !0 === e.standalone
                  , r = {}
                  , o = {
                    type: e.type,
                    providersResolver: null,
                    decls: e.decls,
                    vars: e.vars,
                    factory: null,
                    template: e.template || null,
                    consts: e.consts || null,
                    ngContentSelectors: e.ngContentSelectors,
                    hostBindings: e.hostBindings || null,
                    hostVars: e.hostVars || 0,
                    hostAttrs: e.hostAttrs || null,
                    contentQueries: e.contentQueries || null,
                    declaredInputs: r,
                    inputs: null,
                    outputs: null,
                    exportAs: e.exportAs || null,
                    onPush: e.changeDetection === Tt.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    standalone: n,
                    dependencies: n && e.dependencies || null,
                    getStandaloneInjector: null,
                    selectors: e.selectors || re,
                    viewQuery: e.viewQuery || null,
                    features: e.features || null,
                    data: e.data || {},
                    encapsulation: e.encapsulation || qt.Emulated,
                    id: "c" + ou++,
                    styles: e.styles || re,
                    _: null,
                    setInput: null,
                    schemas: e.schemas || null,
                    tView: null,
                    findHostDirectiveDefs: null,
                    hostDirectives: null
                }
                  , i = e.dependencies
                  , s = e.features;
                return o.inputs = Ta(e.inputs, r),
                o.outputs = Ta(e.outputs),
                s && s.forEach(a=>a(o)),
                o.directiveDefs = i ? ()=>("function" == typeof i ? i() : i).map(Oa).filter(Yi) : null,
                o.pipeDefs = i ? ()=>("function" == typeof i ? i() : i).map(Ze).filter(Yi) : null,
                o
            }
            )
        }
        function Oa(e) {
            return ie(e) || Ue(e)
        }
        function Yi(e) {
            return null !== e
        }
        function zn(e) {
            return Dn(()=>({
                type: e.type,
                bootstrap: e.bootstrap || re,
                declarations: e.declarations || re,
                imports: e.imports || re,
                exports: e.exports || re,
                transitiveCompileScopes: null,
                schemas: e.schemas || null,
                id: e.id || null
            }))
        }
        function Ta(e, t) {
            if (null == e)
                return At;
            const n = {};
            for (const r in e)
                if (e.hasOwnProperty(r)) {
                    let o = e[r]
                      , i = o;
                    Array.isArray(o) && (i = o[1],
                    o = o[0]),
                    n[o] = r,
                    t && (t[o] = i)
                }
            return n
        }
        const We = xn;
        function ie(e) {
            return e[jr] || null
        }
        function Ue(e) {
            return e[Vr] || null
        }
        function Ze(e) {
            return e[Wi] || null
        }
        function rt(e, t) {
            const n = e[Ia] || null;
            if (!n && !0 === t)
                throw new Error(`Type ${de(e)} does not have '\u0275mod' property.`);
            return n
        }
        const kt = 0
          , I = 1
          , G = 2
          , we = 3
          , Rt = 4
          , En = 5
          , He = 6
          , yr = 7
          , ve = 8
          , Io = 9
          , Oo = 10
          , W = 11
          , Zi = 12
          , Ur = 13
          , Aa = 14
          , Ct = 15
          , Ne = 16
          , Hr = 17
          , Gn = 18
          , Wt = 19
          , zr = 20
          , ka = 21
          , fe = 22
          , Ki = 1
          , Ra = 2
          , dt = 7
          , an = 8
          , wr = 9
          , Ke = 10;
        function ft(e) {
            return Array.isArray(e) && "object" == typeof e[Ki]
        }
        function Nt(e) {
            return Array.isArray(e) && !0 === e[Ki]
        }
        function Qi(e) {
            return 0 != (4 & e.flags)
        }
        function Gr(e) {
            return e.componentOffset > -1
        }
        function qn(e) {
            return 1 == (1 & e.flags)
        }
        function c(e) {
            return null !== e.template
        }
        function d(e) {
            return 0 != (256 & e[G])
        }
        function Wr(e, t) {
            return e.hasOwnProperty(sn) ? e[sn] : null
        }
        class YC {
            constructor(t, n, r) {
                this.previousValue = t,
                this.currentValue = n,
                this.firstChange = r
            }
            isFirstChange() {
                return this.firstChange
            }
        }
        function Yr() {
            return np
        }
        function np(e) {
            return e.type.prototype.ngOnChanges && (e.setInput = KC),
            ZC
        }
        function ZC() {
            const e = op(this)
              , t = e?.current;
            if (t) {
                const n = e.previous;
                if (n === At)
                    e.previous = t;
                else
                    for (let r in t)
                        n[r] = t[r];
                e.current = null,
                this.ngOnChanges(t)
            }
        }
        function KC(e, t, n, r) {
            const o = this.declaredInputs[n]
              , i = op(e) || function QC(e, t) {
                return e[rp] = t
            }(e, {
                previous: At,
                current: null
            })
              , s = i.current || (i.current = {})
              , a = i.previous
              , l = a[o];
            s[o] = new YC(l && l.currentValue,t,a === At),
            e[r] = t
        }
        Yr.ngInherit = !0;
        const rp = "__ngSimpleChanges__";
        function op(e) {
            return e[rp] || null
        }
        const Yt = function(e, t, n) {}
          , ip = "svg";
        function Qe(e) {
            for (; Array.isArray(e); )
                e = e[kt];
            return e
        }
        function Ft(e, t) {
            return Qe(t[e.index])
        }
        function Lt(e, t) {
            const n = t[e];
            return ft(n) ? n : n[kt]
        }
        function La(e) {
            return 64 == (64 & e[G])
        }
        function vr(e, t) {
            return null == t ? null : e[t]
        }
        function lp(e) {
            e[Gn] = 0
        }
        function lu(e, t) {
            e[En] += t;
            let n = e
              , r = e[we];
            for (; null !== r && (1 === t && 1 === n[En] || -1 === t && 0 === n[En]); )
                r[En] += t,
                n = r,
                r = r[we]
        }
        const H = {
            lFrame: wp(null),
            bindingsEnabled: !0
        };
        function up() {
            return H.bindingsEnabled
        }
        function x() {
            return H.lFrame.lView
        }
        function oe() {
            return H.lFrame.tView
        }
        function Xe() {
            let e = dp();
            for (; null !== e && 64 === e.type; )
                e = e.parent;
            return e
        }
        function dp() {
            return H.lFrame.currentTNode
        }
        function Pn(e, t) {
            const n = H.lFrame;
            n.currentTNode = e,
            n.isParent = t
        }
        function cu() {
            return H.lFrame.isParent
        }
        function fb(e, t) {
            const n = H.lFrame;
            n.bindingIndex = n.bindingRootIndex = e,
            du(t)
        }
        function du(e) {
            H.lFrame.currentDirectiveIndex = e
        }
        function hu(e) {
            H.lFrame.currentQueryIndex = e
        }
        function pb(e) {
            const t = e[I];
            return 2 === t.type ? t.declTNode : 1 === t.type ? e[He] : null
        }
        function mp(e, t, n) {
            if (n & R.SkipSelf) {
                let o = t
                  , i = e;
                for (; !(o = o.parent,
                null !== o || n & R.Host || (o = pb(i),
                null === o || (i = i[Ct],
                10 & o.type))); )
                    ;
                if (null === o)
                    return !1;
                t = o,
                e = i
            }
            const r = H.lFrame = yp();
            return r.currentTNode = t,
            r.lView = e,
            !0
        }
        function pu(e) {
            const t = yp()
              , n = e[I];
            H.lFrame = t,
            t.currentTNode = n.firstChild,
            t.lView = e,
            t.tView = n,
            t.contextLView = e,
            t.bindingIndex = n.bindingStartIndex,
            t.inI18n = !1
        }
        function yp() {
            const e = H.lFrame
              , t = null === e ? null : e.child;
            return null === t ? wp(e) : t
        }
        function wp(e) {
            const t = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: e,
                child: null,
                inI18n: !1
            };
            return null !== e && (e.child = t),
            t
        }
        function vp() {
            const e = H.lFrame;
            return H.lFrame = e.parent,
            e.currentTNode = null,
            e.lView = null,
            e
        }
        const Cp = vp;
        function gu() {
            const e = vp();
            e.isParent = !0,
            e.tView = null,
            e.selectedIndex = -1,
            e.contextLView = null,
            e.elementDepthCount = 0,
            e.currentDirectiveIndex = -1,
            e.currentNamespace = null,
            e.bindingRootIndex = -1,
            e.bindingIndex = -1,
            e.currentQueryIndex = 0
        }
        function pt() {
            return H.lFrame.selectedIndex
        }
        function Zr(e) {
            H.lFrame.selectedIndex = e
        }
        function Ba(e, t) {
            for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                const i = e.data[n].type.prototype
                  , {ngAfterContentInit: s, ngAfterContentChecked: a, ngAfterViewInit: l, ngAfterViewChecked: u, ngOnDestroy: f} = i;
                s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
                a && ((e.contentHooks || (e.contentHooks = [])).push(n, a),
                (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
                l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
                u && ((e.viewHooks || (e.viewHooks = [])).push(n, u),
                (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
                null != f && (e.destroyHooks || (e.destroyHooks = [])).push(n, f)
            }
        }
        function $a(e, t, n) {
            Dp(e, t, 3, n)
        }
        function ja(e, t, n, r) {
            (3 & e[G]) === n && Dp(e, t, n, r)
        }
        function mu(e, t) {
            let n = e[G];
            (3 & n) === t && (n &= 2047,
            n += 1,
            e[G] = n)
        }
        function Dp(e, t, n, r) {
            const i = r ?? -1
              , s = t.length - 1;
            let a = 0;
            for (let l = void 0 !== r ? 65535 & e[Gn] : 0; l < s; l++)
                if ("number" == typeof t[l + 1]) {
                    if (a = t[l],
                    null != r && a >= r)
                        break
                } else
                    t[l] < 0 && (e[Gn] += 65536),
                    (a < i || -1 == i) && (bb(e, n, t, l),
                    e[Gn] = (4294901760 & e[Gn]) + l + 2),
                    l++
        }
        function bb(e, t, n, r) {
            const o = n[r] < 0
              , i = n[r + 1]
              , a = e[o ? -n[r] : n[r]];
            if (o) {
                if (e[G] >> 11 < e[Gn] >> 16 && (3 & e[G]) === t) {
                    e[G] += 2048,
                    Yt(4, a, i);
                    try {
                        i.call(a)
                    } finally {
                        Yt(5, a, i)
                    }
                }
            } else {
                Yt(4, a, i);
                try {
                    i.call(a)
                } finally {
                    Yt(5, a, i)
                }
            }
        }
        const ko = -1;
        class Ji {
            constructor(t, n, r) {
                this.factory = t,
                this.resolving = !1,
                this.canSeeViewProviders = n,
                this.injectImpl = r
            }
        }
        function wu(e, t, n) {
            let r = 0;
            for (; r < n.length; ) {
                const o = n[r];
                if ("number" == typeof o) {
                    if (0 !== o)
                        break;
                    r++;
                    const i = n[r++]
                      , s = n[r++]
                      , a = n[r++];
                    e.setAttribute(t, s, a, i)
                } else {
                    const i = o
                      , s = n[++r];
                    xp(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s),
                    r++
                }
            }
            return r
        }
        function Mp(e) {
            return 3 === e || 4 === e || 6 === e
        }
        function xp(e) {
            return 64 === e.charCodeAt(0)
        }
        function es(e, t) {
            if (null !== t && 0 !== t.length)
                if (null === e || 0 === e.length)
                    e = t.slice();
                else {
                    let n = -1;
                    for (let r = 0; r < t.length; r++) {
                        const o = t[r];
                        "number" == typeof o ? n = o : 0 === n || Ep(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                    }
                }
            return e
        }
        function Ep(e, t, n, r, o) {
            let i = 0
              , s = e.length;
            if (-1 === t)
                s = -1;
            else
                for (; i < e.length; ) {
                    const a = e[i++];
                    if ("number" == typeof a) {
                        if (a === t) {
                            s = -1;
                            break
                        }
                        if (a > t) {
                            s = i - 1;
                            break
                        }
                    }
                }
            for (; i < e.length; ) {
                const a = e[i];
                if ("number" == typeof a)
                    break;
                if (a === n) {
                    if (null === r)
                        return void (null !== o && (e[i + 1] = o));
                    if (r === e[i + 1])
                        return void (e[i + 2] = o)
                }
                i++,
                null !== r && i++,
                null !== o && i++
            }
            -1 !== s && (e.splice(s, 0, t),
            i = s + 1),
            e.splice(i++, 0, n),
            null !== r && e.splice(i++, 0, r),
            null !== o && e.splice(i++, 0, o)
        }
        function Pp(e) {
            return e !== ko
        }
        function Va(e) {
            return 32767 & e
        }
        function Ua(e, t) {
            let n = function xb(e) {
                return e >> 16
            }(e)
              , r = t;
            for (; n > 0; )
                r = r[Ct],
                n--;
            return r
        }
        let vu = !0;
        function Ha(e) {
            const t = vu;
            return vu = e,
            t
        }
        const Sp = 255
          , Ip = 5;
        let Eb = 0;
        const Sn = {};
        function za(e, t) {
            const n = Op(e, t);
            if (-1 !== n)
                return n;
            const r = t[I];
            r.firstCreatePass && (e.injectorIndex = t.length,
            Cu(r.data, e),
            Cu(t, null),
            Cu(r.blueprint, null));
            const o = bu(e, t)
              , i = e.injectorIndex;
            if (Pp(o)) {
                const s = Va(o)
                  , a = Ua(o, t)
                  , l = a[I].data;
                for (let u = 0; u < 8; u++)
                    t[i + u] = a[s + u] | l[s + u]
            }
            return t[i + 8] = o,
            i
        }
        function Cu(e, t) {
            e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
        }
        function Op(e, t) {
            return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
        }
        function bu(e, t) {
            if (e.parent && -1 !== e.parent.injectorIndex)
                return e.parent.injectorIndex;
            let n = 0
              , r = null
              , o = t;
            for (; null !== o; ) {
                if (r = Bp(o),
                null === r)
                    return ko;
                if (n++,
                o = o[Ct],
                -1 !== r.injectorIndex)
                    return r.injectorIndex | n << 16
            }
            return ko
        }
        function _u(e, t, n) {
            !function Pb(e, t, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Mn) && (r = n[Mn]),
                null == r && (r = n[Mn] = Eb++);
                const o = r & Sp;
                t.data[e + (o >> Ip)] |= 1 << o
            }(e, t, n)
        }
        function Tp(e, t, n) {
            if (n & R.Optional || void 0 !== e)
                return e;
            Cn()
        }
        function Ap(e, t, n, r) {
            if (n & R.Optional && void 0 === r && (r = null),
            !(n & (R.Self | R.Host))) {
                const o = e[Io]
                  , i = ut(void 0);
                try {
                    return o ? o.get(t, r, n & R.Optional) : Vi(t, r, n & R.Optional)
                } finally {
                    ut(i)
                }
            }
            return Tp(r, 0, n)
        }
        function kp(e, t, n, r=R.Default, o) {
            if (null !== e) {
                if (1024 & t[G]) {
                    const s = function Ab(e, t, n, r, o) {
                        let i = e
                          , s = t;
                        for (; null !== i && null !== s && 1024 & s[G] && !(256 & s[G]); ) {
                            const a = Rp(i, s, n, r | R.Self, Sn);
                            if (a !== Sn)
                                return a;
                            let l = i.parent;
                            if (!l) {
                                const u = s[ka];
                                if (u) {
                                    const f = u.get(n, Sn, r);
                                    if (f !== Sn)
                                        return f
                                }
                                l = Bp(s),
                                s = s[Ct]
                            }
                            i = l
                        }
                        return o
                    }(e, t, n, r, Sn);
                    if (s !== Sn)
                        return s
                }
                const i = Rp(e, t, n, r, Sn);
                if (i !== Sn)
                    return i
            }
            return Ap(t, n, r, o)
        }
        function Rp(e, t, n, r, o) {
            const i = function Ob(e) {
                if ("string" == typeof e)
                    return e.charCodeAt(0) || 0;
                const t = e.hasOwnProperty(Mn) ? e[Mn] : void 0;
                return "number" == typeof t ? t >= 0 ? t & Sp : Tb : t
            }(n);
            if ("function" == typeof i) {
                if (!mp(t, e, r))
                    return r & R.Host ? Tp(o, 0, r) : Ap(t, n, r, o);
                try {
                    const s = i(r);
                    if (null != s || r & R.Optional)
                        return s;
                    Cn()
                } finally {
                    Cp()
                }
            } else if ("number" == typeof i) {
                let s = null
                  , a = Op(e, t)
                  , l = ko
                  , u = r & R.Host ? t[Ne][He] : null;
                for ((-1 === a || r & R.SkipSelf) && (l = -1 === a ? bu(e, t) : t[a + 8],
                l !== ko && Fp(r, !1) ? (s = t[I],
                a = Va(l),
                t = Ua(l, t)) : a = -1); -1 !== a; ) {
                    const f = t[I];
                    if (Np(i, a, f.data)) {
                        const p = Ib(a, t, n, s, r, u);
                        if (p !== Sn)
                            return p
                    }
                    l = t[a + 8],
                    l !== ko && Fp(r, t[I].data[a + 8] === u) && Np(i, a, t) ? (s = f,
                    a = Va(l),
                    t = Ua(l, t)) : a = -1
                }
            }
            return o
        }
        function Ib(e, t, n, r, o, i) {
            const s = t[I]
              , a = s.data[e + 8]
              , f = function Ga(e, t, n, r, o) {
                const i = e.providerIndexes
                  , s = t.data
                  , a = 1048575 & i
                  , l = e.directiveStart
                  , f = i >> 20
                  , g = o ? a + f : e.directiveEnd;
                for (let y = r ? a : a + f; y < g; y++) {
                    const w = s[y];
                    if (y < l && n === w || y >= l && w.type === n)
                        return y
                }
                if (o) {
                    const y = s[l];
                    if (y && c(y) && y.type === n)
                        return l
                }
                return null
            }(a, s, n, null == r ? Gr(a) && vu : r != s && 0 != (3 & a.type), o & R.Host && i === a);
            return null !== f ? Kr(t, s, f, a) : Sn
        }
        function Kr(e, t, n, r) {
            let o = e[n];
            const i = t.data;
            if (function _b(e) {
                return e instanceof Ji
            }(o)) {
                const s = o;
                s.resolving && function qc(e, t) {
                    const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                    throw new E(-200,`Circular dependency in DI detected for ${e}${n}`)
                }(function le(e) {
                    return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : V(e)
                }(i[n]));
                const a = Ha(s.canSeeViewProviders);
                s.resolving = !0;
                const l = s.injectImpl ? ut(s.injectImpl) : null;
                mp(e, r, R.Default);
                try {
                    o = e[n] = s.factory(void 0, i, e, r),
                    t.firstCreatePass && n >= r.directiveStart && function Cb(e, t, n) {
                        const {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = t.type.prototype;
                        if (r) {
                            const s = np(t);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                            (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s)
                        }
                        o && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                        i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                        (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, i))
                    }(n, i[n], t)
                } finally {
                    null !== l && ut(l),
                    Ha(a),
                    s.resolving = !1,
                    Cp()
                }
            }
            return o
        }
        function Np(e, t, n) {
            return !!(n[t + (e >> Ip)] & 1 << e)
        }
        function Fp(e, t) {
            return !(e & R.Self || e & R.Host && t)
        }
        class Ro {
            constructor(t, n) {
                this._tNode = t,
                this._lView = n
            }
            get(t, n, r) {
                return kp(this._tNode, this._lView, t, So(r), n)
            }
        }
        function Tb() {
            return new Ro(Xe(),x())
        }
        function Du(e) {
            return vn(e) ? ()=>{
                const t = Du(k(e));
                return t && t()
            }
            : Wr(e)
        }
        function Bp(e) {
            const t = e[I]
              , n = t.type;
            return 2 === n ? t.declTNode : 1 === n ? e[He] : null
        }
        const Fo = "__parameters__";
        function Bo(e, t, n) {
            return Dn(()=>{
                const r = function Mu(e) {
                    return function(...n) {
                        if (e) {
                            const r = e(...n);
                            for (const o in r)
                                this[o] = r[o]
                        }
                    }
                }(t);
                function o(...i) {
                    if (this instanceof o)
                        return r.apply(this, i),
                        this;
                    const s = new o(...i);
                    return a.annotation = s,
                    a;
                    function a(l, u, f) {
                        const p = l.hasOwnProperty(Fo) ? l[Fo] : Object.defineProperty(l, Fo, {
                            value: []
                        })[Fo];
                        for (; p.length <= f; )
                            p.push(null);
                        return (p[f] = p[f] || []).push(s),
                        l
                    }
                }
                return n && (o.prototype = Object.create(n.prototype)),
                o.prototype.ngMetadataName = e,
                o.annotationCls = o,
                o
            }
            )
        }
        class $ {
            constructor(t, n) {
                this._desc = t,
                this.ngMetadataName = "InjectionToken",
                this.\u0275prov = void 0,
                "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = L({
                    token: this,
                    providedIn: n.providedIn || "root",
                    factory: n.factory
                }))
            }
            get multi() {
                return this
            }
            toString() {
                return `InjectionToken ${this._desc}`
            }
        }
        function Qr(e, t) {
            e.forEach(n=>Array.isArray(n) ? Qr(n, t) : t(n))
        }
        function jp(e, t, n) {
            t >= e.length ? e.push(n) : e.splice(t, 0, n)
        }
        function Wa(e, t) {
            return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
        }
        const os = $r(Bo("Optional"), 8)
          , is = $r(Bo("SkipSelf"), 4);
        var _t = (()=>((_t = _t || {})[_t.Important = 1] = "Important",
        _t[_t.DashCase = 2] = "DashCase",
        _t))();
        const Au = new Map;
        let o_ = 0;
        const Ru = "__ngContext__";
        function it(e, t) {
            ft(t) ? (e[Ru] = t[zr],
            function s_(e) {
                Au.set(e[zr], e)
            }(t)) : e[Ru] = t
        }
        let Nu;
        function Fu(e, t) {
            return Nu(e, t)
        }
        function cs(e) {
            const t = e[we];
            return Nt(t) ? t[we] : t
        }
        function Lu(e) {
            return ag(e[Ur])
        }
        function Bu(e) {
            return ag(e[Rt])
        }
        function ag(e) {
            for (; null !== e && !Nt(e); )
                e = e[Rt];
            return e
        }
        function Vo(e, t, n, r, o) {
            if (null != r) {
                let i, s = !1;
                Nt(r) ? i = r : ft(r) && (s = !0,
                r = r[kt]);
                const a = Qe(r);
                0 === e && null !== n ? null == o ? hg(t, n, a) : Xr(t, n, a, o || null, !0) : 1 === e && null !== n ? Xr(t, n, a, o || null, !0) : 2 === e ? function Gu(e, t, n) {
                    const r = Qa(e, t);
                    r && function E_(e, t, n, r) {
                        e.removeChild(t, n, r)
                    }(e, r, t, n)
                }(t, a, s) : 3 === e && t.destroyNode(a),
                null != i && function I_(e, t, n, r, o) {
                    const i = n[dt];
                    i !== Qe(n) && Vo(t, e, r, i, o);
                    for (let a = Ke; a < n.length; a++) {
                        const l = n[a];
                        us(l[I], l, e, t, r, i)
                    }
                }(t, e, i, n, o)
            }
        }
        function ju(e, t, n) {
            return e.createElement(t, n)
        }
        function cg(e, t) {
            const n = e[wr]
              , r = n.indexOf(t)
              , o = t[we];
            512 & t[G] && (t[G] &= -513,
            lu(o, -1)),
            n.splice(r, 1)
        }
        function Vu(e, t) {
            if (e.length <= Ke)
                return;
            const n = Ke + t
              , r = e[n];
            if (r) {
                const o = r[Hr];
                null !== o && o !== e && cg(o, r),
                t > 0 && (e[n - 1][Rt] = r[Rt]);
                const i = Wa(e, Ke + t);
                !function w_(e, t) {
                    us(e, t, t[W], 2, null, null),
                    t[kt] = null,
                    t[He] = null
                }(r[I], r);
                const s = i[Wt];
                null !== s && s.detachView(i[I]),
                r[we] = null,
                r[Rt] = null,
                r[G] &= -65
            }
            return r
        }
        function ug(e, t) {
            if (!(128 & t[G])) {
                const n = t[W];
                n.destroyNode && us(e, t, n, 3, null, null),
                function b_(e) {
                    let t = e[Ur];
                    if (!t)
                        return Uu(e[I], e);
                    for (; t; ) {
                        let n = null;
                        if (ft(t))
                            n = t[Ur];
                        else {
                            const r = t[Ke];
                            r && (n = r)
                        }
                        if (!n) {
                            for (; t && !t[Rt] && t !== e; )
                                ft(t) && Uu(t[I], t),
                                t = t[we];
                            null === t && (t = e),
                            ft(t) && Uu(t[I], t),
                            n = t && t[Rt]
                        }
                        t = n
                    }
                }(t)
            }
        }
        function Uu(e, t) {
            if (!(128 & t[G])) {
                t[G] &= -65,
                t[G] |= 128,
                function x_(e, t) {
                    let n;
                    if (null != e && null != (n = e.destroyHooks))
                        for (let r = 0; r < n.length; r += 2) {
                            const o = t[n[r]];
                            if (!(o instanceof Ji)) {
                                const i = n[r + 1];
                                if (Array.isArray(i))
                                    for (let s = 0; s < i.length; s += 2) {
                                        const a = o[i[s]]
                                          , l = i[s + 1];
                                        Yt(4, a, l);
                                        try {
                                            l.call(a)
                                        } finally {
                                            Yt(5, a, l)
                                        }
                                    }
                                else {
                                    Yt(4, o, i);
                                    try {
                                        i.call(o)
                                    } finally {
                                        Yt(5, o, i)
                                    }
                                }
                            }
                        }
                }(e, t),
                function M_(e, t) {
                    const n = e.cleanup
                      , r = t[yr];
                    let o = -1;
                    if (null !== n)
                        for (let i = 0; i < n.length - 1; i += 2)
                            if ("string" == typeof n[i]) {
                                const s = n[i + 3];
                                s >= 0 ? r[o = s]() : r[o = -s].unsubscribe(),
                                i += 2
                            } else {
                                const s = r[o = n[i + 1]];
                                n[i].call(s)
                            }
                    if (null !== r) {
                        for (let i = o + 1; i < r.length; i++)
                            (0,
                            r[i])();
                        t[yr] = null
                    }
                }(e, t),
                1 === t[I].type && t[W].destroy();
                const n = t[Hr];
                if (null !== n && Nt(t[we])) {
                    n !== t[we] && cg(n, t);
                    const r = t[Wt];
                    null !== r && r.detachView(e)
                }
                !function a_(e) {
                    Au.delete(e[zr])
                }(t)
            }
        }
        function dg(e, t, n) {
            return function fg(e, t, n) {
                let r = t;
                for (; null !== r && 40 & r.type; )
                    r = (t = r).parent;
                if (null === r)
                    return n[kt];
                {
                    const {componentOffset: o} = r;
                    if (o > -1) {
                        const {encapsulation: i} = e.data[r.directiveStart + o];
                        if (i === qt.None || i === qt.Emulated)
                            return null
                    }
                    return Ft(r, n)
                }
            }(e, t.parent, n)
        }
        function Xr(e, t, n, r, o) {
            e.insertBefore(t, n, r, o)
        }
        function hg(e, t, n) {
            e.appendChild(t, n)
        }
        function pg(e, t, n, r, o) {
            null !== r ? Xr(e, t, n, r, o) : hg(e, t, n)
        }
        function Qa(e, t) {
            return e.parentNode(t)
        }
        let Hu, Yu, yg = function mg(e, t, n) {
            return 40 & e.type ? Ft(e, n) : null
        };
        function Xa(e, t, n, r) {
            const o = dg(e, r, t)
              , i = t[W]
              , a = function gg(e, t, n) {
                return yg(e, t, n)
            }(r.parent || t[He], r, t);
            if (null != o)
                if (Array.isArray(n))
                    for (let l = 0; l < n.length; l++)
                        pg(i, o, n[l], a, !1);
                else
                    pg(i, o, n, a, !1);
            void 0 !== Hu && Hu(i, r, t, n, o)
        }
        function Ja(e, t) {
            if (null !== t) {
                const n = t.type;
                if (3 & n)
                    return Ft(t, e);
                if (4 & n)
                    return zu(-1, e[t.index]);
                if (8 & n) {
                    const r = t.child;
                    if (null !== r)
                        return Ja(e, r);
                    {
                        const o = e[t.index];
                        return Nt(o) ? zu(-1, o) : Qe(o)
                    }
                }
                if (32 & n)
                    return Fu(t, e)() || Qe(e[t.index]);
                {
                    const r = vg(e, t);
                    return null !== r ? Array.isArray(r) ? r[0] : Ja(cs(e[Ne]), r) : Ja(e, t.next)
                }
            }
            return null
        }
        function vg(e, t) {
            return null !== t ? e[Ne][He].projection[t.projection] : null
        }
        function zu(e, t) {
            const n = Ke + e + 1;
            if (n < t.length) {
                const r = t[n]
                  , o = r[I].firstChild;
                if (null !== o)
                    return Ja(r, o)
            }
            return t[dt]
        }
        function qu(e, t, n, r, o, i, s) {
            for (; null != n; ) {
                const a = r[n.index]
                  , l = n.type;
                if (s && 0 === t && (a && it(Qe(a), r),
                n.flags |= 2),
                32 != (32 & n.flags))
                    if (8 & l)
                        qu(e, t, n.child, r, o, i, !1),
                        Vo(t, e, o, a, i);
                    else if (32 & l) {
                        const u = Fu(n, r);
                        let f;
                        for (; f = u(); )
                            Vo(t, e, o, f, i);
                        Vo(t, e, o, a, i)
                    } else
                        16 & l ? Cg(e, t, r, n, o, i) : Vo(t, e, o, a, i);
                n = s ? n.projectionNext : n.next
            }
        }
        function us(e, t, n, r, o, i) {
            qu(n, r, e.firstChild, t, o, i, !1)
        }
        function Cg(e, t, n, r, o, i) {
            const s = n[Ne]
              , l = s[He].projection[r.projection];
            if (Array.isArray(l))
                for (let u = 0; u < l.length; u++)
                    Vo(t, e, o, l[u], i);
            else
                qu(e, t, l, s[we], o, i, !0)
        }
        function bg(e, t, n) {
            "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
        }
        function _g(e, t, n) {
            const {mergedAttrs: r, classes: o, styles: i} = n;
            null !== r && wu(e, t, r),
            null !== o && bg(e, t, o),
            null !== i && function T_(e, t, n) {
                e.setAttribute(t, "style", n)
            }(e, t, i)
        }
        const rl = new $("ENVIRONMENT_INITIALIZER")
          , Lg = new $("INJECTOR",-1)
          , Bg = new $("INJECTOR_DEF_TYPES");
        class $g {
            get(t, n=Br) {
                if (n === Br) {
                    const r = new Error(`NullInjectorError: No provider for ${de(t)}!`);
                    throw r.name = "NullInjectorError",
                    r
                }
                return n
            }
        }
        function oD(...e) {
            return {
                \u0275providers: jg(0, e),
                \u0275fromNgModule: !0
            }
        }
        function jg(e, ...t) {
            const n = []
              , r = new Set;
            let o;
            return Qr(t, i=>{
                const s = i;
                ed(s, n, [], r) && (o || (o = []),
                o.push(s))
            }
            ),
            void 0 !== o && Vg(o, n),
            n
        }
        function Vg(e, t) {
            for (let n = 0; n < e.length; n++) {
                const {providers: o} = e[n];
                td(o, i=>{
                    t.push(i)
                }
                )
            }
        }
        function ed(e, t, n, r) {
            if (!(e = k(e)))
                return !1;
            let o = null
              , i = Da(e);
            const s = !i && ie(e);
            if (i || s) {
                if (s && !s.standalone)
                    return !1;
                o = e
            } else {
                const l = e.ngModule;
                if (i = Da(l),
                !i)
                    return !1;
                o = l
            }
            const a = r.has(o);
            if (s) {
                if (a)
                    return !1;
                if (r.add(o),
                s.dependencies) {
                    const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                    for (const u of l)
                        ed(u, t, n, r)
                }
            } else {
                if (!i)
                    return !1;
                {
                    if (null != i.imports && !a) {
                        let u;
                        r.add(o);
                        try {
                            Qr(i.imports, f=>{
                                ed(f, t, n, r) && (u || (u = []),
                                u.push(f))
                            }
                            )
                        } finally {}
                        void 0 !== u && Vg(u, t)
                    }
                    if (!a) {
                        const u = Wr(o) || (()=>new o);
                        t.push({
                            provide: o,
                            useFactory: u,
                            deps: re
                        }, {
                            provide: Bg,
                            useValue: o,
                            multi: !0
                        }, {
                            provide: rl,
                            useValue: ()=>T(o),
                            multi: !0
                        })
                    }
                    const l = i.providers;
                    null == l || a || td(l, f=>{
                        t.push(f)
                    }
                    )
                }
            }
            return o !== e && void 0 !== e.providers
        }
        function td(e, t) {
            for (let n of e)
                _o(n) && (n = n.\u0275providers),
                Array.isArray(n) ? td(n, t) : t(n)
        }
        const iD = ue({
            provide: String,
            useValue: ue
        });
        function nd(e) {
            return null !== e && "object" == typeof e && iD in e
        }
        function Jr(e) {
            return "function" == typeof e
        }
        const rd = new $("Set Injector scope.")
          , ol = {}
          , aD = {};
        let od;
        function il() {
            return void 0 === od && (od = new $g),
            od
        }
        class Kn {
        }
        class zg extends Kn {
            get destroyed() {
                return this._destroyed
            }
            constructor(t, n, r, o) {
                super(),
                this.parent = n,
                this.source = r,
                this.scopes = o,
                this.records = new Map,
                this._ngOnDestroyHooks = new Set,
                this._onDestroyHooks = [],
                this._destroyed = !1,
                sd(t, s=>this.processProvider(s)),
                this.records.set(Lg, Ho(void 0, this)),
                o.has("environment") && this.records.set(Kn, Ho(void 0, this));
                const i = this.records.get(rd);
                null != i && "string" == typeof i.value && this.scopes.add(i.value),
                this.injectorDefTypes = new Set(this.get(Bg.multi, re, R.Self))
            }
            destroy() {
                this.assertNotDestroyed(),
                this._destroyed = !0;
                try {
                    for (const t of this._ngOnDestroyHooks)
                        t.ngOnDestroy();
                    for (const t of this._onDestroyHooks)
                        t()
                } finally {
                    this.records.clear(),
                    this._ngOnDestroyHooks.clear(),
                    this.injectorDefTypes.clear(),
                    this._onDestroyHooks.length = 0
                }
            }
            onDestroy(t) {
                this._onDestroyHooks.push(t)
            }
            runInContext(t) {
                this.assertNotDestroyed();
                const n = gr(this)
                  , r = ut(void 0);
                try {
                    return t()
                } finally {
                    gr(n),
                    ut(r)
                }
            }
            get(t, n=Br, r=R.Default) {
                this.assertNotDestroyed(),
                r = So(r);
                const o = gr(this)
                  , i = ut(void 0);
                try {
                    if (!(r & R.SkipSelf)) {
                        let a = this.records.get(t);
                        if (void 0 === a) {
                            const l = function fD(e) {
                                return "function" == typeof e || "object" == typeof e && e instanceof $
                            }(t) && Lr(t);
                            a = l && this.injectableDefInScope(l) ? Ho(id(t), ol) : null,
                            this.records.set(t, a)
                        }
                        if (null != a)
                            return this.hydrate(t, a)
                    }
                    return (r & R.Self ? il() : this.parent).get(t, n = r & R.Optional && n === Br ? null : n)
                } catch (s) {
                    if ("NullInjectorError" === s.name) {
                        if ((s[Po] = s[Po] || []).unshift(de(t)),
                        o)
                            throw s;
                        return function qi(e, t, n, r) {
                            const o = e[Po];
                            throw t[zi] && o.unshift(t[zi]),
                            e.message = function Sa(e, t, n, r=null) {
                                e = e && "\n" === e.charAt(0) && e.charAt(1) == Hi ? e.slice(2) : e;
                                let o = de(t);
                                if (Array.isArray(t))
                                    o = t.map(de).join(" -> ");
                                else if ("object" == typeof t) {
                                    let i = [];
                                    for (let s in t)
                                        if (t.hasOwnProperty(s)) {
                                            let a = t[s];
                                            i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : de(a)))
                                        }
                                    o = `{${i.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(Ea, "\n  ")}`
                            }("\n" + e.message, o, n, r),
                            e[eu] = o,
                            e[Po] = null,
                            e
                        }(s, t, "R3InjectorError", this.source)
                    }
                    throw s
                } finally {
                    ut(i),
                    gr(o)
                }
            }
            resolveInjectorInitializers() {
                const t = gr(this)
                  , n = ut(void 0);
                try {
                    const r = this.get(rl.multi, re, R.Self);
                    for (const o of r)
                        o()
                } finally {
                    gr(t),
                    ut(n)
                }
            }
            toString() {
                const t = []
                  , n = this.records;
                for (const r of n.keys())
                    t.push(de(r));
                return `R3Injector[${t.join(", ")}]`
            }
            assertNotDestroyed() {
                if (this._destroyed)
                    throw new E(205,!1)
            }
            processProvider(t) {
                let n = Jr(t = k(t)) ? t : k(t && t.provide);
                const r = function cD(e) {
                    return nd(e) ? Ho(void 0, e.useValue) : Ho(function Gg(e, t, n) {
                        let r;
                        if (Jr(e)) {
                            const o = k(e);
                            return Wr(o) || id(o)
                        }
                        if (nd(e))
                            r = ()=>k(e.useValue);
                        else if (function Hg(e) {
                            return !(!e || !e.useFactory)
                        }(e))
                            r = ()=>e.useFactory(...Gi(e.deps || []));
                        else if (function Ug(e) {
                            return !(!e || !e.useExisting)
                        }(e))
                            r = ()=>T(k(e.useExisting));
                        else {
                            const o = k(e && (e.useClass || e.provide));
                            if (!function uD(e) {
                                return !!e.deps
                            }(e))
                                return Wr(o) || id(o);
                            r = ()=>new o(...Gi(e.deps))
                        }
                        return r
                    }(e), ol)
                }(t);
                if (Jr(t) || !0 !== t.multi)
                    this.records.get(n);
                else {
                    let o = this.records.get(n);
                    o || (o = Ho(void 0, ol, !0),
                    o.factory = ()=>Gi(o.multi),
                    this.records.set(n, o)),
                    n = t,
                    o.multi.push(t)
                }
                this.records.set(n, r)
            }
            hydrate(t, n) {
                return n.value === ol && (n.value = aD,
                n.value = n.factory()),
                "object" == typeof n.value && n.value && function dD(e) {
                    return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                }(n.value) && this._ngOnDestroyHooks.add(n.value),
                n.value
            }
            injectableDefInScope(t) {
                if (!t.providedIn)
                    return !1;
                const n = k(t.providedIn);
                return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
            }
        }
        function id(e) {
            const t = Lr(e)
              , n = null !== t ? t.factory : Wr(e);
            if (null !== n)
                return n;
            if (e instanceof $)
                throw new E(204,!1);
            if (e instanceof Function)
                return function lD(e) {
                    const t = e.length;
                    if (t > 0)
                        throw function rs(e, t) {
                            const n = [];
                            for (let r = 0; r < e; r++)
                                n.push(t);
                            return n
                        }(t, "?"),
                        new E(204,!1);
                    const n = function Qc(e) {
                        const t = e && (e[Eo] || e[Ma]);
                        return t ? (function Xc(e) {
                            if (e.hasOwnProperty("name"))
                                return e.name;
                            ("" + e).match(/^function\s*([^\s(]+)/)
                        }(e),
                        t) : null
                    }(e);
                    return null !== n ? ()=>n.factory(e) : ()=>new e
                }(e);
            throw new E(204,!1)
        }
        function Ho(e, t, n=!1) {
            return {
                factory: e,
                value: t,
                multi: n ? [] : void 0
            }
        }
        function sd(e, t) {
            for (const n of e)
                Array.isArray(n) ? sd(n, t) : n && _o(n) ? sd(n.\u0275providers, t) : t(n)
        }
        class hD {
        }
        class qg {
        }
        class gD {
            resolveComponentFactory(t) {
                throw function pD(e) {
                    const t = Error(`No component factory found for ${de(e)}. Did you add it to @NgModule.entryComponents?`);
                    return t.ngComponent = e,
                    t
                }(t)
            }
        }
        let ps = (()=>{
            class e {
            }
            return e.NULL = new gD,
            e
        }
        )();
        function mD() {
            return zo(Xe(), x())
        }
        function zo(e, t) {
            return new br(Ft(e, t))
        }
        let br = (()=>{
            class e {
                constructor(n) {
                    this.nativeElement = n
                }
            }
            return e.__NG_ELEMENT_ID__ = mD,
            e
        }
        )();
        class Yg {
        }
        let vD = (()=>{
            class e {
            }
            return e.\u0275prov = L({
                token: e,
                providedIn: "root",
                factory: ()=>null
            }),
            e
        }
        )();
        class al {
            constructor(t) {
                this.full = t,
                this.major = t.split(".")[0],
                this.minor = t.split(".")[1],
                this.patch = t.split(".").slice(2).join(".")
            }
        }
        const CD = new al("15.2.1")
          , ad = {}
          , ld = "ngOriginalError";
        function cd(e) {
            return e[ld]
        }
        class Go {
            constructor() {
                this._console = console
            }
            handleError(t) {
                const n = this._findOriginalError(t);
                this._console.error("ERROR", t),
                n && this._console.error("ORIGINAL ERROR", n)
            }
            _findOriginalError(t) {
                let n = t && cd(t);
                for (; n && cd(n); )
                    n = cd(n);
                return n || null
            }
        }
        function Qn(e) {
            return e instanceof Function ? e() : e
        }
        function Kg(e, t, n) {
            let r = e.length;
            for (; ; ) {
                const o = e.indexOf(t, n);
                if (-1 === o)
                    return o;
                if (0 === o || e.charCodeAt(o - 1) <= 32) {
                    const i = t.length;
                    if (o + i === r || e.charCodeAt(o + i) <= 32)
                        return o
                }
                n = o + 1
            }
        }
        const Qg = "ng-template";
        function TD(e, t, n) {
            let r = 0;
            for (; r < e.length; ) {
                let o = e[r++];
                if (n && "class" === o) {
                    if (o = e[r],
                    -1 !== Kg(o.toLowerCase(), t, 0))
                        return !0
                } else if (1 === o) {
                    for (; r < e.length && "string" == typeof (o = e[r++]); )
                        if (o.toLowerCase() === t)
                            return !0;
                    return !1
                }
            }
            return !1
        }
        function Xg(e) {
            return 4 === e.type && e.value !== Qg
        }
        function AD(e, t, n) {
            return t === (4 !== e.type || n ? e.value : Qg)
        }
        function kD(e, t, n) {
            let r = 4;
            const o = e.attrs || []
              , i = function FD(e) {
                for (let t = 0; t < e.length; t++)
                    if (Mp(e[t]))
                        return t;
                return e.length
            }(o);
            let s = !1;
            for (let a = 0; a < t.length; a++) {
                const l = t[a];
                if ("number" != typeof l) {
                    if (!s)
                        if (4 & r) {
                            if (r = 2 | 1 & r,
                            "" !== l && !AD(e, l, n) || "" === l && 1 === t.length) {
                                if (ln(r))
                                    return !1;
                                s = !0
                            }
                        } else {
                            const u = 8 & r ? l : t[++a];
                            if (8 & r && null !== e.attrs) {
                                if (!TD(e.attrs, u, n)) {
                                    if (ln(r))
                                        return !1;
                                    s = !0
                                }
                                continue
                            }
                            const p = RD(8 & r ? "class" : l, o, Xg(e), n);
                            if (-1 === p) {
                                if (ln(r))
                                    return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== u) {
                                let g;
                                g = p > i ? "" : o[p + 1].toLowerCase();
                                const y = 8 & r ? g : null;
                                if (y && -1 !== Kg(y, u, 0) || 2 & r && u !== g) {
                                    if (ln(r))
                                        return !1;
                                    s = !0
                                }
                            }
                        }
                } else {
                    if (!s && !ln(r) && !ln(l))
                        return !1;
                    if (s && ln(l))
                        continue;
                    s = !1,
                    r = l | 1 & r
                }
            }
            return ln(r) || s
        }
        function ln(e) {
            return 0 == (1 & e)
        }
        function RD(e, t, n, r) {
            if (null === t)
                return -1;
            let o = 0;
            if (r || !n) {
                let i = !1;
                for (; o < t.length; ) {
                    const s = t[o];
                    if (s === e)
                        return o;
                    if (3 === s || 6 === s)
                        i = !0;
                    else {
                        if (1 === s || 2 === s) {
                            let a = t[++o];
                            for (; "string" == typeof a; )
                                a = t[++o];
                            continue
                        }
                        if (4 === s)
                            break;
                        if (0 === s) {
                            o += 4;
                            continue
                        }
                    }
                    o += i ? 1 : 2
                }
                return -1
            }
            return function LD(e, t) {
                let n = e.indexOf(4);
                if (n > -1)
                    for (n++; n < e.length; ) {
                        const r = e[n];
                        if ("number" == typeof r)
                            return -1;
                        if (r === t)
                            return n;
                        n++
                    }
                return -1
            }(t, e)
        }
        function Jg(e, t, n=!1) {
            for (let r = 0; r < t.length; r++)
                if (kD(e, t[r], n))
                    return !0;
            return !1
        }
        function em(e, t) {
            return e ? ":not(" + t.trim() + ")" : t
        }
        function $D(e) {
            let t = e[0]
              , n = 1
              , r = 2
              , o = ""
              , i = !1;
            for (; n < e.length; ) {
                let s = e[n];
                if ("string" == typeof s)
                    if (2 & r) {
                        const a = e[++n];
                        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                    } else
                        8 & r ? o += "." + s : 4 & r && (o += " " + s);
                else
                    "" !== o && !ln(s) && (t += em(i, o),
                    o = ""),
                    r = s,
                    i = i || !ln(r);
                n++
            }
            return "" !== o && (t += em(i, o)),
            t
        }
        const z = {};
        function nm(e, t, n, r) {
            if (!r)
                if (3 == (3 & t[G])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && $a(t, i, n)
                } else {
                    const i = e.preOrderHooks;
                    null !== i && ja(t, i, 0, n)
                }
            Zr(n)
        }
        function sm(e, t=null, n=null, r) {
            const o = am(e, t, n, r);
            return o.resolveInjectorInitializers(),
            o
        }
        function am(e, t=null, n=null, r, o=new Set) {
            const i = [n || re, oD(e)];
            return r = r || ("object" == typeof e ? void 0 : de(e)),
            new zg(i,t || il(),r || null,o)
        }
        let In = (()=>{
            class e {
                static create(n, r) {
                    if (Array.isArray(n))
                        return sm({
                            name: ""
                        }, r, n, "");
                    {
                        const o = n.name ?? "";
                        return sm({
                            name: o
                        }, n.parent, n.providers, o)
                    }
                }
            }
            return e.THROW_IF_NOT_FOUND = Br,
            e.NULL = new $g,
            e.\u0275prov = L({
                token: e,
                providedIn: "any",
                factory: ()=>T(Lg)
            }),
            e.__NG_ELEMENT_ID__ = -1,
            e
        }
        )();
        function B(e, t=R.Default) {
            const n = x();
            return null === n ? T(e, t) : kp(Xe(), n, k(e), t)
        }
        function gm(e, t) {
            const n = e.contentQueries;
            if (null !== n)
                for (let r = 0; r < n.length; r += 2) {
                    const i = n[r + 1];
                    if (-1 !== i) {
                        const s = e.data[i];
                        hu(n[r]),
                        s.contentQueries(2, t[i], i)
                    }
                }
        }
        function cl(e, t, n, r, o, i, s, a, l, u, f) {
            const p = t.blueprint.slice();
            return p[kt] = o,
            p[G] = 76 | r,
            (null !== f || e && 1024 & e[G]) && (p[G] |= 1024),
            lp(p),
            p[we] = p[Ct] = e,
            p[ve] = n,
            p[Oo] = s || e && e[Oo],
            p[W] = a || e && e[W],
            p[Zi] = l || e && e[Zi] || null,
            p[Io] = u || e && e[Io] || null,
            p[He] = i,
            p[zr] = function i_() {
                return o_++
            }(),
            p[ka] = f,
            p[Ne] = 2 == t.type ? e[Ne] : p,
            p
        }
        function Yo(e, t, n, r, o) {
            let i = e.data[t];
            if (null === i)
                i = function pd(e, t, n, r, o) {
                    const i = dp()
                      , s = cu()
                      , l = e.data[t] = function dM(e, t, n, r, o, i) {
                        return {
                            type: n,
                            index: r,
                            insertBeforeIndex: null,
                            injectorIndex: t ? t.injectorIndex : -1,
                            directiveStart: -1,
                            directiveEnd: -1,
                            directiveStylingLast: -1,
                            componentOffset: -1,
                            propertyBindings: null,
                            flags: 0,
                            providerIndexes: 0,
                            value: o,
                            attrs: i,
                            mergedAttrs: null,
                            localNames: null,
                            initialInputs: void 0,
                            inputs: null,
                            outputs: null,
                            tViews: null,
                            next: null,
                            prev: null,
                            projectionNext: null,
                            child: null,
                            parent: t,
                            projection: null,
                            styles: null,
                            stylesWithoutHost: null,
                            residualStyles: void 0,
                            classes: null,
                            classesWithoutHost: null,
                            residualClasses: void 0,
                            classBindings: 0,
                            styleBindings: 0
                        }
                    }(0, s ? i : i && i.parent, n, t, r, o);
                    return null === e.firstChild && (e.firstChild = l),
                    null !== i && (s ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l,
                    l.prev = i)),
                    l
                }(e, t, n, r, o),
                function db() {
                    return H.lFrame.inI18n
                }() && (i.flags |= 32);
            else if (64 & i.type) {
                i.type = n,
                i.value = r,
                i.attrs = o;
                const s = function Xi() {
                    const e = H.lFrame
                      , t = e.currentTNode;
                    return e.isParent ? t : t.parent
                }();
                i.injectorIndex = null === s ? -1 : s.injectorIndex
            }
            return Pn(i, !0),
            i
        }
        function gs(e, t, n, r) {
            if (0 === n)
                return -1;
            const o = t.length;
            for (let i = 0; i < n; i++)
                t.push(r),
                e.blueprint.push(r),
                e.data.push(null);
            return o
        }
        function gd(e, t, n) {
            pu(t);
            try {
                const r = e.viewQuery;
                null !== r && xd(1, r, n);
                const o = e.template;
                null !== o && mm(e, t, o, 1, n),
                e.firstCreatePass && (e.firstCreatePass = !1),
                e.staticContentQueries && gm(e, t),
                e.staticViewQueries && xd(2, e.viewQuery, n);
                const i = e.components;
                null !== i && function lM(e, t) {
                    for (let n = 0; n < t.length; n++)
                        OM(e, t[n])
                }(t, i)
            } catch (r) {
                throw e.firstCreatePass && (e.incompleteFirstPass = !0,
                e.firstCreatePass = !1),
                r
            } finally {
                t[G] &= -5,
                gu()
            }
        }
        function ul(e, t, n, r) {
            const o = t[G];
            if (128 != (128 & o)) {
                pu(t);
                try {
                    lp(t),
                    function hp(e) {
                        return H.lFrame.bindingIndex = e
                    }(e.bindingStartIndex),
                    null !== n && mm(e, t, n, 2, r);
                    const s = 3 == (3 & o);
                    if (s) {
                        const u = e.preOrderCheckHooks;
                        null !== u && $a(t, u, null)
                    } else {
                        const u = e.preOrderHooks;
                        null !== u && ja(t, u, 0, null),
                        mu(t, 0)
                    }
                    if (function SM(e) {
                        for (let t = Lu(e); null !== t; t = Bu(t)) {
                            if (!t[Ra])
                                continue;
                            const n = t[wr];
                            for (let r = 0; r < n.length; r++) {
                                const o = n[r];
                                512 & o[G] || lu(o[we], 1),
                                o[G] |= 512
                            }
                        }
                    }(t),
                    function PM(e) {
                        for (let t = Lu(e); null !== t; t = Bu(t))
                            for (let n = Ke; n < t.length; n++) {
                                const r = t[n]
                                  , o = r[I];
                                La(r) && ul(o, r, o.template, r[ve])
                            }
                    }(t),
                    null !== e.contentQueries && gm(e, t),
                    s) {
                        const u = e.contentCheckHooks;
                        null !== u && $a(t, u)
                    } else {
                        const u = e.contentHooks;
                        null !== u && ja(t, u, 1),
                        mu(t, 1)
                    }
                    !function sM(e, t) {
                        const n = e.hostBindingOpCodes;
                        if (null !== n)
                            try {
                                for (let r = 0; r < n.length; r++) {
                                    const o = n[r];
                                    if (o < 0)
                                        Zr(~o);
                                    else {
                                        const i = o
                                          , s = n[++r]
                                          , a = n[++r];
                                        fb(s, i),
                                        a(2, t[i])
                                    }
                                }
                            } finally {
                                Zr(-1)
                            }
                    }(e, t);
                    const a = e.components;
                    null !== a && function aM(e, t) {
                        for (let n = 0; n < t.length; n++)
                            IM(e, t[n])
                    }(t, a);
                    const l = e.viewQuery;
                    if (null !== l && xd(2, l, r),
                    s) {
                        const u = e.viewCheckHooks;
                        null !== u && $a(t, u)
                    } else {
                        const u = e.viewHooks;
                        null !== u && ja(t, u, 2),
                        mu(t, 2)
                    }
                    !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
                    t[G] &= -41,
                    512 & t[G] && (t[G] &= -513,
                    lu(t[we], -1))
                } finally {
                    gu()
                }
            }
        }
        function mm(e, t, n, r, o) {
            const i = pt()
              , s = 2 & r;
            try {
                Zr(-1),
                s && t.length > fe && nm(e, t, fe, !1),
                Yt(s ? 2 : 0, o),
                n(r, o)
            } finally {
                Zr(i),
                Yt(s ? 3 : 1, o)
            }
        }
        function md(e, t, n) {
            if (Qi(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                    const s = e.data[i];
                    s.contentQueries && s.contentQueries(1, n[i], i)
                }
            }
        }
        function ym(e) {
            const t = e.tView;
            return null === t || t.incompleteFirstPass ? e.tView = vd(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t
        }
        function vd(e, t, n, r, o, i, s, a, l, u) {
            const f = fe + r
              , p = f + o
              , g = function cM(e, t) {
                const n = [];
                for (let r = 0; r < t; r++)
                    n.push(r < e ? null : z);
                return n
            }(f, p)
              , y = "function" == typeof u ? u() : u;
            return g[I] = {
                type: e,
                blueprint: g,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: t,
                data: g.slice().fill(null, f),
                bindingStartIndex: f,
                expandoStartIndex: p,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof s ? s() : s,
                firstChild: null,
                schemas: l,
                consts: y,
                incompleteFirstPass: !1
            }
        }
        function vm(e, t, n, r) {
            for (let o in e)
                if (e.hasOwnProperty(o)) {
                    n = null === n ? {} : n;
                    const i = e[o];
                    null === r ? Cm(n, t, o, i) : r.hasOwnProperty(o) && Cm(n, t, r[o], i)
                }
            return n
        }
        function Cm(e, t, n, r) {
            e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r]
        }
        function _m(e, t, n, r, o, i) {
            for (let u = 0; u < r.length; u++)
                _u(za(n, t), e, r[u].type);
            !function _M(e, t, n) {
                e.flags |= 1,
                e.directiveStart = t,
                e.directiveEnd = t + n,
                e.providerIndexes = t
            }(n, e.data.length, r.length);
            for (let u = 0; u < r.length; u++) {
                const f = r[u];
                f.providersResolver && f.providersResolver(f)
            }
            let s = !1
              , a = !1
              , l = gs(e, t, r.length, null);
            for (let u = 0; u < r.length; u++) {
                const f = r[u];
                n.mergedAttrs = es(n.mergedAttrs, f.hostAttrs),
                DM(e, n, t, l, f),
                bM(l, f, o),
                null !== f.contentQueries && (n.flags |= 4),
                (null !== f.hostBindings || null !== f.hostAttrs || 0 !== f.hostVars) && (n.flags |= 64);
                const p = f.type.prototype;
                !s && (p.ngOnChanges || p.ngOnInit || p.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                s = !0),
                !a && (p.ngOnChanges || p.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index),
                a = !0),
                l++
            }
            !function fM(e, t, n) {
                const o = t.directiveEnd
                  , i = e.data
                  , s = t.attrs
                  , a = [];
                let l = null
                  , u = null;
                for (let f = t.directiveStart; f < o; f++) {
                    const p = i[f]
                      , g = n ? n.get(p) : null
                      , w = g ? g.outputs : null;
                    l = vm(p.inputs, f, l, g ? g.inputs : null),
                    u = vm(p.outputs, f, u, w);
                    const C = null === l || null === s || Xg(t) ? null : EM(l, f, s);
                    a.push(C)
                }
                null !== l && (l.hasOwnProperty("class") && (t.flags |= 8),
                l.hasOwnProperty("style") && (t.flags |= 16)),
                t.initialInputs = a,
                t.inputs = l,
                t.outputs = u
            }(e, n, i)
        }
        function Dm(e, t, n) {
            const r = n.directiveStart
              , o = n.directiveEnd
              , i = n.index
              , s = function hb() {
                return H.lFrame.currentDirectiveIndex
            }();
            try {
                Zr(i);
                for (let a = r; a < o; a++) {
                    const l = e.data[a]
                      , u = t[a];
                    du(a),
                    (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && wM(l, u)
                }
            } finally {
                Zr(-1),
                du(s)
            }
        }
        function wM(e, t) {
            null !== e.hostBindings && e.hostBindings(1, t)
        }
        function bd(e, t, n) {
            t.componentOffset = n,
            (e.components || (e.components = [])).push(t.index)
        }
        function bM(e, t, n) {
            if (n) {
                if (t.exportAs)
                    for (let r = 0; r < t.exportAs.length; r++)
                        n[t.exportAs[r]] = e;
                c(t) && (n[""] = e)
            }
        }
        function DM(e, t, n, r, o) {
            e.data[r] = o;
            const i = o.factory || (o.factory = Wr(o.type))
              , s = new Ji(i,c(o),B);
            e.blueprint[r] = s,
            n[r] = s,
            function gM(e, t, n, r, o) {
                const i = o.hostBindings;
                if (i) {
                    let s = e.hostBindingOpCodes;
                    null === s && (s = e.hostBindingOpCodes = []);
                    const a = ~t.index;
                    (function mM(e) {
                        let t = e.length;
                        for (; t > 0; ) {
                            const n = e[--t];
                            if ("number" == typeof n && n < 0)
                                return n
                        }
                        return 0
                    }
                    )(s) != a && s.push(a),
                    s.push(n, r, i)
                }
            }(e, t, r, gs(e, n, o.hostVars, z), o)
        }
        function xM(e, t, n, r, o, i) {
            const s = i[t];
            if (null !== s) {
                const a = r.setInput;
                for (let l = 0; l < s.length; ) {
                    const u = s[l++]
                      , f = s[l++]
                      , p = s[l++];
                    null !== a ? r.setInput(n, p, u, f) : n[f] = p
                }
            }
        }
        function EM(e, t, n) {
            let r = null
              , o = 0;
            for (; o < n.length; ) {
                const i = n[o];
                if (0 !== i)
                    if (5 !== i) {
                        if ("number" == typeof i)
                            break;
                        if (e.hasOwnProperty(i)) {
                            null === r && (r = []);
                            const s = e[i];
                            for (let a = 0; a < s.length; a += 2)
                                if (s[a] === t) {
                                    r.push(i, s[a + 1], n[o + 1]);
                                    break
                                }
                        }
                        o += 2
                    } else
                        o += 2;
                else
                    o += 4
            }
            return r
        }
        function IM(e, t) {
            const n = Lt(t, e);
            if (La(n)) {
                const r = n[I];
                48 & n[G] ? ul(r, n, r.template, n[ve]) : n[En] > 0 && Dd(n)
            }
        }
        function Dd(e) {
            for (let r = Lu(e); null !== r; r = Bu(r))
                for (let o = Ke; o < r.length; o++) {
                    const i = r[o];
                    if (La(i))
                        if (512 & i[G]) {
                            const s = i[I];
                            ul(s, i, s.template, i[ve])
                        } else
                            i[En] > 0 && Dd(i)
                }
            const n = e[I].components;
            if (null !== n)
                for (let r = 0; r < n.length; r++) {
                    const o = Lt(n[r], e);
                    La(o) && o[En] > 0 && Dd(o)
                }
        }
        function OM(e, t) {
            const n = Lt(t, e)
              , r = n[I];
            (function TM(e, t) {
                for (let n = t.length; n < e.blueprint.length; n++)
                    t.push(e.blueprint[n])
            }
            )(r, n),
            gd(r, n, n[ve])
        }
        function dl(e, t) {
            return e[Ur] ? e[Aa][Rt] = t : e[Ur] = t,
            e[Aa] = t,
            t
        }
        function Md(e) {
            for (; e; ) {
                e[G] |= 32;
                const t = cs(e);
                if (d(e) && !t)
                    return e;
                e = t
            }
            return null
        }
        function fl(e, t, n, r=!0) {
            const o = t[Oo];
            o.begin && o.begin();
            try {
                ul(e, t, e.template, n)
            } catch (s) {
                throw r && Sm(t, s),
                s
            } finally {
                o.end && o.end()
            }
        }
        function xd(e, t, n) {
            hu(0),
            t(e, n)
        }
        function xm(e) {
            return e[yr] || (e[yr] = [])
        }
        function Em(e) {
            return e.cleanup || (e.cleanup = [])
        }
        function Sm(e, t) {
            const n = e[Io]
              , r = n ? n.get(Go, null) : null;
            r && r.handleError(t)
        }
        function Ed(e, t, n, r, o) {
            for (let i = 0; i < n.length; ) {
                const s = n[i++]
                  , a = n[i++]
                  , l = t[s]
                  , u = e.data[s];
                null !== u.setInput ? u.setInput(l, o, r, a) : l[a] = o
            }
        }
        function Xn(e, t, n) {
            const r = function Fa(e, t) {
                return Qe(t[e])
            }(t, e);
            !function lg(e, t, n) {
                e.setValue(t, n)
            }(e[W], r, n)
        }
        function hl(e, t, n) {
            let r = n ? e.styles : null
              , o = n ? e.classes : null
              , i = 0;
            if (null !== t)
                for (let s = 0; s < t.length; s++) {
                    const a = t[s];
                    "number" == typeof a ? i = a : 1 == i ? o = Fi(o, a) : 2 == i && (r = Fi(r, a + ": " + t[++s] + ";"))
                }
            n ? e.styles = r : e.stylesWithoutHost = r,
            n ? e.classes = o : e.classesWithoutHost = o
        }
        function pl(e, t, n, r, o=!1) {
            for (; null !== n; ) {
                const i = t[n.index];
                if (null !== i && r.push(Qe(i)),
                Nt(i))
                    for (let a = Ke; a < i.length; a++) {
                        const l = i[a]
                          , u = l[I].firstChild;
                        null !== u && pl(l[I], l, u, r)
                    }
                const s = n.type;
                if (8 & s)
                    pl(e, t, n.child, r);
                else if (32 & s) {
                    const a = Fu(n, t);
                    let l;
                    for (; l = a(); )
                        r.push(l)
                } else if (16 & s) {
                    const a = vg(t, n);
                    if (Array.isArray(a))
                        r.push(...a);
                    else {
                        const l = cs(t[Ne]);
                        pl(l[I], l, a, r, !0)
                    }
                }
                n = o ? n.projectionNext : n.next
            }
            return r
        }
        class ms {
            get rootNodes() {
                const t = this._lView
                  , n = t[I];
                return pl(n, t, n.firstChild, [])
            }
            constructor(t, n) {
                this._lView = t,
                this._cdRefInjectingView = n,
                this._appRef = null,
                this._attachedToViewContainer = !1
            }
            get context() {
                return this._lView[ve]
            }
            set context(t) {
                this._lView[ve] = t
            }
            get destroyed() {
                return 128 == (128 & this._lView[G])
            }
            destroy() {
                if (this._appRef)
                    this._appRef.detachView(this);
                else if (this._attachedToViewContainer) {
                    const t = this._lView[we];
                    if (Nt(t)) {
                        const n = t[an]
                          , r = n ? n.indexOf(this) : -1;
                        r > -1 && (Vu(t, r),
                        Wa(n, r))
                    }
                    this._attachedToViewContainer = !1
                }
                ug(this._lView[I], this._lView)
            }
            onDestroy(t) {
                !function wm(e, t, n, r) {
                    const o = xm(t);
                    null === n ? o.push(r) : (o.push(n),
                    e.firstCreatePass && Em(e).push(r, o.length - 1))
                }(this._lView[I], this._lView, null, t)
            }
            markForCheck() {
                Md(this._cdRefInjectingView || this._lView)
            }
            detach() {
                this._lView[G] &= -65
            }
            reattach() {
                this._lView[G] |= 64
            }
            detectChanges() {
                fl(this._lView[I], this._lView, this.context)
            }
            checkNoChanges() {}
            attachToViewContainerRef() {
                if (this._appRef)
                    throw new E(902,!1);
                this._attachedToViewContainer = !0
            }
            detachFromAppRef() {
                this._appRef = null,
                function C_(e, t) {
                    us(e, t, t[W], 2, null, null)
                }(this._lView[I], this._lView)
            }
            attachToAppRef(t) {
                if (this._attachedToViewContainer)
                    throw new E(902,!1);
                this._appRef = t
            }
        }
        class AM extends ms {
            constructor(t) {
                super(t),
                this._view = t
            }
            detectChanges() {
                const t = this._view;
                fl(t[I], t, t[ve], !1)
            }
            checkNoChanges() {}
            get context() {
                return null
            }
        }
        class Im extends ps {
            constructor(t) {
                super(),
                this.ngModule = t
            }
            resolveComponentFactory(t) {
                const n = ie(t);
                return new ys(n,this.ngModule)
            }
        }
        function Om(e) {
            const t = [];
            for (let n in e)
                e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
            return t
        }
        class RM {
            constructor(t, n) {
                this.injector = t,
                this.parentInjector = n
            }
            get(t, n, r) {
                r = So(r);
                const o = this.injector.get(t, ad, r);
                return o !== ad || n === ad ? o : this.parentInjector.get(t, n, r)
            }
        }
        class ys extends qg {
            get inputs() {
                return Om(this.componentDef.inputs)
            }
            get outputs() {
                return Om(this.componentDef.outputs)
            }
            constructor(t, n) {
                super(),
                this.componentDef = t,
                this.ngModule = n,
                this.componentType = t.type,
                this.selector = function jD(e) {
                    return e.map($D).join(",")
                }(t.selectors),
                this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [],
                this.isBoundToModule = !!n
            }
            create(t, n, r, o) {
                let i = (o = o || this.ngModule)instanceof Kn ? o : o?.injector;
                i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                const s = i ? new RM(t,i) : t
                  , a = s.get(Yg, null);
                if (null === a)
                    throw new E(407,!1);
                const l = s.get(vD, null)
                  , u = a.createRenderer(null, this.componentDef)
                  , f = this.componentDef.selectors[0][0] || "div"
                  , p = r ? function uM(e, t, n) {
                    return e.selectRootElement(t, n === qt.ShadowDom)
                }(u, r, this.componentDef.encapsulation) : ju(u, f, function kM(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? ip : "math" === t ? "math" : null
                }(f))
                  , g = this.componentDef.onPush ? 288 : 272
                  , y = vd(0, null, null, 1, 0, null, null, null, null, null)
                  , w = cl(null, y, null, g, null, null, a, u, l, s, null);
                let C, v;
                pu(w);
                try {
                    const M = this.componentDef;
                    let P, D = null;
                    M.findHostDirectiveDefs ? (P = [],
                    D = new Map,
                    M.findHostDirectiveDefs(M, P, D),
                    P.push(M)) : P = [M];
                    const A = function FM(e, t) {
                        const n = e[I]
                          , r = fe;
                        return e[r] = t,
                        Yo(n, r, 2, "#host", null)
                    }(w, p)
                      , ee = function LM(e, t, n, r, o, i, s, a) {
                        const l = o[I];
                        !function BM(e, t, n, r) {
                            for (const o of e)
                                t.mergedAttrs = es(t.mergedAttrs, o.hostAttrs);
                            null !== t.mergedAttrs && (hl(t, t.mergedAttrs, !0),
                            null !== n && _g(r, n, t))
                        }(r, e, t, s);
                        const u = i.createRenderer(t, n)
                          , f = cl(o, ym(n), null, n.onPush ? 32 : 16, o[e.index], e, i, u, a || null, null, null);
                        return l.firstCreatePass && bd(l, e, r.length - 1),
                        dl(o, f),
                        o[e.index] = f
                    }(A, p, M, P, w, a, u);
                    v = function ap(e, t) {
                        return e.data[t]
                    }(y, fe),
                    p && function jM(e, t, n, r) {
                        if (r)
                            wu(e, n, ["ng-version", CD.full]);
                        else {
                            const {attrs: o, classes: i} = function VD(e) {
                                const t = []
                                  , n = [];
                                let r = 1
                                  , o = 2;
                                for (; r < e.length; ) {
                                    let i = e[r];
                                    if ("string" == typeof i)
                                        2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
                                    else {
                                        if (!ln(o))
                                            break;
                                        o = i
                                    }
                                    r++
                                }
                                return {
                                    attrs: t,
                                    classes: n
                                }
                            }(t.selectors[0]);
                            o && wu(e, n, o),
                            i && i.length > 0 && bg(e, n, i.join(" "))
                        }
                    }(u, M, p, r),
                    void 0 !== n && function VM(e, t, n) {
                        const r = e.projection = [];
                        for (let o = 0; o < t.length; o++) {
                            const i = n[o];
                            r.push(null != i ? Array.from(i) : null)
                        }
                    }(v, this.ngContentSelectors, n),
                    C = function $M(e, t, n, r, o, i) {
                        const s = Xe()
                          , a = o[I]
                          , l = Ft(s, o);
                        _m(a, o, s, n, null, r);
                        for (let f = 0; f < n.length; f++)
                            it(Kr(o, a, s.directiveStart + f, s), o);
                        Dm(a, o, s),
                        l && it(l, o);
                        const u = Kr(o, a, s.directiveStart + s.componentOffset, s);
                        if (e[ve] = o[ve] = u,
                        null !== i)
                            for (const f of i)
                                f(u, t);
                        return md(a, s, e),
                        u
                    }(ee, M, P, D, w, [UM]),
                    gd(y, w, null)
                } finally {
                    gu()
                }
                return new NM(this.componentType,C,zo(v, w),w,v)
            }
        }
        class NM extends hD {
            constructor(t, n, r, o, i) {
                super(),
                this.location = r,
                this._rootLView = o,
                this._tNode = i,
                this.instance = n,
                this.hostView = this.changeDetectorRef = new AM(o),
                this.componentType = t
            }
            setInput(t, n) {
                const r = this._tNode.inputs;
                let o;
                if (null !== r && (o = r[t])) {
                    const i = this._rootLView;
                    Ed(i[I], i, o, t, n),
                    function bm(e, t) {
                        const n = Lt(t, e);
                        16 & n[G] || (n[G] |= 32)
                    }(i, this._tNode.index)
                }
            }
            get injector() {
                return new Ro(this._tNode,this._rootLView)
            }
            destroy() {
                this.hostView.destroy()
            }
            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }
        function UM() {
            const e = Xe();
            Ba(x()[I], e)
        }
        function Ko(e, t, n, r) {
            return function st(e, t, n) {
                return !Object.is(e[t], n) && (e[t] = n,
                !0)
            }(e, function Ao() {
                return H.lFrame.bindingIndex++
            }(), n) ? t + V(n) + r : z
        }
        function Od(e, t, n, r, o) {
            const s = o ? "class" : "style";
            Ed(e, n, t.inputs[s], s, r)
        }
        function Me(e, t, n, r) {
            const o = x()
              , i = oe()
              , s = fe + e
              , a = o[W]
              , l = i.firstCreatePass ? function sx(e, t, n, r, o, i) {
                const s = t.consts
                  , l = Yo(t, e, 2, r, vr(s, o));
                return function Cd(e, t, n, r) {
                    if (up()) {
                        const o = null === r ? null : {
                            "": -1
                        }
                          , i = function vM(e, t) {
                            const n = e.directiveRegistry;
                            let r = null
                              , o = null;
                            if (n)
                                for (let i = 0; i < n.length; i++) {
                                    const s = n[i];
                                    if (Jg(t, s.selectors, !1))
                                        if (r || (r = []),
                                        c(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                o = o || new Map,
                                                s.findHostDirectiveDefs(s, a, o),
                                                r.unshift(...a, s),
                                                bd(e, t, a.length)
                                            } else
                                                r.unshift(s),
                                                bd(e, t, 0);
                                        else
                                            o = o || new Map,
                                            s.findHostDirectiveDefs?.(s, r, o),
                                            r.push(s)
                                }
                            return null === r ? null : [r, o]
                        }(e, n);
                        let s, a;
                        null === i ? s = a = null : [s,a] = i,
                        null !== s && _m(e, t, n, s, o, a),
                        o && function CM(e, t, n) {
                            if (t) {
                                const r = e.localNames = [];
                                for (let o = 0; o < t.length; o += 2) {
                                    const i = n[t[o + 1]];
                                    if (null == i)
                                        throw new E(-301,!1);
                                    r.push(t[o], i)
                                }
                            }
                        }(n, r, o)
                    }
                    n.mergedAttrs = es(n.mergedAttrs, n.attrs)
                }(t, n, l, vr(s, i)),
                null !== l.attrs && hl(l, l.attrs, !1),
                null !== l.mergedAttrs && hl(l, l.mergedAttrs, !0),
                null !== t.queries && t.queries.elementStart(t, l),
                l
            }(s, i, o, t, n, r) : i.data[s]
              , u = o[s] = ju(a, t, function vb() {
                return H.lFrame.currentNamespace
            }())
              , f = qn(l);
            return Pn(l, !0),
            _g(a, u, l),
            32 != (32 & l.flags) && Xa(i, o, u, l),
            0 === function rb() {
                return H.lFrame.elementDepthCount
            }() && it(u, o),
            function ob() {
                H.lFrame.elementDepthCount++
            }(),
            f && (function yd(e, t, n) {
                up() && (function yM(e, t, n, r) {
                    const o = n.directiveStart
                      , i = n.directiveEnd;
                    Gr(n) && function MM(e, t, n) {
                        const r = Ft(t, e)
                          , o = ym(n)
                          , i = e[Oo]
                          , s = dl(e, cl(e, o, null, n.onPush ? 32 : 16, r, t, i, i.createRenderer(r, n), null, null, null));
                        e[t.index] = s
                    }(t, n, e.data[o + n.componentOffset]),
                    e.firstCreatePass || za(n, t),
                    it(r, t);
                    const s = n.initialInputs;
                    for (let a = o; a < i; a++) {
                        const l = e.data[a]
                          , u = Kr(t, e, a, n);
                        it(u, t),
                        null !== s && xM(0, a - o, u, l, 0, s),
                        c(l) && (Lt(n.index, t)[ve] = Kr(t, e, a, n))
                    }
                }(e, t, n, Ft(n, t)),
                64 == (64 & n.flags) && Dm(e, t, n))
            }(i, o, l),
            md(i, l, o)),
            null !== r && function wd(e, t, n=Ft) {
                const r = t.localNames;
                if (null !== r) {
                    let o = t.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const s = r[i + 1]
                          , a = -1 === s ? n(t, e) : e[s];
                        e[o++] = a
                    }
                }
            }(o, l),
            Me
        }
        function Je() {
            let e = Xe();
            cu() ? function uu() {
                H.lFrame.isParent = !1
            }() : (e = e.parent,
            Pn(e, !1));
            const t = e;
            !function ib() {
                H.lFrame.elementDepthCount--
            }();
            const n = oe();
            return n.firstCreatePass && (Ba(n, e),
            Qi(e) && n.queries.elementEnd(e)),
            null != t.classesWithoutHost && function Db(e) {
                return 0 != (8 & e.flags)
            }(t) && Od(n, t, x(), t.classesWithoutHost, !0),
            null != t.stylesWithoutHost && function Mb(e) {
                return 0 != (16 & e.flags)
            }(t) && Od(n, t, x(), t.stylesWithoutHost, !1),
            Je
        }
        function Le(e, t, n, r) {
            return Me(e, t, n, r),
            Je(),
            Le
        }
        function yl(e) {
            return !!e && "function" == typeof e.then
        }
        const Ym = function Wm(e) {
            return !!e && "function" == typeof e.subscribe
        };
        function vs(e, t, n, r) {
            const o = x()
              , i = oe()
              , s = Xe();
            return function Km(e, t, n, r, o, i, s) {
                const a = qn(r)
                  , u = e.firstCreatePass && Em(e)
                  , f = t[ve]
                  , p = xm(t);
                let g = !0;
                if (3 & r.type || s) {
                    const C = Ft(r, t)
                      , v = s ? s(C) : C
                      , M = p.length
                      , P = s ? A=>s(Qe(A[r.index])) : r.index;
                    let D = null;
                    if (!s && a && (D = function cx(e, t, n, r) {
                        const o = e.cleanup;
                        if (null != o)
                            for (let i = 0; i < o.length - 1; i += 2) {
                                const s = o[i];
                                if (s === n && o[i + 1] === r) {
                                    const a = t[yr]
                                      , l = o[i + 2];
                                    return a.length > l ? a[l] : null
                                }
                                "string" == typeof s && (i += 2)
                            }
                        return null
                    }(e, t, o, r.index)),
                    null !== D)
                        (D.__ngLastListenerFn__ || D).__ngNextListenerFn__ = i,
                        D.__ngLastListenerFn__ = i,
                        g = !1;
                    else {
                        i = Xm(r, t, f, i, !1);
                        const A = n.listen(v, o, i);
                        p.push(i, A),
                        u && u.push(o, P, M, M + 1)
                    }
                } else
                    i = Xm(r, t, f, i, !1);
                const y = r.outputs;
                let w;
                if (g && null !== y && (w = y[o])) {
                    const C = w.length;
                    if (C)
                        for (let v = 0; v < C; v += 2) {
                            const ee = t[w[v]][w[v + 1]].subscribe(i)
                              , _e = p.length;
                            p.push(i, ee),
                            u && u.push(o, r.index, _e, -(_e + 1))
                        }
                }
            }(i, o, o[W], s, e, t, r),
            vs
        }
        function Qm(e, t, n, r) {
            try {
                return Yt(6, t, n),
                !1 !== n(r)
            } catch (o) {
                return Sm(e, o),
                !1
            } finally {
                Yt(7, t, n)
            }
        }
        function Xm(e, t, n, r, o) {
            return function i(s) {
                if (s === Function)
                    return r;
                Md(e.componentOffset > -1 ? Lt(e.index, t) : t);
                let l = Qm(t, n, r, s)
                  , u = i.__ngNextListenerFn__;
                for (; u; )
                    l = Qm(t, n, u, s) && l,
                    u = u.__ngNextListenerFn__;
                return o && !1 === l && (s.preventDefault(),
                s.returnValue = !1),
                l
            }
        }
        function no(e, t="") {
            const n = x()
              , r = oe()
              , o = e + fe
              , i = r.firstCreatePass ? Yo(r, o, 1, t, null) : r.data[o]
              , s = n[o] = function $u(e, t) {
                return e.createText(t)
            }(n[W], t);
            Xa(r, n, s, i),
            Pn(i, !1)
        }
        function Cl(e, t, n) {
            const r = x()
              , o = Ko(r, e, t, n);
            return o !== z && Xn(r, pt(), o),
            Cl
        }
        const si = "en-US";
        let Gy = si;
        class ai {
        }
        class yw {
        }
        class ww extends ai {
            constructor(t, n) {
                super(),
                this._parent = n,
                this._bootstrapComponents = [],
                this.destroyCbs = [],
                this.componentFactoryResolver = new Im(this);
                const r = rt(t);
                this._bootstrapComponents = Qn(r.bootstrap),
                this._r3Injector = am(t, n, [{
                    provide: ai,
                    useValue: this
                }, {
                    provide: ps,
                    useValue: this.componentFactoryResolver
                }], de(t), new Set(["environment"])),
                this._r3Injector.resolveInjectorInitializers(),
                this.instance = this._r3Injector.get(t)
            }
            get injector() {
                return this._r3Injector
            }
            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(),
                this.destroyCbs.forEach(n=>n()),
                this.destroyCbs = null
            }
            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }
        class zd extends yw {
            constructor(t) {
                super(),
                this.moduleType = t
            }
            create(t) {
                return new ww(this.moduleType,t)
            }
        }
        class tP extends ai {
            constructor(t, n, r) {
                super(),
                this.componentFactoryResolver = new Im(this),
                this.instance = null;
                const o = new zg([...t, {
                    provide: ai,
                    useValue: this
                }, {
                    provide: ps,
                    useValue: this.componentFactoryResolver
                }],n || il(),r,new Set(["environment"]));
                this.injector = o,
                o.resolveInjectorInitializers()
            }
            destroy() {
                this.injector.destroy()
            }
            onDestroy(t) {
                this.injector.onDestroy(t)
            }
        }
        function xl(e, t, n=null) {
            return new tP(e,t,n).injector
        }
        let nP = (()=>{
            class e {
                constructor(n) {
                    this._injector = n,
                    this.cachedInjectors = new Map
                }
                getOrCreateStandaloneInjector(n) {
                    if (!n.standalone)
                        return null;
                    if (!this.cachedInjectors.has(n.id)) {
                        const r = jg(0, n.type)
                          , o = r.length > 0 ? xl([r], this._injector, `Standalone[${n.type.name}]`) : null;
                        this.cachedInjectors.set(n.id, o)
                    }
                    return this.cachedInjectors.get(n.id)
                }
                ngOnDestroy() {
                    try {
                        for (const n of this.cachedInjectors.values())
                            null !== n && n.destroy()
                    } finally {
                        this.cachedInjectors.clear()
                    }
                }
            }
            return e.\u0275prov = L({
                token: e,
                providedIn: "environment",
                factory: ()=>new e(T(Kn))
            }),
            e
        }
        )();
        function vw(e) {
            e.getStandaloneInjector = t=>t.get(nP).getOrCreateStandaloneInjector(e)
        }
        function qd(e) {
            return t=>{
                setTimeout(e, void 0, t)
            }
        }
        const mt = class SP extends It {
            constructor(t=!1) {
                super(),
                this.__isAsync = t
            }
            emit(t) {
                super.next(t)
            }
            subscribe(t, n, r) {
                let o = t
                  , i = n || (()=>null)
                  , s = r;
                if (t && "object" == typeof t) {
                    const l = t;
                    o = l.next?.bind(l),
                    i = l.error?.bind(l),
                    s = l.complete?.bind(l)
                }
                this.__isAsync && (i = qd(i),
                o && (o = qd(o)),
                s && (s = qd(s)));
                const a = super.subscribe({
                    next: o,
                    error: i,
                    complete: s
                });
                return t instanceof wt && t.add(a),
                a
            }
        }
        ;
        let dn = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = kP,
            e
        }
        )();
        function kP() {
            return function kw(e, t) {
                let n;
                const r = t[e.index];
                if (Nt(r))
                    n = r;
                else {
                    let o;
                    if (8 & e.type)
                        o = Qe(r);
                    else {
                        const i = t[W];
                        o = i.createComment("");
                        const s = Ft(e, t);
                        Xr(i, Qa(i, s), o, function P_(e, t) {
                            return e.nextSibling(t)
                        }(i, s), !1)
                    }
                    t[e.index] = n = function Mm(e, t, n, r) {
                        return [e, !0, !1, t, null, 0, r, n, null, null]
                    }(r, t, o, e),
                    dl(t, n)
                }
                return new Tw(n,e,t)
            }(Xe(), x())
        }
        const RP = dn
          , Tw = class extends RP {
            constructor(t, n, r) {
                super(),
                this._lContainer = t,
                this._hostTNode = n,
                this._hostLView = r
            }
            get element() {
                return zo(this._hostTNode, this._hostLView)
            }
            get injector() {
                return new Ro(this._hostTNode,this._hostLView)
            }
            get parentInjector() {
                const t = bu(this._hostTNode, this._hostLView);
                if (Pp(t)) {
                    const n = Ua(t, this._hostLView)
                      , r = Va(t);
                    return new Ro(n[I].data[r + 8],n)
                }
                return new Ro(null,this._hostLView)
            }
            clear() {
                for (; this.length > 0; )
                    this.remove(this.length - 1)
            }
            get(t) {
                const n = Aw(this._lContainer);
                return null !== n && n[t] || null
            }
            get length() {
                return this._lContainer.length - Ke
            }
            createEmbeddedView(t, n, r) {
                let o, i;
                "number" == typeof r ? o = r : null != r && (o = r.index,
                i = r.injector);
                const s = t.createEmbeddedView(n || {}, i);
                return this.insert(s, o),
                s
            }
            createComponent(t, n, r, o, i) {
                const s = t && !function ns(e) {
                    return "function" == typeof e
                }(t);
                let a;
                if (s)
                    a = n;
                else {
                    const p = n || {};
                    a = p.index,
                    r = p.injector,
                    o = p.projectableNodes,
                    i = p.environmentInjector || p.ngModuleRef
                }
                const l = s ? t : new ys(ie(t))
                  , u = r || this.parentInjector;
                if (!i && null == l.ngModule) {
                    const g = (s ? u : this.parentInjector).get(Kn, null);
                    g && (i = g)
                }
                const f = l.create(u, o, void 0, i);
                return this.insert(f.hostView, a),
                f
            }
            insert(t, n) {
                const r = t._lView
                  , o = r[I];
                if (function nb(e) {
                    return Nt(e[we])
                }(r)) {
                    const f = this.indexOf(t);
                    if (-1 !== f)
                        this.detach(f);
                    else {
                        const p = r[we]
                          , g = new Tw(p,p[He],p[we]);
                        g.detach(g.indexOf(t))
                    }
                }
                const i = this._adjustIndex(n)
                  , s = this._lContainer;
                !function __(e, t, n, r) {
                    const o = Ke + r
                      , i = n.length;
                    r > 0 && (n[o - 1][Rt] = t),
                    r < i - Ke ? (t[Rt] = n[o],
                    jp(n, Ke + r, t)) : (n.push(t),
                    t[Rt] = null),
                    t[we] = n;
                    const s = t[Hr];
                    null !== s && n !== s && function D_(e, t) {
                        const n = e[wr];
                        t[Ne] !== t[we][we][Ne] && (e[Ra] = !0),
                        null === n ? e[wr] = [t] : n.push(t)
                    }(s, t);
                    const a = t[Wt];
                    null !== a && a.insertView(e),
                    t[G] |= 64
                }(o, r, s, i);
                const a = zu(i, s)
                  , l = r[W]
                  , u = Qa(l, s[dt]);
                return null !== u && function v_(e, t, n, r, o, i) {
                    r[kt] = o,
                    r[He] = t,
                    us(e, r, n, 1, o, i)
                }(o, s[He], l, r, u, a),
                t.attachToViewContainerRef(),
                jp(Yd(s), i, t),
                t
            }
            move(t, n) {
                return this.insert(t, n)
            }
            indexOf(t) {
                const n = Aw(this._lContainer);
                return null !== n ? n.indexOf(t) : -1
            }
            remove(t) {
                const n = this._adjustIndex(t, -1)
                  , r = Vu(this._lContainer, n);
                r && (Wa(Yd(this._lContainer), n),
                ug(r[I], r))
            }
            detach(t) {
                const n = this._adjustIndex(t, -1)
                  , r = Vu(this._lContainer, n);
                return r && null != Wa(Yd(this._lContainer), n) ? new ms(r) : null
            }
            _adjustIndex(t, n=0) {
                return t ?? this.length + n
            }
        }
        ;
        function Aw(e) {
            return e[an]
        }
        function Yd(e) {
            return e[an] || (e[an] = [])
        }
        function Sl(...e) {}
        const Il = new $("Application Initializer");
        let Ol = (()=>{
            class e {
                constructor(n) {
                    this.appInits = n,
                    this.resolve = Sl,
                    this.reject = Sl,
                    this.initialized = !1,
                    this.done = !1,
                    this.donePromise = new Promise((r,o)=>{
                        this.resolve = r,
                        this.reject = o
                    }
                    )
                }
                runInitializers() {
                    if (this.initialized)
                        return;
                    const n = []
                      , r = ()=>{
                        this.done = !0,
                        this.resolve()
                    }
                    ;
                    if (this.appInits)
                        for (let o = 0; o < this.appInits.length; o++) {
                            const i = this.appInits[o]();
                            if (yl(i))
                                n.push(i);
                            else if (Ym(i)) {
                                const s = new Promise((a,l)=>{
                                    i.subscribe({
                                        complete: a,
                                        error: l
                                    })
                                }
                                );
                                n.push(s)
                            }
                        }
                    Promise.all(n).then(()=>{
                        r()
                    }
                    ).catch(o=>{
                        this.reject(o)
                    }
                    ),
                    0 === n.length && r(),
                    this.initialized = !0
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Il, 8))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const Is = new $("AppId",{
            providedIn: "root",
            factory: function iv() {
                return `${af()}${af()}${af()}`
            }
        });
        function af() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }
        const sv = new $("Platform Initializer")
          , av = new $("Platform ID",{
            providedIn: "platform",
            factory: ()=>"unknown"
        })
          , lv = new $("appBootstrapListener");
        let l1 = (()=>{
            class e {
                log(n) {
                    console.log(n)
                }
                warn(n) {
                    console.warn(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )();
        const er = new $("LocaleId",{
            providedIn: "root",
            factory: ()=>J(er, R.Optional | R.SkipSelf) || function c1() {
                return typeof $localize < "u" && $localize.locale || si
            }()
        });
        class d1 {
            constructor(t, n) {
                this.ngModuleFactory = t,
                this.componentFactories = n
            }
        }
        let cv = (()=>{
            class e {
                compileModuleSync(n) {
                    return new zd(n)
                }
                compileModuleAsync(n) {
                    return Promise.resolve(this.compileModuleSync(n))
                }
                compileModuleAndAllComponentsSync(n) {
                    const r = this.compileModuleSync(n)
                      , i = Qn(rt(n).declarations).reduce((s,a)=>{
                        const l = ie(a);
                        return l && s.push(new ys(l)),
                        s
                    }
                    , []);
                    return new d1(r,i)
                }
                compileModuleAndAllComponentsAsync(n) {
                    return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
                }
                clearCache() {}
                clearCacheFor(n) {}
                getModuleId(n) {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const p1 = (()=>Promise.resolve(0))();
        function lf(e) {
            typeof Zone > "u" ? p1.then(()=>{
                e && e.apply(null, null)
            }
            ) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
        }
        class Se {
            constructor({enableLongStackTrace: t=!1, shouldCoalesceEventChangeDetection: n=!1, shouldCoalesceRunChangeDetection: r=!1}) {
                if (this.hasPendingMacrotasks = !1,
                this.hasPendingMicrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new mt(!1),
                this.onMicrotaskEmpty = new mt(!1),
                this.onStable = new mt(!1),
                this.onError = new mt(!1),
                typeof Zone > "u")
                    throw new E(908,!1);
                Zone.assertZonePatched();
                const o = this;
                o._nesting = 0,
                o._outer = o._inner = Zone.current,
                Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)),
                t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                o.shouldCoalesceEventChangeDetection = !r && n,
                o.shouldCoalesceRunChangeDetection = r,
                o.lastRequestAnimationFrameId = -1,
                o.nativeRequestAnimationFrame = function g1() {
                    let e = he.requestAnimationFrame
                      , t = he.cancelAnimationFrame;
                    if (typeof Zone < "u" && e && t) {
                        const n = e[Zone.__symbol__("OriginalDelegate")];
                        n && (e = n);
                        const r = t[Zone.__symbol__("OriginalDelegate")];
                        r && (t = r)
                    }
                    return {
                        nativeRequestAnimationFrame: e,
                        nativeCancelAnimationFrame: t
                    }
                }().nativeRequestAnimationFrame,
                function w1(e) {
                    const t = ()=>{
                        !function y1(e) {
                            e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(he, ()=>{
                                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", ()=>{
                                    e.lastRequestAnimationFrameId = -1,
                                    uf(e),
                                    e.isCheckStableRunning = !0,
                                    cf(e),
                                    e.isCheckStableRunning = !1
                                }
                                , void 0, ()=>{}
                                , ()=>{}
                                )),
                                e.fakeTopEventTask.invoke()
                            }
                            ),
                            uf(e))
                        }(e)
                    }
                    ;
                    e._inner = e._inner.fork({
                        name: "angular",
                        properties: {
                            isAngularZone: !0
                        },
                        onInvokeTask: (n,r,o,i,s,a)=>{
                            try {
                                return fv(e),
                                n.invokeTask(o, i, s, a)
                            } finally {
                                (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(),
                                hv(e)
                            }
                        }
                        ,
                        onInvoke: (n,r,o,i,s,a,l)=>{
                            try {
                                return fv(e),
                                n.invoke(o, i, s, a, l)
                            } finally {
                                e.shouldCoalesceRunChangeDetection && t(),
                                hv(e)
                            }
                        }
                        ,
                        onHasTask: (n,r,o,i)=>{
                            n.hasTask(o, i),
                            r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask,
                            uf(e),
                            cf(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                        }
                        ,
                        onHandleError: (n,r,o,i)=>(n.handleError(o, i),
                        e.runOutsideAngular(()=>e.onError.emit(i)),
                        !1)
                    })
                }(o)
            }
            static isInAngularZone() {
                return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
            }
            static assertInAngularZone() {
                if (!Se.isInAngularZone())
                    throw new E(909,!1)
            }
            static assertNotInAngularZone() {
                if (Se.isInAngularZone())
                    throw new E(909,!1)
            }
            run(t, n, r) {
                return this._inner.run(t, n, r)
            }
            runTask(t, n, r, o) {
                const i = this._inner
                  , s = i.scheduleEventTask("NgZoneEvent: " + o, t, m1, Sl, Sl);
                try {
                    return i.runTask(s, n, r)
                } finally {
                    i.cancelTask(s)
                }
            }
            runGuarded(t, n, r) {
                return this._inner.runGuarded(t, n, r)
            }
            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }
        const m1 = {};
        function cf(e) {
            if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
                try {
                    e._nesting++,
                    e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--,
                    !e.hasPendingMicrotasks)
                        try {
                            e.runOutsideAngular(()=>e.onStable.emit(null))
                        } finally {
                            e.isStable = !0
                        }
                }
        }
        function uf(e) {
            e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
        }
        function fv(e) {
            e._nesting++,
            e.isStable && (e.isStable = !1,
            e.onUnstable.emit(null))
        }
        function hv(e) {
            e._nesting--,
            cf(e)
        }
        class v1 {
            constructor() {
                this.hasPendingMicrotasks = !1,
                this.hasPendingMacrotasks = !1,
                this.isStable = !0,
                this.onUnstable = new mt,
                this.onMicrotaskEmpty = new mt,
                this.onStable = new mt,
                this.onError = new mt
            }
            run(t, n, r) {
                return t.apply(n, r)
            }
            runGuarded(t, n, r) {
                return t.apply(n, r)
            }
            runOutsideAngular(t) {
                return t()
            }
            runTask(t, n, r, o) {
                return t.apply(n, r)
            }
        }
        const pv = new $("")
          , Tl = new $("");
        let hf, df = (()=>{
            class e {
                constructor(n, r, o) {
                    this._ngZone = n,
                    this.registry = r,
                    this._pendingCount = 0,
                    this._isZoneStable = !0,
                    this._didWork = !1,
                    this._callbacks = [],
                    this.taskTrackingZone = null,
                    hf || (function C1(e) {
                        hf = e
                    }(o),
                    o.addToWindow(r)),
                    this._watchAngularEvents(),
                    n.run(()=>{
                        this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                    }
                    )
                }
                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: ()=>{
                            this._didWork = !0,
                            this._isZoneStable = !1
                        }
                    }),
                    this._ngZone.runOutsideAngular(()=>{
                        this._ngZone.onStable.subscribe({
                            next: ()=>{
                                Se.assertNotInAngularZone(),
                                lf(()=>{
                                    this._isZoneStable = !0,
                                    this._runCallbacksIfReady()
                                }
                                )
                            }
                        })
                    }
                    )
                }
                increasePendingRequestCount() {
                    return this._pendingCount += 1,
                    this._didWork = !0,
                    this._pendingCount
                }
                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1,
                    this._pendingCount < 0)
                        throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(),
                    this._pendingCount
                }
                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }
                _runCallbacksIfReady() {
                    if (this.isStable())
                        lf(()=>{
                            for (; 0 !== this._callbacks.length; ) {
                                let n = this._callbacks.pop();
                                clearTimeout(n.timeoutId),
                                n.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        }
                        );
                    else {
                        let n = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(r=>!r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId),
                        !1)),
                        this._didWork = !0
                    }
                }
                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n=>({
                        source: n.source,
                        creationLocation: n.creationLocation,
                        data: n.data
                    })) : []
                }
                addCallback(n, r, o) {
                    let i = -1;
                    r && r > 0 && (i = setTimeout(()=>{
                        this._callbacks = this._callbacks.filter(s=>s.timeoutId !== i),
                        n(this._didWork, this.getPendingTasks())
                    }
                    , r)),
                    this._callbacks.push({
                        doneCb: n,
                        timeoutId: i,
                        updateCb: o
                    })
                }
                whenStable(n, r, o) {
                    if (o && !this.taskTrackingZone)
                        throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(n, r, o),
                    this._runCallbacksIfReady()
                }
                getPendingRequestCount() {
                    return this._pendingCount
                }
                registerApplication(n) {
                    this.registry.registerApplication(n, this)
                }
                unregisterApplication(n) {
                    this.registry.unregisterApplication(n)
                }
                findProviders(n, r, o) {
                    return []
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Se),T(ff),T(Tl))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )(), ff = (()=>{
            class e {
                constructor() {
                    this._applications = new Map
                }
                registerApplication(n, r) {
                    this._applications.set(n, r)
                }
                unregisterApplication(n) {
                    this._applications.delete(n)
                }
                unregisterAllApplications() {
                    this._applications.clear()
                }
                getTestability(n) {
                    return this._applications.get(n) || null
                }
                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }
                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }
                findTestabilityInTree(n, r=!0) {
                    return hf?.findTestabilityInTree(this, n, r) ?? null
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )(), Dr = null;
        const gv = new $("AllowMultipleToken")
          , pf = new $("PlatformDestroyListeners")
          , tr = !1;
        class mv {
            constructor(t, n) {
                this.name = t,
                this.token = n
            }
        }
        function wv(e, t, n=[]) {
            const r = `Platform: ${t}`
              , o = new $(r);
            return (i=[])=>{
                let s = gf();
                if (!s || s.injector.get(gv, !1)) {
                    const a = [...n, ...i, {
                        provide: o,
                        useValue: !0
                    }];
                    e ? e(a) : function D1(e) {
                        if (Dr && !Dr.get(gv, !1))
                            throw new E(400,!1);
                        Dr = e;
                        const t = e.get(Cv);
                        (function yv(e) {
                            const t = e.get(sv, null);
                            t && t.forEach(n=>n())
                        }
                        )(e)
                    }(function vv(e=[], t) {
                        return In.create({
                            name: t,
                            providers: [{
                                provide: rd,
                                useValue: "platform"
                            }, {
                                provide: pf,
                                useValue: new Set([()=>Dr = null])
                            }, ...e]
                        })
                    }(a, r))
                }
                return function x1(e) {
                    const t = gf();
                    if (!t)
                        throw new E(401,!1);
                    return t
                }()
            }
        }
        function gf() {
            return Dr?.get(Cv) ?? null
        }
        let Cv = (()=>{
            class e {
                constructor(n) {
                    this._injector = n,
                    this._modules = [],
                    this._destroyListeners = [],
                    this._destroyed = !1
                }
                bootstrapModuleFactory(n, r) {
                    const o = function _v(e, t) {
                        let n;
                        return n = "noop" === e ? new v1 : ("zone.js" === e ? void 0 : e) || new Se(t),
                        n
                    }(r?.ngZone, function bv(e) {
                        return {
                            enableLongStackTrace: !1,
                            shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                            shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
                        }
                    }(r))
                      , i = [{
                        provide: Se,
                        useValue: o
                    }];
                    return o.run(()=>{
                        const s = In.create({
                            providers: i,
                            parent: this.injector,
                            name: n.moduleType.name
                        })
                          , a = n.create(s)
                          , l = a.injector.get(Go, null);
                        if (!l)
                            throw new E(402,!1);
                        return o.runOutsideAngular(()=>{
                            const u = o.onError.subscribe({
                                next: f=>{
                                    l.handleError(f)
                                }
                            });
                            a.onDestroy(()=>{
                                kl(this._modules, a),
                                u.unsubscribe()
                            }
                            )
                        }
                        ),
                        function Dv(e, t, n) {
                            try {
                                const r = n();
                                return yl(r) ? r.catch(o=>{
                                    throw t.runOutsideAngular(()=>e.handleError(o)),
                                    o
                                }
                                ) : r
                            } catch (r) {
                                throw t.runOutsideAngular(()=>e.handleError(r)),
                                r
                            }
                        }(l, o, ()=>{
                            const u = a.injector.get(Ol);
                            return u.runInitializers(),
                            u.donePromise.then(()=>(function qy(e) {
                                qe(e, "Expected localeId to be defined"),
                                "string" == typeof e && (Gy = e.toLowerCase().replace(/_/g, "-"))
                            }(a.injector.get(er, si) || si),
                            this._moduleDoBootstrap(a),
                            a))
                        }
                        )
                    }
                    )
                }
                bootstrapModule(n, r=[]) {
                    const o = Mv({}, r);
                    return function b1(e, t, n) {
                        const r = new zd(n);
                        return Promise.resolve(r)
                    }(0, 0, n).then(i=>this.bootstrapModuleFactory(i, o))
                }
                _moduleDoBootstrap(n) {
                    const r = n.injector.get(Al);
                    if (n._bootstrapComponents.length > 0)
                        n._bootstrapComponents.forEach(o=>r.bootstrap(o));
                    else {
                        if (!n.instance.ngDoBootstrap)
                            throw new E(-403,!1);
                        n.instance.ngDoBootstrap(r)
                    }
                    this._modules.push(n)
                }
                onDestroy(n) {
                    this._destroyListeners.push(n)
                }
                get injector() {
                    return this._injector
                }
                destroy() {
                    if (this._destroyed)
                        throw new E(404,!1);
                    this._modules.slice().forEach(r=>r.destroy()),
                    this._destroyListeners.forEach(r=>r());
                    const n = this._injector.get(pf, null);
                    n && (n.forEach(r=>r()),
                    n.clear()),
                    this._destroyed = !0
                }
                get destroyed() {
                    return this._destroyed
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(In))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "platform"
            }),
            e
        }
        )();
        function Mv(e, t) {
            return Array.isArray(t) ? t.reduce(Mv, e) : {
                ...e,
                ...t
            }
        }
        let Al = (()=>{
            class e {
                get destroyed() {
                    return this._destroyed
                }
                get injector() {
                    return this._injector
                }
                constructor(n, r, o) {
                    this._zone = n,
                    this._injector = r,
                    this._exceptionHandler = o,
                    this._bootstrapListeners = [],
                    this._views = [],
                    this._runningTick = !1,
                    this._stable = !0,
                    this._destroyed = !1,
                    this._destroyListeners = [],
                    this.componentTypes = [],
                    this.components = [],
                    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: ()=>{
                            this._zone.run(()=>{
                                this.tick()
                            }
                            )
                        }
                    });
                    const i = new De(a=>{
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks,
                        this._zone.runOutsideAngular(()=>{
                            a.next(this._stable),
                            a.complete()
                        }
                        )
                    }
                    )
                      , s = new De(a=>{
                        let l;
                        this._zone.runOutsideAngular(()=>{
                            l = this._zone.onStable.subscribe(()=>{
                                Se.assertNotInAngularZone(),
                                lf(()=>{
                                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0,
                                    a.next(!0))
                                }
                                )
                            }
                            )
                        }
                        );
                        const u = this._zone.onUnstable.subscribe(()=>{
                            Se.assertInAngularZone(),
                            this._stable && (this._stable = !1,
                            this._zone.runOutsideAngular(()=>{
                                a.next(!1)
                            }
                            ))
                        }
                        );
                        return ()=>{
                            l.unsubscribe(),
                            u.unsubscribe()
                        }
                    }
                    );
                    this.isStable = function zc(...e) {
                        const t = hr(e)
                          , n = function $c(e, t) {
                            return "number" == typeof Ri(e) ? e.pop() : t
                        }(e, 1 / 0)
                          , r = e;
                        return r.length ? 1 === r.length ? Ht(r[0]) : zt(n)(Pe(r, t)) : Ot
                    }(i, s.pipe(function Gc(e={}) {
                        const {connector: t=(()=>new It), resetOnError: n=!0, resetOnComplete: r=!0, resetOnRefCountZero: o=!0} = e;
                        return i=>{
                            let s, a, l, u = 0, f = !1, p = !1;
                            const g = ()=>{
                                a?.unsubscribe(),
                                a = void 0
                            }
                              , y = ()=>{
                                g(),
                                s = l = void 0,
                                f = p = !1
                            }
                              , w = ()=>{
                                const C = s;
                                y(),
                                C?.unsubscribe()
                            }
                            ;
                            return ye((C,v)=>{
                                u++,
                                !p && !f && g();
                                const M = l = l ?? t();
                                v.add(()=>{
                                    u--,
                                    0 === u && !p && !f && (a = bo(w, o))
                                }
                                ),
                                M.subscribe(v),
                                !s && u > 0 && (s = new lr({
                                    next: P=>M.next(P),
                                    error: P=>{
                                        p = !0,
                                        g(),
                                        a = bo(y, n, P),
                                        M.error(P)
                                    }
                                    ,
                                    complete: ()=>{
                                        f = !0,
                                        g(),
                                        a = bo(y, r),
                                        M.complete()
                                    }
                                }),
                                Ht(C).subscribe(s))
                            }
                            )(i)
                        }
                    }()))
                }
                bootstrap(n, r) {
                    const o = n instanceof qg;
                    if (!this._injector.get(Ol).done) {
                        !o && function mr(e) {
                            const t = ie(e) || Ue(e) || Ze(e);
                            return null !== t && t.standalone
                        }(n);
                        throw new E(405,tr)
                    }
                    let s;
                    s = o ? n : this._injector.get(ps).resolveComponentFactory(n),
                    this.componentTypes.push(s.componentType);
                    const a = function _1(e) {
                        return e.isBoundToModule
                    }(s) ? void 0 : this._injector.get(ai)
                      , u = s.create(In.NULL, [], r || s.selector, a)
                      , f = u.location.nativeElement
                      , p = u.injector.get(pv, null);
                    return p?.registerApplication(f),
                    u.onDestroy(()=>{
                        this.detachView(u.hostView),
                        kl(this.components, u),
                        p?.unregisterApplication(f)
                    }
                    ),
                    this._loadComponent(u),
                    u
                }
                tick() {
                    if (this._runningTick)
                        throw new E(101,!1);
                    try {
                        this._runningTick = !0;
                        for (let n of this._views)
                            n.detectChanges()
                    } catch (n) {
                        this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(n))
                    } finally {
                        this._runningTick = !1
                    }
                }
                attachView(n) {
                    const r = n;
                    this._views.push(r),
                    r.attachToAppRef(this)
                }
                detachView(n) {
                    const r = n;
                    kl(this._views, r),
                    r.detachFromAppRef()
                }
                _loadComponent(n) {
                    this.attachView(n.hostView),
                    this.tick(),
                    this.components.push(n);
                    const r = this._injector.get(lv, []);
                    r.push(...this._bootstrapListeners),
                    r.forEach(o=>o(n))
                }
                ngOnDestroy() {
                    if (!this._destroyed)
                        try {
                            this._destroyListeners.forEach(n=>n()),
                            this._views.slice().forEach(n=>n.destroy()),
                            this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                            this._destroyed = !0,
                            this._views = [],
                            this._bootstrapListeners = [],
                            this._destroyListeners = []
                        }
                }
                onDestroy(n) {
                    return this._destroyListeners.push(n),
                    ()=>kl(this._destroyListeners, n)
                }
                destroy() {
                    if (this._destroyed)
                        throw new E(406,!1);
                    const n = this._injector;
                    n.destroy && !n.destroyed && n.destroy()
                }
                get viewCount() {
                    return this._views.length
                }
                warnIfDestroyed() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Se),T(Kn),T(Go))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function kl(e, t) {
            const n = e.indexOf(t);
            n > -1 && e.splice(n, 1)
        }
        let mf = (()=>{
            class e {
            }
            return e.__NG_ELEMENT_ID__ = P1,
            e
        }
        )();
        function P1(e) {
            return function S1(e, t, n) {
                if (Gr(e) && !n) {
                    const r = Lt(e.index, t);
                    return new ms(r,r)
                }
                return 47 & e.type ? new ms(t[Ne],t) : null
            }(Xe(), x(), 16 == (16 & e))
        }
        const V1 = wv(null, "core", []);
        let U1 = (()=>{
            class e {
                constructor(n) {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Al))
            }
            ,
            e.\u0275mod = zn({
                type: e
            }),
            e.\u0275inj = _n({}),
            e
        }
        )()
          , _f = null;
        function io() {
            return _f
        }
        class G1 {
        }
        const Mt = new $("DocumentToken");
        let Df = (()=>{
            class e {
                historyGo(n) {
                    throw new Error("Not implemented")
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return function q1() {
                        return T(Nv)
                    }()
                },
                providedIn: "platform"
            }),
            e
        }
        )();
        const W1 = new $("Location Initialized");
        let Nv = (()=>{
            class e extends Df {
                constructor(n) {
                    super(),
                    this._doc = n,
                    this._location = window.location,
                    this._history = window.history
                }
                getBaseHrefFromDOM() {
                    return io().getBaseHref(this._doc)
                }
                onPopState(n) {
                    const r = io().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("popstate", n, !1),
                    ()=>r.removeEventListener("popstate", n)
                }
                onHashChange(n) {
                    const r = io().getGlobalEventTarget(this._doc, "window");
                    return r.addEventListener("hashchange", n, !1),
                    ()=>r.removeEventListener("hashchange", n)
                }
                get href() {
                    return this._location.href
                }
                get protocol() {
                    return this._location.protocol
                }
                get hostname() {
                    return this._location.hostname
                }
                get port() {
                    return this._location.port
                }
                get pathname() {
                    return this._location.pathname
                }
                get search() {
                    return this._location.search
                }
                get hash() {
                    return this._location.hash
                }
                set pathname(n) {
                    this._location.pathname = n
                }
                pushState(n, r, o) {
                    Fv() ? this._history.pushState(n, r, o) : this._location.hash = o
                }
                replaceState(n, r, o) {
                    Fv() ? this._history.replaceState(n, r, o) : this._location.hash = o
                }
                forward() {
                    this._history.forward()
                }
                back() {
                    this._history.back()
                }
                historyGo(n=0) {
                    this._history.go(n)
                }
                getState() {
                    return this._history.state
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Mt))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return function Y1() {
                        return new Nv(T(Mt))
                    }()
                },
                providedIn: "platform"
            }),
            e
        }
        )();
        function Fv() {
            return !!window.history.pushState
        }
        function Mf(e, t) {
            if (0 == e.length)
                return t;
            if (0 == t.length)
                return e;
            let n = 0;
            return e.endsWith("/") && n++,
            t.startsWith("/") && n++,
            2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        }
        function Lv(e) {
            const t = e.match(/#|\?|$/)
              , n = t && t.index || e.length;
            return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n)
        }
        function nr(e) {
            return e && "?" !== e[0] ? "?" + e : e
        }
        let so = (()=>{
            class e {
                historyGo(n) {
                    throw new Error("Not implemented")
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return J($v)
                },
                providedIn: "root"
            }),
            e
        }
        )();
        const Bv = new $("appBaseHref");
        let $v = (()=>{
            class e extends so {
                constructor(n, r) {
                    super(),
                    this._platformLocation = n,
                    this._removeListenerFns = [],
                    this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? J(Mt).location?.origin ?? ""
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(n) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                }
                getBaseHref() {
                    return this._baseHref
                }
                prepareExternalUrl(n) {
                    return Mf(this._baseHref, n)
                }
                path(n=!1) {
                    const r = this._platformLocation.pathname + nr(this._platformLocation.search)
                      , o = this._platformLocation.hash;
                    return o && n ? `${r}${o}` : r
                }
                pushState(n, r, o, i) {
                    const s = this.prepareExternalUrl(o + nr(i));
                    this._platformLocation.pushState(n, r, s)
                }
                replaceState(n, r, o, i) {
                    const s = this.prepareExternalUrl(o + nr(i));
                    this._platformLocation.replaceState(n, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(n=0) {
                    this._platformLocation.historyGo?.(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Df),T(Bv, 8))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )()
          , Z1 = (()=>{
            class e extends so {
                constructor(n, r) {
                    super(),
                    this._platformLocation = n,
                    this._baseHref = "",
                    this._removeListenerFns = [],
                    null != r && (this._baseHref = r)
                }
                ngOnDestroy() {
                    for (; this._removeListenerFns.length; )
                        this._removeListenerFns.pop()()
                }
                onPopState(n) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                }
                getBaseHref() {
                    return this._baseHref
                }
                path(n=!1) {
                    let r = this._platformLocation.hash;
                    return null == r && (r = "#"),
                    r.length > 0 ? r.substring(1) : r
                }
                prepareExternalUrl(n) {
                    const r = Mf(this._baseHref, n);
                    return r.length > 0 ? "#" + r : r
                }
                pushState(n, r, o, i) {
                    let s = this.prepareExternalUrl(o + nr(i));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.pushState(n, r, s)
                }
                replaceState(n, r, o, i) {
                    let s = this.prepareExternalUrl(o + nr(i));
                    0 == s.length && (s = this._platformLocation.pathname),
                    this._platformLocation.replaceState(n, r, s)
                }
                forward() {
                    this._platformLocation.forward()
                }
                back() {
                    this._platformLocation.back()
                }
                getState() {
                    return this._platformLocation.getState()
                }
                historyGo(n=0) {
                    this._platformLocation.historyGo?.(n)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Df),T(Bv, 8))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )()
          , xf = (()=>{
            class e {
                constructor(n) {
                    this._subject = new mt,
                    this._urlChangeListeners = [],
                    this._urlChangeSubscription = null,
                    this._locationStrategy = n;
                    const r = this._locationStrategy.getBaseHref();
                    this._basePath = function X1(e) {
                        if (new RegExp("^(https?:)?//").test(e)) {
                            const [,n] = e.split(/\/\/[^\/]+/);
                            return n
                        }
                        return e
                    }(Lv(jv(r))),
                    this._locationStrategy.onPopState(o=>{
                        this._subject.emit({
                            url: this.path(!0),
                            pop: !0,
                            state: o.state,
                            type: o.type
                        })
                    }
                    )
                }
                ngOnDestroy() {
                    this._urlChangeSubscription?.unsubscribe(),
                    this._urlChangeListeners = []
                }
                path(n=!1) {
                    return this.normalize(this._locationStrategy.path(n))
                }
                getState() {
                    return this._locationStrategy.getState()
                }
                isCurrentPathEqualTo(n, r="") {
                    return this.path() == this.normalize(n + nr(r))
                }
                normalize(n) {
                    return e.stripTrailingSlash(function Q1(e, t) {
                        if (!e || !t.startsWith(e))
                            return t;
                        const n = t.substring(e.length);
                        return "" === n || ["/", ";", "?", "#"].includes(n[0]) ? n : t
                    }(this._basePath, jv(n)))
                }
                prepareExternalUrl(n) {
                    return n && "/" !== n[0] && (n = "/" + n),
                    this._locationStrategy.prepareExternalUrl(n)
                }
                go(n, r="", o=null) {
                    this._locationStrategy.pushState(o, "", n, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(n + nr(r)), o)
                }
                replaceState(n, r="", o=null) {
                    this._locationStrategy.replaceState(o, "", n, r),
                    this._notifyUrlChangeListeners(this.prepareExternalUrl(n + nr(r)), o)
                }
                forward() {
                    this._locationStrategy.forward()
                }
                back() {
                    this._locationStrategy.back()
                }
                historyGo(n=0) {
                    this._locationStrategy.historyGo?.(n)
                }
                onUrlChange(n) {
                    return this._urlChangeListeners.push(n),
                    this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r=>{
                        this._notifyUrlChangeListeners(r.url, r.state)
                    }
                    )),
                    ()=>{
                        const r = this._urlChangeListeners.indexOf(n);
                        this._urlChangeListeners.splice(r, 1),
                        0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(),
                        this._urlChangeSubscription = null)
                    }
                }
                _notifyUrlChangeListeners(n="", r) {
                    this._urlChangeListeners.forEach(o=>o(n, r))
                }
                subscribe(n, r, o) {
                    return this._subject.subscribe({
                        next: n,
                        error: r,
                        complete: o
                    })
                }
            }
            return e.normalizeQueryParams = nr,
            e.joinWithSlash = Mf,
            e.stripTrailingSlash = Lv,
            e.\u0275fac = function(n) {
                return new (n || e)(T(so))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return function K1() {
                        return new xf(T(so))
                    }()
                },
                providedIn: "root"
            }),
            e
        }
        )();
        function jv(e) {
            return e.replace(/\/index.html$/, "")
        }
        let hI = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275mod = zn({
                type: e
            }),
            e.\u0275inj = _n({}),
            e
        }
        )();
        let yI = (()=>{
            class e {
            }
            return e.\u0275prov = L({
                token: e,
                providedIn: "root",
                factory: ()=>new wI(T(Mt),window)
            }),
            e
        }
        )();
        class wI {
            constructor(t, n) {
                this.document = t,
                this.window = n,
                this.offset = ()=>[0, 0]
            }
            setOffset(t) {
                this.offset = Array.isArray(t) ? ()=>t : t
            }
            getScrollPosition() {
                return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
            }
            scrollToPosition(t) {
                this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
            }
            scrollToAnchor(t) {
                if (!this.supportsScrolling())
                    return;
                const n = function vI(e, t) {
                    const n = e.getElementById(t) || e.getElementsByName(t)[0];
                    if (n)
                        return n;
                    if ("function" == typeof e.createTreeWalker && e.body && (e.body.createShadowRoot || e.body.attachShadow)) {
                        const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                        let o = r.currentNode;
                        for (; o; ) {
                            const i = o.shadowRoot;
                            if (i) {
                                const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                                if (s)
                                    return s
                            }
                            o = r.nextNode()
                        }
                    }
                    return null
                }(this.document, t);
                n && (this.scrollToElement(n),
                n.focus())
            }
            setHistoryScrollRestoration(t) {
                if (this.supportScrollRestoration()) {
                    const n = this.window.history;
                    n && n.scrollRestoration && (n.scrollRestoration = t)
                }
            }
            scrollToElement(t) {
                const n = t.getBoundingClientRect()
                  , r = n.left + this.window.pageXOffset
                  , o = n.top + this.window.pageYOffset
                  , i = this.offset();
                this.window.scrollTo(r - i[0], o - i[1])
            }
            supportScrollRestoration() {
                try {
                    if (!this.supportsScrolling())
                        return !1;
                    const t = r0(this.window.history) || r0(Object.getPrototypeOf(this.window.history));
                    return !(!t || !t.writable && !t.set)
                } catch {
                    return !1
                }
            }
            supportsScrolling() {
                try {
                    return !!this.window && !!this.window.scrollTo && "pageXOffset"in this.window
                } catch {
                    return !1
                }
            }
        }
        function r0(e) {
            return Object.getOwnPropertyDescriptor(e, "scrollRestoration")
        }
        class WI extends G1 {
            constructor() {
                super(...arguments),
                this.supportsDOMEvents = !0
            }
        }
        class Uf extends WI {
            static makeCurrent() {
                !function z1(e) {
                    _f || (_f = e)
                }(new Uf)
            }
            onAndCancel(t, n, r) {
                return t.addEventListener(n, r, !1),
                ()=>{
                    t.removeEventListener(n, r, !1)
                }
            }
            dispatchEvent(t, n) {
                t.dispatchEvent(n)
            }
            remove(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }
            createElement(t, n) {
                return (n = n || this.getDefaultDocument()).createElement(t)
            }
            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }
            getDefaultDocument() {
                return document
            }
            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }
            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }
            getGlobalEventTarget(t, n) {
                return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
            }
            getBaseHref(t) {
                const n = function YI() {
                    return Rs = Rs || document.querySelector("base"),
                    Rs ? Rs.getAttribute("href") : null
                }();
                return null == n ? null : function ZI(e) {
                    Yl = Yl || document.createElement("a"),
                    Yl.setAttribute("href", e);
                    const t = Yl.pathname;
                    return "/" === t.charAt(0) ? t : `/${t}`
                }(n)
            }
            resetBaseElement() {
                Rs = null
            }
            getUserAgent() {
                return window.navigator.userAgent
            }
            getCookie(t) {
                return function NS(e, t) {
                    t = encodeURIComponent(t);
                    for (const n of e.split(";")) {
                        const r = n.indexOf("=")
                          , [o,i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                        if (o.trim() === t)
                            return decodeURIComponent(i)
                    }
                    return null
                }(document.cookie, t)
            }
        }
        let Yl, Rs = null;
        const c0 = new $("TRANSITION_ID")
          , QI = [{
            provide: Il,
            useFactory: function KI(e, t, n) {
                return ()=>{
                    n.get(Ol).donePromise.then(()=>{
                        const r = io()
                          , o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                        for (let i = 0; i < o.length; i++)
                            r.remove(o[i])
                    }
                    )
                }
            },
            deps: [c0, Mt, In],
            multi: !0
        }];
        let JI = (()=>{
            class e {
                build() {
                    return new XMLHttpRequest
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const Zl = new $("EventManagerPlugins");
        let Kl = (()=>{
            class e {
                constructor(n, r) {
                    this._zone = r,
                    this._eventNameToPlugin = new Map,
                    n.forEach(o=>o.manager = this),
                    this._plugins = n.slice().reverse()
                }
                addEventListener(n, r, o) {
                    return this._findPluginFor(r).addEventListener(n, r, o)
                }
                addGlobalEventListener(n, r, o) {
                    return this._findPluginFor(r).addGlobalEventListener(n, r, o)
                }
                getZone() {
                    return this._zone
                }
                _findPluginFor(n) {
                    const r = this._eventNameToPlugin.get(n);
                    if (r)
                        return r;
                    const o = this._plugins;
                    for (let i = 0; i < o.length; i++) {
                        const s = o[i];
                        if (s.supports(n))
                            return this._eventNameToPlugin.set(n, s),
                            s
                    }
                    throw new Error(`No event manager plugin found for event ${n}`)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Zl),T(Se))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        class u0 {
            constructor(t) {
                this._doc = t
            }
            addGlobalEventListener(t, n, r) {
                const o = io().getGlobalEventTarget(this._doc, t);
                if (!o)
                    throw new Error(`Unsupported event target ${o} for event ${n}`);
                return this.addEventListener(o, n, r)
            }
        }
        let d0 = (()=>{
            class e {
                constructor() {
                    this.usageCount = new Map
                }
                addStyles(n) {
                    for (const r of n)
                        1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                }
                removeStyles(n) {
                    for (const r of n)
                        0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r)
                }
                onStyleRemoved(n) {}
                onStyleAdded(n) {}
                getAllStyles() {
                    return this.usageCount.keys()
                }
                changeUsageCount(n, r) {
                    const o = this.usageCount;
                    let i = o.get(n) ?? 0;
                    return i += r,
                    i > 0 ? o.set(n, i) : o.delete(n),
                    i
                }
                ngOnDestroy() {
                    for (const n of this.getAllStyles())
                        this.onStyleRemoved(n);
                    this.usageCount.clear()
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )()
          , Ns = (()=>{
            class e extends d0 {
                constructor(n) {
                    super(),
                    this.doc = n,
                    this.styleRef = new Map,
                    this.hostNodes = new Set,
                    this.resetHostNodes()
                }
                onStyleAdded(n) {
                    for (const r of this.hostNodes)
                        this.addStyleToHost(r, n)
                }
                onStyleRemoved(n) {
                    const r = this.styleRef;
                    r.get(n)?.forEach(i=>i.remove()),
                    r.delete(n)
                }
                ngOnDestroy() {
                    super.ngOnDestroy(),
                    this.styleRef.clear(),
                    this.resetHostNodes()
                }
                addHost(n) {
                    this.hostNodes.add(n);
                    for (const r of this.getAllStyles())
                        this.addStyleToHost(n, r)
                }
                removeHost(n) {
                    this.hostNodes.delete(n)
                }
                addStyleToHost(n, r) {
                    const o = this.doc.createElement("style");
                    o.textContent = r,
                    n.appendChild(o);
                    const i = this.styleRef.get(r);
                    i ? i.push(o) : this.styleRef.set(r, [o])
                }
                resetHostNodes() {
                    const n = this.hostNodes;
                    n.clear(),
                    n.add(this.doc.head)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Mt))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const Hf = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/",
            math: "http://www.w3.org/1998/MathML/"
        }
          , zf = /%COMP%/g
          , p0 = new $("RemoveStylesOnCompDestory",{
            providedIn: "root",
            factory: ()=>!1
        });
        function g0(e, t) {
            return t.flat(100).map(n=>n.replace(zf, e))
        }
        function m0(e) {
            return t=>{
                if ("__ngUnwrap__" === t)
                    return e;
                !1 === e(t) && (t.preventDefault(),
                t.returnValue = !1)
            }
        }
        let Gf = (()=>{
            class e {
                constructor(n, r, o, i) {
                    this.eventManager = n,
                    this.sharedStylesHost = r,
                    this.appId = o,
                    this.removeStylesOnCompDestory = i,
                    this.rendererByCompId = new Map,
                    this.defaultRenderer = new qf(n)
                }
                createRenderer(n, r) {
                    if (!n || !r)
                        return this.defaultRenderer;
                    const o = this.getOrCreateRenderer(n, r);
                    return o instanceof v0 ? o.applyToHost(n) : o instanceof Wf && o.applyStyles(),
                    o
                }
                getOrCreateRenderer(n, r) {
                    const o = this.rendererByCompId;
                    let i = o.get(r.id);
                    if (!i) {
                        const s = this.eventManager
                          , a = this.sharedStylesHost
                          , l = this.removeStylesOnCompDestory;
                        switch (r.encapsulation) {
                        case qt.Emulated:
                            i = new v0(s,a,r,this.appId,l);
                            break;
                        case qt.ShadowDom:
                            return new sO(s,a,n,r);
                        default:
                            i = new Wf(s,a,r,l)
                        }
                        i.onDestroy = ()=>o.delete(r.id),
                        o.set(r.id, i)
                    }
                    return i
                }
                ngOnDestroy() {
                    this.rendererByCompId.clear()
                }
                begin() {}
                end() {}
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Kl),T(Ns),T(Is),T(p0))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        class qf {
            constructor(t) {
                this.eventManager = t,
                this.data = Object.create(null),
                this.destroyNode = null
            }
            destroy() {}
            createElement(t, n) {
                return n ? document.createElementNS(Hf[n] || n, t) : document.createElement(t)
            }
            createComment(t) {
                return document.createComment(t)
            }
            createText(t) {
                return document.createTextNode(t)
            }
            appendChild(t, n) {
                (w0(t) ? t.content : t).appendChild(n)
            }
            insertBefore(t, n, r) {
                t && (w0(t) ? t.content : t).insertBefore(n, r)
            }
            removeChild(t, n) {
                t && t.removeChild(n)
            }
            selectRootElement(t, n) {
                let r = "string" == typeof t ? document.querySelector(t) : t;
                if (!r)
                    throw new Error(`The selector "${t}" did not match any elements`);
                return n || (r.textContent = ""),
                r
            }
            parentNode(t) {
                return t.parentNode
            }
            nextSibling(t) {
                return t.nextSibling
            }
            setAttribute(t, n, r, o) {
                if (o) {
                    n = o + ":" + n;
                    const i = Hf[o];
                    i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
                } else
                    t.setAttribute(n, r)
            }
            removeAttribute(t, n, r) {
                if (r) {
                    const o = Hf[r];
                    o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
                } else
                    t.removeAttribute(n)
            }
            addClass(t, n) {
                t.classList.add(n)
            }
            removeClass(t, n) {
                t.classList.remove(n)
            }
            setStyle(t, n, r, o) {
                o & (_t.DashCase | _t.Important) ? t.style.setProperty(n, r, o & _t.Important ? "important" : "") : t.style[n] = r
            }
            removeStyle(t, n, r) {
                r & _t.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
            }
            setProperty(t, n, r) {
                t[n] = r
            }
            setValue(t, n) {
                t.nodeValue = n
            }
            listen(t, n, r) {
                return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, n, m0(r)) : this.eventManager.addEventListener(t, n, m0(r))
            }
        }
        function w0(e) {
            return "TEMPLATE" === e.tagName && void 0 !== e.content
        }
        class sO extends qf {
            constructor(t, n, r, o) {
                super(t),
                this.sharedStylesHost = n,
                this.hostEl = r,
                this.shadowRoot = r.attachShadow({
                    mode: "open"
                }),
                this.sharedStylesHost.addHost(this.shadowRoot);
                const i = g0(o.id, o.styles);
                for (const s of i) {
                    const a = document.createElement("style");
                    a.textContent = s,
                    this.shadowRoot.appendChild(a)
                }
            }
            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }
            appendChild(t, n) {
                return super.appendChild(this.nodeOrShadowRoot(t), n)
            }
            insertBefore(t, n, r) {
                return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
            }
            removeChild(t, n) {
                return super.removeChild(this.nodeOrShadowRoot(t), n)
            }
            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }
        }
        class Wf extends qf {
            constructor(t, n, r, o, i=r.id) {
                super(t),
                this.sharedStylesHost = n,
                this.removeStylesOnCompDestory = o,
                this.rendererUsageCount = 0,
                this.styles = g0(i, r.styles)
            }
            applyStyles() {
                this.sharedStylesHost.addStyles(this.styles),
                this.rendererUsageCount++
            }
            destroy() {
                this.removeStylesOnCompDestory && (this.sharedStylesHost.removeStyles(this.styles),
                this.rendererUsageCount--,
                0 === this.rendererUsageCount && this.onDestroy?.())
            }
        }
        class v0 extends Wf {
            constructor(t, n, r, o, i) {
                const s = o + "-" + r.id;
                super(t, n, r, i, s),
                this.contentAttr = function rO(e) {
                    return "_ngcontent-%COMP%".replace(zf, e)
                }(s),
                this.hostAttr = function oO(e) {
                    return "_nghost-%COMP%".replace(zf, e)
                }(s)
            }
            applyToHost(t) {
                this.applyStyles(),
                this.setAttribute(t, this.hostAttr, "")
            }
            createElement(t, n) {
                const r = super.createElement(t, n);
                return super.setAttribute(r, this.contentAttr, ""),
                r
            }
        }
        let aO = (()=>{
            class e extends u0 {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return !0
                }
                addEventListener(n, r, o) {
                    return n.addEventListener(r, o, !1),
                    ()=>this.removeEventListener(n, r, o)
                }
                removeEventListener(n, r, o) {
                    return n.removeEventListener(r, o)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Mt))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const C0 = ["alt", "control", "meta", "shift"]
          , lO = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }
          , cO = {
            alt: e=>e.altKey,
            control: e=>e.ctrlKey,
            meta: e=>e.metaKey,
            shift: e=>e.shiftKey
        };
        let uO = (()=>{
            class e extends u0 {
                constructor(n) {
                    super(n)
                }
                supports(n) {
                    return null != e.parseEventName(n)
                }
                addEventListener(n, r, o) {
                    const i = e.parseEventName(r)
                      , s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(()=>io().onAndCancel(n, i.domEventName, s))
                }
                static parseEventName(n) {
                    const r = n.toLowerCase().split(".")
                      , o = r.shift();
                    if (0 === r.length || "keydown" !== o && "keyup" !== o)
                        return null;
                    const i = e._normalizeKey(r.pop());
                    let s = ""
                      , a = r.indexOf("code");
                    if (a > -1 && (r.splice(a, 1),
                    s = "code."),
                    C0.forEach(u=>{
                        const f = r.indexOf(u);
                        f > -1 && (r.splice(f, 1),
                        s += u + ".")
                    }
                    ),
                    s += i,
                    0 != r.length || 0 === i.length)
                        return null;
                    const l = {};
                    return l.domEventName = o,
                    l.fullKey = s,
                    l
                }
                static matchEventFullKeyCode(n, r) {
                    let o = lO[n.key] || n.key
                      , i = "";
                    return r.indexOf("code.") > -1 && (o = n.code,
                    i = "code."),
                    !(null == o || !o) && (o = o.toLowerCase(),
                    " " === o ? o = "space" : "." === o && (o = "dot"),
                    C0.forEach(s=>{
                        s !== o && (0,
                        cO[s])(n) && (i += s + ".")
                    }
                    ),
                    i += o,
                    i === r)
                }
                static eventCallback(n, r, o) {
                    return i=>{
                        e.matchEventFullKeyCode(i, n) && o.runGuarded(()=>r(i))
                    }
                }
                static _normalizeKey(n) {
                    return "esc" === n ? "escape" : n
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Mt))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        const pO = wv(V1, "browser", [{
            provide: av,
            useValue: "browser"
        }, {
            provide: sv,
            useValue: function dO() {
                Uf.makeCurrent()
            },
            multi: !0
        }, {
            provide: Mt,
            useFactory: function hO() {
                return function N_(e) {
                    Yu = e
                }(document),
                document
            },
            deps: []
        }])
          , D0 = new $("")
          , M0 = [{
            provide: Tl,
            useClass: class XI {
                addToWindow(t) {
                    he.getAngularTestability = (r,o=!0)=>{
                        const i = t.findTestabilityInTree(r, o);
                        if (null == i)
                            throw new Error("Could not find testability for element.");
                        return i
                    }
                    ,
                    he.getAllAngularTestabilities = ()=>t.getAllTestabilities(),
                    he.getAllAngularRootElements = ()=>t.getAllRootElements(),
                    he.frameworkStabilizers || (he.frameworkStabilizers = []),
                    he.frameworkStabilizers.push(r=>{
                        const o = he.getAllAngularTestabilities();
                        let i = o.length
                          , s = !1;
                        const a = function(l) {
                            s = s || l,
                            i--,
                            0 == i && r(s)
                        };
                        o.forEach(function(l) {
                            l.whenStable(a)
                        })
                    }
                    )
                }
                findTestabilityInTree(t, n, r) {
                    return null == n ? null : t.getTestability(n) ?? (r ? io().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                }
            }
            ,
            deps: []
        }, {
            provide: pv,
            useClass: df,
            deps: [Se, ff, Tl]
        }, {
            provide: df,
            useClass: df,
            deps: [Se, ff, Tl]
        }]
          , x0 = [{
            provide: rd,
            useValue: "root"
        }, {
            provide: Go,
            useFactory: function fO() {
                return new Go
            },
            deps: []
        }, {
            provide: Zl,
            useClass: aO,
            multi: !0,
            deps: [Mt, Se, av]
        }, {
            provide: Zl,
            useClass: uO,
            multi: !0,
            deps: [Mt]
        }, {
            provide: Gf,
            useClass: Gf,
            deps: [Kl, Ns, Is, p0]
        }, {
            provide: Yg,
            useExisting: Gf
        }, {
            provide: d0,
            useExisting: Ns
        }, {
            provide: Ns,
            useClass: Ns,
            deps: [Mt]
        }, {
            provide: Kl,
            useClass: Kl,
            deps: [Zl, Se]
        }, {
            provide: class CI {
            }
            ,
            useClass: JI,
            deps: []
        }, []];
        let gO = (()=>{
            class e {
                constructor(n) {}
                static withServerTransition(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: Is,
                            useValue: n.appId
                        }, {
                            provide: c0,
                            useExisting: Is
                        }, QI]
                    }
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(D0, 12))
            }
            ,
            e.\u0275mod = zn({
                type: e
            }),
            e.\u0275inj = _n({
                providers: [...x0, ...M0],
                imports: [hI, U1]
            }),
            e
        }
        )()
          , E0 = (()=>{
            class e {
                constructor(n) {
                    this._doc = n
                }
                getTitle() {
                    return this._doc.title
                }
                setTitle(n) {
                    this._doc.title = n || ""
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Mt))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function(n) {
                    let r = null;
                    return r = n ? new n : function yO() {
                        return new E0(T(Mt))
                    }(),
                    r
                },
                providedIn: "root"
            }),
            e
        }
        )();
        function F(...e) {
            return Pe(e, hr(e))
        }
        typeof window < "u" && window;
        class gn extends It {
            constructor(t) {
                super(),
                this._value = t
            }
            get value() {
                return this.getValue()
            }
            _subscribe(t) {
                const n = super._subscribe(t);
                return !n.closed && t.next(this._value),
                n
            }
            getValue() {
                const {hasError: t, thrownError: n, _value: r} = this;
                if (t)
                    throw n;
                return this._throwIfClosed(),
                r
            }
            next(t) {
                super.next(this._value = t)
            }
        }
        const Ql = b(e=>function() {
            e(this),
            this.name = "EmptyError",
            this.message = "no elements in sequence"
        }
        )
          , {isArray: xO} = Array
          , {getPrototypeOf: EO, prototype: PO, keys: SO} = Object;
        const {isArray: TO} = Array;
        function I0(...e) {
            const t = hr(e)
              , n = function Bc(e) {
                return te(Ri(e)) ? e.pop() : void 0
            }(e)
              , {args: r, keys: o} = function IO(e) {
                if (1 === e.length) {
                    const t = e[0];
                    if (xO(t))
                        return {
                            args: t,
                            keys: null
                        };
                    if (function OO(e) {
                        return e && "object" == typeof e && EO(e) === PO
                    }(t)) {
                        const n = SO(t);
                        return {
                            args: n.map(r=>t[r]),
                            keys: n
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }(e);
            if (0 === r.length)
                return Pe([], t);
            const i = new De(function NO(e, t, n=jn) {
                return r=>{
                    O0(t, ()=>{
                        const {length: o} = e
                          , i = new Array(o);
                        let s = o
                          , a = o;
                        for (let l = 0; l < o; l++)
                            O0(t, ()=>{
                                const u = Pe(e[l], t);
                                let f = !1;
                                u.subscribe(ae(r, p=>{
                                    i[l] = p,
                                    f || (f = !0,
                                    a--),
                                    a || r.next(n(i.slice()))
                                }
                                , ()=>{
                                    --s || r.complete()
                                }
                                ))
                            }
                            , r)
                    }
                    , r)
                }
            }(r, t, o ? s=>function RO(e, t) {
                return e.reduce((n,r,o)=>(n[r] = t[o],
                n), {})
            }(o, s) : jn));
            return n ? i.pipe(function kO(e) {
                return Q(t=>function AO(e, t) {
                    return TO(t) ? e(...t) : e(t)
                }(e, t))
            }(n)) : i
        }
        function O0(e, t, n) {
            e ? on(n, e, t) : t()
        }
        function Kf(...e) {
            return function FO() {
                return zt(1)
            }()(Pe(e, hr(e)))
        }
        function T0(e) {
            return new De(t=>{
                Ht(e()).subscribe(t)
            }
            )
        }
        function Fs(e, t) {
            const n = te(e) ? e : ()=>e
              , r = o=>o.error(n());
            return new De(t ? o=>t.schedule(r, 0, o) : r)
        }
        function Qf() {
            return ye((e,t)=>{
                let n = null;
                e._refCount++;
                const r = ae(t, void 0, void 0, void 0, ()=>{
                    if (!e || e._refCount <= 0 || 0 < --e._refCount)
                        return void (n = null);
                    const o = e._connection
                      , i = n;
                    n = null,
                    o && (!i || o === i) && o.unsubscribe(),
                    t.unsubscribe()
                }
                );
                e.subscribe(r),
                r.closed || (n = e.connect())
            }
            )
        }
        class A0 extends De {
            constructor(t, n) {
                super(),
                this.source = t,
                this.subjectFactory = n,
                this._subject = null,
                this._refCount = 0,
                this._connection = null,
                ia(t) && (this.lift = t.lift)
            }
            _subscribe(t) {
                return this.getSubject().subscribe(t)
            }
            getSubject() {
                const t = this._subject;
                return (!t || t.isStopped) && (this._subject = this.subjectFactory()),
                this._subject
            }
            _teardown() {
                this._refCount = 0;
                const {_connection: t} = this;
                this._subject = this._connection = null,
                t?.unsubscribe()
            }
            connect() {
                let t = this._connection;
                if (!t) {
                    t = this._connection = new wt;
                    const n = this.getSubject();
                    t.add(this.source.subscribe(ae(n, void 0, ()=>{
                        this._teardown(),
                        n.complete()
                    }
                    , r=>{
                        this._teardown(),
                        n.error(r)
                    }
                    , ()=>this._teardown()))),
                    t.closed && (this._connection = null,
                    t = wt.EMPTY)
                }
                return t
            }
            refCount() {
                return Qf()(this)
            }
        }
        function Rn(e, t) {
            return ye((n,r)=>{
                let o = null
                  , i = 0
                  , s = !1;
                const a = ()=>s && !o && r.complete();
                n.subscribe(ae(r, l=>{
                    o?.unsubscribe();
                    let u = 0;
                    const f = i++;
                    Ht(e(l, f)).subscribe(o = ae(r, p=>r.next(t ? t(l, p, f, u++) : p), ()=>{
                        o = null,
                        a()
                    }
                    ))
                }
                , ()=>{
                    s = !0,
                    a()
                }
                ))
            }
            )
        }
        function Ls(e) {
            return e <= 0 ? ()=>Ot : ye((t,n)=>{
                let r = 0;
                t.subscribe(ae(n, o=>{
                    ++r <= e && (n.next(o),
                    e <= r && n.complete())
                }
                ))
            }
            )
        }
        function xr(e, t) {
            return ye((n,r)=>{
                let o = 0;
                n.subscribe(ae(r, i=>e.call(t, i, o++) && r.next(i)))
            }
            )
        }
        function Xl(e) {
            return ye((t,n)=>{
                let r = !1;
                t.subscribe(ae(n, o=>{
                    r = !0,
                    n.next(o)
                }
                , ()=>{
                    r || n.next(e),
                    n.complete()
                }
                ))
            }
            )
        }
        function k0(e=BO) {
            return ye((t,n)=>{
                let r = !1;
                t.subscribe(ae(n, o=>{
                    r = !0,
                    n.next(o)
                }
                , ()=>r ? n.complete() : n.error(e())))
            }
            )
        }
        function BO() {
            return new Ql
        }
        function Er(e, t) {
            const n = arguments.length >= 2;
            return r=>r.pipe(e ? xr((o,i)=>e(o, i, r)) : jn, Ls(1), n ? Xl(t) : k0(()=>new Ql))
        }
        function ao(e, t) {
            return te(t) ? Ee(e, t, 1) : Ee(e, 1)
        }
        function at(e, t, n) {
            const r = te(e) || t || n ? {
                next: e,
                error: t,
                complete: n
            } : e;
            return r ? ye((o,i)=>{
                var s;
                null === (s = r.subscribe) || void 0 === s || s.call(r);
                let a = !0;
                o.subscribe(ae(i, l=>{
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                    i.next(l)
                }
                , ()=>{
                    var l;
                    a = !1,
                    null === (l = r.complete) || void 0 === l || l.call(r),
                    i.complete()
                }
                , l=>{
                    var u;
                    a = !1,
                    null === (u = r.error) || void 0 === u || u.call(r, l),
                    i.error(l)
                }
                , ()=>{
                    var l, u;
                    a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)),
                    null === (u = r.finalize) || void 0 === u || u.call(r)
                }
                ))
            }
            ) : jn
        }
        function Pr(e) {
            return ye((t,n)=>{
                let i, r = null, o = !1;
                r = t.subscribe(ae(n, void 0, void 0, s=>{
                    i = Ht(e(s, Pr(e)(t))),
                    r ? (r.unsubscribe(),
                    r = null,
                    i.subscribe(n)) : o = !0
                }
                )),
                o && (r.unsubscribe(),
                r = null,
                i.subscribe(n))
            }
            )
        }
        function R0(e, t) {
            return ye(function $O(e, t, n, r, o) {
                return (i,s)=>{
                    let a = n
                      , l = t
                      , u = 0;
                    i.subscribe(ae(s, f=>{
                        const p = u++;
                        l = a ? e(l, f, p) : (a = !0,
                        f),
                        r && s.next(l)
                    }
                    , o && (()=>{
                        a && s.next(l),
                        s.complete()
                    }
                    )))
                }
            }(e, t, arguments.length >= 2, !0))
        }
        function Xf(e) {
            return e <= 0 ? ()=>Ot : ye((t,n)=>{
                let r = [];
                t.subscribe(ae(n, o=>{
                    r.push(o),
                    e < r.length && r.shift()
                }
                , ()=>{
                    for (const o of r)
                        n.next(o);
                    n.complete()
                }
                , void 0, ()=>{
                    r = null
                }
                ))
            }
            )
        }
        function N0(e, t) {
            const n = arguments.length >= 2;
            return r=>r.pipe(e ? xr((o,i)=>e(o, i, r)) : jn, Xf(1), n ? Xl(t) : k0(()=>new Ql))
        }
        function Jf(e) {
            return ye((t,n)=>{
                try {
                    t.subscribe(n)
                } finally {
                    n.add(e)
                }
            }
            )
        }
        const q = "primary"
          , Bs = Symbol("RouteTitle");
        class UO {
            constructor(t) {
                this.params = t || {}
            }
            has(t) {
                return Object.prototype.hasOwnProperty.call(this.params, t)
            }
            get(t) {
                if (this.has(t)) {
                    const n = this.params[t];
                    return Array.isArray(n) ? n[0] : n
                }
                return null
            }
            getAll(t) {
                if (this.has(t)) {
                    const n = this.params[t];
                    return Array.isArray(n) ? n : [n]
                }
                return []
            }
            get keys() {
                return Object.keys(this.params)
            }
        }
        function ui(e) {
            return new UO(e)
        }
        function HO(e, t, n) {
            const r = n.path.split("/");
            if (r.length > e.length || "full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
                return null;
            const o = {};
            for (let i = 0; i < r.length; i++) {
                const s = r[i]
                  , a = e[i];
                if (s.startsWith(":"))
                    o[s.substring(1)] = a;
                else if (s !== a.path)
                    return null
            }
            return {
                consumed: e.slice(0, r.length),
                posParams: o
            }
        }
        function Nn(e, t) {
            const n = e ? Object.keys(e) : void 0
              , r = t ? Object.keys(t) : void 0;
            if (!n || !r || n.length != r.length)
                return !1;
            let o;
            for (let i = 0; i < n.length; i++)
                if (o = n[i],
                !F0(e[o], t[o]))
                    return !1;
            return !0
        }
        function F0(e, t) {
            if (Array.isArray(e) && Array.isArray(t)) {
                if (e.length !== t.length)
                    return !1;
                const n = [...e].sort()
                  , r = [...t].sort();
                return n.every((o,i)=>r[i] === o)
            }
            return e === t
        }
        function L0(e) {
            return Array.prototype.concat.apply([], e)
        }
        function B0(e) {
            return e.length > 0 ? e[e.length - 1] : null
        }
        function et(e, t) {
            for (const n in e)
                e.hasOwnProperty(n) && t(e[n], n)
        }
        function Sr(e) {
            return Ym(e) ? e : yl(e) ? Pe(Promise.resolve(e)) : F(e)
        }
        const Jl = !1
          , GO = {
            exact: function V0(e, t, n) {
                if (!lo(e.segments, t.segments) || !ec(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren)
                    return !1;
                for (const r in t.children)
                    if (!e.children[r] || !V0(e.children[r], t.children[r], n))
                        return !1;
                return !0
            },
            subset: U0
        }
          , $0 = {
            exact: function qO(e, t) {
                return Nn(e, t)
            },
            subset: function WO(e, t) {
                return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n=>F0(e[n], t[n]))
            },
            ignored: ()=>!0
        };
        function j0(e, t, n) {
            return GO[n.paths](e.root, t.root, n.matrixParams) && $0[n.queryParams](e.queryParams, t.queryParams) && !("exact" === n.fragment && e.fragment !== t.fragment)
        }
        function U0(e, t, n) {
            return H0(e, t, t.segments, n)
        }
        function H0(e, t, n, r) {
            if (e.segments.length > n.length) {
                const o = e.segments.slice(0, n.length);
                return !(!lo(o, n) || t.hasChildren() || !ec(o, n, r))
            }
            if (e.segments.length === n.length) {
                if (!lo(e.segments, n) || !ec(e.segments, n, r))
                    return !1;
                for (const o in t.children)
                    if (!e.children[o] || !U0(e.children[o], t.children[o], r))
                        return !1;
                return !0
            }
            {
                const o = n.slice(0, e.segments.length)
                  , i = n.slice(e.segments.length);
                return !!(lo(e.segments, o) && ec(e.segments, o, r) && e.children[q]) && H0(e.children[q], t, i, r)
            }
        }
        function ec(e, t, n) {
            return t.every((r,o)=>$0[n](e[o].parameters, r.parameters))
        }
        class Ir {
            constructor(t=new K([],{}), n={}, r=null) {
                this.root = t,
                this.queryParams = n,
                this.fragment = r
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = ui(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return KO.serialize(this)
            }
        }
        class K {
            constructor(t, n) {
                this.segments = t,
                this.children = n,
                this.parent = null,
                et(n, (r,o)=>r.parent = this)
            }
            hasChildren() {
                return this.numberOfChildren > 0
            }
            get numberOfChildren() {
                return Object.keys(this.children).length
            }
            toString() {
                return tc(this)
            }
        }
        class $s {
            constructor(t, n) {
                this.path = t,
                this.parameters = n
            }
            get parameterMap() {
                return this._parameterMap || (this._parameterMap = ui(this.parameters)),
                this._parameterMap
            }
            toString() {
                return q0(this)
            }
        }
        function lo(e, t) {
            return e.length === t.length && e.every((n,r)=>n.path === t[r].path)
        }
        let js = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return new eh
                },
                providedIn: "root"
            }),
            e
        }
        )();
        class eh {
            parse(t) {
                const n = new iT(t);
                return new Ir(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())
            }
            serialize(t) {
                const n = `/${Vs(t.root, !0)}`
                  , r = function JO(e) {
                    const t = Object.keys(e).map(n=>{
                        const r = e[n];
                        return Array.isArray(r) ? r.map(o=>`${nc(n)}=${nc(o)}`).join("&") : `${nc(n)}=${nc(r)}`
                    }
                    ).filter(n=>!!n);
                    return t.length ? `?${t.join("&")}` : ""
                }(t.queryParams);
                return `${n}${r}${"string" == typeof t.fragment ? `#${function QO(e) {
                    return encodeURI(e)
                }(t.fragment)}` : ""}`
            }
        }
        const KO = new eh;
        function tc(e) {
            return e.segments.map(t=>q0(t)).join("/")
        }
        function Vs(e, t) {
            if (!e.hasChildren())
                return tc(e);
            if (t) {
                const n = e.children[q] ? Vs(e.children[q], !1) : ""
                  , r = [];
                return et(e.children, (o,i)=>{
                    i !== q && r.push(`${i}:${Vs(o, !1)}`)
                }
                ),
                r.length > 0 ? `${n}(${r.join("//")})` : n
            }
            {
                const n = function ZO(e, t) {
                    let n = [];
                    return et(e.children, (r,o)=>{
                        o === q && (n = n.concat(t(r, o)))
                    }
                    ),
                    et(e.children, (r,o)=>{
                        o !== q && (n = n.concat(t(r, o)))
                    }
                    ),
                    n
                }(e, (r,o)=>o === q ? [Vs(e.children[q], !1)] : [`${o}:${Vs(r, !1)}`]);
                return 1 === Object.keys(e.children).length && null != e.children[q] ? `${tc(e)}/${n[0]}` : `${tc(e)}/(${n.join("//")})`
            }
        }
        function z0(e) {
            return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
        }
        function nc(e) {
            return z0(e).replace(/%3B/gi, ";")
        }
        function th(e) {
            return z0(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
        }
        function rc(e) {
            return decodeURIComponent(e)
        }
        function G0(e) {
            return rc(e.replace(/\+/g, "%20"))
        }
        function q0(e) {
            return `${th(e.path)}${function XO(e) {
                return Object.keys(e).map(t=>`;${th(t)}=${th(e[t])}`).join("")
            }(e.parameters)}`
        }
        const eT = /^[^\/()?;=#]+/;
        function oc(e) {
            const t = e.match(eT);
            return t ? t[0] : ""
        }
        const tT = /^[^=?&#]+/
          , rT = /^[^&#]+/;
        class iT {
            constructor(t) {
                this.url = t,
                this.remaining = t
            }
            parseRootSegment() {
                return this.consumeOptional("/"),
                "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new K([],{}) : new K([],this.parseChildren())
            }
            parseQueryParams() {
                const t = {};
                if (this.consumeOptional("?"))
                    do {
                        this.parseQueryParam(t)
                    } while (this.consumeOptional("&"));
                return t
            }
            parseFragment() {
                return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
            }
            parseChildren() {
                if ("" === this.remaining)
                    return {};
                this.consumeOptional("/");
                const t = [];
                for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/("); )
                    this.capture("/"),
                    t.push(this.parseSegment());
                let n = {};
                this.peekStartsWith("/(") && (this.capture("/"),
                n = this.parseParens(!0));
                let r = {};
                return this.peekStartsWith("(") && (r = this.parseParens(!1)),
                (t.length > 0 || Object.keys(n).length > 0) && (r[q] = new K(t,n)),
                r
            }
            parseSegment() {
                const t = oc(this.remaining);
                if ("" === t && this.peekStartsWith(";"))
                    throw new E(4009,Jl);
                return this.capture(t),
                new $s(rc(t),this.parseMatrixParams())
            }
            parseMatrixParams() {
                const t = {};
                for (; this.consumeOptional(";"); )
                    this.parseParam(t);
                return t
            }
            parseParam(t) {
                const n = oc(this.remaining);
                if (!n)
                    return;
                this.capture(n);
                let r = "";
                if (this.consumeOptional("=")) {
                    const o = oc(this.remaining);
                    o && (r = o,
                    this.capture(r))
                }
                t[rc(n)] = rc(r)
            }
            parseQueryParam(t) {
                const n = function nT(e) {
                    const t = e.match(tT);
                    return t ? t[0] : ""
                }(this.remaining);
                if (!n)
                    return;
                this.capture(n);
                let r = "";
                if (this.consumeOptional("=")) {
                    const s = function oT(e) {
                        const t = e.match(rT);
                        return t ? t[0] : ""
                    }(this.remaining);
                    s && (r = s,
                    this.capture(r))
                }
                const o = G0(n)
                  , i = G0(r);
                if (t.hasOwnProperty(o)) {
                    let s = t[o];
                    Array.isArray(s) || (s = [s],
                    t[o] = s),
                    s.push(i)
                } else
                    t[o] = i
            }
            parseParens(t) {
                const n = {};
                for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0; ) {
                    const r = oc(this.remaining)
                      , o = this.remaining[r.length];
                    if ("/" !== o && ")" !== o && ";" !== o)
                        throw new E(4010,Jl);
                    let i;
                    r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")),
                    this.capture(i),
                    this.capture(":")) : t && (i = q);
                    const s = this.parseChildren();
                    n[i] = 1 === Object.keys(s).length ? s[q] : new K([],s),
                    this.consumeOptional("//")
                }
                return n
            }
            peekStartsWith(t) {
                return this.remaining.startsWith(t)
            }
            consumeOptional(t) {
                return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length),
                !0)
            }
            capture(t) {
                if (!this.consumeOptional(t))
                    throw new E(4011,Jl)
            }
        }
        function nh(e) {
            return e.segments.length > 0 ? new K([],{
                [q]: e
            }) : e
        }
        function ic(e) {
            const t = {};
            for (const r of Object.keys(e.children)) {
                const i = ic(e.children[r]);
                (i.segments.length > 0 || i.hasChildren()) && (t[r] = i)
            }
            return function sT(e) {
                if (1 === e.numberOfChildren && e.children[q]) {
                    const t = e.children[q];
                    return new K(e.segments.concat(t.segments),t.children)
                }
                return e
            }(new K(e.segments,t))
        }
        function co(e) {
            return e instanceof Ir
        }
        const rh = !1;
        function aT(e, t, n, r, o) {
            if (0 === n.length)
                return di(t.root, t.root, t.root, r, o);
            const i = function Q0(e) {
                if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new K0(!0,0,e);
                let t = 0
                  , n = !1;
                const r = e.reduce((o,i,s)=>{
                    if ("object" == typeof i && null != i) {
                        if (i.outlets) {
                            const a = {};
                            return et(i.outlets, (l,u)=>{
                                a[u] = "string" == typeof l ? l.split("/") : l
                            }
                            ),
                            [...o, {
                                outlets: a
                            }]
                        }
                        if (i.segmentPath)
                            return [...o, i.segmentPath]
                    }
                    return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach((a,l)=>{
                        0 == l && "." === a || (0 == l && "" === a ? n = !0 : ".." === a ? t++ : "" != a && o.push(a))
                    }
                    ),
                    o) : [...o, i]
                }
                , []);
                return new K0(n,t,r)
            }(n);
            return i.toRoot() ? di(t.root, t.root, new K([],{}), r, o) : function s(l) {
                const u = function cT(e, t, n, r) {
                    if (e.isAbsolute)
                        return new fi(t.root,!0,0);
                    if (-1 === r)
                        return new fi(n,n === t.root,0);
                    return function X0(e, t, n) {
                        let r = e
                          , o = t
                          , i = n;
                        for (; i > o; ) {
                            if (i -= o,
                            r = r.parent,
                            !r)
                                throw new E(4005,rh && "Invalid number of '../'");
                            o = r.segments.length
                        }
                        return new fi(r,!1,o - i)
                    }(n, r + (Us(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots)
                }(i, t, e.snapshot?._urlSegment, l)
                  , f = u.processChildren ? hi(u.segmentGroup, u.index, i.commands) : oh(u.segmentGroup, u.index, i.commands);
                return di(t.root, u.segmentGroup, f, r, o)
            }(e.snapshot?._lastPathIndex)
        }
        function Us(e) {
            return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        }
        function Hs(e) {
            return "object" == typeof e && null != e && e.outlets
        }
        function di(e, t, n, r, o) {
            let s, i = {};
            r && et(r, (l,u)=>{
                i[u] = Array.isArray(l) ? l.map(f=>`${f}`) : `${l}`
            }
            ),
            s = e === t ? n : Z0(e, t, n);
            const a = nh(ic(s));
            return new Ir(a,i,o)
        }
        function Z0(e, t, n) {
            const r = {};
            return et(e.children, (o,i)=>{
                r[i] = o === t ? n : Z0(o, t, n)
            }
            ),
            new K(e.segments,r)
        }
        class K0 {
            constructor(t, n, r) {
                if (this.isAbsolute = t,
                this.numberOfDoubleDots = n,
                this.commands = r,
                t && r.length > 0 && Us(r[0]))
                    throw new E(4003,rh && "Root segment cannot have matrix parameters");
                const o = r.find(Hs);
                if (o && o !== B0(r))
                    throw new E(4004,rh && "{outlets:{}} has to be the last command")
            }
            toRoot() {
                return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
            }
        }
        class fi {
            constructor(t, n, r) {
                this.segmentGroup = t,
                this.processChildren = n,
                this.index = r
            }
        }
        function oh(e, t, n) {
            if (e || (e = new K([],{})),
            0 === e.segments.length && e.hasChildren())
                return hi(e, t, n);
            const r = function dT(e, t, n) {
                let r = 0
                  , o = t;
                const i = {
                    match: !1,
                    pathIndex: 0,
                    commandIndex: 0
                };
                for (; o < e.segments.length; ) {
                    if (r >= n.length)
                        return i;
                    const s = e.segments[o]
                      , a = n[r];
                    if (Hs(a))
                        break;
                    const l = `${a}`
                      , u = r < n.length - 1 ? n[r + 1] : null;
                    if (o > 0 && void 0 === l)
                        break;
                    if (l && u && "object" == typeof u && void 0 === u.outlets) {
                        if (!eC(l, u, s))
                            return i;
                        r += 2
                    } else {
                        if (!eC(l, {}, s))
                            return i;
                        r++
                    }
                    o++
                }
                return {
                    match: !0,
                    pathIndex: o,
                    commandIndex: r
                }
            }(e, t, n)
              , o = n.slice(r.commandIndex);
            if (r.match && r.pathIndex < e.segments.length) {
                const i = new K(e.segments.slice(0, r.pathIndex),{});
                return i.children[q] = new K(e.segments.slice(r.pathIndex),e.children),
                hi(i, 0, o)
            }
            return r.match && 0 === o.length ? new K(e.segments,{}) : r.match && !e.hasChildren() ? ih(e, t, n) : r.match ? hi(e, 0, o) : ih(e, t, n)
        }
        function hi(e, t, n) {
            if (0 === n.length)
                return new K(e.segments,{});
            {
                const r = function uT(e) {
                    return Hs(e[0]) ? e[0].outlets : {
                        [q]: e
                    }
                }(n)
                  , o = {};
                return !r[q] && e.children[q] && 1 === e.numberOfChildren && 0 === e.children[q].segments.length ? hi(e.children[q], t, n) : (et(r, (i,s)=>{
                    "string" == typeof i && (i = [i]),
                    null !== i && (o[s] = oh(e.children[s], t, i))
                }
                ),
                et(e.children, (i,s)=>{
                    void 0 === r[s] && (o[s] = i)
                }
                ),
                new K(e.segments,o))
            }
        }
        function ih(e, t, n) {
            const r = e.segments.slice(0, t);
            let o = 0;
            for (; o < n.length; ) {
                const i = n[o];
                if (Hs(i)) {
                    const l = fT(i.outlets);
                    return new K(r,l)
                }
                if (0 === o && Us(n[0])) {
                    r.push(new $s(e.segments[t].path,J0(n[0]))),
                    o++;
                    continue
                }
                const s = Hs(i) ? i.outlets[q] : `${i}`
                  , a = o < n.length - 1 ? n[o + 1] : null;
                s && a && Us(a) ? (r.push(new $s(s,J0(a))),
                o += 2) : (r.push(new $s(s,{})),
                o++)
            }
            return new K(r,{})
        }
        function fT(e) {
            const t = {};
            return et(e, (n,r)=>{
                "string" == typeof n && (n = [n]),
                null !== n && (t[r] = ih(new K([],{}), 0, n))
            }
            ),
            t
        }
        function J0(e) {
            const t = {};
            return et(e, (n,r)=>t[r] = `${n}`),
            t
        }
        function eC(e, t, n) {
            return e == n.path && Nn(t, n.parameters)
        }
        const zs = "imperative";
        class Fn {
            constructor(t, n) {
                this.id = t,
                this.url = n
            }
        }
        class sh extends Fn {
            constructor(t, n, r="imperative", o=null) {
                super(t, n),
                this.type = 0,
                this.navigationTrigger = r,
                this.restoredState = o
            }
            toString() {
                return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
        }
        class uo extends Fn {
            constructor(t, n, r) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.type = 1
            }
            toString() {
                return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
        }
        class sc extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.reason = r,
                this.code = o,
                this.type = 2
            }
            toString() {
                return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
        }
        class ac extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.reason = r,
                this.code = o,
                this.type = 16
            }
        }
        class ah extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.error = r,
                this.target = o,
                this.type = 3
            }
            toString() {
                return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
            }
        }
        class hT extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 4
            }
            toString() {
                return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class pT extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 7
            }
            toString() {
                return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class gT extends Fn {
            constructor(t, n, r, o, i) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.shouldActivate = i,
                this.type = 8
            }
            toString() {
                return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
            }
        }
        class mT extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 5
            }
            toString() {
                return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class yT extends Fn {
            constructor(t, n, r, o) {
                super(t, n),
                this.urlAfterRedirects = r,
                this.state = o,
                this.type = 6
            }
            toString() {
                return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }
        class wT {
            constructor(t) {
                this.route = t,
                this.type = 9
            }
            toString() {
                return `RouteConfigLoadStart(path: ${this.route.path})`
            }
        }
        class vT {
            constructor(t) {
                this.route = t,
                this.type = 10
            }
            toString() {
                return `RouteConfigLoadEnd(path: ${this.route.path})`
            }
        }
        class CT {
            constructor(t) {
                this.snapshot = t,
                this.type = 11
            }
            toString() {
                return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class bT {
            constructor(t) {
                this.snapshot = t,
                this.type = 12
            }
            toString() {
                return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class _T {
            constructor(t) {
                this.snapshot = t,
                this.type = 13
            }
            toString() {
                return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class DT {
            constructor(t) {
                this.snapshot = t,
                this.type = 14
            }
            toString() {
                return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }
        class tC {
            constructor(t, n, r) {
                this.routerEvent = t,
                this.position = n,
                this.anchor = r,
                this.type = 15
            }
            toString() {
                return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
            }
        }
        let ET = (()=>{
            class e {
                createUrlTree(n, r, o, i, s, a) {
                    return aT(n || r.root, o, i, s, a)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )()
          , ST = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function(t) {
                    return ET.\u0275fac(t)
                },
                providedIn: "root"
            }),
            e
        }
        )();
        class nC {
            constructor(t) {
                this._root = t
            }
            get root() {
                return this._root.value
            }
            parent(t) {
                const n = this.pathFromRoot(t);
                return n.length > 1 ? n[n.length - 2] : null
            }
            children(t) {
                const n = lh(t, this._root);
                return n ? n.children.map(r=>r.value) : []
            }
            firstChild(t) {
                const n = lh(t, this._root);
                return n && n.children.length > 0 ? n.children[0].value : null
            }
            siblings(t) {
                const n = ch(t, this._root);
                return n.length < 2 ? [] : n[n.length - 2].children.map(o=>o.value).filter(o=>o !== t)
            }
            pathFromRoot(t) {
                return ch(t, this._root).map(n=>n.value)
            }
        }
        function lh(e, t) {
            if (e === t.value)
                return t;
            for (const n of t.children) {
                const r = lh(e, n);
                if (r)
                    return r
            }
            return null
        }
        function ch(e, t) {
            if (e === t.value)
                return [t];
            for (const n of t.children) {
                const r = ch(e, n);
                if (r.length)
                    return r.unshift(t),
                    r
            }
            return []
        }
        class or {
            constructor(t, n) {
                this.value = t,
                this.children = n
            }
            toString() {
                return `TreeNode(${this.value})`
            }
        }
        function pi(e) {
            const t = {};
            return e && e.children.forEach(n=>t[n.value.outlet] = n),
            t
        }
        class rC extends nC {
            constructor(t, n) {
                super(t),
                this.snapshot = n,
                uh(this, t)
            }
            toString() {
                return this.snapshot.toString()
            }
        }
        function oC(e, t) {
            const n = function IT(e, t) {
                const s = new lc([],{},{},"",{},q,t,null,e.root,-1,{});
                return new sC("",new or(s,[]))
            }(e, t)
              , r = new gn([new $s("",{})])
              , o = new gn({})
              , i = new gn({})
              , s = new gn({})
              , a = new gn("")
              , l = new gi(r,o,s,a,i,q,t,n.root);
            return l.snapshot = n.root,
            new rC(new or(l,[]),n)
        }
        class gi {
            constructor(t, n, r, o, i, s, a, l) {
                this.url = t,
                this.params = n,
                this.queryParams = r,
                this.fragment = o,
                this.data = i,
                this.outlet = s,
                this.component = a,
                this.title = this.data?.pipe(Q(u=>u[Bs])) ?? F(void 0),
                this._futureSnapshot = l
            }
            get routeConfig() {
                return this._futureSnapshot.routeConfig
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = this.params.pipe(Q(t=>ui(t)))),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(Q(t=>ui(t)))),
                this._queryParamMap
            }
            toString() {
                return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
            }
        }
        function iC(e, t="emptyOnly") {
            const n = e.pathFromRoot;
            let r = 0;
            if ("always" !== t)
                for (r = n.length - 1; r >= 1; ) {
                    const o = n[r]
                      , i = n[r - 1];
                    if (o.routeConfig && "" === o.routeConfig.path)
                        r--;
                    else {
                        if (i.component)
                            break;
                        r--
                    }
                }
            return function OT(e) {
                return e.reduce((t,n)=>({
                    params: {
                        ...t.params,
                        ...n.params
                    },
                    data: {
                        ...t.data,
                        ...n.data
                    },
                    resolve: {
                        ...n.data,
                        ...t.resolve,
                        ...n.routeConfig?.data,
                        ...n._resolvedData
                    }
                }), {
                    params: {},
                    data: {},
                    resolve: {}
                })
            }(n.slice(r))
        }
        class lc {
            get title() {
                return this.data?.[Bs]
            }
            constructor(t, n, r, o, i, s, a, l, u, f, p) {
                this.url = t,
                this.params = n,
                this.queryParams = r,
                this.fragment = o,
                this.data = i,
                this.outlet = s,
                this.component = a,
                this.routeConfig = l,
                this._urlSegment = u,
                this._lastPathIndex = f,
                this._resolve = p
            }
            get root() {
                return this._routerState.root
            }
            get parent() {
                return this._routerState.parent(this)
            }
            get firstChild() {
                return this._routerState.firstChild(this)
            }
            get children() {
                return this._routerState.children(this)
            }
            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }
            get paramMap() {
                return this._paramMap || (this._paramMap = ui(this.params)),
                this._paramMap
            }
            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = ui(this.queryParams)),
                this._queryParamMap
            }
            toString() {
                return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
            }
        }
        class sC extends nC {
            constructor(t, n) {
                super(n),
                this.url = t,
                uh(this, n)
            }
            toString() {
                return aC(this._root)
            }
        }
        function uh(e, t) {
            t.value._routerState = e,
            t.children.forEach(n=>uh(e, n))
        }
        function aC(e) {
            const t = e.children.length > 0 ? ` { ${e.children.map(aC).join(", ")} } ` : "";
            return `${e.value}${t}`
        }
        function dh(e) {
            if (e.snapshot) {
                const t = e.snapshot
                  , n = e._futureSnapshot;
                e.snapshot = n,
                Nn(t.queryParams, n.queryParams) || e.queryParams.next(n.queryParams),
                t.fragment !== n.fragment && e.fragment.next(n.fragment),
                Nn(t.params, n.params) || e.params.next(n.params),
                function zO(e, t) {
                    if (e.length !== t.length)
                        return !1;
                    for (let n = 0; n < e.length; ++n)
                        if (!Nn(e[n], t[n]))
                            return !1;
                    return !0
                }(t.url, n.url) || e.url.next(n.url),
                Nn(t.data, n.data) || e.data.next(n.data)
            } else
                e.snapshot = e._futureSnapshot,
                e.data.next(e._futureSnapshot.data)
        }
        function fh(e, t) {
            const n = Nn(e.params, t.params) && function YO(e, t) {
                return lo(e, t) && e.every((n,r)=>Nn(n.parameters, t[r].parameters))
            }(e.url, t.url);
            return n && !(!e.parent != !t.parent) && (!e.parent || fh(e.parent, t.parent))
        }
        function Gs(e, t, n) {
            if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
                const r = n.value;
                r._futureSnapshot = t.value;
                const o = function AT(e, t, n) {
                    return t.children.map(r=>{
                        for (const o of n.children)
                            if (e.shouldReuseRoute(r.value, o.value.snapshot))
                                return Gs(e, r, o);
                        return Gs(e, r)
                    }
                    )
                }(e, t, n);
                return new or(r,o)
            }
            {
                if (e.shouldAttach(t.value)) {
                    const i = e.retrieve(t.value);
                    if (null !== i) {
                        const s = i.route;
                        return s.value._futureSnapshot = t.value,
                        s.children = t.children.map(a=>Gs(e, a)),
                        s
                    }
                }
                const r = function kT(e) {
                    return new gi(new gn(e.url),new gn(e.params),new gn(e.queryParams),new gn(e.fragment),new gn(e.data),e.outlet,e.component,e)
                }(t.value)
                  , o = t.children.map(i=>Gs(e, i));
                return new or(r,o)
            }
        }
        const hh = "ngNavigationCancelingError";
        function lC(e, t) {
            const {redirectTo: n, navigationBehaviorOptions: r} = co(t) ? {
                redirectTo: t,
                navigationBehaviorOptions: void 0
            } : t
              , o = cC(!1, 0, t);
            return o.url = n,
            o.navigationBehaviorOptions = r,
            o
        }
        function cC(e, t, n) {
            const r = new Error("NavigationCancelingError: " + (e || ""));
            return r[hh] = !0,
            r.cancellationCode = t,
            n && (r.url = n),
            r
        }
        function uC(e) {
            return dC(e) && co(e.url)
        }
        function dC(e) {
            return e && e[hh]
        }
        class RT {
            constructor() {
                this.outlet = null,
                this.route = null,
                this.resolver = null,
                this.injector = null,
                this.children = new qs,
                this.attachRef = null
            }
        }
        let qs = (()=>{
            class e {
                constructor() {
                    this.contexts = new Map
                }
                onChildOutletCreated(n, r) {
                    const o = this.getOrCreateContext(n);
                    o.outlet = r,
                    this.contexts.set(n, o)
                }
                onChildOutletDestroyed(n) {
                    const r = this.getContext(n);
                    r && (r.outlet = null,
                    r.attachRef = null)
                }
                onOutletDeactivated() {
                    const n = this.contexts;
                    return this.contexts = new Map,
                    n
                }
                onOutletReAttached(n) {
                    this.contexts = n
                }
                getOrCreateContext(n) {
                    let r = this.getContext(n);
                    return r || (r = new RT,
                    this.contexts.set(n, r)),
                    r
                }
                getContext(n) {
                    return this.contexts.get(n) || null
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const cc = !1;
        let ph = (()=>{
            class e {
                constructor() {
                    this.activated = null,
                    this._activatedRoute = null,
                    this.name = q,
                    this.activateEvents = new mt,
                    this.deactivateEvents = new mt,
                    this.attachEvents = new mt,
                    this.detachEvents = new mt,
                    this.parentContexts = J(qs),
                    this.location = J(dn),
                    this.changeDetector = J(mf),
                    this.environmentInjector = J(Kn)
                }
                ngOnChanges(n) {
                    if (n.name) {
                        const {firstChange: r, previousValue: o} = n.name;
                        if (r)
                            return;
                        this.isTrackedInParentContexts(o) && (this.deactivate(),
                        this.parentContexts.onChildOutletDestroyed(o)),
                        this.initializeOutletWithName()
                    }
                }
                ngOnDestroy() {
                    this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name)
                }
                isTrackedInParentContexts(n) {
                    return this.parentContexts.getContext(n)?.outlet === this
                }
                ngOnInit() {
                    this.initializeOutletWithName()
                }
                initializeOutletWithName() {
                    if (this.parentContexts.onChildOutletCreated(this.name, this),
                    this.activated)
                        return;
                    const n = this.parentContexts.getContext(this.name);
                    n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
                }
                get isActivated() {
                    return !!this.activated
                }
                get component() {
                    if (!this.activated)
                        throw new E(4012,cc);
                    return this.activated.instance
                }
                get activatedRoute() {
                    if (!this.activated)
                        throw new E(4012,cc);
                    return this._activatedRoute
                }
                get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                }
                detach() {
                    if (!this.activated)
                        throw new E(4012,cc);
                    this.location.detach();
                    const n = this.activated;
                    return this.activated = null,
                    this._activatedRoute = null,
                    this.detachEvents.emit(n.instance),
                    n
                }
                attach(n, r) {
                    this.activated = n,
                    this._activatedRoute = r,
                    this.location.insert(n.hostView),
                    this.attachEvents.emit(n.instance)
                }
                deactivate() {
                    if (this.activated) {
                        const n = this.component;
                        this.activated.destroy(),
                        this.activated = null,
                        this._activatedRoute = null,
                        this.deactivateEvents.emit(n)
                    }
                }
                activateWith(n, r) {
                    if (this.isActivated)
                        throw new E(4013,cc);
                    this._activatedRoute = n;
                    const o = this.location
                      , s = n.snapshot.component
                      , a = this.parentContexts.getOrCreateContext(this.name).children
                      , l = new NT(n,a,o.injector);
                    if (r && function FT(e) {
                        return !!e.resolveComponentFactory
                    }(r)) {
                        const u = r.resolveComponentFactory(s);
                        this.activated = o.createComponent(u, o.length, l)
                    } else
                        this.activated = o.createComponent(s, {
                            index: o.length,
                            injector: l,
                            environmentInjector: r ?? this.environmentInjector
                        });
                    this.changeDetector.markForCheck(),
                    this.activateEvents.emit(this.activated.instance)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275dir = We({
                type: e,
                selectors: [["router-outlet"]],
                inputs: {
                    name: "name"
                },
                outputs: {
                    activateEvents: "activate",
                    deactivateEvents: "deactivate",
                    attachEvents: "attach",
                    detachEvents: "detach"
                },
                exportAs: ["outlet"],
                standalone: !0,
                features: [Yr]
            }),
            e
        }
        )();
        class NT {
            constructor(t, n, r) {
                this.route = t,
                this.childContexts = n,
                this.parent = r
            }
            get(t, n) {
                return t === gi ? this.route : t === qs ? this.childContexts : this.parent.get(t, n)
            }
        }
        let gh = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275cmp = xn({
                type: e,
                selectors: [["ng-component"]],
                standalone: !0,
                features: [vw],
                decls: 1,
                vars: 0,
                template: function(n, r) {
                    1 & n && Le(0, "router-outlet")
                },
                dependencies: [ph],
                encapsulation: 2
            }),
            e
        }
        )();
        function fC(e, t) {
            return e.providers && !e._injector && (e._injector = xl(e.providers, t, `Route: ${e.path}`)),
            e._injector ?? t
        }
        function yh(e) {
            const t = e.children && e.children.map(yh)
              , n = t ? {
                ...e,
                children: t
            } : {
                ...e
            };
            return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== q && (n.component = gh),
            n
        }
        function Jt(e) {
            return e.outlet || q
        }
        function hC(e, t) {
            const n = e.filter(r=>Jt(r) === t);
            return n.push(...e.filter(r=>Jt(r) !== t)),
            n
        }
        function Ws(e) {
            if (!e)
                return null;
            if (e.routeConfig?._injector)
                return e.routeConfig._injector;
            for (let t = e.parent; t; t = t.parent) {
                const n = t.routeConfig;
                if (n?._loadedInjector)
                    return n._loadedInjector;
                if (n?._injector)
                    return n._injector
            }
            return null
        }
        class VT {
            constructor(t, n, r, o) {
                this.routeReuseStrategy = t,
                this.futureState = n,
                this.currState = r,
                this.forwardEvent = o
            }
            activate(t) {
                const n = this.futureState._root
                  , r = this.currState ? this.currState._root : null;
                this.deactivateChildRoutes(n, r, t),
                dh(this.futureState.root),
                this.activateChildRoutes(n, r, t)
            }
            deactivateChildRoutes(t, n, r) {
                const o = pi(n);
                t.children.forEach(i=>{
                    const s = i.value.outlet;
                    this.deactivateRoutes(i, o[s], r),
                    delete o[s]
                }
                ),
                et(o, (i,s)=>{
                    this.deactivateRouteAndItsChildren(i, r)
                }
                )
            }
            deactivateRoutes(t, n, r) {
                const o = t.value
                  , i = n ? n.value : null;
                if (o === i)
                    if (o.component) {
                        const s = r.getContext(o.outlet);
                        s && this.deactivateChildRoutes(t, n, s.children)
                    } else
                        this.deactivateChildRoutes(t, n, r);
                else
                    i && this.deactivateRouteAndItsChildren(n, r)
            }
            deactivateRouteAndItsChildren(t, n) {
                t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n)
            }
            detachAndStoreRouteSubtree(t, n) {
                const r = n.getContext(t.value.outlet)
                  , o = r && t.value.component ? r.children : n
                  , i = pi(t);
                for (const s of Object.keys(i))
                    this.deactivateRouteAndItsChildren(i[s], o);
                if (r && r.outlet) {
                    const s = r.outlet.detach()
                      , a = r.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(t.value.snapshot, {
                        componentRef: s,
                        route: t,
                        contexts: a
                    })
                }
            }
            deactivateRouteAndOutlet(t, n) {
                const r = n.getContext(t.value.outlet)
                  , o = r && t.value.component ? r.children : n
                  , i = pi(t);
                for (const s of Object.keys(i))
                    this.deactivateRouteAndItsChildren(i[s], o);
                r && r.outlet && (r.outlet.deactivate(),
                r.children.onOutletDeactivated(),
                r.attachRef = null,
                r.resolver = null,
                r.route = null)
            }
            activateChildRoutes(t, n, r) {
                const o = pi(n);
                t.children.forEach(i=>{
                    this.activateRoutes(i, o[i.value.outlet], r),
                    this.forwardEvent(new DT(i.value.snapshot))
                }
                ),
                t.children.length && this.forwardEvent(new bT(t.value.snapshot))
            }
            activateRoutes(t, n, r) {
                const o = t.value
                  , i = n ? n.value : null;
                if (dh(o),
                o === i)
                    if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        this.activateChildRoutes(t, n, s.children)
                    } else
                        this.activateChildRoutes(t, n, r);
                else if (o.component) {
                    const s = r.getOrCreateContext(o.outlet);
                    if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                        const a = this.routeReuseStrategy.retrieve(o.snapshot);
                        this.routeReuseStrategy.store(o.snapshot, null),
                        s.children.onOutletReAttached(a.contexts),
                        s.attachRef = a.componentRef,
                        s.route = a.route.value,
                        s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                        dh(a.route.value),
                        this.activateChildRoutes(t, null, s.children)
                    } else {
                        const a = Ws(o.snapshot)
                          , l = a?.get(ps) ?? null;
                        s.attachRef = null,
                        s.route = o,
                        s.resolver = l,
                        s.injector = a,
                        s.outlet && s.outlet.activateWith(o, s.injector),
                        this.activateChildRoutes(t, null, s.children)
                    }
                } else
                    this.activateChildRoutes(t, null, r)
            }
        }
        class pC {
            constructor(t) {
                this.path = t,
                this.route = this.path[this.path.length - 1]
            }
        }
        class uc {
            constructor(t, n) {
                this.component = t,
                this.route = n
            }
        }
        function UT(e, t, n) {
            const r = e._root;
            return Ys(r, t ? t._root : null, n, [r.value])
        }
        function mi(e, t) {
            const n = Symbol()
              , r = t.get(e, n);
            return r === n ? "function" != typeof e || function _a(e) {
                return null !== Lr(e)
            }(e) ? t.get(e) : e : r
        }
        function Ys(e, t, n, r, o={
            canDeactivateChecks: [],
            canActivateChecks: []
        }) {
            const i = pi(t);
            return e.children.forEach(s=>{
                (function zT(e, t, n, r, o={
                    canDeactivateChecks: [],
                    canActivateChecks: []
                }) {
                    const i = e.value
                      , s = t ? t.value : null
                      , a = n ? n.getContext(e.value.outlet) : null;
                    if (s && i.routeConfig === s.routeConfig) {
                        const l = function GT(e, t, n) {
                            if ("function" == typeof n)
                                return n(e, t);
                            switch (n) {
                            case "pathParamsChange":
                                return !lo(e.url, t.url);
                            case "pathParamsOrQueryParamsChange":
                                return !lo(e.url, t.url) || !Nn(e.queryParams, t.queryParams);
                            case "always":
                                return !0;
                            case "paramsOrQueryParamsChange":
                                return !fh(e, t) || !Nn(e.queryParams, t.queryParams);
                            default:
                                return !fh(e, t)
                            }
                        }(s, i, i.routeConfig.runGuardsAndResolvers);
                        l ? o.canActivateChecks.push(new pC(r)) : (i.data = s.data,
                        i._resolvedData = s._resolvedData),
                        Ys(e, t, i.component ? a ? a.children : null : n, r, o),
                        l && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new uc(a.outlet.component,s))
                    } else
                        s && Zs(t, a, o),
                        o.canActivateChecks.push(new pC(r)),
                        Ys(e, null, i.component ? a ? a.children : null : n, r, o)
                }
                )(s, i[s.value.outlet], n, r.concat([s.value]), o),
                delete i[s.value.outlet]
            }
            ),
            et(i, (s,a)=>Zs(s, n.getContext(a), o)),
            o
        }
        function Zs(e, t, n) {
            const r = pi(e)
              , o = e.value;
            et(r, (i,s)=>{
                Zs(i, o.component ? t ? t.children.getContext(s) : null : t, n)
            }
            ),
            n.canDeactivateChecks.push(new uc(o.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null,o))
        }
        function Ks(e) {
            return "function" == typeof e
        }
        function wh(e) {
            return e instanceof Ql || "EmptyError" === e?.name
        }
        const dc = Symbol("INITIAL_VALUE");
        function yi() {
            return Rn(e=>I0(e.map(t=>t.pipe(Ls(1), function LO(...e) {
                const t = hr(e);
                return ye((n,r)=>{
                    (t ? Kf(e, n, t) : Kf(e, n)).subscribe(r)
                }
                )
            }(dc)))).pipe(Q(t=>{
                for (const n of t)
                    if (!0 !== n) {
                        if (n === dc)
                            return dc;
                        if (!1 === n || n instanceof Ir)
                            return n
                    }
                return !0
            }
            ), xr(t=>t !== dc), Ls(1)))
        }
        function gC(e) {
            return function ur(...e) {
                return dr(e)
            }(at(t=>{
                if (co(t))
                    throw lC(0, t)
            }
            ), Q(t=>!0 === t))
        }
        const vh = {
            matched: !1,
            consumedSegments: [],
            remainingSegments: [],
            parameters: {},
            positionalParamSegments: {}
        };
        function mC(e, t, n, r, o) {
            const i = Ch(e, t, n);
            return i.matched ? function lA(e, t, n, r) {
                const o = t.canMatch;
                return o && 0 !== o.length ? F(o.map(s=>{
                    const a = mi(s, e);
                    return Sr(function QT(e) {
                        return e && Ks(e.canMatch)
                    }(a) ? a.canMatch(t, n) : e.runInContext(()=>a(t, n)))
                }
                )).pipe(yi(), gC()) : F(!0)
            }(r = fC(t, r), t, n).pipe(Q(s=>!0 === s ? i : {
                ...vh
            })) : F(i)
        }
        function Ch(e, t, n) {
            if ("" === t.path)
                return "full" === t.pathMatch && (e.hasChildren() || n.length > 0) ? {
                    ...vh
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: n,
                    parameters: {},
                    positionalParamSegments: {}
                };
            const o = (t.matcher || HO)(n, e, t);
            if (!o)
                return {
                    ...vh
                };
            const i = {};
            et(o.posParams, (a,l)=>{
                i[l] = a.path
            }
            );
            const s = o.consumed.length > 0 ? {
                ...i,
                ...o.consumed[o.consumed.length - 1].parameters
            } : i;
            return {
                matched: !0,
                consumedSegments: o.consumed,
                remainingSegments: n.slice(o.consumed.length),
                parameters: s,
                positionalParamSegments: o.posParams ?? {}
            }
        }
        function fc(e, t, n, r) {
            if (n.length > 0 && function dA(e, t, n) {
                return n.some(r=>hc(e, t, r) && Jt(r) !== q)
            }(e, n, r)) {
                const i = new K(t,function uA(e, t, n, r) {
                    const o = {};
                    o[q] = r,
                    r._sourceSegment = e,
                    r._segmentIndexShift = t.length;
                    for (const i of n)
                        if ("" === i.path && Jt(i) !== q) {
                            const s = new K([],{});
                            s._sourceSegment = e,
                            s._segmentIndexShift = t.length,
                            o[Jt(i)] = s
                        }
                    return o
                }(e, t, r, new K(n,e.children)));
                return i._sourceSegment = e,
                i._segmentIndexShift = t.length,
                {
                    segmentGroup: i,
                    slicedSegments: []
                }
            }
            if (0 === n.length && function fA(e, t, n) {
                return n.some(r=>hc(e, t, r))
            }(e, n, r)) {
                const i = new K(e.segments,function cA(e, t, n, r, o) {
                    const i = {};
                    for (const s of r)
                        if (hc(e, n, s) && !o[Jt(s)]) {
                            const a = new K([],{});
                            a._sourceSegment = e,
                            a._segmentIndexShift = t.length,
                            i[Jt(s)] = a
                        }
                    return {
                        ...o,
                        ...i
                    }
                }(e, t, n, r, e.children));
                return i._sourceSegment = e,
                i._segmentIndexShift = t.length,
                {
                    segmentGroup: i,
                    slicedSegments: n
                }
            }
            const o = new K(e.segments,e.children);
            return o._sourceSegment = e,
            o._segmentIndexShift = t.length,
            {
                segmentGroup: o,
                slicedSegments: n
            }
        }
        function hc(e, t, n) {
            return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path
        }
        function yC(e, t, n, r) {
            return !!(Jt(e) === r || r !== q && hc(t, n, e)) && ("**" === e.path || Ch(t, e, n).matched)
        }
        function wC(e, t, n) {
            return 0 === t.length && !e.children[n]
        }
        const pc = !1;
        class gc {
            constructor(t) {
                this.segmentGroup = t || null
            }
        }
        class vC {
            constructor(t) {
                this.urlTree = t
            }
        }
        function Qs(e) {
            return Fs(new gc(e))
        }
        function CC(e) {
            return Fs(new vC(e))
        }
        class mA {
            constructor(t, n, r, o, i) {
                this.injector = t,
                this.configLoader = n,
                this.urlSerializer = r,
                this.urlTree = o,
                this.config = i,
                this.allowRedirects = !0
            }
            apply() {
                const t = fc(this.urlTree.root, [], [], this.config).segmentGroup
                  , n = new K(t.segments,t.children);
                return this.expandSegmentGroup(this.injector, this.config, n, q).pipe(Q(i=>this.createUrlTree(ic(i), this.urlTree.queryParams, this.urlTree.fragment))).pipe(Pr(i=>{
                    if (i instanceof vC)
                        return this.allowRedirects = !1,
                        this.match(i.urlTree);
                    throw i instanceof gc ? this.noMatchError(i) : i
                }
                ))
            }
            match(t) {
                return this.expandSegmentGroup(this.injector, this.config, t.root, q).pipe(Q(o=>this.createUrlTree(ic(o), t.queryParams, t.fragment))).pipe(Pr(o=>{
                    throw o instanceof gc ? this.noMatchError(o) : o
                }
                ))
            }
            noMatchError(t) {
                return new E(4002,pc)
            }
            createUrlTree(t, n, r) {
                const o = nh(t);
                return new Ir(o,n,r)
            }
            expandSegmentGroup(t, n, r, o) {
                return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(t, n, r).pipe(Q(i=>new K([],i))) : this.expandSegment(t, r, n, r.segments, o, !0)
            }
            expandChildren(t, n, r) {
                const o = [];
                for (const i of Object.keys(r.children))
                    "primary" === i ? o.unshift(i) : o.push(i);
                return Pe(o).pipe(ao(i=>{
                    const s = r.children[i]
                      , a = hC(n, i);
                    return this.expandSegmentGroup(t, a, s, i).pipe(Q(l=>({
                        segment: l,
                        outlet: i
                    })))
                }
                ), R0((i,s)=>(i[s.outlet] = s.segment,
                i), {}), N0())
            }
            expandSegment(t, n, r, o, i, s) {
                return Pe(r).pipe(ao(a=>this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(Pr(u=>{
                    if (u instanceof gc)
                        return F(null);
                    throw u
                }
                ))), Er(a=>!!a), Pr((a,l)=>{
                    if (wh(a))
                        return wC(n, o, i) ? F(new K([],{})) : Qs(n);
                    throw a
                }
                ))
            }
            expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
                return yC(o, n, i, s) ? void 0 === o.redirectTo ? this.matchSegmentAgainstRoute(t, n, o, i, s) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) : Qs(n) : Qs(n)
            }
            expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                return "**" === o.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
            }
            expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
                const i = this.applyRedirectCommands([], r.redirectTo, {});
                return r.redirectTo.startsWith("/") ? CC(i) : this.lineralizeSegments(r, i).pipe(Ee(s=>{
                    const a = new K(s,{});
                    return this.expandSegment(t, a, n, s, o, !1)
                }
                ))
            }
            expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                const {matched: a, consumedSegments: l, remainingSegments: u, positionalParamSegments: f} = Ch(n, o, i);
                if (!a)
                    return Qs(n);
                const p = this.applyRedirectCommands(l, o.redirectTo, f);
                return o.redirectTo.startsWith("/") ? CC(p) : this.lineralizeSegments(o, p).pipe(Ee(g=>this.expandSegment(t, n, r, g.concat(u), s, !1)))
            }
            matchSegmentAgainstRoute(t, n, r, o, i) {
                return "**" === r.path ? (t = fC(r, t),
                r.loadChildren ? (r._loadedRoutes ? F({
                    routes: r._loadedRoutes,
                    injector: r._loadedInjector
                }) : this.configLoader.loadChildren(t, r)).pipe(Q(a=>(r._loadedRoutes = a.routes,
                r._loadedInjector = a.injector,
                new K(o,{})))) : F(new K(o,{}))) : mC(n, r, o, t).pipe(Rn(({matched: s, consumedSegments: a, remainingSegments: l})=>s ? this.getChildConfig(t = r._injector ?? t, r, o).pipe(Ee(f=>{
                    const p = f.injector ?? t
                      , g = f.routes
                      , {segmentGroup: y, slicedSegments: w} = fc(n, a, l, g)
                      , C = new K(y.segments,y.children);
                    if (0 === w.length && C.hasChildren())
                        return this.expandChildren(p, g, C).pipe(Q(D=>new K(a,D)));
                    if (0 === g.length && 0 === w.length)
                        return F(new K(a,{}));
                    const v = Jt(r) === i;
                    return this.expandSegment(p, C, g, w, v ? q : i, !0).pipe(Q(P=>new K(a.concat(P.segments),P.children)))
                }
                )) : Qs(n)))
            }
            getChildConfig(t, n, r) {
                return n.children ? F({
                    routes: n.children,
                    injector: t
                }) : n.loadChildren ? void 0 !== n._loadedRoutes ? F({
                    routes: n._loadedRoutes,
                    injector: n._loadedInjector
                }) : function aA(e, t, n, r) {
                    const o = t.canLoad;
                    return void 0 === o || 0 === o.length ? F(!0) : F(o.map(s=>{
                        const a = mi(s, e);
                        return Sr(function WT(e) {
                            return e && Ks(e.canLoad)
                        }(a) ? a.canLoad(t, n) : e.runInContext(()=>a(t, n)))
                    }
                    )).pipe(yi(), gC())
                }(t, n, r).pipe(Ee(o=>o ? this.configLoader.loadChildren(t, n).pipe(at(i=>{
                    n._loadedRoutes = i.routes,
                    n._loadedInjector = i.injector
                }
                )) : function pA(e) {
                    return Fs(cC(pc, 3))
                }())) : F({
                    routes: [],
                    injector: t
                })
            }
            lineralizeSegments(t, n) {
                let r = []
                  , o = n.root;
                for (; ; ) {
                    if (r = r.concat(o.segments),
                    0 === o.numberOfChildren)
                        return F(r);
                    if (o.numberOfChildren > 1 || !o.children[q])
                        return t.redirectTo,
                        Fs(new E(4e3,pc));
                    o = o.children[q]
                }
            }
            applyRedirectCommands(t, n, r) {
                return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r)
            }
            applyRedirectCreateUrlTree(t, n, r, o) {
                const i = this.createSegmentGroup(t, n.root, r, o);
                return new Ir(i,this.createQueryParams(n.queryParams, this.urlTree.queryParams),n.fragment)
            }
            createQueryParams(t, n) {
                const r = {};
                return et(t, (o,i)=>{
                    if ("string" == typeof o && o.startsWith(":")) {
                        const a = o.substring(1);
                        r[i] = n[a]
                    } else
                        r[i] = o
                }
                ),
                r
            }
            createSegmentGroup(t, n, r, o) {
                const i = this.createSegments(t, n.segments, r, o);
                let s = {};
                return et(n.children, (a,l)=>{
                    s[l] = this.createSegmentGroup(t, a, r, o)
                }
                ),
                new K(i,s)
            }
            createSegments(t, n, r, o) {
                return n.map(i=>i.path.startsWith(":") ? this.findPosParam(t, i, o) : this.findOrReturn(i, r))
            }
            findPosParam(t, n, r) {
                const o = r[n.path.substring(1)];
                if (!o)
                    throw new E(4001,pc);
                return o
            }
            findOrReturn(t, n) {
                let r = 0;
                for (const o of n) {
                    if (o.path === t.path)
                        return n.splice(r),
                        o;
                    r++
                }
                return t
            }
        }
        class wA {
        }
        class bA {
            constructor(t, n, r, o, i, s, a) {
                this.injector = t,
                this.rootComponentType = n,
                this.config = r,
                this.urlTree = o,
                this.url = i,
                this.paramsInheritanceStrategy = s,
                this.urlSerializer = a
            }
            recognize() {
                const t = fc(this.urlTree.root, [], [], this.config.filter(n=>void 0 === n.redirectTo)).segmentGroup;
                return this.processSegmentGroup(this.injector, this.config, t, q).pipe(Q(n=>{
                    if (null === n)
                        return null;
                    const r = new lc([],Object.freeze({}),Object.freeze({
                        ...this.urlTree.queryParams
                    }),this.urlTree.fragment,{},q,this.rootComponentType,null,this.urlTree.root,-1,{})
                      , o = new or(r,n)
                      , i = new sC(this.url,o);
                    return this.inheritParamsAndData(i._root),
                    i
                }
                ))
            }
            inheritParamsAndData(t) {
                const n = t.value
                  , r = iC(n, this.paramsInheritanceStrategy);
                n.params = Object.freeze(r.params),
                n.data = Object.freeze(r.data),
                t.children.forEach(o=>this.inheritParamsAndData(o))
            }
            processSegmentGroup(t, n, r, o) {
                return 0 === r.segments.length && r.hasChildren() ? this.processChildren(t, n, r) : this.processSegment(t, n, r, r.segments, o)
            }
            processChildren(t, n, r) {
                return Pe(Object.keys(r.children)).pipe(ao(o=>{
                    const i = r.children[o]
                      , s = hC(n, o);
                    return this.processSegmentGroup(t, s, i, o)
                }
                ), R0((o,i)=>o && i ? (o.push(...i),
                o) : null), function jO(e, t=!1) {
                    return ye((n,r)=>{
                        let o = 0;
                        n.subscribe(ae(r, i=>{
                            const s = e(i, o++);
                            (s || t) && r.next(i),
                            !s && r.complete()
                        }
                        ))
                    }
                    )
                }(o=>null !== o), Xl(null), N0(), Q(o=>{
                    if (null === o)
                        return null;
                    const i = _C(o);
                    return function _A(e) {
                        e.sort((t,n)=>t.value.outlet === q ? -1 : n.value.outlet === q ? 1 : t.value.outlet.localeCompare(n.value.outlet))
                    }(i),
                    i
                }
                ))
            }
            processSegment(t, n, r, o, i) {
                return Pe(n).pipe(ao(s=>this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)), Er(s=>!!s), Pr(s=>{
                    if (wh(s))
                        return wC(r, o, i) ? F([]) : F(null);
                    throw s
                }
                ))
            }
            processSegmentAgainstRoute(t, n, r, o, i) {
                if (n.redirectTo || !yC(n, r, o, i))
                    return F(null);
                let s;
                if ("**" === n.path) {
                    const a = o.length > 0 ? B0(o).parameters : {}
                      , l = MC(r) + o.length;
                    s = F({
                        snapshot: new lc(o,a,Object.freeze({
                            ...this.urlTree.queryParams
                        }),this.urlTree.fragment,xC(n),Jt(n),n.component ?? n._loadedComponent ?? null,n,DC(r),l,EC(n)),
                        consumedSegments: [],
                        remainingSegments: []
                    })
                } else
                    s = mC(r, n, o, t).pipe(Q(({matched: a, consumedSegments: l, remainingSegments: u, parameters: f})=>{
                        if (!a)
                            return null;
                        const p = MC(r) + l.length;
                        return {
                            snapshot: new lc(l,f,Object.freeze({
                                ...this.urlTree.queryParams
                            }),this.urlTree.fragment,xC(n),Jt(n),n.component ?? n._loadedComponent ?? null,n,DC(r),p,EC(n)),
                            consumedSegments: l,
                            remainingSegments: u
                        }
                    }
                    ));
                return s.pipe(Rn(a=>{
                    if (null === a)
                        return F(null);
                    const {snapshot: l, consumedSegments: u, remainingSegments: f} = a;
                    t = n._injector ?? t;
                    const p = n._loadedInjector ?? t
                      , g = function DA(e) {
                        return e.children ? e.children : e.loadChildren ? e._loadedRoutes : []
                    }(n)
                      , {segmentGroup: y, slicedSegments: w} = fc(r, u, f, g.filter(v=>void 0 === v.redirectTo));
                    if (0 === w.length && y.hasChildren())
                        return this.processChildren(p, g, y).pipe(Q(v=>null === v ? null : [new or(l,v)]));
                    if (0 === g.length && 0 === w.length)
                        return F([new or(l,[])]);
                    const C = Jt(n) === i;
                    return this.processSegment(p, g, y, w, C ? q : i).pipe(Q(v=>null === v ? null : [new or(l,v)]))
                }
                ))
            }
        }
        function MA(e) {
            const t = e.value.routeConfig;
            return t && "" === t.path && void 0 === t.redirectTo
        }
        function _C(e) {
            const t = []
              , n = new Set;
            for (const r of e) {
                if (!MA(r)) {
                    t.push(r);
                    continue
                }
                const o = t.find(i=>r.value.routeConfig === i.value.routeConfig);
                void 0 !== o ? (o.children.push(...r.children),
                n.add(o)) : t.push(r)
            }
            for (const r of n) {
                const o = _C(r.children);
                t.push(new or(r.value,o))
            }
            return t.filter(r=>!n.has(r))
        }
        function DC(e) {
            let t = e;
            for (; t._sourceSegment; )
                t = t._sourceSegment;
            return t
        }
        function MC(e) {
            let t = e
              , n = t._segmentIndexShift ?? 0;
            for (; t._sourceSegment; )
                t = t._sourceSegment,
                n += t._segmentIndexShift ?? 0;
            return n - 1
        }
        function xC(e) {
            return e.data || {}
        }
        function EC(e) {
            return e.resolve || {}
        }
        function PC(e) {
            return "string" == typeof e.title || null === e.title
        }
        function bh(e) {
            return Rn(t=>{
                const n = e(t);
                return n ? Pe(n).pipe(Q(()=>t)) : F(t)
            }
            )
        }
        const wi = new $("ROUTES");
        let _h = (()=>{
            class e {
                constructor(n, r) {
                    this.injector = n,
                    this.compiler = r,
                    this.componentLoaders = new WeakMap,
                    this.childrenLoaders = new WeakMap
                }
                loadComponent(n) {
                    if (this.componentLoaders.get(n))
                        return this.componentLoaders.get(n);
                    if (n._loadedComponent)
                        return F(n._loadedComponent);
                    this.onLoadStartListener && this.onLoadStartListener(n);
                    const r = Sr(n.loadComponent()).pipe(Q(IC), at(i=>{
                        this.onLoadEndListener && this.onLoadEndListener(n),
                        n._loadedComponent = i
                    }
                    ), Jf(()=>{
                        this.componentLoaders.delete(n)
                    }
                    ))
                      , o = new A0(r,()=>new It).pipe(Qf());
                    return this.componentLoaders.set(n, o),
                    o
                }
                loadChildren(n, r) {
                    if (this.childrenLoaders.get(r))
                        return this.childrenLoaders.get(r);
                    if (r._loadedRoutes)
                        return F({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                    this.onLoadStartListener && this.onLoadStartListener(r);
                    const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(Q(a=>{
                        this.onLoadEndListener && this.onLoadEndListener(r);
                        let l, u, f = !1;
                        Array.isArray(a) ? u = a : (l = a.create(n).injector,
                        u = L0(l.get(wi, [], R.Self | R.Optional)));
                        return {
                            routes: u.map(yh),
                            injector: l
                        }
                    }
                    ), Jf(()=>{
                        this.childrenLoaders.delete(r)
                    }
                    ))
                      , s = new A0(i,()=>new It).pipe(Qf());
                    return this.childrenLoaders.set(r, s),
                    s
                }
                loadModuleFactoryOrRoutes(n) {
                    return Sr(n()).pipe(Q(IC), Ee(o=>o instanceof yw || Array.isArray(o) ? F(o) : Pe(this.compiler.compileModuleAsync(o))))
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(In),T(cv))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function IC(e) {
            return function kA(e) {
                return e && "object" == typeof e && "default"in e
            }(e) ? e.default : e
        }
        let yc = (()=>{
            class e {
                get hasRequestedNavigation() {
                    return 0 !== this.navigationId
                }
                constructor() {
                    this.currentNavigation = null,
                    this.lastSuccessfulNavigation = null,
                    this.events = new It,
                    this.configLoader = J(_h),
                    this.environmentInjector = J(Kn),
                    this.urlSerializer = J(js),
                    this.rootContexts = J(qs),
                    this.navigationId = 0,
                    this.afterPreactivation = ()=>F(void 0),
                    this.rootComponentType = null,
                    this.configLoader.onLoadEndListener = o=>this.events.next(new vT(o)),
                    this.configLoader.onLoadStartListener = o=>this.events.next(new wT(o))
                }
                complete() {
                    this.transitions?.complete()
                }
                handleNavigationRequest(n) {
                    const r = ++this.navigationId;
                    this.transitions?.next({
                        ...this.transitions.value,
                        ...n,
                        id: r
                    })
                }
                setupNavigations(n) {
                    return this.transitions = new gn({
                        id: 0,
                        targetPageId: 0,
                        currentUrlTree: n.currentUrlTree,
                        currentRawUrl: n.currentUrlTree,
                        extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                        urlAfterRedirects: n.urlHandlingStrategy.extract(n.currentUrlTree),
                        rawUrl: n.currentUrlTree,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: zs,
                        restoredState: null,
                        currentSnapshot: n.routerState.snapshot,
                        targetSnapshot: null,
                        currentRouterState: n.routerState,
                        targetRouterState: null,
                        guards: {
                            canActivateChecks: [],
                            canDeactivateChecks: []
                        },
                        guardsResult: null
                    }),
                    this.transitions.pipe(xr(r=>0 !== r.id), Q(r=>({
                        ...r,
                        extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl)
                    })), Rn(r=>{
                        let o = !1
                          , i = !1;
                        return F(r).pipe(at(s=>{
                            this.currentNavigation = {
                                id: s.id,
                                initialUrl: s.rawUrl,
                                extractedUrl: s.extractedUrl,
                                trigger: s.source,
                                extras: s.extras,
                                previousNavigation: this.lastSuccessfulNavigation ? {
                                    ...this.lastSuccessfulNavigation,
                                    previousNavigation: null
                                } : null
                            }
                        }
                        ), Rn(s=>{
                            const a = n.browserUrlTree.toString()
                              , l = !n.navigated || s.extractedUrl.toString() !== a || a !== n.currentUrlTree.toString();
                            if (!l && "reload" !== (s.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)) {
                                const f = "";
                                return this.events.next(new ac(s.id,n.serializeUrl(r.rawUrl),f,0)),
                                n.rawUrlTree = s.rawUrl,
                                s.resolve(null),
                                Ot
                            }
                            if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                                return OC(s.source) && (n.browserUrlTree = s.extractedUrl),
                                F(s).pipe(Rn(f=>{
                                    const p = this.transitions?.getValue();
                                    return this.events.next(new sh(f.id,this.urlSerializer.serialize(f.extractedUrl),f.source,f.restoredState)),
                                    p !== this.transitions?.getValue() ? Ot : Promise.resolve(f)
                                }
                                ), function yA(e, t, n, r) {
                                    return Rn(o=>function gA(e, t, n, r, o) {
                                        return new mA(e,t,n,r,o).apply()
                                    }(e, t, n, o.extractedUrl, r).pipe(Q(i=>({
                                        ...o,
                                        urlAfterRedirects: i
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.urlSerializer, n.config), at(f=>{
                                    this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: f.urlAfterRedirects
                                    },
                                    r.urlAfterRedirects = f.urlAfterRedirects
                                }
                                ), function EA(e, t, n, r, o) {
                                    return Ee(i=>function CA(e, t, n, r, o, i, s="emptyOnly") {
                                        return new bA(e,t,n,r,o,s,i).recognize().pipe(Rn(a=>null === a ? function vA(e) {
                                            return new De(t=>t.error(e))
                                        }(new wA) : F(a)))
                                    }(e, t, n, i.urlAfterRedirects, r.serialize(i.urlAfterRedirects), r, o).pipe(Q(s=>({
                                        ...i,
                                        targetSnapshot: s
                                    }))))
                                }(this.environmentInjector, this.rootComponentType, n.config, this.urlSerializer, n.paramsInheritanceStrategy), at(f=>{
                                    if (r.targetSnapshot = f.targetSnapshot,
                                    "eager" === n.urlUpdateStrategy) {
                                        if (!f.extras.skipLocationChange) {
                                            const g = n.urlHandlingStrategy.merge(f.urlAfterRedirects, f.rawUrl);
                                            n.setBrowserUrl(g, f)
                                        }
                                        n.browserUrlTree = f.urlAfterRedirects
                                    }
                                    const p = new hT(f.id,this.urlSerializer.serialize(f.extractedUrl),this.urlSerializer.serialize(f.urlAfterRedirects),f.targetSnapshot);
                                    this.events.next(p)
                                }
                                ));
                            if (l && n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)) {
                                const {id: f, extractedUrl: p, source: g, restoredState: y, extras: w} = s
                                  , C = new sh(f,this.urlSerializer.serialize(p),g,y);
                                this.events.next(C);
                                const v = oC(p, this.rootComponentType).snapshot;
                                return F(r = {
                                    ...s,
                                    targetSnapshot: v,
                                    urlAfterRedirects: p,
                                    extras: {
                                        ...w,
                                        skipLocationChange: !1,
                                        replaceUrl: !1
                                    }
                                })
                            }
                            {
                                const f = "";
                                return this.events.next(new ac(s.id,n.serializeUrl(r.extractedUrl),f,1)),
                                n.rawUrlTree = s.rawUrl,
                                s.resolve(null),
                                Ot
                            }
                        }
                        ), at(s=>{
                            const a = new pT(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot);
                            this.events.next(a)
                        }
                        ), Q(s=>r = {
                            ...s,
                            guards: UT(s.targetSnapshot, s.currentSnapshot, this.rootContexts)
                        }), function JT(e, t) {
                            return Ee(n=>{
                                const {targetSnapshot: r, currentSnapshot: o, guards: {canActivateChecks: i, canDeactivateChecks: s}} = n;
                                return 0 === s.length && 0 === i.length ? F({
                                    ...n,
                                    guardsResult: !0
                                }) : function eA(e, t, n, r) {
                                    return Pe(e).pipe(Ee(o=>function sA(e, t, n, r, o) {
                                        const i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                                        return i && 0 !== i.length ? F(i.map(a=>{
                                            const l = Ws(t) ?? o
                                              , u = mi(a, l);
                                            return Sr(function KT(e) {
                                                return e && Ks(e.canDeactivate)
                                            }(u) ? u.canDeactivate(e, t, n, r) : l.runInContext(()=>u(e, t, n, r))).pipe(Er())
                                        }
                                        )).pipe(yi()) : F(!0)
                                    }(o.component, o.route, n, t, r)), Er(o=>!0 !== o, !0))
                                }(s, r, o, e).pipe(Ee(a=>a && function qT(e) {
                                    return "boolean" == typeof e
                                }(a) ? function tA(e, t, n, r) {
                                    return Pe(t).pipe(ao(o=>Kf(function rA(e, t) {
                                        return null !== e && t && t(new CT(e)),
                                        F(!0)
                                    }(o.route.parent, r), function nA(e, t) {
                                        return null !== e && t && t(new _T(e)),
                                        F(!0)
                                    }(o.route, r), function iA(e, t, n) {
                                        const r = t[t.length - 1]
                                          , i = t.slice(0, t.length - 1).reverse().map(s=>function HT(e) {
                                            const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                            return t && 0 !== t.length ? {
                                                node: e,
                                                guards: t
                                            } : null
                                        }(s)).filter(s=>null !== s).map(s=>T0(()=>F(s.guards.map(l=>{
                                            const u = Ws(s.node) ?? n
                                              , f = mi(l, u);
                                            return Sr(function ZT(e) {
                                                return e && Ks(e.canActivateChild)
                                            }(f) ? f.canActivateChild(r, e) : u.runInContext(()=>f(r, e))).pipe(Er())
                                        }
                                        )).pipe(yi())));
                                        return F(i).pipe(yi())
                                    }(e, o.path, n), function oA(e, t, n) {
                                        const r = t.routeConfig ? t.routeConfig.canActivate : null;
                                        if (!r || 0 === r.length)
                                            return F(!0);
                                        const o = r.map(i=>T0(()=>{
                                            const s = Ws(t) ?? n
                                              , a = mi(i, s);
                                            return Sr(function YT(e) {
                                                return e && Ks(e.canActivate)
                                            }(a) ? a.canActivate(t, e) : s.runInContext(()=>a(t, e))).pipe(Er())
                                        }
                                        ));
                                        return F(o).pipe(yi())
                                    }(e, o.route, n))), Er(o=>!0 !== o, !0))
                                }(r, i, e, t) : F(a)), Q(a=>({
                                    ...n,
                                    guardsResult: a
                                })))
                            }
                            )
                        }(this.environmentInjector, s=>this.events.next(s)), at(s=>{
                            if (r.guardsResult = s.guardsResult,
                            co(s.guardsResult))
                                throw lC(0, s.guardsResult);
                            const a = new gT(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(s.urlAfterRedirects),s.targetSnapshot,!!s.guardsResult);
                            this.events.next(a)
                        }
                        ), xr(s=>!!s.guardsResult || (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)), bh(s=>{
                            if (s.guards.canActivateChecks.length)
                                return F(s).pipe(at(a=>{
                                    const l = new mT(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);
                                    this.events.next(l)
                                }
                                ), Rn(a=>{
                                    let l = !1;
                                    return F(a).pipe(function PA(e, t) {
                                        return Ee(n=>{
                                            const {targetSnapshot: r, guards: {canActivateChecks: o}} = n;
                                            if (!o.length)
                                                return F(n);
                                            let i = 0;
                                            return Pe(o).pipe(ao(s=>function SA(e, t, n, r) {
                                                const o = e.routeConfig
                                                  , i = e._resolve;
                                                return void 0 !== o?.title && !PC(o) && (i[Bs] = o.title),
                                                function IA(e, t, n, r) {
                                                    const o = function OA(e) {
                                                        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
                                                    }(e);
                                                    if (0 === o.length)
                                                        return F({});
                                                    const i = {};
                                                    return Pe(o).pipe(Ee(s=>function TA(e, t, n, r) {
                                                        const o = Ws(t) ?? r
                                                          , i = mi(e, o);
                                                        return Sr(i.resolve ? i.resolve(t, n) : o.runInContext(()=>i(t, n)))
                                                    }(e[s], t, n, r).pipe(Er(), at(a=>{
                                                        i[s] = a
                                                    }
                                                    ))), Xf(1), function VO(e) {
                                                        return Q(()=>e)
                                                    }(i), Pr(s=>wh(s) ? Ot : Fs(s)))
                                                }(i, e, t, r).pipe(Q(s=>(e._resolvedData = s,
                                                e.data = iC(e, n).resolve,
                                                o && PC(o) && (e.data[Bs] = o.title),
                                                null)))
                                            }(s.route, r, e, t)), at(()=>i++), Xf(1), Ee(s=>i === o.length ? F(n) : Ot))
                                        }
                                        )
                                    }(n.paramsInheritanceStrategy, this.environmentInjector), at({
                                        next: ()=>l = !0,
                                        complete: ()=>{
                                            l || (n.restoreHistory(a),
                                            this.cancelNavigationTransition(a, "", 2))
                                        }
                                    }))
                                }
                                ), at(a=>{
                                    const l = new yT(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);
                                    this.events.next(l)
                                }
                                ))
                        }
                        ), bh(s=>{
                            const a = l=>{
                                const u = [];
                                l.routeConfig?.loadComponent && !l.routeConfig._loadedComponent && u.push(this.configLoader.loadComponent(l.routeConfig).pipe(at(f=>{
                                    l.component = f
                                }
                                ), Q(()=>{}
                                )));
                                for (const f of l.children)
                                    u.push(...a(f));
                                return u
                            }
                            ;
                            return I0(a(s.targetSnapshot.root)).pipe(Xl(), Ls(1))
                        }
                        ), bh(()=>this.afterPreactivation()), Q(s=>{
                            const a = function TT(e, t, n) {
                                const r = Gs(e, t._root, n ? n._root : void 0);
                                return new rC(r,t)
                            }(n.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
                            return r = {
                                ...s,
                                targetRouterState: a
                            }
                        }
                        ), at(s=>{
                            n.currentUrlTree = s.urlAfterRedirects,
                            n.rawUrlTree = n.urlHandlingStrategy.merge(s.urlAfterRedirects, s.rawUrl),
                            n.routerState = s.targetRouterState,
                            "deferred" === n.urlUpdateStrategy && (s.extras.skipLocationChange || n.setBrowserUrl(n.rawUrlTree, s),
                            n.browserUrlTree = s.urlAfterRedirects)
                        }
                        ), ((e,t,n)=>Q(r=>(new VT(t,r.targetRouterState,r.currentRouterState,n).activate(e),
                        r)))(this.rootContexts, n.routeReuseStrategy, s=>this.events.next(s)), at({
                            next: s=>{
                                o = !0,
                                this.lastSuccessfulNavigation = this.currentNavigation,
                                n.navigated = !0,
                                this.events.next(new uo(s.id,this.urlSerializer.serialize(s.extractedUrl),this.urlSerializer.serialize(n.currentUrlTree))),
                                n.titleStrategy?.updateTitle(s.targetRouterState.snapshot),
                                s.resolve(!0)
                            }
                            ,
                            complete: ()=>{
                                o = !0
                            }
                        }), Jf(()=>{
                            o || i || this.cancelNavigationTransition(r, "", 1),
                            this.currentNavigation?.id === r.id && (this.currentNavigation = null)
                        }
                        ), Pr(s=>{
                            if (i = !0,
                            dC(s)) {
                                uC(s) || (n.navigated = !0,
                                n.restoreHistory(r, !0));
                                const a = new sc(r.id,this.urlSerializer.serialize(r.extractedUrl),s.message,s.cancellationCode);
                                if (this.events.next(a),
                                uC(s)) {
                                    const l = n.urlHandlingStrategy.merge(s.url, n.rawUrlTree)
                                      , u = {
                                        skipLocationChange: r.extras.skipLocationChange,
                                        replaceUrl: "eager" === n.urlUpdateStrategy || OC(r.source)
                                    };
                                    n.scheduleNavigation(l, zs, null, u, {
                                        resolve: r.resolve,
                                        reject: r.reject,
                                        promise: r.promise
                                    })
                                } else
                                    r.resolve(!1)
                            } else {
                                n.restoreHistory(r, !0);
                                const a = new ah(r.id,this.urlSerializer.serialize(r.extractedUrl),s,r.targetSnapshot ?? void 0);
                                this.events.next(a);
                                try {
                                    r.resolve(n.errorHandler(s))
                                } catch (l) {
                                    r.reject(l)
                                }
                            }
                            return Ot
                        }
                        ))
                    }
                    ))
                }
                cancelNavigationTransition(n, r, o) {
                    const i = new sc(n.id,this.urlSerializer.serialize(n.extractedUrl),r,o);
                    this.events.next(i),
                    n.resolve(!1)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function OC(e) {
            return e !== zs
        }
        let TC = (()=>{
            class e {
                buildTitle(n) {
                    let r, o = n.root;
                    for (; void 0 !== o; )
                        r = this.getResolvedTitleForRoute(o) ?? r,
                        o = o.children.find(i=>i.outlet === q);
                    return r
                }
                getResolvedTitleForRoute(n) {
                    return n.data[Bs]
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return J(RA)
                },
                providedIn: "root"
            }),
            e
        }
        )()
          , RA = (()=>{
            class e extends TC {
                constructor(n) {
                    super(),
                    this.title = n
                }
                updateTitle(n) {
                    const r = this.buildTitle(n);
                    void 0 !== r && this.title.setTitle(r)
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(E0))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )()
          , NA = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return J(LA)
                },
                providedIn: "root"
            }),
            e
        }
        )();
        class FA {
            shouldDetach(t) {
                return !1
            }
            store(t, n) {}
            shouldAttach(t) {
                return !1
            }
            retrieve(t) {
                return null
            }
            shouldReuseRoute(t, n) {
                return t.routeConfig === n.routeConfig
            }
        }
        let LA = (()=>{
            class e extends FA {
            }
            return e.\u0275fac = function() {
                let t;
                return function(r) {
                    return (t || (t = function Lp(e) {
                        return Dn(()=>{
                            const t = e.prototype.constructor
                              , n = t[sn] || Du(t)
                              , r = Object.prototype;
                            let o = Object.getPrototypeOf(e.prototype).constructor;
                            for (; o && o !== r; ) {
                                const i = o[sn] || Du(o);
                                if (i && i !== n)
                                    return i;
                                o = Object.getPrototypeOf(o)
                            }
                            return i=>new i
                        }
                        )
                    }(e)))(r || e)
                }
            }(),
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const wc = new $("",{
            providedIn: "root",
            factory: ()=>({})
        });
        let $A = (()=>{
            class e {
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: function() {
                    return J(jA)
                },
                providedIn: "root"
            }),
            e
        }
        )()
          , jA = (()=>{
            class e {
                shouldProcessUrl(n) {
                    return !0
                }
                extract(n) {
                    return n
                }
                merge(n, r) {
                    return n
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        function VA(e) {
            throw e
        }
        function UA(e, t, n) {
            return t.parse("/")
        }
        const HA = {
            paths: "exact",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "exact"
        }
          , zA = {
            paths: "subset",
            fragment: "ignored",
            matrixParams: "ignored",
            queryParams: "subset"
        };
        let Et = (()=>{
            class e {
                get navigationId() {
                    return this.navigationTransitions.navigationId
                }
                get browserPageId() {
                    return this.location.getState()?.\u0275routerPageId
                }
                get events() {
                    return this.navigationTransitions.events
                }
                constructor() {
                    this.disposed = !1,
                    this.currentPageId = 0,
                    this.console = J(l1),
                    this.isNgZoneEnabled = !1,
                    this.options = J(wc, {
                        optional: !0
                    }) || {},
                    this.errorHandler = this.options.errorHandler || VA,
                    this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || UA,
                    this.navigated = !1,
                    this.lastSuccessfulId = -1,
                    this.urlHandlingStrategy = J($A),
                    this.routeReuseStrategy = J(NA),
                    this.urlCreationStrategy = J(ST),
                    this.titleStrategy = J(TC),
                    this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore",
                    this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly",
                    this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred",
                    this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace",
                    this.config = L0(J(wi, {
                        optional: !0
                    }) ?? []),
                    this.navigationTransitions = J(yc),
                    this.urlSerializer = J(js),
                    this.location = J(xf),
                    this.isNgZoneEnabled = J(Se)instanceof Se && Se.isInAngularZone(),
                    this.resetConfig(this.config),
                    this.currentUrlTree = new Ir,
                    this.rawUrlTree = this.currentUrlTree,
                    this.browserUrlTree = this.currentUrlTree,
                    this.routerState = oC(this.currentUrlTree, null),
                    this.navigationTransitions.setupNavigations(this).subscribe(n=>{
                        this.lastSuccessfulId = n.id,
                        this.currentPageId = n.targetPageId
                    }
                    , n=>{
                        this.console.warn(`Unhandled Navigation Error: ${n}`)
                    }
                    )
                }
                resetRootComponentType(n) {
                    this.routerState.root.component = n,
                    this.navigationTransitions.rootComponentType = n
                }
                initialNavigation() {
                    if (this.setUpLocationChangeListener(),
                    !this.navigationTransitions.hasRequestedNavigation) {
                        const n = this.location.getState();
                        this.navigateToSyncWithBrowser(this.location.path(!0), zs, n)
                    }
                }
                setUpLocationChangeListener() {
                    this.locationSubscription || (this.locationSubscription = this.location.subscribe(n=>{
                        const r = "popstate" === n.type ? "popstate" : "hashchange";
                        "popstate" === r && setTimeout(()=>{
                            this.navigateToSyncWithBrowser(n.url, r, n.state)
                        }
                        , 0)
                    }
                    ))
                }
                navigateToSyncWithBrowser(n, r, o) {
                    const i = {
                        replaceUrl: !0
                    }
                      , s = o?.navigationId ? o : null;
                    if (o) {
                        const l = {
                            ...o
                        };
                        delete l.navigationId,
                        delete l.\u0275routerPageId,
                        0 !== Object.keys(l).length && (i.state = l)
                    }
                    const a = this.parseUrl(n);
                    this.scheduleNavigation(a, r, s, i)
                }
                get url() {
                    return this.serializeUrl(this.currentUrlTree)
                }
                getCurrentNavigation() {
                    return this.navigationTransitions.currentNavigation
                }
                resetConfig(n) {
                    this.config = n.map(yh),
                    this.navigated = !1,
                    this.lastSuccessfulId = -1
                }
                ngOnDestroy() {
                    this.dispose()
                }
                dispose() {
                    this.navigationTransitions.complete(),
                    this.locationSubscription && (this.locationSubscription.unsubscribe(),
                    this.locationSubscription = void 0),
                    this.disposed = !0
                }
                createUrlTree(n, r={}) {
                    const {relativeTo: o, queryParams: i, fragment: s, queryParamsHandling: a, preserveFragment: l} = r
                      , u = l ? this.currentUrlTree.fragment : s;
                    let f = null;
                    switch (a) {
                    case "merge":
                        f = {
                            ...this.currentUrlTree.queryParams,
                            ...i
                        };
                        break;
                    case "preserve":
                        f = this.currentUrlTree.queryParams;
                        break;
                    default:
                        f = i || null
                    }
                    return null !== f && (f = this.removeEmptyProps(f)),
                    this.urlCreationStrategy.createUrlTree(o, this.routerState, this.currentUrlTree, n, f, u ?? null)
                }
                navigateByUrl(n, r={
                    skipLocationChange: !1
                }) {
                    const o = co(n) ? n : this.parseUrl(n)
                      , i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                    return this.scheduleNavigation(i, zs, null, r)
                }
                navigate(n, r={
                    skipLocationChange: !1
                }) {
                    return function GA(e) {
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t];
                            if (null == n)
                                throw new E(4008,false)
                        }
                    }(n),
                    this.navigateByUrl(this.createUrlTree(n, r), r)
                }
                serializeUrl(n) {
                    return this.urlSerializer.serialize(n)
                }
                parseUrl(n) {
                    let r;
                    try {
                        r = this.urlSerializer.parse(n)
                    } catch (o) {
                        r = this.malformedUriErrorHandler(o, this.urlSerializer, n)
                    }
                    return r
                }
                isActive(n, r) {
                    let o;
                    if (o = !0 === r ? {
                        ...HA
                    } : !1 === r ? {
                        ...zA
                    } : r,
                    co(n))
                        return j0(this.currentUrlTree, n, o);
                    const i = this.parseUrl(n);
                    return j0(this.currentUrlTree, i, o)
                }
                removeEmptyProps(n) {
                    return Object.keys(n).reduce((r,o)=>{
                        const i = n[o];
                        return null != i && (r[o] = i),
                        r
                    }
                    , {})
                }
                scheduleNavigation(n, r, o, i, s) {
                    if (this.disposed)
                        return Promise.resolve(!1);
                    let a, l, u, f;
                    return s ? (a = s.resolve,
                    l = s.reject,
                    u = s.promise) : u = new Promise((p,g)=>{
                        a = p,
                        l = g
                    }
                    ),
                    f = "computed" === this.canceledNavigationResolution ? o && o.\u0275routerPageId ? o.\u0275routerPageId : i.replaceUrl || i.skipLocationChange ? this.browserPageId ?? 0 : (this.browserPageId ?? 0) + 1 : 0,
                    this.navigationTransitions.handleNavigationRequest({
                        targetPageId: f,
                        source: r,
                        restoredState: o,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        rawUrl: n,
                        extras: i,
                        resolve: a,
                        reject: l,
                        promise: u,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState
                    }),
                    u.catch(p=>Promise.reject(p))
                }
                setBrowserUrl(n, r) {
                    const o = this.urlSerializer.serialize(n)
                      , i = {
                        ...r.extras.state,
                        ...this.generateNgRouterState(r.id, r.targetPageId)
                    };
                    this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl ? this.location.replaceState(o, "", i) : this.location.go(o, "", i)
                }
                restoreHistory(n, r=!1) {
                    if ("computed" === this.canceledNavigationResolution) {
                        const o = this.currentPageId - n.targetPageId;
                        "popstate" !== n.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.getCurrentNavigation()?.finalUrl || 0 === o ? this.currentUrlTree === this.getCurrentNavigation()?.finalUrl && 0 === o && (this.resetState(n),
                        this.browserUrlTree = n.currentUrlTree,
                        this.resetUrlToCurrentUrlTree()) : this.location.historyGo(o)
                    } else
                        "replace" === this.canceledNavigationResolution && (r && this.resetState(n),
                        this.resetUrlToCurrentUrlTree())
                }
                resetState(n) {
                    this.routerState = n.currentRouterState,
                    this.currentUrlTree = n.currentUrlTree,
                    this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl)
                }
                resetUrlToCurrentUrlTree() {
                    this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                }
                generateNgRouterState(n, r) {
                    return "computed" === this.canceledNavigationResolution ? {
                        navigationId: n,
                        \u0275routerPageId: r
                    } : {
                        navigationId: n
                    }
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        class AC {
        }
        let YA = (()=>{
            class e {
                constructor(n, r, o, i, s) {
                    this.router = n,
                    this.injector = o,
                    this.preloadingStrategy = i,
                    this.loader = s
                }
                setUpPreloading() {
                    this.subscription = this.router.events.pipe(xr(n=>n instanceof uo), ao(()=>this.preload())).subscribe(()=>{}
                    )
                }
                preload() {
                    return this.processRoutes(this.injector, this.router.config)
                }
                ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe()
                }
                processRoutes(n, r) {
                    const o = [];
                    for (const i of r) {
                        i.providers && !i._injector && (i._injector = xl(i.providers, n, `Route: ${i.path}`));
                        const s = i._injector ?? n
                          , a = i._loadedInjector ?? s;
                        i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent ? o.push(this.preloadConfig(s, i)) : (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
                    }
                    return Pe(o).pipe(zt())
                }
                preloadConfig(n, r) {
                    return this.preloadingStrategy.preload(r, ()=>{
                        let o;
                        o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : F(null);
                        const i = o.pipe(Ee(s=>null === s ? F(void 0) : (r._loadedRoutes = s.routes,
                        r._loadedInjector = s.injector,
                        this.processRoutes(s.injector ?? n, s.routes))));
                        return r.loadComponent && !r._loadedComponent ? Pe([i, this.loader.loadComponent(r)]).pipe(zt()) : i
                    }
                    )
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(Et),T(cv),T(Kn),T(AC),T(_h))
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac,
                providedIn: "root"
            }),
            e
        }
        )();
        const xh = new $("");
        let kC = (()=>{
            class e {
                constructor(n, r, o, i, s={}) {
                    this.urlSerializer = n,
                    this.transitions = r,
                    this.viewportScroller = o,
                    this.zone = i,
                    this.options = s,
                    this.lastId = 0,
                    this.lastSource = "imperative",
                    this.restoredId = 0,
                    this.store = {},
                    s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled",
                    s.anchorScrolling = s.anchorScrolling || "disabled"
                }
                init() {
                    "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"),
                    this.routerEventsSubscription = this.createScrollEvents(),
                    this.scrollEventsSubscription = this.consumeScrollEvents()
                }
                createScrollEvents() {
                    return this.transitions.events.subscribe(n=>{
                        n instanceof sh ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(),
                        this.lastSource = n.navigationTrigger,
                        this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof uo && (this.lastId = n.id,
                        this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment))
                    }
                    )
                }
                consumeScrollEvents() {
                    return this.transitions.events.subscribe(n=>{
                        n instanceof tC && (n.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(n.position) : n.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(n.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                    }
                    )
                }
                scheduleScrollEvent(n, r) {
                    this.zone.runOutsideAngular(()=>{
                        setTimeout(()=>{
                            this.zone.run(()=>{
                                this.transitions.events.next(new tC(n,"popstate" === this.lastSource ? this.store[this.restoredId] : null,r))
                            }
                            )
                        }
                        , 0)
                    }
                    )
                }
                ngOnDestroy() {
                    this.routerEventsSubscription?.unsubscribe(),
                    this.scrollEventsSubscription?.unsubscribe()
                }
            }
            return e.\u0275fac = function(n) {
                !function pm() {
                    throw new Error("invalid")
                }()
            }
            ,
            e.\u0275prov = L({
                token: e,
                factory: e.\u0275fac
            }),
            e
        }
        )();
        var jt = (()=>((jt = jt || {})[jt.COMPLETE = 0] = "COMPLETE",
        jt[jt.FAILED = 1] = "FAILED",
        jt[jt.REDIRECTING = 2] = "REDIRECTING",
        jt))();
        const vi = !1;
        function Or(e, t) {
            return {
                \u0275kind: e,
                \u0275providers: t
            }
        }
        const Eh = new $("",{
            providedIn: "root",
            factory: ()=>!1
        });
        function NC() {
            const e = J(In);
            return t=>{
                const n = e.get(Al);
                if (t !== n.components[0])
                    return;
                const r = e.get(Et)
                  , o = e.get(FC);
                1 === e.get(Ph) && r.initialNavigation(),
                e.get(LC, null, R.Optional)?.setUpPreloading(),
                e.get(xh, null, R.Optional)?.init(),
                r.resetRootComponentType(n.componentTypes[0]),
                o.closed || (o.next(),
                o.unsubscribe())
            }
        }
        const FC = new $(vi ? "bootstrap done indicator" : "",{
            factory: ()=>new It
        })
          , Ph = new $(vi ? "initial navigation" : "",{
            providedIn: "root",
            factory: ()=>1
        });
        function JA() {
            let e = [];
            return e = vi ? [{
                provide: rl,
                multi: !0,
                useFactory: ()=>{
                    const t = J(Et);
                    return ()=>t.events.subscribe(n=>{
                        console.group?.(`Router Event: ${n.constructor.name}`),
                        console.log(function MT(e) {
                            if (!("type"in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                            switch (e.type) {
                            case 14:
                                return `ActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                            case 13:
                                return `ActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                            case 12:
                                return `ChildActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                            case 11:
                                return `ChildActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                            case 8:
                                return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                            case 7:
                                return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                            case 2:
                                return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                            case 16:
                                return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                            case 1:
                                return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                            case 3:
                                return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                            case 0:
                                return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                            case 6:
                                return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                            case 5:
                                return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                            case 10:
                                return `RouteConfigLoadEnd(path: ${e.route.path})`;
                            case 9:
                                return `RouteConfigLoadStart(path: ${e.route.path})`;
                            case 4:
                                return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                            case 15:
                                return `Scroll(anchor: '${e.anchor}', position: '${e.position ? `${e.position[0]}, ${e.position[1]}` : null}')`
                            }
                        }(n)),
                        console.log(n),
                        console.groupEnd?.()
                    }
                    )
                }
            }] : [],
            Or(1, e)
        }
        const LC = new $(vi ? "router preloader" : "");
        function e2(e) {
            return Or(0, [{
                provide: LC,
                useExisting: YA
            }, {
                provide: AC,
                useExisting: e
            }])
        }
        const Xs = !1
          , BC = new $(Xs ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD")
          , t2 = [xf, {
            provide: js,
            useClass: eh
        }, Et, qs, {
            provide: gi,
            useFactory: function RC(e) {
                return e.routerState.root
            },
            deps: [Et]
        }, _h, Xs ? {
            provide: Eh,
            useValue: !0
        } : []];
        function n2() {
            return new mv("Router",Et)
        }
        let $C = (()=>{
            class e {
                constructor(n) {}
                static forRoot(n, r) {
                    return {
                        ngModule: e,
                        providers: [t2, Xs && r?.enableTracing ? JA().\u0275providers : [], {
                            provide: wi,
                            multi: !0,
                            useValue: n
                        }, {
                            provide: BC,
                            useFactory: s2,
                            deps: [[Et, new os, new is]]
                        }, {
                            provide: wc,
                            useValue: r || {}
                        }, r?.useHash ? {
                            provide: so,
                            useClass: Z1
                        } : {
                            provide: so,
                            useClass: $v
                        }, {
                            provide: xh,
                            useFactory: ()=>{
                                const e = J(yI)
                                  , t = J(Se)
                                  , n = J(wc)
                                  , r = J(yc)
                                  , o = J(js);
                                return n.scrollOffset && e.setOffset(n.scrollOffset),
                                new kC(o,r,e,t,n)
                            }
                        }, r?.preloadingStrategy ? e2(r.preloadingStrategy).\u0275providers : [], {
                            provide: mv,
                            multi: !0,
                            useFactory: n2
                        }, r?.initialNavigation ? a2(r) : [], [{
                            provide: jC,
                            useFactory: NC
                        }, {
                            provide: lv,
                            multi: !0,
                            useExisting: jC
                        }]]
                    }
                }
                static forChild(n) {
                    return {
                        ngModule: e,
                        providers: [{
                            provide: wi,
                            multi: !0,
                            useValue: n
                        }]
                    }
                }
            }
            return e.\u0275fac = function(n) {
                return new (n || e)(T(BC, 8))
            }
            ,
            e.\u0275mod = zn({
                type: e
            }),
            e.\u0275inj = _n({
                imports: [gh]
            }),
            e
        }
        )();
        function s2(e) {
            if (Xs && e)
                throw new E(4007,"The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.");
            return "guarded"
        }
        function a2(e) {
            return ["disabled" === e.initialNavigation ? Or(3, [{
                provide: Il,
                multi: !0,
                useFactory: ()=>{
                    const t = J(Et);
                    return ()=>{
                        t.setUpLocationChangeListener()
                    }
                }
            }, {
                provide: Ph,
                useValue: 2
            }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? Or(2, [{
                provide: Ph,
                useValue: 0
            }, {
                provide: Il,
                multi: !0,
                deps: [In],
                useFactory: t=>{
                    const n = t.get(W1, Promise.resolve());
                    return ()=>n.then(()=>new Promise(r=>{
                        const o = t.get(Et)
                          , i = t.get(FC);
                        (function ZA(e, t) {
                            e.events.pipe(xr(n=>n instanceof uo || n instanceof sc || n instanceof ah || n instanceof ac), Q(n=>n instanceof uo || n instanceof ac ? jt.COMPLETE : n instanceof sc && (0 === n.code || 1 === n.code) ? jt.REDIRECTING : jt.FAILED), xr(n=>n !== jt.REDIRECTING), Ls(1)).subscribe(()=>{
                                t()
                            }
                            )
                        }
                        )(o, ()=>{
                            r(!0)
                        }
                        ),
                        t.get(yc).afterPreactivation = ()=>(r(!0),
                        i.closed ? F(void 0) : i),
                        o.initialNavigation()
                    }
                    ))
                }
            }]).\u0275providers : []]
        }
        const jC = new $(Xs ? "Router Initializer" : "");
        var c2 = tn(226)
          , Ci = tn.n(c2);
        class Js {
            constructor() {}
            ngOnInit() {
                var t = [{
                    descripcion: "Ganaste RD$50 de descuento",
                    code: "POWER50",
                    score: [1, 10]
                }, {
                    descripcion: "Ganaste RD$75 de descuento",
                    code: "75POWER",
                    score: [11, 20]
                }, {
                    descripcion: "Ganaste 1 Cerveza Gratis",
                    code: "FRIAGRATIS",
                    score: [21, 40]
                }, {
                    descripcion: "Ganaste 15% de descuento",
                    code: "DOMI15",
                    score: [41, 50]
                }, {
                    descripcion: "Ganaste 150 de descuento",
                    code: "DOMI150",
                    score: [51, 60]
                }, {
                    descripcion: "Ganaste 2 Cerveza Gratis",
                    code: "FRIASDOMI",
                    score: [61, 70]
                }]
                  , r = (document.querySelector(".game"),
                document.querySelector(".basket"))
                  , o = document.querySelector(".beers")
                  , i = parseInt(window.getComputedStyle(r).getPropertyValue("left"))
                  , s = parseInt(window.getComputedStyle(r).getPropertyValue("bottom"))
                  , a = window.innerWidth
                  , l = window.innerHeight
                  , u = document.getElementById("score")
                  , f = 1
                  , p = 0
                  , g = 0
                  , y = 0
                  , w = [["/assets/img/platano.png", 1], ["/assets/img/frito.png", 1], ["/assets/img/presidente.png", 2]]
                  , C = [["/assets/img/bomb.png", "-6px", "-57px", "5rem"], ["/assets/img/bomb.png", "-6px", "-57px", "5rem"]]
                  , v = document.getElementById("loader");
                console.log(v),
                v.style.display = "none";
                var M = 2;
                function P() {
                    let ge = document.getElementById("rapido");
                    ge.style.display = "block",
                    function D(ge, Vt, Tr) {
                        ge.style.opacity = 0;
                        var Di = (new Date).getTime()
                          , ir = setInterval(function() {
                            var Pt = (new Date).getTime() - Di;
                            Pt >= Vt ? (clearInterval(ir),
                            ge.style.opacity = 1,
                            Tr && Tr()) : ge.style.opacity = Pt / Vt
                        }, 10)
                    }(ge, 180, function() {
                        setTimeout(function() {
                            !function A(ge, Vt, Tr) {
                                ge.style.opacity = 1;
                                var Di = (new Date).getTime()
                                  , ir = setInterval(function() {
                                    var Pt = (new Date).getTime() - Di;
                                    Pt >= Vt ? (clearInterval(ir),
                                    ge.style.opacity = 0,
                                    Tr && Tr()) : ge.style.opacity = 1 - Pt / Vt
                                }, 10)
                            }(ge, 180, function() {
                                ge.style.display = "none"
                            })
                        }, 180)
                    })
                }
                function HC(ge) {
                    "ArrowLeft" == ge.key && function UC() {
                        i > 50 && (r.style.left = (i -= 25) + "px")
                    }(),
                    "ArrowRight" == ge.key && function d2() {
                        i < a / 1.22 && (r.style.left = (i += 25) + "px")
                    }()
                }
                function zC(ge) {
                    (i = ge.pageX) > 50 && i < a / 1.22 && (r.style.left = i + "px")
                }
                function GC(ge) {
                    (i = ge.changedTouches[0].pageX) > 50 && i < a / 1.22 && (r.style.left = i - 50 + "px")
                }
                function vc() {
                    var ge = Math.floor(Math.random() * C.length)
                      , Vt = Math.floor(Math.random() * C.length)
                      , Tr = Math.floor(181 * Math.random())
                      , Di = Math.random() < .5 ? -1 : 1
                      , ir = !1
                      , Pt = function _e(ge) {
                        return ge * l / 100
                    }(75)
                      , sr = Math.floor(Math.random() * (a / 1.44))
                      , mn = document.createElement("div")
                      , en = document.createElement("img");
                    if (en.style.position = "absolute",
                    mn.style.width = "30px",
                    mn.style.height = "30px",
                    mn.style.position = "absolute",
                    ge == Vt)
                        en.src = C[Vt][0],
                        en.style.left = C[Vt][1],
                        en.style.top = C[Vt][2],
                        en.style.maxWidth = C[Vt][3],
                        en.style.transform = "rotate(" + Tr * Di + "deg)",
                        ir = !0;
                    else {
                        let ar = Math.floor(Math.random() * w.length);
                        en.src = w[ar][0],
                        f = w[ar][1],
                        en.style.top = "-52px",
                        en.style.left = "-44px",
                        en.style.maxWidth = "7em",
                        en.style.transform = "rotate(" + Tr * Di + "deg)"
                    }
                    function qC() {
                        if (0 === M) {
                            let ar = t.findIndex(Mi=>y >= Mi.score[0] && y <= Mi.score[1]);
                            return document.removeEventListener("keydown", HC),
                            document.removeEventListener("mousemove", zC),
                            document.removeEventListener("touchmove", GC),
                            {
                                title: `<h3 style='font-size: 1.3rem !important; font-family: Monserrat !important; color: #6f4b98; text-transform: uppercase; font-weight: lighter;'>${t[ar].descripcion}</h3>`,
                                html: `<h3 style='font-size:2rem;font-family: Monserrat !important; font-weight:bold; color: #6f4b98; text-transform: uppercase; margin-bottom: 18px;'>${t[ar].code}</h3><h4 style='font-size:1rem;font-family: Monserrat !important; color: #6f4b98; text-transform: uppercase; margin-bottom: 18px;'>Tu puntaje es de: ${y}<h4>`,
                                imageUrl: "/assets/img/felicidades.png",
                                width: "23em",
                                imageAlt: "Custom image",
                                showCloseButton: !1,
                                allowOutsideClick: !1,
                                showConfirmButton: !1
                            }
                        }
                        return {
                            title: "<h3 style='font-size: 2.2rem !important; font-family: Bright !important; color: #6f4b98;'>\xa1Oh no!</h3>",
                            html: `<h3 style='font-size:0.9rem;font-family: Monserrat !important;'>Estuviste muy cerca de ganar contin\xfaa jugando para saber tu puntaje final <br><br> <b>Tienes ${1 != M ? M + " Vidas" : M + " Vida"}</b></h3>`,
                            width: "23em",
                            showCloseButton: !1,
                            allowOutsideClick: !1,
                            showConfirmButton: !0,
                            focusConfirm: !1,
                            confirmButtonText: "Continuar",
                            confirmButtonAriaLabel: "Thumbs up, great!",
                            confirmButtonColor: "#6f4b98"
                        }
                    }
                    mn.appendChild(en),
                    o.appendChild(mn);
                    var Cc = setInterval(function h2() {
                        if (Pt < s + 50 && Pt > s && sr > i - 30 && sr < i + 80 && 0 == ir && (o.removeChild(mn),
                        clearInterval(Cc),
                        u.textContent = "Puntuaci\xf3n: " + (y += f) + " - Vidas: " + M),
                        Pt < s && 0 == ir) {
                            o.removeChild(mn),
                            clearInterval(Cc),
                            clearTimeout(WC);
                            let ar = qC();
                            Ci().fire(ar).then(Mi=>{
                                Mi.isConfirmed && (u.textContent = "Puntuaci\xf3n: " + y + " - Vidas: " + (M -= 1),
                                v.style.display = "block",
                                v.style.opacity = "0",
                                setTimeout(()=>{
                                    v.style.opacity = "1"
                                }
                                , 1e3),
                                setTimeout(()=>{
                                    v.style.display = "none",
                                    vc()
                                }
                                , 4300))
                            }
                            ),
                            console.log(y)
                        }
                        if (Pt < s + 50 && Pt > s && sr > i - 30 && sr < i + 80 && 1 == ir) {
                            o.removeChild(mn),
                            clearInterval(Cc),
                            clearTimeout(WC);
                            let ar = qC();
                            Ci().fire(ar).then(Mi=>{
                                Mi.isConfirmed && (u.textContent = "Puntuaci\xf3n: " + y + " - Vidas: " + (M -= 1),
                                v.style.display = "block",
                                v.style.opacity = "0",
                                setTimeout(()=>{
                                    v.style.opacity = "1"
                                }
                                , 1e3),
                                setTimeout(()=>{
                                    v.style.display = "none",
                                    vc()
                                }
                                , 4300))
                            }
                            ),
                            console.log(y)
                        }
                        Pt < s && 1 == ir && (o.removeChild(mn),
                        clearInterval(Cc),
                        console.log(y)),
                        mn.style.bottom = (Pt -= 10) + "px",
                        mn.style.left = sr + "px"
                    }, function f2() {
                        return y >= 0 && y <= 10 ? g = p = 20 : y > 10 && y <= 20 ? (p = 16) < g && (P(),
                        g = p) : y > 20 && y <= 40 ? (p = 12) < g && (P(),
                        g = p) : y > 40 && y <= 60 ? (p = 9) < g && (P(),
                        g = p) : (p = 7) < g && (P(),
                        g = p),
                        p
                    }())
                      , WC = setTimeout(vc, 2e3)
                }
                document.addEventListener("keydown", HC),
                document.addEventListener("mousemove", zC),
                document.addEventListener("touchmove", GC, !1),
                Ci().fire({
                    imageUrl: "/assets/img/instrucciones.png",
                    background: "#fff",
                    width: "23em",
                    imageAlt: "instrucciones",
                    showCloseButton: !1,
                    allowOutsideClick: !1,
                    showConfirmButton: !0,
                    focusConfirm: !1,
                    confirmButtonText: "<h3 style='font-family: Monserrat !important;'>\xa1Jugar!<h3>",
                    confirmButtonAriaLabel: "\xa1Jugar!",
                    confirmButtonColor: "#6f4b98"
                }).then(ge=>{
                    ge.isConfirmed && (y = 0,
                    M = 2,
                    v.style.display = "block",
                    v.style.opacity = "0",
                    setTimeout(()=>{
                        v.style.opacity = "1"
                    }
                    , 1e3),
                    setTimeout(()=>{
                        v.style.display = "none",
                        vc()
                    }
                    , 4300))
                }
                )
            }
        }
        Js.\u0275fac = function(t) {
            return new (t || Js)
        }
        ,
        Js.\u0275cmp = xn({
            type: Js,
            selectors: [["app-catching-game"]],
            decls: 46,
            vars: 0,
            consts: [["id", "rapido", 1, "encima", "rounded-lg", 2, "display", "none"], [1, "text-[#6f4b98]", "text-2xl", "uppercase", "tracking-widest", "font-bold"], [1, "z-0", "countdown", "box"], [1, "box-inner"], [1, "container", "text-center", 2, "margin-top", "1rem"], ["align", "center", 1, "titulos"], ["src", "/assets/img/platano_titulo.png", "alt", "logo", 1, "mt-2", "w-[60%]", "h-auto"], ["id", "score", 1, "text-[#6f4b98]", "text-2xl", "uppercase", "tracking-widest", "font-bold", 2, "font-family", "Montserrat", "font-size", "14px"], ["score", ""], [1, "game", "border-cyan-50"], ["game", ""], [1, "beers"], ["beers", ""], [1, "danger-line"], ["dangerLine", ""], [1, "basket"], ["basket", ""], ["src", "/assets/img/sombrero.png", "alt", "sombrero", 2, "max-width", "7em", "height", "auto", "position", "absolute", "left", "-12px", "top", "-41px"], ["id", "loader", 1, "demo"], ["loader", ""], [1, "demo__colored-blocks"], [1, "demo__colored-blocks-rotater"], [1, "demo__colored-block"], [1, "demo__colored-blocks-inner"], [1, "demo__text"], [1, "demo__inner"], ["viewBox", "0 0 100 100", 1, "demo__numbers"], ["d", "M40,28 55,22 55,78", 1, "demo__num-path-1"], ["d", "M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10", 1, "demo__num-join-1-2"], ["d", "M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7", 1, "demo__num-path-2"], ["d", "M28,69 Q25,44 34.4,27.4", 1, "demo__num-join-2-3"], ["d", "M30,20 60,20 40,50 a18,15 0 1,1 -12,19", 1, "demo__num-path-3"], ["d", "M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 \n                                   Q25,44 34.4,27.4\n                                   l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 \n                                   a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 \n                                   l0,-61 L40,28", 1, "demo__numbers-path"], [2, "visibility", "hidden"], ["src", "/assets/img/bomb.png", "alt", ""], ["src", "/assets/img/platano.png", "alt", ""], ["src", "/assets/img/frito.png", "alt", ""], ["src", "/assets/img/felicidades.png", "alt", ""], ["src", "/assets/img/instrucciones.png", "alt", ""], ["src", "/assets/img/presidente.png", "alt", ""]],
            template: function(t, n) {
                1 & t && (Me(0, "div", 0)(1, "h3", 1),
                no(2, " \xa1M\xe1s R\xe1pido! "),
                Je()(),
                Me(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5),
                Le(7, "img", 6),
                Me(8, "h2", 7, 8),
                no(10, " Puntuaci\xf3n: 0 - Vidas: 2 "),
                Je()(),
                Me(11, "div", 9, 10),
                Le(13, "div", 11, 12)(15, "div", 13, 14),
                Me(17, "div", 15, 16),
                Le(19, "img", 17),
                Je()(),
                Me(20, "div", 18, 19)(22, "div", 20)(23, "div", 21),
                Le(24, "div", 22)(25, "div", 22)(26, "div", 22),
                Je(),
                Le(27, "div", 23),
                Me(28, "div", 24),
                no(29, "\xa1Comienza!"),
                Je()(),
                Me(30, "div", 25),
                function bp() {
                    H.lFrame.currentNamespace = ip
                }(),
                Me(31, "svg", 26)(32, "defs"),
                Le(33, "path", 27)(34, "path", 28)(35, "path", 29)(36, "path", 30)(37, "path", 31),
                Je(),
                Le(38, "path", 32),
                Je()()()()(),
                function _p() {
                    !function wb() {
                        H.lFrame.currentNamespace = null
                    }()
                }(),
                Me(39, "div", 33),
                Le(40, "img", 34)(41, "img", 35)(42, "img", 36)(43, "img", 37)(44, "img", 38)(45, "img", 39),
                Je()())
            },
            styles: ['@import"https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@700&display=swap";.timer[_ngcontent-%COMP%]{text-align:center;font-family:Arial,sans-serif;font-size:1.4em;letter-spacing:-1px}.timer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:2em;margin:0 3px 0 15px}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}@font-face{font-family:Bright;src:local("Bright"),url(/assets/fonts/Bright.ttf) format("truetype")}@font-face{font-family:Monserrat;src:local("Monserrat"),url(/assets/fonts/Montserrat.ttf) format("truetype")}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:Red Hat Text,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container[_ngcontent-%COMP%]{width:100%;margin-right:auto;margin-left:auto;padding-right:1rem;padding-left:1rem}@media (min-width: 640px){.container[_ngcontent-%COMP%]{max-width:640px;padding-right:2rem;padding-left:2rem}}@media (min-width: 768px){.container[_ngcontent-%COMP%]{max-width:768px}}@media (min-width: 1024px){.container[_ngcontent-%COMP%]{max-width:1024px;padding-right:4rem;padding-left:4rem}}@media (min-width: 1280px){.container[_ngcontent-%COMP%]{max-width:1280px;padding-right:5rem;padding-left:5rem}}@media (min-width: 1536px){.container[_ngcontent-%COMP%]{max-width:1536px;padding-right:10rem;padding-left:10rem}}.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.-left-2[_ngcontent-%COMP%]{left:-.5rem}.-right-2[_ngcontent-%COMP%]{right:-.5rem}.left-0[_ngcontent-%COMP%]{left:0}.right-0[_ngcontent-%COMP%]{right:0}.bottom-0[_ngcontent-%COMP%]{bottom:0}.left-\\__ph-0__[_ngcontent-%COMP%]{left:50%}.bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:8%}.mt-32[_ngcontent-%COMP%]{margin-top:8rem}.mt-16[_ngcontent-%COMP%]{margin-top:4rem}.mt-5[_ngcontent-%COMP%]{margin-top:1.25rem}.flex[_ngcontent-%COMP%]{display:flex}.h-20[_ngcontent-%COMP%]{height:4rem}.h-3[_ngcontent-%COMP%]{height:.75rem}.h-40[_ngcontent-%COMP%]{height:10rem}.w-20[_ngcontent-%COMP%]{width:4rem}.w-3[_ngcontent-%COMP%]{width:.75rem}.w-full[_ngcontent-%COMP%]{width:100%}.translate-x-\\__ph-0__[_ngcontent-%COMP%]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-3[_ngcontent-%COMP%]{gap:.75rem}.gap-x-10[_ngcontent-%COMP%]{column-gap:2.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.bg-secondaryDark[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:#8650e0}.bg-veryDarkBlue[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:hsl(234 17% 12% / var(--tw-bg-opacity))}.text-center[_ngcontent-%COMP%]{text-align:center}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-3xl[_ngcontent-%COMP%]{font-size:3.875rem;line-height:2.25rem;margin-top:10px}.text-xs[_ngcontent-%COMP%]{font-size:1.2rem;line-height:1rem}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.tracking-widest[_ngcontent-%COMP%]{letter-spacing:.1em}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-primary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:#ffb200}.text-secondary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:hsl(237 18% 59% / var(--tw-text-opacity))}.shadow-xl[_ngcontent-%COMP%]{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.transition-all[_ngcontent-%COMP%]{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300[_ngcontent-%COMP%]{transition-duration:.3s}.hover\\:text-primary[_ngcontent-%COMP%]:hover{--tw-text-opacity: 1;color:hsl(345 95% 68% / var(--tw-text-opacity))}@media (min-width: 640px){.sm\\:text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-sm[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.25rem}}@media (min-width: 768px){.md\\:h-32[_ngcontent-%COMP%]{height:8rem}.md\\:w-32[_ngcontent-%COMP%]{width:8rem}.md\\:gap-8[_ngcontent-%COMP%]{gap:2rem}.md\\:text-6xl[_ngcontent-%COMP%]{font-size:3.75rem;line-height:1}}@media (min-width: 1024px){.lg\\:h-40[_ngcontent-%COMP%]{height:10rem}.lg\\:w-40[_ngcontent-%COMP%]{width:10rem}.lg\\:text-7xl[_ngcontent-%COMP%]{font-size:4.5rem;line-height:1}.lg\\:text-lg[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:10%}.xl\\:h-52[_ngcontent-%COMP%]{height:13rem}}.countdown[_ngcontent-%COMP%]{position:absolute;inset:0;font-family:Bright;background-image:url(/assets/img/platano_bg.png);background-repeat:no-repeat;background-size:cover;overflow:hidden;background-position-x:center}.image_center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;height:8rem;margin-bottom:14px}.box[_ngcontent-%COMP%]{width:100%;padding:5px}.box[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;top:5px;text-align:center}.box[_ngcontent-%COMP%]:before{left:5px}.box[_ngcontent-%COMP%]:after{right:5px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]{position:relative;border:2px solid #b78846;height:-webkit-fill-available}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;bottom:-2px;text-align:center}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before{left:-2px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{right:-2px}#myVideo[_ngcontent-%COMP%]{position:fixed;height:100vh;width:100vw;background-size:cover;overflow:hidden;object-fit:cover}.content[_ngcontent-%COMP%]{position:absolute;top:63vh;color:#f1f1f1;width:100%;padding:20px;right:0;bottom:0;left:0;font-family:Bright}.game[_ngcontent-%COMP%]{height:75vh;width:89vw;position:relative}.danger-line[_ngcontent-%COMP%]{width:100%;height:5px;position:absolute;bottom:0}.basket[_ngcontent-%COMP%]{width:80px;height:50px;position:absolute;bottom:15px;left:calc(50% - 25px)}.simpleBeer[_ngcontent-%COMP%]{width:30px;height:30px;position:absolute}.swal2-popup[_ngcontent-%COMP%]{font-family:Bright!important}.demo[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;width:100%;height:140px;margin-top:-70px;padding:10px;border-radius:20px;transform:translate(-50%)}.demo__colored-blocks[_ngcontent-%COMP%]{overflow:hidden;position:absolute;left:50%;top:0;width:314px;height:100%;margin-left:-158px;padding:10px;border-radius:20px;perspective:1000px;animation:_ngcontent-%COMP%_demoAnim 4s ease-in-out infinite,contAnim 4s infinite}.demo__colored-blocks-rotater[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:inherit;animation:_ngcontent-%COMP%_rotation 1.3s linear infinite}.demo__colored-blocks-inner[_ngcontent-%COMP%]{overflow:hidden;position:relative;height:100%;background:#5e2880;border-radius:inherit}.demo__colored-block[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;width:300%;height:300%;transform-origin:0 0}.demo__colored-block[_ngcontent-%COMP%]:nth-child(1){transform:rotate(0) skew(-30deg);background-color:#ffd466}.demo__colored-block[_ngcontent-%COMP%]:nth-child(2){transform:rotate(120deg) skew(-30deg);background-color:#f9b200}.demo__colored-block[_ngcontent-%COMP%]:nth-child(3){transform:rotate(240deg) skew(-30deg);background-color:#f28e00}.demo__inner[_ngcontent-%COMP%]{overflow:hidden;position:relative;width:100%;height:100%}.demo__numbers[_ngcontent-%COMP%]{overflow:visible;position:absolute;left:50%;top:50%;width:100px;height:100px;margin-left:-50px;margin-top:-50px}.demo__numbers-path[_ngcontent-%COMP%]{fill:none;stroke-width:10px;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0,518.055065155;stroke-dashoffset:0;animation:_ngcontent-%COMP%_numAnim 4s ease-in-out infinite;opacity:0}.demo__text[_ngcontent-%COMP%]{position:absolute;left:50%;top:0;width:314px;height:100%;margin-left:-158px;text-align:center;line-height:140px;font-size:1.2em;color:#fff;text-transform:uppercase;letter-spacing:15px;transform:translate(10px);animation:_ngcontent-%COMP%_hideText 4s infinite}@keyframes _ngcontent-%COMP%_contAnim{15%,to{margin-left:-158px;width:314px}25%,90%{margin-left:-70px;width:140px}}@keyframes _ngcontent-%COMP%_numAnim{15%{stroke-dasharray:0,518.055065155;stroke-dashoffset:0;opacity:0}25%,41%{opacity:1;stroke-dasharray:144.4256591797,518.055065155;stroke-dashoffset:-40}53%,66%{stroke-dasharray:136.0216217041,518.055065155;stroke-dashoffset:-227.238697052}76%{stroke-dasharray:113.4751205444,518.055065155;stroke-dashoffset:-445.8995704651}88%,to{stroke-dasharray:72.1554946899,518.055065155;stroke-dashoffset:-445.8995704651}92%{opacity:1}to{opacity:0}}@keyframes _ngcontent-%COMP%_rotation{to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_demoAnim{15%{border-radius:20px;transform:rotate(0)}30%,43%{border-radius:50%;transform:rotate(360deg)}52%,65%{border-radius:0;transform:rotate(720deg)}78%,90%{border-radius:50%;transform:rotate(1080deg)}to{border-radius:20px;transform:rotate(1440deg)}}@keyframes _ngcontent-%COMP%_hideText{15%,to{opacity:1}20%,96%{opacity:0}}.imgButton[_ngcontent-%COMP%]{margin-top:12vh;background-image:url(/assets/img/boton.png);background-size:cover;background-repeat:no-repeat;height:57px}.encima[_ngcontent-%COMP%]{position:absolute;z-index:9999;top:50vh;left:25vw;color:#fff;padding:10px}', ".swal2-popup[_ngcontent-%COMP%] {\n    font-family: Bright !important;\n  }"]
        });
        class ea {
            constructor(t) {
                this.router = t,
                this.showInstructions = !0
            }
            reverseInstruction() {
                this.showInstructions = !1
            }
            setStart() {
                this.router.navigateByUrl("catching/game")
            }
            ngOnInit() {}
        }
        ea.\u0275fac = function(t) {
            return new (t || ea)(B(Et))
        }
        ,
        ea.\u0275cmp = xn({
            type: ea,
            selectors: [["app-catching"]],
            decls: 10,
            vars: 0,
            consts: [[1, "countdown", "box"], [1, "box-inner"], [1, "container", "text-center", 2, "margin-top", "1rem"], [1, "start"], ["align", "center", 1, "titulos"], ["src", "/assets/img/score.jpg", "alt", "logo", 1, "rounded-lg", "mt-3"], ["src", "/assets/img/platano_titulo.png", "alt", "logo", 1, "mt-[1vh]"], [1, "imgButton", "animate-bounce", "w-[60%]", 3, "click"], ["src", "/assets/img/sombrero_cervezas.png", "alt", "sombrero", 1, "mt-[6vh]", 2, "width", "130%"]],
            template: function(t, n) {
                1 & t && (Me(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4),
                Le(5, "img", 5)(6, "img", 6),
                Me(7, "div")(8, "button", 7),
                vs("click", function() {
                    return n.setStart()
                }),
                Je(),
                Le(9, "img", 8),
                Je()()()()()())
            },
            styles: ['@import"https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@700&display=swap";.timer[_ngcontent-%COMP%]{text-align:center;font-family:Arial,sans-serif;font-size:1.4em;letter-spacing:-1px}.timer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:2em;margin:0 3px 0 15px}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}@font-face{font-family:Bright;src:local("Bright"),url(/assets/fonts/Bright.ttf) format("truetype")}@font-face{font-family:Monserrat;src:local("Monserrat"),url(/assets/fonts/Montserrat.ttf) format("truetype")}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:Red Hat Text,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container[_ngcontent-%COMP%]{width:100%;margin-right:auto;margin-left:auto;padding-right:1rem;padding-left:1rem}@media (min-width: 640px){.container[_ngcontent-%COMP%]{max-width:640px;padding-right:2rem;padding-left:2rem}}@media (min-width: 768px){.container[_ngcontent-%COMP%]{max-width:768px}}@media (min-width: 1024px){.container[_ngcontent-%COMP%]{max-width:1024px;padding-right:4rem;padding-left:4rem}}@media (min-width: 1280px){.container[_ngcontent-%COMP%]{max-width:1280px;padding-right:5rem;padding-left:5rem}}@media (min-width: 1536px){.container[_ngcontent-%COMP%]{max-width:1536px;padding-right:10rem;padding-left:10rem}}.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.-left-2[_ngcontent-%COMP%]{left:-.5rem}.-right-2[_ngcontent-%COMP%]{right:-.5rem}.left-0[_ngcontent-%COMP%]{left:0}.right-0[_ngcontent-%COMP%]{right:0}.bottom-0[_ngcontent-%COMP%]{bottom:0}.left-\\__ph-0__[_ngcontent-%COMP%]{left:50%}.bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:8%}.mt-32[_ngcontent-%COMP%]{margin-top:8rem}.mt-16[_ngcontent-%COMP%]{margin-top:4rem}.mt-5[_ngcontent-%COMP%]{margin-top:1.25rem}.flex[_ngcontent-%COMP%]{display:flex}.h-20[_ngcontent-%COMP%]{height:4rem}.h-3[_ngcontent-%COMP%]{height:.75rem}.h-40[_ngcontent-%COMP%]{height:10rem}.w-20[_ngcontent-%COMP%]{width:4rem}.w-3[_ngcontent-%COMP%]{width:.75rem}.w-full[_ngcontent-%COMP%]{width:100%}.translate-x-\\__ph-0__[_ngcontent-%COMP%]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-3[_ngcontent-%COMP%]{gap:.75rem}.gap-x-10[_ngcontent-%COMP%]{column-gap:2.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.bg-secondaryDark[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:#8650e0}.bg-veryDarkBlue[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:hsl(234 17% 12% / var(--tw-bg-opacity))}.text-center[_ngcontent-%COMP%]{text-align:center}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-3xl[_ngcontent-%COMP%]{font-size:3.875rem;line-height:2.25rem;margin-top:10px}.text-xs[_ngcontent-%COMP%]{font-size:1.2rem;line-height:1rem}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.tracking-widest[_ngcontent-%COMP%]{letter-spacing:.1em}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-primary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:#ffb200}.text-secondary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:hsl(237 18% 59% / var(--tw-text-opacity))}.shadow-xl[_ngcontent-%COMP%]{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.transition-all[_ngcontent-%COMP%]{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300[_ngcontent-%COMP%]{transition-duration:.3s}.hover\\:text-primary[_ngcontent-%COMP%]:hover{--tw-text-opacity: 1;color:hsl(345 95% 68% / var(--tw-text-opacity))}@media (min-width: 640px){.sm\\:text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-sm[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.25rem}}@media (min-width: 768px){.md\\:h-32[_ngcontent-%COMP%]{height:8rem}.md\\:w-32[_ngcontent-%COMP%]{width:8rem}.md\\:gap-8[_ngcontent-%COMP%]{gap:2rem}.md\\:text-6xl[_ngcontent-%COMP%]{font-size:3.75rem;line-height:1}}@media (min-width: 1024px){.lg\\:h-40[_ngcontent-%COMP%]{height:10rem}.lg\\:w-40[_ngcontent-%COMP%]{width:10rem}.lg\\:text-7xl[_ngcontent-%COMP%]{font-size:4.5rem;line-height:1}.lg\\:text-lg[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:10%}.xl\\:h-52[_ngcontent-%COMP%]{height:13rem}}.countdown[_ngcontent-%COMP%]{position:absolute;inset:0;font-family:Bright;background-image:url(/assets/img/catching_bg_2.png);background-color:#fff;background-repeat:no-repeat;background-size:cover;overflow:hidden;background-position-x:center}.image_center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;height:8rem;margin-bottom:14px}.box[_ngcontent-%COMP%]{width:100%;padding:5px}.box[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;top:5px;text-align:center}.box[_ngcontent-%COMP%]:before{left:5px}.box[_ngcontent-%COMP%]:after{right:5px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]{position:relative;border:2px solid #b78846;height:-webkit-fill-available}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;bottom:-2px;text-align:center}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before{left:-2px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{right:-2px}#myVideo[_ngcontent-%COMP%]{position:fixed;height:100vh;width:100vw;background-size:cover;overflow:hidden;object-fit:cover}.content[_ngcontent-%COMP%]{position:absolute;top:63vh;color:#f1f1f1;width:100%;padding:20px;right:0;bottom:0;left:0;font-family:Bright}.game[_ngcontent-%COMP%]{height:75vh;width:89vw;position:relative}.danger-line[_ngcontent-%COMP%]{width:100%;height:5px;position:absolute;bottom:0}.basket[_ngcontent-%COMP%]{width:80px;height:50px;position:absolute;bottom:15px;left:calc(50% - 25px)}.simpleBeer[_ngcontent-%COMP%]{width:30px;height:30px;position:absolute}.swal2-popup[_ngcontent-%COMP%]{font-family:Bright!important}.demo[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;width:100%;height:140px;margin-top:-70px;padding:10px;border-radius:20px;transform:translate(-50%)}.demo__colored-blocks[_ngcontent-%COMP%]{overflow:hidden;position:absolute;left:50%;top:0;width:314px;height:100%;margin-left:-158px;padding:10px;border-radius:20px;perspective:1000px;animation:_ngcontent-%COMP%_demoAnim 4s ease-in-out infinite,contAnim 4s infinite}.demo__colored-blocks-rotater[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;border-radius:inherit;animation:_ngcontent-%COMP%_rotation 1.3s linear infinite}.demo__colored-blocks-inner[_ngcontent-%COMP%]{overflow:hidden;position:relative;height:100%;background:#5e2880;border-radius:inherit}.demo__colored-block[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;width:300%;height:300%;transform-origin:0 0}.demo__colored-block[_ngcontent-%COMP%]:nth-child(1){transform:rotate(0) skew(-30deg);background-color:#ffd466}.demo__colored-block[_ngcontent-%COMP%]:nth-child(2){transform:rotate(120deg) skew(-30deg);background-color:#f9b200}.demo__colored-block[_ngcontent-%COMP%]:nth-child(3){transform:rotate(240deg) skew(-30deg);background-color:#f28e00}.demo__inner[_ngcontent-%COMP%]{overflow:hidden;position:relative;width:100%;height:100%}.demo__numbers[_ngcontent-%COMP%]{overflow:visible;position:absolute;left:50%;top:50%;width:100px;height:100px;margin-left:-50px;margin-top:-50px}.demo__numbers-path[_ngcontent-%COMP%]{fill:none;stroke-width:10px;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:0,518.055065155;stroke-dashoffset:0;animation:_ngcontent-%COMP%_numAnim 4s ease-in-out infinite;opacity:0}.demo__text[_ngcontent-%COMP%]{position:absolute;left:50%;top:0;width:314px;height:100%;margin-left:-158px;text-align:center;line-height:140px;font-size:1.2em;color:#fff;text-transform:uppercase;letter-spacing:15px;transform:translate(10px);animation:_ngcontent-%COMP%_hideText 4s infinite}@keyframes _ngcontent-%COMP%_contAnim{15%,to{margin-left:-158px;width:314px}25%,90%{margin-left:-70px;width:140px}}@keyframes _ngcontent-%COMP%_numAnim{15%{stroke-dasharray:0,518.055065155;stroke-dashoffset:0;opacity:0}25%,41%{opacity:1;stroke-dasharray:144.4256591797,518.055065155;stroke-dashoffset:-40}53%,66%{stroke-dasharray:136.0216217041,518.055065155;stroke-dashoffset:-227.238697052}76%{stroke-dasharray:113.4751205444,518.055065155;stroke-dashoffset:-445.8995704651}88%,to{stroke-dasharray:72.1554946899,518.055065155;stroke-dashoffset:-445.8995704651}92%{opacity:1}to{opacity:0}}@keyframes _ngcontent-%COMP%_rotation{to{transform:rotate(360deg)}}@keyframes _ngcontent-%COMP%_demoAnim{15%{border-radius:20px;transform:rotate(0)}30%,43%{border-radius:50%;transform:rotate(360deg)}52%,65%{border-radius:0;transform:rotate(720deg)}78%,90%{border-radius:50%;transform:rotate(1080deg)}to{border-radius:20px;transform:rotate(1440deg)}}@keyframes _ngcontent-%COMP%_hideText{15%,to{opacity:1}20%,96%{opacity:0}}.imgButton[_ngcontent-%COMP%]{margin-top:12vh;background-image:url(/assets/img/boton.png);background-size:cover;background-repeat:no-repeat;height:57px}']
        });
        const VC = {
            1: "FRIASREGALO <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>2 Cervezas Gratis</span>",
            2: "20TADA <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>20% de Descuento</span>",
            3: "TADAX2 <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>RD$100 OFF en tus pr\xf3ximas 2 ordenes</span>",
            4: "TADA50 <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>RD$50 OFF</span>",
            5: "RULETA10 <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>10% De Descuento</span>",
            6: "FRIAS20 <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>20% de Descuento</span>",
            7: "JUMBO <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>1 JUMBO GRATIS</span>",
            8: "MAGIA150 <br> <span style='font-size:0.9rem;font-family: Monserrat !important;'>RD$150 OFF en tu pr\xf3xima orden</span>"
        };
        class ta {
            constructor() {}
            ngOnInit() {
                const t = document.querySelector(".wheel")
                  , n = document.querySelector(".button");
                let r = 0;
                n?.addEventListener("click", ()=>{
                    n.style.pointerEvents = "none",
                    r = Math.floor(3e3 + 3e3 * Math.random()),
                    t.style.transition = "all 5s ease-out",
                    t.style.transform = `rotate(${r}deg)`,
                    t.classList.add("blur")
                }
                ),
                t.addEventListener("transitionend", ()=>{
                    t.classList.remove("blur"),
                    t.style.transition = "none";
                    const s = r % 360;
                    t.style.transform = `rotate(${s}deg)`,
                    setTimeout(()=>{
                        (s=>{
                            const a = Math.ceil(s / 45);
                            Ci().fire({
                                title: `<h3 style='font-size: 2.2rem !important; font-family: Bright !important; color: #270a45;'>${6 != a ? "\xa1Felicidades, ganaste!" : VC[a]}</h3>`,
                                imageUrl: "/assets/img/logo_tada.png",
                                width: "21em",
                                imageWidth: "12rem",
                                imageHeight: "5rem",
                                imageAlt: "Custom image",
                                html: 6 != a ? `<h3 style='font-size:0.9rem;font-family: Monserrat !important;'>Tu cup\xf3n de regalo es: </h2><br><h3 style='font-family: Bright !important;font-size: 2.6rem;color: #270a45;'>\n              ${VC[a]} \n              </h3>` : "",
                                showCloseButton: !1,
                                showConfirmButton: !1,
                                allowOutsideClick: !1
                            })
                        }
                        )(s)
                    }
                    , 1e3)
                }
                )
            }
        }
        ta.\u0275fac = function(t) {
            return new (t || ta)
        }
        ,
        ta.\u0275cmp = xn({
            type: ta,
            selectors: [["app-roulette"]],
            decls: 10,
            vars: 0,
            consts: [[1, "countdown", "box"], [1, "box-inner"], [1, "container", "text-center", 2, "margin-top", "3.2rem"], ["src", "/assets/img/titulo_ruleta.png", 1, "image_center"], [1, "mt-10", "flex", "justify-center", "gap-3", "md:gap-8", 2, "margin-top", "3rem"], ["id", "app"], ["src", "/assets/img/marker.png", 1, "marker"], ["src", "/assets/img/wheel_edited_2.png", 1, "wheel"], ["type", "button", 1, "button", "button-85"]],
            template: function(t, n) {
                1 & t && (Me(0, "div", 0)(1, "div", 1)(2, "div", 2),
                Le(3, "img", 3),
                Me(4, "div", 4)(5, "div", 5),
                Le(6, "img", 6)(7, "img", 7),
                Me(8, "button", 8),
                no(9, " \xa1Gira la ruleta! "),
                Je()()()()()())
            },
            styles: ['@import"https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@700&display=swap";.timer[_ngcontent-%COMP%]{text-align:center;font-family:Arial,sans-serif;font-size:1.4em;letter-spacing:-1px}.timer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:2em;margin:0 3px 0 15px}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}@font-face{font-family:Bright;src:local("Bright"),url(/assets/fonts/Bright.ttf) format("truetype")}@font-face{font-family:Monserrat;src:local("Monserrat"),url(/assets/fonts/Montserrat.ttf) format("truetype")}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:Red Hat Text,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container[_ngcontent-%COMP%]{width:100%;margin-right:auto;margin-left:auto;padding-right:2rem;padding-left:2rem}@media (min-width: 640px){.container[_ngcontent-%COMP%]{max-width:640px;padding-right:2rem;padding-left:2rem}}@media (min-width: 768px){.container[_ngcontent-%COMP%]{max-width:768px}}@media (min-width: 1024px){.container[_ngcontent-%COMP%]{max-width:1024px;padding-right:4rem;padding-left:4rem}}@media (min-width: 1280px){.container[_ngcontent-%COMP%]{max-width:1280px;padding-right:5rem;padding-left:5rem}}@media (min-width: 1536px){.container[_ngcontent-%COMP%]{max-width:1536px;padding-right:10rem;padding-left:10rem}}.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.-left-2[_ngcontent-%COMP%]{left:-.5rem}.-right-2[_ngcontent-%COMP%]{right:-.5rem}.left-0[_ngcontent-%COMP%]{left:0}.right-0[_ngcontent-%COMP%]{right:0}.bottom-0[_ngcontent-%COMP%]{bottom:0}.left-\\__ph-0__[_ngcontent-%COMP%]{left:50%}.bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:8%}.mt-32[_ngcontent-%COMP%]{margin-top:8rem}.mt-16[_ngcontent-%COMP%]{margin-top:4rem}.mt-5[_ngcontent-%COMP%]{margin-top:1.25rem}.flex[_ngcontent-%COMP%]{display:flex}.h-20[_ngcontent-%COMP%]{height:4rem}.h-3[_ngcontent-%COMP%]{height:.75rem}.h-40[_ngcontent-%COMP%]{height:10rem}.w-20[_ngcontent-%COMP%]{width:4rem}.w-3[_ngcontent-%COMP%]{width:.75rem}.w-full[_ngcontent-%COMP%]{width:100%}.translate-x-\\__ph-0__[_ngcontent-%COMP%]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-3[_ngcontent-%COMP%]{gap:.75rem}.gap-x-10[_ngcontent-%COMP%]{column-gap:2.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.bg-secondaryDark[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:#8650e0}.bg-veryDarkBlue[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:hsl(234 17% 12% / var(--tw-bg-opacity))}.text-center[_ngcontent-%COMP%]{text-align:center}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-3xl[_ngcontent-%COMP%]{font-size:3.875rem;line-height:2.25rem;margin-top:10px}.text-xs[_ngcontent-%COMP%]{font-size:1.2rem;line-height:1rem}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.tracking-widest[_ngcontent-%COMP%]{letter-spacing:.1em}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-primary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:#ffb200}.text-secondary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:hsl(237 18% 59% / var(--tw-text-opacity))}.shadow-xl[_ngcontent-%COMP%]{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.transition-all[_ngcontent-%COMP%]{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300[_ngcontent-%COMP%]{transition-duration:.3s}.hover\\:text-primary[_ngcontent-%COMP%]:hover{--tw-text-opacity: 1;color:hsl(345 95% 68% / var(--tw-text-opacity))}@media (min-width: 640px){.sm\\:text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-sm[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.25rem}}@media (min-width: 768px){.md\\:h-32[_ngcontent-%COMP%]{height:8rem}.md\\:w-32[_ngcontent-%COMP%]{width:8rem}.md\\:gap-8[_ngcontent-%COMP%]{gap:2rem}.md\\:text-6xl[_ngcontent-%COMP%]{font-size:3.75rem;line-height:1}}@media (min-width: 1024px){.lg\\:h-40[_ngcontent-%COMP%]{height:10rem}.lg\\:w-40[_ngcontent-%COMP%]{width:10rem}.lg\\:text-7xl[_ngcontent-%COMP%]{font-size:4.5rem;line-height:1}.lg\\:text-lg[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:10%}.xl\\:h-52[_ngcontent-%COMP%]{height:13rem}}.countdown[_ngcontent-%COMP%]{position:absolute;inset:0;font-family:Bright;--tw-bg-opacity: 1;background-color:hsl(234 17% 12% / var(--tw-bg-opacity));background-image:url(/assets/img/fondo_ruleta.png);background-repeat:no-repeat;background-size:cover;overflow:hidden;background-position:center}.image_center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;margin-bottom:14px}.box[_ngcontent-%COMP%]{width:100%;padding:5px}.box[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;top:5px;text-align:center}.box[_ngcontent-%COMP%]:before{left:5px}.box[_ngcontent-%COMP%]:after{right:5px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]{position:relative;border:2px solid #b78846;height:-webkit-fill-available}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;bottom:-2px;text-align:center}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before{left:-2px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{right:-2px}#myVideo[_ngcontent-%COMP%]{position:fixed;height:100vh;width:100vw;background-size:cover;overflow:hidden;object-fit:cover}.content[_ngcontent-%COMP%]{position:absolute;top:63vh;color:#f1f1f1;width:100%;padding:20px;right:0;bottom:0;left:0;font-family:Bright}#app[_ngcontent-%COMP%]{width:auto;height:auto;margin:0 auto;position:relative}.display[_ngcontent-%COMP%]{color:#fff;display:flex;align-items:center;justify-content:center;width:200px;height:2.4rem;border:1px solid white;border-radius:20px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:1rem;margin:-10px auto 0}.marker[_ngcontent-%COMP%]{position:absolute;width:60px;left:8rem;top:-20px;z-index:2}.wheel[_ngcontent-%COMP%]{width:100%;height:auto}.button[_ngcontent-%COMP%]{display:block;width:200px;margin:40px auto;cursor:pointer}.button[_ngcontent-%COMP%]:hover{opacity:.8}.blur[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_blur 10s}@keyframes _ngcontent-%COMP%_blur{0%{filter:blur(1.5px)}80%{filter:blur(1.5px)}to{filter:blur(0px)}}.button-36[_ngcontent-%COMP%]{background-image:linear-gradient(92.88deg,#455eb5 9.16%,#5643cc 43.89%,#673fd7 64.72%);border-radius:8px;border-style:none;box-sizing:border-box;color:#fff;cursor:pointer;flex-shrink:0;font-size:16px;font-weight:500;height:4rem;padding:0 1.6rem;text-align:center;text-shadow:rgba(0,0,0,.25) 0 3px 8px;transition:all .5s;user-select:none;-webkit-user-select:none;touch-action:manipulation}.button-36[_ngcontent-%COMP%]:hover{box-shadow:#503fcd80 0 1px 30px;transition-duration:.1s}@media (min-width: 768px){.button-36[_ngcontent-%COMP%]{padding:0 2.6rem}}.button-85[_ngcontent-%COMP%]{padding:.6em 2em;border:none;outline:none;color:#fff;background:#462463;cursor:pointer;position:relative;z-index:0;border-radius:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation}.button-85[_ngcontent-%COMP%]:before{content:"";background:linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000);position:absolute;top:-2px;left:-2px;background-size:400%;z-index:-1;filter:blur(5px);-webkit-filter:blur(5px);width:calc(100% + 4px);height:calc(100% + 4px);animation:_ngcontent-%COMP%_glowing-button-85 20s linear infinite;transition:opacity .3s ease-in-out;border-radius:10px}@keyframes _ngcontent-%COMP%_glowing-button-85{0%{background-position:0 0}50%{background-position:400% 0}to{background-position:0 0}}.button-85[_ngcontent-%COMP%]:after{z-index:-1;content:"";position:absolute;width:100%;height:100%;background:#462463;left:0;top:0;border-radius:10px}']
        });
        class na {
            constructor() {
                this.doing = !1,
                this.lives = 3
            }
            ngOnInit() {}
            doSlot() {
                if (this.doing)
                    return null;
                document.getElementById("vidas"),
                this.doing = !0;
                var n = 7 * this.randomInt(1, 4)
                  , r = n + this.randomInt(1, 7)
                  , o = n + 14 + this.randomInt(1, 7)
                  , i = n + 28 + this.randomInt(1, 7)
                  , s = 0
                  , a = 0
                  , l = 0;
                const g = ()=>{
                    let M = document.getElementById("slot1").className
                      , D = document.getElementById("slot2").className
                      , ee = document.getElementById("slot3").className;
                    !(M == D && D == ee || M == D && "a7" == ee || M == ee && "a7" == D || D == ee && "a7" == M || M == D && "a7" == M || M == ee && "a7" == M || D == ee && "a7" == D) || M == D && D == ee && "a7" == M ? 0 != this.lives ? this.lives-- : Ci().fire({
                        title: "<h3 style='font-size: 2.2rem !important; font-family: Bright !important; color: #270a45;'>Lo sentimos</h3>",
                        imageUrl: "/assets/img/logo_tada.png",
                        width: "21em",
                        imageWidth: "12rem",
                        imageHeight: "5rem",
                        imageAlt: "Custom image",
                        html: "<h3 style='font-size:0.9rem;font-family: Monserrat !important;'>Tu cup\xf3n de regalo es: </h2><br><h3 style='font-family: Bright !important;font-size: 2.6rem;color: #270a45;'></h3>",
                        showCloseButton: !1,
                        showConfirmButton: !1,
                        allowOutsideClick: !1
                    }) : Ci().fire({
                        title: "<h3 style='font-size: 2.2rem !important; font-family: Bright !important; color: #270a45;'>\xa1Felicidades, ganaste!</h3>",
                        imageUrl: "/assets/img/logo_tada.png",
                        width: "21em",
                        imageWidth: "12rem",
                        imageHeight: "5rem",
                        imageAlt: "Custom image",
                        html: "<h3 style='font-size:0.9rem;font-family: Monserrat !important;'>Tu cup\xf3n de regalo es: </h2><br><h3 style='font-family: Bright !important;font-size: 2.6rem;color: #270a45;'></h3>",
                        showCloseButton: !1,
                        showConfirmButton: !1,
                        allowOutsideClick: !1
                    }),
                    this.doing = !1
                }
                ;
                var y = setInterval(()=>{
                    if (++s >= r)
                        return clearInterval(y),
                        null;
                    let v = document.getElementById("slot1");
                    "a7" == v.className && (v.className = "a0"),
                    v.className = "a" + (parseInt(v.className.substring(1)) + 1)
                }
                , 50)
                  , w = setInterval(()=>{
                    if (++a >= o)
                        return clearInterval(w),
                        null;
                    let v = document.getElementById("slot2");
                    "a7" == v.className && (v.className = "a0"),
                    v.className = "a" + (parseInt(v.className.substring(1)) + 1)
                }
                , 50)
                  , C = setInterval(()=>{
                    if (++l >= i)
                        return clearInterval(C),
                        g(),
                        null;
                    let v = document.getElementById("slot3");
                    "a7" == v.className && (v.className = "a0"),
                    v.className = "a" + (parseInt(v.className.substring(1)) + 1)
                }
                , 50)
            }
            randomInt(t, n) {
                return Math.floor(Math.random() * (n - t + 1) + t)
            }
        }
        na.\u0275fac = function(t) {
            return new (t || na)
        }
        ,
        na.\u0275cmp = xn({
            type: na,
            selectors: [["app-spin"]],
            decls: 23,
            vars: 1,
            consts: [[1, "countdown", "box"], [1, "box-inner"], [1, "container", "text-center", 2, "margin-top", "3.2rem"], ["src", "/assets/img/titulo_ruleta.png", 1, "image_center"], [1, "mt-10", "flex", "justify-center", "gap-3", "md:gap-8", 2, "margin-top", "3rem"], ["id", "app"], ["id", "vidas"], ["id", "Slots"], ["id", "slot1", 1, "a1"], ["id", "slot2", 1, "a1"], ["id", "slot3", 1, "a1"], ["id", "Gira", 1, "button-85", 2, "font-size", "1rem", "margin-top", "2rem", 3, "click"], [1, "a1", 2, "visibility", "hidden"], [1, "a2", 2, "visibility", "hidden"], [1, "a3", 2, "visibility", "hidden"], [1, "a4", 2, "visibility", "hidden"], [1, "a5", 2, "visibility", "hidden"], [1, "a6", 2, "visibility", "hidden"], [1, "a7", 2, "visibility", "hidden"]],
            template: function(t, n) {
                1 & t && (Me(0, "div", 0)(1, "div", 1)(2, "div", 2),
                Le(3, "img", 3),
                Me(4, "div", 4)(5, "div", 5)(6, "div")(7, "h2", 6),
                no(8),
                Je()(),
                Me(9, "section", 7),
                Le(10, "div", 8)(11, "div", 9)(12, "div", 10),
                Je(),
                Me(13, "div")(14, "button", 11),
                vs("click", function() {
                    return n.doSlot()
                }),
                no(15, " Gira la Ruleta "),
                Je()()()()()()(),
                Le(16, "div", 12)(17, "div", 13)(18, "div", 14)(19, "div", 15)(20, "div", 16)(21, "div", 17)(22, "div", 18)),
                2 & t && (function tm(e) {
                    nm(oe(), x(), pt() + e, !1)
                }(8),
                Cl(" ", 0 != n.lives ? "\xa1Juega con tu suerte! | Intentos: " + n.lives : "\xa1\xdaltimo intento!", " "))
            },
            styles: ['@import"https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@700&display=swap";.timer[_ngcontent-%COMP%]{text-align:center;font-family:Arial,sans-serif;font-size:1.4em;letter-spacing:-1px}.timer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:2em;margin:0 3px 0 15px}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}[_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-content: ""}@font-face{font-family:Bright;src:local("Bright"),url(/assets/fonts/Bright.ttf) format("truetype")}@font-face{font-family:Monserrat;src:local("Monserrat"),url(/assets/fonts/Montserrat.ttf) format("truetype")}html[_ngcontent-%COMP%]{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:Red Hat Text,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}body[_ngcontent-%COMP%]{margin:0;line-height:inherit}hr[_ngcontent-%COMP%]{height:0;color:inherit;border-top-width:1px}abbr[_ngcontent-%COMP%]:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-size:inherit;font-weight:inherit}a[_ngcontent-%COMP%]{color:inherit;text-decoration:inherit}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}table[_ngcontent-%COMP%]{text-indent:0;border-color:inherit;border-collapse:collapse}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button;background-color:transparent;background-image:none}[_ngcontent-%COMP%]:-moz-focusring{outline:auto}[_ngcontent-%COMP%]:-moz-ui-invalid{box-shadow:none}progress[_ngcontent-%COMP%]{vertical-align:baseline}[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary[_ngcontent-%COMP%]{display:list-item}blockquote[_ngcontent-%COMP%], dl[_ngcontent-%COMP%], dd[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%], hr[_ngcontent-%COMP%], figure[_ngcontent-%COMP%], p[_ngcontent-%COMP%], pre[_ngcontent-%COMP%]{margin:0}fieldset[_ngcontent-%COMP%]{margin:0;padding:0}legend[_ngcontent-%COMP%]{padding:0}ol[_ngcontent-%COMP%], ul[_ngcontent-%COMP%], menu[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0}textarea[_ngcontent-%COMP%]{resize:vertical}input[_ngcontent-%COMP%]::placeholder, textarea[_ngcontent-%COMP%]::placeholder{opacity:1;color:#9ca3af}button[_ngcontent-%COMP%], [role=button][_ngcontent-%COMP%]{cursor:pointer}[_ngcontent-%COMP%]:disabled{cursor:default}img[_ngcontent-%COMP%], svg[_ngcontent-%COMP%], video[_ngcontent-%COMP%], canvas[_ngcontent-%COMP%], audio[_ngcontent-%COMP%], iframe[_ngcontent-%COMP%], embed[_ngcontent-%COMP%], object[_ngcontent-%COMP%]{display:block;vertical-align:middle}img[_ngcontent-%COMP%], video[_ngcontent-%COMP%]{max-width:100%;height:auto}[hidden][_ngcontent-%COMP%]{display:none}*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:before, [_ngcontent-%COMP%]:after{--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container[_ngcontent-%COMP%]{width:100%;margin-right:auto;margin-left:auto;padding-right:2rem;padding-left:2rem}@media (min-width: 640px){.container[_ngcontent-%COMP%]{max-width:640px;padding-right:2rem;padding-left:2rem}}@media (min-width: 768px){.container[_ngcontent-%COMP%]{max-width:768px}}@media (min-width: 1024px){.container[_ngcontent-%COMP%]{max-width:1024px;padding-right:4rem;padding-left:4rem}}@media (min-width: 1280px){.container[_ngcontent-%COMP%]{max-width:1280px;padding-right:5rem;padding-left:5rem}}@media (min-width: 1536px){.container[_ngcontent-%COMP%]{max-width:1536px;padding-right:10rem;padding-left:10rem}}.absolute[_ngcontent-%COMP%]{position:absolute}.relative[_ngcontent-%COMP%]{position:relative}.-left-2[_ngcontent-%COMP%]{left:-.5rem}.-right-2[_ngcontent-%COMP%]{right:-.5rem}.left-0[_ngcontent-%COMP%]{left:0}.right-0[_ngcontent-%COMP%]{right:0}.bottom-0[_ngcontent-%COMP%]{bottom:0}.left-\\__ph-0__[_ngcontent-%COMP%]{left:50%}.bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:8%}.mt-32[_ngcontent-%COMP%]{margin-top:8rem}.mt-16[_ngcontent-%COMP%]{margin-top:4rem}.mt-5[_ngcontent-%COMP%]{margin-top:1.25rem}.flex[_ngcontent-%COMP%]{display:flex}.h-20[_ngcontent-%COMP%]{height:4rem}.h-3[_ngcontent-%COMP%]{height:.75rem}.h-40[_ngcontent-%COMP%]{height:10rem}.w-20[_ngcontent-%COMP%]{width:4rem}.w-3[_ngcontent-%COMP%]{width:.75rem}.w-full[_ngcontent-%COMP%]{width:100%}.translate-x-\\__ph-0__[_ngcontent-%COMP%]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.items-center[_ngcontent-%COMP%]{align-items:center}.justify-center[_ngcontent-%COMP%]{justify-content:center}.gap-3[_ngcontent-%COMP%]{gap:.75rem}.gap-x-10[_ngcontent-%COMP%]{column-gap:2.5rem}.rounded-lg[_ngcontent-%COMP%]{border-radius:.5rem}.bg-secondaryDark[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:#8650e0}.bg-veryDarkBlue[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:hsl(234 17% 12% / var(--tw-bg-opacity))}.text-center[_ngcontent-%COMP%]{text-align:center}.text-2xl[_ngcontent-%COMP%]{font-size:1.5rem;line-height:2rem}.text-3xl[_ngcontent-%COMP%]{font-size:3.875rem;line-height:2.25rem;margin-top:10px}.text-xs[_ngcontent-%COMP%]{font-size:1.2rem;line-height:1rem}.uppercase[_ngcontent-%COMP%]{text-transform:uppercase}.tracking-widest[_ngcontent-%COMP%]{letter-spacing:.1em}.text-white[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.text-primary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:#ffb200}.text-secondary[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:hsl(237 18% 59% / var(--tw-text-opacity))}.shadow-xl[_ngcontent-%COMP%]{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.transition-all[_ngcontent-%COMP%]{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-300[_ngcontent-%COMP%]{transition-duration:.3s}.hover\\:text-primary[_ngcontent-%COMP%]:hover{--tw-text-opacity: 1;color:hsl(345 95% 68% / var(--tw-text-opacity))}@media (min-width: 640px){.sm\\:text-4xl[_ngcontent-%COMP%]{font-size:2.25rem;line-height:2.5rem}.sm\\:text-sm[_ngcontent-%COMP%]{font-size:.875rem;line-height:1.25rem}}@media (min-width: 768px){.md\\:h-32[_ngcontent-%COMP%]{height:8rem}.md\\:w-32[_ngcontent-%COMP%]{width:8rem}.md\\:gap-8[_ngcontent-%COMP%]{gap:2rem}.md\\:text-6xl[_ngcontent-%COMP%]{font-size:3.75rem;line-height:1}}@media (min-width: 1024px){.lg\\:h-40[_ngcontent-%COMP%]{height:10rem}.lg\\:w-40[_ngcontent-%COMP%]{width:10rem}.lg\\:text-7xl[_ngcontent-%COMP%]{font-size:4.5rem;line-height:1}.lg\\:text-lg[_ngcontent-%COMP%]{font-size:1.125rem;line-height:1.75rem}}@media (min-width: 1280px){.xl\\:bottom-\\__ph-0__[_ngcontent-%COMP%]{bottom:10%}.xl\\:h-52[_ngcontent-%COMP%]{height:13rem}}.countdown[_ngcontent-%COMP%]{position:absolute;inset:0;font-family:Bright;--tw-bg-opacity: 1;background-color:hsl(234 17% 12% / var(--tw-bg-opacity));background-image:url(/assets/img/fondo_ruleta.png);background-repeat:no-repeat;background-size:cover;overflow:hidden;background-position:center}.image_center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;margin-bottom:14px}.box[_ngcontent-%COMP%]{width:100%;padding:5px}.box[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;top:5px;text-align:center}.box[_ngcontent-%COMP%]:before{left:5px}.box[_ngcontent-%COMP%]:after{right:5px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]{position:relative;border:2px solid #b78846;height:-webkit-fill-available}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before, .box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{content:"\\2022";position:absolute;width:14px;height:14px;font-size:14px;color:#b78846;border:2px solid #b78846;line-height:12px;bottom:-2px;text-align:center}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:before{left:-2px}.box[_ngcontent-%COMP%]   .box-inner[_ngcontent-%COMP%]:after{right:-2px}#myVideo[_ngcontent-%COMP%]{position:fixed;height:100vh;width:100vw;background-size:cover;overflow:hidden;object-fit:cover}.content[_ngcontent-%COMP%]{position:absolute;top:63vh;color:#f1f1f1;width:100%;padding:20px;right:0;bottom:0;left:0;font-family:Bright}#app[_ngcontent-%COMP%]{width:auto;height:auto;margin:0 auto;position:relative}.display[_ngcontent-%COMP%]{color:#fff;display:flex;align-items:center;justify-content:center;width:200px;height:2.4rem;border:1px solid white;border-radius:20px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:1rem;margin:-10px auto 0}.marker[_ngcontent-%COMP%]{position:absolute;width:60px;left:8rem;top:-20px;z-index:2}.wheel[_ngcontent-%COMP%]{width:100%;height:auto}.button[_ngcontent-%COMP%]{display:block;width:200px;margin:40px auto;cursor:pointer}.button[_ngcontent-%COMP%]:hover{opacity:.8}.blur[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_blur 10s}@keyframes _ngcontent-%COMP%_blur{0%{filter:blur(1.5px)}80%{filter:blur(1.5px)}to{filter:blur(0px)}}.button-36[_ngcontent-%COMP%]{background-image:linear-gradient(92.88deg,#455eb5 9.16%,#5643cc 43.89%,#673fd7 64.72%);border-radius:8px;border-style:none;box-sizing:border-box;color:#fff;cursor:pointer;flex-shrink:0;font-size:16px;font-weight:500;height:4rem;padding:0 1.6rem;text-align:center;text-shadow:rgba(0,0,0,.25) 0 3px 8px;transition:all .5s;user-select:none;-webkit-user-select:none;touch-action:manipulation}.button-36[_ngcontent-%COMP%]:hover{box-shadow:#503fcd80 0 1px 30px;transition-duration:.1s}@media (min-width: 768px){.button-36[_ngcontent-%COMP%]{padding:0 2.6rem}}.button-85[_ngcontent-%COMP%]{padding:.6em 2em;border:none;outline:none;color:#fff;background:#462463;cursor:pointer;position:relative;z-index:0;border-radius:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation}.button-85[_ngcontent-%COMP%]:before{content:"";background:linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000);position:absolute;top:-2px;left:-2px;background-size:400%;z-index:-1;filter:blur(5px);-webkit-filter:blur(5px);width:calc(100% + 4px);height:calc(100% + 4px);animation:_ngcontent-%COMP%_glowing-button-85 20s linear infinite;transition:opacity .3s ease-in-out;border-radius:10px}@keyframes _ngcontent-%COMP%_glowing-button-85{0%{background-position:0 0}50%{background-position:400% 0}to{background-position:0 0}}.button-85[_ngcontent-%COMP%]:after{z-index:-1;content:"";position:absolute;width:100%;height:100%;background:#462463;left:0;top:0;border-radius:10px}section#status[_ngcontent-%COMP%]{margin-bottom:25px;padding-top:25px;padding-bottom:25px;border-radius:5px;text-align:center;background-color:#37474f;color:#fff;font-size:25px;font-family:Roboto Mono,monospace}section#Gira[_ngcontent-%COMP%]{margin-top:25px;padding-top:25px;padding-bottom:25px;border-radius:5px;text-align:center;background-color:#ab47bc;color:#fff;font-size:25px}section#Gira[_ngcontent-%COMP%]:hover{background-color:#ba68c8}section#options[_ngcontent-%COMP%]{margin-top:20px;padding-top:5px;border-radius:5px;background-color:#c62828;color:#fff}.option[_ngcontent-%COMP%]{padding-left:5px}#vidas[_ngcontent-%COMP%]{margin-bottom:20px;padding-bottom:5px;font-size:25px;color:#fff}section#info[_ngcontent-%COMP%]{padding-left:12px;padding-bottom:12px;border-radius:5px;overflow:hidden;animation-duration:1s;color:#bdbdbd;margin-top:50px;margin-left:30%;margin-right:30%;display:none}#slot1[_ngcontent-%COMP%], #slot2[_ngcontent-%COMP%], #slot3[_ngcontent-%COMP%]{display:inline-block;margin-top:5px;margin-left:15px;margin-right:15px;background-size:70px;width:70px;height:70px}.a1[_ngcontent-%COMP%]{background-image:url(/assets/tiles/seven.png)}.a2[_ngcontent-%COMP%]{background-image:url(/assets/tiles/cherries.png)}.a3[_ngcontent-%COMP%]{background-image:url(/assets/tiles/club.png)}.a4[_ngcontent-%COMP%]{background-image:url(/assets/tiles/diamond.png)}.a5[_ngcontent-%COMP%]{background-image:url(/assets/tiles/heart.png)}.a6[_ngcontent-%COMP%]{background-image:url(/assets/tiles/spade.png)}.a7[_ngcontent-%COMP%]{background-image:url(/assets/tiles/joker.png)}']
        });
        const u2 = [{
            path: "roulette",
            component: ta
        }, {
            path: "catching",
            component: ea
        }, {
            path: "catching/game",
            component: Js
        }, {
            path: "spin",
            component: na
        }, {
            path: "**",
            redirectTo: "/",
            pathMatch: "full"
        }];
        class bi {
        }
        bi.\u0275fac = function(t) {
            return new (t || bi)
        }
        ,
        bi.\u0275mod = zn({
            type: bi
        }),
        bi.\u0275inj = _n({
            imports: [$C.forRoot(u2), $C]
        });
        class ra {
            constructor() {}
            ngOnInit() {}
        }
        ra.\u0275fac = function(t) {
            return new (t || ra)
        }
        ,
        ra.\u0275cmp = xn({
            type: ra,
            selectors: [["app-root"]],
            decls: 1,
            vars: 0,
            template: function(t, n) {
                1 & t && Le(0, "router-outlet")
            },
            dependencies: [ph],
            encapsulation: 2
        });
        class _i {
        }
        _i.\u0275fac = function(t) {
            return new (t || _i)
        }
        ,
        _i.\u0275mod = zn({
            type: _i,
            bootstrap: [ra]
        }),
        _i.\u0275inj = _n({
            imports: [gO, bi]
        }),
        pO().bootstrapModule(_i).catch(e=>console.error(e))
    }
    ,
    226: function(xi) {
        xi.exports = function() {
            "use strict";
            var U = {
                awaitingPromise: new WeakMap,
                promise: new WeakMap,
                innerParams: new WeakMap,
                domCache: new WeakMap
            };
            const te = c=>{
                const d = {};
                for (const h in c)
                    d[c[h]] = "swal2-" + c[h];
                return d
            }
              , b = te(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "html-container", "actions", "confirm", "deny", "cancel", "default-outline", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error"])
              , Ln = te(["success", "warning", "info", "question", "error"])
              , fo = "SweetAlert2:"
              , ho = c=>c.charAt(0).toUpperCase() + c.slice(1)
              , ze = c=>{
                console.warn(`${fo} ${"object" == typeof c ? c.join(" ") : c}`)
            }
              , yn = c=>{
                console.error(`${fo} ${c}`)
            }
              , wn = []
              , oa = (c,d)=>{
                (c=>{
                    wn.includes(c) || (wn.push(c),
                    ze(c))
                }
                )(`"${c}" is deprecated and will be removed in the next major release. Please use "${d}" instead.`)
            }
              , Ar = c=>"function" == typeof c ? c() : c
              , Ei = c=>c && "function" == typeof c.toPromise
              , kr = c=>Ei(c) ? c.toPromise() : Promise.resolve(c)
              , Pi = c=>c && Promise.resolve(c) === c
              , Te = ()=>document.body.querySelector(`.${b.container}`)
              , St = c=>{
                const d = Te();
                return d ? d.querySelector(c) : null
            }
              , je = c=>St(`.${c}`)
              , se = ()=>je(b.popup)
              , Bn = ()=>je(b.icon)
              , go = ()=>je(b.title)
              , mo = ()=>je(b["html-container"])
              , lr = ()=>je(b.image)
              , cr = ()=>je(b["progress-steps"])
              , yo = ()=>je(b["validation-message"])
              , lt = ()=>St(`.${b.actions} .${b.confirm}`)
              , $n = ()=>St(`.${b.actions} .${b.cancel}`)
              , Ut = ()=>St(`.${b.actions} .${b.deny}`)
              , ur = ()=>St(`.${b.loader}`)
              , dr = ()=>je(b.actions)
              , De = ()=>je(b.footer)
              , Rr = ()=>je(b["timer-progress-bar"])
              , Si = ()=>je(b.close)
              , Ii = ()=>{
                const c = Array.from(se().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((h,m)=>{
                    const _ = parseInt(h.getAttribute("tabindex"))
                      , O = parseInt(m.getAttribute("tabindex"));
                    return _ > O ? 1 : _ < O ? -1 : 0
                }
                )
                  , d = Array.from(se().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(h=>"-1" !== h.getAttribute("tabindex"));
                return (c=>{
                    const d = [];
                    for (let h = 0; h < c.length; h++)
                        -1 === d.indexOf(c[h]) && d.push(c[h]);
                    return d
                }
                )(c.concat(d)).filter(h=>vt(h))
            }
              , It = ()=>nn(document.body, b.shown) && !nn(document.body, b["toast-shown"]) && !nn(document.body, b["no-backdrop"])
              , Nr = ()=>se() && nn(se(), b.toast)
              , ye = {
                previousBodyPadding: null
            }
              , ae = (c,d)=>{
                if (c.textContent = "",
                d) {
                    const m = (new DOMParser).parseFromString(d, "text/html");
                    Array.from(m.querySelector("head").childNodes).forEach(_=>{
                        c.appendChild(_)
                    }
                    ),
                    Array.from(m.querySelector("body").childNodes).forEach(_=>{
                        _ instanceof HTMLVideoElement || _ instanceof HTMLAudioElement ? c.appendChild(_.cloneNode(!0)) : c.appendChild(_)
                    }
                    )
                }
            }
              , nn = (c,d)=>{
                if (!d)
                    return !1;
                const h = d.split(/\s+/);
                for (let m = 0; m < h.length; m++)
                    if (!c.classList.contains(h[m]))
                        return !1;
                return !0
            }
              , tt = (c,d,h)=>{
                if (((c,d)=>{
                    Array.from(c.classList).forEach(h=>{
                        !Object.values(b).includes(h) && !Object.values(Ln).includes(h) && !Object.values(d.showClass).includes(h) && c.classList.remove(h)
                    }
                    )
                }
                )(c, d),
                d.customClass && d.customClass[h]) {
                    if ("string" != typeof d.customClass[h] && !d.customClass[h].forEach)
                        return void ze(`Invalid type of customClass.${h}! Expected string or iterable object, got "${typeof d.customClass[h]}"`);
                    ne(c, d.customClass[h])
                }
            }
              , sa = (c,d)=>{
                if (!d)
                    return null;
                switch (d) {
                case "select":
                case "textarea":
                case "file":
                    return c.querySelector(`.${b.popup} > .${b[d]}`);
                case "checkbox":
                    return c.querySelector(`.${b.popup} > .${b.checkbox} input`);
                case "radio":
                    return c.querySelector(`.${b.popup} > .${b.radio} input:checked`) || c.querySelector(`.${b.popup} > .${b.radio} input:first-child`);
                case "range":
                    return c.querySelector(`.${b.popup} > .${b.range} input`);
                default:
                    return c.querySelector(`.${b.popup} > .${b.input}`)
                }
            }
              , Oi = c=>{
                if (c.focus(),
                "file" !== c.type) {
                    const d = c.value;
                    c.value = "",
                    c.value = d
                }
            }
              , Dc = (c,d,h)=>{
                !c || !d || ("string" == typeof d && (d = d.split(/\s+/).filter(Boolean)),
                d.forEach(m=>{
                    Array.isArray(c) ? c.forEach(_=>{
                        h ? _.classList.add(m) : _.classList.remove(m)
                    }
                    ) : h ? c.classList.add(m) : c.classList.remove(m)
                }
                ))
            }
              , ne = (c,d)=>{
                Dc(c, d, !0)
            }
              , rn = (c,d)=>{
                Dc(c, d, !1)
            }
              , Vn = (c,d)=>{
                const h = Array.from(c.children);
                for (let m = 0; m < h.length; m++) {
                    const _ = h[m];
                    if (_ instanceof HTMLElement && nn(_, d))
                        return _
                }
            }
              , Fr = (c,d,h)=>{
                h === `${parseInt(h)}` && (h = parseInt(h)),
                h || 0 === parseInt(h) ? c.style[d] = "number" == typeof h ? `${h}px` : h : c.style.removeProperty(d)
            }
              , Ve = function(c) {
                c.style.display = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex"
            }
              , Ge = c=>{
                c.style.display = "none"
            }
              , Mc = (c,d,h,m)=>{
                const _ = c.querySelector(d);
                _ && (_.style[h] = m)
            }
              , wo = function(c, d) {
                d ? Ve(c, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "flex") : Ge(c)
            }
              , vt = c=>!(!c || !(c.offsetWidth || c.offsetHeight || c.getClientRects().length))
              , xc = c=>c.scrollHeight > c.clientHeight
              , Ti = c=>{
                const d = window.getComputedStyle(c)
                  , h = parseFloat(d.getPropertyValue("animation-duration") || "0")
                  , m = parseFloat(d.getPropertyValue("transition-duration") || "0");
                return h > 0 || m > 0
            }
              , Ai = function(c) {
                let d = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                const h = Rr();
                vt(h) && (d && (h.style.transition = "none",
                h.style.width = "100%"),
                setTimeout(()=>{
                    h.style.transition = `width ${c / 1e3}s linear`,
                    h.style.width = "0%"
                }
                , 10))
            }
              , Z = {}
              , Ec = c=>new Promise(d=>{
                if (!c)
                    return d();
                const h = window.scrollX
                  , m = window.scrollY;
                Z.restoreFocusTimeout = setTimeout(()=>{
                    Z.previousActiveElement instanceof HTMLElement ? (Z.previousActiveElement.focus(),
                    Z.previousActiveElement = null) : document.body && document.body.focus(),
                    d()
                }
                , 100),
                window.scrollTo(h, m)
            }
            )
              , Pc = ()=>typeof window > "u" || typeof document > "u"
              , Sc = `\n <div aria-labelledby="${b.title}" aria-describedby="${b["html-container"]}" class="${b.popup}" tabindex="-1">\n   <button type="button" class="${b.close}"></button>\n   <ul class="${b["progress-steps"]}"></ul>\n   <div class="${b.icon}"></div>\n   <img class="${b.image}" />\n   <h2 class="${b.title}" id="${b.title}"></h2>\n   <div class="${b["html-container"]}" id="${b["html-container"]}"></div>\n   <input class="${b.input}" />\n   <input type="file" class="${b.file}" />\n   <div class="${b.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${b.select}"></select>\n   <div class="${b.radio}"></div>\n   <label for="${b.checkbox}" class="${b.checkbox}">\n     <input type="checkbox" />\n     <span class="${b.label}"></span>\n   </label>\n   <textarea class="${b.textarea}"></textarea>\n   <div class="${b["validation-message"]}" id="${b["validation-message"]}"></div>\n   <div class="${b.actions}">\n     <div class="${b.loader}"></div>\n     <button type="button" class="${b.confirm}"></button>\n     <button type="button" class="${b.deny}"></button>\n     <button type="button" class="${b.cancel}"></button>\n   </div>\n   <div class="${b.footer}"></div>\n   <div class="${b["timer-progress-bar-container"]}">\n     <div class="${b["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(/(^|\n)\s*/g, "")
              , Hn = ()=>{
                Z.currentInstance.resetValidationMessage()
            }
              , Nh = c=>{
                const d = (()=>{
                    const c = Te();
                    return !!c && (c.remove(),
                    rn([document.documentElement, document.body], [b["no-backdrop"], b["toast-shown"], b["has-column"]]),
                    !0)
                }
                )();
                if (Pc())
                    return void yn("SweetAlert2 requires document to initialize");
                const h = document.createElement("div");
                h.className = b.container,
                d && ne(h, b["no-transition"]),
                ae(h, Sc);
                const m = (c=>"string" == typeof c ? document.querySelector(c) : c)(c.target);
                m.appendChild(h),
                (c=>{
                    const d = se();
                    d.setAttribute("role", c.toast ? "alert" : "dialog"),
                    d.setAttribute("aria-live", c.toast ? "polite" : "assertive"),
                    c.toast || d.setAttribute("aria-modal", "true")
                }
                )(c),
                (c=>{
                    "rtl" === window.getComputedStyle(c).direction && ne(Te(), b.rtl)
                }
                )(m),
                (()=>{
                    const c = se()
                      , d = Vn(c, b.input)
                      , h = Vn(c, b.file)
                      , m = c.querySelector(`.${b.range} input`)
                      , _ = c.querySelector(`.${b.range} output`)
                      , O = Vn(c, b.select)
                      , pe = c.querySelector(`.${b.checkbox} input`)
                      , bt = Vn(c, b.textarea);
                    d.oninput = Hn,
                    h.onchange = Hn,
                    O.onchange = Hn,
                    pe.onchange = Hn,
                    bt.oninput = Hn,
                    m.oninput = ()=>{
                        Hn(),
                        _.value = m.value
                    }
                    ,
                    m.onchange = ()=>{
                        Hn(),
                        _.value = m.value
                    }
                }
                )()
            }
              , vo = (c,d)=>{
                c instanceof HTMLElement ? d.appendChild(c) : "object" == typeof c ? la(c, d) : c && ae(d, c)
            }
              , la = (c,d)=>{
                c.jquery ? ca(d, c) : ae(d, c.toString())
            }
              , ca = (c,d)=>{
                if (c.textContent = "",
                0 in d)
                    for (let h = 0; h in d; h++)
                        c.appendChild(d[h].cloneNode(!0));
                else
                    c.appendChild(d.cloneNode(!0))
            }
              , fr = (()=>{
                if (Pc())
                    return !1;
                const c = document.createElement("div")
                  , d = {
                    WebkitAnimation: "webkitAnimationEnd",
                    animation: "animationend"
                };
                for (const h in d)
                    if (Object.prototype.hasOwnProperty.call(d, h) && typeof c.style[h] < "u")
                        return d[h];
                return !1
            }
            )()
              , Ic = (c,d)=>{
                const h = dr()
                  , m = ur();
                d.showConfirmButton || d.showDenyButton || d.showCancelButton ? Ve(h) : Ge(h),
                tt(h, d, "actions"),
                function da(c, d, h) {
                    const m = lt()
                      , _ = Ut()
                      , O = $n();
                    Co(m, "confirm", h),
                    Co(_, "deny", h),
                    Co(O, "cancel", h),
                    function fa(c, d, h, m) {
                        m.buttonsStyling ? (ne([c, d, h], b.styled),
                        m.confirmButtonColor && (c.style.backgroundColor = m.confirmButtonColor,
                        ne(c, b["default-outline"])),
                        m.denyButtonColor && (d.style.backgroundColor = m.denyButtonColor,
                        ne(d, b["default-outline"])),
                        m.cancelButtonColor && (h.style.backgroundColor = m.cancelButtonColor,
                        ne(h, b["default-outline"]))) : rn([c, d, h], b.styled)
                    }(m, _, O, h),
                    h.reverseButtons && (h.toast ? (c.insertBefore(O, m),
                    c.insertBefore(_, m)) : (c.insertBefore(O, d),
                    c.insertBefore(_, d),
                    c.insertBefore(m, d)))
                }(h, m, d),
                ae(m, d.loaderHtml),
                tt(m, d, "loader")
            }
            ;
            function Co(c, d, h) {
                wo(c, h[`show${ho(d)}Button`], "inline-block"),
                ae(c, h[`${d}ButtonText`]),
                c.setAttribute("aria-label", h[`${d}ButtonAriaLabel`]),
                c.className = b[d],
                tt(c, h, `${d}Button`),
                ne(c, h[`${d}ButtonClass`])
            }
            const Ht = (c,d)=>{
                const h = Te();
                h && (function Oc(c, d) {
                    "string" == typeof d ? c.style.background = d : d || ne([document.documentElement, document.body], b["no-backdrop"])
                }(h, d.backdrop),
                function Tc(c, d) {
                    d in b ? ne(c, b[d]) : (ze('The "position" parameter is not valid, defaulting to "center"'),
                    ne(c, b.center))
                }(h, d.position),
                function Ac(c, d) {
                    if (d && "string" == typeof d) {
                        const h = `grow-${d}`;
                        h in b && ne(c, b[h])
                    }
                }(h, d.grow),
                tt(h, d, "container"))
            }
            ;
            const kc = ["input", "file", "range", "select", "radio", "checkbox", "textarea"]
              , Rc = c=>{
                if (!nt[c.input])
                    return void yn(`Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${c.input}"`);
                const d = Ot(c.input)
                  , h = nt[c.input](d, c);
                Ve(d),
                c.inputAutoFocus && setTimeout(()=>{
                    Oi(h)
                }
                )
            }
              , on = (c,d)=>{
                const h = sa(se(), c);
                if (h) {
                    (c=>{
                        for (let d = 0; d < c.attributes.length; d++) {
                            const h = c.attributes[d].name;
                            ["type", "value", "style"].includes(h) || c.removeAttribute(h)
                        }
                    }
                    )(h);
                    for (const m in d)
                        h.setAttribute(m, d[m])
                }
            }
              , Fc = c=>{
                const d = Ot(c.input);
                "object" == typeof c.customClass && ne(d, c.customClass.input)
            }
              , Ee = (c,d)=>{
                (!c.placeholder || d.inputPlaceholder) && (c.placeholder = d.inputPlaceholder)
            }
              , zt = (c,d,h)=>{
                if (h.inputLabel) {
                    c.id = b.input;
                    const m = document.createElement("label")
                      , _ = b["input-label"];
                    m.setAttribute("for", c.id),
                    m.className = _,
                    "object" == typeof h.customClass && ne(m, h.customClass.inputLabel),
                    m.innerText = h.inputLabel,
                    d.insertAdjacentElement("beforebegin", m)
                }
            }
              , Ot = c=>Vn(se(), b[c] || b.input)
              , ki = (c,d)=>{
                ["string", "number"].includes(typeof d) ? c.value = `${d}` : Pi(d) || ze(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof d}"`)
            }
              , nt = {};
            nt.text = nt.email = nt.password = nt.number = nt.tel = nt.url = (c,d)=>(ki(c, d.inputValue),
            zt(c, c, d),
            Ee(c, d),
            c.type = d.input,
            c),
            nt.file = (c,d)=>(zt(c, c, d),
            Ee(c, d),
            c),
            nt.range = (c,d)=>{
                const h = c.querySelector("input")
                  , m = c.querySelector("output");
                return ki(h, d.inputValue),
                h.type = d.input,
                ki(m, d.inputValue),
                zt(h, c, d),
                c
            }
            ,
            nt.select = (c,d)=>{
                if (c.textContent = "",
                d.inputPlaceholder) {
                    const h = document.createElement("option");
                    ae(h, d.inputPlaceholder),
                    h.value = "",
                    h.disabled = !0,
                    h.selected = !0,
                    c.appendChild(h)
                }
                return zt(c, c, d),
                c
            }
            ,
            nt.radio = c=>(c.textContent = "",
            c),
            nt.checkbox = (c,d)=>{
                const h = sa(se(), "checkbox");
                h.value = "1",
                h.id = b.checkbox,
                h.checked = Boolean(d.inputValue);
                const m = c.querySelector("span");
                return ae(m, d.inputPlaceholder),
                h
            }
            ,
            nt.textarea = (c,d)=>{
                ki(c, d.inputValue),
                Ee(c, d),
                zt(c, c, d);
                return setTimeout(()=>{
                    if ("MutationObserver"in window) {
                        const m = parseInt(window.getComputedStyle(se()).width);
                        new MutationObserver(()=>{
                            const O = c.offsetWidth + (m=>parseInt(window.getComputedStyle(m).marginLeft) + parseInt(window.getComputedStyle(m).marginRight))(c);
                            se().style.width = O > m ? `${O}px` : null
                        }
                        ).observe(c, {
                            attributes: !0,
                            attributeFilter: ["style"]
                        })
                    }
                }
                ),
                c
            }
            ;
            const Lc = (c,d)=>{
                const h = mo();
                tt(h, d, "htmlContainer"),
                d.html ? (vo(d.html, h),
                Ve(h, "block")) : d.text ? (h.textContent = d.text,
                Ve(h, "block")) : Ge(h),
                ((c,d)=>{
                    const h = se()
                      , m = U.innerParams.get(c)
                      , _ = !m || d.input !== m.input;
                    kc.forEach(O=>{
                        const pe = Vn(h, b[O]);
                        on(O, d.inputAttributes),
                        pe.className = b[O],
                        _ && Ge(pe)
                    }
                    ),
                    d.input && (_ && Rc(d),
                    Fc(d))
                }
                )(c, d)
            }
              , hr = (c,d)=>{
                for (const h in Ln)
                    d.icon !== h && rn(c, Ln[h]);
                ne(c, Ln[d.icon]),
                jc(c, d),
                $c(),
                tt(c, d, "icon")
            }
              , $c = ()=>{
                const c = se()
                  , d = window.getComputedStyle(c).getPropertyValue("background-color")
                  , h = c.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");
                for (let m = 0; m < h.length; m++)
                    h[m].style.backgroundColor = d
            }
              , ya = (c,d)=>{
                let m, h = c.innerHTML;
                d.iconHtml ? m = wa(d.iconHtml) : "success" === d.icon ? (m = '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',
                h = h.replace(/ style=".*?"/g, "")) : m = "error" === d.icon ? '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n' : wa({
                    question: "?",
                    warning: "!",
                    info: "i"
                }[d.icon]),
                h.trim() !== m.trim() && ae(c, m)
            }
              , jc = (c,d)=>{
                if (d.iconColor) {
                    c.style.color = d.iconColor,
                    c.style.borderColor = d.iconColor;
                    for (const h of [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"])
                        Mc(c, h, "backgroundColor", d.iconColor);
                    Mc(c, ".swal2-success-ring", "borderColor", d.iconColor)
                }
            }
              , wa = c=>`<div class="${b["icon-content"]}">${c}</div>`
              , Uc = (c,d)=>{
                c.className = `${b.popup} ${vt(c) ? d.showClass.popup : ""}`,
                d.toast ? (ne([document.documentElement, document.body], b["toast-shown"]),
                ne(c, b.toast)) : ne(c, b.modal),
                tt(c, d, "popup"),
                "string" == typeof d.customClass && ne(c, d.customClass),
                d.icon && ne(c, b[`icon-${d.icon}`])
            }
              , Pe = c=>{
                const d = document.createElement("li");
                return ne(d, b["progress-step"]),
                ae(d, c),
                d
            }
              , zc = c=>{
                const d = document.createElement("li");
                return ne(d, b["progress-step-line"]),
                c.progressStepsDistance && Fr(d, "width", c.progressStepsDistance),
                d
            }
              , bo = (c,d)=>{
                ((c,d)=>{
                    const h = Te()
                      , m = se();
                    d.toast ? (Fr(h, "width", d.width),
                    m.style.width = "100%",
                    m.insertBefore(ur(), Bn())) : Fr(m, "width", d.width),
                    Fr(m, "padding", d.padding),
                    d.color && (m.style.color = d.color),
                    d.background && (m.style.background = d.background),
                    Ge(yo()),
                    Uc(m, d)
                }
                )(0, d),
                Ht(0, d),
                ((c,d)=>{
                    const h = cr();
                    d.progressSteps && 0 !== d.progressSteps.length ? (Ve(h),
                    h.textContent = "",
                    d.currentProgressStep >= d.progressSteps.length && ze("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),
                    d.progressSteps.forEach((m,_)=>{
                        const O = Pe(m);
                        if (h.appendChild(O),
                        _ === d.currentProgressStep && ne(O, b["active-progress-step"]),
                        _ !== d.progressSteps.length - 1) {
                            const pe = zc(d);
                            h.appendChild(pe)
                        }
                    }
                    )) : Ge(h)
                }
                )(0, d),
                ((c,d)=>{
                    const h = U.innerParams.get(c)
                      , m = Bn();
                    h && d.icon === h.icon ? (ya(m, d),
                    hr(m, d)) : d.icon || d.iconHtml ? d.icon && -1 === Object.keys(Ln).indexOf(d.icon) ? (yn(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${d.icon}"`),
                    Ge(m)) : (Ve(m),
                    ya(m, d),
                    hr(m, d),
                    ne(m, d.showClass.icon)) : Ge(m)
                }
                )(c, d),
                ((c,d)=>{
                    const h = lr();
                    d.imageUrl ? (Ve(h, ""),
                    h.setAttribute("src", d.imageUrl),
                    h.setAttribute("alt", d.imageAlt),
                    Fr(h, "width", d.imageWidth),
                    Fr(h, "height", d.imageHeight),
                    h.className = b.image,
                    tt(h, d, "image")) : Ge(h)
                }
                )(0, d),
                ((c,d)=>{
                    const h = go();
                    wo(h, d.title || d.titleText, "block"),
                    d.title && vo(d.title, h),
                    d.titleText && (h.innerText = d.titleText),
                    tt(h, d, "title")
                }
                )(0, d),
                ((c,d)=>{
                    const h = Si();
                    ae(h, d.closeButtonHtml),
                    tt(h, d, "closeButton"),
                    wo(h, d.showCloseButton),
                    h.setAttribute("aria-label", d.closeButtonAriaLabel)
                }
                )(0, d),
                Lc(c, d),
                Ic(0, d),
                ((c,d)=>{
                    const h = De();
                    wo(h, d.footer),
                    d.footer && vo(d.footer, h),
                    tt(h, d, "footer")
                }
                )(0, d),
                "function" == typeof d.didRender && d.didRender(se())
            }
            ;
            function ue() {
                const c = U.innerParams.get(this);
                if (!c)
                    return;
                const d = U.domCache.get(this);
                Ge(d.loader),
                Nr() ? c.icon && Ve(Bn()) : Ni(d),
                rn([d.popup, d.actions], b.loading),
                d.popup.removeAttribute("aria-busy"),
                d.popup.removeAttribute("data-loading"),
                d.confirmButton.disabled = !1,
                d.denyButton.disabled = !1,
                d.cancelButton.disabled = !1
            }
            const Ni = c=>{
                const d = c.popup.getElementsByClassName(c.loader.getAttribute("data-button-to-replace"));
                d.length ? Ve(d[0], "inline-block") : !vt(lt()) && !vt(Ut()) && !vt($n()) && Ge(c.actions)
            }
            ;
            const Ca = ()=>lt() && lt().click()
              , vn = Object.freeze({
                cancel: "cancel",
                backdrop: "backdrop",
                close: "close",
                esc: "esc",
                timer: "timer"
            })
              , _o = c=>{
                c.keydownTarget && c.keydownHandlerAdded && (c.keydownTarget.removeEventListener("keydown", c.keydownHandler, {
                    capture: c.keydownListenerCapture
                }),
                c.keydownHandlerAdded = !1)
            }
              , Do = (c,d)=>{
                const h = Ii();
                if (h.length)
                    return (c += d) === h.length ? c = 0 : -1 === c && (c = h.length - 1),
                    void h[c].focus();
                se().focus()
            }
              , E = ["ArrowRight", "ArrowDown"]
              , Mo = ["ArrowLeft", "ArrowUp"]
              , V = (c,d,h)=>{
                const m = U.innerParams.get(c);
                m && (d.isComposing || 229 === d.keyCode || (m.stopKeydownPropagation && d.stopPropagation(),
                "Enter" === d.key ? le(c, d, m) : "Tab" === d.key ? qc(d) : [...E, ...Mo].includes(d.key) ? Lh(d.key) : "Escape" === d.key && Wc(d, m, h)))
            }
              , le = (c,d,h)=>{
                if (Ar(h.allowEnterKey) && d.target && c.getInput() && d.target instanceof HTMLElement && d.target.outerHTML === c.getInput().outerHTML) {
                    if (["textarea", "file"].includes(h.input))
                        return;
                    Ca(),
                    d.preventDefault()
                }
            }
              , qc = c=>{
                const d = c.target
                  , h = Ii();
                let m = -1;
                for (let _ = 0; _ < h.length; _++)
                    if (d === h[_]) {
                        m = _;
                        break
                    }
                Do(m, c.shiftKey ? -1 : 1),
                c.stopPropagation(),
                c.preventDefault()
            }
              , Lh = c=>{
                const d = lt()
                  , h = Ut()
                  , m = $n();
                if (document.activeElement instanceof HTMLElement && ![d, h, m].includes(document.activeElement))
                    return;
                const O = E.includes(c) ? "nextElementSibling" : "previousElementSibling";
                let pe = document.activeElement;
                for (let bt = 0; bt < dr().children.length; bt++) {
                    if (pe = pe[O],
                    !pe)
                        return;
                    if (pe instanceof HTMLButtonElement && vt(pe))
                        break
                }
                pe instanceof HTMLButtonElement && pe.focus()
            }
              , Wc = (c,d,h)=>{
                Ar(d.allowEscapeKey) && (c.preventDefault(),
                h(vn.esc))
            }
            ;
            var Cn = {
                swalPromiseResolve: new WeakMap,
                swalPromiseReject: new WeakMap
            };
            const Yc = ()=>{
                Array.from(document.body.children).forEach(d=>{
                    d.hasAttribute("data-previous-aria-hidden") ? (d.setAttribute("aria-hidden", d.getAttribute("data-previous-aria-hidden")),
                    d.removeAttribute("data-previous-aria-hidden")) : d.removeAttribute("aria-hidden")
                }
                )
            }
              , Bh = ()=>{
                const c = navigator.userAgent
                  , d = !!c.match(/iPad/i) || !!c.match(/iPhone/i)
                  , h = !!c.match(/WebKit/i);
                d && h && !c.match(/CriOS/i) && se().scrollHeight > window.innerHeight - 44 && (Te().style.paddingBottom = "44px")
            }
              , bn = ()=>{
                const c = Te();
                let d;
                c.ontouchstart = h=>{
                    d = $h(h)
                }
                ,
                c.ontouchmove = h=>{
                    d && (h.preventDefault(),
                    h.stopPropagation())
                }
            }
              , $h = c=>{
                const d = c.target
                  , h = Te();
                return !jh(c) && !Vh(c) && (d === h || !xc(h) && d instanceof HTMLElement && "INPUT" !== d.tagName && "TEXTAREA" !== d.tagName && !(xc(mo()) && mo().contains(d)))
            }
              , jh = c=>c.touches && c.touches.length && "stylus" === c.touches[0].touchType
              , Vh = c=>c.touches && c.touches.length > 1
              , Uh = ()=>{
                if (nn(document.body, b.iosfix)) {
                    const c = parseInt(document.body.style.top, 10);
                    rn(document.body, b.iosfix),
                    document.body.style.top = "",
                    document.body.scrollTop = -1 * c
                }
            }
              , Kc = ()=>{
                null === ye.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (ye.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),
                document.body.style.paddingRight = `${ye.previousBodyPadding + (()=>{
                    const c = document.createElement("div");
                    c.className = b["scrollbar-measure"],
                    document.body.appendChild(c);
                    const d = c.getBoundingClientRect().width - c.clientWidth;
                    return document.body.removeChild(c),
                    d
                }
                )()}px`)
            }
              , Hh = ()=>{
                null !== ye.previousBodyPadding && (document.body.style.paddingRight = `${ye.previousBodyPadding}px`,
                ye.previousBodyPadding = null)
            }
            ;
            function ba(c, d, h, m) {
                Nr() ? Lr(c, m) : (Ec(h).then(()=>Lr(c, m)),
                _o(Z)),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? (d.setAttribute("style", "display:none !important"),
                d.removeAttribute("class"),
                d.innerHTML = "") : d.remove(),
                It() && (Hh(),
                Uh(),
                Yc()),
                function zh() {
                    rn([document.documentElement, document.body], [b.shown, b["height-auto"], b["no-backdrop"], b["toast-shown"]])
                }()
            }
            function qe(c) {
                c = L(c);
                const d = Cn.swalPromiseResolve.get(this)
                  , h = Gh(this);
                this.isAwaitingPromise() ? c.isDismissed || (xo(this),
                d(c)) : h && d(c)
            }
            const Gh = c=>{
                const d = se();
                if (!d)
                    return !1;
                const h = U.innerParams.get(c);
                if (!h || nn(d, h.hideClass.popup))
                    return !1;
                rn(d, h.showClass.popup),
                ne(d, h.hideClass.popup);
                const m = Te();
                return rn(m, h.showClass.backdrop),
                ne(m, h.hideClass.backdrop),
                Wh(c, d, h),
                !0
            }
            ;
            const xo = c=>{
                c.isAwaitingPromise() && (U.awaitingPromise.delete(c),
                U.innerParams.get(c) || c._destroy())
            }
              , L = c=>typeof c > "u" ? {
                isConfirmed: !1,
                isDenied: !1,
                isDismissed: !0
            } : Object.assign({
                isConfirmed: !1,
                isDenied: !1,
                isDismissed: !1
            }, c)
              , Wh = (c,d,h)=>{
                const m = Te()
                  , _ = fr && Ti(d);
                "function" == typeof h.willClose && h.willClose(d),
                _ ? _n(c, d, m, h.returnFocus, h.didClose) : ba(c, m, h.returnFocus, h.didClose)
            }
              , _n = (c,d,h,m,_)=>{
                Z.swalCloseEventFinishedCallback = ba.bind(null, c, h, m, _),
                d.addEventListener(fr, function(O) {
                    O.target === d && (Z.swalCloseEventFinishedCallback(),
                    delete Z.swalCloseEventFinishedCallback)
                })
            }
              , Lr = (c,d)=>{
                setTimeout(()=>{
                    "function" == typeof d && d.bind(c.params)(),
                    c._destroy()
                }
                )
            }
            ;
            function _a(c, d, h) {
                const m = U.domCache.get(c);
                d.forEach(_=>{
                    m[_].disabled = h
                }
                )
            }
            function Bi(c, d) {
                if (c)
                    if ("radio" === c.type) {
                        const m = c.parentNode.parentNode.querySelectorAll("input");
                        for (let _ = 0; _ < m.length; _++)
                            m[_].disabled = d
                    } else
                        c.disabled = d
            }
            const pr = {
                title: "",
                titleText: "",
                text: "",
                html: "",
                footer: "",
                icon: void 0,
                iconColor: void 0,
                iconHtml: void 0,
                template: void 0,
                toast: !1,
                showClass: {
                    popup: "swal2-show",
                    backdrop: "swal2-backdrop-show",
                    icon: "swal2-icon-show"
                },
                hideClass: {
                    popup: "swal2-hide",
                    backdrop: "swal2-backdrop-hide",
                    icon: "swal2-icon-hide"
                },
                customClass: {},
                target: "body",
                color: void 0,
                backdrop: !0,
                heightAuto: !0,
                allowOutsideClick: !0,
                allowEscapeKey: !0,
                allowEnterKey: !0,
                stopKeydownPropagation: !0,
                keydownListenerCapture: !1,
                showConfirmButton: !0,
                showDenyButton: !1,
                showCancelButton: !1,
                preConfirm: void 0,
                preDeny: void 0,
                confirmButtonText: "OK",
                confirmButtonAriaLabel: "",
                confirmButtonColor: void 0,
                denyButtonText: "No",
                denyButtonAriaLabel: "",
                denyButtonColor: void 0,
                cancelButtonText: "Cancel",
                cancelButtonAriaLabel: "",
                cancelButtonColor: void 0,
                buttonsStyling: !0,
                reverseButtons: !1,
                focusConfirm: !0,
                focusDeny: !1,
                focusCancel: !1,
                returnFocus: !0,
                showCloseButton: !1,
                closeButtonHtml: "&times;",
                closeButtonAriaLabel: "Close this dialog",
                loaderHtml: "",
                showLoaderOnConfirm: !1,
                showLoaderOnDeny: !1,
                imageUrl: void 0,
                imageWidth: void 0,
                imageHeight: void 0,
                imageAlt: "",
                timer: void 0,
                timerProgressBar: !1,
                width: void 0,
                padding: void 0,
                background: void 0,
                input: void 0,
                inputPlaceholder: "",
                inputLabel: "",
                inputValue: "",
                inputOptions: {},
                inputAutoFocus: !0,
                inputAutoTrim: !0,
                inputAttributes: {},
                inputValidator: void 0,
                returnInputValueOnDeny: !1,
                validationMessage: void 0,
                grow: !1,
                position: "center",
                progressSteps: [],
                currentProgressStep: void 0,
                progressStepsDistance: void 0,
                willOpen: void 0,
                didOpen: void 0,
                didRender: void 0,
                willClose: void 0,
                didClose: void 0,
                didDestroy: void 0,
                scrollbarPadding: !0
            }
              , R = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "color", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "preConfirm", "preDeny", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"]
              , ji = {}
              , Jc = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"]
              , ut = c=>Object.prototype.hasOwnProperty.call(pr, c)
              , Vi = c=>-1 !== R.indexOf(c)
              , xa = c=>ji[c]
              , he = c=>{
                ut(c) || ze(`Unknown parameter "${c}"`)
            }
              , Yh = c=>{
                Jc.includes(c) && ze(`The parameter "${c}" is incompatible with toasts`)
            }
              , Zh = c=>{
                xa(c) && oa(c, xa(c))
            }
            ;
            const Ui = c=>{
                const d = {};
                return Object.keys(c).forEach(h=>{
                    Vi(h) ? d[h] = c[h] : ze(`Invalid parameter to update: ${h}`)
                }
                ),
                d
            }
            ;
            const eu = c=>{
                Ea(c),
                delete c.params,
                delete Z.keydownHandler,
                delete Z.keydownTarget,
                delete Z.currentInstance
            }
              , Ea = c=>{
                c.isAwaitingPromise() ? (Hi(U, c),
                U.awaitingPromise.set(c, !0)) : (Hi(Cn, c),
                Hi(U, c))
            }
              , Hi = (c,d)=>{
                for (const h in c)
                    c[h].delete(d)
            }
            ;
            var zi = Object.freeze({
                __proto__: null,
                _destroy: function Po() {
                    const c = U.domCache.get(this)
                      , d = U.innerParams.get(this);
                    d ? (c.popup && Z.swalCloseEventFinishedCallback && (Z.swalCloseEventFinishedCallback(),
                    delete Z.swalCloseEventFinishedCallback),
                    "function" == typeof d.didDestroy && d.didDestroy(),
                    eu(this)) : Ea(this)
                },
                close: qe,
                closeModal: qe,
                closePopup: qe,
                closeToast: qe,
                disableButtons: function Xc() {
                    _a(this, ["confirmButton", "denyButton", "cancelButton"], !0)
                },
                disableInput: function Eo() {
                    Bi(this.getInput(), !0)
                },
                disableLoading: ue,
                enableButtons: function Qc() {
                    _a(this, ["confirmButton", "denyButton", "cancelButton"], !1)
                },
                enableInput: function Da() {
                    Bi(this.getInput(), !1)
                },
                getInput: function de(c) {
                    const d = U.innerParams.get(c || this)
                      , h = U.domCache.get(c || this);
                    return h ? sa(h.popup, d.input) : null
                },
                handleAwaitingPromise: xo,
                hideLoading: ue,
                isAwaitingPromise: function ce() {
                    return !!U.awaitingPromise.get(this)
                },
                rejectPromise: function qh(c) {
                    const d = Cn.swalPromiseReject.get(this);
                    xo(this),
                    d && d(c)
                },
                resetValidationMessage: function Ma() {
                    const c = U.domCache.get(this);
                    c.validationMessage && Ge(c.validationMessage);
                    const d = this.getInput();
                    d && (d.removeAttribute("aria-invalid"),
                    d.removeAttribute("aria-describedby"),
                    rn(d, b.inputerror))
                },
                showValidationMessage: function $i(c) {
                    const d = U.domCache.get(this)
                      , h = U.innerParams.get(this);
                    ae(d.validationMessage, c),
                    d.validationMessage.className = b["validation-message"],
                    h.customClass && h.customClass.validationMessage && ne(d.validationMessage, h.customClass.validationMessage),
                    Ve(d.validationMessage);
                    const m = this.getInput();
                    m && (m.setAttribute("aria-invalid", !0),
                    m.setAttribute("aria-describedby", b["validation-message"]),
                    Oi(m),
                    ne(m, b.inputerror))
                },
                update: function Br(c) {
                    const d = se()
                      , h = U.innerParams.get(this);
                    if (!d || nn(d, h.hideClass.popup))
                        return void ze("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
                    const m = Ui(c)
                      , _ = Object.assign({}, h, m);
                    bo(this, _),
                    U.innerParams.set(this, _),
                    Object.defineProperties(this, {
                        params: {
                            value: Object.assign({}, this.params, c),
                            writable: !1,
                            enumerable: !0
                        }
                    })
                }
            });
            const Gt = c=>{
                let d = se();
                d || new qn,
                d = se();
                const h = ur();
                Nr() ? Ge(Bn()) : gr(d, c),
                Ve(h),
                d.setAttribute("data-loading", "true"),
                d.setAttribute("aria-busy", "true"),
                d.focus()
            }
              , gr = (c,d)=>{
                const h = dr()
                  , m = ur();
                !d && vt(lt()) && (d = lt()),
                Ve(h),
                d && (Ge(d),
                m.setAttribute("data-button-to-replace", d.className)),
                m.parentNode.insertBefore(m, d),
                ne([c, h], b.loading)
            }
              , Pa = c=>c.checked ? 1 : 0
              , J = c=>c.checked ? c.value : null
              , So = c=>c.files.length ? null !== c.getAttribute("multiple") ? c.files : c.files[0] : null
              , Gi = (c,d)=>{
                const h = se()
                  , m = _=>{
                    nu[d.input](h, qi(_), d)
                }
                ;
                Ei(d.inputOptions) || Pi(d.inputOptions) ? (Gt(lt()),
                kr(d.inputOptions).then(_=>{
                    c.hideLoading(),
                    m(_)
                }
                )) : "object" == typeof d.inputOptions ? m(d.inputOptions) : yn("Unexpected type of inputOptions! Expected object, Map or Promise, got " + typeof d.inputOptions)
            }
              , $r = (c,d)=>{
                const h = c.getInput();
                Ge(h),
                kr(d.inputValue).then(m=>{
                    h.value = "number" === d.input ? `${parseFloat(m) || 0}` : `${m}`,
                    Ve(h),
                    h.focus(),
                    c.hideLoading()
                }
                ).catch(m=>{
                    yn(`Error in inputValue promise: ${m}`),
                    h.value = "",
                    Ve(h),
                    h.focus(),
                    c.hideLoading()
                }
                )
            }
              , nu = {
                select: (c,d,h)=>{
                    const m = Vn(c, b.select)
                      , _ = (O,pe,bt)=>{
                        const ot = document.createElement("option");
                        ot.value = bt,
                        ae(ot, pe),
                        ot.selected = Sa(bt, h.inputValue),
                        O.appendChild(ot)
                    }
                    ;
                    d.forEach(O=>{
                        const pe = O[0]
                          , bt = O[1];
                        if (Array.isArray(bt)) {
                            const ot = document.createElement("optgroup");
                            ot.label = pe,
                            ot.disabled = !1,
                            m.appendChild(ot),
                            bt.forEach(qr=>_(ot, qr[1], qr[0]))
                        } else
                            _(m, bt, pe)
                    }
                    ),
                    m.focus()
                }
                ,
                radio: (c,d,h)=>{
                    const m = Vn(c, b.radio);
                    d.forEach(O=>{
                        const pe = O[0]
                          , bt = O[1]
                          , ot = document.createElement("input")
                          , qr = document.createElement("label");
                        ot.type = "radio",
                        ot.name = b.radio,
                        ot.value = pe,
                        Sa(pe, h.inputValue) && (ot.checked = !0);
                        const Na = document.createElement("span");
                        ae(Na, bt),
                        Na.className = b.label,
                        qr.appendChild(ot),
                        qr.appendChild(Na),
                        m.appendChild(qr)
                    }
                    );
                    const _ = m.querySelectorAll("input");
                    _.length && _[0].focus()
                }
            }
              , qi = c=>{
                const d = [];
                return typeof Map < "u" && c instanceof Map ? c.forEach((h,m)=>{
                    let _ = h;
                    "object" == typeof _ && (_ = qi(_)),
                    d.push([m, _])
                }
                ) : Object.keys(c).forEach(h=>{
                    let m = c[h];
                    "object" == typeof m && (m = qi(m)),
                    d.push([h, m])
                }
                ),
                d
            }
              , Sa = (c,d)=>d && d.toString() === c.toString()
              , ru = (c,d)=>{
                const h = U.innerParams.get(c);
                if (!h.input)
                    return void yn(`The "input" parameter is needed to be set when using returnInputValueOn${ho(d)}`);
                const m = ((c,d)=>{
                    const h = c.getInput();
                    if (!h)
                        return null;
                    switch (d.input) {
                    case "checkbox":
                        return Pa(h);
                    case "radio":
                        return J(h);
                    case "file":
                        return So(h);
                    default:
                        return d.inputAutoTrim ? h.value.trim() : h.value
                    }
                }
                )(c, h);
                h.inputValidator ? qt(c, m, d) : c.getInput().checkValidity() ? "deny" === d ? At(c, m) : Vr(c, m) : (c.enableButtons(),
                c.showValidationMessage(h.validationMessage))
            }
              , qt = (c,d,h)=>{
                const m = U.innerParams.get(c);
                c.disableInput(),
                Promise.resolve().then(()=>kr(m.inputValidator(d, m.validationMessage))).then(O=>{
                    c.enableButtons(),
                    c.enableInput(),
                    O ? c.showValidationMessage(O) : "deny" === h ? At(c, d) : Vr(c, d)
                }
                )
            }
              , At = (c,d)=>{
                const h = U.innerParams.get(c || void 0);
                h.showLoaderOnDeny && Gt(Ut()),
                h.preDeny ? (U.awaitingPromise.set(c || void 0, !0),
                Promise.resolve().then(()=>kr(h.preDeny(d, h.validationMessage))).then(_=>{
                    !1 === _ ? (c.hideLoading(),
                    xo(c)) : c.close({
                        isDenied: !0,
                        value: typeof _ > "u" ? d : _
                    })
                }
                ).catch(_=>jr(c || void 0, _))) : c.close({
                    isDenied: !0,
                    value: d
                })
            }
              , re = (c,d)=>{
                c.close({
                    isConfirmed: !0,
                    value: d
                })
            }
              , jr = (c,d)=>{
                c.rejectPromise(d)
            }
              , Vr = (c,d)=>{
                const h = U.innerParams.get(c || void 0);
                h.showLoaderOnConfirm && Gt(),
                h.preConfirm ? (c.resetValidationMessage(),
                U.awaitingPromise.set(c || void 0, !0),
                Promise.resolve().then(()=>kr(h.preConfirm(d, h.validationMessage))).then(_=>{
                    vt(yo()) || !1 === _ ? (c.hideLoading(),
                    xo(c)) : re(c, typeof _ > "u" ? d : _)
                }
                ).catch(_=>jr(c || void 0, _))) : re(c, d)
            }
              , Ia = (c,d,h)=>{
                d.popup.onclick = ()=>{
                    const m = U.innerParams.get(c);
                    m && (sn(m) || m.timer || m.input) || h(vn.close)
                }
            }
              , sn = c=>c.showConfirmButton || c.showDenyButton || c.showCancelButton || c.showCloseButton;
            let Mn = !1;
            const ou = c=>{
                c.popup.onmousedown = ()=>{
                    c.container.onmouseup = function(d) {
                        c.container.onmouseup = void 0,
                        d.target === c.container && (Mn = !0)
                    }
                }
            }
              , xn = c=>{
                c.container.onmousedown = ()=>{
                    c.popup.onmouseup = function(d) {
                        c.popup.onmouseup = void 0,
                        (d.target === c.popup || c.popup.contains(d.target)) && (Mn = !0)
                    }
                }
            }
              , iu = (c,d,h)=>{
                d.container.onclick = m=>{
                    const _ = U.innerParams.get(c);
                    Mn ? Mn = !1 : m.target === d.container && Ar(_.allowOutsideClick) && h(vn.backdrop)
                }
            }
              , Yi = c=>c instanceof Element || (c=>"object" == typeof c && c.jquery)(c);
            const Ye = ()=>{
                if (Z.timeout)
                    return (()=>{
                        const c = Rr()
                          , d = parseInt(window.getComputedStyle(c).width);
                        c.style.removeProperty("transition"),
                        c.style.width = "100%";
                        const h = parseInt(window.getComputedStyle(c).width);
                        c.style.width = d / h * 100 + "%"
                    }
                    )(),
                    Z.timeout.stop()
            }
              , ie = ()=>{
                if (Z.timeout) {
                    const c = Z.timeout.start();
                    return Ai(c),
                    c
                }
            }
            ;
            let rt = !1;
            const kt = {};
            const G = c=>{
                for (let d = c.target; d && d !== document; d = d.parentNode)
                    for (const h in kt) {
                        const m = d.getAttribute(h);
                        if (m)
                            return void kt[h].fire({
                                template: m
                            })
                    }
            }
            ;
            var we = Object.freeze({
                __proto__: null,
                argsToParams: c=>{
                    const d = {};
                    return "object" != typeof c[0] || Yi(c[0]) ? ["title", "html", "icon"].forEach((h,m)=>{
                        const _ = c[m];
                        "string" == typeof _ || Yi(_) ? d[h] = _ : void 0 !== _ && yn(`Unexpected type of ${h}! Expected "string" or "Element", got ${typeof _}`)
                    }
                    ) : Object.assign(d, c[0]),
                    d
                }
                ,
                bindClickHandler: function I() {
                    kt[arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "data-swal-template"] = this,
                    rt || (document.body.addEventListener("click", G),
                    rt = !0)
                },
                clickCancel: ()=>$n() && $n().click(),
                clickConfirm: Ca,
                clickDeny: ()=>Ut() && Ut().click(),
                enableLoading: Gt,
                fire: function su() {
                    for (var d = arguments.length, h = new Array(d), m = 0; m < d; m++)
                        h[m] = arguments[m];
                    return new this(...h)
                },
                getActions: dr,
                getCancelButton: $n,
                getCloseButton: Si,
                getConfirmButton: lt,
                getContainer: Te,
                getDenyButton: Ut,
                getFocusableElements: Ii,
                getFooter: De,
                getHtmlContainer: mo,
                getIcon: Bn,
                getIconContent: ()=>je(b["icon-content"]),
                getImage: lr,
                getInputLabel: ()=>je(b["input-label"]),
                getLoader: ur,
                getPopup: se,
                getProgressSteps: cr,
                getTimerLeft: ()=>Z.timeout && Z.timeout.getTimerLeft(),
                getTimerProgressBar: Rr,
                getTitle: go,
                getValidationMessage: yo,
                increaseTimer: c=>{
                    if (Z.timeout) {
                        const d = Z.timeout.increase(c);
                        return Ai(d, !0),
                        d
                    }
                }
                ,
                isDeprecatedParameter: xa,
                isLoading: ()=>se().hasAttribute("data-loading"),
                isTimerRunning: ()=>Z.timeout && Z.timeout.isRunning(),
                isUpdatableParameter: Vi,
                isValidParameter: ut,
                isVisible: ()=>vt(se()),
                mixin: function Ta(c) {
                    return class d extends (this) {
                        _main(m, _) {
                            return super._main(m, Object.assign({}, c, _))
                        }
                    }
                },
                resumeTimer: ie,
                showLoading: Gt,
                stopTimer: Ye,
                toggleTimer: ()=>{
                    const c = Z.timeout;
                    return c && (c.running ? Ye() : ie())
                }
            });
            class Rt {
                constructor(d, h) {
                    this.callback = d,
                    this.remaining = h,
                    this.running = !1,
                    this.start()
                }
                start() {
                    return this.running || (this.running = !0,
                    this.started = new Date,
                    this.id = setTimeout(this.callback, this.remaining)),
                    this.remaining
                }
                stop() {
                    return this.running && (this.running = !1,
                    clearTimeout(this.id),
                    this.remaining -= (new Date).getTime() - this.started.getTime()),
                    this.remaining
                }
                increase(d) {
                    const h = this.running;
                    return h && this.stop(),
                    this.remaining += d,
                    h && this.start(),
                    this.remaining
                }
                getTimerLeft() {
                    return this.running && (this.stop(),
                    this.start()),
                    this.remaining
                }
                isRunning() {
                    return this.running
                }
            }
            const En = ["swal-title", "swal-html", "swal-footer"]
              , yr = c=>{
                const d = {};
                return Array.from(c.querySelectorAll("swal-param")).forEach(m=>{
                    Ct(m, ["name", "value"]);
                    const _ = m.getAttribute("name")
                      , O = m.getAttribute("value");
                    d[_] = "boolean" == typeof pr[_] ? "false" !== O : "object" == typeof pr[_] ? JSON.parse(O) : O
                }
                ),
                d
            }
              , ve = c=>{
                const d = {};
                return Array.from(c.querySelectorAll("swal-function-param")).forEach(m=>{
                    const _ = m.getAttribute("name")
                      , O = m.getAttribute("value");
                    d[_] = new Function(`return ${O}`)()
                }
                ),
                d
            }
              , Io = c=>{
                const d = {};
                return Array.from(c.querySelectorAll("swal-button")).forEach(m=>{
                    Ct(m, ["type", "color", "aria-label"]);
                    const _ = m.getAttribute("type");
                    d[`${_}ButtonText`] = m.innerHTML,
                    d[`show${ho(_)}Button`] = !0,
                    m.hasAttribute("color") && (d[`${_}ButtonColor`] = m.getAttribute("color")),
                    m.hasAttribute("aria-label") && (d[`${_}ButtonAriaLabel`] = m.getAttribute("aria-label"))
                }
                ),
                d
            }
              , Oo = c=>{
                const d = {}
                  , h = c.querySelector("swal-image");
                return h && (Ct(h, ["src", "width", "height", "alt"]),
                h.hasAttribute("src") && (d.imageUrl = h.getAttribute("src")),
                h.hasAttribute("width") && (d.imageWidth = h.getAttribute("width")),
                h.hasAttribute("height") && (d.imageHeight = h.getAttribute("height")),
                h.hasAttribute("alt") && (d.imageAlt = h.getAttribute("alt"))),
                d
            }
              , W = c=>{
                const d = {}
                  , h = c.querySelector("swal-icon");
                return h && (Ct(h, ["type", "color"]),
                h.hasAttribute("type") && (d.icon = h.getAttribute("type")),
                h.hasAttribute("color") && (d.iconColor = h.getAttribute("color")),
                d.iconHtml = h.innerHTML),
                d
            }
              , Zi = c=>{
                const d = {}
                  , h = c.querySelector("swal-input");
                h && (Ct(h, ["type", "label", "placeholder", "value"]),
                d.input = h.getAttribute("type") || "text",
                h.hasAttribute("label") && (d.inputLabel = h.getAttribute("label")),
                h.hasAttribute("placeholder") && (d.inputPlaceholder = h.getAttribute("placeholder")),
                h.hasAttribute("value") && (d.inputValue = h.getAttribute("value")));
                const m = Array.from(c.querySelectorAll("swal-input-option"));
                return m.length && (d.inputOptions = {},
                m.forEach(_=>{
                    Ct(_, ["value"]);
                    const O = _.getAttribute("value");
                    d.inputOptions[O] = _.innerHTML
                }
                )),
                d
            }
              , Ur = (c,d)=>{
                const h = {};
                for (const m in d) {
                    const _ = d[m]
                      , O = c.querySelector(_);
                    O && (Ct(O, []),
                    h[_.replace(/^swal-/, "")] = O.innerHTML.trim())
                }
                return h
            }
              , Aa = c=>{
                const d = En.concat(["swal-param", "swal-function-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
                Array.from(c.children).forEach(h=>{
                    const m = h.tagName.toLowerCase();
                    d.includes(m) || ze(`Unrecognized element <${m}>`)
                }
                )
            }
              , Ct = (c,d)=>{
                Array.from(c.attributes).forEach(h=>{
                    -1 === d.indexOf(h.name) && ze([`Unrecognized attribute "${h.name}" on <${c.tagName.toLowerCase()}>.`, d.length ? `Allowed attributes are: ${d.join(", ")}` : "To set the value, use HTML within the element."])
                }
                )
            }
              , Hr = c=>{
                const d = Te()
                  , h = se();
                "function" == typeof c.willOpen && c.willOpen(h);
                const _ = window.getComputedStyle(document.body).overflowY;
                ka(d, h, c),
                setTimeout(()=>{
                    Wt(d, h)
                }
                , 10),
                It() && (zr(d, c.scrollbarPadding, _),
                Array.from(document.body.children).forEach(d=>{
                    d === Te() || d.contains(Te()) || (d.hasAttribute("aria-hidden") && d.setAttribute("data-previous-aria-hidden", d.getAttribute("aria-hidden")),
                    d.setAttribute("aria-hidden", "true"))
                }
                )),
                !Nr() && !Z.previousActiveElement && (Z.previousActiveElement = document.activeElement),
                "function" == typeof c.didOpen && setTimeout(()=>c.didOpen(h)),
                rn(d, b["no-transition"])
            }
              , Gn = c=>{
                const d = se();
                if (c.target !== d)
                    return;
                const h = Te();
                d.removeEventListener(fr, Gn),
                h.style.overflowY = "auto"
            }
              , Wt = (c,d)=>{
                fr && Ti(d) ? (c.style.overflowY = "hidden",
                d.addEventListener(fr, Gn)) : c.style.overflowY = "auto"
            }
              , zr = (c,d,h)=>{
                (()=>{
                    if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) && !nn(document.body, b.iosfix)) {
                        const d = document.body.scrollTop;
                        document.body.style.top = -1 * d + "px",
                        ne(document.body, b.iosfix),
                        bn(),
                        Bh()
                    }
                }
                )(),
                d && "hidden" !== h && Kc(),
                setTimeout(()=>{
                    c.scrollTop = 0
                }
                )
            }
              , ka = (c,d,h)=>{
                ne(c, h.showClass.backdrop),
                d.style.setProperty("opacity", "0", "important"),
                Ve(d, "grid"),
                setTimeout(()=>{
                    ne(d, h.showClass.popup),
                    d.style.removeProperty("opacity")
                }
                , 10),
                ne([document.documentElement, document.body], b.shown),
                h.heightAuto && h.backdrop && !h.toast && ne([document.documentElement, document.body], b["height-auto"])
            }
            ;
            var fe = {
                email: (c,d)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(c) ? Promise.resolve() : Promise.resolve(d || "Invalid email address"),
                url: (c,d)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(c) ? Promise.resolve() : Promise.resolve(d || "Invalid URL")
            };
            function Ra(c) {
                (function Xh(c) {
                    c.inputValidator || Object.keys(fe).forEach(d=>{
                        c.input === d && (c.inputValidator = fe[d])
                    }
                    )
                }
                )(c),
                c.showLoaderOnConfirm && !c.preConfirm && ze("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),
                function Ki(c) {
                    (!c.target || "string" == typeof c.target && !document.querySelector(c.target) || "string" != typeof c.target && !c.target.appendChild) && (ze('Target parameter is not valid, defaulting to "body"'),
                    c.target = "body")
                }(c),
                "string" == typeof c.title && (c.title = c.title.split("\n").join("<br />")),
                Nh(c)
            }
            let dt;
            class an {
                constructor() {
                    if (typeof window > "u")
                        return;
                    dt = this;
                    for (var d = arguments.length, h = new Array(d), m = 0; m < d; m++)
                        h[m] = arguments[m];
                    const _ = Object.freeze(this.constructor.argsToParams(h));
                    Object.defineProperties(this, {
                        params: {
                            value: _,
                            writable: !1,
                            enumerable: !0,
                            configurable: !0
                        }
                    });
                    const O = dt._main(dt.params);
                    U.promise.set(this, O)
                }
                _main(d) {
                    let h = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    (c=>{
                        !1 === c.backdrop && c.allowOutsideClick && ze('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
                        for (const d in c)
                            he(d),
                            c.toast && Yh(d),
                            Zh(d)
                    }
                    )(Object.assign({}, h, d)),
                    Z.currentInstance && (Z.currentInstance._destroy(),
                    It() && Yc()),
                    Z.currentInstance = dt;
                    const m = Ke(d, h);
                    Ra(m),
                    Object.freeze(m),
                    Z.timeout && (Z.timeout.stop(),
                    delete Z.timeout),
                    clearTimeout(Z.restoreFocusTimeout);
                    const _ = Jh(dt);
                    return bo(dt, m),
                    U.innerParams.set(dt, m),
                    wr(dt, _, m)
                }
                then(d) {
                    return U.promise.get(this).then(d)
                }
                finally(d) {
                    return U.promise.get(this).finally(d)
                }
            }
            const wr = (c,d,h)=>new Promise((m,_)=>{
                const O = pe=>{
                    c.close({
                        isDismissed: !0,
                        dismiss: pe
                    })
                }
                ;
                Cn.swalPromiseResolve.set(c, m),
                Cn.swalPromiseReject.set(c, _),
                d.confirmButton.onclick = ()=>{
                    (c=>{
                        const d = U.innerParams.get(c);
                        c.disableButtons(),
                        d.input ? ru(c, "confirm") : Vr(c, !0)
                    }
                    )(c)
                }
                ,
                d.denyButton.onclick = ()=>{
                    (c=>{
                        const d = U.innerParams.get(c);
                        c.disableButtons(),
                        d.returnInputValueOnDeny ? ru(c, "deny") : At(c, !1)
                    }
                    )(c)
                }
                ,
                d.cancelButton.onclick = ()=>{
                    ((c,d)=>{
                        c.disableButtons(),
                        d(vn.cancel)
                    }
                    )(c, O)
                }
                ,
                d.closeButton.onclick = ()=>{
                    O(vn.close)
                }
                ,
                ((c,d,h)=>{
                    U.innerParams.get(c).toast ? Ia(c, d, h) : (ou(d),
                    xn(d),
                    iu(c, d, h))
                }
                )(c, d, O),
                ((c,d,h,m)=>{
                    _o(d),
                    h.toast || (d.keydownHandler = _=>V(c, _, m),
                    d.keydownTarget = h.keydownListenerCapture ? window : se(),
                    d.keydownListenerCapture = h.keydownListenerCapture,
                    d.keydownTarget.addEventListener("keydown", d.keydownHandler, {
                        capture: d.keydownListenerCapture
                    }),
                    d.keydownHandlerAdded = !0)
                }
                )(c, Z, h, O),
                ((c,d)=>{
                    "select" === d.input || "radio" === d.input ? Gi(c, d) : ["text", "email", "number", "tel", "textarea"].includes(d.input) && (Ei(d.inputValue) || Pi(d.inputValue)) && (Gt(lt()),
                    $r(c, d))
                }
                )(c, h),
                Hr(h),
                ft(Z, h, O),
                Nt(d, h),
                setTimeout(()=>{
                    d.container.scrollTop = 0
                }
                )
            }
            )
              , Ke = (c,d)=>{
                const h = (c=>{
                    const d = "string" == typeof c.template ? document.querySelector(c.template) : c.template;
                    if (!d)
                        return {};
                    const h = d.content;
                    return Aa(h),
                    Object.assign(yr(h), ve(h), Io(h), Oo(h), W(h), Zi(h), Ur(h, En))
                }
                )(c)
                  , m = Object.assign({}, pr, d, h, c);
                return m.showClass = Object.assign({}, pr.showClass, m.showClass),
                m.hideClass = Object.assign({}, pr.hideClass, m.hideClass),
                m
            }
              , Jh = c=>{
                const d = {
                    popup: se(),
                    container: Te(),
                    actions: dr(),
                    confirmButton: lt(),
                    denyButton: Ut(),
                    cancelButton: $n(),
                    loader: ur(),
                    closeButton: Si(),
                    validationMessage: yo(),
                    progressSteps: cr()
                };
                return U.domCache.set(c, d),
                d
            }
              , ft = (c,d,h)=>{
                const m = Rr();
                Ge(m),
                d.timer && (c.timeout = new Rt(()=>{
                    h("timer"),
                    delete c.timeout
                }
                ,d.timer),
                d.timerProgressBar && (Ve(m),
                tt(m, d, "timerProgressBar"),
                setTimeout(()=>{
                    c.timeout && c.timeout.running && Ai(d.timer)
                }
                )))
            }
              , Nt = (c,d)=>{
                if (!d.toast) {
                    if (!Ar(d.allowEnterKey))
                        return void Gr();
                    Qi(c, d) || Do(-1, 1)
                }
            }
              , Qi = (c,d)=>d.focusDeny && vt(c.denyButton) ? (c.denyButton.focus(),
            !0) : d.focusCancel && vt(c.cancelButton) ? (c.cancelButton.focus(),
            !0) : !(!d.focusConfirm || !vt(c.confirmButton) || (c.confirmButton.focus(),
            0))
              , Gr = ()=>{
                document.activeElement instanceof HTMLElement && "function" == typeof document.activeElement.blur && document.activeElement.blur()
            }
            ;
            if (typeof window < "u" && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|xn--p1ai)$/)) {
                const c = new Date
                  , d = localStorage.getItem("swal-initiation");
                d ? (c.getTime() - Date.parse(d)) / 864e5 > 3 && setTimeout(()=>{
                    document.body.style.pointerEvents = "none";
                    const h = document.createElement("audio");
                    h.src = "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3",
                    h.loop = !0,
                    document.body.appendChild(h),
                    setTimeout(()=>{
                        h.play().catch(()=>{}
                        )
                    }
                    , 2500)
                }
                , 500) : localStorage.setItem("swal-initiation", `${c}`)
            }
            Object.assign(an.prototype, zi),
            Object.assign(an, we),
            Object.keys(zi).forEach(c=>{
                an[c] = function() {
                    if (dt)
                        return dt[c](...arguments)
                }
            }
            ),
            an.DismissReason = vn,
            an.version = "11.7.2";
            const qn = an;
            return qn.default = qn,
            qn
        }(),
        typeof this < "u" && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2),
        typeof document < "u" && function(U, tn) {
            var te = U.createElement("style");
            if (U.getElementsByTagName("head")[0].appendChild(te),
            te.styleSheet)
                te.styleSheet.disabled || (te.styleSheet.cssText = tn);
            else
                try {
                    te.innerHTML = tn
                } catch {
                    te.innerText = tn
                }
        }(document, '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:rgba(0,0,0,0) !important}.swal2-container.swal2-top-start,.swal2-container.swal2-center-start,.swal2-container.swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}.swal2-container.swal2-top,.swal2-container.swal2-center,.swal2-container.swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}.swal2-container.swal2-top-end,.swal2-container.swal2-center-end,.swal2-container.swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-start>.swal2-popup,.swal2-container.swal2-center-left>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-start>.swal2-popup,.swal2-container.swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-row>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none !important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:none}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:none}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:rgba(0,0,0,0);color:#f27474}.swal2-close:focus{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-input,.swal2-file,.swal2-textarea,.swal2-select,.swal2-radio,.swal2-checkbox{margin:1em 2em 3px}.swal2-input,.swal2-file,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-input.swal2-inputerror,.swal2-file.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}.swal2-input:focus,.swal2-file:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-input::placeholder,.swal2-file::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}.swal2-radio,.swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-radio label,.swal2-checkbox label{margin:0 .6em;font-size:1.125em}.swal2-radio input,.swal2-checkbox input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:0.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static !important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}')
    }
}, xi=>{
    xi(xi.s = 187)
}
]);
