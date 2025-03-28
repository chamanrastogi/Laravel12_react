
import { SellerTable } from '@/types';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SellerTable>[] = [
    
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'seller', header: 'seller' },
    { accessorKey: 'seller_city', header: 'City' },
    { accessorKey: 'seller_state', header: 'State' },    
];
