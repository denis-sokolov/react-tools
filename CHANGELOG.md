# 12.0

- Breaking changes:
  - useCallback removed
  - React 19 required

# 11.1

- ActionArea detects current ancestor links and adds current-ancestor class name

# 11.0

- Breaking changes in ActionArea:
  - currentPathAndQuery property, and new functionality around detecting links as current
  - Inactive ActionArea is now a div and not a span
  - Error when trying to use cross-origin download links.
- New Action for ActionArea: replace.

# 10.4

- useCrashCaught

# 10.3

- forwardClick: e.handled = true feature to prevent false positives through portals

# 10.2

- sort: numbersBehindStrings
- sort: allow the key function to return a tuple of keys

# 10.1

- sort allows the key function to return a list of keys

# 10

- Require React 18, Node 18, npm 8
- sort
- forwardClick: recognizes role attribute

# 9.5.0

- Export more specific Action\* types for ActionArea

# 9.4.0

- useShowRenders
- useInputWithDraftState: setInputValue

# 9.3.0

- ErrorBoundary: renderError form

# 9.2.2

- fixup 9.2.1 type location

# 9.2.1

- node: esm now does not require experimental-specifier-resolution=node
- node: include CommonJS for compatibility with some dev servers

# 9.2.0

- node: now can import as an esm module

# 9.1.0

- ActionArea: does not show disabled, when pointing to a new window
- ErrorBoundary: component gets the Error details

# 9.0.0

- Breaking: useInputWithDraftState onChange renamed to onChangesDone
- Spinner: delayedMs option

# 8.0.0.

- ActionArea: use disabledReason instead of “disabled”

# 7.2.0

- ActionArea: renderSpan option to customize span rendering

# 7.1.0

- ActionArea: renderButton option to customize button rendering

# 7.0.0

- ActionArea: changed the way styles are injected into the document, can affect some specificity overrides

# 6.3.1

- license-tool: fix working on projects without Webpack

# 6.3.0

- ActionArea: renderLink option to customize link rendering

# 6.2.1

- Fixup in useDismissElement

# 6.2.0

- Add useDismissElement

# 6.1.0

- Add useInputWithDraftState

# 6.0.0

- ActionArea: improve rels and referrer
- ActionArea: nicer error message when action is missing
- permanence: renders children on the screen even without parent

# 5.0.0

- color: remove color utilities. Consider [ui-colors instead](https://www.npmjs.com/package/ui-colors).
- ActionArea: add noreferrer on external links.

# 4.1.1

- makePermanence

# 4.0.0

- Breaking: removed default Spinner looks
- routing: initRouting takes a few options to customize
- routing: handle download links correctly
- routing: scroll to top on navigation

# 3.3.0

- Spinner: delayed prop

# 3.2.1

- routing: Redirect avoids a blink during rerender

# 3.2.0

- ErrorBoudary: now receives componentStack
- routing: links with targets are allowed

# 3.1.0

- is404OurFault
- ActionArea style prop

# 3.0.0

- Support and require React 17
- forwardClick: respect aria-role

# 2.3.0

- ErrorBoundary: reset on navigation

# 2.2.0

- ErrorBoundary: fallback option
- UnderConstruction: inline option

# 2.1.0

- UnderConstruction: onlyWhen

# 2.0.0

- Implement tree-shaking
- Add color functions

# 1.9.0

- ActionArea: title

# 1.8.3

- useRerender: expose in the main export

# 1.8.2

- OnlyClientSide

# 1.7.0

- Support IE11 syntactically

# 1.6.1

- maintenance release

# 1.6.0

- useClickOutside: switch from mousedown to click event
- useClickOutside: allow multiple areas

# 1.5.0

- routing: handleLinkClicks

# 1.4.1

- smartOutline: works with pseudo-elements
- smartOutline: does not crash in non-window env

# 1.4.0

- Add useRerenderEvery
- Fix ActionArea new window links not using noopener
- Fix Spinner sometimes having timing issues

# 1.3.0

- Add download feature to ActionArea

# 1.2.0

- Add routing

# 1.1.0

- Add Spinner
- Add useCatchAsync
