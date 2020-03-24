import { navigate } from "./navigate";

function queryParam(name: string) {
  return queryParams().get(name) || "";
}

const queryParams = () => new URLSearchParams(location.search);

type QueryParamSetter = {
  (newValue: string): void;
  link: (newValue: string) => string;
};

export function useQueryParam(name: string): [string, QueryParamSetter] {
  const link = function (value: string) {
    const u = new URL(location.href);
    u.hash = "";
    u.searchParams.set(name, value);
    return u.href;
  };
  const setter: QueryParamSetter = (value: string) => navigate(link(value));
  setter.link = link;
  return [queryParam(name), setter];
}
