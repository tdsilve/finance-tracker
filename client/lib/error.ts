// @see https://github.com/nodejs/node/blob/d37b0d267f96e4564cad1426a3284bde8f1d1faa/lib/_http_server.js#L113C9-L113C9
const STATUS_CODES = {
  100: "Continue", // RFC 7231 6.2.1
  101: "Switching Protocols", // RFC 7231 6.2.2
  102: "Processing", // RFC 2518 10.1 (obsoleted by RFC 4918)
  103: "Early Hints", // RFC 8297 2
  200: "OK", // RFC 7231 6.3.1
  201: "Created", // RFC 7231 6.3.2
  202: "Accepted", // RFC 7231 6.3.3
  203: "Non-Authoritative Information", // RFC 7231 6.3.4
  204: "No Content", // RFC 7231 6.3.5
  205: "Reset Content", // RFC 7231 6.3.6
  206: "Partial Content", // RFC 7233 4.1
  207: "Multi-Status", // RFC 4918 11.1
  208: "Already Reported", // RFC 5842 7.1
  226: "IM Used", // RFC 3229 10.4.1
  300: "Multiple Choices", // RFC 7231 6.4.1
  301: "Moved Permanently", // RFC 7231 6.4.2
  302: "Found", // RFC 7231 6.4.3
  303: "See Other", // RFC 7231 6.4.4
  304: "Not Modified", // RFC 7232 4.1
  305: "Use Proxy", // RFC 7231 6.4.5
  307: "Temporary Redirect", // RFC 7231 6.4.7
  308: "Permanent Redirect", // RFC 7238 3
  400: "Bad Request", // RFC 7231 6.5.1
  401: "Unauthorized", // RFC 7235 3.1
  402: "Payment Required", // RFC 7231 6.5.2
  403: "Forbidden", // RFC 7231 6.5.3
  404: "Not Found", // RFC 7231 6.5.4
  405: "Method Not Allowed", // RFC 7231 6.5.5
  406: "Not Acceptable", // RFC 7231 6.5.6
  407: "Proxy Authentication Required", // RFC 7235 3.2
  408: "Request Timeout", // RFC 7231 6.5.7
  409: "Conflict", // RFC 7231 6.5.8
  410: "Gone", // RFC 7231 6.5.9
  411: "Length Required", // RFC 7231 6.5.10
  412: "Precondition Failed", // RFC 7232 4.2
  413: "Payload Too Large", // RFC 7231 6.5.11
  414: "URI Too Long", // RFC 7231 6.5.12
  415: "Unsupported Media Type", // RFC 7231 6.5.13
  416: "Range Not Satisfiable", // RFC 7233 4.4
  417: "Expectation Failed", // RFC 7231 6.5.14
  418: "I'm a Teapot", // RFC 7168 2.3.3
  421: "Misdirected Request", // RFC 7540 9.1.2
  422: "Unprocessable Entity", // RFC 4918 11.2
  423: "Locked", // RFC 4918 11.3
  424: "Failed Dependency", // RFC 4918 11.4
  425: "Too Early", // RFC 8470 5.2
  426: "Upgrade Required", // RFC 2817 and RFC 7231 6.5.15
  428: "Precondition Required", // RFC 6585 3
  429: "Too Many Requests", // RFC 6585 4
  431: "Request Header Fields Too Large", // RFC 6585 5
  451: "Unavailable For Legal Reasons", // RFC 7725 3
  500: "Internal Server Error", // RFC 7231 6.6.1
  501: "Not Implemented", // RFC 7231 6.6.2
  502: "Bad Gateway", // RFC 7231 6.6.3
  503: "Service Unavailable", // RFC 7231 6.6.4
  504: "Gateway Timeout", // RFC 7231 6.6.5
  505: "HTTP Version Not Supported", // RFC 7231 6.6.6
  506: "Variant Also Negotiates", // RFC 2295 8.1
  507: "Insufficient Storage", // RFC 4918 11.5
  508: "Loop Detected", // RFC 5842 7.2
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended", // RFC 2774 7
  511: "Network Authentication Required", // RFC 6585 6
};

