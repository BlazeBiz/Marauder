<template>
    <div id="customer-view">
      <customer-form :customer-id="customerId"/>
    </div>
  </template>
  
  <script>
  import CustomerForm from "../components/CustomerForm.vue";
  export default {
    components: {
      CustomerForm,
    },
    name: "CustomerEditView",
    data() {
      return {
        customerId: null,
      };
    },
    created() {
        this.customerId = parseInt(this.$route.params.id);
    },
  };
  </script>
  <style scoped>
  </style>