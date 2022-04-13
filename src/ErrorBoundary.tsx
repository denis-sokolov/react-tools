import { Component, ComponentType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  reportError: (error: Error, details: { componentStack: string }) => void;
} & (
  | { component: ComponentType<{ error: Error; reset: () => void }> }
  | { fallback: ReactNode }
);

export class ErrorBoundary extends Component<Props> {
  state = { error: undefined as Error | undefined };

  componentDidCatch(error: Error, details: { componentStack: string }) {
    this.props.reportError(error, details);
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
        return <CurrentComponent error={this.state.error} reset={this.reset} />;
      }
      return this.props.fallback;
    }
    return this.props.children;
  }
}
