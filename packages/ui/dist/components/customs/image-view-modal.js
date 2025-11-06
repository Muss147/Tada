"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Button } from "../button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@tada/app/src/locales/client";
export function ImageViewerModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, imageUrl = _a.imageUrl, _b = _a.alt, alt = _b === void 0 ? "Image" : _b;
    var t = useI18n();
    var _c = useState(1), zoom = _c[0], setZoom = _c[1];
    var handleZoomIn = function () {
        setZoom(function (prev) { return Math.min(prev + 0.25, 3); });
    };
    var handleZoomOut = function () {
        setZoom(function (prev) { return Math.max(prev - 0.25, 0.5); });
    };
    var handleDownload = function () {
        var link = document.createElement("a");
        link.href = imageUrl;
        link.download = alt || "image";
        link.rel = "noopener noreferrer";
        // Important pour Firefox & co.
        setTimeout(function () {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 0);
    };
    var resetZoom = function () {
        setZoom(1);
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-[95vw] max-h-[95vh] p-0 overflow-hidden", children: [_jsx(DialogHeader, { className: "p-4 pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(DialogTitle, { className: "text-lg font-semibold", children: t("missions.addSubDashboard.imageViewer.title") }), _jsxs("div", { className: "flex items-center gap-2 mr-10", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: handleZoomOut, disabled: zoom <= 0.5, children: _jsx(ZoomOut, { className: "h-4 w-4" }) }), _jsxs("span", { className: "text-sm font-medium min-w-[60px] text-center", children: [Math.round(zoom * 100), "%"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleZoomIn, disabled: zoom >= 3, children: _jsx(ZoomIn, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: resetZoom, children: t("missions.addSubDashboard.imageViewer.reset") })] })] }) }), _jsx("div", { className: "flex-1 overflow-auto p-4 pt-0", children: _jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: _jsx("img", { src: imageUrl || "/placeholder.svg", alt: alt, className: "max-w-full max-h-full object-cover transition-transform duration-200 cursor-grab active:cursor-grabbing", style: {
                                transform: "scale(".concat(zoom, ")"),
                                transformOrigin: "center",
                            }, onDoubleClick: resetZoom, draggable: false }) }) }), _jsx("div", { className: "p-4 pt-0 text-center", children: _jsx("p", { className: "text-sm text-gray-500", children: t("missions.addSubDashboard.imageViewer.doubleClickHint") }) })] }) }));
}
//# sourceMappingURL=image-view-modal.js.map