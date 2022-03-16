# React tools reference

Import anything from below directly from the top level of the module.
Tree-shaking in your builder should only include the items you actually use, everything else will be dropped.

```js
import { Thing } from "@denis-sokolov/react";
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
<ClickableText action={{ download: "archive.zip", url: "https://example.com/" }}>Download your data</ClickableText>
<PrimaryButton action="submit">Send email</PrimaryButton>
<PrimaryButton action={ disabledReason: "Feel all fields to proceed" }>Create</PrimaryButton>
```

ActionArea starts with no styles, so create a few visual components that customize the ActionArea styles:

```jsx
// For an example
// .myClickableTextStyles { color: blue }
// .myClickableTextStyles:hover { text-decoration: underline }
// .myClickableTextStyles.current { color: inherit; text-decoration: inherit; }
const ClickableText = (props) => (
  <ActionArea className="myClickableTextStyles" {...props} />
);

// For an example
// .myPrimaryButtonStyles { border: 1px solid blue }
// .myPrimaryButtonStyles:hover { border-color: red }
// .myPrimaryButtonStyles.current { border-color: gray }
const PrimaryButton = (props) => (
  <ActionArea className="myPrimaryButtonStyles" {...props} />
);
```

In TypeScript, you can pass-through all parameters or explicitly define props by re-using Action type:

```jsx
const SecondaryButton: typeof ActionArea = (props) => <ActionArea {...props} />;

import { ActionArea, Action } from "@denis-sokolov/react";
const TertiaryButton = (props: { action: Action }) => (
  <ActionArea action={props.action} />
);
```

If you use a custom router, including anything during server-side rendering, provide the current path to ActionArea:

```jsx
<ActionArea action="/about" currentPath={myServerRouter.currentPath}>
  About
</ActionArea>
```

If you need to render links in a particular way, say, because of next.js Link component, provide a customizing function. Same for buttons and spans:

```jsx
<ActionArea action="/about" renderLink={(props) => <a {...props} />}>
  About
</ActionArea>

<ActionArea action={() => {}} renderButton={(props) => <button {...props} />} renderSpan={(props) => <span {...props} />}>
  Send email
</ActionArea>
```

