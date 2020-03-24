import React from "react";

type Props = {
  children: React.ReactNode;
  component: React.ComponentType<{ reset: () => void }>;
  reportError: (error: Error) => void;
};

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
      const Component = this.props.component;
      return <Component reset={this.reset} />;
    }
    return this.props.children;
  }
}
