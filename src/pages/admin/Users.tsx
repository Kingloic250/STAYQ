import { useState } from "react";
import { Search, ShieldCheck, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { UserStatusBadge } from "@/components/common/StatusBadge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useData } from "@/context/DataContext";

const roleConfig: Record<string, { label: string; className: string }> = {
  admin: { label: "Admin", className: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20" },
  agent: { label: "Agent", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20" },
  user: { label: "User", className: "bg-muted text-muted-foreground border-border" },
};

export default function AdminUsers() {
  const { users, updateUserStatus } = useData();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<"suspended" | "active">("suspended");

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchR = !roleFilter || u.role === roleFilter;
    const matchS = !statusFilter || u.status === statusFilter;
    return matchQ && matchR && matchS;
  });

  const handleAction = (id: string, action: "suspended" | "active") => {
    setConfirmId(id);
    setConfirmAction(action);
  };

  const confirmUser = users.find((u) => u.id === confirmId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">{users.length} registered accounts</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <NativeSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-36">
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </NativeSelect>
        <NativeSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-36">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </NativeSelect>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>Saved</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => {
                const role = roleConfig[u.role] ?? roleConfig.user;
                return (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage src={u.avatar} />
                          <AvatarFallback>{u.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-sm">{u.name}</p>
                            {u.role === "admin" && <ShieldCheck className="size-3.5 text-rose-500" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={role.className}>{role.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge status={u.status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{u.createdAt}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.savedProperties.length}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {u.role !== "admin" && (
                          u.status === "active" ? (
                            <Button
                              size="xs"
                              variant="outline"
                              className="text-destructive gap-1"
                              onClick={() => handleAction(u.id, "suspended")}
                            >
                              <UserX className="size-3" />
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              size="xs"
                              variant="outline"
                              className="gap-1"
                              onClick={() => handleAction(u.id, "active")}
                            >
                              <UserCheck className="size-3" />
                              Activate
                            </Button>
                          )
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground text-sm">No users found</p>
          )}
        </div>
      </Card>

      <ConfirmDialog
        open={!!confirmId}
        onOpenChange={(o) => !o && setConfirmId(null)}
        title={confirmAction === "suspended" ? "Suspend User" : "Activate User"}
        description={
          confirmAction === "suspended"
            ? `This will prevent ${confirmUser?.name ?? "this user"} from accessing the platform.`
            : `This will restore access for ${confirmUser?.name ?? "this user"}.`
        }
        confirmLabel={confirmAction === "suspended" ? "Suspend" : "Activate"}
        variant={confirmAction === "suspended" ? "destructive" : "default"}
        onConfirm={() => {
          if (confirmId) {
            updateUserStatus(confirmId, confirmAction);
            setConfirmId(null);
          }
        }}
      />
    </div>
  );
}
