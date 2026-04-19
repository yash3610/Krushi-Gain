const OTPInput = ({ value, onChange, disabled = false }) => {
  const handleInputChange = (event) => {
    const sanitized = event.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(sanitized);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={6}
      placeholder="Enter 6-digit OTP"
      value={value}
      onChange={handleInputChange}
      disabled={disabled}
      className="w-full rounded-xl border border-emerald-300/40 bg-slate-900/50 px-4 py-3 text-center text-lg tracking-[0.35em] text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none disabled:opacity-70"
      required
    />
  );
};

export default OTPInput;
