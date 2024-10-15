<template>
    <div class="flex flex-col items-center gap-2">
        <div class="flex flex-row">
            <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg"
                :class="{
                    'text-yellow-500': star <= rating,
                    'text-gray-400': star > rating,
                    'cursor-pointer': true,
                    'w-10 md:w-5 h-auto fill-current': true,
                    'hover:text-yellow-600': star > rating,
                    'hover:text-red-600': star <= rating
                }"
                @click="setRating(star)"
                viewBox="0 0 16 16">
                <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
        </div>
        
        <span class="text-slate-400 text-sm font-medium">{{ rating }} out of 5 stars</span>
    </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../store/user-store'

export default {
    name: 'RateStar',
    data() {
        return {
            rating: 0,          // Rating actual
            previousRating: 0    // Rating anterior para calcular la diferencia
        }
    },
    props: {
        landingId: {
            type: String,  
            required: true
        },
        initialRating: {
            type: Number,  // Prop para recibir las estrellas iniciales
            required: true
        }
    },
    methods: {
        setRating(star) {
            const userId = useUserStore().get_account._id;
            const ratingDiff = star - this.previousRating; // Calcular la diferencia entre el nuevo y el anterior

            axios.post(`http://localhost:3000/feedback/rate/${this.landingId}`, {
                rating: star,
                userId: userId,
                ratingDiff: ratingDiff // Enviar la diferencia
            })
            .then(response => {
                console.log(response.data);
                this.previousRating = star; // Actualizar el voto previo
                this.rating = star;         // Actualizar el rating actual
            })
            .catch(error => {
                console.error('Error updating landing page:', error);
            });
        }
    },
    mounted() {
        // Inicializar el rating a partir del valor pasado por props
        this.rating = this.initialRating;
        this.previousRating = this.initialRating; // Guardar el rating inicial como el voto anterior
    }
}
</script>
