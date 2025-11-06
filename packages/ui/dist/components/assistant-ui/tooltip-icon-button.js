"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cn } from "../../utils";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../tooltip";
export var TooltipIconButton = forwardRef(function (_a, ref) {
    var children = _a.children, tooltip = _a.tooltip, _b = _a.side, side = _b === void 0 ? "bottom" : _b, className = _a.className, rest = __rest(_a, ["children", "tooltip", "side", "className"]);
    return (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, __assign({ variant: "ghost", size: "icon" }, rest, { className: cn("size-6 p-1", className), ref: ref, children: [children, _jsx("span", { className: "sr-only", children: tooltip })] })) }), _jsx(TooltipContent, { side: side, children: tooltip })] }) }));
});
TooltipIconButton.displayName = "TooltipIconButton";
//# sourceMappingURL=tooltip-icon-button.js.map