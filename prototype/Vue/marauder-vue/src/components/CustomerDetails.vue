<template>
  <template v-if="error">
    <h1>Error</h1>
    <div v-if="error.err.response.status === 404">
      <p>No customer with ID {{ customerId }} was found in the database.</p>
    </div>
    <div v-else>
      <p>An error occurred reading customer ID {{ customerId }}: {{ error.msg }}</p>
    </div>
  </template>
  <div v-else id="customer-details">
    <h1 v-if="isLoading" class="skeleton skeleton-text"></h1>
    <h1 v-else>Customer: {{ customer.customerName }}</h1>

    <router-link v-if="customer.customerId" :to="{ name: 'CustomerEdit', params: { id: customer.customerId } }"
      title="Edit customer">
      <font-awesome-icon icon="fa-solid fa-pencil" /> Edit
    </router-link>

    <section id="main-grid">
      <div class="gridtable standard-form gridlines" id="customer-form">
        <div class="col">Customer id:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ customer.customerId }}</div>
        <div class="col">Customer name:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ customer.customerName }}</div>
        <div class="col">Customer number:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ customer.customerNumber }}</div>
        <div class="col">Payment terms:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ customer.paymentTerms }}</div>
        <div class="col">G/L Link:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ customer.glLink }}</div>
        <div class="col">Created on:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ formatDateTime(customer.created) }} by {{ customer.createdBy }}</div>
        <div class="col">Modified on:</div>
        <div class="col" v-if="isLoading">
          <div class="skeleton skeleton-text"></div>
        </div>
        <div class="col" v-else>{{ formatDateTime(customer.modified) }} by {{ customer.modifiedBy }}</div>
      </div>
    </section>

    <section id="address-grid">
      <h2>Addresses</h2>
      <div class="gridtable gridtable-5" id="address-table">
        <div class="col hdg">
          <p>Address</p>
        </div>
        <div class="col hdg">
          <p>City</p>
        </div>
        <div class="col hdg">
          <p>State</p>
        </div>
        <div class="col hdg">
          <p>ZIP</p>
        </div>
        <div class="col hdg">
          <p>Type</p>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <template v-for="add in customer.customerAddresses">
          <div class="col" v-html="addressHTML(add)"></div>
          <div class="col">{{ add.city }}</div>
          <div class="col">{{ add.stateCode }}</div>
          <div class="col">{{ add.zipCode }}</div>
          <div class="col">
            <input type="checkbox" disabled v-model="add.shipToFlag" /> Shipping <br />
            <input type="checkbox" disabled v-model="add.billToFlag" /> Billing
          </div>
        </template>
      </div>
    </section>
    <h2>Sales Orders</h2>
    <router-link v-if="customer.customerId"
      :to="{ name: 'SalesOrderSearch', query: { searchType: 'equals', searchField: 'customerId', searchValue: customer.customerId } }"
      title="View sales orders for this customer">
      <font-awesome-icon icon="fa-regular fa-rectangle-list" /> Show sales orders
    </router-link>
    <br />
    <router-link v-if="customer.customerId" :to="{ name: 'SalesOrderCreate', params: { customerId: customer.customerId } }"
      title="Create a new sales order for customer">
      <font-awesome-icon icon="fa-solid fa-cart-plus" /> New order
    </router-link>
  </div>
</template>
  
<script>
import apiService from '@/services/apiService.js'
import utility from "@/services/utility.js";
export default {
  components: {
  },
  name: "CustomerDetails",
  props: {
    customerId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      customer: {},
      isLoading: false,
      error: null,
    };
  },
  methods: {
    refreshPage() {
      this.isLoading = true;
      apiService.getCustomerById(this.customerId).then(resp => {
        this.isLoading = false;
        this.customer = resp.data;
      })
        .catch(error => {
          this.isLoading = false;
          this.error = error;
        });
    },
    formatDateTime(date) {
      return utility.formatDateTime(date);
    },
    addressHTML(add) {
      let a = add.addressLine1;
      if (add.addressLine2) a += "<br />" + add.addressLine2;
      if (add.addressLine3) a += "<br />" + add.addressLine3;
      return a;
    },
    addressTypeHTML(add) {

    },
  },
  created() {
    this.refreshPage();
  },

};
</script>

<style src="@/css/form.css" scoped />
<style src="@/css/grid-table.css" scoped />
<style src="@/css/skeleton.css" scoped />

<style scoped>
h1 {
  font-style: italic;
  color: var(--heading-fg-2);
}

/* Grid column widths */
#address-table.gridtable.gridtable-5 {
  grid-template-columns: 1fr minmax(150px, auto) 120px 120px 150px;
  margin: 0 100px;
}

div#customer-details {
  min-width: 1000px;
}

section#main-grid {
  margin: 20px 200px 10px 200px;
}

.gridtable-title {
  font-size: 0.9em;
  font-weight: bold;
  padding-left: 5px;
}

a {
  font-weight: bold;
}

@media screen and (max-width: 1200px) {
  section#main-grid {
    grid-template-columns: 1fr;
    margin: 20px 10px 10px 10px;
    gap: 0px;
  }
}
</style>