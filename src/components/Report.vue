<template>
  <b-card tag="article" class="mb-2">
    <b-row no-gutters>
      <b-col>
        <b-card-text class="text-left"> id: {{ id }} </b-card-text>
        <b-card-text class="text-left"> state: {{ state }} </b-card-text>
        <b-card-text class="text-left">
          <a href="javascript:void(0))"> Details</a>
        </b-card-text>
      </b-col>
      <b-col>
        <b-card-text class="text-left"> Type: {{ type }} </b-card-text>
        <b-card-text class="text-left">
          Message: {{ String(message) }}
        </b-card-text>
      </b-col>
      <b-col>
        <div class="button-block">
          <b-button variant="danger" id="blocked" v-on:click="blocked"
            >Blocked</b-button
          >
        </div>
        <div class="button-block">
          <b-button variant="success" id="resolved" v-on:click="resolved">Resolved</b-button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "Report",
  props: {
    id: String,
    state: String,
    type: String,
    message: String,
  },
  methods: {
    resolved: function () {
      fetch(`http://127.0.0.1:3000/reports/${this.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketState: "CLOSED",
        }),
      })
        .then((response) => {
          console.log(response);
          this.$emit("reload-reports");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    blocked: function () {
      fetch(`http://127.0.0.1:3000/reports/${this.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketState: "BLOCKED",
        }),
      })
        .then((response) => {
          console.log(response);
          this.$emit("reload-reports");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-block {
  margin-bottom: 1rem;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
