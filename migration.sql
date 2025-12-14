-- CreateEnum
CREATE TYPE "KycSatus" AS ENUM ('in_progress', 'completed', 'canceled');

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_userId_fkey";

-- DropForeignKey
ALTER TABLE "template" DROP CONSTRAINT "template_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "mission" DROP CONSTRAINT "mission_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "mission_config_contributor" DROP CONSTRAINT "mission_config_contributor_missionId_fkey";

-- DropForeignKey
ALTER TABLE "survey" DROP CONSTRAINT "survey_missionId_fkey";

-- DropForeignKey
ALTER TABLE "survey_response" DROP CONSTRAINT "survey_response_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "survey_response" DROP CONSTRAINT "survey_response_userId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_missionId_fkey";

-- DropForeignKey
ALTER TABLE "dashboard_filter" DROP CONSTRAINT "dashboard_filter_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_role" DROP CONSTRAINT "project_role_userId_fkey";

-- DropForeignKey
ALTER TABLE "project_role" DROP CONSTRAINT "project_role_projectId_fkey";

-- DropForeignKey
ALTER TABLE "chart" DROP CONSTRAINT "chart_projectId_fkey";

-- DropForeignKey
ALTER TABLE "chart_share" DROP CONSTRAINT "chart_share_chartId_fkey";

-- DropForeignKey
ALTER TABLE "dataset" DROP CONSTRAINT "dataset_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "dataset" DROP CONSTRAINT "dataset_chartId_fkey";

-- DropForeignKey
ALTER TABLE "variable" DROP CONSTRAINT "variable_projectId_fkey";

-- DropForeignKey
ALTER TABLE "chart_dataset_config" DROP CONSTRAINT "chart_dataset_config_chartId_fkey";

-- DropForeignKey
ALTER TABLE "chart_dataset_config" DROP CONSTRAINT "chart_dataset_config_datasetId_fkey";

-- DropForeignKey
ALTER TABLE "sub_dashboard" DROP CONSTRAINT "sub_dashboard_missionId_fkey";

-- DropForeignKey
ALTER TABLE "sub_dashboard" DROP CONSTRAINT "sub_dashboard_userId_fkey";

-- DropForeignKey
ALTER TABLE "sub_dashboard_item" DROP CONSTRAINT "sub_dashboard_item_subDashboardId_fkey";

-- DropForeignKey
ALTER TABLE "temp_mission" DROP CONSTRAINT "temp_mission_missionId_fkey";

-- DropForeignKey
ALTER TABLE "temp_sub_dashboard" DROP CONSTRAINT "temp_sub_dashboard_tempMissionId_fkey";

-- DropForeignKey
ALTER TABLE "consulted_mission" DROP CONSTRAINT "consulted_mission_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "consulted_mission" DROP CONSTRAINT "consulted_mission_missionId_fkey";

-- DropForeignKey
ALTER TABLE "billing_info" DROP CONSTRAINT "billing_info_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "mission_assignment" DROP CONSTRAINT "mission_assignment_missionId_fkey";

-- DropForeignKey
ALTER TABLE "mission_assignment" DROP CONSTRAINT "mission_assignment_contributorId_fkey";

-- DropForeignKey
ALTER TABLE "mission_assignment" DROP CONSTRAINT "mission_assignment_assignedBy_fkey";

-- DropForeignKey
ALTER TABLE "validation_comment" DROP CONSTRAINT "validation_comment_validatorId_fkey";

-- DropForeignKey
ALTER TABLE "validation_comment" DROP CONSTRAINT "validation_comment_surveyResponseId_fkey";

-- DropForeignKey
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_member" DROP CONSTRAINT "workspace_member_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_member" DROP CONSTRAINT "workspace_member_userId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_member" DROP CONSTRAINT "workspace_member_invitedById_fkey";

-- DropForeignKey
ALTER TABLE "workspace_invitation" DROP CONSTRAINT "workspace_invitation_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_invitation" DROP CONSTRAINT "workspace_invitation_invitedById_fkey";

-- DropForeignKey
ALTER TABLE "ai_dataset" DROP CONSTRAINT "ai_dataset_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ai_dataset" DROP CONSTRAINT "ai_dataset_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "ai_dataset" DROP CONSTRAINT "ai_dataset_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ai_analysis" DROP CONSTRAINT "ai_analysis_datasetId_fkey";

-- DropForeignKey
ALTER TABLE "ai_analysis" DROP CONSTRAINT "ai_analysis_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "ai_analysis" DROP CONSTRAINT "ai_analysis_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ai_analysis_chart" DROP CONSTRAINT "ai_analysis_chart_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "ai_analysis_query" DROP CONSTRAINT "ai_analysis_query_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "ai_analysis_query" DROP CONSTRAINT "ai_analysis_query_userId_fkey";

