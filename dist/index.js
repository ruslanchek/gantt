const v = "year", $ = "month", b = "day", M = "hour", k = "minute", x = "second", D = "millisecond", Y = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  ru: [
    "\u042F\u043D\u0432\u0430\u0440\u044C",
    "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
    "\u041C\u0430\u0440\u0442",
    "\u0410\u043F\u0440\u0435\u043B\u044C",
    "\u041C\u0430\u0439",
    "\u0418\u044E\u043D\u044C",
    "\u0418\u044E\u043B\u044C",
    "\u0410\u0432\u0433\u0443\u0441\u0442",
    "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
    "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
    "\u041D\u043E\u044F\u0431\u0440\u044C",
    "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
  ],
  ptBr: [
    "Janeiro",
    "Fevereiro",
    "Mar\xE7o",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  fr: [
    "Janvier",
    "F\xE9vrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Ao\xFBt",
    "Septembre",
    "Octobre",
    "Novembre",
    "D\xE9cembre"
  ],
  tr: [
    "Ocak",
    "\u015Eubat",
    "Mart",
    "Nisan",
    "May\u0131s",
    "Haziran",
    "Temmuz",
    "A\u011Fustos",
    "Eyl\xFCl",
    "Ekim",
    "Kas\u0131m",
    "Aral\u0131k"
  ],
  zh: [
    "\u4E00\u6708",
    "\u4E8C\u6708",
    "\u4E09\u6708",
    "\u56DB\u6708",
    "\u4E94\u6708",
    "\u516D\u6708",
    "\u4E03\u6708",
    "\u516B\u6708",
    "\u4E5D\u6708",
    "\u5341\u6708",
    "\u5341\u4E00\u6708",
    "\u5341\u4E8C\u6708"
  ]
}, o = {
  parse(r, t = "-", e = /[.:]/) {
    if (r instanceof Date)
      return r;
    if (typeof r == "string") {
      let s, n;
      const i = r.split(" ");
      s = i[0].split(t).map((h) => parseInt(h, 10)), n = i[1] && i[1].split(e), s[1] = s[1] - 1;
      let a = s;
      return n && n.length && (n.length == 4 && (n[3] = "0." + n[3], n[3] = parseFloat(n[3]) * 1e3), a = a.concat(n)), new Date(...a);
    }
  },
  to_string(r, t = !1) {
    if (!(r instanceof Date))
      throw new TypeError("Invalid argument type");
    const e = this.get_date_values(r).map((i, a) => (a === 1 && (i = i + 1), a === 6 ? y(i + "", 3, "0") : y(i + "", 2, "0"))), s = `${e[0]}-${e[1]}-${e[2]}`, n = `${e[3]}:${e[4]}:${e[5]}.${e[6]}`;
    return s + (t ? " " + n : "");
  },
  format(r, t = "YYYY-MM-DD HH:mm:ss.SSS", e = "en") {
    const s = this.get_date_values(r).map((h) => y(h, 2, 0)), n = {
      YYYY: s[0],
      MM: y(+s[1] + 1, 2, 0),
      DD: s[2],
      HH: s[3],
      mm: s[4],
      ss: s[5],
      SSS: s[6],
      D: s[2],
      MMMM: Y[e][+s[1]],
      MMM: Y[e][+s[1]]
    };
    let i = t;
    const a = [];
    return Object.keys(n).sort((h, d) => d.length - h.length).forEach((h) => {
      i.includes(h) && (i = i.replace(h, `$${a.length}`), a.push(n[h]));
    }), a.forEach((h, d) => {
      i = i.replace(`$${d}`, h);
    }), i;
  },
  diff(r, t, e = b) {
    let s, n, i, a, h, d, g;
    return s = r - t, n = s / 1e3, a = n / 60, i = a / 60, h = i / 24, d = h / 30, g = d / 12, e.endsWith("s") || (e += "s"), Math.floor(
      {
        milliseconds: s,
        seconds: n,
        minutes: a,
        hours: i,
        days: h,
        months: d,
        years: g
      }[e]
    );
  },
  today() {
    const r = this.get_date_values(new Date()).slice(0, 3);
    return new Date(...r);
  },
  now() {
    return new Date();
  },
  add(r, t, e) {
    t = parseInt(t, 10);
    const s = [
      r.getFullYear() + (e === v ? t : 0),
      r.getMonth() + (e === $ ? t : 0),
      r.getDate() + (e === b ? t : 0),
      r.getHours() + (e === M ? t : 0),
      r.getMinutes() + (e === k ? t : 0),
      r.getSeconds() + (e === x ? t : 0),
      r.getMilliseconds() + (e === D ? t : 0)
    ];
    return new Date(...s);
  },
  start_of(r, t) {
    const e = {
      [v]: 6,
      [$]: 5,
      [b]: 4,
      [M]: 3,
      [k]: 2,
      [x]: 1,
      [D]: 0
    };
    function s(i) {
      const a = e[t];
      return e[i] <= a;
    }
    const n = [
      r.getFullYear(),
      s(v) ? 0 : r.getMonth(),
      s($) ? 1 : r.getDate(),
      s(b) ? 0 : r.getHours(),
      s(M) ? 0 : r.getMinutes(),
      s(k) ? 0 : r.getSeconds(),
      s(x) ? 0 : r.getMilliseconds()
    ];
    return new Date(...n);
  },
  clone(r) {
    return new Date(...this.get_date_values(r));
  },
  get_date_values(r) {
    return [
      r.getFullYear(),
      r.getMonth(),
      r.getDate(),
      r.getHours(),
      r.getMinutes(),
      r.getSeconds(),
      r.getMilliseconds()
    ];
  },
  get_days_in_month(r) {
    const t = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], e = r.getMonth();
    if (e !== 1)
      return t[e];
    const s = r.getFullYear();
    return s % 4 == 0 && s % 100 != 0 || s % 400 == 0 ? 29 : 28;
  }
};
function y(r, t, e) {
  return r = r + "", t = t >> 0, e = String(typeof e < "u" ? e : " "), r.length > t ? String(r) : (t = t - r.length, t > e.length && (e += e.repeat(t / e.length)), e.slice(0, t) + String(r));
}
function p(r, t) {
  return typeof r == "string" ? (t || document).querySelector(r) : r || null;
}
function _(r, t) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", r);
  for (let s in t)
    s === "append_to" ? t.append_to.appendChild(e) : s === "innerHTML" ? e.innerHTML = t.innerHTML : e.setAttribute(s, t[s]);
  return e;
}
function E(r, t, e, s) {
  const n = A(r, t, e, s);
  if (n === r) {
    const i = document.createEvent("HTMLEvents");
    i.initEvent("click", !0, !0), i.eventName = "click", n.dispatchEvent(i);
  }
}
function A(r, t, e, s, n = "0.4s", i = "0.1s") {
  const a = r.querySelector("animate");
  if (a)
    return p.attr(a, {
      attributeName: t,
      from: e,
      to: s,
      dur: n,
      begin: "click + " + i
    }), r;
  const h = _("animate", {
    attributeName: t,
    from: e,
    to: s,
    dur: n,
    begin: i,
    calcMode: "spline",
    values: e + ";" + s,
    keyTimes: "0; 1",
    keySplines: H("ease-out")
  });
  return r.appendChild(h), r;
}
function H(r) {
  return {
    ease: ".25 .1 .25 1",
    linear: "0 0 1 1",
    "ease-in": ".42 0 1 1",
    "ease-out": "0 0 .58 1",
    "ease-in-out": ".42 0 .58 1"
  }[r];
}
p.on = (r, t, e, s) => {
  s ? p.delegate(r, t, e, s) : (s = e, p.bind(r, t, s));
};
p.off = (r, t, e) => {
  r.removeEventListener(t, e);
};
p.bind = (r, t, e) => {
  t.split(/\s+/).forEach(function(s) {
    r.addEventListener(s, e);
  });
};
p.delegate = (r, t, e, s) => {
  r.addEventListener(t, function(n) {
    const i = n.target.closest(e);
    i && (n.delegatedTarget = i, s.call(this, n, i));
  });
};
p.closest = (r, t) => t ? t.matches(r) ? t : p.closest(r, t.parentNode) : null;
p.attr = (r, t, e) => {
  if (!e && typeof t == "string")
    return r.getAttribute(t);
  if (typeof t == "object") {
    for (let s in t)
      p.attr(r, s, t[s]);
    return;
  }
  r.setAttribute(t, e);
};
class S {
  constructor(t, e) {
    this.set_defaults(t, e), this.prepare(), this.draw(), this.bind();
  }
  set_defaults(t, e) {
    this.action_completed = !1, this.gantt = t, this.task = e;
  }
  prepare() {
    this.prepare_values(), this.prepare_helpers();
  }
  prepare_values() {
    this.invalid = this.task.invalid, this.height = this.gantt.options.bar_height, this.x = this.compute_x(), this.y = this.compute_y(), this.corner_radius = this.gantt.options.bar_corner_radius, this.duration = o.diff(this.task._end, this.task._start, "hour") / this.gantt.options.step, this.width = this.gantt.options.column_width * this.duration, this.progress_width = this.gantt.options.column_width * this.duration * (this.task.progress / 100) || 0, this.group = _("g", {
      class: "bar-wrapper " + (this.task.custom_class || ""),
      "data-id": this.task.id
    }), this.bar_group = _("g", {
      class: "bar-group",
      append_to: this.group
    }), this.handle_group = _("g", {
      class: "handle-group",
      append_to: this.group
    });
  }
  prepare_helpers() {
    SVGElement.prototype.getX = function() {
      return +this.getAttribute("x");
    }, SVGElement.prototype.getY = function() {
      return +this.getAttribute("y");
    }, SVGElement.prototype.getWidth = function() {
      return +this.getAttribute("width");
    }, SVGElement.prototype.getHeight = function() {
      return +this.getAttribute("height");
    }, SVGElement.prototype.getEndX = function() {
      return this.getX() + this.getWidth();
    };
  }
  draw() {
    this.draw_bar(), this.draw_progress_bar(), this.draw_label(), this.draw_resize_handles();
  }
  draw_bar() {
    this.$bar = _("rect", {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      rx: this.corner_radius,
      ry: this.corner_radius,
      class: "bar",
      append_to: this.bar_group
    }), E(this.$bar, "width", 0, this.width), this.invalid && this.$bar.classList.add("bar-invalid");
  }
  draw_progress_bar() {
    this.invalid || (this.$bar_progress = _("rect", {
      x: this.x,
      y: this.y,
      width: this.progress_width,
      height: this.height,
      rx: this.corner_radius,
      ry: this.corner_radius,
      class: "bar-progress",
      append_to: this.bar_group
    }), E(this.$bar_progress, "width", 0, this.progress_width));
  }
  draw_label() {
    _("text", {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      innerHTML: this.task.name,
      class: "bar-label",
      append_to: this.bar_group
    }), requestAnimationFrame(() => this.update_label_position());
  }
  draw_resize_handles() {
    if (this.invalid)
      return;
    const t = this.$bar, e = 8;
    _("rect", {
      x: t.getX() + t.getWidth() - 9,
      y: t.getY() + 1,
      width: e,
      height: this.height - 2,
      rx: this.corner_radius,
      ry: this.corner_radius,
      class: "handle right",
      append_to: this.handle_group
    }), _("rect", {
      x: t.getX() + 1,
      y: t.getY() + 1,
      width: e,
      height: this.height - 2,
      rx: this.corner_radius,
      ry: this.corner_radius,
      class: "handle left",
      append_to: this.handle_group
    }), this.task.progress && this.task.progress < 100 && (this.$handle_progress = _("polygon", {
      points: this.get_progress_polygon_points().join(","),
      class: "handle progress",
      append_to: this.handle_group
    }));
  }
  get_progress_polygon_points() {
    const t = this.$bar_progress;
    return [
      t.getEndX() - 5,
      t.getY() + t.getHeight(),
      t.getEndX() + 5,
      t.getY() + t.getHeight(),
      t.getEndX(),
      t.getY() + t.getHeight() - 8.66
    ];
  }
  bind() {
    this.invalid || this.setup_click_event();
  }
  setup_click_event() {
    p.on(this.group, "focus " + this.gantt.options.popup_trigger, (t) => {
      this.action_completed || (this.show_popup(), this.gantt.unselect_all(), this.group.classList.add("active"));
    }), p.on(this.group, "dblclick", (t) => {
      this.action_completed || this.gantt.trigger_event("click", [this.task]);
    });
  }
  show_popup() {
    if (this.gantt.bar_being_dragged)
      return;
    const t = o.format(
      this.task._start,
      "MMM D",
      this.gantt.options.language
    ), e = o.format(
      o.add(this.task._end, -1, "second"),
      "MMM D",
      this.gantt.options.language
    ), s = t + " - " + e;
    this.gantt.show_popup({
      target_element: this.$bar,
      title: this.task.name,
      subtitle: s,
      task: this.task
    });
  }
  update_bar_position({ x: t = null, width: e = null }) {
    const s = this.$bar;
    if (t) {
      if (!this.task.dependencies.map((a) => this.gantt.get_bar(a).$bar.getX()).reduce((a, h) => t >= h, t)) {
        e = null;
        return;
      }
      this.update_attr(s, "x", t);
    }
    e && e >= this.gantt.options.column_width && this.update_attr(s, "width", e), this.update_label_position(), this.update_handle_position(), this.update_progressbar_position(), this.update_arrow_position();
  }
  date_changed() {
    let t = !1;
    const { new_start_date: e, new_end_date: s } = this.compute_start_end_date();
    Number(this.task._start) !== Number(e) && (t = !0, this.task._start = e), Number(this.task._end) !== Number(s) && (t = !0, this.task._end = s), t && this.gantt.trigger_event("date_change", [
      this.task,
      e,
      o.add(s, -1, "second")
    ]);
  }
  progress_changed() {
    const t = this.compute_progress();
    this.task.progress = t, this.gantt.trigger_event("progress_change", [this.task, t]);
  }
  set_action_completed() {
    this.action_completed = !0, setTimeout(() => this.action_completed = !1, 1e3);
  }
  compute_start_end_date() {
    const t = this.$bar, e = t.getX() / this.gantt.options.column_width, s = o.add(
      this.gantt.gantt_start,
      e * this.gantt.options.step,
      "hour"
    ), n = t.getWidth() / this.gantt.options.column_width, i = o.add(
      s,
      n * this.gantt.options.step,
      "hour"
    );
    return { new_start_date: s, new_end_date: i };
  }
  compute_progress() {
    const t = this.$bar_progress.getWidth() / this.$bar.getWidth() * 100;
    return parseInt(t, 10);
  }
  compute_x() {
    const { step: t, column_width: e } = this.gantt.options, s = this.task._start, n = this.gantt.gantt_start;
    let a = o.diff(s, n, "hour") / t * e;
    return this.gantt.view_is("Month") && (a = o.diff(s, n, "day") * e / 30), a;
  }
  compute_y() {
    return this.gantt.options.header_height + this.gantt.options.padding + this.task._index * (this.height + this.gantt.options.padding);
  }
  get_snap_position(t) {
    let e = t, s, n;
    return this.gantt.view_is("Week") ? (s = t % (this.gantt.options.column_width / 7), n = e - s + (s < this.gantt.options.column_width / 14 ? 0 : this.gantt.options.column_width / 7)) : this.gantt.view_is("Month") ? (s = t % (this.gantt.options.column_width / 30), n = e - s + (s < this.gantt.options.column_width / 60 ? 0 : this.gantt.options.column_width / 30)) : (s = t % this.gantt.options.column_width, n = e - s + (s < this.gantt.options.column_width / 2 ? 0 : this.gantt.options.column_width)), n;
  }
  update_attr(t, e, s) {
    return s = +s, isNaN(s) || t.setAttribute(e, s), t;
  }
  update_progressbar_position() {
    this.$bar_progress.setAttribute("x", this.$bar.getX()), this.$bar_progress.setAttribute(
      "width",
      this.$bar.getWidth() * (this.task.progress / 100)
    );
  }
  update_label_position() {
    const t = this.$bar, e = this.group.querySelector(".bar-label");
    e.getBBox().width > t.getWidth() ? (e.classList.add("big"), e.setAttribute("x", t.getX() + t.getWidth() + 5)) : (e.classList.remove("big"), e.setAttribute("x", t.getX() + t.getWidth() / 2));
  }
  update_handle_position() {
    const t = this.$bar;
    this.handle_group.querySelector(".handle.left").setAttribute("x", t.getX() + 1), this.handle_group.querySelector(".handle.right").setAttribute("x", t.getEndX() - 9);
    const e = this.group.querySelector(".handle.progress");
    e && e.setAttribute("points", this.get_progress_polygon_points());
  }
  update_arrow_position() {
    this.arrows = this.arrows || [];
    for (let t of this.arrows)
      t.update();
  }
}
class T {
  constructor(t, e, s) {
    this.gantt = t, this.from_task = e, this.to_task = s, this.calculate_path(), this.draw();
  }
  calculate_path() {
    let t = this.from_task.$bar.getX() + this.from_task.$bar.getWidth() / 2;
    const e = () => this.to_task.$bar.getX() < t + this.gantt.options.padding && t > this.from_task.$bar.getX() + this.gantt.options.padding;
    for (; e(); )
      t -= 10;
    const s = this.gantt.options.header_height + this.gantt.options.bar_height + (this.gantt.options.padding + this.gantt.options.bar_height) * this.from_task.task._index + this.gantt.options.padding, n = this.to_task.$bar.getX() - this.gantt.options.padding / 2, i = this.gantt.options.header_height + this.gantt.options.bar_height / 2 + (this.gantt.options.padding + this.gantt.options.bar_height) * this.to_task.task._index + this.gantt.options.padding, a = this.from_task.task._index > this.to_task.task._index, h = this.gantt.options.arrow_curve, d = a ? 1 : 0, g = a ? -h : h, u = a ? i + this.gantt.options.arrow_curve : i - this.gantt.options.arrow_curve;
    if (this.path = `
            M ${t} ${s}
            V ${u}
            a ${h} ${h} 0 0 ${d} ${h} ${g}
            L ${n} ${i}
            m -5 -5
            l 5 5
            l -5 5`, this.to_task.$bar.getX() < this.from_task.$bar.getX() + this.gantt.options.padding) {
      const f = this.gantt.options.padding / 2 - h, c = this.to_task.$bar.getY() + this.to_task.$bar.getHeight() / 2 - g, w = this.to_task.$bar.getX() - this.gantt.options.padding;
      this.path = `
                M ${t} ${s}
                v ${f}
                a ${h} ${h} 0 0 1 -${h} ${h}
                H ${w}
                a ${h} ${h} 0 0 ${d} -${h} ${g}
                V ${c}
                a ${h} ${h} 0 0 ${d} ${h} ${g}
                L ${n} ${i}
                m -5 -5
                l 5 5
                l -5 5`;
    }
  }
  draw() {
    this.element = _("path", {
      d: this.path,
      "data-from": this.from_task.task.id,
      "data-to": this.to_task.task.id
    });
  }
  update() {
    this.calculate_path(), this.element.setAttribute("d", this.path);
  }
}
class L {
  constructor(t, e) {
    this.parent = t, this.custom_html = e, this.make();
  }
  make() {
    this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `, this.hide(), this.title = this.parent.querySelector(".title"), this.subtitle = this.parent.querySelector(".subtitle"), this.pointer = this.parent.querySelector(".pointer");
  }
  show(t) {
    if (!t.target_element)
      throw new Error("target_element is required to show popup");
    t.position || (t.position = "left");
    const e = t.target_element;
    if (this.custom_html) {
      let n = this.custom_html(t.task);
      n += '<div class="pointer"></div>', this.parent.innerHTML = n, this.pointer = this.parent.querySelector(".pointer");
    } else
      this.title.innerHTML = t.title, this.subtitle.innerHTML = t.subtitle, this.parent.style.width = this.parent.clientWidth + "px";
    let s;
    e instanceof HTMLElement ? s = e.getBoundingClientRect() : e instanceof SVGElement && (s = t.target_element.getBBox()), t.position === "left" && (this.parent.style.left = s.x + (s.width + 10) + "px", this.parent.style.top = s.y + "px", this.pointer.style.transform = "rotateZ(90deg)", this.pointer.style.left = "-7px", this.pointer.style.top = "2px"), this.parent.style.opacity = 1;
  }
  hide() {
    this.parent.style.opacity = 0, this.parent.style.left = 0;
  }
}
const l = {
  QUARTER_DAY: "Quarter Day",
  HALF_DAY: "Half Day",
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year"
};
class W {
  constructor(t, e, s) {
    this.setup_wrapper(t), this.setup_options(s), this.setup_tasks(e), this.change_view_mode(), this.bind_events();
  }
  setup_wrapper(t) {
    let e, s;
    if (typeof t == "string" && (t = document.querySelector(t)), t instanceof HTMLElement)
      s = t, e = t.querySelector("svg");
    else if (t instanceof SVGElement)
      e = t;
    else
      throw new TypeError(
        "Frapp\xE9 Gantt only supports usage of a string CSS selector, HTML DOM element or SVG DOM element for the 'element' parameter"
      );
    e ? (this.$svg = e, this.$svg.classList.add("gantt")) : this.$svg = _("svg", {
      append_to: s,
      class: "gantt"
    }), this.$container = document.createElement("div"), this.$container.classList.add("gantt-container"), this.$svg.parentElement.appendChild(this.$container), this.$container.appendChild(this.$svg), this.popup_wrapper = document.createElement("div"), this.popup_wrapper.classList.add("popup-wrapper"), this.$container.appendChild(this.popup_wrapper);
  }
  setup_options(t) {
    const e = {
      header_height: 50,
      column_width: 30,
      step: 24,
      view_modes: [...Object.values(l)],
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 18,
      view_mode: "Day",
      date_format: "YYYY-MM-DD",
      popup_trigger: "click",
      custom_popup_html: null,
      language: "en"
    };
    this.options = Object.assign({}, e, t);
  }
  setup_tasks(t) {
    this.tasks = t.map((e, s) => {
      if (e._start = o.parse(e.start), e._end = o.parse(e.end), o.diff(e._end, e._start, "year") > 10 && (e.end = null), e._index = s, !e.start && !e.end) {
        const i = o.today();
        e._start = i, e._end = o.add(i, 2, "day");
      }
      if (!e.start && e.end && (e._start = o.add(e._end, -2, "day")), e.start && !e.end && (e._end = o.add(e._start, 2, "day")), o.get_date_values(e._end).slice(3).every((i) => i === 0) && (e._end = o.add(e._end, 24, "hour")), (!e.start || !e.end) && (e.invalid = !0), typeof e.dependencies == "string" || !e.dependencies) {
        let i = [];
        e.dependencies && (i = e.dependencies.split(",").map((a) => a.trim()).filter((a) => a)), e.dependencies = i;
      }
      return e.id || (e.id = N(e)), e;
    }), this.setup_dependencies();
  }
  setup_dependencies() {
    this.dependency_map = {};
    for (let t of this.tasks)
      for (let e of t.dependencies)
        this.dependency_map[e] = this.dependency_map[e] || [], this.dependency_map[e].push(t.id);
  }
  refresh(t) {
    this.setup_tasks(t), this.change_view_mode();
  }
  change_view_mode(t = this.options.view_mode) {
    this.update_view_scale(t), this.setup_dates(), this.render(), this.trigger_event("view_change", [t]);
  }
  update_view_scale(t) {
    this.options.view_mode = t, t === l.DAY ? (this.options.step = 24, this.options.column_width = 38) : t === l.HALF_DAY ? (this.options.step = 24 / 2, this.options.column_width = 38) : t === l.QUARTER_DAY ? (this.options.step = 24 / 4, this.options.column_width = 38) : t === l.WEEK ? (this.options.step = 24 * 7, this.options.column_width = 140) : t === l.MONTH ? (this.options.step = 24 * 30, this.options.column_width = 120) : t === l.YEAR && (this.options.step = 24 * 365, this.options.column_width = 120);
  }
  setup_dates() {
    this.setup_gantt_dates(), this.setup_date_values();
  }
  setup_gantt_dates() {
    this.gantt_start = this.gantt_end = null;
    for (let t of this.tasks)
      (!this.gantt_start || t._start < this.gantt_start) && (this.gantt_start = t._start), (!this.gantt_end || t._end > this.gantt_end) && (this.gantt_end = t._end);
    this.gantt_start = o.start_of(this.gantt_start, "day"), this.gantt_end = o.start_of(this.gantt_end, "day"), this.view_is([l.QUARTER_DAY, l.HALF_DAY]) ? (this.gantt_start = o.add(this.gantt_start, -7, "day"), this.gantt_end = o.add(this.gantt_end, 7, "day")) : this.view_is(l.MONTH) ? (this.gantt_start = o.start_of(this.gantt_start, "year"), this.gantt_end = o.add(this.gantt_end, 1, "year")) : this.view_is(l.YEAR) ? (this.gantt_start = o.add(this.gantt_start, -2, "year"), this.gantt_end = o.add(this.gantt_end, 2, "year")) : (this.gantt_start = o.add(this.gantt_start, -1, "month"), this.gantt_end = o.add(this.gantt_end, 1, "month"));
  }
  setup_date_values() {
    this.dates = [];
    let t = null;
    for (; t === null || t < this.gantt_end; )
      t ? this.view_is(l.YEAR) ? t = o.add(t, 1, "year") : this.view_is(l.MONTH) ? t = o.add(t, 1, "month") : t = o.add(
        t,
        this.options.step,
        "hour"
      ) : t = o.clone(this.gantt_start), this.dates.push(t);
  }
  bind_events() {
    this.bind_grid_click(), this.bind_bar_events();
  }
  render() {
    this.clear(), this.setup_layers(), this.make_grid(), this.make_dates(), this.make_bars(), this.make_arrows(), this.map_arrows_on_bars(), this.set_width(), this.set_scroll_position();
  }
  setup_layers() {
    this.layers = {};
    const t = ["grid", "date", "arrow", "progress", "bar", "details"];
    for (let e of t)
      this.layers[e] = _("g", {
        class: e,
        append_to: this.$svg
      });
  }
  make_grid() {
    this.make_grid_background(), this.make_grid_rows(), this.make_grid_header(), this.make_grid_ticks(), this.make_grid_highlights();
  }
  make_grid_background() {
    const t = this.dates.length * this.options.column_width, e = this.options.header_height + this.options.padding + (this.options.bar_height + this.options.padding) * this.tasks.length;
    _("rect", {
      x: 0,
      y: 0,
      width: t,
      height: e,
      class: "grid-background",
      append_to: this.layers.grid
    }), p.attr(this.$svg, {
      height: e + this.options.padding + 100,
      width: "100%"
    });
  }
  make_grid_rows() {
    const t = _("g", { append_to: this.layers.grid }), e = _("g", { append_to: this.layers.grid }), s = this.dates.length * this.options.column_width, n = this.options.bar_height + this.options.padding;
    let i = this.options.header_height + this.options.padding / 2;
    for (let a of this.tasks)
      _("rect", {
        x: 0,
        y: i,
        width: s,
        height: n,
        class: "grid-row",
        append_to: t
      }), _("line", {
        x1: 0,
        y1: i + n,
        x2: s,
        y2: i + n,
        class: "row-line",
        append_to: e
      }), i += this.options.bar_height + this.options.padding;
  }
  make_grid_header() {
    const t = this.dates.length * this.options.column_width, e = this.options.header_height + 10;
    _("rect", {
      x: 0,
      y: 0,
      width: t,
      height: e,
      class: "grid-header",
      append_to: this.layers.grid
    });
  }
  make_grid_ticks() {
    let t = 0, e = this.options.header_height + this.options.padding / 2, s = (this.options.bar_height + this.options.padding) * this.tasks.length;
    for (let n of this.dates) {
      let i = "tick";
      this.view_is(l.DAY) && n.getDate() === 1 && (i += " thick"), this.view_is(l.WEEK) && n.getDate() >= 1 && n.getDate() < 8 && (i += " thick"), this.view_is(l.MONTH) && (n.getMonth() + 1) % 3 === 0 && (i += " thick"), _("path", {
        d: `M ${t} ${e} v ${s}`,
        class: i,
        append_to: this.layers.grid
      }), this.view_is(l.MONTH) ? t += o.get_days_in_month(n) * this.options.column_width / 30 : t += this.options.column_width;
    }
  }
  make_grid_highlights() {
    if (this.view_is(l.DAY)) {
      const t = o.diff(o.today(), this.gantt_start, "hour") / this.options.step * this.options.column_width, e = 0, s = this.options.column_width, n = (this.options.bar_height + this.options.padding) * this.tasks.length + this.options.header_height + this.options.padding / 2;
      _("rect", {
        x: t,
        y: e,
        width: s,
        height: n,
        class: "today-highlight",
        append_to: this.layers.grid
      });
    }
  }
  make_dates() {
    for (let t of this.get_dates_to_draw())
      if (_("text", {
        x: t.lower_x,
        y: t.lower_y,
        innerHTML: t.lower_text,
        class: "lower-text",
        append_to: this.layers.date
      }), t.upper_text) {
        const e = _("text", {
          x: t.upper_x,
          y: t.upper_y,
          innerHTML: t.upper_text,
          class: "upper-text",
          append_to: this.layers.date
        });
        e.getBBox().x2 > this.layers.grid.getBBox().width && e.remove();
      }
  }
  get_dates_to_draw() {
    let t = null;
    return this.dates.map((s, n) => {
      const i = this.get_date_info(s, t, n);
      return t = s, i;
    });
  }
  get_date_info(t, e, s) {
    e || (e = o.add(t, 1, "year"));
    const n = {
      "Quarter Day_lower": o.format(
        t,
        "HH",
        this.options.language
      ),
      "Half Day_lower": o.format(
        t,
        "HH",
        this.options.language
      ),
      Day_lower: t.getDate() !== e.getDate() ? o.format(t, "D", this.options.language) : "",
      Week_lower: t.getMonth() !== e.getMonth() ? o.format(t, "D MMM", this.options.language) : o.format(t, "D", this.options.language),
      Month_lower: o.format(t, "MMMM", this.options.language),
      Year_lower: o.format(t, "YYYY", this.options.language),
      "Quarter Day_upper": t.getDate() !== e.getDate() ? o.format(t, "D MMM", this.options.language) : "",
      "Half Day_upper": t.getDate() !== e.getDate() ? t.getMonth() !== e.getMonth() ? o.format(
        t,
        "D MMM",
        this.options.language
      ) : o.format(t, "D", this.options.language) : "",
      Day_upper: t.getMonth() !== e.getMonth() ? o.format(t, "MMMM", this.options.language) : "",
      Week_upper: t.getMonth() !== e.getMonth() ? o.format(t, "MMMM", this.options.language) : "",
      Month_upper: t.getFullYear() !== e.getFullYear() ? o.format(t, "YYYY", this.options.language) : "",
      Year_upper: t.getFullYear() !== e.getFullYear() ? o.format(t, "YYYY", this.options.language) : ""
    }, i = {
      x: s * this.options.column_width,
      lower_y: this.options.header_height,
      upper_y: this.options.header_height - 25
    }, a = {
      "Quarter Day_lower": this.options.column_width * 4 / 2,
      "Quarter Day_upper": 0,
      "Half Day_lower": this.options.column_width * 2 / 2,
      "Half Day_upper": 0,
      Day_lower: this.options.column_width / 2,
      Day_upper: this.options.column_width * 30 / 2,
      Week_lower: 0,
      Week_upper: this.options.column_width * 4 / 2,
      Month_lower: this.options.column_width / 2,
      Month_upper: this.options.column_width * 12 / 2,
      Year_lower: this.options.column_width / 2,
      Year_upper: this.options.column_width * 30 / 2
    };
    return {
      upper_text: n[`${this.options.view_mode}_upper`],
      lower_text: n[`${this.options.view_mode}_lower`],
      upper_x: i.x + a[`${this.options.view_mode}_upper`],
      upper_y: i.upper_y,
      lower_x: i.x + a[`${this.options.view_mode}_lower`],
      lower_y: i.lower_y
    };
  }
  make_bars() {
    this.bars = this.tasks.map((t) => {
      const e = new S(this, t);
      return this.layers.bar.appendChild(e.group), e;
    });
  }
  make_arrows() {
    this.arrows = [];
    for (let t of this.tasks) {
      let e = [];
      e = t.dependencies.map((s) => {
        const n = this.get_task(s);
        if (!n)
          return;
        const i = new T(
          this,
          this.bars[n._index],
          this.bars[t._index]
        );
        return this.layers.arrow.appendChild(i.element), i;
      }).filter(Boolean), this.arrows = this.arrows.concat(e);
    }
  }
  map_arrows_on_bars() {
    for (let t of this.bars)
      t.arrows = this.arrows.filter((e) => e.from_task.task.id === t.task.id || e.to_task.task.id === t.task.id);
  }
  set_width() {
    const t = this.$svg.getBoundingClientRect().width, e = this.$svg.querySelector(".grid .grid-row").getAttribute("width");
    t < e && this.$svg.setAttribute("width", e);
  }
  set_scroll_position() {
    const t = this.$svg.parentElement;
    if (!t)
      return;
    const s = o.diff(
      this.get_oldest_starting_date(),
      this.gantt_start,
      "hour"
    ) / this.options.step * this.options.column_width - this.options.column_width;
    t.scrollLeft = s;
  }
  bind_grid_click() {
    p.on(
      this.$svg,
      this.options.popup_trigger,
      ".grid-row, .grid-header",
      () => {
        this.unselect_all(), this.hide_popup();
      }
    );
  }
  bind_bar_events() {
    let t = !1, e = 0, s = 0, n = !1, i = !1, a = null, h = [];
    this.bar_being_dragged = null;
    function d() {
      return t || n || i;
    }
    p.on(this.$svg, "mousedown", ".bar-wrapper, .handle", (g, u) => {
      const f = p.closest(".bar-wrapper", u);
      u.classList.contains("left") ? n = !0 : u.classList.contains("right") ? i = !0 : u.classList.contains("bar-wrapper") && (t = !0), f.classList.add("active"), e = g.offsetX, s = g.offsetY, a = f.getAttribute("data-id"), h = [
        a,
        ...this.get_all_dependent_tasks(a)
      ].map((w) => this.get_bar(w)), this.bar_being_dragged = a, h.forEach((w) => {
        const m = w.$bar;
        m.ox = m.getX(), m.oy = m.getY(), m.owidth = m.getWidth(), m.finaldx = 0;
      });
    }), p.on(this.$svg, "mousemove", (g) => {
      if (!d())
        return;
      const u = g.offsetX - e;
      g.offsetY - s, h.forEach((f) => {
        const c = f.$bar;
        c.finaldx = this.get_snap_position(u), this.hide_popup(), n ? a === f.task.id ? f.update_bar_position({
          x: c.ox + c.finaldx,
          width: c.owidth - c.finaldx
        }) : f.update_bar_position({
          x: c.ox + c.finaldx
        }) : i ? a === f.task.id && f.update_bar_position({
          width: c.owidth + c.finaldx
        }) : t && f.update_bar_position({ x: c.ox + c.finaldx });
      });
    }), document.addEventListener("mouseup", (g) => {
      (t || n || i) && h.forEach((u) => u.group.classList.remove("active")), t = !1, n = !1, i = !1;
    }), p.on(this.$svg, "mouseup", (g) => {
      this.bar_being_dragged = null, h.forEach((u) => {
        !u.$bar.finaldx || (u.date_changed(), u.set_action_completed());
      });
    }), this.bind_bar_progress();
  }
  bind_bar_progress() {
    let t = 0, e = 0, s = null, n = null, i = null, a = null;
    p.on(this.$svg, "mousedown", ".handle.progress", (h, d) => {
      s = !0, t = h.offsetX, e = h.offsetY;
      const u = p.closest(".bar-wrapper", d).getAttribute("data-id");
      n = this.get_bar(u), i = n.$bar_progress, a = n.$bar, i.finaldx = 0, i.owidth = i.getWidth(), i.min_dx = -i.getWidth(), i.max_dx = a.getWidth() - i.getWidth();
    }), p.on(this.$svg, "mousemove", (h) => {
      if (!s)
        return;
      let d = h.offsetX - t;
      h.offsetY - e, d > i.max_dx && (d = i.max_dx), d < i.min_dx && (d = i.min_dx);
      const g = n.$handle_progress;
      p.attr(i, "width", i.owidth + d), p.attr(g, "points", n.get_progress_polygon_points()), i.finaldx = d;
    }), p.on(this.$svg, "mouseup", () => {
      s = !1, i && i.finaldx && (n.progress_changed(), n.set_action_completed());
    });
  }
  get_all_dependent_tasks(t) {
    let e = [], s = [t];
    for (; s.length; ) {
      const n = s.reduce((i, a) => (i = i.concat(this.dependency_map[a]), i), []);
      e = e.concat(n), s = n.filter((i) => !s.includes(i));
    }
    return e.filter(Boolean);
  }
  get_snap_position(t) {
    let e = t, s, n;
    return this.view_is(l.WEEK) ? (s = t % (this.options.column_width / 7), n = e - s + (s < this.options.column_width / 14 ? 0 : this.options.column_width / 7)) : this.view_is(l.MONTH) ? (s = t % (this.options.column_width / 30), n = e - s + (s < this.options.column_width / 60 ? 0 : this.options.column_width / 30)) : (s = t % this.options.column_width, n = e - s + (s < this.options.column_width / 2 ? 0 : this.options.column_width)), n;
  }
  unselect_all() {
    [...this.$svg.querySelectorAll(".bar-wrapper")].forEach((t) => {
      t.classList.remove("active");
    });
  }
  view_is(t) {
    return typeof t == "string" ? this.options.view_mode === t : Array.isArray(t) ? t.some((e) => this.options.view_mode === e) : !1;
  }
  get_task(t) {
    return this.tasks.find((e) => e.id === t);
  }
  get_bar(t) {
    return this.bars.find((e) => e.task.id === t);
  }
  show_popup(t) {
    this.popup || (this.popup = new L(
      this.popup_wrapper,
      this.options.custom_popup_html
    )), this.popup.show(t);
  }
  hide_popup() {
    this.popup && this.popup.hide();
  }
  trigger_event(t, e) {
    this.options["on_" + t] && this.options["on_" + t].apply(null, e);
  }
  get_oldest_starting_date() {
    return this.tasks.map((t) => t._start).reduce(
      (t, e) => e <= t ? e : t
    );
  }
  clear() {
    this.$svg.innerHTML = "";
  }
}
W.VIEW_MODE = l;
function N(r) {
  return r.name + "_" + Math.random().toString(36).slice(2, 12);
}
export {
  W as Gantt
};
