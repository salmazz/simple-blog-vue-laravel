<template>
    <div class="container mt-3 mb-3">
        <header class="blog-header py-3">
            <div
                class="row flex-nowrap justify-content-between align-items-center"
            >

                <div class="col-12 text-center">
                    <a class="blog-header-logo text-dark" href="#">Simple blog</a>
                </div>
            </div>
        </header>

        <div class="nav-scroller py-1 mb-2">
    <nav class="nav d-flex justify-content-between">

      <a v-for="category in categories"  :value="category.id"
                       :key="category.id" class="p-2 link-secondary" href="#"> {{  category.name }}</a>

    </nav>
  </div>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            posts: {},
            categories: {}
        };
    },
    mounted() {
        axios.get("/api/get-categories-data").then((response) => {
            this.categories = response.data.data;
        });

        this.getResults();
    },
    methods: {
        change_sort(field) {
            if (this.sort_field === field) {
                this.sort_direction =
                    this.sort_direction === "asc" ? "desc" : "asc";
            } else {
                this.sort_field = field;
                this.sort_direction = "asc";
            }
            this.getResults();
        },
        getResults(page = 1) {
            axios
                .get(
                    "/api/posts?page=" +
                        page +
                        "&category_id=" +
                        this.category_id +
                        "&sort_field=" +
                        this.sort_field +
                        "&sort_direction=" +
                        this.sort_direction +
                        "&title_search=" +
                        this.title_search
                )
                .then((response) => {
                    this.posts = response.data;
                });
        },

    },
    watch: {
        category_id(value) {
            this.getResults();
        },
        title_search() {
            this.getResults();
        },
    },
};
</script>
