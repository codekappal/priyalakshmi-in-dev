import { Link } from "@heroui/link";

import OptimizedImage from "@/components/common/ui/optimized-images";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col justify-center items-center h-screen text-center px-5">
      <div className="max-w-3xl">
        <div className="text-2xl lg:text-5xl font-bold">
          Looks like this page drifted away with the tide.{" "}
          <span>
            <br />
            Navigate back to
          </span>
        </div>
        <Link
          className="inline-block text-2xl lg:text-5xl font-bold hover:underline"
          href="/"
        >
          Home ⚓
        </Link>
      </div>

      <div className="mt-8">
        <OptimizedImage
          alt="404"
          className="object-contain"
          height={400}
          src="/images/warnings/404.svg"
          width={400}
        />
      </div>
    </section>
  );
}
