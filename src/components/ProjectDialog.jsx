import { useLanguage } from "../i18n/LanguageContext.jsx";
import { Fragment, useEffect, useRef } from "react";
import { projects } from "../data/projects.js";
import CofounderSystem from "./CofounderSystem.jsx";
function BuildFigure({ projectKey }) {
  const { t, voice } = useLanguage();
  if (projectKey === "sherlock") return null;

  const assetRoot = `${import.meta.env.BASE_URL}assets/projects`;
  if (projectKey === "cofounder") {
    if (voice !== "standard") {
      return (
        <figure className="dialog-build-figure">
          <CofounderSystem label={t("How AI Co-Founder routes a request to specialist agents")} />
        </figure>
      );
    }
    return <img className="dialog-build-figure" src={`${assetRoot}/cofounder.webp`} alt="" />;
  }

  if (projectKey === "tripsync") {
    return (
      <img
        className="dialog-build-figure"
        src={`${assetRoot}/tripsync.svg`}
        alt={t("User and item towers produce 64-D embeddings. Cosine similarity retrieves 100 candidates, then a Keras reranker selects the top 20.")}
      />
    );
  }

  return (
    <figure className="dialog-build-figure dialog-build-figure--omnimark">
      <img
        src={`${assetRoot}/omnimark.svg`}
        alt={t("Submitted answer PDFs go through OCR or text extraction, NLP or LLM grading, and review of marks and feedback.")}
      />
      <figcaption>
        <ol className="dialog-build-stages">
          <li>{t("Upload")}</li>
          <li>{t("Extract")}</li>
          <li>{t("Grade")}</li>
          <li>{t("Review")}</li>
        </ol>
      </figcaption>
    </figure>
  );
}

export default function ProjectDialog({ selection, onClose }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const project = selection ? projects[selection.key] : null;
  useEffect(() => {
    if (!project) return;
    const dialog = dialogRef.current;
    triggerRef.current = selection.trigger;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    closeRef.current.focus();
  }, [project, selection]);
  function closeOnBackdrop(event) {
    const dialog = dialogRef.current;
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  }
  function handleClose() {
    triggerRef.current?.focus();
    onClose();
  }
  return (
    <dialog
      id="project-dialog"
      aria-labelledby="dialog-title"
      ref={dialogRef}
      onClick={closeOnBackdrop}
      onClose={handleClose}
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span className="mono" id="dialog-number">
            {t(project?.number)}
          </span>
          <button
            id="close-dialog"
            aria-label={t("Close case study")}
            ref={closeRef}
            onClick={() => dialogRef.current.close()}
          >
            {t("Close ")}
            <span>×</span>
          </button>
        </div>
        <p className="dialog-eyebrow mono" id="dialog-category">
          {t(project?.category)}
        </p>
        <h2 id="dialog-title">{t(project?.title)}</h2>
        <p className="dialog-intro" id="dialog-intro">
          {t(project?.intro)}
        </p>
        <div id="dialog-body">
          {project?.sections.map(([title, text], index) => (
            <Fragment key={title}>
              <section className="dialog-section">
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
              </section>
              {index === 1 && <BuildFigure projectKey={selection.key} />}
              {index === 2 && project.metrics && (
                <div className="dialog-metrics">
                  {project.metrics.map(([value, label]) => (
                    <div key={label}>
                      <strong>{value}</strong>
                      <span>{t(label)}</span>
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="dialog-links" id="dialog-links">
          {project?.links.map(([title, url]) => (
            <a key={url} href={url} target="_blank" rel="noopener">
              {t(title)} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="dialog-source mono">
          {t("PROJECT DETAILS FROM THE SOURCE REPOSITORIES AND MY RESUMES.")}
        </p>
      </div>
    </dialog>
  );
}
