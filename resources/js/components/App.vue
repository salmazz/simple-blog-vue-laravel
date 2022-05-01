<template>
    <div class="container">
        <header
            class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
        >
         <span class="nav-item">
                    <router-link
                        active-class="active"
                        exact
                        class="nav-link"
                        :to="{ name: 'Home' }"
                        >Home</router-link
                    >
                </span>

            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link
                        active-class="active"
                        exact
                        class="nav-link"
                        :to="{ name: 'posts.index' }"
                        >Posts List</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link
                        active-class="active"
                        exact
                        class="nav-link"
                        :to="{ name: 'categories.index' }"
                        >Categories List</router-link
                    >
                </li>
            </ul>
        </header>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {};
</script>
