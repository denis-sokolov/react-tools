import { useEffect, useState } from "react";

export function useRerenderOnRouting() {
  const [, setPath] = useState(location.href);
  useEffect(() => {
    const f = () => setPath(location.href);
    window.addEventListener("popstate", f);
    return () => window.removeEventListener("popstate", f);
  }, []);
}
