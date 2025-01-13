export function IntroSectionItem({
  emoji,
  children,
}: {
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-200 px-4 gap-4 py-4 rounded-lg items-center">
      <p className="text-xl">{emoji}</p>
      <div className="text-sm text-gray-700 whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}
