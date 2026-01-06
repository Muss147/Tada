import { prisma } from "@/lib/prisma";
import { NoResults } from "./empty-states";
import { ListMissions } from "./list-missions";
import { MissionFilter } from "./mission-filter";
import { ListMissionsToSubmit } from "./list-missions-to-submit";

const pageSize = 10;
const maxItems = 100000;

interface FetchMissionsParams {
  query?: string;
  status?: string;
  date?: string;
  from: number; // Starting page number
  to: number; // Ending page number
  pageSize: number;
  sort?: string[];
}

function fetchMissions({
  query,
  status,
  date,
  from,
  pageSize,
  sort = [],
}: FetchMissionsParams) {
  const whereClause = {
    ...(query && { name: { contains: query, mode: "insensitive" } }),
    ...(date && { createdAt: { gte: new Date(date) } }),
    status: {
      in: ["on hold", "draft", "modification_needed"],
    },
  };

  const orderByClause = [
    { createdAt: "desc" }, // ✅ récent → ancien
    ...sort.map((s) => ({ [s]: "asc" })),
  ];

  return prisma.mission.findMany({
    where: whereClause,
    orderBy: orderByClause,
    skip: from,
    take: pageSize + 1,
  });
}

export async function ListMissionToSubmitServer({
  query,
  sort,
  page,
  status,
  date,
}: {
  query?: string;
  sort?: string[];
  page: number;
  status?: string;
  date?: string;
}) {
  const hasFilters = Object.values({ query, status, date }).some(
    (value) => value !== null
  );
  const missions = await fetchMissions({
    query,
    status,
    date,
    from: 0,
    to: hasFilters ? maxItems : page > 0 ? pageSize : pageSize - 1,
    pageSize,
    sort,
  });

  async function loadMore({ from, to }: { from: number; to: number }) {
    "use server";

    return fetchMissions({
      query,
      status,
      date,
      from: from + 1,
      to,
      pageSize,
      sort,
    });
  }

  const hasNextPage = Boolean(
    missions.length && missions.length / (page + 1) > pageSize
  );

  return (
    <div className="space-x-4 ">
      <MissionFilter isValidatedList={false} />
      {missions.length > 0 ? (
        <ListMissionsToSubmit
          missions={missions}
          hasNextPage={hasNextPage}
          loadMore={loadMore}
          pageSize={pageSize}
        />
      ) : (
        <NoResults />
      )}
    </div>
  );
}
