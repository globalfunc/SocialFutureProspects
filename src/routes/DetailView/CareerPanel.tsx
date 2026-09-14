import { useTranslation } from "react-i18next";
import type { ProspectView } from "../../hooks/useProspects.js";

export function CareerPanel({ prospect: p }: { prospect: ProspectView }) {
  const { t } = useTranslation();
  const isDnc = p.matchRating <= 1;

  return (
    <div>
      {!isDnc && (
        <p className="my-5 border-l-2 border-accent pl-4 font-serif text-[19px] italic leading-relaxed">
          “{p.pwdAtRelevance}”
        </p>
      )}
      {isDnc && <p className="mb-3.5">{p.pwdAtRelevance}</p>}

      <h3 className="mt-6 mb-2 font-serif text-[19px] font-medium">
        {t("detail.career.backgroundHeading")}
      </h3>
      <p className="mb-3.5">{p.careerBackground}</p>

      <h3 className="mt-6 mb-2 font-serif text-[19px] font-medium">
        {t("detail.career.reputationHeading")}
      </h3>
      <p className="mb-3.5">{p.reputationActivity}</p>

      <h3 className="mt-6 mb-2 font-serif text-[19px] font-medium">
        {t("detail.career.speakingHeading")}
      </h3>
      <p className="mb-3.5">{p.priorPublicSpeaking}</p>
    </div>
  );
}
