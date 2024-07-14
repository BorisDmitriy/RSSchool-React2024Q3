export default function ErrorPage() {
  return (
    <div className="error_page">
      <h1>Sorry, something went wrong !</h1>
      <button
        className="btn"
        onClick={() => window.location.reload()}
        type="button"
      >
        Refresh Page
      </button>
    </div>
  );
}
