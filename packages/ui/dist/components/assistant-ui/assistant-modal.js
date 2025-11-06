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
import { BotIcon, ChevronDownIcon } from "lucide-react";
import { forwardRef } from "react";
import { AssistantModalPrimitive } from "@assistant-ui/react";
import { Thread } from "./thread";
import { TooltipIconButton } from "./tooltip-icon-button";
export var AssistantModal = function () {
    return (_jsxs(AssistantModalPrimitive.Root, { children: [_jsx(AssistantModalPrimitive.Anchor, { className: "fixed bottom-4 right-4 size-11", children: _jsx(AssistantModalPrimitive.Trigger, { asChild: true, children: _jsx(AssistantModalButton, {}) }) }), _jsx(AssistantModalPrimitive.Content, { sideOffset: 16, className: "bg-popover text-popover-foreground data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out data-[state=open]:zoom-in data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=closed]:slide-out-to-right-1/2 z-50 h-[500px] w-[400px] overflow-clip rounded-xl border p-0 shadow-md outline-none [&>.aui-thread-root]:bg-inherit", children: _jsx(Thread, {}) })] }));
};
var AssistantModalButton = forwardRef(function (_a, ref) {
    var state = _a["data-state"], rest = __rest(_a, ["data-state"]);
    var tooltip = state === "open" ? "Close Assistant" : "Open Assistant";
    return (_jsxs(TooltipIconButton, __assign({ variant: "default", tooltip: tooltip, side: "left" }, rest, { className: "size-full rounded-full shadow transition-transform hover:scale-110 active:scale-90", ref: ref, children: [_jsx(BotIcon, { "data-state": state, className: "absolute size-6 transition-all data-[state=closed]:rotate-0 data-[state=open]:rotate-90 data-[state=closed]:scale-100 data-[state=open]:scale-0" }), _jsx(ChevronDownIcon, { "data-state": state, className: "absolute size-6 transition-all data-[state=closed]:-rotate-90 data-[state=open]:rotate-0 data-[state=closed]:scale-0 data-[state=open]:scale-100" }), _jsx("span", { className: "sr-only", children: tooltip })] })));
});
AssistantModalButton.displayName = "AssistantModalButton";
//# sourceMappingURL=assistant-modal.js.map