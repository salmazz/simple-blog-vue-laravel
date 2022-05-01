<template>
    <div>
        <div class="card">
            <div class="card-header">Edit Post</div>
            <div class="card-body">
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
                     :checked="fields.published"
                      @change="handleChange($event)"
                    id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Published
                </label>
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
        axios.get("/api/posts/" + this.$route.params.id).then((response) => {
            this.fields = response.data.data;
        });
    },
    methods: {

        submit_form() {
            this.form_submiting = true;
            axios
                .put("/api/posts/" + this.$route.params.id, this.fields)
                .then((response) => {
                    swal({
                        title: "Post Edited Successfully",
                        icon: "success",
                        button: "Close",
                    });
                    this.$router.push("/");
                    this.form_submiting = false;
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        swal({
                            title: "There is an error",
                            icon: "error",
                            button: "Close",
                        });
                        this.errors = error.response.data.errors;
                        this.form_submiting = false;
                    }
                });
        },
    },
};
</script>
