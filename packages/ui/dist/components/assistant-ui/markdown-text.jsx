"use client";
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
import "@assistant-ui/react-markdown/styles/dot.css";
import { MarkdownTextPrimitive, unstable_memoizeMarkdownComponents as memoizeMarkdownComponents, useIsMarkdownCodeBlock, } from "@assistant-ui/react-markdown";
import { CheckIcon, CopyIcon } from "lucide-react";
import { memo, useState } from "react";
import remarkGfm from "remark-gfm";
import { cn } from "../../utils/cn";
import { TooltipIconButton } from "./tooltip-icon-button";
var MarkdownTextImpl = function () {
    return (<MarkdownTextPrimitive remarkPlugins={[remarkGfm]} className="aui-md" components={defaultComponents}/>);
};
export var MarkdownText = memo(MarkdownTextImpl);
var CodeHeader = function (_a) {
    var language = _a.language, code = _a.code;
    var _b = useCopyToClipboard(), isCopied = _b.isCopied, copyToClipboard = _b.copyToClipboard;
    var onCopy = function () {
        if (!code || isCopied)
            return;
        copyToClipboard(code);
    };
    return (<div className="flex items-center justify-between gap-4 rounded-t-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
      <span className="lowercase [&>span]:text-xs">{language}</span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>);
};
var useCopyToClipboard = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.copiedDuration, copiedDuration = _c === void 0 ? 3000 : _c;
    var _d = useState(false), isCopied = _d[0], setIsCopied = _d[1];
    var copyToClipboard = function (value) {
        if (!value)
            return;
        navigator.clipboard.writeText(value).then(function () {
            setIsCopied(true);
            setTimeout(function () { return setIsCopied(false); }, copiedDuration);
        });
    };
    return { isCopied: isCopied, copyToClipboard: copyToClipboard };
};
var defaultComponents = memoizeMarkdownComponents({
    h1: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<h1 className={cn("mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight last:mb-0", className)} {...props}/>);
    },
    h2: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<h2 className={cn("mb-4 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 last:mb-0", className)} {...props}/>);
    },
    h3: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<h3 className={cn("mb-1 mt-1 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 last:mb-0", className)} {...props}/>);
    },
    h4: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<h4 className={cn("mb-1 mt-1 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0", className)} {...props}/>);
    },
    h5: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<h5 className={cn("my-4 text-lg font-semibold first:mt-0 last:mb-0", className)} {...props}/>);
    },
    h6: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<h6 className={cn("my-4 font-semibold first:mt-0 last:mb-0", className)} {...props}/>);
    },
    p: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<p className={cn("-mb-2 leading-5 first:mt-0 last:mb-0", className)} {...props}/>);
    },
    a: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<a className={cn("text-primary font-medium underline underline-offset-4", className)} {...props}/>);
    },
    blockquote: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<blockquote className={cn("border-l-2 pl-6 italic", className)} {...props}/>);
    },
    ul: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<ul className={cn("my-1 ml-6 list-disc ", className)} {...props}/>);
    },
    ol: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<ol className={cn("my-1 ml-6 list-decimal", className)} {...props}/>);
    },
    hr: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<hr className={cn("my-5 border-b", className)} {...props}/>);
    },
    table: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<table className={cn("my-5 w-full border-separate border-spacing-0 overflow-y-auto", className)} {...props}/>);
    },
    th: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<th className={cn("bg-muted px-4 py-2 text-left font-bold first:rounded-tl-lg last:rounded-tr-lg [&[align=center]]:text-center [&[align=right]]:text-right", className)} {...props}/>);
    },
    td: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<td className={cn("border-b border-l px-4 py-2 text-left last:border-r [&[align=center]]:text-center [&[align=right]]:text-right", className)} {...props}/>);
    },
    tr: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<tr className={cn("m-0 border-b p-0 first:border-t [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg", className)} {...props}/>);
    },
    sup: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<sup className={cn("[&>a]:text-xs [&>a]:no-underline", className)} {...props}/>);
    },
    pre: function (_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        return (<pre className={cn("overflow-x-auto rounded-b-lg bg-black p-4 text-white", className)} {...props}/>);
    },
    code: function Code(_a) {
        var className = _a.className, props = __rest(_a, ["className"]);
        var isCodeBlock = useIsMarkdownCodeBlock();
        return (<code className={cn(!isCodeBlock && "bg-muted rounded border font-semibold", className)} {...props}/>);
    },
    CodeHeader: CodeHeader,
});
//# sourceMappingURL=markdown-text.jsx.map