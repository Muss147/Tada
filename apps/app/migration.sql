-- CreateEnum
CREATE TYPE "KycSatus" AS ENUM ('in_progress', 'completed', 'canceled');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('system_admin', 'client_admin', 'contributor', 'validator');

-- CreateEnum
CREATE TYPE "AdminSubRole" AS ENUM ('super_admin', 'operations_admin', 'customer_admin', 'content_moderator', 'finance_admin', 'auditor');

-- CreateEnum
CREATE TYPE "QualityIssueLevel" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "QualityIssueType" AS ENUM ('response_consistency', 'media_quality', 'geographic_validity', 'temporal_integrity', 'data_completeness', 'suspicious_pattern');

-- CreateEnum
CREATE TYPE "QualityStatus" AS ENUM ('pending', 'analyzing', 'accepted', 'review_required', 'rejected');

-- CreateEnum
CREATE TYPE "ValidationAction" AS ENUM ('approved', 'rejected', 'pending');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('credits', 'badge', 'bonus', 'discount');

-- CreateEnum
CREATE TYPE "RewardStatus" AS ENUM ('active', 'inactive', 'expired');

-- DropForeignKey
ALTER TABLE "billing_info" DROP CONSTRAINT "billing_info_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "chart" DROP CONSTRAINT "chart_projectId_fkey";

-- DropForeignKey
ALTER TABLE "chart_share" DROP CONSTRAINT "chart_share_chartId_fkey";

-- DropForeignKey
ALTER TABLE "consulted_mission" DROP CONSTRAINT "consulted_mission_missionId_fkey";

-- DropForeignKey
ALTER TABLE "consulted_mission" DROP CONSTRAINT "consulted_mission_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "dashboard_filter" DROP CONSTRAINT "dashboard_filter_projectId_fkey";

-- DropForeignKey
ALTER TABLE "dataset" DROP CONSTRAINT "dataset_chartId_fkey";

-- DropForeignKey
ALTER TABLE "dataset" DROP CONSTRAINT "dataset_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "mission_assignment" DROP CONSTRAINT "mission_assignment_contributorId_fkey";

-- DropForeignKey
ALTER TABLE "mission_assignment" DROP CONSTRAINT "mission_assignment_missionId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_missionId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "project_role" DROP CONSTRAINT "project_role_projectId_fkey";

-- DropForeignKey
ALTER TABLE "project_role" DROP CONSTRAINT "project_role_userId_fkey";

-- DropForeignKey
ALTER TABLE "sub_dashboard" DROP CONSTRAINT "sub_dashboard_missionId_fkey";

-- DropForeignKey
ALTER TABLE "support" DROP CONSTRAINT "support_userId_fkey";

-- DropForeignKey
ALTER TABLE "survey" DROP CONSTRAINT "survey_missionId_fkey";

-- DropForeignKey
ALTER TABLE "survey_response" DROP CONSTRAINT "survey_response_surveyId_fkey";

-- DropForeignKey
ALTER TABLE "temp_mission" DROP CONSTRAINT "temp_mission_missionId_fkey";

-- DropForeignKey
ALTER TABLE "template" DROP CONSTRAINT "template_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "variable" DROP CONSTRAINT "variable_projectId_fkey";

