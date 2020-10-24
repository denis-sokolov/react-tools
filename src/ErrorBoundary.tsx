import { Component, ComponentType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  reportError: (error: Error) => void;
} & (
  | { component: ComponentType<{ reset: () => void }> }
  | { fallback: ReactNode }
);

export class ErrorBoundary extends Component<Props> {
  state = { error: undefined as Error | undefined };

  componentDidCatch(error: Error) {
    this.props.reportError(error);
    this.setState({ error });
  }

  componentDidMount() {
    window.addEventListener("popstate", this.reset);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.reset);
  }

  reset = () => {
    this.setState({ error: undefined });
  };

  render() {
    if (this.state.error) {
      if ("component" in this.props) {
        const CurrentComponent = this.props.component;
        return <CurrentComponent reset={this.reset} />;
      }
      return this.props.fallback;
    }
    return this.props.children;
  }
}
