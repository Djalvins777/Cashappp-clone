import { Alert, AlertDescription } from "@/components/ui/alert"

export function AnnouncementBanner() {
  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <AlertDescription className="text-blue-900">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
          <div>
            <p className="font-semibold">New Grant Opportunities Available</p>
            <p className="mt-1 text-sm">
              The Department of Health & Human Services has announced $16,000 in new grant funding for community health
              initiatives. Applications are now being accepted.
            </p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
