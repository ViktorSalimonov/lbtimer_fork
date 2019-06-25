/* Copyright 2014-2017 Ivan Nokonoko - See LICENSE*/
function S(b) {
    (b.shiftKey || b.ctrlKey) && m.sendMessage({
        command: "op",
        link: this.dataset.oldhref || this.getAttribute("oldhref") || this.href
    })
}
var m = chrome.runtime,
    c = document,
    p = [],
    t = [],
    u, K, r, z, E, F = [],
    A = "",
    v = [],
    w = [],
    y = 0,
    G = 10,
    H = [],
    B = [],
    n = [],
    x = [],
    I = [],
    O, J, C, D, T = b => {
        var g = I.find(g => b & g.type);
        g && g.link.click()
    },
    U = () => {
        c.querySelectorAll(".ewok-rater-task-option li").forEach(b => {
            I[I.length] = {
                link: b.querySelector(".button"),
                type: 0 | Math.pow(2, [/di/i, /ex/i, /g/i, /res/i, /si/i, /tim/i, /ur/i].findIndex(g => g.test(b.textContent)))
            }
        })
    },
    L = (b, g, c, k) => {
        b.dispatchEvent(new MouseEvent(g, {
            view: window,
            bubbles: !0,
            cancelable: !0,
            clientX: c,
            clientY: k,
            button: 0
        }))
    },
    V = b => {
        for (var g = 0, c = [], k = b.length; g < k;) c[c.length] = b[g++].querySelector(".ewok-buds-flag-label").textContent;
        return c
    },
    W = b => {
        for (var g = 0, c = [], k = b.length; g < k;) c[c.length] = b[g++].title;
        return c
    },
    X = () => {
        var b = "";
        if (J = c.querySelector(".pq-task-main-info")) b = J.querySelector("a").textContent;
        return b
    },
    Y = function (b) {
        m.sendMessage({
            command: "tcrl",
            w: this.dataset.crl,
            s: b.ctrlKey || b.shiftKey
        })
    },
    Z = b => {
        for (var g = "<b style=color:#f40>LBTimer</b>", h = 0, k = 0; 5 > h; h++) b[h][1] && (g += " - <span class=lbcrl style=color:#006;cursor:pointer data-crl=" + h + ">" + (b[h][0] || "no label") + "</span>", k = 1);
        k && ((b = c.getElementById("lbpq")) ? b.innerHTML = g : (b = c.createElement("div"), b.id = "lbpq", b.innerHTML = g, J.parentNode.insertBefore(b, J.nextSibling)), c.querySelectorAll(".lbcrl").forEach(a => {
            a.onclick = Y
        }))
    },
    P = () => {
        var b, g = {
                u: [],
                q: [],
                flags: [],
                comment: [],
                selDup: [],
                finDup: [],
                markDup: []
            },
            h = {
                u: [],
                q: [],
                flags: [],
                comment: [],
                selDup: [],
                finDup: [],
                markDup: []
            };
        r = c.getElementsByClassName("ewok-task-query");
        r.length ? A = r[r.length - 1].textContent : (r = c.getElementsByClassName("query-info-query"), r.length && (A = r[r.length - 1].querySelector("strong").textContent));
        var k = c.getElementsByClassName("ewok-buds-side");
        if (k.length) {
            var a = c.querySelectorAll(".ewok-buds-result-controls");
            var f = 0;
            for (b = a.length; f < b; f++)
                if (a[f].querySelector(".evl-slider2")) {
                    var d = a[f];
                    break
                } if (d) {
                F = V(d.getElementsByClassName("ewok-buds-flag"));
                b = d.querySelector(".evl-slider2-slider").getElementsByClassName("evl-slider2-tick-big");
                f = d.querySelector(".evl-slider2-slider").getElementsByClassName("evl-slider2-tick-small");
                if (f.length) {
                    p[0] = .1;
                    p[1] = parseFloat(b[1].style.left) / 100;
                    var e = b.length - 2;
                    for (a = 0; a < e; a++) p[p.length] = parseFloat(f[a].style.left) / 100, p[p.length] = parseFloat(b[a + 2].style.left) / 100;
                    y = 2 * b.length - 2;
                    b = d.querySelectorAll(".evl-slider2-tick-labels .evl-slider2-tick-label");
                    f = b.length;
                    a = d = 0;
                    for (e = []; a < f; a++) e[a] = b[a].textContent;
                    n[0] = "N/A" == e[0] || "NA" == e[0] ? e[d++] : "N/A";
                    n[1] = e[d];
                    for (a = 2; a < f; a++) n[n.length] = e[d++] + "+", n[n.length] = e[d]
                } else {
                    y = b.length;
                    for (a = 0; a < y; a++) p[a] = parseFloat(b[a].style.left) / 100;
                    b = d.querySelectorAll(".evl-slider2-tick-labels .evl-slider2-tick-label");
                    f = b.length;
                    a = d = 0;
                    for (e = []; a < f; a++) e[a] = b[a].textContent;
                    "N/A" == e[0] || "NA" == e[0] ? n[0] = e[d++] : (n[0] = "N/A", f++);
                    for (a = 1; a < f; a++) n[a] = e[d++]
                }
                p[0] = .1;
                p[p.length - 1] = .99
            }
            d = c.querySelector(".ewok-buds-result-controls .ewok-buds-slider:nth-child(2) .evl-slider2");
            if (null != d) {
                t = [];
                b = d.getElementsByClassName("evl-slider2-tick-big");
                f = d.getElementsByClassName("evl-slider2-tick-small");
                if (f.length) {
                    t[0] = .1;
                    t[1] = parseFloat(b[1].style.left) / 100;
                    e = b.length - 2;
                    for (a = 0; a < e; a++) t[t.length] = parseFloat(f[a].style.left) / 100, t[t.length] = parseFloat(b[a + 2].style.left) / 100;
                    b = d.getElementsByClassName("evl-slider2-tick-label");
                    f = b.length;
                    a = d = 0;
                    for (e = []; a < f; a++) e[a] = b[a].textContent;
                    x[0] = "N/A" == e[0] || "NA" == e[0] ? e[d++] : "N/A";
                    x[1] = e[d];
                    for (a = 2; a < f; a++) x[x.length] = e[d++] + "+", x[x.length] = e[d]
                } else {
                    a = 0;
                    for (e = b.length; a < e; a++) t[a] = parseFloat(b[a].style.left) / 100;
                    b = d.getElementsByClassName("evl-slider2-tick-label");
                    f = b.length;
                    a = d = 0;
                    for (e = []; a < f; a++) e[a] = b[a].textContent;
                    "N/A" == e[0] || "NA" == e[0] ? x[0] = e[d++] : (x[0] = "N/A", f++);
                    for (a = 1; a < f; a++) x[a] = e[d++]
                }
                G = t.length;
                t[0] = .1;
                t[G - 1] = .99
            }
            var q = k[0].getElementsByClassName("ewok-buds-result-html");
            var l = k[0].getElementsByClassName("ewok-buds-result-controls");
            var m = k[0].getElementsByClassName("ewok-buds-result-header");
            e = q.length;
            for (a = 0; a < e; a++) {
                b = q[a].querySelector("a");
                v[a] = "nolp.html";
                if (b) v[a] = b.dataset.oldhref || b.getAttribute("oldhref") || b.href;
                else if (b = q[a].querySelector("iframe"))
                    if (f = c.createElement("div"), d = b.src, ~d.indexOf("64,")) {
                        if (f.innerHTML = atob(d.slice(d.indexOf("64,") + 3)), d = f.querySelector("a")) v[a] = d.href
                    } else D = 1, f = b.contentWindow ? b.contentWindow.document : b.contentDocument, (d = f.querySelector("a")) && (v[a] = d.dataset.oldhref || d.getAttribute("oldhref") || d.href);
                l[a].classList.contains("ewok-buds-is-inline-contextual") && (v[a] = 0 + v[a]);
                g.u[a] = l[a].querySelector(".evl-slider2-slider");
                H[a] = !!(g.q[a] = l[a].getElementsByClassName("evl-slider2-slider")[1] || null);
                g.flags[a] = l[a].getElementsByClassName("ewok-buds-flag");
                g.comment[a] = l[a].querySelector(".ewok-buds-comment-textarea");
                g.selDup[a] = m[a].querySelector(".ewok-buds-result-edit-dupes-link");
                g.finDup[a] = m[a].querySelector(".ewok-buds-result-finish-dupes-link");
                g.markDup[a] = m[a].querySelector(".ewok-buds-result-dupes-checkbox")
            }
            if (1 < k.length)
                for (q = k[1].getElementsByClassName("ewok-buds-result-html"), l = k[1].getElementsByClassName("ewok-buds-result-controls"), m = k[1].getElementsByClassName("ewok-buds-result-header"), e = q.length, a = 0; a < e; a++) {
                    b = q[a].querySelector("a");
                    w[a] = "nolp.html";
                    if (b) w[a] = b.dataset.oldhref || b.getAttribute("oldhref") || b.href;
                    else if (b = q[a].querySelector("iframe"))
                        if (f = c.createElement("div"), d = b.src, ~d.indexOf("64,")) {
                            if (f.innerHTML = atob(d.slice(d.indexOf("64,") + 3)), d = f.querySelector("a")) w[a] = d.href
                        } else D = 1, f = b.contentWindow ? b.contentWindow.document : b.contentDocument, (d = f.querySelector("a")) && (w[a] = d.dataset.oldhref || d.getAttribute("oldhref") || d.href);
                    l[a].classList.contains("ewok-buds-is-inline-contextual") && (w[a] = 0 + w[a]);
                    h.u[a] = l[a].querySelector(".evl-slider2-slider");
                    B[B.length] = !!(h.q[a] = l[a].getElementsByClassName("evl-slider2-slider")[1] || null);
                    h.flags[a] = l[a].getElementsByClassName("ewok-buds-flag");
                    h.comment[a] = l[a].querySelector(".ewok-buds-comment-textarea");
                    h.selDup[a] = m[a].querySelector(".ewok-buds-result-edit-dupes-link");
                    h.finDup[a] = m[a].querySelector(".ewok-buds-result-finish-dupes-link");
                    h.markDup[a] = m[a].querySelector(".ewok-buds-result-dupes-checkbox")
                }
            K = c.querySelector(".ewok-buds-query-container");
            z = c.getElementById("ewok-buds-validation-nomoredupes");
            u = [g, h]
        } else if (k = c.getElementsByClassName("sxs-side"), k.length && c.getElementsByClassName("ewokui-slider-horizontal").length) {
            if (d = c.querySelector(".rating-bar"))
                if (F = W(d.getElementsByClassName("ewok-flag")), b = d.querySelector(".ewokui-slider-horizontal").getElementsByClassName("ewokui-slider-horizontal-bigmark"), f = d.querySelector(".ewokui-slider-horizontal").getElementsByClassName("ewokui-slider-horizontal-smallmark"), f.length) {
                    p[0] = .1;
                    p[1] = parseFloat(b[1].style.left) / 100;
                    e = b.length - 2;
                    for (a = 0; a < e; a++) p[p.length] = parseFloat(f[a].style.left) / 100, p[p.length] = parseFloat(b[a + 2].style.left) / 100;
                    y = 2 * b.length - 2;
                    b = d.querySelector(".ewokui-slider-horizontal").getElementsByClassName("ewokui-slider-horizontal-displaytext");
                    f = b.length;
                    a = d = 0;
                    for (e = []; a < f; a++) e[a] = b[a].textContent;
                    n[0] = "N/A" == e[0] || "NA" == e[0] ? e[d++] : "N/A";
                    n[1] = e[d];
                    for (a = 2; a < f; a++) n[n.length] = e[d++] + "+", n[n.length] = e[d]
                } else {
                    y = b.length;
                    for (a = 0; a < y; a++) p[a] = parseFloat(b[a].style.left) / 100;
                    b = d.querySelector(".ewokui-slider-horizontal").getElementsByClassName("ewokui-slider-horizontal-displaytext");
                    f = b.length;
                    a = d = 0;
                    for (e = []; a < f; a++) e[a] = b[a].textContent;
                    "N/A" == e[0] || "NA" == e[0] ? n[0] = e[d++] : (n[0] = "N/A", f++);
                    for (a = 1; a < f; a++) n[a] = e[d++]
                } q = k[0].getElementsByClassName("result");
            l = k[0].getElementsByClassName("rating-bar");
            e = q.length;
            for (a = 0; a < e; a++) {
                b = q[a].querySelector("a");
                v[a] = "nolp.html";
                if (b) v[a] = b.dataset.oldhref || b.getAttribute("oldhref") || b.href;
                else if (b = q[a].querySelector("iframe"))
                    if (f = c.createElement("div"), d = b.src, ~d.indexOf("64,")) {
                        if (f.innerHTML = atob(d.slice(d.indexOf("64,") + 3)), d = f.querySelector("a")) v[a] = d.href
                    } else D = 1, f = b.contentWindow ? b.contentWindow.document : b.contentDocument, (d = f.querySelector("a")) && (v[a] = d.dataset.oldhref || d.getAttribute("oldhref") || d.href);
                g.u[a] = l[a].querySelector(".ewokui-slider-horizontal");
                H[a] = !!(g.q[a] = l[a].querySelector(".ewokui-pqslider-horizontal"));
                g.flags[a] = l[a].getElementsByClassName("ewok-flag");
                g.comment[a] = l[a].querySelector(".result-comment");
                g.selDup[a] = l[a].querySelector(".report-dupe-link");
                g.finDup[a] = l[a].querySelector(".select-dupe-link");
                g.markDup[a] = l[a].querySelector(".dupe-checkbox-input")
            }
            if (1 < k.length)
                for (q = k[1].getElementsByClassName("result"), l = k[1].getElementsByClassName("rating-bar"), e = q.length, a = 0; a < e; a++) {
                    b = q[a].querySelector("a");
                    w[a] = "nolp.html";
                    if (b) w[a] = b.dataset.oldhref || b.getAttribute("oldhref") || b.href;
                    else if (b = q[a].querySelector("iframe"))
                        if (f = c.createElement("div"), d = b.src, ~d.indexOf("64,")) {
                            if (f.innerHTML = atob(d.slice(d.indexOf("64,") + 3)), d = f.querySelector("a")) w[a] = d.href
                        } else D = 1, f = b.contentWindow ? b.contentWindow.document : b.contentDocument, (d = f.querySelector("a")) && (w[a] = d.dataset.oldhref || d.getAttribute("oldhref") || d.href);
                    h.u[a] = l[a].querySelector(".ewokui-slider-horizontal");
                    B[a] = !!(h.q[a] = l[a].querySelector(".ewokui-pqslider-horizontal"));
                    h.flags[a] = l[a].getElementsByClassName("ewok-flag");
                    h.comment[a] = l[a].querySelector(".result-comment");
                    h.selDup[a] = l[a].querySelector(".report-dupe-link");
                    h.finDup[a] = l[a].querySelector(".select-dupe-link");
                    h.markDup[a] = l[a].querySelector(".dupe-checkbox-input")
                }
            K = c.querySelector(".query-info");
            z = c.getElementById("no-more-dupes") || c.querySelector(".no-more-dupes");
            u = [g, h]
        }
        z && (E = z.querySelector("input"));
        u && c.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", S)
        })
    },
    aa = () => {
        m.sendMessage({
            command: "googit",
            query: A
        })
    },
    Q = () => {
        if (u) {
            var b = c.createElement("div"),
                g = u[1].u.length,
                h = u[0].u.length;
            K.firstElementChild.appendChild(b);
            b.innerHTML = "<span style=color:#F40><b>LBTimer</b></span> open: " + (h ? '<span style=color:#006;cursor:pointer id=lb-rtl title="Open left side results">Left</span> - ' : "") + (g && h ? '<span style=color:#006;cursor:pointer id=lb-rtb title="Open both sides results">Both</span> - ' : "") + (g ? '<span style=color:#006;cursor:pointer id=lb-rtr title="Open right side results">Right</span> - ' : "") + '<span style=color:#006;cursor:pointer id=lb-x title="Close opened results">X</span>';
            h && (c.getElementById("lb-rtl").onclick = b => {
                M(1, b.ctrlKey || b.shiftKey)
            });
            g && h && (c.getElementById("lb-rtb").onclick = b => {
                M(3, b.ctrlKey || b.shiftKey)
            });
            g && (c.getElementById("lb-rtr").onclick = b => {
                M(2, b.ctrlKey || b.shiftKey)
            });
            c.getElementById("lb-x").onclick = () => {
                m.sendMessage({
                    command: "closeAll"
                })
            }
        }
        z && (E.onchange = () => {
            z.style.border = E.checked ? "solid 1px #ccc" : "solid 2px red"
        }, E.checked = !0);
        if (r.length) {
            for (b = r.length; b--;) g = c.createElement("a"), r[b].parentNode.insertBefore(g, r[b].nextSibling), g.outerHTML = "<span id=lb-gq" + b + " style=color:#006;cursor:pointer;font-size:15px;font-weight:bold>&nbsp;&larr;&nbsp;google it!</span>", c.getElementById("lb-gq" + b).onclick = aa;
            r[0].getBoundingClientRect().bottom > innerHeight && r[0].scrollIntoView()
        }
        c.querySelectorAll("#hiddenSection input").forEach(b => {
            b.checked = !0
        })
    },
    M = (b, g) => {
        m.sendMessage({
            command: "opensides",
            side: b,
            shifted: g
        })
    },
    N = b => {
        var g = Date.now() - O;
        2E3 < g ? (b = c.getElementById(b ? "ewok-task-submit-done-button" : "ewok-task-submit-button")) ? b.click() : (b = c.getElementsByClassName("submit"), b.length && b[b.length - 1].click()) : setTimeout(N, 2E3 - g, b)
    },
    R = () => {
        O = Date.now()
    };
