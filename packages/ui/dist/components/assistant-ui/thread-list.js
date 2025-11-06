import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThreadListItemPrimitive, ThreadListPrimitive, } from "@assistant-ui/react";
import { ArchiveIcon, PlusIcon } from "lucide-react";
import { Button } from "../button";
import { TooltipIconButton } from "./tooltip-icon-button";
export var ThreadList = function () {
    return (_jsxs(ThreadListPrimitive.Root, { className: "flex flex-col items-stretch gap-1.5", children: [_jsx(ThreadListNew, {}), _jsx(ThreadListItems, {})] }));
};
var ThreadListNew = function () {
    return (_jsx(ThreadListPrimitive.New, { asChild: true, children: _jsxs(Button, { className: "data-[active]:bg-muted hover:bg-muted flex items-center justify-start gap-1 rounded-lg px-2.5 py-2 text-start", variant: "ghost", children: [_jsx(PlusIcon, {}), "New Thread"] }) }));
};
var ThreadListItems = function () {
    return _jsx(ThreadListPrimitive.Items, { components: { ThreadListItem: ThreadListItem } });
};
var ThreadListItem = function () {
    return (_jsxs(ThreadListItemPrimitive.Root, { className: "data-[active]:bg-muted hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring flex items-center gap-2 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2", children: [_jsx(ThreadListItemPrimitive.Trigger, { className: "flex-grow px-3 py-2 text-start", children: _jsx(ThreadListItemTitle, {}) }), _jsx(ThreadListItemArchive, {})] }));
};
var ThreadListItemTitle = function () {
    return (_jsx("p", { className: "text-sm", children: _jsx(ThreadListItemPrimitive.Title, { fallback: "New Chat" }) }));
};
var ThreadListItemArchive = function () {
    return (_jsx(ThreadListItemPrimitive.Archive, { asChild: true, children: _jsx(TooltipIconButton, { className: "hover:text-primary text-foreground ml-auto mr-3 size-4 p-0", variant: "ghost", tooltip: "Archive thread", children: _jsx(ArchiveIcon, {}) }) }));
};
//# sourceMappingURL=thread-list.js.map