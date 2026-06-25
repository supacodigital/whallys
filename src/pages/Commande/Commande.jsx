import { useState, useMemo, useEffect, useRef } from 'react';
import { Check, AlertCircle, Loader2, Truck, Sparkles, Mail, Store, MapPin, CalendarDays } from 'lucide-react';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { PRODUITS } from '../../data/produits.js';
import { DEPARTEMENTS } from '../../data/departements.js';
import {
  getAvailableDeliveryDates,
  formatDateISO,
  formatDateHuman,
} from '../../utils/livraison.js';
import { sendCommande } from '../../utils/sendCommande.js';
import { useNoindex } from '../../utils/useNoindex.js';
import styles from './Commande.module.css';

const initialItems = () =>
  PRODUITS.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {});

// Visuel utilisé dans les cards/récap de cette page : on force le packshot
// box.png (différent des photos éditoriales de la Home, qui restent inchangées).
const ORDER_IMAGE = '/box.png';

function Commande() {
  // Page réservée aux clients : on empêche son indexation par les moteurs.
  useNoindex();

  const [nomRestaurant, setNomRestaurant] = useState('');
  const [departement, setDepartement] = useState('');
  const [items, setItems] = useState(initialItems);
  const [dateLivraison, setDateLivraison] = useState('');
  const [status, setStatus] = useState({ type: 'idle' });
  // Instantané de la commande envoyée — on le fige avant de réinitialiser le
  // formulaire, pour pouvoir afficher le récapitulatif complet dans la carte succès
  const [lastOrder, setLastOrder] = useState(null);
  // Indique si l'utilisateur a déjà tenté de soumettre — déclenche la validation visuelle inline
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  // Message éphémère "Créneaux mis à jour" quand le département recompose les dates
  const [departementJustChanged, setDepartementJustChanged] = useState(false);
  const successTitleRef = useRef(null);

  // Déplace le focus vers le titre de la carte succès dès qu'on bascule en
  // mode success, pour que les lecteurs d'écran annoncent la confirmation
  // et que la navigation clavier reparte d'un point cohérent.
  useEffect(() => {
    if (status.type === 'success') {
      successTitleRef.current?.focus();
    }
  }, [status.type]);

  const availableDates = useMemo(() => {
    if (!departement) return [];
    return getAvailableDeliveryDates(departement);
  }, [departement]);

  useEffect(() => {
    if (availableDates.length > 0 && !dateLivraison) {
      setDateLivraison(formatDateISO(availableDates[0]));
    }
    if (
      dateLivraison &&
      availableDates.length > 0 &&
      !availableDates.some((d) => formatDateISO(d) === dateLivraison)
    ) {
      setDateLivraison(formatDateISO(availableDates[0]));
    }
  }, [availableDates, dateLivraison]);

  const totalItems = useMemo(
    () => Object.values(items).reduce((sum, q) => sum + q, 0),
    [items]
  );

  const handleQuantityChange = (id, value) => {
    setItems((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Garde contre la double soumission : si un envoi est déjà en cours, on ignore
    if (status.type === 'loading') return;

    if (!nomRestaurant.trim() || !departement || !dateLivraison || totalItems === 0) {
      // Active la validation visuelle inline (border rouge sur les champs vides)
      setHasAttemptedSubmit(true);
      setStatus({
        type: 'error',
        message: 'Merci de remplir tous les champs et de sélectionner au moins un produit.',
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const dateObj = new Date(dateLivraison);
      const dateHuman = formatDateHuman(dateObj);
      await sendCommande({
        nomRestaurant: nomRestaurant.trim(),
        departement,
        dateLivraison: dateHuman,
        items,
        produits: PRODUITS,
      });
      // On fige le détail de la commande avant de vider le formulaire
      setLastOrder({
        nomRestaurant: nomRestaurant.trim(),
        departement,
        dateLivraison: dateHuman,
        lignes: PRODUITS.filter((p) => items[p.id] > 0).map((p) => ({
          id: p.id,
          nom: p.nom,
          format: p.format,
          image: ORDER_IMAGE,
          couleur: p.couleur,
          quantite: items[p.id],
        })),
        total: totalItems,
      });
      setStatus({ type: 'success' });
      setNomRestaurant('');
      setDepartement('');
      setItems(initialItems());
      setDateLivraison('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message || "L'envoi a échoué. Réessayez ou contactez-nous par email.",
      });
    }
  };

  const isFormValid =
    nomRestaurant.trim() && departement && dateLivraison && totalItems > 0;

  // Auto-clear du message d'erreur dès que le form redevient valide
  useEffect(() => {
    if (isFormValid && status.type === 'error') {
      setStatus({ type: 'idle' });
    }
  }, [isFormValid, status.type]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Halos radiaux doux en arrière-plan, purement décoratifs */}
        <div className={styles.bgShapes} aria-hidden="true" />

        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.headline}>
              Passez votre <em>commande</em>
            </h1>
            <p className={styles.subline}>
              Livraison rapide en Suisse romande, selon votre département.
            </p>
          </header>

          {status.type === 'success' && lastOrder ? (
            <div className={styles.successCard} role="status" aria-live="polite">
              <div className={styles.successHead}>
                <div className={styles.successIcon}>
                  <Check size={32} strokeWidth={2.5} aria-hidden="true" />
                </div>
                <h2
                  ref={successTitleRef}
                  tabIndex={-1}
                  className={styles.successTitle}
                >
                  Commande envoyée&nbsp;!
                </h2>
                <p className={styles.successText}>
                  Nous l'avons bien reçue. Voici le récapitulatif de votre commande&nbsp;; une
                  confirmation par email suivra dans les meilleurs délais.
                </p>
              </div>

              {/* Récapitulatif complet de la transaction */}
              <div className={styles.recap}>
                <p className={styles.recapEyebrow}>Récapitulatif de la transaction</p>

                <dl className={styles.recapMeta}>
                  <div className={styles.recapMetaRow}>
                    <dt className={styles.recapMetaLabel}>
                      <Store size={16} aria-hidden="true" />
                      Restaurant
                    </dt>
                    <dd className={styles.recapMetaValue}>{lastOrder.nomRestaurant}</dd>
                  </div>
                  <div className={styles.recapMetaRow}>
                    <dt className={styles.recapMetaLabel}>
                      <MapPin size={16} aria-hidden="true" />
                      Département
                    </dt>
                    <dd className={styles.recapMetaValue}>{lastOrder.departement}</dd>
                  </div>
                  <div className={styles.recapMetaRow}>
                    <dt className={styles.recapMetaLabel}>
                      <CalendarDays size={16} aria-hidden="true" />
                      Livraison
                    </dt>
                    <dd className={styles.recapMetaValue}>{lastOrder.dateLivraison}</dd>
                  </div>
                </dl>

                <ul className={styles.recapLines} aria-label="Produits commandés">
                  {lastOrder.lignes.map((l) => (
                    <li
                      key={l.id}
                      className={styles.recapLine}
                      style={{ '--accent': l.couleur }}
                    >
                      <span className={styles.recapThumb} aria-hidden="true">
                        <img src={l.image} alt="" className={styles.recapImage} />
                      </span>
                      <span className={styles.recapLineMeta}>
                        <span className={styles.recapLineName}>{l.nom}</span>
                        <span className={styles.recapLineFormat}>{l.format}</span>
                      </span>
                      <span className={styles.recapQty}>×&nbsp;{l.quantite}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.recapTotal}>
                  <span>Total</span>
                  <strong>
                    {lastOrder.total} unité{lastOrder.total > 1 ? 's' : ''}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className={styles.successBtn}
                onClick={() => {
                  setStatus({ type: 'idle' });
                  setLastOrder(null);
                }}
              >
                Passer une nouvelle commande
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Produits d'abord */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Votre commande</legend>
                <div
                  className={`${styles.productsGrid} ${
                    hasAttemptedSubmit && totalItems === 0
                      ? styles.productsGridError
                      : ''
                  }`}
                >
                  {PRODUITS.map((p) => {
                    const hasQty = items[p.id] > 0;
                    return (
                      <article
                        key={p.id}
                        className={`${styles.productCard} ${
                          hasQty ? styles.productCardHasQty : ''
                        }`}
                        style={{ '--accent': p.couleur }}
                      >
                        <div className={styles.productThumb} aria-hidden="true">
                          <img src={ORDER_IMAGE} alt="" className={styles.productImage} />
                        </div>
                        <div className={styles.productMeta}>
                          <span className={styles.productName}>{p.nom}</span>
                          <span className={styles.productFormat}>{p.format}</span>
                        </div>
                        <QuantitySelector
                          value={items[p.id]}
                          onChange={(v) => handleQuantityChange(p.id, v)}
                          label={`Quantité ${p.nom}`}
                        />
                      </article>
                    );
                  })}
                </div>
                {totalItems > 0 && (
                  <p className={styles.total}>
                    Total : <strong>{totalItems}</strong> unité
                    {totalItems > 1 ? 's' : ''}
                  </p>
                )}
              </fieldset>

              {/* Restaurant + département sur la même ligne en desktop */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="nomRestaurant" className={styles.label}>
                    Nom de votre restaurant
                  </label>
                  <input
                    id="nomRestaurant"
                    type="text"
                    value={nomRestaurant}
                    onChange={(e) => setNomRestaurant(e.target.value)}
                    className={`${styles.input} ${
                      hasAttemptedSubmit && !nomRestaurant.trim()
                        ? styles.inputError
                        : ''
                    }`}
                    placeholder="Le Bistrot Whally's"
                    required
                    autoComplete="organization"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="departement" className={styles.label}>
                    Département de livraison
                  </label>
                  <select
                    id="departement"
                    value={departement}
                    onChange={(e) => {
                      const previousDept = departement;
                      setDepartement(e.target.value);
                      // Si on changeait un département déjà choisi (vs sélection initiale),
                      // on signale visuellement à l'utilisateur que les dates ont été recalculées
                      if (previousDept && previousDept !== e.target.value && dateLivraison) {
                        setDepartementJustChanged(true);
                        setTimeout(() => setDepartementJustChanged(false), 3500);
                      }
                      setDateLivraison('');
                    }}
                    className={`${styles.select} ${
                      hasAttemptedSubmit && !departement ? styles.inputError : ''
                    }`}
                    required
                  >
                    <option value="" disabled>
                      Sélectionner un département
                    </option>
                    {DEPARTEMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date livraison */}
              <div className={styles.field}>
                <label htmlFor="dateLivraison" className={styles.label}>
                  Date de livraison souhaitée
                </label>
                {!departement ? (
                  <p className={styles.hint}>
                    Sélectionnez d'abord un département pour voir les créneaux disponibles.
                  </p>
                ) : (
                  <>
                    <select
                      id="dateLivraison"
                      value={dateLivraison}
                      onChange={(e) => setDateLivraison(e.target.value)}
                      className={styles.select}
                      required
                    >
                      {availableDates.map((d) => {
                        const iso = formatDateISO(d);
                        return (
                          <option key={iso} value={iso}>
                            {formatDateHuman(d)}
                          </option>
                        );
                      })}
                    </select>
                    {departementJustChanged ? (
                      <p
                        className={styles.deptChangedHint}
                        role="status"
                        aria-live="polite"
                      >
                        Créneaux mis à jour pour {departement}.
                      </p>
                    ) : (
                      <p className={styles.hint}>
                        Les créneaux affichés tiennent compte du planning de votre département
                        et de la limite de 15h.
                      </p>
                    )}
                  </>
                )}
              </div>

              {status.type === 'error' && (
                <div className={styles.errorBox} role="alert">
                  <AlertCircle size={18} aria-hidden="true" />
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className={`${styles.submit} ${isFormValid ? styles.submitReady : ''} ${
                  !isFormValid ? styles.submitDimmed : ''
                }`}
                disabled={status.type === 'loading'}
                aria-disabled={!isFormValid || status.type === 'loading'}
              >
                {status.type === 'loading' ? (
                  <>
                    <Loader2 size={18} className={styles.spin} aria-hidden="true" />
                    Envoi en cours…
                  </>
                ) : (
                  <>Envoyer la commande</>
                )}
              </button>
            </form>
          )}
          {/* Trust signals : rassurer le restaurateur sur la qualité, la livraison et le contact */}
          <div className={styles.trustWrap}>
            <p className={styles.trustEyebrow}>Nos engagements</p>
            <ul className={styles.trustList} aria-label="Nos engagements">
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <Sparkles size={20} />
              </span>
              <div>
                <h3 className={styles.trustTitle}>Sauces artisanales</h3>
                <p className={styles.trustText}>
                  Recettes maison, mijotées en petites séries.
                </p>
              </div>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <Truck size={20} />
              </span>
              <div>
                <h3 className={styles.trustTitle}>Livraison rapide</h3>
                <p className={styles.trustText}>
                  Commande avant 15h, livraison selon votre département.
                </p>
              </div>
            </li>
            <li className={styles.trustCard}>
              <span className={styles.trustIcon} aria-hidden="true">
                <Mail size={20} />
              </span>
              <div>
                <h3 className={styles.trustTitle}>Contact direct</h3>
                <p className={styles.trustText}>
                  Une question&nbsp;? Notre équipe répond sous 24h.
                </p>
              </div>
            </li>
          </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Commande;
