import { useMemo, useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateISO } from '../../utils/livraison.js';
import styles from './DeliveryCalendar.module.css';

// Noms FR (lundi en première colonne — convention suisse/européenne)
const WEEKDAY_LABELS = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const MONTH_FORMATTER = new Intl.DateTimeFormat('fr-CH', {
  month: 'long',
  year: 'numeric',
});
const FULL_DATE_FORMATTER = new Intl.DateTimeFormat('fr-CH', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// Renvoie une Date à minuit (sans muter l'original)
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Index de colonne (0 = lundi … 6 = dimanche) pour un getDay() JS (0 = dimanche)
function mondayBasedIndex(jsDay) {
  return (jsDay + 6) % 7;
}

/**
 * Calendrier de sélection de date de livraison.
 *
 * N'affiche comme sélectionnables QUE les dates fournies dans `availableDates`
 * (déjà filtrées par la logique livraison.js : département + cutoff 12h).
 * Les autres jours sont rendus mais désactivés.
 *
 * @param {Date[]} availableDates — dates livrables (à minuit), triées croissantes
 * @param {string} value — date sélectionnée au format ISO YYYY-MM-DD ('' si aucune)
 * @param {(iso: string) => void} onChange — appelé avec l'ISO du jour cliqué
 */
function DeliveryCalendar({ availableDates, value, onChange }) {
  // Set des ISO livrables pour un test O(1) à l'affichage
  const availableSet = useMemo(
    () => new Set(availableDates.map((d) => formatDateISO(d))),
    [availableDates]
  );

  // Mois affiché : on démarre sur le mois de la première date dispo (ou aujourd'hui)
  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(availableDates[0] ?? new Date())
  );

  // Recale la vue sur la 1re date dispo quand la liste change (changement de
  // département) — sauf si la date sélectionnée est déjà visible dans ce mois.
  const firstDateIso = availableDates[0] ? formatDateISO(availableDates[0]) : null;
  useEffect(() => {
    if (availableDates[0]) {
      setViewMonth(startOfMonth(availableDates[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDateIso]);

  // Bornes de navigation : on n'autorise pas de revenir avant le mois de la 1re
  // date dispo, ni d'aller au-delà du mois de la dernière.
  const minMonth = availableDates[0]
    ? startOfMonth(availableDates[0])
    : startOfMonth(new Date());
  const maxMonth = availableDates.length
    ? startOfMonth(availableDates[availableDates.length - 1])
    : minMonth;

  const canGoPrev = viewMonth > minMonth;
  const canGoNext = viewMonth < maxMonth;

  const goPrev = () => {
    if (!canGoPrev) return;
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  };
  const goNext = () => {
    if (!canGoNext) return;
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  };

  // Construction de la grille du mois : on aligne sur le lundi de la 1re semaine
  // et on remplit jusqu'à couvrir tout le mois (cellules vides en amont/aval).
  const weeks = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const leading = mondayBasedIndex(first.getDay()); // cases vides avant le 1er
    const daysInMonth = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0
    ).getDate();

    const cells = [];
    // Cases vides de début de grille
    for (let i = 0; i < leading; i++) cells.push(null);
    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day));
    }
    // Complète la dernière semaine
    while (cells.length % 7 !== 0) cells.push(null);

    // Découpe en semaines de 7
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [viewMonth]);

  const today = startOfDay(new Date());

  // Référence vers le bouton du jour focusable, pour le pilotage clavier
  const gridRef = useRef(null);

  // Navigation clavier dans la grille (flèches = ±1 / ±7 jours sur jours dispo)
  const handleKeyDown = (e, date) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const delta =
      e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' ? -7 : 7;
    // Cherche la prochaine date DISPO dans la direction demandée
    const ordered = availableDates.map((d) => formatDateISO(d));
    const currentIso = formatDateISO(date);
    const idx = ordered.indexOf(currentIso);
    if (idx === -1) return;
    // Pour ±1 on prend la dispo adjacente ; pour ±7 on vise ~la semaine suivante
    let targetIdx;
    if (Math.abs(delta) === 1) {
      targetIdx = idx + (delta > 0 ? 1 : -1);
    } else {
      // Trouve la dispo la plus proche à ±7 jours calendaires
      const targetTime = startOfDay(date).getTime() + delta * 86400000;
      let best = -1;
      let bestDiff = Infinity;
      ordered.forEach((iso, i) => {
        const t = new Date(iso).getTime();
        const diff = Math.abs(t - targetTime);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = i;
        }
      });
      targetIdx = best;
    }
    if (targetIdx < 0 || targetIdx >= ordered.length) return;
    const targetIso = ordered[targetIdx];
    onChange(targetIso);
    // Bascule la vue sur le mois cible si besoin, puis re-focus la cellule
    const targetDate = new Date(targetIso);
    setViewMonth(startOfMonth(targetDate));
    requestAnimationFrame(() => {
      gridRef.current
        ?.querySelector(`[data-iso="${targetIso}"]`)
        ?.focus();
    });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.head}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Mois précédent"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <span className={styles.monthLabel} aria-live="polite">
          {MONTH_FORMATTER.format(viewMonth)}
        </span>
        <button
          type="button"
          className={styles.navBtn}
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Mois suivant"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.weekdays} aria-hidden="true">
        {WEEKDAY_LABELS.map((w) => (
          <span key={w} className={styles.weekday}>
            {w}
          </span>
        ))}
      </div>

      <div
        className={styles.grid}
        role="grid"
        aria-label="Dates de livraison disponibles"
        ref={gridRef}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className={styles.week} role="row">
            {week.map((date, di) => {
              if (!date) {
                return <span key={di} className={styles.empty} role="gridcell" />;
              }
              const iso = formatDateISO(date);
              const isAvailable = availableSet.has(iso);
              const isSelected = value === iso;
              const isToday = startOfDay(date).getTime() === today.getTime();

              return (
                <button
                  key={di}
                  type="button"
                  role="gridcell"
                  data-iso={iso}
                  className={`${styles.day} ${
                    isAvailable ? styles.dayAvailable : ''
                  } ${isSelected ? styles.daySelected : ''} ${
                    isToday ? styles.dayToday : ''
                  }`}
                  disabled={!isAvailable}
                  // Seule la cellule sélectionnée (ou la 1re dispo) est tabbable
                  tabIndex={
                    isSelected || (!value && iso === firstDateIso) ? 0 : -1
                  }
                  aria-pressed={isSelected}
                  aria-label={FULL_DATE_FORMATTER.format(date)}
                  onClick={() => isAvailable && onChange(iso)}
                  onKeyDown={(e) => isAvailable && handleKeyDown(e, date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {availableDates.length === 0 && (
        <p className={styles.emptyState}>
          Aucun créneau de livraison disponible pour le moment.
        </p>
      )}
    </div>
  );
}

export default DeliveryCalendar;
