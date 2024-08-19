import { Component, type ComponentType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  reportError: (error: Error, details: { componentStack: string }) => void;
} & (
  | { component: ComponentType<{ error: Error; reset: () => void }> }
  | { fallback: ReactNode }
  | { renderError: (props: { error: Error; reset: () => void }) => ReactNode }
);

export class ErrorBoundary extends Component<Props> {
  reset = () => {
    this.setState({ error: undefined });
  };

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

  render() {
    if (this.state.error) {
      if ("component" in this.props) {
        const CurrentComponent = this.props.component;
        return <CurrentComponent error={this.state.error} reset={this.reset} />;
      }
      if ("renderError" in this.props) {
        return this.props.renderError({
          error: this.state.error,
          reset: this.reset,
        });
      }
      return this.props.fallback;
    }
    return this.props.children;
  }
}
