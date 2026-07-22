interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={center ? "mb-12 text-center" : "mb-12"}>
      {subtitle && (
        <p className="mb-2 uppercase tracking-[0.3em] text-primary">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl font-bold">
        {title}
      </h2>
    </div>
  );
}