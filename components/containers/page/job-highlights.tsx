interface JobHighlightItem {
  label: string;
  value: string;
  className?: string;
}

export const JobHighLights: React.FC<{
  location: string;
  type: string;
  occupation: string;
  experience: string;
  salary: string;
  jobId: string;
}> = ({ location, type, occupation, experience, salary, jobId }) => {
  const highlights: JobHighlightItem[] = [
    { label: "Location", value: location },
    { label: "Working Mode", value: type },
    { label: "Occupation Type", value: occupation },
    { label: "Experience", value: experience },
    { label: "Salary", value: salary },
    { label: "Job Id", value: jobId },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl shadow-sm dark:bg-gray-800 dark:border-gray-700 font-light text-medium mb-10">
      <div className="bg-white rounded-3xl p-2 dark:bg-gray-800">
        <dl className="grid grid-cols-3 gap-y-10 gap-x-5 mx-auto text-gray-900 dark:text-white">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center"
            >
              <dt className="mb-2 font-bold text-header dark:text-slate-200">
                {item.label}
              </dt>
              <dd className="text-content">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
