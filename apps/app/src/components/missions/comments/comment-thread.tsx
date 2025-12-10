// src/components/missions/comments/comment-thread.tsx
"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "@tada/ui/components/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@tada/ui/components/avatar";
import { Textarea } from "@tada/ui/components/textarea";
import {
  CommentLite,
  WorkspaceMember,
} from "@/components/comments/comments-types";

type CommentThreadProps = {
  comment: CommentLite;
  currentUserId: string;
  isReplying: boolean;
  replyContent: string;
  onOpenReply: () => void;
  onChangeReply: (v: string) => void;
  onSubmitReply: () => void;
  statusLabel: (s: string) => string;
  showMentionList: boolean;
  mentionCandidates: WorkspaceMember[];
  onSelectMention: (m: WorkspaceMember) => void;
  onUpdateComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
};

export function CommentThread({
  comment,
  currentUserId,
  isReplying,
  replyContent,
  onOpenReply,
  onChangeReply,
  onSubmitReply,
  statusLabel,
  showMentionList,
  mentionCandidates,
  onSelectMention,
  onUpdateComment,
  onDeleteComment,
}: CommentThreadProps) {
  const createdAt = new Date(comment.createdAt);

  const initials =
    comment.createdBy?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  const isOwner = comment.createdBy?.id === currentUserId;

  const [isEditingRoot, setIsEditingRoot] = useState(false);
  const [editRootContent, setEditRootContent] = useState(comment.content);

  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/60 px-3 py-2">
      <div className="flex gap-2">
        <Avatar className="h-7 w-7">
          {comment.createdBy?.image && (
            <AvatarImage
              src={comment.createdBy.image}
              alt={comment.createdBy.name}
            />
          )}
          <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-900">
                {comment.createdBy?.name}
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {createdAt.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {comment.status === "resolved" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  {/* icône de résolution déjà importée dans le drawer, pas besoin ici */}
                  {statusLabel(comment.status)}
                </span>
              )}
              {comment.questionKey && (
                <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                  Q: {comment.questionKey}
                </span>
              )}
            </div>
          </div>

          {/* Contenu root : mode normal ou édition */}
          {!isEditingRoot ? (
            <p className="text-xs text-slate-800 whitespace-pre-line">
              {comment.content}
            </p>
          ) : (
            <div className="space-y-1">
              <Textarea
                className="min-h-[60px] text-xs"
                value={editRootContent}
                onChange={(e) => setEditRootContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="xs"
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setIsEditingRoot(false);
                    setEditRootContent(comment.content);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  size="xs"
                  type="button"
                  disabled={!editRootContent.trim()}
                  onClick={() => {
                    onUpdateComment(comment.id, editRootContent);
                    setIsEditingRoot(false);
                  }}
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              className="text-[11px] text-blue-600 hover:underline"
              onClick={onOpenReply}
            >
              Répondre
            </button>

            {isOwner && !isEditingRoot && (
              <>
                <button
                  type="button"
                  className="text-[11px] text-slate-500 hover:underline"
                  onClick={() => {
                    setIsEditingRoot(true);
                    setEditRootContent(comment.content);
                  }}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="text-[11px] text-red-500 hover:underline"
                  onClick={() => onDeleteComment(comment.id)}
                >
                  Supprimer
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Réponses */}
      {(comment.replies?.length ?? 0) > 0 && (
        <div className="mt-2 space-y-2 border-l border-slate-200 pl-4 ml-3">
          {(comment.replies ?? []).map((reply) => {
            const replyDate = new Date(reply.createdAt);
            const replyInitials =
              reply.createdBy?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() ?? "?";

            const isReplyOwner = reply.createdBy?.id === currentUserId;
            const isEditingThisReply = editingReplyId === reply.id;

            return (
              <div key={reply.id} className="flex gap-2">
                <Avatar className="h-6 w-6">
                  {reply.createdBy?.image && (
                    <AvatarImage
                      src={reply.createdBy.image}
                      alt={reply.createdBy.name}
                    />
                  )}
                  <AvatarFallback className="text-[9px]">
                    {replyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-900">
                      {reply.createdBy?.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {replyDate.toLocaleString()}
                    </span>
                  </div>

                  {!isEditingThisReply ? (
                    <p className="text-[11px] text-slate-800 whitespace-pre-line">
                      {reply.content}
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <Textarea
                        className="min-h-[40px] text-xs"
                        value={editReplyContent}
                        onChange={(e) => setEditReplyContent(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="xs"
                          variant="ghost"
                          type="button"
                          onClick={() => {
                            setEditingReplyId(null);
                            setEditReplyContent("");
                          }}
                        >
                          Annuler
                        </Button>
                        <Button
                          size="xs"
                          type="button"
                          disabled={!editReplyContent.trim()}
                          onClick={() => {
                            onUpdateComment(reply.id, editReplyContent);
                            setEditingReplyId(null);
                            setEditReplyContent("");
                          }}
                        >
                          Enregistrer
                        </Button>
                      </div>
                    </div>
                  )}

                  {isReplyOwner && !isEditingThisReply && (
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        className="text-[11px] text-slate-500 hover:underline"
                        onClick={() => {
                          setEditingReplyId(reply.id);
                          setEditReplyContent(reply.content);
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="text-[11px] text-red-500 hover:underline"
                        onClick={() => onDeleteComment(reply.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isReplying && (
        <div className="mt-2 ml-9 space-y-1 relative">
          <Textarea
            className="min-h-[50px] text-xs"
            value={replyContent}
            onChange={(e) => onChangeReply(e.target.value)}
            placeholder="Répondre à ce commentaire..."
          />

          {showMentionList && mentionCandidates.length > 0 && (
            <MentionDropdown
              members={mentionCandidates}
              onSelect={onSelectMention}
            />
          )}

          <div className="flex justify-end gap-2 mt-1">
            <Button
              size="xs"
              variant="ghost"
              type="button"
              onClick={() => onChangeReply("")}
            >
              Annuler
            </Button>
            <Button
              size="xs"
              type="button"
              disabled={!replyContent.trim()}
              onClick={onSubmitReply}
            >
              Envoyer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function MentionDropdown({
  members,
  onSelect,
}: {
  members: WorkspaceMember[];
  onSelect: (m: WorkspaceMember) => void;
}) {
  return (
    <div className="absolute bottom-[72px] left-0 z-50 w-full max-h-48 overflow-y-auto rounded-md border bg-white shadow-lg">
      {members.map((m) => {
        const initials = m.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <button
            key={m.id}
            type="button"
            className="flex w-full items-center gap-2 px-2 py-1 text-left text-xs hover:bg-slate-50"
            onClick={() => onSelect(m)}
          >
            <Avatar className="h-6 w-6">
              {m.image && <AvatarImage src={m.image} alt={m.name} />}
              <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{m.name}</span>
              <span className="text-[10px] text-slate-500">{m.email}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
