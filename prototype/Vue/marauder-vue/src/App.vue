<template>
  <div id="app-component">
    <!-- HEADER: Title Line across the top -->
    <header id="header" class="lcr">
      <div></div>
      <div>
        <img src="./assets/IronMarauder.png" alt="">
      </div>
      <!-- TODO: User menu. Change user, user profile. Dummy tokens for different users? -->
      <div id="user-button"><font-awesome-icon icon="fa-solid fa-circle-user" />&nbsp;username</div>
    </header>
    <!-- NAV: Left-side links -->
    <!-- 
        Customers - CustomerSearch component
          Search by name, Search by CustomerNumber, List customers
            View Customer Details
              View Sales Orders
              New Sales Order
            Edit Customer
          New Customer

        SalesOrders - SalesOrderSearch component
          Search by Customer, Search by Part Number
            View Sales Order Details
              View Customer Details
            Edit Sales Order
          New Sales Order

       -->
    <nav id="nav">
      <!-- TODO: Make this data driven with collapsible sections -->
      <nav-item :item="navigation"></nav-item>
    </nav>
    <!-- MAIN: Body of the page..the router-view -->
    <main id="main">
      <div id="content">
        <!-- <div id="error-message" :class="'message-' + $store.state.messageSeverity"
                                v-if="$store.state.message && $store.state.messageSeverity">
                                <span>{{ $store.state.message }}</span>
                                <span><button type="button" @click="$store.dispatch('clearError')">
                                    Clear
                                  </button></span>
                              </div> -->
        <router-view />
      </div>
    </main>
    <footer id="footer" class="lcr">
      <div>Copyright &copy; 2024 Blaze. All rights reserved.</div>
      <div>{{ (appMode === 'production' ? '' : appMode) }}</div>
      <div>{{ (appMode === 'production' ? '' : baseUrl) }}</div>
    </footer>
  </div>
</template>

<script>
import NavItem from '@/components/NavItem.vue';
//import { mapGetters, mapState } from "vuex";
let TYPES = {
  ROUTE: 1,
  COLLECTION: 2,
};
let STATES = {
  EXPANDED: 1,
  COLLAPSED: 2,
};

export default {
  components: {
    NavItem,
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_MARAUDER_API,
      appMode: import.meta.env.MODE,
      navigation: {
        display: null,
        // display: 'TOP',
        type: TYPES.COLLECTION,
        contents: [
          {
            display: 'Home',
            type: TYPES.ROUTE,
            route: 'Home',
          },
          {
            display: 'Customers',
            type: TYPES.COLLECTION,
            state: STATES.EXPANDED,
            contents: [
              {
                display: 'New customer',
                type: TYPES.ROUTE,
                route: 'CustomerCreate',
              },
              {
                display: 'Search customers',
                type: TYPES.ROUTE,
                route: 'CustomerSearch',
              },
            ]
          },
          {
            display: 'Sales orders',
            type: TYPES.COLLECTION,
            state: STATES.EXPANDED,
            contents: [
              {
                display: 'New sales order',
                type: TYPES.ROUTE,
                route: 'SalesOrderNew',
              },
              {
                display: 'Search sales orders',
                type: TYPES.ROUTE,
                route: 'SalesOrderSearch',
              },
            ]
          },
          {
            display: 'About',
            type: TYPES.ROUTE,
            route: 'About',
          },
        ]
      },
    };
  },
  computed: {
    // ...mapState(["portfolios", "selectedPortfolio", "selectedOrganization"]),
    // ...mapGetters(["loggedIn", "isLoading"]),
    // loadingPortfolios() {
    //   return this.$store.state.loading.portfolios;
    // },
    // organizations() {
    //   return this.$store.state.user.organizations;
    // },
  },
  methods: {
    // logout() {
    //   this.$store.dispatch("logout").then(() => {
    //     if (this.$router.currentRoute.name !== "home") {
    //       this.$router.push({ name: "home" });
    //     }
    //   });
    // },
    // selectOrganization(orgId) {
    //   this.$store.dispatch("selectOrganization", orgId).then(() => {
    //     this.navigateTo({name: "home"});
    //   });
    // },
    // navigateTo(route) {
    //   this.rightSideNavOpen = false;
    //   if (this.$router.currentRoute.name !== route.name) {
    //     this.$router.push(route);
    //   }
    // },
  },
  created() {
    console.log(import.meta.env);
    console.log(this.navigation);
  },
};
</script>


<style src="./css/site.css" />

<style scoped>
#app-component {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "header header"
    "nav    main"
    "footer footer"
  ;
  width: 100%;
  height: 100vh;
}

header#header {
  grid-area: header;
  background-color: black;
  color: rgba(255, 255, 255, 0.8);
  padding: 0px 10px;
  border-bottom: var(--main-gridlines);
}

nav#nav {
  grid-area: nav;
  padding: 5px 10px;
  padding-right: 75px;
  border-right: var(--main-gridlines);
  overflow-y: auto;
}

main#main {
  padding: 5px 10px;
  grid-area: main;
  overflow-y: auto;
}

footer#footer {
  grid-area: footer;
  color: var(--footer-fg);
  background-color: black;
  color: rgba(255, 255, 255, 0.8);
  border-top: var(--main-gridlines);
  padding: 5px 10px;
}

/* Left-Center-Right */
.lcr {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.lcr>* {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.lcr> :nth-child(1) {
  justify-content: flex-start;
}

.lcr> :nth-child(2) {
  justify-content: center;
}

.lcr> :nth-child(3) {
  justify-content: flex-end;
}

.nav-item {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  text-decoration: none;
  margin: 5px 0 5px 15px;
  padding: 3px 10px;
  flex-basis: auto;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

div#user-button {
  cursor: pointer;
  font-size: 1.4em;
}

@media screen and (max-width: 768px) {
  .nav-item {
    margin: 3px 0 3px 8px;
    padding: 2px 8px;
  }
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 3px 3px #212529;
}

.nav-item>a {
  text-decoration: none;
  color: inherit;
}

.nav-item.router-link-exact-active {
  border-width: 3px;
  background-color: rgba(255, 255, 255, 0.6);
}

.message-success {
  background-color: green;
}

.message-error {
  background-color: red;
}

#error-message {
  color: whitesmoke;
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
}

#error-message button {
  border: none;
  background-color: unset;
  color: yellow;
}
</style>
