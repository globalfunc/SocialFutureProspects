import { useState } from "react";
import { useTranslation } from "react-i18next";
import { initials, PHOTO_EXTENSIONS } from "../../components/InitialsAvatar.js";
import type { AppLanguage } from "../../i18n/index.js";
import type { Speaker } from "./speakers.js";

export function SpeakerEntry({ speaker, lang }: { speaker: Speaker; lang: AppLanguage }) {
  const { t } = useTranslation();
  const [extensionIndex, setExtensionIndex] = useState(0);

  const isBg = lang === "bg";
  const country = isBg ? speaker.bg.country : speaker.country;
  const occupation = isBg ? speaker.bg.occupation : speaker.occupation;
  const time = isBg ? speaker.bg.time : speaker.timeSofia;
  const topicTitle = isBg ? speaker.bg.topicTitle : speaker.topicTitle;
  const topicSubtitle = isBg ? speaker.bg.topicSubtitle : speaker.topicSubtitle;

  const hasPhoto = extensionIndex < PHOTO_EXTENSIONS.length;

  return (
    <li className="pl-speaker">
      <div className="pl-time-col">
        <span className="pl-time-node" aria-hidden="true"></span>
        <div className="pl-time-big">{time}</div>
        <div className="pl-time-zone">{t("programLineup.sofiaLabel")}</div>
      </div>

      <div className="pl-photo-col">
        <div className="pl-mobile-time">
          {time} &middot; {t("programLineup.sofiaLabel")}
        </div>
        <div className="pl-photo-frame">
          {hasPhoto ? (
            <img
              key={`${speaker.id}-${extensionIndex}`}
              src={`prospects/${speaker.id}/photo.${PHOTO_EXTENSIONS[extensionIndex]}`}
              alt=""
              aria-hidden="true"
              onError={() => setExtensionIndex((i) => i + 1)}
            />
          ) : (
            <div className="pl-photo-fallback" aria-hidden="true">
              <span>{initials(speaker.name)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pl-body-col">
        <div className="pl-name-row">
          <h3 className="pl-speaker-name">{speaker.name}</h3>
          <span className="pl-speaker-country">{country}</span>
        </div>
        <p className="pl-speaker-occupation">{occupation}</p>
        <p className="pl-topic-title">{topicTitle}</p>
        {topicSubtitle ? <p className="pl-topic-sub">{topicSubtitle}</p> : null}
      </div>
    </li>
  );
}
