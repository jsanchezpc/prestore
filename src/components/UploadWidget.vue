<template>
    <div class="uw mr-2">
        <div v-on:click="open" id="upload_widget" class="bg-addImage p-3 text-white rounded h-16 w-16 cursor-pointer">
        </div>
    </div>
</template>

<script>
const cloudName = "ddrdgau1e"; // replace with your own cloud name
const uploadPreset = "product_image"; // replace with your own upload preset

// Inicializar el widget de Cloudinary
const myWidget = cloudinary.createUploadWidget(
    {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        clientAllowedFormats: ["images", "svg", "png", "gif", "webp", "jpg", "jpeg"], //restrict uploading to image files only
        maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            // Emitir el evento con la URL de la imagen subida
            window.dispatchEvent(new CustomEvent('imageUploaded', { detail: result.info.secure_url }));
        }
    }
);

export default {
    name: "UploadWidget",
    data: () => ({
        open: function () {
            myWidget.open();
        },
        uploadedImages: [] 
    }),
    mounted() {
    
        window.addEventListener('imageUploaded', (event) => {
            this.uploadedImages.push(event.detail);
            this.$emit('imagesUploaded', this.uploadedImages);
        });
    }
};
</script>