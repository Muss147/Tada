"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Button } from "../button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
// Traductions par défaut
var defaultTranslations = {
    "missions.addSubDashboard.imageViewer.title": "Image Preview",
    "missions.addSubDashboard.imageViewer.reset": "Reset",
    "missions.addSubDashboard.imageViewer.doubleClickHint": "Double click to reset zoom"
};
export function ImageViewerModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, imageUrl = _a.imageUrl, _b = _a.alt, alt = _b === void 0 ? "Image" : _b;
    var t = function (key) { return defaultTranslations[key] || key; };
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
    return (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              {t("missions.addSubDashboard.imageViewer.title")}
            </DialogTitle>
            <div className="flex items-center gap-2 mr-10">
              <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                <ZoomOut className="h-4 w-4"/>
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 3}>
                <ZoomIn className="h-4 w-4"/>
              </Button>
              <Button variant="outline" size="sm" onClick={resetZoom}>
                {t("missions.addSubDashboard.imageViewer.reset")}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-4 pt-0">
          <div className="flex items-center justify-center min-h-[60vh]">
            <img src={imageUrl || "/placeholder.svg"} alt={alt} className="max-w-full max-h-full object-cover transition-transform duration-200 cursor-grab active:cursor-grabbing" style={{
            transform: "scale(".concat(zoom, ")"),
            transformOrigin: "center",
        }} onDoubleClick={resetZoom} draggable={false}/>
          </div>
        </div>

        <div className="p-4 pt-0 text-center">
          <p className="text-sm text-gray-500">
            {t("missions.addSubDashboard.imageViewer.doubleClickHint")}
          </p>
        </div>
      </DialogContent>
    </Dialog>);
}
//# sourceMappingURL=image-view-modal.jsx.map