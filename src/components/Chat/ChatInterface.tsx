"use client";
import { useChat } from "@src/hooks/useChat";
import { cn } from "@src/lib/utils";
import {
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatIcon from "../header_components/ChatButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function ChatInterface() {
  const [otherUserId, setotherUserId] = useState<string>("12");
  const [myUserId, setmyUserId] = useState<string>("13");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [menuOpen, setmenuOpen] = useState<boolean>(false);

  const [chatEnabled, setChatEnabled] = useState(false);

  // ✅ Enable chat only when IDs set AND user clicks start

  const { messages, sendMessage, typing, sendTyping, markAsRead } = useChat(
    myUserId,
    otherUserId,
    chatEnabled
  );

  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ Auto-scroll when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    const handleRead = () => {
      const chatVisible = isChatOpen && document.visibilityState === "visible";

      if (!chatVisible) return;

      messages.forEach((msg) => {
        const isIncoming = msg.from !== myUserId;
        const notRead = msg.status !== "read";

        if (isIncoming && notRead) {
          markAsRead(msg.id);
        }
      });
    };

    handleRead();

    document.addEventListener("visibilitychange", handleRead);

    return () => {
      document.removeEventListener("visibilitychange", handleRead);
    };
  }, [messages, isChatOpen, myUserId, markAsRead]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Popover open={menuOpen} onOpenChange={(open) => setmenuOpen(open)}>
        <PopoverTrigger asChild>
          <button type="button">
            <ChatIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mx-5">
          <div className=" p-2 flex flex-col justify-between gap-3">
            <label htmlFor="myUserId">My User ID</label>
            <Input
              className="border border-sidebar"
              type="text"
              value={myUserId}
              onChange={(e) => setmyUserId(e.target.value)}
            />
            <label htmlFor="otherUserId">Other User ID</label>
            <Input
              className="border border-sidebar"
              type="text"
              value={otherUserId}
              onChange={(e) => setotherUserId(e.target.value)}
            />
            <Button
              onClick={() => {
                setChatEnabled(true);
                setmenuOpen(false);
                setIsChatOpen(true);
              }}>
              Start Chat
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Drawer open={isChatOpen} onOpenChange={setIsChatOpen} direction="right">
        <DrawerContent>
          <DrawerTitle className="hidden">Chat</DrawerTitle>

          {/* ✅ Chat UI */}
          <div className="flex flex-col h-screen max-w-4xl mx-auto border-x">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-background">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="font-semibold text-sm">John Doe</h2>
                  <p className="text-xs text-muted-foreground">
                    {typing ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Video />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone />
                </Button>
                <Button variant="ghost" size="icon">
                  <Search />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical />
                </Button>
              </div>
            </div>

            {/* ✅ Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-muted/20">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.from === myUserId ? "justify-end" : "justify-start"
                  )}>
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2 shadow-sm",
                      m.from === myUserId
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border"
                    )}>
                    <p className="text-sm break-words">{m.message}</p>

                    <div
                      className={cn(
                        "flex items-center justify-end gap-1 mt-1 text-xs",
                        m.from === myUserId
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}>
                      <span>{formatTime(m.timestamp)}</span>

                      {/* ✅ STATUS */}
                      {m.from === myUserId && (
                        <span>
                          {m.status === "sent" && "✓"}
                          {m.status === "delivered" && "✓✓"}
                          {m.status === "saved" && "✓✓"}
                          {m.status === "read" && (
                            <span className="text-blue-400">✓✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Input */}
            <div className="border-t bg-background px-4 py-3">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon">
                  <Smile />
                </Button>
                <Button variant="ghost" size="icon">
                  <Paperclip />
                </Button>

                <Input
                  value={text}
                  className="border border-sidebar"
                  onChange={(e) => {
                    setText(e.target.value);
                    sendTyping(true);
                    setTimeout(() => sendTyping(false), 800);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message"
                />

                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!text.trim()}>
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
