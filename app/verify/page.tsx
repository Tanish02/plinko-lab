"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [serverSeed, setServerSeed] = useState("");
  const [clientSeed, setClientSeed] = useState("");
  const [nonce, setNonce] = useState("");
  const [dropColumn, setDropColumn] = useState(6);

  const [result, setResult] = useState<any>(null);

  const verify = async () => {
    const res = await fetch(
      `/api/verify?serverSeed=${serverSeed}&clientSeed=${clientSeed}&nonce=${nonce}&dropColumn=${dropColumn}`,
    );

    const data = await res.json();

    setResult(data);
  };

  return (
    <div className="p-10 flex flex-col gap-4 text-white">
      <h1 className="text-2xl">Verify Round</h1>

      <input
        placeholder="serverSeed"
        value={serverSeed}
        onChange={(e) => setServerSeed(e.target.value)}
        className="p-2 bg-gray-800"
      />

      <input
        placeholder="clientSeed"
        value={clientSeed}
        onChange={(e) => setClientSeed(e.target.value)}
        className="p-2 bg-gray-800"
      />

      <input
        placeholder="nonce"
        value={nonce}
        onChange={(e) => setNonce(e.target.value)}
        className="p-2 bg-gray-800"
      />

      <input
        type="number"
        value={dropColumn}
        onChange={(e) => setDropColumn(Number(e.target.value))}
        className="p-2 bg-gray-800"
      />

      <button onClick={verify} className="bg-green-500 px-4 py-2">
        Verify
      </button>

      {result && (
        <pre className="bg-black p-4">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
