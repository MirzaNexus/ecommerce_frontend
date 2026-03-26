import { Button } from "@/components/ui/button";

export const AppButton = ({ loading, children, ...props }: any) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </Button>
  );
};
