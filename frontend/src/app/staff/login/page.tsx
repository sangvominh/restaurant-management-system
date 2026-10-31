"use client";
import { useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { brand } from "@/config/brand";
import { Button, Card, Field, Icon, Notice } from "@/components/staff/ui";
export default function Login() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await api("auth/login", "POST", {
        code: data.get("code"),
        password: data.get("password"),
      });
      window.location.assign("/staff");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không kết nối được máy chủ.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="login-page">
      <div className="login-wrap preview-login">
        <div className="text-center mb-8">
          <div className="login-mark">
            <Icon name="restaurant" />
          </div>
          <h1 className="login-brand mt-2">{brand.name}</h1>
        </div>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Đăng nhập</h2>
          <form onSubmit={login} className="space-y-5">
            <Field label="Mã số nhân viên">
              <input
                name="code"
                autoComplete="username"
                required
                maxLength={50}
                placeholder="Nhập mã nhân viên"
              />
            </Field>
            <Field label="Mật khẩu">
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  maxLength={128}
                  placeholder="Nhập mật khẩu"
                  className="pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-0 top-0 icon-button"
                  aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <Icon name={show ? "visibility_off" : "visibility"} />
                </button>
              </div>
            </Field>
            {error && <Notice error>{error}</Notice>}
            <Button className="w-full" disabled={busy}>
              <Icon name="login" />
              {busy ? "Đang xác thực…" : "Đăng nhập"}
            </Button>
          </form>
          <div className="divider my-6" />
          <div className="flex gap-3">
            <Button type="button" secondary className="flex-1" disabled><Icon name="fingerprint" /> Vân tay / Face ID</Button>
            <Button type="button" secondary className="flex-1" disabled><Icon name="qr_code_scanner" /> Quét thẻ</Button>
          </div>
          <p className="muted text-xs text-center">Đăng nhập nhanh chưa khả dụng.</p>
        </Card>
      </div>
    </main>
  );
}
