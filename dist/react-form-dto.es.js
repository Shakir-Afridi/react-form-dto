import B, { useState as z, useImperativeHandle as ce } from "react";
import { FormControl as U, InputLabel as me, Select as de, MenuItem as pe, Typography as _, TextField as S, FormControlLabel as G, Checkbox as be, FormHelperText as J, Autocomplete as X, FormLabel as he, RadioGroup as fe, Radio as xe, Box as ve, Grid as Y } from "@mui/material";
var y = { exports: {} }, g = {};
var W;
function ge() {
  if (W) return g;
  W = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function o(a, n, s) {
    var c = null;
    if (s !== void 0 && (c = "" + s), n.key !== void 0 && (c = "" + n.key), "key" in n) {
      s = {};
      for (var p in n)
        p !== "key" && (s[p] = n[p]);
    } else s = n;
    return n = s.ref, {
      $$typeof: e,
      type: a,
      key: c,
      ref: n !== void 0 ? n : null,
      props: s
    };
  }
  return g.Fragment = t, g.jsx = o, g.jsxs = o, g;
}
var E = {};
var V;
function Ee() {
  return V || (V = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === le ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case k:
          return "Fragment";
        case K:
          return "Profiler";
        case Q:
          return "StrictMode";
        case ne:
          return "Suspense";
        case ae:
          return "SuspenseList";
        case se:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case Z:
            return "Portal";
          case re:
            return r.displayName || "Context";
          case ee:
            return (r._context.displayName || "Context") + ".Consumer";
          case te:
            var u = r.render;
            return r = r.displayName, r || (r = u.displayName || u.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case oe:
            return u = r.displayName || null, u !== null ? u : e(r.type) || "Memo";
          case A:
            u = r._payload, r = r._init;
            try {
              return e(r(u));
            } catch {
            }
        }
      return null;
    }
    function t(r) {
      return "" + r;
    }
    function o(r) {
      try {
        t(r);
        var u = !1;
      } catch {
        u = !0;
      }
      if (u) {
        u = console;
        var i = u.error, m = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return i.call(
          u,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          m
        ), t(r);
      }
    }
    function a(r) {
      if (r === k) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === A)
        return "<...>";
      try {
        var u = e(r);
        return u ? "<" + u + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var r = $.A;
      return r === null ? null : r.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function c(r) {
      if (C.call(r, "key")) {
        var u = Object.getOwnPropertyDescriptor(r, "key").get;
        if (u && u.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function p(r, u) {
      function i() {
        L || (L = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          u
        ));
      }
      i.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: i,
        configurable: !0
      });
    }
    function x() {
      var r = e(this.type);
      return N[r] || (N[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function v(r, u, i, m, T, O) {
      var d = i.ref;
      return r = {
        $$typeof: P,
        type: r,
        key: u,
        props: i,
        _owner: m
      }, (d !== void 0 ? d : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: x
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: T
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: O
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function b(r, u, i, m, T, O) {
      var d = u.children;
      if (d !== void 0)
        if (m)
          if (ue(d)) {
            for (m = 0; m < d.length; m++)
              j(d[m]);
            Object.freeze && Object.freeze(d);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else j(d);
      if (C.call(u, "key")) {
        d = e(r);
        var f = Object.keys(u).filter(function(ie) {
          return ie !== "key";
        });
        m = 0 < f.length ? "{key: someKey, " + f.join(": ..., ") + ": ...}" : "{key: someKey}", D[d + m] || (f = 0 < f.length ? "{" + f.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          m,
          d,
          f,
          d
        ), D[d + m] = !0);
      }
      if (d = null, i !== void 0 && (o(i), d = "" + i), c(u) && (o(u.key), d = "" + u.key), "key" in u) {
        i = {};
        for (var F in u)
          F !== "key" && (i[F] = u[F]);
      } else i = u;
      return d && p(
        i,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), v(
        r,
        d,
        i,
        n(),
        T,
        O
      );
    }
    function j(r) {
      h(r) ? r._store && (r._store.validated = 1) : typeof r == "object" && r !== null && r.$$typeof === A && (r._payload.status === "fulfilled" ? h(r._payload.value) && r._payload.value._store && (r._payload.value._store.validated = 1) : r._store && (r._store.validated = 1));
    }
    function h(r) {
      return typeof r == "object" && r !== null && r.$$typeof === P;
    }
    var R = B, P = Symbol.for("react.transitional.element"), Z = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), Q = Symbol.for("react.strict_mode"), K = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), re = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), oe = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), se = Symbol.for("react.activity"), le = Symbol.for("react.client.reference"), $ = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = Object.prototype.hasOwnProperty, ue = Array.isArray, w = console.createTask ? console.createTask : function() {
      return null;
    };
    R = {
      react_stack_bottom_frame: function(r) {
        return r();
      }
    };
    var L, N = {}, I = R.react_stack_bottom_frame.bind(
      R,
      s
    )(), q = w(a(s)), D = {};
    E.Fragment = k, E.jsx = function(r, u, i) {
      var m = 1e4 > $.recentlyCreatedOwnerStacks++;
      return b(
        r,
        u,
        i,
        !1,
        m ? Error("react-stack-top-frame") : I,
        m ? w(a(r)) : q
      );
    }, E.jsxs = function(r, u, i) {
      var m = 1e4 > $.recentlyCreatedOwnerStacks++;
      return b(
        r,
        u,
        i,
        !0,
        m ? Error("react-stack-top-frame") : I,
        m ? w(a(r)) : q
      );
    };
  })()), E;
}
var M;
function _e() {
  return M || (M = 1, process.env.NODE_ENV === "production" ? y.exports = ge() : y.exports = Ee()), y.exports;
}
var l = _e();
function je({
  field: e,
  value: t,
  onChange: o,
  error: a
}) {
  return /* @__PURE__ */ l.jsxs(U, { fullWidth: !0, children: [
    /* @__PURE__ */ l.jsx(me, { id: `${e.id}-label`, children: e.label }),
    /* @__PURE__ */ l.jsx(
      de,
      {
        labelId: `${e.id}-label`,
        value: t,
        id: e.id,
        name: e.id,
        onChange: (n) => o(n.target.value),
        label: e.label,
        error: !!a,
        children: e.options?.map((n) => /* @__PURE__ */ l.jsx(pe, { value: n, children: n }, n))
      }
    ),
    a && /* @__PURE__ */ l.jsx(_, { variant: "caption", color: "error", children: a })
  ] });
}
function Re({
  field: e,
  value: t,
  onChange: o,
  error: a
}) {
  return console.log("error", a), /* @__PURE__ */ l.jsx(
    S,
    {
      fullWidth: !0,
      label: e.label,
      placeholder: e.placeholder,
      value: t || "",
      name: e.id,
      onChange: (n) => o(n.target.value),
      required: e.required,
      disabled: e.disabled,
      type: e.type,
      slotProps: {
        inputLabel: {
          shrink: e.type === "date" ? !0 : void 0
        }
      },
      error: !!a,
      helperText: a
    }
  );
}
function Te({
  field: e,
  value: t,
  onChange: o,
  error: a
}) {
  return /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    /* @__PURE__ */ l.jsx(
      G,
      {
        name: e.id,
        control: /* @__PURE__ */ l.jsx(
          be,
          {
            checked: !!t,
            onChange: (n) => o(n.target.checked),
            disabled: e.disabled
          }
        ),
        label: e.label
      }
    ),
    a && /* @__PURE__ */ l.jsx(J, { children: a })
  ] });
}
const ye = ({
  field: e,
  value: t,
  onChange: o,
  error: a
}) => /* @__PURE__ */ l.jsx(
  X,
  {
    fullWidth: !0,
    options: e.options || [],
    value: t || null,
    onChange: (n, s) => o(s),
    renderInput: (n) => /* @__PURE__ */ l.jsx(
      S,
      {
        ...n,
        name: e.id,
        label: e.label,
        placeholder: e.placeholder,
        required: e.required,
        disabled: e.disabled,
        error: !!a,
        helperText: a
      }
    )
  }
), Se = ({
  field: e,
  value: t,
  onChange: o,
  error: a
}) => /* @__PURE__ */ l.jsx(
  X,
  {
    multiple: !0,
    fullWidth: !0,
    options: e.options || [],
    value: t || [],
    onChange: (n, s) => o(s),
    renderInput: (n) => /* @__PURE__ */ l.jsx(
      S,
      {
        ...n,
        name: e.id,
        label: e.label,
        placeholder: e.placeholder,
        required: e.required,
        disabled: e.disabled,
        error: !!a,
        helperText: a
      }
    )
  }
), ke = ({
  field: e,
  value: t,
  onChange: o,
  error: a
}) => /* @__PURE__ */ l.jsx(
  S,
  {
    fullWidth: !0,
    multiline: !0,
    rows: e.rows || 4,
    label: e.label,
    placeholder: e.placeholder,
    value: t || "",
    onChange: (n) => o(n.target.value),
    required: !!e.validations?.required,
    disabled: e.disabled,
    error: !!a,
    helperText: a
  }
), Ae = ({
  field: e,
  value: t,
  onChange: o,
  error: a
}) => /* @__PURE__ */ l.jsxs(U, { component: "fieldset", fullWidth: !0, error: !!a, children: [
  /* @__PURE__ */ l.jsxs(he, { component: "legend", children: [
    e.label,
    e.validations?.required ? " *" : ""
  ] }),
  /* @__PURE__ */ l.jsx(
    fe,
    {
      row: e.layout?.direction === "row" || !1,
      value: t || "",
      onChange: (n) => o(n.target.value),
      children: (e.options || []).map((n) => /* @__PURE__ */ l.jsx(
        G,
        {
          value: n,
          control: /* @__PURE__ */ l.jsx(xe, {}),
          label: n,
          disabled: e.disabled
        },
        n
      ))
    }
  ),
  a && /* @__PURE__ */ l.jsx(J, { children: a })
] }), $e = ({
  field: e,
  value: t,
  onChange: o,
  error: a
}) => {
  switch (e.type) {
    case "text":
    case "date":
    case "email":
    case "password":
    case "number":
      return /* @__PURE__ */ l.jsx(
        Re,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    case "select":
      return /* @__PURE__ */ l.jsx(
        je,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    case "autocomplete":
      return /* @__PURE__ */ l.jsx(
        ye,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    case "multi-autocomplete":
      return /* @__PURE__ */ l.jsx(
        Se,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    case "checkbox":
      return /* @__PURE__ */ l.jsx(
        Te,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    case "textarea":
      return /* @__PURE__ */ l.jsx(
        ke,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    case "radio":
      return /* @__PURE__ */ l.jsx(
        Ae,
        {
          field: e,
          value: t,
          onChange: o,
          error: a
        }
      );
    default:
      return /* @__PURE__ */ l.jsxs("span", { children: [
        "Unsupported field type: ",
        e.type
      ] });
  }
}, we = ({
  field: e,
  value: t,
  onChange: o,
  error: a,
  renderers: n = {}
}) => {
  const s = n[e.type] || $e;
  return /* @__PURE__ */ l.jsx(
    s,
    {
      field: e,
      value: t,
      onChange: o,
      error: a
    }
  );
};
function Oe(e) {
  const t = e ?? 12;
  return {
    xs: 12,
    // always full width on mobile
    sm: t,
    // use span for tablet
    md: t,
    // use span for desktop
    lg: t,
    // use span for large screens
    xl: t
  };
}
const Fe = ({
  section: e,
  values: t,
  onChange: o,
  renderers: a,
  validateField: n
}) => /* @__PURE__ */ l.jsxs(ve, { mb: 2, children: [
  e.heading && /* @__PURE__ */ l.jsx(
    _,
    {
      variant: "h6",
      sx: {
        fontSize: e.headingFontSize ? `${e.headingFontSize}rem` : "1.25rem"
      },
      gutterBottom: !0,
      color: "black",
      children: e.heading
    }
  ),
  e.description && /* @__PURE__ */ l.jsx(
    _,
    {
      variant: "body2",
      sx: {
        fontSize: e.descriptionFontSize ? `${e.descriptionFontSize}rem` : "inherit"
      },
      color: "textSecondary",
      gutterBottom: !0,
      children: e.description
    }
  ),
  /* @__PURE__ */ l.jsx(Y, { container: !0, spacing: 2, children: e.fields.map((s) => /* @__PURE__ */ l.jsx(
    Y,
    {
      size: Oe(s.layout?.col),
      children: /* @__PURE__ */ l.jsx(
        we,
        {
          field: s,
          value: t[s.id],
          onChange: (c) => o(s.id, c),
          renderers: a,
          error: n(s.id)?.join(",")
        }
      )
    },
    s.id
  )) })
] }), Ie = {
  /**
   * Validates that a required field has a value.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  required: (e, t) => e.required && (t == null || t === "") ? `${e.label} is required` : null,
  /**
   * Validates that a number field meets the minimum value requirement.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  min: (e, t) => e.type === "number" && e.min !== void 0 && t < e.min ? `${e.label} must be at least ${e.min}` : null,
  /**
   * Validates that a number field does not exceed the maximum value.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  max: (e, t) => e.type === "number" && e.max !== void 0 && t > e.max ? `${e.label} must be at most ${e.max}` : null,
  /**
   * Validates that a string field meets the minimum length requirement.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  minLength: (e, t) => typeof t == "string" && e.minLength !== void 0 && t.length < e.minLength ? `${e.label} must be at least ${e.minLength} characters` : null,
  /**
   * Validates that a string field does not exceed the maximum length.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  maxLength: (e, t) => typeof t == "string" && e.maxLength !== void 0 && t.length > e.maxLength ? `${e.label} must be at most ${e.maxLength} characters` : null,
  /**
   * Validates that a string field matches the specified regex pattern.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  pattern: (e, t) => e.pattern && typeof t == "string" && !e.pattern.test(t) ? `${e.label} is invalid` : null,
  /**
   * Validates that a select field value is one of the allowed options.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  options: (e, t) => e.type === "select" && e.options && !e.options.includes(t) ? `${e.label} must be one of: ${e.options.join(", ")}` : null,
  /**
   * Validates that a date field falls within the specified date range.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  dateRange: (e, t) => {
    if (e.type === "date" && t) {
      const o = new Date(t);
      if (e.minDate && o < new Date(e.minDate))
        return `${e.label} must be after ${e.minDate}`;
      if (e.maxDate && o > new Date(e.maxDate))
        return `${e.label} must be before ${e.maxDate}`;
    }
    return null;
  },
  /**
   * Executes a custom validation function if provided in the field definition.
   * @param field - The field definition
   * @param value - The field value to validate
   * @returns Error message if validation fails, null otherwise
   */
  customValidator: (e, t) => {
    if (e.customValidator && typeof e.customValidator == "function") {
      const o = e.customValidator(t);
      if (typeof o == "string")
        return o;
    }
    return null;
  }
}, Pe = (e, t) => {
  const o = {};
  return e.sections.forEach((a) => {
    a.fields.forEach((n) => {
      const s = H(e, t, n.id);
      s.length > 0 && (o[n.id] = s);
    });
  }), o;
}, H = (e, t, o) => {
  const a = e.sections.flatMap((p) => p.fields).find((p) => p.id === o);
  if (!a) return [];
  const n = a.validations || {}, s = t[o], c = [];
  if (n.required && (s == null || s === "") && c.push(
    typeof n.required == "string" ? n.required : `${a.label} is required`
  ), n.min !== void 0 && typeof s == "number" && s < n.min && c.push(`${a.label} must be at least ${n.min}`), n.max !== void 0 && typeof s == "number" && s > n.max && c.push(`${a.label} must be at most ${n.max}`), n.minLength !== void 0 && typeof s == "string" && s.length < n.minLength && c.push(
    `${a.label} must be at least ${n.minLength} characters`
  ), n.maxLength !== void 0 && typeof s == "string" && s.length > n.maxLength && c.push(
    `${a.label} must be at most ${n.maxLength} characters`
  ), n.pattern && typeof s == "string" && !n.pattern.test(s) && c.push(`${a.label} is invalid`), n.validate) {
    const p = n.validate(s);
    p && c.push(p);
  }
  return c;
};
function Ce(e) {
  const [t, o] = z({}), [a, n] = z({});
  return {
    /** Current form values for all fields */
    values: t,
    /** Function to update a field value */
    handleChange: (b, j) => {
      o((h) => ({ ...h, [b]: j })), n((h) => ({ ...h, [b]: null }));
    },
    /** Function to validate all fields */
    validateAll: () => Pe(e, t),
    /** Function to get all current form values */
    getValues: () => t,
    /** Function to get all current form errors */
    getErrors: () => a,
    /** Function to validate a specific field */
    validateField: (b) => H(e, t, b)
  };
}
const qe = B.forwardRef(({ dto: e, renderers: t }, o) => {
  const {
    values: a,
    handleChange: n,
    getValues: s,
    getErrors: c,
    validateAll: p,
    validateField: x
  } = Ce(e);
  return ce(o, () => ({
    getValues: s,
    getErrors: c,
    validateAll: p,
    validateField: x
  })), /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
    e.title && /* @__PURE__ */ l.jsx(
      _,
      {
        variant: "h5",
        color: "black",
        sx: {
          fontSize: e.titleFontSize ? `${e.titleFontSize}rem` : "1.5rem",
          fontWeight: "bold"
        },
        gutterBottom: !0,
        children: e.title
      }
    ),
    e.description && /* @__PURE__ */ l.jsx(
      _,
      {
        component: "p",
        sx: {
          fontSize: e.descriptionFontSize ? `${e.descriptionFontSize}rem` : "inherit"
        },
        color: "textSecondary",
        gutterBottom: !0,
        children: e.description
      }
    ),
    e.sections.map((v) => /* @__PURE__ */ l.jsx(
      Fe,
      {
        section: v,
        values: a,
        onChange: n,
        renderers: t,
        validateField: x
      },
      v.id
    ))
  ] });
});
export {
  ye as AutoCompleteField,
  Te as CheckBoxInput,
  we as Field,
  qe as FormBuilder,
  Se as MultiAutoCompleteField,
  Ae as RadioInput,
  Fe as Section,
  je as SelectInput,
  ke as TextAreaInput,
  Re as TextInput,
  Ce as useFormBuilder,
  Pe as validateAll,
  H as validateField,
  Ie as validationRules
};
