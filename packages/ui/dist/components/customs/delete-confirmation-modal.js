import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../dialog";
import { Button } from "../button";
export var DeleteConfirmation = function (_a) {
    var isOpen = _a.isOpen, onToggle = _a.onToggle, title = _a.title, _b = _a.isDeletingInfo, isDeletingInfo = _b === void 0 ? false : _b, deletingText = _a.deletingText, message = _a.message, confirmLabel = _a.confirmLabel, cancelLabel = _a.cancelLabel, onConfirm = _a.onConfirm;
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onToggle, children: _jsxs(DialogContent, { className: "", children: [_jsx(DialogTitle, { className: "text-xl", children: title }), _jsx("p", { className: "text-sm text-black", children: message }), _jsxs("div", { className: "flex w-full flex-row items-center justify-end gap-3 md:gap-5", children: [_jsx(DialogClose, { children: _jsx(Button, { className: "btn-padding px-5 lg:px-[2rem]", disabled: isDeletingInfo, children: cancelLabel }) }), _jsx(Button, { disabled: isDeletingInfo, type: "submit", variant: "outline", className: "btn-padding px-5 lg:px-[2rem]", onClick: onConfirm, children: isDeletingInfo ? deletingText : confirmLabel })] })] }) }));
};
//# sourceMappingURL=delete-confirmation-modal.js.map