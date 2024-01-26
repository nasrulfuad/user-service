export function mapPagination<T>({
  page,
  limit,
  data,
}: {
  page: number;
  limit: number;
  data: T[];
}) {
  return {
    page,
    limit,
    data: data,
    total: data.length,
  };
}
