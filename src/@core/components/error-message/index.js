const ErrorMessage = ({ children }) => {
  if (!children) return null;

  return <span className="text-danger">{children}</span>;
};

export default ErrorMessage;
