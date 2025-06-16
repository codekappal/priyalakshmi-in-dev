import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Link } from "@heroui/link";

export const PlacementCard = ({
  title,
  description,
  details,
  availableFormats,
  href,
  buttonText = "Learn More",
}) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex items-start space-x-4">
        <div className="mx-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardBody className="grid mx-3">
        <div className="space-y-3 text-sm">
          {details.map((detail, index) => (
            <div key={index} className="mx-2 justify-left">
              <span className="text-slate-500 dark:text-slate-400">
                {detail.label}:
              </span>
              <span className="font-medium">{detail.value}</span>
            </div>
          ))}

          {availableFormats && (
            <div className="pt-4">
              <span className="text-slate-500 dark:text-slate-400 block mb-2">
                Available Formats:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableFormats.map((format) => (
                  <span
                    key={format.id}
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-md text-xs"
                  >
                    {format.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter>
        <Button
          as={Link}
          className="w-full border-blue-500 text-blue-500"
          href={href}
          variant="flat"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
