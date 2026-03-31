import { Suspense } from "react";

import { RecordingStudio } from "@/src/components/recordings/recording-studio";

export default function RecordingsPage() {
  return (
    <Suspense fallback={null}>
      <RecordingStudio />
    </Suspense>
  );
}
