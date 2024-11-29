import { ErrorBoundary } from "react-error-boundary";

const ErrorBoundaryUI = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="alert alert-error">
      <p>Something went wrong.</p>
      <div>{error?.message}</div>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export function CustomErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryUI}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