// @see https://github.com/nodejs/llhttp/blob/main/src/llhttp/constants.ts#L210
export enum HTTPErrorCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
  RESPONSE_IS_STALE = 110, // Unofficial
  REVALIDATION_FAILED = 111, // Unofficial
  DISCONNECTED_OPERATION = 112, // Unofficial
  HEURISTIC_EXPIRATION = 113, // Unofficial
  MISCELLANEOUS_WARNING = 199, // Unofficial
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  TRANSFORMATION_APPLIED = 214, // Unofficial
  IM_USED = 226,
  MISCELLANEOUS_PERSISTENT_WARNING = 299, // Unofficial
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  SWITCH_PROXY = 306, // No longer used
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  PAGE_EXPIRED = 419, // Unofficial
  ENHANCE_YOUR_CALM = 420, // Unofficial
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_EARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE_UNOFFICIAL = 430, // Unofficial
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  LOGIN_TIMEOUT = 440, // Unofficial
  NO_RESPONSE = 444, // Unofficial
  RETRY_WITH = 449, // Unofficial
  BLOCKED_BY_PARENTAL_CONTROL = 450, // Unofficial
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  CLIENT_CLOSED_LOAD_BALANCED_REQUEST = 460, // Unofficial
  INVALID_X_FORWARDED_FOR = 463, // Unofficial
  REQUEST_HEADER_TOO_LARGE = 494, // Unofficial
  SSL_CERTIFICATE_ERROR = 495, // Unofficial
  SSL_CERTIFICATE_REQUIRED = 496, // Unofficial
  HTTP_REQUEST_SENT_TO_HTTPS_PORT = 497, // Unofficial
  INVALID_TOKEN = 498, // Unofficial
  CLIENT_CLOSED_REQUEST = 499, // Unofficial
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  BANDWIDTH_LIMIT_EXCEEDED = 509,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  WEB_SERVER_UNKNOWN_ERROR = 520, // Unofficial
  WEB_SERVER_IS_DOWN = 521, // Unofficial
  CONNECTION_TIMEOUT = 522, // Unofficial
  ORIGIN_IS_UNREACHABLE = 523, // Unofficial
  TIMEOUT_OCCURED = 524, // Unofficial
  SSL_HANDSHAKE_FAILED = 525, // Unofficial
  INVALID_SSL_CERTIFICATE = 526, // Unofficial
  RAILGUN_ERROR = 527, // Unofficial
  SITE_IS_OVERLOADED = 529, // Unofficial
  SITE_IS_FROZEN = 530, // Unofficial
  IDENTITY_PROVIDER_AUTHENTICATION_ERROR = 561, // Unofficial
  NETWORK_READ_TIMEOUT = 598, // Unofficial
  NETWORK_CONNECT_TIMEOUT = 599, // Unofficial
}

export class HTTPError extends Error {
  status: number;
  data: any;

  constructor(name: string, status: number, data: any, options?: ErrorOptions) {
    super(`${status} ${name}`, options);
    this.name = name;
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export const isHTTPError = (error: unknown): error is HTTPError => {
  return error instanceof HTTPError;
};

export const getMessageFromHTTPError = (error: HTTPError): string | null => {
  return error.data?.message ?? error.message ?? null;
};

export const toHTTPError = async (response: Response) => {
  let data;
  if (response.headers.get("content-type")?.includes("json") && response.body) {
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }
  } else if (response.body) {
    data = await response.text();
  }
  return new HTTPError(response.statusText, response.status, data);
};

export const mimicHTTPResponse = (status: number, body?: any) => {
  return toHTTPError(
    new Response(body, {
      status,
      statusText: status in STATUS_CODES ? (STATUS_CODES as any)[status] : "",
    }),
  );
};

export const isNonRetryableStatus = (status: HTTPErrorCode) => {
  const HTTP_STATUS_TO_NOT_RETRY = [
    HTTPErrorCode.BAD_REQUEST,
    HTTPErrorCode.UNAUTHORIZED,
    HTTPErrorCode.FORBIDDEN,
    HTTPErrorCode.NOT_FOUND,
  ];
  return HTTP_STATUS_TO_NOT_RETRY.includes(status);
};
