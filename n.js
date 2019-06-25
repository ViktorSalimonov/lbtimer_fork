/* Copyright 2014-2017 Ivan Nokonoko - See LICENSE*/
chrome.runtime.getBackgroundPage(function (f) {
    function Ta() {
        var a = D.indexOf.call(ca, this);
        O = D[a];
        b.getElementById("edidate").textContent = va(y[a]);
        for (var c = w[O], a = 7; a--;) T[a].classList.remove("error"), U[a].classList.remove("error"), V[a].classList.remove("error"), T[a].value = c ? (c[2 * a] / 60).toFixed(2) : "0.00", U[a].value = c ? c[2 * a + 1] : 0, V[a].value = c ? (c[14 + a] / 60).toFixed(2) : "0.00";
        n("editing")
    }

    function Ua() {
        var a = D.indexOf.call(W, this);
        y = X(new Date(k, t, a - G + 1));
        P = 0;
        H();
        L("weekscreen")
    }

    function Va(a) {
        a.target === this && (this.style.display = "none", wa.apply(this.firstChild))
    }

    function Wa(a) {
        var c = this.parentNode,
            d = parseInt(c.style.top) || 0,
            b = parseInt(c.style.left) || 0,
            h = parseInt(c.style.height),
            e = parseInt(c.style.width),
            g = a.clientX - b,
            f = a.clientY - d;
        this.onmousemove = a => {
            var d = a.clientX - g;
            a = a.clientY - f;
            d + e > innerWidth && (d = innerWidth - e);
            a + h > innerHeight && (a = innerHeight - h);
            0 > d && (d = 0);
            0 > a && (a = 0);
            c.style.left = d + "px";
            c.style.top = a + "px"
        }
    }

    function wa() {
        this.onmousemove = null
    }
    var b = document,
        I = chrome.runtime,
        w = {},
        y = [],
        A = y.findIndex,
        J = [],
        O = "",
        P = 0,
        ca = b.querySelectorAll("#weekly th:not(:first-child):not(.remark)"),
        W = b.querySelectorAll("#monthly td:not(:first-child)"),
        da = b.getElementById("mails"),
        T = b.querySelectorAll(".editAET"),
        V = b.querySelectorAll(".editxtra"),
        U = b.querySelectorAll(".edittasks"),
        xa = b.querySelectorAll(".dark"),
        ya = b.getElementById("histdate"),
        za = b.getElementById("adate"),
        Q = b.getElementById("impfil"),
        D = [],
        Y, t, u = 0,
        B = 0,
        k, l, G = 0,
        M = [],
        ea = b.getElementById("w"),
        fa = b.getElementById("rm"),
        ga = b.getElementById("rs"),
        Aa = b.querySelectorAll(".notif"),
        ha = b.getElementById("sooner"),
        ia = b.getElementById("later"),
        ja = b.getElementById("fdw"),
        ka = b.getElementById("ct"),
        Ba = b.querySelectorAll(".ttype"),
        Ca = b.getElementById("payrate"),
        Z = b.querySelectorAll(".lcrl"),
        aa = b.querySelectorAll(".ucrl"),
        Da = b.getElementById("dgh"),
        Ea = b.getElementById("dgm"),
        Fa = b.getElementById("wgh"),
        Ga = b.getElementById("wgm"),
        Ha = b.getElementById("mgh"),
        Ia = b.getElementById("mgm"),
        Xa = b.querySelector("span.preview"),
        Ja = b.getElementById("histasks"),
        la = b.getElementById("deldate"),
        ma = b.getElementById("delmonth"),
        Ka = b.getElementById("delfrom"),
        La = b.getElementById("delto"),
        na = b.getElementById("CSVm"),
        oa = b.getElementById("CSVf"),
        pa = b.getElementById("CSVt"),
        e = {
            command: "save",
            warningFactor: .85,
            autoReloadTime: 12E4,
            oflags: 5439,
            tflags: 0,
            sooner: 5,
            later: 5,
            payrate: 10,
            dailyWarn: 0,
            weeklyWarn: 0,
            monthlyWarn: 0,
            ct: 8E3,
            mls: "",
            fdw: 1,
            crl: [
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""]
            ]
        },
        ba = b.querySelectorAll("#delscreen [type=radio]"),
        qa = b.querySelectorAll("#exportscreen [name=CSVExp]"),
        K = {},
        p = b.querySelector(".preimp"),
        ra = b.querySelector("div.imp"),
        N = b.getElementById("dwnld"),
        L = a => {
            Y && (Y.style.display = "none");
            Y = window[a];
            Y.style.display = ""
        },
        n = a => {
            a = b.getElementById(a);
            var c = a.firstChild,
                d = parseInt(c.style.width),
                e = parseInt(c.style.height);
            c.style.left = d < innerWidth ? (innerWidth - d >> 1) + "px" : 0;
            c.style.top = e < innerHeight ? (innerHeight - e >> 1) + "px" : 0;
            a.style.display = "block"
        },
        R = () => {
            xa.forEach(a => {
                a.style.display = "none"
            })
        },
        va = a => a.getDate() + "." + ("0" + (a.getMonth() + 1)).slice(-2) + "." + a.getFullYear(),
        E = a => a.getFullYear() + ("0" + (a.getMonth() + 1)).slice(-2) + ("0" + a.getDate()).slice(-2),
        sa = a => a.reduce((a, d) => {
            a[d.name] = JSON.parse(d.description);
            return a
        }, {}),
        F = a => {
            a = a + .5 | 0;
            return 60 <= a ? (0 | a / 60) + "h " + ("0" + a % 60).slice(-2) + "m" : a % 60 + "m"
        },
        X = a => {
            a = new Date(a.setDate(a.getDate() - a.getDay() + (a.getDay() ? 1 : -6) * e.fdw));
            for (var c = [new Date(a)]; a.setDate(a.getDate() + 1) && a.getDay() != e.fdw;) c[c.length] = new Date(a);
            return c
        },
        Ma = (a, c) => {
            var d = E(a).substring(0, 6),
                b = E(c).substring(0, 6),
                h = [],
                e;
            if (c < a) return h;
            if (c == a) return [E(a)];
            if (d == b) {
                if (1 == a.getDate() && c.getDate() == (new Date(c.getFullYear(), c.getMonth() + 1, 0)).getDate()) return [d];
                for (; a <= c; a.setDate(a.getDate() + 1)) h[h.length] = E(a);
                return h
            }
            if (1 == a.getDate()) {
                h[h.length] = d;
                d = a.getFullYear();
                var g = a.getMonth() + 2;
                12 < g && (d++, g -= 12)
            } else {
                for (g = a.getMonth(); a.getMonth() == g; a.setDate(a.getDate() + 1)) h[h.length] = E(a);
                d = a.getFullYear();
                g = a.getMonth() + 1
            }
            for (e = d + ("0" + g).slice(-2); e < b;) h[h.length] = e, g++, 13 == g && (d++, g = 1), e = d + ("0" + g).slice(-2);
            if (c.getDate() == (new Date(c.getFullYear(), c.getMonth() + 1, 0)).getDate()) h[h.length] = e;
            else
                for (a = new Date(c.getFullYear(), c.getMonth(), 1); a <= c; a.setDate(a.getDate() + 1)) h[h.length] = E(a);
            return h
        },
        Ya = () => {
            B = !B;
            S()
        },
        H = () => {
            D = y.map(E);
            var a = D[0].slice(0, 6),
                c = D[6].slice(0, 6);
            ~J.indexOf(a) && ~J.indexOf(c) ? S() : (J = a == c ? [a] : [a, c], f.aG(J, a => {
                w = sa(a);
                S()
            }))
        },
        S = () => {
            for (var a = b.querySelectorAll("#weekly tr:not(.even) td:not(:first-child)"), c = 0, d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], x = 0, h = 0, f = 0, g = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" "), z = b.querySelectorAll("#weekly th:not(:first-child)"), l = b.querySelectorAll("#monthly th:not(:first-child)"), k = 0; 7 > k; k++) {
                var t = 0,
                    p = 0,
                    v = 0;
                z[k].textContent = g[k + e.fdw] + " " + va(y[k]);
                l[k].textContent = g[k + e.fdw];
                for (var m = 0; 7 > m; m++) {
                    var q = w[D[m]];
                    if (q) {
                        var r = q[2 * k],
                            n = q[2 * k + 1],
                            q = q[14 + k];
                        d[2 * m] += r;
                        d[2 * m + 1] += n;
                        d[14 + m] += q;
                        x += r;
                        h += q;
                        f += n;
                        a[c].dataset.aet = ((u ? r : q) / 60).toFixed(2);
                        a[c++].dataset.real = (q / 60).toFixed(2);
                        a[c++].dataset.tasks = n;
                        t += r;
                        p += q;
                        v += n
                    } else a[c].dataset.aet = a[c++].dataset.real = "0.00", a[c++].dataset.tasks = 0
                }
                a[c].dataset.aet = ((u ? t : p) / 60).toFixed(2);
                a[c++].dataset.real = (p / 60).toFixed(2);
                a[c++].dataset.tasks = v
            }
            for (g = 0; 7 > g; g++) a[c].dataset.aet = B ? F(d[u ? 2 * g : 14 + g] / 60) : (d[u ? 2 * g : 14 + g] / 60).toFixed(2), a[c].dataset.real = B ? F(d[14 + g] / 60) : (d[14 + g] / 60).toFixed(2), a[c++].title = "Earnings: " + (e.payrate * d[u ? 2 * g : 14 + g] / 3600).toFixed(2), a[c++].dataset.tasks = d[2 * g + 1];
            a[c].dataset.aet = B ? F((u ? x : h) / 60) : ((u ? x : h) / 60).toFixed(2);
            a[c].dataset.real = B ? F(h / 60) : (h / 60).toFixed(2);
            a[c++].title = "Earnings: " + (e.payrate * (u ? x : h) / 3600).toFixed(2);
            a[c++].dataset.tasks = f;
            ta()
        },
        Na = () => {
            var a = l.getFullYear() + ("0" + (l.getMonth() + 1)).slice(-2);
            ~J.indexOf(a) ? ta() : f.aG(a, c => {
                w = sa(c);
                J = [a];
                ta()
            })
        },
        ta = () => {
            var a = b.querySelectorAll(".mtable td:not(:first-child)"),
                c = f.y;
            P || (~D.indexOf(f.z) ? (t = c.getMonth(), k = c.getFullYear()) : (t = y[3].getMonth(), k = y[3].getFullYear()));
            b.getElementById("month").textContent = b.getElementById("monthly_month").textContent = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[t] + "-" + k;
            G = (new Date(k, t, 1)).getDay() - e.fdw;
            ~G || (G = 6);
            for (var d = (new Date(k, t + 1, 0)).getDate() + G - 1, x = 1, h = 0, l = 0, g = 0, z, n, p, C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], A = k + ("0" + (t + 1)).slice(-2), v = 0; 42 > v; v++) {
                var m = W[v];
                if (v < G || v > d) m.style.backgroundColor = "#ddd", m.dataset.day = m.dataset.aet = m.dataset.real = m.title = "";
                else {
                    z = n = p = 0;
                    m.dataset.day = x;
                    m.style.backgroundColor = "#FFF";
                    var q = A + ("0" + x++).slice(-2);
                    if (w[q]) {
                        for (var r = 7; r--;) C[3 * r] += w[q][3 * r], C[3 * r + 1] += w[q][3 * r + 1], C[3 * r + 2] += w[q][3 * r + 2], z += w[q][14 + r], n += w[q][2 * r], p += w[q][2 * r + 1];
                        h += z;
                        l += n;
                        g += p;
                        m.dataset.aet = F(u ? n / 60 : z / 60);
                        m.dataset.real = F(z / 60);
                        m.title = "Earnings: " + (e.payrate * (u ? n : z) / 3600).toFixed(2)
                    } else m.dataset.aet = m.dataset.real = "0m", m.title = "Earnings: 0.00"
                }
            }
            b.querySelector("#monthly tr:last-child").style.display = 34 < d ? "table-row" : "none";
            v = 0;
            for (d = b.querySelectorAll("col:not(:first-child):not(:last-child)"); 7 > v; v++) x = 2 * v, z = D[v] == f.z, a[x].dataset.aet = u ? (C[x] / 60).toFixed(2) : (C[14 + v] / 60).toFixed(2), a[x].dataset.real = (C[14 + v] / 60).toFixed(2), a[x + 1].dataset.tasks = C[x + 1], d[v].style.backgroundColor = z ? "#FFD180" : "#fff", ca[v].style.fontWeight = z ? "bold" : "normal";
            a[14].dataset.aet = B ? F((u ? l : h) / 60) : ((u ? l : h) / 60).toFixed(2);
            a[14].dataset.real = B ? F(h / 60) : (h / 60).toFixed(2);
            a[14].title = "Earnings: " + (e.payrate * (u ? l : h) / 3600).toFixed(2);
            a[15].dataset.tasks = g;
            c.getMonth() == t && c.getFullYear() == k && (W[G + c.getDate() - 1].style.backgroundColor = "#FFD180")
        },
        ua = () => {
            u = 1024 & f.o.oflags;
            B = 32768 & f.o.oflags ? 1 : 0;
            J = [];
            l = f.y;
            y = X(new Date(l));
            k = l.getFullYear();
            t = l.getMonth();
            H()
        },
        Oa = () => {
            l = f.y;
            y = X(new Date(l));
            k = l.getFullYear();
            t = l.getMonth();
            H()
        },
        Qa = () => {
            for (var a in f.o) e[a] = f.o[a];
            var c = 100 * e.warningFactor;
            Aa.forEach(a => {
                a.checked = e.oflags & a.value
            });
            Ba.forEach(a => {
                a.checked = e.tflags & a.value
            });
            a = e.autoReloadTime / 1E3;
            var d = 0 | a / 60,
                b = a % 60;
            ea.selectedIndex = A.call(ea, a => a.value == c);
            ha.selectedIndex = A.call(ha, a => a.value == e.sooner);
            ia.selectedIndex = A.call(ia, a => a.value == e.later);
            fa.selectedIndex = A.call(fa, a => a.value == d);
            ga.selectedIndex = A.call(ga, a => a.value == b);
            ja.selectedIndex = A.call(ja, a => a.value == e.fdw);
            ka.selectedIndex = A.call(ka, a => a.value == e.ct);
            for (a = 5; a--;) Z[a].value = e.crl[a][0], aa[a].value = e.crl[a][1];
            Ca.value = e.payrate;
            Da.value = 0 | e.dailyWarn / 60 || "";
            Ea.value = e.dailyWarn % 60;
            Fa.value = 0 | e.weeklyWarn / 60 || "";
            Ga.value = e.weeklyWarn % 60;
            Ha.value = 0 | e.monthlyWarn / 60 || "";
            Ia.value = e.monthlyWarn % 60;
            da.value = e.mls || "";
            Pa()
        },
        $a = () => {
            e.warningFactor = (0 | ea.value) / 100;
            e.autoReloadTime = (0 | 6E4 * fa.value) + (0 | 1E3 * ga.value);
            e.sooner = 0 | ha.value;
            e.later = 0 | ia.value;
            e.fdw = 0 | ja.value;
            e.ct = 0 | ka.value;
            var a = parseFloat(Ca.value);
            isNaN(a) || (e.payrate = a);
            e.oflags = e.tflags = 0;
            Aa.forEach(a => {
                a.checked && (e.oflags = e.oflags | 0 | a.value)
            });
            Ba.forEach(a => {
                a.checked && (e.tflags = e.tflags | 0 | a.value)
            });
            for (a = 5; a--;) e.crl[a] = [Z[a].value.trim(), aa[a].value.trim()];
            e.dailyWarn = 60 * ~~Da.value + ~~Ea.value || 0;
            e.weeklyWarn = 60 * ~~Fa.value + ~~Ga.value || 0;
            e.monthlyWarn = 60 * ~~Ha.value + ~~Ia.value || 0;
            e.mls = da.value = Za(da.value);
            I.sendMessage(e)
        },
        Za = a => {
            var c = [],
                c = a.replace(/\s/g, "").split(";").reduce((a, c) => {
                    /^[\w\.]+@[\w\.]+\.\w\w\w?$/.test(c) && (a[a.length] = c);
                    return a
                }, []);
            return c.join(";")
        },
        Pa = () => {
            for (var a = 0, c = ""; 5 > a; a++)
                if (Z[a].value && aa[a].value) var b = aa[a].value.replace(/\%url/gi, "http://www.example.com/subpage1/subpage2").replace(/\%main/gi, "http://www.example.com").replace(/\%host/gi, "example.com"),
                    c = c + (' - <a href="' + (b.indexOf("http") ? "https://www.google.com/search?q=" + encodeURIComponent(b) : b) + '" target=_blank>' + Z[a].value + "</a>");
            Xa.innerHTML = c
        },
        ab = a => {
            var c = {};
            a.split("\n").forEach(a => {
                a = a.split(",");
                var b = Date.parse(a.shift());
                if ((b = b ? E(new Date(b)) : "") && 21 === a.length) {
                    for (var d = [], e = 0, g = 0; 7 > e; e++) d[2 * e + 1] = ~~a[g++], d[2 * e] = ~~a[g++], d[14 + e] = ~~a[g++];
                    c[b] = d
                }
            });
            return c
        },
        Ra = a => {
            var c = new FileReader;
            c.onload = () => {
                K = ab(c.result);
                bb()
            };
            c.readAsText(a)
        },
        bb = () => {
            var a = a => a.slice(6) + "-" + a.slice(4, 6) + "-" + a.slice(0, 4),
                c = a => {
                    for (var c = "DB EXP IRR RR SXS TTR URL".split(" "), b = [], d = 0; 7 > d; d++) a[2 * d + 1] && (b[b.length] = a[2 * d + 1] + " " + c[d]);
                    return b.join(" - ")
                },
                b = "Bad file or no records found";
            if (Object.keys(K).length) {
                var b = "<table><tr><td><b>Date<td><b>Records",
                    e;
                for (e in K) b += "<tr><td>" + a(e) + "<td>" + c(K[e]);
                ra.style.display = "block"
            }
            p.innerHTML = b
        },
        cb = a => {
            M = a.filter(a => /^https?:\/\/www\.raterhub\.com/.test(a.url));
            b.getElementById("histable").innerHTML = "<tr><td>Task Id<td>Local time" + M.map(a => "<tr><td>" + /kIds=(\d+)/i.exec(a.url)[1] + "<td>" + (new Date(a.lastVisitTime)).toLocaleTimeString()).join("");
            Ja.textContent = " Tasks acquired: " + M.length;
            b.getElementById("expHist").style.display = ""
        };
    ya.onchange = () => {
        Ja.textContent = " Loading...";
        I.sendMessage({
            command: "history",
            when: ya.value
        }, cb)
    };
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (a, c) {
        c = c || window;
        for (var b = 0; b < this.length; b++) a.call(c, this[b], b, this)
    });
    b.getElementById("expHist").onclick = () => {
        if (M.length) {
            var a = ["Task Id,Acquisition time"];
            M.forEach(b => {
                a[a.length] = "" + [/kIds=(\d+)/i.exec(b.url)[1], (new Date(b.lastVisitTime)).toLocaleTimeString()]
            });
            N.href = "data:attachment/csv," + encodeURIComponent(a.join("\n"));
            N.download = E(new Date(M[0].lastVisitTime)) + ".csv";
            N.click();
            R()
        }
    };
    b.getElementById("apply").onclick = () => {
        var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            c = 0,
            d;
        for (d = 7; d--;) T[d].classList.toggle("error", isNaN(a[2 * d] = parseFloat(T[d].value))) && c++, U[d].classList.toggle("error", isNaN(a[2 * d + 1] = 0 | U[d].value)) && c++, V[d].classList.toggle("error", isNaN(a[14 + d] = parseFloat(V[d].value))) && c++;
        if (!c) {
            for (d = 7; d--;) a[2 * d] = Math.round(60 * a[2 * d]), a[14 + d] = Math.round(60 * a[14 + d]);
            f.aJ(O, a, () => {
                O == f.z && (f.e = a);
                w[O] = a;
                S()
            });
            b.getElementById("editing").style.display = "none"
        }
    };
    b.getElementById("wprev").onclick = () => {
        y.map(a => {
            a.setDate(a.getDate() - 7)
        });
        H()
    };
    b.getElementById("wtoday").onclick = b.getElementById("mtoday").onclick = Oa;
    b.getElementById("wnext").onclick = () => {
        y.map(a => {
            a.setDate(a.getDate() + 7)
        });
        H()
    };
    b.getElementById("mprev").onclick = () => {
        l = new Date(k, --t);
        k = l.getFullYear();
        t = l.getMonth();
        Na()
    };
    b.getElementById("mnext").onclick = () => {
        l = new Date(k, ++t);
        k = l.getFullYear();
        t = l.getMonth();
        Na()
    };
    za.onchange = () => {
        y = X(new Date(za.value));
        H()
    };
    la.onchange = () => {
        ba[0].checked = !0
    };
    ma.onchange = () => {
        ba[1].checked = !0
    };
    Ka.onchange = La.onchange = () => {
        ba[2].checked = !0
    };
    b.getElementById("doDEL").onclick = () => {
        var a = [];
        var b = a => {
            confirm("Selected records will be permanently deleted. Are you sure?") && f.aG(a, a => {
                a.length && f.aK(a.map(a => a.id), () => {
                    ua();
                    R()
                }, 1)
            })
        };
        a = A.call(ba, a => a.checked);
        switch (a) {
            case 0:
                la.value && b(la.value.replace(/-/g, ""));
                break;
            case 1:
                ma.value && b(ma.value.replace("-", ""));
                break;
            case 2:
                a = Ka.value;
                var d = La.value;
                a && d && (a = new Date(a), d = new Date(d), a = Ma(a, d), a.length && b(a))
        }
    };
    na.onchange = () => {
        qa[1].checked = !0
    };
    oa.onchange = pa.onchange = () => {
        qa[2].checked = !0
    };
    b.getElementById("doExport").onclick = () => {
        var a = [],
            b = a => {
                f.aG(a, a => {
                    a = sa(a);
                    var b = ["Date,DB Tasks,DB AET,DB Real,EXP Tasks,EXP AET,EXP Real,IRR Tasks,IRR AET,IRR Real,RR Tasks,RR AET,RR Real,SXS Tasks,SXS AET,SXS Real,TTR Tasks,TTR AET,TTR Real,URL Tasks,URL AET,URL Real"];
                    delete a.settings;
                    delete a.S2D;
                    for (var c in a) {
                        var d = c;
                        d = d.slice(0, 4) + "/" + d.slice(4, 6) + "/" + d.slice(6);
                        for (var e = 0; 7 > e; e++) d += "," + [a[c][2 * e + 1], a[c][2 * e], a[c][14 + e]];
                        b[b.length] = d
                    }
                    N.href = "data:attachment/csv," + encodeURIComponent(b.join("\n"));
                    N.download = "LBTimer.csv";
                    N.click();
                    R()
                })
            };
        switch (A.call(qa, a => a.checked)) {
            case 0:
                b(f.z);
                break;
            case 1:
                na.value && b(na.value.replace("-", ""));
                break;
            case 2:
                if (oa.value && pa.value) {
                    a = new Date(oa.value);
                    var d = new Date(pa.value);
                    a = Ma(a, d);
                    a.length && b(a)
                }
                break;
            case 3:
                b("")
        }
    };
    Q.onchange = () => {
        Q.files.length && Ra(Q.files[0])
    };
    p.addEventListener("dragenter", a => {
        p.classList.add("drop");
        a.stopPropagation();
        a.preventDefault()
    }, !1);
    p.addEventListener("dragleave", a => {
        p.classList.remove("drop");
        a.stopPropagation();
        a.preventDefault()
    }, !1);
    p.addEventListener("dragover", a => {
        a.stopPropagation();
        a.preventDefault()
    }, !1);
    p.addEventListener("drop", a => {
        a.stopPropagation();
        a.preventDefault();
        p.classList.remove("drop");
        Ra(a.dataTransfer.files[0])
    }, !1);
    b.body.onkeydown = a => {
        27 == a.keyCode && R()
    };
    xa.forEach(a => {
        a.onclick = Va
    });
    b.getElementById("log").onclick = () => {
        I.sendMessage({
            command: "openLog"
        })
    };
    b.getElementById("lbLatMonthlyView").onclick = () => {
        L("monthscreen");
        P = 1
    };
    b.getElementById("lbLatWeeklyView").onclick = () => {
        L("weekscreen");
        P = 0;
        H()
    };
    b.getElementById("lbLatSettings").onclick = () => {
        Qa();
        n("settingsscreen")
    };
    b.getElementById("lbLatExport").onclick = () => {
        n("exportscreen")
    };
    b.getElementById("lbLatClock").onclick = () => {
        I.sendMessage({
            command: "clock"
        })
    };
    b.getElementById("lbLatDel").onclick = () => {
        n("delscreen")
    };
    b.getElementById("lbLatHis").onclick = () => {
        n("histscreen")
    };
    b.getElementById("lbLatWhatsNew").onclick = () => {
        n("whatsnew")
    };
    b.getElementById("lbLatContact").onclick = () => {
        n("contactscreen")
    };
    b.getElementById("sndmsg").onclick = () => {
        var a = b.getElementById("msg");
        a.value ? I.sendMessage({
            command: "email",
            msg: a.value
        }) : (a.classList.add("err"), setTimeout(() => {
            a.classList.remove("err")
        }, 1E3))
    };
    I.onMessage.addListener(a => {
        switch (a.command) {
            case "updatesheet":
                u = 1024 & f.o.oflags;
                B = 32768 & f.o.oflags ? 1 : 0;
                w[f.z] = f.e;
                S();
                break;
            case "refreshsheet":
                ua();
                break;
            case "od":
                Qa(), n(a.which)
        }
    });
    ca.forEach(function (a) {
        a.onclick = Ta;
        a.title = "Click to edit this day's record"
    });
    W.forEach(a => {
        a.onclick = Ua
    });
    b.getElementById("month").onclick = () => {
        L("monthscreen");
        P = 1
    };
    b.querySelectorAll(".totals").forEach(a => {
        a.onclick = Ya
    });
    b.querySelectorAll(".drag").forEach(a => {
        a.onmousedown = Wa;
        a.onmouseup = a.onmouseout = wa
    });
    b.querySelectorAll("#settingsscreen input:not([name=stngs]),select").forEach(a => {
        a.onchange = $a
    });
    b.querySelectorAll(".lcrl,.ucrl").forEach(a => {
        a.oninput = Pa
    });
    b.getElementById("doimp").onclick = () => {
        confirm("Selected records will be overwritten. Are you sure?") && f.aM(K, a => {
            Q.value = "";
            K = {};
            p.innerHTML = "Choose file or drop it here";
            ra.style.display = "none";
            R();
            ua()
        }, 1)
    };
    b.getElementById("noimp").onclick = () => {
        Q.value = "";
        K = {};
        p.innerHTML = "Choose file or drop it here";
        ra.style.display = "none"
    };
    for (var Sa in f.o) e[Sa] = f.o[Sa];
    u = 1024 & e.oflags;
    B = 32768 & e.oflags ? 1 : 0;
    Oa();
    1 == f.T ? (f.T = 0, L("welcome")) : (L("weekscreen"), 2 == f.T && (n("whatsnew"), f.T = 0));
    I.sendMessage({
        command: "panelopen"
    })
});