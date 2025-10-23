import { ANIMALS, ADJECTIVES } from "@/utils/data";

export function generateUsername(): string {
  // Sélection aléatoire d'un animal
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

  // Sélection aléatoire d'un adjectif
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

  // Génération d'un nombre aléatoire entre 1 et 99
  const number = Math.floor(Math.random() * 99) + 1;

  // Format avec deux chiffres (01, 02, ..., 99)
  const formattedNumber = number.toString().padStart(2, "0");

  return `${animal}_${adjective}_${formattedNumber}`;
}

// capitaliser la premiere lettre d'un text
export const capitalizeText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// un champ vide?
export const isEmptyString = (str: string) => {
  return str.replace(/ /g, "") === "";
};

// currency simbols
export const returnCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case "USD":
      return "$";

    case "CDF":
      return "CDF";

    default:
      return "$";
  }
};

// return formated money
export function returnFormatedMoney(amount: number): string {
  if (Number.isInteger(amount)) {
    // Nombre entier -> format classique sans décimale
    return amount.toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } else {
    // Nombre flottant -> fraction non arrondie, format manuel
    const amountStr = amount.toString(); // ex "2900.585"
    const [integerPart, decimalPart] = amountStr.split(".");

    // formate partie entière avec espaces en milliers
    const formattedInteger = Number(integerPart).toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // si pas de parties décimales, on retourne integer simple
    if (!decimalPart) {
      return formattedInteger;
    }

    // sinon on concatène avec une virgule et décimales telles quelles
    return `${formattedInteger},${decimalPart}`;
  }
}
