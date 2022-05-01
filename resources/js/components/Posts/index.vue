<template>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-md-6">
                <select v-model="category_id" class="form-control col-3">
                    <option value="">--Choose Category--</option>
                    <option
                        v-for="category in categories"
                        :value="category.id"
                        :key="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <div class="col-6">
                <input
                    v-model="title_search"
                    type="text"
                    class="form-control"
                    placeholder="Search For Title"
                />
            </div>
        </div>
        <div class="card mt-3 mb-3">
            <div class="card-header">
                <div class="col-md-12">
                    <button class="btn text-white btn-sm btn-dark">
                        <router-link
                            active-class="active"
                            exact
                            :to="{ name: 'posts.create' }"
                            >Create Post</router-link
                        >
                    </button>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <a href="#" @click.prevent="change_sort('id')"
                                    >id</a
                                >
                                <span
                                    :class="
                                        this.sort_field === 'id' &&
                                        this.sort_direction === 'asc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&uarr;</span
                                >
                                <span
                                    :class="
                                        this.sort_field === 'id' &&
                                        this.sort_direction === 'desc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&darr;</span
                                >
                            </th>
                            <th scope="col">
                                <a
                                    href="#"
                                    @click.prevent="change_sort('title')"
                                    >title</a
                                >
                                <span
                                    :class="
                                        this.sort_field === 'title' &&
                                        this.sort_direction === 'asc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&uarr;</span
                                >
                                <span
                                    :class="
                                        this.sort_field === 'title' &&
                                        this.sort_direction === 'desc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&darr;</span
                                >
                            </th>
                            <th scope="col">
                                <a href="#" @click.prevent="change_sort('body')"
                                    >body</a
                                >
                                <span
                                    :class="
                                        this.sort_field === 'body' &&
                                        this.sort_direction === 'asc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&uarr;</span
                                >
                                <span
                                    :class="
                                        this.sort_field === 'body' &&
                                        this.sort_direction === 'desc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&darr;</span
                                >
                            </th>
                            <th>Published</th>
                            <th scope="col">
                                <a
                                    href="#"
                                    @click.prevent="change_sort('created_at')"
                                    >created_at</a
                                >
                                <span
                                    :class="
                                        this.sort_field === 'created_at' &&
                                        this.sort_direction === 'asc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&uarr;</span
                                >
                                <span
                                    :class="
                                        this.sort_field === 'created_at' &&
                                        this.sort_direction === 'desc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&darr;</span
                                >
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="post in posts.data" :key="post.id">
                            <td>{{ post.id }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.body.substring(0, 30) }}</td>
                            <td>
                                <toggle-button
                                disabled
                                    :value="!!parseInt(post.published)"
                                    :labels="{
                                        checked: 'on',
                                        unchecked: 'off',
                                    }"
                                    style="margin-left: 15px"
                                />
                            </td>
                            <td>{{ post.created_at }}</td>
                            <td>
                                <router-link
                                    :to="{
                                        name: 'posts.edit',
                                        params: { id: post.id },
                                    }"
                                    class="btn btn-success"
                                    >Edit</router-link
                                >
                                <button
                                    @click="delete_post(post.id)"
                                    class="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <pagination
            :data="posts"
            @pagination-change-page="getResults"
        ></pagination>
    </div>
</template>

<script>
export default {
    created() {},
    data() {
        return {
            posts: {},
            categories: {},
            title_search: "",
            category_id: "",
            published: "",
            sort_field: "created_at",
            sort_direction: "DESC",
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
        delete_post(id) {
            swal({
                title: "Are Your Sure You Want to Delete The Post ?",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.delete("/api/posts/" + id).then((response) => {
                            swal("Post Deleted Successfully");
                            this.getResults();
                        });
                    } else {
                        swal("Post Not Deleted");
                    }
                })
                .catch((error) => {
                    swal({
                        icon: "error",
                        title: "Error Happened",
                    });
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
