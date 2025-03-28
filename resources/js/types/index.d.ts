import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}
export interface Notification {
    status: 'success' | 'error';
    message: string;
}
export interface BreadcrumbItem {
    title: string;
    href: string;
}
export interface Student {    
    name: string;
    email: string;
    age: string;
    [key: string]: string;
}

export interface StudentTable {
    id: number;
    name: string;
    email: string;
    age: string;
}
export interface SellerTable {
    id: number;
    seller: string;
    seller_city: string;
    seller_state: string;
}
export interface SharedData {
    name: string;
    sitename: string;
    quote: { message: string; author: string };
    flash: Notification;
    auth: Auth;
    [key: string]: unknown;
}
export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
