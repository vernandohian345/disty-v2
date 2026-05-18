export default function Button({
  children,
  variant = "primary",
  className = "",
}) {
  const baseStyle =
    "px-6 py-3 rounded-2xl font-semibold transition-all duration-500";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-orange-400 text-white shadow-[0_10px_30px_rgba(249,115,22,0.35)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.45)] hover:scale-105 hover:-translate-y-1",

    secondary:
      "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:scale-105 hover:-translate-y-1",

    outline:
      "border border-white/20 text-white hover:border-primary hover:text-primary hover:bg-white/10",

    soft: "bg-white border border-orange-100 text-orange-500 shadow-[0_10px_30px_rgba(249,115,22,0.08)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] hover:-translate-y-1",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
