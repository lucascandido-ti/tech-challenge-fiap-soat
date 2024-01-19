export enum PaymentStatus {
  PENDING = 'Pending',
  CONCLUDED = 'Concluido',
}

export const paymentStatusDict = {
  [PaymentStatus.PENDING]: 'Pendente',
  [PaymentStatus.CONCLUDED]: 'Concluido',
};
