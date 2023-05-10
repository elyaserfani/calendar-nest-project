export interface ResponseDto {
  success?: boolean;
  data?: unknown;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
}
