import React, { createContext, useContext, useState, useCallback } from "react";
import {
  MOCK_PROPERTIES,
  MOCK_VIEWINGS,
  MOCK_MESSAGES,
  MOCK_USERS,
  type Property,
  type Viewing,
  type Message,
  type User,
  type PropertyStatus,
  type ViewingStatus,
} from "@/data/mock";

interface DataContextType {
  properties: Property[];
  viewings: Viewing[];
  messages: Message[];
  users: User[];
  addProperty: (property: Omit<Property, "id" | "createdAt" | "updatedAt">) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  updatePropertyStatus: (id: string, status: PropertyStatus) => void;
  addViewing: (viewing: Omit<Viewing, "id" | "createdAt">) => void;
  updateViewingStatus: (id: string, status: ViewingStatus) => void;
  sendMessage: (message: Omit<Message, "id" | "createdAt" | "thread">) => void;
  replyToMessage: (messageId: string, fromId: string, fromName: string, content: string) => void;
  markMessageRead: (id: string) => void;
  updateUserStatus: (id: string, status: "active" | "suspended") => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [viewings, setViewings] = useState<Viewing[]>(MOCK_VIEWINGS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const addProperty = useCallback((property: Omit<Property, "id" | "createdAt" | "updatedAt">) => {
    const newProp: Property = {
      ...property,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProperties((prev) => [newProp, ...prev]);
  }, []);

  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().split("T")[0] } : p
      )
    );
  }, []);

  const deleteProperty = useCallback((id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updatePropertyStatus = useCallback((id: string, status: PropertyStatus) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status, updatedAt: new Date().toISOString().split("T")[0] } : p
      )
    );
  }, []);

  const addViewing = useCallback((viewing: Omit<Viewing, "id" | "createdAt">) => {
    const newViewing: Viewing = {
      ...viewing,
      id: `v${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setViewings((prev) => [newViewing, ...prev]);
  }, []);

  const updateViewingStatus = useCallback((id: string, status: ViewingStatus) => {
    setViewings((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  }, []);

  const sendMessage = useCallback((msg: Omit<Message, "id" | "createdAt" | "thread">) => {
    const newMsg: Message = {
      ...msg,
      id: `m${Date.now()}`,
      createdAt: new Date().toISOString(),
      thread: [
        {
          id: `t${Date.now()}`,
          fromId: msg.fromId,
          fromName: msg.fromName,
          content: msg.content,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    setMessages((prev) => [newMsg, ...prev]);
  }, []);

  const replyToMessage = useCallback(
    (messageId: string, fromId: string, fromName: string, content: string) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId
            ? {
                ...m,
                thread: [
                  ...m.thread,
                  {
                    id: `t${Date.now()}`,
                    fromId,
                    fromName,
                    content,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : m
        )
      );
    },
    []
  );

  const markMessageRead = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "read" as const } : m))
    );
  }, []);

  const updateUserStatus = useCallback((id: string, status: "active" | "suspended") => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  }, []);

  return (
    <DataContext.Provider
      value={{
        properties,
        viewings,
        messages,
        users,
        addProperty,
        updateProperty,
        deleteProperty,
        updatePropertyStatus,
        addViewing,
        updateViewingStatus,
        sendMessage,
        replyToMessage,
        markMessageRead,
        updateUserStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
