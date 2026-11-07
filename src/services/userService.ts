import { api } from "../api/client";
import { User } from "../types";

// BT9.4: PATCH /users/:id chỉ với { name, phone }, bỏ password khỏi kết quả
export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, data);
  const { password: _pw, ...user } = res.data;
  return user as User;
}
