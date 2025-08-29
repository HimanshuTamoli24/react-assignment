import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader className="animate-spin w-6 h-6 text-gray-600" />
    </div>
  );
}
