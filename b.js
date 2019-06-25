/* (c) 2014-2017 Ivan Nokonoko - See LICENSE. Timer based on this idea by James Edwards - http://www.sitepoint.com/creating-accurate-timers-in-javascript */
var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    f = {},
    g = -1,
    h = 0,
    j = 1,
    k = "DB EXP IRR RR SXS TTR URL".split(" "),
    m, n, p, q, r, u, v, x = !0,
    y, z, A = 8E3,
    B = 0,
    C, D = 0,
    E = 0,
    F = 0,
    G = [],
    H = [],
    I = [],
    J = [],
    K, L, M, N = "",
    O = [],
    P = [],
    Q = [],
    R, S = []
T, o = {
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
}, U = {
    type: "basic",
    iconUrl: "img/t.svg",
    title: "LBTimer " + chrome.runtime.getManifest().version
}, V, W, X, Y, Z, aa, ab, ac = 0, ad = "https://www.googleapis.com/drive/v3/files", ae = [], af = "", ag, ah = [], ai = document.getElementById("bell"), aj = a => {
    setTimeout(chrome.notifications.clear, 6E4, a)
}, ak = a => {
    setTimeout(chrome.notifications.clear, 5E3, a)
}, al = (a, b) => {
    b && console.log(a);
    b = (new Date).toLocaleTimeString() + " -> " + a;
    chrome.storage.local.get({
        l: []
    }, a => {
        a.l[a.l.length] = b;
        chrome.storage.local.set(a)
    })
}, am = a => a.getFullYear() + ("0" + (a.getMonth() + 1)).slice(-2) + ("0" + a.getDate()).slice(-2), an = a => a.getDate() + "-" + "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")[a.getMonth()] + "-" + a.getFullYear(), ao = a => a.reduce((a, d) => {
    a[d.name] = JSON.parse(d.description);
    return a
}, {}), ap = () => {
    V = 0;
    var a = z.slice(0, 6),
        b = new Date(y);
    b.setDate(b.getDate() - b.getDay() + (b.getDay() ? 1 : -6) * o.fdw);
    for (var d = [am(b)]; b.setDate(b.getDate() + 1) && b.getDay() != o.fdw;) d[d.length] = am(b);
    aG([d[0].slice(0, 6), d[6].slice(0, 6)], b => {
        b = ao(b);
        X = W = 0;
        delete b[z];
        for (var c in b) {
            if (~d.indexOf(c))
                for (var t = 7; t--;) W += b[c][1024 & o.oflags ? 2 * t : 14 + t];
            if (!c.indexOf(a))
                for (t = 7; t--;) X += b[c][1024 & o.oflags ? 2 * t : 14 + t]
        }
        X /= 60;
        W /= 60;
        X >= o.monthlyWarn && (V |= 4);
        W >= o.weeklyWarn && (V |= 2)
    })
}, aq = (a, b) => {
    var d = {
        type: "list",
        iconUrl: "img/g.svg",
        message: ""
    };
    d.title = "LBTimer: +1 " + k[a] + " (" + b + ") task added";
    al(d.title);
    if (4 & o.oflags || o.dailyWarn || o.weeklyWarn || o.monthlyWarn) {
        for (var c = [{
                title: an(y),
                message: " Tasks completed:"
            }], l = 0, t = 0; 7 > t; t++) l += 1024 & o.oflags ? e[2 * t] : e[14 + t], e[2 * t + 1] && (c[c.length] = {
            title: k[t] + ":",
            message: (e[14 + t] / 60).toFixed(2) + " min(s). " + e[2 * t + 1] + " tasks"
        });
        l /= 60;
        d.items = c;
        4 & o.oflags && chrome.notifications.create("add", d, ak);
        chrome.runtime.sendMessage({
            command: "updatesheet"
        });
        o.dailyWarn && !(1 & V) && l >= o.dailyWarn && (d = l, chrome.notifications.create("dailyGoal", {
            type: "basic",
            iconUrl: 'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="gold"><circle cx="50" cy="50" r="50"/><circle cx="50" cy="50" r="41" fill="#fff"/><rect x="48" y="12" width="8" height="42" rx="4" ry="4"/><rect x="48" y="48" width="35" height="7" rx="3.5" ry="3.5"/></g></svg>',
            title: "Daily goal achieved!",
            message: "You've completed " + (60 <= d ? (0 | d / 60) + "h " : "") + (d % 60 ? (0 | d % 60) + "m" : "") + " today"
        }, aj), V |= 1);
        o.weeklyWarn && !(2 & V) && W + l >= o.weeklyWarn && (d = W + l, chrome.notifications.create("weeklyGoal", {
            type: "basic",
            iconUrl: 'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="gold"><circle cx="50" cy="50" r="50"/><circle cx="50" cy="50" r="41" fill="#fff"/><text x="30" y="78" font-family="Ubuntu,sans-serif" font-size="75">7</text></g></svg>',
            title: "Weekly goal achieved!",
            message: "You've completed " + (60 <= d ? (0 | d / 60) + "h " : "") + (d % 60 ? (0 | d % 60) + "m" : "") + " this week"
        }, aj), V |= 2);
        o.monthlyWarn && !(4 & V) && X + l >= o.monthlyWarn && (d = X + l, chrome.notifications.create("monthlyGoal", {
            type: "basic",
            iconUrl: 'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="gold" font-family="Ubuntu,sans-serif" font-size="70"><circle cx="50" cy="50" r="50"/><circle cx="50" cy="50" r="41" fill="#fff"/><text x="18" y="75">3</text><text x="48" y="75">1</text></g></svg>',
            title: "Monthly goal achieved!",
            message: "You've completed " + (60 <= d ? (0 | d / 60) + "h " : "") + (d % 60 ? (0 | d % 60) + "m" : "") + " this month"
        }, aj), V |= 4)
    }
}, ar = (a, b, d, c) => {
    var l = 2 * a,
        t = 14 + a;
    f[c] = 1;
    aH(aa, w => {
        w.error ? 404 == w.error.code && (al("Today's record erased from Google Drive\u2122. Creating a new one with available data..."), e[l++] += b, e[t] += d, e[l]++, aF(z, e, b => {
            b.error ? al("Error creating today's record.") : (aa = b.id, aq(a, c))
        })) : (e = JSON.parse(w.description), e[l++] += b, e[t] += d, e[l]++, aI(aa, e, b => {
            b.error ? al("Error saving today's record") : aq(a, c)
        }))
    })
}, as = () => {
    if (L) chrome.windows.remove(L);
    else
        for (var a = I.length; a--;)
            if (I[a] && I[a] != p) {
                var b = J.indexOf(I[a]);
                chrome.tabs.remove(I[a]);
                ~b && J.splice(b, 1)
            } M ? chrome.windows.remove(M) : J.forEach(a => {
        a && a != p && chrome.tabs.remove(a)
    });
    I = [];
    J = []
}, at = () => {
    1 & F && clearTimeout(n);
    g = -1;
    D = p = F = 0;
    chrome.browserAction.setBadgeText({
        text: ""
    });
    chrome.browserAction.setTitle({
        title: "LBTimer"
    });
    r && chrome.tabs.sendMessage(r, {
        command: "release"
    });
    j = 1
}, au = (a, b, d) => {
    y = a;
    aa = b;
    e = d;
    z = am(a);
    chrome.notifications.create("newday", {
        type: "basic",
        iconUrl: "img/o.svg",
        title: "LBTimer NEW DAY",
        message: "Tasks will now be recorded on " + an(y)
    }, ak);
    al("New day detected: " + an(y));
    chrome.runtime.sendMessage({
        command: "updatesheet"
    });
    ap()
}, av = function (a, b, d) {
    switch (a.command) {
        case "startTimer":
            if (x && (!p || p === b.tab.id || confirm("There is another task page open.\nUse this one instead?"))) {
                p = b.tab.id;
                K = b.tab.windowId;
                var c = a.mxtime.replace(/\s/g, "");
                b = /([\d.]+)min/i.exec(c) || 0;
                c = /([\d.]+)sec/i.exec(c) || 0;
                b && (b = 60 * parseFloat(b[1]));
                c && (c = parseFloat(c[1]));
                B = 0 | b + c || 300;
                C = B * o.warningFactor;
                F &= 17;
                1 ^ F && (F = 1, m = Date.now(), ay());
                chrome.notifications.clear("stop");
                g = [/di/i, /ex/i, /g/i, /re/i, /si/i, /ti/i, /ur/i].findIndex(b => b.test(a.task));
                ~g || (g = 1);
                c = e[14 + g] - e[2 * g];
                c = 0 < c && o.oflags & 524288 ? o.sooner < c ? o.sooner : 0 > c ? 0 : c : o.oflags & 2097152 ? -o.later > c ? -o.later : 0 < c ? 0 : c : 0;
                A = B - c;
                b = 60 <= B ? B % 60 ? (0 | B / 60) + ":" + ("0" + B % 60).slice(-2) + " min." : B / 60 + " min." : B + " seconds";
                h != a.taskId && (h = a.taskId, al("Acquired " + k[g] + " (" + h + ") - " + b));
                chrome.browserAction.setTitle({
                    title: k[g] + " - " + b
                });
                2 & o.oflags && chrome.notifications.create("new", {
                    type: "basic",
                    iconUrl: "img/g.svg",
                    title: "LBTimer task type: " + k[g],
                    message: "Average estimated time: " + b
                }, 60 <= B ? aj : ak);
                j = 0;
                o.oflags &= -16385;
                r && chrome.tabs.sendMessage(r, {
                    command: "reset",
                    tasktype: g,
                    AET: B
                });
                as();
                G = a.leftURLs;
                H = a.rightURLs;
                N = a.query;
                O = a.flags;
                P = a.lqsliders;
                Q = a.rqsliders;
                R = a.sliderLength;
                S = a.lblArray;
                ag = a.PQsliderLength;
                ah = a.PQlblArray;
                if (a.PQ) {
                    af = a.PQ;
                    chrome.tabs.sendMessage(p, {
                        command: "crl",
                        crl: o.crl
                    });
                    c = document.createElement("a");
                    c.href = af;
                    b = c.protocol + "//" + c.host;
                    var l = c.host.replace(/^(?:www|m)\./, "");
                    for (c = 5; c--;) ae[c] = o.crl[c][1].replace(/\%url/gi, af).replace(/\%host/gi, l).replace(/\%main/gi, b)
                } else if (R) {
                    var t = a => decodeURIComponent(a.replace(/https?:\/\/www\.(?:google|raterhub)\.com\/evaluation\/url\?q=/i, ""));
                    b = H.reduce((a, b, c) => {
                        a["R" + (c + 1)] = t(b);
                        return a
                    }, G.reduce((a, b, c) => {
                        a["L" + (c + 1)] = t(b);
                        return a
                    }, {}));
                    c = (a, b, c) => {
                        c[b] = a.replace(/^0/, "")
                    };
                    b.q = N;
                    aI(q, b, a => {
                        a.error && al("Error updating S2D info")
                    });
                    H.forEach(c);
                    G.forEach(c)
                }
            }
            break;
        case "stopTimer":
            if (x && (p || (F |= 64), !p || p === b.tab.id || confirm("There is another task page open.\nUse this one instead?")) && (p = b.tab.id, K = b.tab.windowId, clearTimeout(n), D = 0, chrome.browserAction.setBadgeText({
                    text: a.tasks ? "TSK" : "NRT"
                }), chrome.browserAction.setTitle({
                    title: a.tasks ? "There are tasks available" : "No available tasks"
                }), chrome.browserAction.setBadgeBackgroundColor({
                    color: a.tasks ? "#0B5" : "#F44336"
                }), r && chrome.tabs.sendMessage(r, {
                    command: "release"
                }), a.incomplete || !h || f[h] || (al("Task (" + h + ") released"), h = 0), a.tasks ? (b = "There are " + a.avail.map(a => k[Math.log2(a.type)]) + " tasks available", al("Index page: " + b), a.incomplete || (E = 0, chrome.notifications.clear("new"), as()), 2048 & o.oflags && (131072 & o.oflags && (!j || 64 & F) || chrome.tabs.sendMessage(p, {
                    command: "acquire",
                    taskMask: o.tflags
                })), 1 & o.oflags && chrome.notifications.create("stop", {
                    type: "basic",
                    iconUrl: "img/g.svg",
                    title: "LBTimer active",
                    message: b
                }, ak), 16 & o.oflags && (ai.play(), 65536 & o.oflags && setTimeout(aO, 2E4)), j && (chrome.tabs.update(p, {
                    active: !0
                }, () => {
                    chrome.windows.update(K, {
                        focused: !0
                    })
                }), 1048576 & o.oflags && o.mls && aD(b)), j = 0) : (E = 0, j || al("Index page: No tasks available"), j = 1, 64 & o.oflags && setTimeout(aP, o.autoReloadTime || 2E3)), F &= -66, 4096 & o.oflags)) {
                var w = o.oflags & 262144 ? new Pacific.Date(new Date) : new Date;
                w.getDate() != y.getDate() && aG(am(w), a => {
                    a.length ? au(w, a[0].id, JSON.parse(a[0].description)) : aF(am(w), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a => {
                        a.error ? al("Error creating newday's record") : au(w, a.id, JSON.parse(a.description))
                    })
                })
            }
            break;
        case "clock":
            r ? chrome.tabs.get(r, a => {
                chrome.windows.update(a.windowId, {
                    focused: !0
                })
            }) : chrome.windows.create({
                url: "k.html",
                width: 280,
                height: 200,
                type: "popup"
            }, a => {
                r = a.tabs[0].id;
                setTimeout(chrome.tabs.sendMessage, 500, r, {
                    command: 1 & F ? "reset" : "release",
                    tasktype: g,
                    AET: B
                })
            });
            break;
        case "op":
            chrome.tabs.create({
                url: a.link,
                openerTabId: p,
                active: !1
            });
            break;
        case "opensides":
            a.shifted ? (1 & a.side && G.length && chrome.windows.create({
                url: G,
                focused: !1,
                width: screen.availWidth,
                height: screen.availHeight
            }, a => {
                L = a.id
            }), 2 & a.side && H.length && chrome.windows.create({
                url: H,
                focused: !1,
                width: screen.availWidth,
                height: screen.availHeight
            }, a => {
                M = a.id
            })) : (b = a => {
                chrome.tabs.create({
                    url: a,
                    active: !1,
                    openerTabId: p
                })
            }, 1 & a.side && G.forEach(b), 2 & a.side && H.forEach(b));
            break;
        case "tcrl":
            chrome.tabs.create({
                url: ae[a.w].indexOf("http") ? "https://www.google.com/search?q=" + encodeURIComponent(ae[a.w]) : ae[a.w],
                active: !a.s,
                openerTabId: p
            });
            break;
        case "closeAll":
            as();
            break;
        case "toLog":
            al("Error parsing task: " + a.error);
            break;
        case "googit":
            chrome.tabs.create({
                url: "https://www.google.com/search?q=" + encodeURIComponent(a.query) + "&filter=0",
                active: !0,
                openerTabId: p
            });
            break;
        case "uorq":
        case "fl":
        case "comment":
        case "mrkdup":
            chrome.tabs.sendMessage(p, a);
            break;
        case "rl":
            chrome.tabs.update(b.tab.id, {
                url: a.side ? H[a.result - 1] : G[a.result - 1]
            });
            break;
        case "seldup":
        case "findup":
            b = b => {
                b && chrome.tabs.sendMessage(b, a)
            };
            b(p);
            I.forEach(b);
            J.forEach(b);
            break;
        case "save":
            b = o.oflags ^ a.oflags;
            c = o.dailyWarn ^ a.dailyWarn || o.weeklyWarn ^ a.weeklyWarn || o.monthlyWarn ^ a.monthlyWarn || o.fdw ^ a.fdw;
            l = o.fdw ^ a.fdw || b & 33792;
            var ca = e[14 + g] - e[2 * g];
            o = a;
            aw();
            C = B * o.warningFactor;
            ca = o.sooner < ca ? o.sooner : 0 > ca ? 0 : ca;
            A = o.oflags & 524288 ? B - ca : B;
            if (b & 262144) {
                var ba = o.oflags & 262144 ? new Pacific.Date(new Date) : new Date;
                ba.getDate() != y.getDate() ? (l = 1, aG(am(ba), a => {
                    a.length ? (aa = a[0].id, e = JSON.parse(a[0].description), y = ba, z = am(ba), U.message = an(y) + (o.oflags & 262144 ? "\nPacific Time" : "\nLocal time"), chrome.notifications.create("welcome", U, aj), chrome.runtime.sendMessage({
                        command: "updatesheet"
                    })) : aF(am(ba), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a => {
                        a.error ? al("Error creating new date. Old date will be used", 1) : (aa = a.id, e = JSON.parse(a.description), y = ba, z = am(ba), U.message = an(y) + (o.oflags & 262144 ? "\nPacific Time" : "\nLocal time"), chrome.notifications.create("welcome", U, aj), chrome.runtime.sendMessage({
                            command: "updatesheet"
                        }))
                    })
                })) : (U.message = an(y) + (o.oflags & 262144 ? "\nPacific Time" : "\nLocal time"), chrome.notifications.create("welcome", U, aj))
            }
            b & 64 && 64 & o.oflags && setTimeout(aP, o.autoReloadTime || 2E3);
            l && chrome.runtime.sendMessage({
                command: "refreshsheet"
            });
            c && ap();
            b & 1048576 && !Z && aB();
            p && chrome.tabs.sendMessage(p, {
                command: "crl",
                crl: o.crl
            });
            break;
        case "panelopen":
            u = b.tab.id;
            break;
        case "showPanel":
            ax();
            break;
        case "od":
            u ? chrome.tabs.update(u, {
                active: !0
            }, b => {
                chrome.windows.update(b.windowId, {
                    focused: !0
                }, () => {
                    chrome.tabs.sendMessage(u, a)
                })
            }) : chrome.tabs.create({
                url: "n.html"
            }, b => {
                u = b.id;
                setTimeout(chrome.tabs.sendMessage, 500, u, a)
            });
            break;
        case "toggleAuto":
            switch (a.auto) {
                case 2:
                    o.oflags |= 16384;
                case 1:
                    o.oflags |= 128;
                    break;
                default:
                    o.oflags &= -16513
            }
            chrome.notifications.create("as", 128 & o.oflags ? 16384 & o.oflags ? {
                type: "basic",
                iconUrl: 'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 30 30 0 70 0 100 30 100 70 70 100 30 100 0 70z"/><path d="M8 32 32 08 68 8 92 32 92 68 68 92 32 92 08 68z" fill="#f90"/><rect x="48" y="12" width="8" height="42" rx="4" ry="4"/><rect x="48" y="48" width="35" height="7" rx="3.5" ry="3.5"/></svg>',
                title: "LBTimer AUTO SUBMIT ON & STOP",
                message: "Current task will be submitted at AET and then return to homepage"
            } : {
                type: "basic",
                iconUrl: "img/g.svg",
                title: "LBTimer AUTO SUBMIT ON",
                message: "Tasks will be submitted at AET"
            } : {
                type: "basic",
                iconUrl: "img/r.svg",
                title: "LBTimer AUTO SUBMIT OFF",
                message: "Submit tasks manually"
            }, aj);
            2 ^ a.auto && aw();
            break;
        case "toggleAcq":
            a.auto ? o.oflags |= 2048 : o.oflags &= -2049;
            aw();
            break;
        case "toggleRel":
            a.auto ? (o.oflags |= 64, setTimeout(aP, o.autoReloadTime || 2E3)) : o.oflags &= -65;
            aw();
            break;
        case "activate":
            b = (x = !x) ? "ON" : "OFF";
            chrome.browserAction.setBadgeText({
                text: b
            });
            chrome.browserAction.setTitle({
                title: "LBTimer is " + b
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: x ? "#0B5" : "#555"
            });
            al("LBTimer is " + b);
            d(x);
            break;
        case "timer":
            1 & F && (16 & F ? (D = 0, m = Date.now(), ay(), F &= -17, al("Timer resumed"), d(1)) : (clearTimeout(n), chrome.browserAction.setBadgeBackgroundColor({
                color: "#000"
            }), F |= 16, al("Timer paused"), d(0)));
            break;
        case "addThis":
            1 & F || !~a.tasktype || ar(a.tasktype, a.AET, a.time, "MANUAL");
            break;
        case "doSubmit":
            32 & F || !x || (chrome.tabs.sendMessage(p, {
                command: "click",
                stop: 16384 & o.oflags
            }), F |= 32);
            break;
        case "tsa":
            return aG(a.week, a => {
                d(ao(a))
            }), !0;
        case "openLog":
            v ? chrome.tabs.get(v, a => {
                chrome.windows.update(a.windowId, {
                    focused: !0
                })
            }) : chrome.windows.create({
                url: "l.html",
                type: "popup",
                width: 600,
                height: 400
            }, a => {
                v = a.tabs[0].id
            });
            break;
        case "email":
            aE(a.msg, a => {
                a.error ? al("Error trying to send e-mail", 1) : chrome.notifications.create("email", {
                    type: "basic",
                    iconUrl: "img/c.svg",
                    title: "e-mail sent",
                    message: "Thanks for your feedback!"
                }, aj)
            });
            break;
        case "history":
            if (chrome.history) return b = o.oflags & 262144 ? new Pacific.Date(a.when, 1) : new Date(a.when), c = b.setHours(0) + 864E5, chrome.history.search({
                text: "raterhub taskId",
                startTime: b.getTime(),
                endTime: c,
                maxResults: 1E3
            }, a => {
                d(a.sort((a, b) => a.lastVisitTime - b.lastVisitTime))
            }), !0;
            confirm("To scan the browser's history, LBTimer needs to receive permission and then be restarted.\nDo you want to grant the permission and restart LBTimer now?") && chrome.permissions.request({
                permissions: ["history"]
            }, a => {
                a && chrome.runtime.reload()
            })
    }
}, aw = () => {
    aI(ab, o, a => {
        a.error && 404 == a.error.code && aG("settings", a => {
            a.length ? (ab = a[0].id, aw()) : aF("settings", o, a => {
                a.error ? al("Error saving settings") : ab = a.id
            })
        })
    })
}, ax = () => {
    u ? chrome.tabs.update(u, {
        active: !0
    }, a => {
        chrome.windows.update(a.windowId, {
            focused: !0
        })
    }) : chrome.tabs.create({
        url: "n.html"
    })
}, ay = () => {
    var a = Date.now() - m - 1E3 * D++,
        b = {
            command: "tick",
            t: "OFF",
            c: "#eee"
        },
        d = 512 & o.oflags ? Math.abs(B - E) : E;
    d = (0 | d / 60) + ":" + ("0" + d % 60).slice(-2);
    x && (b.t = d, b.c = "#0b5", E >= A ? (b.c = "#F44336", !(32 & F) && 128 & o.oflags && (chrome.tabs.sendMessage(p, {
        command: "click",
        stop: 16384 & o.oflags
    }), F |= 32), !(8 & F) && 256 & o.oflags && (chrome.notifications.create("aet", {
        type: "basic",
        iconUrl: "img/r.svg",
        title: "LBTimer WARNING - AET",
        message: "You've reached the AET for this task",
        buttons: [{
            title: "Submit now",
            iconUrl: "img/t.svg"
        }]
    }, ak), F |= 8), !(2 & F) && 32 & o.oflags && (ai.play(), F |= 2)) : E >= C && (b.c = "#FFc300", !(4 & F) && 8 & o.oflags && (chrome.notifications.create("warning", {
        type: "basic",
        iconUrl: "img/o.svg",
        title: "LBTimer WARNING",
        message: "You've reached " + 100 * o.warningFactor + "% of the AET"
    }, ak), F |= 4)));
    chrome.browserAction.setBadgeBackgroundColor({
        color: b.c
    });
    chrome.browserAction.setBadgeText({
        text: b.t
    });
    chrome.runtime.sendMessage(b);
    E++;
    n = setTimeout(ay, 1E3 - a)
}, az = a => {
    aG("", b => {
        var d = {},
            c = [],
            l = b.find(a => "settings" == a.name);
        if (l) {
            ab = l.id;
            l = JSON.parse(l.description);
            for (var t in l) o[t] = l[t]
        } else aF("settings", o, a => {
            a.error ? al("Error creating settings", 1) : ab = a.id
        });
        y = o.oflags & 262144 ? new Pacific.Date(new Date) : new Date;
        z = am(y);
        b.forEach(a => {
            a.name == z ? d[z] ? c[c.length] = a.id : (e = JSON.parse(a.description), aa = a.id, d[z] = 1, al("Loaded date: " + an(y), 1)) : "S2D" == a.name ? d.S2D ? c[c.length] = a.id : (q = a.id, d.S2D = 1) : "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]" == a.description ? c[c.length] = a.id : d[a.name] ? c[c.length] = a.id : d[a.name] = 1
        });
        aa || (al("Creating new record for date: " + an(y), 1), aF(z, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], a => {
            a.error ? console.log("Error creating today's record.") : aa = a.id
        }));
        q || aF("S2D", {}, a => {
            a.error ? al("Error creating S2D file", 1) : q = a.id
        });
        c.length && aK(c, () => {});
        a ? a() : (U.message = an(y) + (o.oflags & 262144 ? "\nPacific Time" : "\nLocal time"), chrome.notifications.create("welcome", U, aj), aQ())
    })
}, aA = a => {
    chrome.identity.getAuthToken({
        interactive: !0
    }, b => {
        b ? (Y = "access_token=" + b, a()) : al("CRITICAL ERROR retrieving authorization token", 1)
    })
}, aB = a => {
    chrome.identity.getAuthToken({
        interactive: !0,
        scopes: ["https://www.googleapis.com/auth/gmail.send"]
    }, b => {
        b ? (Z = "https://www.googleapis.com/gmail/v1/users/me/messages/send?access_token=" + b, a && a()) : al("No e-mail authorization received", 1)
    })
}, aC = ["Server error. Retrying...", "Too many errors, giving up."], aD = a => {
    if (Z) {
        var b = new XMLHttpRequest;
        b.onload = () => {
            402 <= b.status ? (al(aC[0]), 10 > ac ? setTimeout(aD, 1E3 * (Math.pow(2, ac++) + Math.random()), a) : al(aC[1])) : 401 == b.status ? 10 > ++ac && aB(() => {
                aD(a)
            }) : ac = 0
        };
        b.open("POST", Z, !0);
        b.setRequestHeader("Content-Type", "application/json");
        b.send(JSON.stringify({
            raw: btoa("To: " + o.mls + "\nSubject: Tasks available in RaterHub!\nDate: " + (new Date).toString() + "\n\n" + a).replace(/\//g, "_").replace(/\+/g, "-")
        }))
    } else aB(() => {
        aD(a)
    })
}, aE = (a, b) => {
    Z ? chrome.storage.local.get({
        l: []
    }, d => {
        var c = new XMLHttpRequest;
        c.onload = () => {
            if (402 <= c.status) al(aC[0]), 10 > ac ? setTimeout(aE, 1E3 * (Math.pow(2, ac++) + Math.random()), a, b) : al(aC[1]);
            else {
                var d = JSON.parse(c.response);
                401 == c.status ? 10 > ++ac ? aB(() => {
                    aE(a, b)
                }) : b(d) : (ac = 0, b(d))
            }
        };
        c.open("POST", Z, !0);
        c.setRequestHeader("Content-Type", "application/json");
        c.send(JSON.stringify({
            raw: btoa("To: LBTimer <iczubakczubak@gmail.com>\nSubject: LBTimer feedback\nDate: " + (new Date).toString() + "\n\n" + a + "\n\nSettings: " + o.oflags + "\nLOG:\n" + d.l.join("\n")).replace(/\//g, "_").replace(/\+/g, "-")
        }))
    }) : aB(() => {
        aE(a, b)
    })
}, aF = (a, b, d) => {
    var c = new XMLHttpRequest;
    c.onload = () => {
        if (402 <= c.status) al(aC[0]), 10 > ac ? setTimeout(aF, 1E3 * (Math.pow(2, ac++) + Math.random()), a, b, d) : al(aC[1]);
        else {
            var l = JSON.parse(c.response);
            401 == l.status ? 10 > ++ac ? aA(() => {
                aF(a, b, d)
            }) : d(l) : (ac = 0, d(l))
        }
    };
    c.open("POST", ad + "?fields=id,description&" + Y, !0);
    c.setRequestHeader("Content-Type", "application/json");
    c.send(JSON.stringify({
        description: JSON.stringify(b),
        mimeType: "text/plain",
        parents: ["appDataFolder"],
        name: a
    }))
}, aG = (a, b) => {
    var d = [],
        c = (a, t) => {
            var l = new XMLHttpRequest;
            l.onload = () => {
                if (402 <= l.status) al(aC[0]), 10 > ac ? setTimeout(c, 1E3 * (Math.pow(2, ac++) + Math.random()), a, t) : al(aC[1]);
                else {
                    var w = JSON.parse(l.response);
                    401 == l.status ? 10 > ++ac ? aA(() => {
                        c(a, t)
                    }) : b(d) : (ac = 0, w.files && (d = d.concat(w.files)), w.nextPageToken ? c(w.nextPageToken, t) : b(d))
                }
            };
            l.open("GET", ad + "?fields=nextPageToken,files(id,name,description)&pageSize=999&spaces=appDataFolder&" + Y + (a ? "&pageToken=" + a : "") + (t ? "&q=name contains '" + t + "'" : ""), !0);
            l.send()
        };
    c("", "" + a === a ? a : a.join("' or name contains '"))
}, aH = (a, b) => {
    var d = new XMLHttpRequest;
    d.onload = () => {
        if (500 <= d.status || 403 == d.status) al(aC[0]), 10 > ac ? setTimeout(aH, 1E3 * (Math.pow(2, ac++) + Math.random()), a, b) : al(aC[1]);
        else {
            var c = JSON.parse(d.response);
            c.error ? 401 == d.status ? 10 > ++ac ? aA(() => {
                aH(a, b)
            }) : b(c) : b(c) : (ac = 0, b(c))
        }
    };
    d.open("GET", ad + "/" + a + "?fields=name,description&" + Y, !0);
    d.send()
}, aI = (a, b, d) => {
    var c = new XMLHttpRequest;
    c.onload = () => {
        if (500 <= c.status || 403 == c.status) al(aC[0]), 10 > ac ? setTimeout(aI, 1E3 * (Math.pow(2, ac++) + Math.random()), a, b, d) : al(aC[1]);
        else {
            var l = JSON.parse(c.response);
            401 == c.status ? 10 > ++ac ? aA(() => {
                aI(a, b, d)
            }) : d(l) : (ac = 0, d(l))
        }
    };
    c.open("PATCH", ad + "/" + a + "?fields&" + Y, !0);
    c.setRequestHeader("Content-Type", "application/json");
    c.send(JSON.stringify({
        description: JSON.stringify(b)
    }))
}, aJ = (a, b, d) => {
    aG(a, c => {
        c.length ? aI(c[0].id, b, d) : aF(a, b, d)
    })
}, aK = (a, b, d) => {
    var c = a.length;
    d && chrome.notifications.create("del", {
        type: "progress",
        iconUrl: "img/t.svg",
        title: "Deleting records",
        message: "Please wait...",
        progress: 0
    });
    if (100 >= c) aL(a, () => {
        d && chrome.notifications.update("del", {
            title: "Records deleted",
            message: "",
            progress: 100
        });
        b()
    });
    else {
        for (var l = 0, t = [], w, ca = "", ba = 0, da = a => {
                ca += a;
                ba++;
                d && chrome.notifications.update("del", {
                    progress: 0 | 100 * ba / w
                });
                ba == w && (d && chrome.notifications.update("del", {
                    title: "Records deleted",
                    message: ""
                }), b(ca))
            }; l < c; l += 100) t[t.length] = a.slice(l, l + 100);
        w = t.length;
        for (l = 0; l < w; l++) aL(t[l], da)
    }
}, aL = (a, b) => {
    var d = new XMLHttpRequest,
        c = a.map(a => "\n--B0UND4RY\nContent-Type: application/http\n\nDELETE " + ad + "/" + a + "?" + Y).join("\n") + "\n--B0UND4RY--";
    d.onload = () => {
        b && b(d.response)
    };
    d.open("POST", "https://www.googleapis.com/batch", !0);
    d.setRequestHeader("Content-Type", "multipart/mixed; boundary=B0UND4RY");
    d.send(c)
}, aM = (a, b, d) => {
    var c = [];
    for (l in a) c[c.length] = JSON.stringify({
        description: JSON.stringify(a[l]),
        mimeType: "text/plain",
        parents: ["appDataFolder"],
        name: l
    });
    if (a = c.length)
        if (d && chrome.notifications.create("imp", {
                type: "progress",
                iconUrl: "img/t.svg",
                title: "Importing records",
                message: "Please wait...",
                progress: 0
            }), 100 >= a) aN(c, a => {
            d && chrome.notifications.update("imp", {
                title: "All records imported",
                message: "",
                progress: 100
            });
            az(() => {
                b(a)
            })
        });
        else {
            var l = 0;
            for (var t = [], w, ca = "", ba = 0, da = a => {
                    ca += a;
                    ba++;
                    d && chrome.notifications.update("imp", {
                        progress: 0 | 100 * ba / w
                    });
                    ba == w && (d && chrome.notifications.update("imp", {
                        title: "All records imported",
                        message: ""
                    }), az(() => {
                        b(ca)
                    }))
                }; l < a; l += 100) t[t.length] = c.slice(l, l + 100);
            w = t.length;
            for (l = 0; l < w; l++) aN(t[l], da)
        }
    else b("")
}, aN = (a, b) => {
    var d = a.map(a => "\n--B0UND4RY\nContent-Type: application/http\n\nPOST " + ad + "?fields=id,description&" + Y + "\nContent-type: application/json\n\n" + a).join("\n") + "\n--B0UND4RY--",
        c = new XMLHttpRequest;
    c.onload = () => {
        b && b(c.response)
    };
    c.open("POST", "https://www.googleapis.com/batch", !0);
    c.setRequestHeader("Content-Type", "multipart/mixed; boundary=B0UND4RY");
    c.send(d)
}, aO = () => {
    !(65536 & o.oflags) || 1 & F || j || (ai.play(), setTimeout(aO, 2E4))
}, aP = () => {
    j && p && chrome.tabs.reload(p)
}, aQ = () => {
    chrome.tabs.onRemoved.addListener(a => {
        var b = I.indexOf(a),
            d = J.indexOf(a);
        a === p && at();
        ~b && (I[b] = 0);
        ~d && (J[d] = 0);
        a === r && (r = 0);
        a === u && (u = 0);
        a === v && (v = 0)
    });
    chrome.tabs.onUpdated.addListener((a, b, d) => {
        if (a === p && !~d.url.indexOf("www.raterhub.com")) at();
        else if (8192 & o.oflags && "complete" === b.status) {
            var c = I.indexOf(a),
                l = J.indexOf(a);
            !~c || d.windowId != L && d.windowId != K || chrome.tabs.executeScript(a, {
                file: "s.js"
            }, () => {
                chrome.runtime.lastError || chrome.tabs.sendMessage(a, {
                    command: "datapassing",
                    side: 0,
                    dupe: ~l,
                    result: c + 1,
                    query: N,
                    flags: O,
                    isthereq: P[c],
                    lblArray: S,
                    sliderLength: R,
                    PQlblArray: ah,
                    PQsliderLength: ag
                })
            });
            !~l || d.windowId != M && d.windowId != K || chrome.tabs.executeScript(a, {
                file: "s.js"
            }, () => {
                chrome.runtime.lastError || chrome.tabs.sendMessage(a, {
                    command: "datapassing",
                    side: 1,
                    dupe: ~c,
                    result: l + 1,
                    query: N,
                    flags: O,
                    isthereq: Q[l],
                    lblArray: S,
                    sliderLength: R,
                    PQlblArray: ah,
                    PQsliderLength: ag
                })
            })
        }
        a !== u || ~d.url.indexOf(chrome.runtime.id) || (u = 0)
    });
    chrome.windows.onRemoved.addListener(a => {
        a === L && (L = 0);
        a === M && (M = 0);
        a === K && (K = 0)
    });
    chrome.runtime.onMessage.addListener(av);
    chrome.webRequest.onHeadersReceived.addListener(a => {
        if (x && a.tabId === p && 1 & F && ~a.url.indexOf("new-task")) {
            a = B;
            var b = h,
                d = E - 1;
            B > o.ct ? m = Date.now() : (clearTimeout(n), F &= -2);
            E = D = 0;
            f[b] ? al("Task " + b + " already submitted") : ar(g, a, d, b)
        } else b = G.indexOf(a.url), d = H.indexOf(a.url), ~b && (I[b] = a.tabId), ~d && (J[d] = a.tabId)
    }, {
        urls: ["<all_urls>"]
    });
    chrome.tabs.query({}, a => {
        for (var b = a.length; b--;)
            if (~a[b].url.indexOf(chrome.runtime.id + "/n")) {
                u = a[b].id;
                chrome.tabs.reload(u);
                break
            }
    });
    ap();
    T && ax()
};
chrome.notifications.onButtonClicked.addListener(a => {
    "updAvail" === a ? chrome.runtime.reload() : "aet" !== a || 32 & F || !x || (chrome.tabs.sendMessage(p, {
        command: "click",
        stop: 16384 & o.oflags
    }), F |= 32)
});
chrome.notifications.onClicked.addListener(() => {
    p && chrome.tabs.update(p, {
        active: !0
    }, a => {
        chrome.windows.update(a.windowId, {
            focused: !0
        })
    })
});
chrome.runtime.onInstalled.addListener(a => {
    "install" === a.reason ? T = 1 : "update" === a.reason && chrome.runtime.getManifest().version != a.previousVersion && (T = 2)
});
chrome.runtime.onUpdateAvailable.addListener(a => {
    chrome.notifications.create("updAvail", {
        type: "basic",
        iconUrl: "img/t.svg",
        title: "LBTimer update available",
        message: "New version (" + a.version + ") already available.",
        buttons: [{
            title: "Update now",
            iconUrl: "img/t.svg"
        }]
    })
});
chrome.storage.local.set({
    l: []
});
chrome.identity.getAuthToken({
    interactive: !0
}, a => {
    a ? (Y = "access_token=" + a, az()) : chrome.runtime.lastError && setTimeout(chrome.runtime.reload, confirm("LBTimer found a problem accessing Google Drive\u2122.\nDo you want to retry?") ? 0 : 6E4)
})