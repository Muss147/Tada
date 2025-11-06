import { Dialog, DialogClose, DialogContent, DialogTitle } from "../dialog";
import { Button } from "../button";
export var DeleteConfirmation = function (_a) {
    var isOpen = _a.isOpen, onToggle = _a.onToggle, title = _a.title, _b = _a.isDeletingInfo, isDeletingInfo = _b === void 0 ? false : _b, deletingText = _a.deletingText, message = _a.message, confirmLabel = _a.confirmLabel, cancelLabel = _a.cancelLabel, onConfirm = _a.onConfirm;
    return (<Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogContent className="">
        <DialogTitle className="text-xl">{title}</DialogTitle>
        <p className="text-sm text-black">{message}</p>
        <div className="flex w-full flex-row items-center justify-end gap-3 md:gap-5">
          <DialogClose>
            <Button className="btn-padding px-5 lg:px-[2rem]" disabled={isDeletingInfo}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button disabled={isDeletingInfo} type="submit" variant="outline" className="btn-padding px-5 lg:px-[2rem]" onClick={onConfirm}>
            {isDeletingInfo ? deletingText : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>);
};
//# sourceMappingURL=delete-confirmation-modal.jsx.map