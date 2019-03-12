export function request (method: string, url: string, params?: string | object, options?: object): Promise<any>;

export function get (url: string, params?: string | object, options?: object): Promise<any>;

export function post (url: string, params?: string | object, options?: object): Promise<any>;

export function json (url: string, params?: string | object, options?: object): Promise<any>;