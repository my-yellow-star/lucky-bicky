export function IntroSectionItem({
  emoji,
  text,
}: {
  emoji: string;
  text: string;
}) {
  return (
    <div className="flex bg-gray-200 px-4 gap-4 py-4 rounded-lg items-center">
      <p className="text-xl">{emoji}</p>
      <p className="text-sm text-gray-700 whitespace-pre-line">{text}</p>
    </div>
  );
}
