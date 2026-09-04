function SectionTitle({
  title,
  subtitle,
  align = "center",
}) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-2xl text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;