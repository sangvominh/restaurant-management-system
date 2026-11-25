import Link from "next/link";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Đang tải danh sách món ăn"
      className="grid grid-cols-2 gap-3 max-[350px]:grid-cols-1 sm:gap-4 lg:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col rounded-xl border border-[#e8dfd3] bg-white p-2.5"
        >
          <div className="aspect-[16/11] w-full animate-pulse rounded-lg bg-[#efe6db]" />
          <div className="mt-2.5 h-3.5 w-3/4 animate-pulse rounded bg-[#efe6db]" />
          <div className="mt-3 flex items-center justify-between gap-2 pt-1.5">
            <div className="h-4 w-18 animate-pulse rounded bg-[#efe6db]" />
            <div className="h-8 w-20 animate-pulse rounded-lg bg-[#efe6db]" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface ApiErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ApiErrorState({ message, onRetry }: ApiErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-[#efc9bf] bg-[#fff5f2] p-6 text-center sm:p-8"
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fde4dc] text-[#a63420]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="text-base font-bold text-[#6e1f12] sm:text-lg">
        Không thể tải dữ liệu thực đơn
      </h2>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-[#8c3b2b]">
        {message}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#a33f10] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#87320b]"
        >
          Thử tải lại
        </button>
      ) : null}
    </div>
  );
}

interface EmptyStateCardProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyStateCard({
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateCardProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#dccfc0] bg-white px-6 py-12 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7ede2] text-[#a33f10]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <h2 className="text-base font-bold text-[#1f1712] sm:text-lg">{title}</h2>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-[#6e6056]">
        {description}
      </p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#a33f10] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#87320b]"
        >
          {actionLabel}
        </button>
      ) : null}
      {actionLabel && !onAction && actionHref ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-[#a33f10] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#87320b]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
