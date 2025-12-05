import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/entities/user";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const loginMutation = useLoginMutation();

  const handleSuccess = () => {
    onSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: handleSuccess,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Имя пользователя</Label>

        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loginMutation.isPending}
          placeholder="Введите имя пользователя"
          className="h-12"
          autoComplete="username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginMutation.isPending}
          placeholder="Введите пароль"
          className="h-12"
          autoComplete="current-password"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base cursor-pointer"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Загрузка...
          </>
        ) : (
          "Войти"
        )}
      </Button>

      {loginMutation.isError && (
        <p className="text-sm text-destructive text-center">
          {loginMutation.error?.message ?? "Ошибка входа"}
        </p>
      )}
    </form>
  );
};
