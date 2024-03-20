import crypto from 'crypto';

export interface ICryptoProvider {
  generateKey(): string;
  encrypt(data: string, key: string): string;
  decrypt(data: string, key: string): string;
}

export class CryptoProvider implements ICryptoProvider {
  private static readonly algorithm = 'aes-256-cbc';
  private static readonly algorithm128 = 'aes-128-cbc';
  private static readonly delimiter = ':';
  private static readonly encoding: BufferEncoding = 'base64';

  private static IV = Buffer.from([
    0x89, 0xd4, 0x9a, 0x3c, 0x22, 0xf4, 0x36, 0x72, 0x78, 0x90, 0x8a, 0xcf, 0xa7, 0xe4, 0x7f, 0x9a,
  ]);
  private static KEY = Buffer.from([
    0xfd, 0x4b, 0xa9, 0x33, 0x5a, 0x55, 0xc0, 0x7c, 0x5c, 0x82, 0xd4, 0x56, 0x12, 0x70, 0x8c, 0xa4,
  ]);

  generateKey(): string {
    return crypto.randomBytes(32).toString(CryptoProvider.encoding);
  }

  encrypt(data: string): string {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      CryptoProvider.algorithm,
      Buffer.from(secretKey!, CryptoProvider.encoding),
      iv,
    );

    const buffer = Buffer.from(data);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    const ivEncoded = iv.toString(CryptoProvider.encoding);
    const encryptedEncoded = encrypted.toString(CryptoProvider.encoding);

    return `${ivEncoded}${CryptoProvider.delimiter}${encryptedEncoded}`;
  }

  decrypt(data: string): string {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const [ivEncoded, encryptedEncoded] = data.split(CryptoProvider.delimiter);

    if (!ivEncoded || !encryptedEncoded) throw new Error('Invalid data format');

    const iv = Buffer.from(ivEncoded, CryptoProvider.encoding);
    const decipher = crypto.createDecipheriv(
      CryptoProvider.algorithm,
      Buffer.from(secretKey!, CryptoProvider.encoding),
      iv,
    );

    const buffer = Buffer.from(encryptedEncoded, CryptoProvider.encoding);
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);

    return decrypted.toString();
  }
}
