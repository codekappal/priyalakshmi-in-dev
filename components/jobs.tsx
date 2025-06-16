import { Link } from "@heroui/link";

import { formatDate, getCareerListings } from "@/app/utils";

export function Jobs() {
  let allJobs = getCareerListings();

  if (!allJobs || allJobs.length === 0) {
    return (
      <div className=" mx-5 text-start text-neutral-600 dark:text-neutral-400 py-10">
        There are no vacancies at the moment. We encourage you to check back
        periodically for updates
      </div>
    );
  }

  return (
    <div>
      {/* Header Row (Only Once) */}
      <div
        className="grid grid-cols-3 lg:grid-cols-4 gap-4 bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 
                    font-semibold p-3 border border-neutral-300 dark:border-neutral-700 rounded-t-lg"
      >
        <p className="col-span-1">Published Date</p>
        <p className="col-span-1">Title</p>
        <p className="col-span-1">Location</p>
        <p className="col-span-1 hidden lg:block">Type</p>
      </div>

      {/* Job Listings */}
      <div className="border border-t-0 border-neutral-300 dark:border-neutral-700 rounded-b-lg divide-y divide-neutral-300 dark:divide-neutral-700">
        {allJobs
          .sort(
            (a, b) =>
              new Date(b.metadata.publishedAt).getTime() -
              new Date(a.metadata.publishedAt).getTime(),
          )
          .map((job) => (
            <Link
              key={job.slug}
              className="grid grid-cols-3 lg:grid-cols-4 gap-4 hover:bg-primary-100 dark:hover:bg-primary-100 transition-all"
              href={`/careers/${job.slug}`}
            >
              <p className="text-neutral-600 dark:text-neutral-400 col-span-1 py-5 pl-3">
                {formatDate(job.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 hover:underline dark:text-neutral-100 col-span-1 py-5">
                {job.metadata.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 col-span-1 py-5">
                {job.metadata.location}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 col-span-1 hidden lg:block py-5">
                {job.metadata.type}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}
