import { AppButton } from "./AppButton";

export const ErrorState = ({ message, retryFn }: any) => {
  return (
    <div className="text-center py-10 space-y-4">
      <p className="text-red-500 font-medium">
        {message || "Something went wrong"}
      </p>
      {retryFn && <AppButton onClick={retryFn}>Retry</AppButton>}
    </div>
  );
};
