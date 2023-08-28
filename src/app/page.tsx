import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Brainskills Dashboard</h1>
      <Link
        href="/students"
        className="px-5 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md hover:shadow-lg"
      >
        View Students
      </Link>
      <Link
        href="/leaderboards"
        className="px-5 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md hover:shadow-lg"
      >
        Leaderboards
      </Link>
    </div>
  );
}
