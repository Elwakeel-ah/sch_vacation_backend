export function response(status: boolean, messages: string[], data: any[]) {
  return {
    status,
    messages,
    data,
  };
}
