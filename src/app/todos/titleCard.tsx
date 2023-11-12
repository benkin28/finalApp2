export default function TitleCard(props: { title: string }) {
  return (
    <div className="bg-gray-500 w-80 h-20 flex justify-center items-center rounded-2xl">
      <h2 className="text-3xl font-serif text-white">{props.title}</h2>
    </div>
  );
}
