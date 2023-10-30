import { useMemo } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  const memoed = useMemo(() => new URLSearchParams(search), [search]);
  return { get: memoed.get.bind(memoed) };
}

export default useQuery;
