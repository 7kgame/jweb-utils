export function toQueryString (params: object, sep1?: string, sep2?: string, encode?: boolean): string;

export function generateNoceStr(length?: number): string;

export function buildXML (obj: any, rootName?: string): string;

export function parseXML (xml): Promise<any>;

export function parseXML (xml: string): Promise<any>;

export function wxdecrypt (encryptedData, key: string, iv?: string): string;

export function hash (str: string, alg?: string): string;

export function md5 (str: string): string;

export function sha256 (str: string, key: string): string;

export function encryptRSA (key: string, hash: string): string;