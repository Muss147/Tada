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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ActionBarPrimitive, BranchPickerPrimitive, ComposerPrimitive, MessagePrimitive, ThreadPrimitive, } from "@assistant-ui/react";
import { ArrowDownIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, PencilIcon, RefreshCwIcon, SendHorizontalIcon, } from "lucide-react";
import { cn } from "../../utils";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import { MarkdownText } from "./markdown-text";
import { TooltipIconButton } from "./tooltip-icon-button";
export var Thread = function () {
    var _a;
    return (_jsx(ThreadPrimitive.Root, { className: "bg-background box-border flex h-full flex-col overflow-hidden", style: (_a = {},
            _a["--thread-max-width"] = "42rem",
            _a), children: _jsxs(ThreadPrimitive.Viewport, { className: "flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8", children: [_jsx(ThreadWelcome, {}), _jsx(ThreadPrimitive.Messages, { components: {
                        UserMessage: UserMessage,
                        EditComposer: EditComposer,
                        AssistantMessage: AssistantMessage,
                    } }), _jsx(ThreadPrimitive.If, { empty: false, children: _jsx("div", { className: "min-h-8 flex-grow" }) }), _jsxs("div", { className: "sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-4", children: [_jsx(ThreadScrollToBottom, {}), _jsx(Composer, {})] })] }) }));
};
var ThreadScrollToBottom = function () {
    return (_jsx(ThreadPrimitive.ScrollToBottom, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Scroll to bottom", variant: "outline", className: "absolute -top-8 rounded-full disabled:invisible", children: _jsx(ArrowDownIcon, {}) }) }));
};
var ThreadWelcome = function () {
    return (_jsx(ThreadPrimitive.Empty, { children: _jsx("div", { className: "flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col", children: _jsx("div", { className: "flex w-full flex-grow flex-col items-center justify-center" }) }) }));
};
var ThreadWelcomeSuggestions = function () {
    return (_jsxs("div", { className: "mt-3 flex w-full items-stretch justify-center gap-4", children: [_jsx(ThreadPrimitive.Suggestion, { className: "hover:bg-muted/80 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border p-3 transition-colors ease-in", prompt: "What is the weather in Tokyo?", method: "replace", autoSend: true, children: _jsx("span", { className: "line-clamp-2 text-ellipsis text-sm font-semibold", children: "What is the weather in Tokyo?" }) }), _jsx(ThreadPrimitive.Suggestion, { className: "hover:bg-muted/80 flex max-w-sm grow basis-0 flex-col items-center justify-center rounded-lg border p-3 transition-colors ease-in", prompt: "What is assistant-ui?", method: "replace", autoSend: true, children: _jsx("span", { className: "line-clamp-2 text-ellipsis text-sm font-semibold", children: "What is assistant-ui?" }) })] }));
};
var Composer = function () {
    return (_jsxs(ComposerPrimitive.Root, { className: "focus-within:border-ring/20 flex w-full flex-wrap items-end rounded-lg border bg-inherit px-2.5 shadow-sm transition-colors ease-in", children: [_jsx(ComposerPrimitive.Input, { rows: 1, autoFocus: true, placeholder: "", className: "placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed" }), _jsx(ComposerAction, {})] }));
};
var ComposerAction = function () {
    return (_jsxs(_Fragment, { children: [_jsx(ThreadPrimitive.If, { running: false, children: _jsx(ComposerPrimitive.Send, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Send", variant: "default", className: "my-2.5 size-8 p-2 transition-opacity ease-in", children: _jsx(SendHorizontalIcon, {}) }) }) }), _jsx(ThreadPrimitive.If, { running: true, children: _jsx(ComposerPrimitive.Cancel, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Cancel", variant: "default", className: "my-2.5 size-8 p-2 transition-opacity ease-in", children: _jsx(CircleStopIcon, {}) }) }) })] }));
};
var UserMessage = function () {
    return (_jsxs(MessagePrimitive.Root, { className: "grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full max-w-[var(--thread-max-width)] py-4", children: [_jsx(UserActionBar, {}), _jsx("div", { className: "bg-muted text-foreground max-w-[calc(var(--thread-max-width)*0.8)] break-words rounded-3xl px-5 py-2.5 col-start-2 row-start-2", children: _jsx(MessagePrimitive.Content, {}) }), _jsx(BranchPicker, { className: "col-span-full col-start-1 row-start-3 -mr-1 justify-end" })] }));
};
var UserActionBar = function () {
    return (_jsx(ActionBarPrimitive.Root, { hideWhenRunning: true, autohide: "not-last", className: "flex flex-col items-end col-start-1 row-start-2 mr-3 mt-2.5", children: _jsx(ActionBarPrimitive.Edit, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Edit", children: _jsx(PencilIcon, {}) }) }) }));
};
var EditComposer = function () {
    return (_jsxs(ComposerPrimitive.Root, { className: "bg-muted my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl", children: [_jsx(ComposerPrimitive.Input, { className: "text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none" }), _jsxs("div", { className: "mx-3 mb-3 flex items-center justify-center gap-2 self-end", children: [_jsx(ComposerPrimitive.Cancel, { asChild: true, children: _jsx(Button, { variant: "ghost", children: "Cancel" }) }), _jsx(ComposerPrimitive.Send, { asChild: true, children: _jsx(Button, { children: "Send" }) })] })] }));
};
var AssistantMessage = function () {
    return (_jsxs(MessagePrimitive.Root, { className: "grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] relative w-full max-w-[var(--thread-max-width)] py-4", children: [_jsx(Avatar, { className: "flex size-8 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/15 shadow ", children: _jsx(AvatarImage, { src: "/logo-icon.png", alt: "logo", className: "max-w-6 h-full" }) }), _jsx("div", { className: "text-foreground max-w-[calc(var(--thread-max-width)*0.8)] break-words leading-4 col-span-2 col-start-2 row-start-1 my-1.5", children: _jsx(MessagePrimitive.Content, { components: { Text: MarkdownText } }) }), _jsx(AssistantActionBar, {}), _jsx(BranchPicker, { className: "col-start-2 row-start-2 -ml-2 mr-2" })] }));
};
var AssistantActionBar = function () {
    return (_jsxs(ActionBarPrimitive.Root, { hideWhenRunning: true, autohide: "not-last", autohideFloat: "single-branch", className: "text-muted-foreground flex gap-1 col-start-3 row-start-2 -ml-1 data-[floating]:bg-background data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm", children: [_jsx(ActionBarPrimitive.Copy, { asChild: true, children: _jsxs(TooltipIconButton, { tooltip: "Copy", children: [_jsx(MessagePrimitive.If, { copied: true, children: _jsx(CheckIcon, {}) }), _jsx(MessagePrimitive.If, { copied: false, children: _jsx(CopyIcon, {}) })] }) }), _jsx(ActionBarPrimitive.Reload, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Refresh", children: _jsx(RefreshCwIcon, {}) }) })] }));
};
var BranchPicker = function (_a) {
    var className = _a.className, rest = __rest(_a, ["className"]);
    return (_jsxs(BranchPickerPrimitive.Root, __assign({ hideWhenSingleBranch: true, className: cn("text-muted-foreground inline-flex items-center text-xs", className) }, rest, { children: [_jsx(BranchPickerPrimitive.Previous, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Previous", children: _jsx(ChevronLeftIcon, {}) }) }), _jsxs("span", { className: "font-medium", children: [_jsx(BranchPickerPrimitive.Number, {}), " / ", _jsx(BranchPickerPrimitive.Count, {})] }), _jsx(BranchPickerPrimitive.Next, { asChild: true, children: _jsx(TooltipIconButton, { tooltip: "Next", children: _jsx(ChevronRightIcon, {}) }) })] })));
};
var CircleStopIcon = function () {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", fill: "currentColor", width: "16", height: "16", children: _jsx("rect", { width: "10", height: "10", x: "3", y: "3", rx: "2" }) }));
};
//# sourceMappingURL=thread.js.map