import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CustomerSearchView from '@/views/CustomerSearchView.vue';
import SalesOrderSearchView from '@/views/salesOrderSearchView.vue';
import AboutView from '@/views/AboutView.vue';
import CustomerDetailsView from '@/views/CustomerDetailsView.vue';

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/customers', name: 'CustomerSearch', component: CustomerSearchView },
    { path: '/salesorders', name: 'SalesOrderSearch', component: SalesOrderSearchView },
    { path: '/about', name: 'About', component: AboutView },
    { path: '/customer/:id', name: 'customerDetails', component: CustomerDetailsView },
];
const router = createRouter(
    {
        history: createWebHistory(),
        routes: routes
    });
export default router;