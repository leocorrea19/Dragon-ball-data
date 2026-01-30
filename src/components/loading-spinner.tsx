import { combinarClases } from '@/lib/utils';

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={combinarClases('text-red-600 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]', className)}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="relative h-24 w-24 animate-spin-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-yellow-400 to-orange-500 shadow-inner" />
        <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full w-full">
            <Star className="absolute h-6 w-6 top-0 left-1/2 -translate-x-1/2" />
            <Star className="absolute h-6 w-6 bottom-0 left-1/2 -translate-x-1/2 rotate-180" />
            <Star className="absolute h-6 w-6 left-0 top-1/2 -translate-y-1/2 -rotate-90" />
            <Star className="absolute h-6 w-6 right-0 top-1/2 -translate-y-1/2 rotate-90" />
          </div>
        </div>
      </div>
      <p className="font-headline text-lg tracking-wider text-primary animate-pulse">
        Reuniendo energía del universo...
      </p>
    </div>
  );
}
