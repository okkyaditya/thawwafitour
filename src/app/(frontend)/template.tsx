import { PageTransition } from "@/components/motion/MotionWrapper";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
