import Image from "next/image";
import Input from "./components/input";
import { useState } from "react";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" width={150} height={100} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Entrar</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                label="Nome de Usuário"
                onChange={(ev: any) => setName(ev.target.value)}
                value={name}
              />
              <Input
                id="email"
                label="E-mail"
                onChange={(ev: any) => setEmail(ev.target.value)}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Senha"
                onChange={(ev: any) => setPassword(ev.target.value)}
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Entrar
            </button>
            <p className="text-neutral-500 mt-12">
              Novo por aqui?
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Criar Conta
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