See also [react-abstract-button](https://www.npmjs.com/package/react-abstract-button).

## ErrorBoundary

Every application needs a good crash screen. For historic reasons in React this needs a class component.
With this helper you can simplify the code a tiny bit:

```jsx
import { ErrorBoundary } from "@denis-sokolov/react";

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
      reportError={(error) => toSentry(error)}
    >
      <Routes />
    </ErrorBoundary>
  );
}

function AboutScreen() {
  return (
    <Page>
      About the company
      <ErrorBoundary
        fallback={<div>Calendar is not available at the moment</div>}
        reportError={toSentry}
      >
        <Calendar />
      </ErrorBoundary>
    </Page>
  );
}
```

## forwardClick

Consider a list of emails in Gmail. Every row has small buttons: check, star, arhive, and others, yet a click on the containing entire row should open an email.
This is a good, common UI pattern that is not supported by HTML, as one can not nest an interactive element inside another interactive element.

A common implementation uses a div with a click handler for a container, and `stopPropagation` on child events, but that has major disadvantages. First, every small child action needs to be modified, making it easy to make a mistake. Second, this prevents propagation not only to the container, but to the rest of the application, making it so clicks on nested actions does not close dropdowns, is not registered with tracking tools. Third, this approach has accessibility risks, as the outer div is not a native button element.

Instead, use `forwardClick`. Full support for propagation and the only place in the code to edit is the container:

```jsx
<tr onClick={(e) => forwardClick(e, "[data-email-title]")}>
  <button>Star</button>
  <a href={email.href} data-email-title>
    {email.title}
  </a>
</tr>
```

## is404OurFault

An invalid path may be caused by the user making a typo, by following a 3rd-party incorrect link, or having incorrectly copied it. But sometimes the link they have followed may be from our own application. A screen “This page is not here” after performing an action in the app itself is embarassing. With this helper function we can detect internal broken links and correctly own up our mistake.

```jsx
import { is404OurFault } from "@denis-sokolov/react";

export function NotFound() {
  if (is404OurFault())
    throw new Error(
      `Detected a broken link to ${location.href} from ${document.referrer}`
    );
  return (
    <div>
      The page you are looking for may have moved or never was here in the first
      place.
    </div>
  );
}
```

## License tools

Every public-facing app needs to validate 3rd-party package licenses and output their attribution. Projects that use Webpack can use [license-checker-webpack-plugin](https://github.com/microsoft/license-checker-webpack-plugin). Other projects, includeing Snowpack with Webpack plugin, can use the tool included with this package.

```sh
$ denis-react-license-tool <project-directory> [...more-directories] > dist/ThirdPartyNotices.txt
```

The tool will error if any dependencies use a license that is not in the list of licenses. Change the default set of licenses with `--licenses '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC OR CC0-1.0 OR 0BSD OR Unlicense)'`. The value is an SPDX expression.

If some packages’ licenses are detected incorrectly, use `--override package:MIT,other-package:Unlicense` to override.

If some packages are internal or are not used in the output, use `--skip @our/private-tools,snowpack,typescript`.

## OnlyClientSide

Render something only client-side, avoiding a hydration mismatch warning if the value can’t be generated on the server.

```jsx
<OnlyClientSide>
  <p>Current page: {location.href}</p>
</OnlyClientSide>

<OnlyClientSide butNotIf={iKnowValueIsStaticThisTime}>
  <p>{value}</p>
</OnlyClientSide>
```

## Permanence

By default, when a component in the tree changes, React destroys the entire sub-tree and recreates it from scracth to avoid unexpectedly reusing some state. If you do want to reuse the state, whether for performance or UX reasons, use `makePermanence`. In the example below Intro component will not be destroyed and re-created, because it is moved to be rendered as a child of App.

```tsx
const [MyParent, MyChild] = makePermanence();
function App() {
  return <MyParent>{condition ? <Home /> : <Contact />}</MyParent>;
}
function Home() {
  return (
    <MyChild>
      <Intro />
      <p>Welcome</p>
    </MyChild>
  );
}
function Contact() {
  return (
    <MyChild>
      <Intro />
      <p>Contact us</p>
    </MyChild>
  );
}
```

Further reading: [React reconciliation](https://reactjs.org/docs/reconciliation.html), [React issue](https://github.com/facebook/react/issues/3965).

## Routing

[Routing tools documentation](./routing.md).

## smartOutline

In most designs we do not want to mark a UI element the user has clicked on, thus `:focus { outline: 0 }` is common, even though it is poor for accessibility.

While a custom design solution would be best, a simple solution to detect when an outline is needed and when it is not is a nice workaround:

```js
import { smartOutline } from "@denis-sokolov/react";

// Top level of your application
smartOutline();
```

## Spinner

Spinner component ensures that the user is never stuck with an infinite spinner on the screen. By default, after a minute of being displayed, the spinner will crash. A proper crash screen with an apology is better than a stuck animation that does not represent any activity.

You also have an option to delay the spinner from showing for a bit. This is preferred for most loading states, where there is a chance the content will show up soon. For user-initiated change operations, like dropping a file on an upload field, do not delay the indicator.

The Spinner comes with a small, simple animation out of the box, but it can be customized.

```jsx
// Simplest use
return <Spinner />;

// Options
return <Spinner delayedMs={500} fullScreen timeoutMs={90000} />;

// Customized visuals
const MySpinner = () => (
  <Spinner>
    <img src={myImage} />
  </Spinner>
);
```

## UnderConstruction

During development, some areas of the screen might not be finished yet, but added to the UI nevertheless
to provide some visual balance.

UnderConstruction clearly communicates to the team members that an item is not yet clickable,
by modifying a cursor, and blinking red if anyone tries to click on it.

```jsx
import { UnderConstruction } from "@denis-sokolov/react";

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

For conditional display, use `<UnderConstruction onlyWhen={condition} />`

## useCatchAsync

When asynchronous effects in React components throw, by default they can not communicate with React to inform which component failed. This prevents us from rendering a proper partial or full crash screen, and instead leaves the application in a corrupt state.

useCatchAsync creates this connection explicitly and an async error will be handled using the standard React error handling mechanism:

```jsx
const catchAsync = useCatchAsync();
return <button onClick={catchAsync(async function() {
  await something();
}} />;
```

Also see useCrash.

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

This is a low-level hook to specifically detect mouse clicks. **You probably need useDismissElement instead**.

Note that this does not currently support React portals.

If you have a button outside that controls this container, you have undefined behavior with regards to which event will win. Instead, define multiple areas and the clickOutside will trigger only if the click does not fall into any of the specificied areas. Use _additionalArea_ method and provide a string key that’s unique to this instance of the _useClickOutside_.

```jsx
// Wrong
const outside = useClickOutside(() => setOpen(false));
return (
  <div>
    <button onClick={() => setOpen(true)}>Open sidebar</button>
    <div ref={outside}>Sidebar contents</div>
  </div>
);

// Correct
const outside = useClickOutside(() => setOpen(false));
return (
  <div>
    <button
      ref={outside.additionalArea("myButton")}
      onClick={() => setOpen(true)}
    >
      Open sidebar
    </button>
    <div ref={outside}>Sidebar contents</div>
  </div>
);
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

Also see useCatchAsync.

## useDismissElement

A sidebar, dropdown, information panel need to close when the user clicks outside of it or hits Escape. This helper is for that:

```jsx
const [open, setOpen] = useState(true);
const containerRef = useDismissElement(() => setOpen(false));
return <div ref={containerRef}>Sidebar contents</div>;
```

If you have a button outside that controls the container, you can call .additionalArea the same as for useClickOutside, see the doc for that above.

## useInputWithDraftState

Use useInputWithDraftState to build input elements with thoroughly thought out user and developer experience. In the simplest form, useInputWithDraftState allows the user to edit a value, and triggers onChange when the user has a valid value in the field.

```jsx
import { useInputWithDraftState } from "@denis-sokolov/react";
function Input(props) {
  const { onChange, value } = props;
  const { inputProps } = useInputWithDraftState({ onChange, value });
  return <input {...inputProps}>
}
```

useInputWithDraftState can also be used with a `<textarea>` the same way. For custom text-like widgets, use useCustomInputWithDraftState hook, see useInputWithDraftState source code for an example of use.

To validate the draft states, use the `validate` option. Before triggering onChange, the hook will validate the value, and invalid values will not trigger onChange, and will instead flip showInvalidDraftError flag. This will not happen if the field is empty, as good UX expects the user to be able to leave the field empty, if only because they have not yet edited it.

```jsx
function EmailInput() {
  const { inputProps, showInvalidDraftError } = useInputWithDraftState({
    onChange,
    validate: str => str.includes("@")
    value,
  });
  return <div>
    <input {...inputProps}>
    {showInvalidDraftError && "Please check this field"}
  </div>;
}
```

To forcefully validate the empty value, use a validateEmptyField option.

To observe changes only after the user is done editing, use onChangesDone instead. ([React’s onChange/onInput confusion](https://github.com/facebook/react/issues/9657)).

The hook also allows parsing the text value as a richer value instead of validating. This can be used for number inputs, or a custom data type:

```jsx
function EmailInput() {
  const { inputProps } = useInputWithDraftState({
    onChange,
    convert: {
      fromString: (s) => {
        const num = parseInt(s, 10);
        if (Number.isNaN(num)) return "unparsable";
        return { value: num };
      },
      toString: (num) => num.toString(),
    },
    value,
  });
  return <div>
    <input {...inputProps}>
  </div>;
}
```

## useRerender

When subscribing to some events and rendering data directly from another source, without using useState or useReducer, one needs to notify React to rerender.

```jsx
const rerender = useRerender();
```

## useRerenderEvery

When the rendering depends on the time, one needs to notify React to rerender periodically, as time changes do not trigger rerenders themselves.

```jsx
// Every second
useRerenderEvery(1000);
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
