# Starting a new React project

This includes a sample new React project and some tips.

TypeScript works great for any JavaScript project, and React projects are no exception. When in doubt, use _as any_ as a temporary measure to continue your work. As your expertise with TypeScript improves, your code will have fewer unsafe _any_.

Group your directories by the domain, as that is how most work items are organized. In particular, keep one screen in the application in one directory with subdirectories for sub-screens. This way most of the code to change for a particular work item is mostly in the same place.

In the directory structure strive to not import items from nested subdirectories. Treat every directory as its own little module with a clear encapsulation boundary at its _index.ts_.

Keep your clearly reusable pieces in a separate directory, say, _lib_ or _shared_, and pure domain data-specific pieces in _model_. Have a higher standard of quality for these areas, as they have a high impact.
