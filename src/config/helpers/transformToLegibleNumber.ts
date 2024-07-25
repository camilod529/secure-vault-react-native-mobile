import {Currency} from '../../domain/entity/transaction';

export const transformToLegibleNumber = (
  amount: number,
  currency: Currency,
): string => {
  const aux = amount.toFixed(2);
  return new Intl.NumberFormat('es-ES', {style: 'currency', currency}).format(
    parseFloat(aux),
  );
};
