import type { Prospect } from "../lib/types.js";

export interface GeneratedEmail {
  subject: string;
  body: string;
}

// Deterministic template-fill only — no LLM at runtime, no API key
// (CLAUDE.md). The logistics paragraph below is a direct translation of the
// base invitation template in docs/conference_brief_bg.txt; only the greeting
// and the opening 1-2 sentences are assembled per-prospect, and only from
// that prospect's own pwdAtRelevance field — never a fact not present on the
// row. Callers are responsible for not invoking this for matchRating <= 1
// rows (DO NOT CONTACT) — see design.md §2's disabled Email tab.

const SIGN_OFF_EN = "Best regards,\nChristian Grigorov\n“Social Future” Foundation";
const SIGN_OFF_BG = "С уважение,\nКристиян Григоров\nФондация „Сошъл Фючър“";

// Faithful English translation of the logistics paragraph in
// docs/conference_brief_bg.txt (lines 21-27) — the ask and the event details
// are the brief's, not reinvented here.
const LOGISTICS_EN = `On 29 September 2026, from 14:00 to 17:00 Eastern European time, the “Social Future” Foundation is organizing an international online conference on the topic “Adapting Workplaces for People with Disabilities.” The foundation's mission is to support young people with disabilities in Bulgaria in their career development, education, and employment in the Bulgarian labour market. In this connection, we would like to invite speakers who can share good practices in hiring and retaining people with disabilities on their teams and how they have improved their working environment. We invited you because we learned about your story and understood that you are an inspiring example we would like to share with people with disabilities in Bulgaria, to inspire them to seek new opportunities for development and steady employment. The conference will take place on the Zoom platform, and we will arrange your specific speaking time once you accept our invitation. We are also able to include a short presentation from you, if you wish. The conference will have two-way interpretation between Bulgarian and English, and a sign-language interpreter for deaf participants; the materials will later also be adapted for young people with intellectual disabilities. Your speaking slot will be 20 to 25 minutes — about 15 minutes for your presentation and the rest for questions from the organizers and the audience. We will run a connection test the day before the event, and we'll be in touch about that beforehand. The access link will be posted on our social media channels, and we will also share it with you directly in case you'd like to pass it on to your own partners or community.

This is the third in a series of conferences dedicated to raising public awareness of employment issues facing people with disabilities in Bulgaria. It would be both a privilege and a pleasure to have you join us.

Please reply within a week of receiving this email so we can plan the programme and confirm your exact speaking time. If you decide to accept, we'll also ask you for a good-quality photo and a short biography in English for promotional use ahead of the event.`;

// Near-verbatim Bulgarian text from docs/conference_brief_bg.txt (lines 21-27),
// with only the greeting split out for per-prospect personalization above it.
const LOGISTICS_BG = `На 29.09.2026 година, от 14.00 до 17.00 часа източноевропейско време, фондация „Сошъл Фючър“ организира международна онлайн конференция на тема „Адаптиране на работни места за хора с увреждания“. Мисията на фондацията е да подкрепя млади хора с увреждания от България да получат кариерно развитие, образователна и трудова реализация на пазара на труда в България. В тази връзка ние искаме да привлечем лектори, които да разкажат за добри практики в назначаването и задържането на хора с увреждания в своите екипи и как са им подобрили работната среда. Поканихме Ви, защото открихме Вашата история и разбрахме, че сте вдъхновяващ пример, който искаме да разкажем на българските хора с увреждания и чрез него да ги вдъхновим да търсят нови възможности за развитие и постоянна работа. Конференцията ще се проведе в платформата Zoom и ще уговорим часа на включването Ви, след като приемете нашата покана. Имаме възможност да представим и Ваша презентация по желание. Конференцията ще е с двустранен превод между български и английски език и ще има жестов преводач за ползване от глухи хора; материалите от нея ще се адаптират по-късно и за младежи с интелектуални затруднения. Времето за включване ще бъде 20 до 25 минути — 15 минути за представянето и останалото време за въпроси от организаторите и публиката. Ще направим тест на връзката в деня преди събитието, за който ще Ви пишем. Линкът за достъп ще бъде активен в нашите платформи в социалните мрежи, а ще го предоставим и на Вас, в случай че желаете да го споделите със свои партньори или с Вашата общност.

Това е трета поредна конференция, посветена на по-голямата публичност на проблемите на трудовата реализация на хората с увреждания в България. За нас ще е привилегия и удоволствие да се включите.

Моля, отговорете в рамките на седмица от изпращането на това писмо, за да Ви предвидим в програмата и да уговорим точния час на включване. Ако решите да приемете поканата, ще Ви помолим и за качествена снимка и кратка биографична информация на английски език за рекламни цели преди събитието.`;

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function ensureSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function personalizedOpeningEn(prospect: Prospect): string {
  return `${ensureSentence(prospect.pwdAtRelevance)} Your story is exactly the kind of practical, employer-side example we hope to share at this conference.`;
}

function personalizedOpeningBg(prospect: Prospect): string {
  const translated = prospect.bgTranslation?.pwdAtRelevance;
  if (translated) {
    return `${ensureSentence(translated)} Вашата история е точно практическият пример от гледна точка на работодател, който искаме да споделим на тази конференция.`;
  }
  // No Bulgarian translation of this field exists yet (translation work is
  // separate content authoring, not code — CLAUDE.md's bilingual-content
  // decision). Never invent a translation here — show the English source
  // honestly labeled, matching the same pattern used for untranslated rows
  // in the table/detail views.
  return `[все още не е преведено на български — показано на английски]: „${ensureSentence(prospect.pwdAtRelevance)}“ Вашата история е точно практическият пример от гледна точка на работодател, който искаме да споделим на тази конференция.`;
}

export function generateEmail(prospect: Prospect, lang: "en" | "bg"): GeneratedEmail {
  const name = firstName(prospect.name);

  if (lang === "bg") {
    return {
      subject: "Покана за международна онлайн конференция за хората с увреждания",
      body: `Здравейте, ${name},\n\n${personalizedOpeningBg(prospect)}\n\n${LOGISTICS_BG}\n\n${SIGN_OFF_BG}`,
    };
  }

  return {
    subject: "Invitation to an International Online Conference for People with Disabilities",
    body: `Dear ${name},\n\n${personalizedOpeningEn(prospect)}\n\n${LOGISTICS_EN}\n\n${SIGN_OFF_EN}`,
  };
}