window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (b, g) {
    g = g || window;
    for (var c = 0; c < this.length; c++) b.call(g, this[c], c, this)
});
c.body.addEventListener("keyup", R, !1);
(() => {
    if (c.getElementById("task_action-show") || ~location.href.indexOf("/rater/task/show")) {
        var b = c.querySelector(".ewok-estimated-task-weight") || c.querySelector("#ewok-estimated-task-time") || c.querySelector(".ewok-rater-header"),
            g = c.querySelector(".ewok-task-action-header").getElementsByTagName("H1")[1].textContent,
            h = c.getElementById("taskIds").value,
            b = b ? b.textContent : "";
        R();
        if (c.getElementById("ewok-task-submit-button")) {
            C = X();
            if (!C) try {
                P()
            } catch (f) {
                m.sendMessage({
                    command: "toLog",
                    error: f.message
                }), console.log(f.stack)
            }
            m.onMessage.addListener(a => {
                var b = a.side,
                    e = a.result - 1;
                switch (a.command) {
                    case "click":
                        N(a.stop);
                        break;
                    case "uorq":
                        var c = a.uorq;
                        a = a.val;
                        if (b = u[b][c][e]) e = b.getBoundingClientRect(), c = e.left + (e.right - e.left) * ("u" === c ? p[a] : t[a]), e = e.top + (e.bottom - e.top) / 2, L(b, "mousedown", c, e), L(b, "mouseup", c, e), L(b, "click", c, e);
                        break;
                    case "fl":
                        (c = u[b].flags[e][a.fl]) && c.click();
                        break;
                    case "comment":
                        c = a.comment;
                        if (b = u[b].comment[e]) b.style.display = "initial", b.value = c, b.dispatchEvent(new KeyboardEvent("keyup", {
                            bubbles: !0,
                            cancelable: !0,
                            key: "ArrowRight"
                        }));
                        break;
                    case "seldup":
                        (c = u[b].selDup[e]) && c.click();
                        break;
                    case "findup":
                        (c = u[b].finDup[e]) && c.click();
                        break;
                    case "mrkdup":
                        (c = u[b].markDup[e]) && c.click();
                        break;
                    case "crl":
                        C && Z(a.crl)
                }
            });
            D ? setTimeout(() => {
                P();
                m.sendMessage({
                    command: "startTimer",
                    task: g,
                    mxtime: b,
                    taskId: h,
                    leftURLs: v,
                    rightURLs: w,
                    query: A,
                    flags: F,
                    lqsliders: H,
                    rqsliders: B,
                    sliderLength: y,
                    PQsliderLength: G,
                    lblArray: n,
                    PQlblArray: x,
                    PQ: C
                });
                Q()
            }, 2E3) : (m.sendMessage({
                command: "startTimer",
                task: g,
                mxtime: b,
                taskId: h,
                leftURLs: v,
                rightURLs: w,
                query: A,
                flags: F,
                lqsliders: H,
                rqsliders: B,
                sliderLength: y,
                PQsliderLength: G,
                lblArray: n,
                PQlblArray: x,
                PQ: C
            }), Q())
        } else c.getElementsByClassName("submit").length ? (m.onMessage.addListener(a => {
            "click" === a.command && N(0)
        }), m.sendMessage({
            command: "startTimer",
            task: g,
            mxtime: b,
            taskId: h
        })) : alert("LBTimer WARNING: Submit button not detected. NO TIME OR TASK TRACKING!")
    } else if (c.getElementById("task-index")) {
        var k = !!c.querySelector(".ewok-rater-task-option"),
            a = /continue/i.test(c.querySelector(".container").innerHTML);
        k && U();
        m.onMessage.addListener(a => {
            "acquire" === a.command && T(a.taskMask)
        });
        m.sendMessage({
            command: "stopTimer",
            tasks: k,
            incomplete: a,
            avail: I
        })
    }
})();
(() => {
    var b = c.createElement("iframe");
    b.height = b.width = "1px";
    b.id = "lb-ads";
    b.src = "https://ads.ads/ads.js";
    b.style.position = "fixed";
    b.style.left = b.style.bottom = "0";
    c.body.appendChild(b);
    setTimeout(() => {
        var b = c.getElementById("lb-ads");
        "none" != b.style.display && "hidden" != b.style.display && "hidden" != b.style.visibility && 0 !== b.offsetHeight || alert("LBTimer detected ad blocking active in the task page!");
        b.remove()
    }, 1E3)
})();
!/error/i.test(c.title) && c.title || setTimeout(() => {
    location.reload(!0)
}, 1E4)