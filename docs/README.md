# Theorem React tools reference

Import anything from below directly from the top level of the module.
Tree-shaking in your builder should only include the items you actually use, everything else will be dropped.

```js
import { Thing } from "@theorem/react";
```

## ActionArea

Links, buttons, links that open in new windows, submit buttons, all of these are different implementations
of what the UI design treats as a generic “clicky” thing.

Keep all clickable things visually consistent and ensure full accessibility
by using one foundation element under them all. Switch from one to another without a big diff:

```jsx
<PrimaryButton action="/">Back to dashboard</PrimaryButton>
<ClickableText action={() => setOpen(true)}>More details</ClickableText>
<ClickableText action={{ newWindow: "https://example.com/" }}>Visit our support channel</ClickableText>
<PrimaryButton action="submit">Send email</PrimaryButton>
```

ActionArea starts with no styles, so create a few visual components that customize the ActionArea styles:

```jsx
// For an example
// .myClickableTextStyles { color: blue }
// .myClickableTextStyles:hover { text-decoration: underline }
const ClickableText = props => (
  <ActionArea className="myClickableTextStyles" {...props} />
);

// For an example
// .myPrimaryButtonStyles { border: 1px solid blue }
// .myPrimaryButtonStyles:hover { border-color: red }
const PrimaryButton = props => (
  <ActionArea className="myPrimaryButtonStyles" {...props} />
);
```

In TypeScript, you can pass-through all parameters or explicitly define props by re-using Action type:

```jsx
const SecondaryButton: typeof ActionArea = props => <ActionArea {...props} />;

import { ActionArea, Action } from "@theorem/react";
const TertiaryButton = (props: { action: Action }) => (
  <ActionArea action={props.action} />
);
```

See also [react-abstract-button](https://www.npmjs.com/package/react-abstract-button).

## ErrorBoundary

Every application needs a good crash screen. For historic reasons in React this needs a class component.
With this helper you can simplify the code a tiny bit:

```jsx
import { ErrorBoundary } from "@theorem/react";

function MyCrashScreen(props) {
  return (
    <div>
      <p>Sorry, our application has crashed.</p>
      <button onClick={props.reset}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      component={MyCrashScreen}
      reportError={error => toSentry(error)}
    >
      <Routes />
    </ErrorBoundary>
  );
}
```

## UnderConstruction

During development, some areas of the screen might not be finished yet, but added to the UI nevertheless
to provide some visual balance.

UnderConstruction clearly communicates to the team members that an item is not yet clickable,
by modifying a cursor, and blinking red if anyone tries to click on it.

```jsx
import { UnderConstruction } from "@theorem/react";

function App() {
  return (
    <div>
      <List />
      <UnderConstruction>
        <button>Admin area</button>
      </UnderConstruction>
    </div>
  );
}
```

## forwardClick

Consider a list of emails in Gmail. Every row has small buttons: check, star, arhive, and others, yet a click on the containing entire row should open an email.
This is a good, common UI pattern that is not supported by HTML, as one can not nest an interactive element inside another interactive element.

A common implementation uses a div with a click handler for a container, and `stopPropagation` on child events, but that has major disadvantages. First, every small child action needs to be modified, making it easy to make a mistake. Second, this prevents propagation not only to the container, but to the rest of the application, making it so clicks on nested actions does not close dropdowns, is not registered with tracking tools. Third, this approach has accessibility risks, as the outer div is not a native button element.

Instead, use `forwardClick`. Full support for propagation and the only place in the code to edit is the container:

```jsx
<tr onClick={e => forwardClick(e, "[data-email-title]")}>
  <button>Star</button>
  <a href={email.href} data-email-title>
    {email.title}
  </a>
</tr>
```

## useCallback

React’s useCallback has no semantic guarantee to preserve the identity of the function, and that is [unclear in the documentation](https://github.com/reactjs/reactjs.org/issues/2334).

If you pass callbacks to children components that have side-effects, those side-effects may run more often than expected. In particular, a component may re-fetch data from the server and reset the UI to a loading state unexpectedly.

useCallback in this module has the semantic guarantee to not change identity.

## useCheckStableIdentity

Debugging why components rerender may be difficult. Use this hook to help understand which values preserve their identity and which don’t:

```jsx
// Will print in the console whether user, data, and loading props change or not with every re-render
useCheckStableIdentity({ user, data, loading });
```

## useClickOutside

A sidebar, dropdown, information panel need to close when the user clicks outside of it. This little helper is the simplest way to implement that:

```jsx
const [open, setOpen] = useState(true);
const containerRef = useClickOutside(() => setOpen(false));
return <div ref={containerRef}>Sidebar contents</div>;
```

## useCrash

Errors thrown in async functions can not by default be traced to the originating source. So a click handler crashing does not crash the component, leaving the UI in a non-working or corrupt state.

useCrash provides a function that can be called to directly crash the component and return the UI to a properly handler error state.

```jsx
const crash = useCrash();
return (
  <div
    onClick={() => {
      if (thingAreWrong)
        crash(new Error("Things were not supposed to be wrong"));
    }}
  ></div>
);
```

## useUniqueId

`useUniqueId` is most commonly useful for label/input pairs, but can be used for anything that needs an id that is unique and stable for a particular component instance.

```jsx
const id = useUniqueId();
return (
  <div>
    <label for={id}>Your choice</label>
    <p>Explanation about your choice</p>
    <input id={id} />
  </div>
);
```
