<template>
    <div>
        <div class="card">
            <div class="card-header">Add Category</div>
            <div class="card-body">
                <form @submit.prevent="submit_form">
                    <div class="form-group mb-3">
                        <label for="" class="mb-3"> Category Name </label>
                        <input
                            type="text"
                            v-model="fields.name"
                            placeholder="Category name"
                            class="form-control"
                        />
                        <div
                            class="alert alert-danger"
                            v-if="errors && errors.name"
                        >
                            {{ errors.name[0] }}
                        </div>
                    </div>
                    <input
                        type="submit"
                        :disabled="form_submiting"
                        :value="form_submiting ? 'Saving Post...' : 'Save'"
                        class="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            categories: {},
            fields: {
                name: "",
            },
            errors: {},
            form_submiting: false,
        };
    },
    mounted() {
        axios.get("/api/category").then((response) => {
            this.categories = response.data.data;
        });
    },
    methods: {
        submit_form() {
            this.form_submiting = true;

            axios
                .post("/api/categories", this.fields)
                .then((response) => {
                    swal({
                        title: "Category Created Successfully",
                        icon: "success",
                        button: "close",
                    });
                    this.$router.push("/categories");
                    this.form_submiting = false;
                })
                .catch((error) => {
                    swal({
                        title: "There is an error",
                        icon: "error",
                        button: "Close",
                    });
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        this.form_submiting = false;
                    }
                });
        },
    },
};
</script>
