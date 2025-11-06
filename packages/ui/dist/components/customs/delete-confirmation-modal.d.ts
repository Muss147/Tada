interface DeleteConfirmationProps {
    isOpen: boolean;
    onToggle: () => void;
    isDeletingInfo?: boolean;
    title: string;
    message: string;
    deletingText: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: (...params: any) => void;
}
export declare const DeleteConfirmation: ({ isOpen, onToggle, title, isDeletingInfo, deletingText, message, confirmLabel, cancelLabel, onConfirm, }: DeleteConfirmationProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=delete-confirmation-modal.d.ts.map