-- AlterTable
ALTER TABLE "billing_info" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
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
ALTER TABLE "chart_dataset_config" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "pointRadius" SET DATA TYPE BIGINT,
ALTER COLUMN "order" SET DATA TYPE BIGINT,
ALTER COLUMN "maxRecords" SET DATA TYPE BIGINT,
ALTER COLUMN "goal" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "chart_share" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "consulted_mission" ALTER COLUMN "consultedAt" DROP NOT NULL,
ALTER COLUMN "consultedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "dashboard_filter" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "dataset" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "mission" ADD COLUMN     "isPublish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishAt" TIMESTAMPTZ(6),
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "status" SET DEFAULT '''draft''::character varying',
ALTER COLUMN "status" SET DATA TYPE VARCHAR,
ALTER COLUMN "type" SET DEFAULT 'survey',
ALTER COLUMN "isPublic" DROP NOT NULL,
ALTER COLUMN "isSuperAdminMission" DROP NOT NULL,
ALTER COLUMN "executiveSummaryUpdatedAt" SET DATA TYPE TIMESTAMP(6);

-- 1. Supprimer l’ancienne PK (si elle existe)
ALTER TABLE "mission_permission"
DROP CONSTRAINT IF EXISTS "mission_permission_pkey";

-- 2. Remplir les valeurs manquantes dans la colonne id
UPDATE "mission_permission"
SET "id" = gen_random_uuid()
WHERE "id" IS NULL;

-- 3. Rendre la colonne NOT NULL
ALTER TABLE "mission_permission"
ALTER COLUMN "id" SET NOT NULL;

-- 4. Mettre à jour grantedAt si nécessaire
ALTER TABLE "mission_permission"
ALTER COLUMN "grantedAt" SET DATA TYPE TIMESTAMP(6);

-- 5. Créer la nouvelle PK
ALTER TABLE "mission_permission"
ADD CONSTRAINT "mission_permission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "status" SET DEFAULT 'inactive',
ALTER COLUMN "status" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "backgroundColor" DROP NOT NULL,
ALTER COLUMN "titleColor" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "lastSnapshotSentAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "project_role" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "sub_dashboard" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "sub_dashboard_item" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "subscription_plan" ALTER COLUMN "addOn" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "support" DROP CONSTRAINT "support_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "priority" SET DATA TYPE VARCHAR,
ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ADD CONSTRAINT "support_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "survey" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "survey_response" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "age" SET DEFAULT 18,
ALTER COLUMN "age" SET DATA TYPE SMALLINT,
ALTER COLUMN "gender" SET DEFAULT 'male',
ALTER COLUMN "gender" SET DATA TYPE VARCHAR,
ALTER COLUMN "submittedAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "temp_mission" ALTER COLUMN "isPublic" DROP NOT NULL,
ALTER COLUMN "missionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "template" ALTER COLUMN "internal" SET DEFAULT true,
ALTER COLUMN "status" SET DATA TYPE VARCHAR,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "adminSubRole" "AdminSubRole",
ADD COLUMN     "balance" BIGINT,
ADD COLUMN     "banExpires" TIMESTAMP(6),
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banned" BOOLEAN,
ADD COLUMN     "code_invitation" TEXT,
ADD COLUMN     "job" TEXT,
ADD COLUMN     "kyc_status" "KycSatus" DEFAULT 'in_progress',
ADD COLUMN     "location" TEXT,
ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6),
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole";

-- AlterTable
ALTER TABLE "variable" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(6);

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
CREATE TABLE "contributor_data" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "key" VARCHAR(100) NOT NULL,
    "value" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionType" VARCHAR(50),
    "originalQuestion" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contributor_data_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "comment" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "subDashboardItemId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "report_problems" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_problems_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "feedback_entry" (
    "id" TEXT NOT NULL,
    "qualityControlId" TEXT NOT NULL,
    "feedbackType" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "originalDecision" TEXT,
    "correctedDecision" TEXT,
    "explanation" TEXT,
    "providedBy" TEXT,
    "confidence" DOUBLE PRECISION,
    "impactOnModel" BOOLEAN NOT NULL DEFAULT false,
    "applied" BOOLEAN NOT NULL DEFAULT false,
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_entry_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "quality_analysis_log" (
    "id" TEXT NOT NULL,
    "batchId" TEXT,
    "surveyResponseId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "analyzer" TEXT NOT NULL,
    "analyzerVersion" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "promptTokensUsed" INTEGER,
    "responseTokensUsed" INTEGER,
    "cost" DOUBLE PRECISION,
    "configSnapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quality_analysis_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_configuration" (
    "id" TEXT NOT NULL,
    "configType" TEXT NOT NULL,
    "configName" TEXT NOT NULL,
    "configValue" JSONB NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "activatedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quality_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_control" (
    "id" TEXT NOT NULL,
    "surveyResponseId" TEXT NOT NULL,
    "status" "QualityStatus" NOT NULL DEFAULT 'pending',
    "overallScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "consistencyScore" DOUBLE PRECISION,
    "mediaScore" DOUBLE PRECISION,
    "geoScore" DOUBLE PRECISION,
    "temporalScore" DOUBLE PRECISION,
    "completenessScore" DOUBLE PRECISION,
    "analyzedAt" TIMESTAMP(3),
    "analyzer" TEXT,
    "analyzerVersion" TEXT,
    "summary" TEXT,
    "recommendations" JSONB,
    "decision" TEXT,
    "decisionReason" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quality_control_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_issue" (
    "id" TEXT NOT NULL,
    "qualityControlId" TEXT NOT NULL,
    "type" "QualityIssueType" NOT NULL,
    "level" "QualityIssueLevel" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fieldPath" TEXT,
    "expectedValue" TEXT,
    "actualValue" TEXT,
    "impactScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "suggestions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quality_issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_metric" (
    "id" TEXT NOT NULL,
    "qualityControlId" TEXT NOT NULL,
    "metricName" TEXT NOT NULL,
    "metricType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "description" TEXT,
    "category" TEXT,
    "subcategory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quality_metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_pattern" (
    "id" TEXT NOT NULL,
    "patternName" TEXT NOT NULL,
    "patternType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rules" JSONB NOT NULL,
    "threshold" DOUBLE PRECISION,
    "severity" "QualityIssueLevel" NOT NULL,
    "detectionCount" INTEGER NOT NULL DEFAULT 0,
    "falsePositiveRate" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quality_pattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audience_attribute" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "enrichmentOnly" BOOLEAN NOT NULL DEFAULT false,
    "options" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audience_attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contributor_attribute_value" (
    "id" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contributor_attribute_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_config" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "RewardType" NOT NULL,
    "trigger" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "status" "RewardStatus" NOT NULL DEFAULT 'active',
    "conditions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reward_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardConfigId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT,
    "metadata" JSONB,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mission_config_contributor" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gain" BIGINT NOT NULL,
    "duration" BIGINT NOT NULL,
    "missionId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "deadline" TIMESTAMPTZ(6),

    CONSTRAINT "mission_config_contributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validation_comment" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "comment" TEXT NOT NULL,
    "action" "ValidationAction" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatorId" TEXT,
    "surveyResponseId" TEXT,

    CONSTRAINT "validation_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_contributor_data_key" ON "contributor_data"("key");

-- CreateIndex
CREATE INDEX "idx_contributor_data_mission_id" ON "contributor_data"("missionId");

-- CreateIndex
CREATE INDEX "idx_contributor_data_mission_user" ON "contributor_data"("missionId", "userId");

-- CreateIndex
CREATE INDEX "idx_contributor_data_user_id" ON "contributor_data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contributor_data_missionid_userid_key_key" ON "contributor_data"("missionId", "userId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "payemts_contibutor_user_id_key" ON "payemts_contibutor"("user_id");

-- CreateIndex
CREATE INDEX "quality_analysis_log_analyzer_analyzerVersion_idx" ON "quality_analysis_log"("analyzer", "analyzerVersion");

-- CreateIndex
CREATE INDEX "quality_analysis_log_batchId_idx" ON "quality_analysis_log"("batchId");

-- CreateIndex
CREATE INDEX "quality_analysis_log_surveyResponseId_idx" ON "quality_analysis_log"("surveyResponseId");

-- CreateIndex
CREATE UNIQUE INDEX "quality_configuration_configType_configName_version_key" ON "quality_configuration"("configType", "configName", "version");

-- CreateIndex
CREATE UNIQUE INDEX "quality_control_surveyResponseId_key" ON "quality_control"("surveyResponseId");

-- CreateIndex
CREATE INDEX "quality_metric_metricName_metricType_idx" ON "quality_metric"("metricName", "metricType");

-- CreateIndex
CREATE UNIQUE INDEX "quality_pattern_patternName_key" ON "quality_pattern"("patternName");

-- CreateIndex
CREATE UNIQUE INDEX "audience_attribute_key_key" ON "audience_attribute"("key");

-- CreateIndex
CREATE INDEX "audience_attribute_category_idx" ON "audience_attribute"("category");

-- CreateIndex
CREATE INDEX "audience_attribute_active_idx" ON "audience_attribute"("active");

-- CreateIndex
CREATE INDEX "contributor_attribute_value_userId_idx" ON "contributor_attribute_value"("userId");

-- CreateIndex
CREATE INDEX "contributor_attribute_value_attributeId_idx" ON "contributor_attribute_value"("attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "contributor_attribute_value_attributeId_userId_key" ON "contributor_attribute_value"("attributeId", "userId");

-- CreateIndex
CREATE INDEX "reward_config_status_idx" ON "reward_config"("status");

-- CreateIndex
CREATE INDEX "reward_config_type_idx" ON "reward_config"("type");

-- CreateIndex
CREATE INDEX "reward_history_userId_idx" ON "reward_history"("userId");

-- CreateIndex
CREATE INDEX "reward_history_rewardConfigId_idx" ON "reward_history"("rewardConfigId");

-- CreateIndex
CREATE INDEX "reward_history_awardedAt_idx" ON "reward_history"("awardedAt");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_codeInvitation_key" ON "user"("code_invitation");

-- AddForeignKey
ALTER TABLE "mission_assignment" ADD CONSTRAINT "mission_assignment_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_assignment" ADD CONSTRAINT "mission_assignment_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey" ADD CONSTRAINT "survey_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey_response" ADD CONSTRAINT "survey_response_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey_response" ADD CONSTRAINT "survey_response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_role" ADD CONSTRAINT "project_role_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_role" ADD CONSTRAINT "project_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chart" ADD CONSTRAINT "fk_chart_project" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chart_share" ADD CONSTRAINT "chart_share_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "chart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "dataset_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "chart"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "dataset_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "variable" ADD CONSTRAINT "variable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sub_dashboard" ADD CONSTRAINT "sub_dashboard_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "temp_mission" ADD CONSTRAINT "mission_duplication_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulted_mission" ADD CONSTRAINT "consulted_mission_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consulted_mission" ADD CONSTRAINT "consulted_mission_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billing_info" ADD CONSTRAINT "billing_info_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dashboard_filter" ADD CONSTRAINT "dashboard_filter_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support_ticket" ADD CONSTRAINT "support_ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributor_data" ADD CONSTRAINT "contributor_data_missionid_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contributor_data" ADD CONSTRAINT "contributor_data_userid_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_subDashboardItemId_fkey" FOREIGN KEY ("subDashboardItemId") REFERENCES "sub_dashboard_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "support" ADD CONSTRAINT "support_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback_entry" ADD CONSTRAINT "feedback_entry_qualityControlId_fkey" FOREIGN KEY ("qualityControlId") REFERENCES "quality_control"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payemts_contibutor" ADD CONSTRAINT "payemts_contibutor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quality_control" ADD CONSTRAINT "quality_control_surveyResponseId_fkey" FOREIGN KEY ("surveyResponseId") REFERENCES "survey_response"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality_issue" ADD CONSTRAINT "quality_issue_qualityControlId_fkey" FOREIGN KEY ("qualityControlId") REFERENCES "quality_control"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality_metric" ADD CONSTRAINT "quality_metric_qualityControlId_fkey" FOREIGN KEY ("qualityControlId") REFERENCES "quality_control"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributor_attribute_value" ADD CONSTRAINT "contributor_attribute_value_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "audience_attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributor_attribute_value" ADD CONSTRAINT "contributor_attribute_value_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reward_history" ADD CONSTRAINT "reward_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reward_history" ADD CONSTRAINT "reward_history_rewardConfigId_fkey" FOREIGN KEY ("rewardConfigId") REFERENCES "reward_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mission_config_contributor" ADD CONSTRAINT "mission_config_contributor_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "validation_comment" ADD CONSTRAINT "validation_comment_surveyResponseId_fkey" FOREIGN KEY ("surveyResponseId") REFERENCES "survey_response"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "validation_comment" ADD CONSTRAINT "validation_comment_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

