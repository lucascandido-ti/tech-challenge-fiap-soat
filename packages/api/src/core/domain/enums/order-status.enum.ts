export enum OrderStatus {
  RECEIVED = 'Received',
  IN_PREPARATION = 'InPreparation',
  CONCLUDED = 'Concluded',
  FINISHED = 'Finished',
}

export const orderStatusDict = {
  [OrderStatus.RECEIVED]: 'Recebido',
  [OrderStatus.IN_PREPARATION]: 'Em preparação',
  [OrderStatus.CONCLUDED]: 'Concluido',
  [OrderStatus.FINISHED]: 'Finalizado',
};
