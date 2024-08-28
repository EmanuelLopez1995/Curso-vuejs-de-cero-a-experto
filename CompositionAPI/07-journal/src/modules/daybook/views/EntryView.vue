<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
          <div>
              <span class="text-success fs-3 fw-bold">{{ day }}</span>
              <span class="mx-1 fs-3">{{ month }}</span>
              <span class="mx-2 fs-4 f2-light">{{ yearDay }}</span>
          </div>
      
          <div>
                <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpeg">
              <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
                  Borrar
                  <i class="fa fa-trash-alt"></i>
              </button>
              <button class="btn btn-primary" @click="onSelectImage">
                  Subir foto
                  <i class="fa fa-upload"></i>
              </button>
          </div>
        </div>
      
        <hr>
      
        <div class="d-flex flex-column px-3 h-75">
          <textarea placeholder="Que sucedio hoy?" v-model="entry.text"></textarea>
        </div>
      
        <Fab 
          icon="fa-save"
          @on:click="saveEntry"
        />
      
        <!-- <img src="https://www.latercera.com/resizer/gzIWLw7QxxPNfISxGFp27C1QNMo=/arc-anglerfish-arc2-prod-copesa/public/4QPGN2QFOZCKPCZVVBLUHRKWLE.jpg" alt="entry-picture" class="img-thumbnail"> -->

        <img v-if="localImage" :src="localImage" alt="entry-picture" class="img-thumbnail">
    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import getDayMonthYear from "../helpers/getDayMonthYear.js";
import Swal from 'sweetalert2';


export default {

    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(()=> import('../components/Fab.vue'))
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry;
            if(this.id === 'new'){
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            }else{
                entry = this.getEntriesById(this.id);
                if(!entry) return this.$router.push({name: 'no-entry'})
            }

            this.entry = entry
        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            });
            Swal.showLoading();

            if(this.entry.id){
                //actualizar
                await this.updateEntry(this.entry);
            }else{
                //crear una nueva entrada
                const id = await this.createEntry(this.entry)

                this.$router.push({name: 'entry', params: {id}})
            }

            Swal.fire('Guardado', 'Entrada registrada con exito', 'success');
        },
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title: 'Esta seguro?',
                text: 'Una vez borrado no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si estoy seguro'
            })

            if( isConfirmed ){
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                await this.deleteEntry(this.entry.id);
                this.$router.push({name: 'no-entry'})

                Swal.fire('Eliminado', '', 'success');
            }

        },
        onSelectedImage(event){
            const file = event.target.files[0]
            if( !file ){
                this.localImage = null;
                this.file = null;
                return
            }

            this.file = file;
            const fr = new FileReader();
            fr.onload = () => this.localImage = fr.result;
            fr.readAsDataURL(file)
        },
        onSelectImage() {
            this.$refs.imageSelector.click();
        }
    },  
    computed: {
        ...mapGetters('journal', ['getEntriesById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay
        }
    },
    created() {
        this.loadEntry();
    },
    watch: {
        id() { // se ejecuta cuando el valor de id cambia
            this.loadEntry();
        }
    }

}
</script>

<style lang="scss" scoped>
    textarea{
        font-size: 20px;
        border: none;
        height: 100%;

        &:focus {
            outline: none;
        }
    }
    img{
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }
</style>