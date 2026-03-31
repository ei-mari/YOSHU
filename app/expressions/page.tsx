import { Suspense } from "react";

import { ExpressionPractice } from "@/src/components/expressions/expression-practice";

export default function ExpressionsPage() {
  return (
    <Suspense fallback={null}>
      <ExpressionPractice />
    </Suspense>
  );
}
