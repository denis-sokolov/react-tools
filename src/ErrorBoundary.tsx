import React from "react";

type Props = {
  children: React.ReactNode;
  reportError: (error: Error) => void;
} & (
  | { component: React.ComponentType<{ reset: () => void }> }
  | { fallback: React.ReactNode }
);

export class ErrorBoundary extends React.Component<Props> {
  state = { error: undefined as Error | undefined };

  componentDidCatch(error: Error) {
    this.props.reportError(error);
    this.setState({ error });
  }

  reset = () => {
    this.setState({ error: undefined });
  };

  render() {
    if (this.state.error) {
      if ("component" in this.props) {
        const Component = this.props.component;
        return <Component reset={this.reset} />;
      }
      return this.props.fallback;
    }
    return this.props.children;
  }
}
