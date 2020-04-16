# Routing

The browser API for routing is reasonable already, we only need the tiniest of help from the library. In particular, you can use `location.pathname` to conditionally display content and `<a>` to create links. Here’s the simplest example:

```jsx
import { initRouting, useRerenderOnRouting } from "@theorem/react";
initRouting();
function App() {
  useRerenderOnRouting();
  const path = location.pathname;
  if (path === "/") return <Home />;
  if (path === "/about") return <About />;
  return <NotFound />;
}
function Home() {
  return (
    <div>
      <a href="/about">About</a>
    </div>
  );
}
```

In the above we call `initRouting` once to globally handle clicks on links and convert them into `pushState` events in the browser. We then call `useRerenderOnRouting` to register rerendering of the app when the url changes. This is all we need from the library.

If you have another router in place already, but you’d like to provide user-friendly link behavior, use `handleLinkClicks`:

```ts
import { handleLinkClicks } from "@theorem/react";
function App() {
  useEffect(() =>
    handleLinkClicks(function (url) {
      console.log("Navigate to", url.pathname);
    })
  );
}
```

## Path

In addition to `location.pathname`, `<a>`, there are other tools to work with the path.

To perform an imperative navigation, say, in response of the user submitting a form, import `navigate`, a small wrapper around the browser’s `history.pushState`:

```jsx
import { navigate } from "@theorem/react";
<form
  onSubmit={() => {
    sendData();
    navigate("/");
  }}
/>;
```

To perform a declarative navigation in response to some state, import `<Redirect />`, a small wrapper around `navigate` and `useEffect`:

```jsx
import { Redirect } from "@theorem/react";
if (!item) return <Redirect to="/" />;
```

## Query parameters

When a back button working would make sense, consider storing your state in the query parameters. It is as simple as replacing `useState` with `useQueryParam`:

```jsx
function Table() {
  const [query, setQuery] = useQueryParam("query");
  return (
    <div>
      <form onSubmit={() => setQuery(newValue)}>
        <input type="search" />
      </form>
      <ResultsFor query={query} />
    </div>
  );
}
```

Just like with changing paths, use links where appropriate to change query parameters with the `.link()` function on the setter:

```jsx
<a href={setQuery.link("")}>Reset search</a>
```
