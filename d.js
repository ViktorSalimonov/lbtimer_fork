(() => {
    var g = {},
        f = {};
    this.Pacific = g;
    g.Date = function (a, d) {
        this.ms = this.s = this.mi = this.h = this.d = this.m = this.y = this._tzOff = this._uC = 0;
        d ? this.dP(new Date(a + " 00:00")) : this.tP((new Date(a)).getTime())
    };
    g.Date.prototype = {
        getDate: function () {
            return this.d
        },
        getFullYear: function () {
            return this.y
        },
        getMonth: function () {
            return this.m
        },
        getTime: function () {
            return this._timeProxy + 6E4 * this.getOff()
        },
        getOff: function () {
            this._uC || (this._tzOff = g.tz.getTzInfo(this._timeProxy), this._uC = 1);
            return this._tzOff
        },
        setHours: function (a) {
            var d = this._d;
            d.setHours(a);
            this.dP(d);
            return this.getTime()
        },
        dP: function (a) {
            this.y = a.getFullYear();
            this.m = a.getMonth();
            this.d = a.getDate();
            this.h = a.getHours();
            this.mi = a.getMinutes();
            this.s = a.getSeconds();
            this.ms = a.getMilliseconds();
            this._d = a;
            this._timeProxy = Date.UTC(this.y, this.m, this.d, this.h, this.mi, this.s, this.ms);
            this._uC = 0
        },
        tP: function (a) {
            var d = new Date(a),
                f = g.tz.getTzInfo(a, !0);
            d.setTime(a + 6E4 * (d.getTimezoneOffset() - f));
            this.dP(d)
        },
        valueOf: function () {
            return this.getTime()
        }
    };
    g.tz = new function () {
        function a(a, g) {
            var k = new Date(a),
                n = (a, h, l) => {
                    if ("u" === h) h = 0;
                    else {
                        if ("w" !== h && h) throw Error("unknown type " + h);
                        h = -(l[2] - 480)
                    }
                    h *= 6E4;
                    return new Date(a.getTime() + h)
                },
                p = (a, h) => {
                    var l = a[0],
                        b = a[1],
                        e;
                    f[l] || (f[l] = {});
                    if (f[l][b]) e = f[l][b];
                    else {
                        e = new Date(Date.UTC(l, b[0], b[1], 2, 0, 0, 0));
                        var c = e.getUTCDay();
                        e.setUTCDate(e.getUTCDate() + (0 - c + (0 < c ? 7 : 0)));
                        f[l][b] = e
                    }
                    h && (e = n(e, void 0, h));
                    return e
                },
                c = a => [
                    [a, [2, 8, 60]],
                    [a, [10, 1, 0]]
                ],
                m = (a, b, c) => {
                    var d, e;
                    a instanceof Date ? c && (a = n(a, g ? "u" : "w", c)) : (d = a[0], e = a[1], a = !c && f[d] && f[d][e] ? f[d][e] : p(a, c));
                    b instanceof Date ? c && (b = n(b, g ? "u" : "w", c)) : (d = b[0], e = b[1], b = !c && f[d] && f[d][e] ? f[d][e] : p(b, c));
                    a = Number(a);
                    b = Number(b);
                    return a - b
                },
                q = k.getUTCFullYear(),
                b;
            b = c(q);
            b.push(k);
            b.sort(m);
            2 > b.indexOf(k) && (b = b.concat(c(q - 1)), b.sort(m));
            c = b.indexOf(k);
            return 1 < c && 0 > m(k, b[c - 1], b[c - 2][1]) ? b[c - 2][1] : 0 < c && c < b.length - 1 && 0 < m(k, b[c + 1], b[c - 1][1]) ? b[c + 1][1] : 0 === c ? null : b[c - 1][1]
        }
        this.getTzInfo = (d, f) => {
            var k = 480,
                g = a(d, f);
            g && (k = -(g[2] - k));
            return k
        }
    }
}).call(window);