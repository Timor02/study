
var window = new Object();
window.parseInt = parseInt;

function le() {
    return new Date()["getTime"]()
}

var at = le()

function randoms(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomValues(buf) {
    var min = 0,
        max = 255;
    if (buf.length > 65536) {
        var e = new Error();
        e.code = 22;
        e.message = 'Failed to execute \'getRandomValues\' : The ' + 'ArrayBufferView\'s byte length (' + buf.length + ') exceeds the ' + 'number of bytes of entropy available via this API (65536).';
        e.name = 'QuotaExceededError';
        throw e;
    }
    if (buf instanceof Uint16Array) {
        max = 65535;
    } else if (buf instanceof Uint32Array) {
        max = 4294967295;
    }
    for (var element in buf) {
        buf[element] = randoms(min, max);
    }
    return buf;
}

var QpeE = function () {
    function hBhQ() {
        var e = this["s"] & this["DM"];
        while (this["t"] > 0 && this[this["t"] - 1] == e)
            --this["t"];
    }

    function cqBr(e, t) {
        var r = p[e["charCodeAt"](t)];
        return r == null ? -1 : r;
    }

    function guOL(e, t) {
        var r;
        if (t == 16)
            r = 4;
        else if (t == 8)
            r = 3;
        else if (t == 256)
            r = 8;
        else if (t == 2)
            r = 1;
        else if (t == 32)
            r = 5;
        else if (t == 4)
            r = 2;
        else {
            this["fromRadix"](e, t);
            return;
        }
        this["t"] = 0;
        this["s"] = 0;
        var n = e["length"], i = false, a = 0;
        while (--n >= 0) {
            var o = r == 8 ? e[n] & 255 : cqBr(e, n);
            if (o < 0) {
                if (e["charAt"](n) == "-")
                    i = true;
                continue;
            }
            i = false;
            if (a == 0)
                this[this["t"]++] = o;
            else if (a + r > this["DB"]) {
                this[this["t"] - 1] |= (o & (1 << this["DB"] - a) - 1) << a;
                this[this["t"]++] = o >> this["DB"] - a;
            } else
                this[this["t"] - 1] |= o << a;
            a += r;
            if (a >= this["DB"])
                a -= this["DB"];
        }
        if (r == 8 && (e[0] & 128) != 0) {
            this["s"] = -1;
            if (a > 0)
                this[this["t"] - 1] |= (1 << this["DB"] - a) - 1 << a;
        }
        this["clamp"]();
        if (i)
            WjzJ["ZERO"]["subTo"](this, this);
    }

    function aQpu(e, t, r, n, i, a) {
        var o = t & 16383
            , s = t >> 14;
        while (--a >= 0) {
            var c = this[e] & 16383;
            var _ = this[e++] >> 14;
            var l = s * c + _ * o;
            c = o * c + ((l & 16383) << 14) + r[n] + i;
            i = (c >> 28) + (l >> 14) + s * _;
            r[n++] = c & 268435455;
        }
        return i;
    }

    function WjzJ(e, t, r) {
        if (e != null)
            if ("number" == typeof e)
                this[kyUT(236)](e, t, r);
            else if (t == null && "string" != typeof e)
                this["fromString"](e, 256);
            else
                this["fromString"](e, t);
    }


    var c;
    var _ = 0xdeadbeefcafe;
    var l = (_ & 16777215) == 15715070;

    // todo 判断浏览器类型，移植到app端可能需要修改

    if (l && "Netscape" == "Microsoft Internet Explorer") {
        WjzJ["prototype"]["am"] = ZPgK;
        c = 30;
    } else if (l && "Netscape" != "Netscape") {
        WjzJ["prototype"]["am"] = YrEb;
        c = 26;
    } else {
        WjzJ["prototype"]["am"] = aQpu;
        c = 28;
    }
    WjzJ.prototype.fromString = guOL;
    WjzJ.prototype.clamp = hBhQ;
    WjzJ["prototype"]["DB"] = c;
    WjzJ["prototype"]["DM"] = (1 << c) - 1;
    WjzJ["prototype"]["DV"] = 1 << c;
    var u = 52;
    WjzJ["prototype"]["FV"] = Math["pow"](2, u);
    WjzJ["prototype"]["F1"] = u - c;
    WjzJ["prototype"]["F2"] = 2 * c - u;
    WjzJ["prototype"]["bitLength"] = nbuq;
    var f = "0123456789abcdefghijklmnopqrstuvwxyz";
    var p = [];
    var h, g;
    h = "0"["charCodeAt"](0);
    for (g = 0; g <= 9; ++g)
        p[h++] = g;
    h = "a"["charCodeAt"](0);
    for (g = 10; g < 36; ++g)
        p[h++] = g;
    h = "A"["charCodeAt"](0);
    for (g = 10; g < 36; ++g)
        p[h++] = g;

    function LNjU() {
        return (this["t"] > 0 ? this[0] & 1 : this["s"]) == 0;
    }

    function GaNE(e) {
        var t = Xmrm();
        e["abs"]()["dlShiftTo"](this["m"]["t"], t);
        t["divRemTo"](this["m"], null, t);
        if (e["s"] < 0 && t["compareTo"](WjzJ["ZERO"]) > 0)
            this["m"]["subTo"](t, t);
        return t;
    }

    function Jies(e, t) {
        e["squareTo"](t);
        this["reduce"](t);
    }

    function IQMr(e) {
        while (e["t"] <= this["mt2"])
            e[e["t"]++] = 0;
        for (var t = 0; t < this["m"]["t"]; ++t) {
            var r = e[t] & 32767;
            var n = r * this["mpl"] + ((r * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
            r = t + this["m"]["t"];
            e[r] += this["m"]["am"](0, n, e, t, 0, this["m"]["t"]);
            while (e[r] >= e["DV"]) {
                e[r] -= e["DV"];
                e[++r]++;
            }
        }
        e["clamp"]();
        e["drShiftTo"](this["m"]["t"], e);
        if (e["compareTo"](this["m"]) >= 0)
            e["subTo"](this["m"], e);
    }

    function KHLT(e, t, r) {
        e["multiplyTo"](t, r);
        this["reduce"](r);
    }

    function HPR_(e) {
        var t = Xmrm();
        e["copyTo"](t);
        this["reduce"](t);
        return t;
    }

    function FoSD(e) {
        this["m"] = e;
        this["mp"] = e["invDigit"]();
        this["mpl"] = this["mp"] & 32767;
        this["mph"] = this["mp"] >> 15;
        this["um"] = (1 << e["DB"] - 15) - 1;
        this["mt2"] = 2 * e["t"];
    }

    FoSD["prototype"]["convert"] = GaNE;
    FoSD["prototype"]["sqrTo"] = Jies;
    FoSD["prototype"]["reduce"] = IQMr;
    FoSD["prototype"]["mulTo"] = KHLT;
    FoSD["prototype"]["revert"] = HPR_;

    function pDUT(e, t) {
        for (var r = e; r < this["t"]; ++r)
            t[r - e] = this[r];
        t["t"] = Math["max"](this["t"] - e, 0);
        t["s"] = this["s"];
    }

    function ETGF() {
        if (this["t"] < 1)
            return 0;
        var e = this[0];
        if ((e & 1) == 0)
            return 0;
        var t = e & 3;
        t = t * (2 - (e & 15) * t) & 15;
        t = t * (2 - (e & 255) * t) & 255;
        t = t * (2 - ((e & 65535) * t & 65535)) & 65535;
        t = t * (2 - e * t % this["DV"]) % this["DV"];
        return t > 0 ? this["DV"] - t : -t;
    }

    function Xmrm() {
        return new WjzJ(null);
    }

    function MQfV(e, t) {
        if (e > 4294967295 || e < 1)
            return WjzJ["ONE"];
        var r = Xmrm()
            , n = Xmrm()
            , i = t["convert"](this)
            , a = meAU(e) - 1;
        i["copyTo"](r);
        while (--a >= 0) {
            t["sqrTo"](r, n);
            if ((e & 1 << a) > 0)
                t["mulTo"](n, i, r);
            else {
                var o = r;
                r = n;
                n = o;
            }
        }
        return t["revert"](r);
    }

    function klMs() {
        return this["s"] < 0 ? this["negate"]() : this;
    }

    function olTJ(e, t) {
        var r;
        for (r = this["t"] - 1; r >= 0; --r)
            t[r + e] = this[r];
        for (r = e - 1; r >= 0; --r)
            t[r] = 0;
        t["t"] = this["t"] + e;
        t["s"] = this["s"];
    }

    function vPDV(e, t, r) {
        var n = e["abs"]();
        if (n["t"] <= 0)
            return;
        var i = this["abs"]();
        if (i["t"] < n["t"]) {
            if (t != null)
                t["fromInt"](0);
            if (r != null)
                this["copyTo"](r);
            return;
        }
        if (r == null)
            r = Xmrm();
        var a = Xmrm()
            , o = this["s"]
            , s = e["s"];
        var c = this["DB"] - meAU(n[n["t"] - 1]);
        if (c > 0) {
            n["lShiftTo"](c, a);
            i["lShiftTo"](c, r);
        } else {
            n["copyTo"](a);
            i["copyTo"](r);
        }
        var _ = a["t"];
        var l = a[_ - 1];
        if (l == 0)
            return;
        var u = l * (1 << this["F1"]) + (_ > 1 ? a[_ - 2] >> this["F2"] : 0);
        var f = this["FV"] / u
            , p = (1 << this["F1"]) / u
            , h = 1 << this["F2"];
        var g = r["t"]
            , d = g - _
            , v = t == null ? Xmrm() : t;
        a["dlShiftTo"](d, v);
        if (r["compareTo"](v) >= 0) {
            r[r["t"]++] = 1;
            r["subTo"](v, r);
        }
        WjzJ["ONE"]["dlShiftTo"](_, v);
        v["subTo"](a, a);
        while (a["t"] < _)
            a[a["t"]++] = 0;
        while (--d >= 0) {
            var m = r[--g] == l ? this["DM"] : Math["floor"](r[g] * f + (r[g - 1] + h) * p);
            if ((r[g] += a["am"](0, m, r, d, 0, _)) < m) {
                a["dlShiftTo"](d, v);
                r["subTo"](v, r);
                while (r[g] < --m)
                    r["subTo"](v, r);
            }
        }
        if (t != null) {
            r["drShiftTo"](_, t);
            if (o != s)
                WjzJ["ZERO"]["subTo"](t, t);
        }
        r["t"] = _;
        r["clamp"]();
        if (c > 0)
            r["rShiftTo"](c, r);
        if (o < 0)
            WjzJ["ZERO"]["subTo"](r, r);
    }

    function qJWt(e, t) {
        var r = e % this["DB"];
        var n = this["DB"] - r;
        var i = (1 << n) - 1;
        var a = Math["floor"](e / this["DB"]), o = this["s"] << r & this["DM"], s;
        for (s = this["t"] - 1; s >= 0; --s) {
            t[s + a + 1] = this[s] >> n | o;
            o = (this[s] & i) << r;
        }
        for (s = a - 1; s >= 0; --s)
            t[s] = 0;
        t[a] = o;
        t["t"] = this["t"] + a + 1;
        t["s"] = this["s"];
        t["clamp"]();
    }

    function lOox(e) {
        var t = this["s"] - e["s"];
        if (t != 0)
            return t;
        var r = this["t"];
        t = r - e["t"];
        if (t != 0)
            return this["s"] < 0 ? -t : t;
        while (--r >= 0)
            if ((t = this[r] - e[r]) != 0)
                return t;
        return 0;
    }

    function eaXc(e) {
        this["t"] = 1;
        this["s"] = e < 0 ? -1 : 0;
        if (e > 0)
            this[0] = e;
        else if (e < -1)
            this[0] = e + this["DV"];
        else
            this["t"] = 0;
    }

    function fCX_(e) {
        var t = Xmrm();
        t["fromInt"](e);
        return t;
    }

    function suGK(e, t) {
        var r = 0
            , n = 0
            , i = Math["min"](e["t"], this["t"]);
        while (r < i) {
            n += this[r] - e[r];
            t[r++] = n & this["DM"];
            n >>= this["DB"];
        }
        if (e["t"] < this["t"]) {
            n -= e["s"];
            while (r < this["t"]) {
                n += this[r];
                t[r++] = n & this["DM"];
                n >>= this["DB"];
            }
            n += this["s"];
        } else {
            n += this["s"];
            while (r < e["t"]) {
                n -= e[r];
                t[r++] = n & this["DM"];
                n >>= this["DB"];
            }
            n -= e["s"];
        }
        t["s"] = n < 0 ? -1 : 0;
        if (n < -1)
            t[r++] = this["DV"] + n;
        else if (n > 0)
            t[r++] = n;
        t["t"] = r;
        t["clamp"]();
    }

    function rqQk(e, t) {
        t["s"] = this["s"];
        var r = Math["floor"](e / this["DB"]);
        if (r >= this["t"]) {
            t["t"] = 0;
            return;
        }
        var n = e % this["DB"];
        var i = this["DB"] - n;
        var a = (1 << n) - 1;
        t[0] = this[r] >> n;
        for (var o = r + 1; o < this["t"]; ++o) {
            t[o - r - 1] |= (this[o] & a) << i;
            t[o - r] = this[o] >> n;
        }
        if (n > 0)
            t[this["t"] - r - 1] |= (this["s"] & a) << i;
        t["t"] = this["t"] - r;
        t["clamp"]();
    }

    function dnJQ(e) {
        for (var t = this["t"] - 1; t >= 0; --t)
            e[t] = this[t];
        e["t"] = this["t"];
        e["s"] = this["s"];
    }

    function uwpO(e) {
        var t = this["abs"]();
        var r = e["t"] = 2 * t["t"];
        while (--r >= 0)
            e[r] = 0;
        for (r = 0; r < t["t"] - 1; ++r) {
            var n = t["am"](r, t[r], e, 2 * r, 0, 1);
            if ((e[r + t["t"]] += t["am"](r + 1, 2 * t[r], e, 2 * r + 1, n, t["t"] - r - 1)) >= t["abs"]) {
                e[r + t["t"]] -= t["abs"];
                e[r + t["t"] + 1] = 1;
            }
        }
        if (e["t"] > 0)
            e[e["t"] - 1] += t["am"](r, t[r], e, 2 * r, 0, 1);
        e["s"] = 0;
        e["clamp"]();
    }

    function trhH(e, t) {
        var r = this["abs"]()
            , n = e["abs"]();
        var i = r["t"];
        t["t"] = i + n["t"];
        while (--i >= 0)
            t[i] = 0;
        for (i = 0; i < n["t"]; ++i)
            t[i + r["t"]] = r["am"](0, n[i], t, i, 0, r["t"]);
        t["s"] = 0;
        t["clamp"]();
        if (this["s"] != e["s"])
            WjzJ["ZERO"]["subTo"](t, t);
    }

    function bFPh(e) {
        return f["charAt"](e);
    }

    function iZIm(e) {
        if (this["s"] < 0)
            return "-" + this["negate"]()["toString"](e);
        var t;
        if (e == 16)
            t = 4;
        else if (e == 8)
            t = 3;
        else if (e == 2)
            t = 1;
        else if (e == 32)
            t = 5;
        else if (e == 4)
            t = 2;
        else
            return this["toRadix"](e);
        var r = (1 << t) - 1, n, i = false, a = "", o = this["t"];
        var s = this["DB"] - o * this["DB"] % t;
        if (o-- > 0) {
            if (s < this["DB"] && (n = this[o] >> s) > 0) {
                i = true;
                a = bFPh(n);
            }
            while (o >= 0) {
                if (s < t) {
                    n = (this[o] & (1 << s) - 1) << t - s;
                    n |= this[--o] >> (s += this["DB"] - t);
                } else {
                    n = this[o] >> (s -= t) & r;
                    if (s <= 0) {
                        s += this["DB"];
                        --o;
                    }
                }
                if (n > 0)
                    i = true;
                if (i)
                    a += bFPh(n);
            }
        }
        return i ? a : "0";
    }

    function NeDb(e, t) {
        var r;
        if (e < 256 || t["isEven"]())
            r = new xRCM(t);
        else
            r = new FoSD(t);
        return this["exp"](e, r);
    }

    WjzJ["prototype"]["modPowInt"] = NeDb;
    WjzJ["prototype"]["isEven"] = LNjU;
    WjzJ["prototype"]["exp"] = MQfV;
    WjzJ["prototype"]["invDigit"] = ETGF;
    WjzJ["prototype"]["abs"] = klMs;
    WjzJ["prototype"]["dlShiftTo"] = olTJ;
    WjzJ["prototype"]["divRemTo"] = vPDV;
    WjzJ["prototype"]["lShiftTo"] = qJWt;
    WjzJ["prototype"]["compareTo"] = lOox;
    WjzJ["prototype"]["subTo"] = suGK;
    WjzJ["prototype"]["fromInt"] = eaXc;
    WjzJ["prototype"]["rShiftTo"] = rqQk;
    WjzJ["prototype"]["copyTo"] = dnJQ;
    WjzJ["prototype"]["squareTo"] = uwpO;
    WjzJ["prototype"]["drShiftTo"] = pDUT;
    WjzJ["prototype"]["multiplyTo"] = trhH;
    WjzJ["prototype"]["toString"] = iZIm;
    WjzJ["ONE"] = fCX_(1);

    function OauX(e, t) {
        return new WjzJ(e, t);
    }


    function RJUf(e, t) {
        if (e != null && t != null && e["length"] > 0 && t["length"] > 0) {
            this["n"] = OauX(e, 16);
            this["e"] = parseInt(t, 16);
        } else
            console && console[kyUT(94)] && console[jaES(94)](jaES(316));
    }

    function SsvR(e) {
        return e["modPowInt"](this["e"], this["n"]);
    }

    function meAU(e) {
        var t = 1, r;
        if ((r = e >>> 16) != 0) {
            e = r;
            t += 16;
        }
        if ((r = e >> 8) != 0) {
            e = r;
            t += 8;
        }
        if ((r = e >> 4) != 0) {
            e = r;
            t += 4;
        }
        if ((r = e >> 2) != 0) {
            e = r;
            t += 2;
        }
        if ((r = e >> 1) != 0) {
            e = r;
            t += 1;
        }
        return t;
    }

    function nbuq() {
        if (this["t"] <= 0)
            return 0;
        return this["DB"] * (this["t"] - 1) + meAU(this[this["t"] - 1] ^ this["s"] & this["DM"]);
    }

    function THBO(e) {
        var t = PqPm(e, this["n"]["bitLength"]() + 7 >> 3);
        if (t == null)
            return null;
        var r = this["doPublic"](t);
        if (r == null)
            return null;
        var n = r["toString"](16);
        if ((n["length"] & 1) == 0)
            return n;
        else
            return "0" + n;
    }

    var n = 256;
    var t;
    var i;
    var a;
    if (i == null) {
        i = [];
        a = 0;
        var e;
        if (true) {
            var r = new Uint32Array(256);
            r = getRandomValues(r);
            for (e = 0; e < r["length"]; ++e)
                i[a++] = r[e] & 255;
        }
        var o = 0;

        function s(e) {
            o = o || 0;
            if (o >= 256 || a >= n) {
                if (window["removeEventListener"]) {
                    o = 0;
                    window["removeEventListener"]("mousemove", s, false);
                } else if (window["detachEvent"]) {
                    o = 0;
                    window["detachEvent"]("mousemove", s);
                }
                return;
            }
            try {
                var t = e[kyUT(293)] + e[jaES(249)];
                i[a++] = t & 255;
                o += 1;
            } catch (r) {
            }
        }

        if (window["addEventListener"])
            window["addEventListener"]("mousemove", s, false);
        else if (window["attachEvent"])
            window["attachEvent"]("onmousemove", s);
    }

    function QvAB(e) {
        var t, r, n;
        for (t = 0; t < 256; ++t)
            this["S"][t] = t;
        r = 0;
        for (t = 0; t < 256; ++t) {
            r = r + this["S"][t] + e[t % e["length"]] & 255;
            n = this["S"][t];
            this["S"][t] = this["S"][r];
            this["S"][r] = n;
        }
        this["i"] = 0;
        this["j"] = 0;
    }

    function RtyK() {
        var e;
        this["i"] = this["i"] + 1 & 255;
        this["j"] = this["j"] + this["S"][this["i"]] & 255;
        e = this["S"][this["i"]];
        this["S"][this["i"]] = this["S"][this["j"]];
        this["S"][this["j"]] = e;
        return this["S"][e + this["S"][this["i"]] & 255];
    }

    function SJHl() {
        return new PDhY();
    }

    function PDhY() {
        this["i"] = 0;
        this["j"] = 0;
        this["S"] = [];
    }

    PDhY["prototype"]["init"] = QvAB
    PDhY["prototype"]["next"] = RtyK

    function TLFQ() {

        // if (t == null) {
        if (true) {
            t = SJHl();
            while (a < n) {
                var e = Math["floor"](65536 * Math["random"]());
                i[a++] = e & 255;
            }
            t["init"](i);
            for (a = 0; a < i["length"]; ++a)
                i[a] = 0;
            a = 0;
        }
        return t["next"]();
    }

    function VEHM() {

    }

    function UatZ(e) {
        var t;
        for (t = 0; t < e["length"]; ++t)
            e[t] = TLFQ();
    }

    VEHM.prototype.nextBytes = UatZ;


    function PqPm(e, t) {
        if (t < e["length"] + 11) {
            console && console["error"] && console["error"]("Message too long for RSA");
            return null;
        }
        var r = [];
        var n = e["length"] - 1;
        while (n >= 0 && t > 0) {
            var i = e["charCodeAt"](n--);
            if (i < 128) {
                r[--t] = i;
            } else if (i > 127 && i < 2048) {
                r[--t] = i & 63 | 128;
                r[--t] = i >> 6 | 192;
            } else {
                r[--t] = i & 63 | 128;
                r[--t] = i >> 6 & 63 | 128;
                r[--t] = i >> 12 | 224;
            }
        }
        r[--t] = 0;
        var a = new VEHM();
        var o = [];
        while (t > 2) {
            o[0] = 0;
            while (o[0] == 0)
                a["nextBytes"](o);
            r[--t] = o[0];
        }
        r[--t] = 2;
        r[--t] = 0;
        return new WjzJ(r);
    }

    function QpeE() {
        this["n"] = null;
        this["e"] = 0;
        this["d"] = null;
        this["p"] = null;
        this["q"] = null;
        this["dmp1"] = null;
        this["dmq1"] = null;
        this["coeff"] = null;
        var e = "00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81";
        var t = "10001";
        this["setPublic"](e, t);
    }

    QpeE.prototype.doPublic = SsvR;
    QpeE.prototype.setPublic = RJUf;
    QpeE.prototype.encrypt = THBO;
    return QpeE;
}();

var ce = function () {
    function S4() {
        return ((1 + Math["random"]()) * 65536 | 0)["toString"](16)["substring"](1);
    }

    return function () {
        return S4() + S4() + S4() + S4();
    }
        ;
}();

var it = function () {
    var r = Object["create"] || function () {
        var qLxW = AVech.DHD
            , pqlyrF = ["tjzNc"].concat(qLxW)
            , rbyb = pqlyrF[1];
        pqlyrF.shift();
        var stqS = pqlyrF[0];

        function F() {
            var vxS = AVech.EIy()[4][10];
            for (; vxS !== AVech.EIy()[0][10];) {
                switch (vxS) {
                }
            }
        }

        return function (e) {
            var vpzo = AVech.DHD
                , uQaoCj = ["yOLgn"].concat(vpzo)
                , whgF = uQaoCj[1];
            uQaoCj.shift();
            var xTGV = uQaoCj[0];
            var t;
            F[whgF(292)] = e;
            t = new F();
            F[vpzo(292)] = null;
            return t;
        }
            ;
    }();
    var e = {};
    var t = e["lib"] = {};
    var n = t["Base"] = function () {
        return {
            "extend": function (e) {
                var t = r(this);
                if (e) {
                    t["mixIn"](e);
                }
                if (!t["hasOwnProperty"]("init") || this["init"] === t["init"]) {
                    t["init"] = function () {
                        t["$super"]["init"]["apply"](this, arguments);
                    }
                    ;
                }
                t["init"]["prototype"] = t;
                t["$super"] = this;
                return t;
            },
            "create": function () {
                var e = this["extend"]();
                e["init"]["apply"](e, arguments);
                return e;
            },
            "init": function () {
            },
            "mixIn": function (e) {
                for (var t in e) {
                    if (e["hasOwnProperty"](t)) {
                        this[t] = e[t];
                    }
                }
                if (e["hasOwnProperty"]("toString")) {
                    this["toString"] = e["toString"];
                }
            }
        };
    }();
    var u = t["WordArray"] = n["extend"]({
        "init": function (e, t) {
            e = this["words"] = e || [];
            if (t != undefined) {
                this["sigBytes"] = t;
            } else {
                this["sigBytes"] = e["length"] * 4;
            }
        },
        "concat": function (e) {
            var t = this["words"];
            var r = e["words"];
            var n = this["sigBytes"];
            var i = e["sigBytes"];
            this["clamp"]();
            if (n % 4) {
                for (var a = 0; a < i; a++) {
                    var o = r[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                    t[n + a >>> 2] |= o << 24 - (n + a) % 4 * 8;
                }
            } else {
                for (var a = 0; a < i; a += 4) {
                    t[n + a >>> 2] = r[a >>> 2];
                }
            }
            this["sigBytes"] += i;
            return this;
        },
        "clamp": function () {
            var e = this["words"];
            var t = this["sigBytes"];
            e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8;
            e["length"] = Math["ceil"](t / 4);
        }
    });
    var i = e["enc"] = {};
    var l = i["Latin1"] = {
        "parse": function (e) {
            var t = e["length"];
            var r = [];
            for (var n = 0; n < t; n++) {
                r[n >>> 2] |= (e["charCodeAt"](n) & 255) << 24 - n % 4 * 8;
            }
            return new u[("init")](r, t);
        }
    };
    var a = i["Utf8"] = {
        "parse": function (e) {
            return l["parse"](unescape(encodeURIComponent(e)));
        }
    };
    var o = t["BufferedBlockAlgorithm"] = n["extend"]({
        "reset": function () {
            this["TqDL"] = new u[("init")]();
            this["ARSH"] = 0;
        },
        "Bbdd": function (e) {
            if (typeof e == "string") {
                e = a["parse"](e);
            }
            this["TqDL"]["concat"](e);
            this["ARSH"] += e["sigBytes"];
        },
        "CqNl": function (e) {
            var t = this["TqDL"];
            var r = t["words"];
            var n = t["sigBytes"];
            var i = this["blockSize"];
            var a = i * 4;
            var o = n / a;
            if (e) {
                o = Math["ceil"](o);
            } else {
                o = Math["max"]((o | 0) - this["DHUf"], 0);
            }
            var s = o * i;
            var c = Math["min"](s * 4, n);
            if (s) {
                for (var _ = 0; _ < s; _ += i) {
                    this["EZCb"](r, _);
                }
                var l = r["splice"](0, s);
                t["sigBytes"] -= c;
            }
            return new u[("init")](l, c);
        },
        "DHUf": 0
    });
    var s = e["algo"] = {};
    var c = t["Cipher"] = o["extend"]({
        "cfg": n["extend"](),
        "createEncryptor": function (e, t) {
            return this["create"](this["FQgp"], e, t);
        },
        "init": function (e, t, r) {
            this["cfg"] = this["cfg"]["extend"](r);
            this["GSeu"] = e;
            this["HlnI"] = t;
            this["reset"]();
        },
        "reset": function () {
            o["reset"]["call"](this);
            this["IWOL"]();
        },
        "process": function (e) {
            var jYAE = AVech.DHD
                , ieQTFL = ["mTvwD"].concat(jYAE)
                , kGre = ieQTFL[1];
            ieQTFL.shift();
            var lrXF = ieQTFL[0];
            this[jYAE(1133)](e);
            return this[jYAE(1115)]();
        },
        "finalize": function (e) {
            if (e) {
                this["Bbdd"](e);
            }
            var t = this["JsLk"]();
            return t;
        },
        "keySize": 128 / 32,
        "ivSize": 128 / 32,
        "FQgp": 1,
        "KXgw": 2,
        "LVcI": function () {
            return function (_) {
                return {
                    "encrypt": function (e, t, r) {
                        var t = l["parse"](t);
                        if (!r || !r["iv"]) {
                            r = r || {};
                            r["iv"] = l["parse"]("0000000000000000");
                        }
                        var n = m["encrypt"](_, e, t, r);
                        var i = n["ciphertext"]["words"];
                        var a = n["ciphertext"]["sigBytes"];
                        var o = [];
                        for (var s = 0; s < a; s++) {
                            var c = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            o["push"](c);
                        }
                        return o;
                    },
                    "encrypt1": function (e, t, r) {
                        var t = l["parse"](t);
                        if (!r || !r["iv"]) {
                            r = r || {};
                            r["iv"] = l["parse"]("0000000000000000");
                        }
                        var n = m["encrypt"](_, e, t, r);
                        var i = n["ciphertext"]["words"];
                        var a = n["ciphertext"]["sigBytes"];
                        var o = [];
                        for (var s = 0; s < a; s++) {
                            var c = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            o["push"](c);
                        }
                        return o;
                    }
                };
            }
                ;
        }()
    });
    var _ = e["mode"] = {};
    var f = t["BlockCipherMode"] = n["extend"]({
        "createEncryptor": function (e, t) {
            return this["Encryptor"]["create"](e, t);
        },
        "init": function (e, t) {
            this["MfMi"] = e;
            this["NtnQ"] = t;
        }
    });
    var p = _["CBC"] = function () {
        var e = f["extend"]();
        e["Encryptor"] = e["extend"]({
            "processBlock": function (e, t) {
                var r = this["MfMi"];
                var n = r["blockSize"];
                rXtX["call"](this, e, t, n);
                r["encryptBlock"](e, t);
                this["OsjB"] = e["slice"](t, t + n);
            }
        });

        function rXtX(e, t, r) {
            var n = this["NtnQ"];
            if (n) {
                var i = n;
                this["NtnQ"] = undefined;
            } else {
                var i = this["OsjB"];
            }
            for (var a = 0; a < r; a++) {
                e[t + a] ^= i[a];
            }
        }

        return e;
    }();
    var h = e["pad"] = {};
    var g = h["Pkcs7"] = {
        "pad": function (e, t) {
            var r = t * 4;
            var n = r - e["sigBytes"] % r;
            var i = n << 24 | n << 16 | n << 8 | n;
            var a = [];
            for (var o = 0; o < n; o += 4) {
                a["push"](i);
            }
            var s = u["create"](a, n);
            e["concat"](s);
        }
    };
    var d = t["BlockCipher"] = c["extend"]({
        "cfg": c["cfg"]["extend"]({
            "mode": p,
            "padding": g
        }),
        "reset": function () {
            c["reset"]["call"](this);
            var e = this["cfg"];
            var t = e["iv"];
            var r = e["mode"];
            if (this["GSeu"] == this["FQgp"]) {
                var n = r["createEncryptor"];
            }
            if (this["PWGm"] && this["PWGm"]["QIHs"] == n) {
                this["PWGm"]["init"](this, t && t["words"]);
            } else {
                this["PWGm"] = n["call"](r, this, t && t["words"]);
                this["PWGm"]["QIHs"] = n;
            }
        },
        "EZCb": function (e, t) {
            this["PWGm"]["processBlock"](e, t);
        },
        "JsLk": function () {
            var e = this["cfg"]["padding"];
            if (this["GSeu"] == this["FQgp"]) {
                e["pad"](this["TqDL"], this["blockSize"]);
                var t = this["CqNl"](!!"flush");
            }
            return t;
        },
        "blockSize": 128 / 32
    });
    var v = t["CipherParams"] = n["extend"]({
        "init": function (e) {
            this["mixIn"](e);
        }
    });
    var m = t["SerializableCipher"] = n["extend"]({
        "cfg": n["extend"](),
        "encrypt": function (e, t, r, n) {
            n = this["cfg"]["extend"](n);
            var i = e["createEncryptor"](r, n);
            var a = i["finalize"](t);
            var o = i["cfg"];
            return v["create"]({
                "ciphertext": a,
                "key": r,
                "iv": o["iv"],
                "algorithm": e,
                "mode": o["mode"],
                "padding": o["padding"],
                "blockSize": e["blockSize"],
                "formatter": n["format"]
            });
        }
    });
    var w = [];
    var x = [];
    var y = [];
    var b = [];
    var E = [];
    var S = [];
    var T = [];
    var C = [];
    var A = [];
    var k = [];
    (function () {
        var e = [];
        for (var t = 0; t < 256; t++) {
            if (t < 128) {
                e[t] = t << 1;
            } else {
                e[t] = t << 1 ^ 283;
            }
        }
        var r = 0;
        var n = 0;
        for (var t = 0; t < 256; t++) {
            var i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
            i = i >>> 8 ^ i & 255 ^ 99;
            w[r] = i;
            x[i] = r;
            var a = e[r];
            var o = e[a];
            var s = e[o];
            var c = e[i] * 257 ^ i * 16843008;
            y[r] = c << 24 | c >>> 8;
            b[r] = c << 16 | c >>> 16;
            E[r] = c << 8 | c >>> 24;
            S[r] = c;
            var c = s * 16843009 ^ o * 65537 ^ a * 257 ^ r * 16843008;
            T[i] = c << 24 | c >>> 8;
            C[i] = c << 16 | c >>> 16;
            A[i] = c << 8 | c >>> 24;
            k[i] = c;
            if (!r) {
                r = n = 1;
            } else {
                r = a ^ e[e[e[s ^ a]]];
                n ^= e[e[n]];
            }
        }
    }());
    var I = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    var M = s["AES"] = d["extend"]({
        "IWOL": function () {
            if (this["Ryvw"] && this["SYEP"] === this["HlnI"]) {
                return;
            }
            var e = this["SYEP"] = this["HlnI"];
            var t = e["words"];
            var r = e["sigBytes"] / 4;
            var n = this["Ryvw"] = r + 6;
            var i = (n + 1) * 4;
            var a = this["TpUy"] = [];
            for (var o = 0; o < i; o++) {
                if (o < r) {
                    a[o] = t[o];
                } else {
                    var s = a[o - 1];
                    if (!(o % r)) {
                        s = s << 8 | s >>> 24;
                        s = w[s >>> 24] << 24 | w[s >>> 16 & 255] << 16 | w[s >>> 8 & 255] << 8 | w[s & 255];
                        s ^= I[o / r | 0] << 24;
                    } else if (r > 6 && o % r == 4) {
                        s = w[s >>> 24] << 24 | w[s >>> 16 & 255] << 16 | w[s >>> 8 & 255] << 8 | w[s & 255];
                    }
                    a[o] = a[o - r] ^ s;
                }
            }
            var c = this["UweF"] = [];
            for (var _ = 0; _ < i; _++) {
                var o = i - _;
                if (_ % 4) {
                    var s = a[o];
                } else {
                    var s = a[o - 4];
                }
                if (_ < 4 || o <= 4) {
                    c[_] = s;
                } else {
                    c[_] = T[w[s >>> 24]] ^ C[w[s >>> 16 & 255]] ^ A[w[s >>> 8 & 255]] ^ k[w[s & 255]];
                }
            }
        },
        "encryptBlock": function (e, t) {
            this["VcwU"](e, t, this["TpUy"], y, b, E, S, w);
        },
        "VcwU": function (e, t, r, n, i, a, o, s) {
            var c = this["Ryvw"];
            var _ = e[t] ^ r[0];
            var l = e[t + 1] ^ r[1];
            var u = e[t + 2] ^ r[2];
            var f = e[t + 3] ^ r[3];
            var p = 4;
            for (var h = 1; h < c; h++) {
                var g = n[_ >>> 24] ^ i[l >>> 16 & 255] ^ a[u >>> 8 & 255] ^ o[f & 255] ^ r[p++];
                var d = n[l >>> 24] ^ i[u >>> 16 & 255] ^ a[f >>> 8 & 255] ^ o[_ & 255] ^ r[p++];
                var v = n[u >>> 24] ^ i[f >>> 16 & 255] ^ a[_ >>> 8 & 255] ^ o[l & 255] ^ r[p++];
                var m = n[f >>> 24] ^ i[_ >>> 16 & 255] ^ a[l >>> 8 & 255] ^ o[u & 255] ^ r[p++];
                _ = g;
                l = d;
                u = v;
                f = m;
            }
            var g = (s[_ >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[f & 255]) ^ r[p++];
            var d = (s[l >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[_ & 255]) ^ r[p++];
            var v = (s[u >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[_ >>> 8 & 255] << 8 | s[l & 255]) ^ r[p++];
            var m = (s[f >>> 24] << 24 | s[_ >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[u & 255]) ^ r[p++];
            e[t] = g;
            e[t + 1] = d;
            e[t + 2] = v;
            e[t + 3] = m;
        },
        "keySize": 256 / 32
    });
    e["AES"] = d["LVcI"](M);
    return e["AES"];
};

var ge = function () {
    var e = {};
    var t = /^[\],:{}\s]*$/;
    var r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var n = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var i = /(?:^|:|,)(?:\s*\[)+/g;
    var a = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var o = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(e) {
        return e < 10 ? VbUx(79) + e : e;
    }

    function mlZV() {
        return this[VbUx(356)]();
    }

    if (typeof Date["prototype"]["toJSON"] !== "function") {
        Date["prototype"]["toJSON"] = function () {
            var aWLt = AVech.DHD
                , ZHfCfN = ["dHaNG"].concat(aWLt)
                , bIBU = ZHfCfN[1];
            ZHfCfN.shift();
            var cITG = ZHfCfN[0];
            return isFinite(this[bIBU(356)]()) ? this[bIBU(526)]() + bIBU(17) + f(this[bIBU(562)]() + 1) + bIBU(17) + f(this[bIBU(593)]()) + aWLt(556) + f(this[aWLt(559)]()) + aWLt(70) + f(this[aWLt(504)]()) + aWLt(70) + f(this[bIBU(549)]()) + aWLt(564) : null;
        }
        ;
        Boolean["prototype"]["toJSON"] = mlZV;
        Number["prototype"]["toJSON"] = mlZV;
        String["prototype"]["toJSON"] = mlZV;
    }
    var _;
    var l;
    var s;
    var u;

    function nlMl(e) {
        a["lastIndex"] = 0;
        return a["test"](e) ? "\"" + e["replace"](a, function (e) {
            var t = s[e];
            return typeof t === gtiq(91) ? t : fZbq(590) + (gtiq(523) + e[gtiq(136)](0)[gtiq(266)](16))[fZbq(57)](-4);
        }) + "\"" : "\"" + e + "\"";
    }

    function oMmr(e, t) {
        var r;
        var n;
        var i;
        var a;
        var o = _;
        var s;
        var c = t[e];
        if (c && typeof c === "object" && typeof c["toJSON"] === "function") {
            c = c["toJSON"](e);
        }
        if (typeof u === "function") {
            c = u["call"](t, e, c);
        }
        switch (typeof c) {
            case "string":
                return nlMl(c);
            case "number":
                return isFinite(c) ? String(c) : "null";
            case "boolean":
            case "null":
                return String(c);
            case "object":
                if (!c) {
                    return "null";
                }
                _ += l;
                s = [];
                if (Object["prototype"]["toString"]["apply"](c) === "[object Array]") {
                    a = c["length"];
                    for (r = 0; r < a; r += 1) {
                        s[r] = oMmr(r, c) || "null";
                    }
                    i = s["length"] === 0 ? "[]" : _ ? "[\n" + _ + s["join"](",\n" + _) + "\n" + o + "]" : "[" + s["join"](",") + "]";
                    _ = o;
                    return i;
                }
                if (u && typeof u === "object") {
                    a = u["length"];
                    for (r = 0; r < a; r += 1) {
                        if (typeof u[r] === "string") {
                            n = u[r];
                            i = oMmr(n, c);
                            if (i) {
                                s["push"](nlMl(n) + (_ ? ": " : ":") + i);
                            }
                        }
                    }
                } else {
                    for (n in c) {
                        if (Object["prototype"]["hasOwnProperty"]["call"](c, n)) {
                            i = oMmr(n, c);
                            if (i) {
                                s["push"](nlMl(n) + (_ ? ": " : ":") + i);
                            }
                        }
                    }
                }
                i = s["length"] === 0 ? "{}" : _ ? "{\n" + _ + s["join"](",\n" + _) + "\n" + o + "}" : "{" + s["join"](",") + "}";
                _ = o;
                return i;
        }
    }

    s = {
        "\u0008": "\b",
        "\u0009": "\t",
        "\u000a": "\n",
        "\u000c": "\f",
        "\u000d": "\r",
        "\u0022": "\"",
        "\u005c": "\\"
    };
    e["stringify"] = function (e, t, r) {
        var n;
        _ = "";
        l = "";
        if (typeof r === "number") {
            for (n = 0; n < r; n += 1) {
                l += " ";
            }
        } else if (typeof r === "string") {
            l = r;
        }
        u = t;
        if (t && typeof t !== "function" && (typeof t !== "object" || typeof t["length"] !== "number")) {
            throw new Error("JSON.stringify");
        }
        return oMmr("", {
            "": e
        });
    }
    ;
    return e;
}();


var j = {
    "LemD": {
        "MuoB": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
        "NuMA": ".",
        "OTXW": 7274496,
        "PMOt": 9483264,
        "QYPb": 19220,
        "RoMf": 235,
        "SyHp": 24
    },
    "MuoB": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
    "NuMA": ".",
    "OTXW": 7274496,
    "PMOt": 9483264,
    "QYPb": 19220,
    "RoMf": 235,
    "SyHp": 24,
    "TCit": function (e) {
        var t = [];
        for (var r = 0, n = e["length"]; r < n; r += 1) {
            t["push"](e["charCodeAt"](r));
        }
        return t;
    },
    "UHET": function (e) {
        var UiQR = AVech.DHD
            , TbDxLm = ['XRXYU'].concat(UiQR)
            , VLpD = TbDxLm[1];
        TbDxLm.shift();
        var Wsnb = TbDxLm[0];
        var t = VLpD(76);
        for (var r = 0, n = e[VLpD(108)]; r < n; r += 1) {
            t += String[UiQR(156)](e[r]);
        }
        return t;
    },
    "Vwot": function (e) {
        var t = this["MuoB"];
        if (e < 0 || e >= t["length"]) {
            return ".";
        }
        return t["charAt"](e);
    },
    "WVXu": function (e) {
        var eqNJ = AVech.DHD
            , dNCgjn = ['hvjWB'].concat(eqNJ)
            , fbwa = dNCgjn[1];
        dNCgjn.shift();
        var gHPT = dNCgjn[0];
        var t = this[eqNJ(186)];
        return t[eqNJ(45)](e);
    },
    "XIZj": function (e, t) {
        return e >> t & 1;
    },
    "YQqh": function (e, i) {
        var a = this;
        if (!i) {
            i = a;
        }

        function t(e, t) {
            var r = 0;
            for (var n = i["SyHp"] - 1; n >= 0; n -= 1) {
                if (a["XIZj"](t, n) === 1) {
                    r = (r << 1) + a["XIZj"](e, n);
                }
            }
            return r;
        }

        var r = ""
            , n = "";
        var o = e["length"];
        for (var s = 0; s < o; s += 3) {
            var c;
            if (s + 2 < o) {
                c = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2];
                r += a["Vwot"](t(c, i["OTXW"])) + a["Vwot"](t(c, i["PMOt"])) + a["Vwot"](t(c, i["QYPb"])) + a["Vwot"](t(c, i["RoMf"]));
            } else {
                var _ = o % 3;
                if (_ === 2) {
                    c = (e[s] << 16) + (e[s + 1] << 8);
                    r += a["Vwot"](t(c, i["OTXW"])) + a["Vwot"](t(c, i["PMOt"])) + a["Vwot"](t(c, i["QYPb"]));
                    n = i["NuMA"];
                } else if (_ === 1) {
                    c = e[s] << 16;
                    r += a["Vwot"](t(c, i["OTXW"])) + a["Vwot"](t(c, i["PMOt"]));
                    n = i["NuMA"] + i["NuMA"];
                }
            }
        }
        return {
            "res": r,
            "end": n
        };
    },
    "ZLnc": function (e) {
        var t = this;
        var r = t["YQqh"](t["TCit"](e));
        return r["res"] + r["end"];
    },
    "aBxe": function (e) {
        var t = this;
        var r = t["YQqh"](e);
        return r["res"] + r["end"];
    },
    "bGsN": function (e, a) {
        var EXbU = AVech.DHD
            , DgyiQp = ['HtjdJ'].concat(EXbU)
            , FABM = DgyiQp[1];
        DgyiQp.shift();
        var GGRL = DgyiQp[0];
        var o = this;
        if (!a) {
            a = o;
        }

        function t(e, t) {
            var vlE = AVech.EIy()[0][10];
            for (; vlE !== AVech.EIy()[4][9];) {
                switch (vlE) {
                    case AVech.EIy()[4][10]:
                        if (e < 0) {
                            return 0;
                        }
                        var r = 5;
                        var n = 0;
                        for (var i = a[FABM(116)] - 1; i >= 0; i -= 1) {
                            if (o[EXbU(117)](t, i) === 1) {
                                n += o[FABM(117)](e, r) << i;
                                r -= 1;
                            }
                        }
                        return n;
                        break;
                }
            }
        }

        var r = e[FABM(108)];
        var n = EXbU(76);
        for (var i = 0; i < r; i += 4) {
            var s = t(o[EXbU(168)](e[EXbU(188)](i)), a[FABM(161)]) + t(o[FABM(168)](e[FABM(188)](i + 1)), a[FABM(158)]) + t(o[FABM(168)](e[FABM(188)](i + 2)), a[FABM(121)]) + t(o[FABM(168)](e[FABM(188)](i + 3)), a[FABM(105)]);
            var c = s >> 16 & 255;
            n += String[FABM(156)](c);
            if (e[FABM(188)](i + 2) !== a[EXbU(118)]) {
                var _ = s >> 8 & 255;
                n += String[EXbU(156)](_);
                if (e[EXbU(188)](i + 3) !== a[FABM(118)]) {
                    var l = s & 255;
                    n += String[EXbU(156)](l);
                }
            }
        }
        return n;
    },
    "cmBe": function (e) {
        var t = this;
        var r = 4 - e[KMcx(108)] % 4;
        if (r < 4) {
            for (var n = 0; n < r; n += 1) {
                e += t[KMcx(118)];
            }
        }
        return t[JkhW(184)](e);
    },
    "dCoI": function (e) {
        var t = this;
        return t[OEXU(103)](e);
    }
};


OLqi = function (gt, challenge, key_c, key_s, k) {
    var r = this;
    var e = "M0/8Pjp8MRPjp(9A3(8:iDY(,((.((gl6((565)f1O)O)O**-TTN9NTd))WGDRjE1S0RlEEM2KDVU513)*,**E:*fN(MbODRlG,*2K)O-*E-1KSGE-)NE)LM((((5*q(((((5b.B9(,(B((55(((b,5a(/I::@19.Gm)OlGc?j/-M97))*-)1@FkWKW2M99E-(3a/cQJ.N-9Ne1?X)*DE?EC-mVQ19bE-Qb9BPNC6*-Y-)1h@)(PM9(8qj((((,qqqqq(3?/()S)kTM)NM/)NM(((E/(((()MLdOI1(*Oa@b19n**M?E10MM?E5-7*)E5/OUHE11?E5*(Uf*-52b1-191*W3n7P7F0MM1*/*(MNON3N/2*)91(2RMb5*(()qn()qqqn";
    var t = "M(*((1((M((";
    var n = "111401magic data287349magic dataCSS1Compatmagic data77magic data-1magic data-1magic data-1magic data-1magic data1magic data-1magic data-1magic data1magic data45magic data3magic data2magic data9magic data-1magic data-1magic data-1magic data-1magic data-1magic data3magic data-1magic data-1magic data4magic data16magic data-1magic data-1magic data-1magic data0magic data0magic data0magic data0magic data1920magic data302magic data1920magic data1040magic datazh-CNmagic datazh-CN,zhmagic data-1magic data1magic data24magic dataMozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36magic data1magic data1magic data1920magic data1080magic data1920magic data1040magic data1magic data1magic data1magic data-1magic dataWin32magic data0magic data-8magic data584f4432fe6ebea605c1f943c0a39f15magic data37d2ac50723da033efc14274b809c431magic datainternal-pdf-viewer,mhjfbmdgcfjbbpaeojofohoefgiehjai,internal-nacl-pluginmagic data0magic data-1magic data0magic data16magic dataArial,ArialBlack,ArialNarrow,BookAntiqua,BookmanOldStyle,Calibri,Cambria,CambriaMath,Century,CenturyGothic,ComicSansMS,Consolas,Courier,CourierNew,Garamond,Georgia,Helvetica,Impact,LucidaConsole,LucidaHandwriting,LucidaSansUnicode,MicrosoftSansSerif,MonotypeCorsiva,MSGothic,MSPGothic,MSReferenceSansSerif,MSSansSerif,MSSerif,PalatinoLinotype,SegoePrint,SegoeScript,SegoeUI,SegoeUILight,SegoeUISemibold,SegoeUISymbol,Tahoma,Times,TimesNewRoman,TrebuchetMS,Verdana,Wingdings,Wingdings2,Wingdings3magic data1619761663248magic data-1magic data-1magic data-1magic data232magic data69magic data8magic data21magic data29magic data-1magic data-1";
    var n1 = "111402!!287333!!CSS1Compat!!77!!-1!!-1!!-1!!-1!!1!!-1!!-1!!1!!45!!3!!2!!9!!-1!!-1!!-1!!-1!!-1!!3!!-1!!-1!!4!!16!!-1!!-1!!-1!!0!!0!!0!!0!!1920!!302!!1920!!1040!!zh-CN!!zh-CN,zh!!-1!!1!!24!!Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36!!1!!1!!1920!!1080!!1920!!1040!!1!!1!!1!!-1!!Win32!!0!!-8!!584f4432fe6ebea605c1f943c0a39f15!!37d2ac50723da033efc14274b809c431!!internal-pdf-viewer,mhjfbmdgcfjbbpaeojofohoefgiehjai,internal-nacl-plugin!!0!!-1!!0!!16!!Arial,ArialBlack,ArialNarrow,BookAntiqua,BookmanOldStyle,Calibri,Cambria,CambriaMath,Century,CenturyGothic,ComicSansMS,Consolas,Courier,CourierNew,Garamond,Georgia,Helvetica,Impact,LucidaConsole,LucidaHandwriting,LucidaSansUnicode,MicrosoftSansSerif,MonotypeCorsiva,MSGothic,MSPGothic,MSReferenceSansSerif,MSSansSerif,MSSerif,PalatinoLinotype,SegoePrint,SegoeScript,SegoeUI,SegoeUILight,SegoeUISemibold,SegoeUISymbol,Tahoma,Times,TimesNewRoman,TrebuchetMS,Verdana,Wingdings,Wingdings2,Wingdings3!!1619762780113!!-1!!-1!!-1!!232!!69!!8!!21!!29!!-1!!-1";
    var i = "DIV_0";
    var a = {
        "bSpG": 1619761671624,
        "protocol": "https://",
        "gt": gt,
        "challenge": challenge,
        "offline": false,
        "new_captcha": true,
        "product": "float",
        "width": "300px",
        "https": true,
        "aspect_radio": {
            "slide": 103,
            "voice": 128,
            "pencil": 128,
            "click": 128,
            "beeline": 50
        },
        "beeline": "/static/js/beeline.1.0.1.js",
        "click": "/static/js/click.2.9.9.js",
        "fullpage": "/static/js/fullpage.9.0.4.js",
        "type": "fullpage",
        "slide": "/static/js/slide.7.8.0.js",
        "voice": "/static/js/voice.1.2.0.js",
        "pencil": "/static/js/pencil.1.0.3.js",
        "geetest": "/static/js/geetest.6.0.9.js",
        "static_servers": [
            "static.geetest.com",
            "dn-staticdown.qbox.me"
        ],
        "cc": 16,
        "supportWorker": true,
        "JTXX": {
            "pt": 0
        },
        "aeskey": "0897c7c4f962d254",
        "api_server": "api.geetest.com",
        "theme": "wind",
        "theme_version": "1.5.8",
        "i18n_labels": {
            "goto_homepage": "是否前往验证服务Geetest官网",
            "error_content": "请点击此处重试",
            "refresh_page": "页面出现错误啦！要继续操作，请刷新此页面",
            "read_reversed": false,
            "ready": "点击按钮进行验证",
            "success_title": "通过验证",
            "success": "验证成功",
            "loading_content": "智能验证检测中",
            "goto_cancel": "取消",
            "next": "正在加载验证",
            "error_title": "网络超时",
            "fullpage": "智能检测中",
            "goto_confirm": "前往",
            "copyright": "由极验提供技术支持",
            "reset": "请点击重试",
            "error": "网络不给力",
            "next_ready": "请完成验证"
        },
        "logo": true,
        "c": key_c,
        "s": key_s,
        "feedback": "https://www.geetest.com/contact#report"
    };
    // var o = le() - at;
    var o = 30590;
    var ep = {
        "v": "9.0.4",
        "de": false,
        "te": false,
        "me": true,
        "ven": "Google Inc. (Intel)",
        "ren": "ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11-27.20.100.8935)",
        "fp": [
            "move",
            1357,
            301,
            1619762780151,
            "pointermove"
        ],
        "lp": [
            "up",
            1079,
            239,
            1619762781217,
            "pointerup"
        ],
        "em": {
            "ph": 0,
            "cp": 0,
            "ek": "11",
            "wd": 1,
            "nt": 0,
            "si": 0,
            "sc": 0
        },
        "tm": {
            "a": 1619762778178,
            "b": 1619762778215,
            "c": 1619762778293,
            "d": 0,
            "e": 0,
            "f": 1619762778180,
            "g": 1619762778182,
            "h": 1619762778191,
            "i": 1619762778191,
            "j": 1619762778201,
            "k": 1619762778195,
            "l": 1619762778201,
            "m": 1619762778209,
            "n": 1619762778210,
            "o": 1619762778302,
            "p": 1619762778408,
            "q": 1619762778408,
            "r": 1619762778408,
            "s": 1619762779093,
            "t": 1619762779093,
            "u": 1619762779093
        },
        "by": 0
    }
    r["Ryzo"] = "";
    var s = [["lang", a["lang"] || "zh-cn"], ["type", "fullpage"], ["tt", he(e, a["c"], a["s"]) || -1], ["light", i || -1], ["s", Z(j["ZLnc"](t))], ["h", Z(j["ZLnc"](n))], ["hh", Z(n)], ["hi", Z(n1)], ["vip_order", r["vip_order"] || -1], ["ct", r["ct"] || -1], ["ep", ep || -1], ["passtime", o || -1], ["rp", Z(a["gt"] + a["challenge"] + o)]];
    for (var c = 0; c < s["length"]; c++) {
        r["Ryzo"] += "\"" + s[c][0] + "\":" + ge["stringify"](s[c][1]) + ",";
    }
    var _ = it();

    function Z(e) {

        function HWSF(e, t) {
            return e << t | e >>> 32 - t;
        }

        function ICzB(e, t) {
            var r, n, i, a, o;
            i = e & 2147483648;
            a = t & 2147483648;
            r = e & 1073741824;
            n = t & 1073741824;
            o = (e & 1073741823) + (t & 1073741823);
            if (r & n) {
                return o ^ 2147483648 ^ i ^ a;
            }
            if (r | n) {
                if (o & 1073741824) {
                    return o ^ 3221225472 ^ i ^ a;
                } else {
                    return o ^ 1073741824 ^ i ^ a;
                }
            } else {
                return o ^ i ^ a;
            }
        }

        function F(e, t, r) {
            return e & t | ~e & r;
        }

        function G(e, t, r) {
            return e & r | t & ~r;
        }

        function H(e, t, r) {
            return e ^ t ^ r;
        }

        function I(e, t, r) {
            return t ^ (e | ~r);
        }

        function FF(e, t, r, n, i, a, o) {
            e = ICzB(e, ICzB(ICzB(F(t, r, n), i), o));
            return ICzB(HWSF(e, a), t);
        }

        function GG(e, t, r, n, i, a, o) {
            e = ICzB(e, ICzB(ICzB(G(t, r, n), i), o));
            return ICzB(HWSF(e, a), t);
        }

        function HH(e, t, r, n, i, a, o) {
            e = ICzB(e, ICzB(ICzB(H(t, r, n), i), o));
            return ICzB(HWSF(e, a), t);
        }

        function II(e, t, r, n, i, a, o) {
            e = ICzB(e, ICzB(ICzB(I(t, r, n), i), o));
            return ICzB(HWSF(e, a), t);
        }

        function Jchc(e) {
            var t;
            var r = e["length"];
            var n = r + 8;
            var i = (n - n % 64) / 64;
            var a = (i + 1) * 16;
            var o = Array(a - 1);
            var s = 0;
            var c = 0;
            while (c < r) {
                t = (c - c % 4) / 4;
                s = c % 4 * 8;
                o[t] = o[t] | e["charCodeAt"](c) << s;
                c++;
            }
            t = (c - c % 4) / 4;
            s = c % 4 * 8;
            o[t] = o[t] | 128 << s;
            o[a - 2] = r << 3;
            o[a - 1] = r >>> 29;
            return o;
        }

        function KxWh(e) {
            var t = "", r = "", n, i;
            for (i = 0; i <= 3; i++) {
                n = e >>> i * 8 & 255;
                r = "0" + n["toString"](16);
                t = t + r["substr"](r["length"] - 2, 2);
            }
            return t;
        }

        function LvPI(e) {
            e = e["replace"](/\r\n/g, "\n");
            var t = "";
            for (var r = 0; r < e["length"]; r++) {
                var n = e["charCodeAt"](r);
                if (n < 128) {
                    t += String["fromCharCode"](n);
                } else if (n > 127 && n < 2048) {
                    t += String["fromCharCode"](n >> 6 | 192);
                    t += String["fromCharCode"](n & 63 | 128);
                } else {
                    t += String["fromCharCode"](n >> 12 | 224);
                    t += String["fromCharCode"](n >> 6 & 63 | 128);
                    t += String["fromCharCode"](n & 63 | 128);
                }
            }
            return t;
        }

        var t = [];
        var r, n, i, a, o, s, c, _, l;
        var u = 7
            , f = 12
            , p = 17
            , h = 22;
        var g = 5
            , d = 9
            , v = 14
            , m = 20;
        var w = 4
            , x = 11
            , y = 16
            , b = 23;
        var E = 6
            , S = 10
            , T = 15
            , C = 21;
        e = LvPI(e);
        t = Jchc(e);
        s = 1732584193;
        c = 4023233417;
        _ = 2562383102;
        l = 271733878;
        for (r = 0; r < t["length"]; r += 16) {
            n = s;
            i = c;
            a = _;
            o = l;
            s = FF(s, c, _, l, t[r + 0], u, 3614090360);
            l = FF(l, s, c, _, t[r + 1], f, 3905402710);
            _ = FF(_, l, s, c, t[r + 2], p, 606105819);
            c = FF(c, _, l, s, t[r + 3], h, 3250441966);
            s = FF(s, c, _, l, t[r + 4], u, 4118548399);
            l = FF(l, s, c, _, t[r + 5], f, 1200080426);
            _ = FF(_, l, s, c, t[r + 6], p, 2821735955);
            c = FF(c, _, l, s, t[r + 7], h, 4249261313);
            s = FF(s, c, _, l, t[r + 8], u, 1770035416);
            l = FF(l, s, c, _, t[r + 9], f, 2336552879);
            _ = FF(_, l, s, c, t[r + 10], p, 4294925233);
            c = FF(c, _, l, s, t[r + 11], h, 2304563134);
            s = FF(s, c, _, l, t[r + 12], u, 1804603682);
            l = FF(l, s, c, _, t[r + 13], f, 4254626195);
            _ = FF(_, l, s, c, t[r + 14], p, 2792965006);
            c = FF(c, _, l, s, t[r + 15], h, 1236535329);
            s = GG(s, c, _, l, t[r + 1], g, 4129170786);
            l = GG(l, s, c, _, t[r + 6], d, 3225465664);
            _ = GG(_, l, s, c, t[r + 11], v, 643717713);
            c = GG(c, _, l, s, t[r + 0], m, 3921069994);
            s = GG(s, c, _, l, t[r + 5], g, 3593408605);
            l = GG(l, s, c, _, t[r + 10], d, 38016083);
            _ = GG(_, l, s, c, t[r + 15], v, 3634488961);
            c = GG(c, _, l, s, t[r + 4], m, 3889429448);
            s = GG(s, c, _, l, t[r + 9], g, 568446438);
            l = GG(l, s, c, _, t[r + 14], d, 3275163606);
            _ = GG(_, l, s, c, t[r + 3], v, 4107603335);
            c = GG(c, _, l, s, t[r + 8], m, 1163531501);
            s = GG(s, c, _, l, t[r + 13], g, 2850285829);
            l = GG(l, s, c, _, t[r + 2], d, 4243563512);
            _ = GG(_, l, s, c, t[r + 7], v, 1735328473);
            c = GG(c, _, l, s, t[r + 12], m, 2368359562);
            s = HH(s, c, _, l, t[r + 5], w, 4294588738);
            l = HH(l, s, c, _, t[r + 8], x, 2272392833);
            _ = HH(_, l, s, c, t[r + 11], y, 1839030562);
            c = HH(c, _, l, s, t[r + 14], b, 4259657740);
            s = HH(s, c, _, l, t[r + 1], w, 2763975236);
            l = HH(l, s, c, _, t[r + 4], x, 1272893353);
            _ = HH(_, l, s, c, t[r + 7], y, 4139469664);
            c = HH(c, _, l, s, t[r + 10], b, 3200236656);
            s = HH(s, c, _, l, t[r + 13], w, 681279174);
            l = HH(l, s, c, _, t[r + 0], x, 3936430074);
            _ = HH(_, l, s, c, t[r + 3], y, 3572445317);
            c = HH(c, _, l, s, t[r + 6], b, 76029189);
            s = HH(s, c, _, l, t[r + 9], w, 3654602809);
            l = HH(l, s, c, _, t[r + 12], x, 3873151461);
            _ = HH(_, l, s, c, t[r + 15], y, 530742520);
            c = HH(c, _, l, s, t[r + 2], b, 3299628645);
            s = II(s, c, _, l, t[r + 0], E, 4096336452);
            l = II(l, s, c, _, t[r + 7], S, 1126891415);
            _ = II(_, l, s, c, t[r + 14], T, 2878612391);
            c = II(c, _, l, s, t[r + 5], C, 4237533241);
            s = II(s, c, _, l, t[r + 12], E, 1700485571);
            l = II(l, s, c, _, t[r + 3], S, 2399980690);
            _ = II(_, l, s, c, t[r + 10], T, 4293915773);
            c = II(c, _, l, s, t[r + 1], C, 2240044497);
            s = II(s, c, _, l, t[r + 8], E, 1873313359);
            l = II(l, s, c, _, t[r + 15], S, 4264355552);
            _ = II(_, l, s, c, t[r + 6], T, 2734768916);
            c = II(c, _, l, s, t[r + 13], C, 1309151649);
            s = II(s, c, _, l, t[r + 4], E, 4149444226);
            l = II(l, s, c, _, t[r + 11], S, 3174756917);
            _ = II(_, l, s, c, t[r + 2], T, 718787259);
            c = II(c, _, l, s, t[r + 9], C, 3951481745);
            s = ICzB(s, n);
            c = ICzB(c, i);
            _ = ICzB(_, a);
            l = ICzB(l, o);
        }
        var A = KxWh(s) + KxWh(c) + KxWh(_) + KxWh(l);
        return A["toLowerCase"]();
    }

    function he(e, t, r) {
        if (!t || !r) {
            return e;
        }
        var n = 0;
        var i = 2;
        var a;
        var o = e;
        var s = t[0]
            , c = t[2]
            , _ = t[4];
        while (a = r["substr"](n, i)) {
            n += i;
            var l = parseInt(a, 16);
            var u = String["fromCharCode"](l);
            var f = (s * l * l + c * l + _) % e["length"];
            o = o["substr"](0, f) + u + o["substr"](f);
        }
        return o;
    }

    function tteJ() {
        var t = ["bbOy"];

        return function (e) {
            t["push"](e["toString"]());
            var uqUq = "";
            (function addHash(e, t) {

                function vvXn(e) {
                    var t = 5381;
                    var r = e["length"]
                        , n = 0;
                    while (r--) {
                        t = (t << 5) + t + e["charCodeAt"](n++);
                    }
                    t &= ~(1 << 31);
                    return t;
                }

                new Date()["getTime"]() - t["getTime"]() > 100 && (e = "qwe");
                uqUq = "{" + r["Ryzo"] + "\"captcha_token\":\"" + vvXn(addHash["toString"]() + vvXn(vvXn["toString"]()) + vvXn(e["toString"]())) + "\"" + "}";
            }(t["shift"](), new Date()));
            r["PjCn"] = j["aBxe"](_["encrypt"](uqUq, k));
        };
    }

    r["TIQp"] = tteJ();
    r["TIQp"]("");
    return r["PjCn"];

};


var k = ce()

function w1(gt, challenge, encryptKey) {

    var n = new QpeE()["encrypt"](encryptKey);
    var l = [111413, 284262, "CSS1Compat", 77, -1, -1, -1, -1, 1, -1, -1, 1, 45, 3, 2, 8, -1, -1, -1, -1, -1, 3, -1, -1, 4, 16, -1, -1, -1, 0, 0, 0, 0, 1920, 311, 1920, 1040, "zh-CN", "zh-CN,zh", -1, 1, 24, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36", 1, 1, 1920, 1080, 1920, 1040, 1, 1, 1, -1, "Win32", 0, -8, "584f4432fe6ebea605c1f943c0a39f15", "37d2ac50723da033efc14274b809c431", "internal-pdf-viewer,mhjfbmdgcfjbbpaeojofohoefgiehjai,internal-nacl-plugin", 0, -1, 0, 16, "Arial,ArialBlack,ArialNarrow,BookAntiqua,BookmanOldStyle,Calibri,Cambria,CambriaMath,Century,CenturyGothic,ComicSansMS,Consolas,Courier,CourierNew,Garamond,Georgia,Helvetica,Impact,LucidaConsole,LucidaHandwriting,LucidaSansUnicode,MicrosoftSansSerif,MonotypeCorsiva,MSGothic,MSPGothic,MSReferenceSansSerif,MSSansSerif,MSSerif,PalatinoLinotype,SegoePrint,SegoeScript,SegoeUI,SegoeUILight,SegoeUISemibold,SegoeUISymbol,Tahoma,Times,TimesNewRoman,TrebuchetMS,Verdana,Wingdings,Wingdings2,Wingdings3", (new Date()).getTime(), -1, -1, -1, 232, 69, 8, 21, 27, -1, -1];
    var Config = {
        "aspect_radio": {"slide": 103, "click": 128, "voice": 128, "pencil": 128, "beeline": 50},
        "beeline": "/static/js/beeline.1.0.1.js",
        "cc": 16,
        "challenge": challenge,
        "click": "/static/js/click.2.9.9.js",
        "fullpage": "/static/js/fullpage.9.0.4.js",
        "geetest": "/static/js/geetest.6.0.9.js",
        "gt": gt,
        "https": true,
        "i": l.join("!!"),
        "new_captcha": true,
        "offline": false,
        "pencil": "/static/js/pencil.1.0.3.js",
        "product": "float",
        "protocol": "https://",
        "slide": "/static/js/slide.7.8.0.js",
        "static_servers": ["static.geetest.com/", "dn-staticdown.qbox.me/"],
        "type": "fullpage",
        "voice": "/static/js/voice.1.2.0.js",
        "width": "300px",
        "ww": true,
    };
    var i = it()["encrypt1"](ge["stringify"](Config), encryptKey);
    var a = j["aBxe"](i);
    return a + n;
};

function U(e, t) {
    var r = t["slice"](-2)
        , n = [];
    for (var i = 0; i < r["length"]; i++) {
        var o = r["charCodeAt"](i);
        n[i] = o > 57 ? o - 87 : o - 48;
    }
    r = n[0] * 36 + n[1];
    var a = Math["round"](e) + r;
    t = t["slice"](0, 32);

    var s = [[], [], [], [], []]
        , u = {};
    var c = 0, _;
    i = 0;
    for (var f = t["length"]; i < f; i++) {
        _ = t["charAt"](i);
        if (!u[_]) {
            u[_] = 1;
            s[c]["push"](_);
            c++;
            c = c == 5 ? 0 : c;
        }
    }
    var l = a, h, v = 4;

    var d = "";
    var p = [1, 2, 5, 10, 50];
    while (l > 0) {
        if (l - p[v] >= 0) {
            h = parseInt(Math["random"]() * s[v]["length"], 10);
            d = d + s[v][h];
            l = l - p[v];
        } else {
            s["splice"](v, 1);
            p["splice"](v, 1);
            v = v - 1;
        }
    }
    console.log(d);
    return d;

}

function nCRc(e, t, r) {
    var n = 0;
    var i = 2;
    var o;
    var a = e;
    var s = t[0]
        , u = t[2]
        , c = t[4];
    while (o = r["substr"](n, i)) {
        n += i;
        var _ = parseInt(o, 16);
        var f = String["fromCharCode"](_);
        var l = (s * _ * _ + u * _ + c) % e["length"];
        a = a["substr"](0, l) + f + a["substr"](l);
    }
    return a;
}

function $_FAK(t) {
    this["$_BHHx"] = t || [];
};

function $_DDF(t) {
    function _(t, e) {
        return t << e | t >>> 32 - e;
    }

    function u(t, e) {
        var n, r, o, i, s;
        return o = 2147483648 & t, i = 2147483648 & e, s = (1073741823 & t) + (1073741823 & e), (n = 1073741824 & t) & (r = 1073741824 & e) ? 2147483648 ^ s ^ o ^ i : n | r ? 1073741824 & s ? 3221225472 ^ s ^ o ^ i : 1073741824 ^ s ^ o ^ i : s ^ o ^ i;
    }

    function e(t, e, n, r, o, i, s) {
        return u(_(t = u(t, u(u(function a(t, e, n) {
            return t & e | ~t & n;
        }(e, n, r), o), s)), i), e);
    }

    function n(t, e, n, r, o, i, s) {
        return u(_(t = u(t, u(u(function a(t, e, n) {
            return t & n | e & ~n;
        }(e, n, r), o), s)), i), e);
    }

    function r(t, e, n, r, o, i, s) {
        return u(_(t = u(t, u(u(function a(t, e, n) {
            return t ^ e ^ n;
        }(e, n, r), o), s)), i), e);
    }

    function o(t, e, n, r, o, i, s) {
        return u(_(t = u(t, u(u(function a(t, e, n) {
            return e ^ (t | ~n);
        }(e, n, r), o), s)), i), e);
    }

    function i(t) {
        var e,
            n = "",
            r = "";

        for (e = 0; e <= 3; e++) n += (r = "0" + (t >>> 8 * e & 255)["toString"](16))["substr"](r["length"] - 2, 2);

        return n;
    }

    var s, a, c, l, h, f, d, p, g, m;

    for (s = function v(t) {
        var e,
            n = t["length"],
            r = n + 8,
            o = 16 * (1 + (r - r % 64) / 64),
            i = Array(o - 1),
            s = 0,
            a = 0;

        while (a < n) s = a % 4 * 8, i[e = (a - a % 4) / 4] = i[e] | t["charCodeAt"](a) << s, a++;

        return s = a % 4 * 8, i[e = (a - a % 4) / 4] = i[e] | 128 << s, i[o - 2] = n << 3, i[o - 1] = n >>> 29, i;
    }(t = function w(j) {
        j = j["replace"](/\r\n/g, "\n");

        for (var e = "", n = 0; n < j["length"]; n++) {
            var r = j["charCodeAt"](n);
            r < 128 ? e += String["fromCharCode"](r) : (127 < r && r < 2048 ? e += String["fromCharCode"](r >> 6 | 192) : (e += String["fromCharCode"](r >> 12 | 224), e += String["fromCharCode"](r >> 6 & 63 | 128)), e += String["fromCharCode"](63 & r | 128));
        }
        return e;
    }(t)), d = 1732584193, p = 4023233417, g = 2562383102, m = 271733878, a = 0; a < s["length"]; a += 16) p = o(p = o(p = o(p = o(p = r(p = r(p = r(p = r(p = n(p = n(p = n(p = n(p = e(p = e(p = e(p = e(l = p, g = e(h = g, m = e(f = m, d = e(c = d, p, g, m, s[a + 0], 7, 3614090360), p, g, s[a + 1], 12, 3905402710), d, p, s[a + 2], 17, 606105819), m, d, s[a + 3], 22, 3250441966), g = e(g, m = e(m, d = e(d, p, g, m, s[a + 4], 7, 4118548399), p, g, s[a + 5], 12, 1200080426), d, p, s[a + 6], 17, 2821735955), m, d, s[a + 7], 22, 4249261313), g = e(g, m = e(m, d = e(d, p, g, m, s[a + 8], 7, 1770035416), p, g, s[a + 9], 12, 2336552879), d, p, s[a + 10], 17, 4294925233), m, d, s[a + 11], 22, 2304563134), g = e(g, m = e(m, d = e(d, p, g, m, s[a + 12], 7, 1804603682), p, g, s[a + 13], 12, 4254626195), d, p, s[a + 14], 17, 2792965006), m, d, s[a + 15], 22, 1236535329), g = n(g, m = n(m, d = n(d, p, g, m, s[a + 1], 5, 4129170786), p, g, s[a + 6], 9, 3225465664), d, p, s[a + 11], 14, 643717713), m, d, s[a + 0], 20, 3921069994), g = n(g, m = n(m, d = n(d, p, g, m, s[a + 5], 5, 3593408605), p, g, s[a + 10], 9, 38016083), d, p, s[a + 15], 14, 3634488961), m, d, s[a + 4], 20, 3889429448), g = n(g, m = n(m, d = n(d, p, g, m, s[a + 9], 5, 568446438), p, g, s[a + 14], 9, 3275163606), d, p, s[a + 3], 14, 4107603335), m, d, s[a + 8], 20, 1163531501), g = n(g, m = n(m, d = n(d, p, g, m, s[a + 13], 5, 2850285829), p, g, s[a + 2], 9, 4243563512), d, p, s[a + 7], 14, 1735328473), m, d, s[a + 12], 20, 2368359562), g = r(g, m = r(m, d = r(d, p, g, m, s[a + 5], 4, 4294588738), p, g, s[a + 8], 11, 2272392833), d, p, s[a + 11], 16, 1839030562), m, d, s[a + 14], 23, 4259657740), g = r(g, m = r(m, d = r(d, p, g, m, s[a + 1], 4, 2763975236), p, g, s[a + 4], 11, 1272893353), d, p, s[a + 7], 16, 4139469664), m, d, s[a + 10], 23, 3200236656), g = r(g, m = r(m, d = r(d, p, g, m, s[a + 13], 4, 681279174), p, g, s[a + 0], 11, 3936430074), d, p, s[a + 3], 16, 3572445317), m, d, s[a + 6], 23, 76029189), g = r(g, m = r(m, d = r(d, p, g, m, s[a + 9], 4, 3654602809), p, g, s[a + 12], 11, 3873151461), d, p, s[a + 15], 16, 530742520), m, d, s[a + 2], 23, 3299628645), g = o(g, m = o(m, d = o(d, p, g, m, s[a + 0], 6, 4096336452), p, g, s[a + 7], 10, 1126891415), d, p, s[a + 14], 15, 2878612391), m, d, s[a + 5], 21, 4237533241), g = o(g, m = o(m, d = o(d, p, g, m, s[a + 12], 6, 1700485571), p, g, s[a + 3], 10, 2399980690), d, p, s[a + 10], 15, 4293915773), m, d, s[a + 1], 21, 2240044497), g = o(g, m = o(m, d = o(d, p, g, m, s[a + 8], 6, 1873313359), p, g, s[a + 15], 10, 4264355552), d, p, s[a + 6], 15, 2734768916), m, d, s[a + 13], 21, 1309151649), g = o(g, m = o(m, d = o(d, p, g, m, s[a + 4], 6, 4149444226), p, g, s[a + 11], 10, 3174756917), d, p, s[a + 2], 15, 718787259), m, d, s[a + 9], 21, 3951481745), d = u(d, c), p = u(p, l), g = u(g, h), m = u(m, f);

    return (i(d) + i(p) + i(g) + i(m))["toLowerCase"]();
};

function Swcx() {
    function n(t) {
        var e = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr",
            n = e["length"],
            r = "",
            o = Math["abs"](t),
            i = parseInt(o / n);
        n <= i && (i = n - 1), i && (r = e["charAt"](i));
        var s = "";
        return t < 0 && (s += "!"), r && (s += "$"), s + r + e["charAt"](o %= n);
    }

    function K(t) {
        var e = devarr
        if (e["map"]) return new $_FAK(e["map"](t));

        for (var n = [], r = 0, o = e["length"]; r < o; r += 1) n[r] = t(e[r], r, this);

        return new $_FAK(n);
    }

    function e(e) {
        var t = [];
        var r = 0;
        var n, i, o;
        for (var a = 0, s = e["length"] - 1; a < s; a++) {
            n = Math["round"](e[a + 1][0] - e[a][0]);
            i = Math["round"](e[a + 1][1] - e[a][1]);
            o = Math["round"](e[a + 1][2] - e[a][2]);
            if (n == 0 && i == 0 && o == 0) {
                continue;
            }
            if (n == 0 && i == 0) {
                r += o;
            } else {
                t["push"]([n, i, o + r]);
                r = 0;
            }
        }
        if (r !== 0) {
            t["push"]([n, i, r]);
        }
        return t;


    }

    var t = e(arr);
    r = [],
        o = [],
        i = [];
    return new K(function (t) {
        var e = function (t) {
            for (var e = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]], n = 0, r = e["length"]; n < r; n++) if (t[0] == e[n][0] && t[1] == e[n][1]) return "stuvwxyz~"[n];

            return 0;
        }(t);

        e ? o["push"](e) : (r["push"](n(t[0])), o["push"](n(t[1]))), i["push"](n(t[2]));
    }), r["join"]("") + "!!" + o["join"]("") + "!!" + i["join"]("");
}

/**
 * @function 生成第三个w参数
 * @param arr 轨迹数组
 * @param c
 * @param s
 * @param e 滑块距离
 * @param r 滑块滑动时间
 * @param challenge 上个请求返回的challenge
 * @param encryptKey 密钥
 */
function w3(arr, devarr, c, s, e, passtime, gt, challenge, encryptKey) {


    var t = nCRc(Swcx(), c, s);
    var n = this;
    var o = {
        "lang": "zh-cn",
        "userresponse": U(e, challenge),
        "passtime": passtime,
        "imgload": 78,
        // todo t的生成方式待处理
        "aa": t,
        "ep": {
            "v": "7.8.0",
            "te": false,
            "me": true,
            "td": -1,
            // todo,不一定模拟的对,待验证 T^T
            "tm": {
                "a": at,
                "b": at + 144,
                "c": at + 144,
                "d": 0,
                "e": 0,
                "f": at + 2,
                "g": at + 11,
                "h": at + 35,
                "i": at + 35,
                "j": at + 67,
                "k": 0,
                "l": at + 67,
                "m": at + 133,
                "n": at + 193,
                "o": at + 164,
                "p": at + 818,
                "q": at + 818,
                "r": at + 824,
                "s": at + 1776,
                "t": at + 1776,
                "u": at + 1778
            },
        }
    };
    // console.log(o)
    o["rp"] = $_DDF(gt + challenge["slice"](0, 32) + i["passtime"]);


    var s = new QpeE()["encrypt"](encryptKey);
    var u = it()["encrypt"](ge["stringify"](o), encryptKey);
    var c = j["aBxe"](u);
    return c + s
}

var arr = [
    [
        -38,
        -38,
        0
    ],
    [
        0,
        0,
        0
    ],
    [
        3,
        0,
        61
    ],
    [
        9,
        0,
        70
    ],
    [
        18,
        0,
        77
    ],
    [
        29,
        0,
        86
    ],
    [
        42,
        0,
        93
    ],
    [
        54,
        0,
        100
    ],
    [
        70,
        0,
        109
    ],
    [
        92,
        0,
        116
    ],
    [
        117,
        0,
        125
    ],
    [
        131,
        0,
        133
    ],
    [
        144,
        0,
        141
    ],
    [
        155,
        0,
        149
    ],
    [
        160,
        0,
        157
    ],
    [
        165,
        0,
        164
    ],
    [
        165,
        0,
        286
    ],
    [
        166,
        0,
        477
    ],
    [
        173,
        -1,
        487
    ],
    [
        179,
        -1,
        493
    ],
    [
        184,
        -1,
        500
    ],
    [
        188,
        -1,
        509
    ],
    [
        191,
        -1,
        517
    ],
    [
        194,
        -1,
        525
    ],
    [
        197,
        -1,
        533
    ],
    [
        198,
        -1,
        541
    ],
    [
        201,
        -1,
        549
    ],
    [
        201,
        -1,
        549
    ]
];
var devarr = [[38, 38, 0], [3, 0, 61], [6, 0, 9], [9, 0, 7], [11, 0, 9], [13, 0, 7], [12, 0, 7], [16, 0, 9], [22, 0, 7], [25, 0, 9], [14, 0, 8], [13, 0, 8], [11, 0, 8], [5, 0, 8], [5, 0, 7], [0, 0, 122], [1, 0, 191], [7, -1, 10], [6, 0, 6], [5, 0, 7], [4, 0, 9], [3, 0, 8], [3, 0, 8], [3, 0, 8], [1, 0, 8], [3, 0, 8], [0, 0, 0]];
console.log(w3(arr, devarr, [12, 58, 98, 36, 43, 95, 62, 15, 12], "58327940", 150, 918, 'ff3cd843746782b0e0f377c2d234d6a5', 'ab30d458f2d55126be24a10690e6b258f7', k));
/**
 * 以上为滑块js
 * 以下为点选js
 */


XpfY = function (e) {
    this.uQfn = function (e) {
        var t = this;
        var r = t['lNGg'];
        if (!r['indexOf']) {
            for (var n = 0, i = r['length']; n < i; n = n + 1) {
                if (r[n] === e) {
                    return n;
                }
            }
            return -1;
        }
        return r['indexOf'](e);
    };
    this['lNGg'] = e || []

}

function ftgH() {
};


ftgH['prototype'] = {
    'AWWe': function (e) {
        var t = (1 << 15) - 1;
        if (typeof e !== "number") {
            return e;
        } else if (e > t) {
            e = t;
        } else if (e < -t) {
            e = -t;
        }
        return Math['round'](e);
    },
    "encode": function (e) {
        var i = "()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~";

        function gEko(e) {
            var t = '';
            var r = e['length'] / 6;
            for (var n = 0; n < r; n = n + 1) {
                t += i['charAt'](window['parseInt'](e['slice'](n * 6, (n + 1) * 6), 2));
            }
            return t;
        }

        function t(e) {
            var t = [];
            var r = [];
            var n = [];
            var i = [];
            for (var s = 0, o = e['length']; s < o; s = s + 1) {
                var a = e[s];
                var _ = a['length'];
                t['push'](a[0]);
                r['push'](_ === 2 ? a[1] : a[2]);
                if (_ === 3) {
                    n['push'](a[1][0]);
                    i['push'](a[1][1]);
                }
            }
            var c = g(t);
            var l = mUTp(r, false);
            var u = mUTp(n, true);
            var f = mUTp(i, true);
            var p = c + l + u + f;
            var d = p['length'];
            if (d % 6 != 0) {
                p += heAo(0, 6 - d % 6);
            }
            return gEko(p);
        }

        var p = {
            "move": 0,
            "down": 1,
            "up": 2,
            "scroll": 3,
            "focus": 4,
            "blur": 5,
            "unload": 6,
            "unknown": 7
        };
        var d = 8;

        function heAo(e, t) {
            var r = e["toString"](2);
            var n = r["length"];
            var i = "";
            for (var s = n + 1; s <= t; s = s + 1) {
                i += "0";
            }
            r = i + r;
            return r;
        }

        function g(e) {
            var t = [];
            var r = e['length']

            var n = 0;
            while (n < r) {
                var i = e[n];
                var s = 0;
                while (true) {
                    if (s >= 1 << 4) {
                        break;
                    }
                    var o = n + s + 1;
                    if (o >= r) {
                        break;
                    }
                    var a = e[o];
                    if (a !== i) {
                        break;
                    }
                    s += 1;
                }
                n = n + 1 + s;
                var _ = p[i];
                if (s != 0) {
                    t['push'](_ | d);
                    t['push'](s - 1);
                } else {
                    t['push'](_);
                }
            }
            var c = heAo(r | 32768, 16);
            var l = "";

            for (var u = 0, f = t["length"]; u < f; u = u + 1) {
                l += heAo(t[u], 4);
            }
            return c + l;
        }

        function iU_q(e, t) {
            var r = [];
            for (var n = 0, i = e["length"]; n < i; n = n + 1) {
                r["push"](t(e[n]));
            }
            return r;
        }

        function jdXS(e, t) {
            var r = [];
            iU_q(e, function (e) {
                if (t(e)) {
                    r['push'](e);
                }
            });
            return r;
        }

        function kuls(e) {
            var t = (1 << 15) - 1;
            e = iU_q(e, function (e) {
                if (e > t) {
                    return t;
                } else if (e < -t) {
                    return -t;
                }
                return e;
            });
            var r = e['length'];
            var n = 0;

            var i = [];
            while (n < r) {
                var s = 1;
                var o = e[n];
                var a = Math["abs"](o);
                while (true) {
                    if (n + s >= r) {
                        break;
                    }
                    if (e[n + s] !== o) {
                        break;
                    }
                    if (a >= 127 || s >= 127) {
                        break;
                    }
                    s += 1;
                }
                if (s > 1) {
                    i["push"]((o < 0 ? 49152 : 32768) | s << 7 | a);
                } else {
                    i["push"](o);
                }
                n += s;
            }
            return i;
        }

        function lNYw(e, t) {
            if (e === 0) {
                return 0;
            }
            return Math['log'](e) / Math['log'](t);
        }

        function mUTp(e, t) {
            e = kuls(e);
            var r = [], n = [], i;
            iU_q(e, function (e) {
                var t = Math['ceil'](lNYw(Math['abs'](e) + 1, 16));
                if (t === 0) {
                    t = 1;
                }
                r['push'](heAo(t - 1, 2));
                n['push'](heAo(Math['abs'](e), t * 4));
            });
            var s = r['join']('');
            var o = n['join']('');
            if (!t) {
                i = '';
            } else {
                i = iU_q(jdXS(e, function (e) {
                    return e != 0 && e >> 15 != 1;
                }), function (e) {
                    return e < 0 ? '1' : '0';
                })['join']('');
            }
            var a = heAo(e['length'] | 32768, 16);
            return a + s + o + i;
        }

        return t(e);
    },
    "BjJO": function (e) {
        var t = 0
            , r = 0
            , n = 0
            , i = 0;
        var s = [];
        var o = this;
        var a = 0;
        var _ = null;
        var c = null;
        var l = e;
        var u = l['length'];
        var f = u < 300 ? 0 : u - 300;
        for (; f < u; f = f + 1) {
            var p = l[f];
            var d = p[0];
            if (new XpfY(["down", "move", "up", "scroll"])["uQfn"](d) > -1) {
                if (!_) {
                    _ = p;
                }
                c = p;
                s['push']([d, [p[1] - t, p[2] - r], o['AWWe'](a ? p[3] - a : a)]);
                t = p[1];
                r = p[2];
                a = p[3];
            } else if (new XpfY(["blur", "focus", "unload"])["uQfn"](d) > -1) {
                s["push"]([d, o["AWWe"](a ? p[1] - a : a)]);
                a = p[1];
            }
        }
        o['qGfk'] = _;
        o['rXhS'] = c;
        return s;
    },
    "EhLr": function (e) {
        var tmp = this;
        var t = e;
        tmp['pjsI'] = [];
        var track_ls = tmp.BjJO(t)
        // console.log(track_ls)
        return tmp.encode(track_ls)
    },
}

function many_tm() {
    var r = {};
    var aa = Math.round(new Date());
    var bb = aa + parseInt(Math.random() * 100);
    var cc = bb + parseInt(Math.random() * 100);
    var ff = aa + parseInt(Math.random() * 10);
    var gg = ff;
    var hh = ff;
    var ii = ff;
    var jj = ff;
    var ll = ff + parseInt(Math.random() * 10);
    var mm = ll + parseInt(Math.random() * 10);
    var nn = mm + parseInt(Math.random() * 10);
    var oo = nn + parseInt(Math.random() * 100);
    var pp = oo + parseInt(Math.random() * 1000);
    var qq = pp;
    var rr = pp + 1;
    var ss = rr + parseInt(Math.random() * 100);
    var tt = ss;
    var uu = ss;

    r = {
        "a": aa,    //window.performance.navigationStart
        "b": bb,    //window.unloadEventStart
        "c": cc,    //window.unloadEventEnd
        "d": 0,    // window.redirectStart
        "e": 0,    //window.redirectEnd
        "f": ff,    //window.fetchStart
        "g": gg,    //window.domainLookupStart
        "h": hh,    //window.domainLookupEnd
        "i": ii,    //window.connectStart
        "j": jj,    //window.connectEnd
        "k": 0,    //window.secureConnectionStart
        "l": ll,    //window.requestStart
        "m": mm,    //window.responseStart
        "n": nn,    //window.responseEnd
        "o": oo,    //window.domLoading
        "p": pp,    //window.domInteractive
        "q": qq,    // window.domContentLoadedEventStart
        "r": rr,    // window.domContentLoadedEventEnd
        "s": ss,    //window.domComplete
        "t": tt,    //window.loadEventStart
        "u": uu     //window.loadEventEnd
    };
    return r;

}

/**
 * @function 生成第三个w参数
 * @param gt
 * @param challenge
 // * @param tracks 鼠标事件轨迹数组，不校验，已写死
 // * @param word_coordinates 汉字坐标，不校验，已写死
 * @param percentage_word_coordinates 汉字在图片上百分比坐标
 * @param pic 验证码图片url
 * @param c_ls 上一个请求返回的参数c。数组类型
 * @param s_key 上一个请求返回的参数s。字符串
 // * @param passtime 验证码通过时间，不校验，已写死
 */

function dianxuan_w3(gt, challenge, percentage_word_coordinates, pic, c_ls, s_key, encryptKey) {

    var passtime = 2778;
    var tracks = [
    [
        "move",
        1339,
        404,
        1638179352560,
        "pointermove"
    ],
    [
        "move",
        1335,
        395,
        1638179352563,
        "pointermove"
    ],
    [
        "move",
        1334,
        388,
        1638179352570,
        "pointermove"
    ],
    [
        "move",
        1331,
        377,
        1638179352578,
        "pointermove"
    ],
    [
        "move",
        1330,
        369,
        1638179352585,
        "pointermove"
    ],
    [
        "move",
        1329,
        359,
        1638179352595,
        "pointermove"
    ],
    [
        "move",
        1328,
        351,
        1638179352602,
        "pointermove"
    ],
    [
        "move",
        1325,
        340,
        1638179352610,
        "pointermove"
    ],
    [
        "move",
        1324,
        332,
        1638179352617,
        "pointermove"
    ],
    [
        "move",
        1319,
        323,
        1638179352626,
        "pointermove"
    ],
    [
        "move",
        1313,
        314,
        1638179352634,
        "pointermove"
    ],
    [
        "move",
        1307,
        305,
        1638179352642,
        "pointermove"
    ],
    [
        "move",
        1302,
        298,
        1638179352650,
        "pointermove"
    ],
    [
        "move",
        1296,
        289,
        1638179352659,
        "pointermove"
    ],
    [
        "move",
        1292,
        284,
        1638179352666,
        "pointermove"
    ],
    [
        "move",
        1290,
        280,
        1638179352674,
        "pointermove"
    ],
    [
        "move",
        1289,
        278,
        1638179352681,
        "pointermove"
    ],
    [
        "move",
        1287,
        277,
        1638179352690,
        "pointermove"
    ],
    [
        "move",
        1287,
        276,
        1638179352698,
        "pointermove"
    ],
    [
        "move",
        1286,
        275,
        1638179352706,
        "pointermove"
    ],
    [
        "move",
        1285,
        274,
        1638179352714,
        "pointermove"
    ],
    [
        "move",
        1285,
        270,
        1638179352722,
        "pointermove"
    ],
    [
        "move",
        1284,
        265,
        1638179352729,
        "pointermove"
    ],
    [
        "move",
        1283,
        260,
        1638179352738,
        "pointermove"
    ],
    [
        "move",
        1280,
        254,
        1638179352746,
        "pointermove"
    ],
    [
        "move",
        1276,
        245,
        1638179352754,
        "pointermove"
    ],
    [
        "move",
        1274,
        239,
        1638179352762,
        "pointermove"
    ],
    [
        "move",
        1270,
        232,
        1638179352769,
        "pointermove"
    ],
    [
        "move",
        1268,
        225,
        1638179352778,
        "pointermove"
    ],
    [
        "move",
        1266,
        219,
        1638179352786,
        "pointermove"
    ],
    [
        "move",
        1264,
        215,
        1638179352794,
        "pointermove"
    ],
    [
        "move",
        1264,
        211,
        1638179352802,
        "pointermove"
    ],
    [
        "move",
        1264,
        205,
        1638179352810,
        "pointermove"
    ],
    [
        "move",
        1264,
        200,
        1638179352818,
        "pointermove"
    ],
    [
        "move",
        1264,
        192,
        1638179352826,
        "pointermove"
    ],
    [
        "move",
        1264,
        186,
        1638179352835,
        "pointermove"
    ],
    [
        "move",
        1264,
        181,
        1638179352842,
        "pointermove"
    ],
    [
        "move",
        1265,
        177,
        1638179352850,
        "pointermove"
    ],
    [
        "move",
        1265,
        172,
        1638179352857,
        "pointermove"
    ],
    [
        "move",
        1265,
        168,
        1638179352866,
        "pointermove"
    ],
    [
        "move",
        1265,
        164,
        1638179352874,
        "pointermove"
    ],
    [
        "move",
        1265,
        162,
        1638179352882,
        "pointermove"
    ],
    [
        "move",
        1265,
        161,
        1638179352889,
        "pointermove"
    ],
    [
        "move",
        1265,
        160,
        1638179352898,
        "pointermove"
    ],
    [
        "move",
        1265,
        159,
        1638179352914,
        "pointermove"
    ],
    [
        "move",
        1266,
        156,
        1638179352922,
        "pointermove"
    ],
    [
        "move",
        1267,
        155,
        1638179352930,
        "pointermove"
    ],
    [
        "move",
        1269,
        153,
        1638179352937,
        "pointermove"
    ],
    [
        "move",
        1270,
        151,
        1638179352945,
        "pointermove"
    ],
    [
        "move",
        1271,
        149,
        1638179352953,
        "pointermove"
    ],
    [
        "move",
        1273,
        146,
        1638179352961,
        "pointermove"
    ],
    [
        "move",
        1273,
        144,
        1638179352969,
        "pointermove"
    ],
    [
        "move",
        1274,
        141,
        1638179352977,
        "pointermove"
    ],
    [
        "move",
        1275,
        139,
        1638179352986,
        "pointermove"
    ],
    [
        "move",
        1275,
        137,
        1638179352993,
        "pointermove"
    ],
    [
        "move",
        1275,
        136,
        1638179353001,
        "pointermove"
    ],
    [
        "move",
        1275,
        135,
        1638179353010,
        "pointermove"
    ],
    [
        "move",
        1275,
        134,
        1638179353018,
        "pointermove"
    ],
    [
        "move",
        1275,
        133,
        1638179353154,
        "pointermove"
    ],
    [
        "move",
        1273,
        133,
        1638179353162,
        "pointermove"
    ],
    [
        "move",
        1266,
        133,
        1638179353169,
        "pointermove"
    ],
    [
        "move",
        1261,
        133,
        1638179353178,
        "pointermove"
    ],
    [
        "move",
        1254,
        134,
        1638179353186,
        "pointermove"
    ],
    [
        "move",
        1248,
        136,
        1638179353194,
        "pointermove"
    ],
    [
        "move",
        1241,
        139,
        1638179353201,
        "pointermove"
    ],
    [
        "move",
        1232,
        146,
        1638179353210,
        "pointermove"
    ],
    [
        "move",
        1225,
        153,
        1638179353218,
        "pointermove"
    ],
    [
        "move",
        1219,
        163,
        1638179353226,
        "pointermove"
    ],
    [
        "move",
        1216,
        173,
        1638179353234,
        "pointermove"
    ],
    [
        "move",
        1212,
        184,
        1638179353243,
        "pointermove"
    ],
    [
        "move",
        1208,
        195,
        1638179353250,
        "pointermove"
    ],
    [
        "move",
        1206,
        203,
        1638179353258,
        "pointermove"
    ],
    [
        "move",
        1205,
        210,
        1638179353265,
        "pointermove"
    ],
    [
        "move",
        1202,
        220,
        1638179353273,
        "pointermove"
    ],
    [
        "move",
        1200,
        225,
        1638179353282,
        "pointermove"
    ],
    [
        "move",
        1197,
        234,
        1638179353289,
        "pointermove"
    ],
    [
        "move",
        1195,
        241,
        1638179353297,
        "pointermove"
    ],
    [
        "move",
        1192,
        249,
        1638179353306,
        "pointermove"
    ],
    [
        "move",
        1190,
        256,
        1638179353314,
        "pointermove"
    ],
    [
        "move",
        1187,
        266,
        1638179353322,
        "pointermove"
    ],
    [
        "move",
        1181,
        275,
        1638179353330,
        "pointermove"
    ],
    [
        "move",
        1179,
        282,
        1638179353338,
        "pointermove"
    ],
    [
        "move",
        1175,
        290,
        1638179353345,
        "pointermove"
    ],
    [
        "move",
        1170,
        297,
        1638179353354,
        "pointermove"
    ],
    [
        "move",
        1167,
        303,
        1638179353361,
        "pointermove"
    ],
    [
        "move",
        1162,
        308,
        1638179353370,
        "pointermove"
    ],
    [
        "move",
        1159,
        313,
        1638179353378,
        "pointermove"
    ],
    [
        "move",
        1156,
        316,
        1638179353386,
        "pointermove"
    ],
    [
        "move",
        1154,
        320,
        1638179353394,
        "pointermove"
    ],
    [
        "move",
        1152,
        321,
        1638179353402,
        "pointermove"
    ],
    [
        "move",
        1151,
        324,
        1638179353410,
        "pointermove"
    ],
    [
        "move",
        1149,
        325,
        1638179353418,
        "pointermove"
    ],
    [
        "move",
        1149,
        326,
        1638179353426,
        "pointermove"
    ],
    [
        "move",
        1148,
        326,
        1638179353434,
        "pointermove"
    ],
    [
        "move",
        1148,
        327,
        1638179353442,
        "pointermove"
    ],
    [
        "move",
        1147,
        327,
        1638179353498,
        "pointermove"
    ],
    [
        "move",
        1146,
        327,
        1638179353514,
        "pointermove"
    ],
    [
        "move",
        1145,
        327,
        1638179353563,
        "pointermove"
    ],
    [
        "move",
        1145,
        323,
        1638179353578,
        "pointermove"
    ],
    [
        "move",
        1145,
        319,
        1638179353586,
        "pointermove"
    ],
    [
        "move",
        1145,
        315,
        1638179353594,
        "pointermove"
    ],
    [
        "move",
        1146,
        311,
        1638179353601,
        "pointermove"
    ],
    [
        "move",
        1146,
        310,
        1638179353618,
        "pointermove"
    ],
    [
        "move",
        1145,
        310,
        1638179353682,
        "pointermove"
    ],
    [
        "move",
        1143,
        311,
        1638179353690,
        "pointermove"
    ],
    [
        "move",
        1143,
        314,
        1638179353706,
        "pointermove"
    ],
    [
        "move",
        1142,
        315,
        1638179353714,
        "pointermove"
    ],
    [
        "move",
        1145,
        315,
        1638179353746,
        "pointermove"
    ],
    [
        "move",
        1158,
        312,
        1638179353753,
        "pointermove"
    ],
    [
        "move",
        1175,
        302,
        1638179353762,
        "pointermove"
    ],
    [
        "move",
        1187,
        292,
        1638179353770,
        "pointermove"
    ],
    [
        "move",
        1201,
        282,
        1638179353778,
        "pointermove"
    ],
    [
        "move",
        1215,
        267,
        1638179353786,
        "pointermove"
    ],
    [
        "move",
        1222,
        257,
        1638179353794,
        "pointermove"
    ],
    [
        "move",
        1232,
        246,
        1638179353801,
        "pointermove"
    ],
    [
        "move",
        1236,
        235,
        1638179353810,
        "pointermove"
    ],
    [
        "move",
        1237,
        225,
        1638179353818,
        "pointermove"
    ],
    [
        "move",
        1239,
        214,
        1638179353826,
        "pointermove"
    ],
    [
        "move",
        1238,
        203,
        1638179353833,
        "pointermove"
    ],
    [
        "move",
        1235,
        196,
        1638179353842,
        "pointermove"
    ],
    [
        "move",
        1233,
        185,
        1638179353849,
        "pointermove"
    ],
    [
        "move",
        1230,
        178,
        1638179353859,
        "pointermove"
    ],
    [
        "move",
        1230,
        174,
        1638179353865,
        "pointermove"
    ],
    [
        "move",
        1230,
        169,
        1638179353873,
        "pointermove"
    ],
    [
        "move",
        1230,
        167,
        1638179353881,
        "pointermove"
    ],
    [
        "move",
        1231,
        163,
        1638179353890,
        "pointermove"
    ],
    [
        "move",
        1234,
        161,
        1638179353898,
        "pointermove"
    ],
    [
        "move",
        1237,
        158,
        1638179353905,
        "pointermove"
    ],
    [
        "move",
        1241,
        155,
        1638179353914,
        "pointermove"
    ],
    [
        "move",
        1243,
        154,
        1638179353922,
        "pointermove"
    ],
    [
        "move",
        1245,
        152,
        1638179353929,
        "pointermove"
    ],
    [
        "move",
        1247,
        150,
        1638179353937,
        "pointermove"
    ],
    [
        "move",
        1248,
        148,
        1638179353954,
        "pointermove"
    ],
    [
        "move",
        1249,
        148,
        1638179353961,
        "pointermove"
    ],
    [
        "move",
        1245,
        148,
        1638179354082,
        "pointermove"
    ],
    [
        "move",
        1239,
        157,
        1638179354090,
        "pointermove"
    ],
    [
        "move",
        1233,
        169,
        1638179354098,
        "pointermove"
    ],
    [
        "move",
        1227,
        184,
        1638179354106,
        "pointermove"
    ],
    [
        "move",
        1220,
        201,
        1638179354114,
        "pointermove"
    ],
    [
        "move",
        1210,
        215,
        1638179354121,
        "pointermove"
    ],
    [
        "move",
        1203,
        221,
        1638179354130,
        "pointermove"
    ],
    [
        "move",
        1197,
        227,
        1638179354138,
        "pointermove"
    ],
    [
        "move",
        1193,
        231,
        1638179354146,
        "pointermove"
    ],
    [
        "move",
        1189,
        235,
        1638179354154,
        "pointermove"
    ],
    [
        "move",
        1187,
        235,
        1638179354170,
        "pointermove"
    ],
    [
        "move",
        1186,
        235,
        1638179354234,
        "pointermove"
    ],
    [
        "move",
        1184,
        236,
        1638179354243,
        "pointermove"
    ],
    [
        "move",
        1179,
        240,
        1638179354250,
        "pointermove"
    ],
    [
        "move",
        1171,
        248,
        1638179354259,
        "pointermove"
    ],
    [
        "move",
        1166,
        255,
        1638179354265,
        "pointermove"
    ],
    [
        "move",
        1161,
        266,
        1638179354274,
        "pointermove"
    ],
    [
        "move",
        1157,
        277,
        1638179354282,
        "pointermove"
    ],
    [
        "move",
        1155,
        288,
        1638179354290,
        "pointermove"
    ],
    [
        "move",
        1154,
        299,
        1638179354298,
        "pointermove"
    ],
    [
        "move",
        1152,
        310,
        1638179354306,
        "pointermove"
    ],
    [
        "move",
        1152,
        315,
        1638179354314,
        "pointermove"
    ],
    [
        "move",
        1152,
        322,
        1638179354322,
        "pointermove"
    ],
    [
        "move",
        1152,
        325,
        1638179354330,
        "pointermove"
    ],
    [
        "move",
        1152,
        326,
        1638179354338,
        "pointermove"
    ],
    [
        "move",
        1152,
        328,
        1638179354354,
        "pointermove"
    ],
    [
        "move",
        1152,
        329,
        1638179354394,
        "pointermove"
    ],
    [
        "move",
        1152,
        331,
        1638179354402,
        "pointermove"
    ],
    [
        "move",
        1152,
        333,
        1638179354410,
        "pointermove"
    ],
    [
        "move",
        1152,
        337,
        1638179354418,
        "pointermove"
    ],
    [
        "move",
        1151,
        338,
        1638179354426,
        "pointermove"
    ],
    [
        "move",
        1150,
        340,
        1638179354434,
        "pointermove"
    ],
    [
        "move",
        1150,
        341,
        1638179354442,
        "pointermove"
    ],
    [
        "move",
        1149,
        342,
        1638179354449,
        "pointermove"
    ],
    [
        "move",
        1148,
        343,
        1638179354457,
        "pointermove"
    ],
    [
        "move",
        1147,
        344,
        1638179354465,
        "pointermove"
    ],
    [
        "move",
        1146,
        344,
        1638179354473,
        "pointermove"
    ],
    [
        "move",
        1145,
        344,
        1638179354490,
        "pointermove"
    ],
    [
        "move",
        1144,
        344,
        1638179354498,
        "pointermove"
    ],
    [
        "move",
        1142,
        344,
        1638179354506,
        "pointermove"
    ],
    [
        "move",
        1141,
        344,
        1638179354514,
        "pointermove"
    ],
    [
        "move",
        1139,
        344,
        1638179354521,
        "pointermove"
    ],
    [
        "move",
        1137,
        343,
        1638179354530,
        "pointermove"
    ],
    [
        "move",
        1133,
        340,
        1638179354538,
        "pointermove"
    ],
    [
        "move",
        1131,
        339,
        1638179354546,
        "pointermove"
    ],
    [
        "move",
        1129,
        338,
        1638179354554,
        "pointermove"
    ],
    [
        "move",
        1129,
        336,
        1638179354562,
        "pointermove"
    ],
    [
        "move",
        1126,
        333,
        1638179354570,
        "pointermove"
    ],
    [
        "move",
        1126,
        332,
        1638179354602,
        "pointermove"
    ],
    [
        "focus",
        1638179354660
    ],
    [
        "down",
        1126,
        332,
        1638179354661,
        "pointerdown"
    ],
    [
        "up",
        1126,
        332,
        1638179354770,
        "pointerup"
    ],
    [
        "move",
        1129,
        329,
        1638179354802,
        "pointermove"
    ],
    [
        "move",
        1136,
        324,
        1638179354810,
        "pointermove"
    ],
    [
        "move",
        1145,
        318,
        1638179354817,
        "pointermove"
    ],
    [
        "move",
        1151,
        313,
        1638179354826,
        "pointermove"
    ],
    [
        "move",
        1160,
        305,
        1638179354833,
        "pointermove"
    ],
    [
        "move",
        1166,
        298,
        1638179354842,
        "pointermove"
    ],
    [
        "move",
        1173,
        292,
        1638179354849,
        "pointermove"
    ],
    [
        "move",
        1179,
        285,
        1638179354858,
        "pointermove"
    ],
    [
        "move",
        1185,
        277,
        1638179354866,
        "pointermove"
    ],
    [
        "move",
        1192,
        269,
        1638179354873,
        "pointermove"
    ],
    [
        "move",
        1197,
        261,
        1638179354882,
        "pointermove"
    ],
    [
        "move",
        1203,
        251,
        1638179354889,
        "pointermove"
    ],
    [
        "move",
        1207,
        242,
        1638179354898,
        "pointermove"
    ],
    [
        "move",
        1211,
        231,
        1638179354905,
        "pointermove"
    ],
    [
        "move",
        1217,
        220,
        1638179354914,
        "pointermove"
    ],
    [
        "move",
        1221,
        210,
        1638179354922,
        "pointermove"
    ],
    [
        "move",
        1224,
        203,
        1638179354930,
        "pointermove"
    ],
    [
        "move",
        1229,
        199,
        1638179354938,
        "pointermove"
    ],
    [
        "move",
        1232,
        195,
        1638179354946,
        "pointermove"
    ],
    [
        "move",
        1236,
        190,
        1638179354953,
        "pointermove"
    ],
    [
        "move",
        1237,
        187,
        1638179354962,
        "pointermove"
    ],
    [
        "move",
        1241,
        182,
        1638179354969,
        "pointermove"
    ],
    [
        "move",
        1242,
        180,
        1638179354978,
        "pointermove"
    ],
    [
        "move",
        1243,
        177,
        1638179354986,
        "pointermove"
    ],
    [
        "move",
        1244,
        174,
        1638179354994,
        "pointermove"
    ],
    [
        "move",
        1246,
        172,
        1638179355002,
        "pointermove"
    ],
    [
        "move",
        1246,
        170,
        1638179355010,
        "pointermove"
    ],
    [
        "move",
        1248,
        167,
        1638179355018,
        "pointermove"
    ],
    [
        "move",
        1249,
        164,
        1638179355027,
        "pointermove"
    ],
    [
        "move",
        1251,
        159,
        1638179355034,
        "pointermove"
    ],
    [
        "move",
        1253,
        154,
        1638179355042,
        "pointermove"
    ],
    [
        "move",
        1254,
        151,
        1638179355050,
        "pointermove"
    ],
    [
        "move",
        1254,
        149,
        1638179355058,
        "pointermove"
    ],
    [
        "move",
        1255,
        147,
        1638179355066,
        "pointermove"
    ],
    [
        "move",
        1256,
        146,
        1638179355073,
        "pointermove"
    ],
    [
        "move",
        1257,
        142,
        1638179355081,
        "pointermove"
    ],
    [
        "move",
        1258,
        140,
        1638179355089,
        "pointermove"
    ],
    [
        "move",
        1258,
        139,
        1638179355098,
        "pointermove"
    ],
    [
        "move",
        1259,
        137,
        1638179355105,
        "pointermove"
    ],
    [
        "move",
        1260,
        134,
        1638179355114,
        "pointermove"
    ],
    [
        "move",
        1260,
        132,
        1638179355122,
        "pointermove"
    ],
    [
        "move",
        1260,
        129,
        1638179355130,
        "pointermove"
    ],
    [
        "move",
        1261,
        128,
        1638179355137,
        "pointermove"
    ],
    [
        "move",
        1261,
        126,
        1638179355146,
        "pointermove"
    ],
    [
        "move",
        1261,
        125,
        1638179355154,
        "pointermove"
    ],
    [
        "move",
        1261,
        124,
        1638179355162,
        "pointermove"
    ],
    [
        "move",
        1261,
        122,
        1638179355170,
        "pointermove"
    ],
    [
        "move",
        1261,
        121,
        1638179355202,
        "pointermove"
    ],
    [
        "move",
        1261,
        120,
        1638179355210,
        "pointermove"
    ],
    [
        "move",
        1261,
        118,
        1638179355218,
        "pointermove"
    ],
    [
        "move",
        1262,
        116,
        1638179355226,
        "pointermove"
    ],
    [
        "move",
        1262,
        115,
        1638179355234,
        "pointermove"
    ],
    [
        "move",
        1264,
        112,
        1638179355244,
        "pointermove"
    ],
    [
        "move",
        1264,
        110,
        1638179355250,
        "pointermove"
    ],
    [
        "move",
        1265,
        108,
        1638179355258,
        "pointermove"
    ],
    [
        "move",
        1265,
        107,
        1638179355265,
        "pointermove"
    ],
    [
        "move",
        1266,
        105,
        1638179355274,
        "pointermove"
    ],
    [
        "move",
        1266,
        104,
        1638179355282,
        "pointermove"
    ],
    [
        "move",
        1266,
        103,
        1638179355290,
        "pointermove"
    ],
    [
        "move",
        1266,
        102,
        1638179355297,
        "pointermove"
    ],
    [
        "down",
        1266,
        102,
        1638179355347,
        "pointerdown"
    ],
    [
        "up",
        1266,
        102,
        1638179355449,
        "pointerup"
    ],
    [
        "move",
        1266,
        104,
        1638179355490,
        "pointermove"
    ],
    [
        "move",
        1266,
        108,
        1638179355497,
        "pointermove"
    ],
    [
        "move",
        1266,
        112,
        1638179355505,
        "pointermove"
    ],
    [
        "move",
        1266,
        115,
        1638179355514,
        "pointermove"
    ],
    [
        "move",
        1264,
        120,
        1638179355521,
        "pointermove"
    ],
    [
        "move",
        1262,
        125,
        1638179355529,
        "pointermove"
    ],
    [
        "move",
        1259,
        132,
        1638179355538,
        "pointermove"
    ],
    [
        "move",
        1258,
        135,
        1638179355545,
        "pointermove"
    ],
    [
        "move",
        1254,
        139,
        1638179355554,
        "pointermove"
    ],
    [
        "move",
        1251,
        143,
        1638179355562,
        "pointermove"
    ],
    [
        "move",
        1248,
        145,
        1638179355570,
        "pointermove"
    ],
    [
        "move",
        1246,
        149,
        1638179355578,
        "pointermove"
    ],
    [
        "move",
        1243,
        152,
        1638179355586,
        "pointermove"
    ],
    [
        "move",
        1241,
        154,
        1638179355594,
        "pointermove"
    ],
    [
        "move",
        1237,
        158,
        1638179355602,
        "pointermove"
    ],
    [
        "move",
        1232,
        162,
        1638179355610,
        "pointermove"
    ],
    [
        "move",
        1229,
        164,
        1638179355618,
        "pointermove"
    ],
    [
        "move",
        1227,
        169,
        1638179355626,
        "pointermove"
    ],
    [
        "move",
        1225,
        172,
        1638179355634,
        "pointermove"
    ],
    [
        "move",
        1221,
        175,
        1638179355642,
        "pointermove"
    ],
    [
        "move",
        1219,
        176,
        1638179355650,
        "pointermove"
    ],
    [
        "move",
        1215,
        178,
        1638179355658,
        "pointermove"
    ],
    [
        "move",
        1212,
        180,
        1638179355666,
        "pointermove"
    ],
    [
        "move",
        1211,
        180,
        1638179355673,
        "pointermove"
    ],
    [
        "move",
        1208,
        182,
        1638179355681,
        "pointermove"
    ],
    [
        "move",
        1206,
        183,
        1638179355689,
        "pointermove"
    ],
    [
        "move",
        1205,
        183,
        1638179355697,
        "pointermove"
    ],
    [
        "move",
        1204,
        184,
        1638179355706,
        "pointermove"
    ],
    [
        "move",
        1203,
        185,
        1638179355722,
        "pointermove"
    ],
    [
        "move",
        1201,
        186,
        1638179355730,
        "pointermove"
    ],
    [
        "move",
        1201,
        187,
        1638179355737,
        "pointermove"
    ],
    [
        "move",
        1200,
        187,
        1638179355746,
        "pointermove"
    ],
    [
        "move",
        1198,
        187,
        1638179355753,
        "pointermove"
    ],
    [
        "move",
        1195,
        187,
        1638179355762,
        "pointermove"
    ],
    [
        "move",
        1194,
        189,
        1638179355769,
        "pointermove"
    ],
    [
        "move",
        1193,
        189,
        1638179355778,
        "pointermove"
    ],
    [
        "move",
        1192,
        189,
        1638179355785,
        "pointermove"
    ],
    [
        "move",
        1191,
        190,
        1638179355794,
        "pointermove"
    ],
    [
        "move",
        1189,
        191,
        1638179355802,
        "pointermove"
    ],
    [
        "move",
        1188,
        193,
        1638179355810,
        "pointermove"
    ],
    [
        "move",
        1187,
        193,
        1638179355818,
        "pointermove"
    ],
    [
        "move",
        1187,
        194,
        1638179355826,
        "pointermove"
    ],
    [
        "move",
        1185,
        196,
        1638179355834,
        "pointermove"
    ],
    [
        "move",
        1185,
        197,
        1638179355962,
        "pointermove"
    ],
    [
        "move",
        1181,
        200,
        1638179355969,
        "pointermove"
    ],
    [
        "move",
        1180,
        200,
        1638179355978,
        "pointermove"
    ],
    [
        "move",
        1176,
        203,
        1638179355986,
        "pointermove"
    ],
    [
        "move",
        1174,
        204,
        1638179355994,
        "pointermove"
    ],
    [
        "move",
        1172,
        204,
        1638179356002,
        "pointermove"
    ],
    [
        "move",
        1170,
        205,
        1638179356009,
        "pointermove"
    ],
    [
        "move",
        1167,
        208,
        1638179356018,
        "pointermove"
    ],
    [
        "move",
        1166,
        208,
        1638179356026,
        "pointermove"
    ],
    [
        "move",
        1165,
        208,
        1638179356034,
        "pointermove"
    ],
    [
        "move",
        1164,
        209,
        1638179356059,
        "pointermove"
    ],
    [
        "down",
        1164,
        209,
        1638179356196,
        "pointerdown"
    ],
    [
        "up",
        1164,
        209,
        1638179356298,
        "pointerup"
    ],
    [
        "move",
        1167,
        205,
        1638179356330,
        "pointermove"
    ],
    [
        "move",
        1171,
        197,
        1638179356337,
        "pointermove"
    ],
    [
        "move",
        1176,
        191,
        1638179356346,
        "pointermove"
    ],
    [
        "move",
        1182,
        183,
        1638179356353,
        "pointermove"
    ],
    [
        "move",
        1186,
        175,
        1638179356362,
        "pointermove"
    ],
    [
        "move",
        1189,
        169,
        1638179356369,
        "pointermove"
    ],
    [
        "move",
        1192,
        161,
        1638179356378,
        "pointermove"
    ],
    [
        "move",
        1194,
        154,
        1638179356385,
        "pointermove"
    ],
    [
        "move",
        1196,
        147,
        1638179356394,
        "pointermove"
    ],
    [
        "move",
        1196,
        142,
        1638179356401,
        "pointermove"
    ],
    [
        "move",
        1197,
        138,
        1638179356410,
        "pointermove"
    ],
    [
        "move",
        1197,
        134,
        1638179356418,
        "pointermove"
    ],
    [
        "move",
        1197,
        132,
        1638179356426,
        "pointermove"
    ],
    [
        "move",
        1197,
        129,
        1638179356434,
        "pointermove"
    ],
    [
        "move",
        1197,
        126,
        1638179356442,
        "pointermove"
    ],
    [
        "move",
        1197,
        122,
        1638179356450,
        "pointermove"
    ],
    [
        "move",
        1197,
        119,
        1638179356457,
        "pointermove"
    ],
    [
        "move",
        1197,
        115,
        1638179356466,
        "pointermove"
    ],
    [
        "move",
        1197,
        111,
        1638179356473,
        "pointermove"
    ],
    [
        "move",
        1198,
        109,
        1638179356481,
        "pointermove"
    ],
    [
        "move",
        1198,
        106,
        1638179356489,
        "pointermove"
    ],
    [
        "move",
        1198,
        105,
        1638179356498,
        "pointermove"
    ],
    [
        "move",
        1198,
        104,
        1638179356505,
        "pointermove"
    ],
    [
        "down",
        1198,
        104,
        1638179356546,
        "pointerdown"
    ],
    [
        "up",
        1198,
        104,
        1638179356642,
        "pointerup"
    ],
    [
        "move",
        1200,
        104,
        1638179356730,
        "pointermove"
    ],
    [
        "move",
        1204,
        108,
        1638179356738,
        "pointermove"
    ],
    [
        "move",
        1207,
        113,
        1638179356746,
        "pointermove"
    ],
    [
        "move",
        1212,
        122,
        1638179356753,
        "pointermove"
    ],
    [
        "move",
        1218,
        129,
        1638179356762,
        "pointermove"
    ],
    [
        "move",
        1226,
        142,
        1638179356769,
        "pointermove"
    ],
    [
        "move",
        1235,
        155,
        1638179356778,
        "pointermove"
    ],
    [
        "move",
        1247,
        172,
        1638179356785,
        "pointermove"
    ],
    [
        "move",
        1257,
        188,
        1638179356794,
        "pointermove"
    ],
    [
        "move",
        1269,
        205,
        1638179356801,
        "pointermove"
    ],
    [
        "move",
        1281,
        220,
        1638179356810,
        "pointermove"
    ],
    [
        "move",
        1294,
        237,
        1638179356817,
        "pointermove"
    ],
    [
        "move",
        1304,
        251,
        1638179356826,
        "pointermove"
    ],
    [
        "move",
        1315,
        263,
        1638179356834,
        "pointermove"
    ],
    [
        "move",
        1321,
        270,
        1638179356844,
        "pointermove"
    ],
    [
        "move",
        1330,
        278,
        1638179356850,
        "pointermove"
    ],
    [
        "move",
        1335,
        283,
        1638179356858,
        "pointermove"
    ],
    [
        "move",
        1340,
        288,
        1638179356866,
        "pointermove"
    ],
    [
        "move",
        1345,
        293,
        1638179356873,
        "pointermove"
    ],
    [
        "move",
        1347,
        296,
        1638179356882,
        "pointermove"
    ],
    [
        "move",
        1349,
        301,
        1638179356890,
        "pointermove"
    ],
    [
        "move",
        1350,
        302,
        1638179356897,
        "pointermove"
    ],
    [
        "move",
        1352,
        305,
        1638179356905,
        "pointermove"
    ],
    [
        "move",
        1353,
        308,
        1638179356914,
        "pointermove"
    ],
    [
        "move",
        1354,
        309,
        1638179356921,
        "pointermove"
    ],
    [
        "move",
        1355,
        311,
        1638179356929,
        "pointermove"
    ],
    [
        "move",
        1357,
        313,
        1638179356938,
        "pointermove"
    ],
    [
        "move",
        1358,
        316,
        1638179356946,
        "pointermove"
    ],
    [
        "move",
        1360,
        320,
        1638179356953,
        "pointermove"
    ],
    [
        "move",
        1361,
        322,
        1638179356962,
        "pointermove"
    ],
    [
        "move",
        1363,
        327,
        1638179356969,
        "pointermove"
    ],
    [
        "move",
        1366,
        332,
        1638179356978,
        "pointermove"
    ],
    [
        "move",
        1367,
        338,
        1638179356986,
        "pointermove"
    ],
    [
        "move",
        1372,
        345,
        1638179356994,
        "pointermove"
    ],
    [
        "move",
        1373,
        351,
        1638179357002,
        "pointermove"
    ],
    [
        "move",
        1377,
        358,
        1638179357010,
        "pointermove"
    ],
    [
        "move",
        1378,
        361,
        1638179357018,
        "pointermove"
    ],
    [
        "move",
        1379,
        364,
        1638179357027,
        "pointermove"
    ],
    [
        "move",
        1379,
        367,
        1638179357034,
        "pointermove"
    ],
    [
        "move",
        1379,
        369,
        1638179357042,
        "pointermove"
    ],
    [
        "move",
        1379,
        371,
        1638179357050,
        "pointermove"
    ],
    [
        "move",
        1379,
        373,
        1638179357057,
        "pointermove"
    ],
    [
        "move",
        1379,
        374,
        1638179357067,
        "pointermove"
    ],
    [
        "move",
        1379,
        376,
        1638179357074,
        "pointermove"
    ],
    [
        "move",
        1378,
        379,
        1638179357082,
        "pointermove"
    ],
    [
        "move",
        1378,
        381,
        1638179357099,
        "pointermove"
    ],
    [
        "move",
        1378,
        382,
        1638179357105,
        "pointermove"
    ],
    [
        "move",
        1378,
        385,
        1638179357114,
        "pointermove"
    ],
    [
        "move",
        1378,
        386,
        1638179357121,
        "pointermove"
    ],
    [
        "move",
        1378,
        388,
        1638179357138,
        "pointermove"
    ],
    [
        "move",
        1378,
        389,
        1638179357146,
        "pointermove"
    ],
    [
        "move",
        1377,
        390,
        1638179357154,
        "pointermove"
    ],
    [
        "move",
        1377,
        391,
        1638179357162,
        "pointermove"
    ],
    [
        "move",
        1376,
        393,
        1638179357178,
        "pointermove"
    ],
    [
        "move",
        1375,
        395,
        1638179357185,
        "pointermove"
    ],
    [
        "down",
        1375,
        395,
        1638179357307,
        "pointerdown"
    ],
    [
        "focus",
        1638179357307
    ],
    [
        "up",
        1375,
        395,
        1638179357410,
        "pointerup"
    ]
];
    var word_coordinates = [
    {
        "x": 1126,
        "y": 332,
        "t": 0,
        "dt": 2552
    },
    {
        "x": 1266,
        "y": 102,
        "t": 0,
        "dt": 680
    },
    {
        "x": 1164,
        "y": 209,
        "t": 0,
        "dt": 848
    },
    {
        "x": 1198,
        "y": 104,
        "t": 0,
        "dt": 345
    },
    {
        "x": 1375,
        "y": 395,
        "t": 3,
        "dt": 770
    }
];

    var s = new ftgH()['EhLr'](tracks);

    var o = {
        "lang": "zh-cn",
        "passtime": passtime,
        // "a": "2346_4541,4416_2981,3846_5291",
        "a": percentage_word_coordinates,
        "pic": pic,
        "tt": nCRc(s, c_ls, s_key),
        "ep": {
            "ca": word_coordinates,
            "v": "3.0.2",
            "te": false,
            "me": true,
            "tm": many_tm()
        }
    }
    o["rp"] = $_DDF(gt + challenge + passtime);

    var aaa = new QpeE();
    var u = aaa["encrypt"](encryptKey);
    var f = it()["encrypt"](ge["stringify"](o), encryptKey);
    var p = j["aBxe"](f);
    return p + u


}

// console.log("111:"+new QpeE()["encrypt"]("2ed0f2be793a5ebe"));
const  percentage_word_coordinates = "4296_3281,7686_8081,1896_4181",
    pic = "/captcha_v3/batch/v3/2021-11-29T11/word/7cab81c911da48db9a895d710e7f66e5.jpg",
    c_ls =  [12, 58, 98, 36, 43, 95, 62, 15, 12], s_key = "43372932",
    my_encryptKey = "bad49454e6ddcc66", gt = "9dd4b398509fd4b2a2cbf2a7c0a7c605",
    challenge = "1355b6912176509d79acb2c9eb2419d0";

console.log("w3:" + dianxuan_w3(gt,challenge, percentage_word_coordinates, pic, c_ls, s_key, my_encryptKey));