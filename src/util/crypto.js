import cryptoRandomString from 'crypto-random-string';

export function setKey(key) {
  localStorage.setItem("key", key);
}

export function getKey() {
  const key = localStorage.getItem("key");
  if (!key) {
    const newKey = cryptoRandomString({length: 256});
    setKey(newKey);
    return newKey;
  }
  return key;
}

export async function aesGcmEncrypt(plaintext) {
  const pwUtf8 = new TextEncoder().encode(getKey());
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: 'AES-GCM', iv: iv };
  const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']);
  const ptUint8 = new TextEncoder().encode(plaintext);
  const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);
  const ctArray = Array.from(new Uint8Array(ctBuffer));
  const ctStr = ctArray.map(byte => String.fromCharCode(byte)).join('');
  const ctBase64 = btoa(ctStr);
  const ivHex = Array.from(iv).map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return ivHex + ctBase64;
}

export async function aesGcmDecrypt(ciphertext) {
  const pwUtf8 = new TextEncoder().encode(getKey());
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
  const iv = ciphertext.slice(0,24).match(/.{2}/g).map(byte => parseInt(byte, 16));
  const alg = { name: 'AES-GCM', iv: new Uint8Array(iv) };
  const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']);
  const ctStr = atob(ciphertext.slice(24));
  const ctUint8 = new Uint8Array(ctStr.match(/[\s\S]/g).map(ch => ch.charCodeAt(0)));
  const plainBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);
  return new TextDecoder().decode(plainBuffer);
}
