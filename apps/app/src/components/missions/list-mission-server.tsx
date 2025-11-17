import { prisma } from "@/lib/prisma";
import { NoResults } from "./empty-states";
import { ListMissions } from "./list-missions";
import { MissionFilter } from "./mission-filter";

const pageSize = 10;
const maxItems = 100000;

interface FetchMissionsParams {
  orgId: string;
  query?: string;
  status?: string;
  date?: string;
  from: number; // Starting page number
  to: number; // Ending page number
  pageSize: number;
  sort?: string[];
}

function fetchMissions({
  orgId,
  query,
  status,
  date,
  from,
  to,
  pageSize,
  sort = [],
}: FetchMissionsParams) {
  const whereClause = {
    organizationId: orgId,
    ...(query && { name: { contains: query } }),
    ...(status && status !== "all" && { status }),
    ...(date && { createdAt: { gte: new Date(date) } }),
  };

  const orderByClause = sort.map((s) => ({ [s]: "desc" }));

  const skip = from * pageSize;
  const take = (to - from + 1) * pageSize;

  return prisma.mission.findMany({
    where: whereClause,
    orderBy: orderByClause,
    skip,
    take,
    include: {
      missionPermissions: {
        include: {
          user: true,
        },
      },
      survey: {
        include: {
          response: {
            where: {
              status: "completed",
            },
          },
        },
      },
    },
  });
}

export async function ListMissionServer({
  orgId,
  query,
  sort,
  page,
  status,
  date,
}: {
  orgId: string;
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
    orgId,
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
      orgId,
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
      <MissionFilter orgId={orgId} />
      {missions.length > 0 ? (
        <ListMissions
          missions={missions.map((mission) => ({
            ...mission,
            submissions:
              mission.survey.length > 0
                ? mission.survey![0]?.response.length
                : 0,
          }))}
          hasNextPage={hasNextPage}
          loadMore={loadMore}
          pageSize={pageSize}
          orgId={orgId}
        />
      ) : (
        <NoResults />
      )}
    </div>
  );
}
