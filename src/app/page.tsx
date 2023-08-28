import Link from "next/link";
import PageHeader from "./(components)/PageHeader";

export default async function HomePage() {
  return (
    <>
      <PageHeader title="Brainskills Dashboard" />
      <div className="flex flex-col items-center gap-8">
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
    </>
  );
}
