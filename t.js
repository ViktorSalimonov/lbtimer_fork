var d = document,
    e, f, g, h, k, l = /(\d+)\D(\d+)\D(\d+)/,
    m = a => {
        var b = 4;
        var r = a => a.getFullYear() + ("0" + (a.getMonth() + 1)).slice(-2) + ("0" + a.getDate()).slice(-2);
        g = a;
        f = d.body.querySelectorAll("SPAN > INPUT");
        a = l.exec(e[1].textContent);
        var p = l.exec(e[2].textContent);
        if (a && p) {
            for (; 2 >= a[--b].length;);
            switch (b) {
                case 2:
                    a = [0, a[1], a[3], a[2]];
                    p = [0, p[1], p[3], p[2]];
                    break;
                case 1:
                    a = [0, a[2], a[3], a[1]], p = [0, p[2], p[3], p[1]]
            }
            var q = ~~a[1];
            b = ~~a[2];
            var t = ~~p[1];
            p = ~~p[2];
            a = ~~a[3];
            q = q === t ? new Date(a, q - 1, b) : b === p ? new Date(a, b - 1, q) : 12 < b ? new Date(a, q - 1, b) : new Date(a, b - 1, q)
        }
        if (q && f.length) {
            h = /([,.])/.exec(f[0].value)[1];
            k = [r(q)];
            for (b = 6; q.setDate(q.getDate() + 1) && b--;) k[k.length] = r(q);
            chrome.runtime.sendMessage({
                command: "tsa",
                week: k
            }, n)
        }
    },
    n = a => {
        var b, r, p;
        for (b = 7; b--;)
            if (p = a[k[b]]) {
                var q = 2 * b;
                if (!f[q].readOnly)
                    for (r = 0; 7 > r; r++, q += 16) {
                        f[q].value = (p[g ? 2 * r : 14 + r] / 60).toFixed(2).replace(".", h);
                        f[q++].click();
                        var t = f[q];
                        t.value = p[2 * r + 1];
                        t.click()
                    }
            } t && (t.blur(), d.getElementById("lbAuto").checked && d.getElementsByClassName("urBtnStd")[2].click())
    },
    o = () => {
        e = d.body.getElementsByTagName("TH");
        if (e.length && l.test(e[1].textContent) && !d.getElementById("lbf")) {
            var a = d.createElement("a");
            d.querySelector(".urTbarItmBtn").parentNode.appendChild(a);
            a.outerHTML = '<style>#lbAuto{-webkit-appearance:none;position:relative}#lbAuto:focus{outline:0}#lbAuto:after{transition:all .3s ease;content:"";position:absolute;left:-5px;top:-3px;width:5px;height:5px;border:1px dotted #ddd}#lbAuto:checked:after{transform:rotate(-45deg);height:3px;border:2px #000;border-style:none none solid solid}#lba{color:#000;opacity:.4}:checked+#lba{opacity:1}</style><span class=urTbarItmBtn style=max-height:20px canhide=false><span class="urBtnStd urBtnRadius urBtnStdValign"id=lbf title="Fill the Timesheet with LBTimer\'s AET data"><img align=absmiddle src=\'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/><circle cx="50" cy="50" r="41" fill="#fff"/><rect x="48" y="12" width="8" height="42" rx="4" ry="4"/><rect x="48" y="48" width="35" height="7" rx="3.5" ry="3.5"/></svg>\' style=width:14px> Fill AET</span><span class="urBtnStd urBtnRadius urBtnStdValign"id=lbr title="Fill the Timesheet with LBTimer\'s real time data"><img align=absmiddle src=\'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50"/><circle cx="50" cy="50" r="41" fill="#fff"/><rect x="48" y="12" width="8" height="42" rx="4" ry="4"/><rect x="48" y="48" width="35" height="7" rx="3.5" ry="3.5"/></svg>\' style=width:14px> Fill real</span><label class="urBtnStd urBtnRadius"style=line-height:15px><input type=checkbox id=lbAuto checked><span id=lba> auto-save<span></label></span>';
            d.getElementById("lbf").onclick = () => {
                m(1)
            };
            d.getElementById("lbr").onclick = () => {
                m(0)
            }
        }
        setTimeout(o, 500)
    };
o()