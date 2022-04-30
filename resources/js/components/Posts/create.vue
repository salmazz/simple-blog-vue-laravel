<template>
    <div>
        <form @submit.prevent="submit_form">
            <div class="form-group mb-3">
                <label for="" class="mb-3"> Post Title </label>
                <input
                    type="text"
                    v-model="fields.title"
                    class="form-control"
                />
                <div class="alert alert-danger" v-if="errors && errors.title">
                    {{ errors.title[0] }}
                </div>
            </div>

            <div class="form-group mb-3">
                <label for="" class="mb-3">Body </label>
                <textarea
                    rows="10"
                    v-model="fields.body"
                    class="form-control"
                ></textarea>
                <div class="alert alert-danger" v-if="errors && errors.body">
                    {{ errors.body[0] }}
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="" class="mb-3">Category</label>
                <select class="form-control" v-model="fields.category_id">
                    <option value="">Please Choose Categories</option>
                    <option
                        v-for="category in categories"
                        :value="category.id"
                        :key="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
                <div
                    class="alert alert-danger"
                    v-if="errors && errors.category_id"
                >
                    {{ errors.category_id[0] }}
                </div>
            </div>

            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="fields.published"
                    value="1"
                    id="flexCheckChecked"
                    checked
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Published
                </label>
            </div>

            <div class="alert alert-danger" v-if="errors && errors.published">
                {{ errors.published[0] }}
            </div>
            <input
                type="submit"
                :disabled="form_submiting"
                :value="form_submiting ? 'Saving Post...' : 'Save'"
                class="btn btn-primary"
            />
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            categories: {},
            fields: {
                title: "",
                body: "",
                category_id: "",
                published: "",
            },
            errors: {},
            form_submiting: false,
        };
    },
    mounted() {
           axios.get("/api/get-categories-data").then((response) => {
            this.categories = response.data.data;
        });
    },
    methods: {
        submit_form() {
            this.form_submiting = true;

            axios
                .post("/api/posts", this.fields)
                .then((response) => {
                    swal({
                        title: "Post Created Successfully",
                        icon: "success",
                        button: "close",
                    });
                    this.$router.push("/");
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
