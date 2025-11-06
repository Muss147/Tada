import { type ComponentPropsWithoutRef } from "react";
import { Button } from "../button";
export type TooltipIconButtonProps = ComponentPropsWithoutRef<typeof Button> & {
    tooltip: string;
    side?: "top" | "bottom" | "left" | "right";
};
export declare const TooltipIconButton: import("react").ForwardRefExoticComponent<Omit<import("../button").ButtonProps & import("react").RefAttributes<HTMLButtonElement>, "ref"> & {
    tooltip: string;
    side?: "top" | "bottom" | "left" | "right";
} & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=tooltip-icon-button.d.ts.map