import ProjectBackground from "@/components/ui/ProjectBackground";

export default function Project({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full w-full">
      <ProjectBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
