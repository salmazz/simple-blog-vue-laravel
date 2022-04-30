<template>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-6">
                <input
                    v-model="name_search"
                    type="text"
                    class="form-control"
                    placeholder="Search For name of category"
                />
            </div>
        </div>
        <div class="card mt-3 mb-3">
            <div class="card-header">
                <div class="col-md-12">
                    <button type="button" class="btn btn-sm btn-dark">
                        <router-link
                            active-class="active"
                            exact
                            :to="{ name: 'categories.create' }"
                            >Create Category</router-link
                        >
                    </button>
                </div>
            </div>
            <div class="card-body">
                <table class="table">
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
                                <a href="#" @click.prevent="change_sort('name')"
                                    >Name</a
                                >
                                <span
                                    :class="
                                        this.sort_field === 'name' &&
                                        this.sort_direction === 'asc'
                                            ? 'text-danger'
                                            : 'text-secondary'
                                    "
                                    >&uarr;</span
                                >
                                <span
                                    :class="
                                        this.sort_field === 'name' &&
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
                        <tr
                            v-for="category in categories.data"
                            :key="category.id"
                        >
                            <td>{{ category.id }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.created_at }}</td>
                            <td>
                                <router-link
                                    :to="{
                                        name: 'categories.edit',
                                        params: { id: category.id },
                                    }"
                                    class="btn btn-success"
                                    >Edit</router-link
                                >
                                <button
                                    @click="delete_category(category.id)"
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
            :data="categories"
            @pagination-change-page="getResults"
        ></pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: {},
            name_search: "",
            sort_field: "created_at",
            sort_direction: "DESC",
        };
    },
    mounted() {
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
                    "/api/categories?page=" +
                        page +
                        "&sort_field=" +
                        this.sort_field +
                        "&sort_direction=" +
                        this.sort_direction +
                        "&name_search=" +
                        this.name_search
                )
                .then((response) => {
                    this.categories = response.data;
                });
        },
        delete_category(id) {
            swal({
                title: "Are Your Sure You Want to Delete This Category ?",
                icon: "warning",
                buttons: ["No", "Yes"],
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios
                            .delete("/api/categories/" + id)
                            .then((response) => {
                                swal("Category Deleted Successfully");
                                this.getResults();
                            });
                    } else {
                        swal("Category Not Deleted");
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
        name_search() {
            this.getResults();
        },
    },
};
</script>
