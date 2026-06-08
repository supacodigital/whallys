import { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css';

const MIN = 0;
const MAX = 99;

function QuantitySelector({ value, onChange, label, min = MIN, max = MAX }) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  // Animation "bump" du chiffre à chaque changement de valeur.
  // On déclenche en remontant un key qui force le ré-mount du span animé.
  const [bumpKey, setBumpKey] = useState(0);
  const previousValueRef = useRef(value);

  useEffect(() => {
    if (previousValueRef.current !== value) {
      setBumpKey((k) => k + 1);
      previousValueRef.current = value;
    }
  }, [value]);

  return (
    <div className={styles.wrap} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.btn}
        onClick={decrement}
        disabled={value <= min}
        aria-label={`Diminuer ${label}`}
      >
        <Minus size={18} aria-hidden="true" />
      </button>
      <span
        key={bumpKey}
        className={styles.value}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={styles.btn}
        onClick={increment}
        disabled={value >= max}
        aria-label={`Augmenter ${label}`}
      >
        <Plus size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantitySelector;
