import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const currencySymbolMap = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
  jungle_coin: "",
};

export type currencySymbol = keyof typeof currencySymbolMap;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateInput: string | [number, number, number]) => {
    if (Array.isArray(dateInput)) {
        const [year, month, day] = dateInput;
        dateInput = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    return new Date(dateInput).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

export function numberWithCommas(x: string | number) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatAmount(
  amount: number,
  currency?: currencySymbol,
  isSubunit: boolean = true,
  subUnitValue: number = 100
): string {
  const amountInSubunit = isSubunit ? amount / subUnitValue : amount;
  if (currency) {
    const currencySymbol = currencySymbolMap[currency];
    return `${currencySymbol}${numberWithCommas(
      Number(amountInSubunit).toFixed(2)
    )}`;
  }
  return numberWithCommas(Number(amountInSubunit).toFixed(2));
}

export function convertAmountToSubunit(
  amount: number,
  isSubUnit = true
): number {
  if (isSubUnit) {
    return amount * 100;
  }
  return amount;
}

export function formatCardNumber(cardNumber: string): string {
  const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  return formattedCardNumber;
}

export function listenForOutsideClicks(
  listening: boolean,
  setListening: (listening: boolean) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuRef: React.RefObject<HTMLDivElement> | any,
  setIsOpen: (isOpen: boolean) => void
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach(() => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current;
        const node = evt.target;
        try {
          if (cur.contains(node)) return;
          setIsOpen(false);
        } catch (error) { 
          console.log(error)
        }
      });
    });
  };
}

export function formatNumber(number: number): string {
  const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

  const tier = Math.floor(Math.log10(number) / 3);

  if (tier === 0) {
    return number.toString();
  }

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed() + suffix;
}

export const formatString = (str: string): string => {
    if (str.includes('_')) {
        return str
            .replace(/_/g, ' ')
            .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    }

    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
};

export const formatValue = (value: number | string): string => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
        return value.toString();
    }

    if (numericValue >= 1_000_000) {
        const millionValue = numericValue / 1_000_000;
        if (numericValue % 1_000_000 !== 0) {
            return `${millionValue.toFixed(1)}M`;
        } else {
            return `${millionValue.toFixed(0)}M`;
        }
    } else if (numericValue >= 1_000) {
        const thousandValue = numericValue / 1_000;
        if (numericValue % 1_000 === 0) {
            return `${thousandValue.toFixed(0)}K`;
        } else {
            return `${thousandValue.toFixed(1)}K`;
        }
    } else if (numericValue >= 100) {
        return `${numericValue}K`;
    } else {
        return numericValue.toString();
    }
};
