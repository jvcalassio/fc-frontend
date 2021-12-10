export enum OrderStatus {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
}

export const OrderStatusTranslate = {
    [OrderStatus.Pending]: 'Pendente',
    [OrderStatus.Approved]: 'Aprovado',
    [OrderStatus.Rejected]: 'Rejeitado',
};

export interface Order {
    id: string;
    amount: number;
    credit_card_number: string;
    credit_card_name: string;
    status: OrderStatus;
    account_id: string;
    created_at: string;
    updated_at: string;
}
