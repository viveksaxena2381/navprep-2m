import React from "react";

/**
 * App-level error boundary — prevents a single render crash from blanking
 * the entire screen. Shows a recoverable fallback UI with reload/reset options.
 *
 * Intentionally uses inline styles so that even a CSS-pipeline failure
 * cannot break this component.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Dev visibility; keep silent in production to avoid leaking stacks
    if (import.meta?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary]", error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      // Clear only transient state — preserve user credentials & progress
      sessionStorage.clear();
    } catch { /* ignore */ }
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const msg = this.state.error?.message || "An unexpected error occurred.";

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "linear-gradient(180deg, #0b1220 0%, #0f172a 100%)",
          color: "#e5e7eb",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            width: "100%",
            background: "rgba(17, 24, 39, 0.85)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            borderRadius: 16,
            padding: "32px 28px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚠️</div>
          <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#fef3c7" }}>
            Something went wrong
          </h1>
          <p style={{ margin: "0 0 18px", fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>
            NavPrep hit an unexpected error. Your saved progress is safe — try reloading the page.
          </p>
          {import.meta?.env?.DEV && (
            <pre
              style={{
                textAlign: "left",
                background: "#0b1220",
                color: "#fca5a5",
                border: "1px solid #1f2937",
                borderRadius: 8,
                padding: "10px 12px",
                fontSize: 11,
                overflow: "auto",
                maxHeight: 160,
                margin: "0 0 18px",
              }}
            >
              {String(msg)}
            </pre>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={this.handleReload}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#1f2937",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Reload page
            </button>
            <button
              onClick={this.handleReset}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "transparent",
                color: "#e5e7eb",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Go to home
            </button>
          </div>
        </div>
      </div>
    );
  }
}
