import Loader from './Loader';

const Button = ({
  children,
  isLoading = false,
  loadingText = 'Please wait...',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {isLoading ? <Loader label={loadingText} /> : children}
    </button>
  );
};

export default Button;
