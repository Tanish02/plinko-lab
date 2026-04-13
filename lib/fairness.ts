import { sha256 } from "./crypto";

// commitHex = SHA256(serverSeed:nonce)

export function createCommit(serverSeed: string, nonce: string) {
  return sha256(`${serverSeed}:${nonce}`);
}
// combinedSeed = SHA256(serverSeed:clientSeed:nonce)

export function createCombinedSeed(
  serverSeed: string,
  clientSeed: string,
  nonce: string,
) {
  return sha256(`${serverSeed}:${clientSeed}:${nonce}`);
}