-- DropForeignKey
ALTER TABLE "audience_attribute_suggestion" DROP CONSTRAINT "audience_attribute_suggestion_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "audience_attribute_suggestion" DROP CONSTRAINT "audience_attribute_suggestion_missionId_fkey";

-- DropForeignKey
ALTER TABLE "audience_attribute_suggestion" DROP CONSTRAINT "audience_attribute_suggestion_createdById_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_mission_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_survey_response_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_resolved_by_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_mention" DROP CONSTRAINT "comment_mention_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_mention" DROP CONSTRAINT "comment_mention_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_event" DROP CONSTRAINT "comment_event_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "comment_event" DROP CONSTRAINT "comment_event_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "contributor_data" DROP CONSTRAINT "contributor_data_missionId_fkey";

-- DropForeignKey
ALTER TABLE "contributor_data" DROP CONSTRAINT "contributor_data_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ConsultedSuperAdminMissions" DROP CONSTRAINT "_ConsultedSuperAdminMissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConsultedSuperAdminMissions" DROP CONSTRAINT "_ConsultedSuperAdminMissions_B_fkey";

-- DropIndex
DROP INDEX "temp_mission_missionId_key";

-- DropIndex
DROP INDEX "mission_assignment_missionId_contributorId_key";

-- DropIndex
DROP INDEX "audience_attribute_key_key";

-- DropIndex
DROP INDEX "audience_attribute_category_idx";

-- DropIndex
DROP INDEX "audience_attribute_active_idx";

-- DropIndex
DROP INDEX "contributor_attribute_value_userId_idx";

-- DropIndex
DROP INDEX "contributor_attribute_value_attributeId_idx";

-- DropIndex
DROP INDEX "contributor_attribute_value_attributeId_userId_key";

-- DropIndex
DROP INDEX "reward_config_status_idx";

-- DropIndex
DROP INDEX "reward_config_type_idx";

-- DropIndex
DROP INDEX "reward_history_userId_idx";

-- DropIndex
DROP INDEX "reward_history_rewardConfigId_idx";

-- DropIndex
DROP INDEX "reward_history_awardedAt_idx";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "balance" BIGINT,
ADD COLUMN     "banExpires" TIMESTAMP(6),
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "code_invitation" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" DROP DEFAULT,
DROP COLUMN "kyc_status",
ADD COLUMN     "kyc_status" "KycSatus" DEFAULT 'in_progress',
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "status" SET DEFAULT 'inactive',
ALTER COLUMN "status" SET DATA TYPE VARCHAR,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "member" DROP COLUMN "updatedAt",
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "template" ALTER COLUMN "internal" SET DEFAULT true,
ALTER COLUMN "status" SET DATA TYPE VARCHAR,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "mission" DROP COLUMN "enrichmentAttributes",
DROP COLUMN "image",
DROP COLUMN "isEnrichmentMission",
DROP COLUMN "mode",
DROP COLUMN "preliminaryRecommendations",
DROP COLUMN "sampleSummary",
DROP COLUMN "studyStructure",
DROP COLUMN "targetSampleSize",
DROP COLUMN "workspaceId",
ALTER COLUMN "status" SET DEFAULT 'draft',
ALTER COLUMN "status" SET DATA TYPE VARCHAR,
ALTER COLUMN "type" SET DEFAULT 'survey',
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "publishAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "isPublic" DROP NOT NULL,
ALTER COLUMN "isSuperAdminMission" DROP NOT NULL,
ALTER COLUMN "executiveSummaryUpdatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "mission_config_contributor" ALTER COLUMN "gain" SET DATA TYPE BIGINT,
ALTER COLUMN "duration" SET DATA TYPE BIGINT,
ALTER COLUMN "deadline" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "survey" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "survey_response" ALTER COLUMN "age" SET DEFAULT 18,
ALTER COLUMN "age" SET DATA TYPE SMALLINT,
ALTER COLUMN "gender" SET DEFAULT 'male',
ALTER COLUMN "gender" SET DATA TYPE VARCHAR,
ALTER COLUMN "submittedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "organizationId" SET NOT NULL,
ALTER COLUMN "backgroundColor" DROP NOT NULL,
ALTER COLUMN "titleColor" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "lastSnapshotSentAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "dashboard_filter" ALTER COLUMN "onReport" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "project_role" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "chart" ALTER COLUMN "chartDataUpdated" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "dataLabels" DROP NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "endDate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "lastAutoUpdate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "draft" DROP NOT NULL,
ALTER COLUMN "onReport" DROP NOT NULL,
ALTER COLUMN "xLabelTicks" DROP NOT NULL,
ALTER COLUMN "xLabelTicks" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "stacked" DROP NOT NULL,
ALTER COLUMN "horizontal" DROP NOT NULL,
ALTER COLUMN "showGrowth" DROP NOT NULL,
ALTER COLUMN "invertGrowth" DROP NOT NULL,
DROP COLUMN "snapshotToken",
ADD COLUMN     "snapshotToken" UUID DEFAULT gen_random_uuid(),
ALTER COLUMN "isLogarithmic" DROP NOT NULL,
ALTER COLUMN "dashedLastPoint" DROP NOT NULL;

