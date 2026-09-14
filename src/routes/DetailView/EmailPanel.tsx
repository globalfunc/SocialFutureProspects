import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ProspectView } from "../../hooks/useProspects.js";
import { generateEmail } from "../../email/generateEmail.js";
import { useAnnounce } from "../../context/AnnounceContext.js";
import { EmailField } from "../../components/EmailField.js";
import { useUnlock } from "../../context/UnlockContext.js";

type EmailLang = "en" | "bg";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

interface EmailPanelProps {
  prospect: ProspectView;
  onEmailChange: (value: string | null) => void;
}

export function EmailPanel({ prospect: p, onEmailChange }: EmailPanelProps) {
  const { t } = useTranslation();
  const announce = useAnnounce();
  const { unlocked } = useUnlock();
  const isDnc = p.matchRating <= 1;
  // Independent of the global UI-chrome language toggle (design.md §2):
  // someone reviewing in English chrome may still need the Bulgarian
  // version to send, and vice versa.
  const [emailLang, setEmailLang] = useState<EmailLang>("en");

  const email = useMemo(() => generateEmail(p, emailLang), [p, emailLang]);

  if (isDnc) {
    return (
      <div className="max-w-[60ch] border border-danger/45 bg-danger/10 p-4.5">
        <p className="mb-1.5 flex items-center gap-2 font-bold text-danger">
          <span aria-hidden="true">⛔</span> {t("detail.email.dncHeading")}
        </p>
        <p>{t("detail.email.dncBody", { rating: p.matchRating })}</p>
      </div>
    );
  }

  const handleCopy = async (which: "subject" | "body" | "both") => {
    const text =
      which === "subject" ? email.subject : which === "body" ? email.body : `${email.subject}\n\n${email.body}`;
    const ok = await copyText(text);
    if (!ok) {
      announce(t("announce.copyFailed"));
      return;
    }
    announce(
      t(which === "subject" ? "announce.copiedSubject" : which === "body" ? "announce.copiedBody" : "announce.copiedBoth"),
    );
  };

  return (
    <div>
      <EmailField
        id={p.id}
        value={p.email}
        locked={!unlocked}
        pending={p.pendingField === "email"}
        onSave={onEmailChange}
        label={t("detail.contact.emailLabel")}
        className="mb-4.5 max-w-[320px]"
      />

      <div role="group" aria-label={t("detail.email.languageGroupLabel")} className="mb-4.5 flex gap-2">
        <button
          type="button"
          aria-pressed={emailLang === "en"}
          onClick={() => setEmailLang("en")}
          className={`rounded-sm border px-2.5 py-1.5 text-xs font-medium ${
            emailLang === "en" ? "border-ink bg-ink text-paper" : "border-line bg-paper-raised text-ink-soft"
          }`}
        >
          {t("chrome.english")}
        </button>
        <button
          type="button"
          aria-pressed={emailLang === "bg"}
          onClick={() => setEmailLang("bg")}
          className={`rounded-sm border px-2.5 py-1.5 text-xs font-medium ${
            emailLang === "bg" ? "border-ink bg-ink text-paper" : "border-line bg-paper-raised text-ink-soft"
          }`}
        >
          {t("chrome.bulgarian")}
        </button>
      </div>

      <div className="mb-4.5 max-w-[62ch]">
        <label htmlFor="email-subject" className="mb-1.5 block text-xs font-semibold text-ink-soft">
          {t("detail.email.subjectLabel")}
        </label>
        <textarea
          id="email-subject"
          readOnly
          rows={2}
          value={email.subject}
          className="w-full resize-y border border-line bg-paper-raised p-3 text-[13.5px] leading-relaxed"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void handleCopy("subject")}
            className="rounded-sm border border-line bg-paper-raised px-2.5 py-1.5 text-xs font-medium hover:border-ink-soft"
          >
            {t("detail.email.copySubject")}
          </button>
        </div>
      </div>

      <div className="mb-4.5 max-w-[62ch]">
        <label htmlFor="email-body" className="mb-1.5 block text-xs font-semibold text-ink-soft">
          {t("detail.email.bodyLabel")}
        </label>
        <textarea
          id="email-body"
          readOnly
          rows={14}
          value={email.body}
          className="w-full resize-y border border-line bg-paper-raised p-3 text-[13.5px] leading-relaxed"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void handleCopy("body")}
            className="rounded-sm border border-line bg-paper-raised px-2.5 py-1.5 text-xs font-medium hover:border-ink-soft"
          >
            {t("detail.email.copyBody")}
          </button>
          <button
            type="button"
            onClick={() => void handleCopy("both")}
            className="rounded-sm border border-line bg-paper-raised px-2.5 py-1.5 text-xs font-medium hover:border-ink-soft"
          >
            {t("detail.email.copyBoth")}
          </button>
        </div>
      </div>
    </div>
  );
}
