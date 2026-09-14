import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProspects } from "../../hooks/useProspects.js";
import { useUnlock } from "../../context/UnlockContext.js";
import { InitialsAvatar } from "../../components/InitialsAvatar.js";
import { IconToggle } from "../../components/IconToggle.js";
import { Tablist, type TabDef } from "../../components/Tablist.js";
import { TabPanel } from "../../components/TabPanel.js";
import { OverviewPanel } from "./OverviewPanel.js";
import { CareerPanel } from "./CareerPanel.js";
import { ContactPanel } from "./ContactPanel.js";
import { EmailPanel } from "./EmailPanel.js";

function formatTz(tzDiffHours: number): string {
  const sign = tzDiffHours > 0 ? "+" : tzDiffHours < 0 ? "−" : "";
  return `${sign}${Math.abs(tzDiffHours)}h`;
}

export function DetailView() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { getById, loading, setVerified, setFavourite, setOutreachStatus } = useProspects();
  const { unlocked } = useUnlock();
  const [activeTab, setActiveTab] = useState("overview");
  const nameHeadingRef = useRef<HTMLHeadingElement>(null);

  const prospect = id ? getById(id) : undefined;

  useEffect(() => {
    nameHeadingRef.current?.focus();
  }, [id]);

  if (loading) return null;

  if (!prospect) {
    return (
      <div className="py-16 text-center text-ink-soft">
        <p>{t("table.emptyState")}</p>
        <Link to="/" className="mt-3 inline-block font-semibold text-accent hover:underline">
          {t("detail.backToIndex")}
        </Link>
      </div>
    );
  }

  const isDnc = prospect.matchRating <= 1;
  const tabs: TabDef[] = [
    { key: "overview", label: t("detail.tabOverview") },
    { key: "career", label: t("detail.tabCareer") },
    { key: "contact", label: t("detail.tabContact") },
    { key: "email", label: t("detail.tabEmail"), disabled: isDnc },
  ];

  return (
    <div>
      <div className="flex items-center gap-2.5 border border-dashed border-line bg-paper-raised px-3.5 py-3 mt-4.5 mb-1.5 text-[12.5px] text-ink-soft">
        <Link to="/" className="font-semibold text-accent hover:underline">
          ← {t("detail.backToIndex")}
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-11 py-7 pb-14 md:grid-cols-[260px_1fr]">
        <aside aria-label={t("detail.quickFacts")} className="flex flex-col gap-4.5 md:sticky md:top-5">
          <InitialsAvatar name={prospect.name} photoPath={prospect.photoPath} />
          <div className="flex flex-col gap-2">
            <IconToggle
              pressed={prospect.verified}
              onLabel={t("table.verified")}
              offLabel={t("table.markVerified")}
              onToggle={() => void setVerified(prospect.id, !prospect.verified)}
              locked={!unlocked}
              pending={prospect.pendingField === "verified"}
            />
            <IconToggle
              pressed={prospect.favourite}
              onLabel={t("table.favourited")}
              offLabel={t("table.addFavourite")}
              onToggle={() => void setFavourite(prospect.id, !prospect.favourite)}
              locked={!unlocked}
              pending={prospect.pendingField === "favourite"}
              variant="favourite"
            />
          </div>
          <dl className="flex flex-col border-t border-line">
            <Fact label={t("detail.factRating")}>
              {prospect.matchRating} — {t(`ratingLabel.${prospect.matchRating}`)}
            </Fact>
            <Fact label={t("detail.factCountry")}>{prospect.country}</Fact>
            <Fact label={t("detail.factTimezone")}>
              {prospect.tzDiffHours === null ? t("table.tzUnresolvedBadge") : formatTz(prospect.tzDiffHours)}
            </Fact>
            <Fact label={t("detail.factStatus")}>
              {prospect.status === "existing" ? t("detail.statusExisting") : t("detail.statusNew")}
            </Fact>
          </dl>
        </aside>

        <div>
          <h2
            ref={nameHeadingRef}
            tabIndex={-1}
            className="mb-1.5 font-serif text-[clamp(32px,4vw,46px)] font-medium leading-[1.05]"
          >
            {prospect.name}
          </h2>
          <p className="mb-5 max-w-[60ch] text-[15px] text-ink-soft">
            {prospect.roleOrganization} — <span className="italic">{prospect.occupation}</span>
          </p>

          <Tablist tabs={tabs} activeKey={activeTab} onChange={setActiveTab} ariaLabel={t("detail.tablistLabel")} />

          <TabPanel tabKey="overview" active={activeTab === "overview"}>
            <OverviewPanel prospect={prospect} />
          </TabPanel>
          <TabPanel tabKey="career" active={activeTab === "career"}>
            <CareerPanel prospect={prospect} />
          </TabPanel>
          <TabPanel tabKey="contact" active={activeTab === "contact"}>
            <ContactPanel prospect={prospect} onOutreachChange={(v) => void setOutreachStatus(prospect.id, v)} />
          </TabPanel>
          <TabPanel tabKey="email" active={activeTab === "email"}>
            <EmailPanel prospect={prospect} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3 border-b border-line py-2.5 text-[12.5px]">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="m-0 text-right font-mono">{children}</dd>
    </div>
  );
}