-- AlterTable
ALTER TABLE "chart_share" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "dataset" ALTER COLUMN "yAxisOperation" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "variable" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "chart_dataset_config" ALTER COLUMN "pointRadius" SET DATA TYPE BIGINT,
ALTER COLUMN "order" SET DATA TYPE BIGINT,
ALTER COLUMN "maxRecords" SET DATA TYPE BIGINT,
ALTER COLUMN "goal" SET DATA TYPE BIGINT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "sub_dashboard" DROP CONSTRAINT "sub_dashboard_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "sub_dashboard_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sub_dashboard_item" DROP CONSTRAINT "sub_dashboard_item_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "subDashboardId",
ADD COLUMN     "subDashboardId" UUID NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "sub_dashboard_item_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "subscription_plan" ADD COLUMN     "addOn" SMALLINT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "temp_mission" RENAME CONSTRAINT "temp_mission_pkey" TO "mission_duplication_pkey",
ALTER COLUMN "isPublic" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "missionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "temp_sub_dashboard" DROP COLUMN "tempMissionId",
ADD COLUMN     "missionDuplicationId" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "temp_sub_dashboard_item" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "consulted_mission" DROP CONSTRAINT "consulted_mission_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "consultedAt" DROP NOT NULL,
ALTER COLUMN "consultedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "consulted_mission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "billing_info" DROP CONSTRAINT "billing_info_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ADD CONSTRAINT "billing_info_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "validation_comment" ALTER COLUMN "id" SET DEFAULT (gen_random_uuid())::text,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "validatorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "mission_chart" ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "created_at",
DROP COLUMN "created_by_id",
DROP COLUMN "deleted_at",
DROP COLUMN "edited_at",
DROP COLUMN "mission_id",
DROP COLUMN "parent_id",
DROP COLUMN "question_key",
DROP COLUMN "resolved_at",
DROP COLUMN "resolved_by_id",
DROP COLUMN "status",
DROP COLUMN "survey_id",
DROP COLUMN "survey_response_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subDashboardItemId" UUID NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "contributor_data" ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "key" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "questionType" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "workspace";

-- DropTable
DROP TABLE "workspace_member";

-- DropTable
DROP TABLE "workspace_invitation";

-- DropTable
DROP TABLE "ai_dataset";

-- DropTable
DROP TABLE "ai_analysis";

-- DropTable
DROP TABLE "ai_analysis_chart";

-- DropTable
DROP TABLE "ai_analysis_query";

-- DropTable
DROP TABLE "audience_attribute_suggestion";

-- DropTable
DROP TABLE "comment_mention";

-- DropTable
DROP TABLE "comment_event";

-- DropTable
DROP TABLE "_ConsultedSuperAdminMissions";

