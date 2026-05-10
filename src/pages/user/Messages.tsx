import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/common/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Messages() {
  const { user } = useAuth();
  const { messages, replyToMessage, markMessageRead } = useData();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  if (!user) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="Sign in to view messages"
        description="Login to send and receive messages from agents."
        actionLabel="Sign In"
        onAction={() => navigate("/login")}
      />
    );
  }

  const userMessages = messages.filter(
    (m) => m.fromId === user.id || m.toId === user.id
  );

  const selected = userMessages.find((m) => m.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const msg = userMessages.find((m) => m.id === id);
    if (msg && msg.status === "unread" && msg.toId === user.id) {
      markMessageRead(id);
    }
  };

  const handleReply = () => {
    if (!selected || !reply.trim()) return;
    replyToMessage(selected.id, user.id, user.name, reply.trim());
    setReply("");
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4 px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Your conversations with agents</p>
      </div>

      {userMessages.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Contact an agent from any property listing to start a conversation."
          actionLabel="Browse Properties"
          onAction={() => navigate("/search")}
        />
      ) : (
        <div className="flex gap-0 overflow-hidden rounded-xl border bg-background shadow-sm" style={{ height: "calc(100vh - 220px)" }}>
          {/* Thread list */}
          <div className={cn("w-full border-r md:w-72 shrink-0", selectedId && "hidden md:flex md:flex-col")}>
            <div className="border-b p-3">
              <p className="text-sm font-semibold">All Conversations</p>
            </div>
            <ScrollArea className="flex-1">
              {userMessages.map((m) => {
                const isUnread = m.status === "unread" && m.toId === user.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(m.id)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b p-3 text-left transition-colors hover:bg-muted/50",
                      m.id === selectedId && "bg-muted/70",
                      isUnread && "bg-primary/5"
                    )}
                  >
                    <Avatar className="size-8 shrink-0">
                      <AvatarImage src={m.fromId === user.id ? m.fromAvatar : undefined} />
                      <AvatarFallback>{m.toId === user.id ? m.fromName[0] : m.toName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={cn("text-sm truncate", isUnread ? "font-semibold" : "font-medium")}>
                          {m.toId === user.id ? m.fromName : m.toName}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">{formatTime(m.createdAt)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{m.subject}</p>
                      {isUnread && <div className="mt-1 size-2 rounded-full bg-primary" />}
                    </div>
                  </button>
                );
              })}
            </ScrollArea>
          </div>

          {/* Message thread */}
          <div className={cn("flex flex-1 flex-col", !selectedId && "hidden md:flex")}>
            {!selected ? (
              <div className="flex flex-1 items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="mx-auto mb-2 size-8 opacity-40" />
                  <p className="text-sm">Select a conversation</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b p-3">
                  <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={() => setSelectedId(null)}>
                    ←
                  </Button>
                  <div>
                    <p className="font-semibold text-sm">{selected.subject}</p>
                    <p className="text-xs text-muted-foreground">{selected.propertyTitle}</p>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selected.thread.map((t) => (
                      <div key={t.id} className={cn("flex gap-3", t.fromId === user.id ? "flex-row-reverse" : "")}>
                        <Avatar className="size-8 shrink-0">
                          <AvatarFallback>{t.fromName[0]}</AvatarFallback>
                        </Avatar>
                        <div className={cn("max-w-[70%] space-y-1", t.fromId === user.id ? "items-end" : "items-start", "flex flex-col")}>
                          <div className={cn("rounded-2xl px-3 py-2 text-sm", t.fromId === user.id ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm")}>
                            {t.content}
                          </div>
                          <span className="text-xs text-muted-foreground">{formatTime(t.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t p-3 flex gap-2">
                  <Textarea
                    placeholder="Type a reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="min-h-[60px] resize-none text-sm"
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleReply(); } }}
                  />
                  <Button onClick={handleReply} disabled={!reply.trim()} size="icon" className="self-end">
                    <Send className="size-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
