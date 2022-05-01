<template>
    <div class="container mt-3 mb-3">
        <header class="blog-header py-3">
            <div
                class="row flex-nowrap justify-content-between align-items-center"
            >
                <div class="col-12 text-center">
                    <a class="blog-header-logo text-dark" href="#"
                        >Simple blog</a
                    >
                </div>
            </div>
        </header>
        <div class="row">
            <div
                class="col-md-12"
                v-for="category in categories_posts"
                :key="category.id"
            >
                <h1
                    style="font-weight: bold"
                    class="m-3"
                    :class="`${category.posts_count === 0 ? 'd-none' : ''}`"
                >
                    {{ category.name }}
                    <span class="badge bg-info py-1 px-2">{{
                        category.posts_count
                    }}</span>
                </h1>
                <div class="row">
                    <div
                        class="col-md-3"
                        v-for="post in category.posts"
                        :key="post.id"
                    >
                        <div class="card mb-3 p-3">
                            <div class="card-header">
                                <h2>{{ post.title }}</h2>
                            </div>
                            <div class="card-body">
                                <p>{{ post.body }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            categories_posts: {},
        };
    },
    mounted() {
        axios.get("/api/home").then((response) => {
            this.categories_posts = response.data;
        });

        this.getResults();
    },
    methods: {
        getResults() {
            axios
                .get(
                    "/api/home" )
                .then((response) => {
                    this.categories_posts = response.data;
                });
        },
    },

};
</script>
