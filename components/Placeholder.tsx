import { ImageIcon } from "./Icons";

type Props = {
  label: string;
  dim?: string;
  className?: string;
  icon?: React.ReactNode;
};

/** Заготовка под изображение (фото/диплом). Показывает рамку и подпись. */
export default function Placeholder({ label, dim, className = "", icon }: Props) {
  return (
    <div className={`placeholder ${className}`.trim()}>
      {icon ?? <ImageIcon className="placeholder__icon" />}
      <span className="placeholder__label">{label}</span>
      {dim ? <span className="placeholder__dim">{dim}</span> : null}
    </div>
  );
}
