"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthTest() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Yükleniyor...</div>;
  }

  if (session) {
    return (
      <div>
        <p>Giriş yapıldı: {session.user?.email}</p>
        <button onClick={() => signOut()}>Çıkış Yap</button>
      </div>
    );
  }

  return (
    <div>
      <p>Giriş yapılmadı</p>
      <button onClick={() => signIn()}>Giriş Yap</button>
    </div>
  );
}