-- DropEnum
DROP TYPE "KycStatus";

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(6),
    "refreshTokenExpiresAt" TIMESTAMP(6),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mission_permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "missionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "grantedBy" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mission_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payemts_contibutor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" BIGINT DEFAULT 0,
    "type" TEXT,
    "method" VARCHAR,
    "other" JSON,
    "updated_at" DATE,
    "user_id" TEXT,

    CONSTRAINT "payemts_contibutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_problems" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "activeOrganizationId" TEXT,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support" (
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT,
    "type" VARCHAR,
    "priority" VARCHAR,
    "subject" TEXT,
    "userId" TEXT,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "support_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_ticket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mission_permission_missionId_userId_key" ON "mission_permission"("missionId" ASC, "userId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "mission_permission_missionid_userid_key" ON "mission_permission"("missionId" ASC, "userId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "payemts_contibutor_user_id_key" ON "payemts_contibutor"("user_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "user_codeInvitation_key" ON "user"("code_invitation" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug" ASC);

-- CreateIndex
CREATE INDEX "mission_duplication_createdAt_idx" ON "temp_mission"("createdAt" ASC);

-- CreateIndex
CREATE INDEX "mission_duplication_missionId_idx" ON "temp_mission"("missionId" ASC);

-- CreateIndex
CREATE INDEX "mission_duplication_validationStatus_idx" ON "temp_mission"("validationStatus" ASC);

-- CreateIndex
CREATE INDEX "temp_sub_dashboard_missionDuplicationId_idx" ON "temp_sub_dashboard"("missionDuplicationId" ASC);

-- CreateIndex
CREATE INDEX "temp_sub_dashboard_item_tempSubDashboardId_idx" ON "temp_sub_dashboard_item"("tempSubDashboardId" ASC);

-- CreateIndex
CREATE INDEX "mission_chart_dashboardOrder_idx" ON "mission_chart"("dashboardOrder" ASC);

-- CreateIndex
CREATE INDEX "mission_chart_missionId_idx" ON "mission_chart"("missionId" ASC);

-- CreateIndex
CREATE INDEX "mission_chart_status_idx" ON "mission_chart"("status" ASC);

-- CreateIndex
CREATE INDEX "mission_chart_surveyId_idx" ON "mission_chart"("surveyId" ASC);

-- CreateIndex
CREATE INDEX "idx_contributor_data_mission_user" ON "contributor_data"("missionId" ASC, "userId" ASC);

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billing_info" ADD CONSTRAINT "billing_info_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chart" ADD CONSTRAINT "fk_chart_project" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chart_dataset_config" ADD CONSTRAINT "chart_dataset_config_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "chart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chart_dataset_config" ADD CONSTRAINT "chart_dataset_config_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "dataset"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chart_share" ADD CONSTRAINT "chart_share_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "chart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_subDashboardItemId_fkey" FOREIGN KEY ("subDashboardItemId") REFERENCES "sub_dashboard_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulted_mission" ADD CONSTRAINT "consulted_mission_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulted_mission" ADD CONSTRAINT "consulted_mission_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contributor_data" ADD CONSTRAINT "contributor_data_missionid_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contributor_data" ADD CONSTRAINT "contributor_data_userid_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dashboard_filter" ADD CONSTRAINT "dashboard_filter_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "dataset_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "chart"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "dataset_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission" ADD CONSTRAINT "mission_organization_id_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_assignment" ADD CONSTRAINT "mission_assignment_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_assignment" ADD CONSTRAINT "mission_assignment_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_config_contributor" ADD CONSTRAINT "mission_config_contributor_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_permission" ADD CONSTRAINT "mission_permission_grantedBy_fkey" FOREIGN KEY ("grantedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_permission" ADD CONSTRAINT "mission_permission_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_permission" ADD CONSTRAINT "mission_permission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payemts_contibutor" ADD CONSTRAINT "payemts_contibutor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_role" ADD CONSTRAINT "project_role_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_role" ADD CONSTRAINT "project_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_dashboard" ADD CONSTRAINT "sub_dashboard_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_dashboard" ADD CONSTRAINT "sub_dashboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_dashboard_item" ADD CONSTRAINT "sub_dashboard_item_subDashboardId_fkey" FOREIGN KEY ("subDashboardId") REFERENCES "sub_dashboard"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support" ADD CONSTRAINT "support_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey" ADD CONSTRAINT "survey_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey_response" ADD CONSTRAINT "survey_response_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey_response" ADD CONSTRAINT "survey_response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "temp_mission" ADD CONSTRAINT "mission_duplication_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temp_sub_dashboard" ADD CONSTRAINT "temp_sub_dashboard_missionDuplicationId_fkey" FOREIGN KEY ("missionDuplicationId") REFERENCES "temp_mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "validation_comment" ADD CONSTRAINT "validation_comment_surveyResponseId_fkey" FOREIGN KEY ("surveyResponseId") REFERENCES "survey_response"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "validation_comment" ADD CONSTRAINT "validation_comment_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "variable" ADD CONSTRAINT "variable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER INDEX "consulted_mission_organizationId_missionId_key" RENAME TO "consulted_mission_unique";

-- RenameIndex
ALTER INDEX "contributor_data_key_idx" RENAME TO "idx_contributor_data_key";

-- RenameIndex
ALTER INDEX "contributor_data_missionId_idx" RENAME TO "idx_contributor_data_mission_id";

-- RenameIndex
ALTER INDEX "contributor_data_userId_idx" RENAME TO "idx_contributor_data_user_id";

-- RenameIndex
ALTER INDEX "contributor_data_missionId_userId_key_key" RENAME TO "contributor_data_missionid_userid_key_key";

