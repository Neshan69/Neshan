import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <h1 className="font-display text-4xl font-bold text-primary mb-4">
              Something went wrong
            </h1>
            <p className="text-on-surface-variant mb-2">
              An unexpected error occurred.
            </p>
            <pre className="text-xs text-error mb-6 text-left overflow-auto max-h-48 bg-black/40 p-4 rounded-lg">
              {this.state.error?.message || String(this.state.error)}
            </pre>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-secondary text-surface px-6 py-3 rounded-xl font-bold text-xs tracking-widest hover:brightness-110 transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
