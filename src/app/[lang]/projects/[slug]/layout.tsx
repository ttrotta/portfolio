import ProjectBackground from "@/components/ui/ProjectBackground";
import TransitionProvider from "@/contexts/TransitionContext";

export default function Project({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TransitionProvider>
      <div className="relative h-full w-full">
        <ProjectBackground />
        <div className="relative z-10">{children}</div>
      </div>
    </TransitionProvider>
  );
}
